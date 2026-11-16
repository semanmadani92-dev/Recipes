/*
 * World Pantry: cooking mode. One step at a time in large type, the screen kept
 * awake where the browser allows it, and one-tap timers for every time a step
 * mentions ("simmer 20 minutes" → a 20:00 timer). Timers keep running while you
 * move between steps and ring when they finish.
 */
(function () {
  "use strict";

  const $ = (s) => document.querySelector(s);
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const el = {};
  let recipe = null, idx = 0, wakeLock = null, tick = 0, audio = null;
  let timers = []; // { id, label, total, left, running, done }
  let nextId = 1;

  // "20 minutes", "10–12 minutes", "1.5 hours", "45 seconds" → seconds (first number of a range)
  const TIME_RE = /(\d+(?:[.,]\d+)?)(?:\s*(?:–|-|to)\s*(\d+(?:[.,]\d+)?))?\s*(seconds?|secs?|minutes?|mins?|hours?|hrs?)\b/gi;
  function timesIn(text) {
    const out = [];
    let m;
    TIME_RE.lastIndex = 0;
    while ((m = TIME_RE.exec(text))) {
      const a = parseFloat(m[1].replace(",", "."));
      const unit = m[3].toLowerCase();
      const mult = unit.startsWith("h") ? 3600 : unit.startsWith("s") ? 1 : 60;
      const secs = Math.round(a * mult);
      if (secs < 10 || secs > 8 * 3600) continue;
      const label = (m[2] ? m[1] + "–" + m[2] : m[1]) + (mult === 3600 ? " h" : mult === 1 ? " s" : " min");
      if (!out.some((o) => o.secs === secs)) out.push({ secs, label });
    }
    return out.slice(0, 3);
  }
  const fmt = (s) => {
    s = Math.max(0, Math.ceil(s));
    const h = Math.floor(s / 3600), m = Math.floor((s % 3600) / 60), sec = s % 60;
    return (h ? h + ":" + String(m).padStart(2, "0") : m) + ":" + String(sec).padStart(2, "0");
  };

  function render() {
    const steps = recipe.steps;
    const s = steps[idx];
    el.count.textContent = "Step " + (idx + 1) + " of " + steps.length;
    el.step.textContent = s;
    const found = timesIn(s);
    el.timerBtns.innerHTML = found.map((t) =>
      `<button type="button" class="ck-start" data-secs="${t.secs}" data-label="${esc(t.label)}"><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="13" r="8" fill="none" stroke="currentColor" stroke-width="2"/><path d="M12 9v4l2.5 2.5M9.5 3h5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>Start ${esc(t.label)} timer</button>`).join("");
    el.dots.innerHTML = steps.map((_, i) => `<button type="button" class="ck-dot${i === idx ? " now" : i < idx ? " done" : ""}" data-go="${i}" aria-label="Step ${i + 1}"></button>`).join("");
    el.prev.disabled = idx === 0;
    el.next.textContent = idx === steps.length - 1 ? "Finish ✓" : "Next step →";
  }

  function renderTimers() {
    el.timers.innerHTML = timers.map((t) => `
      <div class="ck-t${t.done ? " done" : ""}${t.running ? "" : " paused"}">
        <span class="ck-t-label">${esc(t.label)}</span>
        <strong class="ck-t-time">${t.done ? "Done!" : fmt(t.left)}</strong>
        ${t.done ? "" : `<button type="button" data-toggle="${t.id}">${t.running ? "Pause" : "Resume"}</button>`}
        <button type="button" data-remove="${t.id}" aria-label="Remove timer">×</button>
      </div>`).join("");
  }

  function startTimer(secs, label) {
    timers.push({ id: nextId++, label: "Step " + (idx + 1) + " · " + label, total: secs, left: secs, running: true, done: false, end: Date.now() + secs * 1000 });
    unlockAudio();
    renderTimers();
  }

  function onTick() {
    let changed = false;
    const now = Date.now();
    timers.forEach((t) => {
      if (t.running && !t.done) {
        t.left = (t.end - now) / 1000;
        if (t.left <= 0) { t.left = 0; t.done = true; t.running = false; ring(t); }
        changed = true;
      }
    });
    if (changed) renderTimers();
  }

  function unlockAudio() {
    try {
      if (!audio) audio = new (window.AudioContext || window.webkitAudioContext)();
      if (audio.state === "suspended") audio.resume();
    } catch (e) { audio = null; }
  }
  function ring(t) {
    try {
      if (audio) {
        for (let i = 0; i < 3; i++) {
          const o = audio.createOscillator(), g = audio.createGain();
          o.type = "sine"; o.frequency.value = 880;
          const at = audio.currentTime + i * 0.45;
          g.gain.setValueAtTime(0.0001, at); g.gain.exponentialRampToValueAtTime(0.4, at + 0.02); g.gain.exponentialRampToValueAtTime(0.0001, at + 0.35);
          o.connect(g); g.connect(audio.destination); o.start(at); o.stop(at + 0.4);
        }
      }
    } catch (e) { /* ignore */ }
    try { if (navigator.vibrate) navigator.vibrate([300, 150, 300]); } catch (e) { /* ignore */ }
    el.root.classList.add("ringing");
    setTimeout(() => el.root.classList.remove("ringing"), 2500);
  }

  async function keepAwake() {
    try {
      if ("wakeLock" in navigator) {
        wakeLock = await navigator.wakeLock.request("screen");
        el.wake.textContent = "Your screen will stay on while cooking mode is open.";
        return;
      }
    } catch (e) { /* refused */ }
    el.wake.textContent = "";
  }
  function onVisible() { if (document.visibilityState === "visible" && el.root.open) keepAwake(); }

  function go(i) {
    if (i >= recipe.steps.length) { close(); return; }
    idx = Math.max(0, i);
    render();
  }

  function open(r) {
    if (!el.root) init();
    recipe = r; idx = 0;
    el.title.textContent = r.name;
    el.ings.innerHTML = '<ul>' + r.ingredients.map((x) => `<li><b>${esc(x.qty)}</b> ${esc(x.name)}${x.note ? ` <span>(${esc(x.note)})</span>` : ""}</li>`).join("") + "</ul>";
    el.ings.hidden = true; el.ingsBtn.setAttribute("aria-expanded", "false");
    render(); renderTimers();
    try { el.root.showModal(); } catch (e) { el.root.setAttribute("open", ""); }
    const main = el.root.querySelector(".ck-main"); main.setAttribute("tabindex", "-1"); main.focus({ preventScroll: true });
    keepAwake();
    clearInterval(tick); tick = setInterval(onTick, 250);
  }
  function close() {
    if (wakeLock) { try { wakeLock.release(); } catch (e) { /* ignore */ } wakeLock = null; }
    if (el.root.open) el.root.close();
    if (!timers.some((t) => t.running)) { clearInterval(tick); timers = []; }
  }

  function init() {
    el.root = $("#cook-dialog");
    el.title = $("#ck-title"); el.count = $("#ck-count"); el.step = $("#ck-step");
    el.timerBtns = $("#ck-timer-btns"); el.timers = $("#ck-timers"); el.dots = $("#ck-dots");
    el.prev = $("#ck-prev"); el.next = $("#ck-next"); el.ings = $("#ck-ings"); el.ingsBtn = $("#ck-ings-btn"); el.wake = $("#ck-wake");
    el.prev.addEventListener("click", () => go(idx - 1));
    el.next.addEventListener("click", () => go(idx + 1));
    $("#ck-close").addEventListener("click", close);
    el.ingsBtn.addEventListener("click", () => {
      el.ings.hidden = !el.ings.hidden;
      el.ingsBtn.setAttribute("aria-expanded", el.ings.hidden ? "false" : "true");
    });
    el.root.addEventListener("cancel", (e) => { e.preventDefault(); close(); });
    el.root.addEventListener("click", (e) => {
      const st = e.target.closest("[data-secs]");
      if (st) { startTimer(+st.dataset.secs, st.dataset.label); return; }
      const g = e.target.closest("[data-go]");
      if (g) { go(+g.dataset.go); return; }
      const tg = e.target.closest("[data-toggle]");
      if (tg) {
        const t = timers.find((x) => x.id === +tg.dataset.toggle);
        if (t) { t.running = !t.running; if (t.running) t.end = Date.now() + t.left * 1000; renderTimers(); }
        return;
      }
      const rm = e.target.closest("[data-remove]");
      if (rm) { timers = timers.filter((x) => x.id !== +rm.dataset.remove); renderTimers(); }
    });
    el.root.addEventListener("keydown", (e) => {
      if (e.target.closest("button") && (e.key === " " || e.key === "Enter")) return;
      if (e.key === "ArrowRight") { e.preventDefault(); go(idx + 1); }
      else if (e.key === "ArrowLeft") { e.preventDefault(); go(idx - 1); }
    });
    // swipe left/right to change step on phones
    let sx = null;
    el.root.addEventListener("touchstart", (e) => { sx = e.touches[0].clientX; }, { passive: true });
    el.root.addEventListener("touchend", (e) => {
      if (sx == null) return;
      const dx = e.changedTouches[0].clientX - sx; sx = null;
      if (Math.abs(dx) > 70 && !e.target.closest(".ck-timers, .ck-ings")) go(idx + (dx < 0 ? 1 : -1));
    });
    document.addEventListener("visibilitychange", onVisible);
  }

  window.CookMode = { open, timesIn };
})();
