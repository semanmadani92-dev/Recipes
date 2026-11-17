/* Every language on phone and desktop: loads without errors, no leaked placeholders in visible text. */
"use strict";
const { badText, pool } = require("./lib.cjs");

const LANGS = ["en", "zh", "hi", "es", "ar", "fr", "bn", "pt", "ru", "ur", "id", "de", "ja", "tr", "vi", "ko"];
// a non-euro market per language, so money formatting is exercised too (falls back to DE if the market does not exist)
const MARKET_FOR = { en: "GB", zh: "CN", hi: "IN", es: "MX", ar: "SA", fr: "FR", bn: "BD", pt: "BR", ru: "RU", ur: "PK", id: "ID", de: "DE", ja: "JP", tr: "TR", vi: "VN", ko: "KR" };

const slow = [];
const GLOBE_LANGS = ["en", "ar", "ja", "hi"];
async function tour(ctx, lang, device) {
  const markets = await marketsList(ctx);
  const market = markets.includes(MARKET_FOR[lang]) ? MARKET_FOR[lang] : "DE";
  // the 3D globe (software WebGL here) is slow: load it for a few languages, the country list for the rest
  const P = await ctx.newPage({ device, lang, market, globe: GLOBE_LANGS.includes(lang) });
  const problems = [];
  try {
    const { page } = P;
    await P.goto("globe");
    await page.waitForTimeout(1200);
    const htmlLang = await page.evaluate(() => document.documentElement.lang);
    if (!htmlLang.toLowerCase().startsWith(lang)) problems.push(`<html lang> is "${htmlLang}"`);
    const check = async (where, scope) => { const b = await badText(page, scope); if (b.length) problems.push(`${where}: ${b.join("; ")}`); };
    await check("globe");
    for (const v of ["find", "plan", "pantry", "saved", "prices"]) {
      const t0 = Date.now();
      await page.evaluate((v) => { location.hash = v; }, v);
      await page.evaluate(() => new Promise((r) => requestAnimationFrame(() => r())));
      const ms = Date.now() - t0;
      if (ms > 4000) slow.push(`${lang}/${device}: #${v} took ${ms} ms to render (3 pages in parallel)`);
      await check(v, `#view-${v}`);
    }
    await check("header", "header");
    // a recipe with an oven step and a non-trivial receipt
    await page.evaluate(() => { location.hash = "recipe-" + window.RECIPES[0].id; });
    await page.waitForSelector("#recipe-dialog[open] .receipt", { state: "attached", timeout: 10000 });
    await check("recipe", "#recipe-dialog");
    await page.evaluate(() => { const b = document.querySelector('#recipe-dialog [data-action="close"]'); if (b) b.click(); });
    await page.click("#settings-btn");
    await page.waitForSelector("#settings-dialog[open]", { state: "attached", timeout: 5000 });
    await check("settings", "#settings-dialog");
    if (P.errors.length) problems.push("errors: " + [...new Set(P.errors)].slice(0, 6).join("\n   "));
  } finally { await P.close(); }
  return problems.length ? `${lang}/${device}/${market}: ${problems.join("\n  ")}` : null;
}

let _markets = null;
async function marketsList(ctx) {
  if (!_markets) { const { w } = ctx.data(); _markets = Object.keys(w.MARKETS); }
  return _markets;
}

module.exports = (T) => {
  for (const device of ["phone", "desktop"]) {
    T.test(`all 16 languages load on ${device} with no errors and no undefined/NaN/{n}/[object text`, async (ctx) => {
      const out = await pool(LANGS, 3, async (lang) => {
        try { return await tour(ctx, lang, device); } catch (e) {
          // one retry: a busy machine can time out a WebGL page load
          try { return await tour(ctx, lang, device); } catch (e2) { return `${lang}/${device}: ${String(e2.message).split("\n")[0]}`; }
        }
      });
      const bad = out.filter(Boolean);
      slow.splice(0).forEach((s) => ctx.log("slow: " + s));
      ctx.assert.deepStrictEqual(bad, [], bad.length + " languages with problems");
    }, { timeout: 300000, tags: ["browser", "i18n"] });
  }

  T.test("RTL: html dir=rtl for ar and ur, ltr for others; switching back restores ltr", async (ctx) => {
    const bad = [];
    for (const lang of ["ar", "ur", "en", "de", "ja"]) {
      const P = await ctx.newPage({ device: "phone", lang });
      try {
        await P.goto("find");
        const dir = await P.page.evaluate(() => document.documentElement.dir || getComputedStyle(document.documentElement).direction);
        const want = lang === "ar" || lang === "ur" ? "rtl" : "ltr";
        if (dir !== want) bad.push(`${lang}: dir=${dir}`);
        if (lang === "ar") {
          await P.page.click("#settings-btn");
          await P.page.click('#settings-dialog [data-lang="en"]');
          await P.page.waitForTimeout(200);
          const d2 = await P.page.evaluate(() => document.documentElement.dir || "ltr");
          if (d2 !== "ltr") bad.push(`ar -> en: dir stays ${d2}`);
        }
        // no horizontal page scroll on a phone
        const sw = await P.page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
        if (sw > 2) bad.push(`${lang}: page scrolls sideways by ${sw}px on a phone`);
        if (P.errors.length) bad.push(`${lang}: ${P.errors.join("; ")}`);
      } finally { await P.close(); }
    }
    ctx.assert.deepStrictEqual(bad, []);
  }, { tags: ["browser", "i18n"] });
};
