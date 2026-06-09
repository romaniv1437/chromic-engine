#!/usr/bin/env node
/**
 * fill-lyrics.js — ELRC-Only: Generate premium word-level lyrics via Whisper AI
 *
 * Usage: node fill-lyrics.js [--limit N] [--force] [--model base|small|medium]
 *
 * Strategy: Whisper is the ONLY source of truth. No LRCLIB, no syncedlyrics.
 * Every track gets word-level timestamps directly from AI transcription.
 *
 * Results: .lyrics.json sidecar files (lyricIdea14 format with per-word timing)
 */

const fs = require('fs');
const path = require('path');
const os = require('os');
const { spawn } = require('child_process');
const Database = require('better-sqlite3');
const mm = require('music-metadata');

// ─── Config ──────────────────────────────────────────────────────────────────
const MEDIA_ROOT = path.join(__dirname, 'media');
const DB_PATH = path.join(MEDIA_ROOT, 'tracks.db');
const VENV_DIR = path.join(__dirname, 'lyrics-engine', 'venv');
const PYTHON_BIN = path.join(VENV_DIR, 'bin', 'python');
const ALIGNER_SCRIPT = path.join(__dirname, 'lyrics-engine', 'aligner.py');

const args = process.argv.slice(2);
const LIMIT = args.includes('--limit') ? parseInt(args[args.indexOf('--limit') + 1]) || 50 : Infinity;
const FORCE = args.includes('--force');
const MODEL = args.includes('--model') ? args[args.indexOf('--model') + 1] : 'large-v3-turbo';

// ─── Guided Alignment via Python aligner.py ──────────────────────────────────
async function generateELRC(audioPath, artist, title) {
  return new Promise((resolve) => {
    const startTime = Date.now();

    const procArgs = [
      ALIGNER_SCRIPT, audioPath,
      '--model', MODEL,
    ];
    if (artist) { procArgs.push('--artist', artist); }
    if (title) { procArgs.push('--title', title); }

    const proc = spawn(PYTHON_BIN, procArgs, {
      stdio: ['ignore', 'pipe', 'pipe'],
    });

    let stdout = '';
    let stderr = '';
    proc.stdout.on('data', (d) => { stdout += d.toString(); });
    proc.stderr.on('data', (d) => {
      stderr += d.toString();
      // Stream stderr for progress visibility
      const lines = d.toString().trim().split('\n');
      for (const line of lines) {
        if (line.startsWith('[aligner]')) console.log(`  ${line}`);
      }
    });


    const timer = setTimeout(() => {
      proc.kill('SIGTERM');
      console.log(`  ⏰ Timed out (3min)`);
      resolve(null);
    }, 180000);

    proc.on('close', (code) => {
      clearTimeout(timer);
      const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);

      if (code !== 0) {
        console.log(`  ❌ Failed (code=${code}, ${elapsed}s)`);
        const errLines = stderr.trim().split('\n').filter(l => !l.startsWith('[aligner]'));
        if (errLines.length) console.log(`     ${errLines.slice(-3).join('\n     ')}`);
        resolve(null);
        return;
      }

      try {
        const result = JSON.parse(stdout);
        if (result.error) {
          console.log(`  ❌ ${result.error}`);
          resolve(null);
          return;
        }
        const lines = result.lines || [];
        if (lines.length > 0) {
          const wordLines = lines.filter(l => l.words);
          const stretchCount = lines.reduce((n, l) => n + (l.words || []).filter(w => w.stretch).length, 0);
          console.log(`  ✅ ${lines.length} segments (${wordLines.length} word-level, ${stretchCount} stretches) [${result.source}] ${elapsed}s`);
          if (result.cleanArtist) console.log(`  ️  Clean artist: "${result.cleanArtist}"`);
          if (result.cleanTitle) console.log(`  ️  Clean title: "${result.cleanTitle}"`);
          resolve({ lines, cleanArtist: result.cleanArtist, cleanTitle: result.cleanTitle });
        } else {
          console.log(`  ❌ No segments (${elapsed}s)`);
          resolve(null);
        }
      } catch (e) {
        console.log(`  ❌ JSON parse error: ${e.message} (${elapsed}s)`);
        resolve(null);
      }
    });

    proc.on('error', (e) => {
      clearTimeout(timer);
      console.log(`  ❌ Spawn error: ${e.message}`);
      resolve(null);
    });
  });
}

// ─── Main ────────────────────────────────────────────────────────────────────
async function main() {
  // Verify Whisper is installed
  if (!fs.existsSync(PYTHON_BIN)) {
    console.error(`❌ Python venv not found at: ${PYTHON_BIN}`);
    console.error(`   Run: cd lyrics-engine && python3 -m venv venv && venv/bin/pip install -r requirements.txt`);
    process.exit(1);
  }
  if (!fs.existsSync(ALIGNER_SCRIPT)) {
    console.error(`❌ aligner.py not found at: ${ALIGNER_SCRIPT}`);
    process.exit(1);
  }

  // Scan filesystem directly (don't rely on potentially stale DB)
  const MUSIC_EXTENSIONS = ['.mp3', '.flac', '.m4a', '.wav', '.ogg', '.aac', '.aiff'];
  const musicDir = path.join(MEDIA_ROOT, 'music');

  function scanDir(dir) {
    let files = [];
    if (!fs.existsSync(dir)) return files;
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        files = files.concat(scanDir(full));
      } else if (MUSIC_EXTENSIONS.includes(path.extname(entry.name).toLowerCase())) {
        files.push(full);
      }
    }
    return files;
  }

  console.log(`\n ELRC-Only Pipeline: Whisper AI (model: ${MODEL})`);
  console.log(`   Scanning: ${musicDir}`);

  const allFiles = scanDir(musicDir);
  // Filter: only files that DON'T already have .lyrics.json (unless --force)
  const tracks = allFiles.filter(f => {
    const sidecar = f.replace(/\.[^/.]+$/, '.lyrics.json');
    return FORCE || !fs.existsSync(sidecar);
  });

  console.log(`   Total audio files: ${allFiles.length}`);
  console.log(`   Need processing: ${tracks.length}`);
  if (LIMIT < Infinity) console.log(`   Limit: ${LIMIT}`);
  if (FORCE) console.log(`    FORCE mode: regenerating all`);
  console.log('');

  // Also update DB if available
  let stmtUpdate = null;
  let db = null;
  if (fs.existsSync(DB_PATH)) {
    db = new Database(DB_PATH);
    stmtUpdate = db.prepare('UPDATE tracks SET lyrics=@lyrics, lyrics_type=@lyrics_type WHERE path=@path');
  }

  let processed = 0, success = 0;

  for (const fullPath of tracks) {
    if (processed >= LIMIT) break;

    // Skip files > 100MB
    const stat = fs.statSync(fullPath);
    if (stat.size > 100 * 1024 * 1024) continue;

    processed++;
    const baseName = path.basename(fullPath, path.extname(fullPath));
    let artist = '', title = baseName;

    // Priority 1: Read metadata from audio file
    try {
      const metadata = await mm.parseFile(fullPath, { duration: false, skipCovers: true });
      if (metadata.common.artist) artist = metadata.common.artist;
      if (metadata.common.title) title = metadata.common.title;
    } catch (e) {}

    // Priority 2: Parse filename if metadata missing
    if (!artist || !title || title === baseName) {
      const dashMatch = baseName.match(/^(.+?)\s*[-–—]\s*(.+)$/);
      if (dashMatch) {
        if (!artist) artist = dashMatch[1].trim();
        if (title === baseName) title = dashMatch[2].trim();
      }
    }
    // Strip track numbers like "01 - " or "01. "
    title = title.replace(/^\d{1,2}[\s.\-]+/, '').trim();
    artist = artist.replace(/^\d{1,2}[\s.\-]+/, '').trim();

    // Priority 3: If no artist found, try parent folder (pattern: "Artist - Album")
    if (!artist) {
      const parentDir = path.basename(path.dirname(fullPath));
      const folderDash = parentDir.match(/^(.+?)\s*[-–—]\s*(.+)$/);
      if (folderDash) {
        artist = folderDash[1].trim();
      }
    }

    // Clean junk from title (FLAC, kHz, etc.) for display and search
    const cleanTitle = title
      .replace(/\(\s*(?:FLAC|WAV|MP3|AAC|OGG|ALAC|AIFF|DSD)\s*[^)]*\)/gi, '')
      .replace(/\d+[_/]\d+\.?\d*\s*kHz/gi, '')
      .replace(/\(?\s*Explicit\s*\)?/gi, '')
      .replace(/\s+/g, ' ').trim();
    const displayTitle = cleanTitle || title;

    console.log(`[${processed}/${Math.min(tracks.length, LIMIT)}] ${artist || '?'} - ${displayTitle}`);

    const result = await generateELRC(fullPath, artist, displayTitle);

    if (result && result.lines && result.lines.length > 0) {
      const lyricsJson = JSON.stringify(result.lines);
      const sidecarPath = fullPath.replace(/\.[^/.]+$/, '.lyrics.json');
      try { fs.writeFileSync(sidecarPath, lyricsJson); } catch (e) {}

      // Update DB if path matches (include clean names if sanitized)
      if (db) {
        const relPath = path.relative(MEDIA_ROOT, fullPath);
        try { stmtUpdate.run({ path: relPath, lyrics: lyricsJson, lyrics_type: 'synced' }); } catch (e) {}
        // Update clean artist/title in DB if sanitizer found junk
        if (result.cleanArtist || result.cleanTitle) {
          try {
            const cleanStmt = db.prepare('UPDATE tracks SET artist=COALESCE(@artist, artist), title=COALESCE(@title, title) WHERE path=@path');
            cleanStmt.run({ path: relPath, artist: result.cleanArtist || null, title: result.cleanTitle || null });
          } catch (e) {}
        }
      }
      success++;
    }
  }

  console.log(`\n✨ Done! Processed: ${processed} | Success: ${success}`);
  if (db) db.close();
}

main().catch(e => { console.error('Fatal:', e); process.exit(1); });


