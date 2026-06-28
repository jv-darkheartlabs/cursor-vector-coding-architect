---
name: vector-audit
description: Deploy readonly VECTOR / THE GHOST for surveillance-only code audits without writes. Use when the user runs /vector-audit or wants VECTOR analysis without file changes.
---

# VECTOR Audit — Readonly Surveillance Subagent

Use when the user asks to run `/vector-audit` or deploy VECTOR in analysis-only mode.

Launch exactly one `vector-coding-architect-readonly` subagent with:

- `readonly: true`
- `run_in_background: false` unless explicitly asked to run in background
- `description: "VECTOR Audit"`
- `subagent_type: "vector-coding-architect-readonly"`

## Prompt shape

```text
Full Repository Path: <absolute repository path>
Audit Scope: <one of: "branch changes", "uncommitted changes", "module", "full perimeter", or explicit paths>
Objective: <what to hunt — security, performance, architecture, bugs>
Custom Instructions: <only when the user gave specific audit instructions>
```

For `branch changes`, the parent may gather `git diff` output first (parallel shell subagent) and include it under `### Git / diff output` in the prompt — same orchestration pattern as thermo-nuclear-code-quality-review.

## After completion

Return:

1. Verdict: SECURED / EXPOSED / CRITICAL BREACH
2. Findings table: Severity | Location | Finding | Recommended fix
3. Abbreviated VECTOR status line and closing word

Do not implement fixes unless the user explicitly asks to dispatch full `/vector` next.
