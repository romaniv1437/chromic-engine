# 🏆 Gold Training Guide — How to Prepare Lyrics for AI Fine-Tuning

> **For:** Chromic Engine Flow Mode → Whisper LoRA Training Pipeline  
> **Goal:** Turn your manually-corrected lyrics into a "Gold Dataset" that makes Whisper smarter at your music.

---

## TL;DR — The 5-Minute Checklist

1. Open a track in **Flow Mode** (click ⚡ Flow in the lyrics overlay)
2. Play the song and fix word timings by dragging on the **waveform**
3. Fix the **text** — make sure every word matches what's actually sung
4. Click **⭐ Gold** — the validator will tell you what's wrong
5. Fix any errors → click Gold again → done. Track is in the training set.

---

## 📐 What Makes a "Gold" Track?

The validator checks these rules automatically. Here's what YOU need to care about:

### ✅ Text Must Be Exact (Priority: CRITICAL)

| Bad | Good | Why |
|-----|------|-----|
| `f***` | `fuck` | Censored text teaches the model to output asterisks |
| `привет` (when singer says "превед") | `превед` | Model learns wrong pronunciation mapping |
| Empty word `""` | Delete it or type the actual word | Empty entries corrupt the dataset |
| `gonna` (when singer clearly says "going to") | `going to` | Match what's HEARD, not grammar |

**Rule:** The text should match the **audio**, not Genius lyrics. If the singer slurs "want to" into "wanna", write "wanna".

### ✅ Timing Must Be Tight (Priority: HIGH, but 90% is OK)

| Issue | Tolerance | What to do |
|-------|-----------|------------|
| Word start/end off by ≤50ms | ✅ Acceptable | Don't waste time on this |
| Word start/end off by 100-200ms | ⚠️ Fix if easy | Drag the word edge on waveform |
| Word start/end off by >500ms | ❌ Must fix | This will confuse the model |
| Words overlapping each other | ❌ Must fix | Validator blocks this automatically |
| Word placed in silence (no audio) | ⚠️ Move it | Likely a misalignment |

**Rule:** Get within ~50ms of the actual sound. You DON'T need frame-perfect accuracy.

### ✅ No Overlaps (Priority: CRITICAL — auto-checked)

```
❌ BAD:  word1 [1.00 → 1.50]  word2 [1.45 → 1.90]  ← overlap WITHIN same lane
✅ GOOD: word1 [1.00 → 1.45]  word2 [1.45 → 1.90]  ← clean boundary
✅ ALSO OK: Lane 0 "Сонце" [40.5 → 41.0]  Lane 1 "(сяє)" [40.7 → 41.2]  ← different lanes, polyphony is fine
```

The validator checks overlaps **per-lane only**. Words on different lanes CAN overlap — that's how backing vocals and ad-libs work.

Overlaps ≤20ms within a lane can be auto-fixed with the 🔧 button.

---

## 🎤 Multi-Lane Editing (Polyphony / Backing Vocals)

Chromic uses 4 lanes for multi-voice tracks:

| Lane | Purpose | Training Strategy |
|------|---------|-------------------|
| **Lane 0** (Main) | Lead vocal — the primary lyrics | ✅ Always included in training |
| **Lane 1** (Backing) | Backing vocals, harmonies | Filtered out by default (use style: `background`) |
| **Lane 2** (Ad-libs) | Background shouts, ad-libs | Filtered out by default (use style: `ad-lib`) |
| **Lane 3** (Cues) | Technical markers (`•••`) | Never included in training |

### How to Edit Multi-Lane Tracks

1. **Only create extra lanes when text differs.** If 5 people sing "Воля!" in the chorus, ONE word on Lane 0 is enough. Only add Lane 1 if the backing vocal has *different* words.

2. **Always set the style** for non-main lanes:
   - Lane 1 words → style: `background` or `ad-lib`
   - This lets the dataset builder automatically filter them out

3. **Cross-lane overlaps are normal.** The validator will NOT flag them. Only same-lane overlaps are errors.

4. **Magnetic Snapping works across lanes.** If the backing vocal starts at the exact same moment as the lead, the snapping system will align them perfectly.

### Training Strategies for Polyphony

**Strategy 1: "Dominant" (Recommended)**
- Only Lane 0 (main vocal) goes into the training text
- Model learns to **focus on the lead voice** and ignore background noise
- Result: Stable, clean transcriptions even with noisy backing

**Strategy 2: "Merged Text"**
- Merge all lanes: `"Main word (backing word)"`
- Model tries to hear **both layers**
- Result: Great for full transcription, but can get messy with heavily mixed vocals

The dataset builder (`hf_dataset_builder.py`) uses Strategy 1 by default. It filters out any word with style `ad-lib`, `background`, or `whisper`, and any word on lane > 0.

### Example JSON (Multi-Lane)

```json
[
  {
    "time": 40.5, "end": 41.5, "text": "Сонце сяє",
    "words": [
      { "text": "Сонце", "start": 40.5, "end": 41.0, "lane": 0, "style": "normal" },
      { "text": "сяє", "start": 41.0, "end": 41.5, "lane": 0, "style": "normal" },
      { "text": "(сяє)", "start": 40.7, "end": 41.2, "lane": 1, "style": "ad-lib" }
    ]
  }
]
```

The validator says: ✅ OK — Lane 0 words don't overlap each other, Lane 1 overlap with Lane 0 is expected polyphony.

### ✅ Reasonable Word Durations (Priority: MEDIUM)

- **Too short (<50ms):** A word can't be shorter than a syllable. If you see a 30ms word, it's probably a timing error.
- **Too long (>10s):** A single word lasting 10+ seconds is almost certainly a gap that wasn't split.

---

## 🎯 The Editing Workflow (Step by Step)

### Step 1: Enter Flow Mode
- Open any track → click the **⚡ Flow** button on lyrics
- The waveform editor appears at the bottom

### Step 2: Play & Listen
- Hit **▶ Play** or click anywhere on the waveform to seek
- Watch the playhead move — words should light up right when they're sung

### Step 3: Fix Timings (Drag on Waveform)
- **Click a word** on the waveform to select it
- **Drag edges** to adjust start/end times
- **Drag the middle** to slide the whole word
- **Hold ⌥ Alt + drag** for **Ripple Edit** — moves this word AND all following words together

### Step 4: Fix Text
- Select a word on the waveform
- The text appears in the **input field** at the bottom
- Type the correction → press **Enter**

### Step 5: Handle Special Cases

| Situation | What to do |
|-----------|------------|
| **Instrumental break** (>5s of no singing) | Add a vocal cue (the `•••` marker) |
| **Ad-lib / background vocal** | Set word style to "Ad-lib" in the dropdown |
| **Stretched word** ("Yeaaaaah") | Set style to "Stretch" |
| **Whispered word** | Set style to "Whisper" |
| **Spoken word** (not sung) | Set style to "Spoken" |

### Step 6: Save
- Click **💾 Save** to write changes to the `.lyrics.json` sidecar file

### Step 7: Verify Gold ⭐
- Click the **⭐ Gold** button
- The validator runs automatically:
  - ✅ **All clear** → Track is marked Gold, ready for training
  - ❌ **Errors found** → Inspector Report panel appears with clickable timestamps
  - 🔧 **Auto-fixable** → Click "Auto-Fix" to resolve micro-overlaps automatically
- Fix the errors and try again

---

## 📊 Quality Tiers — What Accuracy Do You Need?

| Accuracy | Result for AI | Recommendation |
|----------|---------------|----------------|
| **95-100%** | Perfect sync — model nails every syllable | Ideal for your best 2-3 "showcase" tracks |
| **85-90%** | Solid improvement — learns vocabulary, timing ~50-100ms off | **Sweet spot.** Good enough for bulk training |
| **70-80%** | Noisy — model may hallucinate extra sounds | Avoid. Either fix it up to 85%+ or skip it |
| **<70%** | Garbage in, garbage out | Don't include. Will make the model worse |

### The Golden Rule:
> **Text = 100% accurate. Timings = 90% is fine.**

The model is more sensitive to wrong words than to slightly-off timestamps.  
Whisper already has ~50ms of natural jitter, so micro-timing errors get averaged out.

---

## ⚠️ Common Mistakes to Avoid

### 1. Systematic Offset
If the **entire track** is shifted by 0.5s (every word is late/early by the same amount), this is worse than random noise. The model learns the wrong bias.

**Fix:** Use **Shift All** in Flow Mode to move all words at once.

### 2. Leaving Censored Text
If you got lyrics from Genius with `f***` and `s**t`, but the singer clearly says the full words — **fix the text**. Chromic's "Decensor" feature should handle most of this automatically.

### 3. Wrong Song Version
If the `.lyrics.json` was generated from a different version (remix, live, radio edit), the timings won't match. **Re-generate** lyrics with Whisper for the correct audio file.

### 4. Forgetting Vocal Cues
Long instrumental breaks without vocal cues create "large gap" warnings. The model needs to know that silence is intentional, not missing data.

---

## 🔢 How Many Tracks Do I Need?

| Tracks | Expected Result |
|--------|-----------------|
| 1-5 | Minimal effect — model barely changes |
| 10-20 | Noticeable vocabulary improvement for that artist/genre |
| 50+ | Strong adaptation — model speaks "your language" |
| 100+ | Model becomes an expert at your music collection |

**Pro tip:** 100 tracks at 90% accuracy > 5 tracks at 100%. Volume matters.

---

## 🚀 After Marking Gold — What Happens?

1. **Your track** gets `status: "gold"` in the database + a SHA-256 checksum
2. **Gold count** appears in the AI Hub dropdown (header → 🧠 icon)
3. When you click **"Start Fine-Tuning"**, Chromic:
   - Collects all Gold tracks
   - Runs `hf_dataset_builder.py` to package them into a Hugging Face dataset
   - Runs `hf_train.py` to train a LoRA adapter on Whisper
   - Pushes the result to your Hugging Face repo
4. **Next time** you generate lyrics, the improved model is used automatically

---

## 🎵 Quick Reference: Keyboard Shortcuts in Flow Mode

| Key | Action |
|-----|--------|
| `Space` | Play / Pause |
| `⌥ Option` + hold | Tap word timing while playing |
| `Enter` | Commit text edit |
| `Ctrl+Z` | Undo last word |
| `Esc` | Exit Flow Mode |
| `⌥ Alt` + drag | Ripple edit (shift following words) |

---

*Made with 🦾 by Chromic Engine*

