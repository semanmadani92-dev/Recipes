# World Pantry

A recipe app in English with two ways to find food:

- **Globe**: spin a 3D globe, tap a highlighted country and see its famous dishes (446 recipes from 154 countries).
- **Find recipes**: search by name, country or ingredient, then filter by the options below. Ingredient boxes suggest matches as you type (including common alternative names such as "cilantro" or "shrimp") and offer one-tap popular picks. On phones, the less-used filters fold away under "More filters".
  - ingredients you want to use (all or any of them)
  - ingredients to leave out
  - vegetarian, vegan or gluten-free
  - region, cooking time and difficulty
  - maximum cost per serving

Every recipe shows **what it costs to cook in Germany**, as a supermarket-receipt breakdown:

- **Ingredients used**: the share of each pack the recipe needs, in total and per serving.
- **At the till**: what you pay if you buy whole packs.
- Pantry staples (salt, oil, spices) can be counted or left out.
- Change the servings and all amounts and costs scale with them.
- **Copy shopping list** copies the list with pack sizes and prices.

Most recipes (422 of 446) show a **photo of the dish** on its card, at the top of the recipe and in the video intro. The photos come from Wikimedia Commons under free licenses (CC BY, CC BY-SA, CC0, GFDL or public domain), and each one is credited with its author, license and a link to the source. `tools/fetch_photos.py` finds and downloads them (see the overrides and skip list at the top of the script); the credits are in `js/data/photos.js`. Dishes without a correct free photo show none rather than a wrong one.

Every recipe also has a **"Watch how to cook it"** video. It is an animated walkthrough generated from the recipe: the dish, the ingredients with amounts, then one illustrated kitchen scene per step (boiling pot, sizzling pan, chopping board, oven, grill, blender, rolling pin, resting bowl with a clock, plating), picked from the verbs in each step. Each scene has a caption, a timer when the step names a cooking time, and optional voice narration (browser speech synthesis). There are play/pause, previous/next and a clickable progress bar, plus a link to search for filmed videos of the dish on YouTube.

More tools for cooking at home:

- **Week plan**: add dishes to days (from any recipe, or let "Fill empty days" pick them). One **combined shopping list** merges every ingredient across the week, grouped by shelf, with tick-boxes for the shop. It leaves out what is in your pantry and buys each pack once, and it shows how much that saves compared with shopping per dish.
- **Pantry**: tick what you already have ("Add the basics" ticks salt, oil, spices, rice, pasta and so on). Costs then count only what you need to buy, recipes show "You have 5 of 8", and search can sort by **fewest things to buy** or filter to "2 or fewer to buy". You can also tick ingredients straight from a recipe.
- **Cooking mode**: one step at a time in large type, the screen kept awake where the browser allows, and one-tap timers for every time mentioned in a step. Timers ring when done and keep running between steps.
- **Allergies and avoid**: leave out nuts & peanuts, milk, eggs, fish & shellfish, gluten, sesame, soy, pork or alcohol. Each recipe lists what it contains.
- **Shop at**: switch prices between discounter (Aldi, Lidl), supermarket (Rewe, Edeka, about +30 %) and organic (about +85 %).
- **Surprise me**: spins the globe to a random dish (respecting your allergy filters).
- **Your notes**: star ratings, "I cooked this" with dates, and private notes per recipe. Cooked dishes appear on the Saved page.
- **Calories**: an estimated kcal per serving on every recipe (from `js/data/nutrition.js`), plus a "Fewest calories" sort. Frying oil counts only the part the food absorbs.

Your plan, pantry, notes and settings are stored in your browser only.

The **Prices** tab lists all 345 ingredient prices. You can change any of them to match your store. Your changes and saved recipes are kept in your browser.

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

## Files

| Path | What it is |
| --- | --- |
| `index.html` | App shell |
| `css/style.css` | Styles, with light and dark themes |
| `js/app.js` | Globe, search and filters, cost calculation, routing |
| `js/player.js` | The animated recipe video player |
| `js/cook.js` | Cooking mode with step timers |
| `js/data/nutrition.js` | Approximate kcal per ingredient |
| `images/dishes/`, `js/data/photos.js` | Dish photos (640×480 JPEG) and their credits |
| `tools/fetch_photos.py` | Finds and downloads the freely licensed dish photos |
| `js/data/recipes.js` | Core countries and recipes. Quantities use the units from the price list. |
| `js/data/recipes-europe.js`, `recipes-mideast-africa.js`, `recipes-asia.js`, `recipes-americas-oceania.js`, `recipes-more-*.js` | More recipes and countries, by region |
| `js/data/prices.js`, `prices-more.js`, `prices-extra.js` | German ingredient prices, pack sizes and diet flags |
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

Prices are estimates in euros. They are based on typical discounter and own-brand prices in Germany (Aldi, Lidl, Penny, Rewe, Edeka) for 2025–2026. Real prices vary by store, region, season and offers. Use the Prices tab to adjust them.
