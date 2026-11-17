import json, os
D = "/home/user/Recipes/research/prices/"
LB = 453.6; OZ = 28.35; GAL = 3785; FLOZ = 29.57
CUR = {}
P = {}
def C(cc, cur): CUR[cc] = cur; P.setdefault(cc, [])
def R(cc, id, price, qty, unit, store, product, source, date, kind=None, note=None):
    exec(open(os.path.join(os.path.dirname(os.path.abspath(__file__)), "rename.py")).read(), globals())
    store = RENAME.get(store, store) if store else store
    if store and not store.startswith(cc.lower()+"_"): store = RENAME.get(cc.lower()+"_"+store, cc.lower()+"_"+store)
    kind = kind or ("average" if store is None else "shelf")
    if store and not store.startswith(cc.lower()+"_"): store = cc.lower()+"_"+store
    row = {"id": id, "price": round(price, 4), "qty": round(qty, 1), "unit": unit, "store": store,
           "product": product, "source": source, "date": date, "kind": kind}
    if note: row["note"] = note
    PCW = {"bananas":120,"lemon":110,"lime":67,"orange":200,"lettuce":570,"eggs":60,"garlic":5,"avocado":200}
    if unit == "g" and id in PCW: row["pc_weight_g"] = PCW[id]
    P[cc].append(row)
exec(open(os.path.join(os.path.dirname(os.path.abspath(__file__)), "prices_data.py")).read())
tot = 0
for cc, rows in P.items():
    if not rows: continue
    json.dump({"country": cc, "currency": CUR[cc], "collected": "2026-11-17", "items": rows},
              open(D + cc + ".json", "w"), ensure_ascii=False, indent=1)
    tot += len(rows)
print(len([1 for r in P.values() if r]), "countries,", tot, "rows")
