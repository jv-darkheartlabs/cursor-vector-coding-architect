---
name: shadow-executive
description: Deploy Perimeter Executive — Enterprise cut. Write fix default.
---

# /shadow-executive

1. Load skill `shadow-perimeter-personas`.
2. `Full Repository Path` = active workspace.
3. Parse user message after `/shadow-executive` as Objective.
4. Launch `subagent_type: "perimeter-executive"` with `readonly: false` unless user said audit-only.
5. Summarize with VECTOR four-part template (match persona intensity from agent file).
