/**
 * ImagePool — Chromic Engine for managing thousands of images efficiently.
 *
 * Strategy: "Aggressive Fill" instead of "Wait for GPU"
 * - During fast scroll: set src immediately (no decode wait) — image appears ASAP
 * - During idle/slow scroll: use img.decode() for smooth pixel-perfect reveals
 * - rootMargin = 1500px (3-4 screens ahead) so images load well before visible
 * - LRU decode cache keeps 300 decoded Image objects in JS heap
 * - Unload images 6 screens away to cap GPU memory
 */


// --- Scroll Velocity Detector ---
const _scrollState = {
  velocity: 0,
  lastY: 0,
  lastTime: 0,
  isFast: false,
  _raf: 0,
};

const FAST_THRESHOLD = 800; // px/s — above this, skip decode

const _trackScroll = () => {
  const now = performance.now();
  const y = window.scrollY || document.documentElement.scrollTop;
  if (_scrollState.lastTime) {
    const dt = now - _scrollState.lastTime;
    if (dt > 0) {
      _scrollState.velocity = Math.abs(y - _scrollState.lastY) / dt * 1000;
      _scrollState.isFast = _scrollState.velocity > FAST_THRESHOLD;
    }
  }
  _scrollState.lastY = y;
  _scrollState.lastTime = now;
};

// Passive scroll listener — zero perf impact
let _scrollListenerAdded = false;
const _ensureScrollListener = () => {
  if (_scrollListenerAdded) return;
  _scrollListenerAdded = true;
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(() => {
        _trackScroll();
        ticking = false;
      });
    }
  }, { passive: true });
  // Reset velocity when scroll stops
  let scrollTimer = 0;
  window.addEventListener('scroll', () => {
    clearTimeout(scrollTimer);
    scrollTimer = setTimeout(() => {
      _scrollState.velocity = 0;
      _scrollState.isFast = false;
    }, 150);
  }, { passive: true });
};

/**
 * LRU Decode Cache — keeps decoded Image objects in JS memory to avoid re-decode cost.
 */
class DecodeCache {
  constructor(maxSize = 300) {
    this._max = maxSize;
    this._map = new Map();
  }

  get(url) {
    const img = this._map.get(url);
    if (img) {
      this._map.delete(url);
      this._map.set(url, img);
    }
    return img || null;
  }

  set(url, img) {
    if (this._map.has(url)) this._map.delete(url);
    this._map.set(url, img);
    while (this._map.size > this._max) {
      const first = this._map.keys().next().value;
      this._map.delete(first);
    }
  }

  has(url) {
    return this._map.has(url);
  }
}

const _decodeCache = new DecodeCache(1200);

/**
 * Manages image loading/unloading for a scrollable grid.
 */
export class ImagePool {
  /**
   * @param {{ rootMargin?: string, unloadMargin?: string, onLoad?: Function }} options
   */
  constructor({ rootMargin = '1500px 0px', unloadMargin = '3000px 0px', onLoad = null } = {}) {
    this._onLoad = onLoad;
    this._observed = new Set();
    _ensureScrollListener();

    this._loadObserver = new IntersectionObserver(
      (entries) => this._handleLoad(entries),
      { rootMargin, threshold: 0 }
    );

    this._unloadObserver = new IntersectionObserver(
      (entries) => this._handleUnload(entries),
      { rootMargin: unloadMargin, threshold: 0 }
    );
  }

  observe(img) {
    if (!img || this._observed.has(img)) return;
    this._observed.add(img);
    this._loadObserver.observe(img);
    this._unloadObserver.observe(img);
  }

  observeAll(container) {
    if (!container) return;
    container.querySelectorAll('img[data-src]').forEach((img) => this.observe(img));
  }

  unobserve(img) {
    this._observed.delete(img);
    this._loadObserver.unobserve(img);
    this._unloadObserver.unobserve(img);
  }

  destroy() {
    this._loadObserver.disconnect();
    this._unloadObserver.disconnect();
    this._observed.clear();
  }

  /**
   * Force-load all currently observed images instantly (return from detail view).
   */
  revealAll() {
    for (const img of this._observed) {
      if (!img._ipLoaded) {
        this._loadImage(img, true); // force instant mode
      }
    }
  }

  // --- Internal ---

  _handleLoad(entries) {
    for (const entry of entries) {
      if (entry.isIntersecting && !entry.target._ipLoaded) {
        const img = entry.target;
        const src = img.dataset.src;
        // If src is already set correctly (kept in cache), just re-mark as loaded
        // Don't require naturalWidth > 0 — the browser HTTP cache will serve it without re-fetch
        if (src && img.src && img.src.includes(src.split('?')[0])) {
          img._ipLoaded = true;
          const card = img.closest('.music-album-grid-item') || img.parentElement;
          if (card && !card.classList.contains('img-loaded-instant') && !card.classList.contains('img-loaded')) {
            card.classList.add('img-loaded-instant');
            card.classList.remove('img-loading');
          }
          continue;
        }
        this._loadImage(img, false);
      }
    }
  }

  _handleUnload(entries) {
    for (const entry of entries) {
      if (!entry.isIntersecting && entry.target._ipLoaded) {
        this._unloadImage(entry.target);
      }
    }
  }

  /**
   * Core loading logic — adapts to scroll speed.
   * @param {HTMLImageElement} img
   * @param {boolean} forceInstant - Skip any decode wait
   */
  _loadImage(img, forceInstant) {
    const src = img.dataset.src;
    if (!src) return;

    // Already displaying this image correctly — just re-mark as loaded, no re-fetch
    if (img.src && img.src.includes(src.split('?')[0])) {
      img._ipLoaded = true;
      const card = img.closest('.music-album-grid-item') || img.parentElement;
      if (card && !card.classList.contains('img-loaded-instant') && !card.classList.contains('img-loaded')) {
        card.classList.add('img-loaded-instant');
        card.classList.remove('img-loading');
      }
      return;
    }

    const card = img.closest('.music-album-grid-item') || img.parentElement;

    // 1. LRU cache hit → instant (0ms, already decoded in JS heap)
    if (_decodeCache.has(src)) {
      _decodeCache.get(src); // touch LRU
      img.src = src;
      img._ipLoaded = true;
      if (card) {
        card.classList.add('img-loaded-instant');
        card.classList.remove('img-loading');
      }
      this._onLoad?.(img, card);
      return;
    }

    // 2. Determine strategy: fast scroll or force → immediate src (no decode wait)
    const useImmediate = forceInstant || _scrollState.isFast;

    // 3. Probe browser HTTP cache
    const probe = new Image();
    probe.src = src;

    if (probe.complete && probe.naturalWidth > 0) {
      // Browser cache hit
      img.src = src;
      img._ipLoaded = true;
      _decodeCache.set(src, probe);
      if (card) {
        card.classList.add('img-loaded-instant');
        card.classList.remove('img-loading');
      }
      // Background decode for GPU prep (non-blocking)
      if (img.decode && !useImmediate) {
        img.decode().catch(() => {});
      }
      this._onLoad?.(img, card);
    } else {
      // Network fetch required
      if (card) card.classList.add('img-loading');

      probe.onload = () => {
        _decodeCache.set(src, probe);

        if (useImmediate || _scrollState.isFast) {
          // Fast scroll: show immediately, decode in background
          img.src = src;
          img._ipLoaded = true;
          if (card) {
            card.classList.remove('img-loading');
            card.classList.add('img-loaded-instant');
          }
          this._onLoad?.(img, card);
          // Fire-and-forget decode hint
          if (img.decode) img.decode().catch(() => {});
        } else {
          // Idle: decode first for smooth reveal
          img.src = src;
          const reveal = () => {
            img._ipLoaded = true;
            if (card) {
              card.classList.remove('img-loading');
              card.classList.add('img-loaded');
            }
            this._onLoad?.(img, card);
          };
          if (img.decode) {
            img.decode().then(reveal).catch(reveal);
          } else {
            reveal();
          }
        }
      };

      probe.onerror = () => {
        img.src = src;
        img._ipLoaded = true;
        if (card) card.classList.remove('img-loading');
      };
    }
  }

  _unloadImage(img) {
    const src = img.dataset.src;
    // Keep src intact to avoid visible reload flicker — just mark as needing re-observe
    // Only truly unload (set placeholder) for images very far from viewport
    img._ipLoaded = false;
    // If image is in decode cache, it will re-show instantly anyway
    if (src && _decodeCache.has(src)) return;
    // Keep the current src to leverage browser cache — no placeholder swap
    // The browser will handle memory pressure via its own cache eviction
  }
}

/**
 * Singleton pool for the music album grid.
 */
export const albumImagePool = new ImagePool({
  rootMargin: '3000px 0px',   // Load 6-8 screens ahead — no loading flash while scrolling
  unloadMargin: '6000px 0px', // Unload 10+ screens away to cap GPU memory
});





