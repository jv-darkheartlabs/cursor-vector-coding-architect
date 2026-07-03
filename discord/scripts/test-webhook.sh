#!/usr/bin/env bash
# Test Discord webhook. Usage: DISCORD_WEBHOOK_ANNOUNCEMENTS=... ./discord/scripts/test-webhook.sh
set -euo pipefail

WEBHOOK="${DISCORD_WEBHOOK_ANNOUNCEMENTS:-${DISCORD_WEBHOOK_URL:-}}"
if [ -z "$WEBHOOK" ]; then
  echo "Set DISCORD_WEBHOOK_ANNOUNCEMENTS or DISCORD_WEBHOOK_URL"
  exit 1
fi

curl -sS -H "Content-Type: application/json" \
  -d '{"content":"📡 **Test** — The Perimeter webhook is live. Shadow Gem announcements will land in #announcements."}' \
  "$WEBHOOK"

echo ""
echo "Sent. Check #announcements."
