/**
 * Chromic Engine — Performance HUD Overlay
 * Shows real-time metrics: FPS, heap, DOM mutations, GPU draw calls, scene timings
 * Toggle: Ctrl+Shift+P
 */

export class ProfilerHUD {
  constructor() {
    this._el = null;
    this._visible = true;
    this._data = {};
  }

  init() {
    this._el = document.createElement('div');
    this._el.id = 'chromic-perf-hud';
    this._el.style.cssText = `
      position: fixed; top: 8px; right: 8px; z-index: 2147483647;
      background: rgba(0,0,0,0.88); color: #0f0; font: 11px/1.4 'SF Mono', Menlo, monospace;
      padding: 10px 14px; border-radius: 8px; pointer-events: none;
      border: 1px solid rgba(0,255,0,0.2); backdrop-filter: blur(8px);
      max-width: 380px; white-space: pre; user-select: none;
    `;
    document.body.appendChild(this._el);

    document.addEventListener('keydown', (e) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'P') {
        this._visible = !this._visible;
        this._el.style.display = this._visible ? '' : 'none';
      }
    });
  }

  update(data) {
    this._data = { ...this._data, ...data };
    if (!this._visible || !this._el) return;

    // Re-parent HUD into overlay if it's active (same z-index stacking context)
    const overlay = document.getElementById('musicOverlayHost');
    const shouldBeInOverlay = overlay?.classList.contains('is-active') || overlay?.classList.contains('is-expanded');
    if (shouldBeInOverlay && this._el.parentElement !== overlay) {
      overlay.appendChild(this._el);
    } else if (!shouldBeInOverlay && this._el.parentElement !== document.body) {
      document.body.appendChild(this._el);
    }

    const d = this._data;
    const lines = [
      `⚡ CHROMIC PERF MONITOR`,
      `─────────────────────────────`,
      `FPS: ${(d.fps || 0).toFixed(0)}  |  Frame: ${(d.frameTime || 0).toFixed(1)}ms`,
      `Heap: ${d.heapUsedMB || '?'}MB / ${d.heapTotalMB || '?'}MB  (${d.heapGrowth || '0'}/s)`,
      `─── GPU ───`,
      `Scene: ${d.sceneName || '?'} (#${d.sceneIdx ?? '?'})`,
      `Draw calls: ${d.drawCalls ?? '?'}  |  Triangles: ${d.triangles ?? '?'}`,
      `Scene CPU: ${(d.sceneCpuMs || 0).toFixed(2)}ms`,
      `Post CPU: ${(d.postCpuMs || 0).toFixed(2)}ms`,
      `Render CPU: ${(d.renderCpuMs || 0).toFixed(2)}ms`,
      `─── DOM ───`,
      `Mutations/s: ${d.mutationsPerSec || 0}`,
      `Layout shifts: ${d.layoutShifts || 0}`,
      `Long tasks: ${d.longTasks || 0}  (>${(d.longestTask || 0).toFixed(0)}ms)`,
      `rAF loops: ${d.rafLoops || '?'}`,
    ];

    if (d.hotElements?.length) {
      lines.push(`─── HOT ELEMENTS ───`);
      for (const h of d.hotElements.slice(0, 5)) {
        lines.push(` ${h.count}/s  ${h.selector.substring(0, 40)}`);
      }
    }

    if (d.leakSuspects?.length) {
      lines.push(`─── ⚠️ LEAK SUSPECTS ───`);
      for (const l of d.leakSuspects.slice(0, 3)) {
        lines.push(` ${l}`);
      }
    }

    this._el.textContent = lines.join('\n');
  }

  destroy() {
    this._el?.remove();
  }
}

