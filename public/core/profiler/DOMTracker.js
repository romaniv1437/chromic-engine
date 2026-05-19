/**
 * Chromic Engine — DOM Mutation & Layout Tracker
 * Monitors DOM churn, layout shifts, and long tasks.
 */

export class DOMTracker {
  constructor() {
    this._mutationCount = 0;
    this._mutationsPerSec = 0;
    this._elementCounts = new Map(); // selector → count
    this._layoutShifts = 0;
    this._longTasks = 0;
    this._longestTask = 0;
    this._observer = null;
    this._perfObservers = [];
    this._interval = null;
  }

  init() {
    // MutationObserver — track DOM churn
    this._observer = new MutationObserver((mutations) => {
      this._mutationCount += mutations.length;
      for (const m of mutations) {
        const target = m.target;
        const sel = this._getSelector(target);
        this._elementCounts.set(sel, (this._elementCounts.get(sel) || 0) + 1);
      }
    });
    this._observer.observe(document.body, {
      childList: true, subtree: true, attributes: true, characterData: true,
    });

    // PerformanceObserver — layout shifts
    try {
      const lsObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.entryType === 'layout-shift' && !entry.hadRecentInput) {
            this._layoutShifts++;
          }
        }
      });
      lsObserver.observe({ type: 'layout-shift', buffered: true });
      this._perfObservers.push(lsObserver);
    } catch (_) {}

    // PerformanceObserver — long tasks
    try {
      const ltObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          this._longTasks++;
          if (entry.duration > this._longestTask) this._longestTask = entry.duration;
        }
      });
      ltObserver.observe({ type: 'longtask', buffered: true });
      this._perfObservers.push(ltObserver);
    } catch (_) {}

    // Periodic aggregation — snapshot and reset
    this._interval = setInterval(() => {
      this._mutationsPerSec = this._mutationCount;
      this._mutationCount = 0;
      // Snapshot hot elements then fully reset
      this._hotSnapshot = [...this._elementCounts.entries()]
        .sort((a, b) => b[1] - a[1])
        .slice(0, 8)
        .map(([selector, count]) => ({ selector, count }));
      this._elementCounts.clear();
    }, 1000);
  }

  getMetrics() {
    return {
      mutationsPerSec: this._mutationsPerSec,
      layoutShifts: this._layoutShifts,
      longTasks: this._longTasks,
      longestTask: this._longestTask,
      hotElements: this._hotSnapshot || [],
    };
  }

  _getSelector(el) {
    if (!el || el === document.body) return 'body';
    const tag = el.tagName?.toLowerCase() || '?';
    const id = el.id ? `#${el.id}` : '';
    const cls = el.className && typeof el.className === 'string'
      ? '.' + el.className.trim().split(/\s+/).slice(0, 2).join('.')
      : '';
    return `${tag}${id}${cls}`;
  }

  destroy() {
    this._observer?.disconnect();
    this._perfObservers.forEach(o => o.disconnect());
    clearInterval(this._interval);
  }
}

