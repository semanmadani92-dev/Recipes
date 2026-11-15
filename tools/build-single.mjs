// Bundles index.html + CSS + local JS into one self-contained HTML file.
//   node tools/build-single.mjs            -> dist/world-pantry.html (full document)
//   node tools/build-single.mjs --fragment  -> page body only (for hosts that add their own <html>/<head>)
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const fragment = process.argv.includes("--fragment");
const out = process.argv.find((a, i) => i > 1 && !a.startsWith("--")) || join(root, "dist", fragment ? "world-pantry.fragment.html" : "world-pantry.html");
const read = (p) => readFileSync(join(root, p), "utf8");

let html = read("index.html");
html = html.replace(/<link rel="stylesheet" href="css\/style.css">/, () => `<style>\n${read("css/style.css")}\n</style>`);
html = html.replace(/<script src="(js\/[^"]+)"><\/script>/g, (_, src) => `<script>\n${read(src).replace(/<\/script/gi, "<\\/script")}\n</script>`);

if (fragment) {
  html = html
    .replace(/<!doctype html>\s*/i, "")
    .replace(/<\/?html[^>]*>\s*/gi, "")
    .replace(/<\/?head>\s*/gi, "")
    .replace(/<\/?body>\s*/gi, "")
    .replace(/<meta charset="utf-8">\s*/i, "")
    .replace(/<meta name="viewport"[^>]*>\s*/i, '<meta name="claude:viewport-fit-sides" content="cover">\n');
  // keep <title> first so hosts that scan the top of the file find it
  const title = html.match(/<title>.*?<\/title>\s*/)[0];
  html = title + html.replace(title, "");
}

mkdirSync(dirname(out), { recursive: true });
writeFileSync(out, html);
console.log("wrote", out, (html.length / 1024).toFixed(0) + " KB");
