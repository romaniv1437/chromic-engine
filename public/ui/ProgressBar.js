/**
 * ProgressBar — Universal drag-to-seek progress bar with pointer tracking,
 * seek knob, time tooltip, and smooth visual feedback.
 *
 * Usage:
 *   const bar = new ProgressBar(containerEl, {
 *     onSeek: (ratio) => { ... },          // finalize seek (0–1)
 *     onScrub: (ratio) => { ... },         // live visual scrub (optional)
 *     getDuration: () => totalSeconds,      // for time tooltip
 *   });
 *   bar.setProgress(0.42);                 // programmatic update (0–1)
 */
export class ProgressBar {
  constructor(container, { onSeek, onScrub, getDuration } = {}) {
    this.container = container;
    this.onSeek = onSeek;
    this.onScrub = onScrub;
    this.getDuration = getDuration;
    this.isDragging = false;
    this._lastRatio = 0;

    // Fill element (must already exist inside container)
    this.fill = container.querySelector('.global-player-progress-fill')
      || container.querySelector('[data-progress-fill]');

    // Create knob
    this.knob = document.createElement('div');
    this.knob.className = 'progress-knob';
    container.appendChild(this.knob);

    // Create time tooltip
    this.tooltip = document.createElement('div');
    this.tooltip.className = 'progress-tooltip';
    container.appendChild(this.tooltip);

    // Bind events
    this._onPointerDown = this._onPointerDown.bind(this);
    this._onPointerMove = this._onPointerMove.bind(this);
    this._onPointerUp = this._onPointerUp.bind(this);

    container.addEventListener('pointerdown', this._onPointerDown);

    // Prevent browser scroll on touch
    container.style.touchAction = 'none';
  }

  /** Programmatic progress update (0–1). Ignored while user is dragging. */
  setProgress(ratio) {
    if (this.isDragging) return;
    this._lastRatio = ratio;
    this._applyVisual(ratio);
  }

  // ---- internals ----

  _getRatio(e) {
    const rect = this.container.getBoundingClientRect();
    return Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
  }

  _applyVisual(ratio) {
    const pct = (ratio * 100).toFixed(2);
    if (this.fill) {
      this.fill.style.width = `${pct}%`;
    }
    this.knob.style.left = `${pct}%`;
  }

  _showTooltip(ratio, e) {
    const duration = this.getDuration?.() ?? 0;
    if (!Number.isFinite(duration) || duration <= 0) {
      this.tooltip.style.display = 'none';
      return;
    }
    const seconds = Math.round(ratio * duration);
    const mm = Math.floor(seconds / 60);
    const ss = String(seconds % 60).padStart(2, '0');
    const hrs = Math.floor(mm / 60);
    this.tooltip.textContent = hrs > 0
      ? `${hrs}:${String(mm % 60).padStart(2, '0')}:${ss}`
      : `${mm}:${ss}`;
    this.tooltip.style.display = 'block';
    // Position above pointer, clamped to container bounds
    const rect = this.container.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const half = this.tooltip.offsetWidth / 2;
    this.tooltip.style.left = `${Math.max(half, Math.min(rect.width - half, x))}px`;
  }

  _hideTooltip() {
    this.tooltip.style.display = 'none';
  }

  _onPointerDown(e) {
    e.stopPropagation();
    e.preventDefault();
    this.isDragging = true;
    this.container.classList.add('is-scrubbing');
    this.container.setPointerCapture?.(e.pointerId);

    const ratio = this._getRatio(e);
    this._applyVisual(ratio);
    this._showTooltip(ratio, e);
    this.onScrub?.(ratio);

    window.addEventListener('pointermove', this._onPointerMove);
    window.addEventListener('pointerup', this._onPointerUp);
  }

  _onPointerMove(e) {
    if (!this.isDragging) return;
    const ratio = this._getRatio(e);
    this._applyVisual(ratio);
    this._showTooltip(ratio, e);
    this.onScrub?.(ratio);
  }

  _onPointerUp(e) {
    if (!this.isDragging) return;
    this.isDragging = false;
    this.container.classList.remove('is-scrubbing');
    this._hideTooltip();

    window.removeEventListener('pointermove', this._onPointerMove);
    window.removeEventListener('pointerup', this._onPointerUp);

    const ratio = this._getRatio(e);
    this._applyVisual(ratio);
    this.onSeek?.(ratio);
  }

  destroy() {
    this.container.removeEventListener('pointerdown', this._onPointerDown);
    window.removeEventListener('pointermove', this._onPointerMove);
    window.removeEventListener('pointerup', this._onPointerUp);
    this.knob.remove();
    this.tooltip.remove();
  }
}

