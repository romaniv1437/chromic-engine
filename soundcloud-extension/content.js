(() => {
  const EXT_VERSION = "1.0.0";
  const BRAND = "Chromic";
  const LOCAL_DB_BASE_URL = chrome.runtime.getURL("lyrics-db").replace(/\/$/, "");
  const ENABLE_LOCAL_DB_FALLBACK = true;
  const REMOTE_DB_BASE_URLS = [
    // Remote DB is primary source.
    "https://raw.githubusercontent.com/romaniv1437/chromic-engine/main/soundcloud-extension/lyrics-db",
  ];
  const REMOTE_DB_SOURCE_URLS = REMOTE_DB_BASE_URLS.map((u) => u.replace(/\/$/, ""));
  const LOCAL_DB_SOURCE_URLS = ENABLE_LOCAL_DB_FALLBACK
    ? [LOCAL_DB_BASE_URL].map((u) => u.replace(/\/$/, ""))
    : [];
  const DB_RETRY_COOLDOWN_MS = 30000;
  const VIS_MODULE_URL = chrome.runtime.getURL("visualizer.main.js");
  const INJECTED_URL = chrome.runtime.getURL("injected.js");
  const DEFAULT_SCENE_INDEX = 5; // Hyperbolic
  const CHECK_AUDIO_MS = 1000;
  const TRACK_POLL_MS = 2000;
  const BUTTON_POLL_MS = 1000;
  const IDLE_MS = 3500; // hide cursor + chrome after this much inactivity
  const FLOATING_BTN_MARGIN = 12;
  const FLOATING_BTN_GAP = 10;
  const FLOATING_BTN_COMPACT_MAX_WIDTH = 640;

  if (window.__chromicScInjected) return;
  window.__chromicScInjected = true;
  window.__chromicScVersion = EXT_VERSION;

  // ─── Debug badge (hidden by default; toggle with Alt+Shift+D) ────────────
  let debugVisible = false;
  const dbg = document.createElement("div");
  dbg.id = "vibe-debug-badge";
  dbg.style.cssText = [
    "position:fixed", "left:10px", "top:10px", "z-index:2000000",
    "background:rgba(0,0,0,0.72)", "color:#9dfcb5",
    "font:11px/1.4 monospace", "padding:6px 8px",
    "border-radius:6px", "pointer-events:none", "display:none",
  ].join(";");
  dbg.textContent = `${BRAND} ${EXT_VERSION} boot`;
  document.documentElement.appendChild(dbg);

  function setDebugStatus(msg) {
    dbg.textContent = `${BRAND} ${EXT_VERSION} | ${msg}`;
  }

  // ─── Inject page-world script (taps SoundCloud audio + clock) ───────────
  let pageScriptInjected = false;
  function injectPageScript() {
    if (pageScriptInjected) return;
    pageScriptInjected = true;
    const s = document.createElement("script");
    s.src = INJECTED_URL;
    s.onload = () => s.remove();
    (document.head || document.documentElement).appendChild(s);
    console.log(`${BRAND}: page-world audio interceptor injected`);
  }
  injectPageScript();

  // ─── Fake AnalyserNode fed by page-world CustomEvents ───────────────────
  const FAKE_BIN_COUNT = 1024;
  const fakeAnalyser = {
    frequencyBinCount: FAKE_BIN_COUNT,
    fftSize: 2048,
    smoothingTimeConstant: 0.75,
    _freqData: new Uint8Array(FAKE_BIN_COUNT),
    _timeData: new Uint8Array(FAKE_BIN_COUNT).fill(128),
    _rms: 0, _bass: 0, _mid: 0, _treble: 0, _lastUpdate: 0,
    getByteFrequencyData(arr) {
      const src = this._freqData, len = Math.min(arr.length, src.length);
      for (let i = 0; i < len; i++) arr[i] = src[i];
    },
    getByteTimeDomainData(arr) {
      const src = this._timeData, len = Math.min(arr.length, src.length);
      for (let i = 0; i < len; i++) arr[i] = src[i];
    },
    connect() {}, disconnect() {}
  };

  let pageAudioConnected = false;
  document.addEventListener("__vibeAudio", (e) => {
    const d = e.detail;
    if (!d) return;

    const compact = d.freq || [];
    const step = Math.floor(FAKE_BIN_COUNT / 128);
    for (let i = 0; i < 128; i++) {
      const val = compact[i] || 0;
      for (let j = 0; j < step; j++) fakeAnalyser._freqData[i * step + j] = val;
    }
    const amp = Math.min(127, Math.round(d.rms * 127));
    for (let i = 0; i < FAKE_BIN_COUNT; i++) {
      fakeAnalyser._timeData[i] = 128 + (i % 2 === 0 ? amp : -amp);
    }
    fakeAnalyser._rms = d.rms || 0;
    fakeAnalyser._bass = d.bass || 0;
    fakeAnalyser._mid = d.mid || 0;
    fakeAnalyser._treble = d.treble || 0;
    fakeAnalyser._lastUpdate = Date.now();
    pageAudioConnected = true;

    // Feed the real playback clock into the lyrics engine.
    if (typeof d.currentTime === "number") {
      lastAudioTime = d.currentTime;
      if (orchestrator && overlay.style.display === "block" &&
          typeof orchestrator.setCurrentTime === "function") {
        orchestrator.setCurrentTime(d.currentTime);
      }
    }
    updateDebugPanel();
  });

  document.addEventListener("__vibeAudioReady", (e) => {
    const d = e.detail;
    if (d?.ok) { pageAudioConnected = true; setDebugStatus("page-audio-ready"); }
    else console.warn(`${BRAND}: page audio not ready:`, d?.reason);
    updateDebugPanel();
  });
  document.addEventListener("__vibeInjected", () => { setDebugStatus("injector-ok"); updateDebugPanel(); });

  function seekSoundCloudAudio(time, source = "unknown") {
    const t = Number(time);
    if (!Number.isFinite(t) || t < 0) return false;

    let sought = false;
    const media = document.querySelector("audio") || document.querySelector("video");
    if (media && typeof media.currentTime === "number") {
      try {
        media.currentTime = t;
        sought = true;
      } catch (_) {}
    }

    // Page-world bridge for cases where isolated-world writes are blocked/ignored.
    try {
      document.dispatchEvent(new CustomEvent("__vibeSeek", {
        detail: { time: t, source }
      }));
      sought = true;
    } catch (_) {}

    if (orchestrator?.setCurrentTime) {
      orchestrator.setCurrentTime(t);
    }
    lastAudioTime = t;
    return sought;
  }

  document.addEventListener("visualizer-seek", (e) => {
    const t = Number(e?.detail?.time);
    if (!Number.isFinite(t)) return;
    seekSoundCloudAudio(t, "lyrics-word-click");
  });

  // ─── Overlay HTML — artwork + metadata on the left, lyrics on the right ──
  function ensureOverlayRoot() {
    let overlayEl = document.getElementById("vibe-fullscreen-player");
    if (overlayEl) return overlayEl;

    const playerHtml = `
      <div id="vibe-fullscreen-player">
        <div id="vibe-visualizer-container"></div>
        <div id="vibe-meta" aria-hidden="true">
          <div id="vibe-meta-art"><img alt="" /></div>
          <div id="vibe-meta-text">
            <div id="vibe-meta-title"></div>
            <div id="vibe-meta-artist"></div>
          </div>
          <a
            id="vibe-meta-brand"
            href="https://github.com/romaniv1437/chromic-engine"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Open Chromic Engine on GitHub"
          >${BRAND} engine</a>
        </div>
      </div>
    `;

    const tpl = document.createElement("template");
    tpl.innerHTML = playerHtml.trim();
    overlayEl = tpl.content.firstElementChild;
    if (!overlayEl) throw new Error("Failed to create overlay root");

    Object.assign(overlayEl.style, {
      position: "fixed",
      inset: "0",
      left: "0",
      top: "0",
      width: "100vw",
      height: "100vh",
      margin: "0",
      padding: "0",
      border: "0",
      zIndex: "2147483646",
      pointerEvents: "auto",
      overflow: "hidden",
      background: "#000",
      contain: "layout style size",
      transform: "translateZ(0)",
      isolation: "isolate",
      display: "none"
    });

    const mountTarget = document.documentElement || document.body;
    mountTarget.appendChild(overlayEl);
    return overlayEl;
  }

  const overlay = ensureOverlayRoot();
  const container = overlay.querySelector("#vibe-visualizer-container");
  Object.assign(container.style, {
    position: "absolute",
    inset: "0",
    left: "0",
    top: "0",
    width: "100%",
    height: "100%",
    margin: "0",
    padding: "0",
    overflow: "hidden",
    pointerEvents: "auto"
  });
  const metaImg   = overlay.querySelector("#vibe-meta-art img");
  const metaTitle = document.getElementById("vibe-meta-title");
  const metaArtist= document.getElementById("vibe-meta-artist");

  let orchestrator      = null;
  let ThreeOrchestratorClass = null;
  let moduleLoadPromise = null;
  let audioNode         = null;
  let lastTrackKey      = "";
  let loadedLyricsKey   = "";
  let lastAudioTime     = 0;
  let dbNextProbeAt     = 0;
  let activeDbSource    = "";
  let loadedLyricsCount = 0;
  let lyricsCache       = {};   // key -> { timeline, artist } (preloaded)
  let lastArtUrl        = "";
  let lastPaletteKey    = "";
  let resizeDbgCount    = 0;

  function isOverlayOpen() {
    return overlay.style.display === "block";
  }

  function syncLaunchButtonsState() {
    const active = isOverlayOpen();
    const buttons = document.querySelectorAll(".vibe-launch-btn");
    buttons.forEach((btn) => {
      btn.setAttribute("aria-pressed", active ? "true" : "false");
      btn.title = `${active ? "Close" : "Open"} ${BRAND} visualizer`;
      btn.classList.toggle("vibe-launch-active", active);
      const label = btn.querySelector(".vibe-launch-label");
      if (label) label.textContent = active ? "Close" : BRAND;
    });
    positionFloatingLaunchButtons();
  }

  function positionFloatingLaunchButtons() {
    const floatingButtons = document.querySelectorAll(".vibe-launch-btn.vibe-floating");
    if (!floatingButtons.length) return;

    const viewportHeight = Math.max(1, window.innerHeight || document.documentElement.clientHeight || 1);
    let bottomOffset = FLOATING_BTN_MARGIN;
    const controls = document.querySelector(".playControls");

    if (controls) {
      const r = controls.getBoundingClientRect();
      const controlsVisible = r.width > 0 && r.height > 0 && r.bottom > 0 && r.top < viewportHeight;
      if (controlsVisible) {
        const overlapZone = Math.max(0, viewportHeight - r.top);
        bottomOffset = Math.max(bottomOffset, overlapZone + FLOATING_BTN_GAP);
      }
    }

    floatingButtons.forEach((btn) => {
      btn.style.setProperty("--vibe-floating-right", `${FLOATING_BTN_MARGIN}px`);
      btn.style.setProperty("--vibe-floating-bottom", `${bottomOffset}px`);
      btn.classList.toggle("vibe-compact", window.innerWidth <= FLOATING_BTN_COMPACT_MAX_WIDTH);
    });
  }

  // ─── Resize — mirror MusicPlayer.js: size the container, let the bundle's own
  // handleResize() do the rest (it uses this.resolutionScale consistently so the
  // shader's u_resolution matches the drawing buffer → centered, full-size). ───
  function getViewportMetrics() {
    const vv = window.visualViewport;
    const w = Math.max(1, Math.round(vv?.width || window.innerWidth || document.documentElement.clientWidth || 1));
    const h = Math.max(1, Math.round(vv?.height || window.innerHeight || document.documentElement.clientHeight || 1));
    return { w, h };
  }

  function syncVisualizerSize() {
    if (!orchestrator || overlay.style.display !== "block") return;
    const { w, h } = getViewportMetrics();
    if (!w || !h) return;
    // Force the container to the exact viewport so container.clientWidth (which
    // handleResize reads) is correct — SoundCloud's layout otherwise reports tiny.
    container.style.width = w + "px";
    container.style.height = h + "px";
    resizeDbgCount += 1;
    const canvas = orchestrator?.renderer?.domElement;
    if (resizeDbgCount <= 6 || (container.clientWidth && container.clientWidth < w * 0.9)) {
      console.log(
        `${BRAND}: syncVisualizerSize #${resizeDbgCount} ` +
        `viewport=${w}x${h} container=${container.clientWidth}x${container.clientHeight} ` +
        `canvas=${canvas?.clientWidth || 0}x${canvas?.clientHeight || 0}`
      );
    }
    if (typeof orchestrator.handleResize === "function") orchestrator.handleResize();
  }

  console.log(`${BRAND}: content loaded v${EXT_VERSION}`);
  setDebugStatus("loaded");

  async function ensureAnalyser() {
    const audio = document.querySelector("audio");
    if (audio && audio !== audioNode) {
      audioNode = audio;
      if (!audio.__vibeTimeHooked) {
        audio.addEventListener("timeupdate", () => {
          if (orchestrator && overlay.style.display === "block") {
            orchestrator.setCurrentTime(audio.currentTime);
          }
        });
        audio.__vibeTimeHooked = true;
      }
    }
    return true;
  }

  async function loadVisualizerModule() {
    if (ThreeOrchestratorClass) return ThreeOrchestratorClass;
    if (!moduleLoadPromise) {
      moduleLoadPromise = import(VIS_MODULE_URL)
        .then((mod) => {
          if (!mod || !mod.ThreeOrchestrator) throw new Error("ThreeOrchestrator export missing");
          ThreeOrchestratorClass = mod.ThreeOrchestrator;
          return ThreeOrchestratorClass;
        })
        .catch((err) => { console.error(`${BRAND}: failed to import visualizer module`, err); throw err; });
    }
    return moduleLoadPromise;
  }

  function getSoundCloudTrackInfo() {
    const titleEl  = document.querySelector(".playbackSoundBadge__titleLink");
    const artistEl = document.querySelector(".playbackSoundBadge__lightLink");
    if (!titleEl) return null;
    return {
      title:  titleEl.getAttribute("title")  || titleEl.textContent.trim(),
      artist: artistEl ? (artistEl.getAttribute("title") || artistEl.textContent.trim()) : "",
    };
  }

  // ─── Artwork URL from the play-bar badge (span.sc-artwork bg-image or img) ─
  function getArtworkUrl() {
    const candidates = [
      ".playbackSoundBadge span.sc-artwork",
      ".playControls__soundBadge span.sc-artwork",
      ".playbackSoundBadge__avatar span.sc-artwork",
      "span.sc-artwork.sc-artwork-4x",
    ];
    for (const sel of candidates) {
      const el = document.querySelector(sel);
      if (!el) continue;
      const bg = getComputedStyle(el).backgroundImage;
      const m = bg && bg.match(/url\(["']?(.*?)["']?\)/);
      if (m && m[1] && m[1] !== "none") {
        // Prefer a larger artwork variant when available (t500x500).
        return m[1].replace(/-t\d+x\d+\./, "-t500x500.");
      }
    }
    const img = document.querySelector(".playbackSoundBadge img, .playControls__soundBadge img");
    if (img && img.src) return img.src.replace(/-t\d+x\d+\./, "-t500x500.");
    return "";
  }

  // ─── Compact palette extractor (port of ColorEngine.extractPalette) ──────
  function extractPalette(pixelData, colorCount = 6) {
    const HUE_BUCKETS = 36;
    const buckets = Array.from({ length: HUE_BUCKETS }, () => ({ r: 0, g: 0, b: 0, count: 0, satSum: 0 }));
    for (let i = 0; i < pixelData.length; i += 4) {
      const r = pixelData[i], g = pixelData[i + 1], b = pixelData[i + 2], a = pixelData[i + 3] / 255;
      if (a < 0.1) continue;
      const max = Math.max(r, g, b), min = Math.min(r, g, b), delta = max - min;
      const sat = max === 0 ? 0 : delta / max;
      const bright = (r + g + b) / 765;
      if (bright < 0.05 || (sat < 0.1 && bright < 0.3)) continue;
      let hue = 0;
      if (delta > 0) {
        if (max === r) hue = ((g - b) / delta) % 6;
        else if (max === g) hue = (b - r) / delta + 2;
        else hue = (r - g) / delta + 4;
        hue = (hue * 60 + 360) % 360;
      }
      const bi = Math.floor(hue / (360 / HUE_BUCKETS)) % HUE_BUCKETS;
      const w = a * (0.3 + sat * 0.7);
      buckets[bi].r += r * w; buckets[bi].g += g * w; buckets[bi].b += b * w;
      buckets[bi].count += w; buckets[bi].satSum += sat * w;
    }
    let sorted = buckets.filter((b) => b.count > 0).map((b) => ({
      r: Math.round(b.r / b.count), g: Math.round(b.g / b.count), b: Math.round(b.b / b.count), weight: b.satSum,
    })).sort((a, b) => b.weight - a.weight).slice(0, colorCount);
    while (sorted.length < 3) sorted.push(sorted[sorted.length - 1] || { r: 90, g: 120, b: 200 });
    return sorted;
  }

  const toHex = (c) => `#${((1 << 24) | (c.r << 16) | (c.g << 8) | (c.b)).toString(16).slice(1)}`;

  // Load artwork, push palette + album art to the orchestrator, fill HTML meta.
  function applyArtwork(force = false) {
    const url = getArtworkUrl();
    if (!url) return;
    if (url !== lastArtUrl) {
      lastArtUrl = url;
      if (metaImg) metaImg.src = url;
    }
    if (!orchestrator) return;
    if (!force && url === lastPaletteKey) return;

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      try {
        const cv = document.createElement("canvas");
        cv.width = 50; cv.height = 50;
        const ctx = cv.getContext("2d", { willReadFrequently: true });
        ctx.drawImage(img, 0, 0, 50, 50);
        const { data } = ctx.getImageData(0, 0, 50, 50);
        const palette = extractPalette(data, 6);
        if (palette.length >= 3 && orchestrator?.setPalette) {
          orchestrator.setPalette([toHex(palette[0]), toHex(palette[1]), toHex(palette[2])]);
          lastPaletteKey = url;
          console.log(`${BRAND}: palette`, palette.slice(0, 3).map(toHex).join(" "));
        }
      } catch (err) {
        console.warn(`${BRAND}: palette extraction failed (CORS?)`, err);
      }
      if (orchestrator?.setAlbumArt) { try { orchestrator.setAlbumArt(url); } catch (_) {} }
    };
    img.onerror = () => console.warn(`${BRAND}: artwork failed to load`, url);
    img.src = url;
  }

  function updateMetaPanel(info) {
    if (!info) return;
    if (metaTitle) metaTitle.textContent = info.title || "";
    if (metaArtist) metaArtist.textContent = info.artist || "";
  }

  function applyDefaultScene() {
    if (!orchestrator || typeof orchestrator.setScene !== "function") return;
    orchestrator.setScene(DEFAULT_SCENE_INDEX);
    // Re-resize immediately so the new scene's u_resolution is correct.
    syncVisualizerSize();
  }

  // Apply the current track to the visualizer (metadata, lyrics, palette).
  function applyCurrentTrack(info, { forceScene = false } = {}) {
    if (!orchestrator || !info) return;
    const key = `${info.artist}::${info.title}`;
    orchestrator.setTrack(info.title, info.artist);
    if (forceScene) applyDefaultScene();
    hideGpuTrackText();
    updateMetaPanel(info);
    applyArtwork(true);

    // Use preloaded lyrics if available.
    const cached = lyricsCache[key];
    if (cached && Array.isArray(cached.timeline)) {
      orchestrator.setLyricsTimeline(cached.timeline, info.artist, "");
      loadedLyricsCount = cached.timeline.length;
      loadedLyricsKey = key;
      orchestrator.setCurrentTime?.(lastAudioTime);
    }
  }

  async function ensureVisualizer() {
    if (orchestrator) return true;
    await ensureAnalyser();
    const Orchestrator = await loadVisualizerModule();
    orchestrator = new Orchestrator({ analyser: fakeAnalyser, container, resolutionScale: 1 });
    console.log(`${BRAND}: ThreeOrchestrator mounted`);
    setDebugStatus("orchestrator-ready");
    suppressGpuTrackText();
    orchestrator.start();
    orchestrator.setUiVisible(true);
    hideGpuTrackText();

    const info = getSoundCloudTrackInfo();
    if (info) {
      lastTrackKey = `${info.artist}::${info.title}`;
      applyCurrentTrack(info, { forceScene: true });
    }
    updateDebugPanel();
    return true;
  }

  function openOverlay() {
    overlay.style.display = "block";
    document.body.classList.add("vibe-open");
    document.documentElement.classList.add("vibe-open");
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";

    const { w, h } = getViewportMetrics();
    container.style.width = w + "px";
    container.style.height = h + "px";

    document.dispatchEvent(new CustomEvent("__vibeRequestStatus"));

    ensureVisualizer()
      .then((ok) => {
        if (!ok) { setDebugStatus("open-wait-audio"); return; }
        setDebugStatus("open-running");

        // 1.2 — restart cleanly from the CURRENT track + time on every (re)open.
        if (typeof orchestrator.start === "function") orchestrator.start();
        const info = getSoundCloudTrackInfo();
        if (info) {
          lastTrackKey = `${info.artist}::${info.title}`;
          applyCurrentTrack(info, { forceScene: true });
        }
        orchestrator.setUiVisible(true);
        hideGpuTrackText();
        orchestrator.setCurrentTime?.(lastAudioTime);

        // Multiple passes to beat SoundCloud's async layout reflows.
        requestAnimationFrame(syncVisualizerSize);
        setTimeout(syncVisualizerSize, 50);
        setTimeout(syncVisualizerSize, 200);
        setTimeout(syncVisualizerSize, 600);

        armIdle();
        updateDebugPanel();
      })
      .catch((err) => console.error(`${BRAND}: open failed`, err));

    syncLaunchButtonsState();
  }

  function closeOverlay() {
    overlay.style.display = "none";
    document.body.classList.remove("vibe-open", "vibe-idle");
    document.documentElement.classList.remove("vibe-open", "vibe-idle");
    document.documentElement.style.overflow = "";
    document.body.style.overflow = "";
    clearTimeout(idleTimer);
    if (orchestrator) orchestrator.stop();
    syncLaunchButtonsState();
  }

  document.addEventListener("keydown", (e) => {
    // Toggle debug overlay with Alt+Shift+D
    if (e.altKey && e.shiftKey && (e.key === "D" || e.key === "d")) {
      e.preventDefault();
      toggleDebug();
      return;
    }
    if (overlay.style.display !== "block") return;
    if (e.key === "Escape") closeOverlay();
  });
  window.addEventListener("resize", syncVisualizerSize, { passive: true });
  window.addEventListener("orientationchange", syncVisualizerSize, { passive: true });
  window.visualViewport?.addEventListener("resize", syncVisualizerSize, { passive: true });
  window.visualViewport?.addEventListener("scroll", syncVisualizerSize, { passive: true });
  window.addEventListener("resize", positionFloatingLaunchButtons, { passive: true });
  window.addEventListener("orientationchange", positionFloatingLaunchButtons, { passive: true });
  window.visualViewport?.addEventListener("resize", positionFloatingLaunchButtons, { passive: true });
  window.visualViewport?.addEventListener("scroll", positionFloatingLaunchButtons, { passive: true });

  // ─── Idle mode (2.5) — hide cursor + chrome, keep artwork/metadata/lyrics ─
  let idleTimer = 0;

  // The bundle's GPU typography renders track metadata bottom-left. We show our
  // own HTML panel instead, so keep that GPU text hidden at all times.
  function suppressGpuTrackText() {
    const gpuText = orchestrator?.gpuTypography;
    if (!gpuText) return;
    if (!gpuText.__vibeSetVisiblePatched && typeof gpuText.setVisible === "function") {
      const originalSetVisible = gpuText.setVisible.bind(gpuText);
      gpuText.setVisible = () => originalSetVisible(false);
      gpuText.__vibeSetVisiblePatched = true;
    }
    try { gpuText.setVisible?.(false); } catch (_) {}
  }

  function hideGpuTrackText() {
    suppressGpuTrackText();
  }

  function goIdle() {
    if (overlay.style.display !== "block") return;
    document.body.classList.add("vibe-idle");
    document.documentElement.classList.add("vibe-idle");
    if (orchestrator) {
      orchestrator.setUiVisible?.(false); // hide on-canvas controls
      hideGpuTrackText();
    }
  }
  function armIdle() {
    document.body.classList.remove("vibe-idle");
    document.documentElement.classList.remove("vibe-idle");
    clearTimeout(idleTimer);
    if (overlay.style.display === "block") {
      if (orchestrator) {
        orchestrator.setUiVisible?.(true);  // show controls again…
        hideGpuTrackText();                 // …but never the bottom-left track text
      }
      idleTimer = window.setTimeout(goIdle, IDLE_MS);
    }
  }
  ["pointermove", "pointerdown", "keydown", "wheel", "touchstart"].forEach((evt) => {
    window.addEventListener(evt, () => { if (overlay.style.display === "block") armIdle(); }, { passive: true });
  });

  // ─── Launch button — compact, fitted inside the play-bar sound badge (2.3) ─
  function createLaunchButton() {
    const btn = document.createElement("button");
    btn.className = "vibe-launch-btn";
    btn.type = "button";
    btn.title = `Open ${BRAND} visualizer`;
    btn.setAttribute("aria-pressed", "false");
    btn.innerHTML = `<span class="vibe-launch-dot"></span><span class="vibe-launch-label">${BRAND}</span>`;
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      if (isOverlayOpen()) closeOverlay();
      else openOverlay();
    });
    return btn;
  }

  function isVisible(el) {
    if (!el) return false;
    const r = el.getBoundingClientRect();
    return r.width > 4 && r.height > 4 && r.bottom > 0 && r.right > 0 &&
           r.top < window.innerHeight && r.left < window.innerWidth;
  }

  function injectLaunchButton() {
    const existing = document.querySelector(".vibe-launch-btn");
    // If a button exists but ended up clipped/invisible (e.g. inside the sound
    // badge), remove it so we can re-home it into a visible container.
    if (existing) {
      if (isVisible(existing)) return;
      existing.remove();
    }

    const btn = createLaunchButton();
    // The right-hand controls group has room and is always visible.
    const target =
      document.querySelector(".playControls__elements") ||
      document.querySelector(".playControls__inner") ||
      document.querySelector(".playControls");
    if (target) {
      target.appendChild(btn);
      syncLaunchButtonsState();
      // Verify it actually rendered visibly; otherwise fall back to floating.
      requestAnimationFrame(() => {
        if (!isVisible(btn)) {
          btn.classList.add("vibe-floating");
          document.body.appendChild(btn);
          syncLaunchButtonsState();
        }
      });
      return;
    }
    btn.classList.add("vibe-floating");
    document.body.appendChild(btn);
    syncLaunchButtonsState();
  }

  // ─── Lyrics preloading + matching (1.3) ──────────────────────────────────
  const cleanStr = (s) => s.replace(/[\u2026\.]{2,}\s*$/, "").replace(/^[\u2026\.\s]+/, "").trim();

  function sourceLabel(url) {
    if (!url) return "none";
    if (url.startsWith(LOCAL_DB_BASE_URL)) return "local-ext";
    if (url.includes("raw.githubusercontent.com")) return "github-raw";
    return "remote";
  }

  async function fetchJsonFromSources(relativePath, sources, opts = {}) {
    const { stopOnHttpResponse = false } = opts;
    const list = Array.isArray(sources) ? sources : [];
    let sawHttpResponse = false;
    for (const base of list) {
      const url = `${base}/${String(relativePath || "").replace(/^\/+/, "")}`;
      try {
        const res = await fetch(url, { cache: "no-store" });
        sawHttpResponse = true;
        if (!res.ok) {
          if (stopOnHttpResponse) {
            return { data: null, base, status: res.status, sawHttpResponse, httpError: true };
          }
          continue;
        }
        const data = await res.json();
        return { data, base, status: res.status, sawHttpResponse, httpError: false };
      } catch (_) {
        // Try next source.
      }
    }
    return { data: null, base: "", status: 0, sawHttpResponse, httpError: false };
  }

  async function findLyricsTimeline(info) {
    if (Date.now() < dbNextProbeAt) return null;

    let indexPayload = await fetchJsonFromSources("index.json", REMOTE_DB_SOURCE_URLS);

    if (!indexPayload.data && ENABLE_LOCAL_DB_FALLBACK && LOCAL_DB_SOURCE_URLS.length) {
      indexPayload = await fetchJsonFromSources("index.json", LOCAL_DB_SOURCE_URLS);
    }

    if (!indexPayload.data) {
      dbNextProbeAt = Date.now() + DB_RETRY_COOLDOWN_MS;
      if (indexPayload.httpError) {
        setDebugStatus(`db-http-${indexPayload.status}`);
      } else {
        setDebugStatus("db-unavailable");
      }
      return null;
    }

    dbNextProbeAt = 0;
    activeDbSource = sourceLabel(indexPayload.base);
    setDebugStatus(`db:${activeDbSource}`);

    const index = indexPayload.data;
    const tracks = Array.isArray(index.tracks) ? index.tracks : [];
    const scTitle  = cleanStr(info.title.toLowerCase());
    const scArtist = cleanStr(info.artist.toLowerCase());

    let best = null, bestScore = 0;
    for (const t of tracks) {
      const tTitle  = cleanStr((t.title  || "").toLowerCase());
      const tArtist = cleanStr((t.artist || "").toLowerCase());
      if (!tTitle || tTitle.length < 3) continue;
      let titleScore = 0;
      if (scTitle === tTitle) titleScore = 100;
      else if (scTitle.includes(tTitle)) titleScore = 60 + tTitle.length;
      else if (tTitle.includes(scTitle) && scTitle.length >= 4) titleScore = 50 + scTitle.length;
      else if (scTitle.length >= 6 && tTitle.length >= 6 &&
        (tTitle.startsWith(scTitle.slice(0, 12)) || scTitle.startsWith(tTitle.slice(0, 12)))) titleScore = 30;
      if (titleScore === 0) continue;
      let artistBonus = 0;
      if (tArtist && scArtist && (scArtist.includes(tArtist) || tArtist.includes(scArtist))) artistBonus = 20;
      const score = titleScore + artistBonus;
      if (score > bestScore) { bestScore = score; best = t; }
    }
    if (!best) return { timeline: null, score: 0, title: null };

    let lyricsPayload = await fetchJsonFromSources(best.file, [indexPayload.base]);
    if (!lyricsPayload.data && ENABLE_LOCAL_DB_FALLBACK && indexPayload.base !== LOCAL_DB_BASE_URL && LOCAL_DB_SOURCE_URLS.length) {
      lyricsPayload = await fetchJsonFromSources(best.file, LOCAL_DB_SOURCE_URLS);
    }
    if (!lyricsPayload.data) return null;
    const timeline = lyricsPayload.data;
    if (!Array.isArray(timeline)) return { timeline: null, score: bestScore, title: best.title };
    return { timeline, score: bestScore, title: best.title };
  }

  async function pollTrackAndLyrics() {
    const info = getSoundCloudTrackInfo();
    if (!info) return;
    const key = `${info.artist}::${info.title}`;

    // Track changed (or first sight): refresh metadata + force lyrics reload.
    if (key !== lastTrackKey) {
      lastTrackKey = key;
      loadedLyricsKey = "";
      loadedLyricsCount = 0;
      updateMetaPanel(info);
      if (orchestrator) {
        orchestrator.setTrack(info.title, info.artist);
        applyDefaultScene();
        orchestrator.setLyricsTimeline?.([], info.artist, "");
        applyArtwork(true);
      }
      updateDebugPanel();
    }

    // Preload/lookup lyrics regardless of whether the overlay is open yet (1.3).
    if (loadedLyricsKey === key) return;
    try {
      const result = await findLyricsTimeline(info);
      if (key !== lastTrackKey) return;     // track switched mid-fetch
      if (!result) return;                  // transient — retry next poll

      if (result.timeline) {
        lyricsCache[key] = { timeline: result.timeline, artist: info.artist };
        loadedLyricsKey = key;
        loadedLyricsCount = result.timeline.length;
        if (orchestrator) {
          orchestrator.setLyricsTimeline(result.timeline, info.artist, "");
          orchestrator.setCurrentTime?.(lastAudioTime);
        }
        console.log(`${BRAND}: lyrics ready "${result.title}" (${result.timeline.length} lines, score ${result.score})`);
        setDebugStatus(`lyrics:${result.timeline.length}`);
      } else {
        // No lyrics for this track — stop re-querying.
        loadedLyricsKey = key;
      }
      updateDebugPanel();
    } catch (_) { /* retry next poll */ }
  }

  function setupAudioTracking() {
    const audio = document.querySelector("audio");
    if (audio && audio !== audioNode) { audioNode = audio; ensureAnalyser(); }
  }

  setInterval(setupAudioTracking,  CHECK_AUDIO_MS);
  setInterval(pollTrackAndLyrics,  TRACK_POLL_MS);
  setInterval(injectLaunchButton,  BUTTON_POLL_MS);
  setInterval(() => { if (overlay.style.display === "block") applyArtwork(false); }, 3000);
  setInterval(updateDebugPanel,    500);

  setupAudioTracking();
  injectLaunchButton();
  pollTrackAndLyrics(); // kick off preloading immediately

  // ─── DEBUG PANEL (hidden by default; Alt+Shift+D) ────────────────────────
  const debugPanel = document.createElement("div");
  debugPanel.id = "vibe-debug-panel";
  debugPanel.style.cssText = [
    "position:fixed", "right:14px", "top:14px", "z-index:2000000",
    "background:rgba(10,10,20,0.92)", "color:#e0e8ff",
    "font:12px/1.6 monospace", "padding:12px 14px",
    "border-radius:10px", "min-width:280px", "max-width:340px",
    "border:1px solid rgba(100,120,255,0.3)",
    "box-shadow:0 4px 24px rgba(0,0,128,0.4)", "display:none",
  ].join(";");
  document.documentElement.appendChild(debugPanel);

  function toggleDebug() {
    debugVisible = !debugVisible;
    dbg.style.display = debugVisible ? "block" : "none";
    debugPanel.style.display = debugVisible ? "block" : "none";
    if (debugVisible) updateDebugPanel();
  }

  function row(label, value, color) {
    return `<div style="display:flex;justify-content:space-between;margin-bottom:2px">
      <span style="color:#8892b0">${label}</span>
      <span style="color:${color || '#cdd6f4'};font-weight:bold">${value}</span>
    </div>`;
  }
  function rmsBar(rms) {
    const pct = Math.min(100, Math.round(rms * 300));
    return `<div style="background:#1a1a2e;border-radius:3px;height:8px;margin:3px 0">
      <div style="background:${pct > 30 ? '#a6e3a1' : pct > 5 ? '#fab387' : '#45475a'};width:${pct}%;height:100%;border-radius:3px;transition:width 0.1s"></div>
    </div>`;
  }

  function updateDebugPanel() {
    if (!debugVisible) return;
    const info = getSoundCloudTrackInfo();
    const audioFlowing = (Date.now() - fakeAnalyser._lastUpdate) < 500 && fakeAnalyser._rms > 0.001;
    const hasTrack = !!info, hasLyrics = loadedLyricsCount > 0, visReady = !!orchestrator;

    let html = `<div style="font-weight:bold;font-size:13px;margin-bottom:8px;color:#cba6f7">🎛️ ${BRAND} ${EXT_VERSION} — Debug</div>`;
    html += `<div style="background:rgba(255,255,255,0.05);border-radius:6px;padding:7px 9px;margin-bottom:8px">`;
    html += row("Page script", pageScriptInjected ? "injected ✅" : "pending…", pageScriptInjected ? "#a6e3a1" : "#f38ba8");
    html += row("Page audio tap", pageAudioConnected ? "connected ✅" : "waiting… ❌", pageAudioConnected ? "#a6e3a1" : "#f38ba8");
    html += row("Playback clock", lastAudioTime > 0 ? `${lastAudioTime.toFixed(1)}s ✅` : "0.0s ⏸", lastAudioTime > 0 ? "#a6e3a1" : "#fab387");
    html += row("Audio flowing", audioFlowing ? "YES ✅" : "silent ❌", audioFlowing ? "#a6e3a1" : "#f38ba8");
    html += row("Visualizer", visReady ? "running ✅" : "not started", visReady ? "#a6e3a1" : "#fab387");
    html += row("Track", hasTrack ? (info.title.slice(0, 22) + (info.title.length > 22 ? "…" : "")) : "none", hasTrack ? "#cba6f7" : "#45475a");
    html += row("Lyrics", hasLyrics ? `${loadedLyricsCount} lines ✅` : "not loaded", hasLyrics ? "#a6e3a1" : "#f38ba8");
    html += row("Palette", lastPaletteKey ? "extracted ✅" : "—", lastPaletteKey ? "#a6e3a1" : "#45475a");
    html += `</div>`;
    if (pageAudioConnected || audioFlowing) {
      html += `<div style="margin-bottom:8px"><div style="font-size:10px;color:#8892b0;margin-bottom:2px">RMS level</div>`;
      html += rmsBar(fakeAnalyser._rms);
      html += `<div style="font-size:10px;color:#6c7086">B:${(fakeAnalyser._bass*100).toFixed(0)}% M:${(fakeAnalyser._mid*100).toFixed(0)}% T:${(fakeAnalyser._treble*100).toFixed(0)}%</div></div>`;
    }
    html += `<div style="margin-top:8px;font-size:9px;color:#45475a">Alt+Shift+D toggles this panel · 1-9 scenes · Esc closes</div>`;
    debugPanel.innerHTML = html;
  }
})();

