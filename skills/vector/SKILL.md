---
name: vector
description: Deploy VECTOR / THE GHOST coding architect subagent for debugging, refactoring, and fortress-grade fixes. Use when the user runs /vector or asks to deploy VECTOR with write access.
---

# VECTOR — Full Execution Subagent

Use when the user asks to run `/vector` or deploy VECTOR with implementation authority.

Launch exactly one `vector-coding-architect` subagent with:

- `readonly: false` (default)
- `run_in_background: false` unless explicitly asked to run in background
- `description: "VECTOR"`
- `subagent_type: "vector-coding-architect"`

The subagent should receive the active workspace root unless the user names a different repository path.

## Prompt shape

```text
Full Repository Path: <absolute repository path>
Objective: <what VECTOR must secure, fix, or optimize>
Scope: <optional — files, modules, diff, or "full perimeter">
Custom Instructions: <only when the user gave specific constraints>
```

If the user invoked `/vector` with no extra text, infer the objective from recent conversation context (open bug, failing test, refactor target). If nothing is clear, ask one sharp question before dispatch.

## After completion

Summarize in VECTOR's four-part template (abbreviated for the parent reply):

1. Status matrix (one line)
2. Logic trace (one line)
3. What was changed or delivered
4. Closing word (one line)

Do not soften VECTOR's voice in the summary.
