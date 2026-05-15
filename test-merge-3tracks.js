#!/usr/bin/env node
/**
 * Test script: runs whisper with --language ru on 3 tracks,
 * then simulates the plain-text merge logic from index.js
 * Reports anchor counts and sample output.
 */
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const os = require('os');

const WHISPER = path.join(__dirname, 'lyrics-engine/venv/bin/whisper-ctranslate2');
const ALBUM = path.join(__dirname, 'media/music/2018-11-20 - flac');

const tracks = [
  '05 Пирога кусок',
  '09 Бульбик или Бонг',
  '02 Кто там у руля_!',
];

// ─── Merge logic (copied from index.js) ───
const norm = s => String(s).toLowerCase().replace(/[^\p{L}\p{N}]/gu, '');
const getBigrams = s => { const b = new Set(); for (let i = 0; i < s.length - 1; i++) b.add(s.slice(i, i + 2)); return b; };
const diceScore = (a, b) => {
  const ab = getBigrams(a), bb = getBigrams(b);
  let shared = 0; for (const x of ab) if (bb.has(x)) shared++;
  return (2 * shared) / (ab.size + bb.size) || 0;
};

function runMerge(lrcLines, whisperSegments) {
  const whisperRaw = [...whisperSegments].sort((a, b) => (a.time || a.start || 0) - (b.time || b.start || 0));

  // Normalize whisper segments to have .time
  for (const s of whisperRaw) {
    if (s.start !== undefined && s.time === undefined) s.time = s.start;
  }

  // Breath-merge
  const whisperMerged = [];
  for (let wi = 0; wi < whisperRaw.length; wi++) {
    const seg = { ...whisperRaw[wi], words: whisperRaw[wi].words ? [...whisperRaw[wi].words] : [] };
    while (wi + 1 < whisperRaw.length) {
      const nextSeg = whisperRaw[wi + 1];
      const segEnd = seg.words?.length > 0 ? seg.words[seg.words.length - 1].end : (seg.end || seg.time + 2);
      const nextStart = nextSeg.time || 0;
      const gap = nextStart - segEnd;
      if (gap < 0.8 && gap >= -0.1) {
        seg.text = (seg.text || '') + ' ' + (nextSeg.text || '');
        seg.end = nextSeg.end || nextStart + 2;
        if (nextSeg.words) seg.words.push(...nextSeg.words);
        wi++;
      } else break;
    }
    whisperMerged.push(seg);
  }

  const minSegments = Math.max(5, Math.floor(lrcLines.length / 3));
  const whisperSorted = whisperMerged.length >= minSegments
    ? whisperMerged
    : whisperRaw.map(s => ({ ...s, words: s.words ? [...s.words] : [] }));

  console.log(`    Breath-merge: ${whisperRaw.length} → ${whisperMerged.length} (threshold: ${minSegments}, using: ${whisperSorted.length})`);

  const nonEmpty = lrcLines.filter(l => norm(l.text));
  const N = nonEmpty.length;
  const M = whisperSorted.length;

  // Pass 1: Dice anchors
  const anchors = [];
  let lastAnchorWi = -1;

  for (let li = 0; li < N; li++) {
    const pNorm = norm(nonEmpty[li].text);
    let bestWi = -1, bestSpan = 1, bestScore = 0;
    const expectedWi = Math.round((li / N) * M);
    const searchFrom = Math.max(lastAnchorWi + 1, expectedWi - 10);
    const searchTo = Math.min(M, expectedWi + 10);

    for (let wi = searchFrom; wi < searchTo; wi++) {
      const s1 = diceScore(pNorm, norm(whisperSorted[wi].text));
      if (s1 > bestScore) { bestScore = s1; bestWi = wi; bestSpan = 1; }
      if (wi + 1 < whisperSorted.length) {
        const s2 = diceScore(pNorm, norm(whisperSorted[wi].text + ' ' + whisperSorted[wi+1].text));
        if (s2 > bestScore) { bestScore = s2; bestWi = wi; bestSpan = 2; }
      }
      if (wi + 2 < whisperSorted.length) {
        const s3 = diceScore(pNorm, norm(whisperSorted[wi].text + ' ' + whisperSorted[wi+1].text + ' ' + whisperSorted[wi+2].text));
        if (s3 > bestScore) { bestScore = s3; bestWi = wi; bestSpan = 3; }
      }
    }

    if (bestScore >= 0.35) {
      anchors.push({ li, wi: bestWi, span: bestSpan, score: bestScore });
      lastAnchorWi = bestWi + bestSpan - 1;
    }
  }

  console.log(`    Pass 1 (Dice): ${anchors.length}/${N} anchored`);
  for (const a of anchors) {
    console.log(`      L${a.li}→W${a.wi} score=${a.score.toFixed(2)} "${nonEmpty[a.li].text.slice(0,45)}" ← "${whisperSorted[a.wi].text.slice(0,45)}"`);
  }

  // Fallback
  if (anchors.length <= 3 && N > 5 && M > 5) {
    console.log(`    ⚠️ Too few anchors, proportional fallback activated`);
    anchors.length = 0;
    for (let li = 0; li < N; li++) {
      const expectedWi = Math.min(M - 1, Math.round((li / N) * M));
      anchors.push({ li, wi: expectedWi, span: 1, score: 0.5 });
    }
    console.log(`    Proportional: ${anchors.length}/${N} mapped`);
  }

  return { anchored: anchors.length, total: N, interpolated: N - anchors.length };
}

// ─── Main ───
async function main() {
  const outDir = path.join(os.tmpdir(), 'whisper-3tracks-test');
  fs.mkdirSync(outDir, { recursive: true });

  for (const trackName of tracks) {
    const audioPath = path.join(ALBUM, trackName + '.flac');
    const lyricsPath = path.join(ALBUM, trackName + '.lyrics.json');

    if (!fs.existsSync(audioPath)) {
      console.log(`\n❌ Audio not found: ${audioPath}`);
      continue;
    }

    console.log(`\n${'═'.repeat(60)}`);
    console.log(`🎵 ${trackName}`);
    console.log(`${'═'.repeat(60)}`);

    // Step 1: Run whisper with --language ru
    const whisperOut = path.join(outDir, trackName + '.json');
    if (!fs.existsSync(whisperOut)) {
      console.log('  Running Whisper (--language ru)...');
      try {
        execSync(`"${WHISPER}" "${audioPath}" --model base --task transcribe --output_format json --word_timestamps True --language ru --output_dir "${outDir}"`, {
          stdio: ['ignore', 'pipe', 'pipe'],
          timeout: 120000,
        });
      } catch (e) {
        console.log(`  ❌ Whisper failed: ${e.message.slice(0, 100)}`);
        continue;
      }
    } else {
      console.log('  Using cached Whisper output');
    }

    // Find the output file (whisper names it based on input filename)
    const actualOut = path.join(outDir, trackName + '.json');
    if (!fs.existsSync(actualOut)) {
      console.log(`  ❌ Whisper output not found: ${actualOut}`);
      continue;
    }

    const whisperData = JSON.parse(fs.readFileSync(actualOut, 'utf-8'));
    const whisperSegs = whisperData.segments.map(s => ({
      time: s.start,
      end: s.end,
      text: s.text?.trim() || '',
      words: (s.words || []).map(w => ({ word: w.word?.trim(), start: w.start, end: w.end })),
    }));
    console.log(`  Whisper: ${whisperSegs.length} segments, lang=${whisperData.language}`);
    console.log(`  Sample words: ${whisperSegs.slice(0,3).map(s => `"${s.text.slice(0,30)}"`).join(', ')}`);

    // Step 2: Load LRCLIB lyrics
    if (!fs.existsSync(lyricsPath)) {
      console.log(`  ⚠️ No lyrics.json found, skipping merge test`);
      continue;
    }
    const lrcData = JSON.parse(fs.readFileSync(lyricsPath, 'utf-8'));
    console.log(`  LRCLIB: ${lrcData.length} lines`);

    // Step 3: Run merge
    console.log('  --- Merge Results ---');
    const result = runMerge(lrcData, whisperSegs);
    console.log(`  ✅ Result: ${result.anchored}/${result.total} anchored, ${result.interpolated} interpolated`);

    const pct = ((result.anchored / result.total) * 100).toFixed(0);
    if (result.anchored / result.total > 0.5) {
      console.log(`  🟢 ${pct}% — GOOD`);
    } else if (result.anchored / result.total > 0.2) {
      console.log(`  🟡 ${pct}% — OK (proportional fallback may help)`);
    } else {
      console.log(`  🔴 ${pct}% — BAD (proportional fallback will activate)`);
    }
  }
}

main().catch(e => console.error(e));

