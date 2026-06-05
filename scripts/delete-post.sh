#!/usr/bin/env bash
set -euo pipefail

POST_FILE="$1"
TITLE="${2:-post}"

if [ ! -f "$POST_FILE" ]; then
  echo "No file to delete."
  exit 0
fi

# If the file is tracked by git, remove it via git and push the deletion so the
# live blog updates. Otherwise it was only saved locally — just remove it.
if git ls-files --error-unmatch "$POST_FILE" >/dev/null 2>&1; then
  git rm -f "$POST_FILE"
  git commit -m "Delete post: $TITLE"
  git push origin main
  echo "Deleted and pushed."
else
  rm -f "$POST_FILE"
  echo "Removed local file."
fi
