/**
 * injected.js — runs in the PAGE WORLD (not extension isolated world).
 * Patches AudioContext before SoundCloud can call createMediaElementSource so we
 * can tap the audio source node and feed real frequency data back to content.js.
 *
 * Communication to content.js: document CustomEvents (__vibeAudio, __vibeAudioReady)
 * These cross isolated-world boundaries via the shared document object.
 */
(function () {
  'use strict';

  const OrigAudioContext = window.AudioContext || window.webkitAudioContext;
  if (!OrigAudioContext) {
    document.dispatchEvent(new CustomEvent('__vibeAudioReady', {
      detail: { ok: false, reason: 'no-AudioContext' }
    }));
    return;
  }

  let _ctx = null;
  let _analyser = null;
  let _freqData = null;
  let _timeData = null;
  let _connected = false;
  let _loopId = null;
  let _mediaEl = null; // the HTMLMediaElement SoundCloud is playing

  /** Send metrics + compact frequency snapshot to content script */
  function sendFrame() {
    if (!_analyser || !_freqData) return;

    // Fallback: if the source-node hook didn't capture the element, try the DOM.
    if (!_mediaEl || typeof _mediaEl.currentTime !== 'number') {
      const el = document.querySelector('audio') || document.querySelector('video');
      if (el) _mediaEl = el;
    }

    _analyser.getByteFrequencyData(_freqData);
    _analyser.getByteTimeDomainData(_timeData);

    const len = _freqData.length;
    const third = Math.floor(len / 3);

    let bassSum = 0, midSum = 0, trebleSum = 0;
    for (let i = 0; i < third; i++) bassSum += _freqData[i];
    for (let i = third; i < third * 2; i++) midSum += _freqData[i];
    for (let i = third * 2; i < len; i++) trebleSum += _freqData[i];

    const bass   = bassSum   / third                / 255;
    const mid    = midSum    / third                / 255;
    const treble = trebleSum / (len - third * 2)    / 255;

    let rmsSum = 0;
    for (let i = 0; i < _timeData.length; i++) {
      const v = (_timeData[i] - 128) / 128;
      rmsSum += v * v;
    }
    const rms = Math.sqrt(rmsSum / _timeData.length);

    // Downsample frequency array to 128 bins for low-overhead transfer
    const step = Math.floor(len / 128);
    const compact = new Array(128);
    for (let i = 0; i < 128; i++) compact[i] = _freqData[i * step];

    document.dispatchEvent(new CustomEvent('__vibeAudio', {
      detail: {
        rms, bass, mid, treble,
        freq: compact,
        binCount: len,
        ctxState: _ctx ? _ctx.state : 'none',
        currentTime: _mediaEl ? _mediaEl.currentTime : null,
        duration: _mediaEl ? _mediaEl.duration : null,
        paused: _mediaEl ? _mediaEl.paused : null
      }
    }));
  }

  function startLoop() {
    if (_loopId) return;
    (function tick() {
      sendFrame();
      _loopId = requestAnimationFrame(tick);
    })();
  }

  function hookContext(ctx) {
    if (_ctx === ctx) return; // already hooked
    _ctx = ctx;
    _analyser = ctx.createAnalyser();
    _analyser.fftSize = 2048;
    _analyser.smoothingTimeConstant = 0.75;
    _freqData = new Uint8Array(_analyser.frequencyBinCount);
    _timeData = new Uint8Array(_analyser.frequencyBinCount);
    startLoop();
  }

  /** Core patch — intercept every createMediaElementSource call */
  const _origCreate = OrigAudioContext.prototype.createMediaElementSource;
  OrigAudioContext.prototype.createMediaElementSource = function (element) {
    const sourceNode = _origCreate.call(this, element);

    // Remember the media element so we can broadcast its playback clock.
    if (element && typeof element.currentTime === 'number') {
      _mediaEl = element;
    }

    hookContext(this);

    // Connect: source → our analyser (tap — SoundCloud keeps its own routing)
    try {
      sourceNode.connect(_analyser);
      _connected = true;
      document.dispatchEvent(new CustomEvent('__vibeAudioReady', {
        detail: { ok: true, fftSize: _analyser.fftSize }
      }));
    } catch (e) {
      document.dispatchEvent(new CustomEvent('__vibeAudioReady', {
        detail: { ok: false, reason: e.message }
      }));
    }

    return sourceNode;
  };

  /** Also patch AudioContext constructor so we can capture the ctx even if
   *  createMediaElementSource was patched but called with a ctx we don't know yet */
  try {
    const _origInit = OrigAudioContext;
    window.AudioContext = window.webkitAudioContext = function (...args) {
      return new _origInit(...args);
    };
    Object.setPrototypeOf(window.AudioContext, _origInit);
    window.AudioContext.prototype = _origInit.prototype;
  } catch (_) {
    // Patching constructor failed — that's OK, the method patch still works
  }

  // Ping content script so it knows we loaded
  document.dispatchEvent(new CustomEvent('__vibeInjected', { detail: { v: '2.0.3' } }));

  // Also respond to explicit status requests from content script
  document.addEventListener('__vibeRequestStatus', function () {
    document.dispatchEvent(new CustomEvent('__vibeInjected', { detail: { v: '2.0.3' } }));
    if (_connected) {
      document.dispatchEvent(new CustomEvent('__vibeAudioReady', {
        detail: { ok: true, fftSize: _analyser ? _analyser.fftSize : 0 }
      }));
    }
  });

  // Reverse bridge: allow content script to request a seek in page world.
  document.addEventListener('__vibeSeek', function (e) {
    const t = Number(e?.detail?.time);
    if (!Number.isFinite(t) || t < 0) return;

    if (!_mediaEl || typeof _mediaEl.currentTime !== 'number') {
      const el = document.querySelector('audio') || document.querySelector('video');
      if (el) _mediaEl = el;
    }
    if (!_mediaEl || typeof _mediaEl.currentTime !== 'number') return;

    try {
      _mediaEl.currentTime = t;
      document.dispatchEvent(new CustomEvent('__vibeSeekAck', {
        detail: { ok: true, time: t }
      }));
    } catch (err) {
      document.dispatchEvent(new CustomEvent('__vibeSeekAck', {
        detail: { ok: false, time: t, reason: err?.message || 'seek-failed' }
      }));
    }
  });
})();


