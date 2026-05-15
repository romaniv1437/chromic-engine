export interface AudioData {
  bass: number;
  mid: number;
  treble: number;
  rms: number;
}

export class AudioAnalyzer {
  private ctx!: AudioContext;
  private analyser!: AnalyserNode;
  private freqData!: Uint8Array;
  private timeData!: Uint8Array;
  private smoothed: AudioData = { bass: 0, mid: 0, treble: 0, rms: 0 };
  private source: AudioNode | null = null;
  private smoothing = 0.8;

  async initMic() {
    this.ctx = new AudioContext();
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    this.source = this.ctx.createMediaStreamSource(stream);
    this.setupAnalyser();
  }

  async initFile(file: File) {
    this.ctx = new AudioContext();
    const buffer = await file.arrayBuffer();
    const audioBuffer = await this.ctx.decodeAudioData(buffer);
    const src = this.ctx.createBufferSource();
    src.buffer = audioBuffer;
    src.loop = true;
    src.start();
    this.source = src;
    this.setupAnalyser();
  }

  private setupAnalyser() {
    this.analyser = this.ctx.createAnalyser();
    this.analyser.fftSize = 2048;
    this.analyser.smoothingTimeConstant = 0.8;
    this.source!.connect(this.analyser);
    // Don't connect to destination for mic to avoid feedback
    if (!(this.source instanceof MediaStreamAudioSourceNode)) {
      this.analyser.connect(this.ctx.destination);
    }
    this.freqData = new Uint8Array(this.analyser.frequencyBinCount);
    this.timeData = new Uint8Array(this.analyser.frequencyBinCount);
  }

  update(): AudioData {
    if (!this.analyser) return this.smoothed;
    this.analyser.getByteFrequencyData(this.freqData);
    this.analyser.getByteTimeDomainData(this.timeData);

    const len = this.freqData.length;
    const third = Math.floor(len / 3);

    let bass = 0, mid = 0, treble = 0;
    for (let i = 0; i < third; i++) bass += this.freqData[i];
    for (let i = third; i < third * 2; i++) mid += this.freqData[i];
    for (let i = third * 2; i < len; i++) treble += this.freqData[i];

    bass = bass / third / 255;
    mid = mid / third / 255;
    treble = treble / (len - third * 2) / 255;

    // RMS from time domain
    let rms = 0;
    for (let i = 0; i < this.timeData.length; i++) {
      const v = (this.timeData[i] - 128) / 128;
      rms += v * v;
    }
    rms = Math.sqrt(rms / this.timeData.length);

    const s = this.smoothing;
    this.smoothed.bass = this.smoothed.bass * s + bass * (1 - s);
    this.smoothed.mid = this.smoothed.mid * s + mid * (1 - s);
    this.smoothed.treble = this.smoothed.treble * s + treble * (1 - s);
    this.smoothed.rms = this.smoothed.rms * s + rms * (1 - s);

    return this.smoothed;
  }

  get isReady() { return !!this.analyser; }
}

