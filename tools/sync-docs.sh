#!/usr/bin/env bash
# Mirrors the product documentation into docs-src/ and records exactly what was
# taken. The site renders these with tools/build-docs.js; it never edits them,
# because the product repo is the source of truth for every claim they make.
#
#     tools/sync-docs.sh                  # mirror Livingbrain-wiki/livingbrain main
#     tools/sync-docs.sh <ref>            # mirror a branch, tag or commit
#
# After syncing, run `node tools/build-docs.js` and commit both docs-src/ and docs/.
#
# Only the files listed in FILES are mirrored. Internal runbooks, ops notes,
# design audits, ADRs and the issue/telemetry specs are deliberately left out
# (see the "Not mirrored" list in tools/build-docs.js). A file in FILES that the
# ref does not have is skipped with a warning and any older copy is removed.
set -euo pipefail
cd "$(dirname "$0")/.."

REPO="${DOCS_REPO:-Livingbrain-wiki/livingbrain}"
REF="${1:-main}"
FILES=(
  coding-agents.md github.md import.md local-runner.md logs.md mcp.md
  temporal-facts.md usage-data.md telemetry.md
)

command -v gh >/dev/null || { echo "gh is required" >&2; exit 1; }

COMMIT="$(gh api "repos/$REPO/commits/$REF" --jq .sha)"
DATE="$(gh api "repos/$REPO/commits/$COMMIT" --jq .commit.committer.date)"

hash_of() {
  if command -v sha256sum >/dev/null 2>&1; then sha256sum "$1" | cut -d' ' -f1
  else shasum -a 256 "$1" | cut -d' ' -f1; fi
}

rm -rf docs-src
mkdir -p docs-src
MIRRORED=()
for f in "${FILES[@]}"; do
  if gh api "repos/$REPO/contents/docs/$f?ref=$COMMIT" \
    -H "Accept: application/vnd.github.raw" > "docs-src/$f.part" 2>/dev/null; then
    mv "docs-src/$f.part" "docs-src/$f"
    MIRRORED+=("$f")
    echo "  docs/$f"
  else
    rm -f "docs-src/$f.part" "docs-src/$f"
    echo "  docs/$f: not at ${COMMIT:0:7}, skipped" >&2
  fi
done

{
  echo "# Mirrored from $REPO. Regenerate with tools/sync-docs.sh."
  echo "# The site does not edit these files: fix the product repo, then re-sync."
  echo "repo    $REPO"
  echo "ref     $REF"
  echo "commit  $COMMIT"
  echo "date    $DATE"
  echo
  for f in ${MIRRORED[@]+"${MIRRORED[@]}"}; do printf '%s  %s\n' "$(hash_of "docs-src/$f")" "$f"; done
} > docs-src/mirror.lock

echo "mirrored $REPO@${COMMIT:0:7} ($REF): ${#MIRRORED[@]} files"
