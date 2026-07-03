# GitHub distribution — lowest personal maintenance

## Model: open plugin + Shadow Gem pricing

No servers. No customer webhooks. Clone and copy.

## Shadow Gem pricing (recommended)

| SKU | Price | Contents |
|-----|-------|----------|
| Perimeter Core | **Free** | Ghost, Watcher, Decryptor, `/vector` |
| Thematic pack (×4) | **$19** each | 3–6 personas by theme — see [packs/README.md](../packs/README.md) |
| **Shadow Gem** ⭐ | **$39** one-time | All 20 personas + commands + stack rules |

**Why $39 for the Gem:** 4 packs × $19 = $76. Gem at $39 is ~49% off — strong anchor, BookTok-impulse friendly, filters tire-kickers. Floor: do not go below **$29**.

Optional later: Shadow Gem Pro $99/yr (commercial license + Discord + new archetypes).

## Fulfillment

1. Gumroad / GitHub Sponsors / Ko-fi payment
2. Customer clones public repo (or sponsor-only release tag)
3. `cp -R cursor-vector-coding-architect ~/.cursor/plugins/local/vector`

## Free vs paid

| | Free (MIT) | Shadow Gem purchase |
|---|-----------|---------------------|
| Clone repo | ✅ | ✅ |
| Personal use | ✅ | ✅ |
| All 20 agents in repo | ✅ (portfolio) | ✅ |
| Commercial client work | Honor MIT | Explicit commercial OK |

## NEVER for v1

- Per-customer GitHub App
- Comment bots on stranger repos
- Copyrighted character names in SKUs

## Release automation (optional)

One workflow on your repo only: tag push → zip `packs/shadow-gem/` for Gumroad delivery.
