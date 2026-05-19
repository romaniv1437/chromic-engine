# Lyrics Word Types — Styles & Animations Snapshot (Both Panels)

> Snapshot date: May 17, 2026  
> DOM panel: `modules/music/LyricsEngine.js` + `styles.css`  
> GPU panel: `chromic-lyrics/chromic-gpu-panel.js`

---

## Hard Rendering Rule (GPU Panel)

**Opacity and color are driven EXCLUSIVELY by Line State (past/active/future).**  
Word types NEVER modulate opacity or brightness. They only affect:
- Scale (scaleX, scaleY)
- Position (vertical float)
- Outline glow (outlineWidth, outlineOpacity)
- Clip edge sharpness

Every word in `past` state looks identical in brightness regardless of type.  
Every word in `future` state looks identical in brightness regardless of type.

---

## Backend Word Flags (from `aligner.py`)

| Flag | Meaning | Detection Method |
|------|---------|-----------------|
| *(none)* | Normal word | Default |
| `adlib: true` | Ad-lib (background vocal) | Parentheses in lyrics text |
| `stretch: true` | Held/stretched note | Duration exceeds threshold |
| `whisper: true` | Whispered vocal | *(proposed — not yet in BE)* |
| `spoken: true` | Spoken, not sung | *(proposed — not yet in BE)* |
| `sung: true` | Melodically sung | *(proposed — not yet in BE)* |

---

## Word Type Comparison

### 1. Normal Words (no flags)

| Aspect | DOM Panel | GPU Panel |
|--------|-----------|-----------|
| **Fill** | CSS `--progress` gradient left→right with feathered edge | `clipRect` sweep left→right |
| **Outline** | CSS `text-shadow` (standard) | `BOLD_OUTLINE` (0.008) on base + fill |
| **Scale** | None | Gentle 1.015× bump while filling (active line only) |
| **Opacity** | Line state classes `.active`/`.past`/`.future-N` | Line state lerp (`S.active.op` / `S.past.op` / etc.) |

### 2. Stretch / Sung Words (`stretch: true` or `sung: true`)

| Aspect | DOM Panel | GPU Panel |
|--------|-----------|-----------|
| **Detection** | `w.stretch \|\| w.sung` → `.is-stretch` / `.is-sung` | `wt()` → `'stretch'`/`'sung'` → `isStretch` |
| **Rendering** | Per-character `<span class="lyric-char">` split | Whole-word Troika Text mesh (no char split) |
| **Fill** | Per-char gradient via `--char-progress` with Gaussian wave center | Standard `clipRect` sweep (same as normal) |
| **Wave** | CSS `scaleY(1 + 0.10 * var(--wave-weight))` per char, Gaussian distribution traveling left→right | `scale.y = 1 + 0.12 × sin(progress × π)` on whole word + breathing pulse `sin(t×4 + wi×0.7) × 0.03` |
| **Glow** | CSS `text-shadow: 0 0 calc(12px * wave-weight) rgba(255,255,255,0.5×weight)` per char | Troika `outlineWidth` bloom: `BOLD_OUTLINE + 0.03 × glow`, decays to 0.2 residual |
| **Horizontal** | None | Subtle squeeze: `scaleX = 1 - 0.02 × wave` |
| **Past state** | `scaleY(1)`, `text-shadow: none`, solid white | Standard line-state brightness, glow decays, scale returns to 1.0 |
| **Opacity** | Identical to normal (line state only) | **Identical to normal (line state only)** |

### 3. Whisper Words (`whisper: true`)

| Aspect | DOM Panel | GPU Panel |
|--------|-----------|-----------|
| **Detection** | `w.whisper` → `.is-whisper` class | `wt()` → `'whisper'` → `isWhisper` |
| **Future state** | Looks identical to normal words (no base whisper styles) | **Looks identical to normal words** — same outline, same brightness |
| **Active glow** | CSS `filter: drop-shadow(0 0 10px rgba(255,255,255,0.35))` | Troika outline glow: `outlineWidth = BOLD_OUTLINE + 0.015`, `outlineOpacity = 0.4 × lineOp` |
| **Past state** | No special styles (identical to normal past) | Outline glow at 50% of active (`outlineWidth = BOLD_OUTLINE + 0.0075`) |
| **Vertical float** | None (DOM doesn't animate position) | `position.y += sin(time × 2.0 + wordIndex × 1.3) × 0.015` — subtle ambient drift |
| **Opacity** | **Identical to normal** (line state only) | **Identical to normal** (line state only, NO opacity cap) |
| **Outline** | Standard CSS weight | Standard `BOLD_OUTLINE` (same as normal — NOT zero) |
| **Scale** | None | None (no bump, no wave) |

### 4. Spoken Words (`spoken: true`)

| Aspect | DOM Panel | GPU Panel |
|--------|-----------|-----------|
| **Detection** | `w.spoken` → `.is-spoken` class | `wt()` → `'spoken'` → `isSpoken` |
| **Fill** | Standard `--progress` gradient (same as normal) | `clipRect` sweep — sharp edge (no feather difference in current impl) |
| **Scale** | None (no CSS animation) | Snappy elastic bump: uniform `1.04×` while filling, instant snap back via `fSnap = 1-exp(-12×dt)` |
| **Glow** | None — CSS comment: "no special styles, identical to normal" | **Zero glow** — standard `BOLD_OUTLINE` only, no outline bloom |
| **Wave** | None | **None** — spoken words are explicitly excluded from stretch wave |
| **Opacity** | **Identical to normal** (line state only) | **Identical to normal** (line state only) |
| **Character** | Punchy, flat, sharp — rap cadence | Punchy, sharp — elastic scale gives pop without melodic feel |

### 5. Adlib Words (`adlib: true`)

| Aspect | DOM Panel | GPU Panel |
|--------|-----------|-----------|
| **Detection** | `w.adlib` flag → `.is-adlib` class | `w.adlib` flag → `isAd` / `e.ad` |
| **Layout** | Two-tier: `.main-vocals` span + `.adlibs-wrapper` (absolute, `top:100%`, centered, `font-size:0.8em`) | Two-tier: main words laid out normally, adlib words on centered row below (`adRowY = mainBottom - adRowHeight × 0.8`) |
| **Font size** | `.adlib-phrase { font-size: 0.88em }` | `fontSize = FS × 0.82` (FS_AD_R ratio) |
| **Outline** | No CSS text-shadow manipulation | `outlineWidth: 0` (no bold outline) |
| **Hidden state** | `opacity: 0; max-width: 0; overflow: hidden` | `_adReveal → 0`, `_tOp → 0.0` (fully invisible) |
| **Pre-reveal** | `.incoming` class at `timeUntil ≤ 0.4s` → `opacity:1; max-width:12em` | `_adReveal → 0.6`, `_tOp → 0.3 × lineOp` at 400ms before |
| **Active** | `.adlib-phrase.active { opacity: 0.7; transform: translateY(0) }` | `_adReveal → 1.0`, `_tOp → 0.7 × lineOp` |
| **Past** | `.adlib-phrase.past { opacity: 0.5 }` | `_adReveal → 1.0`, `_tOp → 0.5 × lineOp` |
| **Fly-in** | CSS `transform: translateY(6px)` → `translateY(0)` with 0.35s ease-out | GPU lerp: `flyOffset = (1 - _adReveal) × 0.08` scene units below |
| **Full-adlib lines** | Same treatment (all words in phrase) | Separate line-level states: `adlibOn(0.6)`, `adlibOff(0.35)`, `adlibHid(0.0)` with reduced gap |

> **Note:** Adlibs are the ONE exception to the unified opacity rule — they have their own visibility lifecycle (hidden → incoming → active → past) with dedicated opacity targets. This is structural, not a word-type color manipulation.

---

### 6. Vocal Cue Dots (`type: 'vocal_cue'`)

| Aspect | DOM Panel | GPU Panel |
|--------|-----------|-----------|
| **Character** | `•` (bullet) | `•` (bullet) — normal font size, normal weight |
| **Font size** | Same as lyrics text | Same as lyrics text (`FS`) — NOT enlarged |
| **Spacing** | Standard word gap | `_wGap × 3` (moderate spacing) |
| **Fill behavior** | Sequential fill left→right via progress gradient | Sequential `clipRect` sweep per dot (same fill system as words) |
| **Active glow** | CSS `text-shadow` pulse | Troika `outlineWidth: 0.006 × progress`, `outlineOpacity: 0.4` — subtle |
| **Exit animation** | Fade out with line transition | **Particle dissolve**: each dot scatters in different direction (sin/cos angles), shrinks to 0 (`scale × (1 - exitT×1.5)`), glow flashes then fades — 0.35s total |
| **Scatter physics** | N/A | Quadratic ease-out: `scatter = exitT² × 0.3`, spread angles `[-0.4, 0, 0.4]` |
| **After exit** | Line disappears | Next lyric text slides up into cue's position (natural scroll) |
| **Bounce** | None | **None** — explicitly removed, dots stay static during fill |

---

### 7. Track Metadata (Artist + Album)

| Aspect | DOM Panel | GPU Panel |
|--------|-----------|-----------|
| **Artist name** | Shown in player controls / art panel | Troika Text mesh, white, 22px equivalent, pinned at top of viewport |
| **Album name** | Shown in player controls / art panel | Troika Text mesh, glowy blue (`#7eb8ff`), 18px equivalent, with pulsing outline glow |
| **Album glow** | N/A | `outlineWidth: 0.008`, `outlineOpacity: 0.4 + sin(t×1.5)×0.15` — gentle pulse |
| **Position** | Fixed in player UI | Follows camera Y — always pinned near top of GPU viewport (`cam.top - 0.38×height`) |
| **Source** | `window.musicRuntime.currentTrack` | Same: `.artist` / `.albumArtist` / `.album` |

---

## Line State Comparison

| State | DOM Panel (CSS class) | GPU Panel (lerped values) |
|-------|----------------------|--------------------------|
| **Active** | `.lyrics-line.active` — `opacity:1, transform:scale(1.04)` | `{ op:1.0, sc:1.04, oy:0 }` |
| **Past** | `.lyrics-line.past` — `opacity:0.7, scale(0.98)` | `{ op:0.7, sc:0.98, oy:-0.08 }` |
| **Past far** | Reduced opacity via distance | `{ op:0.3, sc:0.96, oy:-0.1 }` |
| **Future +1** | `.lyrics-line.future-1` — `opacity:0.65, scale(0.98)` | `{ op:0.65, sc:0.98, oy:0.1 }` |
| **Future +2** | `.lyrics-line.future-2` — fading | `{ op:0.35, sc:0.95, oy:0.18 }` |
| **Future +3** | Fading further | `{ op:0.15, sc:0.93, oy:0.24 }` |
| **Future +4** | Nearly invisible | `{ op:0.08, sc:0.91, oy:0.28 }` |
| **Future 5+** | Minimal | `{ op:0.06, sc:0.90, oy:0.3 }` |

---

## Fill Behavior Comparison

| Phase | DOM Panel | GPU Panel |
|-------|-----------|-----------|
| **Unfilled** | `--progress: 0%`, `color: var(--lyric-unfilled)` (grey) | Base mesh at `UNFILLED(0.5) × lineOp`, fill mesh clipped to 0 |
| **Filling** | `--progress: N%`, gradient `var(--lyric-filled)` → `var(--lyric-unfilled)` | Fill `clipRect` sweeps: `[-0.01, -10, wordWidth × progress, 10]` |
| **Filled** | `--progress: 100%`, class `.past`, solid `#fff` | Fill fully revealed `[-10, -10, 100, 10]` |

---

## Scroll System Comparison

| Aspect | DOM Panel | GPU Panel |
|--------|-----------|-----------|
| **Method** | JS `scrollTop` lerp on overflow container | Orthographic camera Y position lerp |
| **Auto-follow** | Active line centered via `_lerpScrollTo()` | `targetCameraY = activeLine._baseY + 0.5` |
| **Manual scroll** | Native scroll events, auto-scroll resumes after timeout | `manualScrollOffset` (wheel delta), decays via `×0.95` after 3s hold |
| **Conflict resolution** | Timeout-based: auto-scroll disables during manual scroll | Decoupled: `finalY = targetCameraY + manualScrollOffset`, no fighting |

---

## Interaction Comparison

| Aspect | DOM Panel | GPU Panel |
|--------|-----------|-----------|
| **Click-to-seek** | DOM click on `.lyric-word` span → `data-start` attribute | Raycaster through Troika meshes → `userData.startTime` |
| **Fallback** | N/A (always hits a DOM element) | Closest line by world Y if no mesh intersection |
| **Click feedback** | Class toggle flash | `_clickFlash` brightness boost (decays via `fSnap`) |

---

## GPU-Only Animation Tokens

| Token | Value | Used for |
|-------|-------|----------|
| `WHISPER_GLOW_W` | 0.015 | Extra outline width for whisper halo |
| `WHISPER_GLOW_OP` | 0.4 | Outline opacity for whisper glow |
| `WHISPER_FLOAT` | 0.015 | Vertical sine amplitude |
| `WHISPER_FREQ` | 2.0 | Vertical sine frequency (Hz) |
| `SPOKEN_SNAP_SC` | 1.04 | Elastic scale bump magnitude |
| `BOLD_OUTLINE` | 0.008 | Standard outline for all non-adlib words |

---

## Lerp Factors (GPU only)

| Factor | Formula | Speed | Used for |
|--------|---------|-------|----------|
| `f` | `1 - exp(-5.0 × dt)` | Standard | Line states, word opacity, scale |
| `fSlow` | `1 - exp(-2.5 × dt)` | Slow | Wave/glow decay for stretch |
| `fSnap` | `1 - exp(-12 × dt)` | Fast | Spoken snap, click flash decay |
| `scrollLerp` | `1 - exp(-3.5 × dt)` | Medium | Camera smoothing |

