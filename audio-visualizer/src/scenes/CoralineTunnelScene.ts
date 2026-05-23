import * as THREE from 'three';
import { BaseScene } from './BaseScene';
import { AudioData } from '../audio/AudioProcessor';
import vertShader from '../shaders/fullscreen.vert';
import fragShader from '../shaders/coraline_tunnel.frag';

/**
 * CoralineTunnelScene — The passageway to the Other World.
 * Inspired by Coraline (2009) — a spiraling organic tunnel with
 * quilted fabric walls, button ornaments, and a hypnotic purple-teal glow.
 */
export class CoralineTunnelScene extends BaseScene {
  private material: THREE.ShaderMaterial;
  private bassHistory: number[] = [];
  private lastBeatTime = 0;
  private currentBeat = 0;
  private currentEnergy = 0;
  private seed: number;

  constructor() {
    super();
    this.camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    this.seed = (Date.now() & 0xFFFF) / 65535.0;

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
        u_resolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
        u_colors: {
          value: [
            new THREE.Color(0x150525),
            new THREE.Color(0x0d4d5a),
            new THREE.Color(0xcc6619),
          ],
        },
        u_albumArt: { value: this.createDefaultTexture() },
        u_seed: { value: this.seed },
      },
    });

    const quad = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), this.material);
    this.scene.add(quad);
    this.enableDimBlur(this.material);
  }

  private createDefaultTexture(): THREE.DataTexture {
    const size = 64;
    const data = new Uint8Array(size * size * 4);
    for (let y = 0; y < size; y++) {
      for (let x = 0; x < size; x++) {
        const i = (y * size + x) * 4;
        data[i] = Math.floor((0.1 + (x / size) * 0.1) * 255);
        data[i + 1] = Math.floor(0.05 * 255);
        data[i + 2] = Math.floor((0.15 + (y / size) * 0.1) * 255);
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

  setPalette(colors: [THREE.Color, THREE.Color, THREE.Color]) {
    this.material.uniforms.u_colors.value = colors;
  }

  update(audio: AudioData, time: number) {
    const { bass, mid, treble, rms } = audio;

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

    const instant = (bass * 0.45 + mid * 0.35 + treble * 0.2) * 2.1;
    // Faster attack + gentler release keeps movement reactive without jitter.
    this.currentEnergy += (instant - this.currentEnergy) * (instant > this.currentEnergy ? 0.16 : 0.055);
    this.currentEnergy = Math.min(this.currentEnergy, 1.0);

    this.material.uniforms.u_time.value = time;
    this.material.uniforms.u_bass.value = bass;
    this.material.uniforms.u_mid.value = mid;
    this.material.uniforms.u_treble.value = treble;
    this.material.uniforms.u_rms.value = rms;
    this.material.uniforms.u_beat.value = this.currentBeat;
    this.material.uniforms.u_energy.value = this.currentEnergy;
  }

  resize(w: number, h: number, dpr?: number) {
    const effectiveDpr = dpr || window.devicePixelRatio || 1;
    this.material.uniforms.u_resolution.value.set(w * effectiveDpr, h * effectiveDpr);
  }

  dispose() {
    this.material.dispose();
  }
}

