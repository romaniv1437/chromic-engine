import { debug } from '../../core/debug.js';
import { scheduler, Spring } from '../../core/MotionController.js';

// ── Worker singleton (shared across instances) ──
let _worker = null;
let _workerMsgId = 0;
const _workerCallbacks = new Map();

function getLyricsWorker() {
  if (!_worker) {
    try {
      _worker = new Worker(new URL('./lyrics-worker.js', import.meta.url), { type: 'module' });
      _worker.onmessage = (e) => {
        const { id, payload } = e.data;
        const cb = _workerCallbacks.get(id);
        if (cb) {
          _workerCallbacks.delete(id);
          cb(payload);
        }
      };
    } catch (err) {
      debug.log('[lyrics] Worker init failed, using main thread fallback:', err);
      _worker = null;
    }
  }
  return _worker;
}

function postToWorker(type, payload, transferables) {
  return new Promise((resolve) => {
    const w = getLyricsWorker();
    if (!w) { resolve(null); return; }
    const id = ++_workerMsgId;
    _workerCallbacks.set(id, resolve);
    w.postMessage({ id, type, payload }, transferables || []);
  });
}

/**
 * Trim inflated word/line timings so gaps between lines become vocal_cue-eligible.
 * Fixes: word fill too slow, no dots between lines.
 */
export const cleanTimings = (rawLines) => {
  // DUMB RENDERER: pass BE data through unmodified.
  // Only fix NaN edge cases, never change durations or line boundaries.
  if (!Array.isArray(rawLines)) return rawLines;

  return rawLines.map((line) => {
    const words = (line.words || []).map((w, j) => {
      let wStart = parseFloat(w.start);
      let wEnd = parseFloat(w.end);
      // Only fix truly missing end values
      if (isNaN(wEnd)) {
        const nextWord = (line.words || [])[j + 1];
        wEnd = nextWord ? parseFloat(nextWord.start) : wStart + 0.5;
      }
      if (isNaN(wStart)) wStart = 0;
      return { ...w, start: wStart, end: wEnd };
    });

    let lineEnd = parseFloat(line.end);
    let lineStart = parseFloat(line.start);
    if (isNaN(lineStart)) lineStart = parseFloat(line.time);
    if (isNaN(lineEnd)) {
      lineEnd = words.length > 0 ? words[words.length - 1].end : (lineStart || 0) + 2.0;
    }
    if (isNaN(lineStart)) lineStart = words.length > 0 ? words[0].start : 0;

    return { ...line, words, start: lineStart, end: lineEnd };
  });
};

/**
 * Builds timeline from plain text lines (fallback when BE doesn't provide timed data).
 * Distributes lines evenly across duration, fills gaps with vocal_cue.
 */
export const buildLyricTimeline = (lines, durationSeconds = 0) => {
  const prepared = Array.isArray(lines) ? lines.filter((line) => String(line || '').trim().length > 0) : [];

  if (!prepared.length) {
    return [];
  }

  const safeDuration = Number.isFinite(durationSeconds) && durationSeconds > 0 ? durationSeconds : prepared.length * 4;
  const step = Math.max(1.8, safeDuration / prepared.length);

  const timeline = [];
  let currentTime = 0;

  for (let index = 0; index < prepared.length; index++) {
    const text = String(prepared[index]).trim();
    const words = text.split(/\s+/).filter(Boolean);
    const lineStart = step * index;
    const lineEnd = step * (index + 1);
    const lineDuration = lineEnd - lineStart;

    // Fill any gap before this line with a vocal_cue (only for real musical breaks >3s)
    if (lineStart - currentTime > 2.5) {
      timeline.push({ type: 'vocal_cue', start: currentTime, end: lineStart });
    }

    const totalChars = words.reduce((sum, w) => sum + w.length, 0) || 1;
    let cursor = lineStart;
    const wordData = words.map((word) => {
      const ratio = word.length / totalChars;
      const wordDuration = lineDuration * ratio;
      const wordStart = cursor;
      cursor += wordDuration;
      return { text: word, start: wordStart, end: cursor };
    });

    timeline.push({ type: 'line', text, start: lineStart, end: lineEnd, words: wordData });
    currentTime = lineEnd;
  }

  // Trailing: extend last real line to track end instead of showing vocal_cue dots
  if (safeDuration - currentTime > 2.5) {
    // Find last non-vocal_cue entry and extend it
    const lastLine = timeline.findLast(e => e.type !== 'vocal_cue');
    if (lastLine) {
      lastLine.end = safeDuration;
    }
  }

  return timeline;
};

/**
 * Accepts an authoritative timeline from BE (with real timestamps).
 * Only patches t=0 and trailing gaps if BE missed them.
 */
export const buildAuthoritativeTimeline = (beTimeline, duration) => {
  const raw = Array.isArray(beTimeline) ? [...beTimeline] : [];
  if (!raw.length) return [];

  // Filter out entries with invalid times
  const valid = raw.filter(e => Number.isFinite(e.start) && Number.isFinite(e.end));
  if (valid.length < raw.length) {
    console.warn(`[buildAuthoritativeTimeline] ⚠️ Dropped ${raw.length - valid.length} entries with NaN/undefined times`);
    if (valid.length === 0) {
      console.error('[buildAuthoritativeTimeline] ❌ ALL entries have invalid times! Raw sample:', raw[0]);
      return [];
    }
  }

  // Sort by start time
  valid.sort((a, b) => a.start - b.start);

  console.log(`[buildAuthoritativeTimeline] ${valid.length} valid entries, duration=${duration}`);

  const timeline = [];

  // Insert vocal_cue entries for gaps between lines (>1.5s) so there are no "dead zones"
  for (let i = 0; i < valid.length; i++) {
    const entry = valid[i];

    // Insert vocal_cue for gap BEFORE this entry
    if (i === 0 && entry.start > 2.0) {
      timeline.push({ type: 'vocal_cue', start: 0, end: entry.start });
    } else if (i > 0) {
      const prevEnd = valid[i - 1].end;
      const gap = entry.start - prevEnd;
      if (gap > 1.5) {
        timeline.push({ type: 'vocal_cue', start: prevEnd, end: entry.start });
      }
    }

    timeline.push(entry);
  }

  // Trailing: extend last real line to track end instead of showing vocal_cue dots
  if (valid.length > 0 && duration && duration - valid[valid.length - 1].end > 3) {
    const lastLine = timeline.findLast(e => e.type !== 'vocal_cue');
    if (lastLine) {
      lastLine.end = duration;
    }
  }

  console.log(`[buildAuthoritativeTimeline] Result: ${timeline.length} segments (${timeline.filter(e => e.type === 'vocal_cue').length} cues)`);
  return timeline;
};

const getFallbackLyrics = (track) => {
  return [];
};

const esc = (s) => String(s || '').replace(/</g, '&lt;').replace(/>/g, '&gt;');

export class LyricsEngine {
  constructor({ container, audioElement, analyser, audioEngine }) {
    this.container = container;
    this.audioElement = audioElement;
    this.audioEngine = audioEngine || null;
    this.analyser = analyser || null;
    this._freqData = analyser ? new Uint8Array(analyser.frequencyBinCount) : null;
    this.timeline = [];
    this.lineElements = [];
    this.activeLineIndex = -1;
    this.frameId = null;
    this._wordSpansCache = [];
    this._dotSpansCache = [];
    this._prevActiveIndex = -1;
    this.userIsScrolling = false;
    this._scrollTimeout = null;
    this._lerpScrollId = null;
    this._lerpScrollTarget = 0;
    this._lerpScrollCurrent = 0;
    this._lastWordProgressUpdate = 0; // throttle word style writes
    this._lastNow = -1; // skip redundant frames
    this.syncOffset = 0; // seconds to add to audioElement.currentTime for sync correction
    this.isSeeking = false; // Block rAF updates during seek operations
    this._crossFadeHandle = null; // spring animation handle for line↔cue transitions
    this._cueSpring = new Spring({ stiffness: 120, damping: 18, mass: 1 }); // gentle spring for cross-fade

    // ── Word blink color pulse system ──
    this._wordBlinkAlpha = 0;       // current blink intensity (0→1, decays)
    this._wordBlinkDecay = 0.92;    // per-frame decay multiplier
    this._lastBlinkWordIdx = -1;    // last word that triggered a blink
    this._lastBlinkLineIdx = -1;    // last line that triggered a blink

    // ── Track gamma (blurred mood color overlay) — THE MOOD VAULT ──
    // Gamma is the "room temperature" of the track. It NEVER reacts to transients.
    // It only moves when the song's structural energy sustains a new zone for 150+ frames.
    this._trackGamma = { h: 210, s: 60, l: 40, alpha: 0 }; // actual rendered color
    this._trackGammaTarget = { h: 210, s: 60, l: 40 };      // confirmed target (only set after confidence gate)
    this._gammaCandidate = { h: 210, s: 60, l: 40 };    // pending candidate from visualizer
    this._gammaConfidence = 0;                                // frames candidate has been stable
    this._gammaConfidenceRequired = 150;                      // ~2.5s at 60fps before committing
    this._gammaMaxHuePerSec = 2;                              // max hue degrees per second (honey lerp)
    this._gammaMaxSLPerSec = 1.5;                             // max S/L percent per second
    this._gammaLastMoodState = null;                          // track visualizer mood state changes
    this._gammaEnergyWindow = [];                             // own energy window (bass+low-mid only)
    this._gammaEnergyWindowSize = 180;                        // 3 seconds at 60fps

    // ── Task 3: IntersectionObserver for visibility tracking ──
    this._visibleLines = new Set();
    this._intersectionObserver = null;

    // ── Task 5: Atomic scroll guard ──
    this._scrollGuardActive = false;

    // ── Task 1 (VRAM): Ghost pre-loader container ──
    this._ghostContainer = null;

    // ── Task 2 (VRAM): Chunk tracking ──
    this._chunks = []; // Array of { el: HTMLDivElement, startIdx: number, endIdx: number }
    this._activeChunkIdx = -1;
    this.CHUNK_SIZE = 10;
    this.FIRST_CHUNK_SIZE = 5; // Smaller first chunk for instant display without blocking

    // ── Task 4 (VRAM): FPS-adaptive precision ──
    this._lowPrecisionMode = false;
    this._fpsHistory = [];
    this._lastFrameTime = 0;
    this._lowPrecisionSince = 0; // Timestamp when low-precision was entered

    // ── Micro-batch streaming abort controller ──
    this._streamAbortController = null;
    this._setTrackGeneration = 0;
    this._catchUpAnimation = null;

    // ── Translation overlay ──
    this._translations = []; // Array of translated strings, parallel to timeline
    this._contextTooltip = null; // Genius-style tooltip element

    // Smart scroll: pause auto-scroll when user scrolls manually
    const scrollParent = container?.closest('.music-immersive-lyrics-panel') || container;
    if (scrollParent) {
      // Dampen scroll velocity — reduce wheel deltaY by 60% for smoother feel
      scrollParent.addEventListener('wheel', (e) => {
        e.preventDefault();
        // User is actively scrolling — cancel any auto-scroll flag
        this._isAutoScrolling = false;
        clearTimeout(this._autoScrollResetTimer);
        // Always ensure scroll-active class is present during wheel
        if (!scrollParent.classList.contains('is-scrolling-active')) {
          scrollParent.classList.add('is-scrolling-active');
          if (this.container) this.container.classList.add('is-scrolling-active');
        }
        scrollParent.scrollTop += e.deltaY * 0.4;
      }, { passive: false });

      // Single unified scroll handler — minimal work per event
      let _scrolling = false;
      let _scrollEndTimer = 0;
      let _scrollActiveTimer = 0;
      let _eventCount = 0;

      const onScrollInput = () => {
        // Ignore scroll events triggered by auto-scroll (lerpScrollTo)
        if (this._isAutoScrolling) return;
        _eventCount++;

        // First event: enter scroll state
        if (!_scrolling) {
          _scrolling = true;
          this.userIsScrolling = true;
          this._scrollGuardActive = true;
          this._cancelLerpScroll();
          scrollParent.classList.add('is-scrolling-active');
          if (this.container) this.container.classList.add('is-scrolling-active');
          document.dispatchEvent(new CustomEvent('lyricsScrollState', { detail: { scrolling: true } }));
        }

        // Always keep the "active" timer alive — controls blur + text opacity
        clearTimeout(_scrollActiveTimer);
        _scrollActiveTimer = setTimeout(() => {
          scrollParent.classList.remove('is-scrolling-active');
          if (this.container) this.container.classList.remove('is-scrolling-active');
          document.dispatchEvent(new CustomEvent('lyricsScrollState', { detail: { scrolling: false } }));
          // Also end scroll state entirely
          this.userIsScrolling = false;
          this._scrollGuardActive = false;
          _scrolling = false;
          _eventCount = 0;
        }, 800);

        // Only reset the long "end" timer every 50th event (expensive: 3s timer)
        if (_eventCount % 50 === 0 || _eventCount === 1) {
          clearTimeout(_scrollEndTimer);
          _scrollEndTimer = setTimeout(() => {
            this.userIsScrolling = false;
            this._scrollGuardActive = false;
            _scrolling = false;
            _eventCount = 0;
          }, 3000);
        }
      };

      scrollParent.addEventListener('scroll', onScrollInput, { passive: true });
      scrollParent.addEventListener('touchstart', onScrollInput, { passive: true });
      scrollParent.addEventListener('touchmove', onScrollInput, { passive: true });
    }

    // Force rAF loop to re-evaluate on play/seek events
    if (audioElement) {
      const forceResync = () => { this._lastNow = -1; };
      audioElement.addEventListener('play', forceResync);
      audioElement.addEventListener('seeked', () => {
        this.isSeeking = false;
        forceResync();
      });
      audioElement.addEventListener('playing', forceResync);
    }

    if (container) {
      container.addEventListener('click', (e) => {
        if (e.shiftKey) return;
        const word = e.target.closest('.lyric-word');
        const line = e.target.closest('.lyrics-line[data-start]');
        debug.log('[lyrics] click target:', e.target.tagName, e.target.className, '| word:', word?.textContent, '| line:', line?.dataset?.start);
        if (line) {
          // Seek to word start if a word was clicked, otherwise line start
          const seekToWord = word && word.dataset.start ? parseFloat(word.dataset.start) : null;
          const t = seekToWord != null && !isNaN(seekToWord) ? seekToWord : parseFloat(line.dataset.start);
            const lineIdx = parseInt(line.dataset.lineIndex, 10);
            if (!isNaN(t) && this.audioElement) {
              const seekTarget = t;
            // Don't block re-clicks — let preciseSeek handle serialization

            const audio = this.audioElement;
              console.log(`[lyrics-sync] LINE CLICK: seekTo=${seekTarget.toFixed(2)} prevAudioTime=${audio.currentTime.toFixed(2)} prevActiveIdx=${this.activeLineIndex} lineIndex=${lineIdx}`);

            // FULL LOCK: block rAF loop entirely during seek
            this.isSeeking = true;

            // Set visual state IMMEDIATELY using known target line index (don't read audio.currentTime)
            this.activeLineIndex = lineIdx;
            this._lastNow = -1;
            this._catchUpAnimation = null;
            this._assignAllLineClasses(lineIdx);

            // Mark all past lines' words as filled
            for (let i = 0; i < lineIdx; i++) {
              const spans = this._wordSpansCache[i];
              if (!spans) continue;
              for (let j = 0; j < spans.length; j++) {
                if (!spans[j].classList.contains('past')) {
                  spans[j].classList.add('past');
                  spans[j].style.setProperty('--progress', '100%');
                }
              }
            }
            // Reset active line's words
            const activeSpans = this._wordSpansCache[lineIdx];
            if (activeSpans) {
              for (let j = 0; j < activeSpans.length; j++) {
                activeSpans[j].classList.remove('active', 'past');
                activeSpans[j].style.setProperty('--progress', '0%');
              }
            }
            // Reset future lines
            for (let i = lineIdx + 1; i < this._wordSpansCache.length; i++) {
              const spans = this._wordSpansCache[i];
              if (!spans) continue;
              for (let j = 0; j < spans.length; j++) {
                spans[j].classList.remove('active', 'past');
                spans[j].style.setProperty('--progress', '0%');
              }
            }

            // Scroll to active line
            const activeLine = this.lineElements[lineIdx];
            if (activeLine && this.container) {
              const scrollParent = this.container.closest('.music-immersive-lyrics-panel') || this.container;
              const lineTop = activeLine.offsetTop;
              const lineHeight = activeLine.offsetHeight;
              const containerHeight = scrollParent.clientHeight;
              const targetScroll = lineTop - containerHeight / 2 + lineHeight / 2;
              this._lerpScrollTo(scrollParent, Math.max(0, targetScroll));
            }

            // Now perform the actual audio seek (async)
            // preciseSeek returns actualTime from timeupdate — real hardware signal
            if (this.audioEngine?.preciseSeek) {
              this.audioEngine.preciseSeek(seekTarget).then((actualTime) => {
                // Calculate drift: how far ahead the hardware ended up vs our target
                const drift = (actualTime || seekTarget) - seekTarget;
                if (drift > 0.05) {
                  // Tauri drifted — enable smooth catch-up interpolation
                  // so lyrics glide to actual position over 400ms instead of jumping
                  this._catchUpAnimation = {
                    startTime: performance.now(),
                    fromTime: seekTarget,
                    toTime: actualTime,
                    duration: 400, // ms
                  };
                  console.log(`[lyrics-sync] Catch-up: drift=${drift.toFixed(3)}s, interpolating ${seekTarget.toFixed(2)} → ${actualTime.toFixed(3)}`);
                }
                this.isSeeking = false;
                this._lastNow = -1;
                console.log(`[lyrics-sync] LINE CLICK preciseSeek done: actualTime=${actualTime?.toFixed(3)} target=${seekTarget.toFixed(2)} drift=${drift.toFixed(3)}`);
              });
            } else {
              const wasPlaying = !audio.paused;
              if (wasPlaying) audio.pause();
              audio.currentTime = seekTarget;
              const onSeeked = () => {
                audio.removeEventListener('seeked', onSeeked);
                this.isSeeking = false;
                if (wasPlaying) audio.play().catch(() => {});
                this._lastNow = -1;
              };
              audio.addEventListener('seeked', onSeeked);
              setTimeout(() => {
                if (this.isSeeking) {
                  this.isSeeking = false;
                  audio.removeEventListener('seeked', onSeeked);
                  if (wasPlaying && audio.paused) audio.play().catch(() => {});
                }
              }, 500);
            }

            this.userIsScrolling = false;
            this._scrollGuardActive = false;
          }
        }
      });
    }
  }

  setAnalyser(analyser) {
    this.analyser = analyser;
    this._freqData = analyser ? new Uint8Array(analyser.frequencyBinCount) : null;
  }

  /**
   * Receive mood color from external source (e.g., album art color extraction).
   * Feeds into the Mood Vault candidate — does NOT bypass the confidence gate.
   * For instant override (e.g., track change), use _resetTrackGamma() instead.
   */
  setMoodColor(moodColor) {
    if (!moodColor) return;
    this._gammaCandidate.h = moodColor.h ?? this._gammaCandidate.h;
    this._gammaCandidate.s = moodColor.s ?? this._gammaCandidate.s;
    this._gammaCandidate.l = moodColor.l ?? this._gammaCandidate.l;
    // Don't reset confidence — let the gate decide naturally
  }

  /**
   * Hard-reset gamma to a specific color (used on track change).
   * Bypasses the confidence gate — sets both target and current immediately.
   */
  _resetTrackGamma(color) {
    if (!color) return;
    const h = color.h ?? 210;
    const s = color.s ?? 60;
    const l = color.l ?? 40;
    this._trackGamma.h = h;
    this._trackGamma.s = s;
    this._trackGamma.l = l;
    this._trackGammaTarget.h = h;
    this._trackGammaTarget.s = s;
    this._trackGammaTarget.l = l;
    this._gammaCandidate = { h, s, l };
    this._gammaConfidence = 0;
    this._gammaLastMoodState = null;
    console.log(`[gamma-vault] 🔃 HARD RESET (track change) | color: H:${h} S:${s} L:${l} | confidence & state cleared`);
  }

  /**
   * Per-frame track gamma update — THE MOOD VAULT.
   *
   * Architecture:
   *   Channel A (Word Blink): instant transient pulse per word — already handled.
   *   Channel B (Track Gamma): ultra-stable ambient tint. Only moves when the
   *     visualizer's confirmed mood state has held for 150+ frames (~2.5s).
   *
   * Anti-jitter: If the mood state flips back to the current state before
   * confidence reaches threshold, the candidate is discarded — the background
   * doesn't even flinch.
   *
   * Transition: Fixed-step hue movement capped at 2°/sec (not EMA).
   * At 60fps, that's ~0.033° per frame. A full 180° hue sweep takes 90 seconds.
   * This is "honey" — the user perceives temperature shift, not color change.
   */
  _updateTrackGamma() {
    const viz = this._visualizerRef;
    const mood = viz?.mood;

    // ── Step 1: Read the visualizer's CONFIRMED mood state (not raw energy) ──
    const vizMoodState = mood?.moodState || mood?.palette || null;
    const vizMoodColor = mood?.moodColor;

    if (vizMoodColor && vizMoodState) {
      // ── Step 2: Confidence Accumulator (The Mood Vault Gate) ──

      if (vizMoodState !== this._gammaLastMoodState) {
        // Mood state changed — start accumulating confidence for the new candidate
        const prevState = this._gammaLastMoodState;
        this._gammaCandidate = {
          h: vizMoodColor.h,
          s: vizMoodColor.s,
          l: vizMoodColor.l,
        };
        this._gammaConfidence = 0;
        this._gammaLastMoodState = vizMoodState;
        console.log(
          `[gamma-vault] 🔄 MOOD STATE CHANGED: "${prevState}" → "${vizMoodState}" | ` +
          `candidate H:${vizMoodColor.h.toFixed(1)} S:${vizMoodColor.s.toFixed(1)} L:${vizMoodColor.l.toFixed(1)} | ` +
          `confidence RESET to 0 (need ${this._gammaConfidenceRequired})`
        );
      } else {
        // Same mood state — increment confidence
        this._gammaConfidence++;

        // Track the latest color within the same state
        this._gammaCandidate.h = vizMoodColor.h;
        this._gammaCandidate.s = vizMoodColor.s;
        this._gammaCandidate.l = vizMoodColor.l;

        // Log confidence progress every 30 frames (~0.5s)
        if (this._gammaConfidence % 30 === 0 && this._gammaConfidence < this._gammaConfidenceRequired) {
          console.log(
            `[gamma-vault] ⏳ confidence: ${this._gammaConfidence}/${this._gammaConfidenceRequired} ` +
            `(${((this._gammaConfidence / this._gammaConfidenceRequired) * 100).toFixed(0)}%) | ` +
            `state: "${vizMoodState}" | candidate H:${vizMoodColor.h.toFixed(1)}`
          );
        }

        // ── Step 3: Confidence Gate ──
        if (this._gammaConfidence === this._gammaConfidenceRequired) {
          // FIRST frame reaching threshold — log the commit
          this._trackGammaTarget.h = this._gammaCandidate.h;
          this._trackGammaTarget.s = this._gammaCandidate.s;
          this._trackGammaTarget.l = this._gammaCandidate.l;
          console.log(
            `[gamma-vault] ✅ CONFIDENCE GATE PASSED — COMMITTING TARGET | ` +
            `state: "${vizMoodState}" held ${this._gammaConfidenceRequired} frames (~${(this._gammaConfidenceRequired / 60).toFixed(1)}s) | ` +
            `target H:${this._trackGammaTarget.h.toFixed(1)} S:${this._trackGammaTarget.s.toFixed(1)} L:${this._trackGammaTarget.l.toFixed(1)} | ` +
            `current gamma H:${this._trackGamma.h.toFixed(1)} S:${this._trackGamma.s.toFixed(1)} L:${this._trackGamma.l.toFixed(1)} | ` +
            `hue delta: ${(this._trackGammaTarget.h - this._trackGamma.h).toFixed(1)}° (will take ~${(Math.abs(this._trackGammaTarget.h - this._trackGamma.h) / this._gammaMaxHuePerSec).toFixed(0)}s at ${this._gammaMaxHuePerSec}°/s)`
          );
        } else if (this._gammaConfidence > this._gammaConfidenceRequired) {
          // Already past threshold — silently track drifting color
          this._trackGammaTarget.h = this._gammaCandidate.h;
          this._trackGammaTarget.s = this._gammaCandidate.s;
          this._trackGammaTarget.l = this._gammaCandidate.l;
        }
      }
    }

    // ── Step 4: Ultra-Viscous Fixed-Step Transition (The Honey) ──
    const g = this._trackGamma;
    const t = this._trackGammaTarget;

    const hueStepMax = this._gammaMaxHuePerSec / 60;
    const slStepMax = this._gammaMaxSLPerSec / 60;

    // Hue: shortest path around the color wheel
    let hDiff = t.h - g.h;
    if (hDiff > 180) hDiff -= 360;
    if (hDiff < -180) hDiff += 360;
    const hueMoving = Math.abs(hDiff) > 0.01;
    if (hueMoving) {
      const step = Math.min(Math.abs(hDiff), hueStepMax);
      g.h += Math.sign(hDiff) * step;
      if (g.h < 0) g.h += 360;
      if (g.h >= 360) g.h -= 360;
    }

    // Saturation & Lightness: simple capped step
    const sDiff = t.s - g.s;
    if (Math.abs(sDiff) > 0.01) {
      g.s += Math.sign(sDiff) * Math.min(Math.abs(sDiff), slStepMax);
    }
    const lDiff = t.l - g.l;
    if (Math.abs(lDiff) > 0.01) {
      g.l += Math.sign(lDiff) * Math.min(Math.abs(lDiff), slStepMax);
    }

    // Log honey lerp progress every 2 seconds (only when actively moving)
    if (hueMoving || Math.abs(sDiff) > 0.1 || Math.abs(lDiff) > 0.1) {
      if (!this._gammaLerpLogTime || performance.now() - this._gammaLerpLogTime > 2000) {
        this._gammaLerpLogTime = performance.now();
        console.log(
          `[gamma-vault] 🍯 HONEY LERP in progress | ` +
          `current H:${g.h.toFixed(1)} → target H:${t.h.toFixed(1)} (Δ${hDiff.toFixed(1)}°) | ` +
          `S:${g.s.toFixed(1)}→${t.s.toFixed(1)} L:${g.l.toFixed(1)}→${t.l.toFixed(1)} | ` +
          `speed: ${this._gammaMaxHuePerSec}°/s | state: "${this._gammaLastMoodState}"`
        );
      }
    }

    // Fade in alpha when playing, out when idle
    const isPlaying = this.audioElement && !this.audioElement.paused;
    const targetAlpha = isPlaying ? 0.14 : 0;
    g.alpha += (targetAlpha - g.alpha) * 0.015; // slow fade in/out

    // ── Step 5: Apply as CSS custom properties (cheap — composite only) ──
    const panel = this.container?.closest('.music-immersive-lyrics-panel') || this.container;
    if (panel) {
      panel.style.setProperty('--track-gamma-h', `${Math.round(g.h)}`);
      panel.style.setProperty('--track-gamma-s', `${Math.round(g.s)}%`);
      panel.style.setProperty('--track-gamma-l', `${Math.round(g.l)}%`);
      panel.style.setProperty('--track-gamma-alpha', g.alpha.toFixed(3));
    }
  }

  /**
   * Trigger a word color blink — fired when a new word becomes active.
   * Sets a CSS class + custom property that decays over ~200ms via CSS transition.
   */
  _triggerWordBlink(lineIdx, wordIdx) {
    if (lineIdx === this._lastBlinkLineIdx && wordIdx === this._lastBlinkWordIdx) return;
    this._lastBlinkLineIdx = lineIdx;
    this._lastBlinkWordIdx = wordIdx;
    this._wordBlinkAlpha = 1;

    // Set blink CSS on lyrics container — a single property drives the ambient flash
    const panel = this.container?.closest('.music-immersive-lyrics-panel') || this.container;
    if (panel) {
      panel.style.setProperty('--word-blink', '1');
      // Decay via JS (faster than CSS transition for sync with rAF)
      // The rAF loop will handle decay
    }

    // Dispatch event so visualizer can react to word hits
    document.dispatchEvent(new CustomEvent('lyricsWordBlink', {
      detail: {
        lineIdx,
        wordIdx,
        gamma: { ...this._trackGamma },
      },
    }));
  }

  /**
   * Per-frame word blink decay — called from rAF loop.
   */
  _decayWordBlink() {
    if (this._wordBlinkAlpha <= 0.01) return;
    this._wordBlinkAlpha *= this._wordBlinkDecay;
    if (this._wordBlinkAlpha < 0.01) this._wordBlinkAlpha = 0;

    const panel = this.container?.closest('.music-immersive-lyrics-panel') || this.container;
    if (panel) {
      panel.style.setProperty('--word-blink', this._wordBlinkAlpha.toFixed(3));
    }
  }

  _handleManualScroll() {
    this.userIsScrolling = true;
    this._scrollGuardActive = true;
    this._cancelLerpScroll();
  }

  /**
   * Task 5: After scroll ends, perform a single batch sync to align
   * all line classes and word states without per-frame overhead.
   */
  _batchSyncAfterScroll() {
    if (this.activeLineIndex < 0) return;
    const idx = this.activeLineIndex;
    for (let i = 0; i < this.lineElements.length; i++) {
      const el = this.lineElements[i];
      if (!el) continue;
      const cl = el.classList;
      cl.remove('active', 'past', 'future', 'future-1', 'future-2', 'future-3', 'future-4');
      if (i === idx) cl.add('active');
      else if (i < idx) cl.add('past');
      else {
        const dist = i - idx;
        cl.add(dist <= 4 ? `future-${dist}` : 'future');
      }
    }
  }

  /**
   * Task 1 (VRAM): Ghost pre-loader — forces GPU texture upload by rendering
   * text fully visible but off-screen (translateX(-9999px)).
   * This guarantees the GPU rasterizes glyphs into VRAM textures.
   */
  _updateGhostPreloader(activeIdx) {
    // DISABLED — ghost preloader causes DOM thrashing that contributes to lag.
    // The 45 lines are already in DOM and GPU-rasterized. No benefit.
    return;
  }

  /**
   * Show an animated info bar when no lyrics are available for the current track.
   * Displays a pulsing progress indicator with track info and generation status.
   */
  _showNoLyricsBar() {
    if (!this.container) return;
    // Remove any previous instance
    this.container.querySelector('.lyrics-no-content')?.remove();
    // Also remove any loading-state stepper to avoid double spinners
    this.container.querySelector('.lyrics-loading-state')?.remove();

    const track = this.currentTrack || {};
    const title = track.title || track.name || '';
    const artist = track.artist || '';
    const lyricsStatus = track.lyricsStatus || 'not_found';

    // Determine display text and icon based on actual BE status
    let statusTitle, statusHint, statusIcon;
    switch (lyricsStatus) {
      case 'queued':
        statusTitle = 'Searching lyrics databases…';
        statusHint = 'Checking LRCLIB and online sources ♪';
        statusIcon = `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
        </svg>`;
        break;
      case 'generating':
        statusTitle = 'Generating lyrics…';
        statusHint = 'Creating word-level timestamps with AI ♪';
        statusIcon = `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
          <path d="M4 10v4"/><path d="M8 6v12"/><path d="M12 3v18"/><path d="M16 6v12"/><path d="M20 10v4"/>
        </svg>`;
        break;
      case 'enhancing':
        statusTitle = 'Enhancing lyrics…';
        statusHint = 'Adding word-level timestamps ♪';
        statusIcon = `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
          <path d="M15 4V2"/><path d="M15 16v-2"/><path d="M8 9h2"/><path d="M20 9h2"/><path d="M17.8 11.8 19 13"/><path d="M15 9h0"/><path d="M17.8 6.2 19 5"/><path d="M3 21l9-9"/><path d="M12.2 6.2 11 5"/>
        </svg>`;
        break;
      case 'not_found':
      default:
        statusTitle = 'Lyrics not available';
        statusHint = 'Enjoy the music ♪';
        statusIcon = `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
          <path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/>
        </svg>`;
        break;
    }

    const isLoading = lyricsStatus === 'queued' || lyricsStatus === 'generating' || lyricsStatus === 'enhancing';

    const bar = document.createElement('div');
    bar.className = 'lyrics-no-content';
    bar.innerHTML = `
      <div class="lyrics-no-content-inner">
        <div class="lyrics-no-content-icon ${isLoading ? 'is-loading' : ''}">${statusIcon}</div>
        <div class="lyrics-no-content-text">
          <span class="lyrics-no-content-title">${statusTitle}</span>
          <span class="lyrics-no-content-sub">${title && artist ? `${artist} — ${title}` : title || 'This track has no synced lyrics'}</span>
        </div>
        ${isLoading ? `<div class="lyrics-no-content-progress"><div class="lyrics-no-content-bar"></div></div>` : ''}
        <span class="lyrics-no-content-hint">${statusHint}</span>
      </div>
    `;

    this.container.appendChild(bar);
    // Trigger entrance animation on next frame
    requestAnimationFrame(() => bar.classList.add('is-visible'));
  }

  /**
   * Render ALL lyrics lines into DOM at once. No chunking, no streaming,
   * no content-visibility. 45 lines is trivial — just bake them all to GPU.
   */
  _buildChunkedDOM() {
    if (!this.container) return;

    // No lyrics — show animated info bar
    if (!this.timeline.length) {
      this._showNoLyricsBar();
      return;
    }
    // Remove any existing no-lyrics bar
    this.container.querySelector('.lyrics-no-content')?.remove();

    const shell = this.container.closest('.music-immersive-shell');
    this._streamAbortController?.abort();
    this._chunks = [];

    // Build entire DOM in a DocumentFragment (no reflow during construction)
    const frag = document.createDocumentFragment();

    for (let index = 0; index < this.timeline.length; index++) {
      const entry = this.timeline[index];
      let el;
      if (entry.type === 'vocal_cue') {
        el = document.createElement('div');
        el.className = 'lyrics-intro-dots';
        el.dataset.lineIndex = String(index);
        el.innerHTML = '<span class="dot"></span><span class="dot"></span><span class="dot"></span>';
      } else {
        el = document.createElement('p');
        const isBgLine = entry.text && /^\s*\(/.test(entry.text) && /\)\s*$/.test(entry.text);
        el.className = `lyrics-line${isBgLine ? ' is-bg-vocal' : ''}`;
        el.dataset.lineIndex = String(index);
        el.dataset.start = String(entry.start);

        let words = entry.words || [];
        // Fallback: generate word spans from text if words array is empty
        if (words.length === 0 && entry.text) {
          const ws = this._splitTextForTiming(String(entry.text));
          const dur = (entry.end || 0) - (entry.start || 0);
          const totalChars = ws.reduce((s, w) => s + w.length, 0) || 1;
          let cursor = entry.start || 0;
          words = ws.map(w => {
            const ratio = w.length / totalChars;
            const wDur = dur * ratio;
            const wStart = cursor;
            cursor += wDur;
            return { text: w, start: wStart, end: cursor };
          });
          entry.words = words;
        }
        const wordsHtml = words.map((w, wi) => {
          const isStretch = w.isVocalStretch || w.emphasis || w.is_extra || w.stress || w.bold;
          const isBgVocal = entry.text && /^\s*\(/.test(entry.text) && /\)\s*$/.test(entry.text);
          const bgClass = isBgVocal ? ' is-bg-vocal' : '';
          const stretchAttr = isStretch ? ' data-vocal-stretch="true"' : '';
          const styleAttr = w.style && w.style !== 'normal' ? ` data-style="${w.style}"` : '';
          const timeAttrs = `${w.start != null ? ` data-start="${w.start}"` : ''}${w.end != null ? ` data-end="${w.end}"` : ''}`;
          return `<span class="lyric-word${bgClass}"${stretchAttr}${styleAttr}${timeAttrs} data-word-index="${wi}">${esc(w.text)}</span>`;
        }).join(' ');
        el.innerHTML = wordsHtml;

        // Translation text (populated by setTranslations)
        const transIdx = this.timeline.slice(0, index + 1).filter(e => e.type !== 'vocal_cue').length - 1;
        if (entry.type !== 'vocal_cue') {
          const transSpan = document.createElement('span');
          transSpan.className = 'lyrics-translation';
          transSpan.dataset.transIndex = String(transIdx);
          if (this._translations[transIdx]) {
            transSpan.textContent = this._translations[transIdx];
          }
          el.appendChild(transSpan);
        }
      }
      frag.appendChild(el);
    }

    // Footer
    const artist = this.currentTrack?.artist || this.currentTrack?.title || '';
    const album = this.currentTrack?.album || '';
    if (artist || album) {
      const footer = document.createElement('div');
      footer.className = 'lyrics-footer';
      footer.innerHTML = `<p class="footer-primary">${esc(artist)}</p>${album ? `<p class="footer-secondary">${esc(album)}</p>` : ''}`;
      frag.appendChild(footer);
    }

    // Single DOM write — one reflow, one paint, done forever
    this.container.innerHTML = '';
    this.container.appendChild(frag);

    // Cache all element references
    this.lineElements = [];
    this._wordSpansCache = [];
    this._dotSpansCache = [];

    for (let i = 0; i < this.timeline.length; i++) {
      const el = this.container.querySelector(`[data-line-index="${i}"]`);
      this.lineElements.push(el);
      if (this.timeline[i].type === 'vocal_cue') {
        this._wordSpansCache.push(null);
        this._dotSpansCache.push(el ? Array.from(el.querySelectorAll('.dot')) : []);
      } else {
        this._wordSpansCache.push(el ? Array.from(el.querySelectorAll('.lyric-word')) : []);
        this._dotSpansCache.push(null);
      }
    }

    shell?.classList.add('has-lyrics');

    // Pre-assign all line classes so nothing starts invisible (opacity: 0.15)
    // Find closest line to current audio time for initial centering
    const now = this.audioElement?.currentTime || 0;
    let initialIdx = 0;
    for (let i = 0; i < this.timeline.length; i++) {
      if (now >= this.timeline[i].start) initialIdx = i;
      else break;
    }
    this._assignAllLineClasses(initialIdx);
    // Disable transitions on initial active line to prevent flicker on load
    const initialLineEl = this.lineElements[initialIdx];
    if (initialLineEl) {
      initialLineEl.style.transition = 'none';
      requestAnimationFrame(() => { initialLineEl.style.transition = ''; });
    }
    // Also mark all past lines' words as filled (past)
    for (let i = 0; i < initialIdx; i++) {
      const spans = this._wordSpansCache[i];
      if (!spans) continue;
      for (let j = 0; j < spans.length; j++) {
        spans[j].classList.add('past');
        spans[j].style.setProperty('--progress', '100%');
      }
    }
    // Mark the active line's words to correct state immediately (avoids first-word blink on overlay open)
    {
      const activeSpans = this._wordSpansCache[initialIdx];
      const activeWords = this.timeline[initialIdx]?.words;
      if (activeSpans && activeWords) {
        for (let j = 0; j < activeWords.length; j++) {
          const span = activeSpans[j];
          if (!span) continue;
          const w = activeWords[j];
          if (now >= w.end) {
            span.classList.add('past');
            span.style.setProperty('--progress', '100%');
          } else if (now >= w.start) {
            span.classList.add('active');
            const p = Math.min(100, Math.max(0, ((now - w.start) / (w.end - w.start)) * 100));
            span.style.setProperty('--progress', `${p}%`);
          }
          // else: word is in the future, leave it bare (default 0%)
        }
      }
    }

    // Immediately center on the initial active line (no animation)
    const scrollParent = this.container?.closest('.music-immersive-lyrics-panel') || this.container;
    const initialLine = this.lineElements[initialIdx];
    if (scrollParent && initialLine) {
      const lineTop = initialLine.offsetTop;
      const lineHeight = initialLine.offsetHeight;
      const containerHeight = scrollParent.clientHeight;
      scrollParent.scrollTop = Math.max(0, lineTop - containerHeight / 2 + lineHeight / 2);
    }
    // DEBUG: Log build result
    console.log(`[lyrics-sync] _buildChunkedDOM DONE: lines=${this.lineElements.length} initialIdx=${initialIdx} panelH=${scrollParent?.clientHeight}`);

    // Bind context menu for Genius-style tooltips
    this._bindContextMenu();

    // Bind inline translation editing (click to edit)
    this._bindTranslationEditing();
  }

  /**
   * Set translation strings — parallel array to non-vocal-cue timeline entries.
   * Updates existing DOM elements without rebuilding.
   */
  setTranslations(translations) {
    console.log(`[LyricsEngine] setTranslations called with ${translations?.length || 0} translations`);
    this._translations = Array.isArray(translations) ? translations : [];
    if (!this.container) {
      console.warn(`[LyricsEngine] setTranslations: no container, translations will not render`);
      return;
    }
    const spans = this.container.querySelectorAll('.lyrics-translation');
    console.log(`[LyricsEngine] Found ${spans.length} translation spans in DOM`);
    spans.forEach((span) => {
      const idx = parseInt(span.dataset.transIndex, 10);
      if (!isNaN(idx) && this._translations[idx]) {
        span.textContent = this._translations[idx];
      }
    });
    console.log(`[LyricsEngine] Applied ${this._translations.filter(Boolean).length} non-empty translations`);
  }

  /**
   * Inline translation editing — click on translation text to edit.
   */
  _bindTranslationEditing() {
    if (!this.container) return;
    this.container.addEventListener('click', (e) => {
      const transEl = e.target.closest('.lyrics-translation');
      if (!transEl || !this.container.classList.contains('show-translations')) return;
      if (transEl.querySelector('input')) return; // Already editing

      const currentText = transEl.textContent;
      const idx = parseInt(transEl.dataset.transIndex, 10);

      const input = document.createElement('input');
      input.type = 'text';
      input.value = currentText;
      input.className = 'lyrics-translation-input';
      input.style.cssText = 'width:100%;background:rgba(255,255,255,0.08);border:1px solid rgba(132,182,255,0.4);border-radius:6px;color:#fff;font-size:inherit;font-style:inherit;padding:4px 8px;outline:none;';

      transEl.textContent = '';
      transEl.appendChild(input);
      input.focus();
      input.select();

      const commit = () => {
        const newText = input.value.trim();
        transEl.textContent = newText || currentText;
        if (!isNaN(idx)) this._translations[idx] = newText || currentText;
        // Persist edit to server
        this._saveTranslationEdit?.();
      };

      input.addEventListener('blur', commit, { once: true });
      input.addEventListener('keydown', (ke) => {
        if (ke.key === 'Enter') { ke.preventDefault(); input.blur(); }
        if (ke.key === 'Escape') { transEl.textContent = currentText; }
      });
    });
  }

  /**
   * Bind right-click on lyric words for Genius-style AI context tooltips.
   */
  _bindContextMenu() {
    if (!this.container) return;
    this.container.addEventListener('contextmenu', async (e) => {
      const wordEl = e.target.closest('.lyric-word');
      if (!wordEl) return;
      e.preventDefault();

      const word = wordEl.textContent.trim();
      const lineEl = wordEl.closest('.lyrics-line');
      const lineText = lineEl ? Array.from(lineEl.querySelectorAll('.lyric-word')).map(w => w.textContent).join(' ') : word;

      // Show loading tooltip
      this._showContextTooltip(e.clientX, e.clientY, '✨ Analyzing...');

      try {
        const res = await fetch('/api/lyrics/explain-word', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            word,
            lineText,
            songTitle: this.currentTrack?.title || this.currentTrack?.name || '',
            artist: this.currentTrack?.artist || '',
          }),
        });
        const data = await res.json();
        if (data.explanation) {
          this._showContextTooltip(e.clientX, e.clientY, data.explanation);
        } else {
          this._hideContextTooltip();
        }
      } catch {
        this._hideContextTooltip();
      }
    });

    // Hide tooltip on click anywhere
    document.addEventListener('click', () => this._hideContextTooltip(), { passive: true });
  }

  _showContextTooltip(x, y, text) {
    if (!this._contextTooltip) {
      this._contextTooltip = document.createElement('div');
      this._contextTooltip.className = 'lyrics-context-tooltip';
      document.body.appendChild(this._contextTooltip);
    }
    this._contextTooltip.textContent = text;
    this._contextTooltip.style.display = 'block';

    // Position near cursor, clamped to viewport
    const maxW = 320;
    this._contextTooltip.style.maxWidth = `${maxW}px`;
    const tooltipX = Math.min(x + 12, window.innerWidth - maxW - 16);
    const tooltipY = Math.max(8, y - 48);
    this._contextTooltip.style.left = `${tooltipX}px`;
    this._contextTooltip.style.top = `${tooltipY}px`;
  }

  _hideContextTooltip() {
    if (this._contextTooltip) {
      this._contextTooltip.style.display = 'none';
    }
  }

  /**
   * Assign classes to ALL lines based on a reference active index.
   * Ensures every line has a proper visibility class from the start.
   */
  _assignAllLineClasses(activeIdx) {
    const prevIdx = this._prevActiveIndex ?? -1;

    // Optimization: if moving forward by 1, only update the 2 changed lines + nearby future lines
    if (prevIdx >= 0 && activeIdx === prevIdx + 1) {
      // Previous active → past
      const prevEl = this.lineElements[prevIdx];
      if (prevEl) {
        prevEl.classList.remove('active', 'future', 'future-1', 'future-2', 'future-3', 'future-4');
        prevEl.classList.add('past');
      }
      // New active
      const activeEl = this.lineElements[activeIdx];
      if (activeEl) {
        activeEl.classList.remove('past', 'future', 'future-1', 'future-2', 'future-3', 'future-4');
        activeEl.classList.add('active');
      }
      // Update future-N classes (only the few that shifted)
      for (let d = 1; d <= 5; d++) {
        const i = activeIdx + d;
        if (i >= this.lineElements.length) break;
        const el = this.lineElements[i];
        if (!el) continue;
        el.classList.remove('future', 'future-1', 'future-2', 'future-3', 'future-4');
        el.classList.add(d <= 4 ? `future-${d}` : 'future');
      }
      return;
    }

    // Full reassign (seek, initial, or non-sequential transition)
    for (let i = 0; i < this.lineElements.length; i++) {
      const el = this.lineElements[i];
      if (!el) continue;
      const cl = el.classList;
      cl.remove('active', 'past', 'future', 'future-1', 'future-2', 'future-3', 'future-4');
      if (i === activeIdx) {
        cl.add('active');
      } else if (i < activeIdx) {
        cl.add('past');
      } else {
        const dist = i - activeIdx;
        cl.add(dist <= 4 ? `future-${dist}` : 'future');
      }
    }
  }

  /**
   * Task 2 (VRAM): Promote only active + next chunk to GPU layer.
   */
  _updateChunkPromotion(activeIdx) {
    // No-op — all lines rendered at once, no chunk promotion needed
  }

  /**
   * Spring-driven cross-fade between a lyric line and a vocal_cue (or vice versa).
   * The outgoing element smoothly fades to its resting state while the incoming
   * element smoothly fades in — both driven by a single interruptible spring.
   */
  _springCrossFade(outIdx, inIdx) {
    this._crossFadeHandle?.cancel();

    const outEl = this.lineElements[outIdx];
    const inEl = this.lineElements[inIdx];
    if (!outEl || !inEl) return;

    // Disable CSS transitions during spring drive to avoid fighting
    outEl.style.transition = 'none';
    inEl.style.transition = 'none';

    // Set initial state: outgoing fully visible, incoming hidden
    inEl.style.opacity = '0';
    inEl.style.filter = 'blur(4px)';
    inEl.style.transform = 'scale(0.95) translateY(12px)';

    this._crossFadeHandle = scheduler.animate('lyrics-cue-crossfade', {
      spring: this._cueSpring,
      from: 0,
      to: 1,
      onUpdate: (v) => {
        // Incoming: fade in
        inEl.style.opacity = String(v);
        const blur = (1 - v) * 4;
        const scale = 0.95 + v * 0.1;
        const ty = (1 - v) * 12;
        inEl.style.filter = blur < 0.3 ? 'none' : `blur(${blur.toFixed(1)}px)`;
        inEl.style.transform = `scale(${scale.toFixed(3)}) translateY(${ty.toFixed(1)}px)`;

        // Outgoing: fade out
        outEl.style.opacity = String(1 - v * 0.9); // fade to 0.1
        const outBlur = v * 2;
        outEl.style.filter = outBlur < 0.3 ? 'none' : `blur(${outBlur.toFixed(1)}px)`;
        const outTy = v * -20;
        outEl.style.transform = `scale(${(1 - v * 0.05).toFixed(3)}) translateY(${outTy.toFixed(1)}px)`;
      },
      onComplete: () => {
        // Re-enable CSS transitions and clear inline styles so classes take over
        outEl.style.transition = '';
        inEl.style.transition = '';
        outEl.style.opacity = '';
        outEl.style.filter = '';
        outEl.style.transform = '';
        inEl.style.opacity = '';
        inEl.style.filter = '';
        inEl.style.transform = '';
        this._crossFadeHandle = null;
      },
    });
  }

  /**
   * Task 4 (VRAM): FPS monitoring — drop to low-precision mode if FPS < 90.
   * Low-precision = no word-level fill, only line-level active highlight.
   * Also strips text-shadow and demotes non-active chunks from GPU.
   */
  _updateFPSTracking(timestamp) {
    if (this._lastFrameTime > 0) {
      const delta = timestamp - this._lastFrameTime;
      const fps = 1000 / delta;
      this._fpsHistory.push(fps);
      if (this._fpsHistory.length > 60) this._fpsHistory.shift();

      // Check average FPS every 60 frames (~1s of data) to avoid reacting to brief dips
      if (this._fpsHistory.length === 60) {
        const avgFps = this._fpsHistory.reduce((a, b) => a + b, 0) / 60;
        if (avgFps < 15 && !this._lowPrecisionMode) {
          // Only enter low mode if we've been tracking for at least 8s (ignore startup/transitions/overlay open)
          if (!this._fpsTrackingStart) this._fpsTrackingStart = performance.now();
          const trackingAge = performance.now() - this._fpsTrackingStart;
          if (trackingAge > 8000) {
            this._lowPrecisionMode = true;
            this._lowPrecisionSince = performance.now();
            debug.log(`[lyrics] ⚠️ FPS dropped to ${avgFps.toFixed(0)}, entering Low-Precision Mode`);
            this.container?.classList.add('lyrics-low-precision');
            // Tell visualizer to lower quality — text animation must never degrade
            document.dispatchEvent(new CustomEvent('lyricsPerformance', { detail: { fps: avgFps, throttle: true } }));
            for (let c = 0; c < this._chunks.length; c++) {
              if (c !== this._activeChunkIdx) {
                this._chunks[c]?.el?.classList.remove('chunk-active', 'chunk-next');
              }
            }
          }
        } else if (avgFps >= 30 && this._lowPrecisionMode) {
          const elapsed = performance.now() - this._lowPrecisionSince;
          if (elapsed >= 2000) {
            this._lowPrecisionMode = false;
            debug.log(`[lyrics] ✅ FPS recovered to ${avgFps.toFixed(0)}, exiting Low-Precision Mode`);
            this.container?.classList.remove('lyrics-low-precision');
            // Tell visualizer to restore quality
            document.dispatchEvent(new CustomEvent('lyricsPerformance', { detail: { fps: avgFps, throttle: false } }));
            this._updateChunkPromotion(this.activeLineIndex);
          }
        }
      }
    }
    this._lastFrameTime = timestamp;
    if (!this._fpsTrackingStart) this._fpsTrackingStart = performance.now();
  }

  // IntersectionObserver removed — all lines always in DOM, always "visible" to GPU
  _setupIntersectionObserver() {
    // No-op. All text is baked to GPU at load time.
  }

  _getVocalEnergy() {
    if (!this.analyser || !this._freqData) return 0;
    this.analyser.getByteFrequencyData(this._freqData);
    let sum = 0;
    const start = 10;
    const end = Math.min(40, this._freqData.length);
    for (let i = start; i < end; i++) {
      sum += this._freqData[i];
    }
    return sum / ((end - start) * 255);
  }

  async setTrack(track) {
    this.currentTrack = track;
    const generation = ++this._setTrackGeneration;
    const duration = this.audioElement?.duration || 0;
    const currentTime = this.audioElement?.currentTime || 0;
    const paused = this.audioElement?.paused;
    console.log(`[lyrics-sync] setTrack called: duration=${duration.toFixed(2)} currentTime=${currentTime.toFixed(2)} paused=${paused} hasEnhanced=${!!track?.enhancedLyrics?.timeline?.length} trackTitle="${track?.title || track?.name || '?'}"`);
    console.log(`[lyrics-sync] setTrack container:`, this.container ? `${this.container.tagName}#${this.container.id} inDOM=${document.contains(this.container)} clientH=${this.container.clientHeight}` : 'NULL');

    // Wait for container to have real dimensions (overlay animation may still be running)
    if (this.container && this.container.clientHeight === 0) {
      console.log(`[lyrics-sync] container clientH=0, waiting for layout...`);
      // Ensure the lyrics panel is visible (display:block) by adding has-lyrics early
      const shell = this.container.closest('.music-immersive-shell');
      if (shell && !shell.classList.contains('has-lyrics')) {
        shell.classList.add('has-lyrics');
      }
      await new Promise((resolve) => {
        let attempts = 0;
        const check = () => {
          attempts++;
          if (this.container.clientHeight > 0 || attempts > 40) {
            resolve();
            return;
          }
          requestAnimationFrame(check);
        };
        requestAnimationFrame(check);
      });
      // Check if a newer generation started while we waited
      if (generation !== this._setTrackGeneration) {
        console.log(`[lyrics-sync] setTrack layout wait: stale generation ${generation} vs ${this._setTrackGeneration}, proceeding anyway to avoid missing lyrics`);
        console.log(`[lyrics-sync] container now has clientH=${this.container.clientHeight}`);
        // DON'T return — proceed anyway so lyrics aren't missing.
        // If the newer generation also completes, it will overwrite us (which is fine).
      }
      console.log(`[lyrics-sync] container now has clientH=${this.container.clientHeight}`);
    }


    // ── Task 2: Absolute Cleanup (Kill-Switch) ──
    // Cancel any pending resync from a previous setTrack call
    if (this._resyncTimer) { clearTimeout(this._resyncTimer); this._resyncTimer = null; }
    // Hard reset before any worker calls to prevent stale track artifacts
    this._streamAbortController?.abort();
    this._visibleLines.clear();
    if (this._intersectionObserver) {
      this._intersectionObserver.disconnect();
    }
    if (this.container) {
      this.container.innerHTML = '';
    }
    if (this._ghostContainer) {
      this._ghostContainer.innerHTML = '';
    }
    this._translations = [];
    this.lineElements = [];
    this._wordSpansCache = [];
    this._dotSpansCache = [];
    this._chunks = [];
    this._activeChunkIdx = -1;

    // Show shimmer placeholder while worker processes (visible if >100ms)
    // Task 6: Skip shimmer if user is actively scrolling — it just adds DOM overhead
    let shimmerEl = null;
    const shimmerTimeout = this.userIsScrolling ? null : setTimeout(() => {
      if (this.container && !this.timeline.length) {
        shimmerEl = document.createElement('div');
        shimmerEl.className = 'lyrics-shimmer-placeholder';
        shimmerEl.innerHTML = Array.from({ length: 5 }, () =>
          '<div class="lyrics-shimmer-line"></div>'
        ).join('');
        this.container.appendChild(shimmerEl);
      }
    }, 100);

    // ── Task 1: Try Worker for timeline building ──
    const workerResult = await postToWorker('buildTimeline', { track, duration });

    // Guard: if a newer setTrack call started while we awaited, abort this one
    if (generation !== this._setTrackGeneration) {
      if (shimmerTimeout) clearTimeout(shimmerTimeout);
      if (shimmerEl) shimmerEl.remove();
      console.log(`[lyrics-sync] setTrack ABORTED (stale generation ${generation} vs ${this._setTrackGeneration})`);
      return;
    }

    if (shimmerTimeout) clearTimeout(shimmerTimeout);
    if (shimmerEl) {
      shimmerEl.remove();
      shimmerEl = null;
    }

    if (workerResult) {
      this.timeline = workerResult;
    } else {
      // Fallback: main-thread processing
      if (Array.isArray(track?.enhancedLyrics?.timeline) && track.enhancedLyrics.timeline.length) {
        const trimmed = cleanTimings(track.enhancedLyrics.timeline);
        this.timeline = buildAuthoritativeTimeline(trimmed, duration);
      } else {
        const rawLyrics = Array.isArray(track?.lyrics)
          ? track.lyrics
          : typeof track?.lyrics === 'string'
            ? track.lyrics.split('\n')
            : getFallbackLyrics(track);
        this.timeline = buildLyricTimeline(rawLyrics, duration);
      }
    }

    this.activeLineIndex = -1;
    this._lastDebugLogTime = -1;
    this._activeChunkIdx = -1;
    this._lowPrecisionMode = false;
    this._fpsHistory = [];
    this._fpsTrackingStart = 0; // Reset FPS tracking — give grace period for FLIP/shader warmup
    this._lowPrecisionSince = 0;
    this._catchUpAnimation = null;

    // Reset Mood Vault — new track, fresh gamma
    this._gammaConfidence = 0;
    this._gammaLastMoodState = null;
    console.log(`[gamma-vault] 🎵 NEW TRACK — Mood Vault reset | confidence=0, state=null, waiting for visualizer mood`);

    // DEBUG: Log timeline state after build
    const nowAfterBuild = this.audioElement?.currentTime || 0;
    console.log(`[lyrics-sync] Timeline built: ${this.timeline.length} entries, audioTime now=${nowAfterBuild.toFixed(2)}, duration=${this.audioElement?.duration || 0}`);
    if (this.timeline.length > 0) {
      console.log(`[lyrics-sync] First entry: type=${this.timeline[0].type} start=${this.timeline[0].start.toFixed(2)} end=${this.timeline[0].end.toFixed(2)} text="${(this.timeline[0].text||'').substring(0,30)}"`);
      console.log(`[lyrics-sync] Last entry: type=${this.timeline[this.timeline.length-1].type} start=${this.timeline[this.timeline.length-1].start.toFixed(2)} end=${this.timeline[this.timeline.length-1].end.toFixed(2)}`);
      // Find what line should be active right now
      let expectedIdx = -1;
      for (let i = 0; i < this.timeline.length; i++) {
        if (nowAfterBuild >= this.timeline[i].start && nowAfterBuild < this.timeline[i].end) { expectedIdx = i; break; }
      }
      if (expectedIdx === -1) {
        for (let i = this.timeline.length - 1; i >= 0; i--) {
          if (nowAfterBuild >= this.timeline[i].end) { expectedIdx = i; break; }
        }
      }
      console.log(`[lyrics-sync] Expected active line at build time: idx=${expectedIdx}`);
    }

    // Task 2: Use chunked DOM rendering (micro-batched)
    this._buildChunkedDOM();
    // Force layout — push all text into GPU memory before user scrolls
    if (this.container) void this.container.offsetHeight;
    this.start();
    this.updateActiveLine();
    console.log(`[lyrics-sync] setTrack DONE: activeIdx=${this.activeLineIndex} frameId=${this.frameId} lineElements=${this.lineElements.length} audioTime=${this.audioElement?.currentTime?.toFixed(2)}`);

    // On reload, the lyrics panel may not be fully laid out yet (clientH=0).
    // Poll until container has real dimensions, then re-sync scroll position.
    const resyncScroll = () => {
      if (!this.container || !this.lineElements.length) return;
      // Skip resync when ChromicEditor pro mode is active
      if (document.body.classList.contains('chromic-pro-active')) return;
      const scrollParent = this.container.closest('.music-immersive-lyrics-panel') || this.container;
      if (scrollParent.clientHeight === 0) {
        // Still not visible — try again
        this._resyncTimer = setTimeout(resyncScroll, 100);
        return;
      }
      // Container now has real dimensions — force full resync
      this._lastNow = -1;
      this.activeLineIndex = -1;
      this.updateActiveLine();
      // Mark all past lines' words as filled
      const activeIdx = this.activeLineIndex;
      if (activeIdx > 0) {
        for (let i = 0; i < activeIdx; i++) {
          const spans = this._wordSpansCache[i];
          if (!spans) continue;
          for (let j = 0; j < spans.length; j++) {
            if (!spans[j].classList.contains('past')) {
              spans[j].classList.add('past');
              spans[j].style.setProperty('--progress', '100%');
            }
          }
        }
      }
      const activeLine = this.lineElements[this.activeLineIndex];
      if (activeLine) {
        const lineTop = activeLine.offsetTop;
        const lineHeight = activeLine.offsetHeight;
        const containerHeight = scrollParent.clientHeight;
        this._isAutoScrolling = true;
        scrollParent.scrollTop = Math.max(0, lineTop - containerHeight / 2 + lineHeight / 2);
        clearTimeout(this._autoScrollResetTimer);
        this._autoScrollResetTimer = setTimeout(() => { this._isAutoScrolling = false; }, 150);
        console.log(`[lyrics-sync] resyncScroll: scrolled to activeIdx=${this.activeLineIndex} scrollTop=${scrollParent.scrollTop} containerH=${containerHeight}`);
      }
    };
    this._resyncTimer = setTimeout(resyncScroll, 100);
  }

  render() {
    // Kept as fallback — _buildChunkedDOM is the primary renderer now
    if (!this.container) return;
    const shell = this.container.closest('.music-immersive-shell');

    if (!this.timeline.length) {
      shell?.classList.remove('has-lyrics');
      const title = this.currentTrack?.title || this.currentTrack?.name || '';
      const artist = this.currentTrack?.artist || '';
      const album = this.currentTrack?.album || '';
      const year = this.currentTrack?.year;
      const albumLine = album ? `<p class="lyrics-empty-album">${esc(album)}${year ? ` · ${year}` : ''}</p>` : (year ? `<p class="lyrics-empty-album">${year}</p>` : '');

      this.container.innerHTML = `
        <div class="lyrics-empty">
          <p class="lyrics-empty-title">${esc(title) || 'Unknown Track'}</p>
          ${artist ? `<p class="lyrics-empty-artist">${esc(artist)}</p>` : ''}
          ${albumLine}
          <p class="lyrics-empty-hint">No lyrics available</p>
        </div>
      `;
      this.lineElements = [];
      this._wordSpansCache = [];
      this._dotSpansCache = [];
      return;
    }

    // If timeline exists, delegate to chunked builder
    this._buildChunkedDOM();
  }

  updateActiveLine() {
    if (!this.timeline.length || !this.lineElements.length) {
      return;
    }

    const now = (() => {
      const raw = (this.audioElement?.currentTime || 0) + (this.syncOffset || 0);
      // Smooth catch-up interpolation: when Tauri's hardware drifted ahead after seek,
      // interpolate the display time so lyrics glide to the real position smoothly
      if (this._catchUpAnimation) {
        const ca = this._catchUpAnimation;
        const elapsed = performance.now() - ca.startTime;
        if (elapsed >= ca.duration) {
          this._catchUpAnimation = null; // done catching up
          return raw;
        }
        // Ease-out: fast start, gentle landing
        const t = elapsed / ca.duration;
        const ease = 1 - (1 - t) * (1 - t);
        return ca.fromTime + (raw - ca.fromTime) * ease;
      }
      return raw;
    })();

    // DEBUG: Log sync state every 2 seconds
    if (!this._lastSyncDebugTime || now - this._lastSyncDebugTime > 2) {
      this._lastSyncDebugTime = now;
      const firstStart = this.timeline[0]?.start;
      const lastEnd = this.timeline[this.timeline.length - 1]?.end;
      console.log(`[lyrics-sync] audioTime=${now.toFixed(2)} activeIdx=${this.activeLineIndex} timelineRange=[${firstStart?.toFixed(2)}..${lastEnd?.toFixed(2)}] lines=${this.timeline.length} paused=${this.audioElement?.paused}`);
      if (this.activeLineIndex >= 0 && this.activeLineIndex < this.timeline.length) {
        const active = this.timeline[this.activeLineIndex];
        console.log(`[lyrics-sync] activeLine: start=${active.start.toFixed(2)} end=${active.end.toFixed(2)} text="${(active.text || '').substring(0, 40)}"`);
      }
    }

    // Binary search for active timeline entry
    let nextIndex = -1;
    let lo = 0, hi = this.timeline.length - 1;
    while (lo <= hi) {
      const mid = (lo + hi) >> 1;
      const entry = this.timeline[mid];
      if (now >= entry.start && now < entry.end) {
        nextIndex = mid;
        break;
      } else if (now < entry.start) {
        hi = mid - 1;
      } else {
        lo = mid + 1;
      }
    }
    if (nextIndex === -1 && this.timeline.length > 0) {
      if (now >= this.timeline[this.timeline.length - 1].end) {
        // Past the end — keep last line active
        nextIndex = this.timeline.length - 1;
      } else if (now > 0) {
        // In a gap between lines — find the last line that ended before now
        // This keeps the previous line active through small gaps
        for (let i = this.timeline.length - 1; i >= 0; i--) {
          if (now >= this.timeline[i].end) {
            nextIndex = i;
            break;
          }
        }
        // If still -1 but we have a previous active, keep it
        if (nextIndex === -1 && this.activeLineIndex >= 0) {
          nextIndex = this.activeLineIndex;
        }
      }
    }

    const lineChanged = nextIndex !== this.activeLineIndex;

    if (lineChanged) {
      const prevIdx = this.activeLineIndex;
      this.activeLineIndex = nextIndex;

      if (nextIndex === -1) {
        this.container?.classList.add('lyrics-dead-zone');
        this._prevActiveIndex = -1;
        return;
      }
      this.container?.classList.remove('lyrics-dead-zone');

      // Task 2: Update chunk GPU promotion
      this._updateChunkPromotion(nextIndex);

      // Task 1: Update ghost pre-loader (every 5 lines to avoid thrashing)
      if (nextIndex % 5 === 0) {
        requestAnimationFrame(() => this._updateGhostPreloader(nextIndex));
      }

      // ── Check if we need a catch-up animation (entering line mid-way) ──
      // Skip catch-up animation on seek-back, after overlay open, or fresh start — show correct state immediately
      const isSeekBack = prevIdx >= 0 && nextIndex < prevIdx;
      const justResumed = this._lastNow === -1;
      const freshStart = this._freshStart;
      if (freshStart) this._freshStart = false;
      const entry = this.timeline[nextIndex];
      const wordsInEntry = entry?.words;
      const spans = this._wordSpansCache[nextIndex];
      if (wordsInEntry && spans && wordsInEntry.length > 1 && !isSeekBack && !justResumed && !freshStart) {
        // Find how many words are already past
        let pastWordCount = 0;
        for (let i = 0; i < wordsInEntry.length; i++) {
          if (now >= wordsInEntry[i].end) pastWordCount++;
          else break;
        }
        // If we're entering mid-line (>25% of words already past), do a catch-up sweep
        if (pastWordCount > wordsInEntry.length * 0.25 && pastWordCount > 1) {
          this._catchUpAnimation = {
            lineIdx: nextIndex,
            startTime: performance.now(),
            duration: 350, // ms for the sweep
            wordCount: pastWordCount,
          };
        } else {
          this._catchUpAnimation = null;
        }
      } else {
        this._catchUpAnimation = null;
      }

      // ── Assign classes to ALL lines — no windowing, no scroll guard ──
      {
        // Spring cross-fade for line↔vocal_cue transitions
        const prevEntry = prevIdx >= 0 ? this.timeline[prevIdx] : null;
        const nextEntry = this.timeline[nextIndex];
        const isCueTransition = prevEntry && nextEntry &&
          ((prevEntry.type === 'vocal_cue') !== (nextEntry.type === 'vocal_cue'));

        if (isCueTransition) {
          this._springCrossFade(prevIdx, nextIndex);
        } else {
          // Cancel any running cross-fade and clear leftover inline styles
          if (this._crossFadeHandle) {
            this._crossFadeHandle.cancel();
            this._crossFadeHandle = null;
            // Clear inline styles that _springCrossFade sets — they block CSS class transitions
            for (const i of [prevIdx, prevIdx - 1, prevIdx + 1, nextIndex]) {
              const el = this.lineElements[i];
              if (el) {
                el.style.transition = '';
                el.style.opacity = '';
                el.style.filter = '';
                el.style.transform = '';
              }
            }
            console.log('[lyrics-anim] cleared cross-fade inline styles for line transition');
          }
        }

        this._assignAllLineClasses(nextIndex);

        // Defer word resets via requestIdleCallback
        const linesToReset = new Set();
        if (prevIdx >= 0) {
          linesToReset.add(prevIdx);
          for (let i = Math.max(0, prevIdx - 1); i <= Math.min(this._wordSpansCache.length - 1, prevIdx + 1); i++) {
            if (i !== nextIndex) linesToReset.add(i);
          }
        } else {
          // Initial transition (prevIdx === -1): mark ALL past lines
          for (let i = 0; i < nextIndex; i++) {
            linesToReset.add(i);
          }
        }

        const resetWork = () => {
          if (isSeekBack || prevIdx === -1 || freshStart) {
            // Seek-back or initial: reset ALL lines to correct state
            for (let i = 0; i < this._wordSpansCache.length; i++) {
              const spans = this._wordSpansCache[i];
              if (!spans) continue;
              if (i < nextIndex) {
                for (let j = 0; j < spans.length; j++) {
                  if (!spans[j].classList.contains('past')) {
                    spans[j].classList.remove('active');
                    spans[j].classList.add('past');
                    spans[j].style.setProperty('--progress', '100%');
                  }
                }
              } else if (i > nextIndex) {
                for (let j = 0; j < spans.length; j++) {
                  spans[j].classList.remove('active', 'past');
                  spans[j].style.setProperty('--progress', '0%');
                }
              }
            }
          } else {
            // Normal forward transition: only mark the PREVIOUS line as past
            // (all earlier lines were already marked past on their transitions)
            if (prevIdx >= 0) {
              const spans = this._wordSpansCache[prevIdx];
              if (spans) {
                for (let j = 0; j < spans.length; j++) {
                  if (!spans[j].classList.contains('past')) {
                    spans[j].classList.remove('active');
                    spans[j].classList.add('past');
                    spans[j].style.setProperty('--progress', '100%');
                  }
                }
              }
            }
          }
           // Reset the active line's words to correct state immediately (avoids blink)
          const activeSpans = this._wordSpansCache[nextIndex];
          const activeWords = this.timeline[nextIndex]?.words;
          if (activeSpans && activeWords && !this._catchUpAnimation) {
            for (let j = 0; j < activeWords.length; j++) {
              const span = activeSpans[j];
              if (!span) continue;
              const w = activeWords[j];
              if (now >= w.end) {
                span.classList.remove('active');
                span.classList.add('past');
                span.style.setProperty('--progress', '100%');
              } else if (now >= w.start) {
                span.classList.add('active');
                span.classList.remove('past');
                const p = Math.min(100, Math.max(0, ((now - w.start) / (w.end - w.start)) * 100));
                span.style.setProperty('--progress', `${p}%`);
              } else {
                span.classList.remove('active', 'past');
                span.style.setProperty('--progress', '0%');
              }
            }
          }
        };

        // Always run synchronously to avoid 1-frame blink on word states
        resetWork();
      }

      this._prevActiveIndex = nextIndex;

      // Scroll — only on line change, and only if user isn't manually scrolling
      const activeLine = this.lineElements[nextIndex];
      if (activeLine && this.container && !this.userIsScrolling) {
        const scrollParent = this.container.closest('.music-immersive-lyrics-panel') || this.container;
        const lineTop = activeLine.offsetTop;
        const lineHeight = activeLine.offsetHeight;
        const containerHeight = scrollParent.clientHeight;
        const targetScroll = lineTop - containerHeight / 2 + lineHeight / 2;
        this._lerpScrollTo(scrollParent, Math.max(0, targetScroll));
      }
    }

    // Per-frame updates
    if (nextIndex === -1) return;
    const activeEntry = this.timeline[nextIndex];

    // All lines always in DOM — no visibility gating needed

    // Skip per-word progress during external scroll — main page scroll doesn't need
    // lyrics word animation, and these CSS writes cause frame drops
    if (window._chromicScrollGuardianScrolling) return;

    // ── Task 4 (VRAM): Low-precision mode DISABLED ──
    // Per-word animation is a core feature — never skip it.
    // GPU visualizer handles its own FPS throttling independently.

    if (activeEntry?.type === 'vocal_cue') {
      this._updateDots(now, nextIndex);
    } else if (activeEntry?.type === 'line' || activeEntry?.words?.length) {
      this._updateWordProgress(now, nextIndex);
    }
  }

  _updateDots(now, idx) {
    const dots = this._dotSpansCache[idx];
    const entry = this.timeline[idx];
    if (!dots || !entry || !dots.length) return;

    const duration = entry.end - entry.start;
    const totalProgress = Math.max(0, Math.min(100, ((now - entry.start) / duration) * 100));

    for (let i = 0; i < dots.length; i++) {
      const startThreshold = (i / dots.length) * 100;
      const endThreshold = ((i + 1) / dots.length) * 100;

      let dotProgress = 0;
      if (totalProgress > startThreshold) {
        dotProgress = Math.min(100, ((totalProgress - startThreshold) / (endThreshold - startThreshold)) * 100);
      }

      dots[i].style.setProperty('--dot-progress', `${dotProgress}%`);
      const wasActive = dots[i].classList.contains('active');
      const shouldBeActive = dotProgress > 0 && dotProgress < 100;
      const shouldBePast = dotProgress >= 100;

      if (shouldBeActive && !wasActive) {
        dots[i].classList.add('active');
        dots[i].classList.remove('past');
      } else if (shouldBePast && !dots[i].classList.contains('past')) {
        dots[i].classList.remove('active');
        dots[i].classList.add('past');
      } else if (!shouldBeActive && !shouldBePast) {
        dots[i].classList.remove('active', 'past');
      }
    }
  }

  _updateWordProgress(now, idx) {
    if (idx === undefined) idx = this.activeLineIndex;
    if (idx < 0 || idx >= this.timeline.length) return;

    const entry = this.timeline[idx];
    const spans = this._wordSpansCache[idx];
    if (!entry || !spans) return;

    const words = entry.words;
    if (!words || !words.length) return;

    for (let i = 0; i < words.length; i++) {
      const span = spans[i];
      if (!span) continue;

      const w = words[i];

      // Catch-up animation: stagger past words visually instead of instant 100%
      if (this._catchUpAnimation && this._catchUpAnimation.lineIdx === idx && i < this._catchUpAnimation.wordCount) {
        const elapsed = performance.now() - this._catchUpAnimation.startTime;
        const totalDur = this._catchUpAnimation.duration;
        const wordDelay = (i / this._catchUpAnimation.wordCount) * totalDur * 0.7;
        const wordElapsed = elapsed - wordDelay;
        if (wordElapsed <= 0) {
          // Not started yet
          span.style.setProperty('--progress', '0%');
          continue;
        } else if (wordElapsed < totalDur * 0.3) {
          // Animating
          const p = Math.min(100, (wordElapsed / (totalDur * 0.3)) * 100);
          span.style.setProperty('--progress', `${p}%`);
          if (!span.classList.contains('active')) {
            span.classList.add('active');
            span.classList.remove('past');
          }
          continue;
        } else {
          // Done — mark as past and clear catch-up for this word
          span.classList.remove('active');
          span.classList.add('past');
          span.style.setProperty('--progress', '100%');
          // If last catch-up word is done, clear the animation
          if (i === this._catchUpAnimation.wordCount - 1) {
            this._catchUpAnimation = null;
          }
          continue;
        }
      }

      if (now >= w.start && now < w.end) {
        const wordDuration = w.end - w.start;
        const progress = ((now - w.start) / wordDuration) * 100;
        const clamped = Math.min(100, Math.max(0, progress));
        if (!span.classList.contains('active')) {
          // Set progress BEFORE adding class to avoid 1-frame blink at 0%
          span.style.setProperty('--progress', `${clamped}%`);
          span.classList.add('active');
          span.classList.remove('past');
          // ── Word blink: fire color pulse on each new word ──
          this._triggerWordBlink(idx, i);
        } else {
          // Only write style if progress changed by >1% to reduce style recalcs
          const prev = parseFloat(span.style.getPropertyValue('--progress')) || 0;
          if (Math.abs(clamped - prev) > 1) {
            span.style.setProperty('--progress', `${clamped}%`);
          }
        }
      } else if (now >= w.end) {
        if (!span.classList.contains('past')) {
          span.classList.remove('active');
          span.classList.add('past');
          span.style.setProperty('--progress', '100%');
        }
      } else {
        if (span.classList.contains('active') || span.classList.contains('past')) {
          span.classList.remove('active', 'past');
          span.style.setProperty('--progress', '0%');
        }
      }
    }
  }

  /**
   * Custom lerp scroll — sets scrollTop directly per-frame instead of using
   * scrollTo({behavior:'smooth'}) which floods native scroll events and
   * triggers ThreeOrchestrator's document-level blur listener.
   */
  _lerpScrollTo(scrollParent, target) {
    // Disable auto-scroll when ChromicEditor pro mode is active — user controls scroll
    if (document.body.classList.contains('chromic-pro-active')) return;
    this._lerpScrollTarget = target;
    this._lerpScrollParent = scrollParent;
    if (this._lerpScrollId) return;
    this._lerpScrollCurrent = scrollParent.scrollTop;
    this._isAutoScrolling = true;
    clearTimeout(this._autoScrollResetTimer);
    const lerpStep = () => {
      const diff = this._lerpScrollTarget - this._lerpScrollCurrent;
      if (Math.abs(diff) < 1) {
        this._lerpScrollParent.scrollTop = this._lerpScrollTarget;
        this._lerpScrollId = null;
        // Keep _isAutoScrolling true briefly so trailing scroll events are ignored
        clearTimeout(this._autoScrollResetTimer);
        this._autoScrollResetTimer = setTimeout(() => { this._isAutoScrolling = false; }, 150);
        return;
      }
      this._lerpScrollCurrent += diff * 0.25;
      this._lerpScrollParent.scrollTop = this._lerpScrollCurrent;
      this._lerpScrollId = requestAnimationFrame(lerpStep);
    };
    this._lerpScrollId = requestAnimationFrame(lerpStep);
  }

  _cancelLerpScroll() {
    if (this._lerpScrollId) {
      cancelAnimationFrame(this._lerpScrollId);
      this._lerpScrollId = null;
    }
    clearTimeout(this._autoScrollResetTimer);
    this._isAutoScrolling = false;
  }

  start() {
    this.stop();
    if (!this.timeline || this.timeline.length === 0) return;
    console.log(`[lyrics-sync] start() rAF loop starting, timeline=${this.timeline.length} entries, audioTime=${(this.audioElement?.currentTime||0).toFixed(2)}`);

    this._debugFrameCount = 0;
    this._lastFrameTime = 0;
    this._perfLogTime = 0;
    this._freshStart = true; // Skip catch-up on first line transition after start

    // Immediately sync word states to avoid visual blink before first rAF frame
    if (this.activeLineIndex >= 0 && this._wordSpansCache[this.activeLineIndex]) {
      const now = this.audioElement?.currentTime || 0;
      const words = this.timeline[this.activeLineIndex]?.words;
      const spans = this._wordSpansCache[this.activeLineIndex];
      if (words && spans) {
        for (let j = 0; j < words.length; j++) {
          const span = spans[j];
          if (!span) continue;
          const w = words[j];
          if (now >= w.end) {
            span.classList.remove('active');
            span.classList.add('past');
            span.style.setProperty('--progress', '100%');
          } else if (now >= w.start) {
            span.classList.add('active');
            span.classList.remove('past');
            const p = Math.min(100, Math.max(0, ((now - w.start) / (w.end - w.start)) * 100));
            span.style.setProperty('--progress', `${p}%`);
          } else {
            span.classList.remove('active', 'past');
            span.style.setProperty('--progress', '0%');
          }
        }
      }
    }

    const step = (timestamp) => {
      this._debugFrameCount++;

      // FPS throttle — skip frame if too soon
      if (this._maxFps > 0) {
        const minInterval = 1000 / this._maxFps;
        if (timestamp - (this._lastStepTime || 0) < minInterval) {
          this.frameId = requestAnimationFrame(step);
          return;
        }
        this._lastStepTime = timestamp;
      }

      // Task 4: FPS tracking for adaptive precision
      this._updateFPSTracking(timestamp);

      // Skip frame entirely if audio is paused and line hasn't changed
      const audio = this.audioElement;
      if (audio && audio.paused && this._lastNow === audio.currentTime && !this._catchUpAnimation) {
        this.frameId = requestAnimationFrame(step);
        return;
      }
      // Skip frame if we're mid-seek (audio.currentTime is unreliable)
      if (this.isSeeking) {
        this.frameId = requestAnimationFrame(step);
        return;
      }
      this._lastNow = audio?.currentTime ?? -1;

      // During scroll, only update line transitions (cheap) — skip per-word CSS writes
      const _isExternalScrolling = window._chromicScrollGuardianScrolling;
      if (_isExternalScrolling) {
        // Still track active line so we don't miss transitions
        this.updateActiveLine();
      } else {
        this.updateActiveLine();
        // ── Track gamma + word blink (per-frame, cheap CSS property writes) ──
        this._updateTrackGamma();
        this._decayWordBlink();
      }

      this.frameId = requestAnimationFrame(step);
    };

    this.frameId = requestAnimationFrame(step);
  }

  setMaxFps(fps) {
    this._maxFps = fps || 0;
  }

  stop() {
    if (this.frameId) {
      cancelAnimationFrame(this.frameId);
      this.frameId = null;
    }
  }

  destroy() {
    this.stop();
    this._cancelLerpScroll();
    this._streamAbortController?.abort();
    if (this._intersectionObserver) {
      this._intersectionObserver.disconnect();
      this._intersectionObserver = null;
    }
    if (this._ghostContainer) {
      this._ghostContainer.remove();
      this._ghostContainer = null;
    }
    this._chunks = [];
    this._activeChunkIdx = -1;
    this.timeline = [];
    this.lineElements = [];
    this._wordSpansCache = [];
    this._dotSpansCache = [];
    this._visibleLines.clear();
    this.activeLineIndex = -1;
    if (this.container) {
      this.container.innerHTML = '';
    }
  }

  /**
   * Split text into tokens for word-level timing.
   * CJK characters are split individually; Latin/Cyrillic split by whitespace.
   */
  _splitTextForTiming(text) {
    const CJK_RE = /[\u3000-\u303F\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FFF\uFF00-\uFFEF\u2E80-\u2FFF]/;
    if (!CJK_RE.test(text)) {
      return text.split(/\s+/).filter(Boolean);
    }
    // Split into CJK and non-CJK runs
    const tokens = [];
    const parts = text.split(/([\u3000-\u303F\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FFF\uFF00-\uFFEF\u2E80-\u2FFF]+)/);
    for (const part of parts) {
      if (!part) continue;
      if (CJK_RE.test(part)) {
        // Each CJK char is a token; attach trailing punctuation
        const chars = [...part];
        const PUNCT = '、。！？…・ー〜';
        let i = 0;
        while (i < chars.length) {
          let cluster = chars[i];
          while (i + 1 < chars.length && PUNCT.includes(chars[i + 1])) {
            i++;
            cluster += chars[i];
          }
          tokens.push(cluster);
          i++;
        }
      } else {
        for (const w of part.split(/\s+/)) {
          if (w) tokens.push(w);
        }
      }
    }
    return tokens;
  }
}

