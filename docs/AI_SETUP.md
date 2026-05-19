# AI Lyrics Aligner — Setup Guide

The AI Lyrics Aligner uses Whisper to transcribe and align lyrics word-by-word. Chromic Engine auto-installs dependencies on first use.

## Automatic Setup (Recommended)

**No manual setup needed.** When you trigger lyrics alignment for the first time, the app will:

1. Create a Python virtual environment at `lyrics-engine/venv/`
2. Install the correct Whisper engine for your platform
3. Download the AI model (~1.5GB for `medium`)
4. Show progress in the AI Activity Hub and LRC panel hint

The app stays responsive during installation — all setup runs in the background.

---

## Prerequisites

| Dependency | Why | Install |
|------------|-----|---------|
| **Python 3.10–3.12** | Whisper runtime | [python.org](https://python.org/downloads/) |
| **FFmpeg** | Audio decoding | See below |
| **pip** | Package management | Included with Python |

### Install Python

- **macOS:** `brew install python@3.12`
- **Windows:** Download from [python.org](https://python.org/downloads/) — **check "Add Python to PATH"**
- **Linux:** `sudo apt install python3 python3-pip python3-venv`

### Install FFmpeg

- **macOS:** `brew install ffmpeg`
- **Windows:** `winget install ffmpeg` or download from [ffmpeg.org](https://ffmpeg.org/download.html) and add to PATH
- **Linux:** `sudo apt install ffmpeg`

---

## Engine Selection (per platform)

| Platform | Default Engine | Model | Size |
|----------|---------------|-------|------|
| **macOS (Apple Silicon)** | MLX Whisper | `mlx-community/whisper-medium-mlx` | ~1.5GB |
| **macOS (Intel)** | faster-whisper | `medium` (CTranslate2) | ~1.5GB |
| **Windows** | faster-whisper | `medium` (CTranslate2) | ~1.5GB |
| **Linux** | faster-whisper | `medium` (CTranslate2) | ~1.5GB |

All engines use the `medium` model by default — best balance of speed and accuracy. You can change the model in Settings → AI.

---

## Pre-install Whisper (Optional)

If you want to pre-download models before first use:

### macOS (Apple Silicon — MLX)

```bash
cd lyrics-engine
python3 -m venv venv
source venv/bin/activate
pip install mlx-whisper

# Pre-download the model:
python3 -c "from mlx_whisper import transcribe; transcribe('__dry_run__', path_or_hf_repo='mlx-community/whisper-medium-mlx')" 2>/dev/null || true
```

### Windows / Linux / macOS Intel (faster-whisper)

```bash
cd lyrics-engine
python3 -m venv venv
# Windows: venv\Scripts\activate
# Linux/macOS: source venv/bin/activate
pip install faster-whisper==1.0.3 ctranslate2==4.4.0

# Pre-download the model:
python3 -c "from faster_whisper import WhisperModel; WhisperModel('medium', device='cpu', compute_type='int8')"
```

### Fallback: openai-whisper (any platform)

```bash
cd lyrics-engine
python3 -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install openai-whisper soundfile imageio-ffmpeg

# Pre-download the model:
python3 -c "import whisper; whisper.load_model('medium')"
```

---

## Script Paths

In a **packaged app** (installed via .dmg/.exe/.AppImage), paths resolve as:

| File | Packaged Path |
|------|--------------|
| Aligner script | `resources/app/lyrics-engine/aligner.py` |
| Python venv | `resources/app/lyrics-engine/venv/` |
| Setup script | `resources/app/scripts/setup_aligner.py` |

In **development** mode, paths are relative to the project root (`lyrics-engine/`, `scripts/`).

---

## Troubleshooting

| Issue | Fix |
|-------|-----|
| App freezes during first alignment | Fixed in latest version — setup runs async. Update your app. |
| "No module named faster_whisper" | App auto-installs on retry. If stuck, delete `lyrics-engine/venv/` and retry. |
| "CUDA reported available but failed" | Normal without NVIDIA GPU. Falls back to CPU automatically. |
| Model download hangs | Check firewall/proxy. Pre-download manually (see above). |
| "ffmpeg not found" | Add FFmpeg to system PATH and restart the app. |
| "exit code 1" | Delete `lyrics-engine/venv/`, let app reinstall. |
| Very slow on CPU | Use `base` model in Settings → AI, or get a machine with Apple Silicon / NVIDIA GPU. |

## First Run

The first use downloads Whisper models (~1.5GB for `medium`). Progress is shown in:
- The **AI Activity Hub** (click the AI status icon)
- The **LRC panel hint** text (in Flow Mode → LRC tab)
- The **lyrics overlay** ("Generating lyrics…" with step labels)

Subsequent runs use the cached model instantly.
