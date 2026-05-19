/**
 * ChromicEditor — Professional inline metadata editing suite.
 * Enables real-time lyric/subtitle editing with timestamp calibration.
 * Activation: Alt+E toggle.
 */

const VOCAL_STYLES = ['normal', 'stretch', 'ad-lib', 'spoken', 'whisper'];
const SPEED_CYCLE = [1.0, 0.75, 0.5, 0.25, 0.15, 0.10, 0.05];

// Inline SVG status icons (12×12) for flow mode status bar
const _svgCheck = '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="rgba(100,220,140,0.9)" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:-2px;margin-right:2px"><polyline points="20 6 9 17 4 12"/></svg>';
const _svgX = '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="rgba(255,100,100,0.9)" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:-2px;margin-right:2px"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>';
const _svgPencil = '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:-2px;margin-right:2px"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>';
const _svgSave = '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:-2px;margin-right:2px"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg>';
const _esc = s => String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');

export class ChromicEditor {
  constructor() {
    this.active = false;
    this.isDirty = false;
    this.playbackSpeed = 1.0;
    this._speedIndex = 0;
    this._badge = null;
    this._mediaSource = null; // { type: 'audio'|'video', element: HTMLMediaElement }
    this._editedLines = new Map(); // lineIndex → { text, startSec, endSec, style }
    this._activeWordEl = null;
    this._confirmModal = null;
    // Flow Mode state
    this._flowMode = false;
    this._flowBar = null;
    this._flowInput = null;
    this._flowTapping = false;
    this._flowWordStart = 0;
    this._flowUndoStack = [];
    this._flowWordCount = 0;
    this._flowHostSyncTimer = null;
    this._boundFlowKeydown = this._onFlowKeydown.bind(this);
    this._boundFlowKeyup = this._onFlowKeyup.bind(this);
    this._boundKeydown = this._onKeydown.bind(this);
    this._boundClick = this._onClick.bind(this);
    this._init();
  }

  /**
   * Returns the best parent element for floating UI (panels, badges, modals).
   * When the fullscreen music overlay is active, appends inside it so elements
   * aren't hidden behind its stacking context (z-index: max + isolation).
   */
  _getFloatingHost() {
    const overlay = document.getElementById('musicOverlayHost');
    if (overlay && overlay.classList.contains('is-active')) return overlay;
    return document.body;
  }

  _init() {
    document.addEventListener('keydown', this._boundKeydown);
  }

  /**
   * Bind to a media source for timestamp calibration.
   * @param {'audio'|'video'} type
   * @param {HTMLMediaElement} element
   */
  setMediaSource(type, element) {
    this._mediaSource = { type, element };
  }

  _onKeydown(e) {
    // Cmd+Shift+M (Mac) or Ctrl+Shift+M (Win/Linux) toggles Pro Mode
    // Also supports Cmd+Shift+P / Ctrl+Shift+P as alternative (matches Electron menu accelerator)
    // Use e.code for cross-platform reliability (works on international keyboard layouts)
    if ((e.metaKey || e.ctrlKey) && e.shiftKey && (e.code === 'KeyM' || e.code === 'KeyP')) {
      e.preventDefault();
      e.stopPropagation(); // Prevent browser's Ctrl+Shift+M (Firefox Responsive Design Mode)
      this.toggle();
      return;
    }

    // Cmd+Shift+F (Mac) or Ctrl+Shift+F (Win/Linux) toggles Flow Mode
    // Use e.code for cross-platform reliability
    if ((e.metaKey || e.ctrlKey) && e.shiftKey && e.code === 'KeyF') {
      e.preventDefault();
      e.stopPropagation();
      this._toggleFlowMode();
      return;
    }

    if (!this.active) return;

    // Don't intercept keys when typing in contenteditable (except special combos)
    const activeEl = document.activeElement;
    const isEditing = activeEl && (activeEl.isContentEditable || activeEl.tagName === 'INPUT' || activeEl.tagName === 'TEXTAREA');

    // [ = set start timestamp for active word/line
    if (e.key === '[' && !isEditing) {
      e.preventDefault();
      e.stopImmediatePropagation();
      this._calibrateTimestamp('start');
    }
    // ] = set end timestamp for active word/line
    if (e.key === ']' && !isEditing) {
      e.preventDefault();
      e.stopImmediatePropagation();
      this._calibrateTimestamp('end');
    }
    // Tab = select next word, Shift+Tab = previous word
    if (e.key === 'Tab' && !isEditing) {
      e.preventDefault();
      e.stopImmediatePropagation();
      this._selectAdjacentWord(e.shiftKey ? -1 : 1);
    }
    // Cmd+Enter = convert vocal_cue to line (type text in focused cue)
    if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
      e.preventDefault();
      this._convertCueToLine();
    }
    // Shift+Enter = insert new line below active (with FLIP animation)
    if (e.shiftKey && e.key === 'Enter' && !e.metaKey && !e.ctrlKey && !isEditing) {
      e.preventDefault();
      e.stopImmediatePropagation();
      this._insertLineBelow();
    }
    // Plain Backspace with selected word (no modifier): focus word for text editing
    if (e.key === 'Backspace' && !e.metaKey && !e.ctrlKey && !e.shiftKey && !isEditing && this._activeWordEl) {
      e.preventDefault();
      e.stopImmediatePropagation();
      // Place cursor at end of the word span and let user type
      const range = document.createRange();
      const sel = window.getSelection();
      range.selectNodeContents(this._activeWordEl);
      range.collapse(false); // collapse to end
      sel.removeAllRanges();
      sel.addRange(range);
      // Now the word's parent line is contenteditable — simulate backspace
      document.execCommand('delete', false);
      return;
    }
    // Cmd+Backspace = convert line to vocal_cue (delete the line text)
    if ((e.metaKey || e.ctrlKey) && e.key === 'Backspace' && !e.shiftKey && !isEditing) {
      e.preventDefault();
      this._convertLineToCue();
    }
    // Cmd+Shift+Backspace = DELETE element entirely (remove from timeline via BE)
    if ((e.metaKey || e.ctrlKey) && e.shiftKey && e.key === 'Backspace' && !isEditing) {
      e.preventDefault();
      e.stopImmediatePropagation();
      this._deleteActiveElement();
    }
    // Cmd+S = export JSON
    if ((e.metaKey || e.ctrlKey) && e.key === 's' && !e.shiftKey) {
      e.preventDefault();
      this.exportJSON();
      console.log('[ChromicEditor] Exported JSON');
    }
    // Cmd+Shift+S = export LRC
    if ((e.metaKey || e.ctrlKey) && e.shiftKey && e.key === 's') {
      e.preventDefault();
      this.exportLRC();
      console.log('[ChromicEditor] Exported LRC');
    }

    // Escape = close panel first, then exit Pro Mode (with dirty check)
    // Always allow Escape even when editing (to close panels/exit inputs)
    if (e.key === 'Escape') {
      e.preventDefault();
      if (this._inspectorPanel) {
        this._hideInspectorReport();
        return;
      }
      console.log('[ChromicEditor] Escape pressed:', {
        hasPanel: !!this._timestampPanel,
        isEditing,
        activeElTag: document.activeElement?.tagName,
        activeElClass: document.activeElement?.className?.slice?.(0, 40),
        panelContainsFocus: this._timestampPanel?.contains(document.activeElement),
      });
      // If focus is in a panel input, just blur it
      const activeEl2 = document.activeElement;
      if (activeEl2 && this._timestampPanel?.contains(activeEl2)) {
        console.log('[ChromicEditor] Blurring panel input');
        activeEl2.blur();
        return;
      }
      if (this._timestampPanel) {
        console.log('[ChromicEditor] Closing timestamp panel via Escape');
        this._hideTimestampPanel();
        return;
      }
      if (isEditing) {
        console.log('[ChromicEditor] Escape ignored — currently editing lyrics text');
        return;
      }
      this.toggle();
    }

    // Vocal Style hotkeys (when word selected, not editing)
    if (this._activeWordEl && !isEditing) {
      if (e.key === '1') { e.preventDefault(); this._setWordStyle('normal'); }
      if (e.key === '2') { e.preventDefault(); this._setWordStyle('stretch'); }
      if (e.key === '3') { e.preventDefault(); this._setWordStyle('ad-lib'); }
      if (e.key === '4') { e.preventDefault(); this._setWordStyle('spoken'); }
      if (e.key === '5') { e.preventDefault(); this._setWordStyle('whisper'); }
    }

    // Arrow keys: navigate between words when not editing text
    if (['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(e.key) && !isEditing) {
      e.preventDefault();
      e.stopImmediatePropagation();
      if (e.key === 'ArrowRight') {
        this._selectAdjacentWord(1);
      } else if (e.key === 'ArrowLeft') {
        this._selectAdjacentWord(-1);
      } else if (e.key === 'ArrowDown') {
        this._selectAdjacentLine(1);
      } else if (e.key === 'ArrowUp') {
        this._selectAdjacentLine(-1);
      }
    }

    // Option+S (Mac) / Alt+S (Win/Linux) = Cycle slow motion speed (Sniper Mode)
    // Use e.code for cross-platform: macOS Option produces special chars but code stays 'KeyS'
    if (e.altKey && e.code === 'KeyS' && !isEditing) {
      e.preventDefault();
      e.stopImmediatePropagation();
      this._cycleSpeed();
    }
  }

  _onClick(e) {
    if (!this.active) return;

    const target = e.target;
    console.log('[ChromicEditor] onClick:', {
      tagName: target.tagName,
      className: target.className?.slice?.(0, 60),
      id: target.id || null,
      closestPanel: !!target.closest('.chromic-timestamp-panel'),
      closestWord: !!target.closest('.lyric-word, [data-word-index]'),
      closestLine: !!target.closest('.lyrics-line'),
      closestCue: !!target.closest('.lyrics-intro-dots'),
      shift: e.shiftKey,
    });

    // ── Flow bar click delegation (capture phase — handle before anything else) ──
    if (target.closest('.chromic-flow-bar') && this._flowMode) {
      // Gold button or gold badge
      if (target.closest('.chromic-flow-gold') || target.closest('[data-flow-gold-badge]')) {
        e.preventDefault();
        e.stopPropagation();
        console.log('[Gold] Capture-phase delegation: calling _flowToggleGold');
        this._flowToggleGold();
        return;
      }
      // Save button
      if (target.closest('.chromic-flow-save')) {
        e.preventDefault();
        e.stopPropagation();
        this._flowSaveAll();
        return;
      }
      // Let other flow bar clicks pass through to their mousedown handlers
      return;
    }

    // Clicks inside the timestamp panel — let panel's own handler deal with them
    if (target.closest('.chromic-timestamp-panel')) {
      console.log('[ChromicEditor] Click inside timestamp panel — delegating to panel handler');
      return;
    }

    // Shift+Click = seek to line
    const lineEl = e.target.closest('.lyrics-line, .cue-text');
    if (lineEl && e.shiftKey && this._mediaSource) {
      e.stopPropagation();
      e.preventDefault();
      const startSec = parseFloat(lineEl.dataset.start);
      if (Number.isFinite(startSec)) {
        console.log(`[ChromicEditor] Shift+Click seek to ${startSec.toFixed(2)}s`);
        this._mediaSource.element.currentTime = startSec;
      }
      return;
    }

    // Track active word for calibration
    const wordEl = e.target.closest('.lyric-word, [data-word-index]');
    if (wordEl) {
      // In flow mode, word clicks are handled by the flow word click handler — skip panel
      if (this._flowMode) return;

      // Pro Mode no longer has word editing — activate Flow Mode for editing
      if (this._activeWordEl) this._activeWordEl.classList.remove('chromic-edit-active');
      this._activeWordEl = wordEl;
      wordEl.classList.add('chromic-edit-active');
      return;
    }

    // Click on vocal_cue dots — select for conversion
    const cueEl = e.target.closest('.lyrics-intro-dots');
    if (cueEl) {
      document.querySelectorAll('.lyrics-intro-dots.chromic-edit-active').forEach(el => el.classList.remove('chromic-edit-active'));
      cueEl.classList.add('chromic-edit-active');
      console.log(`[ChromicEditor] Selected vocal_cue at index ${cueEl.dataset.lineIndex}. Press Cmd+Enter to convert to line.`);
    }
  }

  toggle() {
    if (this.active) {
      // Check dirty state before exiting
      if (this.isDirty) {
        this._showConfirmModal();
        return;
      }
      this.deactivate();
    } else {
      this.activate();
    }
  }

  activate() {
    this.active = true;
    this._showBadge();
    this._injectEditability();
    this._autoDetectMediaSource();
    document.addEventListener('click', this._boundClick, true);
    document.body.classList.add('chromic-pro-active');
    console.log('[ChromicEditor] Pro Mode ACTIVATED');

    // Auto-activate Flow Mode — it's the only edit mode now
    if (!this._flowMode) {
      this._activateFlowMode();
    }
  }

  deactivate() {
    this.active = false;
    this._resetSpeed();
    this._hideBadge();
    this._hideTimestampPanel();
    this._hideWordHud();
    this._removeEditability();
    // Close AI settings modal if open
    document.getElementById('chromic-ai-modal')?.remove();

    // Deactivate Flow Mode
    if (this._flowMode) {
      this._deactivateFlowMode();
    }

    document.removeEventListener('click', this._boundClick, true);
    document.body.classList.remove('chromic-pro-active');
    if (this._activeWordEl) {
      this._activeWordEl.classList.remove('chromic-edit-active');
      this._activeWordEl = null;
    }
    console.log('[ChromicEditor] Pro Mode DEACTIVATED');
  }

  _injectEditability() {
    // Music lyrics
    document.querySelectorAll('.lyrics-line').forEach((el) => {
      el.setAttribute('contenteditable', 'true');
      el.classList.add('chromic-editable');
    });
    // Translations
    document.querySelectorAll('.lyrics-translation').forEach((el) => {
      el.setAttribute('contenteditable', 'true');
      el.classList.add('chromic-editable');
    });
    // Cue text elements
    document.querySelectorAll('.cue-text').forEach((el) => {
      el.setAttribute('contenteditable', 'true');
      el.classList.add('chromic-editable');
    });
    // Track text changes in contenteditable elements
    if (!this._boundInput) {
      this._boundInput = this._onInput.bind(this);
    }
    document.addEventListener('input', this._boundInput, true);
  }

  /** Track contenteditable changes so they get saved to BE */
  _onInput(e) {
    if (!this.active) return;
    const el = e.target;
    if (!el.classList?.contains('chromic-editable')) return;
    const lineIndex = el.dataset?.lineIndex || el.closest?.('[data-line-index]')?.dataset?.lineIndex;
    if (!lineIndex) return;

    // Check if it's a translation element
    const isTranslation = el.classList.contains('lyrics-translation');
    const key = isTranslation ? `translation:${lineIndex}` : lineIndex;

    const existing = this._editedLines.get(key) || {};
    existing.text = el.textContent.trim();
    if (isTranslation) existing.isTranslation = true;
    if (el.dataset.start) existing.startSec = parseFloat(el.dataset.start);
    if (el.dataset.end) existing.endSec = parseFloat(el.dataset.end);
    this._editedLines.set(key, existing);
    this._markDirty();
    console.log(`[ChromicEditor] Text edited (${isTranslation ? 'translation' : 'lyrics'}) line ${lineIndex}: "${existing.text.slice(0, 40)}…"`);
  }

  _autoDetectMediaSource() {
    // Try to find active audio/video element
    const audio = document.getElementById('globalAudio') || document.querySelector('audio');
    if (audio) {
      this._mediaSource = { type: 'audio', element: audio };
      console.log('[ChromicEditor] Auto-detected audio source');
      return;
    }
    const video = document.querySelector('video');
    if (video) {
      this._mediaSource = { type: 'video', element: video };
      console.log('[ChromicEditor] Auto-detected video source');
    }
  }

  _removeEditability() {
    document.querySelectorAll('.chromic-editable').forEach((el) => {
      el.removeAttribute('contenteditable');
      el.classList.remove('chromic-editable');
    });
    if (this._boundInput) {
      document.removeEventListener('input', this._boundInput, true);
    }
  }

  _calibrateTimestamp(type) {
    if (!this._mediaSource) return;
    const time = this._mediaSource.element.currentTime;
    const target = this._activeWordEl || document.querySelector('.lyrics-line.active');
    if (!target) return;

    const lineIndex = target.closest('[data-line-index]')?.dataset.lineIndex;
    if (lineIndex == null) return;

    const existing = this._editedLines.get(lineIndex) || {};
    if (type === 'start') {
      existing.startSec = time;
      target.dataset.start = String(time);
    } else {
      existing.endSec = time;
      target.dataset.end = String(time);
    }
    existing.text = target.textContent;
    this._editedLines.set(lineIndex, existing);
    this._markDirty();

    // Visual feedback
    target.style.transition = 'box-shadow 0.2s';
    target.style.boxShadow = type === 'start'
      ? '0 0 0 2px rgba(0,255,120,0.6)'
      : '0 0 0 2px rgba(255,180,0,0.6)';
    setTimeout(() => { target.style.boxShadow = ''; }, 600);

    // Update HUD in real-time
    if (this._activeWordEl) this._updateWordHud(this._activeWordEl);

    console.log(`[ChromicEditor] Calibrated ${type} @${time.toFixed(3)}s for line ${lineIndex}${this._activeWordEl ? ` word "${this._activeWordEl.textContent}"` : ''}`);
  }

  /** Show floating timestamp editor panel for selected word */
  _showTimestampPanel(wordEl) {
    console.log('[ChromicEditor] _showTimestampPanel:', {
      word: wordEl.textContent,
      lineIndex: wordEl.closest('.lyrics-line')?.dataset?.lineIndex,
      wordIndex: wordEl.dataset.wordIndex,
      floatingHost: this._getFloatingHost().id || this._getFloatingHost().tagName,
    });
    this._hideTimestampPanel();
    const line = wordEl.closest('.lyrics-line');
    const lineIdx = line?.dataset?.lineIndex;
    const wordIdx = wordEl.dataset.wordIndex;

    // Read current timestamps — preselect from word data attrs (rendered by Lyrics.js)
    const startVal = wordEl.dataset.start || '';
    const endVal = wordEl.dataset.end || '';
    const currentStyle = wordEl.dataset.style || 'normal';

    const panel = document.createElement('div');
    panel.className = 'chromic-timestamp-panel';
    panel.innerHTML = `
      <div class="chromic-ts-header">
        <strong>"${wordEl.textContent}"</strong>
        <span class="chromic-ts-meta">Line ${lineIdx} · Word ${wordIdx}</span>
        <button class="chromic-ts-close" data-action="cancel" title="Close (Esc)">✕</button>
      </div>
      <div class="chromic-ts-fields">
        <label>Start (s)<input type="number" step="0.01" class="chromic-ts-start" value="${startVal}" placeholder="—"></label>
        <label>End (s)<input type="number" step="0.01" class="chromic-ts-end" value="${endVal}" placeholder="—"></label>
        <label>Style
          <select class="chromic-ts-style">
            ${VOCAL_STYLES.map(s => `<option value="${s}"${s === currentStyle ? ' selected' : ''}>${s}</option>`).join('')}
          </select>
        </label>
      </div>
      <div class="chromic-ts-actions">
        <button class="chromic-ts-btn" data-action="set-start">[ Set Start</button>
        <button class="chromic-ts-btn" data-action="set-end">] Set End</button>
        <button class="chromic-ts-btn chromic-ts-apply" data-action="apply">✓ Apply</button>
        <button class="chromic-ts-btn" data-action="cancel">Cancel</button>
      </div>
      <div class="chromic-ts-cue-actions">
        <button class="chromic-ts-btn" data-action="insert-cue-before" title="Insert vocal cue before this line">+ Cue Before</button>
        <button class="chromic-ts-btn" data-action="insert-cue-after" title="Insert vocal cue after this line">+ Cue After</button>
        <button class="chromic-ts-btn chromic-ts-destructive" data-action="remove-line" title="Remove this line (convert to cue)">✕ Remove Line</button>
      </div>
    `;

    // Don't auto-focus the panel inputs — let the user click into them.
    // Auto-focusing steals focus from lyrics words, preventing text editing.

    // Position near the word
    const rect = wordEl.getBoundingClientRect();
    panel.style.position = 'fixed';
    panel.style.top = `${Math.min(rect.bottom + 8, window.innerHeight - 200)}px`;
    panel.style.left = `${Math.max(8, Math.min(rect.left, window.innerWidth - 320))}px`;
    this._getFloatingHost().appendChild(panel);
    this._timestampPanel = panel;

    // Handle actions
    panel.addEventListener('click', (e) => {
      const btn = e.target.closest('[data-action]');
      console.log('[ChromicEditor] Panel click:', {
        target: e.target.tagName,
        action: btn?.dataset?.action || null,
        className: e.target.className?.slice?.(0, 40),
      });
      if (!btn) return;
      const action = btn.dataset.action;
      const startInput = panel.querySelector('.chromic-ts-start');
      const endInput = panel.querySelector('.chromic-ts-end');

      if (action === 'cancel') {
        this._hideTimestampPanel();
        return;
      }

      if (action === 'set-start' && this._mediaSource) {
        const t = this._mediaSource.element.currentTime;
        startInput.value = t.toFixed(3);
        wordEl.dataset.start = t.toFixed(3);
        this._markDirty();
        console.log(`[ChromicEditor] Set word start = ${t.toFixed(3)}s`);
      } else if (action === 'set-end' && this._mediaSource) {
        const t = this._mediaSource.element.currentTime;
        endInput.value = t.toFixed(3);
        wordEl.dataset.end = t.toFixed(3);
        this._markDirty();
        console.log(`[ChromicEditor] Set word end = ${t.toFixed(3)}s`);
      } else if (action === 'apply') {
        const s = parseFloat(startInput.value);
        const en = parseFloat(endInput.value);
        if (Number.isFinite(s)) wordEl.dataset.start = String(s);
        if (Number.isFinite(en)) wordEl.dataset.end = String(en);
        const styleSelect = panel.querySelector('.chromic-ts-style');
        const style = styleSelect?.value || 'normal';
        // Store in editedLines
        const key = `${lineIdx}:${wordIdx}`;
        this._editedLines.set(key, { text: wordEl.textContent, startSec: s, endSec: en, style });
        this._markDirty();
        // Apply style class
        if (style !== 'normal') {
          VOCAL_STYLES.forEach(st => wordEl.classList.remove(`chromic-style-${st}`));
          wordEl.classList.add(`chromic-style-${style}`);
          wordEl.dataset.style = style;
        }
        console.log(`[ChromicEditor] Applied word: start=${s}, end=${en}, style=${style}`);
        // Visual feedback
        wordEl.style.boxShadow = '0 0 0 2px rgba(0,255,120,0.6)';
        setTimeout(() => { wordEl.style.boxShadow = ''; }, 600);
        this._hideTimestampPanel();
      } else if (action === 'insert-cue-before') {
        this._insertCueAdjacentToLine(line, 'before');
        this._hideTimestampPanel();
      } else if (action === 'insert-cue-after') {
        this._insertCueAdjacentToLine(line, 'after');
        this._hideTimestampPanel();
      } else if (action === 'remove-line') {
        this._deleteActiveElement();
        this._hideTimestampPanel();
      }
    });

    // Style select change (without clicking Apply)
    const styleSelect = panel.querySelector('.chromic-ts-style');
    styleSelect?.addEventListener('change', () => {
      this._setWordStyle(styleSelect.value);
    });
  }

  _hideTimestampPanel() {
    console.log('[ChromicEditor] _hideTimestampPanel called, panel exists:', !!this._timestampPanel);
    if (this._timestampPanel) {
      this._timestampPanel.remove();
      this._timestampPanel = null;
      console.log('[ChromicEditor] Timestamp panel removed');
    }
  }

  /** Select next/prev word for calibration */
  _selectAdjacentWord(direction) {
    const allWords = Array.from(document.querySelectorAll('.lyrics-line .lyric-word'));
    if (!allWords.length) return;
    const currentIdx = this._activeWordEl ? allWords.indexOf(this._activeWordEl) : -1;
    let nextIdx = currentIdx + direction;
    if (nextIdx < 0) nextIdx = allWords.length - 1;
    if (nextIdx >= allWords.length) nextIdx = 0;

    if (this._activeWordEl) this._activeWordEl.classList.remove('chromic-edit-active');
    this._activeWordEl = allWords[nextIdx];
    this._activeWordEl.classList.add('chromic-edit-active');
    this._activeWordEl.scrollIntoView({ block: 'center', behavior: 'smooth' });

    const line = this._activeWordEl.closest('.lyrics-line');
    const wordIdx = this._activeWordEl.dataset.wordIndex;
    console.log(`[ChromicEditor] Selected word "${this._activeWordEl.textContent}" (word ${wordIdx} in line ${line?.dataset?.lineIndex})`);
  }

  /** Jump to the same word index in the next/prev line (ArrowUp/ArrowDown) */
  _selectAdjacentLine(direction) {
    const allLines = Array.from(document.querySelectorAll('.lyrics-line'));
    if (!allLines.length) return;

    // Find current line
    const currentLine = this._activeWordEl?.closest('.lyrics-line');
    const currentLineIdx = currentLine ? allLines.indexOf(currentLine) : -1;
    let targetLineIdx = currentLineIdx + direction;
    if (targetLineIdx < 0) targetLineIdx = allLines.length - 1;
    if (targetLineIdx >= allLines.length) targetLineIdx = 0;

    const targetLine = allLines[targetLineIdx];
    const wordsInTarget = Array.from(targetLine.querySelectorAll('.lyric-word'));
    if (!wordsInTarget.length) return;

    // Try to keep the same word index, clamp to last word
    const currentWordIdx = this._activeWordEl ? parseInt(this._activeWordEl.dataset.wordIndex) || 0 : 0;
    const targetWord = wordsInTarget[Math.min(currentWordIdx, wordsInTarget.length - 1)];

    if (this._activeWordEl) this._activeWordEl.classList.remove('chromic-edit-active');
    this._activeWordEl = targetWord;
    this._activeWordEl.classList.add('chromic-edit-active');
    this._activeWordEl.scrollIntoView({ block: 'center', behavior: 'smooth' });

    console.log(`[ChromicEditor] Arrow ${direction > 0 ? 'Down' : 'Up'} → word "${targetWord.textContent}" (word ${targetWord.dataset.wordIndex} in line ${targetLine.dataset?.lineIndex})`);
  }

  /** Convert a vocal_cue (• • •) to a lyric line — prompts for text */
  _convertCueToLine() {
    const activeCue = document.querySelector('.lyrics-intro-dots.active') || document.querySelector('.lyrics-intro-dots.chromic-edit-active');
    if (!activeCue) {
      console.log('[ChromicEditor] No active vocal_cue to convert. Click on a • • • element first.');
      return;
    }
    const text = prompt('[ChromicEditor] Enter lyric text for this cue:');
    if (!text?.trim()) return;

    const lineIndex = activeCue.dataset.lineIndex;
    // Replace dots with a proper lyrics line
    const p = document.createElement('p');
    p.className = 'lyrics-line chromic-editable';
    p.setAttribute('contenteditable', 'true');
    p.dataset.lineIndex = lineIndex;
    p.dataset.start = activeCue.dataset.start || '0';
    p.textContent = text.trim();
    activeCue.replaceWith(p);

    this._editedLines.set(lineIndex, {
      text: text.trim(),
      startSec: parseFloat(p.dataset.start) || 0,
      convertedFromCue: true,
    });
    console.log(`[ChromicEditor] Converted cue at index ${lineIndex} to line: "${text.trim()}"`);
  }

  /** Convert active lyric line to a vocal_cue */
  _convertLineToCue() {
    const activeLine = this._activeWordEl?.closest('.lyrics-line') || document.querySelector('.lyrics-line.active');
    if (!activeLine) {
      console.log('[ChromicEditor] No active line to convert to cue.');
      return;
    }
    const lineIndex = activeLine.dataset.lineIndex;
    const div = document.createElement('div');
    div.className = 'lyrics-intro-dots';
    div.dataset.lineIndex = lineIndex;
    div.innerHTML = '<span class="dot"></span><span class="dot"></span><span class="dot"></span>';
    activeLine.replaceWith(div);

    if (this._activeWordEl) {
      this._activeWordEl.classList.remove('chromic-edit-active');
      this._activeWordEl = null;
    }
    this._editedLines.set(lineIndex, { convertedToCue: true });
    console.log(`[ChromicEditor] Converted line ${lineIndex} to vocal_cue`);
  }

  /** Insert a vocal_cue (• • •) before or after a line */
  _insertCueAdjacentToLine(lineEl, position) {
    if (!lineEl) return;
    const lineIndex = lineEl.dataset.lineIndex;
    const cueIdx = position === 'before' ? `cue-before-${lineIndex}` : `cue-after-${lineIndex}`;
    const div = document.createElement('div');
    div.className = 'lyrics-intro-dots chromic-editable';
    div.dataset.lineIndex = cueIdx;
    div.dataset.start = lineEl.dataset.start || '0';
    div.innerHTML = '<span class="dot"></span><span class="dot"></span><span class="dot"></span>';

    if (position === 'before') {
      lineEl.insertAdjacentElement('beforebegin', div);
    } else {
      lineEl.insertAdjacentElement('afterend', div);
    }

    this._editedLines.set(cueIdx, { insertedCue: true, position, refLine: lineIndex });
    this._markDirty();
    console.log(`[ChromicEditor] Inserted vocal_cue ${position} line ${lineIndex}`);
  }

  /** Delete the active element entirely (line or cue) via BE with FLIP animation */
  async _deleteActiveElement() {
    const activeEl = this._activeWordEl?.closest('.lyrics-line, .lyrics-intro-dots')
      || document.querySelector('.lyrics-line.active')
      || document.querySelector('.lyrics-intro-dots.chromic-edit-active');
    if (!activeEl) {
      console.log('[ChromicEditor] No active element to delete.');
      return;
    }

    const lineIndex = parseInt(activeEl.dataset.lineIndex);
    const container = activeEl.parentElement;
    const siblings = Array.from(container.querySelectorAll('.lyrics-line, .lyrics-intro-dots'));

    // FLIP: capture positions before removal
    const firstRects = new Map();
    siblings.forEach(el => { if (el !== activeEl) firstRects.set(el, el.getBoundingClientRect()); });

    // Clear active word/HUD
    this._hideWordHud();
    this._hideTimestampPanel();
    if (this._activeWordEl) {
      this._activeWordEl.classList.remove('chromic-edit-active');
      this._activeWordEl = null;
    }

    // Animate out
    activeEl.style.transition = 'opacity 0.2s, transform 0.2s';
    activeEl.style.opacity = '0';
    activeEl.style.transform = 'scale(0.95) translateX(-20px)';

    // Call BE
    const trackPath = this._getTrackPath();
    this._badge?.classList.add('chromic-syncing');

    let beSuccess = false;
    if (trackPath && Number.isFinite(lineIndex)) {
      try {
        const res = await fetch('/api/metadata/remove', {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ trackPath, index: lineIndex }),
        });
        if (res.ok) {
          const data = await res.json();
          beSuccess = true;
          console.log(`[ChromicEditor] ✓ BE removed index ${lineIndex}`);
          document.dispatchEvent(new CustomEvent('chromic:metadata-sync', { detail: data }));
        }
      } catch (err) {
        console.warn('[ChromicEditor] BE delete failed:', err.message);
      }
    }
    this._badge?.classList.remove('chromic-syncing');
    if (beSuccess) {
      this._badge?.classList.add('chromic-sync-success');
      setTimeout(() => this._badge?.classList.remove('chromic-sync-success'), 600);
    }

    // Remove from DOM after animation
    setTimeout(() => {
      activeEl.remove();

      // FLIP: animate remaining elements upward
      siblings.forEach(el => {
        if (el === activeEl || !firstRects.has(el)) return;
        const first = firstRects.get(el);
        const last = el.getBoundingClientRect();
        const dy = first.top - last.top;
        if (Math.abs(dy) > 1) {
          el.style.transform = `translateY(${dy}px)`;
          el.style.transition = 'none';
          requestAnimationFrame(() => {
            el.style.transition = 'transform 0.3s cubic-bezier(0.23, 1, 0.32, 1)';
            el.style.transform = '';
          });
        }
      });

      // Move focus to nearest neighbor
      const idx = siblings.indexOf(activeEl);
      const nextFocus = siblings[idx + 1] || siblings[idx - 1];
      if (nextFocus) {
        const word = nextFocus.querySelector('.lyric-word');
        if (word) {
          this._activeWordEl = word;
          word.classList.add('chromic-edit-active');
          this._showWordHud(word);
        }
      }
    }, 200);

    this._editedLines.delete(String(lineIndex));
    this._markDirty();
    console.log(`[ChromicEditor] Deleted element at index ${lineIndex}`);
  }

  // === On-Word HUD (Heads-Up Display) ===

  /** Show floating HUD above selected word with start/end timestamps */
  _showWordHud(wordEl) {
    this._hideWordHud();
    const startVal = wordEl.dataset.start || '—';
    const endVal = wordEl.dataset.end || '—';

    const hud = document.createElement('div');
    hud.className = 'chromic-word-hud';
    hud.innerHTML = `<span class="chromic-hud-start">${this._fmtTime(startVal)}</span><span class="chromic-hud-sep">→</span><span class="chromic-hud-end">${this._fmtTime(endVal)}</span>`;

    // Position above the word
    const rect = wordEl.getBoundingClientRect();
    hud.style.position = 'fixed';
    hud.style.top = `${rect.top - 24}px`;
    hud.style.left = `${rect.left + rect.width / 2}px`;
    hud.style.transform = 'translateX(-50%)';
    this._getFloatingHost().appendChild(hud);
    this._wordHud = hud;
  }

  /** Update HUD values without recreating the element */
  _updateWordHud(wordEl) {
    if (!this._wordHud) return;
    const startEl = this._wordHud.querySelector('.chromic-hud-start');
    const endEl = this._wordHud.querySelector('.chromic-hud-end');
    if (startEl) startEl.textContent = this._fmtTime(wordEl.dataset.start || '—');
    if (endEl) endEl.textContent = this._fmtTime(wordEl.dataset.end || '—');
    // Reposition
    const rect = wordEl.getBoundingClientRect();
    this._wordHud.style.top = `${rect.top - 24}px`;
    this._wordHud.style.left = `${rect.left + rect.width / 2}px`;
  }

  _hideWordHud() {
    if (this._wordHud) {
      this._wordHud.remove();
      this._wordHud = null;
    }
  }

  _fmtTime(val) {
    const n = parseFloat(val);
    if (!Number.isFinite(n)) return '—';
    const mins = Math.floor(n / 60);
    const secs = (n % 60).toFixed(3);
    return `${String(mins).padStart(2, '0')}:${secs.padStart(6, '0')}`;
  }

  // === Insert Line Below (with FLIP animation) ===

  /** Insert a new editable line below the active line with auto time-gap */
  _insertLineBelow() {
    const activeLine = this._activeWordEl?.closest('.lyrics-line') || document.querySelector('.lyrics-line.active');
    if (!activeLine) return;

    const container = activeLine.parentElement;
    const siblings = Array.from(container.querySelectorAll('.lyrics-line, .lyrics-intro-dots'));

    // FLIP: capture "First" positions
    const firstRects = new Map();
    siblings.forEach(el => firstRects.set(el, el.getBoundingClientRect()));

    // Calculate auto time-gap
    const prevEnd = parseFloat(activeLine.dataset.start) + 2.0; // estimate
    const nextSibling = activeLine.nextElementSibling;
    const nextStart = nextSibling?.dataset?.start ? parseFloat(nextSibling.dataset.start) : prevEnd + 1.0;
    const insertTime = ((prevEnd + nextStart) / 2).toFixed(3);

    // Create new line
    const newLine = document.createElement('p');
    newLine.className = 'lyrics-line chromic-editable';
    newLine.setAttribute('contenteditable', 'true');
    newLine.dataset.lineIndex = `inserted-${Date.now()}`;
    newLine.dataset.start = insertTime;
    newLine.textContent = '♪ ...';
    activeLine.insertAdjacentElement('afterend', newLine);

    // FLIP: capture "Last" positions and animate
    siblings.forEach(el => {
      const first = firstRects.get(el);
      const last = el.getBoundingClientRect();
      const dy = first.top - last.top;
      if (Math.abs(dy) > 1) {
        el.style.transform = `translateY(${dy}px)`;
        el.style.transition = 'none';
        requestAnimationFrame(() => {
          el.style.transition = 'transform 0.3s cubic-bezier(0.23, 1, 0.32, 1)';
          el.style.transform = '';
        });
      }
    });

    // Animate new line entry
    newLine.style.opacity = '0';
    newLine.style.transform = 'translateY(-10px)';
    requestAnimationFrame(() => {
      newLine.style.transition = 'opacity 0.3s, transform 0.3s cubic-bezier(0.23, 1, 0.32, 1)';
      newLine.style.opacity = '1';
      newLine.style.transform = '';
    });

    // Focus for editing
    setTimeout(() => {
      newLine.focus();
      // Select placeholder text
      const range = document.createRange();
      range.selectNodeContents(newLine);
      const sel = window.getSelection();
      sel.removeAllRanges();
      sel.addRange(range);
    }, 50);

    this._editedLines.set(newLine.dataset.lineIndex, { text: '', startSec: parseFloat(insertTime), insertedLine: true });
    this._markDirty();
    console.log(`[ChromicEditor] Inserted new line below at ${insertTime}s`);
  }

  _showBadge() {
    if (this._badge) return;
    this._badge = document.createElement('div');
    this._badge.className = 'chromic-pro-badge';
    this._badge.innerHTML = `
      <span class="chromic-pro-label">PRO MODE</span>
      <button type="button" class="chromic-flow-toggle" title="Toggle Flow Mode (${(window.chromicElectron?.platform === 'darwin' || /mac/i.test(navigator.platform)) ? '⌘+Shift+F' : 'Ctrl+Shift+F'})"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:-1px;margin-right:3px"><path d="M2 12h2"/><path d="M6 8v8"/><path d="M10 4v16"/><path d="M14 6v12"/><path d="M18 8v8"/><path d="M22 12h-2"/></svg>Flow</button>
      <div class="chromic-speed-control">
        <input type="range" class="chromic-speed-slider" min="0.05" max="1.0" step="0.01" value="1.0">
        <span class="chromic-speed-value">1.0x</span>
      </div>
    `;
    const host = this._getFloatingHost();
    host.appendChild(this._badge);

    // Flow mode toggle button
    this._badge.querySelector('.chromic-flow-toggle')?.addEventListener('click', () => this._toggleFlowMode());

    // Speed slider handler
    const slider = this._badge.querySelector('.chromic-speed-slider');
    const label = this._badge.querySelector('.chromic-speed-value');
    slider?.addEventListener('input', (e) => {
      let val = parseFloat(e.target.value);
      // Magnetic snap to common speeds
      const snaps = [0.05, 0.10, 0.15, 0.25, 0.5, 0.75, 1.0];
      for (const snap of snaps) {
        if (Math.abs(val - snap) < 0.03) { val = snap; e.target.value = String(snap); break; }
      }
      this.playbackSpeed = val;
      if (this._mediaSource?.element) {
        this._mediaSource.element.playbackRate = val;
      }
      label.textContent = `${val.toFixed(2)}x`;
      console.log(`[ChromicEditor] Speed: ${val}x`);
    });
  }

  _hideBadge() {
    if (this._badge) {
      this._badge.remove();
      this._badge = null;
    }
  }

  /** Cycle slow motion speed: 1.0x → 0.75x → 0.5x → 0.25x */
  _cycleSpeed() {
    this._speedIndex = (this._speedIndex + 1) % SPEED_CYCLE.length;
    this.playbackSpeed = SPEED_CYCLE[this._speedIndex];
    if (this._mediaSource?.element) {
      this._mediaSource.element.playbackRate = this.playbackSpeed;
    }
    this._updateBadgeText();
    // Sync slider
    const slider = this._badge?.querySelector('.chromic-speed-slider');
    if (slider) slider.value = String(this.playbackSpeed);
    console.log(`[ChromicEditor] Slow Mode: ${this.playbackSpeed}x`);
  }

  /** Reset speed to normal */
  _resetSpeed() {
    this._speedIndex = 0;
    this.playbackSpeed = 1.0;
    if (this._mediaSource?.element) {
      this._mediaSource.element.playbackRate = 1.0;
    }
  }

  _updateBadgeText() {
    if (!this._badge) return;
    const label = this._badge.querySelector('.chromic-pro-label');
    const speedLabel = this._badge.querySelector('.chromic-speed-value');
    const dirtyDot = this.isDirty ? ' •' : '';
    if (label) label.textContent = `PRO MODE${dirtyDot}`;
    if (speedLabel) speedLabel.textContent = `${this.playbackSpeed.toFixed(2)}x`;
  }

  /** Mark state as dirty (unsaved changes exist) */
  _markDirty() {
    this.isDirty = true;
    this._updateBadgeText();
  }

  /** Set vocal style on active word */
  _setWordStyle(style) {
    if (!this._activeWordEl) return;
    this._activeWordEl.dataset.style = style;
    // Remove all style classes, add new one
    VOCAL_STYLES.forEach(s => this._activeWordEl.classList.remove(`chromic-style-${s}`));
    if (style !== 'normal') {
      this._activeWordEl.classList.add(`chromic-style-${style}`);
    }
    // Store in editedLines
    const line = this._activeWordEl.closest('[data-line-index]');
    const key = `${line?.dataset?.lineIndex}:${this._activeWordEl.dataset.wordIndex}`;
    const existing = this._editedLines.get(key) || {};
    existing.style = style;
    existing.text = this._activeWordEl.textContent;
    this._editedLines.set(key, existing);
    this._markDirty();
    // Visual feedback
    this._activeWordEl.style.transition = 'outline-color 0.3s';
    console.log(`[ChromicEditor] Set word style: "${this._activeWordEl.textContent}" → ${style}`);
    // Update panel select if open
    const select = this._timestampPanel?.querySelector('.chromic-ts-style');
    if (select) select.value = style;
  }

  /** Show confirmation modal when exiting with unsaved changes */
  _showConfirmModal() {
    if (this._confirmModal) return;
    // Pause playback
    if (this._mediaSource?.element && !this._mediaSource.element.paused) {
      this._mediaSource.element.pause();
    }

    const editCount = this._editedLines.size;
    const modal = document.createElement('div');
    modal.className = 'chromic-confirm-modal';
    modal.innerHTML = `
      <div class="chromic-confirm-backdrop"></div>
      <div class="chromic-confirm-sheet">
        <h3>Unsaved Metadata Changes</h3>
        <p>You have <strong>${editCount}</strong> modified entries in this session.</p>
        <div class="chromic-confirm-actions">
          <button class="chromic-confirm-btn chromic-confirm-primary" data-action="sync">Sync to Server</button>
          <button class="chromic-confirm-btn chromic-confirm-secondary" data-action="export">Export JSON File</button>
          <button class="chromic-confirm-btn chromic-confirm-secondary" data-action="clipboard">Copy JSON to Clipboard</button>
          <button class="chromic-confirm-btn chromic-confirm-destructive" data-action="discard">Discard Changes</button>
          <button class="chromic-confirm-btn" data-action="cancel">Cancel</button>
        </div>
        <div class="chromic-confirm-status" style="display:none;"></div>
      </div>
    `;
    this._getFloatingHost().appendChild(modal);
    this._confirmModal = modal;

    modal.addEventListener('click', async (e) => {
      const btn = e.target.closest('[data-action]');
      if (!btn) return;
      const action = btn.dataset.action;
      const statusEl = modal.querySelector('.chromic-confirm-status');

      if (action === 'sync') {
        statusEl.style.display = '';
        statusEl.textContent = 'Syncing with server...';
        btn.disabled = true;
        const success = await this._syncToBackend();
        if (success) {
          this._editedLines.clear();
          this.isDirty = false;
          this._dismissConfirmModal();
          this.deactivate();
        } else {
          statusEl.textContent = 'Server unreachable. Use "Export" or "Copy" as backup.';
          btn.disabled = false;
        }
      } else if (action === 'export') {
        this.exportJSON();
        this._editedLines.clear();
        this.isDirty = false;
        this._dismissConfirmModal();
        this.deactivate();
      } else if (action === 'clipboard') {
        const json = this._buildExportPayload();
        await navigator.clipboard.writeText(JSON.stringify(json, null, 2));
        statusEl.style.display = '';
        statusEl.textContent = '✓ Copied to clipboard';
        setTimeout(() => { statusEl.style.display = 'none'; }, 2000);
        console.log('[ChromicEditor] JSON copied to clipboard');
      } else if (action === 'discard') {
        this._editedLines.clear();
        this.isDirty = false;
        this._dismissConfirmModal();
        this.deactivate();
        console.log('[ChromicEditor] Changes discarded');
      } else if (action === 'cancel') {
        this._dismissConfirmModal();
      }
    });
  }

  _dismissConfirmModal() {
    if (this._confirmModal) {
      this._confirmModal.remove();
      this._confirmModal = null;
    }
  }

  /**
   * Sync all edits to the backend via PATCH /api/metadata/update.
   * Returns true on success, false on failure (offline/error).
   */
  async _syncToBackend() {
    const payload = this._buildExportPayload();
    const trackPath = this._getTrackPath();
    if (!trackPath) {
      console.warn('[ChromicEditor] ✗ No trackPath available for sync');
      return false;
    }
    // Pulse badge orange during sync
    this._badge?.classList.add('chromic-syncing');
    try {
      // 1. Sync timeline lines
      const res = await fetch('/api/metadata/update', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ trackPath, lines: payload.lines }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const updatedJson = await res.json();
      console.log('[ChromicEditor] ✓ Synced timeline to server:', updatedJson);

      // 2. Sync translations if any were edited
      const hasTranslationEdits = [...this._editedLines.keys()].some(k => k.startsWith('translation:'));
      if (hasTranslationEdits) {
        const translations = payload.lines
          .filter(l => l.translation != null)
          .map(l => l.translation);
        // Detect language from the AI settings or DOM
        const lang = document.querySelector('[name="translationLang"]')?.value || 'uk';
        try {
          const tRes = await fetch('/api/lyrics/translation/save', {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ trackPath, lang, translations }),
          });
          if (tRes.ok) console.log(`[ChromicEditor] ✓ Synced ${translations.length} translations (${lang})`);
        } catch (tErr) {
          console.warn('[ChromicEditor] Translation sync failed:', tErr.message);
        }
      }

      // Success: flash badge cyan
      this._badge?.classList.remove('chromic-syncing');
      this._badge?.classList.add('chromic-sync-success');
      setTimeout(() => this._badge?.classList.remove('chromic-sync-success'), 600);
      if (this._wordHud) {
        this._wordHud.classList.add('chromic-hud-synced');
        setTimeout(() => this._wordHud?.classList.remove('chromic-hud-synced'), 300);
      }
      document.dispatchEvent(new CustomEvent('chromic:metadata-sync', { detail: updatedJson }));
      return true;
    } catch (err) {
      this._badge?.classList.remove('chromic-syncing');
      console.warn('[ChromicEditor] ✗ Sync failed:', err.message);
      return false;
    }
  }

  /** Resolve current track's relative media path */
  _getTrackPath() {
    // Try: globalAudio src → extract relative path after /media/
    const audio = this._mediaSource?.element || document.getElementById('globalAudio') || document.querySelector('audio');
    if (audio?.src) {
      try {
        const url = new URL(audio.src, location.origin);
        // Normal /media/music/... URLs
        const mediaIdx = url.pathname.indexOf('/media/');
        if (mediaIdx !== -1) return decodeURIComponent(url.pathname.slice(mediaIdx + '/media/'.length));
        // /api/stream/music/... URLs
        const streamIdx = url.pathname.indexOf('/api/stream/');
        if (streamIdx !== -1) return decodeURIComponent(url.pathname.slice(streamIdx + '/api/stream/'.length));
        // /api/stream?path=... URLs
        if (url.pathname === '/api/stream' && url.searchParams.has('path')) {
          // Can't derive relative path from absolute, fall through
        }
      } catch (e) { /* invalid URL, fall through */ }
    }
    // Try: MusicPlayer's current track object (exposed on window.musicRuntime)
    const mp = window.musicRuntime;
    if (mp?.items && mp.currentTrackIndex >= 0) {
      const track = mp.items[mp.currentTrackIndex];
      if (track?.path) return track.path;
      if (track?.url) {
        try {
          const url = new URL(track.url, location.origin);
          const mediaIdx = url.pathname.indexOf('/media/');
          if (mediaIdx !== -1) return decodeURIComponent(url.pathname.slice(mediaIdx + '/media/'.length));
        } catch {}
      }
    }
    // Fallback: data attribute on player
    return document.querySelector('[data-track-path]')?.dataset.trackPath || '';
  }

  /** Build the full export payload (used by exportJSON, clipboard, and sync) */
  _buildExportPayload() {
    const lines = [];
    document.querySelectorAll('.lyrics-line, .cue-text').forEach((el) => {
      const lineIndex = el.dataset.lineIndex;
      const edited = this._editedLines.get(lineIndex);
      const translationEl = el.querySelector('.lyrics-translation');
      const translationEdited = this._editedLines.get(`translation:${lineIndex}`);
      const lineData = {
        index: parseInt(lineIndex) || lines.length,
        text: el.textContent.trim(),
        startSec: (edited?.startSec ?? parseFloat(el.dataset.start)) || 0,
        endSec: (edited?.endSec ?? parseFloat(el.dataset.end)) || 0,
        words: Array.from(el.querySelectorAll('.lyric-word, [data-word-index]')).map((w) => {
          const wordData = {
            text: w.textContent.trim(),
            index: parseInt(w.dataset.wordIndex) || 0,
          };
          const style = w.dataset.style;
          if (style && style !== 'normal') wordData.style = style;
          if (w.dataset.start) wordData.start = parseFloat(w.dataset.start);
          if (w.dataset.end) wordData.end = parseFloat(w.dataset.end);
          if (w.dataset.vocalStretch) wordData.stretch = true;
          return wordData;
        }),
      };
      if (translationEl || translationEdited) {
        lineData.translation = translationEdited?.text || translationEl?.textContent?.trim() || '';
      }
      lines.push(lineData);
    });

    return {
      exportedAt: new Date().toISOString(),
      engine: 'ChromicEditor v2.0',
      mediaType: this._mediaSource?.type || 'unknown',
      editCount: this._editedLines.size,
      trackPath: this._getTrackPath(),
      lines,
    };
  }

  /** Derive a clean filename base from the current track path */
  _getExportBaseName() {
    const trackPath = this._getTrackPath();
    if (!trackPath) return 'chromic-metadata';
    // Extract filename without extension: "music/Album/Artist - Title.mp3" → "Artist - Title"
    const parts = trackPath.split('/');
    const filename = parts[parts.length - 1] || parts[parts.length - 2] || 'track';
    return filename.replace(/\.\w{2,5}$/, '').replace(/[/\\:*?"<>|]/g, '_');
  }

  /**
   * Export all current lyrics/subtitle metadata as JSON.
   */
  exportJSON() {
    const payload = this._buildExportPayload();
    const baseName = this._getExportBaseName();
    this._downloadBlob(JSON.stringify(payload, null, 2), `${baseName}.json`, 'application/json');
    return payload;
  }

  /**
   * Export lyrics in standard .lrc format.
   */
  exportLRC() {
    const lrcLines = [];
    document.querySelectorAll('.lyrics-line').forEach((el) => {
      const startSec = parseFloat(el.dataset.start) || 0;
      const edited = this._editedLines.get(el.dataset.lineIndex);
      const time = edited?.startSec ?? startSec;
      const mins = Math.floor(time / 60);
      const secs = (time % 60).toFixed(2).padStart(5, '0');
      lrcLines.push(`[${String(mins).padStart(2, '0')}:${secs}]${el.textContent.trim()}`);
    });

    const content = lrcLines.join('\n');
    const baseName = this._getExportBaseName();
    this._downloadBlob(content, `${baseName}.lrc`, 'text/plain');
    return content;
  }

  _downloadBlob(content, filename, type) {
    const blob = new Blob([content], { type });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  }

  destroy() {
    this.deactivate();
    if (this._flowMode) this._deactivateFlowMode();
    document.removeEventListener('keydown', this._boundKeydown);
  }

  // ═══════════════════════════════════════════════════════════════
  // ██  FLOW MODE — Live Word Tapper
  // ═══════════════════════════════════════════════════════════════

  /**
   * Toggle Flow Mode on/off.
   * Flow Mode: type a word, hold Space to mark start, release to mark end.
   * Words are sent atomically to the backend and auto-grouped into lines.
   */
  _toggleFlowMode() {
    if (!this.active) {
      // Auto-activate pro mode first
      this.activate();
    }
    if (this._flowMode) {
      // Flow mode is the only edit mode — closing flow = closing pro mode
      this.deactivate();
    } else {
      this._activateFlowMode();
    }
  }

  _activateFlowMode() {
    this._flowMode = true;
    this._flowWordCount = 0;
    this._flowUndoStack = [];
    this._autoDetectMediaSource();

    // Hide edit-mode UI
    this._hideTimestampPanel();
    this._hideWordHud();

    // Create flow bar
    const bar = document.createElement('div');
    bar.className = 'chromic-flow-bar';
    bar.innerHTML = `
      <div class="chromic-flow-indicator" data-flow-indicator="">
        <span class="flow-dot"></span>
        <span class="flow-label">FLOW MODE</span>
      </div>
      <button type="button" class="chromic-flow-playpause" title="Play / Pause">▶</button>
      <input type="text" class="chromic-flow-input" placeholder="Type word, hold ⌥ Option to time it…" autocomplete="off" spellcheck="false">
      <select class="chromic-flow-style-select" title="Word style">
        <option value="normal">Normal</option>
        <option value="stretch">Stretch</option>
        <option value="ad-lib">Ad-lib</option>
        <option value="spoken">Spoken</option>
        <option value="whisper">Whisper</option>
      </select>
      <div class="chromic-flow-status">
        <span class="flow-word-count">0 words</span>
        <span class="flow-gold-badge" data-flow-gold-badge hidden>Gold</span>
        <span class="flow-last-word"></span>
      </div>
      <div class="chromic-flow-actions">
        <button type="button" class="chromic-flow-gold" title="Verify as Gold — mark this track as perfect for AI training"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg> Gold</button>
        <button type="button" class="chromic-flow-save" title="Save changes"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg> Save</button>
        <button type="button" class="chromic-flow-undo" title="Undo last word (Ctrl+Z)">↩ Undo</button>
        <button type="button" class="chromic-flow-backup" title="Backups — save snapshots and restore previous versions"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:-1px;margin-right:3px"><path d="M3 2v6h6"/><path d="M3 13a9 9 0 1 0 3-7.7L3 8"/></svg>Backups</button>
        <button type="button" class="chromic-flow-elrc-toggle" title="Toggle ELRC Text Editor"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:-1px;margin-right:3px"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>ELRC</button>
        <button type="button" class="chromic-flow-lrc-toggle" title="Toggle LRC File Editor"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:-1px;margin-right:3px"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>LRC</button>
        <button type="button" class="chromic-flow-translation-toggle" title="Toggle Translation Editor"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:-1px;margin-right:3px"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10A15.3 15.3 0 0 1 12 2z"/></svg>Translation</button>
        <button type="button" class="chromic-flow-snapper-toggle" title="Word Snapper — compare Whisper vs Reference, click to snap words"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:-1px;margin-right:3px"><path d="M4 4h16v16H4z"/><path d="M9 9h6v6H9z"/><path d="M4 12h5M15 12h5M12 4v5M12 15v5"/></svg>Snapper</button>
        <button type="button" class="chromic-flow-close" title="Exit Flow Mode (Esc)">✕</button>
      </div>
      <div class="chromic-flow-elrc-panel" hidden>
        <div class="chromic-flow-elrc-wrap">
          <div class="chromic-flow-elrc-highlight" aria-hidden="true"></div>
          <textarea class="chromic-flow-elrc-textarea" spellcheck="false" placeholder="ELRC text will appear here..."></textarea>
        </div>
        <div class="chromic-flow-elrc-actions">
          <button type="button" class="chromic-flow-elrc-apply">Apply Changes</button>
          <span class="chromic-flow-elrc-hint">Format: [ss.xx] word &nbsp;|&nbsp; Edit timestamps & text directly</span>
        </div>
      </div>
      <div class="chromic-flow-lrc-panel" hidden>
        <div class="chromic-flow-lrc-source-bar" hidden>
          <span class="chromic-flow-lrc-source-label"></span>
          <div class="chromic-flow-lrc-version-bar" style="display:flex;gap:6px;align-items:center;flex-wrap:wrap;">
            <select class="chromic-flow-lrc-version-select" style="font-size:11px;padding:3px 6px;border-radius:4px;border:1px solid rgba(255,255,255,0.15);background:rgba(255,255,255,0.06);color:rgba(255,255,255,0.8);max-width:200px;">
              <option value="current">Current Version</option>
            </select>
            <button type="button" class="chromic-flow-lrc-use-embedded" hidden style="font-size:11px;padding:3px 8px;border-radius:4px;border:1px solid rgba(255,255,255,0.15);background:rgba(255,255,255,0.06);color:rgba(255,255,255,0.7);cursor:pointer;">View Embedded (read-only)</button>
          </div>
        </div>
        <div class="chromic-flow-lrc-embedded-ref" hidden style="border:1px solid rgba(255,200,100,0.2);border-radius:6px;margin:0 0 6px;padding:6px 8px;background:rgba(255,200,100,0.04);">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:4px;">
            <span style="font-size:10px;font-weight:600;color:rgba(255,200,100,0.7);text-transform:uppercase;letter-spacing:0.5px;">Embedded Reference (from audio file — read-only anchor)</span>
            <button type="button" class="chromic-flow-lrc-close-embedded" style="font-size:10px;padding:2px 6px;border-radius:3px;border:1px solid rgba(255,255,255,0.1);background:rgba(255,255,255,0.05);color:rgba(255,255,255,0.5);cursor:pointer;">Hide</button>
          </div>
          <pre class="chromic-flow-lrc-embedded-content" style="font-size:11px;max-height:150px;overflow:auto;white-space:pre-wrap;color:rgba(255,255,255,0.5);margin:0;font-family:inherit;"></pre>
        </div>
        <div class="chromic-flow-lrc-wrap">
          <textarea class="chromic-flow-lrc-textarea" spellcheck="false" placeholder="LRC file content will appear here..."></textarea>
        </div>
        <div class="chromic-flow-lrc-actions">
          <button type="button" class="chromic-flow-lrc-save-btn"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:-1px;margin-right:3px"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg>Save LRC</button>
          <button type="button" class="chromic-flow-lrc-realign-btn" title="Save .lrc then re-run aligner to generate word-level sync from this text"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:-1px;margin-right:3px"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/></svg>Save &amp; Re-align</button>
          <span class="chromic-flow-lrc-hint">Edit the .lrc sidecar file directly — backups are created automatically</span>
        </div>
      </div>
      <div class="chromic-flow-translation-panel" hidden>
        <textarea class="chromic-flow-translation-textarea" spellcheck="false" placeholder="Loading translation..."></textarea>
        <div class="chromic-flow-translation-actions">
          <button type="button" class="chromic-flow-translation-save-btn"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:-1px;margin-right:3px"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg>Save Translation</button>
          <span class="chromic-flow-translation-hint">Edit AI-generated translations line by line</span>
        </div>
      </div>
      <div class="chromic-flow-snapper-panel" hidden>
        <div class="snapper-header">
          <span class="snapper-title">Word Snapper</span>
          <div class="snapper-view-toggle">
            <button type="button" class="snapper-view-btn active" data-view="aligned">Aligned</button>
            <button type="button" class="snapper-view-btn" data-view="raw">Raw Whisper</button>
            <button type="button" class="snapper-view-btn" data-view="reference">Reference</button>
          </div>
        </div>
        <div class="snapper-content">
          <div class="snapper-word-bank" data-snapper-words></div>
        </div>
        <div class="snapper-hint">Click a word to snap it to the current playhead position</div>
        <div class="snapper-actions">
          <button type="button" class="snapper-load-source-btn" title="Load this view's words into the waveform for editing">Load into Waveform</button>
        </div>
      </div>
    `;

    // Waveform container (inserted above the flow bar)
    const waveWrap = document.createElement('div');
    waveWrap.className = 'chromic-flow-waveform';
    bar.insertBefore(waveWrap, bar.firstChild);

    this._getFloatingHost().appendChild(bar);
    this._flowBar = bar;

    // ── Master click delegation for the entire flow bar ──
    bar.addEventListener('click', (e) => {
      const t = e.target;
      // Gold button or badge
      if (t.closest('.chromic-flow-gold') || t.closest('[data-flow-gold-badge]')) {
        e.preventDefault(); e.stopPropagation();
        this._flowToggleGold();
        return;
      }
      // Save
      if (t.closest('.chromic-flow-save')) {
        e.preventDefault(); e.stopPropagation();
        this._flowSaveAll();
        return;
      }
      // Backup
      if (t.closest('.chromic-flow-backup')) {
        e.preventDefault(); e.stopPropagation();
        this._flowToggleBackupDropdown(t.closest('.chromic-flow-backup'));
        return;
      }
      // ELRC toggle
      if (t.closest('.chromic-flow-elrc-toggle')) {
        e.preventDefault(); e.stopPropagation();
        const elrcPanel = bar.querySelector('.chromic-flow-elrc-panel');
        const lrcPanel = bar.querySelector('.chromic-flow-lrc-panel');
        const snapperPanel = bar.querySelector('.chromic-flow-snapper-panel');
        const translationPanel = bar.querySelector('.chromic-flow-translation-panel');
        const isOpen = !elrcPanel?.hidden;
        if (elrcPanel) elrcPanel.hidden = isOpen;
        if (lrcPanel) lrcPanel.hidden = true;
        if (translationPanel) translationPanel.hidden = true;
        if (snapperPanel) snapperPanel.hidden = true;
        t.closest('.chromic-flow-elrc-toggle').classList.toggle('active', !isOpen);
        bar.querySelector('.chromic-flow-lrc-toggle')?.classList.remove('active');
        bar.querySelector('.chromic-flow-translation-toggle')?.classList.remove('active');
        bar.querySelector('.chromic-flow-snapper-toggle')?.classList.remove('active');
        document.body.classList.toggle('chromic-flow-panel-open', !isOpen);
        if (!isOpen) this._flowSyncElrcTextarea();
        return;
      }
      // LRC toggle
      if (t.closest('.chromic-flow-lrc-toggle')) {
        e.preventDefault(); e.stopPropagation();
        const elrcPanel = bar.querySelector('.chromic-flow-elrc-panel');
        const lrcPanel = bar.querySelector('.chromic-flow-lrc-panel');
        const snapperPanel = bar.querySelector('.chromic-flow-snapper-panel');
        const translationPanel = bar.querySelector('.chromic-flow-translation-panel');
        const isOpen = !lrcPanel?.hidden;
        if (lrcPanel) lrcPanel.hidden = isOpen;
        if (elrcPanel) elrcPanel.hidden = true;
        if (translationPanel) translationPanel.hidden = true;
        if (snapperPanel) snapperPanel.hidden = true;
        t.closest('.chromic-flow-lrc-toggle').classList.toggle('active', !isOpen);
        bar.querySelector('.chromic-flow-elrc-toggle')?.classList.remove('active');
        bar.querySelector('.chromic-flow-translation-toggle')?.classList.remove('active');
        bar.querySelector('.chromic-flow-snapper-toggle')?.classList.remove('active');
        document.body.classList.toggle('chromic-flow-panel-open', !isOpen);
        if (!isOpen) this._flowLoadLrc();
        return;
      }
      // Translation toggle
      if (t.closest('.chromic-flow-translation-toggle')) {
        e.preventDefault(); e.stopPropagation();
        const elrcPanel = bar.querySelector('.chromic-flow-elrc-panel');
        const lrcPanel = bar.querySelector('.chromic-flow-lrc-panel');
        const snapperPanel = bar.querySelector('.chromic-flow-snapper-panel');
        const translationPanel = bar.querySelector('.chromic-flow-translation-panel');
        const isOpen = !translationPanel?.hidden;
        if (translationPanel) translationPanel.hidden = isOpen;
        if (elrcPanel) elrcPanel.hidden = true;
        if (lrcPanel) lrcPanel.hidden = true;
        if (snapperPanel) snapperPanel.hidden = true;
        t.closest('.chromic-flow-translation-toggle').classList.toggle('active', !isOpen);
        bar.querySelector('.chromic-flow-elrc-toggle')?.classList.remove('active');
        bar.querySelector('.chromic-flow-lrc-toggle')?.classList.remove('active');
        bar.querySelector('.chromic-flow-snapper-toggle')?.classList.remove('active');
        document.body.classList.toggle('chromic-flow-panel-open', !isOpen);
        if (!isOpen) this._flowLoadTranslation();
        return;
      }
      // Snapper toggle
      if (t.closest('.chromic-flow-snapper-toggle')) {
        e.preventDefault(); e.stopPropagation();
        const elrcPanel = bar.querySelector('.chromic-flow-elrc-panel');
        const lrcPanel = bar.querySelector('.chromic-flow-lrc-panel');
        const snapperPanel = bar.querySelector('.chromic-flow-snapper-panel');
        const translationPanel = bar.querySelector('.chromic-flow-translation-panel');
        const isOpen = !snapperPanel?.hidden;
        if (snapperPanel) snapperPanel.hidden = isOpen;
        if (elrcPanel) elrcPanel.hidden = true;
        if (lrcPanel) lrcPanel.hidden = true;
        if (translationPanel) translationPanel.hidden = true;
        t.closest('.chromic-flow-snapper-toggle').classList.toggle('active', !isOpen);
        bar.querySelector('.chromic-flow-elrc-toggle')?.classList.remove('active');
        bar.querySelector('.chromic-flow-lrc-toggle')?.classList.remove('active');
        bar.querySelector('.chromic-flow-translation-toggle')?.classList.remove('active');
        document.body.classList.toggle('chromic-flow-panel-open', !isOpen);
        if (!isOpen) this._flowLoadSnapper();
        return;
      }
      // Snapper view toggle buttons
      if (t.closest('.snapper-view-btn')) {
        e.preventDefault(); e.stopPropagation();
        const btn = t.closest('.snapper-view-btn');
        bar.querySelectorAll('.snapper-view-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this._flowRenderSnapperView(btn.dataset.view);
        // Don't auto-push — snapper is read-only source of truth.
        // User must click "Load into Waveform" to apply.
        return;
      }
      // Load into Waveform
      if (t.closest('.snapper-load-source-btn')) {
        e.preventDefault(); e.stopPropagation();
        this._flowLoadSnapperIntoWaveform();
        return;
      }
      // ELRC Apply
      if (t.closest('.chromic-flow-elrc-apply')) {
        e.preventDefault(); e.stopPropagation();
        this._flowApplyElrcFromTextarea();
        return;
      }
      // LRC Save
      if (t.closest('.chromic-flow-lrc-save-btn')) {
        e.preventDefault(); e.stopPropagation();
        this._flowSaveLrc();
        return;
      }
      // LRC Save & Re-align
      if (t.closest('.chromic-flow-lrc-realign-btn')) {
        e.preventDefault(); e.stopPropagation();
        this._flowSaveLrcAndRealign();
        return;
      }
      // LRC View Embedded Reference (toggle read-only panel)
      if (t.closest('.chromic-flow-lrc-use-embedded')) {
        e.preventDefault(); e.stopPropagation();
        const embeddedRef = bar.querySelector('.chromic-flow-lrc-embedded-ref');
        const content = bar.querySelector('.chromic-flow-lrc-embedded-content');
        if (embeddedRef && this._flowLrcEmbedded) {
          const isHidden = embeddedRef.hidden;
          embeddedRef.hidden = !isHidden;
          if (isHidden && content) content.textContent = this._flowLrcEmbedded;
        }
        return;
      }
      // LRC Close Embedded Reference
      if (t.closest('.chromic-flow-lrc-close-embedded')) {
        e.preventDefault(); e.stopPropagation();
        const embeddedRef = bar.querySelector('.chromic-flow-lrc-embedded-ref');
        if (embeddedRef) embeddedRef.hidden = true;
        return;
      }
      // LRC Version Select
      if (t.closest('.chromic-flow-lrc-version-select')) {
        // handled by change event below
        return;
      }
      // Translation Save
      if (t.closest('.chromic-flow-translation-save-btn')) {
        e.preventDefault(); e.stopPropagation();
        this._flowSaveTranslation();
        return;
      }
      // Undo
      if (t.closest('.chromic-flow-undo')) {
        e.preventDefault(); e.stopPropagation();
        this._flowUndo();
        return;
      }
      // Close
      if (t.closest('.chromic-flow-close')) {
        e.preventDefault(); e.stopPropagation();
        this.deactivate();
        return;
      }
      // Play/Pause
      if (t.closest('.chromic-flow-playpause')) {
        e.preventDefault(); e.stopPropagation();
        const media = this._mediaSource?.element;
        if (media) {
          if (media.paused) { media.play(); this._flowBar?.classList.remove('flow-paused'); }
          else { media.pause(); this._flowBar?.classList.add('flow-paused'); }
        }
        return;
      }
    });

    // Keep flow bar mounted to the current floating host while overlay opens/closes.
    this._syncFlowBarHost();
    if (this._flowHostSyncTimer) clearInterval(this._flowHostSyncTimer);
    this._flowHostSyncTimer = setInterval(() => this._syncFlowBarHost(), 150);
    this._flowInput = bar.querySelector('.chromic-flow-input');

    // Init waveform painter
    this._waveformPainter = new WaveformPainter(this._mediaSource?.element);
    this._waveformPainter.onWordSelect = (wordIdx) => {
      // When a word is clicked/dragged on waveform, highlight it in DOM
      const word = this._waveformPainter._savedWords[wordIdx];
      if (!word) return;
      document.querySelectorAll('.lyric-word.flow-selected, .lyrics-intro-dots.flow-selected').forEach(el => el.classList.remove('flow-selected'));

      if (word.isCue) {
        const cueEl = document.querySelector(`.lyrics-intro-dots[data-line-index="${word.lineIndex}"]`);
        if (cueEl) {
          cueEl.classList.add('flow-selected');
          cueEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
        // Cue selected — clear input
        if (this._flowInput) {
          this._flowInput.value = '';
          this._flowInput.placeholder = 'Cue selected (timing only)';
        }
        this._flowSelectedWordEl = null;
      } else {
        // Find matching DOM word
        let foundEl = null;
        const wordEls = document.querySelectorAll('.lyric-word[data-start][data-end]');
        for (const el of wordEls) {
          const s = parseFloat(el.dataset.start);
          const e = parseFloat(el.dataset.end);
          if (Math.abs(s - word.start) < 0.02 && Math.abs(e - word.end) < 0.02) {
            el.classList.add('flow-selected');
            el.scrollIntoView({ behavior: 'smooth', block: 'center' });
            foundEl = el;
            break;
          }
        }
        // Pre-fill input with word text
        if (this._flowInput) {
          this._flowInput.value = word.text || '';
          this._flowInput.placeholder = 'Edit word text, Enter to save…';
        }
        // Sync style dropdown
        const style = word.style || 'normal';
        if (this._flowStyleSelect) {
          this._flowStyleSelect.value = style;
        }
        // Track selected DOM element
        this._flowSelectedWordEl = foundEl;
      }
      // Seek to word start
      if (this._mediaSource?.element) {
        this._mediaSource.element.currentTime = word.start;
      }
    };
    this._waveformPainter.init().then(ok => {
      if (ok && this._flowMode) {
        this._waveformPainter.mount(waveWrap);
        console.log('[ChromicEditor]  Waveform mounted');
      }
    });

    // Focus the input
    setTimeout(() => this._flowInput?.focus(), 50);

    // Attach flow-specific key handlers to the input
    this._flowInput.addEventListener('keydown', this._boundFlowKeydown);
    this._flowInput.addEventListener('keyup', this._boundFlowKeyup);

    // Undo / Close — handled by master click delegation on bar

    // Play/Pause button
    this._flowPlayBtn = bar.querySelector('.chromic-flow-playpause');
    // (handled by master click delegation)

    // Sync play/pause icon with media state
    const media = this._mediaSource?.element;
    if (media) {
      this._flowMediaPlay = () => this._updateFlowPlayBtn();
      this._flowMediaPause = () => this._updateFlowPlayBtn();
      this._flowMediaTimeUpdate = () => this._flowUpdateElrcHighlight(media.currentTime);
      media.addEventListener('play', this._flowMediaPlay);
      media.addEventListener('pause', this._flowMediaPause);
      media.addEventListener('timeupdate', this._flowMediaTimeUpdate);
      this._flowMediaEnded = () => this._flowOnTrackEnded();
      media.addEventListener('ended', this._flowMediaEnded);
      this._updateFlowPlayBtn();
    }

    // Style dropdown
    this._flowStyleSelect = bar.querySelector('.chromic-flow-style-select');
    this._flowStyleSelect?.addEventListener('change', () => {
      this._flowApplyStyleToSelected();
    });

    // Save / Gold / Train / Backup — all handled by master click delegation
    this._flowGoldBtn = bar.querySelector('.chromic-flow-gold');
    this._flowCheckGoldStatus();

    // ── ELRC / Translation / Snapper toggles — all handled by master click delegation ──

    // Sync ELRC textarea when waveform words change
    this._flowElrcTextarea = bar.querySelector('.chromic-flow-elrc-textarea');
    this._flowElrcHighlight = bar.querySelector('.chromic-flow-elrc-highlight');
    this._flowTranslationTextarea = bar.querySelector('.chromic-flow-translation-textarea');

    // Prevent space/enter in textareas from triggering global play/pause
    [this._flowElrcTextarea, this._flowTranslationTextarea].forEach(ta => {
      if (!ta) return;
      ta.addEventListener('keydown', (e) => {
        if (e.key === ' ' || e.key === 'Enter') e.stopPropagation();
      });
    });

    // Syntax-highlight overlay sync
    if (this._flowElrcTextarea && this._flowElrcHighlight) {
      const ta = this._flowElrcTextarea;
      const syncHighlight = () => this._flowSyncElrcHighlight();
      ta.addEventListener('input', syncHighlight);
      let _scrollRaf = 0;
      ta.addEventListener('scroll', () => {
        if (_scrollRaf) return;
        _scrollRaf = requestAnimationFrame(() => {
          _scrollRaf = 0;
          if (this._flowElrcHighlight) {
            this._flowElrcHighlight.scrollTop = ta.scrollTop;
            this._flowElrcHighlight.scrollLeft = ta.scrollLeft;
          }
        });
      }, { passive: true });
    }

    // Track the currently selected word element for editing
    this._flowSelectedWordEl = null;

    // Update badge
    if (this._badge) {
      const label = this._badge.querySelector('.chromic-pro-label');
      if (label) label.textContent = 'FLOW MODE';
    }

    document.body.classList.add('chromic-flow-active');

    // Load existing timed words from DOM into waveform
    this._flowLoadExistingWords();

    // Word/cue click handler — clicking in flow mode selects and syncs waveform
    this._boundFlowWordClick = (e) => {
      // Don't intercept clicks inside the flow bar itself
      if (e.target.closest('.chromic-flow-bar')) return;
      // Don't intercept style picker clicks
      if (e.target.closest('.chromic-flow-style-picker')) return;

      // Handle cue clicks
      const cueEl = e.target.closest('.lyrics-intro-dots');
      if (cueEl && this._flowMode) {
        e.preventDefault();
        e.stopPropagation();
        this._flowSelectCue(cueEl);
        return;
      }
      // Handle word clicks
      const wordEl = e.target.closest('.lyric-word[data-start][data-end]');
      if (!wordEl) return;
      e.preventDefault();
      e.stopPropagation();
      this._flowSelectWord(wordEl);
    };
    document.addEventListener('click', this._boundFlowWordClick, true);

    console.log('[ChromicEditor]  Flow Mode ACTIVATED');
  }

  _deactivateFlowMode() {
    // Check for unsaved changes before teardown → blackbox backup
    if (this._flowHasUnsavedChanges()) {
      this._flowBlackboxUnsavedChanges();
    }

    this._flowMode = false;
    this._flowTapping = false;

    // Destroy waveform
    if (this._waveformPainter) {
      this._waveformPainter.destroy();
      this._waveformPainter = null;
    }

    // Remove media event listeners
    const media = this._mediaSource?.element;
    if (media) {
      if (this._flowMediaPlay) media.removeEventListener('play', this._flowMediaPlay);
      if (this._flowMediaPause) media.removeEventListener('pause', this._flowMediaPause);
      if (this._flowMediaTimeUpdate) media.removeEventListener('timeupdate', this._flowMediaTimeUpdate);
      if (this._flowMediaEnded) media.removeEventListener('ended', this._flowMediaEnded);
    }
    this._flowPlayBtn = null;

    // Remove word click handler
    if (this._boundFlowWordClick) {
      document.removeEventListener('click', this._boundFlowWordClick, true);
      this._boundFlowWordClick = null;
    }

    // Remove flow-selected class from any word
    document.querySelectorAll('.lyric-word.flow-selected, .lyrics-intro-dots.flow-selected').forEach(el => el.classList.remove('flow-selected'));
    document.querySelectorAll('.chromic-flow-style-picker').forEach(el => el.remove());

    if (this._flowInput) {
      this._flowInput.removeEventListener('keydown', this._boundFlowKeydown);
      this._flowInput.removeEventListener('keyup', this._boundFlowKeyup);
      this._flowInput = null;
    }

    if (this._flowBar) {
      this._flowBar.remove();
      this._flowBar = null;
    }
    if (this._flowHostSyncTimer) {
      clearInterval(this._flowHostSyncTimer);
      this._flowHostSyncTimer = null;
    }

    document.body.classList.remove('chromic-flow-active');
    document.body.classList.remove('chromic-flow-panel-open');

    // Restore badge text
    this._updateBadgeText();

    // Keep pushed snapper lyrics for the listening session instead of restoring originals.
    // Store them on musicRuntime so they persist while the track plays.
    // When the user changes track, MusicPlayer will prompt to discard.
    if (this._flowLyricsPushed && this._flowOriginalLyricsPayload) {
      const mp = window.musicRuntime;
      if (mp) {
        mp._sessionLyricsOverride = {
          originalPayload: this._flowOriginalLyricsPayload,
          pushedView: this._flowPushedView,
          trackIndex: mp.currentTrackIndex,
        };
        console.log('[ChromicEditor] 📌 Snapper lyrics kept for listening session (track #' + mp.currentTrackIndex + ')');
      }
    }
    this._flowLyricsPushed = false;
    this._flowPushedView = null;
    this._flowOriginalLyricsPayload = null;

    console.log(`[ChromicEditor]  Flow Mode DEACTIVATED (${this._flowWordCount} words tapped, ${this._flowUndoStack.length} in undo stack)`);
  }

  /**
   * Push snapper view words to the live LyricsEngine on musicLyricsStage.
   * Works for any view: aligned (waveform), raw (whisper), reference (anchor text).
   * Groups words into lines (gap > 1.5s = new line), converts to timeline format.
   * Saves original lyrics payload before first push so we can restore on exit.
   */
  _flowPushToLyricsPreview(view) {
    view = view || this._snapperActiveView || 'aligned';

    // Collect words from the active view (same logic as _flowRenderSnapperView)
    let words = [];
    if (view === 'aligned') {
      // Use stored alignment data from server
      if (this._snapperData?.aligned && this._snapperData.aligned.length > 0) {
        for (const w of this._snapperData.aligned) {
          words.push({ word: w.word, start: w.start, end: w.end });
        }
      } else {
        // Fallback: use waveform (current changes)
        const saved = this._waveformPainter?._savedWords || [];
        for (const w of saved) {
          if (w.isCue) continue;
          words.push({ word: w.text, start: w.start, end: w.end });
        }
      }
    } else if (view === 'raw' && this._snapperData?.raw_whisper) {
      for (const seg of this._snapperData.raw_whisper) {
        if (seg.words) {
          for (const w of seg.words) words.push({ word: w.word, start: w.start, end: w.end });
        }
      }
    } else if (view === 'reference' && this._snapperData?.reference_text) {
      for (const line of this._snapperData.reference_text) {
        if (line.words) {
          for (const w of line.words) words.push({ word: w, start: -1, end: -1 });
        }
      }
    }

    if (words.length === 0) return;

    // Filter out words without valid timestamps (reference view has start: -1)
    let timedWords = words.filter(w => w.start >= 0);

    // Split concatenated whisper words using reference text when available.
    // Whisper often fuses words at segment boundaries (e.g. "friendsWe've" should be "friends" + "We've").
    const refLines = this._snapperData?.reference_text;
    if (refLines && refLines.length > 0 && view !== 'reference') {
      const refWords = [];
      for (const line of refLines) {
        const ws = line.words || (line.text ? line.text.split(/\s+/) : []);
        for (const w of ws) refWords.push(typeof w === 'string' ? w : w.word || w.text || '');
      }
      // Try to split fused timed words by matching against reference
      const splitResult = [];
      let refIdx = 0;
      for (const tw of timedWords) {
        let matched = false;
        if (refIdx < refWords.length) {
          const ref = refWords[refIdx];
          // Check if this timed word starts with the reference word (case-insensitive)
          const twLower = tw.word.toLowerCase();
          const refLower = ref.toLowerCase().replace(/[.,!?;:'"]/g, '');
          if (twLower === refLower || tw.word === ref) {
            splitResult.push(tw);
            refIdx++;
            matched = true;
          } else if (twLower.startsWith(refLower) && refLower.length > 0 && twLower.length > refLower.length) {
            // Possible fusion: try splitting off consecutive reference words
            let remainder = tw.word;
            let remainderLower = twLower;
            const parts = [];
            let ri = refIdx;
            while (ri < refWords.length && remainder.length > 0) {
              const rw = refWords[ri].toLowerCase().replace(/[.,!?;:'"]/g, '');
              if (rw.length === 0) { ri++; continue; }
              if (remainderLower.startsWith(rw)) {
                parts.push(remainder.slice(0, refWords[ri].length));
                remainder = remainder.slice(refWords[ri].length);
                remainderLower = remainder.toLowerCase();
                ri++;
              } else {
                break;
              }
            }
            if (parts.length > 1 && remainder.length === 0) {
              // Successfully split — distribute timing proportionally
              const totalLen = parts.reduce((s, p) => s + p.length, 0) || 1;
              const dur = tw.end - tw.start;
              let cursor = tw.start;
              for (const p of parts) {
                const pDur = dur * (p.length / totalLen);
                splitResult.push({ word: p, start: cursor, end: cursor + pDur });
                cursor += pDur;
              }
              refIdx = ri;
              matched = true;
            }
          }
        }
        if (!matched) {
          splitResult.push(tw);
          refIdx++;
        }
      }
      timedWords = splitResult;
    }

    // Group timed words into lines using reference text line boundaries when available.
    // Whisper often has no gaps between lines, so time-gap alone fails.
    const lines = [];
    const refLinesForGrouping = refLines || this._snapperData?.reference_text;
    if (refLinesForGrouping && refLinesForGrouping.length > 0 && view !== 'reference') {
      // Build expected word sequence per reference line (lowercased, stripped)
      const refWordCounts = refLinesForGrouping.map(l => (l.words || l.text?.split(/\s+/) || []).length);
      let wordIdx = 0;
      for (let ri = 0; ri < refWordCounts.length; ri++) {
        const count = refWordCounts[ri];
        if (count === 0) continue;
        const lineWords = [];
        for (let k = 0; k < count && wordIdx < timedWords.length; k++, wordIdx++) {
          lineWords.push({ word: timedWords[wordIdx].word, start: timedWords[wordIdx].start, end: timedWords[wordIdx].end });
        }
        if (lineWords.length > 0) lines.push(lineWords);
      }
      // Remaining words (if whisper has more than reference)
      if (wordIdx < timedWords.length) {
        const remaining = [];
        for (; wordIdx < timedWords.length; wordIdx++) {
          remaining.push({ word: timedWords[wordIdx].word, start: timedWords[wordIdx].start, end: timedWords[wordIdx].end });
        }
        lines.push(remaining);
      }
    } else {
      // Fallback: gap-based splitting (new line when gap > 1.5s)
      let currentLine = [];
      let lastEnd = -1;
      for (const w of timedWords) {
        if (lastEnd >= 0 && (w.start - lastEnd) > 1.5) {
          if (currentLine.length > 0) lines.push(currentLine);
          currentLine = [];
        }
        currentLine.push({ word: w.word, start: w.start, end: w.end });
        lastEnd = w.end;
      }
      if (currentLine.length > 0) lines.push(currentLine);
    }

    // For reference (untimed), group all words into one or a few lines
    if (lines.length === 0 && words.length > 0) {
      // Group into ~8 words per line for readability
      for (let i = 0; i < words.length; i += 8) {
        const chunk = words.slice(i, i + 8);
        lines.push(chunk.map(w => ({ word: w.word, start: 0, end: 0 })));
      }
    }

    // Convert to LyricsEngine timeline format (needs time, start, end, text, words)
    const timeline = lines.map(line => ({
      time: line[0].start,
      start: line[0].start,
      end: line[line.length - 1].end,
      text: line.map(w => w.word).join(' '),
      words: line.map(w => ({ text: w.word, word: w.word, start: w.start, end: w.end })),
    }));

    const mp = window.musicRuntime;
    if (!mp?.lyrics?.setTrack) {
      console.warn('[ChromicEditor] ✗ No musicRuntime.lyrics available for preview push');
      return;
    }

    // Save original lyrics before first push so we can restore on exit
    if (!this._flowOriginalLyricsPayload) {
      // Capture current track data for restore — use the pending synced payload if available
      this._flowOriginalLyricsPayload = mp._pendingSyncedLyricsPayload
        || mp.lyrics?.currentTrack
        || null;
    }

    this._flowLyricsPushed = true;
    this._flowPushedView = view;

    const trackPath = this._getTrackPath();
    const baseName = this._getExportBaseName();

    // Build lyrics as plain text array (LyricsEngine expects this for fallback)
    const lyricsText = timeline.map(l => l.text);

    // Get current track info for proper setTrack payload
    const currentTrack = mp.lyrics?.currentTrack || {};
    mp.lyrics.setTrack({
      ...currentTrack,
      title: currentTrack.title || baseName,
      path: trackPath,
      lyrics: lyricsText,
      enhancedLyrics: { timeline },
    }).then(() => {
      // Force re-sync after setTrack completes
      if (mp.lyrics) {
        mp.lyrics.activeLineIndex = -1;
        // Remove dead-zone class so lyrics are visible even if between lines
        mp.lyrics.container?.classList.remove('lyrics-dead-zone');
        mp.lyrics.updateActiveLine?.();
        // If still dead-zone (paused between lines), force show nearest line
        if (mp.lyrics.container?.classList.contains('lyrics-dead-zone') && mp.lyrics.timeline?.length) {
          mp.lyrics.container.classList.remove('lyrics-dead-zone');
          const now = mp.lyrics.audioElement?.currentTime || 0;
          // Find nearest line by start time
          let bestIdx = 0;
          let bestDist = Infinity;
          for (let i = 0; i < mp.lyrics.timeline.length; i++) {
            const d = Math.abs(mp.lyrics.timeline[i].start - now);
            if (d < bestDist) { bestDist = d; bestIdx = i; }
          }
          mp.lyrics.activeLineIndex = bestIdx;
          mp.lyrics.updateActiveLine?.();
        }
      }
    });
    console.log(`[ChromicEditor] ⟶ Pushed ${timeline.length} lines (${timedWords.length} timed words) from "${view}" view to LyricsEngine`);
  }

  /** Check if flow mode has unsaved work (tapped words, undo history, or pushed lyrics preview) */
  _flowHasUnsavedChanges() {
    return this._flowWordCount > 0 || (this._flowUndoStack && this._flowUndoStack.length > 0) || this._flowLyricsPushed;
  }

  /**
   * Blackbox backup: persist unsaved flow changes to localStorage and server.
   * Key format: {trackName}-unsaved-changes
   * Keeps last 20 entries, auto-prunes oldest.
   * Also POSTs to /api/lyrics/blackbox for server-side persistence.
   */
  _flowBlackboxUnsavedChanges() {
    const saved = this._waveformPainter?._savedWords || [];
    const words = saved.filter(w => !w.isCue);
    if (words.length === 0) return;

    const trackPath = this._getTrackPath();
    const trackName = this._getExportBaseName();
    const now = new Date();
    const dateStr = now.toISOString().replace(/[:.]/g, '-').slice(0, 19);
    const key = `${trackName}-unsaved-changes`;

    const entry = {
      key,
      trackPath,
      trackName,
      wordCount: words.length,
      timestamp: now.toISOString(),
      dateLabel: dateStr,
      words: words.map(w => ({ text: w.text, start: w.start, end: w.end, style: w.style || 'normal' })),
    };

    // Save to localStorage with auto-prune (max 20 entries)
    try {
      const store = JSON.parse(localStorage.getItem('chromic-flow-blackbox') || '{}');
      store[key] = entry;
      const keys = Object.keys(store);
      if (keys.length > 20) {
        const sorted = keys.sort((a, b) => new Date(store[a].timestamp) - new Date(store[b].timestamp));
        for (let i = 0; i < keys.length - 20; i++) delete store[sorted[i]];
      }
      localStorage.setItem('chromic-flow-blackbox', JSON.stringify(store));
    } catch (e) {
      console.warn('[ChromicEditor] ✗ Blackbox localStorage save failed:', e);
    }

    // POST to server for persistence
    fetch('/api/lyrics/blackbox', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(entry),
    }).catch(err => console.warn('[ChromicEditor] ✗ Blackbox server POST failed:', err));

    console.log(`[ChromicEditor] 📦 Blackbox backup: "${trackName}" — ${words.length} words @ ${dateStr}`);
  }

  /** Handle track ended during flow mode — show inline Save/Discard buttons */
  _flowOnTrackEnded() {
    if (!this._flowMode) return;
    const hasUnsaved = this._flowHasUnsavedChanges();
    const hasPushedLyrics = this._flowLyricsPushed;
    if (!hasUnsaved && !hasPushedLyrics) return;

    const statusEl = this._flowBar?.querySelector('.chromic-flow-status');
    if (!statusEl) return;

    // Remove existing inline buttons if any
    statusEl.querySelectorAll('.flow-inline-btn').forEach(el => el.remove());

    const saveBtn = document.createElement('button');
    saveBtn.type = 'button';
    saveBtn.className = 'flow-inline-btn flow-inline-save';
    saveBtn.textContent = 'Save';
    saveBtn.addEventListener('click', (e) => {
      e.preventDefault(); e.stopPropagation();
      this._flowBar?.querySelector('.chromic-flow-save')?.click();
      saveBtn.remove();
      discardBtn.remove();
    });

    const discardBtn = document.createElement('button');
    discardBtn.type = 'button';
    discardBtn.className = 'flow-inline-btn flow-inline-discard';
    discardBtn.textContent = '✕ Discard';
    discardBtn.addEventListener('click', (e) => {
      e.preventDefault(); e.stopPropagation();
      // Blackbox before discard so nothing is truly lost
      if (hasUnsaved) this._flowBlackboxUnsavedChanges();
      // Restore original lyrics
      if (hasPushedLyrics && this._flowOriginalLyricsPayload) {
        const mp = window.musicRuntime;
        if (mp?.lyrics?.setTrack) {
          mp.lyrics.setTrack(this._flowOriginalLyricsPayload);
          console.log('[ChromicEditor] ↩ Restored original lyrics after discard');
        }
        this._flowLyricsPushed = false;
        this._flowOriginalLyricsPayload = null;
      }
      saveBtn.remove();
      discardBtn.remove();
      console.log('[ChromicEditor] ⏹ Discarded unsaved flow work (blackboxed)');
    });

    statusEl.appendChild(saveBtn);
    statusEl.appendChild(discardBtn);

    console.log('[ChromicEditor] ⏹ Track ended with unsaved flow work — showing Save/Discard');
  }

  _syncFlowBarHost() {
    if (!this._flowBar) return;
    const host = this._getFloatingHost();
    if (host && this._flowBar.parentElement !== host) {
      host.appendChild(this._flowBar);
    }
  }

  /** Load all existing timed words and cues from the lyrics DOM into the waveform painter */
  _flowLoadExistingWords() {
    if (!this._waveformPainter) return;
    // Load words from DOM (works in classic/CPU engine mode)
    const wordEls = document.querySelectorAll('.lyric-word[data-start][data-end]');
    wordEls.forEach(el => {
      const start = parseFloat(el.dataset.start);
      const end = parseFloat(el.dataset.end);
      if (!isNaN(start) && !isNaN(end)) {
        this._waveformPainter.addWord({
          text: el.textContent.trim(),
          start,
          end,
          isCue: false,
          style: el.dataset.style || (el.dataset.vocalStretch === 'true' ? 'stretch' : 'normal'),
        });
      }
    });
    // Load cues (vocal_cue / intro dots)
    const cueEls = document.querySelectorAll('.lyrics-intro-dots[data-line-index]');
    cueEls.forEach(el => {
      const lineIdx = parseInt(el.dataset.lineIndex);
      // Walk to find previous and next lyrics-line siblings
      let prev = el.previousElementSibling;
      while (prev && !prev.classList.contains('lyrics-line')) prev = prev.previousElementSibling;
      let next = el.nextElementSibling;
      while (next && !next.classList.contains('lyrics-line')) next = next.nextElementSibling;

      let start = 0, end = 0;
      if (prev) {
        const prevWords = prev.querySelectorAll('.lyric-word[data-end]');
        const lastWord = prevWords.length ? prevWords[prevWords.length - 1] : null;
        start = lastWord ? parseFloat(lastWord.dataset.end) : (parseFloat(prev.dataset.start) || 0) + 3;
      }
      end = next?.dataset?.start ? parseFloat(next.dataset.start) : start + 3;

      if (start < end && end - start > 0.1) {
        this._waveformPainter.addWord({
          text: '• • •',
          start,
          end,
          isCue: true,
          lineIndex: lineIdx,
        });
      }
    });
    let total = wordEls.length + cueEls.length;

    // ── Fallback for GPU/premium mode: no DOM lyrics, read from GPU timeline ──
    if (total === 0) {
      const runtime = window.musicRuntime;
      // Try GPU renderer timeline first, then lyrics engine timeline, then pending payload
      const gpuTimeline = runtime?.mathVisualizer?.lyricsRenderer?.timeline;
      const lyricsTimeline = runtime?.lyrics?.timeline;
      const pendingTimeline = runtime?._pendingSyncedLyricsPayload?.enhancedLyrics?.timeline;
      const timeline = (gpuTimeline?.length ? gpuTimeline : (lyricsTimeline?.length ? lyricsTimeline : pendingTimeline)) || [];

      if (timeline.length) {
        let wordCount = 0;
        let cueCount = 0;
        timeline.forEach((line, lineIdx) => {
          if (line.type === 'vocal_cue') {
            // Add cue
            const start = line.start ?? 0;
            const end = line.end ?? (start + 3);
            if (start < end && end - start > 0.1) {
              this._waveformPainter.addWord({
                text: '• • •',
                start,
                end,
                isCue: true,
                lineIndex: lineIdx,
              });
              cueCount++;
            }
          } else if (line.words?.length) {
            // Add individual words
            line.words.forEach(w => {
              const start = w.start ?? 0;
              const end = w.end ?? start;
              if (!isNaN(start) && !isNaN(end) && end > start) {
                let style = 'normal';
                if (w.isVocalStretch || w.stretch) style = 'stretch';
                else if (w.adlib) style = 'ad-lib';
                else if (w.spoken) style = 'spoken';
                else if (w.whisper) style = 'whisper';
                this._waveformPainter.addWord({
                  text: w.text || w.word || '',
                  start,
                  end,
                  isCue: false,
                  style,
                });
                wordCount++;
              }
            });
          } else if (line.text && line.start != null && line.end != null) {
            // Line without word-level data — add as single block
            this._waveformPainter.addWord({
              text: line.text,
              start: line.start,
              end: line.end,
              isCue: false,
              style: 'normal',
            });
            wordCount++;
          }
        });
        total = wordCount + cueCount;
        if (total) {
          console.log(`[ChromicEditor:Flow] GPU mode: Loaded ${wordCount} words + ${cueCount} cues from timeline into waveform`);
        }
      }
    }

    if (total) {
      console.log(`[ChromicEditor:Flow] Loaded ${total} items into waveform`);
    }
  }

  /** Select a word in flow mode — highlight in DOM, sync+zoom waveform, show style picker */
  _flowSelectWord(wordEl) {
    // Remove previous selection + style picker
    document.querySelectorAll('.lyric-word.flow-selected, .lyrics-intro-dots.flow-selected').forEach(el => el.classList.remove('flow-selected'));
    document.querySelectorAll('.chromic-flow-style-picker').forEach(el => el.remove());

    // Highlight clicked word
    wordEl.classList.add('flow-selected');

    const start = parseFloat(wordEl.dataset.start);
    const end = parseFloat(wordEl.dataset.end);
    if (isNaN(start) || isNaN(end)) return;

    // Seek audio to word start
    if (this._mediaSource?.element) {
      this._mediaSource.element.currentTime = start;
    }

    // Find word index in waveform painter and select it
    if (this._waveformPainter) {
      const words = this._waveformPainter._savedWords;
      const idx = words.findIndex(w =>
        !w.isCue && Math.abs(w.start - start) < 0.02 && Math.abs(w.end - end) < 0.02
      );
      if (idx >= 0) {
        this._waveformPainter._selectedWordIdx = idx;
      }

      // Auto-zoom: ensure the selected word is at least 100px wide on the waveform
      const wordDuration = end - start;
      if (wordDuration > 0) {
        const canvasWidth = this._waveformPainter._canvas?.getBoundingClientRect()?.width || 600;
        const minWordPx = 100;
        const targetPx = Math.max(minWordPx, canvasWidth * 0.3);
        const neededZoom = targetPx / wordDuration;
        this._waveformPainter._zoom = Math.round(
          Math.min(this._waveformPainter._maxZoom, Math.max(this._waveformPainter._minZoom, neededZoom))
        );
      }
    }

    // Determine current style for the flow bar dropdown
    const currentStyle = wordEl.dataset.style || (wordEl.dataset.vocalStretch === 'true' ? 'stretch' : 'normal');

    // Scroll the word into view
    wordEl.scrollIntoView({ behavior: 'smooth', block: 'center' });

    // Pre-fill flow input with word text for editing
    if (this._flowInput) {
      this._flowInput.value = wordEl.textContent.trim();
      this._flowInput.placeholder = 'Edit word text, Enter to save…';
    }
    // Sync style dropdown
    if (this._flowStyleSelect) {
      this._flowStyleSelect.value = currentStyle;
    }
    // Track selected word element for editing
    this._flowSelectedWordEl = wordEl;
  }

  /** Select a cue in flow mode — highlight, show on waveform */
  _flowSelectCue(cueEl) {
    // Remove previous selection + style picker
    document.querySelectorAll('.lyric-word.flow-selected, .lyrics-intro-dots.flow-selected').forEach(el => el.classList.remove('flow-selected'));
    document.querySelectorAll('.chromic-flow-style-picker').forEach(el => el.remove());

    cueEl.classList.add('flow-selected');

    // Find cue in waveform and select it
    if (this._waveformPainter) {
      const lineIdx = parseInt(cueEl.dataset.lineIndex);
      const words = this._waveformPainter._savedWords;
      const idx = words.findIndex(w => w.isCue && w.lineIndex === lineIdx);
      if (idx >= 0) {
        this._waveformPainter._selectedWordIdx = idx;
        const word = words[idx];
        // Seek to cue start
        if (this._mediaSource?.element) {
          this._mediaSource.element.currentTime = word.start;
        }
        // Zoom to show cue
        const dur = word.end - word.start;
        if (dur > 0) {
          const canvasW = this._waveformPainter._canvas?.getBoundingClientRect()?.width || 600;
          const targetPx = Math.max(100, canvasW * 0.3);
          this._waveformPainter._zoom = Math.round(
            Math.min(this._waveformPainter._maxZoom, Math.max(this._waveformPainter._minZoom, targetPx / dur))
          );
        }
      }
    }

    cueEl.scrollIntoView({ behavior: 'smooth', block: 'center' });

    // Pre-fill input for cue (show "• • •")
    if (this._flowInput) {
      this._flowInput.value = '';
      this._flowInput.placeholder = 'Cue selected (timing only)';
    }
    this._flowSelectedWordEl = null; // cues can't have text edited
  }

  /** Update the selected word's text from the flow input */
  async _flowUpdateSelectedWord(wordDataOrText) {
    const wordEl = this._flowSelectedWordEl;
    if (!wordEl) return;

    // Accept either a string or an object with .text
    const newText = typeof wordDataOrText === 'string' ? wordDataOrText : wordDataOrText.text;
    if (!newText) return;

    // Update DOM
    wordEl.textContent = newText;

    // Update waveform
    const start = parseFloat(wordEl.dataset.start);
    const end = parseFloat(wordEl.dataset.end);
    if (this._waveformPainter) {
      const words = this._waveformPainter._savedWords;
      const idx = words.findIndex(w =>
        !w.isCue && Math.abs(w.start - start) < 0.02 && Math.abs(w.end - end) < 0.02
      );
      if (idx >= 0) {
        words[idx].text = newText;
      }
    }

    // Save to backend via flow-word endpoint (updates sidecar)
    const trackPath = this._getTrackPath();
    if (trackPath) {
      try {
        await fetch('/api/lyrics/flow-word', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            trackPath,
            word: { text: newText, start, end },
            update: true,
          }),
        });
      } catch (e) {
        console.warn('[ChromicEditor:Flow] Failed to save word update:', e.message);
      }
    }

    // Visual feedback
    const lastEl = this._flowBar?.querySelector('.flow-last-word');
    if (lastEl) lastEl.innerHTML = `${_svgPencil}"${_esc(newText)}" updated`;
    this._flowBar?.classList.add('flow-word-sent');
    setTimeout(() => this._flowBar?.classList.remove('flow-word-sent'), 300);

    // Clear selection state
    this._flowSelectedWordEl = null;
    if (this._flowInput) {
      this._flowInput.value = '';
      this._flowInput.placeholder = 'Type word, hold ⌥ Option to time it…';
    }
  }

  /** Apply style from the dropdown to the selected word */
  _flowApplyStyleToSelected() {
    const wordEl = this._flowSelectedWordEl;
    const style = this._flowStyleSelect?.value || 'normal';
    if (!wordEl) return;

    // Update DOM element
    if (style === 'normal') {
      wordEl.removeAttribute('data-style');
      wordEl.removeAttribute('data-vocal-stretch');
    } else {
      wordEl.dataset.style = style;
      if (style === 'stretch') wordEl.dataset.vocalStretch = 'true';
      else wordEl.removeAttribute('data-vocal-stretch');
    }

    // Update waveform word data
    if (this._waveformPainter) {
      const start = parseFloat(wordEl.dataset.start);
      const end = parseFloat(wordEl.dataset.end);
      const words = this._waveformPainter._savedWords;
      const idx = words.findIndex(w =>
        !w.isCue && Math.abs(w.start - start) < 0.02 && Math.abs(w.end - end) < 0.02
      );
      if (idx >= 0) words[idx].style = style;
    }

    const lastEl = this._flowBar?.querySelector('.flow-last-word');
    if (lastEl) lastEl.innerHTML = `${_svgPencil}Style → ${_esc(style)}`;
  }

  /** Check current gold status for loaded track */
  // ─── BACKUP DROPDOWN ─────────────────────────────────────────────────────

  // ── Word Snapper ──────────────────────────────────────────────────────────
  async _flowLoadSnapper() {
    const panel = this._flowBar?.querySelector('.chromic-flow-snapper-panel');
    if (!panel) return;
    const wordBank = panel.querySelector('[data-snapper-words]');
    if (!wordBank) return;

    wordBank.innerHTML = '<span class="snapper-loading">Loading raw whisper data…</span>';

    try {
      const trackPath = this._getTrackPath();
      if (!trackPath) { wordBank.innerHTML = '<span class="snapper-empty">No track loaded</span>'; return; }

      const res = await fetch('/api/lyrics/raw-whisper', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ trackPath }),
      });
      const data = await res.json();
      this._snapperData = data;
      this._flowRenderSnapperView('aligned');
    } catch (err) {
      wordBank.innerHTML = `<span class="snapper-empty">Error: ${err.message}</span>`;
    }
  }

  _flowRenderSnapperView(view) {
    const panel = this._flowBar?.querySelector('.chromic-flow-snapper-panel');
    if (!panel) return;
    const wordBank = panel.querySelector('[data-snapper-words]');
    if (!wordBank) return;

    // Update active button state
    panel.querySelectorAll('.snapper-view-btn').forEach(b => {
      b.classList.toggle('active', b.dataset.view === view);
    });

    this._snapperActiveView = view;

    let words = [];
    if (view === 'aligned') {
      // Read from stored alignment data (server-side .lyrics.json)
      if (this._snapperData?.aligned && this._snapperData.aligned.length > 0) {
        for (const w of this._snapperData.aligned) {
          const entry = { word: w.word, start: w.start, end: w.end };
          if (w._chars) entry._chars = w._chars;
          words.push(entry);
        }
      } else {
        // Fallback: read from waveform (which was loaded from DOM on flow mode start)
        const saved = this._waveformPainter?._savedWords || [];
        for (const w of saved) {
          if (w.isCue) continue;
          words.push({ word: w.text, start: w.start, end: w.end });
        }
      }
    } else if (view === 'raw' && this._snapperData?.raw_whisper) {
      for (const seg of this._snapperData.raw_whisper) {
        if (seg.words) {
          for (const w of seg.words) words.push({ word: w.word, start: w.start, end: w.end });
        }
      }
    } else if (view === 'reference' && this._snapperData?.reference_text) {
      for (const line of this._snapperData.reference_text) {
        if (line.words) {
          for (const w of line.words) words.push({ word: w, start: -1, end: -1 });
        }
      }
    }

    if (words.length === 0) {
      const msg = view === 'raw' ? 'No raw Whisper data. Re-sync lyrics to generate.' :
                  view === 'reference' ? 'No reference text available.' :
                  'No aligned words yet.';
      wordBank.innerHTML = `<span class="snapper-empty">${msg}</span>`;
      return;
    }

    wordBank.innerHTML = '';
    const isReference = view === 'reference';

    for (let i = 0; i < words.length; i++) {
      const w = words[i];
      const chip = document.createElement('span');
      chip.className = 'snapper-word-chip';
      chip.dataset.idx = i;

      // Timestamp label (for timed words)
      if (w.start >= 0) {
        const tsEl = document.createElement('span');
        tsEl.className = 'snapper-chip-ts';
        tsEl.textContent = `${w.start.toFixed(2)}`;
        chip.appendChild(tsEl);
        chip.dataset.start = w.start;
        chip.dataset.end = w.end;
        chip.title = `${w.start.toFixed(2)}s – ${w.end.toFixed(2)}s`;
      }

      // Word text
      const textEl = document.createElement('span');
      textEl.className = 'snapper-chip-text';
      textEl.textContent = w.word;
      chip.appendChild(textEl);

      // Click: copy word to clipboard, seek to timestamp
      chip.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();

        // Clear previous selection
        wordBank.querySelectorAll('.snapper-word-chip.snapper-copied').forEach(c => c.classList.remove('snapper-copied'));
        chip.classList.add('snapper-copied');

        // Copy to system clipboard
        const copyText = w.start >= 0 ? `${w.word} [${w.start.toFixed(2)}s]` : w.word;
        navigator.clipboard?.writeText(w.word).catch(() => {});

        // Show toast
        this._showSnapperToast(`Copied "${w.word}"${w.start >= 0 ? ` @ ${w.start.toFixed(2)}s` : ''}`);

        // Seek to word start if timed
        if (w.start >= 0 && this._mediaSource?.element) {
          this._mediaSource.element.currentTime = w.start;
        }
      });

      wordBank.appendChild(chip);
    }
  }

  /** Show a brief toast message in the snapper panel */
  _showSnapperToast(msg) {
    // Remove existing toast
    this._flowBar?.querySelector('.snapper-toast')?.remove();
    const toast = document.createElement('div');
    toast.className = 'snapper-toast';
    toast.textContent = msg;
    const panel = this._flowBar?.querySelector('.chromic-flow-snapper-panel');
    if (panel) {
      panel.appendChild(toast);
      requestAnimationFrame(() => toast.classList.add('show'));
      setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
      }, 1500);
    }
  }

  _flowSnapWord(wordData) {
    // Get current playhead time from the audio element
    const audio = document.querySelector('audio') || document.querySelector('[data-audio]');
    const currentTime = audio ? audio.currentTime : 0;

    // If we have a selected word element in the timeline, replace its text
    if (this._flowSelectedWordEl) {
      this._flowSelectedWordEl.textContent = wordData.word;
      // If raw whisper word has timestamps, apply them
      if (wordData.start >= 0) {
        this._flowSelectedWordEl.dataset.start = wordData.start;
        this._flowSelectedWordEl.dataset.end = wordData.end;
      }
      this._flowMarkDirty();
      return;
    }

    // Otherwise, insert a new word at the current playhead position
    const newWord = {
      word: wordData.word,
      start: wordData.start >= 0 ? wordData.start : currentTime,
      end: wordData.end >= 0 ? wordData.end : currentTime + 0.3,
    };

    // Find the right line in the timeline and add the word
    if (this._flowTimeline) {
      let bestLine = null;
      for (const line of this._flowTimeline) {
        if (line.time <= currentTime && (!line.words?.length || line.words[line.words.length - 1]?.end >= currentTime - 1)) {
          bestLine = line;
        }
      }
      if (bestLine) {
        if (!bestLine.words) bestLine.words = [];
        bestLine.words.push(newWord);
        bestLine.words.sort((a, b) => a.start - b.start);
        this._flowMarkDirty();
        this._flowWordCount++;
        const countEl = this._flowBar?.querySelector('.flow-word-count');
        if (countEl) countEl.textContent = `${this._flowWordCount} words`;
      }
    }
  }

  /** Load current snapper view's words into the waveform for editing */
  _flowLoadSnapperIntoWaveform() {
    const panel = this._flowBar?.querySelector('.chromic-flow-snapper-panel');
    if (!panel || !this._waveformPainter) return;
    const activeBtn = panel.querySelector('.snapper-view-btn.active');
    const view = activeBtn?.dataset.view || 'aligned';

    // Collect words from the word bank chips
    const chips = panel.querySelectorAll('.snapper-word-chip');
    if (!chips.length) return;

    const newWords = [];
    for (const chip of chips) {
      const start = parseFloat(chip.dataset.start);
      const end = parseFloat(chip.dataset.end);
      if (isNaN(start) || start < 0) continue; // skip un-timed reference words
      const wordText = chip.querySelector('.snapper-chip-text')?.textContent || chip.textContent;
      newWords.push({ text: wordText, start, end, isCue: false, style: 'normal' });
    }

    if (!newWords.length) {
      console.warn('[ChromicEditor:Flow] No timed words to load from snapper');
      return;
    }

    // Check for unsaved changes — warn user before overwriting
    const hasCurrentChanges = this._flowWordCount > 0 || (this._flowUndoStack && this._flowUndoStack.length > 0);
    if (hasCurrentChanges) {
      const confirmed = confirm(
        `You have unsaved changes (${this._flowWordCount} words in waveform).\n\n` +
        `Loading "${view}" view will replace your current edits.\n` +
        `Your changes will be saved to the blackbox backup automatically.\n\n` +
        `Continue?`
      );
      if (!confirmed) return;
      // Blackbox backup current changes before overwriting
      this._flowBlackboxUnsavedChanges();
    }

    // Replace waveform words
    this._waveformPainter._savedWords.length = 0;
    for (const w of newWords) this._waveformPainter.addWord(w);

    this._flowWordCount = newWords.length;
    const countEl = this._flowBar?.querySelector('.flow-word-count');
    if (countEl) countEl.textContent = `${this._flowWordCount} words`;
    const lastEl = this._flowBar?.querySelector('.flow-last-word');
    if (lastEl) lastEl.innerHTML = `Loaded ${newWords.length} words from ${view}`;

    // Sync ELRC textarea if open
    if (!this._flowElrcTextarea?.closest('[hidden]')) {
      this._flowSyncElrcTextarea();
    }

    // Push to immersive lyrics panel so animation syncs with waveform
    this._flowPushToLyricsPreview(view);

    console.log(`[ChromicEditor:Flow] Loaded ${newWords.length} words from snapper view: ${view}`);
  }

  _flowMarkDirty() {
    // Mark flow mode as having unsaved changes
    const indicator = this._flowBar?.querySelector('[data-flow-indicator]');
    if (indicator) indicator.classList.add('dirty');
  }

  async _flowToggleBackupDropdown(anchorBtn) {
    // Close if already open
    const existing = this._flowBar?.querySelector('.chromic-flow-backup-dropdown');
    if (existing) { existing.remove(); return; }

    const trackPath = this._getTrackPath();
    if (!trackPath) return;

    const dropdown = document.createElement('div');
    dropdown.className = 'chromic-flow-backup-dropdown';
    dropdown.innerHTML = '<div class="backup-loading">Loading backups…</div>';
    anchorBtn.style.position = 'relative';
    anchorBtn.parentElement.style.position = 'relative';
    anchorBtn.parentElement.appendChild(dropdown);

    // Close on outside click
    const closeHandler = (e) => {
      if (!dropdown.contains(e.target) && e.target !== anchorBtn) {
        dropdown.remove();
        document.removeEventListener('mousedown', closeHandler);
      }
    };
    setTimeout(() => document.addEventListener('mousedown', closeHandler), 10);

    try {
      const [backupsRes] = await Promise.all([
        fetch('/api/lyrics/backups', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ trackPath }),
        }),
      ]);
      const { backups } = await backupsRes.json();

      let html = `<div class="backup-header">
        <span>Lyrics Backups</span>
        <button type="button" class="backup-create-btn" title="Save current state as backup"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:-1px;margin-right:3px"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>Save Snapshot</button>
      </div>`;

      if (!backups || backups.length === 0) {
        html += '<div class="backup-empty">No backups yet. Changes are auto-backed up on save.</div>';
      } else {
        html += '<div class="backup-list">';
        for (const b of backups.slice(0, 15)) {
          const date = new Date(b.timestamp);
          const timeStr = date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' }) + ' ' + date.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' });
          const linesStr = b.lines > 0 ? `${b.lines} lines` : '';
          const sizeStr = b.size > 1024 ? `${(b.size / 1024).toFixed(0)}KB` : `${b.size}B`;
          html += `<div class="backup-item" data-backup="${b.fileName}">
            <div class="backup-item-info">
              <span class="backup-item-time">${timeStr}</span>
              <span class="backup-item-meta">${linesStr} · ${sizeStr}</span>
            </div>
            <button type="button" class="backup-restore-btn" data-backup="${b.fileName}" title="Restore this backup">Restore</button>
          </div>`;
        }
        html += '</div>';
      }

      dropdown.innerHTML = html;

      // Bind create backup
      dropdown.querySelector('.backup-create-btn')?.addEventListener('click', async (e) => {
        e.stopPropagation();
        try {
          const res = await fetch('/api/lyrics/create-backup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ trackPath }),
          });
          const data = await res.json();
          if (data.ok) {
            dropdown.remove();
            document.removeEventListener('mousedown', closeHandler);
            // Re-open to show updated list
            this._flowToggleBackupDropdown(anchorBtn);
          } else if (data.error) {
            // Show error message in dropdown (e.g. "No lyrics to back up yet")
            const emptyEl = dropdown.querySelector('.backup-empty');
            if (emptyEl) {
              emptyEl.textContent = data.error;
              emptyEl.classList.add('backup-notice');
            }
          }
        } catch (err) {
          console.warn('[Backup] Create failed:', err);
        }
      });

      // Bind restore buttons
      dropdown.querySelectorAll('.backup-restore-btn').forEach(btn => {
        btn.addEventListener('click', async (e) => {
          e.stopPropagation();
          const backupFileName = btn.dataset.backup;
          if (!confirm(`Restore lyrics from this backup?\n\nYour current version will be backed up first.`)) return;
          try {
            btn.textContent = '…';
            btn.disabled = true;
            const res = await fetch('/api/lyrics/restore-backup', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ trackPath, backupFileName }),
            });
            const data = await res.json();
            if (data.ok) {
              dropdown.remove();
              document.removeEventListener('mousedown', closeHandler);
              // Reload lyrics in waveform and DOM
              await this._flowReloadAfterRestore();
            } else {
              alert(data.error || 'Restore failed');
            }
          } catch (err) {
            console.warn('[Backup] Restore failed:', err);
            alert('Restore failed: ' + err.message);
          }
        });
      });
    } catch (err) {
      dropdown.innerHTML = `<div class="backup-empty">Failed to load backups</div>`;
    }
  }

  async _flowReloadAfterRestore() {
    const trackPath = this._getTrackPath();
    if (!trackPath) return;
    try {
      // Refresh lyrics from server
      const res = await fetch('/api/lyrics/refresh', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ trackPath }),
      });
      const data = await res.json();
      if (data.lyrics && Array.isArray(data.lyrics)) {
        // Rebuild waveform words from restored lyrics
        if (this._waveformPainter) {
          this._waveformPainter._savedWords.length = 0;
          for (const line of data.lyrics) {
            if (line.type === 'vocal_cue') {
              this._waveformPainter.addWord({
                text: '• • •', start: line.time || line.start || 0,
                end: line.end || (line.time || line.start || 0) + 0.5,
                isCue: true, style: 'normal',
              });
              continue;
            }
            if (Array.isArray(line.words)) {
              for (const w of line.words) {
                this._waveformPainter.addWord({
                  text: w.word || w.text || '', start: w.start, end: w.end,
                  isCue: false, style: w.style || 'normal',
                });
              }
            }
          }
          this._waveformPainter._lanesDirty = true;
          this._flowWordCount = this._waveformPainter._savedWords.filter(w => !w.isCue).length;
          const countEl = this._flowBar?.querySelector('.flow-word-count');
          if (countEl) countEl.textContent = `${this._flowWordCount} words`;
        }
        // Reload the music player's lyrics display via event
        document.dispatchEvent(new CustomEvent('chromic:track-assets-updated', { detail: { trackPath } }));
        // Re-sync ELRC textarea if open
        this._flowSyncElrcTextarea?.();
        console.log('[Backup] ✅ Lyrics reloaded after restore');
      }
    } catch (err) {
      console.warn('[Backup] Reload failed:', err);
    }
  }

  async _flowCheckGoldStatus() {
    const trackPath = this._getTrackPath();
    if (!trackPath || !this._flowGoldBtn) return;
    try {
      const encPath = encodeURIComponent(trackPath);
      const res = await fetch(`/api/tracks/gold-status?path=${encPath}&trackPath=${encPath}`);
      const data = await res.json();
      this._flowIsGold = Boolean(data.gold || data.status === 'gold');
      this._flowGoldBtn.classList.toggle('gold-active', this._flowIsGold);
      this._flowRenderGoldBadge(this._flowIsGold ? (data.mode || 'strict') : null);
    } catch {}
  }

  _flowRenderGoldBadge(mode = null) {
    const badge = this._flowBar?.querySelector('[data-flow-gold-badge]');
    if (!badge) return;
    if (!mode) {
      badge.hidden = true;
      badge.classList.remove('is-strict', 'is-relaxed');
      badge.textContent = 'Gold';
      return;
    }
    const normalized = String(mode).toLowerCase() === 'relaxed' ? 'relaxed' : 'strict';
    badge.hidden = false;
    badge.classList.toggle('is-strict', normalized === 'strict');
    badge.classList.toggle('is-relaxed', normalized === 'relaxed');
    badge.textContent = normalized === 'relaxed' ? 'Gold Relaxed' : 'Gold Strict';
  }

  /** Toggle gold status — runs validation before marking */
  async _flowToggleGold() {
    const trackPath = this._getTrackPath();
    const audioSrc = (this._mediaSource?.element || document.getElementById('globalAudio'))?.src || '(none)';
    console.log('[Gold] _flowToggleGold called, trackPath:', JSON.stringify(trackPath), 'isGold:', this._flowIsGold, 'audioSrc:', audioSrc.slice(0, 120));
    if (!trackPath) {
      console.warn('[Gold] No trackPath — cannot toggle gold. Audio src:', audioSrc);
      return;
    }

    // If already gold, unmark without validation
    if (this._flowIsGold) {
      try {
        const res = await fetch('/api/tracks/mark-gold', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ trackPath, gold: false }),
        });
        if (res.ok) {
          this._flowIsGold = false;
          this._flowGoldBtn?.classList.toggle('gold-active', false);
          this._flowRenderGoldBadge(null);
          this._hideInspectorReport();
          document.dispatchEvent(new CustomEvent('chromic:gold-changed'));
          const indicator = this._flowBar?.querySelector('.flow-label');
          if (indicator) {
            const orig = indicator.textContent;
            indicator.textContent = 'GOLD REMOVED';
            indicator.style.color = '';
            setTimeout(() => { indicator.textContent = orig; indicator.style.color = ''; }, 2000);
          }
        }
      } catch (err) { console.error('[Gold] Unmark failed:', err); }
      return;
    }

    // Show "Validating..." feedback
    const indicator = this._flowBar?.querySelector('.flow-label');
    const origText = indicator?.textContent;
    if (indicator) { indicator.textContent = 'VALIDATING…'; indicator.style.color = '#FFD700'; }

    try {
      // Auto-save lyrics first to ensure sidecar exists
      if (indicator) indicator.textContent = 'Saving lyrics…';
      await this._flowSaveAll();

      if (indicator) indicator.textContent = 'VALIDATING…';
      const res = await fetch('/api/tracks/mark-gold', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ trackPath, gold: true, relaxed: true, minScore: 65 }),
      });
      const data = await res.json();

      if (res.ok && data.ok) {
        // Validation passed — gold!
        this._flowIsGold = true;
        this._flowGoldBtn?.classList.toggle('gold-active', true);
        this._flowRenderGoldBadge(data.relaxedAccepted ? 'relaxed' : 'strict');
        this._hideInspectorReport();
        document.dispatchEvent(new CustomEvent('chromic:gold-changed'));
        if (indicator) {
          const relaxedBadge = data.relaxedAccepted ? ' (RELAXED 65%)' : '';
          indicator.textContent = `⭐ GOLD${relaxedBadge} (Score: ${data.validation?.score || 100})`;
          indicator.style.color = '#FFD700';
          setTimeout(() => { indicator.textContent = origText; indicator.style.color = ''; }, 3000);
        }
        // Show warnings if any
        if (data.validation?.warnings?.length > 0) {
          this._showInspectorReport(data.validation, false);
        }
      } else {
        // Validation failed — show inspector report
        const errorMsg = data.error || 'REPAIR REQUIRED';
        console.warn('[Gold] Validation failed:', errorMsg, data.validation);
        if (indicator) {
          indicator.textContent = `${errorMsg.length > 40 ? errorMsg.slice(0, 40) + '…' : errorMsg}`;
          indicator.style.color = '#ff3b30';
          setTimeout(() => { indicator.textContent = origText; indicator.style.color = ''; }, 4000);
        }
        if (data.validation) {
          this._showInspectorReport(data.validation, true);
        }
      }
    } catch (err) {
      console.error('[Gold] Validation failed:', err);
      if (indicator) { indicator.textContent = origText; indicator.style.color = ''; }
    }
  }

  /** Show the Inspector Report panel attached to the flow bar */
  _showInspectorReport(validation, isBlocking) {
    this._hideInspectorReport();
    if (!validation || (!validation.errors?.length && !validation.warnings?.length)) return;

    const panel = document.createElement('div');
    panel.className = `chromic-inspector-report${isBlocking ? ' is-blocking' : ''}`;

    const title = isBlocking ? 'Repair Required' : 'Validation Warnings';
    const scoreColor = validation.score >= 80 ? '#00ff78' : validation.score >= 50 ? '#FFD700' : '#ff3b30';

    let html = `
      <div class="inspector-header">
        <span class="inspector-title">${title}</span>
        <span class="inspector-score" style="color:${scoreColor}">Score: ${validation.score}/100</span>
        <button type="button" class="inspector-close" title="Close">✕</button>
      </div>
      <div class="inspector-list">`;

    // Critical errors
    for (const err of (validation.errors || [])) {
      html += `<div class="inspector-item is-error" ${err.time != null ? `data-seek-time="${err.time}"` : ''}>
        <span class="inspector-badge error">ERROR</span>
        <span class="inspector-message">${this._escHtml(err.message)}</span>
        ${err.time != null ? `<button type="button" class="inspector-seek" data-time="${err.time}">▶ ${err.time.toFixed(2)}s</button>` : ''}
      </div>`;
    }

    // Warnings
    for (const warn of (validation.warnings || [])) {
      html += `<div class="inspector-item is-warning" ${warn.time != null ? `data-seek-time="${warn.time}"` : ''}>
        <span class="inspector-badge warning">${warn.autoFixable ? 'AUTO-FIX' : 'WARN'}</span>
        <span class="inspector-message">${this._escHtml(warn.message)}</span>
        ${warn.time != null ? `<button type="button" class="inspector-seek" data-time="${warn.time}">▶ ${warn.time.toFixed(2)}s</button>` : ''}
      </div>`;
    }

    html += '</div>';

    const partial = validation.partialGold;
    if (partial && Number.isFinite(partial.totalChunks) && partial.totalChunks > 0) {
      const eq = Number.isFinite(partial.equivalent) ? Number(partial.equivalent).toFixed(2) : '0.00';
      html += `<div class="inspector-partial-gold">Partial gold: ${partial.validChunks}/${partial.totalChunks} valid chunks (${eq} gold eq)</div>`;
    }

    // Auto-fix button if there are fixable issues
    const autoFixable = (validation.warnings || []).filter(w => w.autoFixable).length;
    if (autoFixable > 0 || (validation.errors || []).some(e => e.type === 'empty_word' || e.type === 'negative_duration')) {
      html += `<div class="inspector-actions">
        <button type="button" class="inspector-autofix">Auto-Fix ${autoFixable} issue${autoFixable !== 1 ? 's' : ''}</button>
        <span class="inspector-hint">Trims micro-overlaps & removes empty words</span>
      </div>`;
    }

    panel.innerHTML = html;

    // Insert above flow bar
    // Insert into floating host (music overlay or body)
    const host = this._getFloatingHost();
    if (this._flowBar) {
      this._flowBar.parentElement?.insertBefore(panel, this._flowBar);
    } else {
      host.appendChild(panel);
    }
    this._inspectorPanel = panel;

    // Bind close — prevent event propagation so it doesn't re-trigger gold
    const closeBtn = panel.querySelector('.inspector-close');
    if (closeBtn) {
      closeBtn.addEventListener('mousedown', (e) => { e.preventDefault(); e.stopPropagation(); });
      closeBtn.addEventListener('click', (e) => { e.stopPropagation(); this._hideInspectorReport(); });
    }

    // Close on outside click (anywhere except the panel)
    this._inspectorOutsideClose = (e) => {
      if (!panel.contains(e.target) && !this._flowGoldBtn?.contains(e.target)) {
        this._hideInspectorReport();
      }
    };
    setTimeout(() => document.addEventListener('mousedown', this._inspectorOutsideClose), 50);

    panel.querySelectorAll('.inspector-seek').forEach(btn => {
      btn.addEventListener('click', () => {
        const time = parseFloat(btn.dataset.time);
        if (this._mediaSource?.element && isFinite(time)) {
          this._mediaSource.element.currentTime = time;
        }
        // Highlight on waveform
        if (this._waveformPainter) {
          const words = this._waveformPainter._savedWords || [];
          const idx = words.findIndex(w => Math.abs(w.start - time) < 0.05);
          if (idx >= 0) this._waveformPainter.onWordSelect?.(idx);
        }
      });
    });

    panel.querySelector('.inspector-autofix')?.addEventListener('click', async () => {
      const trackPath = this._getTrackPath();
      if (!trackPath) return;
      try {
        const res = await fetch('/api/tracks/auto-fix', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ trackPath }),
        });
        const data = await res.json();
        if (data.ok) {
          // Refresh lyrics and re-validate
          const indicator = this._flowBar?.querySelector('.flow-label');
          if (indicator) { indicator.textContent = `Fixed ${data.fixCount} issues`; indicator.style.color = '#00ff78'; }
          setTimeout(() => { if (indicator) { indicator.textContent = 'FLOW MODE'; indicator.style.color = ''; } }, 2500);
          // Reload waveform data
          this._flowRefreshAfterAutoFix?.();
          this._hideInspectorReport();
        }
      } catch (err) { console.error('[AutoFix] Failed:', err); }
    });
  }

  /** Hide the Inspector Report */
  _hideInspectorReport() {
    if (this._inspectorPanel) {
      this._inspectorPanel.remove();
      this._inspectorPanel = null;
    }
    if (this._inspectorOutsideClose) {
      document.removeEventListener('mousedown', this._inspectorOutsideClose);
      this._inspectorOutsideClose = null;
    }
  }

  _escHtml(s) {
    return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  /** Save all flow mode changes to the backend */
  async _flowSaveAll() {
    const trackPath = this._getTrackPath();
    if (!trackPath) {
      console.warn('[ChromicEditor:Flow] No trackPath — cannot save');
      return;
    }

    const lastEl = this._flowBar?.querySelector('.flow-last-word');
    if (lastEl) lastEl.innerHTML = `${_svgSave}Creating backup &amp; saving…`;

    // Build timeline from waveform words — output MUST match backup format:
    // Lines: { time, text, words: [{ word, start, end }] }
    // Strategy: fetch existing sidecar line structure, map edited words onto it.
    // Only fall back to re-grouping if no existing sidecar exists.
    const words = (this._waveformPainter?._savedWords || []).filter(w => !w.isCue);

    let timeline;

    // Try to preserve existing line structure from sidecar
    try {
      const refreshRes = await fetch('/api/lyrics/refresh', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ trackPath }),
      });
      if (refreshRes.ok) {
        const { lyrics: existingLines } = await refreshRes.json();
        if (Array.isArray(existingLines) && existingLines.length > 0) {
          // Count total words in existing lines (excluding vocal_cues)
          const realLines = existingLines.filter(l => l.type !== 'vocal_cue' && Array.isArray(l.words));
          const existingWordCount = realLines.reduce((sum, l) => sum + l.words.length, 0);

          if (existingWordCount === words.length) {
            // Same word count — map edited words onto existing line structure
            timeline = [];
            let wordIdx = 0;
            for (const line of existingLines) {
              if (line.type === 'vocal_cue' || !Array.isArray(line.words)) continue;
              const lineWords = [];
              for (let i = 0; i < line.words.length; i++) {
                const edited = words[wordIdx++];
                const entry = { word: edited.text, start: edited.start, end: edited.end };
                // Preserve stretch flag if original had it
                const orig = line.words[i];
                if (orig?.stretch) entry.stretch = true;
                lineWords.push(entry);
              }
              timeline.push({
                time: lineWords[0].start,
                text: lineWords.map(w => w.word).join(' '),
                words: lineWords,
              });
            }
            console.log(`[ChromicEditor:Flow] Preserved ${timeline.length} original lines (${words.length} words)`);
          }
        }
      }
    } catch (e) {
      console.warn('[ChromicEditor:Flow] Could not fetch existing sidecar:', e.message);
    }

    // Fallback: re-group words into lines (no existing sidecar or word count mismatch)
    if (!timeline) {
      timeline = [];
      let currentLine = null;
      for (const word of words) {
        const entry = { word: word.text, start: word.start, end: word.end };
        const MAX_WORDS_PER_LINE = 10;
        const gapTooLarge = currentLine && (word.start - currentLine.words[currentLine.words.length - 1].end) > 1.5;
        const lineTooLong = currentLine && currentLine.words.length >= MAX_WORDS_PER_LINE;
        if (!currentLine || gapTooLarge || lineTooLong) {
          if (currentLine) timeline.push(currentLine);
          currentLine = { time: word.start, text: word.text, words: [entry] };
        } else {
          currentLine.words.push(entry);
          currentLine.text = currentLine.words.map(w => w.word).join(' ');
        }
      }
      if (currentLine) timeline.push(currentLine);
      console.log(`[ChromicEditor:Flow] Re-grouped into ${timeline.length} lines (fallback)`);
    }

    try {
      const res = await fetch('/api/lyrics/flow-save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ trackPath, timeline, source: 'user' }),
      });
      if (res.ok) {
        const lastEl = this._flowBar?.querySelector('.flow-last-word');
        if (lastEl) lastEl.innerHTML = `${_svgCheck}Saved!`;
        console.log(`[ChromicEditor:Flow] Saved ${timeline.length} entries`);
      } else {
        throw new Error(`HTTP ${res.status}`);
      }
    } catch (err) {
      console.error('[ChromicEditor:Flow] Save failed:', err);
      const lastEl = this._flowBar?.querySelector('.flow-last-word');
      if (lastEl) lastEl.innerHTML = `${_svgX}Save failed`;
    }
  }

  _updateFlowPlayBtn() {
    if (!this._flowPlayBtn) return;
    const paused = this._mediaSource?.element?.paused ?? true;
    this._flowPlayBtn.textContent = paused ? '▶' : '⏸';
    this._flowPlayBtn.title = paused ? 'Play (Space)' : 'Pause (Space)';
  }

  /** Handle keydown inside the flow input */
  _onFlowKeydown(e) {
    // Ctrl+Z = undo
    if ((e.metaKey || e.ctrlKey) && e.key === 'z') {
      e.preventDefault();
      this._flowUndo();
      return;
    }

    // Escape = exit Pro Mode (flow mode is the only edit mode)
    if (e.key === 'Escape') {
      e.preventDefault();
      if (this._inspectorPanel) {
        this._hideInspectorReport();
        return;
      }
      this.deactivate();
      return;
    }

    // Alt (Option) = start timing (hold) — doesn't conflict with text input
    if (e.key === 'Alt' && !e.repeat) {
      e.preventDefault();
      const text = this._flowInput?.value?.trim();
      if (!text) return; // Nothing typed yet

      if (!this._flowTapping && this._mediaSource?.element) {
        this._flowTapping = true;

        // Resume playback if paused (auto-paused after previous word)
        if (this._mediaSource.element.paused) {
          this._mediaSource.element.play();
          this._flowBar?.classList.remove('flow-paused');
        }

        this._flowWordStart = this._mediaSource.element.currentTime;

        // Start recording zone on waveform
        this._waveformPainter?.startRecording(this._flowWordStart);

        // Visual feedback — indicator turns green
        const indicator = this._flowBar?.querySelector('[data-flow-indicator]');
        if (indicator) indicator.classList.add('is-recording');
        this._flowInput?.classList.add('is-tapping');

        console.log(`[ChromicEditor:Flow] ▶ START "${text}" @ ${this._flowWordStart.toFixed(3)}s`);
      }
      return;
    }

    // Enter = update selected word OR submit new word
    if (e.key === 'Enter') {
      e.preventDefault();
      const text = this._flowInput?.value?.trim();
      if (!text) return;

      // If a word is currently selected, update its text
      if (this._flowSelectedWordEl) {
        this._flowUpdateSelectedWord(text);
        return;
      }

      // Otherwise submit as new word (fallback — use current time)
      if (!this._mediaSource?.element) return;
      const now = this._mediaSource.element.currentTime;
      this._flowSubmitWord({ text, start: now - 0.3, end: now });
      return;
    }
  }

  /** Handle keyup inside the flow input — Alt release = end timing */
  _onFlowKeyup(e) {
    if (e.key === 'Alt' && this._flowTapping) {
      e.preventDefault();

      const text = this._flowInput?.value?.trim();
      const endTime = this._mediaSource?.element?.currentTime || 0;

      // Visual feedback — stop recording
      const indicator = this._flowBar?.querySelector('[data-flow-indicator]');
      if (indicator) indicator.classList.remove('is-recording');
      this._flowInput?.classList.remove('is-tapping');

      // Stop recording zone on waveform
      this._waveformPainter?.stopRecording();

      this._flowTapping = false;

      if (!text) return;

      console.log(`[ChromicEditor:Flow] ⏹ END "${text}" @ ${endTime.toFixed(3)}s (duration: ${((endTime - this._flowWordStart) * 1000).toFixed(0)}ms)`);

      this._flowSubmitWord({
        text,
        start: this._flowWordStart,
        end: endTime,
      });
    }
  }

  /** Send a tapped word to the backend */
  async _flowSubmitWord(wordData) {
    const trackPath = this._getTrackPath();
    if (!trackPath) {
      console.warn('[ChromicEditor:Flow] No trackPath — cannot submit');
      return;
    }

    // Clear input immediately
    if (this._flowInput) this._flowInput.value = '';
    this._flowInput?.focus();

    // Update counters
    this._flowWordCount++;
    const countEl = this._flowBar?.querySelector('.flow-word-count');
    if (countEl) countEl.textContent = `${this._flowWordCount} words`;
    const lastEl = this._flowBar?.querySelector('.flow-last-word');
    if (lastEl) lastEl.textContent = `"${wordData.text}" ${this._fmtTime(wordData.start)}→${this._fmtTime(wordData.end)}`;

    // Flash visual feedback on flow bar
    this._flowBar?.classList.add('flow-word-sent');
    setTimeout(() => this._flowBar?.classList.remove('flow-word-sent'), 300);

    try {
      const res = await fetch('/api/lyrics/flow-word', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          trackPath,
          word: {
            text: wordData.text,
            start: wordData.start,
            end: wordData.end,
          },
        }),
      });

      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      console.log(`[ChromicEditor:Flow] ✓ Word "${wordData.text}" saved (line ${data.lineIndex}, word ${data.wordIndex})`);

      // Update status to show success
      if (lastEl) lastEl.innerHTML = `${_svgCheck}"${_esc(wordData.text)}" ${this._fmtTime(wordData.start)}→${this._fmtTime(wordData.end)}`;

      // Auto-pause so user can type next word comfortably
      if (this._mediaSource?.element && !this._mediaSource.element.paused) {
        this._mediaSource.element.pause();
        this._flowBar?.classList.add('flow-paused');
      }

      // Push to undo stack
      this._flowUndoStack.push({
        trackPath,
        word: wordData,
        lineIndex: data.lineIndex,
        wordIndex: data.wordIndex,
      });
      if (this._flowUndoStack.length > 50) this._flowUndoStack.shift();

      // Add word to waveform overlay
      this._waveformPainter?.addWord(wordData);

      // Dispatch event so LyricsEngine can pick up the change
      document.dispatchEvent(new CustomEvent('chromic:flow-word', {
        detail: { trackPath, word: wordData, timeline: data.timeline },
      }));

    } catch (err) {
      console.error(`[ChromicEditor:Flow] ✗ Failed to save word "${wordData.text}":`, err.message);
      // Show error in status
      if (lastEl) lastEl.innerHTML = `${_svgX}"${_esc(wordData.text)}" failed`;
    }
  }

  /** Undo the last tapped word */
  async _flowUndo() {
    const entry = this._flowUndoStack.pop();
    if (!entry) {
      console.log('[ChromicEditor:Flow] Nothing to undo');
      return;
    }

    try {
      const res = await fetch('/api/lyrics/flow-undo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          trackPath: entry.trackPath,
          lineIndex: entry.lineIndex,
          wordIndex: entry.wordIndex,
        }),
      });

      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();

      this._flowWordCount = Math.max(0, this._flowWordCount - 1);
      const countEl = this._flowBar?.querySelector('.flow-word-count');
      if (countEl) countEl.textContent = `${this._flowWordCount} words`;
      const lastEl = this._flowBar?.querySelector('.flow-last-word');
      if (lastEl) lastEl.textContent = `↩ undid "${entry.word.text}"`;

      console.log(`[ChromicEditor:Flow] ↩ Undid word "${entry.word.text}"`);

      // Remove word from waveform overlay
      this._waveformPainter?.removeLastWord();

      // Dispatch event so LyricsEngine can update
      document.dispatchEvent(new CustomEvent('chromic:flow-word', {
        detail: { trackPath: entry.trackPath, timeline: data.timeline, undo: true },
      }));

    } catch (err) {
      console.error('[ChromicEditor:Flow] Undo failed:', err.message);
      // Put it back
      this._flowUndoStack.push(entry);
    }
  }

  // ═══════════════════════════════════════════════════════════════
  // ██  ELRC TEXTAREA EDITOR — Bidirectional Sync
  // ═══════════════════════════════════════════════════════════════

  /** Convert waveform words → ELRC text for the textarea */
  _flowSyncElrcTextarea() {
    if (!this._flowElrcTextarea || !this._waveformPainter) return;
    const words = this._waveformPainter._savedWords || [];
    const lines = [];
    let currentLine = [];
    let lastEnd = -1;

    for (const word of words) {
      if (word.isCue) {
        if (currentLine.length) { lines.push(currentLine); currentLine = []; }
        lines.push([{ text: '• • •', start: word.start, end: word.end, isCue: true }]);
        lastEnd = word.end;
        continue;
      }
      // New line if gap > 1.5s
      if (currentLine.length && (word.start - lastEnd) > 1.5) {
        lines.push(currentLine);
        currentLine = [];
      }
      currentLine.push(word);
      lastEnd = word.end;
    }
    if (currentLine.length) lines.push(currentLine);

    const elrc = lines.map(lineWords => {
      return lineWords.map(w => {
        const t = w.start.toFixed(2);
        if (w.isCue) return `[${t}] • • •`;
        return `[${t}] ${w.text}`;
      }).join(' ');
    }).join('\n');

    this._flowElrcTextarea.value = elrc;
    // Track line count for auto-scroll highlighting
    this._flowElrcLines = lines;
    // Sync syntax highlight overlay
    this._flowSyncElrcHighlight();
  }

  /** Render syntax-highlighted overlay for ELRC textarea (timestamps in theme color) */
  _flowSyncElrcHighlight() {
    const overlay = this._flowElrcHighlight;
    const ta = this._flowElrcTextarea;
    if (!overlay || !ta) return;
    const text = ta.value;
    // Escape HTML, then wrap [timestamps] in spans
    const escaped = text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
    const highlighted = escaped.replace(
      /(\[\d+(?:\.\d+)?\])/g,
      '<span class="elrc-ts">$1</span>'
    );
    overlay.innerHTML = highlighted + '\n'; // trailing newline for scroll parity
    overlay.scrollTop = ta.scrollTop;
  }

  // ═══════════════════════════════════════════════════════════════
  // ██  LRC FILE EDITOR — Load / Save .lrc sidecar directly
  // ═══════════════════════════════════════════════════════════════

  /** Load the .lrc sidecar file content into the LRC textarea */
  async _flowLoadLrc() {
    const trackPath = this._getTrackPath();
    const ta = this._flowBar?.querySelector('.chromic-flow-lrc-textarea');
    const sourceBar = this._flowBar?.querySelector('.chromic-flow-lrc-source-bar');
    const sourceLabel = this._flowBar?.querySelector('.chromic-flow-lrc-source-label');
    const useEmbeddedBtn = this._flowBar?.querySelector('.chromic-flow-lrc-use-embedded');
    const versionSelect = this._flowBar?.querySelector('.chromic-flow-lrc-version-select');
    const embeddedRef = this._flowBar?.querySelector('.chromic-flow-lrc-embedded-ref');
    if (!ta) return;
    this._flowLrcEmbedded = null;
    if (embeddedRef) embeddedRef.hidden = true;

    if (!trackPath) {
      ta.value = '# No track loaded';
      if (sourceBar) sourceBar.hidden = true;
      return;
    }
    ta.value = 'Loading .lrc file…';
    try {
      const res = await fetch('/api/lyrics/lrc-load', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ trackPath }),
      });
      const data = await res.json();

      // Store embedded for reference panel
      if (data.embedded) this._flowLrcEmbedded = data.embedded;

      if (data.content != null) {
        // .lrc sidecar or generated from .lyrics.json — load it
        ta.value = this._ensureLrcFormat(data.content);
        if (sourceBar) sourceBar.hidden = false;
        if (sourceLabel) sourceLabel.textContent = data.source === 'generated'
          ? 'Source: generated from alignment data (.lyrics.json) — click Save to create .lrc sidecar'
          : 'Source: .lrc sidecar file';
        if (useEmbeddedBtn) useEmbeddedBtn.hidden = !data.embedded;
      } else if (data.embedded) {
        // No sidecar, but embedded lyrics found — show as template
        ta.value = this._ensureLrcFormat(data.embedded);
        if (sourceBar) sourceBar.hidden = false;
        if (sourceLabel) sourceLabel.textContent = 'Source: embedded metadata — click Save to create .lrc sidecar';
        if (useEmbeddedBtn) useEmbeddedBtn.hidden = true;
      } else {
        ta.value = `# No .lrc file found\n# No embedded lyrics in metadata\n# Expected: ${data.path || '(unknown)'}\n# You can create one here — paste LRC content and click Save`;
        if (sourceBar) sourceBar.hidden = true;
      }

      // Load LRC backups into version dropdown
      this._flowLoadLrcBackups(trackPath, versionSelect, ta);
    } catch (err) {
      ta.value = `# Error loading .lrc: ${err.message}`;
      if (sourceBar) sourceBar.hidden = true;
    }
  }

  /** Ensure text is in proper LRC format [mm:ss.xx] text */
  _ensureLrcFormat(text) {
    if (!text || typeof text !== 'string') return text || '';
    const lines = text.split('\n');
    // Check if already in LRC format (most lines have timestamps)
    const lrcLineRegex = /^\[(\d{1,2}):(\d{2})\.(\d{2,3})\]/;
    const metaLineRegex = /^\[(ti|ar|al|by|offset|length|re|ve):/i;
    let hasTimestamps = 0;
    let totalContentLines = 0;
    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) continue;
      totalContentLines++;
      if (lrcLineRegex.test(trimmed) || metaLineRegex.test(trimmed)) hasTimestamps++;
    }
    // If most lines already have timestamps, return as-is
    if (totalContentLines > 0 && hasTimestamps / totalContentLines > 0.5) return text;
    // Otherwise it's plain text — don't add fake timestamps, just return as-is
    // The user can add timestamps manually or re-sync
    return text;
  }

  /** Load LRC backup versions into the version dropdown */
  async _flowLoadLrcBackups(trackPath, select, ta) {
    if (!select) return;
    // Reset to just "Current Version"
    select.innerHTML = '<option value="current">Current Version</option>';
    try {
      const res = await fetch('/api/lyrics/lrc-backups', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ trackPath }),
      });
      const data = await res.json();
      if (data.backups && data.backups.length > 0) {
        for (const b of data.backups.slice(0, 15)) {
          const date = new Date(b.timestamp);
          const timeStr = date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' }) + ' ' + date.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' });
          const opt = document.createElement('option');
          opt.value = b.fileName;
          opt.textContent = `${timeStr} (${b.lines} lines)`;
          select.appendChild(opt);
        }
      }
      // Add "Embedded (original)" if available
      if (this._flowLrcEmbedded) {
        const opt = document.createElement('option');
        opt.value = '__embedded__';
        opt.textContent = 'Embedded (original from audio file)';
        select.appendChild(opt);
      }
    } catch {}

    // Bind change event (remove old listener first)
    const newSelect = select.cloneNode(true);
    select.parentNode.replaceChild(newSelect, select);
    newSelect.addEventListener('change', async () => {
      const val = newSelect.value;
      if (val === 'current') {
        // Reload current
        this._flowLoadLrc();
        return;
      }
      if (val === '__embedded__') {
        ta.value = this._ensureLrcFormat(this._flowLrcEmbedded || '');
        const hint = this._flowBar?.querySelector('.chromic-flow-lrc-hint');
        if (hint) hint.textContent = 'Viewing embedded lyrics (read-only reference) — switch to Current to edit';
        return;
      }
      // Load backup content
      try {
        const res = await fetch('/api/lyrics/lrc-restore-backup', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ trackPath, backupFileName: val }),
        });
        const data = await res.json();
        if (data.content != null) {
          ta.value = this._ensureLrcFormat(data.content);
          const hint = this._flowBar?.querySelector('.chromic-flow-lrc-hint');
          if (hint) hint.textContent = `Loaded backup — click Save to apply as current .lrc`;
        }
      } catch (err) {
        ta.value = `# Error loading backup: ${err.message}`;
      }
    });
  }

  /** Save the LRC textarea content to the .lrc sidecar (backend creates backups) */
  async _flowSaveLrc() {
    const trackPath = this._getTrackPath();
    const ta = this._flowBar?.querySelector('.chromic-flow-lrc-textarea');
    const hint = this._flowBar?.querySelector('.chromic-flow-lrc-hint');
    if (!ta || !trackPath) return;

    const content = ta.value;
    if (hint) hint.textContent = 'Saving…';

    try {
      const res = await fetch('/api/lyrics/lrc-save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ trackPath, content }),
      });
      const data = await res.json();
      if (data.ok) {
        if (hint) hint.textContent = `Saved — backup created automatically`;
        setTimeout(() => {
          if (hint) hint.textContent = 'Edit the .lrc sidecar file directly — backups are created automatically';
        }, 3000);
      } else {
        if (hint) hint.textContent = `Error: ${data.error}`;
      }
    } catch (err) {
      if (hint) hint.textContent = `Error: ${err.message}`;
    }
  }

  /** Save LRC then trigger re-alignment to generate word-level sync from the edited text */
  async _flowSaveLrcAndRealign() {
    const trackPath = this._getTrackPath();
    const hint = this._flowBar?.querySelector('.chromic-flow-lrc-hint');
    if (!trackPath) return;

    // Step 1: Save the LRC first
    await this._flowSaveLrc();

    // Step 2: Trigger re-alignment via the lyrics generation endpoint
    if (hint) hint.textContent = 'Re-aligning with Whisper… (this takes a minute)';
    try {
      const mr = window.musicRuntime;
      const track = mr?.items?.[mr?.currentTrackIndex];
      const artist = track?.artist || '';
      const title = track?.title || '';

      const res = await fetch('/api/lyrics/enrich-track', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ trackPath, force: true }),
      });
      const data = await res.json();
      if (data.ok || data.status === 'running') {
        if (hint) hint.textContent = 'Aligner started…';
        this._flowPollAlignerStatus(trackPath, hint);
        document.addEventListener('chromic:track-assets-updated', () => {
          this._flowLoadLrc();
        }, { once: true });
      } else {
        if (hint) hint.textContent = `${data.error || 'Could not start aligner'}`;
      }
    } catch (err) {
      if (hint) hint.textContent = `Re-align error: ${err.message}`;
    }
  }

  /** Poll backend for aligner progress and show steps in the hint element */
  _flowPollAlignerStatus(trackPath, hint) {
    if (this._flowAlignerPollTimer) clearInterval(this._flowAlignerPollTimer);
    let attempts = 0;
    const maxAttempts = 150;
    let relPath = trackPath;
    try { relPath = decodeURIComponent(relPath); } catch {}
    const encodedRelPath = relPath.split('/').map(s => encodeURIComponent(s)).join('/');

    this._flowAlignerPollTimer = setInterval(async () => {
      attempts++;
      if (attempts > maxAttempts) {
        clearInterval(this._flowAlignerPollTimer);
        this._flowAlignerPollTimer = null;
        if (hint) hint.textContent = 'Aligner timed out — check AI Hub';
        return;
      }
      try {
        const res = await fetch(`/api/lyrics-status/${encodedRelPath}`);
        if (!res.ok) return;
        const data = await res.json();
        if (data.status === 'generating' || data.status === 'running') {
          if (hint && data.stepLabel) hint.textContent = data.stepLabel;
          else if (hint && data.step) hint.textContent = `Step: ${data.step}`;
        } else if (data.status === 'queued') {
          const pos = data.queuePosition || 0;
          if (hint) hint.textContent = pos > 0 ? `Queued (position ${pos})…` : 'Queued for processing…';
        } else if (data.status === 'done' || data.lyrics) {
          clearInterval(this._flowAlignerPollTimer);
          this._flowAlignerPollTimer = null;
          if (hint) hint.textContent = 'Alignment complete — lyrics updated';
          this._flowLoadLrc();
          setTimeout(() => {
            if (hint) hint.textContent = 'Edit the .lrc sidecar file directly — backups are created automatically';
          }, 4000);
        } else if (data.status === 'not_found' && data.errorMessage) {
          clearInterval(this._flowAlignerPollTimer);
          this._flowAlignerPollTimer = null;
          if (hint) hint.textContent = `Aligner failed: ${data.errorMessage.slice(0, 120)}`;
        }
      } catch {}
    }, 5000);
  }

  /** Highlight the active ELRC line in the textarea based on current playback time */
  _flowUpdateElrcHighlight(currentTime) {
    if (!this._flowElrcTextarea || !this._flowElrcLines) return;
    const lines = this._flowElrcLines;
    let activeLineIdx = -1;
    for (let i = 0; i < lines.length; i++) {
      const lineWords = lines[i];
      const lineStart = lineWords[0]?.start ?? Infinity;
      const lineEnd = lineWords[lineWords.length - 1]?.end ?? lineWords[lineWords.length - 1]?.start ?? 0;
      if (currentTime >= lineStart && currentTime <= lineEnd + 0.5) {
        activeLineIdx = i;
      }
    }
    if (activeLineIdx < 0) return;
    // Scroll textarea to center the active line
    const ta = this._flowElrcTextarea;
    const totalLines = ta.value.split('\n').length;
    if (totalLines <= 0) return;
    const lineHeight = ta.scrollHeight / totalLines;
    const targetScroll = Math.max(0, (activeLineIdx * lineHeight) - (ta.clientHeight / 2) + (lineHeight / 2));
    ta.scrollTop += (targetScroll - ta.scrollTop) * 0.15;
  }

  /** Parse ELRC text from textarea → update waveform words */
  _flowApplyElrcFromTextarea() {
    if (!this._flowElrcTextarea || !this._waveformPainter) return;
    const text = this._flowElrcTextarea.value;
    const newWords = [];
    const lineTexts = text.split('\n').filter(l => l.trim());

    for (const line of lineTexts) {
      if (!line.trim()) continue;
      // Match all [timestamp] word pairs in a line
      const regex = /\[(\d+(?:\.\d+)?)\]\s*([^[\]]*?)(?=\s*\[|$)/g;
      let match;
      while ((match = regex.exec(line)) !== null) {
        const start = parseFloat(match[1]);
        const wordText = match[2].trim();
        if (!wordText) continue;
        const isCue = wordText === '• • •';
        newWords.push({ start, text: wordText, isCue });
      }
    }

    // Calculate end times: each word ends where the next begins (or +0.5s for last)
    for (let i = 0; i < newWords.length; i++) {
      if (i < newWords.length - 1) {
        newWords[i].end = newWords[i + 1].start;
      } else {
        newWords[i].end = newWords[i].start + 0.5;
      }
    }

    // Replace waveform words
    this._waveformPainter._savedWords.length = 0;
    for (const w of newWords) {
      this._waveformPainter.addWord({
        text: w.text,
        start: w.start,
        end: w.end,
        isCue: w.isCue,
        style: 'normal',
      });
    }

    this._flowWordCount = newWords.filter(w => !w.isCue).length;
    const countEl = this._flowBar?.querySelector('.flow-word-count');
    if (countEl) countEl.textContent = `${this._flowWordCount} words`;
    const lastEl = this._flowBar?.querySelector('.flow-last-word');
    if (lastEl) lastEl.innerHTML = `${_svgPencil}ELRC applied`;
    console.log(`[ChromicEditor:Flow] ✏️ Applied ${newWords.length} words from ELRC textarea`);
  }
}

// ═══════════════════════════════════════════════════════════════
// ██  WAVEFORM PAINTER — GPU-Accelerated Canvas Renderer
// ═══════════════════════════════════════════════════════════════

class WaveformPainter {
  constructor(mediaElement) {
    this._media = mediaElement;
    this._peaks = null;      // Float32Array of pre-computed peaks
    this._peakRate = 0;      // peaks per second
    this._canvas = null;
    this._ctx = null;
    this._raf = 0;
    this._zoom = 150;        // pixels per second (default)
    this._minZoom = 30;
    this._maxZoom = 1200;
    this._savedWords = [];   // {start, end, text, laneIndex?} for overlay
    this._destroyed = false;
    this._scrubbing = false;
    this._scrubStartX = 0;
    this._scrubStartTime = 0;
    // Interactive word blocks
    this._selectedWordIdx = -1;
    this._hoveredWordIdx = -1;
    this._dragMode = null;   // 'left' | 'right' | 'move' | null
    this._dragStartX = 0;
    this._dragOrigStart = 0;
    this._dragOrigEnd = 0;
    // Recording zone (Option held)
    this._recording = false;
    this._recordStart = 0;
    // Callbacks
    this.onWordTimingChange = null; // (wordIdx, newStart, newEnd, isRipple?) => void
    this.onWordSelect = null;      // (wordIdx) => void
    this.onWordSplit = null;       // (wordIdx, leftWord, rightWord) => void
    this.onWordLaneChange = null;  // (wordIdx, newLane) => void
    this.onWordAdd = null;         // (wordIdx, word) => void
    this.onWordDelete = null;      // (wordIdx) => void
    this.onWordTextChange = null;  // (wordIdx, newText) => void
    this.onWordStyleChange = null; // (wordIdx, newStyle) => void
    // Handle size for edge drag (in CSS px)
    this._handlePx = 6;
    // Context menu
    this._activeContextMenu = null;

    // ─── DAW Features ───
    // Multi-selection
    this._selectedWordIdxs = new Set();
    this._dragOrigPositions = new Map(); // wordIdx → {start, end} for multi-drag

    // Lane system (overlapping words go to different lanes)
    this._maxLanes = 4;
    this._lanesDirty = true;

    // Magnetic snapping
    this._snapThresholdSec = 0.005; // 5ms
    this._snapLineTime = null;      // time of active snap guide (for visual)

    // Ripple edit state
    this._rippleActive = false;     // true when Alt is held during drag
    this._rippleAffected = new Set(); // indices of words being rippled
    this._rippleOrigPositions = new Map(); // idx → {start, end} for all rippled words
  }

  // ─── RIPPLE EDIT ──

  /** Shift all words from fromIdx+1 to end by delta seconds (ripple edit) */
  shiftFollowingWords(fromIdx, delta) {
    const words = this._savedWords;
    const affected = [];
    for (let i = fromIdx + 1; i < words.length; i++) {
      const w = words[i];
      w.start += delta;
      w.end += delta;
      // Clamp to 0
      if (w.start < 0) { w.end -= w.start; w.start = 0; }
      affected.push(i);
    }
    this._lanesDirty = true;
    return affected;
  }

  /** Close the gap between word at idx and the next word (pull next word flush) */
  closeGap(idx) {
    const words = this._savedWords;
    if (idx < 0 || idx >= words.length - 1) return 0;
    const current = words[idx];
    const next = words[idx + 1];
    const gap = next.start - current.end;
    if (gap <= 0) return 0; // no gap
    // Shift all following words left by gap amount
    this.shiftFollowingWords(idx, -gap);
    this._lanesDirty = true;
    return gap;
  }

  /** Shift all words after the currently selected word by a given delta.
   *  Used by the "Shift Following" button in the flow bar. */
  shiftAllFollowing(delta) {
    if (this._selectedWordIdx < 0) return;
    this.shiftFollowingWords(this._selectedWordIdx, delta);
    // Notify callback for each affected word
    for (let i = this._selectedWordIdx + 1; i < this._savedWords.length; i++) {
      const w = this._savedWords[i];
      this.onWordTimingChange?.(i, w.start, w.end, true /* isRipple */);
    }
  }

  /** Calculate lane indices — style-based + overlap collision.
   *  Lane 0: Normal vocals (top)
   *  Lane 1: Stretch / ad-lib / backing
   *  Lane 2: Cues / metadata (bottom)
   *  If words within same style-lane overlap in time, bump to next available lane.
   */
  _calculateLanes() {
    const words = this._savedWords;
    if (!words.length) return;

    // Step 1: Assign base lane by style/type
    for (const word of words) {
      if (word.isCue) {
        word.laneIndex = 2;
      } else if (word.style === 'stretch' || word.style === 'adlib' || word.style === 'backing') {
        word.laneIndex = 1;
      } else {
        word.laneIndex = 0;
      }
    }

    // Step 2: Resolve overlaps WITHIN each lane (greedy)
    for (let baseLane = 0; baseLane < this._maxLanes; baseLane++) {
      const laneWords = words.filter(w => w.laneIndex === baseLane);
      if (laneWords.length < 2) continue;
      laneWords.sort((a, b) => a.start - b.start);
      // Track end-time of sub-rows within this lane
      const subEnds = [0];
      for (const word of laneWords) {
        let placed = false;
        // Try to fit in current base lane (no bump)
        if (word.start >= subEnds[0]) {
          subEnds[0] = word.end;
          placed = true;
        }
        if (!placed) {
          // Overlap detected — bump to baseLane+1 (if available)
          const bumpLane = Math.min(baseLane + 1, this._maxLanes - 1);
          if (bumpLane !== baseLane) {
            word.laneIndex = bumpLane;
          }
          // Still update sub-end so we don't double-bump
        }
      }
    }

    this._lanesDirty = false;
  }

  /** Get lane metrics for rendering — always show at least 2 lanes when we have cues */
  _getLaneMetrics(canvasH) {
    if (!this._savedWords.length) return { laneCount: 1, laneH: canvasH };
    const hasCues = this._savedWords.some(w => w.isCue);
    const hasStyleWords = this._savedWords.some(w => w.style === 'stretch' || w.style === 'adlib' || w.style === 'backing');
    const maxLane = Math.max(0, ...this._savedWords.map(w => w.laneIndex || 0));
    // Always show at least 2 lanes if cues exist, 3 if stretch/adlib exists too
    let laneCount = maxLane + 1;
    if (hasCues && laneCount < 3) laneCount = 3;
    else if (hasStyleWords && laneCount < 2) laneCount = 2;
    else if (laneCount < 2) laneCount = 2; // Always at least 2 for DAW look
    laneCount = Math.min(this._maxLanes, laneCount);
    return { laneCount, laneH: canvasH / laneCount };
  }

  /** Magnetic snap: find nearest edge within threshold */
  _findSnap(time, excludeIdx) {
    const thresh = this._snapThresholdSec;
    let best = null;
    let bestDist = thresh;
    // Snap to playhead
    const playhead = this._media?.currentTime || 0;
    if (Math.abs(time - playhead) < bestDist) {
      bestDist = Math.abs(time - playhead);
      best = playhead;
    }
    // Snap to other word edges
    for (let i = 0; i < this._savedWords.length; i++) {
      if (i === excludeIdx) continue;
      const w = this._savedWords[i];
      if (Math.abs(time - w.start) < bestDist) { bestDist = Math.abs(time - w.start); best = w.start; }
      if (Math.abs(time - w.end) < bestDist) { bestDist = Math.abs(time - w.end); best = w.end; }
    }
    return best;
  }

  /** Split a word at the playhead position */
  _splitWordAtPlayhead(wordIdx) {
    const word = this._savedWords[wordIdx];
    if (!word || word.isCue) return;
    const playhead = this._media?.currentTime || 0;
    if (playhead <= word.start || playhead >= word.end) return;
    const textParts = word.text.split(/\s+/);
    const splitPoint = Math.max(1, Math.ceil(textParts.length / 2));
    const leftText = textParts.slice(0, splitPoint).join(' ');
    const rightText = textParts.slice(splitPoint).join(' ') || word.text;
    const leftWord = { ...word, end: playhead, text: leftText || word.text };
    const rightWord = { ...word, start: playhead, text: rightText };
    this._savedWords.splice(wordIdx, 1, leftWord, rightWord);
    this._lanesDirty = true;
    this.onWordSplit?.(wordIdx, leftWord, rightWord);
  }

  /** Decode audio and pre-compute peaks array for fast drawing */
  async init() {
    if (!this._media?.src) return false;
    try {
      const url = this._media.src;
      const resp = await fetch(url);
      if (!resp.ok) return false;
      const arrayBuf = await resp.arrayBuffer();
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const audioBuf = await audioCtx.decodeAudioData(arrayBuf);
      audioCtx.close();

      // Pre-compute peaks: ~200 peaks/sec for smooth rendering at any zoom
      const PEAKS_PER_SEC = 200;
      const raw = audioBuf.getChannelData(0);
      const sampleRate = audioBuf.sampleRate;
      const samplesPerPeak = Math.floor(sampleRate / PEAKS_PER_SEC);
      const peakCount = Math.ceil(raw.length / samplesPerPeak);
      const peaks = new Float32Array(peakCount);

      for (let i = 0; i < peakCount; i++) {
        let max = 0;
        const start = i * samplesPerPeak;
        const end = Math.min(start + samplesPerPeak, raw.length);
        for (let j = start; j < end; j++) {
          const v = Math.abs(raw[j]);
          if (v > max) max = v;
        }
        peaks[i] = max;
      }

      this._peaks = peaks;
      this._peakRate = PEAKS_PER_SEC;
      this._duration = audioBuf.duration;
      console.log(`[Waveform] ✓ Decoded ${audioBuf.duration.toFixed(1)}s, ${peakCount} peaks`);
      return true;
    } catch (err) {
      console.warn('[Waveform] Failed to decode audio:', err.message);
      return false;
    }
  }

  /** Create canvas element and attach to container */
  mount(container) {
    this._container = container;
    this._canvas = document.createElement('canvas');
    this._canvas.className = 'chromic-waveform-canvas';
    const dpr = window.devicePixelRatio || 1;
    this._canvas.width = container.offsetWidth * dpr;
    this._canvas.height = 160 * dpr;
    this._canvas.style.width = '100%';
    this._canvas.style.height = '160px';
    this._ctx = this._canvas.getContext('2d');
    container.appendChild(this._canvas);

    // Resize observer
    this._resizeObs = new ResizeObserver(() => {
      if (this._canvas && container.offsetWidth > 0) {
        const dpr = window.devicePixelRatio || 1;
        this._canvas.width = container.offsetWidth * dpr;
        this._canvas.height = 160 * dpr;
      }
    });
    this._resizeObs.observe(container);

    // Bind wheel zoom on container (captures even if canvas hasn't rendered yet)
    const onWheel = this._onWheel.bind(this);
    container.addEventListener('wheel', onWheel, { passive: false });
    this._canvas.addEventListener('wheel', onWheel, { passive: false });

    // Scrubbing — bind on container so clicks anywhere in waveform area work
    const onDown = this._onPointerDown.bind(this);
    const onMove = this._onPointerMove.bind(this);
    const onUp = this._onPointerUp.bind(this);
    container.addEventListener('pointerdown', onDown);
    container.addEventListener('pointermove', onMove);
    container.addEventListener('pointerup', onUp);
    container.addEventListener('pointerleave', onUp);

    // Prevent flow bar from stealing focus when clicking waveform
    container.addEventListener('mousedown', (e) => e.stopPropagation());

    // Context menu (right-click) for adding/editing elements
    container.addEventListener('contextmenu', (e) => {
      e.preventDefault();
      e.stopPropagation();
      this._showWaveformContextMenu(e.clientX, e.clientY);
    });

    this._startLoop();
  }

  /** Start rAF render loop */
  _startLoop() {
    const loop = () => {
      if (this._destroyed) return;
      this._draw();
      this._raf = requestAnimationFrame(loop);
    };
    this._raf = requestAnimationFrame(loop);
  }

  /** Core render — draws waveform centered on current playhead */
  _draw() {
    const canvas = this._canvas;
    const ctx = this._ctx;
    if (!canvas || !ctx || !this._peaks) return;

    const w = canvas.width;
    const h = canvas.height;
    const dpr = window.devicePixelRatio || 1;
    const zoom = this._zoom * dpr;
    const currentTime = this._media?.currentTime || 0;
    const centerX = w / 2;

    ctx.clearRect(0, 0, w, h);

    // — Calculate lanes for overlapping words —
    if (this._lanesDirty) this._calculateLanes();
    const { laneCount, laneH } = this._getLaneMetrics(h);

    // — Draw lane dividers + labels (DAW style) —
    if (laneCount > 1) {
      const laneLabels = ['VOCAL', 'AD-LIB', 'CUE', 'EXTRA'];
      const laneColors = [
        'rgba(100, 200, 255, 0.12)',  // vocal - subtle blue
        'rgba(255, 180, 80, 0.08)',   // ad-lib - subtle orange
        'rgba(180, 100, 255, 0.06)',  // cue - subtle purple
        'rgba(100, 255, 100, 0.05)', // extra
      ];
      for (let lane = 0; lane < laneCount; lane++) {
        const yTop = lane * laneH;
        // Lane background tint
        ctx.fillStyle = laneColors[lane] || laneColors[3];
        ctx.fillRect(0, yTop, w, laneH);
        // Lane label (left side)
        ctx.font = `${9 * dpr}px -apple-system, sans-serif`;
        ctx.fillStyle = 'rgba(255, 255, 255, 0.15)';
        ctx.textAlign = 'left';
        ctx.fillText(laneLabels[lane] || `L${lane}`, 4 * dpr, yTop + 11 * dpr);
      }
      // Divider lines
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
      ctx.lineWidth = 1 * dpr;
      for (let lane = 1; lane < laneCount; lane++) {
        const y = lane * laneH;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }
    }

    // — Draw saved word blocks (interactive, lane-aware) —
    for (let i = 0; i < this._savedWords.length; i++) {
      const word = this._savedWords[i];
      const x1 = centerX + (word.start - currentTime) * zoom;
      const x2 = centerX + (word.end - currentTime) * zoom;
      if (x2 < 0 || x1 > w) continue;

      const lane = word.laneIndex || 0;
      const yTop = lane * laneH;

      const isSelected = i === this._selectedWordIdx || this._selectedWordIdxs.has(i);
      const isHovered = i === this._hoveredWordIdx && !isSelected;
      const isCue = word.isCue;

      // Ripple ghost highlight — affected words glow during ripple drag
      const isRippled = this._rippleActive && this._rippleAffected.has(i);
      if (isRippled) {
        ctx.fillStyle = 'rgba(0, 255, 200, 0.12)';
        ctx.fillRect(x1, yTop, x2 - x1, laneH);
        ctx.strokeStyle = 'rgba(0, 255, 200, 0.5)';
        ctx.lineWidth = 1.5 * dpr;
        ctx.setLineDash([4 * dpr, 2 * dpr]);
        ctx.strokeRect(x1, yTop, x2 - x1, laneH);
        ctx.setLineDash([]);
      }

      // Color scheme: blue for words, purple for cues, orange for multi-selected
      const isMulti = this._selectedWordIdxs.has(i) && i !== this._selectedWordIdx;
      const baseR = isCue ? 180 : isMulti ? 255 : 100;
      const baseG = isCue ? 100 : isMulti ? 180 : 150;
      const baseB = isCue ? 255 : isMulti ? 80 : 255;

      // Block fill — selected > hovered > default
      ctx.fillStyle = isSelected
        ? `rgba(${baseR}, ${baseG}, ${baseB}, 0.25)`
        : isHovered
          ? `rgba(${baseR}, ${baseG}, ${baseB}, 0.16)`
          : `rgba(${baseR}, ${baseG}, ${baseB}, 0.1)`;
      ctx.fillRect(x1, yTop, x2 - x1, laneH);

      // Block border
      ctx.strokeStyle = isSelected
        ? `rgba(${baseR}, ${baseG}, ${baseB}, 0.9)`
        : isHovered
          ? `rgba(${baseR}, ${baseG}, ${baseB}, 0.6)`
          : `rgba(${baseR}, ${baseG}, ${baseB}, 0.3)`;
      ctx.lineWidth = (isSelected ? 2 : isHovered ? 1.5 : 1) * dpr;
      ctx.strokeRect(x1, yTop, x2 - x1, laneH);

      // Edge handles (only for selected word)
      if (isSelected && i === this._selectedWordIdx) {
        const handleW = this._handlePx * dpr;
        ctx.fillStyle = `rgba(${baseR}, ${baseG}, ${baseB}, 0.6)`;
        ctx.fillRect(x1 - handleW / 2, yTop + laneH * 0.2, handleW, laneH * 0.6);
        ctx.fillRect(x2 - handleW / 2, yTop + laneH * 0.2, handleW, laneH * 0.6);
      }

      // Word label
      ctx.font = `${(isSelected ? 11 : isHovered ? 10 : 9) * dpr}px -apple-system, BlinkMacSystemFont, sans-serif`;
      ctx.fillStyle = isSelected
        ? `rgba(${baseR}, ${baseG}, ${baseB}, 0.95)`
        : isHovered
          ? `rgba(${baseR}, ${baseG}, ${baseB}, 0.85)`
          : `rgba(${baseR}, ${baseG}, ${baseB}, 0.7)`;
      ctx.textAlign = 'center';
      const xMid = (x1 + x2) / 2;

      // CJK Glow-Travel: if word has _chars array, draw per-character glow
      const chars = word._chars;
      if (chars && chars.length > 1 && !isSelected) {
        // Draw each character with individual glow based on playback position
        const totalChars = chars.length;
        const charFontSize = (isHovered ? 10 : 9) * dpr;
        ctx.font = `${charFontSize}px -apple-system, BlinkMacSystemFont, sans-serif`;
        // Measure total text width to distribute chars
        const fullWidth = ctx.measureText(word.text).width;
        const availWidth = x2 - x1 - 4 * dpr;
        const scale = availWidth > 0 && fullWidth > 0 ? Math.min(1, availWidth / fullWidth) : 1;
        let charX = x1 + 2 * dpr;
        const labelY = yTop + laneH - 4 * dpr;

        ctx.textAlign = 'left';
        for (let ci = 0; ci < totalChars; ci++) {
          const ch = chars[ci];
          const charW = ctx.measureText(ch.char).width * scale;
          // Determine glow intensity based on current time
          let alpha;
          if (currentTime >= ch.end) {
            alpha = 0.55; // already sung — moderate
          } else if (currentTime >= ch.start) {
            // Currently being sung — bright glow
            alpha = 0.95;
            // Draw a subtle highlight behind the active char
            ctx.fillStyle = `rgba(${baseR}, ${baseG}, ${baseB}, 0.15)`;
            ctx.fillRect(charX - 1 * dpr, yTop, charW + 2 * dpr, laneH);
          } else {
            alpha = 0.35; // not yet sung — dim
          }
          ctx.fillStyle = `rgba(${baseR}, ${baseG}, ${baseB}, ${alpha})`;
          ctx.fillText(ch.char, charX, labelY);
          charX += charW;
        }
        ctx.textAlign = 'center'; // restore
      } else {
        ctx.fillText(word.text, xMid, yTop + laneH - 4 * dpr);
      }

      // Time labels for selected word
      if (isSelected && i === this._selectedWordIdx) {
        ctx.font = `${8 * dpr}px 'SF Mono', monospace`;
        ctx.fillStyle = `rgba(${baseR}, ${baseG}, ${baseB}, 0.6)`;
        ctx.textAlign = 'left';
        ctx.fillText(word.start.toFixed(2) + 's', x1 + 3 * dpr, yTop + 12 * dpr);
        ctx.textAlign = 'right';
        ctx.fillText(word.end.toFixed(2) + 's', x2 - 3 * dpr, yTop + 12 * dpr);
      }
    }

    // — Magnetic snap guide line —
    if (this._snapLineTime != null) {
      const snapX = centerX + (this._snapLineTime - currentTime) * zoom;
      if (snapX >= 0 && snapX <= w) {
        ctx.strokeStyle = 'rgba(0, 255, 200, 0.7)';
        ctx.lineWidth = 1 * dpr;
        ctx.setLineDash([3 * dpr, 3 * dpr]);
        ctx.beginPath();
        ctx.moveTo(snapX, 0);
        ctx.lineTo(snapX, h);
        ctx.stroke();
        ctx.setLineDash([]);
      }
    }

    // — Recording zone (red, expanding from record start) —
    if (this._recording) {
      const recX = centerX + (this._recordStart - currentTime) * zoom;
      const recWidth = centerX - recX; // always extends to playhead
      if (recWidth > 0) {
        ctx.fillStyle = 'rgba(255, 62, 0, 0.15)';
        ctx.fillRect(recX, 0, recWidth, h);
        ctx.strokeStyle = 'rgba(255, 62, 0, 0.5)';
        ctx.lineWidth = 1 * dpr;
        ctx.setLineDash([4 * dpr, 4 * dpr]);
        ctx.strokeRect(recX, 0, recWidth, h);
        ctx.setLineDash([]);
      }
    }

    // — Draw waveform peaks (rendered in vocal lane only) —
    const peakRate = this._peakRate;
    const peaks = this._peaks;
    const barW = Math.max(1, zoom / peakRate);
    const waveH = laneH; // waveform only in lane 0

    ctx.fillStyle = 'rgba(0, 255, 128, 0.25)';
    for (let x = 0; x < w; x += Math.max(1, barW * 0.8)) {
      const t = currentTime + (x - centerX) / zoom;
      if (t < 0 || t > this._duration) continue;
      const peakIdx = Math.floor(t * peakRate);
      if (peakIdx < 0 || peakIdx >= peaks.length) continue;

      const val = peaks[peakIdx];
      const barH = val * waveH * 0.8;
      const drawW = Math.max(1, barW - 0.5);
      ctx.fillRect(x, (waveH - barH) / 2, drawW, barH);
    }

    // — Playhead (center line) —
    ctx.strokeStyle = this._recording ? '#ff3e00' : '#ff3e00';
    ctx.lineWidth = 2 * dpr;
    ctx.beginPath();
    ctx.moveTo(centerX, 0);
    ctx.lineTo(centerX, h);
    ctx.stroke();

    // Recording dot on playhead
    if (this._recording) {
      ctx.fillStyle = '#ff3e00';
      ctx.beginPath();
      ctx.arc(centerX, 8 * dpr, 4 * dpr, 0, Math.PI * 2);
      ctx.fill();
    }

    // — Time label at playhead —
    const mins = Math.floor(currentTime / 60);
    const secs = (currentTime % 60).toFixed(2);
    ctx.font = `${10 * dpr}px 'SF Mono', monospace`;
    ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
    ctx.textAlign = 'center';
    ctx.fillText(`${mins}:${secs.padStart(5, '0')}`, centerX, h - 14 * dpr);

    // — Zoom indicator —
    ctx.textAlign = 'right';
    ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
    ctx.fillText(`${this._zoom}px/s`, w - 6 * dpr, 12 * dpr);

    // — Ripple mode indicator —
    if (this._rippleActive && this._dragMode) {
      ctx.fillStyle = 'rgba(0, 255, 200, 0.8)';
      ctx.font = `bold ${10 * dpr}px -apple-system, sans-serif`;
      ctx.textAlign = 'left';
      ctx.fillText('⟫ RIPPLE', 6 * dpr, h - 6 * dpr);
    }

    // — Multi-select badge —
    if (this._selectedWordIdxs.size > 1) {
      ctx.fillStyle = 'rgba(255, 180, 80, 0.7)';
      ctx.font = `${9 * dpr}px -apple-system, sans-serif`;
      ctx.textAlign = 'left';
      ctx.fillText(`${this._selectedWordIdxs.size} selected`, 6 * dpr, h - 20 * dpr);
    }
  }

  /** Wheel: deltaX (sideways) = scrub audio, deltaY (up/down) = zoom */
  _onWheel(e) {
    e.preventDefault();
    e.stopPropagation();

    // Any horizontal component = scrub (never zoom when deltaX is present)
    if (e.deltaX !== 0) {
      if (this._media) {
        const dt = e.deltaX / this._zoom;
        const newTime = Math.max(0, Math.min(this._duration || 999, this._media.currentTime + dt));
        this._media.currentTime = newTime;
      }
      return;
    }

    // Pure vertical (deltaX === 0) = zoom
    if (e.deltaY !== 0) {
      const delta = e.deltaY > 0 ? -1 : 1;
      const factor = 1 + delta * 0.06;
      this._zoom = Math.round(Math.min(this._maxZoom, Math.max(this._minZoom, this._zoom * factor)));
    }
  }

  /** Convert clientX to time */
  _clientXToTime(clientX) {
    if (!this._canvas || !this._media) return 0;
    const rect = this._canvas.getBoundingClientRect();
    const cssX = clientX - rect.left;
    const centerX = rect.width / 2;
    return this._media.currentTime + (cssX - centerX) / this._zoom;
  }

  /** Hit-test: find word block and edge at a given clientX, clientY (lane-aware) */
  _hitTest(clientX, clientY) {
    if (!this._canvas || !this._media) return { wordIdx: -1, edge: null };
    const rect = this._canvas.getBoundingClientRect();
    const cssX = clientX - rect.left;
    const cssY = clientY != null ? clientY - rect.top : null;
    const centerX = rect.width / 2;
    const currentTime = this._media.currentTime;
    const handlePx = this._handlePx;
    const canvasH = rect.height;
    const { laneCount, laneH: cssLaneH } = this._getLaneMetrics(canvasH);

    for (let i = this._savedWords.length - 1; i >= 0; i--) {
      const word = this._savedWords[i];
      const x1 = centerX + (word.start - currentTime) * this._zoom;
      const x2 = centerX + (word.end - currentTime) * this._zoom;

      if (cssX >= x1 - handlePx && cssX <= x2 + handlePx) {
        // Lane check: if Y provided, only match words in the correct lane
        if (cssY != null && laneCount > 1) {
          const lane = word.laneIndex || 0;
          const laneTop = lane * cssLaneH;
          const laneBot = laneTop + cssLaneH;
          if (cssY < laneTop || cssY > laneBot) continue;
        }
        // Check edges first (priority)
        if (Math.abs(cssX - x1) <= handlePx) return { wordIdx: i, edge: 'left' };
        if (Math.abs(cssX - x2) <= handlePx) return { wordIdx: i, edge: 'right' };
        if (cssX >= x1 && cssX <= x2) return { wordIdx: i, edge: 'move' };
      }
    }
    return { wordIdx: -1, edge: null };
  }

  /** Pointer down on canvas = start scrubbing or word dragging */
  _onPointerDown(e) {
    if (!this._media) return;
    e.stopPropagation();

    const hit = this._hitTest(e.clientX, e.clientY);

    if (hit.wordIdx >= 0) {
      // Ctrl+Click = Split tool
      if ((e.ctrlKey || e.metaKey) && hit.edge === 'move') {
        this._splitWordAtPlayhead(hit.wordIdx);
        return;
      }

      // Shift+Click = Multi-select toggle
      if (e.shiftKey) {
        if (this._selectedWordIdxs.has(hit.wordIdx)) {
          this._selectedWordIdxs.delete(hit.wordIdx);
        } else {
          this._selectedWordIdxs.add(hit.wordIdx);
        }
        this._selectedWordIdx = hit.wordIdx;
        this.onWordSelect?.(hit.wordIdx);
        return;
      }

      // Normal click — clear multi-select if clicking a non-selected word
      if (!this._selectedWordIdxs.has(hit.wordIdx)) {
        this._selectedWordIdxs.clear();
      }

      // Start dragging a word block (or multi-drag)
      this._selectedWordIdx = hit.wordIdx;
      this._dragMode = hit.edge;
      this._dragStartX = e.clientX;
      const word = this._savedWords[hit.wordIdx];
      this._dragOrigStart = word.start;
      this._dragOrigEnd = word.end;

      if (this._selectedWordIdxs.size > 0 && hit.edge === 'move') {
        for (const idx of this._selectedWordIdxs) {
          const w = this._savedWords[idx];
          if (w) this._dragOrigPositions.set(idx, { start: w.start, end: w.end });
        }
      }

      this._container?.setPointerCapture?.(e.pointerId);

      // Only notify on center click (not edge resize) — edge resize notifies on pointer up
      if (hit.edge === 'move') {
        this.onWordSelect?.(hit.wordIdx);
      }

      // Update cursor
      if (hit.edge === 'left' || hit.edge === 'right') {
        this._container.style.cursor = 'ew-resize';
      } else {
        this._container.style.cursor = 'grabbing';
      }
      return;
    }

    // Scrub start
    this._scrubbing = true;
    this._scrubStartX = e.clientX;
    this._scrubStartTime = this._media.currentTime;
    this._container?.setPointerCapture?.(e.pointerId);
    if (this._container) this._container.style.cursor = 'grabbing';
  }

  _onPointerMove(e) {
    if (!this._media) return;
    e.stopPropagation();

    // Word block dragging
    if (this._dragMode && this._selectedWordIdx >= 0) {
      const word = this._savedWords[this._selectedWordIdx];
      if (!word) return;
      const dx = e.clientX - this._dragStartX;
      const dt = dx / this._zoom;
      const prevWord = this._savedWords[this._selectedWordIdx - 1];
      const nextWord = this._savedWords[this._selectedWordIdx + 1];

      if (this._dragMode === 'left') {
        let newStart = this._dragOrigStart + dt;
        newStart = Math.max(0, newStart);
        newStart = Math.min(newStart, word.end - 0.02);
        if (prevWord) newStart = Math.max(newStart, prevWord.end);
        const snap = this._findSnap(newStart, this._selectedWordIdx);
        if (snap != null) { newStart = snap; this._snapLineTime = snap; }
        word.start = newStart;
      } else if (this._dragMode === 'right') {
        let newEnd = this._dragOrigEnd + dt;
        newEnd = Math.max(newEnd, word.start + 0.02);
        // Without ripple, clamp to next word; with ripple, push next word
        if (!e.altKey) {
          if (nextWord) newEnd = Math.min(newEnd, nextWord.start);
        }
        newEnd = Math.min(newEnd, this._duration || 999);
        // Magnetic snap
        const snap = this._findSnap(newEnd, this._selectedWordIdx);
        if (snap != null) { newEnd = snap; this._snapLineTime = snap; }

        // ── RIPPLE: Alt + right-edge drag → push/pull all following words ──
        if (e.altKey) {
          const edgeDelta = newEnd - this._dragOrigEnd;
          if (!this._rippleOrigPositions.size) {
            for (let i = this._selectedWordIdx + 1; i < this._savedWords.length; i++) {
              const w = this._savedWords[i];
              this._rippleOrigPositions.set(i, { start: w.start, end: w.end });
            }
          }
          for (const [idx, orig] of this._rippleOrigPositions) {
            const w = this._savedWords[idx];
            w.start = Math.max(0, orig.start + edgeDelta);
            w.end = Math.max(w.start + 0.02, orig.end + edgeDelta);
            this._rippleAffected.add(idx);
          }
          this._rippleActive = true;
        }

        word.end = newEnd;
      } else if (this._dragMode === 'move') {
        // Multi-drag: move all selected words together
        if (this._dragOrigPositions.size > 1) {
          for (const [idx, orig] of this._dragOrigPositions) {
            const w = this._savedWords[idx];
            if (!w) continue;
            w.start = orig.start + dt;
            w.end = orig.end + dt;
          }
        } else {
          const dur = this._dragOrigEnd - this._dragOrigStart;
          let newStart = this._dragOrigStart + dt;
          let newEnd = this._dragOrigEnd + dt;
          if (prevWord && newStart < prevWord.end) {
            newStart = prevWord.end;
            newEnd = newStart + dur;
          }
          if (nextWord && newEnd > nextWord.start) {
            newEnd = nextWord.start;
            newStart = newEnd - dur;
          }
          newStart = Math.max(0, newStart);
          newEnd = Math.min(this._duration || 999, newEnd);
          // Magnetic snap for move (snap start edge)
          const snap = this._findSnap(newStart, this._selectedWordIdx);
          if (snap != null) {
            const offset = snap - newStart;
            newStart = snap;
            newEnd += offset;
            this._snapLineTime = snap;
          }
          word.start = newStart;
          word.end = newEnd;
        }
      }

      this._lanesDirty = true;
      this.onWordTimingChange?.(this._selectedWordIdx, word.start, word.end, this._rippleActive);
      return;
    }

    // Scrubbing
    if (this._scrubbing) {
      const dx = e.clientX - this._scrubStartX;
      const dt = -dx / this._zoom;
      const newTime = Math.max(0, Math.min(this._duration || 999, this._scrubStartTime + dt));
      this._media.currentTime = newTime;
      return;
    }

    // Hover cursor + highlight
    const hit = this._hitTest(e.clientX, e.clientY);
    this._hoveredWordIdx = hit.wordIdx;
    if (hit.wordIdx >= 0) {
      this._container.style.cursor = (hit.edge === 'left' || hit.edge === 'right') ? 'ew-resize' : 'grab';
    } else {
      this._container.style.cursor = 'grab';
    }
  }

  _onPointerUp(e) {
    if (this._dragMode) {
      const draggedIdx = this._selectedWordIdx;
      this._dragMode = null;
      this._snapLineTime = null;
      this._dragOrigPositions.clear();
      this._rippleActive = false;
      this._rippleAffected.clear();
      if (this._container) this._container.style.cursor = '';
      if (e?.pointerId) this._container?.releasePointerCapture?.(e.pointerId);
    }
    if (this._scrubbing) {
      this._scrubbing = false;
      if (this._container) this._container.style.cursor = '';
      if (e?.pointerId) this._container?.releasePointerCapture?.(e.pointerId);
    }
  }

  /** Start recording zone (called when Option is pressed) */
  startRecording(time) {
    this._recording = true;
    this._recordStart = time;
  }

  /** Stop recording zone (called when Option is released) */
  stopRecording() {
    this._recording = false;
  }

  /** Add a saved word to render on the waveform */
  addWord(word) {
    const entry = { text: word.text, start: word.start, end: word.end, isCue: word.isCue || false, lineIndex: word.lineIndex, style: word.style };
    if (word._chars) entry._chars = word._chars; // Preserve CJK sub-char timings for glow-travel
    this._savedWords.push(entry);
    this._lanesDirty = true;
  }

  // ─── CONTEXT MENU ───────────────────────────────────────────────────

  /** Show context menu on right-click — either "add element" or "edit element" */
  _showWaveformContextMenu(clientX, clientY) {
    this._dismissContextMenu();
    const hit = this._hitTest(clientX, clientY);
    const time = this._clientXToTime(clientX);
    if (hit.wordIdx >= 0) {
      this._showWordContextMenu(clientX, clientY, hit.wordIdx);
    } else {
      this._showAddContextMenu(clientX, clientY, time);
    }
  }

  /** "Add Element" menu when right-clicking empty space */
  _showAddContextMenu(clientX, clientY, time) {
    const menu = document.createElement('div');
    menu.className = 'chromic-waveform-ctx-menu';
    menu.innerHTML = `
      <div class="ctx-menu-header">Add at ${time.toFixed(2)}s</div>
      <button type="button" data-action="add-word" class="ctx-item ctx-word"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 5v14M5 12h14"/></svg>Add Word</button>
      <button type="button" data-action="add-cue" class="ctx-item ctx-cue"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/></svg>Add Vocal Cue</button>
      <button type="button" data-action="add-adlib" class="ctx-item ctx-adlib"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/></svg>Add Ad-lib</button>
      <button type="button" data-action="add-marker" class="ctx-item ctx-marker"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>Add Marker</button>
    `;
    menu.addEventListener('click', (e) => {
      const btn = e.target.closest('[data-action]');
      if (!btn) return;
      const action = btn.dataset.action;
      this._dismissContextMenu();
      const defaultDur = 0.5;
      if (action === 'add-word') {
        const text = prompt('Word text:');
        if (!text) return;
        this._insertNewWord({ text, start: time, end: time + defaultDur, style: 'normal' });
      } else if (action === 'add-cue') {
        this._insertNewWord({ text: '•••', start: time, end: time + 1.5, isCue: true, style: 'normal' });
      } else if (action === 'add-adlib') {
        const text = prompt('Ad-lib text:');
        if (!text) return;
        this._insertNewWord({ text, start: time, end: time + defaultDur, style: 'ad-lib' });
      } else if (action === 'add-marker') {
        const text = prompt('Marker label:') || '⚑';
        this._insertNewWord({ text, start: time, end: time + 0.3, style: 'spoken', isCue: false });
      }
    });
    this._mountContextMenu(menu, clientX, clientY);
  }

  /** "Edit Element" menu when right-clicking an existing word/cue */
  _showWordContextMenu(clientX, clientY, wordIdx) {
    const word = this._savedWords[wordIdx];
    if (!word) return;
    const menu = document.createElement('div');
    menu.className = 'chromic-waveform-ctx-menu';
    const styles = [
      { value: 'normal', label: 'Normal', cls: 'ctx-word' },
      { value: 'stretch', label: 'Stretch', cls: 'ctx-stretch' },
      { value: 'ad-lib', label: 'Ad-lib', cls: 'ctx-adlib' },
      { value: 'spoken', label: 'Spoken', cls: 'ctx-spoken' },
      { value: 'whisper', label: 'Whisper', cls: 'ctx-whisper' },
    ];
    const currentStyle = word.style || 'normal';
    menu.innerHTML = `
      <div class="ctx-menu-header">"${word.text}" <span class="ctx-time">${word.start.toFixed(2)}s–${word.end.toFixed(2)}s</span></div>
      <div class="ctx-timestamp-row">
        <label class="ctx-ts-label">Start<input type="number" class="ctx-ts-input" data-ts="start" value="${word.start.toFixed(3)}" step="0.01" min="0" /></label>
        <label class="ctx-ts-label">End<input type="number" class="ctx-ts-input" data-ts="end" value="${word.end.toFixed(3)}" step="0.01" min="0" /></label>
      </div>
      <button type="button" data-action="edit-text" class="ctx-item ctx-word"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>Edit Text</button>
      <hr class="ctx-divider" />
      <div class="ctx-menu-label">Style</div>
      ${styles.map(s => `<button type="button" data-action="set-style" data-style="${s.value}" class="ctx-item ${s.cls}${currentStyle === s.value ? ' ctx-active' : ''}"><span class="ctx-dot"></span>${s.label}</button>`).join('')}
      <hr class="ctx-divider" />
      <button type="button" data-action="toggle-cue" class="ctx-item ctx-cue">${word.isCue ? '◉ Unmark as Cue' : '○ Mark as Cue'}</button>
      <button type="button" data-action="split" class="ctx-item ctx-word"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="2" x2="12" y2="22"/><path d="M17 12H7"/></svg>Split at Playhead</button>
      ${word._chars && word._chars.length > 1 ? `<button type="button" data-action="ungroup-cjk" class="ctx-item ctx-word"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 3h5v5"/><path d="M8 3H3v5"/><path d="M3 16v5h5"/><path d="M16 21h5v-5"/></svg>Ungroup CJK (${word._chars.length} chars)</button>` : ''}
      ${this._selectedWordIdxs.size >= 2 ? `<button type="button" data-action="group-phrase" class="ctx-item ctx-word"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M8 3H5a2 2 0 0 0-2 2v3"/><path d="M21 8V5a2 2 0 0 0-2-2h-3"/><path d="M3 16v3a2 2 0 0 0 2 2h3"/><path d="M16 21h3a2 2 0 0 0 2-2v-3"/></svg>Group into Phrase</button>` : ''}
      <hr class="ctx-divider" />
      <button type="button" data-action="delete" class="ctx-item ctx-delete"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>Delete</button>
    `;
    // Timestamp input handlers
    menu.querySelectorAll('.ctx-ts-input').forEach(input => {
      const apply = () => {
        const val = parseFloat(input.value);
        if (!isFinite(val) || val < 0) return;
        const field = input.dataset.ts;
        if (field === 'start' && val < word.end) { word.start = val; }
        else if (field === 'end' && val > word.start) { word.end = val; }
        this._lanesDirty = true;
      };
      input.addEventListener('change', apply);
      input.addEventListener('keydown', (e) => {
        e.stopPropagation();
        if (e.key === 'Enter') { apply(); this._dismissContextMenu(); }
      });
      input.addEventListener('click', (e) => e.stopPropagation());
    });
    menu.addEventListener('click', (e) => {
      const btn = e.target.closest('[data-action]');
      if (!btn) return;
      const action = btn.dataset.action;
      this._dismissContextMenu();
      if (action === 'edit-text') {
        // Use inline input instead of prompt() (not supported in Electron)
        const wordEl = this._savedWords[wordIdx] ? this._canvas?.parentElement : null;
        const currentText = word.text || '';
        // Create a floating inline editor
        const overlay = document.createElement('div');
        overlay.style.cssText = 'position:fixed;top:0;left:0;right:0;bottom:0;z-index:99999;display:flex;align-items:center;justify-content:center;background:rgba(0,0,0,0.4)';
        const input = document.createElement('input');
        input.type = 'text';
        input.value = currentText;
        input.style.cssText = 'font-size:16px;padding:8px 14px;border-radius:8px;border:1px solid rgba(255,255,255,0.3);background:rgba(30,30,30,0.95);color:#fff;outline:none;min-width:200px;text-align:center';
        input.placeholder = 'Edit word text…';
        overlay.appendChild(input);
        document.body.appendChild(overlay);
        input.focus();
        input.select();
        const finish = (save) => {
          if (save) {
            const newText = input.value.trim();
            if (newText && newText !== currentText) {
              word.text = newText;
              this.onWordTextChange?.(wordIdx, newText);
            }
          }
          overlay.remove();
        };
        input.addEventListener('keydown', (ke) => {
          ke.stopPropagation();
          if (ke.key === 'Enter') finish(true);
          if (ke.key === 'Escape') finish(false);
        });
        overlay.addEventListener('click', (oe) => { if (oe.target === overlay) finish(false); });
      } else if (action === 'set-style') {
        word.style = btn.dataset.style;
        this._lanesDirty = true;
        this.onWordStyleChange?.(wordIdx, word.style);
      } else if (action === 'toggle-cue') {
        word.isCue = !word.isCue;
        this._lanesDirty = true;
        this.onWordStyleChange?.(wordIdx, word.style);
      } else if (action === 'split') {
        this._splitWordAtPlayhead(wordIdx);
      } else if (action === 'delete') {
        this._savedWords.splice(wordIdx, 1);
        this._selectedWordIdx = -1;
        this._selectedWordIdxs.clear();
        this._lanesDirty = true;
        this.onWordDelete?.(wordIdx);
      } else if (action === 'ungroup-cjk') {
        // Expand grouped CJK word back into individual character tokens
        const chars = word._chars;
        if (chars && chars.length > 1) {
          const newWords = chars.map(c => ({
            text: c.char, start: c.start, end: c.end,
            isCue: false, style: word.style || 'normal', lineIndex: word.lineIndex,
          }));
          this._savedWords.splice(wordIdx, 1, ...newWords);
          this._selectedWordIdx = -1;
          this._selectedWordIdxs.clear();
          this._lanesDirty = true;
        }
      } else if (action === 'group-phrase') {
        // Merge multi-selected words into a single grouped phrase
        const indices = [...this._selectedWordIdxs].sort((a, b) => a - b);
        if (indices.length >= 2) {
          const wordsToMerge = indices.map(i => this._savedWords[i]).filter(Boolean);
          if (wordsToMerge.length >= 2) {
            const mergedText = wordsToMerge.map(w => w.text).join('');
            const mergedChars = wordsToMerge.map(w => {
              if (w._chars) return w._chars;
              return [{ char: w.text, start: w.start, end: w.end }];
            }).flat();
            const merged = {
              text: mergedText,
              start: wordsToMerge[0].start,
              end: wordsToMerge[wordsToMerge.length - 1].end,
              isCue: false, style: wordsToMerge[0].style || 'normal',
              lineIndex: wordsToMerge[0].lineIndex,
              _chars: mergedChars,
            };
            // Remove old words (reverse order to keep indices valid)
            for (let k = indices.length - 1; k >= 0; k--) {
              this._savedWords.splice(indices[k], 1);
            }
            // Insert merged at first position
            this._savedWords.splice(indices[0], 0, merged);
            this._selectedWordIdx = -1;
            this._selectedWordIdxs.clear();
            this._lanesDirty = true;
          }
        }
      }
    });
    this._mountContextMenu(menu, clientX, clientY);
  }

  /** Insert a new word sorted by start time */
  _insertNewWord(wordData) {
    const word = { text: wordData.text, start: wordData.start, end: wordData.end, isCue: wordData.isCue || false, style: wordData.style || 'normal' };
    // Insert in sorted order
    let idx = this._savedWords.findIndex(w => w.start > word.start);
    if (idx < 0) idx = this._savedWords.length;
    this._savedWords.splice(idx, 0, word);
    this._lanesDirty = true;
    this._selectedWordIdx = idx;
    this.onWordAdd?.(idx, word);
  }

  /** Mount context menu to DOM and position it */
  _mountContextMenu(menu, clientX, clientY) {
    document.body.appendChild(menu);
    this._activeContextMenu = menu;
    // Position near cursor, clamp to viewport
    const pad = 8;
    let left = clientX + pad;
    let top = clientY + pad;
    requestAnimationFrame(() => {
      const r = menu.getBoundingClientRect();
      if (left + r.width > window.innerWidth - pad) left = clientX - r.width - pad;
      if (top + r.height > window.innerHeight - pad) top = clientY - r.height - pad;
      menu.style.left = `${Math.max(pad, left)}px`;
      menu.style.top = `${Math.max(pad, top)}px`;
    });
    // Dismiss on outside click
    const dismiss = (e) => {
      if (!menu.contains(e.target)) { this._dismissContextMenu(); document.removeEventListener('pointerdown', dismiss, true); }
    };
    setTimeout(() => document.addEventListener('pointerdown', dismiss, true), 0);
    // Dismiss on Escape — stop propagation so overlay doesn't close
    const escDismiss = (e) => {
      if (e.key === 'Escape') {
        e.stopImmediatePropagation();
        e.preventDefault();
        this._dismissContextMenu();
        document.removeEventListener('keydown', escDismiss, true);
        document.removeEventListener('pointerdown', dismiss, true);
      }
    };
    document.addEventListener('keydown', escDismiss, true);
    menu._escDismiss = escDismiss;
    // Trap Tab focus within the menu (capture phase on document to intercept before anything else)
    const tabTrap = (e) => {
      if (e.key !== 'Tab') return;
      if (!this._activeContextMenu) { document.removeEventListener('keydown', tabTrap, true); return; }
      const focusable = [...menu.querySelectorAll('button, input, [tabindex]')];
      if (!focusable.length) return;
      e.preventDefault();
      e.stopImmediatePropagation();
      const idx = focusable.indexOf(document.activeElement);
      let next;
      if (e.shiftKey) {
        next = idx <= 0 ? focusable[focusable.length - 1] : focusable[idx - 1];
      } else {
        next = idx >= focusable.length - 1 ? focusable[0] : focusable[idx + 1];
      }
      next.focus();
    };
    document.addEventListener('keydown', tabTrap, true);
    menu._tabTrap = tabTrap;
    // Autofocus start time input
    requestAnimationFrame(() => {
      const firstInput = menu.querySelector('.ctx-ts-input');
      if (firstInput) { firstInput.focus(); firstInput.select(); }
    });
  }

  _dismissContextMenu() {
    if (this._activeContextMenu) {
      if (this._activeContextMenu._escDismiss) {
        document.removeEventListener('keydown', this._activeContextMenu._escDismiss, true);
      }
      if (this._activeContextMenu._tabTrap) {
        document.removeEventListener('keydown', this._activeContextMenu._tabTrap, true);
      }
      this._activeContextMenu.remove();
      this._activeContextMenu = null;
    }
  }


  /** Destroy and clean up */
  destroy() {
    this._destroyed = true;
    if (this._raf) cancelAnimationFrame(this._raf);
    this._resizeObs?.disconnect();
    this._canvas?.remove();
    this._canvas = null;
    this._ctx = null;
    this._peaks = null;
  }
}


// Singleton
export const chromicEditor = new ChromicEditor();

