/**
 * Chromic Engine — Memory Monitor
 * Tracks heap growth, detects potential leaks.
 */

export class MemoryMonitor {
  constructor() {
    this._samples = []; // { time, heapUsed }
    this._growthPerSec = 0;
    this._leakSuspects = [];
    this._interval = null;
    this._listenerCount = 0;
    this._patched = false;
    this._listenerMap = new WeakMap(); // target → count
    this._persistentTargets = new Set(); // window, document, etc.
  }

  init() {
    // Monkey-patch addEventListener to count registrations
    if (!this._patched) {
      this._patched = true;
      const self = this;
      const origAdd = EventTarget.prototype.addEventListener;
      const origRemove = EventTarget.prototype.removeEventListener;
      EventTarget.prototype.addEventListener = function (...args) {
        self._listenerCount++;
        const count = self._listenerMap.get(this) || 0;
        self._listenerMap.set(this, count + 1);
        // Track persistent targets for accurate reporting
        if (this === window || this === document || this === document.body) {
          self._persistentTargets.add(this);
        }
        return origAdd.apply(this, args);
      };
      EventTarget.prototype.removeEventListener = function (...args) {
        self._listenerCount--;
        const count = self._listenerMap.get(this) || 0;
        if (count > 0) self._listenerMap.set(this, count - 1);
        return origRemove.apply(this, args);
      };
    }

    this._interval = setInterval(() => this._sample(), 2000);
  }

  _sample() {
    const mem = performance.memory;
    if (!mem) return;

    const now = Date.now();
    const heapUsed = Math.round(mem.usedJSHeapSize / 1048576);
    const heapTotal = Math.round(mem.totalJSHeapSize / 1048576);

    this._samples.push({ time: now, heapUsed });
    // Keep last 30 samples (60s)
    if (this._samples.length > 30) this._samples.shift();

    // Calculate growth rate (MB/s over last 20s window)
    if (this._samples.length >= 10) {
      const oldest = this._samples[0];
      const newest = this._samples[this._samples.length - 1];
      const timeDiffSec = (newest.time - oldest.time) / 1000;
      const heapDiff = newest.heapUsed - oldest.heapUsed;
      this._growthPerSec = timeDiffSec > 0 ? (heapDiff / timeDiffSec).toFixed(2) : 0;
    }

    // Leak detection heuristics
    this._leakSuspects = [];
    if (this._samples.length >= 15) {
      const recentGrowth = this._samples.slice(-10).every((s, i, arr) =>
        i === 0 || s.heapUsed >= arr[i - 1].heapUsed - 1
      );
      if (recentGrowth && Number(this._growthPerSec) > 0.5) {
        this._leakSuspects.push(`Heap growing ${this._growthPerSec}MB/s for 20s+`);
      }
    }
    if (this._listenerCount > 5000) {
      this._leakSuspects.push(`${this._listenerCount} active event listeners`);
    }

    // Check for detached DOM nodes (heuristic: if DOM nodes > expected)
    const allNodes = document.querySelectorAll('*').length;
    if (allNodes > 10000) {
      this._leakSuspects.push(`${allNodes} DOM nodes (possible leak)`);
    }
  }

  getMetrics() {
    const mem = performance.memory;
    return {
      heapUsedMB: mem ? Math.round(mem.usedJSHeapSize / 1048576) : '?',
      heapTotalMB: mem ? Math.round(mem.totalJSHeapSize / 1048576) : '?',
      heapGrowth: this._growthPerSec,
      listenerCount: Math.max(0, this._listenerCount),
      leakSuspects: this._leakSuspects,
    };
  }

  destroy() {
    clearInterval(this._interval);
  }
}
