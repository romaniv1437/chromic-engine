import * as THREE from 'three';
import { Text } from 'troika-three-text';
// ── Design tokens — scaled for OrthoCam(-1,1,1,-1) viewport ──
// Default: NotoSans-Bold (bundled, open-source). SFNS-ExtraBold used locally if present (gitignored).
const FONT_FALLBACK = '/chromic-lyrics/vendor/NotoSans-Bold.ttf';
const FONT_PRIMARY = '/chromic-lyrics/vendor/SFNS-ExtraBold.ttf';
let FONT = FONT_FALLBACK;
// Probe for SFNS-ExtraBold (patched locally via scripts/patch-font.sh)
try {
    fetch(FONT_PRIMARY, { method: 'HEAD' }).then(r => { if (r.ok)
        FONT = FONT_PRIMARY; });
}
catch (_) { }
// CJK fallback: Troika's unicode-font-resolver CDN will auto-fetch bold CJK glyphs
const UNICODE_FONTS_URL = 'https://cdn.jsdelivr.net/gh/lojjic/unicode-font-resolver@v1.0.1/packages/data';
const UNFILLED = 0.5;
const FILLED = 1.0;
const FEATHER = 0.15;
const FONT_SIZE = 0.09; // ~9% of viewport height — readable
const FS_AD_RATIO = 0.65;
const LINE_HEIGHT = 0.14; // line spacing
const WORD_GAP = 0.018;
const LERP_SPEED = 5.0;
const Z_DEPTH = 0;
const LINE_H = 1.35; // row height multiplier for wrapped lines within a single lyric line
const ALBUM_GLOW_COLOR = 0x7eb8ff; // soft blue glow for album text
// Text occupies right ~50% of viewport (x: 0.0 to 0.95)
const TEXT_LEFT = 0.0;
const TEXT_MAX_WIDTH = 0.9;
// Active line position in NDC — shifts based on whether controls are visible
const ACTIVE_LINE_Y_CONTROLS = 0.3; // controls visible: shifted up to make room
const ACTIVE_LINE_Y_IDLE = 0.25; // idle/zen mode: slightly above center
// Line state system — from chromic-gpu-panel.js golden code
// GPU panel uses ~6-unit world space, we use 2-unit NDC. Y offsets scaled by 2/6 ≈ 0.333
// Opacity and scale values are identical (dimensionless)
// NOTE: GPU panel hides future5/future with op=0 because their large Y offsets push them
// off-screen. In our compact NDC space, lines stack close — give minimum opacity so they
// fade progressively instead of being invisible gaps.
const S = {
    active: { op: 1.0, sc: 1.04, oy: 0 },
    // Past lines: vanish immediately — zero opacity target, fast lerp does the rest
    past: { op: 0.0, sc: 0.93, oy: 0.06 },
    pastFar: { op: 0.0, sc: 0.85, oy: 0.12 },
    // Future lines: small negative oy pushes them further down from active, progressive fade
    future: { op: 0.04, sc: 0.88, oy: -0.06 },
    future1: { op: 0.55, sc: 0.97, oy: -0.02 },
    future2: { op: 0.30, sc: 0.94, oy: -0.04 },
    future3: { op: 0.14, sc: 0.92, oy: -0.05 },
    future4: { op: 0.07, sc: 0.90, oy: -0.06 },
    future5: { op: 0.04, sc: 0.88, oy: -0.06 },
    adlibOn: { op: 0.6, sc: 0.92, oy: -0.05 },
    adlibOff: { op: 0.35, sc: 0.90, oy: -0.033 },
    adlibHid: { op: 0.0, sc: 0.88, oy: 0.033 },
    scroll: { op: 0.7, sc: 1.0, oy: 0 },
    scrollAct: { op: 1.0, sc: 1.0, oy: 0 },
    // Paired () echo lines — from gpu-panel golden code (Y scaled to NDC)
    pairAct: { op: 1.0, sc: 0.97, oy: 0 },
    pairPast: { op: 0.0, sc: 0.96, oy: -0.083 },
    pairFut: { op: 0.0, sc: 0.90, oy: 0.067 },
};
function wordType(w) {
    if (w.stretch || w.isVocalStretch)
        return 'stretch';
    if (w.sung)
        return 'sung';
    if (w.spoken)
        return 'spoken';
    if (w.whisper)
        return 'whisper';
    return 'normal';
}
/** Configure a Troika Text mesh with CJK-aware font fallback (extra bold weight) */
function configureTextMesh(mesh, text, fontSize) {
    mesh.text = text;
    mesh.font = FONT;
    mesh.fontSize = fontSize;
    mesh.maxWidth = TEXT_MAX_WIDTH;
    mesh.unicodeFontsURL = UNICODE_FONTS_URL;
    mesh.fontWeight = 800; // extra bold — fallback fonts will also use heavy weight
    mesh.anchorX = 'left';
    mesh.anchorY = 'middle';
    mesh.color = 0xffffff;
    mesh.transparent = true;
    mesh.sdfGlyphSize = 128;
    mesh.gpuAccelerateSDF = true;
}
function lineState(li, ai, isAdlib, isScrolling, isPaired) {
    // During manual scroll: all lines equally visible (matches DOM .is-scrolling-active)
    if (isScrolling) {
        return li === ai ? S.scrollAct : S.scroll;
    }
    if (isAdlib)
        return li === ai ? S.adlibOn : li < ai ? S.adlibOff : S.adlibHid;
    // Paired () echo lines: dedicated states from gpu-panel
    if (isPaired) {
        if (li === ai)
            return S.pairAct;
        return li < ai ? S.pairPast : S.pairFut;
    }
    if (li === ai)
        return S.active;
    if (li < ai)
        return (ai - li > 1) ? S.pastFar : S.past;
    const d = li - ai;
    return d === 1 ? S.future1 : d === 2 ? S.future2 : d === 3 ? S.future3 : d === 4 ? S.future4 : d === 5 ? S.future5 : S.future;
}
export class LyricsRenderer {
    constructor() {
        this.lines = [];
        this.timeline = [];
        this.activeLineIdx = -1;
        this.opacity = 0;
        this.targetOpacity = 0;
        this.lastTime = 0;
        this.lastTimeStamp = 0;
        this.interpolatedTime = 0;
        this._trackStarted = false; // true once setCurrentTime called with time > 0
        this.ready = false;
        this.lastCt = 0; // for seek detection
        this._pendingSeekTime = null; // set by handleClick, consumed by update
        this._leftEdge = 0; // layout left edge
        this._aspectX = 1; // X scale correction for aspect ratio (h/w)
        // ── Scroll state (from gpu-panel) ──
        this.manualScrollOffset = 0;
        this.scrollDecayTimer = 0;
        this.scrollY = ACTIVE_LINE_Y_CONTROLS; // actual interpolated scroll position (like gpu-panel cameraY)
        // ── Seek callback ──
        this._onSeek = null;
        // ── Track metadata display (artist + album) ──
        this._metaGroup = null;
        this._metaArtistMesh = null;
        this._metaAlbumMesh = null;
        this._metaVisible = false;
        // ── Debug: pixel color picker ──
        this._debugRenderer = null;
        this._debugEnabled = false;
        this._debugLastDump = 0;
        // ── UI visibility — shifts text position when controls shown ──
        this._uiVisible = true;
        this._activeLineY = ACTIVE_LINE_Y_CONTROLS;
        this._accentColor = new THREE.Color(0x7eb8ff); // default blue
        // ── Translations ──
        this._translations = [];
        this._translationVisible = false;
        this._translationMeshes = []; // sparse, same length as this.lines
        this._dbgCount = 0;
        this.group = new THREE.Group();
        this.group.layers.enable(0);
        this.group.layers.enable(1);
    }
    setTimeline(timeline, artist, album) {
        // Dispose old
        this.disposeLines();
        this.timeline = timeline;
        this.activeLineIdx = -1;
        this.ready = false;
        this._trackStarted = false;
        this.scrollY = ACTIVE_LINE_Y_CONTROLS;
        this.manualScrollOffset = 0;
        this.scrollDecayTimer = 0;
        // Hide immediately — prevent showing unsync'd meshes
        this.opacity = 0;
        this.targetOpacity = 0;
        this.group.visible = false;
        if (!timeline.length) {
            return;
        }
        this.buildScene(timeline);
        // targetOpacity stays 0 — will be set to 1 when ready (in onSync callback)
        // Set track metadata footer
        if (artist || album) {
            this.setTrackMeta(artist, album);
        }
    }
    disposeLines() {
        // Dispose translation meshes
        for (const mesh of this._translationMeshes) {
            if (mesh)
                mesh.dispose();
        }
        this._translationMeshes = [];
        this._translations = [];
        // Dispose track metadata
        if (this._metaGroup) {
            if (this._metaArtistMesh) {
                this._metaArtistMesh.dispose();
                this._metaArtistMesh = null;
            }
            if (this._metaAlbumMesh) {
                this._metaAlbumMesh.dispose();
                this._metaAlbumMesh = null;
            }
            this.group.remove(this._metaGroup);
            this._metaGroup = null;
            this._metaVisible = false;
        }
        for (const L of this.lines) {
            for (const e of L.entries) {
                if (e._isCueDot) {
                    e.base.geometry?.dispose();
                    e.base.material?.dispose();
                    e.fill.geometry?.dispose();
                    e.fill.material?.dispose();
                }
                else if (e._isCharSplit) {
                    for (const cm of e._chars) {
                        cm.base.dispose();
                        cm.fill.dispose();
                    }
                }
                else {
                    e.base.dispose();
                    e.fill.dispose();
                }
            }
            this.group.remove(L.group);
        }
        this.lines = [];
    }
    buildScene(raw) {
        const allLines = raw.filter(l => l.type === 'vocal_cue' || l.words?.length || l.text);
        // ── Only BE vocal_cue entries are used mid-song; intro dots (0 → first line) are FE-generated ──
        const withCues = [];
        const firstEntry = allLines[0];
        const firstStart = firstEntry ? (firstEntry.start || firstEntry.time || 0) : 0;
        if (firstEntry?.type !== 'vocal_cue' && firstStart > 2.0) {
            withCues.push({ type: 'vocal_cue', start: 0, end: firstStart, text: '' });
        }
        for (let i = 0; i < allLines.length; i++) {
            withCues.push(allLines[i]);
        }
        const src = [];
        // Pre-process lines (identical to gpu-panel)
        for (let i = 0; i < withCues.length; i++) {
            const sl = withCues[i];
            const nextStart = withCues[i + 1] ? (withCues[i + 1].start || withCues[i + 1].time || 999) : (sl.start || 0) + 5;
            if (sl.type === 'vocal_cue') {
                const cueStart = sl.start || sl.time || 0;
                const cueEnd = sl.end || Math.min(+nextStart - 0.1, cueStart + 5);
                src.push({
                    ...sl, _isCue: true, start: cueStart, end: cueEnd,
                    words: [
                        { text: '•', start: cueStart, end: cueStart + (cueEnd - cueStart) * 0.33 },
                        { text: '•', start: cueStart + (cueEnd - cueStart) * 0.33, end: cueStart + (cueEnd - cueStart) * 0.66 },
                        { text: '•', start: cueStart + (cueEnd - cueStart) * 0.66, end: cueEnd },
                    ],
                });
                continue;
            }
            if (!sl.words || !sl.words.length) {
                const text = sl.text || '';
                const tokens = text.split(/\s+/).filter(Boolean);
                if (!tokens.length)
                    continue;
                const lineStart = sl.start || sl.time || 0;
                const lineEnd = sl.end || Math.min(+nextStart - 0.1, lineStart + 5);
                const wordDur = (lineEnd - lineStart) / tokens.length;
                sl.words = tokens.map((word, wi) => ({
                    text: word, start: lineStart + wi * wordDur, end: lineStart + (wi + 1) * wordDur,
                }));
            }
            if (!sl.end && sl.words.length) {
                sl.end = sl.words[sl.words.length - 1].end;
            }
            src.push(sl);
        }
        if (!src.length)
            return;
        let syncCount = 0;
        let syncDone = 0;
        let yPos = 0;
        for (let li = 0; li < src.length; li++) {
            const sl = src[li];
            const isCue = !!sl._isCue;
            const isAllAdlib = !isCue && ((sl.words || []).every((w) => w.adlib) || !!sl.adlib);
            const hasInlineAdlibs = !isCue && !isAllAdlib && (sl.words || []).some((w) => w.adlib);
            const fs = isCue ? FONT_SIZE : isAllAdlib ? FONT_SIZE * FS_AD_RATIO : FONT_SIZE;
            const g = new THREE.Group();
            g.layers.enable(0);
            g.layers.enable(1);
            this.group.add(g);
            const entries = [];
            const ld = { start: sl.start || sl.time || 0, end: sl.end || 0 };
            if (isCue) {
                // ── CUE DOTS: CircleGeometry — 14px diameter matching DOM ──
                // Scale relative to font size: 14px dot / 38px font ≈ 0.37 ratio
                const dotRadius = FONT_SIZE * 0.22; // slightly larger for visibility
                const dotGap = FONT_SIZE * 0.45; // ~15px gap proportional
                const circleGeo = new THREE.CircleGeometry(dotRadius, 128); // high segment count for smooth circles
                for (let wi = 0; wi < 3; wi++) {
                    const w = sl.words[wi];
                    const baseMat = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.1, depthTest: false, depthWrite: false });
                    const base = new THREE.Mesh(circleGeo, baseMat);
                    const dotX = TEXT_LEFT + wi * (dotRadius * 2 + dotGap) + dotRadius;
                    base.position.set(dotX, 0, Z_DEPTH);
                    // Layer 1 only — rendered after composer (sharp, not blurred)
                    base.layers.set(1);
                    g.add(base);
                    const fillMat = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 1.0, depthTest: false, depthWrite: false });
                    const fill = new THREE.Mesh(circleGeo, fillMat);
                    fill.position.copy(base.position);
                    fill.scale.set(0, 0, 1);
                    fill.layers.set(1);
                    g.add(fill);
                    entries.push({
                        base, fill, start: w.start, end: w.end, text: '•', li, wi,
                        ad: false, wt: 'normal',
                        _w: dotRadius * 2, _p: 0, _cop: 0, _tOp: 1,
                        _scX: 1, _scY: 1, _wave: 0, _glow: 0, _baseY: 0,
                        _isCueDot: true, _dotRadius: dotRadius,
                        _clickFlash: 0, _adBaseY: 0,
                    });
                }
                g.position.set(0, yPos, 0);
                const isFirstLine = this.lines.length === 0;
                this.lines.push({
                    group: g, entries, ld, ad: false, isCue: true, hasInlineAdlibs: false, fs,
                    _baseY: yPos,
                    _cOp: isFirstLine ? S.active.op : S.future.op,
                    _cSc: isFirstLine ? S.active.sc : S.future.sc,
                    _cOy: isFirstLine ? S.active.oy : S.future.oy,
                    _tOp: isFirstLine ? S.active.op : S.future.op,
                    _tSc: isFirstLine ? S.active.sc : S.future.sc,
                    _tOy: isFirstLine ? S.active.oy : S.future.oy,
                    _cueCollapse: 0, _cueCollapseTarget: 0, _cueExitPhase: 0, _cueExitTimer: 0,
                });
                yPos -= LINE_HEIGHT;
                continue;
            }
            // ── NORMAL LINE: per-word Troika Text meshes ──
            let xPos = TEXT_LEFT;
            for (let wi = 0; wi < sl.words.length; wi++) {
                const w = sl.words[wi];
                const t = w.word || w.text || '';
                const isAd = !!w.adlib || isAllAdlib;
                const wt = wordType(w);
                const wordFs = isAd && !isAllAdlib ? fs * FS_AD_RATIO : fs;
                const isSungStretch = (wt === 'stretch');
                if (isSungStretch && t.length > 1 && !isAllAdlib) {
                    // ── CHAR-SPLIT: per-character meshes for traveling wave animation (from gpu-panel) ──
                    const chars = t.split('');
                    const charMeshes = [];
                    for (let ci = 0; ci < chars.length; ci++) {
                        const ch = chars[ci];
                        const cBase = new Text();
                        configureTextMesh(cBase, ch, wordFs);
                        cBase.layers.set(1);
                        g.add(cBase);
                        const cFill = new Text();
                        configureTextMesh(cFill, ch, wordFs);
                        cFill.layers.set(1);
                        g.add(cFill);
                        charMeshes.push({ base: cBase, fill: cFill, idx: ci });
                        syncCount += 2;
                    }
                    const entry = {
                        base: charMeshes[0].base, fill: charMeshes[0].fill,
                        start: w.start, end: w.end, text: t, li, wi,
                        ad: isAd, wt,
                        _w: 0, _p: 0, _cop: 1, _tOp: 1,
                        _scX: 1, _scY: 1, _wave: 0, _glow: 0, _baseY: 0,
                        _isCharSplit: true, _chars: charMeshes, _charWidths: [], _charCount: chars.length,
                        _clickFlash: 0, _adBaseY: 0,
                    };
                    entries.push(entry);
                }
                else {
                    // ── STANDARD 2-mesh word (normal/spoken/whisper/adlib/single-char sung) ──
                    const base = new Text();
                    configureTextMesh(base, t, wordFs);
                    base.position.set(xPos, 0, Z_DEPTH);
                    base.layers.set(1);
                    g.add(base);
                    const fill = new Text();
                    configureTextMesh(fill, t, wordFs);
                    fill.clipRect = [-10, -10, -10, 10]; // starts fully hidden (gpu-panel golden code)
                    fill.position.set(xPos, 0, Z_DEPTH);
                    fill.layers.set(1);
                    g.add(fill);
                    const entry = {
                        base, fill, start: w.start, end: w.end, text: t, li, wi,
                        ad: isAd, wt,
                        _w: 0, _p: 0, _cop: 1, _tOp: 1,
                        _scX: 1, _scY: 1, _wave: 0, _glow: 0, _baseY: 0,
                        _clickFlash: 0, _adBaseY: 0,
                    };
                    entries.push(entry);
                    syncCount += 2;
                }
                xPos += t.length * wordFs * 0.55 + WORD_GAP;
            }
            // ── Group consecutive adlib words into phrases (from gpu-panel) ──
            const adPhrases = [];
            if (hasInlineAdlibs) {
                let curPhrase = null;
                for (const e of entries) {
                    if (e.ad) {
                        if (!curPhrase)
                            curPhrase = { words: [], start: Infinity, end: 0, totalW: 0 };
                        curPhrase.words.push(e);
                        curPhrase.start = Math.min(curPhrase.start, e.start);
                        curPhrase.end = Math.max(curPhrase.end, e.end);
                        curPhrase.totalW += e._w + WORD_GAP;
                    }
                    else {
                        if (curPhrase) {
                            curPhrase.totalW -= WORD_GAP;
                            adPhrases.push(curPhrase);
                            curPhrase = null;
                        }
                    }
                }
                if (curPhrase) {
                    curPhrase.totalW -= WORD_GAP;
                    adPhrases.push(curPhrase);
                }
                for (let pi = 0; pi < adPhrases.length; pi++) {
                    for (const e of adPhrases[pi].words)
                        e._adPhraseIdx = pi;
                }
            }
            g.position.set(0, yPos, 0);
            const isFirstLine = this.lines.length === 0;
            this.lines.push({
                group: g, entries, ld, ad: isAllAdlib, isCue: false, hasInlineAdlibs, fs,
                _baseY: yPos,
                _cOp: isFirstLine ? S.active.op : S.future.op,
                _cSc: isFirstLine ? S.active.sc : S.future.sc,
                _cOy: isFirstLine ? S.active.oy : S.future.oy,
                _tOp: isFirstLine ? S.active.op : S.future.op,
                _tSc: isFirstLine ? S.active.sc : S.future.sc,
                _tOy: isFirstLine ? S.active.oy : S.future.oy,
                _adPhrases: adPhrases,
                _adLastEnd: adPhrases.length ? Math.max(...adPhrases.map(p => p.end)) : 0,
                _adPhraseReveal: 0,
            });
            yPos -= LINE_HEIGHT;
        }
        // ── Detect paired () echo lines (from gpu-panel) ──
        for (let i = 0; i < this.lines.length; i++) {
            const text = this.lines[i].entries.map(e => e.text).join(' ');
            if (text.startsWith('(') && i + 1 < this.lines.length) {
                const nextText = this.lines[i + 1].entries.map(e => e.text).join(' ');
                if (nextText.startsWith('(')) {
                    this.lines[i]._pairWith = i + 1;
                    this.lines[i + 1]._pairWith = i;
                    this.lines[i]._pairRole = 'first';
                    this.lines[i + 1]._pairRole = 'second';
                    i++;
                }
            }
        }
        // ── Detect standalone adlib lines — full-adlib, not paired, shown like normal lines ──
        // These are lines like "(ミテイタフリシテ)" that appear solo between normal lines.
        // They should be vertically centered between neighbors and not fade like regular adlibs.
        for (let i = 0; i < this.lines.length; i++) {
            const L = this.lines[i];
            if (L.ad && !L.isCue && L._pairWith == null) {
                L._standaloneAdlib = true;
            }
        }
        // Sync all Troika meshes, then do layout with real widths
        // After sync: patch material for transparency (gpu-panel sets transparent=true at creation,
        // but Troika may regenerate material during sync — ensure depthWrite/depthTest are disabled)
        const patchMaterial = (mesh) => {
            if (mesh.material) {
                mesh.material.transparent = true;
                mesh.material.depthWrite = false;
                mesh.material.depthTest = false;
            }
        };
        const onSync = () => {
            syncDone++;
            if (syncDone >= syncCount) {
                // Patch ALL troika materials for transparency
                for (const LL of this.lines) {
                    for (const ee of LL.entries) {
                        if (ee._isCueDot)
                            continue;
                        if (ee._isCharSplit && ee._chars) {
                            for (const cm of ee._chars) {
                                patchMaterial(cm.base);
                                patchMaterial(cm.fill);
                            }
                        }
                        else {
                            patchMaterial(ee.base);
                            patchMaterial(ee.fill);
                        }
                    }
                }
                console.log('[LyricsRenderer] All meshes synced & patched transparent. Lines:', this.lines.length);
                this.doLayout();
                this.ready = true;
                // Now safe to show — layout is computed, no 1-frame misalignment
                this.group.visible = true;
                this.targetOpacity = 1;
            }
        };
        for (const L of this.lines) {
            for (const e of L.entries) {
                if (e._isCueDot) {
                    syncDone += 2;
                    if (syncDone >= syncCount) {
                        this.doLayout();
                        this.ready = true;
                        this.group.visible = true;
                        this.targetOpacity = 1;
                    }
                }
                else if (e._isCharSplit) {
                    for (const cm of e._chars) {
                        cm.base.sync(onSync);
                        cm.fill.sync(onSync);
                    }
                }
                else {
                    e.base.sync(onSync);
                    e.fill.sync(onSync);
                }
            }
        }
        if (syncCount === 0) {
            this.doLayout();
            this.ready = true;
            this.group.visible = true;
            this.targetOpacity = 1;
        }
    }
    /** Position per-char meshes within a char-split word entry (from gpu-panel) */
    layoutChars(e, wordX, wordY) {
        if (!e._isCharSplit || !e._chars)
            return;
        let cx = wordX;
        for (let i = 0; i < e._chars.length; i++) {
            const cm = e._chars[i];
            const cw = e._charWidths[i] || 0;
            cm.base.position.x = cx;
            cm.base.position.y = wordY;
            cm.fill.position.x = cx;
            cm.fill.position.y = wordY;
            cm._baseX = cx;
            cx += cw;
        }
    }
    doLayout() {
        const maxWidth = TEXT_MAX_WIDTH;
        const leftEdge = TEXT_LEFT;
        this._leftEdge = leftEdge;
        let yAccum = 0;
        for (let idx = 0; idx < this.lines.length; idx++) {
            const L = this.lines[idx];
            if (L.isCue) {
                // Cue dots: shift up from yAccum so they sit higher (closer to past line).
                // Prev line already added its margin, so yAccum is at the gap start.
                const cueShiftUp = LINE_HEIGHT * 0.35; // push dots toward the upper third of the gap
                const dotR = L.entries[0]?._dotRadius || FONT_SIZE * 0.18;
                const dotGap = FONT_SIZE * 0.40;
                for (let di = 0; di < L.entries.length; di++) {
                    const e = L.entries[di];
                    const dotX = leftEdge + di * (dotR * 2 + dotGap) + dotR;
                    e.base.position.x = dotX;
                    e.base.position.y = 0;
                    e.fill.position.x = dotX;
                    e.fill.position.y = 0;
                    e._adBaseY = 0;
                }
                L.group.position.set(0, yAccum + cueShiftUp, 0);
                L._baseY = yAccum + cueShiftUp;
                // Spacing below dots to next line
                yAccum -= LINE_HEIGHT;
                continue;
            }
            // Measure word widths (including char-split)
            for (const e of L.entries) {
                if (e._isCueDot)
                    continue;
                if (e._isCharSplit && e._chars) {
                    let totalW = 0;
                    e._charWidths = [];
                    for (const cm of e._chars) {
                        const b = cm.base.textRenderInfo?.blockBounds;
                        const cw = b ? (b[2] - b[0]) : L.fs * 0.5;
                        e._charWidths.push(cw);
                        totalW += cw;
                    }
                    e._w = totalW;
                }
                else {
                    const b = e.base.textRenderInfo?.blockBounds;
                    e._w = b ? (b[2] - b[0]) : e.text.length * L.fs * 0.5;
                }
            }
            const rowHeight = L.fs * LINE_H;
            if (L.hasInlineAdlibs) {
                // ── Two-tier layout: main words on top, adlib row below (from gpu-panel) ──
                const mainWords = L.entries.filter(e => !e.ad);
                const adlibWords = L.entries.filter(e => e.ad);
                let x = leftEdge;
                let rowY = 0;
                for (const e of mainWords) {
                    if (x + e._w > leftEdge + maxWidth && x > leftEdge + 0.01) {
                        x = leftEdge;
                        rowY -= rowHeight;
                    }
                    e.base.position.x = x;
                    e.base.position.y = rowY;
                    e.fill.position.x = x;
                    e.fill.position.y = rowY;
                    e._adBaseY = rowY;
                    e._baseY = rowY;
                    e._baseX = x;
                    if (e._isCharSplit)
                        this.layoutChars(e, x, rowY);
                    x += e._w + WORD_GAP;
                }
                // Adlib row below main text
                const adGap = L.fs * 0.15;
                const adRowY = rowY - L.fs - adGap;
                let adX = leftEdge;
                for (const e of adlibWords) {
                    e.base.position.x = adX;
                    e.base.position.y = adRowY;
                    e.fill.position.x = adX;
                    e.fill.position.y = adRowY;
                    e._adBaseY = adRowY;
                    e._baseY = adRowY;
                    e._baseX = adX;
                    e._adBaseX = adX;
                    if (e._isCharSplit)
                        this.layoutChars(e, adX, adRowY);
                    adX += e._w + WORD_GAP;
                }
                L.group.position.set(0, yAccum, 0);
                L._baseY = yAccum;
                const totalHeight = Math.abs(rowY) + rowHeight;
                yAccum -= totalHeight + LINE_HEIGHT;
            }
            else {
                // ── Standard layout with wrapping ──
                let x = leftEdge;
                let rowY = 0;
                for (const e of L.entries) {
                    if (x + e._w > leftEdge + maxWidth && x > leftEdge + 0.01) {
                        x = leftEdge;
                        rowY -= rowHeight;
                    }
                    e.base.position.x = x;
                    e.base.position.y = rowY;
                    e.fill.position.x = x;
                    e.fill.position.y = rowY;
                    e._adBaseY = rowY;
                    e._baseY = rowY;
                    e._baseX = x;
                    if (e._isCharSplit)
                        this.layoutChars(e, x, rowY);
                    x += e._w + WORD_GAP;
                }
                L.group.position.set(0, yAccum, 0);
                L._baseY = yAccum;
                const totalHeight = Math.abs(rowY) + rowHeight;
                // Paired line margins (from gpu-panel)
                let margin;
                if (L._pairRole === 'first') {
                    margin = LINE_HEIGHT * 0.3;
                }
                else if (L._pairRole === 'second') {
                    margin = LINE_HEIGHT * 1.4;
                }
                else {
                    margin = (L.ad && !L._standaloneAdlib) ? LINE_HEIGHT * 0.15 : L._standaloneAdlib ? LINE_HEIGHT * 0.5 : LINE_HEIGHT;
                }
                yAccum -= totalHeight + margin;
            }
        }
    }
    setVisible(visible) {
        this.targetOpacity = visible && this.timeline.length > 0 ? 1 : 0;
    }
    /** Set UI controls visibility — shifts text position when controls are shown vs idle */
    setControlsVisible(visible) {
        this._uiVisible = visible;
        this._activeLineY = visible ? ACTIVE_LINE_Y_CONTROLS : ACTIVE_LINE_Y_IDLE;
    }
    /** Set accent color from palette — used for artist name bloom */
    setAccentColor(color) {
        this._accentColor = color.clone();
        // Ensure it's bright enough for text — boost luminance if too dark
        const hsl = { h: 0, s: 0, l: 0 };
        this._accentColor.getHSL(hsl);
        if (hsl.l < 0.5) {
            this._accentColor.setHSL(hsl.h, hsl.s, Math.max(0.55, hsl.l));
        }
        // Update album mesh color to match new palette
        if (this._metaAlbumMesh) {
            const albumColor = this._accentColor.clone();
            const albumHsl = { h: 0, s: 0, l: 0 };
            albumColor.getHSL(albumHsl);
            albumColor.setHSL(albumHsl.h, Math.max(0.15, albumHsl.s * 0.5), Math.min(0.75, albumHsl.l + 0.15));
            this._metaAlbumMesh.color = albumColor.getHex();
        }
    }
    /** Set aspect ratio correction (call on resize). w/h of container. */
    setAspect(w, h) {
        const newAspect = h / w;
        if (Math.abs(newAspect - this._aspectX) > 0.001) {
            this._aspectX = newAspect;
            if (this.ready)
                this.doLayout();
        }
    }
    setCurrentTime(time) {
        this.lastTime = time;
        this.lastTimeStamp = performance.now();
        if (time > 0.1)
            this._trackStarted = true;
    }
    /** Register a callback for click-to-seek */
    onSeek(cb) {
        this._onSeek = cb;
    }
    /** Set track metadata for display above lyrics (artist + album with blue glow) */
    setTrackMeta(artist, album) {
        // Dispose old metadata
        if (this._metaGroup) {
            if (this._metaArtistMesh) {
                this._metaArtistMesh.dispose();
                this._metaArtistMesh = null;
            }
            if (this._metaAlbumMesh) {
                this._metaAlbumMesh.dispose();
                this._metaAlbumMesh = null;
            }
            this.group.remove(this._metaGroup);
            this._metaGroup = null;
        }
        const artistText = artist || '';
        const albumText = album || '';
        if (!artistText && !albumText) {
            this._metaVisible = false;
            return;
        }
        this._metaGroup = new THREE.Group();
        this._metaGroup.layers.enable(0);
        this._metaGroup.layers.enable(1);
        // Artist mesh — NDC-scaled font sizes (22px and 18px from gpu-panel, normalized)
        const artistFs = FONT_SIZE * 0.58; // ~22/38 ratio from gpu-panel
        this._metaArtistMesh = new Text();
        this._metaArtistMesh.text = artistText;
        this._metaArtistMesh.font = FONT;
        this._metaArtistMesh.fontSize = artistFs;
        this._metaArtistMesh.unicodeFontsURL = UNICODE_FONTS_URL;
        this._metaArtistMesh.fontWeight = 800;
        this._metaArtistMesh.anchorX = 'left';
        this._metaArtistMesh.anchorY = 'bottom';
        this._metaArtistMesh.color = this._accentColor.getHex();
        this._metaArtistMesh.transparent = true;
        this._metaArtistMesh.sdfGlyphSize = 128;
        this._metaArtistMesh.gpuAccelerateSDF = true;
        this._metaArtistMesh.position.set(TEXT_LEFT, 0, Z_DEPTH);
        // Enable bloom layer for artist glow effect
        this._metaArtistMesh.layers.enable(0);
        this._metaArtistMesh.layers.enable(1);
        this._metaGroup.add(this._metaArtistMesh);
        // Album mesh — blue glow color (0x7eb8ff)
        const albumFs = FONT_SIZE * 0.47; // ~18/38 ratio from gpu-panel
        this._metaAlbumMesh = new Text();
        this._metaAlbumMesh.text = albumText;
        this._metaAlbumMesh.font = FONT;
        this._metaAlbumMesh.fontSize = albumFs;
        this._metaAlbumMesh.unicodeFontsURL = UNICODE_FONTS_URL;
        this._metaAlbumMesh.fontWeight = 800;
        this._metaAlbumMesh.anchorX = 'left';
        this._metaAlbumMesh.anchorY = 'top';
        // Use accent color desaturated + lightened for album — distinct from artist but palette-consistent
        const albumColor = this._accentColor.clone();
        const hsl = { h: 0, s: 0, l: 0 };
        albumColor.getHSL(hsl);
        albumColor.setHSL(hsl.h, Math.max(0.15, hsl.s * 0.5), Math.min(0.75, hsl.l + 0.15));
        this._metaAlbumMesh.color = albumColor.getHex();
        this._metaAlbumMesh.transparent = true;
        this._metaAlbumMesh.sdfGlyphSize = 128;
        this._metaAlbumMesh.gpuAccelerateSDF = true;
        this._metaAlbumMesh.position.set(TEXT_LEFT, -artistFs - 0.003, Z_DEPTH);
        this._metaAlbumMesh.layers.set(1);
        this._metaGroup.add(this._metaAlbumMesh);
        this.group.add(this._metaGroup);
        this._metaVisible = true;
        // Sync and patch materials
        const patchMat = (mesh) => {
            if (mesh.material) {
                mesh.material.transparent = true;
                mesh.material.depthWrite = false;
                mesh.material.depthTest = false;
            }
        };
        this._metaArtistMesh.sync(() => patchMat(this._metaArtistMesh));
        this._metaAlbumMesh.sync(() => patchMat(this._metaAlbumMesh));
    }
    /** Update metadata group position — footer after last lyric line, scrolls with content */
    updateMeta() {
        if (!this._metaGroup || !this._metaVisible)
            return;
        // Position below all lyrics — scrolls with lyrics content (same coordinate space)
        const lastLine = this.lines[this.lines.length - 1];
        let bottomY;
        if (lastLine) {
            // Find the lowest row within the last line (accounts for wrapped multi-row lines)
            let lowestRow = 0;
            for (const e of lastLine.entries) {
                if (e._baseY < lowestRow)
                    lowestRow = e._baseY;
            }
            // Position below the last row of the last line
            bottomY = lastLine._baseY + lowestRow - lastLine.fs * LINE_H - LINE_HEIGHT * 1.5;
        }
        else {
            bottomY = -0.5;
        }
        this._metaGroup.position.y = bottomY + this.scrollY;
        this._metaGroup.position.x = this._leftEdge;
        // Fade: visible when the meta position is within viewport
        const screenY = this._metaGroup.position.y;
        let fadeMeta = 1.0;
        if (screenY > 1.2)
            fadeMeta = 0;
        else if (screenY < -1.8)
            fadeMeta = 0;
        else if (screenY > 0.9)
            fadeMeta = Math.max(0, (1.2 - screenY) / 0.3);
        else if (screenY < -1.3)
            fadeMeta = Math.max(0, (screenY + 1.8) / 0.5);
        const artistOp = 0.9 * fadeMeta * this.opacity;
        const albumOp = 0.55 * fadeMeta * this.opacity;
        if (this._metaArtistMesh?.material) {
            this._metaArtistMesh.material.opacity = artistOp;
            // Colored bloom halo using palette accent — always on for artist name
            if (artistOp > 0.1) {
                this._metaArtistMesh.layers.enable(0);
                // Moderate HDR boost for soft colored halo (not lamp, just glow)
                const boost = 1.0 + 0.6 * fadeMeta;
                const c = this._accentColor;
                this._metaArtistMesh.color = new THREE.Color(c.r * boost, c.g * boost, c.b * boost);
            }
            else {
                this._metaArtistMesh.layers.disable(0);
                this._metaArtistMesh.color = this._accentColor.clone();
            }
        }
        if (this._metaAlbumMesh?.material) {
            this._metaAlbumMesh.material.opacity = albumOp;
        }
    }
    /** Handle mouse wheel for manual scroll (from gpu-panel) */
    handleWheel(deltaY) {
        // deltaY > 0 = scroll down = show later content = positive offset
        this.manualScrollOffset += deltaY * 0.002;
        // Clamp using actual line positions — 15% viewport margin top/bottom
        if (this.lines.length > 1) {
            const firstY = this.lines[0]._baseY;
            const lastY = this.lines[this.lines.length - 1]._baseY;
            const ai = Math.max(0, this.activeLineIdx);
            const activeY = this.lines[ai]._baseY;
            // How far the offset can push (relative to active line's baseY)
            const maxForward = Math.abs(lastY - activeY) + 0.5; // reach last line + margin
            const maxBackward = Math.abs(activeY - firstY) + 0.3; // reach first line + small margin
            this.manualScrollOffset = Math.max(-maxBackward, Math.min(maxForward, this.manualScrollOffset));
        }
        this.scrollDecayTimer = 3.0;
    }
    /** Handle click for click-to-seek */
    handleClick(ndcX, ndcY) {
        if (!this.ready || !this.lines.length)
            return;
        if (ndcX < TEXT_LEFT - 0.2)
            return; // click is on left side (shader area), ignore
        // Convert NDC click to layout space (group.scale.x = _aspectX)
        const clickX = ndcX / (this._aspectX || 1);
        let bestEntry = null;
        let bestLine = null;
        let bestDist = Infinity;
        for (const L of this.lines) {
            const groupY = L.group.position.y;
            const groupScale = L._cSc || 1;
            // Skip nearly invisible lines
            if (L._cOp < 0.05)
                continue;
            for (const e of L.entries) {
                if (e._isCueDot)
                    continue;
                const wy = groupY + (e._adBaseY || 0) * groupScale;
                const wx = L.group.position.x + e.base.position.x * groupScale;
                const dy = Math.abs(ndcY - wy);
                if (dy > L.fs * 2.5)
                    continue; // wider Y threshold
                const wordLeft = wx;
                const wordRight = wx + e._w * groupScale;
                // Wide X match — anywhere near the word
                const dx = clickX < wordLeft ? wordLeft - clickX : clickX > wordRight ? clickX - wordRight : 0;
                const dist = dy + dx * 0.5;
                if (dist < bestDist) {
                    bestDist = dist;
                    bestEntry = e;
                    bestLine = L;
                }
            }
        }
        if (bestEntry && bestEntry.start != null && this._onSeek) {
            console.log(`[LR-SEEK] word="${bestEntry.text}" → t=${bestEntry.start.toFixed(3)}`);
            this.manualScrollOffset = 0;
            this.scrollDecayTimer = 0;
            this._pendingSeekTime = bestEntry.start;
            this._onSeek(bestEntry.start);
            bestEntry._clickFlash = 1.0;
            return;
        }
        // Fallback: find closest line by Y position
        let closest = 0, minDist = Infinity;
        for (let i = 0; i < this.lines.length; i++) {
            if (this.lines[i]._cOp < 0.05)
                continue;
            const dist = Math.abs(this.lines[i].group.position.y - ndcY);
            if (dist < minDist) {
                minDist = dist;
                closest = i;
            }
        }
        if (this._onSeek && this.lines[closest]) {
            console.log(`[LR-SEEK] line #${closest} → t=${this.lines[closest].ld.start.toFixed(3)}`);
            this.manualScrollOffset = 0;
            this.scrollDecayTimer = 0;
            this._pendingSeekTime = this.lines[closest].ld.start;
            this._onSeek(this.lines[closest].ld.start);
            for (const e of this.lines[closest].entries)
                e._clickFlash = 1.0;
        }
    }
    update(rms) {
        this._dbgCount++;
        if (this._dbgCount % 300 === 1 && false) { // DEBUG: set to true to enable verbose frame logging
            const ai = this.activeLineIdx;
            const ct = this.interpolatedTime;
            console.log(`[LR-DBG] frame=${this._dbgCount} ct=${ct.toFixed(2)} activeIdx=${ai} lines=${this.lines.length} opacity=${this.opacity.toFixed(3)} ready=${this.ready} scrollOff=${this.manualScrollOffset.toFixed(2)}`);
            // Dump ALL visible lines (activeIdx-3 to activeIdx+6)
            const from = Math.max(0, ai - 3);
            const to = Math.min(this.lines.length - 1, ai + 6);
            for (let li = from; li <= to; li++) {
                const L = this.lines[li];
                if (!L)
                    continue;
                const rel = li < ai ? `past(${ai - li})` : li === ai ? 'ACTIVE' : `future(${li - ai})`;
                const lineInfo = `[LR-LINE] #${li} ${rel} | cOp=${L._cOp.toFixed(3)} cSc=${L._cSc.toFixed(3)} baseY=${L._baseY.toFixed(3)} grpY=${L.group.position.y.toFixed(3)} isCue=${L.isCue} ad=${L.ad} paired=${!!L.pairedAdlibIdx}`;
                console.log(lineInfo);
                // Dump each word in the line
                for (let wi = 0; wi < L.entries.length; wi++) {
                    const e = L.entries[wi];
                    if (e._isCueDot) {
                        console.log(`  w${wi}: [cue-dot]`);
                        continue;
                    }
                    const baseMat = e.base?.material;
                    const fillMat = e.fill?.material;
                    const baseCol = e.base?.color;
                    const fillCol = e.fill?.color;
                    const bColStr = baseCol?.isColor ? `rgb(${baseCol.r.toFixed(2)},${baseCol.g.toFixed(2)},${baseCol.b.toFixed(2)})` : String(baseCol);
                    const fColStr = fillCol?.isColor ? `rgb(${fillCol.r.toFixed(2)},${fillCol.g.toFixed(2)},${fillCol.b.toFixed(2)})` : String(fillCol);
                    const clipStr = e.fill?.clipRect ? `[${e.fill.clipRect.map((v) => v.toFixed(2)).join(',')}]` : 'null';
                    const charInfo = e._isCharSplit ? ` chars=${e._charCount} charW=[${(e._charWidths || []).map((w) => w.toFixed(3)).join(',')}]` : '';
                    console.log(`  w${wi}: "${e.text}" wt=${e.wt} ad=${e.ad} | _p=${e._p.toFixed(3)} _cop=${e._cop.toFixed(3)} _w=${e._w.toFixed(4)} _wave=${e._wave.toFixed(3)} _glow=${e._glow.toFixed(3)} | baseMat.op=${baseMat?.opacity?.toFixed(3)} fillMat.op=${fillMat?.opacity?.toFixed(3)} | baseCol=${bColStr} fillCol=${fColStr} | clip=${clipStr} | layer0=${!!(e.fill?.layers?.mask & 1)} layer1=${!!(e.fill?.layers?.mask & 2)}${charInfo}`);
                }
            }
        }
        if (!this.lines.length || !this.ready) {
            // Don't render, but keep lerping opacity toward target so it's ready when sync completes
            this.opacity += (this.targetOpacity - this.opacity) * 0.15;
            return;
        }
        // Clock smoothing — cap interpolation to prevent drift when paused
        const elapsed = Math.min((performance.now() - this.lastTimeStamp) / 1000, 0.5);
        this.interpolatedTime = this.lastTime + elapsed + 0.05;
        let ct = this.interpolatedTime;
        // Opacity lerp (fast ramp-up for initial appearance)
        const opLerp = this.opacity < 0.5 ? 0.15 : 0.05;
        this.opacity += (this.targetOpacity - this.opacity) * opLerp;
        // Apply aspect ratio correction to group
        this.group.scale.x = this._aspectX;
        // ── Seek detection: explicit from handleClick OR heuristic from time jump ──
        const timeDelta = ct - this.lastCt;
        const heuristicSeek = timeDelta < -0.3 || timeDelta > 2.0;
        const didSeek = this._pendingSeekTime !== null || heuristicSeek;
        // Use the explicit seek time if available — it's the authoritative position
        const seekTime = this._pendingSeekTime ?? ct;
        if (didSeek) {
            ct = seekTime;
            this.lastTimeStamp = performance.now();
            this.interpolatedTime = seekTime;
            this._pendingSeekTime = null;
        }
        this.lastCt = ct;
        if (didSeek) {
            // Find the new active line at seek time
            let seekAi = 0;
            for (let i = 0; i < this.lines.length; i++) {
                const ld = this.lines[i].ld;
                if (ct >= ld.start && ct <= ld.end) {
                    seekAi = i;
                    break;
                }
                if (ct > ld.end)
                    seekAi = i;
            }
            // Update fill progress & clipRect for all words
            for (const L of this.lines) {
                for (const e of L.entries) {
                    // Recompute fill progress for new time
                    if (ct >= e.end)
                        e._p = 1;
                    else if (ct >= e.start)
                        e._p = Math.min(1, (ct - e.start) / (e.end - e.start));
                    else
                        e._p = 0;
                    // Reset animation artifacts only
                    e._clickFlash = 0;
                    e._wave = 0;
                    e._glow = 0;
                    e._scX = 1;
                    e._scY = 1;
                    if (e._isCueDot) {
                        // Leave cue dots for the normal animation loop to handle
                    }
                    else if (e._isCharSplit && e._chars) {
                        for (const cm of e._chars) {
                            cm.base.scale.set(1, 1, 1);
                            cm.fill.scale.set(1, 1, 1);
                            cm._lerpScX = 1;
                            cm._lerpScY = 1;
                            cm._charGlow = 0;
                            cm._charFilled = false;
                            if (cm._baseX !== undefined) {
                                cm.base.position.x = cm._baseX;
                                cm.fill.position.x = cm._baseX;
                            }
                        }
                    }
                    else {
                        // Snap clipRect so fill state is correct for new time
                        if (e._p >= 1) {
                            e.fill.clipRect = [-10, -10, 100, 10];
                        }
                        else if (e._p <= 0) {
                            e.fill.clipRect = [-10, -10, -10, 10];
                        }
                        else {
                            const clipX = e._w * e._p;
                            const feather = e._w * FEATHER;
                            e.fill.clipRect = [-0.01, -10, clipX + feather, 10];
                        }
                        e.fill.layers.disable(0);
                        e.fill.color = 0xffffff;
                        if (e._baseX !== undefined) {
                            e.base.position.x = e._baseX;
                            e.fill.position.x = e._baseX;
                        }
                    }
                }
            }
            // Let scroll animate smoothly — DON'T snap line states, let them lerp naturally
            this.manualScrollOffset = 0;
            this.scrollDecayTimer = 0;
            this.activeLineIdx = seekAi;
        }
        // ── Find active line + paired () line handling (from gpu-panel) ──
        let ai = -1;
        for (let i = 0; i < this.lines.length; i++) {
            const ld = this.lines[i].ld;
            if (ct >= ld.start && ct <= ld.end) {
                ai = i;
                break;
            }
        }
        if (ai === -1) {
            for (let i = 0; i < this.lines.length; i++) {
                const ld = this.lines[i].ld;
                if (ct >= ld.start - 0.15 && ct <= ld.end + 0.15) {
                    ai = i;
                    break;
                }
            }
        }
        if (ai === -1 && this.lines.length > 0) {
            if (ct > this.lines[this.lines.length - 1].ld.end + 0.5) {
                ai = this.lines.length - 1;
            }
            else if (ct < this.lines[0].ld.start - 0.5) {
                ai = 0;
            }
            else {
                for (let i = 0; i < this.lines.length - 1; i++) {
                    if (ct > this.lines[i].ld.end && ct < this.lines[i + 1].ld.start) {
                        const gap = this.lines[i + 1].ld.start - this.lines[i].ld.end;
                        const elap = ct - this.lines[i].ld.end;
                        ai = elap < gap * 0.6 ? i : i + 1;
                        break;
                    }
                }
            }
        }
        if (ai === -1)
            ai = this.activeLineIdx >= 0 ? this.activeLineIdx : 0;
        // Build active set with paired lines + time overlaps (from gpu-panel)
        let activeSet = new Set([ai]);
        if (ai >= 0 && ai < this.lines.length) {
            const aLd = this.lines[ai].ld;
            const pairIdx = this.lines[ai]._pairWith;
            if (pairIdx != null && pairIdx >= 0 && pairIdx < this.lines.length) {
                activeSet.add(pairIdx);
                const pairEnd = Math.max(aLd.end, this.lines[pairIdx].ld.end);
                if (ct <= pairEnd + 0.1)
                    ai = Math.min(ai, pairIdx);
            }
            for (let i = 0; i < this.lines.length; i++) {
                if (activeSet.has(i))
                    continue;
                const bLd = this.lines[i].ld;
                const overlapDur = Math.min(aLd.end, bLd.end) - Math.max(aLd.start, bLd.start);
                if (overlapDur > 0.05)
                    activeSet.add(i);
            }
            if (activeSet.size > 1) {
                let maxEnd = 0;
                for (const idx of activeSet)
                    maxEnd = Math.max(maxEnd, this.lines[idx].ld.end);
                if (ct <= maxEnd + 0.1) {
                    ai = Math.min(...activeSet);
                }
                else {
                    activeSet = new Set([ai]);
                }
            }
        }
        this.activeLineIdx = ai;
        // dt for lerp
        const dt = 1 / 60;
        const f = 1 - Math.exp(-LERP_SPEED * dt);
        const fSlow = 1 - Math.exp(-2.5 * dt);
        const fSnap = 1 - Math.exp(-12 * dt);
        // ── Scroll: manual offset decay (from gpu-panel doScroll) ──
        if (this.scrollDecayTimer > 0) {
            this.scrollDecayTimer -= dt;
        }
        else {
            this.manualScrollOffset *= 0.95;
            if (Math.abs(this.manualScrollOffset) < 0.005)
                this.manualScrollOffset = 0;
        }
        // Scroll: smooth camera-style lerp — faster for big jumps, gentle for small movements
        const baseTargetY = ai >= 0 && ai < this.lines.length ? -this.lines[ai]._baseY + this._activeLineY : this._activeLineY;
        const targetY = baseTargetY + this.manualScrollOffset;
        const scrollDist = Math.abs(targetY - this.scrollY);
        // Big jumps (>0.5 scene units ≈ several lines): speed up to 8x, small movements: normal 3.5x
        const scrollSpeed = scrollDist > 0.5 ? 3.5 + Math.min(12, scrollDist * 6) : 3.5;
        const scrollLerp = 1 - Math.exp(-scrollSpeed * dt);
        this.scrollY += (targetY - this.scrollY) * scrollLerp;
        // Update track metadata position
        this.updateMeta();
        // Are we in manual scroll mode? (like DOM .is-scrolling-active)
        const isScrolling = this.scrollDecayTimer > 0;
        for (let li = 0; li < this.lines.length; li++) {
            const L = this.lines[li];
            const isInActiveSet = activeSet.has(li);
            const isPaired = (L._pairWith != null);
            // Standalone adlib lines are treated like normal lines (not fading adlibs)
            const isAdlibForState = isPaired ? false : (L.ad && !L._standaloneAdlib);
            const st = isInActiveSet ? S.active : lineState(li, ai, isAdlibForState, isScrolling, isPaired);
            const isPast = (!isInActiveSet && li < ai);
            const isActive = isInActiveSet;
            // ── Line-level lerps with staggered scroll (from gpu-panel) ──
            L._tOp = st.op;
            L._tSc = st.sc;
            L._tOy = st.oy;
            // Past lines: dedicated fast lerp — they should vanish quickly, not linger
            if (isPast) {
                const pastF = 1 - Math.exp(-20 * dt); // very fast ~20x speed
                L._cOp += (L._tOp - L._cOp) * pastF;
                L._cSc += (L._tSc - L._cSc) * pastF;
                L._cOy += (L._tOy - L._cOy) * pastF;
            }
            else {
                L._cOp += (L._tOp - L._cOp) * f;
                L._cSc += (L._tSc - L._cSc) * f;
                // Staggered Y lerp — future lines lag behind creating cascade
                const delta = li - ai;
                let staggerF;
                if (delta === 1) {
                    staggerF = f * 0.8;
                } // future-1: fairly responsive
                else if (delta === 2) {
                    staggerF = f * 0.5;
                } // future-2: moderate lag
                else {
                    staggerF = f * Math.max(0.2, 0.4 - delta * 0.04);
                } // distant = slow cascade
                L._cOy += (L._tOy - L._cOy) * staggerF;
            }
            L.group.scale.set(L._cSc, L._cSc, 1);
            L.group.position.x = this._leftEdge * (1 - L._cSc);
            L.group.position.y = L._baseY + L._cOy + this.scrollY;
            // Viewport margin fade: 15% top/bottom — lines near edges fade out
            // NOTE: uses a separate effectiveOp instead of mutating _cOp (which would corrupt lerp state)
            const screenY = L.group.position.y;
            const MARGIN = 0.3; // 15% of NDC range (2.0) = 0.3
            let viewportFade = 1.0;
            if (screenY > 1.0 - MARGIN)
                viewportFade = Math.max(0, (1.0 - screenY) / MARGIN);
            else if (screenY < -1.0 + MARGIN)
                viewportFade = Math.max(0, (screenY + 1.0) / MARGIN);
            const effectiveOp = L._cOp * viewportFade;
            // ── Paired () lines: line-level fill progress for smooth sweep ──
            let _lineP = 0;
            if (isPaired) {
                const lStart = L.ld.start, lEnd = L.ld.end;
                if (ct >= lEnd)
                    _lineP = 1;
                else if (ct >= lStart)
                    _lineP = (ct - lStart) / (lEnd - lStart);
            }
            // ── Per-word animations ──
            for (const e of L.entries) {
                // Fill progress 0→1
                if (ct >= e.end)
                    e._p = 1;
                else if (ct >= e.start)
                    e._p = Math.min(1, (ct - e.start) / (e.end - e.start));
                else
                    e._p = 0;
                const isFilling = (e._p > 0 && e._p < 1);
                const isFilled = (e._p >= 1);
                const isStretch = (e.wt === 'stretch');
                // Line opacity — unified for all word types except adlibs (standalone adlibs behave like normal)
                if (!e.ad || isPaired || L._standaloneAdlib) {
                    e._tOp = effectiveOp;
                    // Past lines: snap instantly so words vanish with the line
                    if (isPast) {
                        e._cop = effectiveOp; // instant — no lerp delay
                    }
                    else {
                        e._cop += (e._tOp - e._cop) * f;
                    }
                }
                // Click flash decay
                if (e._clickFlash && e._clickFlash > 0.01) {
                    e._clickFlash *= (1 - fSnap);
                }
                else {
                    e._clickFlash = 0;
                }
                // ── CUE DOTS — fill → bloom pulse → shrink away ──
                // Continuous animation: dots fill sequentially, then when all filled they
                // bloom bright and simultaneously shrink to nothing. No sudden transitions.
                // Guard: don't animate dots until track has actually started playing
                if (L.isCue && e._isCueDot) {
                    const baseMesh = e.base;
                    const fillMesh = e.fill;
                    const baseMat = baseMesh.material;
                    const fillMat = fillMesh.material;
                    fillMesh.scale.set(0, 0, 1);
                    fillMat.opacity = 0;
                    fillMesh.layers.disable(0);
                    // If track hasn't started, show dots in static waiting state
                    if (!this._trackStarted) {
                        baseMesh.scale.set(1, 1, 1);
                        baseMat.opacity = 0.3 * e._cop * this.opacity;
                        baseMat.color.setRGB(1, 1, 1);
                        baseMesh.layers.enable(0);
                        baseMesh.layers.disable(1);
                        continue;
                    }
                    const EXIT_DUR = 0.8; // bloom+shrink duration
                    const cueEnd = L.ld.end;
                    const exitStart = cueEnd - EXIT_DUR;
                    // Effective fill: dots complete fill by exitStart
                    const effectiveEnd = Math.min(e.end, exitStart);
                    let dotFill;
                    if (ct >= effectiveEnd)
                        dotFill = 1;
                    else if (ct >= e.start)
                        dotFill = Math.min(1, (ct - e.start) / Math.max(0.01, effectiveEnd - e.start));
                    else
                        dotFill = 0;
                    const allFilled = L.entries.every(d => ct >= Math.min(d.end, exitStart));
                    const isPostCue = ct >= cueEnd;
                    if (isPostCue) {
                        baseMesh.scale.set(0.01, 0.01, 1);
                        baseMat.opacity = 0;
                        baseMat.color.setRGB(1, 1, 1);
                    }
                    else if (ct >= exitStart && allFilled) {
                        // ── Bloom + shrink-away: continuous from filled state ──
                        const t = (ct - exitStart) / EXIT_DUR; // 0→1
                        // Opacity: smooth fade, starts full bright
                        const opacity = Math.max(0, 1 - t * t);
                        // Scale: brief grow (bloom halo feel) then shrink to 0
                        // Peak at t≈0.15, then down to 0
                        const peakT = 0.15;
                        let sc;
                        if (t < peakT) {
                            sc = 1.0 + 0.25 * (t / peakT); // grow to 1.25
                        }
                        else {
                            sc = 1.25 * (1 - (t - peakT) / (1 - peakT)); // shrink to 0
                        }
                        sc = Math.max(0.01, sc);
                        baseMesh.scale.set(sc, sc, 1);
                        baseMat.opacity = opacity * e._cop * this.opacity;
                        // Subtle glow — just slight HDR color, keep on both layers
                        baseMesh.layers.enable(0);
                        baseMesh.layers.enable(1);
                        const bloom = 1.0 + 0.2 * opacity;
                        baseMat.color.setRGB(bloom, bloom, bloom);
                    }
                    else {
                        // Active/future: sequential brightness fill
                        baseMesh.position.y = 0;
                        baseMat.color.setRGB(1, 1, 1);
                        if (dotFill > 0) {
                            // Seamless transition: blend from waiting opacity to full brightness
                            const waitingOp = isActive ? 0.4 : 0.2;
                            const brightness = waitingOp + (1.0 - waitingOp) * dotFill;
                            baseMesh.scale.set(1, 1, 1);
                            baseMat.opacity = brightness * e._cop * this.opacity;
                            // No bloom during fill — just smooth opacity ramp, no color blink
                            baseMesh.layers.enable(0);
                            baseMesh.layers.disable(1);
                            baseMat.color.setRGB(1, 1, 1);
                            // When all filled but before exit: gentle bloom fade-in
                            if (allFilled) {
                                baseMat.color.setRGB(1.05, 1.05, 1.05);
                                baseMesh.layers.enable(1);
                            }
                        }
                        else {
                            // Waiting dots: dim, no bloom — prevents glow bleed from neighboring dots
                            baseMesh.layers.enable(0);
                            baseMesh.layers.disable(1);
                            const waitingOp = isActive ? 0.4 : 0.2;
                            baseMat.opacity = waitingOp * e._cop * this.opacity;
                            baseMesh.scale.set(1, 1, 1);
                        }
                    }
                    continue;
                }
                // ── ADLIB on non-active line: fast fade-out (from gpu-panel) ──
                if (e.ad && !isActive && !isPaired) {
                    e._tOp = 0.0;
                    e._cop += (e._tOp - e._cop) * fSnap;
                    if (e._cop < 0.01)
                        e._cop = 0;
                    if (e._isCharSplit && e._chars) {
                        for (const cm of e._chars) {
                            cm.base.material.opacity = UNFILLED * e._cop * this.opacity;
                            cm.fill.material.opacity = UNFILLED * e._cop * this.opacity;
                        }
                    }
                    else if (!e._isCueDot) {
                        e.base.material.opacity = UNFILLED * e._cop * this.opacity;
                        e.fill.material.opacity = UNFILLED * e._cop * this.opacity;
                    }
                }
                // ══════════════════════════════════════════════════════════════
                // ── CHAR-SPLIT SUNG/STRETCH: per-character traveling wave ──
                // ══════════════════════════════════════════════════════════════
                if (e._isCharSplit && e._chars) {
                    const n = e._charCount;
                    const wordDur = e.end - e.start;
                    const postroll = wordDur * 0.15;
                    const extEnd = e.end + postroll;
                    const extDur = extEnd - e.start;
                    const rawP = e._p;
                    // Smooth upward-only wave: Gaussian bump travels across chars
                    const fillProgress = extDur > 0 ? Math.max(0, Math.min(1, (ct - e.start) / extDur)) : 0;
                    // Wave position sweeps across chars
                    const wavePos = fillProgress * (n - 1);
                    const sigma = 2.2; // smooth, wide Gaussian envelope
                    // Cumulative char widths for clipRect fill sweep
                    let cumW = 0;
                    const charXOffsets = [];
                    for (let ci = 0; ci < n; ci++) {
                        charXOffsets.push(cumW);
                        cumW += e._charWidths[ci] || L.fs * 0.5;
                    }
                    const totalW = cumW;
                    const fillX = totalW * rawP;
                    const feather = totalW * FEATHER;
                    for (let ci = 0; ci < n; ci++) {
                        const cm = e._chars[ci];
                        const cw = e._charWidths[ci] || L.fs * 0.5;
                        const charStartX = charXOffsets[ci];
                        // Smooth upward-only wave: pure Gaussian bump, no oscillation
                        const dist = ci - wavePos;
                        const isWaving = (fillProgress > 0 && fillProgress < 1);
                        const envelope = isWaving ? Math.exp(-(dist * dist) / (2 * sigma * sigma)) : 0;
                        // Only upward displacement — smooth bell curve, no sine/cosine oscillation
                        const wave = envelope;
                        // Paired dimming
                        const charPairDim = (isPaired && isActive) ? 0.7 : 1.0;
                        // HARD RULE from gpu-panel: all words in same line state look identical in brightness.
                        // Past: show fill only (fully revealed), hide base to prevent double-stacking.
                        // Future: show base only (fill hidden via clipRect), uniform dim.
                        // Active: base=unfilled, fill sweeps left→right.
                        if (isPast) {
                            cm.base.material.opacity = 0; // hide base — fill is fully revealed
                            cm.fill.material.opacity = FILLED * e._cop * this.opacity;
                            if (cm.fill.clipRect)
                                cm.fill.clipRect = null;
                        }
                        else if (!isActive && !isPaired) {
                            // Future: only base visible, fill hidden
                            cm.base.material.opacity = UNFILLED * e._cop * this.opacity;
                            cm.fill.material.opacity = FILLED * e._cop * this.opacity;
                            cm.fill.clipRect = [-10, -10, -10, 10];
                        }
                        else {
                            // Active: normal base+fill with clipRect sweep
                            cm.base.material.opacity = UNFILLED * e._cop * charPairDim * this.opacity;
                            const charFillOp = FILLED * e._cop * charPairDim * this.opacity;
                            if (isFilled) {
                                cm.fill.material.opacity = charFillOp;
                                if (cm.fill.clipRect)
                                    cm.fill.clipRect = null;
                            }
                            else if (rawP <= 0) {
                                cm.fill.material.opacity = charFillOp;
                                cm.fill.clipRect = [-10, -10, -10, 10];
                            }
                            else {
                                cm.fill.material.opacity = charFillOp;
                                const localClip = fillX + feather - charStartX;
                                if (localClip <= 0) {
                                    cm.fill.clipRect = [-10, -10, -10, 10];
                                }
                                else if (localClip >= cw) {
                                    if (cm.fill.clipRect)
                                        cm.fill.clipRect = null;
                                }
                                else {
                                    cm.fill.clipRect = [-0.01, -10, localClip, 10];
                                }
                            }
                        }
                        // Smooth upward-only wave: gentle vertical scale + lift
                        const targetScY = 1 + 0.16 * wave;
                        const targetScX = 1 + 0.03 * wave;
                        const prevScY = cm._lerpScY ?? 1;
                        const prevScX = cm._lerpScX ?? 1;
                        const lf = 1 - Math.exp(-3.5 * dt);
                        const scY = prevScY + (targetScY - prevScY) * lf;
                        const scX = prevScX + (targetScX - prevScX) * lf;
                        cm._lerpScY = scY;
                        cm._lerpScX = scX;
                        cm.base.scale.set(scX, scY, 1);
                        cm.fill.scale.set(scX, scY, 1);
                        // Grow upward from baseline only
                        const yUp = (scY - 1) * L.fs * 0.5;
                        cm.base.position.y = (e._adBaseY || 0) + yUp;
                        cm.fill.position.y = (e._adBaseY || 0) + yUp;
                        // No horizontal shift — clean upward wave
                        cm.base.position.x = cm._baseX;
                        cm.fill.position.x = cm._baseX;
                        // Track per-char bloom: each char that the fill has passed stays "on fire"
                        // Use clip position to determine if char is already filled
                        const charRightEdge = charStartX + cw;
                        const charIsFilled = rawP >= 1 || charRightEdge <= fillX;
                        if (charIsFilled && !cm._charFilled)
                            cm._charFilled = true;
                        if (wave > 0.2) {
                            cm._charGlow = 0.6;
                        }
                        else if (cm._charFilled && isActive) {
                            if (!cm._charGlow || cm._charGlow < 0.3)
                                cm._charGlow = 0.3;
                            cm._charGlow *= 0.999;
                        }
                        else if (!isActive && cm._charGlow > 0) {
                            cm._charGlow *= 0.97;
                            if (cm._charGlow < 0.01)
                                cm._charGlow = 0;
                        }
                        // Track peak wave for whole-word glow
                        if (wave > e._glow)
                            e._glow = wave;
                        else
                            e._glow *= 0.95;
                        // BLOOM: HDR boost
                        const charGlow = cm._charGlow || 0;
                        if (charGlow > 0.01) {
                            const boost = 1.0 + 0.35 * charGlow;
                            cm.fill.color = new THREE.Color(boost, boost, boost);
                            cm.fill.layers.enable(0);
                        }
                        else {
                            cm.fill.color = 0xffffff;
                            cm.fill.layers.disable(0);
                        }
                    }
                    // Char-split adlib phrase reveal (from gpu-panel)
                    if (e.ad && L.hasInlineAdlibs && L._adPhrases) {
                        const phrases = L._adPhrases;
                        const pi = e._adPhraseIdx || 0;
                        const phrase = phrases[pi];
                        const lastEnd = L._adLastEnd || 0;
                        const timeUntil = phrase.start - ct;
                        let phraseVisible = (!isActive && ct > lastEnd) ? false : (ct >= phrase.start - 0.3);
                        if (!phraseVisible) {
                            e._tOp = 0.0;
                        }
                        else if (timeUntil > 0 && timeUntil <= 0.3) {
                            const inT = 1 - (timeUntil / 0.3);
                            e._tOp = inT * inT * 0.4 * effectiveOp;
                        }
                        else {
                            e._tOp = 0.45 * effectiveOp;
                        }
                        const adF = (e._tOp < e._cop) ? fSnap : f;
                        e._cop += (e._tOp - e._cop) * adF;
                        if (e._cop < 0.01)
                            e._cop = 0;
                        for (const cm of e._chars) {
                            cm.base.material.opacity = UNFILLED * e._cop * this.opacity;
                            cm.fill.material.opacity = FILLED * e._cop * this.opacity;
                        }
                    }
                    continue; // skip normal word processing
                }
                // ══════════════════════════════════════════════════════════════
                // ── STANDARD WORD: base=unfilled, fill=bright (gpu-panel golden code) ──
                // clipRect handles past (fully open) vs future (fully closed) vs active (sweep)
                // ══════════════════════════════════════════════════════════════
                const pairDim = (isPaired && isActive) ? 0.7 : 1.0;
                // Past: hide base to prevent double-stacking (matches char-split behavior)
                const baseOpacity = isPast ? 0 : UNFILLED * e._cop * pairDim * this.opacity;
                let fillOpacity = FILLED * e._cop * pairDim * this.opacity;
                if (e._clickFlash && e._clickFlash > 0) {
                    fillOpacity = Math.min(1, fillOpacity + 0.5 * e._clickFlash);
                }
                if (e.base.material)
                    e.base.material.opacity = baseOpacity;
                if (e.fill.material)
                    e.fill.material.opacity = fillOpacity;
                // ── FILL SWEEP via Troika clipRect (matches GPU panel golden code) ──
                if (isPast || isFilled) {
                    e.fill.clipRect = [-10, -10, 100, 10];
                }
                else if (isPaired && isActive) {
                    // Paired () lines: line-level fill sweep (from gpu-panel)
                    if (_lineP >= 1) {
                        e.fill.clipRect = [-10, -10, 100, 10];
                    }
                    else if (_lineP <= 0) {
                        e.fill.clipRect = [-10, -10, -10, 10];
                    }
                    else {
                        const lastE = L.entries[L.entries.length - 1];
                        const lineWidth = (lastE.base.position.x - L.entries[0].base.position.x) + lastE._w;
                        const sweepX = L.entries[0].base.position.x + lineWidth * _lineP;
                        const featherW = lineWidth * FEATHER;
                        const wordX = e.base.position.x;
                        const localClip = sweepX + featherW - wordX;
                        if (localClip <= 0)
                            e.fill.clipRect = [-10, -10, -10, 10];
                        else if (localClip >= e._w)
                            e.fill.clipRect = [-10, -10, 100, 10];
                        else
                            e.fill.clipRect = [-0.01, -10, localClip, 10];
                    }
                }
                else if (e._p <= 0) {
                    e.fill.clipRect = [-10, -10, -10, 10];
                }
                else {
                    const clipX = e._w * e._p;
                    const feather = e._w * FEATHER;
                    e.fill.clipRect = [-0.01, -10, clipX + feather, 10];
                }
                // ── SUNG/STRETCH Love wave (horizontal transverse displacement) ──
                // Love wave: words oscillate side-to-side (X offset) as wave propagates through.
                // The wave front travels left→right following fill progress, displacing each word
                // perpendicular (horizontally) to the direction of propagation.
                if (isStretch) {
                    const wordDur = e.end - e.start;
                    const postroll = wordDur * 0.3; // slow fade-out after word ends
                    const extEnd = e.end + postroll;
                    const isActive2 = ct >= e.start && ct < extEnd;
                    if (isActive2) {
                        // Progress within word+postroll: 0→1
                        const totalDur = extEnd - e.start;
                        const p2 = Math.max(0, Math.min(1, (ct - e.start) / totalDur));
                        // Envelope: gradual rise then slow fall — no instant spike
                        // Use sin(π*p) but with a slow-rise bias: pow(sin, 0.6) flattens the peak
                        const envelope = Math.pow(Math.sin(p2 * Math.PI), 0.6);
                        // Oscillation: gentle sinusoidal sway
                        const freq = Math.max(1.5, 3.5 / Math.max(0.3, wordDur));
                        const phase = (ct - e.start) * freq * Math.PI * 2;
                        const oscillation = Math.sin(phase);
                        // Love wave target: horizontal displacement modulated by envelope
                        const waveTarget = envelope * oscillation;
                        // Smooth interpolation for buttery motion
                        e._wave += (waveTarget - e._wave) * Math.min(1, dt * 8);
                    }
                    else if (ct >= extEnd) {
                        // After wave passes: smooth decay back to center
                        e._wave += (0 - e._wave) * Math.min(1, dt * 4);
                    }
                    else {
                        e._wave += (0 - e._wave) * fSlow;
                    }
                }
                else {
                    e._wave += (0 - e._wave) * fSlow;
                }
                // ── SCALE + Love wave X offset + bloom halo ──
                let tScX = 1, tScY = 1;
                const absWave = Math.abs(e._wave);
                if (absWave > 0.01) {
                    tScY = 1 + 0.08 * absWave;
                    tScX = 1 + 0.03 * absWave;
                    e._glow += (absWave - e._glow) * 0.18;
                }
                else if (isActive && e._p > 0) {
                    // Word still filling — hold glow steady
                    if (e._glow < 0.15)
                        e._glow = 0.15;
                }
                else {
                    // Word is past — smooth fade out
                    e._glow *= 0.97; // ~1.5s fade
                    if (e._glow < 0.001)
                        e._glow = 0;
                }
                // Love wave horizontal displacement (gentle sway)
                const loveOffsetX = e._wave * FONT_SIZE * 0.18;
                // Bloom: ONLY for stretch words — glow-based HDR boost with trail
                if (isStretch && e._glow > 0.003 && !e._isCueDot) {
                    const g = e._glow;
                    // Moderate HDR: up to 1.25x at peak — not a blob, just a soft halo
                    const boost = 1.0 + 0.25 * g;
                    e.fill.color = new THREE.Color(boost, boost, boost);
                    e.fill.layers.enable(0);
                }
                else {
                    e.fill.color = 0xffffff;
                    e.fill.layers.disable(0);
                }
                e._scX += (tScX - e._scX) * f;
                e._scY += (tScY - e._scY) * f;
                e.base.scale.set(e._scX, e._scY, 1);
                e.fill.scale.set(e._scX, e._scY, 1);
                // Pin baseline — scale grows upward + Love wave X offset
                if (!e.ad || !L.hasInlineAdlibs) {
                    const baseLayoutY = e._adBaseY || 0;
                    const yComp = (e._scY - 1) * L.fs * 0.5;
                    e.base.position.y = baseLayoutY + yComp;
                    e.fill.position.y = baseLayoutY + yComp;
                    // Love wave: horizontal transverse displacement
                    if (e._baseX === undefined)
                        e._baseX = e.base.position.x;
                    e.base.position.x = (e._baseX ?? 0) + loveOffsetX;
                    e.fill.position.x = (e._baseX ?? 0) + loveOffsetX;
                }
                // ── INLINE ADLIB — phrase-grouped reveal (from gpu-panel) ──
                if (e.ad && L.hasInlineAdlibs && L._adPhrases) {
                    const phrases = L._adPhrases;
                    const pi = e._adPhraseIdx || 0;
                    const phrase = phrases[pi];
                    const lastEnd = L._adLastEnd || 0;
                    const timeUntil = phrase.start - ct;
                    let phraseVisible;
                    if (!isActive && ct > lastEnd)
                        phraseVisible = false;
                    else if (ct >= phrase.start - 0.3)
                        phraseVisible = true;
                    else
                        phraseVisible = false;
                    if (!phraseVisible) {
                        e._tOp = 0.0;
                    }
                    else if (timeUntil > 0 && timeUntil <= 0.3) {
                        const inT = 1 - (timeUntil / 0.3);
                        e._tOp = inT * inT * 0.4 * effectiveOp;
                    }
                    else {
                        e._tOp = 0.45 * effectiveOp;
                    }
                    const adF = (e._tOp < e._cop) ? fSnap : f;
                    e._cop += (e._tOp - e._cop) * adF;
                    if (e._cop < 0.01)
                        e._cop = 0;
                    e.base.position.y += ((e._adBaseY || 0) - e.base.position.y) * f;
                    e.fill.position.y = e.base.position.y;
                    e.base.material.opacity = UNFILLED * e._cop * this.opacity;
                    e.fill.material.opacity = FILLED * e._cop * this.opacity;
                    // Fill sweep for adlib
                    if (isPast || isFilled)
                        e.fill.clipRect = [-10, -10, 100, 10];
                    else if (e._p <= 0)
                        e.fill.clipRect = [-10, -10, -10, 10];
                    else {
                        const clipX = e._w * e._p;
                        const feather = e._w * FEATHER;
                        e.fill.clipRect = [-0.01, -10, clipX + feather, 10];
                    }
                }
                else if (e.ad && L.ad && !L._standaloneAdlib) {
                    // Full adlib line — per-word timing (from gpu-panel)
                    const timeUntil = e.start - ct;
                    if (ct > e.end) {
                        const elapsedSince = ct - e.end;
                        const fadeOut = Math.max(0, 1 - elapsedSince / 0.25);
                        e._tOp = fadeOut * 0.35 * effectiveOp;
                    }
                    else if (e._p > 0) {
                        e._tOp = 0.4 * effectiveOp;
                    }
                    else if (timeUntil <= 0.35 && timeUntil > 0) {
                        const inT = 1 - (timeUntil / 0.35);
                        e._tOp = inT * inT * 0.3 * effectiveOp;
                    }
                    else {
                        e._tOp = 0.0;
                    }
                    e._cop += (e._tOp - e._cop) * f;
                    if (e._cop < 0.01)
                        e._cop = 0;
                    e.base.position.y += ((e._adBaseY || 0) - e.base.position.y) * f;
                    e.fill.position.y = e.base.position.y;
                    e.base.material.opacity = UNFILLED * e._cop * this.opacity;
                    e.fill.material.opacity = FILLED * e._cop * this.opacity;
                    if (isPast || isFilled)
                        e.fill.clipRect = [-10, -10, 100, 10];
                    else if (e._p <= 0)
                        e.fill.clipRect = [-10, -10, -10, 10];
                    else {
                        const clipX = e._w * e._p;
                        const feather = e._w * FEATHER;
                        e.fill.clipRect = [-0.01, -10, clipX + feather, 10];
                    }
                }
            }
        }
        // ── Translation mesh opacity (matches DOM .show-translations opacity rules) ──
        if (this._translationVisible && this._translationMeshes.length) {
            for (let li = 0; li < this.lines.length; li++) {
                const mesh = this._translationMeshes[li];
                if (!mesh?.material)
                    continue;
                const L = this.lines[li];
                const isActive = activeSet.has(li);
                const d = li - ai;
                let transOp;
                if (isActive)
                    transOp = 0.4;
                else if (li < ai || d === 1)
                    transOp = 0.5;
                else if (d === 2)
                    transOp = 0.4;
                else if (d === 3 || d === 4)
                    transOp = 0.3;
                else
                    transOp = 0.2;
                // Modulate by line opacity and global opacity
                mesh.material.opacity = transOp * L._cOp * this.opacity;
            }
        }
        // DEBUG: periodic compact dump
        this.debugPeriodicDump(ct, ai);
    }
    addToScene(scene) {
        scene.add(this.group);
    }
    removeFromScene(scene) {
        scene.remove(this.group);
    }
    dispose() {
        this.disposeLines();
    }
    /**
     * DEBUG: Read actual rendered pixel color at a canvas position.
     * Call from click handler with the renderer reference.
     */
    debugReadPixel(renderer, canvasX, canvasY) {
        try {
            const gl = renderer.getContext();
            const pixelRatio = renderer.getPixelRatio();
            const x = Math.floor(canvasX * pixelRatio);
            const y = Math.floor((renderer.domElement.height / pixelRatio - canvasY) * pixelRatio); // flip Y
            const pixels = new Uint8Array(4);
            gl.readPixels(x, y, 1, 1, gl.RGBA, gl.UNSIGNED_BYTE, pixels);
            return { r: pixels[0], g: pixels[1], b: pixels[2], a: pixels[3] };
        }
        catch (e) {
            console.warn('[LR-DEBUG] readPixels failed:', e);
            return null;
        }
    }
    /**
     * DEBUG: Shift+Click inspector — reads actual pixel color + dumps word state.
     * Pass the renderer from ThreeOrchestrator.
     */
    debugInspectClick(ndcX, ndcY, renderer, clientX, clientY) {
        console.log(`%c[LR-INSPECT] ═══ PIXEL COLOR PICKER ═══`, 'color: #0ff; font-weight: bold; font-size: 14px');
        console.log(`  ready=${this.ready} lines=${this.lines.length} ndcX=${ndcX.toFixed(3)} ndcY=${ndcY.toFixed(3)}`);
        if (!this.ready || !this.lines.length) {
            console.log('  %cNo lyrics loaded or not ready yet', 'color: #f80');
            console.log(`%c[LR-INSPECT] ═══════════════════════`, 'color: #0ff');
            return;
        }
        const rect = renderer.domElement.getBoundingClientRect();
        const canvasX = clientX - rect.left;
        const canvasY = clientY - rect.top;
        // Read actual rendered pixel
        const pixel = this.debugReadPixel(renderer, canvasX, canvasY);
        const pixelStr = pixel ? `rgba(${pixel.r},${pixel.g},${pixel.b},${pixel.a})` : 'FAILED';
        // Also sample a 5x5 grid around click point
        const samples = [];
        if (pixel) {
            for (let dy = -2; dy <= 2; dy++) {
                for (let dx = -2; dx <= 2; dx++) {
                    const p = this.debugReadPixel(renderer, canvasX + dx * 2, canvasY + dy * 2);
                    if (p && p.a > 0)
                        samples.push(`(${p.r},${p.g},${p.b},${p.a})`);
                }
            }
        }
        // Find the word closest to click
        const clickX = ndcX / (this._aspectX || 1);
        let bestEntry = null;
        let bestLine = null;
        let bestDist = Infinity;
        let bestLi = -1;
        for (let li = 0; li < this.lines.length; li++) {
            const L = this.lines[li];
            const groupY = L.group.position.y;
            const groupScale = L._cSc || 1;
            for (const e of L.entries) {
                if (e._isCueDot)
                    continue;
                const wy = groupY + (e._adBaseY || 0) * groupScale;
                const wx = L.group.position.x + e.base.position.x * groupScale;
                const dy = Math.abs(ndcY - wy);
                if (dy > L.fs * 2)
                    continue;
                const wordRight = wx + e._w * groupScale;
                const dist = dy + Math.abs(clickX - (wx + wordRight) / 2) * 0.3;
                if (dist < bestDist) {
                    bestDist = dist;
                    bestEntry = e;
                    bestLine = L;
                    bestLi = li;
                }
            }
        }
        const ai = this.activeLineIdx;
        console.log(`  Canvas pos: (${canvasX.toFixed(0)}, ${canvasY.toFixed(0)})  NDC: (${ndcX.toFixed(3)}, ${ndcY.toFixed(3)})`);
        console.log(`  %cActual rendered pixel: ${pixelStr}`, `color: rgb(${pixel?.r},${pixel?.g},${pixel?.b}); font-weight: bold; font-size: 13px; background: #222; padding: 2px 8px`);
        if (samples.length)
            console.log(`  5×5 non-transparent samples (${samples.length}): ${samples.slice(0, 8).join(' ')}`);
        console.log(`  Global opacity: ${this.opacity.toFixed(3)}, aspectX: ${this._aspectX.toFixed(3)}, scrollY: ${this.scrollY.toFixed(3)}`);
        if (bestEntry && bestLine) {
            const e = bestEntry;
            const L = bestLine;
            const rel = bestLi < ai ? `PAST(${ai - bestLi})` : bestLi === ai ? 'ACTIVE' : `FUTURE(${bestLi - ai})`;
            console.log(`  %cWord: "${e.text}" | line #${bestLi} ${rel} | wt=${e.wt} ad=${e.ad}`, 'color: #ff0; font-weight: bold');
            console.log(`  Line state: cOp=${L._cOp.toFixed(4)} cSc=${L._cSc.toFixed(4)} cOy=${L._cOy.toFixed(4)} tOp=${L._tOp.toFixed(4)}`);
            console.log(`  Word state: _p=${e._p.toFixed(4)} _cop=${e._cop.toFixed(4)} _tOp=${e._tOp.toFixed(4)} _wave=${e._wave.toFixed(4)} _glow=${e._glow.toFixed(4)}`);
            console.log(`  Word time: start=${e.start.toFixed(3)} end=${e.end.toFixed(3)} dur=${(e.end - e.start).toFixed(3)}`);
            if (e._isCharSplit && e._chars) {
                console.log(`  CHAR-SPLIT: ${e._charCount} chars`);
                for (const cm of e._chars) {
                    const bOp = cm.base?.material?.opacity;
                    const fOp = cm.fill?.material?.opacity;
                    const fCol = cm.fill?.color;
                    const fColStr = fCol?.isColor ? `rgb(${(fCol.r * 255).toFixed(0)},${(fCol.g * 255).toFixed(0)},${(fCol.b * 255).toFixed(0)})` : String(fCol);
                    const clipStr = cm.fill?.clipRect ? `[${cm.fill.clipRect.map((v) => v.toFixed(2)).join(',')}]` : 'null';
                    const fScStr = cm.fill?.scale ? `(${cm.fill.scale.x.toFixed(3)},${cm.fill.scale.y.toFixed(3)})` : '?';
                    console.log(`    char[${cm.idx}]: base.op=${bOp?.toFixed(4)} fill.op=${fOp?.toFixed(4)} fill.col=${fColStr} fill.scale=${fScStr} clip=${clipStr}`);
                }
            }
            else {
                const bOp = e.base?.material?.opacity;
                const fOp = e.fill?.material?.opacity;
                const bCol = e.base?.color;
                const fCol = e.fill?.color;
                const bColStr = bCol?.isColor ? `rgb(${(bCol.r * 255).toFixed(0)},${(bCol.g * 255).toFixed(0)},${(bCol.b * 255).toFixed(0)})` : String(bCol);
                const fColStr = fCol?.isColor ? `rgb(${(fCol.r * 255).toFixed(0)},${(fCol.g * 255).toFixed(0)},${(fCol.b * 255).toFixed(0)})` : String(fCol);
                const clipStr = e.fill?.clipRect ? `[${e.fill.clipRect.map((v) => v.toFixed(2)).join(',')}]` : 'null';
                const fScStr = e.fill?.scale ? `(${e.fill.scale.x.toFixed(2)},${e.fill.scale.y.toFixed(2)})` : '?';
                console.log(`  base: opacity=${bOp?.toFixed(4)} color=${bColStr}`);
                console.log(`  fill: opacity=${fOp?.toFixed(4)} color=${fColStr} clipRect=${clipStr} scale=${fScStr}`);
                console.log(`  scale: (${e._scX.toFixed(3)}, ${e._scY.toFixed(3)}) layers: fill.mask=${e.fill?.layers?.mask}`);
            }
            // Expected vs actual pixel analysis
            if (pixel && pixel.a > 0) {
                const expectedBrightness = Math.round(255 * (e._isCharSplit ? UNFILLED : UNFILLED) * e._cop * this.opacity);
                const actualBrightness = Math.round((pixel.r + pixel.g + pixel.b) / 3);
                console.log(`  %cExpected brightness ~${expectedBrightness} | Actual pixel brightness ~${actualBrightness} | Delta: ${actualBrightness - expectedBrightness}`, Math.abs(actualBrightness - expectedBrightness) > 20 ? 'color: #f00; font-weight: bold' : 'color: #0f0');
            }
        }
        else {
            console.log('  %cNo word found near click', 'color: #f80; font-weight: bold');
        }
        console.log(`%c[LR-INSPECT] ═══════════════════════`, 'color: #0ff');
    }
    /**
     * DEBUG: Periodic dump — call from update() to log a compact comparison table every N seconds.
     * Shows all word types in visible lines and their actual material opacities.
     */
    debugPeriodicDump(ct, ai) {
        if (!this._debugEnabled)
            return;
        if (ct - this._debugLastDump < 5)
            return; // every 5 sec
        this._debugLastDump = ct;
        const from = Math.max(0, ai - 2);
        const to = Math.min(this.lines.length - 1, ai + 5);
        console.log(`%c[LR-DUMP] t=${ct.toFixed(2)} active=#${ai} globalOp=${this.opacity.toFixed(3)} scrollY=${this.scrollY.toFixed(3)}`, 'color: #0ff; font-weight: bold');
        for (let li = from; li <= to; li++) {
            const L = this.lines[li];
            if (!L || L.isCue)
                continue;
            const rel = li < ai ? `past(${ai - li})` : li === ai ? 'ACTIVE' : `fut(${li - ai})`;
            const words = L.entries.filter(e => !e._isCueDot).map(e => {
                if (e._isCharSplit && e._chars) {
                    const cm0 = e._chars[0];
                    const fScStr = cm0.fill?.scale ? `(${cm0.fill.scale.x.toFixed(2)},${cm0.fill.scale.y.toFixed(2)})` : '?';
                    return `"${e.text}"[${e.wt}] bOp=${cm0.base?.material?.opacity?.toFixed(3) || '?'} fOp=${cm0.fill?.material?.opacity?.toFixed(3) || '?'} fSc=${fScStr} clip=${cm0.fill?.clipRect ? 'Y' : 'N'} p=${e._p.toFixed(2)}`;
                }
                else {
                    const fScStr = e.fill?.scale ? `(${e.fill.scale.x.toFixed(2)},${e.fill.scale.y.toFixed(2)})` : '?';
                    return `"${e.text}"[${e.wt}] bOp=${e.base?.material?.opacity?.toFixed(3) || '?'} fOp=${e.fill?.material?.opacity?.toFixed(3) || '?'} fSc=${fScStr} clip=${e.fill?.clipRect ? (e.fill.clipRect[2] > 0 ? 'open' : 'shut') : 'null'} p=${e._p.toFixed(2)}`;
                }
            });
            console.log(`  #${li} ${rel.padEnd(8)} cOp=${L._cOp.toFixed(3)} | ${words.join(' | ')}`);
        }
    }
    /** Enable/disable debug mode. When enabled, logs every 5s + Shift+Click to inspect, reads pixel. */
    setDebug(enabled) {
        this._debugEnabled = enabled;
        console.log(`[LyricsRenderer] Debug mode ${enabled ? 'ON — Shift+Click to inspect, logs every 5s' : 'OFF'}`);
    }
    // ══════════════════════════════════════════════════════════════════════════════
    // ── TRANSLATIONS ──
    // ══════════════════════════════════════════════════════════════════════════════
    /** Set translation strings — parallel array to non-cue lines (same as DOM LyricsEngine) */
    setTranslations(translations) {
        this._translations = Array.isArray(translations) ? translations : [];
        // Dispose old translation meshes
        for (const mesh of this._translationMeshes) {
            if (mesh)
                mesh.dispose();
        }
        this._translationMeshes = [];
        if (!this.lines.length || !this._translations.length)
            return;
        // Create translation meshes — one per non-cue line
        const TRANS_FS = FONT_SIZE * 0.55;
        let transIdx = 0;
        for (let li = 0; li < this.lines.length; li++) {
            const L = this.lines[li];
            if (L.isCue) {
                this._translationMeshes.push(null);
                continue;
            }
            const text = this._translations[transIdx] || '';
            transIdx++;
            if (!text) {
                this._translationMeshes.push(null);
                continue;
            }
            const mesh = new Text();
            mesh.text = text;
            mesh.font = FONT;
            mesh.fontSize = TRANS_FS;
            mesh.maxWidth = TEXT_MAX_WIDTH;
            mesh.unicodeFontsURL = UNICODE_FONTS_URL;
            mesh.fontWeight = 400; // normal weight for translation
            mesh.fontStyle = 'italic';
            mesh.anchorX = 'left';
            mesh.anchorY = 'top';
            mesh.color = 0xffffff;
            mesh.transparent = true;
            mesh.sdfGlyphSize = 64;
            mesh.gpuAccelerateSDF = true;
            mesh.layers.set(1); // sharp layer only, no bloom
            // Position below the main line — if adlibs exist, push below them too
            let mainLowestY = 0;
            for (const e of L.entries) {
                if (!e.ad && (e._baseY || 0) < mainLowestY)
                    mainLowestY = e._baseY || 0;
            }
            // If line has inline adlibs, find their lowest point and position below that
            let adlibLowestY = mainLowestY;
            if (L.hasInlineAdlibs) {
                for (const e of L.entries) {
                    if (e.ad && (e._adBaseY || 0) < adlibLowestY)
                        adlibLowestY = e._adBaseY || 0;
                }
            }
            mesh.position.set(TEXT_LEFT, adlibLowestY - L.fs * 0.6, Z_DEPTH);
            L.group.add(mesh);
            mesh.sync(() => {
                if (mesh.material) {
                    mesh.material.transparent = true;
                    mesh.material.depthWrite = false;
                    mesh.material.depthTest = false;
                    mesh.material.opacity = 0;
                }
            });
            this._translationMeshes.push(mesh);
        }
    }
    /** Show/hide translations */
    setTranslationsVisible(visible) {
        this._translationVisible = visible;
        // If hiding, immediately set opacity to 0
        if (!visible) {
            for (const mesh of this._translationMeshes) {
                if (mesh?.material)
                    mesh.material.opacity = 0;
            }
        }
    }
}
