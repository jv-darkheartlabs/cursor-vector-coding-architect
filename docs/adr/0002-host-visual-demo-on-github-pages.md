# 2. Host the visual demo on GitHub Pages

Date: 2026-08-23

## Status

Accepted

## Context

Ask ships as a static GitHub Pages site on `ask.darkheartlabs.technology`. Metal Menders ships a visual demo via GitHub Pages from a built `dist/public` artifact. VECTOR needed a comparable public console without turning the plugin repo into the published tree.

## Decision

- Keep a Signal Protocol static site in `site/`
- Publish **only** `site/` through GitHub Actions Pages
- Target custom domain `vector.darkheartlabs.technology`
- Script the tech-support transmissions (no model key in the demo)

## Consequences

- Demo stays visually on-brand with Ask
- Plugin internals are not accidentally published
- DNS at Spaceship is a manual follow-up, same as Ask

---

**Maintained by:** [Dark Heart Labs](https://darkheartlabs.technology)  
**Author:** Jennifer ([@jv-darkheartlabs](https://github.com/jv-darkheartlabs))  
**Site:** https://darkheartlabs.technology
