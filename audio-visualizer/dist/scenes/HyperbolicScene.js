import * as THREE from 'three';
import { BaseScene } from './BaseScene';
import fullscreenVert from '../shaders/fullscreen.vert';
import fragShader from '../shaders/hyperbolic.frag';
export class HyperbolicScene extends BaseScene {
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
            },
        });
        this.scene.add(new THREE.Mesh(new THREE.PlaneGeometry(2, 2), this.material));
    }
    update(audio, time) {
        this.material.uniforms.u_time.value = time;
        this.material.uniforms.u_rms.value = audio.rms;
        this.material.uniforms.u_mid.value = audio.mid;
    }
    resize(w, h, dpr) {
        const effectiveDpr = dpr || window.devicePixelRatio || 1;
        this.material.uniforms.u_resolution.value.set(w * effectiveDpr, h * effectiveDpr);
    }
    dispose() {
        this.material.dispose();
    }
}
