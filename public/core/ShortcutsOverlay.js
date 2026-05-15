/**
 * ShortcutsOverlay — Chromic Engine Command Center.
 * Shows all keyboard shortcuts in a glassmorphism overlay.
 * Activation: Shift + ? (or click help button in Pro Badge)
 */

/** Detect platform and return platform-appropriate modifier labels */
const _platform = (() => {
  const p = window.chromicElectron?.platform || navigator.platform?.toLowerCase() || '';
  if (p.includes('darwin') || p.includes('mac')) return 'mac';
  if (p.includes('win')) return 'win';
  return 'linux';
})();

/** Convert a shortcut string with generic modifiers to platform-specific labels */
export function platformKey(str) {
  if (_platform === 'mac') {
    return str
      .replace(/⌘\/Ctrl/g, '⌘')
      .replace(/Cmd\/Ctrl/g, '⌘')
      .replace(/Ctrl\+/g, '⌘')
      .replace(/Alt\+/g, '⌥')
      .replace(/⌥ Option/g, '⌥ Option');
  }
  // Windows / Linux
  return str
    .replace(/⌘\/Ctrl/g, 'Ctrl')
    .replace(/Cmd\/Ctrl/g, 'Ctrl')
    .replace(/⌘/g, 'Ctrl')
    .replace(/⌥ Option/g, 'Alt')
    .replace(/⌥/g, 'Alt');
}

/** Return the platform-specific shortcut for ⌘K / Ctrl+K */
export function platformSearchKey() {
  return _platform === 'mac' ? '⌘K' : 'Ctrl+K';
}

const SHORTCUTS = {
  'Global': [
    ['⌘/Ctrl + K', 'Open Chromic Search'],
    ['⌘/Ctrl + Shift + M', 'Toggle Pro Mode (or Ctrl+Shift+P in Firefox)'],
    ['⌘/Ctrl + Shift + F', 'Toggle Flow Mode directly'],
    ['`', 'Show this shortcuts list'],
    ['Space', 'Play / Pause'],
    ['← / →', 'Seek -5s / +5s'],
  ],
  'Flow Mode — Timing': [
    ['⌥ Option (hold)', 'Start timing word (release to end)'],
    ['Enter', 'Save edited word / Submit new word'],
    ['⌘/Ctrl + Z', 'Undo last word'],
  ],
  'Flow Mode — Waveform': [
    ['Scroll ↕', 'Zoom waveform in/out'],
    ['Scroll ↔', 'Scrub audio position'],
    ['Drag waveform', 'Scrub audio position'],
    ['Click word block', 'Select word for editing'],
    ['Drag block edges', 'Resize word start/end'],
    ['Drag block center', 'Move word in time'],
  ],
  'Flow Mode — Editing': [
    ['Style dropdown', 'Change word animation style'],
    ['Save', 'Save all changes to backend'],
    ['Escape', 'Exit Pro Mode'],
  ],
};

class ShortcutsOverlay {
  constructor() {
    this._overlay = null;
    this._visible = false;
    document.addEventListener('keydown', (e) => {
      // Backtick (`) to toggle shortcuts overlay — use e.code for non-US layouts
      if ((e.key === '`' || e.code === 'Backquote') && !e.metaKey && !e.ctrlKey && !e.altKey && !e.shiftKey) {
        const target = e.target;
        if (target?.isContentEditable || target?.tagName === 'INPUT' || target?.tagName === 'TEXTAREA') return;
        e.preventDefault();
        this.toggle();
      }
      // Escape to close
      if (e.key === 'Escape' && this._visible) {
        e.preventDefault();
        this.hide();
      }
    });
  }

  toggle() {
    this._visible ? this.hide() : this.show();
  }

  show() {
    if (this._overlay) return;
    this._visible = true;

    const overlay = document.createElement('div');
    overlay.className = 'chromic-shortcuts-overlay';
    overlay.innerHTML = `
      <div class="chromic-shortcuts-backdrop"></div>
      <div class="chromic-shortcuts-panel">
        <div class="chromic-shortcuts-header">
          <h2>Chromic Engine — Keyboard Shortcuts</h2>
          <button class="chromic-shortcuts-close"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></button>
        </div>
        <div class="chromic-shortcuts-grid">
          ${Object.entries(SHORTCUTS).map(([category, shortcuts]) => `
            <div class="chromic-shortcuts-category">
              <h3>${category}</h3>
              ${shortcuts.map(([key, desc]) => `
                <div class="chromic-shortcut-row">
                  <kbd>${platformKey(key)}</kbd>
                  <span>${desc}</span>
                </div>
              `).join('')}
            </div>
          `).join('')}
        </div>
      </div>
    `;

    document.body.appendChild(overlay);
    this._overlay = overlay;
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';

    // Prevent wheel events from reaching the page — only allow scroll inside the panel
    const panel = overlay.querySelector('.chromic-shortcuts-panel');
    this._wheelHandler = (e) => {
      if (panel.contains(e.target)) {
        // Allow scroll inside panel, but stop propagation to prevent page scroll
        const atTop = panel.scrollTop <= 0;
        const atBottom = panel.scrollTop + panel.clientHeight >= panel.scrollHeight;
        if ((e.deltaY < 0 && atTop) || (e.deltaY > 0 && atBottom)) {
          e.preventDefault();
        }
      } else {
        e.preventDefault();
      }
    };
    overlay.addEventListener('wheel', this._wheelHandler, { passive: false });

    // Close handlers
    overlay.querySelector('.chromic-shortcuts-backdrop').addEventListener('click', () => this.hide());
    overlay.querySelector('.chromic-shortcuts-close').addEventListener('click', () => this.hide());
  }

  hide() {
    if (this._overlay) {
      this._overlay.removeEventListener('wheel', this._wheelHandler, { passive: false });
      this._overlay.remove();
      this._overlay = null;
    }
    this._visible = false;
    document.body.style.overflow = '';
    document.documentElement.style.overflow = '';
  }
}

export const shortcutsOverlay = new ShortcutsOverlay();

