#!/usr/bin/env bash
# Deploys the livingbrain.wiki site from main, and from nothing else.
#
#     tools/deploy.sh             build main in a throwaway worktree, deploy it
#     tools/deploy.sh --dry-run   build it and say what would ship, deploy nothing
#
# Why not `build-dist.sh && wrangler pages deploy dist` from wherever you are:
# that ships the contents of a working copy, and a working copy is shared state.
# Deploying from it can publish uncommitted edits, or a checkout that is behind
# main and quietly rolls back merged work.
#
# So this never reads the caller's working tree or its dist/. It checks main
# (origin/main when a remote exists) out into a temporary worktree, builds
# there, deploys that, and removes it. The deployment records the commit.
#
# Cloudflare Pages project: livingbrain, on the Factory0 account, via
# CLOUDFLARE_API_TOKEN or `wrangler login` (see README, Deploy).
# Run only when asked to deploy.
set -euo pipefail

dry_run=0
case "${1:-}" in
  "") ;;
  --dry-run) dry_run=1 ;;
  *) echo "usage: tools/deploy.sh [--dry-run]" >&2; exit 2 ;;
esac

root=$(git -C "$(dirname "$0")/.." rev-parse --show-toplevel)
cd "$root"

if git remote get-url origin >/dev/null 2>&1; then
  git fetch --quiet origin main
  ref=origin/main
else
  ref=main
fi
sha=$(git rev-parse "$ref")
subject=$(git log -1 --format=%s "$sha")

tmp=$(mktemp -d "${TMPDIR:-/tmp}/livingbrain-deploy.XXXXXX")
cleanup() {
  git -C "$root" worktree remove --force "$tmp/tree" >/dev/null 2>&1 || true
  rm -rf "$tmp"
}
trap cleanup EXIT

git worktree add --quiet --detach "$tmp/tree" "$sha"
"$tmp/tree/tools/build-dist.sh" >/dev/null

files=$(find "$tmp/tree/dist" -type f | wc -l | tr -d ' ')
echo "$ref ${sha:0:7}  $subject"
echo "built $files files in a clean checkout"

if [ "$dry_run" = 1 ]; then
  echo "dry run: nothing deployed"
  exit 0
fi

npx --yes wrangler@latest pages deploy "$tmp/tree/dist" \
  --project-name=livingbrain \
  --branch=main \
  --commit-hash="$sha" \
  --commit-message="$subject" \
  --commit-dirty=false
