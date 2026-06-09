import * as THREE from 'three';
import { BaseScene } from './BaseScene';
import { AudioData } from '../audio/AudioProcessor';
import fullscreenVert from '../shaders/fullscreen.vert';
import fragShader from '../shaders/hyperbolic.frag';

export class HyperbolicScene extends BaseScene {
  private material: THREE.ShaderMaterial;

  constructor() {
    super();
    this.camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    this.material = new THREE.ShaderMaterial({
      vertexShader: fullscreenVert,
      fragmentShader: fragShader,
      uniforms: {
        u_time: { value: 0 },
        u_rms: { value: 0 },
        u_mid: { value: 0 },
        u_resolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
        u_debug: { value: false },
        u_colors: {
          value: [
            new THREE.Color(0x080a16),
            new THREE.Color(0x3e5bff),
            new THREE.Color(0x89f0ff),
          ],
        },
      },
    });
    this.scene.add(new THREE.Mesh(new THREE.PlaneGeometry(2, 2), this.material));
  }

  setPalette(colors: [THREE.Color, THREE.Color, THREE.Color]) {
    this.material.uniforms.u_colors.value = colors;
  }

  update(audio: AudioData, time: number) {
    this.material.uniforms.u_time.value = time;
    this.material.uniforms.u_rms.value = audio.rms;
    this.material.uniforms.u_mid.value = audio.mid;
  }

  resize(w: number, h: number, dpr?: number) {
    const effectiveDpr = dpr || window.devicePixelRatio || 1;
    this.material.uniforms.u_resolution.value.set(w * effectiveDpr, h * effectiveDpr);
  }

  dispose() {
    this.material.dispose();
  }
}
