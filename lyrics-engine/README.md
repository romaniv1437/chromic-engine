# 🎵 Auto Lyric Aligner

**Word-level lyric synchronization** using Whisper ASR + Genius/LRCLIB anchor text. Produces precise per-word timestamps for any audio track.

## How It Works

```
Audio File ──→ Whisper (ASR) ──→ word timings
                                      ↕  fuzzy match (rapidfuzz)
Genius API ──→ anchor text   ──→ official words
                                      ↓
                              Synced .lyrics.json
```

1. **Anchor text** — fetches official lyrics from Genius (explicit, clean text)
2. **Whisper ASR** — transcribes audio with word-level timestamps (MLX-native on Apple Silicon, or CTranslate2)
3. **Guided alignment** — maps Whisper timing onto anchor words using fuzzy matching (rapidfuzz)
4. **LRC fallback** — LRCLIB synced lyrics provide line-level timing as backup
5. **Quality checks** — detects degenerate output (clamped timestamps, compressed clusters) and falls back gracefully

## Features

- **Word-level timestamps** — each word gets precise start/end times
- **Strict text fidelity** — output always matches official lyrics (Whisper only provides timing)
- **Multi-language** — auto-detects language from anchor text (English, Russian, etc.)
- **Apple Silicon native** — uses MLX Whisper for fast inference on M1/M2/M3/M4
- **Vocal cue detection** — identifies instrumental breaks via Whisper silence analysis
- **Degenerate tail detection** — catches and fixes words clamped to audio end
- **Intro cue filtering** — skips false vocal cues before the song starts
- **LRC-only fallback** — when Whisper alignment fails, falls back to LRCLIB line timing
- **Blind mode** — works without anchor text (pure Whisper transcription)
- **Batch processing** — `batch_align.py` processes entire libraries

## Output Format

```json
[
  {
    "time": 14.6,
    "text": "I ponder of something great",
    "words": [
      { "word": "I", "start": 14.6, "end": 14.84 },
      { "word": "ponder", "start": 14.85, "end": 15.28 },
      { "word": "of", "start": 15.29, "end": 15.52 },
      { "word": "something", "start": 15.53, "end": 16.04 },
      { "word": "great", "start": 16.05, "end": 16.62 }
    ]
  },
  { "type": "vocal_cue", "time": 59.4, "end": 88.3 }
]
```

## Installation

```bash
git clone https://github.com/romaniv1437/auto-lyric-aligner.git
cd auto-lyric-aligner
python3 -m venv venv && source venv/bin/activate
pip install -r requirements.txt

# Apple Silicon (MLX Whisper):
pip install mlx-whisper

# Other platforms (CTranslate2):
pip install whisper-ctranslate2

# Genius API key
echo 'GENIUS_API_TOKEN=your_token_here' > .env
```

## Usage

```bash
# Single track
python aligner.py audio.flac --artist "Artist" --title "Song Title" --model medium

# Batch processing
python batch_align.py                  # all tracks
python batch_align.py --force          # re-run even if sidecar exists
python batch_align.py --album "Album"  # specific album
python batch_align.py --check-only     # quality check existing sidecars
```

## Alignment Strategies

| Strategy | Source | When |
|----------|--------|------|
| `genius-lrc-whisper` | Genius text + local LRC + Whisper words | Local `.lrc` file exists |
| `guided-whisper` | Genius text + Whisper timing | Genius lyrics found |
| `lrc-only` | LRCLIB line timing | Whisper alignment quality too low |
| `blind-whisper` | Pure Whisper transcription | No lyrics source found |

## Quality Safeguards

- **Degenerate tail detection** — words clamped to audio duration get re-spread or trigger fallback
- **Compressed cluster detection** — catches lines crammed into impossibly small time windows
- **Intro cue filtering** — won't insert instrumental break markers before the first verse
- **API LRC isolation** — online LRC timestamps (different mastering) only for vocal cue detection, never word placement
- **Monotonicity enforcement** — ensures timestamps always increase

## Requirements

- Python 3.9+
- Genius API token
- FFmpeg
- ~2GB RAM for Whisper medium model

## Tested With

- **English**: Twenty One Pilots, Melanie Martinez, Lana Del Rey, Tame Impala, Pouya
- **Russian**: Detsl aka Le Truk
- **Genres**: Alternative, pop, rap, psychedelic rock, hip-hop

## License

MIT
