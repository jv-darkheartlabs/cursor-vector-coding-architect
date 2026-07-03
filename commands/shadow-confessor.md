---
name: shadow-confessor
description: Deploy Perimeter Confessor — Exotic stacks. Write fix default.
---

# /shadow-confessor

1. Load skill `shadow-perimeter-personas`.
2. `Full Repository Path` = active workspace.
3. Parse user message after `/shadow-confessor` as Objective.
4. Launch `subagent_type: "perimeter-confessor"` with `readonly: false` unless user said audit-only.
5. Summarize with VECTOR four-part template (match persona intensity from agent file).
