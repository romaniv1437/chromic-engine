/**
 * AudioProcessor wraps an existing AnalyserNode from the host app's AudioEngine.
 * Does NOT create its own MediaElementSource (avoids the "already connected" error).
 */
export class AudioProcessor {
    constructor(analyser) {
        this.smoothed = { bass: 0, mid: 0, treble: 0, rms: 0 };
        this.smoothing = 0.82;
        this.analyser = analyser;
        this.freqData = new Uint8Array(this.analyser.frequencyBinCount);
        this.timeData = new Uint8Array(this.analyser.frequencyBinCount);
    }
    update() {
        this.analyser.getByteFrequencyData(this.freqData);
        this.analyser.getByteTimeDomainData(this.timeData);
        const len = this.freqData.length;
        const third = Math.floor(len / 3);
        let bass = 0, mid = 0, treble = 0;
        for (let i = 0; i < third; i++)
            bass += this.freqData[i];
        for (let i = third; i < third * 2; i++)
            mid += this.freqData[i];
        for (let i = third * 2; i < len; i++)
            treble += this.freqData[i];
        bass = bass / third / 255;
        mid = mid / third / 255;
        treble = treble / (len - third * 2) / 255;
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
}
