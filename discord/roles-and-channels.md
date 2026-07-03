# Roles & channels — copy into Discord

Create in this order: **roles first**, then **categories top-to-bottom**, then **set channel permissions**.

---

## Roles (Server Settings → Roles)

Create bottom-to-top (Discord evaluates highest role). Colors: dark red / violet / grey.

| Role | Color | Permissions (highlights) | Who gets it |
|------|-------|--------------------------|-------------|
| `@The Perimeter` | Red | Admin, Manage Roles, Manage Channels | You only |
| `@Gem Pro` | Gold | — | $99/yr manual |
| `@Shadow Gem` | Violet | — | $39 verified |
| `@Incident Dominance` | Dark orange | — | $19 pack |
| `@Architecture Court` | Blue-grey | — | $19 pack |
| `@Shadow Ops` | Green-grey | — | $19 pack |
| `@Recovery Circle` | Soft purple | — | $19 pack |
| `@Perimeter` | Grey | View public channels | Everyone on join |

**Important:** Disable “Allow members to @everyone/@here” for all except `@The Perimeter`.

Optional fun roles (self-assign via Carl-bot later): `@Watcher`, `@Commander`, `@Ghost` — no extra channel access, just flair.

---

## Categories & channels

### 📋 START HERE (public — @everyone can view)

| Channel | Type | Purpose |
|---------|------|---------|
| `#welcome` | text | Onboarding embed / welcome msg |
| `#rules` | text | Pin [rules.md](messages/rules.md) |
| `#verify-gem` | text | Order ID → role request |
| `#roles` | text | Carl-bot reaction roles (optional personas) |

### 📡 ANNOUNCEMENTS (public read, staff send)

| Channel | Type | Purpose |
|---------|------|---------|
| `#announcements` | announcement | Product + GitHub releases |
| `#shadow-updates` | text | Changelog threads |
| `#booktok-clips` | text | UGC, POV reels, logic traces |

**Permission:** `@everyone` View, Send Messages **OFF**. `@The Perimeter` Send.

### 🖥 THE TERMINAL (public community)

| Channel | Type | Purpose |
|---------|------|---------|
| `#install-help` | text | Plugin install, Cursor questions |
| `#logic-trace` | text | Share bugs / VECTOR outputs |
| `#closing-word` | text | Memes, one-liners |
| `#show-your-perimeter` | text | Screenshots, dotfiles, themes |

### 🔒 GEM LOUNGE (private)

**Category permission:** Deny `@everyone` View. Allow `@Shadow Gem`, `@Gem Pro`, `@The Perimeter`.

| Channel | Type |
|---------|------|
| `#gem-general` | text |
| `#gem-support` | text — priority help |
| `#gem-feature-votes` | forum or text |

### 🔒 PACK LOUNGES (private per pack)

**`#incident-ops`** — `@Incident Dominance`, `@Shadow Gem`, `@Gem Pro`, staff  
**`#architecture-court`** — `@Architecture Court`, `@Shadow Gem`, `@Gem Pro`, staff  
**`#shadow-ops`** — `@Shadow Ops`, `@Shadow Gem`, `@Gem Pro`, staff  
**`#recovery-circle`** — `@Recovery Circle`, `@Shadow Gem`, `@Gem Pro`, staff  

Shadow Gem buyers see **all** pack lounges.

### 🔮 GEM PRO (optional)

**`#pro-roadmap`** — `@Gem Pro`, staff only

### 🛡 STAFF (private)

**`#mod-log`**, **`#orders-pending`** — staff only

---

## Permission template (private category)

For each 🔒 category:

1. `@everyone` → View Channel **Deny**
2. `@Perimeter` → View Channel **Deny** (they need a paid role)
3. Relevant paid role(s) → View Channel **Allow**
4. `@Shadow Gem` → View Channel **Allow** (for pack lounges)
5. `@The Perimeter` → View Channel **Allow**, Manage Messages **Allow**

---

## Onboarding (Community Onboarding — optional)

Discord **Server Settings → Community → Onboarding**

Default channels for new members: `#welcome`, `#rules`, `#install-help`

Questions (suggested):
1. “What brought you here?” → BookTok / Dev / Both
2. “Have you installed Shadow Gem?” → Yes / Not yet

---

## Invite links

Create two invites:

| Invite | Channels | Use |
|--------|----------|-----|
| **Public** | All public channels | Bio, BookTok, GitHub |
| **Gem** (optional) | Same + auto-message in #verify-gem | Gumroad delivery email |

Do not use single-use invites for marketing links.
