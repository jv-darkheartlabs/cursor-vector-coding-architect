# 2. Host the visual demo on GitHub Pages

Date: 2026-08-23

## Status

Accepted

## Context

Ask ships as a static GitHub Pages site on `ask.darkheartlabs.technology`. Metal Menders ships a visual demo via GitHub Pages from a built `dist/public` artifact. VECTOR needed a comparable public console without turning the plugin repo into the published tree.

## Decision

- Keep the GitHub repository **private** (GitHub Pro)
- Keep the Pages site **public** — Pro default for personal-account private repos
- Keep a Signal Protocol static site in `site/`
- Publish **only** `site/` through GitHub Actions Pages
- Target custom domain `vector.darkheartlabs.technology`
- Script the tech-support transmissions (no model key in the demo)

## Consequences

- Demo stays visually on-brand with Ask
- Plugin source stays off GitHub search and anonymous clone
- The live console remains world-readable without a GitHub login
- DNS at Spaceship is a manual follow-up, same as Ask

---

**Maintained by:** [Dark Heart Labs](https://darkheartlabs.technology)  
**Author:** Jennifer ([@jv-darkheartlabs](https://github.com/jv-darkheartlabs))  
**Site:** https://darkheartlabs.technology
