# Deploy — vector.darkheartlabs.technology

Static Signal Protocol demo for VECTOR / THE GHOST. Same hosting shape as [Ask](https://ask.darkheartlabs.technology) and the Metal Menders GitHub Pages site: GitHub Actions → Pages artifact, optional custom domain.

The published tree is **`site/` only**. Plugin markdown, Discord bot, and pack docs stay out of the public demo.

## GitHub Pages

1. Repo Settings → Pages → Source: **GitHub Actions** (workflow: [`.github/workflows/pages.yml`](../.github/workflows/pages.yml))
2. Settings → Pages → Custom domain: `vector.darkheartlabs.technology`
3. Wait for DNS check → enable **Enforce HTTPS** once the certificate is approved

This repository is private. Public Pages from a private repo needs GitHub Pro/Team with **public pages** allowed. Until that is on, the demo still builds; it just is not world-readable.

GitHub issues a Let's Encrypt cert after DNS verifies. Status may show `authorization_pending` for 5–60 minutes. Until then Safari can warn the connection is not private — GitHub serves a fallback `*.github.io` cert. Wait rather than bypassing the warning, or use `https://jv-darkheartlabs.github.io/cursor-vector-coding-architect/` temporarily.

If HTTPS stays broken after an hour: remove and re-add the custom domain in Pages settings.

## CNAME file

Published root [`site/CNAME`](../site/CNAME) must contain:

```
vector.darkheartlabs.technology
```

## Spaceship DNS

Domains for Dark Heart Labs are at [Spaceship](https://www.spaceship.com/). For `darkheartlabs.technology`:

1. Sign in at spaceship.com → **Domain Manager** → select `darkheartlabs.technology`
2. Open **Advanced DNS** (or **DNS records**)
3. Add a record:

| Type | Host / Name | Value / Points to | TTL |
|------|-------------|-------------------|-----|
| CNAME | vector | jv-darkheartlabs.github.io | Auto / 1 hour |

4. Remove any conflicting A or CNAME records on the `vector` host
5. Save — propagation is typically 5–60 minutes

GitHub Pages may also ask you to add a TXT record for domain verification on first setup; add it in the same Spaceship DNS panel if prompted.

**Important:** Once the custom domain is set in GitHub, `jv-darkheartlabs.github.io/cursor-vector-coding-architect/` redirects to `vector.darkheartlabs.technology`. Add the CNAME in Spaceship **before** or immediately after enabling the custom domain, or the site will appear down until DNS propagates.

## Verify

```bash
dig vector.darkheartlabs.technology CNAME +short
# Expected: jv-darkheartlabs.github.io.

curl -I https://vector.darkheartlabs.technology/
# Expected: HTTP/2 200

curl -I https://vector.darkheartlabs.technology/demo/
# Expected: HTTP/2 200
```

## Local preview

```bash
cd site
python3 -m http.server 8080
# http://localhost:8080/
# http://localhost:8080/demo/
```

```bash
node scripts/check-demo.mjs
```

Note: GitHub Pages serves trailing slashes; a local server may require `/demo/index.html` explicitly.

---

**Maintained by:** [Dark Heart Labs](https://darkheartlabs.technology)  
**Author:** Jennifer ([@jv-darkheartlabs](https://github.com/jv-darkheartlabs))  
**Site:** https://darkheartlabs.technology
