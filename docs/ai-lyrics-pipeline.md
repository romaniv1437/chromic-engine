# AI Lyrics Pipeline — Word-Level Timestamps & Translation

## Overview

Chromic Engine uses AI to generate **word-level synchronized lyrics**, **AI-powered translations**, **transliteration (Romaji/Pinyin)**, **Genius-style context tooltips**, and **sentiment-based color extraction**. This enables karaoke-style word highlighting, multi-language lyric display, and mood-reactive visualizers during playback.

---

## 1. Lyrics Acquisition — Cascading Strategy

When a track is played and has no lyrics, the system tries sources in priority order:

| Priority | Source | Speed | Quality | Cost |
|----------|--------|-------|---------|------|
| 1 | `.lrc` sidecar file | Instant | User-provided | Free |
| 2 | `.lyrics.json` sidecar | Instant | Word-level (AI-generated) | Free (cached) |
| 3 | LRCLIB API | ~200ms | Line-level synced | Free |
| 4 | syncedlyrics CLI | ~5-20s | Line-level synced | Free |
| 5 | Whisper AI (local) | ~30-180s | Word-level transcribed | Free (GPU/CPU) |

### Automatic Background Queue

```
Track played → no lyrics found → enqueueLyricsFetch(path, artist, title, album)
  → Queue processes serially (1 track/sec rate limit)
  → Result saved to SQLite + .lyrics.json sidecar
```

---

## 2. LRCLIB — Free Instant Lyrics

**API:** `GET https://lrclib.net/api/get?artist_name=X&track_name=Y&album_name=Z`

- Returns standard LRC format: `[mm:ss.xx] text`
- Parsed to JSON array of `{ time, text }` objects
- Line-level only (no word timestamps)
- Used as **anchor text** for Whisper alignment

---

## 3. syncedlyrics CLI — Multi-Provider Search

```bash
cd lyrics-engine && venv/bin/syncedlyrics "Artist - Title" --output /tmp/lyrics.lrc
```

- Aggregates Musixmatch, Genius, and other providers
- 20-second timeout per track
- Returns LRC format → parsed to JSON
- Fallback when LRCLIB has no match

---

## 4. Whisper AI — Local Transcription

### Basic Whisper (faster-whisper / ctranslate2)

```bash
venv/bin/whisper-ctranslate2 <audio_path> \
  --model base \
  --output_format json \
  --word_timestamps True \
  --output_dir /tmp
```

- Produces **word-level timestamps** directly from audio
- Models: `tiny` → `base` → `small` → `medium` → `large`
- 3-minute timeout per track
- Skips files > 100MB

### WhisperX — Forced Alignment (`aligner.py`)

The premium pipeline for karaoke-quality timestamps:

```bash
python lyrics-engine/aligner.py <audio_path> \
  --artist "Artist" \
  --title "Title" \
  --model medium \
  --engine whisperx
```

#### How Forced Alignment Works

1. **Sanitize metadata** — Strip "official video", "slowed+reverb", feat. tags
2. **Fetch anchor text** — Get reference lyrics from LRCLIB/syncedlyrics
3. **Transcribe audio** — Whisper generates word timestamps from audio
4. **Force-align to anchor text:**
   - Whisper provides **TIMINGS** (when each word is spoken)
   - Anchor text provides **WORDS** (correct spelling is law)
   - 1:1 word mapping — Whisper timing + anchor spelling
5. **Output** — JSON with per-word `{ text, start, end }` per line

#### Available Engines

| Engine | Command | Speed | Quality | Platform |
|--------|---------|-------|---------|----------|
| `faster` | faster-whisper | ⚡ Fast | Good | All |
| `whisperx` | WhisperX + wav2vec2 | 🐢 Slow | Best (forced alignment) | All |
| `mlx` | mlx-whisper | ⚡ Fast | Good | Apple Silicon only |

### OpenAI Whisper API (Optional Remote)

Instead of local Whisper, can use OpenAI's API:

```env
# lyrics-engine/.env
OPENAI_API_KEY=sk-...
OPENAI_BASE_URL=https://api.openai.com/v1
```

- Sends audio to OpenAI for transcription
- Returns word-level timestamps
- Useful when no local GPU available

---

## 5. Output Format — `.lyrics.json`

```json
[
  {
    "startSec": 15.46,
    "endSec": 19.05,
    "text": "This little eerie island made me a weapon",
    "words": [
      { "text": "This", "start": 15.46, "end": 15.72 },
      { "text": "little", "start": 15.72, "end": 16.01 },
      { "text": "eerie", "start": 16.01, "end": 16.38 },
      { "text": "island", "start": 16.38, "end": 16.82 },
      { "text": "made", "start": 16.82, "end": 17.15 },
      { "text": "me", "start": 17.15, "end": 17.35 },
      { "text": "a", "start": 17.35, "end": 17.48 },
      { "text": "weapon", "start": 17.48, "end": 19.05 }
    ]
  }
]
```

### Storage Locations

| File | Content |
|------|---------|
| `track.lyrics.json` | Word-level timestamps (primary) |
| `track.lrc` | Line-level LRC (user-provided) |
| `track.lyrics.uk.json` | Ukrainian translation cache |
| `track.lyrics.de.json` | German translation cache |
| SQLite `tracks.lyrics` | JSON string of synced lyrics |
| SQLite `tracks.lyrics_type` | `'synced'` / `'not_found'` / `NULL` |

---

## 6. Lyrics Translation — AI-Powered

### API Endpoint

```
POST /api/lyrics/translate
{
  "trackPath": "music/Album/track.mp3",
  "targetLang": "uk",
  "lines": [{ "text": "I'm overthinking" }, ...]
}
```

### Translation Flow

```
1. Check cache: track.lyrics.{lang}.json sidecar
   → If cached → return immediately (zero API cost)

2. Build translation prompt:
   - System: "You are a lyrics translator. Translate naturally, preserving poetic meaning."
   - User: JSON array of lines to translate

3. Send to OpenAI API (or compatible provider):
   - Model: gpt-4o-mini (fast + cheap)
   - Returns translated array matching input line count

4. Save to .lyrics.{lang}.json sidecar (permanent cache)

5. Return translated array to frontend
```

### Configuration

```env
# lyrics-engine/.env or environment variables
OPENAI_API_KEY=sk-...
OPENAI_BASE_URL=https://api.openai.com/v1   # or custom provider (e.g., local LLM)
OPENAI_MODEL=gpt-4o-mini                     # fast + cheap
```

### Frontend Display

Translation appears as dimmed text below the active lyrics line, toggled via the 🌐 button in the player HUD:

```html
<p class="lyrics-line active">
  <span class="lyric-word active">I'm</span>
  <span class="lyric-word">overthinking</span>
  <span class="lyrics-translation">Я знову накручую себе</span>
</p>
```

```css
.lyrics-line .lyrics-translation {
  display: block;
  font-size: 0.6em;
  color: rgba(255, 255, 255, 0.4);
  opacity: 0;
  transition: opacity 0.4s ease-in-out;
  will-change: opacity; /* Zero GPU overhead */
  pointer-events: none;
}
.show-translations .lyrics-line.active .lyrics-translation {
  opacity: 1;
  pointer-events: auto; /* Enables click-to-edit */
}
```

### Inline Translation Editing

Click on a translation text while `show-translations` is active to edit inline. On blur/Enter, the edit is saved via:

```
PATCH /api/lyrics/translation/save
{
  "trackPath": "music/Album/track.mp3",
  "lang": "uk",
  "translations": ["Translated line 1", "Translated line 2", ...]
}
```

---

## 7. Manual Lyrics Editing (ChromicEditor)

Users can manually edit word timestamps in the player:

### Save Edited Lyrics

```
PATCH /api/metadata/update
{
  "trackPath": "music/Album/track.mp3",
  "lines": [
    { "startSec": 0.5, "endSec": 3.2, "text": "Hello world", "words": [...] }
  ]
}
```

### Insert New Line at Timestamp

```
POST /api/metadata/insert
{
  "trackPath": "music/Album/track.mp3",
  "index": 5,
  "type": "line",
  "currentTime": 12.4
}
```

---

## 8. Quality Indicators

| Condition | Badge | Label |
|-----------|-------|-------|
| `lyrics_type='synced'` + has `words[]` | 💎 | Premium Sync (word-level) |
| `lyrics_type='synced'` without `words[]` | 📝 | Standard Sync (line-level) |
| `lyrics_type='not_found'` | 🤖 | AI Pending |
| `lyrics_type=NULL` | — | Not scanned |

---

## 9. NPM Scripts

```bash
npm run lyrics          # Scan all tracks, fetch missing lyrics
npm run lyrics:force    # Re-fetch lyrics for ALL tracks
npm run scan            # Run lyrics + subtitle alignment
```

---

## 10. Architecture

```
┌─────────────────────────────────────────────────┐
│              Frontend (Renderer)                 │
│  LyricsEngine ← word timestamps → karaoke UI    │
│  ChromicEditor → manual editing → PATCH API      │
│  Translation UI → POST /api/lyrics/translate     │
└───────────────────┬─────────────────────────────┘
                    │
┌───────────────────▼─────────────────────────────┐
│              Express Server (Node.js)            │
│  GET /api/library → scan + upsert tracks.db      │
│  POST /api/lyrics/translate → OpenAI + cache     │
│  PATCH /api/metadata/update → save .lyrics.json  │
│  Background queue → lyrics fetch pipeline        │
└───────────────────┬─────────────────────────────┘
                    │
┌───────────────────▼─────────────────────────────┐
│           Lyrics Engine (Python venv)            │
│  aligner.py → WhisperX / faster-whisper / MLX    │
│  syncedlyrics → multi-provider search            │
│  LRCLIB API → free instant lyrics                │
│  OpenAI API → remote transcription + translation │
└─────────────────────────────────────────────────┘
                    │
            ┌───────▼───────┐
            │    SQLite DB   │  tracks.db
            │  .lyrics.json  │  word-level sidecars
            │  .lyrics.*.json│  translation caches
            └───────────────┘
```

---

## 11. Transliteration (Romaji / Pinyin)

### API Endpoint

```
POST /api/lyrics/transliterate
{
  "trackPath": "music/Album/track.mp3",
  "mode": "romaji",  // "romaji" | "pinyin" | "latin"
  "lines": [{ "text": "夜に駆ける" }, ...]
}
```

- Cached as `.lyrics.romaji.json` / `.lyrics.pinyin.json` sidecar
- Uses the configured AI provider (OpenAI/Groq/Ollama)
- Returns `{ transliterations: [...], cached: boolean }`

---

## 12. Genius-Style Context Tooltips

Right-click any word in the lyrics to get an AI-powered explanation:

### API Endpoint

```
POST /api/lyrics/explain-word
{
  "word": "overthinking",
  "lineText": "I'm overthinking again",
  "songTitle": "Overcompensate",
  "artist": "twenty one pilots"
}
```

Returns `{ explanation: "In this context, 'overthinking' refers to..." }`

Displayed in a floating tooltip near the cursor with glassmorphism styling.

---

## 13. AI Sentiment Color Extraction

Analyze lyrics mood to generate visualizer color palettes:

### API Endpoint

```
POST /api/lyrics/sentiment
{
  "lines": ["I'm overthinking", "Running through the night"],
  "songTitle": "Overcompensate",
  "artist": "twenty one pilots"
}
```

Returns:
```json
{
  "mood": "anxious",
  "color": "#4a6fa5",
  "colors": ["#4a6fa5", "#2d3a4e", "#8fb4d9"]
}
```

Colors are applied to the GPU visualizer when no album artwork palette is available.

---

## 14. Dynamic AI Provider Configuration

### Supported Providers

| Provider | Base URL | Notes |
|----------|----------|-------|
| OpenAI | `https://api.openai.com/v1` | Default, requires API key |
| Groq | `https://api.groq.com/openai/v1` | Fast inference, OpenAI-compatible |
| Ollama | `http://localhost:11434` | Local, free, uses `/api/chat` |
| Custom | Any URL | Any OpenAI-compatible endpoint |

### Settings (stored in `.chromic-config.json`)

```json
{
  "aiProvider": "openai",
  "openaiApiKey": "sk-...",
  "openaiBaseUrl": "https://api.openai.com/v1",
  "openaiModel": "gpt-4o-mini",
  "translationLang": "uk",
  "whisperEngine": "faster",
  "whisperModel": "base",
  "lyricsProvider": "lrclib"
}
```

All AI endpoints use a unified `callAiProvider(prompt, options)` helper that auto-detects Ollama vs OpenAI-compatible APIs.
