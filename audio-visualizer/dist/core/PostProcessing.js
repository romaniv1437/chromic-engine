import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';
// Chromatic Aberration — RGB channel offset on beat
const ChromaticAberrationShader = {
    uniforms: {
        tDiffuse: { value: null },
        u_intensity: { value: 0.0 },
        u_resolution: { value: new THREE.Vector2(1, 1) },
    },
    vertexShader: `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
    fragmentShader: `
    uniform sampler2D tDiffuse;
    uniform float u_intensity;
    uniform vec2 u_resolution;
    varying vec2 vUv;
    void main() {
      if (u_intensity < 0.001) {
        gl_FragColor = texture2D(tDiffuse, vUv);
        return;
      }
      vec2 dir = (vUv - 0.5) * u_intensity * 0.02;
      float r = texture2D(tDiffuse, vUv + dir).r;
      float g = texture2D(tDiffuse, vUv).g;
      float b = texture2D(tDiffuse, vUv - dir).b;
      float a = texture2D(tDiffuse, vUv).a;
      gl_FragColor = vec4(r, g, b, a);
    }
  `,
};
// Separable Gaussian Blur — 21 samples per pass instead of 441
const SeparableBlurShader = {
    uniforms: {
        tDiffuse: { value: null },
        u_blur: { value: 0.0 },
        u_resolution: { value: new THREE.Vector2(1, 1) },
        u_direction: { value: new THREE.Vector2(1, 0) },
    },
    vertexShader: `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
    fragmentShader: `
    uniform sampler2D tDiffuse;
    uniform float u_blur;
    uniform vec2 u_resolution;
    uniform vec2 u_direction;
    varying vec2 vUv;
    void main() {
      if (u_blur < 0.01) {
        gl_FragColor = texture2D(tDiffuse, vUv);
        return;
      }
      vec2 texel = u_direction / u_resolution;
      vec4 color = vec4(0.0);
      float total = 0.0;
      float sigma = max(u_blur, 0.001);
      int samples = int(min(sigma * 3.0, 10.0));
      for (int i = -10; i <= 10; i++) {
        if (abs(i) > samples) continue;
        float w = exp(-float(i*i) / (2.0 * sigma * sigma));
        color += texture2D(tDiffuse, vUv + float(i) * texel) * w;
        total += w;
      }
      gl_FragColor = color / total;
    }
  `,
};
// Dim shader — darkens scene when UI is visible (text overlay readability)
const DimShader = {
    uniforms: {
        tDiffuse: { value: null },
        u_dim: { value: 0.0 },
    },
    vertexShader: `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
    fragmentShader: `
    uniform sampler2D tDiffuse;
    uniform float u_dim;
    varying vec2 vUv;
    void main() {
      vec4 color = texture2D(tDiffuse, vUv);
      gl_FragColor = vec4(color.rgb * (1.0 - u_dim), color.a);
    }
  `,
};
// Coraline Tinted Vertical Bloom — applies colored vertical glow with the Other World palette
const CoralineTintedBloomShader = {
    uniforms: {
        tDiffuse: { value: null },
        u_enabled: { value: 0.0 },
        u_strength: { value: 1.0 },
        u_resolution: { value: new THREE.Vector2(1, 1) },
        u_audio: { value: 0.0 },
    },
    vertexShader: `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
    fragmentShader: `
    uniform sampler2D tDiffuse;
    uniform float u_enabled;
    uniform float u_strength;
    uniform vec2 u_resolution;
    uniform float u_audio;
    varying vec2 vUv;

    void main() {
      vec4 base = texture2D(tDiffuse, vUv);
      if (u_enabled < 0.5) {
        gl_FragColor = base;
        return;
      }

      // Vertical-biased blur sampling (more vertical spread than horizontal)
      vec2 texelV = vec2(0.0, 1.0) / u_resolution;
      vec2 texelH = vec2(1.0, 0.0) / u_resolution;

      // Audio-reactive sigma: base 4.0, pulse up to 8.0
      float sigma = 4.0 + u_audio * 4.0;
      float vertScale = 2.5 + u_audio * 1.5; // vertical stretch
      float horizScale = 0.6; // subtle horizontal

      vec4 glow = vec4(0.0);
      float total = 0.0;
      for (int i = -8; i <= 8; i++) {
        float fi = float(i);
        float wV = exp(-(fi * fi) / (2.0 * sigma * sigma));
        vec2 offsetV = fi * texelV * vertScale;
        glow += texture2D(tDiffuse, vUv + offsetV) * wV;
        total += wV;
      }
      glow /= total;

      // Second pass: slight horizontal spread
      vec4 glowH = vec4(0.0);
      float totalH = 0.0;
      float sigmaH = sigma * 0.4;
      for (int i = -4; i <= 4; i++) {
        float fi = float(i);
        float wH = exp(-(fi * fi) / (2.0 * sigmaH * sigmaH));
        vec2 offsetH = fi * texelH * horizScale;
        glowH += texture2D(tDiffuse, vUv + offsetH) * wH;
        totalH += wH;
      }
      glowH /= totalH;

      // Blend vertical-dominant glow
      vec4 bloomColor = mix(glow, glowH, 0.25);

      // Tint with Other World palette gradient based on luminance
      float lum = dot(bloomColor.rgb, vec3(0.299, 0.587, 0.114));
      vec3 indigo = vec3(31.0, 24.0, 64.0) / 255.0;       // Потойбічний Індіго
      vec3 violet = vec3(92.0, 53.0, 64.0) / 255.0;       // Магічний фіолетовий
      vec3 fuchsia = vec3(186.0, 45.0, 131.0) / 255.0;    // Неонова Фуксія

      // Map luminance to color ramp
      vec3 tint;
      if (lum < 0.33) {
        tint = mix(indigo, violet, lum / 0.33);
      } else if (lum < 0.66) {
        tint = mix(violet, fuchsia, (lum - 0.33) / 0.33);
      } else {
        tint = mix(fuchsia, vec3(1.0, 0.6, 0.9), (lum - 0.66) / 0.34);
      }

      vec3 tintedGlow = bloomColor.rgb * tint * 2.5;

      // Additive blend with audio-reactive intensity
      float intensity = u_strength * (0.7 + u_audio * 0.5);
      gl_FragColor = vec4(base.rgb + tintedGlow * intensity, base.a);
    }
  `,
};
export class PostProcessing {
    constructor(renderer, scene, camera) {
        this.uiVisibility = 0;
        this.uiVisibilityTarget = 0;
        this.chromaBeat = 0;
        this._textRenderer = null;
        this.defaultBloom = { strength: 0.4, radius: 0.4, threshold: 1.0 };
        this.isCoraline = false;
        this.currentAudio = null;
        this._textDbgCount = 0;
        this.renderer = renderer;
        this.scene = scene;
        this.camera = camera;
        this.composer = new EffectComposer(renderer);
        // Main scene render — layer 0 only (scene shaders like lava_flow — NO bloom)
        const mainPass = new RenderPass(scene, camera);
        mainPass.clear = true;
        this.composer.addPass(mainPass);
        // Patch main pass to only render layer 0 (scene geometry)
        const origMainRender = mainPass.render.bind(mainPass);
        mainPass.render = (r, wb, rb, dt, ma) => {
            const cam = mainPass.camera;
            const saved = cam.layers.mask;
            cam.layers.set(0);
            origMainRender(r, wb, rb, dt, ma);
            cam.layers.mask = saved;
        };
        // Coraline tinted vertical bloom — applied to scene (layer 0) BEFORE lyrics
        this.coralineBloomPass = new ShaderPass(CoralineTintedBloomShader);
        this.coralineBloomPass.uniforms.u_enabled.value = 0.0;
        const dpr = renderer.getPixelRatio();
        this.coralineBloomPass.uniforms.u_resolution.value.set(window.innerWidth * dpr, window.innerHeight * dpr);
        this.composer.addPass(this.coralineBloomPass);
        // Lyrics text render pass — layer 1 on top of scene, BEFORE lyrics bloom
        const textPass = new RenderPass(scene, camera);
        textPass.clear = false;
        textPass.clearDepth = true;
        this.composer.addPass(textPass);
        const origTextRender = textPass.render.bind(textPass);
        textPass.render = (r, wb, rb, dt, ma) => {
            const cam = textPass.camera;
            const saved = cam.layers.mask;
            cam.layers.set(1);
            origTextRender(r, wb, rb, dt, ma);
            cam.layers.mask = saved;
        };
        // Bloom — applied AFTER text is composited for default profiles.
        // In Coraline profile we disable this pass so text stays untouched.
        this.bloom = new UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight), this.defaultBloom.strength, this.defaultBloom.radius, this.defaultBloom.threshold);
        this.composer.addPass(this.bloom);
        // Chromatic Aberration (spikes on beat)
        this.chromaPass = new ShaderPass(ChromaticAberrationShader);
        this.chromaPass.uniforms.u_resolution.value.set(window.innerWidth * dpr, window.innerHeight * dpr);
        this.composer.addPass(this.chromaPass);
    }
    /** Set a dedicated full-DPI renderer for crisp text overlay */
    setTextRenderer(r) {
        this._textRenderer = r;
    }
    /**
     * Text is now rendered inside the composer pipeline (textPass before bloom).
     * This method is kept as no-op for API compatibility.
     */
    renderText() {
        // No-op — text rendered via textPass in composer pipeline so bloom applies to it
    }
    setUiVisibility(visible) {
        this.uiVisibilityTarget = visible ? 1 : 0;
    }
    setBlur(_enabled) {
        // Handled per-scene via material uniforms
    }
    setDim(_enabled, _opacity) {
        // Handled per-scene via material uniforms
    }
    update(audio) {
        this.currentAudio = audio;
        // Coraline bloom audio reactivity
        if (this.isCoraline) {
            const energy = (audio.bass * 0.5 + audio.mid * 0.3 + audio.treble * 0.2);
            this.coralineBloomPass.uniforms.u_audio.value += (energy - this.coralineBloomPass.uniforms.u_audio.value) * 0.15;
        }
        // Chromatic aberration disabled — causes glitchy colors with bloom
        this.chromaPass.uniforms.u_intensity.value = 0;
    }
    setSize(w, h) {
        const dpr = this.renderer.getPixelRatio();
        const pw = w * dpr;
        const ph = h * dpr;
        this.composer.setSize(pw, ph);
        this.bloom.resolution.set(pw, ph);
        this.chromaPass.uniforms.u_resolution.value.set(pw, ph);
        this.coralineBloomPass.uniforms.u_resolution.value.set(pw, ph);
        if (this._textRenderer) {
            this._textRenderer.setSize(w, h, false);
        }
    }
    updateScene(scene, camera) {
        this.scene = scene;
        this.camera = camera;
        const mainPass = this.composer.passes[0];
        mainPass.scene = scene;
        mainPass.camera = camera;
        // textPass is now at index 2 (after coralineBloomPass at index 1)
        const textPass = this.composer.passes[2];
        textPass.scene = scene;
        textPass.camera = camera;
    }
    setBloomProfile(profile) {
        if (profile === 'coraline') {
            this.isCoraline = true;
            // Disable UnrealBloom in Coraline so layer-1 lyrics/text are not bloomed.
            this.bloom.enabled = false;
            // Keep values configured for quick resume when leaving coraline.
            this.bloom.strength = 0.68;
            this.bloom.radius = 0.5;
            this.bloom.threshold = 0.72;
            // Enable coraline tinted vertical bloom for the tunnel
            this.coralineBloomPass.uniforms.u_enabled.value = 1.0;
            this.coralineBloomPass.uniforms.u_strength.value = 0.95;
            return;
        }
        this.isCoraline = false;
        this.bloom.enabled = true;
        this.bloom.strength = this.defaultBloom.strength;
        this.bloom.radius = this.defaultBloom.radius;
        this.bloom.threshold = this.defaultBloom.threshold;
        // Disable coraline bloom
        this.coralineBloomPass.uniforms.u_enabled.value = 0.0;
    }
}
