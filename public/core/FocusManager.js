export const getNextFocusableIndex = (length, currentIndex, direction) => {
  if (!Number.isFinite(length) || length <= 0) {
    return -1;
  }

  const safeDirection = direction >= 0 ? 1 : -1;
  const safeCurrent = Number.isFinite(currentIndex) && currentIndex >= 0 ? currentIndex : safeDirection > 0 ? -1 : 0;
  return (safeCurrent + safeDirection + length) % length;
};

const isVisibleFocusable = (element) => {
  if (!element || typeof element.focus !== 'function' || element.disabled) {
    return false;
  }

  const ariaHidden = element.getAttribute?.('aria-hidden');
  if (ariaHidden === 'true') {
    return false;
  }

  const style = typeof window !== 'undefined' && window.getComputedStyle ? window.getComputedStyle(element) : null;
  return !(style && (style.display === 'none' || style.visibility === 'hidden'));
};

export const getFocusableCandidates = (root = document) =>
  Array.from(root.querySelectorAll('.focusable'))
    .filter((element) => !element.closest?.('[hidden], .view-hidden, [aria-hidden="true"]'))
    .filter(isVisibleFocusable);

export class FocusManager {
  constructor({ root = document, getCandidates = null, onBack = null } = {}) {
    this.root = root;
    this.getCandidates = getCandidates || (() => getFocusableCandidates(this.root));
    this.onBack = onBack;
    this.handleKeydown = this.handleKeydown.bind(this);
    this.handleFocusIn = this.handleFocusIn.bind(this);
    this.handleFocusOut = this.handleFocusOut.bind(this);
  }

  start() {
    this.root.addEventListener('keydown', this.handleKeydown);
    this.root.addEventListener('focusin', this.handleFocusIn);
    this.root.addEventListener('focusout', this.handleFocusOut);
  }

  stop() {
    this.root.removeEventListener('keydown', this.handleKeydown);
    this.root.removeEventListener('focusin', this.handleFocusIn);
    this.root.removeEventListener('focusout', this.handleFocusOut);
  }

  focusFirst() {
    this.getCandidates()[0]?.focus();
  }

  move(direction = 1) {
    const candidates = this.getCandidates();
    if (!candidates.length) {
      return;
    }

    const currentIndex = candidates.findIndex((element) => element === document.activeElement);
    const nextIndex = getNextFocusableIndex(candidates.length, currentIndex, direction);
    candidates[nextIndex]?.focus();
  }

  handleKeydown(event) {
    const target = event.target;
    if (target?.matches?.('input, textarea, select')) {
      return;
    }

    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
      event.preventDefault();
      this.move(1);
      return;
    }

    if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
      event.preventDefault();
      this.move(-1);
      return;
    }

    if (event.key === 'Enter' || event.key === ' ') {
      const active = document.activeElement;
      if (active && (active.isContentEditable || active.tagName === 'INPUT' || active.tagName === 'TEXTAREA')) return;
      if (active?.classList?.contains('focusable')) {
        event.preventDefault();
        active.click?.();
      }
      return;
    }

    if (event.key === 'Escape' || event.key === 'Backspace') {
      // Don't trigger back navigation when ChromicEditor pro mode is active
      if (document.body.classList.contains('chromic-pro-active')) return;
      // Don't trigger back navigation when user is editing text (contenteditable, input, textarea)
      const active = document.activeElement;
      if (event.key === 'Backspace' && active && (active.isContentEditable || active.tagName === 'INPUT' || active.tagName === 'TEXTAREA')) {
        return;
      }
      // If a focusable element has focus, first Escape just blurs it — don't close anything
      if (event.key === 'Escape' && active && active !== document.body && active.tagName !== 'HTML' &&
          (active.tagName === 'BUTTON' || active.tagName === 'INPUT' || active.tagName === 'SELECT' ||
           active.tagName === 'TEXTAREA' || active.tagName === 'A' || active.hasAttribute('tabindex'))) {
        active.blur();
        return;
      }
      this.onBack?.();
    }
  }

  handleFocusIn(event) {
    event.target?.classList?.add('is-focused');
  }

  handleFocusOut(event) {
    event.target?.classList?.remove('is-focused');
  }
}


