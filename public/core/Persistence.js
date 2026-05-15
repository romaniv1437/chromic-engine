export const PERSISTENCE_KEY = 'chromic_app_state';
export const PLAYLISTS_KEY = 'chromic_saved_playlists';

const safeStorage = (storage = globalThis?.localStorage) => {
  if (!storage || typeof storage.getItem !== 'function') {
    return null;
  }
  return storage;
};

const safeParse = (raw) => {
  if (!raw) {
    return null;
  }

  try {
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === 'object' ? parsed : null;
  } catch (_error) {
    return null;
  }
};

export const createDebounced = (callback, wait = 2500) => {
  let timerId = null;

  const debounced = (...args) => {
    if (timerId) {
      clearTimeout(timerId);
    }
    timerId = setTimeout(() => {
      timerId = null;
      callback(...args);
    }, wait);
  };

  debounced.flush = (...args) => {
    if (timerId) {
      clearTimeout(timerId);
      timerId = null;
    }
    return callback(...args);
  };

  debounced.cancel = () => {
    if (timerId) {
      clearTimeout(timerId);
      timerId = null;
    }
  };

  return debounced;
};

export const buildPersistedSnapshot = (state = {}) => ({
  activeType: state.activeType || 'music',
  theme: state.theme || 'light-retro',
  musicCurrentTrackId: state.musicCurrentTrackId || null,
  musicCurrentTrackIndex: Number.isFinite(state.musicCurrentTrackIndex) ? state.musicCurrentTrackIndex : -1,
  musicCurrentTime: Number.isFinite(state.musicCurrentTime) ? state.musicCurrentTime : 0,
  musicQueueIds: Array.isArray(state.musicQueueIds) ? state.musicQueueIds : [],
  musicShuffle: Boolean(state.musicShuffle),
  musicRepeatMode: state.musicRepeatMode || 'off',
  musicVisualPreset: state.musicVisualPreset || 'vaporwave-grid',
  musicVisualEnabled: state.musicVisualEnabled !== false,
  musicTextEnabled: state.musicTextEnabled !== false,
  musicIntensity: Number.isFinite(state.musicIntensity) ? state.musicIntensity : 1,
  musicSensitivity: Number.isFinite(state.musicSensitivity) ? state.musicSensitivity : 1,
  musicRetroFilterEnabled: Boolean(state.musicRetroFilterEnabled),
  musicContentMode: state.musicContentMode || 'visualizer',
  musicUiMode: state.musicUiMode || 'default',
  musicPlayerExpanded: Boolean(state.musicPlayerExpanded),
  musicVolume: Number.isFinite(state.musicVolume) ? state.musicVolume : 1,
  musicLavaOpacity: Number.isFinite(state.musicLavaOpacity) ? state.musicLavaOpacity : 0.18,
  musicLavaIntensity: Number.isFinite(state.musicLavaIntensity) ? state.musicLavaIntensity : 1,
  musicEngineMode: state.musicEngineMode || 'classic',
  musicGpuScene: Number.isFinite(state.musicGpuScene) ? state.musicGpuScene : 0,
  musicFpsMax: Number.isFinite(state.musicFpsMax) ? state.musicFpsMax : 0,
  musicVisualizerColorMode: state.musicVisualizerColorMode || 'auto',
  musicWasPlaying: Boolean(state.musicWasPlaying),
  musicWasPlayingAt: Number.isFinite(state.musicWasPlayingAt) ? state.musicWasPlayingAt : 0,
});

export const loadPersistedState = ({
  storage = globalThis?.localStorage,
  key = PERSISTENCE_KEY,
} = {}) => {
  const targetStorage = safeStorage(storage);
  if (!targetStorage) {
    return null;
  }

  return safeParse(targetStorage.getItem(key));
};

export const readPlaylistsMap = ({
  storage = globalThis?.localStorage,
  key = PLAYLISTS_KEY,
} = {}) => {
  const targetStorage = safeStorage(storage);
  if (!targetStorage) {
    return {};
  }

  return safeParse(targetStorage.getItem(key)) || {};
};

export const createPersistenceEngine = ({
  store,
  storage = globalThis?.localStorage,
  key = PERSISTENCE_KEY,
  playlistKey = PLAYLISTS_KEY,
  debounceMs = 2500,
} = {}) => {
  const targetStorage = safeStorage(storage);
  const saveStateNow = () => store?.save?.({ storage: targetStorage, key, select: buildPersistedSnapshot }) || null;
  const debouncedSave = createDebounced(saveStateNow, debounceMs);
  const unsubscribe = store?.subscribe?.(() => debouncedSave()) || (() => {});

  const persistPlaylistsMap = (map) => {
    if (!targetStorage) {
      return map;
    }

    try {
      targetStorage.setItem(playlistKey, JSON.stringify(map));
    } catch (_error) {
      return map;
    }

    return map;
  };

  const savePlaylist = (playlistName, tracks = []) => {
    const safeName = String(playlistName || '').trim();
    if (!safeName) {
      return null;
    }

    const nextEntry = {
      name: safeName,
      tracks: Array.isArray(tracks) ? tracks : [],
      date: Date.now(),
    };
    const current = readPlaylistsMap({ storage: targetStorage, key: playlistKey });
    const next = {
      ...current,
      [safeName]: nextEntry,
    };
    persistPlaylistsMap(next);
    return nextEntry;
  };

  const getPlaylists = () => readPlaylistsMap({ storage: targetStorage, key: playlistKey });

  return {
    loadState: () => loadPersistedState({ storage: targetStorage, key }),
    saveNow: () => debouncedSave.flush(),
    scheduleSave: () => debouncedSave(),
    destroy: () => {
      debouncedSave.cancel();
      unsubscribe();
    },
    savePlaylist,
    getPlaylists,
  };
};
