---
name: shadow-recoverer
description: Deploy Perimeter Recoverer — Tech debt rehab. Write fix default.
---

# /shadow-recoverer

1. Load skill `shadow-perimeter-personas`.
2. `Full Repository Path` = active workspace.
3. Parse user message after `/shadow-recoverer` as Objective.
4. Launch `subagent_type: "perimeter-recoverer"` with `readonly: false` unless user said audit-only.
5. Summarize with VECTOR four-part template (match persona intensity from agent file).
