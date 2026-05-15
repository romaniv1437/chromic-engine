/**
 * ChromicSearch — Chromic Engine Global Search (⌘+K)
 * Searches track titles, artists, and lyrics with deep-link playback.
 */

export class ChromicSearch {
  constructor() {
    this._overlay = null;
    this._visible = false;
    this._debounce = null;
    this._activeIdx = -1;
    this._lastQuery = '';
    this._boosts = this._loadBoosts(); // { query: [{ path, time, type }] }
    document.addEventListener('keydown', (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        this.toggle();
      }
      if (e.key === 'Escape' && this._visible) {
        e.preventDefault();
        e.stopImmediatePropagation();
        this.hide();
        return;
      }
      if (this._visible && (e.key === 'ArrowDown' || e.key === 'ArrowUp')) {
        e.preventDefault();
        this._navigate(e.key === 'ArrowDown' ? 1 : -1);
      }
      if (this._visible && e.key === 'Enter' && this._activeIdx >= 0) {
        e.preventDefault();
        this._selectActive();
      }
    });
  }

  toggle() { this._visible ? this.hide() : this.show(); }

  show() {
    if (this._overlay) return;
    this._visible = true;

    const overlay = document.createElement('div');
    overlay.className = 'chromic-search-overlay';
    overlay.innerHTML = `
      <div class="chromic-search-backdrop"></div>
      <div class="chromic-search-modal">
        <div class="chromic-search-input-wrap">
          <svg class="chromic-search-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          <input class="chromic-search-input" type="text" placeholder="Search tracks, artists, lyrics..." autofocus>
          <kbd class="chromic-search-esc">ESC</kbd>
        </div>
        <div class="chromic-search-results"></div>
      </div>
    `;
    document.body.appendChild(overlay);
    this._overlay = overlay;
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';

    overlay.querySelector('.chromic-search-backdrop').addEventListener('click', () => this.hide());
    const input = overlay.querySelector('.chromic-search-input');
    input.addEventListener('input', () => this._onInput(input.value));
    requestAnimationFrame(() => input.focus());

    // Apply Chromic lerp scroll to results container
    const results = overlay.querySelector('.chromic-search-results');
    this._initChromicScroll(results);
  }

  hide() {
    if (this._overlay) {
      this._overlay.remove();
      this._overlay = null;
    }
    this._visible = false;
    this._resultClickBound = false;
    document.body.style.overflow = '';
    document.documentElement.style.overflow = '';
  }

  _onInput(value) {
    clearTimeout(this._debounce);
    this._lastQuery = value.trim().toLowerCase();
    if (value.trim().length < 2) {
      this._renderResults({ tracks: [], lyrics: [] });
      return;
    }
    this._debounce = setTimeout(() => this._search(value.trim()), 80);
  }

  async _search(query) {
    try {
      const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
      const data = await res.json();
      this._renderResults(data, query);
    } catch (err) {
      console.warn('[ChromicSearch] Error:', err);
    }
  }

  _renderResults(data, query = '') {
    const container = this._overlay?.querySelector('.chromic-search-results');
    if (!container) return;

    if (!data.tracks?.length && !data.lyrics?.length && !data.music?.length && !data.albums?.length) {
      container.innerHTML = query ? '<div class="chromic-search-empty">No results found</div>' : '';
      return;
    }

    // Use DocumentFragment for zero-thrash batch DOM insertion
    const frag = document.createDocumentFragment();

    const addGroup = (label, items, buildItem) => {
      if (!items?.length) return;
      const group = document.createElement('div');
      group.className = 'chromic-search-group';
      const h4 = document.createElement('h4');
      h4.innerHTML = label;
      group.appendChild(h4);
      for (const item of items) {
        const els = buildItem(item);
        if (Array.isArray(els)) els.forEach(el => group.appendChild(el));
        else group.appendChild(els);
      }
      frag.appendChild(group);
    };

    const svgNote = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:-2px;margin-right:4px"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>';
    const svgAlbum = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:-2px;margin-right:4px"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="3"/></svg>';
    const svgMic = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:-2px;margin-right:4px"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/></svg>';
    const svgPlay = '<svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" stroke="none"><polygon points="5 3 19 12 5 21 5 3"/></svg>';

    const makeItem = (path, time, type, titleHtml, subtitleHtml, snippetHtml) => {
      const el = document.createElement('div');
      el.className = 'chromic-search-item';
      el.dataset.path = path;
      el.dataset.time = time;
      el.dataset.type = type;
      el.innerHTML = `<div class="chromic-search-item-text"><span class="chromic-search-title">${titleHtml}</span>${subtitleHtml ? `<span class="chromic-search-artist">${subtitleHtml}</span>` : ''}${snippetHtml ? `<span class="chromic-search-snippet">"${snippetHtml}"</span>` : ''}</div><span class="chromic-search-play">${svgPlay}</span>`;
      return el;
    };

    // Merge tracks found via lyrics into the music/tracks list (deduped)
    const trackPaths = new Set((data.tracks || []).map(t => t.path));
    (data.music || []).forEach(m => trackPaths.add(m.path));
    const lyricsTracksToAdd = [];
    if (data.lyrics?.length) {
      for (const l of data.lyrics) {
        if (!trackPaths.has(l.path)) {
          trackPaths.add(l.path);
          lyricsTracksToAdd.push({ path: l.path, title: l.title, artist: l.artist || '' });
        }
      }
    }
    const allTracks = [...(data.tracks || []), ...lyricsTracksToAdd];

    // Albums section
    addGroup(`${svgAlbum} Albums`, data.albums, a => {
      const el = document.createElement('div');
      el.className = 'chromic-search-item chromic-search-album-item';
      el.dataset.path = a.samplePath;
      el.dataset.time = '0';
      el.dataset.type = 'album';
      el.dataset.album = a.album;
      el.innerHTML = `<div class="chromic-search-item-text"><span class="chromic-search-title">${this._highlight(a.album, query)}</span><span class="chromic-search-artist">${this._esc(a.artist || '')} · ${a.trackCount} track${a.trackCount !== 1 ? 's' : ''}</span></div><span class="chromic-search-play">${svgPlay}</span>`;
      return el;
    });

    addGroup(`${svgNote} Tracks`, allTracks, t =>
      makeItem(t.path, 0, 'music', this._highlight(t.title || t.path, query), this._highlight(t.artist || '', query))
    );

    addGroup(`${svgNote} Music`, data.music, m =>
      makeItem(m.path, 0, 'music', this._highlight(m.title || m.path, query))
    );

    addGroup(`${svgMic} Lyrics`, data.lyrics, l =>
      l.matches.map(m => makeItem(l.path, m.time, 'music', this._esc(l.title), null, this._highlight(m.text, query)))
    );

    container.innerHTML = '';
    container.appendChild(frag);
    this._activeIdx = -1;

    // Promote boosted items to top based on query history
    this._applyBoosts(container);

    // Auto-focus first result so Enter immediately plays it
    const firstItem = container.querySelector('.chromic-search-item');
    if (firstItem) {
      this._activeIdx = 0;
      firstItem.classList.add('chromic-search-active');
    }

    // Bind click handler once (use a stored reference to avoid duplicates)
    if (!this._resultClickBound) {
      this._resultClickBound = true;
      container.addEventListener('click', (e) => {
        const el = e.target.closest('.chromic-search-item');
        if (!el) return;
        e.stopPropagation();
        e.stopImmediatePropagation();
        // Record boost for this query → selected item
        this._recordBoost(this._lastQuery, el);
        this.hide();
        if (el.dataset.type === 'album' && el.dataset.album) {
          document.dispatchEvent(new CustomEvent('chromic-search:open-album', { detail: { album: el.dataset.album } }));
        } else {
          const trackPath = el.dataset.path;
          const startTime = parseFloat(el.dataset.time) || 0;
          document.dispatchEvent(new CustomEvent('chromic-search:play-track', { detail: { path: trackPath, startTime } }));
        }
      });
    }
  }

  /** Chromic Scroll — lerp-based buttery smooth scroll for any container */
  _initChromicScroll(el) {
    if (!el) return;
    let target = 0;
    let active = false;
    const DAMPING = 0.65;
    const LERP = 0.18;

    const step = () => {
      const current = el.scrollTop;
      const diff = target - current;
      if (Math.abs(diff) < 0.5) {
        el.scrollTop = target;
        active = false;
        return;
      }
      el.scrollTop = current + diff * LERP;
      requestAnimationFrame(step);
    };

    el.addEventListener('wheel', (e) => {
      e.preventDefault();
      target += e.deltaY * DAMPING;
      const maxScroll = el.scrollHeight - el.clientHeight;
      target = Math.max(0, Math.min(maxScroll, target));

      if (!active) {
        active = true;
        target = el.scrollTop + e.deltaY * DAMPING;
        target = Math.max(0, Math.min(maxScroll, target));
        requestAnimationFrame(step);
      }
    }, { passive: false });

    // Sync on manual scroll
    el.addEventListener('scroll', () => {
      if (!active) target = el.scrollTop;
    }, { passive: true });
  }

  _highlight(text, query) {
    if (!query || !text) return this._esc(text || '');
    const escaped = this._esc(text);
    // Try exact match first
    const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
    const exact = escaped.replace(regex, '<mark class="chromic-search-mark">$1</mark>');
    if (exact !== escaped) return exact;
    // Fuzzy: normalize both sides (strip punctuation) and highlight word-by-word
    const normQ = query.toLowerCase().replace(/[''`]/g, '').replace(/[^a-z0-9\s]/g, '').trim();
    const words = text.split(/(\s+)/);
    let result = '';
    for (const w of words) {
      const normW = w.toLowerCase().replace(/[''`]/g, '').replace(/[^a-z0-9\s]/g, '').trim();
      if (normW && normQ.includes(normW)) {
        result += `<mark class="chromic-search-mark">${this._esc(w)}</mark>`;
      } else {
        result += this._esc(w);
      }
    }
    return result;
  }

  _esc(str) {
    const d = document.createElement('div');
    d.textContent = str || '';
    return d.innerHTML;
  }

  _navigate(direction) {
    const items = this._overlay?.querySelectorAll('.chromic-search-item') || [];
    if (!items.length) return;
    // Clear all active states to prevent multi-highlight bugs
    items.forEach(i => i.classList.remove('chromic-search-active'));
    this._activeIdx = Math.max(0, Math.min(items.length - 1, this._activeIdx + direction));
    items[this._activeIdx]?.classList.add('chromic-search-active');
    items[this._activeIdx]?.scrollIntoView({ block: 'nearest' });
  }

  _selectActive() {
    const items = this._overlay?.querySelectorAll('.chromic-search-item') || [];
    const el = items[this._activeIdx];
    if (el) el.click();
  }

  /** Boost system — remember user selections per query prefix */
  _loadBoosts() {
    try {
      return JSON.parse(localStorage.getItem('chromic-search-boosts') || '{}');
    } catch { return {}; }
  }

  _saveBoosts() {
    try {
      localStorage.setItem('chromic-search-boosts', JSON.stringify(this._boosts));
    } catch {}
  }

  _recordBoost(query, el) {
    if (!query || query.length < 2) return;
    const key = query.toLowerCase();
    const entry = { path: el.dataset.path, time: el.dataset.time || '0', type: el.dataset.type || 'music' };
    if (!this._boosts[key]) this._boosts[key] = [];
    // Remove duplicate, put at front
    this._boosts[key] = this._boosts[key].filter(b => b.path !== entry.path || b.time !== entry.time);
    this._boosts[key].unshift(entry);
    // Keep max 5 boosts per query
    this._boosts[key] = this._boosts[key].slice(0, 5);
    this._saveBoosts();
  }

  _applyBoosts(container) {
    if (!this._lastQuery || this._lastQuery.length < 2) return;
    // Find matching boosts: exact match or queries that start with current input
    const key = this._lastQuery.toLowerCase();
    const boosted = this._boosts[key];
    if (!boosted?.length) return;

    const allItems = [...container.querySelectorAll('.chromic-search-item')];
    const firstGroup = container.querySelector('.chromic-search-group');
    if (!firstGroup) return;

    // Move boosted items to very top of the first group (after <h4>)
    const h4 = firstGroup.querySelector('h4');
    for (let i = boosted.length - 1; i >= 0; i--) {
      const b = boosted[i];
      const match = allItems.find(el => el.dataset.path === b.path && el.dataset.time === b.time);
      if (match) {
        // Move existing item to top
        if (h4 && h4.nextSibling) firstGroup.insertBefore(match, h4.nextSibling);
        else firstGroup.prepend(match);
      }
    }
  }
}
