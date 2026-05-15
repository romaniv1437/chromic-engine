/**
 * Lyrics Worker — Off-Main-Thread timeline processing & search normalization.
 * Handles: cleanTimings, buildLyricTimeline, buildAuthoritativeTimeline, fuzzy search.
 * The Main Thread never blocks on string processing.
 */

const CJK_RE = /[\u3000-\u303F\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FFF\uFF00-\uFFEF\u2E80-\u2FFF]/;
function _splitTextForTiming(text) {
  if (!CJK_RE.test(text)) return text.split(/\s+/).filter(Boolean);
  const tokens = [];
  const parts = text.split(/([\u3000-\u303F\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FFF\uFF00-\uFFEF\u2E80-\u2FFF]+)/);
  const PUNCT = '、。！？…・ー〜';
  for (const part of parts) {
    if (!part) continue;
    if (CJK_RE.test(part)) {
      const chars = [...part];
      let i = 0;
      while (i < chars.length) {
        let cluster = chars[i];
        while (i + 1 < chars.length && PUNCT.includes(chars[i + 1])) { i++; cluster += chars[i]; }
        tokens.push(cluster);
        i++;
      }
    } else {
      for (const w of part.split(/\s+/)) { if (w) tokens.push(w); }
    }
  }
  return tokens;
}

const cleanTimings = (rawLines) => {
  if (!Array.isArray(rawLines)) return rawLines;
  return rawLines.map((line) => {
    const words = (line.words || []).map((w, j) => {
      let wStart = parseFloat(w.start);
      let wEnd = parseFloat(w.end);
      if (isNaN(wEnd)) {
        const nextWord = (line.words || [])[j + 1];
        wEnd = nextWord ? parseFloat(nextWord.start) : wStart + 0.5;
      }
      if (isNaN(wStart)) wStart = 0;
      return { ...w, start: wStart, end: wEnd };
    });
    let lineEnd = parseFloat(line.end);
    let lineStart = parseFloat(line.start);
    if (isNaN(lineStart)) lineStart = parseFloat(line.time);
    if (isNaN(lineEnd)) lineEnd = words.length > 0 ? words[words.length - 1].end : (lineStart || 0) + 2.0;
    if (isNaN(lineStart)) lineStart = words.length > 0 ? words[0].start : 0;
    return { ...line, words, start: lineStart, end: lineEnd };
  });
};

const buildLyricTimeline = (lines, durationSeconds = 0) => {
  const prepared = Array.isArray(lines) ? lines.filter((line) => String(line || '').trim().length > 0) : [];
  if (!prepared.length) return [];

  const safeDuration = Number.isFinite(durationSeconds) && durationSeconds > 0 ? durationSeconds : prepared.length * 4;
  const step = Math.max(1.8, safeDuration / prepared.length);
  const timeline = [];
  let currentTime = 0;

  for (let index = 0; index < prepared.length; index++) {
    const text = String(prepared[index]).trim();
    const words = text.split(/\s+/).filter(Boolean);
    const lineStart = step * index;
    const lineEnd = step * (index + 1);
    const lineDuration = lineEnd - lineStart;

    if (lineStart - currentTime > 2.5) {
      timeline.push({ type: 'vocal_cue', start: currentTime, end: lineStart });
    }

    const totalChars = words.reduce((sum, w) => sum + w.length, 0) || 1;
    let cursor = lineStart;
    const wordData = words.map((word) => {
      const ratio = word.length / totalChars;
      const wordDuration = lineDuration * ratio;
      const wordStart = cursor;
      cursor += wordDuration;
      return { text: word, start: wordStart, end: cursor };
    });

    timeline.push({ type: 'line', text, start: lineStart, end: lineEnd, words: wordData });
    currentTime = lineEnd;
  }

  if (safeDuration - currentTime > 2.5) {
    timeline.push({ type: 'vocal_cue', start: currentTime, end: safeDuration });
  }
  return timeline;
};

const buildAuthoritativeTimeline = (beTimeline, duration) => {
  const raw = Array.isArray(beTimeline) ? [...beTimeline] : [];
  if (!raw.length) return [];

  const valid = raw.filter(e => Number.isFinite(e.start) && Number.isFinite(e.end));
  if (valid.length === 0) return [];

  valid.sort((a, b) => a.start - b.start);

  const timeline = [];

  // Insert vocal_cue entries for gaps between lines (>1.5s)
  for (let i = 0; i < valid.length; i++) {
    const entry = valid[i];

    if (i === 0 && entry.start > 2.0) {
      timeline.push({ type: 'vocal_cue', start: 0, end: entry.start });
    } else if (i > 0) {
      const prevEnd = valid[i - 1].end;
      const gap = entry.start - prevEnd;
      if (gap > 1.5) {
        timeline.push({ type: 'vocal_cue', start: prevEnd, end: entry.start });
      }
    }

    timeline.push(entry);

    // Ensure every line entry has words (generate fallback if missing)
    if (entry.type !== 'vocal_cue' && (!entry.words || entry.words.length === 0) && entry.text) {
      const wordStrings = _splitTextForTiming(String(entry.text));
      const lineDur = (entry.end || 0) - (entry.start || 0);
      const totalChars = wordStrings.reduce((s, w) => s + w.length, 0) || 1;
      let cursor = entry.start || 0;
      entry.words = wordStrings.map(w => {
        const ratio = w.length / totalChars;
        const wDur = lineDur * ratio;
        const wStart = cursor;
        cursor += wDur;
        return { text: w, start: wStart, end: cursor };
      });
    }
  }

  // Trailing: extend last real line to track end instead of showing vocal_cue dots
  if (valid.length > 0 && duration && duration - valid[valid.length - 1].end > 3) {
    const lastLine = timeline.findLast(e => e.type !== 'vocal_cue');
    if (lastLine) {
      lastLine.end = duration;
    }
  }

  return timeline;
};

/**
 * Fuzzy text search/normalization for spotlight queries.
 * Strips punctuation, normalizes apostrophes, case-insensitive.
 */
const normalizeText = (text) =>
  String(text || '').toLowerCase().replace(/[''`]/g, '').replace(/[^a-z0-9\s]/g, '').trim();

const fuzzyMatch = (query, items) => {
  const normQ = normalizeText(query);
  if (!normQ) return [];
  return items.filter(item => {
    const normTitle = normalizeText(item.title);
    const normArtist = normalizeText(item.artist);
    return normTitle.includes(normQ) || normArtist.includes(normQ);
  });
};

// Message handler
self.onmessage = (e) => {
  const { id, type, payload } = e.data;

  switch (type) {
    case 'buildTimeline': {
      const { track, duration } = payload;
      let timeline;
      if (Array.isArray(track?.enhancedLyrics?.timeline) && track.enhancedLyrics.timeline.length) {
        const trimmed = cleanTimings(track.enhancedLyrics.timeline);
        timeline = buildAuthoritativeTimeline(trimmed, duration);
      } else {
        const rawLyrics = Array.isArray(track?.lyrics)
          ? track.lyrics
          : typeof track?.lyrics === 'string'
            ? track.lyrics.split('\n')
            : [];
        timeline = buildLyricTimeline(rawLyrics, duration);
      }
      // Task 6: For large timelines, encode timing data as Float64Array (Transferable)
      // This avoids structured-clone overhead for the numeric arrays
      if (timeline.length > 20) {
        const timingBuffer = new Float64Array(timeline.length * 2);
        for (let i = 0; i < timeline.length; i++) {
          timingBuffer[i * 2] = timeline[i].start;
          timingBuffer[i * 2 + 1] = timeline[i].end;
        }
        self.postMessage(
          { id, type: 'timelineResult', payload: timeline, timingBuffer },
          [timingBuffer.buffer]
        );
      } else {
        self.postMessage({ id, type: 'timelineResult', payload: timeline });
      }
      break;
    }

    case 'search': {
      const { query, items } = payload;
      const results = fuzzyMatch(query, items);
      self.postMessage({ id, type: 'searchResult', payload: results });
      break;
    }

    default:
      self.postMessage({ id, type: 'error', payload: `Unknown message type: ${type}` });
  }
};


