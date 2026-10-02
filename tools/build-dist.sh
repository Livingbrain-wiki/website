#!/usr/bin/env bash
# Assembles dist/: the exact set of files that should be public.
# An explicit allowlist, so repo tooling (tools/, design-src/, the docs) can
# never leak onto the site by accident. There is no build step for
# development: serve the repo root directly.
#
# Deploy with tools/deploy.sh (builds main in a clean worktree; see README, Deploy).
# Do not deploy this script's dist/ directly: it is built from whatever the
# working copy holds, which may not be main.
set -euo pipefail
cd "$(dirname "$0")/.."

rm -rf dist
mkdir -p dist/assets/fonts dist/.well-known

# top-level files
for f in index.html 404.html robots.txt sitemap.xml llms.txt site.webmanifest _headers _redirects; do
  cp "$f" dist/
done

# assets, file by file. brain.js is the 3D brain renderer (from the Claude
# Design project); livingbrain.js is the page; livingbrain.css is the design system.
for f in livingbrain.css livingbrain.js brain.js favicon.svg og.png \
         apple-touch-icon.png icon-192.png icon-512.png icon-maskable-512.png; do
  cp "assets/$f" dist/assets/
done
for f in bricolage-grotesque.woff2 hanken-grotesk.woff2 jetbrains-mono.woff2; do
  cp "assets/fonts/$f" dist/assets/fonts/
done
cp .well-known/security.txt dist/.well-known/

# guides: one folder per guide, each an index.html served at /guides/<name>/
mkdir -p dist/guides/import-chatgpt
cp guides/import-chatgpt/index.html dist/guides/import-chatgpt/

# The CSP in _headers allows the inline theme script by hash. Fail if the
# script changed and the hash did not.
b64sha() { if command -v openssl >/dev/null 2>&1; then openssl dgst -sha256 -binary | openssl base64 -A; else shasum -a 256 | cut -d' ' -f1 | xxd -r -p | base64; fi; }
for page in index.html 404.html guides/import-chatgpt/index.html; do
  inline=$(python3 -c 'import re,sys; s=open(sys.argv[1]).read(); m=re.search(r"<script>(.*?)</script>", s, re.S); sys.stdout.write(m.group(1))' "$page")
  h=$(printf '%s' "$inline" | b64sha)
  grep -q "'sha256-$h'" _headers || { echo "CSP hash in _headers does not match the inline script in $page (sha256-$h)" >&2; exit 1; }
done

# Cache busting. Asset filenames are not content-hashed in the repo, so a deploy
# alone cannot invalidate a cached CSS/JS file. Stamp each reference with a short
# content hash here; _headers can then cache /assets/*.css and *.js immutably
# because the URL changes when the file does.
hash_of() {
  if command -v sha256sum >/dev/null 2>&1; then
    sha256sum "$1" | cut -c1-8
  else
    shasum -a 256 "$1" | cut -c1-8
  fi
}

for f in livingbrain.css livingbrain.js brain.js; do
  h=$(hash_of "dist/assets/$f")
  # `sed -i` is not portable: GNU takes no argument, BSD demands one. Write beside the file and move.
  find dist -name '*.html' | while IFS= read -r page; do
    sed "s|/assets/$f\"|/assets/$f?v=$h\"|g" "$page" > "$page.stamped" && mv "$page.stamped" "$page"
  done
  # A sed that matches nothing exits 0. Fail instead of shipping an immutable
  # asset under a URL that never changes.
  grep -q "/assets/$f?v=$h\"" dist/index.html || { echo "cache stamp for $f did not apply" >&2; exit 1; }
done

echo "dist/ assembled:"
find dist -type f | sed 's|^dist/|  |' | sort
echo "  ($(find dist -type f | wc -l | tr -d ' ') files)"
