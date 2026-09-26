#!/usr/bin/env python3
"""Pawty website generator.

Builds every page of pawtyapp.com from the source in this _src folder.
Run from the repository root:   python3 _src/build.py
Output is written next to _src (the repository root), overwriting pages.

Source layout
  config.json            languages, page list, sitemap data
  guides.json            the 32 behaviour guides: slug, app id, date, safety flag
  templates/             page shell, guide page, store badges, small partials
  assets/site.css|js     the one stylesheet and the one script, published to /assets/
  lang/<xx>/chrome.json  navigation, footer, badges and guide headings
  lang/<xx>/pages.json   title, description and headline per page
  lang/<xx>/guides.json  website-only guide text: SEO title, description, card line, gear list
  lang/<xx>/pages/*.html the body of every non-guide page
  app/                   the app's own translations (en.json plus i18n/<xx>/behav.js)
                         guide text comes from here, word for word, so app and site never drift

Rules
  English lives at the root. Every other language lives in /<xx>/ with identical file names.
  A missing {{placeholder}} stops the build. Nothing is ever silently left blank.
"""
import json, os, re, sys, html, hashlib, subprocess, shutil

SRC = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(SRC)
CSS_MODE = os.environ.get('PAWTY_CSS', 'external')      # 'inline' reproduces v16 byte for byte

def rd(p): return open(os.path.join(SRC, p), encoding='utf-8').read()
def js(p): return json.loads(rd(p))
def wr(path, s):
    full = os.path.join(ROOT, path); os.makedirs(os.path.dirname(full), exist_ok=True)
    open(full, 'w', encoding='utf-8', newline='\n').write(s)

PH = re.compile(r'\{\{([a-z0-9_]+)\}\}')
def render(tpl, v, where):
    def rep(m):
        k = m.group(1)
        if k not in v: raise SystemExit(f'Missing placeholder {{{{{k}}}}} in {where}')
        return v[k]
    return PH.sub(rep, tpl)

cfg = js('config.json')
DOMAIN = cfg['domain']
LANGS = [l[0] for l in cfg['languages']]
NATIVE = {l[0]: l[1] for l in cfg['languages']}
LOCALE = {l[0]: l[2] for l in cfg['languages']}
PAGES = cfg['pages']
PAGE_PATHS = {p['path'] for p in PAGES}
T = {n: rd(f'templates/{n}.html') for n in ['base', 'stores', 'guide', 'guide-needs', 'guide-card', 'posthog', 'lang-switch']}
CSS = rd('assets/site.css'); JS = rd('assets/site.js')
def h8(s): return hashlib.md5(s.encode()).hexdigest()[:8]

def prefix(lang): return '' if lang == 'en' else lang + '/'
def url(lang, path):
    p = prefix(lang) + ('' if path == 'index.html' else path)
    return f'{DOMAIN}/{p}'

def available(lang, path):
    """A page exists in a language once its text exists. Until then links fall back to English."""
    if lang == 'en': return True
    pg = next(p for p in PAGES if p['path'] == path)
    if pg.get('noindex'): return False
    if pg['kind'] == 'guide': return os.path.exists(os.path.join(SRC, 'lang', lang, 'guides.json'))
    return os.path.exists(os.path.join(SRC, 'lang', lang, 'pages', path))

def target(lang, path):
    """Where a link to `path` should go for a reader of `lang`."""
    return path if lang == 'en' or not available(lang, path) else f'{lang}/{path}'

def localize_links(s, lang):
    """Point internal page links at the same language. Images, assets and files stay shared."""
    if lang == 'en': return s
    def rep(m):
        tgt = m.group(2); bare = tgt.split('#')[0].split('?')[0].lstrip('/')
        if bare == '' : bare = 'index.html'
        if bare in PAGE_PATHS and available(lang, bare):
            if bare == 'index.html' and '#' not in tgt: return f'{m.group(1)}"/{lang}/"'
            return f'{m.group(1)}"/{lang}/{tgt.lstrip("/")}"'
        return m.group(0)
    return re.sub(r'(href=)"(/[^"]*)"', rep, s)

def load_behav(lang):
    if lang == 'en': return js('app/en.json')['content']['behav']
    f = os.path.join(SRC, 'app', 'i18n', lang, 'behav.js')
    out = subprocess.run(['node', '--input-type=module', '-e',
        f'import b from {json.dumps("file://" + f)}; process.stdout.write(JSON.stringify(b))'],
        capture_output=True, text=True, check=True).stdout
    return json.loads(out)

def esc(s): return html.escape(s, quote=False)

def article_ld(headline, desc, u, date):
    return json.dumps({"@context": "https://schema.org", "@type": "Article", "headline": headline,
        "description": desc, "author": {"@type": "Person", "name": "Matej Mesko"},
        "publisher": {"@type": "Organization", "name": "Pawty"}, "mainEntityOfPage": u,
        "datePublished": date}, ensure_ascii=False)

def build_lang(lang):
    L = f'lang/{lang}/'
    chrome = js(L + 'chrome.json'); meta = js(L + 'pages.json'); gtext = js(L + 'guides.json')
    behav = load_behav(lang); gshared = js('guides.json')
    stores_v = dict(chrome, ios_id='', play_id='')
    stores = render(T['stores'], stores_v, 'stores')
    stores_hero = render(T['stores'], dict(chrome, ios_id=' id="get-ios"', play_id=' id="get-android"'), 'stores')
    css = f'<style>{CSS}</style>' if CSS_MODE == 'inline' else f'<link rel="stylesheet" href="/assets/site.css?v={h8(CSS)}">'
    jsx = f'<script>{JS}</script>' if CSS_MODE == 'inline' else f'<script src="/assets/site.js?v={h8(JS)}"></script>'
    written = []
    cards = ''.join(render(T['guide-card'], {'slug': g['slug'], 'n': esc(behav[g['id']]['n']), 'card': gtext[g['id']]['card']}, 'card') for g in gshared)
    gby = {'guides/' + g['slug'] + '.html': g for g in gshared}
    for pg in PAGES:
        path = pg['path']; u = url(lang, path)
        if not available(lang, path): continue
        langs_here = [l for l in LANGS if available(l, path)]
        if pg['kind'] == 'guide':
            g = gby[path]; b = behav[g['id']]; t = gtext[g['id']]
            needs = ''
            if t['needs']:
                needs = render(T['guide-needs'], dict(chrome, items=''.join(f'<li>{x}</li>' for x in t['needs'])), path)
            v = dict(chrome, n=esc(b['n']), why=esc(b['why']), calm=esc(b['calm']), needs=needs, stores=stores,
                     fix=''.join(f'<li>{esc(x)}</li>\n' for x in b['fix']),
                     avoid=''.join(f'<li>{esc(x)}</li>\n' for x in b['avoid']),
                     help=chrome['guide_help_critical'] if g['critical'] else chrome['guide_help_text'])
            main = render(T['guide'], v, path)
            title = t['title'] + chrome['title_suffix']; desc = t['description']
            ld = article_ld(t['title'], desc, u, g['date'])
        else:
            m = meta[path]
            body = rd(L + 'pages/' + path)
            main = render(body, dict(stores=stores, stores_hero=stores_hero, guide_cards=cards), path)
            title = m['title']; desc = m['description']
            ld = article_ld(m['headline'], desc, u, pg['date']) if pg.get('ld') == 'article' else m.get('ld')
        canonical = '<meta name="robots" content="noindex">' if pg.get('noindex') else f'<link rel="canonical" href="{u}">'
        alts = ''
        if len(langs_here) > 1 and not pg.get('noindex'):
            alts = ''.join(f'\n<link rel="alternate" hreflang="{l}" href="{url(l, path)}">' for l in langs_here)
            alts += f'\n<link rel="alternate" hreflang="x-default" href="{url("en", path)}">'
        v = dict(chrome, lang=lang, title=title, description=desc, url=u, canonical=canonical + alts, og_locale=(f'\n<meta property="og:locale" content="{LOCALE[lang]}">' if len(LANGS) > 1 else ''),
                 css=css, posthog=T['posthog'], ld=(f'<script type="application/ld+json">{ld}</script>\n' if ld else ''),
                 main=main, js=jsx)
        out = localize_links(render(T['base'], v, path), lang)
        out = out.replace('@@LANGSWITCH@@', lang_switch(lang, path, chrome)).replace('@@LANGFOOT@@', lang_footer(lang, path))
        wr(prefix(lang) + path, out); written.append(prefix(lang) + path)
    return written

def lang_href(l, path):
    p = path if available(l, path) else 'index.html'
    return '/' + prefix(l) + ('' if p == 'index.html' else p)

def lang_switch(lang, path, chrome):
    if len(LANGS) < 2: return ''
    links = ''.join(f'<a href="{lang_href(l, path)}" hreflang="{l}" lang="{l}"' + (' aria-current="true"' if l == lang else '') + f'>{NATIVE[l]}</a>' for l in LANGS)
    return render(T['lang-switch'], dict(lang_label=chrome['lang_label'], native=NATIVE[lang], code=lang.upper(), links=links), 'lang-switch')

def lang_footer(lang, path):
    if len(LANGS) < 2: return ''
    return '<div class="langrow">' + ''.join(f'<a href="{lang_href(l, path)}" hreflang="{l}" lang="{l}"' + (' aria-current="true"' if l == lang else '') + f'>{NATIVE[l]}</a>' for l in LANGS) + '</div>\n'

def sitemap():
    rows = []
    for pg in PAGES:
        if 'lastmod' not in pg: continue
        for l in LANGS:
            if not available(l, pg['path']): continue
            rows.append(f'  <url><loc>{url(l, pg["path"])}</loc><lastmod>{pg["lastmod"]}</lastmod><priority>{pg["priority"]}</priority></url>')
    return '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' + '\n'.join(rows) + '\n</urlset>\n'

if __name__ == '__main__':
    allw = []
    for l in LANGS: allw += build_lang(l)
    wr('sitemap.xml', sitemap())
    if CSS_MODE != 'inline':
        wr('assets/site.css', CSS); wr('assets/site.js', JS)
    print(f'Built {len(allw)} pages in {len(LANGS)} language(s), css mode {CSS_MODE}')
