const state = {
  activeType: 'music',
  items: [],
  musicQueue: [],
  currentTrackId: null,
  currentTrackIndex: -1,
  isShuffle: false,
  audioCtx: null,
  analyser: null,
  audioSourceNode: null,
  audioSourceElement: null,
  animationId: null,
  musicPlayerUi: null,
  musicVisualizer: null,
  progressRaf: null,
  visualPreset: 'vaporwave-grid',
  visualEnabled: true,
  textEnabled: true,
  intensity: 1,
  sensitivity: 1,
  retroFilterEnabled: false,
  contentMode: 'visualizer',
  musicUiMode: 'default',
  albumAccent: '#7df0ff',
  isSettingsOverlayOpen: false,
};

const MIME_BY_EXT = {
  '.mp4': 'video/mp4',
  '.webm': 'video/webm',
  '.mov': 'video/quicktime',
  '.m4v': 'video/mp4',
  '.mkv': 'video/x-matroska',
  '.mp3': 'audio/mpeg',
  '.wav': 'audio/wav',
  '.ogg': 'audio/ogg',
  '.m4a': 'audio/mp4',
  '.aac': 'audio/aac',
  '.aiff': 'audio/aiff',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.gif': 'image/gif',
  '.avif': 'image/avif',
  '.svg': 'image/svg+xml',
  '.pdf': 'application/pdf',
};


const THEME_STORAGE_KEY = 'mymedia-theme';
const DEFAULT_THEME = 'light-retro';

const tabsEl = document.getElementById('tabs');
const gridEl = document.getElementById('grid');
const playerAreaEl = document.getElementById('playerArea');
const appShellEl = document.querySelector('.app-shell');
const uploadFormEl = document.getElementById('uploadForm');
const fileInputEl = document.getElementById('fileInput');
const sectionTitleEl = document.getElementById('sectionTitle');
const themeSelectEl = document.getElementById('themeSelect');
const globalPlayerTitleEl = document.getElementById('globalPlayerTitle');
const globalPlayerSubtitleEl = document.getElementById('globalPlayerSubtitle');
const globalPlayerArtEl = document.getElementById('globalPlayerArt');
const globalAudioEl = document.getElementById('globalAudio');
const prevBtnEl = document.getElementById('playerPrevBtn');
const playPauseBtnEl = document.getElementById('playerPlayPauseBtn');
const nextBtnEl = document.getElementById('playerNextBtn');
const shuffleBtnEl = document.getElementById('playerShuffleBtn');
const trackSettingsOverlayEl = document.getElementById('trackSettingsOverlay');
const trackSettingsCloseEl = document.getElementById('trackSettingsClose');
const visualPresetSelectEl = document.getElementById('visualPresetSelect');
const trackContentModeEl = document.getElementById('trackContentMode');
const visualEnabledToggleEl = document.getElementById('visualEnabledToggle');
const textEnabledToggleEl = document.getElementById('textEnabledToggle');
const retroFilterToggleEl = document.getElementById('retroFilterToggle');
const intensityRangeEl = document.getElementById('intensityRange');
const sensitivityRangeEl = document.getElementById('sensitivityRange');

const CATEGORY_TITLES = {
  music: 'Music',
};

const VISUALIZER_PRESETS = [
  'classic-bars',
  'oscilloscope',
  'milkdrop-nebula',
  'starfield-warp',
  'pulsing-ring',
  'vaporwave-grid',
  'spectrum-fire',
  'digital-rain',
  'plasma-flow',
  'rgb-glitch',
];

const escapeHtml = (value) =>
  String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');

const formatSize = (bytes) => {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  if (bytes < 1024 * 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  return `${(bytes / (1024 * 1024 * 1024)).toFixed(1)} GB`;
};


const clearVisualizer = () => {
  state.musicVisualizer?.stop();
  state.musicVisualizer = null;
  if (state.progressRaf) {
    cancelAnimationFrame(state.progressRaf);
    state.progressRaf = null;
  }
};

const ensureAudioPipeline = (audioEl) => {
  if (!state.audioCtx) {
    state.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }

  if (state.audioCtx.state === 'suspended') {
    state.audioCtx.resume();
  }

  if (!state.analyser) {
    state.analyser = state.audioCtx.createAnalyser();
    state.analyser.fftSize = 512;
    state.analyser.smoothingTimeConstant = 0.83;
  }

  if (!state.audioSourceNode || state.audioSourceElement !== audioEl) {
    state.audioSourceNode = state.audioCtx.createMediaElementSource(audioEl);
    state.audioSourceElement = audioEl;
    state.audioSourceNode.connect(state.analyser);
    state.analyser.connect(state.audioCtx.destination);
  }

  return state.analyser;
};

class VisualizerManager {
  constructor({ canvas, analyser, intensity = 1, sensitivity = 1, preset = 'vaporwave-grid', accent = '#7df0ff' }) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d', { willReadFrequently: true });
    this.analyser = analyser;
    this.intensity = intensity;
    this.sensitivity = sensitivity;
    this.preset = preset;
    this.accent = accent;
    this.enabled = true;
    this.frameId = null;
    this.time = 0;
    this.freq = new Uint8Array(this.analyser.frequencyBinCount);
    this.wave = new Uint8Array(this.analyser.fftSize);
    this.stars = [];
    this.particles = [];
    this.rainColumns = [];
    this.reseedVisualPools();
  }

  setIntensity(value) {
    this.intensity = Math.max(0.2, Math.min(2.4, Number(value) || 1));
  }

  setSensitivity(value) {
    this.sensitivity = Math.max(0.4, Math.min(2.5, Number(value) || 1));
  }

  setPreset(presetName) {
    if (VISUALIZER_PRESETS.includes(presetName)) {
      this.preset = presetName;
    }
  }

  setAccent(color) {
    if (typeof color === 'string' && color) {
      this.accent = color;
    }
  }

  setEnabled(value) {
    this.enabled = Boolean(value);
  }

  reseedVisualPools() {
    this.stars = Array.from({ length: 180 }, () => ({
      x: (Math.random() - 0.5) * 2,
      y: (Math.random() - 0.5) * 2,
      z: Math.random() * 0.95 + 0.05,
      speed: Math.random() * 0.016 + 0.004,
    }));

    this.particles = Array.from({ length: 96 }, () => ({
      angle: Math.random() * Math.PI * 2,
      radius: Math.random() * 180,
      drift: Math.random() * 0.4 + 0.2,
      size: Math.random() * 2.8 + 0.8,
    }));

    this.rainColumns = Array.from({ length: 90 }, () => ({
      y: Math.random() * 1200,
      speed: Math.random() * 8 + 4,
      value: Math.floor(Math.random() * 94 + 33),
    }));
  }

  resize() {
    const ratio = window.devicePixelRatio || 1;
    const width = this.canvas.clientWidth || this.canvas.offsetWidth || window.innerWidth;
    const height = this.canvas.clientHeight || this.canvas.offsetHeight || window.innerHeight;
    this.canvas.width = Math.max(320, Math.floor(width * ratio));
    this.canvas.height = Math.max(200, Math.floor(height * ratio));
    this.ctx.setTransform(1, 0, 0, 1, 0, 0);
    this.ctx.scale(ratio, ratio);
    this.reseedVisualPools();
  }

  sampleAudio() {
    this.analyser.getByteFrequencyData(this.freq);
    this.analyser.getByteTimeDomainData(this.wave);

    const bassSlice = 24;
    const midStart = Math.floor(this.freq.length * 0.26);
    const midEnd = Math.floor(this.freq.length * 0.56);
    const trebleStart = Math.floor(this.freq.length * 0.74);

    const readEnergy = (start, end) => {
      if (end <= start) {
        return 0;
      }
      let total = 0;
      for (let i = start; i < end; i += 1) {
        total += this.freq[i] || 0;
      }
      return total / (end - start) / 255;
    };

    const bass = readEnergy(0, bassSlice) * this.intensity * this.sensitivity;
    const mid = readEnergy(midStart, midEnd) * this.intensity * this.sensitivity;
    const treble = readEnergy(trebleStart, this.freq.length) * this.intensity * this.sensitivity;
    const volume = Math.min(1.6, (bass * 0.45 + mid * 0.35 + treble * 0.2) * 1.35);

    return {
      bass,
      mid,
      treble,
      volume,
    };
  }

  drawBackdrop(width, height, energy) {
    const ctx = this.ctx;
    const gradient = ctx.createRadialGradient(width * 0.5, height * 0.42, width * 0.08, width * 0.5, height * 0.42, width * 0.78);
    gradient.addColorStop(0, `color-mix(in srgb, ${this.accent} 40%, #101624)`);
    gradient.addColorStop(1, 'rgba(3, 7, 16, 0.92)');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    if (energy.volume > 0.45) {
      ctx.fillStyle = `rgba(255,255,255,${Math.min(0.08, energy.volume * 0.08)})`;
      ctx.fillRect(0, 0, width, height);
    }
  }

  drawClassicBars(width, height, energy) {
    const ctx = this.ctx;
    const barCount = 88;
    const gap = 2;
    const barWidth = width / barCount;
    ctx.fillStyle = `color-mix(in srgb, ${this.accent} 70%, #9effff)`;

    for (let i = 0; i < barCount; i += 1) {
      const idx = Math.floor((i / barCount) * this.freq.length);
      const value = this.freq[idx] / 255;
      const barHeight = (height * 0.78 * value + 6) * this.intensity;
      const x = i * barWidth;
      const y = height - barHeight;

      ctx.fillRect(x, y, Math.max(1, barWidth - gap), barHeight);

      const peak = height - Math.max(4, barHeight + Math.sin(this.time * 0.04 + i) * 4 + energy.volume * 24);
      ctx.fillStyle = 'rgba(255,255,255,0.85)';
      ctx.fillRect(x, peak, Math.max(1, barWidth - gap), 2);
      ctx.fillStyle = `color-mix(in srgb, ${this.accent} 70%, #9effff)`;
    }
  }

  drawOscilloscope(width, height, energy) {
    const ctx = this.ctx;
    const centerY = height * 0.5;
    ctx.lineWidth = 2.2;
    ctx.strokeStyle = 'rgba(120, 255, 168, 0.95)';
    ctx.shadowColor = 'rgba(120, 255, 168, 0.6)';
    ctx.shadowBlur = 18;
    ctx.beginPath();
    for (let i = 0; i < this.wave.length; i += 1) {
      const x = (i / (this.wave.length - 1)) * width;
      const waveVal = (this.wave[i] - 128) / 128;
      const y = centerY + waveVal * (height * 0.24 + energy.volume * 68);
      if (i === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    }
    ctx.stroke();
    ctx.shadowBlur = 0;
  }

  drawMilkdropNebula(width, height, energy) {
    const ctx = this.ctx;
    const centerX = width * 0.5;
    const centerY = height * 0.5;

    this.particles.forEach((particle, index) => {
      particle.angle += 0.008 + particle.drift * 0.01;
      particle.radius += Math.sin(this.time * 0.008 + index * 0.2) * 0.35 + energy.bass * 2.3;
      if (particle.radius > Math.max(width, height) * 0.7) {
        particle.radius = Math.random() * 40;
      }

      const x = centerX + Math.cos(particle.angle) * particle.radius;
      const y = centerY + Math.sin(particle.angle) * particle.radius * 0.7;
      const alpha = Math.min(1, 0.18 + energy.volume * 0.7);
      ctx.beginPath();
      ctx.fillStyle = `rgba(${140 + (index % 80)}, ${80 + (index % 90)}, 255, ${alpha})`;
      ctx.arc(x, y, particle.size + energy.volume * 4, 0, Math.PI * 2);
      ctx.fill();
    });
  }

  drawStarfieldWarp(width, height, energy) {
    const ctx = this.ctx;
    const centerX = width * 0.5;
    const centerY = height * 0.5;
    const speedBoost = 1 + energy.volume * 5;

    this.stars.forEach((star) => {
      star.z -= star.speed * speedBoost;
      if (star.z <= 0.02) {
        star.x = (Math.random() - 0.5) * 2;
        star.y = (Math.random() - 0.5) * 2;
        star.z = 1;
      }

      const projX = centerX + (star.x / star.z) * width * 0.42;
      const projY = centerY + (star.y / star.z) * height * 0.42;
      const radius = Math.max(0.8, (1 - star.z) * 3.8);
      ctx.beginPath();
      ctx.fillStyle = `rgba(210, 234, 255, ${0.2 + radius * 0.2})`;
      ctx.arc(projX, projY, radius, 0, Math.PI * 2);
      ctx.fill();
    });
  }

  drawPulsingRing(width, height, energy) {
    const ctx = this.ctx;
    const centerX = width * 0.5;
    const centerY = height * 0.5;
    const baseRadius = Math.min(width, height) * 0.22;
    const bars = 140;

    ctx.save();
    ctx.translate(centerX, centerY);
    for (let i = 0; i < bars; i += 1) {
      const idx = Math.floor((i / bars) * this.freq.length);
      const amp = (this.freq[idx] / 255) * this.intensity;
      const angle = (i / bars) * Math.PI * 2;
      const heightBoost = amp * (80 + energy.bass * 120);
      const x1 = Math.cos(angle) * baseRadius;
      const y1 = Math.sin(angle) * baseRadius;
      const x2 = Math.cos(angle) * (baseRadius + heightBoost);
      const y2 = Math.sin(angle) * (baseRadius + heightBoost);

      ctx.strokeStyle = `hsla(${210 + amp * 90}, 95%, ${60 + amp * 30}%, 0.84)`;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();
    }
    ctx.restore();
  }

  drawVaporwaveGrid(width, height, energy) {
    const ctx = this.ctx;
    const horizonY = height * 0.54;
    const glowRadius = Math.min(width, height) * (0.17 + energy.bass * 0.05);
    const sun = ctx.createRadialGradient(width * 0.5, horizonY * 0.96, glowRadius * 0.2, width * 0.5, horizonY * 0.96, glowRadius);
    sun.addColorStop(0, 'rgba(255, 170, 219, 0.85)');
    sun.addColorStop(0.55, 'rgba(255, 91, 210, 0.32)');
    sun.addColorStop(1, 'rgba(255, 91, 210, 0)');
    ctx.fillStyle = sun;
    ctx.fillRect(0, 0, width, height);

    ctx.lineWidth = 1;
    ctx.strokeStyle = 'rgba(121, 228, 255, 0.42)';
    const spacing = 30;
    const perspective = 2.35;
    const depthLines = 20;

    for (let row = 0; row <= depthLines; row += 1) {
      const depth = row / depthLines;
      const y = horizonY + depth * depth * (height - horizonY) * perspective;
      const wobble = Math.sin(this.time * 0.0025 + row * 0.3) * 5 * this.intensity;
      ctx.beginPath();
      ctx.moveTo(0, y + wobble + energy.bass * row * 0.45);
      ctx.lineTo(width, y + wobble + energy.bass * row * 0.45);
      ctx.stroke();
    }

    const centerX = width * 0.5;
    for (let col = -16; col <= 16; col += 1) {
      const baseX = centerX + col * spacing;
      const drift = Math.sin(this.time * 0.0018 + col * 0.45) * (5 + energy.bass * 14);
      ctx.beginPath();
      ctx.moveTo(baseX, horizonY);
      ctx.lineTo(baseX + drift * 2.1, height);
      ctx.stroke();
    }

    ctx.strokeStyle = `rgba(255, 113, 216, ${0.48 + energy.bass * 0.26})`;
    ctx.lineWidth = 2;
    ctx.beginPath();
    for (let i = 0; i < this.wave.length; i += 1) {
      const amp = (this.wave[i] - 128) / 128;
      const x = (i / (this.wave.length - 1)) * width;
      const y = horizonY - 22 - amp * (26 + energy.bass * 52) + Math.sin(this.time * 0.0032 + i * 0.02) * 3;
      if (i === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    }
    ctx.stroke();

    const vignette = ctx.createRadialGradient(width * 0.5, horizonY, width * 0.22, width * 0.5, horizonY, width * 0.85);
    vignette.addColorStop(0, 'rgba(0, 0, 0, 0)');
    vignette.addColorStop(1, 'rgba(0, 0, 0, 0.66)');
    ctx.fillStyle = vignette;
    ctx.fillRect(0, 0, width, height);
  }

  drawSpectrumFire(width, height, energy) {
    const ctx = this.ctx;
    const bars = 84;
    const barWidth = width / bars;
    for (let i = 0; i < bars; i += 1) {
      const idx = Math.floor((i / bars) * this.freq.length);
      const amp = this.freq[idx] / 255;
      const fireHeight = (amp ** 1.1) * height * (0.86 + energy.bass * 0.42);
      const x = i * barWidth;
      const y = height - fireHeight;
      const gradient = ctx.createLinearGradient(0, y, 0, height);
      gradient.addColorStop(0, '#fffde7');
      gradient.addColorStop(0.35, '#ffca70');
      gradient.addColorStop(0.72, '#ff6c3d');
      gradient.addColorStop(1, '#90250e');
      ctx.fillStyle = gradient;
      ctx.fillRect(x, y, Math.max(1, barWidth - 1), fireHeight);
    }
  }

  drawDigitalRain(width, height, energy) {
    const ctx = this.ctx;
    const columns = this.rainColumns;
    const charSize = Math.max(12, Math.floor(width / 80));
    const colWidth = width / columns.length;
    ctx.font = `${charSize}px ui-monospace, SFMono-Regular, Menlo, monospace`;

    columns.forEach((col, index) => {
      const amp = this.freq[index % this.freq.length] / 255;
      col.y += col.speed * (0.5 + amp * this.sensitivity * 2);
      if (col.y > height + charSize) {
        col.y = -Math.random() * 160;
      }

      const x = index * colWidth;
      const charCode = 33 + Math.floor((amp + Math.random() * 0.6) * 90) % 90;
      const alpha = Math.min(1, 0.3 + amp * 0.8 + energy.treble * 0.26);
      ctx.fillStyle = `rgba(112, 255, 170, ${alpha})`;
      ctx.fillText(String.fromCharCode(charCode), x, col.y);
    });
  }

  drawPlasmaFlow(width, height, energy) {
    const ctx = this.ctx;
    const step = 16;
    for (let y = 0; y < height; y += step) {
      for (let x = 0; x < width; x += step) {
        const v1 = Math.sin(x * 0.014 + this.time * 0.01);
        const v2 = Math.sin(y * 0.018 + this.time * 0.012);
        const v3 = Math.sin((x + y) * 0.011 + this.time * 0.016 + energy.bass * 6);
        const mix = (v1 + v2 + v3) / 3;
        const hue = 220 + mix * 80 + energy.mid * 60;
        const alpha = 0.24 + energy.volume * 0.36;
        ctx.fillStyle = `hsla(${hue}, 90%, 56%, ${alpha})`;
        ctx.fillRect(x, y, step + 1, step + 1);
      }
    }
  }

  drawRgbGlitch(width, height, energy) {
    this.drawClassicBars(width, height, energy);
    const ctx = this.ctx;
    if (energy.bass < 0.36) {
      return;
    }
    const shake = Math.min(12, 3 + energy.bass * 18);
    ctx.save();
    ctx.globalCompositeOperation = 'lighter';
    ctx.translate(-shake, 0);
    ctx.fillStyle = 'rgba(255, 0, 96, 0.09)';
    ctx.fillRect(0, 0, width, height);
    ctx.translate(shake * 2, 0);
    ctx.fillStyle = 'rgba(72, 255, 255, 0.08)';
    ctx.fillRect(0, 0, width, height);
    ctx.restore();
  }

  drawFrame() {
    if (!this.enabled) {
      return;
    }

    const width = this.canvas.clientWidth || window.innerWidth;
    const height = this.canvas.clientHeight || window.innerHeight;
    const ctx = this.ctx;
    const energy = this.sampleAudio();

    ctx.clearRect(0, 0, width, height);
    this.drawBackdrop(width, height, energy);

    switch (this.preset) {
      case 'classic-bars':
        this.drawClassicBars(width, height, energy);
        break;
      case 'oscilloscope':
        this.drawOscilloscope(width, height, energy);
        break;
      case 'milkdrop-nebula':
        this.drawMilkdropNebula(width, height, energy);
        break;
      case 'starfield-warp':
        this.drawStarfieldWarp(width, height, energy);
        break;
      case 'pulsing-ring':
        this.drawPulsingRing(width, height, energy);
        break;
      case 'spectrum-fire':
        this.drawSpectrumFire(width, height, energy);
        break;
      case 'digital-rain':
        this.drawDigitalRain(width, height, energy);
        break;
      case 'plasma-flow':
        this.drawPlasmaFlow(width, height, energy);
        break;
      case 'rgb-glitch':
        this.drawRgbGlitch(width, height, energy);
        break;
      case 'vaporwave-grid':
      default:
        this.drawVaporwaveGrid(width, height, energy);
        break;
    }

    this.time += 16;
  }

  start() {
    if (!this.ctx) {
      return;
    }
    this.stop();
    this.resize();

    const frame = () => {
      this.drawFrame();
      this.frameId = requestAnimationFrame(frame);
    };
    frame();
  }

  stop() {
    if (this.frameId) {
      cancelAnimationFrame(this.frameId);
      this.frameId = null;
    }
  }
}

const applyTheme = (themeName) => {
  const availableThemes = Array.from(themeSelectEl.options).map((option) => option.value);
  const normalized = availableThemes.includes(themeName) ? themeName : DEFAULT_THEME;
  document.body.dataset.theme = normalized;
  themeSelectEl.value = normalized;
  localStorage.setItem(THEME_STORAGE_KEY, normalized);
};

const initTheme = () => {
  const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
  applyTheme(savedTheme || DEFAULT_THEME);
};

const setSectionMode = (type) => {
  document.body.dataset.section = type;
  if (appShellEl) {
    appShellEl.dataset.section = type;
  }


  if (type !== 'music') {
    state.musicUiMode = 'default';
  }
};

const applyMusicAccent = (color) => {
  if (!color) {
    return;
  }
  state.albumAccent = color;
  document.documentElement.style.setProperty('--music-accent', color);
};

const extractAccentFromImage = async (imageUrl) => {
  if (!imageUrl) {
    return null;
  }

  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      try {
        const canvas = document.createElement('canvas');
        const targetWidth = 36;
        const targetHeight = 36;
        canvas.width = targetWidth;
        canvas.height = targetHeight;
        const ctx = canvas.getContext('2d', { willReadFrequently: true });
        if (!ctx) {
          resolve(null);
          return;
        }

        ctx.drawImage(img, 0, 0, targetWidth, targetHeight);
        const pixels = ctx.getImageData(0, 0, targetWidth, targetHeight).data;

        let r = 0;
        let g = 0;
        let b = 0;
        let count = 0;

        for (let i = 0; i < pixels.length; i += 4) {
          const alpha = pixels[i + 3];
          if (alpha < 84) {
            continue;
          }
          r += pixels[i];
          g += pixels[i + 1];
          b += pixels[i + 2];
          count += 1;
        }

        if (!count) {
          resolve(null);
          return;
        }

        const rr = Math.min(255, Math.round(r / count));
        const gg = Math.min(255, Math.round(g / count));
        const bb = Math.min(255, Math.round(b / count));
        resolve(`rgb(${rr}, ${gg}, ${bb})`);
      } catch (_error) {
        resolve(null);
      }
    };
    img.onerror = () => resolve(null);
    img.src = imageUrl;
  });
};

const toggleUIMode = (mode = 'default') => {
  state.musicUiMode = mode;
  const page = playerAreaEl.querySelector('.music-track-page');
  if (!page) {
    return;
  }
  page.classList.toggle('mode-visualizer-only', mode === 'visualizer-only');
};

const applyMusicPageFlags = () => {
  const page = playerAreaEl.querySelector('.music-track-page');
  if (!page) {
    return;
  }

  page.classList.toggle('visuals-off', !state.visualEnabled);
  page.classList.toggle('text-off', !state.textEnabled);
  page.classList.toggle('retro-filter', state.retroFilterEnabled);
  page.dataset.contentMode = state.contentMode;
  page.classList.toggle('mode-lyrics', state.contentMode === 'lyrics');
  page.classList.toggle('mode-info', state.contentMode === 'info');
  page.classList.toggle('mode-visualizer-content', state.contentMode === 'visualizer');
};

const syncTrackSettingsUi = () => {
  if (visualPresetSelectEl) {
    visualPresetSelectEl.value = state.visualPreset;
  }
  if (visualEnabledToggleEl) {
    visualEnabledToggleEl.checked = state.visualEnabled;
  }
  if (textEnabledToggleEl) {
    textEnabledToggleEl.checked = state.textEnabled;
  }
  if (retroFilterToggleEl) {
    retroFilterToggleEl.checked = state.retroFilterEnabled;
  }
  if (intensityRangeEl) {
    intensityRangeEl.value = String(state.intensity);
  }
  if (sensitivityRangeEl) {
    sensitivityRangeEl.value = String(state.sensitivity);
  }

  if (trackContentModeEl) {
    trackContentModeEl.querySelectorAll('button[data-content-mode]').forEach((button) => {
      button.classList.toggle('active', button.dataset.contentMode === state.contentMode);
    });
  }
};

const closeTrackSettingsOverlay = () => {
  if (!trackSettingsOverlayEl) {
    return;
  }
  state.isSettingsOverlayOpen = false;
  trackSettingsOverlayEl.hidden = true;
  trackSettingsOverlayEl.setAttribute('aria-hidden', 'true');
};

const openTrackSettingsOverlay = () => {
  if (!trackSettingsOverlayEl || !state.currentTrackId) {
    return;
  }
  state.isSettingsOverlayOpen = true;
  syncTrackSettingsUi();
  trackSettingsOverlayEl.hidden = false;
  trackSettingsOverlayEl.setAttribute('aria-hidden', 'false');
};

const bindTrackSettingsOverlay = () => {
  trackSettingsCloseEl?.addEventListener('click', closeTrackSettingsOverlay);
  trackSettingsOverlayEl?.addEventListener('click', (event) => {
    if (event.target === trackSettingsOverlayEl) {
      closeTrackSettingsOverlay();
    }
  });

  visualPresetSelectEl?.addEventListener('change', (event) => {
    state.visualPreset = event.target.value;
    state.musicVisualizer?.setPreset(state.visualPreset);
  });

  trackContentModeEl?.addEventListener('click', (event) => {
    const button = event.target.closest('button[data-content-mode]');
    if (!button) {
      return;
    }
    state.contentMode = button.dataset.contentMode;
    syncTrackSettingsUi();
    applyMusicPageFlags();
  });

  visualEnabledToggleEl?.addEventListener('change', (event) => {
    state.visualEnabled = event.target.checked;
    state.musicVisualizer?.setEnabled(state.visualEnabled);
    applyMusicPageFlags();
  });

  textEnabledToggleEl?.addEventListener('change', (event) => {
    state.textEnabled = event.target.checked;
    applyMusicPageFlags();
  });

  retroFilterToggleEl?.addEventListener('change', (event) => {
    state.retroFilterEnabled = event.target.checked;
    applyMusicPageFlags();
  });

  intensityRangeEl?.addEventListener('input', (event) => {
    state.intensity = Number(event.target.value || 1);
    state.musicVisualizer?.setIntensity(state.intensity);
  });

  sensitivityRangeEl?.addEventListener('input', (event) => {
    state.sensitivity = Number(event.target.value || 1);
    state.musicVisualizer?.setSensitivity(state.sensitivity);
  });
};


const canPlayMedia = (item) => {
  const ext = item.ext?.toLowerCase() || '';
  const mime = MIME_BY_EXT[ext] || '';
  if (!mime) {
    return false;
  }

  const audio = document.createElement('audio');
  return audio.canPlayType(mime) !== '';
};

const formatPlaybackTime = (seconds) => {
  if (!Number.isFinite(seconds) || seconds < 0) {
    return '0:00';
  }
  const rounded = Math.floor(seconds);
  const mins = Math.floor(rounded / 60);
  const secs = rounded % 60;
  return `${mins}:${String(secs).padStart(2, '0')}`;
};

const buildFallbackPreview = (item) => {
  const typeTitle = item.category?.toUpperCase() || 'MEDIA';
  const extension = (item.ext || '').replace('.', '').toUpperCase() || 'FILE';
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='640' height='360' viewBox='0 0 640 360'>
    <defs>
      <linearGradient id='g' x1='0' y1='0' x2='1' y2='1'>
        <stop offset='0%' stop-color='#8ec9ff'/>
        <stop offset='100%' stop-color='#2d7dd2'/>
      </linearGradient>
    </defs>
    <rect width='640' height='360' fill='url(#g)' />
    <rect x='22' y='22' width='596' height='316' rx='22' fill='rgba(255,255,255,0.2)' />
    <text x='42' y='84' font-family='Arial, sans-serif' font-size='30' fill='white' font-weight='700'>${typeTitle}</text>
    <text x='42' y='320' font-family='Arial, sans-serif' font-size='26' fill='white' opacity='0.9'>${extension} PREVIEW</text>
  </svg>`;
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
};

const resolvePreviewUrl = (item) => item.previewUrl || buildFallbackPreview(item);

const getTrackTitle = (item) => {
  let text = (item.title || '').replace(/_/g, ' ');
  if (!text) {
    const fileName = String(item.name || '').split('/').pop() || 'Track';
    text = fileName.replace(/\.[^.]+$/, '') || fileName;
  }
  // Strip artist prefix: "Artist - Title" → "Title"
  const artist = (item.artist || '').replace(/_/g, ' ').trim();
  if (artist && text.length > artist.length + 1) {
    const escaped = artist.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const reWithSep = new RegExp(`^${escaped}\\s*[-–—]\\s*`, 'i');
    if (reWithSep.test(text)) {
      text = text.replace(reWithSep, '');
    }
  }
  // Strip track number prefix: "01 - Title" or "01 Title"
  text = text.replace(/^\d{1,3}\s*[-–—.]\s*/, '').replace(/^\d{1,3}\s+(?=[A-Z])/, '');
  // Split by " - " and take last meaningful part
  const parts = text.split(/\s+-\s+/);
  if (parts.length > 1) {
    let title = parts[parts.length - 1].trim();
    if (/^\d+$/.test(title) && parts.length > 2) title = parts[parts.length - 2].trim();
    return title || text;
  }
  return text.trim() || 'Unknown';
};

const getTrackAlbum = (item) => {
  if (item.album) {
    return item.album;
  }

  const parts = String(item.name || '').split('/').filter(Boolean);
  return parts.length > 1 ? parts[parts.length - 2] : 'Singles';
};

const getTrackPathHint = (item) => {
  const parts = String(item.name || '').split('/').filter(Boolean);
  if (parts.length <= 1) {
    return 'Singles';
  }
  return parts.slice(0, -1).join(' / ');
};

const syncMusicQueue = () => {
  state.musicQueue = state.items.filter((item) => item.category === 'music');
  if (!state.currentTrackId) {
    return;
  }

  const idx = state.musicQueue.findIndex((item) => item.id === state.currentTrackId);
  state.currentTrackIndex = idx;
  if (idx === -1) {
    state.currentTrackId = null;
  }
};

const updatePlayPauseButton = () => {
  const label = globalAudioEl.paused ? '▶' : '⏸';
  playPauseBtnEl.textContent = label;
  if (state.musicPlayerUi?.playBtn) {
    state.musicPlayerUi.playBtn.textContent = label;
  }
};

const updateShuffleButton = () => {
  const label = state.isShuffle ? 'Shuffle On' : 'Shuffle Off';
  shuffleBtnEl.textContent = label;
  shuffleBtnEl.classList.toggle('active', state.isShuffle);
  if (state.musicPlayerUi?.shuffleBtn) {
    state.musicPlayerUi.shuffleBtn.textContent = label;
    state.musicPlayerUi.shuffleBtn.classList.toggle('active', state.isShuffle);
  }
};

const updateGlobalPlayerInfo = (track) => {
  if (!track) {
    globalPlayerTitleEl.textContent = 'No track selected';
    globalPlayerSubtitleEl.textContent = 'Pick a song in Music';
    globalPlayerArtEl.src = buildFallbackPreview({ category: 'music', ext: '.mp3' });
    globalPlayerTitleEl.disabled = true;
    return;
  }

  globalPlayerTitleEl.disabled = false;
  globalPlayerTitleEl.textContent = getTrackTitle(track);
  globalPlayerSubtitleEl.textContent = `${getTrackAlbum(track)} • ${formatSize(track.size || 0)}`;
  globalPlayerArtEl.src = resolvePreviewUrl(track);
};

const refreshMusicAccentForTrack = async (track) => {
  if (!track) {
    return;
  }
  const accent = await extractAccentFromImage(resolvePreviewUrl(track));
  if (!accent) {
    return;
  }
  applyMusicAccent(accent);
  state.musicVisualizer?.setAccent(accent);
};

const updateMusicTrackProgressUI = () => {
  const ui = state.musicPlayerUi;
  if (!ui) {
    return;
  }

  const duration = Number.isFinite(globalAudioEl.duration) ? globalAudioEl.duration : 0;
  const currentTime = Number.isFinite(globalAudioEl.currentTime) ? globalAudioEl.currentTime : 0;
  const ratio = duration > 0 ? Math.min(1, Math.max(0, currentTime / duration)) : 0;

  ui.progress.value = String(Math.round(ratio * 1000));
  ui.progressCurrent.textContent = formatPlaybackTime(currentTime);
  ui.progressDuration.textContent = duration > 0 ? formatPlaybackTime(duration) : '0:00';
};

const bindMusicTrackPageControls = (track) => {
  const prevBtn = document.getElementById('trackPrevBtn');
  const playBtn = document.getElementById('trackPlayPauseBtn');
  const nextBtn = document.getElementById('trackNextBtn');
  const shuffleBtn = document.getElementById('trackShuffleBtn');
  const visualModeBtn = document.getElementById('visualModeBtn');
  const settingsBtn = document.getElementById('trackSettingsBtn');
  const titleTrigger = document.getElementById('musicTrackTitleTrigger');
  const progress = document.getElementById('trackProgress');
  const progressCurrent = document.getElementById('trackCurrentTime');
  const progressDuration = document.getElementById('trackDuration');
  const canvas = document.getElementById('trackVisualizer');

  if (!prevBtn || !playBtn || !nextBtn || !shuffleBtn || !progress || !progressCurrent || !progressDuration || !canvas) {
    return;
  }

  state.musicPlayerUi = {
    trackId: track?.id || null,
    prevBtn,
    playBtn,
    nextBtn,
    shuffleBtn,
    progress,
    progressCurrent,
    progressDuration,
    canvas,
    titleTrigger,
  };

  prevBtn.addEventListener('click', playPreviousTrack);
  playBtn.addEventListener('click', () => {
    toggleGlobalPlayPause();
  });
  nextBtn.addEventListener('click', playNextTrack);
  shuffleBtn.addEventListener('click', () => {
    state.isShuffle = !state.isShuffle;
    updateShuffleButton();
  });

  visualModeBtn?.addEventListener('click', () => {
    const nextMode = state.musicUiMode === 'visualizer-only' ? 'default' : 'visualizer-only';
    toggleUIMode(nextMode);
  });

  settingsBtn?.addEventListener('click', openTrackSettingsOverlay);
  titleTrigger?.addEventListener('click', openTrackSettingsOverlay);

  canvas.addEventListener('dblclick', () => {
    const nextMode = state.musicUiMode === 'visualizer-only' ? 'default' : 'visualizer-only';
    toggleUIMode(nextMode);
  });

  progress.addEventListener('input', (event) => {
    const value = Number(event.target.value || 0) / 1000;
    if (Number.isFinite(globalAudioEl.duration) && globalAudioEl.duration > 0) {
      globalAudioEl.currentTime = value * globalAudioEl.duration;
      updateMusicTrackProgressUI();
    }
  });

  const analyser = ensureAudioPipeline(globalAudioEl);
  const visualizer = new VisualizerManager({
    canvas,
    analyser,
    intensity: state.intensity,
    sensitivity: state.sensitivity,
    preset: state.visualPreset,
    accent: state.albumAccent,
  });
  visualizer.setEnabled(state.visualEnabled);
  visualizer.start();
  state.musicVisualizer = visualizer;

  if (track) {
    refreshMusicAccentForTrack(track);
  }

  toggleUIMode(state.musicUiMode);
  applyMusicPageFlags();

  updateMusicTrackProgressUI();
  updatePlayPauseButton();
  updateShuffleButton();
};

const renderMusicNowPlayingPanel = (track, options = {}) => {
  const unsupported = Boolean(options.unsupported);
  const artwork = resolvePreviewUrl(track || { category: 'music', ext: '.mp3' });
  const title = track ? getTrackTitle(track) : 'Select a track';
  const subtitle = track ? `${getTrackAlbum(track)} • ${formatSize(track.size || 0)}` : 'Open Music and tap any track to start playback';
  const lyrics = track
    ? `♪ ${escapeHtml(getTrackTitle(track))}\n\nNo synced lyrics yet. Use the overlay to switch between Visualizer / Lyrics / Info modes while playback continues.`
    : 'Pick a track to start your Visuals First session.';

  clearVisualizer();

  playerAreaEl.innerHTML = `
    <article class="music-track-page">
      <canvas id="trackVisualizer" class="music-track-canvas" aria-hidden="true"></canvas>
      <div class="music-track-glass"></div>
      <div class="music-track-hud">
        <button id="visualModeBtn" type="button" class="hud-btn" aria-label="Toggle pure visual mode">✦</button>
        <button id="trackSettingsBtn" type="button" class="hud-btn" aria-label="Open track settings">⚙</button>
      </div>
      <div class="music-track-content">
        <div class="music-track-art-wrap">
          <img class="music-track-art" src="${artwork}" alt="${escapeHtml(title)} artwork" loading="lazy" />
        </div>
        <button id="musicTrackTitleTrigger" type="button" class="music-track-title track-settings-trigger">${escapeHtml(title)}</button>
        <p class="music-track-subtitle">${escapeHtml(subtitle)}</p>
        <pre class="music-track-lyrics">${lyrics}</pre>
        <div class="music-track-info">
          <div class="info-chip"><strong>Preset</strong><br />${escapeHtml(state.visualPreset)}</div>
          <div class="info-chip"><strong>Container</strong><br />${escapeHtml((track?.ext || '.music').replace('.', '').toUpperCase())}</div>
          <div class="info-chip"><strong>Path</strong><br />${escapeHtml(track ? getTrackPathHint(track) : '—')}</div>
        </div>
      </div>
      <div class="music-track-controls">
        <div class="music-track-buttons">
          <button id="trackPrevBtn" type="button" class="player-control" aria-label="Previous track">⏮</button>
          <button id="trackPlayPauseBtn" type="button" class="player-control player-control-primary" aria-label="Play or pause">▶</button>
          <button id="trackNextBtn" type="button" class="player-control" aria-label="Next track">⏭</button>
          <button id="trackShuffleBtn" type="button" class="player-shuffle" aria-label="Shuffle queue">Shuffle Off</button>
        </div>
        <div class="music-track-progress-row">
          <span id="trackCurrentTime">0:00</span>
          <input id="trackProgress" type="range" min="0" max="1000" step="1" value="0" aria-label="Track progress" />
          <span id="trackDuration">0:00</span>
        </div>
      </div>
      ${unsupported ? `<div class="music-track-warning">This browser may not support this audio format. Use direct open/download fallback. <a class="fallback-link" href="${track.url}" target="_blank" rel="noopener noreferrer">Open file directly</a></div>` : ''}
    </article>
  `;

  bindMusicTrackPageControls(track);
  applyMusicPageFlags();
};

const getAdjacentTrackIndex = (direction) => {
  const total = state.musicQueue.length;
  if (!total) {
    return -1;
  }

  if (state.isShuffle && total > 1) {
    let idx = state.currentTrackIndex;
    while (idx === state.currentTrackIndex) {
      idx = Math.floor(Math.random() * total);
    }
    return idx;
  }

  if (state.currentTrackIndex < 0) {
    return 0;
  }

  return (state.currentTrackIndex + direction + total) % total;
};

const playMusicQueueIndex = async (index) => {
  if (index < 0 || index >= state.musicQueue.length) {
    return;
  }

  const track = state.musicQueue[index];
  const supported = canPlayMedia(track);
  state.currentTrackIndex = index;
  state.currentTrackId = track.id;
  updateGlobalPlayerInfo(track);
  if (state.activeType === 'music') {
    renderMusicNowPlayingPanel(track, { unsupported: !supported });
    renderGrid();
  }

  if (!supported) {
    globalAudioEl.pause();
    return;
  }

  const absoluteTrackUrl = new URL(track.url, window.location.href).href;
  if (globalAudioEl.src !== absoluteTrackUrl) {
    globalAudioEl.src = track.url;
  }

  try {
    await globalAudioEl.play();
  } catch (_error) {
    // Some browsers block autoplay without direct user interaction.
  }
};

const playMusicItem = async (item) => {
  if (!state.musicQueue.length) {
    syncMusicQueue();
  }

  let idx = state.musicQueue.findIndex((track) => track.id === item.id);
  if (idx === -1) {
    state.musicQueue = [item];
    idx = 0;
  }

  await playMusicQueueIndex(idx);
};

const playPreviousTrack = () => {
  if (!state.musicQueue.length) {
    return;
  }

  if (!state.isShuffle && globalAudioEl.currentTime > 4 && state.currentTrackIndex >= 0) {
    globalAudioEl.currentTime = 0;
    return;
  }

  const prevIndex = getAdjacentTrackIndex(-1);
  playMusicQueueIndex(prevIndex);
};

const playNextTrack = () => {
  const nextIndex = getAdjacentTrackIndex(1);
  playMusicQueueIndex(nextIndex);
};

const toggleGlobalPlayPause = async () => {
  if (!state.musicQueue.length && state.activeType === 'music' && state.items.length) {
    syncMusicQueue();
  }

  if (!state.musicQueue.length) {
    return;
  }

  if (globalAudioEl.paused) {
    if (state.currentTrackIndex < 0) {
      await playMusicQueueIndex(0);
      return;
    }

    try {
      await globalAudioEl.play();
    } catch (_error) {
      // Browser autoplay restrictions are expected in some contexts.
    }
    return;
  }

  globalAudioEl.pause();
};

const playItem = async (item) => {
  clearVisualizer();
  await playMusicItem(item);
};

const renderMusicGrid = () => {
  gridEl.classList.add('music-grid');

  const albumsMap = new Map();
  for (const track of state.items) {
    const albumPath = track.albumPath || getTrackPathHint(track);
    const albumName = getTrackAlbum(track);
    if (!albumsMap.has(albumPath)) {
      albumsMap.set(albumPath, {
        albumPath,
        albumName,
        coverUrl: track.previewUrl || resolvePreviewUrl(track),
        hasRealCover: Boolean(track.previewUrl),
        tracks: [],
      });
    }

    const album = albumsMap.get(albumPath);
    if (track.previewUrl && !album.hasRealCover) {
      album.coverUrl = track.previewUrl;
      album.hasRealCover = true;
    }
    album.tracks.push(track);
  }

  const albums = Array.from(albumsMap.values()).sort((a, b) => a.albumName.localeCompare(b.albumName));

  gridEl.innerHTML = albums
    .map(
      (album) => `
      <article class="album-card">
        <div class="album-top">
          <div class="album-cover">
            <img src="${album.coverUrl}" alt="${escapeHtml(album.albumName)} album cover" loading="lazy" />
          </div>
          <div>
            <h4 class="album-title">${escapeHtml(album.albumName)}</h4>
            <p class="album-subtitle">${album.tracks.length} songs</p>
          </div>
        </div>
        <div class="album-tracks">
          ${album.tracks
            .map(
              (track) => `
            <div class="track-row${track.id === state.currentTrackId ? ' active' : ''}" data-id="${track.id}">
              <button type="button" class="track-play" aria-label="Play ${escapeHtml(getTrackTitle(track))}">▶</button>
              <div class="track-thumb">
                <img src="${resolvePreviewUrl(track)}" alt="${escapeHtml(getTrackTitle(track))} artwork" loading="lazy" />
              </div>
              <div class="track-title-wrap">
                <div class="track-title">${escapeHtml(getTrackTitle(track))}</div>
                <div class="track-path">${escapeHtml(getTrackPathHint(track))}</div>
              </div>
              <div class="track-size">${formatSize(track.size)}</div>
            </div>
          `,
            )
            .join('')}
        </div>
      </article>
    `,
    )
    .join('');

  gridEl.querySelectorAll('.track-row').forEach((rowEl) => {
    rowEl.addEventListener('click', () => {
      const selected = state.items.find((item) => item.id === rowEl.dataset.id);
      if (selected) {
        playItem(selected);
      }
    });
  });

  gridEl.querySelectorAll('.track-play').forEach((buttonEl) => {
    buttonEl.addEventListener('click', (event) => {
      event.stopPropagation();
      const rowEl = event.currentTarget.closest('.track-row');
      if (!rowEl) {
        return;
      }
      const selected = state.items.find((item) => item.id === rowEl.dataset.id);
      if (selected) {
        playItem(selected);
      }
    });
  });
};

const renderGrid = () => {
  if (!state.items.length) {
    gridEl.classList.remove('music-grid');
    gridEl.innerHTML = `
      <article class="card">
        <div class="card-body">
          <div class="card-title">Your music library is empty</div>
          <div class="meta">Add songs into <code>media/music</code> (folders become albums) and they appear here.</div>
        </div>
      </article>
    `;
    return;
  }

  renderMusicGrid();
};

const loadCategory = async (type) => {
  state.activeType = type;
  setSectionMode(type);

  if (sectionTitleEl) {
    sectionTitleEl.textContent = 'Music: Energy & Motion';
  }

  let loaded = true;

  try {
    const response = await fetch(`/api/library?type=${type}`, { cache: 'no-store' });
    if (!response.ok) {
      throw new Error('Unable to load this library section right now.');
    }
    const data = await response.json();
    state.items = data.items || [];
    if (type === 'music') {
      syncMusicQueue();
      const currentTrack = state.musicQueue.find((track) => track.id === state.currentTrackId);
      if (currentTrack) {
        renderMusicNowPlayingPanel(currentTrack);
      } else {
        renderMusicNowPlayingPanel(null);
      }
    } else {
      clearVisualizer();
      state.musicPlayerUi = null;
      closeTrackSettingsOverlay();
      playerAreaEl.innerHTML = '';
    }
  } catch (_error) {
    loaded = false;
    state.items = [];
    playerAreaEl.innerHTML = `
      <article class="player-card">
        <h3>${escapeHtml(CATEGORY_TITLES[type] || 'Library')}</h3>
        <p class="meta">Unable to load files right now. Please check server status and try again.</p>
      </article>
    `;
  }

  tabsEl.querySelectorAll('.tab').forEach((tab) => {
    tab.classList.toggle('active', tab.dataset.type === type);
  });

  renderGrid();
  return loaded;
};

tabsEl.addEventListener('click', (event) => {
  const btn = event.target.closest('.tab');
  if (!btn) {
    return;
  }
  loadCategory(btn.dataset.type);
});

themeSelectEl.addEventListener('change', (event) => {
  applyTheme(event.target.value);
});

prevBtnEl.addEventListener('click', playPreviousTrack);
nextBtnEl.addEventListener('click', playNextTrack);
globalPlayerTitleEl.addEventListener('click', openTrackSettingsOverlay);
playPauseBtnEl.addEventListener('click', () => {
  toggleGlobalPlayPause();
});

shuffleBtnEl.addEventListener('click', () => {
  state.isShuffle = !state.isShuffle;
  updateShuffleButton();
});

globalAudioEl.addEventListener('play', () => {
  updatePlayPauseButton();
  updateMusicTrackProgressUI();
});

globalAudioEl.addEventListener('pause', () => {
  updatePlayPauseButton();
  updateMusicTrackProgressUI();
});

globalAudioEl.addEventListener('timeupdate', () => {
  updateMusicTrackProgressUI();
});

globalAudioEl.addEventListener('loadedmetadata', () => {
  updateMusicTrackProgressUI();
});

globalAudioEl.addEventListener('ended', () => {
  playNextTrack();
});

uploadFormEl.addEventListener('submit', async (event) => {
  event.preventDefault();

  const file = fileInputEl.files?.[0];
  if (!file) {
    return;
  }

  const formData = new FormData();
  formData.append('file', file);

  try {
    const response = await fetch('/api/upload/music', {
      method: 'POST',
      body: formData,
    });
    const payload = await response.json().catch(() => ({}));

    if (!response.ok) {
      throw new Error(payload.error || 'Upload failed.');
    }

    fileInputEl.value = '';
    const loaded = await loadCategory('music');

    if (loaded) {
      playerAreaEl.innerHTML = `
        <article class="player-card">
          <h3>${escapeHtml(payload.item?.name || file.name)}</h3>
          <p class="meta">Track uploaded successfully.</p>
        </article>
      `;
    }
  } catch (error) {
    playerAreaEl.innerHTML = `
      <article class="player-card">
        <h3>Upload failed</h3>
        <p class="meta">${escapeHtml(error.message || 'Upload failed.')}</p>
      </article>
    `;
  }
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    closeTrackSettingsOverlay();
  }
});

initTheme();
bindTrackSettingsOverlay();
syncTrackSettingsUi();
updateGlobalPlayerInfo(null);
updatePlayPauseButton();
updateShuffleButton();
loadCategory('music');
