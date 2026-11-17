/*
 * World Pantry: languages.
 *
 * English text is the key. Each language file (js/i18n/xx.js) adds
 *   window.I18N_DICT.xx = { ui: { "English text": "translation", ... }, ing: "id=name\n..." }
 * Plural keys use the English plural form as the key, and the value can be a
 * string or { one, few, many, other } chosen with Intl.PluralRules.
 * Static page text is translated by walking the DOM; code calls I18N.t().
 * Country names, weekdays, numbers and money come from the browser's Intl data.
 */
(function () {
  "use strict";

  const LANGS = [
    { code: "en", name: "English", en: "English" },
    { code: "zh", name: "中文（简体）", en: "Chinese", locale: "zh-CN", gt: "zh-CN" },
    { code: "hi", name: "हिन्दी", en: "Hindi" },
    { code: "es", name: "Español", en: "Spanish" },
    { code: "ar", name: "العربية", en: "Arabic", dir: "rtl" },
    { code: "fr", name: "Français", en: "French" },
    { code: "bn", name: "বাংলা", en: "Bengali" },
    { code: "pt", name: "Português", en: "Portuguese", locale: "pt-BR" },
    { code: "ru", name: "Русский", en: "Russian" },
    { code: "ur", name: "اردو", en: "Urdu", dir: "rtl" },
    { code: "id", name: "Bahasa Indonesia", en: "Indonesian" },
    { code: "de", name: "Deutsch", en: "German" },
    { code: "ja", name: "日本語", en: "Japanese" },
    { code: "tr", name: "Türkçe", en: "Turkish" },
    { code: "vi", name: "Tiếng Việt", en: "Vietnamese" },
    { code: "ko", name: "한국어", en: "Korean" }
  ];
  const byCode = Object.fromEntries(LANGS.map((l) => [l.code, l]));
  const DICT = (window.I18N_DICT = window.I18N_DICT || {});

  // ISO 3166 numeric -> alpha-2, for the browser's own translated country names
  const ISO2 = {
    "004": "AF", "008": "AL", "012": "DZ", "024": "AO", "031": "AZ", "032": "AR", "036": "AU", "040": "AT", "044": "BS", "050": "BD",
    "051": "AM", "056": "BE", "064": "BT", "068": "BO", "070": "BA", "072": "BW", "076": "BR", "084": "BZ", "096": "BN", "100": "BG",
    "104": "MM", "112": "BY", "116": "KH", "120": "CM", "124": "CA", "144": "LK", "152": "CL", "156": "CN", "158": "TW", "170": "CO",
    "180": "CD", "188": "CR", "191": "HR", "192": "CU", "196": "CY", "203": "CZ", "204": "BJ", "208": "DK", "214": "DO", "218": "EC",
    "222": "SV", "231": "ET", "232": "ER", "233": "EE", "242": "FJ", "246": "FI", "250": "FR", "266": "GA", "268": "GE", "276": "DE",
    "288": "GH", "300": "GR", "320": "GT", "324": "GN", "328": "GY", "332": "HT", "340": "HN", "348": "HU", "352": "IS", "356": "IN",
    "360": "ID", "364": "IR", "368": "IQ", "372": "IE", "376": "IL", "380": "IT", "384": "CI", "388": "JM", "392": "JP", "398": "KZ",
    "400": "JO", "404": "KE", "408": "KP", "410": "KR", "414": "KW", "417": "KG", "418": "LA", "422": "LB", "428": "LV", "430": "LR",
    "434": "LY", "440": "LT", "442": "LU", "450": "MG", "454": "MW", "458": "MY", "466": "ML", "484": "MX", "496": "MN", "498": "MD",
    "499": "ME", "504": "MA", "508": "MZ", "512": "OM", "516": "NA", "524": "NP", "528": "NL", "540": "NC", "548": "VU", "554": "NZ",
    "558": "NI", "566": "NG", "578": "NO", "586": "PK", "591": "PA", "598": "PG", "600": "PY", "604": "PE", "608": "PH", "616": "PL",
    "620": "PT", "626": "TL", "630": "PR", "634": "QA", "642": "RO", "643": "RU", "646": "RW", "682": "SA", "686": "SN", "688": "RS",
    "694": "SL", "702": "SG", "703": "SK", "704": "VN", "705": "SI", "706": "SO", "710": "ZA", "716": "ZW", "724": "ES", "729": "SD",
    "740": "SR", "752": "SE", "756": "CH", "760": "SY", "762": "TJ", "764": "TH", "780": "TT", "784": "AE", "788": "TN", "792": "TR",
    "795": "TM", "800": "UG", "804": "UA", "807": "MK", "818": "EG", "826": "GB", "834": "TZ", "840": "US", "854": "BF", "858": "UY",
    "860": "UZ", "862": "VE", "887": "YE", "894": "ZM"
  };

  function detect() {
    let saved = null;
    try { saved = JSON.parse(localStorage.getItem("wp.lang")); } catch (e) { /* ignore */ }
    if (saved && byCode[saved]) return saved;
    const prefs = (navigator.languages && navigator.languages.length ? navigator.languages : [navigator.language || "en"]);
    for (const p of prefs) { const c = String(p).toLowerCase().split(/[-_]/)[0]; if (byCode[c]) return c; }
    return "en";
  }

  let lang = detect();
  let cache = {};
  const listeners = [];

  function info() { return byCode[lang]; }
  // Latin digits everywhere so counts, prices and quantities match
  function locale() { return (info().locale || lang) + "-u-nu-latn"; }
  function dict() { return lang === "en" ? null : DICT[lang]; }

  function fill(s, vars) {
    if (!vars) return s;
    return s.replace(/\{(\w+)\}/g, (m, k) => (vars[k] != null ? vars[k] : m));
  }
  function t(key, vars) {
    const d = dict();
    const s = d && d.ui && typeof d.ui[key] === "string" ? d.ui[key] : key;
    return fill(s, vars);
  }
  let plural = null;
  function tn(n, one, other, vars) {
    vars = Object.assign({ n }, vars || {});
    const d = dict();
    const v = d && d.ui ? d.ui[other] : null;
    if (v == null) return fill(n === 1 ? one : other, vars);
    if (typeof v === "string") return fill(v, vars);
    if (!plural) plural = new Intl.PluralRules(info().locale || lang);
    const cat = plural.select(n);
    return fill(v[cat] || v.other || other, vars);
  }
  function has(key) { const d = dict(); return !!(d && d.ui && d.ui[key]); }

  // ingredient names: "id=name" lines, parsed once per language
  function ingMap() {
    const d = dict();
    if (!d || !d.ing) return null;
    if (!cache.ing) {
      cache.ing = {};
      (typeof d.ing === "string" ? d.ing.split("\n") : []).forEach((line) => {
        const i = line.indexOf("=");
        if (i > 0) cache.ing[line.slice(0, i).trim()] = line.slice(i + 1).trim();
      });
      if (typeof d.ing === "object" && !Array.isArray(d.ing)) Object.assign(cache.ing, d.ing);
    }
    return cache.ing;
  }
  function ing(id, english) { const m = ingMap(); return (m && m[id]) || english; }

  let regionNames = null;
  function country(code, english) {
    const iso = code.length === 2 ? code : ISO2[code];
    if (lang === "en" || !iso) return english;
    try {
      if (!regionNames) regionNames = new Intl.DisplayNames([info().locale || lang], { type: "region" });
      const n = regionNames.of(iso);
      return n && n !== iso ? n : english;
    } catch (e) { return english; }
  }
  function countryEn(iso) {
    try { return new Intl.DisplayNames(["en"], { type: "region" }).of(iso); } catch (e) { return iso; }
  }

  // Monday-first weekday names
  function days(style) {
    const key = "days-" + style;
    if (!cache[key]) {
      try {
        const f = new Intl.DateTimeFormat(locale(), { weekday: style, timeZone: "UTC" });
        cache[key] = [1, 2, 3, 4, 5, 6, 7].map((d) => f.format(new Date(Date.UTC(2024, 0, d))));
      } catch (e) {
        cache[key] = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map((d) => style === "short" ? d.slice(0, 3) : d);
      }
    }
    return cache[key];
  }

  // ---------- static DOM text ----------
  const origText = new WeakMap();
  const ATTRS = ["placeholder", "aria-label", "title"];
  function translateDOM(root) {
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
      acceptNode(n) {
        const p = n.parentElement;
        if (!p || p.closest("script,style,[data-no-i18n]")) return NodeFilter.FILTER_REJECT;
        return n.nodeValue.trim() ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
      }
    });
    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    nodes.forEach((n) => {
      if (!origText.has(n)) origText.set(n, n.nodeValue);
      const orig = origText.get(n);
      const key = orig.trim();
      const out = t(key);
      if (out !== key || n.nodeValue !== orig) n.nodeValue = orig.replace(key, out);
    });
    root.querySelectorAll("[placeholder],[aria-label],[title]").forEach((el) => {
      if (el.closest("[data-no-i18n]")) return;
      el._i18n = el._i18n || {};
      ATTRS.forEach((a) => {
        if (!el.hasAttribute(a)) return;
        if (el._i18n[a] == null) el._i18n[a] = el.getAttribute(a);
        el.setAttribute(a, t(el._i18n[a]));
      });
    });
  }

  function apply() {
    const l = info();
    document.documentElement.lang = l.locale || l.code;
    document.documentElement.dir = l.dir || "ltr";
  }

  function setLang(code) {
    if (!byCode[code] || code === lang) return;
    lang = code; cache = {}; plural = null; regionNames = null;
    try { localStorage.setItem("wp.lang", JSON.stringify(code)); } catch (e) { /* ignore */ }
    apply();
    translateDOM(document.body);
    listeners.forEach((fn) => { try { fn(code); } catch (e) { console.error(e); } });
  }

  // Google Translate link for text we only have in English (recipe method and story)
  function translateUrl(text) {
    const l = info();
    return "https://translate.google.com/?sl=en&tl=" + encodeURIComponent(l.gt || l.code) + "&op=translate&text=" + encodeURIComponent(text.slice(0, 4500));
  }

  apply();

  window.I18N = {
    LANGS, ISO2, t, tn, has, ing, country, countryEn, days, translateDOM, setLang, translateUrl,
    get lang() { return lang; },
    get locale() { return locale(); },
    get dir() { return info().dir || "ltr"; },
    info,
    onChange(fn) { listeners.push(fn); }
  };
})();
