import * as THREE from 'three';
import { BaseScene } from './BaseScene';
import { AudioData } from '../audio/AudioProcessor';
import vertShader from '../shaders/fullscreen.vert';
import fragShader from '../shaders/soap_bubble.frag';

export class SoapBubbleScene extends BaseScene {
  private material: THREE.ShaderMaterial;

  constructor() {
    super();
    this.camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    this.material = new THREE.ShaderMaterial({
      vertexShader: vertShader,
      fragmentShader: fragShader,
      uniforms: {
        u_time: { value: 0 },
        u_bass: { value: 0 },
        u_mid: { value: 0 },
        u_treble: { value: 0 },
        u_rms: { value: 0 },
        u_resolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
        u_debug: { value: false },
        u_colors: {
          value: [
            new THREE.Color(0x0a0a1a),
            new THREE.Color(0x6644aa),
            new THREE.Color(0x00ccff),
          ],
        },
      },
    });
    const quad = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), this.material);
    this.scene.add(quad);
  }

  setPalette(colors: [THREE.Color, THREE.Color, THREE.Color]) {
    this.material.uniforms.u_colors.value = colors;
  }

  update(audio: AudioData, time: number) {
    this.material.uniforms.u_time.value = time;
    this.material.uniforms.u_bass.value = audio.bass;
    this.material.uniforms.u_mid.value = audio.mid;
    this.material.uniforms.u_treble.value = audio.treble;
    this.material.uniforms.u_rms.value = audio.rms;
  }

  resize(w: number, h: number, dpr?: number) {
    const effectiveDpr = dpr || window.devicePixelRatio || 1;
    this.material.uniforms.u_resolution.value.set(w * effectiveDpr, h * effectiveDpr);
  }

  dispose() {
    this.material.dispose();
  }
}

