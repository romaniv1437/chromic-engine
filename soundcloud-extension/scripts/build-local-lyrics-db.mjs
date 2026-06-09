#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';

const EXT_ROOT = '/Users/illiaromaniv/WebstormProjects/claudecode/soundcloud-extension';
const OUT_DIR = path.join(EXT_ROOT, 'lyrics-db');
const OUT_TRACKS_DIR = path.join(OUT_DIR, 'tracks');

const DEFAULT_SOURCES = [
  '/Users/illiaromaniv/WebstormProjects/claudecode/media/music',
  '/Users/illiaromaniv/Music/Music',
];

const sourceRoots = (process.env.LYRICS_SOURCE_PATHS || '')
  .split(path.delimiter)
  .map((s) => s.trim())
  .filter(Boolean);

const roots = sourceRoots.length ? sourceRoots : DEFAULT_SOURCES;

function walk(dir, out = []) {
  let entries = [];
  try {
    entries = fs.readdirSync(dir, { withFileTypes: true });
  } catch {
    return out;
  }
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === '.chromic-backups' || entry.name === '.git') continue;
      walk(full, out);
      continue;
    }
    if (!entry.isFile()) continue;
    if (!entry.name.endsWith('.lyrics.json')) continue;
    out.push(full);
  }
  return out;
}

function cleanTitle(raw) {
  let s = raw.replace(/\.lyrics\.json$/i, '');
  s = s.replace(/^\d+\s*[.-]\s*/, '');
  s = s.replace(/_/g, ' ');
  s = s.replace(/\s+/g, ' ').trim();
  return s;
}

function deriveArtist(filePath) {
  const parent = path.basename(path.dirname(filePath));
  if (/^\d{4}[-_.]/.test(parent)) return '';
  if (parent.toLowerCase() === 'music') return '';
  if (parent.includes(' - ')) return parent.split(' - ')[0].trim();
  if (parent.includes('_')) return parent.split('_')[0].trim();
  return parent.length > 60 ? '' : parent;
}

function normalizeKeyPart(s) {
  return String(s || '')
    .toLowerCase()
    .replace(/\s+/g, ' ')
    .trim();
}

function trackKey(title, artist) {
  return `${normalizeKeyPart(artist)}::${normalizeKeyPart(title)}`;
}

function validLyricsJson(filePath) {
  try {
    const raw = fs.readFileSync(filePath, 'utf-8');
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) || typeof parsed === 'object';
  } catch {
    return false;
  }
}

function ensureCleanOut() {
  fs.rmSync(OUT_DIR, { recursive: true, force: true });
  fs.mkdirSync(OUT_TRACKS_DIR, { recursive: true });
}

function build() {
  ensureCleanOut();

  const seen = new Set();
  const files = [];
  for (const root of roots) {
    for (const f of walk(root)) {
      if (seen.has(f)) continue;
      seen.add(f);
      files.push(f);
    }
  }

  const tracks = [];
  const dedup = new Map();
  let copied = 0;
  let skippedInvalid = 0;
  let replacedByNewer = 0;

  for (const src of files) {
    if (!validLyricsJson(src)) {
      skippedInvalid += 1;
      continue;
    }

    const relHash = crypto.createHash('sha1').update(src).digest('hex').slice(0, 16);
    const outRel = `tracks/${relHash}.json`;
    const outAbs = path.join(OUT_DIR, outRel);

    const baseName = path.basename(src);
    const title = cleanTitle(baseName);
    const artist = deriveArtist(src);

    let mtimeMs = 0;
    try {
      mtimeMs = fs.statSync(src).mtimeMs || 0;
    } catch {}

    const key = trackKey(title, artist);
    const prev = dedup.get(key);
    if (prev && prev.mtimeMs >= mtimeMs) {
      continue;
    }
    if (prev) {
      replacedByNewer += 1;
    }

    fs.copyFileSync(src, outAbs);
    copied += 1;

    dedup.set(key, {
      title,
      artist,
      file: outRel,
      sourcePath: src,
      mtimeMs,
    });
  }

  tracks.push(...dedup.values());

  const index = {
    generatedAt: new Date().toISOString(),
    totalTracks: tracks.length,
    roots,
    tracks,
  };

  fs.writeFileSync(path.join(OUT_DIR, 'index.json'), JSON.stringify(index, null, 2));

  console.log(`lyrics-db generated: ${tracks.length} unique tracks (copied ${copied}), replaced-by-newer: ${replacedByNewer}, skipped invalid: ${skippedInvalid}`);
  console.log(`output: ${OUT_DIR}`);
}

build();

