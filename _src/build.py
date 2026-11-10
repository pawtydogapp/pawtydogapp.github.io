#!/usr/bin/env python3
"""Pawty website generator.

Builds every page of pawtyapp.com from the source in this _src folder.
Run from the repository root:   python3 _src/build.py
Output is written next to _src (the repository root), overwriting pages.

Source layout
  config.json            languages, page list, sitemap data
  lastmod.json           sitemap dates, kept by the build: one content hash and date per URL.
                         A page's date moves to the build date only when its text changes.
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
T_LLMS = rd('templates/llms.txt')
T = {n: rd(f'templates/{n}.html') for n in ['base', 'stores', 'guide', 'guide-needs', 'guide-card', 'posthog', 'lang-switch']}
CSS = rd('assets/site.css'); JS = rd('assets/site.js'); SHOPJS = rd('assets/shop.js')
def h8(s): return hashlib.md5(s.encode()).hexdigest()[:8]

import datetime
TODAY = os.environ.get('PAWTY_DATE', datetime.date.today().isoformat())
LM_PATH = os.path.join(SRC, 'lastmod.json')
LM_SEED = not os.path.exists(LM_PATH)          # first run: English keeps its config date
LM = {} if LM_SEED else json.load(open(LM_PATH, encoding='utf-8'))
def touch(lang, pg, u, content):
    h = hashlib.sha256(content.encode()).hexdigest()[:16]
    old = LM.get(u)
    if old and old['h'] == h: return
    d = pg.get('lastmod', TODAY) if (LM_SEED and lang == 'en') else TODAY
    LM[u] = {'h': h, 'd': d}

def prefix(lang): return '' if lang == 'en' else lang + '/'
def url(lang, path):
    p = prefix(lang) + ('' if path == 'index.html' else path)
    return f'{DOMAIN}/{p}'

def available(lang, path):
    """A page exists in a language once its text exists. Until then links fall back to English."""
    if lang == 'en': return True
    pg = next(p for p in PAGES if p['path'] == path)
    if pg.get('noindex') and not pg.get('hidden'): return False
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


SOCIAL = ['https://www.instagram.com/pawty.app', 'https://www.tiktok.com/@pawty.app', 'https://www.youtube.com/@pawtyapp',
          'https://x.com/pawtyapp', 'https://www.facebook.com/profile.php?id=61593301785199',
          'https://apps.apple.com/app/id6805087382', 'https://play.google.com/store/apps/details?id=com.pawty']
ORG = {"@type": "Organization", "@id": "https://pawtyapp.com/#org", "name": "Pawty", "url": "https://pawtyapp.com/",
       "logo": "https://pawtyapp.com/icon-512.png", "email": "info@pawtyapp.com", "sameAs": SOCIAL}
SECTION = {'guides.html': 'CollectionPage', 'blog.html': 'Blog', 'marketplace.html': 'CollectionPage',
           'approach.html': 'AboutPage', 'partners.html': 'WebPage', 'support.html': 'FAQPage',
           'legal/privacy.html': 'WebPage', 'legal/terms.html': 'WebPage'}

def og_image(lang): return f'https://pawtyapp.com/og/og-{lang}.jpg'

def plain(s): return re.sub(r'\s+', ' ', html.unescape(re.sub(r'<[^>]+>', ' ', s))).strip()

def enrich_ld(lang, pg, path, u, ld, main, chrome, title, desc, item_urls):
    """Structured data for every indexable page: the page itself, a breadcrumb trail and, on Home, the organisation."""
    if pg.get('noindex') or pg.get('hidden'): return ld
    graph = []
    if ld:
        d = json.loads(ld); d.pop('@context', None)
        d['inLanguage'] = lang
        if d.get('@type') == 'Article':
            m = re.search(r'<img class="cover" src="([^"]+)"', main)
            d['image'] = 'https://pawtyapp.com' + m.group(1) if m else og_image(lang)
            d['publisher'] = {"@id": ORG["@id"]}
        graph.append(d)
    home = url(lang, 'index.html')
    if path == 'index.html':
        graph.append(ORG)
        graph.append({"@type": "WebSite", "@id": home + '#site', "url": home, "name": "Pawty", "inLanguage": lang, "publisher": {"@id": ORG["@id"]}})
    else:
        crumbs = [(chrome['nav_home'], home)]
        if pg['kind'] == 'guide': crumbs.append((chrome['nav_guides'], url(lang, 'guides.html')))
        elif path.startswith('post-'): crumbs.append((chrome['nav_blog'], url(lang, 'blog.html')))
        nav = {'guides.html': 'nav_guides', 'blog.html': 'nav_blog', 'marketplace.html': 'nav_marketplace', 'partners.html': 'nav_partners', 'approach.html': 'nav_approach', 'support.html': 'nav_support'}
        crumbs.append((chrome[nav[path]] if path in nav else plain(title).split(' — ')[0].split(' | ')[0], u))
        graph.append({"@type": "BreadcrumbList", "itemListElement": [{"@type": "ListItem", "position": i + 1, "name": n, "item": x} for i, (n, x) in enumerate(crumbs)]})
        if path in SECTION:
            d = {"@type": SECTION[path], "@id": u + '#page', "url": u, "name": plain(title), "description": desc, "inLanguage": lang,
                 "isPartOf": {"@id": url('en', 'index.html') + '#site'}, "publisher": {"@id": ORG["@id"]}}
            if path in item_urls:
                d['mainEntity'] = {"@type": "ItemList", "numberOfItems": len(item_urls[path]),
                                   "itemListElement": [{"@type": "ListItem", "position": i + 1, "url": x} for i, x in enumerate(item_urls[path])]}
            if path == 'support.html':
                qa = re.findall(r'<details[^>]*><summary>(.*?)</summary>\s*<p>(.*?)</p>', main, re.S)
                d['mainEntity'] = [{"@type": "Question", "name": plain(q), "acceptedAnswer": {"@type": "Answer", "text": plain(a)}} for q, a in qa]
            graph.append(d)
    return json.dumps({"@context": "https://schema.org", "@graph": graph}, ensure_ascii=False, separators=(',', ':'))

TITLE_MAX = 65
def fit_title(t):
    """Keep titles inside what Google shows: shorten the brand suffix first, then drop it."""
    if len(t) <= TITLE_MAX: return t
    m = re.match(r'(.*?) — (?:Pawty|Pawty Blog|Pawty blog|Blog Pawty|Blog de Pawty|Pawty-blog|Blogul Pawty)$', t)
    if not m: return t
    core = m.group(1)
    return core + ' — Pawty' if len(core) + 8 <= TITLE_MAX else core

def build_lang(lang):
    L = f'lang/{lang}/'
    chrome = js(L + 'chrome.json'); meta = js(L + 'pages.json'); gtext = js(L + 'guides.json')
    bad = [k for k, v in chrome.items() if k.startswith('shop_') and '"' in v]
    if bad: raise SystemExit(f'Straight double quote in {lang} chrome.json {bad}: shop strings go into HTML attributes')
    behav = load_behav(lang); gshared = js('guides.json')
    stores_v = dict(chrome, ios_id='', play_id='')
    stores = render(T['stores'], stores_v, 'stores')
    stores_hero = render(T['stores'], dict(chrome, ios_id=' id="get-ios"', play_id=' id="get-android"'), 'stores')
    css = f'<style>{CSS}</style>' if CSS_MODE == 'inline' else f'<link rel="stylesheet" href="/assets/site.css?v={h8(CSS)}">'
    jsx = f'<script>{JS}</script>' if CSS_MODE == 'inline' else f'<script src="/assets/site.js?v={h8(JS)}"></script>'
    written = []
    cards = ''.join(render(T['guide-card'], {'slug': g['slug'], 'n': esc(behav[g['id']]['n']), 'card': gtext[g['id']]['card'], 'cat': g['cat'], 'cat_label': chrome['gcat_' + g['cat']], 'read_guide': chrome['read_guide']}, 'card') for g in gshared)
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
            main = render(body, dict(chrome, lang=lang, shop_js_v=h8(SHOPJS), stores=stores, stores_hero=stores_hero, guide_cards=cards), path)
            title = m['title']; desc = m['description']
            ld = article_ld(m['headline'], desc, u, pg['date']) if pg.get('ld') == 'article' else m.get('ld')
        title = fit_title(title)
        item_urls = {'guides.html': [url(lang, 'guides/' + g['slug'] + '.html') for g in gshared],
                     'blog.html': [url(lang, p['path']) for p in PAGES if p['path'].startswith('post-') and available(lang, p['path'])]}
        ld = enrich_ld(lang, pg, path, u, ld, main, chrome, title, desc, item_urls)
        touch(lang, pg, u, title + '\n' + desc + '\n' + main)
        canonical = '<meta name="robots" content="noindex">' if (pg.get('noindex') or pg.get('hidden')) else f'<link rel="canonical" href="{u}">'
        alts = ''
        if len(langs_here) > 1 and not (pg.get('noindex') or pg.get('hidden')):
            alts = ''.join(f'\n<link rel="alternate" hreflang="{l}" href="{url(l, path)}">' for l in langs_here)
            alts += f'\n<link rel="alternate" hreflang="x-default" href="{url("en", path)}">'
        v = dict(chrome, lang=lang, title=title, description=desc, url=u, canonical=canonical + alts, og_locale=(f'\n<meta property="og:locale" content="{LOCALE[lang]}">' if len(LANGS) > 1 else ''),
                 css=css, og_image=og_image(lang), posthog=T['posthog'], ld=(f'<script type="application/ld+json">{ld}</script>\n' if ld else ''),
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

def llms():
    """llms.txt for AI search tools: built from the English page titles and descriptions, so it never goes stale."""
    meta = js('lang/en/pages.json'); gtext = js('lang/en/guides.json'); behav = load_behav('en')
    gby = {'guides/' + g['slug'] + '.html': g for g in js('guides.json')}
    def strip(t): return re.sub(r'\s+[—-]\s+Pawty( blog)?$', '', t)
    groups = {'main': [], 'guides': [], 'blog': [], 'legal': []}
    for pg in PAGES:
        if pg.get('noindex') or pg.get('hidden'): continue
        path = pg['path']; u = url('en', path)
        if pg['kind'] == 'guide':
            t = gtext[gby[path]['id']]; groups['guides'].append(f'- [{strip(t["title"])}]({u}): {t["description"]}')
            continue
        m = meta[path]; line = f'- [{strip(m["title"])}]({u}): {m["description"]}'
        key = 'blog' if path.startswith('post-') else 'legal' if path.startswith('legal/') else 'main'
        groups[key].append(line)
    groups['langs'] = [f'- {NATIVE[l]} ({l}): {url(l, "index.html")}' for l in LANGS]
    return render(T_LLMS, {k: '\n'.join(v) for k, v in groups.items()}, 'llms.txt')

def sitemap():
    rows = []
    for pg in PAGES:
        if 'lastmod' not in pg: continue
        for l in LANGS:
            if not available(l, pg['path']): continue
            rows.append(f'  <url><loc>{url(l, pg["path"])}</loc><lastmod>{LM[url(l, pg["path"])]["d"]}</lastmod><priority>{pg["priority"]}</priority></url>')
    return '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' + '\n'.join(rows) + '\n</urlset>\n'

if __name__ == '__main__':
    allw = []
    for l in LANGS: allw += build_lang(l)
    wr('sitemap.xml', sitemap())
    wr('llms.txt', llms())
    json.dump(dict(sorted(LM.items())), open(LM_PATH, 'w', encoding='utf-8'), indent=0)
    if CSS_MODE != 'inline':
        wr('assets/site.css', CSS); wr('assets/site.js', JS); wr('assets/shop.js', SHOPJS)
    print(f'Built {len(allw)} pages in {len(LANGS)} language(s), css mode {CSS_MODE}')
