/* Features of the "prices from around the world" sprint. A test is "pending" while the feature's code/DOM is absent. */
"use strict";
const { badText, parseMoney } = require("./lib.cjs");

const ls = (page) => page.evaluate(() => Object.fromEntries(Object.keys(localStorage).filter((k) => k.startsWith("wp.")).map((k) => [k, JSON.parse(localStorage.getItem(k))])));

module.exports = (T) => {
  T.test("first visit: country (and language) auto-detected from browser locale", async (ctx) => {
    const cases = [
      { locale: "en-US", tz: "America/New_York", market: "US", lang: "en" },
      { locale: "pt-BR", tz: "America/Sao_Paulo", market: "BR", lang: "pt" },
      { locale: "ja-JP", tz: "Asia/Tokyo", market: "JP", lang: "ja" },
      { locale: "hi-IN", tz: "Asia/Kolkata", market: "IN", lang: "hi" },
      { locale: "es-MX", tz: "Europe/Berlin", market: "MX", lang: "es" },   // locale region wins over time zone
      { locale: "en", tz: "Asia/Tokyo", market: "JP", lang: "en" },          // no region: time zone decides
      { locale: "fr", tz: "Etc/UTC", market: "DE", lang: "fr" },             // nothing to go on: Germany (base prices)
    ];
    const got = [];
    for (const c of cases) {
      const P = await ctx.newPage({ device: "phone", fresh: true, locale: c.locale, timezoneId: c.tz, globe: false });
      try {
        await P.goto("find");
        const r = await P.page.evaluate(() => { const b = document.getElementById("settings-btn"); return { btn: (b.querySelector(".sb-mk") || b).textContent, lang: document.documentElement.lang }; });
        const m = /([A-Z]{2}) · ([A-Z]{3})/.exec(r.btn);
        got.push({ ...c, gotMarket: m ? m[1] : r.btn, gotLang: r.lang.slice(0, 2), errors: P.errors });
      } finally { await P.close(); }
    }
    if (got.every((g) => g.gotMarket === "DE")) ctx.pending("every locale still lands on DE (auto-detect not active)");
    const bad = got.filter((g) => g.gotMarket !== g.market || g.gotLang !== g.lang || g.errors.length)
      .map((g) => `locale ${g.locale} tz ${g.tz}: market ${g.gotMarket} (want ${g.market}), lang ${g.gotLang} (want ${g.lang})${g.errors.length ? " errors: " + g.errors.join("; ") : ""}`);
    ctx.assert.deepStrictEqual(bad, []);
  }, { tags: ["browser", "feature", "detect"] });

  T.test("a saved country beats auto-detection; detection is not written over a later choice", async (ctx) => {
    const P = await ctx.newPage({ device: "phone", fresh: true, locale: "ja-JP", timezoneId: "Asia/Tokyo", storage: { market: "FR" }, globe: false });
    try {
      await P.goto("find");
      const btn = await P.page.$eval("#settings-btn", (e) => e.textContent);
      ctx.assert.ok(btn.includes("FR"), "saved FR replaced by detection: " + btn);
    } finally { await P.close(); }
  }, { tags: ["browser", "feature", "detect"] });

  T.test("US market: US units in ingredients and °F in every oven step; Metric toggle restores °C and persists", async (ctx) => {
    const P = await ctx.newPage({ device: "desktop", market: "US", globe: false });
    const { page, assert } = { page: P.page, assert: ctx.assert };
    try {
      await P.goto("find");
      await page.click("#settings-btn");
      await page.waitForSelector("#settings-dialog[open]", { state: "attached" });
      const hasUnits = await page.$("#settings-dialog [data-units]");
      if (!hasUnits) ctx.pending("no units setting in the settings sheet yet");
      await page.$eval('#settings-dialog [data-action="settings-close"]', (b) => b.click());
      // every recipe that names a Celsius temperature
      const res = await page.evaluate(() => {
        const re = /\d\s*(°|º)\s*C\b|\b[12]\d{2}C\b/;
        const out = { checked: 0, leftC: [], badF: [], metricIng: [], sample: "" };
        for (const r of window.RECIPES) {
          if (!r.steps.some((s) => re.test(s)) && out.checked > 0 && r.ing.length < 6) continue;
          location.hash = "recipe-" + r.id; window.dispatchEvent(new HashChangeEvent("hashchange"));
          const steps = [...document.querySelectorAll("#recipe-body .steps li")].map((li) => li.textContent);
          const ings = [...document.querySelectorAll("#recipe-body .ing-list .qty")].map((e) => e.textContent);
          if (r.steps.some((s) => re.test(s))) {
            out.checked++;
            steps.forEach((s) => { if (re.test(s)) out.leftC.push(`${r.id}: ${s.slice(0, 90)}`); });
            steps.forEach((s) => (s.match(/(\d{2,3})\s?°F/g) || []).forEach((m) => { const v = parseInt(m, 10); if (v < 32 || v > 600) out.badF.push(`${r.id}: ${m}`); }));
            if (!out.sample) out.sample = steps.find((s) => /°F/.test(s)) || "";
          }
          ings.forEach((q) => { if (/\d\s?(g|kg|ml|l)$/.test(q.trim())) out.metricIng.push(`${r.id}: ${q}`); });
          if (/NaN|undefined/.test(ings.join(" "))) out.metricIng.push(`${r.id}: ${ings.join(", ")}`);
        }
        return out;
      });
      ctx.log(`${res.checked} recipes with Celsius steps; e.g. "${res.sample.slice(0, 80)}"`);
      assert.ok(res.checked > 0, "no recipe with a °C step found");
      assert.deepStrictEqual(res.leftC.slice(0, 10), [], `${res.leftC.length} steps still in °C for the US`);
      assert.deepStrictEqual(res.badF.slice(0, 10), [], "implausible °F values");
      assert.deepStrictEqual(res.metricIng.slice(0, 10), [], `${res.metricIng.length} ingredient amounts still metric for the US`);
      // cooking mode follows units too
      const id = await page.evaluate(() => window.RECIPES.find((r) => r.steps.some((s) => /\d\s*°C/.test(s))).id);
      await page.evaluate((id) => { location.hash = "recipe-" + id; }, id);
      await page.waitForTimeout(150);
      await page.$eval('#recipe-dialog [data-action="cook"]', (b) => b.click());
      await page.waitForSelector("#cook-dialog[open]", { state: "attached" });
      const cookText = await page.evaluate(async () => {
        const seen = [];
        for (let i = 0; i < 20; i++) { seen.push(document.getElementById("ck-step").textContent); document.getElementById("ck-next").click(); }
        return seen.join(" ");
      });
      assert.ok(/°F/.test(cookText) && !/\d\s*°C/.test(cookText), "cooking mode not in °F: " + cookText.slice(0, 200));
      await page.$eval("#ck-close", (b) => b.click());
      // switch to metric
      await page.evaluate(() => { const b = document.querySelector('#recipe-dialog [data-action="close"]'); if (b) b.click(); });
      await page.click("#settings-btn");
      await page.$eval('#settings-dialog [data-units="metric"]', (b) => b.click());
      assert.strictEqual((await ls(page))["wp.units"], "metric");
      await P.reload();
      await page.evaluate((id) => { location.hash = "recipe-" + id; }, id);
      await page.waitForSelector("#recipe-dialog[open] .steps", { state: "attached" });
      const steps = await page.$$eval("#recipe-body .steps li", (e) => e.map((x) => x.textContent).join(" "));
      assert.ok(/°C/.test(steps) && !/°F/.test(steps), "metric after reload: " + steps.slice(0, 160));
      assert.deepStrictEqual([...new Set(P.errors)], []);
    } finally { await P.close(); }
  }, { timeout: 200000, tags: ["browser", "feature", "units"] });

  T.test("metric countries stay metric (DE, IN, GB) with no °F", async (ctx) => {
    for (const cc of ["DE", "IN", "GB"]) {
      const P = await ctx.newPage({ device: "phone", market: cc, globe: false });
      try {
        await P.goto("find");
        const id = await P.page.evaluate(() => window.RECIPES.find((r) => r.steps.some((s) => /\d\s*°C/.test(s))).id);
        await P.page.evaluate((id) => { location.hash = "recipe-" + id; }, id);
        await P.page.waitForSelector("#recipe-dialog[open] .steps", { state: "attached" });
        const txt = await P.page.$eval("#recipe-body", (e) => e.textContent);
        ctx.assert.ok(!/°F|\boz\b|\bcups?\b/.test(txt), `${cc}: US units shown`);
      } finally { await P.close(); }
    }
  }, { tags: ["browser", "feature", "units"] });

  T.test("where-you-shop picker offers ≥154 countries incl. every recipe country, and its search works", async (ctx) => {
    const P = await ctx.newPage({ device: "phone", globe: false });
    const { page, assert } = { page: P.page, assert: ctx.assert };
    try {
      await P.goto("find");
      await page.click("#settings-btn");
      await page.waitForSelector("#settings-dialog[open]", { state: "attached" });
      const info = await page.evaluate(() => {
        const items = [...document.querySelectorAll("#settings-dialog [data-set-market], #settings-dialog select[data-market] option")];
        const codes = [...new Set(items.map((e) => e.dataset.setMarket || e.value))];
        const iso = window.I18N.ISO2;
        const need = [...new Set(window.RECIPES.map((r) => iso[r.country]))];
        return { n: codes.length, missing: need.filter((c) => !codes.includes(c)), fallback: Object.keys(window.MARKETS).filter((c) => window.MARKETS[c].fallback) };
      });
      if (info.n < 60) ctx.pending(`only ${info.n} countries in the picker so far`);
      assert.ok(info.n >= 154, `${info.n} countries in the picker`);
      assert.deepStrictEqual(info.missing, [], "recipe countries missing from the picker");
      if (info.fallback.length) ctx.log(`${info.fallback.length} markets use the placeholder fallback (EUR guess): ${info.fallback.slice(0, 20).join(" ")}`);
      const q = await page.$("#mk-q");
      if (q) {
        const vis = async (term) => { await q.fill(term); await page.waitForTimeout(100); return page.$$eval("#mk-list .mk-item", (els) => els.filter((e) => !e.hidden && e.offsetParent).map((e) => e.dataset.setMarket)); };
        for (const [term, cc] of [["japan", "JP"], ["jpy", "JP"], ["nigeria", "NG"], ["usd", "US"]]) {
          const v = await vis(term);
          assert.ok(v.includes(cc) && v.length < 20, `search '${term}': ${v.join(",")}`);
        }
        await q.fill("zzzz");
        await page.waitForTimeout(100);
        assert.ok(await page.$eval("#mk-none", (e) => !e.hidden), "no 'no match' message");
        await q.fill("bra");
        await page.waitForTimeout(100);
        await page.$eval('#mk-list [data-set-market="BR"]', (b) => b.click());
        await page.waitForTimeout(100);
        assert.strictEqual((await ls(page))["wp.market"], "BR");
      }
      assert.deepStrictEqual(await badText(page, "#settings-dialog"), []);
      assert.deepStrictEqual([...new Set(P.errors)], []);
    } finally { await P.close(); }
  }, { tags: ["browser", "feature", "markets"] });

  T.test("LOCAL_PRICES replace the estimate for that market (cheapest store) and store factors still apply", async (ctx) => {
    const P = await ctx.newPage({ device: "desktop", globe: false });
    const { page, assert } = { page: P.page, assert: ctx.assert };
    try {
      await P.goto("find");
      const L = await page.evaluate(() => window.LOCAL_PRICES || null);
      if (!L || !Object.keys(L).length) ctx.pending("window.LOCAL_PRICES not loaded");
      const markets = Object.keys(L).filter((cc) => Object.keys(L[cc].items || {}).length).sort((a, b) => Object.keys(L[b].items).length - Object.keys(L[a].items).length).slice(0, 4);
      const bad = [];
      let checked = 0;
      for (const cc of markets) {
        const res = await page.evaluate((cc) => {
          const out = [];
          const m = window.MARKETS[cc];
          // the store with factor 1 and no type shelf factors: the base the local price is for
          const sel = (id, v) => { const el = document.querySelector(id); el.value = v; el.dispatchEvent(new Event("change", { bubbles: true })); };
          location.hash = "prices"; window.dispatchEvent(new HashChangeEvent("hashchange"));
          sel("#pr-market", cc);
          for (const st of [m.stores[0], m.stores[m.stores.length - 1]]) {
            sel("#pr-store", st[0]);
            const tf = window.STORE_TYPES[st[2]] || {};
            for (const [id, it] of Object.entries(window.LOCAL_PRICES[cc].items)) {
              if (!window.PRICES[id]) continue;
              const inp = document.querySelector(`#price-body input[data-price="${id}"]`);
              if (!inp) { out.push({ id, st: st[0], missing: true }); continue; }
              const want = it.p * st[3] * (tf[window.PRICES[id].c] || 1);
              const row = inp.closest("tr");
              out.push({ id, st: st[0], got: +inp.value, want, tag: row ? row.textContent : "" });
            }
          }
          return out;
        }, cc);
        for (const r of res) {
          checked++;
          if (r.missing) { bad.push(`${cc}/${r.st}/${r.id}: no price row`); continue; }
          const tol = Math.max(0.011, r.want * 0.011);
          if (Math.abs(r.got - r.want) > tol) bad.push(`${cc}/${r.st}/${r.id}: price list shows ${r.got}, local price says ${r.want.toFixed(2)}`);
        }
      }
      ctx.log(`${checked} local prices checked in ${markets.join(", ")}`);
      assert.deepStrictEqual(bad.slice(0, 15), [], bad.length + " mismatches");
      assert.deepStrictEqual([...new Set(P.errors)], []);
    } finally { await P.close(); }
  }, { timeout: 200000, tags: ["browser", "feature", "prices"] });

  T.test("'store price' vs 'estimate' markers on the Prices page and in the receipt", async (ctx) => {
    const P = await ctx.newPage({ device: "phone", globe: false });
    const { page, assert } = { page: P.page, assert: ctx.assert };
    try {
      await P.goto("find");
      const L = await page.evaluate(() => window.LOCAL_PRICES || {});
      const withLocal = Object.keys(L).filter((cc) => Object.keys(L[cc].items || {}).length).sort((a, b) => Object.keys(L[b].items).length - Object.keys(L[a].items).length);
      if (!withLocal.length) ctx.pending("no LOCAL_PRICES yet");
      const cc = withLocal[0];
      const nLocal = Object.keys(L[cc].items).filter((id) => true).length;
      await page.evaluate((cc) => { localStorage.setItem("wp.market", JSON.stringify(cc)); }, cc);
      await P.reload();
      await page.evaluate(() => { location.hash = "prices"; });
      await page.waitForSelector("#price-body input[data-price]", { state: "attached" });
      const tags = await page.evaluate(() => ({
        real: document.querySelectorAll("#price-body .src-tag.real").length,
        est: document.querySelectorAll("#view-prices .src-tag:not(.real):not(.mine)").length, // per row or in the legend
        any: document.querySelectorAll("[class*=src]").length,
      }));
      if (!tags.any) ctx.pending("no price source markers in the DOM yet");
      assert.ok(tags.real > 0, `${cc}: no 'store price' markers on the Prices page`);
      assert.ok(tags.real <= nLocal, `${cc}: ${tags.real} 'store price' markers but only ${nLocal} local prices`);
      assert.ok(tags.est > 0, `${cc}: no 'estimate' markers`);
      // a recipe that uses one of the local items says how many prices are real
      const rid = await page.evaluate((cc) => { const ids = new Set(Object.keys(window.LOCAL_PRICES[cc].items)); return window.RECIPES.find((r) => r.ing.some(([i]) => ids.has(i))).id; }, cc);
      await page.evaluate((rid) => { location.hash = "recipe-" + rid; }, rid);
      await page.waitForSelector("#recipe-dialog[open] .receipt", { state: "attached" });
      const rc = await page.$eval("#recipe-body .receipt", (e) => e.textContent);
      assert.ok(/store price|real/i.test(rc), "receipt does not mention real store prices: " + rc.slice(-300));
      // a market with no local prices says all are estimates and has no 'store price' tags
      const none = await page.evaluate(() => Object.keys(window.MARKETS).find((c) => !(window.LOCAL_PRICES || {})[c]));
      if (none) {
        await page.evaluate((c) => { location.hash = "prices"; const s = document.querySelector("#pr-market"); s.value = c; s.dispatchEvent(new Event("change", { bubbles: true })); }, none);
        await page.waitForTimeout(200);
        const real2 = await page.$$eval("#price-body .src-tag.real", (e) => e.length);
        assert.strictEqual(real2, 0, `${none} has no local prices but shows ${real2} 'store price' tags`);
      }
      assert.deepStrictEqual(await badText(page, "#view-prices"), []);
      assert.deepStrictEqual([...new Set(P.errors)], []);
    } finally { await P.close(); }
  }, { tags: ["browser", "feature", "prices"] });

  T.test("all languages translate the new sprint UI (settings sheet has no English leftovers in de/ja/ar)", async (ctx) => {
    const NEW = ["Units", "Metric (g, ml, °C)", "US (oz, cups, °F)", "Search countries or currencies…", "store price", "estimate"];
    const bad = [];
    for (const lang of ["de", "ja", "ar"]) {
      const P = await ctx.newPage({ device: "phone", lang, globe: false });
      try {
        await P.goto("prices");
        await P.page.click("#settings-btn");
        await P.page.waitForSelector("#settings-dialog[open]", { state: "attached" });
        const txt = await P.page.evaluate(() => document.getElementById("settings-dialog").innerText + " " + [...document.querySelectorAll("#settings-dialog [placeholder]")].map((e) => e.placeholder).join(" ") + " " + document.getElementById("view-prices").innerText);
        const left = NEW.filter((s) => txt.includes(s));
        if (left.length) bad.push(`${lang}: ${left.join(" | ")}`);
      } finally { await P.close(); }
    }
    ctx.assert.deepStrictEqual(bad, []);
  }, { tags: ["browser", "feature", "i18n"] });
};
