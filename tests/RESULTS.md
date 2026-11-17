# Test results

Last full run: **2026-11-17 21:59 UTC** — `node tests/run.cjs` (343s)

| Passed | Failed | Pending | Skipped | Total |
| ---: | ---: | ---: | ---: | ---: |
| 39 | 3 | 0 | 0 | 42 |

## Bugs found (most severe first)

### B1 — Tapping the exchange-rate field throws a JS error (and runs the star-rating code)
- **Repro:** market Japan (any non-euro country), open the Prices tab (or the settings sheet), tap/click into the "Exchange rate  1 € = [ ] JPY" box.
- **Expected:** the field gets focus, nothing else happens.
- **Actual:** `pageerror: TypeError: Cannot read properties of undefined (reading 'country') at renderRecipe (js/app.js:1147) at HTMLDocument.<click handler> (js/app.js:1470)`. Every tap into the field throws. Changing the rate itself still works (it goes through the separate `change` handler).
- **Cause:** the exchange-rate input is `<input … data-rate>` (`rateLine()`, js/app.js ~line 1020) and the star-rating buttons are `data-rate="n"`. The document click handler (js/app.js:1469–1470) does `tg.closest("[data-rate]")` → treats the click as a star rating: `noteFor(state.openRecipe)` with no recipe open, `saveNotes()`, then `renderRecipe()` crashes. Pre-existing, but now hits every user in the 150+ non-euro markets.
- **Fix hint:** rename one of the attributes (e.g. stars → `data-star`, or the rate input → `data-fx-rate` in `rateLine()` and in the `change` listener `el.matches("[data-rate]")` ~line 1576), or check `rt.tagName === "BUTTON"`.
- **Test:** `ui: exchange rate edit on the Prices page …`.

### B2 — "store price" label is shown for national averages (88% of the data), and averages are treated as cheapest-store prices
- **Repro:** market Japan (or France, Mexico, Egypt …) → Prices tab: rows such as rice/eggs/milk show the green "store price" tag and the legend says "16 of 345 prices are real shelf prices seen in stores in Japan". Open a recipe → receipt line says "· store price".
- **Data:** in `research/prices/*.json` 736 of 836 observations are `"kind": "average", "store": null` (cost-of-living sites, statistics offices); only 98 are `shelf`. 93 of the 109 countries with local prices have *no* shelf observation at all (e.g. JP, FR, MX, EG, AE).
- **Expected:** averages are labelled as such (e.g. "local average" vs "store price"), and an average (≈ a typical supermarket price) is not used as the *cheapest* store's price.
- **Actual:** `tools/import_research.py` ~line 226–229: `fac = … if st else 1` → a `store: null` average is taken as the cheapest store (factor 1); `local-prices.js` drops `kind`; `js/app.js` `priceSource()` returns "store" for every LOCAL item. Result: the label overstates what the data is, and every store's price is biased upwards (cheapest store shows the average, a Rewe-type store +20–30 % on top).
- **Fix hint:** keep `kind` per item in `local-prices.js` (e.g. `k:"avg"`), label avg items "local average" (new i18n string), and for `store: null` rows divide by the market's typical supermarket factor (median of `super`/`hyper` store factors) instead of 1.

### B3 — Phone: recipe dialog scrolls sideways; "Have it?" buttons are cut off (pre-existing, not from this sprint)
- **Repro:** phone 375×812, any language (worst in de), open any recipe (e.g. `#recipe-carbonara`), swipe left in the dialog.
- **Expected:** dialog content fits the screen width.
- **Actual:** `#recipe-dialog` scrollWidth is 397–444 px for a 375 px screen (en +53 px, de +69 px, es +43 px, vi +27 px, fr/ru +22 px). The ingredient rows and their "Have it?/Da?" buttons run off the right edge.
- **Cause:** `css/style.css:616` phone rule `.d-body { grid-template-columns: 1fr; }` — a bare `1fr` has an `auto` minimum, so the receipt's store `<select id="rc-level">` (long option text "Aldi · Lidl · Penny · Netto — Discounter") and country select set the column's min-content width (receipt measures 428 px). Same bug exists at commit 60487fe.
- **Fix hint:** `.d-body { grid-template-columns: minmax(0, 1fr); }` in the phone media query, and `.rc-level select { min-width: 0; flex: 1 1 auto; max-width: 70%; }`.
- **Test:** `smoke: all 16 languages load on phone …` (overflow check).

### B4 — Generic store names that can't be translated
- **Repro:** settings → country Cuba → store list shows "Tiendas en divisas" in every language; Yemen shows "Hayel Saeed hypermarkets".
- **Expected (TEAM.md contract):** generic stores use one of "Fresh market" / "Weekly market" / "Corner shop" / "Local grocers" (translated), everything else a brand name.
- **Actual:** `js/data/markets-world.js` (from `research/markets.json`) CU: "Tiendas en divisas"; YE: "Hayel Saeed hypermarkets" (brand + English descriptor). Neither is in any `js/i18n/*.js`.
- **Fix hint:** rename in `research/markets.json` (e.g. CU → "Local grocers" or a brand; YE → "Hayel Saeed") and re-run `tools/import_research.py`.
- **Test:** `data: generic store names (not brands) are translatable …`.

### B5 — Returning users are moved to a detected country (auto-detect is not "first visit only")
- **Repro:** browser locale en-US; localStorage from the earlier version: `wp.lang="en"`, `wp.saved=[…]`, `wp.prices2={"DE":{"rice":1.29}}`, `wp.stores={"DE":"de_rewe"}`, but no `wp.market` (the old app never wrote it unless the country was changed). Open the app.
- **Expected:** stays on Germany / Rewe with the user's own rice price (TEAM.md: "Auto-detect the country on first visit").
- **Actual:** header shows "US · USD"; the user's German prices and store choice are silently out of view. The detected market is also never saved, so it can change between visits (e.g. time-zone fallback while travelling).
- **Cause:** `js/app.js` state init `market: store.get("market", null) || detectMarket()`.
- **Fix hint:** only detect when no `wp.*` key exists (or default to DE when `wp.prices2.DE`/`wp.stores.DE`/`wp.saved` exist), and `store.set("market", …)` the detected value once.
- **Test:** `features: returning user from the Germany-only version …`.

### B6 — dist build must be rebuilt after the last source change
- `build: … not older than the app sources` fails whenever `js/`, `css/` or `index.html` change after `dist/world-pantry-phone.html` was built. The 21:57 build passed (8.8 MB, opens offline with no errors, 156 markets, 109 local-price countries). Rebuild once more after the fixes above.

### Notes (not bugs, for the record)
- Speed is fine: Prices page 140 ms, market switch ~130 ms, recipe open ~55 ms on this machine (one page at a time).
- `LOCAL_PRICES`: every price checked against the model estimate; none is more than 8× off. Largest gaps (2.5–4×): NG milk ×4.1, IR rice ×4.0, TN rice ×3.6, GH milk ×3.5; low side: TR chicken breast ×0.32, US chicken breast ×0.33 (Aldi $1.99/lb promo price chosen as base), JP tofu ×0.30. Plausible but worth a glance.


## All tests

| Result | File | Test | Details |
| --- | --- | --- | --- |
| ✅ pass | build | dist/world-pantry-phone.html exists, is under 10 MB and is not older than the app sources | 8.83 MB |
| ✅ pass | build | dist/world-pantry-phone.html opens offline (phone) with no errors, full data and working prices | {"recipes":446,"markets":156,"local":109,"globe":true,"fallback":false,"langs":15} |
| ✅ pass | build | dist/world-pantry-phone.html opens offline (desktop) with no errors, full data and working prices | {"recipes":446,"markets":156,"local":109,"globe":true,"fallback":false,"langs":15} |
| ✅ pass | data | index.html loads every js/data file that exists (none forgotten, none missing) |  |
| ✅ pass | data | every recipe ingredient id exists in PRICES and quantities are positive |  |
| ✅ pass | data | recipe ids unique; every recipe country is in COUNTRIES; serves/time valid |  |
| ✅ pass | data | PRICES entries have name, pack size, unit, price > 0 and shelf |  |
| ✅ pass | data | MARKETS: currency, rate > 0, level > 0, valid stores with unique ids, known store types |  |
| ✅ pass | data | market currencies match the country (spot check) |  |
| ✅ pass | data | every recipe country has a selectable market (where-you-shop covers all 154 countries) |  |
| ✅ pass | data | LOCAL_PRICES (if present): known markets and ingredient ids, finite prices > 0, sane vs estimate |  |
| ✅ pass | data | pegged currencies have consistent rates (USD pegs, CFA franc, BAM, BTN=INR, NAD=ZAR) |  |
| ❌ FAIL | data | generic store names (not brands) are translatable: one of the allowed names, translated in all languages | Expected values to be strictly deep-equal: +   '"Tiendas en divisas" (CU): untranslated in 15 languages — use one of Fresh market / Weekly market / Corner shop / Local grocers or a brand', +   '"Hayel Saeed hypermarkets" (YE): untranslated in 15 languages — use one of Fresh market / Weekly market /  |
| ✅ pass | data | python3 tools/i18n_keys.py --check passes |  |
| ✅ pass | data | every translation file defines every app language listed in i18n.js |  |
| ✅ pass | features | first visit: country (and language) auto-detected from browser locale |  |
| ✅ pass | features | a saved country beats auto-detection; detection is not written over a later choice |  |
| ✅ pass | features | US market: US units in ingredients and °F in every oven step; Metric toggle restores °C and persists | 105 recipes with Celsius steps; e.g. "Heat the oven as hot as it goes (475 °F+) with a tray inside." |
| ✅ pass | features | metric countries stay metric (DE, IN, GB) with no °F |  |
| ✅ pass | features | where-you-shop picker offers ≥154 countries incl. every recipe country, and its search works |  |
| ✅ pass | features | LOCAL_PRICES replace the estimate for that market (cheapest store) and store factors still apply | 150 local prices checked in US, IN, JP, GB |
| ✅ pass | features | 'store price' vs 'estimate' markers on the Prices page and in the receipt |  |
| ✅ pass | features | all languages translate the new sprint UI (settings sheet has no English leftovers in de/ja/ar) |  |
| ✅ pass | markets | every market × first and last store: receipt totals finite, positive, in the market's currency (desktop) | 933 market/store/recipe combinations checked |
| ✅ pass | markets | markets on a phone in Hindi and Japanese: receipt money is well-formed |  |
| ✅ pass | markets | prices are cheaper at the cheapest store than the dearest (store factor applied) |  |
| ✅ pass | perf | speed: Prices page, market switch and recipe open stay within budget | find 117ms, pricesFirst 147ms, pricesSwitchMarket 106ms, pricesSwitchStore 133ms, findAfterSwitch 116ms, recipeOpen 115ms, compareOpen 75ms, receiptSwitchMarket 147ms |
| ❌ FAIL | smoke | all 16 languages load on phone with no errors and no undefined/NaN/{n}/[object text | 6 languages with problems +   'en/phone/GB: recipe: #recipe-dialog scrolls sideways by 53px', +   'es/phone/MX: recipe: #recipe-dialog scrolls sideways by 43px', +   'fr/phone/FR: recipe: #recipe-dialog scrolls sideways by 22px', |
| ✅ pass | smoke | all 16 languages load on desktop with no errors and no undefined/NaN/{n}/[object text |  |
| ✅ pass | smoke | RTL: html dir=rtl for ar and ur, ltr for others; switching back restores ltr |  |
| ✅ pass | smoke | no untranslated English UI strings on screen in de, ja, ar, hi (globe, find, prices, recipe, settings) |  |
| ✅ pass | ui | settings (phone): switch language, country and store; all persist after reload |  |
| ✅ pass | ui | settings (desktop): switch language, country and store; all persist after reload |  |
| ✅ pass | ui | Compare prices in a recipe and on the Prices page render rows with valid money |  |
| ❌ FAIL | ui | exchange rate edit on the Prices page rescales estimates, keeps real store prices, persists, and Reset restores | Expected values to be strictly deep-equal: +   "pageerror: TypeError: Cannot read properties of undefined (reading 'country') \|     at renderRecipe (http://127.0.0.1:39509/js/app.js:1147:27) \|     at HTMLDocument.<anonymous> (http://127.0.0.1:39509/js/app.js:1470:130)" + ] - [] |
| ✅ pass | ui | week plan: fill the week, shopping list money is valid in US and IN, copy works; video opens |  |
| ✅ pass | ui | cooking mode opens, shows steps and moves forward |  |
| ✅ pass | ui | search and filters return results (text, vegan, region, ingredient chip, time) |  |
| ✅ pass | ui | max cost slider works in a non-euro market (JP) |  |
| ✅ pass | ui | max cost slider works in a non-euro market (IN) |  |
| ✅ pass | ui | max cost slider works in a non-euro market (US) |  |
| ✅ pass | ui | max cost slider works in a non-euro market (NG) |  |
