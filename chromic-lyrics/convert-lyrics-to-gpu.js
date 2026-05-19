#!/usr/bin/env node
/**
 * convert-lyrics-to-gpu.js
 *
 * Converts a .lyrics.json (DOM format) into a .gpu-lyrics.json (GPU SDF format).
 * The GPU format is self-contained and does NOT share any data structures with
 * the DOM lyrics engine — completely separate pipeline.
 *
 * Usage:
 *   node convert-lyrics-to-gpu.js <input.lyrics.json> [output.gpu-lyrics.json]
 *
 * Word type flags in source: whisper, adlib, spoken, sung, stretch
 * GPU format maps these to rendering hints the Three.js/troika engine uses.
 */

const fs = require('fs');
const path = require('path');

const inputPath = process.argv[2];
if (!inputPath) {
  console.error('Usage: node convert-lyrics-to-gpu.js <input.lyrics.json> [output.gpu-lyrics.json]');
  process.exit(1);
}

const outputPath = process.argv[3] || inputPath.replace(/\.lyrics\.json$/, '.gpu-lyrics.json');

const raw = JSON.parse(fs.readFileSync(inputPath, 'utf-8'));

// Compute total duration from last word end
let totalDuration = 0;
for (const line of raw) {
  if (line.end > totalDuration) totalDuration = line.end;
  for (const w of (line.words || [])) {
    if (w.end > totalDuration) totalDuration = w.end;
  }
}
totalDuration = Math.ceil(totalDuration) + 2; // pad 2s

/**
 * GPU word type string from boolean flags.
 * Priority: stretch > sung > spoken > whisper > normal
 * adlib is a separate flag (not mutually exclusive with type).
 */
function resolveGpuType(w) {
  if (w.stretch) return 'stretch';
  if (w.sung) return 'sung';
  if (w.spoken) return 'spoken';
  if (w.whisper) return 'whisper';
  return 'normal';
}

const gpuData = {
  // Metadata
  version: 1,
  generator: 'convert-lyrics-to-gpu.js',
  totalDuration,

  // Lines array — GPU-optimized
  lines: raw.map((line, idx) => {
    // Detect if entire line is adlib (all words have adlib flag)
    const allAdlib = (line.words || []).every(w => w.adlib);

    return {
      id: idx,
      start: line.time,
      end: line.end,
      isAdlib: allAdlib,
      text: line.text, // full line text for debug/fallback
      words: (line.words || []).map(w => ({
        text: w.word,
        start: w.start,
        end: w.end,
        type: resolveGpuType(w),
        adlib: !!w.adlib,
        // GPU rendering hints
        glowIntensity: (w.stretch || w.sung) ? 1.0 : 0,
        dimFactor: w.whisper ? 0.5 : (w.spoken ? 0.85 : 1.0),
      })),
    };
  }),
};

fs.writeFileSync(outputPath, JSON.stringify(gpuData, null, 2));
console.log(`✅ GPU lyrics written: ${outputPath}`);
console.log(`   ${gpuData.lines.length} lines, ${gpuData.lines.reduce((s, l) => s + l.words.length, 0)} words`);
console.log(`   Duration: ${totalDuration}s`);

