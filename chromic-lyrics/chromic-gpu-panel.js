/**
 * ChromicLyrics GPU Panel — Three.js + Troika Text SDF lyrics, 1:1 DOM animation replica.
 * Direct Three.js canvas in DOM, truly transparent background.
 *
 * Toggle: Ctrl+Shift+G
 *
 * HARD RULE: Opacity & color are driven EXCLUSIVELY by Line State (past/active/future).
 * Word types NEVER modulate opacity or brightness — they only do scale, outline glow.
 * Every word in `past` looks identical in brightness. Every word in `future` looks identical.
 *
 * Architecture:
 * ─ Per-word fill: Troika clipRect left→right sweep with ±15% SDF feather (matches DOM ::after mask-image)
 * ─ Line states: active/past/future with scale, opacity, Y offset — exponential lerps
 * ─ Sung/Stretch: whole-word scaleY wave (Gaussian sin arc), NO outline glow
 * ─ Whisper: identical to normal words in GPU renderer (no clean Troika equivalent for CSS drop-shadow)
 * ─ Spoken: identical to normal words — zero scale changes, zero glow
 * ─ Adlib: smaller font (FS×0.88), fly-in from below, two-tier layout
 * ─ Vocal cue dots: 3× CircleGeometry, sequential scale fill, 1.3× boost when active
 * ─ Top/bottom viewport fade (CSS mask on container)
 * ─ Decoupled camera scroll: auto-follow + manual wheel offset
 * ─ Click-to-seek on any word mesh
 *
 * WHY NOT onBeforeCompile SHADER INJECTION:
 * Troika Text generates its own SDF shaders during sync(), overwriting any material.onBeforeCompile
 * set beforehand. Troika's fragment shader has no #include <output_fragment>, and its vertex shader
 * has no plain `void main()`. All visual effects use Troika's native API: clipRect for fill sweep,
 * plus standard Three.js scale/position transforms.
 * BANNED: outlineWidth/outlineColor/outlineOpacity/outlineBlur — creates visible border artifacts.
 */
(async function ChromicLyricsGPUPanel() {
  'use strict';

  const { THREE, Text, EffectComposer, RenderPass, UnrealBloomPass, OutputPass } = await import('/chromic-lyrics/vendor/gpu-deps.bundle.js');

  // ── Font: macOS SF ExtraBold (dev) → Noto Sans Bold (dist) ──
  // SFNS-ExtraBold.ttf = weight 800 extracted from SFNS.ttf variable font via fonttools
  const FONT_PRIMARY  = '/chromic-lyrics/vendor/SFNS.ttf';
  const FONT_FALLBACK = '/chromic-lyrics/vendor/SFNS.ttf';
  let FONT = FONT_FALLBACK;
  let DEBUG = location.search.includes('gpu-debug');
  try {
    const r = await fetch(FONT_PRIMARY, { method: 'HEAD' });
    if (DEBUG) console.log('[GPU DEBUG] Font probe SFNS-ExtraBold.ttf:', r.status, r.ok);
    if (r.ok) FONT = FONT_PRIMARY;
  } catch (err) {
    if (DEBUG) console.warn('[GPU DEBUG] Font probe failed:', err);
  }
  if (DEBUG) console.log('[GPU DEBUG] Using font:', FONT);

  // ═══════════════════════════════════════════════════════════════════════════
  // DESIGN TOKENS — from styles.css
  // ═══════════════════════════════════════════════════════════════════════════
  const UNFILLED = 0.5;   // matches DOM --lyric-unfilled: rgba(255,255,255,0.5)
  const FILLED   = 1.0;
  const FEATHER  = 0.15;  // ±15% feather zone for clipRect fill sweep (DOM: 30% total)
  const TARGET_FONT_PX = 38;
  const FS_AD_R  = 0.65;
  const LINE_H   = 2.0;
  const LINE_M_PX = 56;
  const W_GAP_PX  = 8;
  const LERP     = 5.0;

  // Line states — MATCHING DOM CSS exactly, Y inverted for Three.js
  // .active:         opacity:1,    scale(1.05),  translateY(0)
  // .past:           opacity:0.7,  scale(0.98),  translateY(-4px) ≈ -0.04 scene
  // .past far (>5):  opacity:0.4,  scale(0.96),  blur(0.5px)
  // .future-1:       opacity:0.7,  scale(0.98),  translateY(6px) ≈ 0.06 scene
  // .future-2:       opacity:0.4,  scale(0.95),  translateY(12px) ≈ 0.12 scene
  // .future-3:       opacity:0.2,  scale(0.93),  translateY(16px) ≈ 0.16 scene
  // .future-4:       opacity:0.1,  scale(0.92),  translateY(20px) ≈ 0.20 scene
  // .future:         opacity:0.08, scale(0.92),  translateY(20px) ≈ 0.20 scene, blur(8px)
  // Active line at 75% from top. Below: future-1 (clear), future-2 (slight blur),
  // future-3 (half visible, more blur). Past lines slide up and fade out quickly.
  const S = {
    active:   { op: 1.0,  sc: 1.04, oy: 0,      blur: 0   },
    past:     { op: 0.5,  sc: 0.97, oy: -0.25,  blur: 1   },
    pastFar:  { op: 0.0,  sc: 0.94, oy: -0.5,   blur: 3   },
    future:   { op: 0.0,  sc: 0.88, oy: 0.35,   blur: 8   },
    future1:  { op: 0.75, sc: 0.99, oy: 0.03,   blur: 0   },
    future2:  { op: 0.50, sc: 0.97, oy: 0.06,   blur: 1.5 },
    future3:  { op: 0.25, sc: 0.95, oy: 0.10,   blur: 3.5 },
    future4:  { op: 0.08, sc: 0.93, oy: 0.14,   blur: 6   },
    future5:  { op: 0.0,  sc: 0.91, oy: 0.18,   blur: 8   },
    adlibOn:  { op: 0.6,  sc: 0.92, oy: -0.15,  blur: 0   },
    adlibOff: { op: 0.35, sc: 0.90, oy: -0.1,   blur: 0   },
    adlibHid: { op: 0.0,  sc: 0.88, oy: 0.1,    blur: 0   },
    scroll:   { op: 0.7,  sc: 1.0,  oy: 0,      blur: 0   },
    scrollAct:{ op: 1.0,  sc: 1.0,  oy: 0,      blur: 0   },
    // Paired () echo lines — shown as pair, dimmer but clearly visible, same fill animation
    pairAct:  { op: 1.0,  sc: 0.97, oy: 0,      blur: 0   },
    pairPast: { op: 0.0,  sc: 0.96, oy: -0.25,  blur: 2   },
    pairFut:  { op: 0.0,  sc: 0.90, oy: 0.2,    blur: 6   },
  };

  // ═══════════════════════════════════════════════════════════════════════════
  // STATE
  // ═══════════════════════════════════════════════════════════════════════════
  const PID = 'chromic-gpu-lyrics-panel';
  let panel, canvas, rend, scn, cam, composer, bloomPass;
  let vis = false, rafId = null;
  let lines = [], allE = [], rdy = false;

  // ── Camera scroll: decoupled auto-follow + manual offset ──
  let targetCameraY = 2.8;       // driven by active line position
  let manualScrollOffset = 0;    // driven by mouse wheel
  let cameraY = 2.8;             // actual interpolated camera Y
  let scrollDecayTimer = 0;      // seconds until manual offset starts decaying

  let lastLyricsRef = null;
  let lastLyricsLen = -1;
  let lastLyricsFirst = '';
  let lastTrackPath = '';  // detect track switches even when lyrics ref doesn't change
  let _wGap = 0.1, _lineM = 0.8, _leftEdge = 0;

  // ── Track metadata display (artist + album) ──
  let metaGroup = null;
  let metaArtistMesh = null, metaAlbumMesh = null;
  let metaVisible = false;
  const ALBUM_GLOW_COLOR = 0x7eb8ff; // soft blue glow for album text

  // ═══════════════════════════════════════════════════════════════════════════
  // PANEL — own transparent canvas overlaid on the visualizer container.
  // Separate WebGL context + EffectComposer + bloom. No shared renderer state.
  // ═══════════════════════════════════════════════════════════════════════════
  let _overlayMode = false; // true when panel overlays the visualizer container

  /** Find the visualizer container element (#mathVisualizerContainer) */
  function _getVizContainer() {
    // Try shadow DOM first (MusicPlayer renderRoot)
    const mp = window.musicRuntime;
    if (mp?.getOverlayRoot) {
      const c = mp.getOverlayRoot()?.querySelector('#mathVisualizerContainer');
      if (c) return c;
    }
    // Fallback: document-level
    return document.querySelector('#mathVisualizerContainer');
  }

  function mkPanel() {
    if (document.getElementById(PID)) return;

    // Create panel + own renderer (always — no shared renderer)
    panel = document.createElement('div');
    panel.id = PID;

    // Check if we can overlay the visualizer container
    const vizContainer = _getVizContainer();
    if (vizContainer) {
      // OVERLAY MODE: position absolutely over the right half of the visualizer
      _overlayMode = true;
      Object.assign(panel.style, {
        position: 'absolute',
        top: '0',
        right: '0',
        width: '50%',
        height: '100%',
        overflow: 'hidden',
        display: 'none',
        zIndex: '5',
        pointerEvents: 'auto',
        WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)',
        maskImage: 'linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)',
      });
      // Ensure container has relative positioning for absolute child
      if (getComputedStyle(vizContainer).position === 'static') {
        vizContainer.style.position = 'relative';
      }
      vizContainer.appendChild(panel);
      if (DEBUG) console.log('[GPU Lyrics] Overlay mode — panel inside #mathVisualizerContainer');
    } else {
      // STANDALONE MODE: flex panel beside the DOM lyrics panel
      _overlayMode = false;
      Object.assign(panel.style, {
        position: 'relative',
        flex: '1.4',
        height: '55vh',
        minHeight: '500px',
        maxHeight: '70vh',
        alignSelf: 'center',
        overflow: 'hidden',
        display: 'none',
        paddingLeft: '10px',
        paddingRight: '30px',
        WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)',
        maskImage: 'linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)',
      });
      if (DEBUG) console.log('[GPU Lyrics] Standalone mode — no visualizer container found');
    }

    rend = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    rend.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    rend.setClearColor(0x000000, 0);
    canvas = rend.domElement;
    Object.assign(canvas.style, { width: '100%', height: '100%', display: 'block', background: 'transparent', pointerEvents: 'auto' });
    panel.appendChild(canvas);

    scn = new THREE.Scene();
    cam = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 100);
    cam.position.z = 10;

    // ── Bloom postprocessing — subtle glow on bright elements ──
    const size = rend.getDrawingBufferSize(new THREE.Vector2());
    const renderTarget = new THREE.WebGLRenderTarget(size.x || 256, size.y || 256, {
      type: THREE.HalfFloatType,
      format: THREE.RGBAFormat,
    });
    composer = new EffectComposer(rend, renderTarget);
    const renderPass = new RenderPass(scn, cam);
    renderPass.clearColor = new THREE.Color(0, 0, 0);
    renderPass.clearAlpha = 0;
    composer.addPass(renderPass);
    bloomPass = new UnrealBloomPass(
        new THREE.Vector2(256, 256),
        0.35,   // strength — subtle but visible glow
        0.6,    // radius
        0.85    // threshold — bright pixels bloom
    );
    composer.addPass(bloomPass);
    composer.addPass(new OutputPass());

    // ── Wheel: scroll lyrics. Negate deltaY for natural scroll (macOS default) ──
    // deltaY > 0 = scroll wheel down / trackpad swipe down = show earlier content (camera UP)
    // In our scene Y goes DOWN for later lines, so we SUBTRACT deltaY to follow convention
    panel.addEventListener('wheel', e => {
      e.preventDefault();
      e.stopPropagation();
      manualScrollOffset -= e.deltaY * 0.005;
      scrollDecayTimer = 3.0;
    }, { passive: false });

    // ── Click-to-seek via world Y projection (raycaster unreliable with Troika) ──
    panel.addEventListener('click', ev => {
      if (!rdy || !lines.length) return;
      const rect = canvas.getBoundingClientRect();
      // Convert click to normalized device coords
      const ndcX = ((ev.clientX - rect.left) / rect.width) * 2 - 1;
      const ndcY = -((ev.clientY - rect.top) / rect.height) * 2 + 1;

      // Convert NDC to world coordinates (orthographic)
      const worldX = cam.position.x + ndcX * (cam.right - cam.left) / 2;
      const worldY = cam.position.y + ndcY * (cam.top - cam.bottom) / 2;

      // Find the closest word by checking world positions
      let bestEntry = null, bestDist = Infinity;
      for (const L of lines) {
        // Group world Y = group.position.y, each word's local Y is added
        const groupY = L.group.position.y;
        const groupScale = L._cSc || 1;
        for (const e of L.entries) {
          const wy = groupY + e.base.position.y * groupScale;
          const wx = e.base.position.x * groupScale;
          // Check Y distance (allow generous vertical hitbox)
          const dy = Math.abs(worldY - wy);
          if (dy > L.fs * 1.2) continue;
          // Check X: must be within word bounds
          const wordLeft = wx;
          const wordRight = wx + e._w;
          if (worldX >= wordLeft - 0.05 && worldX <= wordRight + 0.05) {
            const dist = dy + Math.abs(worldX - (wordLeft + wordRight) / 2) * 0.3;
            if (dist < bestDist) { bestDist = dist; bestEntry = e; }
          }
        }
      }

      if (bestEntry && bestEntry.start != null) {
        manualScrollOffset = 0;
        scrollDecayTimer = 0;
        const a = getAudio();
        if (a) a.currentTime = bestEntry.start;
        bestEntry._clickFlash = 1.0;
        // Update active line — camera will follow via doScroll lerp
        _lastActiveIdx = bestEntry.li;
        if (DEBUG) console.log('[GPU] Seek to word', bestEntry.t, 'at', bestEntry.start.toFixed(2));
        return;
      }

      // Fallback: find closest line by world Y
      let closest = 0, minDist = Infinity;
      for (let i = 0; i < lines.length; i++) {
        const dist = Math.abs(lines[i]._baseY + (lines[i]._cOy || 0) - worldY);
        if (dist < minDist) { minDist = dist; closest = i; }
      }
      manualScrollOffset = 0;
      scrollDecayTimer = 0;
      const a = getAudio();
      if (a) a.currentTime = lines[closest].ld.start;
      _lastActiveIdx = closest;
      if (DEBUG) console.log('[GPU] Seek to line', closest, 'at', lines[closest].ld.start.toFixed(2));
    });
    canvas.style.cursor = 'pointer';
  }

  function resize() {
    if (!rend || !panel) return;
    const w = panel.clientWidth;
    const h = panel.clientHeight;
    if (w < 10 || h < 10) return;
    rend.setSize(w, h);
    if (composer) composer.setSize(w, h);
    const a = w / h, vh = 6;
    cam.left = -vh * a / 2; cam.right = vh * a / 2;
    cam.top = vh / 2; cam.bottom = -vh / 2;
    cam.updateProjectionMatrix();
    if (rdy) doLayout();
  }

  function getAudio() {
    return window.musicRuntime?.audioEngine?.audioElement || document.querySelector('audio') || document.getElementById('globalAudio');
  }
  function getLyrics() { const l = window.musicRuntime?.currentLyrics; return Array.isArray(l) ? l : null; }

  // ═══════════════════════════════════════════════════════════════════════════
  // BUILD SCENE
  // ═══════════════════════════════════════════════════════════════════════════
  function wt(w) { return w.stretch ? 'stretch' : w.sung ? 'sung' : w.spoken ? 'spoken' : w.whisper ? 'whisper' : 'normal'; }

  function build(raw) {
    for (const L of lines) { scn.remove(L.group); for (const e of L.entries) { if (e._isCueDot) { e.base.material?.dispose(); e.fill.material?.dispose(); } else if (e._isCharSplit) { for (const cm of e._chars) { cm.base.dispose(); cm.fill.dispose(); } } else { e.base.dispose(); e.fill.dispose(); } } }
    lines = []; allE = []; rdy = false;

    // Separate vocal cues and lyric lines
    const allLines = raw.filter(l => l.type === 'vocal_cue' || l.words?.length || l.text);
    const src = [];

    // Pre-process: synthesize words, compute end times, include vocal cues as dot lines
    for (let i = 0; i < allLines.length; i++) {
      const sl = allLines[i];
      const nextStart = allLines[i + 1] ? (+allLines[i + 1].time || 999) : (+sl.time || 0) + 5;

      if (sl.type === 'vocal_cue') {
        // Vocal cue: render as three dots "•  •  •" — normal size, fill sequentially
        const cueStart = +sl.time || +sl.start || 0;
        const cueEnd = +sl.end || Math.min(nextStart - 0.1, cueStart + 5);
        src.push({
          ...sl,
          _isCue: true,
          time: cueStart,
          end: cueEnd,
          words: [
            { word: '•', start: cueStart, end: cueStart + (cueEnd - cueStart) * 0.33 },
            { word: '•', start: cueStart + (cueEnd - cueStart) * 0.33, end: cueStart + (cueEnd - cueStart) * 0.66 },
            { word: '•', start: cueStart + (cueEnd - cueStart) * 0.66, end: cueEnd },
          ],
        });
        continue;
      }

      // Synthesize words from text if missing
      if (!sl.words || !sl.words.length) {
        const text = sl.text || '';
        const tokens = text.split(/\s+/).filter(Boolean);
        if (!tokens.length) continue;
        const lineStart = +sl.time || 0;
        const lineEnd = +sl.end || Math.min(nextStart - 0.1, lineStart + 5);
        const wordDur = (lineEnd - lineStart) / tokens.length;
        sl.words = tokens.map((word, wi) => ({
          word,
          start: lineStart + wi * wordDur,
          end: lineStart + (wi + 1) * wordDur,
        }));
      }

      // Ensure line has end time (compute from last word or next line)
      if (!sl.end) {
        const lastW = sl.words[sl.words.length - 1];
        sl.end = lastW ? +lastW.end : Math.min(nextStart - 0.1, (+sl.time || 0) + 3);
      }
      src.push(sl);
    }

    if (!src.length) return;

    const vh = cam.top - cam.bottom;
    const panelPx = panel ? panel.clientHeight : 626;
    const pxToScene = vh / panelPx;
    const FS = TARGET_FONT_PX * pxToScene;
    const FS_AD = FS * FS_AD_R;
    const W_GAP = W_GAP_PX * pxToScene;
    const LINE_M = LINE_M_PX * pxToScene;
    _wGap = W_GAP;
    _lineM = LINE_M;

    if (DEBUG) console.log('[GPU DEBUG] Layout:', { panelPx, pxToScene, FS, vh, camW: cam.right - cam.left });

    let sN = 0, sD = 0;
    for (let li = 0; li < src.length; li++) {
      const sl = src[li];
      const isCue = !!sl._isCue;
      const allAdlib = !isCue && ((sl.words || []).every(w => w.adlib) || !!sl.adlib);
      const hasInlineAdlibs = !isCue && !allAdlib && (sl.words || []).some(w => w.adlib);
      const fs = isCue ? FS : allAdlib ? FS_AD : FS;
      const g = new THREE.Group();
      scn.add(g);
      const entries = [];
      const ld = { start: +sl.time || +sl.words[0]?.start || 0, end: +sl.end };

      if (isCue) {
        // ── CUE DOTS: actual circles (14px = matching DOM .dot { width:14px; height:14px }) ──
        const dotRadius = 7 * pxToScene; // 14px diameter → 7px radius
        const dotGap = 15 * pxToScene;   // DOM: gap: 15px
        const circleGeo = new THREE.CircleGeometry(dotRadius, 32);

        for (let wi = 0; wi < 3; wi++) {
          const w = sl.words[wi];

          // Base circle — dim unfilled background (DOM: rgba(255,255,255,0.1))
          const baseMat = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.1 });
          const base = new THREE.Mesh(circleGeo, baseMat);
          g.add(base);

          // Fill circle — bright white, starts at scale 0 (DOM: ::after with width var)
          const fillMat = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 1.0 });
          const fill = new THREE.Mesh(circleGeo, fillMat);
          fill.scale.set(0, 0, 1);
          g.add(fill);

          entries.push({
            base, fill, start: w.start, end: w.end, t: '•', li, wi,
            ad: false, wt: 'normal',
            _w: dotRadius * 2, _p: 0, _pp: 0,
            _wave: 0, _glow: 0,
            _cop: 1, _tOp: 1,
            _scX: 1, _scY: 1,
            _adReveal: 0, _adBaseY: 0,
            _clickFlash: 0, _whisperFloat: 0, _spokenSnap: 0,
            _isCueDot: true,
            _dotRadius: dotRadius,
          });
          allE.push(entries[entries.length - 1]);
          // Cue dots don't need sync — geometry is immediate
        }

        lines.push({
          group: g, entries, ld, ad: false, hasInlineAdlibs: false, isCue: true, fs,
          _baseY: 0,
          _cOp: S.future.op, _cSc: S.future.sc, _cOy: S.future.oy, _cBlur: S.future.blur,
          _tOp: S.future.op, _tSc: S.future.sc, _tOy: S.future.oy, _tBlur: S.future.blur,
        });
        continue;
      }

      for (let wi = 0; wi < sl.words.length; wi++) {
        const w = sl.words[wi];
        const t = w.word || w.text || '';
        const isAd = !!w.adlib || allAdlib;

        const wordType = wt(w);
        const wordFs = isAd && !allAdlib ? FS_AD : fs;
        const isSungStretch = (wordType === 'sung' || wordType === 'stretch');

        if (isSungStretch && t.length > 1 && !allAdlib) {
          // ── SUNG/STRETCH: per-character meshes for traveling wave animation ──
          // 3-layer architecture: base (dim) → glow (white core + blur) → fill (sharp opaque)
          const chars = t.split('');
          const charMeshes = [];
          for (let ci = 0; ci < chars.length; ci++) {
            const ch = chars[ci];
            const cBase = new Text();
            cBase.text = ch; cBase.font = FONT; cBase.fontSize = wordFs;
            cBase.anchorX = 'left'; cBase.anchorY = 'middle';
            cBase.color = 0xffffff; cBase.transparent = true;
            cBase.sdfGlyphSize = 64; cBase.gpuAccelerateSDF = true;
            g.add(cBase);

            const cFill = new Text();
            cFill.text = ch; cFill.font = FONT; cFill.fontSize = wordFs;
            cFill.anchorX = 'left'; cFill.anchorY = 'middle';
            cFill.color = 0xffffff; cFill.transparent = true;
            cFill.sdfGlyphSize = 64; cFill.gpuAccelerateSDF = true;
            g.add(cFill);

            charMeshes.push({ base: cBase, fill: cFill, idx: ci });
            sN += 2;
          }

          // Use first char's base/fill as the "representative" for layout & click detection
          const entryRef = {
            base: charMeshes[0].base, fill: charMeshes[0].fill,
            start: w.start, end: w.end, t, li, wi,
            ad: isAd, wt: wordType,
            _w: 0, _p: 0,
            _cop: 1, _tOp: 1,
            _scX: 1, _scY: 1,
            _wave: 0, _glow: 0,
            _adReveal: 0, _adBaseY: 0, _clickFlash: 0,
            _isCharSplit: true,       // flag: this word has per-char meshes
            _chars: charMeshes,       // array of {base, fill, idx}
            _charWidths: [],          // populated after sync
            _charCount: chars.length,
          };

          for (const cm of charMeshes) {
            cm.base.userData = { startTime: w.start, lineIndex: li, entry: entryRef };
            cm.fill.userData = { startTime: w.start, lineIndex: li, entry: entryRef };
          }

          entries.push(entryRef);
          allE.push(entryRef);
        } else {
          // ── NORMAL / SPOKEN / WHISPER / ADLIB / single-char sung: standard 2-mesh word ──
          const base = new Text();
          base.text = t; base.font = FONT; base.fontSize = wordFs;
          base.anchorX = 'left'; base.anchorY = 'middle';
          base.color = 0xffffff; base.transparent = true;
          base.sdfGlyphSize = 64; base.gpuAccelerateSDF = true;
          g.add(base);

          const fill = new Text();
          fill.text = t; fill.font = FONT; fill.fontSize = wordFs;
          fill.anchorX = 'left'; fill.anchorY = 'middle';
          fill.color = 0xffffff; fill.transparent = true;
          fill.sdfGlyphSize = 64; fill.gpuAccelerateSDF = true;
          fill.clipRect = [-10, -10, -10, 10];
          g.add(fill);

          const entryRef = {
            base, fill, start: w.start, end: w.end, t, li, wi,
            ad: isAd, wt: wordType,
            _w: 0, _p: 0,
            _cop: 1, _tOp: 1,
            _scX: 1, _scY: 1,
            _wave: 0, _glow: 0,
            _adReveal: 0, _adBaseY: 0, _clickFlash: 0,
          };

          base.userData = { startTime: w.start, lineIndex: li, entry: entryRef };
          fill.userData = { startTime: w.start, lineIndex: li, entry: entryRef };

          if (DEBUG && li === 0 && wi === 0) {
            console.log('[GPU DEBUG] First word mesh:', { text: t, font: FONT, fontSize: wordFs });
          }
          entries.push(entryRef);
          allE.push(entryRef);
          sN += 2;
        }
      }
      // ── Group consecutive adlib words into phrases ──
      const adPhrases = []; // [{words: [entry...], start, end, totalW}]
      if (hasInlineAdlibs) {
        let curPhrase = null;
        for (const e of entries) {
          if (e.ad) {
            if (!curPhrase) curPhrase = { words: [], start: Infinity, end: 0, totalW: 0 };
            curPhrase.words.push(e);
            curPhrase.start = Math.min(curPhrase.start, e.start);
            curPhrase.end = Math.max(curPhrase.end, e.end);
            curPhrase.totalW += e._w + _wGap;
          } else {
            if (curPhrase) { curPhrase.totalW -= _wGap; adPhrases.push(curPhrase); curPhrase = null; }
          }
        }
        if (curPhrase) { curPhrase.totalW -= _wGap; adPhrases.push(curPhrase); }
        // Tag each adlib entry with its phrase index
        for (let pi = 0; pi < adPhrases.length; pi++) {
          for (const e of adPhrases[pi].words) e._adPhraseIdx = pi;
        }
      }

      lines.push({
        group: g, entries, ld, ad: allAdlib, hasInlineAdlibs, isCue, fs,
        _baseY: 0,
        _cOp: S.future.op, _cSc: S.future.sc, _cOy: S.future.oy, _cBlur: S.future.blur,
        _tOp: S.future.op, _tSc: S.future.sc, _tOy: S.future.oy, _tBlur: S.future.blur,
        _adPhrases: adPhrases,
        _adLastEnd: adPhrases.length ? Math.max(...adPhrases.map(p => p.end)) : 0,
        _adPhraseReveal: 0,
      });
    }

    // ── Pair consecutive parenthesized lines: show 2 at a time, scroll away together ──
    // Detect lines whose text starts with "(" — these are echo/bg vocal lines.
    // Group consecutive () lines into pairs (groups of 2). When one is active, both are shown.
    for (let i = 0; i < lines.length; i++) {
      const text = lines[i].entries.map(e => e.t).join(' ');
      if (text.startsWith('(') && i + 1 < lines.length) {
        const nextText = lines[i + 1].entries.map(e => e.t).join(' ');
        if (nextText.startsWith('(')) {
          // These two form a pair — tag them
          lines[i]._pairWith = i + 1;    // first line points to second
          lines[i + 1]._pairWith = i;    // second line points to first
          lines[i]._pairRole = 'first';
          lines[i + 1]._pairRole = 'second';
          i++; // skip the second line of the pair (don't pair it again with the next)
        }
      }
    }
    if (DEBUG) {
      const pairs = lines.filter(L => L._pairWith != null);
      if (pairs.length) console.log('[GPU DEBUG] Found', pairs.length / 2, 'line pairs for simultaneous display');
    }

    const onSync = () => {
      if (++sD >= sN) {
        doLayout(); rdy = true;
        if (DEBUG) {
          console.log('[GPU DEBUG] All meshes synced:', sN, 'words,', lines.length, 'lines');
          for (let i = 0; i < Math.min(5, lines.length); i++) {
            console.log('[GPU DEBUG] Line %d: start=%.2f end=%.2f baseY=%.2f text="%s"',
                i, lines[i].ld.start, lines[i].ld.end, lines[i]._baseY,
                lines[i].entries.map(e => e.t).join(' ').substring(0, 60));
          }
        }
      }
    };
    for (const L of lines) for (const e of L.entries) {
      if (e._isCueDot) { sD += 2; onSync(); onSync(); }
      else if (e._isCharSplit) { for (const cm of e._chars) { cm.base.sync(onSync); cm.fill.sync(onSync); } }
      else { e.base.sync(onSync); e.fill.sync(onSync); }
    }
    buildMeta();
  }

  /** Position per-char meshes within a char-split word entry */
  function layoutChars(e, wordX, wordY) {
    if (!e._isCharSplit) return;
    let cx = wordX;
    for (let i = 0; i < e._chars.length; i++) {
      const cm = e._chars[i];
      const cw = e._charWidths[i] || 0;
      cm.base.position.x = cx;
      cm.base.position.y = wordY;
      cm.fill.position.x = cx;
      cm.fill.position.y = wordY;
      cx += cw;
    }
  }

  function doLayout() {
    const cW = cam.right - cam.left;
    const leftEdge = cam.left + cW * 0.05;
    _leftEdge = leftEdge;
    const maxWidth = cW * 0.88;
    let y = 2.8;
    let wrappedCount = 0;

    for (const L of lines) {
      if (L.isCue) {
        // Cue dots: positioned exactly like a text line would be
        // Use leftEdge for x (same as where text words start)
        const dotGap = 15 * (cam.top - cam.bottom) / (panel ? panel.clientHeight : 626);
        const r = L.entries[0]?._dotRadius || 0.05;
        // Dot at same x as text words (leftEdge) so scaling doesn't misalign
        let x = leftEdge;
        for (const e of L.entries) {
          e.base.position.set(x, 0, 0);
          e.fill.position.set(x, 0, 0);
          e._adBaseY = 0;
          x += r * 2 + dotGap;
        }
        // Same vertical placement as normal lines
        L.group.position.set(0, y, 0);
        L._baseY = y;
        const rowHeight = L.fs * LINE_H;
        y -= rowHeight + _lineM;
        continue;
      }

      for (const e of L.entries) {
        if (e._isCharSplit) {
          // Measure each char and compute total word width
          let totalW = 0;
          e._charWidths = [];
          for (const cm of e._chars) {
            const b = cm.base.textRenderInfo?.blockBounds;
            const cw = b ? (b[2] - b[0]) : L.fs * 0.5;
            e._charWidths.push(cw);
            totalW += cw;
          }
          e._w = totalW;
        } else {
          const b = e.base.textRenderInfo?.blockBounds;
          e._w = b ? (b[2] - b[0]) : e.t.length * L.fs * 0.5;
        }
      }

      const rowHeight = L.fs * LINE_H;

      if (L.hasInlineAdlibs) {
        const mainWords = L.entries.filter(e => !e.ad);
        const adlibWords = L.entries.filter(e => e.ad);

        // Layout main words with wrapping
        let x = leftEdge;
        let rowY = 0;
        for (const e of mainWords) {
          if (x + e._w > leftEdge + maxWidth && x > leftEdge + 0.01) {
            x = leftEdge;
            rowY -= rowHeight;
            wrappedCount++;
          }
          e.base.position.x = x;
          e.base.position.y = rowY;
          e.fill.position.x = x;
          e.fill.position.y = rowY;
          e._adBaseY = rowY;  // CRITICAL: track layout Y for baseline pinning during animation
          if (e._isCharSplit) layoutChars(e, x, rowY);
          x += e._w + _wGap;
        }

        // Adlib row: left-aligned, snug under main text baseline, smaller font
        // rowY is the top of the lowest main row, text hangs DOWN from rowY
        // Place adlibs just below the text with minimal gap
        const adGap = L.fs * 0.15; // small gap relative to font size
        const adRowY = rowY - L.fs - adGap; // just below the main text baseline

        const adFs = L.fs * FS_AD_R;
        const adRowHeight = adFs * LINE_H;
        // Left-align: start at same left edge as main words
        let adX = leftEdge;
        for (const e of adlibWords) {
          e.base.position.x = adX;
          e.base.position.y = adRowY;
          e.fill.position.x = adX;
          e.fill.position.y = adRowY;
          e._adBaseY = adRowY;
          e._adBaseX = adX; // save for animation
          if (e._isCharSplit) layoutChars(e, adX, adRowY);
          adX += e._w + _wGap;
        }

        L.group.position.set(0, y, 0);
        L._baseY = y;
        // Total height = main words ONLY — adlib row doesn't add height (like DOM position:absolute)
        const totalHeight = Math.abs(rowY) + rowHeight;
        if (DEBUG) console.log('[GPU ADLIB LAYOUT] line=%d text="%s" rowY=%.3f adRowY=%.3f totalH=%.3f rowH=%.3f adRowH=%.3f mainWords=%d adWords=%d y=%.3f',
            lines.length, mainWords.map(e=>e.t).join(' ').substring(0, 40), rowY, adRowY, totalHeight, rowHeight, adRowHeight, mainWords.length, adlibWords.length, y);
        y -= totalHeight + _lineM;
      } else {
        let x = leftEdge;
        let rowY = 0;
        for (const e of L.entries) {
          if (x + e._w > leftEdge + maxWidth && x > leftEdge + 0.01) {
            x = leftEdge;
            rowY -= rowHeight;
            wrappedCount++;
          }
          e.base.position.x = x;
          e.base.position.y = rowY;
          e.fill.position.x = x;
          e.fill.position.y = rowY;
          e._adBaseY = rowY;
          if (e._isCharSplit) layoutChars(e, x, rowY);
          x += e._w + _wGap;
        }

        L.group.position.set(0, y, 0);
        L._baseY = y;
        const totalHeight = Math.abs(rowY) + rowHeight;
        // Paired lines: tight within pair, extra gap between pairs
        let margin;
        if (L._pairRole === 'first') {
          margin = _lineM * 0.3; // tight gap within pair
        } else if (L._pairRole === 'second') {
          margin = _lineM * 1.4; // extra gap after pair
        } else {
          margin = L.ad ? _lineM * 0.15 : _lineM;
        }
        y -= totalHeight + margin;
      }
    }
    if (DEBUG) console.log('[GPU DEBUG] doLayout done:', { cW, maxWidth, wrappedCount, leftEdge });
    // DEBUG: log cue dot vs text alignment
    if (DEBUG) for (let i = 0; i < lines.length; i++) {
      const L = lines[i];
      if (L.isCue && lines[i+1]) {
        const dotX = L.entries[0]?.base.position.x;
        const nextLine = lines[i+1];
        const textX = nextLine.entries[0]?.base.position.x;
        const dotWorldX = dotX * L._cSc;
        const textWorldX = textX * nextLine._cSc;
        console.log('[DOT ALIGN]', { dotX, textX, dotWorldX, textWorldX, dotScale: L._cSc, textScale: nextLine._cSc, leftEdge, r: L.entries[0]?._dotRadius });
      }
    }
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // TRACK METADATA — artist name + album name with glow
  // ═══════════════════════════════════════════════════════════════════════════
  function buildMeta() {
    if (metaGroup) { scn.remove(metaGroup); metaGroup = null; }
    const track = window.musicRuntime?.currentTrack;
    const artist = track?.artist || track?.albumArtist || '';
    const album = track?.album || '';
    if (!artist && !album) { metaVisible = false; return; }

    const vh = cam.top - cam.bottom;
    const panelPx = panel ? panel.clientHeight : 626;
    const pxToScene = vh / panelPx;
    const cW = cam.right - cam.left;
    const leftEdge = cam.left + cW * 0.04;

    metaGroup = new THREE.Group();
    scn.add(metaGroup);

    // Artist mesh
    const artistFs = 22 * pxToScene;
    metaArtistMesh = new Text();
    metaArtistMesh.text = artist;
    metaArtistMesh.font = FONT;
    metaArtistMesh.fontSize = artistFs;
    metaArtistMesh.anchorX = 'left';
    metaArtistMesh.anchorY = 'bottom';
    metaArtistMesh.color = 0xffffff;
    metaArtistMesh.sdfGlyphSize = 64;
    metaArtistMesh.position.x = leftEdge;
    metaArtistMesh.position.y = 0;
    metaGroup.add(metaArtistMesh);

    // Album mesh — with outline glow in album color
    const albumFs = 18 * pxToScene;
    metaAlbumMesh = new Text();
    metaAlbumMesh.text = album;
    metaAlbumMesh.font = FONT;
    metaAlbumMesh.fontSize = albumFs;
    metaAlbumMesh.anchorX = 'left';
    metaAlbumMesh.anchorY = 'top';
    metaAlbumMesh.color = ALBUM_GLOW_COLOR;
    // FORBIDDEN: outlineWidth causes border artifacts. No outline on any Troika Text mesh.
    metaAlbumMesh.sdfGlyphSize = 64;
    metaAlbumMesh.position.x = leftEdge;
    metaAlbumMesh.position.y = -0.06;
    metaGroup.add(metaAlbumMesh);

    metaVisible = true;
    metaArtistMesh.sync(() => {});
    metaAlbumMesh.sync(() => {});
  }

  function updateMeta() {
    if (!metaGroup || !metaVisible) return;
    // Position above all lyrics — follow camera so it stays at top of viewport
    const topY = cam.position.y + (cam.top - cam.bottom) * 0.38;
    metaGroup.position.y = topY;
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // ANIMATION ENGINE — full per-frame update
  // ═══════════════════════════════════════════════════════════════════════════
  function lineState(li, ai, ad, isScrolling) {
    // During manual scroll: all lines become equally visible (matches DOM .is-scrolling-active)
    if (isScrolling) {
      return li === ai ? S.scrollAct : S.scroll;
    }
    if (ad) { return li === ai ? S.adlibOn : li < ai ? S.adlibOff : S.adlibHid; }
    if (li === ai) return S.active;
    if (li < ai) return (ai - li > 2) ? S.pastFar : S.past;
    const d = li - ai;
    return d === 1 ? S.future1 : d === 2 ? S.future2 : d === 3 ? S.future3 : d === 4 ? S.future4 : d === 5 ? S.future5 : S.future;
  }

  let _time = 0;
  let _lastActiveIdx = 0;
  let _lastCt = 0; // track previous currentTime to detect seeks

  function animate(ct, dt) {
    _time += dt;

    // Detect seek: if time jumped significantly (>0.5s backward or >2s forward)
    const timeDelta = ct - _lastCt;
    const didSeek = timeDelta < -0.3 || timeDelta > 2.0;
    _lastCt = ct;

    // On seek: instantly reset all word/line lerped states
    if (didSeek) {
      for (const L of lines) {
        const targetSt = lineState(L.entries[0]?.li ?? 0, _lastActiveIdx, L.ad, false);
        L._cOp = targetSt.op; L._cSc = targetSt.sc; L._cOy = targetSt.oy; L._cBlur = targetSt.blur;
        for (const e of L.entries) {
          e._p = 0;
          e._cop = L._cOp;
          e._clickFlash = 0;
          e._adReveal = 0;
          e._scX = 1; e._scY = 1;
          e._wave = 0; e._glow = 0;
          if (e._isCharSplit) {
            for (const cm of e._chars) {
              cm.base.scale.set(1, 1, 1);
              cm.fill.scale.set(1, 1, 1);
              cm.fill.material.opacity = 0;
            }
          } else if (!e._isCueDot) {
            e.fill.clipRect = [-10, -10, -9.99, 10];
          }
        }
      }
    }

    // Are we in manual scroll mode? (like DOM .is-scrolling-active)
    const isScrolling = scrollDecayTimer > 0;

    // Find active line + handle paired () lines.
    let ai = -1;
    let _activeSet = null;

    // Step 1: find the primary active line (the one whose range contains current time)
    for (let i = 0; i < lines.length; i++) {
      const ld = lines[i].ld;
      if (ct >= ld.start && ct <= ld.end) {
        if (ai === -1) ai = i;
      }
    }
    // Fallback: use small lookahead for gaps between lines
    if (ai === -1) {
      for (let i = 0; i < lines.length; i++) {
        const ld = lines[i].ld;
        if (ct >= ld.start - 0.15 && ct <= ld.end + 0.15) {
          ai = i;
          break;
        }
      }
    }
    // If no exact match, find the line we're closest to (between lines)
    if (ai === -1 && lines.length > 0) {
      if (ct > lines[lines.length - 1].ld.end + 0.5) {
        ai = lines.length - 1;
      } else if (ct < lines[0].ld.start - 0.5) {
        ai = 0;
      } else {
        for (let i = 0; i < lines.length - 1; i++) {
          if (ct > lines[i].ld.end && ct < lines[i + 1].ld.start) {
            const gap = lines[i + 1].ld.start - lines[i].ld.end;
            const elapsed = ct - lines[i].ld.end;
            ai = elapsed < gap * 0.6 ? i : i + 1;
            break;
          }
        }
      }
    }
    if (ai === -1) ai = _lastActiveIdx;

    // Step 2: NOW that ai is determined, build _activeSet with pairs and overlaps
    _activeSet = new Set([ai]);
    if (ai >= 0 && ai < lines.length) {
      const aLd = lines[ai].ld;

      // Check for paired () lines — if active line has a pair partner, include it
      const pairIdx = lines[ai]._pairWith;
      if (pairIdx != null && pairIdx >= 0 && pairIdx < lines.length) {
        _activeSet.add(pairIdx);
        const pairEnd = Math.max(aLd.end, lines[pairIdx].ld.end);
        if (ct <= pairEnd + 0.1) {
          ai = Math.min(ai, pairIdx); // first of pair is scroll anchor
        }
      }

      // Also check for true time-range overlaps
      for (let i = 0; i < lines.length; i++) {
        if (_activeSet.has(i)) continue;
        const bLd = lines[i].ld;
        const overlapDur = Math.min(aLd.end, bLd.end) - Math.max(aLd.start, bLd.start);
        if (overlapDur > 0.05) {
          _activeSet.add(i);
        }
      }

      // If multiple active, keep first as scroll anchor until all finish
      if (_activeSet.size > 1) {
        let maxEnd = 0;
        for (const idx of _activeSet) maxEnd = Math.max(maxEnd, lines[idx].ld.end);
        if (ct <= maxEnd + 0.1) {
          ai = Math.min(..._activeSet);
        } else {
          _activeSet = new Set([ai]);
        }
      }
    }
    _lastActiveIdx = ai;

    // Debug: log ALL lines with adlib info every 2 seconds
    if (DEBUG && Math.floor(_time) % 2 === 0 && Math.floor(_time) !== Math.floor(_time - dt)) {
      console.log('[GPU-ADLIB] ═══ t=%.2f ai=%d ═══', ct, ai);
      for (let i = 0; i < lines.length; i++) {
        const L = lines[i];
        if (L.isCue) continue;
        const state = i === ai ? 'ACTIVE' : i < ai ? 'past' : 'future';
        const adlibWords = L.entries.filter(e => e.ad);
        const text = L.entries.map(e => e.t).join(' ').substring(0, 50);
        const hasAd = adlibWords.length > 0;
        if (!hasAd && Math.abs(i - ai) > 3) continue; // skip distant non-adlib lines
        let adInfo = '';
        if (hasAd) {
          const adTexts = adlibWords.map(e => `"${e.t}" cop=${e._cop.toFixed(3)} tOp=${e._tOp.toFixed(3)} baseOp=${e.base?.material?.opacity?.toFixed(3)||'?'}`).join(', ');
          adInfo = ` AD[${L.ad?'FULL':'inline'}]: phraseReveal=${(L._adPhraseReveal||0).toFixed(3)} phraseStart=${(L._adPhraseStart||0).toFixed(2)} phraseEnd=${(L._adPhraseEnd||0).toFixed(2)} words={${adTexts}}`;
        }
        console.log('[GPU-ADLIB] L%d %s op=%.3f text="%s"%s', i, state, L._cOp, text, adInfo);
      }
    }

    const f = 1 - Math.exp(-LERP * dt);
    const fSlow = 1 - Math.exp(-2.5 * dt);
    const fSnap = 1 - Math.exp(-12 * dt);

    for (let li = 0; li < lines.length; li++) {
      const L = lines[li];
      // When multiple lines are active simultaneously (overlapping timestamps),
      // treat all of them as active for rendering (full opacity, fill, no blur)
      const isInActiveSet = _activeSet && _activeSet.has(li);
      const isPaired = (L._pairWith != null);
      // Paired () lines: treat as normal lines (not adlib) for state/opacity — they scroll normally
      const st = isInActiveSet ? S.active : lineState(li, ai, isPaired ? false : L.ad, isScrolling);
      const isPast = (!isInActiveSet && li < ai);
      const isFuture = (!isInActiveSet && li > ai);
      const isActive = (li === ai || isInActiveSet);

      // ── Line-level lerps with staggered scroll for cascading effect ──
      L._tOp = st.op; L._tSc = st.sc; L._tOy = st.oy; L._tBlur = st.blur;
      L._cOp += (L._tOp - L._cOp) * f;
      L._cSc += (L._tSc - L._cSc) * f;
      L._cBlur += (L._tBlur - L._cBlur) * f;
      // Staggered Y: future-1 moves gently (smooth transition to active),
      // further future lines snap faster, past lines exit quickly
      const delta = li - ai;
      let staggerF;
      if (delta <= 0) {
        // Past lines + active: fast exit/settle
        staggerF = f * 1.2;
      } else if (delta === 1) {
        // Future-1: smooth gentle approach to becoming active
        staggerF = f * 0.7;
      } else {
        // Future-2+: progressively faster — they rearrange quickly
        staggerF = f * Math.min(1.5, 0.8 + delta * 0.15);
      }
      L._cOy += (L._tOy - L._cOy) * staggerF;

      L.group.scale.set(L._cSc, L._cSc, 1);
      L.group.position.x = _leftEdge * (1 - L._cSc);
      L.group.position.y = L._baseY + L._cOy;

      // ── Adlib phrase reveal — no longer at line level ──

      // ── Per-word animations ──
      // For paired () lines: compute LINE-LEVEL fill progress for smooth sweep
      // instead of per-word (which is too fast when word durations are tiny)
      let _lineP = 0; // 0→1 progress across entire line
      if (isPaired) {
        const lStart = L.ld.start, lEnd = L.ld.end;
        if (ct >= lEnd) _lineP = 1;
        else if (ct >= lStart) _lineP = (ct - lStart) / (lEnd - lStart);
        else _lineP = 0;
      }

      for (const e of L.entries) {
        // Fill progress 0→1
        if (ct >= e.end)       e._p = 1;
        else if (ct >= e.start) e._p = Math.min(1, (ct - e.start) / (e.end - e.start));
        else                    e._p = 0;

        const isFilling = (e._p > 0 && e._p < 1);
        const isFilled = (e._p >= 1);
        const isStretch = (e.wt === 'stretch' || e.wt === 'sung');
        const isWhisper = (e.wt === 'whisper');

        // ── LINE OPACITY — UNIFIED for all word types (EXCEPT adlibs — handled separately) ──
        // Paired () lines: treat words as non-adlib for opacity (they scroll like normal lines)
        if (!e.ad || isPaired) {
          e._tOp = L._cOp;
          e._cop += (e._tOp - e._cop) * f;
        }

        // ── CLICK FLASH decay ──
        if (e._clickFlash > 0.01) {
          e._clickFlash *= (1 - fSnap);
        } else {
          e._clickFlash = 0;
        }

        // ── CUE DOTS ──
        if (L.isCue && e._isCueDot) {
          if (isActive) {
            if (e._p > 0) {
              e.base.material.opacity = (0.1 + 0.9 * e._p) * e._cop;
              const dotSc = isFilling ? 1.3 : 1.0;
              e.fill.scale.set(e._p, e._p, 1);
              e.base.scale.set(dotSc, dotSc, 1);
              e.fill.material.opacity = e._p * e._cop;
            } else {
              e.base.material.opacity = 0.1 * e._cop;
              e.fill.scale.set(0, 0, 1);
              e.base.scale.set(1, 1, 1);
              e.fill.material.opacity = 0;
            }
          } else if (isPast) {
            const elapsed = ct - L.ld.end;
            const exitT = Math.min(1, elapsed / 0.8);
            const glow = Math.max(0, 1 - exitT);
            e.base.material.opacity = e._cop * glow;
            e.fill.material.opacity = e._cop * glow;
            e.fill.scale.set(1, 1, 1);
            e.base.scale.set(1, 1, 1);
          } else {
            e.base.material.opacity = 0.1 * e._cop;
            e.fill.scale.set(0, 0, 1);
            e.base.scale.set(1, 1, 1);
            e.fill.material.opacity = 0;
          }
          continue;
        }

        // ── ADLIB on non-active line: smooth fade-out (fast, ~150ms) ──
        // Skip for paired () lines — they use normal line opacity
        if (e.ad && !isActive && !isPaired) {
          e._tOp = 0.0;
          e._cop += (e._tOp - e._cop) * fSnap; // fast lerp for snappy fade-out
          if (e._cop < 0.01) e._cop = 0;
          if (e._isCharSplit) {
            for (const cm of e._chars) {
              cm.base.material.opacity = UNFILLED * e._cop;
              cm.fill.material.opacity = FILLED * e._cop;
            }
          } else if (!e._isCueDot) {
            e.base.material.opacity = UNFILLED * e._cop;
            e.fill.material.opacity = FILLED * e._cop;
          }
        }

        // ── CHAR-SPLIT SUNG/STRETCH: per-character wave animation ──
        // Wave starts BEFORE word via extended progress (matches DOM pad=2 behavior)
        // Plus white glow (text-shadow equivalent) via fill color boost + opacity pulse
        if (e._isCharSplit) {
          const n = e._charCount;
          const wordDur = e.end - e.start;
          // Extended progress: wave starts just slightly before word (5% preroll)
          const preroll = wordDur * 0.05;
          const extStart = e.start - preroll;
          const extEnd = e.end + preroll;
          const extDur = extEnd - extStart;
          const extP = extDur > 0 ? Math.max(0, Math.min(1, (ct - extStart) / extDur)) : 0;
          const rawP = e._p; // original 0-1 for fill clipRect (unchanged)

          // Wave center with smoothstep and pad=2 (matches DOM exactly)
          const smoothP = extP * extP * (3 - 2 * extP);
          const pad = 2;
          const waveCenter = -pad + smoothP * (n - 1 + 2 * pad);
          const sigma = 1.8;

          // Cumulative char widths for clipRect-based fill sweep (like normal words)
          let cumW = 0;
          const charXOffsets = [];
          for (let ci = 0; ci < n; ci++) {
            charXOffsets.push(cumW);
            cumW += e._charWidths[ci] || L.fs * 0.5;
          }
          const totalW = cumW;
          // Current fill position (same math as normal word clipRect)
          const fillX = totalW * rawP;
          const feather = totalW * FEATHER;

          for (let ci = 0; ci < n; ci++) {
            const cm = e._chars[ci];
            const cw = e._charWidths[ci] || L.fs * 0.5;
            const charStartX = charXOffsets[ci];
            const charEndX = charStartX + cw;

            // Gaussian wave weight for this char (uses extended progress so wave rolls in early)
            const dist = ci - waveCenter;
            const isWaving = (extP > 0 && extP < 1);
            const wave = isWaving ? Math.exp(-(dist * dist) / (2 * sigma * sigma)) : 0;

            // Base mesh: always unfilled opacity (same as normal words)
            // Paired lines: apply same dimming as normal words
            const charPairDim = (isPaired && isActive) ? 0.7 : 1.0;
            cm.base.material.opacity = UNFILLED * e._cop * charPairDim;

            // Fill mesh: clipRect-based sweep (identical logic to normal words)
            if (isPast || isFilled) {
              // Fully filled
              cm.fill.material.opacity = FILLED * e._cop * charPairDim;
              if (cm.fill.clipRect) cm.fill.clipRect = null;
            } else if (rawP <= 0) {
              // Not started
              cm.fill.material.opacity = FILLED * e._cop * charPairDim;
              cm.fill.clipRect = [-10, -10, -9.99, 10];
            } else {
              // Filling: clip relative to char's local origin (anchorX='left')
              cm.fill.material.opacity = FILLED * e._cop * charPairDim;
              const localClip = fillX + feather - charStartX;
              if (localClip <= 0) {
                cm.fill.clipRect = [-10, -10, -9.99, 10]; // fully hidden
              } else if (localClip >= cw) {
                if (cm.fill.clipRect) cm.fill.clipRect = null; // fully shown
              } else {
                cm.fill.clipRect = [-0.01, -10, localClip, 10];
              }
            }

            // Per-char vertical stretch — grow upward only (pin bottom edge)
            const scY = 1 + 0.14 * wave;
            const scX = 1 + 0.05 * wave;
            cm.base.scale.set(scX, scY, 1);
            cm.fill.scale.set(scX, scY, 1);
            const yUp = (scY - 1) * L.fs * 0.5;
            cm.base.position.y = e._adBaseY + yUp;
            cm.fill.position.y = e._adBaseY + yUp;

            // Track peak wave for bloom postprocessing
            if (wave > e._glow) e._glow = wave;
            else e._glow *= 0.92;

            // BLOOM: boost fill color to HDR (>1.0) during wave — triggers visualizer's bloom
            if (bloomPass && wave > 0.05) {
              const boost = 1.0 + 1.5 * wave; // up to 2.5x brightness at wave peak
              cm.fill.color = new THREE.Color(boost, boost, boost);
            } else {
              cm.fill.color = 0xffffff;
            }
          }

          // ── CHAR-SPLIT ADLIB: phrase-grouped reveal ──
          if (e.ad && L.hasInlineAdlibs) {
            const phrases = L._adPhrases;
            const pi = e._adPhraseIdx || 0;
            const phrase = phrases[pi];
            const lastEnd = L._adLastEnd;
            const timeUntil = phrase.start - ct;
            let phraseVisible = (!isActive && ct > lastEnd) ? false : (ct >= phrase.start - 0.3);
            if (!phraseVisible) {
              e._tOp = 0.0;
            } else if (timeUntil > 0 && timeUntil <= 0.3) {
              const inT = 1 - (timeUntil / 0.3);
              e._tOp = inT * inT * 0.4 * L._cOp;
            } else {
              e._tOp = 0.45 * L._cOp;
            }
            const adF = (e._tOp < e._cop) ? fSnap : f;
            e._cop += (e._tOp - e._cop) * adF;
            if (e._cop < 0.01) e._cop = 0;
            for (const cm of e._chars) {
              cm.base.material.opacity = UNFILLED * e._cop;
              cm.fill.material.opacity = FILLED * e._cop;
            }
          }

          continue; // skip normal word processing below
        }

        // ── WORD BRIGHTNESS — base=unfilled, fill=bright ──
        // Paired lines: dimmer fill (0.7x) but base text clearly visible
        const pairDim = (isPaired && isActive) ? 0.7 : 1.0;
        const baseOpacity = UNFILLED * e._cop * pairDim;
        let fillOpacity = FILLED * e._cop * pairDim;
        if (e._clickFlash > 0) fillOpacity = Math.min(1, fillOpacity + 0.5 * e._clickFlash);

        e.base.material.opacity = baseOpacity;
        e.fill.material.opacity = fillOpacity;

        // ── FILL SWEEP via Troika clipRect (matches DOM ::after mask-image) ──
        if (isPast || isFilled) {
          e.fill.clipRect = [-10, -10, 100, 10];
        } else if (isPaired && isActive) {
          // Paired () lines: line-level fill sweep for smooth animation
          // Calculate how far the sweep has reached relative to this word's position
          if (_lineP >= 1) {
            e.fill.clipRect = [-10, -10, 100, 10];
          } else if (_lineP <= 0) {
            e.fill.clipRect = [-10, -10, -9.99, 10];
          } else {
            // Total line width = last word's right edge
            const lastE = L.entries[L.entries.length - 1];
            const lineWidth = (lastE.base.position.x - L.entries[0].base.position.x) + lastE._w;
            const sweepX = L.entries[0].base.position.x + lineWidth * _lineP;
            const feather = lineWidth * FEATHER;
            // clipRect is in the word's LOCAL space (anchorX='left')
            const wordX = e.base.position.x;
            const localClip = sweepX + feather - wordX;
            if (localClip <= 0) {
              e.fill.clipRect = [-10, -10, -9.99, 10];
            } else if (localClip >= e._w) {
              e.fill.clipRect = [-10, -10, 100, 10];
            } else {
              e.fill.clipRect = [-0.01, -10, localClip, 10];
            }
          }
        } else if (e._p <= 0) {
          e.fill.clipRect = [-10, -10, -9.99, 10];
        } else {
          // ±15% feather — Troika SDF naturally softens the clip edge
          const clipX = e._w * e._p;
          const feather = e._w * FEATHER;
          e.fill.clipRect = [-0.01, -10, clipX + feather, 10];
        }

        // ── SUNG/STRETCH — wave with small pre-roll + glow ──
        if (isStretch) {
          const wordDur = e.end - e.start;
          const preroll = wordDur * 0.05;
          const extStart = e.start - preroll;
          const isExtActive = (ct >= extStart && ct < e.end + preroll);
          if (isExtActive) {
            const extP = (ct - extStart) / (e.end + preroll - extStart);
            const waveTarget = Math.sin(extP * Math.PI);
            e._wave += (waveTarget - e._wave) * f;
          } else {
            e._wave += (0 - e._wave) * fSlow;
          }
        } else {
          e._wave += (0 - e._wave) * fSlow;
        }

        // ── WHISPER — NO special visual in GPU renderer (matches DOM: only active drop-shadow) ──
        // FORBIDDEN: outlineWidth causes visible border artifacts on all Troika text.
        // Whisper words look identical to normal words. The DOM drop-shadow effect
        // has no clean Troika equivalent without outlineWidth artifacts.

        // ── STRETCH/SUNG — scaleY wave only, NO outline glow ──
        // FORBIDDEN: outlineWidth on Troika Text meshes is permanently banned.
        // It creates visible border outlines instead of soft glow.

        // ── SCALE — sung/stretch scaleY wave + Unreal-style bloom halo ──
        let tScX = 1, tScY = 1;
        if (e._wave > 0.01) {
          tScY = 1 + 0.14 * e._wave;
          tScX = 1 + 0.05 * e._wave;
          e._glow += (e._wave - e._glow) * 0.18;
        } else {
          e._glow *= 0.94;
          if (e._glow < 0.005) e._glow = 0;
        }
        // Unreal Engine-style bloom halo: wide soft blur + bright core boost
        if (e._glow > 0.005) {
          const g = e._glow;
          const g2 = g * g; // quadratic falloff for more dramatic peaks
          // Wide diffuse halo — like Unreal bloom threshold
          e.fill.outlineWidth = L.fs * 0.055 * g;
          e.fill.outlineColor = 0xccddff;
          e.fill.outlineOpacity = Math.min(1.0, 0.9 * g2 * e._cop);
          // Very wide blur for the ethereal halo spread
          e.fill.outlineBlur = L.fs * 0.18 * g;
          // Bright core intensity boost (like bloom intensity multiplier)
          e.fill.material.opacity = Math.min(1.0, e.fill.material.opacity * (1.0 + 1.5 * g2));
        } else {
          e.fill.outlineWidth = 0;
          e.fill.outlineOpacity = 0;
          e.fill.outlineBlur = 0;
        }
        e._scX += (tScX - e._scX) * f;
        e._scY += (tScY - e._scY) * f;
        e.base.scale.set(e._scX, e._scY, 1);
        e.fill.scale.set(e._scX, e._scY, 1);

        // ── PIN BASELINE — scale grows upward from baseline (matches DOM transform-origin: bottom) ──
        if (!e.ad || !L.hasInlineAdlibs) {
          const baseLayoutY = e._adBaseY;
          const yCompensation = (e._scY - 1) * L.fs * 0.5;
          e.base.position.y = baseLayoutY + yCompensation;
          e.fill.position.y = baseLayoutY + yCompensation;
        }

        // ── INLINE ADLIB — phrase-grouped reveal, right-aligned, fade together ──
        if (e.ad && L.hasInlineAdlibs) {
          const phrases = L._adPhrases;
          const pi = e._adPhraseIdx || 0;
          const phrase = phrases[pi];
          const lastEnd = L._adLastEnd; // latest adlib end in this line

          // Phrase appears 300ms before its start, stays visible until line changes
          const timeUntil = phrase.start - ct;
          let phraseVisible;
          if (!isActive && ct > lastEnd) {
            // Line no longer active AND all adlibs done — fade out
            phraseVisible = false;
          } else if (ct >= phrase.start - 0.3) {
            // From 300ms before phrase start onwards — visible
            phraseVisible = true;
          } else {
            phraseVisible = false;
          }

          // Opacity target
          if (!phraseVisible) {
            e._tOp = 0.0;
          } else if (timeUntil > 0 && timeUntil <= 0.3) {
            // Fading in
            const inT = 1 - (timeUntil / 0.3);
            e._tOp = inT * inT * 0.4 * L._cOp;
          } else {
            // Fully visible (during and after playing, until line changes)
            e._tOp = 0.45 * L._cOp;
          }

          // Use fast lerp for fade-out when line changes, normal for fade-in
          const adF = (e._tOp < e._cop) ? fSnap : f;
          e._cop += (e._tOp - e._cop) * adF;
          if (e._cop < 0.01) e._cop = 0;

          e.base.position.y = e._adBaseY;
          e.fill.position.y = e._adBaseY;
          e.base.material.opacity = UNFILLED * e._cop;
          e.fill.material.opacity = FILLED * e._cop;
          // Fill sweep
          if (isPast || isFilled) {
            e.fill.clipRect = [-10, -10, 100, 10];
          } else if (e._p <= 0) {
            e.fill.clipRect = [-10, -10, -9.99, 10];
          } else {
            const clipX = e._w * e._p;
            const feather = e._w * FEATHER;
            e.fill.clipRect = [-0.01, -10, clipX + feather, 10];
          }
        } else if (e.ad && L.ad) {
          // Full adlib line — per-word timing + fill sweep
          const timeUntil = e.start - ct;
          if (ct > e.end) {
            const elapsed = ct - e.end;
            const fadeOut = Math.max(0, 1 - elapsed / 0.25);
            e._tOp = fadeOut * 0.35 * L._cOp;
          } else if (e._p > 0) {
            e._tOp = 0.4 * L._cOp;
          } else if (timeUntil <= 0.35 && timeUntil > 0) {
            const inT = 1 - (timeUntil / 0.35);
            e._tOp = inT * inT * 0.3 * L._cOp;
          } else {
            e._tOp = 0.0;
          }
          e._cop += (e._tOp - e._cop) * f;
          if (e._cop < 0.01) e._cop = 0;
          e.base.position.y += (e._adBaseY - e.base.position.y) * f;
          e.fill.position.y = e.base.position.y;
          e.base.material.opacity = UNFILLED * e._cop;
          e.fill.material.opacity = FILLED * e._cop;
          // Fill sweep
          if (isPast || isFilled) {
            e.fill.clipRect = [-10, -10, 100, 10];
          } else if (e._p <= 0) {
            e.fill.clipRect = [-10, -10, -9.99, 10];
          } else {
            const clipX = e._w * e._p;
            const feather = e._w * FEATHER;
            e.fill.clipRect = [-0.01, -10, clipX + feather, 10];
          }
        }
      }
    }
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // CAMERA SCROLL — decoupled auto-follow + manual offset
  // ═══════════════════════════════════════════════════════════════════════════
  function doScroll(ct, dt) {
    // 1. Target camera so active line sits at ~25% from top
    // Viewport = 6 units (top=3, bottom=-3). Active line at 25% from top = 1.5 units below cam.top
    // So camera should be 1.5 units BELOW the active line's _baseY
    if (lines.length > 0 && _lastActiveIdx >= 0 && _lastActiveIdx < lines.length) {
      targetCameraY = lines[_lastActiveIdx]._baseY - 1.5;
    }

    // 2. Decay manual scroll offset
    if (scrollDecayTimer > 0) {
      scrollDecayTimer -= dt;
    } else {
      manualScrollOffset *= 0.95;
      if (Math.abs(manualScrollOffset) < 0.01) manualScrollOffset = 0;
    }

    // 3. Combine and lerp camera to final position
    const finalY = targetCameraY + manualScrollOffset;
    const scrollLerp = 1 - Math.exp(-3.5 * dt);
    cameraY += (finalY - cameraY) * scrollLerp;
    cam.position.y = cameraY;
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // RENDER LOOP
  // ═══════════════════════════════════════════════════════════════════════════
  let prev = 0;
  function tick(now) {
    if (!vis) { rafId = null; return; }
    rafId = requestAnimationFrame(tick);
    const dt = Math.min((now - prev) / 1000, 0.1);
    prev = now;

    const lyrics = getLyrics();
    const currentTrackPath = window.musicRuntime?.currentTrack?.path || window.musicRuntime?.currentTrack?.src || '';
    const trackChanged = currentTrackPath !== lastTrackPath && currentTrackPath !== '';
    if (lyrics) {
      const refChanged = lyrics !== lastLyricsRef;
      const lenChanged = lyrics.length !== lastLyricsLen;
      const firstChanged = (lyrics[0]?.text || '') !== lastLyricsFirst;
      if (refChanged || lenChanged || firstChanged || trackChanged) {
        lastLyricsRef = lyrics;
        lastLyricsLen = lyrics.length;
        lastLyricsFirst = lyrics[0]?.text || '';
        lastTrackPath = currentTrackPath;
        // Reset camera on track switch
        cameraY = 2.8; targetCameraY = 2.8; manualScrollOffset = 0; scrollDecayTimer = 0;
        build(lyrics);
      }
    } else if (trackChanged && currentTrackPath) {
      // Track changed but lyrics not ready yet — clear old scene, will rebuild when lyrics arrive
      lastTrackPath = currentTrackPath;
      lastLyricsRef = null;
      lastLyricsLen = -1;
      lastLyricsFirst = '';
      for (const L of lines) { scn.remove(L.group); for (const e of L.entries) { if (e._isCueDot) { e.base.material?.dispose(); e.fill.material?.dispose(); } else if (e._isCharSplit) { for (const cm of e._chars) { cm.base.dispose(); cm.fill.dispose(); } } else { e.base.dispose(); e.fill.dispose(); } } }
      lines = []; allE = []; rdy = false;
    } else if (lastLyricsRef !== null && !lyrics) {
      lastLyricsRef = null;
      lastLyricsLen = -1;
      lastLyricsFirst = '';
      for (const L of lines) { scn.remove(L.group); for (const e of L.entries) { if (e._isCueDot) { e.base.material?.dispose(); e.fill.material?.dispose(); } else if (e._isCharSplit) { for (const cm of e._chars) { cm.base.dispose(); cm.fill.dispose(); } } else { e.base.dispose(); e.fill.dispose(); } } }
      lines = []; allE = []; rdy = false;
    }

    if (rdy) {
      const ct = getAudio()?.currentTime || 0;
      animate(ct, dt);
      doScroll(ct, dt);
      updateMeta();
      updateHud(ct);
    }
    // Render lyrics with own EffectComposer (bloom)
    if (composer) {
      composer.render();
    } else {
      rend.render(scn, cam);
    }
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // PERFORMANCE HUD — visible when ?gpu-debug is in URL
  // ═══════════════════════════════════════════════════════════════════════════
  let hudEl = null;
  let hudFrames = 0, hudLastTime = 0, hudFps = 0;

  function mkHud() {
    if (!DEBUG || hudEl) return;
    hudEl = document.createElement('div');
    hudEl.id = 'chromic-gpu-hud';
    Object.assign(hudEl.style, {
      position: 'absolute', top: '8px', right: '8px', zIndex: '9999',
      background: 'rgba(0,0,0,0.75)', color: '#0f0', fontFamily: 'monospace',
      fontSize: '11px', padding: '6px 10px', borderRadius: '6px',
      pointerEvents: 'none', lineHeight: '1.5', whiteSpace: 'pre',
    });
    panel.appendChild(hudEl);
  }

  function updateHud(ct) {
    if (!hudEl) return;
    hudFrames++;
    const now = performance.now();
    if (now - hudLastTime >= 1000) {
      hudFps = hudFrames;
      hudFrames = 0;
      hudLastTime = now;
    }
    const L = lines[_lastActiveIdx];
    const ri = rend.info.render;
    const filling = L ? L.entries.find(e => !e._isCueDot && e._p > 0 && e._p < 1) : null;
    const wordTypes = L ? [...new Set(L.entries.filter(e => !e._isCueDot).map(e => e.wt))].join(',') : '-';
    hudEl.textContent =
        `GPU Lyrics HUD\n` +
        `FPS: ${hudFps} | Lines: ${lines.length} | Words: ${allE.length}\n` +
        `Active: ${_lastActiveIdx}/${lines.length} t=${ct.toFixed(1)}s\n` +
        `Line: op=${L?._cOp.toFixed(2)} sc=${L?._cSc.toFixed(2)} blur=${L?._cBlur.toFixed(1)} types=[${wordTypes}]\n` +
        `Fill: "${filling?.t || '-'}" p=${(filling?._p || 0).toFixed(2)} wave=${(filling?._wave || 0).toFixed(3)}\n` +
        `GL: ${ri.calls} calls, ${ri.triangles} tris, ${ri.points} pts\n` +
        `Cam: Y=${cameraY.toFixed(2)} scroll=${manualScrollOffset.toFixed(2)}`;
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // TOGGLE — GPU panel replaces DOM lyrics when overlay is open
  // ═══════════════════════════════════════════════════════════════════════════
  function toggle(forceState) {
    if (!panel) mkPanel();
    if (forceState !== undefined) vis = forceState;
    else vis = !vis;

    const shell = document.querySelector('.music-immersive-shell');
    if (!shell) { vis = false; return; }

    if (vis) {
      // Try to upgrade to overlay mode if we started in standalone
      if (!_overlayMode && panel) {
        const vizContainer = _getVizContainer();
        if (vizContainer) {
          _overlayMode = true;
          Object.assign(panel.style, {
            position: 'absolute', top: '0', right: '0',
            width: '50%', height: '100%',
            overflow: 'hidden', zIndex: '5', pointerEvents: 'auto',
            flex: '', minHeight: '', maxHeight: '', alignSelf: '',
            paddingLeft: '', paddingRight: '',
          });
          if (getComputedStyle(vizContainer).position === 'static') {
            vizContainer.style.position = 'relative';
          }
          vizContainer.appendChild(panel);
          if (DEBUG) console.log('[GPU Lyrics] Upgraded to overlay mode');
        }
      }

      if (_overlayMode) {
        // Overlay mode: panel is already inside #mathVisualizerContainer
        panel.style.display = 'block';
      } else {
        // Standalone mode: insert panel into shell
        const lp = shell.querySelector('.music-immersive-lyrics-panel');
        if (lp && lp.nextSibling) shell.insertBefore(panel, lp.nextSibling);
        else shell.appendChild(panel);
        panel.style.display = 'block';
        panel.style.flex = '1.4';
      }

      // Hide DOM lyrics panel — GPU panel takes over lyrics rendering
      const lp2 = shell.querySelector('.music-immersive-lyrics-panel');
      if (lp2) { lp2.dataset.gpuHidden = '1'; lp2.style.display = 'none'; }

      requestAnimationFrame(() => {
        resize();
        mkHud();
        const lyrics = getLyrics();
        if (lyrics?.length) { lastLyricsRef = lyrics; lastLyricsLen = lyrics.length; lastLyricsFirst = lyrics[0]?.text || ''; build(lyrics); }
        prev = performance.now();
        if (!rafId) rafId = requestAnimationFrame(tick);
      });
    } else {
      if (panel) panel.style.display = 'none';
      if (rafId) { cancelAnimationFrame(rafId); rafId = null; }
      // Restore DOM lyrics panel
      const lp = shell.querySelector('.music-immersive-lyrics-panel');
      if (lp && lp.dataset.gpuHidden) { lp.style.display = ''; delete lp.dataset.gpuHidden; }
      if (lp) { lp.style.flex = ''; lp.style.transition = ''; }
    }
  }

  // ── Auto-activate: observe overlay open/close to auto-toggle GPU panel ──
  let _autoObserver = null;
  function setupAutoActivation() {
    // Watch for overlay open (body class or attribute changes)
    const checkOverlay = () => {
      const shell = document.querySelector('.music-immersive-shell');
      const overlayOpen = shell && shell.offsetParent !== null;
      if (overlayOpen && !vis) {
        toggle(true);
      } else if (!overlayOpen && vis) {
        toggle(false);
      }
    };
    // Poll — MutationObserver on body for class/style changes
    _autoObserver = new MutationObserver(checkOverlay);
    _autoObserver.observe(document.body, { attributes: true, childList: true, subtree: true, attributeFilter: ['class', 'style'] });
    // Also check periodically for edge cases
    setInterval(checkOverlay, 500);
  }
  setupAutoActivation();

  new ResizeObserver(() => { if (vis) resize(); }).observe(document.body);
  document.addEventListener('keydown', e => {
    // Ctrl+Shift+G — manual toggle (override auto-activation)
    if (e.ctrlKey && e.shiftKey && (e.key === 'G' || e.key === 'g' || e.code === 'KeyG')) {
      e.preventDefault(); toggle();
    }
    // Ctrl+Shift+D — toggle GPU debug HUD + console logging
    if (e.ctrlKey && e.shiftKey && (e.key === 'D' || e.key === 'd' || e.code === 'KeyD')) {
      e.preventDefault();
      DEBUG = !DEBUG;
      if (DEBUG && vis && panel) { mkHud(); }
      if (!DEBUG && hudEl) { hudEl.remove(); hudEl = null; }
      console.log('[ChromicLyrics GPU] Debug', DEBUG ? 'ON (Ctrl+Shift+D)' : 'OFF');
    }
  });
  console.log('[ChromicLyrics GPU] Panel loaded — auto-activates on overlay open (Ctrl+Shift+G to toggle manually)');
})();
