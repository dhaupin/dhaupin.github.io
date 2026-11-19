# DEPLOY.md - the deploy + release runbook

Two sites, two hosts, one tree. The docs hub deploys to **GitHub Pages** (`docs.creadev.org`); the portfolio deploys to **Cloudflare Pages** (`dhaupin.creadev.org`). Neither host reads the other half. The repo story is [`labs/prd.md`](./labs/prd.md); the per-site detail is in the two site PRDs.

**Status: P1, the docs hub has landed.** The `docs/` tree and the docs lane caller exist and build green. The `web/` portfolio tree does not exist yet; that runbook section is the target shape. The build phases land the rest (see `labs/prd.md` section 9).

## 1. The docs hub (`docs/`, GitHub Pages)

The docs half is Jekyll plus the family post-build chain: Jekyll renders, freestruct injects SEO over the rendered HTML, pagefind indexes what will ship, then the Pages artifact uploads. This is the family docs lane, owned by `dhaupin/freestruct` (`.github/workflows/docs-lane.yml`); this repo carries a thin caller that owns only the trigger, permissions, concurrency, and input pins.

The caller's pins (the family shape): `ruby-version: '3.4'`, `freestruct-version` exact (never a range), the lane referenced by a 40-hex SHA with the human tag in a comment. The lane's deploy job is gated to `main` inside the reusable workflow, so a `staging` branch never publishes.

### The docs build moves to the family lane (P1)

The repo is the GitHub user site, so `dhaupin.github.io` serves `docs.creadev.org` from `main` via the CNAME. The Pages build is currently the **legacy builder** at the repo root (`build_type: legacy`, source `main:/`, verified 2026-11-17), which runs Jekyll over the whole tree. The docs half moves to the family docs lane so the build scopes to `docs/` and gains the freestruct post-build layer plus pagefind:

1. Add the docs lane caller (`.github/workflows/docs-deploy.yml`).
2. In the repo's Pages settings, switch the build source from the legacy builder to **GitHub Actions** (Settings -> Pages -> Build and deployment -> Source: GitHub Actions).
3. Keep the `CNAME` file at the repo root so the custom domain stays `docs.creadev.org`.
4. Confirm the `url`/`baseurl` in `docs/_config.yml`: `url: https://docs.creadev.org`, `baseurl:` empty (the hub is the root, not a subpath).

**Step 2 is mandatory, and skipping it fails quietly.** Verified 2026-11-19: with `build_type: legacy` still set, `pages-build-deployment` keeps running on every `main` push and deploys **after** the lane (measured: lane 21:56:36, legacy 21:58:15), so the legacy output overwrites the correct artifact. The legacy builder runs Jekyll over the repo root, which has no `_config.yml` and no `_layouts/` - both live in `docs/` - so it falls back to `jekyll-theme-primer`. Primer supplies a `default` layout but no `landing` layout, so `/` (which asks for `landing`) ships a bare `<div>` fragment with no `<head>` and no CSS, while `/projs/` and `/search/` ship Primer chrome with none of the brand tokens. Check it with:

```bash
curl -s https://docs.creadev.org/ | head -3          # expect <!DOCTYPE html>, not <div class="lp">
curl -s https://docs.creadev.org/projs/ | grep -c 'data-theme'   # expect >0, not 0
```

The lane itself is fine: its uploaded artifact is correct every time. This is a deploy-target mismatch, not a build bug. After flipping the setting, re-run `Deploy Docs` (`workflow_dispatch`) to land the good artifact.

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
| Node version | 22 (the panel may also read `web/.nvmrc`, which says `22`) |
| Production domain | `dhaupin.creadev.org` |

The build prerenders every route into `web/dist/<route>/index.html`; healthy is the last line reading `N/N pages rendered` with N equal to the route count.

Because the root directory is `web/`, the Pages builder reads the config files **inside `web/`**, not the repo root's - the same reason vant mirrors its `.npmrc` into each Pages root. Two such files ride the tree:

- **`web/.nvmrc`** pins Node 22 (version line first). The CF v3 build image defaults to Node 22.23.4, which is already fine, but the family pins it explicitly: a builder has silently installed an EOL Node (vant, pass 338) and tripped `npm EBADENGINE`. The repo root `.nvmrc` says 22 too, for local tooling and CI.
- **`web/.npmrc`** sets `legacy-peer-deps=true`. The CF v3 image ships npm 10.9.9, and `vite` 8 declares an optional `@vitejs/devtools` peer - the shape behind the npm 10.x arborist crash (npm/cli#9787). A complete lockfile makes `npm ci` a no-op for the flag, but if the builder is ever forced to re-resolve (a stale lock), the flag turns the crash into a clean install. The repo root graph carries no such peer shape, so it needs no `.npmrc`.

- **Do not add a `/* /index.html 200` SPA fallback.** `web/public/_redirects` explains why: every route prerenders its own HTML, and the fallback redirect-loops against CF's pretty URLs.
- **The security headers ship in the tree.** `web/public/_headers` carries the CSP, HSTS, `X-Frame-Options`, and immutable `/assets/*` caching. Tighten the CSP directives to match the portfolio's actual asset sources (fonts, any third-party fetch targets).
- **The art is generated, not hand-edited.** Icons and the OG card are produced by committed scripts from source art; the script plus the source art are the record.

## 3. The independence rule (why the two halves never collide)

The two hosts build from the same repo but never read each other's half:

- The docs lane's `paths` filter names `docs/**` (and the identity file), so a `web/**` edit never triggers a docs deploy.
- The Cloudflare Pages project builds only `web/`, so a `docs/**` edit produces an identical `web/dist` and a no-op deploy.

A change to the identity file (`site.config.js`) is a change to both halves' derived surfaces, so it is the one edit that legitimately touches both. The docs lane caller's `paths` names `site.config.js` for exactly that reason (section 4).

## 4. The staging branch (adopted)

The repo runs the family's **permanent `staging` integration branch**: work branches off it, PRs target it, and promotion to `main` is the only path out. It is adopted here for one concrete reason: Cloudflare Pages builds **every branch** through its Git integration, so a push to `staging` produces a preview deployment of the portfolio at a stable staging URL before anything reaches `main` and the production domain.

1. **CI covers staging as well as main.** `test.yml` triggers on `push: [main, staging]`, so a red battery red-lights the integration branch before promotion. `docs-deploy.yml` triggers on both too, but its deploy job is gated to `main` **inside** the reusable lane (`if: github.ref == 'refs/heads/main'`), so a staging push builds and validates the docs and never publishes them.
2. **Promotion is a merge, and the sync is automatic.** `staging-ff-sync.yml` runs on every `main` push and fast-forwards `staging` to `main` (`git push origin origin/main:staging`). A merge-commit promotion puts a commit on `main` that `staging` lacks, so the two drift by one on every promotion even when the flow is followed exactly. The sync is a required step, not a repair.
3. **The sync is non-destructive and self-healing.** The refspec is fast-forward-only, so if `staging` ever holds a commit `main` does not have, the push is refused and the job fails loudly rather than rewriting history. The same workflow also listens for `delete` and recreates `staging` at `main` - because `gh pr merge --delete-branch` on a promote PR deletes the PR's head, and the head *is* `staging`.

The one step the repo cannot do for itself: **restrict deletion of `staging`** (a ruleset or branch protection) so the permanent branch cannot be removed by accident. The workflow is the belt; that setting is the suspender.

Day to day:

```bash
git switch staging && git pull --ff-only
git switch -c feat/whatever          # work branches off staging
# ...commit...
gh pr create --base staging          # PRs target staging
# promotion: PR staging -> main, merge, and the sync workflow fast-forwards staging back
```

To push a batch that is already committed locally (the first landing, for example), push staging first so the preview builds, then promote:

```bash
git push origin main:staging   # the preview build
git push origin main           # the promotion; staging-ff-sync re-mirrors staging
```

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
