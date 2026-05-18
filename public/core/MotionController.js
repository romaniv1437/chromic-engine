/**
 * MotionController — Chromic-grade spring physics animation engine.
 * Uses stiffness/damping/mass model instead of fixed CSS durations.
 * All animations are interruptible and GPU-accelerated (transform/opacity only).
 */

const REDUCED_MOTION = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if(window.__DEBUG__)console.log('[MotionController] REDUCED_MOTION =', REDUCED_MOTION);

// --- Spring Physics ---

/**
 * Spring solver: f(x) = -k*x - c*v
 * @param {number} stiffness - Spring constant (k). Higher = snappier. Default 170.
 * @param {number} damping - Resistance (c). Higher = less bounce. Default 26.
 * @param {number} mass - Object mass. Higher = more inertia. Default 1.
 */
export class Spring {
  constructor({ stiffness = 170, damping = 26, mass = 1, precision = 0.01 } = {}) {
    this.stiffness = stiffness;
    this.damping = damping;
    this.mass = mass;
    this.precision = precision;
  }

  /**
   * Tick the spring one step.
   * @param {number} current - Current value
   * @param {number} velocity - Current velocity
   * @param {number} target - Target value
   * @param {number} dt - Time delta in seconds
   * @returns {{ value: number, velocity: number, done: boolean }}
   */
  step(current, velocity, target, dt) {
    const displacement = current - target;
    const springForce = -this.stiffness * displacement;
    const dampingForce = -this.damping * velocity;
    const acceleration = (springForce + dampingForce) / this.mass;

    const newVelocity = velocity + acceleration * dt;
    const newValue = current + newVelocity * dt;

    const done =
      Math.abs(newVelocity) < this.precision && Math.abs(newValue - target) < this.precision;

    return { value: done ? target : newValue, velocity: done ? 0 : newVelocity, done };
  }
}

// --- Animation Scheduler (single rAF loop) ---

class AnimationScheduler {
  constructor() {
    this._animations = new Map(); // id → animation state
    this._running = false;
    this._frameId = null;
    this._lastTime = 0;
    this._throttle = 1; // 1 = every frame, 2 = every other frame
    this._frameCounter = 0;
  }

  /**
   * Start or replace an animation for a given id.
   * If an animation with the same id is running, it's interrupted (continues from current state).
   */
  animate(id, { spring, from, to, onUpdate, onComplete }) {
    if (REDUCED_MOTION) {
      console.warn('[MotionController] SKIPPING animation (REDUCED_MOTION=true):', id);
      onUpdate(to, 0);
      onComplete?.();
      return { cancel: () => {} };
    }

    const existing = this._animations.get(id);
    const startValue = existing ? existing.currentValue : from;
    const startVelocity = existing ? existing.velocity : 0;

    const state = {
      spring: spring || new Spring(),
      currentValue: startValue,
      velocity: startVelocity,
      target: to,
      onUpdate,
      onComplete,
      cancelled: false,
    };

    this._animations.set(id, state);
    this._start();

    return {
      cancel: () => {
        state.cancelled = true;
        this._animations.delete(id);
      },
    };
  }

  /**
   * Animate multiple values simultaneously (e.g., x, y, scale, opacity).
   */
  animateMulti(id, { springs, from, to, onUpdate, onComplete }) {
    if (REDUCED_MOTION) {
      console.warn('[MotionController] SKIPPING animation (REDUCED_MOTION=true):', id);
      onUpdate(to);
      onComplete?.();
      return { cancel: () => {} };
    }

    const keys = Object.keys(from);
    const existing = this._animations.get(id);

    const state = {
      isMulti: true,
      keys,
      springs: {},
      values: {},
      velocities: {},
      targets: to,
      onUpdate,
      onComplete,
      cancelled: false,
    };

    for (const key of keys) {
      state.springs[key] = springs?.[key] || springs?.default || new Spring();
      state.values[key] = existing?.isMulti ? (existing.values[key] ?? from[key]) : from[key];
      state.velocities[key] = existing?.isMulti ? (existing.velocities[key] ?? 0) : 0;
    }

    this._animations.set(id, state);
    this._start();

    return {
      cancel: () => {
        state.cancelled = true;
        this._animations.delete(id);
      },
    };
  }

  _start() {
    if (this._running) return;
    this._running = true;
    this._lastTime = performance.now();
    this._frameId = requestAnimationFrame((t) => this._tick(t));
  }

  _tick(now) {
    this._frameCounter++;
    // Throttle: skip frames when video is playing to prioritize decoder
    if (this._throttle > 1 && this._frameCounter % this._throttle !== 0) {
      this._frameId = requestAnimationFrame((t) => this._tick(t));
      return;
    }

    const dt = Math.min((now - this._lastTime) / 1000, 0.064); // Cap at ~15fps minimum
    this._lastTime = now;

    const toRemove = [];

    for (const [id, state] of this._animations) {
      if (state.cancelled) {
        toRemove.push(id);
        continue;
      }

      if (state.isMulti) {
        let allDone = true;
        for (const key of state.keys) {
          const result = state.springs[key].step(
            state.values[key],
            state.velocities[key],
            state.targets[key],
            dt
          );
          state.values[key] = result.value;
          state.velocities[key] = result.velocity;
          if (!result.done) allDone = false;
        }
        state.onUpdate({ ...state.values });
        if (allDone) {
          state.onUpdate({ ...state.targets });
          state.onComplete?.();
          toRemove.push(id);
        }
      } else {
        const result = state.spring.step(state.currentValue, state.velocity, state.target, dt);
        state.currentValue = result.value;
        state.velocity = result.velocity;
        state.onUpdate(result.value, state.velocity);
        if (result.done) {
          state.onUpdate(state.target, 0);
          state.onComplete?.();
          toRemove.push(id);
        }
      }
    }

    for (const id of toRemove) {
      this._animations.delete(id);
    }

    if (this._animations.size > 0) {
      this._frameId = requestAnimationFrame((t) => this._tick(t));
    } else {
      this._running = false;
      this._frameId = null;
    }
  }

  cancel(id) {
    const state = this._animations.get(id);
    if (state) state.cancelled = true;
    this._animations.delete(id);
  }

  cancelAll() {
    this._animations.clear();
    this._running = false;
    if (this._frameId) cancelAnimationFrame(this._frameId);
    this._frameId = null;
  }
}

// Singleton scheduler
export const scheduler = new AnimationScheduler();

// --- Adaptive Performance Manager ---

/**
 * Manages will-change and animation throttling based on visibility + video playback.
 * Prevents VRAM exhaustion by only promoting visible elements to GPU layers.
 */
export class PerformanceManager {
  constructor() {
    this._observed = new Map(); // element → { observer, cleanup }
    this._throttleMode = false;
    this._videoCheckInterval = null;
    this._init();
  }

  _init() {
    // Monitor for active video playback — throttle non-essential animations
    this._videoCheckInterval = setInterval(() => {
      const video = document.querySelector('video:not([paused])');
      const shouldThrottle = video && !video.paused;
      if (shouldThrottle !== this._throttleMode) {
        this._throttleMode = shouldThrottle;
        scheduler._throttle = shouldThrottle ? 2 : 1; // Skip every other frame for bg animations
      }
    }, 1000);
  }

  /**
   * Register an element for visibility-based GPU promotion.
   * Only adds will-change when element is in viewport.
   */
  observe(el, { willChange = 'transform', onVisible, onHidden } = {}) {
    if (!el || this._observed.has(el)) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            el.style.willChange = willChange;
            onVisible?.();
          } else {
            el.style.willChange = '';
            onHidden?.();
          }
        }
      },
      { threshold: 0.05 }
    );

    observer.observe(el);
    this._observed.set(el, { observer, onVisible, onHidden });
  }

  unobserve(el) {
    const entry = this._observed.get(el);
    if (entry) {
      entry.observer.disconnect();
      el.style.willChange = '';
      this._observed.delete(el);
    }
  }

  destroy() {
    clearInterval(this._videoCheckInterval);
    for (const [el, entry] of this._observed) {
      entry.observer.disconnect();
      el.style.willChange = '';
    }
    this._observed.clear();
  }
}

export const perfManager = new PerformanceManager();

// --- Global Scroll Guardian ---

/**
 * GPU-Decoupled ScrollGuardian — promotes text layers to compositor during scroll.
 * Does NOT pause visualizer or GPU work. Only manages CPU-bound text layer isolation.
 * Emits 'scrollguard' CustomEvent on document with detail: { scrolling: boolean }
 * Subscribers: lyrics engine, backdrop-filters (NOT visualizers).
 */
class ScrollGuardian {
  constructor() {
    this.isScrolling = false;
    this._timeout = null;
    this._listeners = [];
    this._lyricsContainer = null;
    this._isResizing = false;
    this._resizeTimeout = null;
    this._init();
  }

  _init() {
    // Track resize so we ignore resize-triggered scroll events
    // Resize causes layout reflow which fires synthetic scroll events —
    // treating those as real scrolls gets isScrolling stuck and freezes the UI.
    window.addEventListener('resize', () => {
      this._isResizing = true;
      clearTimeout(this._resizeTimeout);
      this._resizeTimeout = setTimeout(() => {
        this._isResizing = false;
        // Force-clear stuck scroll state after resize settles
        if (this.isScrolling) {
          this.isScrolling = false;
          window._chromicScrollGuardianScrolling = false;
          this._promoteLayer(false);
          this._notifyListeners(false);
        }
      }, 200);
    }, { passive: true });

    // Reset scroll state when returning from app switch — browser fires synthetic
    // scroll events during visibility change that can leave isScrolling stuck.
    document.addEventListener('visibilitychange', () => {
      if (!document.hidden && this.isScrolling) {
        clearTimeout(this._timeout);
        this.isScrolling = false;
        window._chromicScrollGuardianScrolling = false;
        this._promoteLayer(false);
        this._notifyListeners(false);
      }
    });

    const handler = (e) => {
      // Ignore scroll events triggered by resize reflow
      if (this._isResizing) return;

      const target = e.target;
      if (target && (
        target.classList?.contains('music-immersive-lyrics-panel') ||
        target.closest?.('.music-immersive-lyrics-panel') ||
        target.closest?.('.music-immersive-shell')
      )) {
        return;
      }

      // Skip heavy processing during smooth scroll dampener — it fires scrollTo every rAF
      if (window._chromicSmoothScrollActive) {
        if (this.isScrolling) {
          clearTimeout(this._timeout);
          this._timeout = setTimeout(() => {
            this.isScrolling = false;
            window._chromicScrollGuardianScrolling = false;
            this._promoteLayer(false);
            this._notifyListeners(false);
          }, 80);
        }
        return;
      }

      if (!this.isScrolling) {
        this.isScrolling = true;
        window._chromicScrollGuardianScrolling = true;
        this._promoteLayer(true);
        this._notifyListeners(true);
      }
      clearTimeout(this._timeout);
      this._timeout = setTimeout(() => {
        this.isScrolling = false;
        window._chromicScrollGuardianScrolling = false;
        this._promoteLayer(false);
        this._notifyListeners(false);
      }, 80);
    };

    window.addEventListener('scroll', handler, { passive: true, capture: true });
    document.addEventListener('scroll', handler, { passive: true, capture: true });
  }

  /** GPU layer promotion: isolate text layer during scroll for compositor independence */
  _promoteLayer(scrolling) {
    if (!this._lyricsContainer) {
      this._lyricsContainer = document.querySelector('.lyrics-container');
    }
    if (this._lyricsContainer) {
      this._lyricsContainer.style.willChange = scrolling ? 'transform' : 'auto';
    }
  }

  _notifyListeners(scrolling) {
    for (const fn of this._listeners) {
      try { fn(scrolling); } catch (_) {}
    }
  }

  /** Register a callback: fn(isScrolling: boolean) */
  subscribe(fn) {
    this._listeners.push(fn);
    return () => {
      this._listeners = this._listeners.filter(f => f !== fn);
    };
  }
}

export const scrollGuardian = new ScrollGuardian();
window._chromicScrollGuardian = scrollGuardian;

// --- Shared Element Transition ---

/**
 * Performs a FLIP-based shared element morph between two elements.
 * The target element animates from the source's position/size to its own.
 * Uses spring physics — fully interruptible.
 */
export function sharedElementTransition({
  sourceEl,
  targetEl,
  spring = new Spring({ stiffness: 200, damping: 28, mass: 1 }),
  onStart,
  onComplete,
  id,
}) {
  if (!sourceEl || !targetEl) return { cancel: () => {} };

  const sourceRect = sourceEl.getBoundingClientRect();
  const targetRect = targetEl.getBoundingClientRect();

  // Calculate deltas (Invert step of FLIP)
  const dx = sourceRect.left - targetRect.left;
  const dy = sourceRect.top - targetRect.top;
  const sw = sourceRect.width / targetRect.width;
  const sh = sourceRect.height / targetRect.height;

  onStart?.();

  // Ensure target is visible
  targetEl.style.willChange = 'transform, opacity';
  targetEl.style.transformOrigin = '0 0';

  const animId = id || `shared-${Date.now()}`;

  return scheduler.animateMulti(animId, {
    springs: { default: spring },
    from: { x: dx, y: dy, sx: sw, sy: sh, opacity: 0 },
    to: { x: 0, y: 0, sx: 1, sy: 1, opacity: 1 },
    onUpdate: (vals) => {
      targetEl.style.transform = `translate3d(${vals.x}px, ${vals.y}px, 0) scale(${vals.sx}, ${vals.sy})`;
      targetEl.style.opacity = String(Math.min(1, vals.opacity));
    },
    onComplete: () => {
      targetEl.style.willChange = '';
      targetEl.style.transform = '';
      targetEl.style.transformOrigin = '';
      targetEl.style.opacity = '';
      onComplete?.();
    },
  });
}

// --- Presets ---

export const SPRING_PRESETS = {
  snappy: new Spring({ stiffness: 300, damping: 30, mass: 1 }),
  gentle: new Spring({ stiffness: 120, damping: 20, mass: 1 }),
  bouncy: new Spring({ stiffness: 180, damping: 12, mass: 1 }),
  heavy: new Spring({ stiffness: 120, damping: 30, mass: 2 }),
  quick: new Spring({ stiffness: 400, damping: 35, mass: 0.8 }),
};



