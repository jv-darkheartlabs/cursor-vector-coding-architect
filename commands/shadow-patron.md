---
name: shadow-patron
description: Deploy Perimeter Patron — Mentor review. Write fix default.
---

# /shadow-patron

1. Load skill `shadow-perimeter-personas`.
2. `Full Repository Path` = active workspace.
3. Parse user message after `/shadow-patron` as Objective.
4. Launch `subagent_type: "perimeter-patron"` with `readonly: false` unless user said audit-only.
5. Summarize with VECTOR four-part template (match persona intensity from agent file).
