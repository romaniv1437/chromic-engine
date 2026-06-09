/**
 * Visualizer Web Worker — OffscreenCanvas rendering off the main thread.
 *
 * Receives:
 *   - { type: 'init', canvas: OffscreenCanvas, buffer: SharedArrayBuffer, config }
 *   - { type: 'config', preset, accent, intensity, sensitivity, palette, ... }
 *   - { type: 'resize', width, height }
 *   - { type: 'stop' }
 *   - { type: 'start' }
 *
 * When SharedArrayBuffer is used, the worker reads FFT data directly from shared memory.
 * When not available, main thread posts { type: 'frame', freq, wave } each frame.
 */

const FFT_SIZE = 256;
const WAVE_SIZE = 512;

let canvas = null;
let ctx = null;
let running = false;
let frameId = null;
let sharedBuffer = null;
let freqView = null;
let waveView = null;
let metaView = null;
let localFreq = new Uint8Array(FFT_SIZE);
let localWave = new Uint8Array(WAVE_SIZE);

// Config
let config = {
  preset: 'lava',
  intensity: 1,
  sensitivity: 1,
  accent: '#7dd6ff',
  fpsMax: 30,
  bgOpacity: 0.18,
  bgIntensity: 1,
  palette: null,
};

// State
let time = 0;
let lastFrameAt = 0;
let lastFpsTime = 0;
let width = 0;
let height = 0;

// Lava blobs state
let lavaBlobs = [];
let fairyParticles = [];

// Mood state machine (mirrors main thread logic)
let smoothedIntensity = 0;
const workerMoodState = {
  state: 'balanced',
  accumulator: 0,
  pendingState: null,
  currentH: 38, currentS: 80, currentL: 52,
  energyWindow: [],
  windowSize: 180,
};
const WORKER_PALETTES = {
  chill: { h: 190, s: 75, l: 42 },
  balanced: { h: 38, s: 80, l: 52 },
  drive: { h: 340, s: 85, l: 48 },
};
const HOLD_FRAMES = 120;

function workerUpdateMood(rawExcitement, dt) {
  const w = workerMoodState;
  w.energyWindow.push(rawExcitement);
  if (w.energyWindow.length > w.windowSize) w.energyWindow.shift();
  let sum = 0;
  for (let i = 0; i < w.energyWindow.length; i++) sum += w.energyWindow[i];
  const windowed = sum / w.energyWindow.length;

  // Hysteresis state machine
  let target = w.state;
  if (w.state === 'chill' && windowed > 0.42) target = windowed > 0.68 ? 'drive' : 'balanced';
  else if (w.state === 'balanced') {
    if (windowed > 0.68) target = 'drive';
    else if (windowed < 0.30) target = 'chill';
  } else if (w.state === 'drive' && windowed < 0.52) target = windowed < 0.30 ? 'chill' : 'balanced';

  if (target !== w.state) {
    if (w.pendingState === target) { w.accumulator++; if (w.accumulator >= HOLD_FRAMES) { w.state = target; w.accumulator = 0; w.pendingState = null; } }
    else { w.pendingState = target; w.accumulator = 1; }
  } else { w.accumulator = 0; w.pendingState = null; }

  // Ultra-slow color lerp
  const safeDt = Math.min(0.1, Math.max(0.001, dt));
  const alpha = Math.min(0.03, Math.max(0.0005, 0.005 * safeDt * 60));
  const tp = WORKER_PALETTES[w.state];
  let hDiff = tp.h - w.currentH; if (hDiff > 180) hDiff -= 360; if (hDiff < -180) hDiff += 360;
  w.currentH += hDiff * alpha; if (w.currentH < 0) w.currentH += 360; if (w.currentH >= 360) w.currentH -= 360;
  w.currentS += (tp.s - w.currentS) * alpha;
  w.currentL += (tp.l - w.currentL) * alpha;

  return { h: w.currentH, s: w.currentS, l: w.currentL, lightnessOffset: clamp((rawExcitement - 0.5) * 8, -10, 10) };
}

function initLavaBlobs() {
  lavaBlobs = [];
  for (let i = 0; i < 14; i++) {
    lavaBlobs.push({
      x: Math.random(), y: Math.random(),
      vx: (Math.random() - 0.5) * 0.0004,
      vy: (Math.random() - 0.5) * 0.0004,
      radius: 0.25 + Math.random() * 0.3,
      phase: Math.random() * Math.PI * 2,
      speed: 0.1 + Math.random() * 0.35,
    });
  }
}

function clamp(v, min, max) { return Math.min(max, Math.max(min, v)); }

function getColor(index, alpha, palette, energy) {
  const mc = workerMoodState;
  const lOff = clamp((energy - 0.35) * 8, -10, 10);
  if (palette && palette[index % palette.length]) {
    const c = palette[index % palette.length];
    const bp = clamp(lOff * 0.4, -5, 8);
    const r = clamp(c.r + bp, 0, 255);
    const g = clamp(c.g + bp * 0.5, 0, 255);
    const b = clamp(c.b + bp * 0.3, 0, 255);
    return `rgba(${Math.round(r)}, ${Math.round(g)}, ${Math.round(b)}, ${alpha})`;
  }
  const h = mc.currentH + index * 25;
  const s = mc.currentS;
  const l = clamp(mc.currentL + lOff, 30, 65);
  return `hsla(${h}, ${s}%, ${l}%, ${alpha})`;
  return `hsla(${h}, ${s}%, ${l}%, ${alpha})`;
}

function computeBands(freq) {
  const len = freq.length || FFT_SIZE;
  let bass = 0, mid = 0, treble = 0, energy = 0;
  const bassEnd = Math.max(4, Math.floor(len * 0.08));
  const midEnd = Math.floor(len * 0.42);
  const trebleEnd = Math.floor(len * 0.92);

  for (let i = 1; i < bassEnd; i++) bass += freq[i];
  bass /= (bassEnd - 1) * 255 || 1;

  for (let i = bassEnd; i < midEnd; i++) mid += freq[i];
  mid /= (midEnd - bassEnd) * 255 || 1;

  for (let i = midEnd; i < trebleEnd; i++) treble += freq[i];
  treble /= (trebleEnd - midEnd) * 255 || 1;

  for (let i = 0; i < len; i++) energy += freq[i];
  energy /= len * 255 || 1;

  return { bass, mid, treble, energy };
}

function drawFrame(now) {
  if (!running || !ctx) return;

  // FPS throttle
  if (config.fpsMax > 0) {
    const minInterval = 1000 / config.fpsMax;
    if (now - lastFpsTime < minInterval) {
      frameId = requestAnimationFrame(drawFrame);
      return;
    }
    lastFpsTime = now;
  }

  const dt = lastFrameAt > 0 ? (now - lastFrameAt) / 1000 : 1 / 60;
  lastFrameAt = now;
  time += dt;

  // Read FFT from shared buffer
  let freq, wave;
  if (sharedBuffer) {
    freq = freqView;
    wave = waveView;
  } else {
    freq = localFreq;
    wave = localWave;
  }

  const bands = computeBands(freq);
  const { bass, mid, treble, energy } = bands;

  // Mood state machine — treble excluded from mood, bass+mid only
  const safeDt = Math.min(0.1, Math.max(0.001, dt));
  const structuralEnergy = bass * 0.7 + mid * 0.3;
  const weightedIntensity = clamp(structuralEnergy * (config.sensitivity || 1) * (config.intensity || 1), 0, 1.6);
  const rawExcitement = clamp(weightedIntensity, 0, 1);
  const workerMood = workerUpdateMood(rawExcitement, dt);
  smoothedIntensity += (weightedIntensity - smoothedIntensity) * clamp(0.2 * (safeDt * 60), 0.01, 0.5);

  // Clear
  ctx.clearRect(0, 0, width, height);

  // Dark background
  ctx.fillStyle = `rgba(3, 8, 18, 0.28)`;
  ctx.fillRect(0, 0, width, height);

  // Lava background
  drawLava(bass, treble, energy, rawExcitement);

  // Fairy particles
  drawFairyParticles(bass, energy);

  frameId = requestAnimationFrame(drawFrame);
}

function drawLava(bass, treble, energy, rawExcitement) {
  if (!lavaBlobs.length) initLavaBlobs();

  const bgAlpha = clamp(config.bgOpacity * 0.85 + bass * 0.05, 0, 0.35);
  const speedFactor = config.bgIntensity * (0.06 + treble * 0.08 + bass * 0.06);
  const t = performance.now() * 0.00004 * speedFactor;

  // Use offscreen lava buffer at 512px for performance in worker
  const LAVA_SIZE = 512;
  const lavaCanvas = new OffscreenCanvas(LAVA_SIZE, LAVA_SIZE);
  const lCtx = lavaCanvas.getContext('2d');

  lCtx.clearRect(0, 0, LAVA_SIZE, LAVA_SIZE);

  for (let i = 0; i < lavaBlobs.length; i++) {
    const blob = lavaBlobs[i];
    blob.vx += Math.sin(t * blob.speed + blob.phase) * 0.00006;
    blob.vy += Math.cos(t * blob.speed * 0.5 + blob.phase) * 0.00006;
    blob.vx += bass * 0.00015 * Math.sin(t * 1.2 + i * 0.8);
    blob.vy += bass * 0.00015 * Math.cos(t + i);
    blob.vx *= 0.992;
    blob.vy *= 0.992;
    blob.x += blob.vx;
    blob.y += blob.vy;
    if (blob.x < -0.1) blob.x += 1.2;
    if (blob.x > 1.1) blob.x -= 1.2;
    if (blob.y < -0.1) blob.y += 1.2;
    if (blob.y > 1.1) blob.y -= 1.2;

    const r = (blob.radius + bass * 0.02 + Math.sin(t * blob.speed * 0.2 + blob.phase) * 0.02) * LAVA_SIZE;
    const bx = blob.x * LAVA_SIZE;
    const by = blob.y * LAVA_SIZE;

    const grad = lCtx.createRadialGradient(bx, by, 0, bx, by, r);
    grad.addColorStop(0, getColor(i, 0.55, config.palette, energy));
    grad.addColorStop(0.25, getColor(i + 1, 0.35, config.palette, energy));
    grad.addColorStop(0.55, getColor(i + 3, 0.12, config.palette, energy));
    grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
    lCtx.fillStyle = grad;
    lCtx.beginPath();
    lCtx.arc(bx, by, r, 0, Math.PI * 2);
    lCtx.fill();
  }

  ctx.save();
  ctx.globalCompositeOperation = 'screen';
  ctx.globalAlpha = bgAlpha;
  ctx.imageSmoothingEnabled = true;
  ctx.drawImage(lavaCanvas, 0, 0, width, height);
  ctx.restore();
}

function drawFairyParticles(bass, energy) {
  const maxFairy = 40;
  if (bass > 0.35 && fairyParticles.length < maxFairy) {
    const count = Math.floor(1 + bass * 2);
    for (let s = 0; s < count && fairyParticles.length < maxFairy; s++) {
      fairyParticles.push({
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

  ctx.save();
  ctx.globalCompositeOperation = 'screen';
  const now = performance.now();
  fairyParticles = fairyParticles.filter((p) => {
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
    ctx.globalAlpha = alpha;
    ctx.fillStyle = `hsla(${p.hue}, 85%, 70%, 1)`;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.size * (0.5 + lifeRatio * 0.5), 0, Math.PI * 2);
    ctx.fill();
    return true;
  });
  ctx.restore();
}

// ─── Message Handler ───
self.onmessage = (e) => {
  const msg = e.data;

  switch (msg.type) {
    case 'init':
      canvas = msg.canvas;
      ctx = canvas.getContext('2d');
      width = msg.width || canvas.width;
      height = msg.height || canvas.height;
      canvas.width = width;
      canvas.height = height;

      if (msg.buffer) {
        sharedBuffer = msg.buffer;
        freqView = new Uint8Array(sharedBuffer, 0, FFT_SIZE);
        waveView = new Uint8Array(sharedBuffer, FFT_SIZE, WAVE_SIZE);
        metaView = new Float32Array(sharedBuffer, FFT_SIZE + WAVE_SIZE, 4);
      }

      if (msg.config) Object.assign(config, msg.config);
      initLavaBlobs();
      running = true;
      frameId = requestAnimationFrame(drawFrame);
      break;

    case 'config':
      Object.assign(config, msg);
      break;

    case 'resize':
      width = msg.width;
      height = msg.height;
      if (canvas) {
        canvas.width = width;
        canvas.height = height;
      }
      break;

    case 'frame':
      // Fallback: receive freq/wave data via postMessage when no SharedArrayBuffer
      if (msg.freq) localFreq.set(msg.freq);
      if (msg.wave) localWave.set(msg.wave);
      break;

    case 'start':
      if (!running) {
        running = true;
        lastFrameAt = 0;
        frameId = requestAnimationFrame(drawFrame);
      }
      break;

    case 'stop':
      running = false;
      if (frameId) {
        cancelAnimationFrame(frameId);
        frameId = null;
      }
      break;
  }
};

