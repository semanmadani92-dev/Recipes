#!/usr/bin/env python3
"""Turn the research data into app data.

  python3 tools/import_research.py        -> writes js/data/markets-world.js and js/data/local-prices.js

Reads (all optional, partial data is fine):
  research/markets.json        one entry per country: currency, rate, level, shelf factors, stores, sources
  research/prices/<CC>.json    real shelf prices observed in shops of that country

markets-world.js adds a market for every recipe country (and every country in the research),
and overrides fields of the hand-written markets in js/data/markets.js. Countries without
research get a fallback: currency, rough rate and price level from the table below and
generic stores.

local-prices.js holds, per country and ingredient, the median observed price converted to the
German pack size (PRICES[id].q in PRICES[id].u) and normalised to the country's cheapest store
(observed price / store factor / store-type shelf factor). Rows far away from the current
estimate (more than 5x or less than 0.2x) are rejected as likely unit or pack mistakes.
"""
import json, os, re, subprocess, sys, statistics
from collections import defaultdict

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
RES = os.path.join(ROOT, "research")
if "--research" in sys.argv: RES = os.path.abspath(sys.argv[sys.argv.index("--research") + 1])   # for testing with other data

# ---------- current app data (read through node) ----------
NODE = r'''
global.window={}; global.navigator={languages:["en"]}; global.localStorage={getItem(){return null}}; global.document={documentElement:{}};
const R=process.argv[1]+"/js/";
require(R+"i18n.js");
for (const f of ["prices","prices-more","prices-extra","markets","recipes","recipes-europe","recipes-mideast-africa","recipes-asia","recipes-americas-oceania","recipes-more-europe-mideast","recipes-more-africa-asia","recipes-more-americas-oceania"]) require(R+"data/"+f+".js");
console.log(JSON.stringify({PRICES:window.PRICES, MARKETS:window.MARKETS, STORE_TYPES:window.STORE_TYPES, COUNTRIES:window.COUNTRIES, ISO2:window.I18N.ISO2}));
'''
APP = json.loads(subprocess.check_output(["node", "-e", NODE, ROOT], text=True))
PRICES, BASE, STORE_TYPES, COUNTRIES, ISO2 = APP["PRICES"], APP["MARKETS"], APP["STORE_TYPES"], APP["COUNTRIES"], APP["ISO2"]
NUM = {v: k for k, v in ISO2.items()}

# ---------- fallback for countries without research ----------
# cc: (currency, local money per 1 EUR (approx., late 2025), food price level vs Germany, region)
FALLBACK = {
    "AF": ("AFN", 77, 0.4, "Asia"), "AL": ("ALL", 97, 0.7, "Europe"), "AM": ("AMD", 445, 0.6, "Asia"), "AO": ("AOA", 1060, 0.7, "Africa"),
    "AZ": ("AZN", 1.97, 0.55, "Asia"), "BA": ("BAM", 1.956, 0.7, "Europe"), "BF": ("XOF", 655.96, 0.55, "Africa"), "BG": ("EUR", 1, 0.75, "Europe"),
    "BJ": ("XOF", 655.96, 0.55, "Africa"), "BN": ("BND", 1.5, 0.85, "Asia"), "BO": ("BOB", 8.0, 0.6, "Americas"), "BS": ("BSD", 1.16, 1.25, "Americas"),
    "BT": ("BTN", 102, 0.45, "Asia"), "BW": ("BWP", 15.7, 0.65, "Africa"), "BY": ("BYN", 3.5, 0.55, "Europe"), "BZ": ("BZD", 2.32, 0.9, "Americas"),
    "CD": ("CDF", 3300, 0.75, "Africa"), "CI": ("XOF", 655.96, 0.6, "Africa"), "CL": ("CLP", 1100, 0.85, "Americas"), "CM": ("XAF", 655.96, 0.55, "Africa"),
    "CO": ("COP", 4500, 0.6, "Americas"), "CR": ("CRC", 585, 0.9, "Americas"), "CU": ("CUP", 140, 0.8, "Americas"), "CY": ("EUR", 1, 1.0, "Europe"),
    "CZ": ("CZK", 24.3, 0.85, "Europe"), "DK": ("DKK", 7.46, 1.25, "Europe"), "DO": ("DOP", 72, 0.75, "Americas"), "DZ": ("DZD", 152, 0.45, "Africa"),
    "EC": ("USD", 1.16, 0.8, "Americas"), "EE": ("EUR", 1, 1.0, "Europe"), "ER": ("ERN", 17.4, 0.6, "Africa"), "ET": ("ETB", 165, 0.55, "Africa"),
    "FI": ("EUR", 1, 1.12, "Europe"), "FJ": ("FJD", 2.6, 0.85, "Oceania"), "GA": ("XAF", 655.96, 0.8, "Africa"), "GE": ("GEL", 3.15, 0.55, "Asia"),
    "GH": ("GHS", 14, 0.65, "Africa"), "GN": ("GNF", 10000, 0.55, "Africa"), "GR": ("EUR", 1, 0.95, "Europe"), "GT": ("GTQ", 8.9, 0.75, "Americas"),
    "GY": ("GYD", 242, 0.75, "Americas"), "HN": ("HNL", 30.5, 0.75, "Americas"), "HR": ("EUR", 1, 0.95, "Europe"), "HT": ("HTG", 152, 0.9, "Americas"),
    "HU": ("HUF", 390, 0.8, "Europe"), "IL": ("ILS", 3.85, 1.3, "Middle East"), "IQ": ("IQD", 1520, 0.6, "Middle East"), "IR": ("IRR", 1200000, 0.35, "Middle East"),
    "IS": ("ISK", 145, 1.4, "Europe"), "JM": ("JMD", 185, 0.95, "Americas"), "JO": ("JOD", 0.82, 0.7, "Middle East"), "KG": ("KGS", 101, 0.5, "Asia"),
    "KH": ("KHR", 4650, 0.6, "Asia"), "KP": ("KPW", 900, 0.5, "Asia"), "KW": ("KWD", 0.355, 0.85, "Middle East"), "KZ": ("KZT", 600, 0.55, "Asia"),
    "LA": ("LAK", 25000, 0.55, "Asia"), "LB": ("LBP", 104000, 0.85, "Middle East"), "LK": ("LKR", 345, 0.5, "Asia"), "LR": ("LRD", 210, 0.75, "Africa"),
    "LT": ("EUR", 1, 0.88, "Europe"), "LU": ("EUR", 1, 1.12, "Europe"), "LV": ("EUR", 1, 0.9, "Europe"), "LY": ("LYD", 6.3, 0.45, "Africa"),
    "MA": ("MAD", 10.7, 0.55, "Africa"), "MD": ("MDL", 19.8, 0.6, "Europe"), "ME": ("EUR", 1, 0.75, "Europe"), "MG": ("MGA", 5200, 0.45, "Africa"),
    "MK": ("MKD", 61.5, 0.6, "Europe"), "ML": ("XOF", 655.96, 0.55, "Africa"), "MM": ("MMK", 2440, 0.45, "Asia"), "MN": ("MNT", 4150, 0.5, "Asia"),
    "MW": ("MWK", 2020, 0.6, "Africa"), "MY": ("MYR", 4.9, 0.55, "Asia"), "MZ": ("MZN", 74, 0.6, "Africa"), "NA": ("NAD", 20.5, 0.65, "Africa"),
    "NC": ("XPF", 119.33, 1.45, "Oceania"), "NE": ("XOF", 655.96, 0.55, "Africa"), "NI": ("NIO", 42.7, 0.65, "Americas"), "NO": ("NOK", 11.7, 1.3, "Europe"),
    "NP": ("NPR", 163, 0.42, "Asia"), "OM": ("OMR", 0.446, 0.7, "Middle East"), "PA": ("USD", 1.16, 0.85, "Americas"), "PE": ("PEN", 4.0, 0.6, "Americas"),
    "PG": ("PGK", 4.75, 0.9, "Oceania"), "PH": ("PHP", 68, 0.65, "Asia"), "PR": ("USD", 1.16, 1.2, "Americas"), "PY": ("PYG", 8800, 0.55, "Americas"),
    "QA": ("QAR", 4.22, 0.95, "Middle East"), "RO": ("RON", 5.08, 0.7, "Europe"), "RS": ("RSD", 117, 0.75, "Europe"), "RW": ("RWF", 1680, 0.5, "Africa"),
    "SD": ("SDG", 700, 0.5, "Africa"), "SG": ("SGD", 1.5, 1.1, "Asia"), "SI": ("EUR", 1, 0.95, "Europe"), "SK": ("EUR", 1, 0.9, "Europe"),
    "SL": ("SLE", 26.5, 0.6, "Africa"), "SN": ("XOF", 655.96, 0.65, "Africa"), "SO": ("USD", 1.16, 0.6, "Africa"), "SR": ("SRD", 44, 0.7, "Americas"),
    "SV": ("USD", 1.16, 0.8, "Americas"), "SY": ("SYP", 13000, 0.4, "Middle East"), "TD": ("XAF", 655.96, 0.6, "Africa"), "TH": ("THB", 37.6, 0.62, "Asia"),
    "TJ": ("TJS", 11, 0.5, "Asia"), "TL": ("USD", 1.16, 0.7, "Asia"), "TM": ("TMT", 4.06, 0.6, "Asia"), "TN": ("TND", 3.4, 0.45, "Africa"),
    "TT": ("TTD", 7.9, 0.85, "Americas"), "TW": ("TWD", 36, 0.95, "Asia"), "TZ": ("TZS", 2900, 0.5, "Africa"), "UG": ("UGX", 4100, 0.5, "Africa"),
    "UY": ("UYU", 46, 1.0, "Americas"), "UZ": ("UZS", 14000, 0.45, "Asia"), "VE": ("USD", 1.16, 0.9, "Americas"), "VU": ("VUV", 140, 1.1, "Oceania"),
    "YE": ("YER", 1000, 0.5, "Middle East"), "ZM": ("ZMW", 27, 0.55, "Africa"), "ZW": ("USD", 1.16, 0.85, "Africa"),
}
# regions for countries that have a market but no recipes
REGION_EXTRA = {"NL": "Europe", "BE": "Europe", "CH": "Europe", "AT": "Europe", "IE": "Europe", "SE": "Europe", "PL": "Europe", "PT": "Europe",
                "NE": "Africa", "TD": "Africa", "AE": "Middle East", "SA": "Middle East", "CA": "Americas", "NZ": "Oceania", "AU": "Oceania"}
# descriptions that are not brands and not one of the translatable generics
STORE_RENAME = {"Tiendas en divisas": "CIMEX · Caribe", "Hayel Saeed hypermarkets": "Hayel Saeed"}
GENERIC = {"Fresh market", "Weekly market", "Corner shop", "Local grocers", "Supermarket"}

# typical weight of one counted unit, for observations sold by weight (or the other way round)
UNIT_GRAMS = {"bell_pepper": 160, "cucumber": 400, "lettuce": 350, "white_cabbage": 1200, "lemon": 110, "lime": 65, "bananas": 120,
              "avocado": 200, "white_loaf": 500, "garlic": 5, "eggs": 60, "coriander": 30, "tuna_can": 185, "chickpeas_can": 400,
              "chopped_tomatoes": 400, "coconut_milk": 400, "orange": 180, "zucchini": 250, "eggplant": 300, "napa_cabbage": 1000,
              "leek": 250, "mango": 350, "plantain": 250, "red_cabbage": 1000, "cauliflower": 800, "pumpkin": 1500, "pak_choi": 300,
              "green_papaya": 800, "corn_cobs": 300, "fennel": 250, "baguette": 250, "black_beans_can": 400, "kidney_beans_can": 400,
              "sweetcorn_can": 300, "pineapple_can": 560, "baked_beans": 415, "white_beans_can": 400, "fava_beans_can": 400,
              "black_eyed_beans_can": 400, "bamboo_shoots": 225, "hominy_can": 425, "spring_onions": 100, "parsley": 30, "basil": 30,
              "mint": 30, "dill": 30, "chives": 25, "pita": 70, "burger_buns": 60, "corn_tortillas": 30, "chapati_ready": 50,
              "toast_bread": 25, "rye_bread": 50, "bratwurst": 100, "duck_legs": 300, "chorizo_fresh": 90, "poblano_peppers": 120,
              "celery": 50, "lemongrass": 30}
OLD_BEFORE = (2026, 1)   # (year, month): rows dated earlier (2025) are "older"
COUNT_UNITS = {"pc", "can", "bunch", "clove", "cube", "sachet", "sheet", "stalk", "slice", "leaf"}

def region_of(cc):
    num = NUM.get(cc)
    if num and num in COUNTRIES: return COUNTRIES[num]["region"]
    if cc in FALLBACK: return FALLBACK[cc][3]
    return REGION_EXTRA.get(cc)

def load(path):
    try:
        with open(path, encoding="utf8") as f: return json.load(f)
    except FileNotFoundError: return None
    except Exception as e:
        print("  ! cannot read", os.path.relpath(path, ROOT), "-", e); return None

def url(s):
    """first http(s) URL in a source note ("https://... (2026 update)" -> "https://...")"""
    m = re.search(r"https?://[^\s<>\"']+", s) if isinstance(s, str) else None
    return m.group(0).rstrip(".,;)") if m else None

def num(x):
    try:
        v = float(x); return v if v == v and v not in (float("inf"), float("-inf")) else None
    except (TypeError, ValueError): return None

# ---------- markets ----------
def clean_market(cc, e, log):
    out = {}
    cur = e.get("cur")
    if isinstance(cur, str) and re.fullmatch(r"[A-Z]{3}", cur): out["cur"] = cur
    rate = num(e.get("rate"))
    if rate and rate > 0: out["rate"] = rate
    level = num(e.get("level"))
    if level and 0.1 <= level <= 3: out["level"] = round(level, 3)
    elif e.get("level") is not None: log.append(f"{cc}: level {e.get('level')} ignored")
    cat = e.get("cat")
    if isinstance(cat, dict):
        out["cat"] = {k: round(v, 3) for k, v in cat.items() if isinstance(k, str) and num(v) and 0.2 <= v <= 5}
    stores = []
    for s in e.get("stores") or []:
        if not (isinstance(s, list) and len(s) >= 4): log.append(f"{cc}: bad store {s!r}"); continue
        sid, name, typ, fac = s[0], s[1], s[2], num(s[3])
        if not (isinstance(sid, str) and isinstance(name, str) and name.strip()): log.append(f"{cc}: bad store {s!r}"); continue
        if typ not in STORE_TYPES: log.append(f"{cc}: store type {typ!r} -> super"); typ = "super"
        if not fac or not (0.5 <= fac <= 3): log.append(f"{cc}: store factor {s[3]!r} -> 1"); fac = 1
        if any(x[0] == sid for x in stores): continue
        name = STORE_RENAME.get(name.strip(), name.strip())
        stores.append([sid, name, typ, round(fac, 3)])
    if stores:
        low = min(s[3] for s in stores)
        if low > 1.0001 or low < 0.5: stores = [[a, b, c, round(d / low, 3)] for a, b, c, d in stores]
        out["stores"] = stores
    for k in ("name", "num"):
        if isinstance(e.get(k), str): out[k] = e[k]
    src = [url(s) for s in (e.get("sources") or []) if url(s)]
    if src: out["sources"] = src[:12]
    if e.get("confidence") in ("high", "medium", "low"): out["confidence"] = e["confidence"]
    return out

def fallback_market(cc):
    cur, rate, level, region = FALLBACK.get(cc, ("EUR", 1, 0.8, None))
    k = cc.lower()
    return {"cur": cur, "rate": rate, "level": level, "cat": {}, "fallback": True,
            "stores": [[k + "_super", "Supermarket", "super", 1], [k + "_market", "Fresh market", "market", 1], [k + "_corner", "Corner shop", "convenience", 1.15]]}

def build_markets(log):
    research = load(os.path.join(RES, "markets.json")) or {}
    world = {}
    rec = sorted({ISO2[n] for n in COUNTRIES if n in ISO2})
    keys = sorted(set(rec) | {k for k in research if re.fullmatch(r"[A-Z]{2}", k)} | set(BASE))
    n_research = n_fallback = 0
    for cc in keys:
        e = research.get(cc)
        entry = clean_market(cc, e, log) if isinstance(e, dict) else {}
        if cc not in BASE:
            fb = fallback_market(cc)
            if entry.get("cur") and entry.get("rate") and entry.get("level"):
                fb.pop("fallback")
                if "stores" not in entry: log.append(f"{cc}: research has no stores, using generic ones")
                n_research += 1
            elif cc not in rec and cc not in FALLBACK:
                log.append(f"{cc}: research incomplete (needs cur, rate and level), not a recipe country - skipped"); continue
            else:
                if entry: log.append(f"{cc}: research incomplete (needs cur, rate and level), fallback used")
                entry = {k: v for k, v in entry.items() if k in ("stores", "sources", "name", "cat")}
                n_fallback += 1
            fb.update(entry); entry = fb
        elif entry:
            n_research += 1
            # a new currency needs its rate too
            if "cur" in entry and entry["cur"] != BASE[cc]["cur"] and "rate" not in entry: entry.pop("cur")
        reg = region_of(cc)
        if reg: entry["region"] = reg
        if entry: world[cc] = entry
    return world, n_research, n_fallback, len(research)

# ---------- local prices ----------
def to_pack(pid, price, qty, unit, pc_weight=None):
    """price for qty `unit` -> price of the German pack, or None (pc_weight: grams per piece, from the row)"""
    p = PRICES[pid]; pu, pq = p["u"], p["q"]
    if unit in ("kg", "l"): qty *= 1000
    unit = {"kg": "g", "l": "ml"}.get(unit, unit)
    if qty <= 0: return None
    if unit == pu or (unit == "pc" and pu in COUNT_UNITS): return price * pq / qty
    if {unit, pu} <= {"g", "ml"}: return price * pq / qty          # density ~1 (milk, oil, sauces)
    w = pc_weight if pc_weight and pc_weight > 0 else UNIT_GRAMS.get(pid)
    if w and unit in ("g", "ml") and pu in COUNT_UNITS: return price * (pq * w) / qty
    if w and unit == "pc" and pu in ("g", "ml"): return price * pq / (qty * w)
    return None

def build_prices(markets, log):
    out, report = {}, []
    pdir = os.path.join(RES, "prices")
    files = sorted(f for f in os.listdir(pdir) if f.endswith(".json")) if os.path.isdir(pdir) else []
    curs = {}
    for cc, m in markets.items(): curs.setdefault(m["cur"], m["rate"])
    for f in files:
        d = load(os.path.join(pdir, f))
        if not isinstance(d, dict): continue
        cc = str(d.get("country") or f[:-5]).upper()
        m = markets.get(cc)
        if not m: log.append(f"{f}: unknown country {cc}"); continue
        fcur = d.get("currency") or m["cur"]
        conv = 1.0
        if fcur != m["cur"]:
            if fcur in curs: conv = m["rate"] / curs[fcur]
            else: log.append(f"{f}: currency {fcur} unknown, file skipped"); continue
        stores = {s[0]: s for s in m["stores"]}
        typical = statistics.median(s[3] for s in m["stores"]) if m["stores"] else 1
        obs = defaultdict(list); src = defaultdict(list)
        used = skipped = outliers = 0
        for it in d.get("items") or []:
            if not isinstance(it, dict): continue
            pid, price, qty, unit = it.get("id"), num(it.get("price")), num(it.get("qty")), it.get("unit")
            if pid not in PRICES: skipped += 1; log.append(f"{cc}: unknown id {pid!r}"); continue
            if not price or price <= 0 or not qty: skipped += 1; log.append(f"{cc} {pid}: no price/qty"); continue
            pack = to_pack(pid, price * conv, qty, unit, num(it.get("pc_weight_g")))
            if pack is None: skipped += 1; log.append(f"{cc} {pid}: unit {unit} vs pack {PRICES[pid]['u']} skipped"); continue
            st = stores.get(it.get("store"))
            avg = it.get("kind") == "average" or not it.get("store")
            if it.get("store") and not st: log.append(f"{cc} {pid}: store {it.get('store')} not in market, treated as a typical store")
            # a shelf price is divided by its store's factors; a national average stands for a typical store
            fac = (st[3] * (STORE_TYPES.get(st[2], {}).get(PRICES[pid]["c"], 1))) if st and not avg else typical
            base = pack / fac
            p = PRICES[pid]
            est = p["p"] * m["level"] * m.get("cat", {}).get(p["c"], 1) * m["rate"]
            ratio = base / est if est else 1
            if ratio > 5 or ratio < 0.2:
                outliers += 1; log.append(f"{cc} {pid}: outlier {base:.2f} vs estimate {est:.2f} (x{ratio:.2f}) rejected"); continue
            m_date = re.match(r"(\d{4})(?:-(\d{2}))?", str(it.get("date") or ""))
            old = bool(m_date) and (int(m_date.group(1)), int(m_date.group(2) or 6)) < OLD_BEFORE
            obs[pid].append((base, old, avg)); used += 1
            s = url(it.get("source"))
            if s and s not in src[pid]: src[pid].append(s)
        items = {}
        for pid, rows in obs.items():
            # older observations (2025) count only when there is nothing recent
            vals = [b for b, old, _ in rows if not old] or [b for b, old, _ in rows]
            if len(vals) < len(rows): log.append(f"{cc} {pid}: {len(rows) - len(vals)} older rows left out (newer ones exist)")
            v = statistics.median(vals)
            v = round(v, 2) if v < 100 else round(v)
            items[pid] = {"p": v, "n": len(vals), "k": "avg" if all(a for _, _, a in rows) else "shelf", "src": src[pid][:3]}
        if items:
            out[cc] = {"as_of": str(d.get("collected") or "")[:10], "items": items}
        report.append((cc, len(items), used, skipped, outliers))
    return out, report

def js(obj): return json.dumps(obj, ensure_ascii=False, separators=(",", ":"))
def js_lines(obj, ind="  "): return "{\n" + ",\n".join(ind + json.dumps(k) + ": " + js(v) for k, v in sorted(obj.items())) + "\n" + ind[2:] + "}"

def main():
    log = []
    world, n_res, n_fb, n_file = build_markets(log)
    merged = {}
    for cc in set(BASE) | set(world):
        m = dict(BASE.get(cc, {})); m.update(world.get(cc, {})); merged[cc] = m
    prices, report = build_prices(merged, log)

    head = "/* Generated by tools/import_research.py from research/markets.json - do not edit by hand. */\n"
    with open(os.path.join(ROOT, "js/data/markets-world.js"), "w", encoding="utf8") as f:
        f.write(head + "(function (M) {\n  const W = " + js_lines(world, "    ") + ";\n"
                "  Object.keys(W).forEach(function (cc) { M[cc] = Object.assign(M[cc] || { cat: {}, stores: [] }, W[cc]); if (!M[cc].cat) M[cc].cat = {}; });\n"
                "})(window.MARKETS = window.MARKETS || {});\n")
    with open(os.path.join(ROOT, "js/data/local-prices.js"), "w", encoding="utf8") as f:
        f.write("/* Generated by tools/import_research.py from research/prices/*.json - do not edit by hand.\n"
                " * LOCAL_PRICES[cc].items[id] = { p: price of the German pack size at the cheapest store, in local money,\n"
                " *   n: observations, k: \"shelf\" (seen in a store) or \"avg\" (national average only), src: source pages } */\n"
                "window.LOCAL_PRICES = " + js_lines(prices) + ";\n")

    print(f"markets: {len(merged)} total ({len(BASE)} hand-written, {len(world)} added or updated; "
          f"{n_res} from research/markets.json with {n_file} entries, {n_fb} fallback)")
    tot_items = sum(r[1] for r in report)
    print(f"prices: {len(report)} country files, {len(prices)} countries with real prices, {tot_items} ingredient prices")
    for cc, items, used, skipped, outl in report:
        print(f"  {cc}: {items} ingredients from {used} rows ({skipped} skipped, {outl} outliers)")
    if log:
        print(f"notes ({len(log)}):")
        for line in log[:200]: print("  " + line)
        if len(log) > 200: print(f"  ... {len(log) - 200} more")

main()
