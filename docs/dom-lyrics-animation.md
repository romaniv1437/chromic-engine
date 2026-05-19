# DOM Lyrics Animation System

> **Engine:** `LyricsEngine.js` + `styles.css`  
> **Renderer:** HTML DOM elements with CSS transitions/transforms  
> **Toggle:** DOM lyrics panel (default renderer)

---

## Architecture

Each lyric line is a `.lyrics-line` div containing `.lyric-word` spans. Each word span tracks its fill progress via a CSS custom property `--progress` (0–100%).

**Three rendering layers per word:**
1. **Base text** — the unfilled word in `--lyric-unfilled` color (`rgba(255,255,255,0.5)`)
2. **`::after` pseudo-element** — white fill overlay, revealed left→right via CSS `mask-image` gradient keyed to `--progress`
3. **Per-character spans** (sung/stretch only) — `<span class="lyric-char">` inside the word, each with its own `--wave-weight` and `--char-progress`

---

## Line States

| State | Class | Opacity | Scale | Transform | Filter |
|-------|-------|---------|-------|-----------|--------|
| **Active** | `.active` | 1.0 | `scale(1.05)` | `translateY(0)` | `blur(0)` |
| **Past** | `.past` | 0.7 | `scale(0.98)` | `translateY(-4px)` | none |
| **Future-1** | `.future-1` | 0.7 | `scale(0.98)` | `translateY(6px)` | `blur(0)` |
| **Future-2** | `.future-2` | 0.4 | `scale(0.95)` | `translateY(12px)` | `blur(2px)` |
| **Future-3** | `.future-3` | 0.2 | `scale(0.93)` | `translateY(16px)` | `blur(4px)` |
| **Future-4** | `.future-4` | 0.1 | `scale(0.92)` | `translateY(20px)` | `blur(6px)` |
| **Future (>4)** | `.future` | 0.08 | `scale(0.92)` | `translateY(20px)` | `blur(8px)` |

**Transitions:** `opacity 0.6s`, `filter 0.6s`, `transform 0.6s` — all `cubic-bezier(0.4, 0, 0.2, 1)`

**During manual scroll:** All lines snap to `opacity: 0.7`, `filter: none`, `transform: none` with 150ms transition.

---

## Per-Word Fill Animation

### Normal Words (no word type flags)

**Mechanism:** CSS `::after` pseudo-element with `mask-image` sweep.

```css
.lyric-word.active::after {
  content: attr(data-text);          /* duplicate text content */
  color: #ffffff;                     /* bright white fill */
  mask-image: linear-gradient(90deg,
    #000 calc(var(--progress) - 15%),    /* fully visible behind edge */
    transparent calc(var(--progress) + 15%) /* fades to transparent ahead */
  );
}
```

- **JS drives** `--progress` from 0% to 100% based on `(currentTime - word.start) / (word.end - word.start)`
- **Feather:** 30% total (±15% around edge) — creates soft gradient instead of hard clip
- **Past state:** Direct `color: #fff`, no gradient, no mask — zero overhead

### Fill Progress Calculation (JS)

```js
const p = ((now - w.start) / (w.end - w.start)) * 100;
const clamped = Math.min(100, Math.max(0, p));
span.style.setProperty('--progress', `${clamped}%`);
```

Only updates when progress changes by >1% to minimize style recalcs.

---

## Word Types

### 🎤 Sung (`is-sung`) / Stretch (`is-stretch`)

**DOM:** Words are split into per-character `<span class="lyric-char">` elements.

**Per-character animation (JS):**
- A **traveling Gaussian wave** rolls left→right with the fill progress
- `smoothstep` easing: `t² × (3 - 2t)` for smooth wave center movement
- Wave center moves from `-pad` to `len + pad` (rolls in from outside the word)
- Gaussian sigma = 1.8 characters

**CSS variables per char:**
- `--wave-weight` (0–1): Gaussian envelope intensity at this character
- `--char-progress` (0–1): fractional fill progress for this specific character

**CSS animation:**
```css
.lyric-word.active .lyric-char {
  transform-origin: bottom center;
  transform: scaleY(calc(1 + 0.10 * var(--wave-weight)));    /* vertical stretch wave */
  text-shadow: 0 0 calc(12px * var(--wave-weight))            /* glow proportional to wave */
               rgba(255,255,255, calc(0.5 * var(--wave-weight)));
  background: linear-gradient(90deg,                           /* per-char gradient fill */
    #fff calc((var(--char-progress) * 120%) - 20%),
    rgba(255,255,255,0.5) calc(var(--char-progress) * 120%)
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
```

**Visual:** Each character pulses upward (scaleY from baseline) and glows as the wave passes through it, then settles back. The fill is a mini gradient per character, not a hard edge.

**`::after` overlay is disabled** for char-split words (`display: none`) — per-char fill handles everything.

### 🔇 Whisper (`is-whisper`)

**DOM:** Standard word rendering, no character split.

**Active state CSS:**
```css
.lyric-word.is-whisper.active {
  filter: drop-shadow(0 0 10px rgba(255, 255, 255, 0.35));
}
```

- **No base styling difference** — future whispers look identical to normal words
- **When active:** Soft white drop-shadow glow halo
- **Fill:** Uses the same `::after` mask-image sweep as normal words
- **No opacity change** — brightness matches other words exactly

### 🗣️ Spoken (`is-spoken`)

**DOM:** No special styles whatsoever.

- Spoken words animate identically to normal words
- Same `::after` overlay fill sweep
- No scale bump, no glow, no visual difference from normal
- The `is-spoken` class exists only for semantic data (used by GPU renderer)

### 📢 Adlib (`is-adlib`)

**DOM:** Two-tier layout with fly-in animation.

**Layout:**
- Main vocals in `<span class="main-vocals">` (top row)
- Adlibs in `<span class="adlibs-wrapper">` (positioned below main vocals with `position: absolute; top: 100%`)
- Adlib words grouped into `<span class="adlib-phrase">` containers

**States:**

| State | Opacity | MaxWidth | Transform |
|-------|---------|----------|-----------|
| **Hidden** | 0 | 0 | — |
| **Incoming** (~400ms before) | 1 | 12em | — |
| **Active** | 1 | 12em | `translateY(0)` |
| **Past** | 1 | 12em | — |

**Fill mechanism:** Single-layer `background-clip: text` gradient (NO `::after` overlay) to avoid ghosting:
```css
.lyric-word.is-adlib.active {
  background: linear-gradient(90deg,
    var(--lyric-filled) calc(var(--progress) - 15%),
    var(--lyric-unfilled) calc(var(--progress) + 15%)
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
```

**Phrase-level animation:**
- `.adlib-phrase` starts at `opacity: 0; transform: translateY(6px)`
- On activation: `opacity: 0.7; transform: translateY(0)` with 350ms ease-out
- Font size: 0.88em (slightly smaller than main vocals)

---

## Vocal Cue Dots

**DOM:** Three 14px circles with progressive fill.

```css
.lyrics-intro-dots .dot {
  width: 14px; height: 14px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);  /* dim base */
}

.lyrics-intro-dots .dot::after {
  width: var(--dot-progress, 0%);  /* progressive fill */
  background: #fff;
  box-shadow: 0 0 15px rgba(255,255,255,0.6);
}

.lyrics-intro-dots .dot.active {
  transform: scale(1.3);
  box-shadow: 0 0 10px rgba(255,255,255,0.5);
}
```

- Each dot fills sequentially during its time window
- Active dot scales up 1.3× with glow
- Past dots are solid white with residual glow

---

## Scrolling

- **Auto-scroll:** Smooth scroll to center active line in panel viewport
- **Manual scroll override:** User wheel/touch overrides auto-scroll for 3 seconds, then decays back
- **Scroll mode:** During active scroll, all lines become `opacity: 0.7`, no blur/transform — uniform readability

---

## Track Gamma (Mood Color)

- CSS variables on `.music-immersive-lyrics-panel`: `--track-gamma-h/s/l/alpha`
- Driven by Mood Vault (confidence-gated, 150-frame accumulator)
- Hue transition capped at 2°/sec for slow temperature shift perception
- Past lines tint via `color-mix(in srgb, var(--mood-color) 50%, rgba(255,255,255,0.85))`

---

## Background Vocals

- `.is-bg-vocal` lines: smaller (`clamp(1.2rem, 2.4vw, 2rem)`), weight 400, italic
- Overlapping bg-vocals (`.is-overlap`): slide up from behind main line, `opacity: 0.6`, `scale(0.93)`
- `.co-active` state: visible during simultaneous playback with main vocals

