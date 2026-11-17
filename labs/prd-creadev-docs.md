# PRD: the Creadev docs system hub (docs.creadev.org)

**Status:** draft v0.1 for owner review **Owner:** dhaupin **Author:** OpenHands agent, 2026-11-17 **Repo:** `dhaupin/dhaupin.github.io` **Host:** GitHub Pages (`docs.creadev.org`) **Companion PRDs:** [`prd.md`](./prd.md) (the repo story), [`prd-dhaupin-portfolio.md`](./prd-dhaupin-portfolio.md) (the portfolio)

> **Read this with [`prd.md`](./prd.md).** This PRD owns one of the repo's two sites: the docs system hub. The portfolio is the other site and lives in its own PRD. The repo story (the tree, the two hosts, the identity split) is in `prd.md`.

---

## 1. One-line pitch

**docs.creadev.org is the front door to the Creadev doc system: a lander, a projects index, and one search that reaches the whole family.** The family ships a dozen separate docs sites at `docs.creadev.org/<name>/`. The hub is the root that explains the system, indexes the projects, and gives a visitor one place to start.

---

## 2. Why it exists (the evidence)

- **The root was empty.** `docs.creadev.org` served a blank Jekyll stub titled `dhaupin.github.io` (verified 2026-11-17). A domain that hosts a dozen project docs had no front door.
- **The family is a system, not a list.** The struct family shares conventions, a docs frame, and a toolchain. A visitor landing on one project docs site has no way to see the others. The hub is the shared entry point.
- **The crosslink mesh needs a home.** The family links its members in README tables and an apps menu, generated from `govstruct`'s manifest. The hub is the natural place to render that mesh as a real page, not a table.
- **Search has a home too.** Each project docs site runs its own Pagefind index. The hub is where a visitor searches the family from one box.

---

## 3. The three surfaces

The hub ships three surfaces, plus the shared contact CTA. Each is a distinct page with a distinct job.

| Surface | Path | Job |
|---|---|---|
| The lander | `/` | Explain the docs system, point a visitor at the family and at search |
| The projects index | `/projs` | List the marketable projects from data |
| Search | `/search` | One Pagefind surface across the hub |
| The contact CTA | (in the footer of every page) | The same web-exposed, bot-hidden email and the contribute CYA the portfolio uses (see the portfolio PRD, sections 4.5 and 8.3) |

The contact CTA is the portfolio's component reused on the hub, so the email and the "open an issue, not an email" note cannot drift between the two sites.

### 3.1 The lander (`/`)

The lander is the front door. It carries: what the docs system is, a hero with the family name and voice, a short explanation of how the family's docs fit together, a grid or list of the projects, and a prominent search entry. It uses the `landing` layout (the family's wide homepage layout) so the header, theme switch, and search stay identical to every other page.

### 3.2 The projects index (`/projs`)

The projects index renders the marketable project list. Each row carries the project's name, its tagline, its status, its section (open-source, proprietary, other), and a link. Until govstruct serves its roster, the data comes from `dhaupin/creadev`'s `src/data/projects.js` (the interim master list; see `prd.md` section 7 for the bridge), the same list that renders `creadev.org/projects`. The page is generated from data, never hand-typed.

The fields a row may show, from the creadev field contract:

| Field | What a row shows |
|---|---|
| `name` | the project name |
| `tagline` | the one-liner under the name |
| `status` | a status chip (Live, Beta, In Development, Backburner, Archived) |
| `section` | the grouping (open-source leads; proprietary and other follow) |
| `url` | the live link |
| `github` | the repo link, when public |
| `npm` / `version` | an npm chip, when the package is ours |
| `tags` | the category labels |
| `image` | the preview thumbnail, when present |

Note the difference from the govstruct roster contract: the creadev file keys on `section` (open-source, proprietary, other) and carries `tagline`, `github`, and `version`; the govstruct roster keys on `role` (arm, forge, product, and so on). The hub renders the creadev shape for v1 and repoints to govstruct when its endpoint arrives (see `prd.md` section 7).

### 3.3 Search (`/search`)

Search is the family search system: Pagefind, built by the docs lane after freestruct rewrites the HTML. The hub ships the family modal search (Cmd+K) plus a dedicated search page for a visitor who wants a full page of results. The index covers the hub's own pages. Federating the per-project indexes (each project docs site has its own at `/<name>/pagefind/`) is reserved; v1 indexes the hub.

---

## 4. The rig (how the hub is built)

The hub is the `docs/` half of the coreforge rig, the same shape every family docs site runs.

| Piece | What it is |
|---|---|
| Jekyll | the static site generator (Ruby, kramdown, Rouge) |
| `docs/_layouts/default.html` | the docs frame: fixed header, slide-out sidebar, pagefind modal, theme tokens |
| `docs/_layouts/landing.html` | the wide homepage layout (nests `default`) |
| `docs/_data/nav.yml` | the single nav source the layout iterates |
| freestruct | the post-build SEO layer: canonical, OG, JSON-LD, sitemap, feed, 404, link check |
| Pagefind | the search index, built after freestruct |
| The docs lane | `dhaupin/freestruct`'s reusable workflow: Jekyll, freestruct, pagefind, Pages upload |

The build order matters and is fixed by the lane: Jekyll renders, freestruct injects over the rendered HTML, pagefind indexes what will actually ship, then the artifact uploads.

---

## 5. Deploy (GitHub Pages)

The docs half deploys to GitHub Pages through the family docs lane. The repo carries a thin caller (`.github/workflows/docs-deploy.yml`) that owns only the trigger, permissions, concurrency, and input pins; the lane owns the runbook.

Two facts shape this deploy, both verified during recon:

- **The repo is the user site.** `dhaupin.github.io` serves `docs.creadev.org` from `main` via the CNAME. The Pages build is currently the legacy builder at the repo root, which runs Jekyll over the whole tree. The docs half moves to the family docs lane so the build scopes to `docs/` and adds the freestruct post-build layer plus pagefind, neither of which the legacy builder provides. This is a P1 step.
- **The CNAME stays.** The `CNAME` file at the repo root keeps `docs.creadev.org`. The workflow build uploads the artifact; Pages serves it on the custom domain.

The GitHub Pages build and the Cloudflare Pages build are independent: GitHub Pages reads `docs/`, Cloudflare Pages reads `web/`, and neither sees the other's half. There is no conflict between them.

The lane's deploy job is gated to `main` inside the reusable workflow, so a `staging` branch (if adopted) never publishes.

---

## 6. The identity

The hub is the Creadev docs system. Its identity is the family voice: the docs frame, the family tokens (petrol default with the paint-scheme axis), the Creadev provenance row in the footer, and the maker line (`Rook @ Creadev.org`). The identity is authored in the repo's `site.config.js` (see `prd.md` section 6) and derived into `docs/_config.yml` and `docs/freestruct.config.yml`.

The hub's title, description, and canonical scheme follow the family docs convention: `url: https://docs.creadev.org`, `baseurl:` empty (the hub is the root, not a subpath), and the canonical scheme is https everywhere.

---

## 7. What the hub is not

- **Not a project docs site.** Each project keeps its own docs at `docs.creadev.org/<name>/`. The hub links to them; it does not absorb them.
- **Not the family's marketing site.** The marketing lives on `creadev.org` and each project's own landing. The hub is documentation navigation.
- **Not a second search system.** Pagefind is the one search. The hub adds a surface, not an engine.
- **Not the portfolio.** The personal portfolio is the repo's other site (`web/`), in its own PRD.

---

## 8. Phases

| Phase | Scope | Exit criterion |
|---|---|---|
| P1a | The Jekyll rig (config, layouts, nav, tokens, freestruct config) | Jekyll builds the hub locally |
| P1b | The docs lane caller | `docs.creadev.org` serves the built hub; search works |
| P2 | The projects surface (the roster bridge plus `/projs`) | `/projs` lists the family from governed data |
| P2b | The dedicated `/search` page | `/search` returns family results |

**Landed (2026-11-17):** P1a, P1b (the caller is in the tree; the Pages settings switch is the owner step), P2, and P2b all build green locally. Receipts in [`TASKS.md`](./TASKS.md).

---

## 9. Open questions (carry until decided)

- **The lander voice:** does the hub lead with "the Creadev docs system" as the head noun, or name the struct family? The two carry different audiences.
- **The projects index grouping:** one flat list, or grouped by role (`arm`, `forge`, `product`)?
- **Search federation:** when do the per-project indexes federate into the hub search?
- **The redirect handoff:** `docs.creadev.org/freestruct` and `/prestruct` currently 301 to their own subdomains via Cloudflare. Does the hub keep those, or list the projects and let the redirects stand?
