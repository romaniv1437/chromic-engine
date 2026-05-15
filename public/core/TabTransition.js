/**
 * TabTransition — Instant crossfade tab switching (zero layout thrash).
 * No slide/parallax — just a fast opacity crossfade for maximum smoothness.
 */

const REDUCED_MOTION = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/**
 * Manages animated transitions between tab content sections.
 * @param {{ container: HTMLElement }} config
 */
export class TabTransitionController {
  constructor({ container }) {
    this.container = container;
    this._activeAnimation = null;
  }

  /**
   * Transition from one view to another with a fast crossfade.
   * @param {HTMLElement} outgoing - Element leaving
   * @param {HTMLElement} incoming - Element entering
   * @param {'forward'|'backward'} direction
   */
  transition(outgoing, incoming, direction = 'forward') {
    if (this._activeAnimation) {
      this._activeAnimation.cancel();
      this._activeAnimation = null;
    }

    // Instant snap — no transforms, no layout shifts
    if (REDUCED_MOTION || !outgoing || !incoming) {
      if (outgoing) { outgoing.style.display = 'none'; outgoing.style.opacity = ''; }
      if (incoming) { incoming.style.display = ''; incoming.style.opacity = '1'; }
      return;
    }

    // Fast CSS-only crossfade — zero main-thread cost after setup
    incoming.style.display = '';
    incoming.style.opacity = '0';
    outgoing.style.opacity = '1';

    // Force a single style recalc then let CSS transitions handle it
    incoming.offsetHeight; // trigger reflow once

    incoming.style.transition = 'opacity 0.18s ease-out';
    outgoing.style.transition = 'opacity 0.12s ease-out';
    incoming.style.opacity = '1';
    outgoing.style.opacity = '0';

    const cleanup = () => {
      outgoing.style.display = 'none';
      outgoing.style.transition = '';
      outgoing.style.opacity = '';
      incoming.style.transition = '';
      incoming.style.opacity = '1';
      this._activeAnimation = null;
    };

    // Use transitionend on the longer animation (incoming)
    const onEnd = () => {
      incoming.removeEventListener('transitionend', onEnd);
      cleanup();
    };
    incoming.addEventListener('transitionend', onEnd);

    // Safety timeout in case transitionend doesn't fire
    const timeout = setTimeout(() => {
      incoming.removeEventListener('transitionend', onEnd);
      cleanup();
    }, 250);

    this._activeAnimation = {
      cancel: () => {
        clearTimeout(timeout);
        incoming.removeEventListener('transitionend', onEnd);
        cleanup();
      }
    };
  }

  destroy() {
    this._activeAnimation?.cancel();
    this._activeAnimation = null;
  }
}

