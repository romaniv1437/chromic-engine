#!/usr/bin/env python3
"""
Chromic Engine — AI Aligner Setup Script
Automatically creates a virtual environment and installs all dependencies
for the lyrics alignment engine (Whisper, WhisperX, etc.)
"""

import os
import sys
import subprocess
import platform
import shutil


def run(cmd, check=True):
    """Run a shell command and return success status."""
    print(f"  $ {cmd}")
    result = subprocess.run(cmd, shell=True)
    if check and result.returncode != 0:
        print(f"\n  ERROR: Command failed with exit code {result.returncode}")
        return False
    return result.returncode == 0


def check_python_version():
    """Ensure Python 3.10+ is available."""
    v = sys.version_info
    if v.major < 3 or (v.major == 3 and v.minor < 10):
        print(f"ERROR: Python 3.10+ required, got {v.major}.{v.minor}.{v.micro}")
        print("  Install: https://python.org/downloads/")
        sys.exit(1)
    print(f"  Python {v.major}.{v.minor}.{v.micro} — OK")


def check_ffmpeg():
    """Check if ffmpeg is available in PATH."""
    if shutil.which("ffmpeg"):
        print("  FFmpeg — OK")
        return True
    else:
        print("\n  WARNING: FFmpeg not found in PATH!")
        system = platform.system()
        if system == "Darwin":
            print("  Install: brew install ffmpeg")
        elif system == "Linux":
            print("  Install: sudo apt install ffmpeg")
        elif system == "Windows":
            print("  Install: winget install ffmpeg")
            print("       or: https://ffmpeg.org/download.html (add to PATH)")
        print("\n  FFmpeg is required for audio decoding. Install it and re-run this script.")
        return False


def get_venv_paths(venv_dir):
    """Get pip and python paths for the venv."""
    if platform.system() == "Windows":
        pip_path = os.path.join(venv_dir, "Scripts", "pip")
        python_path = os.path.join(venv_dir, "Scripts", "python")
    else:
        pip_path = os.path.join(venv_dir, "bin", "pip")
        python_path = os.path.join(venv_dir, "bin", "python")
    return pip_path, python_path


def detect_best_engine():
    """Detect which Whisper engine to install based on platform."""
    system = platform.system()
    machine = platform.machine().lower()

    if system == "Darwin" and ("arm" in machine or "aarch64" in machine):
        return "mlx"  # Apple Silicon — fastest
    else:
        return "faster-whisper"  # Windows, Linux, macOS Intel


def main():
    print("\n╔══════════════════════════════════════════════╗")
    print("║   Chromic Engine — AI Aligner Setup          ║")
    print("╚══════════════════════════════════════════════╝\n")

    print(f"  System: {platform.system()} {platform.machine()}")
    check_python_version()
    ffmpeg_ok = check_ffmpeg()

    if not ffmpeg_ok:
        response = input("\n  Continue without FFmpeg? (y/N): ").strip().lower()
        if response != "y":
            sys.exit(1)

    # Determine venv location — must be lyrics-engine/venv/ for the app to find it
    venv_dir = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "lyrics-engine", "venv")
    venv_dir = os.path.abspath(venv_dir)

    # Create venv
    if not os.path.exists(venv_dir):
        print(f"\n  Creating virtual environment: {venv_dir}")
        run(f'"{sys.executable}" -m venv "{venv_dir}"')
    else:
        print(f"\n  Virtual environment already exists: {venv_dir}")

    pip_path, python_path = get_venv_paths(venv_dir)

    # Upgrade pip
    print("\n  Upgrading pip...")
    run(f'"{pip_path}" install --upgrade pip -q')

    # Install base dependencies
    print("\n  Installing base dependencies...")
    run(f'"{pip_path}" install soundfile numpy -q')

    # Install Whisper engine based on platform
    engine = detect_best_engine()
    print(f"\n  Detected best engine for your platform: {engine}")

    if engine == "mlx":
        print("  Installing MLX Whisper (Apple Silicon optimized)...")
        run(f'"{pip_path}" install mlx-whisper -q')
    elif engine == "faster-whisper":
        print("  Installing faster-whisper...")
        run(f'"{pip_path}" install faster-whisper==1.0.3 ctranslate2==4.4.0 -q')
    else:
        print("  Installing openai-whisper (CPU)...")
        run(f'"{pip_path}" install openai-whisper soundfile imageio-ffmpeg -q')

    # Also install requirements.txt from lyrics-engine
    req_file = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "lyrics-engine", "requirements.txt")
    if os.path.exists(req_file):
        print(f"\n  Installing lyrics-engine requirements...")
        run(f'"{pip_path}" install -r "{req_file}" -q')

    # Summary
    print("\n" + "=" * 50)
    print("  SETUP COMPLETE")
    print("=" * 50)
    print(f"\n  Engine: {engine}")
    print(f"  Venv:   {venv_dir}")
    if platform.system() == "Windows":
        print(f"  Activate: {venv_dir}\\Scripts\\activate")
    else:
        print(f"  Activate: source {venv_dir}/bin/activate")
    print("\n  Pre-download the Whisper model (optional, ~1.5GB):")
    if engine == "mlx":
        print(f'  {python_path} -c "from mlx_whisper import transcribe"')
    elif engine == "faster-whisper":
        print(f'  {python_path} -c "from faster_whisper import WhisperModel; WhisperModel(\'medium\', device=\'cpu\', compute_type=\'int8\')"')
    else:
        print(f'  {python_path} -c "import whisper; whisper.load_model(\'medium\')"')
    print("\n  Chromic Engine will auto-detect this venv on next launch.\n")


if __name__ == "__main__":
    main()

