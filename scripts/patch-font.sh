#!/bin/bash
# patch-font.sh — Extract SFNS ExtraBold from macOS system font and patch into Chromic Engine
#
# Usage: ./scripts/patch-font.sh
#
# This extracts weight 800 (ExtraBold) from the macOS variable system font (SFNS.ttf)
# and copies it into the installed Chromic Engine app bundle.
# The GPU lyrics renderer will auto-detect and use this font.

set -e

APP_PATH="/Applications/Chromic Engine.app"
VENDOR_DIR="$APP_PATH/Contents/Resources/app.asar.unpacked/public/chromic-lyrics/vendor"
FONT_NAME="SFNS-ExtraBold.ttf"
SYSTEM_FONT="/System/Library/Fonts/SFNS.ttf"
TMP_FONT="/tmp/$FONT_NAME"

echo "🔤 Chromic Engine — Font Patcher"
echo "================================="

# Check if app is installed
if [ ! -d "$APP_PATH" ]; then
    echo "❌ Chromic Engine not found at: $APP_PATH"
    echo "   Install the app first, then run this script."
    exit 1
fi

# Check system font exists
if [ ! -f "$SYSTEM_FONT" ]; then
    echo "❌ System font not found: $SYSTEM_FONT"
    echo "   This script only works on macOS."
    exit 1
fi

# Check if fonttools is available
if ! python3 -c "import fontTools" 2>/dev/null; then
    echo "📦 Installing fonttools..."
    pip3 install --break-system-packages fonttools brotli
fi

# Extract ExtraBold weight using variable font instancing
echo "⏳ Extracting weight 800 (ExtraBold) from SFNS.ttf..."
python3 - "$SYSTEM_FONT" "$TMP_FONT" << 'PYEOF'
import sys
from fontTools.ttLib import TTFont
from fontTools.varLib.instancer import instantiateVariableFont, OverlapMode

src_path = sys.argv[1]
out_path = sys.argv[2]

font = TTFont(src_path)

# Instance to weight 800, removing overlaps for clean outlines
font = instantiateVariableFont(font, {'wght': 800}, overlap=OverlapMode.REMOVE)

# Drop all remaining variable font tables to make it a pure static TTF
for tag in ['fvar', 'gvar', 'cvar', 'STAT', 'avar', 'HVAR', 'VVAR', 'MVAR']:
    if tag in font:
        del font[tag]

font.flavor = None
font.save(out_path)
print(f'   ✅ Extracted to {out_path}')
PYEOF


# Create vendor dir in app.asar.unpacked (the ONLY safe place to put fonts)
# NEVER repack app.asar — it corrupts the app and prevents it from opening
if [ ! -d "$VENDOR_DIR" ]; then
    echo "📁 Creating vendor directory..."
    sudo mkdir -p "$VENDOR_DIR"
fi

echo "📋 Copying font into app bundle (asar.unpacked)..."
sudo cp "$TMP_FONT" "$VENDOR_DIR/$FONT_NAME"
sudo cp "$TMP_FONT" "$VENDOR_DIR/SFNS.ttf"
sudo chmod 644 "$VENDOR_DIR/$FONT_NAME"
sudo chmod 644 "$VENDOR_DIR/SFNS.ttf"

# Copy font into source project (for dev server)
PROJ_VENDOR="$(dirname "$0")/../public/chromic-lyrics/vendor"
DIST_VENDOR="$(dirname "$0")/../dist/chromic-lyrics/vendor"
echo "📋 Copying font into project source..."
mkdir -p "$PROJ_VENDOR" 2>/dev/null || true
cp "$TMP_FONT" "$PROJ_VENDOR/$FONT_NAME" 2>/dev/null && cp "$TMP_FONT" "$PROJ_VENDOR/SFNS.ttf" 2>/dev/null || true
mkdir -p "$DIST_VENDOR" 2>/dev/null && cp "$TMP_FONT" "$DIST_VENDOR/$FONT_NAME" 2>/dev/null && cp "$TMP_FONT" "$DIST_VENDOR/SFNS.ttf" 2>/dev/null || true


# Clean up
rm -f "$TMP_FONT"

echo ""
echo "✅ Done! Font patched into Chromic Engine."
echo "   Restart the app to use the new font."
echo ""
echo "   Font placed in: $VENDOR_DIR/"
echo "   (app.asar was NOT modified — safe patching only)"


