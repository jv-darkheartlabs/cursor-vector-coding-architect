#!/usr/bin/env python3
"""One-shot Shadow Gem / Perimeter Discord setup via Discord REST API.

Usage (token never goes in chat — paste in terminal only):
  export DISCORD_TOKEN='your-bot-token'
  export DISCORD_GUILD_ID='1367620065377386637'
  python3 discord/scripts/setup-perimeter.py

Requires bot with Administrator (or Manage Channels + Manage Roles) on the guild.
"""

from __future__ import annotations

import json
import os
import sys
import urllib.error
import urllib.request

API = "https://discord.com/api/v10"
GUILD = os.environ.get("DISCORD_GUILD_ID", "1367620065377386637")
TOKEN = os.environ.get("DISCORD_TOKEN", "")

ROLES = [
    ("Perimeter", 0x95A5A6),
    ("Recovery Circle", 0x9B59B6),
    ("Shadow Ops", 0x27AE60),
    ("Architecture Court", 0x34495E),
    ("Incident Dominance", 0xE67E22),
    ("Shadow Gem", 0x8E44AD),
    ("Gem Pro", 0xF1C40F),
    ("The Perimeter", 0xC0392B),
]

STRUCTURE = [
    ("START HERE", "text", [
        "welcome", "rules", "verify-gem", "roles",
    ]),
    ("ANNOUNCEMENTS", "text", [
        "announcements", "shadow-updates", "booktok-clips",
    ]),
    ("THE TERMINAL", "text", [
        "install-help", "logic-trace", "closing-word", "show-your-perimeter",
    ]),
    ("GEM LOUNGE", "text", [
        "gem-general", "gem-support", "gem-feature-votes",
    ], "private_gem"),
    ("PACK LOUNGES", "text", [
        "incident-ops", "architecture-court", "shadow-ops", "recovery-circle",
    ], "private_packs"),
    ("STAFF", "text", [
        "mod-log", "orders-pending",
    ], "private_staff"),
]

MESSAGES = {
    "welcome": open(
        os.path.join(os.path.dirname(__file__), "../messages/welcome.md"), encoding="utf-8"
    ).read().split("---", 1)[-1].strip(),
    "rules": open(
        os.path.join(os.path.dirname(__file__), "../messages/rules.md"), encoding="utf-8"
    ).read().split("---", 1)[-1].strip(),
    "verify-gem": open(
        os.path.join(os.path.dirname(__file__), "../messages/verify-gem.md"), encoding="utf-8"
    ).read().split("---", 1)[-1].strip(),
    "announcements": open(
        os.path.join(os.path.dirname(__file__), "../messages/launch-announcement.md"), encoding="utf-8"
    ).read().split("---", 1)[-1].strip(),
}


def api(method: str, path: str, body: dict | None = None) -> dict | list | None:
    data = json.dumps(body).encode() if body is not None else None
    req = urllib.request.Request(
        f"{API}{path}",
        data=data,
        method=method,
        headers={
            "Authorization": f"Bot {TOKEN}",
            "Content-Type": "application/json",
            "User-Agent": "ShadowGemSetup (https://github.com/jen-the-dev/cursor-vector-coding-architect, 1.0)",
        },
    )
    try:
        with urllib.request.urlopen(req) as resp:
            raw = resp.read().decode()
            return json.loads(raw) if raw else None
    except urllib.error.HTTPError as e:
        err = e.read().decode()
        print(f"HTTP {e.code} {method} {path}: {err}", file=sys.stderr)
        raise


def main() -> None:
    if not TOKEN:
        print("Set DISCORD_TOKEN in your environment.", file=sys.stderr)
        sys.exit(1)

    print(f"Setting up Perimeter on guild {GUILD}...")

    role_ids: dict[str, str] = {}
    for name, color in ROLES:
        existing = api("GET", f"/guilds/{GUILD}/roles")
        found = next((r for r in existing if r["name"] == name), None)
        if found:
            role_ids[name] = found["id"]
            print(f"  role exists: {name}")
        else:
            r = api("POST", f"/guilds/{GUILD}/roles", {"name": name, "color": color})
            role_ids[name] = r["id"]
            print(f"  created role: {name}")

    everyone = GUILD  # @everyone overwrite id equals guild id

    for entry in STRUCTURE:
        cat_name = entry[0]
        ch_type = 0 if entry[1] == "text" else 2
        channels = entry[2]
        priv = entry[3] if len(entry) > 3 else None

        cat = api("POST", f"/guilds/{GUILD}/channels", {"name": cat_name, "type": 4})
        cat_id = cat["id"]
        print(f"category: {cat_name}")

        for ch_name in channels:
            ch = api(
                "POST",
                f"/guilds/{GUILD}/channels",
                {"name": ch_name, "type": ch_type, "parent_id": cat_id},
            )
            ch_id = ch["id"]
            print(f"  channel: #{ch_name}")

            if priv == "private_gem":
                api("PUT", f"/channels/{ch_id}/permissions/{everyone}", {"type": 0, "deny": "1024"})
                for rn in ("Shadow Gem", "Gem Pro", "The Perimeter"):
                    api("PUT", f"/channels/{ch_id}/permissions/{role_ids[rn]}", {"type": 0, "allow": "1024"})
            elif priv == "private_packs":
                api("PUT", f"/channels/{ch_id}/permissions/{everyone}", {"type": 0, "deny": "1024"})
                api("PUT", f"/channels/{ch_id}/permissions/{role_ids['Shadow Gem']}", {"type": 0, "allow": "1024"})
                pack_map = {
                    "incident-ops": "Incident Dominance",
                    "architecture-court": "Architecture Court",
                    "shadow-ops": "Shadow Ops",
                    "recovery-circle": "Recovery Circle",
                }
                if ch_name in pack_map:
                    api(
                        "PUT",
                        f"/channels/{ch_id}/permissions/{role_ids[pack_map[ch_name]]}",
                        {"type": 0, "allow": "1024"},
                    )
                api("PUT", f"/channels/{ch_id}/permissions/{role_ids['The Perimeter']}", {"type": 0, "allow": "1024"})
            elif priv == "private_staff":
                api("PUT", f"/channels/{ch_id}/permissions/{everyone}", {"type": 0, "deny": "1024"})
                api("PUT", f"/channels/{ch_id}/permissions/{role_ids['The Perimeter']}", {"type": 0, "allow": "1024"})
            elif cat_name == "ANNOUNCEMENTS":
                api("PUT", f"/channels/{ch_id}/permissions/{everyone}", {"type": 0, "allow": "1024", "deny": "2048"})
                api("PUT", f"/channels/{ch_id}/permissions/{role_ids['The Perimeter']}", {"type": 0, "allow": "3072"})

            if ch_name in MESSAGES:
                content = MESSAGES[ch_name][:1990]
                api("POST", f"/channels/{ch_id}/messages", {"content": content})
                print(f"    posted message in #{ch_name}")

    print("\nDone. Drag Vector bot role above Shadow Gem in Server Settings → Roles.")
    print("Restart Cursor after setting DISCORD_TOKEN in ~/.cursor/mcp.json")


if __name__ == "__main__":
    main()
