#!/usr/bin/env bash
# Regenerates the images from their HTML sources with headless Google Chrome
# (ImageMagick cannot rasterize these correctly):
#
#   tools/og-render.html      -> assets/og.png             1200x630
#   tools/banner-render.html  -> assets/readme-banner.png  2560x1280 (1280x640 at 2x)
#   tools/avatar-render.html  -> assets/org-avatar.png     512x512
#   assets/favicon.svg        -> assets/icon-512.png, icon-192.png, apple-touch-icon.png (180),
#                                icon-maskable-512.png (mark inside the 80% safe zone)
#
# The renders load ../assets/brain.js and the self-hosted fonts, and pin the
# dark theme, so they come out the same on any machine. macOS (uses sips).
set -euo pipefail
cd "$(dirname "$0")/.."
ROOT="$(pwd)"
CHROME="${CHROME:-/Applications/Google Chrome.app/Contents/MacOS/Google Chrome}"
TMP="$(mktemp -d)"
trap 'rm -rf "$TMP"' EXIT

shoot() { # src w h out [scale]
  "$CHROME" --headless --disable-gpu --no-sandbox --hide-scrollbars --allow-file-access-from-files \
    --force-device-scale-factor="${5:-1}" --window-size="$2,$3" \
    --virtual-time-budget=4000 --screenshot="$4" "file://$1" >/dev/null 2>&1
}

shoot "$ROOT/tools/og-render.html" 1200 630 "$ROOT/assets/og.png"
shoot "$ROOT/tools/banner-render.html" 1280 640 "$ROOT/assets/readme-banner.png" 2
# GitHub has no avatar API: upload assets/org-avatar.png by hand.
shoot "$ROOT/tools/avatar-render.html" 512 512 "$ROOT/assets/org-avatar.png"

# App icons. The favicon follows the colour scheme; icons pin the dark look.
# Chrome ignores window widths under ~500px, so render at 512 and downscale.
icon() { # pad-percent out
  cat > "$TMP/icon.html" <<HTML
<!DOCTYPE html><meta charset="utf-8">
<style>html,body{margin:0;background:#070f11;width:512px;height:512px;display:grid;place-items:center}
img{width:$((512 - 512 * $1 / 100))px;height:$((512 - 512 * $1 / 100))px}</style>
<img src="file://$ROOT/assets/favicon.svg">
HTML
  shoot "$TMP/icon.html" 512 512 "$2"
}
icon 16 "$ROOT/assets/icon-512.png"
icon 36 "$ROOT/assets/icon-maskable-512.png"
sips -z 192 192 "$ROOT/assets/icon-512.png" --out "$ROOT/assets/icon-192.png" >/dev/null
sips -z 180 180 "$ROOT/assets/icon-512.png" --out "$ROOT/assets/apple-touch-icon.png" >/dev/null

for f in og.png readme-banner.png org-avatar.png icon-512.png icon-maskable-512.png icon-192.png apple-touch-icon.png; do
  printf '%-22s %s\n' "$f" "$(sips -g pixelWidth -g pixelHeight "$ROOT/assets/$f" | tail -2 | awk '{print $2}' | paste -sd x -)"
done
