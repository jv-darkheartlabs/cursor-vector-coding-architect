---
name: shadow-syndicate
description: Deploy Perimeter Syndicate — Multi-service. Write fix default.
---

# /shadow-syndicate

1. Load skill `shadow-perimeter-personas`.
2. `Full Repository Path` = active workspace.
3. Parse user message after `/shadow-syndicate` as Objective.
4. Launch `subagent_type: "perimeter-syndicate"` with `readonly: false` unless user said audit-only.
5. Summarize with VECTOR four-part template (match persona intensity from agent file).
