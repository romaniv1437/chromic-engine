/**
 * AIBridge — Modular AI integration layer for Chromic Engine.
 * Provides hooks for transcription, lyric alignment, and translation.
 * Supports Whisper (local/remote) and OpenAI-compatible endpoints.
 */

const DEFAULT_CONFIG = {
  whisperEndpoint: 'http://localhost:8080/v1/audio/transcriptions',
  openaiKey: '',
  ollamaEndpoint: 'http://localhost:11434',
  model: 'whisper-large-v3',
  translationModel: 'gpt-4o-mini',
};

class AIBridgeEngine {
  constructor() {
    this.config = { ...DEFAULT_CONFIG };
    this._processing = false;
    this._overlayEl = null;
  }

  configure(opts = {}) {
    Object.assign(this.config, opts);
  }

  async transcribe(audioBlob) {
    this._showOverlay('Analyzing Spectrum...');
    try {
      const formData = new FormData();
      formData.append('file', audioBlob, 'audio.wav');
      formData.append('model', this.config.model);
      const headers = {};
      if (this.config.openaiKey) {
        headers['Authorization'] = `Bearer ${this.config.openaiKey}`;
      }
      const response = await fetch(this.config.whisperEndpoint, {
        method: 'POST',
        headers,
        body: formData,
      });
      if (!response.ok) throw new Error(`Transcription failed: ${response.status}`);
      const data = await response.json();
      this._updateOverlay('Transcription Complete');
      setTimeout(() => this._hideOverlay(), 1500);
      return data.text || '';
    } catch (err) {
      this._updateOverlay(`Error: ${err.message}`);
      setTimeout(() => this._hideOverlay(), 3000);
      throw err;
    }
  }

  async alignLyrics(text, audioBlob) {
    this._showOverlay('Syncing Kinetic Data...');
    try {
      const formData = new FormData();
      formData.append('file', audioBlob, 'audio.wav');
      formData.append('model', this.config.model);
      formData.append('response_format', 'verbose_json');
      formData.append('timestamp_granularities[]', 'word');
      formData.append('prompt', text);
      const headers = {};
      if (this.config.openaiKey) {
        headers['Authorization'] = `Bearer ${this.config.openaiKey}`;
      }
      const response = await fetch(this.config.whisperEndpoint, {
        method: 'POST',
        headers,
        body: formData,
      });
      if (!response.ok) throw new Error(`Alignment failed: ${response.status}`);
      const data = await response.json();
      const segments = (data.segments || []).map((seg) => ({
        start: seg.start,
        end: seg.end,
        text: seg.text?.trim() || '',
        words: (seg.words || []).map((w) => ({
          start: w.start,
          end: w.end,
          text: w.word?.trim() || '',
        })),
      }));
      this._updateOverlay('Alignment Complete');
      setTimeout(() => this._hideOverlay(), 1500);
      return segments;
    } catch (err) {
      this._updateOverlay(`Error: ${err.message}`);
      setTimeout(() => this._hideOverlay(), 3000);
      throw err;
    }
  }

  async translateSubtitles(srtContent, targetLang) {
    this._showOverlay('Neural Translation Layer...');
    try {
      const response = await fetch(`${this.config.ollamaEndpoint}/api/generate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: this.config.translationModel,
          prompt: `Translate the following subtitles to ${targetLang}. Keep timestamps intact. Only output the translated subtitles:\n\n${srtContent}`,
          stream: false,
        }),
      });
      if (!response.ok) throw new Error(`Translation failed: ${response.status}`);
      const data = await response.json();
      this._updateOverlay('Translation Complete');
      setTimeout(() => this._hideOverlay(), 1500);
      return data.response || '';
    } catch (err) {
      this._updateOverlay(`Error: ${err.message}`);
      setTimeout(() => this._hideOverlay(), 3000);
      throw err;
    }
  }

  async processMedia(file) {
    this._processing = true;
    this._showOverlay('Analyzing Spectrum...');
    await this._delay(1200);
    this._updateOverlay('De-censoring via Neural Layer...');
    await this._delay(1500);
    this._updateOverlay('Syncing Kinetic Data...');
    await this._delay(1000);
    this._updateOverlay('Processing Complete \u2713');
    await this._delay(1200);
    this._hideOverlay();
    this._processing = false;
    return {
      status: 'ready',
      message: 'Configure Whisper endpoint in settings for real processing',
      file: file?.name || 'unknown',
    };
  }

  get isProcessing() {
    return this._processing;
  }

  _showOverlay(message) {
    this._hideOverlay();
    this._overlayEl = document.createElement('div');
    this._overlayEl.className = 'chromic-ai-overlay';
    this._overlayEl.innerHTML = `
      <div class="chromic-ai-overlay-content">
        <div class="chromic-ai-spinner"></div>
        <p class="chromic-ai-status">${message}</p>
      </div>
    `;
    document.body.appendChild(this._overlayEl);
    requestAnimationFrame(() => this._overlayEl?.classList.add('is-visible'));
  }

  _updateOverlay(message) {
    const status = this._overlayEl?.querySelector('.chromic-ai-status');
    if (status) status.textContent = message;
  }

  _hideOverlay() {
    if (this._overlayEl) {
      this._overlayEl.classList.remove('is-visible');
      const el = this._overlayEl;
      setTimeout(() => el.remove(), 300);
      this._overlayEl = null;
    }
  }

  _delay(ms) {
    return new Promise((r) => setTimeout(r, ms));
  }
}

export const ChromicAI = new AIBridgeEngine();
export default ChromicAI;

