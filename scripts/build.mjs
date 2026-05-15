#!/usr/bin/env node
/**
 * Build production assets: copies public/ → dist/ and minifies JS/CSS.
 * Source files in public/ are NEVER modified.
 * Server serves dist/ in production, public/ in development.
 * Run: node scripts/build.mjs
 */
import { transform } from 'esbuild';
import { readdir, readFile, writeFile, mkdir, copyFile, stat } from 'fs/promises';
import { join, extname, relative, dirname } from 'path';
import { fileURLToPath } from 'url';

const ROOT = dirname(dirname(fileURLToPath(import.meta.url)));
const PUBLIC_DIR = join(ROOT, 'public');
const DIST_DIR = join(ROOT, 'dist');

async function* walkDir(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) {
      yield* walkDir(fullPath);
    } else {
      yield fullPath;
    }
  }
}

let totalSaved = 0;
let filesProcessed = 0;
let filesCopied = 0;

console.log(`📦 Building production assets: public/ → dist/\n`);

for await (const srcPath of walkDir(PUBLIC_DIR)) {
  const rel = relative(PUBLIC_DIR, srcPath);
  const destPath = join(DIST_DIR, rel);
  await mkdir(dirname(destPath), { recursive: true });

  const ext = extname(srcPath);

  // Minify JS and CSS files
  if (ext === '.js' || ext === '.css') {
    const source = await readFile(srcPath, 'utf8');
    const originalSize = Buffer.byteLength(source, 'utf8');

    // Skip already minified (visualizer bundle from vite)
    if (source.split('\n').length <= 2 && originalSize > 500) {
      await copyFile(srcPath, destPath);
      filesCopied++;
      continue;
    }

    try {
      const loader = ext === '.css' ? 'css' : 'js';
      const result = await transform(source, {
        loader,
        minify: true,
        format: ext === '.js' ? 'esm' : undefined,
        legalComments: 'none',
        target: 'es2020',
      });

      const minifiedSize = Buffer.byteLength(result.code, 'utf8');
      const saved = originalSize - minifiedSize;
      await writeFile(destPath, result.code, 'utf8');
      totalSaved += saved;
      filesProcessed++;
      if (saved > 100) {
        const pct = ((saved / originalSize) * 100).toFixed(1);
        console.log(`  ✓ ${rel} — ${(saved / 1024).toFixed(1)} KiB saved (${pct}%)`);
      }
    } catch (err) {
      // If minification fails, copy as-is
      await copyFile(srcPath, destPath);
      console.warn(`  ✗ ${rel} — ${err.message}`);
    }
  } else {
    // Copy non-JS/CSS files (HTML, images, fonts, etc.) as-is
    await copyFile(srcPath, destPath);
    filesCopied++;
  }
}

console.log(`\n✅ Done! ${filesProcessed} files minified (${(totalSaved / 1024).toFixed(1)} KiB saved), ${filesCopied} files copied.`);
console.log(`   Output: ${DIST_DIR}/`);

