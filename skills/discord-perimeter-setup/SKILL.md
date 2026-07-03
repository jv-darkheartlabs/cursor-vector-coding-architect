---
name: discord-perimeter-setup
description: Sets up The Perimeter Discord server via Discord MCP — roles, categories, channels, pinned messages, and permissions. Use when the user wants Cursor to configure Discord, finish server setup, or after discord MCP is connected with bot token.
disable-model-invocation: true
---

# Discord Perimeter Setup (via MCP)

Use **after** `discord` MCP is connected (`discord/mcp-setup.md` complete).

## Preconditions

- Bot token in `~/.cursor/mcp.json` with `DISCORD_GUILD_ALLOWLIST` = The Perimeter server ID
- Bot role is **above** all roles it creates/assigns
- Bot has: Manage Channels, Manage Roles, Send Messages, Read Message History, Manage Messages (pin)

If MCP tools fail with 403 → fix bot permissions/role order first.

## Setup sequence (execute in order)

### Phase 1 — Roles

Create roles (if missing), bottom to top in hierarchy:

| Role | Color (hex) | Notes |
|------|-------------|-------|
| Perimeter | `#95a5a6` | Default member |
| Recovery Circle | `#9b59b6` | Pack |
| Shadow Ops | `#27ae60` | Pack |
| Architecture Court | `#34495e` | Pack |
| Incident Dominance | `#e67e22` | Pack |
| Shadow Gem | `#8e44ad` | Paid |
| Gem Pro | `#f1c40f` | Paid optional |
| The Perimeter | `#c0392b` | Staff — user only |

Optional cosmetic (no extra perms): Watcher, Commander, Ghost, Decryptor, Strategist

### Phase 2 — Categories + channels

Create in order. Source: [roles-and-channels.md](../discord/roles-and-channels.md)

**📋 START HERE** (public)
- `#welcome`, `#rules`, `#verify-gem`, `#roles`

**📡 ANNOUNCEMENTS** — @everyone view, send OFF except staff
- `#announcements` (announcement channel if available, else text)
- `#shadow-updates`, `#booktok-clips`

**🖥 THE TERMINAL** (public)
- `#install-help`, `#logic-trace`, `#closing-word`, `#show-your-perimeter`

**🔒 GEM LOUNGE** — deny @everyone; allow @Shadow Gem, @Gem Pro, @The Perimeter
- `#gem-general`, `#gem-support`, `#gem-feature-votes`

**🔒 PACK LOUNGES** — each allows its pack role + @Shadow Gem + @Gem Pro + staff
- `#incident-ops`, `#architecture-court`, `#shadow-ops`, `#recovery-circle`

**🛡 STAFF** — staff only
- `#mod-log`, `#orders-pending`

### Phase 3 — Permissions

For each 🔒 category:
- @everyone → View Channel **Deny**
- @Shadow Gem → View **Allow** (all pack lounges + gem lounge)
- Pack-specific role → View **Allow** on matching lounge
- @The Perimeter → full access

For ANNOUNCEMENTS:
- @everyone View Allow, Send Deny
- @The Perimeter Send Allow

### Phase 4 — Messages (read files, post + pin)

| Channel | File |
|---------|------|
| `#rules` | [messages/rules.md](../discord/messages/rules.md) — **pin** |
| `#welcome` | [messages/welcome.md](../discord/messages/welcome.md) |
| `#verify-gem` | [messages/verify-gem.md](../discord/messages/verify-gem.md) — **pin** |
| `#announcements` | [messages/launch-announcement.md](../discord/messages/launch-announcement.md) |

Invite link in all messages: https://discord.gg/Rw7ZgT52gC

### Phase 5 — Verify

Post in `#mod-log`: `Setup complete — {date}`

Tell user:
1. Invite Carl-bot ([bot-setup.md](../discord/bot-setup.md))
2. Add GitHub webhook secret for releases
3. Deploy member bot later: [bot/README.md](../discord/bot/README.md)

## Member VECTOR bot (later — not this skill)

Discord MCP sets up the **server**. Members use **discord/bot** (hosted app) for `/shadow-*` in `#logic-trace`. Do not confuse the setup bot with the member bot — can be same Discord application with both Gateway + MCP, or two apps.

## NEVER

- Post bot tokens in chat or commit them
- Give @everyone Manage Webhooks
- Auto-assign paid roles via public reactions
