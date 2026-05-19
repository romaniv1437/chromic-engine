/**
 * MotionEffects — High-level interaction effects powered by MotionController.
 * 3D tilt, magnetic hover, backdrop glow, staggered entry, cinematic backgrounds.
 */

import { scheduler, Spring, SPRING_PRESETS } from './MotionController.js';
import { perfManager, scrollGuardian } from './MotionController.js';

const REDUCED_MOTION = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// --- 3D Tilt Effect ---

/**
 * Applies a 3D perspective tilt that follows the cursor.
 * Includes glossy light overlay that moves opposite to tilt direction.
 * @param {HTMLElement} el
 * @param {{ maxTilt?: number, perspective?: number, scale?: number, glossy?: boolean }} options
 * @returns {{ destroy: () => void }}
 */
export function tilt3D(el, { maxTilt = 6, perspective = 1200, scale = 1.02, glossy = true } = {}) {
  if (REDUCED_MOTION || !el) return { destroy: () => {} };

  let glossEl = null;
  let initialized = false;
  let targetTiltX = 0, targetTiltY = 0;
  let currentTiltX = 0, currentTiltY = 0;
  let animating = false;

  const init = () => {
    if (initialized) return;
    initialized = true;
    el.style.transformStyle = 'preserve-3d';
    if (glossy) {
      glossEl = document.createElement('div');
      glossEl.className = 'motion-gloss-overlay';
      glossEl.style.cssText = `
        position: absolute; inset: 0; pointer-events: none; border-radius: inherit;
        background: radial-gradient(circle at 50% 50%, rgba(255,255,255,0.15) 0%, transparent 60%);
        opacity: 0; transition: opacity 0.2s;
      `;
      el.style.position = el.style.position || 'relative';
      el.appendChild(glossEl);
    }
  };

  const applyTransform = () => {
    el.style.transform = `perspective(${perspective}px) rotateX(${currentTiltX}deg) rotateY(${currentTiltY}deg) scale3d(${scale},${scale},1)`;
  };

  const animateSpring = () => {
    if (scrollGuardian.isScrolling) {
      currentTiltX = 0; currentTiltY = 0;
      targetTiltX = 0; targetTiltY = 0;
      el.style.transform = '';
      el.style.willChange = '';
      if (glossEl) glossEl.style.opacity = '0';
      animating = false;
      return;
    }
    const dx = targetTiltX - currentTiltX;
    const dy = targetTiltY - currentTiltY;
    currentTiltX += dx * 0.12;
    currentTiltY += dy * 0.12;
    applyTransform();

    if (Math.abs(dx) > 0.01 || Math.abs(dy) > 0.01) {
      requestAnimationFrame(animateSpring);
    } else {
      currentTiltX = targetTiltX;
      currentTiltY = targetTiltY;
      if (targetTiltX === 0 && targetTiltY === 0) {
        el.style.transform = '';
      } else {
        applyTransform();
      }
      animating = false;
    }
  };

  const startAnim = () => {
    if (!animating) {
      animating = true;
      requestAnimationFrame(animateSpring);
    }
  };

  let _raf = 0;
  const onMove = (e) => {
    if (scrollGuardian.isScrolling) return;
    if (_raf) return;
    _raf = requestAnimationFrame(() => {
      _raf = 0;
      init();
      if (!el.style.willChange) el.style.willChange = 'transform';
      const rect = el.getBoundingClientRect();
      const x = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
      const y = Math.max(0, Math.min(1, (e.clientY - rect.top) / rect.height));
      targetTiltX = (0.5 - y) * maxTilt * 2;
      targetTiltY = (x - 0.5) * maxTilt * 2;
      startAnim();
      if (glossEl) {
        glossEl.style.opacity = '1';
        glossEl.style.background = `radial-gradient(circle at ${x * 100}% ${y * 100}%, rgba(255,255,255,0.18) 0%, transparent 50%)`;
      }
    });
  };

  const onLeave = () => {
    targetTiltX = 0;
    targetTiltY = 0;
    startAnim();
    if (_raf) { cancelAnimationFrame(_raf); _raf = 0; }
    if (glossEl) glossEl.style.opacity = '0';
    setTimeout(() => { if (!animating) el.style.willChange = ''; }, 300);
  };

  el.addEventListener('pointermove', onMove);
  el.addEventListener('pointerleave', onLeave);

  return {
    destroy: () => {
      el.removeEventListener('pointermove', onMove);
      el.removeEventListener('pointerleave', onLeave);
      if (_raf) cancelAnimationFrame(_raf);
      el.style.transform = '';
      el.style.transformStyle = '';
      el.style.willChange = '';
      glossEl?.remove();
    },
  };
}

// --- Magnetic Hover ---

/**
 * Pulls element toward cursor within a radius, creating a "magnetic" feel.
 * @param {HTMLElement} el
 * @param {{ strength?: number, radius?: number }} options
 * @returns {{ destroy: () => void }}
 */
export function magneticHover(el, { strength = 0.3, radius = 50 } = {}) {
  if (REDUCED_MOTION || !el) return { destroy: () => {} };

  el.style.willChange = 'transform';
  el.style.transition = 'transform 0.2s cubic-bezier(0.22, 1, 0.36, 1)';

  const onMove = (e) => {
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = e.clientX - cx;
    const dy = e.clientY - cy;
    const dist = Math.sqrt(dx * dx + dy * dy);

    if (dist < radius) {
      el.style.transform = `translate3d(${dx * strength}px, ${dy * strength}px, 0)`;
    }
  };

  const onLeave = () => {
    el.style.transform = 'translate3d(0, 0, 0)';
  };

  el.addEventListener('pointermove', onMove);
  el.addEventListener('pointerleave', onLeave);

  return {
    destroy: () => {
      el.removeEventListener('pointermove', onMove);
      el.removeEventListener('pointerleave', onLeave);
      el.style.transform = '';
      el.style.willChange = '';
      el.style.transition = '';
    },
  };
}

// --- Backdrop Glow ---

/**
 * Adds a colored glow behind an element using palette-extracted colors.
 * @param {HTMLElement} el
 * @param {string[]} colors - Array of hex/rgb colors from palette
 * @param {{ intensity?: number, blur?: number }} options
 * @returns {{ destroy: () => void, update: (colors: string[]) => void }}
 */
export function backdropGlow(el, colors = ['#7dd6ff'], { intensity = 0.5, blur = 40 } = {}) {
  if (REDUCED_MOTION || !el) return { destroy: () => {}, update: () => {} };

  let glowEl = el.querySelector('.motion-backdrop-glow');
  if (!glowEl) {
    glowEl = document.createElement('div');
    glowEl.className = 'motion-backdrop-glow';
    glowEl.style.cssText = `
      position: absolute; inset: -20%; z-index: -1; pointer-events: none;
      border-radius: 50%; filter: blur(${blur}px);
      opacity: ${intensity}; transition: background 0.6s ease, opacity 0.4s ease;
    `;
    el.style.position = el.style.position || 'relative';
    el.insertBefore(glowEl, el.firstChild);
  }

  const applyColors = (c) => {
    const primary = c[0] || '#7dd6ff';
    const secondary = c[1] || primary;
    glowEl.style.background = `radial-gradient(ellipse at center, ${primary} 0%, ${secondary} 50%, transparent 70%)`;
  };

  applyColors(colors);

  return {
    update: (newColors) => applyColors(newColors),
    destroy: () => glowEl?.remove(),
  };
}

// --- Staggered Entry Animation ---

/**
 * Animates a list of elements into view with spring-physics stagger.
 * Uses IntersectionObserver for lazy triggering.
 * @param {HTMLElement[]} elements
 * @param {{ stagger?: number, from?: object, spring?: Spring }} options
 * @returns {{ destroy: () => void }}
 */
export function staggeredEntry(
  elements,
  { stagger = 50, from = { y: 30, opacity: 0, scale: 0.92 }, spring, persistent = true } = {}
) {
  if (REDUCED_MOTION || !elements?.length) {
    elements?.forEach((el) => { el.style.opacity = ''; el.style.transform = ''; });
    return { destroy: () => {} };
  }

  // Only animate elements currently in/near viewport on first load
  // Off-screen elements are left untouched (visible by default, content-visibility handles rendering)
  const viewH = window.innerHeight;
  const toAnimate = [];

  for (const el of elements) {
    if (el._staggerDone || el.dataset.staggerRevealed) {
      el._staggerVisible = true;
      el._staggerDone = true;
      el.style.opacity = '1';
      continue;
    }
    const rect = el.getBoundingClientRect();
    if (rect.top < viewH + 100) {
      // In viewport: will be animated (CSS already has opacity:0)
      el.style.transform = `translate3d(0,${from.y}px,0) scale(${from.scale})`;
      toAnimate.push(el);
    } else {
      // Off-screen: show immediately (override CSS opacity:0)
      el.style.opacity = '1';
      el._staggerDone = true;
      el._staggerVisible = true;
    }
  }

  // Stagger-reveal the visible batch
  toAnimate.forEach((el, i) => {
    el._staggerVisible = true;
    const delay = i * 20; // Fast stagger: 20ms between each
    setTimeout(() => {
      el.style.transition = 'opacity 0.25s ease-out, transform 0.3s cubic-bezier(0.22,1,0.36,1)';
      el.style.opacity = '1';
      el.style.transform = '';
      el._staggerDone = true;
      setTimeout(() => { el.style.transition = ''; }, 350);
    }, delay);
  });

  return {
    destroy: () => {
      elements.forEach((el) => {
        el.style.opacity = '1';
        el.style.transform = '';
        el.style.transition = '';
        el.style.willChange = '';
        el._staggerVisible = true;
        el._staggerDone = true;
      });
    },
  };
}

// --- Cinematic Background (Breathing Blur) ---

/**
 * Creates a slowly breathing background effect (scale oscillation).
 * @param {HTMLElement} el - Background image element
 * @param {{ minScale?: number, maxScale?: number, duration?: number }} options
 * @returns {{ destroy: () => void }}
 */
export function cinematicBackground(el, { minScale = 1.0, maxScale = 1.05, duration = 8000 } = {}) {
  if (REDUCED_MOTION || !el) return { destroy: () => {} };

  el.style.willChange = 'transform';
  let frameId;
  let start = performance.now();

  const tick = (now) => {
    const elapsed = now - start;
    const t = (Math.sin((elapsed / duration) * Math.PI * 2) + 1) / 2; // 0..1 oscillation
    const scale = minScale + (maxScale - minScale) * t;
    el.style.transform = `scale(${scale})`;
    frameId = requestAnimationFrame(tick);
  };

  frameId = requestAnimationFrame(tick);

  return {
    destroy: () => {
      cancelAnimationFrame(frameId);
      el.style.transform = '';
      el.style.willChange = '';
    },
  };
}

// --- Haptic Brightness Hover ---

/**
 * Adds subtle brightness increase on hover for "premium" feel.
 * @param {HTMLElement} el
 * @param {{ brightness?: number }} options
 * @returns {{ destroy: () => void }}
 */
export function hapticHover(el, { brightness = 1.15 } = {}) {
  if (!el) return { destroy: () => {} };
  // Skip if already applied
  if (el._hapticHover) return el._hapticHover;

  el.style.transition = 'filter 0.2s ease, box-shadow 0.25s ease, border-color 0.25s ease';

  const onEnter = () => { el.style.filter = `brightness(${brightness})`; };
  const onLeave = () => { el.style.filter = ''; };

  el.addEventListener('pointerenter', onEnter);
  el.addEventListener('pointerleave', onLeave);

  const handle = {
    destroy: () => {
      el.removeEventListener('pointerenter', onEnter);
      el.removeEventListener('pointerleave', onLeave);
      el.style.filter = '';
      el._hapticHover = null;
    },
  };
  el._hapticHover = handle;
  return handle;
}

// --- Glass Panel ---

/**
 * Applies Aura Design styling to an element.
 * @param {HTMLElement} el
 * @param {{ blur?: number, saturation?: number, brightness?: number, border?: boolean }} options
 * @returns {{ destroy: () => void }}
 */
export function glassPanel(el, { blur = 30, saturation = 150, brightness = 80, border = true } = {}) {
  if (!el) return { destroy: () => {} };

  el.classList.add('glass-panel');
  el.style.backdropFilter = `blur(${blur}px) saturate(${saturation}%) brightness(${brightness}%)`;
  el.style.webkitBackdropFilter = `blur(${blur}px) saturate(${saturation}%) brightness(${brightness}%)`;
  if (border) {
    el.style.border = '0.5px solid rgba(255, 255, 255, 0.2)';
  }

  return {
    destroy: () => {
      el.classList.remove('glass-panel');
      el.style.backdropFilter = '';
      el.style.webkitBackdropFilter = '';
      if (border) el.style.border = '';
    },
  };
}

// --- Button Bounce (Micro-interaction) ---

/**
 * Adds spring-based press animation to buttons.
 * Scale down on press with bounce-back on release.
 * @param {HTMLElement} el
 * @param {{ scale?: number }} options
 * @returns {{ destroy: () => void }}
 */
export function buttonBounce(el, { scale = 0.92 } = {}) {
  if (!el) return { destroy: () => {} };

  const onDown = () => {
    el.style.transition = 'transform 0.1s cubic-bezier(0.34, 1.56, 0.64, 1)';
    el.style.transform = `scale(${scale})`;
  };

  const onUp = () => {
    el.style.transition = 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)';
    el.style.transform = 'scale(1)';
  };

  el.addEventListener('pointerdown', onDown);
  el.addEventListener('pointerup', onUp);
  el.addEventListener('pointerleave', onUp);

  return {
    destroy: () => {
      el.removeEventListener('pointerdown', onDown);
      el.removeEventListener('pointerup', onUp);
      el.removeEventListener('pointerleave', onUp);
      el.style.transform = '';
      el.style.transition = '';
    },
  };
}

// --- Cover Flow (3D Carousel) ---

/**
 * Creates a Cover Flow-style 3D carousel from a list of elements.
 * Uses spring physics for inertial scrolling.
 * @param {{ container: HTMLElement, items: HTMLElement[], itemWidth?: number, gap?: number, perspective?: number }} config
 * @returns {{ destroy: () => void, goTo: (index: number) => void, current: () => number }}
 */
export function coverFlow({ container, items, itemWidth = 200, gap = 20, perspective = 1000 } = {}) {
  if (REDUCED_MOTION || !container || !items?.length) return { destroy: () => {}, goTo: () => {}, current: () => 0 };

  let currentIndex = 0;
  let offset = 0;
  let velocity = 0;
  let targetOffset = 0;
  let animHandle = null;

  container.style.perspective = `${perspective}px`;
  container.style.overflow = 'visible';
  container.style.position = 'relative';
  container.style.display = 'flex';
  container.style.alignItems = 'center';
  container.style.justifyContent = 'center';
  container.style.height = `${itemWidth * 1.2}px`;

  const applyLayout = () => {
    const centerX = container.offsetWidth / 2;
    items.forEach((item, i) => {
      const x = (i - currentIndex) * (itemWidth * 0.6 + gap) + offset;
      const absX = Math.abs(x);
      const rotateY = Math.sign(x) * Math.min(55, absX * 0.3);
      const translateZ = -Math.min(100, absX * 0.4);
      const scale = Math.max(0.7, 1 - absX * 0.001);
      const opacity = Math.max(0.4, 1 - absX * 0.002);

      item.style.position = 'absolute';
      item.style.width = `${itemWidth}px`;
      item.style.left = `${centerX - itemWidth / 2}px`;
      item.style.transform = `translate3d(${x}px, 0, ${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`;
      item.style.opacity = String(opacity);
      item.style.zIndex = String(items.length - Math.abs(i - currentIndex));
      item.style.transition = 'none';

      // Add reflection via CSS (bottom mirror)
      item.style.webkitBoxReflect = 'below 4px linear-gradient(transparent 70%, rgba(255,255,255,0.15))';
    });
  };

  const goTo = (index) => {
    currentIndex = Math.max(0, Math.min(items.length - 1, index));
    targetOffset = 0;

    if (animHandle) animHandle.cancel();
    animHandle = scheduler.animate('cover-flow', {
      spring: new Spring({ stiffness: 200, damping: 26, mass: 1.2 }),
      from: offset,
      to: 0,
      onUpdate: (val) => {
        offset = val;
        applyLayout();
      },
      onComplete: () => { animHandle = null; },
    });
  };

  // Wheel scrolling with inertia
  const onWheel = (e) => {
    e.preventDefault();
    const delta = Math.sign(e.deltaX || e.deltaY);
    goTo(currentIndex + delta);
  };

  container.addEventListener('wheel', onWheel, { passive: false });

  // Click to select
  items.forEach((item, i) => {
    item.addEventListener('click', () => goTo(i));
    item.style.cursor = 'pointer';
    perfManager.observe(item);
  });

  applyLayout();

  return {
    destroy: () => {
      container.removeEventListener('wheel', onWheel);
      animHandle?.cancel();
      items.forEach((item) => {
        item.style.transform = '';
        item.style.opacity = '';
        item.style.position = '';
        item.style.zIndex = '';
        item.style.webkitBoxReflect = '';
        perfManager.unobserve(item);
      });
    },
    goTo,
    current: () => currentIndex,
  };
}

// --- Shader Throttle ---

/**
 * Monitors FPS and adjusts canvas resolution to maintain smooth rendering.
 * Reduces resolution when FPS drops below threshold.
 * @param {HTMLCanvasElement} canvas
 * @param {{ minFps?: number, minScale?: number, checkInterval?: number }} options
 * @returns {{ destroy: () => void, getScale: () => number }}
 */
export function shaderThrottle(canvas, { minFps = 50, minScale = 0.5, checkInterval = 2000 } = {}) {
  if (!canvas) return { destroy: () => {}, getScale: () => 1 };

  let currentScale = window.devicePixelRatio * 0.75;
  let frameCount = 0;
  let lastCheck = performance.now();
  let intervalId;

  const measure = () => {
    const now = performance.now();
    const elapsed = now - lastCheck;
    const fps = (frameCount / elapsed) * 1000;
    frameCount = 0;
    lastCheck = now;

    if (fps < minFps && currentScale > minScale) {
      currentScale = Math.max(minScale, currentScale * 0.75);
      canvas.width = canvas.clientWidth * currentScale;
      canvas.height = canvas.clientHeight * currentScale;
      canvas.dispatchEvent(new CustomEvent('resolution-change', { detail: { scale: currentScale } }));
    } else if (fps > minFps + 10 && currentScale < window.devicePixelRatio * 0.75) {
      currentScale = Math.min(window.devicePixelRatio * 0.75, currentScale * 1.25);
      canvas.width = canvas.clientWidth * currentScale;
      canvas.height = canvas.clientHeight * currentScale;
      canvas.dispatchEvent(new CustomEvent('resolution-change', { detail: { scale: currentScale } }));
    }
  };

  // Count frames via rAF
  let counting = true;
  const countFrame = () => {
    if (!counting) return;
    frameCount++;
    requestAnimationFrame(countFrame);
  };
  requestAnimationFrame(countFrame);

  intervalId = setInterval(measure, checkInterval);

  return {
    destroy: () => {
      counting = false;
      clearInterval(intervalId);
    },
    getScale: () => currentScale,
  };
}

// --- Ambient Card Glow (Dynamic color from thumbnail) ---

/**
 * Adds a colored ambient glow behind a card based on its thumbnail dominant color.
 * Creates a soft colored light effect that appears on hover.
 * @param {HTMLElement} card
 * @param {{ selector?: string, blur?: number, intensity?: number }} options
 * @returns {{ destroy: () => void }}
 */
export function ambientCardGlow(card, { selector = 'img', blur = 50, intensity = 0.4 } = {}) {
  if (REDUCED_MOTION || !card) return { destroy: () => {} };

  const img = card.querySelector(selector);
  if (!img) return { destroy: () => {} };

  let glowEl = null;
  let color = null;

  const extractColor = () => {
    try {
      const canvas = document.createElement('canvas');
      canvas.width = 8;
      canvas.height = 8;
      const ctx = canvas.getContext('2d', { willReadFrequently: true });
      ctx.drawImage(img, 0, 0, 8, 8);
      const data = ctx.getImageData(0, 0, 8, 8).data;
      let r = 0, g = 0, b = 0, count = 0;
      for (let i = 0; i < data.length; i += 4) {
        if (data[i] + data[i+1] + data[i+2] > 60 && data[i] + data[i+1] + data[i+2] < 700) {
          r += data[i]; g += data[i+1]; b += data[i+2]; count++;
        }
      }
      if (count === 0) return 'rgba(100,150,255,0.5)';
      r = Math.round(r / count); g = Math.round(g / count); b = Math.round(b / count);
      return `rgba(${r},${g},${b},${intensity})`;
    } catch (e) { return 'rgba(100,150,255,0.3)'; }
  };

  const onEnter = () => {
    if (scrollGuardian.isScrolling) return;
    if (!glowEl) {
      glowEl = document.createElement('div');
      glowEl.className = 'card-ambient-glow';
      glowEl.style.cssText = `
        position: absolute; inset: -30%; z-index: -1; pointer-events: none;
        border-radius: 50%; filter: blur(${blur}px);
        opacity: 0; transition: opacity 0.5s ease;
      `;
      card.style.position = card.style.position || 'relative';
      card.insertBefore(glowEl, card.firstChild);
    }
    if (!color) color = extractColor();
    glowEl.style.background = color;
    glowEl.style.opacity = '1';
  };

  const onLeave = () => {
    if (glowEl) glowEl.style.opacity = '0';
  };

  if (!img.complete) {
    img.addEventListener('load', () => { color = null; }, { once: true });
  }

  card.addEventListener('pointerenter', onEnter);
  card.addEventListener('pointerleave', onLeave);

  return {
    destroy: () => {
      card.removeEventListener('pointerenter', onEnter);
      card.removeEventListener('pointerleave', onLeave);
      glowEl?.remove();
    },
  };
}

// --- Visibility-Aware Effect Wrapper ---

/**
 * Wraps any effect so it only runs when element is visible.
 * Uses IntersectionObserver + PerformanceManager.
 * @param {HTMLElement} el
 * @param {Function} effectFn - Function that returns { destroy }
 * @returns {{ destroy: () => void }}
 */
export function visibilityAware(el, effectFn) {
  if (!el) return { destroy: () => {} };

  let activeEffect = null;

  perfManager.observe(el, {
    willChange: 'transform, opacity',
    onVisible: () => {
      if (!activeEffect) activeEffect = effectFn();
    },
    onHidden: () => {
      activeEffect?.destroy();
      activeEffect = null;
    },
  });

  return {
    destroy: () => {
      activeEffect?.destroy();
      perfManager.unobserve(el);
    },
  };
}

