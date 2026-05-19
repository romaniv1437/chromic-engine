/**
 * Chromic Engine — GPU Profiler
 * Tracks Three.js renderer stats, per-scene CPU timing, and shader performance.
 */

export class GPUProfiler {
  constructor() {
    this._frameCount = 0;
    this._fps = 0;
    this._lastFpsTime = 0;
    this._sceneCpuMs = 0;
    this._postCpuMs = 0;
    this._renderCpuMs = 0;
    this._drawCalls = 0;
    this._triangles = 0;
    this._sceneName = '?';
    this._sceneIdx = -1;
    this._interval = null;
    this._frameId = 0;
    // Scene benchmark results
    this._benchResults = null;
  }

  init() {
    this._lastFpsTime = performance.now();
    this._loop();
  }

  _loop() {
    this._frameId = requestAnimationFrame(() => this._loop());

    this._frameCount++;
    const now = performance.now();
    if (now - this._lastFpsTime >= 1000) {
      this._fps = this._frameCount;
      this._frameCount = 0;
      this._lastFpsTime = now;
    }

    // Read from mathVisualizer if available
    const viz = window._chromicMathVisualizer;
    if (!viz) return;

    // Per-scene CPU time (instrumented via marks)
    try {
      const entries = performance.getEntriesByName('chromic-scene-update');
      if (entries.length) {
        this._sceneCpuMs = entries[entries.length - 1].duration;
      }
      const postEntries = performance.getEntriesByName('chromic-post-update');
      if (postEntries.length) {
        this._postCpuMs = postEntries[postEntries.length - 1].duration;
      }
      const renderEntries = performance.getEntriesByName('chromic-render');
      if (renderEntries.length) {
        this._renderCpuMs = renderEntries[renderEntries.length - 1].duration;
      }
      // Clear marks to avoid memory buildup
      performance.clearMeasures('chromic-scene-update');
      performance.clearMeasures('chromic-post-update');
      performance.clearMeasures('chromic-render');
      performance.clearMarks();
    } catch (_) {}

    // Renderer info
    if (viz._rendererInfo) {
      this._drawCalls = viz._rendererInfo.drawCalls;
      this._triangles = viz._rendererInfo.triangles;
    }
    if (viz._sceneName !== undefined) {
      this._sceneName = viz._sceneName;
      this._sceneIdx = viz._sceneIdx;
    }
  }

  getMetrics() {
    return {
      fps: this._fps,
      frameTime: this._fps > 0 ? 1000 / this._fps : 0,
      sceneCpuMs: this._sceneCpuMs,
      postCpuMs: this._postCpuMs,
      renderCpuMs: this._renderCpuMs,
      drawCalls: this._drawCalls,
      triangles: this._triangles,
      sceneName: this._sceneName,
      sceneIdx: this._sceneIdx,
    };
  }

  /**
   * Run a benchmark across all scenes (5s each).
   * Returns a promise that resolves with per-scene results.
   */
  async runBenchmark(durationPerScene = 5000) {
    const viz = window._chromicMathVisualizer;
    if (!viz || !viz.setScene) {
      console.error('[GPUProfiler] No mathVisualizer available for benchmark');
      return null;
    }

    const sceneCount = viz._sceneCount || 25;
    const results = [];
    console.log(`[GPUProfiler] 🏁 Starting benchmark: ${sceneCount} scenes × ${durationPerScene / 1000}s each`);

    for (let i = 0; i < sceneCount; i++) {
      viz.setScene(i);
      // Wait for scene to initialize
      await new Promise(r => setTimeout(r, 500));

      const frames = [];
      const startHeap = performance.memory?.usedJSHeapSize || 0;
      const start = performance.now();

      while (performance.now() - start < durationPerScene) {
        const t0 = performance.now();
        await new Promise(r => requestAnimationFrame(r));
        frames.push(performance.now() - t0);
      }

      const endHeap = performance.memory?.usedJSHeapSize || 0;
      const avg = frames.reduce((a, b) => a + b, 0) / frames.length;
      const max = Math.max(...frames);
      const min = Math.min(...frames);
      const p95 = frames.sort((a, b) => a - b)[Math.floor(frames.length * 0.95)];

      results.push({
        scene: i,
        name: viz._sceneName || `Scene ${i}`,
        fps: Math.round(1000 / avg),
        avgMs: avg.toFixed(2),
        minMs: min.toFixed(2),
        maxMs: max.toFixed(2),
        p95Ms: p95.toFixed(2),
        frames: frames.length,
        heapGrowthKB: Math.round((endHeap - startHeap) / 1024),
        drawCalls: this._drawCalls,
        triangles: this._triangles,
      });

      console.log(`[GPUProfiler] Scene ${i}: ${Math.round(1000 / avg)}fps avg=${avg.toFixed(1)}ms p95=${p95.toFixed(1)}ms draws=${this._drawCalls}`);
    }

    this._benchResults = results;
    console.log('[GPUProfiler] 🏁 Benchmark complete!');
    console.table(results);
    return results;
  }

  destroy() {
    cancelAnimationFrame(this._frameId);
  }
}

