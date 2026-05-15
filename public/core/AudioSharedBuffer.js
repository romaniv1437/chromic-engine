/**
 * AudioSharedBuffer — Zero-copy FFT data sharing via SharedArrayBuffer
 *
 * Layout (256 FFT bins + 512 waveform + 4 metadata floats):
 *   [0..255]     — Uint8 frequency data (getByteFrequencyData)
 *   [256..767]   — Uint8 waveform data (getByteTimeDomainData)
 *   [768..771]   — Float32 metadata: [isPlaying, bass, mid, treble]
 */

const FFT_SIZE = 256;
const WAVE_SIZE = 512;
const META_BYTES = 16; // 4 x Float32
const TOTAL_BYTES = FFT_SIZE + WAVE_SIZE + META_BYTES;

export class AudioSharedBuffer {
  constructor() {
    // Try SharedArrayBuffer first (requires COOP/COEP headers), fall back to ArrayBuffer
    try {
      this.buffer = new SharedArrayBuffer(TOTAL_BYTES);
      this.isShared = true;
    } catch {
      this.buffer = new ArrayBuffer(TOTAL_BYTES);
      this.isShared = false;
    }

    this.freqView = new Uint8Array(this.buffer, 0, FFT_SIZE);
    this.waveView = new Uint8Array(this.buffer, FFT_SIZE, WAVE_SIZE);
    this.metaView = new Float32Array(this.buffer, FFT_SIZE + WAVE_SIZE, 4);
  }

  /** Write FFT data from analyser into shared buffer (call on main thread) */
  writeFromAnalyser(analyser, isPlaying = true) {
    if (this.isShared) {
      // SharedArrayBuffer views can't be passed to getByteFrequencyData directly,
      // so copy through a temporary regular Uint8Array
      if (!this._tmpFreq) this._tmpFreq = new Uint8Array(analyser.frequencyBinCount);
      if (!this._tmpWave) this._tmpWave = new Uint8Array(analyser.fftSize);
      analyser.getByteFrequencyData(this._tmpFreq);
      analyser.getByteTimeDomainData(this._tmpWave);
      this.freqView.set(this._tmpFreq.subarray(0, this.freqView.length));
      this.waveView.set(this._tmpWave.subarray(0, this.waveView.length));
    } else {
      analyser.getByteFrequencyData(this.freqView);
      analyser.getByteTimeDomainData(this.waveView);
    }
    this.metaView[0] = isPlaying ? 1 : 0;
  }

  /** Write computed bands into metadata slots */
  writeBands(bass, mid, treble) {
    this.metaView[1] = bass;
    this.metaView[2] = mid;
    this.metaView[3] = treble;
  }

  /** Get transferable reference for postMessage to worker */
  getTransferable() {
    return this.buffer;
  }

  get isPlaying() {
    return this.metaView[0] > 0;
  }
}

export { FFT_SIZE, WAVE_SIZE, TOTAL_BYTES };

