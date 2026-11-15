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

Every recipe also has a **"Watch how to cook it"** video. It is an animated walkthrough generated from the recipe: the dish, the ingredients with amounts, then one illustrated kitchen scene per step (boiling pot, sizzling pan, chopping board, oven, grill, blender, rolling pin, resting bowl with a clock, plating), picked from the verbs in each step. Each scene has a caption, a timer when the step names a cooking time, and optional voice narration (browser speech synthesis). There are play/pause, previous/next and a clickable progress bar, plus a link to search for filmed videos of the dish on YouTube.

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
