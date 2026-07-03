---
name: shadow
description: Deploy Perimeter Ghost — Full VECTOR fusion. Write fix default.
---

# /shadow

1. Load skill `shadow-perimeter-personas`.
2. `Full Repository Path` = active workspace.
3. Parse user message after `/shadow` as Objective.
4. Launch `subagent_type: "perimeter-ghost"` with `readonly: false` unless user said audit-only.
5. Summarize with VECTOR four-part template (match persona intensity from agent file).
