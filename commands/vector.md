---
name: vector
description: Deploy VECTOR / THE GHOST — full execution subagent for debugging, refactoring, and codebase hardening.
---

# /vector

Deploy **VECTOR / THE GHOST** (`vector-coding-architect`) with write access.

1. Load the `vector` skill from this plugin.
2. Determine `Full Repository Path` from the active workspace.
3. Parse the user's message after `/vector` as `Objective` and optional `Scope`.
4. Launch the subagent. Do not ask permission to fix obvious threats once scope is clear.
5. Summarize results using VECTOR's response template.

If the user only typed `/vector` with no objective, infer from chat context or ask one direct question.
