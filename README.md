# World Pantry

A recipe app in 16 languages with two ways to find food:

- **Globe**: spin a 3D globe, tap a highlighted country and see its famous dishes (446 recipes from 154 countries).
- **Find recipes**: search by name, country or ingredient, then filter by the options below. Ingredient boxes suggest matches as you type (including common alternative names such as "cilantro" or "shrimp") and offer one-tap popular picks. On phones, the less-used filters fold away under "More filters".
  - ingredients you want to use (all or any of them)
  - ingredients to leave out
  - vegetarian, vegan or gluten-free
  - region, cooking time and difficulty
  - maximum cost per serving

Every recipe shows **what it costs to cook where you shop**: every recipe country and every large country (over 150), each with its own stores (for example Aldi, Rewe or a Turkish grocer in Germany, Walmart or Whole Foods in the US, D-Mart or a sabzi market in India), in local money. The cost appears as a supermarket-receipt breakdown:

- **Ingredients used**: the share of each pack the recipe needs, in total and per serving.
- **At the till**: what you pay if you buy whole packs.
- Pantry staples (salt, oil, spices) can be counted or left out.
- Change the servings and all amounts and costs scale with them.
- **Copy shopping list** copies the list with pack sizes and prices.
- **Compare prices** shows the same dish in every store of your country and in every other country (converted to your currency, with the local price underneath). Tap a row to switch.

## Languages

The app speaks English, 中文, हिन्दी, Español, العربية, Français, বাংলা, Português, Русский, اردو, Bahasa Indonesia, Deutsch, 日本語, Türkçe, Tiếng Việt and 한국어. It picks your browser's language on the first visit; change it with the globe button at the top right.

- Every button, label, message, ingredient name (all 345), shelf, region, store type and unit is translated. Country names, weekdays, numbers, dates and money come from the browser's own language data, so they are local too (for example "0,06 €", "¥10", "ر.س.").
- Arabic and Urdu switch the whole layout to right-to-left.
- Recipe names, descriptions and cooking steps stay in English (446 recipes is a lot of text). Each recipe has a **Translate recipe** button and cooking mode has **Translate steps**, which open the text in Google Translate in your language. Ingredient search works in your language and in English.
- Translations live in `js/i18n/<code>.js` with the English text as the key. `python3 tools/i18n_keys.py --check` lists any missing or extra strings and broken `{placeholders}` per language.

## Countries and stores

The globe button also sets **where you shop**: a country and one of its stores. Every recipe country and every country with more than 20 million people is there (over 150), in a searchable list grouped by region (type a country name, its English name, its code or its currency, such as "THB"). On the first visit the app guesses your country from the browser's language region (for example `en-US` → United States, `pt-BR` → Brazil), then from your time zone, and otherwise uses Germany. It does not save the guess until you pick a country yourself.

Each price comes from one of three places, in this order:

1. **Your price**: anything you type on the Prices page, saved for that country only.
2. **Store price**: a real shelf price seen in a store of that country (supermarket websites, price-statistics offices and similar sources, collected November 2026). It is converted to the German pack size and to the country's cheapest store, then the store factor and store-type factor below are applied.
3. **Estimate**: worked out from the German price (typical discounter prices):

> German price × country food price level × shelf factor (rice, fish, spices, meat … differ by country) × store factor × store-type factor (markets are cheap for produce, Asian/Turkish grocers for spices and sauces) × exchange rate

The Prices page marks store prices and your own prices, says how many of the 345 prices are real store prices for the chosen country, and lists the sources. The recipe receipt says, for example, "5 of 15 ingredients from real store prices in United States."

The hand-written country data is in `js/data/markets.js`. `js/data/markets-world.js` adds the other countries and corrects rates, price levels and stores from the research; `js/data/local-prices.js` holds the store prices. Both are generated (see below). Exchange rates are approximate (November 2026); you can type the current rate on the Prices page. The Prices page also compares the average cost per serving across the stores of your country and across all countries.

### Real store prices: updating them

The research data lives in `research/markets.json` (per country: currency, exchange rate, food price level, shelf factors, stores, sources) and `research/prices/<CC>.json` (observed shelf prices, one row per product). After changing it, run:

```bash
python3 tools/import_research.py
```

It writes `js/data/markets-world.js` and `js/data/local-prices.js` and prints a report: markets added, prices per country, and every row it skipped (unknown ingredient, unit that cannot be converted, such as a bunch against a weight) or rejected as an outlier (more than 5× or less than 0.2× the estimate, usually a pack-size mistake). Each observation is converted to the German pack size (weights by `g`, volumes by `ml`, items by `pc`, with typical weights for things such as peppers or cans), divided by its store's factor, and the median per ingredient is kept with up to three source links. It works with no research at all: countries without data get a rough regional price level, their own currency and generic stores ("Supermarket", "Fresh market", "Corner shop").

## Units

The settings sheet has **Metric (g, ml, °C)** or **US (oz, cups, °F)**. US units are the default in the United States, Liberia and Myanmar, metric everywhere else; your choice is saved. In US units, recipe ingredients, the receipt, shopping lists, cooking mode and the video show weights in oz and lb, small amounts of spice in teaspoons, liquids in cups, tablespoons and teaspoons, and oven temperatures in recipe steps ("roast at 200 °C") in °F. Pack sizes stay metric with the US size in brackets, for example "500 g (18 oz)".

Most recipes (422 of 446) show a **photo of the dish** on its card, at the top of the recipe and in the video intro. The photos come from Wikimedia Commons under free licenses (CC BY, CC BY-SA, CC0, GFDL or public domain), and each one is credited with its author, license and a link to the source. `tools/fetch_photos.py` finds and downloads them (see the overrides and skip list at the top of the script); the credits are in `js/data/photos.js`. Dishes without a correct free photo show none rather than a wrong one.

Every recipe also has a **"Watch how to cook it"** video. It is an animated walkthrough generated from the recipe: the dish, the ingredients with amounts, then one illustrated kitchen scene per step (boiling pot, sizzling pan, chopping board, oven, grill, blender, rolling pin, resting bowl with a clock, plating), picked from the verbs in each step. Each scene has a caption, a timer when the step names a cooking time, and optional voice narration (browser speech synthesis). There are play/pause, previous/next and a clickable progress bar, plus a link to search for filmed videos of the dish on YouTube.

More tools for cooking at home:

- **Week plan**: add dishes to days (from any recipe, or let "Fill empty days" pick them). One **combined shopping list** merges every ingredient across the week, grouped by shelf, with tick-boxes for the shop. It leaves out what is in your pantry and buys each pack once, and it shows how much that saves compared with shopping per dish.
- **Pantry**: tick what you already have ("Add the basics" ticks salt, oil, spices, rice, pasta and so on). Costs then count only what you need to buy, recipes show "You have 5 of 8", and search can sort by **fewest things to buy** or filter to "2 or fewer to buy". You can also tick ingredients straight from a recipe.
- **Cooking mode**: one step at a time in large type, the screen kept awake where the browser allows, and one-tap timers for every time mentioned in a step. Timers ring when done and keep running between steps.
- **Allergies and avoid**: leave out nuts & peanuts, milk, eggs, fish & shellfish, gluten, sesame, soy, pork or alcohol. Each recipe lists what it contains.
- **Where you shop**: pick your country and store; costs, the week plan and shopping lists follow it.
- **Surprise me**: spins the globe to a random dish (respecting your allergy filters).
- **Your notes**: star ratings, "I cooked this" with dates, and private notes per recipe. Cooked dishes appear on the Saved page.
- **Calories**: an estimated kcal per serving on every recipe (from `js/data/nutrition.js`), plus a "Fewest calories" sort. Frying oil counts only the part the food absorbs.

Your plan, pantry, notes and settings are stored in your browser only.

The **Prices** tab lists all 345 ingredient prices for your country and store. You can change any of them to match your store. Your changes and saved recipes are kept in your browser.

## Run it

No build step is needed. Serve the folder and open it in a browser:

```bash
python3 -m http.server 8000
# open http://localhost:8000
```

Opening `index.html` directly from disk also works. The 3D globe library (globe.gl) and the fonts load from a CDN, so you need an internet connection. Without one, the globe is replaced by a country list.

To build a single self-contained HTML file in `dist/`:

```bash
node tools/build-single.mjs
```

### One offline HTML file

To build a single `.html` file that works without internet, with the photos and the 3D globe library inside it (about 20 MB):

```bash
npm install globe.gl@2.45.3   # once, anywhere, to get a local copy of the globe library
python3 tools/build_standalone.py --globe node_modules/globe.gl/dist/globe.gl.min.js
# writes dist/world-pantry.html
```

Without `--globe` the file still works, but loads the globe from the internet. Needs Pillow (`pip install pillow`).

Smaller versions, for chat apps with a 10 MB limit:

```bash
python3 tools/build_standalone.py --globe … --format webp --width 340 --quality 55 --out dist/world-pantry-phone.html   # about 9 MB, all photos
python3 tools/build_standalone.py --globe … --no-photos --out dist/world-pantry-lite.html                               # about 3 MB, no photos
```

## Files

| Path | What it is |
| --- | --- |
| `index.html` | App shell |
| `css/style.css` | Styles, with light and dark themes |
| `js/app.js` | Globe, search and filters, cost calculation, price comparison, routing |
| `js/i18n.js`, `js/i18n/*.js` | Language switching and the 15 translations |
| `js/data/markets.js` | Hand-written countries, currencies, price levels and stores |
| `js/data/markets-world.js`, `js/data/local-prices.js` | Generated by `tools/import_research.py`: all other countries, and real store prices with sources |
| `research/` | Research data: country markets and observed shelf prices |
| `tools/import_research.py` | Turns the research data into the two generated files above |
| `tools/i18n_keys.py` | Lists the translatable strings and checks the language files |
| `js/player.js` | The animated recipe video player |
| `js/cook.js` | Cooking mode with step timers |
| `js/data/nutrition.js` | Approximate kcal per ingredient |
| `images/dishes/`, `js/data/photos.js` | Dish photos (640×480 JPEG) and their credits |
| `tools/fetch_photos.py` | Finds and downloads the freely licensed dish photos |
| `js/data/recipes.js` | Core countries and recipes. Quantities use the units from the price list. |
| `js/data/recipes-europe.js`, `recipes-mideast-africa.js`, `recipes-asia.js`, `recipes-americas-oceania.js`, `recipes-more-*.js` | More recipes and countries, by region |
| `js/data/prices.js`, `prices-more.js`, `prices-extra.js` | Base (German) ingredient prices, pack sizes and diet flags |
| `js/data/world.js` | Country outlines (Natural Earth 1:110m, public domain) |

### Adding a recipe

Add an entry to `RECIPES` in `js/data/recipes.js`, or push it from one of the regional files:

```js
{ id: "my-dish", name: "My Dish", country: "276", serves: 4, time: 30, level: "Easy",
  desc: "One line about the dish.",
  ing: [["onion", 150], ["eggs", 2, "beaten"]],   // [priceId, quantity, optional note]
  steps: ["First step.", "Second step."] }
```

- `country` is the ISO 3166 numeric code. It must also be listed in `COUNTRIES` (a regional file can add countries with `Object.assign(window.COUNTRIES, {...})`).
- Quantities use the unit of the matching price entry (g, ml, pc, clove, bunch, can, slice, leaf, …). Add any new ingredient to `prices-extra.js`.
- Diet labels (vegetarian, vegan, gluten-free) are worked out automatically from the ingredients.

## About the prices

The base prices are estimates in euros, based on typical discounter and own-brand prices in Germany (Aldi, Lidl, Penny, Rewe, Edeka) for 2025–2026. Other countries and stores are estimated from them (see "Countries and stores" above), using rounded food price level comparisons (Eurostat, World Bank ICP) and approximate exchange rates. Where the research found real shelf prices for a country, those replace the estimate (see "Countries and stores"). They are good for comparing, not exact quotes: real prices vary by store, region, season and offers. Use the Prices tab to adjust them. Pack sizes are the German ones everywhere.
