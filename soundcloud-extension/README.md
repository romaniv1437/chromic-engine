# SoundCloud Extension (Vibe View)

Chrome extension scaffold that injects an OffscreenCanvas audio visualizer into `soundcloud.com`.

## Files

- `manifest.json` - MV3 extension manifest.
- `content.js` - injects UI, tracks SoundCloud `<audio>`, and mounts the full visualizer runtime.
- `styles.css` - button + fullscreen overlay styles.
- `visualizer.main.js` - full bundled `audio-visualizer` runtime (exports `ThreeOrchestrator`).
- `visualizer.worker.js` - legacy lightweight worker renderer (kept for fallback/debug).

## Quick Start

1. Build local duplicated lyrics DB (original files remain untouched):

```zsh
cd /Users/illiaromaniv/WebstormProjects/claudecode/soundcloud-extension
npm run build:lyrics-db
```

2. Optional custom roots:

```zsh
cd /Users/illiaromaniv/WebstormProjects/claudecode/soundcloud-extension
LYRICS_SOURCE_PATHS="/Users/illiaromaniv/WebstormProjects/claudecode/media/music:/Users/illiaromaniv/Music/Music" npm run build:lyrics-db
```

3. Open Chrome -> `chrome://extensions`.
4. Enable **Developer mode**.
5. Click **Load unpacked**.
6. Select folder: `soundcloud-extension`.
7. Open SoundCloud, play a track, click `Vibe View` in the player controls.

## Local Lyrics DB

- Generated DB path: `soundcloud-extension/lyrics-db`
- `index.json` keeps title/artist/file mapping.
- Copied lyrics files live in `soundcloud-extension/lyrics-db/tracks/*.json`.
- `content.js` reads lyrics from extension-local `lyrics-db` (no remote GitHub dependency).

## Notes

- Extension now uses the **full Three.js scene pipeline** via dynamic import of `visualizer.main.js` and `ThreeOrchestrator`.
- `window.__vibeScVersion` can be checked in DevTools to verify the loaded content script version.
- If SoundCloud updates DOM classes, adjust selectors in `content.js`:
  - `.playbackSoundBadge__titleLink`
  - `.playbackSoundBadge__lightLink`
  - `.playControls__elements`

## Sanity Check Commands

```zsh
node --check /Users/illiaromaniv/WebstormProjects/claudecode/soundcloud-extension/content.js
python3 -m json.tool /Users/illiaromaniv/WebstormProjects/claudecode/soundcloud-extension/manifest.json > /dev/null
```

