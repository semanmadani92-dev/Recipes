/* Shared helpers for the World Pantry tests: data loading in a sandbox, browser pages with offline CDN routing. */
"use strict";
const fs = require("fs");
const path = require("path");
const vm = require("vm");

// ---------- data files, evaluated like the browser does (window = global) ----------
function scriptsOf(html) {
  return [...html.matchAll(/<script[^>]+src="([^"]+)"/g)].map((m) => m[1]).filter((s) => !/^https?:/.test(s));
}
function loadData(ROOT) {
  const html = fs.readFileSync(path.join(ROOT, "index.html"), "utf8");
  const scripts = scriptsOf(html);
  const sandbox = { console, Intl, Math, JSON, Object, Array, Number, String, Set, Map, Date };
  sandbox.window = sandbox; sandbox.self = sandbox; sandbox.globalThis = sandbox;
  vm.createContext(sandbox);
  const loaded = [];
  for (const s of scripts.filter((s) => s.startsWith("js/data/"))) {
    const file = path.join(ROOT, s);
    if (!fs.existsSync(file)) throw new Error(`index.html loads ${s} but the file does not exist`);
    vm.runInContext(fs.readFileSync(file, "utf8"), sandbox, { filename: s });
    loaded.push(s);
  }
  const onDisk = fs.readdirSync(path.join(ROOT, "js/data")).filter((f) => f.endsWith(".js")).map((f) => "js/data/" + f);
  return { w: sandbox, scripts, loaded, onDisk, html };
}

// ---------- browser ----------
let playwright = null;
function pw() {
  if (playwright) return playwright;
  try { playwright = require("playwright"); } catch (e) {
    const err = new Error("playwright is not installed (browser tests skipped)"); err.name = "Skip"; throw err;
  }
  return playwright;
}
function launch() { return pw().chromium.launch(); }

// globe.gl is loaded from a CDN; tests serve a local copy if one can be found, else the app falls back to a list
function globeFile() {
  const cands = [process.env.GLOBE_GL,
    path.resolve(__dirname, "../node_modules/globe.gl/dist/globe.gl.min.js"),
    "/tmp/claude-0/-home-user-Recipes/abb909a6-734b-5021-9a7e-69577d7e61e2/scratchpad/node_modules/globe.gl/dist/globe.gl.min.js"];
  try { cands.push(require.resolve("globe.gl/dist/globe.gl.min.js")); } catch (e) { /* none */ }
  return cands.find((f) => f && fs.existsSync(f)) || null;
}
const GLOBE = globeFile();

const DEVICES = {
  phone: { viewport: { width: 375, height: 812 }, isMobile: true, hasTouch: true, deviceScaleFactor: 1,
    userAgent: "Mozilla/5.0 (Linux; Android 14; Pixel 7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Mobile Safari/537.36" },
  desktop: { viewport: { width: 1280, height: 800 }, deviceScaleFactor: 1 },
};

/**
 * opts: device ('phone'|'desktop'), lang, market, store (store id for that market), storage {key: value} (wp.* without prefix),
 *       fresh (true: no saved state at all), locale, timezoneId, url (default baseUrl), hash, offline (abort everything external),
 *       globe (false: abort the globe library so the list fallback is used — faster)
 */
async function newPage(ctx, opts = {}) {
  const browser = await ctx.browser();
  const dev = DEVICES[opts.device || "desktop"];
  const context = await browser.newContext({ ...dev, locale: opts.locale || "en-GB", timezoneId: opts.timezoneId || "Europe/Berlin" });
  const seed = {};
  if (!opts.fresh) {
    seed.lang = opts.lang || "en";
    seed.market = opts.market || "DE";
    if (opts.store) seed.stores = { [seed.market]: opts.store };
  }
  Object.assign(seed, opts.storage || {});
  // seed once per tab (not again on reload, so persistence can be tested)
  await context.addInitScript((seed) => {
    try {
      if (!sessionStorage.getItem("__wp_seeded")) {
        for (const k of Object.keys(seed)) localStorage.setItem("wp." + k, JSON.stringify(seed[k]));
        sessionStorage.setItem("__wp_seeded", "1");
      }
    } catch (e) { /* ignore */ }
  }, seed);
  const local = ctx.baseUrl.replace(/\/$/, "");
  await context.route(/^https?:\/\//, (route) => {
    const u = route.request().url();
    if (!opts.offline && u.startsWith(local)) return route.continue();
    if (!opts.offline && opts.globe !== false && GLOBE && /globe\.gl/.test(u)) return route.fulfill({ path: GLOBE, contentType: "text/javascript" });
    return route.abort();
  });
  const page = await context.newPage();
  const errors = [];
  page.on("pageerror", (e) => errors.push("pageerror: " + (e.stack || e.message).split("\n").slice(0, 3).join(" | ")));
  page.on("console", (m) => {
    if (m.type() !== "error") return;
    const loc = (m.location() && m.location().url) || "";
    const text = m.text();
    // our own aborted CDN/font requests are expected
    if (/Failed to load resource/.test(text) && loc && !loc.startsWith(local) && !loc.startsWith("file:")) return;
    errors.push("console: " + text + (loc ? ` (${loc.replace(local, "")})` : ""));
  });
  page.on("requestfailed", (r) => {
    const u = r.url();
    if (u.startsWith(local) && !/net::ERR_ABORTED/.test((r.failure() || {}).errorText || "")) errors.push("requestfailed: " + u.replace(local, ""));
  });
  page.on("response", (r) => { if (r.url().startsWith(local) && r.status() >= 400) errors.push(`HTTP ${r.status()}: ${r.url().replace(local, "")}`); });
  const api = {
    page, context, errors,
    async goto(hash) {
      const url = opts.url || ctx.baseUrl;
      await page.goto(url + (hash ? "#" + hash : ""), { waitUntil: "load" });
      await waitApp(page);
    },
    async reload() { await page.reload({ waitUntil: "load" }); await waitApp(page); },
    async close() { try { await context.close(); } catch (e) { /* ignore */ } },
  };
  return api;
}

async function waitApp(page) {
  await page.waitForFunction(() => {
    const b = document.getElementById("settings-btn");
    return b && b.textContent.trim().length > 0;
  }, null, { timeout: 30000 });
  await page.waitForTimeout(150);
}

// visible text that looks like a template or JS leak
const BAD = /\bundefined\b|\bNaN\b|\{[a-zA-Z_]+\}|\[object |\bnull\b(?= ?[€$£¥₹])|Infinity/;
async function badText(page, scope) {
  return page.evaluate(([scope, src]) => {
    const re = new RegExp(src);
    const out = [];
    const roots = scope ? [...document.querySelectorAll(scope)] : [document.body];
    for (const root of roots) {
      const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
      let n;
      while ((n = walker.nextNode())) {
        const s = n.nodeValue;
        if (!re.test(s)) continue;
        const el = n.parentElement;
        if (!el || el.closest("script,style,template")) continue;
        const cs = getComputedStyle(el);
        if (!el.getClientRects().length || cs.visibility === "hidden") continue;
        out.push(`"${s.trim().slice(0, 80)}" in <${el.tagName.toLowerCase()}${el.id ? "#" + el.id : el.className ? "." + String(el.className).split(" ")[0] : ""}>`);
      }
      // attributes people hear or see
      root.querySelectorAll("[aria-label],[placeholder],[title]").forEach((el) => {
        for (const a of ["aria-label", "placeholder", "title"]) {
          const v = el.getAttribute(a);
          if (v && re.test(v)) out.push(`${a}="${v.slice(0, 80)}" on <${el.tagName.toLowerCase()}${el.id ? "#" + el.id : ""}>`);
        }
      });
    }
    return [...new Set(out)].slice(0, 12);
  }, [scope || null, BAD.source]);
}

// open a recipe and return the receipt numbers as shown, plus the currency symbol the page uses for the market
async function readReceipt(page) {
  return page.evaluate(() => {
    const totals = [...document.querySelectorAll("#recipe-body .rc-total")].map((el) => {
      const spans = el.querySelectorAll("span");
      return { label: spans[0] ? spans[0].textContent.trim() : "", text: spans[spans.length - 1] ? spans[spans.length - 1].textContent.trim() : "" };
    });
    const lines = [...document.querySelectorAll("#recipe-body .rc-line")].map((el) => el.querySelector("span:nth-child(2)") ? el.querySelector("span:nth-child(2)").textContent.trim() : "");
    return { totals, lines, head: (document.querySelector("#recipe-body .rc-head") || {}).textContent || "" };
  });
}
// "1.234,56 €", "¥1,235", "R$ 12,30", "₹ 1,234" -> number (decimal separator guessed from the last separator)
function parseMoney(s) {
  const m = String(s).replace(/ | /g, " ").match(/-?[\d.,' ]*\d/);
  if (!m) return NaN;
  let x = m[0].replace(/[ ']/g, "");
  const lastDot = x.lastIndexOf("."), lastComma = x.lastIndexOf(",");
  const dec = Math.max(lastDot, lastComma);
  if (dec >= 0 && x.length - dec - 1 !== 3) { // a decimal separator
    x = x.slice(0, dec).replace(/[.,]/g, "") + "." + x.slice(dec + 1);
  } else x = x.replace(/[.,]/g, "");
  return parseFloat(x);
}

// run tasks with limited parallelism
async function pool(items, n, fn) {
  const out = new Array(items.length);
  let i = 0;
  await Promise.all(Array.from({ length: Math.min(n, items.length) }, async () => {
    while (i < items.length) { const k = i++; out[k] = await fn(items[k], k); }
  }));
  return out;
}

module.exports = { loadData, launch, newPage, waitApp, badText, readReceipt, parseMoney, pool, GLOBE, DEVICES, scriptsOf };
