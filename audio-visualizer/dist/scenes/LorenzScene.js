import * as THREE from 'three';
import { BaseScene } from './BaseScene';
import simFrag from '../shaders/lorenz_sim.frag';
import renderVert from '../shaders/lorenz_render.vert';
import renderFrag from '../shaders/lorenz_render.frag';
import fullscreenVert from '../shaders/fullscreen.vert';
const SIZE = 512; // 512*512 = 262144 particles
export class LorenzScene extends BaseScene {
    constructor(renderer) {
        super();
        this.flip = false;
        this.renderer = renderer;
        this.scene.background = new THREE.Color(0x050210);
        this.camera.position.z = 3;
        // Init position texture
        const data = new Float32Array(SIZE * SIZE * 4);
        for (let i = 0; i < SIZE * SIZE; i++) {
            data[i * 4] = (Math.random() - 0.5) * 50;
            data[i * 4 + 1] = (Math.random() - 0.5) * 50;
            data[i * 4 + 2] = Math.random() * 50;
            data[i * 4 + 3] = 1;
        }
        const initTex = new THREE.DataTexture(data, SIZE, SIZE, THREE.RGBAFormat, THREE.FloatType);
        initTex.needsUpdate = true;
        // Render targets
        const rtOpts = { minFilter: THREE.NearestFilter, magFilter: THREE.NearestFilter, format: THREE.RGBAFormat, type: THREE.FloatType };
        this.rt1 = new THREE.WebGLRenderTarget(SIZE, SIZE, rtOpts);
        this.rt2 = new THREE.WebGLRenderTarget(SIZE, SIZE, rtOpts);
        // Copy init texture to rt1
        this.simCamera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
        this.simScene = new THREE.Scene();
        this.simMaterial = new THREE.ShaderMaterial({
            vertexShader: fullscreenVert,
            fragmentShader: simFrag,
            uniforms: {
                u_positions: { value: initTex },
                u_time: { value: 0 },
                u_bass: { value: 0 },
                u_treble: { value: 0 },
                u_resolution: { value: new THREE.Vector2(SIZE, SIZE) },
            },
        });
        const simQuad = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), this.simMaterial);
        this.simScene.add(simQuad);
        // Render initial state
        renderer.setRenderTarget(this.rt1);
        renderer.render(this.simScene, this.simCamera);
        renderer.setRenderTarget(null);
        // Particle points
        const refs = new Float32Array(SIZE * SIZE * 2);
        for (let y = 0; y < SIZE; y++) {
            for (let x = 0; x < SIZE; x++) {
                const i = y * SIZE + x;
                refs[i * 2] = x / SIZE;
                refs[i * 2 + 1] = y / SIZE;
            }
        }
        const geo = new THREE.BufferGeometry();
        geo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(SIZE * SIZE * 3), 3));
        geo.setAttribute('a_ref', new THREE.BufferAttribute(refs, 2));
        this.renderMaterial = new THREE.ShaderMaterial({
            vertexShader: renderVert,
            fragmentShader: renderFrag,
            uniforms: {
                u_positions: { value: this.rt1.texture },
                u_bass: { value: 0 },
            },
            transparent: true,
            depthWrite: false,
        });
        this.particles = new THREE.Points(geo, this.renderMaterial);
        this.scene.add(this.particles);
        this.gpuCompute = { rt1: this.rt1, rt2: this.rt2, simMat: this.simMaterial, mesh: simQuad };
    }
    update(audio, time) {
        const src = this.flip ? this.rt2 : this.rt1;
        const dst = this.flip ? this.rt1 : this.rt2;
        this.simMaterial.uniforms.u_positions.value = src.texture;
        this.simMaterial.uniforms.u_time.value = time;
        this.simMaterial.uniforms.u_bass.value = audio.bass;
        this.simMaterial.uniforms.u_treble.value = audio.treble;
        this.renderer.setRenderTarget(dst);
        this.renderer.render(this.simScene, this.simCamera);
        this.renderer.setRenderTarget(null);
        this.renderMaterial.uniforms.u_positions.value = dst.texture;
        this.renderMaterial.uniforms.u_bass.value = audio.bass;
        this.flip = !this.flip;
        // Rotate camera
        this.camera.position.x = Math.sin(time * 0.1) * 3;
        this.camera.position.z = Math.cos(time * 0.1) * 3;
        this.camera.lookAt(0, 0, 0);
    }
    dispose() {
        this.rt1.dispose();
        this.rt2.dispose();
        this.simMaterial.dispose();
        this.renderMaterial.dispose();
    }
}
