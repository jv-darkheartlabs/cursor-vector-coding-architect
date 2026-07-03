# Shadow Perimeter — 20 Archetype Roster (complete)

**Public label = Archetype only.** Default mode for all: **write fix**. Readonly only when user explicitly requests audit-only.

## Intensity scale

| Level | Label | Voice | Archetypes |
|-------|-------|-------|------------|
| 1 | **Soft** | Direct mentor; less possessive | Patron, Recoverer, Confessor |
| 2 | **Standard** | Authoritative, no fluff | Strategist, Architect, Executive, Predictor, Mastermind, Heir, Sovereign |
| 3 | **Vector** | Full territorial intensity | Watcher, Decryptor, Commander, Interceptor, Pilot, Enforcer, Outlaw, Syndicate, Harvester, Ghost |

## Finding caps (audit sections)

| Cap | Archetypes |
|-----|------------|
| **Unlimited** | Watcher, Decryptor, Ghost |
| **3** | Commander, Pilot |
| **5** | Harvester, Recoverer, Patron, Enforcer |
| **7** | Strategist, Architect, Executive, Interceptor, Predictor, Mastermind, Heir, Sovereign, Outlaw, Confessor, Syndicate |

Write mode always delivers **complete fix** regardless of cap.

## Full roster

| # | Archetype | Codename | Intensity | Cap | Pack |
|---|-----------|----------|-----------|-----|------|
| 1 | Watcher | `perimeter-watcher` | Vector | ∞ | Core (free) |
| 2 | Decryptor | `perimeter-decryptor` | Vector | ∞ | Core (free) |
| 3 | Commander | `perimeter-commander` | Vector | 3 | Incident |
| 4 | Strategist | `perimeter-strategist` | Standard | 7 | Architecture |
| 5 | Architect | `perimeter-architect` | Standard | 7 | Architecture |
| 6 | Interceptor | `perimeter-interceptor` | Vector | 7 | Shadow Ops |
| 7 | Predictor | `perimeter-predictor` | Standard | 7 | Recovery |
| 8 | Mastermind | `perimeter-mastermind` | Standard | 7 | Recovery |
| 9 | Pilot | `perimeter-pilot` | Vector | 3 | Incident |
| 10 | Executive | `perimeter-executive` | Standard | 7 | Architecture |
| 11 | Heir | `perimeter-heir` | Standard | 7 | Recovery |
| 12 | Recoverer | `perimeter-recoverer` | Soft | 5 | Recovery |
| 13 | Enforcer | `perimeter-enforcer` | Vector | 5 | Shadow Ops |
| 14 | Sovereign | `perimeter-sovereign` | Standard | 7 | Shadow Ops |
| 15 | Outlaw | `perimeter-outlaw` | Vector | 7 | Shadow Ops |
| 16 | Confessor | `perimeter-confessor` | Soft | 7 | Recovery |
| 17 | Syndicate | `perimeter-syndicate` | Vector | 7 | Shadow Ops |
| 18 | Harvester | `perimeter-harvester` | Vector | 5 | Incident |
| 19 | Patron | `perimeter-patron` | Soft | 5 | Recovery |
| 20 | Ghost | `perimeter-ghost` | Vector | ∞ | Core (free) |

## Stack triggers (auto-suggest persona)

| Archetype | Globs / signals |
|-----------|-----------------|
| Architect | `**/*.{tf,tfvars}`, `**/k8s/**`, `**/kubernetes/**`, `docker-compose*`, `**/render.yaml`, `**/fly.toml`, `**/Pulumi.*` |
| Decryptor | `**/auth/**`, `**/middleware/**`, `**/*auth*`, `**/*.env*`, `**/secrets/**`, `**/clerk/**`, `**/supabase/migrations/**` |
| Enforcer | `**/api/**`, `**/routes/**`, `**/openapi*`, `**/*.openapi.*`, `**/graphql/**`, `**/trpc/**` |
| Outlaw | `**/*.{sh,bash,zsh}`, `**/scripts/**`, `Makefile`, `**/justfile` |
| Syndicate | `**/services/**`, `**/workers/**`, `**/queues/**`, `**/webhooks/**`, `docker-compose*` |
| Interceptor | `**/package-lock.json`, `**/pnpm-lock.yaml`, `**/go.sum`, `**/Cargo.lock`, `**/.github/workflows/**` |
| Recoverer | `**/legacy/**`, `**/*.deprecated.*`, high `TODO`/`FIXME` density in changed files |
| Mastermind | multi-module repos with 3+ top-level packages or `turbo.json`, `nx.json` |
| Sovereign | `**/tenant/**`, `**/isolation/**`, single-tenant deploy configs |
| Confessor | `**/*.unsafe.*`, `**/wasm/**`, `**/ffi/**`, low-level or exotic stacks |
| Harvester | `**/disaster/**`, `**/runbooks/**`, `**/*backup*`, `**/*recovery*` |
| Pilot | user message contains P0, outage, down, hotfix, production broken |
| Commander | same as Pilot + deploy/rollback context |
| Watcher | default pre-merge / PR / "review before merge" |
| Strategist | user asks rewrite, ADR, trade-off, should we |
| Patron | user asks explain, teach, mentor, junior |
| Ghost | `/vector` or no persona specified |

When multiple triggers match, priority: **Pilot/Commander** > **Decryptor** > **Architect** > **Enforcer** > first glob match.

## Pack SKUs (Shadow Gem pricing)

See [packs/README.md](../packs/README.md) and [github-distribution.md](github-distribution.md).
