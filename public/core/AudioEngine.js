export class AudioEngine {
  constructor(audioElement) {
    if (!audioElement) {
      throw new Error('AudioEngine requires a valid audio element');
    }

    this.audioElement = audioElement;
    this.audioContext = null;
    this.analyser = null;
    this.sourceNode = null;
    this.sourceElement = null;
    this.resumePromise = null;
    this.gainNode = null;
    this.sharedBuffer = null;

    // Anti-crackling: ensure preload and buffering hints
    this.audioElement.preload = 'auto';
    this.audioElement.crossOrigin = 'anonymous';

    // Initialize SharedArrayBuffer for zero-copy FFT sharing with visualizer worker
    this._initSharedBuffer();
  }

  _initSharedBuffer() {
    try {
      // Import dynamically to avoid blocking constructor
      import('./AudioSharedBuffer.js').then(({ AudioSharedBuffer }) => {
        this.sharedBuffer = new AudioSharedBuffer();
        if (this.sharedBuffer.isShared) {
          if(window.__DEBUG__)console.log('[AudioEngine] SharedArrayBuffer active — zero-copy FFT enabled');
        }
      }).catch(() => {});
    } catch {}
  }

  ensureContext() {
    if (!this.audioContext) {
      const ContextCtor = window.AudioContext || window.webkitAudioContext;
      // Use default sample rate (matches system output) to avoid resampling crackling.
      // Larger latencyHint gives the audio thread more breathing room.
      this.audioContext = new ContextCtor({ latencyHint: 'playback' });
    }

    return this.audioContext;
  }

  async resume() {
    const context = this.ensureContext();
    if (!context || context.state !== 'suspended') {
      return context;
    }

    if (!this.resumePromise) {
      this.resumePromise = context
        .resume()
        .catch(() => null)
        .finally(() => {
          this.resumePromise = null;
        });
    }

    await this.resumePromise;
    console.log('AudioContext resumed successfully');
    return context;
  }

  ensurePipeline() {
    this.ensureContext();

    if (!this.analyser) {
      this.analyser = this.audioContext.createAnalyser();
      this.analyser.fftSize = 512;
      this.analyser.smoothingTimeConstant = 0.85;
    }

    if (!this.sourceNode || this.sourceElement !== this.audioElement) {
      this.sourceNode = this.audioContext.createMediaElementSource(this.audioElement);
      this.sourceElement = this.audioElement;
      this.gainNode = this.audioContext.createGain();
      this.gainNode.gain.value = this.audioElement.volume;
      this.sourceNode.connect(this.gainNode);
      this.gainNode.connect(this.analyser);
      this.analyser.connect(this.audioContext.destination);
    }

    return this.analyser;
  }

  getAnalyser() {
    return this.ensurePipeline();
  }

  async setSource(url, { autoplay = true } = {}) {
    if (!url) {
      return;
    }

    // In Tauri production builds, rewrite audio URLs to go through the embedded
    // HTTP server. WebKit handles HTTP streaming with proper Range request
    // support, fixing seek lag and audio pipeline stalls.
    let resolvedUrl = url;
    if (window._resolveAudioUrl) {
      resolvedUrl = window._resolveAudioUrl(url);
    }

    if (this.audioElement.src !== resolvedUrl) {
      this.audioElement.src = resolvedUrl;
    }

    this.audioElement.load();
    // DON'T create the MediaElementSourceNode here — defer until play()
    // Creating it while AudioContext is suspended causes seek desync in WebKit

    if (autoplay) {
      // Soft-start: wait for enough data to be buffered before playing to avoid crackling
      await this._waitForCanPlay();
      await this.resume();
      this.ensurePipeline();
      try {
        await this.audioElement.play();
      } catch (error) {
        // Browser gesture policy may block autoplay.
      }
    }
  }

  /** Wait until the audio element has buffered enough to play without interruption */
  _waitForCanPlay() {
    return new Promise((resolve) => {
      if (this.audioElement.readyState >= 3) { // HAVE_FUTURE_DATA
        resolve();
        return;
      }
      const onReady = () => {
        this.audioElement.removeEventListener('canplay', onReady);
        clearTimeout(timeout);
        resolve();
      };
      this.audioElement.addEventListener('canplay', onReady);
      // Fallback timeout to avoid hanging forever (300ms max wait)
      const timeout = setTimeout(onReady, 300);
    });
  }

  async play() {
    const currentPos = this.audioElement.currentTime;
    const needsPipeline = !this.sourceNode || this.sourceElement !== this.audioElement;

    await this.resume();
    this.ensurePipeline();

    // Cancel any pending gain ramps from pause() fade-out and restore volume
    if (this.gainNode && this.audioContext) {
      const now = this.audioContext.currentTime;
      this.gainNode.gain.cancelScheduledValues(now);
      this.gainNode.gain.setValueAtTime(this.audioElement.volume, now);
    }

    // After creating MediaElementSourceNode on a seeked element,
    // re-affirm the position to avoid WebKit AudioContext buffer desync
    if (needsPipeline && currentPos > 0.5) {
      this.audioElement.currentTime = currentPos;
    }

    try {
      await this.audioElement.play();
    } catch (error) {
      // Browser gesture policy may block playback.
    }
  }

  pause() {
    if (this.gainNode && this.audioContext && this.audioContext.state === 'running') {
      // Quick fade-out to avoid audio pop/duplication on pause
      const now = this.audioContext.currentTime;
      this.gainNode.gain.cancelScheduledValues(now);
      this.gainNode.gain.setValueAtTime(this.gainNode.gain.value, now);
      this.gainNode.gain.linearRampToValueAtTime(0, now + 0.05);
      setTimeout(() => {
        this.audioElement.pause();
        // Restore gain immediately so next play() starts with correct volume
        if (this.gainNode && this.audioContext) {
          this.gainNode.gain.cancelScheduledValues(this.audioContext.currentTime);
          this.gainNode.gain.setValueAtTime(this.audioElement.volume, this.audioContext.currentTime);
        }
      }, 55);
    } else {
      this.audioElement.pause();
    }
  }

  async togglePlayback() {
    if (this.audioElement.paused) {
      await this.play();
      return true;
    }

    this.pause();
    return false;
  }

  seekToRatio(ratio) {
    const duration = this.getDuration();
    if (!Number.isFinite(duration) || duration <= 0) {
      return;
    }

    const clamped = Math.max(0, Math.min(1, Number(ratio) || 0));
    this.audioElement.currentTime = duration * clamped;
  }

  seekBySeconds(deltaSeconds) {
    const duration = this.getDuration();
    const current = this.getCurrentTime();
    const nextTime = Math.max(0, current + (Number(deltaSeconds) || 0));
    if (Number.isFinite(duration) && duration > 0) {
      this.audioElement.currentTime = Math.min(nextTime, duration);
      return;
    }

    this.audioElement.currentTime = nextTime;
  }

  /**
   * Precise seek — simplified for HTTP streaming.
   * With HTTP Range requests the browser handles buffering natively;
   * no need to tear down and reconnect the WebAudio pipeline.
   */
  async preciseSeek(targetTime) {
    const seekId = (this._seekGeneration = (this._seekGeneration || 0) + 1);
    if (this._seekInFlight) {
      try { await this._seekInFlight; } catch (_) {}
    }

    const run = async () => {
      const audio = this.audioElement;
      const wasPlaying = !audio.paused;

      // Seek the HTMLMediaElement directly
      audio.currentTime = targetTime;

      // Wait for the browser to acknowledge the seek
      if (audio.seeking) {
        await new Promise((resolve) => {
          audio.addEventListener('seeked', resolve, { once: true });
          setTimeout(resolve, 400);
        });
      }

      if (this._seekGeneration !== seekId) return;

      if (wasPlaying) {
        try { await audio.play(); } catch (_) {}
      }

      return audio.currentTime;
    };

    this._seekInFlight = run();
    let result;
    try { result = await this._seekInFlight; } finally {
      if (this._seekGeneration === seekId) {
        this._seekInFlight = null;
      }
    }
    return result;
  }

  setVolume(value) {
    const next = Math.max(0, Math.min(1, Number(value) || 0));
    this.audioElement.volume = next;
    // Also update gainNode if Web Audio pipeline is active
    if (this.gainNode) {
      this.gainNode.gain.value = next;
    }
    if (next > 0 && this.audioElement.muted) {
      this.audioElement.muted = false;
    }
    return next;
  }

  getVolume() {
    return Number(this.audioElement.volume ?? 1);
  }

  getCurrentTime() {
    const raw = this.audioElement.currentTime || 0;
    // Compensate for Web Audio API pipeline latency.
    // audioElement.currentTime reports decode position, but actual audio output
    // is delayed by the AudioContext's base + output latency.
    const ctx = this.audioContext;
    if (ctx) {
      const latency = (ctx.outputLatency || 0) + (ctx.baseLatency || 0);
      return Math.max(0, raw - latency);
    }
    return raw;
  }

  getDuration() {
    return this.audioElement.duration || 0;
  }

  isPlaying() {
    return !this.audioElement.paused && !this.audioElement.ended;
  }

  on(eventName, handler) {
    this.audioElement.addEventListener(eventName, handler);
    return () => this.audioElement.removeEventListener(eventName, handler);
  }

  canPlayMime(mimeType) {
    return Boolean(this.audioElement.canPlayType(mimeType || ''));
  }

  getFrequencyData() {
    const analyser = this.analyser;
    if (!analyser) {
      return { bass: 0, mid: 0, treble: 0, energy: 0, raw: null };
    }

    const buffer = new Uint8Array(analyser.frequencyBinCount);
    analyser.getByteFrequencyData(buffer);
    const len = buffer.length;
    if (!len) {
      return { bass: 0, mid: 0, treble: 0, energy: 0, raw: buffer };
    }

    const avg = (start, end) => {
      let sum = 0;
      let count = 0;
      const s = Math.max(0, Math.floor(start));
      const e = Math.min(len, Math.floor(end));
      for (let i = s; i < e; i++) {
        sum += buffer[i];
        count++;
      }
      return count ? sum / (count * 255) : 0;
    };

    const bass = avg(1, Math.max(4, len * 0.08));
    const mid = avg(len * 0.08, len * 0.42);
    const treble = avg(len * 0.42, len * 0.92);
    const energy = avg(0, len);

    return { bass, mid, treble, energy, raw: buffer };
  }

  /** Write current FFT data into SharedArrayBuffer (call from animation loop) */
  updateSharedBuffer() {
    if (!this.sharedBuffer || !this.analyser) return;
    this.sharedBuffer.writeFromAnalyser(this.analyser, this.isPlaying());
  }

  /** Get the SharedArrayBuffer reference for passing to a Worker */
  getSharedBufferRef() {
    return this.sharedBuffer;
  }
}
