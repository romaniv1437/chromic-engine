import * as THREE from 'three';
import { BaseScene } from './BaseScene';
import { AudioData } from '../audio/AudioProcessor';
import vertShader from '../shaders/riemann.vert';
import fragShader from '../shaders/riemann.frag';

export class RiemannScene extends BaseScene {
  private material: THREE.ShaderMaterial;
  private freqTexture: THREE.DataTexture;
  private freqData: Uint8Array;

  constructor() {
    super();
    this.scene.background = new THREE.Color(0x030112);
    (this.camera as THREE.PerspectiveCamera).position.z = 3;

    this.freqData = new Uint8Array(256) as Uint8Array<ArrayBuffer>;
    this.freqTexture = new THREE.DataTexture(this.freqData as Uint8Array<ArrayBuffer>, 256, 1, THREE.RedFormat, THREE.UnsignedByteType);
    this.freqTexture.needsUpdate = true;

    this.material = new THREE.ShaderMaterial({
      vertexShader: vertShader,
      fragmentShader: fragShader,
      uniforms: {
        u_time: { value: 0 },
        u_bass: { value: 0 },
        u_mid: { value: 0 },
        u_treble: { value: 0 },
        u_freqData: { value: this.freqTexture },
        u_colors: {
          value: [
            new THREE.Color(0x030112),
            new THREE.Color(0x1a3a7a),
            new THREE.Color(0x7dd6ff),
          ],
        },
      },
    });

    const sphere = new THREE.Mesh(new THREE.SphereGeometry(1, 128, 128), this.material);
    this.scene.add(sphere);
    this.scene.add(new THREE.AmbientLight(0x111122));
  }

  setPalette(colors: [THREE.Color, THREE.Color, THREE.Color]) {
    this.material.uniforms.u_colors.value = colors;
    // Static dark background — no per-frame updates to avoid epileptic flicker
  }

  update(audio: AudioData, time: number) {
    this.material.uniforms.u_time.value = time;
    this.material.uniforms.u_bass.value = audio.bass;
    this.material.uniforms.u_mid.value = audio.mid;
    this.material.uniforms.u_treble.value = audio.treble;

    // Simulate freq data update via audio values
    for (let i = 0; i < 256; i++) {
      const t = i / 256;
      this.freqData[i] = Math.floor(
        (audio.bass * (1 - t) + audio.treble * t) * 255 * (0.5 + 0.5 * Math.sin(t * 20 + time * 3))
      );
    }
    this.freqTexture.needsUpdate = true;
  }

  dispose() {
    this.material.dispose();
    this.freqTexture.dispose();
  }
}

