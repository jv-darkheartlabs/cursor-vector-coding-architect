# VECTOR / THE GHOST — Shadow Gem

Cursor plugin with 20 behavior-split subagent personas for deep code analysis, debugging, and refactoring.

**Live demo:** [vector.darkheartlabs.technology](https://vector.darkheartlabs.technology) · [console](https://vector.darkheartlabs.technology/demo/)  
**Tech spec:** [docs/TECH_SPEC.md](docs/TECH_SPEC.md) · **Deploy:** [docs/DEPLOY.md](docs/DEPLOY.md)

## Quick start

```bash
git clone https://github.com/jv-darkheartlabs/cursor-vector-coding-architect.git
cp -R cursor-vector-coding-architect ~/.cursor/plugins/local/vector
```

Enable the **vector** plugin in Cursor.

| Command | Persona | Best for |
|---------|---------|----------|
| `/vector` or `/shadow` | Ghost (fusion) | Default full intensity |
| `/shadow-commander` | Commander | P0 hotfix |
| `/shadow-decryptor` | Decryptor | Auth and secrets |
| `/shadow-watcher` | Watcher | Pre-merge sweep |
| `/shadow-strategist` | Strategist | Trade-offs and ADRs |
| `/shadow-architect` | Architect | Infra and scale |
| … | [20 total](skills/shadow-perimeter-personas/archetypes.md) | See archetypes doc |

**Default:** write fix on all personas. Readonly: `/vector-audit` or say audit-only.

## Discord — The Perimeter

**Join:** https://discord.gg/Rw7ZgT52gC

Community and Gem holder support. Setup guide: [discord/SETUP-CHECKLIST.md](discord/SETUP-CHECKLIST.md)

**Pay / unlock roles:** [GitHub Sponsors](https://github.com/sponsors/jv-darkheartlabs) → then `#verify-gem` with your GitHub username.

## Shadow Gem product

| SKU | Price |
|-----|-------|
| Perimeter Core (Ghost, Watcher, Decryptor) | Free |
| Thematic packs (4×) | $19 each |
| **Shadow Gem** (all 20 + commands + rules) | **$39** |

Details: [packs/README.md](packs/README.md)

## Visual demo

Static Signal Protocol console, hosted the same way as the Ask and Metal Menders demos (GitHub Pages, optional custom domain).

```bash
cd site
python3 -m http.server 8080
# http://localhost:8080/demo/
```

Pick an incident, accept or override the stack-triggered persona, deploy VECTOR. Transmissions are scripted — no API key.

## Features

- **20 archetypes** — behavior-split audit/fix priorities
- **Intensity tiers** — Soft / Standard / Vector
- **Stack triggers** — auto-suggest persona from file paths (`rules/shadow-perimeter-triggers.mdc`)
- **Finding caps** — Commander/Pilot max 3; Soft personas max 5; Watcher/Ghost unlimited

## Structure

```
agents/perimeter-*.md     # 20 subagents
commands/shadow-*.md      # 20 slash commands + /vector
skills/shadow-perimeter-personas/
packs/                    # SKU docs
rules/                    # stack triggers
site/                     # GitHub Pages demo (landing + /demo/)
```

## Response format

Every VECTOR transmission follows four sections:

1. **System status matrix** — perimeter and threat level
2. **Logic trace** — input → fault → outcome
3. **Systemic execution** — complete code or findings
4. **Closing word** — one-line sign-off

## License

MIT — commercial use encouraged via Shadow Gem purchase. See [packs/README.md](packs/README.md).

---

**Maintained by:** [Dark Heart Labs](https://darkheartlabs.technology)  
**Author:** Jennifer ([@jv-darkheartlabs](https://github.com/jv-darkheartlabs))  
**Site:** https://darkheartlabs.technology
