/* ============ Pawty i18n ============
   English is the source language and lives in App.jsx as written. Every
   other language is one folder in here (xx/index.js) exporting { ui, plural, content }.

   ui       { "English text": "Translated text" }   keys are the English strings
   plural   { "{n} day|{n} days": {one, two, few, many, other} }  Intl.PluralRules categories
   content  mirrors the English content structure (skills, guides, plans, badges,
            ladders and so on) keyed by id where the English array has ids,
            positional otherwise. Missing entries fall back to English.

   Rules:
   - t(key) returns the key itself when no translation exists, so a partial
     language file never breaks the interface, it just shows English there.
   - Every catalogue is bundled. No network fetch, training happens offline.
   - Language is independent of country. Country drives the marketplace. */
import de from "./de";
import es from "./es";
import fr from "./fr";
import hr from "./hr";
import it from "./it";
import nl from "./nl";
import pl from "./pl";
import pt from "./pt";
import ro from "./ro";
import sl from "./sl";

/* English first, the rest alphabetical by their own name */
export const LANGS = [
  ["en", "English"],
  ["de", "Deutsch"],
  ["es", "Español"],
  ["fr", "Français"],
  ["hr", "Hrvatski"],
  ["it", "Italiano"],
  ["nl", "Nederlands"],
  ["pl", "Polski"],
  ["pt", "Português"],
  ["ro", "Română"],
  ["sl", "Slovenščina"],
];
const CATS = { de, es, fr, hr, it, nl, pl, pt, ro, sl };
export const DEFAULT_LANG = "en";

let cur = DEFAULT_LANG;
let ui = {};
let plural = {};
let rules = null;
const listeners = new Set();

export function isSupported(code) { return !!code && LANGS.some(l => l[0] === code); }
export function getLang() { return cur; }
export function langName(code) { const l = LANGS.find(x => x[0] === code); return l ? l[1] : "English"; }

/* Device language, reduced to the primary subtag. "de-AT" -> "de".
   Returns "en" when the device language is not supported. */
export function deviceLang() {
  try {
    const raw = (typeof navigator !== "undefined" && (navigator.language || (navigator.languages || [])[0])) || "";
    const code = String(raw).toLowerCase().split(/[-_]/)[0];
    return isSupported(code) ? code : DEFAULT_LANG;
  } catch (e) { return DEFAULT_LANG; }
}

function makeRules(code) {
  try { return new Intl.PluralRules(code); }
  catch (e) { return { select: n => (n === 1 ? "one" : "other") }; }
}

/* Switch the active language. Fires listeners so the app can re-render and
   re-localise its content arrays. Unsupported codes fall back to English. */
export function setLang(code) {
  const next = isSupported(code) ? code : DEFAULT_LANG;
  cur = next;
  const cat = CATS[next] || {};
  ui = cat.ui || {};
  plural = cat.plural || {};
  rules = makeRules(next);
  listeners.forEach(f => { try { f(next); } catch (e) {} });
  return next;
}
export function onLangChange(f) { listeners.add(f); return () => listeners.delete(f); }

function fill(s, vars) {
  if (!vars) return s;
  return s.replace(/\{(\w+)\}/g, (m, k) => (k in vars && vars[k] !== undefined && vars[k] !== null ? String(vars[k]) : m));
}

/* Interface string. Key is the English text. */
export function t(key, vars) {
  const s = (ui && Object.prototype.hasOwnProperty.call(ui, key) && ui[key]) ? ui[key] : key;
  return fill(s, vars);
}

/* Plural string. key is "singular|plural" in English with {n} inside, e.g.
   "{n} day|{n} days". Other languages supply all the categories their
   language needs under plural[key]; Slovenian needs one, two, few, other. */
export function tn(n, key, vars) {
  const num = Number(n) || 0;
  let s;
  const forms = plural && plural[key];
  if (forms) {
    const cat = (rules || makeRules(cur)).select(num);
    s = forms[cat] || forms.other || key.split("|")[1] || key;
  } else {
    const parts = key.split("|");
    s = num === 1 ? parts[0] : (parts[1] || parts[0]);
  }
  return fill(s, { n: num, ...(vars || {}) });
}

/* ---------- content localisation ----------
   Walks the English structure and copies each translatable value from the
   translation when present, otherwise restores the English original. Runs in
   place so every existing reference to CMDS, BEHAV and friends keeps working.
   Arrays of objects carrying an id (or k) are matched by that id, other arrays
   positionally. Non-string values are never touched. */
const SKIP_KEYS = new Set(["id", "k", "e", "c", "t", "tags", "normal", "w", "min", "d_id"]);
function isStrArr(a) { return Array.isArray(a) && a.every(x => typeof x === "string"); }

function localizeNode(target, en, tr) {
  if (Array.isArray(en)) {
    const byId = en.length && en.every(x => x && typeof x === "object" && !Array.isArray(x) && (x.id !== undefined || x.k !== undefined));
    en.forEach((enItem, i) => {
      const key = byId ? (enItem.id !== undefined ? enItem.id : enItem.k) : i;
      const trItem = tr ? (byId ? tr[key] : tr[i]) : undefined;
      localizeNode(target[i], enItem, trItem);
    });
    return;
  }
  if (!en || typeof en !== "object") return;
  for (const k of Object.keys(en)) {
    if (SKIP_KEYS.has(k)) continue;
    const enVal = en[k];
    const trVal = tr && typeof tr === "object" ? tr[k] : undefined;
    if (typeof enVal === "string") {
      target[k] = typeof trVal === "string" && trVal ? trVal : enVal;
    } else if (isStrArr(enVal)) {
      target[k] = isStrArr(trVal) && trVal.length === enVal.length ? trVal.slice() : enVal.slice();
    } else if (Array.isArray(enVal) && enVal.length && enVal.every(x => isStrArr(x))) {
      /* LADDERS: array of [title, text] pairs */
      target[k] = enVal.map((pair, i) => {
        const tp = Array.isArray(trVal) ? trVal[i] : undefined;
        return pair.map((s, j) => (isStrArr(tp) && typeof tp[j] === "string" && tp[j]) ? tp[j] : s);
      });
    } else if (enVal && typeof enVal === "object") {
      localizeNode(target[k], enVal, trVal);
    }
  }
}

let snapshot = null;
let live = null;
/* Register the app's content root once. `root` is an object whose values are
   the live content arrays and maps from App.jsx. */
export function registerContent(root) {
  live = root;
  snapshot = JSON.parse(JSON.stringify(root));
}
export function localizeContent(code) {
  if (!live || !snapshot) return;
  const cat = CATS[code] || {};
  const tr = cat.content || {};
  for (const k of Object.keys(snapshot)) localizeNode(live[k], snapshot[k], tr[k]);
}
export function contentCatalog(code) { return (CATS[code] || {}).content || null; }
export function uiCatalog(code) { return (CATS[code] || {}).ui || null; }
export function pluralCatalog(code) { return (CATS[code] || {}).plural || null; }

/* Template of the translatable content, in exactly the shape a language
   file's `content` must mirror. Used by the extraction script that writes
   i18n-source/en.json and by the tests that validate language files. */
export function templateOf(en) {
  if (Array.isArray(en)) {
    const byId = en.length && en.every(x => x && typeof x === "object" && !Array.isArray(x) && (x.id !== undefined || x.k !== undefined));
    if (byId) { const o = {}; en.forEach(x => { const v = templateOf(x); if (v !== undefined) o[x.id !== undefined ? x.id : x.k] = v; }); return o; }
    if (isStrArr(en)) return en.slice();
    if (en.length && en.every(x => isStrArr(x))) return en.map(x => x.slice());
    const arr = en.map(x => templateOf(x)); return arr.some(x => x !== undefined) ? arr : undefined;
  }
  if (!en || typeof en !== "object") return undefined;
  const o = {}; let any = false;
  for (const k of Object.keys(en)) {
    if (SKIP_KEYS.has(k)) continue;
    const v = en[k];
    if (typeof v === "string") { o[k] = v; any = true; }
    else if (isStrArr(v)) { o[k] = v.slice(); any = true; }
    else if (Array.isArray(v) && v.length && v.every(x => isStrArr(x))) { o[k] = v.map(x => x.slice()); any = true; }
    else if (v && typeof v === "object") { const s = templateOf(v); if (s !== undefined) { o[k] = s; any = true; } }
  }
  return any ? o : undefined;
}
export function contentTemplate() { return snapshot ? templateOf(snapshot) : null; }
/* test hook: inject a catalogue without a file on disk */
export function _setCatalogForTest(code, cat) { const prev = CATS[code]; CATS[code] = cat; return prev; }
