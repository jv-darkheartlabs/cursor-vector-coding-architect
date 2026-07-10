#!/usr/bin/env bash
# One-shot Perimeter setup — token stays local, never in chat.
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/../.." && pwd)"
MCP="$HOME/.cursor/mcp.json"
GUILD="${DISCORD_GUILD_ID:-1367620065377386637}"

if [[ -z "${DISCORD_TOKEN:-}" ]]; then
  echo "Paste your Vector bot token (from Developer Portal → Bot → Reset Token):"
  read -rs DISCORD_TOKEN
  echo
fi

if [[ -z "$DISCORD_TOKEN" || "$DISCORD_TOKEN" == "PASTE_BOT_TOKEN_HERE" ]]; then
  echo "No token provided. Open:"
  echo "  https://discord.com/developers/applications/1522455491719073852/bot"
  exit 1
fi

export DISCORD_TOKEN DISCORD_GUILD_ID="$GUILD"

# Update MCP config if placeholder still present
if [[ -f "$MCP" ]] && grep -q 'PASTE_BOT_TOKEN_HERE' "$MCP"; then
  python3 - <<'PY'
import json, os
from pathlib import Path
mcp = Path(os.environ["HOME"]) / ".cursor/mcp.json"
data = json.loads(mcp.read_text())
data["mcpServers"]["discord"]["env"]["DISCORD_TOKEN"] = os.environ["DISCORD_TOKEN"]
mcp.write_text(json.dumps(data, indent=2) + "\n")
print("Updated ~/.cursor/mcp.json — restart Cursor for Discord MCP.")
PY
fi

python3 "$ROOT/discord/scripts/setup-perimeter.py"
