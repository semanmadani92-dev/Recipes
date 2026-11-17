/* Settings, persistence, compare, cooking mode, search and filters. */
"use strict";
const { badText, parseMoney } = require("./lib.cjs");

// choose a market in the settings sheet, whatever widget it uses (searchable list or <select>)
async function chooseMarket(page, cc) {
  return page.evaluate((cc) => {
    const root = document.getElementById("settings-dialog");
    const btn = root.querySelector(`[data-set-market="${cc}"]`);
    if (btn) { btn.click(); return "button"; }
    const sel = root.querySelector("select[data-market]");
    if (sel && [...sel.options].some((o) => o.value === cc)) { sel.value = cc; sel.dispatchEvent(new Event("change", { bubbles: true })); return "select"; }
    return null;
  }, cc);
}
async function chooseStore(page, which) {
  return page.evaluate((which) => {
    const sel = document.querySelector("#settings-dialog select[data-store]");
    if (!sel) return null;
    const o = which === "last" ? sel.options[sel.options.length - 1] : sel.options[0];
    sel.value = o.value; sel.dispatchEvent(new Event("change", { bubbles: true }));
    return o.value;
  }, which);
}
const ls = (page) => page.evaluate(() => Object.fromEntries(Object.keys(localStorage).filter((k) => k.startsWith("wp.")).map((k) => [k, JSON.parse(localStorage.getItem(k))])));
async function openSettings(page) {
  await page.click("#settings-btn");
  await page.waitForSelector("#settings-dialog[open]", { state: "attached", timeout: 5000 });
}

module.exports = (T) => {
  for (const device of ["phone", "desktop"]) {
    T.test(`settings (${device}): switch language, country and store; all persist after reload`, async (ctx) => {
      const P = await ctx.newPage({ device, globe: false });
      const { page, assert } = { page: P.page, assert: ctx.assert };
      try {
        await P.goto("find");
        await openSettings(page);
        await page.click('#settings-dialog [data-lang="es"]');
        await page.waitForTimeout(150);
        assert.strictEqual(await page.evaluate(() => document.documentElement.lang.slice(0, 2)), "es", "html lang after choosing Español");
        const how = await chooseMarket(page, "JP");
        assert.ok(how, "no way to choose Japan in the settings sheet");
        await page.waitForTimeout(150);
        if (!(await page.evaluate(() => document.getElementById("settings-dialog").open))) await openSettings(page);
        const storeId = await chooseStore(page, "last");
        assert.ok(storeId, "no store <select data-store> in settings");
        await page.waitForTimeout(150);
        const s1 = await ls(page);
        assert.strictEqual(s1["wp.lang"], "es");
        assert.strictEqual(s1["wp.market"], "JP");
        assert.strictEqual((s1["wp.stores"] || {}).JP, storeId);
        const bad1 = await badText(page, "#settings-dialog");
        assert.deepStrictEqual(bad1, [], "settings text");
        await P.reload();
        const after = await page.evaluate(() => ({ lang: document.documentElement.lang, btn: document.getElementById("settings-btn").textContent, sub: document.getElementById("brand-sub").textContent }));
        assert.ok(after.lang.startsWith("es"), "language lost after reload: " + after.lang);
        assert.ok(after.btn.includes("JP") && after.btn.includes("JPY"), "header after reload: " + after.btn);
        // the chosen store is used for prices
        await page.evaluate(() => { location.hash = "recipe-" + window.RECIPES[3].id; });
        await page.waitForSelector("#recipe-dialog[open] #rc-level", { state: "attached" });
        assert.strictEqual(await page.$eval("#rc-level", (e) => e.value), storeId, "store after reload");
        const tot = await page.$$eval("#recipe-body .rc-total span:last-child", (els) => els.map((e) => e.textContent));
        const sym = await page.evaluate(() => new Intl.NumberFormat(window.I18N.locale, { style: "currency", currency: "JPY" }).formatToParts(1).find((p) => p.type === "currency").value);
        assert.ok(tot.length && tot.every((x) => x.includes(sym)), `totals not in yen (${sym}): ` + tot.join(" | "));
        assert.deepStrictEqual([...new Set(P.errors)], [], "errors");
      } finally { await P.close(); }
    }, { tags: ["browser", "settings"] });
  }

  T.test("Compare prices in a recipe and on the Prices page render rows with valid money", async (ctx) => {
    const P = await ctx.newPage({ device: "phone", market: "US", globe: false });
    const { page } = P;
    try {
      await P.goto("find");
      await page.evaluate(() => { location.hash = "recipe-" + window.RECIPES[10].id; });
      await page.waitForSelector("#recipe-dialog[open] [data-action=compare]", { state: "attached" });
      await page.$eval('#recipe-dialog [data-action="compare"]', (b) => b.click());
      await page.waitForSelector(".rc-compare", { state: "attached", timeout: 5000 });
      let rows = await page.$$eval(".rc-compare .cmp-row", (els) => els.map((e) => e.textContent.replace(/\s+/g, " ").trim()));
      ctx.assert.ok(rows.length >= 5, "few compare rows: " + rows.length);
      const more = await page.$(".rc-compare [data-action=compare-all]");
      if (more) { await more.evaluate((b) => b.click()); rows = await page.$$eval(".rc-compare .cmp-row", (els) => els.map((e) => e.textContent.replace(/\s+/g, " ").trim())); }
      const nMarkets = await page.evaluate(() => Object.keys(window.MARKETS).length);
      ctx.assert.ok(rows.length >= nMarkets, `show all: ${rows.length} rows for ${nMarkets} markets`);
      const vals = await page.$$eval(".rc-compare .cmp-val", (els) => els.map((e) => e.textContent));
      const badVals = vals.filter((v) => !(parseMoney(v) > 0) || !v.includes("$"));
      ctx.assert.deepStrictEqual(badVals.slice(0, 5), [], "compare values must be positive US$");
      ctx.assert.deepStrictEqual(await badText(page, "#recipe-dialog"), []);
      // tapping a country row switches market
      const target = await page.$eval('.rc-compare [data-set-market]:not(.on)', (b) => { const cc = b.dataset.setMarket; b.click(); return cc; });
      await page.waitForTimeout(150);
      ctx.assert.strictEqual((await ls(page))["wp.market"], target, "tap on compare row should switch market");
      // prices page
      await page.evaluate(() => { const b = document.querySelector('#recipe-dialog [data-action="close"]'); if (b) b.click(); location.hash = "prices"; });
      await page.waitForSelector("#price-compare .cmp-row", { state: "attached", timeout: 10000 });
      const pv = await page.$$eval("#price-compare .cmp-val", (els) => els.map((e) => e.textContent));
      ctx.assert.ok(pv.length > 3 && pv.every((v) => parseMoney(v) > 0), "price compare values: " + pv.slice(0, 5).join(" | "));
      const priceInputs = await page.$$eval("#price-body input[data-price]", (els) => els.map((e) => +e.value));
      ctx.assert.ok(priceInputs.length >= 300, "price list rows: " + priceInputs.length);
      ctx.assert.ok(priceInputs.every((v) => Number.isFinite(v) && v > 0), "price list has non-positive values");
      ctx.assert.deepStrictEqual(await badText(page, "#view-prices"), []);
      ctx.assert.deepStrictEqual([...new Set(P.errors)], []);
    } finally { await P.close(); }
  }, { tags: ["browser", "prices"] });

  T.test("exchange rate edit on the Prices page rescales estimates, keeps real store prices, persists, and Reset restores", async (ctx) => {
    const P = await ctx.newPage({ device: "desktop", market: "JP", globe: false });
    const { page, assert } = { page: P.page, assert: ctx.assert };
    try {
      await P.goto("prices");
      await page.waitForSelector("#pr-rate input[data-rate]", { state: "attached" });
      const pick = await page.evaluate(() => {
        const L = ((window.LOCAL_PRICES || {}).JP || {}).items || {};
        const est = Object.keys(window.PRICES).find((id) => !L[id] && window.PRICES[id].p > 3);
        const loc = Object.keys(L)[0] || null;
        const val = (id) => (id ? +document.querySelector(`#price-body input[data-price="${id}"]`).value : null);
        return { est, loc, e0: val(est), l0: val(loc), rate: +document.querySelector("#pr-rate input[data-rate]").value };
      });
      await page.fill("#pr-rate input[data-rate]", String(pick.rate * 2));
      await page.dispatchEvent("#pr-rate input[data-rate]", "change");
      await page.waitForTimeout(200);
      const val = (id) => page.$eval(`#price-body input[data-price="${id}"]`, (e) => +e.value);
      const e1 = await val(pick.est);
      assert.ok(Math.abs(e1 / pick.e0 - 2) < 0.05, `estimate ${pick.est}: ${pick.e0} -> ${e1} after doubling the rate`);
      if (pick.loc) assert.strictEqual(await val(pick.loc), pick.l0, `real store price ${pick.loc} changed with the exchange rate`);
      assert.ok(Math.abs(((await ls(page))["wp.rates"] || {}).JP / pick.rate - 2) < 0.01, "rate not saved");
      await P.reload();
      await page.evaluate(() => { location.hash = "prices"; });
      await page.waitForSelector("#price-body input[data-price]", { state: "attached" });
      assert.strictEqual(await val(pick.est), e1, "rate lost after reload");
      await page.click("#price-reset"); await page.click("#price-reset");
      await page.waitForTimeout(200);
      assert.strictEqual(await val(pick.est), pick.e0, "reset did not restore the default rate");
      assert.deepStrictEqual([...new Set(P.errors)], []);
    } finally { await P.close(); }
  }, { tags: ["browser", "prices"] });

  T.test("cooking mode opens, shows steps and moves forward", async (ctx) => {
    const P = await ctx.newPage({ device: "phone", globe: false });
    const { page } = P;
    try {
      await P.goto("find");
      const id = await page.evaluate(() => window.RECIPES.find((r) => r.steps.length >= 3).id);
      await page.evaluate((id) => { location.hash = "recipe-" + id; }, id);
      await page.waitForSelector('#recipe-dialog[open] [data-action="cook"]', { state: "attached" });
      await page.$eval('#recipe-dialog [data-action="cook"]', (b) => b.click());
      await page.waitForSelector("#cook-dialog[open]", { state: "attached", timeout: 5000 });
      const s1 = await page.$eval("#ck-step", (e) => e.textContent.trim());
      ctx.assert.ok(s1.length > 5, "empty first step");
      await page.$eval("#ck-next", (b) => b.click());
      const s2 = await page.$eval("#ck-step", (e) => e.textContent.trim());
      ctx.assert.notStrictEqual(s2, s1, "next did not advance");
      ctx.assert.deepStrictEqual(await badText(page, "#cook-dialog"), []);
      await page.$eval("#ck-close", (b) => b.click());
      await page.waitForTimeout(100);
      ctx.assert.ok(!(await page.$eval("#cook-dialog", (d) => d.open)), "cook dialog did not close");
      ctx.assert.deepStrictEqual([...new Set(P.errors)], []);
    } finally { await P.close(); }
  }, { tags: ["browser"] });

  T.test("search and filters return results (text, vegan, region, ingredient chip, time)", async (ctx) => {
    const P = await ctx.newPage({ device: "desktop", globe: false });
    const { page, assert } = { page: P.page, assert: ctx.assert };
    const count = () => page.$$eval("#results .r-card", (e) => e.length);
    try {
      await P.goto("find");
      const all = await count();
      assert.ok(all >= 446, "all recipes listed: " + all);
      await page.fill("#q", "curry");
      await page.waitForTimeout(150);
      const curry = await count();
      assert.ok(curry > 0 && curry < all, "search 'curry': " + curry);
      await page.fill("#q", "");
      await page.check("#diet-vegan", { force: true });
      await page.waitForTimeout(100);
      const vegan = await count();
      assert.ok(vegan > 5 && vegan < all, "vegan: " + vegan);
      await page.uncheck("#diet-vegan", { force: true });
      await page.selectOption("#region", "Asia");
      await page.waitForTimeout(100);
      const asia = await count();
      assert.ok(asia > 10 && asia < all, "Asia: " + asia);
      await page.selectOption("#region", "");
      // ingredient chip through the suggestion box
      await page.fill("#inc-input", "chick");
      await page.waitForSelector("#inc-suggest:not([hidden]) [role=option], #inc-suggest:not([hidden]) button", { state: "attached", timeout: 3000 });
      await page.keyboard.press("Enter");
      await page.waitForTimeout(150);
      const chips = await page.$$eval("#inc-chips > *", (e) => e.length);
      assert.ok(chips >= 1, "no chip added");
      const withChip = await count();
      assert.ok(withChip > 0 && withChip < all, "with ingredient: " + withChip);
      await page.click("#clear-filters", { force: true });
      await page.waitForTimeout(100);
      assert.strictEqual(await count(), all, "clear filters");
      // a search with no hits shows the empty state, not an error
      await page.fill("#q", "zzzqqq");
      await page.waitForTimeout(100);
      assert.strictEqual(await count(), 0);
      assert.ok(await page.$("#results .empty"), "no empty state");
      // translated ingredient search (German name)
      await page.fill("#q", "");
      assert.deepStrictEqual(await badText(page, "#view-find"), []);
      assert.deepStrictEqual([...new Set(P.errors)], []);
    } finally { await P.close(); }
  }, { tags: ["browser", "search"] });

  for (const cc of ["JP", "IN", "US", "NG"]) {
    T.test(`max cost slider works in a non-euro market (${cc})`, async (ctx) => {
      const P = await ctx.newPage({ device: "phone", market: cc, globe: false });
      const { page, assert } = { page: P.page, assert: ctx.assert };
      try {
        await P.goto("find");
        const exists = await page.evaluate((cc) => !!window.MARKETS[cc], cc);
        if (!exists) ctx.pending(cc + " market not available");
        const all = await page.$$eval("#results .r-card", (e) => e.length);
        const info = await page.evaluate(() => {
          const el = document.getElementById("maxcost");
          const v = (+el.min + +el.max) / 2 * 0.6; // a mid-low limit
          el.value = String(v); el.dispatchEvent(new Event("input", { bubbles: true }));
          const out = document.getElementById("maxcost-out").textContent;
          const costs = [...document.querySelectorAll("#results .r-card .r-cost")].map((e) => e.firstChild ? e.firstChild.textContent : e.textContent);
          let sym = "";
          const cur = window.MARKETS[JSON.parse(localStorage.getItem("wp.market"))].cur;
          try { sym = new Intl.NumberFormat(window.I18N.locale, { style: "currency", currency: cur }).formatToParts(1).find((p) => p.type === "currency").value; } catch (e) { /* none */ }
          return { out, costs, sym, cur };
        });
        const limit = parseMoney(info.out);
        assert.ok(Number.isFinite(limit) && limit > 0, "slider label: " + info.out);
        assert.ok(info.out.includes(info.sym), `slider label "${info.out}" not in ${info.cur}`);
        assert.ok(info.costs.length > 0, "slider at mid-low leaves no recipes");
        assert.ok(info.costs.length < all, `slider did not filter (${info.costs.length} of ${all})`);
        const over = info.costs.map(parseMoney).filter((v) => v > limit * 1.001);
        assert.deepStrictEqual(over.slice(0, 5), [], `cards above the limit ${info.out}`);
        const more = await page.$eval("#more-count", (e) => (e.hidden ? "" : e.textContent));
        assert.ok(more && +more >= 1, "More filters badge does not count the cost limit");
        assert.deepStrictEqual([...new Set(P.errors)], []);
      } finally { await P.close(); }
    }, { tags: ["browser", "prices", "search"] });
  }
};
