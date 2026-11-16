/* World Pantry — globe, recipe search and German cost estimates. No build step. */
(function () {
  "use strict";

  const PRICES = window.PRICES;
  const PHOTOS = window.PHOTOS || {};
  const RECIPES = window.RECIPES;
  const COUNTRIES = window.COUNTRIES;
  const KCAL = window.KCAL || {};

  // ---------- storage (per-browser conveniences only) ----------
  const store = {
    get(key, fallback) {
      try { const v = localStorage.getItem("wp." + key); return v == null ? fallback : JSON.parse(v); } catch (e) { return fallback; }
    },
    set(key, value) { try { localStorage.setItem("wp." + key, JSON.stringify(value)); } catch (e) { /* ignore */ } }
  };

  const state = {
    view: "globe",
    country: null,
    saved: new Set(store.get("saved", [])),
    priceOverrides: store.get("prices", {}),
    includeStaples: store.get("staples", true),
    inc: [],
    exc: [],
    openRecipe: null,
    servings: null,
    pantry: new Set(store.get("pantry", [])),
    plan: store.get("plan", []),            // [{ id, day: 0-6, servings }]
    shopTicked: new Set(store.get("shopTicked", [])),
    notes: store.get("notes", {}),          // id -> { rating, note, cooked: [ISO dates] }
    priceLevel: store.get("priceLevel", "discount"),
    allergies: new Set(store.get("allergies", [])),
    planPicker: false
  };
  state.plan = state.plan.filter((x) => RECIPES.some((r) => r.id === x.id));

  // Store price levels: default prices are discounter prices; the others scale them.
  const LEVELS = {
    discount: { name: "Discounter (Aldi, Lidl, Penny)", short: "Discounter", f: 1 },
    supermarket: { name: "Supermarket (Rewe, Edeka)", short: "Supermarket", f: 1.3 },
    organic: { name: "Organic (Bio, Alnatura, Denns)", short: "Organic", f: 1.85 }
  };
  if (!LEVELS[state.priceLevel]) state.priceLevel = "discount";

  const ALLERGENS = {
    nuts: { name: "Nuts & peanuts", ids: ["almonds", "peanuts", "peanut_butter", "pine_nuts", "walnuts", "hazelnuts", "pistachios"] },
    milk: { name: "Milk", flag: "dairy" },
    eggs: { name: "Eggs", flag: "egg" },
    fish: { name: "Fish & shellfish", flag: "fish" },
    gluten: { name: "Gluten", flag: "gluten" },
    sesame: { name: "Sesame", ids: ["sesame_seeds", "sesame_oil", "tahini", "hummus_ready", "zaatar"] },
    soy: { name: "Soy", ids: ["soy_sauce", "dark_soy_sauce", "kecap_manis", "tofu", "miso", "doubanjiang", "hoisin", "gochujang", "oyster_sauce"] },
    pork: { name: "Pork", ids: ["pork_shoulder", "pork_belly", "pork_schnitzel", "pork_mince", "pork_ribs", "mixed_mince", "bacon", "bacon_rashers", "pancetta", "prosciutto", "ham", "salami", "chorizo", "chorizo_fresh", "bratwurst", "smoked_sausage", "toulouse_sausage", "blood_sausage", "gelatin"] },
    alcohol: { name: "Alcohol", ids: ["red_wine", "white_wine", "beer", "dark_beer", "kirsch", "shaoxing_wine", "mirin"] }
  };
  const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  const BASICS = ["salt", "black_pepper", "sugar", "flour", "vegetable_oil", "olive_oil", "white_vinegar", "rice", "pasta", "spaghetti",
    "paprika", "cumin", "chili_flakes", "cinnamon", "oregano", "thyme", "bay_leaves", "nutmeg", "curry_powder", "vegetable_stock",
    "soy_sauce", "mustard", "ketchup", "tomato_paste", "baking_powder", "onion", "garlic", "butter"];


  // ---------- helpers ----------
  const $ = (s, el = document) => el.querySelector(s);
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const eur = new Intl.NumberFormat("en-IE", { style: "currency", currency: "EUR" });
  const money = (n) => eur.format(n);
  const basePrice = (id) => Math.round(PRICES[id].p * LEVELS[state.priceLevel].f * 100) / 100;
  const priceOf = (id) => (state.priceOverrides[id] != null ? state.priceOverrides[id] : basePrice(id));
  const byId = Object.fromEntries(RECIPES.map((r) => [r.id, r]));

  const FRACTIONS = { 0.25: "¼", 0.5: "½", 0.75: "¾", 0.33: "⅓", 0.67: "⅔" };
  function fmtNumber(n) {
    if (n >= 100) return String(Math.round(n / 5) * 5);
    if (n >= 10) return String(Math.round(n));
    if (n >= 1) return String(Math.round(n * 10) / 10);
    return String(Math.round(n * 100) / 100);
  }
  function fmtCount(n) {
    const whole = Math.floor(n + 1e-9);
    const frac = Math.round((n - whole) * 100) / 100;
    const f = FRACTIONS[frac];
    if (frac === 0) return String(whole);
    if (f) return (whole ? whole : "") + f;
    return fmtNumber(n);
  }
  const PLURAL = { clove: "cloves", bunch: "bunches", can: "cans", cube: "cubes", sachet: "sachets", sheet: "sheets", stalk: "stalks", slice: "slices", leaf: "leaves" };
  function fmtQty(q, u) {
    if (u === "g") return q >= 1000 ? fmtNumber(q / 1000) + " kg" : fmtNumber(q) + " g";
    if (u === "ml") return q >= 1000 ? fmtNumber(q / 1000) + " l" : fmtNumber(q) + " ml";
    if (u === "pc" || u === "can") return fmtCount(q) + " ×";
    return fmtCount(q) + " " + (q > 1 ? PLURAL[u] || u : u);
  }
  function packLabel(id) {
    const p = PRICES[id];
    if (p.u === "g") return p.q >= 1000 ? fmtNumber(p.q / 1000) + " kg" : p.q + " g";
    if (p.u === "ml") return p.q >= 1000 ? fmtNumber(p.q / 1000) + " l" : p.q + " ml";
    if (p.u === "pc") return p.q === 1 ? "each" : p.q + " pc";
    if (p.u === "can") return "can";
    return p.q + " " + (p.q > 1 ? PLURAL[p.u] || p.u : p.u);
  }
  function unitPrice(id) {
    const p = PRICES[id]; const price = priceOf(id);
    if (p.u === "g") return money((price / p.q) * 1000) + "/kg";
    if (p.u === "ml") return money((price / p.q) * 1000) + "/l";
    return money(price / p.q) + "/" + (p.u === "pc" ? "pc" : p.u);
  }

  // ---------- diet & cost ----------
  function dietOf(recipe) {
    if (recipe._diet) return recipe._diet;
    const flags = new Set();
    recipe.ing.forEach(([id]) => (PRICES[id].d || []).forEach((f) => flags.add(f)));
    const vegetarian = !flags.has("meat") && !flags.has("fish");
    const vegan = vegetarian && !flags.has("dairy") && !flags.has("egg") && !flags.has("honey");
    recipe._diet = { vegetarian, vegan, glutenfree: !flags.has("gluten") };
    return recipe._diet;
  }

  function allergensOf(recipe) {
    if (recipe._allergens) return recipe._allergens;
    const ids = new Set(recipe.ing.map(([id]) => id));
    const flags = new Set();
    recipe.ing.forEach(([id]) => (PRICES[id].d || []).forEach((f) => flags.add(f)));
    recipe._allergens = Object.keys(ALLERGENS).filter((k) => {
      const a = ALLERGENS[k];
      return (a.flag && flags.has(a.flag)) || (a.ids && a.ids.some((i) => ids.has(i)));
    });
    return recipe._allergens;
  }

  // frying oil: only a part of it ends up in the food
  const FRY_OILS = { vegetable_oil: 1, olive_oil: 1 };
  function kcalOf(recipe) {
    if (recipe._kcal != null) return recipe._kcal;
    let k = 0;
    recipe.ing.forEach(([id, q, note]) => {
      const u = PRICES[id].u, v = KCAL[id] || 0;
      let e = (u === "g" || u === "ml") ? (q / 100) * v : q * v;
      if (FRY_OILS[id] && (/fry|reused/i.test(note || "") || q >= 250)) e *= 0.15;
      k += e;
    });
    recipe._kcal = Math.round(k / recipe.serves / 10) * 10;
    return recipe._kcal;
  }

  // what you still need to buy (staples count as "have" when the staples toggle is off)
  function toBuy(recipe) {
    return recipe.ing.filter(([id]) => !state.pantry.has(id) && !(PRICES[id].s && !state.includeStaples)).length;
  }

  function costOf(recipe, servings, includeStaples) {
    const scale = (servings || recipe.serves) / recipe.serves;
    let used = 0, till = 0;
    const lines = recipe.ing.map(([id, qty, note]) => {
      const p = PRICES[id];
      const q = qty * scale;
      const price = priceOf(id);
      const usedCost = (q / p.q) * price;
      const packs = Math.max(1, Math.ceil(q / p.q - 1e-6));
      const tillCost = packs * price;
      const staple = !!p.s;
      const have = state.pantry.has(id);
      const counted = (includeStaples || !staple) && !have;
      if (counted) { used += usedCost; till += tillCost; }
      return { id, name: p.n, q, u: p.u, note, usedCost, packs, tillCost, staple, have, counted };
    });
    const s = servings || recipe.serves;
    return { lines, used, till, perServing: used / s, servings: s };
  }
  const perServing = (r) => costOf(r, r.serves, state.includeStaples).perServing;

  // ---------- small UI bits ----------
  function toast(msg) {
    const t = $("#toast");
    t.textContent = msg; t.hidden = false;
    clearTimeout(toast._t);
    toast._t = setTimeout(() => { t.hidden = true; }, 2200);
  }
  function dietTags(r) {
    const d = dietOf(r); const out = [];
    if (d.vegan) out.push('<span class="tag veg">Vegan</span>');
    else if (d.vegetarian) out.push('<span class="tag veg">Vegetarian</span>');
    if (d.glutenfree) out.push('<span class="tag gf">Gluten-free</span>');
    return out.join("");
  }
  function card(r, extra) {
    const c = COUNTRIES[r.country];
    const saved = state.saved.has(r.id);
    const ph = PHOTOS[r.id];
    return `<button type="button" class="r-card${saved ? " is-saved" : ""}${ph ? " has-photo" : ""}" data-recipe="${r.id}" aria-label="${esc(r.name)}, ${esc(c.name)}">
      ${ph ? `<span class="r-photo"><img src="${esc(ph.src)}" alt="" loading="lazy" decoding="async" onerror="this.parentNode.remove()"></span>` : ""}
      <span class="saved-dot" title="Saved"></span>
      <span class="r-where">${esc(c.name)} · ${esc(c.region)}</span>
      <span class="r-name">${esc(r.name)}</span>
      <span class="r-cost">${money(perServing(r))}<small>${state.pantry.size ? "to buy / serving" : "per serving"}</small></span>
      <span class="r-desc">${esc(r.desc)}</span>
      ${extra || ""}
      <span class="r-tags"><span class="tag">${r.time} min</span><span class="tag">≈ ${kcalOf(r)} kcal</span>${dietTags(r)}${noteTags(r)}</span>
    </button>`;
  }
  function noteTags(r) {
    const n = state.notes[r.id];
    if (!n) return "";
    return (n.rating ? `<span class="tag star" title="Your rating">★ ${n.rating}</span>` : "") +
      (n.cooked && n.cooked.length ? `<span class="tag cooked">Cooked ${n.cooked.length}×</span>` : "");
  }

  // ---------- routing ----------
  const VIEWS = ["globe", "find", "plan", "pantry", "saved", "prices"];
  function route() {
    if (ignoreHash && location.hash === ignoreHash) { ignoreHash = null; return; }
    ignoreHash = null;
    const h = location.hash.replace("#", "");
    if (h.startsWith("recipe-") && byId[h.slice(7)]) {
      if (!route.done) showView(state.view);
      route.done = true;
      openRecipe(h.slice(7), true);
      return;
    }
    if (h.startsWith("country-") && COUNTRIES[h.slice(8)]) {
      route.done = true;
      closeDialog(true);
      showView("globe");
      selectCountry(h.slice(8), true);
      return;
    }
    route.done = true;
    closeDialog(true);
    showView(VIEWS.includes(h) ? h : "globe");
  }
  function showView(v) {
    state.view = v;
    VIEWS.forEach((name) => { $("#view-" + name).hidden = name !== v; });
    document.querySelectorAll(".tab").forEach((t) => {
      if (t.dataset.view === v) t.setAttribute("aria-current", "page"); else t.removeAttribute("aria-current");
    });
    if (v === "globe") globeCtl.ensure();
    if (v === "find") renderResults();
    if (v === "saved") renderSaved();
    if (v === "prices") renderPrices();
    if (v === "plan") renderPlan();
    if (v === "pantry") renderPantry();
  }
  let ignoreHash = null;
  function setHash(h) {
    if (location.hash === "#" + h) return;
    ignoreHash = "#" + h;
    location.hash = h;
  }

  // ---------- globe ----------
  const recipeCountries = {};
  RECIPES.forEach((r) => { (recipeCountries[r.country] = recipeCountries[r.country] || []).push(r); });

  const globeCtl = (function () {
    let g = null, hover = null, failed = false;
    const el = $("#globe");
    const token = (name) => getComputedStyle(document.documentElement).getPropertyValue(name).trim();
    let T = {};
    function readTokens() {
      T = {
        ocean: token("--ocean"), land: token("--land"), stroke: token("--land-stroke"), side: token("--land-side"),
        herb: token("--herb"), saffron: token("--saffron"), atmo: token("--atmo")
      };
    }
    const has = (f) => !!(f && recipeCountries[f.id]);
    function cap(f) {
      if (f.id === state.country) return T.saffron;
      if (has(f)) return f === hover ? T.saffron : T.herb;
      return T.land;
    }
    function alt(f) {
      if (f.id === state.country) return 0.06;
      if (has(f)) return f === hover ? 0.035 : 0.014;
      return 0.004;
    }
    function label(f) {
      const list = recipeCountries[f.id];
      if (!list) return `<div class="globe-tip"><b>${esc(f.properties.name)}</b><span>No recipes yet</span></div>`;
      const c = COUNTRIES[f.id];
      return `<div class="globe-tip"><b>${esc(c.name)}</b><span>${list.length} recipe${list.length > 1 ? "s" : ""} · ${esc(list.slice(0, 3).map((r) => r.name).join(", "))}</span></div>`;
    }
    function applyColors() {
      if (!g) return;
      readTokens();
      try { g.globeMaterial().color.set(T.ocean); } catch (e) { /* ignore */ }
      g.atmosphereColor(T.atmo)
        .polygonCapColor((f) => cap(f))
        .polygonSideColor(() => T.side)
        .polygonStrokeColor(() => T.stroke)
        .pointColor(() => T.saffron);
    }
    function refresh() {
      if (!g) return;
      g.polygonCapColor((f) => cap(f)).polygonAltitude((f) => alt(f));
    }
    function ensure() {
      if (g || failed) { if (g) resize(); return; }
      if (typeof window.Globe !== "function") { fail(); return; }
      try {
        readTokens();
        const features = window.WORLD_GEO.features;
        const points = Object.keys(recipeCountries).map((id) => ({ id, lat: COUNTRIES[id].lat, lng: COUNTRIES[id].lng }));
        g = window.Globe({ animateIn: true })(el)
          .backgroundColor("rgba(0,0,0,0)")
          .showAtmosphere(true).atmosphereAltitude(0.16)
          .polygonsData(features)
          .polygonsTransitionDuration(250)
          .polygonLabel(label)
          .onPolygonHover((f) => {
            hover = f;
            el.style.cursor = has(f) ? "pointer" : "grab";
            refresh();
          })
          .onPolygonClick((f) => { if (has(f)) { selectCountry(f.id); } })
          .pointsData(points)
          .pointLat("lat").pointLng("lng")
          .pointAltitude(0.02).pointRadius(0.35).pointsMerge(false)
          .pointLabel((p) => label({ id: p.id, properties: { name: COUNTRIES[p.id].name } }))
          .onPointClick((p) => selectCountry(p.id));
        applyColors();
        refresh();
        const controls = g.controls();
        const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        controls.autoRotate = !reduce;
        controls.autoRotateSpeed = 0.45;
        controls.addEventListener("start", () => { controls.autoRotate = false; $("#globe-hint").hidden = true; });
        g.pointOfView({ lat: 30, lng: 15, altitude: 2.3 }, 0);
        resize();
        new ResizeObserver(resize).observe(el.parentElement);
        // theme changes (OS setting or host toggle)
        window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", applyColors);
        new MutationObserver(applyColors).observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
      } catch (e) {
        console.error(e);
        fail();
      }
    }
    function fail() {
      failed = true;
      $("#globe-fallback").hidden = false;
      $("#globe-hint").hidden = true;
    }
    function resize() {
      if (!g) return;
      const box = el.parentElement.getBoundingClientRect();
      if (box.width && box.height) g.width(box.width).height(box.height);
    }
    function focus(id) {
      if (!g) return;
      const c = COUNTRIES[id];
      g.controls().autoRotate = false;
      g.pointOfView({ lat: c.lat, lng: c.lng, altitude: 1.6 }, 900);
      refresh();
    }
    function reset() { if (g) { refresh(); g.pointOfView({ altitude: 2.3 }, 700); } }
    return { ensure, focus, reset, refresh };
  })();

  function selectCountry(id, fromRoute) {
    state.country = id;
    renderCountryPanel();
    globeCtl.focus(id);
    if (!fromRoute) setHash("country-" + id);
  }

  function renderCountryPanel() {
    const panel = $("#country-panel");
    if (!state.country) {
      const regions = {};
      Object.keys(recipeCountries).forEach((id) => {
        const c = COUNTRIES[id];
        (regions[c.region] = regions[c.region] || []).push(id);
      });
      const order = ["Europe", "Middle East", "Africa", "Asia", "Americas", "Oceania"];
      const cheapest = RECIPES.slice().sort((a, b) => perServing(a) - perServing(b)).slice(0, 3);
      panel.innerHTML = `
        <div>
          <div class="panel-eyebrow">${RECIPES.length} recipes · ${Object.keys(recipeCountries).length} countries</div>
          <h1 class="panel-title" id="globe-title">Where do you want to eat tonight?</h1>
        </div>
        <button type="button" class="btn btn-dice-big" data-action="surprise"><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3.5" y="3.5" width="17" height="17" rx="4" fill="none" stroke="currentColor" stroke-width="1.8"/><circle cx="8.5" cy="8.5" r="1.5" fill="currentColor"/><circle cx="15.5" cy="15.5" r="1.5" fill="currentColor"/><circle cx="12" cy="12" r="1.5" fill="currentColor"/></svg>Surprise me with a dish</button>
        <p class="lede" style="margin:0">Spin the globe and tap a green country to see its famous dishes. Every recipe shows what it costs to cook with ingredients from a German supermarket.</p>
        ${order.filter((r) => regions[r]).map((r) => `
          <div class="region-block"><h3>${r}</h3><div class="country-chips">
            ${regions[r].sort((a, b) => COUNTRIES[a].name.localeCompare(COUNTRIES[b].name)).map((id) => `<button type="button" class="country-chip" data-country="${id}">${esc(COUNTRIES[id].name)} <small>${recipeCountries[id].length}</small></button>`).join("")}
          </div></div>`).join("")}
        <div class="region-block"><h3>Cheapest right now</h3><div class="mini-list">${cheapest.map((r) => card(r)).join("")}</div></div>`;
      return;
    }
    const c = COUNTRIES[state.country];
    const list = recipeCountries[state.country];
    const avg = list.reduce((s, r) => s + perServing(r), 0) / list.length;
    panel.innerHTML = `
      <button type="button" class="back-btn" data-action="all-countries">← All countries</button>
      <div>
        <div class="panel-eyebrow">${esc(c.region)}</div>
        <h1 class="panel-title" id="globe-title">${esc(c.name)}</h1>
      </div>
      <div class="panel-meta"><span><b>${list.length}</b> famous dish${list.length > 1 ? "es" : ""}</span><span>Average <b>${money(avg)}</b> per serving in Germany</span></div>
      <div class="mini-list">${list.map((r) => card(r)).join("")}</div>`;
    panel.scrollTop = 0;
  }

  // ---------- find ----------
  const usage = {};
  RECIPES.forEach((r) => r.ing.forEach(([id]) => { usage[id] = (usage[id] || 0) + 1; }));
  // extra words people search with that are not in the ingredient name
  const ALIASES = {
    coriander: "cilantro", spring_onions: "scallions green onions", eggplant: "aubergine", zucchini: "courgette",
    chickpeas_can: "garbanzo", dried_chickpeas: "garbanzo", beef_mince: "ground beef hamburger", mixed_mince: "ground meat",
    pork_mince: "ground pork", lamb_mince: "ground lamb", bell_pepper: "capsicum paprika", shrimp: "shrimp seafood",
    fresh_chili: "chilli hot pepper", cream: "heavy cream sahne", sour_cream: "creme fraiche", quark: "curd cheese",
    white_fish: "cod pollock fish", salmon: "fish", tuna_can: "fish", tofu: "bean curd", potatoes: "kartoffeln",
    floury_potatoes: "kartoffeln", sweet_potatoes: "yam kumara", plantain: "banana", mussels: "seafood"
  };
  const ingIndex = Object.entries(PRICES).filter(([id]) => usage[id])
    .map(([id, p]) => ({ id, name: p.n, cat: p.c, uses: usage[id], staple: !!p.s, hay: (p.n + " " + id.replace(/_/g, " ") + " " + (ALIASES[id] || "")).toLowerCase() }))
    .sort((a, b) => a.name.localeCompare(b.name));
  const ingById = Object.fromEntries(ingIndex.map((x) => [x.id, x]));
  const AVOID = ["coriander", "mushrooms", "pork_belly", "shrimp", "eggplant", "olives", "fresh_chili", "peanuts", "eggs", "milk", "beef_mince", "fish_sauce"];

  function matchIngredients(text, exclude) {
    const t = text.trim().toLowerCase();
    if (!t) return [];
    const words = t.split(/\s+/);
    const out = [];
    ingIndex.forEach((x) => {
      if (exclude.includes(x.id)) return;
      if (!words.every((w) => x.hay.includes(w))) return;
      const name = x.name.toLowerCase();
      const score = name.startsWith(t) ? 0 : new RegExp("\\b" + t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).test(name) ? 1 : name.includes(t) ? 2 : 3;
      out.push({ x, score });
    });
    out.sort((a, b) => a.score - b.score || b.x.uses - a.x.uses || a.x.name.localeCompare(b.x.name));
    return out.slice(0, 8).map((o) => o.x);
  }
  function highlight(name, text) {
    const t = text.trim();
    const i = t ? name.toLowerCase().indexOf(t.toLowerCase()) : -1;
    if (i < 0) return esc(name);
    return esc(name.slice(0, i)) + "<b>" + esc(name.slice(i, i + t.length)) + "</b>" + esc(name.slice(i + t.length));
  }

  function renderChips() {
    $("#inc-chips").innerHTML = state.inc.map((id) => `<span class="chip">${esc(PRICES[id].n)}<button type="button" data-remove-inc="${id}" aria-label="Remove ${esc(PRICES[id].n)}">×</button></span>`).join("");
    $("#exc-chips").innerHTML = state.exc.map((id) => `<span class="chip ex">${esc(PRICES[id].n)}<button type="button" data-remove-exc="${id}" aria-label="Remove ${esc(PRICES[id].n)}">×</button></span>`).join("");
  }

  function addChip(kind, id) {
    const list = state[kind];
    if (!list.includes(id)) list.push(id);
    const other = kind === "inc" ? state.exc : state.inc;
    const i = other.indexOf(id); if (i >= 0) other.splice(i, 1);
    renderChips();
    if (kind === "inc" && state.inc.length === 1) $("#sort").value = "match";
    updateMoreCount();
    renderResults();
  }

  // ---------- ingredient picker (combobox) ----------
  const picker = {};
  function setupPicker(kind) {
    const input = $("#" + kind + "-input");
    const box = $("#" + kind + "-suggest");
    const st = { items: [], active: -1, open: false };
    picker[kind] = { input, box, st, render, close };

    function render() {
      const chosen = state.inc.concat(state.exc);
      const text = input.value;
      st.active = -1;
      if (!text.trim()) {
        const pool = kind === "inc"
          ? ingIndex.filter((x) => !x.staple).sort((a, b) => b.uses - a.uses).map((x) => x.id)
          : AVOID.filter((id) => ingById[id]);
        const quick = pool.filter((id) => !chosen.includes(id)).slice(0, kind === "inc" ? 12 : 10);
        st.items = [];
        box.innerHTML = `<div class="sg-label">${kind === "inc" ? "Popular ingredients" : "Often left out"}</div>
          <div class="sg-quick">${quick.map((id) => `<button type="button" class="sg-pill" data-pick="${id}" tabindex="-1">+ ${esc(PRICES[id].n)}</button>`).join("")}</div>
          <div class="sg-hint">Or type to search ${ingIndex.length} ingredients</div>`;
      } else {
        st.items = matchIngredients(text, chosen);
        box.innerHTML = st.items.length
          ? st.items.map((x, i) => `<div class="sg-row" role="option" id="${kind}-opt-${i}" data-pick="${x.id}" aria-selected="false">
              <span class="sg-name">${highlight(x.name, text)}</span>
              <span class="sg-meta">${x.uses} recipe${x.uses > 1 ? "s" : ""}</span></div>`).join("")
          : `<div class="sg-empty">No ingredient matches “${esc(text.trim())}”. Try a shorter word, like “chick” or “beef”.</div>`;
        if (st.items.length) setActive(0);
      }
      box.hidden = false;
      st.open = true;
      input.setAttribute("aria-expanded", "true");
    }
    function setActive(i) {
      const rows = box.querySelectorAll(".sg-row");
      if (!rows.length) return;
      st.active = (i + rows.length) % rows.length;
      rows.forEach((r, j) => { r.classList.toggle("active", j === st.active); r.setAttribute("aria-selected", j === st.active ? "true" : "false"); });
      input.setAttribute("aria-activedescendant", rows[st.active].id);
      rows[st.active].scrollIntoView({ block: "nearest" });
    }
    function close() {
      box.hidden = true; st.open = false;
      input.setAttribute("aria-expanded", "false");
      input.removeAttribute("aria-activedescendant");
    }
    function pick(id) {
      addChip(kind, id);
      input.value = "";
      render();
      input.focus({ preventScroll: true });
    }

    input.addEventListener("focus", () => {
      render();
      // on phones, lift the box above the keyboard so the suggestions stay visible
      if (window.matchMedia("(max-width: 960px)").matches) {
        setTimeout(() => {
          const top = input.closest(".f-group").getBoundingClientRect().top + window.scrollY - $(".topbar").offsetHeight - 12;
          window.scrollTo({ top, behavior: "smooth" });
        }, 250);
      }
    });
    input.addEventListener("input", render);
    input.addEventListener("blur", () => setTimeout(() => { if (document.activeElement !== input) close(); }, 120));
    input.addEventListener("keydown", (e) => {
      if (e.key === "ArrowDown") { e.preventDefault(); if (!st.open) render(); setActive(st.active + 1); }
      else if (e.key === "ArrowUp") { e.preventDefault(); setActive(st.active - 1); }
      else if (e.key === "Enter" || e.key === ",") {
        e.preventDefault();
        if (st.items.length) pick(st.items[Math.max(0, st.active)].id);
        else if (input.value.trim()) toast("No ingredient matches “" + input.value.trim() + "”.");
        else input.blur();
      } else if (e.key === "Escape") { if (input.value) { input.value = ""; render(); } else { close(); input.blur(); } }
      else if (e.key === "Backspace" && !input.value && state[kind].length) { state[kind].pop(); renderChips(); updateMoreCount(); renderResults(); render(); }
    });
    // pointerdown keeps focus in the input, so several ingredients can be added in a row
    box.addEventListener("pointerdown", (e) => { if (e.target.closest("[data-pick]")) e.preventDefault(); });
    box.addEventListener("click", (e) => { const el = e.target.closest("[data-pick]"); if (el) pick(el.dataset.pick); });
    box.addEventListener("mousemove", (e) => {
      const row = e.target.closest(".sg-row"); if (!row) return;
      const rows = [...box.querySelectorAll(".sg-row")]; const i = rows.indexOf(row);
      if (i !== st.active) setActive(i);
    });
  }

  function updateMoreCount() {
    const f = readFilters();
    const n = state.exc.length + state.allergies.size + (f.maxbuy !== "" ? 1 : 0) + (f.veg ? 1 : 0) + (f.vegan ? 1 : 0) + (f.gf ? 1 : 0) + (f.region ? 1 : 0) + (f.maxtime ? 1 : 0) + (f.level ? 1 : 0) + (f.maxcost < 6 ? 1 : 0);
    const el = $("#more-count");
    el.hidden = !n; el.textContent = n;
  }

  function readFilters() {
    return {
      q: $("#q").value.trim().toLowerCase(),
      match: $("#match-any").checked ? "any" : "all",
      veg: $("#diet-veg").checked, vegan: $("#diet-vegan").checked, gf: $("#diet-gf").checked,
      region: $("#region").value, maxtime: +$("#maxtime").value || 0, level: $("#level").value,
      maxcost: +$("#maxcost").value, sort: $("#sort").value, maxbuy: $("#maxbuy").value
    };
  }

  function searchText(r) {
    if (!r._text) {
      const c = COUNTRIES[r.country];
      r._text = [r.name, r.desc, c.name, c.region, ...r.ing.map(([id]) => PRICES[id].n)].join(" ").toLowerCase();
    }
    return r._text;
  }

  function filtered() {
    const f = readFilters();
    const terms = f.q.split(/\s+/).filter(Boolean);
    const out = [];
    RECIPES.forEach((r) => {
      const d = dietOf(r);
      if (f.vegan && !d.vegan) return;
      if (f.veg && !d.vegetarian) return;
      if (f.gf && !d.glutenfree) return;
      if (f.region && COUNTRIES[r.country].region !== f.region) return;
      if (f.maxtime && r.time > f.maxtime) return;
      if (f.level && r.level !== f.level) return;
      const cost = perServing(r);
      if (f.maxcost < 6 && cost > f.maxcost) return;
      const ids = new Set(r.ing.map(([id]) => id));
      if (state.exc.some((id) => ids.has(id))) return;
      if (state.allergies.size && allergensOf(r).some((a) => state.allergies.has(a))) return;
      const buy = toBuy(r);
      if (f.maxbuy !== "" && buy > +f.maxbuy) return;
      const matched = state.inc.filter((id) => ids.has(id)).length;
      if (state.inc.length) {
        if (f.match === "all" && matched < state.inc.length) return;
        if (f.match === "any" && matched === 0) return;
      }
      if (terms.length) { const t = searchText(r); if (!terms.every((w) => t.includes(w))) return; }
      out.push({ r, cost, matched, buy });
    });
    const sorters = {
      cost: (a, b) => a.cost - b.cost,
      time: (a, b) => a.r.time - b.r.time || a.cost - b.cost,
      match: (a, b) => b.matched - a.matched || a.r.ing.length - b.r.ing.length || a.cost - b.cost,
      name: (a, b) => a.r.name.localeCompare(b.r.name),
      tobuy: (a, b) => a.buy - b.buy || a.cost - b.cost,
      kcal: (a, b) => kcalOf(a.r) - kcalOf(b.r),
      country: (a, b) => COUNTRIES[a.r.country].name.localeCompare(COUNTRIES[b.r.country].name) || a.r.name.localeCompare(b.r.name)
    };
    out.sort(sorters[f.sort] || sorters.cost);
    return out;
  }

  function renderResults() {
    const f = readFilters();
    $("#maxcost-out").textContent = f.maxcost >= 6 ? "Any" : money(f.maxcost);
    const list = filtered();
    const n = list.length;
    $("#results-count").innerHTML = `<b>${n}</b> of ${RECIPES.length} recipes`;
    if (!n) {
      $("#results").innerHTML = `<div class="empty"><h3>No recipes match</h3><p>Try removing an ingredient, raising the cost limit or switching to “Any of them”.</p><button type="button" class="btn-ghost" data-action="clear">Clear all filters</button></div>`;
      return;
    }
    $("#results").innerHTML = list.map(({ r, matched, buy }) => {
      let extra = "";
      if (state.inc.length) {
        const missing = r.ing.length - matched;
        const yours = state.inc.length === 1 ? "your ingredient" : `${matched} of your ${state.inc.length} ingredients`;
        extra = `<span class="r-match">Uses ${yours} · ${missing} more to buy</span>`;
      } else if (state.pantry.size) {
        extra = `<span class="r-match">${buy === 0 ? "You have everything" : `You have ${r.ing.length - buy} of ${r.ing.length} · ${buy} to buy`}</span>`;
      }
      return card(r, extra);
    }).join("");
  }

  function clearFilters() {
    $("#filters").reset();
    $("#q").value = "";
    state.inc = []; state.exc = [];
    state.allergies.clear(); store.set("allergies", []); renderAllergyChips();
    $("#sort").value = "cost";
    renderChips(); updateMoreCount(); renderResults();
  }

  // ---------- saved ----------
  function renderSaved() {
    const list = RECIPES.filter((r) => state.saved.has(r.id));
    $("#saved-count").textContent = state.saved.size;
    if (!list.length) {
      renderCooked();
      $("#saved-summary").innerHTML = "";
      $("#saved-grid").innerHTML = `<div class="empty"><h3>Nothing saved yet</h3><p>Open any recipe and press “Save recipe” to keep it here for later.</p><a class="btn" href="#find">Browse recipes</a></div>`;
      return;
    }
    renderCooked();
    const week = list.reduce((s, r) => s + costOf(r, r.serves, state.includeStaples).used, 0);
    $("#saved-summary").innerHTML = `<span><b>${list.length}</b> recipe${list.length > 1 ? "s" : ""} saved</span><span>Cooking all of them costs about <b>${money(week)}</b> in Germany</span>`;
    $("#saved-grid").innerHTML = list.map((r) => card(r)).join("");
  }
  function renderCooked() {
    const cooked = RECIPES.filter((r) => state.notes[r.id] && ((state.notes[r.id].cooked || []).length || state.notes[r.id].rating))
      .sort((a, b) => ((state.notes[b.id].cooked || []).slice(-1)[0] || "").localeCompare((state.notes[a.id].cooked || []).slice(-1)[0] || ""));
    $("#cooked-block").hidden = !cooked.length;
    $("#cooked-grid").innerHTML = cooked.map((r) => card(r)).join("");
  }
  function toggleSave(id) {
    if (state.saved.has(id)) { state.saved.delete(id); toast("Removed from saved"); }
    else { state.saved.add(id); toast("Saved"); }
    store.set("saved", [...state.saved]);
    $("#saved-count").textContent = state.saved.size;
    document.querySelectorAll(`[data-recipe="${id}"]`).forEach((el) => el.classList.toggle("is-saved", state.saved.has(id)));
    if (state.view === "saved") renderSaved();
  }

  // ---------- prices ----------
  function renderPrices() {
    const q = $("#price-q").value.trim().toLowerCase();
    const usage = {};
    RECIPES.forEach((r) => r.ing.forEach(([id]) => { usage[id] = (usage[id] || 0) + 1; }));
    const groups = {};
    Object.entries(PRICES).forEach(([id, p]) => {
      if (q && !(p.n.toLowerCase().includes(q) || p.c.toLowerCase().includes(q))) return;
      (groups[p.c] = groups[p.c] || []).push(id);
    });
    const cats = Object.keys(groups).sort();
    if (!cats.length) { $("#price-body").innerHTML = `<tr><td colspan="6">No ingredient matches “${esc(q)}”.</td></tr>`; return; }
    $("#price-body").innerHTML = cats.map((cat) => `<tr class="cat"><td colspan="6">${esc(cat)}</td></tr>` +
      groups[cat].sort((a, b) => PRICES[a].n.localeCompare(PRICES[b].n)).map((id) => {
        const p = PRICES[id]; const changed = state.priceOverrides[id] != null;
        return `<tr>
          <td>${esc(p.n)}${p.s ? '<span class="staple">pantry staple</span>' : ""}</td>
          <td>${esc(p.c)}</td>
          <td class="num">${esc(packLabel(id))}</td>
          <td class="num"><input type="number" min="0" step="0.01" inputmode="decimal" id="price-${id}" data-price="${id}" value="${priceOf(id).toFixed(2)}" class="${changed ? "changed" : ""}" aria-label="Price for ${esc(p.n)}, ${esc(packLabel(id))}"></td>
          <td class="num" data-unit="${id}">${unitPrice(id)}</td>
          <td class="num">${usage[id] || 0}</td>
        </tr>`;
      }).join("")).join("");
  }
  function onPriceChange(input) {
    const id = input.dataset.price;
    const v = parseFloat(input.value.replace(",", "."));
    if (!isFinite(v) || v < 0) return;
    if (Math.abs(v - basePrice(id)) < 0.001) delete state.priceOverrides[id];
    else state.priceOverrides[id] = v;
    store.set("prices", state.priceOverrides);
    input.classList.toggle("changed", state.priceOverrides[id] != null);
    const cell = document.querySelector(`[data-unit="${id}"]`); if (cell) cell.textContent = unitPrice(id);
    pricesChanged();
  }
  function pricesChanged() {
    renderCountryPanel();
    globeCtl.refresh();
    if (state.view === "find") renderResults();
    if (state.view === "saved") renderSaved();
    if (state.view === "plan") renderPlan();
    if (state.view === "prices") renderPrices();
    if (state.openRecipe) renderRecipe();
  }
  function setPriceLevel(level) {
    if (!LEVELS[level]) return;
    state.priceLevel = level; store.set("priceLevel", level);
    $("#price-level").value = level;
    pricesChanged();
    toast("Prices now for: " + LEVELS[level].short);
  }

  // ---------- recipe dialog ----------
  const dialog = $("#recipe-dialog");
  function openRecipe(id, fromRoute) {
    const r = byId[id]; if (!r) return;
    if (state.openRecipe !== id) { state.servings = r.serves; state.planPicker = false; }
    state.openRecipe = id;
    renderRecipe();
    if (!dialog.open) { try { dialog.showModal(); } catch (e) { dialog.setAttribute("open", ""); } }
    dialog.scrollTop = 0;
    const inner = $("#recipe-body"); inner.setAttribute("tabindex", "-1"); inner.focus({ preventScroll: true });
    if (!fromRoute) setHash("recipe-" + id);
  }
  function closeDialog(fromRoute) {
    if (!state.openRecipe) return;
    state.openRecipe = null;
    if (dialog.open) dialog.close();
    if (!fromRoute) {
      const back = state.view === "globe" && state.country ? "country-" + state.country : state.view;
      setHash(back);
    }
  }

  function renderRecipe() {
    const r = byId[state.openRecipe];
    const c = COUNTRIES[r.country];
    const cost = costOf(r, state.servings, state.includeStaples);
    const saved = state.saved.has(r.id);
    const skipped = cost.lines.filter((l) => !l.counted);
    const ph = PHOTOS[r.id];
    const planned = state.plan.some((x) => x.id === r.id);
    const note = state.notes[r.id] || {};
    const cookedN = (note.cooked || []).length;
    const lastCooked = cookedN ? new Date(note.cooked[cookedN - 1]).toLocaleDateString("en-GB", { day: "numeric", month: "short" }) : "";
    $("#recipe-body").innerHTML = `
      ${ph ? `<figure class="d-photo">
        <img src="${esc(ph.src)}" alt="${esc(r.name)}" onerror="this.closest('figure').remove()">
        <figcaption>Photo: <a href="${esc(ph.source)}" target="_blank" rel="noopener">${esc(ph.author)}</a>, ${ph.licenseUrl ? `<a href="${esc(ph.licenseUrl)}" target="_blank" rel="noopener">${esc(ph.license)}</a>` : esc(ph.license)}, via Wikimedia Commons</figcaption>
      </figure>` : ""}
      <div class="d-top">
        <div class="d-head">
          <div class="d-where"><button type="button" data-country-link="${r.country}">${esc(c.name)}</button> · ${esc(c.region)}</div>
          <h2 class="d-title" id="r-title">${esc(r.name)}</h2>
          <p class="d-desc">${esc(r.desc)}</p>
        </div>
        <button type="button" class="d-close" data-action="close" aria-label="Close recipe">×</button>
      </div>
      <div class="d-meta">
        <span class="tag">${r.time} min</span><span class="tag">${r.level}</span><span class="tag" title="Estimate">≈ ${kcalOf(r)} kcal per serving</span>${dietTags(r)}${noteTags(r)}
      </div>
      ${allergensOf(r).length ? `<p class="d-contains"><b>Contains:</b> ${allergensOf(r).map((a) => ALLERGENS[a].name).join(", ")}</p>` : ""}
      <div class="d-actions">
        <div class="stepper" role="group" aria-label="Servings">
          <button type="button" data-serv="-1" aria-label="Fewer servings">−</button>
          <span aria-live="polite">${cost.servings} serving${cost.servings > 1 ? "s" : ""}</span>
          <button type="button" data-serv="1" aria-label="More servings">+</button>
        </div>
        <button type="button" class="btn btn-video" data-action="video"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5.5v13l11-6.5z" fill="currentColor"/></svg>Watch how to cook it</button>
        <button type="button" class="btn btn-cook" data-action="cook"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 11h16v2a7 7 0 0 1-7 7h-2a7 7 0 0 1-7-7z M2 11h20 M8 7c0-1.5 1-2 1-3.5 M12 7c0-1.5 1-2 1-3.5 M16 7c0-1.5 1-2 1-3.5" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>Cooking mode</button>
        <button type="button" class="btn btn-plan${planned ? " saved" : ""}" data-action="plan-pick" aria-expanded="${state.planPicker}">${planned ? "✓ In week plan" : "+ Add to week plan"}</button>
        <button type="button" class="btn${saved ? " saved" : ""}" data-save="${r.id}">${saved ? "★ Saved" : "☆ Save recipe"}</button>
      </div>
      ${state.planPicker ? `<div class="day-picker" role="group" aria-label="Choose a day"><span>Add ${cost.servings} serving${cost.servings > 1 ? "s" : ""} to:</span>${DAYS.map((d, i) => `<button type="button" class="day-chip${state.plan.some((x) => x.id === r.id && x.day === i) ? " on" : ""}" data-plan-day="${i}">${d.slice(0, 3)}</button>`).join("")}</div>` : ""}
      <div class="d-body">
        <div class="d-col" style="display:flex;flex-direction:column;gap:28px;min-width:0">
          <section class="d-section">
            <h2>Ingredients</h2>
            <ul class="ing-list">
              ${cost.lines.map((l) => `<li class="${l.have ? "have" : ""}"><span class="qty">${fmtQty(l.q, l.u)}</span><span>${esc(l.name)}${l.note ? ` <span class="note">(${esc(l.note)})</span>` : ""}</span><button type="button" class="have-btn" data-have="${l.id}" aria-pressed="${l.have}" title="${l.have ? "In your pantry" : "Mark as in your pantry"}">${l.have ? "✓ Have" : "Have it?"}</button></li>`).join("")}
            </ul>
          </section>
          <section class="d-section">
            <h2>Method</h2>
            <ol class="steps">${r.steps.map((s) => `<li><span>${esc(s)}</span></li>`).join("")}</ol>
          </section>
          <section class="d-section notes">
            <h2>Your notes</h2>
            <div class="notes-row">
              <div class="stars" role="radiogroup" aria-label="Your rating">${[1, 2, 3, 4, 5].map((n) => `<button type="button" class="star-btn${note.rating >= n ? " on" : ""}" data-rate="${n}" role="radio" aria-checked="${note.rating === n}" aria-label="${n} star${n > 1 ? "s" : ""}">★</button>`).join("")}</div>
              <button type="button" class="btn-ghost" data-action="cooked">I cooked this</button>
              <span class="cooked-info">${cookedN ? `Cooked ${cookedN}× · last on ${esc(lastCooked)}` : "Not cooked yet"}${cookedN ? ` <button type="button" class="link-btn" data-action="uncook">undo</button>` : ""}</span>
            </div>
            <textarea id="note-text" class="note-text" rows="3" placeholder="What would you change next time? Where did you buy the ingredients?" aria-label="Your notes on this recipe">${esc(note.note || "")}</textarea>
          </section>
        </div>
        <aside class="receipt" aria-label="Cost in Germany">
          <div class="rc-head"><strong>COST IN GERMANY</strong><span>${cost.servings} servings · ${esc(LEVELS[state.priceLevel].short.toLowerCase())} prices</span></div>
          <label class="rc-level"><span>Shop at</span><select id="rc-level">${Object.entries(LEVELS).map(([k, v]) => `<option value="${k}"${k === state.priceLevel ? " selected" : ""}>${esc(v.name)}</option>`).join("")}</select></label>
          ${cost.lines.map((l) => `
            <div class="rc-line${l.counted ? "" : " dim"}">
              <span>${esc(l.name)}</span><span>${money(l.usedCost)}</span>
              <span class="rc-sub">${l.have ? "in your pantry" : `${l.packs} × ${esc(packLabel(l.id))} @ ${money(priceOf(l.id))}${l.staple ? " · staple" : ""}`}</span>
            </div>`).join("")}
          <div class="rc-rule"></div>
          <div class="rc-total"><span>Ingredients used</span><span>${money(cost.used)}</span></div>
          <div class="rc-total big"><span>Per serving</span><span>${money(cost.perServing)}</span></div>
          <div class="rc-rule"></div>
          <div class="rc-total"><span>At the till (whole packs)</span><span>${money(cost.till)}</span></div>
          <div class="rc-note">“At the till” is what you pay buying full packs. Leftovers go back in the cupboard.${skipped.length ? ` ${skipped.length} item${skipped.length > 1 ? "s" : ""} not counted (${cost.lines.some((l) => l.have) ? "in your pantry" : ""}${cost.lines.some((l) => l.have) && cost.lines.some((l) => !l.have && l.staple && !l.counted) ? " or " : ""}${cost.lines.some((l) => !l.have && l.staple && !l.counted) ? "pantry staples" : ""}).` : ""}</div>
          <label class="rc-toggle"><input type="checkbox" id="staples-toggle" ${state.includeStaples ? "checked" : ""}> Count pantry staples (salt, oil, spices)</label>
          <div class="rc-actions">
            <button type="button" class="btn-ghost" data-action="copy-list">Copy shopping list</button>
            <a class="btn-ghost" href="#prices" style="text-decoration:none;color:inherit">Edit prices</a>
          </div>
        </aside>
      </div>`;
  }

  function cookMode() {
    const r = byId[state.openRecipe];
    if (!r || !window.CookMode) return;
    const cost = costOf(r, state.servings, true);
    window.CookMode.open({ name: r.name, steps: r.steps, ingredients: cost.lines.map((l) => ({ name: l.name, qty: fmtQty(l.q, l.u), note: l.note })) });
  }

  // ---------- notes, ratings, cooked ----------
  function noteFor(id) { return (state.notes[id] = state.notes[id] || {}); }
  function saveNotes() {
    Object.keys(state.notes).forEach((k) => { const n = state.notes[k]; if (!n.rating && !n.note && !(n.cooked || []).length) delete state.notes[k]; });
    store.set("notes", state.notes);
  }

  // ---------- pantry ----------
  function togglePantry(id, on) {
    const has = state.pantry.has(id);
    if (on === undefined) on = !has;
    if (on) state.pantry.add(id); else state.pantry.delete(id);
    store.set("pantry", [...state.pantry]);
    updateCounts();
  }
  function renderPantry() {
    const q = $("#pantry-q").value.trim().toLowerCase();
    const groups = {};
    ingIndex.forEach((x) => {
      if (q && !x.hay.includes(q)) return;
      (groups[x.cat] = groups[x.cat] || []).push(x);
    });
    const order = Object.keys(groups).sort();
    $("#pantry-summary").innerHTML = state.pantry.size
      ? (() => { const n0 = RECIPES.filter((r) => toBuy(r) === 0).length, n2 = RECIPES.filter((r) => toBuy(r) <= 2).length;
          return `You have <b>${state.pantry.size}</b> ingredient${state.pantry.size > 1 ? "s" : ""}. <b>${n0}</b> recipe${n0 === 1 ? " needs" : "s need"} nothing else, and <b>${n2}</b> need 2 things or fewer. <a href="#find" data-action="show-makeable">Show them</a>`; })()
      : "Nothing ticked yet. Start with “Add the basics” for salt, oil, spices, rice and pasta.";
    $("#pantry-list").innerHTML = order.length ? order.map((cat) => `<section class="pantry-group"><h3>${esc(cat)}</h3><div class="pantry-chips">${
      groups[cat].sort((a, b) => a.name.localeCompare(b.name)).map((x) => `<button type="button" class="p-chip${state.pantry.has(x.id) ? " on" : ""}" data-pantry="${x.id}" aria-pressed="${state.pantry.has(x.id)}">${esc(x.name)}</button>`).join("")
    }</div></section>`).join("") : `<p class="empty-line">No ingredient matches “${esc(q)}”.</p>`;
  }

  // ---------- week plan + combined shopping list ----------
  function savePlan() { store.set("plan", state.plan); updateCounts(); }
  function addToPlan(id, day, servings) {
    const existing = state.plan.find((x) => x.id === id && x.day === day);
    if (existing) { state.plan = state.plan.filter((x) => x !== existing); toast("Removed from " + DAYS[day]); }
    else { state.plan.push({ id, day, servings }); toast("Added to " + DAYS[day]); }
    savePlan();
  }
  function combinedShopping() {
    const need = {}; // id -> total qty
    let separateTill = 0;
    state.plan.forEach((item) => {
      const r = byId[item.id]; if (!r) return;
      const scale = item.servings / r.serves;
      r.ing.forEach(([id, qty]) => { need[id] = (need[id] || 0) + qty * scale; });
      separateTill += costOf(r, item.servings, state.includeStaples).till;
    });
    const lines = Object.entries(need).map(([id, q]) => {
      const p = PRICES[id];
      const packs = Math.max(1, Math.ceil(q / p.q - 1e-6));
      const have = state.pantry.has(id);
      const counted = !have && (state.includeStaples || !p.s);
      return { id, name: p.n, cat: p.c, q, u: p.u, packs, cost: packs * priceOf(id), used: (q / p.q) * priceOf(id), have, staple: !!p.s, counted };
    });
    const till = lines.filter((l) => l.counted).reduce((s, l) => s + l.cost, 0);
    const used = lines.filter((l) => l.counted).reduce((s, l) => s + l.used, 0);
    return { lines, till, used, separateTill };
  }
  function renderPlan() {
    const shop = combinedShopping();
    const servings = state.plan.reduce((s, x) => s + x.servings, 0);
    const kcalDay = state.plan.length ? Math.round(state.plan.reduce((s, x) => s + kcalOf(byId[x.id]) * x.servings, 0) / Math.max(1, servings) / 10) * 10 : 0;
    const saved = shop.separateTill - shop.till;
    $("#plan-summary").innerHTML = state.plan.length ? `
      <div class="ps-item"><span>Dishes</span><b>${state.plan.length}</b></div>
      <div class="ps-item"><span>Servings</span><b>${servings}</b></div>
      <div class="ps-item"><span>Shopping total</span><b>${money(shop.till)}</b></div>
      <div class="ps-item"><span>Per serving</span><b>${money(shop.used / Math.max(1, servings))}</b></div>
      <div class="ps-item"><span>Average</span><b>≈ ${kcalDay} kcal</b></div>
      ${saved > 0.5 ? `<p class="ps-save">Shopping for the whole week at once saves about <b>${money(saved)}</b>, because packs are shared between dishes.</p>` : ""}` :
      `<p class="ps-empty">Your week is empty. Open any recipe and press <b>+ Add to week plan</b>, or let us <button type="button" class="link-btn" data-action="surprise-plan">fill the week for you</button>.</p>`;
    $("#week").innerHTML = DAYS.map((d, i) => {
      const items = state.plan.map((x, k) => ({ ...x, k })).filter((x) => x.day === i);
      return `<section class="day"><h3>${d}</h3>${items.length ? items.map((x) => {
        const r = byId[x.id]; const ph = PHOTOS[r.id];
        return `<div class="plan-item">
          <button type="button" class="pi-open" data-recipe="${r.id}">${ph ? `<img src="${esc(ph.src)}" alt="" loading="lazy">` : `<span class="pi-ph"></span>`}<span class="pi-name">${esc(r.name)}<small>${esc(COUNTRIES[r.country].name)} · ${money(costOf(r, x.servings, state.includeStaples).used)}</small></span></button>
          <div class="pi-ctl"><button type="button" data-plan-serv="${x.k}" data-d="-1" aria-label="Fewer servings">−</button><span>${x.servings}</span><button type="button" data-plan-serv="${x.k}" data-d="1" aria-label="More servings">+</button><button type="button" class="pi-del" data-plan-del="${x.k}" aria-label="Remove ${esc(r.name)}">×</button></div>
        </div>`;
      }).join("") : `<p class="day-empty">Nothing planned</p>`}</section>`;
    }).join("");
    // shopping list grouped by shelf
    if (!shop.lines.length) { $("#shop-list").innerHTML = `<p class="empty-line">Add dishes to your week to build the shopping list.</p>`; return; }
    const buy = shop.lines.filter((l) => l.counted);
    const have = shop.lines.filter((l) => !l.counted);
    const groups = {};
    buy.forEach((l) => (groups[l.cat] = groups[l.cat] || []).push(l));
    const ticked = buy.filter((l) => state.shopTicked.has(l.id)).length;
    $("#shop-list").innerHTML = `<p class="shop-progress">${ticked} of ${buy.length} items in the basket · ${money(buy.filter((l) => !state.shopTicked.has(l.id)).reduce((s, l) => s + l.cost, 0))} left to buy</p>` +
      Object.keys(groups).sort().map((cat) => `<div class="shop-group"><h3>${esc(cat)}</h3><ul>${groups[cat].sort((a, b) => a.name.localeCompare(b.name)).map((l) => `
        <li class="${state.shopTicked.has(l.id) ? "ticked" : ""}"><label><input type="checkbox" data-tick="${l.id}" ${state.shopTicked.has(l.id) ? "checked" : ""}><span class="sh-name">${esc(l.name)}<small>${fmtQty(l.q, l.u)} needed · ${l.packs} × ${esc(packLabel(l.id))}</small></span><span class="sh-cost">${money(l.cost)}</span></label></li>`).join("")}</ul></div>`).join("") +
      (have.length ? `<details class="shop-have"><summary>${have.length} item${have.length > 1 ? "s" : ""} you already have or left out</summary><p>${have.map((l) => esc(l.name)).join(", ")}</p></details>` : "");
  }
  function shopText() {
    const shop = combinedShopping();
    const buy = shop.lines.filter((l) => l.counted).sort((a, b) => a.cat.localeCompare(b.cat) || a.name.localeCompare(b.name));
    let cat = "", out = "World Pantry shopping list (" + LEVELS[state.priceLevel].short + " prices)\n";
    buy.forEach((l) => { if (l.cat !== cat) { cat = l.cat; out += "\n" + cat.toUpperCase() + "\n"; } out += `[ ] ${l.name}: ${l.packs} × ${packLabel(l.id)} (${money(l.cost)})\n`; });
    return out + `\nTotal: ${money(shop.till)}\nDishes: ${state.plan.map((x) => DAYS[x.day].slice(0, 3) + " " + byId[x.id].name).join(", ")}`;
  }
  function copyText(text, okMsg) {
    const fallback = () => {
      const ta = document.createElement("textarea");
      ta.value = text; ta.setAttribute("readonly", ""); ta.style.position = "fixed"; ta.style.opacity = "0";
      document.body.appendChild(ta); ta.select();
      let ok = false; try { ok = document.execCommand("copy"); } catch (e) { /* ignore */ }
      ta.remove();
      toast(ok ? okMsg : "Copy is blocked here. Select the list text instead.");
    };
    if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(text).then(() => toast(okMsg), fallback);
    else fallback();
  }
  function fillWeek() {
    const used = new Set(state.plan.map((x) => x.id));
    const pool = RECIPES.filter((r) => !used.has(r.id) && !(state.allergies.size && allergensOf(r).some((a) => state.allergies.has(a))) && r.time <= 90);
    let added = 0;
    DAYS.forEach((d, i) => {
      if (state.plan.some((x) => x.day === i) || !pool.length) return;
      const r = pool.splice(Math.floor(Math.random() * pool.length), 1)[0];
      state.plan.push({ id: r.id, day: i, servings: r.serves > 6 ? 4 : r.serves }); added++;
    });
    savePlan(); renderPlan();
    toast(added ? `Added ${added} dish${added > 1 ? "es" : ""} to empty days` : "Every day already has a dish");
  }

  // ---------- surprise me ----------
  function surprise() {
    const pool = RECIPES.filter((r) => !(state.allergies.size && allergensOf(r).some((a) => state.allergies.has(a))));
    const r = pool[Math.floor(Math.random() * pool.length)];
    if (!r) return;
    showView("globe"); selectCountry(r.country);
    setTimeout(() => openRecipe(r.id), window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 100 : 1300);
  }

  function renderAllergyChips() {
    $("#allergy-chips").innerHTML = Object.entries(ALLERGENS).map(([k, a]) =>
      `<button type="button" class="al-chip${state.allergies.has(k) ? " on" : ""}" data-allergy="${k}" aria-pressed="${state.allergies.has(k)}">${state.allergies.has(k) ? "✕ " : ""}${esc(a.name)}</button>`).join("");
  }
  function updateCounts() {
    const pc = $("#plan-count"); pc.hidden = !state.plan.length; pc.textContent = state.plan.length;
    const pa = $("#pantry-count"); pa.hidden = !state.pantry.size; pa.textContent = state.pantry.size;
  }

  function playVideo() {
    const r = byId[state.openRecipe];
    if (!r || !window.RecipePlayer) return;
    const cost = costOf(r, state.servings, true);
    window.RecipePlayer.open({
      name: r.name, desc: r.desc, country: COUNTRIES[r.country].name, time: r.time, serves: cost.servings, steps: r.steps,
      photo: PHOTOS[r.id] ? PHOTOS[r.id].src : null,
      ingredients: cost.lines.map((l) => ({ name: l.name, qty: fmtQty(l.q, l.u) }))
    });
  }

  function shoppingListText() {
    const r = byId[state.openRecipe];
    const cost = costOf(r, state.servings, state.includeStaples);
    const lines = cost.lines.filter((l) => l.counted).map((l) => `- ${l.name}: ${l.packs} × ${packLabel(l.id)} (${money(l.tillCost)})`);
    return `${r.name} (${COUNTRIES[r.country].name}) · ${cost.servings} servings\n${lines.join("\n")}\nTotal at the till: ${money(cost.till)}\nCost of ingredients used: ${money(cost.used)} (${money(cost.perServing)} per serving)`;
  }
  function copyList() {
    const text = shoppingListText();
    const fallback = () => {
      const ta = document.createElement("textarea");
      ta.value = text; ta.setAttribute("readonly", ""); ta.style.position = "fixed"; ta.style.opacity = "0";
      (dialog.open ? dialog : document.body).appendChild(ta); ta.select();
      let ok = false; try { ok = document.execCommand("copy"); } catch (e) { /* ignore */ }
      ta.remove();
      toast(ok ? "Shopping list copied" : "Copy is blocked here. Select the receipt text instead.");
    };
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(() => toast("Shopping list copied"), fallback);
    } else fallback();
  }

  // ---------- events ----------
  document.addEventListener("click", (e) => {
    const t = e.target;
    const rc = t.closest("[data-recipe]");
    if (rc) { openRecipe(rc.dataset.recipe); return; }
    const cc = t.closest("[data-country]");
    if (cc) { selectCountry(cc.dataset.country); return; }
    const cl = t.closest("[data-country-link]");
    if (cl) {
      const id = cl.dataset.countryLink;
      state.openRecipe = null; if (dialog.open) dialog.close();
      showView("globe"); selectCountry(id);
      return;
    }
    const sv = t.closest("[data-save]");
    if (sv) { toggleSave(sv.dataset.save); renderRecipe(); return; }
    const st = t.closest("[data-serv]");
    if (st) { state.servings = Math.min(24, Math.max(1, state.servings + +st.dataset.serv)); renderRecipe(); return; }
    const pd = t.closest("[data-plan-day]");
    if (pd) { addToPlan(state.openRecipe, +pd.dataset.planDay, state.servings); renderRecipe(); return; }
    const hv = t.closest("[data-have]");
    if (hv) { togglePantry(hv.dataset.have); renderRecipe(); pricesChanged(); return; }
    const rt = t.closest("[data-rate]");
    if (rt) { const n = noteFor(state.openRecipe); n.rating = n.rating === +rt.dataset.rate ? 0 : +rt.dataset.rate; saveNotes(); renderRecipe(); return; }
    const pn = t.closest("[data-pantry]");
    if (pn) { togglePantry(pn.dataset.pantry); pn.classList.toggle("on", state.pantry.has(pn.dataset.pantry)); pn.setAttribute("aria-pressed", state.pantry.has(pn.dataset.pantry)); clearTimeout(renderPantry._t); renderPantry._t = setTimeout(renderPantry, 400); return; }
    const al = t.closest("[data-allergy]");
    if (al) { const k = al.dataset.allergy; if (state.allergies.has(k)) state.allergies.delete(k); else state.allergies.add(k); store.set("allergies", [...state.allergies]); renderAllergyChips(); updateMoreCount(); renderResults(); return; }
    const ps = t.closest("[data-plan-serv]");
    if (ps) { const x = state.plan[+ps.dataset.planServ]; if (x) { x.servings = Math.min(24, Math.max(1, x.servings + +ps.dataset.d)); savePlan(); renderPlan(); } return; }
    const pdel = t.closest("[data-plan-del]");
    if (pdel) { state.plan.splice(+pdel.dataset.planDel, 1); savePlan(); renderPlan(); return; }
    const ri = t.closest("[data-remove-inc]");
    if (ri) { state.inc = state.inc.filter((x) => x !== ri.dataset.removeInc); renderChips(); renderResults(); return; }
    const re = t.closest("[data-remove-exc]");
    if (re) { state.exc = state.exc.filter((x) => x !== re.dataset.removeExc); renderChips(); renderResults(); return; }
    const a = t.closest("[data-action]");
    if (!a) return;
    const act = a.dataset.action;
    if (act === "close") closeDialog();
    else if (act === "all-countries") { state.country = null; renderCountryPanel(); globeCtl.reset(); setHash("globe"); }
    else if (act === "clear") clearFilters();
    else if (act === "copy-list") copyList();
    else if (act === "video") playVideo();
    else if (act === "cook") cookMode();
    else if (act === "plan-pick") { state.planPicker = !state.planPicker; renderRecipe(); }
    else if (act === "cooked") { const n = noteFor(state.openRecipe); (n.cooked = n.cooked || []).push(new Date().toISOString()); saveNotes(); renderRecipe(); toast("Nice! Marked as cooked"); }
    else if (act === "uncook") { const n = noteFor(state.openRecipe); (n.cooked || []).pop(); saveNotes(); renderRecipe(); }
    else if (act === "surprise") surprise();
    else if (act === "surprise-plan") fillWeek();
    else if (act === "clear-plan") {
      if (!state.plan.length) return;
      if (a.dataset.confirm !== "1") { a.dataset.confirm = "1"; a.textContent = "Tap again to clear"; setTimeout(() => { a.dataset.confirm = ""; a.textContent = "Clear week"; }, 3000); return; }
      state.plan = []; state.shopTicked.clear(); store.set("shopTicked", []); savePlan(); renderPlan(); a.dataset.confirm = ""; a.textContent = "Clear week"; toast("Week cleared");
    }
    else if (act === "copy-shop") { if (state.plan.length) copyText(shopText(), "Shopping list copied"); else toast("Add dishes to your week first"); }
    else if (act === "untick-shop") { state.shopTicked.clear(); store.set("shopTicked", []); renderPlan(); }
    else if (act === "pantry-basics") { BASICS.forEach((id) => { if (PRICES[id]) state.pantry.add(id); }); store.set("pantry", [...state.pantry]); updateCounts(); renderPantry(); pricesChanged(); toast("Added " + BASICS.length + " basics"); }
    else if (act === "pantry-clear") {
      if (!state.pantry.size) return;
      if (a.dataset.confirm !== "1") { a.dataset.confirm = "1"; a.textContent = "Tap again to clear"; setTimeout(() => { a.dataset.confirm = ""; a.textContent = "Clear pantry"; }, 3000); return; }
      state.pantry.clear(); store.set("pantry", []); updateCounts(); renderPantry(); pricesChanged(); a.dataset.confirm = ""; a.textContent = "Clear pantry";
    }
    else if (act === "show-makeable") { e.preventDefault(); $("#sort").value = "tobuy"; setHash("find"); showView("find"); }
  });

  dialog.addEventListener("click", (e) => { if (e.target === dialog) closeDialog(); });
  dialog.addEventListener("cancel", (e) => { e.preventDefault(); closeDialog(); });
  dialog.addEventListener("input", (e) => {
    if (e.target.id === "note-text") {
      const id = state.openRecipe, v = e.target.value;
      clearTimeout(dialog._nt); dialog._nt = setTimeout(() => { noteFor(id).note = v; saveNotes(); }, 400);
    }
  });
  dialog.addEventListener("change", (e) => {
    if (e.target.id === "rc-level") { setPriceLevel(e.target.value); return; }
    if (e.target.id === "staples-toggle") {
      state.includeStaples = e.target.checked;
      store.set("staples", state.includeStaples);
      renderRecipe();
      pricesChanged();
      if (state.view === "find") renderResults();
      if (state.view === "saved") renderSaved();
    }
  });
  dialog.addEventListener("click", (e) => {
    const link = e.target.closest('a[href="#prices"]');
    if (link) { state.openRecipe = null; dialog.close(); }
  });

  setupPicker("inc");
  setupPicker("exc");
  document.querySelectorAll(".chip-input").forEach((el) => el.addEventListener("click", (e) => {
    if (!e.target.closest("button")) el.querySelector("input").focus();
  }));
  $("#more-toggle").addEventListener("click", (e) => {
    const open = $("#more-filters").classList.toggle("open");
    e.currentTarget.setAttribute("aria-expanded", open ? "true" : "false");
  });

  $("#filters").addEventListener("submit", (e) => e.preventDefault());
  $("#filters").addEventListener("input", (e) => { if (!e.target.matches("#inc-input, #exc-input")) { updateMoreCount(); renderResults(); } });
  $("#filters").addEventListener("change", (e) => { if (!e.target.matches("#inc-input, #exc-input")) { updateMoreCount(); renderResults(); } });
  $("#clear-filters").addEventListener("click", clearFilters);
  $("#q").addEventListener("input", () => {
    if (state.view !== "find") { setHash("find"); showView("find"); }
    renderResults();
  });
  $("#sort").addEventListener("change", renderResults);

  $("#price-q").addEventListener("input", renderPrices);
  $("#price-level").innerHTML = Object.entries(LEVELS).map(([k, v]) => `<option value="${k}">${esc(v.name)}</option>`).join("");
  $("#price-level").value = state.priceLevel;
  $("#price-level").addEventListener("change", (e) => setPriceLevel(e.target.value));
  $("#pantry-q").addEventListener("input", renderPantry);
  $("#shop-list").addEventListener("change", (e) => {
    const id = e.target.dataset.tick; if (!id) return;
    if (e.target.checked) state.shopTicked.add(id); else state.shopTicked.delete(id);
    store.set("shopTicked", [...state.shopTicked]); renderPlan();
  });
  $("#price-body").addEventListener("change", (e) => { if (e.target.matches("[data-price]")) onPriceChange(e.target); });
  $("#price-body").addEventListener("keydown", (e) => { if (e.key === "Enter" && e.target.matches("[data-price]")) e.target.blur(); });
  $("#price-reset").addEventListener("click", (e) => {
    const btn = e.currentTarget;
    if (!Object.keys(state.priceOverrides).length) { toast("All prices are already the defaults"); return; }
    if (btn.dataset.confirm !== "1") {
      btn.dataset.confirm = "1"; btn.textContent = "Click again to reset";
      setTimeout(() => { btn.dataset.confirm = ""; btn.textContent = "Reset all prices"; }, 3000);
      return;
    }
    btn.dataset.confirm = ""; btn.textContent = "Reset all prices";
    state.priceOverrides = {}; store.set("prices", {});
    renderPrices(); pricesChanged(); toast("Prices reset to defaults");
  });

  window.addEventListener("hashchange", route);

  // ---------- init ----------
  const regions = [...new Set(Object.values(COUNTRIES).map((c) => c.region))];
  $("#region").innerHTML += ["Europe", "Middle East", "Africa", "Asia", "Americas", "Oceania"].filter((r) => regions.includes(r)).map((r) => `<option>${r}</option>`).join("");
  $("#saved-count").textContent = state.saved.size;
  renderAllergyChips();
  updateCounts();
  updateMoreCount();
  renderCountryPanel();
  route();
})();
