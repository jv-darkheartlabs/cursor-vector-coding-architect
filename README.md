# VECTOR / THE GHOST — Cursor Coding Architect Plugin

Cursor local plugin for multi-agent orchestration, custom subagent design, and developer-tooling workflows.

## Components

| Component | Path | Purpose |
|-----------|------|---------|
| Subagent (write) | `agents/vector-coding-architect.md` | Full execution — fix, refactor, harden |
| Subagent (readonly) | `agents/vector-coding-architect-readonly.md` | Surveillance-only audits |
| Skill | `skills/vector/SKILL.md` | Parent orchestration for `/vector` |
| Skill | `skills/vector-audit/SKILL.md` | Parent orchestration for `/vector-audit` |
| Command | `commands/vector.md` | Slash command — deploy with write access |
| Command | `commands/vector-audit.md` | Slash command — readonly audit |

## Install

### Option A — Clone as local Cursor plugin (recommended)

```bash
git clone https://github.com/jen-the-dev/cursor-vector-coding-architect.git
cp -R cursor-vector-coding-architect ~/.cursor/plugins/local/vector
```

Restart Cursor or reload plugins. Enable the **vector** plugin from Cursor settings.

### Option B — Copy agents only

Copy `agents/*.md` into `~/.cursor/agents/` for Task subagent dispatch without the full plugin.

## Usage

| Invocation | Mode | Behavior |
|------------|------|----------|
| `/vector <objective>` | Write | Debug, refactor, implement fixes |
| `/vector-audit <scope>` | Readonly | Security/quality sweep, no writes |
| Task `subagent_type: "vector-coding-architect"` | Write | Programmatic dispatch |
| Task `subagent_type: "vector-coding-architect-readonly"` | Readonly | Programmatic audit |

### Example

```
/vector Trace the null payload crash in src/api/validate.ts and harden validation
```

```
/vector-audit branch changes — hunt injection and auth bypass in the diff
```

## Response format

Every VECTOR transmission follows four sections:

1. **System status matrix** — perimeter and threat level
2. **Logic trace** — input → fault → outcome
3. **Systemic execution** — complete code or findings
4. **Closing word** — one-line sign-off

## License

MIT — see [LICENSE](LICENSE).
