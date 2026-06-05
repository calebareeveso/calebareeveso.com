#!/usr/bin/env bash
set -euo pipefail

POST_FILE="$1"
TITLE="$2"

if [ ! -f "$POST_FILE" ]; then
  echo "Post file does not exist: $POST_FILE"
  exit 1
fi

git add "$POST_FILE"

if git diff --cached --quiet; then
  echo "No changes to publish."
  exit 0
fi

git commit -m "Publish post: $TITLE"
git push origin main
