/**
 * VizWorkerBridge — Manages the OffscreenCanvas Worker for the 2D visualizer.
 *
 * Transfers the canvas to a dedicated worker thread so visualizer rendering
 * never blocks the UI thread (scrolling, lyrics, interactions).
 *
 * Falls back to main-thread rendering if OffscreenCanvas is not supported.
 */

export class VizWorkerBridge {
  constructor() {
    this.worker = null;
    this.canvas = null;
    this.sharedBuffer = null;
    this.isOffscreen = false;
    this._fallbackManager = null;
  }

  /**
   * Initialize the worker with a canvas element and optional SharedArrayBuffer.
   * @param {HTMLCanvasElement} canvas - The visualizer canvas element
   * @param {object} sharedBuffer - AudioSharedBuffer instance (optional)
   * @param {object} config - { preset, intensity, sensitivity, fpsMax, ... }
   */
  init(canvas, sharedBuffer = null, config = {}) {
    this.canvas = canvas;
    this.sharedBuffer = sharedBuffer;

    // Check if OffscreenCanvas is supported
    if (typeof canvas.transferControlToOffscreen !== 'function') {
      console.warn('[VizWorkerBridge] OffscreenCanvas not supported, using main-thread fallback');
      this.isOffscreen = false;
      return false;
    }

    try {
      const offscreen = canvas.transferControlToOffscreen();
      this.worker = new Worker('/workers/visualizer.worker.js');
      this.isOffscreen = true;

      const initMsg = {
        type: 'init',
        canvas: offscreen,
        width: canvas.clientWidth || canvas.width || window.innerWidth,
        height: canvas.clientHeight || canvas.height || window.innerHeight,
        config,
      };

      const transfer = [offscreen];

      // Attach SharedArrayBuffer if available
      if (sharedBuffer?.buffer && sharedBuffer.isShared) {
        initMsg.buffer = sharedBuffer.buffer;
      }

      this.worker.postMessage(initMsg, transfer);

      // Listen for resize
      this._resizeObserver = new ResizeObserver((entries) => {
        for (const entry of entries) {
          const { width, height } = entry.contentRect;
          if (width > 0 && height > 0) {
            this.worker.postMessage({ type: 'resize', width: Math.round(width), height: Math.round(height) });
          }
        }
      });
      this._resizeObserver.observe(canvas);

      console.log('[VizWorkerBridge] OffscreenCanvas transferred to worker ✅');
      return true;
    } catch (e) {
      console.warn('[VizWorkerBridge] Failed to init worker:', e.message);
      this.isOffscreen = false;
      return false;
    }
  }

  /** Update config (preset, accent, palette, etc.) */
  setConfig(config) {
    if (this.worker) {
      this.worker.postMessage({ type: 'config', ...config });
    }
  }

  /** Send frame data manually (only needed if SharedArrayBuffer is unavailable) */
  sendFrame(freq, wave) {
    if (this.worker && !this.sharedBuffer?.isShared) {
      this.worker.postMessage({ type: 'frame', freq, wave });
    }
  }

  start() {
    if (this.worker) {
      this.worker.postMessage({ type: 'start' });
    }
  }

  stop() {
    if (this.worker) {
      this.worker.postMessage({ type: 'stop' });
    }
  }

  destroy() {
    if (this._resizeObserver) {
      this._resizeObserver.disconnect();
      this._resizeObserver = null;
    }
    if (this.worker) {
      this.worker.postMessage({ type: 'stop' });
      this.worker.terminate();
      this.worker = null;
    }
    this.isOffscreen = false;
  }
}

