---
name: vector-audit
description: Deploy readonly VECTOR for surveillance-only audits — no file writes.
---

# /vector-audit

Deploy **VECTOR / THE GHOST** in readonly surveillance mode (`vector-coding-architect-readonly`).

1. Load the `vector-audit` skill from this plugin.
2. Determine `Full Repository Path` from the active workspace.
3. Parse the user's message after `/vector-audit` as audit objective and scope.
4. Launch with `readonly: true`. Report findings and recommended patches only.
5. Return verdict plus findings table.

To implement fixes after an audit, the user must run `/vector` or explicitly request full execution.
