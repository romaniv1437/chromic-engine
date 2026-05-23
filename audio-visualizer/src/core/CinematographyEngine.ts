import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';
import { AfterimagePass } from 'three/examples/jsm/postprocessing/AfterimagePass.js';
import { FilmPass } from 'three/examples/jsm/postprocessing/FilmPass.js';
import { GlitchPass } from 'three/examples/jsm/postprocessing/GlitchPass.js';
import { HalftonePass } from 'three/examples/jsm/postprocessing/HalftonePass.js';
import { DotScreenPass } from 'three/examples/jsm/postprocessing/DotScreenPass.js';
import { Pass } from 'three/examples/jsm/postprocessing/Pass.js';

// Shaders from three/examples
import { KaleidoShader } from 'three/examples/jsm/shaders/KaleidoShader.js';
import { MirrorShader } from 'three/examples/jsm/shaders/MirrorShader.js';
import { RGBShiftShader } from 'three/examples/jsm/shaders/RGBShiftShader.js';
import { SepiaShader } from 'three/examples/jsm/shaders/SepiaShader.js';
import { BleachBypassShader } from 'three/examples/jsm/shaders/BleachBypassShader.js';
import { ColorifyShader } from 'three/examples/jsm/shaders/ColorifyShader.js';
import { BrightnessContrastShader } from 'three/examples/jsm/shaders/BrightnessContrastShader.js';
import { HueSaturationShader } from 'three/examples/jsm/shaders/HueSaturationShader.js';
import { VignetteShader } from 'three/examples/jsm/shaders/VignetteShader.js';
import { FocusShader } from 'three/examples/jsm/shaders/FocusShader.js';

import { AudioData } from '../audio/AudioProcessor';

// ─── Seeded PRNG ────────────────────────────────────────────────────────────
function mulberry32(seed: number) {
  return () => {
    seed |= 0; seed = seed + 0x6D2B79F5 | 0;
    let t = Math.imul(seed ^ seed >>> 15, 1 | seed);
    t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  };
}

// ─── Effect Slot ────────────────────────────────────────────────────────────
export interface EffectSlot {
  name: string;
  pass: Pass;
  intensity: number;
  targetIntensity: number;
  driver: 'bass' | 'mid' | 'treble' | 'rms';
  weight: number;
  floor: number;
  drive: (intensity: number, audio: AudioData) => void;
}

// ─── Effect Factory Pool (ALL THE PACK) ─────────────────────────────────────
type EffectFactory = (rng: () => number) => EffectSlot;

const EFFECT_POOL: { name: string; factory: EffectFactory }[] = [
  // 1. Afterimage (motion trails)
  {
    name: 'afterimage',
    factory: (rng) => {
      const pass = new AfterimagePass(0.0);
      return {
        name: 'afterimage', pass, intensity: 0, targetIntensity: 0,
        driver: rng() > 0.5 ? 'rms' : 'bass',
        weight: 0.6 + rng() * 0.35, floor: 0.0,
        drive: (intensity) => {
          (pass as any).uniforms.damp.value = 0.6 + intensity * 0.36;
        },
      };
    },
  },
  // 2. Film grain + scanlines
  {
    name: 'film',
    factory: (rng) => {
      const pass = new FilmPass(0, false);
      return {
        name: 'film', pass, intensity: 0, targetIntensity: 0,
        driver: rng() > 0.6 ? 'treble' : 'rms',
        weight: 0.4 + rng() * 0.4, floor: 0.05,
        drive: (intensity) => {
          (pass as any).uniforms.nIntensity.value = intensity * 0.35;
          (pass as any).uniforms.sIntensity.value = intensity * 0.12;
        },
      };
    },
  },
  // 3. Glitch
  {
    name: 'glitch',
    factory: (rng) => {
      const pass = new GlitchPass();
      pass.enabled = false;
      return {
        name: 'glitch', pass, intensity: 0, targetIntensity: 0,
        driver: 'bass', weight: 0.8 + rng() * 0.2, floor: 0.0,
        drive: (intensity) => {
          pass.enabled = intensity > 0.6;
          (pass as any).goWild = intensity > 0.85;
        },
      };
    },
  },
  // 4. Halftone
  {
    name: 'halftone',
    factory: (rng) => {
      const pass = new HalftonePass(window.innerWidth, window.innerHeight, {
        radius: 4 + rng() * 6, shape: Math.floor(rng() * 3) + 1,
        scatter: 0, blending: 0.5,
      });
      pass.enabled = false;
      return {
        name: 'halftone', pass, intensity: 0, targetIntensity: 0,
        driver: rng() > 0.5 ? 'mid' : 'treble',
        weight: 0.5 + rng() * 0.3, floor: 0.0,
        drive: (intensity) => {
          pass.enabled = intensity > 0.15;
          if ((pass as any).uniforms?.radius)
            (pass as any).uniforms.radius.value = 2 + intensity * 8;
        },
      };
    },
  },
  // 5. Dot screen
  {
    name: 'dotscreen',
    factory: (rng) => {
      const pass = new DotScreenPass();
      pass.enabled = false;
      return {
        name: 'dotscreen', pass, intensity: 0, targetIntensity: 0,
        driver: 'mid', weight: 0.4 + rng() * 0.3, floor: 0.0,
        drive: (intensity) => {
          pass.enabled = intensity > 0.3;
          if ((pass as any).uniforms?.scale)
            (pass as any).uniforms.scale.value = 1.5 - intensity * 0.8;
        },
      };
    },
  },
  // 6. Kaleido (kaleidoscope)
  {
    name: 'kaleido',
    factory: (rng) => {
      const pass = new ShaderPass(KaleidoShader);
      pass.enabled = false;
      const sides = 3 + Math.floor(rng() * 6);
      return {
        name: 'kaleido', pass, intensity: 0, targetIntensity: 0,
        driver: rng() > 0.5 ? 'bass' : 'mid',
        weight: 0.5 + rng() * 0.4, floor: 0.0,
        drive: (intensity) => {
          pass.enabled = intensity > 0.2;
          pass.uniforms.sides.value = sides + Math.floor(intensity * 4);
          pass.uniforms.angle.value = intensity * 1.5;
        },
      };
    },
  },
  // 7. Mirror
  {
    name: 'mirror',
    factory: (rng) => {
      const pass = new ShaderPass(MirrorShader);
      pass.enabled = false;
      return {
        name: 'mirror', pass, intensity: 0, targetIntensity: 0,
        driver: 'bass', weight: 0.6 + rng() * 0.3, floor: 0.0,
        drive: (intensity) => {
          pass.enabled = intensity > 0.4;
          pass.uniforms.side.value = Math.floor(rng() * 4);
        },
      };
    },
  },
  // 8. RGB Shift (chromatic aberration)
  {
    name: 'rgbshift',
    factory: (rng) => {
      const pass = new ShaderPass(RGBShiftShader);
      return {
        name: 'rgbshift', pass, intensity: 0, targetIntensity: 0,
        driver: 'bass', weight: 0.7 + rng() * 0.3, floor: 0.0,
        drive: (intensity) => {
          pass.uniforms.amount.value = intensity * 0.003;
          pass.uniforms.angle.value = rng() * 6.28;
        },
      };
    },
  },
  // 9. Sepia
  {
    name: 'sepia',
    factory: (rng) => {
      const pass = new ShaderPass(SepiaShader);
      return {
        name: 'sepia', pass, intensity: 0, targetIntensity: 0,
        driver: 'rms', weight: 0.3 + rng() * 0.3, floor: 0.0,
        drive: (intensity) => {
          pass.uniforms.amount.value = intensity * 0.6;
        },
      };
    },
  },
  // 10. Bleach Bypass (high contrast desaturation)
  {
    name: 'bleachbypass',
    factory: (rng) => {
      const pass = new ShaderPass(BleachBypassShader);
      return {
        name: 'bleachbypass', pass, intensity: 0, targetIntensity: 0,
        driver: rng() > 0.5 ? 'rms' : 'mid',
        weight: 0.4 + rng() * 0.3, floor: 0.0,
        drive: (intensity) => {
          pass.uniforms.opacity.value = intensity * 0.8;
        },
      };
    },
  },
  // 11. Hue Saturation
  {
    name: 'huesat',
    factory: (rng) => {
      const pass = new ShaderPass(HueSaturationShader);
      return {
        name: 'huesat', pass, intensity: 0, targetIntensity: 0,
        driver: rng() > 0.5 ? 'treble' : 'bass',
        weight: 0.3 + rng() * 0.3, floor: 0.0,
        drive: (intensity) => {
          pass.uniforms.hue.value = (intensity - 0.5) * 0.3;
          pass.uniforms.saturation.value = intensity * 0.4 - 0.1;
        },
      };
    },
  },
  // 12. Vignette
  {
    name: 'vignette',
    factory: (rng) => {
      const pass = new ShaderPass(VignetteShader);
      return {
        name: 'vignette', pass, intensity: 0, targetIntensity: 0,
        driver: 'rms', weight: 0.5 + rng() * 0.4, floor: 0.2,
        drive: (intensity) => {
          pass.uniforms.offset.value = 1.0 - intensity * 0.5;
          pass.uniforms.darkness.value = intensity * 1.5;
        },
      };
    },
  },
  // 13. Focus blur
  {
    name: 'focus',
    factory: (rng) => {
      const pass = new ShaderPass(FocusShader);
      return {
        name: 'focus', pass, intensity: 0, targetIntensity: 0,
        driver: rng() > 0.5 ? 'mid' : 'rms',
        weight: 0.3 + rng() * 0.3, floor: 0.0,
        drive: (intensity) => {
          pass.uniforms.sampleDistance.value = intensity * 0.8;
          pass.uniforms.waveFactor.value = intensity * 0.002;
        },
      };
    },
  },
  // 14. Brightness/Contrast
  {
    name: 'brightness',
    factory: (rng) => {
      const pass = new ShaderPass(BrightnessContrastShader);
      return {
        name: 'brightness', pass, intensity: 0, targetIntensity: 0,
        driver: 'rms', weight: 0.3 + rng() * 0.2, floor: 0.0,
        drive: (intensity) => {
          pass.uniforms.brightness.value = intensity * 0.1;
          pass.uniforms.contrast.value = intensity * 0.15;
        },
      };
    },
  },
  // 15. Colorify (tints toward palette color)
  {
    name: 'colorify',
    factory: (rng) => {
      const pass = new ShaderPass(ColorifyShader);
      pass.enabled = false;
      return {
        name: 'colorify', pass, intensity: 0, targetIntensity: 0,
        driver: 'bass', weight: 0.5 + rng() * 0.3, floor: 0.0,
        drive: (intensity) => {
          pass.enabled = intensity > 0.3;
          // Color set externally via setPalette
        },
      };
    },
  },
];

// ─── Recipe ─────────────────────────────────────────────────────────────────
export interface CinematographyRecipe {
  seed: number;
  effects: EffectSlot[];
  chromaWeight: number;
  bassBoost: number;
}

// ─── Engine ─────────────────────────────────────────────────────────────────
export class CinematographyEngine {
  private recipe: CinematographyRecipe | null = null;
  private _lerpSpeed = 0.04;

  /**
   * Generate a unique cinematography recipe for this play session.
   * Picks 3-5 effects from the pool, shuffles order, randomizes parameters.
   * Same track + different timestamp = different recipe (planet alignment).
   */
  generateRecipe(duration: number, timestamp: number = Date.now(), excludeEffects: string[] = []): CinematographyRecipe {
    const seed = (Math.floor(duration * 100) ^ (timestamp & 0x7FFFFFFF)) | 0;
    const rng = mulberry32(seed);

    const count = 3 + Math.floor(rng() * 3); // 3, 4, or 5 effects
    const available = EFFECT_POOL.filter(e => !excludeEffects.includes(e.name));
    const chosen: EffectSlot[] = [];

    for (let i = 0; i < count && available.length > 0; i++) {
      const idx = Math.floor(rng() * available.length);
      const { factory } = available.splice(idx, 1)[0];
      chosen.push(factory(rng));
    }

    // Shuffle
    for (let i = chosen.length - 1; i > 0; i--) {
      const j = Math.floor(rng() * (i + 1));
      [chosen[i], chosen[j]] = [chosen[j], chosen[i]];
    }

    const recipe: CinematographyRecipe = {
      seed,
      effects: chosen,
      chromaWeight: 0.1 + rng() * 0.5,
      bassBoost: 0.8 + rng() * 0.6,
    };

    this.recipe = recipe;
    console.log(`[Cinematography] Recipe seed=${seed} effects=[${chosen.map(e => e.name).join(', ')}] chroma=${recipe.chromaWeight.toFixed(2)} bassBoost=${recipe.bassBoost.toFixed(2)}`);
    return recipe;
  }

  getRecipe(): CinematographyRecipe | null { return this.recipe; }

  getPasses(): Pass[] {
    if (!this.recipe) return [];
    return this.recipe.effects.map(e => e.pass);
  }

  /** Per-frame update — smooth intensities, drive uniforms */
  update(audio: AudioData) {
    if (!this.recipe) return;
    for (const effect of this.recipe.effects) {
      const raw = audio[effect.driver];
      effect.targetIntensity = Math.max(effect.floor, raw * effect.weight);
      const delta = effect.targetIntensity - effect.intensity;
      const speed = delta > 0 ? this._lerpSpeed * 2.5 : this._lerpSpeed;
      effect.intensity += delta * speed;
      effect.intensity = Math.max(0, Math.min(1, effect.intensity));
      try { effect.drive(effect.intensity, audio); } catch (_) {}
    }
  }

  dispose() {
    if (!this.recipe) return;
    for (const effect of this.recipe.effects) {
      if ((effect.pass as any).dispose) (effect.pass as any).dispose();
    }
    this.recipe = null;
  }
}



