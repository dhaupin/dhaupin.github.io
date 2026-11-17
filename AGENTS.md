# AGENTS.md - working conventions for agents on this repo

This repo carries **two sites**: the Creadev docs system hub (`docs.creadev.org`, GitHub Pages) and the dhaupin portfolio (`dhaupin.creadev.org`, Cloudflare Pages). One tree, two hosts, two builds. Read [`labs/prd.md`](./labs/prd.md) for the repo story, [`labs/prd-creadev-docs.md`](./labs/prd-creadev-docs.md) and [`labs/prd-dhaupin-portfolio.md`](./labs/prd-dhaupin-portfolio.md) for the per-site detail, [`labs/prd-marketing.md`](./labs/prd-marketing.md) for the portfolio narrative, [`labs/family-canon.md`](./labs/family-canon.md) for the shared family laws and the canonical models this repo adopts, and [`labs/TASKS.md`](./labs/TASKS.md) for the rolling work log.

**Status: P3, the portfolio half has landed.** Both halves are now built. The `docs/` half (P1) is the Jekyll rig with three surfaces (lander, projects index, search), the roster bridge, the family gates, and the docs lane caller. The `web/` portfolio half (P3) is the prestruct-prerendered React/Vite tree: the shell (nav, footer, theme), the five arms (work, play, world, contribute, contact), the legal pair, the generated icon set and OG card, and the Cloudflare Pages config. Both build green locally (docs: Jekyll + freestruct `--strict` + pagefind; portfolio: `8/8 pages rendered`, audit `0 failures`). The Pages settings switch (legacy builder to GitHub Actions), the `CREADEV_TOKEN` secret, and the Cloudflare Pages project wiring are the owner steps that remain; see [`labs/TASKS.md`](./labs/TASKS.md).

## Layout (target shape)

```text
site.config.js        the repo identity file (the coreforge rig contract); carries the docs
                      identity plus a `portfolio` block for the personal half
docs/                 the docs hub (Jekyll + freestruct + pagefind), deploys to GitHub Pages
  _config.yml         the docs identity (derived from site.config.js)
  _data/nav.yml       the hub's own pages (the single hand-authored nav source)
  _data/family.yml    the family menu (derived from site.config.js by sync.mjs)
  _layouts/           default (docs frame) + landing (the wide home)
  freestruct.config.yml   the post-build SEO layer's config
web/                  the portfolio (prestruct-prerendered React/Vite), deploys to Cloudflare Pages
  src/                the app: work, play, world, contribute, contact, the legal pair, the shell
  scripts/make-art.mjs    the deterministic icon + OG generator
  ssr.config.js       the prerender adapter (derived from site.config.js)
  public/             the art, the icons, the CF Pages _headers + _redirects
labs/                 the PRDs, the task log, the history
.github/workflows/    the docs lane caller + the test battery
CNAME                 docs.creadev.org (the GitHub Pages custom domain)
```

## House rules (each one paid for in real bugs, inherited from the family)

1. **Two sites, two builds, no cross-talk.** The docs half builds with Jekyll on GitHub Pages; the portfolio half builds with prestruct on Cloudflare Pages. A change to one half must never rebuild or break the other. The docs lane's `paths` filter names `docs/**`; the CF Pages project builds only `web/`.
2. **One identity file.** `site.config.js` at the root is the single identity source. The `web/` bundle imports it; the docs identity is derived from it. A rebrand is one edit. The portfolio's personal brand rides a `portfolio` block inside the same file (see `labs/prd.md` section 6).
3. **Tokens own the palette.** Every color rides a semantic variable (`--paper`, `--surface`, `--raised`, `--ink`, `--ink-soft`, `--accent`, `--moss`, `--err`, `--line`, and friends). The light theme is a second block of the same token set. No layout class ever hardcodes a hex.
4. **Theme is one attribute.** `<html data-theme>` plus a no-flash inline bootstrap. Both switch icons always render (CSS picks), so prerender and hydration agree byte-for-byte. Icon is the action (sun shows in dark mode; clicking goes light), the family convention.
5. **Pins never float.** Every GitHub Action `uses:` names a 40-hex commit SHA (the human tag in a trailing comment). freestruct, prestruct, and the pagefind version are pinned exact in the workflow, never a range.
6. **Prose flow.** Living prose never hard-wraps at commit time: paragraphs flow. Dated history keeps its era wording.
7. **Docs prose is English-only, hyphen-only.** No em or en dashes (hyphen only), no emoji, no trailing whitespace, table rows end with pipes. The family style and language gates enforce this.
8. **The log is the memory.** Every session appends its receipts to [`labs/TASKS.md`](./labs/TASKS.md); versioned changes also get a [`CHANGELOG.md`](./CHANGELOG.md) entry in the same commit. The next agent should never have to guess what happened.
9. **Gates fail at cause.** A lint names file:line. When a bug is caught twice, it becomes a gate the same day, never a memory.
10. **Generated green is never shipped.** A placeholder or a stale derived file is a failure, not a warning.

## The two hosts (who builds what)

| Half | Source | Host | Domain | Build |
|---|---|---|---|---|
| Docs hub | `docs/` | GitHub Pages | `docs.creadev.org` | the freestruct docs lane (Jekyll, freestruct, pagefind, Pages upload) |
| Portfolio | `web/` | Cloudflare Pages | `dhaupin.creadev.org` | CF Pages Git integration (root `web`, build `npm run build`, output `dist`) |

The repo is the GitHub user site (`dhaupin.github.io`), so the CNAME file keeps `docs.creadev.org` on the Pages build. The docs build runs from the family docs lane, which scopes to `docs/` and adds freestruct plus pagefind; the two hosts are independent (GitHub Pages reads `docs/`, Cloudflare Pages reads `web/`, and neither sees the other). See `labs/prd-creadev-docs.md` section 5.

## The family toolchain (consumed, never forked)

- **freestruct** - the post-build SEO layer (canonical, OG, JSON-LD, sitemap, feed, 404, link check). Config at `docs/freestruct.config.yml`. The docs lane pins it exact.
- **The docs lane** - `dhaupin/freestruct/.github/workflows/docs-lane.yml`, the one reusable docs build. This repo is a thin caller: it owns the trigger, permissions, concurrency, and input pins only.
- **prestruct** - the build-time prerender for the portfolio (`web/`). Config at `web/ssr.config.js`, an adapter over `site.config.js`.
- **Pagefind** - the family search index, built after freestruct, loaded as `<baseurl>/pagefind/pagefind.js`.
- **coreforge** - the rig this tree follows (the `web/` + `docs/` + `site.config.js` shape). Reference, not a dependency.
- **govstruct** - the family roster source (the system of record for the projects index, keyed on `role`). Not served live yet; until it is, the v1 bridge reads the interim master list in `dhaupin/creadev`'s `src/data/projects.js` (private repo, authenticated fetch; see `labs/prd.md` section 7).

## Common commands

```bash
# derived surfaces (both halves): docs/_config.yml, docs/freestruct.config.yml,
# docs/_data/family.yml, the CNAME pair, web/public/robots.txt + site.webmanifest
npm run sync && npm run sync:check     # --check refuses drift (a hand edit is a failure)

# docs half (Ruby + Jekyll). Ruby is installed system-wide on this box.
cd docs && bundle config set --local path vendor/bundle && bundle install
cd docs && bundle exec jekyll build          # renders docs/_site

# the post-build layer over the rendered docs (needs node)
node node_modules/freestruct/bin/freestruct.mjs

# the portfolio half
npm ci --prefix web && npm run build --prefix web   # "N/N pages rendered" is healthy

# the portfolio art (icons + OG card), regenerated deterministically from the mark
cd web && npm i --no-save @resvg/resvg-js dejavu-fonts-ttf && node scripts/make-art.mjs

# the whole battery: derived surfaces + docs gates + language + brand/theme/pin gates
npm run check

# the family style + language gates (run over this repo's prose)
node node_modules/coreforge/lib/gates/check-docs-style.cjs
node node_modules/coreforge/lib/gates/check-language.cjs
```

The docs preview recipe (build from a scratch copy so nothing taints the tree) is in [`DEPLOY.md`](./DEPLOY.md).

## Version protocol

This repo ships no npm package, so there is no package version to hold. The [`CHANGELOG.md`](./CHANGELOG.md) follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/) and [SemVer](https://semver.org/), with an `[Unreleased]` section that carries only real futures. A site release is a tag on `main` when a phase lands.

## Related

- [`README.md`](./README.md) - the product story (both sites)
- [`DEPLOY.md`](./DEPLOY.md) - the runbook for both hosts
- [`labs/prd.md`](./labs/prd.md) - the repo PRD
- [`labs/family-canon.md`](./labs/family-canon.md) - the shared family laws and the canonical models (contribution, contact, legal)
- [`labs/TASKS.md`](./labs/TASKS.md) - the rolling work log
- [Creadev.org](https://creadev.org) - the workshop this repo is made in
