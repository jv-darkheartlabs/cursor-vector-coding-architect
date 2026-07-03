# The Perimeter — Discord Server Setup

Complete setup for the Shadow Gem community. **~45 minutes** if you follow in order.

## Prerequisites

- Discord server with **Administrator** permission
- Server name suggestion: **The Perimeter** (or keep your existing name)
- Payment link ready (Gumroad / Ko-fi / GitHub Sponsors) for Gem role verification

## Setup checklist

| Step | Doc | Time |
|------|-----|------|
| 1 | [roles-and-channels.md](roles-and-channels.md) | 15 min |
| 2 | [messages/rules.md](messages/rules.md) → pin in #rules | 5 min |
| 3 | [messages/welcome.md](messages/welcome.md) → welcome channel + onboarding | 5 min |
| 4 | [messages/verify-gem.md](messages/verify-gem.md) → #verify-gem | 5 min |
| 5 | [bot-setup.md](bot-setup.md) — Carl-bot or native onboarding | 10 min |
| 6 | [webhooks/github-announcements.md](webhooks/github-announcements.md) | 5 min |
| 7 | Update server invite link in README + Gumroad delivery email | 2 min |

## Role → product mapping

| Discord role | Product | Channel access |
|--------------|---------|----------------|
| `@Perimeter` | Auto on join | Public channels |
| `@Shadow Gem` | $39 purchase | + `#gem-lounge`, `#gem-support` |
| `@Incident Dominance` | $19 pack | + `#incident-ops` |
| `@Architecture Court` | $19 pack | + `#architecture-court` |
| `@Shadow Ops` | $19 pack | + `#shadow-ops` |
| `@Recovery Circle` | $19 pack | + `#recovery-circle` |
| `@Gem Pro` | $99/yr (optional) | + `#gem-pro-votes` |
| `@The Perimeter` | Staff (you) | All + mod |

## Fulfillment flow (manual v1 — zero code)

1. Customer pays on Gumroad/Ko-fi
2. Auto-email includes: repo link + **Discord invite** + “open #verify-gem with order ID”
3. You (or mod) verify order → assign role in Discord
4. Member sees private channels instantly

Upgrade to Gumroad → Discord bot later when volume hurts.

## Branding quick settings

**Server settings → Profile**
- Description: `Shadow Gem — dominance-forward tech support in the terminal. 20 Cursor personas.`
- Icon: dark terminal / silhouette (512×512)

**Invite link:** Settings → Invites → create permanent link `The Perimeter`

## After setup

- Post launch message in #announcements (template in [messages/launch-announcement.md](messages/launch-announcement.md))
- Link Discord in [packs/README.md](../packs/README.md) and GitHub README
- First BookTok clip: “link in bio → Discord → `/shadow-commander`”
