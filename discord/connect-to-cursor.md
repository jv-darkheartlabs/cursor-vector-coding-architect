# Connect Discord ↔ Cursor / VECTOR

There are **two different connections**. Pick based on what you want.

| Goal | What it does | Best for |
|------|----------------|----------|
| **A. Discord MCP** | *You* in Cursor can post, moderate, verify roles via chat | Running The Perimeter while coding |
| **B. Discord Bot** | *Members* invoke VECTOR in Discord channels | Product — `/shadow-commander` in `#logic-trace` |
| **C. Webhooks only** | One-way: GitHub releases → `#announcements` | Already in repo ✅ |

---

## A. Discord MCP — connect Cursor to your server

This lets the **Cursor agent** (me, when you're in the IDE) send messages, read channels, help with `#verify-gem`, post launch copy, etc.

### Step 1 — Create a Discord bot

1. https://discord.com/developers/applications → **New Application** → name: `Shadow Gem` or `The Perimeter Bot`
2. **Bot** → **Add Bot** → copy **Token** (store in password manager — never commit)
3. **Privileged Gateway Intents** → enable **Message Content Intent** (if you want read access)
4. **OAuth2 → URL Generator** → scopes: `bot`, `applications.commands` → permissions: Manage Roles, Send Messages, Read Message History, Manage Channels (or Administrator for setup only, then reduce)
5. Open generated URL → add bot to **your server** (https://discord.gg/Rw7ZgT52gC)

### Step 2 — Bot role order

Server Settings → Roles → drag bot role **above** `@Shadow Gem` and other roles it must assign.

### Step 3 — Add MCP to Cursor

Edit `~/.cursor/mcp.json` (merge with existing servers — do not remove other MCPs):

```json
{
  "mcpServers": {
    "discord": {
      "command": "npx",
      "args": ["-y", "@pasympa/discord-mcp"],
      "env": {
        "DISCORD_TOKEN": "YOUR_BOT_TOKEN_HERE",
        "DISCORD_GUILD_ALLOWLIST": "YOUR_GUILD_ID"
      }
    }
  }
}
```

**Guild ID:** Discord → Server → right-click icon → Copy Server ID (enable Developer Mode in Discord settings first).

### Step 4 — Restart Cursor

Settings → MCP → confirm **discord** tools appear (send message, list channels, etc.).

### Step 5 — Try it

In Cursor Agent chat:

> Post the launch announcement to #announcements on The Perimeter

I can then use Discord MCP tools instead of you copy-pasting.

### Alternatives

| Provider | Pros | Cons |
|----------|------|------|
| [@pasympa/discord-mcp](https://github.com/PaSympa/discord-mcp) | Full server management, npx | Bot token in env |
| [Composio Discord](https://composio.dev/toolkits/discord/framework/cursor) | OAuth, no raw token in file | Third-party, paid tiers |
| Webhook-only MCP | Simple post to one channel | No read, no roles |

---

## B. Discord Bot — members talk to VECTOR in Discord

This is a **separate app** (not Cursor). Discord users type slash commands; a server calls an LLM with your persona prompts from `agents/perimeter-*.md`.

```
Discord user  →  /shadow-commander fix my api
       ↓
Discord Bot (Node/Python, hosted on Render/Fly)
       ↓
LLM API (OpenAI / Anthropic) + VECTOR system prompt
       ↓
Reply in #logic-trace with four-part template
```

### What you need

| Piece | Options |
|-------|---------|
| Hosting | Render free tier, Fly.io, Railway (~$5/mo when active) |
| Bot library | [discord.js](https://discord.js.org/) + `@discordjs/rest` |
| LLM | OpenAI / Anthropic API key |
| Prompts | Load from this repo's `agents/perimeter-*.md` |

### Scope for v1 bot

- Slash commands: `/shadow`, `/shadow-commander`, `/shadow-watcher`, … (mirror Cursor commands)
- Allowed channels: `#logic-trace`, `#gem-support` only
- Rate limit: 5 req/user/hour on free tier
- **No** arbitrary file write — advice only in Discord; full fixes still in Cursor locally

### v2 (optional)

- Link GitHub repo → bot opens PR via GitHub API
- Sponsor-only commands in `#gem-support`
- Thread mode for long logic traces

### Not the same as Cursor

The Discord bot is an **LLM with your prompts** — it is not the full Cursor agent (no codebase tools, no terminal). Set expectations in `#rules`:

> Discord VECTOR gives guidance. For repo edits, use the Cursor plugin locally.

---

## C. Webhooks — already wired

- GitHub Release → `#announcements`: [.github/workflows/discord-announce.yml](../.github/workflows/discord-announce.yml)
- Secret: `DISCORD_WEBHOOK_URL` in GitHub repo settings
- Test: `./discord/scripts/test-webhook.sh`

One-way only — not interactive.

---

## Recommended path for The Perimeter

| Phase | Do this |
|-------|---------|
| **Now** | **A** — Discord MCP in Cursor (15 min) — you manage server from IDE |
| **Now** | **C** — webhook secret for release posts |
| **After 50 members** | **B** — custom VECTOR bot in `#logic-trace` |
| **Manual until then** | You + Carl-bot + MCP for verify/announce |

---

## Security

- Never commit `DISCORD_TOKEN` or webhook URLs
- Use `DISCORD_GUILD_ALLOWLIST` so MCP only touches your server
- Start bot with minimal permissions; expand only if needed
- Rotate token if leaked: Developer Portal → Bot → Reset Token

---

## Next step

Say which you want built:

1. **MCP only** — I add the `discord` block template to project docs (you paste token locally)
2. **VECTOR Discord bot** — I scaffold `discord/bot/` in this repo (discord.js + slash commands + persona loader)
3. **Both**
