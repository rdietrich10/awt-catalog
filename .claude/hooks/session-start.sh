#!/bin/bash
set -euo pipefail

cd "$CLAUDE_PROJECT_DIR"

# Install pnpm if not available
if ! command -v pnpm &> /dev/null; then
  npm install -g pnpm
fi

# Install dependencies (skips if already up to date)
pnpm install

# Start dev server in the background if not already running
if ! lsof -i :3000 -t &>/dev/null 2>&1; then
  nohup pnpm dev > /tmp/awt-catalog-dev.log 2>&1 &
  echo "Dev server started on http://localhost:3000 (log: /tmp/awt-catalog-dev.log)"
else
  echo "Dev server already running on http://localhost:3000"
fi
