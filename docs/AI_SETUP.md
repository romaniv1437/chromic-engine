# AI Lyrics Aligner — Setup Guide

The AI Lyrics Aligner uses Whisper to transcribe and align lyrics word-by-word. Chromic Engine auto-installs dependencies on first use.

## One-Command Setup

The fastest way to get the AI engine ready:

```bash
python3 scripts/setup_aligner.py
```

This script automatically:
- Detects your OS and CPU architecture
- Creates an isolated virtual environment
- Installs the optimal Whisper engine (MLX on Apple Silicon, faster-whisper on Linux, openai-whisper on Windows)
- Checks for FFmpeg
- Installs all lyrics-engine requirements

---

## Prerequisites

| Dependency | Why | Install |
|------------|-----|---------|
| **Python 3.10-3.12** | Whisper runtime | [python.org](https://python.org/downloads/) |
| **FFmpeg** | Audio decoding | See below |
| **pip** | Package management | Included with Python |

## Install Python

- **macOS:** `brew install python@3.12`
- **Windows:** Download from [python.org](https://python.org/downloads/) — check "Add Python to PATH"
- **Linux:** `sudo apt install python3 python3-pip python3-venv`

## Install FFmpeg

- **macOS:** `brew install ffmpeg`
- **Windows:** `winget install ffmpeg` or [ffmpeg.org](https://ffmpeg.org/download.html)
- **Linux:** `sudo apt install ffmpeg`

## Engine Options

| Engine | Platform | Speed | Quality |
|--------|----------|-------|---------|
| **MLX Whisper** | macOS (Apple Silicon) | Fastest | Great |
| **faster-whisper** | macOS / Linux | Fast | Great |
| **openai-whisper** | All platforms | Slower | Great |
| **WhisperX** | All (needs torch) | Medium | Best (word alignment) |

Chromic auto-selects the best engine for your platform.

## Pre-install Whisper (Optional)

```bash
python3 -m venv whisper-env
source whisper-env/bin/activate  # Windows: whisper-env\Scripts\activate
pip install openai-whisper soundfile imageio-ffmpeg

# Pre-download a model:
python -c "import whisper; whisper.load_model('base')"      # 140MB, fastest
python -c "import whisper; whisper.load_model('medium')"    # 1.5GB, best quality
```

> Chromic creates its own venv at `~/.chromic-engine/lyrics-engine/venv/`. The model cache is shared (`~/.cache/whisper/`).

## Troubleshooting

| Issue | Fix |
|-------|-----|
| "CUDA reported available but failed" | Normal without NVIDIA GPU. Falls back to CPU. |
| Model download hangs | Pre-download manually. Check firewall/proxy. |
| "ffmpeg not found" | Add to system PATH and restart. |
| "exit code 1" | Delete venv folder, let app reinstall (CPU-only torch). |
| Very slow on CPU | Use `base` model or get a machine with NVIDIA GPU. |

## First Run

The first use downloads Whisper models (500MB-1.5GB). A progress overlay appears during download. Subsequent runs use the cached model instantly.

