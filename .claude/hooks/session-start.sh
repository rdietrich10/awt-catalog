#!/bin/bash
set -euo pipefail

if [ "${CLAUDE_CODE_REMOTE:-}" != "true" ]; then
  exit 0
fi

cd "$CLAUDE_PROJECT_DIR"

# Install pnpm if not available
if ! command -v pnpm &> /dev/null; then
  npm install -g pnpm
fi

# Install dependencies (uses lockfile if present, skips if up to date)
pnpm install
