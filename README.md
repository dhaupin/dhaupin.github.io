# dhaupin.github.io - two sites, one repo

One repo, two stones: the **Creadev docs system hub** and the **dhaupin portfolio**, shipped from a single tree, each to its own host.

| Site | What it is | Host | Domain |
|---|---|---|---|
| Docs system hub | The front door to the Creadev doc system: a lander, a projects index, and one search across the family | GitHub Pages | [docs.creadev.org](https://docs.creadev.org) |
| dhaupin portfolio | The personal portfolio: five arms (work, play, world, contribute, contact) plus terms and privacy | Cloudflare Pages | dhaupin.creadev.org (planned) |

The two halves share conventions and a toolchain, and they never share a build. A docs change never costs a portfolio deploy, and the reverse.

**Status: P1, the docs hub has landed.** The `docs/` tree exists and builds green: the Jekyll rig, the roster bridge, the three surfaces (lander, projects, search), the family gates, and the docs lane caller. The `web/` portfolio half has not started. See the phases in [`labs/prd.md`](./labs/prd.md) section 9.

## The two birds

The repo is the GitHub user-site repo (`dhaupin.github.io`), so it already owns the GitHub Pages slot and the `docs.creadev.org` CNAME. That slot was sitting empty, serving a blank stub. The first bird fills it: a real docs hub for the Creadev doc system, where a visitor sees the family, indexes the projects, and searches from one box.

The second bird is the portfolio. More than 25 years of building web, app, ecom, enterprise, agent, and orchestration things, and never a personal site. The family rig (`coreforge` plus `prestruct`) is already built for exactly this, and it wants a `web/` half beside a `docs/` half. A `web/` half that deploys to Cloudflare Pages gives the portfolio a home in the same tree, with no second repo to keep in sync.

## The tree

```text
dhaupin.github.io/
  site.config.js        the repo identity file (the coreforge rig contract)
  docs/                 the docs hub (Jekyll + freestruct + pagefind) -> GitHub Pages
  web/                  the portfolio (prestruct React/Vite) -> Cloudflare Pages
  labs/                 the PRDs, the task log, the history
  .github/workflows/    the docs lane caller + the test battery
  CNAME                 docs.creadev.org
```

Both halves read one identity file, `site.config.js`, so a rebrand is one edit. The portfolio's personal brand rides a `portfolio` block inside it; the docs identity is derived from the top-level fields.

## The map (with the sibling docs)

- [`labs/prd.md`](./labs/prd.md) - the repo PRD: the two sites, the two hosts, the constraints, the identity split, the phases
- [`labs/prd-creadev-docs.md`](./labs/prd-creadev-docs.md) - the docs hub PRD: the lander, the projects index, the search surface
- [`labs/prd-dhaupin-portfolio.md`](./labs/prd-dhaupin-portfolio.md) - the portfolio PRD: the five arms (work, play, world, contribute, contact), the terms and privacy pages, the art direction
- [`labs/prd-marketing.md`](./labs/prd-marketing.md) - the narrative: the thesis, the architecture story, the proof, the case studies
- [`labs/family-canon.md`](./labs/family-canon.md) - the shared family laws and the canonical models (contribution, contact, legal)
- [`AGENTS.md`](./AGENTS.md) - the agent cheat sheet: layout, house rules, commands
- [`DEPLOY.md`](./DEPLOY.md) - the runbook for both hosts
- [`CHANGELOG.md`](./CHANGELOG.md) - the versioned log
- [`labs/TASKS.md`](./labs/TASKS.md) - the rolling work log

## The family

This repo sits in the Creadev struct family and links its members:

- [Creadev.org](https://creadev.org) - the workshop
- [coreforge](https://github.com/dhaupin/coreforge) - the site rig this tree follows
- [freestruct](https://github.com/dhaupin/freestruct) - the post-build SEO layer and the shared docs lane
- [prestruct](https://github.com/dhaupin/prestruct) - the build-time prerender for the portfolio
- [govstruct](https://github.com/dhaupin/govstruct) - the family roster source (the system of record)
- [vant](https://github.com/dhaupin/vant) - the memory-first agent OS, and the docs conventions' origin

The projects index on the hub renders the marketable list from data: govstruct's roster is the system of record, and until it serves live, the interim master list is `dhaupin/creadev`'s `src/data/projects.js` (see `labs/prd.md` section 7).

## Verify before shipping

```bash
# docs half
cd docs && bundle config set --local path vendor/bundle && bundle install
cd docs && bundle exec jekyll build

# portfolio half
npm install --prefix web && npm run build --prefix web
```

The docs build is proven in CI by the freestruct docs lane; the portfolio build is proven by the Cloudflare Pages project. The gates the family runs over this repo's prose (style, language, pins) are named in [`AGENTS.md`](./AGENTS.md).