#!/usr/bin/env bash
# Downloads the pinned Simple Icons release (CC0 SVG path data; the trademarks
# stay with their owners) into tools/vendor/, checked against its sha256.
# tools/marks.js copies the icons the site uses from there into assets/logos/.
# Run it only to add or update a mark; the site never fetches anything at runtime.
# tools/vendor/ is not committed.
set -euo pipefail
cd "$(dirname "$0")"

VERSION=16.33.0
SHA256=11e1ab7c25fd0acbf0014c4a88745c33fe0f87341e6d94c7ba1e62334b2d2375
URL="https://registry.npmjs.org/simple-icons/-/simple-icons-$VERSION.tgz"
DEST="vendor/simple-icons-$VERSION"

[ -d "$DEST/icons" ] && { echo "$DEST already present"; exit 0; }
mkdir -p vendor
tmp=$(mktemp)
curl -fsSL "$URL" -o "$tmp"
got=$(shasum -a 256 "$tmp" | cut -d' ' -f1)
[ "$got" = "$SHA256" ] || { echo "sha256 mismatch for $URL: $got" >&2; rm -f "$tmp"; exit 1; }
mkdir -p "$DEST"
tar xzf "$tmp" -C "$DEST" --strip-components=1 package/icons package/data package/LICENSE.md package/DISCLAIMER.md
rm -f "$tmp"
echo "Simple Icons $VERSION in tools/$DEST"
