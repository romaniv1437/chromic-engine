#!/usr/bin/env bash
set -euo pipefail

# Removes macOS quarantine flags from Chromic app bundles.
# Usage:
#   ./scripts/fix-macos-quarantine.sh
#   ./scripts/fix-macos-quarantine.sh "/Applications/Chromic Engine.app"

if [[ "${OSTYPE:-}" != darwin* ]]; then
  echo "This script is intended for macOS only."
  exit 1
fi

if [[ $# -gt 0 ]]; then
  app_path="$1"
  if [[ ! -d "$app_path" ]]; then
    echo "App bundle not found: $app_path"
    exit 1
  fi
  candidates=("$app_path")
else
  candidates=()
  for p in \
    "/Applications/Chromic Engine.app" \
    "/Applications/Chromic.app" \
    "$HOME/Applications/Chromic Engine.app" \
    "$HOME/Applications/Chromic.app"; do
    [[ -d "$p" ]] && candidates+=("$p")
  done
fi

if [[ ${#candidates[@]} -eq 0 ]]; then
  echo "No Chromic app bundle found in standard locations."
  echo "Install the app first or pass an explicit path:"
  echo "  ./scripts/fix-macos-quarantine.sh \"/path/to/Chromic Engine.app\""
  exit 1
fi

for app in "${candidates[@]}"; do
  echo "Clearing quarantine attributes: $app"
  xattr -cr "$app"
  # Print any remaining quarantine attrs (should be empty)
  xattr -lr "$app" 2>/dev/null | grep -i quarantine || true
  echo "Done: $app"
done

