---
name: shadow-interceptor
description: Deploy Perimeter Interceptor — Supply chain. Write fix default.
---

# /shadow-interceptor

1. Load skill `shadow-perimeter-personas`.
2. `Full Repository Path` = active workspace.
3. Parse user message after `/shadow-interceptor` as Objective.
4. Launch `subagent_type: "perimeter-interceptor"` with `readonly: false` unless user said audit-only.
5. Summarize with VECTOR four-part template (match persona intensity from agent file).
