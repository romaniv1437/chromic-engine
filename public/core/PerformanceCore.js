/**
 * PerformanceCore — Consolidated GPU resource management & scroll performance.
 * Zero-DOM ScrollGuardian + adaptive GPU layer promotion.
 * Re-exports from MotionController for backwards compatibility.
 */

import { scrollGuardian, perfManager, scheduler } from './MotionController.js';

// Re-export existing singletons
export { scrollGuardian, perfManager, scheduler };

// --- GPU Promotion Utility ---

const _promotedElements = new WeakMap(); // element → timeoutId

/**
 * Promote an element to its own GPU compositor layer.
 * Automatically demotes 500ms after the last call to prevent VRAM bloat.
 * @param {HTMLElement} el
 * @param {string} [hint='transform'] - will-change value
 */
export function promote(el, hint = 'transform') {
  if (!el) return;

  const existing = _promotedElements.get(el);
  if (existing) clearTimeout(existing);

  el.style.willChange = hint;

  const timeout = setTimeout(() => {
    el.style.willChange = '';
    _promotedElements.delete(el);
  }, 500);

  _promotedElements.set(el, timeout);
}

/**
 * Immediately demote an element from GPU layer.
 */
export function demote(el) {
  if (!el) return;
  const existing = _promotedElements.get(el);
  if (existing) clearTimeout(existing);
  el.style.willChange = '';
  _promotedElements.delete(el);
}

// --- FPS Throttle Control ---

let _currentMaxFps = 0; // 0 = unlimited

/**
 * Set global FPS cap for non-critical animations.
 * @param {number} fps - Target FPS (0 = unlimited)
 */
export function setGlobalFpsCap(fps) {
  _currentMaxFps = fps;
  // Communicate to scheduler via throttle ratio
  if (fps > 0 && fps < 60) {
    scheduler._throttle = Math.max(1, Math.round(60 / fps));
  } else {
    scheduler._throttle = 1;
  }
}

export function getGlobalFpsCap() {
  return _currentMaxFps;
}

// --- Scroll-Aware Animation Coordinator ---

/**
 * Subscribe to scroll state changes for pausing expensive work.
 * Returns unsubscribe function.
 * @param {(isScrolling: boolean) => void} callback
 */
export function onScrollStateChange(callback) {
  return scrollGuardian.subscribe(callback);
}

/**
 * Check if user is currently scrolling (JS flag only — zero DOM).
 */
export function isScrolling() {
  return scrollGuardian.isScrolling;
}

// --- Composite API ---

export const PerformanceCore = {
  promote,
  demote,
  setGlobalFpsCap,
  getGlobalFpsCap,
  onScrollStateChange,
  isScrolling,
  scrollGuardian,
  perfManager,
  scheduler,
};

export default PerformanceCore;

