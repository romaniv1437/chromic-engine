# Ghost Morph Animation — Global Player Close

> Snapshot of the phantom/ghost element that animates the music overlay → mini-player transition.

## Overview

When the full-screen music overlay closes, a **phantom element** (ghost) is created that visually morphs from the large album artwork into the mini-player bar at the bottom of the screen. The real overlay is instantly hidden and the phantom handles the entire visual transition.

## Architecture

```
┌─────────────────────────────────────┐
│  Full-screen Overlay (hidden)        │
│  ┌─────────────────────┐            │
│  │  Album Art (300×300) │ ← SOURCE   │
│  └─────────────────────┘            │
└─────────────────────────────────────┘
                    │
                    │ PHANTOM MORPHS
                    ▼
┌─────────────────────────────────────┐
│  Mini-player bar (80px tall)         │ ← TARGET
│  [56×56 art] [title] [controls]     │
└─────────────────────────────────────┘
```

## Element Structure

```
.close-morph-scrim          ← Dark overlay that fades out during morph
.close-morph-phantom        ← Main capsule that changes size/position
  ├── img (phantomArt)      ← Album artwork, shrinks via transform: scale()
  └── .close-morph-content  ← Cloned mini-player internals, fades in
       └── cloneSource      ← Deep clone of globalMusicPlayer (no canvas/audio)
```

## Calculation Pipeline

### Step 1: Measure Source (Overlay Art)

```javascript
// Get un-scaled rect (removes CSS animation pulse scale)
const rawRect = artWrap.getBoundingClientRect();
const trueW = artWrap.offsetWidth;   // CSS layout size, ignoring transforms
const trueH = artWrap.offsetHeight;
const cx = rawRect.left + rawRect.width / 2;  // center X (stable during scale)
const cy = rawRect.top + rawRect.height / 2;   // center Y
overlayArtRect = {
  left: cx - trueW / 2,
  top: cy - trueH / 2,
  width: trueW,
  height: trueH,
};
```

**Why**: The album art has a CSS pulse animation (`transform: scale()`). `getBoundingClientRect()` returns the animated size. We use `offsetWidth/offsetHeight` to get the true CSS size and reconstruct position from center (which is stable under center-origin scale).

### Step 2: Measure Target (Mini-Player)

```javascript
const miniPlayerRect = _miniPlayerRect || targetRect;
const miniArtRect = _miniArtRect || { 
  left: miniPlayerRect.left + 20, 
  top: miniPlayerRect.top + 12, 
  width: 56, 
  height: 56 
};
```

- `miniPlayerRect` — bounding rect of the entire mini-player bar
- `miniArtRect` — bounding rect of the small album art thumbnail inside mini-player (fallback: 56×56 at padding offset)

### Step 3: Compute Art Offset Inside Mini-Player

```javascript
const targetArtTopOffset = miniArtRect.top - miniPlayerRect.top;
const targetArtLeftOffset = miniArtRect.left - miniPlayerRect.left;
```

These give the art's pixel position **relative to the mini-player box** — used to position the phantom art precisely when the capsule finishes morphing.

### Step 4: Compute Art Scale Factor

```javascript
const artScale = miniArtRect.width / overlayArtRect.width; // e.g. 56/300 ≈ 0.187
```

The phantom art starts at full overlay size and shrinks to mini-art size via `transform: scale()`. This avoids image resampling/stretching.

## Animation Sequence

### Frame 0: Setup

1. Snap art to un-pulsed state (`animation: none; transform: scale(1)`)
2. Hide overlay instantly (`visibility: hidden; opacity: 0`)
3. Create scrim (dark background, starts opacity: 1)
4. Create phantom at overlay art position/size
5. Create phantom art (img) at full size, `transform: scale(1)`, origin top-left
6. Create phantom content (cloned mini-player internals, opacity: 0)
7. Append to DOM → force paint with `offsetHeight`

### Frame 1+: Transition Applied

```javascript
const timing = '0.38s cubic-bezier(0.32, 0.72, 0, 1)';
```

**Phantom capsule** transitions:
- `top` → from overlay art top → mini-player top
- `left` → from overlay art left → mini-player left  
- `width` → from overlay art width → mini-player width
- `height` → from overlay art height → mini-player height
- `border-radius` → 14px → 16px
- `background` → transparent → glass gradient with accent color
- `border` → none → 1px accent glass border
- `backdrop-filter` → none → blur(40px) saturate(220%) brightness(80%)

**Phantom art** transitions:
- `transform` → from `scale(1)` → `translate(leftOffset, topOffset) scale(artScale)`
- `border-radius` → 14px → `8/artScale`px (compensates for scale shrink)

**Phantom content** transitions:
- `opacity` → 0 → 1, with `0.2s ease` and `0.2s` delay (fades in after morph progresses)

**Scrim**:
- `opacity` → 1 → 0, `0.25s cubic-bezier(0.32, 0.72, 0, 1)`

### Frame N (420ms): Handoff

```javascript
setTimeout(() => {
  phantom.remove();
  scrim.remove();
  _revealMiniPlayer(); // show real mini-player
}, 420);
```

1. Remove phantom from DOM
2. Remove scrim
3. Show actual mini-player (was hidden during morph)
4. Restore all overlay/page styles

## Easing Curve

```
cubic-bezier(0.32, 0.72, 0, 1)
```

This is a custom ease-out curve:
- Starts moderately fast (control point 1: 0.32, 0.72)
- Decelerates to a gentle stop (control point 2: 0, 1)
- Slightly overshoots then settles (y=1 at x=0 means it arrives at final position before time runs out)

## Theme Integration

The phantom's final background/border matches the real mini-player's glass styling:
```javascript
const accentColor = getComputedStyle(document.documentElement)
  .getPropertyValue('--accent').trim() || '#5e9eff';

background: linear-gradient(135deg, 
  color-mix(in srgb, ${accent} 15%, rgba(0,0,0,0.55)),
  color-mix(in srgb, ${accent} 6%, rgba(0,0,0,0.55))
);
border: 1px solid color-mix(in srgb, ${accent} 18%, rgba(255,255,255,0.1));
backdrop-filter: blur(40px) saturate(220%) brightness(80%);
```

## Performance Notes

- The phantom animates `top`, `left`, `width`, `height` — these trigger layout on each frame
- The art image uses `transform: scale()` — GPU-composited, no layout cost
- The content clone uses `opacity` — GPU-composited
- The scrim uses `opacity` — GPU-composited
- The `contain: strict` / `will-change` optimizations were tested but removed to keep the morph visually correct
- Current frame rate is ~30-60fps due to layout-triggering properties on the phantom container

## File Location

`public/modules/music/MusicPlayer.js` — lines ~4785–4920 (inside `closeOverlay` method)

## Related Elements

- `.global-player` — the real mini-player bar (chromic-dark.css)
- `#globalMusicPlayer` — DOM element (views/index.ejs)
- `.global-player-art` — real mini-art thumbnail
- `_revealMiniPlayer()` — method that shows the real player after phantom is removed

