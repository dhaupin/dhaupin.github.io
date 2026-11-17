# PRD: the two-birds repo (dhaupin.github.io)

**Status:** draft v0.1 for owner review **Owner:** dhaupin **Author:** OpenHands agent, 2026-11-17 **Repo:** `dhaupin/dhaupin.github.io` **Hosts:** GitHub Pages (docs.creadev.org) + Cloudflare Pages (dhaupin.creadev.org) **Companion PRDs:** [`prd-creadev-docs.md`](./prd-creadev-docs.md) (the docs hub), [`prd-dhaupin-portfolio.md`](./prd-dhaupin-portfolio.md) (the personal portfolio)

> **Read this first.** This repo carries two sites, not one. That is the whole point of the shape and the source of every constraint below. The two companion PRDs own the per-site detail; this file owns the repo-level story: what the two sites are, how they share a tree without touching each other, and the rules that keep them from drifting.

---

## 1. One-line pitch

**One repo, two stones: the Creadev docs system hub and the dhaupin portfolio, shipped from a single tree, each to its own host.** The docs half is the front door to a family of project docs. The portfolio half is a personal site that has been owed for 25 years of work. They share conventions and a family toolchain, and they never share a build.

---

## 2. Why this shape (the two birds)

The repo is the GitHub user-site repo (`dhaupin.github.io`), so it already owns the GitHub Pages slot and the `docs.creadev.org` CNAME. That slot was sitting empty: a blank Jekyll stub served a stub page. The first bird is filling it: a real docs hub for the Creadev doc system.

The second bird is the portfolio. dhaupin has done web, app, ecom, enterprise, agent, and orchestration work for more than 25 years and has never had a personal site. The family already built the rig for exactly this (`coreforge` plus `prestruct`), and the rig wants a `web/` half beside a `docs/` half. A `web/` half that deploys to Cloudflare Pages gives the portfolio a home in the same tree, with no second repo to keep in sync.

Two sites, two hosts, one tree:

| Bird | Surface | Source | Host | Domain |
|---|---|---|---|---|
| Docs system hub | the front door to family docs | `docs/` (Jekyll + freestruct + pagefind) | GitHub Pages | `docs.creadev.org` |
| Personal portfolio | five arms (work, play, world, contribute, contact) plus terms and privacy | `web/` (coreforge + prestruct) | Cloudflare Pages | `dhaupin.creadev.org` |

The two halves deploy independently. A docs change never costs a portfolio deploy and the reverse. That independence is a requirement, not a nicety: GitHub Pages builds the `docs/` tree and Cloudflare Pages builds the `web/` tree, and neither host reads the other half.

---

## 3. The tree (target shape)

```text
dhaupin.github.io/
  site.config.js        the repo's identity file (the coreforge rig contract)
  docs/                 the docs hub: Jekyll + freestruct + pagefind
    _config.yml         the docs identity (derived from site.config.js)
    _data/nav.yml       the single nav source
    _layouts/           default (docs frame) + landing (home)
    freestruct.config.yml   the post-build SEO layer's config
  web/                  the portfolio: prestruct-prerendered React/Vite
    src/                the app (work, play, world, contribute, contact)
    ssr.config.js       the prerender adapter (derived from site.config.js)
    public/             the art, the icons, the CF Pages _headers + _redirects
  labs/                 the PRDs, the task log, the history
  .github/workflows/    the docs lane caller + the test battery
  AGENTS.md             the agent cheat sheet
  README.md             the product story
  DEPLOY.md             the runbook for both hosts
  CHANGELOG.md          the versioned log
  CNAME                 docs.creadev.org (GitHub Pages custom domain)
```

The `site.config.js` at the root is the one identity file, per the coreforge contract. Both halves read it: the `web/` bundle imports it directly, and the docs identity (`docs/_config.yml`, `docs/freestruct.config.yml`) is derived from it. A rebrand is one edit, not a hunt across two languages.

The two sites carry two identities, not one. The docs hub is the Creadev docs system (family voice, family tokens). The portfolio is personal (dhaupin's own art, own voice, own palette). This is the one place the rig's "one identity file" rule needs a decision, and the decision is in section 6.

---

## 4. The constraints that shape everything

These are the facts on the ground, verified during recon, that decide the architecture. Each one is a constraint, not a preference.

- **The repo is the GitHub Pages user site.** `dhaupin.github.io` is a user site, so its `main` branch already serves `docs.creadev.org` via the CNAME. The Pages build is currently the legacy builder (`main` at the repo root), which runs Jekyll over the whole tree. The docs half moves to the family docs lane: the workflow build scopes to `docs/` and adds the freestruct post-build layer plus pagefind, which the legacy builder does not. The two hosts never overlap: Cloudflare Pages builds the `web/` half and GitHub Pages builds the `docs/` half, and neither reads the other.
- **The family builds docs from one lane.** `dhaupin/freestruct/.github/workflows/docs-lane.yml` is the single reusable docs lane: Jekyll, the hardened pagefind install, the pinned freestruct post-build layer, the Pages artifact upload, and a deploy job gated to `main`. Every family docs site is a thin caller. This repo becomes one more caller.
- **Cloudflare Pages is the family default for a landing half.** `coreforge` ships `web/public/_headers` (CSP, HSTS, immutable asset caching) and `web/public/_redirects` (with the recorded warning never to add an SPA fallback, which redirect-loops against CF's pretty URLs). The portfolio inherits both.
- **The roster data exists but is not served.** `govstruct` renders the family roster into `apps.json`, `registry.json`, `apps-menu.html`, and a README table, but no live endpoint serves it yet (probed 2026-11-17: `docs.creadev.org/govstruct/registry.json` and `govstruct.creadev.org/registry.json` both 404). The docs hub's projects surface therefore needs a bridge, decided in section 7.
- **Pagefind is the family search system.** The family layout loads `<baseurl>/pagefind/pagefind.js` in a modal (Cmd+K), and the docs lane builds the index after freestruct rewrites the HTML. The docs hub uses it. There is no second search system.
- **The portfolio domain is a blank slate.** `dhaupin.com`, `dhaupin.dev`, `dhaupin.creadev.org`, and `dhaupin.pages.dev` all fail to resolve (probed 2026-11-17). The planned domain is `dhaupin.creadev.org`.

---

## 5. The two hosts (who builds what)

GitHub Pages owns the docs half. The docs lane builds `docs/_site` and uploads it as a Pages artifact. The CNAME file at the repo root keeps the `docs.creadev.org` custom domain. Nothing about the portfolio half is visible to this build.

Cloudflare Pages owns the portfolio half. The Pages project points at the repo with **root directory `web`**, build command `npm run build` (which runs `prestruct build`), and output directory `dist`. The Git integration watches the repo and rebuilds on push, so there is no deploy workflow for this half; the contract lives in the dashboard and in DEPLOY.md.

The two halves are independent by construction. The docs lane's `paths` filter names `docs/**` and the identity file, so a `web/**` edit never triggers a docs deploy. The Cloudflare Pages build watches the whole repo but builds only `web/`, so a `docs/**` edit produces an identical `web/dist` and a no-op deploy.

---

## 6. The identity question (two brands, one repo)

The coreforge rig assumes one site identity. This repo carries two: the Creadev docs system and the dhaupin portfolio. Three options were weighed.

| Option | What it is | Ruling |
|---|---|---|
| One identity, two skins | A single `site.config.js` names both; each half reads the fields it needs | **CHOSEN (with a split)** |
| Two identity files | `site.config.js` for docs, a second config for the portfolio | Reserve (arrives only if the two brands diverge enough to justify it) |
| Fork the rig | Two repos, one per site | REJECTED: the whole point is one tree, and the user site repo is already claimed |

The chosen shape keeps one `site.config.js` at the root as the repo identity (the docs system), and gives the portfolio its own brand block inside it: a `portfolio` object carrying the personal name, wordmark, palette, and routes. The `web/` half reads the `portfolio` block; the `docs/` half reads the top-level fields. This keeps the rig's one-file contract and gives each half its own voice.

The alternative, a second config file, is reserved. It earns its place only if the two brands diverge enough that one file reads as two. The signal to watch: if a field is read by exactly one half and duplicated for the other, that is the cue to split.

---

## 7. The roster bridge (projects data)

**The governed roster is govstruct's job.** govstruct is the family's controller layer: one manifest of members, one render surface per deployment shape, one `doctor` verb that verifies every adopter serves the same truth. Its roster is the system of record, keyed on `role` (`arm`, `forge`, `factory`, `composer`, `product`, `component`). Everything below is a bridge *to* that roster, not a replacement for it.

**Today, the master list of marketable projects lives elsewhere.** Until govstruct is built fully and serves its roster, the current full list of marketable projects is `dhaupin/creadev`'s `src/data/projects.js` (`export const projects = [...]`), which renders `creadev.org/projects`. That file is the interim master list; govstruct is where it is headed.

Two constraints on the interim source:

- **`dhaupin/creadev` is private** (VERIFIED 2026-11-17). A build-time fetch needs an authenticated token, and no public doc may link to a `creadev` source path (a visitor would 404).
- **The two rosters differ in shape, not just location.** creadev keys on `section` (open-source, proprietary, other) and carries `tagline`, `github`, and `version`; govstruct keys on `role` and carries `blurb` and `repo`. govstruct's roster is the superset: it includes internal members that never appear on a public grid.

The creadev file carries **24 projects** (VERIFIED, 2026-11-17: 21 open-source, 2 proprietary, 1 other), each with a documented field contract:

| Field | Type | Notes |
|---|---|---|
| `id` | string | unique slug |
| `name` | string | display name |
| `url` | string \| null | live site URL (null if not public) |
| `github` | string \| null | repo URL (null if private) |
| `npm` | string \| null | package name, only when the package is ours |
| `version` | string \| null | published npm version (verify against the registry, not the repo) |
| `tagline` | string | one-liner under the title |
| `description` | string | the card paragraph |
| `tags` | string[] | tech / category labels |
| `status` | string | Live, Beta, In Development, Backburner, Archived |
| `section` | string | open-source, proprietary, other |
| `image` | string \| null | preview image (a real capture, or a generated SVG) |

Four bridges were weighed.

| Bridge | What it is | Ruling |
|---|---|---|
| Build-time fetch from the creadev repo | A workflow fetches `src/data/projects.js` with an authenticated token (the repo is private) | **CHOSEN for v1** |
| Vendored snapshot of `projects.js` | A committed JSON copy with a provenance header, refreshed by an authenticated workflow | The fallback (used when the fetch cannot run) |
| Build-time fetch from govstruct | A workflow fetches the roster once govstruct serves it | Reserve (arrives with the govstruct endpoint) |
| Hand-maintain a `projects.js` | Author the roster in this repo | REJECTED: it is the exact drift the family exists to end |

The v1 bridge fetches `dhaupin/creadev`'s `src/data/projects.js` at build time (authenticated, since the repo is private) and parses the `projects` array, with a vendored fallback copy and a provenance header (source commit plus checksum) so a stale copy is visible rather than silent. The docs hub and the portfolio render the same parsed data. When govstruct serves a live endpoint, the bridge repoints to it and the creadev parse retires. Neither surface hand-types the roster.

Three honesty notes:

- **The private source stays private.** The fetch uses a token scoped to the creadev repo; the token is a workflow secret, never committed. The public output (the rendered grid) carries project names and public links only. The raw `projects.js` is never republished as a file.
- **The parse is a real dependency on the creadev file's shape.** If creadev renames a field, the build breaks loudly (a parse miss is a failure, not a silent empty grid). The family law applies: a bug caught twice becomes a gate.
- **The marketable list is not the full family.** `projects.js` is the public, marketable subset. The govstruct roster carries internal members that never appear on a public grid.

---

## 8. What this repo is not

- **Not a product repo.** It ships no npm package. It is a site repo, the same class as a personal site.
- **Not a family member with a role.** The family roles (`arm`, `forge`, `factory`, `composer`, `product`, `component`) describe tools. This repo is a surface, the docs system hub plus a portfolio.
- **Not the docs system engine.** The engine is freestruct (post-build SEO) and the docs lane. This repo consumes them, pinned, exactly as the siblings do.
- **Not a monorepo of the family.** It links to the family sites. It does not absorb them.

---

## 9. Phases

| Phase | Scope | Exit criterion |
|---|---|---|
| P0 | The labs scaffold (this PRD set, AGENTS, README, DEPLOY, CHANGELOG) | The docs exist and crosslink; the repo reads as a real repo |
| P1 | The docs hub rig (Jekyll tree, nav, tokens, freestruct config, the docs lane caller) | `docs.creadev.org` serves a real home page; search works; the docs build runs from the docs lane |
| P2 | The projects surface (the roster bridge plus the index page) | `docs.creadev.org/projs` lists the marketable projects from data |
| P3 | The portfolio shell (the `web/` half, coreforge rig, prestruct build, CF Pages project) | `dhaupin.creadev.org` serves a prerendered home |
| P4 | The portfolio art and content (the five arms, the contact model, the terms and privacy pair) | The site reads as a portfolio, not a shell |

P0 is this cut. P1 and P3 can run in parallel once P0 lands: the two halves share the tree but not the build.

---

## 10. Open questions (carry until decided)

- **Portfolio domain:** is `dhaupin.creadev.org` the final choice, or is a dedicated domain wanted (`dhaupin.com` is free as of this writing)?
- **The roster bridge timing:** does the build-time fetch arrive with a govstruct endpoint, or does the creadev parse ride longer?
- **The repo visibility (needs an owner ruling):** the owner says this repo is private, but the GitHub API reports it public (`private: false`, `visibility: public`, visible unauthenticated) and its Pages site serves HTTP 200. A GitHub Pages *user site* on a free plan requires a public repo, so "public" is likely correct and required. Confirm: is this repo public (with `creadev` the private one), or is a private-repo setup intended (which changes how Pages is served)?
- **Contact mechanism:** a form (needs a Cloudflare Pages Function) or plain links (email, GitHub, creadev)?
- **The staging branch:** the family runs a permanent `staging` integration branch. Does this repo adopt it, or stay a single-branch site repo?
