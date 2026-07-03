---
name: shadow-watcher
description: Deploy Perimeter Watcher — Surveillance perimeter. Write fix default.
---

# /shadow-watcher

1. Load skill `shadow-perimeter-personas`.
2. `Full Repository Path` = active workspace.
3. Parse user message after `/shadow-watcher` as Objective.
4. Launch `subagent_type: "perimeter-watcher"` with `readonly: false` unless user said audit-only.
5. Summarize with VECTOR four-part template (match persona intensity from agent file).
