#!/usr/bin/env node
/*
 * World Pantry test runner. No npm installs: plain Node plus the Playwright that is
 * already on the machine (browser tests are skipped with a note if it is missing).
 *
 *   node tests/run.cjs                 # everything
 *   node tests/run.cjs prices markets  # only tests whose file or name contains one of the words
 *   node tests/run.cjs --fast          # skip tests tagged "slow" (the dist build check)
 *   node tests/run.cjs --list          # list the tests, run nothing
 *   node tests/run.cjs --json out.json # also write the results as JSON
 *
 * A test file exports  module.exports = (T) => { T.test(name, async (ctx) => {...}, { tags: [...] }) }.
 * ctx: { ROOT, baseUrl, assert, pending(msg), log(msg), browser(), newPage(opts), data() }.
 * Throwing ctx.pending("why") marks a test "pending" (feature not built yet) instead of failed.
 */
"use strict";
const fs = require("fs");
const path = require("path");
const http = require("http");
const assert = require("assert");
const lib = require("./lib.cjs");

const ROOT = path.resolve(__dirname, "..");
const args = process.argv.slice(2);
const flags = new Set(args.filter((a) => a.startsWith("--")));
const jsonIdx = args.indexOf("--json");
const jsonOut = jsonIdx >= 0 ? args[jsonIdx + 1] : null;
const filters = args.filter((a, i) => !a.startsWith("--") && !(jsonIdx >= 0 && i === jsonIdx + 1)).map((a) => a.toLowerCase());

class Pending extends Error { constructor(msg) { super(msg); this.name = "Pending"; } }

// ---------- static server ----------
const TYPES = { ".html": "text/html; charset=utf-8", ".js": "text/javascript; charset=utf-8", ".cjs": "text/javascript", ".mjs": "text/javascript",
  ".css": "text/css; charset=utf-8", ".json": "application/json", ".png": "image/png", ".jpg": "image/jpeg", ".jpeg": "image/jpeg",
  ".webp": "image/webp", ".svg": "image/svg+xml", ".ico": "image/x-icon", ".woff2": "font/woff2", ".txt": "text/plain; charset=utf-8" };
function startServer() {
  return new Promise((resolve) => {
    const srv = http.createServer((req, res) => {
      let p = decodeURIComponent(req.url.split("?")[0].split("#")[0]);
      if (p.endsWith("/")) p += "index.html";
      const file = path.join(ROOT, p);
      if (!file.startsWith(ROOT)) { res.writeHead(403); return res.end(); }
      fs.readFile(file, (err, buf) => {
        if (err) { res.writeHead(404); return res.end("not found"); }
        res.writeHead(200, { "Content-Type": TYPES[path.extname(file).toLowerCase()] || "application/octet-stream", "Cache-Control": "no-store" });
        res.end(buf);
      });
    });
    srv.listen(0, "127.0.0.1", () => resolve(srv));
  });
}

// ---------- harness ----------
const tests = [];
const T = {
  test(name, fn, opts = {}) { tests.push({ name, fn, tags: opts.tags || [], timeout: opts.timeout || 120000, file: T._file }); }
};

async function main() {
  const files = fs.readdirSync(__dirname).filter((f) => f.endsWith(".test.cjs")).sort();
  for (const f of files) { T._file = f.replace(".test.cjs", ""); require(path.join(__dirname, f))(T); }
  let selected = tests.filter((t) => !filters.length || filters.some((w) => t.file.toLowerCase().includes(w) || t.name.toLowerCase().includes(w) || t.tags.includes(w)));
  if (flags.has("--fast")) selected = selected.filter((t) => !t.tags.includes("slow"));
  if (flags.has("--list")) { selected.forEach((t) => console.log(`${t.file}: ${t.name}${t.tags.length ? "  [" + t.tags.join(",") + "]" : ""}`)); return 0; }

  const srv = await startServer();
  const baseUrl = `http://127.0.0.1:${srv.address().port}/`;
  let browserP = null;
  const ctxBase = {
    ROOT, baseUrl, assert,
    pending: (msg) => { throw new Pending(msg); },
    browser: () => (browserP = browserP || lib.launch()),
    data: () => lib.loadData(ROOT),
  };
  ctxBase.newPage = (opts) => lib.newPage(ctxBase, opts);

  const results = [];
  const t0 = Date.now();
  console.log(`World Pantry tests — ${selected.length} selected, server ${baseUrl}\n`);
  for (const t of selected) {
    const notes = [];
    const ctx = Object.assign({}, ctxBase, { log: (m) => notes.push(String(m)) });
    const s = Date.now();
    let status = "pass", msg = "";
    try {
      await Promise.race([
        t.fn(ctx),
        new Promise((_, rej) => setTimeout(() => rej(new Error(`timed out after ${t.timeout / 1000}s`)), t.timeout).unref()),
      ]);
    } catch (e) {
      if (e && e.name === "Pending") { status = "pending"; msg = e.message; }
      else if (e && e.name === "Skip") { status = "skip"; msg = e.message; }
      else { status = "fail"; msg = (e && (e.message || String(e))) || "error"; }
    }
    const ms = Date.now() - s;
    const mark = { pass: "PASS", fail: "FAIL", pending: "PEND", skip: "SKIP" }[status];
    console.log(`${mark}  ${t.file}: ${t.name}  (${(ms / 1000).toFixed(1)}s)`);
    if (msg) console.log("      " + msg.split("\n").slice(0, 25).join("\n      "));
    notes.forEach((n) => console.log("      · " + n));
    results.push({ file: t.file, name: t.name, status, message: msg, notes, ms });
  }
  const count = (st) => results.filter((r) => r.status === st).length;
  const summary = { pass: count("pass"), fail: count("fail"), pending: count("pending"), skip: count("skip"), total: results.length, seconds: Math.round((Date.now() - t0) / 1000), at: new Date().toISOString() };
  console.log(`\n${summary.pass} passed, ${summary.fail} failed, ${summary.pending} pending, ${summary.skip} skipped (${summary.seconds}s)`);
  if (jsonOut) fs.writeFileSync(jsonOut, JSON.stringify({ summary, results }, null, 2));
  if (browserP) { try { (await browserP).close(); } catch (e) { /* ignore */ } }
  srv.close();
  return summary.fail ? 1 : 0;
}

main().then((code) => process.exit(code), (e) => { console.error(e); process.exit(2); });
