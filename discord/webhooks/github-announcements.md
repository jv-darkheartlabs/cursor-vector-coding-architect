# GitHub → Discord announcements

Push release notifications to `#announcements` without hosting a bot.

---

## Step 1 — Create webhook in Discord

1. `#announcements` → Edit Channel → Integrations → **Webhooks**
2. **New Webhook** → name: `GitHub Shadow Gem`
3. Copy **Webhook URL** (keep secret — do not commit)

Store locally:

```bash
# ~/.config/shadow-gem/discord-webhook (chmod 600)
export DISCORD_WEBHOOK_ANNOUNCEMENTS="https://discord.com/api/webhooks/..."
```

---

## Step 2 — GitHub Actions workflow

Add repo secret: **Settings → Secrets → `DISCORD_WEBHOOK_URL`**

Workflow file: `.github/workflows/discord-announce.yml` (included in repo)

Triggers on:
- GitHub Release published
- Manual workflow dispatch

---

## Step 3 — Manual test

```bash
./discord/scripts/test-webhook.sh
```

Or curl:

```bash
curl -H "Content-Type: application/json" \
  -d '{"content":"📡 **Test** — The Perimeter webhook is live."}' \
  "$DISCORD_WEBHOOK_ANNOUNCEMENTS"
```

---

## Message format (releases)

```
📡 **Shadow Gem v2.0.0**

New: 20 personas, /shadow-* commands, stack triggers

→ https://github.com/jen-the-dev/cursor-vector-coding-architect/releases/tag/v2.0.0
```

---

## Security

- Rotate webhook if leaked
- Never commit webhook URL to git
- Use GitHub encrypted secrets only
