/* World Pantry — globe, recipe search and German cost estimates. No build step. */
(function () {
  "use strict";

  const PRICES = window.PRICES;
  const RECIPES = window.RECIPES;
  const COUNTRIES = window.COUNTRIES;

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
    servings: null
  };

  // ---------- helpers ----------
  const $ = (s, el = document) => el.querySelector(s);
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const eur = new Intl.NumberFormat("en-IE", { style: "currency", currency: "EUR" });
  const money = (n) => eur.format(n);
  const priceOf = (id) => (state.priceOverrides[id] != null ? state.priceOverrides[id] : PRICES[id].p);
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
      const counted = includeStaples || !staple;
      if (counted) { used += usedCost; till += tillCost; }
      return { id, name: p.n, q, u: p.u, note, usedCost, packs, tillCost, staple, counted };
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
    return `<button type="button" class="r-card${saved ? " is-saved" : ""}" data-recipe="${r.id}" aria-label="${esc(r.name)}, ${esc(c.name)}">
      <span class="saved-dot" title="Saved"></span>
      <span class="r-where">${esc(c.name)} · ${esc(c.region)}</span>
      <span class="r-name">${esc(r.name)}</span>
      <span class="r-cost">${money(perServing(r))}<small>per serving</small></span>
      <span class="r-desc">${esc(r.desc)}</span>
      ${extra || ""}
      <span class="r-tags"><span class="tag">${r.time} min</span><span class="tag">${r.level}</span>${dietTags(r)}</span>
    </button>`;
  }

  // ---------- routing ----------
  const VIEWS = ["globe", "find", "saved", "prices"];
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
    const n = state.exc.length + (f.veg ? 1 : 0) + (f.vegan ? 1 : 0) + (f.gf ? 1 : 0) + (f.region ? 1 : 0) + (f.maxtime ? 1 : 0) + (f.level ? 1 : 0) + (f.maxcost < 6 ? 1 : 0);
    const el = $("#more-count");
    el.hidden = !n; el.textContent = n;
  }

  function readFilters() {
    return {
      q: $("#q").value.trim().toLowerCase(),
      match: $("#match-any").checked ? "any" : "all",
      veg: $("#diet-veg").checked, vegan: $("#diet-vegan").checked, gf: $("#diet-gf").checked,
      region: $("#region").value, maxtime: +$("#maxtime").value || 0, level: $("#level").value,
      maxcost: +$("#maxcost").value, sort: $("#sort").value
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
      const matched = state.inc.filter((id) => ids.has(id)).length;
      if (state.inc.length) {
        if (f.match === "all" && matched < state.inc.length) return;
        if (f.match === "any" && matched === 0) return;
      }
      if (terms.length) { const t = searchText(r); if (!terms.every((w) => t.includes(w))) return; }
      out.push({ r, cost, matched });
    });
    const sorters = {
      cost: (a, b) => a.cost - b.cost,
      time: (a, b) => a.r.time - b.r.time || a.cost - b.cost,
      match: (a, b) => b.matched - a.matched || a.r.ing.length - b.r.ing.length || a.cost - b.cost,
      name: (a, b) => a.r.name.localeCompare(b.r.name),
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
    $("#results").innerHTML = list.map(({ r, matched }) => {
      let extra = "";
      if (state.inc.length) {
        const missing = r.ing.length - matched;
        const yours = state.inc.length === 1 ? "your ingredient" : `${matched} of your ${state.inc.length} ingredients`;
        extra = `<span class="r-match">Uses ${yours} · ${missing} more to buy</span>`;
      }
      return card(r, extra);
    }).join("");
  }

  function clearFilters() {
    $("#filters").reset();
    $("#q").value = "";
    state.inc = []; state.exc = [];
    $("#sort").value = "cost";
    renderChips(); updateMoreCount(); renderResults();
  }

  // ---------- saved ----------
  function renderSaved() {
    const list = RECIPES.filter((r) => state.saved.has(r.id));
    $("#saved-count").textContent = state.saved.size;
    if (!list.length) {
      $("#saved-summary").innerHTML = "";
      $("#saved-grid").innerHTML = `<div class="empty"><h3>Nothing saved yet</h3><p>Open any recipe and press “Save recipe” to keep it here for later.</p><a class="btn" href="#find">Browse recipes</a></div>`;
      return;
    }
    const week = list.reduce((s, r) => s + costOf(r, r.serves, state.includeStaples).used, 0);
    $("#saved-summary").innerHTML = `<span><b>${list.length}</b> recipe${list.length > 1 ? "s" : ""} saved</span><span>Cooking all of them costs about <b>${money(week)}</b> in Germany</span>`;
    $("#saved-grid").innerHTML = list.map((r) => card(r)).join("");
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
    if (Math.abs(v - PRICES[id].p) < 0.001) delete state.priceOverrides[id];
    else state.priceOverrides[id] = v;
    store.set("prices", state.priceOverrides);
    input.classList.toggle("changed", state.priceOverrides[id] != null);
    const cell = document.querySelector(`[data-unit="${id}"]`); if (cell) cell.textContent = unitPrice(id);
    pricesChanged();
  }
  function pricesChanged() {
    renderCountryPanel();
    globeCtl.refresh();
  }

  // ---------- recipe dialog ----------
  const dialog = $("#recipe-dialog");
  function openRecipe(id, fromRoute) {
    const r = byId[id]; if (!r) return;
    if (state.openRecipe !== id) state.servings = r.serves;
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
    $("#recipe-body").innerHTML = `
      <div class="d-top">
        <div class="d-head">
          <div class="d-where"><button type="button" data-country-link="${r.country}">${esc(c.name)}</button> · ${esc(c.region)}</div>
          <h2 class="d-title" id="r-title">${esc(r.name)}</h2>
          <p class="d-desc">${esc(r.desc)}</p>
        </div>
        <button type="button" class="d-close" data-action="close" aria-label="Close recipe">×</button>
      </div>
      <div class="d-meta">
        <span class="tag">${r.time} min</span><span class="tag">${r.level}</span>${dietTags(r)}
      </div>
      <div class="d-actions">
        <div class="stepper" role="group" aria-label="Servings">
          <button type="button" data-serv="-1" aria-label="Fewer servings">−</button>
          <span aria-live="polite">${cost.servings} serving${cost.servings > 1 ? "s" : ""}</span>
          <button type="button" data-serv="1" aria-label="More servings">+</button>
        </div>
        <button type="button" class="btn btn-video" data-action="video"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5.5v13l11-6.5z" fill="currentColor"/></svg>Watch how to cook it</button>
        <button type="button" class="btn${saved ? " saved" : ""}" data-save="${r.id}">${saved ? "★ Saved" : "☆ Save recipe"}</button>
      </div>
      <div class="d-body">
        <div class="d-col" style="display:flex;flex-direction:column;gap:28px;min-width:0">
          <section class="d-section">
            <h2>Ingredients</h2>
            <ul class="ing-list">
              ${cost.lines.map((l) => `<li><span class="qty">${fmtQty(l.q, l.u)}</span><span>${esc(l.name)}${l.note ? ` <span class="note">(${esc(l.note)})</span>` : ""}</span></li>`).join("")}
            </ul>
          </section>
          <section class="d-section">
            <h2>Method</h2>
            <ol class="steps">${r.steps.map((s) => `<li><span>${esc(s)}</span></li>`).join("")}</ol>
          </section>
        </div>
        <aside class="receipt" aria-label="Cost in Germany">
          <div class="rc-head"><strong>COST IN GERMANY</strong><span>${cost.servings} servings · estimated supermarket prices</span></div>
          ${cost.lines.map((l) => `
            <div class="rc-line${l.counted ? "" : " dim"}">
              <span>${esc(l.name)}</span><span>${money(l.usedCost)}</span>
              <span class="rc-sub">${l.packs} × ${esc(packLabel(l.id))} @ ${money(priceOf(l.id))}${l.staple ? " · staple" : ""}</span>
            </div>`).join("")}
          <div class="rc-rule"></div>
          <div class="rc-total"><span>Ingredients used</span><span>${money(cost.used)}</span></div>
          <div class="rc-total big"><span>Per serving</span><span>${money(cost.perServing)}</span></div>
          <div class="rc-rule"></div>
          <div class="rc-total"><span>At the till (whole packs)</span><span>${money(cost.till)}</span></div>
          <div class="rc-note">“At the till” is what you pay buying full packs. Leftovers go back in the cupboard.${skipped.length ? ` ${skipped.length} pantry staple${skipped.length > 1 ? "s" : ""} not counted.` : ""}</div>
          <label class="rc-toggle"><input type="checkbox" id="staples-toggle" ${state.includeStaples ? "checked" : ""}> Count pantry staples (salt, oil, spices)</label>
          <div class="rc-actions">
            <button type="button" class="btn-ghost" data-action="copy-list">Copy shopping list</button>
            <a class="btn-ghost" href="#prices" style="text-decoration:none;color:inherit">Edit prices</a>
          </div>
        </aside>
      </div>`;
  }

  function playVideo() {
    const r = byId[state.openRecipe];
    if (!r || !window.RecipePlayer) return;
    const cost = costOf(r, state.servings, true);
    window.RecipePlayer.open({
      name: r.name, desc: r.desc, country: COUNTRIES[r.country].name, time: r.time, serves: cost.servings, steps: r.steps,
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
  });

  dialog.addEventListener("click", (e) => { if (e.target === dialog) closeDialog(); });
  dialog.addEventListener("cancel", (e) => { e.preventDefault(); closeDialog(); });
  dialog.addEventListener("change", (e) => {
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
  renderCountryPanel();
  route();
})();
