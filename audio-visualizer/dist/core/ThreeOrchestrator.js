import * as THREE from 'three';
import { AudioProcessor } from '../audio/AudioProcessor';
import { PostProcessing } from './PostProcessing';
import { GpuTypography } from './GpuTypography';
import { LyricsRenderer } from './LyricsRenderer';
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
import { UnrealCinematographyScene } from '../scenes/UnrealCinematographyScene';
import { CoralineTunnelScene } from '../scenes/CoralineTunnelScene';
import { CinematographyEngine } from './CinematographyEngine';
import { KineticRibbonSystem } from './KineticRibbonSystem';
const DEFAULT_SCENE_INDEX = 5; // HyperbolicScene
export class ThreeOrchestrator {
    constructor(options) {
        this.scenes = [];
        this.sceneFactories = [];
        this.currentIdx = DEFAULT_SCENE_INDEX;
        this.running = false;
        this.frameId = 0;
        this.overlayOpacity = 1;
        this.zenFadeTarget = 1;
        this.zenFadeCurrent = 1;
        this.gpuTextEnabled = true;
        this.uiVisible = false;
        this._currentPalette = null;
        this.cinematographyActive = false;
        this.maxFps = 0; // 0 = unlimited
        this.lastFrameTime = 0;
        this._scrollPaused = false;
        this._loopDbg = 0;
        this._resizeDbgCount = 0;
        // Time dilation for cinematic engine start
        this.timeScale = 1;
        this.timeScaleTarget = 1;
        this.timeScaleLerpSpeed = 0.005; // per-ms lerp rate
        this.dilatedTime = 0;
        this.lastRealTime = 0;
        this._lastAlbumArt = null;
        this.loop = () => {
            if (!this.running)
                return;
            this.frameId = requestAnimationFrame(this.loop);
            // Skip rendering entirely during scroll to free GPU for compositor
            if (this._scrollPaused)
                return;
            // FPS throttle
            if (this.maxFps > 0) {
                const now = performance.now();
                const minInterval = 1000 / this.maxFps;
                if (now - this.lastFrameTime < minInterval)
                    return;
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
            if (this.dilatedTime > 10000)
                this.dilatedTime -= 10000;
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
            const audioEl2 = window.musicRuntime?.audioEngine?.audioElement;
            if (audioEl2)
                this.lyricsRenderer.setCurrentTime(audioEl2.currentTime);
            this.lyricsRenderer.update(audio.rms);
            // Feed lyrics state to Unreal Cinematography scene
            if (this.currentIdx === 25 && this.current instanceof UnrealCinematographyScene) {
                const ls = this.lyricsRenderer.getShaderState();
                this.current.setLyricsState(ls.active, ls.progress, ls.adlib, ls.wordIntensity);
                if (ls.lineChanged)
                    this.current.triggerLineBreak();
            }
            this.kineticRibbons.update(audio, this.dilatedTime);
            this.postProcessing.update(audio);
            this.postProcessing.composer.render();
            this.postProcessing.renderText();
            // Debug logging every 300 frames
            if (!this._loopDbg)
                this._loopDbg = 0;
            this._loopDbg++;
            if (this._loopDbg % 300 === 1 && false) { // DEBUG: set to true to enable verbose frame logging
                const ri = this.renderer.info.render;
                console.log(`[Orchestrator] frame=${this._loopDbg} scene=${this.current.constructor.name} idx=${this.currentIdx} drawCalls=${ri.calls} tris=${ri.triangles} sceneChildren=${this.current.scene.children.length} time=${this.dilatedTime.toFixed(2)}`);
            }
            // Expose metrics for perf profiler (zero-cost when not read)
            if (globalThis.__PERF_MODE__) {
                const w = globalThis;
                if (!w._chromicMathVisualizer)
                    w._chromicMathVisualizer = {};
                const m = w._chromicMathVisualizer;
                m.running = this.running;
                m._sceneIdx = this.currentIdx;
                m._sceneName = this.current?.constructor?.name || `Scene ${this.currentIdx}`;
                m._sceneCount = this.sceneFactories.length;
                m._rendererInfo = {
                    drawCalls: this.renderer.info.render.calls,
                    triangles: this.renderer.info.render.triangles,
                };
                m.setScene = (idx) => this.setScene(idx);
            }
        };
        this._resizeDebounce = 0;
        this._savedResScale = 0;
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
        this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
        this.renderer.toneMappingExposure = 1.0;
        this.renderer.setPixelRatio(window.devicePixelRatio * this.resolutionScale);
        // Set renderer size — prefer viewport dimensions directly. In the SoundCloud
        // extension, container.clientWidth can transiently report a tiny value during
        // initial mount, which makes full-screen shaders render in the lower-left.
        const initW = window.innerWidth || this.container.clientWidth || 1;
        const initH = window.innerHeight || this.container.clientHeight || 1;
        // DOM placement: set explicit pixel size so host-page CSS can't shrink the canvas.
        const canvas = this.renderer.domElement;
        canvas.style.position = 'absolute';
        canvas.style.top = '0';
        canvas.style.left = '0';
        canvas.style.display = 'block';
        canvas.style.width = initW + 'px';
        canvas.style.height = initH + 'px';
        canvas.style.pointerEvents = 'none';
        canvas.style.zIndex = '0';
        this.container.appendChild(canvas);
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
            () => new UnrealCinematographyScene(),
            () => new CoralineTunnelScene(),
        ];
        this.scenes = new Array(this.sceneFactories.length).fill(null);
        // Only instantiate the initial scene
        this.current = this.getOrCreateScene(DEFAULT_SCENE_INDEX);
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
        this.lyricsRenderer.setViewportSize(initW, initH);
        // Wire lyrics scroll (wheel) and click-to-seek
        this.container.addEventListener('wheel', (e) => {
            // Only handle if click is on right half (text area)
            const rect = this.container.getBoundingClientRect();
            const ndcX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
            if (ndcX > -0.1) { // Right half = text area
                e.preventDefault();
                this.lyricsRenderer.handleWheel(e.deltaY);
            }
        }, { passive: false });
        this.container.addEventListener('click', (e) => {
            const rect = this.container.getBoundingClientRect();
            const ndcX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
            const ndcY = -((e.clientY - rect.top) / rect.height) * 2 + 1;
            console.log(`[Orchestrator] click event: ndcX=${ndcX.toFixed(2)} ndcY=${ndcY.toFixed(2)} target=${e.target?.tagName}`);
            if (e.shiftKey) {
                // Shift+Click = debug pixel inspector (reads actual rendered color)
                this.lyricsRenderer.debugInspectClick(ndcX, ndcY, this.renderer, e.clientX, e.clientY);
            }
            else {
                this.lyricsRenderer.handleClick(ndcX, ndcY);
            }
        });
        // Set up seek callback
        this.lyricsRenderer.onSeek((time) => {
            console.log(`[Orchestrator] seek → ${time.toFixed(3)}s`);
            // Dispatch a custom event that MusicPlayer can listen for
            document.dispatchEvent(new CustomEvent('visualizer-seek', { detail: { time } }));
            // Also directly seek the audio element if accessible
            const audio = window.musicRuntime?.audioEngine?.audioElement
                || document.querySelector('audio')
                || document.getElementById('globalAudio');
            if (audio && typeof audio.currentTime === 'number') {
                audio.currentTime = time;
            }
        });
        // Kinetic Ribbon System (200 flowing instanced ribbons)
        this.kineticRibbons = new KineticRibbonSystem();
        this.kineticRibbons.addToScene(this.current.scene);
        // Cinematography Engine (randomized post-processing per track)
        this.cinematographyEngine = new CinematographyEngine();
        // Enable layer 1 on current scene camera
        this.current.camera.layers.enable(1);
        if (globalThis.__DEBUG__)
            console.log(`[Visualizer] Initialized with ${this.sceneFactories.length} scenes (lazy)`);
        if (globalThis.__DEBUG__)
            console.log(`[Visualizer] Scenes: Lava, Julia, Lorenz, Riemann, ReactionDiffusion, Hyperbolic, LivingCanvas, FractalInfinity`);
        // Expose lyrics debug tools on globalThis for console access
        globalThis.__lyricsDebug = (on = true) => { this.lyricsRenderer.setDebug(on); };
        globalThis.__lyricsRenderer = this.lyricsRenderer;
        // Listen for uiToggle custom event
        document.addEventListener('uiToggle', ((e) => {
            console.log(`[Orchestrator] uiToggle event: visible=${e.detail?.visible} centered=${e.detail?.centered}`);
            this.setUiVisible(e.detail?.visible ?? false);
            // Only center text/lyrics when explicitly in visualizer-only mode (not idle timeout)
            if (e.detail?.centered !== undefined) {
                this.gpuTypography.setCentered(e.detail.centered);
                this.lyricsRenderer.setCentered(e.detail.centered);
            }
        }));
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
            }, 200);
        };
        document.addEventListener('scroll', onScroll, { capture: true, passive: true });
        // Keyboard shortcuts (1-8 scenes, Z for zen)
        document.addEventListener('keydown', (e) => {
            // Don't intercept keys when user is typing in an editable element
            const target = e.target;
            if (target?.isContentEditable || target?.tagName === 'INPUT' || target?.tagName === 'TEXTAREA')
                return;
            const n = Number(e.key);
            if (n >= 1 && n <= 9)
                this.setScene(n - 1);
            if (e.key === '0')
                this.setScene(9);
            if (e.key.toLowerCase() === 'z') {
                this.uiVisible = !this.uiVisible;
                this.setUiVisible(this.uiVisible);
            }
        });
    }
    getOrCreateScene(idx) {
        if (this.scenes[idx])
            return this.scenes[idx];
        const scene = this.sceneFactories[idx]();
        scene.camera.layers.enable(1);
        this.scenes[idx] = scene;
        // Apply stored palette to newly created scene
        if (this._currentPalette && typeof scene.setPalette === 'function') {
            scene.setPalette(this._currentPalette);
        }
        // Apply album art to scenes that support it
        if (this._lastAlbumArt && typeof scene.setAlbumArt === 'function') {
            scene.setAlbumArt(this._lastAlbumArt);
        }
        return scene;
    }
    setScene(idx) {
        if (idx < 0 || idx >= this.sceneFactories.length)
            return;
        if (idx === this.currentIdx && this.scenes[idx])
            return;
        if (globalThis.__DEBUG__)
            console.log(`[Visualizer] Switching scene: ${this.currentIdx} → ${idx}`);
        this.gpuTypography.removeFromScene(this.current.scene);
        this.lyricsRenderer.removeFromScene(this.current.scene);
        this.kineticRibbons.removeFromScene(this.current.scene);
        // Deactivate cinematography passes when leaving scene 25
        if (this.cinematographyActive) {
            this._removeCinematographyPasses();
        }
        this.currentIdx = idx;
        this.current = this.getOrCreateScene(idx);
        // Re-apply stored palette to the newly active scene
        if (this._currentPalette && typeof this.current.setPalette === 'function') {
            this.current.setPalette(this._currentPalette);
        }
        this.postProcessing.updateScene(this.current.scene, this.current.camera);
        // Coraline tunnel uses stronger UnrealBloom profile; others use default.
        this.postProcessing.setBloomProfile(idx === 26 ? 'coraline' : 'default');
        this.gpuTypography.addToScene(this.current.scene);
        this.lyricsRenderer.addToScene(this.current.scene);
        // Only add ribbons to fullscreen shader scenes (ortho camera), not 3D geometry scenes
        // Exclude scene 25 (Unreal Cinematography) — ribbons look wrong on top of raymarched content
        if (this.current.camera instanceof THREE.OrthographicCamera && idx !== 25) {
            this.kineticRibbons.addToScene(this.current.scene);
        }
        // Activate cinematography engine for scene 25 (Unreal Cinematography)
        if (idx === 25) {
            this._activateCinematography();
        }
        // Trigger resize for the new scene to get correct resolution
        this.handleResize();
    }
    _activateCinematography() {
        const audioEl = window.musicRuntime?.audioEngine?.audioElement;
        const duration = audioEl?.duration || 200;
        const recipe = this.cinematographyEngine.generateRecipe(duration, undefined, ['mirror']);
        // Insert passes into composer (after bloom, before final output)
        const passes = this.cinematographyEngine.getPasses();
        for (const pass of passes) {
            this.postProcessing.composer.addPass(pass);
        }
        this.cinematographyActive = true;
    }
    _removeCinematographyPasses() {
        const passes = this.cinematographyEngine.getPasses();
        for (const pass of passes) {
            const idx = this.postProcessing.composer.passes.indexOf(pass);
            if (idx !== -1)
                this.postProcessing.composer.passes.splice(idx, 1);
        }
        this.cinematographyEngine.dispose();
        this.cinematographyActive = false;
    }
    setResolutionScale(scale) {
        this.resolutionScale = Math.max(0.1, Math.min(2, scale));
        this.renderer.setPixelRatio(window.devicePixelRatio * this.resolutionScale);
        // Only resize renderer + current scene (not all 17 scenes)
        const w = this.container.clientWidth || window.innerWidth;
        const h = this.container.clientHeight || window.innerHeight;
        if (w === 0 || h === 0)
            return;
        this.renderer.setSize(w, h, false);
        this.postProcessing.setSize(w, h);
        const effectiveDpr = window.devicePixelRatio * this.resolutionScale;
        this.current.resize(w, h, effectiveDpr);
    }
    /** Set maximum FPS (0 = unlimited / screen refresh rate) */
    setMaxFps(fps) {
        this.maxFps = Math.max(0, Math.round(fps));
    }
    /**
     * Cinematic time dilation — slow/speed shader animation smoothly.
     * @param scale Target timeScale (0.05 = near-frozen, 1.0 = normal)
     * @param duration Lerp duration in ms (controls how fast we reach target)
     */
    setTimeScale(scale, duration = 600) {
        this.timeScaleTarget = Math.max(0, Math.min(3, scale));
        // Convert duration to per-frame lerp speed (assuming ~60fps, 16ms frames)
        // We want ~95% convergence in `duration` ms → solve: (1-k)^(duration/16) = 0.05
        this.timeScaleLerpSpeed = 1 - Math.pow(0.05, 16 / duration);
    }
    /** Zen mode: fade overlay when UI active */
    setZenMode(uiActive) {
        this.zenFadeTarget = uiActive ? 0.15 : 1;
    }
    /** Show/hide GPU text and blur background */
    setUiVisible(visible) {
        this.uiVisible = visible;
        this.gpuTypography.setVisible(visible);
        // Only center text when explicitly in visualizer-only mode, NOT on idle timeout
        // Centering is controlled separately via setCentered() from the visualModeBtn
        // Lyrics always visible when loaded, controls follow UI visibility
        this.lyricsRenderer.setVisible(true);
        this.lyricsRenderer.setControlsVisible(visible);
        // Note: lyrics centering is now controlled by the uiToggle event's centered field,
        // NOT by idle state. See the event listener above.
        // Note: blur/dim controlled separately via setBlurDim()
    }
    /** Explicitly set text centering (called by visualizer-only mode toggle) */
    setTextCentered(centered) {
        this.gpuTypography.setCentered(centered);
    }
    /** Control blur on the shader scene (called by blur button in GPU mode) */
    setBlur(enabled) {
        this.current.setBlur(enabled ? 1 : 0);
    }
    /** Control dim on the shader scene (called by dim button in GPU mode) */
    setDim(enabled, opacity) {
        this.current.setDim(enabled ? (opacity ?? 0.4) : 0);
    }
    /** @deprecated Use setBlur/setDim separately */
    setBlurDim(enabled) {
        this.current.setBlur(enabled ? 1 : 0);
        this.current.setDim(enabled ? 0.4 : 0);
    }
    /** Set track info for GPU text */
    setTrack(title, artist) {
        if (globalThis.__DEBUG__)
            console.log(`[Visualizer] setTrack: "${title}" - "${artist}"`);
        this.gpuTypography.setTrack(title, artist);
        // Regenerate Unreal Cinematography seed for unique visuals per track
        const unreal = this.scenes[25];
        if (unreal instanceof UnrealCinematographyScene) {
            unreal.regenerateSeed();
        }
        // Keep Hyperbolic as the default scene on track change
        this.setScene(DEFAULT_SCENE_INDEX);
        this.setUiVisible(true);
    }
    /** Set color palette for all palette-aware scenes */
    setPalette(colors) {
        const threeColors = colors.map(c => new THREE.Color(c));
        this._currentPalette = threeColors;
        // Only update the currently active scene — others get palette on lazy init via getOrCreateScene
        const current = this.scenes[this.currentIdx];
        if (current && typeof current.setPalette === 'function') {
            current.setPalette(threeColors);
        }
        // Update ribbon accent to match palette highlight
        this.kineticRibbons.setAccentColor(threeColors[2]);
        // Update lyrics renderer accent color for artist name
        this.lyricsRenderer.setAccentColor(threeColors[0]);
    }
    /** Set album art for Living Canvas + Unreal Cinematography scenes */
    setAlbumArt(imageUrl) {
        if (globalThis.__DEBUG__)
            console.log(`[Visualizer] setAlbumArt:`, imageUrl);
        const canvas = this.scenes[6];
        if (canvas instanceof LivingCanvasScene) {
            canvas.setAlbumArt(imageUrl);
        }
        const unreal = this.scenes[25];
        if (unreal instanceof UnrealCinematographyScene) {
            unreal.setAlbumArt(imageUrl);
        }
        this._lastAlbumArt = imageUrl;
    }
    /** Set lyrics timeline for GPU karaoke rendering */
    setLyricsTimeline(timeline, artist, album) {
        this.lyricsRenderer.setTimeline(timeline, artist, album);
        this.gpuTypography.setVisible(false);
        this.lyricsRenderer.setVisible(true);
    }
    /** Update audio clock for lyrics sync (call from main thread on timeupdate) */
    setCurrentTime(time) {
        this.lyricsRenderer.setCurrentTime(time);
    }
    start() {
        if (this.running)
            return;
        this.running = true;
        this.lastRealTime = performance.now() * 0.001;
        // Reset dilated time after long idle to prevent GPU float precision issues
        if (this.dilatedTime > 3600)
            this.dilatedTime = 0;
        // Ensure correct size on first frame
        requestAnimationFrame(() => this.handleResize());
        this.loop();
    }
    /** Render a single frame immediately (synchronous). Use before FLIP to seed canvas. */
    renderFrame() {
        const realTime = performance.now() * 0.001;
        if (this.lastRealTime === 0)
            this.lastRealTime = realTime;
        const realDelta = Math.min(realTime - this.lastRealTime, 0.1) || 0.016;
        this.lastRealTime = realTime;
        this.timeScale += (this.timeScaleTarget - this.timeScale) * this.timeScaleLerpSpeed;
        this.dilatedTime += realDelta * this.timeScale;
        if (this.dilatedTime > 10000)
            this.dilatedTime -= 10000;
        const audio = this.audioProcessor.update();
        this.zenFadeCurrent += (this.zenFadeTarget - this.zenFadeCurrent) * 0.05;
        this.renderer.domElement.style.opacity = String(this.zenFadeCurrent);
        this.current.update(audio, this.dilatedTime);
        this.gpuTypography.update(audio.rms);
        // Feed audio time directly from audio element every frame
        const audioEl = window.musicRuntime?.audioEngine?.audioElement;
        if (audioEl)
            this.lyricsRenderer.setCurrentTime(audioEl.currentTime);
        this.lyricsRenderer.update(audio.rms);
        this.kineticRibbons.update(audio, this.dilatedTime);
        if (this.cinematographyActive)
            this.cinematographyEngine.update(audio);
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
    handleResize() {
        const w = window.innerWidth || this.container.clientWidth || 1;
        const h = window.innerHeight || this.container.clientHeight || 1;
        if (w === 0 || h === 0)
            return;
        // Explicitly set canvas CSS size in px so SoundCloud's CSS can't interfere
        const canvas = this.renderer.domElement;
        canvas.style.width = w + 'px';
        canvas.style.height = h + 'px';
        // Lightweight diagnostics: log the first few resizes and any mismatch where the
        // host container reports a much smaller size than the viewport.
        this._resizeDbgCount += 1;
        const cw = this.container.clientWidth || 0;
        const ch = this.container.clientHeight || 0;
        const needsLog = this._resizeDbgCount <= 6 || cw < w * 0.9 || ch < h * 0.9;
        if (needsLog) {
            console.log(`[Orchestrator] handleResize #${this._resizeDbgCount}: ` +
                `viewport=${w}x${h} container=${cw}x${ch} canvasCss=${canvas.style.width}x${canvas.style.height} ` +
                `pixelRatio=${this.renderer.getPixelRatio().toFixed(2)} resScale=${this.resolutionScale}`);
        }
        this.renderer.setSize(w, h, false);
        this.postProcessing.setSize(w, h);
        this.lyricsRenderer.setAspect(w, h);
        this.lyricsRenderer.setViewportSize(w, h);
        const effectiveDpr = window.devicePixelRatio * this.resolutionScale;
        this.current.resize(w, h, effectiveDpr);
        if (this.running)
            this.renderFrame();
    }
}
