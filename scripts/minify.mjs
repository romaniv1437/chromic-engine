#!/usr/bin/env node
/**
 * Minify all JS and CSS files in public/ using esbuild.
 * Preserves ES module structure (no bundling), just minifies each file individually.
 * Run: node scripts/minify.mjs
 */
import { transform } from 'esbuild';
import { readdir, readFile, writeFile, stat } from 'fs/promises';
import { join, extname } from 'path';

const PUBLIC_DIR = new URL('../public/', import.meta.url).pathname;
const SKIP_DIRS = ['visualizer']; // Already built/minified by vite

async function* walkDir(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) {
      if (SKIP_DIRS.includes(entry.name)) continue;
      yield* walkDir(fullPath);
    } else {
      yield fullPath;
    }
  }
}

let totalSaved = 0;
let filesProcessed = 0;

for await (const filePath of walkDir(PUBLIC_DIR)) {
  const ext = extname(filePath);
  if (ext !== '.js' && ext !== '.css') continue;

  const source = await readFile(filePath, 'utf8');
  const originalSize = Buffer.byteLength(source, 'utf8');

  // Skip already minified files (single line > 500 chars, no newlines)
  if (source.split('\n').length <= 2 && originalSize > 500) continue;

  try {
    const loader = ext === '.css' ? 'css' : 'js';
    const result = await transform(source, {
      loader,
      minify: true,
      // Keep module semantics, don't transform imports
      format: ext === '.js' ? 'esm' : undefined,
      // Preserve legal comments
      legalComments: 'none',
      // Target modern browsers
      target: 'es2020',
    });

    const minifiedSize = Buffer.byteLength(result.code, 'utf8');
    const saved = originalSize - minifiedSize;

    if (saved > 0) {
      await writeFile(filePath, result.code, 'utf8');
      totalSaved += saved;
      filesProcessed++;
      const pct = ((saved / originalSize) * 100).toFixed(1);
      console.log(`  ✓ ${filePath.replace(PUBLIC_DIR, '')} — ${(saved / 1024).toFixed(1)} KiB saved (${pct}%)`);
    }
  } catch (err) {
    console.warn(`  ✗ ${filePath.replace(PUBLIC_DIR, '')} — ${err.message}`);
  }
}

console.log(`\n✅ Minified ${filesProcessed} files. Total savings: ${(totalSaved / 1024).toFixed(1)} KiB`);

