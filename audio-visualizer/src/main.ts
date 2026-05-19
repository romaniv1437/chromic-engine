import { ThreeOrchestrator } from './core/ThreeOrchestrator';

// Standalone dev mode: create an audio element for testing
const audio = document.querySelector('audio') || document.createElement('audio');
if (!audio.parentElement) {
  audio.controls = true;
  audio.style.position = 'fixed';
  audio.style.bottom = '10px';
  audio.style.left = '50%';
  audio.style.transform = 'translateX(-50%)';
  audio.style.zIndex = '100';
  document.body.appendChild(audio);
}

const container = document.getElementById('visualizer-container') || document.body;

let orchestrator: ThreeOrchestrator | null = null;

function init() {
  if (orchestrator) return;
  // In standalone dev mode, create an audio context + analyser for testing
  const ctx = new AudioContext();
  const source = ctx.createMediaElementSource(audio);
  const analyser = ctx.createAnalyser();
  analyser.fftSize = 2048;
  source.connect(analyser);
  analyser.connect(ctx.destination);

  orchestrator = new ThreeOrchestrator({
    analyser,
    container,
    resolutionScale: 1,
  });
  orchestrator.start();
  orchestrator.setUiVisible(true); // Start in info/blurred mode

  // Expose for MusicPlayer bridge
  (window as any).mathVisualizer = {
    setTrack: (title: string, artist: string) => orchestrator!.setTrack(title, artist),
    setPalette: (colors: [string, string, string]) => orchestrator!.setPalette(colors),
    setScene: (idx: number) => orchestrator!.setScene(idx),
    setUiVisible: (v: boolean) => orchestrator!.setUiVisible(v),
    setBlur: (v: boolean) => orchestrator!.setBlur(v),
    setDim: (v: boolean, opacity?: number) => orchestrator!.setDim(v, opacity),
    setBlurDim: (v: boolean) => orchestrator!.setBlurDim(v),
    setAlbumArt: (url: string) => orchestrator!.setAlbumArt(url),
  };
}

// Scene switching buttons
document.querySelectorAll('[data-scene]').forEach(btn => {
  btn.addEventListener('click', () => {
    if (!orchestrator) init();
    const idx = Number((btn as HTMLElement).dataset.scene);
    orchestrator!.setScene(idx);
    document.querySelectorAll('[data-scene]').forEach(b => {
      b.classList.toggle('active', Number((b as HTMLElement).dataset.scene) === idx);
    });
  });
});

// Drag & drop audio file
document.addEventListener('dragover', e => e.preventDefault());
document.addEventListener('drop', e => {
  e.preventDefault();
  const file = e.dataTransfer?.files[0];
  if (file && file.type.startsWith('audio/')) {
    audio.src = URL.createObjectURL(file);
    audio.play();
    if (!orchestrator) init();
  }
});

// Click anywhere to init (needed for AudioContext)
document.addEventListener('click', () => {
  if (!orchestrator && audio.src) init();
}, { once: true });

// Zen mode: hide UI after 3s inactivity
let zenTimeout: number;
const setZen = (active: boolean) => orchestrator?.setZenMode(active);
document.addEventListener('mousemove', () => {
  setZen(true); // UI active
  clearTimeout(zenTimeout);
  zenTimeout = window.setTimeout(() => setZen(false), 3000);
});
