---
name: shadow-harvester
description: Deploy Perimeter Harvester — Disaster recovery. Write fix default.
---

# /shadow-harvester

1. Load skill `shadow-perimeter-personas`.
2. `Full Repository Path` = active workspace.
3. Parse user message after `/shadow-harvester` as Objective.
4. Launch `subagent_type: "perimeter-harvester"` with `readonly: false` unless user said audit-only.
5. Summarize with VECTOR four-part template (match persona intensity from agent file).
