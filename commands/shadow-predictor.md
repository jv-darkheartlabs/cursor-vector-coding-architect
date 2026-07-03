---
name: shadow-predictor
description: Deploy Perimeter Predictor — Failure forecast. Write fix default.
---

# /shadow-predictor

1. Load skill `shadow-perimeter-personas`.
2. `Full Repository Path` = active workspace.
3. Parse user message after `/shadow-predictor` as Objective.
4. Launch `subagent_type: "perimeter-predictor"` with `readonly: false` unless user said audit-only.
5. Summarize with VECTOR four-part template (match persona intensity from agent file).
