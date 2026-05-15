#!/usr/bin/env node
/**
 * sanitize.mjs — Chromic Engine brand sanitization script.
 * Removes all external trademarks and renames to Chromic branding.
 *
 * Usage:
 *   node scripts/sanitize.mjs --dry-run    # Report only
 *   node scripts/sanitize.mjs --apply      # Apply changes
 */

import { readdir, readFile, writeFile, stat } from 'fs/promises';
import { join, extname, relative } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const ROOT = dirname(dirname(fileURLToPath(import.meta.url)));
const PUBLIC_DIR = join(ROOT, 'public');

const ARGS = process.argv.slice(2);
const DRY_RUN = !ARGS.includes('--apply');

if (DRY_RUN) {
  console.log('🔍 DRY RUN MODE — no files will be modified. Use --apply to write changes.\n');
} else {
  console.log('⚡ APPLY MODE — files will be modified in place.\n');
}

// --- Replacement Rules ---

const TEXT_REPLACEMENTS = [
  // Brand names (case-insensitive handled via regex)
  [/Apple Music/gi, 'Chromic Stream'],
  [/Apple/gi, 'Chromic'],
  [/iTunes/gi, 'Chromic'],
  [/itunes/gi, 'chromic'],
  [/Netflix/gi, 'Cinema Vault'],
  [/netflix/gi, 'cinema-vault'],
  [/Disney\+?/gi, 'Cinema Vault'],
  [/HBO/gi, 'Cinema Vault'],
  [/Spotify/gi, 'Spectral Audio'],
  [/SF Pro Display/gi, 'Inter'],
  [/SF Pro/gi, 'Inter'],
  [/San Francisco/gi, 'Inter'],
  [/Glassmorphism/gi, 'Aura Design'],
];

const CSS_VAR_REPLACEMENTS = [
  ['--apple-glass', '--aura-glass'],
  ['--apple-blur', '--aura-frost-blur'],
  ['--apple-radius', '--aura-radius'],
  ['--apple-font', '--aura-font'],
  ['--itunes-accent', '--brand-primary'],
];

const CLASS_REPLACEMENTS = [
  [/\.apple-lyrics/g, '.kinetic-sync-text'],
  [/\.netflix-grid/g, '.media-dynamic-grid'],
  [/apple-lyrics/g, 'kinetic-sync-text'],
  [/netflix-grid/g, 'media-dynamic-grid'],
  [/itunes-silver/g, 'chromic-silver'],
  [/netflix-red/g, 'vault-red'],
];

// Remove unprofessional comments
const COMMENT_REMOVALS = [
  /\/\/\s*(FIXME|fixme|HACK|hack|TODO|todo|XXX|overtime|deadline|corporate).*$/gm,
  /\/\*\s*(FIXME|fixme|HACK|hack|TODO|todo)[\s\S]*?\*\//g,
];

// --- File Walker ---

const SKIP_DIRS = ['node_modules', '.git', 'dist', 'media', 'design', '.idea', 'venv', 'lyrics-engine', 'visualizer'];
const SKIP_FILES = ['package-lock.json', 'sanitize.mjs'];
const PROCESS_EXTS = ['.js', '.ts', '.css', '.html', '.md'];

async function* walkDir(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    if (SKIP_DIRS.includes(entry.name)) continue;
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) {
      yield* walkDir(fullPath);
    } else if (PROCESS_EXTS.includes(extname(entry.name)) && !SKIP_FILES.includes(entry.name)) {
      yield fullPath;
    }
  }
}

// --- Processing ---

let totalFiles = 0;
let modifiedFiles = 0;
let totalReplacements = 0;

for await (const filePath of walkDir(ROOT)) {
  // Skip this script itself
  if (filePath.endsWith('sanitize.mjs')) continue;

  totalFiles++;
  let content = await readFile(filePath, 'utf8');
  let original = content;
  let fileReplacements = 0;

  // Apply text replacements
  for (const [pattern, replacement] of TEXT_REPLACEMENTS) {
    const matches = content.match(pattern);
    if (matches) {
      fileReplacements += matches.length;
      content = content.replace(pattern, replacement);
    }
  }

  // Apply CSS variable replacements
  for (const [oldVar, newVar] of CSS_VAR_REPLACEMENTS) {
    const regex = new RegExp(oldVar.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
    const matches = content.match(regex);
    if (matches) {
      fileReplacements += matches.length;
      content = content.replace(regex, newVar);
    }
  }

  // Apply class replacements
  for (const [pattern, replacement] of CLASS_REPLACEMENTS) {
    const matches = content.match(pattern);
    if (matches) {
      fileReplacements += matches.length;
      content = content.replace(pattern, replacement);
    }
  }

  // Remove unprofessional comments
  for (const pattern of COMMENT_REMOVALS) {
    const matches = content.match(pattern);
    if (matches) {
      fileReplacements += matches.length;
      content = content.replace(pattern, '');
    }
  }

  if (content !== original) {
    modifiedFiles++;
    totalReplacements += fileReplacements;
    const rel = relative(ROOT, filePath);
    console.log(`  ${DRY_RUN ? '📋' : '✓'} ${rel} — ${fileReplacements} replacements`);

    if (!DRY_RUN) {
      await writeFile(filePath, content, 'utf8');
    }
  }
}

console.log(`\n${'═'.repeat(50)}`);
console.log(`📊 Summary: ${modifiedFiles}/${totalFiles} files ${DRY_RUN ? 'would be' : ''} modified`);
console.log(`   Total replacements: ${totalReplacements}`);
if (DRY_RUN) {
  console.log(`\n💡 Run with --apply to write changes.`);
}






