/**
 * ZenMode — Smooth spring-animated fade of all UI chrome,
 * leaving only the visualizer/now-playing canvas visible.
 */

import { scheduler, Spring } from './MotionController.js';

const REDUCED_MOTION = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export class ZenModeController {
  constructor({ chromeSelectors = ['.app-header', '.global-music-player', '.tab-navigation', '.library-grid-label'], excludeSelectors = [] } = {}) {
    this.chromeSelectors = chromeSelectors;
    this.excludeSelectors = excludeSelectors;
    this.isActive = false;
    this._animation = null;
    this._spring = new Spring({ stiffness: 100, damping: 20, mass: 1 });
  }

  _getChromeElements() {
    const els = [];
    for (const sel of this.chromeSelectors) {
      document.querySelectorAll(sel).forEach((el) => {
        if (!this.excludeSelectors.some((ex) => el.matches(ex))) {
          els.push(el);
        }
      });
    }
    return els;
  }

  enter() {
    if (this.isActive) return;
    this.isActive = true;
    this._animate(0);
    document.body.classList.add('zen-mode-active');
  }

  exit() {
    if (!this.isActive) return;
    this.isActive = false;
    this._animate(1);
    document.body.classList.remove('zen-mode-active');
  }

  toggle() {
    this.isActive ? this.exit() : this.enter();
  }

  _animate(targetOpacity) {
    if (this._animation) this._animation.cancel();

    const elements = this._getChromeElements();

    if (REDUCED_MOTION) {
      elements.forEach((el) => {
        el.style.opacity = String(targetOpacity);
        el.style.transform = targetOpacity === 0 ? 'scale(0.96)' : '';
      });
      return;
    }

    elements.forEach((el) => { el.style.willChange = 'transform, opacity'; });

    this._animation = scheduler.animate('zen-mode', {
      spring: this._spring,
      from: targetOpacity === 0 ? 1 : 0,
      to: targetOpacity,
      onUpdate: (value) => {
        elements.forEach((el) => {
          el.style.opacity = String(value);
          el.style.transform = `scale(${0.96 + 0.04 * value})`;
        });
      },
      onComplete: () => {
        elements.forEach((el) => {
          el.style.willChange = '';
          if (targetOpacity === 1) {
            el.style.transform = '';
            el.style.opacity = '';
          }
        });
        this._animation = null;
      },
    });
  }

  destroy() {
    this._animation?.cancel();
    this._getChromeElements().forEach((el) => {
      el.style.opacity = '';
      el.style.transform = '';
      el.style.willChange = '';
    });
    document.body.classList.remove('zen-mode-active');
  }
}

