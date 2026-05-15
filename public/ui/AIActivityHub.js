/**
 * AIActivityHub — Background Task Manager for Chromic Engine
 * Tracks AI tasks (translation, Whisper sync) with progress in a header dropdown.
 */

export class AIActivityHub {
  constructor() {
    /** @type {Map<string, {id:string, type:string, label:string, status:string, progress:number, total:number, trackPath:string, trackIndex:number, completedAt:number}>} */
    this.tasks = new Map();
    this._icon = null;
    this._dropdown = null;
    this._visible = false;
    this._onOutsideClick = this._onOutsideClick.bind(this);
    this._aiBaseLabel = 'Whisper (loading...)';
    this._aiConfigFetchedAt = 0;

    // Auto-refresh gold count when tracks are marked/unmarked
    document.addEventListener('chromic:gold-changed', () => {
      this._goldCountFetchedAt = 0; // force refresh
      this._fetchGoldCount();
    });
  }

  /** Mount the hub icon into a container element */
  mount(container) {
    this._icon = document.createElement('button');
    this._icon.type = 'button';
    this._icon.className = 'ai-hub-icon focusable';
    this._icon.setAttribute('aria-label', 'AI Activity Hub');
    this._icon.title = 'AI Tasks';
    this._icon.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink:0;min-width:18px;min-height:18px"><path d="M12 3l1.91 5.77L20 10.5l-5.09 2.73L12 19l-2.91-5.77L4 10.5l5.09-2.73z"/><path d="M19 2l.5 1.5L21 4l-1.5.5L19 6l-.5-1.5L17 4l1.5-.5z"/></svg>`;
    this._icon.addEventListener('click', () => this.toggle());
    container.appendChild(this._icon);

    this._dropdown = document.createElement('div');
    this._dropdown.className = 'ai-hub-dropdown';
    this._dropdown.setAttribute('aria-hidden', 'true');
    container.appendChild(this._dropdown);

    this._render();
    this._fetchAiBaseLabel();
    // Recover any active backend tasks on mount
    this._syncActiveTasks();
    // Fetch services status for display
    this.fetchServicesStatus();
  }

  toggle() {
    this._visible ? this.hide() : this.show();
  }

  show() {
    if (!this._dropdown) return;
    this._visible = true;
    this._dropdown.classList.add('is-open');
    this._dropdown.setAttribute('aria-hidden', 'false');
    this._render();
    // Always refresh gold count on open (fresh data)
    this._fetchGoldCount();
    // Sync running backend tasks into hub
    this._syncActiveTasks();
    // Poll while open and tasks are running (update step labels in real-time)
    this._startTaskPoll();
    // Refresh services status
    this.fetchServicesStatus().then(() => this._render());
    setTimeout(() => document.addEventListener('click', this._onOutsideClick), 10);
  }

  hide() {
    if (!this._dropdown) return;
    this._visible = false;
    this._dropdown.classList.remove('is-open', 'has-settings');
    this._dropdown.setAttribute('aria-hidden', 'true');
    this._stopTaskPoll();
    document.removeEventListener('click', this._onOutsideClick);
    // Also close settings side panel
    const panel = document.querySelector('.ai-hub-settings-panel');
    if (panel) {
      if (panel._onOutside) document.removeEventListener('mousedown', panel._onOutside);
      panel.remove();
    }
  }

  _onOutsideClick(e) {
    if (!this._dropdown?.contains(e.target) && !this._icon?.contains(e.target)) {
      this.hide();
    }
  }

  /** Add a new task */
  addTask({ id, type, label, total = 1, trackPath = '', trackIndex = -1 }) {
    this.tasks.set(id, { id, type, label, status: 'running', progress: 0, total, trackPath, trackIndex, completedAt: 0 });
    this._updateIcon();
    if (this._visible) this._render();
  }

  /** Update task progress */
  updateTask(id, progress, total, stepLabel, step) {
    const task = this.tasks.get(id);
    if (!task) return;
    task.progress = progress;
    if (total !== undefined) task.total = total;
    if (stepLabel !== undefined) task._stepLabel = stepLabel;
    if (step !== undefined) task._step = step;

    // For lyrics/whisper tasks: map step names to approximate progress %
    if (task.type === 'lyrics' || task.type === 'whisper' || task.type === 'enhance') {
      const stepProgress = {
        'checking': 0.05, 'searching': 0.1, 'genius': 0.15, 'lrclib': 0.15,
        'checking_models': 0.2, 'downloading_model': 0.2, 'model_loaded': 0.25,
        'transcribing': 0.35, 'whisper': 0.4, 'ready': 0.5,
        'aligning': 0.6, 'decensoring': 0.7, 'mapping': 0.75,
        'saving': 0.9, 'done': 1.0, 'complete': 1.0,
      };
      if (step && stepProgress[step] !== undefined) {
        task.progress = stepProgress[step];
        task.total = 1;
      }
    }

    if (this._visible) this._updateTaskDOM(task);
  }

  /** Mark task as complete */
  completeTask(id, { status = 'done' } = {}) {
    const task = this.tasks.get(id);
    if (!task) return;
    task.status = status;
    task.progress = task.total;
    task.completedAt = Date.now();
    if (status === 'done' && task.trackPath) {
      // Keep album/grid badges in sync even when completion happens outside album view controls.
      // Include source for translate tasks to prevent re-triggering translation flow
      const source = task.type === 'translate' ? 'translation' : task.type;
      document.dispatchEvent(new CustomEvent('chromic:track-assets-updated', { detail: { trackPath: task.trackPath, taskId: id, type: task.type, source } }));
      window.musicRuntime?.elements?.grid?.dispatchEvent(new CustomEvent('chromic:refresh-library', { detail: { reason: 'ai-task-complete', taskId: id, type: task.type } }));
    }
    this._updateIcon();
    if (this._visible) this._render();
    // Auto-remove completed tasks after 5 minutes
    setTimeout(() => {
      if (this.tasks.get(id)?.status !== 'running') {
        this.tasks.delete(id);
        this._updateIcon();
        if (this._visible) this._render();
      }
    }, 5 * 60 * 1000);
  }

  /** Mark task as failed */
  failTask(id) {
    this.completeTask(id, { status: 'error' });
  }

  /** Cancel a running task */
  cancelTask(id) {
    const task = this.tasks.get(id);
    if (!task || task.status !== 'running') return;

    // Abort any per-task AbortController (used by album batch operations)
    if (task._abort) {
      task._abort.abort();
      task._abort = null;
    }

    // Abort translation fetch if it's a translate task
    if (task.type === 'translate') {
      const mr = window.musicRuntime;
      if (mr?._translationAbort) {
        mr._translationAbort.abort();
        mr._translationAbort = null;
      }
      // Cancel on server — use task.trackPath as fallback if mr state already cleared
      const cancelPath = task.trackPath || mr?._translationJobTrackPath;
      if (cancelPath) {
        fetch('/api/lyrics/translate-cancel', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ trackPath: cancelPath, targetLang: mr?.settings?.translationLang || 'uk' }),
        }).catch(() => {});
        if (mr) mr._translationJobTrackPath = null;
      }
      // Reset UI state on MusicPlayer
      if (mr) {
        mr.settings.showTranslation = false;
        const btn = mr.getOverlayRoot?.()?.querySelector('#translationToggleBtn');
        if (btn) {
          btn.classList.remove('active');
          btn.setAttribute('aria-pressed', 'false');
        }
        mr._setTranslationBtnState?.(btn, 'idle');
        const container = mr.getOverlayRoot?.()?.querySelector('#musicLyricsStage');
        container?.classList.remove('translations-loading', 'show-translations');
      }
    }

    // Abort whisper polling if it's an enhance task
    if (task.type === 'enhance' || task.type === 'whisper') {
      const mr = window.musicRuntime;
      if (mr?._whisperPollTimer) {
        clearInterval(mr._whisperPollTimer);
        mr._whisperPollTimer = null;
      }
    }

    // Cancel lyrics generation (aligner process) on server
    if (task.type === 'lyrics' || task.type === 'enhance' || task.type === 'whisper') {
      const cancelPath = task.trackPath;
      if (cancelPath) {
        fetch('/api/lyrics/whisper-cancel', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ trackPath: cancelPath }),
        }).catch(() => {});
      }
      // Stop the lyrics poll timer on the music player
      const mr = window.musicRuntime;
      if (mr?._lyricsPollTimer) {
        clearInterval(mr._lyricsPollTimer);
        mr._lyricsPollTimer = null;
      }
    }

    task.status = 'cancelled';
    task.completedAt = Date.now();
    this._updateIcon();
    if (this._visible) this._render();

    setTimeout(() => {
      if (this.tasks.get(id)?.status === 'cancelled') {
        this.tasks.delete(id);
        this._updateIcon();
        if (this._visible) this._render();
      }
    }, 30000);
  }

  /** Remove a single task from history */
  removeTask(id) {
    this.tasks.delete(id);
    this._updateIcon();
    if (this._visible) this._render();
  }

  /** Clear all completed/failed/cancelled tasks */
  clearHistory() {
    for (const [id, t] of this.tasks) {
      if (t.status !== 'running') this.tasks.delete(id);
    }
    this._updateIcon();
    if (this._visible) this._render();
  }

  get hasActiveTasks() {
    for (const t of this.tasks.values()) {
      if (t.status === 'running') return true;
    }
    return false;
  }

  get taskCount() {
    return this.tasks.size;
  }

  _updateIcon() {
    if (!this._icon) return;
    const hasError = [...this.tasks.values()].some(t => t.status === 'error');
    this._icon.classList.toggle('has-active', this.hasActiveTasks);
    this._icon.classList.toggle('has-done', !this.hasActiveTasks && this.taskCount > 0 && !hasError);
    this._icon.classList.toggle('has-error', hasError);
  }

  _render() {
    if (!this._dropdown) return;

    const svgCancel = `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>`;
    const svgDismiss = `<svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>`;

    if (this.tasks.size === 0) {
      const existingTraining = this._dropdown.querySelector('.ai-hub-training-section');
      const trainingStateKey = `${this._trainingJobId || 'none'}_${this._goldCount}`;
      const canReuse = existingTraining && this._lastTrainingStateKey === trainingStateKey;
      this._lastTrainingStateKey = trainingStateKey;

      const emptyHtml = `
        <div class="ai-hub-empty">
          <span class="ai-hub-empty-icon"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg></span>
          <span>No active AI tasks</span>
        </div>`;

      if (canReuse) {
        existingTraining.remove();
        this._dropdown.innerHTML = emptyHtml + this._renderServicesSection();
        this._dropdown.appendChild(existingTraining);
      } else {
        this._dropdown.innerHTML = emptyHtml + this._renderTrainingSection() + this._renderServicesSection();
      }
      this._bindTrainingBtn();
      this._bindServicesSection();
      return;
    }

    const running = [];
    const completed = [];
    for (const t of this.tasks.values()) {
      if (t.status === 'running') running.push(t);
      else completed.push(t);
    }
    // Sort completed by most recent
    completed.sort((a, b) => b.completedAt - a.completedAt);

    let html = '<div class="ai-hub-header">AI Tasks</div><div class="ai-hub-list">';

    const svgGlobe = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>`;
    const svgMic = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="8" y1="13" x2="16" y2="13"/><line x1="8" y1="17" x2="12" y2="17"/></svg>`;
    const svgWaveform = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12h2"/><path d="M6 8v8"/><path d="M10 4v16"/><path d="M14 6v12"/><path d="M18 8v8"/><path d="M22 12h-2"/></svg>`;
    const svgSearch = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>`;
    const svgWand = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 4V2"/><path d="M15 16v-2"/><path d="M8 9h2"/><path d="M20 9h2"/><path d="M17.8 11.8 19 13"/><path d="M15 9h0"/><path d="M17.8 6.2 19 5"/><path d="M3 21l9-9"/><path d="M12.2 6.2 11 5"/></svg>`;
    const lyricsIcon = (step) => {
      switch (step) {
        case 'transcribing': return svgWaveform;
        case 'searching_lyrics': return svgSearch;
        case 'aligning': case 'mapping': case 'decensoring': return svgWand;
        default: return svgMic;
      }
    };
    const svgCheck = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(100,220,140,0.9)" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`;
    const svgX = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(255,100,100,0.9)" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>`;

    for (const t of running) {
      const pct = t.total > 0 ? (t.progress / t.total) : 0;
      const typeIcon = t.type === 'translate' ? svgGlobe : lyricsIcon(t._step);
      const progressLabel = t._stepLabel || `${t.progress}/${t.total} chunks`;
      const canOpen = this._isTaskOpenable(t);
      html += `
        <div class="ai-hub-task is-running" data-task-id="${t.id}">
          <span class="ai-hub-task-icon">${typeIcon}</span>
          <div class="ai-hub-task-info">
            <span class="ai-hub-task-label${canOpen ? ' is-openable' : ''}"${canOpen ? ` data-open-task-id="${t.id}"` : ''}>${this._esc(t.label)}</span>
            <div class="ai-hub-progress">
              <div class="ai-hub-progress-fill" style="transform:scaleX(${pct.toFixed(3)})"></div>
            </div>
            <span class="ai-hub-task-meta">${this._esc(progressLabel)}</span>
          </div>
          <button type="button" class="ai-hub-cancel-btn focusable" data-cancel-task="${t.id}" title="Cancel">${svgCancel}</button>
        </div>`;
    }

    for (const t of completed) {
      const isError = t.status === 'error';
      const isCancelled = t.status === 'cancelled';
      const typeIcon = t.type === 'translate' ? svgGlobe : lyricsIcon(t._step);
      const statusIcon = (isCancelled || isError) ? svgX : svgCheck;
      const statusLabel = isCancelled ? 'Cancelled' : '';
      const canOpen = !isError && !isCancelled && this._isTaskOpenable(t);
      html += `
        <div class="ai-hub-task is-done${isError ? ' is-error' : ''}${isCancelled ? ' is-cancelled' : ''}" data-task-id="${t.id}">
          <span class="ai-hub-task-icon">${typeIcon}</span>
          <div class="ai-hub-task-info">
            <span class="ai-hub-task-label${canOpen ? ' is-openable' : ''}"${canOpen ? ` data-open-task-id="${t.id}"` : ''}>${statusIcon} ${this._esc(t.label)}${statusLabel ? ` <span class="ai-hub-task-status">${statusLabel}</span>` : ''}</span>
          </div>
          ${canOpen
            ? `<button type="button" class="ai-hub-open-btn focusable" data-task-id="${t.id}">Open</button>`
            : `<button type="button" class="ai-hub-dismiss-btn focusable" data-dismiss-task="${t.id}" title="Remove">${svgDismiss}</button>`}
        </div>`;
    }

    html += '</div>';

    if (completed.length > 0) {
      html += `<div class="ai-hub-footer"><button type="button" class="ai-hub-clear-btn focusable">Clear History</button></div>`;
    }

    // Preserve training section to avoid animation reset/flicker
    const existingTraining = this._dropdown.querySelector('.ai-hub-training-section');
    const trainingStateKey = `${this._trainingJobId || 'none'}_${this._goldCount}`;
    const canReuse = existingTraining && this._lastTrainingStateKey === trainingStateKey;

    if (!canReuse) {
      html += this._renderTrainingSection();
    }

    // Add services status section
    html += this._renderServicesSection();

    this._lastTrainingStateKey = trainingStateKey;

    if (canReuse) {
      existingTraining.remove();
      this._dropdown.innerHTML = html;
      this._dropdown.appendChild(existingTraining);
    } else {
      this._dropdown.innerHTML = html;
    }

    // Bind cancel buttons
    this._dropdown.querySelectorAll('.ai-hub-cancel-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        this.cancelTask(btn.dataset.cancelTask);
      });
    });

    // Bind dismiss buttons
    this._dropdown.querySelectorAll('.ai-hub-dismiss-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        this.removeTask(btn.dataset.dismissTask);
      });
    });

    // Bind clear history
    this._dropdown.querySelector('.ai-hub-clear-btn')?.addEventListener('click', (e) => {
      e.stopPropagation();
      this.clearHistory();
    });

    // Bind "Open" buttons
    this._dropdown.querySelectorAll('.ai-hub-open-btn').forEach(btn => {
      btn.addEventListener('click', async (e) => {
        e.stopPropagation();
        const task = this.tasks.get(btn.dataset.taskId);
        if (task) {
          console.info('[AIHub] Open button click', { taskId: task.id, status: task.status, trackPath: task.trackPath, trackIndex: task.trackIndex });
          await this._openTrack(task);
          this.hide();
        }
      });
    });

    // Bind click on task labels to open related track + overlay
    this._dropdown.querySelectorAll('.ai-hub-task-label[data-open-task-id]').forEach(label => {
      label.style.cursor = 'pointer';
      label.addEventListener('click', async (e) => {
        e.stopPropagation();
        const task = this.tasks.get(label.dataset.openTaskId);
        if (!task || !this._isTaskOpenable(task)) return;
        console.info('[AIHub] Label click', { taskId: task.id, status: task.status, trackPath: task.trackPath, trackIndex: task.trackIndex });
        await this._openTrack(task);
        this.hide();
      });
    });

    // Make entire done-task row clickable
    this._dropdown.querySelectorAll('.ai-hub-task.is-done:not(.is-error):not(.is-cancelled)').forEach(row => {
      const task = this.tasks.get(row.dataset.taskId);
      if (!task || !this._isTaskOpenable(task)) return;
      row.style.cursor = 'pointer';
      row.addEventListener('click', async (e) => {
        if (e.target.closest('.ai-hub-open-btn, .ai-hub-dismiss-btn')) return;
        const task = this.tasks.get(row.dataset.taskId);
        if (task) {
          console.info('[AIHub] Done row click', { taskId: task.id, status: task.status, trackPath: task.trackPath, trackIndex: task.trackIndex });
          await this._openTrack(task);
          this.hide();
        }
      });
    });

    // Bind training button
    this._bindTrainingBtn();

    // Bind services section
    this._bindServicesSection();

    // Auto-scroll training log to bottom
    const logEl = this._dropdown?.querySelector('[data-training-log]');
    if (logEl) logEl.scrollTop = logEl.scrollHeight;

    // Fetch gold count when dropdown is rendered (throttled to avoid flicker)
    if (!this._goldCountFetchedAt || Date.now() - this._goldCountFetchedAt > 10000) {
      this._fetchGoldCount();
    }
    // Keep base model label fresh (throttled)
    if (!this._aiConfigFetchedAt || Date.now() - this._aiConfigFetchedAt > 10000) {
      this._fetchAiBaseLabel();
    }
  }

  async _openTrack(task) {
    console.info('[AIHub] _openTrack:start', { taskId: task?.id, trackPath: task?.trackPath, trackIndex: task?.trackIndex, type: task?.type, status: task?.status });
    // Ensure music tab/runtime is active before resolving track and opening overlay.
    document.querySelector('[data-section="music"]')?.click?.();
    for (let i = 0; i < 20; i += 1) {
      if (window.musicRuntime?.items?.length) break;
      await new Promise((r) => setTimeout(r, 80));
    }

    const mr = window.musicRuntime;
    if (!mr) {
      console.warn('[AIHub] _openTrack: musicRuntime missing');
      return;
    }

    const normalizeTrackPath = (value) => {
      const raw = String(value || '').split('?')[0].trim();
      if (!raw) return '';
      let decoded = raw;
      try { decoded = decodeURIComponent(raw); } catch {}
      decoded = decoded.replace(/^\/media\//, '');
      if (decoded && !decoded.startsWith('music/')) decoded = `music/${decoded}`;
      return decoded;
    };

    const taskPath = normalizeTrackPath(task.trackPath);
    let trackIndex = Number.isInteger(task.trackIndex) ? task.trackIndex : -1;
    if (taskPath && Array.isArray(mr.items)) {
      const pathMatch = mr.items.findIndex((item) => {
        const candidates = [item?.path, item?.name, item?.id, item?.url];
        return candidates.some((candidate) => {
          const normalized = normalizeTrackPath(candidate);
          return normalized && (normalized === taskPath || normalized.endsWith(taskPath) || taskPath.endsWith(normalized));
        });
      });
      if (pathMatch >= 0) trackIndex = pathMatch;
    }

    console.info('[AIHub] _openTrack:resolved', { taskPath, resolvedTrackIndex: trackIndex, totalItems: mr.items?.length || 0 });

    if (trackIndex < 0 || trackIndex >= (mr.items?.length || 0)) {
      console.warn('[AIHub] _openTrack: track not resolved, opening overlay only');
      mr.openOverlay?.('player');
      return;
    }

    // Play the track with expand:true which auto-opens overlay
    await mr.playTrack(trackIndex, { autoplay: true, expand: true });

    // Wait for active state then ensure overlay is open
    for (let i = 0; i < 30; i++) {
      if (mr.active && mr.currentTrackIndex >= 0) break;
      await new Promise(r => setTimeout(r, 100));
    }

    // Force overlay open if not already (some navigation paths render track but keep overlay closed).
    if (!document.body.classList.contains('music-overlay-open') || !mr._overlayIsOpen) {
      const sourceRect = mr.elements?.globalPlayerArt?.getBoundingClientRect?.() || null;
      mr.openOverlay?.('player');
      mr.runAlbumFlipTransition?.(sourceRect);
      await new Promise((r) => setTimeout(r, 60));
      if (!document.body.classList.contains('music-overlay-open') || !mr._overlayIsOpen) {
        mr.openOverlay?.('player');
        mr.runAlbumFlipTransition?.(sourceRect);
      }
    }

    console.info('[AIHub] _openTrack:done', { active: !!mr.active, currentTrackIndex: mr.currentTrackIndex, overlayOpen: !!mr._overlayIsOpen, bodyOpen: document.body.classList.contains('music-overlay-open') });

    // Enable text toggle for all completed tasks (text is always there)
    setTimeout(() => {
      if (!mr.settings?.textEnabled) {
        mr.settings.textEnabled = true;
        mr.applyPageFlags?.();
        const tb = mr.getOverlayRoot?.()?.querySelector('#textToggleBtn');
        if (tb) {
          tb.classList.remove('text-is-hidden');
          tb.setAttribute('aria-pressed', 'true');
          tb.title = 'Hide text & lyrics';
        }
      }

      // Set translation toggle if this was a translation task
      if (task.type === 'translate' && !mr.settings?.showTranslation) {
        mr._toggleTranslation?.();
      }

      mr.persistPlayerState?.({ immediate: true });
    }, 500);
  }

  _isTaskOpenable(task) {
    return Boolean(task && (task.trackPath || Number.isInteger(task.trackIndex) && task.trackIndex >= 0));
  }

  _renderTrainingSection() {
    const hasEquiv = Number.isFinite(this._goldEquivalentCount);
    const hasChunkStats = Number.isFinite(this._goldValidChunks) && Number.isFinite(this._goldTotalChunks) && this._goldTotalChunks > 0;
    const goldLabel = this._goldCount != null
      ? (hasEquiv
        ? `${this._goldCount} tracks • ${this._goldEquivalentCount.toFixed(2)} gold eq${hasChunkStats ? ` • ${this._goldValidChunks}/${this._goldTotalChunks} chunks` : ''}`
        : `${this._goldCount} Gold Tracks Ready`)
      : 'Loading…';
    const svgStar = `<svg width="14" height="14" viewBox="0 0 24 24" fill="#FFD700" stroke="#FFD700" stroke-width="1.5"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`;
    const svgBrain = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2a6 6 0 0 1 6 6c0 2.5-1.5 4.5-3 5.5V16a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1v-2.5C7.5 12.5 6 10.5 6 8a6 6 0 0 1 6-6z"/><line x1="9" y1="20" x2="15" y2="20"/><line x1="10" y1="23" x2="14" y2="23"/></svg>`;

    return `
      <div class="ai-hub-training-section">
        <div class="ai-hub-training-header">${svgBrain} Gold Tracks</div>
        <div class="ai-hub-training-stats">
          <span class="ai-hub-gold-count">${svgStar} <span data-gold-count>${goldLabel}</span></span>
          <span class="ai-hub-training-base" data-ai-base-model>Base: ${this._esc(this._aiBaseLabel)}</span>
        </div>
      </div>`;
  }

  _bindTrainingBtn() {
    // No-op: training removed
  }

  async _fetchGoldCount() {
    this._goldCountFetchedAt = Date.now();
    try {
      const res = await fetch('/api/tracks/gold-count');
      const data = await res.json();
      this._goldCount = data.count || 0;
      this._goldEquivalentCount = Number.isFinite(data.equivalentCount) ? Number(data.equivalentCount) : null;
      this._goldValidChunks = Number.isFinite(data.validChunks) ? Number(data.validChunks) : null;
      this._goldTotalChunks = Number.isFinite(data.totalChunks) ? Number(data.totalChunks) : null;
      const el = this._dropdown?.querySelector('[data-gold-count]');
      if (el) {
        if (this._goldEquivalentCount != null) {
          const chunks = (this._goldValidChunks != null && this._goldTotalChunks != null && this._goldTotalChunks > 0)
            ? ` • ${this._goldValidChunks}/${this._goldTotalChunks} chunks`
            : '';
          el.innerHTML = `${this._goldCount} tracks • ${this._goldEquivalentCount.toFixed(2)} gold eq${chunks}`;
        } else {
          el.innerHTML = `${this._goldCount} Gold Tracks Ready`;
        }
      }
    } catch {}
  }

  _formatAiBaseLabel(cfg) {
    const engine = cfg?.whisperEngine;
    const model = cfg?.whisperModel;
    if (engine && model) return `Whisper ${engine}/${model}`;
    if (model) return `Whisper ${model}`;
    return 'Whisper (default)';
  }

  async _fetchAiBaseLabel() {
    this._aiConfigFetchedAt = Date.now();
    try {
      const res = await fetch('/api/settings/ai');
      if (!res.ok) return;
      const data = await res.json();
      this._aiBaseLabel = this._formatAiBaseLabel(data?.config || data || {});
      const el = this._dropdown?.querySelector('[data-ai-base-model]');
      if (el) el.textContent = `Base: ${this._aiBaseLabel}`;
    } catch {}
  }

  _esc(s) {
    return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  _startTaskPoll() {
    this._stopTaskPoll();
    this._taskPollTimer = setInterval(async () => {
      const hasRunning = [...this.tasks.values()].some(t => t.status === 'running');
      if (!hasRunning) { this._stopTaskPoll(); return; }
      await this._syncActiveTasks();
      if (this._visible) this._render();
    }, 3000);
  }

  _stopTaskPoll() {
    if (this._taskPollTimer) { clearInterval(this._taskPollTimer); this._taskPollTimer = null; }
  }

  /** Fetch active backend tasks and reconcile with local hub state */
  async _syncActiveTasks() {
    try {
      const res = await fetch('/api/ai/active-tasks');
      if (!res.ok) return;
      const { tasks } = await res.json();
      if (!Array.isArray(tasks)) return;

      for (const t of tasks) {
        const existing = this.tasks.get(t.id);
        if (existing) {
          // Update progress/step
          if (t.progress !== undefined) existing.progress = t.progress;
          if (t.total !== undefined) existing.total = t.total;
          if (t.stepLabel) existing._stepLabel = t.stepLabel;
          if (t.step) existing._step = t.step;
          if (t.status === 'done' && existing.status === 'running') {
            this.completeTask(t.id, { status: 'done' });
          } else if (t.status === 'error' && existing.status === 'running') {
            this.failTask(t.id);
          }
        } else if (t.status === 'running') {
          // Skip if we already have a local task for the same trackPath (avoids duplicates)
          if (t.trackPath) {
            let dupTask = null;
            for (const [, ex] of this.tasks) {
              if (ex.trackPath === t.trackPath && ex.status === 'running') { dupTask = ex; break; }
            }
            if (dupTask) {
              // Update existing task's step/label from server
              if (t.stepLabel) dupTask._stepLabel = t.stepLabel;
              if (t.step) dupTask._step = t.step;
              continue;
            }
          }
          // Add newly discovered running task
          this.addTask({
            id: t.id,
            type: t.type,
            label: t.label,
            total: t.total || 1,
            trackPath: t.trackPath || '',
          });
          const task = this.tasks.get(t.id);
          if (task) {
            task.progress = t.progress || 0;
            task._stepLabel = t.stepLabel || '';
            task._step = t.step || '';
          }

          // For training tasks, reconnect to SSE stream
          if (t.type === 'training') {
            this._trainingJobId = t.id;
            this._trainingPhase = t.phase || 'unknown';
            this._trainingLogs = Array.isArray(t.logs) ? [...t.logs] : [];
            this._reconnectTrainingStream(t.id);
          }
        }
      }

      this._updateIcon();
      if (this._visible) this._render();
    } catch (e) {
      // silently ignore
    }
  }

  /** Reconnect to a running training job's SSE stream */
  _reconnectTrainingStream(jobId) {
    const evtSource = new EventSource(`/api/ai/training-stream/${jobId}`);

    evtSource.onmessage = (e) => {
      try {
        const msg = JSON.parse(e.data);
        if (msg.type === 'done') {
          evtSource.close();
          this._trainingJobId = null;
          this.completeTask(jobId, { status: msg.exitCode === 0 ? 'done' : 'error' });
          return;
        }
        // Cache log for re-renders
        if (!this._trainingLogs) this._trainingLogs = [];
        this._trainingLogs.push(msg);
        if (this._trainingLogs.length > 200) this._trainingLogs.shift();

        // Detect phase changes
        if (msg.text?.includes('Phase 2')) this._trainingPhase = 'training';
        if (msg.text?.includes('Phase 1')) this._trainingPhase = 'dataset';

        // Update phase label in DOM
        const phaseEl = this._dropdown?.querySelector('.ai-hub-training-phase');
        if (phaseEl) {
          const lastSystem = this._trainingLogs.filter(l => l.type === 'system').pop();
          if (lastSystem) {
            phaseEl.innerHTML = this._esc(lastSystem.text);
          }
        }

        // Update training log in dropdown
        const logEl = this._dropdown?.querySelector('[data-training-log]');
        if (logEl) {
          const line = document.createElement('div');
          line.className = `ai-hub-log-line ${msg.type}`;
          line.textContent = msg.text;
          logEl.appendChild(line);
          logEl.scrollTop = logEl.scrollHeight;
        }
        // Parse epoch progress
        const epochMatch = msg.text?.match(/Epoch\s+(\d+)\/(\d+)/i);
        if (epochMatch) {
          this.updateTask(jobId, parseInt(epochMatch[1]), parseInt(epochMatch[2]), msg.text);
        }
        // Parse dataset track progress
        const trackMatch = msg.text?.match(/\[(\d+)\/(\d+)\]\s*Processing/);
        if (trackMatch) {
          this.updateTask(jobId, parseInt(trackMatch[1]), parseInt(trackMatch[2]), msg.text);
        }
        const chunkMatch = msg.text?.match(/Total chunks:\s*(\d+)/);
        if (chunkMatch) {
          this.updateTask(jobId, parseInt(chunkMatch[1]), parseInt(chunkMatch[1]), `${chunkMatch[1]} chunks ready`);
        }
      } catch {}
    };

    evtSource.onerror = () => {
      evtSource.close();
      this._trainingJobId = null;
    };
  }

  /** Surgically update a running task's DOM without full re-render */
  _updateTaskDOM(task) {
    if (!this._dropdown) return;
    const row = this._dropdown.querySelector(`.ai-hub-task[data-task-id="${CSS.escape(task.id)}"]`);
    if (!row) { this._render(); return; }
    // Update progress bar
    const fill = row.querySelector('.ai-hub-progress-fill');
    if (fill) {
      const pct = task.total > 0 ? (task.progress / task.total) : 0;
      fill.style.transform = `scaleX(${pct.toFixed(3)})`;
    }
    // Update step label
    const meta = row.querySelector('.ai-hub-task-meta');
    if (meta) {
      const progressLabel = task._stepLabel || `${task.progress}/${task.total} chunks`;
      meta.textContent = progressLabel;
    }
  }

  // ─── Services Status ─────────────────────────────────────────────────────────

  /** Fetch and cache services status (aligner, python, AI) */
  async fetchServicesStatus() {
    try {
      const res = await fetch('/api/services/status');
      if (!res.ok) return null;
      const data = await res.json();
      this._servicesStatus = data;
      this._servicesStatusFetchedAt = Date.now();
      // Emit global event for other components to react
      document.dispatchEvent(new CustomEvent('chromic:services-status', { detail: data }));
      return data;
    } catch (e) {
      console.warn('[AIHub] Failed to fetch services status:', e);
      return null;
    }
  }

  /** Get cached services status */
  get servicesStatus() {
    return this._servicesStatus || null;
  }

  /** Check if aligner is ready */
  get alignerReady() {
    return this._servicesStatus?.aligner?.ready ?? false;
  }

  /** Check if Python setup is needed */
  get needsPythonSetup() {
    const s = this._servicesStatus;
    if (!s) return false;
    return !s.python?.ready || !s.aligner?.ready;
  }

  /** Render services status section */
  _renderServicesSection() {
    const s = this._servicesStatus;
    if (!s) return '';

    const pythonReady = s.python?.ready;
    const alignerReady = s.aligner?.ready;
    const aiConfigured = s.ai?.configured;

    const svgCheck = `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="rgba(100,220,140,0.9)" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`;
    const svgX = `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="rgba(255,180,100,0.9)" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>`;
    const svgPython = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>`;
    const svgSettings = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>`;

    const showSetup = !pythonReady || !alignerReady;

    return `
      <div class="ai-hub-services-section" style="border-top:1px solid rgba(255,255,255,0.06);padding:10px 14px;font-size:11px;">
        <div style="display:flex;align-items:center;gap:6px;margin-bottom:8px;color:rgba(255,255,255,0.5);font-weight:600;text-transform:uppercase;letter-spacing:0.5px;">
          ${svgPython} Services
        </div>
        <div style="display:flex;flex-direction:column;gap:4px;color:rgba(255,255,255,0.7);">
          <div style="display:flex;align-items:center;gap:6px;">
            ${pythonReady ? svgCheck : svgX}
            <span>Python ${pythonReady ? '✓' : '(needs setup)'}</span>
          </div>
          <div style="display:flex;align-items:center;gap:6px;">
            ${alignerReady ? svgCheck : svgX}
            <span>Lyrics Engine ${alignerReady ? '✓' : '(needs setup)'}</span>
          </div>
          <div style="display:flex;align-items:center;gap:6px;">
            ${aiConfigured ? svgCheck : svgX}
            <span>AI ${aiConfigured ? '(configured)' : '(no API key)'}</span>
          </div>
        </div>
        <div style="display:flex;gap:8px;margin-top:10px;">
          ${showSetup ? `
            <button type="button" class="ai-hub-setup-python-btn" style="
              flex:1;
              padding:8px 12px;
              border-radius:6px;
              border:1px solid rgba(100,180,255,0.3);
              background:linear-gradient(135deg, rgba(100,180,255,0.15), rgba(150,100,255,0.15));
              color:rgba(100,200,255,0.9);
              font-size:11px;
              font-weight:600;
              cursor:pointer;
              transition:all 0.15s;
            ">
              ${svgPython} Setup Python
            </button>
          ` : ''}
          <button type="button" class="ai-hub-open-settings-btn" style="
            flex:1;
            padding:8px 12px;
            border-radius:6px;
            border:1px solid rgba(255,255,255,0.15);
            background:rgba(255,255,255,0.06);
            color:rgba(255,255,255,0.8);
            font-size:11px;
            font-weight:600;
            cursor:pointer;
            transition:all 0.15s;
            display:flex;
            align-items:center;
            justify-content:center;
            gap:5px;
          ">
            ${svgSettings} AI Settings
          </button>
        </div>
      </div>`;
  }

  /** Bind setup button click handler */
  _bindServicesSection() {
    const btn = this._dropdown?.querySelector('.ai-hub-setup-python-btn');
    if (btn) {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        this.hide();
        // Trigger Python setup via music runtime or direct modal
        this._triggerPythonSetup();
      });
    }
    // AI Settings button — toggle inline settings panel in dropdown
    const settingsBtn = this._dropdown?.querySelector('.ai-hub-open-settings-btn');
    if (settingsBtn) {
      settingsBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        this._toggleInlineAiSettings();
      });
    }
  }

  /** Toggle inline AI settings panel inside the dropdown (music-settings-group style) */
  _toggleInlineAiSettings() {
    // Toggle side panel instead of inline
    const existing = document.querySelector('.ai-hub-settings-panel');
    if (existing) {
      existing.remove();
      this._dropdown?.classList.remove('has-settings');
      return;
    }
    this._renderSettingsSidePanel();
  }

  /** Render AI settings as a side panel anchored to the dropdown */
  async _renderSettingsSidePanel() {
    if (!this._dropdown) return;

    // Remove any existing panel
    document.querySelector('.ai-hub-settings-panel')?.remove();

    const panel = document.createElement('div');
    panel.className = 'ai-hub-settings-panel';
    panel.innerHTML = `
      <div class="ai-hub-settings-panel-header">
        <span>AI Settings</span>
        <button type="button" class="ai-hub-settings-close" aria-label="Close">✕</button>
      </div>
      <div class="ai-hub-settings-panel-body">
        <p style="margin:0 0 10px;font-size:11px;color:rgba(255,255,255,0.5);">Configure AI provider for lyrics sync, transcription, and translation.</p>
        <form class="ai-settings-form ai-hub-settings-form" style="display:flex;flex-direction:column;gap:8px;">
          <label class="ai-field"><span>AI Provider</span>
            <select name="aiProvider">
              <option value="openai">OpenAI</option>
              <option value="groq">Groq</option>
              <option value="ollama">Ollama (Local)</option>
              <option value="custom">Custom Endpoint</option>
            </select>
          </label>
          <label class="ai-field"><span>API Key</span><input type="password" name="openaiApiKey" placeholder="sk-..." autocomplete="off" /></label>
          <label class="ai-field"><span>Base URL</span><input type="text" name="openaiBaseUrl" placeholder="https://api.openai.com/v1" /></label>
          <label class="ai-field"><span>Model</span><input type="text" name="openaiModel" placeholder="gpt-4o-mini" /></label>
          <label class="ai-field ai-ollama-model-field" style="display:none"><span>Ollama Model</span>
            <select name="ollamaModel"><option value="">Auto-detect</option></select>
          </label>
          <label class="ai-field"><span>De-censor Lyrics</span>
            <select name="decensorLyrics">
              <option value="true">On — replace f***, s**t with real words</option>
              <option value="false">Off — keep censored text as-is</option>
            </select>
          </label>
          <label class="ai-field"><span>Translation Language</span>
            <select name="translationLang">
              <option value="uk">Ukrainian</option>
              <option value="en">English</option>
              <option value="ar">Arabic</option>
              <option value="bg">Bulgarian</option>
              <option value="cs">Czech</option>
              <option value="da">Danish</option>
              <option value="de">German</option>
              <option value="el">Greek</option>
              <option value="es">Spanish</option>
              <option value="fi">Finnish</option>
              <option value="fr">French</option>
              <option value="he">Hebrew</option>
              <option value="hi">Hindi</option>
              <option value="hr">Croatian</option>
              <option value="hu">Hungarian</option>
              <option value="id">Indonesian</option>
              <option value="it">Italian</option>
              <option value="ja">Japanese</option>
              <option value="ko">Korean</option>
              <option value="lt">Lithuanian</option>
              <option value="lv">Latvian</option>
              <option value="nl">Dutch</option>
              <option value="no">Norwegian</option>
              <option value="pl">Polish</option>
              <option value="pt">Portuguese</option>
              <option value="ro">Romanian</option>
              <option value="ru">Russian</option>
              <option value="sk">Slovak</option>
              <option value="sl">Slovenian</option>
              <option value="sr">Serbian</option>
              <option value="sv">Swedish</option>
              <option value="th">Thai</option>
              <option value="tr">Turkish</option>
              <option value="vi">Vietnamese</option>
              <option value="zh">Chinese (Simplified)</option>
              <option value="zh-Hant">Chinese (Traditional)</option>
            </select>
          </label>
          <label class="ai-field"><span>Whisper Engine</span>
            <select name="whisperEngine">
              <option value="faster">faster-whisper (fast)</option>
              <option value="whisperx">WhisperX (best quality)</option>
              <option value="mlx">MLX (Apple Silicon)</option>
            </select>
            <small style="font-size:10px;color:rgba(255,255,255,0.35);margin-top:2px;">Cloud LoRA sends audio to Modal A10G GPU for best quality alignment</small>
          </label>
          <label class="ai-field"><span>Whisper Model</span>
            <select name="whisperModel">
              <option value="tiny">tiny</option>
              <option value="base">base</option>
              <option value="small">small</option>
              <option value="medium">medium</option>
              <option value="large">large</option>
            </select>
          </label>
          <label class="ai-field"><span>Lyrics Provider</span>
            <select name="lyricsProvider">
              <option value="lrclib">LRCLIB (free, instant)</option>
              <option value="whisper">Local Whisper</option>
              <option value="openai">OpenAI Whisper API</option>
            </select>
          </label>
          <div style="display:flex;flex-wrap:wrap;gap:6px;margin-top:6px;">
            <button type="submit" style="
              flex:1;min-width:120px;padding:7px 12px;border-radius:6px;border:1px solid rgba(100,220,140,0.3);
              background:linear-gradient(135deg,rgba(100,220,140,0.15),rgba(100,180,255,0.15));
              color:rgba(100,220,140,0.9);font-size:11px;font-weight:600;cursor:pointer;
            ">Save Settings</button>
            <button type="button" class="ai-hub-setup-python-btn" style="
              padding:7px 12px;border-radius:6px;border:1px solid rgba(180,140,255,0.3);
              background:rgba(180,140,255,0.1);color:rgba(180,140,255,0.9);
              font-size:11px;font-weight:600;cursor:pointer;
            ">Setup Python</button>
            <button type="button" class="ai-hub-mood-btn" style="
              padding:7px 12px;border-radius:6px;border:1px solid rgba(255,180,80,0.3);
              background:rgba(255,180,80,0.1);color:rgba(255,180,80,0.9);
              font-size:11px;font-weight:600;cursor:pointer;
            ">🎨 Mood Colors</button>
          </div>
          <div class="ai-hub-settings-status" style="text-align:center;font-size:11px;min-height:16px;"></div>
        </form>
      </div>
    `;

    // Position: append to body, positioned near the dropdown
    document.body.appendChild(panel);

    // Prevent scroll events from leaking to parent (album scroll)
    const panelBody = panel.querySelector('.ai-hub-settings-panel-body');
    if (panelBody) {
      panelBody.addEventListener('wheel', (e) => { e.stopPropagation(); }, { passive: false });
      panelBody.addEventListener('touchmove', (e) => { e.stopPropagation(); }, { passive: false });
    }

    // Close button
    panel.querySelector('.ai-hub-settings-close').addEventListener('click', () => {
      panel.remove();
      this._dropdown?.classList.remove('has-settings');
    });

    // Prevent all click/mousedown events inside panel from propagating
    panel.addEventListener('mousedown', (e) => e.stopPropagation());
    panel.addEventListener('click', (e) => e.stopPropagation());

    // Close on outside click (delayed to avoid triggering on the same click)
    setTimeout(() => {
      const onOutside = (e) => {
        // Ignore any form-related elements
        const tag = e.target.tagName;
        if (tag === 'OPTION' || tag === 'SELECT' || tag === 'INPUT' || tag === 'LABEL' || tag === 'BUTTON') return;
        // Ignore if click is inside panel, dropdown, or icon
        if (panel.contains(e.target) || this._dropdown?.contains(e.target) || this._icon?.contains(e.target)) return;
        panel.remove();
        this._dropdown?.classList.remove('has-settings');
        document.removeEventListener('mousedown', onOutside);
      };
      document.addEventListener('mousedown', onOutside);
      panel._onOutside = onOutside;
    }, 300);

    // Load current settings
    try {
      const res = await fetch('/api/settings/ai');
      const config = await res.json();
      const cfg = config?.config || config || {};
      const form = panel.querySelector('form');
      for (const [key, val] of Object.entries(cfg)) {
        const input = form.querySelector(`[name="${key}"]`);
        if (input) {
          if (input.type === 'checkbox') input.checked = !!val;
          else input.value = val ?? '';
        }
      }
    } catch {}

    // Save handler
    panel.querySelector('form').addEventListener('submit', async (e) => {
      e.preventDefault();
      e.stopPropagation();
      const form = e.target;
      const data = {};
      form.querySelectorAll('input, select').forEach(el => {
        if (el.name) data[el.name] = el.type === 'checkbox' ? el.checked : el.value;
      });
      const status = panel.querySelector('.ai-hub-settings-status');
      try {
        await fetch('/api/settings/ai', {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        });
        if (status) status.textContent = '✓ Saved!';
        this._aiConfigFetchedAt = 0;
        this._fetchAiBaseLabel();
        setTimeout(() => { if (status) status.textContent = ''; }, 2000);
      } catch (err) {
        if (status) status.textContent = '✗ Error saving';
      }
    });

    // Setup Python button
    panel.querySelector('.ai-hub-setup-python-btn')?.addEventListener('click', () => {
      this._triggerPythonSetup();
    });

    // Mood Colors button
    panel.querySelector('.ai-hub-mood-btn')?.addEventListener('click', async () => {
      const status = panel.querySelector('.ai-hub-settings-status');
      if (status) status.textContent = '🎨 Extracting mood colors…';
      try {
        await fetch('/api/ai/extract-mood-colors', { method: 'POST' });
        if (status) status.textContent = '✓ Mood colors extracted';
        setTimeout(() => { if (status) status.textContent = ''; }, 3000);
      } catch { if (status) status.textContent = '✗ Error'; }
    });

    // Show/hide Ollama model field based on provider
    const providerSelect = panel.querySelector('[name="aiProvider"]');
    const ollamaField = panel.querySelector('.ai-ollama-model-field');
    const updateOllamaVisibility = () => {
      const isOllama = providerSelect?.value === 'ollama';
      if (ollamaField) ollamaField.style.display = isOllama ? '' : 'none';
      if (isOllama) this._fetchOllamaModelsForPanel(panel);
    };
    providerSelect?.addEventListener('change', updateOllamaVisibility);
    // Initial check after settings load
    setTimeout(updateOllamaVisibility, 100);
  }

  /** Fetch Ollama models for the settings side panel */
  async _fetchOllamaModelsForPanel(panel, _retry = 0) {
    const select = panel?.querySelector('[name="ollamaModel"]');
    if (!select) return;
    try {
      const res = await fetch('/api/ollama/models');
      const data = await res.json();
      if (!data.running) {
        if (_retry < 1) {
          setTimeout(() => this._fetchOllamaModelsForPanel(panel, _retry + 1), 2000);
          return;
        }
        select.innerHTML = '<option value="">⚠️ Ollama not running</option>';
        return;
      }
      // Get current saved value
      const currentModel = select.value || '';
      select.innerHTML = '<option value="">Auto-detect (first available)</option>';
      for (const m of data.models) {
        const opt = document.createElement('option');
        opt.value = m.name;
        opt.textContent = `${m.name} (${m.parameterSize || m.family || '?'})`;
        if (currentModel && m.name === currentModel) opt.selected = true;
        select.appendChild(opt);
      }
    } catch {
      if (_retry < 1) {
        setTimeout(() => this._fetchOllamaModelsForPanel(panel, _retry + 1), 2000);
      }
    }
  }

  /** Trigger the Python setup modal */
  async _triggerPythonSetup() {
    // Try to use music runtime's method if available
    if (window.musicRuntime?._runPythonSetupWizard) {
      await window.musicRuntime._runPythonSetupWizard();
      return;
    }

    // Fallback: fetch status and show modal directly
    try {
      const res = await fetch('/api/setup/python/status');
      const status = await res.json();
      this._showPythonInstallModal(status);
    } catch (e) {
      console.error('[AIHub] Failed to trigger Python setup:', e);
    }
  }

  /** Show Python install modal (copied from MusicPlayer for standalone use) */
  _showPythonInstallModal(pythonStatus) {
    // Remove any existing modal
    document.querySelector('.python-install-modal')?.remove();

    const missingPackages = [];
    if (pythonStatus?.packages) {
      const pkgMap = {
        syncedlyrics: 'syncedlyrics',
        rapidfuzz: 'rapidfuzz',
        fasterWhisper: 'faster-whisper',
      };
      for (const [key, pkg] of Object.entries(pkgMap)) {
        if (!pythonStatus.packages[key]) missingPackages.push(pkg);
      }
    }

    const modal = document.createElement('div');
    modal.className = 'python-install-modal';
    modal.innerHTML = `
      <div class="python-install-dialog">
        <div class="python-install-header">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M12 2L2 7l10 5 10-5-10-5z"/>
            <path d="M2 17l10 5 10-5"/>
            <path d="M2 12l10 5 10-5"/>
          </svg>
          <span>Python Dependencies Required</span>
          <button class="python-install-close" title="Close">×</button>
        </div>
        <div class="python-install-info">
          <p>The lyrics engine requires Python packages to be installed. This is a one-time setup.</p>
          ${missingPackages.length ? `<p class="missing-packages">Missing packages: <code>${missingPackages.join(', ')}</code></p>` : ''}
          <div class="python-install-requirements">
            <strong>Requirements:</strong>
            <ul>
              <li>Python 3.9 or later installed</li>
              <li>Internet connection for package downloads</li>
              <li>~500MB disk space</li>
            </ul>
          </div>
        </div>
        <div class="python-install-terminal" style="display: none;">
          <div class="terminal-header">
            <div class="terminal-dots">
              <span class="terminal-dot red"></span>
              <span class="terminal-dot yellow"></span>
              <span class="terminal-dot green"></span>
            </div>
            <span class="terminal-title">Installing dependencies...</span>
            <div class="terminal-controls-win">
              <span class="terminal-control-win"><svg viewBox="0 0 10 10"><line x1="0" y1="5" x2="10" y2="5" stroke="currentColor" stroke-width="1"/></svg></span>
              <span class="terminal-control-win"><svg viewBox="0 0 10 10"><rect x="1" y="1" width="8" height="8" fill="none" stroke="currentColor" stroke-width="1"/></svg></span>
              <span class="terminal-control-win"><svg viewBox="0 0 10 10"><line x1="1" y1="1" x2="9" y2="9" stroke="currentColor" stroke-width="1"/><line x1="9" y1="1" x2="1" y2="9" stroke="currentColor" stroke-width="1"/></svg></span>
            </div>
          </div>
          <div class="terminal-progress">
            <div class="terminal-progress-bar"></div>
            <span class="terminal-progress-text">0%</span>
          </div>
          <div class="terminal-output"></div>
        </div>
        <div class="python-install-footer">
          <button class="python-install-cancel">Cancel</button>
          <button class="python-install-start">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/>
              <polyline points="7,10 12,15 17,10"/>
              <line x1="12" y1="15" x2="12" y2="3"/>
            </svg>
            Install Now
          </button>
        </div>
      </div>
    `;

    document.body.appendChild(modal);

    const closeModal = () => {
      modal.remove();
      // Refresh services status after close
      this.fetchServicesStatus();
    };

    modal.querySelector('.python-install-close').onclick = closeModal;
    modal.querySelector('.python-install-cancel').onclick = closeModal;
    modal.onclick = (e) => { if (e.target === modal) closeModal(); };

    modal.querySelector('.python-install-start').onclick = () => {
      this._startStreamingInstall(modal, closeModal);
    };
  }

  /** Start streaming install process */
  _startStreamingInstall(modal, closeModal) {
    const info = modal.querySelector('.python-install-info');
    const terminal = modal.querySelector('.python-install-terminal');
    const output = modal.querySelector('.terminal-output');
    const progressBar = modal.querySelector('.terminal-progress-bar');
    const progressText = modal.querySelector('.terminal-progress-text');
    const startBtn = modal.querySelector('.python-install-start');
    const cancelBtn = modal.querySelector('.python-install-cancel');

    info.style.display = 'none';
    terminal.style.display = 'block';
    startBtn.disabled = true;
    startBtn.innerHTML = '<span class="spinner"></span> Installing...';
    cancelBtn.textContent = 'Close';

    const addLogLine = (text, type = 'info') => {
      const line = document.createElement('div');
      line.className = `terminal-line ${type}`;
      line.textContent = text;
      output.appendChild(line);
      output.scrollTop = output.scrollHeight;
    };

    const evtSource = new EventSource('/api/setup/python/install-stream');

    evtSource.onmessage = (e) => {
      try {
        const msg = JSON.parse(e.data);
        switch (msg.type) {
          case 'step':
            addLogLine(`▶ ${msg.label}`, 'step');
            break;
          case 'log':
            addLogLine(msg.text);
            break;
          case 'progress':
            const pct = Math.round((msg.current / msg.total) * 100);
            progressBar.style.setProperty('--progress', `${pct}%`);
            progressText.textContent = `${msg.current}/${msg.total} (${pct}%)`;
            break;
          case 'error':
            addLogLine(`✗ ${msg.message}`, 'error');
            break;
          case 'done':
            evtSource.close();
            if (msg.ok) {
              addLogLine('✓ Installation complete!', 'success');
              startBtn.classList.add('success');
              startBtn.innerHTML = '✓ Done';
              // Refresh services status
              setTimeout(() => {
                this.fetchServicesStatus();
              }, 500);
            } else {
              addLogLine('✗ Installation failed', 'error');
              startBtn.classList.add('error');
              startBtn.innerHTML = '✗ Failed';
            }
            break;
        }
      } catch {}
    };

    evtSource.onerror = () => {
      evtSource.close();
      addLogLine('Connection lost', 'error');
    };
  }
}

