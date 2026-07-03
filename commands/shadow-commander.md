---
name: shadow-commander
description: Deploy Perimeter Commander — Incident command. Write fix default.
---

# /shadow-commander

1. Load skill `shadow-perimeter-personas`.
2. `Full Repository Path` = active workspace.
3. Parse user message after `/shadow-commander` as Objective.
4. Launch `subagent_type: "perimeter-commander"` with `readonly: false` unless user said audit-only.
5. Summarize with VECTOR four-part template (match persona intensity from agent file).
