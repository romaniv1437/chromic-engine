import classicBars from './classic-bars.js';
import oscilloscope from './oscilloscope.js';
import milkdropNebula from './milkdrop-nebula.js';
import starfieldWarp from './starfield-warp.js';
import rgbMagicBubbles from './rgb-magic-bubbles.js';
import pulsingRing from './pulsing-ring.js';
import vaporwaveGrid from './vaporwave-grid.js';
import spectrumFire from './spectrum-fire.js';
import digitalRain from './digital-rain.js';
import plasmaFlow from './plasma-flow.js';
import rgbGlitch from './rgb-glitch.js';
import vhsRetro from './vhs-retro.js';
import musicalSymphony from './musical-symphony.js';
import soapBubbles from './soap-bubbles.js';

export const PRESET_DEFINITIONS = [
  classicBars,
  oscilloscope,
  milkdropNebula,
  starfieldWarp,
  rgbMagicBubbles,
  pulsingRing,
  vaporwaveGrid,
  spectrumFire,
  digitalRain,
  plasmaFlow,
  rgbGlitch,
  vhsRetro,
  musicalSymphony,
  soapBubbles,
];

export const PRESET_REGISTRY = Object.fromEntries(PRESET_DEFINITIONS.map((preset) => [preset.id, preset]));

