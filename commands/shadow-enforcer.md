---
name: shadow-enforcer
description: Deploy Perimeter Enforcer — API contracts. Write fix default.
---

# /shadow-enforcer

1. Load skill `shadow-perimeter-personas`.
2. `Full Repository Path` = active workspace.
3. Parse user message after `/shadow-enforcer` as Objective.
4. Launch `subagent_type: "perimeter-enforcer"` with `readonly: false` unless user said audit-only.
5. Summarize with VECTOR four-part template (match persona intensity from agent file).
