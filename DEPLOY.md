# DEPLOY.md - the deploy + release runbook

Two sites, two hosts, one tree. The docs hub deploys to **GitHub Pages** (`docs.creadev.org`); the portfolio deploys to **Cloudflare Pages** (`dhaupin.creadev.org`). Neither host reads the other half. The repo story is [`labs/prd.md`](./labs/prd.md); the per-site detail is in the two site PRDs.

**Status: P1, the docs hub has landed.** The `docs/` tree and the docs lane caller exist and build green. The `web/` portfolio tree does not exist yet; that runbook section is the target shape. The build phases land the rest (see `labs/prd.md` section 9).

## 1. The docs hub (`docs/`, GitHub Pages)

The docs half is Jekyll plus the family post-build chain: Jekyll renders, freestruct injects SEO over the rendered HTML, pagefind indexes what will ship, then the Pages artifact uploads. This is the family docs lane, owned by `dhaupin/freestruct` (`.github/workflows/docs-lane.yml`); this repo carries a thin caller that owns only the trigger, permissions, concurrency, and input pins.

The caller's pins (the family shape): `ruby-version: '3.4'`, `freestruct-version` exact (never a range), the lane referenced by a 40-hex SHA with the human tag in a comment. The lane's deploy job is gated to `main` inside the reusable workflow, so a `staging` branch never publishes.

### The docs build moves to the family lane (P1)

The repo is the GitHub user site, so `dhaupin.github.io` serves `docs.creadev.org` from `main` via the CNAME. The Pages build is currently the **legacy builder** at the repo root (`build_type: legacy`, source `main:/`, verified 2026-11-17), which runs Jekyll over the whole tree. The docs half moves to the family docs lane so the build scopes to `docs/` and gains the freestruct post-build layer plus pagefind:

1. Add the docs lane caller (`.github/workflows/docs-deploy.yml`).
2. In the repo's Pages settings, switch the build source from the legacy builder to **GitHub Actions**.
3. Keep the `CNAME` file at the repo root so the custom domain stays `docs.creadev.org`.
4. Confirm the `url`/`baseurl` in `docs/_config.yml`: `url: https://docs.creadev.org`, `baseurl:` empty (the hub is the root, not a subpath).

The GitHub Pages build and the Cloudflare Pages build are independent hosts: GitHub Pages reads `docs/`, Cloudflare Pages reads `web/`, and neither sees the other's half. There is no conflict between them.

### The docs identity

`docs/_config.yml` and `docs/freestruct.config.yml` are derived from the root `site.config.js`. The canonical scheme is https everywhere. The layout carries title and description only; freestruct owns canonical, OG, and JSON-LD as its missing-only surface.

## 2. The portfolio (`web/`, Cloudflare Pages)

The portfolio is the `web/` half, built by prestruct and served by Cloudflare Pages. There is no deploy workflow: Cloudflare Pages builds from the Git integration on push.

The Pages project contract (the family shape):

| Setting | Value |
|---|---|
| Root directory | `web` |
| Build command | `npm run build` (runs `prestruct build`) |
| Output directory | `dist` |
| Production domain | `dhaupin.creadev.org` |

The build prerenders every route into `web/dist/<route>/index.html`; healthy is the last line reading `N/N pages rendered` with N equal to the route count.

- **Do not add a `/* /index.html 200` SPA fallback.** `web/public/_redirects` explains why: every route prerenders its own HTML, and the fallback redirect-loops against CF's pretty URLs.
- **The security headers ship in the tree.** `web/public/_headers` carries the CSP, HSTS, `X-Frame-Options`, and immutable `/assets/*` caching. Tighten the CSP directives to match the portfolio's actual asset sources (fonts, any third-party fetch targets).
- **The art is generated, not hand-edited.** Icons and the OG card are produced by committed scripts from source art; the script plus the source art are the record.

## 3. The independence rule (why the two halves never collide)

The two hosts build from the same repo but never read each other's half:

- The docs lane's `paths` filter names `docs/**` (and the identity file), so a `web/**` edit never triggers a docs deploy.
- The Cloudflare Pages project builds only `web/`, so a `docs/**` edit produces an identical `web/dist` and a no-op deploy.

A change to the identity file (`site.config.js`) is a change to both halves' derived surfaces, so it is the one edit that legitimately touches both. If the family staging flow is adopted here, the docs lane caller's `paths` should name `site.config.js` too.

## 4. The staging branch (if adopted)

The family runs a **permanent `staging` integration branch**: work branches off it, PRs target it, and promotion to `main` is the only path out. This repo has not adopted it yet (open question in `labs/prd.md` section 10). The pattern, if adopted:

1. **CI covers staging as well as main**, so a red battery red-lights the integration branch before promotion.
2. **Any deploy job is gated to `main`.** The docs lane's deploy job already carries this guard inside the reusable workflow, so a caller inherits it.
3. **After every promotion, fast-forward staging to main:**
   ```bash
   git push origin origin/main:staging     # ff, non-destructive
   ```
   A merge-commit promotion puts a commit on `main` that `staging` lacks, so the two drift by one on every promotion even when the flow is followed exactly. The sync is a required step, not a repair.

## 5. Local checks before any push

```bash
# the docs half (Ruby + Jekyll). Ruby is installed system-wide on this box.
cd docs && bundle config set --local path vendor/bundle && bundle install
cd docs && bundle exec jekyll build

# the portfolio half
npm install --prefix web && npm run build --prefix web

# the family prose gates (style, language, pins) over this repo
node /path/to/coreforge/lib/gates/check-docs-style.cjs
node /path/to/coreforge/lib/gates/check-language.cjs
```

### Local docs preview without tainting the tree

Jekyll writes `_site` beside the source, so a preview build drops products in the tree. Two habits keep the tree clean:

- Pin Bundler local to the repo: `cd docs && bundle config set --local path vendor/bundle`. The `docs/vendor/` and `docs/.bundle/` paths are gitignored.
- Build from a scratch copy of `docs/` (e.g. `/tmp/docs-preview`) so `_site` lands away from the tree, and serve it under the real baseurl.

The root `.gitignore` carries the belt-and-suspenders block (`docs/.bundle/`, `docs/vendor/`, `docs/_site/`, `docs/.jekyll-cache/`, `docs/.jekyll-metadata`, `docs/pagefind*`) so an accidental in-tree build taints nothing.

## 6. What is deliberately NOT in this runbook

- **No npm release.** This repo ships no package. There is no publish ladder, no OIDC, no tarball.
- **No server work.** Both halves are static. If the portfolio wants a contact form, that is a Cloudflare Pages Function and a feature of the portfolio, not of this rig.
- **No second search engine.** Pagefind is the family search. The hub adds a surface, not an engine.
