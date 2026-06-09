# Aligner Improvements (2026-06-08)

This document describes the implemented changes in `lyrics-engine/aligner.py` based on `docs/generalIdea1.md`.

## 1) Better mapping stability for repeated short phrases (point 3.2)

- Added **locality-aware distance penalty** in `map_anchor_to_timings()` pass-1 and pass-2 matching.
- Matching now prefers candidates close to expected timeline position (reduces "jumping" to wrong repeated tokens).
- This directly targets repeated-token cases like `da-da-da` where identical words appear many times.

## 2) Sequence-level anti-jump guard in LRC+Whisper mode (point 3.2)

- In `map_genius_lrc_whisper()`, added locality checks around `SequenceMatcher` anchor transfer:
  - reject matches too far from expected global position,
  - reject suspiciously large index jumps between consecutive accepted anchors.
- Keeps anchors more monotonic and reduces cross-line misattachments in repeated lyric regions.

## 3) Per-character timing export for stretched words (points 1.1, 1.2, 1.3)

- Added smart per-character timing emission in `map_anchor_to_timings()`:
  - if a word has internal char timing (`_chars`) and shows stretch-like behavior, output `char_starts`.
  - keeps normal words compact (no large JSON bloat), but provides detailed timing for expressive words.
- Added a "tail-heavy" heuristic (e.g. words like `too`) to keep onset grouped and let the ending vowel carry more progression.

## 4) Line scroll vs fill collision reduction (point 2.1)

- During LRC time correction, line `time` is anchored to LRC start.
- If first word would fill immediately at line start, a small delay (~60ms max) is applied when safe.
- This reduces visual conflict where line scroll and first-word fill happen at exactly the same moment.

## 5) Onset-aware word start correction from audio energy (point 3.3)

- Extended `_tag_acoustic_features()`:
  - detect first meaningful RMS rise inside a word window,
  - shift `start` forward when beginning looks like breath/noise,
  - keep shift bounded to avoid overcorrection.
- Helps with early-fill issues where highlighting starts before actual vocal onset.

## 6) Force realign mode ignores LRC timing hints (point 4.1)

- Added CLI flag: `--force-realign`.
- When enabled, aligner bypasses local/API/embedded LRC timing hints and rebuilds timing skeleton from Whisper+anchor mapping.
- This ensures logic updates can regenerate fresh timing results without inherited old timing guides.

## 7) Metadata-preserving timing merge for existing sidecars (point 4.2)

- Added `_merge_timings_preserving_metadata()` and integrated merge phase in `main()`.
- If an existing `.lyrics.json` is present:
  - update only timing fields (`start`, `end`, optional `char_starts`) on matched words,
  - preserve existing metadata tags (`whisper`, `spoken`, `sung`, `adlib`, etc.).
- Merge is now intentionally **safety-gated**:
  - runs only in `--force-realign` mode,
  - requires strong old/new token overlap coverage before applying,
  - skips merge when overlap is weak (prevents accidental structure collapse on mismatched sidecars).

## 8) Output cleanup

- Internal `_chars` helper field is now removed before output.
- `char_starts` remains as the public compact per-character timing format.

## Validation performed

- Ran syntax validation:
  - `python3 -m py_compile /Users/illiaromaniv/WebstormProjects/claudecode/lyrics-engine/aligner.py`
- Ran real-track alignment checks (model `small` for practical runtime):
  - `/Users/illiaromaniv/WebstormProjects/claudecode/media/music/04 - Yoru no Odoriko.flac` (`--force-realign`)
  - `/Users/illiaromaniv/WebstormProjects/claudecode/media/music/2018-11-20 - flac/05 Пирога кусок.flac` (`--force-realign`)
  - `/Users/illiaromaniv/WebstormProjects/claudecode/media/music/Music/07. Screen.flac`
  - `/Users/illiaromaniv/WebstormProjects/claudecode/media/music/07. Feel For You.flac`
  - `/Users/illiaromaniv/WebstormProjects/claudecode/media/music/Coraline_ Original Motion Picture Soundtrack/07 Bruno Coulais - The Supper.flac`
- Note: referenced Lana Del Rey tracks from `generalIdea1.md` were not found under local `media/music`, so they could not be executed in this run.
