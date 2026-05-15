const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');
const path = require('path');
const { pathToFileURL } = require('url');

const loadBrowserModule = async (relativePath) => {
  const absolutePath = path.resolve(__dirname, '..', relativePath);
  return import(`${pathToFileURL(absolutePath).href}?t=${Date.now()}`);
};

test('createStateStore publishes updates and unsubscribes listeners', async () => {
  const { createStateStore } = await loadBrowserModule('public/core/State.js');
  const store = createStateStore({ activeType: 'music' });
  const changes = [];

  const unsubscribe = store.subscribe((next, prev) => {
    changes.push({ next, prev });
  });

  store.patch({ activeType: 'jazz' });
  unsubscribe();
  store.patch({ activeType: 'classical' });

  assert.equal(changes.length, 1);
  assert.equal(changes[0].prev.activeType, 'music');
  assert.equal(changes[0].next.activeType, 'jazz');
  assert.equal(store.getState().activeType, 'classical');
});

test('Persistence helpers build resumable snapshots', async () => {
  const { buildPersistedSnapshot } = await loadBrowserModule('public/core/Persistence.js');
  const snapshot = buildPersistedSnapshot({
    activeType: 'music',
    theme: 'midnight-retro',
    musicCurrentTrackId: 'music/track-1',
    musicCurrentTime: 91,
    musicQueueIds: ['a', 'b'],
    musicShuffle: true,
    musicRepeatMode: 'all',
    musicVisualPreset: 'rgb-magic-bubbles',
    musicLavaOpacity: 0.24,
    musicLavaIntensity: 1.6,
  });

  assert.equal(snapshot.activeType, 'music');
  assert.equal(snapshot.theme, 'midnight-retro');
  assert.equal(snapshot.musicVisualPreset, 'rgb-magic-bubbles');
  assert.equal(snapshot.musicRepeatMode, 'all');
  assert.equal(snapshot.musicLavaOpacity, 0.24);
  assert.equal(snapshot.musicLavaIntensity, 1.6);
});

test('Persistence engine can save playlists into storage', async () => {
  const { createPersistenceEngine } = await loadBrowserModule('public/core/Persistence.js');
  const storage = new Map();
  const fakeStorage = {
    getItem(key) {
      return storage.has(key) ? storage.get(key) : null;
    },
    setItem(key, value) {
      storage.set(key, value);
    },
  };
  const store = {
    subscribe() {
      return () => {};
    },
    save() {
      return null;
    },
  };

  const persistence = createPersistenceEngine({ store, storage: fakeStorage });
  const playlist = persistence.savePlaylist('Playlist 1', [{ id: 'track-1', title: 'Aurora' }]);

  assert.equal(playlist.name, 'Playlist 1');
  assert.equal(persistence.getPlaylists()['Playlist 1'].tracks[0].id, 'track-1');
});

test('ColorEngine helpers normalize contrast-aware accent color', async () => {
  const { normalizeAccent, extractDominantAccent } = await loadBrowserModule('public/core/ColorEngine.js');

  const dark = normalizeAccent({ r: 3, g: 4, b: 7 });
  assert.ok(dark.r > 3 || dark.g > 4 || dark.b > 7);

  const bright = normalizeAccent({ r: 255, g: 250, b: 247 });
  assert.ok(bright.r < 255 || bright.g < 250 || bright.b < 247);

  const accent = extractDominantAccent(
    Uint8ClampedArray.from([
      12,
      190,
      238,
      255,
      11,
      182,
      230,
      255,
      200,
      40,
      70,
      255,
    ]),
  );

  assert.ok(accent.g >= accent.r);
  assert.ok(accent.b >= accent.r);
});

test('AudioEngine resumes suspended AudioContext before autoplay playback', async () => {
  const { AudioEngine } = await loadBrowserModule('public/core/AudioEngine.js');
  const originalWindow = globalThis.window;
  let resumeCalls = 0;
  let playCalls = 0;

  class MockAudioContext {
    constructor() {
      this.state = 'suspended';
      this.destination = { id: 'destination' };
    }

    async resume() {
      resumeCalls += 1;
      this.state = 'running';
    }

    createAnalyser() {
      return {
        fftSize: 0,
        smoothingTimeConstant: 0,
        connect() {},
      };
    }

    createMediaElementSource() {
      return {
        connect() {},
      };
    }
  }

  globalThis.window = {
    AudioContext: MockAudioContext,
  };

  const audioElement = {
    src: '',
    paused: true,
    ended: false,
    currentTime: 0,
    duration: 120,
    load() {},
    pause() {
      this.paused = true;
    },
    async play() {
      playCalls += 1;
      this.paused = false;
    },
    addEventListener() {},
    removeEventListener() {},
    canPlayType() {
      return 'probably';
    },
  };

  const engine = new AudioEngine(audioElement);
  await engine.getAnalyser();
  assert.equal(resumeCalls, 0);
  assert.equal(playCalls, 0);

  await engine.setSource('/media/music/track.mp3', { autoplay: true });
  assert.equal(audioElement.src, '/media/music/track.mp3');
  assert.equal(resumeCalls, 1);
  assert.equal(playCalls, 1);

  if (originalWindow) {
    globalThis.window = originalWindow;
  } else {
    delete globalThis.window;
  }
});

test('buildLyricTimeline creates evenly spaced timeline from lines', async () => {
  const { buildLyricTimeline } = await loadBrowserModule('public/modules/music/Lyrics.js');
  const timeline = buildLyricTimeline(['line one', 'line two', 'line three'], 12);

  assert.equal(timeline.length, 3);
  assert.deepEqual(
    timeline.map((entry) => entry.text),
    ['line one', 'line two', 'line three'],
  );
  assert.equal(timeline[0].start, 0);
  assert.ok(timeline[1].start > timeline[0].start);
  assert.ok(timeline[2].start > timeline[1].start);
});

test('MusicPlayer groups tracks by folder-first album keys', async () => {
  const { computeSwipeResistance, groupTracksIntoAlbums, getTrackAlbumKey, reorderQueueIds } = await loadBrowserModule('public/modules/music/MusicPlayer.js');
  const albums = groupTracksIntoAlbums([
    { id: '1', title: 'Track A', album: 'Album A', folder: 'Artist/Album A', previewUrl: '/a.jpg' },
    { id: '2', title: 'Track B', album: 'Album A', folder: 'Artist/Album A' },
    { id: '3', title: 'Track C', album: 'Singles' },
  ], (track) => track.previewUrl || '/fallback.png');

  assert.equal(getTrackAlbumKey({ folder: 'Nested/Album' }), 'Nested/Album');
  assert.equal(albums.length, 2);
  assert.equal(albums[0].key, 'Artist/Album A');
  assert.equal(albums[0].tracks.length, 2);
  assert.equal(albums[1].key, 'Singles');
  assert.deepEqual(reorderQueueIds(['a', 'b', 'c'], 'c', 'a'), ['c', 'a', 'b']);
  assert.ok(computeSwipeResistance(300, 900) < 300);
});

test('MusicPlayer overlay host helper always mounts the host directly under document.body', async () => {
  const { ensureOverlayHostOnBody } = await loadBrowserModule('public/modules/music/MusicPlayer.js');
  const body = {
    appended: [],
    append(node) {
      node.parentNode = this;
      this.appended.push(node);
    },
  };
  const otherParent = { id: 'other-parent' };
  const existingHost = { id: 'musicOverlayHost', parentNode: otherParent };
  const fakeDocument = {
    body,
    getElementById() {
      return null;
    },
    createElement(tagName) {
      return { tagName, parentNode: null };
    },
  };

  const mountedHost = ensureOverlayHostOnBody(existingHost, fakeDocument);
  assert.equal(mountedHost, existingHost);
  assert.equal(mountedHost.parentNode, body);
  assert.equal(body.appended[0], existingHost);
});

test('MusicPlayer overlay host state removes aria-hidden and inert while the player is open', async () => {
  const { syncOverlayHostState } = await loadBrowserModule('public/modules/music/MusicPlayer.js');
  const classNames = new Set();
  const host = {
    inert: true,
    attributes: new Map([['aria-hidden', 'true'], ['inert', '']]),
    classList: {
      toggle(name, value) {
        if (value) {
          classNames.add(name);
        } else {
          classNames.delete(name);
        }
      },
      contains(name) {
        return classNames.has(name);
      },
    },
    setAttribute(name, value) {
      this.attributes.set(name, value);
    },
    removeAttribute(name) {
      this.attributes.delete(name);
    },
  };

  syncOverlayHostState(host, true);
  assert.equal(host.attributes.has('aria-hidden'), false);
  assert.equal(host.attributes.has('inert'), false);
  assert.equal(host.inert, false);
  assert.equal(classNames.has('is-active'), true);
  assert.equal(classNames.has('is-expanded'), true);

  syncOverlayHostState(host, false);
  assert.equal(host.attributes.get('aria-hidden'), 'true');
  assert.equal(host.attributes.get('inert'), '');
  assert.equal(host.inert, true);
});

test('MusicPlayer media session helper publishes metadata and playback state safely', async () => {
  const { applyMediaSessionState } = await loadBrowserModule('public/modules/music/MusicPlayer.js');
  const originalNavigatorDescriptor = Object.getOwnPropertyDescriptor(globalThis, 'navigator');
  const originalMediaMetadata = globalThis.MediaMetadata;
  const calls = [];

  Object.defineProperty(globalThis, 'navigator', {
    configurable: true,
    writable: true,
    value: {
      mediaSession: {
        metadata: null,
        playbackState: 'none',
        setActionHandler(action, handler) {
          calls.push({ action, handlerType: typeof handler });
        },
      },
    },
  });
  globalThis.MediaMetadata = class MediaMetadataMock {
    constructor(payload) {
      Object.assign(this, payload);
    }
  };

  applyMediaSessionState({
    track: { title: 'Aurora', artist: 'Tycho', album: 'Dive' },
    artworkUrl: '/cover.png',
    playbackState: 'playing',
    handlers: {
      play: () => {},
      pause: () => {},
    },
  });

  assert.equal(globalThis.navigator.mediaSession.metadata.title, 'Aurora');
  assert.equal(globalThis.navigator.mediaSession.playbackState, 'playing');
  assert.deepEqual(calls.map((entry) => entry.action), ['play', 'pause']);

  applyMediaSessionState();
  assert.equal(globalThis.navigator.mediaSession.metadata, null);
  assert.equal(globalThis.navigator.mediaSession.playbackState, 'none');

  if (originalNavigatorDescriptor) {
    Object.defineProperty(globalThis, 'navigator', originalNavigatorDescriptor);
  } else {
    delete globalThis.navigator;
  }
  globalThis.MediaMetadata = originalMediaMetadata;
});

test('FocusManager helper wraps focus movement indices in both directions', async () => {
  const { getNextFocusableIndex } = await loadBrowserModule('public/core/FocusManager.js');
  assert.equal(getNextFocusableIndex(4, -1, 1), 0);
  assert.equal(getNextFocusableIndex(4, 3, 1), 0);
  assert.equal(getNextFocusableIndex(4, 0, -1), 3);
});

test('Visualizer exports RGB Magic Bubbles preset and normalized audio bands', async () => {
  const { VISUALIZER_PRESETS, computeAudioBands, computeMoodProfile, computeStarVisibility, resetMoodState, setTrackIdentity } = await loadBrowserModule('public/modules/music/Visualizer.js');
  const values = Uint8Array.from([
    255, 240, 220, 180, 140, 100, 80, 60,
    40, 30, 20, 10, 30, 60, 90, 180,
  ]);

  assert.ok(VISUALIZER_PRESETS.includes('rgb-magic-bubbles'));
  assert.ok(VISUALIZER_PRESETS.includes('vhs-retro'));
  assert.ok(VISUALIZER_PRESETS.includes('musical-symphony'));

  const bands = computeAudioBands(values);
  // Set track identity: chill=190° (teal), drive=340° (magenta) — similar to old hardcoded gradient
  setTrackIdentity(190, 340);
  resetMoodState();
  // Simulate sustained chill mood (multiple frames to build EMA)
  let chillMood;
  for (let i = 0; i < 600; i++) {
    chillMood = computeMoodProfile({ bass: 0.12, mid: 0.15, energy: 0.18 }, { intensity: 1, sensitivity: 1, deltaTime: 1/60 });
  }
  // Simulate sustained drive mood (multiple frames)
  let driveMood;
  for (let i = 0; i < 600; i++) {
    driveMood = computeMoodProfile({ bass: 0.95, mid: 0.80, energy: 0.92 }, { intensity: 1.4, sensitivity: 1.2, deltaTime: 1/60 });
  }
  assert.ok(bands.bass > 0.7);
  assert.ok(bands.treble > 0.15);
  assert.ok(bands.energy > 0.25);
  // With dynamic identity gradients, exact state names depend on track identity;
  // verify that chill is in a low-energy state and drive is in a high-energy state
  assert.ok(['deep', 'chill'].includes(chillMood.palette), `chill state should be deep or chill, got: ${chillMood.palette}`);
  assert.ok(['drive', 'fury'].includes(driveMood.palette), `drive state should be drive or fury, got: ${driveMood.palette}`);
  assert.ok(driveMood.speedMultiplier > chillMood.speedMultiplier);
  assert.ok(driveMood.densityMultiplier > chillMood.densityMultiplier);
  assert.ok(driveMood.smoothedExcitement > chillMood.smoothedExcitement);
  assert.ok(driveMood.moodColor.h > 300 || driveMood.moodColor.h < 40); // hot hue
  assert.ok(chillMood.moodColor.h > 120); // cool hue
  assert.ok(computeStarVisibility(0.5) > computeStarVisibility(0.05));
  assert.ok(computeStarVisibility(0.5) > computeStarVisibility(0.95));
});


test('resolveSoftCollision reports overlap vector for bubble repulsion', async () => {
  const { resolveSoftCollision, resolveElasticCollision } = await loadBrowserModule('public/modules/music/Visualizer.js');
  const collision = resolveSoftCollision(
    { x: 10, y: 10, radius: 18 },
    { x: 34, y: 10, radius: 14 },
    4,
  );

  assert.ok(collision);
  assert.ok(collision.overlap > 0);
  assert.ok(collision.normalX > 0.9);
  assert.equal(collision.normalY, 0);

  const elastic = resolveElasticCollision(
    { x: 10, y: 10, vx: 1, vy: 0, mass: 1 },
    { x: 20, y: 10, vx: -1, vy: 0, mass: 1 },
  );

  assert.ok(elastic);
  assert.ok(elastic.first.vx < 0);
  assert.ok(elastic.second.vx > 0);
});

test('Visualizer preset alias rgb-bubbles resolves to rgb-magic-bubbles', async () => {
  const { VisualizerManager } = await loadBrowserModule('public/modules/music/Visualizer.js');
  const context = {
    clearRect: () => {},
  };
  const canvas = {
    width: 640,
    height: 360,
    clientWidth: 640,
    clientHeight: 360,
    style: {},
    getContext: () => context,
  };
  const analyser = {
    frequencyBinCount: 128,
    fftSize: 256,
    getByteFrequencyData: () => {},
    getByteTimeDomainData: () => {},
  };

  const manager = new VisualizerManager({
    canvas,
    analyser,
    preset: 'rgb-bubbles',
  });

  assert.equal(manager.preset, 'rgb-magic-bubbles');
  manager.setPreset('rgb-bubbles');
  assert.equal(manager.preset, 'rgb-magic-bubbles');
  manager.setPreset('vhs-retro');
  assert.equal(manager.preset, 'vhs-retro');
});

test('Visualizer lava settings clamp values and bubble sprite cache reuses entries by color', async () => {
  const { VisualizerManager } = await loadBrowserModule('public/modules/music/Visualizer.js');
  const gradientStub = {
    addColorStop() {},
  }
  const context = {
    clearRect: () => {},
    createRadialGradient: () => gradientStub,
    fillStyle: '',
    beginPath: () => {},
    arc: () => {},
    fill: () => {},
  };
  const canvas = {
    width: 640,
    height: 360,
    clientWidth: 640,
    clientHeight: 360,
    style: {},
    getContext: () => context,
  };
  const analyser = {
    frequencyBinCount: 128,
    fftSize: 256,
    getByteFrequencyData: () => {},
    getByteTimeDomainData: () => {},
  };

  const originalDocument = globalThis.document;
  globalThis.document = {
    createElement(tagName) {
      if (tagName !== 'canvas') {
        return {};
      }
      return {
        width: 0,
        height: 0,
        getContext: () => context,
      };
    },
  };

  const manager = new VisualizerManager({ canvas, analyser, bgOpacity: 0.8, bgIntensity: 3 });
  manager.setBgOpacity(0.7);
  manager.setBgIntensity(0.2);
  assert.equal(manager.bgOpacity, 0.5);
  assert.equal(manager.bgIntensity, 0.5);

  const spriteA = manager.getBubbleSprite('hsl(200, 70%, 60%)', 26);
  const spriteB = manager.getBubbleSprite('hsl(200, 70%, 60%)', 26);
  assert.equal(spriteA, spriteB);

  if (originalDocument) {
    globalThis.document = originalDocument;
  } else {
    delete globalThis.document;
  }
});

