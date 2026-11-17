# Tests

One command, no installs:

```bash
node tests/run.cjs                # everything (about 4–5 minutes)
node tests/run.cjs --fast         # skip the slow dist build checks
node tests/run.cjs prices         # only tests whose file, name or tag contains "prices"
node tests/run.cjs smoke ui       # several filters = any of them
node tests/run.cjs --list         # list the tests without running them
node tests/run.cjs --json out.json
```

The runner starts its own static server on a random port and exits non-zero if any test fails.
A test that needs a feature that is not built yet reports `PEND` (pending), not `FAIL`.

Browser tests use the Playwright and Chromium already on the machine (`require("playwright")`).
Nothing goes to the internet: globe.gl is served from a local copy (`node_modules/globe.gl` in the repo,
the `GLOBE_GL` environment variable, or the team scratchpad); without one the app's country-list
fallback is used. Fonts and other CDN requests are aborted.

| File | What it checks |
| --- | --- |
| `data.test.cjs` | No browser. Recipe ingredients exist in `PRICES`, recipe countries in `COUNTRIES`, `MARKETS` (currency, rate, level, stores, store types, unique ids, pegged rates), every recipe country has a market, `LOCAL_PRICES` ids and prices, generic store names are translatable, `tools/i18n_keys.py --check`, every `js/data` file is loaded by `index.html`. |
| `smoke.test.cjs` | All 16 languages on a phone (375×812) and desktop: no page or console errors, no visible `undefined`, `NaN`, `{n}`, `[object`; RTL for Arabic and Urdu. |
| `markets.test.cjs` | Every market × its first and last store, three recipes: receipt totals finite, positive, in the market's currency; till ≥ used ≥ per serving. |
| `ui.test.cjs` | Settings sheet (language, country, store) persists after reload (`localStorage` `wp.*`); Compare prices; cooking mode; search and filters; max-cost slider in JPY, INR, USD, NGN. |
| `features.test.cjs` | Country auto-detection from browser locale / time zone; US units and °F; ≥154 countries in the picker and its search; `LOCAL_PRICES` used for prices; "store price" vs "estimate" markers; new strings translated. |
| `perf.test.cjs` | Rough speed budget for the Prices page, market switch and recipe dialog. |
| `build.test.cjs` | Tagged `slow`. `dist/world-pantry-phone.html` exists, is under 10 MB, is newer than the sources, and opens offline with no errors. |

`lib.cjs` has the shared helpers (`newPage` with seeded `wp.*` storage and offline routing, `badText`, `parseMoney`).
Latest results and open bugs: [RESULTS.md](RESULTS.md).
