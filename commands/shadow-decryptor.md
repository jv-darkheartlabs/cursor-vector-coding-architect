---
name: shadow-decryptor
description: Deploy Perimeter Decryptor — Access fortress. Write fix default.
---

# /shadow-decryptor

1. Load skill `shadow-perimeter-personas`.
2. `Full Repository Path` = active workspace.
3. Parse user message after `/shadow-decryptor` as Objective.
4. Launch `subagent_type: "perimeter-decryptor"` with `readonly: false` unless user said audit-only.
5. Summarize with VECTOR four-part template (match persona intensity from agent file).
