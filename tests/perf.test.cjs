/* Rough speed budget, one page at a time (no parallel load). Phones are ~3-5x slower than this machine. */
"use strict";

async function timed(page, fn, arg) {
  return page.evaluate(async ([src, arg]) => {
    const f = eval("(" + src + ")"); // eslint-disable-line no-eval
    const t0 = performance.now();
    f(arg);
    await new Promise((r) => setTimeout(r, 0));
    await new Promise((r) => requestAnimationFrame(() => setTimeout(r, 0)));
    return Math.round(performance.now() - t0);
  }, [fn.toString(), arg]);
}

module.exports = (T) => {
  T.test("speed: Prices page, market switch and recipe open stay within budget", async (ctx) => {
    const P = await ctx.newPage({ device: "desktop", globe: false });
    const { page } = P;
    try {
      await P.goto("find");
      const m = {};
      m.find = await timed(page, () => { location.hash = "plan"; setTimeout(() => { location.hash = "find"; }); });
      m.pricesFirst = await timed(page, () => { location.hash = "prices"; });
      m.pricesSwitchMarket = await timed(page, () => { const s = document.getElementById("pr-market"); s.value = "JP"; s.dispatchEvent(new Event("change", { bubbles: true })); });
      m.pricesSwitchStore = await timed(page, () => { const s = document.getElementById("pr-store"); s.value = s.options[s.options.length - 1].value; s.dispatchEvent(new Event("change", { bubbles: true })); });
      m.findAfterSwitch = await timed(page, () => { location.hash = "find"; });
      m.recipeOpen = await timed(page, () => { location.hash = "recipe-" + window.RECIPES[20].id; });
      m.compareOpen = await timed(page, () => { document.querySelector('#recipe-dialog [data-action="compare"]').click(); });
      m.receiptSwitchMarket = await timed(page, () => { const s = document.getElementById("rc-market"); s.value = "US"; s.dispatchEvent(new Event("change", { bubbles: true })); });
      ctx.log(Object.entries(m).map(([k, v]) => `${k} ${v}ms`).join(", "));
      const budget = { pricesFirst: 2500, pricesSwitchMarket: 2500, pricesSwitchStore: 2000, findAfterSwitch: 1500, recipeOpen: 800, compareOpen: 1500, receiptSwitchMarket: 1500, find: 1500 };
      const over = Object.keys(budget).filter((k) => m[k] > budget[k]).map((k) => `${k}: ${m[k]} ms (budget ${budget[k]})`);
      ctx.assert.deepStrictEqual(over, [], "too slow");
      ctx.assert.deepStrictEqual([...new Set(P.errors)], []);
    } finally { await P.close(); }
  }, { tags: ["browser", "perf"] });
};
