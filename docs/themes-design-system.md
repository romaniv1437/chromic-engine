# Chromic Themes & Design System — Full Snapshot

> **Date:** 2026-05-10  
> **CSS Files:** `chromic-dark.css`, `chromic-header.css`, `chromic.css`, `styles.css` (themes section)  
> **Total CSS:** ~1750 lines across 3 Chromic files + theme definitions in styles.css

---

## Theme System

6 original + 6 neon themes available via `html[data-theme]` / `body[data-theme]`:

| Theme | ID | Background | Accent | Scheme |
|-------|-----|-----------|--------|--------|
| **Chromic Silver** | `Chromic-silver` | `#f1f3f8` | `#5b86bf` | Light |
| **Aqua Glass** | `aqua-glass` | `#e8fbff` | `#00a4cc` | Light |
| **Cinema Vault** | `Cinema Vault-red` | `#050505` | `#e50914` (Netflix red) | Dark |
| **Sunset Neon** | `sunset-neon` | `#fff4ef` | `#ef5b8c` | Light |
| **Midnight Retro** | `midnight-retro` | `#06121f` | `#4ec4ff` | Dark |
| **Chromic Dark** | `chromic-dark` | `#0c0c14` | `#5e9eff` | Dark |
| **💎 Crystal Glass** | `crystal-glass` | `#080810` | `#c8c8d8` (silver) | Dark |
| **🔴 Cinema Crimson** | `cinema-crimson` | `#0a0405` | `#FF0032` (hyper-red) | Dark |
| **🟣 Galactic Violet** | `galactic-violet` | `#08060e` | `#BF5AF2` (iOS purple) | Dark |
| **🌸 Sunset Flamingo** | `sunset-flamingo` | `#0a0508` | `#FF2D55` (hot pink) | Dark |
| **🟢 Emerald Forest** | `emerald-forest` | `#040a06` | `#34C759` (iOS green) | Dark |
| **🔋 Toxic Flow** | `toxic-flow` | `#020804` | `#00FF41` (matrix green) | Dark |

### CSS Custom Properties per Theme

```css
--bg-main / --bg           /* Primary background */
--bg-alt / --bg-secondary  /* Secondary/card background */
--glass-bg / --panel       /* Glass surface color */
--panel-base / --panel-solid /* Solid panel fallback */
--text-color / --text      /* Primary text */
--muted-color / --muted    /* Secondary text */
--accent-primary / --accent /* Brand accent */
--accent-soft-color        /* Soft accent (badges, highlights) */
--accent-glow              /* Neon glow box-shadow for accent elements */
--blur-amount              /* Backdrop blur radius */
--text-high-contrast       /* Auto: white on dark, black on light themes */
--text-on-accent           /* Text color for accent backgrounds */
--line                     /* Border/separator color */
--chip-text                /* Tag/chip text color */
--shadow                   /* Card elevation shadow */
```

---

## Design Tokens (chromic-dark.css `:root`)

### Glass
```
--glass-blur: 40px
--glass-saturate: saturate(200%)
--glass-bg-dark: rgba(25,25,30,0.5)
--glass-bg-light: rgba(255,255,255,0.72)
--glass-border: rgba(255,255,255,0.18)
--glass-border-subtle: rgba(255,255,255,0.08)
--glass-highlight: linear-gradient(135deg, rgba(255,255,255,0.2)…)
```

### Radii
```
--radius-xs: 8px    --radius-sm: 12px   --radius-md: 16px
--radius-lg: 20px   --radius-xl: 28px   --radius-pill: 999px
```

### Typography
```
--font-system: -Chromic-system, BlinkMacSystemFont, 'Inter', system-ui, sans-serif
--font-serif: 'New York', 'Iowan Old Style', Georgia, ui-serif, serif
--fs-hero: clamp(32px, 5vw, 52px)
--fs-title: clamp(20px, 3vw, 28px)
--fs-body: 15px
--fs-caption: 12px
--fs-micro: 10px
```

### Spring Curves
```
--spring-bounce: cubic-bezier(0.175, 0.885, 0.32, 1.275)
--spring-smooth: cubic-bezier(0.22, 1, 0.36, 1)
--ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1)
```

### Shadows
```
--shadow-sm: 0 2px 8px rgba(0,0,0,0.08)
--shadow-md: 0 8px 24px rgba(0,0,0,0.12)
--shadow-lg: 0 16px 48px rgba(0,0,0,0.2)
--shadow-glow: 0 0 0 1px var(--glass-border), 0 16px 48px rgba(0,0,0,0.25)
--focus-ring: 0 0 0 3px accent/60%, 0 0 0 6px accent/20%
```

---

## Chromic Header (chromic-header.css — 393 lines)

### Glass Header Bar
- Fixed position, full width, `z-index: 200`
- `backdrop-filter: blur(40px) saturate(180%)`
- Background: `rgba(18,18,22,0.72)`
- Inner highlight: `inset 0 1px 0 rgba(255,255,255,0.06)`
- Height: ~56px (body gets `padding-top: 56px`)

### Inline Search
- Pill-shaped input: `border-radius: 10px`, max-width `420px`
- Dropdown results: glass panel, `blur(40px)`, `border-radius: 12px`
- Result items: 36px art thumbnail, title + meta, hover highlight
- Keyboard shortcut badge (`⌘K`)

### AI Activity Hub
- Icon button with pulse animation when active
- States: idle (`rgba(255,255,255,0.5)`), active (blue pulse), done (green)
- Dropdown: 320px wide, glass panel, task list with progress bars
- Cancel button (red), dismiss button (hidden until hover)
- Progress bar: gradient `rgba(120,180,255,0.8)` → `rgba(160,120,255,0.8)`

---

## ChromicEditor Pro Mode (chromic.css — 700 lines)

### Pro Badge
- Fixed top-right, green monospace label
- `SF Mono` / `Fira Code` font, `letter-spacing: 1.5px`
- Pulse animation (opacity 0.9→1, glow intensifies)
- Green glow: `rgba(0, 255, 60, …)` variants

### Editable States
- Dashed green outline: `rgba(0, 255, 120, 0.3)`
- Focus: brighter outline `0.7`
- Active edit: green background `rgba(0, 255, 120, 0.15)`

### Flow Mode — Word Tapper
**Flow Bar** (bottom-fixed panel):
- `z-index: 999999`, black glass `rgba(0,0,0,0.88)`
- Green top border: `rgba(0, 255, 120, 0.3)`
- Contains: waveform, play/pause, input, style select, save, status, actions

**Waveform Canvas**:
- 160px tall (was 120px, updated for multi-lane DAW)
- Dark background: `rgba(10, 12, 18, 0.95)`
- Green border: `rgba(0, 255, 120, 0.12)`
- `cursor: grab` / `grabbing`, touch-action: none

**Flow Indicator**:
- Green dot + label (idle)
- Red dot + label with pulse (recording)
- `animation: chromic-flow-pulse 0.5s ease infinite`

**Input Field**:
- White glass bg, green caret
- Tapping state: red border + red glow

**Recording state**: border flashes red, box-shadow red

### Flow Mode — Raw Data View
All lyrics animations killed with `!important`:
```css
opacity: 1, filter: none, transform: none, transition: none,
animation: none, will-change: auto
```

- Font: `0.8rem`, `500 weight`, blue-tinted: `rgba(140, 180, 255, 0.7)`
- Active line: slightly brighter, subtle blue bg
- Words: inherit color, transparent border, pointer cursor
- Style-coded words:
  - `stretch` → gold `rgba(255, 200, 80, 0.8)`
  - `ad-lib` → pink italic `rgba(255, 130, 180, 0.8)`
  - `spoken` → soft green `rgba(180, 220, 180, 0.8)`
  - `whisper` → faded `rgba(200, 200, 200, 0.5)`
- Selected word: blue glow `rgba(100, 150, 255, …)`
- Cues: purple border/bg `rgba(180, 100, 255, …)`

### ELRC & Translation Editors
- Monospace textarea: `SF Mono`, `Fira Code`, `JetBrains Mono`
- ELRC: green caret + borders
- Translation: purple caret + borders (`#a78bfa`)
- Panel open adds `padding-bottom: 340px` to lyrics container

### Track Status Badges
- Synced: blue stroke `#60cfff`
- Synced-plain: gray `#999`
- Translated: purple `#a78bfa`
- User-edited: green pill badge `#00c878`

---

## Aura Design Layer (chromic-dark.css — 661 lines)

### Card Interactions
- **Specular highlight**: `::after` pseudo-element with radial gradient, `opacity: 0→1` on hover
- **Movie cards**: `translateY(-6px) scale(1.03)` on hover
- **Book cards**: multi-layer shadow with spine effect, `translateY(-4px) scale(1.02)`
- **Music albums**: `scale(1.03)`, `content-visibility: auto` for 8000-item scroll
- **TV episodes**: `scale(1.04)`

### Video Player Controls
- Frosted pill: `blur(30px) saturate(200%) brightness(105%)`
- Timeline: 4px → 8px on hover, pill-shaped
- Reduced blur during active playback (GPU savings)

### Books Reading Mode
- Serif typography: `'New York'`, 17px, `line-height: 1.7`
- Max-width: 65ch, warm parchment bg `#faf6f0`
- Dark themes: black bg `#0a0a0a`, warm text `#d4d0c8`

### Performance Optimizations
- `content-visibility: hidden` + `contain: strict` for off-screen views
- `contain-intrinsic-size` prevents layout shifts
- GPU layers only on hover (`@media (hover: hover)`)
- Disabled on `prefers-reduced-motion: reduce`
- Fixed `aspect-ratio` for all media (16/9, 3/4, 1/1)
- `overscroll-behavior: contain` on scroll containers
- Music album items: `content-visibility: auto` + `contain-intrinsic-size: 200px 240px`

### Focus States (tvOS-style)
- `box-shadow` ring using `color-mix(in srgb, accent 60%, transparent)`
- `scale(1.03)` on focus, `scale(1.04)` on card focus
- Spring bounce easing

### Poster Reflections
- `@supports (-webkit-box-reflect)` for movie thumbs
- Gradient reflection: `70%→100%` transparency

---

## CSS Architecture Summary

```
styles.css (6949 lines)
  └── Theme definitions (:root, 6 themes)
  └── Base layout, grid, player, lyrics animations

chromic-dark.css (661 lines)
  └── visionOS/tvOS design tokens
  └── Glass surfaces (header, tabs, cards)
  └── Card hover interactions (specular highlights)
  └── Video player controls
  └── Books reading mode
  └── Performance (content-visibility, contain)
  └── Focus states, reflections

chromic-header.css (393 lines)
  └── Fixed glass header bar
  └── Inline search (input + results dropdown)
  └── AI Activity Hub (icon, dropdown, tasks)

chromic.css (700 lines)
  └── Pro Mode editing (badge, editable states)
  └── Flow Mode word tapper (flow bar, waveform)
  └── Flow raw data view (killed animations)
  └── ELRC + Translation editors
  └── Track status badges
```

---

## Color Palette Quick Reference

| Element | Color |
|---------|-------|
| Pro Mode accent | `#00ff78` / `rgba(0, 255, 120, …)` |
| Flow recording | `#ff3b30` (iOS red) |
| Word selected | `rgba(100, 150, 255, …)` |
| Vocal cue | `rgba(180, 100, 255, …)` (purple) |
| Translation | `#a78bfa` (violet) |
| User-edited badge | `#00c878` (emerald) |
| AI active | `rgba(120, 180, 255, …)` (blue) |
| AI done | `rgba(100, 220, 140, …)` (green) |
| AI cancel | `rgba(255, 100, 100, …)` (red) |
| Stretch word | `rgba(255, 200, 80, …)` (gold) |
| Ad-lib word | `rgba(255, 130, 180, …)` (pink) |
| Spoken word | `rgba(180, 220, 180, …)` (sage) |
| Whisper word | `rgba(200, 200, 200, 0.5)` (faded) |
