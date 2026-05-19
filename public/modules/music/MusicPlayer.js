import { LyricsEngine } from './LyricsEngine.js';
import { renderMusicAlbumView, updateAlbumViewMetadata } from './MusicAlbumView.js';
import { VISUALIZER_PRESETS, VisualizerManager, computeAudioBands, computeMoodProfile, resetMoodState, setTrackIdentity } from './Visualizer.js';
import { GlobalPlayerVisualizer } from './GlobalPlayerVisualizer.js';
import { uiButton, uiRange, uiSegmented, uiToggleRow } from '../../ui/controls.js';

// ─── Debug-gated console: suppress verbose logs in production ─────────────────
const _dbg = window.__DEBUG__
  ? console.log.bind(console)
  : () => {};
const _dbgWarn = window.__DEBUG__
  ? console.warn.bind(console)
  : () => {};

// ─── SVG Icon Map (Lucide-style, 16×16, currentColor) ───────────────────────
const ICONS = {
  menu: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>',
  diamond: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2l10 10-10 10L2 12z"/></svg>',
  contrast: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 2v20"/><path d="M12 2a10 10 0 0 1 0 20" fill="currentColor" opacity="0.3"/></svg>',
  gear: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>',
  palette: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="13.5" cy="6.5" r="0.5" fill="currentColor"/><circle cx="17.5" cy="10.5" r="0.5" fill="currentColor"/><circle cx="8.5" cy="7.5" r="0.5" fill="currentColor"/><circle cx="6.5" cy="12" r="0.5" fill="currentColor"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.93 0 1.5-.67 1.5-1.5 0-.39-.15-.74-.39-1.01-.24-.27-.39-.62-.39-1.01A1.5 1.5 0 0 1 14.22 17H16a6 6 0 0 0 6-6c0-5.52-4.48-10-10-10z"/></svg>',
  document: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>',
  sparkles: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3l1.91 5.77L20 10.5l-5.09 2.73L12 19l-2.91-5.77L4 10.5l5.09-2.73z"/><path d="M19 2l.5 1.5L21 4l-1.5.5L19 6l-.5-1.5L17 4l1.5-.5z"/></svg>',
  gamepad: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="6" width="20" height="12" rx="2"/><line x1="6" y1="12" x2="10" y2="12"/><line x1="8" y1="10" x2="8" y2="14"/><circle cx="15" cy="11" r="0.5" fill="currentColor"/><circle cx="17" cy="13" r="0.5" fill="currentColor"/></svg>',
  robot: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="10" rx="2"/><circle cx="12" cy="5" r="2"/><line x1="12" y1="7" x2="12" y2="11"/><line x1="8" y1="16" x2="8" y2="16"/><line x1="16" y1="16" x2="16" y2="16"/><circle cx="8" cy="16" r="1" fill="currentColor"/><circle cx="16" cy="16" r="1" fill="currentColor"/></svg>',
  monitor: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>',
  bolt: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>',
  flask: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 3h6v5l4 9a2 2 0 0 1-1.8 2.9H6.8A2 2 0 0 1 5 17l4-9V3z"/><line x1="9" y1="3" x2="15" y2="3"/></svg>',
  paintbrush: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 19.5a3.5 3.5 0 1 1-7 0c0-2.1 1.6-3.5 3.5-3.5 1.6 0 2.5.4 3.5 1"/><path d="M20.4 3.6a2.1 2.1 0 0 0-3 0L9 12l3 3 8.4-8.4a2.1 2.1 0 0 0 0-3z"/></svg>',
  hourglass: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 22h14"/><path d="M5 2h14"/><path d="M17 22v-4.17a2 2 0 0 0-.59-1.42L12 12l-4.41 4.41A2 2 0 0 0 7 17.83V22"/><path d="M7 2v4.17a2 2 0 0 0 .59 1.42L12 12l4.41-4.41A2 2 0 0 0 17 6.17V2"/></svg>',
  search: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>',
  mic: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/></svg>',
  wand: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 4V2"/><path d="M15 16v-2"/><path d="M8 9h2"/><path d="M20 9h2"/><path d="M17.8 11.8L19 13"/><path d="M15 9h0"/><path d="M17.8 6.2L19 5"/><path d="m3 21 9-9"/><path d="M12.2 6.2L11 5"/></svg>',
};

const withImageParams = (url, width = 700) => {
  if (!url || url.startsWith('data:')) return url;
  const joiner = url.includes('?') ? '&' : '?';
  return `${url}${joiner}w=${width}&fmt=webp`;
};
import { extractPalette } from '../../core/ColorEngine.js';

// Eagerly preload visualizer module (cache the import, not the constructor)
const _vizModulePromise = import('/visualizer/main.js').catch(() => null);
import { getPreloadedVizModule } from '../../core/GPUPreWarm.js';
import { promote, demote } from '../../core/PerformanceCore.js';
import { ProgressBar } from '../../ui/ProgressBar.js';
import { scheduler, Spring, SPRING_PRESETS, scrollGuardian } from '../../core/MotionController.js';
import { staggeredEntry, tilt3D, hapticHover, backdropGlow, ambientCardGlow } from '../../core/MotionEffects.js';

const AUDIO_MIME_BY_EXT = {
  '.mp3': 'audio/mpeg',
  '.wav': 'audio/wav',
  '.ogg': 'audio/ogg',
  '.m4a': 'audio/mp4',
  '.aac': 'audio/aac',
  '.aiff': 'audio/aiff',
  '.flac': 'audio/flac',
};

const REPEAT_MODES = ['off', 'all', 'one'];

const REPEAT_LABELS = {
  off: 'Repeat Off',
  all: 'Repeat All',
  one: 'Repeat One',
};

const formatTime = (seconds) => {
  if (!Number.isFinite(seconds) || seconds < 0) {
    return '0:00';
  }
  const total = Math.floor(seconds);
  const hours = Math.floor(total / 3600);
  const mins = Math.floor((total % 3600) / 60);
  const secs = String(total % 60).padStart(2, '0');
  return hours > 0 ? `${hours}:${String(mins).padStart(2, '0')}:${secs}` : `${mins}:${secs}`;
};

const mimeForTrack = (track) => AUDIO_MIME_BY_EXT[String(track?.ext || '').toLowerCase()] || 'audio/mpeg';

const PRESET_LABELS = {
  'classic-bars': 'Classic Bars',
  oscilloscope: 'Oscilloscope',
  'milkdrop-nebula': 'MilkDrop Nebula',
  'starfield-warp': 'Starfield Warp',
  'rgb-magic-bubbles': 'RGB Magic Bubbles',
  'pulsing-ring': 'Pulsing Ring',
  'vaporwave-grid': 'Vaporwave Grid',
  'spectrum-fire': 'Spectrum Fire',
  'digital-rain': 'Digital Rain',
  'plasma-flow': 'Plasma Flow',
  'rgb-glitch': 'RGB Glitch',
  'vhs-retro': 'VHS Retro',
  'musical-symphony': 'Musical Symphony',
};

const formatPresetLabel = (preset) => PRESET_LABELS[preset] || String(preset || '').replaceAll('-', ' ');

const normalizePreset = (value) => {
  if (value === 'rgb-bubbles') {
    return 'rgb-magic-bubbles';
  }
  return VISUALIZER_PRESETS.includes(value) ? value : 'vaporwave-grid';
};

const shuffleList = (values, pinnedValue = null) => {
  const pool = Array.isArray(values) ? values.slice() : [];
  const pinned = pinnedValue && pool.includes(pinnedValue) ? pinnedValue : null;
  const filtered = pinned ? pool.filter((value) => value !== pinned) : pool;

  for (let index = filtered.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [filtered[index], filtered[swapIndex]] = [filtered[swapIndex], filtered[index]];
  }

  return pinned ? [pinned, ...filtered] : filtered;
};

export const ensureOverlayHostOnBody = (existingHost = null, doc = document) => {
  if (!doc?.body) {
    return existingHost;
  }

  const host = existingHost || doc.getElementById?.('musicOverlayHost') || doc.createElement('div');
  host.id = 'musicOverlayHost';

  if (host.parentNode !== doc.body) {
    doc.body.append(host);
  }

  return host;
};

export const syncOverlayHostState = (host, isOpen) => {
  if (!host) {
    return host;
  }

  host.classList?.toggle?.('is-active', Boolean(isOpen));
  host.classList?.toggle?.('is-expanded', Boolean(isOpen));

  if (isOpen) {
    host.removeAttribute?.('aria-hidden');
    host.removeAttribute?.('inert');
    if ('inert' in host) {
      host.inert = false;
    }
    return host;
  }

  host.setAttribute?.('aria-hidden', 'true');
  host.setAttribute?.('inert', '');
  if ('inert' in host) {
    host.inert = true;
  }
  return host;
};

/**
 * Normalize album key: merge "Artist - Album/Disc 1" and "Artist - Album/Disc 2" into "Artist - Album"
 */
export const getTrackAlbumKey = (track) => {
  const raw = track?.folder || track?.albumPath || track?.album || 'Singles';
  // Strip trailing /Disc N, /CD N, /Disk N (case-insensitive)
  return raw.replace(/[\/\\]\s*(disc|cd|disk)\s*\d+\s*$/i, '');
};

export const groupTracksIntoAlbums = (tracks = [], resolvePreviewUrl = () => null) => {
  const albums = new Map();

  tracks.forEach((track) => {
    const key = getTrackAlbumKey(track);
    const albumCoverCandidate = track.albumPreviewUrl || (track.previewSource === 'album-sidecar' ? track.previewUrl : null);
    const trackPreviewCandidate = track.previewUrl || resolvePreviewUrl(track);
    if (!albums.has(key)) {
      albums.set(key, {
        name: track.album || String(key).split('/').filter(Boolean).pop() || key,
        key,
        tracks: [],
        previewUrl: albumCoverCandidate || trackPreviewCandidate,
        _hasAlbumCover: Boolean(albumCoverCandidate),
      });
    }
    const album = albums.get(key);
    if (!album._hasAlbumCover && albumCoverCandidate) {
      album.previewUrl = albumCoverCandidate;
      album._hasAlbumCover = true;
    }
    album.tracks.push(track);
  });

  return Array.from(albums.values())
    .map((album) => {
      delete album._hasAlbumCover;
      return album;
    })
    .sort((a, b) => a.name.localeCompare(b.name));
};

export const reorderQueueIds = (queueIds = [], sourceId, targetId) => {
  const next = Array.isArray(queueIds) ? queueIds.slice() : [];
  const fromIndex = next.indexOf(sourceId);
  const toIndex = next.indexOf(targetId);
  if (fromIndex < 0 || toIndex < 0 || fromIndex === toIndex) {
    return next;
  }

  const [moved] = next.splice(fromIndex, 1);
  next.splice(toIndex, 0, moved);
  return next;
};

export const computeSwipeResistance = (deltaY, viewportHeight = 1000) => {
  const safeDelta = Math.max(0, Number(deltaY) || 0);
  const safeViewport = Math.max(320, Number(viewportHeight) || 1000);
  const ratio = Math.min(1, safeDelta / safeViewport);
  return safeDelta * (1 - ratio * 0.55);
};

export const applyMediaSessionState = ({ track = null, artworkUrl = '', playbackState = 'none', handlers = {} } = {}) => {
  if (typeof navigator === 'undefined' || !navigator.mediaSession) {
    return false;
  }

  if (!track) {
    navigator.mediaSession.metadata = null;
    navigator.mediaSession.playbackState = 'none';
    return true;
  }

  const metadata = {
    title: track.title || track.name || 'Unknown Track',
    artist: track.artist || 'Unknown Artist',
    album: track.album || 'Singles',
    artwork: artworkUrl
      ? [{ src: artworkUrl, sizes: '512x512', type: 'image/png' }]
      : [],
  };

  navigator.mediaSession.metadata = typeof MediaMetadata === 'function' ? new MediaMetadata(metadata) : metadata;
  navigator.mediaSession.playbackState = playbackState;

  Object.entries(handlers).forEach(([action, handler]) => {
    try {
      navigator.mediaSession.setActionHandler?.(action, handler || null);
    } catch (_error) {
      // Unsupported actions differ across browsers.
    }
  });

  return true;
};

export class MusicPlayer {
  constructor({ store, audioEngine, colorEngine, persistence, elements, helpers }) {
    this.store = store;
    this.audioEngine = audioEngine;
    this.colorEngine = colorEngine;
    this.persistence = persistence;
    this.elements = elements;
    this.helpers = helpers;

    this.items = [];
    this.currentTrackIndex = -1;
    this.active = false;
    this.visualizer = null;
    this.mathVisualizer = null;
    this.lyrics = null;
    this.pageUi = null;
    this.activeAlbumKey = null;
    this.audioUnsubs = [];
    this.isPlayerExpanded = false;
    this._overlayIsOpen = false;
    this._isTransitioning = false;
    this.isSettingsView = false;
    this.swipeGesture = null;
    this.lastSyncedSecond = -1;
    this.queueTrackIds = [];
    this.shuffledQueueIds = [];
    this.repeatMode = 'off';
    this.openSettingsSections = new Set(['visualizer']);
    this.isScreenSaverIdle = false;
    this.isQueueSheetOpen = false;
    this._settingsEscGuard = false;
    this.idleTimeoutMs = 4_000;
    this.idleTimer = null;
    this.idleWatchersBound = false;
    this.boundIdleActivityHandler = () => this.handleIdleActivity();
    this.boundBodyClickHandler = (event) => this.handleBodyClick(event);
    this.boundOverlayCaptureClickHandler = (event) => this.handleOverlayCaptureClick(event);
    this.boundPageInputHandler = (event) => this.handlePageInput(event);
    this.boundPageChangeHandler = (event) => this.handlePageChange(event);
    this.boundPageDragStartHandler = (event) => this.handleQueueDragStart(event);
    this.boundPageDragOverHandler = (event) => this.handleQueueDragOver(event);
    this.boundPageDropHandler = (event) => this.handleQueueDrop(event);
    this.boundPageDragEndHandler = () => this.handleQueueDragEnd();
    this.draggedQueueTrackId = null;
    this.overlayHost = null;
    this.overlayClickCaptureBound = false;
    this.albumAccent = '#7dd6ff';
    this.audioReactiveAccentFrameId = null;
    this.progressFrameId = null;
    this._lyricsLaunchAlertedForTrackId = null;
    this._albumNavDelayTimer = 0;

    this.settings = {
      visualPreset: 'vaporwave-grid',
      visualEnabled: true,
      textEnabled: true,
      intensity: 1,
      sensitivity: 1,
      retroFilterEnabled: false,
      contentMode: 'visualizer',
      uiMode: 'default',
      isShuffle: false,
      volume: 1,
      visualizerColorMode: 'album',
      lavaOpacity: 0.18,
      lavaIntensity: 1,
      engineMode: 'premium',
      gpuScene: 0,
      fpsMax: 60, // 30, 60, 120, 0 = unlimited (screen refresh rate)
      gpuLabsUnlocked: false,
      showTranslation: false,
      translationLang: 'uk',
      vizDimEnabled: true,
      vizDimOpacity: 0.35,
      vizBlurEnabled: false,
      vizOff: false,
    };

    this.hydrateFromStore();
    this.bindGlobalControls();
    this.bindDocumentControls();
    this.bindAudioEvents();

    // Spotlight Search deep-link playback
    document.addEventListener('chromic-search:play-track', async (e) => {
      const { path: trackPath, startTime } = e.detail || {};
      if (!trackPath) return;
      const url = `/media/${trackPath}`;
      const encodedUrl = `/media/${trackPath.split('/').map(s => encodeURIComponent(s)).join('/')}`;
      // Find track in library by URL (try both encoded and raw)
      const idx = this.items.findIndex(t => {
        const tUrl = decodeURIComponent(t.url || '');
        const searchUrl = decodeURIComponent(url);
        return t.url === url || t.url === encodedUrl || tUrl === searchUrl || t.url?.endsWith(encodeURIComponent(trackPath.split('/').pop()));
      });
      if (idx >= 0) {
        await this.playTrack(idx, { autoplay: true, expand: this.isPlayerExpanded, startTime });
      } else {
        await this.audioEngine.setSource(encodedUrl, { autoplay: true });
        if (startTime > 0) this.audioEngine.audioElement.currentTime = startTime;
      }
    });

    document.addEventListener('chromic-search:open-album', (e) => {
      const { album } = e.detail || {};
      if (!album) return;
      // Find album key from current items
      const track = this.items.find(t => t.album === album);
      if (track) {
        const albumKey = track.albumKey || track.album || album;
        document.dispatchEvent(new CustomEvent('chromic:navigate-album', { detail: { albumKey } }));
      }
    });
  }

  hydrateFromStore() {
    const snapshot = this.store.getState();
    this.settings.visualPreset = normalizePreset(snapshot.musicVisualPreset || this.settings.visualPreset);
    this.settings.visualEnabled = snapshot.musicVisualEnabled !== false;
    this.settings.textEnabled = snapshot.musicTextEnabled !== false;
    this.settings.showTranslation = Boolean(snapshot.musicShowTranslation);
    this.settings.intensity = Number.isFinite(snapshot.musicIntensity) ? snapshot.musicIntensity : this.settings.intensity;
    this.settings.sensitivity = Number.isFinite(snapshot.musicSensitivity) ? snapshot.musicSensitivity : this.settings.sensitivity;
    this.settings.retroFilterEnabled = Boolean(snapshot.musicRetroFilterEnabled);
    this.settings.contentMode = snapshot.musicContentMode || this.settings.contentMode;
    this.settings.uiMode = snapshot.musicUiMode || this.settings.uiMode;
    this.settings.isShuffle = Boolean(snapshot.musicShuffle);
    this.settings.volume = Number.isFinite(snapshot.musicVolume) ? snapshot.musicVolume : this.settings.volume;
    this.settings.visualizerColorMode = snapshot.musicVisualizerColorMode || 'album';
    this.settings.lavaOpacity = Number.isFinite(snapshot.musicLavaOpacity) ? snapshot.musicLavaOpacity : this.settings.lavaOpacity;
    this.settings.lavaIntensity = Number.isFinite(snapshot.musicLavaIntensity) ? snapshot.musicLavaIntensity : this.settings.lavaIntensity;
    this.settings.engineMode = snapshot.musicEngineMode === 'classic' ? 'premium' : (snapshot.musicEngineMode || 'premium');
    // When migrating from classic engine, reset color mode to album-driven (premium default)
    if (snapshot.musicEngineMode === 'classic') {
      this.settings.visualizerColorMode = 'album';
    }
    this.settings.gpuScene = Number.isFinite(snapshot.musicGpuScene) ? snapshot.musicGpuScene : 0;
    this.settings.fpsMax = (Number.isFinite(snapshot.musicFpsMax) && snapshot.musicFpsMax > 0) ? snapshot.musicFpsMax : 60;
    this.settings.gpuLabsUnlocked = true; // All scenes always visible
    _dbg('[hydrate] engineMode=%s gpuScene=%d fpsMax=%d (from snapshot: engineMode=%s gpuScene=%s)', this.settings.engineMode, this.settings.gpuScene, this.settings.fpsMax, snapshot.musicEngineMode, snapshot.musicGpuScene);
    document.body.classList.toggle('engine-premium', this.settings.engineMode === 'premium');
    this.repeatMode = snapshot.musicRepeatMode || 'off';
    this.settings.vizDimEnabled = snapshot.musicVizDimEnabled !== undefined ? Boolean(snapshot.musicVizDimEnabled) : this.settings.vizDimEnabled;
    this.settings.vizDimOpacity = Number.isFinite(snapshot.musicVizDimOpacity) ? snapshot.musicVizDimOpacity : this.settings.vizDimOpacity;
    this.settings.vizBlurEnabled = snapshot.musicVizBlurEnabled !== undefined ? Boolean(snapshot.musicVizBlurEnabled) : this.settings.vizBlurEnabled;
    this.settings.vizOff = snapshot.musicVizOff !== undefined ? Boolean(snapshot.musicVizOff) : this.settings.vizOff;
    this.settings.hudActionsExpanded = snapshot.musicHudActionsExpanded !== undefined ? Boolean(snapshot.musicHudActionsExpanded) : this.settings.hudActionsExpanded;
    this.isPlayerExpanded = Boolean(snapshot.musicPlayerExpanded);
    this.queueTrackIds = Array.isArray(snapshot.musicQueueIds) ? snapshot.musicQueueIds.slice() : [];
    this.shuffledQueueIds = this.settings.isShuffle
      ? (Array.isArray(snapshot.musicShuffledQueueIds) && snapshot.musicShuffledQueueIds.length ? snapshot.musicShuffledQueueIds.slice() : shuffleList(this.queueTrackIds, snapshot.musicCurrentTrackId))
      : [];
  }

  persistPlayerState({ immediate = false } = {}) {
    const track = this.items[this.currentTrackIndex] || null;
    this.store.patch({
      musicCurrentTrackId: track?.id || null,
      musicCurrentTrackIndex: this.currentTrackIndex,
      musicCurrentTime: this.audioEngine.getCurrentTime(),
      musicQueueIds: this.queueTrackIds.slice(),
      musicShuffledQueueIds: this.shuffledQueueIds?.slice() || [],
      musicShuffle: this.settings.isShuffle,
      musicRepeatMode: this.repeatMode,
      musicVisualPreset: this.settings.visualPreset,
      musicVisualEnabled: this.settings.visualEnabled,
      musicTextEnabled: this.settings.textEnabled,
      musicShowTranslation: this.settings.showTranslation,
      musicIntensity: this.settings.intensity,
      musicSensitivity: this.settings.sensitivity,
      musicRetroFilterEnabled: this.settings.retroFilterEnabled,
      musicContentMode: this.settings.contentMode,
      // Don't persist uiMode — zen mode should not auto-restore
      musicPlayerExpanded: this.isPlayerExpanded,
      musicVolume: this.settings.volume,
      musicVisualizerColorMode: this.settings.visualizerColorMode,
      musicLavaOpacity: this.settings.lavaOpacity,
      musicLavaIntensity: this.settings.lavaIntensity,
      musicEngineMode: this.settings.engineMode,
      musicGpuScene: this.settings.gpuScene,
      musicFpsMax: this.settings.fpsMax,
      musicGpuLabsUnlocked: this.settings.gpuLabsUnlocked,
      musicVizDimEnabled: this.settings.vizDimEnabled,
      musicVizDimOpacity: this.settings.vizDimOpacity,
      musicVizBlurEnabled: this.settings.vizBlurEnabled,
      musicVizOff: this.settings.vizOff,
      musicHudActionsExpanded: this.settings.hudActionsExpanded,
      musicWasPlaying: this.audioEngine.isPlaying(),
      musicWasPlayingAt: this.audioEngine.isPlaying() ? Date.now() : (this.store.getState().musicWasPlayingAt || 0),
    });

    if (immediate) {
      this.persistence?.saveNow?.();
    }
  }

  bindGlobalControls() {
    const {
      globalMusicPlayer,
      globalPlayerTitle,
      playerSettingsBtn,
      playerPrevBtn,
      playerPlayPauseBtn,
      playerNextBtn,
      playerShuffleBtn,
      playerRepeatBtn,
    } = this.elements;

    const openFromBar = (mode = 'player') => {
      if (!this.active || this.currentTrackIndex < 0 || this._overlayIsOpen) {
        return;
      }
      const sourceRect = this.elements.globalPlayerArt?.getBoundingClientRect?.() || null;
      this.openOverlay(mode);
      this.runAlbumFlipTransition(sourceRect);
    };

    globalMusicPlayer?.addEventListener('click', (event) => {
      if (event.target.closest('.global-player-controls button')) {
        return;
      }
      if (event.target.closest('#globalPlayerTitle')) {
        return; // handled by its own listener, prevent double-fire
      }
      if (event.target.closest('#globalPlayerProgress')) {
        return; // handled by ProgressBar, don't open overlay
      }
      openFromBar('player');
    });

    globalPlayerTitle?.addEventListener('click', (e) => {
      e.stopPropagation();
      this._navigateToCurrentTrackAlbum({ scrollToTrack: true });
    });

    const globalPlayerSubtitle = this.elements.globalPlayerSubtitle;
    globalPlayerSubtitle?.addEventListener('click', (e) => {
      e.stopPropagation();
      this._navigateToCurrentTrackAlbum({ scrollToTrack: false });
    });
    playerSettingsBtn?.addEventListener('click', () => openFromBar('settings'));
    playerPrevBtn?.addEventListener('click', () => this.playPrevious());
    playerPlayPauseBtn?.addEventListener('click', () => this.togglePlayPause());
    playerNextBtn?.addEventListener('click', () => this.playNext({ dueToEnded: false }));
    playerShuffleBtn?.addEventListener('click', () => this.toggleShuffle());
    playerRepeatBtn?.addEventListener('click', () => this.cycleRepeatMode());

    // Global progress bar — drag-to-seek
    const globalProgress = document.getElementById('globalPlayerProgress');
    if (globalProgress) {
      this._globalProgressBar = new ProgressBar(globalProgress, {
        onSeek: (ratio) => {
          // User manually seeking - clear any pending restore state
          this._pendingSeekTarget = null;
          this._restoredFromReload = false;
          this.audioEngine.seekToRatio(ratio);
          this.updateProgressUi();
        },
        getDuration: () => this.audioEngine.getDuration(),
      });
    }

    this.overlayHost = this.getOverlayRoot();
    this.audioEngine.setVolume(this.settings.volume);

    // ── Global Player Aurora Background ──
    // DISABLED FOR PERF TESTING — uncomment to re-enable
    const bgCanvas = document.getElementById('globalPlayerBgCanvas');
    if (bgCanvas) {
      _dbg('[GlobalPlayerViz]  DISABLED for performance testing');
      bgCanvas.style.display = 'none';
      // this._globalPlayerViz = new GlobalPlayerVisualizer(bgCanvas);
      this._globalPlayerVizEnabled = false;
    }

    // Scene toggle button for global player background
    const sceneBtn = document.getElementById('playerBgSceneBtn');
    if (sceneBtn) sceneBtn.style.display = 'none'; // hide toggle while disabled
    /*
    sceneBtn?.addEventListener('click', (e) => {
      e.stopPropagation();
      this._globalPlayerVizEnabled = !this._globalPlayerVizEnabled;
      sceneBtn.classList.toggle('active', this._globalPlayerVizEnabled);
      if (this._globalPlayerVizEnabled) {
        this._globalPlayerViz?.start();
      } else {
        this._globalPlayerViz?.stop();
      }
    });
    */

    // ── Page Visibility API: throttle visualizers when minimized ──
    document.addEventListener('visibilitychange', () => {
      const hidden = document.hidden;
      // Math visualizer (overlay): pause/low-power when hidden
      if (this.mathVisualizer) {
        if (hidden) {
          this.mathVisualizer.setMaxFps(1);
        } else if (this._overlayIsOpen) {
          this.mathVisualizer.setMaxFps(this.settings.fpsMax || 30);
        }
      }
      // Global player background: low-power mode
      if (this._globalPlayerViz) {
        this._globalPlayerViz.setLowPower(hidden);
      }
    });

    // ── Lyrics-driven adaptive quality: throttle VISUALIZER (never text) when FPS drops ──
    document.addEventListener('lyricsPerformance', (e) => {
      const { throttle, fps } = e.detail || {};
      if (throttle) {
        // Lyrics are struggling — reduce visualizer FPS to give text priority
        const throttledFps = Math.min(this.settings.fpsMax || 30, 30);
        _dbg(`[perf] Lyrics FPS=${Math.round(fps)}, throttling visualizer to ${throttledFps}fps`);
        if (this.mathVisualizer?.setMaxFps) this.mathVisualizer.setMaxFps(throttledFps);
        if (this.visualizer) this.visualizer._fpsMax = throttledFps;
        this._lyricsThrottleActive = true;
      } else if (this._lyricsThrottleActive) {
        // Lyrics recovered — restore user's chosen FPS
        _dbg(`[perf] Lyrics FPS recovered to ${Math.round(fps)}, restoring visualizer FPS`);
        this._applyFpsLimit();
        this._lyricsThrottleActive = false;
      }
    });

    // ── Reload lyrics when track assets are updated (e.g. after Regenerate Timestamps) ──
    document.addEventListener('chromic:track-assets-updated', async (e) => {
      const updatedPath = e?.detail?.trackPath;
      const source = e?.detail?.source;
      _dbg(`[lyrics] 📡 track-assets-updated event received`, {
        updatedPath,
        source,
        showTranslation: this.settings?.showTranslation,
        willSkipTranslation: source === 'translation'
      });

      // If this event came from translation completion, DO NOT reload lyrics
      // because setTrack() clears translations and we just applied them!
      if (source === 'translation') {
        _dbg(`[lyrics] ⏹ Skipping lyrics reload (source=translation) — translations already applied`);
        return;
      }

      if (!updatedPath) return;
      const track = this.items[this.currentTrackIndex];
      if (!track) return;
      const currentPath = this._getTrackRelativePath(track);
      if (!currentPath) return;
      // Normalize for comparison (both can be with or without "music/" prefix)
      const norm = (p) => p?.replace(/^music\//, '') || '';
      if (norm(currentPath) !== norm(updatedPath)) return;
      _dbg('[lyrics] 🔄 Track assets updated externally, reloading lyrics...');
      try {
        const res = await fetch('/api/lyrics/refresh', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ trackPath: currentPath }),
        });
        const data = await res.json();
        if (!data.lyrics || this.currentTrackIndex < 0) return;
        const stillSameTrack = norm(this._getTrackRelativePath(this.items[this.currentTrackIndex])) === norm(updatedPath);
        if (!stillSameTrack) return;
        this.currentLyrics = data.lyrics;
        // Rebuild synced timeline
        const syncedTimeline = data.lyrics.map((l, idx) => {
          if (l.type === 'vocal_cue') {
            return { type: 'vocal_cue', start: parseFloat(l.time) || 0, end: parseFloat(l.end) || 0, text: '' };
          }
          const text = l.text || '';
          let startSec = parseFloat(l.start ?? l.time ?? 0);
          let endSec = parseFloat(l.end ?? (data.lyrics[idx + 1]?.time ?? startSec + 3));
          if (Array.isArray(l.words) && l.words.length > 0 && l.words[0].start !== undefined) {
            const wordData = l.words.map(w => ({
              text: w.word || w.text || w,
              start: parseFloat(w.start),
              end: parseFloat(w.end),
            }));
            const lastEnd = wordData[wordData.length - 1]?.end;
            if (lastEnd > endSec) endSec = lastEnd;
            return { type: 'line', text: String(text), start: startSec, end: endSec, words: wordData };
          }
          // Fallback: generate word timings from text
          const wordStrings = String(text).split(/\s+/).filter(Boolean);
          const lineDur = endSec - startSec;
          const wordDurEach = wordStrings.length > 0 ? lineDur / wordStrings.length : lineDur;
          const fallbackWords = wordStrings.map((ws, wi) => ({
            text: ws,
            start: startSec + wi * wordDurEach,
            end: startSec + (wi + 1) * wordDurEach,
            isVocalStretch: false,
          }));
          return { type: 'line', text: String(text), start: startSec, end: endSec, words: fallbackWords };
        });
        const lyricsPayload = {
          ...track,
          lyrics: data.lyrics.map(l => l.text || l),
          enhancedLyrics: { timeline: syncedTimeline },
        };
        await this.lyrics?.setTrack(lyricsPayload);
        if (this.lyrics) {
          this.lyrics._lastNow = -1;
          this.lyrics.activeLineIndex = -1;
          this.lyrics.updateActiveLine?.();
        }
        this.mathVisualizer?.setLyricsTimeline?.(syncedTimeline);
        // Re-apply translations if active (source check is now handled at the top of the event handler)
        if (this.settings?.showTranslation) {
          _dbg(`[lyrics] 🔄 Triggering translation after asset update (source=${source})`);
          this._fetchAndApplyTranslations?.();
        }
        _dbg(`[lyrics] ✅ Hot-reloaded ${data.lyrics.length} lines (hasWords=${data.hasWords})`);
      } catch (err) {
        _dbgWarn('[lyrics] Failed to reload after asset update:', err);
      }
    });
  }

  bindDocumentControls() {
    document.addEventListener('keydown', (event) => {
      // Don't intercept keys when user is typing in an editable element
      const target = event.target;
      if (target?.isContentEditable || target?.tagName === 'TEXTAREA') return;
      // If a range input has focus, let browser handle arrows natively (except we blur it for non-range keys)
      if (target?.tagName === 'INPUT' && target.type !== 'range') return;
      // If a range input is focused and arrow is pressed, prevent native range behavior and blur
      if (target?.tagName === 'INPUT' && target.type === 'range') {
        event.preventDefault();
        target.blur();
      }

      // If focus is on a button inside the track controls, let arrows navigate between buttons
      if ((event.key === 'ArrowLeft' || event.key === 'ArrowRight') && target?.closest?.('.music-track-buttons')) {
        const container = target.closest('.music-track-buttons');
        const buttons = [...container.querySelectorAll('button:not([disabled])')];
        const idx = buttons.indexOf(target);
        if (idx !== -1) {
          event.preventDefault();
          const next = event.key === 'ArrowLeft' ? buttons[idx - 1] : buttons[idx + 1];
          if (next) next.focus();
          return;
        }
      }

      // Arrow keys: seek (left/right) and volume (up/down)
      if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
        const audio = this.audioEngine?.audioElement;
        if (audio && audio.duration) {
          event.preventDefault();
          const step = event.shiftKey ? 30 : 5; // shift = 30s, normal = 5s
          const newTime = Math.max(0, Math.min(audio.duration, audio.currentTime + (event.key === 'ArrowLeft' ? -step : step)));
          audio.currentTime = newTime;
          // Update progress UI immediately
          if (this.pageUi?.progress) {
            this.pageUi.progress.value = String((newTime / audio.duration) * 1000);
          }
        }
        return;
      }
      if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
        event.preventDefault();
        const step = event.shiftKey ? 0.1 : 0.05;
        const newVol = Math.max(0, Math.min(1, this.settings.volume + (event.key === 'ArrowUp' ? step : -step)));
        this.settings.volume = newVol;
        this.audioEngine.setVolume(newVol);
        if (this.pageUi?.volume) {
          this.pageUi.volume.value = String(newVol);
        }
        return;
      }

      // Math visualizer scene switching (keys 1-5)
      if (this.isPlayerExpanded && this.settings.engineMode === 'premium' && this.mathVisualizer) {
        const sceneIdx = Number(event.key);
        if (sceneIdx >= 1 && sceneIdx <= 5) {
          this.mathVisualizer.setScene(sceneIdx - 1);
          return;
        }
      }

      if (event.key !== 'Escape') {
        return;
      }

      // If a focusable element (button, input, etc.) has keyboard focus inside the overlay, first ESC just blurs it
      const focused = document.activeElement;
      const overlayHost = document.getElementById('musicOverlayHost');
      if (focused && focused !== document.body && focused.tagName !== 'HTML' &&
          overlayHost?.contains(focused) &&
          (focused.tagName === 'BUTTON' || focused.tagName === 'INPUT' || focused.tagName === 'SELECT' ||
           focused.tagName === 'TEXTAREA' || focused.tagName === 'A' || focused.hasAttribute('tabindex'))) {
        event.preventDefault();
        event.stopPropagation();
        event.stopImmediatePropagation();
        focused.blur();
        return;
      }

      _dbg('[album-nav] ESC pressed: activeAlbumKey=%s isPlayerExpanded=%s isSettingsView=%s proActive=%s target=%s',
        this.activeAlbumKey, this.isPlayerExpanded, this.isSettingsView,
        document.body.classList.contains('chromic-pro-active'), target?.tagName);

      // Let ChromicEditor handle Escape first when pro mode is active
      if (document.body.classList.contains('chromic-pro-active')) {
        return;
      }

      // Skip if app.js already closed a popup on this ESC keystroke
      if (window._chromicEscClosedPopup) {
        _dbg('[ESC-debug] Blocked: popup was just closed by app.js');
        return;
      }

      // Close album bulk-select bar if open
      const albumSelectGrid = this.elements.grid?.querySelector('.music-albums-grid.album-select-mode');
      if (albumSelectGrid && !this.isPlayerExpanded) {
        event.stopImmediatePropagation();
        albumSelectGrid.classList.remove('album-select-mode');
        albumSelectGrid.querySelectorAll('.album-selected').forEach(c => c.classList.remove('album-selected'));
        albumSelectGrid.querySelectorAll('.album-select-check').forEach(c => c.remove());
        this.elements.grid.querySelector('.album-bulk-bar')?.remove();
        if (albumSelectGrid._albumSelectClick) {
          albumSelectGrid.removeEventListener('click', albumSelectGrid._albumSelectClick, true);
          albumSelectGrid._albumSelectClick = null;
        }
        return;
      }

      if (this.isSettingsPanelOpen()) {
        this.closeSettingsView();
        return;
      }

      // If viewing graveyard/trash view, go back to all albums
      if (!this.activeAlbumKey && !this.isPlayerExpanded && this.elements.grid?.querySelector('.graveyard-view')) {
        event.stopImmediatePropagation();
        const savedScroll = this._albumsScrollTop || 0;
        _dbg('[album-nav] ESC: leaving graveyard view, savedScroll=%d', savedScroll);
        const grid = this.elements.grid;
        grid._cachedAlbumsGrid = null;
        grid._cachedAlbumsFingerprint = null;
        this._backToAlbums = true;
        window._chromicResetSmoothScroll?.(savedScroll);
        this.renderLibrary();
        const albumsGrid = grid.querySelector('.music-albums-grid');
        if (albumsGrid) albumsGrid.style.contentVisibility = 'visible';
        albumsGrid?.querySelectorAll('.music-album-grid-item').forEach(c => c.style.contentVisibility = 'visible');
        window._chromicResetSmoothScroll?.(savedScroll);
        window.scrollTo({ top: savedScroll, behavior: 'instant' });
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            window._chromicResetSmoothScroll?.(savedScroll);
            window.scrollTo({ top: savedScroll, behavior: 'instant' });
            if (albumsGrid) albumsGrid.style.contentVisibility = '';
            albumsGrid?.querySelectorAll('.music-album-grid-item').forEach(c => c.style.contentVisibility = '');
          });
        });
        return;
      }

      // Close track select mode in album detail view if active
      if (this.activeAlbumKey && !this.isPlayerExpanded) {
        const bulkBar = this.elements.grid?.querySelector('.bulk-action-bar');
        if (bulkBar && !bulkBar.hidden) {
          event.stopImmediatePropagation();
          // Simulate cancel click
          const cancelBtn = bulkBar.querySelector('[data-bulk-action="cancel"]');
          if (cancelBtn) cancelBtn.click();
          return;
        }
      }

      // If viewing album detail (not expanded player), go back to all albums
      if (this.activeAlbumKey && !this.isPlayerExpanded) {
        // Don't navigate back if we just closed the overlay on this/previous Escape
        if (this._justClosedOverlay) {
          _dbg('[ESC-debug] Blocked: _justClosedOverlay flag is set');
          return;
        }
        // Don't close album view if a popup/menu/modal is open — let app.js handler close it first
        const floatingMenu = document.getElementById('chromic-floating-menu');
        const inlineMenus = document.querySelectorAll('[data-more-menu]:not([hidden])');
        const gridCtx = document.querySelector('.album-grid-context-menu');
        const navList = document.querySelector('.music-album-nav-list:not([hidden])');
        const hasOpenPopup = floatingMenu || inlineMenus.length || gridCtx || navList;
        _dbg('[ESC-debug] Popup check: floating=%o inlineMenus=%d gridCtx=%o navList=%o → hasOpenPopup=%o',
          !!floatingMenu, inlineMenus.length, !!gridCtx, !!navList, !!hasOpenPopup);
        if (hasOpenPopup) {
          _dbg('[ESC-debug] Blocked: popup is open, letting app.js close it');
          return;
        }
        event.stopImmediatePropagation();
        _dbg('[album-nav] ESC: going back to albums');
        const savedScroll = this._albumsScrollTop || 0;
        this.activeAlbumKey = null;
        this._backToAlbums = true;
        window._chromicResetSmoothScroll?.(savedScroll);
        window.scrollTo({ top: savedScroll, behavior: 'instant' });
        this.renderLibrary();
        window._chromicResetSmoothScroll?.(savedScroll);
        window.scrollTo({ top: savedScroll, behavior: 'instant' });
        return;
      }

      if (this.isPlayerExpanded) {
        event.stopImmediatePropagation();
        const settingsVisible = this.isSettingsPanelOpen();
        _dbg('[ESC-debug] Player expanded: isQueueSheetOpen=%s isSettingsView=%s settingsVisible=%s', this.isQueueSheetOpen, this.isSettingsView, settingsVisible);
        // Close sub-panels first before closing overlay itself
        if (this.isQueueSheetOpen) {
          this.isQueueSheetOpen = false;
          this.applyPageFlags();
          this.persistPlayerState();
          return;
        }
        if (settingsVisible) {
          this.closeSettingsView();
          return;
        }
        // Close HUD actions collapsible if expanded
        const hudCollapsible = this.getOverlayRoot()?.querySelector('#hudActionsCollapsible.is-expanded');
        if (hudCollapsible) {
          const hudBtn = this.getOverlayRoot()?.querySelector('#hudActionsToggle');
          if (hudBtn) this._toggleHudActions(hudBtn);
          return;
        }
        // Close any floating/inline menu inside the overlay before closing overlay
        const overlayFloating = document.getElementById('chromic-floating-menu');
        const overlayInlineMenus = document.querySelectorAll('[data-more-menu]:not([hidden])');
        if (overlayFloating || overlayInlineMenus.length) {
          if (overlayFloating) overlayFloating.remove();
          overlayInlineMenus.forEach(m => { m.hidden = true; });
          return;
        }
        this.closeOverlay();
      }
    });
  }

  handleBodyClick(event) {
    const lyricsPanel = event.target?.closest?.('.music-immersive-lyrics-panel');
    if (lyricsPanel && lyricsPanel.closest('#musicOverlayHost')) {
      // If user clicked a lyrics line, let LyricsEngine handle seek — don't close overlay
      const clickedLine = event.target?.closest?.('.lyrics-line[data-start]');
      if (clickedLine) return;
      // Clicking empty space in lyrics panel — do nothing (don't navigate to album)
      return;
    }

    // Handle clickable non-button elements (h1#mainTrackTitle, .track-metadata-left)
    const clickableTitle = event.target?.closest?.('#mainTrackTitle, .track-metadata-left');
    if (clickableTitle && clickableTitle.closest('#musicOverlayHost')) {
      // Ignore clicks on the artist name — no artist page yet
      if (event.target?.closest?.('#mainTrackArtist')) return;
      event.preventDefault();
      event.stopPropagation();
      this._navigateToCurrentTrackAlbum({ scrollToTrack: true });
      return;
    }

    const button = event.target?.closest?.('button');
    if (!button) {
      return;
    }

    if (button.closest('#musicOverlayHost')) {
      // Don't intercept clicks on ChromicEditor panels — they handle their own events
      if (button.closest('.chromic-timestamp-panel, .chromic-confirm-modal, .chromic-pro-badge, .chromic-word-hud, .chromic-inspector-report, .chromic-flow-bar, .chromic-editor')) {
        return;
      }
      event.preventDefault();
      event.stopPropagation();
      event.stopImmediatePropagation?.();
      this.handleOverlayButtonClick(button, event);
    }
  }

  handleOverlayCaptureClick(event) {
    if (!this.isPlayerExpanded) {
      return;
    }

    const overlayRoot = this.getOverlayRoot();
    if (!overlayRoot || !overlayRoot.contains(event.target)) {
      return;
    }

    this.handleBodyClick(event);
  }

  bindOverlayClickCapture() {
    if (this.overlayClickCaptureBound) {
      return;
    }

    window.addEventListener('click', this.boundOverlayCaptureClickHandler, true);
    this.overlayClickCaptureBound = true;
  }

  unbindOverlayClickCapture() {
    if (!this.overlayClickCaptureBound) {
      return;
    }

    window.removeEventListener('click', this.boundOverlayCaptureClickHandler, true);
    this.overlayClickCaptureBound = false;
  }

  handleOverlayButtonClick(button, event) {
    if (!button) {
      return;
    }

    _dbg('[music] overlay button click', {
      id: button.id || null,
      upNextId: button.dataset.upNextId || null,
      presetValue: button.dataset.presetValue || null,
      contentMode: button.dataset.contentMode || null,
      settingsSection: button.dataset.settingsSection || null,
    });

    if (button.dataset.upNextId) {
      this.playTrackById(button.dataset.upNextId, { autoplay: true, expand: true });
      return;
    }

    if (button.id === 'clearQueueBtn') {
      this.clearQueue();
      return;
    }

    if (button.id === 'saveQueueBtn') {
      this.saveQueueAsPlaylist();
      return;
    }

    if (button.dataset.presetValue) {
      this.settings.visualPreset = normalizePreset(String(button.dataset.presetValue || 'vaporwave-grid'));
      this.visualizer?.setPreset(this.settings.visualPreset);
      this.applyPageFlags();
      this.persistPlayerState({ immediate: true });
      return;
    }

    if (button.closest('#inlineTrackContentMode') && button.dataset.value) {
      this.settings.contentMode = String(button.dataset.value || 'visualizer');
      this.applyPageFlags();
      this.persistPlayerState({ immediate: true });
      return;
    }

    if (button.closest('#inlineEngineMode') && button.dataset.value) {
      this.switchEngineMode(String(button.dataset.value));
      this.syncInlineSettingsControls();
      this.persistPlayerState({ immediate: true });
      return;
    }

    if (button.closest('#inlineVisualizerColorMode') && button.dataset.value) {
      const segmentedValue = String(button.dataset.value || 'auto');
      this.settings.visualizerColorMode = segmentedValue;
      this.applyVisualizerColorMode();
      this.syncInlineSettingsControls();
      this.persistPlayerState({ immediate: true });
      return;
    }

    if (button.closest('#inlineFpsMax') && button.dataset.value != null) {
      this.settings.fpsMax = Number(button.dataset.value) || 0;
      this._applyFpsLimit();
      this.syncInlineSettingsControls();
      this.persistPlayerState({ immediate: true });
      return;
    }

    if (button.dataset.gpuScene != null) {
      const idx = Number(button.dataset.gpuScene);
      this.settings.gpuScene = idx;
      this.mathVisualizer?.setScene(idx);
      // Re-apply album palette after scene switch (Lava especially needs it)
      if (this._lastPalette?.length >= 3 && this.settings.visualizerColorMode === 'album' && this.mathVisualizer?.setPalette) {
        const toHex = (c) => `#${((1 << 24) | (c.r << 16) | (c.g << 8) | c.b).toString(16).slice(1)}`;
        this.mathVisualizer.setPalette([toHex(this._lastPalette[0]), toHex(this._lastPalette[1]), toHex(this._lastPalette[2])]);
      }
      this.syncInlineSettingsControls();
      this.persistPlayerState({ immediate: true });
      return;
    }

    if (button.dataset.settingsSection) {
      this.toggleSettingsSection(button.dataset.settingsSection);
      return;
    }

    switch (button.id) {
      case 'trackPrevBtn':
        this.playPrevious();
        break;
      case 'trackBack15Btn':
        this.seekBySeconds(-15);
        break;
      case 'trackPlayPauseBtn':
        this.togglePlayPause();
        break;
      case 'trackForward15Btn':
        this.seekBySeconds(15);
        break;
      case 'trackNextBtn':
        this.playNext({ dueToEnded: false });
        break;
      case 'trackShuffleBtn':
      case 'queueShuffleToggleBtn':
        this.toggleShuffle();
        break;
      case 'trackRepeatBtn':
      case 'queueRepeatToggleBtn':
        this.cycleRepeatMode();
        break;
      case 'playerCollapseBtn':
        this.closeOverlay();
        break;
      case 'trackSettingsBtn':
        if (this.isSettingsView) {
          this.closeSettingsView();
        } else {
          this.openSettingsView();
        }
        break;
      case 'musicTrackTitleTrigger':
        this.openSettingsView();
        break;
      case 'hudActionsToggle':
        this._toggleHudActions(button);
        break;
      case 'trackQueueBtn':
      case 'trackQueueSheetBtn':
      case 'queueCloseBtn':
        this.toggleQueueSheet();
        break;
      case 'visualModeBtn':
        this.settings.uiMode = this.settings.uiMode === 'visualizer-only' ? 'default' : 'visualizer-only';
        this.applyPageFlags();
        this.persistPlayerState({ immediate: true });
        break;
      case 'vizBlurBtn':
        this.toggleVisualizerBlur();
        break;
      case 'vizDimBtn':
        // Don't toggle if click originated from the slider wrap
        if (event?.target?.closest('#vizDimSliderWrap')) break;
        this.toggleVisualizerDim();
        break;
      case 'vizToggleBtn':
        this.toggleVisualizerOnOff();
        break;
      case 'textToggleBtn':
        this.settings.textEnabled = !this.settings.textEnabled;
        this.applyPageFlags();
        this.persistPlayerState({ immediate: true });
        { const tb = this.getOverlayRoot()?.querySelector('#textToggleBtn'); if (tb) { tb.classList.toggle('text-is-hidden', !this.settings.textEnabled); tb.setAttribute('aria-pressed', String(this.settings.textEnabled)); tb.title = this.settings.textEnabled ? 'Hide text & lyrics' : 'Show text & lyrics'; } }
        break;
      case 'translationToggleBtn':
        this._toggleTranslation();
        break;
      case 'settingsBackBtn':
        this.closeSettingsView();
        break;
      case 'aiSettingsSaveBtn':
        this._saveAiSettings();
        break;
      case 'aiSetupPythonBtn':
        this._runPythonSetupWizard();
        break;
      case 'aiSentimentBtn':
        this._fetchSentimentColors();
        break;
      default:
        break;
    }
  }

  async _loadAiSettings() {
    try {
      const res = await fetch('/api/settings/ai');
      const config = await res.json();
      const form = this.getOverlayRoot()?.querySelector('#aiSettingsForm');
      if (!form) return;
      for (const [key, val] of Object.entries(config)) {
        const input = form.querySelector(`[name="${key}"]`);
        if (input) input.value = val != null ? String(val) : '';
      }
      // Sync translation lang to player settings
      if (config.translationLang) this.settings.translationLang = config.translationLang;

      // Show/hide Ollama model field based on provider
      const providerSelect = form.querySelector('[name="aiProvider"]');
      const ollamaField = form.querySelector('.ai-ollama-model-field');
      const updateOllamaVisibility = () => {
        const isOllama = providerSelect?.value === 'ollama';
        if (ollamaField) ollamaField.style.display = isOllama ? '' : 'none';
        if (isOllama) this._fetchOllamaModels(form, config.ollamaModel);
      };
      providerSelect?.addEventListener('change', updateOllamaVisibility);
      updateOllamaVisibility();
      this._refreshPythonSetupStatus();
    } catch (e) { _dbgWarn('[AI Settings] Load failed:', e); }
  }

  async _refreshPythonSetupStatus() {
    const status = this.getOverlayRoot()?.querySelector('#aiSettingsStatus');
    const setupBtn = this.getOverlayRoot()?.querySelector('#aiSetupPythonBtn');
    if (!setupBtn) return;
    try {
      const res = await fetch('/api/setup/python/status');
      const data = await res.json();
      const ready = !!(data?.ok && data?.venvExists && data?.syncedlyricsCli && data?.whisperCli);
      setupBtn.textContent = ready ? 'Python Ready' : 'Setup Python';
      setupBtn.classList.toggle('is-ready', ready);
      if (ready) {
        setupBtn.title = 'Python environment is ready for lyrics features';
        if (status && !status.textContent) status.textContent = 'Python: ready';
      } else {
        setupBtn.title = 'Install required Python packages for lyrics engine';
      }
    } catch {
      setupBtn.textContent = 'Setup Python';
      setupBtn.title = 'Cannot check Python status';
    }
  }

  async _runPythonSetupWizard() {
    const status = this.getOverlayRoot()?.querySelector('#aiSettingsStatus');
    const setupBtn = this.getOverlayRoot()?.querySelector('#aiSetupPythonBtn');
    if (!setupBtn) return;
    setupBtn.disabled = true;
    if (status) status.textContent = 'Checking Python setup...';
    try {
      const statusRes = await fetch('/api/setup/python/status');
      const env = await statusRes.json();
      const ready = !!(env?.ok && env?.venvExists && env?.syncedlyricsCli && env?.whisperCli);
      if (ready) {
        if (status) status.textContent = 'Python is already ready';
        await this._refreshPythonSetupStatus();
        return;
      }

      // Show the installation modal with streaming progress
      this._showPythonInstallModal(env);
    } catch (e) {
      if (status) status.textContent = `Python setup error: ${e.message || e}`;
      setupBtn.disabled = false;
    }
  }

  _showPythonInstallModal(pythonStatus) {
    // Remove any existing modal
    document.querySelector('.python-install-modal')?.remove();

    const missingPackages = [];
    if (pythonStatus?.packages) {
      const pkgMap = {
        syncedlyrics: 'syncedlyrics',
        whisperCTranslate2: 'whisper-ctranslate2',
        fasterWhisper: 'faster-whisper',
        openaiWhisper: 'openai-whisper',
        imageioFfmpeg: 'imageio-ffmpeg',
        rapidfuzz: 'rapidfuzz',
        lyricsgenius: 'lyricsgenius',
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

    // Event handlers
    const closeModal = () => {
      modal.remove();
      const setupBtn = this.getOverlayRoot()?.querySelector('#aiSetupPythonBtn');
      if (setupBtn) setupBtn.disabled = false;
    };

    modal.querySelector('.python-install-close').onclick = closeModal;
    modal.querySelector('.python-install-cancel').onclick = closeModal;
    modal.onclick = (e) => { if (e.target === modal) closeModal(); };

    modal.querySelector('.python-install-start').onclick = () => {
      this._startStreamingInstall(modal);
    };
  }

  _startStreamingInstall(modal) {
    const info = modal.querySelector('.python-install-info');
    const terminal = modal.querySelector('.python-install-terminal');
    const output = modal.querySelector('.terminal-output');
    const progressBar = modal.querySelector('.terminal-progress-bar');
    const progressText = modal.querySelector('.terminal-progress-text');
    const footer = modal.querySelector('.python-install-footer');
    const startBtn = modal.querySelector('.python-install-start');
    const cancelBtn = modal.querySelector('.python-install-cancel');

    // Switch to terminal view
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

    // Start SSE connection
    const evtSource = new EventSource('/api/setup/python/install-stream');

    evtSource.onmessage = (e) => {
      try {
        const msg = JSON.parse(e.data);

        switch (msg.type) {
          case 'step':
            addLogLine(`▸ ${msg.label}`, 'step');
            if (msg.progress != null) {
              progressBar.style.width = `${msg.progress}%`;
              progressText.textContent = `${msg.progress}% (${msg.current}/${msg.total})`;
            }
            break;
          case 'log':
            addLogLine(msg.text, msg.type || 'log');
            break;
          case 'error':
            addLogLine(`✗ ${msg.message}`, 'error');
            break;
          case 'done':
            evtSource.close();
            if (msg.ok) {
              addLogLine('✓ Installation complete!', 'success');
              progressBar.style.width = '100%';
              progressText.textContent = '100%';
              startBtn.innerHTML = '✓ Done';
              startBtn.classList.add('success');
              this._refreshPythonSetupStatus();
              const status = this.getOverlayRoot()?.querySelector('#aiSettingsStatus');
              if (status) status.textContent = 'Python setup complete';
            } else {
              addLogLine('Installation failed. Check logs above.', 'error');
              startBtn.innerHTML = '✗ Failed';
              startBtn.classList.add('error');
            }
            cancelBtn.textContent = 'Close';
            const setupBtn = this.getOverlayRoot()?.querySelector('#aiSetupPythonBtn');
            if (setupBtn) setupBtn.disabled = false;
            break;
        }
      } catch (err) {
        _dbgWarn('[PythonInstall] Parse error:', err);
      }
    };

    evtSource.onerror = () => {
      evtSource.close();
      addLogLine('Connection lost. Please try again.', 'error');
      startBtn.innerHTML = '✗ Error';
      startBtn.disabled = false;
      const setupBtn = this.getOverlayRoot()?.querySelector('#aiSetupPythonBtn');
      if (setupBtn) setupBtn.disabled = false;
    };

    // Allow cancel to close SSE
    cancelBtn.onclick = () => {
      evtSource.close();
      modal.remove();
      const setupBtn = this.getOverlayRoot()?.querySelector('#aiSetupPythonBtn');
      if (setupBtn) setupBtn.disabled = false;
    };
  }

  async _fetchOllamaModels(form, currentModel, _retryCount = 0) {
    const select = form?.querySelector('[name="ollamaModel"]');
    const badge = form?.querySelector('#ollamaStatusBadge');
    if (!select) return;
    try {
      const res = await fetch('/api/ollama/models');
      const data = await res.json();
      if (!data.running) {
        // Retry once after 2s — Ollama may be loading a model
        if (_retryCount < 1) {
          if (badge) { badge.textContent = ' Checking…'; badge.title = 'Retrying connection...'; }
          setTimeout(() => this._fetchOllamaModels(form, currentModel, _retryCount + 1), 2000);
          return;
        }
        if (badge) { badge.textContent = ' Offline'; badge.title = 'Ollama is not running. Start it with: ollama serve'; }
        select.innerHTML = '<option value="">⚠️ Ollama not running</option>';
        return;
      }
      if (badge) { badge.textContent = ' Online'; badge.title = `${data.models.length} model(s) available`; }
      select.innerHTML = '<option value="">Auto-detect (first available)</option>';
      for (const m of data.models) {
        const opt = document.createElement('option');
        opt.value = m.name;
        opt.textContent = `${m.name} (${m.parameterSize || m.family || '?'})`;
        if (currentModel && m.name === currentModel) opt.selected = true;
        select.appendChild(opt);
      }
    } catch (e) {
      if (_retryCount < 1) {
        setTimeout(() => this._fetchOllamaModels(form, currentModel, _retryCount + 1), 2000);
        return;
      }
      if (badge) { badge.textContent = ' Error'; badge.title = e.message; }
      select.innerHTML = '<option value="">⚠️ Cannot reach Ollama</option>';
    }
  }

  async _saveAiSettings() {
    const form = this.getOverlayRoot()?.querySelector('#aiSettingsForm');
    const status = this.getOverlayRoot()?.querySelector('#aiSettingsStatus');
    if (!form) return;
    const data = {};
    form.querySelectorAll('input, select').forEach(el => {
      if (el.name) data[el.name] = el.value;
    });
    // Sync translation lang to player settings
    if (data.translationLang) this.settings.translationLang = data.translationLang;
    try {
      const res = await fetch('/api/settings/ai', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      if (status) { status.innerHTML = '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="rgba(100,220,140,0.9)" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:-2px;margin-right:2px"><polyline points="20 6 9 17 4 12"/></svg>Saved'; setTimeout(() => { status.textContent = ''; }, 2000); }
      // Trigger whisper warmup after settings change (engine/model may have changed)
      fetch('/api/setup/whisper-warmup/start', { method: 'POST' }).catch(() => {});
      // Emit readiness refresh event for album view controls
      window.dispatchEvent(new CustomEvent('whisper-settings-changed'));
    } catch (e) {
      if (status) { status.innerHTML = '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="rgba(255,100,100,0.9)" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:-2px;margin-right:2px"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>Error'; setTimeout(() => { status.textContent = ''; }, 3000); }
    }
  }

  // ─── Translation Toggle ──────────────────────────────────────────────────
  async _toggleTranslation() {
    const btn = this.getOverlayRoot()?.querySelector('#translationToggleBtn');
    const container = this.getOverlayRoot()?.querySelector('#musicLyricsStage');

    // If translation is currently generating, cancel it (client + server)
    if (this._translationAbort) {
      this._translationAbort.abort();
      this._translationAbort = null;
      // Cancel on server
      if (this._translationJobTrackPath) {
        fetch('/api/lyrics/translate-cancel', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ trackPath: this._translationJobTrackPath, targetLang: this.settings.translationLang }),
        }).catch(() => {});
        this._translationJobTrackPath = null;
      }
      // Reset UI state fully
      this.settings.showTranslation = false;
      if (btn) {
        btn.classList.remove('active');
        btn.setAttribute('aria-pressed', 'false');
      }
      this._setTranslationBtnState(btn, 'idle');
      container?.classList.remove('translations-loading', 'show-translations');
      this.mathVisualizer?.lyricsRenderer?.setTranslationsVisible(false);
      this.persistPlayerState({ immediate: true });
      _dbg('[Translation] Cancelled by user via toggle button');
      return;
    }

    this.settings.showTranslation = !this.settings.showTranslation;
    if (btn) {
      btn.classList.toggle('active', this.settings.showTranslation);
      btn.setAttribute('aria-pressed', String(this.settings.showTranslation));
    }
    // Toggle CSS class on lyrics container
    if (container) container.classList.toggle('show-translations', this.settings.showTranslation);
    this.mathVisualizer?.lyricsRenderer?.setTranslationsVisible(this.settings.showTranslation);

    if (this.settings.showTranslation) {
      await this._fetchAndApplyTranslations();
    }
    this.persistPlayerState({ immediate: true });
  }

  _setTranslationBtnState(btn, state) {
    if (!btn) return;
    const iconDefault = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10A15.3 15.3 0 0 1 12 2z"/></svg>`;
    const iconCancel = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10" opacity="0.4"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>`;

    if (state === 'loading') {
      btn.innerHTML = `<span class="translation-btn-wrap">${iconCancel}<span class="translation-btn-spinner"></span></span>`;
      btn.setAttribute('aria-label', 'Cancel translation');
      btn.title = 'Generating translation… Click to cancel';
      btn.classList.add('is-translating');
    } else {
      btn.innerHTML = iconDefault;
      btn.setAttribute('aria-label', 'Toggle translation');
      btn.title = '';
      btn.classList.remove('is-translating');
    }
  }

  _getTrackRelativePath(track) {
    return this._resolveTrackRelPath(track);
  }

  /**
   * On track change: check if translation is already cached.
   * If yes → apply it. If no → turn off the translation toggle (don't auto-generate).
   */
  async _fetchCachedTranslationOrTurnOff(track, trackPath) {
    if (!trackPath) trackPath = this._getTrackRelativePath(track);
    if (!trackPath) return;
    try {
      const res = await fetch('/api/lyrics/translate-status', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ trackPath, targetLang: this.settings.translationLang }),
      });
      const info = await res.json();
      if (info.status === 'done' && info.translations) {
        // Cached translation exists — apply it
        if (this.lyrics) this.lyrics.setTranslations(info.translations);this.mathVisualizer?.lyricsRenderer?.setTranslations(info.translations);
        this.mathVisualizer?.lyricsRenderer?.setTranslationsVisible(true);
        _dbg(`[Translation] ✅ Cached translation applied for "${track?.title}"`);
      } else if (info.status === 'running') {
        // Translation in progress — show loading state, don't turn off
        const btn = this.getOverlayRoot()?.querySelector('#translationToggleBtn');
        this._setTranslationBtnState(btn, 'loading');
      } else {
        // No cached translation — turn off toggle silently
        this.settings.showTranslation = false;
        const btn = this.getOverlayRoot()?.querySelector('#translationToggleBtn');
        if (btn) { btn.classList.remove('active'); btn.setAttribute('aria-pressed', 'false'); }
        const container = this.getOverlayRoot()?.querySelector('#musicLyricsStage');
        if (container) container.classList.remove('show-translations');
        _dbg(`[Translation] No cached translation for "${track?.title}" — toggle OFF`);
      }
    } catch (e) {
      _dbgWarn('[Translation] Cache check failed:', e.message);
    }
  }

  async _fetchAndApplyTranslations() {
    // Abort any in-flight translation first (client + server)
    if (this._translationAbort) {
      this._translationAbort.abort();
      this._translationAbort = null;
      if (this._translationJobTrackPath) {
        fetch('/api/lyrics/translate-cancel', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ trackPath: this._translationJobTrackPath, targetLang: this.settings.translationLang }),
        }).catch(() => {});
        this._translationJobTrackPath = null;
      }
    }

    const track = this.items[this.currentTrackIndex];
    const gpuTimeline = this.mathVisualizer?.lyricsRenderer?.timeline;
    const domTimeline = this.lyrics?.timeline;
    const activeTimeline = domTimeline?.length ? domTimeline : null;
    const hasAnyLyrics = !!(activeTimeline?.length || gpuTimeline?.length);
    if (!track || !hasAnyLyrics) {
      _dbg('[Translation] Skipped: no track or no timeline', { hasTrack: !!track, timelineLen: domTimeline?.length, gpuLines: gpuTimeline?.length });
      return;
    }

    const trackPath = this._getTrackRelativePath(track);
    if (!trackPath) {
      _dbg('[Translation] Skipped: could not resolve trackPath from', track?.url);
      return;
    }

    const trackIndex = this.currentTrackIndex;
    const btn = this.getOverlayRoot()?.querySelector('#translationToggleBtn');

    // Get lines from DOM timeline or fall back to GPU renderer lines
    let lines;
    if (activeTimeline?.length) {
      lines = activeTimeline.filter(e => e.type !== 'vocal_cue').map(e => ({ text: e.text || '' }));
    } else if (gpuTimeline?.length) {
      lines = gpuTimeline.filter(e => e.type !== 'vocal_cue').map(e => ({ text: e.text || '' }));
    } else {
      lines = [];
    }
    if (!lines.length) {
      _dbg('[Translation] Skipped: no non-cue lines in timeline');
      return;
    }

    _dbg(`[Translation] Starting for trackIndex=${trackIndex} path="${trackPath}" lang=${this.settings.translationLang} lines=${lines.length}`);
    _dbg(`[Translation] First 3 lines: ${lines.slice(0, 3).map(l => `"${l.text}"`).join(' | ')}`);

    // Register with AI Activity Hub
    const hubTaskId = `translate-${trackPath}-${this.settings.translationLang}`;
    const hubLabel = `Translating "${track?.title || 'track'}"`;
    window.aiHub?.addTask?.({ id: hubTaskId, type: 'translate', label: hubLabel, total: 1, trackPath, trackIndex });
    // Show loading state on button
    this._translationAbort = new AbortController();
    this._translationJobTrackPath = trackPath;
    this._setTranslationBtnState(btn, 'loading');

    // Show loading state on container
    const container = this.getOverlayRoot()?.querySelector('#musicLyricsStage');
    container?.classList.add('translations-loading');

    // Show toast
    const toastEl = this.getOverlayRoot()?.querySelector('#albumToast');

    try {
      // Start translation (returns immediately)
      const startRes = await fetch('/api/lyrics/translate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ trackPath, targetLang: this.settings.translationLang, lines }),
        signal: this._translationAbort.signal,
      });
      const startData = await startRes.json();
      _dbg(`[Translation] Server response:`, { status: startData.status, cached: startData.cached, hasTranslations: !!startData.translations, progress: startData.progress, total: startData.total });

      // Show initial progress toast (1-based: "working on chunk 1")
      if (startData.status === 'running') {
        this._showTranslationToast(toastEl, `Translating… ${(startData.progress || 0) + 1}/${startData.total}`, { autoHide: 2000 });
        window.aiHub?.updateTask?.(hubTaskId, startData.progress || 0, startData.total);
      }

      // If we got translations right away (cached), apply immediately
      if (startData.translations) {
        if (this.currentTrackIndex === trackIndex && this.lyrics) {
          const nonCueLines = lines.length;
          const transLines = startData.translations.length;
          if (Math.abs(transLines - nonCueLines) > 5) {
            _dbgWarn(`[Translation] ⚠️ Stale cache mismatch: ${transLines} translations vs ${nonCueLines} lines — forcing re-translate`);
            // Re-request with force
            try {
              const forceRes = await fetch('/api/lyrics/translate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ trackPath, targetLang: this.settings.translationLang, lines, force: true }),
                signal: this._translationAbort.signal,
              });
              const forceData = await forceRes.json();
              if (forceData.translations && this.currentTrackIndex === trackIndex) {
                this.lyrics.setTranslations(forceData.translations);
                this.mathVisualizer?.lyricsRenderer?.setTranslations(forceData.translations);
                this.mathVisualizer?.lyricsRenderer?.setTranslationsVisible(true);
                this._showTranslationToast(toastEl, 'Translated ✓');
              }
            } catch (fe) {
              if (fe.name !== 'AbortError') _dbgWarn('[Translation] Force re-translate failed:', fe.message);
            }
            window.aiHub?.completeTask?.(hubTaskId);
            return;
          }
          _dbg(`[Translation] Applying cached translations (${transLines} lines) to trackIndex=${trackIndex}`);
          this.lyrics.setTranslations(startData.translations);
          this.mathVisualizer?.lyricsRenderer?.setTranslations(startData.translations);
          this.mathVisualizer?.lyricsRenderer?.setTranslationsVisible(true);
          this._showTranslationToast(toastEl, startData.cached ? 'Translation loaded' : 'Translated ✓');
          window.aiHub?.completeTask?.(hubTaskId);
          document.dispatchEvent(new CustomEvent('chromic:track-assets-updated', { detail: { trackPath, source: 'translation' } }));
        } else {
          _dbgWarn(`[Translation] Track changed during fetch! was=${trackIndex} now=${this.currentTrackIndex}`);
          window.aiHub?.completeTask?.(hubTaskId);
        }
        return;
      }

      // Poll for translation progress
      if (startData.status === 'running') {
        const targetLang = this.settings.translationLang;
        const pollInterval = 3000;
        let pollCount = 0;
        const maxPolls = 200; // 10 minutes max
        let lastShownProgress = (startData.progress || 0) + 1;

        while (pollCount < maxPolls) {
          if (this._translationAbort?.signal?.aborted || this.currentTrackIndex !== trackIndex) {
            _dbg('[Translation] Polling stopped (aborted or track changed)');
            return;
          }

          await new Promise(r => setTimeout(r, pollInterval));
          pollCount++;

          try {
            const statusRes = await fetch('/api/lyrics/translate-status', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ trackPath, targetLang }),
              signal: this._translationAbort?.signal,
            });
            const status = await statusRes.json();

            if (status.status === 'running') {
              const currentProgress = status.progress + 1;
              if (currentProgress !== lastShownProgress) {
                lastShownProgress = currentProgress;
                this._showTranslationToast(toastEl, `Translating… ${currentProgress}/${status.total}`, { autoHide: 2000 });
              }
              window.aiHub?.updateTask?.(hubTaskId, status.progress, status.total);
            } else if (status.status === 'done' && status.translations) {
              if (this.currentTrackIndex === trackIndex && this.lyrics) {
                _dbg(`[Translation] ✅ Done! Applying ${status.translations.length} translations to trackIndex=${trackIndex}, path="${trackPath}"`);
                _dbg(`[Translation] First 2 translations: ${status.translations.slice(0, 2).map(t => `"${t}"`).join(' | ')}`);
                this.lyrics.setTranslations(status.translations);
                this.mathVisualizer?.lyricsRenderer?.setTranslations(status.translations);
                this.mathVisualizer?.lyricsRenderer?.setTranslationsVisible(true);                this._showTranslationToast(toastEl, 'Translated ✓');
              } else {
                _dbgWarn(`[Translation] Track changed! Discarding. was=${trackIndex} now=${this.currentTrackIndex}`);
              }
              window.aiHub?.completeTask?.(hubTaskId);
              document.dispatchEvent(new CustomEvent('chromic:track-assets-updated', { detail: { trackPath, source: 'translation' } }));
              return;
            } else if (status.status === 'error') {
              _dbgWarn('[Translation] Failed:', status.error);
              this._showTranslationToast(toastEl, 'Translation failed');
              window.aiHub?.failTask?.(hubTaskId);
              return;
            } else {
              // status 'none' — job disappeared? retry start
              return;
            }
          } catch (pollErr) {
            if (pollErr.name === 'AbortError') return;
            _dbgWarn('[Translation] Poll error:', pollErr.message);
          }
        }
      }
    } catch (e) {
      if (e.name === 'AbortError') {
        _dbg('[Translation] Cancelled by user');
      } else {
        _dbgWarn('[Translation] Failed:', e.message);
        this._showTranslationToast(toastEl, 'Translation failed');
      }
    } finally {
      this._translationAbort = null;
      this._translationJobTrackPath = null;
      this._setTranslationBtnState(btn, 'idle');
      container?.classList.remove('translations-loading');
    }
  }

  _showTranslationToast(el, text, { autoHide = 4000 } = {}) {
    if (!el) return;
    clearTimeout(this._albumToastTimer);
    clearTimeout(this._albumToastFadeTimer);

    // If already showing with different text, fade out → update → fade in
    if (el.classList.contains('show') && el.textContent !== text) {
      el.style.transition = 'opacity 0.25s ease, transform 0.25s ease';
      el.classList.remove('show');
      this._albumToastFadeTimer = setTimeout(() => {
        el.textContent = text;
        el.classList.add('show');
        // Restore original transition after fade-in starts
        setTimeout(() => { el.style.transition = ''; }, 50);
        this._albumToastTimer = setTimeout(() => el.classList.remove('show'), autoHide);
      }, 280);
    } else {
      el.textContent = text;
      el.classList.add('show');
      this._albumToastTimer = setTimeout(() => el.classList.remove('show'), autoHide);
    }
  }

  async _fetchAndApplyTransliteration(mode = 'romaji') {
    const track = this.items[this.currentTrackIndex];
    if (!track || !this.lyrics?.timeline?.length) return;

    const trackPath = this._getTrackRelativePath(track);
    if (!trackPath) return;

    const lines = this.lyrics.timeline.filter(e => e.type !== 'vocal_cue').map(e => ({ text: e.text || '' }));
    if (!lines.length) return;

    try {
      const res = await fetch('/api/lyrics/transliterate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ trackPath, mode, lines }),
      });
      const data = await res.json();
      if (data.transliterations && this.lyrics) {
        this.lyrics.setTranslations(data.transliterations);
        this.mathVisualizer?.lyricsRenderer?.setTranslations(data.transliterations);
        this.mathVisualizer?.lyricsRenderer?.setTranslationsVisible(true);
      }
    } catch (e) {
      _dbgWarn('[Transliteration] Failed:', e.message);
    }
  }

  /**
   * Poll backend for Whisper word-level enhancement status.
  /**
   * After page reload, check if the server has in-progress tasks for the current track
   * (enhancement/translation) and resume polling + AI Hub tracking.
   */
  async _resumeServerTasks(track) {
    if (!track) return;
    const trackPath = this._getTrackRelativePath(track);
    if (!trackPath) return;
    const hub = window.aiHub;

    // Check for in-progress enhancement
    try {
      const res = await fetch('/api/lyrics/enhance-status', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ trackPath }),
      });
      const info = await res.json();
      if (info.status === 'running') {
        _dbg('[resume] Enhancement in progress, resuming poll for', trackPath);
        // Only add hub task if no lyrics task already exists for this track
        if (!this._lyricsHubTaskId || !hub?.tasks?.has(this._lyricsHubTaskId)) {
          const hubTaskId = `lyrics-resume-${trackPath}-${Date.now()}`;
          hub?.addTask({ id: hubTaskId, type: 'lyrics', label: `Lyrics: ${track.title || trackPath.split('/').pop()}`, total: 1, trackPath, trackIndex: this.currentTrackIndex ?? -1 });
          if (info.stepLabel || info.step) hub?.updateTask(hubTaskId, 0, 1, info.stepLabel, info.step);
          this._lyricsHubTaskId = hubTaskId;
        }
        // Resume whisper polling
        const meta = track;
        this._pollWhisperEnhancement(track, meta);
      }
    } catch (e) { _dbgWarn('[resume] enhance-status check failed:', e.message); }

    // Check for in-progress translation
    if (this.settings.showTranslation) {
      try {
        const res = await fetch('/api/lyrics/translate-status', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ trackPath, targetLang: this.settings.translationLang }),
        });
        const info = await res.json();
        if (info.status === 'running') {
          _dbg('[resume] Translation in progress, resuming for', trackPath);
          // _fetchAndApplyTranslations will handle polling — it's already called
          // from the lyrics load path when showTranslation is true.
          // Just register in hub:
          const hubTaskId = `translate-${trackPath}-${this.settings.translationLang}`;
          hub?.addTask({ id: hubTaskId, type: 'translate', label: `Translating "${track.title || 'track'}"`, total: info.total || 1, trackPath, trackIndex: this.currentTrackIndex ?? -1 });
          if (info.progress !== undefined) hub?.updateTask(hubTaskId, info.progress, info.total);
          // Show loading state on translation button
          const btn = this.getOverlayRoot()?.querySelector('#translationToggleBtn');
          this._setTranslationBtnState(btn, 'loading');
        } else if (info.status === 'done' && info.translations) {
          // Translation finished while we were reloading — apply immediately
          _dbg('[resume] Translation already done, applying');
          if (this.lyrics) this.lyrics.setTranslations(info.translations);
          this.mathVisualizer?.lyricsRenderer?.setTranslations(info.translations);
          this.mathVisualizer?.lyricsRenderer?.setTranslationsVisible(true);
        }
      } catch (e) { _dbgWarn('[resume] translate-status check failed:', e.message); }
    }
  }

  /**
   * Poll for Whisper-based lyrics enhancement while the aligner is running.
   * Shows a small badge on the lyrics panel, and auto-refreshes lyrics when done.
   */
  _pollWhisperEnhancement(track, meta) {
    // Kill any previous poll
    if (this._whisperPollTimer) clearInterval(this._whisperPollTimer);

    const trackPath = this._getTrackRelativePath(track);
    if (!trackPath) return;
    const trackIndex = this.currentTrackIndex;

    // Show enhancing badge
    const container = this.getOverlayRoot()?.querySelector('#musicLyricsStage');
    let badge = container?.querySelector('.lyrics-enhancing-badge');
    if (!badge && container) {
      badge = document.createElement('div');
      badge.className = 'lyrics-enhancing-badge';
      badge.innerHTML = '<span class="enhancing-dot"></span><span>Enhancing lyrics…</span>';
      container.style.position = 'relative';
      container.appendChild(badge);
    }

    let pollCount = 0;
    this._whisperPollTimer = setInterval(async () => {
      pollCount++;
      // Abort if track changed or too many polls (5 min max)
      if (this.currentTrackIndex !== trackIndex || pollCount > 60) {
        clearInterval(this._whisperPollTimer);
        this._whisperPollTimer = null;
        badge?.remove();
        return;
      }

      try {
        const res = await fetch('/api/lyrics/enhance-status', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ trackPath }),
        });
        const info = await res.json();

        if (info.status === 'done') {
          clearInterval(this._whisperPollTimer);
          this._whisperPollTimer = null;
          _dbg('[lyrics] ✅ Whisper enhancement complete, refreshing lyrics...');
          document.dispatchEvent(new CustomEvent('chromic:track-assets-updated', { detail: { trackPath } }));

          // Show "done" state briefly
          if (badge) {
            badge.classList.add('done');
            badge.querySelector('span:last-child').textContent = 'Enhanced ✓';
            setTimeout(() => badge?.remove(), 3000);
          }

          // Re-fetch enhanced lyrics from sidecar and rebuild timeline
          if (this.currentTrackIndex === trackIndex) {
            const refreshRes = await fetch('/api/lyrics/refresh', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ trackPath }),
            });
            const refreshData = await refreshRes.json();
            if (refreshData.lyrics && refreshData.hasWords && this.currentTrackIndex === trackIndex) {
              _dbg(`[lyrics]  Hot-swapping ${refreshData.lyrics.length} enhanced lines`);
              this.currentLyrics = refreshData.lyrics;
              // Rebuild the synced timeline with real word timestamps
              const syncedTimeline = this.currentLyrics.map((l, idx) => {
                if (l.type === 'vocal_cue') {
                  return { type: 'vocal_cue', start: parseFloat(l.time) || 0, end: parseFloat(l.end) || 0, text: '' };
                }
                const text = l.text || '';
                let startSec = parseFloat(l.start ?? l.time ?? 0);
                let endSec = parseFloat(l.end ?? (this.currentLyrics[idx + 1]?.time ?? startSec + 3));
                if (Array.isArray(l.words) && l.words.length > 0 && l.words[0].start !== undefined) {
                  const wordData = l.words.map(w => ({
                    text: w.word || w.text || w,
                    start: parseFloat(w.start),
                    end: parseFloat(w.end),
                  }));
                  const lastEnd = wordData[wordData.length - 1]?.end;
                  if (lastEnd > endSec) endSec = lastEnd;
                  return { type: 'line', text: String(text), start: startSec, end: endSec, words: wordData };
                }
                return { type: 'line', text: String(text), start: startSec, end: endSec };
              });
              const audioTime = this.audioEngine.audioElement.currentTime;
              const lyricsPayload = {
                ...track,
                lyrics: this.currentLyrics.map(l => l.text || l),
                enhancedLyrics: { timeline: syncedTimeline },
                album: meta?.album,
                year: meta?.year,
              };
              this._pendingSyncedLyricsPayload = lyricsPayload;
              await this.lyrics.setTrack(lyricsPayload);
              if (this.lyrics) {
                this.lyrics._lastNow = -1;
                this.lyrics.activeLineIndex = -1;
                this.lyrics.updateActiveLine?.();
              }
              this.mathVisualizer?.setLyricsTimeline?.(syncedTimeline);
              // Re-apply translations if active
              if (this.settings.showTranslation) {
                this._fetchAndApplyTranslations();
              }
            }
          }
        } else if (info.status === 'failed') {
          clearInterval(this._whisperPollTimer);
          this._whisperPollTimer = null;
          if (badge) {
            badge.querySelector('span:last-child').textContent = 'Line-level only';
            setTimeout(() => badge?.remove(), 3000);
          }
        }
      } catch (e) {
        // Silently retry
      }
    }, 5000); // Poll every 5 seconds
  }

  async _fetchSentimentColors() {
    const track = this.items[this.currentTrackIndex];
    if (!track || !this.lyrics?.timeline?.length) return;

    const lines = this.lyrics.timeline.filter(e => e.type !== 'vocal_cue').map(e => e.text || '').filter(Boolean);
    if (!lines.length) return;

    try {
      const res = await fetch('/api/lyrics/sentiment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ lines, songTitle: track.title || track.name, artist: track.artist }),
      });
      const data = await res.json();
      if (data.colors && Array.isArray(data.colors) && data.colors.length >= 3) {
        // Apply to GPU visualizer if no album palette
        if (this.settings.visualizerColorMode !== 'album' && this.mathVisualizer?.setPalette) {
          this.mathVisualizer.setPalette(data.colors);
        }
        // Store for later use
        this._sentimentColors = data;
        _dbg(`[Sentiment] Mood: ${data.mood}, Colors: ${data.colors.join(', ')}`);
      }
    } catch (e) {
      _dbgWarn('[Sentiment] Failed:', e.message);
    }
  }

  async _explainWord(word, lineText) {
    const track = this.items[this.currentTrackIndex];
    try {
      const res = await fetch('/api/lyrics/explain-word', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          word,
          lineText,
          songTitle: track?.title || track?.name || '',
          artist: track?.artist || '',
        }),
      });
      const data = await res.json();
      return data.explanation || '';
    } catch { return ''; }
  }

  bindAudioEvents() {
    this.audioUnsubs.forEach((off) => off());
    this.audioUnsubs = [
      this.audioEngine.on('timeupdate', () => {
        // Feed audio time to GPU lyrics renderer (Troika text with bloom)
        this.mathVisualizer?.setCurrentTime?.(this.audioEngine.getCurrentTime());
        // Always update zen lyrics — they have their own scroll guard
        this.updateZenLyrics(this.audioEngine.getCurrentTime());
        // Drift check: if LyricsEngine active line is >0.5s out of sync, force resync
        // BUT skip during active seek operations (preciseSeek handles its own sync)
        if (this.lyrics && this.lyrics.timeline?.length && this.lyrics.activeLineIndex >= 0 && !this.lyrics.isSeeking) {
          const audioNow = this.audioEngine.getCurrentTime();
          const activeEntry = this.lyrics.timeline[this.lyrics.activeLineIndex];
          if (activeEntry && (audioNow < activeEntry.start - 0.5 || audioNow > activeEntry.end + 0.5)) {
            this.lyrics._lastNow = -1;
            this.lyrics.activeLineIndex = -1;
            this.lyrics.updateActiveLine?.();
          }
        }
        // Throttle only seek-bar / timer DOM updates during scroll
        if (scrollGuardian.isScrolling) return;
        this.updateProgressUi();
        this.syncPlaybackTime();
      }),
      this.audioEngine.on('loadedmetadata', () => this.updateProgressUi()),
      // Clear stale restore target on any seek (lyrics click, progress bar, etc.)
      this.audioEngine.on('seeked', () => {
        this._pendingSeekTarget = null;
        this._restoredFromReload = false;
        // Feed audio time to GPU lyrics on seek
        this.mathVisualizer?.setCurrentTime?.(this.audioEngine.getCurrentTime());
      }),
      this.audioEngine.on('play', () => {
        this.updatePlayButtons();
        this.startProgressLoop();
        this.persistPlayerState();
        // Ensure lyrics sync loop is running when playback starts
        if (this.lyrics && !this.lyrics.frameId) {
          this.lyrics.start();
        }
        // Force lyrics resync on play — combats race condition where lyrics
        // initialized at wrong time before audio seek landed
        // BUT skip if lyrics engine is mid-seek (preciseSeek will handle it)
        if (this.lyrics && this.lyrics.timeline?.length && !this.lyrics.isSeeking) {
          this.lyrics._lastNow = -1;
          this.lyrics.activeLineIndex = -1;
          this.lyrics.updateActiveLine?.();
        }
      }),
      this.audioEngine.on('pause', () => {
        this.stopProgressLoop();
        this.updatePlayButtons();
        this.persistPlayerState({ immediate: true });
      }),
      this.audioEngine.on('ended', () => this.handleTrackEnded()),
      this.audioEngine.on('error', () => this.setTrackWarning('This browser may not support this audio format. Use direct open/download fallback.')),
    ];
  }

  stopProgressLoop() {
    if (this.progressFrameId) {
      window.cancelAnimationFrame(this.progressFrameId);
      this.progressFrameId = null;
    }
  }

  startProgressLoop() {
    this.stopProgressLoop();
    let _plLastFrame = 0;
    let _plDropCount = 0;
    let _plDropTimer = 0;
    let _scrollSkipStart = 0; // Track how long we've been skipping updates
    // Perf monitoring: track frame times to detect overheating sources
    let _perfFrameCount = 0;
    let _perfTotalTime = 0;
    let _perfMaxTime = 0;
    let _perfLastReport = performance.now();
    const tick = () => {
      const now = performance.now();
      // Perf: report every 60s
      _perfFrameCount++;
      if (now - _perfLastReport > 60000) {
        const avgMs = _perfFrameCount > 0 ? (_perfTotalTime / _perfFrameCount).toFixed(2) : '?';
        if (window.__DEBUG__) _dbg(
          `[perf-monitor] 🔥 progressLoop: ${_perfFrameCount} frames in 60s | avg: ${avgMs}ms | max: ${_perfMaxTime.toFixed(1)}ms | ` +
          `rAF loops: progress=${this.progressFrameId?1:0} accent=${this.audioReactiveAccentFrameId?1:0} | ` +
          `vizRunning: ${this._globalPlayerViz?._running ? 'yes' : 'no'}`
        );
        _perfFrameCount = 0;
        _perfTotalTime = 0;
        _perfMaxTime = 0;
        _perfLastReport = now;
      }
      if (_plLastFrame > 0) {
        const delta = now - _plLastFrame;
        if (delta > 25 && scrollGuardian.isScrolling) {
          _plDropCount++;
          clearTimeout(_plDropTimer);
          _plDropTimer = setTimeout(() => {
            if (_plDropCount > 0) {
              _dbgWarn(`[scroll-perf] progressLoop: ${_plDropCount} dropped frames during scroll (>25ms)`);
              _plDropCount = 0;
            }
          }, 500);
        }
      }
      _plLastFrame = now;
      // Skip seek bar / timer updates during scroll for smooth performance
      // BUT cap the skip duration at 500ms to prevent permanent freeze (e.g. after resize)
      if (scrollGuardian.isScrolling) {
        if (_scrollSkipStart === 0) _scrollSkipStart = now;
        if (now - _scrollSkipStart < 500) {
          // Still within safe skip window — skip update
        } else {
          // Been skipping too long — force update to prevent stuck UI
          this.updateProgressUi();
        }
      } else {
        _scrollSkipStart = 0;
        this.updateProgressUi();
      }
      // Write FFT data to SharedArrayBuffer for visualizer worker (zero-copy)
      // Skip during scroll — FFT reads are expensive and compositor needs the frame budget
      if (!scrollGuardian.isScrolling) {
        this.audioEngine.updateSharedBuffer();
      }
      // Feed audio data to global player aurora (skip when overlay open — viz is stopped)
      // Also skip during scroll to reduce main-thread work
      // Throttle to ~30fps to save CPU (aurora doesn't need 60fps updates)
      if (!scrollGuardian.isScrolling && this._globalPlayerViz && this._globalPlayerVizEnabled && this._globalPlayerViz._running) {
        if (!this._gpvLastTime || now - this._gpvLastTime > 33) {
          this._gpvLastTime = now;
          const analyser = this.audioEngine?.getAnalyser?.();
          if (analyser) {
          if (!this._gpvBuffer || this._gpvBuffer.length !== analyser.frequencyBinCount) {
            this._gpvBuffer = new Uint8Array(analyser.frequencyBinCount);
          }
          analyser.getByteFrequencyData(this._gpvBuffer);
          // Bass: avg of bins 0-8, RMS: avg of all bins
          let bassSum = 0, totalSum = 0;
          for (let i = 0; i < this._gpvBuffer.length; i++) {
            totalSum += this._gpvBuffer[i];
            if (i < 8) bassSum += this._gpvBuffer[i];
          }
          this._globalPlayerViz.update(
            (bassSum / 8) / 255,
            (totalSum / this._gpvBuffer.length) / 255
          );
        }
        }
      }
      if (!this.audioEngine.isPlaying()) {
        this.progressFrameId = null;
        // Perf: measure frame time
        const _frameEnd = performance.now();
        const _frameDur = _frameEnd - now;
        _perfTotalTime += _frameDur;
        if (_frameDur > _perfMaxTime) _perfMaxTime = _frameDur;
        return;
      }
      // Perf: measure frame time
      const _frameEnd = performance.now();
      const _frameDur = _frameEnd - now;
      _perfTotalTime += _frameDur;
      if (_frameDur > _perfMaxTime) _perfMaxTime = _frameDur;
      this.progressFrameId = window.requestAnimationFrame(tick);
    };
    this.progressFrameId = window.requestAnimationFrame(tick);
  }

  syncPlaybackTime() {
    const second = Math.floor(this.audioEngine.getCurrentTime());
    if (second === this.lastSyncedSecond) {
      return;
    }

    this.lastSyncedSecond = second;
    this.persistPlayerState();
  }

  syncQueueWithItems() {
    const beforeQueue = this.queueTrackIds.length;
    const beforeShuffled = this.shuffledQueueIds.length;
    const validTrackIds = new Set(this.items.map((track) => track.id));
    this.queueTrackIds = this.queueTrackIds.filter((trackId) => validTrackIds.has(trackId));
    if (!this.queueTrackIds.length) {
      // _dbg('[SHUFFLE-DEBUG] syncQueueWithItems: queueTrackIds was empty, defaulting to all items');
      this.queueTrackIds = this.items.map((track) => track.id);
    }

    if (!this.shuffledQueueIds.length) {
      // _dbg('[SHUFFLE-DEBUG] syncQueueWithItems: shuffledQueueIds empty, rebuilding from queueTrackIds');
      this.shuffledQueueIds = shuffleList(this.queueTrackIds, this.store.getState().musicCurrentTrackId);
    } else {
      this.shuffledQueueIds = this.shuffledQueueIds.filter((trackId) => validTrackIds.has(trackId));
      const missingIds = this.queueTrackIds.filter((trackId) => !this.shuffledQueueIds.includes(trackId));
      if (missingIds.length) {
        // _dbg('[SHUFFLE-DEBUG] syncQueueWithItems: adding missing IDs to shuffledQueueIds:', missingIds.length);
      }
      this.shuffledQueueIds.push(...shuffleList(missingIds));
    }
    // _dbg('[SHUFFLE-DEBUG] syncQueueWithItems: before=%d/%d after=%d/%d', beforeQueue, beforeShuffled, this.queueTrackIds.length, this.shuffledQueueIds.length);
  }

  getActiveQueueIds() {
    const result = this.settings.isShuffle ? this.shuffledQueueIds : this.queueTrackIds;
    // _dbg('[SHUFFLE-DEBUG] getActiveQueueIds: isShuffle=%s returning %s queue with %d items', this.settings.isShuffle, this.settings.isShuffle ? 'shuffled' : 'normal', result.length);
    return result;
  }

  getQueueIndex(trackId = this.currentTrackId()) {
    return this.getActiveQueueIds().findIndex((item) => item === trackId);
  }

  getUpcomingTracks(limit = Infinity) {
    const activeQueue = this.getActiveQueueIds();
    const currentIndex = this.getQueueIndex();
    if (currentIndex < 0) {
      return [];
    }

    return activeQueue
      .slice(currentIndex + 1, currentIndex + 1 + limit)
      .map((trackId) => this.items.find((track) => track.id === trackId))
      .filter(Boolean);
  }

  rebuildShuffledQueue() {
    this.shuffledQueueIds = shuffleList(this.queueTrackIds, this.currentTrackId());
  }

  toggleShuffle(forceValue = null) {
    this.settings.isShuffle = typeof forceValue === 'boolean' ? forceValue : !this.settings.isShuffle;
    if (this.settings.isShuffle) {
      this.rebuildShuffledQueue();
    }
    this.updateShuffleButtons();
    this.updateQueueUi();
    this.persistPlayerState({ immediate: true });
  }

  cycleRepeatMode() {
    const currentIndex = REPEAT_MODES.indexOf(this.repeatMode);
    this.repeatMode = REPEAT_MODES[(currentIndex + 1) % REPEAT_MODES.length];
    this.updateRepeatButtons();
    this.persistPlayerState({ immediate: true });
  }

  clearQueue() {
    const currentTrackId = this.currentTrackId();
    this.queueTrackIds = currentTrackId ? [currentTrackId] : [];
    this.shuffledQueueIds = currentTrackId ? [currentTrackId] : [];
    this.updateQueueUi();
    this.persistPlayerState({ immediate: true });
  }

  _primeAlbumFirstQueue(trackId) {
    const selectedTrack = this.getTrackById(trackId);
    if (!selectedTrack) return;

    const albumKey = getTrackAlbumKey(selectedTrack);
    const albumTracks = this.items.filter((t) => getTrackAlbumKey(t) === albumKey);
    if (!albumTracks.length) return;

    const albumIds = albumTracks.map((t) => t.id);
    const clickedIndex = albumIds.indexOf(trackId);
    const rotatedAlbumIds = clickedIndex > 0
      ? [...albumIds.slice(clickedIndex), ...albumIds.slice(0, clickedIndex)]
      : albumIds;

    const remainingIds = this.items
      .map((t) => t.id)
      .filter((id) => !albumIds.includes(id));

    const mixedTail = shuffleList(remainingIds);
    const queue = [...rotatedAlbumIds, ...mixedTail];

    this.queueTrackIds = queue;
    // Keep same order even when shuffle mode is currently enabled.
    this.shuffledQueueIds = queue.slice();
    this._currentAlbumKey = albumKey;
    this.updateQueueUi();
    this.persistPlayerState({ immediate: true });
  }

  reorderQueue(sourceId, targetId) {
    if (!sourceId || !targetId || sourceId === targetId) {
      return;
    }

    const activeOrder = reorderQueueIds(this.getActiveQueueIds(), sourceId, targetId);
    if (this.settings.isShuffle) {
      this.shuffledQueueIds = activeOrder;
    }
    this.queueTrackIds = activeOrder.slice();
    this.updateQueueUi();
    this.persistPlayerState({ immediate: true });
  }

  saveQueueAsPlaylist() {
    const existing = Object.keys(this.persistence?.getPlaylists?.() || {});
    const playlistName = `Playlist ${existing.length + 1}`;
    const tracks = this.getActiveQueueIds()
      .map((trackId) => this.getTrackById(trackId))
      .filter(Boolean)
      .map((track) => ({
        id: track.id,
        title: track.title || track.name,
        album: track.album || 'Singles',
        artist: track.artist || 'Unknown Artist',
        url: track.url,
      }));

    this.persistence?.savePlaylist?.(playlistName, tracks);
    this.setTrackWarning(`Saved current queue as ${playlistName}.`);
  }

  clearIdleTimer() {
    if (this.idleTimer) {
      clearTimeout(this.idleTimer);
      this.idleTimer = null;
    }
  }

  armIdleTimer() {
    this.clearIdleTimer();
    if (!this.isPlayerExpanded || !this.pageUi?.page) {
      return;
    }

    this.idleTimer = window.setTimeout(() => {
      this.isScreenSaverIdle = true;
      this.applyPageFlags();
    }, this.idleTimeoutMs);
  }

  handleIdleActivity() {
    if (!this.isPlayerExpanded || !this.pageUi?.page) {
      return;
    }

    if (this.isScreenSaverIdle) {
      this.isScreenSaverIdle = false;
      this.applyPageFlags();
    }
    this.armIdleTimer();
  }

  bindIdleWatchers() {
    if (this.idleWatchersBound) {
      this.armIdleTimer();
      return;
    }

    ['pointermove', 'pointerdown', 'keydown', 'touchstart', 'wheel', 'scroll'].forEach((eventName) => {
      window.addEventListener(eventName, this.boundIdleActivityHandler, { passive: true });
    });
    this.idleWatchersBound = true;
    this.armIdleTimer();
  }

  unbindIdleWatchers() {
    if (this.idleWatchersBound) {
      ['pointermove', 'pointerdown', 'keydown', 'touchstart', 'wheel', 'scroll'].forEach((eventName) => {
        window.removeEventListener(eventName, this.boundIdleActivityHandler, { passive: true });
      });
      this.idleWatchersBound = false;
    }

    this.clearIdleTimer();
    this.isScreenSaverIdle = false;
  }

  enqueueTrackById(trackId, position = 'later') {
    if (!trackId) {
      return;
    }

    this.syncQueueWithItems();
    this.queueTrackIds = this.queueTrackIds.filter((item) => item !== trackId);
    const activeTrackId = this.currentTrackId();
    const insertionIndex = Math.max(0, this.queueTrackIds.indexOf(activeTrackId) + 1);
    if (position === 'next' && insertionIndex > 0) {
      this.queueTrackIds.splice(insertionIndex, 0, trackId);
    } else {
      this.queueTrackIds.push(trackId);
    }

    if (this.settings.isShuffle) {
      this.shuffledQueueIds = this.shuffledQueueIds.filter((item) => item !== trackId);
      const shuffledIndex = Math.max(0, this.shuffledQueueIds.indexOf(activeTrackId) + 1);
      if (position === 'next' && shuffledIndex > 0) {
        this.shuffledQueueIds.splice(shuffledIndex, 0, trackId);
      } else {
        this.shuffledQueueIds.push(trackId);
      }
    }

    this.updateQueueUi();
    this.persistPlayerState({ immediate: true });
  }

  currentTrackId() {
    return this.currentTrackIndex >= 0 ? this.items[this.currentTrackIndex]?.id : null;
  }

  getTrackById(trackId) {
    return this.items.find((item) => item.id === trackId) || null;
  }

  canPlayTrack(track) {
    return this.audioEngine.canPlayMime(mimeForTrack(track));
  }

  async restoreAudioPosition(seconds, { isRestore = false } = {}) {
    if (!Number.isFinite(seconds) || seconds <= 0) {
      return;
    }

    const audio = this.audioEngine.audioElement;

    // Wait for metadata if not loaded yet
    if (!Number.isFinite(this.audioEngine.getDuration()) || this.audioEngine.getDuration() <= 0) {
      await new Promise((resolve) => {
        audio.addEventListener('loadedmetadata', resolve, { once: true });
      });
    }

    const duration = this.audioEngine.getDuration();
    if (!Number.isFinite(duration) || duration <= 0) return;

    const targetTime = Math.min(seconds, duration * 0.995);
    _dbg(`[audio-restore] Setting currentTime=${targetTime.toFixed(2)} (requested=${seconds.toFixed(2)}) duration=${duration.toFixed(2)} readyState=${audio.readyState} paused=${audio.paused}`);

    // Wait for sufficient data before seeking (readyState >= 2 = HAVE_CURRENT_DATA)
    // This prevents the browser from ignoring/resetting currentTime when buffer is empty
    if (audio.readyState < 2) {
      _dbg(`[audio-restore] readyState=${audio.readyState} < 2, waiting for canplay...`);
      await new Promise((resolve) => {
        const onCanPlay = () => {
          audio.removeEventListener('canplay', onCanPlay);
          audio.removeEventListener('canplaythrough', onCanPlay);
          resolve();
        };
        audio.addEventListener('canplay', onCanPlay, { once: false });
        audio.addEventListener('canplaythrough', onCanPlay, { once: false });
        // Safety timeout — don't wait forever
        setTimeout(() => {
          audio.removeEventListener('canplay', onCanPlay);
          audio.removeEventListener('canplaythrough', onCanPlay);
          resolve();
        }, 3000);
      });
      _dbg(`[audio-restore] After canplay: readyState=${audio.readyState}`);
    }

    audio.currentTime = targetTime;
    this.updateProgressUi();

    // Wait for the browser to actually complete the seek
    if (audio.seeking) {
      await new Promise((resolve) => {
        audio.addEventListener('seeked', resolve, { once: true });
        setTimeout(resolve, 2000);
      });
      _dbg(`[audio-restore] After seeked: currentTime=${audio.currentTime.toFixed(2)} target=${targetTime.toFixed(2)} diff=${(audio.currentTime - targetTime).toFixed(3)}`);
    }

    // Double-set after seeked to combat MP3 keyframe inaccuracy
    if (Math.abs(audio.currentTime - targetTime) > 0.1) {
      _dbg(`[audio-restore] Drift detected (${(audio.currentTime - targetTime).toFixed(3)}s), re-seeking...`);
      audio.currentTime = targetTime;
      if (audio.seeking) {
        await new Promise((resolve) => {
          audio.addEventListener('seeked', resolve, { once: true });
          setTimeout(resolve, 1000);
        });
      }
    }

    // Final verification — if still way off, log a warning
    if (Math.abs(audio.currentTime - targetTime) > 0.5) {
      _dbgWarn(`[audio-restore] ⚠️ Seek failed! currentTime=${audio.currentTime.toFixed(2)} target=${targetTime.toFixed(2)} — lyrics may desync`);
    }

    // Mark that we need to re-affirm position on first play — ONLY for actual page reload restores
    if (isRestore) {
      this._pendingSeekTarget = targetTime;
      this._restoredFromReload = true;
    }
  }

  async activate(items) {
    this.active = true;
    this.items = Array.isArray(items) ? items.slice() : [];
    this.hydrateFromStore();
    this.syncQueueWithItems();
    this.renderLibrary();

    // Scroll performance: freeze grid effects during fast scroll
    if (!this._scrollGuardianBound) {
      this._scrollGuardianBound = true;
      scrollGuardian.subscribe((isScrolling) => {
        const grid = this.elements.grid?.querySelector('.music-albums-grid');
        if (grid) {
          grid.classList.toggle('scroll-perf-freeze', isScrolling);
        }
      });
    }

    const snapshot = this.store.getState();
    const persistedTrackId = snapshot.musicCurrentTrackId;
    const persistedTrack = persistedTrackId ? this.getTrackById(persistedTrackId) : null;
    if (persistedTrack) {
      const wasPlaying = Boolean(snapshot.musicWasPlaying);
      const wasPlayingAt = snapshot.musicWasPlayingAt || 0;
      const withinOneHour = wasPlayingAt > 0 && (Date.now() - wasPlayingAt) < 3600000;
      const shouldAutoplay = wasPlaying && withinOneHour;
      await this.playTrackById(persistedTrackId, {
        autoplay: shouldAutoplay,
        expand: this.isPlayerExpanded,
        startTime: snapshot.musicCurrentTime,
        preserveSettingsView: false,
        isRestore: true,  // This is an actual page reload restore
      });
      // Auto-reopen overlay on reload if it was open before
      _dbg('[VIZ-DEBUG] hydrate: post-playTrack check — isPlayerExpanded=%o _overlayIsOpen=%o mathVisualizer=%o currentTrackIndex=%d', this.isPlayerExpanded, this._overlayIsOpen, !!this.mathVisualizer, this.currentTrackIndex);
      if (this.isPlayerExpanded && !this._overlayIsOpen) {
        // Ensure currentTrackIndex is valid before opening overlay
        if (this.currentTrackIndex < 0) {
          // playTrackById may have set it during playTrack; if still -1, find it manually
          const idx = this.items.findIndex(item => item.id === persistedTrackId);
          if (idx >= 0) {
            this.currentTrackIndex = idx;
            _dbg('[VIZ-DEBUG] hydrate: manually set currentTrackIndex=%d', idx);
          }
        }
        if (this.currentTrackIndex < 0 || !this.items[this.currentTrackIndex]) {
          _dbgWarn('[VIZ-DEBUG] hydrate: cannot re-open overlay, no valid track (idx=%d)', this.currentTrackIndex);
        } else {
          _dbg('[VIZ-DEBUG] hydrate: re-opening overlay, currentTrackIndex=%d', this.currentTrackIndex);
        this.openOverlay('player');
        // Skip FLIP animation on reload — show overlay immediately at full quality
        const overlayRoot = this.getOverlayRoot();
        const page = overlayRoot?.querySelector('.music-track-page') || overlayRoot?.querySelector('.music-player-layer');
        if (page) {
          page.style.opacity = '1';
          page.style.transform = '';
        }
        if (overlayRoot) {
          overlayRoot.classList.remove('flip-animating');
          overlayRoot.classList.add('flip-done');
        }
        // Force layout recalculation so art panel and lyrics position correctly
        requestAnimationFrame(() => {
          if (page) page.offsetHeight;
          const shell = overlayRoot?.querySelector('.music-immersive-shell');
          if (shell) shell.offsetHeight;
        });
        // Instant high-res visualizer on reload (no blur-to-clear needed)
        // NOTE: openOverlay already starts low-res (0.1, 1fps) behind blur.
        // The FLIP onfinish handler calls _runVisualizerIgnition to ramp to full quality.
        // We only need to ensure the mathVisualizer is initialized here; do NOT start full-res
        // during hydrate — that would compete with the FLIP animation for GPU resources.
        if (this.settings.engineMode === 'premium') {
          const analyser = this.audioEngine?.getAnalyser();
          const renderRoot = this.getOverlayRoot();
          _dbg('[VIZ-DEBUG] hydrate: premium mode, mathVisualizer=%o _mathVisualizerLoading=%o analyser=%o renderRoot=%o',
            !!this.mathVisualizer, this._mathVisualizerLoading, !!analyser, !!renderRoot);
          // Wait for any in-flight initMathVisualizer to complete before trying again
          if (this._mathVisualizerLoading) {
            _dbg('[VIZ-DEBUG] hydrate: waiting for in-flight initMathVisualizer...');
            // Poll until the loading init finishes (max ~3s)
            await new Promise(resolve => {
              let tries = 0;
              const check = () => {
                if (this.mathVisualizer || !this._mathVisualizerLoading || ++tries > 60) {
                  _dbg('[VIZ-DEBUG] hydrate: poll done after %d tries, mathVisualizer=%o _mathVisualizerLoading=%o', tries, !!this.mathVisualizer, this._mathVisualizerLoading);
                  return resolve();
                }
                setTimeout(check, 50);
              };
              check();
            });
          }
          if (analyser && renderRoot && !this.mathVisualizer) {
            _dbg('[VIZ-DEBUG] hydrate: calling initMathVisualizer (no existing instance)');
            try {
              await this.initMathVisualizer(analyser, renderRoot);
              _dbg('[VIZ-DEBUG] hydrate: initMathVisualizer completed, mathVisualizer=%o', !!this.mathVisualizer);
            } catch (e) {
              _dbgWarn('[MathVisualizer] reload init failed:', e);
            }
          }
          // If no FLIP animation is running (e.g. direct hydrate without animation),
          // start the ignition sequence now. Otherwise FLIP onfinish handles it.
          if (this.mathVisualizer && !this._flipAnimation) {
            _dbg('[VIZ-DEBUG] hydrate: no FLIP in progress, running ignition now');
            this._runVisualizerIgnition();
          } else if (this.mathVisualizer) {
            _dbg('[VIZ-DEBUG] hydrate: FLIP in progress, deferring full-res to FLIP onfinish');
          } else {
            _dbgWarn('[VIZ-DEBUG] hydrate: NO mathVisualizer after init attempt!');
          }
        }
        }
      }
      // Resume tracking of in-progress server tasks after page reload
      this._resumeServerTasks(persistedTrack);
      return;
    }

    this.renderEmptyState();
  }

  async updateItems(items) {
    this.active = true;
    const nextItems = Array.isArray(items) ? items.slice() : [];
    const currentTrackId = this.currentTrackId();
    this.items = nextItems;
    this.syncQueueWithItems();

    if (currentTrackId) {
      const nextIndex = this.items.findIndex((item) => item.id === currentTrackId);
      if (nextIndex >= 0) {
        this.currentTrackIndex = nextIndex;
      } else {
        this.currentTrackIndex = -1;
      }
    }

    this.renderLibrary();

    const activeTrack = this.items[this.currentTrackIndex] || null;
    if (activeTrack) {
      await this.renderTrackPage(activeTrack);
      this.updateGlobalMetadata(activeTrack);
      this.updateQueueUi();
      return;
    }

    if (this.items.length) {
      this.renderEmptyState();
      return;
    }

    this.audioEngine.pause();
    this.renderEmptyState();
  }

  deactivate() {
    this.active = false;
    this.stopAudioReactiveAccentLoop();
    this.stopProgressLoop();
    this.visualizer?.stop();
    this.lyrics?.destroy();
    this._clearAlbumNavDelayTimer();
    this.unbindIdleWatchers();
    this.unbindOverlayClickCapture();
    this.closeOverlay();
    applyMediaSessionState();
    this.persistPlayerState({ immediate: true });
  }

  _clearAlbumNavDelayTimer() {
    if (this._albumNavDelayTimer) {
      clearTimeout(this._albumNavDelayTimer);
      this._albumNavDelayTimer = 0;
    }
  }

  _navigateToCurrentTrackAlbumViaAlbumsPreview({ scrollToTrack = true, previewMs = 1000 } = {}) {
    const track = this.items[this.currentTrackIndex];
    if (!track) return;
    const albumKey = getTrackAlbumKey(track);
    const wasOverlayOpen = this._overlayIsOpen;

    this._clearAlbumNavDelayTimer();
    if (wasOverlayOpen) {
      this.closeOverlay();
    }

    const closeDelay = wasOverlayOpen ? 950 : 0;
    setTimeout(() => {
      // Show albums grid first so user gets a quick context transition.
      this.activeAlbumKey = null;
      this.renderLibrary();
      window._chromicResetSmoothScroll?.(0);
      window.scrollTo(0, 0);

      this._albumNavDelayTimer = setTimeout(() => {
        this._albumNavDelayTimer = 0;
        // Respect user interaction if they manually opened an album during preview.
        if (this.activeAlbumKey && this.activeAlbumKey !== albumKey) return;

        this.activeAlbumKey = albumKey;
        this.renderLibrary();

        if (!scrollToTrack) return;
        const doScroll = (attempts = 0) => {
          const trackEl = this.elements.grid?.querySelector(`[data-track-id="${CSS.escape(track.id)}"]`);
          if (trackEl) {
            trackEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
            trackEl.classList.add('highlight-pulse');
            setTimeout(() => trackEl.classList.remove('highlight-pulse'), 2000);
          } else if (attempts < 15) {
            setTimeout(() => doScroll(attempts + 1), 60);
          }
        };
        requestAnimationFrame(() => doScroll());
      }, Math.max(0, Number(previewMs) || 0));
    }, closeDelay);
  }

  renderEmptyState() {
    this.visualizer?.stop();
    this.lyrics?.destroy();
    this.pageUi = null;
    if (this.overlayHost) {
      this.overlayHost.innerHTML = '';
      this.overlayHost.classList.remove('is-active', 'is-expanded');
    }
    this.unbindOverlayClickCapture();
    applyMediaSessionState();
    const renderRoot = this.getOverlayRoot();
    renderRoot.innerHTML = `
      <article class="player-card">
        <h3>Music Library</h3>
        <p class="meta">Select a track from any album to open the slide-up player layer, Up Next queue, and iOS-style settings.</p>
      </article>
    `;
  }

  _navigateToCurrentTrackAlbum({ scrollToTrack = false } = {}) {
    this._clearAlbumNavDelayTimer();
    const track = this.items[this.currentTrackIndex];
    if (!track) return;
    const albumKey = getTrackAlbumKey(track);
    const wasOverlayOpen = this._overlayIsOpen;
    const isMusicSection = document.body.dataset.section === 'music';

    const scrollToCurrentTrack = () => {
      const doScroll = (attempts = 0) => {
        const trackEl = this.elements.grid?.querySelector(`[data-track-id="${CSS.escape(track.id)}"]`);
        if (trackEl) {
          trackEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
          trackEl.classList.add('highlight-pulse');
          setTimeout(() => trackEl.classList.remove('highlight-pulse'), 2000);
        } else if (attempts < 15) {
          setTimeout(() => doScroll(attempts + 1), 60);
        }
      };
      requestAnimationFrame(() => doScroll());
    };

    // If already on the target album, do not re-render/reload it.
    const alreadyOnAlbum = this.activeAlbumKey === albumKey && isMusicSection;
    if (alreadyOnAlbum) {
      if (wasOverlayOpen) {
        this.closeOverlay();
      }
      // Update active row highlighting
      this.elements.grid?.querySelectorAll('.album-track-row').forEach(row => {
        row.classList.toggle('active', row.dataset.trackId === track.id);
      });
      if (scrollToTrack) {
        scrollToCurrentTrack();
      } else {
        // Subtitle click: smooth scroll to top
        const scrollContainer = this.libraryGrid?.closest('.library-view') || this.libraryGrid?.parentElement;
        if (scrollContainer) scrollContainer.scrollTo({ top: 0, behavior: 'smooth' });
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
      return;
    }

    // Close overlay if open, but do not wait ~1s before navigating.
    if (wasOverlayOpen) {
      this.closeOverlay();
    }

    this.activeAlbumKey = albumKey;
    this.renderLibrary();
    const scrollContainer = this.libraryGrid?.closest('.library-view') || this.libraryGrid?.parentElement;
    if (scrollToTrack) {
      scrollToCurrentTrack();
    } else {
      if (scrollContainer) scrollContainer.scrollTop = 0;
      window.scrollTo(0, 0);
    }
  }

  renderLibrary() {
    _dbg('[album-nav] renderLibrary called, activeAlbumKey=%s', this.activeAlbumKey);
    if (!this.activeAlbumKey) _dbg('[album-nav] renderLibrary with null activeAlbumKey');
    this.elements.grid.classList.remove('movies-grid', 'books-grid');
    this.elements.grid.classList.add('music-grid');
    const albumList = groupTracksIntoAlbums(this.items, this.helpers.resolvePreviewUrl);
    const albumKeys = new Set(albumList.map((album) => album.key));
    if (this.activeAlbumKey && !albumKeys.has(this.activeAlbumKey)) {
      _dbgWarn('[album-nav] renderLibrary: activeAlbumKey "%s" NOT FOUND in albumKeys (count=%d) — keeping it to avoid reset', this.activeAlbumKey, albumKeys.size);
      // Don't clear — the album detail view was already shown successfully.
      // Only explicit user actions (ESC, back button) should clear activeAlbumKey.
    }

    renderMusicAlbumView({
      albums: albumList,
      activeAlbumKey: this.activeAlbumKey,
      activeTrackId: this.currentTrackId(),
      grid: this.elements.grid,
      escapeHtml: this.helpers.escapeHtml,
      resolvePreviewUrl: this.helpers.resolvePreviewUrl,
      onAlbumSelect: (albumKey, options = {}) => {
        this._clearAlbumNavDelayTimer();
        if (albumKey === this.activeAlbumKey) return;
        // Save scroll position only when leaving the albums grid (not when switching between albums)
        if (!this.activeAlbumKey) {
          this._albumsScrollTop = window.scrollY || 0;
          _dbg('[album-nav] Saved grid scroll: %d', this._albumsScrollTop);
        }
        this.activeAlbumKey = albumKey;
        this.renderLibrary();
        // Activate select mode if requested (from context menu "Select Tracks")
        if (options.activateSelectMode) {
          requestAnimationFrame(() => {
            const selectBtn = this.elements.grid.querySelector('[data-select-mode-toggle]');
            if (selectBtn) selectBtn.click();
          });
        }
        // Scroll to top when opening album page
        window._chromicResetSmoothScroll?.(0);
        window.scrollTo(0, 0);
        _dbg('[album-nav] Opened album: %s, scrolled to top', albumKey);
      },
      onTrackSelect: (trackId) => {
        // Clicking a row in album table should play this album first, then random tracks.
        this._primeAlbumFirstQueue(trackId);
        this.playTrackById(trackId, { autoplay: true, expand: this.isPlayerExpanded });
      },
      onQueueAction: (trackId, position) => {
        this.enqueueTrackById(trackId, position);
      },
      onExpand: async (album, options = {}) => {
        // _dbg('[SHUFFLE-DEBUG] onExpand called:', { albumKey: album?.key, albumName: album?.name, trackCount: album?.tracks?.length, options });
        if (this._isTransitioning) {
          // _dbg('[SHUFFLE-DEBUG] onExpand blocked — transition in progress');
          return;
        }
        // Reload guard: same album already playing — just ensure overlay is open, don't restart
        const targetTrackId = options.startTrackId || album?.tracks?.[0]?.id;
        const currentTrack = this.items[this.currentTrackIndex];
        const albumTracks = album?.tracks || [];
        const isCurrentTrackInAlbum = currentTrack && albumTracks.some(t => t.id === currentTrack.id);
        if ((this._currentAlbumKey === album?.key || isCurrentTrackInAlbum) && currentTrack && !options.startTrackId) {
          if (!this._overlayIsOpen) {
            this.isPlayerExpanded = true;
            // Run FLIP animation even when re-opening same album
            const sourceRect = options?.sourceElement?.getBoundingClientRect?.() || null;
            if (options?.sourceElement?.classList?.contains('album-view-cover')) {
              options.sourceElement.style.opacity = '0';
              options.sourceElement.style.transition = 'opacity 0.15s';
            }
            this.openOverlay('player');
            this.runAlbumFlipTransition(sourceRect);
          }
          return;
        }
        if (targetTrackId && currentTrack?.id === targetTrackId && this._overlayIsOpen) {
          _dbg('[reload-guard] Same track already open, skipping reload');
          return;
        }
        const sourceRect = options?.sourceElement?.getBoundingClientRect?.() || null;
        console.log(`%c[FLIP-DEBUG] onExpand sourceElement=${options?.sourceElement?.className} sourceRect=${sourceRect ? `x=${sourceRect.x|0} y=${sourceRect.y|0} w=${sourceRect.width|0} h=${sourceRect.height|0}` : 'null'}`, 'color:lime');

        // Pre-extract palette from album-view-cover (already loaded) so visualizer
        // opens with correct colors immediately — no flash of wrong palette
        const sourceImg = options?.sourceElement?.tagName === 'IMG' ? options.sourceElement : options?.sourceElement?.querySelector?.('img');
        if (sourceImg?.complete && sourceImg.naturalWidth > 0) {
          try {
            const canvas = document.createElement('canvas');
            canvas.width = 50; canvas.height = 50;
            const ctx = canvas.getContext('2d', { willReadFrequently: true });
            ctx.drawImage(sourceImg, 0, 0, 50, 50);
            const { data } = ctx.getImageData(0, 0, 50, 50);
            const palette = extractPalette(data, 10);
            if (palette?.length >= 3) {
              this._lastPalette = palette;
              if (this.mathVisualizer) {
                const toHex = (c) => `#${((1 << 24) | (c.r << 16) | (c.g << 8) | c.b).toString(16).slice(1)}`;
                this.mathVisualizer.setPalette([toHex(palette[0]), toHex(palette[1]), toHex(palette[2])]);
              }
              this._extractIdentity?.(palette);
            }
          } catch (_) { /* cross-origin or tainted canvas */ }
        }
        // Don't reset user settings (contentMode, uiMode) — respect user's preferences
        // Handle shuffle mode
        if (options.shuffle) {
          // _dbg('[SHUFFLE-DEBUG] Setting isShuffle=true');
          this.settings.isShuffle = true;
          this.syncShuffleUi?.();
        }
        const tracks = album?.tracks || [];
        // _dbg('[SHUFFLE-DEBUG] Tracks from album:', tracks.length);
        // Sort tracks by track number so Play starts from track 1
        const sortedTracks = [...tracks].sort((a, b) => (a.trackNumber || 0) - (b.trackNumber || 0));
        // Set full queue from album tracks before playing
        if (sortedTracks.length) {
          this.queueTrackIds = sortedTracks.map(t => t.id);
          // _dbg('[SHUFFLE-DEBUG] Set queueTrackIds:', this.queueTrackIds.length, 'items');
          if (this.settings.isShuffle && !options.preOrdered) {
            this.shuffledQueueIds = [...this.queueTrackIds].sort(() => Math.random() - 0.5);
            // _dbg('[SHUFFLE-DEBUG] Reshuffled queue (preOrdered=false)');
          } else if (options.preOrdered) {
            // Tracks are already in desired order (e.g. shuffle-all with mosaic leads)
            this.shuffledQueueIds = [...this.queueTrackIds];
            // _dbg('[SHUFFLE-DEBUG] Using preOrdered queue, shuffledQueueIds:', this.shuffledQueueIds.length, 'items');
          }
          this._currentAlbumKey = album.key;
        }
        // If startTrackId is provided, use that specific track; otherwise use first track or random
        let firstTrack;
        if (options.startTrackId) {
          firstTrack = sortedTracks.find(t => t.id === options.startTrackId) || sortedTracks[0];
          // _dbg('[SHUFFLE-DEBUG] Using startTrackId:', options.startTrackId);
        } else if (options.shuffle && !options.preOrdered && sortedTracks.length > 1) {
          firstTrack = sortedTracks[Math.floor(Math.random() * sortedTracks.length)];
        } else {
          firstTrack = sortedTracks[0];
        }
        // _dbg('[SHUFFLE-DEBUG] First track to play:', firstTrack?.title || firstTrack?.name, 'ID:', firstTrack?.id);
        if (firstTrack) {
          console.log('%c[EXPAND-DEBUG] onExpand: starting, track=%s, _flipAnimation=%o, _isTransitioning=%o', 'color:magenta;font-weight:bold', firstTrack.title || firstTrack.id, !!this._flipAnimation, this._isTransitioning);

          // ─── PHASE 1: Collect all track display data BEFORE animation ───
          // Use the base artwork URL (without size params) so we can normalize to 700px for overlay
          const rawArtworkUrl = (sourceImg?.complete && sourceImg.src)
            ? sourceImg.src.split('?')[0]  // strip tile's size params
            : this.helpers.resolvePreviewUrl(firstTrack);
          const trackDisplayBundle = {
            id: firstTrack.id,
            title: firstTrack.title || firstTrack.name || '',
            artist: firstTrack.artist || '',
            album: firstTrack.album || 'Singles',
            artwork: rawArtworkUrl,
            track: firstTrack,
          };

          // Start fetching full track metadata (lyrics etc) in parallel immediately
          const trackMetaPromise = this._prefetchLyricsData(firstTrack);

          // ─── STOP PREVIOUS TRACK IMMEDIATELY ───
          const audio = this.audioEngine?.audioElement;
          if (audio && !audio.paused) {
            audio.pause();
          }
          // Cancel progress update loop so old track position doesn't keep updating the seekbar
          if (this.progressFrameId) {
            window.cancelAnimationFrame(this.progressFrameId);
            this.progressFrameId = null;
          }
          // Reset seek bar and time display to 0 — use DOM directly in case pageUi isn't ready
          if (this.pageUi?.progress) this.pageUi.progress.value = '0';
          if (this.pageUi?.currentTime) this.pageUi.currentTime.textContent = '0:00';
          if (this.pageUi?.duration) this.pageUi.duration.textContent = '0:00';
          if (this._globalProgressBar) this._globalProgressBar.setProgress?.(0);
          const progressEl = document.getElementById('trackProgress');
          if (progressEl) progressEl.value = '0';
          const currentTimeEl = document.getElementById('trackCurrentTime') || this.getOverlayRoot?.()?.querySelector?.('.music-track-current-time');
          if (currentTimeEl) currentTimeEl.textContent = '0:00';

          // Set minimal state so overlay can open
          const idx = this.items.findIndex(t => t.id === firstTrack.id);
          if (idx >= 0) this.currentTrackIndex = idx;
          this.isPlayerExpanded = true;
          this._preloadedArtworkUrl = trackDisplayBundle.artwork;

          // ─── PHASE 2: Apply bundle to overlay immediately (before animation) ───
          this.updateGlobalMetadata(firstTrack);
          // Clear old lyrics so GPU text from previous track isn't shown
          if (this.lyrics) {
            this.lyrics.stop();
            this.lyrics.setTrack({ ...firstTrack, lyrics: null, syncedLyrics: null });
          }

          // Store the bundle so openOverlay/renderTrackPage uses it
          this._pendingTrackBundle = trackDisplayBundle;

          // ─── PRE-SET ARTWORK before overlay becomes visible (prevents 1-frame old image flash) ───
          // Use the tile's exact cached src for instant display — no network wait/blink
          const existingArtEl = this.getOverlayRoot?.()?.querySelector?.('#musicTrackArtwork');
          if (existingArtEl && trackDisplayBundle.artwork) {
            const tileSrc = (sourceImg?.complete && sourceImg.src && !sourceImg.src.startsWith('data:'))
              ? sourceImg.src  // already in browser cache at 400px
              : withImageParams(trackDisplayBundle.artwork, 700);
            existingArtEl.src = tileSrc;
            // Silently upgrade to 700px in background — img keeps old pixels until new loads
            const hiResSrc = withImageParams(trackDisplayBundle.artwork, 700);
            if (tileSrc !== hiResSrc) {
              const hiRes = new Image();
              hiRes.onload = () => { existingArtEl.src = hiResSrc; };
              hiRes.src = hiResSrc;
            }
          }

          // ─── PHASE 3: Open overlay + animate ───
          console.log('%c[EXPAND-DEBUG] onExpand: calling openOverlay + runAlbumFlipTransition', 'color:magenta;font-weight:bold');
          // Hide the album-view cover so it looks like the image "flew" to the overlay
          if (options?.sourceElement?.classList?.contains('album-view-cover')) {
            options.sourceElement.style.opacity = '0';
            options.sourceElement.style.transition = 'opacity 0.15s';
          }
          this.openOverlay('player');
          // Clear GPU lyrics renderer AFTER openOverlay (mathVisualizer now initialized)
          this.mathVisualizer?.setLyricsTimeline?.([]);

          // Optimistically position art on left (lyrics layout) — assume lyrics exist
          const immShell = this.getOverlayRoot()?.querySelector('.music-immersive-shell');
          if (immShell && this.settings.engineMode === 'premium') {
            immShell.classList.add('gpu-lyrics-active');
          }

          // Start visualizer at low quality for warmup — single rendered frame
          if (this.settings.engineMode === 'premium' && this.mathVisualizer) {
            const vizContainer = this.getOverlayRoot()?.querySelector('#mathVisualizerContainer');
            if (vizContainer) vizContainer.style.display = '';
            this.mathVisualizer.setResolutionScale(0.4);
            this.mathVisualizer.setMaxFps(1); // minimal during warmup
            if (!this.mathVisualizer.running) this.mathVisualizer.start();
            if (this.mathVisualizer.renderFrame) this.mathVisualizer.renderFrame();
          }

          // START FLIP IMMEDIATELY — don't wait for lyrics/meshes, animate from frame 1
          // Single rAF to let overlay layout settle, then go
          await new Promise(r => requestAnimationFrame(r));
          this.runAlbumFlipTransition(sourceRect);

          // Load lyrics IN PARALLEL with animation — no blocking
          const lyricsLoadPromise = (async () => {
            const earlyMeta = await trackMetaPromise;
            console.log('[DOM-LYRICS-DEBUG] onExpand lyricsLoad: earlyMeta=%s hasLyrics=%s engineMode=%s', !!earlyMeta, !!earlyMeta?.lyrics?.length, this.settings.engineMode);
            if (earlyMeta && this.lyrics) {
              await this.fetchAndDisplayLyrics(firstTrack, earlyMeta);
              this._lyricsAlreadyLoadedForTrackId = firstTrack.id;
              console.log('[DOM-LYRICS-DEBUG] onExpand: fetchAndDisplayLyrics done, shell has-lyrics=%s', this.getOverlayRoot()?.querySelector('.music-immersive-shell')?.classList?.contains('has-lyrics'));
            } else if (immShell) {
              console.log('[DOM-LYRICS-DEBUG] onExpand: no meta or no lyrics engine');
              immShell.classList.remove('gpu-lyrics-active');
            }
          })();

          // Wait for FLIP animation to finish
          await new Promise(resolve => {
            const check = () => {
              if (!this._flipAnimation && !this._isTransitioning) return resolve();
              requestAnimationFrame(check);
            };
            check();
          });

          // Ensure lyrics are loaded (should already be done by now — local files are fast)
          await lyricsLoadPromise;

          // Mark that renderTrackPage should NOT re-render (bundle already applied)
          this._trackPageAlreadyRenderedForId = firstTrack.id;

          // Now that FLIP is done, feed full lyrics timeline to GPU renderer
          if (this._deferredFullLyricsTimeline) {
            this.mathVisualizer?.setLyricsTimeline?.(this._deferredFullLyricsTimeline);
            this._deferredFullLyricsTimeline = null;
          }

          // ─── PHASE 5: Load audio (heavy part, doesn't affect UI) ───
          await this.playTrackById(firstTrack.id, { autoplay: true, expand: false });
          this._pendingTrackBundle = null;
          console.log('%c[EXPAND-DEBUG] onExpand: playTrackById DONE', 'color:magenta;font-weight:bold');
        }
      },
      onBackToAlbums: () => {
        _dbg('[album-nav] Back button pressed');
        const savedScroll = this._albumsScrollTop || 0;
        this.activeAlbumKey = null;
        this._backToAlbums = true;
        window._chromicResetSmoothScroll?.(savedScroll);
        window.scrollTo({ top: savedScroll, behavior: 'instant' });
        this.renderLibrary();
        window._chromicResetSmoothScroll?.(savedScroll);
        window.scrollTo({ top: savedScroll, behavior: 'instant' });
      },
      onDeleteTrack: async (trackId) => {
        await this.deleteTrackById(trackId);
      },
      onDeleteAlbum: async (albumKey, options) => {
        await this.deleteAlbumByKey(albumKey, options);
      },
    });

    // Listen for custom events from album view
    const grid = this.elements.grid;
    grid.addEventListener('chromic:shuffle-from', (e) => {
      this.settings.isShuffle = true;
      this.syncShuffleUi?.();
    }, { once: true });
    if (!grid._refreshLibraryBound) {
      grid._refreshLibraryBound = true;
      grid.addEventListener('chromic:refresh-library', () => {
        this.renderLibrary();
      });
    }

    // Store albums reference for auto-play-next-album
    this.albums = albumList;

    // Apply 3D tilt + haptic hover to album grid cards (when showing grid, not album detail)
    if (!this.activeAlbumKey) {
      const isReturning = this._backToAlbums || this._hasRenderedOnce;
      this._hasRenderedOnce = true;

      // If returning from album detail, immediately make cards visible (synchronous)
      if (isReturning) {
        const cards = this.elements.grid.querySelectorAll('.stagger-item');
        cards.forEach((card) => {
          card.style.opacity = '1';
          card.style.transform = '';
          card.style.willChange = '';
          card.style.transition = '';
          card.dataset.staggerRevealed = '1';
          card._staggerVisible = true;
          card._staggerDone = true;
        });
      }

      // Motion effects (tilt3D, hapticHover, ambientCardGlow) are applied by app.js applyMotionEffects
      // No duplicate application needed here
    }

    const currentTrack = this.items[this.currentTrackIndex];
    if (currentTrack && !this.activeAlbumKey && !this._backToAlbums) {
      this.activeAlbumKey = getTrackAlbumKey(currentTrack);
    }
    this._backToAlbums = false;
  }

  async deleteMediaFile(relativePath) {
    const response = await fetch(`/api/media/music/${encodeURIComponent(relativePath)}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      const payload = await response.json().catch(() => ({}));
      throw new Error(payload.error || 'Delete failed');
    }
  }

  async deleteTrackById(trackId, { skipConfirm = false } = {}) {
    const track = this.getTrackById(trackId);
    if (!track) {
      return;
    }

    if (!skipConfirm) {
      const approved = window.confirm(`Delete track ${track.title || track.name}?`);
      if (!approved) {
        return;
      }
    }

    await this.deleteMediaFile(track.name);
    this.items = this.items.filter((item) => item.id !== trackId);
    this.queueTrackIds = this.queueTrackIds.filter((id) => id !== trackId);
    this.shuffledQueueIds = this.shuffledQueueIds.filter((id) => id !== trackId);
    if (this.currentTrackId() === trackId) {
      this.audioEngine.pause();
      this.currentTrackIndex = -1;
      this.renderEmptyState();
    }
    this.renderLibrary();
    this.persistPlayerState({ immediate: true });
  }

  async deleteAlbumByKey(albumKey, { skipConfirm = false } = {}) {
    const albumTracks = this.items.filter((item) => getTrackAlbumKey(item) === albumKey);
    if (!albumTracks.length) {
      return;
    }

    if (!skipConfirm) {
      const approved = window.confirm(`Delete album ${albumTracks[0].album || albumKey} and ${albumTracks.length} tracks?`);
      if (!approved) {
        return;
      }
    }

    for (const track of albumTracks) {
      await this.deleteMediaFile(track.name);
    }

    const deletedIds = new Set(albumTracks.map((track) => track.id));
    this.items = this.items.filter((item) => !deletedIds.has(item.id));
    this.queueTrackIds = this.queueTrackIds.filter((id) => !deletedIds.has(id));
    this.shuffledQueueIds = this.shuffledQueueIds.filter((id) => !deletedIds.has(id));
    if (deletedIds.has(this.currentTrackId())) {
      this.audioEngine.pause();
      this.currentTrackIndex = -1;
      this.renderEmptyState();
    }
    this.activeAlbumKey = null;
    this.renderLibrary();
    this.persistPlayerState({ immediate: true });
  }

  async playTrackById(trackId, options = {}) {
    console.log('%c[EXPAND-DEBUG] playTrackById called: trackId=%s, options=%o, stack:', 'color:yellow;font-weight:bold', trackId, options, new Error().stack?.split('\n').slice(1,4).join(' | '));
    const index = this.items.findIndex((item) => item.id === trackId);
    if (index >= 0) {
      await this.playTrack(index, options);
    }
  }

  /** Prompt user to discard session lyrics override from snapper before changing tracks */
  _confirmDiscardSessionLyrics() {
    return new Promise((resolve) => {
      const backdrop = document.createElement('div');
      backdrop.className = 'session-lyrics-confirm-backdrop';
      backdrop.style.cssText = 'position:fixed;inset:0;z-index:99999;background:rgba(0,0,0,.55);display:flex;align-items:center;justify-content:center;';
      const sheet = document.createElement('div');
      sheet.style.cssText = 'background:#1e1e1e;border-radius:12px;padding:24px 28px;max-width:380px;color:#e0e0e0;font-family:system-ui;box-shadow:0 8px 32px rgba(0,0,0,.5);';
      sheet.innerHTML = `
        <h3 style="margin:0 0 8px;font-size:16px;">Unsaved Snapper Lyrics</h3>
        <p style="margin:0 0 18px;font-size:13px;color:#aaa;">You have edited lyrics from the Snapper that haven't been saved. Switching tracks will discard them.</p>
        <div style="display:flex;gap:8px;justify-content:flex-end;">
          <button data-action="cancel" style="padding:6px 14px;border-radius:6px;border:1px solid #555;background:transparent;color:#ccc;cursor:pointer;font-size:13px;">Stay on Track</button>
          <button data-action="discard" style="padding:6px 14px;border-radius:6px;border:none;background:#e04040;color:#fff;cursor:pointer;font-size:13px;">Discard & Switch</button>
        </div>
      `;
      backdrop.appendChild(sheet);
      document.body.appendChild(backdrop);
      backdrop.addEventListener('click', (e) => {
        const action = e.target.closest('[data-action]')?.dataset.action;
        if (!action) return;
        backdrop.remove();
        resolve(action === 'discard');
      });
    });
  }

  async playTrack(index, { autoplay = true, expand = true, startTime = 0, preserveSettingsView = false, isRestore = false } = {}) {
    console.log('%c[EXPAND-DEBUG] playTrack called: index=%d, autoplay=%o, expand=%o, _flipAnimation=%o, _isTransitioning=%o', 'color:yellow;font-weight:bold', index, autoplay, expand, !!this._flipAnimation, this._isTransitioning);
    if (index < 0 || index >= this.items.length) {
      return;
    }

    // Wait for overlay open animation to fully complete before loading track
    // This prevents jank/freeze during FLIP transitions
    if (this._flipAnimation || this._isTransitioning) {
      _dbg('[playTrack] Deferring until overlay animation completes');
      await new Promise(resolve => {
        const check = () => {
          if (!this._flipAnimation && !this._isTransitioning) return resolve();
          requestAnimationFrame(check);
        };
        check();
      });
    }

    const track = this.items[index];

    // Track which album is currently playing (for auto-play-next-album)
    if (track.albumKey || track.album) {
      this._currentAlbumKey = track.albumKey || track.album;
    }

    // Guard: If same track is already loaded and at the right position, skip re-loading
    // This prevents switchCategory/activate from wiping a successfully restored position
    const audio = this.audioEngine.audioElement;
    const trackSrc = track.path || track.id;
    const audioSrcMatchesTrack = audio?.src && trackSrc && decodeURIComponent(audio.src).includes(decodeURIComponent(trackSrc));
    const alreadyLoaded = this.currentTrackIndex === index && audio?.src && !audio.error && audioSrcMatchesTrack;
    if (alreadyLoaded) {
      if (startTime > 0) {
        const drift = Math.abs(audio.currentTime - startTime);
        if (drift < 1.0) {
          _dbg(`[playTrack] Same track already at position ${audio.currentTime.toFixed(2)} (target=${startTime.toFixed(2)}), skipping reload`);
          if (expand) this.isPlayerExpanded = true;
          this.isSettingsView = preserveSettingsView ? this.isSettingsView : false;
          this.updateGlobalMetadata(track);
          this.updatePlayButtons();
          this.persistPlayerState({ immediate: true });
          return;
        }
      } else if (!audio.paused || audio.currentTime > 0.5) {
        // Track is already playing or has meaningful position — don't reset to 0
        _dbg(`[playTrack] Same track already active (currentTime=${audio.currentTime.toFixed(2)} paused=${audio.paused}), skipping reload`);
        // If paused, resume playback
        if (audio.paused && autoplay) {
          audio.play().catch(() => {});
        }
        // Don't override isPlayerExpanded if already expanded (e.g. from onExpand flow)
        if (expand) this.isPlayerExpanded = true;
        this.isSettingsView = preserveSettingsView ? this.isSettingsView : false;
        this.updateGlobalMetadata(track);
        this.updatePlayButtons();
        this.persistPlayerState({ immediate: true });
        return;
      }
    }

    // If there are session lyrics from snapper, prompt before switching tracks
    if (this._sessionLyricsOverride && this._sessionLyricsOverride.trackIndex !== index) {
      const confirmed = await this._confirmDiscardSessionLyrics();
      if (!confirmed) return; // user cancelled — stay on current track
      // User chose to discard — restore original lyrics then continue
      if (this._sessionLyricsOverride.originalPayload && this.lyrics?.setTrack) {
        this.lyrics.setTrack(this._sessionLyricsOverride.originalPayload);
        _dbg('[MusicPlayer] ↩ Restored original lyrics after session discard');
      }
      this._sessionLyricsOverride = null;
    }

    this._pendingSeekTarget = null;
    this._restoredFromReload = false;

    this.syncQueueWithItems();
    this.currentTrackIndex = index;
    // _dbg('[SHUFFLE-DEBUG] playTrack: index=%d trackId=%s queueTrackIds=%d shuffledQueueIds=%d', index, track.id, this.queueTrackIds.length, this.shuffledQueueIds.length);
    this._pendingSyncedLyricsPayload = null; // Clear stale lyrics from previous track
    // Only expand if requested; never collapse if already expanded (e.g. from onExpand flow)
    if (expand) this.isPlayerExpanded = true;
    this.isSettingsView = preserveSettingsView ? this.isSettingsView : false;
    this.lastSyncedSecond = -1;

    // Ensure overlay click handler is bound when player is expanded
    if (this.isPlayerExpanded) {
      this.bindOverlayClickCapture();
    }

    if (!this.queueTrackIds.includes(track.id)) {
      // _dbg('[SHUFFLE-DEBUG] playTrack: track not in queueTrackIds, adding it');
      this.queueTrackIds.push(track.id);
    }
    if (this.settings.isShuffle && !this.shuffledQueueIds.includes(track.id)) {
      // _dbg('[SHUFFLE-DEBUG] playTrack: track not in shuffledQueueIds, REBUILDING QUEUE (this may break shuffle all order!)');
      this.rebuildShuffledQueue();
    }

    // Pre-fetch lyrics metadata in parallel with audio + page render (network only)
    const lyricsDataPromise = this._prefetchLyricsData(track);

    // Stop previous track immediately before loading new one
    if (audio && !audio.paused) {
      audio.pause();
    }

    await this.audioEngine.setSource(track.url, { autoplay: startTime > 0 ? false : autoplay });
    if (startTime > 0) {
      await this.restoreAudioPosition(startTime, { isRestore });
      if (autoplay) {
        try {
          await this.audioEngine.resume();
          await this.audioEngine.audioElement.play();
        } catch (e) { /* gesture policy */ }
      }
    }

    if (!expand) {
      // Lightweight active-track highlight update instead of full re-render
      const rows = this.elements.grid.querySelectorAll('.album-track-row');
      rows.forEach(row => {
        row.classList.toggle('active', row.dataset.trackId === track.id);
      });
    }
    await this.renderTrackPage(track);
    this.updateGlobalMetadata(track);
    this.updateShuffleButtons();
    this.updateRepeatButtons();
    this.updatePlayButtons();
    this.updateQueueUi();
    this.setTrackWarning(
      this.canPlayTrack(track)
        ? ''
        : 'This browser may not support this audio format. Use direct open/download fallback.',
    );
    this.persistPlayerState({ immediate: true });
    // Now DOM is ready — display pre-fetched lyrics (skip if already loaded by onExpand)
    if (this._lyricsAlreadyLoadedForTrackId === track.id) {
      console.log('[DOM-LYRICS-DEBUG] playTrack: lyrics already loaded by onExpand, skipping');
      this._lyricsAlreadyLoadedForTrackId = null;
    } else {
      console.log('[DOM-LYRICS-DEBUG] playTrack: calling fetchAndDisplayLyrics');
      this.fetchAndDisplayLyrics(track, await lyricsDataPromise);
    }
  }

  /** Resolve the relative path (e.g. music/Music/Album/track.flac) from a track object.
   *  Handles both /media/music/... URLs and /api/stream?path=... (linked tracks). */
  _resolveTrackRelPath(track) {
    // Prefer track.path if available (server already sets it correctly)
    if (track.path) return track.path;
    if (!track.url) return null;
    const url = new URL(track.url, window.location.origin);
    // Linked tracks use /api/stream?path=/absolute/path
    if (url.pathname === '/api/stream' && url.searchParams.has('path')) {
      // We can't derive the relative DB path from an absolute filesystem path on the client,
      // but the track object should always have .path set by the server.
      return null;
    }
    // Normal media tracks: /media/music/Album/track.flac → music/Album/track.flac
    return decodeURIComponent(url.pathname.replace(/^\/api\/stream\//, '').replace(/^\/media\//, ''));
  }

  /** Pre-fetch lyrics metadata (network only, no DOM). Returns raw API data or null. */
  async _prefetchLyricsData(track) {
    if (!track || (!track.url && !track.path)) return null;
    try {
      const relPath = this._resolveTrackRelPath(track);
      if (!relPath) return null;
      const encodedRelPath = relPath.split('/').map(s => encodeURIComponent(s)).join('/');
      const res = await fetch(`/api/track-info/${encodedRelPath}`);
      if (!res.ok) return null;
      return await res.json();
    } catch { return null; }
  }

  // ─── Lyrics Loading State ────────────────────────────────────────────────
  _showLyricsLoadingState(step = 0) {
    const container = this.getOverlayRoot()?.querySelector('#musicLyricsStage');
    if (!container) return;
    const steps = [
      { icon: ICONS.search, text: 'Searching lyrics databases…' },
      { icon: ICONS.mic, text: 'Transcribing with Whisper AI…' },
      { icon: ICONS.wand, text: 'Enhancing word-level timestamps…' },
    ];
    let el = container.querySelector('.lyrics-loading-state');
    if (!el) {
      el = document.createElement('div');
      el.className = 'lyrics-loading-state';
      container.prepend(el);
    }
    el.innerHTML = steps.map((s, i) => `
      <div class="lyrics-loading-step ${i < step ? 'done' : i === step ? 'active' : ''}">
        <span class="lyrics-loading-step-icon">${s.icon}</span>
        <span class="lyrics-loading-step-text">${s.text}</span>
        ${i < step ? '<span class="lyrics-loading-step-check">✓</span>' : i === step ? '<span class="lyrics-loading-step-spinner"></span>' : ''}
      </div>
    `).join('');
  }

  _hideLyricsLoadingState() {
    const container = this.getOverlayRoot()?.querySelector('#musicLyricsStage');
    const el = container?.querySelector('.lyrics-loading-state');
    if (el) {
      el.style.opacity = '0';
      setTimeout(() => el.remove(), 400);
    }
  }

  async fetchAndDisplayLyrics(track, prefetchedMeta = null) {
    // Stop any existing lyrics poll from a previous track
    if (this._lyricsPollTimer) {
      clearInterval(this._lyricsPollTimer);
      this._lyricsPollTimer = null;
    }
    this.currentLyrics = null;
    this.currentLyricsType = null;
    this._partialLyricsLoaded = false;
    this._lyricsLaunchAlertedForTrackId = null;
    const lyricsEl = this.renderRoot?.querySelector('#zenLyricsOverlay');
    if (lyricsEl) lyricsEl.classList.remove('visible');

    if (!track || (!track.url && !track.path)) return;

    // Show lyrics loading state (and clear any existing no-content bar to avoid double spinners)
    this.getOverlayRoot()?.querySelector('.lyrics-no-content')?.remove();
    this._showLyricsLoadingState(0);

    try {
      let meta = prefetchedMeta;
      if (!meta) {
        const relPath = this._resolveTrackRelPath(track);
        if (!relPath) return;
        _dbg('[lyrics] Fetching track-info for:', relPath);
        const encodedRelPath = relPath.split('/').map(s => encodeURIComponent(s)).join('/');
        const res = await fetch(`/api/track-info/${encodedRelPath}`);
        if (!res.ok) {
          _dbgWarn('[lyrics] API returned', res.status);
          return;
        }
        meta = await res.json();
      }

      _dbg('[lyrics] Metadata received:', { title: meta.title, artist: meta.artist, album: meta.album, year: meta.year, lyricsType: meta.lyricsType, lyricsLength: meta.lyrics?.length || 0, hasPicture: !!meta.picture });

      // Update loading state — lyrics found, now processing
      this._showLyricsLoadingState(1);

      // Update page elements from proper metadata (title, artwork)
      const renderRoot = this.getOverlayRoot();
      if (renderRoot) {
        // Update title from metadata (cleaner than filename-derived title)
        if (meta.title) {
          const titleEl = renderRoot.querySelector('#musicTrackTitleTrigger');
          if (titleEl) {
            const displayTitle = meta.artist ? `${meta.artist} — ${meta.title}` : meta.title;
            titleEl.textContent = displayTitle;
          }
          // Also update the main visible title in the immersive art panel
          const mainTitleEl = renderRoot.querySelector('#mainTrackTitle');
          if (mainTitleEl) {
            mainTitleEl.textContent = meta.title;
            mainTitleEl.classList.remove('is-overflowing');
          }
        }

        // Update artist in the immersive art panel
        if (meta.artist) {
          const artistEl = renderRoot.querySelector('#mainTrackArtist');
          if (artistEl) artistEl.textContent = meta.artist;
        }

        // Update artwork — prefer per-track embedded cover art over album cover
        const artEl = renderRoot.querySelector('#musicTrackArtwork');
        if (artEl) {
          let artSrc = this.elements?.globalPlayerArt?.src;
          const previewSource = track?.previewSource || null;
          const hasTrackSidecarPreview = previewSource === 'track-sidecar';
          _dbg('[artwork-debug] metadata callback — meta.picture:', !!meta.picture, 'globalPlayerArt.src:', artSrc);
          // If track has embedded cover art, use the track-cover API for this specific track
          if (meta.picture && !hasTrackSidecarPreview) {
            const relPath = this._resolveTrackRelPath(track);
            _dbg('[artwork-debug] track has embedded cover, relPath:', relPath);
            if (relPath) {
              const trackCoverUrl = `/api/track-cover/${relPath.split('/').map(s => encodeURIComponent(s)).join('/')}?w=700&fmt=webp`;
              _dbg('[artwork-debug] using per-track cover URL:', trackCoverUrl);
              artSrc = trackCoverUrl;
              // Also update the global player art to match
              if (this.elements?.globalPlayerArt) {
                this.elements.globalPlayerArt.src = trackCoverUrl;
              }
            }
          } else if (meta.picture && hasTrackSidecarPreview) {
            _dbg('[artwork-debug] preserving track-sidecar preview over embedded metadata cover');
          }
          if (artSrc && artEl.src !== artSrc) {
            artEl.src = artSrc;
            artEl.alt = `${meta.title || track.title || 'Track'} artwork`;
            _dbg('[artwork-debug] Updated #musicTrackArtwork from', meta.picture ? 'embedded track cover' : 'globalPlayerArt', '→', artSrc);
            // Re-extract accent color from the new artwork
            if (meta.picture) {
              artEl.addEventListener('load', () => {
                const accent = this.colorEngine?.updateThemeFromCover(artEl) || this.extractColorFromImage(artEl);
                if (accent) {
                  this.albumAccent = accent;
                  this.pageUi?.page?.style.setProperty('--music-overlay-accent', accent);
                  this.applyVisualizerColorMode();
                  this._extractAndApplyPalette?.(artEl);
                }
              }, { once: true });
            }
          }
        }
      }

      // GPU typography disabled — HTML LyricsEngine handles all text rendering
      // (see docs/text-animation-systems.md)

      // Dynamically update album view with real metadata
      if (this.elements?.grid) {
        const currentTrack = this.items[this.currentTrackIndex];
        updateAlbumViewMetadata(this.elements.grid, {
          trackId: currentTrack?.id,
          title: meta.title,
          artist: meta.artist,
          album: meta.album,
          year: meta.year,
          duration: meta.duration,
        });
      }

      if (meta.lyrics) {
        if (meta.lyricsType === 'synced') {
          try {
            this.currentLyrics = JSON.parse(meta.lyrics);
            this.currentLyricsType = 'synced';
          } catch (e) {
            _dbgWarn('[lyrics] Failed to parse synced lyrics, treating as unsynced:', e.message);
            this.currentLyrics = meta.lyrics;
            this.currentLyricsType = 'unsynced';
          }
        } else {
          this.currentLyrics = meta.lyrics;
          this.currentLyricsType = 'unsynced';
        }

        // Feed real lyrics into the LyricsEngine
        if (this.lyrics) {
          if (this.currentLyricsType === 'synced' && Array.isArray(this.currentLyrics)) {
            // Debug: show raw shape of first synced line
            _dbg('[lyrics] Raw synced data sample:', JSON.stringify(this.currentLyrics[0]));
            _dbg('[lyrics] All keys in first line:', Object.keys(this.currentLyrics[0] || {}));

            // Build authoritative timeline from synced data
            // lyricIdea14: Frontend is a "dumb renderer" — use BE word timestamps when available
            const syncedTimeline = this.currentLyrics.map((l, idx) => {
              // Handle vocal_cue entries (instrumental gaps)
              if (l.type === 'vocal_cue') {
                const cueStart = parseFloat(l.time) || 0;
                const cueEnd = parseFloat(l.end) || cueStart + 3;
                return { type: 'vocal_cue', start: cueStart, end: cueEnd, text: '' };
              }

              const text = l.text || l.line || l.words || '';
              // Robust time extraction: try multiple field names, convert ms→s if needed
              let startSec = parseFloat(l.start);
              if (isNaN(startSec)) startSec = parseFloat(l.startTimeMs) / 1000;
              if (isNaN(startSec)) startSec = parseFloat(l.startTime) / 1000;
              if (isNaN(startSec)) startSec = parseFloat(l.time);
              if (isNaN(startSec)) startSec = parseFloat(l.startMs) / 1000;

              let endSec = parseFloat(l.end);
              if (isNaN(endSec)) endSec = parseFloat(l.endTimeMs) / 1000;
              if (isNaN(endSec)) endSec = parseFloat(l.endTime) / 1000;
              if (isNaN(endSec)) endSec = parseFloat(l.endMs) / 1000;
              // Fallback: if no end, use next line's start or start+3
              if (isNaN(endSec)) {
                const nextLine = this.currentLyrics[idx + 1];
                let nextStart = parseFloat(nextLine?.start);
                if (isNaN(nextStart)) nextStart = parseFloat(nextLine?.startTimeMs) / 1000;
                if (isNaN(nextStart)) nextStart = parseFloat(nextLine?.startTime) / 1000;
                if (isNaN(nextStart)) nextStart = parseFloat(nextLine?.time);
                if (isNaN(nextStart)) nextStart = parseFloat(nextLine?.startMs) / 1000;
                endSec = !isNaN(nextStart) ? nextStart : startSec + 3;
              }

              if (idx === 0) {
                _dbg('[lyrics] Resolved first line timing:', { startSec, endSec, rawKeys: Object.keys(l), hasWordTimestamps: !!l.words });
              }

              // Guard: ensure end > start (negative durations crash word distribution)
              if (endSec <= startSec) {
                const nextLine = this.currentLyrics[idx + 1];
                let nextStart = parseFloat(nextLine?.time ?? nextLine?.start);
                if (!isNaN(nextStart) && nextStart > startSec) {
                  endSec = nextStart;
                } else {
                  endSec = startSec + 3;
                }
              }

              // ─── lyricIdea14: Use real word-level timestamps from BE if available ───
              if (Array.isArray(l.words) && l.words.length > 0 && l.words[0].start !== undefined) {
                // BE provided word-level sync (Enhanced LRC or WhisperX)
                if (window.__DEBUG__) _dbg(`[lyrics] ✅ Line ${idx}: Using BE word-level timestamps (${l.words.length} words)`);
                let wordData = l.words.map((w, wi) => {
                  const wo = {
                    text: w.word || w.text || w,
                    start: parseFloat(w.start),
                    end: parseFloat(w.end),
                  };
                  if (w.adlib) wo.adlib = true;
                  if (w.whisper) wo.whisper = true;
                  if (w.spoken) wo.spoken = true;
                  if (w.sung) wo.sung = true;
                  if (w.stretch) wo.stretch = true;
                  return wo;
                });
                // Update endSec from last word if needed
                const lastWordEnd = wordData[wordData.length - 1]?.end;
                if (lastWordEnd && lastWordEnd > endSec) endSec = lastWordEnd;

                // DUMB RENDERER: Trust BE word timestamps as-is. No caps, no redistribution.
                return { type: 'line', text: String(text), start: startSec, end: endSec, words: wordData };
              }

              // ─── Fallback: Heuristic word generation (no BE word data) ───
              // Only used when BE doesn't provide word-level timestamps
              _dbg(`[lyrics] ⚠️ Line ${idx}: No word timestamps, generating from text (${(endSec - startSec).toFixed(2)}s)`);
              const wordStrings = String(text).split(/\s+/).filter(Boolean);

              // Distribute words evenly across line duration
              const lineDur = endSec - startSec;
              const wordDurEach = wordStrings.length > 0 ? lineDur / wordStrings.length : lineDur;
              const wordData = wordStrings.map((wordStr, wIdx) => {
                return {
                  text: wordStr,
                  start: startSec + wIdx * wordDurEach,
                  end: startSec + (wIdx + 1) * wordDurEach,
                  isVocalStretch: false,
                };
              });

              return { type: 'line', text: String(text), start: startSec, end: endSec, words: wordData };
            });
            const lyricsText = this.currentLyrics.map(l => l.text);
            _dbg('[lyrics] Updating LyricsEngine with', lyricsText.length, 'synced lines', 'AUDIO_STATE:', this.audioEngine.audioElement.currentTime.toFixed(2), 'dur:', this.audioEngine.audioElement.duration, 'paused:', this.audioEngine.audioElement.paused);
            // Debug: verify words are present in timeline
            const withWords = syncedTimeline.filter(l => l.words && l.words.length > 0).length;
            const sample = syncedTimeline[0];
            _dbg(`[lyrics] Timeline quality: ${withWords}/${syncedTimeline.length} lines have words. Sample:`, sample?.words?.[0]);
            _dbg(`[lyrics-sync] About to call lyrics.setTrack — audioTime=${this.audioEngine.audioElement.currentTime.toFixed(2)} duration=${this.audioEngine.audioElement.duration} paused=${this.audioEngine.audioElement.paused}`);
            // Cache payload so renderTrackPage can re-feed if it runs after this
            this._showLyricsLoadingState(2); // Enhancing step
            const lyricsPayload = {
              ...track,
              lyrics: lyricsText,
              enhancedLyrics: { timeline: syncedTimeline },
              album: meta.album,
              year: meta.year,
            };
            this._pendingSyncedLyricsPayload = lyricsPayload;
            this._hideLyricsLoadingState();
            console.log('[DOM-LYRICS-DEBUG] fetchAndDisplayLyrics: calling setTrack with %d synced lines, engineMode=%s, container=%s', syncedTimeline.length, this.settings.engineMode, !!this.lyrics?.container);
            this.lyrics.setTrack(lyricsPayload).then(() => {
              console.log('[DOM-LYRICS-DEBUG] fetchAndDisplayLyrics: setTrack RESOLVED, timeline=%d, shell has-lyrics=%s', this.lyrics?.timeline?.length, this.lyrics?.container?.closest?.('.music-immersive-shell')?.classList?.contains('has-lyrics'));
              // Force re-sync after setTrack completes (worker may have delayed)
              const audioTime = this.audioEngine.audioElement.currentTime;
              const tl = this.lyrics?.timeline;
              _dbg(`[lyrics] POST-setTrack sync check: audioTime=${audioTime.toFixed(2)} timelineLen=${tl?.length} firstStart=${tl?.[0]?.start?.toFixed(2)} lastEnd=${tl?.[tl?.length-1]?.end?.toFixed(2)} activeIdx=${this.lyrics?.activeLineIndex}`);
              // Force active line recalculation
              if (this.lyrics) {
                this.lyrics._lastNow = -1;
                this.lyrics.activeLineIndex = -1;
                this.lyrics.updateActiveLine?.();
              }
            });
            // Feed timeline to GPU lyrics renderer — defer ALL during FLIP to avoid mesh jank
            if (this._isTransitioning || this._flipAnimation) {
              this._deferredFullLyricsTimeline = syncedTimeline;
              // Don't create ANY meshes during animation — they cause 100ms+ frame drops
            } else {
              this._deferredFullLyricsTimeline = null;
              this.mathVisualizer?.setLyricsTimeline?.(syncedTimeline);
            }
            // Feed current audio time so lyrics sync even when paused
            this.mathVisualizer?.setCurrentTime?.(this.audioEngine.getCurrentTime());
            // Auto-fetch translations if enabled — but only apply CACHED ones (don't auto-generate)
            if (this.settings.showTranslation) {
              this._fetchCachedTranslationOrTurnOff(track, trackPath);
              const container = this.getOverlayRoot()?.querySelector('#musicLyricsStage');
              if (container) container.classList.add('show-translations');
            }

            // Check if lyrics lack word-level timestamps → poll for Whisper enhancement
            const hasRealWords = syncedTimeline.some(l => l.words?.length > 0 && l.words[0]?.start !== undefined && l.type !== 'vocal_cue');
            const hasOnlySynthetic = !this.currentLyrics.some(l => Array.isArray(l.words) && l.words.length > 0 && l.words[0].start !== undefined);
            if (hasOnlySynthetic) {
              this._pollWhisperEnhancement(track, meta);
            }
           } else {
            const lyricsForEngine = typeof this.currentLyrics === 'string'
              ? this.currentLyrics.split('\n')
              : Array.isArray(this.currentLyrics) ? this.currentLyrics.map(l => l.text || l) : [];
            _dbg('[lyrics] Updating LyricsEngine with', lyricsForEngine.length, 'unsynced lines');
            this.lyrics.setTrack({ ...track, lyrics: lyricsForEngine, album: meta.album, year: meta.year }).then(() => {
              const audioTime = this.audioEngine.audioElement.currentTime;
              _dbg(`[lyrics] POST-setTrack (unsynced) sync check: audioTime=${audioTime.toFixed(2)} activeIdx=${this.lyrics?.activeLineIndex}`);
              if (this.lyrics) {
                this.lyrics._lastNow = -1;
                this.lyrics.activeLineIndex = -1;
                this.lyrics.updateActiveLine?.();
              }
            });
          }
        }

        // DEBUG: periodic sync monitor for 10s (only in debug mode)
        if (window.__DEBUG__) {
        if (this._lyricsSyncDebugInterval) clearInterval(this._lyricsSyncDebugInterval);
        let _syncDbgCount = 0;
        this._lyricsSyncDebugInterval = setInterval(() => {
          _syncDbgCount++;
          if (_syncDbgCount > 10 || !this.lyrics) { clearInterval(this._lyricsSyncDebugInterval); return; }
          const t = this.audioEngine.audioElement.currentTime;
          const tl = this.lyrics.timeline;
          const idx = this.lyrics.activeLineIndex;
          const entry = tl?.[idx];
          const running = !!this.lyrics.frameId;
          _dbg(`[lyrics] SYNC-MON #${_syncDbgCount}: audio=${t.toFixed(2)} idx=${idx} running=${running} entry=[${entry?.start?.toFixed(2)}..${entry?.end?.toFixed(2)}] "${(entry?.text||'').substring(0,25)}" tlLen=${tl?.length}`);
        }, 1000);
        }

      } else {
        _dbg('[lyrics] No lyrics in metadata, showing track info only');
        this._hideLyricsLoadingState();
        // No lyrics available — show rich metadata instead
        const lyricsStatus = meta.lyricsStatus || 'not_found';
        if (this.lyrics) {
          this.lyrics.setTrack({
            ...track,
            title: meta.title || track.title,
            artist: meta.artist || track.artist,
            lyrics: [],
            album: meta.album,
            year: meta.year,
            lyricsStatus,
          });
        }
        this.mathVisualizer?.setLyricsTimeline?.([]);

        // Poll for lyrics if BE is generating them or if not found (will auto-fetch from LRCLIB)
        if (lyricsStatus === 'queued' || lyricsStatus === 'generating' || lyricsStatus === 'not_found') {
          this._pollForLyrics(track, meta);
        }
      }
    } catch (err) {
      _dbgWarn('[lyrics] Failed to fetch:', err.message);
      this._hideLyricsLoadingState();
    }
  }

  /**
   * Poll BE for lyrics generation status. When ready, reload lyrics into the engine.
   */
  _pollForLyrics(track, meta) {
    if (this._lyricsPollTimer) clearInterval(this._lyricsPollTimer);
    const trackId = track.id;
    let relPath = track.id || '';
    // Decode first to avoid double-encoding (track.id may already contain %5B etc.)
    try { relPath = decodeURIComponent(relPath); } catch {}
    const encodedRelPath = relPath.split('/').map(s => encodeURIComponent(s)).join('/');
    let attempts = 0;
    const maxAttempts = 120; // ~10 minutes at 5s interval

    _dbg(`[lyrics-poll] Starting poll for: ${meta.title || relPath}`);

    // Register in AI Activity Hub
    const hub = window.aiHub;
    const hubTaskId = `lyrics-gen-${relPath}-${Date.now()}`;
    const trackName = meta.title || track.title || relPath.split('/').pop();
    hub?.addTask({ id: hubTaskId, type: 'lyrics', label: `Lyrics: ${trackName}`, total: 1, trackPath: relPath, trackIndex: this.currentTrackIndex ?? -1 });
    this._lyricsHubTaskId = hubTaskId;
    const updateNoLyricsStatus = (data) => {
      if (this.currentTrackId() !== trackId) return;
      const status = data.status;
      const hasPartial = data.partial || this._partialLyricsLoaded;
      const titleEl = this.getOverlayRoot()?.querySelector('.lyrics-no-content-title');
      const hintEl = this.getOverlayRoot()?.querySelector('.lyrics-no-content-hint');
      const iconEl = this.getOverlayRoot()?.querySelector('.lyrics-no-content-icon');
      if (status === 'generating') {
        if (hasPartial) {
          if (titleEl) titleEl.textContent = 'Enhancing lyrics…';
          if (hintEl) hintEl.textContent = data.stepLabel || 'Adding word-level timestamps ♪';
          if (iconEl) {
            iconEl.classList.add('is-loading');
            iconEl.innerHTML = `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M15 4V2"/><path d="M15 16v-2"/><path d="M8 9h2"/><path d="M20 9h2"/><path d="M17.8 11.8 19 13"/><path d="M15 9h0"/><path d="M17.8 6.2 19 5"/><path d="M3 21l9-9"/><path d="M12.2 6.2 11 5"/></svg>`;
          }
        } else {
          if (titleEl) titleEl.textContent = 'Generating lyrics…';
          if (hintEl) hintEl.textContent = data.stepLabel || 'Creating word-level timestamps with AI ♪';
          if (iconEl) {
            iconEl.classList.add('is-loading');
            if (data.step === 'transcribing') {
              iconEl.innerHTML = `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12h2"/><path d="M6 8v8"/><path d="M10 4v16"/><path d="M14 6v12"/><path d="M18 8v8"/><path d="M22 12h-2"/></svg>`;
            } else if (data.step === 'searching_lyrics') {
              iconEl.innerHTML = `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>`;
            } else if (data.step === 'aligning' || data.step === 'mapping' || data.step === 'decensoring') {
              iconEl.innerHTML = `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M15 4V2"/><path d="M15 16v-2"/><path d="M8 9h2"/><path d="M20 9h2"/><path d="M17.8 11.8 19 13"/><path d="M15 9h0"/><path d="M17.8 6.2 19 5"/><path d="M3 21l9-9"/><path d="M12.2 6.2 11 5"/></svg>`;
            } else {
              iconEl.innerHTML = `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M4 10v4"/><path d="M8 6v12"/><path d="M12 3v18"/><path d="M16 6v12"/><path d="M20 10v4"/></svg>`;
            }
          }
        }
      } else if (status === 'queued') {
        const pos = data.queuePosition || 0;
        const procTitle = data.processingTitle;
        if (titleEl) titleEl.textContent = 'Queued for processing…';
        if (hintEl) {
          const parts = [];
          if (procTitle) parts.push(`Now processing: ${procTitle}`);
          if (pos > 0) parts.push(`Position ${pos} in queue`);
          hintEl.textContent = parts.length ? parts.join(' · ') : 'Will be processed shortly ♪';
        }
        if (iconEl) {
          iconEl.classList.add('is-loading');
          iconEl.innerHTML = `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`;
        }
      }
    };

    this._lyricsPollTimer = setInterval(async () => {
      attempts++;
      if (this.currentTrackId() !== trackId || attempts > maxAttempts) {
        _dbg(`[lyrics-poll] Stopped (track changed or timeout)`);
        clearInterval(this._lyricsPollTimer);
        this._lyricsPollTimer = null;
        if (attempts > maxAttempts) hub?.failTask(hubTaskId);
        return;
      }

      // If task was cancelled via AI hub, stop polling and cancel on server
      const hubTask = hub?.tasks.get(hubTaskId);
      if (hubTask && hubTask.status !== 'running') {
        clearInterval(this._lyricsPollTimer);
        this._lyricsPollTimer = null;
        return;
      }

      try {
        const res = await fetch(`/api/lyrics-status/${encodedRelPath}`);
        if (!res.ok) return;
        const data = await res.json();
        _dbg(`[lyrics-poll] Status: ${data.status} (attempt ${attempts}) hasLyrics=${!!data.lyrics} partial=${data.partial} trackMatch=${this.currentTrackId() === trackId}`);

        if (
          data.status === 'not_found' &&
          data.errorMessage &&
          this.currentTrackId() === trackId &&
          this._lyricsLaunchAlertedForTrackId !== trackId
        ) {
          this._lyricsLaunchAlertedForTrackId = trackId;
          console.error(`[lyrics-poll] Backend aligner failure: ${data.errorMessage}`);
          window.alert(`Lyrics aligner failed for this track:\n${data.errorMessage}`);
        }

        // Update the no-lyrics UI with current status
        updateNoLyricsStatus(data);

        // Show/hide model download overlay
        if (data.step === 'downloading_model') {
          this._showModelDownloadOverlay(data.stepLabel);
        } else if (data.step === 'error' && this._modelDownloadOverlay) {
          // Show error in overlay then auto-dismiss
          const txt = this._modelDownloadOverlay.querySelector('.mdl-dl-text');
          const spinner = this._modelDownloadOverlay.querySelector('.mdl-dl-spinner');
          if (txt) txt.textContent = data.stepLabel || 'AI engine error';
          if (spinner) spinner.style.display = 'none';
          setTimeout(() => this._hideModelDownloadOverlay(), 5000);
        } else if (this._modelDownloadOverlay) {
          this._hideModelDownloadOverlay();
        }

        // Update AI hub with progress step
        if (data.stepLabel || data.step) {
          hub?.updateTask(hubTaskId, 0, 1, data.stepLabel, data.step);
        }

        // Load lyrics if available (partial line-level OR final ready)
        if (data.lyrics && this.currentTrackId() === trackId) {
          const isFinal = data.status === 'ready';
          const isPartial = data.partial === true;

          // Skip partial if we already loaded partial lyrics before
          if (isPartial && this._partialLyricsLoaded) {
            // Already showing line-level, just keep polling for word-level
          } else {
            try {
              const parsed = JSON.parse(data.lyrics);
              this.currentLyrics = parsed;
              this.currentLyricsType = 'synced';

              if (this.lyrics) {
                _dbg(`[lyrics-poll] ${isFinal ? '✅ Final' : ' Partial'} lyrics received (${parsed.length} lines). Loading into engine...`);
                // Directly feed lyrics into the engine pipeline without re-fetching track-info
                this.fetchAndDisplayLyrics(track, {
                  title: meta.title,
                  artist: meta.artist,
                  album: meta.album,
                  year: meta.year,
                  lyrics: data.lyrics,
                  lyricsType: 'synced',
                  lyricsStatus: isFinal ? 'ready' : 'generating',
                });
                if (isPartial) this._partialLyricsLoaded = true;
              }
            } catch (e) {
              _dbgWarn('[lyrics-poll] Failed to parse lyrics:', e.message);
            }
          }

          if (isFinal) {
            clearInterval(this._lyricsPollTimer);
            this._lyricsPollTimer = null;
            this._partialLyricsLoaded = false;
            hub?.completeTask(hubTaskId);
            document.dispatchEvent(new CustomEvent('chromic:track-assets-updated', { detail: { trackPath: relPath } }));
          }
        } else if (data.status === 'ready' && !data.lyrics) {
          // Ready but no lyrics data in response — re-fetch
          clearInterval(this._lyricsPollTimer);
          this._lyricsPollTimer = null;
          this._partialLyricsLoaded = false;
          hub?.completeTask(hubTaskId);
          document.dispatchEvent(new CustomEvent('chromic:track-assets-updated', { detail: { trackPath: relPath } }));
          this.fetchAndDisplayLyrics(track);
        } else if (data.status === 'not_found') {
          // Don't give up immediately — BE may still be processing the queue
          if (attempts >= 6) {
            clearInterval(this._lyricsPollTimer);
            this._lyricsPollTimer = null;
            this._partialLyricsLoaded = false;
            hub?.failTask(hubTaskId);
            _dbg(`[lyrics-poll] ❌ Lyrics not found after ${attempts} attempts, stopping poll`);
          } else {
            _dbg(`[lyrics-poll] Status: not_found (attempt ${attempts}), retrying...`);
          }
        }
      } catch (e) {
        // Network error, keep trying
      }
    }, 5000);
  }

  updateZenLyrics(currentTime) {
    const lyricsEl = this.renderRoot?.querySelector('#zenLyricsOverlay');
    if (!lyricsEl) return;

    if (!this.currentLyrics) {
      lyricsEl.classList.remove('visible');
      return;
    }

    if (this.currentLyricsType === 'synced' && Array.isArray(this.currentLyrics)) {
      const line = this.currentLyrics.find((l, i) => {
        const next = this.currentLyrics[i + 1];
        return currentTime >= l.time && (!next || currentTime < next.time);
      });
      if (line && line.text) {
        lyricsEl.textContent = line.text;
        lyricsEl.classList.add('visible');
      } else {
        lyricsEl.classList.remove('visible');
      }
    } else if (this.currentLyricsType === 'unsynced') {
      lyricsEl.textContent = String(this.currentLyrics).slice(0, 200);
      lyricsEl.classList.add('visible');
    }
  }

  async togglePlayPause() {
    // Throttle: ignore rapid-fire clicks (< 250ms apart)
    const now = performance.now();
    if (this._lastToggleTime && now - this._lastToggleTime < 250) {
      _dbg(`[audio] togglePlayPause throttled (${(now - this._lastToggleTime).toFixed(0)}ms since last)`);
      return;
    }
    this._lastToggleTime = now;

    const audio = this.audioEngine.audioElement;
    const wasPaused = audio.paused;

    // If resuming from a restored position (first play after page reload), re-affirm the seek
    // ONLY do this if _restoredFromReload is true - don't touch currentTime on normal pause/play
    if (wasPaused && this._pendingSeekTarget != null && this._restoredFromReload) {
      const target = this._pendingSeekTarget;
      this._pendingSeekTarget = null;

      // Log buffered ranges to diagnose seeking issues
      const buffered = audio.buffered;
      const ranges = [];
      for (let i = 0; i < buffered.length; i++) {
        ranges.push(`[${buffered.start(i).toFixed(2)}..${buffered.end(i).toFixed(2)}]`);
      }
      _dbg(`[audio-restore] PLAY pressed (restore mode): target=${target.toFixed(2)} currentTime=${audio.currentTime.toFixed(2)} readyState=${audio.readyState} buffered=${ranges.join(',')} networkState=${audio.networkState} seeking=${audio.seeking}`);

      // Use fastSeek if available (more accurate for compressed formats)
      if (audio.fastSeek) {
        audio.fastSeek(target);
      } else {
        audio.currentTime = target;
      }
      // Wait for seek to land before playing
      if (audio.seeking) {
        await new Promise((resolve) => {
          audio.addEventListener('seeked', resolve, { once: true });
          setTimeout(resolve, 500);
        });
      }
      _dbg(`[audio-restore] After re-seek: currentTime=${audio.currentTime.toFixed(2)} seeking=${audio.seeking}`);
    }

    await this.audioEngine.togglePlayback();

    // Log the exact moment audio starts outputting
    if (wasPaused) {
      audio.addEventListener('playing', () => {
        _dbg(`[audio-restore] 'playing' event fired: currentTime=${audio.currentTime.toFixed(3)}`);
      }, { once: true });
    }

    // After first play from restored position, monitor actual playback position
    if (wasPaused && this._restoredFromReload) {
      this._restoredFromReload = false;
      this._pendingSeekTarget = null; // Clear pending seek - restore is complete
      const expectedTime = audio.currentTime;
      // Log position for the first 500ms to detect jumps
      let checkCount = 0;
      const checkInterval = setInterval(() => {
        checkCount++;
        const drift = audio.currentTime - expectedTime - (checkCount * 0.1);
        _dbg(`[audio-restore] Playback check #${checkCount}: currentTime=${audio.currentTime.toFixed(3)} expected≈${(expectedTime + checkCount * 0.1).toFixed(3)} drift=${drift.toFixed(3)}s`);
        if (checkCount >= 5) clearInterval(checkInterval);
      }, 100);
    }

    this.updatePlayButtons();
    // Force lyrics resync on play/pause toggle
    if (this.lyrics) {
      this.lyrics._lastNow = -1;
      if (!this.lyrics.frameId && this._overlayIsOpen) {
        this.lyrics.start();
      }
    }
  }

  async seekBySeconds(deltaSeconds) {
    // User manually seeking - clear any pending restore state
    this._pendingSeekTarget = null;
    this._restoredFromReload = false;
    this.audioEngine.seekBySeconds(deltaSeconds);
    this.updateProgressUi();
    this.persistPlayerState();
  }

  playPrevious() {
    if (!this.items.length) {
      return;
    }

    const currentTime = this.audioEngine.getCurrentTime();
    if (currentTime > 5) {
      this.audioEngine.seekBySeconds(-currentTime);
      this.updateProgressUi();
      this.persistPlayerState();
      return;
    }

    const queue = this.getActiveQueueIds();
    const currentQueueIndex = this.getQueueIndex();
    if (currentQueueIndex > 0) {
      this.playTrackById(queue[currentQueueIndex - 1], { autoplay: true, expand: this.isPlayerExpanded });
      return;
    }

    if (this.repeatMode === 'all' && queue.length) {
      this.playTrackById(queue[queue.length - 1], { autoplay: true, expand: this.isPlayerExpanded });
    }
  }

  playNext({ dueToEnded = false } = {}) {
    // _dbg('[SHUFFLE-DEBUG] playNext called:', { dueToEnded, isShuffle: this.settings.isShuffle, repeatMode: this.repeatMode });
    if (!this.items.length) {
      // _dbg('[SHUFFLE-DEBUG] playNext: no items, aborting');
      return;
    }
    // Debounce: ignore rapid clicks while a track switch is in progress
    if (this._playNextLock) return;
    this._playNextLock = true;
    setTimeout(() => { this._playNextLock = false; }, 300);

    const currentTrackId = this.currentTrackId();
    // _dbg('[SHUFFLE-DEBUG] Current track ID:', currentTrackId);
    if (dueToEnded && this.repeatMode === 'one' && currentTrackId) {
      // _dbg('[SHUFFLE-DEBUG] Repeat one — replaying same track');
      this.playTrackById(currentTrackId, { autoplay: true, expand: this.isPlayerExpanded, startTime: 0, preserveSettingsView: true });
      return;
    }

    const queue = this.getActiveQueueIds();
    const currentQueueIndex = this.getQueueIndex(currentTrackId);
    // _dbg('[SHUFFLE-DEBUG] Active queue length:', queue.length, 'Current queue index:', currentQueueIndex, 'isShuffle:', this.settings.isShuffle);
    // _dbg('[SHUFFLE-DEBUG] Queue (first 10):', queue.slice(0, 10));
    // _dbg('[SHUFFLE-DEBUG] shuffledQueueIds length:', this.shuffledQueueIds?.length, 'queueTrackIds length:', this.queueTrackIds?.length);
    const nextTrackId = currentQueueIndex >= 0 ? queue[currentQueueIndex + 1] : queue[0];
    // _dbg('[SHUFFLE-DEBUG] Next track ID:', nextTrackId, 'Next index:', currentQueueIndex + 1);
    if (nextTrackId) {
      this.playTrackById(nextTrackId, { autoplay: true, expand: this.isPlayerExpanded, preserveSettingsView: true });
      return;
    }

    if (this.repeatMode === 'all' && queue.length) {
      // _dbg('[SHUFFLE-DEBUG] Repeat all — starting from beginning of queue');
      this.playTrackById(queue[0], { autoplay: true, expand: this.isPlayerExpanded, preserveSettingsView: true });
      return;
    }

    if (dueToEnded) {
      // _dbg('[SHUFFLE-DEBUG] Queue exhausted, attempting to play next album');
      // Auto-play next album when current album ends
      this._playNextAlbum();
    }
  }

  /** When an album finishes, find the next album and start playing it */
  _playNextAlbum() {
    if (!this.albums || !this.albums.length) {
      this.audioEngine.pause();
      this.updatePlayButtons();
      this.persistPlayerState({ immediate: true });
      return;
    }

    const currentAlbumKey = this.activeAlbumKey || this._currentAlbumKey;
    if (!currentAlbumKey) {
      this.audioEngine.pause();
      this.updatePlayButtons();
      return;
    }

    const albumIndex = this.albums.findIndex(a => a.key === currentAlbumKey);
    const nextAlbum = this.albums[albumIndex + 1] || this.albums[0]; // Wrap to first album
    if (nextAlbum && nextAlbum.tracks?.length) {
      this.activeAlbumKey = nextAlbum.key;
      this._currentAlbumKey = nextAlbum.key;
      // Set queue from track IDs (no setQueue method — use queueTrackIds directly)
      this.queueTrackIds = nextAlbum.tracks.map(t => t.id);
      if (this.settings.isShuffle) {
        this.shuffledQueueIds = shuffleList(this.queueTrackIds, null);
      }
      const firstTrack = this.settings.isShuffle
        ? nextAlbum.tracks[Math.floor(Math.random() * nextAlbum.tracks.length)]
        : nextAlbum.tracks[0];
      if (firstTrack) {
        _dbg(`[MusicPlayer]  Auto-playing next album: "${nextAlbum.name}"`);
        this.playTrackById(firstTrack.id, { autoplay: true, expand: this.isPlayerExpanded, preserveSettingsView: true });
      }
    }
  }

  handleTrackEnded() {
    this.playNext({ dueToEnded: true });
  }

  openOverlay(mode = 'player') {
    _dbg('[VIZ-DEBUG] openOverlay ENTER: mode=%s active=%o currentTrackIndex=%d hasTrack=%o', mode, this.active, this.currentTrackIndex, !!this.items[this.currentTrackIndex]);
    if (this._mathVizWarmTimeout) { clearTimeout(this._mathVizWarmTimeout); this._mathVizWarmTimeout = null; }
    if (this._isTransitioning) {
      _dbg('[VIZ-DEBUG] openOverlay: BLOCKED — transition in progress');
      return;
    }
    if (!this.active || this.currentTrackIndex < 0 || !this.items[this.currentTrackIndex]) {
      _dbg('[VIZ-DEBUG] openOverlay: EARLY RETURN — active=%o idx=%d hasTrack=%o', this.active, this.currentTrackIndex, !!this.items[this.currentTrackIndex]);
      return;
    }
    sessionStorage.setItem('overlay_active', '1');

    // Lock scroll EARLY — before any visual state changes —
    // so the scrollbar→padding swap happens while content is still opaque,
    // preventing visible layout shift on Windows (classic scrollbars).
    if (!document.body.classList.contains('music-overlay-open')) {
      const earlyScrollY = window.scrollY;
      // Freeze smooth scroll dampener at current position (overlay locks scroll to 0)
      window._chromicResetSmoothScroll?.(earlyScrollY);
      document.body.style.setProperty('--scroll-y', `${earlyScrollY}px`);
      this._showFakeScrollbar(earlyScrollY);
      document.body.classList.add('music-overlay-open');
    }

    // Freeze grid immediately — free GPU before FLIP animation starts
    document.querySelector('.music-albums-grid')?.classList.add('grid-frozen');

    this.isPlayerExpanded = true;
    this._overlayIsOpen = true;
    this._enableFocusTrap();
    this.isSettingsView = mode === 'settings';
    this._settingsEscGuard = mode === 'settings';
    this.isQueueSheetOpen = false;
    this.isScreenSaverIdle = false;

    if (!this.pageUi?.page) {
      this.renderTrackPage(this.items[this.currentTrackIndex]).catch(() => {
        this.setTrackWarning('Audio pipeline is still unlocking. Try the control again if playback was blocked by browser policy.');
      });
    } else {
      // Page already exists — immediately update metadata so user doesn't see old track
      const track = this.items[this.currentTrackIndex];
      if (track) {
        const renderRoot = this.getOverlayRoot();
        const artEl = renderRoot?.querySelector('#musicTrackArtwork');
        const titleEl = renderRoot?.querySelector('#mainTrackTitle');
        const artistEl = renderRoot?.querySelector('#mainTrackArtist');
        const titleTrigger = renderRoot?.querySelector('#musicTrackTitleTrigger');
        const cleanTitle = this._extractCleanTitle(track.title || track.name || '');
        const artist = track.artist || '';
        if (titleEl) { titleEl.textContent = cleanTitle; titleEl.classList.remove('is-overflowing'); }
        if (titleTrigger) titleTrigger.textContent = cleanTitle;
        if (artistEl) artistEl.textContent = artist;
        // Update artwork immediately from preloaded tile or track data
        // Always use withImageParams(700) to match what renderTrackPage would use — prevents double-load
        const rawArt = this._preloadedArtworkUrl || this.helpers.resolvePreviewUrl(track);
        const newArt = withImageParams(rawArt, 700);
        if (artEl && !artEl.src.includes(rawArt.split('?')[0])) {
          // Set src directly — source is from album tile (already in browser cache)
          artEl.src = newArt;
          this._artworkIsPreloaded = !!this._preloadedArtworkUrl;
        }
      }
    }

    // Restore pulse animation (may have been stopped during close morph)
    const artWrapEl = this.pageUi?.page?.querySelector('.music-track-art-wrap');
    if (artWrapEl) {
      artWrapEl.style.animation = '';
      artWrapEl.style.transform = '';
    }
    // Start deferred rAF loops now that overlay is visible
    // Throttle lyrics during open animation for smooth FLIP
    if (this.lyrics) this.lyrics.setMaxFps(30);
    this.lyrics?.start();
    // Reset FPS tracking to avoid transition frames triggering low-precision mode
    if (this.lyrics) {
      this.lyrics._lowPrecisionMode = false;
      this.lyrics._fpsHistory = [];
      this.lyrics._fpsTrackingStart = 0;
      this.lyrics.container?.classList.remove('lyrics-low-precision');
    }
    // Delayed resync — lyrics setTrack may still be awaiting worker
    setTimeout(() => {
      if (this.lyrics && this.lyrics.timeline?.length) {
        // Only force resync if the active line is stale
        const now = this.audioEngine?.audioElement?.currentTime || 0;
        const currentIdx = this.lyrics.activeLineIndex;
        const currentEntry = currentIdx >= 0 ? this.lyrics.timeline[currentIdx] : null;
        const isStale = !currentEntry || now < currentEntry.start - 0.5 || now > currentEntry.end + 0.5;
        if (isStale) {
          this.lyrics._lastNow = -1;
          this.lyrics.activeLineIndex = -1;
          this.lyrics.updateActiveLine?.();
        }
        if (!this.lyrics.frameId) this.lyrics.start();
      }
    }, 500);
    if (this.settings.engineMode === 'premium' && !this.mathVisualizer) {
      // Lazily init the GPU visualizer on first overlay open (non-blocking)
      const analyser = this.audioEngine?.getAnalyser();
      const renderRoot = this.getOverlayRoot();
      _dbg('[VIZ-DEBUG] openOverlay: premium && no mathVisualizer, analyser=%o renderRoot=%o _mathVisualizerLoading=%o', !!analyser, !!renderRoot, this._mathVisualizerLoading);
      if (analyser && renderRoot) {
        // If init is already in-flight, wait for it instead of calling again (which returns early)
        const initPromise = this._mathVisualizerLoading
          ? new Promise(resolve => {
              _dbg('[VIZ-DEBUG] openOverlay: polling for in-flight init...');
              let tries = 0;
              const poll = () => {
                if (this.mathVisualizer || !this._mathVisualizerLoading || ++tries > 60) {
                  _dbg('[VIZ-DEBUG] openOverlay: poll done after %d tries, mathVisualizer=%o _mathVisualizerLoading=%o', tries, !!this.mathVisualizer, this._mathVisualizerLoading);
                  return resolve();
                }
                setTimeout(poll, 50);
              };
              poll();
            })
          : this.initMathVisualizer(analyser, renderRoot);
        // Don't await — let FLIP run immediately, visualizer catches up
        initPromise.then(() => {
          _dbg('[VIZ-DEBUG] openOverlay: initPromise resolved, mathVisualizer=%o _overlayIsOpen=%o _flipAnimation=%o', !!this.mathVisualizer, this._overlayIsOpen, !!this._flipAnimation);
          if (this.mathVisualizer && this._overlayIsOpen && this.settings.engineMode === 'premium') {
            // Pre-apply cached palette so first frame has correct colors (album mode only)
            if (this._lastPalette && this._lastPalette.length >= 3 && this.settings.visualizerColorMode === 'album') {
              const toHex = (c) => `#${((1 << 24) | (c.r << 16) | (c.g << 8) | c.b).toString(16).slice(1)}`;
              this.mathVisualizer.setPalette([toHex(this._lastPalette[0]), toHex(this._lastPalette[1]), toHex(this._lastPalette[2])]);
            }
            // Show the visualizer container
            const vizContainer = this.getOverlayRoot()?.querySelector('#mathVisualizerContainer');
            if (vizContainer) vizContainer.style.display = '';
            // If FLIP already finished, run the full ignition sequence now
            if (!this._flipAnimation) {
              _dbg('[VIZ-DEBUG] openOverlay: FLIP done, running ignition now');
              this._runVisualizerIgnition();
            } else {
              // FLIP still running — start low-res so visualizer is visible behind blur
              _dbg('[VIZ-DEBUG] openOverlay: FLIP still running, starting low-res (0.1, 2fps)');
              if (this._lastPalette && this._lastPalette.length >= 3 && this.settings.visualizerColorMode === 'album') {
                const toHex = (c) => `#${((1 << 24) | (c.r << 16) | (c.g << 8) | c.b).toString(16).slice(1)}`;
                this.mathVisualizer.setPalette([toHex(this._lastPalette[0]), toHex(this._lastPalette[1]), toHex(this._lastPalette[2])]);
              }
              this.mathVisualizer.setResolutionScale(0.6);
              this.mathVisualizer.setMaxFps(this.settings.fpsMax || 30);
              this.mathVisualizer.setTimeScale(1.0, 0);
              if (!this.mathVisualizer.running) this.mathVisualizer.start();
              this.mathVisualizer.setUiVisible(true);
            }
          }
        }).catch(e => _dbgWarn('[MathVisualizer] lazy init failed:', e));
      }
    }
    // Apply correct color palette to visualizer on re-open (respects selected color mode)
    if (this.mathVisualizer || this.visualizer) {
      this.applyVisualizerColorMode();
    }
    // Ensure GPU visualizer is started on re-open
    if (this.mathVisualizer && this.settings.engineMode === 'premium') {
      _dbg('[VIZ-DEBUG] openOverlay: re-open existing mathVisualizer, running=%o preWarm=%o', this.mathVisualizer.running, !!this._preWarmContainer);
      const vizContainer = this.getOverlayRoot()?.querySelector('#mathVisualizerContainer');
      if (vizContainer) vizContainer.style.display = '';
      // If still in pre-warm container, re-parent canvas to overlay
      if (this._preWarmContainer && vizContainer) {
        const canvas = this.mathVisualizer.renderer?.domElement;
        if (canvas) vizContainer.appendChild(canvas);
        this._preWarmContainer.remove();
        this._preWarmContainer = null;
        // Swap mock analyser for real one
        const realAnalyser = this.audioEngine?.getAnalyser?.();
        if (realAnalyser) {
          this.mathVisualizer.analyser = realAnalyser;
          if (this._preWarmUsedMockAnalyser) {
            this.mathVisualizer.audioData = new Uint8Array(realAnalyser.frequencyBinCount || 1024);
            this._preWarmUsedMockAnalyser = false;
          }
        }
        // Ensure blur overlay exists in the real container
        this._ensureVizBlurOverlay(vizContainer);
      }
      // Start low-res during FLIP — visible behind blur, lightweight
      this.mathVisualizer.setResolutionScale(0.6);
      this.mathVisualizer.setMaxFps(this.settings.fpsMax || 30);
      this.mathVisualizer.setTimeScale(1.0, 0);
      // Force canvas fully opaque — zen fade may have left it transparent from previous close
      const vizCanvas = this.mathVisualizer.renderer?.domElement;
      if (vizCanvas) vizCanvas.style.opacity = '1';
      if (this.mathVisualizer.zenFadeCurrent !== undefined) {
        this.mathVisualizer.zenFadeCurrent = 1;
        this.mathVisualizer.zenFadeTarget = 1;
      }
      if (!this.mathVisualizer.running) {
        // Reset dilated time after long idle to avoid GPU precision issues
        if (this.mathVisualizer.dilatedTime > 3600) {
          this.mathVisualizer.dilatedTime = 0;
          this.mathVisualizer.lastRealTime = 0;
        }
        this.mathVisualizer.start();
      }
      this.mathVisualizer.setUiVisible(true);
      // Resize to final container size and render one frame before FLIP reveals it
      const cw = vizContainer?.clientWidth || window.innerWidth;
      const ch = vizContainer?.clientHeight || window.innerHeight;
      if (cw > 0 && ch > 0) {
        this.mathVisualizer.renderer.setSize(cw, ch, false);
        this.mathVisualizer.postProcessing?.setSize(cw, ch);
        this.mathVisualizer.current?.resize(cw, ch, window.devicePixelRatio * 0.6);
        this.mathVisualizer.lyricsRenderer?.setAspect(cw, ch);
      }
      if (this.mathVisualizer.renderFrame) this.mathVisualizer.renderFrame();
      // GPU mode: no CSS blur needed — text renders at full res
      _dbg('[VIZ-DEBUG] openOverlay: started low-res (0.1, 2fps) during FLIP');
      // Premium/GPU mode: completely disable DOM lyrics panel to free RAM/GPU
      if (this.lyrics) {
        this.lyrics.stop();
      }
      const domLyricsPanel = this.getOverlayRoot()?.querySelector('.music-immersive-lyrics-panel');
      if (domLyricsPanel) {
        domLyricsPanel.style.display = 'none';
        domLyricsPanel.innerHTML = ''; // Remove all DOM word spans
      }
    } else if (this.mathVisualizer && this.settings.engineMode !== 'premium') {
      // Classic mode — ensure GPU visualizer is stopped and hidden
      _dbg('[VIZ-DEBUG] openOverlay: engineMode=%s, stopping mathVisualizer', this.settings.engineMode);
      this.mathVisualizer.stop();
      const vizContainer = this.getOverlayRoot()?.querySelector('#mathVisualizerContainer');
      if (vizContainer) vizContainer.style.display = 'none';
    }
    // Stop mini-player aurora — free GPU for premium visualizer
    this._globalPlayerViz?.stop();
    const overlayRoot = this.getOverlayRoot();
    _dbg(`[music] open overlay mode=${mode} isSettingsView=${this.isSettingsView}`);

    // Cancel any pending close animation and clean stale state
    scheduler.cancel('overlay-flip-close');
    // Remove any in-flight phantom morph
    const wasCancellingClose = Boolean(document.querySelector('.close-morph-phantom')) || this._isCloseAnimating;
    document.querySelector('.close-morph-phantom')?.remove();
    document.querySelector('.close-morph-scrim')?.remove();
    this._isCloseAnimating = false;
    if (overlayRoot) {
      overlayRoot.classList.remove('flip-closing', 'flip-done', 'is-closing', 'flip-animating');
      // Force instant visibility — override CSS transition
      overlayRoot.style.transition = 'none';
      overlayRoot.style.visibility = 'visible';
      overlayRoot.style.opacity = '1';
      const page = overlayRoot.querySelector('.music-track-page') || overlayRoot.querySelector('.music-player-layer');
      if (page) {
        page.style.transform = '';
        page.style.borderRadius = '';
        page.style.transformOrigin = '';
        page.style.willChange = '';
        page.style.transition = 'none';
        // Hide page initially — FLIP animation will reveal it after positioning
        page.style.opacity = '0';
        page.style.pointerEvents = '';
        page.classList.remove('is-collapsed');
      }
      // Add is-active BEFORE removing inline overrides so there's no hidden frame
      syncOverlayHostState(overlayRoot, true);
      // Now safe to remove inline overrides — is-active class keeps it visible
      overlayRoot.style.removeProperty('transition');
      overlayRoot.style.removeProperty('visibility');
      overlayRoot.style.removeProperty('opacity');
      // NOTE: page.style.opacity stays '0' — FLIP animation will set it to '1' after positioning
      // Safety: if caller opened overlay without starting FLIP, reveal page to avoid invisible overlay.
      clearTimeout(this._overlayRevealFallbackTimer);
      this._overlayRevealFallbackTimer = setTimeout(() => {
        if (!this._overlayIsOpen || this._flipAnimation) return;
        const fallbackPage = overlayRoot.querySelector('.music-track-page') || overlayRoot.querySelector('.music-player-layer');
        if (!fallbackPage) return;
        fallbackPage.style.opacity = '1';
        fallbackPage.style.transform = '';
        fallbackPage.style.transition = '';
        overlayRoot.classList.remove('flip-animating');
        overlayRoot.classList.add('flip-done');
      }, 160);
    } else {
      syncOverlayHostState(overlayRoot, true);
    }
    // Skip entrance animation class — FLIP handles it
    this.bindOverlayClickCapture();
    this.bindIdleWatchers();
    this.applyPageFlags();
    this.persistPlayerState();

    // Visualizer restart is handled by runAlbumFlipTransition onfinish
    // (not started here to avoid competing with FLIP animation)
  }

  closeOverlay() {
    if (this._isTransitioning) {
      _dbg('[music] closeOverlay BLOCKED — transition in progress');
      return;
    }
    // Restore album-view-cover if it was hidden during flip
    const hiddenCover = document.querySelector('.album-view-cover[style*="opacity: 0"]');
    if (hiddenCover) { hiddenCover.style.opacity = ''; hiddenCover.style.transition = ''; }
    // Guard: prevent Escape from also closing album view
    this._justClosedOverlay = true;
    setTimeout(() => { this._justClosedOverlay = false; }, 800);
    this._isTransitioning = true;
    clearTimeout(this._overlayRevealFallbackTimer);
    this.isPlayerExpanded = false;
    this._overlayIsOpen = false;
    // Freeze DOM lyrics when overlay closes (not visible, saves CPU)
    if (this.lyrics && !this.lyrics._premiumDisabled) {
      this.lyrics.stop();
    }
    this._disableFocusTrap();
    this.isSettingsView = false;
    this._settingsEscGuard = false;
    this.isQueueSheetOpen = false;
    sessionStorage.removeItem('overlay_active');
    // Keep grid frozen during close morph animation — unfreeze after phantom handoff
    // (moved to phantom setTimeout or fallback path below)
    // Stop heavy rAF loops when overlay not visible
    this.lyrics?.stop();
    // Keep visualizer alive at minimal power for instant re-open (warm GPU context)
    // Stop after 10s to save power if user doesn't reopen
    if (this.mathVisualizer) {
      this.mathVisualizer.setResolutionScale(0.6);
      this.mathVisualizer.setMaxFps(1);
      this.mathVisualizer.setTimeScale(0.01, 50);
      this._mathVizWarmTimeout = setTimeout(() => {
        if (!this.isPlayerExpanded) {
          this.mathVisualizer?.stop();
          _dbg('[VIZ-DEBUG] mathVisualizer fully stopped after warm timeout');
        }
      }, 10000);
    }
    this.visualizer?.stop();
    // Restart mini-player aurora (was stopped when overlay opened)
    if (this._globalPlayerViz && this._globalPlayerVizEnabled) {
      this._globalPlayerViz.start();
    }
    const overlayRoot = this.getOverlayRoot();
    if (overlayRoot?.contains(document.activeElement)) {
      document.activeElement?.blur?.();
    }
    _dbg('[music] close overlay');

    // Remove overlay-open class early so globalPlayerArt returns correct position
    document.body.classList.remove('music-overlay-open');
    this._removeFakeScrollbar();
    // Keep player hidden during close animation — ghost handles the visual
    const globalPlayer = this.elements.globalMusicPlayer;
    if (globalPlayer) globalPlayer.style.visibility = 'hidden';
    this._restoreScrollPosition();

    // Batch all rect reads together (single forced reflow instead of multiple)
    const targetArt = this.elements.globalPlayerArt;
    const artRect = targetArt?.getBoundingClientRect?.();
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const targetRect = (artRect && artRect.width > 0)
      ? artRect
      : (this._lastFlipSourceRect && this._lastFlipSourceRect.width > 0)
        ? this._lastFlipSourceRect
        : { left: vw * 0.3, top: vh * 0.3, width: vw * 0.4, height: vh * 0.4 };
    _dbg(`[music] close target rect top=${targetRect.top.toFixed(1)} left=${targetRect.left.toFixed(1)} w=${targetRect.width.toFixed(1)} h=${targetRect.height.toFixed(1)} vh=${vh} section=${document.body.dataset.section}`);

    // Read mini-player rects (already in correct state after class removal above — no extra reflow needed)
    const _miniPlayerEl = this.elements.globalMusicPlayer;
    const _miniArtImg = this.elements.globalPlayerArt;
    const _miniPlayerRect = _miniPlayerEl?.getBoundingClientRect();
    const _miniArtRect = _miniArtImg?.getBoundingClientRect();
    _dbg(`[music] mini-player rects playerTop=${_miniPlayerRect?.top?.toFixed(1)} playerLeft=${_miniPlayerRect?.left?.toFixed(1)} playerW=${_miniPlayerRect?.width?.toFixed(1)} artTop=${_miniArtRect?.top?.toFixed(1)} artLeft=${_miniArtRect?.left?.toFixed(1)} artW=${_miniArtRect?.width?.toFixed(1)}`);

    // Re-add overlay-open to keep player hidden during close animation; removed in closeComplete
    document.body.style.setProperty('--scroll-y', `${window.scrollY}px`);
    document.body.classList.add('music-overlay-open');

    if (overlayRoot) {
      const page = overlayRoot.querySelector('.music-track-page') || overlayRoot.querySelector('.music-player-layer');
      if (page) {
        const isMusicSection = document.body.dataset.section === 'music';

        // Keep background transparent — fullscreen visualizer is behind overlay
        overlayRoot.style.background = 'transparent';
        overlayRoot.classList.add('flip-closing');
        overlayRoot.classList.remove('flip-done');
        this._isCloseAnimating = true;

        let closeDone = false;
        const closeComplete = () => {
          if (closeDone) return;
          closeDone = true;
          _dbg('[music] closeComplete called');
          this._isCloseAnimating = false;
          overlayRoot.classList.remove('flip-closing');
          overlayRoot.style.removeProperty('opacity');
          overlayRoot.style.removeProperty('visibility');
          overlayRoot.style.removeProperty('transition');
          page.style.transform = '';
          page.style.borderRadius = '';
          page.style.transformOrigin = '';
          page.style.willChange = '';
          page.style.overflow = '';
          page.style.opacity = '';
          page.style.pointerEvents = '';
          page.classList.add('is-collapsed');
          // Remove phantom if exists
          document.querySelector('.close-morph-phantom')?.remove();
          document.querySelector('.close-morph-scrim')?.remove();
          // Reveal mini-player with staggered controls
          const miniPlayer = this.elements.globalMusicPlayer;
          if (miniPlayer) miniPlayer.style.transition = 'none';
          document.body.classList.remove('music-overlay-open');
          this._restoreScrollPosition();
          syncOverlayHostState(overlayRoot, false);
          this._revealMiniPlayer();
          document.querySelector('.music-albums-grid')?.classList.remove('grid-frozen');
        };

        const safetyTimer = setTimeout(closeComplete, 900);

        {
          // MORPH & REVEAL with Kill Switch + exact geometry

          // KILL SWITCH: cancel any in-flight open animation immediately
          const wasAnimatingOpen = Boolean(this._flipAnimation);
          scheduler.cancel('overlay-flip');
          if (this._flipAnimation?.cancel) this._flipAnimation.cancel();
          this._flipAnimation = null;

          // If we were mid-open animation, skip fancy close — just hide instantly and show mini-player
          if (wasAnimatingOpen) {
            _dbg('[music:anim] close during open — instant hide');
            overlayRoot.classList.remove('flip-closing');

            overlayRoot.style.transition = 'none';
            overlayRoot.style.visibility = 'hidden';
            overlayRoot.style.opacity = '0';
            page.style.opacity = '0';
            page.style.pointerEvents = 'none';
            page.style.transform = 'none';
            clearTimeout(safetyTimer);
            // Instant close complete
            this._isCloseAnimating = false;
            page.classList.add('is-collapsed');
            const mp = this.elements.globalMusicPlayer;
            if (mp) mp.style.transition = 'none';
            document.body.classList.remove('music-overlay-open');
            this._restoreScrollPosition();
            syncOverlayHostState(overlayRoot, false);
            // Discard deferred mosaic callbacks BEFORE reveal — animation was cancelled
            if (this.elements.grid?._afterFlipCallbacks?.length) {

              this.elements.grid._afterFlipCallbacks.length = 0;
            }
            this._revealMiniPlayer();
            // Restore GPU resolution after cancelled open
            if (this.mathVisualizer) this.mathVisualizer.setResolutionScale(0.6);
            this._lastFlipSourceRect = null;
            this.unbindIdleWatchers();
            this.unbindOverlayClickCapture();
            if (this.pageUi?.page) {
              this.pageUi.page.style.setProperty('--swipe-offset', '0px');
            }
            this.applyPageFlags();
            this.persistPlayerState({ immediate: true });
            document.querySelector('.music-albums-grid')?.classList.remove('grid-frozen');
            return;
          }

          // Reset page to full-screen state before measuring close positions
          page.style.transition = 'none';
          page.style.transform = 'none';
          page.style.borderRadius = '0';
          page.style.transformOrigin = '';
          page.style.opacity = '1';
          page.offsetHeight; // force reflow

          const miniPlayer = this.elements.globalMusicPlayer;
          const miniPlayerRect = _miniPlayerRect || targetRect;
          const artImg = page.querySelector('#musicTrackArtwork');
          const artWrap = artImg?.closest('.music-track-art-wrap');
          // Get un-scaled rect: getBoundingClientRect includes pulse animation scale,
          // so we compute the true rect from offsetWidth/offsetHeight + screen position of the center
          let overlayArtRect;
          if (artWrap) {
            const rawRect = artWrap.getBoundingClientRect();
            // offsetWidth/offsetHeight give CSS layout size (unaffected by transform)
            const trueW = artWrap.offsetWidth;
            const trueH = artWrap.offsetHeight;
            // Center of the animated rect is stable (scale is from center by default via translateZ(0))
            // But transformOrigin is default (center), so center stays the same
            const cx = rawRect.left + rawRect.width / 2;
            const cy = rawRect.top + rawRect.height / 2;
            overlayArtRect = {
              left: cx - trueW / 2,
              top: cy - trueH / 2,
              width: trueW,
              height: trueH,
            };
          } else {
            overlayArtRect = { left: 0, top: 0, width: 0, height: 0 };
          }
          const miniArtRect = _miniArtRect || { left: miniPlayerRect.left + 20, top: miniPlayerRect.top + 12, width: 56, height: 56 };

          // Exact art offset INSIDE mini-player (accounts for seek bar, padding, etc.)
          const targetArtTopOffset = miniArtRect.top - miniPlayerRect.top;
          const targetArtLeftOffset = miniArtRect.left - miniPlayerRect.left;

          _dbg('[morph:art] miniPlayerRect:', JSON.stringify({top: miniPlayerRect.top, left: miniPlayerRect.left, w: miniPlayerRect.width, h: miniPlayerRect.height}));
          _dbg('[morph:art] miniArtRect:', JSON.stringify({top: miniArtRect.top, left: miniArtRect.left, w: miniArtRect.width, h: miniArtRect.height}));
          _dbg('[morph:art] overlayArtRect:', JSON.stringify({top: overlayArtRect.top, left: overlayArtRect.left, w: overlayArtRect.width, h: overlayArtRect.height}));
          _dbg('[morph:art] targetArtOffset top=' + targetArtTopOffset + ' left=' + targetArtLeftOffset);
          _dbg('[morph:art] expected art screen pos: top=' + (miniPlayerRect.top + targetArtTopOffset) + ' left=' + (miniPlayerRect.left + targetArtLeftOffset));

          // INSTANTLY hide overlay — remove flip-closing class that forces visibility
          // First, snap art to un-pulsed state so the phantom starts from the correct size
          if (artWrap) {
            artWrap.style.animation = 'none';
            artWrap.style.transform = 'scale(1)';
            artWrap.offsetHeight; // force reflow so snap is visually committed
          }
          overlayRoot.classList.remove('flip-closing');
          overlayRoot.style.transition = 'none';
          overlayRoot.style.visibility = 'hidden';
          overlayRoot.style.opacity = '0';
          page.style.opacity = '0';
          page.style.pointerEvents = 'none';

          // Dark scrim to cover background during morph (fades out)
          const scrim = document.createElement('div');
          scrim.className = 'close-morph-scrim';
          Object.assign(scrim.style, {
            position: 'fixed',
            inset: '0',
            backgroundColor: 'rgba(0, 0, 0, 0.45)',
            zIndex: '2147483646',
            transition: `opacity 0.25s cubic-bezier(0.32, 0.72, 0, 1)`,
            opacity: '1',
          });
          document.body.appendChild(scrim);
          requestAnimationFrame(() => { scrim.style.opacity = '0'; });

          // Create phantom capsule — starts at overlay art position, morphs to full mini-player
          const phantom = document.createElement('div');
          phantom.className = 'close-morph-phantom';
          Object.assign(phantom.style, {
            position: 'fixed',
            top: `${overlayArtRect.top}px`,
            left: `${overlayArtRect.left}px`,
            width: `${Math.round(overlayArtRect.width)}px`,
            height: `${Math.round(overlayArtRect.height)}px`,
            borderRadius: '14px',
            backgroundColor: 'transparent',
            boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
            border: 'none',
            zIndex: '2147483647',
            overflow: 'hidden',
            transition: 'none',
          });

          // Phantom art — fixed size, uses transform: scale() to shrink (no stretch)
          const phantomArt = document.createElement('img');
          phantomArt.src = artImg?.src || '';
          const artScale = miniArtRect.width / overlayArtRect.width; // e.g. 56/300 = 0.186
          _dbg('[morph:art] artScale=' + artScale + ' phantomArt transform will be: translate(' + targetArtLeftOffset + 'px, ' + targetArtTopOffset + 'px) scale(' + artScale + ')');
          Object.assign(phantomArt.style, {
            position: 'absolute',
            top: '0px',
            left: '0px',
            width: `${Math.round(overlayArtRect.width)}px`,
            height: `${Math.round(overlayArtRect.height)}px`,
            objectFit: 'cover',
            borderRadius: '14px',
            display: 'block',
            transform: 'scale(1)',
            transformOrigin: 'top left',
            transition: 'none',
          });
          phantom.appendChild(phantomArt);

          // Clone mini-player content (meta, controls, progress) into phantom
          // They start invisible and fade in as the phantom morphs to mini-player shape
          const phantomContent = document.createElement('div');
          phantomContent.className = 'close-morph-content';
          Object.assign(phantomContent.style, {
            position: 'absolute',
            top: '0',
            left: '0',
            width: '100%',
            height: '100%',
            opacity: '0',
            transition: 'none',
            pointerEvents: 'none',
            overflow: 'hidden',
          });
          // Clone the inner elements (art wrapper, meta, controls, progress)
          const cloneSource = miniPlayer?.cloneNode(true);
          if (cloneSource) {
            // Remove canvas and audio from clone
            cloneSource.querySelector('canvas')?.remove();
            cloneSource.querySelector('audio')?.remove();
            // Reset clone styles
            cloneSource.style.cssText = 'position:static;opacity:1;visibility:visible;pointer-events:none;transform:none;width:100%;height:100%;background:transparent;border:none;box-shadow:none;backdrop-filter:none;-webkit-backdrop-filter:none;';
            cloneSource.classList.remove('is-idle');
            phantomContent.appendChild(cloneSource);
          }
          phantom.appendChild(phantomContent);

          document.body.appendChild(phantom);
          phantom.offsetHeight; // paint start state

          // Apply CSS transitions — fast, responsive morph
          const timing = '0.38s cubic-bezier(0.32, 0.72, 0, 1)';
          phantom.style.transition = `top ${timing}, left ${timing}, width ${timing}, height ${timing}, border-radius ${timing}, background ${timing}, border ${timing}, backdrop-filter ${timing}`;
          phantomArt.style.transition = `transform ${timing}, border-radius ${timing}`;
          phantomContent.style.transition = `opacity 0.2s ease 0.2s`;

          // Set final state — capsule morphs to mini-player bar
          // Use theme-aware colors via CSS custom properties to match global-player styling
          const accentColor = getComputedStyle(document.documentElement).getPropertyValue('--accent').trim() || '#5e9eff';
          const targetStyles = {
            background: `linear-gradient(135deg, color-mix(in srgb, ${accentColor} 15%, rgba(0, 0, 0, 0.55)), color-mix(in srgb, ${accentColor} 6%, rgba(0, 0, 0, 0.55)))`,
            border: `1px solid color-mix(in srgb, ${accentColor} 18%, rgba(255, 255, 255, 0.1))`,
            backdropFilter: 'blur(40px) saturate(220%) brightness(80%)',
          };
          _dbg(`[music:anim] close phantom target styles accent=${accentColor} bg=${targetStyles.background}`);

          phantom.style.top = `${miniPlayerRect.top}px`;
          phantom.style.left = `${miniPlayerRect.left}px`;
          phantom.style.width = `${miniPlayerRect.width}px`;
          phantom.style.height = `${miniPlayerRect.height}px`;
          phantom.style.borderRadius = '16px';
          phantom.style.background = targetStyles.background;
          phantom.style.backdropFilter = targetStyles.backdropFilter;
          phantom.style.webkitBackdropFilter = targetStyles.backdropFilter;
          phantom.style.boxShadow = '0 8px 32px rgba(0,0,0,0.5)';
          phantom.style.border = targetStyles.border;

          // Art: scale down + translate to exact mini-art position inside capsule
          phantomArt.style.transform = `translate(${targetArtLeftOffset}px, ${targetArtTopOffset}px) scale(${artScale})`;
          phantomArt.style.borderRadius = `${8 / artScale}px`; // compensate radius for scale

          // Reveal cloned mini-player content (meta, controls, progress)
          phantomContent.style.opacity = '1';

          // Smooth handoff: wait for phantom morph to fully complete before revealing mini-player
          setTimeout(() => {
            clearTimeout(safetyTimer);
            // Show mini-player under phantom first
            this._isCloseAnimating = false;
            overlayRoot.classList.remove('flip-closing');
            overlayRoot.style.removeProperty('opacity');
            overlayRoot.style.removeProperty('visibility');
            overlayRoot.style.removeProperty('transition');
            page.style.transform = '';
            page.style.borderRadius = '';
            page.style.transformOrigin = '';
            page.style.willChange = '';
            page.style.overflow = '';
            page.style.opacity = '';
            page.style.pointerEvents = '';
            page.classList.add('is-collapsed');
            const mp = this.elements.globalMusicPlayer;
            if (mp) mp.style.transition = 'none';
            document.body.classList.remove('music-overlay-open');
            this._restoreScrollPosition();
            syncOverlayHostState(overlayRoot, false);
            this._revealMiniPlayer();
            // Log real art position at handoff
            const realArtEl = this.elements.globalMusicPlayer?.querySelector('.global-player-art');
            if (realArtEl) {
              const r = realArtEl.getBoundingClientRect();
              _dbg('[morph:handoff] real art rect: top=' + r.top + ' left=' + r.left + ' w=' + r.width + ' h=' + r.height);
            }
            // Instantly hide phantom and show real art — no fadeout, no empty frame
            phantom.remove();
            document.querySelector('.close-morph-scrim')?.remove();
            // Unfreeze grid now that morph is complete and phantom is gone
            document.querySelector('.music-albums-grid')?.classList.remove('grid-frozen');
          }, 420);
        }
      } else {
        overlayRoot.classList.add('is-closing');
        overlayRoot.classList.remove('flip-done');
        setTimeout(() => {
          overlayRoot.classList.remove('is-closing');
          document.body.classList.remove('music-overlay-open');
          this._restoreScrollPosition();
          syncOverlayHostState(overlayRoot, false);
          this._revealMiniPlayer();
          document.querySelector('.music-albums-grid')?.classList.remove('grid-frozen');
        }, 320);
      }
    } else {
      document.body.classList.remove('music-overlay-open');
      this._restoreScrollPosition();
      syncOverlayHostState(overlayRoot, false);
      this._revealMiniPlayer();
      document.querySelector('.music-albums-grid')?.classList.remove('grid-frozen');
    }

    this._lastFlipSourceRect = null;
    this.unbindIdleWatchers();
    this.unbindOverlayClickCapture();
    if (this.pageUi?.page) {
      this.pageUi.page.style.setProperty('--swipe-offset', '0px');
    }
    this.applyPageFlags();
    this.persistPlayerState({ immediate: true });
    // Release transition lock after close animation completes
    setTimeout(() => { this._isTransitioning = false; }, 500);
  }

  _revealMiniPlayer() {
    const player = this.elements.globalMusicPlayer;
    if (!player || player.classList.contains('is-idle')) return;

    player.style.transition = 'none';
    player.style.opacity = '1';
    player.style.visibility = '';
    player.style.pointerEvents = 'auto';
    player.style.transform = 'none';
    player.offsetHeight;

    // Show all elements instantly — phantom morph handles the visual transition
    const meta = player.querySelector('.global-player-meta');
    const controls = player.querySelector('.global-player-controls');
    const progress = player.querySelector('.global-player-progress');
    [meta, controls, progress].filter(Boolean).forEach(el => {
      el.style.opacity = '';
      el.style.transform = '';
      el.style.transition = '';
    });

    setTimeout(() => {
      player.style.transition = '';
      player.style.opacity = '';
      player.style.pointerEvents = '';
      player.style.transform = '';

      // Now reveal grid items — after globalMusicPlayer has fully settled
      if (this.elements.grid) {
        const stuck = this.elements.grid.querySelectorAll('.stagger-item');
        stuck.forEach(el => {
          el.style.opacity = '1';
          el.style.transform = '';
          el.style.willChange = '';
          el.style.transition = '';
          el.dataset.staggerRevealed = '1';
          el._staggerDone = true;
          el._staggerVisible = true;
        });

        // Flush deferred mosaic callbacks — overlay is closed, close morph done, mini-player settled
        if (this.elements.grid._afterFlipCallbacks?.length) {
          if (this._overlayIsOpen || this._flipAnimation) {
            // Guard: don't flush if overlay reopened before this timeout fired
          } else {
            const cbs = this.elements.grid._afterFlipCallbacks.splice(0);
            cbs.forEach(cb => cb());
          }
        }
      }
    }, 150);
  }

  animateHeroArtwork() {
    const sourceArtwork = this.elements.globalPlayerArt;
    const targetArtwork = this.pageUi?.page?.querySelector('#musicTrackArtwork');
    if (!sourceArtwork || !targetArtwork) return;

    // Use the wrap element for rect calculation so the clone aligns with the visible border-radius container
    const targetWrap = targetArtwork.closest('.music-track-art-wrap') || targetArtwork;
    const sourceRect = sourceArtwork.getBoundingClientRect();
    const targetRect = targetWrap.getBoundingClientRect();
    if (!sourceRect.width || !targetRect.width) return;

    const clone = sourceArtwork.cloneNode(true);
    clone.classList.add('hero-art-clone');
    Object.assign(clone.style, {
      position: 'fixed',
      left: `${sourceRect.left}px`,
      top: `${sourceRect.top}px`,
      width: `${sourceRect.width}px`,
      height: `${sourceRect.height}px`,
      borderRadius: '12px',
      zIndex: '12000',
      pointerEvents: 'none',
      transformOrigin: 'top left',
      transition: 'transform 0.6s cubic-bezier(0.2, 0.8, 0.2, 1), border-radius 0.6s ease, opacity 0.6s ease',
      boxShadow: '0 30px 60px color-mix(in srgb, var(--music-accent) 28%, transparent)',
      objectFit: 'cover',
    });
    document.body.append(clone);

    targetArtwork.classList.add('hero-art-pop');
    window.requestAnimationFrame(() => {
      clone.style.transform = `translate(${targetRect.left - sourceRect.left}px, ${targetRect.top - sourceRect.top}px) scale(${targetRect.width / sourceRect.width}, ${targetRect.height / sourceRect.height})`;
      clone.style.borderRadius = '12px';
      clone.style.opacity = '0';
    });

    window.setTimeout(() => {
      targetArtwork.classList.remove('hero-art-pop');
      clone.remove();
    }, 620);
  }

  runAlbumFlipTransition(sourceRect = null) {
    console.log(`%c[EXPAND-DEBUG] runAlbumFlipTransition ENTER, sourceRect=${sourceRect ? `left=${sourceRect.left} top=${sourceRect.top} w=${sourceRect.width} h=${sourceRect.height}` : 'null'}`, 'color:cyan;font-weight:bold');
    const overlayRoot = this.getOverlayRoot();
    if (!overlayRoot) { console.log('%c[EXPAND-DEBUG] runAlbumFlipTransition: no overlayRoot, EXIT', 'color:red'); return; }

    // During FLIP: run correct visualizer at low quality behind blur
    if (this.settings.engineMode === 'premium' && this.mathVisualizer) {
      const vizContainer = this.getOverlayRoot()?.querySelector('#mathVisualizerContainer');
      if (vizContainer) vizContainer.style.display = '';
      this._ensureVizBlurOverlay(vizContainer);
      // GPU mode: no CSS blur — shader handles effects
      if (this._pendingScene != null && this._pendingScene !== 0) {
        this.mathVisualizer.setScene(this._pendingScene);
        this._pendingScene = null;
      }
      // Start at full quality immediately
      this.mathVisualizer.setResolutionScale(0.6);
      this.mathVisualizer.setMaxFps(this.settings.fpsMax || 30);
      this.mathVisualizer.setTimeScale(1.0, 0);
      if (!this.mathVisualizer.running) this.mathVisualizer.start();
      this.mathVisualizer.setUiVisible(true);
      // Render one frame synchronously so canvas isn't blank when animation reveals it
      if (this.mathVisualizer.renderFrame) this.mathVisualizer.renderFrame();
    } else {
      // Classic (CPU) mode — start visualizer immediately, no loading blur
      const cpuCanvas = this.pageUi?.canvas;
      if (cpuCanvas) {
        cpuCanvas.style.display = '';
        cpuCanvas.style.filter = '';
        cpuCanvas.style.transition = 'none';
      }
      this.visualizer?.start();
    }

    const page = overlayRoot.querySelector('.music-track-page') || overlayRoot.querySelector('.music-player-layer');
    if (!page) return;
    promote(page, 'transform, opacity');

    const vw = window.innerWidth;
    const vh = window.innerHeight;

    const first = (sourceRect && sourceRect.width > 0)
      ? sourceRect
      : { left: vw * 0.3, top: vh * 0.3, width: vw * 0.4, height: vh * 0.4 };

    this._lastFlipSourceRect = first;
    _dbg(`[music] FLIP open from rect top=${first.top.toFixed(1)} left=${first.left.toFixed(1)} w=${first.width.toFixed(1)} h=${first.height.toFixed(1)} section=${document.body.dataset.section}`);

    page.style.transition = 'none';
    page.style.willChange = 'transform, border-radius';
    page.style.opacity = '0';
    page.style.transform = '';
    page.style.borderRadius = '';
    page.style.transformOrigin = '';

    overlayRoot.classList.add('flip-animating');
    overlayRoot.classList.remove('animate-in');
    overlayRoot.classList.remove('flip-done');
    overlayRoot.style.transition = 'none';
    overlayRoot.style.opacity = '1';
    overlayRoot.style.background = 'transparent';
    this._isTransitioning = true;
    console.log('%c[EXPAND-DEBUG] runAlbumFlipTransition: _isTransitioning=true set', 'color:cyan;font-weight:bold');

    // Freeze albums grid during FLIP — kill box-shadows, 3D, backdrop-filter
    const albumsGrid = document.querySelector('.music-albums-grid');

    {
      page.style.transformOrigin = '0 0';
      page.style.transform = 'none';
      page.offsetHeight;
      const overlayArtWrap = page.querySelector('.music-track-art-wrap');
      // Temporarily remove gpu-lyrics-active to get natural art position for FLIP calc
      const immersiveShell = page.querySelector('.music-immersive-shell');
      const hadGpuLyrics = immersiveShell?.classList.contains('gpu-lyrics-active');
      if (hadGpuLyrics) immersiveShell.classList.remove('gpu-lyrics-active');
      // Reset any GPU lyrics transforms on art wrap so we can measure its natural position
      if (overlayArtWrap) {
        overlayArtWrap.style.transition = 'none';
        overlayArtWrap.style.transform = '';
        overlayArtWrap.style.opacity = '';
        overlayArtWrap.style.display = '';
        overlayArtWrap.style.visibility = '';
      }
      overlayArtWrap?.offsetHeight; // force reflow
      const overlayArtRect = overlayArtWrap?.getBoundingClientRect() || { left: 0, top: 0, width: 0, height: 0 };
      console.log(`%c[FLIP-DEBUG] overlayArtRect: left=${overlayArtRect.left} top=${overlayArtRect.top} w=${overlayArtRect.width} h=${overlayArtRect.height} | first: left=${first.left} top=${first.top} w=${first.width} h=${first.height} | hadGpuLyrics=${hadGpuLyrics}`, 'color:yellow');
      // Restore gpu-lyrics-active after measurement
      if (hadGpuLyrics) immersiveShell.classList.add('gpu-lyrics-active');

      if (!overlayArtRect.width || overlayArtRect.width < 10) {
        console.log('%c[EXPAND-DEBUG] FLIP skipped — overlay art not measured, clearing flags immediately', 'color:orange;font-weight:bold');
        _dbgWarn('[music:anim] FLIP skipped — overlay art not measured', overlayArtRect);
        page.style.opacity = '1';
        page.style.transform = '';
        page.style.transformOrigin = '';
        page.style.willChange = '';
        page.style.transition = '';
        overlayRoot.classList.remove('flip-animating');
        overlayRoot.classList.add('flip-done');
  
        overlayRoot.style.removeProperty('opacity');
        overlayRoot.style.removeProperty('transition');
        overlayRoot.style.removeProperty('background');
        this._isTransitioning = false;
        this._flipAnimation = null;
        // Still need to start visualizer even when FLIP is skipped
        if (this.settings.engineMode === 'premium' && this.mathVisualizer) {
          this._runVisualizerIgnition();
        }
        return;
      }

      const uniformScale = first.width / overlayArtRect.width;
      console.log(`%c[FLIP-DEBUG] uniformScale=${uniformScale} startX=${first.left - overlayArtRect.left * uniformScale} startY=${first.top - overlayArtRect.top * uniformScale}`, 'color:yellow');

      if (!isFinite(uniformScale) || uniformScale <= 0 || uniformScale > 5) {
        _dbgWarn('[music:anim] FLIP skipped — bad scale', { uniformScale, firstWidth: first.width, artWidth: overlayArtRect.width });
        page.style.opacity = '1';
        page.style.transform = '';
        page.style.transformOrigin = '';
        page.style.willChange = '';
        page.style.transition = '';
        overlayRoot.classList.remove('flip-animating');
        overlayRoot.classList.add('flip-done');
  
        overlayRoot.style.removeProperty('opacity');
        overlayRoot.style.removeProperty('transition');
        overlayRoot.style.removeProperty('background');
        this._isTransitioning = false;
        this._flipAnimation = null;
        if (this.settings.engineMode === 'premium' && this.mathVisualizer) {
          this._runVisualizerIgnition();
        }
        return;
      }

      const startX = first.left - overlayArtRect.left * uniformScale;
      const startY = first.top - overlayArtRect.top * uniformScale;

      page.style.transformOrigin = '0 0';
      page.style.willChange = 'transform';
      page.style.transition = 'none';
      page.style.transform = `translate3d(${startX}px, ${startY}px, 0) scale(${uniformScale})`;
      page.style.borderRadius = `${14 / uniformScale}px`;
      page.offsetHeight;

      page.style.opacity = '1';

      const startRadius = `${14 / uniformScale}px`;
      const animation = page.animate([
        { transform: `translate3d(${startX}px, ${startY}px, 0) scale(${uniformScale})`, borderRadius: startRadius, opacity: 1 },
        { transform: 'translate3d(0, 0, 0) scale(1)', borderRadius: '0px', opacity: 1 }
      ], {
        duration: 420,
        easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
        fill: 'forwards',
        composite: 'replace',
      });

      this._flipAnimation = {
        cancel: () => {
          animation.cancel();
          page.style.opacity = '0';
          page.style.transform = 'none';
          document.querySelector('.music-albums-grid')?.classList.remove('grid-frozen');
          // Restore lyrics FPS on cancel
          if (this.lyrics) this.lyrics.setMaxFps(0);
          _dbg('[music:anim] FLIP open CANCELLED');
        }
      };

      // Throttle lyrics to 30fps during open animation for smooth FLIP
      if (this.lyrics) this.lyrics.setMaxFps(30);

      animation.onfinish = () => {
        page.style.transform = 'translate3d(0, 0, 0) scale(1)';
        page.style.borderRadius = '0px';
        page.style.opacity = '1';
        overlayRoot.style.background = '';
        overlayRoot.style.removeProperty('opacity');
        overlayRoot.style.removeProperty('transition');

        animation.cancel();

        overlayRoot.classList.remove('flip-animating');
        overlayRoot.classList.add('flip-done');

        // Unfreeze albums grid
        const albumsGridEl = document.querySelector('.music-albums-grid');
  

        page.style.transform = '';
        page.style.borderRadius = '';
        page.style.transformOrigin = '';
        page.style.willChange = '';
        page.style.transition = '';
        this._flipAnimation = null;

        _dbg('[music:anim] FLIP onfinish — revealing visualizer');
        console.log('%c[EXPAND-DEBUG] FLIP onfinish: _flipAnimation=null, setting _isTransitioning=false', 'color:lime;font-weight:bold');
        _dbg('[VIZ-DEBUG] FLIP onfinish: engineMode=%s mathVisualizer=%o', this.settings.engineMode, !!this.mathVisualizer);
        this._isTransitioning = false;

        // Resume lyrics rAF loop (was paused during FLIP for CPU headroom)
        setTimeout(() => {
          // Restore lyrics to unlimited FPS (fpsMax only applies to visualizer)
          if (this.lyrics) this.lyrics.setMaxFps(0);
          if (this.lyrics) this.lyrics.start();

          if (this.lyrics && this.lyrics.timeline?.length) {
            // Only force full resync if activeLineIndex is stale; otherwise just fix scroll
            const now = this.audioEngine?.audioElement?.currentTime || 0;
            const currentIdx = this.lyrics.activeLineIndex;
            const currentEntry = currentIdx >= 0 ? this.lyrics.timeline[currentIdx] : null;
            const isStale = !currentEntry || now < currentEntry.start - 0.5 || now > currentEntry.end + 0.5;
            if (isStale) {
              this.lyrics._lastNow = -1;
              this.lyrics.activeLineIndex = -1;
              this.lyrics.updateActiveLine?.();
            }
            const idx = this.lyrics.activeLineIndex;
            const el = this.lyrics.lineElements?.[idx];
            if (el && this.lyrics.container) {
              const sp = this.lyrics.container.closest('.music-immersive-lyrics-panel') || this.lyrics.container;
              sp.scrollTop = Math.max(0, el.offsetTop - sp.clientHeight / 2 + el.offsetHeight / 2);
            }
          }
        }, 100);

        if (page) demote(page);

        // FLIP done → start visualizer at full quality (ignition shows blur, then fades it)
        if (this.settings.engineMode === 'premium' && this.mathVisualizer) {
          this._runVisualizerIgnition();
        } else if (this.settings.engineMode !== 'premium') {
          // Classic mode — GPU visualizer off, CPU at full quality
          this.mathVisualizer?.stop();
          const vizContainer = this.getOverlayRoot()?.querySelector('#mathVisualizerContainer');
          if (vizContainer) vizContainer.style.display = 'none';
          if (this.pageUi?.canvas) {
            this.pageUi.canvas.style.display = '';
            this.pageUi.canvas.style.filter = '';
          }
          this.visualizer?.start();
        }
      };
    }
  }

  /** Start visualizer at full quality. Shows blur during init, fades it out when ready. */
  _runVisualizerIgnition() {
    if (!this.mathVisualizer) {
      _dbgWarn('[VIZ-DEBUG] _runVisualizerIgnition: NO mathVisualizer, aborting');
      return;
    }
    // GPU mode: already running at full res — just ensure visible, no restart needed
    if (this.settings.engineMode === 'premium' && this.mathVisualizer.running) {
      _dbg('[VIZ-DEBUG] _runVisualizerIgnition: premium already running, skip restart');
      this.mathVisualizer.setUiVisible(true);
      const vizContainer = this.getOverlayRoot()?.querySelector('#mathVisualizerContainer');
      if (vizContainer) vizContainer.style.display = '';
      const canvas = this.mathVisualizer.renderer?.domElement;
      if (canvas) { canvas.style.opacity = '1'; canvas.style.filter = ''; }
      // Apply palette
      if (this._lastPalette?.length >= 3 && this.settings.visualizerColorMode === 'album' && this.mathVisualizer.setPalette) {
        const toHex = (c) => `#${((1 << 24) | (c.r << 16) | (c.g << 8) | c.b).toString(16).slice(1)}`;
        this.mathVisualizer.setPalette([toHex(this._lastPalette[0]), toHex(this._lastPalette[1]), toHex(this._lastPalette[2])]);
      }
      return;
    }
    _dbg('[VIZ-DEBUG] _runVisualizerIgnition: ramping to full quality, running=%o', this.mathVisualizer.running);
    const vizContainer = this.getOverlayRoot()?.querySelector('#mathVisualizerContainer');
    if (vizContainer) vizContainer.style.display = '';

    // If canvas got detached (e.g. overlay DOM rebuilt), re-append it
    const canvas = this.mathVisualizer.renderer?.domElement;
    if (canvas && vizContainer && !vizContainer.contains(canvas)) {
      _dbg('[Visualizer] Re-appending detached canvas to container');
      vizContainer.appendChild(canvas);
    }

    // Apply album palette so full-res frames have correct colors
    if (this._lastPalette?.length >= 3 && this.settings.visualizerColorMode === 'album' && this.mathVisualizer.setPalette) {
      const toHex = (c) => `#${((1 << 24) | (c.r << 16) | (c.g << 8) | c.b).toString(16).slice(1)}`;
      this.mathVisualizer.setPalette([toHex(this._lastPalette[0]), toHex(this._lastPalette[1]), toHex(this._lastPalette[2])]);
    }

    // Ensure blur stays visible while we ramp up — no flicker
    if (this.settings.engineMode === 'premium') {
      // GPU mode: use shader blur during ramp
      this.mathVisualizer.setBlur?.(true);
    } else if (this._vizBlurOverlay && this._vizBlurOverlay.dataset.manualBlur !== 'true') {
      this._vizBlurOverlay.style.transition = 'none';
      this._showCssBlur();
    }

    // Ensure visualizer is running (it should be from FLIP low-res start)
    if (!this.mathVisualizer.running) {
      // Reset dilated time to prevent float precision issues after long idle
      if (this.mathVisualizer.dilatedTime > 3600) {
        this.mathVisualizer.dilatedTime = 0;
        this.mathVisualizer.lastRealTime = 0;
      }
      this.mathVisualizer.start();
    }
    this.mathVisualizer.setUiVisible(true);

    // Ramp directly to full quality — blur hides the transition
    this.mathVisualizer.setResolutionScale(0.6);
    this.mathVisualizer.setMaxFps(this.settings.fpsMax || 30);
    this.mathVisualizer.setTimeScale(1.0, 0);

    // Resize canvas for full quality
    const cw = vizContainer?.clientWidth || window.innerWidth;
    const ch = vizContainer?.clientHeight || window.innerHeight;
    if (cw > 0 && ch > 0) {
      this.mathVisualizer.renderer.setSize(cw, ch, false);
      this.mathVisualizer.current?.resize(cw, ch, window.devicePixelRatio * 0.6);
    }

    // Ensure canvas is visible (no stale opacity/filter)
    if (canvas) {
      canvas.style.opacity = '1';
      canvas.style.filter = '';
      canvas.style.transition = '';
    }

    // Wait for GPU to produce clean full-res frames, then fade blur out
    let fullFrames = 0;
    const fadeBlur = () => {
      if (++fullFrames < 6) { requestAnimationFrame(fadeBlur); return; }
      if (this.settings.engineMode === 'premium') {
        // GPU mode: disable shader blur (unless user manually enabled it)
        if (!this.settings.vizBlurEnabled) {
          this.mathVisualizer.setBlur?.(false);
        }
      } else if (this._vizBlurOverlay && this._vizBlurOverlay.dataset.manualBlur !== 'true') {
        this._vizBlurOverlay.style.transition = 'opacity 0.5s cubic-bezier(0.0, 0.0, 0.2, 1)';
        this._vizBlurOverlay.style.opacity = '0';
        _dbg('[VIZ-DEBUG] _runVisualizerIgnition: blur fading out after %d full-res frames', fullFrames);
      }
    };
    requestAnimationFrame(fadeBlur);

    // Reset low-precision lyrics mode
    if (this.lyrics) {
      this.lyrics._lowPrecisionMode = false;
      this.lyrics._fpsHistory = [];
      this.lyrics._fpsTrackingStart = 0;
      this.lyrics.container?.classList.remove('lyrics-low-precision');
      // Force lyrics resync only if active line is stale
      const now = this.audioEngine?.audioElement?.currentTime || 0;
      const currentIdx = this.lyrics.activeLineIndex;
      const currentEntry = currentIdx >= 0 ? this.lyrics.timeline?.[currentIdx] : null;
      const isStale = !currentEntry || now < currentEntry.start - 0.5 || now > currentEntry.end + 0.5;
      if (isStale) {
        this.lyrics._lastNow = -1;
        this.lyrics.activeLineIndex = -1;
        this.lyrics.updateActiveLine?.();
      }
    }

    _dbg('[Visualizer] Started — size=%dx%d running=%o', cw, ch, this.mathVisualizer.running);
  }

  _toggleHudActions(btn) {
    const collapsible = this.getOverlayRoot()?.querySelector('#hudActionsCollapsible');
    if (!collapsible) return;
    const isOpen = collapsible.classList.toggle('is-expanded');
    btn.classList.toggle('is-expanded', isOpen);
    btn.setAttribute('aria-expanded', String(isOpen));
    btn.setAttribute('aria-label', isOpen ? 'Hide actions' : 'Show more actions');
    // Enable/disable tab focus on collapsed buttons
    collapsible.querySelectorAll('button, input').forEach(el => {
      el.setAttribute('tabindex', isOpen ? '0' : '-1');
    });
    this.settings.hudActionsExpanded = isOpen;
    this.persistPlayerState({ immediate: true });
  }

  _resolveTrackPath(track) {
    const raw = track?.path || track?.url?.replace(/^\/media\//, '') || '';
    if (!raw) return '';
    try {
      return decodeURIComponent(raw);
    } catch {
      return raw;
    }
  }


  openSettingsView() {
    if (this.isPlayerExpanded) {
      // Overlay already open — just flip to settings without re-animating
      this.isSettingsView = true;
      this._settingsEscGuard = true;
      this.isQueueSheetOpen = false;
      this.applyPageFlags();
      this.persistPlayerState();
      this._loadAiSettings();
      return;
    }
    this.openOverlay('settings');
    this._loadAiSettings();
  }

  closeSettingsView() {
    this.isSettingsView = false;
    this._settingsEscGuard = false;
    this.applyPageFlags();
    this.persistPlayerState();
    this.elements.playerSettingsBtn?.focus();
  }

  toggleQueueSheet() {
    if (this.isPlayerExpanded) {
      this.isQueueSheetOpen = !this.isQueueSheetOpen;
      this.isSettingsView = false;
      this._settingsEscGuard = false;
      this.applyPageFlags();
      this.persistPlayerState();
      return;
    }
    this.openOverlay('player');
    this.isQueueSheetOpen = true;
    this.isSettingsView = false;
    this._settingsEscGuard = false;
    this.applyPageFlags();
    this.persistPlayerState();
  }

  extractColorFromImage(imageElement) {
    if (!imageElement || typeof document === 'undefined') {
      return '#7dd6ff';
    }

    const width = imageElement.naturalWidth || imageElement.width || 0;
    const height = imageElement.naturalHeight || imageElement.height || 0;
    if (!width || !height) {
      return '#7dd6ff';
    }

    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d', { willReadFrequently: true });
    if (!context) {
      return '#7dd6ff';
    }

    const sampleSize = 32;
    canvas.width = sampleSize;
    canvas.height = sampleSize;

    try {
      context.drawImage(imageElement, 0, 0, sampleSize, sampleSize);
      const pixels = context.getImageData(0, 0, sampleSize, sampleSize).data;
      let red = 0;
      let green = 0;
      let blue = 0;
      let count = 0;

      for (let index = 0; index < pixels.length; index += 16) {
        const alpha = pixels[index + 3] || 0;
        if (alpha < 32) {
          continue;
        }
        red += pixels[index];
        green += pixels[index + 1];
        blue += pixels[index + 2];
        count += 1;
      }

      if (!count) {
        return '#7dd6ff';
      }

      const toHex = (value) => Math.max(0, Math.min(255, Math.round(value / count))).toString(16).padStart(2, '0');
      return `#${toHex(red)}${toHex(green)}${toHex(blue)}`;
    } catch (_error) {
      return '#7dd6ff';
    }
  }

  stopAudioReactiveAccentLoop() {
    if (this.audioReactiveAccentFrameId) {
      window.cancelAnimationFrame(this.audioReactiveAccentFrameId);
      this.audioReactiveAccentFrameId = null;
    }
  }

  startAudioReactiveAccentLoop() {
    const analyser = this.audioEngine?.getAnalyser?.();
    if ((!this.visualizer && !this.mathVisualizer) || !analyser) {
      return;
    }

    if (!this.audioReactiveBuffer || this.audioReactiveBuffer.length !== analyser.frequencyBinCount) {
      this.audioReactiveBuffer = new Uint8Array(analyser.frequencyBinCount);
    }

    this.stopAudioReactiveAccentLoop();
    let lastPaletteKey = '';
    let lastMoodLogTime = 0;
    // ── Shimmer detector state (mystic synth detection) ──
    let shimmerSmoothed = 0;      // EMA of shimmer presence (0-1)
    let shimmerGateActive = false; // hysteresis gate state
    let shimmerGateTimer = 0;     // frames sustaining above/below threshold
    let shimmerHue = 280;         // current neon hue (lerps between mystic colors)
    let shimmerTargetHue = 280;   // target hue for current shimmer burst
    let lastShimmerBurst = 0;     // timestamp of last hue rotation
    // Per-slot neon injection state — colors lerp independently for one-by-one transitions
    let neonSlotBlend = [0, 0, 0]; // current blend amount per slot (0=pure mood, 1=full neon)
    let neonSlotTarget = [0, 0, 0]; // target blend per slot
    let neonSlotHue = [280, 280, 280]; // current neon hue per slot (lerps independently)
    let _accentLastTime = 0;
    const ACCENT_MIN_INTERVAL = 50; // ~20fps max for color computation (saves 66% CPU vs 60fps)
    const tick = () => {
      if ((!this.visualizer && !this.mathVisualizer) || this.settings.visualizerColorMode !== 'auto') {
        this.stopAudioReactiveAccentLoop();
        return;
      }

      // Skip when tab hidden or audio paused — zero CPU when not needed
      if (document.hidden || this.audio?.paused) {
        this.audioReactiveAccentFrameId = window.requestAnimationFrame(tick);
        return;
      }

      // Throttle: color analysis doesn't need 60fps — 20fps is perceptually smooth for hue shifts
      const _tickNow = performance.now();
      if (_tickNow - _accentLastTime < ACCENT_MIN_INTERVAL) {
        this.audioReactiveAccentFrameId = window.requestAnimationFrame(tick);
        return;
      }
      _accentLastTime = _tickNow;

      // Read frequency data
      analyser.getByteFrequencyData(this.audioReactiveBuffer);
      const bands = computeAudioBands(this.audioReactiveBuffer);

      // ── Shimmer Detection: detect mystic/ethereal synth textures ──
      // Mystic synths have: high upper-mid/treble presence, sustained tones (not percussive),
      // and a characteristic "spread" across upper frequencies (not narrow like vocals).
      const buf = this.audioReactiveBuffer;
      const len = buf.length;
      if (len > 0) {
        // Upper-mid region (2-6kHz): where synth pads and atmospheric textures live
        const upperMidStart = Math.floor(len * 0.15);
        const upperMidEnd = Math.floor(len * 0.35);
        // High shimmer region (6-12kHz): ethereal harmonics, air
        const highStart = Math.floor(len * 0.35);
        const highEnd = Math.floor(len * 0.65);

        let upperMidSum = 0, highSum = 0, upperMidCount = 0, highCount = 0;
        for (let i = upperMidStart; i < upperMidEnd; i++) { upperMidSum += buf[i]; upperMidCount++; }
        for (let i = highStart; i < highEnd; i++) { highSum += buf[i]; highCount++; }
        const upperMid = upperMidCount ? (upperMidSum / upperMidCount) / 255 : 0;
        const high = highCount ? (highSum / highCount) / 255 : 0;

        // Shimmer = sustained high-frequency presence relative to bass
        // Mystic synths: treble > 0.15, treble/bass ratio high, upper-mid spread
        const trebleBassRatio = bands.bass > 0.05 ? bands.treble / bands.bass : bands.treble * 5;
        const shimmerRaw = Math.max(0,
          (upperMid * 0.4 + high * 0.6)         // upper frequency presence
          * Math.min(trebleBassRatio, 2) / 2     // favor treble-dominant moments
          * (1 - Math.max(0, bands.bass - 0.5))  // suppress during heavy bass hits
        );

        // Smooth with EMA — very slow rise AND decay to prevent flicker
        const shimmerAlpha = shimmerRaw > shimmerSmoothed ? 0.006 : 0.012;
        shimmerSmoothed += (shimmerRaw - shimmerSmoothed) * shimmerAlpha;
        shimmerSmoothed = Math.max(0, Math.min(1, shimmerSmoothed));

        // Hysteresis gate: must sustain above/below threshold for ~30 frames to toggle
        const SHIMMER_ON_THRESH = 0.10;
        const SHIMMER_OFF_THRESH = 0.05;
        if (shimmerGateActive) {
          if (shimmerSmoothed < SHIMMER_OFF_THRESH) {
            shimmerGateTimer++;
            if (shimmerGateTimer > 30) { shimmerGateActive = false; shimmerGateTimer = 0; }
          } else { shimmerGateTimer = 0; }
        } else {
          if (shimmerSmoothed > SHIMMER_ON_THRESH) {
            shimmerGateTimer++;
            if (shimmerGateTimer > 30) { shimmerGateActive = true; shimmerGateTimer = 0; }
          } else { shimmerGateTimer = 0; }
        }

        // Rotate through neon hues when shimmer gate is active
        const now2 = performance.now();
        if (shimmerGateActive && now2 - lastShimmerBurst > 4000) {
          lastShimmerBurst = now2;
          // Neon mystic palette: cycle through cyan→violet→magenta→electric blue
          const neonHues = [185, 270, 295, 320, 200, 260];
          shimmerTargetHue = neonHues[Math.floor(Math.random() * neonHues.length)];
        }
        // Lerp shimmer hue toward target
        let shDiff = shimmerTargetHue - shimmerHue;
        if (shDiff > 180) shDiff -= 360;
        if (shDiff < -180) shDiff += 360;
        shimmerHue = ((shimmerHue + shDiff * 0.01) + 360) % 360;
      }

      // ── Mood State Machine (shared with Visualizer.js) ──
      // In premium mode: classic visualizer doesn't run, so we compute mood ourselves.
      // In non-premium mode: classic visualizer's draw() already computes mood — just read it.
      let mood;
      if (this.settings.engineMode === 'premium' || !this.visualizer?.mood) {
        mood = computeMoodProfile(bands, {
          intensity: this.settings.intensity || 1,
          sensitivity: this.settings.sensitivity || 1,
        });
        // Store mood on visualizer so LyricsEngine gamma vault can read it
        if (this.visualizer) {
          this.visualizer.mood = mood;
        }
      } else {
        mood = this.visualizer.mood;
      }

      // Set classic visualizer accent from mood hue
      const moodHue = Math.round(mood.moodColor?.h ?? 210);
      this.visualizer?.setAccent(`hsl(${moodHue}, 70%, 60%)`);

      // ── Drive GPU Math Visualizer palette from mood ──
      if (this.mathVisualizer) {
        const state = mood.moodState || 'balanced';
        const intensity = mood.intensity || 0;

        // Use mood color directly — it's already continuously interpolated in Visualizer.js
        const mc = mood.moodColor || { h: 210, s: 70, l: 45 };

        // Smooth lerp: follow moodColor with moderate damping for GPU palette
        // 0.03 lerp at 60fps ≈ 8-10s full transition — visibly reactive but not jittery
        if (!this._paletteH) { this._paletteH = mc.h; this._paletteS = mc.s; this._paletteL = mc.l; }

        // ── Intensity-driven hue expansion ──
        // The mood gradient often maps drive/fury to a narrow 20-30° hue band.
        // Expand the effective hue by ±40° based on intensity so even within
        // a stable mood state, energy changes produce VISIBLE color shifts.
        // Low intensity → shift toward chill hue (negative offset)
        // High intensity → shift toward fury hue (positive offset)
        const intensityHueOffset = (intensity - 0.5) * 80; // ±40° range
        const expandedH = (mc.h + intensityHueOffset + 360) % 360;

        let hDiff = expandedH - this._paletteH;
        if (hDiff > 180) hDiff -= 360;
        if (hDiff < -180) hDiff += 360;

        // Dead zone: ignore hue oscillations < 5° — filters noise but allows reactive shifts
        if (Math.abs(hDiff) < 5) hDiff = 0;

        let nextH = (this._paletteH + hDiff * 0.03 + 360) % 360;

        this._paletteH = nextH;
        this._paletteS += (mc.s - this._paletteS) * 0.03;
        this._paletteL += (mc.l - this._paletteL) * 0.03;

        // Use stable lerped hue (no bass wobble — that caused jitter)
        const displayH = this._paletteH;

        // Throttle palette updates: when hue shifts by ≥8° or intensity changes, at most every 400ms
        const shimmerLevel = shimmerGateActive ? Math.round(shimmerSmoothed * 3) : 0; // 0-3, gate-controlled
        const intensityBucket = Math.round(intensity * 5); // 0-5 intensity levels
        const paletteKey = `${Math.round(displayH / 8)}:${Math.round(this._paletteS / 6)}:${intensityBucket}:${shimmerLevel}`;
        const _paletteNow = performance.now();
        if (!this._lastPaletteUpdateTime) this._lastPaletteUpdateTime = 0;
        if (paletteKey !== lastPaletteKey && (_paletteNow - this._lastPaletteUpdateTime > 400)) {
          this._lastPaletteUpdateTime = _paletteNow;
          lastPaletteKey = paletteKey;

          const primaryS = this._paletteS / 100;
          const primaryL = this._paletteL / 100;

          // ── Shimmer: inject neon into the LAVA FLOW mid-tones ──
          // For the Lava shader: u_colors[0]=dark base, u_colors[1]=mid flow, u_colors[2]=hot highlights
          // Neon should tint the SECONDARY (mid flow) color — that's the main visible lava surface.
          // Primary (dark base) and tertiary (hot highlights) stay pure mood.
          const shimmerBlend = shimmerGateActive ? Math.min(shimmerSmoothed * 3, 0.65) : 0;

          // Both dark base AND mid-flow get neon — mystical sound replaces dark lava with neon glow
          neonSlotTarget[0] = shimmerBlend > 0.05 ? Math.min(shimmerBlend * 2.0, 0.80) : 0; // primary (dark base): neon-infused (strongest)
          neonSlotTarget[1] = shimmerBlend > 0.05 ? Math.min(shimmerBlend * 1.8, 0.70) : 0; // secondary (lava flow): neon-infused
          neonSlotTarget[2] = 0; // tertiary (hot tips): pure mood

          // Lerp each slot's blend independently — faster rise, medium decay
          for (let si = 0; si < 3; si++) {
            const slotAlpha = neonSlotTarget[si] > neonSlotBlend[si] ? 0.04 : 0.03;
            neonSlotBlend[si] += (neonSlotTarget[si] - neonSlotBlend[si]) * slotAlpha;
            if (neonSlotBlend[si] < 0.01) neonSlotBlend[si] = 0;
            if (neonSlotBlend[si] > 0) {
              let shDelta = shimmerHue - neonSlotHue[si];
              if (shDelta > 180) shDelta -= 360;
              if (shDelta < -180) shDelta += 360;
              neonSlotHue[si] = ((neonSlotHue[si] + shDelta * 0.03) + 360) % 360;
            }
          }

          // Primary: dark lava base — gets neon injection for mystical glow
          // ── HYBRID: blend album palette with mood-derived color ──
          // Album colors provide the track's identity (hue family).
          // Mood (displayH/primaryS/primaryL) provides audio-reactive energy shifts.
          // Result: colors look like the album but visibly shift with the music.
          const albumPal = this._lastPalette;
          const hasAlbumColors = albumPal && albumPal.length >= 3;

          // Shared RGB→HSL converter for album palette colors
          const rgbToHsl = (r, g, b) => {
            r /= 255; g /= 255; b /= 255;
            const max = Math.max(r, g, b), min = Math.min(r, g, b);
            let h = 0, s = 0;
            const l = (max + min) / 2;
            if (max !== min) {
              const d = max - min;
              s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
              if (max === r) h = ((g - b) / d + (g < b ? 6 : 0)) * 60;
              else if (max === g) h = ((b - r) / d + 2) * 60;
              else h = ((r - g) / d + 4) * 60;
            }
            return { h, s, l };
          };

          // Hue blend helper (shortest arc)
          const blendHue = (hA, hB, t) => {
            let d = hB - hA;
            if (d > 180) d -= 360;
            if (d < -180) d += 360;
            return ((hA + d * t) % 360 + 360) % 360;
          };

          let finalH = displayH;
          let finalS = primaryS;
          let finalL = primaryL;

          if (hasAlbumColors) {
            const p0 = rgbToHsl(albumPal[0].r, albumPal[0].g, albumPal[0].b);
            // Blend: 40% album identity + 60% mood-reactive
            // Album anchors the color family, mood provides visible energy shifts
            finalH = blendHue(displayH, p0.h, 0.4);
            // Intensity-driven breathing: ±25% saturation, ±18% lightness
            finalS = primaryS * 0.6 + p0.s * 0.4 + (intensity - 0.5) * 0.25;
            finalL = primaryL * 0.6 + p0.l * 0.4 + (intensity - 0.5) * 0.18;
            // Intensity also nudges hue ±15° — high energy pushes toward drive, low toward chill
            finalH = (finalH + (intensity - 0.5) * 30 + 360) % 360;
            finalS = Math.max(0.1, Math.min(0.95, finalS));
            finalL = Math.max(0.15, Math.min(0.65, finalL));
          }

          // Neon injection into dark base — replaces dark lava with mystical neon
          if (neonSlotBlend[0] > 0.01) {
            const nPrimTargetH = neonSlotHue[0];
            let nPrimDiff = nPrimTargetH - finalH;
            if (nPrimDiff > 180) nPrimDiff -= 360;
            if (nPrimDiff < -180) nPrimDiff += 360;
            finalH = ((finalH + nPrimDiff * neonSlotBlend[0]) + 360) % 360;
            // Deep neon: boost saturation strongly, BRIGHTEN for vivid neon glow (not dark)
            finalS = finalS + (0.92 - finalS) * neonSlotBlend[0];
            finalL = finalL + (0.55 - finalL) * neonSlotBlend[0] * 0.7;
          }

          // Secondary: mid-tone lava flow + neon injection
          let secH, secS, secL;
          if (hasAlbumColors) {
            const p1 = rgbToHsl(albumPal[1].r, albumPal[1].g, albumPal[1].b);
            const moodSecH = (finalH + 40) % 360;
            const moodSecS = finalS * 0.75;
            const moodSecL = Math.min(0.72, finalL + 0.12);
            // Blend: 40% album + 60% mood-derived
            secH = blendHue(moodSecH, p1.h, 0.4);
            secS = moodSecS * 0.6 + p1.s * 0.4 + (intensity - 0.5) * 0.2;
            secL = Math.min(0.72, moodSecL * 0.6 + p1.l * 0.4 + (intensity - 0.5) * 0.15);
          } else {
            secH = (finalH + 40) % 360;
            secS = finalS * 0.75;
            secL = Math.min(0.72, finalL + 0.12);
          }

          if (neonSlotBlend[1] > 0.01) {
            // Blend secondary hue toward neon — this tints the lava flow
            const nSecTargetH = neonSlotHue[1];
            let nSecDiff = nSecTargetH - secH;
            if (nSecDiff > 180) nSecDiff -= 360;
            if (nSecDiff < -180) nSecDiff += 360;
            secH = ((secH + nSecDiff * neonSlotBlend[1]) + 360) % 360;
            // Neon flow: boost saturation and lightness for vivid visible glow
            secS = secS + (0.92 - secS) * neonSlotBlend[1];
            secL = secL + (0.60 - secL) * neonSlotBlend[1] * 0.6;
          }

          // Tertiary: highlights — blend album palette[2] with mood complementary
          let terH, terS, terL;
          if (hasAlbumColors) {
            const p2 = rgbToHsl(albumPal[2].r, albumPal[2].g, albumPal[2].b);
            const moodTerH = (finalH + 180) % 360;
            const moodTerS = finalS * 0.45;
            const moodTerL = Math.min(0.60, finalL + 0.06);
            // Blend: 40% album + 60% mood-derived
            terH = blendHue(moodTerH, p2.h, 0.4);
            terS = moodTerS * 0.6 + (p2.s * 0.8) * 0.4 + (intensity - 0.5) * 0.15;
            terL = Math.min(0.60, moodTerL * 0.6 + p2.l * 0.4 + (intensity - 0.5) * 0.12);
          } else {
            terH = (finalH + 180) % 360;
            terS = finalS * 0.45;
            terL = Math.min(0.60, finalL + 0.06);
          }

          const hslToHex = (h, s, l) => {
            const a2 = s * Math.min(l, 1 - l);
            const f = (n) => { const k = (n + h / 30) % 12; return Math.round((l - a2 * Math.max(-1, Math.min(k - 3, 9 - k, 1))) * 255); };
            return `#${((1 << 24) | (f(0) << 16) | (f(8) << 8) | f(4)).toString(16).slice(1)}`;
          };

          const palette = [
            hslToHex(finalH, finalS, finalL),
            hslToHex(secH, secS, secL),
            hslToHex(terH, terS, terL),
          ];
          // Stagger GPU palette updates: each color transitions with a slight delay
          if (!this._gpuPaletteCurrent) {
            this._gpuPaletteCurrent = palette.slice();
            this.mathVisualizer.setPalette(palette);
          } else {
            this._gpuPaletteTarget = palette;
            this._gpuPaletteLerpFrame = 0;
          }

          _dbg(
            `[mood-palette]  PALETTE UPDATE | state: "${state}" | ` +
            `H:${finalH.toFixed(0)} S:${(finalS * 100).toFixed(0)}% L:${(finalL * 100).toFixed(0)}% | ` +
            `moodColor: H:${mc.h.toFixed(0)} | intensity: ${intensity.toFixed(2)} | ` +
            (neonSlotBlend[0] > 0.01 || neonSlotBlend[1] > 0.01 ? `✨neon-base: ${(neonSlotBlend[0] * 100).toFixed(0)}% flow: ${(neonSlotBlend[1] * 100).toFixed(0)}% hue:${shimmerHue.toFixed(0)}° | ` : '') +
            `palette: [${palette.join(', ')}]`
          );
        }
      }

      // ── Push mood color as CSS custom properties for reactive UI ──
      {
        const mc = mood.moodColor || { h: 210, s: 70, l: 45 };
        const h = Math.round(mc.h);
        const s = Math.round(mc.s);
        const l = Math.round(mc.l);
        const root = document.documentElement;
        // Throttle: only update every ~200ms to avoid layout thrashing
        const _now = performance.now();
        if (!this._lastMoodCSSTime || _now - this._lastMoodCSSTime > 200) {
          this._lastMoodCSSTime = _now;
          root.style.setProperty('--mood-h', h);
          root.style.setProperty('--mood-s', s + '%');
          root.style.setProperty('--mood-l', l + '%');
          root.style.setProperty('--mood-color', `hsl(${h}, ${s}%, ${l}%)`);
          root.style.setProperty('--mood-color-dim', `hsla(${h}, ${s}%, ${Math.max(10, l - 20)}%, 0.6)`);
          root.style.setProperty('--mood-color-glow', `hsla(${h}, ${s}%, ${l}%, 0.3)`);
          root.style.setProperty('--mood-color-subtle', `hsla(${h}, ${Math.max(20, s - 30)}%, ${l}%, 0.08)`);
          root.style.setProperty('--mood-color-row-odd', `hsla(${h}, ${Math.max(15, s - 40)}%, ${Math.min(90, l + 40)}%, 0.06)`);
          root.style.setProperty('--mood-color-row-even', `hsla(${h}, ${Math.max(15, s - 40)}%, ${Math.min(90, l + 35)}%, 0.04)`);
          root.style.setProperty('--mood-color-row-hover', `hsla(${h}, ${s}%, ${l}%, 0.12)`);
          root.style.setProperty('--mood-color-row-active', `hsla(${h}, ${s}%, ${l}%, 0.18)`);
        }
      }

      // Periodic mood status log (every 30s — diagnostic only, not needed for UX)
      const now = performance.now();
      if (now - lastMoodLogTime > 30000) {
        lastMoodLogTime = now;
        _dbg(
          `[mood-palette]  MOOD STATUS | state: "${mood.moodState}" | ` +
          `windowed: ${mood.smoothedExcitement?.toFixed(3)} | raw: ${mood.rawExcitement?.toFixed(3)} | ` +
          `color: H:${mood.moodColor?.h?.toFixed(1)} S:${mood.moodColor?.s?.toFixed(1)} L:${mood.moodColor?.l?.toFixed(1)} | ` +
          `intensity: ${mood.intensity?.toFixed(2)} | ` +
          `bass: ${bands.bass?.toFixed(2)} mid: ${bands.mid?.toFixed(2)} treble: ${bands.treble?.toFixed(2)} (SHIELDED) | ` +
          `✨shimmer: ${(shimmerSmoothed * 100).toFixed(0)}% neonH:${shimmerHue.toFixed(0)}°` +
          (mood._pendingState ? ` | ⏳ pending: "${mood._pendingState}" (${(mood._confidence * 100).toFixed(0)}%)` : '')
        );
      }

      // Smooth GPU palette lerp — stagger each color slot
      if (this._gpuPaletteTarget && this._gpuPaletteCurrent && this.mathVisualizer) {
        const hexToRgb = (hex) => {
          const n = parseInt(hex.slice(1), 16);
          return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
        };
        const rgbToHex = (r, g, b) => `#${((1 << 24) | (Math.round(r) << 16) | (Math.round(g) << 8) | Math.round(b)).toString(16).slice(1)}`;
        const LERP_RATE = 0.06; // blend per frame (~3.5% → smooth over ~0.5s at 60fps)
        let changed = false;
        const staggerFrames = [0, 4, 8]; // color 0 starts immediately, color 1 after 4 frames, etc.
        this._gpuPaletteLerpFrame = (this._gpuPaletteLerpFrame || 0) + 1;
        for (let i = 0; i < this._gpuPaletteCurrent.length; i++) {
          if (this._gpuPaletteLerpFrame < (staggerFrames[i] || 0)) continue;
          const cur = hexToRgb(this._gpuPaletteCurrent[i]);
          const tgt = hexToRgb(this._gpuPaletteTarget[i]);
          const nr = cur[0] + (tgt[0] - cur[0]) * LERP_RATE;
          const ng = cur[1] + (tgt[1] - cur[1]) * LERP_RATE;
          const nb = cur[2] + (tgt[2] - cur[2]) * LERP_RATE;
          const newHex = rgbToHex(nr, ng, nb);
          if (newHex !== this._gpuPaletteCurrent[i]) {
            this._gpuPaletteCurrent[i] = newHex;
            changed = true;
          }
        }
        if (changed) {
          this.mathVisualizer.setPalette(this._gpuPaletteCurrent.slice());
        }
        // Check if converged
        const allClose = this._gpuPaletteCurrent.every((c, i) => {
          const a = hexToRgb(c), b = hexToRgb(this._gpuPaletteTarget[i]);
          return Math.abs(a[0] - b[0]) < 1.5 && Math.abs(a[1] - b[1]) < 1.5 && Math.abs(a[2] - b[2]) < 1.5;
        });
        if (allClose) {
          this._gpuPaletteCurrent = this._gpuPaletteTarget.slice();
          this.mathVisualizer.setPalette(this._gpuPaletteCurrent.slice());
          this._gpuPaletteTarget = null;
          this._gpuPaletteLerpFrame = 0;
        }
      }

      this.audioReactiveAccentFrameId = window.requestAnimationFrame(tick);
    };

    this.audioReactiveAccentFrameId = window.requestAnimationFrame(tick);
  }

  applyVisualizerColorMode() {
    if (!this.visualizer && !this.mathVisualizer) {
      return;
    }

    // ── Theme-Driven Mode ──
    if (this.settings.visualizerColorMode === 'theme') {
      this.stopAudioReactiveAccentLoop();
      const themePalettes = {
        'chromic-dark':      ['#5e9eff', '#3a6fd8', '#1a3a8f'],
        'chromic-silver':    ['#5b86bf', '#8aadd4', '#3a5f8a'],
        'crystal-glass':     ['#c8c8d8', '#9898b0', '#686878'],
        'cinema-crimson':    ['#FF0032', '#cc0028', '#800018'],
        'galactic-violet':   ['#BF5AF2', '#9040c0', '#602080'],
        'sunset-flamingo':   ['#FF2D55', '#e01848', '#a01030'],
        'emerald-forest':    ['#34C759', '#28a048', '#1a6830'],
        'toxic-flow':        ['#00FF41', '#00cc34', '#008822'],
        'vault-red':         ['#e50914', '#b80710', '#7a050a'],
        'midnight-retro':    ['#4ec4ff', '#3090cc', '#1a5888'],
        // Neon collection
        'neon-cyber-blue':   ['#00d4ff', '#0098cc', '#005580'],
        'neon-magenta':      ['#ff00ff', '#cc00cc', '#800080'],
        'neon-amber':        ['#ffaa00', '#cc8800', '#806000'],
        'neon-coral':        ['#ff4444', '#cc2222', '#801818'],
        'neon-lime':         ['#aaff00', '#88cc00', '#558000'],
        // Pastel collection
        'pastel-rose':       ['#f0a0c8', '#d080a8', '#a05878'],
        'pastel-lavender':   ['#c0a8f0', '#a088d0', '#7060a0'],
        'pastel-mint':       ['#88e8b8', '#60c898', '#408868'],
        'pastel-sky':        ['#88c0f0', '#60a0d0', '#407898'],
        'pastel-peach':      ['#f0c088', '#d0a068', '#a07848'],
        // Classic collection
        'ocean-deep':        ['#3388cc', '#2266aa', '#114488'],
        'burgundy-wine':     ['#cc3355', '#aa2244', '#781830'],
        'midnight-indigo':   ['#6666dd', '#4848bb', '#303090'],
        'teal-abyss':        ['#00b8a0', '#009880', '#006858'],
        'copper-bronze':     ['#cc8844', '#aa6830', '#784820'],
        // Gradient collection
        'aurora-borealis':   ['#44ddaa', '#38aa88', '#6644ff'],
        'sunset-horizon':    ['#ff6633', '#e04820', '#ff2255'],
        'twilight-fade':     ['#aa66ee', '#8844cc', '#ff5588'],
        'cosmic-nebula':     ['#8844ff', '#6630cc', '#ff4488'],
        'ice-storm':         ['#66ccee', '#4498bb', '#4488cc'],
        // Luxury collection
        'gold-luxe':         ['#d4a832', '#b08820', '#8a6810'],
        'diamond-frost':     ['#b8d0e8', '#90a8c0', '#8898a8'],
        'brushed-steel':     ['#a0a0b0', '#808090', '#606068'],
        'rose-gold':         ['#e0a898', '#c08070', '#a06858'],
        'gasoline-slick':    ['#ff00aa', '#00ccff', '#88ff00'],
        // Light & Fresh collection
        'cloud-white':       ['#5080c0', '#3a6098', '#284060'],
        'sakura-bloom':      ['#d8608a', '#b84868', '#883048'],
        'lemon-sorbet':      ['#c8a020', '#a88018', '#786010'],
        'ocean-breeze':      ['#2098c0', '#1878a0', '#105868'],
        'sage-garden':       ['#4a9a4a', '#387838', '#285828'],
        'lavender-haze':     ['#7a58c0', '#5a4098', '#3a2868'],
        'peach-cream':       ['#d08030', '#a86020', '#784018'],
        'arctic-blue':       ['#4080b8', '#306090', '#204060'],
      };
      const currentTheme = document.documentElement.dataset.theme || 'chromic-dark';
      const palette = themePalettes[currentTheme] || themePalettes['chromic-dark'];
      const accent = palette[0];
      this.visualizer?.setAccent(accent);
      this._globalPlayerViz?.setAccentHex(accent);
      if (this.mathVisualizer?.setPalette) {
        this.mathVisualizer.setPalette(palette);
        _dbg(`[color-mode]  THEME palette applied (${currentTheme}): [${palette.join(', ')}]`);
      }
      return;
    }

    if (this.settings.visualizerColorMode === 'album') {
      this.stopAudioReactiveAccentLoop();
      const accent = this.albumAccent || this.colorEngine?.getAccentColor?.() || this.visualizer?.accent || '#7dd6ff';
      this.visualizer?.setAccent(accent);
      // Sync global player aurora accent
      this._globalPlayerViz?.setAccentHex(accent);
      // Re-apply album palette to GPU shader scenes
      if (this.mathVisualizer && this._lastPalette && this._lastPalette.length >= 3) {
        const toHex = (c) => `#${((1 << 24) | (c.r << 16) | (c.g << 8) | c.b).toString(16).slice(1)}`;
        const p = [toHex(this._lastPalette[0]), toHex(this._lastPalette[1]), toHex(this._lastPalette[2])];
        this.mathVisualizer.setPalette(p);
        _dbg(`[color-mode]  ALBUM palette applied: [${p.join(', ')}]`);
      } else {
        _dbg(`[color-mode] ⚠️ ALBUM mode but no palette yet (lastPalette=${!!this._lastPalette})`);
      }
      return;
    }

    // Set initial mood-based palette for GPU scenes (will be overridden by artwork identity)
    if (this.mathVisualizer) {
      this._paletteH = null; // Reset palette lerp state
      // Don't set a hardcoded palette — let artwork extraction seed the identity
    }
    resetMoodState(); // Reset for new track
    // If no artwork palette extracted yet, set a random identity so each track differs
    if (!this._lastPalette || this._lastPalette.length < 2) {
      const randomHue = Math.random() * 360;
      setTrackIdentity(randomHue, (randomHue + 120 + Math.random() * 60) % 360);
    }
    _dbg(`[color-mode]  AUDIO-REACTIVE mode — starting mood loop`);
    this.startAudioReactiveAccentLoop();
  }

  /**
   * Pre-warm the GPU visualizer in the background — creates ThreeOrchestrator
   * with an offscreen container and compiles the active scene's shader.
   * Called early (e.g. on switchCategory('music')) so the first overlay open is instant.
   */
  async preWarmVisualizer() {
    if (this.mathVisualizer || this._mathVisualizerLoading || this.settings.engineMode !== 'premium') return;
    _dbg('[VIZ-PRE-WARM] Starting background visualizer pre-warm...');
    this._mathVisualizerLoading = true;
    try {
      const mod = await getPreloadedVizModule() || await _vizModulePromise || await import('/visualizer/main.js');
      const { ThreeOrchestrator } = mod;
      if (this.mathVisualizer) { this._mathVisualizerLoading = false; return; }

      // Create offscreen container large enough to avoid GL framebuffer errors
      const offscreen = document.createElement('div');
      offscreen.style.cssText = 'position:fixed;top:-9999px;left:-9999px;width:64px;height:64px;overflow:hidden;pointer-events:none;opacity:0';
      document.body.appendChild(offscreen);

      // Install scroll shim before construction (same as initMathVisualizer)
      if (!document._scrollShimInstalled) {
        const origAddEventListener = document.addEventListener.bind(document);
        document.addEventListener = (type, handler, opts) => {
          if (type === 'scroll') {
            const wrappedHandler = (e) => {
              const panel = document.querySelector('.music-immersive-lyrics-panel');
              if (panel && (panel.classList.contains('user-scrolling') || e.target === panel || panel.contains(e.target))) return;
              handler(e);
            };
            return origAddEventListener(type, wrappedHandler, { passive: true, capture: false });
          }
          return origAddEventListener(type, handler, opts);
        };
        document._scrollShimInstalled = true;
      }

      // Use real analyser if available, otherwise create a mock so ThreeOrchestrator
      // can construct without crashing on analyser.frequencyBinCount
      let analyser = this.audioEngine?.getAnalyser?.() || null;
      if (!analyser) {
        _dbg('[VIZ-PRE-WARM] AudioEngine not ready, using mock analyser');
        const mockData = new Uint8Array(1024);
        analyser = {
          frequencyBinCount: 1024,
          fftSize: 2048,
          getByteFrequencyData: (arr) => arr.fill(0),
          getByteTimeDomainData: (arr) => arr.fill(128),
          getFloatFrequencyData: (arr) => arr.fill(-100),
          getFloatTimeDomainData: (arr) => arr.fill(0),
          smoothingTimeConstant: 0.8,
          minDecibels: -100,
          maxDecibels: -30,
        };
        this._preWarmUsedMockAnalyser = true;
      }

      this.mathVisualizer = new ThreeOrchestrator({ analyser, container: offscreen, resolutionScale: 0.6 });
      this._preWarmContainer = offscreen;

      // Pre-compile active scene shader (construction only, no render loop)
      const activeScene = this.settings.gpuScene || 0;
      if (this.mathVisualizer.sceneFactories && !this.mathVisualizer.scenes[activeScene]) {
        this.mathVisualizer.getOrCreateScene(activeScene);
      }

      // Force one GPU draw call to fully link shaders (compile alone is lazy in Chrome)
      // Use renderer.render() directly instead of starting the rAF loop
      try {
        const scene = this.mathVisualizer.current || this.mathVisualizer.scenes[activeScene];
        if (scene && this.mathVisualizer.renderer && this.mathVisualizer.camera) {
          this.mathVisualizer.renderer.setSize(64, 64, false);
          this.mathVisualizer.renderer.render(scene.scene || scene, this.mathVisualizer.camera);
          this.mathVisualizer.renderer.getContext().flush();
          _dbg('[VIZ-PRE-WARM] GPU shader link forced via single draw call');
        }
      } catch (_) { /* GL errors from tiny container are harmless */ }

      // Apply patches (GPU text disabled, scroll blur block, etc.)
      this._applyVisualizerPatches();

      // Apply scene & palette
      const targetScene = this.settings.gpuScene || 0;
      if (targetScene !== 0) this.mathVisualizer.setScene(targetScene);
      if (this._lastPalette?.length >= 3 && this.settings.visualizerColorMode === 'album') {
        const toHex = (c) => `#${((1 << 24) | (c.r << 16) | (c.g << 8) | c.b).toString(16).slice(1)}`;
        this.mathVisualizer.setPalette([toHex(this._lastPalette[0]), toHex(this._lastPalette[1]), toHex(this._lastPalette[2])]);
      }
      this.mathVisualizer.setMaxFps(this.settings.fpsMax || 30);
      // Apply dim state to shader
      this._applyVizDim();

      _dbg('[VIZ-PRE-WARM] ✅ Visualizer pre-warmed (shaders compiled, GPU cache warm)');
    } catch (err) {
      _dbgWarn('[VIZ-PRE-WARM] Failed:', err);
    }
    this._mathVisualizerLoading = false;
  }

  /** Apply standard patches to mathVisualizer (GPU text disable, scroll blur block). Idempotent. */
  _applyVisualizerPatches() {
    if (!this.mathVisualizer || this.mathVisualizer._patchesApplied) return;
    this.mathVisualizer._patchesApplied = true;

    // PATCH 1: GPU lyrics — when lyrics timeline is set, hide DOM panel and show GPU lyrics
    if (this.mathVisualizer.setLyricsTimeline) {
      const origSetLyricsTimeline = this.mathVisualizer.setLyricsTimeline.bind(this.mathVisualizer);
      this.mathVisualizer.setLyricsTimeline = (timeline) => {
        // Pass track artist/album to GPU lyrics renderer
        const track = this.items?.[this.currentTrackIndex];
        const artist = track?.artist || '';
        const album = track?.album || '';
        origSetLyricsTimeline(timeline, artist, album);
        // Hide DOM lyrics panel when GPU lyrics are active — ONLY in premium mode
        if (this.settings.engineMode !== 'premium') return;
        const domPanel = document.querySelector('.music-immersive-lyrics-panel');
        if (domPanel && timeline?.length) {
          domPanel.style.display = 'none';
          const shell = domPanel.closest('.music-immersive-shell');
          if (shell) shell.classList.add('gpu-lyrics-active');
        } else if (domPanel && (!timeline || !timeline.length)) {
          domPanel.style.display = '';
          const shell = domPanel.closest('.music-immersive-shell');
          if (shell) shell.classList.remove('gpu-lyrics-active');
        }
        // Ensure UI is visible so text renders through the effect composer
        this.mathVisualizer.setUiVisible(true);
      };
    }

    // PATCH 1b: Wrap setUiVisible so lyrics stay visible when timeline is active
    const origSetUiVisible = this.mathVisualizer.setUiVisible.bind(this.mathVisualizer);
    this.mathVisualizer.setUiVisible = (visible) => {
      origSetUiVisible(visible);
      // If lyrics timeline is loaded, always keep lyrics renderer visible & gpuTypography hidden
      if (this.mathVisualizer.lyricsRenderer?.timeline?.length > 0) {
        this.mathVisualizer.lyricsRenderer.setVisible(true);
        this.mathVisualizer.gpuTypography.setVisible(false);
      }
    };

    // PATCH 2: Block scroll-triggered blur on canvas
    const vizCanvas = this.mathVisualizer.renderer?.domElement;
    if (vizCanvas) {
      const origHandleResize = this.mathVisualizer.handleResize.bind(this.mathVisualizer);
      let isResizing = false;
      this.mathVisualizer.handleResize = function() {
        isResizing = true;
        origHandleResize();
        setTimeout(() => { isResizing = false; }, 300);
      };
      Object.defineProperty(vizCanvas.style, 'filter', {
        get() { return this.getPropertyValue('filter'); },
        set(val) {
          if (val && val.includes('blur') && !isResizing) return;
          this.setProperty('filter', val);
        },
        configurable: true,
      });
    }
  }

  async initMathVisualizer(analyser, renderRoot) {
    const container = renderRoot.querySelector('#mathVisualizerContainer');
    _dbg('[initMathVisualizer] engineMode=%s container=%o gpuScene=%d', this.settings.engineMode, !!container, this.settings.gpuScene);
    if (!container) return;

    if (this.settings.engineMode === 'premium') {
      // If pre-warmed, re-parent the canvas into the real container
      if (this.mathVisualizer && this._preWarmContainer) {
        _dbg('[VIZ-DEBUG] initMathVisualizer: re-parenting pre-warmed visualizer into overlay');
        const canvas = this.mathVisualizer.renderer?.domElement;
        if (canvas) container.appendChild(canvas);
        // Remove offscreen container
        this._preWarmContainer.remove();
        this._preWarmContainer = null;
        // Update analyser reference (replace mock with real analyser)
        if (analyser) {
          this.mathVisualizer.analyser = analyser;
          // Rebuild audio data buffer if mock was used (frequencyBinCount may differ)
          if (this._preWarmUsedMockAnalyser) {
            const binCount = analyser.frequencyBinCount || 1024;
            this.mathVisualizer.audioData = new Uint8Array(binCount);
            this._preWarmUsedMockAnalyser = false;
          }
        }
        // Ensure blur overlay exists in the real container
        this._ensureVizBlurOverlay(container);
        this._vizBlurOverlay.style.transition = 'none';
        this._showCssBlur();
        this._pendingScene = null;
        this._mathVisualizerLoading = false;
        _dbg('[VIZ-DEBUG] initMathVisualizer: DONE (from pre-warm), mathVisualizer=%o running=%o', !!this.mathVisualizer, this.mathVisualizer?.running);
      } else if (!this.mathVisualizer && !this._mathVisualizerLoading) {
        // Initialize in background even when overlay is closed — preload shaders so first open is instant.
        // The render loop only starts when overlay is actually visible (checked below).
        _dbg('[VIZ-DEBUG] initMathVisualizer: starting load (no existing, not loading)');
        this._mathVisualizerLoading = true;
        try {
          const mod = await getPreloadedVizModule() || await _vizModulePromise || await import('/visualizer/main.js');
          const { ThreeOrchestrator } = mod;
          if (this.mathVisualizer) { _dbg('[VIZ-DEBUG] initMathVisualizer: another call already created it, returning'); this._mathVisualizerLoading = false; return; }

          // PATCH 0: Shim addEventListener to neutralize ThreeOrchestrator's scroll listener.
          // Forces passive:true, capture:false on scroll listeners, and wraps the handler
          // to skip execution when the lyrics panel is scrolling (userIsScrolling).
          if (!document._scrollShimInstalled) {
            const origAddEventListener = document.addEventListener.bind(document);
            document.addEventListener = (type, handler, opts) => {
              if (type === 'scroll') {
                const wrappedHandler = (e) => {
                  // Skip if lyrics are auto-scrolling or user is scrolling lyrics
                  const panel = document.querySelector('.music-immersive-lyrics-panel');
                  if (panel && (panel.classList.contains('user-scrolling') || e.target === panel || panel.contains(e.target))) {
                    return;
                  }
                  handler(e);
                };
                return origAddEventListener(type, wrappedHandler, { passive: true, capture: false });
              }
              return origAddEventListener(type, handler, opts);
            };
            document._scrollShimInstalled = true;
          }

          this.mathVisualizer = new ThreeOrchestrator({ analyser, container, resolutionScale: 0.6 });

          // ── Task 5: Lazy Shader Warmup ──
          // Only pre-compile the active scene to avoid GPU stalls.
          {
            const viz = this.mathVisualizer;
            const activeScene = this.settings.gpuScene || 0;
            const totalScenes = viz.sceneFactories?.length || 0;
            requestAnimationFrame(() => {
              if (!viz || !viz.sceneFactories) return;
              if (!viz.scenes[activeScene]) {
                viz.getOrCreateScene(activeScene);
              }
              _dbg(`[Visualizer] ✅ Shader warmup complete: 1/${totalScenes} scenes pre-compiled (active: ${activeScene})`);
            });
          }

          // Apply standard patches (GPU text disable, scroll blur block)
          this._applyVisualizerPatches();

          // Use blur overlay to hide low-res startup frames
          this._ensureVizBlurOverlay(container);
          this._vizBlurOverlay.style.transition = 'none';
          this._showCssBlur();
          const targetScene = this.settings.gpuScene || 0;
          if (targetScene !== 0) {
            this.mathVisualizer.setScene(targetScene);
          }
          // Apply cached album palette now that mathVisualizer exists (fixes reload)
          if (this._lastPalette && this._lastPalette.length >= 3 && this.settings.visualizerColorMode === 'album') {
            const toHex = (c) => `#${((1 << 24) | (c.r << 16) | (c.g << 8) | c.b).toString(16).slice(1)}`;
            this.mathVisualizer.setPalette([toHex(this._lastPalette[0]), toHex(this._lastPalette[1]), toHex(this._lastPalette[2])]);
          }
          // Apply dim state to shader now that mathVisualizer exists
          this._applyVizDim();
          // Apply 30fps default
          this.mathVisualizer.setMaxFps(this.settings.fpsMax || 30);
          this._pendingScene = null;
        } catch (err) {
          _dbgWarn('[MathVisualizer] Failed to load premium engine:', err);
          this._mathVisualizerLoading = false;
          return;
        }
        this._mathVisualizerLoading = false;
        _dbg('[VIZ-DEBUG] initMathVisualizer: DONE, mathVisualizer=%o running=%o', !!this.mathVisualizer, this.mathVisualizer?.running);
        // Start in ultra-low-power warm mode (1fps, 10% res) so GPU context stays alive
        if (this.mathVisualizer && !this.mathVisualizer.running) {
          this.mathVisualizer.setResolutionScale(0.6);
          this.mathVisualizer.setMaxFps(1);
          this.mathVisualizer.setTimeScale(0.01, 50);
          this.mathVisualizer.start();
          _dbg('[VIZ-DEBUG] initMathVisualizer: started in warm idle mode (1fps, 0.1x res)');
        }
      } else {
        _dbg('[VIZ-DEBUG] initMathVisualizer: SKIPPED — mathVisualizer=%o _mathVisualizerLoading=%o', !!this.mathVisualizer, this._mathVisualizerLoading);
      }
      // Only start rendering if overlay is actually visible
      if (this._overlayIsOpen && this.mathVisualizer) {
        // Apply deferred scene switch now (shader compile happens here, but overlay is visible so user expects a brief pause)
        if (this._pendingScene != null && this._pendingScene !== 0) {
          this.mathVisualizer.setScene(this._pendingScene);
          this._pendingScene = null;
        }
        this.mathVisualizer.start();
        // Ensure GPU text layers are visible (patched setUiVisible fixes the bug)
        this.mathVisualizer.setUiVisible(true);

        // (Visualizer no longer blurred during lyrics scroll — GPU text handles itself via CSS)
      }
      container.style.display = '';
      // Reset any leftover cinematic blur from previous FLIP
      const vizCanvas = container.querySelector('canvas');
      if (vizCanvas) {
        vizCanvas.style.filter = '';
        vizCanvas.style.opacity = '';
        vizCanvas.style.transform = '';
        vizCanvas.style.transition = '';
        vizCanvas.style.willChange = '';
      }
      if (this.pageUi?.canvas) this.pageUi.canvas.style.display = 'none';
      // Stop CPU visualizer (GPU takes over rendering) but keep lyrics running
      this.visualizer?.stop();
      this.stopAudioReactiveAccentLoop();
    } else {
      this.mathVisualizer?.stop();
      if (container) {
        container.style.display = 'none';
        // Clear any leftover blur styles
        const vizCanvas = container.querySelector('canvas');
        if (vizCanvas) {
          vizCanvas.style.filter = '';
          vizCanvas.style.opacity = '';
          vizCanvas.style.transform = '';
          vizCanvas.style.transition = '';
          vizCanvas.style.willChange = '';
        }
      }
      if (this.pageUi?.canvas) this.pageUi.canvas.style.display = '';
      // Resume classic loops
      this.visualizer?.start();
      this.lyrics?.start();
    }
  }

  switchEngineMode(mode) {
    this.settings.engineMode = mode;
    // Update settings panel visibility
    const settingsPanel = this.getOverlayRoot()?.querySelector('.music-player-settings');
    if (settingsPanel) settingsPanel.dataset.engine = mode;
    const presetPicker = this.getOverlayRoot()?.querySelector('#inlinePresetPicker');
    if (presetPicker) presetPicker.style.display = mode === 'premium' ? 'none' : '';
    const gpuPicker = this.getOverlayRoot()?.querySelector('#inlineGpuScenePicker');
    if (gpuPicker) gpuPicker.style.display = mode === 'premium' ? '' : 'none';
    document.body.classList.toggle('engine-premium', mode === 'premium');

    if (mode === 'classic') {
      // Restore DOM lyrics panel when switching away from GPU
      const domPanel = document.querySelector('.music-immersive-lyrics-panel');
      if (domPanel) {
        domPanel.style.display = '';
        // Ensure #musicLyricsStage exists (may have been cleared)
        if (!domPanel.querySelector('#musicLyricsStage')) {
          domPanel.innerHTML = '<div id="musicLyricsStage" class="lyrics-container"></div>';
        }
      }
      const shell = domPanel?.closest('.music-immersive-shell');
      if (shell) shell.classList.remove('gpu-lyrics-active');
      // Stop GPU visualizer rendering to save resources
      if (this.mathVisualizer) {
        this.mathVisualizer.stop?.();
        // Hide the GPU canvas
        const canvas = this.mathVisualizer.renderer?.domElement;
        if (canvas) canvas.style.display = 'none';
      }
      // Start DOM lyrics sync and classic visualizer
      if (this.lyrics) {
        // Restore original setTrack/start if they were overridden by premium mode
        if (this.lyrics._origSetTrack) {
          this.lyrics.setTrack = this.lyrics._origSetTrack;
          this.lyrics._origSetTrack = null;
        }
        if (this.lyrics._origStart) {
          this.lyrics.start = this.lyrics._origStart;
          this.lyrics._origStart = null;
        }
        this.lyrics._premiumDisabled = false;

        // Ensure container is the live DOM element (could be stale if overlay was reconstructed)
        const liveContainer = document.querySelector('#musicLyricsStage');
        if (liveContainer && this.lyrics.container !== liveContainer) {
          _dbg('[switchEngineMode] Lyrics container is stale — reattaching to live DOM element');
          this.lyrics.container = liveContainer;
        }
        // Rebuild DOM lyrics if container is empty (can happen if GPU mode was active during track load)
        if (this.lyrics.container && this.lyrics.timeline?.length > 0 && !this.lyrics.container.children.length) {
          _dbg('[switchEngineMode] Lyrics container empty — rebuilding DOM lyrics');
          this.lyrics._buildChunkedDOM();
          const shell2 = this.lyrics.container.closest('.music-immersive-shell');
          if (shell2) shell2.classList.add('has-lyrics');
          this.lyrics.activeLineIndex = -1;
          this.lyrics.start();
          this.lyrics.updateActiveLine?.();
        } else if (this.lyrics.container && (!this.lyrics.timeline || !this.lyrics.timeline.length || !this.lyrics.container.children.length)) {
          // Timeline empty or DOM empty — always re-fetch from scratch (most reliable)
          const currentTrack = this.items?.[this.currentTrackIndex];
          if (currentTrack) {
            _dbg('[switchEngineMode] Lyrics missing — re-fetching for current track');
            this.fetchAndDisplayLyrics(currentTrack).then(() => {
              const shell2 = this.lyrics?.container?.closest('.music-immersive-shell');
              if (shell2) shell2.classList.add('has-lyrics');
              this.lyrics?.start();
              this.lyrics?.updateActiveLine?.();
            });
          }
        } else {
          this.lyrics.activeLineIndex = -1;
          this.lyrics.start();
          this.lyrics.updateActiveLine?.();
        }
      }
      // Show classic canvas and start visualizer
      const classicCanvas = this.getOverlayRoot()?.querySelector('#trackVisualizer');
      if (classicCanvas) classicCanvas.style.display = '';
      if (this.visualizer) {
        this.visualizer.start();
      }
    } else {
      // Re-show GPU canvas and container when switching back to premium
      const vizContainer = this.getOverlayRoot()?.querySelector('#mathVisualizerContainer');
      if (vizContainer) vizContainer.style.display = '';
      if (this.mathVisualizer) {
        const canvas = this.mathVisualizer.renderer?.domElement;
        if (canvas) canvas.style.display = '';
        // Start the GPU visualizer if not running
        if (!this.mathVisualizer.running) {
          this.mathVisualizer.setResolutionScale(1.0);
          this.mathVisualizer.setMaxFps(this.settings.fpsMax || 60);
          this.mathVisualizer.setTimeScale(1.0, 0);
          this.mathVisualizer.start();
        } else {
          // Already running but time may be frozen from close — resume it
          this.mathVisualizer.setTimeScale(1.0, 0);
        }
      }
      // Hide classic canvas
      const classicCanvas = this.getOverlayRoot()?.querySelector('#trackVisualizer');
      if (classicCanvas) classicCanvas.style.display = 'none';
      // Stop classic visualizer
      this.visualizer?.stop();
      // Stop DOM lyrics sync (GPU lyrics take over)
      this.lyrics?.stop();
      // Re-override lyrics methods for premium mode
      if (this.lyrics && !this.lyrics._origSetTrack) {
        const origStart = this.lyrics.start.bind(this.lyrics);
        const origSetTrack = this.lyrics.setTrack.bind(this.lyrics);
        this.lyrics.start = () => {};
        this.lyrics.setTrack = (data) => {
          this.lyrics.timeline = data?.syncedLyrics || data?.lyrics?.split?.('\n') || [];
          this.lyrics._lastTrackData = data;
          return Promise.resolve();
        };
        this.lyrics._origStart = origStart;
        this.lyrics._origSetTrack = origSetTrack;
        this.lyrics._premiumDisabled = true;
      }
      // Hide DOM lyrics panel (GPU lyrics will take over when timeline is set)
      const domPanel = document.querySelector('.music-immersive-lyrics-panel');
      if (domPanel) {
        domPanel.style.display = 'none';
        const shell = domPanel?.closest('.music-immersive-shell');
        if (shell) shell.classList.add('gpu-lyrics-active');
      }
    }

    const analyser = this.audioEngine.getAnalyser();
    const renderRoot = this.getOverlayRoot();
    this.initMathVisualizer(analyser, renderRoot);
    this._applyFpsLimit();
    this.persistPlayerState({ immediate: true });
  }

  _applyFpsLimit() {
    const fps = this.settings.fpsMax || 30;
    // Apply to GPU visualizer
    if (this.mathVisualizer?.setMaxFps) {
      this.mathVisualizer.setMaxFps(fps);
    }
    // Apply to CPU visualizer
    if (this.visualizer) {
      this.visualizer._fpsMax = fps;
    }
  }

  _restoreScrollPosition() {
    this._removeFakeScrollbar();
    const scrollY = parseInt(document.body.style.getPropertyValue('--scroll-y') || '0');
    document.body.style.removeProperty('--scroll-y');
    // Scroll instantly and sync dampener to prevent jumps
    window.scrollTo(0, scrollY);
    window._chromicResetSmoothScroll?.(scrollY);
  }

  /** Compensate for scrollbar disappearing so content doesn't shift */
  _showFakeScrollbar(scrollY) {
    this._removeFakeScrollbar();

    // Only do anything if page actually has scroll
    const docHeight = document.documentElement.scrollHeight;
    const viewHeight = window.innerHeight;
    if (docHeight <= viewHeight) {
      _dbg('[scroll-lock] No scroll on page, skipping fake scrollbar');
      return;
    }

    // Measure native scrollbar width BEFORE overflow:hidden is applied
    const sbWidth = window.innerWidth - document.documentElement.clientWidth;
    const effectiveSbWidth = Math.max(sbWidth, 6);
    this._savedScrollbarWidth = sbWidth;
    _dbg('[scroll-lock] _showFakeScrollbar: sbWidth=%d effectiveSbWidth=%d scrollY=%d', sbWidth, effectiveSbWidth, scrollY);

    // Set --scrollbar-width so fixed elements (header, app-shell) offset via `right`
    document.documentElement.style.setProperty('--scrollbar-width', `${sbWidth}px`);
    // Add padding-right to prevent content from expanding into freed scrollbar space
    if (sbWidth > 0) {
      document.body.style.paddingRight = `${sbWidth}px`;
    }

    // Create a visual fake scrollbar track
    const track = document.createElement('div');
    track.className = 'fake-scrollbar-track';
    track.style.width = `${effectiveSbWidth}px`;

    const thumbRatio = viewHeight / docHeight;
    const thumbHeight = Math.max(30, viewHeight * thumbRatio);
    const maxTop = viewHeight - thumbHeight;
    const scrollRatio = scrollY / (docHeight - viewHeight);
    const thumbTop = scrollRatio * maxTop;

    const thumb = document.createElement('div');
    thumb.className = 'fake-scrollbar-thumb';
    thumb.style.height = `${thumbHeight}px`;
    thumb.style.top = `${thumbTop}px`;
    thumb.style.width = '5px';

    track.appendChild(thumb);
    document.body.appendChild(track);
    this._fakeScrollbarEl = track;
  }

  _removeFakeScrollbar() {
    document.documentElement.style.removeProperty('--scrollbar-width');
    document.body.style.paddingRight = '';
    _dbg('[scroll-lock] _removeFakeScrollbar: cleaned up');
    if (this._fakeScrollbarEl) {
      this._fakeScrollbarEl.remove();
      this._fakeScrollbarEl = null;
    }
    this._savedScrollbarWidth = 0;
  }

  _ensureVizBlurOverlay(container) {
    if (this._vizBlurOverlay && this._vizBlurOverlay.isConnected && this._vizBlurOverlay.parentElement === container) return;
    let overlay = container.querySelector('.viz-blur-overlay');
    if (!overlay) {
      overlay = document.createElement('div');
      overlay.className = 'viz-blur-overlay';
      overlay.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;pointer-events:none;z-index:1;backdrop-filter:blur(12px) saturate(1.3);-webkit-backdrop-filter:blur(12px) saturate(1.3);opacity:0;will-change:opacity;';
      container.appendChild(overlay);
    }
    this._vizBlurOverlay = overlay;
    // GPU (premium) mode: never show CSS blur overlay — shader handles it
    if (this.settings.engineMode === 'premium') {
      overlay.style.opacity = '0';
    }
  }

  /** Show CSS blur overlay — only for CPU (classic) mode. GPU mode uses shader blur. */
  _showCssBlur(transition) {
    if (!this._vizBlurOverlay) return;
    if (this.settings.engineMode === 'premium') {
      // GPU mode: ensure CSS blur is always hidden
      this._vizBlurOverlay.style.opacity = '0';
      return;
    }
    if (transition) {
      this._vizBlurOverlay.style.transition = transition;
    } else {
      this._vizBlurOverlay.style.transition = 'none';
    }
    this._vizBlurOverlay.style.opacity = '1';
  }

  _ensureChromicOverlay(vizContainer) {
    const parent = vizContainer.parentElement;
    let chromicOverlay = parent?.querySelector('.viz-off-chromic-overlay');
    if (!chromicOverlay) {
      chromicOverlay = document.createElement('div');
      chromicOverlay.className = 'viz-off-chromic-overlay';
      chromicOverlay.style.cssText = `
        position: absolute; inset: 0; width: 100%; height: 100%;
        pointer-events: none; z-index: 2; opacity: 0;
        transition: opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1);
        background:
          radial-gradient(ellipse at 30% 20%, rgba(255,255,255,0.08) 0%, transparent 60%),
          radial-gradient(ellipse at 70% 80%, rgba(140,120,255,0.10) 0%, transparent 50%),
          radial-gradient(ellipse at 50% 50%, rgba(220,200,255,0.06) 0%, transparent 70%),
          linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(0,0,0,0.10) 100%);
      `;
      parent.insertBefore(chromicOverlay, vizContainer.nextSibling);
    }
    return chromicOverlay;
  }

  // Blur overlay that lives OUTSIDE the viz container so it works when viz is off
  _ensurePageBlurOverlay(vizContainer) {
    const parent = vizContainer.parentElement;
    let overlay = parent?.querySelector('.viz-off-blur-overlay');
    if (!overlay) {
      overlay = document.createElement('div');
      overlay.className = 'viz-off-blur-overlay';
      overlay.style.cssText = `
        position: absolute; inset: 0; width: 100%; height: 100%;
        pointer-events: none; z-index: 1; opacity: 0;
        transition: opacity 0.4s ease-out;
        backdrop-filter: blur(12px) saturate(1.3);
        -webkit-backdrop-filter: blur(12px) saturate(1.3);
        will-change: opacity;
      `;
      parent.insertBefore(overlay, vizContainer.nextSibling);
    }
    return overlay;
  }

  toggleVisualizerBlur() {
    const vizContainer = this.getOverlayRoot()?.querySelector('#mathVisualizerContainer');
    if (!vizContainer) return;
    const vizIsOff = vizContainer.style.display === 'none';
    const isBlurred = this._vizBlurOverlay?.dataset?.manualBlur === 'true';
    const blurBtn = this.getOverlayRoot()?.querySelector('#vizBlurBtn');
    console.log('[VIZ-BLUR] toggle: engineMode=%s isBlurred=%s vizIsOff=%s mathVisualizer=%o', this.settings.engineMode, isBlurred, vizIsOff, !!this.mathVisualizer);

    // GPU (premium) mode: use shader blur, no CSS overlay
    if (this.settings.engineMode === 'premium' && this.mathVisualizer && !vizIsOff) {
      this._ensureVizBlurOverlay(vizContainer);
      if (isBlurred) {
        this._vizBlurOverlay.dataset.manualBlur = 'false';
        this._vizBlurOverlay.style.opacity = '0';
        this.mathVisualizer.setBlur?.(false);
        blurBtn?.classList.remove('active');
        blurBtn?.setAttribute('aria-pressed', 'false');
        this.settings.vizBlurEnabled = false;
        console.log('[VIZ-BLUR] GPU: blur OFF');
      } else {
        this._vizBlurOverlay.dataset.manualBlur = 'true';
        this._vizBlurOverlay.style.opacity = '0'; // No CSS blur for GPU mode
        this.mathVisualizer.setBlur?.(true);
        blurBtn?.classList.add('active');
        blurBtn?.setAttribute('aria-pressed', 'true');
        this.settings.vizBlurEnabled = true;
        console.log('[VIZ-BLUR] GPU: blur ON');
      }
      this.persistPlayerState({ immediate: true });
      return;
    }

    if (vizIsOff) {
      // Use the page-level blur overlay when viz is off
      const pageBlur = this._ensurePageBlurOverlay(vizContainer);
      if (isBlurred) {
        // Turn off blur
        if (this._vizBlurOverlay) this._vizBlurOverlay.dataset.manualBlur = 'false';
        pageBlur.style.opacity = '0';
        blurBtn?.classList.remove('active');
        blurBtn?.setAttribute('aria-pressed', 'false');
        this.settings.vizBlurEnabled = false;
      } else {
        // Turn on blur
        this._ensureVizBlurOverlay(vizContainer);
        this._vizBlurOverlay.dataset.manualBlur = 'true';
        pageBlur.style.opacity = '1';
        blurBtn?.classList.add('active');
        blurBtn?.setAttribute('aria-pressed', 'true');
        this.settings.vizBlurEnabled = true;
      }
    } else {
      // Normal viz-on blur behavior
      this._ensureVizBlurOverlay(vizContainer);
      if (isBlurred) {
        this._vizBlurOverlay.dataset.manualBlur = 'false';
        this._vizBlurOverlay.style.transition = 'opacity 0.4s ease-out';
        this._vizBlurOverlay.style.opacity = '0';
        blurBtn?.classList.remove('active');
        blurBtn?.setAttribute('aria-pressed', 'false');
        this.settings.vizBlurEnabled = false;
      } else {
        this._vizBlurOverlay.dataset.manualBlur = 'true';
        this._showCssBlur('opacity 0.4s ease-out');
        blurBtn?.classList.add('active');
        blurBtn?.setAttribute('aria-pressed', 'true');
        this.settings.vizBlurEnabled = true;
      }
    }
    this.persistPlayerState({ immediate: true });
  }

  toggleVisualizerDim() {
    this.settings.vizDimEnabled = !this.settings.vizDimEnabled;
    console.log('[VIZ-DIM] toggle: engineMode=%s dimEnabled=%s dimOpacity=%s mathVisualizer=%o', this.settings.engineMode, this.settings.vizDimEnabled, this.settings.vizDimOpacity, !!this.mathVisualizer);
    const dimBtn = this.getOverlayRoot()?.querySelector('#vizDimBtn');
    const sliderWrap = this.getOverlayRoot()?.querySelector('#vizDimSliderWrap');
    dimBtn?.classList.toggle('active', this.settings.vizDimEnabled);
    dimBtn?.setAttribute('aria-pressed', String(this.settings.vizDimEnabled));
    if (sliderWrap) sliderWrap.style.display = this.settings.vizDimEnabled ? 'flex' : 'none';
    this._applyVizDim();
    this.persistPlayerState({ immediate: true });
  }

  _applyVizDim() {
    // GPU (premium) mode: use shader dim only (text stays full opacity)
    if (this.settings.engineMode === 'premium') {
      if (this.mathVisualizer) {
        this.mathVisualizer.setDim?.(this.settings.vizDimEnabled, this.settings.vizDimOpacity || 0.4);
      }
      // Hide CSS overlay in premium mode — shader handles it (even if mathVisualizer not yet ready)
      const overlay = this._ensureVizDimOverlay();
      if (overlay) overlay.style.opacity = '0';
      return;
    }
    // Classic (CPU) mode: CSS overlay
    const overlay = this._ensureVizDimOverlay();
    if (!overlay) return;
    if (this.settings.vizDimEnabled) {
      overlay.style.opacity = '1';
      overlay.style.background = `rgba(0, 0, 0, ${this.settings.vizDimOpacity})`;
    } else {
      overlay.style.opacity = '0';
    }
  }

  _restoreVizHudStates() {
    // Restore viz blur state
    if (this.settings.vizBlurEnabled) {
      const vizContainer = this.getOverlayRoot()?.querySelector('#mathVisualizerContainer');
      if (vizContainer) {
        this._ensureVizBlurOverlay(vizContainer);
        this._vizBlurOverlay.dataset.manualBlur = 'true';
        if (this.settings.engineMode === 'premium' && this.mathVisualizer) {
          // GPU mode: use shader blur, no CSS overlay
          this.mathVisualizer.setBlur?.(true);
        } else {
          const vizIsOff = vizContainer.style.display === 'none';
          if (vizIsOff) {
            const pageBlur = this._ensurePageBlurOverlay(vizContainer);
            pageBlur.style.opacity = '1';
          } else {
            this._showCssBlur();
          }
        }
        const blurBtn = this.getOverlayRoot()?.querySelector('#vizBlurBtn');
        blurBtn?.classList.add('active');
        blurBtn?.setAttribute('aria-pressed', 'true');
      }
    }
    // Restore viz off state
    if (this.settings.vizOff) {
      const vizContainer = this.getOverlayRoot()?.querySelector('#mathVisualizerContainer');
      if (vizContainer) {
        vizContainer.style.display = 'none';
        const toggleBtn = this.getOverlayRoot()?.querySelector('#vizToggleBtn');
        toggleBtn?.classList.remove('active');
        toggleBtn?.setAttribute('aria-pressed', 'false');
        const chromicOverlay = this._ensureChromicOverlay(vizContainer);
        chromicOverlay.style.opacity = '1';
        if (this.settings.vizBlurEnabled) {
          const pageBlur = this._ensurePageBlurOverlay(vizContainer);
          pageBlur.style.opacity = '1';
        }
        const page = vizContainer.closest('.music-track-page');
        page?.classList.add('viz-off-frozen');
        if (this.mathVisualizer?.pause) this.mathVisualizer.pause();
      }
    }
  }

  _ensureVizDimOverlay() {
    const page = this.getOverlayRoot()?.querySelector('.music-track-page');
    if (!page) return null;
    let overlay = page.querySelector('.viz-dim-overlay');
    if (!overlay) {
      overlay = document.createElement('div');
      overlay.className = 'viz-dim-overlay';
      overlay.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;pointer-events:none;z-index:2;opacity:0;transition:opacity 0.4s ease, background 0.3s ease;background:rgba(0,0,0,0.4);';
      // Insert after math visualizer container but before UI
      const glass = page.querySelector('.music-track-glass');
      if (glass) glass.after(overlay);
      else page.appendChild(overlay);
    }
    return overlay;
  }

  _bindVizDimSlider() {
    const slider = this.getOverlayRoot()?.querySelector('#vizDimSlider');
    const label = this.getOverlayRoot()?.querySelector('#vizDimLabel');
    const sliderWrap = this.getOverlayRoot()?.querySelector('#vizDimSliderWrap');
    if (!slider || slider._dimBound) return;
    slider._dimBound = true;
    // Prevent clicks on slider/wrap from toggling the dim button
    sliderWrap?.addEventListener('click', (e) => e.stopPropagation());
    slider.addEventListener('input', () => {
      const val = parseInt(slider.value) / 100;
      this.settings.vizDimOpacity = val;
      if (label) label.textContent = `${slider.value}%`;
      this._applyVizDim();
    });
    slider.addEventListener('change', () => {
      this.persistPlayerState({ immediate: true });
    });
  }

  toggleVisualizerOnOff() {
    const vizContainer = this.getOverlayRoot()?.querySelector('#mathVisualizerContainer');
    const toggleBtn = this.getOverlayRoot()?.querySelector('#vizToggleBtn');
    if (!vizContainer) return;
    const isOff = vizContainer.style.display === 'none';
    const chromicOverlay = this._ensureChromicOverlay(vizContainer);
    const pageBlur = this._ensurePageBlurOverlay(vizContainer);

    if (isOff) {
      // Turning viz back ON
      vizContainer.style.display = '';
      toggleBtn?.classList.add('active');
      toggleBtn?.setAttribute('aria-pressed', 'true');
      // Hide chromic overlay
      chromicOverlay.style.opacity = '0';
      // Hide page blur overlay (viz has its own)
      pageBlur.style.opacity = '0';
      // If blur was on, re-apply to viz blur overlay
      if (this._vizBlurOverlay?.dataset?.manualBlur === 'true') {
        this._ensureVizBlurOverlay(vizContainer);
        this._showCssBlur();
      }
      // Unfreeze CSS effects
      const page = vizContainer.closest('.music-track-page');
      page?.classList.remove('viz-off-frozen');
      // Resume rendering
      if (this.mathVisualizer?.resume) this.mathVisualizer.resume();
      this.settings.vizOff = false;
    } else {
      // Turning viz OFF
      vizContainer.style.display = 'none';
      toggleBtn?.classList.remove('active');
      toggleBtn?.setAttribute('aria-pressed', 'false');
      // Show chromic glass overlay
      chromicOverlay.style.opacity = '1';
      // If blur is active, show page blur overlay
      if (this._vizBlurOverlay?.dataset?.manualBlur === 'true') {
        pageBlur.style.opacity = '1';
      }
      // Freeze CSS effects
      const page = vizContainer.closest('.music-track-page');
      page?.classList.add('viz-off-frozen');
      // Pause rendering
      if (this.mathVisualizer?.pause) this.mathVisualizer.pause();
      this.settings.vizOff = true;
    }
    this.persistPlayerState({ immediate: true });
  }

  bindInlineSettingsControls() {
    const page = this.pageUi?.page;
    if (!page) return;

    // Handle range inputs
    const handleRange = (id, handler) => {
      const el = page.querySelector(`#${id}`);
      if (el) el.addEventListener('input', (e) => { handler(parseFloat(e.target.value)); this.persistPlayerState({ immediate: true }); });
    };
    handleRange('inlineIntensityRange', (v) => { this.settings.intensity = v; this.visualizer?.setIntensity(v); });
    handleRange('inlineSensitivityRange', (v) => { this.settings.sensitivity = v; this.visualizer?.setSensitivity(v); });
    handleRange('inlineLavaOpacityRange', (v) => { this.settings.lavaOpacity = v; this.visualizer?.setBgOpacity(v); this.mathVisualizer?.setBgOpacity?.(v); });
    handleRange('inlineLavaIntensityRange', (v) => { this.settings.lavaIntensity = v; this.visualizer?.setBgIntensity(v); this.mathVisualizer?.setBgIntensity?.(v); });
    handleRange('inlineParticleDensityRange', (v) => { this.settings.particleDensity = v; this.mathVisualizer?.setParticleDensity?.(v); });
    handleRange('inlineLavaResolutionRange', (v) => { this.settings.lavaResolution = v; this.mathVisualizer?.setResolution?.(v); });

    // Handle toggle checkboxes
    const handleToggle = (id, handler) => {
      const el = page.querySelector(`#${id}`);
      if (el) el.addEventListener('change', (e) => { handler(e.target.checked); this.persistPlayerState({ immediate: true }); });
    };
    handleToggle('inlineVisualEnabledToggle', (v) => { this.settings.visualEnabled = v; this.applyPageFlags(); });
    handleToggle('inlineTextEnabledToggle', (v) => { this.settings.textEnabled = v; this.applyPageFlags(); });
    handleToggle('inlineRetroFilterToggle', (v) => { this.settings.retroFilterEnabled = v; this.applyPageFlags(); });
    handleToggle('inlinePureVisualModeToggle', (v) => { this.settings.uiMode = v ? 'visualizer-only' : 'full'; this.applyPageFlags(); });
  }

  bindDelegatedPageControls() {
    const page = this.pageUi?.page;
    if (!page) return;

    // Track progress bar — seek on input
    const progressEl = page.querySelector('#trackProgress');
    if (progressEl) {
      progressEl.addEventListener('input', (e) => {
        const ratio = parseFloat(e.target.value) / 1000;
        // User manually seeking - clear any pending restore state
        this._pendingSeekTarget = null;
        this._restoredFromReload = false;
        this.audioEngine.seekToRatio(ratio);
        this.updateProgressUi();
      });
    }

    // Volume slider
    const volumeEl = page.querySelector('#trackVolume');
    if (volumeEl) {
      volumeEl.addEventListener('input', (e) => {
        const vol = parseFloat(e.target.value);
        this.audioEngine.setVolume(vol);
        this.settings.volume = vol;
        this.persistPlayerState({ immediate: true });
      });
      // Never allow focus to persist — blur immediately on focus
      volumeEl.addEventListener('focus', () => volumeEl.blur());
    }

    // Auto-expand HUD actions collapsible when hudActionsToggle receives keyboard focus
    const hudToggle = page.querySelector('#hudActionsToggle');
    if (hudToggle) {
      hudToggle.addEventListener('focus', () => {
        const collapsible = page.querySelector('#hudActionsCollapsible');
        if (collapsible && !collapsible.classList.contains('is-expanded')) {
          collapsible.classList.add('is-expanded');
          hudToggle.classList.add('is-expanded');
          hudToggle.setAttribute('aria-expanded', 'true');
          hudToggle.setAttribute('aria-label', 'Hide actions');
          collapsible.querySelectorAll('button, input').forEach(el => {
            el.setAttribute('tabindex', '0');
          });
          this.settings.hudActionsExpanded = true;
          this.persistPlayerState({ immediate: true });
        }
      });
    }

    // Set initial tabindex on collapsed HUD actions buttons
    const hudCollapsible = page.querySelector('#hudActionsCollapsible');
    if (hudCollapsible && !hudCollapsible.classList.contains('is-expanded')) {
      hudCollapsible.querySelectorAll('button, input').forEach(el => {
        el.setAttribute('tabindex', '-1');
      });
    }

    // Same for progress slider
    if (progressEl) {
      progressEl.addEventListener('focus', () => progressEl.blur());
    }
  }

  toggleSettingsSection(sectionName) {
    if (!this.pageUi?.settingsSections) return;
    this.pageUi.settingsSections.forEach((group) => {
      const isTarget = group.dataset.settingsGroup === sectionName;
      if (isTarget) {
        const isOpen = group.classList.toggle('is-open');
        const toggle = group.querySelector('.music-settings-group-toggle');
        if (toggle) toggle.setAttribute('aria-expanded', String(isOpen));
      } else {
        group.classList.remove('is-open');
        const toggle = group.querySelector('.music-settings-group-toggle');
        if (toggle) toggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  bindSwipeToClose() {
    const page = this.pageUi?.page;
    const dragHandle = page?.querySelector('.music-track-art-wrap');
    if (!page) {
      return;
    }

    const isInteractiveTarget = (target) => target?.closest?.('button, input, select, textarea, a, label');

    dragHandle?.addEventListener('pointerdown', (event) => {
      if (!this.isPlayerExpanded || isInteractiveTarget(event.target)) {
        return;
      }

      if (event.pointerType === 'mouse' && event.button !== 0) {
        return;
      }

      this.swipeGesture = {
        startX: event.clientX,
        startY: event.clientY,
        currentY: event.clientY,
      };
      page.classList.add('is-dragging-overlay');

      const handleMove = (moveEvent) => {
        if (!this.swipeGesture) {
          return;
        }

        const deltaX = moveEvent.clientX - this.swipeGesture.startX;
        const deltaY = Math.max(0, moveEvent.clientY - this.swipeGesture.startY);
        if (Math.abs(deltaY) <= Math.abs(deltaX)) {
          return;
        }

        this.swipeGesture.currentY = moveEvent.clientY;
        const resisted = computeSwipeResistance(deltaY, window.innerHeight);
        page.style.setProperty('--swipe-offset', `${Math.min(resisted, window.innerHeight * 0.34)}px`);
      };

      const handleUp = () => {
        if (!this.swipeGesture) {
          return;
        }

        const deltaY = Math.max(0, this.swipeGesture.currentY - this.swipeGesture.startY);
        const currentOffset = computeSwipeResistance(deltaY, window.innerHeight);
        this.swipeGesture = null;
        page.classList.remove('is-dragging-overlay');

        if (deltaY > window.innerHeight * 0.3) {
          page.style.setProperty('--swipe-offset', '0px');
          this.closeOverlay();
        } else {
          // Spring snap-back animation
          const spring = new Spring({ stiffness: 120, damping: 18, mass: 1 });
          scheduler.animateMulti('swipe-snapback', {
            springs: { default: spring },
            from: { offset: currentOffset },
            to: { offset: 0 },
            onUpdate: (vals) => {
              page.style.setProperty('--swipe-offset', `${vals.offset}px`);
            },
            onComplete: () => {
              page.style.setProperty('--swipe-offset', '0px');
            },
          });
        }
        window.removeEventListener('pointermove', handleMove);
        window.removeEventListener('pointerup', handleUp);
        window.removeEventListener('pointercancel', handleUp);
      };

      window.addEventListener('pointermove', handleMove);
      window.addEventListener('pointerup', handleUp);
      window.addEventListener('pointercancel', handleUp);
    });
  }

  async renderTrackPage(track) {
    // Skip full re-render if onExpand already set up the overlay with correct data
    if (this._trackPageAlreadyRenderedForId === track.id) {
      console.log('[DOM-LYRICS-DEBUG] renderTrackPage: SKIPPED (already rendered for %s)', track.id);
      this._trackPageAlreadyRenderedForId = null;
      this._preloadedArtworkUrl = null;
      return;
    }
    const title = track.title || track.name;
    const cleanTitle = this._extractCleanTitle(title);
    const artist = track.artist || '';
    const albumName = this._cleanAlbumName(track.album || 'Singles', track.artist);
    const subtitle = `${albumName} • ${this.helpers.formatSize(track.size || 0)}`;
    // Use preloaded artwork from album tile if available (instant display, no network wait)
    const artwork = this._preloadedArtworkUrl || this.helpers.resolvePreviewUrl(track);
    this._preloadedArtworkUrl = null; // consume once
    const renderRoot = this.getOverlayRoot();

    // Fast-path: if page already exists, just update metadata (no flicker)
    const existingPage = renderRoot.querySelector('.music-track-page');
    if (existingPage && this.pageUi?.page) {
      const artEl = renderRoot.querySelector('#musicTrackArtwork');
      const titleEl = renderRoot.querySelector('#mainTrackTitle');
      const titleTrigger = renderRoot.querySelector('#musicTrackTitleTrigger');
      const artistEl = renderRoot.querySelector('#mainTrackArtist');
      const subEl = renderRoot.querySelector('.music-track-subtitle');
      const toastEl = renderRoot.querySelector('#albumToast');
      if (titleEl) {
        titleEl.textContent = cleanTitle;
        titleEl.classList.remove('is-overflowing');
      }
      if (titleTrigger) titleTrigger.textContent = cleanTitle;
      if (artistEl) artistEl.textContent = artist;
      if (subEl) subEl.textContent = subtitle;
      const optimizedArtwork = withImageParams(artwork, 700);
      // Skip if artwork is already showing the correct image (preloaded or same track)
      const currentArtSrc = artEl?.src || '';
      const artworkChanged = artEl && !currentArtSrc.includes(artwork.split('?')[0]) && currentArtSrc !== optimizedArtwork;
      if (artworkChanged) {
        // If the current src is the preloaded album artwork, crossfade to the real track artwork
        // to avoid a visible blink when album cover != track-specific cover
        if (this._artworkIsPreloaded) {
          this._artworkIsPreloaded = false;
          const tempImg = new Image();
          tempImg.onload = () => {
            // Only swap if still the intended artwork (user may have switched tracks)
            if (artEl.dataset.pendingArt === optimizedArtwork) {
              artEl.style.transition = 'opacity 0.2s ease';
              artEl.style.opacity = '0';
              setTimeout(() => {
                artEl.src = optimizedArtwork;
                artEl.style.opacity = '1';
                delete artEl.dataset.pendingArt;
              }, 200);
            }
            const extractedAccent = this.extractColorFromImage(tempImg);
            this.albumAccent = extractedAccent;
            const accent = this.colorEngine.updateThemeFromCover(tempImg) || extractedAccent;
            this.pageUi?.page?.style.setProperty('--music-overlay-accent', accent);
            this.applyVisualizerColorMode();
            this.persistPlayerState({ immediate: true });
            this.updateVisualizerArtworkFocus();
            this._extractAndApplyPalette?.(tempImg);
          };
          artEl.dataset.pendingArt = optimizedArtwork;
          tempImg.src = optimizedArtwork;
        } else {
          artEl.src = optimizedArtwork;
          artEl.addEventListener('load', () => {
            const extractedAccent = this.extractColorFromImage(artEl);
            this.albumAccent = extractedAccent;
            const accent = this.colorEngine.updateThemeFromCover(artEl) || extractedAccent;
            this.pageUi?.page?.style.setProperty('--music-overlay-accent', accent);
            this.applyVisualizerColorMode();
            this.persistPlayerState({ immediate: true });
            this.updateVisualizerArtworkFocus();
            this._extractAndApplyPalette?.(artEl);
          }, { once: true });
        }
      }
      // Trigger album toast
      this._triggerAlbumToast(toastEl, albumName);
      // Skip lyrics reload if already loaded by onExpand early-fetch
      if (this._lyricsAlreadyLoadedForTrackId !== track.id) {
        if (this.lyrics) this.lyrics.setTrack(track);
      }
      this.updateGlobalMetadata(track);
      return;
    }

    renderRoot.innerHTML = `
      <article class="music-track-page music-player-layer" data-content-mode="${this.settings.contentMode}" aria-hidden="false" style="--swipe-offset: 0px;">
        <canvas id="trackVisualizer" class="music-track-canvas" aria-hidden="true"></canvas>
        <div id="mathVisualizerContainer" class="music-track-math-overlay" aria-hidden="true"></div>
        <div id="zenLyricsOverlay" class="zen-lyrics" aria-hidden="true"></div>
        <div id="albumToast" class="album-toast-header">${this.helpers.escapeHtml(albumName)}</div>
        <div class="music-track-glass"></div>
        <div class="music-track-hud">
          <div class="music-track-hud-leading"><button id="playerCollapseBtn" type="button" class="hud-btn hud-btn-chevron" aria-label="Collapse player"><svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="2 5 8 11 14 5"/></svg></button></div>
          <div class="music-track-hud-actions">
            <div class="hud-actions-row hud-row-primary">
              <button id="trackQueueBtn" type="button" class="hud-btn" aria-label="Open queue sheet">${ICONS.menu}</button>
              <button id="trackSettingsBtn" type="button" class="hud-btn" aria-label="Open track settings">${ICONS.gear}</button>
            </div>
            <button id="hudActionsToggle" type="button" class="hud-btn hud-btn-expand${this.settings.hudActionsExpanded ? ' is-expanded' : ''}" aria-label="${this.settings.hudActionsExpanded ? 'Hide actions' : 'Show more actions'}" aria-expanded="${this.settings.hudActionsExpanded ? 'true' : 'false'}"><svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="4 6 8 10 12 6"/></svg></button>
            <div class="hud-actions-collapsible${this.settings.hudActionsExpanded ? ' is-expanded' : ''}" id="hudActionsCollapsible">
              <div class="hud-actions-row hud-row-visual">
                <button id="visualModeBtn" type="button" class="hud-btn focusable" aria-label="Toggle visualizer-only mode">${ICONS.diamond}</button>
                <button id="vizBlurBtn" type="button" class="hud-btn focusable" aria-label="Toggle visualizer blur" aria-pressed="false">${ICONS.contrast}</button>
                <button id="vizDimBtn" type="button" class="hud-btn focusable${this.settings.vizDimEnabled ? ' active' : ''}" aria-label="Toggle dark overlay" aria-pressed="${this.settings.vizDimEnabled ? 'true' : 'false'}"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg><div id="vizDimSliderWrap" class="hud-dim-slider-wrap" style="display:${this.settings.vizDimEnabled ? 'flex' : 'none'}"><input id="vizDimSlider" type="range" min="0" max="90" step="5" value="${Math.round(this.settings.vizDimOpacity * 100)}" class="hud-dim-slider" /><span id="vizDimLabel" class="hud-dim-label">${Math.round(this.settings.vizDimOpacity * 100)}%</span></div></button>
                <button id="vizToggleBtn" type="button" class="hud-btn focusable" aria-label="Toggle visualizer on/off" aria-pressed="true" style="display:none"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg></button>
              </div>
              <div class="hud-actions-row hud-row-text">
                <button id="textToggleBtn" type="button" class="hud-btn focusable${this.settings.textEnabled ? '' : ' text-is-hidden'}" aria-label="Toggle text & lyrics" aria-pressed="${this.settings.textEnabled ? 'true' : 'false'}" title="${this.settings.textEnabled ? 'Hide text & lyrics' : 'Show text & lyrics'}"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="4 7 4 4 20 4 20 7"/><line x1="12" y1="4" x2="12" y2="20"/><line x1="9" y1="20" x2="15" y2="20"/></svg></button>
                <button id="translationToggleBtn" type="button" class="hud-btn focusable${this.settings.showTranslation ? ' active' : ''}" aria-label="Toggle translation" aria-pressed="${this.settings.showTranslation ? 'true' : 'false'}"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10A15.3 15.3 0 0 1 12 2z"/></svg></button>
              </div>
            </div>
          </div>
        </div>
        <div class="music-player-stage">
          <section class="music-player-main">
            <div class="music-track-content" style="width:100%;contain:none">
              <div class="music-immersive-shell">
                <section class="music-immersive-art-panel">
                  <div class="art-sticky-container">
                    <div class="music-track-art-wrap"><img id="musicTrackArtwork" class="music-track-art" src="${withImageParams(artwork, 700)}" alt="${this.helpers.escapeHtml(title)} artwork" fetchpriority="high" decoding="async" /></div>
                    <div class="track-metadata-left">
                      <h1 id="mainTrackTitle" class="track-title-main">${this.helpers.escapeHtml(cleanTitle)}</h1>
                      <p id="mainTrackArtist" class="track-artist-sub">${this.helpers.escapeHtml(artist)}</p>
                    </div>
                  </div>
                  <button id="musicTrackTitleTrigger" type="button" class="music-track-title track-settings-trigger" hidden>${this.helpers.escapeHtml(cleanTitle)}</button>
                </section>
                <section class="music-immersive-lyrics-panel"${this.settings.engineMode === 'premium' ? ' style="display:none"' : ''}>
                  <div id="musicLyricsStage" class="lyrics-container"></div>
                </section>
              </div>
            </div>
            <div class="music-track-controls glass-panel zen-ui-element">
              <div id="trackProgressContainer" class="music-track-progress-row">
                <input id="trackProgress" type="range" min="0" max="1000" step="1" value="0" class="Chromic-slider" aria-label="Track progress" tabindex="-1" />
                <div class="progress-time-labels">
                  <span id="trackCurrentTime">0:00</span>
                  <span id="trackDuration">0:00</span>
                </div>
              </div>
              <div class="music-track-buttons music-track-buttons-primary">
                <button id="trackShuffleBtn" type="button" class="player-control secondary-action" aria-label="Shuffle queue">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 3 21 3 21 8"/><line x1="4" y1="20" x2="21" y2="3"/><polyline points="21 16 21 21 16 21"/><line x1="15" y1="15" x2="21" y2="21"/><line x1="4" y1="4" x2="9" y2="9"/></svg>
                </button>
                <button id="trackPrevBtn" type="button" class="player-control transport-btn" aria-label="Previous track">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><path d="M6 6h2v12H6zm3.5 6l8.5 6V6z"/></svg>
                </button>
                <button id="trackPlayPauseBtn" type="button" class="player-control play-main" aria-label="Play or pause">
                  <svg class="icon-play" width="48" height="48" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5.14v14.72L19 12.5 8 5.14z"/></svg>
                  <svg class="icon-pause" width="48" height="48" viewBox="0 0 24 24" fill="currentColor" style="display:none"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>
                </button>
                <button id="trackNextBtn" type="button" class="player-control transport-btn" aria-label="Next track">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z"/></svg>
                </button>
                <button id="trackRepeatBtn" type="button" class="player-control secondary-action" aria-label="Repeat mode">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="17 1 21 5 17 9"/><path d="M3 11V9a4 4 0 0 1 4-4h14"/><polyline points="7 23 3 19 7 15"/><path d="M21 13v2a4 4 0 0 1-4 4H3"/></svg>
                </button>
              </div>
              <div id="trackVolumeControl" class="music-track-volume-row">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" class="volume-icon"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/></svg>
                <input id="trackVolume" type="range" min="0" max="1" step="0.01" value="${this.settings.volume}" class="Chromic-slider" aria-label="Track volume" tabindex="-1" />
              </div>
            </div>
            <div id="musicTrackWarning" class="music-track-warning" hidden></div>
          </section>
          <section class="up-next-panel music-queue music-queue-sheet" aria-label="Up Next queue">
            <div class="up-next-header"><div><p class="kicker">Queue</p><h2>Up Next</h2></div><div class="up-next-header-actions"><p class="up-next-meta" id="upNextMeta">0 queued</p><button id="clearQueueBtn" type="button" class="player-shuffle">Clear Queue</button><button id="saveQueueBtn" type="button" class="player-shuffle" hidden>Save as Playlist</button><button id="queueCloseBtn" type="button" class="player-shuffle">Done</button></div></div>
            <div id="upNextList" class="up-next-list"></div>
          </section>
          <section class="music-player-settings" aria-label="Track settings view" data-engine="${this.settings.engineMode || 'classic'}">
            <div class="music-settings-header"><div><p class="kicker">Now Playing Settings</p><h3>System Settings</h3></div><button id="settingsBackBtn" type="button" class="overlay-close">Done</button></div>
            <div class="music-settings-groups">
              <section class="music-settings-group is-open" data-settings-group="visualizer">
                <button type="button" class="music-settings-group-toggle" data-settings-section="visualizer" aria-expanded="true"><span class="music-settings-group-title">${ICONS.palette} Visualizer</span><span class="music-settings-group-value">${this.helpers.escapeHtml(formatPresetLabel(this.settings.visualPreset))}</span></button>
                <div class="music-settings-group-body">
                  ${uiSegmented({ id: 'inlineEngineMode', active: this.settings.engineMode || 'classic', options: [{ value: 'classic', label: ICONS.monitor + ' CPU Classic' }, { value: 'premium', label: ICONS.bolt + ' GPU Premium' }] })}
                  <div id="inlinePresetPicker" class="preset-picker" style="${this.settings.engineMode === 'premium' ? 'display:none' : ''}">
                    ${VISUALIZER_PRESETS.map(p => `<button type="button" class="preset-picker-option focusable${this.settings.visualPreset === p ? ' active' : ''}" data-preset-value="${p}" aria-pressed="${this.settings.visualPreset === p ? 'true' : 'false'}"><span>${this.helpers.escapeHtml(formatPresetLabel(p))}</span><span class="preset-picker-check">${this.settings.visualPreset === p ? '✓' : ''}</span></button>`).join('\n                      ')}
                  </div>
                  ${uiRange({ id: 'inlineIntensityRange', label: 'Intensity', min: 0.2, max: 2.4, step: 0.1, value: this.settings.intensity, classes: 'overlay-group classic-only-setting' })}
                  ${uiRange({ id: 'inlineSensitivityRange', label: 'Sensitivity', min: 0.4, max: 2.5, step: 0.1, value: this.settings.sensitivity, classes: 'overlay-group classic-only-setting' })}
                  ${uiRange({ id: 'inlineLavaOpacityRange', label: 'BG Glow Opacity', min: 0, max: 0.5, step: 0.01, value: this.settings.lavaOpacity, classes: 'overlay-group classic-only-setting' })}
                  ${uiRange({ id: 'inlineLavaIntensityRange', label: 'Lava Flow Intensity', min: 0.5, max: 2, step: 0.1, value: this.settings.lavaIntensity, classes: 'overlay-group classic-only-setting' })}
                  ${uiRange({ id: 'inlineParticleDensityRange', label: 'Particle Density', min: 0.2, max: 3, step: 0.1, value: this.settings.particleDensity || 1, classes: 'overlay-group classic-only-setting' })}
                  ${uiRange({ id: 'inlineLavaResolutionRange', label: 'Lava Resolution', min: 256, max: 2160, step: 128, value: this.settings.lavaResolution || 1024, classes: 'overlay-group classic-only-setting' })}
                   ${uiToggleRow({ id: 'inlineVisualEnabledToggle', label: 'Visual Background', checked: this.settings.visualEnabled, classes: 'toggle-row classic-only-setting' })}
                   ${uiToggleRow({ id: 'inlineRetroFilterToggle', label: 'Retro Filter (Scanlines/Grain)', checked: this.settings.retroFilterEnabled, classes: 'toggle-row classic-only-setting' })}
                   ${uiToggleRow({ id: 'inlinePureVisualModeToggle', label: 'Pure Visual Mode', checked: this.settings.uiMode === 'visualizer-only', classes: 'toggle-row' })}
                   <div class="premium-only-setting">${uiSegmented({ id: 'inlineVisualizerColorMode', active: this.settings.visualizerColorMode, options: [{ value: 'auto', label: 'Audio-Reactive' }, { value: 'album', label: 'Album-Driven' }, { value: 'theme', label: 'Theme' }] })}</div>
                  <div class="premium-only-setting">${uiSegmented({ id: 'inlineFpsMax', active: String(this.settings.fpsMax || 30), options: [{ value: '0', label: 'Unlimited' }, { value: '120', label: '120 FPS' }, { value: '60', label: '60 FPS' }, { value: '30', label: '30 FPS' }] })}</div>
                  <div id="inlineGpuScenePicker" class="preset-picker gpu-scene-picker">
                    <div class="gpu-scene-section gpu-scene-core">
                       <button type="button" class="preset-picker-option ${(this.settings.gpuScene || 0) == 0 ? 'active' : ''}" data-gpu-scene="0" aria-pressed="${(this.settings.gpuScene || 0) == 0 ? 'true' : 'false'}"><span>Lava Flow</span><span class="preset-picker-check">${(this.settings.gpuScene || 0) == 0 ? '✓' : ''}</span></button>
                       <button type="button" class="preset-picker-option ${(this.settings.gpuScene || 0) == 7 ? 'active' : ''}" data-gpu-scene="7" aria-pressed="${(this.settings.gpuScene || 0) == 7 ? 'true' : 'false'}"><span>Fractal Infinity</span><span class="preset-picker-check">${(this.settings.gpuScene || 0) == 7 ? '✓' : ''}</span></button>
                       <button type="button" class="preset-picker-option ${(this.settings.gpuScene || 0) == 18 ? 'active' : ''}" data-gpu-scene="18" aria-pressed="${(this.settings.gpuScene || 0) == 18 ? 'true' : 'false'}"><span>Aethelgard</span><span class="preset-picker-check">${(this.settings.gpuScene || 0) == 18 ? '✓' : ''}</span></button>
                       <button type="button" class="preset-picker-option ${(this.settings.gpuScene || 0) == 10 ? 'active' : ''}" data-gpu-scene="10" aria-pressed="${(this.settings.gpuScene || 0) == 10 ? 'true' : 'false'}"><span>Void Archipelago</span><span class="preset-picker-check">${(this.settings.gpuScene || 0) == 10 ? '✓' : ''}</span></button>
                       <button type="button" class="preset-picker-option ${(this.settings.gpuScene || 0) == 14 ? 'active' : ''}" data-gpu-scene="14" aria-pressed="${(this.settings.gpuScene || 0) == 14 ? 'true' : 'false'}"><span>Infinite Cavern</span><span class="preset-picker-check">${(this.settings.gpuScene || 0) == 14 ? '✓' : ''}</span></button>
                       <button type="button" class="preset-picker-option ${(this.settings.gpuScene || 0) == 22 ? 'active' : ''}" data-gpu-scene="22" aria-pressed="${(this.settings.gpuScene || 0) == 22 ? 'true' : 'false'}"><span>Obsidian Void Tunnel</span><span class="preset-picker-check">${(this.settings.gpuScene || 0) == 22 ? '✓' : ''}</span></button>
                       <button type="button" class="preset-picker-option ${(this.settings.gpuScene || 0) == 23 ? 'active' : ''}" data-gpu-scene="23" aria-pressed="${(this.settings.gpuScene || 0) == 23 ? 'true' : 'false'}"><span>Crystalline Drift</span><span class="preset-picker-check">${(this.settings.gpuScene || 0) == 23 ? '✓' : ''}</span></button>
                     </div>
                    <div class="gpu-scene-section gpu-scene-labs">
                       <div class="gpu-labs-header">${ICONS.flask} More Scenes</div>
                       <button type="button" class="preset-picker-option ${(this.settings.gpuScene || 0) == 1 ? 'active' : ''}" data-gpu-scene="1" aria-pressed="${(this.settings.gpuScene || 0) == 1 ? 'true' : 'false'}"><span>Julia Set 4D</span><span class="preset-picker-check">${(this.settings.gpuScene || 0) == 1 ? '✓' : ''}</span></button>
                       <button type="button" class="preset-picker-option ${(this.settings.gpuScene || 0) == 2 ? 'active' : ''}" data-gpu-scene="2" aria-pressed="${(this.settings.gpuScene || 0) == 2 ? 'true' : 'false'}"><span>Lorenz Attractor</span><span class="preset-picker-check">${(this.settings.gpuScene || 0) == 2 ? '✓' : ''}</span></button>
                       <button type="button" class="preset-picker-option ${(this.settings.gpuScene || 0) == 3 ? 'active' : ''}" data-gpu-scene="3" aria-pressed="${(this.settings.gpuScene || 0) == 3 ? 'true' : 'false'}"><span>Riemann Sphere</span><span class="preset-picker-check">${(this.settings.gpuScene || 0) == 3 ? '✓' : ''}</span></button>
                       <button type="button" class="preset-picker-option ${(this.settings.gpuScene || 0) == 4 ? 'active' : ''}" data-gpu-scene="4" aria-pressed="${(this.settings.gpuScene || 0) == 4 ? 'true' : 'false'}"><span>Reaction-Diffusion</span><span class="preset-picker-check">${(this.settings.gpuScene || 0) == 4 ? '✓' : ''}</span></button>
                       <button type="button" class="preset-picker-option ${(this.settings.gpuScene || 0) == 5 ? 'active' : ''}" data-gpu-scene="5" aria-pressed="${(this.settings.gpuScene || 0) == 5 ? 'true' : 'false'}"><span>Hyperbolic Tiling</span><span class="preset-picker-check">${(this.settings.gpuScene || 0) == 5 ? '✓' : ''}</span></button>
                       <button type="button" class="preset-picker-option ${(this.settings.gpuScene || 0) == 6 ? 'active' : ''}" data-gpu-scene="6" aria-pressed="${(this.settings.gpuScene || 0) == 6 ? 'true' : 'false'}"><span>Living Canvas</span><span class="preset-picker-check">${(this.settings.gpuScene || 0) == 6 ? '✓' : ''}</span></button>
                       <button type="button" class="preset-picker-option ${(this.settings.gpuScene || 0) == 8 ? 'active' : ''}" data-gpu-scene="8" aria-pressed="${(this.settings.gpuScene || 0) == 8 ? 'true' : 'false'}"><span>Terrain Biome</span><span class="preset-picker-check">${(this.settings.gpuScene || 0) == 8 ? '✓' : ''}</span></button>
                       <button type="button" class="preset-picker-option ${(this.settings.gpuScene || 0) == 9 ? 'active' : ''}" data-gpu-scene="9" aria-pressed="${(this.settings.gpuScene || 0) == 9 ? 'true' : 'false'}"><span>Biopunk Ocean</span><span class="preset-picker-check">${(this.settings.gpuScene || 0) == 9 ? '✓' : ''}</span></button>
                       <button type="button" class="preset-picker-option ${(this.settings.gpuScene || 0) == 11 ? 'active' : ''}" data-gpu-scene="11" aria-pressed="${(this.settings.gpuScene || 0) == 11 ? 'true' : 'false'}"><span>Saturn Discs</span><span class="preset-picker-check">${(this.settings.gpuScene || 0) == 11 ? '✓' : ''}</span></button>
                       <button type="button" class="preset-picker-option ${(this.settings.gpuScene || 0) == 12 ? 'active' : ''}" data-gpu-scene="12" aria-pressed="${(this.settings.gpuScene || 0) == 12 ? 'true' : 'false'}"><span>Soap Bubbles</span><span class="preset-picker-check">${(this.settings.gpuScene || 0) == 12 ? '✓' : ''}</span></button>
                       <button type="button" class="preset-picker-option ${(this.settings.gpuScene || 0) == 13 ? 'active' : ''}" data-gpu-scene="13" aria-pressed="${(this.settings.gpuScene || 0) == 13 ? 'true' : 'false'}"><span>Fractal Unfold</span><span class="preset-picker-check">${(this.settings.gpuScene || 0) == 13 ? '✓' : ''}</span></button>
                       <button type="button" class="preset-picker-option ${(this.settings.gpuScene || 0) == 15 ? 'active' : ''}" data-gpu-scene="15" aria-pressed="${(this.settings.gpuScene || 0) == 15 ? 'true' : 'false'}"><span>Spongy Tunnel</span><span class="preset-picker-check">${(this.settings.gpuScene || 0) == 15 ? '✓' : ''}</span></button>
                       <button type="button" class="preset-picker-option ${(this.settings.gpuScene || 0) == 16 ? 'active' : ''}" data-gpu-scene="16" aria-pressed="${(this.settings.gpuScene || 0) == 16 ? 'true' : 'false'}"><span>Fractal Optic Fibre</span><span class="preset-picker-check">${(this.settings.gpuScene || 0) == 16 ? '✓' : ''}</span></button>
                       <button type="button" class="preset-picker-option ${(this.settings.gpuScene || 0) == 17 ? 'active' : ''}" data-gpu-scene="17" aria-pressed="${(this.settings.gpuScene || 0) == 17 ? 'true' : 'false'}"><span>Mood Fractal</span><span class="preset-picker-check">${(this.settings.gpuScene || 0) == 17 ? '✓' : ''}</span></button>
                       <button type="button" class="preset-picker-option ${(this.settings.gpuScene || 0) == 19 ? 'active' : ''}" data-gpu-scene="19" aria-pressed="${(this.settings.gpuScene || 0) == 19 ? 'true' : 'false'}"><span>Chromic Birefringence</span><span class="preset-picker-check">${(this.settings.gpuScene || 0) == 19 ? '✓' : ''}</span></button>
                       <button type="button" class="preset-picker-option ${(this.settings.gpuScene || 0) == 20 ? 'active' : ''}" data-gpu-scene="20" aria-pressed="${(this.settings.gpuScene || 0) == 20 ? 'true' : 'false'}"><span>Quantum Entropy</span><span class="preset-picker-check">${(this.settings.gpuScene || 0) == 20 ? '✓' : ''}</span></button>
                       <button type="button" class="preset-picker-option ${(this.settings.gpuScene || 0) == 21 ? 'active' : ''}" data-gpu-scene="21" aria-pressed="${(this.settings.gpuScene || 0) == 21 ? 'true' : 'false'}"><span>Chromic Glitch Vortex</span><span class="preset-picker-check">${(this.settings.gpuScene || 0) == 21 ? '✓' : ''}</span></button>
                       <button type="button" class="preset-picker-option ${(this.settings.gpuScene || 0) == 24 ? 'active' : ''}" data-gpu-scene="24" aria-pressed="${(this.settings.gpuScene || 0) == 24 ? 'true' : 'false'}"><span>Biome Warp</span><span class="preset-picker-check">${(this.settings.gpuScene || 0) == 24 ? '✓' : ''}</span></button>
                    </div>
                   </div>
                </div>
              </section>
               <section class="music-settings-group" data-settings-group="ai-pro">
                 <button type="button" class="music-settings-group-toggle" data-settings-section="ai-pro" aria-expanded="false"><span class="music-settings-group-title">${ICONS.robot} AI & Pro</span><span class="music-settings-group-value">Lyrics Engine</span></button>
                 <div class="music-settings-group-body">
                   <div class="ai-settings-form" id="aiSettingsForm">
                     <p class="ai-settings-desc">Configure AI provider for lyrics sync, transcription, and translation.</p>
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
                        <span class="ollama-status-badge" id="ollamaStatusBadge">${ICONS.hourglass}</span>
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
                         <option value="af">Afrikaans</option>
                         <option value="am">Amharic</option>
                         <option value="ar">Arabic</option>
                         <option value="az">Azerbaijani</option>
                         <option value="be">Belarusian</option>
                         <option value="bg">Bulgarian</option>
                         <option value="bn">Bengali</option>
                         <option value="bs">Bosnian</option>
                         <option value="ca">Catalan</option>
                         <option value="cs">Czech</option>
                         <option value="cy">Welsh</option>
                         <option value="da">Danish</option>
                         <option value="de">German</option>
                         <option value="el">Greek</option>
                         <option value="es">Spanish</option>
                         <option value="et">Estonian</option>
                         <option value="eu">Basque</option>
                         <option value="fa">Persian</option>
                         <option value="fi">Finnish</option>
                         <option value="fr">French</option>
                         <option value="ga">Irish</option>
                         <option value="gl">Galician</option>
                         <option value="gu">Gujarati</option>
                         <option value="ha">Hausa</option>
                         <option value="he">Hebrew</option>
                         <option value="hi">Hindi</option>
                         <option value="hr">Croatian</option>
                         <option value="ht">Haitian Creole</option>
                         <option value="hu">Hungarian</option>
                         <option value="hy">Armenian</option>
                         <option value="id">Indonesian</option>
                         <option value="ig">Igbo</option>
                         <option value="is">Icelandic</option>
                         <option value="it">Italian</option>
                         <option value="ja">Japanese</option>
                         <option value="jv">Javanese</option>
                         <option value="ka">Georgian</option>
                         <option value="kk">Kazakh</option>
                         <option value="km">Khmer</option>
                         <option value="kn">Kannada</option>
                         <option value="ko">Korean</option>
                         <option value="ku">Kurdish</option>
                         <option value="ky">Kyrgyz</option>
                         <option value="la">Latin</option>
                         <option value="lo">Lao</option>
                         <option value="lt">Lithuanian</option>
                         <option value="lv">Latvian</option>
                         <option value="mg">Malagasy</option>
                         <option value="mi">Maori</option>
                         <option value="mk">Macedonian</option>
                         <option value="ml">Malayalam</option>
                         <option value="mn">Mongolian</option>
                         <option value="mr">Marathi</option>
                         <option value="ms">Malay</option>
                         <option value="mt">Maltese</option>
                         <option value="my">Burmese</option>
                         <option value="nb">Norwegian Bokmål</option>
                         <option value="ne">Nepali</option>
                         <option value="nl">Dutch</option>
                         <option value="nn">Norwegian Nynorsk</option>
                         <option value="no">Norwegian</option>
                         <option value="pa">Punjabi</option>
                         <option value="pl">Polish</option>
                         <option value="ps">Pashto</option>
                         <option value="pt">Portuguese</option>
                         <option value="ro">Romanian</option>
                         <option value="ru">Russian</option>
                         <option value="rw">Kinyarwanda</option>
                         <option value="sd">Sindhi</option>
                         <option value="si">Sinhala</option>
                         <option value="sk">Slovak</option>
                         <option value="sl">Slovenian</option>
                         <option value="sn">Shona</option>
                         <option value="so">Somali</option>
                         <option value="sq">Albanian</option>
                         <option value="sr">Serbian</option>
                         <option value="su">Sundanese</option>
                         <option value="sv">Swedish</option>
                         <option value="sw">Swahili</option>
                         <option value="ta">Tamil</option>
                         <option value="te">Telugu</option>
                         <option value="tg">Tajik</option>
                         <option value="th">Thai</option>
                         <option value="tk">Turkmen</option>
                         <option value="tl">Tagalog/Filipino</option>
                         <option value="tr">Turkish</option>
                         <option value="tt">Tatar</option>
                         <option value="ug">Uyghur</option>
                         <option value="ur">Urdu</option>
                         <option value="uz">Uzbek</option>
                         <option value="vi">Vietnamese</option>
                         <option value="xh">Xhosa</option>
                         <option value="yi">Yiddish</option>
                         <option value="yo">Yoruba</option>
                         <option value="zh">Chinese (Simplified)</option>
                         <option value="zh-Hant">Chinese (Traditional)</option>
                         <option value="zu">Zulu</option>
                       </select>
                     </label>
                     <label class="ai-field"><span>Whisper Engine</span>
                       <select name="whisperEngine">
                         <option value="faster">faster-whisper (fast)</option>
                         <option value="whisperx">WhisperX (best quality)</option>
                         <option value="mlx">MLX (Apple Silicon)</option>
                       </select>
                       <small>Cloud LoRA sends audio to Modal A10G GPU for best quality alignment</small>
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
                     <div class="ai-settings-actions">
                       <button type="button" id="aiSettingsSaveBtn" class="expand-fullscreen-btn">Save Settings</button>
                        <button type="button" id="aiSetupPythonBtn" class="expand-fullscreen-btn" style="margin-left:8px">Setup Python</button>
                       <button type="button" id="aiSentimentBtn" class="expand-fullscreen-btn" style="margin-left:8px">${ICONS.paintbrush} Extract Mood Colors</button>
                       <span id="aiSettingsStatus" class="ai-settings-status"></span>
                     </div>
                   </div>
                 </div>
               </section>
            </div>
          </section>
        </div>
      </article>
    `;

    this.pageUi = {
      page: renderRoot.querySelector('.music-track-page'),
      canvas: renderRoot.querySelector('#trackVisualizer'),
      warning: renderRoot.querySelector('#musicTrackWarning'),
      progress: renderRoot.querySelector('#trackProgress'),
      currentTime: renderRoot.querySelector('#trackCurrentTime'),
      duration: renderRoot.querySelector('#trackDuration'),
      localPlay: renderRoot.querySelector('#trackPlayPauseBtn'),
      localShuffle: renderRoot.querySelector('.player-control.secondary-action'),
      localRepeat: renderRoot.querySelector('#trackRepeatBtn'),
      presetLabel: renderRoot.querySelector('#musicTrackPresetLabel'),
      repeatLabel: renderRoot.querySelector('#musicTrackRepeatLabel'),
      settingsBack: renderRoot.querySelector('#settingsBackBtn'),
      presetPicker: renderRoot.querySelector('#inlinePresetPicker'),
      trackContentMode: renderRoot.querySelector('#inlineTrackContentMode'),
      visualizerColorMode: renderRoot.querySelector('#inlineVisualizerColorMode'),
      engineMode: renderRoot.querySelector('#inlineEngineMode'),
      gpuScenePicker: renderRoot.querySelector('#inlineGpuScenePicker'),
      visualEnabledToggle: renderRoot.querySelector('#inlineVisualEnabledToggle'),
      textEnabledToggle: renderRoot.querySelector('#inlineTextEnabledToggle'),
      retroFilterToggle: renderRoot.querySelector('#inlineRetroFilterToggle'),
      pureVisualModeToggle: renderRoot.querySelector('#inlinePureVisualModeToggle'),
      intensityRange: renderRoot.querySelector('#inlineIntensityRange'),
      sensitivityRange: renderRoot.querySelector('#inlineSensitivityRange'),
      lavaOpacityRange: renderRoot.querySelector('#inlineLavaOpacityRange'),
      lavaIntensityRange: renderRoot.querySelector('#inlineLavaIntensityRange'),
      progressContainer: renderRoot.querySelector('#trackProgressContainer'),
      volumeControl: renderRoot.querySelector('#trackVolumeControl'),
      upNextList: renderRoot.querySelector('#upNextList'),
      upNextMeta: renderRoot.querySelector('#upNextMeta'),
      settingsQueuePreview: renderRoot.querySelector('#settingsQueuePreview'),
      settingsSections: Array.from(renderRoot.querySelectorAll('[data-settings-group]')),
      settingsSectionButtons: Array.from(renderRoot.querySelectorAll('[data-settings-section]')),
      queueShuffleToggleBtn: renderRoot.querySelector('#queueShuffleToggleBtn'),
      queueRepeatToggleBtn: renderRoot.querySelector('#queueRepeatToggleBtn'),
      volume: renderRoot.querySelector('#trackVolume'),
    };

    this.pageUi.page?.querySelectorAll('button, input, a').forEach((element) => {
      element.classList.add('focusable');
    });

    // Apply Chromic lerp scroll to scrollable containers
    if (window.initChromicScroll) {
      window.initChromicScroll(this.pageUi.upNextList);
      const settingsGroups = renderRoot.querySelector('.music-settings-groups');
      if (settingsGroups) window.initChromicScroll(settingsGroups);
    }

    // Scrolling inside inner panels (queue, settings) should reset idle timer
    [this.pageUi.upNextList, renderRoot.querySelector('.music-settings-groups')]
      .filter(Boolean)
      .forEach((el) => {
        el.addEventListener('scroll', this.boundIdleActivityHandler, { passive: true });
        el.addEventListener('pointerdown', this.boundIdleActivityHandler, { passive: true });
      });

    this.bindInlineSettingsControls();
    this.bindSwipeToClose();
    this.bindDelegatedPageControls();

    const analyser = await this.audioEngine.getAnalyser();
    this.visualizer?.stop();
    this.visualizer = new VisualizerManager({
      canvas: this.pageUi.canvas,
      analyser,
      preset: this.settings.visualPreset,
      intensity: this.settings.intensity,
      sensitivity: this.settings.sensitivity,
      bgOpacity: this.settings.lavaOpacity,
      bgIntensity: this.settings.lavaIntensity,
    });
    this.visualizer.setEnabled(this.settings.visualEnabled);
    this.visualizer.setBgOpacity(this.settings.lavaOpacity);
    this.visualizer.setBgIntensity(this.settings.lavaIntensity);
    // Only start classic visualizer if NOT in premium GPU mode
    if (this.settings.engineMode !== 'premium') {
      this.visualizer.start();
    }
    this.applyVisualizerColorMode();

    // Math Visualizer (Premium GPU Overlay) — skip if already initialized
    if (!this.mathVisualizer) {
      _dbg('[VIZ-DEBUG] renderTrackPage: calling initMathVisualizer (no existing), _mathVisualizerLoading=%o', this._mathVisualizerLoading);
      this.initMathVisualizer(analyser, renderRoot).then(() => {
        _dbg('[VIZ-DEBUG] renderTrackPage: initMathVisualizer resolved, mathVisualizer=%o _overlayIsOpen=%o', !!this.mathVisualizer, this._overlayIsOpen);
        // Force start if overlay is open (fixes reload/first-open visibility)
        if (this.mathVisualizer && this._overlayIsOpen && this.settings.engineMode === 'premium') {
          _dbg('[VIZ-DEBUG] renderTrackPage: starting mathVisualizer (overlay open=%o expanded=%o)', this._overlayIsOpen, this.isPlayerExpanded);
          // Start low-res if FLIP animation is in progress, otherwise full ignition
          if (this._flipAnimation) {
            this.mathVisualizer.setResolutionScale(0.6);
            this.mathVisualizer.setMaxFps(1);
            this.mathVisualizer.setTimeScale(1.0, 0);
            this.mathVisualizer.start();
            this.mathVisualizer.setUiVisible(true);
            _dbg('[VIZ-DEBUG] renderTrackPage: started low-res during FLIP');
          } else {
            this._runVisualizerIgnition();
          }
          const vizContainer = renderRoot?.querySelector('#mathVisualizerContainer');
          if (vizContainer) vizContainer.style.display = '';
          // Re-apply color mode now that mathVisualizer exists
          this.applyVisualizerColorMode();
        }
      }).catch(e => _dbgWarn('[MathVisualizer] init failed:', e));
    } else if (this.mathVisualizer && this._overlayIsOpen && this.settings.engineMode === 'premium') {
      // Already initialized — ensure it's running and visible
      this.mathVisualizer.start();
      this.mathVisualizer.setUiVisible(true);
      const vizContainer = renderRoot?.querySelector('#mathVisualizerContainer');
      if (vizContainer) vizContainer.style.display = '';
    }
    this._applyFpsLimit();

    this.lyrics?.destroy();
    this.lyrics = new LyricsEngine({
      container: renderRoot.querySelector('#musicLyricsStage'),
      audioElement: this.audioEngine.audioElement,
      analyser: analyser,
      audioEngine: this.audioEngine,
    });

    // In premium/GPU mode, disable DOM lyrics entirely — prevent rAF and DOM rendering
    if (this.settings.engineMode === 'premium') {
      this.lyrics._premiumDisabled = true;
      const origStart = this.lyrics.start.bind(this.lyrics);
      const origSetTrack = this.lyrics.setTrack.bind(this.lyrics);
      this.lyrics.start = () => {}; // no-op — GPU renderer handles lyrics
      this.lyrics.setTrack = (data) => {
        // Store timeline data (needed for GPU lyrics + flow mode) but don't render DOM
        this.lyrics.timeline = data?.enhancedLyrics?.timeline || data?.syncedLyrics || data?.lyrics?.split?.('\n') || [];
        this.lyrics._lastTrackData = data;
        return Promise.resolve();
      };
      this.lyrics._origStart = origStart;
      this.lyrics._origSetTrack = origSetTrack;
    }

    // Connect visualizer mood → lyrics track gamma
    if (this.visualizer) {
      this.lyrics._visualizerRef = this.visualizer;
    }

    // Wire translation edit save callback
    this.lyrics._saveTranslationEdit = () => {
      const track = this.items[this.currentTrackIndex];
      const trackPath = this._getTrackRelativePath(track);
      if (!trackPath || !this.lyrics?._translations?.length) return;
      fetch('/api/lyrics/translation/save', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          trackPath,
          lang: this.settings.translationLang,
          translations: this.lyrics._translations,
        }),
      }).catch(e => _dbgWarn('[Translation Save] Failed:', e));
    };

    // If synced lyrics were already processed by metadata handler, use them directly
    // (renderTrackPage may run AFTER metadata handler on reload)
    // In premium/GPU mode, don't populate DOM lyrics — GPU renderer handles it
    console.log('[DOM-LYRICS-DEBUG] renderTrackPage lyrics section: engineMode=%s hasPendingPayload=%s hasLyricsEngine=%s', this.settings.engineMode, !!this._pendingSyncedLyricsPayload, !!this.lyrics);
    if (this.settings.engineMode === 'premium') {
      // Keep lyrics engine instance for data (metadata, timeline) but don't render DOM
      console.log('[DOM-LYRICS-DEBUG] renderTrackPage: PREMIUM mode — sending null lyrics to engine');
      this.lyrics.setTrack({ ...track, lyrics: null, syncedLyrics: null });
    } else {
    const lyricsTrackData = this._pendingSyncedLyricsPayload || track;
    console.log('[DOM-LYRICS-DEBUG] renderTrackPage: CLASSIC mode — calling setTrack, hasLyrics=%s hasEnhanced=%s', !!lyricsTrackData?.lyrics, !!lyricsTrackData?.enhancedLyrics);
    this.lyrics.setTrack(lyricsTrackData).then(() => {
      if (this.lyrics) {
        this.lyrics._lastNow = -1;
        this.lyrics.activeLineIndex = -1;
        this.lyrics.updateActiveLine?.();
        // If lyrics empty and no payload yet, retry when metadata arrives
        if (!this.lyrics.timeline?.length && !this._pendingSyncedLyricsPayload) {
          _dbg('[lyrics] renderTrackPage: empty timeline, will retry when metadata arrives');
          this._lyricsRetryTimer = setInterval(() => {
            if (this._pendingSyncedLyricsPayload && this.lyrics) {
              clearInterval(this._lyricsRetryTimer);
              this._lyricsRetryTimer = null;
              _dbg('[lyrics] renderTrackPage: retrying setTrack with pending payload');
              this.lyrics.setTrack(this._pendingSyncedLyricsPayload).then(() => {
                if (this.lyrics) {
                  this.lyrics.activeLineIndex = -1;
                  this.lyrics.updateActiveLine?.();
                }
              });
            }
          }, 500);
          // Max 10s
          setTimeout(() => { if (this._lyricsRetryTimer) { clearInterval(this._lyricsRetryTimer); this._lyricsRetryTimer = null; } }, 10000);
        }
      }
    });
    } // end else (classic mode DOM lyrics)
    // Only run lyrics rAF loop when overlay is visible (lyrics are in the fullscreen overlay)
    if (!this._overlayIsOpen) {
      this.lyrics.stop();
    }

    const artworkElement = renderRoot.querySelector('#musicTrackArtwork');
    const extractAndApplyPalette = (img) => {
      try {
        const canvas = document.createElement('canvas');
        const size = 50;
        canvas.width = size;
        canvas.height = size;
        const ctx = canvas.getContext('2d', { willReadFrequently: true });
        if (ctx) {
          ctx.drawImage(img, 0, 0, size, size);
          const { data } = ctx.getImageData(0, 0, size, size);
          const palette = extractPalette(data, 10);
          this._lastPalette = palette;
          this.visualizer?.setPalette?.(palette);
          // Seed dynamic mood gradient from artwork identity
          this._extractIdentity?.(palette);
          // Re-apply color mode now that we have album colors
          // This ensures album-driven mode overrides any theme palette set during early init
          if (this.settings.visualizerColorMode === 'album') {
            this.applyVisualizerColorMode();
          }
        }
      } catch (_) { /* cross-origin */ }
    };
    this._extractAndApplyPalette = extractAndApplyPalette;

    /**
     * Extract identity hues from artwork palette for dynamic mood gradient.
     * Finds the dominant (darkest/most muted → chill) and accent (most saturated → drive) colors.
     */
    const extractIdentityFromPalette = (palette) => {
      if (!palette || palette.length < 2) {
        // No artwork — random base hue, offsets for mood variety
        const randomHue = Math.random() * 360;
        setTrackIdentity(randomHue, (randomHue + 150 + Math.random() * 60) % 360);
        return;
      }
      // Convert each palette color to HSL to find chill (low sat/dark) and drive (high sat/bright)
      const withHsl = palette.map(c => {
        const r = c.r / 255, g = c.g / 255, b = c.b / 255;
        const max = Math.max(r, g, b), min = Math.min(r, g, b);
        const l = (max + min) / 2;
        let h = 0, s = 0;
        if (max !== min) {
          const d = max - min;
          s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
          if (max === r) h = ((g - b) / d + (g < b ? 6 : 0)) * 60;
          else if (max === g) h = ((b - r) / d + 2) * 60;
          else h = ((r - g) / d + 4) * 60;
        }
        return { h, s, l, original: c };
      });
      // Chill = lowest saturation or darkest → dominant background color
      const chill = withHsl.reduce((best, c) => (c.l + c.s * 0.3) < (best.l + best.s * 0.3) ? c : best);
      // Drive = highest saturation → most vibrant accent
      const drive = withHsl.reduce((best, c) => c.s > best.s ? c : best);
      // Ensure at least 120° separation so the gradient has real color variety
      let driveH = drive.h;
      let hDiff = driveH - chill.h;
      if (hDiff > 180) hDiff -= 360;
      if (hDiff < -180) hDiff += 360;
      if (Math.abs(hDiff) <= 120) {
        // Push drive to opposite side of the wheel (180° from chill)
        driveH = (chill.h + 180) % 360;
      }
      setTrackIdentity(chill.h, driveH);
    };
    this._extractIdentity = extractIdentityFromPalette;
    artworkElement?.addEventListener('load', () => {
      const extractedAccent = this.extractColorFromImage(artworkElement);
      this.albumAccent = extractedAccent;
      const accent = this.colorEngine.updateThemeFromCover(artworkElement) || this.albumAccent;
      this.pageUi?.page?.style.setProperty('--music-overlay-accent', accent);
      extractAndApplyPalette(artworkElement);
      this.applyVisualizerColorMode();
      this.updateVisualizerArtworkFocus();
    });
    if (artworkElement?.complete && artworkElement.naturalWidth > 0) {
      const extractedAccent = this.extractColorFromImage(artworkElement);
      this.albumAccent = extractedAccent;
      const accent = this.colorEngine.updateThemeFromCover(artworkElement) || this.albumAccent;
      this.pageUi?.page?.style.setProperty('--music-overlay-accent', accent);
      extractAndApplyPalette(artworkElement);
      this.applyVisualizerColorMode();
      this.updateVisualizerArtworkFocus();
    } else if (artworkElement && !artworkElement.complete) {
      // Image not loaded yet (reload scenario) — wait for it
      artworkElement.decode?.().then(() => {
        extractAndApplyPalette(artworkElement);
        this.albumAccent = this.extractColorFromImage(artworkElement);
        const accent = this.colorEngine.updateThemeFromCover(artworkElement) || this.albumAccent;
        this.pageUi?.page?.style.setProperty('--music-overlay-accent', accent);
        this.applyVisualizerColorMode();
        this.updateVisualizerArtworkFocus();
      }).catch(() => {});
    }
    window.requestAnimationFrame(() => this.updateVisualizerArtworkFocus());

    if (this.isPlayerExpanded) {
      this.bindIdleWatchers();
    } else {
      this.unbindIdleWatchers();
    }

    this.applyPageFlags();
    this.updateProgressUi();
    this._bindVizDimSlider();
    this._applyVizDim();
    this._restoreVizHudStates();
    // Check title overflow for marquee
    const mainTitle = renderRoot.querySelector('#mainTrackTitle');
    if (mainTitle) {
      mainTitle.classList.remove('is-overflowing');
    }
    // Trigger album toast on initial render
    this._triggerAlbumToast(renderRoot.querySelector('#albumToast'), albumName);
    if (this.audioEngine.isPlaying()) {
      this.startProgressLoop();
    }
    this.updatePlayButtons();
    this.updateShuffleButtons();
    this.updateRepeatButtons();
    this.updateQueueUi();
  }

  updateGlobalMetadata(track) {
    if (!track) {
      applyMediaSessionState();
      return;
    }
    const artworkUrl = this.helpers.resolvePreviewUrl(track);
    _dbg('[artwork-debug] updateGlobalMetadata track:', track.title, 'track.previewUrl:', track.previewUrl, '→ resolved artworkUrl:', artworkUrl);
    // Clean title: extract only the song title (last segment after " - ")
    const rawTitle = track.title || track.name || '';
    const cleanTitle = this._extractCleanTitle(rawTitle);
    _dbg('[metadata] raw:', rawTitle, '→ clean:', cleanTitle);
    this.elements.globalPlayerTitle.textContent = cleanTitle;
    // Subtitle: album + year
    const year = track.year ? ` (${track.year})` : '';
    this.elements.globalPlayerSubtitle.textContent = this._cleanAlbumName(track.album || 'Singles', track.artist) + year;
    this.elements.globalPlayerArt.src = artworkUrl;
    // Start global player aurora background + sync accent
    if (this._globalPlayerViz && this._globalPlayerVizEnabled) {
      this._globalPlayerViz.setAccentHex(this.albumAccent || '#78aaff');
      this._globalPlayerViz.start();
    }
    applyMediaSessionState({
      track,
      artworkUrl,
      playbackState: this.audioEngine.isPlaying() ? 'playing' : 'paused',
      handlers: {
        play: () => this.audioEngine.play(),
        pause: () => this.audioEngine.pause(),
        previoustrack: () => this.playPrevious(),
        nexttrack: () => this.playNext({ dueToEnded: false }),
        seekbackward: () => this.seekBySeconds(-15),
        seekforward: () => this.seekBySeconds(15),
        stop: () => this.audioEngine.pause(),
      },
    });
  }

  /**
   * Show album name toast at top of overlay when track changes.
   */
  _triggerAlbumToast(el, albumName) {
    if (!el) return;
    clearTimeout(this._albumToastTimer);
    el.textContent = albumName;
    el.classList.remove('show');
    // Use rAF to batch the class removal and addition across frames (avoids forced reflow)
    requestAnimationFrame(() => {
      el.classList.add('show');
    });
    this._albumToastTimer = setTimeout(() => el.classList.remove('show'), 4000);
  }

    /**
     * Set CSS custom properties for marquee scroll based on actual overflow amount.
     */
    _setMarqueeProps(el) {
    const overflow = el.scrollWidth - el.clientWidth;
    if (overflow <= 0) return;
    // Scroll the full overflow distance + 20px padding
    el.style.setProperty('--marquee-offset', `-${overflow + 20}px`);
    // Scale duration: ~3s base + 40px/s for overflow distance
    const duration = Math.max(6, 3 + overflow / 40);
    el.style.setProperty('--marquee-duration', `${duration.toFixed(1)}s`);
    }

    /**
     * Extract clean song title from metadata string.
     * Handles formats like "Artist - Album - 08 - Title" or "08 - Title" or just "Title".
     */
    _extractCleanTitle(raw) {
    if (!raw) return 'Unknown';

    // Detect if title is user-set (clean): no file extension, no underscores-as-spaces,
    // no leading track numbers with separators, no codec junk. If clean, return as-is.
    const looksLikeFilename = /[_]/.test(raw) ||
      /\.(flac|mp3|wav|m4a|ogg|opus|aac|wma)$/i.test(raw) ||
      /^\d{1,3}\s*[-–—.]\s*/.test(raw) ||
      /\b(FLAC|MP3|AAC|OGG|WAV|DSD|ALAC|OPUS|WMA|SACD)\b/i.test(raw);

    if (!looksLikeFilename) {
      // Title was likely user-set or from clean metadata — return as-is
      return raw;
    }

    // Use same normalization as album table (parseTrackTitle logic)
    let text = raw.replace(/_/g, ' ');
    // Strip file extension
    text = text.replace(/\.(flac|mp3|wav|m4a|ogg|opus|aac|wma)$/i, '');
    // Strip codec/technical junk in brackets
    text = text.replace(/\s?[\(\[\{](?:\d{4}|FLAC|CD|WPCR|PERFECT|OUTERSPACE|C4|seedpool|24bit|96kHz|16bit|44\.1kHz|official|edition|limited|Deluxe|CDEP|MP3|AAC|OGG|WAV|DSD|ALAC|OPUS|WMA|SACD)[^)\]\}]*[\)\]\}]/gi, '');
    // Strip standalone codec words
    text = text.replace(/\b(FLAC|MP3|AAC|OGG|WAV|DSD|ALAC|OPUS|WMA|SACD|PERFECT|OUTERSPACE|CDEP|C4|seedpool)\b/gi, '');

    // Strip leading track number: "01 - Title", "01. Title"
    text = text.replace(/^\d{1,3}\s*[-–—.]\s*/, '').replace(/^\d{1,3}\s+(?=[A-Z])/, '');

    // Strip artist prefix if known
    const track = this.items?.[this.currentTrackIndex];
    const artist = (track?.artist || '').replace(/_/g, ' ').trim();
    if (artist && text.length > artist.length + 1) {
      const escaped = artist.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const reWithSep = new RegExp(`^${escaped}\\s*[-–—]\\s*`, 'i');
      const reWithSpace = new RegExp(`^${escaped}\\s+`, 'i');
      if (reWithSep.test(text)) {
        text = text.replace(reWithSep, '');
      } else if (reWithSpace.test(text)) {
        text = text.replace(reWithSpace, '');
      }
    }

    // Strip album name prefix if known
    const albumRaw = (track?.album || '').replace(/_/g, ' ').trim();
    if (albumRaw) {
      const escapedAlbum = albumRaw.replace(/\s*\(\d{4}\)\s*$/, '').trim().replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const albumPrefixRe = new RegExp(`^${escapedAlbum}\\s*[-–—]\\s*`, 'i');
      text = text.replace(albumPrefixRe, '');
    }

    // Strip remaining track number after album was stripped
    text = text.replace(/^\d{1,4}\s*[-–—.]\s*/, '');

    // Final cleanup: orphaned hyphens, whitespace
    text = text.replace(/\s*-{2,}\s*/g, ' ').replace(/(?:^[\s-]+|[\s-]+$)/g, '').replace(/\s+/g, ' ').trim();

    return text || raw;
  }

  /** Universal metadata normalizer — strips codec/technical junk, replaces underscores, fixes casing */
  _cleanMetadata(text) {
    if (!text) return '';
    let cleaned = text
      .replace(/_/g, ' ')
      .replace(/\s?[\(\[\{](?:\d{4}|FLAC|CD|WPCR|PERFECT|OUTERSPACE|C4|seedpool|24bit|96kHz|16bit|44\.1kHz|official|edition|limited|Deluxe|CDEP|MP3|AAC|OGG|WAV|DSD|ALAC|OPUS|WMA|SACD)[^)\]\}]*[\)\]\}]/gi, '')
      .replace(/\.(flac|mp3|wav|m4a|ogg|opus|aac)$/i, '')
      .replace(/^\d{1,3}[\s\-\.]+/g, '')
      .replace(/\b(FLAC|MP3|AAC|OGG|WAV|DSD|ALAC|OPUS|WMA|SACD|PERFECT|OUTERSPACE|CDEP|C4|seedpool)\b/gi, '')
      .replace(/\b\d{1,2}[_.]?\d{0,2}\s*kHz\b/gi, '')
      .replace(/\b\d{2}\s*Bits?\b/gi, '')
      // Strip standalone 4-digit years
      .replace(/\b(19|20)\d{2}\b/g, '')
      // Strip "Limited Edition", "Deluxe Edition" etc.
      .replace(/\b(Limited|Deluxe|Special|Expanded)\s*(Edition)?\b/gi, '')
      // Clean up orphaned hyphens and multiple hyphens
      .replace(/\s*-{2,}\s*/g, ' ')
      .replace(/(?:^[\s-]+|[\s-]+$)/g, '')
      .replace(/\s*-\s*$/g, '')
      .replace(/^\s*-\s*/g, '')
      .replace(/\s+/g, ' ')
      .trim();
    return cleaned;
  }

  /** Clean album name — strips technical junk AND artist prefix */
  _cleanAlbumName(rawAlbum, artist) {
    let cleaned = this._cleanMetadata(rawAlbum);
    // Strip artist prefix: "Lana Del Rey-Paradise" → "Paradise"
    if (artist) {
      const artistNorm = artist.replace(/_/g, ' ').trim();
      const escaped = artistNorm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const re = new RegExp(`^${escaped}\\s*[-–—]\\s*`, 'i');
      cleaned = cleaned.replace(re, '');
    }
    return cleaned || rawAlbum;
  }

  updatePlayButtons() {
    const isPlaying = this.audioEngine.isPlaying();
    // Toggle SVG icons
    const playBtn = this.elements.playerPlayPauseBtn;
    const iconPlay = playBtn.querySelector('.icon-play');
    const iconPause = playBtn.querySelector('.icon-pause');
    if (iconPlay && iconPause) {
      iconPlay.style.display = isPlaying ? 'none' : 'block';
      iconPause.style.display = isPlaying ? 'block' : 'none';
    } else {
      playBtn.textContent = isPlaying ? '⏸' : '▶';
    }
    if (this.pageUi?.localPlay) {
      const localIconPlay = this.pageUi.localPlay.querySelector('.icon-play');
      const localIconPause = this.pageUi.localPlay.querySelector('.icon-pause');
      if (localIconPlay && localIconPause) {
        localIconPlay.style.display = isPlaying ? 'none' : 'block';
        localIconPause.style.display = isPlaying ? 'block' : 'none';
      } else {
        this.pageUi.localPlay.textContent = isPlaying ? '⏸' : '▶';
      }
    }
    const currentTrack = this.items[this.currentTrackIndex] || null;
    if (currentTrack) {
      applyMediaSessionState({
        track: currentTrack,
        artworkUrl: this.helpers.resolvePreviewUrl(currentTrack),
        playbackState: isPlaying ? 'playing' : 'paused',
        handlers: {
          play: () => this.audioEngine.play(),
          pause: () => this.audioEngine.pause(),
          previoustrack: () => this.playPrevious(),
          nexttrack: () => this.playNext({ dueToEnded: false }),
          seekbackward: () => this.seekBySeconds(-15),
          seekforward: () => this.seekBySeconds(15),
          stop: () => this.audioEngine.pause(),
        },
      });
    }
  }

  updateShuffleButtons() {
    // Global player: use active class
    this.elements.playerShuffleBtn.classList.toggle('active', this.settings.isShuffle);
    // Overlay player: SVG icon — use color/opacity, no text
    if (this.pageUi?.localShuffle) {
      this.pageUi.localShuffle.classList.toggle('active', this.settings.isShuffle);
      this.pageUi.localShuffle.style.color = this.settings.isShuffle ? 'var(--accent, #4a90d9)' : '#fff';
      this.pageUi.localShuffle.style.opacity = this.settings.isShuffle ? '1' : '0.5';
    }
    if (this.pageUi?.queueShuffleToggleBtn) {
      this.pageUi.queueShuffleToggleBtn.classList.toggle('active', this.settings.isShuffle);
    }
  }

  updateRepeatButtons() {
    const isActive = this.repeatMode !== 'off';
    const isOne = this.repeatMode === 'one';
    const btn = this.elements.playerRepeatBtn;
    btn.classList.toggle('active', isActive);
    btn.classList.toggle('repeat-one', isOne);
    btn.setAttribute('aria-label', isOne ? 'Repeat one' : isActive ? 'Repeat all' : 'Repeat off');
    // Swap SVG icons
    const iconAll = btn.querySelector('.icon-repeat-all');
    const iconOne = btn.querySelector('.icon-repeat-one');
    if (iconAll && iconOne) {
      iconAll.style.display = isOne ? 'none' : 'block';
      iconOne.style.display = isOne ? 'block' : 'none';
    }
    if (this.pageUi?.localRepeat) {
      this.pageUi.localRepeat.classList.toggle('active', isActive);
      this.pageUi.localRepeat.style.color = isActive ? 'var(--accent, #4a90d9)' : '#fff';
      this.pageUi.localRepeat.style.opacity = isActive ? '1' : '0.5';
    }
    if (this.pageUi?.queueRepeatToggleBtn) {
      this.pageUi.queueRepeatToggleBtn.classList.toggle('active', isActive);
    }
  }

  updateQueueUi() {
    const upcomingTracks = this.getUpcomingTracks();
    if (this.pageUi?.upNextMeta) {
      this.pageUi.upNextMeta.textContent = `${upcomingTracks.length} queued`;
    }

    // Update settings queue group value too
    const queueGroupValue = this.getOverlayRoot()?.querySelector('[data-settings-section="queue"] .music-settings-group-value');
    if (queueGroupValue) queueGroupValue.textContent = `${upcomingTracks.length} tracks`;

    const BATCH = 60; // render in batches for 120fps
    const renderItems = (tracks, limit) => tracks.length
      ? tracks.slice(0, limit).map((track) => `<button type="button" class="up-next-item focusable" draggable="true" data-up-next-id="${track.id}"><span class="up-next-item-title">${this.helpers.escapeHtml(this._extractCleanTitle(track.title || track.name))}</span><span class="up-next-item-meta">${this.helpers.escapeHtml(this._cleanMetadata(track.album || 'Singles'))}</span></button>`).join('')
      : '<p class="up-next-empty">No upcoming tracks yet.</p>';

    const setupLazyScroll = (container, tracks) => {
      if (!container || !tracks.length) return;
      let rendered = Math.min(BATCH, tracks.length);
      container.innerHTML = renderItems(tracks, rendered);
      // Remove old listener
      if (container._queueScrollHandler) {
        container.removeEventListener('scroll', container._queueScrollHandler);
      }
      if (rendered < tracks.length) {
        container._queueScrollHandler = () => {
          if (rendered >= tracks.length) return;
          const { scrollTop, scrollHeight, clientHeight } = container;
          if (scrollTop + clientHeight >= scrollHeight - 200) {
            const nextBatch = Math.min(rendered + BATCH, tracks.length);
            const fragment = document.createDocumentFragment();
            const temp = document.createElement('div');
            temp.innerHTML = renderItems(tracks.slice(rendered, nextBatch), nextBatch - rendered);
            while (temp.firstChild) fragment.appendChild(temp.firstChild);
            container.appendChild(fragment);
            rendered = nextBatch;
            if (rendered >= tracks.length) {
              container.removeEventListener('scroll', container._queueScrollHandler);
            }
          }
        };
        container.addEventListener('scroll', container._queueScrollHandler, { passive: true });
      }
    };

    setupLazyScroll(this.pageUi?.upNextList, upcomingTracks);
    setupLazyScroll(this.pageUi?.settingsQueuePreview, upcomingTracks);

    // Drag-and-drop reordering for up-next queue
    this._setupQueueDragDrop(this.pageUi?.upNextList, upcomingTracks);
    this._setupQueueDragDrop(this.pageUi?.settingsQueuePreview, upcomingTracks);
  }

  updateProgressUi() {
    const duration = this.audioEngine.getDuration();
    const current = this.audioEngine.getCurrentTime();
    const ratio = Number.isFinite(duration) && duration > 0 ? current / duration : 0;

    // Update global player progress bar — skip when overlay is open (not visible, saves DOM mutations)
    if (!this._overlayIsOpen) {
      if (this._globalProgressBar) {
        this._globalProgressBar.setProgress(ratio);
      } else {
        const globalFill = document.getElementById('globalPlayerProgressFill');
        if (globalFill) {
          globalFill.style.width = `${(ratio * 100).toFixed(2)}%`;
        }
      }
    }

    if (!this.pageUi?.progress || !this.pageUi.currentTime || !this.pageUi.duration) {
      return;
    }

    this.pageUi.progress.value = String(Math.round(ratio * 1000));
    this.pageUi.currentTime.textContent = formatTime(current);
    this.pageUi.duration.textContent = formatTime(duration);
    }

    _setupQueueDragDrop(container, tracks) {
    if (!container || !tracks.length) return;
    if (container._dragCleanup) container._dragCleanup();

    let draggedEl = null;
    let draggedId = null;
    let placeholder = null;
    let dropHandled = false;

    const getItemEl = (el) => el?.closest?.('.up-next-item');

    const onDragStart = (e) => {
      const item = getItemEl(e.target);
      if (!item) return;
      draggedEl = item;
      draggedId = item.dataset.upNextId;
      dropHandled = false;
      item.classList.add('is-dragging');
      e.dataTransfer.effectAllowed = 'move';
      e.dataTransfer.setData('text/plain', draggedId);
      // Glass-style drag ghost
      const ghost = item.cloneNode(true);
      ghost.classList.remove('is-dragging');
      ghost.style.cssText = `position:fixed;top:-1000px;left:-1000px;pointer-events:none;width:${item.offsetWidth}px;opacity:0.92;backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);background:color-mix(in srgb, var(--accent, #5e9eff) 20%, rgba(20,25,40,0.85));border:1px solid color-mix(in srgb, var(--accent, #5e9eff) 50%, transparent);border-radius:14px;box-shadow:0 8px 32px rgba(0,0,0,0.4);transform:scale(1.04);z-index:999999;padding:10px 12px;`;
      document.body.appendChild(ghost);
      e.dataTransfer.setDragImage(ghost, ghost.offsetWidth / 2, 20);
      requestAnimationFrame(() => ghost.remove());
    };

    const onDragOver = (e) => {
      e.preventDefault();
      e.dataTransfer.dropEffect = 'move';
      const item = getItemEl(e.target);
      if (!item || item === draggedEl) return;
      container.querySelectorAll('.is-drag-target').forEach(el => el.classList.remove('is-drag-target'));
      const rect = item.getBoundingClientRect();
      const insertBefore = e.clientY < rect.top + rect.height / 2;
      if (!placeholder) {
        placeholder = document.createElement('div');
        placeholder.className = 'up-next-drag-placeholder';
        placeholder.style.cssText = 'height:4px;border-radius:4px;background:var(--accent, #5e9eff);margin:4px 0;opacity:0.8;transition:all 0.15s ease;';
      }
      if (insertBefore) {
        item.parentNode.insertBefore(placeholder, item);
      } else {
        item.parentNode.insertBefore(placeholder, item.nextSibling);
      }
      item.classList.add('is-drag-target');
    };

    const onDragLeave = (e) => {
      const item = getItemEl(e.target);
      if (item) item.classList.remove('is-drag-target');
    };

    const onDrop = (e) => {
      e.preventDefault();
      container.querySelectorAll('.is-drag-target').forEach(el => el.classList.remove('is-drag-target'));
      if (!draggedId) return;
      // Find target: might be an item, or the placeholder, or the container gap
      let targetItem = getItemEl(e.target);
      let insertBefore = true;
      if (!targetItem && placeholder && placeholder.parentNode) {
        // Dropped on placeholder — find the adjacent item
        const next = placeholder.nextElementSibling;
        const prev = placeholder.previousElementSibling;
        if (next && next.classList.contains('up-next-item') && next !== draggedEl) {
          targetItem = next;
          insertBefore = true;
        } else if (prev && prev.classList.contains('up-next-item') && prev !== draggedEl) {
          targetItem = prev;
          insertBefore = false;
        }
      }
      if (placeholder && placeholder.parentNode) placeholder.remove();
      if (!draggedEl || !targetItem || targetItem === draggedEl) return;
      const targetId = targetItem.dataset.upNextId;
      if (!draggedId || !targetId) return;
      if (!insertBefore) {
        // Already determined from placeholder position
      } else {
        const rect = targetItem.getBoundingClientRect();
        insertBefore = e.clientY < rect.top + rect.height / 2;
      }
      // Use the proper queue reorder that handles both normal and shuffled queues
      const activeQueue = [...this.getActiveQueueIds()];
      const fromIdx = activeQueue.indexOf(draggedId);
      const toIdx = activeQueue.indexOf(targetId);
      if (fromIdx === -1 || toIdx === -1) return;
      // Remove dragged item and re-insert at the correct position
      activeQueue.splice(fromIdx, 1);
      const newToIdx = activeQueue.indexOf(targetId);
      if (newToIdx === -1) return;
      if (insertBefore) {
        activeQueue.splice(newToIdx, 0, draggedId);
      } else {
        activeQueue.splice(newToIdx + 1, 0, draggedId);
      }
      // Persist the reordered queue to the correct array
      if (this.settings.isShuffle) {
        this.shuffledQueueIds = activeQueue;
      } else {
        this.queueTrackIds = activeQueue;
      }
      this.persistPlayerState({ immediate: true });
      // Clear drag state before re-render to avoid stale refs
      if (draggedEl) draggedEl.classList.remove('is-dragging');
      draggedEl = null;
      draggedId = null;
      placeholder = null;
      dropHandled = true;
      // Defer UI update to after browser finishes drag lifecycle
      setTimeout(() => this.updateQueueUi(), 0);
    };

    const onDragEnd = () => {
      if (draggedEl) draggedEl.classList.remove('is-dragging');
      container.querySelectorAll('.is-drag-target').forEach(el => el.classList.remove('is-drag-target'));
      if (placeholder && placeholder.parentNode) placeholder.remove();
      const needsRender = !dropHandled;
      draggedEl = null;
      draggedId = null;
      placeholder = null;
      dropHandled = false;
      if (needsRender) this.updateQueueUi();
    };

    container.addEventListener('dragstart', onDragStart);
    container.addEventListener('dragover', onDragOver);
    container.addEventListener('dragleave', onDragLeave);
    container.addEventListener('drop', onDrop);
    container.addEventListener('dragend', onDragEnd);

    container._dragCleanup = () => {
      container.removeEventListener('dragstart', onDragStart);
      container.removeEventListener('dragover', onDragOver);
      container.removeEventListener('dragleave', onDragLeave);
      container.removeEventListener('drop', onDrop);
      container.removeEventListener('dragend', onDragEnd);
    };
    }

    _enableFocusTrap() {
      const overlayHost = document.getElementById('musicOverlayHost');
      if (!overlayHost) return;
      _dbg('[FocusTrap] enabling, overlayHost children:', overlayHost.children.length);
      // 1. Mark all siblings of the overlay as inert so Tab cannot reach them
      this._inertElements = [];
      for (const child of document.body.children) {
        if (child === overlayHost || child.id === 'musicOverlayHost') continue;
        if (!child.inert) {
          child.inert = true;
          this._inertElements.push(child);
        }
      }
      _dbg('[FocusTrap] marked %d siblings as inert', this._inertElements.length);

      // 2. Intercept Tab key directly to wrap focus within overlay
      const focusableSelector = 'button:not([hidden]):not([disabled]):not([style*="display: none"]):not([style*="display:none"]), [tabindex]:not([tabindex="-1"]):not([hidden]):not([style*="display: none"]):not([style*="display:none"]), a[href]:not([hidden]), input:not([hidden]):not([disabled]), select:not([hidden]):not([disabled]), textarea:not([hidden]):not([disabled])';
      const getFocusables = () => {
        const all = overlayHost.querySelectorAll(focusableSelector);
        return Array.from(all).filter(el => {
          if (el.offsetParent === null && getComputedStyle(el).position !== 'fixed') return false;
          if (el.closest('[hidden], [inert], [style*="display: none"], [style*="display:none"]')) return false;
          return true;
        });
      };

      this._tabTrapHandler = (e) => {
        if (e.key !== 'Tab' || !this._overlayIsOpen) return;
        const focusables = getFocusables();
        _dbg('[FocusTrap] Tab pressed, focusables:', focusables.length, 'shift:', e.shiftKey, 'activeEl:', document.activeElement?.tagName, document.activeElement?.className?.slice?.(0, 40));
        if (!focusables.length) return;

        const first = focusables[0];
        const last = focusables[focusables.length - 1];

        if (e.shiftKey) {
          // Shift+Tab: if on first element, wrap to last
          if (document.activeElement === first || !overlayHost.contains(document.activeElement)) {
            e.preventDefault();
            last.focus();
            _dbg('[FocusTrap] wrapped to last:', last.tagName, last.className?.slice?.(0, 40));
          }
        } else {
          // Tab: if on last element, wrap to first
          if (document.activeElement === last || !overlayHost.contains(document.activeElement)) {
            e.preventDefault();
            first.focus();
            _dbg('[FocusTrap] wrapped to first:', first.tagName, first.className?.slice?.(0, 40));
          }
        }
      };
      document.addEventListener('keydown', this._tabTrapHandler, true);

      // 3. Catch any focus that escapes (e.g. browser chrome, iframes) and redirect it back
      this._focusGuardHandler = (e) => {
        if (!this._overlayIsOpen) return;
        if (!overlayHost.contains(e.target)) {
          _dbg('[FocusTrap] focus escaped to:', e.target.tagName, e.target.id, e.target.className?.slice?.(0, 40));
          e.stopPropagation();
          const focusables = getFocusables();
          if (focusables.length) focusables[0].focus();
        }
      };
      document.addEventListener('focusin', this._focusGuardHandler, true);
      // 4. Prevent page scroll shift by locking body scroll position
      this._savedScrollX = window.scrollX;
      this._savedScrollY = window.scrollY;
      this._scrollLockHandler = () => {
        if (this._overlayIsOpen) {
          window.scrollTo(this._savedScrollX, this._savedScrollY);
        }
      };
      window.addEventListener('scroll', this._scrollLockHandler, { passive: false });
    }

    _disableFocusTrap() {
      if (this._inertElements) {
        for (const el of this._inertElements) {
          el.inert = false;
        }
        this._inertElements = null;
      }
      if (this._tabTrapHandler) {
        document.removeEventListener('keydown', this._tabTrapHandler, true);
        this._tabTrapHandler = null;
      }
      if (this._focusGuardHandler) {
        document.removeEventListener('focusin', this._focusGuardHandler, true);
        this._focusGuardHandler = null;
      }
      if (this._scrollLockHandler) {
        window.removeEventListener('scroll', this._scrollLockHandler);
        this._scrollLockHandler = null;
      }
    }

    applyPageFlags() {
    const isMusicSection = this.store.getState().activeType === 'music';
    const hasTrack = this.active && this.currentTrackIndex >= 0;
    if (this.elements.globalMusicPlayer) {
      const showPlayer = hasTrack;
      this.elements.globalMusicPlayer.classList.toggle('is-idle', !showPlayer);
      this.elements.globalMusicPlayer.style.display = '';
    }

    const page = this.pageUi?.page;
    if (!page) {
      return;
    }

    const showOverlay = this.isPlayerExpanded;

    // Read scroll position BEFORE any DOM mutations to avoid forced reflow
    const currentScrollY = window.scrollY;

    page.classList.toggle('is-expanded', showOverlay);
    // Don't add is-collapsed during close animation — CSS transform would override spring
    page.classList.toggle('is-collapsed', !showOverlay && !this._isCloseAnimating);
    page.classList.toggle('show-settings', this.isSettingsView);
    page.classList.toggle('visuals-off', !this.settings.visualEnabled);
    page.classList.toggle('text-off', !this.settings.textEnabled);
    page.classList.toggle('retro-filter', this.settings.retroFilterEnabled);
    page.classList.toggle('mode-visualizer-only', this.settings.uiMode === 'visualizer-only');
    // Notify GPU visualizer of UI visibility state
    const isZen = this.settings.uiMode === 'visualizer-only' || this.isScreenSaverIdle;
    const isInfoMode = this.settings.contentMode === 'info';
    document.dispatchEvent(new CustomEvent('uiToggle', { detail: { visible: !isZen || isInfoMode } }));
    page.classList.toggle('is-idle', this.isScreenSaverIdle);
    page.classList.toggle('show-queue', this.isQueueSheetOpen);
    page.classList.toggle('queue-active', this.isQueueSheetOpen);
    // Toggle active state on queue button
    const queueBtn = this.getOverlayRoot()?.querySelector('#trackQueueBtn');
    if (queueBtn) {
      queueBtn.classList.toggle('active', this.isQueueSheetOpen);
      queueBtn.style.color = this.isQueueSheetOpen ? 'var(--accent, #4a90d9)' : '';
      queueBtn.style.opacity = this.isQueueSheetOpen ? '1' : '';
    }
    const settingsBtn = this.getOverlayRoot()?.querySelector('#trackSettingsBtn');
    if (settingsBtn) {
      settingsBtn.classList.toggle('active', this.isSettingsView);
      settingsBtn.setAttribute('aria-expanded', String(this.isSettingsView));
    }
    page.setAttribute('aria-hidden', showOverlay ? 'false' : 'true');
    page.setAttribute('data-content-mode', this.settings.contentMode);
    document.body.classList.toggle('player-open', showOverlay);
    // Don't remove music-overlay-open during close animation — it hides the global player bar
    if (!this._isCloseAnimating) {
      if (showOverlay && !document.body.classList.contains('music-overlay-open')) {
        // Save scroll position before locking (read was done above to avoid reflow)
        _dbg('[scroll-lock] LOCKING: scrollY=%d innerWidth=%d clientWidth=%d sbWidth=%d', currentScrollY, window.innerWidth, document.documentElement.clientWidth, window.innerWidth - document.documentElement.clientWidth);
        document.body.style.setProperty('--scroll-y', `${currentScrollY}px`);
        this._showFakeScrollbar(currentScrollY);
      }
      document.body.classList.toggle('music-overlay-open', showOverlay);
      if (!showOverlay) {
        _dbg('[scroll-lock] UNLOCKING: restoring scrollY=%s', document.body.style.getPropertyValue('--scroll-y'));
        this._removeFakeScrollbar();
        // Restore scroll position after unlocking
        const scrollY = parseInt(document.body.style.getPropertyValue('--scroll-y') || '0');
        document.body.style.removeProperty('--scroll-y');
        window.scrollTo(0, scrollY);
      }
    }
    // Don't hide overlay host during close animation — spring needs it visible
    if (!this._isCloseAnimating) {
      syncOverlayHostState(this.overlayHost, showOverlay);
    }
    this.visualizer?.setEnabled(this.settings.visualEnabled && showOverlay);
    if (this.pageUi?.progressContainer) {
      this.pageUi.progressContainer.style.display = '';
    }
    if (this.pageUi?.volumeControl) {
      this.pageUi.volumeControl.style.display = 'grid';
    }
    if (this.pageUi?.presetLabel) {
      this.pageUi.presetLabel.textContent = formatPresetLabel(this.settings.visualPreset);
    }
    this.updateVisualizerArtworkFocus();
    this.syncInlineSettingsControls();
    this.updateRepeatButtons();
    this.updateQueueUi();
  }

  isSettingsPanelOpen() {
    const pageHasSettings = !!this.pageUi?.page?.classList.contains('show-settings');
    const settingsBtnExpanded = this.getOverlayRoot()?.querySelector('#trackSettingsBtn')?.getAttribute('aria-expanded') === 'true';
    const settingsPanel = this.getOverlayRoot()?.querySelector('.music-player-settings');
    let settingsPanelVisible = false;
    if (settingsPanel && typeof window !== 'undefined' && typeof window.getComputedStyle === 'function') {
      const style = window.getComputedStyle(settingsPanel);
      settingsPanelVisible = style.visibility !== 'hidden' && style.pointerEvents !== 'none' && Number(style.opacity || '0') > 0.01;
    }
    return !!(this.isSettingsView || this._settingsEscGuard || pageHasSettings || settingsBtnExpanded || settingsPanelVisible);
  }

  syncInlineSettingsControls() {
    if (!this.pageUi) return;
    // Sync segmented controls
    const syncSegmented = (el, activeValue) => {
      if (!el) return;
      el.querySelectorAll('button[data-value]').forEach((btn) => {
        const isActive = btn.dataset.value === String(activeValue);
        btn.classList.toggle('active', isActive);
        btn.setAttribute('aria-pressed', String(isActive));
      });
    };
    syncSegmented(this.pageUi.trackContentMode, this.settings.contentMode);
    syncSegmented(this.pageUi.visualizerColorMode, this.settings.visualizerColorMode);
    syncSegmented(this.pageUi.engineMode, this.settings.engineMode || 'classic');
    // GPU scene picker uses data-gpu-scene, not data-value — sync manually
    if (this.pageUi.gpuScenePicker) {
      this.pageUi.gpuScenePicker.querySelectorAll('button[data-gpu-scene]').forEach((btn) => {
        const isActive = Number(btn.dataset.gpuScene) === Number(this.settings.gpuScene);
        btn.classList.toggle('active', isActive);
        btn.setAttribute('aria-pressed', String(isActive));
        const check = btn.querySelector('.preset-picker-check');
        if (check) check.textContent = isActive ? '✓' : '';
      });
    }
    const fpsEl = this.pageUi.page?.querySelector('#inlineFpsMax');
    syncSegmented(fpsEl, String(this.settings.fpsMax || 30));

    // Sync toggles
    const syncToggle = (el, checked) => { if (el) el.checked = !!checked; };
    syncToggle(this.pageUi.visualEnabledToggle, this.settings.visualEnabled);
    syncToggle(this.pageUi.textEnabledToggle, this.settings.textEnabled);
    syncToggle(this.pageUi.retroFilterToggle, this.settings.retroFilterEnabled);
    syncToggle(this.pageUi.pureVisualModeToggle, this.settings.uiMode === 'visualizer-only');

    // Sync ranges
    const syncRange = (el, value) => { if (el) el.value = value; };
    syncRange(this.pageUi.intensityRange, this.settings.intensity);
    syncRange(this.pageUi.sensitivityRange, this.settings.sensitivity);
    syncRange(this.pageUi.lavaOpacityRange, this.settings.lavaOpacity);
    syncRange(this.pageUi.lavaIntensityRange, this.settings.lavaIntensity);

    // Show/hide GPU scene picker based on engine mode
    if (this.pageUi.gpuScenePicker) {
      this.pageUi.gpuScenePicker.style.display = this.settings.engineMode === 'premium' ? '' : 'none';
    }
    // Show/hide CPU preset picker based on engine mode
    if (this.pageUi.presetPicker) {
      this.pageUi.presetPicker.style.display = this.settings.engineMode === 'premium' ? 'none' : '';
    }
  }

  setTrackWarning(message) {
    if (!this.pageUi?.warning) {
      return;
    }

    if (message) {
      this.pageUi.warning.hidden = false;
      this.pageUi.warning.textContent = message;
      return;
    }

    this.pageUi.warning.hidden = true;
    this.pageUi.warning.textContent = '';
  }

  updateVisualizerArtworkFocus() {
    if (this._artworkFocusRaf) return;
    this._artworkFocusRaf = requestAnimationFrame(() => {
      this._artworkFocusRaf = null;
      const canvas = this.pageUi?.canvas;
      const artwork = this.pageUi?.page?.querySelector('#musicTrackArtwork');
      if (!canvas || !artwork || !this.visualizer) {
        return;
      }

      const canvasRect = canvas.getBoundingClientRect();
      const artRect = artwork.getBoundingClientRect();
      if (!canvasRect.width || !canvasRect.height || !artRect.width || !artRect.height) {
        return;
      }

      const centerX = (artRect.left + artRect.width * 0.5 - canvasRect.left) / canvasRect.width;
      const centerY = (artRect.top + artRect.height * 0.5 - canvasRect.top) / canvasRect.height;
      this.visualizer.setArtworkFocus({ x: centerX, y: centerY });
    });
  }

  // ── Model Download Glassy Overlay ──────────────────────────────────────────

  _showModelDownloadOverlay(label) {
    if (this._modelDownloadOverlay) {
      const txt = this._modelDownloadOverlay.querySelector('.mdl-dl-text');
      if (txt) txt.textContent = label || 'Downloading AI model…';
      return;
    }
    const el = document.createElement('div');
    el.className = 'chromic-model-download-overlay';
    el.innerHTML = `
      <div class="mdl-dl-glass">
        <div class="mdl-dl-spinner"></div>
        <div class="mdl-dl-title">Initializing AI Engine</div>
        <div class="mdl-dl-text">${label || 'Downloading neural models (~500MB)…'}</div>
        <div class="mdl-dl-hint">This happens only once. Please ensure a stable internet connection.</div>
        <button class="mdl-dl-close" title="Dismiss (download continues in background)">✕</button>
      </div>
    `;
    el.querySelector('.mdl-dl-close')?.addEventListener('click', () => this._hideModelDownloadOverlay());
    // Click backdrop (outside glass) to dismiss
    el.addEventListener('click', (e) => { if (e.target === el) this._hideModelDownloadOverlay(); });
    // Inject styles if not already
    if (!document.getElementById('mdl-dl-styles')) {
      const style = document.createElement('style');
      style.id = 'mdl-dl-styles';
      style.textContent = `
        .chromic-model-download-overlay {
          position: fixed; inset: 0; z-index: 99999;
          display: flex; align-items: center; justify-content: center;
          background: color-mix(in srgb, var(--bg-main, #000) 70%, transparent);
          backdrop-filter: blur(24px) saturate(1.3);
          -webkit-backdrop-filter: blur(24px) saturate(1.3);
          animation: mdl-dl-fadein 0.3s ease;
        }
        @keyframes mdl-dl-fadein { from { opacity: 0; } to { opacity: 1; } }
        @keyframes mdl-dl-fadeout { from { opacity: 1; } to { opacity: 0; } }
        .mdl-dl-glass {
          position: relative;
          background: var(--glass-tint, rgba(30,30,30,0.95));
          border: 1px solid color-mix(in srgb, var(--accent, #5e9eff) 15%, rgba(255,255,255,0.08));
          border-radius: 20px;
          padding: 40px 48px;
          text-align: center;
          box-shadow:
            0 24px 80px rgba(0,0,0,0.5),
            inset 0 0 30px 0 color-mix(in srgb, var(--accent, #5e9eff) 5%, transparent),
            0 0 1px 0 color-mix(in srgb, var(--accent, #5e9eff) 20%, transparent);
          min-width: 320px;
        }
        .mdl-dl-spinner {
          width: 48px; height: 48px; margin: 0 auto 20px;
          border: 3px solid color-mix(in srgb, var(--accent, #5e9eff) 15%, rgba(255,255,255,0.1));
          border-top-color: var(--accent, #5e9eff);
          border-radius: 50%;
          animation: mdl-dl-spin 0.8s linear infinite;
        }
        @keyframes mdl-dl-spin { to { transform: rotate(360deg); } }
        .mdl-dl-title {
          font-size: 18px; font-weight: 600;
          color: var(--text-high-contrast, #fff);
          margin-bottom: 8px; letter-spacing: 0.3px;
        }
        .mdl-dl-text {
          font-size: 14px;
          color: var(--muted, rgba(255,255,255,0.7));
          margin-bottom: 12px;
        }
        .mdl-dl-hint {
          font-size: 11px;
          color: color-mix(in srgb, var(--accent, #5e9eff) 40%, var(--muted, rgba(255,255,255,0.4)));
          font-style: italic;
        }
        .mdl-dl-close {
          position: absolute; top: 12px; right: 16px;
          background: color-mix(in srgb, var(--accent, #5e9eff) 10%, rgba(255,255,255,0.06));
          border: 1px solid color-mix(in srgb, var(--accent, #5e9eff) 12%, rgba(255,255,255,0.1));
          color: var(--muted, rgba(255,255,255,0.6)); font-size: 16px; width: 32px; height: 32px;
          border-radius: 50%; cursor: pointer; display: flex; align-items: center; justify-content: center;
          transition: background 0.2s, color 0.2s;
        }
        .mdl-dl-close:hover {
          background: color-mix(in srgb, var(--accent, #5e9eff) 25%, rgba(255,255,255,0.1));
          color: var(--text-high-contrast, #fff);
        }
      `;
      document.head.appendChild(style);
    }
    document.body.appendChild(el);
    this._modelDownloadOverlay = el;
  }

  _hideModelDownloadOverlay() {
    if (!this._modelDownloadOverlay) return;
    const el = this._modelDownloadOverlay;
    el.style.animation = 'mdl-dl-fadeout 0.3s ease forwards';
    setTimeout(() => el.remove(), 300);
    this._modelDownloadOverlay = null;
  }

  getOverlayRoot() {
    this.overlayHost = ensureOverlayHostOnBody(this.overlayHost);
    if (!this.overlayHost.classList.contains('is-active') && !this.overlayHost.classList.contains('is-expanded')) {
      syncOverlayHostState(this.overlayHost, false);
    }
    return this.overlayHost;
  }
}
