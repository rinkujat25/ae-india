#!/usr/bin/env bash
set -euo pipefail

APP_IMAGE="wingback-nextjs:latest"
APP_SERVICE="wingback-nextjs"
APP_URL="http://127.0.0.1:4010"

cd "$(dirname "$0")"

echo "==> Validating Docker Compose config"
docker compose config >/dev/null

echo "==> Stopping old container"
docker compose down --remove-orphans

echo "==> Removing old app image if it exists"
docker image rm "$APP_IMAGE" >/dev/null 2>&1 || true

echo "==> Building fresh app image without cache"
docker compose build --no-cache "$APP_SERVICE"

echo "==> Starting fresh deployment"
docker compose up -d "$APP_SERVICE"

echo "==> Waiting for app to respond at $APP_URL"
for attempt in $(seq 1 30); do
  if curl -fsS "$APP_URL" >/dev/null; then
    echo "==> Deployment is live: $APP_URL"
    docker compose ps
    exit 0
  fi

  echo "    Waiting... ($attempt/30)"
  sleep 2
done

echo "ERROR: App did not respond at $APP_URL"
docker compose logs --tail=80 "$APP_SERVICE"
exit 1
