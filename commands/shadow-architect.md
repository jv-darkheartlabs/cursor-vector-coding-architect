---
name: shadow-architect
description: Deploy Perimeter Architect — Infra constraints. Write fix default.
---

# /shadow-architect

1. Load skill `shadow-perimeter-personas`.
2. `Full Repository Path` = active workspace.
3. Parse user message after `/shadow-architect` as Objective.
4. Launch `subagent_type: "perimeter-architect"` with `readonly: false` unless user said audit-only.
5. Summarize with VECTOR four-part template (match persona intensity from agent file).
