/*
 * World Pantry: animated "how to cook it" video player.
 * Every recipe becomes a short animated video: an intro, the ingredients, one
 * illustrated kitchen scene per step (chosen from the step's verbs), and an outro.
 * Captions are always on; narration uses the browser's speech synthesis when available.
 */
(function () {
  "use strict";

  // ---------- step → scene ----------
  const SCENES = [
    ["deepfry", /\bdeep[- ]fr|\bfry (?:them |it |in batches |slowly )?at 1\d0|\bfry at \d|oil at 1\d0/],
    ["steam", /\bsteam(?!ing)/],
    ["blend", /\b(blend|blitz|pound|grind|purée|puree|process)/],
    ["chop", /\b(chop|dice|slice|cut|shred|grate|peel|mince|julienne|halve|quarter|score)/],
    ["dough", /\b(knead|roll|shape|pleat|wrap|stuff|fill each|fill the|press|form|stretch|pat out|pipe|layer|assemble|spread)/],
    ["bake", /\b(bake|roast|oven|blind-bake)/],
    ["grill", /\b(grill|char|barbecue|braai|skewer|thread)/],
    ["boil", /\b(boil|simmer|poach|blanch|braise|stew|cook (?:in|the) .*water)/],
    ["fry", /\b(fry|fried|sear|brown|sauté|saute|stir-fry|toast|caramel|crisp|render|melt|sizzl|soften|sweat)/],
    ["mix", /\b(mix|whisk|stir|beat|combine|toss|fold|season|dissolve|mash|rub|coat|dip|dredge)/],
    ["wait", /\b(marinate|soak|rest|rise|chill|cool|ferment|refrigerate|leave\b|overnight|set aside|freeze)/],
    ["serve", /\b(serve|garnish|top with|top each|sprinkle|drizzle|scatter|dust|finish with|arrange|pour over)/]
  ];
  // actual cooking on heat (or in the blender) beats prep words like "season" or "add"
  const STRONG = { deepfry: 1, steam: 1, blend: 1, bake: 1, grill: 1, boil: 1, fry: 1 };
  function classify(text) {
    const s = text.toLowerCase();
    let best = null, bestAt = Infinity, strong = null, strongAt = Infinity;
    SCENES.forEach(([name, re]) => {
      const m = s.match(re);
      if (!m) return;
      if (m.index < bestAt) { best = name; bestAt = m.index; }
      if (STRONG[name] && m.index < strongAt) { strong = name; strongAt = m.index; }
    });
    if (strong) return strong;
    if (!best) best = /\bpan\b/.test(s) ? "fry" : /\b(pot|water|broth|stock|heat)\b/.test(s) ? "boil" : "mix";
    return best;
  }
  const COLD = /\b(chill|fridge|refrigerat|freeze|cold|ice)/i;
  const RISE = /\b(rise|prove|proof|doubled)/i;

  // a color for the food in a scene, from what the step talks about
  const FOOD_COLORS = [
    [/tomato|paprika|chili|chilli|harissa|red|beet|ketchup|passata|berbere|gochujang/, "#d24b2f"],
    [/spinach|herb|parsley|coriander|kale|green|basil|mint|dill|pesto|cabbage|lettuce|leek|zucchini|peas|beans/, "#5c9c3d"],
    [/curry|turmeric|saffron|yolk|egg|cheese|corn|polenta|pumpkin|mango|lemon|custard/, "#e8b02c"],
    [/chocolate|cocoa|coffee|soy|dark|caramel|date|brownie/, "#5b3424"],
    [/cream|milk|rice|yogurt|flour|dough|batter|pasta|noodle|potato|béchamel|bechamel|coconut|quark|bread/, "#efe2c4"],
    [/beef|lamb|pork|sausage|bacon|mince|meat|steak|chorizo|ham/, "#9b4b34"],
    [/chicken|fish|prawn|shrimp|salmon|cod|tofu|paneer/, "#e8ae7c"],
    [/apple|onion|garlic|shallot/, "#e7c98a"]
  ];
  function foodColor(text, fallback) {
    const s = text.toLowerCase();
    for (const [re, c] of FOOD_COLORS) if (re.test(s)) return c;
    return fallback;
  }

  function timeIn(text) {
    const m = text.match(/(\d+(?:[.,]\d+)?)(?:\s*(?:–|-|to)\s*(\d+(?:[.,]\d+)?))?\s*(minutes?|mins?|hours?|days?)\b/i);
    if (!m) return null;
    const n = m[2] ? m[1] + "–" + m[2] : m[1];
    if (/^h/i.test(m[3])) return tr("{n} h", { n });
    if (/^d/i.test(m[3])) return m[1] === "1" && !m[2] ? tr("{n} day", { n }) : tr("{n} days", { n });
    return tr("{n} min", { n });
  }

  // ---------- drawing helpers ----------
  const C = {
    wallTop: "#1a2622", wallBottom: "#25332d", counter: "#5d4331", counterEdge: "#6f513b", counterDark: "#46321f",
    metalA: "#7d8984", metalB: "#d6ddd9", metalC: "#8f9b96", rim: "#b3bdb8", handle: "#262b29",
    burner: "#171b1a", flameA: "#ff8a2a", flameB: "#ffd34d", plate: "#f4f1ea", plateIn: "#e6e0d4",
    bowl: "#e8e3d9", bowlShade: "#c9c1b2", board: "#c99460", boardEdge: "#a8743f", blade: "#e3e8e6", knife: "#2c2927",
    oven: "#2e3734", ovenPanel: "#252c2a", wood: "#c9955f", woodDark: "#9b6b3c", bamboo: "#c9a565", bambooDark: "#a5823f",
    cloth: "#c6533f", clock: "#f4f1ea", ink: "#1b1f1e"
  };

  function rr(ctx, x, y, w, h, r) {
    r = Math.min(r, w / 2, h / 2);
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + w, y, x + w, y + h, r);
    ctx.arcTo(x + w, y + h, x, y + h, r);
    ctx.arcTo(x, y + h, x, y, r);
    ctx.arcTo(x, y, x + w, y, r);
    ctx.closePath();
  }
  function ell(ctx, x, y, rx, ry, a0, a1) {
    ctx.beginPath();
    ctx.ellipse(x, y, Math.max(0.1, rx), Math.max(0.1, ry), 0, a0 || 0, a1 == null ? Math.PI * 2 : a1);
  }
  function shade(hex, amt) {
    const n = parseInt(hex.slice(1), 16);
    const f = (v) => Math.max(0, Math.min(255, Math.round(v + amt * 255)));
    return "rgb(" + f(n >> 16) + "," + f((n >> 8) & 255) + "," + f(n & 255) + ")";
  }
  const rand = (i) => { const x = Math.sin(i * 127.1 + 311.7) * 43758.5453; return x - Math.floor(x); };

  function background(ctx, W, H, u) {
    const g = ctx.createLinearGradient(0, 0, 0, H);
    g.addColorStop(0, C.wallTop); g.addColorStop(1, C.wallBottom);
    ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
    // tiles
    ctx.strokeStyle = "rgba(255,255,255,0.035)"; ctx.lineWidth = Math.max(1, u * 0.2);
    for (let x = 0; x < W; x += 12 * u) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, 74 * u); ctx.stroke(); }
    for (let y = 0; y < 74 * u; y += 12 * u) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke(); }
    // counter
    ctx.fillStyle = C.counterEdge; ctx.fillRect(0, 74 * u, W, 3 * u);
    ctx.fillStyle = C.counter; ctx.fillRect(0, 77 * u, W, H - 77 * u);
    ctx.fillStyle = C.counterDark; ctx.fillRect(0, 77 * u, W, 0.8 * u);
  }
  function burner(ctx, cx, y, u, t, on) {
    ell(ctx, cx, y, 30 * u, 4.5 * u); ctx.fillStyle = C.burner; ctx.fill();
    if (!on) return;
    const a = 0.32 + 0.08 * Math.sin(t * 7);
    const g = ctx.createRadialGradient(cx, y, 2 * u, cx, y, 34 * u);
    g.addColorStop(0, "rgba(255,120,40," + a + ")"); g.addColorStop(1, "rgba(255,120,40,0)");
    ctx.fillStyle = g; ell(ctx, cx, y, 36 * u, 7 * u); ctx.fill();
  }
  function puffs(ctx, cx, top, u, t, n, spread, grey) {
    for (let k = 0; k < n; k++) {
      for (let j = 0; j < 3; j++) {
        const ph = (t * 0.32 + k * 0.21 + j * 0.33) % 1;
        const x = cx + (k - (n - 1) / 2) * spread * u + Math.sin(ph * 6 + k) * 3 * u;
        const y = top - ph * 34 * u;
        ctx.fillStyle = grey ? "rgba(150,150,150," + (0.22 * (1 - ph)) + ")" : "rgba(255,255,255," + (0.17 * (1 - ph)) + ")";
        ell(ctx, x, y, (2 + ph * 6) * u, (2 + ph * 6) * u); ctx.fill();
      }
    }
  }
  function pot(ctx, cx, base, u, liquid, w, h) {
    w = (w || 56) * u; h = (h || 30) * u;
    ctx.fillStyle = C.handle;
    rr(ctx, cx - w / 2 - 6 * u, base - h + 3 * u, 8 * u, 3 * u, 1.5 * u); ctx.fill();
    rr(ctx, cx + w / 2 - 2 * u, base - h + 3 * u, 8 * u, 3 * u, 1.5 * u); ctx.fill();
    const g = ctx.createLinearGradient(cx - w / 2, 0, cx + w / 2, 0);
    g.addColorStop(0, C.metalA); g.addColorStop(0.45, C.metalB); g.addColorStop(1, C.metalC);
    ctx.fillStyle = g; rr(ctx, cx - w / 2, base - h, w, h, 3 * u); ctx.fill();
    ell(ctx, cx, base - h, w / 2, 4 * u); ctx.fillStyle = C.rim; ctx.fill();
    ell(ctx, cx, base - h + 0.5 * u, w / 2 - 1.6 * u, 3.1 * u); ctx.fillStyle = liquid; ctx.fill();
    return base - h;
  }
  function bowl(ctx, cx, top, u, fill, rx, depth) {
    rx = (rx || 30) * u; depth = (depth || 22) * u;
    const g = ctx.createLinearGradient(cx - rx, 0, cx + rx, 0);
    g.addColorStop(0, C.bowlShade); g.addColorStop(0.4, C.bowl); g.addColorStop(1, C.bowlShade);
    ctx.fillStyle = g; ell(ctx, cx, top, rx, depth, 0, Math.PI); ctx.fill();
    ell(ctx, cx, top, rx, 4.5 * u); ctx.fillStyle = C.bowlShade; ctx.fill();
    ell(ctx, cx, top + 0.6 * u, rx - 2.4 * u, 3.4 * u); ctx.fillStyle = fill; ctx.fill();
  }
  function plate(ctx, cx, y, u) {
    ell(ctx, cx, y + 1.2 * u, 36 * u, 9.5 * u); ctx.fillStyle = "rgba(0,0,0,0.25)"; ctx.fill();
    ell(ctx, cx, y, 35 * u, 9 * u); ctx.fillStyle = C.plate; ctx.fill();
    ell(ctx, cx, y, 25 * u, 6 * u); ctx.fillStyle = C.plateIn; ctx.fill();
  }
  function mound(ctx, cx, y, u, color, t) {
    for (let i = 0; i < 9; i++) {
      const a = rand(i) * Math.PI * 2, r = rand(i + 20) * 10 * u;
      const x = cx + Math.cos(a) * r * 1.3, yy = y - 3 * u - Math.abs(Math.sin(a)) * r * 0.35 - (9 - i) * 0.5 * u;
      ctx.fillStyle = i % 3 ? color : shade(color, 0.08);
      ell(ctx, x, yy, 7 * u, 4.6 * u); ctx.fill();
    }
    ctx.fillStyle = "rgba(255,255,255,0.25)"; ell(ctx, cx - 4 * u, y - 9 * u, 4 * u, 1.6 * u); ctx.fill();
  }
  function sparkles(ctx, W, H, u, t, n) {
    for (let i = 0; i < n; i++) {
      const ph = (t * 0.5 + rand(i)) % 1;
      const x = rand(i + 3) * W, y = rand(i + 7) * 60 * u;
      const s = Math.sin(ph * Math.PI) * 1.6 * u;
      ctx.fillStyle = "rgba(255,226,140," + Math.sin(ph * Math.PI) + ")";
      ctx.beginPath(); ctx.moveTo(x, y - s * 2); ctx.lineTo(x + s * 0.5, y); ctx.lineTo(x, y + s * 2); ctx.lineTo(x - s * 0.5, y); ctx.closePath(); ctx.fill();
      ctx.beginPath(); ctx.moveTo(x - s * 2, y); ctx.lineTo(x, y + s * 0.5); ctx.lineTo(x + s * 2, y); ctx.lineTo(x, y - s * 0.5); ctx.closePath(); ctx.fill();
    }
  }

  // ---------- scenes ----------
  const DRAW = {
    boil(ctx, W, H, u, t, f) {
      const cx = W / 2, base = 74 * u;
      burner(ctx, cx, base, u, t, true);
      const top = pot(ctx, cx, base, u, f.color);
      for (let i = 0; i < 14; i++) {
        const ph = (t * (0.9 + rand(i) * 0.6) + rand(i + 9)) % 1;
        const bx = cx + (rand(i + 4) - 0.5) * 46 * u, by = top + (rand(i + 5) - 0.5) * 4 * u;
        ctx.strokeStyle = "rgba(255,255,255," + (0.6 * (1 - ph)) + ")"; ctx.lineWidth = 0.4 * u;
        ell(ctx, bx, by, ph * 1.8 * u, ph * 1.1 * u); ctx.stroke();
      }
      puffs(ctx, cx, top - 3 * u, u, t, 4, 10);
    },
    steam(ctx, W, H, u, t, f) {
      const cx = W / 2, base = 74 * u;
      burner(ctx, cx, base, u, t, true);
      const top = pot(ctx, cx, base, u, "#9fc3d1", 56, 18);
      for (let k = 0; k < 2; k++) {
        const y = top - (k + 1) * 11 * u;
        ctx.fillStyle = k ? C.bamboo : shade(C.bamboo, -0.04); rr(ctx, cx - 26 * u, y, 52 * u, 11 * u, 2 * u); ctx.fill();
        ctx.strokeStyle = C.bambooDark; ctx.lineWidth = 0.5 * u;
        for (let s = 1; s < 3; s++) { ctx.beginPath(); ctx.moveTo(cx - 26 * u, y + s * 3.7 * u); ctx.lineTo(cx + 26 * u, y + s * 3.7 * u); ctx.stroke(); }
      }
      const lid = top - 22 * u;
      ctx.fillStyle = C.bambooDark; ell(ctx, cx, lid, 27 * u, 6 * u, Math.PI, 0); ctx.fill();
      puffs(ctx, cx, lid - 4 * u, u, t * 1.3, 5, 9);
    },
    fry(ctx, W, H, u, t, f) {
      const cx = W / 2 - 6 * u, y = 72 * u;
      burner(ctx, cx, 74 * u, u, t, true);
      ctx.fillStyle = "#1c201f"; rr(ctx, cx + 28 * u, y - 7 * u, 32 * u, 3.4 * u, 1.7 * u); ctx.fill();
      ell(ctx, cx, y - 3 * u, 33 * u, 9 * u); ctx.fillStyle = "#2b302e"; ctx.fill();
      ell(ctx, cx, y - 4.2 * u, 29 * u, 7 * u); ctx.fillStyle = "#3e4542"; ctx.fill();
      const toss = (t % 3.2) < 0.55 ? Math.sin(((t % 3.2) / 0.55) * Math.PI) : 0;
      for (let i = 0; i < 10; i++) {
        const a = rand(i) * Math.PI * 2, r = 0.35 + rand(i + 1) * 0.55;
        const px = cx + Math.cos(a) * 22 * u * r + Math.sin(t * 19 + i) * 0.4 * u;
        const py = y - 4.5 * u + Math.sin(a) * 5 * u * r - toss * (8 + rand(i + 2) * 8) * u;
        ctx.fillStyle = shade(f.color, -0.12 + rand(i + 3) * 0.12);
        rr(ctx, px - 3.2 * u, py - 1.8 * u, 6.4 * u, 3.6 * u, 1.4 * u); ctx.fill();
      }
      for (let i = 0; i < 26; i++) {
        const ph = (t * 1.6 + rand(i + 40)) % 1;
        const x = cx + (rand(i + 50) - 0.5) * 50 * u, yy = y - 6 * u - ph * 14 * u;
        ctx.fillStyle = "rgba(255,236,170," + (1 - ph) + ")";
        ell(ctx, x, yy, 0.45 * u, 0.45 * u); ctx.fill();
      }
      puffs(ctx, cx, y - 10 * u, u, t, 3, 12, true);
    },
    deepfry(ctx, W, H, u, t, f) {
      const cx = W / 2, base = 74 * u;
      burner(ctx, cx, base, u, t, true);
      const top = pot(ctx, cx, base, u, "#d9a23a", 60, 26);
      for (let i = 0; i < 6; i++) {
        const x = cx + (i - 2.5) * 8 * u, bob = Math.sin(t * 3 + i) * 0.6 * u;
        ctx.fillStyle = shade(f.color === "#efe2c4" ? "#d79a45" : f.color, -0.05);
        ell(ctx, x, top + bob, 3.6 * u, 2 * u); ctx.fill();
        for (let k = 0; k < 5; k++) {
          const ph = (t * 2.2 + rand(i * 7 + k)) % 1, a = rand(i * 3 + k) * Math.PI * 2;
          ctx.strokeStyle = "rgba(255,248,210," + (0.8 * (1 - ph)) + ")"; ctx.lineWidth = 0.35 * u;
          ell(ctx, x + Math.cos(a) * (3 + ph * 3) * u, top + Math.sin(a) * 1.4 * u, ph * 1.2 * u, ph * 0.7 * u); ctx.stroke();
        }
      }
      puffs(ctx, cx, top - 2 * u, u, t, 3, 12);
    },
    bake(ctx, W, H, u, t, f) {
      const cx = W / 2, base = 77 * u;
      ctx.fillStyle = C.oven; rr(ctx, cx - 38 * u, base - 60 * u, 76 * u, 60 * u, 3 * u); ctx.fill();
      ctx.fillStyle = C.ovenPanel; rr(ctx, cx - 38 * u, base - 60 * u, 76 * u, 10 * u, 3 * u); ctx.fill();
      for (let k = 0; k < 3; k++) {
        const kx = cx - 20 * u + k * 20 * u, ky = base - 55 * u;
        ell(ctx, kx, ky, 3 * u, 3 * u); ctx.fillStyle = "#c9d1cd"; ctx.fill();
        const a = k === 1 ? t * 1.2 : 0.8;
        ctx.strokeStyle = C.ink; ctx.lineWidth = 0.6 * u; ctx.beginPath(); ctx.moveTo(kx, ky); ctx.lineTo(kx + Math.cos(a) * 2.6 * u, ky + Math.sin(a) * 2.6 * u); ctx.stroke();
      }
      const wx = cx - 30 * u, wy = base - 45 * u, ww = 60 * u, wh = 34 * u;
      const glow = 0.55 + 0.12 * Math.sin(t * 2.4);
      const g = ctx.createLinearGradient(0, wy, 0, wy + wh);
      g.addColorStop(0, "rgba(255,170,70," + glow + ")"); g.addColorStop(1, "rgba(160,60,20," + glow + ")");
      ctx.fillStyle = g; rr(ctx, wx, wy, ww, wh, 2.5 * u); ctx.fill();
      ctx.strokeStyle = "rgba(255,190,120,0.5)"; ctx.lineWidth = 0.4 * u;
      for (let k = 0; k < 4; k++) {
        ctx.beginPath();
        for (let x = 0; x <= ww - 6 * u; x += u) ctx.lineTo(wx + 3 * u + x, wy + 6 * u + k * 3 * u + Math.sin(x / (3 * u) + t * 4 + k) * 0.7 * u);
        ctx.stroke();
      }
      ctx.fillStyle = "#3a3330"; ctx.fillRect(wx + 6 * u, wy + wh - 8 * u, ww - 12 * u, 1.2 * u);
      const rise = 1 + 0.06 * Math.min(1, t / 6);
      ctx.fillStyle = f.color; ell(ctx, cx, wy + wh - 8 * u, 20 * u, 7 * u * rise, Math.PI, 0); ctx.fill();
      ctx.fillStyle = "rgba(255,255,255,0.18)"; ell(ctx, cx - 6 * u, wy + wh - 12 * u * rise, 6 * u, 1.5 * u); ctx.fill();
      ctx.fillStyle = "#9aa5a0"; rr(ctx, cx - 24 * u, base - 8 * u, 48 * u, 2.2 * u, 1.1 * u); ctx.fill();
    },
    grill(ctx, W, H, u, t, f) {
      const cx = W / 2, y = 64 * u;
      ctx.fillStyle = "#1d2120"; rr(ctx, cx - 40 * u, y - 2 * u, 80 * u, 14 * u, 2 * u); ctx.fill();
      for (let i = 0; i < 14; i++) {
        const fx = cx - 36 * u + i * 5.5 * u, fh = (5 + 3 * Math.sin(t * 9 + i * 1.7)) * u;
        ctx.fillStyle = i % 2 ? C.flameA : C.flameB;
        ctx.beginPath(); ctx.moveTo(fx - 2.4 * u, y + 8 * u); ctx.quadraticCurveTo(fx, y + 8 * u - fh * 1.6, fx + 2.4 * u, y + 8 * u); ctx.fill();
      }
      ctx.strokeStyle = "#8d9692"; ctx.lineWidth = 0.9 * u;
      for (let i = 0; i < 12; i++) { ctx.beginPath(); ctx.moveTo(cx - 38 * u + i * 7 * u, y - 2 * u); ctx.lineTo(cx - 38 * u + i * 7 * u, y + 2 * u); ctx.stroke(); }
      ctx.beginPath(); ctx.moveTo(cx - 40 * u, y); ctx.lineTo(cx + 40 * u, y); ctx.stroke();
      for (let i = 0; i < 3; i++) {
        const px = cx - 22 * u + i * 22 * u, py = y - 3 * u + Math.sin(t * 2 + i) * 0.2 * u;
        ctx.fillStyle = shade(f.color, -0.08); rr(ctx, px - 8 * u, py - 3 * u, 16 * u, 5 * u, 2 * u); ctx.fill();
        ctx.strokeStyle = "rgba(30,15,10,0.7)"; ctx.lineWidth = 0.8 * u;
        for (let s = 0; s < 3; s++) { ctx.beginPath(); ctx.moveTo(px - 5 * u + s * 4 * u, py - 2.6 * u); ctx.lineTo(px - 7 * u + s * 4 * u, py + 1.6 * u); ctx.stroke(); }
      }
      puffs(ctx, cx, y - 8 * u, u, t, 5, 12, true);
    },
    chop(ctx, W, H, u, t, f) {
      const cx = W / 2, y = 74 * u;
      ctx.fillStyle = C.boardEdge; rr(ctx, cx - 42 * u, y - 4 * u, 84 * u, 5 * u, 1.5 * u); ctx.fill();
      ctx.fillStyle = C.board; rr(ctx, cx - 42 * u, y - 8 * u, 84 * u, 6 * u, 2 * u); ctx.fill();
      const cut = Math.floor(t * 1.7) % 9;
      ctx.fillStyle = f.color; ell(ctx, cx - 20 * u, y - 13 * u, 14 * u - cut * 1.1 * u, 6.5 * u); ctx.fill();
      ctx.fillStyle = "rgba(255,255,255,0.18)"; ell(ctx, cx - 24 * u, y - 16 * u, 5 * u, 1.4 * u); ctx.fill();
      for (let k = 0; k < cut; k++) {
        ctx.fillStyle = shade(f.color, (k % 2) * 0.06);
        rr(ctx, cx + 4 * u + (k % 5) * 4 * u, y - 11.5 * u - Math.floor(k / 5) * 3.4 * u, 3.2 * u, 3.2 * u, 0.8 * u); ctx.fill();
      }
      const lift = Math.abs(Math.sin(t * Math.PI * 1.7));
      const bx = cx - 6 * u - cut * 1.1 * u, by = y - 9 * u - lift * 16 * u;
      ctx.save(); ctx.translate(bx, by); ctx.rotate(-0.12 * lift);
      ctx.fillStyle = C.blade;
      ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(4 * u, -9 * u); ctx.lineTo(30 * u, -9 * u); ctx.lineTo(30 * u, -1 * u); ctx.closePath(); ctx.fill();
      ctx.fillStyle = C.knife; rr(ctx, 30 * u, -8 * u, 15 * u, 5 * u, 2 * u); ctx.fill();
      ctx.restore();
    },
    mix(ctx, W, H, u, t, f) {
      const cx = W / 2, top = 52 * u;
      bowl(ctx, cx, top, u, f.color);
      ctx.save(); ell(ctx, cx, top + 0.6 * u, 27 * u, 3.4 * u); ctx.clip();
      ctx.strokeStyle = shade(f.color, 0.12); ctx.lineWidth = 0.6 * u;
      for (let k = 0; k < 4; k++) { ell(ctx, cx, top + 0.6 * u, (6 + k * 6) * u, (0.8 + k * 0.7) * u, t * 3 + k, t * 3 + k + 2.4); ctx.stroke(); }
      ctx.restore();
      const wx = cx + Math.cos(t * 5) * 12 * u, wy = top + Math.sin(t * 5) * 1.6 * u;
      ctx.strokeStyle = "#cfd6d2"; ctx.lineWidth = 0.5 * u;
      for (let k = -2; k <= 2; k++) { ell(ctx, wx + k * 0.8 * u, wy - 7 * u, (1.8 + Math.abs(k) * 0.6) * u, 8 * u); ctx.stroke(); }
      ctx.strokeStyle = C.knife; ctx.lineWidth = 1.6 * u; ctx.lineCap = "round";
      ctx.beginPath(); ctx.moveTo(wx, wy - 14 * u); ctx.lineTo(wx + 5 * u, wy - 30 * u); ctx.stroke(); ctx.lineCap = "butt";
    },
    blend(ctx, W, H, u, t, f) {
      const cx = W / 2 + Math.sin(t * 45) * 0.25 * u, base = 74 * u;
      ctx.fillStyle = "#2c3331"; rr(ctx, cx - 16 * u, base - 12 * u, 32 * u, 12 * u, 2.5 * u); ctx.fill();
      ell(ctx, cx - 6 * u, base - 6 * u, 1.6 * u, 1.6 * u); ctx.fillStyle = "#78e08f"; ctx.fill();
      const jt = base - 54 * u, jb = base - 12 * u;
      const jar = () => { ctx.beginPath(); ctx.moveTo(cx - 13 * u, jb); ctx.lineTo(cx - 17 * u, jt); ctx.lineTo(cx + 17 * u, jt); ctx.lineTo(cx + 13 * u, jb); ctx.closePath(); };
      ctx.save(); jar(); ctx.clip();
      ctx.fillStyle = f.color; ctx.fillRect(cx - 20 * u, jb - 24 * u, 40 * u, 24 * u);
      ctx.strokeStyle = shade(f.color, 0.15); ctx.lineWidth = 0.7 * u;
      for (let k = 0; k < 5; k++) { ell(ctx, cx, jb - 14 * u + k * 2 * u, (12 - k * 2) * u, 2.4 * u, t * 12 + k, t * 12 + k + 3); ctx.stroke(); }
      ctx.restore();
      jar(); ctx.fillStyle = "rgba(210,235,255,0.12)"; ctx.fill(); ctx.strokeStyle = "rgba(255,255,255,0.45)"; ctx.lineWidth = 0.6 * u; ctx.stroke();
      ctx.fillStyle = "#2c3331"; rr(ctx, cx - 18 * u, jt - 4 * u, 36 * u, 4 * u, 1.5 * u); ctx.fill();
    },
    dough(ctx, W, H, u, t, f) {
      const cx = W / 2, y = 74 * u;
      ctx.fillStyle = C.boardEdge; rr(ctx, cx - 46 * u, y - 4 * u, 92 * u, 5 * u, 1.5 * u); ctx.fill();
      ctx.fillStyle = C.board; rr(ctx, cx - 46 * u, y - 8 * u, 92 * u, 6 * u, 2 * u); ctx.fill();
      const spread = Math.min(1, (t % 7) / 5);
      const dc = f.color === "#5b3424" ? "#e9d6ae" : (f.color === "#efe2c4" ? "#f0dcb0" : "#ecd8ad");
      ctx.fillStyle = dc; ell(ctx, cx, y - 9 * u, (14 + spread * 22) * u, (4.5 - spread * 2) * u); ctx.fill();
      const px = cx + Math.sin(t * 2.4) * 15 * u, py = y - 15 * u + spread * 2 * u;
      ctx.fillStyle = C.woodDark; rr(ctx, px - 30 * u, py - 1.3 * u, 8 * u, 2.6 * u, 1.3 * u); ctx.fill(); rr(ctx, px + 22 * u, py - 1.3 * u, 8 * u, 2.6 * u, 1.3 * u); ctx.fill();
      ctx.fillStyle = C.wood; rr(ctx, px - 22 * u, py - 3 * u, 44 * u, 6 * u, 3 * u); ctx.fill();
      for (let i = 0; i < 18; i++) {
        const ph = (t * 0.6 + rand(i + 60)) % 1;
        ctx.fillStyle = "rgba(255,255,255," + (0.5 * (1 - ph)) + ")";
        ell(ctx, cx + (rand(i + 70) - 0.5) * 70 * u, y - 10 * u - ph * 10 * u, 0.4 * u, 0.4 * u); ctx.fill();
      }
    },
    wait(ctx, W, H, u, t, f) {
      const cx = W / 2 - 14 * u, top = 52 * u;
      const cold = COLD.test(f.text), rise = RISE.test(f.text);
      bowl(ctx, cx, top, u, f.color);
      if (rise) {
        const s = 0.5 + 0.5 * Math.min(1, t / 6);
        ctx.fillStyle = "#ecd8ad"; ell(ctx, cx, top, 26 * u, 14 * u * s, Math.PI, 0); ctx.fill();
      } else {
        ctx.fillStyle = C.cloth; ell(ctx, cx, top - 0.5 * u, 31 * u, 7 * u, Math.PI, 0); ctx.fill();
        ctx.strokeStyle = "rgba(255,255,255,0.35)"; ctx.lineWidth = 0.6 * u;
        for (let k = -2; k <= 2; k++) { ctx.beginPath(); ctx.moveTo(cx + k * 9 * u, top - 0.5 * u); ctx.lineTo(cx + k * 7 * u, top - 6.5 * u); ctx.stroke(); }
      }
      const kx = cx + 46 * u, ky = 36 * u, r = 13 * u;
      ell(ctx, kx, ky, r, r); ctx.fillStyle = C.clock; ctx.fill(); ctx.strokeStyle = "#cfc8bb"; ctx.lineWidth = 1.4 * u; ctx.stroke();
      ctx.strokeStyle = C.ink; ctx.lineWidth = 0.5 * u;
      for (let k = 0; k < 12; k++) { const a = k * Math.PI / 6; ctx.beginPath(); ctx.moveTo(kx + Math.cos(a) * r * 0.8, ky + Math.sin(a) * r * 0.8); ctx.lineTo(kx + Math.cos(a) * r * 0.92, ky + Math.sin(a) * r * 0.92); ctx.stroke(); }
      const a1 = t * 2.2 - Math.PI / 2, a2 = t * 0.18 - Math.PI / 2;
      ctx.lineCap = "round";
      ctx.lineWidth = 0.9 * u; ctx.beginPath(); ctx.moveTo(kx, ky); ctx.lineTo(kx + Math.cos(a1) * r * 0.75, ky + Math.sin(a1) * r * 0.75); ctx.stroke();
      ctx.lineWidth = 1.3 * u; ctx.beginPath(); ctx.moveTo(kx, ky); ctx.lineTo(kx + Math.cos(a2) * r * 0.5, ky + Math.sin(a2) * r * 0.5); ctx.stroke();
      ctx.lineCap = "butt";
      if (cold) {
        ctx.fillStyle = "rgba(120,180,255,0.10)"; ctx.fillRect(0, 0, W, H);
        for (let i = 0; i < 40; i++) {
          const ph = (t * 0.15 + rand(i + 90)) % 1;
          ctx.fillStyle = "rgba(230,245,255," + (0.8 * Math.sin(ph * Math.PI)) + ")";
          ell(ctx, rand(i + 91) * W + Math.sin(t + i) * 2 * u, ph * H, 0.7 * u, 0.7 * u); ctx.fill();
        }
      }
    },
    serve(ctx, W, H, u, t, f) {
      const cx = W / 2, y = 70 * u;
      plate(ctx, cx, y, u);
      mound(ctx, cx, y, u, f.color, t);
      const gar = ["#5c9c3d", "#d24b2f", "#f2f0e6", "#e8b02c"];
      for (let i = 0; i < 22; i++) {
        const ph = (t * 0.45 + rand(i + 30)) % 1;
        const x = cx + (rand(i + 31) - 0.5) * 30 * u, yy = 8 * u + ph * (y - 16 * u);
        ctx.fillStyle = gar[i % 4]; ctx.globalAlpha = ph < 0.9 ? 1 : (1 - ph) * 10;
        rr(ctx, x, yy, 1.2 * u, 0.7 * u, 0.3 * u); ctx.fill(); ctx.globalAlpha = 1;
      }
      sparkles(ctx, W, H, u, t, 6);
    },
    intro(ctx, W, H, u, t, f) {
      const cx = W / 2, y = 70 * u;
      plate(ctx, cx, y, u);
      mound(ctx, cx, y, u, f.color, t);
      puffs(ctx, cx, y - 14 * u, u, t, 3, 8);
    },
    ingredients(ctx, W, H, u, t, f) {
      for (let i = 0; i < 7; i++) {
        const x = W * (0.1 + i * 0.135), yy = 74 * u;
        ctx.fillStyle = "rgba(0,0,0,0.25)"; ell(ctx, x, yy + 0.5 * u, 6 * u, 1.6 * u); ctx.fill();
        ctx.fillStyle = shade(["#5c9c3d", "#d24b2f", "#e8b02c", "#efe2c4", "#9b4b34", "#e7c98a", "#5b3424"][i], 0);
        ell(ctx, x, yy - 4 * u, 5 * u, 4.2 * u); ctx.fill();
      }
    },
    outro(ctx, W, H, u, t, f) {
      DRAW.serve(ctx, W, H, u, t, f);
      sparkles(ctx, W, H, u, t * 1.3 + 2, 10);
    }
  };

  // ---------- player ----------
  const reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const synth = "speechSynthesis" in window ? window.speechSynthesis : null;
  let voiceOn = (() => { try { const v = localStorage.getItem("wp.voice"); return v == null ? !!synth : v === "1"; } catch (e) { return !!synth; } })();

  const el = {};
  let scenes = [], idx = 0, elapsed = 0, playing = false, last = 0, raf = 0, ctx = null, W = 0, H = 0, dpr = 1;
  let speechDone = true, speechToken = 0, recipeName = "";

  function $(s) { return document.querySelector(s); }
  const tr = (k, v) => (window.I18N ? window.I18N.t(k, v) : k.replace(/\{(\w+)\}/g, (m, x) => (v && v[x] != null ? v[x] : m)));
  function escHtml(s) { return String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c])); }

  function build(r) {
    const main = foodColor(r.name + " " + r.desc + " " + r.ingredients.slice(0, 3).map((x) => x.name).join(" "), "#d98b3a");
    const list = [];
    list.push({ kind: "intro", text: r.desc, say: "Let's cook " + r.name + ", from " + r.country + ". " + r.desc, color: main, dur: 5 });
    list.push({ kind: "ingredients", text: tr("You will need {n} ingredients.", { n: r.ingredients.length }), say: "You will need: " + r.ingredients.map((x) => (x.en || x.name).replace(/\(.*?\)/g, "")).join(", ") + ".", color: main, dur: Math.max(6, r.ingredients.length * 0.6) });
    r.steps.forEach((s, i) => {
      const kind = classify(s);
      list.push({ kind, step: i + 1, total: r.steps.length, text: s, say: "Step " + (i + 1) + ". " + s, timer: timeIn(s), color: foodColor(s, main), dur: Math.max(5, s.split(/\s+/).length * 0.42) });
    });
    list.push({ kind: "outro", text: tr("Ready to eat. Enjoy your {dish}!", { dish: r.name }), say: "And that's it. Enjoy your " + r.name + "!", color: main, dur: 4.5 });
    return list;
  }

  function sizeCanvas() {
    const box = el.stage.getBoundingClientRect();
    dpr = Math.min(2, window.devicePixelRatio || 1);
    W = Math.max(1, Math.round(box.width * dpr)); H = Math.max(1, Math.round(box.height * dpr));
    el.canvas.width = W; el.canvas.height = H;
    draw();
  }

  function draw() {
    if (!ctx || !scenes.length) return;
    const sc = scenes[idx];
    const u = H / 100;
    const t = (reduce ? elapsed * 0.25 : elapsed);
    ctx.save();
    ctx.clearRect(0, 0, W, H);
    background(ctx, W, H, u);
    (DRAW[sc.kind] || DRAW.boil)(ctx, W, H, u, t, sc);
    ctx.restore();
    const p = Math.min(1, elapsed / sc.dur);
    const fill = el.progress.children[idx];
    if (fill) fill.firstChild.style.width = (p * 100) + "%";
  }

  function showScene() {
    const sc = scenes[idx];
    [...el.progress.children].forEach((seg, i) => {
      seg.firstChild.style.width = i < idx ? "100%" : "0%";
      seg.classList.toggle("now", i === idx);
    });
    el.badge.textContent = sc.step ? tr("Step {a} of {b}", { a: sc.step, b: sc.total }) : sc.kind === "ingredients" ? tr("Ingredients") : sc.kind === "intro" ? recipeName : tr("Done");
    el.timer.hidden = !sc.timer;
    if (sc.timer) el.timerText.textContent = sc.timer;
    el.caption.textContent = sc.text;
    el.overlay.innerHTML = "";
    if (sc.kind === "intro") {
      el.overlay.innerHTML = (current.photo ? '<img class="v-photo" src="' + escHtml(current.photo) + '" alt="" onerror="this.remove()">' : "") +
        '<div class="v-title"><span class="v-kicker">' + escHtml(current.countryName || current.country) + " · " + escHtml(tr("{n} min", { n: current.time })) + " · " + escHtml(tr("serves {n}", { n: current.serves })) + '</span><strong>' + escHtml(recipeName) + "</strong></div>";
    } else if (sc.kind === "ingredients") {
      const max = el.stage.clientWidth < 520 ? 8 : 16;
      const shown = current.ingredients.slice(0, max);
      const more = current.ingredients.length - shown.length;
      el.overlay.innerHTML = '<ul class="v-ings">' + shown.map((x, i) =>
        '<li style="animation-delay:' + (reduce ? 0 : Math.min(i * 0.35, 6)) + 's"><b>' + escHtml(x.qty) + "</b> " + escHtml(x.name) + "</li>").join("") +
        (more > 0 ? '<li class="v-more" style="animation-delay:' + (reduce ? 0 : Math.min(shown.length * 0.35, 6)) + 's">+ ' + escHtml(tr("{n} more", { n: more })) + "</li>" : "") + "</ul>";
    } else if (sc.kind === "outro") {
      el.overlay.innerHTML = (current.photo ? '<img class="v-photo" src="' + escHtml(current.photo) + '" alt="" onerror="this.remove()">' : "") + '<div class="v-title v-end"><strong>' + escHtml(tr("Enjoy!")) + '</strong><span class="v-kicker">' + escHtml(recipeName) + "</span></div>";
    }
    el.prev.disabled = idx === 0;
    el.next.disabled = idx === scenes.length - 1;
    speak(sc);
  }

  function speak(sc) {
    speechToken++;
    speechDone = true;
    if (!synth) return;
    try { synth.cancel(); } catch (e) { /* ignore */ }
    if (!voiceOn || !playing) return;
    const token = speechToken;
    try {
      const u = new SpeechSynthesisUtterance(sc.say);
      const voices = synth.getVoices();
      const v = voices.find((x) => /^en(-|_)(GB|US)/i.test(x.lang)) || voices.find((x) => /^en/i.test(x.lang));
      if (v) u.voice = v;
      u.lang = v ? v.lang : "en-GB";
      u.rate = 1;
      u.onend = u.onerror = () => { if (token === speechToken) speechDone = true; };
      speechDone = false;
      synth.speak(u);
    } catch (e) { speechDone = true; }
  }

  function tick(now) {
    raf = requestAnimationFrame(tick);
    const dt = Math.min(0.1, (now - last) / 1000 || 0);
    last = now;
    if (playing) {
      elapsed += dt;
      const sc = scenes[idx];
      const waitSpeech = voiceOn && synth && !speechDone && elapsed < sc.dur * 3 + 8;
      if (elapsed >= sc.dur && !waitSpeech) {
        if (idx < scenes.length - 1) { idx++; elapsed = 0; showScene(); }
        else { setPlaying(false); elapsed = sc.dur; }
      }
    }
    draw();
  }

  function setPlaying(on) {
    playing = on;
    el.play.setAttribute("aria-label", on ? tr("Pause") : tr("Play"));
    el.play.innerHTML = on ? ICON.pause : ICON.play;
    el.root.classList.toggle("paused", !on);
    if (on) {
      if (idx === scenes.length - 1 && elapsed >= scenes[idx].dur) { idx = 0; elapsed = 0; showScene(); }
      else speak(scenes[idx]);
    } else if (synth) { speechToken++; try { synth.cancel(); } catch (e) { /* ignore */ } }
  }

  function go(i) {
    idx = Math.max(0, Math.min(scenes.length - 1, i));
    elapsed = 0;
    showScene();
  }

  const ICON = {
    play: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5.5v13l11-6.5z" fill="currentColor"/></svg>',
    pause: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 5h3.5v14H7zM13.5 5H17v14h-3.5z" fill="currentColor"/></svg>',
    prev: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 5h2v14H6zM19 5.5v13L9.5 12z" fill="currentColor"/></svg>',
    next: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M16 5h2v14h-2zM5 5.5v13L14.5 12z" fill="currentColor"/></svg>',
    voiceOn: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 9h4l5-4v14l-5-4H4z" fill="currentColor"/><path d="M16 8.5a5 5 0 0 1 0 7M18.5 6a8.5 8.5 0 0 1 0 12" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>',
    voiceOff: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 9h4l5-4v14l-5-4H4z" fill="currentColor"/><path d="m16.5 9.5 5 5m0-5-5 5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>'
  };

  function setVoiceButton() {
    el.voice.innerHTML = (voiceOn ? ICON.voiceOn : ICON.voiceOff) + "<span>" + escHtml(voiceOn ? tr("Voice on") : tr("Voice off")) + "</span>";
    el.voice.setAttribute("aria-pressed", voiceOn ? "true" : "false");
  }

  let current = null;
  function open(r) {
    current = r;
    recipeName = r.name;
    if (!el.root) init();
    scenes = build(r);
    el.title.textContent = r.name;
    el.yt.href = "https://www.youtube.com/results?search_query=" + encodeURIComponent(r.name + " " + r.country + " recipe");
    el.progress.innerHTML = scenes.map((s, i) => '<button type="button" class="v-seg" data-seg="' + i + '" aria-label="' + escHtml(s.step ? tr("Step {n}", { n: s.step }) : tr(s.kind === "intro" ? "Intro" : s.kind === "ingredients" ? "Ingredients" : "Done")) + '"><span></span></button>').join("");
    try { el.root.showModal(); } catch (e) { el.root.setAttribute("open", ""); }
    sizeCanvas();
    idx = 0; elapsed = 0;
    playing = true;
    setPlaying(true);
    showScene();
    last = performance.now();
    cancelAnimationFrame(raf);
    raf = requestAnimationFrame(tick);
  }
  function close() {
    playing = false;
    cancelAnimationFrame(raf);
    if (synth) { speechToken++; try { synth.cancel(); } catch (e) { /* ignore */ } }
    if (el.root && el.root.open) el.root.close();
  }

  function init() {
    el.root = $("#video-dialog");
    el.title = $("#v-title");
    el.stage = $("#v-stage");
    el.canvas = $("#v-canvas");
    el.overlay = $("#v-overlay");
    el.badge = $("#v-badge");
    el.timer = $("#v-timer");
    el.timerText = $("#v-timer-text");
    el.caption = $("#v-caption");
    el.progress = $("#v-progress");
    el.play = $("#v-play");
    el.prev = $("#v-prev");
    el.next = $("#v-next");
    el.voice = $("#v-voice");
    el.yt = $("#v-youtube");
    ctx = el.canvas.getContext("2d");
    el.prev.innerHTML = ICON.prev;
    el.next.innerHTML = ICON.next;
    if (!synth) el.voice.hidden = true;
    setVoiceButton();
    el.play.addEventListener("click", () => setPlaying(!playing));
    el.stage.addEventListener("click", () => setPlaying(!playing));
    el.prev.addEventListener("click", () => go(idx - 1));
    el.next.addEventListener("click", () => go(idx + 1));
    el.progress.addEventListener("click", (e) => { const s = e.target.closest("[data-seg]"); if (s) go(+s.dataset.seg); });
    el.voice.addEventListener("click", () => {
      voiceOn = !voiceOn;
      try { localStorage.setItem("wp.voice", voiceOn ? "1" : "0"); } catch (e) { /* ignore */ }
      setVoiceButton();
      speak(scenes[idx]);
    });
    $("#v-close").addEventListener("click", close);
    el.root.addEventListener("cancel", (e) => { e.preventDefault(); close(); });
    el.root.addEventListener("click", (e) => { if (e.target === el.root) close(); });
    el.root.addEventListener("keydown", (e) => {
      if (e.target.closest("a")) return;
      if (e.key === " " || e.key === "k") { e.preventDefault(); setPlaying(!playing); }
      else if (e.key === "ArrowRight") { e.preventDefault(); go(idx + 1); }
      else if (e.key === "ArrowLeft") { e.preventDefault(); go(idx - 1); }
    });
    if (window.ResizeObserver) new ResizeObserver(sizeCanvas).observe(el.stage);
    if (synth && synth.onvoiceschanged !== undefined) synth.onvoiceschanged = () => {};
  }

  window.RecipePlayer = { open, close, classify };
})();
