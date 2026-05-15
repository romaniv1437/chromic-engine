# Chromic Engine — Music Pipeline Architecture

## Overview

Chromic Engine manages music through a multi-stage pipeline:
1. **Upload** — Audio files + optional cover art + optional lyrics
2. **Scan** — Extract metadata (ID3 tags, duration, embedded artwork)
3. **Enrich** — Fetch synced lyrics, generate word-level timestamps via AI
4. **Translate** — AI-powered lyrics translation (cached per language)

---

## 1. Upload / Import Music Files

### Method A: Native OS Dialog (Electron)

In Electron, we use native file dialogs instead of HTML `<input type="file">`.

**Frontend:**
```javascript
const files = await window.chromicElectron.openMusicDialog();
// Returns array of absolute file paths (files + directories supported)
// Then POST to Express for import:
await fetch('/api/import/music', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ filePaths: files, albumName: 'My Album' })
});
```

**IPC Bridge (`preload.js`):**
- `chromicElectron.openMusicDialog()` → native multi-select dialog (mp3, wav, flac, m4a, aac, ogg, aiff)
- `chromicElectron.openImageDialog()` → native image picker (jpg, png, webp)

### Method B: HTTP Upload (Browser fallback)

```
POST /api/upload/music
Content-Type: multipart/form-data
```

| Field | Required | Description |
|-------|----------|-------------|
| `trackFile` | ✅ | Audio file (.mp3, .wav, .ogg, .m4a, .aac, .aiff) |
| `coverImage` | ❌ | Album artwork (jpg/png) |
| `lyricsFile` | ❌ | Pre-made .lrc lyrics file |
| `albumName` | ❌ | Target album folder (default: "Singles") |

### Native Import Endpoint

```
POST /api/import/music
{ "filePaths": ["/path/to/file.mp3", "/path/to/album-folder"], "albumName": "Optional" }
```

- Handles both files and directories
- Auto-copies cover images from source directories
- Returns `{ ok: true, imported: [...], count: N }`

### File Structure on Disk

```
media/music/
├── Artist - Album Name/
│   ├── 01 - Track Title.mp3
│   ├── 02 - Another Track.mp3
│   ├── cover.jpg                    ← album artwork
│   ├── 01 - Track Title.lrc        ← line-level lyrics (optional)
│   ├── 01 - Track Title.lyrics.json ← word-level lyrics (generated)
│   └── 01 - Track Title.lyrics.uk.json ← translated lyrics (cached)
├── Singles/
│   └── uploaded-track.mp3
```

---

## 2. Metadata Scan (SQLite Index)

### Database: `media/tracks.db` (better-sqlite3, WAL mode)

```sql
CREATE TABLE tracks (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  path TEXT UNIQUE NOT NULL,      -- relative path from media root
  title TEXT,
  artist TEXT,
  album TEXT,
  year INTEGER,
  disc INTEGER,
  duration REAL,
  lyrics TEXT,                     -- JSON string of synced lyrics
  lyrics_type TEXT,                -- 'synced' | 'not_found' | NULL
  cover_format TEXT,               -- 'image/jpeg' etc.
  cover_data TEXT,                 -- base64 embedded artwork
  scanned_at INTEGER
);
```

### Scan Trigger

- On `GET /api/library?type=music` — server scans filesystem, upserts each track
- Music metadata extracted from ID3v2 tags (title, artist, album, year, disc, duration)
- Embedded artwork stored as base64 in `cover_data`

---

## 3. Lyrics Enrichment Pipeline

### Strategy: Cascading Sources

```
Priority 1: .lrc sidecar file (user-provided, always wins)
Priority 2: .lyrics.json sidecar (word-level, from aligner.py)
Priority 3: LRCLIB API (free, instant, line-level synced lyrics)
Priority 4: syncedlyrics CLI (aggregates multiple providers)
Priority 5: Whisper AI (local transcription, word-level timestamps)
```

### Automatic Background Processing

When a track is played and has no lyrics:
1. `enqueueLyricsFetch(path, artist, title, album)` adds to queue
2. Queue processes serially (1 track/second rate limit)
3. Results stored in SQLite + `.lyrics.json` sidecar

### 3a. LRCLIB (Instant, Free)

```
GET https://lrclib.net/api/get?artist_name=X&track_name=Y&album_name=Z
```

Returns standard `[mm:ss.xx] text` LRC format. Parsed to JSON array.

### 3b. syncedlyrics CLI

```bash
cd lyrics-engine && venv/bin/syncedlyrics "Artist - Title" --output /tmp/lyrics.lrc
```

Searches multiple providers (Musixmatch, etc.). 20-second timeout.

### 3c. Whisper AI (Local Transcription)

```bash
venv/bin/whisper-ctranslate2 <audio_path> \
  --model base \
  --output_format json \
  --word_timestamps True \
  --output_dir /tmp
```

- Produces word-level timestamps
- 3-minute timeout per track
- Skips files > 100MB
- Model: `base` (fast) — configurable

### 3d. WhisperX + Forced Alignment (`aligner.py`)

The premium pipeline for karaoke-quality word-by-word timestamps:

```bash
python lyrics-engine/aligner.py <audio_path> \
  --artist "Artist" \
  --title "Title" \
  --model medium \
  --engine whisperx
```

#### Available Engines

| Engine | Speed | Quality | Notes |
|--------|-------|---------|-------|
| `faster` | ⚡ Fast | Good | faster-whisper (ctranslate2) |
| `whisperx` | 🐢 Slow | Best | Word-level forced alignment |
| `mlx` | ⚡ Fast | Good | Apple Silicon optimized |

#### How aligner.py Works

1. **Sanitize** metadata (strip "official video", "slowed+reverb" etc.)
2. **Fetch anchor text** from LRCLIB/syncedlyrics (optional reference lyrics)
3. **Transcribe** with chosen Whisper engine
4. **Force-align** words to anchor text (if available):
   - Whisper provides TIMINGS
   - Anchor text provides WORDS (spelling is law)
   - 1:1 word mapping
5. **Output** JSON with word-level `{text, start, end}` per line

#### OpenAI Provider (Optional)

Set in `lyrics-engine/.env`:

```env
OPENAI_API_KEY=sk-...
OPENAI_BASE_URL=https://api.openai.com/v1
```

Can be used for:
- Transcription via OpenAI Whisper API (instead of local)
- Text correction/cleanup post-transcription

---

## 4. Album Artwork

### Sources (Priority Order)

1. **Uploaded cover** — `coverImage` field in upload API
2. **Embedded artwork** — Extracted from ID3v2 tags during scan
3. **Folder image** — `cover.jpg`, `folder.jpg`, `album.jpg` in album directory

### Storage

- Embedded art: base64 in SQLite `cover_data` column
- Files: served directly from `media/music/{album}/cover.jpg`

### Color Palette Extraction

On the frontend, album artwork is analyzed via `ColorEngine.extractPalette()` to:
- Generate accent colors for the visualizer
- Drive the "Album-Driven" palette mode (default for GPU visualizer)
- Persist palette in localStorage per album

---

## 5. Lyrics Translation (AI-Powered)

### API Endpoint

```
POST /api/lyrics/translate
{
  "trackPath": "music/Album/track.mp3",
  "targetLang": "uk",
  "lines": [{ "text": "I'm overthinking" }, ...]
}
```

### How It Works

1. Check cache: `track.lyrics.{lang}.json` sidecar
2. If cached → return immediately (zero API cost)
3. If not → send lines to OpenAI API with translation prompt
4. Save result to `.lyrics.{lang}.json` sidecar
5. Return translated array

### Configuration

Set in environment or `lyrics-engine/.env`:
```env
OPENAI_API_KEY=sk-...
OPENAI_BASE_URL=https://api.openai.com/v1   # or custom provider
OPENAI_MODEL=gpt-4o-mini                     # fast + cheap
```

### Frontend Rendering

Translation appears as a shadow text below the active lyrics line:

```html
<div class="lyrics-line is-active">
  <div class="main-text">
    <span class="word active">I'm</span>
    <span class="word">overthinking</span>
  </div>
  <div class="translation-text">Я знову накручую себе</div>
</div>
```

```css
.translation-text {
  font-size: 0.65em;
  color: rgba(255, 255, 255, 0.4);
  margin-top: 4px;
  transition: opacity 0.3s ease;
}
.lyrics-line:not(.is-active) .translation-text { opacity: 0; }
```

---

## 6. Premium Data Indicators

Track quality badges based on `lyrics_type` and content:

| Condition | Badge | Label |
|-----------|-------|-------|
| `lyrics_type='synced'` + has `words[]` array | 💎 | Premium Sync (word-level) |
| `lyrics_type='synced'` without `words[]` | 📝 | Standard Sync (line-level) |
| `lyrics_type='not_found'` | 🤖 | AI Pending |
| `lyrics_type=NULL` | — | Not scanned |

These badges appear:
- In the track list (album view)
- In the global player bar
- In the fullscreen overlay

---

## 7. NPM Scripts

```bash
npm run lyrics          # Scan all tracks, fetch missing lyrics
npm run lyrics:force    # Re-fetch lyrics for ALL tracks
npm run scan            # Run lyrics + subtitle alignment
npm run electron        # Launch Electron app (with V8 flags)
npm run electron:build:mac  # Build .dmg
```

---

## 8. Manual Lyrics Editing (ChromicEditor)

### Save edited lyrics back to server:

```
PATCH /api/metadata/update
{
  "trackPath": "music/Album/track.mp3",
  "lines": [
    { "startSec": 0.5, "endSec": 3.2, "text": "Hello world", "words": [...] }
  ]
}
```

### Insert new line at timestamp:

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

## Architecture Diagram

```
┌──────────────────────────────────────────────────────────────┐
│                    Chromic Engine (Electron)                  │
├──────────────┬───────────────────┬───────────────────────────┤
│  UI Thread   │  Express Server   │  Lyrics Engine            │
│  (Renderer)  │  (Node.js)        │  (Python venv)            │
├──────────────┼───────────────────┼───────────────────────────┤
│ Upload UI    │ POST /upload/music│                           │
│ Library View │ POST /import/music│                           │
│ Player       │ GET /api/library  │                           │
│ LyricsEngine │ GET /media/*      │ LRCLIB API                │
│ ChromicEditor│ PATCH /metadata   │ syncedlyrics CLI          │
│ ColorEngine  │ POST /lyrics/translate│ whisper-ctranslate2   │
│ Visualizer   │                   │ aligner.py (whisperx/mlx) │
│ (Worker)     │                   │ OpenAI API (optional)     │
└──────────────┴───────────────────┴───────────────────────────┘
       │                 │
  ┌────┴────┐      ┌─────┴──────┐
  │OffScreen│      │   SQLite   │  media/tracks.db
  │ Canvas  │      │   (WAL)    │  + .lyrics.json sidecars
  │ Worker  │      │            │  + .lyrics.{lang}.json translations
  └─────────┘      └────────────┘

Electron Main Process:
  ├── GPU flags (rasterization, zero-copy, SharedArrayBuffer)
  ├── Native dialogs (ipcMain: dialog:openMusic, dialog:openImage)
  ├── Window controls (minimize, maximize, close)
  ├── Live reload (fs.watch on public/)
  └── Express server (random port, localhost only)
```

---

## 9. Electron Build & Distribution

### electron-builder config (package.json → "build"):

```json
{
  "appId": "com.chromicengine.app",
  "productName": "Chromic Engine",
  "mac": { "target": "dmg", "category": "public.app-category.music", "hardenedRuntime": true },
  "linux": { "target": ["AppImage", "deb"], "category": "Audio" },
  "asarUnpack": ["node_modules/better-sqlite3/**", "node_modules/sharp/**"]
}
```

### Build Commands

```bash
npm run electron:build:mac    # → dist-electron/Chromic Engine.dmg
npm run electron:build:linux  # → dist-electron/Chromic Engine.AppImage
```

