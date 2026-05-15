import { AudioEngine } from './core/AudioEngine.js';
import { ColorEngine } from './core/ColorEngine.js';
import { debug } from './core/debug.js';
import { FocusManager, getFocusableCandidates } from './core/FocusManager.js';
import { createPersistenceEngine, loadPersistedState } from './core/Persistence.js';
import { createStateStore } from './core/State.js';
import { createModal } from './ui/controls.js';
import { TabTransitionController } from './core/TabTransition.js';
import { ZenModeController } from './core/ZenMode.js';
import { staggeredEntry, tilt3D, magneticHover, hapticHover, backdropGlow, buttonBounce, glassPanel, ambientCardGlow } from './core/MotionEffects.js';
import { perfManager, scrollGuardian } from './core/MotionController.js';
import { chromicEditor } from './core/ChromicEditor.js';
import { shortcutsOverlay, platformSearchKey } from './core/ShortcutsOverlay.js';
import { ChromicSearch } from './modules/ChromicSearch.js';
import { ChromicAI } from './core/AIBridge.js';
import { AIActivityHub } from './ui/AIActivityHub.js';
import { preWarmGPU, preLoadVisualizerModule } from './core/GPUPreWarm.js';

// GPU Pre-Warm: Initialize WebGL context immediately for instant visualizer start
preWarmGPU();
preLoadVisualizerModule();

if (window.chromicElectron?.platform === 'darwin') {
  document.documentElement.classList.add('is-macos-electron');
  document.body?.classList.add('is-macos-electron');
}
if (window.chromicElectron?.platform === 'win32') {
  document.documentElement.classList.add('is-windows-electron');
  document.body?.classList.add('is-windows-electron');
}

// ═══ CHROMIC SCROLL ENGINE (Global) ═══
// Lerp-based buttery smooth scroll for any container element
window.initChromicScroll = (el, opts = {}) => {
  if (!el || el._chromicScrollBound) return;
  el._chromicScrollBound = true;
  let target = el.scrollTop || 0;
  let active = false;
  const DAMPING = opts.damping || 0.65;
  const LERP = opts.lerp || 0.18;

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
    e.stopPropagation();
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

  el.addEventListener('scroll', () => {
    if (!active) target = el.scrollTop;
  }, { passive: true });
};

// Expose for console/debug access
window.ChromicEditor = chromicEditor;
const chromicSearch = new ChromicSearch();
window.ChromicAI = ChromicAI;

// AI Activity Hub
const aiHub = new AIActivityHub();
const aiHubContainer = document.getElementById('aiHubContainer');
if (aiHubContainer) aiHub.mount(aiHubContainer);
window.aiHub = aiHub;

// ─── Services Status (Python/Aligner readiness) ─────────────────────────────
const headerPythonBtn = document.getElementById('headerPythonSetupBtn');
let _servicesStatus = null;

async function checkServicesStatus() {
  try {
    const res = await fetch('/api/services/status');
    if (!res.ok) return null;
    const data = await res.json();
    _servicesStatus = data;
    document.dispatchEvent(new CustomEvent('chromic:services-status', { detail: data }));

    // Update header button
    if (headerPythonBtn) {
      const pythonReady = data.python?.ready;
      const alignerReady = data.aligner?.ready;
      const allReady = pythonReady && alignerReady;

      if (allReady) {
        headerPythonBtn.hidden = true; // Hide when all is well
      } else {
        headerPythonBtn.hidden = false;
        headerPythonBtn.classList.toggle('needs-setup', !allReady);
        headerPythonBtn.classList.toggle('is-ready', allReady);
        headerPythonBtn.title = allReady ? 'Python environment ready' : 'Setup Python to enable lyrics features';
      }
    }
    return data;
  } catch (e) {
    console.warn('[app] Failed to fetch services status:', e);
    return null;
  }
}

// Handle Python setup button click
if (headerPythonBtn) {
  headerPythonBtn.addEventListener('click', () => {
    // Open AI Tasks popup, which has setup button
    aiHub?.show();
  });
}

// Check status on load and periodically
checkServicesStatus();
setInterval(checkServicesStatus, 60000); // Refresh every minute

// Expose for other modules
window.getServicesStatus = () => _servicesStatus;
window.checkServicesStatus = checkServicesStatus;

// Header inline search — own dropdown under input, separate from ChromicSearch
const headerSearchContainer = document.getElementById('headerSearchContainer') || document.querySelector('.header-search-container');
const headerSearchInput = document.getElementById('headerSearchInput');
const headerSearchResults = document.getElementById('headerSearchResults');
let _headerSearchDebounce = null;
let _headerSearchActiveIdx = -1;

const _headerSearchOpen = () => {
  headerSearchContainer?.classList.add('is-open');
  if (headerSearchResults) {
    headerSearchResults.classList.add('is-open');
    headerSearchResults.style.display = 'block';
    window.initChromicScroll(headerSearchResults);
  }
};
const _headerSearchClose = () => {
  headerSearchContainer?.classList.remove('is-open');
  if (headerSearchResults) {
    headerSearchResults.classList.remove('is-open');
    headerSearchResults.style.display = '';
  }
  _headerSearchActiveIdx = -1;
};

const _escHeaderSearch = (str) => {
  const d = document.createElement('div');
  d.textContent = str || '';
  return d.innerHTML;
};

const _highlightHeader = (text, query) => {
  if (!query || !text) return _escHeaderSearch(text || '');
  const escaped = _escHeaderSearch(text);
  const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
  return escaped.replace(regex, '<mark class="chromic-search-mark">$1</mark>');
};

const _renderHeaderResults = (data, query) => {
  if (!headerSearchResults) return;
  const hasResults = data.tracks?.length || data.lyrics?.length || data.music?.length || data.albums?.length;
  if (!hasResults) {
    headerSearchResults.innerHTML = query
      ? '<div class="header-search-empty">No results found</div>'
      : '';
    if (query) _headerSearchOpen(); else _headerSearchClose();
    return;
  }

  const frag = document.createDocumentFragment();
  const svgPlay = '<svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" stroke="none"><polygon points="5 3 19 12 5 21 5 3"/></svg>';

  const addGroup = (label, items, buildFn) => {
    if (!items?.length) return;
    const lbl = document.createElement('div');
    lbl.className = 'header-search-group-label';
    lbl.textContent = label;
    frag.appendChild(lbl);
    for (const item of items) {
      const els = buildFn(item);
      if (Array.isArray(els)) els.forEach(el => frag.appendChild(el));
      else frag.appendChild(els);
    }
  };

  const makeResult = (path, time, type, title, subtitle, snippet) => {
    const el = document.createElement('div');
    el.className = 'header-search-result';
    el.dataset.path = path;
    el.dataset.time = time;
    el.dataset.type = type;
    if (type === 'album') el.dataset.album = title.replace(/<[^>]*>/g, '');
    el.innerHTML = `<div class="header-search-result-info"><span class="header-search-result-title">${title}</span>${subtitle ? `<span class="header-search-result-meta">${subtitle}</span>` : ''}${snippet ? `<span class="header-search-result-meta">"${snippet}"</span>` : ''}</div><span class="chromic-search-play">${svgPlay}</span>`;
    return el;
  };

  // Dedup tracks
  const trackPaths = new Set((data.tracks || []).map(t => t.path));
  (data.music || []).forEach(m => trackPaths.add(m.path));
  const lyricsExtra = [];
  if (data.lyrics?.length) {
    for (const l of data.lyrics) {
      if (!trackPaths.has(l.path)) {
        trackPaths.add(l.path);
        lyricsExtra.push({ path: l.path, title: l.title, artist: l.artist || '' });
      }
    }
  }
  const allTracks = [...(data.tracks || []), ...lyricsExtra];

  addGroup('Albums', data.albums, a =>
    makeResult(a.samplePath, '0', 'album', _highlightHeader(a.album, query),
      `${_escHeaderSearch(a.artist || '')} · ${a.trackCount} track${a.trackCount !== 1 ? 's' : ''}`)
  );

  addGroup('Tracks', allTracks, t =>
    makeResult(t.path, '0', 'music', _highlightHeader(t.title || t.path, query), _highlightHeader(t.artist || '', query))
  );

  addGroup('Lyrics', data.lyrics, l =>
    l.matches.map(m => makeResult(l.path, m.time, 'music', _escHeaderSearch(l.title), null, _highlightHeader(m.text, query)))
  );

  headerSearchResults.innerHTML = '';
  headerSearchResults.appendChild(frag);
  _headerSearchActiveIdx = -1;
  _headerSearchOpen();

  // Auto-focus first result so Enter immediately plays it
  const firstItem = headerSearchResults.querySelector('.header-search-result');
  if (firstItem) {
    _headerSearchActiveIdx = 0;
    firstItem.classList.add('is-active');
  }
};

const _headerSearchNavigate = (dir) => {
  const items = headerSearchResults?.querySelectorAll('.header-search-result') || [];
  if (!items.length) return;
  items[_headerSearchActiveIdx]?.classList.remove('is-active');
  _headerSearchActiveIdx = Math.max(0, Math.min(items.length - 1, _headerSearchActiveIdx + dir));
  items[_headerSearchActiveIdx]?.classList.add('is-active');
  items[_headerSearchActiveIdx]?.scrollIntoView({ block: 'nearest' });
};

const _headerSearchSelect = (el) => {
  if (!el) return;
  _headerSearchClose();
  headerSearchInput.value = '';
  headerSearchResults.innerHTML = '';
  if (el.dataset.type === 'album' && el.dataset.album) {
    document.dispatchEvent(new CustomEvent('chromic-search:open-album', { detail: { album: el.dataset.album } }));
  } else {
    document.dispatchEvent(new CustomEvent('chromic-search:play-track', {
      detail: { path: el.dataset.path, startTime: parseFloat(el.dataset.time) || 0 }
    }));
  }
};

if (headerSearchInput) {
  let headerSearchClear = document.getElementById('headerSearchClear');
  const headerSearchKbd = headerSearchInput.parentElement?.querySelector('kbd');
  if (headerSearchKbd) headerSearchKbd.textContent = platformSearchKey();

  // If clear button doesn't exist in DOM (old EJS), create it dynamically
  if (!headerSearchClear) {
    headerSearchClear = document.createElement('button');
    headerSearchClear.type = 'button';
    headerSearchClear.id = 'headerSearchClear';
    headerSearchClear.className = 'header-search-clear';
    headerSearchClear.setAttribute('aria-label', 'Clear search');
    headerSearchClear.hidden = true;
    headerSearchClear.innerHTML = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>';
    // Insert before kbd
    if (headerSearchKbd) headerSearchKbd.before(headerSearchClear);
    else headerSearchInput.after(headerSearchClear);
  }

  // Clicking anywhere on the input wrap focuses the input
  const headerSearchWrap = document.getElementById('headerSearchWrap') || headerSearchInput.parentElement;
  headerSearchWrap?.addEventListener('click', () => {
    headerSearchInput.focus();
  });

  // Show/hide clear button and kbd based on input value
  const _updateClearBtn = () => {
    const hasValue = headerSearchInput.value.length > 0;
    if (headerSearchClear) headerSearchClear.hidden = !hasValue;
    if (headerSearchKbd) headerSearchKbd.style.display = hasValue ? 'none' : '';
  };

  // Clear button
  headerSearchClear?.addEventListener('click', (e) => {
    e.stopPropagation();
    headerSearchInput.value = '';
    _updateClearBtn();
    _headerSearchClose();
    headerSearchResults.innerHTML = '';
    headerSearchInput.focus();
  });

  // On focus, show popup immediately (with hint or existing results)
  headerSearchInput.addEventListener('focus', () => {
    if (headerSearchInput.value.trim().length >= 2) {
      _headerSearchOpen();
    }
  });

  // On blur, hide results after a short delay (to allow click on results)
  headerSearchInput.addEventListener('blur', () => {
    setTimeout(() => {
      if (!headerSearchContainer?.contains(document.activeElement)) {
        _headerSearchClose();
      }
    }, 200);
  });

  headerSearchInput.addEventListener('input', () => {
    clearTimeout(_headerSearchDebounce);
    _updateClearBtn();
    const val = headerSearchInput.value.trim();
    if (val.length < 2) {
      _headerSearchClose();
      headerSearchResults.innerHTML = '';
      return;
    }
    _headerSearchDebounce = setTimeout(async () => {
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(val)}`);
        const data = await res.json();
        _renderHeaderResults(data, val);
      } catch (err) {
        console.warn('[HeaderSearch] Error:', err);
      }
    }, 80);
  });

  headerSearchInput.addEventListener('keydown', (e) => {
    const isOpen = headerSearchContainer?.classList.contains('is-open') || headerSearchResults?.classList.contains('is-open');
    if (!isOpen) return;
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault();
      _headerSearchNavigate(e.key === 'ArrowDown' ? 1 : -1);
    }
    if (e.key === 'Enter') {
      e.preventDefault();
      const items = headerSearchResults?.querySelectorAll('.header-search-result') || [];
      if (items.length > 0) {
        const idx = _headerSearchActiveIdx >= 0 ? _headerSearchActiveIdx : 0;
        _headerSearchSelect(items[idx]);
      }
    }
    if (e.key === 'Escape') {
      e.preventDefault();
      _headerSearchClose();
      headerSearchInput.value = '';
      _updateClearBtn();
      headerSearchInput.blur();
    }
  });

  headerSearchResults?.addEventListener('click', (e) => {
    const el = e.target.closest('.header-search-result');
    if (el) {
      e.stopPropagation();
      _headerSearchSelect(el);
    }
  });

  // Close on outside click
  document.addEventListener('click', (e) => {
    if (!headerSearchContainer?.classList.contains('is-open')) return;
    if (headerSearchContainer.contains(e.target)) return;
    _headerSearchClose();
  });
}



const THEME_STORAGE_KEY = 'chromic-theme';
const DEFAULT_THEME = 'light-retro';


const CATEGORY_TITLES = {
  music: 'Music',
};
const CATEGORY_ORDER = ['music'];
const CRITICAL_ROUTE_ERROR = 'CRITICAL_ROUTE_ERROR';



const escapeHtml = (value) =>
  String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');

const readJsonApiResponse = async (response) => {
  const contentType = String(response.headers.get('content-type') || '').toLowerCase();
  if (contentType.includes('text/html')) {
    const preview = (await response.text().catch(() => '')).slice(0, 120);
    const criticalError = new Error('CRITICAL_ROUTE_ERROR: API returned HTML instead of JSON.');
    criticalError.code = CRITICAL_ROUTE_ERROR;
    criticalError.details = {
      url: response.url,
      status: response.status,
      contentType: contentType || null,
      preview,
    };
    throw criticalError;
  }

  if (!contentType.includes('application/json')) {
    const preview = (await response.text().catch(() => '')).slice(0, 120);
    console.warn('[api] expected json response but received different content-type', {
      url: response.url,
      status: response.status,
      contentType: contentType || null,
      preview,
    });
    return null;
  }

  return response.json().catch((error) => {
    console.warn('[api] failed to parse json response', {
      url: response.url,
      status: response.status,
      error: error?.message || String(error),
    });
    return null;
  });
};

const formatSize = (bytes) => {
  const safe = Number(bytes) || 0;
  if (safe < 1024) return `${safe} B`;
  if (safe < 1024 * 1024) return `${(safe / 1024).toFixed(1)} KB`;
  if (safe < 1024 * 1024 * 1024) return `${(safe / (1024 * 1024)).toFixed(1)} MB`;
  return `${(safe / (1024 * 1024 * 1024)).toFixed(1)} GB`;
};

const tabsElement = document.getElementById('tabs');
const viewsShellElement = document.getElementById('viewsShell');
const addMediaBtn = document.getElementById('addMediaBtn');
const themeSelectElement = document.getElementById('themeSelect');
const viewElements = {
  music: {
    root: document.getElementById('music-view'),
    playerArea: document.getElementById('musicPlayerArea'),
    sectionTitle: document.getElementById('musicSectionTitle'),
    grid: document.getElementById('musicGrid'),
  },
};

const globalPlayerElements = {
  globalMusicPlayer: document.getElementById('globalMusicPlayer'),
  globalPlayerTitle: document.getElementById('globalPlayerTitle'),
  globalPlayerSubtitle: document.getElementById('globalPlayerSubtitle'),
  globalPlayerArt: document.getElementById('globalPlayerArt'),
  playerSettingsBtn: document.getElementById('playerSettingsBtn'),
  playerPrevBtn: document.getElementById('playerPrevBtn'),
  playerPlayPauseBtn: document.getElementById('playerPlayPauseBtn'),
  playerNextBtn: document.getElementById('playerNextBtn'),
  playerShuffleBtn: document.getElementById('playerShuffleBtn'),
  playerRepeatBtn: document.getElementById('playerRepeatBtn'),
  globalAudio: document.getElementById('globalAudio'),
};

const persistedState = loadPersistedState() || {};

const store = createStateStore({
  activeType: persistedState.activeType || 'music',
  theme: persistedState.theme || DEFAULT_THEME,
  musicCurrentTrackId: persistedState.musicCurrentTrackId || null,
  musicCurrentTrackIndex: Number.isFinite(persistedState.musicCurrentTrackIndex) ? persistedState.musicCurrentTrackIndex : -1,
  musicCurrentTime: Number.isFinite(persistedState.musicCurrentTime) ? persistedState.musicCurrentTime : 0,
  musicQueueIds: Array.isArray(persistedState.musicQueueIds) ? persistedState.musicQueueIds : [],
  musicShuffle: Boolean(persistedState.musicShuffle),
  musicRepeatMode: persistedState.musicRepeatMode || 'off',
  musicVisualPreset: persistedState.musicVisualPreset || 'vaporwave-grid',
  musicVisualEnabled: persistedState.musicVisualEnabled !== false,
  musicTextEnabled: persistedState.musicTextEnabled !== false,
  musicIntensity: Number.isFinite(persistedState.musicIntensity) ? persistedState.musicIntensity : 1,
  musicSensitivity: Number.isFinite(persistedState.musicSensitivity) ? persistedState.musicSensitivity : 1,
  musicRetroFilterEnabled: Boolean(persistedState.musicRetroFilterEnabled),
  musicContentMode: persistedState.musicContentMode || 'visualizer',
  musicUiMode: persistedState.musicUiMode || 'default',
  musicPlayerExpanded: Boolean(persistedState.musicPlayerExpanded),
  musicVolume: Number.isFinite(persistedState.musicVolume) ? persistedState.musicVolume : 1,
  musicVisualizerColorMode: persistedState.musicVisualizerColorMode || 'theme',
  musicLavaOpacity: Number.isFinite(persistedState.musicLavaOpacity) ? persistedState.musicLavaOpacity : 0.18,
  musicLavaIntensity: Number.isFinite(persistedState.musicLavaIntensity) ? persistedState.musicLavaIntensity : 1,
  musicEngineMode: persistedState.musicEngineMode || 'classic',
  musicGpuScene: Number.isFinite(persistedState.musicGpuScene) ? persistedState.musicGpuScene : 0,
  musicFpsMax: Number.isFinite(persistedState.musicFpsMax) ? persistedState.musicFpsMax : 0,
  musicWasPlaying: Boolean(persistedState.musicWasPlaying),
  musicWasPlayingAt: Number.isFinite(persistedState.musicWasPlayingAt) ? persistedState.musicWasPlayingAt : 0,
  items: [],
});

const audioEngine = new AudioEngine(globalPlayerElements.globalAudio);
const colorEngine = new ColorEngine();
const persistence = createPersistenceEngine({ store });

// Flush persisted state on page unload so tab choice survives reload
window.addEventListener('beforeunload', () => persistence.saveNow());
document.addEventListener('visibilitychange', () => {
  if (document.visibilityState === 'hidden') persistence.saveNow();
});

let musicRuntime = null;
let focusManager = null;
const libraryCache = {
  music: null,
};
const renderCache = {
  music: '',
};

/**
 * Memory-safe container clear: clones the node without listeners to free ghost nodes.
 * Returns the fresh container (already in DOM at the same position).
 */
const clearContainer = (container) => {
  if (!container) return container;
  const fresh = container.cloneNode(false);
  container.parentNode.replaceChild(fresh, container);
  return fresh;
};

const categoryRequestState = {
  music: { loading: false, requestId: 0, promise: null },
};

const computeRenderSignature = (items = []) =>
  items
    .map((item) => item?.id || item?.name || '')
    .join('|');

const shouldRenderCategory = (type, items, { force = false, preserveOnEmpty = false } = {}) => {
  if (preserveOnEmpty && !items.length && renderCache[type]) {
    return false;
  }

  const signature = computeRenderSignature(items);
  const view = getViewElement(type);
  const isEmpty = !view?.grid || !view.grid.children.length;
  const changed = renderCache[type] !== signature;
  if (force || changed || isEmpty) {
    if (signature) {
      renderCache[type] = signature;
    }
    return true;
  }
  return false;
};
const syncAddMediaVisibility = () => {
  if (addMediaBtn) addMediaBtn.hidden = false;
};
const addMediaModal = createModal({
  title: 'Add Media',
  onOpen: () => {
    addMediaBtn.hidden = true;
  },
  onClose: () => {
    syncAddMediaVisibility();
  },
});
addMediaModal.root.id = 'addMediaModal';

const toggleModal = (elementId, forceOpen = null) => {
  const element = document.getElementById(elementId);
  if (!element) {
    return false;
  }

  const shouldOpen = typeof forceOpen === 'boolean' ? forceOpen : element.hidden;
  element.hidden = !shouldOpen;
  return shouldOpen;
};

const buildFallbackPreview = (label, category = 'media') => {
  const palette = {
    music: ['#ff6fcb', '#7f62ff'],
  };

  const [from, to] = palette[category] || ['#8bc3ff', '#4773e4'];
  const initial = escapeHtml(String(label || category).trim().charAt(0).toUpperCase() || 'M');
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="420" height="420" viewBox="0 0 420 420"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${from}"/><stop offset="1" stop-color="${to}"/></linearGradient></defs><rect width="420" height="420" rx="36" fill="url(#g)"/><text x="50%" y="52%" dominant-baseline="middle" text-anchor="middle" font-size="172" font-family="-Chromic-system, BlinkMacSystemFont, Segoe UI, sans-serif" fill="rgba(255,255,255,0.93)">${initial}</text></svg>`;
  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
};

const resolvePreviewUrl = (item) => {
  if (item?.previewUrl) {
    return item.previewUrl;
  }
  return buildFallbackPreview(item?.title || item?.name || item?.album || 'Media', item?.category);
};

const bindAudioContextUnlock = () => {
  const unlockEvents = ['click', 'keydown', 'touchstart'];

  const unlockAudio = async () => {
    const runtimeAudioEngine = window.musicRuntime?.audioEngine || audioEngine;
    if (!runtimeAudioEngine?.resume) {
      return;
    }

    await runtimeAudioEngine.resume().catch(() => null);
    unlockEvents.forEach((eventName) => {
      window.removeEventListener(eventName, unlockAudio, true);
    });
  };

  unlockEvents.forEach((eventName) => {
    window.addEventListener(eventName, unlockAudio, { capture: true, passive: eventName === 'touchstart' });
  });
};

const applyTheme = (themeName) => {
  const selected = themeName || DEFAULT_THEME;
  document.documentElement.dataset.theme = selected;
  document.body.dataset.theme = selected;
  if (themeSelectElement) themeSelectElement.value = selected;
  store.patch({ theme: selected });
  localStorage.setItem(THEME_STORAGE_KEY, selected);
  document.cookie = `chromic_theme=${selected};path=/;max-age=31536000;SameSite=Lax`;
  // Re-apply visualizer palette if in theme-driven mode
  if (musicRuntime?.settings?.visualizerColorMode === 'theme') {
    musicRuntime.applyVisualizerColorMode();
  }
};

const applySectionTheme = (nextType) => {
  const themeClasses = ['theme-music', 'theme-chromic'];
  const roots = [document.documentElement, document.body];

  roots.forEach((root) => {
    root.dataset.section = nextType;
    root.classList.remove(...themeClasses);
    root.classList.add(`theme-${nextType}`);
    if (nextType === 'music') {
      root.classList.add('theme-chromic');
    }
  });
};

const getViewElement = (type) => viewElements[type] || viewElements.music;

const showPlayerMessage = (type, title, message) => {
  const targetView = getViewElement(type);
  targetView.grid.innerHTML = `
    <p class="empty-hint">${escapeHtml(message)}</p>
  `;
};

const loadLibrary = async (type) => {
  // SSR Hydration: Check for pre-loaded data to skip network request
  const ssrEl = document.getElementById('ssr-data');
  if (ssrEl) {
    try {
      const ssrData = JSON.parse(ssrEl.textContent);
      if (ssrData[type]?.items) {
        const items = Array.isArray(ssrData[type].items) ? ssrData[type].items : [];
        console.log(`[SSR] Hydrating ${type} from pre-loaded data (${items.length} items)`);
        delete ssrData[type];
        if (!Object.keys(ssrData).length) ssrEl.remove();
        else ssrEl.textContent = JSON.stringify(ssrData);
        return items;
      }
    } catch (_e) { /* ignore parse errors, fall through to fetch */ }
  }

  const response = await fetch(`/api/library?type=${encodeURIComponent(type)}`, { cache: 'no-store' });
  const payload = await readJsonApiResponse(response);
  if (!response.ok) {
    throw new Error(payload?.error || `Failed to load ${type}`);
  }

  const items = Array.isArray(payload.items) ? payload.items : [];
  if (!items.length) {
    debug.log(`[Library] Empty for category: ${type}`);
  }
  return items;
};


const selectTab = (type) => {
  if (!tabsElement) return;
  const tabs = Array.from(tabsElement.querySelectorAll('.tab'));
  tabs.forEach((tab) => {
    const isActive = tab.dataset.type === type;
    tab.classList.toggle('active', isActive);
    tab.setAttribute('aria-selected', String(isActive));
  });

  const activeTab = tabs.find((tab) => tab.dataset.type === type);
  if (activeTab) {
    // Cancel any pending tab indicator rAF to prevent jitter on rapid clicks
    if (selectTab._rafId) {
      cancelAnimationFrame(selectTab._rafId);
    }
    selectTab._rafId = requestAnimationFrame(() => {
      selectTab._rafId = null;
      const tabsRect = tabsElement.getBoundingClientRect();
      const activeRect = activeTab.getBoundingClientRect();
      const width = activeRect.width;
      const offsetX = activeRect.left - tabsRect.left - 5; // subtract indicator's left:5px (4px padding + 1px border)
      tabsElement.style.setProperty('--tab-indicator-width', `${width}px`);
      tabsElement.style.setProperty('--tab-indicator-x', `${offsetX}px`);
    });
  }
};

let tabTransition = null;
let zenMode = null;
let _activeEffects = [];

const setActiveView = (type, direction = 'forward') => {
  const previousActive = Object.entries(viewElements).find(([, el]) => el.root.classList.contains('view-active'));
  const outgoing = previousActive?.[1]?.root;
  const incoming = viewElements[type]?.root;

  if (!tabTransition && incoming?.parentElement) {
    tabTransition = new TabTransitionController({ container: incoming.parentElement });
  }

  if (outgoing && incoming && outgoing !== incoming && tabTransition) {
    // Use spring-based parallax transition
    incoming.classList.add('view-active');
    incoming.classList.remove('view-hidden');
    incoming.setAttribute('aria-hidden', 'false');

    const dir = document.documentElement.dataset.navDirection === 'backward' ? 'backward' : 'forward';
    tabTransition.transition(outgoing, incoming, dir);

    // Mark outgoing after animation completes (handled by TabTransition)
    outgoing.classList.remove('view-active');
    outgoing.classList.add('view-hidden');
    outgoing.setAttribute('aria-hidden', 'true');
  } else {
    // Fallback: instant switch
    Object.entries(viewElements).forEach(([viewType, elements]) => {
      const isActive = viewType === type;
      elements.root.classList.toggle('view-active', isActive);
      elements.root.classList.toggle('view-hidden', !isActive);
      elements.root.setAttribute('aria-hidden', isActive ? 'false' : 'true');
    });
  }

  // Apply stagger + hover effects to newly visible grid items
  requestAnimationFrame(() => applyMotionEffects(type));
};

/** Apply spring-based motion effects (stagger, tilt, glow) to grid items */
const applyMotionEffects = (type) => {
  // Destroy previous effects
  _activeEffects.forEach((fx) => fx.destroy?.());
  _activeEffects = [];

  const view = viewElements[type];
  if (!view?.grid) return;

  const cards = Array.from(view.grid.querySelectorAll('.stagger-item'));
  if (!cards.length) return;

  // Only run stagger entry if items haven't been animated yet
  const needsStagger = cards.some((c) => !c.dataset.staggerDone);
  if (needsStagger) {
    const entry = staggeredEntry(cards, { stagger: 45, persistent: false });
    _activeEffects.push(entry);
    cards.forEach((c) => { c.dataset.staggerDone = '1'; });
  } else {
    // Already animated — just ensure visible, no re-animation on scroll
    cards.forEach((c) => { c.style.opacity = '1'; c.style.transform = ''; });
  }


  // Music album cards get tilt + glow
  if (type === 'music') {
    cards.forEach((card) => {
      if (!card.querySelector('.motion-gloss-overlay')) {
        _activeEffects.push(tilt3D(card, { maxTilt: 5, scale: 1.02 }));
      }
      _activeEffects.push(hapticHover(card, { brightness: 1.08 }));
      if (!card.querySelector('.card-ambient-glow')) {
        _activeEffects.push(ambientCardGlow(card, { selector: 'img', intensity: 0.4 }));
      }
      perfManager.observe(card, { willChange: 'transform' });
    });
  }


};

const ensureMusicRuntime = async () => {
  if (musicRuntime) {
    return musicRuntime;
  }

  const { MusicPlayer } = await import('./modules/music/MusicPlayer.js');

  musicRuntime = new MusicPlayer({
    store,
    audioEngine,
    colorEngine,
    persistence,
    elements: {
      ...globalPlayerElements,
      grid: viewElements.music.grid,
      playerArea: viewElements.music.playerArea,
    },
    helpers: {
      escapeHtml,
      formatSize,
      resolvePreviewUrl,
    },
  });
  window.musicRuntime = musicRuntime;

  // Navigate to album from search
  document.addEventListener('chromic:navigate-album', (e) => {
    const { albumKey } = e.detail || {};
    if (!albumKey || !musicRuntime) return;
    // Close overlay if open
    if (musicRuntime._overlayIsOpen) {
      musicRuntime.closeOverlay();
      setTimeout(() => {
        const musicTab = document.querySelector('[data-section="music"]');
        if (musicTab) musicTab.click();
        musicRuntime.activeAlbumKey = albumKey;
        musicRuntime.renderLibrary();
      }, 950);
      return;
    }
    // Switch to music tab if not already
    const musicTab = document.querySelector('[data-section="music"]');
    if (musicTab) musicTab.click();
    musicRuntime.activeAlbumKey = albumKey;
    musicRuntime.renderLibrary();
  });

  return musicRuntime;
};

const refreshCategory = async (type, { force = false } = {}) => {
  const nextType = CATEGORY_TITLES[type] ? type : 'music';
  const requestState = categoryRequestState[nextType];

  if (!force && requestState.loading && requestState.promise) {
    return requestState.promise;
  }

  requestState.loading = true;
  requestState.requestId += 1;
  const currentRequestId = requestState.requestId;

  requestState.promise = (async () => {
    try {
      let fetched = false;
      if (force || !libraryCache[nextType]) {
        libraryCache[nextType] = await loadLibrary(nextType);
        fetched = true;
      }

      if (requestState.requestId !== currentRequestId) {
        return libraryCache[nextType] || [];
      }

      const items = libraryCache[nextType] || [];
      const shouldRender = shouldRenderCategory(nextType, items, {
        force,
        preserveOnEmpty: !fetched,
      });

      if (nextType === 'music') {
        const runtime = await ensureMusicRuntime();
        if (!runtime.active && !runtime.items?.length) {
          await runtime.activate(items);
        } else if (typeof runtime.updateItems === 'function' && shouldRender) {
          await runtime.updateItems(items);
        } else if (shouldRender) {
          await runtime.activate(items);
        }
        if (!items.length && fetched) {
          showPlayerMessage('music', 'Music Library', 'Upload music into media/music to populate the album browser.');
        }
      }

      if ((store.getState().activeType || 'music') === nextType) {
        store.patch({ items });
      }

      return items;
    } catch (error) {
      console.error(`[refreshCategory] ${nextType} failed:`, error);
      if (error?.code === CRITICAL_ROUTE_ERROR) {
        console.error('[critical-route-error]', error.details || error);
        showPlayerMessage(nextType, 'Critical API Route Error', 'The server returned HTML for an API request.');
        return [];
      }
      showPlayerMessage(nextType, 'Error', error.message || `Unable to load ${nextType}.`);
      return [];
    } finally {
      if (requestState.requestId === currentRequestId) {
        requestState.loading = false;
        requestState.promise = null;
      }
    }
  })();

  return requestState.promise;
};

const preloadLibraries = async () => {
  await Promise.all(Object.keys(CATEGORY_TITLES).map((type) => refreshCategory(type, { force: true })));
};

let _hasRenderedInitialView = false;

const switchCategory = async (type) => {
  const nextType = CATEGORY_TITLES[type] ? type : 'music';
  const previousType = store.getState().activeType || 'music';
  const isInitialRender = !_hasRenderedInitialView;

  // Navigation guard: if already on this tab (and initial render done), just scroll to top
  if (_hasRenderedInitialView && previousType === nextType) {
    viewElements[nextType]?.root?.scrollTo?.({ top: 0, behavior: 'smooth' });
    return;
  }
  _hasRenderedInitialView = true;

  const previousIndex = CATEGORY_ORDER.indexOf(previousType);
  const nextIndex = CATEGORY_ORDER.indexOf(nextType);
  const navDirection = nextIndex >= previousIndex ? 'forward' : 'backward';
  document.documentElement.dataset.navDirection = navDirection;
  document.body.dataset.navDirection = navDirection;
  if (viewsShellElement) {
    viewsShellElement.dataset.direction = navDirection === 'forward' ? 'slide-right' : 'slide-left';
  }
  store.patch({ activeType: nextType, items: libraryCache[nextType] || [] });
  applySectionTheme(nextType);
  selectTab(nextType);
  // Set cookie for SSR so server renders correct tab on reload
  document.cookie = `chromic_tab=${nextType};path=/;max-age=31536000;SameSite=Lax`;

  // On initial render, do instant switch (no animation) and remove anti-flicker CSS
  if (isInitialRender) {
    console.log('[switchCategory] Initial render:', nextType, '| previous:', previousType);
    Object.entries(viewElements).forEach(([viewType, elements]) => {
      const isActive = viewType === nextType;
      elements.root.classList.toggle('view-active', isActive);
      elements.root.classList.toggle('view-hidden', !isActive);
      elements.root.setAttribute('aria-hidden', isActive ? 'false' : 'true');
    });
    // Remove anti-flicker CSS after indicator is positioned
    // Double-rAF: first frame paints indicator at correct position (no transition),
    // second frame re-enables transitions
    requestAnimationFrame(() => {
      const fixStyle = document.getElementById('initial-tab-fix');
      if (fixStyle) fixStyle.remove();
      requestAnimationFrame(() => applyMotionEffects(nextType));
    });
  } else {
    setActiveView(nextType);
  }
  syncAddMediaVisibility();
  addMediaBtn.textContent = nextType === 'music' ? '+ Add Music' : '+ Add Media';
  addMediaBtn.setAttribute('aria-label', nextType === 'music' ? 'Add Music' : 'Add Media');
  musicRuntime?.applyPageFlags?.();

  // Stop LyricsEngine rAF loop when leaving music tab to save CPU/RAM
  if (nextType !== 'music') {
    musicRuntime?.lyrics?.stop();
  }

  if (document.hasFocus()) { try { navigator.vibrate?.(6); } catch (_) {} }

  const cachedItems = libraryCache[nextType] || [];
  await refreshCategory(nextType, { force: !cachedItems.length });

  musicRuntime?.applyPageFlags?.();
  store.patch({ items: libraryCache[nextType] || [] });

  // Resume LyricsEngine when returning to music tab (if a track is loaded)
  if (nextType === 'music' && musicRuntime?.lyrics?.timeline?.length) {
    musicRuntime.lyrics.start();
  }
  // Don't auto-focus first element on page load
};

const uploadWithProgress = ({ url, formData, progressElement }) =>
  new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', url);

    if (progressElement) {
      progressElement.hidden = false;
      progressElement.value = 0;
    }

    xhr.upload.onprogress = (event) => {
      if (!event.lengthComputable || !progressElement) {
        return;
      }
      progressElement.value = Math.round((event.loaded / event.total) * 100);
    };

    xhr.onload = () => {
      if (progressElement) {
        progressElement.hidden = true;
      }
      if (xhr.status >= 200 && xhr.status < 300) {
        resolve(JSON.parse(xhr.responseText || '{}'));
        return;
      }
      try {
        const payload = JSON.parse(xhr.responseText || '{}');
        reject(new Error(payload.error || 'Upload failed'));
      } catch (_error) {
        reject(new Error('Upload failed'));
      }
    };

    xhr.onerror = () => {
      if (progressElement) {
        progressElement.hidden = true;
      }
      reject(new Error('Upload failed'));
    };

    xhr.send(formData);
  });

const bindMusicUploadForm = () => {
  const body = addMediaModal.getBody();
  const form = body.querySelector('[data-music-upload-form]');
  form?.addEventListener('submit', async (event) => {
    event.preventDefault();
    const formElement = event.currentTarget;
    const track = formElement.querySelector('input[name="trackFile"]')?.files?.[0];
    const progress = formElement.querySelector('.upload-progress');
    if (!track) {
      showPlayerMessage('music', 'Upload', 'Select a music track file first.');
      return;
    }

    try {
      const formData = new FormData(formElement);
      const payload = await uploadWithProgress({
        url: '/api/upload/music',
        formData,
        progressElement: progress,
      });
      toggleModal('addMediaModal', false);
      addMediaModal.close();
      showPlayerMessage('music', 'Music uploaded', payload?.album ? `Track saved to ${payload.album}.` : 'Track bundle saved.');
      await refreshCategory('music', { force: true });
      await switchCategory('music');
    } catch (error) {
      showPlayerMessage('music', 'Upload error', error.message || 'Unable to upload music.');
    }
  });
};

const handleFocusBack = () => {
  // Don't navigate back if a popup/menu/modal is open — let the ESC handler close it first
  const floating = document.getElementById('chromic-floating-menu');
  const inlineMenus = document.querySelectorAll('[data-more-menu]:not([hidden])');
  const gridCtx = document.querySelector('.album-grid-context-menu');
  const themePanelOpen = themePanel?.classList.contains('is-open');
  const aiHubOpen = window.aiHub?._visible;
  if (floating || inlineMenus.length || gridCtx || themePanelOpen || aiHubOpen) {
    console.log('[ESC-app] handleFocusBack skipped: popup open (floating=%o inline=%d gridCtx=%o theme=%o aiHub=%o)',
      !!floating, inlineMenus.length, !!gridCtx, !!themePanelOpen, !!aiHubOpen);
    return;
  }
  const activeType = store.getState().activeType || 'music';
  if (activeType === 'music' && musicRuntime) {
    const settingsVisible = musicRuntime.isSettingsPanelOpen?.() || !!musicRuntime.isSettingsView;
    if (settingsVisible) {
      musicRuntime.closeSettingsView();
      window._chromicEscClosedPopup = true;
      requestAnimationFrame(() => { window._chromicEscClosedPopup = false; });
      return;
    }
    if (musicRuntime.isPlayerExpanded) {
      console.log('[ESC-app] handleFocusBack: player expanded, queue=%s settings=%s settingsVisible=%s', musicRuntime.isQueueSheetOpen, musicRuntime.isSettingsView, settingsVisible);
      // Close sub-panels first before closing overlay
      if (musicRuntime.isQueueSheetOpen) {
        musicRuntime.isQueueSheetOpen = false;
        musicRuntime.applyPageFlags();
        musicRuntime.persistPlayerState();
        window._chromicEscClosedPopup = true;
        requestAnimationFrame(() => { window._chromicEscClosedPopup = false; });
        return;
      }
      if (settingsVisible) {
        musicRuntime.closeSettingsView();
        window._chromicEscClosedPopup = true;
        requestAnimationFrame(() => { window._chromicEscClosedPopup = false; });
        return;
      }
      musicRuntime.closeOverlay();
      return;
    }
    if (musicRuntime.activeAlbumKey) {
      const savedScroll = musicRuntime._albumsScrollTop || 0;
      musicRuntime.activeAlbumKey = null;
      musicRuntime._backToAlbums = true;
      window._chromicResetSmoothScroll?.(savedScroll);
      window.scrollTo({ top: savedScroll, behavior: 'instant' });
      musicRuntime.renderLibrary();
      // Re-apply scroll after render in case DOM rebuild reset it
      window._chromicResetSmoothScroll?.(savedScroll);
      window.scrollTo({ top: savedScroll, behavior: 'instant' });
    }
    return;
  }
};

// Import music files (copy to media folder)
const importMusicFiles = async (activeType) => {
  try {
    const filePaths = await window.chromicElectron.openMusicDialog();
    if (!filePaths || !filePaths.length) return;
    const res = await fetch('/api/import/music', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ filePaths }),
    });
    const data = await res.json();
    if (data.ok) {
      console.log(`[Import] ✅ Imported ${data.count} files (skipped=${data.skipped || 0})`);
      await refreshCategory(activeType, { force: true });
    } else {
      console.error('[Import] Error:', data.error);
    }
  } catch (e) {
    console.error('[Import] Failed:', e);
  }
};

// Link external music folder (no-copy indexing)
const linkMusicFolder = async (activeType) => {
  try {
    const folderPath = await window.chromicElectron.openLibraryFolder();
    if (!folderPath) return;

    // Show scanning indicator
    const scanOverlay = document.createElement('div');
    scanOverlay.className = 'chromic-scan-overlay';
    scanOverlay.innerHTML = `
      <div style="position:fixed;inset:0;z-index:10000;background:rgba(0,0,0,0.5);backdrop-filter:blur(4px);display:flex;align-items:center;justify-content:center">
        <div style="background:var(--glass-tint,rgba(20,20,30,0.95));backdrop-filter:blur(20px);border-radius:14px;padding:24px 32px;text-align:center;border:1px solid rgba(255,255,255,0.1);min-width:300px;box-shadow:0 20px 60px rgba(0,0,0,0.5)">
          <div class="scan-icon" style="margin-bottom:10px">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--accent,#78b4ff)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" style="animation:lyrics-spin 2s linear infinite"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          </div>
          <div style="font-size:14px;font-weight:600;color:var(--text-high-contrast)">Scanning Library</div>
          <div class="scan-status" style="font-size:12px;opacity:0.7;margin-top:6px">Linking folder...</div>
          <div class="scan-progress" style="font-size:11px;opacity:0.5;margin-top:4px"></div>
          <div class="scan-bar-wrap" style="margin-top:12px;height:3px;background:rgba(255,255,255,0.08);border-radius:2px;overflow:hidden">
            <div class="scan-bar" style="height:100%;width:0%;background:var(--accent,#78b4ff);border-radius:2px;transition:width 0.3s ease"></div>
          </div>
        </div>
      </div>
    `;
    document.body.appendChild(scanOverlay);

    const res = await fetch('/api/library/link-folder', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ folderPath }),
    });
    const data = await res.json();

    if (data.ok) {
      // Poll scan status
      const pollInterval = setInterval(async () => {
        try {
          const sr = await fetch('/api/library/scan-status').then(r => r.json());
          const statusEl = scanOverlay.querySelector('.scan-status');
          const progressEl = scanOverlay.querySelector('.scan-progress');
          const barEl = scanOverlay.querySelector('.scan-bar');
          const iconEl = scanOverlay.querySelector('.scan-icon');
          if (sr.scanning) {
            const pct = sr.total > 0 ? Math.round((sr.found / sr.total) * 100) : 0;
            if (statusEl) statusEl.textContent = `Indexing ${sr.found} / ${sr.total} tracks...`;
            if (progressEl) {
              const folderName = sr.folder ? sr.folder.split('/').pop() : '';
              progressEl.innerHTML = `<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="vertical-align:-1px;margin-right:3px;opacity:0.6"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg> ${folderName}`;
            }
            if (barEl) barEl.style.width = `${pct}%`;
            if (sr.phase === 'covers' && statusEl) {
              statusEl.textContent = `Extracting artwork ${sr.found} / ${sr.total}...`;
            }
          } else {
            clearInterval(pollInterval);
            if (iconEl) iconEl.innerHTML = '<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="rgba(100,220,140,0.9)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>';
            if (statusEl) statusEl.textContent = `Indexed ${sr.found} tracks`;
            if (barEl) barEl.style.width = '100%';
            setTimeout(() => {
              scanOverlay.remove();
              refreshCategory(activeType, { force: true });
            }, 1200);
          }
        } catch (_) {
          clearInterval(pollInterval);
          scanOverlay.remove();
          refreshCategory(activeType, { force: true });
        }
      }, 500);
    } else {
      scanOverlay.remove();
      console.error('[Library] Link failed:', data.error);
    }
  } catch (e) {
    console.error('[Library] Link failed:', e);
  }
};

const openAddMedia = async () => {
  const activeType = store.getState().activeType || 'music';

  // Electron: use native OS file dialog or link folder
  if (window.chromicElectron?.openMusicDialog) {
    // Show choice: import (copy) vs link folder (no-copy)
    const hasLinkFolder = !!window.chromicElectron?.openLibraryFolder;
    if (hasLinkFolder) {
      const choiceEl = document.createElement('div');
      choiceEl.className = 'chromic-import-choice';
      choiceEl.innerHTML = `
        <div class="chromic-import-choice-backdrop"></div>
        <div class="chromic-import-choice-panel">
          <h3 style="margin:0 0 12px;font-size:15px;font-weight:600;color:var(--text-high-contrast)">Add Music</h3>
          <button class="expand-fullscreen-btn" data-action="copy" style="width:100%;margin-bottom:8px;text-align:left;padding:10px 14px">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="vertical-align:-3px;margin-right:8px"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
            Import Files <small style="opacity:0.6;display:block;margin-top:2px;font-size:11px">Copy files into Chromic's media folder</small>
          </button>
          <button class="expand-fullscreen-btn" data-action="link" style="width:100%;text-align:left;padding:10px 14px;background:linear-gradient(135deg,rgba(120,200,255,0.15),rgba(100,180,255,0.08))">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="vertical-align:-3px;margin-right:8px"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
            Link Music Folder <small style="opacity:0.6;display:block;margin-top:2px;font-size:11px">Index files in place — no copying, instant scan</small>
          </button>
          <button class="expand-fullscreen-btn album-shuffle-btn" data-action="cancel" style="width:100%;margin-top:8px;font-size:12px">Cancel</button>
        </div>
      `;
      const style = choiceEl.querySelector('.chromic-import-choice-panel').style;
      style.cssText = 'position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);z-index:10001;background:var(--glass-tint,rgba(20,20,30,0.95));backdrop-filter:blur(20px);border-radius:14px;padding:20px;min-width:320px;border:1px solid rgba(255,255,255,0.1);box-shadow:0 20px 60px rgba(0,0,0,0.5)';
      choiceEl.querySelector('.chromic-import-choice-backdrop').style.cssText = 'position:fixed;inset:0;z-index:10000;background:rgba(0,0,0,0.5);backdrop-filter:blur(4px)';
      document.body.appendChild(choiceEl);

      const cleanup = () => { choiceEl.remove(); document.removeEventListener('keydown', escHandler); };
      const escHandler = (e) => { if (e.key === 'Escape') cleanup(); };
      document.addEventListener('keydown', escHandler);
      choiceEl.querySelector('[data-action="cancel"]').onclick = cleanup;
      choiceEl.querySelector('.chromic-import-choice-backdrop').onclick = cleanup;

      choiceEl.querySelector('[data-action="copy"]').onclick = async () => {
        cleanup();
        await importMusicFiles(activeType);
      };
      choiceEl.querySelector('[data-action="link"]').onclick = async () => {
        cleanup();
        await linkMusicFolder(activeType);
      };
      return;
    }

    // No link folder support — direct import
    await importMusicFiles(activeType);
    return;
  }

  // Browser fallback: HTML upload form
  addMediaModal.setTitle('Upload Music');
  addMediaModal.setContent(`
    <form class="upload-modal-form" data-music-upload-form>
      <label>Album <input name="albumName" type="text" placeholder="Album name" /></label>
      <label>Track <input name="trackFile" type="file" accept="audio/*,.mp3,.flac,.wav,.m4a,.ogg,.aac,.aiff" required /></label>
      <label>Cover <input name="coverImage" type="file" accept="image/*" /></label>
      <label>Lyrics <input name="lyricsFile" type="file" accept=".lrc,.txt" /></label>
      <progress class="upload-progress" max="100" value="0" hidden></progress>
      <button type="submit">Upload Track Bundle</button>
    </form>
  `);
  addMediaModal.open();
  toggleModal('addMediaModal', true);
  bindMusicUploadForm();
};

tabsElement?.addEventListener('click', (event) => {
  const button = event.target.closest('.tab');
  if (!button || !button.dataset.type) {
    return;
  }

  switchCategory(button.dataset.type);
});
addMediaBtn?.addEventListener('click', openAddMedia);
document.getElementById('headerAddMusicBtn')?.addEventListener('click', openAddMedia);

themeSelectElement?.addEventListener('change', (event) => {
  applyTheme(event.target.value);
});

// ═══ Chromic Theme Swatch Picker ═══
const themeTriggerBtn = document.getElementById('themeTriggerBtn');
const themePanel = document.getElementById('themePanel');

if (themeTriggerBtn && themePanel) {
  themeTriggerBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    const isOpen = themePanel.classList.toggle('is-open');
    themePanel.setAttribute('aria-hidden', isOpen ? 'false' : 'true');
    if (isOpen) _updateActiveThemeSwatch();
  });

  // Close on outside click — but NOT if clicking inside theme panel or trigger
  document.addEventListener('click', (e) => {
    if (!themePanel.classList.contains('is-open')) return;
    if (themePanel.contains(e.target) || themeTriggerBtn.contains(e.target)) return;
    themePanel.classList.remove('is-open');
    themePanel.setAttribute('aria-hidden', 'true');
  });

  // Stop clicks inside panel from bubbling to the document close handler
  themePanel.addEventListener('click', (e) => {
    e.stopPropagation();
  });

  function _updateActiveThemeSwatch() {
    const current = document.documentElement.dataset.theme || 'chromic-dark';
    themePanel.querySelectorAll('.chromic-theme-swatch').forEach(btn => {
      btn.classList.toggle('is-active', btn.dataset.theme === current);
    });
  }

  themePanel.querySelectorAll('.chromic-theme-swatch').forEach(swatch => {
    swatch.addEventListener('click', (e) => {
      e.stopPropagation();
      applyTheme(swatch.dataset.theme);
      _updateActiveThemeSwatch();
      // Don't close — user may want to try multiple themes
    });
  });

  // Set initial active state
  _updateActiveThemeSwatch();

  // Show More themes toggle
  const showMoreBtn = document.getElementById('themeShowMoreBtn');
  const expandedGrid = document.getElementById('themeExpandedGrid');
  if (showMoreBtn && expandedGrid) {
    showMoreBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const visible = expandedGrid.classList.toggle('is-visible');
      showMoreBtn.classList.toggle('is-active', visible);
    });
    // Bind swatches inside expanded grid
    expandedGrid.querySelectorAll('.chromic-theme-swatch').forEach(swatch => {
      swatch.addEventListener('click', (e) => {
        e.stopPropagation();
        applyTheme(swatch.dataset.theme);
        _updateActiveThemeSwatch();
      });
    });
  }
}

document.getElementById('headerAiConfigBtn')?.addEventListener('click', () => {
  // Open AI hub dropdown and show inline settings
  const hub = window.aiActivityHub;
  if (hub) {
    hub.show();
    hub._toggleInlineAiSettings();
  } else if (typeof window._openAiSettingsModal === 'function') {
    window._openAiSettingsModal();
  }
});

const bootstrap = async () => {
  bindAudioContextUnlock();

  // Lazy image loading via IntersectionObserver
  if ('IntersectionObserver' in window) {
    const imgObserver = new IntersectionObserver((entries, obs) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          const img = entry.target;
          if (img.dataset.src) {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
            // Mark card as loaded so content-visibility stays visible (no re-decode flicker)
            const card = img.closest('.music-album-grid-item');
            if (card) {
              card.classList.remove('img-loading');
              card.classList.add('img-loaded');
            }
          }
          obs.unobserve(img);
        }
      }
    }, { rootMargin: '200px' });
    // Observe current and future lazy images
    const observeLazy = () => document.querySelectorAll('img[data-src]').forEach(img => imgObserver.observe(img));
    observeLazy();
    // Re-observe after grid renders
    const origObserveLazy = observeLazy;
    window._observeLazyImages = origObserveLazy;
  }

  applyTheme(store.getState().theme || localStorage.getItem(THEME_STORAGE_KEY) || DEFAULT_THEME);
  focusManager = new FocusManager({
    getCandidates: () => [
      ...getFocusableCandidates(document.querySelector('.library-view.view-active') || document),
      ...getFocusableCandidates(document.querySelector('.controls') || document),
      ...getFocusableCandidates(document.getElementById('globalMusicPlayer') || document),
      ...getFocusableCandidates(document.querySelector('.music-player-layer.is-expanded') || document),
    ],
    onBack: handleFocusBack,
  });
  focusManager.start();
  await preloadLibraries();
  const initialTab = store.getState().activeType || 'music';
  console.log('[BOOTSTRAP] switchCategory to:', initialTab, '| fix style present:', !!document.getElementById('initial-tab-fix'));
  await switchCategory(initialTab);

  // Pre-warm GPU visualizer in the background (shader compile + GPU cache)
  // so first overlay open is instant with zero jitter
  if (initialTab === 'music' && musicRuntime) {
    requestIdleCallback?.(() => musicRuntime.preWarmVisualizer())
      ?? setTimeout(() => musicRuntime.preWarmVisualizer(), 500);
  }

  // Initialize Zen Mode (Ctrl+Shift+Z or Cmd+Shift+Z to toggle)
  zenMode = new ZenModeController({
    chromeSelectors: ['.app-header', '#globalMusicPlayer', '.views-shell .tab-navigation', '.library-controls'],
  });
  document.addEventListener('keydown', (e) => {
    if ((e.metaKey || e.ctrlKey) && e.shiftKey && e.key === 'z') {
      e.preventDefault();
      zenMode.toggle();
    }
  });

  // Issue 4: Mobile header-actions popup toggle
  const headerActions = document.querySelector('.header-actions');
  if (headerActions) {
    const toggle = document.createElement('button');
    toggle.className = 'header-actions-toggle';
    toggle.type = 'button';
    toggle.innerHTML = '⋯';
    toggle.title = 'Options';
    headerActions.parentElement.insertBefore(toggle, headerActions);

    const popup = document.createElement('div');
    popup.className = 'header-actions-popup';
    popup.hidden = true;
    document.body.appendChild(popup);

    toggle.addEventListener('click', (e) => {
      e.stopPropagation();
      if (popup.hidden) {
        popup.hidden = false;
        popup.appendChild(headerActions);
      } else {
        popup.hidden = true;
        toggle.parentElement.insertBefore(headerActions, toggle.nextSibling);
      }
    });

    document.addEventListener('click', (e) => {
      if (!popup.hidden && !popup.contains(e.target) && e.target !== toggle) {
        popup.hidden = true;
        toggle.parentElement.insertBefore(headerActions, toggle.nextSibling);
      }
    });
  }
};

bootstrap();

/* ── Chromic TV Parallax Tilt for TV Show Episode Cards ── */

/* ── Auto-Padding: make sure last items are reachable when player is active ── */
const adjustAppPadding = () => {
  const player = document.querySelector('.player-card');
  const shell = document.querySelector('.app-shell');
  if (player && shell) {
    shell.style.paddingBottom = '120px';
  }
};
adjustAppPadding();

/* Close any open media-more-menu when clicking outside */
document.addEventListener('click', (e) => {
  const toggle = e.target.closest('[data-more-toggle]');
  if (toggle) {
    // Check if a floating menu is already open — if so, just close it (toggle off)
    const floating = document.getElementById('chromic-floating-menu');
    if (floating) {
      floating.remove();
      return;
    }
    // Global fallback: toggle the sibling inline menu
    const wrap = toggle.closest('.media-more-wrap');
    const menu = wrap?.querySelector?.('[data-more-menu]');
    if (menu) {
      // Close all other menus first
      document.querySelectorAll('[data-more-menu]:not([hidden])').forEach((m) => {
        if (m !== menu) m.hidden = true;
      });
      menu.hidden = !menu.hidden;
    }
    return;
  }
  if (e.target.closest('[data-more-menu]') || e.target.closest('#chromic-floating-menu')) return;
  document.querySelectorAll('[data-more-menu]:not([hidden])').forEach((menu) => {
    menu.hidden = true;
  });
  const floating = document.getElementById('chromic-floating-menu');
  if (floating) floating.remove();
});

/* Close all popups / floating menus / context menus on Escape */
document.addEventListener('keydown', (e) => {
  if (e.key !== 'Escape') return;

  console.log('[ESC-app] ESC pressed in app.js handler');

  // Close floating context menu
  const floating = document.getElementById('chromic-floating-menu');
  if (floating) {
    console.log('[ESC-app] Closing floating menu');
    e.preventDefault();
    e.stopImmediatePropagation();
    window._chromicEscClosedPopup = true;
    requestAnimationFrame(() => { window._chromicEscClosedPopup = false; });
    floating.remove();
    return;
  }

  // Close any open data-more-menu
  const openMenus = document.querySelectorAll('[data-more-menu]:not([hidden])');
  if (openMenus.length) {
    console.log('[ESC-app] Closing %d inline more-menus', openMenus.length);
    e.preventDefault();
    e.stopImmediatePropagation();
    window._chromicEscClosedPopup = true;
    requestAnimationFrame(() => { window._chromicEscClosedPopup = false; });
    openMenus.forEach(m => { m.hidden = true; });
    return;
  }

  // Close album grid context menu
  const gridCtx = document.querySelector('.album-grid-context-menu');
  if (gridCtx) {
    e.preventDefault();
    e.stopImmediatePropagation();
    window._chromicEscClosedPopup = true;
    requestAnimationFrame(() => { window._chromicEscClosedPopup = false; });
    gridCtx.remove();
    return;
  }

  // Close album nav dropdown
  const navList = document.querySelector('.music-album-nav-list:not([hidden])');
  if (navList) {
    e.preventDefault();
    e.stopImmediatePropagation();
    window._chromicEscClosedPopup = true;
    requestAnimationFrame(() => { window._chromicEscClosedPopup = false; });
    navList.hidden = true;
    const trigger = document.querySelector('.music-album-nav-current');
    if (trigger) trigger.setAttribute('aria-expanded', 'false');
    return;
  }

  // Close blocking/non-blocking Chromic inspector report
  const inspector = document.querySelector('.chromic-inspector-report');
  if (inspector) {
    e.preventDefault();
    e.stopImmediatePropagation();
    window._chromicEscClosedPopup = true;
    requestAnimationFrame(() => { window._chromicEscClosedPopup = false; });
    inspector.remove();
    return;
  }

  // Close music overlay settings panel before anything else in overlay flow
  const musicSettingsOpen = !!(musicRuntime?.isPlayerExpanded && (musicRuntime?.isSettingsPanelOpen?.() || musicRuntime?.isSettingsView));
  if (musicSettingsOpen) {
    e.preventDefault();
    e.stopImmediatePropagation();
    window._chromicEscClosedPopup = true;
    requestAnimationFrame(() => { window._chromicEscClosedPopup = false; });
    musicRuntime.closeSettingsView();
    return;
  }

  // Close theme panel
  if (themePanel?.classList.contains('is-open')) {
    e.preventDefault();
    e.stopImmediatePropagation();
    window._chromicEscClosedPopup = true;
    requestAnimationFrame(() => { window._chromicEscClosedPopup = false; });
    themePanel.classList.remove('is-open');
    themePanel.setAttribute('aria-hidden', 'true');
    return;
  }

  // Close AI hub dropdown
  if (window.aiHub?._visible) {
    e.preventDefault();
    e.stopImmediatePropagation();
    window._chromicEscClosedPopup = true;
    requestAnimationFrame(() => { window._chromicEscClosedPopup = false; });
    window.aiHub.hide();
    return;
  }
});

/* ── Native Menu Bar Actions (Electron IPC) ── */
if (window.chromicElectron?.onMenuAction) {
  window.chromicElectron.onMenuAction((action) => {
    const mr = window.musicRuntime;
    switch (action) {
      case 'add-music':
        document.querySelector('[data-add-media]')?.click();
        break;
      case 'settings':
        mr?.openSettingsView?.();
        break;
      case 'search':
        document.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', metaKey: true }));
        break;
      case 'toggle-pro':
        window.ChromicEditor?.toggle();
        break;
      case 'play-pause':
        mr?.togglePlayPause?.();
        break;
      case 'next-track':
        mr?.playNext?.({ dueToEnded: false });
        break;
      case 'prev-track':
        mr?.playPrevious?.();
        break;
      case 'toggle-shuffle':
        mr?.toggleShuffle?.();
        break;
      case 'ai-settings':
        window._openAiSettingsModal?.();
        break;
      case 'sync-lyrics':
        document.dispatchEvent(new CustomEvent('chromic:sync-current-track'));
        break;
      case 'translate-lyrics':
        mr?._toggleTranslation?.();
        break;
    }
  });
}

// ═══ CHROMIC WELCOME INTRO ══════════════════════════════════════════════════
const WELCOME_STORAGE_KEY = 'chromic-welcome-done';

const showWelcomeIntro = () => {
  // Remove existing if re-triggered
  document.getElementById('chromic-welcome-overlay')?.remove();

  const overlay = document.createElement('div');
  overlay.id = 'chromic-welcome-overlay';
  overlay.innerHTML = `
    <style>
      #chromic-welcome-overlay {
        position: fixed; inset: 0; z-index: 99999;
        display: flex; align-items: center; justify-content: center;
        background: rgba(0,0,0,0.75);
        backdrop-filter: blur(24px) saturate(1.4);
        -webkit-backdrop-filter: blur(24px) saturate(1.4);
        opacity: 0;
        animation: welcomeFadeIn 0.6s cubic-bezier(0.22,1,0.36,1) forwards;
      }
      @keyframes welcomeFadeIn { to { opacity: 1; } }
      @keyframes welcomeFadeOut { to { opacity: 0; pointer-events: none; } }
      .welcome-card {
        position: relative;
        width: min(480px, 88vw);
        padding: 48px 40px 40px;
        border-radius: 28px;
        background: rgba(255,255,255,0.06);
        border: 1px solid rgba(255,255,255,0.12);
        box-shadow: 0 32px 80px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.1);
        backdrop-filter: blur(40px) saturate(1.6);
        -webkit-backdrop-filter: blur(40px) saturate(1.6);
        text-align: center;
        overflow: hidden;
      }
      .welcome-card::before {
        content: '';
        position: absolute; inset: 0;
        border-radius: 28px;
        background: conic-gradient(from 180deg at 50% 50%, rgba(94,158,255,0.12), rgba(191,90,242,0.08), rgba(255,45,85,0.06), rgba(94,158,255,0.12));
        animation: welcomeGlassRotate 8s linear infinite;
        pointer-events: none;
      }
      @keyframes welcomeGlassRotate {
        to { transform: rotate(360deg); }
      }
      .welcome-item {
        opacity: 0;
        transform: translateY(24px) scale(0.95);
        animation: welcomeStagger 0.7s cubic-bezier(0.22,1,0.36,1) forwards;
      }
      @keyframes welcomeStagger {
        to { opacity: 1; transform: translateY(0) scale(1); }
      }
      .welcome-logo {
        font-size: 42px;
        font-weight: 800;
        letter-spacing: -1.5px;
        background: linear-gradient(135deg, #5e9eff, #bf5af2, #ff2d55);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        margin-bottom: 8px;
        position: relative;
      }
      .welcome-subtitle {
        font-size: 15px;
        color: rgba(255,255,255,0.6);
        margin-bottom: 28px;
        font-weight: 400;
        position: relative;
      }
      .welcome-features {
        display: flex;
        flex-direction: column;
        gap: 12px;
        margin-bottom: 32px;
        position: relative;
      }
      .welcome-feature {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 12px 16px;
        border-radius: 14px;
        background: rgba(255,255,255,0.04);
        border: 1px solid rgba(255,255,255,0.08);
        text-align: left;
      }
      .welcome-feature-icon {
        flex-shrink: 0;
        width: 36px; height: 36px;
        border-radius: 10px;
        background: rgba(94,158,255,0.15);
        display: flex; align-items: center; justify-content: center;
      }
      .welcome-feature-icon svg { stroke: #5e9eff; }
      .welcome-feature-text {
        font-size: 13px;
        color: rgba(255,255,255,0.85);
        font-weight: 500;
      }
      .welcome-cta {
        position: relative;
        display: inline-flex;
        align-items: center;
        gap: 8px;
        padding: 14px 28px;
        border-radius: 14px;
        border: none;
        background: linear-gradient(135deg, #5e9eff, #bf5af2);
        color: #fff;
        font-size: 15px;
        font-weight: 600;
        cursor: pointer;
        transition: transform 0.2s, box-shadow 0.2s;
        box-shadow: 0 8px 32px rgba(94,158,255,0.3);
      }
      .welcome-cta:hover {
        transform: scale(1.04);
        box-shadow: 0 12px 40px rgba(94,158,255,0.45);
      }
      .welcome-cta:active { transform: scale(0.97); }
      .welcome-dismiss {
        position: relative;
        margin-top: 16px;
        background: none; border: none;
        color: rgba(255,255,255,0.4);
        font-size: 12px;
        cursor: pointer;
        padding: 6px 12px;
        border-radius: 8px;
        transition: color 0.2s;
      }
      .welcome-dismiss:hover { color: rgba(255,255,255,0.7); }
    </style>
    <div class="welcome-card">
      <div class="welcome-item welcome-logo" style="animation-delay:0.15s">Chromic Engine</div>
      <div class="welcome-item welcome-subtitle" style="animation-delay:0.3s">High-Fidelity Music Player with AI Lyrics</div>
      <div class="welcome-features">
        <div class="welcome-item welcome-feature" style="animation-delay:0.45s">
          <div class="welcome-feature-icon"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg></div>
          <span class="welcome-feature-text">Lossless playback with real-time visualizers</span>
        </div>
        <div class="welcome-item welcome-feature" style="animation-delay:0.6s">
          <div class="welcome-feature-icon"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></div>
          <span class="welcome-feature-text">AI-powered synced lyrics & word-level timestamps</span>
        </div>
        <div class="welcome-item welcome-feature" style="animation-delay:0.75s">
          <div class="welcome-feature-icon"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10A15.3 15.3 0 0 1 12 2z"/></div>
          <span class="welcome-feature-text">Instant translations to any language</span>
        </div>
      </div>
      <div class="welcome-item" style="animation-delay:1.0s">
        <button class="welcome-cta" id="welcomeCtaBtn">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
          Add Your Music
        </button>
      </div>
      <div class="welcome-item" style="animation-delay:1.15s">
        <button class="welcome-dismiss" id="welcomeDismissBtn">I'll explore first</button>
      </div>
    </div>
  `;

  document.body.appendChild(overlay);

  const dismiss = () => {
    localStorage.setItem(WELCOME_STORAGE_KEY, '1');
    overlay.style.animation = 'welcomeFadeOut 0.4s cubic-bezier(0.22,1,0.36,1) forwards';
    setTimeout(() => overlay.remove(), 450);
  };

  overlay.querySelector('#welcomeCtaBtn').addEventListener('click', () => {
    dismiss();
    setTimeout(() => openAddMedia(), 300);
  });
  overlay.querySelector('#welcomeDismissBtn').addEventListener('click', dismiss);
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) dismiss();
  });
};

// Show welcome intro only when library is empty (no tracks in DB)
(async () => {
  try {
    const res = await fetch('/api/library?type=music', { cache: 'no-store' });
    const data = await res.json();
    const hasMusic = Array.isArray(data.items) && data.items.length > 0;
    if (!hasMusic) {
      setTimeout(showWelcomeIntro, 600);
    }
  } catch (_) {
    // On fetch error, don't show intro
  }
})();

// Header button to replay (removed from UI but kept for debug)
document.getElementById('headerWelcomeBtn')?.addEventListener('click', showWelcomeIntro);

// Issue 6: Marquee overflow detection for mobile
function checkMarqueeOverflow() {
  // Always check #mainTrackTitle (overlay title), rest only on mobile
  const mainTitle = document.getElementById('mainTrackTitle');
  if (mainTitle) {
    if (mainTitle.scrollWidth > mainTitle.clientWidth + 2) {
      mainTitle.classList.add('is-overflowing');
    } else {
      mainTitle.classList.remove('is-overflowing');
    }
  }
  if (window.innerWidth > 900) return;
  document.querySelectorAll('.album-view-kicker, .album-track-row.active .track-title-main').forEach(el => {
    if (el.scrollWidth > el.clientWidth + 2) {
      el.classList.add('is-overflowing');
    } else {
      el.classList.remove('is-overflowing');
    }
  });
}
const marqueeObserver = new MutationObserver(() => requestAnimationFrame(checkMarqueeOverflow));
marqueeObserver.observe(document.body, { childList: true, subtree: true, attributes: true, attributeFilter: ['class'] });
window.addEventListener('resize', checkMarqueeOverflow);
