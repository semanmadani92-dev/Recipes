#!/usr/bin/env python3
"""
Find a freely licensed photo for every recipe on Wikipedia / Wikimedia Commons,
save a small JPEG to images/dishes/<id>.jpg and write the credits to
js/data/photos.js (window.PHOTOS).

Only images hosted on Wikimedia Commons under a free license (CC0, CC BY,
CC BY-SA, public domain, ...) are used, and each one keeps its author,
license and source link so the app can credit it.

Usage:  python3 tools/fetch_photos.py            # fetch missing photos
        python3 tools/fetch_photos.py --redo id1 id2   # fetch again for some recipes
Needs network access to en.wikipedia.org, commons.wikimedia.org and
thumb.wikimedia.org, plus Pillow (pip install pillow).
"""
import html
import io
import json
import os
import re
import subprocess
import sys
import time
import urllib.parse
import urllib.request

from PIL import Image

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT_DIR = os.path.join(ROOT, "images", "dishes")
MANIFEST = os.path.join(ROOT, "js", "data", "photos.js")
UA = "WorldPantry-recipe-app/1.0 (open-source recipe app; dish photos with attribution)"
FOOD = re.compile(r"\b(dish|food|cuisine|soup|stew|bread|cake|pastry|pastries|sauce|salad|dessert|dumpling|noodle|pasta|"
                  r"rice|curry|sandwich|pie|tart|pudding|snack|biscuit|cookie|porridge|pancake|flatbread|confection|"
                  r"sausage|meatball|casserole|condiment|dip|spread|beverage|drink|fritter|omelette|kebab|stir[- ]fr|"
                  r"street food|delicacy|appetizer|breakfast|staple|preparation|recipe|sweet|cheese|bun|roll|waffle|roast|braise|meat|lentil)", re.I)
FREE = re.compile(r"^(cc0|cc[ -]by|public domain|pd|gfdl|attribution|fal|free art|no restrictions|copyrighted free use)", re.I)
TARGET_W, TARGET_H = 640, 480

# Recipes whose automatic search picks the wrong article: use this Wikipedia title instead.
OVERRIDES = {
    "bratkartoffeln": "Home fries", "cheeseburger": "Cheeseburger", "jerk-chicken": "Jerk (cooking)",
    "kartoffelsuppe": "Potato soup", "kottbullar": "Swedish meatballs", "lasagne": "Lasagna",
    "linseneintopf": "Lentil soup", "pesto-genovese": "Pesto", "teriyaki": "Teriyaki", "tacos-pastor": "Al pastor",
    "sauerbraten": "Sauerbraten", "rotkohl": "Rotkohl", "flammkuchen": "Tarte flambée", "dal-tadka": "Dal",
    "soda-bread": "Soda bread", "poffertjes": "Poffertjes", "tarator": "Tarator", "sarmale": "Sarma (food)",
    "plokkfiskur": "Plokkfiskur", "brudet": "Brodetto",
    "kofte": "Köfte", "kefta-tagine": "Tajine", "suya": "Suya", "kelewele": "Kelewele", "chakalaka": "Chakalaka",
    "sl-chicken-curry": "Chicken curry", "parippu": "Dal", "mchuzi-samaki": "Fish curry", "piri-piri": "Peri-peri",
    "sadza-nyama": "Sadza",
}


def get(url, binary=False, tries=4):
    for i in range(tries):
        try:
            req = urllib.request.Request(url, headers={"User-Agent": UA})
            with urllib.request.urlopen(req, timeout=30) as r:
                data = r.read()
            time.sleep(0.25)  # be polite to Wikimedia
            return data if binary else data.decode("utf-8")
        except urllib.error.HTTPError as e:
            if e.code == 404:
                return None
            time.sleep(2 * (i + 1))
        except Exception:
            time.sleep(2 * (i + 1))
    return None


def recipes():
    """Load the recipe data files in the same order index.html does."""
    page = open(os.path.join(ROOT, "index.html"), encoding="utf8").read()
    files = [f for f in re.findall(r'<script src="(js/data/[^"]+)"', page) if "world.js" not in f and "photos.js" not in f]
    js = ("global.window={};" + "".join(f"require('./{f}');" for f in files) +
          "console.log(JSON.stringify(window.RECIPES.map(r=>({id:r.id,name:r.name,country:window.COUNTRIES[r.country].name}))))")
    return json.loads(subprocess.check_output(["node", "-e", js], cwd=ROOT))


def search(q):
    data = get("https://en.wikipedia.org/w/rest.php/v1/search/page?" + urllib.parse.urlencode({"q": q, "limit": 6}))
    return json.loads(data)["pages"] if data else []


def pick_page(r):
    name = r["name"]
    plain = re.sub(r"\s*\(.*?\)", "", name).strip()
    alt = re.search(r"\((.*?)\)", name)
    queries = [plain, plain + " " + r["country"] + " dish", plain + " dish"]
    if alt:
        queries.insert(1, alt.group(1))
    for q in queries:
        for p in search(q):
            if p.get("thumbnail") and FOOD.search(p.get("description") or ""):
                return p
    return None


def summary_page(title):
    data = get("https://en.wikipedia.org/api/rest_v1/page/summary/" + urllib.parse.quote(title.replace(" ", "_")))
    if not data:
        return None
    d = json.loads(data)
    if d.get("type") == "disambiguation":
        return None
    thumb = (d.get("thumbnail") or {}).get("source")
    return {"title": d.get("title", title), "thumbnail": {"url": thumb} if thumb else None}


def commons_files(title, lead_thumb):
    """Candidate Commons file names for an article: the lead image first, then the other images."""
    files = []
    if lead_thumb and "/commons/" in lead_thumb:
        m = re.search(r"/commons/thumb/\w/\w\w/([^/]+)/", lead_thumb)
        if m:
            files.append(urllib.parse.unquote(m.group(1)).replace("_", " "))
    data = get("https://en.wikipedia.org/api/rest_v1/page/media-list/" + urllib.parse.quote(title.replace(" ", "_")))
    if data:
        for it in json.loads(data).get("items", []):
            t = it.get("title", "")
            if it.get("type") == "image" and re.search(r"\.(jpe?g|png|webp)$", t, re.I):
                name = t.split(":", 1)[-1].replace("_", " ")
                if name not in files:
                    files.append(name)
    return files[:6]


def commons_credit(file_name):
    page = get("https://commons.wikimedia.org/wiki/File:" + urllib.parse.quote(file_name))
    if not page:
        return None
    page = page.replace("&#95;", "_")
    lic = re.search(r'class="licensetpl_short"[^>]*>(.*?)<', page)
    link = re.search(r'class="licensetpl_link"[^>]*>(.*?)<', page)
    aut = re.search(r'id="fileinfotpl_aut".*?</td>\s*<td[^>]*>(.*?)</td>', page, re.S)
    author = html.unescape(re.sub(r"<[^>]+>", "", aut.group(1))).strip() if aut else ""
    author = re.sub(r"\s+", " ", author)[:80] or "Unknown author"
    license_name = html.unescape(lic.group(1)).strip() if lic else ""
    if not license_name or not FREE.search(license_name):
        return None
    return {"author": author, "license": license_name, "licenseUrl": html.unescape(link.group(1)).strip() if link else ""}


def save_image(file_name, path):
    q = urllib.parse.quote(file_name)
    h = __import__("hashlib").md5(file_name.replace(" ", "_").encode()).hexdigest()
    rel = f"{h[0]}/{h[:2]}/{urllib.parse.quote(file_name.replace(' ', '_'))}"
    for url in (f"https://thumb.wikimedia.org/wikipedia/commons/thumb/{rel}/960px-{urllib.parse.quote(file_name.replace(' ', '_'))}",
                f"https://upload.wikimedia.org/wikipedia/commons/{rel}"):
        data = get(url, binary=True)
        if not data:
            continue
        try:
            im = Image.open(io.BytesIO(data)).convert("RGB")
        except Exception:
            continue
        # centre-crop to 4:3 and shrink
        w, h2 = im.size
        tw = min(w, int(h2 * TARGET_W / TARGET_H))
        th = int(tw * TARGET_H / TARGET_W)
        left, top = (w - tw) // 2, (h2 - th) // 2
        im = im.crop((left, top, left + tw, top + th)).resize((TARGET_W, TARGET_H), Image.LANCZOS)
        im.save(path, "JPEG", quality=78, optimize=True, progressive=True)
        return True
    return False


def main():
    os.makedirs(OUT_DIR, exist_ok=True)
    photos = {}
    if os.path.exists(MANIFEST):
        m = re.search(r"window\.PHOTOS\s*=\s*(\{.*\});", open(MANIFEST, encoding="utf8").read(), re.S)
        if m:
            photos = json.loads(m.group(1))
    redo = set(sys.argv[sys.argv.index("--redo") + 1:]) if "--redo" in sys.argv else set()
    todo = [r for r in recipes() if r["id"] not in photos or r["id"] in redo]
    print(len(todo), "recipes to look up")
    for n, r in enumerate(todo, 1):
        page = summary_page(OVERRIDES[r["id"]]) if r["id"] in OVERRIDES else pick_page(r)
        if not page:
            print(f"[{n}] {r['id']}: no matching article"); continue
        lead = (page.get("thumbnail") or {}).get("url")
        chosen = None
        for file_name in commons_files(page["title"], lead):
            credit = commons_credit(file_name)
            if credit and save_image(file_name, os.path.join(OUT_DIR, r["id"] + ".jpg")):
                chosen = (file_name, credit)
                break
        if not chosen:
            print(f"[{n}] {r['id']}: no freely licensed photo in {page['title']}"); continue
        file_name, credit = chosen
        photos[r["id"]] = {"src": f"images/dishes/{r['id']}.jpg", "article": page["title"], "file": file_name,
                           "source": "https://commons.wikimedia.org/wiki/File:" + urllib.parse.quote(file_name.replace(" ", "_")), **credit}
        print(f"[{n}] {r['id']}: {page['title']} | {credit['license']} | {credit['author']}")
        if n % 20 == 0:
            write(photos)
    write(photos)
    print(len(photos), "photos in manifest")


def write(photos):
    with open(MANIFEST, "w", encoding="utf8") as f:
        f.write("/* Dish photos from Wikimedia Commons, with author and license. Generated by tools/fetch_photos.py. */\n")
        f.write("window.PHOTOS = " + json.dumps(photos, ensure_ascii=False, indent=0, sort_keys=True) + ";\n")


if __name__ == "__main__":
    main()
