#!/usr/bin/env bash
set -euo pipefail

MIN_AVAILABLE_KB=$((1536 * 1024))

cd "$(dirname "$0")/.."
export PATH="$HOME/.local/node/bin:$PATH"

available_kb=$(awk '/^MemAvailable:/ { print $2 }' /proc/meminfo)
if [ "$available_kb" -lt "$MIN_AVAILABLE_KB" ]; then
  echo "Warning: only $((available_kb / 1024)) MB of RAM is available. The build needs about 1.5 GB."
  read -r -p "Continue anyway? [y/N] " answer
  [[ "$answer" =~ ^[Yy]$ ]] || exit 1
fi

git pull --ff-only
npm ci
npm run build

cp -r public .next/standalone/
cp -r .next/static .next/standalone/.next/

systemctl --user restart portfolio
echo "Deployed $(git rev-parse --short HEAD)"
