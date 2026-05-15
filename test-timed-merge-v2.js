#!/usr/bin/env node
/**
 * Test the NEW timed merge: Dice anchor + Whisper timestamps + LRCLIB text
 */
const fs = require('fs');
const path = require('path');

const whisperPath = '/tmp/whisper-test-fix/05 Пирога кусок.json';
const lyricsPath = path.join(__dirname, 'media/music/2018-11-20 - flac/05 Пирога кусок.lyrics.json');

const whisperData = JSON.parse(fs.readFileSync(whisperPath, 'utf-8'));
const lrcData = JSON.parse(fs.readFileSync(lyricsPath, 'utf-8'));

const whisperSorted = whisperData.segments
  .filter(s => s.words && s.words.length > 0)
  .map(s => ({
    time: s.start, end: s.end, text: s.text?.trim() || '',
    words: (s.words || []).map(w => ({ word: w.word?.trim(), start: w.start, end: w.end })),
  }))
  .sort((a, b) => a.time - b.time);

const norm = s => String(s).toLowerCase().replace(/[^\p{L}\p{N}]/gu, '');
const getBigrams = s => { const b = new Set(); for (let i = 0; i < s.length - 1; i++) b.add(s.slice(i, i + 2)); return b; };
const diceScore = (a, b) => {
  const ab = getBigrams(a), bb = getBigrams(b);
  let shared = 0; for (const x of ab) if (bb.has(x)) shared++;
  return (2 * shared) / (ab.size + bb.size) || 0;
};

const nonEmpty = lrcData.filter(l => norm(l.text));
const N = nonEmpty.length;
const M = whisperSorted.length;

console.log(`LRC lines: ${N}, Whisper segments: ${M}\n`);

// Dice anchor matching — use LRC timestamps as HINT
const anchors = [];
let lastWi = -1;
for (let li = 0; li < N; li++) {
  const pNorm = norm(nonEmpty[li].text);
  const lrcTime = nonEmpty[li].time ?? 0;
  let bestWi = -1, bestSpan = 1, bestScore = 0;
  const expected = Math.round((li / N) * M);

  let from = Math.max(lastWi + 1, 0);
  let to = M;
  if (lrcTime > 0) {
    for (let wi = from; wi < M; wi++) {
      if (whisperSorted[wi].time >= lrcTime - 15) { from = Math.max(from, wi); break; }
    }
    for (let wi = from; wi < M; wi++) {
      if (whisperSorted[wi].time > lrcTime + 15) { to = wi; break; }
    }
  } else {
    from = Math.max(lastWi + 1, expected - 10);
    to = Math.min(M, expected + 10);
  }

  for (let wi = from; wi < to; wi++) {
    const s1 = diceScore(pNorm, norm(whisperSorted[wi].text));
    if (s1 > bestScore) { bestScore = s1; bestWi = wi; bestSpan = 1; }
    if (wi + 1 < M) {
      const s2 = diceScore(pNorm, norm(whisperSorted[wi].text + ' ' + whisperSorted[wi+1].text));
      if (s2 > bestScore) { bestScore = s2; bestWi = wi; bestSpan = 2; }
    }
  }
  if (bestScore >= 0.30) {
    anchors.push({ li, wi: bestWi, span: bestSpan, score: bestScore });
    lastWi = bestWi + bestSpan - 1;
    console.log(`  ANCHOR L${li}→W${bestWi} score=${bestScore.toFixed(2)} lrc=${lrcTime.toFixed(1)}s wh=${whisperSorted[bestWi].time.toFixed(1)}s "${nonEmpty[li].text.slice(0,40)}" ← "${whisperSorted[bestWi].text.slice(0,40)}"`);
  }
}

if (anchors.length <= 3 && N > 5 && M > 5) {
  console.log(`⚠️ Too few anchors (${anchors.length}), proportional fallback`);
  anchors.length = 0;
  for (let li = 0; li < N; li++) {
    anchors.push({ li, wi: Math.min(M - 1, Math.round((li / N) * M)), span: 1, score: 0.5 });
  }
}
console.log(`Anchored: ${anchors.length}/${N}\n`);

const getT = (wi, span = 1) => {
  const segs = whisperSorted.slice(wi, wi + span);
  const allW = segs.flatMap(s => s.words || []);
  return {
    start: allW.length > 0 ? allW[0].start : segs[0].time,
    end: allW.length > 0 ? allW[allW.length-1].end : segs[segs.length-1].end,
  };
};

const anchorMap = new Map(anchors.map(a => [a.li, a]));

console.log('=== Output (first 20 lines) ===');
for (let li = 0; li < Math.min(N, 20); li++) {
  const anchor = anchorMap.get(li);
  let tStart, tEnd, source;
  if (anchor) {
    const t = getT(anchor.wi, anchor.span);
    tStart = t.start; tEnd = t.end; source = `ANCHOR W${anchor.wi} (${anchor.score.toFixed(2)})`;
  } else {
    let prevA = null, nextA = null;
    for (let a = anchors.length - 1; a >= 0; a--) { if (anchors[a].li < li) { prevA = anchors[a]; break; } }
    for (let a = 0; a < anchors.length; a++) { if (anchors[a].li > li) { nextA = anchors[a]; break; } }
    if (prevA && nextA) {
      const pEnd = getT(prevA.wi, prevA.span).end;
      const nStart = getT(nextA.wi, nextA.span).start;
      const gap = nextA.li - prevA.li;
      const pos = li - prevA.li;
      tStart = pEnd + (pos / gap) * (nStart - pEnd);
      tEnd = pEnd + ((pos + 1) / gap) * (nStart - pEnd);
    } else {
      tStart = 0; tEnd = 3;
    }
    source = 'INTERPOLATED';
  }

  // Build words from LRC text
  const words = nonEmpty[li].text.split(/\s+/).filter(Boolean);
  const totalC = words.reduce((s, w) => s + w.length, 0) || 1;
  const dur = tEnd - tStart;
  let c = tStart;
  const wOut = words.map((w, i) => {
    const wd = (w.length / totalC) * dur;
    const e = i === words.length - 1 ? tEnd : c + wd;
    const r = { word: w, start: +c.toFixed(2), end: +e.toFixed(2) };
    c = e;
    return r;
  });

  console.log(`  [${tStart.toFixed(2)} → ${tEnd.toFixed(2)}] ${source}`);
  console.log(`    "${nonEmpty[li].text.slice(0, 60)}"`);
  console.log(`    Words: ${wOut.map(w => w.word).join(' | ')}`);
  console.log(`    Times: ${wOut.map(w => w.start.toFixed(2) + '-' + w.end.toFixed(2)).join(', ')}`);
  console.log();
}


