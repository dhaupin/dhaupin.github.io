# Changelog

All notable changes to this repo will be documented in this file. This repo ships two sites (the Creadev docs system hub and the dhaupin portfolio) and no npm package, so there is no package version to hold; a site release is a tag on `main` when a phase lands. The phases are in [`labs/prd.md`](./labs/prd.md) section 9.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### 2026-11-17 - the Cloudflare Pages first-build pass (root `web`, node/npm pins, the CSP)

The Cloudflare Pages project's root directory is `web`, so the builder reads the config files inside `web/`, not the repo root's. Two files now ride there, plus a CSP correction, so the first build succeeds without a manual panel workaround.

### Added

- **`web/.nvmrc`** - pins Node `22` for the Pages build (version line first; a comments-first file is not something every builder parser survives). Satisfies vite 8 + prestruct's `^20.19 || >=22.12` floor.
- **`.nvmrc`** (repo root) - Node `22`, for local tooling and CI.
- **`web/.npmrc`** - `legacy-peer-deps=true`, the family's npm 10.x arborist guard (npm/cli#9787): the CF v3 image ships npm 10.9.9 and `vite` 8 declares an optional `@vitejs/devtools` peer, the crash shape vant hit on a Pages deploy of the same graph.

### Changed

- **`web/public/_headers`** - the CSP now allows the Cloudflare Insights beacon (`static.cloudflareinsights.com` script, `cloudflareinsights.com` connect), as every family `_headers` does, plus the GA4/Zaraz hosts the `prestruct/example` model names (`stats.g.doubleclick.net`, `www.googletagmanager.com`, `www.google.com`).
- **`DEPLOY.md`** - section 2's Pages contract gains the Node 22 row and the `web/`-scoped config-file note.
- **`AGENTS.md`** - the hosts table names Node 22 and the `web/`-scoped `.nvmrc`/`.npmrc`.

### 2026-11-17 - the portfolio half lands (P3: the shell, the five arms, the legal pair, the art)

The `web/` portfolio (`dhaupin.creadev.org`) is built: a prestruct-prerendered React/Vite tree carrying the shell (nav, footer, theme), the five arms (work, play, world, contribute, contact), the legal pair (terms, privacy), a deterministically generated icon set and OG card, and the Cloudflare Pages config. It builds green locally: `8/8 pages rendered`, audit `0 failures, 0 warning(s)`. The Cloudflare Pages project wiring is the owner step that remains (see `labs/TASKS.md`).

### Added

- **`site.config.js` `portfolio` block** - the personal identity (name `dhaupin`, wordmark, tagline, description, url, repo, contact, nav, footerExtras, the eight routes with per-page meta, and the 404 copy). The docs half never reads it, so the two brands cannot bleed.
- **`site.config.js` `family` list** - the family menu (the struct-family members plus `creadev.org` and GitHub) the docs sidebar renders. Generated into `docs/_data/family.yml`.
- **`web/`** - the portfolio tree: `package.json` (React 19 + Vite 8 + prestruct 1.5.1), `vite.config.js`, `ssr.config.js` (the prerender adapter over the `portfolio` block), `index.html` (the no-flash bootstrap), `src/` (the app, the shell, the pages), `scripts/make-art.mjs` (the deterministic icon + OG generator), and `public/` (the icon set, the OG card, the CF Pages `_headers` + `_redirects`).
- **`web/src/`** - `site.js` (the `portfolio` accessor), `theme.js` (the two axes as data), `styles.css` (the family token shell), `AppLayout.jsx`, `AppIslands.jsx`, `islands.js`, the components (`Nav`, `Footer`, `navItems`, `ThemeSwitch`, `SchemeSwitch`, `ContactCta`, `ObfuscatedContact`), the hook (`usePageMeta`), and the pages (`Home`, `Work`, `Play`, `World`, `Contribute`, `Contact`, `Terms`, `Privacy`, `NotFound`).
- **`docs/_data/family.yml`** - the generated family menu (a `nav.yml` sibling).
- **`.github/workflows/test.yml`** - two new steps: a hermetic `npm ci --prefix web` and the `prestruct build`, so a broken portfolio route red-lights on the PR, not in the Cloudflare Pages deploy.

### Changed

- **`docs/_data/nav.yml`** - rewritten to carry ONLY the hub's own pages; the family links moved to the generated `family.yml`, so no brand or domain literal lives in a hand-kept data file (the brand census gate holds that line).
- **`docs/_layouts/default.html`** - the sidebar now iterates `site.data.nav | concat: site.data.family`.
- **`scripts/sync.mjs`** - extended to generate the family menu and the web surfaces (`web/public/robots.txt`, `web/public/site.webmanifest`, and the `CNAME` from the docs host).
- **`package.json`** - a `lint:gates` script (brand census, theme parity, prestruct pins) folded into `npm run check`.
- **`.gitignore`** - the portfolio build products (`web/node_modules/`, `web/dist/`, `web/.prestruct/`).

### Verified

- The portfolio builds clean: `[prerender] Done. 8/8 pages rendered.`, `[prestruct] audit: 0 failures, 0 warning(s) - clean`.
- Served locally on port 12001: HTTP 200 for `/`, `/work/`, `/play/`, `/world/`, `/contribute/`, `/contact/`, `/terms/`, `/privacy/`, `/404.html`, `/sitemap.xml`, `/robots.txt`, `/site.webmanifest`, `/icon.svg`, `/og-image.png`.
- The contact email is bot-hidden: the baked HTML ships `hello [at] creadev [dot] org` and carries no `mailto:`; the browser assembles the real address after mount.
- The gates pass: `BRAND-CENSUS: PASS (4 literal(s) confined to site.config.js across 22 surfaces)`, `THEME-PARITY: PASS (3 schemes, both halves)`, `PRESTRUCT PINS: PASS (2 declarations at or above ^1.3.0)`, `ACTION PINS: PASS (9 refs)`, `BIRTH-GATE: PASS (3 workflows)`.
- The docs half still builds green with the generated family menu (Jekyll renders the family links in the sidebar).

### 2026-11-17 - the docs hub lands (P1: the rig, the roster bridge, the lane)

The docs half of the tree is built end to end: a Jekyll rig with three surfaces (a lander, a projects index, and one search), the roster bridge, the family gates, and the docs lane caller. The hub builds green locally; the Pages settings switch and the `CREADEV_TOKEN` secret are the owner steps that remain (see `labs/TASKS.md`).

### Added

- **`site.config.js`** - the repo identity, authored once. The docs surfaces derive from it (`scripts/sync.mjs`), so a rebrand is one edit.
- **`scripts/sync.mjs`** - the zero-dep generator: writes `docs/_config.yml`, `docs/freestruct.config.yml`, and both `CNAME` copies (repo root and `docs/`, so the custom domain rides into the Pages artifact). `--check` refuses drift.
- **`scripts/fetch-projects.mjs`** - the roster bridge (`labs/prd.md` section 7). Fetches `dhaupin/creadev`'s `src/data/projects.js` at a resolved commit with a token, imports it as a real ESM module, normalizes the fields, and writes `docs/_data/projects.json` with a `_provenance` header. Refuses loudly on a missing token, a parse miss, or a duplicate id; a vendored snapshot is the offline fallback.
- **`docs/`** - the Jekyll rig: `Gemfile`, the generated `_config.yml` and `freestruct.config.yml`, `_layouts/default.html` (the docs frame), `_layouts/landing.html` (the wide home), `_data/nav.yml`, `_data/projects.json`, `icon.svg`, and the three surfaces:
  - `index.md` - the lander (the front door: hero, the family grid, a project chip row, a closing band).
  - `projs.md` - the projects index, grouped open-source first, each row with a thumbnail, tagline, status chip, version, and Live / GitHub / npm links.
  - `search.md` - one Pagefind box over the whole hub.
- **`scripts/build.sh`** - the local pipeline: sync, fetch, Jekyll, freestruct `--strict`, pagefind. `npm run build`.
- **`.github/workflows/docs-deploy.yml`** - the thin caller of the family's one docs lane (pinned by SHA). **`.github/workflows/test.yml`** - the push/PR battery (derived surfaces, docs + language gates, action pins, birth gate, Jekyll build). **`.github/workflows/refresh-projects.yml`** - the scheduled roster fetch, committing only a real change.
- **`.gitignore`** - the family shape: node_modules, the Jekyll build products, and the local bundler path.

### Changed

- **The gates are consumed, not forked.** The docs gates (frontmatter, links, style) and the language gate live canonically in `coreforge`'s `lib/gates/` and are pinned as a devDependency (`coreforge@1.0.0`); `npm run check` runs them plus `sync:check`.

### Verified

- Jekyll builds clean; freestruct passes `--strict` ("Link check: All links OK"); pagefind indexes 3 pages / 822 words.
- Gates pass: `FRONTMATTER: PASS (3 pages)`, `DOCS LINKS: PASS (3 files)`, `DOCS STYLE: PASS (3 files)`, `LANGUAGE GATE: PASS`, `ACTION PINS: PASS (9 refs across 4 workflows)`, `BIRTH-GATE: PASS (3 workflows)`.
- The roster: 24 projects (21 open-source, 2 proprietary, 1 other) at creadev commit `acffa3b`, fetched 2026-11-17.
- Served locally: HTTP 200 for `/`, `/projs/`, `/search/`, `/pagefind/pagefind.js`, `/sitemap.xml`; the search box returns live results.
- Two bugs the gates caught before commit: the Jekyll bundle path had been set inside `docs/` (the gates scanned gem READMEs as site pages); and the page permalinks carried a leading slash (the family's baseurl-relative rule). Both fixed.

### 2026-11-17 - the family canon (cherry-picked, consolidated)

Surveyed all 37 family repos and distilled the shared laws, the community-health parity, and the canonical models for contribution, contact, and legal into one reference.

### Added

- **`labs/family-canon.md`** - the shared family reference. The house rules (coreforge), the named family laws with receipts (generated green is never shipped, the walk-exit rule, a committed pack rides the tarball, OIDC-only publishing, pins never float, named skip is honest, the staging branch, refusing not warning, zero dependencies), the voice and style law, the contribution model (canonical: `vant`), the contact model (canonical: `creadev` `ObfuscatedContact`), the legal model (canonical: `creadev` `legal.js`), and what this repo adopts from each.

### Verified

- Community-health parity measured 2026-11-17 across the family (GitHub community profile API): only `vant` carries the full set (CONTRIBUTING, CODE_OF_CONDUCT, issue templates, PR template, SECURITY, SUPPORT); `freestruct`, `packstruct`, `gistory`, and `memstruct` carry `CONTRIBUTING.md`; the rest carry none. Recorded in `labs/family-canon.md` section 4.1 as the parity gap the portfolio's arm 4 depends on.
- The family's npm-live roster, the `govstruct` member manifest (25 members, `registry.json` `memberCount`), the `spec/refusals.json` vocabulary, and the creadev source models read from the trees.

### 2026-11-17 - the marketing arms, the contact model, and the legal pair

Extended the portfolio narrative from three sections to **five arms**, grounded in the `dhaupin/creadev` source.

### Added

- **The five arms** (`labs/prd-dhaupin-portfolio.md` section 4). Arms 1 and 2 are work and play; arm 3 is **contributing to the world** (helping developers, giving abilities to agents, consistent seams and flow); arm 4 is **how to get involved** (what we expect, and the invitation that you do not have to code, imagination welcome); arm 5 is **contact**.
- **The contact model** (portfolio PRD section 4.5, marketing PRD section 8.3). A web-exposed, bot-hidden email using the creadev `ObfuscatedContact` pattern (static HTML carries a broken-up placeholder, the real `mailto:` is assembled in a `useEffect`, so only a browser that runs JS sees it); a shared contact CTA rendered everywhere; and a separate contribute CYA block pointing visitors at the repos for issues and pull requests.
- **Terms and privacy** (portfolio PRD section 5). The portfolio ships `/terms` and `/privacy` in the creadev `legal.js` shape (`{ head, blocks }`, a `legalMeta.updated` date). The privacy copy states the owner's facts: Google Analytics 4 via Cloudflare Zaraz, and little else tracked.
- **The arms 3, 4, and 5 narrative** (`labs/prd-marketing.md` section 8): the give-back story, the contributor invitation, and the contact words.
- **The shared contact CTA on the docs hub** (`labs/prd-creadev-docs.md` section 3): the same component, so the email and the contribute note cannot drift between the two sites.

### Changed

- The portfolio PRD is restructured around the five arms (was three sections); downstream sections renumbered; the route list and the phases extended to cover arms 3 to 5 and the legal pair.
- `README.md`, `AGENTS.md`, `CHANGELOG.md`, and `labs/TASKS.md` updated to the five-arm model and the new surfaces.

### Verified

- `dhaupin/creadev` model read from source: `src/components/ObfuscatedContact.jsx` (the email and phone obfuscation), `src/data/legal.js` (the terms and privacy copy and shape), `scripts/zaraz-modal-check.mjs` (the Zaraz consent modal). The privacy facts (GA4 via Zaraz, US opt-out, consent banner elsewhere) are the owner's, matching the creadev copy.

### 2026-11-17 - the labs scaffold (the two-birds repo stands up)

The repo was a blank GitHub Pages stub (a `CNAME` for `docs.creadev.org` and a one-line `README`). This cut gives it the family repo shape: the `/labs` PRD set, the task log, and the repo-level docs. Nothing is built yet; this is P0, the planning cut.

### Added

- **`labs/prd.md`** - the repo PRD. One repo, two sites, two hosts: the Creadev docs system hub (`docs.creadev.org`, GitHub Pages) and the dhaupin portfolio (`dhaupin.creadev.org`, Cloudflare Pages). Records the verified constraints (the repo is the Pages user site, the docs lane is the family's one build, the roster is not served live, the portfolio domain is a blank slate), the identity split (one `site.config.js` with a `portfolio` block), the roster bridge (govstruct is the system of record; the interim master list is `dhaupin/creadev`'s `src/data/projects.js`), and the phases.
- **`labs/prd-creadev-docs.md`** - the docs hub PRD. The three surfaces (the lander, the projects index at `/projs`, the search surface), the Jekyll plus freestruct plus pagefind rig, the GitHub Pages deploy, and the move to the family docs lane.
- **`labs/prd-dhaupin-portfolio.md`** - the portfolio PRD. The five arms (work, play, contributing to the world, how to get involved, contact), the web-exposed bot-hidden email (the creadev `ObfuscatedContact` model), the shared contact CTA and the contribute CYA, the terms and privacy pages (GA4 via Cloudflare Zaraz), the art direction and its three options, the coreforge plus prestruct engine, and the Cloudflare Pages deploy.
- **`labs/prd-marketing.md`** - the portfolio narrative, distilled from the owner's strategy chats. The thesis (a vertically integrated, self-verifying software factory), the three-layer architecture story, the proof table (every number tagged VERIFIED or DIRECTION), the discovery surfaces (the full freestruct set), the three case studies (Problem, Contract, Verification), the buyer and investor layer (the agent-drift pain point, the three pillars, the moat, the dogfooding proof, the open-source vs proprietary split from the governed roster, the tear-sheet, and the 5-minute demo repo), the live proof, and the voice. The `work` section renders from this file. The chats are treated as direction, not data: their figures are stale (the source model cannot browse), so each is re-derived from the trees or dropped.
- **`labs/TASKS.md`** - the rolling work log, opened with the P0 entry and the recon receipts (the toolchain, the checked-out repos, the host topology probes).
- **`AGENTS.md`** - the agent cheat sheet: the target layout, the ten house rules (inherited from the family), the two hosts, the family toolchain, the common commands.
- **`README.md`** - the product story for both sites, the tree, the map to the sibling docs, and the family links.
- **`DEPLOY.md`** - the runbook for both hosts: the docs lane and the move off the legacy Pages builder, the Cloudflare Pages contract, the independence rule, the staging pattern, and the local checks.

### Changed

- **`README.md`** was a one-line stub (`# dhaupin.github.io`); it is now the two-site product story.

### Recon receipts (the facts the PRDs rest on)

- Ruby installed system-wide (`/usr/bin/ruby`, 3.3.8) via apt; bundler 4.1.0 and jekyll 4.4.1. Verified with a real `bundle exec jekyll build` of the freestruct docs (36 pages).
- `freestruct` verified end to end (`node bin/freestruct.mjs`: 36 HTML files, sitemap, robots, feed, 404, link check OK).
- Host topology probed 2026-11-17: `docs.creadev.org` root is this repo's Pages build (legacy, `main:/`); each family member is a separate Pages deployment at `docs.creadev.org/<name>/`; `docs.creadev.org/freestruct` 301s to its own domain.
- Roster data probed: `docs.creadev.org/govstruct/registry.json` and `govstruct.creadev.org/registry.json` both 404. The interim master list of marketable projects is `dhaupin/creadev`'s `src/data/projects.js` (private repo): 24 projects, 21 open-source / 2 proprietary / 1 other (2026-11-17).
- Portfolio domain probed: `dhaupin.com`, `dhaupin.dev`, `dhaupin.creadev.org`, `dhaupin.pages.dev` all fail to resolve.
- Marketing counts grounded 2026-11-17: 83 public crashtest packs across 10 family repos (counted from `packs/public/*/pack.json`); vant's own ledger reads 269 rows across 21 packs; the governed roster carries 25 members; nine tools are npm-live (freestruct 1.4.1, prestruct 1.5.1, packstruct 1.1.2, crashtest 1.4.0, eyestruct 1.3.2, poststruct 1.2.0, govstruct 1.1.1, monoforge 1.2.0, coreforge 1.0.0). The chats' headline figures (69 packs / 9 hosts / 290 attacks / 192 tests) are marked OWNER-SUPPLIED in `labs/prd-marketing.md` section 4 and wait on reconciliation.
