import json, re
OUT = "/home/user/Recipes/research/markets.json"
BI = "https://www.bancaditalia.it/compiti/operazioni-cambi/cambio/cambi_rif_20261111"
EUN = "https://www.euronews.com/2026/10/24/grocery-prices-across-europe-where-is-food-most-expensive-and-why"
EST = "estimate: World Bank ICP 2021 food price levels / Eurostat PLI 2024, adjusted to Nov 2026"
FIX = "fixed or pegged rate (EUR or USD peg, EUR/USD 1.12 from ECB reference rates Nov 2026)"

T = {
 "WAF": {"Vegetables":0.8,"Spices":0.6,"Fish":0.9,"Dairy & eggs":1.5,"Cans & jars":1.4,"Sauces":1.4,"Frozen":1.4},
 "EAF": {"Vegetables":0.75,"Fruit":0.7,"Spices":0.65,"Dairy & eggs":1.2,"Cans & jars":1.35,"Sauces":1.35,"Frozen":1.3},
 "SAF": {"Meat":0.9,"Fruit":0.8,"Dairy & eggs":1.1,"Cans & jars":1.15},
 "MENA": {"Bakery":0.6,"Vegetables":0.7,"Fruit":0.75,"Fresh herbs":0.45,"Spices":0.6,"Meat":1.3,"Dairy & eggs":1.15,"Cans & jars":1.25,"Sauces":1.35},
 "GULF": {"Spices":0.7,"Nuts & dried fruit":0.8,"Fresh herbs":0.8,"Grains & pasta":0.85,"Dairy & eggs":0.95,"Vegetables":1.05},
 "SAS": {"Spices":0.5,"Fresh herbs":0.35,"Vegetables":0.8,"Grains & pasta":0.85,"Dairy & eggs":1.15,"Meat":1.2,"Sauces":1.4,"Cans & jars":1.5,"Frozen":1.4,"Bakery":1.2},
 "SEA": {"Fish":0.7,"Sauces":0.6,"Fresh herbs":0.4,"Spices":0.6,"Vegetables":0.8,"Fruit":0.75,"Dairy & eggs":1.5,"Bakery":1.2,"Cans & jars":1.3},
 "CAS": {"Vegetables":0.75,"Fruit":0.75,"Fish":1.3,"Sauces":1.3,"Spices":0.9,"Cans & jars":1.2,"Nuts & dried fruit":0.7},
 "EEU": {"Vegetables":0.85,"Fruit":0.9,"Fish":1.1,"Sauces":1.15},
 "NORD": {"Fish":0.9,"Meat":1.15,"Vegetables":1.1},
 "LAT": {"Vegetables":0.75,"Fruit":0.7,"Fresh herbs":0.5,"Dairy & eggs":1.15,"Sauces":1.2,"Cans & jars":1.25,"Fish":1.05},
 "CAR": {"Fruit":0.9,"Vegetables":1.05,"Dairy & eggs":1.3,"Cans & jars":1.1,"Meat":1.1,"Grains & pasta":1.1,"Fish":0.9},
 "PAC": {"Fish":0.8,"Fruit":0.8,"Vegetables":1.2,"Dairy & eggs":1.4,"Cans & jars":1.3,"Meat":1.2},
 "NONE": {},
}

M = {}
def add(cc, num, name, cur, rate, level, cat, stores, conf, *src):
    if isinstance(cat, str): cat = dict(T[cat])
    st = []
    for s in stores:
        sid, nm, typ, f = s
        if not sid.startswith(cc.lower()+"_"): sid = cc.lower()+"_"+sid
        exec(open(__file__.replace("gen_markets.py","rename.py")).read(), globals())
        sid = RENAME.get(sid, sid)
        st.append([sid, nm, typ, f])
    M[cc] = {"name": name, "num": num, "cur": cur, "rate": rate, "level": level, "cat": cat,
             "stores": st, "sources": list(src) or [EST], "confidence": conf}

S = lambda *a: list(a)
FM = lambda f=0.9: ["market", "Fresh market", "market", f]
WM = lambda f=1.3: ["market", "Weekly market", "market", f]
CS = lambda f=1.15: ["corner", "Corner shop", "convenience", f]
LG = lambda f=1.0: ["grocers", "Local grocers", "super", f]

exec(open(__file__.replace("gen_markets.py", "markets_data.py")).read())

import os, math
ADJ = os.path.join(os.path.dirname(os.path.abspath(__file__)), "level_check.json")
if os.path.exists(ADJ):
    for cc, (n, ratio) in json.load(open(ADJ)).items():
        if cc not in M or ratio is None: continue
        m = M[cc]
        m["level_check"] = {"observed_vs_model": round(ratio, 2), "rows": n,
            "note": "median of (observed local price / modelled estimate) in research/prices, normalised so DE = 1; staples-heavy sample"}
        if n >= 4 and m["confidence"] != "high" and abs(math.log(ratio)) > 0.16:
            old = m["level"]; m["level"] = round(old * math.sqrt(ratio), 2)
            m["level_check"]["adjusted_from"] = old
json.dump(M, open(OUT, "w"), ensure_ascii=False, indent=1)
print(len(M), "countries written")
