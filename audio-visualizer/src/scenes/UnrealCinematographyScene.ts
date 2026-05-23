import * as THREE from 'three';
import { BaseScene } from './BaseScene';
import { AudioData } from '../audio/AudioProcessor';
import vertShader from '../shaders/fullscreen.vert';
import fragShader from '../shaders/unreal_cinematography.frag';

/**
 * UnrealCinematographyScene — Non-Euclidean Portal Multiverse.
 *
 * 7 biomes connected by glowing portals. Camera flies through infinite
 * non-euclidean space, changing direction at each portal. Each biome has:
 * - Unique geometry (cathedral, nebula, wormhole, archipelago, crystal, void, machine)
 * - Weather conditions driven by audio (acid rain, cosmic storm, aurora, fog, lightning)
 * - Cross-biome shape bleeding (shapes from adjacent biomes appear)
 * - Physics-aware elements (gravity, inertia, particle systems)
 *
 * Uniqueness sources: seed (per session), date/hour, accumulated audio hash,
 * palette colors, lyrics state. No two plays look the same.
 */
export class UnrealCinematographyScene extends BaseScene {
  private material: THREE.ShaderMaterial;
  private bassHistory: number[] = [];
  private lastBeatTime = 0;
  private currentBeat = 0;
  private currentEnergy = 0;
  private seed: number;
  private audioHash = 0; // accumulates audio fingerprint over time
  private biomePhase = 0; // smoothly advances on rhythm changes
  private prevEnergy = 0; // for detecting energy shifts
  private biomeTarget = 0; // target biome phase (integer steps)
  private lastBiomeSwitch = 0; // cooldown timer

  // Lyrics state
  private _lyricsActive = 0;
  private _lyricsProgress = 0;
  private _adlib = 0;
  private _wordIntensity = 0;
  private _lineBreak = 0;

  constructor() {
    super();
    this.camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    // Unique seed: combines timestamp + date + hour for per-session + per-day variance
    const now = new Date();
    const dateFactor = (now.getMonth() * 31 + now.getDate()) / 372.0;
    const hourFactor = (now.getHours() * 60 + now.getMinutes()) / 1440.0;
    this.seed = ((Date.now() & 0xFFFF) / 65535.0 + dateFactor + hourFactor) % 1.0;

    this.material = new THREE.ShaderMaterial({
      vertexShader: vertShader,
      fragmentShader: fragShader,
      uniforms: {
        u_time: { value: 0 },
        u_bass: { value: 0 },
        u_mid: { value: 0 },
        u_treble: { value: 0 },
        u_rms: { value: 0 },
        u_beat: { value: 0 },
        u_energy: { value: 0 },
        u_biomePhase: { value: 0 },
        u_resolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
        u_colors: {
          value: [
            new THREE.Color(0x050510),
            new THREE.Color(0x2266aa),
            new THREE.Color(0xff3388),
          ],
        },
        u_albumArt: { value: this.createDefaultTexture() },
        u_seed: { value: this.seed },
        u_audioHash: { value: 0 },   // accumulated audio fingerprint
        u_dateSeed: { value: dateFactor + hourFactor * 0.1 }, // date/time entropy
        // Lyrics-driven uniforms
        u_lyricsActive: { value: 0 },
        u_lyricsProgress: { value: 0 },
        u_adlib: { value: 0 },
        u_wordIntensity: { value: 0 },
        u_lineBreak: { value: 0 },
      },
    });

    const quad = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), this.material);
    this.scene.add(quad);

    // Enable dim/blur
    this.enableDimBlur(this.material);
  }

  private createDefaultTexture(): THREE.DataTexture {
    const size = 64;
    const data = new Uint8Array(size * size * 4);
    for (let y = 0; y < size; y++) {
      for (let x = 0; x < size; x++) {
        const i = (y * size + x) * 4;
        const u = x / size, v = y / size;
        data[i] = Math.floor((0.1 + u * 0.2) * 255);
        data[i + 1] = Math.floor((0.05 + v * 0.15) * 255);
        data[i + 2] = Math.floor((0.15 + (u + v) * 0.1) * 255);
        data[i + 3] = 255;
      }
    }
    const tex = new THREE.DataTexture(data, size, size, THREE.RGBAFormat);
    tex.needsUpdate = true;
    return tex;
  }

  setAlbumArt(imageUrl: string) {
    const loader = new THREE.TextureLoader();
    loader.load(imageUrl, (tex) => {
      tex.wrapS = THREE.RepeatWrapping;
      tex.wrapT = THREE.RepeatWrapping;
      this.material.uniforms.u_albumArt.value = tex;
    });
  }

  regenerateSeed() {
    const now = new Date();
    const dateFactor = (now.getMonth() * 31 + now.getDate()) / 372.0;
    const hourFactor = (now.getHours() * 60 + now.getMinutes()) / 1440.0;
    this.seed = ((Date.now() & 0xFFFF) / 65535.0 + dateFactor + hourFactor) % 1.0;
    this.material.uniforms.u_seed.value = this.seed;
    this.audioHash = 0; // reset for new track
  }

  setPalette(colors: [THREE.Color, THREE.Color, THREE.Color]) {
    this.material.uniforms.u_colors.value = colors;
  }

  setLyricsState(active: boolean, progress: number, adlib: boolean, wordIntensity: number) {
    this._lyricsActive = active ? 1 : 0;
    this._lyricsProgress = progress;
    const targetAdlib = adlib ? 1 : 0;
    this._adlib += (targetAdlib - this._adlib) * 0.08;
    this._wordIntensity = wordIntensity;
  }

  triggerLineBreak() {
    this._lineBreak = 1.0;
  }

  update(audio: AudioData, time: number) {
    const { bass, mid, treble, rms } = audio;

    // Beat detection
    this.bassHistory.push(bass);
    if (this.bassHistory.length > 20) this.bassHistory.shift();
    const avgBass = this.bassHistory.reduce((a, b) => a + b, 0) / this.bassHistory.length;
    const now = performance.now();
    if (bass > avgBass * 1.4 && bass > 0.35 && now - this.lastBeatTime > 150) {
      this.currentBeat = 1.0;
      this.lastBeatTime = now;
    }
    this.currentBeat *= 0.88;
    if (this.currentBeat < 0.01) this.currentBeat = 0;

    // Energy accumulator
    const instant = (bass * 0.4 + mid * 0.35 + treble * 0.25) * 2.0;
    if (instant > this.currentEnergy) {
      this.currentEnergy = this.currentEnergy * 0.9 + instant * 0.1;
    } else {
      this.currentEnergy = this.currentEnergy * 0.98 + instant * 0.02;
    }
    if (rms < 0.01) this.currentEnergy *= 0.9;
    this.currentEnergy = Math.min(this.currentEnergy, 1.0);

    // Audio hash: continuously accumulates a fingerprint of the audio
    // This makes every track produce different biome sequences
    this.audioHash = (this.audioHash + bass * 0.1 + mid * 0.07 + treble * 0.05) % 1.0;

    // Biome switching: triggered by rhythm changes (energy spikes/drops)
    // Detects: beat drops, breakdowns, key changes, big energy shifts
    const energyDelta = Math.abs(this.currentEnergy - this.prevEnergy);
    const timeSinceSwitch = now - this.lastBiomeSwitch;

    // Trigger biome advance on:
    // 1. Strong beat with energy spike (beat drop) — cooldown 8 seconds
    // 2. Major energy shift (breakdown/buildup) — cooldown 12 seconds
    // 3. Very long time without change (fallback) — 40 seconds
    if (timeSinceSwitch > 8000 && this.currentBeat > 0.8 && energyDelta > 0.15) {
      this.biomeTarget += 1.0;
      this.lastBiomeSwitch = now;
    } else if (timeSinceSwitch > 12000 && energyDelta > 0.25) {
      this.biomeTarget += 1.0;
      this.lastBiomeSwitch = now;
    } else if (timeSinceSwitch > 40000) {
      this.biomeTarget += 1.0;
      this.lastBiomeSwitch = now;
    }

    // Smooth warp toward target (takes ~2-3 seconds to fully transition)
    this.biomePhase += (this.biomeTarget - this.biomePhase) * 0.02;
    this.prevEnergy = this.currentEnergy;

    // Line break decay
    this._lineBreak *= 0.9;
    if (this._lineBreak < 0.01) this._lineBreak = 0;

    this.material.uniforms.u_time.value = time;
    this.material.uniforms.u_bass.value = bass;
    this.material.uniforms.u_mid.value = mid;
    this.material.uniforms.u_treble.value = treble;
    this.material.uniforms.u_rms.value = rms;
    this.material.uniforms.u_beat.value = this.currentBeat;
    this.material.uniforms.u_energy.value = this.currentEnergy;
    this.material.uniforms.u_biomePhase.value = this.biomePhase;
    this.material.uniforms.u_audioHash.value = this.audioHash;

    // Lyrics uniforms
    this.material.uniforms.u_lyricsActive.value = this._lyricsActive;
    this.material.uniforms.u_lyricsProgress.value = this._lyricsProgress;
    this.material.uniforms.u_adlib.value = this._adlib;
    this.material.uniforms.u_wordIntensity.value = this._wordIntensity;
    this.material.uniforms.u_lineBreak.value = this._lineBreak;
  }

  resize(w: number, h: number, dpr?: number) {
    const effectiveDpr = dpr || window.devicePixelRatio || 1;
    this.material.uniforms.u_resolution.value.set(w * effectiveDpr, h * effectiveDpr);
  }

  dispose() {
    this.material.dispose();
  }
}
