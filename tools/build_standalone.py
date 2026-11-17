#!/usr/bin/env python3
"""
Build ONE self-contained HTML file of World Pantry that works offline:
app code, recipe and price data, dish photos (as embedded JPEGs) and,
if available, the 3D globe library are all inside the file.

Usage:
  python3 tools/build_standalone.py [--globe path/to/globe.gl.min.js] [--out dist/world-pantry.html] [--width 480] [--quality 72] [--format jpeg|webp] [--no-photos]

Without --globe the page loads the globe library from the jsDelivr CDN
(everything else still works offline). Photos are re-encoded smaller
(default 480 px wide) to keep the file size reasonable on phones.
"""
import argparse
import base64
import io
import json
import os
import re
import subprocess

from PIL import Image

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--globe", help="local copy of globe.gl.min.js to inline")
    ap.add_argument("--out", default=os.path.join(ROOT, "dist", "world-pantry.html"))
    ap.add_argument("--width", type=int, default=480)
    ap.add_argument("--quality", type=int, default=72)
    ap.add_argument("--format", choices=["jpeg", "webp"], default="jpeg",
                    help="webp makes much smaller files (use it to stay under app size limits)")
    ap.add_argument("--no-photos", action="store_true", help="leave the dish photos out (smallest file)")
    a = ap.parse_args()

    tmp = os.path.join(ROOT, "dist", ".tmp-full.html")
    subprocess.check_call(["node", os.path.join(ROOT, "tools", "build-single.mjs"), tmp], cwd=ROOT,
                          stdout=subprocess.DEVNULL)
    html = open(tmp, encoding="utf8").read()
    os.remove(tmp)

    # 1) embed the photos as data URIs inside the PHOTOS manifest
    m = re.search(r"window\.PHOTOS\s*=\s*(\{.*?\});\n", html, re.S)
    photos = {} if a.no_photos else json.loads(m.group(1))
    total = 0
    for rid, ph in photos.items():
        path = os.path.join(ROOT, ph["src"])
        im = Image.open(path).convert("RGB")
        h = round(im.height * a.width / im.width)
        im = im.resize((a.width, h), Image.LANCZOS)
        buf = io.BytesIO()
        if a.format == "webp":
            im.save(buf, "WEBP", quality=a.quality, method=6)
        else:
            im.save(buf, "JPEG", quality=a.quality, optimize=True, progressive=True)
        total += buf.tell()
        ph["src"] = f"data:image/{a.format};base64," + base64.b64encode(buf.getvalue()).decode("ascii")
    html = html[:m.start(1)] + json.dumps(photos, ensure_ascii=False, separators=(",", ":")) + html[m.end(1):]

    # 2) inline the globe library if a local copy is given
    if a.globe:
        lib = open(a.globe, encoding="utf8").read().replace("</script", "<\\/script")
        html = re.sub(r'<script src="https://cdn\.jsdelivr\.net/npm/globe\.gl@[^"]+"></script>',
                      lambda _: "<script>\n" + lib + "\n</script>", html, count=1)

    os.makedirs(os.path.dirname(a.out), exist_ok=True)
    with open(a.out, "w", encoding="utf8") as f:
        f.write(html)
    print(f"wrote {a.out}: {os.path.getsize(a.out) / 1e6:.1f} MB ({len(photos)} photos, {total / 1e6:.1f} MB of {a.format.upper()})")


if __name__ == "__main__":
    main()
