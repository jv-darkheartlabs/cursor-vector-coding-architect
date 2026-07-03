# Bot setup — lowest maintenance

You do **not** need a custom bot for v1. Use **Carl-bot** (free) + manual role assignment for paid tiers.

---

## Option A — Carl-bot (recommended)

1. Invite: https://docs.carl.gg/ (Carl-bot official invite)
2. Grant **Manage Roles** — Carl-bot's role must be **above** roles it assigns
3. `#roles` channel — reaction roles for **fun only** (no paywall):

```
!rr
Watcher 👁️ @Watcher
Commander ⚔️ @Commander
Ghost 👻 @Ghost
Decryptor 🔐 @Decryptor
Strategist ♟️ @Strategist
```

Create matching **cosmetic roles** with no extra channel perms.

4. **Paid roles:** assign manually in `#orders-pending` after verify — do NOT auto-assign Gem via reactions (leak risk).

---

## Option B — Discord native Community

**Server Settings → Enable Community**

- Membership screening: ON (must accept `#rules`)
- Default notifications: only `@mentions`
- Safety setup: raid protection ON for launch week

---

## Option C — Ticket tool (optional)

**Discord Tickets** or **Ticket Tool** bot — one button in `#verify-gem`:

- Button: "Open verification ticket"
- Private thread with staff
- Customer posts order ID privately

Lower spam in public #verify-gem.

---

## Mod workflow (daily — 5 min)

1. Check `#verify-gem` or ticket queue
2. Match order in Gumroad/Ko-fi dashboard
3. Right-click user → Roles → add `@Shadow Gem` (or pack role)
4. React ✅ on their message
5. Log in `#mod-log`: `user | order ID | product | date`

---

## Later automation (when >20 verifies/week)

- **Gumroad + Zapier/Make** → Discord webhook to `#orders-pending` (new sale alert)
- **Sell.app / LemonSqueezy** — built-in Discord role sync
- **Custom bot** — only when manual hurts

---

## Bot role hierarchy

```
@The Perimeter (you)
@Carl-bot (or ticket bot)
@Shadow Gem / pack roles
@Perimeter
@everyone
```

Carl-bot **must** sit above roles it assigns.

---

## Commands to disable in public channels

If using Carl-bot: restrict `!rr` to `#roles` only via channel override.

Never grant `@everyone` Manage Webhooks except staff channels.
