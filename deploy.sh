#!/usr/bin/env bash
# bycrypt client production deploy
# Usage on server: bash /www/wwwroot/bycrypt.net/deploy.sh
set -euo pipefail

ROOT=/www/wwwroot/bycrypt.net
API_URL="${NEXT_PUBLIC_API_URL:-https://cms.bycrypt.net}"

cd "$ROOT" && git pull origin main

# Always rewrite prod env so build never falls back to wrong host.
printf '%s\n' "NEXT_PUBLIC_API_URL=${API_URL}" > .env.production.local
printf '%s\n' "NEXT_PUBLIC_API_URL=${API_URL}" > .env
rm -f .env.local

if grep -Eiq 'localhost|127\.0\.0\.1|wnskcex' .env.production.local; then
  echo "ERROR: production NEXT_PUBLIC_API_URL looks wrong" >&2
  cat .env.production.local >&2
  exit 1
fi

npm ci && npm run build

if grep -RIq --include='*.js' 'localhost:8000\|cms.wnskcex.com' .next/static .next/server 2>/dev/null; then
  echo "ERROR: built client bundle still references localhost or old wnskcex host" >&2
  exit 1
fi

pm2 restart bycrypt-web
curl -sk -o /dev/null -w "home:%{http_code}\n" https://bycrypt.net/
