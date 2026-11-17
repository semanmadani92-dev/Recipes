/* Data integrity: no browser needed. */
"use strict";
const fs = require("fs");
const path = require("path");
const { execFileSync } = require("child_process");

const TYPES = ["discount", "hyper", "super", "premium", "organic", "bulk", "convenience", "market", "ethnic"];
const GENERIC_STORES = ["Fresh market", "Weekly market", "Corner shop", "Local grocers"];

module.exports = (T) => {
  T.test("index.html loads every js/data file that exists (none forgotten, none missing)", async ({ data, assert }) => {
    const d = data();
    const notLoaded = d.onDisk.filter((f) => !d.scripts.includes(f));
    assert.deepStrictEqual(notLoaded, [], `js/data files not referenced by index.html: ${notLoaded.join(", ")}`);
  });

  T.test("every recipe ingredient id exists in PRICES and quantities are positive", async ({ data, assert }) => {
    const { w } = data();
    const bad = [];
    for (const r of w.RECIPES) for (const [id, q] of r.ing) {
      if (!w.PRICES[id]) bad.push(`${r.id}: unknown ingredient "${id}"`);
      else if (!(q > 0)) bad.push(`${r.id}: ${id} quantity ${q}`);
    }
    assert.deepStrictEqual(bad.slice(0, 20), [], bad.length + " problems");
  });

  T.test("recipe ids unique; every recipe country is in COUNTRIES; serves/time valid", async ({ data, assert }) => {
    const { w } = data();
    const seen = new Set(), bad = [];
    for (const r of w.RECIPES) {
      if (seen.has(r.id)) bad.push("duplicate id " + r.id); seen.add(r.id);
      if (!w.COUNTRIES[r.country]) bad.push(`${r.id}: country ${r.country} not in COUNTRIES`);
      if (!(r.serves > 0) || !(r.time > 0)) bad.push(`${r.id}: serves=${r.serves} time=${r.time}`);
      if (!Array.isArray(r.steps) || !r.steps.length) bad.push(`${r.id}: no steps`);
    }
    assert.deepStrictEqual(bad.slice(0, 20), [], bad.length + " problems");
    assert.ok(w.RECIPES.length >= 446, `only ${w.RECIPES.length} recipes`);
  });

  T.test("PRICES entries have name, pack size, unit, price > 0 and shelf", async ({ data, assert }) => {
    const { w } = data();
    const bad = Object.entries(w.PRICES).filter(([, p]) => !(p.n && p.q > 0 && p.u && p.p > 0 && Number.isFinite(p.p) && p.c)).map(([id]) => id);
    assert.deepStrictEqual(bad, [], "bad price entries");
  });

  T.test("MARKETS: currency, rate > 0, level > 0, valid stores with unique ids, known store types", async ({ data, assert }) => {
    const { w } = data();
    const bad = [];
    const ids = new Set();
    const shelves = new Set(Object.values(w.PRICES).map((p) => p.c));
    assert.ok(w.STORE_TYPES, "window.STORE_TYPES missing");
    for (const ty of Object.keys(w.STORE_TYPES)) if (!TYPES.includes(ty)) bad.push(`STORE_TYPES has unknown type ${ty}`);
    for (const [cc, m] of Object.entries(w.MARKETS)) {
      if (!/^[A-Z]{2}$/.test(cc)) bad.push(`${cc}: key is not ISO alpha-2`);
      if (!/^[A-Z]{3}$/.test(m.cur || "")) bad.push(`${cc}: cur "${m.cur}"`);
      else { try { new Intl.NumberFormat("en", { style: "currency", currency: m.cur }); } catch (e) { bad.push(`${cc}: Intl rejects currency ${m.cur}`); } }
      if (!(m.rate > 0) || !Number.isFinite(m.rate)) bad.push(`${cc}: rate ${m.rate}`);
      if (!(m.level > 0) || !Number.isFinite(m.level) || m.level > 5) bad.push(`${cc}: level ${m.level}`);
      if (m.cat) for (const [k, v] of Object.entries(m.cat)) {
        if (!shelves.has(k)) bad.push(`${cc}: cat shelf "${k}" is not a PRICES shelf`);
        if (!(v > 0)) bad.push(`${cc}: cat ${k}=${v}`);
      }
      if (!Array.isArray(m.stores) || !m.stores.length) { bad.push(`${cc}: no stores`); continue; }
      for (const st of m.stores) {
        const [id, name, type, f] = st;
        if (!id || ids.has(id)) bad.push(`${cc}: duplicate/empty store id ${id}`); ids.add(id);
        if (!name || typeof name !== "string") bad.push(`${cc}: store ${id} has no name`);
        if (!w.STORE_TYPES[type]) bad.push(`${cc}: store ${id} type "${type}" not in STORE_TYPES`);
        if (!(f > 0) || !Number.isFinite(f) || f > 4) bad.push(`${cc}: store ${id} factor ${f}`);
      }
    }
    assert.deepStrictEqual(bad.slice(0, 30), [], bad.length + " problems");
  });

  T.test("market currencies match the country (spot check)", async ({ data, assert }) => {
    const { w } = data();
    const want = { DE: "EUR", US: "USD", GB: "GBP", JP: "JPY", IN: "INR", BR: "BRL", MX: "MXN", CN: "CNY", TH: "THB", NG: "NGN", TR: "TRY", KR: "KRW" };
    const bad = Object.entries(want).filter(([cc, cur]) => w.MARKETS[cc] && w.MARKETS[cc].cur !== cur).map(([cc, cur]) => `${cc}: ${w.MARKETS[cc].cur} (want ${cur})`);
    assert.deepStrictEqual(bad, []);
  });

  T.test("every recipe country has a selectable market (where-you-shop covers all 154 countries)", async ({ data, assert, pending }) => {
    const { w } = data();
    const iso2 = isoMap(data);
    const recipeCountries = [...new Set(w.RECIPES.map((r) => r.country))];
    const missing = recipeCountries.filter((n) => !w.MARKETS[iso2[n]]).map((n) => `${w.COUNTRIES[n].name} (${iso2[n] || n})`);
    if (Object.keys(w.MARKETS).length < 60) pending(`only ${Object.keys(w.MARKETS).length} markets so far; ${missing.length} recipe countries have none`);
    assert.deepStrictEqual(missing, [], `${missing.length} recipe countries without a market`);
  });

  T.test("LOCAL_PRICES (if present): known markets and ingredient ids, finite prices > 0, sane vs estimate", async ({ data, assert, pending }) => {
    const { w, onDisk } = data();
    if (!onDisk.includes("js/data/local-prices.js")) pending("js/data/local-prices.js not built yet");
    assert.ok(w.LOCAL_PRICES, "local-prices.js exists but window.LOCAL_PRICES is not defined after loading index.html data scripts");
    const bad = [], far = [];
    let n = 0;
    for (const [cc, m] of Object.entries(w.LOCAL_PRICES)) {
      if (!w.MARKETS[cc]) { bad.push(`${cc}: not a market`); continue; }
      if (!m || typeof m.items !== "object") { bad.push(`${cc}: no items`); continue; }
      const M = w.MARKETS[cc];
      for (const [id, it] of Object.entries(m.items)) {
        n++;
        if (!w.PRICES[id]) { bad.push(`${cc}: unknown id ${id}`); continue; }
        if (!it || !Number.isFinite(it.p) || !(it.p > 0)) bad.push(`${cc}.${id}: p=${it && it.p}`);
        else {
          // compare with the model estimate at the cheapest store: >8x off is almost surely a unit / pack-size error
          const P = w.PRICES[id];
          const est = P.p * M.level * ((M.cat || {})[P.c] || 1) * M.rate;
          const ratio = it.p / est;
          if (ratio > 8 || ratio < 1 / 8) far.push(`${cc}.${id}: ${it.p} ${M.cur} vs estimate ${est.toFixed(2)} (x${ratio.toFixed(1)})`);
        }
      }
    }
    assert.ok(n > 0, "LOCAL_PRICES has no items");
    assert.deepStrictEqual(bad.slice(0, 30), [], bad.length + " problems");
    assert.ok(far.length <= Math.max(3, n * 0.02), `${far.length} of ${n} local prices are >8x off the estimate (unit/pack-size errors?):\n` + far.slice(0, 15).join("\n"));
  });

  T.test("pegged currencies have consistent rates (USD pegs, CFA franc, BAM, BTN=INR, NAD=ZAR)", async ({ data, assert }) => {
    const { w } = data();
    const r = (cur) => { const m = Object.values(w.MARKETS).find((x) => x.cur === cur); return m ? m.rate : null; };
    const bad = [];
    // the same currency must have the same rate in every market
    const byCur = {};
    for (const [cc, m] of Object.entries(w.MARKETS)) (byCur[m.cur] = byCur[m.cur] || []).push([cc, m.rate]);
    for (const [cur, list] of Object.entries(byCur)) if (new Set(list.map((x) => x[1])).size > 1) bad.push(`${cur} has different rates: ${JSON.stringify(list)}`);
    const usd = r("USD");
    const pegs = [["AED", usd * 3.6725], ["SAR", usd * 3.75], ["QAR", usd * 3.64], ["OMR", usd * 0.3845], ["JOD", usd * 0.709], ["BSD", usd], ["BZD", usd * 2],
      ["XOF", 655.957], ["XAF", 655.957], ["BAM", 1.95583], ["DKK", 7.46], ["BTN", r("INR")], ["NAD", r("ZAR")]];
    for (const [cur, want] of pegs) { const got = r(cur); if (got != null && want && Math.abs(got / want - 1) > 0.03) bad.push(`${cur}: rate ${got}, peg says ${want.toFixed(4)}`); }
    assert.deepStrictEqual(bad, []);
  });

  T.test("generic store names (not brands) are translatable: one of the allowed names, translated in all languages", async ({ data, ROOT, assert }) => {
    const { w } = data();
    const vm = require("vm");
    const sb = {}; sb.window = sb; vm.createContext(sb);
    for (const f of fs.readdirSync(path.join(ROOT, "js/i18n"))) vm.runInContext(fs.readFileSync(path.join(ROOT, "js/i18n", f), "utf8"), sb);
    const D = sb.I18N_DICT;
    const names = new Map();
    for (const [cc, m] of Object.entries(w.MARKETS)) for (const st of m.stores) names.set(st[1], (names.get(st[1]) || []).concat(cc));
    // lower-case shop words mean a description, not a brand ("Fresh market", "Asian & Latino grocers", "Tiendas en divisas")
    const generic = [...names.keys()].filter((n) => /(?<![-\w])(grocers?|market|markets|shops?|stores?|stalls|hypermarkets|supermarkets|tiendas|mercados?|divisas|tianguis)\b/.test(n));
    const bad = generic.map((n) => [n, Object.keys(D).filter((l) => !(D[l].ui || {})[n])]).filter(([, miss]) => miss.length)
      .map(([n, miss]) => `"${n}" (${names.get(n).join(",")}): untranslated in ${miss.length} languages — use one of ${GENERIC_STORES.join(" / ")} or a brand`);
    assert.deepStrictEqual(bad, []);
  });

  T.test("python3 tools/i18n_keys.py --check passes", async ({ ROOT, assert }) => {
    let out = "", code = 0;
    try { out = execFileSync("python3", ["tools/i18n_keys.py", "--check"], { cwd: ROOT, encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] }); }
    catch (e) { code = e.status; out = (e.stdout || "") + (e.stderr || ""); }
    assert.strictEqual(code, 0, "i18n check failed:\n" + out.split("\n").filter((l) => /missing|extra|broken|error|!/i.test(l)).slice(0, 20).join("\n"));
  });

  T.test("every translation file defines every app language listed in i18n.js", async ({ ROOT, assert }) => {
    const src = fs.readFileSync(path.join(ROOT, "js/i18n.js"), "utf8");
    const codes = [...src.matchAll(/\{ code: "([a-z]{2})"/g)].map((m) => m[1]).filter((c) => c !== "en");
    const html = fs.readFileSync(path.join(ROOT, "index.html"), "utf8");
    const missing = codes.filter((c) => !fs.existsSync(path.join(ROOT, `js/i18n/${c}.js`)) || !html.includes(`js/i18n/${c}.js`));
    assert.strictEqual(codes.length, 15, "expected 15 non-English languages, found " + codes.length);
    assert.deepStrictEqual(missing, []);
  });
};

// ISO numeric -> alpha-2 table from i18n.js (or the data, if it carries iso2)
function isoMap() {
  const src = fs.readFileSync(path.join(__dirname, "../js/i18n.js"), "utf8");
  const m = src.match(/const ISO2 = (\{[\s\S]*?\});/);
  // eslint-disable-next-line no-new-func
  return m ? Function("return " + m[1])() : {};
}
