#!/usr/bin/env bash
set -euo pipefail

DOMAIN="${DOMAIN:-cms.wnskcex.com}"
ADMIN_URL="${ADMIN_URL:-https://${DOMAIN}}"
API_URL="${API_URL:-https://${DOMAIN}/api/config}"
ADMIN_PORT="${ADMIN_PORT:-3100}"
API_PORT="${API_PORT:-3200}"
PM2_ADMIN_NAME="${PM2_ADMIN_NAME:-cms-admin}"
PM2_API_NAME="${PM2_API_NAME:-cms-api}"

PASS_COUNT=0
FAIL_COUNT=0

pass() {
  PASS_COUNT=$((PASS_COUNT + 1))
  printf "[PASS] %s\n" "$1"
}

fail() {
  FAIL_COUNT=$((FAIL_COUNT + 1))
  printf "[FAIL] %s\n" "$1"
}

check_command() {
  local cmd="$1"
  if command -v "$cmd" >/dev/null 2>&1; then
    pass "command '$cmd' exists"
  else
    fail "command '$cmd' missing"
  fi
}

check_http_200() {
  local url="$1"
  local name="$2"
  local code
  code="$(curl -k -sS -o /tmp/cms_verify_body.txt -w "%{http_code}" "$url" || true)"
  if [[ "$code" == "200" ]]; then
    pass "$name returns HTTP 200 ($url)"
  else
    fail "$name returns HTTP $code ($url)"
  fi
}

check_port_listen() {
  local port="$1"
  local name="$2"
  if ss -lnt "( sport = :$port )" | awk 'NR>1 {found=1} END{exit found?0:1}'; then
    pass "$name is listening on :$port"
  else
    fail "$name is not listening on :$port"
  fi
}

check_pm2_process() {
  local name="$1"
  local pid
  pid="$(pm2 pid "$name" 2>/dev/null | tr -d '[:space:]' || true)"
  if [[ -n "$pid" && "$pid" != "0" ]]; then
    pass "pm2 process '$name' is online"
  else
    fail "pm2 process '$name' is not online"
  fi
}

echo "== CMS Deploy Verify =="
echo "Domain: $DOMAIN"
echo "Admin:  $ADMIN_URL"
echo "API:    $API_URL"
echo

check_command curl
check_command ss
check_command pm2
echo

if command -v pm2 >/dev/null 2>&1; then
  check_pm2_process "$PM2_ADMIN_NAME"
  check_pm2_process "$PM2_API_NAME"
fi
echo

check_port_listen "$ADMIN_PORT" "admin app"
check_port_listen "$API_PORT" "api app"
echo

check_http_200 "$ADMIN_URL" "admin homepage"
check_http_200 "$API_URL" "api config"
echo

if command -v nginx >/dev/null 2>&1; then
  if nginx -t >/tmp/cms_nginx_test.txt 2>&1; then
    pass "nginx config test is valid"
  else
    fail "nginx config test failed (see: /tmp/cms_nginx_test.txt)"
  fi
else
  fail "command 'nginx' missing"
fi

echo
echo "Result: $PASS_COUNT passed, $FAIL_COUNT failed"

if [[ "$FAIL_COUNT" -gt 0 ]]; then
  exit 1
fi
