# labs/TASKS.md - the rolling work log

One file, appended per landing/session, newest last, with receipts (files, gates, SHAs). The house law this file serves: **the log is the memory** - the next agent should never guess what happened. Conventions live in [../AGENTS.md](../AGENTS.md); versioned product changes also get a [CHANGELOG.md](../CHANGELOG.md) entry in the same commit.

## Open asks (carry forward until landed)

- The docs hub (P1) and the portfolio half (P3) have both landed. The portfolio's open questions (art direction, play content, consent banner, the dedicated domain) are still owner decisions; see `labs/prd-dhaupin-portfolio.md` section 12.
- **The docs hub still serves from the legacy Pages builder.** The docs lane caller (`.github/workflows/docs-deploy.yml`) is in the tree, but the repo's Pages settings must switch the build source from the legacy builder to **GitHub Actions** before the lane runs (DEPLOY.md section 1). Until then `docs.creadev.org` serves the legacy build.
- **`refresh-projects.yml` needs the `CREADEV_TOKEN` repo secret** (a token scoped to the private `dhaupin/creadev`). The committed `docs/_data/projects.json` builds the hub until the secret lands; the scheduled fetch then keeps the provenance commit fresh.
- **The Cloudflare Pages project is not wired yet.** `web/` builds clean locally (`8/8 pages rendered`), but the CF Pages project (root `web`, build `npm run build`, output `dist`, domain `dhaupin.creadev.org`) is an owner step; the domain does not resolve as of 2026-11-17.
- The portfolio domain is undecided (`dhaupin.creadev.org` planned; `dhaupin.com` free). See `labs/prd-dhaupin-portfolio.md` section 12.
- The marketing headline numbers wait on a decision: the chats (a non-browsing model, so stale by construction) cite 69 packs / 9 hosts / 290 attacks / 192 tests; the verified counts (2026-11-17) are 83 packs / 25 members / 269 vant rows / 9 npm-live tools. The PRD treats the chat figures as DIRECTION and the tree counts as VERIFIED. See `labs/prd-marketing.md` sections 4 and 11.

---


### 2026-11-17 - P0: the labs scaffold (the PRD set, the repo docs, the log)

- Owner asked to stand up the `/labs` structure the family repos carry, plus the repo-level docs. This entry is the first in the file, so the repo's history starts here.
- **What landed (docs only, no build):**
  - `labs/prd.md` - the two-birds repo PRD: one repo, two sites, two hosts; the tree; the identity split (one `site.config.js` with a `portfolio` block); the roster bridge; the phases.
  - `labs/prd-creadev-docs.md` - the docs hub PRD: the lander, the projects index (`/projs`), the search surface; the Jekyll + freestruct + pagefind rig; the GitHub Pages deploy; the move to the family docs lane.
  - `labs/prd-dhaupin-portfolio.md` - the portfolio PRD: the five arms (work, play, world, contribute, contact); the contact email and CTA; the terms and privacy pages; the art direction; the coreforge + prestruct engine; the Cloudflare Pages deploy.
  - `labs/prd-marketing.md` - the portfolio narrative distilled from the owner's strategy chats: the thesis, the three-layer architecture story, the proof table (numbers tagged VERIFIED or DIRECTION), the discovery surfaces, the three case studies, the buyer and investor layer (the agent-drift pain point, the three pillars, the moat, the dogfooding proof, the governed open-source vs proprietary split, the tear-sheet, the 5-minute demo repo, the due-diligence checklist), the live proof, the voice.
  - `labs/TASKS.md` (this file), `AGENTS.md`, `README.md`, `DEPLOY.md`, `CHANGELOG.md`.
- **Recon receipts (the facts the PRDs rest on, all verified this session):**
  - Ruby installed system-wide (`/usr/bin/ruby`, 3.3.8) via apt; bundler 4.1.0 + jekyll 4.4.1. Verified with a real `bundle exec jekyll build` of the freestruct docs (36 pages). Nothing in `/tmp`.
  - Family repos checked out to `/workspace/project/`: `dhaupin.github.io` (`249ee98`), `freestruct` (`v1.4.1`), `coreforge` (`6fe5260`), `vant` (`e1e348e5`), `monoforge` (`cece41d`), `govstruct` (`bd2aa96`), `prestruct`, `packstruct`, `crashtest`, `eyestruct`, `poststruct`, `gistory`.
  - `freestruct` verified end to end: `npm install` + `node bin/freestruct.mjs` over its own docs (36 HTML files; sitemap, robots, feed, 404 generated; link check OK).
  - **Host topology (probed):** `docs.creadev.org` root is served by this repo (Pages legacy build, `main:/`, CNAME `docs.creadev.org`). Each family member is a separate Pages deployment at `docs.creadev.org/<name>/` (`vant` = `main:/docs`; `coreforge`/`govstruct` = `main:/`; `prestruct`/`crashtest` = `main:/docs`). `freestruct.creadev.org` is its own custom domain; `docs.creadev.org/freestruct` 301s to it via Cloudflare.
  - **Roster data is not served:** `docs.creadev.org/govstruct/registry.json` and `govstruct.creadev.org/registry.json` both 404 (2026-11-17). The interim master list of marketable projects is `dhaupin/creadev`'s `src/data/projects.js` (private repo; 24 projects, 21 open-source / 2 proprietary / 1 other). The `/projs` bridge (an authenticated build-time fetch of that file, with a vendored fallback, per `prd.md` section 7) is the v1 answer; govstruct remains the system of record.
  - **Portfolio domain is blank:** `dhaupin.com`, `dhaupin.dev`, `dhaupin.creadev.org`, `dhaupin.pages.dev` all fail to resolve (2026-11-17).
  - **Family search is Pagefind** (1.6.0 latest; the docs lane pins 1.5.2), loaded as `<baseurl>/pagefind/pagefind.js` in a modal, built after freestruct. The docs lane is `dhaupin/freestruct/.github/workflows/docs-lane.yml`, pinned by SHA by every caller.
- **Conventions adopted from the family (checked, not guessed):** hyphen-only prose (no em/en dashes), no emoji, no trailing whitespace, English-only committed prose, table rows end with pipes, pins never float, prose flows (no hard-wrap at commit). The style and language gates live in `coreforge`'s `lib/gates/` and `freestruct`'s `scripts/`.
- **Deliberately NOT done:** no site tree was built, no `site.config.js` was written, no workflow was added, nothing was pushed. P0 is the docs scaffold only. The build phases wait on the owner's answers to the PRD open questions.

## 2026-11-17 - the family canon pass (cherry-pick, consolidate, parity)

Surveyed the whole family (37 repos) and distilled the shared canon into [`family-canon.md`](./family-canon.md). Receipts below.

- **The five arms landed** (`labs/prd-dhaupin-portfolio.md` section 4): work, play, contributing to the world, how to get involved, contact. The contact model (the `creadev` `ObfuscatedContact` pattern, the shared CTA, the contribute CYA) and the terms and privacy pair (the `creadev` `legal.js` shape, the GA4-via-Zaraz disclosure) are specced. The narrative for arms 3 to 5 is in `labs/prd-marketing.md` section 8.
- **The family canon distilled** (`labs/family-canon.md`): the house rules, the named family laws with receipts, the voice and style law, the contribution model (canonical `vant`), the contact model (canonical `creadev`), the legal model (canonical `creadev`), and the adoption table.
- **Community-health parity measured** (GitHub community profile API, 2026-11-17): only `vant` carries the full set; `freestruct`, `packstruct`, `gistory`, `memstruct` carry `CONTRIBUTING.md`; the rest carry none. This is the gap the portfolio's arm 4 (get involved) depends on: the surfaces must exist before the pages link them. Recorded in `family-canon.md` section 4.1.
- **The canonical models read from source:** `creadev/src/components/ObfuscatedContact.jsx` (the email and phone obfuscation), `creadev/src/data/legal.js` (the terms and privacy copy and shape), `creadev/scripts/zaraz-modal-check.mjs` (the Zaraz consent modal), `vant/CONTRIBUTING.md` and `vant/docs/getting-started/contributing.md` (the contribution front door plus the canonical guide), `vant/docs/advanced/style.md` (the voice law), `coreforge/AGENTS.md` (the rig house rules), `monoforge/AGENTS.md` (the family laws), `govstruct/README.md` and `govstruct/spec/refusals.json` (the controller layer and the shared refusal vocabulary).
- **Counts verified:** `govstruct` carries 25 members (`registry.json` `memberCount`); the family npm-live roster stands (9 tools).
- **Gates:** the markdown gate (cliche linter plus cross-reference checks) ran clean over the whole tree after this pass.

---

### 2026-11-17 - P1: the docs hub lands (the rig, the roster bridge, the lane)

The owner asked to stand up the web + projects + search lander for `docs.creadev.org`. The docs half of the tree is now built end to end and green locally; nothing is pushed (see the open asks above for the owner steps that remain).

- **What landed:**
  - `site.config.js` - the repo identity, authored once (name, wordmark, tagline, description, url, maker, org, the docs identity, the theme axes, the nav vocabulary, the route table). The docs surfaces derive from it.
  - `scripts/sync.mjs` - the zero-dep generator. Writes `docs/_config.yml`, `docs/freestruct.config.yml`, and both `CNAME` copies (repo root and `docs/`, so the custom domain rides into the Pages artifact) from `site.config.js`. `--check` refuses drift.
  - `scripts/fetch-projects.mjs` - the roster bridge (`labs/prd.md` section 7). Fetches `dhaupin/creadev`'s `src/data/projects.js` at a resolved commit with an authenticated token, does a REAL ESM import (not a regex), normalizes the fields, and writes `docs/_data/projects.json` with a `_provenance` header. Refuses loudly on a missing token, a parse miss, or a duplicate id; a vendored snapshot is the offline fallback.
  - `docs/` - the Jekyll rig: `Gemfile`, `_config.yml` (generated), `freestruct.config.yml` (generated), `_layouts/default.html` (the docs frame), `_layouts/landing.html` (the wide home), `_data/nav.yml`, `_data/projects.json`, `icon.svg`, and the three surfaces (`index.md`, `projs.md`, `search.md`).
  - `scripts/build.sh` - the local pipeline: sync, fetch, Jekyll, freestruct `--strict`, pagefind. `npm run build`.
  - `.github/workflows/docs-deploy.yml` - the thin docs lane caller (the family's one lane, pinned by SHA). `.github/workflows/test.yml` - the push/PR battery. `.github/workflows/refresh-projects.yml` - the scheduled roster fetch (commits only a real change).
  - `.gitignore` - the family shape (node_modules, the Jekyll build products, and the local bundler path).

- **The three surfaces (the ask):**
  - The lander (`/`) - the front door: a hero, a "how the family's docs fit together" grid, a project chip row, and a closing band. The home title is "The front door to the family docs".
  - The projects index (`/projs`) - the marketable roster from `docs/_data/projects.json`, grouped open-source first, each row with a thumbnail, tagline, status chip, version, and Live / GitHub / npm links.
  - The search (`/search`) - one Pagefind box over the whole hub, plus the `Ctrl K` modal in the docs frame.

- **The gates (carried canonically, not forked):** the family's docs gates live in `coreforge`'s `lib/gates/` and are consumed here as a pinned devDependency (`coreforge@1.0.0`), not hand-copied - the fork is exactly the drift the family fights. `npm run check` runs `sync:check`, the frontmatter / links / style gates, and the language gate; `check-action-pins.cjs` and `check-birth-gate.cjs` guard the workflows.

- **Receipts (measured this session):**
  - Jekyll builds clean; the output tree carries `404.html`, `feed.xml`, `robots.txt`, `sitemap.xml`, `icon.svg`, `index.html`, `projs/index.html`, `search/index.html`, `CNAME`, and `pagefind/`.
  - freestruct passes `--strict` ("Link check: All links OK"); pagefind indexes 3 pages / 822 words.
  - The gates pass: `FRONTMATTER: PASS (3 pages)`, `DOCS LINKS: PASS (3 files)`, `DOCS STYLE: PASS (3 files)`, `LANGUAGE GATE: PASS`, `ACTION PINS: PASS (9 refs across 4 workflows)`, `BIRTH-GATE: PASS (3 workflows)`.
  - The roster: 24 projects (21 open-source, 2 proprietary, 1 other) at creadev commit `acffa3b`, sha256 `46e330eb...f8ccd`, fetched 2026-11-17.
  - Served locally on port 12000: HTTP 200 for `/`, `/projs/`, `/search/`, `/pagefind/pagefind.js`, `/sitemap.xml`; the search box returns live results; the header reads "creadev docs".
  - **Two real bugs the gates caught before commit:** (1) the Jekyll `vendor/` bundle path had been set INSIDE `docs/`, so the gates scanned gem READMEs as site pages (107 style issues, 51 frontmatter misses); fixed by moving the bundler path outside the repo (`bundle config set --local path`) and gitignoring it. (2) the page permalinks carried a leading slash (`/projs/`), which the family's baseurl-relative rule refuses; fixed to `projs/` and `search/` (the home keeps `/`).

- **Toolchain note:** Ruby 3.3.8 system-wide via apt, bundler 4.1.0, jekyll 4.4.1; the local bundler path is `$HOME/.cache/creadev-docs-bundle` (outside the repo). Node tools are pinned exact: `coreforge@1.0.0`, `freestruct@1.4.1`, `pagefind@1.5.2`.

- **Open asks this session leaves for the owner:**
  - The `CREADEV_TOKEN` repo secret (a token scoped to `dhaupin/creadev`) is required by `refresh-projects.yml`; the committed `docs/_data/projects.json` builds the hub until then.
  - The Pages settings must switch the build source from the legacy builder to GitHub Actions (DEPLOY.md section 1).
  - Nothing is committed or pushed; the working tree holds the whole cut.

---

### 2026-11-17 - P3: the portfolio half lands (the shell, the five arms, the legal pair, the art)

The owner asked for the web half of the two-site tree: the portfolio (`dhaupin.creadev.org`). The `web/` tree is now built end to end and green locally. Nothing is pushed; the Cloudflare Pages project wiring is the owner step that remains.

- **What landed:**
  - `site.config.js` - a new `portfolio` block (name, wordmark, tagline, description, url, repo, contact, nav, footerExtras, the eight routes with per-page meta, and the 404 copy) and a `family` list (the struct-family menu). The docs half never reads `portfolio`; the two brands cannot bleed.
  - `scripts/sync.mjs` - extended to generate `docs/_data/family.yml` (the family menu) and the web surfaces (`web/public/robots.txt`, `web/public/site.webmanifest`, and the `CNAME` from the docs host).
  - `docs/_data/nav.yml` - rewritten to carry ONLY the hub's own pages; the family links moved to the generated `family.yml` (so no brand or domain literal sits in a hand-kept data file, which the brand census gate refuses). `docs/_layouts/default.html` now iterates `site.data.nav | concat: site.data.family`.
  - `web/` - the portfolio tree: `package.json` (React 19 + Vite 8 + prestruct 1.5.1), `vite.config.js`, `ssr.config.js` (the prerender adapter over the `portfolio` block), `index.html` (the no-flash theme bootstrap), `scripts/make-art.mjs` (the deterministic icon + OG generator), and `public/` (the icon set, the OG card, the CF Pages `_headers` + `_redirects`).
  - `web/src/` - the app: `site.js`, `theme.js`, `styles.css`, `AppLayout.jsx`, `AppIslands.jsx`, `islands.js`; the components (`Nav`, `Footer`, `navItems`, `ThemeSwitch`, `SchemeSwitch`, `ContactCta`, `ObfuscatedContact`); the hook (`usePageMeta`); and the pages (`Home`, `Work`, `Play`, `World`, `Contribute`, `Contact`, `Terms`, `Privacy`, `NotFound`).
  - `.github/workflows/test.yml` - a hermetic `npm ci --prefix web` plus `npm run build --prefix web`, so a broken portfolio route red-lights on the PR, not in the CF Pages deploy.
  - `package.json` - a `lint:gates` script (brand census, theme parity, prestruct pins) folded into `npm run check`.

- **The five arms and the legal pair (the ask):**
  - `work` - the professional story: the range grid, the proof table (each number tagged VERIFIED or DIRECTION), and the three case studies (problem, contract, verification).
  - `play` - the wild half: the canvas of experiments, games, generative work, and art.
  - `world` - the give-back arm: helping developers, giving abilities to agents, consistent seams and flow, with the open-source family linked.
  - `contribute` - the participation arm: what we expect, and the invitation that you do not have to code.
  - `contact` - the hidden email (the `creadev` `ObfuscatedContact` pattern), a preference ladder (tracker, docs, email), and a care note on response times.
  - `terms` + `privacy` - the legal pair, with the privacy copy naming what the site actually does (Google Analytics 4 via Cloudflare Zaraz; no accounts, no ads, no data sold).

- **Receipts (measured this session):**
  - The portfolio builds clean: `[prerender] Done. 8/8 pages rendered.`, `[prestruct] audit: 0 failures, 0 warning(s) - clean`.
  - Served locally on port 12001: HTTP 200 for `/`, `/work/`, `/play/`, `/world/`, `/contribute/`, `/contact/`, `/terms/`, `/privacy/`, `/404.html`, `/sitemap.xml`, `/robots.txt`, `/site.webmanifest`, `/icon.svg`, `/og-image.png`. The rendered home carries the title `dhaupin - web, app, ecom, enterprise, agent, orchestration`, the canonical `https://dhaupin.creadev.org`, and the full og:image set (url, type, width, height, alt).
  - The contact email is bot-hidden: the baked HTML ships `hello [at] creadev [dot] org` and carries no `mailto:`; the browser assembles the real address after mount.
  - The gates pass: `BRAND-CENSUS: PASS (4 literal(s) - creadev docs, docs.creadev.org, github.com, creadev.org - confined to site.config.js across 22 surfaces)`, `THEME-PARITY: PASS (3 schemes, both halves)`, `PRESTRUCT PINS: PASS (2 declarations at or above ^1.3.0)`, `ACTION PINS: PASS (9 refs)`, `BIRTH-GATE: PASS (3 workflows)`.
  - The docs half still builds green with the generated family menu: `bundle exec jekyll build` renders the sidebar with the hub's own pages then the family links.

- **Art direction (a decision made in v1):** the PRD's section 6 leaves three directions open. v1 takes "family palette, personal art": the family tokens carry the palette and an authored mark (an orbit, the flow between tools) carries the personality. The mark is DRAWN by `web/scripts/make-art.mjs` (no raster source art exists yet) rather than traced; when the owner drops a real logo, the family's `adopt-icons` pipeline replaces it and this script retires. The script is deterministic (same inputs, same bytes) and needs `npm i --no-save @resvg/resvg-js dejavu-fonts-ttf` to run (the lockfile is untouched).

- **Toolchain note:** the portfolio rides the family rig's versions: React 19.3.1, Vite 8.3.8, prestruct 1.5.1, react-router-dom 7.x. `sharp` is unavailable in this environment, so the art generation uses `@resvg/resvg-js` instead (the same family approach for OG cards).

- **Open asks this session leaves for the owner:**
  - The Cloudflare Pages project (root `web`, build `npm run build`, output `dist`, domain `dhaupin.creadev.org`) is not wired; the domain does not resolve as of 2026-11-17.
  - The portfolio's PRD open questions (the dedicated domain, the tagline, the play content, the consent banner, whether a form is wanted) remain; see `labs/prd-dhaupin-portfolio.md` section 12.
  - Nothing is committed or pushed; the working tree holds the whole cut.

---
