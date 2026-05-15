# Mood Color Palette — Audio Reactive Mode

## Overview

Chromic Engine's audio reactive visualizer continuously analyzes the playing track's frequency spectrum and derives a **mood profile** that drives color palette selection, animation speed, particle density, and bloom intensity in real time.

**Key principle: Color moves like honey, brightness pulses with the beat.**

## Pipeline

```
Audio Source → Web Audio AnalyserNode → FFT (frequencyBinCount)
    ↓
computeAudioBands(freqData)
    → bass   (bins 1 … 8% of spectrum)
    → mid    (bins 8% … 42%)
    → treble (bins 42% … 92%)  ← EXCLUDED from mood, drives particles/bloom only
    → energy (average of entire spectrum, 0–1)
    ↓
    ┌── TREBLE SHIELD ──────────────────────────────────────────┐
    │ structuralEnergy = bass × 0.7 + mid × 0.3                │
    │ (hi-hats, cymbals, sibilance completely filtered out)     │
    └───────────────────────────────────────────────────────────┘
    ↓
computeMoodProfile({ bass, mid, treble, energy }, { intensity, sensitivity, deltaTime })
    → moodState (locked), moodColor (ultra-slow lerp), lightnessOffset (±8% cap)
    ↓
    Two output channels:
    ├── LOCKED (state machine): moodColor → hue, saturation, base lightness
    └── PULSE (raw, capped):   lightnessOffset → ±8%, bloomAlpha, treblePulse → particles
```

## Band Extraction — `computeAudioBands`

| Band   | Range (% of FFT bins) | Purpose |
|--------|----------------------|---------|
| Bass   | 1 → 8%              | Drives intensity, blob movement, particle spawns |
| Mid    | 8% → 42%            | General warmth / energy contribution |
| Treble | 42% → 92%           | Speed modulation, sparkle effects |
| Energy | 0 → 100%            | Overall loudness, averaged across full spectrum |

Each band is normalized to `[0, 1]` by dividing the sum by `count × 255`.

## Mood Profile — `computeMoodProfile`

### Mood State Machine (v3 — Hysteresis + Confidence Accumulator)

Color is driven by **song structure**, not individual beats. A kick drum, snare hit, or clap has **ZERO effect** on hue or saturation.

#### Architecture

```
rawExcitement ──→ 180-frame Rolling Window ──→ windowedExcitement
                                                      │
                                    ┌─────────────────┘
                                    ▼
                         Hysteresis State Machine
                    ┌────────────────────────────┐
                    │  CHILL ←→ BALANCED ←→ DRIVE │
                    │  (different enter/leave     │
                    │   thresholds per direction) │
                    └────────┬───────────────────┘
                             │ accumulator ≥ 120 frames?
                             ▼
                    State LOCKS → target palette
                             │
                    Ultra-slow lerp (α=0.01/frame)
                             │
                             ▼
                    currentH, currentS, currentL
                    (THE ACTUAL RENDERED COLOR)
```

#### Rolling Window (Transient Filter)

Raw excitement is averaged over a **180-frame window** (~3 seconds at 60fps). This completely filters out:
- Single kick drums (~50ms)
- Snare hits (~100ms)  
- Claps, hi-hats, any transient < 1 second

Only sustained energy shifts (verse → chorus) move the windowed value.

#### Hysteresis Thresholds

Different thresholds for entering vs leaving a state prevent oscillation at boundaries:

| Transition | Threshold | Direction |
|-----------|-----------|-----------|
| → DRIVE | windowed > 0.68 | Enter |
| DRIVE → | windowed < 0.52 | Leave |
| → CHILL | windowed < 0.30 | Enter |
| CHILL → | windowed > 0.42 | Leave |

#### Confidence Accumulator

Even after the windowed value crosses a threshold, the state machine **waits 120 consecutive frames** (~2 seconds) before committing the change. If the energy dips back before 120 frames, the accumulator resets.

```
Frame 0:    windowed crosses 0.68 → pending=DRIVE, accumulator=1
Frame 1-50: still above 0.68 → accumulator=51
Frame 51:   windowed drops to 0.61 → accumulator RESET
Frame 80:   windowed crosses 0.68 again → accumulator=1
Frame 200:  120 frames sustained → STATE = DRIVE (committed)
```

#### Locked Color Lerp

Once a state is committed, the color lerps toward the target palette at **α=0.01 per frame** (~7 seconds for full transition):

| State | Hue | Saturation | Lightness |
|-------|-----|------------|-----------|
| CHILL | 190° (Deep Sea Teal) | 75% | 42% |
| BALANCED | 38° (Warm Gold) | 80% | 52% |
| DRIVE | 340° (Supernova Magenta) | 85% | 48% |

Hue interpolation wraps correctly around 360° (38°→340° goes through 0°, not backwards through 180°).

### Decoupled Output Channels

| Output | Source | Speed | Drives |
|--------|--------|-------|--------|
| `moodColor` { h, s, l } | State machine → locked lerp | Ultra-slow (~13s) | Lava blob hue, background gradient, `activeColor` |
| `lightnessOffset` | `rawExcitement` capped ±8% | Instant | Lightness pulse (heartbeat, not strobe) |
| `bloomAlpha` | `rawExcitement + treblePulse` | Instant | Glow intensity, per-frame pulse |
| `treblePulse` | `treble` band (raw) | Instant | Particles, sparkle, fairy spawns — NEVER color |
| `speedMultiplier` | `smoothedIntensity` (EMA) | Medium (~0.3s) | Animation speed, particle velocity |
| `densityMultiplier` | `smoothedIntensity` (EMA) | Medium (~0.3s) | Particle count |
| `jitter` | `smoothedIntensity` (EMA) | Medium (~0.3s) | Position displacement |
| `moodState` | State machine | Locked | `'chill'` / `'balanced'` / `'drive'` |

## Color Generation

### With artwork palette (extracted colors)

When artwork colors are available, the visualizer shifts them using **smoothed mood** (slow) and adds a **brightness pulse** from raw energy (fast):

```js
smoothShift = smoothedExcitement − 0.5           // slow, -0.5 to +0.5
brightPulse = rawExcitement > 0.5 ? (raw − 0.5) × 0.3 : 0  // fast, per-beat

r = clamp(color.r + smoothShift × 60 + brightPulse × 20, 0, 255)
g = clamp(color.g − smoothShift × 30, 0, 255)
b = clamp(color.b − smoothShift × 15, 0, 255)
```

**Result**: Quiet passages stay true to album art. Over 2 seconds of sustained energy, colors warm. Bass hits only flash brighter, never change hue.

### Without artwork palette (fallback)

Uses the smoothed `moodColor` HSL directly with per-blob hue offset:

```js
h = moodColor.h + index × 25                    // slow hue from mood
s = moodColor.s                                   // slow saturation
l = moodColor.l + (rawExcitement − 0.5) × 12     // FAST lightness pulse
```

## Lava Background Layer

The mood palette feeds into the **lava lamp plasma** background:

- 14 organic blobs drift with velocity influenced by `bass` amplitude
- Each blob renders as a radial gradient using 4 color stops from `getColor()`
- Blobs are composited with `screen` blending at `bgAlpha` (controlled by `bgOpacity` setting + bass boost)
- Speed modulated by `bgIntensity × (0.06 + treble × 0.08 + bass × 0.06)`

## Fairy Particles

Spawned when `bass > 0.35`, with count capped by `densityMultiplier`:

- Each particle carries its own random hue
- Lifetime: 60–150 frames
- Twinkle via sinusoidal alpha modulation

## Preset Integration

The mood profile is passed to every visualizer preset via the draw call:

```js
presetDefinition.draw(visualizer, {
  width, height, response,
  bands: { bass, mid, treble, energy },
  mood,              // ← full mood profile
  artworkFocus,      // ← focal point from album art
});
```

Each preset (vaporwave-grid, rgb-magic-bubbles, etc.) can use `mood.palette`, `mood.hueShift`, `mood.speedMultiplier` etc. to adapt its rendering.

## Smoothing Stack (All Layers)

| Layer | Smoothing | Rate |
|-------|-----------|------|
| AnalyserNode | `smoothingTimeConstant = 0.85` | Hardware FFT |
| **Treble shield** | **Excluded from mood** | **Hi-hats/cymbals = 0% influence on color** |
| Structural energy | `bass × 0.7 + mid × 0.3` | Input to mood only |
| Windowed excitement | 180-frame rolling average | ~3s window, kills ALL transients |
| State machine | Hysteresis + 120-frame confidence | ~2s hold before state change |
| Color lerp | α=0.005/frame toward locked palette | ~13s for full transition |
| Lightness pulse | Raw, capped ±8% | Instant (heartbeat) |
| Motion intensity | EMA α=0.20 | ~0.3s reaction |

## Visual Result

```
Verse (quiet)  → state=CHILL (locked) → Teal hues, slow drift, sparse particles
                  Kick drum hit → lightness +5%, color STAYS TEAL (0° hue change)
                  Snare → bloom pulses, particles spark, HUE DEAD STILL

Pre-chorus     → windowed rises 0.2→0.45 over ~3s
                  Accumulator counts: 1...50...100...119...
                  Frame 120: → state=BALANCED (committed)
                  Color lerps 190°→38° over ~7 seconds (Gold morphing begins)

Chorus (loud)  → windowed holds >0.68 for 2s → state=DRIVE (committed)
                  Color lerps 38°→340° through 0° (correct wrapping)
                  Every beat → lightness pulses ±8%, bloom glows — HUE LOCKED

Outro (fade)   → windowed drops below 0.52 for 2s → state=BALANCED
                  Color begins 7-second cool-down toward gold
```

**The anti-strobe test**: Heavy kick drum + calm melody = background color DEAD STILL. Only bloom and lightness offset respond. Hue shift = 0°.

## Anti-Strobe Audit (v3 — State Machine)

### Architecture Change

| Version | Color Source | Problem |
|---------|-------------|---------|
| v1 | Hard thresholds (`>0.8 = drive`) | Instant palette swap on single beat |
| v2 | EMA smoothing (α=0.05) | Still follows energy curve, just slower |
| **v3** | **State Machine + 120-frame hold** | **Color is LOCKED until song structure changes** |

### Honey & Pulse Rule (Enforced)

| Channel | Speed | What |
|---------|-------|------|
| **Honey** (locked state) | Hue, Saturation, Base Lightness | α=0.01/frame, state machine gated |
| **Pulse** (raw, capped) | Lightness offset (±10%), Bloom alpha, Particle spawn | Instant, feels like heartbeat |

### Debug Overlay

Set `manager.debugMood = true` to see:
- **Cyan line**: windowedExcitement (3-second rolling average)
- **Red line**: rawExcitement (per-frame)
- **Text**: current state, pending state, accumulator progress (%), locked hue

