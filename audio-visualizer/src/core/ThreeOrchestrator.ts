import * as THREE from 'three';
import { AudioProcessor } from '../audio/AudioProcessor';
import { PostProcessing } from './PostProcessing';
import { GpuTypography } from './GpuTypography';
import { LyricsRenderer, LyricsLine } from './LyricsRenderer';
import { BaseScene } from '../scenes/BaseScene';
import { JuliaSetScene } from '../scenes/JuliaSetScene';
import { LorenzScene } from '../scenes/LorenzScene';
import { RiemannScene } from '../scenes/RiemannScene';
import { ReactionDiffusionScene } from '../scenes/ReactionDiffusionScene';
import { HyperbolicScene } from '../scenes/HyperbolicScene';
import { LavaFlowScene } from '../scenes/LavaFlowScene';
import { LivingCanvasScene } from '../scenes/LivingCanvasScene';
import { FractalInfinityScene } from '../scenes/FractalInfinityScene';
import { TerrainBiomeScene } from '../scenes/TerrainBiomeScene';
import { BiopunkOceanScene } from '../scenes/BiopunkOceanScene';
import { VoidArchipelagoScene } from '../scenes/VoidArchipelagoScene';
import { SaturnDiscsScene } from '../scenes/SaturnDiscsScene';
import { SoapBubbleScene } from '../scenes/SoapBubbleScene';
import { FractalUnfoldScene } from '../scenes/FractalUnfoldScene';
import { InfiniteCavernScene } from '../scenes/InfiniteCavernScene';
import { SpongyTunnelScene } from '../scenes/SpongyTunnelScene';
import { FractalOpticFibreScene } from '../scenes/FractalOpticFibreScene';
import { MoodFractalScene } from '../scenes/MoodFractalScene';
import { AethelgardScene } from '../scenes/AethelgardScene';
import { ChromicBirefringenceScene } from '../scenes/ChromicBirefringenceScene';
import { QuantumEntropyScene } from '../scenes/QuantumEntropyScene';
import { ChromicGlitchVortexScene } from '../scenes/ChromicGlitchVortexScene';
import { ObsidianVoidTunnelScene } from '../scenes/ObsidianVoidTunnelScene';
import { CrystallineDriftScene } from '../scenes/CrystallineDriftScene';
import { BiomeWarpScene } from '../scenes/BiomeWarpScene';
import { KineticRibbonSystem } from './KineticRibbonSystem';
import { AudioData } from '../audio/AudioProcessor';

export interface OrchestratorOptions {
  /** The existing AnalyserNode from AudioEngine */
  analyser: AnalyserNode;
  /** Container to inject the overlay canvas into */
  container: HTMLElement;
  /** Initial resolution scale (0.5 - 2.0) */
  resolutionScale?: number;
}

export class ThreeOrchestrator {
  private renderer: THREE.WebGLRenderer;
  private audioProcessor: AudioProcessor;
  private postProcessing!: PostProcessing;
  private scenes: (BaseScene | null)[] = [];
  private sceneFactories: (() => BaseScene)[] = [];
  private currentIdx = 0;
  private current!: BaseScene;
  private running = false;
  private frameId = 0;
  private container: HTMLElement;
  private resolutionScale: number;
  private overlayOpacity = 1;
  private zenFadeTarget = 1;
  private zenFadeCurrent = 1;
  private gpuTypography: GpuTypography;
  private lyricsRenderer: LyricsRenderer;
  private gpuTextEnabled = true;
  private uiVisible = false;
  private _currentPalette: [THREE.Color, THREE.Color, THREE.Color] | null = null;
  private kineticRibbons: KineticRibbonSystem;
  private maxFps = 0; // 0 = unlimited
  private lastFrameTime = 0;
  private _scrollPaused = false;
  private _loopDbg = 0;
  // Time dilation for cinematic engine start
  private timeScale = 1;
  private timeScaleTarget = 1;
  private timeScaleLerpSpeed = 0.005; // per-ms lerp rate
  private dilatedTime = 0;
  private lastRealTime = 0;

  constructor(options: OrchestratorOptions) {
    this.container = options.container;
    this.resolutionScale = options.resolutionScale ?? 1;

    // Transparent renderer with shader error logging
    this.renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: false, // Use SMAA-like post instead for M1 optimization
      powerPreference: 'high-performance',
      preserveDrawingBuffer: true, // Needed for debug readPixels
    });
    this.renderer.debug.checkShaderErrors = true;
    this.renderer.setClearColor(0x000000, 0);
    this.renderer.setPixelRatio(window.devicePixelRatio * this.resolutionScale);

    // DOM placement: canvas fills the container via CSS
    const canvas = this.renderer.domElement;
    canvas.style.position = 'absolute';
    canvas.style.inset = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '0';
    this.container.appendChild(canvas);

    // Set renderer size to match container (use actual dimensions or fallback)
    const initW = this.container.clientWidth || window.innerWidth;
    const initH = this.container.clientHeight || window.innerHeight;
    this.renderer.setSize(initW, initH, false);

    // Audio processor: hooks into existing analyser from AudioEngine
    this.audioProcessor = new AudioProcessor(options.analyser);

    // Lazy scene factories — scenes are only created when first accessed
    this.sceneFactories = [
      () => new LavaFlowScene(),
      () => new JuliaSetScene(),
      () => new LorenzScene(this.renderer),
      () => new RiemannScene(),
      () => new ReactionDiffusionScene(this.renderer),
      () => new HyperbolicScene(),
      () => new LivingCanvasScene(this.renderer),
      () => new FractalInfinityScene(),
      () => new TerrainBiomeScene(),
      () => new BiopunkOceanScene(),
      () => new VoidArchipelagoScene(),
      () => new SaturnDiscsScene(),
      () => new SoapBubbleScene(),
      () => new FractalUnfoldScene(),
      () => new InfiniteCavernScene(),
      () => new SpongyTunnelScene(),
      () => new FractalOpticFibreScene(),
      () => new MoodFractalScene(),
      () => new AethelgardScene(),
      () => new ChromicBirefringenceScene(),
      () => new QuantumEntropyScene(),
      () => new ChromicGlitchVortexScene(),
      () => new ObsidianVoidTunnelScene(),
      () => new CrystallineDriftScene(),
      () => new BiomeWarpScene(),
    ];
    this.scenes = new Array(this.sceneFactories.length).fill(null);

    // Only instantiate the initial scene
    this.current = this.getOrCreateScene(0);

    // Post-processing
    this.postProcessing = new PostProcessing(this.renderer, this.current.scene, this.current.camera);

    // GPU Typography (rendered on layer 1 - after blur pass stays sharp)
    this.gpuTypography = new GpuTypography(this.current.camera);
    this.gpuTypography.addToScene(this.current.scene);
    this.gpuTypography.setVisible(false); // Hidden by default — DOM shows track info

    // GPU Lyrics Renderer (layer 1 - karaoke-style word fill)
    this.lyricsRenderer = new LyricsRenderer();
    this.lyricsRenderer.addToScene(this.current.scene);
    this.lyricsRenderer.setVisible(true); // GPU lyrics enabled — gpu-panel styles
    this.lyricsRenderer.setAspect(initW, initH);

    // Wire lyrics scroll (wheel) and click-to-seek
    this.container.addEventListener('wheel', (e: WheelEvent) => {
      // Only handle if click is on right half (text area)
      const rect = this.container.getBoundingClientRect();
      const ndcX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      if (ndcX > -0.1) { // Right half = text area
        e.preventDefault();
        this.lyricsRenderer.handleWheel(e.deltaY);
      }
    }, { passive: false });

    this.container.addEventListener('click', (e: MouseEvent) => {
      const rect = this.container.getBoundingClientRect();
      const ndcX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const ndcY = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      console.log(`[Orchestrator] click event: ndcX=${ndcX.toFixed(2)} ndcY=${ndcY.toFixed(2)} target=${(e.target as HTMLElement)?.tagName}`);
      if (e.shiftKey) {
        // Shift+Click = debug pixel inspector (reads actual rendered color)
        this.lyricsRenderer.debugInspectClick(ndcX, ndcY, this.renderer, e.clientX, e.clientY);
      } else {
        this.lyricsRenderer.handleClick(ndcX, ndcY);
      }
    });

    // Set up seek callback
    this.lyricsRenderer.onSeek((time: number) => {
      console.log(`[Orchestrator] seek → ${time.toFixed(3)}s`);
      // Dispatch a custom event that MusicPlayer can listen for
      document.dispatchEvent(new CustomEvent('visualizer-seek', { detail: { time } }));
      // Also directly seek the audio element if accessible
      const audio = (window as any).musicRuntime?.audioEngine?.audioElement
        || document.querySelector('audio')
        || document.getElementById('globalAudio') as HTMLAudioElement | null;
      if (audio && typeof audio.currentTime === 'number') {
        audio.currentTime = time;
      }
    });

    // Kinetic Ribbon System (200 flowing instanced ribbons)
    this.kineticRibbons = new KineticRibbonSystem();
    this.kineticRibbons.addToScene(this.current.scene);

    // Enable layer 1 on current scene camera
    this.current.camera.layers.enable(1);

    if((globalThis as any).__DEBUG__)console.log(`[Visualizer] Initialized with ${this.sceneFactories.length} scenes (lazy)`);
    if((globalThis as any).__DEBUG__)console.log(`[Visualizer] Scenes: Lava, Julia, Lorenz, Riemann, ReactionDiffusion, Hyperbolic, LivingCanvas, FractalInfinity`);

    // Expose lyrics debug tools on globalThis for console access
    (globalThis as any).__lyricsDebug = (on = true) => { this.lyricsRenderer.setDebug(on); };
    (globalThis as any).__lyricsRenderer = this.lyricsRenderer;

    // Listen for uiToggle custom event
    document.addEventListener('uiToggle', ((e: CustomEvent) => {
      this.setUiVisible(e.detail?.visible ?? false);
    }) as EventListener);

    // Resize handling
    const ro = new ResizeObserver(() => this.handleResize());
    ro.observe(this.container);

    // Scroll-aware GPU throttle: pause rendering during scroll to prevent thermal throttling
    let scrollThrottleTimer = 0;
    let isScrollBlurred = false;
    const vizCanvas = this.renderer.domElement;
    const onScroll = () => {
      if (!isScrollBlurred && this.running) {
        isScrollBlurred = true;
        this._scrollPaused = true;
        vizCanvas.style.transition = 'none';
        vizCanvas.style.filter = 'blur(8px) saturate(1.3)';
      }
      clearTimeout(scrollThrottleTimer);
      scrollThrottleTimer = window.setTimeout(() => {
        if (isScrollBlurred) {
          isScrollBlurred = false;
          this._scrollPaused = false;
          vizCanvas.style.transition = 'filter 0.3s ease-out';
          vizCanvas.style.filter = '';
          setTimeout(() => { vizCanvas.style.transition = ''; }, 350);
        }
      }, 200) as unknown as number;
    };
    document.addEventListener('scroll', onScroll, { capture: true, passive: true });

    // Keyboard shortcuts (1-8 scenes, Z for zen)
    document.addEventListener('keydown', (e) => {
      // Don't intercept keys when user is typing in an editable element
      const target = e.target as HTMLElement;
      if (target?.isContentEditable || target?.tagName === 'INPUT' || target?.tagName === 'TEXTAREA') return;

      const n = Number(e.key);
      if (n >= 1 && n <= 9) this.setScene(n - 1);
      if (e.key === '0') this.setScene(9);
      if (e.key.toLowerCase() === 'z') {
        this.uiVisible = !this.uiVisible;
        this.setUiVisible(this.uiVisible);
      }
    });
  }

  private getOrCreateScene(idx: number): BaseScene {
    if (this.scenes[idx]) return this.scenes[idx]!;
    const scene = this.sceneFactories[idx]();
    scene.camera.layers.enable(1);
    this.scenes[idx] = scene;
    // Apply stored palette to newly created scene
    if (this._currentPalette && typeof (scene as any).setPalette === 'function') {
      (scene as any).setPalette(this._currentPalette);
    }
    return scene;
  }

  setScene(idx: number) {
    if (idx < 0 || idx >= this.sceneFactories.length) return;
    if (idx === this.currentIdx && this.scenes[idx]) return;
    if((globalThis as any).__DEBUG__)console.log(`[Visualizer] Switching scene: ${this.currentIdx} → ${idx}`);
    this.gpuTypography.removeFromScene(this.current.scene);
    this.lyricsRenderer.removeFromScene(this.current.scene);
    this.kineticRibbons.removeFromScene(this.current.scene);
    this.currentIdx = idx;
    this.current = this.getOrCreateScene(idx);
    // Re-apply stored palette to the newly active scene
    if (this._currentPalette && typeof (this.current as any).setPalette === 'function') {
      (this.current as any).setPalette(this._currentPalette);
    }
    this.postProcessing.updateScene(this.current.scene, this.current.camera);
    this.gpuTypography.addToScene(this.current.scene);
    this.lyricsRenderer.addToScene(this.current.scene);
    // Only add ribbons to fullscreen shader scenes (ortho camera), not 3D geometry scenes
    if (this.current.camera instanceof THREE.OrthographicCamera) {
      this.kineticRibbons.addToScene(this.current.scene);
    }
    // Trigger resize for the new scene to get correct resolution
    this.handleResize();
  }

  setResolutionScale(scale: number) {
    this.resolutionScale = Math.max(0.1, Math.min(2, scale));
    this.renderer.setPixelRatio(window.devicePixelRatio * this.resolutionScale);
    // Only resize renderer + current scene (not all 17 scenes)
    const w = this.container.clientWidth || window.innerWidth;
    const h = this.container.clientHeight || window.innerHeight;
    if (w === 0 || h === 0) return;
    this.renderer.setSize(w, h, false);
    this.postProcessing.setSize(w, h);
    const effectiveDpr = window.devicePixelRatio * this.resolutionScale;
    this.current.resize(w, h, effectiveDpr);
  }

  /** Set maximum FPS (0 = unlimited / screen refresh rate) */
  setMaxFps(fps: number) {
    this.maxFps = Math.max(0, Math.round(fps));
  }

  /** 
   * Cinematic time dilation — slow/speed shader animation smoothly.
   * @param scale Target timeScale (0.05 = near-frozen, 1.0 = normal)
   * @param duration Lerp duration in ms (controls how fast we reach target)
   */
  setTimeScale(scale: number, duration = 600) {
    this.timeScaleTarget = Math.max(0, Math.min(3, scale));
    // Convert duration to per-frame lerp speed (assuming ~60fps, 16ms frames)
    // We want ~95% convergence in `duration` ms → solve: (1-k)^(duration/16) = 0.05
    this.timeScaleLerpSpeed = 1 - Math.pow(0.05, 16 / duration);
  }

  /** Zen mode: fade overlay when UI active */
  setZenMode(uiActive: boolean) {
    this.zenFadeTarget = uiActive ? 0.15 : 1;
  }

  /** Show/hide GPU text and blur background */
  setUiVisible(visible: boolean) {
    this.uiVisible = visible;
    this.gpuTypography.setVisible(visible);
    this.lyricsRenderer.setVisible(visible);
    this.lyricsRenderer.setControlsVisible(visible);
    this.postProcessing.setUiVisibility(visible);
  }

  /** Set track info for GPU text */
  setTrack(title: string, artist: string) {
    if((globalThis as any).__DEBUG__)console.log(`[Visualizer] setTrack: "${title}" - "${artist}"`);
    this.gpuTypography.setTrack(title, artist);
    // Auto-reset to Lava scene (blurred info view) on track change
    this.setScene(0);
    this.setUiVisible(true);
  }

  /** Set color palette for all palette-aware scenes */
  setPalette(colors: [string, string, string]) {
    const threeColors = colors.map(c => new THREE.Color(c)) as [THREE.Color, THREE.Color, THREE.Color];
    this._currentPalette = threeColors;
    // Only update the currently active scene — others get palette on lazy init via getOrCreateScene
    const current = this.scenes[this.currentIdx];
    if (current && typeof (current as any).setPalette === 'function') {
      (current as any).setPalette(threeColors);
    }
    // Update ribbon accent to match palette highlight
    this.kineticRibbons.setAccentColor(threeColors[2]);
    // Update lyrics renderer accent color for artist name
    this.lyricsRenderer.setAccentColor(threeColors[0]);
  }

  /** Set album art for Living Canvas scene */
  setAlbumArt(imageUrl: string) {
    if((globalThis as any).__DEBUG__)console.log(`[Visualizer] setAlbumArt:`, imageUrl);
    const canvas = this.scenes[6];
    if (canvas instanceof LivingCanvasScene) {
      canvas.setAlbumArt(imageUrl);
    }
  }

  /** Set lyrics timeline for GPU karaoke rendering */
  setLyricsTimeline(timeline: LyricsLine[], artist?: string, album?: string) {
    this.lyricsRenderer.setTimeline(timeline, artist, album);
    this.gpuTypography.setVisible(false);
    this.lyricsRenderer.setVisible(true);
  }

  /** Update audio clock for lyrics sync (call from main thread on timeupdate) */
  setCurrentTime(time: number) {
    this.lyricsRenderer.setCurrentTime(time);
  }

  start() {
    if (this.running) return;
    this.running = true;
    this.lastRealTime = performance.now() * 0.001;
    // Reset dilated time after long idle to prevent GPU float precision issues
    if (this.dilatedTime > 3600) this.dilatedTime = 0;
    // Ensure correct size on first frame
    requestAnimationFrame(() => this.handleResize());
    this.loop();
  }

  /** Render a single frame immediately (synchronous). Use before FLIP to seed canvas. */
  renderFrame() {
    const realTime = performance.now() * 0.001;
    if (this.lastRealTime === 0) this.lastRealTime = realTime;
    const realDelta = Math.min(realTime - this.lastRealTime, 0.1) || 0.016;
    this.lastRealTime = realTime;
    this.timeScale += (this.timeScaleTarget - this.timeScale) * this.timeScaleLerpSpeed;
    this.dilatedTime += realDelta * this.timeScale;
    if (this.dilatedTime > 10000) this.dilatedTime -= 10000;
    const audio = this.audioProcessor.update();
    this.zenFadeCurrent += (this.zenFadeTarget - this.zenFadeCurrent) * 0.05;
    this.renderer.domElement.style.opacity = String(this.zenFadeCurrent);
    this.current.update(audio, this.dilatedTime);
    this.gpuTypography.update(audio.rms);
    // Feed audio time directly from audio element every frame
    const audioEl = (window as any).musicRuntime?.audioEngine?.audioElement;
    if (audioEl) this.lyricsRenderer.setCurrentTime(audioEl.currentTime);
    this.lyricsRenderer.update(audio.rms);
    this.kineticRibbons.update(audio, this.dilatedTime);
    this.postProcessing.update(audio);
    this.postProcessing.composer.render();
    this.postProcessing.renderText();
  }

  stop() {
    this.running = false;
    cancelAnimationFrame(this.frameId);
  }

  dispose() {
    this.stop();
    this.scenes.forEach(s => s?.dispose());
    this.renderer.dispose();
    this.renderer.domElement.remove();
  }

  private loop = () => {
    if (!this.running) return;
    this.frameId = requestAnimationFrame(this.loop);

    // Skip rendering entirely during scroll to free GPU for compositor
    if (this._scrollPaused) return;

    // FPS throttle
    if (this.maxFps > 0) {
      const now = performance.now();
      const minInterval = 1000 / this.maxFps;
      if (now - this.lastFrameTime < minInterval) return;
      this.lastFrameTime = now;
    }

    const realTime = performance.now() * 0.001;
    const rawDelta = this.lastRealTime > 0 ? Math.min(realTime - this.lastRealTime, 0.1) : 0.016;
    this.lastRealTime = realTime;

    // Smooth lerp timeScale toward target (cinematic engine start)
    this.timeScale += (this.timeScaleTarget - this.timeScale) * this.timeScaleLerpSpeed;

    // During engine ramp (timeScale < 0.9), use fixed delta to prevent jitter from OS scheduling
    const isRamping = Math.abs(this.timeScale - this.timeScaleTarget) > 0.05;
    const realDelta = isRamping ? (1 / 60) : rawDelta;

    // Accumulate dilated time — no jumps when timeScale changes
    this.dilatedTime += realDelta * this.timeScale;
    // Wrap time to prevent GPU float precision degradation after long idle
    // 10000s cycle is imperceptible for sin/cos/noise patterns
    if (this.dilatedTime > 10000) this.dilatedTime -= 10000;

    const audio = this.audioProcessor.update();

    // Zen fade — only touch DOM when value changes
    const prevZen = this.zenFadeCurrent;
    this.zenFadeCurrent += (this.zenFadeTarget - this.zenFadeCurrent) * 0.05;
    if (Math.abs(this.zenFadeCurrent - prevZen) > 0.001) {
      this.renderer.domElement.style.opacity = String(this.zenFadeCurrent);
    }

    this.current.update(audio, this.dilatedTime);
    this.gpuTypography.update(audio.rms);
    // Feed audio time directly from audio element every frame
    const audioEl2 = (window as any).musicRuntime?.audioEngine?.audioElement;
    if (audioEl2) this.lyricsRenderer.setCurrentTime(audioEl2.currentTime);
    this.lyricsRenderer.update(audio.rms);
    this.kineticRibbons.update(audio, this.dilatedTime);
    this.postProcessing.update(audio);
    this.postProcessing.composer.render();
    this.postProcessing.renderText();

    // Debug logging every 300 frames
    if (!this._loopDbg) this._loopDbg = 0;
    this._loopDbg++;
    if (this._loopDbg % 300 === 1 && false) { // DEBUG: set to true to enable verbose frame logging
      const ri = this.renderer.info.render;
      console.log(`[Orchestrator] frame=${this._loopDbg} scene=${this.current.constructor.name} idx=${this.currentIdx} drawCalls=${ri.calls} tris=${ri.triangles} sceneChildren=${this.current.scene.children.length} time=${this.dilatedTime.toFixed(2)}`);
    }

    // Expose metrics for perf profiler (zero-cost when not read)
    if ((globalThis as any).__PERF_MODE__) {
      const w = globalThis as any;
      if (!w._chromicMathVisualizer) w._chromicMathVisualizer = {};
      const m = w._chromicMathVisualizer;
      m.running = this.running;
      m._sceneIdx = this.currentIdx;
      m._sceneName = this.current?.constructor?.name || `Scene ${this.currentIdx}`;
      m._sceneCount = this.sceneFactories.length;
      m._rendererInfo = {
        drawCalls: this.renderer.info.render.calls,
        triangles: this.renderer.info.render.triangles,
      };
      m.setScene = (idx: number) => this.setScene(idx);
    }
  };

  private _resizeDebounce = 0;
  private _savedResScale = 0;

  private handleResize() {
    const w = this.container.clientWidth || window.innerWidth;
    const h = this.container.clientHeight || window.innerHeight;
    if (w === 0 || h === 0) return;

    const canvas = this.renderer.domElement;

    // During active resize: drop to low-res + blur (saves GPU memory)
    if (!this._savedResScale) {
      this._savedResScale = this.resolutionScale;
      this.resolutionScale = 0.25;
      this.renderer.setPixelRatio(window.devicePixelRatio * 0.25);
      canvas.style.transition = 'none';
      canvas.style.filter = 'blur(8px) saturate(1.3)';
      canvas.style.opacity = '1';
    }

    this.renderer.setSize(w, h, false);
    this.renderer.setViewport(0, 0, w, h);
    this.postProcessing.setSize(w, h);
    this.lyricsRenderer.setAspect(w, h);
    const effectiveDpr = window.devicePixelRatio * this.resolutionScale;
    this.current.resize(w, h, effectiveDpr);

    // Render immediately so canvas is never blank during resize
    if (this.running) this.renderFrame();

    // Debounce: after resize stops, restore full res + unblur
    clearTimeout(this._resizeDebounce);
    this._resizeDebounce = window.setTimeout(() => {
      const targetScale = this._savedResScale || 0.6;
      this._savedResScale = 0;
      this.resolutionScale = targetScale;
      this.renderer.setPixelRatio(window.devicePixelRatio * targetScale);
      const w2 = this.container.clientWidth || window.innerWidth;
      const h2 = this.container.clientHeight || window.innerHeight;
      this.renderer.setSize(w2, h2, false);
      this.renderer.setViewport(0, 0, w2, h2);
      this.postProcessing.setSize(w2, h2);
      this.current.resize(w2, h2, window.devicePixelRatio * targetScale);
      if (this.running) this.renderFrame();
      canvas.style.transition = 'filter 0.3s ease-out';
      canvas.style.filter = '';
    }, 150) as unknown as number;
  }
}


