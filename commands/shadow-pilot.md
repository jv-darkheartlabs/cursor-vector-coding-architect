---
name: shadow-pilot
description: Deploy Perimeter Pilot — Hotfix under fire. Write fix default.
---

# /shadow-pilot

1. Load skill `shadow-perimeter-personas`.
2. `Full Repository Path` = active workspace.
3. Parse user message after `/shadow-pilot` as Objective.
4. Launch `subagent_type: "perimeter-pilot"` with `readonly: false` unless user said audit-only.
5. Summarize with VECTOR four-part template (match persona intensity from agent file).
