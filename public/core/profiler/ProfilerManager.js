/**
 * Chromic Engine — Performance Profiler Manager
 *
 * Activated via: npm run electron:perf
 * Or manually: window.__chromicProfiler.init()
 *
 * Subsystems:
 *  - DOMTracker: mutation counting, layout shifts, long tasks
 *  - MemoryMonitor: heap growth, leak detection
 *  - GPUProfiler: scene timings, draw calls, FPS
 *  - ProfilerHUD: real-time overlay (Ctrl+Shift+P to toggle)
 *
 * Commands (from DevTools console):
 *  - window.__chromicPerfTest()  — run full scene benchmark
 *  - window.__chromicProfiler.report()  — dump current metrics as JSON
 */

import { DOMTracker } from './DOMTracker.js';
import { MemoryMonitor } from './MemoryMonitor.js';
import { GPUProfiler } from './GPUProfiler.js';
import { ProfilerHUD } from './ProfilerHUD.js';

class ProfilerManager {
  constructor() {
    this.dom = new DOMTracker();
    this.memory = new MemoryMonitor();
    this.gpu = new GPUProfiler();
    this.hud = new ProfilerHUD();
    this._running = false;
    this._updateId = null;
  }

  init() {
    if (this._running) return;
    this._running = true;
    console.log('%c⚡ CHROMIC PERF PROFILER ACTIVE', 'color: #0f0; font-size: 14px; font-weight: bold;');
    console.log('  Ctrl+Shift+P to toggle HUD');
    console.log('  Ctrl+Shift+C to copy report to clipboard');
    console.log('  window.__chromicPerfTest() to benchmark all scenes');
    console.log('  window.__chromicProfiler.report() for JSON dump');
    console.log('  GET /api/perf/latest — read latest snapshot from another terminal');

    this.dom.init();
    this.memory.init();
    this.gpu.init();
    this.hud.init();

    // Update HUD at 4Hz (avoids DOM thrashing from profiler itself)
    this._updateId = setInterval(() => this._updateHUD(), 250);

    // POST snapshots to server every 1s so external tools can read them
    this._postId = setInterval(() => this._postSnapshot(), 1000);

    // Expose benchmark API
    window.__chromicPerfTest = () => this.gpu.runBenchmark();

    // Ctrl+Shift+C to copy report to clipboard
    document.addEventListener('keydown', (e) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'C') {
        e.preventDefault();
        const data = this.report();
        navigator.clipboard.writeText(JSON.stringify(data, null, 2)).then(() => {
          console.log('%c📋 Perf report copied to clipboard!', 'color: #0f0; font-weight: bold');
        });
      }
    });
  }

  _updateHUD() {
    const domMetrics = this.dom.getMetrics();
    const memMetrics = this.memory.getMetrics();
    const gpuMetrics = this.gpu.getMetrics();

    // Count active rAF loops (heuristic from known systems)
    let rafLoops = 0;
    if (window._chromicMathVisualizer?.running) rafLoops++;
    if (document.querySelector('.lyrics-active')) rafLoops++; // lyrics rAF
    const progressLoop = document.querySelector('.global-player-progress-fill');
    if (progressLoop) rafLoops++;

    this.hud.update({
      ...domMetrics,
      ...memMetrics,
      ...gpuMetrics,
      rafLoops,
    });
  }

  _postSnapshot() {
    const data = {
      timestamp: new Date().toISOString(),
      dom: this.dom.getMetrics(),
      memory: this.memory.getMetrics(),
      gpu: this.gpu.getMetrics(),
    };
    fetch('/api/perf/snapshot', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }).catch(() => {}); // silent fail
  }

  report() {
    const data = {
      timestamp: new Date().toISOString(),
      dom: this.dom.getMetrics(),
      memory: this.memory.getMetrics(),
      gpu: this.gpu.getMetrics(),
      benchmark: this.gpu._benchResults,
    };
    console.log('%c[Profiler Report]', 'color: #0ff; font-weight: bold');
    console.log(JSON.stringify(data, null, 2));
    return data;
  }

  destroy() {
    clearInterval(this._updateId);
    clearInterval(this._postId);
    this.dom.destroy();
    this.memory.destroy();
    this.gpu.destroy();
    this.hud.destroy();
    this._running = false;
  }
}

// Singleton
export const profilerManager = new ProfilerManager();
window.__chromicProfiler = profilerManager;

