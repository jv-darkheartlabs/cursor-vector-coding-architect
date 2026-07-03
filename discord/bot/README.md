# VECTOR Discord Bot — members use Shadow Gem in Discord

**Deploy later** after Cursor sets up the server via MCP. This bot lets members run `/vector` and `/shadow` in Discord.

## What it does

| Command | Example |
|---------|---------|
| `/vector objective:…` | Ghost fusion response |
| `/shadow persona:commander objective:…` | Any of 20 archetypes |

Responses use the same prompts as `agents/perimeter-*.md` + `vector-coding-architect.md`.

**Limits:** Advice + code blocks only — no repo access. Full fixes stay in Cursor plugin.

## Setup (when ready)

### 1. Same Discord app as MCP setup

Use the same **Application ID** and **Bot Token** from [mcp-setup.md](../mcp-setup.md), or create a dedicated member bot with fewer permissions.

### 2. Install

```bash
cd discord/bot
cp .env.example .env
# fill DISCORD_*, OPENAI_API_KEY
npm install
npm run register-commands
npm start
```

### 3. Restrict channels (recommended)

In Discord, copy channel IDs for `#logic-trace` and `#gem-support`:

```
ALLOWED_CHANNEL_IDS=123456789,987654321
```

### 4. Deploy (Render)

- **Web Service** → Node → `npm start`
- Root directory: `discord/bot`
- Env vars from `.env`
- **Note:** Discord bots need always-on process (not serverless HTTP unless using interactions webhook pattern — this bot uses Gateway/WebSocket)

Render free tier works for small communities.

## Register slash commands

After changing commands:

```bash
npm run register-commands
```

Guild commands update instantly on your server.

## Rate limiting (add later)

For production, add per-user cooldown in `index.js` before `runVector`.

## Sponsor gating (optional)

Check member roles for `@Shadow Gem` before `deferReply` — use `interaction.member.roles.cache`.

## Troubleshooting

| Issue | Fix |
|-------|-----|
| Commands not showing | Re-run `register-commands`; wait 1 min |
| 401 | Wrong token |
| Empty response | Check OPENAI_API_KEY and model name |
| Too long | Bot auto-splits at 1900 chars |
