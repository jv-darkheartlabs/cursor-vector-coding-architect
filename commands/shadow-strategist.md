---
name: shadow-strategist
description: Deploy Perimeter Strategist — Architecture strategy. Write fix default.
---

# /shadow-strategist

1. Load skill `shadow-perimeter-personas`.
2. `Full Repository Path` = active workspace.
3. Parse user message after `/shadow-strategist` as Objective.
4. Launch `subagent_type: "perimeter-strategist"` with `readonly: false` unless user said audit-only.
5. Summarize with VECTOR four-part template (match persona intensity from agent file).
