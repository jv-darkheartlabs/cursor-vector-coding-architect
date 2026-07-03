# Connect Discord MCP — so Cursor can set up your server

**Your plan:** Cursor configures channels now → members use VECTOR bot in Discord later.

This doc is **Phase 1 only** (setup). Member bot: [bot/README.md](bot/README.md).

---

## One-time: create the setup bot (10 min)

### 1. Developer Portal

1. Open https://discord.com/developers/applications
2. **New Application** → name: `The Perimeter`
3. **Bot** → **Reset Token** → copy token → save in 1Password (never commit)

### 2. Intents

**Bot** → Privileged Gateway Intents:
- ✅ Message Content Intent (needed for MCP read)
- ✅ Server Members Intent (optional — role verify)

### 3. Invite bot to your server

**OAuth2 → URL Generator**
- Scopes: `bot`, `applications.commands`
- Bot permissions (setup pass — tighten later):
  - Manage Roles
  - Manage Channels
  - Send Messages
  - Read Message History
  - Manage Messages (pin)
  - View Channels

Open URL → select your server → authorize.

### 4. Role order

Discord → Server Settings → **Roles**  
Drag **The Perimeter** (bot role) **above** `@Shadow Gem` and all pack roles.

### 5. Server ID

User Settings → Advanced → **Developer Mode** ON  
Right-click server icon → **Copy Server ID**

---

## Add MCP to Cursor (5 min)

1. Open `~/.cursor/mcp.json`
2. Merge the `discord` block from [mcp.json.example](mcp.json.example) — keep your other MCP servers
3. Replace:
   - `PASTE_BOT_TOKEN_HERE`
   - `PASTE_SERVER_ID_HERE`
4. **Restart Cursor**
5. Settings → **MCP** → confirm `discord` shows green / tools listed

---

## Tell Cursor to run setup

In Agent chat (this project open):

```
Load skill discord-perimeter-setup and configure The Perimeter Discord server:
roles, categories, channels, permissions, and pinned messages per the skill.
Invite: https://discord.gg/Rw7ZgT52gC
```

I will use Discord MCP tools to create everything from [roles-and-channels.md](roles-and-channels.md).

If a step fails, I will report the missing permission — fix role order and retry.

---

## Same bot vs separate bot?

| Approach | Setup (now) | Members (later) |
|----------|-------------|-----------------|
| **One app** (recommended) | MCP uses bot token | Deploy `discord/bot` with same token + slash commands |
| **Two apps** | Setup bot with admin perms | Member bot with minimal perms in `#logic-trace` only |

Start with **one app** — simpler. Split when you want to lock down setup bot.

---

## After Cursor finishes setup

Manual steps still required:
- [ ] Carl-bot for `#roles` reaction flair — [bot-setup.md](bot-setup.md)
- [ ] GitHub `DISCORD_WEBHOOK_URL` — [webhooks/github-announcements.md](webhooks/github-announcements.md)
- [ ] GitHub Sponsors tier text — [github-sponsors-fulfillment.md](github-sponsors-fulfillment.md)
- [ ] Deploy member VECTOR bot when ready — [bot/README.md](bot/README.md)

---

## Troubleshooting

| Error | Fix |
|-------|-----|
| MCP not listed | Restart Cursor; check `mcp.json` syntax |
| 403 Missing Access | Bot role too low — move above managed roles |
| Unknown Guild | Wrong `DISCORD_GUILD_ALLOWLIST` |
| Tools run but no changes | Bot missing Manage Channels / Manage Roles |
