#!/usr/bin/env python3
"""List every English UI string the app translates, and check the language files.

  python3 tools/i18n_keys.py            -> writes tools/i18n-keys.json, prints counts
  python3 tools/i18n_keys.py --check    -> reports missing / extra keys and bad {placeholders} per language
"""
import json, os, re, sys, subprocess
from html.parser import HTMLParser

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
STR = r'"((?:[^"\\]|\\.)*)"'

def js_keys():
    keys, plural = [], {}
    for f in ["js/app.js", "js/cook.js", "js/player.js"]:
        src = open(os.path.join(ROOT, f), encoding="utf8").read()
        for m in re.finditer(r'\b(?:t|tr)\(\s*' + STR, src):
            keys.append(json.loads('"' + m.group(1) + '"'))
        for m in re.finditer(r'\btn\([^,]+,\s*' + STR + r'\s*,\s*' + STR, src):
            one, other = (json.loads('"' + g + '"') for g in m.groups())
            keys.append(other); plural[other] = one
        # UNITS table: plural pairs
        for m in re.finditer(r'\[\s*' + STR + r'\s*,\s*' + STR + r'\s*\]', src):
            one, other = (json.loads('"' + g + '"') for g in m.groups())
            if "{n}" in one: keys.append(other); plural[other] = one
    return keys, plural

class P(HTMLParser):
    def __init__(self):
        super().__init__(); self.out = []; self.skip = 0
    def handle_starttag(self, tag, attrs):
        if tag in ("script", "style", "title"): self.skip += 1
        for k, v in attrs:
            if k in ("placeholder", "aria-label", "title") and v: self.out.append(v)
    def handle_endtag(self, tag):
        if tag in ("script", "style", "title"): self.skip -= 1
    def handle_data(self, d):
        if not self.skip and d.strip(): self.out.append(d.strip())

def html_keys():
    src = open(os.path.join(ROOT, "index.html"), encoding="utf8").read()
    src = src[src.index("<!--APP-START-->"):src.index("<!--APP-END-->")]
    p = P(); p.feed(src)
    return [k for k in p.out if re.search(r"[A-Za-z]", k) and k not in ("×",)]

def data_keys():
    # names that come from data tables: regions, shelves, levels, allergens, store types, generic store names
    node = r'''
global.window={};
for (const f of ["prices","prices-more","prices-extra","markets"]) require(process.argv[1]+"/js/data/"+f+".js");
const cats=[...new Set(Object.values(window.PRICES).map(p=>p.c))];
const generic=[...new Set(Object.values(window.MARKETS).flatMap(m=>m.stores.map(s=>s[1])).filter(n=>/grocers|market|bazaar/i.test(n)&&!/[^\x00-\x7f]/.test(n)&&!/[A-Z][a-z]+ Market$/.test(n)||/^(Weekly|Open|Wet|Traditional|Open-air) market$|bazaar|grocers/.test(n)))];
console.log(JSON.stringify(cats.concat(generic)));'''
    out = subprocess.check_output(["node", "-e", node, ROOT], text=True)
    app = open(os.path.join(ROOT, "js/app.js"), encoding="utf8").read()
    extra = ["Europe", "Middle East", "Africa", "Asia", "Americas", "Oceania", "Easy", "Medium", "Hard", "Intro"]
    # generic (non-brand) store names that research may use for any country
    extra += ["Fresh market", "Weekly market", "Corner shop", "Local grocers", "Supermarket"]
    # local market names kept from markets.js (India, Bangladesh, Mexico)
    extra += ["Kirana · sabzi mandi", "Kacha bazar", "Mercado / tianguis"]
    extra += re.findall(r'name: "([^"]+)"', app[app.index("const ALLERGENS"):app.index("const DAYS")])
    extra += re.findall(r'\w+: "([^"]+)"', app[app.index("const STORE_TYPE_NAMES"):app.index("const REGIONS")])
    return json.loads(out) + extra

def all_keys():
    k1, plural = js_keys()
    keys = []
    for k in k1 + html_keys() + data_keys():
        if k not in keys: keys.append(k)
    return keys, plural

def load_lang(code):
    node = r'''global.window={}; require(process.argv[1]); const d=window.I18N_DICT[process.argv[2]]; console.log(JSON.stringify(d));'''
    return json.loads(subprocess.check_output(["node", "-e", node, os.path.join(ROOT, "js/i18n", code + ".js"), code], text=True))

def main():
    keys, plural = all_keys()
    json.dump({"keys": keys, "plural": plural}, open(os.path.join(ROOT, "tools/i18n-keys.json"), "w"), ensure_ascii=False, indent=1)
    print(len(keys), "keys,", len(plural), "plural")
    if "--check" not in sys.argv: return
    ids = subprocess.check_output(["node", "-e", 'global.window={};for (const f of ["prices","prices-more","prices-extra"]) require(process.argv[1]+"/js/data/"+f+".js");console.log(Object.keys(window.PRICES).join(" "))', ROOT], text=True).split()
    ok = True
    for f in sorted(os.listdir(os.path.join(ROOT, "js/i18n"))):
        code = f[:-3]; d = load_lang(code); ui = d.get("ui", {})
        miss = [k for k in keys if k not in ui]
        extra = [k for k in ui if k not in keys]
        bad = []
        for k, v in ui.items():
            want = set(re.findall(r"\{\w+\}", k))
            vals = v.values() if isinstance(v, dict) else [v]
            for x in vals:
                if set(re.findall(r"\{\w+\}", x)) != want and not (k in plural and set(re.findall(r"\{\w+\}", x)) <= want): bad.append((k, x))
        ing = {}
        for line in (d.get("ing") or "").split("\n"):
            if "=" in line: a, b = line.split("=", 1); ing[a.strip()] = b.strip()
        imiss = [i for i in ids if i not in ing]; iextra = [i for i in ing if i not in ids]
        print(f"{code}: ui {len(keys) - len(miss)}/{len(keys)}  ing {len(ids) - len(imiss)}/{len(ids)}" + (f"  extra-ui {len(extra)}" if extra else "") + (f"  bad-placeholders {len(bad)}" if bad else "") + (f"  extra-ing {iextra[:5]}" if iextra else ""))
        if "-v" in sys.argv:
            for k in miss: print("   missing:", k)
            for k in extra: print("   extra:", k)
            for k, v in bad: print("   placeholder:", k, "=>", v)
            for k in imiss: print("   missing ing:", k)
        ok = ok and not (miss or bad or imiss)
    sys.exit(0 if ok else 1)

main()
