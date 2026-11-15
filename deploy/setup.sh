#!/usr/bin/env bash
set -euo pipefail

NODE_VERSION="v24.19.0"
NODE_DIR="$HOME/.local/node"
APP_DIR="$(cd "$(dirname "$0")/.." && pwd)"

if [ ! -x "$NODE_DIR/bin/node" ]; then
  echo "Installing Node.js $NODE_VERSION into $NODE_DIR"
  mkdir -p "$NODE_DIR"
  curl -fsSL "https://nodejs.org/dist/$NODE_VERSION/node-$NODE_VERSION-linux-x64.tar.xz" |
    tar -xJ -C "$NODE_DIR" --strip-components=1
fi

mkdir -p "$HOME/.config/systemd/user"
cp "$APP_DIR/deploy/portfolio.service" "$HOME/.config/systemd/user/portfolio.service"
systemctl --user daemon-reload
systemctl --user enable portfolio

if [ ! -f "$APP_DIR/.env" ]; then
  install -m 600 "$APP_DIR/.env.example" "$APP_DIR/.env"
  echo
  echo "Created $APP_DIR/.env (mode 600)."
  echo "Fill it in, then run this script again to build and start the site."
  exit 0
fi

chmod 600 "$APP_DIR/.env"
"$APP_DIR/deploy/deploy.sh"
