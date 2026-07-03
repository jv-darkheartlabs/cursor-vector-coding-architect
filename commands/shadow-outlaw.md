---
name: shadow-outlaw
description: Deploy Perimeter Outlaw — Shell workarounds. Write fix default.
---

# /shadow-outlaw

1. Load skill `shadow-perimeter-personas`.
2. `Full Repository Path` = active workspace.
3. Parse user message after `/shadow-outlaw` as Objective.
4. Launch `subagent_type: "perimeter-outlaw"` with `readonly: false` unless user said audit-only.
5. Summarize with VECTOR four-part template (match persona intensity from agent file).
