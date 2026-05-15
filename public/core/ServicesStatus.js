/**
 * ServicesStatus — Global service readiness tracking for Chromic Engine.
 * Checks backend services (aligner, Python, AI) and enables/disables UI elements accordingly.
 */

class ServicesStatus {
  constructor() {
    this._status = null;
    this._lastFetchAt = 0;
    this._cacheTTL = 30000; // Cache for 30 seconds
    this._listeners = new Set();
    this._init();
  }

  _init() {
    // Fetch on load
    this.fetch();

    // Listen for services status events from AI Hub
    document.addEventListener('chromic:services-status', (e) => {
      this._status = e.detail;
      this._lastFetchAt = Date.now();
      this._notifyListeners();
    });
  }

  /** Fetch fresh status from backend */
  async fetch() {
    try {
      const res = await fetch('/api/services/status');
      if (!res.ok) return null;
      const data = await res.json();
      this._status = data;
      this._lastFetchAt = Date.now();
      document.dispatchEvent(new CustomEvent('chromic:services-status', { detail: data }));
      return data;
    } catch (e) {
      console.warn('[ServicesStatus] Failed to fetch:', e);
      return null;
    }
  }

  /** Get cached status, or fetch if stale */
  async getStatus(forceRefresh = false) {
    if (forceRefresh || !this._status || Date.now() - this._lastFetchAt > this._cacheTTL) {
      await this.fetch();
    }
    return this._status;
  }

  /** Quick ping check for aligner readiness */
  async pingAligner() {
    try {
      const res = await fetch('/api/aligner/ping');
      const data = await res.json();
      return data;
    } catch (e) {
      return { ok: false, reason: 'fetch-error', error: e.message };
    }
  }

  /** Subscribe to status changes */
  subscribe(callback) {
    this._listeners.add(callback);
    // Immediately call with current status if available
    if (this._status) callback(this._status);
  }

  /** Unsubscribe from status changes */
  unsubscribe(callback) {
    this._listeners.delete(callback);
  }

  _notifyListeners() {
    this._listeners.forEach(cb => cb(this._status));
  }

  // ─── Readiness Checks ──────────────────────────────────────────────────────

  /** Check if Python environment is ready */
  get pythonReady() {
    return this._status?.python?.ready ?? false;
  }

  /** Check if aligner is ready */
  get alignerReady() {
    return this._status?.aligner?.ready ?? false;
  }

  /** Check if Whisper is ready */
  get whisperReady() {
    return this._status?.whisper?.ready ?? false;
  }

  /** Check if AI is configured (has API key) */
  get aiConfigured() {
    return this._status?.ai?.configured ?? false;
  }

  /** Check if any setup is needed */
  get needsSetup() {
    return !this.pythonReady || !this.alignerReady;
  }

  /** Get reason for setup requirement */
  get setupReason() {
    if (!this._status) return 'loading';
    if (!this._status.python?.ready) return 'python-not-ready';
    if (!this._status.aligner?.ready) return this._status.aligner?.error || 'aligner-not-ready';
    return null;
  }

  // ─── UI Helpers ────────────────────────────────────────────────────────────

  /**
   * Apply disabled state to elements that require aligner.
   * Call this after rendering UI elements.
   * @param {HTMLElement} container - Container to search for elements
   */
  applyAlignerState(container = document) {
    const elements = container.querySelectorAll('[data-requires-aligner]');
    const ready = this.alignerReady;
    elements.forEach(el => {
      if (ready) {
        el.disabled = false;
        el.classList.remove('requires-setup');
        el.removeAttribute('data-disabled-reason');
      } else {
        el.disabled = true;
        el.classList.add('requires-setup');
        el.setAttribute('data-disabled-reason', this.setupReason || 'Setup Python first');
      }
    });
  }

  /**
   * Apply disabled state to elements that require AI configuration.
   * @param {HTMLElement} container - Container to search for elements
   */
  applyAIState(container = document) {
    const elements = container.querySelectorAll('[data-requires-ai]');
    const ready = this.aiConfigured;
    elements.forEach(el => {
      if (ready) {
        el.disabled = false;
        el.classList.remove('requires-ai-setup');
      } else {
        el.disabled = true;
        el.classList.add('requires-ai-setup');
        el.setAttribute('data-disabled-reason', 'Configure AI API key first');
      }
    });
  }

  /**
   * Create a status indicator element.
   * @returns {HTMLElement}
   */
  createStatusIndicator() {
    const indicator = document.createElement('div');
    indicator.className = 'service-status-indicator';
    this._updateStatusIndicator(indicator);
    this.subscribe(() => this._updateStatusIndicator(indicator));
    return indicator;
  }

  _updateStatusIndicator(el) {
    const s = this._status;
    if (!s) {
      el.innerHTML = '<span class="status-loading">Checking services...</span>';
      return;
    }

    const items = [
      { name: 'Python', ready: s.python?.ready },
      { name: 'Aligner', ready: s.aligner?.ready },
      { name: 'AI', ready: s.ai?.configured },
    ];

    el.innerHTML = items.map(item => `
      <span class="status-item ${item.ready ? 'is-ready' : 'needs-setup'}">
        ${item.ready ? '✓' : '○'} ${item.name}
      </span>
    `).join('');
  }
}

// Export singleton
export const servicesStatus = new ServicesStatus();
export default servicesStatus;

