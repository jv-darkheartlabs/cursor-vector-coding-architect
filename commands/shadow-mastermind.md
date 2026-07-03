---
name: shadow-mastermind
description: Deploy Perimeter Mastermind — Multi-step refactor. Write fix default.
---

# /shadow-mastermind

1. Load skill `shadow-perimeter-personas`.
2. `Full Repository Path` = active workspace.
3. Parse user message after `/shadow-mastermind` as Objective.
4. Launch `subagent_type: "perimeter-mastermind"` with `readonly: false` unless user said audit-only.
5. Summarize with VECTOR four-part template (match persona intensity from agent file).
