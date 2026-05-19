# Word Types — Aligner Output Snapshot

**Date:** 2026-05-16  
**Aligner:** `lyrics-engine/aligner.py`

## Current Word Object Schema

```jsonc
{
  "word": "начале,",    // the word text (as from lyrics source)
  "start": 87.782,      // start time in seconds
  "end": 87.882,        // end time in seconds
  // Optional flags:
  "adlib": true,         // word is inside parentheses in source lyrics — ad-lib
  "stretch": true,       // word duration significantly exceeds expected (held note)
  "_chars": [...]        // CJK only: sub-character timing array (internal, kept for JP tracks)
}
```

### Word types currently detected by BE

| Flag | Meaning | Detection | Example |
|------|---------|-----------|---------|
| *(none)* | Normal spoken/rapped word | Default | `{"word": "You", "start": 21.68, "end": 22.217}` |
| `"adlib": true` | Ad-lib (background vocal, interjection) | `(parentheses)` in lyrics text | `{"word": "(Yeah)", "start": 42.44, "end": 42.48, "adlib": true}` |
| `"stretch": true` | Stretched/held word (long duration) | Duration exceeds threshold vs word length | `{"word": "nowhere", "start": 22.217, "end": 26.2, "stretch": true}` |

### Word types NOT YET detected (proposed)

| Flag | Meaning | How to detect |
|------|---------|---------------|
| `"whisper": true` | Whispered/quiet vocal | Whisper model confidence + energy analysis |
| `"spoken": true` | Spoken word, not sung | Pitch variance analysis (flat = spoken) |
| `"sung": true` | Melodically sung | Pitch variance analysis (varied = sung) |

---

## Test Results by Track

### 1. Melanie Martinez — Show & Tell (K-12)
- **Source:** `genius-lrc-whisper`
- **Lines:** 44
- **Adlib words:** 31 — e.g. `(Why?)`, `(kill me)`, `(buy and sell me, baby)`, `(show and tell)`, `(fuckers to see)`, `(oh)`
- **Stretch words:** 23 — held notes on line-ending words: `nowhere`, `authority`, `sell`, `tell`, etc.
- **Vocal cues:** 0
- **Notes:** Parenthesized ad-libs correctly detected. Mix of mid-line adlibs `(Why?)` and end-line `(kill me)`. Stretch correctly marks held notes.

### 2. Pouya — Dying Slowly (Blood Was Never Thick As Water)
- **Source:** `genius-lrc-whisper`
- **Lines:** 36
- **Adlib words:** 0 — no parenthesized text in Genius lyrics
- **Stretch words:** 19 — mostly line-ending words: `slow`, `life`, `night`, `skull`, `slowly`, etc.
- **Vocal cues:** 0
- **Notes:** Rap track with no ad-libs in source lyrics. Stretch flags correctly mark elongated last words. This track would benefit from `whisper`/`spoken` detection — intro has soft/spoken delivery.

### 3. IMERIS — Yoru no Odoriko (Japanese)
- **Source:** `genius-lrc-whisper`
- **Lines:** 40
- **Adlib words:** 12 — katakana background vocals: `(ミテイタフリ シテ)`, `(ヨルニニゲタ ダケ)`, etc.
- **Stretch words:** 1 — `分` (held character)
- **Vocal cues:** 6 — instrumental breaks at `[92.5s-114.8s]`, `[153.8s-158.4s]`, etc.
- **Notes:** CJK grouping active (`_chars` key present). Adlibs are katakana romanization-style background vocals in parentheses. Multiple vocal cues for instrumental sections.

### 4. Rasta Mafia — Сигналы (2018)
- **Source:** `genius-lrc-whisper`
- **Lines:** 71
- **Adlib words:** 10 — `(what's up, yo?)`, `(мэ)`, `(да!)`, `(вспомни)`, `(эй!)`, `(а!)` × 2
- **Stretch words:** 40 — many line-ending words in rap verses
- **Vocal cues:** 0
- **Notes:** This is the track with the ad-lib animation issues. Lines like `"Как это было в начале (а!) Как это было в начале (а!)"` have **collapsed lines** — two separate lyric lines merged into one by the aligner because they're in rapid succession. The `(а!)` ad-libs at positions [72.8s] appear at end of each sub-line.

---

## JSON Structure — Full Line Object

```jsonc
// Normal line
{
  "time": 21.68,
  "text": "You pull me by my hair, so I don't go nowhere",
  "words": [
    {"word": "You", "start": 21.68, "end": 22.217},
    {"word": "pull", "start": 22.217, "end": 22.554},
    // ... more words
    {"word": "nowhere", "start": 25.279, "end": 26.2, "stretch": true}
  ]
}

// Line with ad-libs
{
  "time": 38.8,
  "text": "Why is it so hard to see? (Why?)",
  "words": [
    {"word": "Why", "start": 38.8, "end": 39.1},
    {"word": "is", "start": 39.1, "end": 39.3},
    // ... normal words
    {"word": "see?", "start": 41.2, "end": 41.8},
    {"word": "(Why?)", "start": 41.9, "end": 42.5, "adlib": true, "stretch": true}
  ]
}

// Vocal cue (instrumental break)
{
  "type": "vocal_cue",
  "time": 92.5,
  "end": 114.8
}
```

---

## FE Animation Strategy

### Current word classes (based on BE data):
| BE Flag | FE CSS Class | Animation |
|---------|-------------|-----------|
| *(normal)* | `.lyric-word` | Fill progress left→right via `--progress` |
| `adlib: true` | `.lyric-word.is-adlib` | Show below main line, pop-in at word start time, fade out |
| `stretch: true` | `.lyric-word.is-stretch` | Slow glow/pulse during held duration |

### Proposed new animations:
| BE Flag | FE CSS Class | Animation |
|---------|-------------|-----------|
| `whisper: true` | `.lyric-word.is-whisper` | Soft fade-in, lower opacity (0.6), slight blur |
| `spoken: true` | `.lyric-word.is-spoken` | No glow, flat fill, typewriter-style reveal |
| `sung: true` | `.lyric-word.is-sung` | Smooth wave/undulate fill, subtle glow |

### Ad-lib rendering rules (FE):
1. **Ad-libs are rendered in a separate `.adlibs-wrapper` below the main line text**
2. **Ad-libs appear at their `start` time** — not when line ends
3. **Multiple ad-libs stack**: first one centered, second pushes first left with smooth `transform` animation
4. **No data manipulation on FE** — all word types come from BE `adlib`/`stretch`/etc. flags
5. **Ad-libs don't affect main line layout** — they're absolutely positioned below

---

## Next Steps

1. **Aligner improvements needed:**
   - [ ] Add `whisper` detection (low energy segments from Whisper model)
   - [ ] Add `spoken` vs `sung` detection (pitch variance analysis)
   - [ ] Ensure multi-line adlib grouping with `.lrc` embedded lyrics is correct
   - [ ] Don't collapse rapid-fire lines that have distinct ad-libs

2. **FE improvements needed:**
   - [ ] Read `adlib`/`stretch` flags from BE data (not guess from text)
   - [ ] Implement stretch animation (glow/pulse for held words)
   - [ ] Implement whisper/spoken/sung animations when BE provides them

