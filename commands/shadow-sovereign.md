---
name: shadow-sovereign
description: Deploy Perimeter Sovereign — Tenant isolation. Write fix default.
---

# /shadow-sovereign

1. Load skill `shadow-perimeter-personas`.
2. `Full Repository Path` = active workspace.
3. Parse user message after `/shadow-sovereign` as Objective.
4. Launch `subagent_type: "perimeter-sovereign"` with `readonly: false` unless user said audit-only.
5. Summarize with VECTOR four-part template (match persona intensity from agent file).
