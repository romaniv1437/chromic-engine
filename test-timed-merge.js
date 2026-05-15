#!/usr/bin/env node
/**
 * Test the timed merge: LRCLIB text + Whisper timestamps
 * Simulates what index.js does for tracks with LRC timing
 */
const fs = require('fs');
const path = require('path');

const whisperPath = '/tmp/whisper-test-fix/05 Пирога кусок.json';
const lyricsPath = path.join(__dirname, 'media/music/2018-11-20 - flac/05 Пирога кусок.lyrics.json');

const whisperData = JSON.parse(fs.readFileSync(whisperPath, 'utf-8'));
const lrcData = JSON.parse(fs.readFileSync(lyricsPath, 'utf-8'));

// Convert whisper segments to our format
const whisperSegs = whisperData.segments
  .filter(s => s.words && s.words.length > 0)
  .map(s => ({
    time: s.start,
    end: s.end,
    text: s.text?.trim() || '',
    words: (s.words || []).map(w => ({ word: w.word?.trim(), start: w.start, end: w.end })),
  }))
  .sort((a, b) => a.time - b.time);

console.log(`Whisper: ${whisperSegs.length} segments with words`);
console.log(`LRCLIB: ${lrcData.length} lines\n`);

// Show whisper segment timeline
console.log('=== Whisper Segments ===');
whisperSegs.forEach((s, i) => {
  const wStart = s.words[0]?.start?.toFixed(2) || '?';
  const wEnd = s.words[s.words.length-1]?.end?.toFixed(2) || '?';
  console.log(`  W${i}: [${s.time.toFixed(2)} → ${s.end.toFixed(2)}] words:[${wStart}→${wEnd}] "${s.text.slice(0,50)}"`);
});

console.log('\n=== LRC Lines ===');
lrcData.slice(0, 15).forEach((l, i) => {
  console.log(`  L${i}: [${l.time?.toFixed(2)} → ${l.end?.toFixed(2)}] "${l.text?.slice(0,50)}"`);
});

// Simulate matching
console.log('\n=== Timed Merge Matching ===');
const usedWhisper = new Set();
let badMatches = 0;
for (const lrcLine of lrcData) {
  const lrcTime = lrcLine.time ?? 0;
  let bestIdx = -1;
  let bestDist = Infinity;
  for (let wi = 0; wi < whisperSegs.length; wi++) {
    if (usedWhisper.has(wi)) continue;
    const dist = Math.abs(whisperSegs[wi].time - lrcTime);
    if (dist < bestDist) { bestDist = dist; bestIdx = wi; }
    if (whisperSegs[wi].time > lrcTime + 5) break;
  }

  if (bestIdx >= 0 && bestDist < 5) {
    const ws = whisperSegs[bestIdx];
    const wStart = ws.words[0]?.start;
    const wEnd = ws.words[ws.words.length-1]?.end;

    // Check if word timestamps are within the LRC line's time range
    const drift = Math.abs(wStart - lrcTime);
    const status = drift > 3 ? '❌ BAD' : drift > 1.5 ? '⚠️  DRIFT' : '✅ OK';
    if (drift > 3) badMatches++;

    console.log(`  ${status} LRC[${lrcTime.toFixed(2)}] → W${bestIdx}[${wStart?.toFixed(2)}→${wEnd?.toFixed(2)}] dist=${bestDist.toFixed(2)} drift=${drift.toFixed(2)} "${lrcLine.text?.slice(0,40)}"`);
    usedWhisper.add(bestIdx);
  } else {
    console.log(`  ❌ NO MATCH LRC[${lrcTime.toFixed(2)}] "${lrcLine.text?.slice(0,40)}"`);
  }
}
console.log(`\nBad matches: ${badMatches}/${lrcData.length}`);

