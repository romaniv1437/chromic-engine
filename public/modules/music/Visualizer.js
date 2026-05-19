import { PRESET_REGISTRY } from './presets/index.js';

const PRESETS = Object.keys(PRESET_REGISTRY);

const normalizePresetId = (value) => {
  if (value === 'rgb-bubbles') {
    return 'rgb-magic-bubbles';
  }
  return value;
};

const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

const averageRange = (values, start, end) => {
  if (!values?.length) {
    return 0;
  }

  const safeStart = clamp(Math.floor(start), 0, values.length - 1);
  const safeEnd = clamp(Math.floor(end), safeStart + 1, values.length);
  let sum = 0;
  let count = 0;
  for (let index = safeStart; index < safeEnd; index += 1) {
    sum += values[index] || 0;
    count += 1;
  }
  return count ? sum / (count * 255) : 0;
};

export const computeAudioBands = (values) => {
  const length = values?.length || 0;
  if (!length) {
    return { bass: 0, mid: 0, treble: 0, energy: 0 };
  }

  const bass = averageRange(values, 1, Math.max(4, length * 0.08));
  const mid = averageRange(values, length * 0.08, length * 0.42);
  const treble = averageRange(values, length * 0.42, length * 0.92);
  const energy = averageRange(values, 0, length);

  return { bass, mid, treble, energy };
};

// ─── MOOD STATE MACHINE ─────────────────────────────────────────────────────
// Color is driven by song STRUCTURE, not individual beats.
// Transients (kicks, snares) affect ONLY pulse channels (bloom, lightness offset).
// Hue and saturation are LOCKED to the current mood state.

const lerpValue = (a, b, t) => a + (b - a) * t;

// ── DYNAMIC MOOD GRADIENT — seeded per-track from artwork identity ──
// Instead of hardcoded hues, each track gets a unique IdentityHue derived
// from its album artwork (or a random hue if no artwork).
// The gradient is built as OFFSETS from the identity hue so every track
// has a unique color personality while mood transitions stay smooth.

let _identityHue = 190;       // current track's identity hue (set from artwork)
let _identityChillHue = 190;  // artwork dominant (cool) hue
let _identityDriveHue = 10;   // artwork accent (vibrant) hue

/**
 * Build a mood gradient from the track's identity hues.
 * CHILL zone orbits the dominant (cool) hue, DRIVE zone orbits the accent (hot) hue,
 * BALANCED interpolates between them.
 */
const buildMoodGradient = (chillHue, driveHue) => {
  const wrap = (h) => ((h % 360) + 360) % 360;

  // Calculate the shortest angular distance from chill end to drive start
  const chillEnd = wrap(chillHue + 40);
  const driveStart = wrap(driveHue - 30);
  let gap = driveStart - chillEnd;
  if (gap > 180) gap -= 360;
  if (gap < -180) gap += 360;

  // Build intermediate bridge stops if the gap between chill zone and drive zone
  // exceeds 120° — this prevents interpolation through the wrong side of the wheel
  const bridgeStops = [];
  if (Math.abs(gap) > 120) {
    // Insert 1-2 midpoints along the shortest path
    const mid1 = wrap(chillEnd + gap * 0.33);
    const mid2 = wrap(chillEnd + gap * 0.67);
    bridgeStops.push(
      { h: mid1, s: 68, l: 46 },  // bridge 1
      { h: mid2, s: 74, l: 48 },  // bridge 2
    );
  } else if (Math.abs(gap) > 60) {
    const mid = wrap(chillEnd + gap * 0.5);
    bridgeStops.push({ h: mid, s: 70, l: 47 });
  }

  // ── Fury always pushes toward warm/aggressive hues (red/orange/magenta) ──
  // regardless of album art. This ensures high-energy sections never feel "cold".
  // We blend the drive hue toward the nearest warm anchor for fury stops.
  const WARM_ANCHORS = [0, 30, 330]; // red, orange, magenta
  let nearestWarm = WARM_ANCHORS[0];
  let nearestDist = 360;
  for (const anchor of WARM_ANCHORS) {
    let d = Math.abs(driveHue - anchor);
    if (d > 180) d = 360 - d;
    if (d < nearestDist) { nearestDist = d; nearestWarm = anchor; }
  }
  // Fury hue: blend 40% toward nearest warm anchor so it always feels hot
  let furyDiff = nearestWarm - driveHue;
  if (furyDiff > 180) furyDiff -= 360;
  if (furyDiff < -180) furyDiff += 360;
  const furyHue = wrap(driveHue + furyDiff * 0.4);
  const preFuryHue = wrap(driveHue + furyDiff * 0.2);

  return [
    { h: wrap(chillHue - 25), s: 65, l: 38 },   // deep ambient (cool side)
    { h: wrap(chillHue),      s: 70, l: 42 },   // chill
    { h: wrap(chillHue + 20), s: 65, l: 45 },   // moderate chill
    { h: chillEnd,            s: 60, l: 42 },   // balanced-low
    ...bridgeStops,                               // bridge stops (0-2)
    { h: driveStart,          s: 78, l: 50 },   // balanced-high
    { h: wrap(driveHue - 10), s: 70, l: 48 },   // moderate drive
    { h: wrap(driveHue),      s: 85, l: 48 },   // high drive
    { h: preFuryHue,          s: 88, l: 46 },   // pre-fury (warming up)
    { h: furyHue,             s: 92, l: 44 },   // fury (warm/aggressive)
  ];
};

let MOOD_GRADIENT = buildMoodGradient(_identityChillHue, _identityDriveHue);

/**
 * Set the track's identity hues from artwork analysis.
 * @param {number} chillHue — dominant/background hue from artwork (cool anchor)
 * @param {number} driveHue — vibrant/accent hue from artwork (hot anchor)
 */
export const setTrackIdentity = (chillHue, driveHue) => {
  _identityChillHue = chillHue;
  _identityDriveHue = driveHue;
  _identityHue = chillHue;
  MOOD_GRADIENT = buildMoodGradient(chillHue, driveHue);
  if(window.__DEBUG__)console.log(`[viz-mood] 🎨 TRACK IDENTITY SET | chill: ${chillHue.toFixed(0)}° | drive: ${driveHue.toFixed(0)}° | gradient rebuilt`);
};

// For backward compat: map old state names from the gradient position
const excitementToStateName = (e) => {
  if (e < 0.08) return 'deep';
  if (e < 0.35) return 'chill';
  if (e < 0.60) return 'balanced';
  if (e < 0.82) return 'drive';
  return 'fury';
};

// Also export as MOOD_PALETTES for any code that reads it by state name (dynamic)
const MOOD_PALETTES = new Proxy({}, {
  get(_, key) {
    const len = MOOD_GRADIENT.length;
    const map = { deep: 0, chill: 1, balanced: Math.floor(len / 2), drive: len - 3, fury: len - 1 };
    return MOOD_GRADIENT[map[key] ?? Math.floor(len / 2)];
  }
});

/**
 * Interpolate through the gradient stops based on excitement (0→1).
 * Applies a contrast curve so typical music energy (0.3–0.8) spreads
 * across MORE of the gradient instead of always landing in the same spot.
 * Returns {h, s, l}.
 */
const sampleGradient = (excitement) => {
  // Contrast curve: spread the 0.2-0.7 range across 0.1-0.9 of the gradient
  // Uses a smooth S-curve (sigmoid-like) centered at 0.45 (typical music energy center)
  const centered = (excitement - 0.45) * 2.8; // map 0.25-0.65 → -0.56..0.56
  const curved = 0.5 + 0.5 * Math.tanh(centered); // S-curve → 0.13..0.87
  const e = clamp(curved, 0, 1);
  const segments = MOOD_GRADIENT.length - 1;
  const pos = e * segments;
  const idx = Math.min(Math.floor(pos), segments - 1);
  const t = pos - idx; // fractional position within segment

  const a = MOOD_GRADIENT[idx];
  const b = MOOD_GRADIENT[idx + 1];

  // Hue: shortest path
  let hDiff = b.h - a.h;
  if (hDiff > 180) hDiff -= 360;
  if (hDiff < -180) hDiff += 360;
  let h = a.h + hDiff * t;
  if (h < 0) h += 360;
  if (h >= 360) h -= 360;

  return {
    h,
    s: a.s + (b.s - a.s) * t,
    l: a.l + (b.l - a.l) * t,
  };
};

// State machine persistent state
const _moodState = {
  // Smoothed excitement (the "mood memory" — moves like honey)
  smoothedExcitement: 0.5,
  // Current state name (derived from smoothedExcitement, for compat)
  state: 'balanced',
  // For pending/accumulator compat (now unused but kept for log format)
  accumulator: 0,
  pendingState: null,
  // Current rendered color (lerps toward gradient sample)
  currentH: 160,
  currentS: 65,
  currentL: 45,
  // Motion channel (medium speed)
  intensity: 0,
  // Raw energy tracker for long-window average
  energyWindow: [],
  windowSize: 180,          // 3 seconds at 60fps
  // ── Adaptive normalization: track the energy range of the current track ──
  trackMin: 1.0,
  trackMax: 0.0,
  trackSamples: 0,
  adaptiveWarmup: 300,      // ~5 seconds warmup
};

/**
 * Compute the long-window average excitement.
 * This filters out ALL transients (kicks, snares, claps).
 * Only sustained energy shifts move this value.
 *
 * Returns { raw, normalized } — raw is the absolute windowed average,
 * normalized is 0-1 relative to the track's observed energy range.
 */
const getWindowedExcitement = (rawExcitement) => {
  _moodState.energyWindow.push(rawExcitement);
  if (_moodState.energyWindow.length > _moodState.windowSize) {
    _moodState.energyWindow.shift();
  }
  let sum = 0;
  for (let i = 0; i < _moodState.energyWindow.length; i++) sum += _moodState.energyWindow[i];
  const raw = sum / _moodState.energyWindow.length;

  // ── Adaptive normalization: calibrate what "loud" means for THIS track ──
  // During warmup (~5s), track the energy range. After warmup, normalize
  // so quiet acoustic tracks still get full color range.
  _moodState.trackSamples++;
  if (raw < _moodState.trackMin) _moodState.trackMin = raw;
  if (raw > _moodState.trackMax) _moodState.trackMax = raw;

  if (_moodState.trackSamples > _moodState.adaptiveWarmup) {
    const range = _moodState.trackMax - _moodState.trackMin;
    if (range > 0.03) {
      // Blend: 60% adaptive + 40% absolute — prevents quiet tracks from being
      // ALL fury while still spreading the color range meaningfully
      const normalized = (raw - _moodState.trackMin) / range;
      return clamp(normalized * 0.6 + raw * 0.4, 0, 1);
    }
  }

  // During warmup or for very flat tracks, use absolute energy
  return clamp(raw, 0, 1);
};

/**
 * Reset the mood state for a new track.
 * Clears energy history and adaptive normalization so each track starts fresh.
 */
export const resetMoodState = () => {
  _moodState.energyWindow = [];
  _moodState.smoothedExcitement = 0.5;
  _moodState.state = 'balanced';
  _moodState.accumulator = 0;
  _moodState.pendingState = null;
  _moodState.trackMin = 1.0;
  _moodState.trackMax = 0.0;
  _moodState.trackSamples = 0;
  _moodState.intensity = 0;
  // Reset color to the track's chill identity hue (starting point of the gradient)
  const startGradient = MOOD_GRADIENT[1] || { h: 160, s: 65, l: 45 };
  _moodState.currentH = startGradient.h;
  _moodState.currentS = startGradient.s;
  _moodState.currentL = startGradient.l;
  if(window.__DEBUG__)console.log('[viz-mood] 🎵 TRACK RESET — adaptive normalization cleared');
};

export const computeMoodProfile = (bands, { intensity = 1, sensitivity = 1, deltaTime = 1 / 60 } = {}) => {
  const bass = clamp(Number(bands?.bass) || 0, 0, 1);
  const mid = clamp(Number(bands?.mid) || 0, 0, 1);
  const treble = clamp(Number(bands?.treble) || 0, 0, 1);
  const energy = clamp(Number(bands?.energy) || 0, 0, 1);

  // Structural energy includes bass, mid, AND treble so different genres
  // (bass-heavy hip-hop vs mid-heavy rock vs treble-rich EDM) get different colors.
  // Mid and treble are boosted since bass often saturates — we want COLOR variety not just volume.
  const structuralEnergy = bass * 0.35 + mid * 0.40 + treble * 0.25;
  const weightedIntensity = clamp(structuralEnergy * sensitivity * intensity, 0, 1.6);
  const rawExcitement = clamp(weightedIntensity, 0, 1);

  // Safety: clamp deltaTime to prevent jumps on tab-switch or lag spikes
  const safeDt = clamp(deltaTime, 0.001, 0.1);

  // ── Step 1: Windowed average (filters ALL transients) ──
  const windowedExcitement = getWindowedExcitement(rawExcitement);

  // ── Step 2: Smooth the excitement with very slow EMA ("mood memory") ──
  // α≈0.015 → mood shifts over ~5-8 seconds, not per-word or per-beat
  const moodAlpha = clamp(0.015 * (safeDt * 60), 0.002, 0.04);
  _moodState.smoothedExcitement = lerpValue(_moodState.smoothedExcitement, windowedExcitement, moodAlpha);
  const smoothE = _moodState.smoothedExcitement;

  // Derive state name from continuous value (for backward compat / logging)
  const moodState = excitementToStateName(smoothE);
  _moodState.state = moodState;

  // ── Step 3: Sample the continuous gradient at the smoothed excitement ──
  const targetColor = sampleGradient(smoothE);

  // Periodic mood status log (~every 30 seconds — diagnostic only)
  if (!_moodState._lastStatusLog || performance.now() - _moodState._lastStatusLog > 30000) {
    _moodState._lastStatusLog = performance.now();
    console.log(
      `[viz-mood] 📊 STATUS | mood: "${moodState}" (excitement: ${smoothE.toFixed(3)}) | ` +
      `windowed: ${windowedExcitement.toFixed(3)} | raw: ${rawExcitement.toFixed(3)} | ` +
      `bass: ${bass.toFixed(2)} mid: ${mid.toFixed(2)} treble: ${treble.toFixed(2)} (SHIELDED) | ` +
      `target color: H:${targetColor.h.toFixed(0)} S:${targetColor.s.toFixed(0)} L:${targetColor.l.toFixed(0)} | ` +
      `current color: H:${_moodState.currentH.toFixed(1)} S:${_moodState.currentS.toFixed(1)} L:${_moodState.currentL.toFixed(1)}`
    );
  }

  // ── Step 4: Lerp rendered color toward gradient sample ──
  // α=0.008 per frame → smooth ~8-12 second visual morph
  // Prevents per-word/per-beat color flickering — mood is a slow wash
  const colorAlpha = clamp(0.008 * (safeDt * 60), 0.001, 0.025);

  // Hue wrapping — shortest path around the color wheel
  let hDiff = targetColor.h - _moodState.currentH;
  if (hDiff > 180) hDiff -= 360;
  if (hDiff < -180) hDiff += 360;

  let nextH = _moodState.currentH + hDiff * colorAlpha;
  if (nextH < 0) nextH += 360;
  if (nextH >= 360) nextH -= 360;

  _moodState.currentH = nextH;
  _moodState.currentS = lerpValue(_moodState.currentS, targetColor.s, colorAlpha);
  _moodState.currentL = lerpValue(_moodState.currentL, targetColor.l, colorAlpha);

  const moodColor = {
    h: _moodState.currentH,
    s: _moodState.currentS,
    l: _moodState.currentL,
  };

  // ── Step 5: Motion channel (medium-speed EMA) ──
  const motionAlpha = clamp(0.2 * (safeDt * 60), 0.01, 0.5);
  _moodState.intensity = lerpValue(_moodState.intensity, weightedIntensity, motionAlpha);

  // Hue shift from neutral (for presets that use it)
  const hueShift = moodColor.h - 180;

  // Lightness pulse — hard-capped at ±4% (subtle breath, not strobe)
  const lightnessOffset = clamp((rawExcitement - 0.5) * 3, -4, 4);

  // Treble-only pulse values (particles, bloom, sparkle — NEVER color)
  const treblePulse = treble;

  return {
    intensity: _moodState.intensity,
    palette: moodState,
    hueShift,
    speedMultiplier: 1 + _moodState.intensity * 2,
    densityMultiplier: 0.55 + _moodState.intensity * 0.95,
    bloomAlpha: clamp(0.12 + rawExcitement * 0.2 + treblePulse * 0.08, 0.12, 0.44),
    jitter: clamp(_moodState.intensity * 8, 0, 10),
    // Exposed values
    smoothedExcitement: smoothE,
    rawExcitement,
    moodColor,
    moodState,
    lightnessOffset,
    treblePulse,
    _confidence: 0,
    _pendingState: null,
  };
};

export const computeStarVisibility = (distanceRatio) => {
  const t = clamp(distanceRatio, 0, 1);
  return Math.pow(Math.sin(t * Math.PI), 1.35);
};

const wrapHue = (value) => ((value % 360) + 360) % 360;

const hsla = (hue, saturation, lightness, alpha) => `hsla(${wrapHue(hue)}, ${clamp(saturation, 0, 100)}%, ${clamp(lightness, 0, 100)}%, ${clamp(alpha, 0, 1)})`;

const STAR_LAYERS = [
  { count: 74, depth: [0.74, 1], speed: 0.82, lineWidth: [0.35, 0.9], alpha: 0.18, dustChance: 0.0015 },
  { count: 72, depth: [0.38, 0.74], speed: 1.08, lineWidth: [0.6, 1.45], alpha: 0.28, dustChance: 0.004 },
  { count: 70, depth: [0.16, 0.42], speed: 1.42, lineWidth: [0.95, 2], alpha: 0.42, dustChance: 0.009 },
];

const BUBBLE_LAYERS = [
  { count: 8, radius: [18, 34], speed: [0.95, 1.25], alpha: 0.3 },
  { count: 7, radius: [28, 52], speed: [0.78, 1.05], alpha: 0.42 },
  { count: 6, radius: [42, 76], speed: [0.62, 0.88], alpha: 0.56 },
];

const MAX_BUBBLES = 50;

const randomBetween = (min, max) => min + Math.random() * (max - min);

const normalizeVelocity = (vx, vy, targetSpeed) => {
  const speed = Math.hypot(vx, vy) || 0.0001;
  const scale = targetSpeed / speed;
  return {
    vx: vx * scale,
    vy: vy * scale,
  };
};

const projectStar = (star, width, height) => ({
  x: width * 0.5 + (star.x / star.z) * width * 0.5,
  y: height * 0.5 + (star.y / star.z) * height * 0.5,
});

const createStar = (layerIndex = 0) => {
  const layer = STAR_LAYERS[layerIndex] || STAR_LAYERS[1];
  return {
    x: randomBetween(-1, 1),
    y: randomBetween(-1, 1),
    z: randomBetween(layer.depth[0], layer.depth[1]),
    speed: randomBetween(0.004, 0.018),
    layer: layerIndex,
    hue: randomBetween(0, 360),
    prevX: null,
    prevY: null,
  };
};

const respawnStar = (star) => {
  const layer = STAR_LAYERS[star.layer] || STAR_LAYERS[1];
  star.x = randomBetween(-1, 1);
  star.y = randomBetween(-1, 1);
  star.z = randomBetween(layer.depth[0], layer.depth[1]);
  star.speed = randomBetween(0.004, 0.018);
  star.hue = randomBetween(0, 360);
  star.prevX = null;
  star.prevY = null;
  return star;
};

const createBubble = (width, height, layerIndex = 0) => {
  const layer = BUBBLE_LAYERS[layerIndex] || BUBBLE_LAYERS[1];
  const baseRadius = randomBetween(layer.radius[0], layer.radius[1]);
  const baseSpeed = randomBetween(layer.speed[0], layer.speed[1]);
  const angle = randomBetween(0, Math.PI * 2);
  return {
    x: randomBetween(baseRadius, Math.max(baseRadius + 1, width - baseRadius)),
    y: randomBetween(baseRadius, Math.max(baseRadius + 1, height - baseRadius)),
    vx: Math.cos(angle) * baseSpeed,
    vy: Math.sin(angle) * baseSpeed,
    baseRadius,
    baseSpeed,
    mass: Math.max(1, baseRadius * baseRadius * 0.018),
    layer: layerIndex,
    hue: randomBetween(0, 360),
    pulseOffset: randomBetween(0, Math.PI * 2),
    driftSeed: randomBetween(0, Math.PI * 2),
    renderRadius: baseRadius,
    flash: 0,
  };
};

export const resolveSoftCollision = (first, second, padding = 0) => {
  const dx = second.x - first.x;
  const dy = second.y - first.y;
  const distance = Math.hypot(dx, dy) || 0.0001;
  const minDistance = (first.radius || first.renderRadius || 0) + (second.radius || second.renderRadius || 0) + padding;

  if (distance >= minDistance) {
    return null;
  }

  return {
    overlap: minDistance - distance,
    normalX: dx / distance,
    normalY: dy / distance,
  };
};

export const resolveElasticCollision = (first, second) => {
  const dx = second.x - first.x;
  const dy = second.y - first.y;
  const distance = Math.hypot(dx, dy) || 0.0001;
  const normalX = dx / distance;
  const normalY = dy / distance;
  const firstMass = Math.max(0.001, Number(first.mass) || 1);
  const secondMass = Math.max(0.001, Number(second.mass) || 1);
  const firstNormalVelocity = first.vx * normalX + first.vy * normalY;
  const secondNormalVelocity = second.vx * normalX + second.vy * normalY;

  if (firstNormalVelocity <= secondNormalVelocity) {
    return null;
  }

  const impulse = (2 * (firstNormalVelocity - secondNormalVelocity)) / (firstMass + secondMass);

  return {
    first: {
      vx: first.vx - impulse * secondMass * normalX,
      vy: first.vy - impulse * secondMass * normalY,
    },
    second: {
      vx: second.vx + impulse * firstMass * normalX,
      vy: second.vy + impulse * firstMass * normalY,
    },
    normalX,
    normalY,
  };
};

const vibrantHsl = (frequency, time, saturationBoost = 0, lightnessBoost = 0, hueShift = 0) => {
  const hue = ((((frequency || 0) + hueShift) + time * 120) % 360 + 360) % 360;
  const saturation = clamp(86 + saturationBoost, 80, 100);
  const lightness = clamp(52 + lightnessBoost, 50, 60);
  return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
};

const computeFrameEase = (deltaSeconds, base = 0.2) => {
  const normalizedDelta = clamp(deltaSeconds * 60, 0.5, 2.5);
  return 1 - Math.pow(1 - base, normalizedDelta);
};

export class VisualizerManager {
  constructor({ canvas, analyser, preset = 'vaporwave-grid', intensity = 1, sensitivity = 1, accent = '#7dd6ff', bgOpacity = 0.18, bgIntensity = 1 }) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d', { willReadFrequently: true });
    this.analyser = analyser;
    const normalizedPreset = normalizePresetId(preset);
    this.preset = PRESETS.includes(normalizedPreset) ? normalizedPreset : 'vaporwave-grid';
    this.intensity = intensity;
    this.sensitivity = sensitivity;
    this.accent = accent;
    this.enabled = true;
    this.frameId = null;
    this.time = 0;
    this.rawFreq = new Uint8Array(this.analyser.frequencyBinCount);
    this.rawWave = new Uint8Array(this.analyser.fftSize);
    this.freq = new Float32Array(this.analyser.frequencyBinCount);
    this.wave = new Float32Array(this.analyser.fftSize);
    this.sharedEaseBase = 0.2;
    this.lastFrameAt = 0;
    this.stars = STAR_LAYERS.flatMap((layer, layerIndex) => Array.from({ length: layer.count }, () => createStar(layerIndex)));
    this.bubbles = [];
    this.bubbleSparks = [];
    this.bubbleImpactRings = [];
    this.rainColumns = [];
    this.artworkFocus = { x: 0.5, y: 0.5 };
    this.activeColor = accent;
    this.bgOpacity = clamp(Number(bgOpacity) || 0.18, 0, 0.5);
    this.bgIntensity = clamp(Number(bgIntensity) || 1, 0.5, 2);
    this.bubbleSpriteCache = new Map();
    this.resizeBound = () => this.resize();
    this.analyser.smoothingTimeConstant = 0.85;
    this.canvas.style.filter = 'brightness(1.2) contrast(1.1) drop-shadow(0 0 10px var(--accent-primary))';
  }

  setPreset(value) {
    const normalizedValue = normalizePresetId(value);
    if (PRESETS.includes(normalizedValue)) {
      this.preset = normalizedValue;
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
  }

  setEnabled(value) {
    this.enabled = Boolean(value);
  }

  setIntensity(value) {
    this.intensity = Math.max(0.2, Math.min(2.5, Number(value) || 1));
  }

  setSensitivity(value) {
    this.sensitivity = Math.max(0.4, Math.min(2.5, Number(value) || 1));
  }

  setAccent(color) {
    this.accent = color || this.accent;
  }

  setPalette(colors) {
    const next = Array.isArray(colors) && colors.length > 0 ? colors : null;
    if (!next) { this._paletteTarget = null; this._palette = null; return; }
    this._paletteTarget = next;
    this._paletteTransitionElapsed = 0; // reset stagger timing for fresh transition
    // Initialize current palette instantly on first set (no previous state to lerp from)
    if (!this._palette || this._palette.length === 0) {
      this._palette = next.map(c => ({ r: c.r, g: c.g, b: c.b }));
    }
  }

  setBgOpacity(value) {
    this.bgOpacity = clamp(Number(value) || 0, 0, 0.5);
  }

  setBgIntensity(value) {
    this.bgIntensity = clamp(Number(value) || 1, 0.5, 2);
  }

  setParticleDensity(value) {
    const density = clamp(Number(value) || 1, 0.2, 3);
    this._fairyMaxCount = Math.round(60 * density);
  }

  setLavaResolution(value) {
    const res = clamp(Math.round(Number(value) || 1024), 256, 2160);
    if (this._lavaCanvas && this._lavaCanvas.width !== res) {
      this._lavaCanvas = null; // Force re-create on next frame
    }
    this._lavaTargetSize = res;
  }

  setArtworkFocus(point = null) {
    const x = Number(point?.x);
    const y = Number(point?.y);
    if (!Number.isFinite(x) || !Number.isFinite(y)) {
      return;
    }
    this.artworkFocus = {
      x: clamp(x, 0, 1),
      y: clamp(y, 0, 1),
    };
  }

  resize() {
    const nextWidth = this.canvas.clientWidth || this.canvas.parentElement?.clientWidth || window.innerWidth;
    const nextHeight = this.canvas.clientHeight || this.canvas.parentElement?.clientHeight || window.innerHeight;
    if (this.canvas.width !== nextWidth || this.canvas.height !== nextHeight) {
      this.canvas.width = nextWidth;
      this.canvas.height = nextHeight;
      this.rainColumns = Array.from({ length: Math.ceil(nextWidth / 18) }, () => Math.random() * -nextHeight);
      this.bubbles = [];
      this.bubbleSparks = [];
      this.bubbleImpactRings = [];
      this.stars.forEach((star) => {
        star.prevX = null;
        star.prevY = null;
      });
    }
  }

  start() {
    this.stop();
    this.resize();
    window.addEventListener('resize', this.resizeBound);
    this.draw();
  }

  stop() {
    if (this.frameId) {
      cancelAnimationFrame(this.frameId);
      this.frameId = null;
    }
    window.removeEventListener('resize', this.resizeBound);
  }

  drawBackground(width, height, alpha = 0.28) {
    this.ctx.fillStyle = `rgba(3, 8, 18, ${alpha})`;
    this.ctx.fillRect(0, 0, width, height);
  }

  ensureBubbleField(width, height) {
    if (this.bubbles.length) {
      return;
    }

    this.bubbles = BUBBLE_LAYERS
      .flatMap((layer, layerIndex) => Array.from({ length: layer.count }, () => createBubble(width, height, layerIndex)))
      .slice(0, MAX_BUBBLES);
    this.bubbleSparks = [];
    this.bubbleImpactRings = [];
  }

  getBubbleSprite(color, radius = 24) {
    const normalizedRadius = Math.max(8, Math.round(radius / 2) * 2);
    const key = `${String(color || '#7dd6ff')}:${normalizedRadius}`;
    const cached = this.bubbleSpriteCache.get(key);
    if (cached) {
      return cached;
    }

    const size = normalizedRadius * 2 + 8;
    const sprite = document.createElement('canvas');
    sprite.width = size;
    sprite.height = size;
    const spriteCtx = sprite.getContext('2d');
    if (!spriteCtx) {
      return null;
    }

    const center = size * 0.5;
    const gradient = spriteCtx.createRadialGradient(
      center - normalizedRadius * 0.28,
      center - normalizedRadius * 0.34,
      normalizedRadius * 0.12,
      center,
      center,
      normalizedRadius,
    );
    gradient.addColorStop(0, '#ffffff');
    gradient.addColorStop(0.18, '#ffffff');
    gradient.addColorStop(0.64, color || '#7dd6ff');
    gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
    spriteCtx.fillStyle = gradient;
    spriteCtx.beginPath();
    spriteCtx.arc(center, center, normalizedRadius, 0, Math.PI * 2);
    spriteCtx.fill();

    if (this.bubbleSpriteCache.size > 180) {
      const firstKey = this.bubbleSpriteCache.keys().next().value;
      this.bubbleSpriteCache.delete(firstKey);
    }
    this.bubbleSpriteCache.set(key, sprite);
    return sprite;
  }

  drawLavaBlob(centerX, centerY, radius, hueShift = 0) {
    const gradient = this.ctx.createRadialGradient(centerX, centerY, radius * 0.08, centerX, centerY, radius);
    const baseHue = this.mood?.moodColor?.h ?? 190;
    gradient.addColorStop(0, hsla(baseHue + hueShift, 96, 74, 0.78));
    gradient.addColorStop(0.32, this.activeColor || '#7dd6ff');
    gradient.addColorStop(1, 'rgba(8, 10, 24, 0)');

    this.ctx.fillStyle = gradient;
    this.ctx.beginPath();
    this.ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
    this.ctx.fill();
  }

  drawLavaBackground(width, height, response = 0) {
    const bands = this._lastBands || { bass: 0, mid: 0, treble: 0, energy: 0 };
    const bass = clamp(bands.bass || 0, 0, 1);
    const treble = clamp(bands.treble || 0, 0, 1);
    const energy = clamp(bands.energy || 0, 0, 1);

    // Full-resolution off-screen canvas for smooth plasma
    const LAVA_SIZE = this._lavaTargetSize || 1024;
    if (!this._lavaCanvas || this._lavaCanvas.width !== LAVA_SIZE) {
      this._lavaCanvas = document.createElement('canvas');
      this._lavaCanvas.width = LAVA_SIZE;
      this._lavaCanvas.height = LAVA_SIZE;
      this._lavaCtx = this._lavaCanvas.getContext('2d');
      this._lavaBlobs = [];
      for (let i = 0; i < 14; i++) {
        this._lavaBlobs.push({
          x: Math.random(), y: Math.random(),
          vx: (Math.random() - 0.5) * 0.0004,
          vy: (Math.random() - 0.5) * 0.0004,
          radius: 0.25 + Math.random() * 0.3,
          phase: Math.random() * Math.PI * 2,
          speed: 0.1 + Math.random() * 0.35,
        });
      }
    }
    if (!this._fairyParticles) {
      this._fairyParticles = [];
      this._fairyMaxCount = 40;
    }
    const lCtx = this._lavaCtx;

    // All visual parameters use smoothed intensity — NEVER raw bass/energy
    const smoothI = this.mood?.intensity || 0;
    const bgAlpha = clamp(this.bgOpacity * 0.85 + smoothI * 0.04, 0, 0.35);
    const speedFactor = this.bgIntensity * (0.06 + smoothI * 0.08);
    const time = performance.now() * 0.00004 * speedFactor;

    // Palette colors — locked mood color for hue/sat, lightnessOffset (±10%) for pulse
    const palette = this._palette || null;
    const moodColor = this.mood?.moodColor || { h: 190, s: 75, l: 45 };
    const lOff = this.mood?.lightnessOffset || 0; // ±10% max
    const getColor = (index, alpha) => {
      if (palette && palette[index % palette.length]) {
        const c = palette[index % palette.length];
        // Lightness-only pulse from beat — NO hue shift from transients
        const brightPulse = clamp(lOff * 0.4, -5, 8);
        const r = clamp(c.r + brightPulse, 0, 255);
        const g = clamp(c.g + brightPulse * 0.5, 0, 255);
        const b = clamp(c.b + brightPulse * 0.3, 0, 255);
        return `rgba(${Math.round(r)}, ${Math.round(g)}, ${Math.round(b)}, ${alpha})`;
      }
      // No palette — locked mood HSL + per-blob hue offset (fixed, not reactive)
      const h = moodColor.h + index * 25;
      const s = moodColor.s;
      const l = moodColor.l + lOff; // ±10% max
      return `hsla(${h}, ${s}%, ${clamp(l, 30, 65)}%, ${alpha})`;
    };

    lCtx.clearRect(0, 0, LAVA_SIZE, LAVA_SIZE);

    // Slow organic plasma blobs
    for (let i = 0; i < this._lavaBlobs.length; i++) {
      const blob = this._lavaBlobs[i];
      blob.vx += Math.sin(time * blob.speed + blob.phase) * 0.00006;
      blob.vy += Math.cos(time * blob.speed * 0.5 + blob.phase) * 0.00006;
      blob.vx += smoothI * 0.00012 * Math.sin(time * 1.2 + i * 0.8);
      blob.vy += smoothI * 0.00012 * Math.cos(time + i);
      blob.vx *= 0.992;
      blob.vy *= 0.992;
      blob.x += blob.vx;
      blob.y += blob.vy;
      if (blob.x < -0.1) blob.x += 1.2;
      if (blob.x > 1.1) blob.x -= 1.2;
      if (blob.y < -0.1) blob.y += 1.2;
      if (blob.y > 1.1) blob.y -= 1.2;

      const r = (blob.radius + smoothI * 0.015 + Math.sin(time * blob.speed * 0.2 + blob.phase) * 0.02) * LAVA_SIZE;
      const bx = blob.x * LAVA_SIZE;
      const by = blob.y * LAVA_SIZE;

      const grad = lCtx.createRadialGradient(bx, by, 0, bx, by, r);
      grad.addColorStop(0, getColor(i, 0.55));
      grad.addColorStop(0.25, getColor(i + 1, 0.35));
      grad.addColorStop(0.55, getColor(i + 3, 0.12));
      grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      lCtx.fillStyle = grad;
      lCtx.beginPath();
      lCtx.arc(bx, by, r, 0, Math.PI * 2);
      lCtx.fill();
    }

    // Draw plasma to main canvas (smooth upscale)
    this.ctx.save();
    this.ctx.globalCompositeOperation = 'screen';
    this.ctx.globalAlpha = bgAlpha;
    this.ctx.imageSmoothingEnabled = true;
    this.ctx.imageSmoothingQuality = 'high';
    this.ctx.drawImage(this._lavaCanvas, 0, 0, width, height);
    this.ctx.restore();

    // Fairy particles (optimized - no shadowBlur)
    const maxFairy = this._fairyMaxCount || 40;
    if (bass > 0.35 && this._fairyParticles.length < maxFairy) {
      const spawnCount = Math.floor(1 + smoothI * 1.5);
      for (let s = 0; s < spawnCount && this._fairyParticles.length < maxFairy; s++) {
        this._fairyParticles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.4,
          vy: (Math.random() - 0.5) * 0.4 - 0.2,
          life: 60 + Math.random() * 90,
          maxLife: 60 + Math.random() * 90,
          size: 1.2 + Math.random() * 2,
          hue: Math.random() * 360,
          twinkle: Math.random() * Math.PI * 2,
        });
      }
    }

    // Draw fairy particles (no shadow for performance)
    this.ctx.save();
    this.ctx.globalCompositeOperation = 'screen';
    const now = performance.now();
    this._fairyParticles = this._fairyParticles.filter((p) => {
      p.life -= 1;
      if (p.life <= 0) return false;
      p.x += p.vx + Math.sin(now * 0.0008 + p.twinkle) * 0.2;
      p.y += p.vy + Math.cos(now * 0.001 + p.twinkle) * 0.15;
      p.vx *= 0.996;
      p.vy *= 0.996;
      const lifeRatio = p.life / p.maxLife;
      const twinkle = 0.5 + Math.sin(now * 0.004 + p.twinkle) * 0.4;
      const alpha = lifeRatio * twinkle;
      if (alpha < 0.05) return true;
      const palIdx = Math.floor(p.hue / 36) % (palette?.length || 1);
      const pc = palette?.[palIdx];
      this.ctx.globalAlpha = alpha;
      this.ctx.fillStyle = pc
        ? `rgba(${pc.r}, ${pc.g}, ${pc.b}, 1)`
        : `hsla(${p.hue}, 85%, 70%, 1)`;
      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.size * (0.5 + lifeRatio * 0.5), 0, Math.PI * 2);
      this.ctx.fill();
      return true;
    });
    this.ctx.restore();
    this.ctx.globalAlpha = 1;
  }

  emitBubbleImpact(x, y, hue, energy = 1) {
    const sparkCount = 3 + Math.floor(clamp(energy, 0, 1.6) * 4);
    this.bubbleImpactRings.push({
      x,
      y,
      radius: 4,
      maxRadius: 40 + energy * 50,
      lineWidth: 1.4 + energy * 1.8,
      life: 16 + energy * 8,
      maxLife: 24 + energy * 10,
      hue,
    });
    for (let index = 0; index < sparkCount; index += 1) {
      const angle = (index / sparkCount) * Math.PI * 2 + Math.random() * 0.4;
      const speed = randomBetween(0.6, 1.6 + energy * 1.8);
      this.bubbleSparks.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: randomBetween(10, 20),
        maxLife: 20,
        size: randomBetween(1, 2.4),
        hue: hue + randomBetween(0, 60),
      });
    }
  }

  draw(frameTime = performance.now()) {

    // Skip rendering when tab is hidden — zero GPU when minimized
    if (document.hidden) {
      this.frameId = requestAnimationFrame((t) => this.draw(t));
      return;
    }

    // FPS throttle
    if (this._fpsMax > 0) {
      const minInterval = 1000 / this._fpsMax;
      if (frameTime - (this._lastFpsTime || 0) < minInterval) {
        this.frameId = requestAnimationFrame((t) => this.draw(t));
        return;
      }
      this._lastFpsTime = frameTime;
    }

    this.resize();

    // Smooth palette transition — lerp each color channel toward target
    if (this._paletteTarget && this._palette && this._palette.length === this._paletteTarget.length) {
      const dt = this._lastFpsTime ? (frameTime - (this._paletteLerpLastTime || frameTime)) / 1000 : 1 / 60;
      this._paletteLerpLastTime = frameTime;
      // Stagger: each color starts transitioning with a slight delay (100ms apart)
      const LERP_SPEED = 3.5; // ~0.3s to settle per color
      for (let i = 0; i < this._palette.length; i++) {
        const staggerDelay = i * 0.1; // seconds
        const elapsed = (this._paletteTransitionElapsed || 0) + dt;
        const effectiveDt = Math.max(0, elapsed - staggerDelay);
        const t = Math.min(1, LERP_SPEED * Math.min(dt, 0.05)); // per-frame blend factor
        if (effectiveDt > 0) {
          const cur = this._palette[i];
          const tgt = this._paletteTarget[i];
          cur.r += (tgt.r - cur.r) * t;
          cur.g += (tgt.g - cur.g) * t;
          cur.b += (tgt.b - cur.b) * t;
        }
      }
      this._paletteTransitionElapsed = (this._paletteTransitionElapsed || 0) + dt;
    } else if (this._paletteTarget) {
      // Length mismatch or no current palette — snap and start fresh
      this._palette = this._paletteTarget.map(c => ({ r: c.r, g: c.g, b: c.b }));
      this._paletteTransitionElapsed = 0;
    }

    const { width, height } = this.canvas;
    this.analyser.getByteFrequencyData(this.rawFreq);
    this.analyser.getByteTimeDomainData(this.rawWave);

    const deltaSeconds = this.lastFrameAt > 0 ? (frameTime - this.lastFrameAt) / 1000 : 1 / 60;
    this.lastFrameAt = frameTime;
    const ease = computeFrameEase(deltaSeconds, this.sharedEaseBase);

    for (let index = 0; index < this.freq.length; index += 1) {
      this.freq[index] += (this.rawFreq[index] - this.freq[index]) * ease;
    }
    for (let index = 0; index < this.wave.length; index += 1) {
      this.wave[index] += (this.rawWave[index] - this.wave[index]) * ease;
    }
    const { bass, mid, treble, energy } = computeAudioBands(this.freq);
    this._lastBands = { bass, mid, treble, energy };
    const accent = String(this.accent || '').trim();
    if (/^#([0-9a-f]{3}|[0-9a-f]{6})$/i.test(accent)) {
      this.activeColor = accent;
    } else {
      // Use smoothed mood hue — never raw FFT bins for color
      const moodHue = this.mood?.moodColor?.h ?? 220;
      this.activeColor = `hsl(${Math.round(moodHue)}, 70%, 60%)`;
    }
    const mood = computeMoodProfile({ bass, mid, treble, energy }, {
      intensity: this.intensity,
      sensitivity: this.sensitivity,
      deltaTime: deltaSeconds,
    });
    this.mood = mood;
    const response = Math.max(0.001, energy * this.sensitivity * this.intensity);
    const presetDefinition = PRESET_REGISTRY[this.preset] || PRESET_REGISTRY['vaporwave-grid'];
    const keepTrails = Boolean(presetDefinition?.keepTrails);

    if (!keepTrails) {
      this.ctx.clearRect(0, 0, width, height);
    }
    this.drawBackground(width, height, keepTrails ? 0.2 : 0.28);
    this.drawLavaBackground(width, height, response);

    if (this.enabled) {
      presetDefinition?.draw?.(this, {
        width,
        height,
        response,
        bands: { bass, mid, treble, energy },
        mood,
        artworkFocus: this.artworkFocus,
      });
    }

    this.time += deltaSeconds;

    // Debug mood graph — enable with manager.debugMood = true
    if (this.debugMood) this._drawMoodDebug(width, height, mood);

    this.frameId = requestAnimationFrame((nextFrameTime) => this.draw(nextFrameTime));
  }

  _drawMoodDebug(width, height, mood) {
    if (!this._moodHistory) this._moodHistory = [];
    this._moodHistory.push({
      smoothed: mood.smoothedExcitement,
      raw: mood.rawExcitement,
      hue: mood.moodColor?.h ?? 0,
    });
    if (this._moodHistory.length > 200) this._moodHistory.shift();

    const ctx = this.ctx;
    const gx = 10, gy = height - 80, gw = 200, gh = 60;
    ctx.save();
    ctx.globalAlpha = 0.8;
    ctx.fillStyle = 'rgba(0,0,0,0.6)';
    ctx.fillRect(gx, gy, gw, gh);
    ctx.strokeStyle = 'rgba(255,255,255,0.3)';
    ctx.strokeRect(gx, gy, gw, gh);

    // Raw excitement — thin red
    ctx.beginPath();
    ctx.strokeStyle = 'rgba(255,80,80,0.5)';
    ctx.lineWidth = 1;
    this._moodHistory.forEach((m, i) => {
      const x = gx + (i / 200) * gw;
      const y = gy + gh - m.raw * gh;
      i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    });
    ctx.stroke();

    // Smoothed excitement — thick cyan
    ctx.beginPath();
    ctx.strokeStyle = 'rgba(80,220,255,0.9)';
    ctx.lineWidth = 2;
    this._moodHistory.forEach((m, i) => {
      const x = gx + (i / 200) * gw;
      const y = gy + gh - m.smoothed * gh;
      i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    });
    ctx.stroke();

    ctx.fillStyle = '#fff';
    ctx.font = '9px monospace';
    const stateLabel = mood.moodState || mood.palette || '?';
    const conf = mood._confidence ? ` → ${mood._pendingState}(${Math.round(mood._confidence * 100)}%)` : '';
    ctx.fillText(`${stateLabel}${conf} hue:${Math.round(mood.moodColor?.h ?? 0)}° win:${mood.smoothedExcitement.toFixed(2)} raw:${mood.rawExcitement.toFixed(2)}`, gx + 4, gy + 10);
    ctx.globalAlpha = 1;
    ctx.restore();
  }

  drawClassicBars(width, height, response) {
    const bars = 144;
    const barWidth = width / bars;
    const peakGravity = Math.max(16, height * 0.12);
    const bassValue = (this.freq[2] + this.freq[4] + this.freq[6]) / (255 * 3);

    for (let index = 0; index < bars; index += 1) {
      const value = this.freq[index % this.freq.length] / 255;
      const barHeight = value * height * 0.66 * response;
      const x = index * barWidth;
      const y = height - barHeight;
      let color;
      if (this._palette && this._palette.length) {
        const pc = this._palette[index % this._palette.length];
        const bright = clamp(0.7 + value * 0.3, 0.7, 1);
        color = `rgba(${Math.round(pc.r * bright)}, ${Math.round(pc.g * bright)}, ${Math.round(pc.b * bright)}, 1)`;
      } else {
        color = vibrantHsl(this.freq[index % this.freq.length], this.time + index * 0.6, value * 6, bassValue * 8);
      }

      this.ctx.shadowBlur = 15;
      this.ctx.shadowColor = color;
      this.ctx.globalAlpha = clamp(0.35 + value * 0.6 + bassValue * 0.45, 0.25, 1);
      this.ctx.fillStyle = color;
      this.ctx.fillRect(x + 1, y, barWidth - 2, barHeight);

      const peakY = Math.max(height - barHeight - peakGravity * 0.12, 0);
      this.ctx.fillStyle = 'rgba(255,255,255,0.72)';
      this.ctx.fillRect(x + 2, peakY, Math.max(1, barWidth - 4), 2);
    }

    this.ctx.shadowBlur = 0;
    this.ctx.globalAlpha = 1;
  }

  drawOscilloscope(width, height, response) {
    this.ctx.lineWidth = 2;
    this.ctx.strokeStyle = '#87ffbf';
    this.ctx.shadowColor = '#87ffbf';
    this.ctx.shadowBlur = 16;
    this.ctx.beginPath();

    for (let index = 0; index < this.wave.length; index += 1) {
      const x = (index / (this.wave.length - 1)) * width;
      const centered = (this.wave[index] - 128) / 128;
      const y = height * 0.5 + centered * height * 0.22 * response;
      if (index === 0) {
        this.ctx.moveTo(x, y);
      } else {
        this.ctx.lineTo(x, y);
      }
    }

    this.ctx.stroke();
    this.ctx.shadowBlur = 0;
  }

  drawMilkdropNebula(width, height, bass, response, mood = this.mood || computeMoodProfile({ bass, energy: response })) {
    const count = Math.round(180 + 160 * mood.densityMultiplier);
    for (let index = 0; index < count; index += 1) {
      const angle = this.time * (0.7 + response * mood.speedMultiplier) + (index / count) * Math.PI * 2;
      const radius = (40 + index * 2.3) * (1 + mood.intensity * 1.2);
      const x = width * 0.5 + Math.cos(angle) * radius;
      const y = height * 0.5 + Math.sin(angle * 1.3) * radius * 0.6;
      const alpha = clamp(0.08 + (index / count) * 0.2 + mood.intensity * 0.18, 0.08, 0.9);
      let color;
      if (this._palette && this._palette.length) {
        const pc = this._palette[index % this._palette.length];
        color = `rgba(${pc.r}, ${pc.g}, ${pc.b}, ${alpha})`;
      } else {
        color = vibrantHsl(this.freq[index % this.freq.length], this.time + index * 0.3, 8, mood.intensity * 6, mood.hueShift);
      }
      this.ctx.shadowBlur = 6 + mood.bloomAlpha * 10;
      this.ctx.shadowColor = color;
      this.ctx.globalAlpha = alpha;
      this.ctx.fillStyle = color;
      this.ctx.beginPath();
      this.ctx.arc(x, y, 1.4 + mood.intensity * 5, 0, Math.PI * 2);
      this.ctx.fill();
    }
    this.ctx.shadowBlur = 0;
    this.ctx.globalAlpha = 1;
  }

  drawStarfieldWarp(width, height, bass, response, mood = this.mood || computeMoodProfile({ bass, energy: response })) {
    this.ctx.save();
    this.ctx.globalCompositeOperation = 'lighter';
    this.ctx.lineCap = 'round';

    const visibleStars = Math.max(24, Math.round(this.stars.length * Math.min(1, mood.densityMultiplier)));
    for (const [starIndex, star] of this.stars.entries()) {
      if (starIndex >= visibleStars) {
        continue;
      }
      const layer = STAR_LAYERS[star.layer] || STAR_LAYERS[1];
      const speed = star.speed * layer.speed * (1 + mood.intensity * 3.5) * mood.speedMultiplier;
      const previous = star.prevX === null || star.prevY === null ? projectStar(star, width, height) : { x: star.prevX, y: star.prevY };
      star.z -= speed;
      star.hue = wrapHue(star.hue + 0.45 + mood.intensity * 1.5 + star.layer * 0.5);
      if (star.z <= 0.02) {
        respawnStar(star);
        continue;
      }

      const { x: px, y: py } = projectStar(star, width, height);
      if (px < -width * 0.2 || px > width * 1.2 || py < -height * 0.2 || py > height * 0.2) {
        respawnStar(star);
        continue;
      }

      const dx = px - previous.x;
      const dy = py - previous.y;
      const velocity = Math.hypot(dx, dy);
      const radialDistance = Math.hypot(px - width * 0.5, py - height * 0.5);
      const radialRatio = clamp(radialDistance / (Math.min(width, height) * 0.54), 0, 1);
      const radialFade = computeStarVisibility(radialRatio);
      if (radialFade <= 0.015) {
        star.prevX = px;
        star.prevY = py;
        continue;
      }

      const size = clamp((1 - star.z) * (1.6 + star.layer * 0.8), 0.6, 4.5 + star.layer * 0.7);
      const lineWidth = clamp(layer.lineWidth[0] + velocity * 0.035, layer.lineWidth[0], layer.lineWidth[1] + mood.intensity * 1.2);
      const alpha = clamp(radialFade * (layer.alpha + mood.intensity * 0.1 + 0.1), 0.04, 0.72);
      const color = this._palette && this._palette.length
        ? (() => {
          const pc = this._palette[star.layer % this._palette.length];
          return `rgba(${pc.r}, ${pc.g}, ${pc.b}, ${alpha})`;
        })()
        : hsla(star.hue + velocity * 0.4 + mood.hueShift, 96, 62 + star.layer * 5, alpha);
      this.ctx.shadowBlur = 3 + star.layer * 2 + mood.bloomAlpha * 8;
      this.ctx.shadowColor = color;
      this.ctx.strokeStyle = color;
      this.ctx.lineWidth = lineWidth;
      this.ctx.beginPath();
      this.ctx.moveTo(previous.x, previous.y);
      this.ctx.lineTo(px, py);
      this.ctx.stroke();

      this.ctx.fillStyle = hsla(star.hue + 24, 100, 82, clamp(alpha * 1.4, 0.04, 0.72));
      this.ctx.beginPath();
      this.ctx.arc(px, py, size, 0, Math.PI * 2);
      this.ctx.fill();

      if (velocity > 5.5 + star.layer * 1.6 && radialFade > 0.45 && Math.random() < layer.dustChance + mood.intensity * 0.006) {
        const dustRadius = size * (2 + mood.intensity * 1.8);
        this.ctx.fillStyle = hsla(star.hue + 48, 100, 88, 0.08 + mood.intensity * 0.08);
        this.ctx.beginPath();
        this.ctx.arc(px, py, dustRadius, 0, Math.PI * 2);
        this.ctx.fill();
      }

      star.prevX = px;
      star.prevY = py;
    }
    this.ctx.restore();
    this.ctx.shadowBlur = 0;
    this.ctx.globalAlpha = 1;
  }

  drawRgbMagicBubbles(width, height, bass, treble, response, mood = this.mood || computeMoodProfile({ bass, treble, energy: response })) {
    this.ensureBubbleField(width, height);
    const pulseStrength = 1 + bass * 0.22 + response * 0.08 + mood.intensity * 0.1;
    const activeBubbleCount = Math.max(6, Math.round(this.bubbles.length * Math.min(1, mood.densityMultiplier)));
    const activeBubbles = this.bubbles.slice(0, activeBubbleCount);

    for (const bubble of activeBubbles) {
      bubble.flash = Math.max(0, bubble.flash - 0.04);
      bubble.hue = wrapHue(bubble.hue + 0.12 + bubble.layer * 0.12 + response * 0.25 + mood.hueShift * 0.01);
      bubble.renderRadius = bubble.baseRadius * pulseStrength * (1 + Math.sin(this.time * 1.4 + bubble.pulseOffset) * (0.05 + bass * 0.08));
      // Wobble decay from collisions (soap bubble jitter)
      if (bubble.wobble) {
        bubble.wobble *= 0.92;
        bubble.renderRadius *= (1 + Math.sin(this.time * 18 + bubble.pulseOffset) * bubble.wobble * 0.15);
        if (bubble.wobble < 0.01) bubble.wobble = 0;
      }
      bubble.x += bubble.vx;
      bubble.y += bubble.vy;

      if (bubble.x < bubble.renderRadius) {
        bubble.x = bubble.renderRadius;
        bubble.vx = Math.abs(bubble.vx);
        bubble.flash = 1;
        bubble.wobble = 0.7;
        this.emitBubbleImpact(bubble.x, bubble.y, bubble.hue, 0.35 + treble * 0.7);
      } else if (bubble.x > width - bubble.renderRadius) {
        bubble.x = width - bubble.renderRadius;
        bubble.vx = -Math.abs(bubble.vx);
        bubble.flash = 1;
        bubble.wobble = 0.7;
        this.emitBubbleImpact(bubble.x, bubble.y, bubble.hue, 0.35 + treble * 0.7);
      }

      if (bubble.y < bubble.renderRadius) {
        bubble.y = bubble.renderRadius;
        bubble.vy = Math.abs(bubble.vy);
        bubble.flash = 1;
        bubble.wobble = 0.7;
        this.emitBubbleImpact(bubble.x, bubble.y, bubble.hue, 0.35 + treble * 0.7);
      } else if (bubble.y > height - bubble.renderRadius) {
        bubble.y = height - bubble.renderRadius;
        bubble.vy = -Math.abs(bubble.vy);
        bubble.flash = 1;
        bubble.wobble = 0.7;
        this.emitBubbleImpact(bubble.x, bubble.y, bubble.hue, 0.35 + treble * 0.7);
      }

      const normalized = normalizeVelocity(bubble.vx, bubble.vy, bubble.baseSpeed);
      bubble.vx = normalized.vx;
      bubble.vy = normalized.vy;
    }

    for (let index = 0; index < activeBubbles.length; index += 1) {
      for (let otherIndex = index + 1; otherIndex < activeBubbles.length; otherIndex += 1) {
        // Skip expensive checks for distant bubbles
        const first = activeBubbles[index];
        const second = activeBubbles[otherIndex];
        const quickDist = Math.abs(first.x - second.x) + Math.abs(first.y - second.y);
        if (quickDist > (first.renderRadius + second.renderRadius) * 2) continue;

        const collision = resolveSoftCollision(
          { x: first.x, y: first.y, renderRadius: first.renderRadius },
          { x: second.x, y: second.y, renderRadius: second.renderRadius },
          8,
        );

        if (!collision) {
          continue;
        }

        const push = collision.overlap * 0.5;
        first.x -= collision.normalX * push;
        first.y -= collision.normalY * push;
        second.x += collision.normalX * push;
        second.y += collision.normalY * push;

        const resolved = resolveElasticCollision(first, second);
        if (!resolved) {
          continue;
        }

        const firstVelocity = normalizeVelocity(resolved.first.vx, resolved.first.vy, first.baseSpeed);
        const secondVelocity = normalizeVelocity(resolved.second.vx, resolved.second.vy, second.baseSpeed);
        first.vx = firstVelocity.vx;
        first.vy = firstVelocity.vy;
        second.vx = secondVelocity.vx;
        second.vy = secondVelocity.vy;
        first.flash = 1;
        second.flash = 1;
        first.wobble = 1;
        second.wobble = 1;
        const impactX = (first.x + second.x) * 0.5;
        const impactY = (first.y + second.y) * 0.5;
        this.emitBubbleImpact(impactX, impactY, (first.hue + second.hue) * 0.5, 0.45 + treble * 1.1 + response * 0.35);
      }
    }

    this.ctx.save();
    this.ctx.globalCompositeOperation = 'screen';
    const renderQueue = [...activeBubbles].sort((a, b) => a.layer - b.layer || a.renderRadius - b.renderRadius);
    for (const bubble of renderQueue) {
      const layer = BUBBLE_LAYERS[bubble.layer] || BUBBLE_LAYERS[1];
      const x = bubble.x;
      const y = bubble.y;
      const radius = bubble.renderRadius;

      // Soap bubble iridescent colors from palette
      const paletteIdx = Math.floor(bubble.hue / 36) % (this._palette?.length || 1);
      const palC = this._palette?.[paletteIdx];
      const bubbleHue = bubble.hue + mood.hueShift;
      // Mix palette color with iridescent soap hue
      const soapR = palC ? palC.r : Math.round(128 + 80 * Math.sin(bubbleHue * 0.017));
      const soapG = palC ? palC.g : Math.round(128 + 80 * Math.sin(bubbleHue * 0.017 + 2));
      const soapB = palC ? palC.b : Math.round(128 + 80 * Math.sin(bubbleHue * 0.017 + 4));

      this.ctx.globalAlpha = clamp(layer.alpha + 0.08 + bass * 0.1 + bubble.flash * 0.2, 0.2, 0.65);

      // Draw bubble body (gradient for glass-like feel)
      const wobbleAmt = bubble.wobble || 0;
      const rx = radius * (1 + wobbleAmt * 0.1 * Math.sin(this.time * 16 + bubble.pulseOffset));
      const ry = radius * (1 - wobbleAmt * 0.1 * Math.sin(this.time * 16 + bubble.pulseOffset));
      const grad = this.ctx.createRadialGradient(
        x - rx * 0.25, y - ry * 0.3, Math.min(rx, ry) * 0.05,
        x, y, Math.max(rx, ry)
      );
      grad.addColorStop(0, `rgba(255, 255, 255, 0.7)`);
      grad.addColorStop(0.2, `rgba(${soapR}, ${soapG}, ${soapB}, 0.5)`);
      grad.addColorStop(0.6, `rgba(${soapR * 0.7 | 0}, ${soapG * 0.8 | 0}, ${soapB}, 0.3)`);
      grad.addColorStop(1, `rgba(${soapR * 0.5 | 0}, ${soapG * 0.5 | 0}, ${soapB * 0.8 | 0}, 0.05)`);
      this.ctx.fillStyle = grad;
      this.ctx.beginPath();
      this.ctx.ellipse(x, y, rx, ry, 0, 0, Math.PI * 2);
      this.ctx.fill();

      // Highlight arc (soap bubble shine)
      this.ctx.globalAlpha = clamp(0.3 + bubble.flash * 0.3, 0.2, 0.6);
      this.ctx.strokeStyle = `rgba(255, 255, 255, 0.6)`;
      this.ctx.lineWidth = 1.2 + bubble.layer * 0.3;
      this.ctx.beginPath();
      this.ctx.arc(x - radius * 0.15, y - radius * 0.2, radius * 0.55, Math.PI * 1.1, Math.PI * 1.7);
      this.ctx.stroke();
    }

    // Impact rings (no shadowBlur for performance)
    this.bubbleImpactRings = this.bubbleImpactRings.filter((ring) => ring.life > 0).map((ring) => {
      ring.life -= 1;
      ring.radius = Math.min(ring.maxRadius, ring.radius + 2.5 + bass * 2);
      const alpha = clamp((ring.life / ring.maxLife) * 0.4, 0, 0.4);
      this.ctx.globalAlpha = alpha;
      this.ctx.strokeStyle = hsla(ring.hue + 12, 90, 80, alpha);
      this.ctx.lineWidth = ring.lineWidth;
      this.ctx.beginPath();
      this.ctx.arc(ring.x, ring.y, ring.radius, 0, Math.PI * 2);
      this.ctx.stroke();
      return ring;
    });

    // Sparks (no shadowBlur)
    this.bubbleSparks = this.bubbleSparks.filter((spark) => spark.life > 0).map((spark) => {
      spark.x += spark.vx;
      spark.y += spark.vy;
      spark.vx *= 0.96;
      spark.vy *= 0.96;
      spark.life -= 1;
      const lifeRatio = spark.life / spark.maxLife;
      this.ctx.globalAlpha = clamp(lifeRatio * 0.6, 0, 0.6);
      this.ctx.fillStyle = hsla(spark.hue + 20, 90, 78, 1);
      this.ctx.beginPath();
      this.ctx.arc(spark.x, spark.y, spark.size * Math.max(lifeRatio, 0.3), 0, Math.PI * 2);
      this.ctx.fill();
      return spark;
    });

    this.ctx.restore();
    this.ctx.globalAlpha = 1;
    this.ctx.shadowBlur = 0;
  }

  drawPulsingRing(width, height, bass, response) {
    const radius = Math.min(width, height) * 0.16;
    const centerX = width * 0.5;
    const centerY = height * 0.5;
    const points = 96;

    this.ctx.beginPath();
    for (let index = 0; index <= points; index += 1) {
      const angle = (index / points) * Math.PI * 2;
      const sample = this.freq[index % this.freq.length] / 255;
      const distance = radius + sample * 110 * response + bass * 24;
      const x = centerX + Math.cos(angle) * distance;
      const y = centerY + Math.sin(angle) * distance;
      if (index === 0) {
        this.ctx.moveTo(x, y);
      } else {
        this.ctx.lineTo(x, y);
      }
    }

    this.ctx.closePath();
    let ringColor;
    if (this._palette && this._palette.length) {
      const pc = this._palette[Math.floor(this.time * 2) % this._palette.length];
      ringColor = `rgb(${pc.r}, ${pc.g}, ${pc.b})`;
    } else {
      ringColor = vibrantHsl((bass + response) * 255, this.time, 10, bass * 12);
    }
    this.ctx.strokeStyle = ringColor;
    this.ctx.lineWidth = 3;
    this.ctx.shadowBlur = 18;
    this.ctx.shadowColor = ringColor;
    this.ctx.stroke();
    this.ctx.shadowBlur = 0;
  }

  drawVaporwaveGrid(width, height, response) {
    const horizon = height * 0.58;
    this.ctx.lineWidth = 1.2;
    const usePalette = this._palette && this._palette.length;

    for (let row = 0; row < 52; row += 1) {
      const t = row / 52;
      const y = horizon + t * t * height * 0.48;
      const wobble = Math.sin(this.time * 2 + row * 0.5) * 12 * response;
      let color;
      if (usePalette) {
        const pc = this._palette[row % this._palette.length];
        color = `rgba(${pc.r}, ${pc.g}, ${pc.b}, ${0.6 + t * 0.4})`;
      } else {
        color = vibrantHsl(this.freq[row % this.freq.length], this.time + row * 0.4, 4, response * 8);
      }
      this.ctx.strokeStyle = color;
      this.ctx.shadowBlur = 8;
      this.ctx.shadowColor = color;
      this.ctx.beginPath();
      this.ctx.moveTo(width * 0.1 - wobble, y);
      this.ctx.lineTo(width * 0.9 + wobble, y);
      this.ctx.stroke();
    }

    for (let col = 0; col <= 42; col += 1) {
      const t = col / 42;
      const x = width * 0.1 + t * width * 0.8;
      let color;
      if (usePalette) {
        const pc = this._palette[col % this._palette.length];
        color = `rgba(${pc.r}, ${pc.g}, ${pc.b}, 0.7)`;
      } else {
        color = vibrantHsl(this.freq[col % this.freq.length], this.time + col * 0.5, 4, response * 7);
      }
      this.ctx.strokeStyle = color;
      this.ctx.shadowBlur = 8;
      this.ctx.shadowColor = color;
      this.ctx.beginPath();
      this.ctx.moveTo(width * 0.5, horizon);
      this.ctx.lineTo(x, height);
      this.ctx.stroke();
    }

    this.ctx.shadowBlur = 0;
  }

  drawSpectrumFire(width, height, response) {
    const bars = 128;
    const barWidth = width / bars;
    const bassValue = (this.freq[1] + this.freq[2] + this.freq[3]) / (255 * 3);
    for (let index = 0; index < bars; index += 1) {
      const value = this.freq[index] / 255;
      const heightScale = value * height * 0.72 * response;
      const x = index * barWidth;
      const y = height - heightScale;
      const gradient = this.ctx.createLinearGradient(0, y, 0, height);
      const topColor = vibrantHsl(this.freq[index % this.freq.length], this.time + index * 0.3, 12, 10);
      const midColor = vibrantHsl(this.freq[(index + 5) % this.freq.length], this.time + index * 0.2, 8, 2);
      const lowColor = vibrantHsl(this.freq[(index + 12) % this.freq.length], this.time + index * 0.1, 6, -1);
      gradient.addColorStop(0, topColor);
      gradient.addColorStop(0.5, midColor);
      gradient.addColorStop(1, lowColor);
      this.ctx.shadowBlur = 15;
      this.ctx.shadowColor = topColor;
      this.ctx.globalAlpha = clamp(0.4 + value * 0.7 + bassValue * 0.35, 0.35, 1);
      this.ctx.fillStyle = gradient;
      this.ctx.fillRect(x + 1, y, barWidth - 2, heightScale);
    }
    this.ctx.shadowBlur = 0;
    this.ctx.globalAlpha = 1;
  }

  drawDigitalRain(width, height, response, mood = this.mood || computeMoodProfile({ energy: response })) {
    const charset = 'MATRIX01WINAMP';
    this.ctx.fillStyle = 'rgba(0, 6, 12, 0.18)';
    this.ctx.fillRect(0, 0, width, height);
    this.ctx.font = '14px monospace';

    for (let index = 0; index < this.rainColumns.length; index += 1) {
      const x = index * 18;
      const y = this.rainColumns[index];
      const sample = this.freq[index % this.freq.length] / 255;
      const glow = clamp(0.35 + sample * response * 1.4, 0.2, 1);
      const color = vibrantHsl(this.freq[index % this.freq.length], this.time + index * 0.7, 10, sample * 8, mood.hueShift);
      this.ctx.shadowBlur = 15 + mood.bloomAlpha * 18;
      this.ctx.shadowColor = color;
      this.ctx.globalAlpha = glow;
      this.ctx.fillStyle = color;
      const char = charset[Math.floor(Math.random() * charset.length)];
      this.ctx.fillText(char, x, y);
      this.rainColumns[index] += 8 + sample * 24;
      if (this.rainColumns[index] > height + 12) {
        this.rainColumns[index] = Math.random() * -height;
      }
    }
    this.ctx.shadowBlur = 0;
    this.ctx.globalAlpha = 1;
  }

  drawPlasmaFlow(width, height, response) {
    // Render plasma at 128x128 then upscale — 100x+ faster than per-pixel on full canvas
    const PLASMA_SIZE = 128;
    if (!this._plasmaCanvas || this._plasmaCanvas.width !== PLASMA_SIZE) {
      this._plasmaCanvas = document.createElement('canvas');
      this._plasmaCanvas.width = PLASMA_SIZE;
      this._plasmaCanvas.height = PLASMA_SIZE;
      this._plasmaCtx = this._plasmaCanvas.getContext('2d');
    }
    const pCtx = this._plasmaCtx;
    const image = pCtx.createImageData(PLASMA_SIZE, PLASMA_SIZE);
    const data = image.data;
    const t = this.time * 1.7;

    for (let y = 0; y < PLASMA_SIZE; y++) {
      for (let x = 0; x < PLASMA_SIZE; x++) {
        // Scale coordinates to match original visual
        const sx = x * (width / PLASMA_SIZE);
        const sy = y * (height / PLASMA_SIZE);
        const value =
          Math.sin(sx * 0.015 + t) +
          Math.sin(sy * 0.018 - t * 1.1) +
          Math.sin((sx + sy) * 0.014 + t * 0.8);

        const normalized = (value + 3) / 6;
        const hue = ((normalized * 255 + this.time * 120) % 360 + 360) % 360;
        const sat = clamp(86 + response * 10, 80, 100);
        const light = clamp(52 + normalized * 8, 50, 60);
        const [r, g, b] = hslToRgb(hue, sat, light);

        const idx = (y * PLASMA_SIZE + x) * 4;
        data[idx] = r;
        data[idx + 1] = g;
        data[idx + 2] = b;
        data[idx + 3] = 190;
      }
    }

    pCtx.putImageData(image, 0, 0);
    // Upscale with smoothing to full canvas
    this.ctx.imageSmoothingEnabled = true;
    this.ctx.imageSmoothingQuality = 'high';
    this.ctx.drawImage(this._plasmaCanvas, 0, 0, width, height);
  }

  drawRgbGlitch(width, height, bass, response, mood = this.mood || computeMoodProfile({ bass, energy: response })) {
    this.drawClassicBars(width, height, response);
    const shift = Math.floor((bass + response) * 8 + mood.jitter * 0.3);
    const layer = this.ctx.getImageData(0, 0, width, height);
    this.ctx.putImageData(layer, shift, 0);
    this.ctx.globalCompositeOperation = 'screen';
    this.ctx.fillStyle = vibrantHsl(330, this.time + bass * 50, 12, 8, mood.hueShift);
    this.ctx.fillRect(0, 0, width, height);
    this.ctx.globalAlpha = clamp(0.12 + bass * 0.3, 0.08, 0.5);
    this.ctx.fillStyle = vibrantHsl(190, this.time + response * 40, 10, 6, mood.hueShift);
    this.ctx.fillRect(shift * -1, 0, width, height);
    this.ctx.globalCompositeOperation = 'source-over';
    this.ctx.globalAlpha = 1;
  }
}

const hslToRgb = (h, s, l) => {
  const hh = (((h % 360) + 360) % 360) / 360;
  const ss = clamp(s / 100, 0, 1);
  const ll = clamp(l / 100, 0, 1);

  if (ss === 0) {
    const gray = Math.round(ll * 255);
    return [gray, gray, gray];
  }

  const hue2rgb = (p, q, t) => {
    let tt = t;
    if (tt < 0) tt += 1;
    if (tt > 1) tt -= 1;
    if (tt < 1 / 6) return p + (q - p) * 6 * tt;
    if (tt < 1 / 2) return q;
    if (tt < 2 / 3) return p + (q - p) * (2 / 3 - tt) * 6;
    return p;
  };

  const q = ll < 0.5 ? ll * (1 + ss) : ll + ss - ll * ss;
  const p = 2 * ll - q;
  const r = hue2rgb(p, q, hh + 1 / 3);
  const g = hue2rgb(p, q, hh);
  const b = hue2rgb(p, q, hh - 1 / 3);
  return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
};

export const VISUALIZER_PRESETS = PRESETS;
