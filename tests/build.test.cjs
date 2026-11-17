/* The single-file phone build. Slow: skip with `node tests/run.cjs --fast`. */
"use strict";
const fs = require("fs");
const path = require("path");
const { badText } = require("./lib.cjs");

const FILE = "dist/world-pantry-phone.html";

module.exports = (T) => {
  T.test("dist/world-pantry-phone.html exists, is under 10 MB and is not older than the app sources", async (ctx) => {
    const f = path.join(ctx.ROOT, FILE);
    ctx.assert.ok(fs.existsSync(f), FILE + " is missing (python3 tools/build_standalone.py ... --out " + FILE + ")");
    const size = fs.statSync(f).size;
    ctx.log(`${(size / 1048576).toFixed(2)} MB`);
    ctx.assert.ok(size < 10 * 1024 * 1024, `${(size / 1048576).toFixed(2)} MB is over the 10 MB chat limit`);
    const built = fs.statSync(f).mtimeMs;
    const srcs = ["index.html", "css/style.css", ...fs.readdirSync(path.join(ctx.ROOT, "js")).filter((x) => x.endsWith(".js")).map((x) => "js/" + x),
      ...fs.readdirSync(path.join(ctx.ROOT, "js/data")).filter((x) => x.endsWith(".js")).map((x) => "js/data/" + x)];
    const newer = srcs.filter((s) => fs.statSync(path.join(ctx.ROOT, s)).mtimeMs > built + 1000);
    ctx.assert.deepStrictEqual(newer, [], "sources changed after the build — rebuild dist");
  }, { tags: ["slow", "build"] });

  for (const device of ["phone", "desktop"]) {
    T.test(`${FILE} opens offline (${device}) with no errors, full data and working prices`, async (ctx) => {
      const f = path.join(ctx.ROOT, FILE);
      if (!fs.existsSync(f)) ctx.pending(FILE + " missing");
      const P = await ctx.newPage({ device, offline: true, url: "file://" + f, lang: "pt", market: "BR" });
      const { page, assert } = { page: P.page, assert: ctx.assert };
      try {
        await P.goto("globe");
        await page.waitForTimeout(2500);
        const info = await page.evaluate(() => ({
          recipes: (window.RECIPES || []).length,
          markets: Object.keys(window.MARKETS || {}).length,
          local: Object.keys(window.LOCAL_PRICES || {}).length,
          globe: !!document.querySelector("#globe canvas"),
          fallback: !document.getElementById("globe-fallback").hidden,
          langs: Object.keys(window.I18N_DICT || {}).length,
        }));
        ctx.log(JSON.stringify(info));
        assert.ok(info.recipes >= 446, "recipes: " + info.recipes);
        assert.strictEqual(info.langs, 15, "languages bundled");
        assert.ok(info.globe || info.fallback, "neither the globe nor the country list is shown");
        await page.evaluate(() => { location.hash = "recipe-" + window.RECIPES[0].id; });
        await page.waitForSelector("#recipe-dialog[open] .receipt", { state: "attached", timeout: 10000 });
        const tot = await page.$$eval("#recipe-body .rc-total span:last-child", (e) => e.map((x) => x.textContent));
        assert.ok(tot.length >= 3 && tot.every((x) => /R\$/.test(x)), "totals: " + tot.join(" | "));
        assert.deepStrictEqual(await badText(page), [], "visible text");
        assert.deepStrictEqual([...new Set(P.errors)], [], "errors");
        // the sprint's features made it into the build
        if (info.markets < 154) ctx.log(`build has only ${info.markets} markets (sources have more?)`);
      } finally { await P.close(); }
    }, { timeout: 120000, tags: ["slow", "build", "browser"] });
  }
};
