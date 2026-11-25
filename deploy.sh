#!/usr/bin/env bash
set -euo pipefail

APP_SERVICE="ae-india-nextjs"

cd "$(dirname "$0")"

if [ ! -f .env ]; then
  echo "ERROR: .env is missing. Copy .env.example to .env and fill it in."
  exit 1
fi

echo "==> Validating Docker Compose config"
docker compose config --quiet

# Built before anything is stopped, so a failed build leaves the running site up.
# --no-cache also picks up a fresh `npm ci`; --pull the latest Node image.
echo "==> Building fresh app image"
docker compose build --pull --no-cache "$APP_SERVICE"

echo "==> Replacing the container"
docker compose up -d --force-recreate "$APP_SERVICE"

APP_URL="http://$(docker compose port "$APP_SERVICE" 3000)"

echo "==> Waiting for app to respond at $APP_URL"
for attempt in $(seq 1 30); do
  if curl -fsS "$APP_URL/" >/dev/null 2>&1; then
    echo "==> Deployment is live: $APP_URL"
    docker compose ps
    # Drops images left untagged by this build; tagged images are untouched.
    docker image prune -f --filter "label=com.docker.compose.project=ae-india" >/dev/null
    exit 0
  fi

  echo "    Waiting... ($attempt/30)"
  sleep 2
done

echo "ERROR: App did not respond at $APP_URL"
docker compose logs --tail=80 "$APP_SERVICE"
exit 1
