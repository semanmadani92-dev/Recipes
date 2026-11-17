/* Every market x its first and last store: receipt totals are finite, positive and in the market's currency. */
"use strict";
const { parseMoney } = require("./lib.cjs");

// runs inside the page: switch market/store with the receipt's own <select>s and read the totals
function sweep({ recipeIds, onlyMarkets }) {
  const out = { checked: 0, bad: [] };
  const sel = (id, v) => {
    const el = document.getElementById(id);
    if (!el) throw new Error("#" + id + " not found in the recipe receipt");
    if (![...el.options].some((o) => o.value === v)) return false;
    el.value = v; el.dispatchEvent(new Event("change", { bubbles: true }));
    return true;
  };
  const markets = onlyMarkets || Object.keys(window.MARKETS);
  for (const rid of recipeIds) {
    location.hash = "recipe-" + rid;
    window.dispatchEvent(new HashChangeEvent("hashchange"));
    for (const cc of markets) {
      const m = window.MARKETS[cc];
      if (!sel("rc-market", cc)) { out.bad.push(`${cc}: not in the receipt's country list`); continue; }
      const stores = m.stores.length > 1 ? [m.stores[0], m.stores[m.stores.length - 1]] : [m.stores[0]];
      for (const st of stores) {
        if (!sel("rc-level", st[0])) { out.bad.push(`${cc}/${st[0]}: not in the store list`); continue; }
        const totals = [...document.querySelectorAll("#recipe-body .rc-total")].map((el) => { const s = el.querySelectorAll("span"); return s[s.length - 1].textContent; });
        const lines = [...document.querySelectorAll("#recipe-body .rc-line > span:nth-child(2)")].map((e) => e.textContent);
        let sym = m.cur;
        try { sym = new Intl.NumberFormat(window.I18N.locale, { style: "currency", currency: m.cur }).formatToParts(1).find((p) => p.type === "currency").value; } catch (e) { /* code */ }
        const head = (document.querySelector("#recipe-body .rc-head") || {}).textContent || "";
        out.checked++;
        out.rows = out.rows || [];
        out.rows.push({ cc, st: st[0], rid, totals, lines, sym, head, btn: document.getElementById("settings-btn").textContent });
      }
    }
  }
  return out;
}

function judge(res, parse) {
  const bad = res.bad.slice();
  for (const r of res.rows || []) {
    const where = `${r.cc}/${r.st}/${r.rid}`;
    if (r.totals.length < 3) { bad.push(`${where}: only ${r.totals.length} totals`); continue; }
    const nums = r.totals.map(parse);
    if (!nums.every((n) => Number.isFinite(n) && n > 0)) bad.push(`${where}: totals ${JSON.stringify(r.totals)}`);
    if (!r.totals.every((s) => s.includes(r.sym))) bad.push(`${where}: totals ${JSON.stringify(r.totals)} lack currency "${r.sym}"`);
    const lineBad = r.lines.filter((s) => !Number.isFinite(parse(s)) || /NaN|undefined|Infinity/.test(s));
    if (lineBad.length) bad.push(`${where}: line amounts ${JSON.stringify(lineBad.slice(0, 3))}`);
    if (!r.btn.includes(r.cc)) bad.push(`${where}: header button "${r.btn}" does not show ${r.cc}`);
    // till (whole packs) can never be less than the used share
    const [used, per, till] = nums;
    if (till + 0.011 < used) bad.push(`${where}: till ${r.totals[2]} < used ${r.totals[0]}`);
    if (per > used + 0.011) bad.push(`${where}: per serving ${r.totals[1]} > used ${r.totals[0]}`);
  }
  return bad;
}

module.exports = (T) => {
  T.test("every market × first and last store: receipt totals finite, positive, in the market's currency (desktop)", async (ctx) => {
    const P = await ctx.newPage({ device: "desktop", globe: false });
    try {
      await P.goto("find");
      const ids = await P.page.evaluate(() => { const R = window.RECIPES; return [R[0].id, R[Math.floor(R.length / 2)].id, R[R.length - 1].id]; });
      const res = await P.page.evaluate(sweep, { recipeIds: ids, onlyMarkets: null });
      const bad = judge(res, parseMoney);
      ctx.log(`${res.checked} market/store/recipe combinations checked`);
      if (P.errors.length) bad.push(...[...new Set(P.errors)].slice(0, 5));
      ctx.assert.deepStrictEqual(bad.slice(0, 25), [], bad.length + " problems");
    } finally { await P.close(); }
  }, { timeout: 300000, tags: ["browser", "prices"] });

  T.test("markets on a phone in Hindi and Japanese: receipt money is well-formed", async (ctx) => {
    const bad = [];
    for (const lang of ["hi", "ja", "ar"]) {
      const P = await ctx.newPage({ device: "phone", lang, globe: false });
      try {
        await P.goto("find");
        const ids = await P.page.evaluate(() => [window.RECIPES[5].id]);
        const all = await P.page.evaluate(() => Object.keys(window.MARKETS));
        const pick = all.filter((c, i) => i % 4 === 0 || ["US", "JP", "IN", "SA", "DE"].includes(c));
        const res = await P.page.evaluate(sweep, { recipeIds: ids, onlyMarkets: pick });
        bad.push(...judge(res, parseMoney).map((b) => lang + ": " + b));
        if (P.errors.length) bad.push(lang + ": " + P.errors.join("; "));
      } finally { await P.close(); }
    }
    ctx.assert.deepStrictEqual(bad.slice(0, 25), [], bad.length + " problems");
  }, { timeout: 300000, tags: ["browser", "prices"] });

  T.test("prices are cheaper at the cheapest store than the dearest (store factor applied)", async (ctx) => {
    const P = await ctx.newPage({ device: "desktop", globe: false });
    try {
      await P.goto("find");
      const rows = await P.page.evaluate(sweep, { recipeIds: [await P.page.evaluate(() => window.RECIPES[1].id)], onlyMarkets: null });
      const by = {};
      for (const r of rows.rows || []) (by[r.cc] = by[r.cc] || []).push({ st: r.st, v: parseMoney(r.totals[0]) });
      const bad = [];
      for (const [cc, list] of Object.entries(by)) {
        if (list.length < 2) continue;
        const m = await P.page.evaluate((cc) => window.MARKETS[cc].stores.map((s) => [s[0], s[3]]), cc);
        const f = Object.fromEntries(m);
        const [a, b] = list;
        if (f[a.st] < f[b.st] && a.v > b.v * 1.02) bad.push(`${cc}: ${a.st} (x${f[a.st]}) ${a.v} > ${b.st} (x${f[b.st]}) ${b.v}`);
      }
      ctx.assert.ok(bad.length <= 2, bad.join("\n"));
    } finally { await P.close(); }
  }, { timeout: 200000, tags: ["browser", "prices"] });
};
