# PRD: the dhaupin portfolio (dhaupin.creadev.org)

**Status:** draft v0.1 for owner review **Owner:** dhaupin **Author:** OpenHands agent, 2026-11-17 **Repo:** `dhaupin/dhaupin.github.io` **Host:** Cloudflare Pages (`dhaupin.creadev.org`) **Companion PRDs:** [`prd.md`](./prd.md) (the repo story), [`prd-creadev-docs.md`](./prd-creadev-docs.md) (the docs hub), [`prd-marketing.md`](./prd-marketing.md) (the narrative this site renders)

> **Read this with [`prd.md`](./prd.md).** This PRD owns the repo's second site: the personal portfolio. The docs hub is the other site and lives in its own PRD.

---

## 1. One-line pitch

**dhaupin.creadev.org is the portfolio dhaupin never built: a wild, art-led personal site with five arms (work, play, contributing to the world, how to get involved, contact), built on the family rig and shipped to Cloudflare Pages.** More than 25 years of building web, app, ecom, enterprise, agent, and orchestration things, finally on one page.

---

## 2. Why it exists (the evidence)

- **25 years, no portfolio.** dhaupin has shipped for a quarter century across web, app, ecommerce, enterprise, agent, and orchestration work and has never had a personal site. The GitHub bio carries the whole story in one line, which is a resume problem.
- **The rig is already built for this.** `coreforge` is the site shell the family ships sites from: a landing rig (prestruct-prerendered React/Vite), a docs rig (Jekyll), the theme system, the islands engine, and the CI plumbing. The portfolio is a `web/` half, the exact shape the rig stamps.
- **Cloudflare Pages is the family default for landings.** The rig ships the CF Pages `_headers` (CSP, HSTS, immutable asset caching) and `_redirects`. The portfolio inherits a hardened host config for free.
- **The work is real and linkable.** The family roster (vant, synmergia, crashtest, freestruct, prestruct, coreforge, and the rest) is a portfolio in itself. The personal site is where it is told as a story, not a table.

---

## 3. The audience

Two readers, in order:

1. **A prospective client or collaborator** who wants to know what dhaupin builds and whether to reach out. They want the work, the range, and a way to make contact. Fast.
2. **A peer or curious visitor** who wants the personal layer: the play, the experiments, the art, the things built for the joy of it. They want the wild half.

The site serves the first reader first (work and contact are legible without scrolling through art), and rewards the second (the play section and the art carry the personality). Neither reader is made to wade through the other.

---

## 4. The five arms

The portfolio's marketing content is organised as **arms**: each is a distinct job the site does for a reader. The owner named five. Each is a route, prerendered to its own static HTML. Arms 1 and 2 are the professional and personal halves; arms 3, 4, and 5 are the give-back, the invitation, and the door.

### 4.1 Arm 1: work (`/work`)

The professional story. What dhaupin builds, the range (web, app, ecom, enterprise, agent, orchestration), and the proof. This is the legible half: a visitor who only reads this section still understands the offer.

Shape: a short lede, a range or services grid, a selected-work list (client work plus the open-source family), and a path to contact. The Creadev.org services vocabulary (web and app development, back end and infrastructure, IT contracting, SEO and performance, tools and automation, migrations and rescues, AI and agent engineering) is the honest source for the range.

The content of this section is authored in [`prd-marketing.md`](./prd-marketing.md): the thesis, the three-layer architecture story, the proof table, and the case studies. This PRD owns the section's shape; the marketing PRD owns its words.

### 4.2 Arm 2: play (`/play`)

The wild half. Experiments, games, art, and things built for the joy of it. This is where the site earns the word "art based."

Shape: open, by owner direction. Candidates: the game and world-building work (synmergia), the generative and steganographic experiments (stegoframe), the art packs and visual work, and whatever the owner wants to show. The section is a canvas, not a list.

### 4.3 Arm 3: contributing to the world (`/world`)

The give-back arm: **helping developers, giving abilities to agents, making consistent seams and flow.** This is the open-source family as a public good, not a sales channel.

What it covers:

- **Helping developers.** The tools exist to make an engineer's day better: deterministic gates, honest verdicts, less glue code.
- **Giving abilities to agents.** The agent-facing work (vant's memory over MCP, the `this` ROM spec, memstruct's interchange) is about what an agent can *do* once it has memory and contracts.
- **Consistent seams and flow.** The family's actual thesis turned outward: the joins between tools should be predictable, the flow from build to ship should not leak.

Shape: a short, warm section (not a feature list) that states the intent and links the open-source projects. It pairs with the proof in `prd-marketing.md` but leads with generosity, not metrics.

### 4.4 Arm 4: how to get involved (`/contribute`)

The participation arm: **what we expect from contributors, and the invitation that you do not have to code.** Imagination is welcome. This is the community door.

What it covers:

- **What we expect.** Honest, plain expectations: read the repo's `AGENTS.md`, keep the house rules (hyphen-only prose, no emoji, receipts over vibes), open an issue before a large pull request, expect a refusal to be named rather than generic.
- **You do not have to code.** The explicit invitation: ideas, bug reports, docs fixes, translations, art, testing, and use-cases are contributions. Imagination is the entry.
- **How to start.** A short path: find a repo, read its contributing notes, open an issue, or open a pull request.

Shape: a welcoming section with a short "what we expect" list and a longer "ways to help" list. The tone is inviting, not gatekeeping.

### 4.5 Arm 5: contact (`/contact`)

How to reach dhaupin, and the contact call-to-action used everywhere else on the site. Three parts:

**A web-exposed email, hidden from bots.** The contact page carries a real `mailto:` that a browser reveals and a scraper never reads. This is the `dhaupin/creadev` model exactly (`src/components/ObfuscatedContact.jsx`): the static HTML ships a broken-up placeholder (`hello [at] creadev [dot] org`), and the real `mailto:` href plus the readable address are assembled in a `useEffect`, so only a browser that runs JS ever sees them. A crawler that reads the baked HTML gets no machine-readable address. The portfolio reuses this pattern, not a new one, so the contact page and the footer cannot drift.

**A contact call-to-action used everywhere.** The same block (a short line plus the email link) is the shared CTA: the footer, the `work` page, the `play` page, and the docs hub all render it from one component. One source, many placements.

**A separate CYA (cover-your-ass) block on how to contribute issues and pull requests.** Below the contact CTA, a short honest note points a visitor at the repos: open an issue for a bug or an idea, open a pull request for a change, and here is what to expect. This is the "don't email me a bug that belongs in the tracker" block, phrased plainly. It is separate from the contact CTA so the CTA stays clean and the contribution guidance stays findable.

Shape and rulings:

| Shape | What it is | Ruling |
|---|---|---|
| The hidden email | the creadev `ObfuscatedContact` pattern, assembled client-side | **CHOSEN for v1** |
| A form | needs a Cloudflare Pages Function and an email path | Reserve (arrives if a form is wanted) |
| The contribute CYA | a short block linking the repos' issue and PR flows | **CHOSEN for v1** |

v1 ships the hidden email, the shared CTA, and the contribute block. A form is a real feature with a backend and a spam story; it earns its place only if the owner wants inbound through the site rather than through the listed channels.

---

## 5. Legal: terms and privacy (`/terms`, `/privacy`)

The portfolio ships a terms page and a privacy page, in the shape `dhaupin/creadev` already uses (`src/data/legal.js`, `src/components/LegalPage.jsx`): each section is `{ head, blocks }`, blocks are paragraphs or lists, and a `legalMeta.updated` date stamps the copy. The pages reuse the creadev data shape so the family's legal copy stays one pattern.

**The privacy policy must describe what the site actually does.** The owner's facts, which the copy states plainly:

- **Analytics: Google Analytics 4 via Cloudflare Zaraz.** Zaraz is the tag manager; GA4 is the tag. GA4 uses cookies and records page views and interactions.
- **Little else is tracked.** No accounts, no newsletter, no advertising, no data sold, no advertising profiles.

The creadev privacy copy is the honest template, and it already covers the consent nuance: US visitors are not shown a banner (the site sells no data and runs no ads, so the US opt-out model applies), everyone else sees a consent banner and nothing reaches Google until they accept, and a footer "Cookie settings" button reopens the banner everywhere. Whether the portfolio needs the same consent banner is an open question (section 12); the copy must match whatever is built.

Two rules, inherited from the creadev legal file:

1. **Every statement must be true of the running site.** When a fact changes (a new tool, a new field), the legal copy changes in the same commit.
2. **Copy obeys the house content rules** (hyphen-only, no emoji, plain quotes, sentence case).

---

## 6. Art direction

The site is wild and art based. The rig gives the frame (tokens, light/dark, the paint-scheme axis, the island engine); the portfolio gives the art.

The design rules the rig fixes, which the art must live inside:

- **Tokens own the palette.** Every color rides a semantic variable. The art tunes the token block; no layout class hardcodes a hex.
- **Theme is one attribute.** `<html data-theme>` with a no-flash bootstrap. The art works in both themes, or it opts out cleanly.
- **Determinism.** Same inputs, same bytes. Any generated art is generated by a committed script, not a hand-edit.

The art itself is open. Three directions to decide with the owner:

1. **Full custom palette.** Drop the family petrol/golden/jade presets and author a personal palette.
2. **Family palette, personal art.** Keep a family scheme and let the art carry the wildness.
3. **A scheme per section.** Work reads calm and legible; play reads loud and saturated.

The islands engine is available for anything alive: an animated canvas, a WebGL scene, a small interactive. The default is static art plus CSS; an island is added only where motion earns its weight.

---

## 7. The engine (prestruct)

The portfolio is the `web/` half of the rig, built by `prestruct`. What prestruct does for the portfolio:

- Compiles the React/Vite app graph.
- Injects per-route brand and SEO meta from `web/ssr.config.js` (the adapter over `site.config.js`).
- Prerenders every route into `web/dist/<route>/index.html`, so every route is real static HTML with real head tags, and hydration adds behavior without a mismatch.
- Emits `sitemap.xml` and `404.html`.

Healthy is the build's last line reading `N/N pages rendered`, with N equal to the route count. That is the same gate the family CI runs.

---

## 8. Deploy (Cloudflare Pages)

The portfolio deploys as a Cloudflare Pages project. The contract (the same one every family landing uses):

| Setting | Value |
|---|---|
| Root directory | `web` |
| Build command | `npm run build` (runs `prestruct build`) |
| Output directory | `dist` |
| Production domain | `dhaupin.creadev.org` |

There is no deploy workflow for this half: Cloudflare Pages builds from the Git integration on push. The `web/public/_headers` file carries the security headers; `web/public/_redirects` carries the redirect rules (and the recorded warning never to add an SPA fallback).

The docs half of the repo deploys separately to GitHub Pages (see `prd-creadev-docs.md`). A `web/**` change never triggers the docs deploy, and a `docs/**` change produces a no-op portfolio build.

---

## 9. The identity

The portfolio is personal. Its identity is dhaupin's own, not the Creadev docs system's. Per `prd.md` section 6, the repo keeps one `site.config.js` at the root (the docs system) with a `portfolio` block carrying the personal identity: name, wordmark, palette, routes, and nav. The `web/` half reads the `portfolio` block.

The identity fields the portfolio owns:

- **Name and wordmark:** `dhaupin`, with the wordmark split for the accent treatment.
- **Tagline:** the personal one-liner (to be authored; the GitHub bio is the seed).
- **Palette:** the personal token block (see section 5).
- **Routes:** work, play, world, contribute, contact, plus home and the legal pages (terms, privacy).
- **Nav:** the portfolio's own vocabulary, distinct from the docs nav.

---

## 10. What the portfolio is not

- **Not the docs hub.** The docs system hub is `docs.creadev.org`, the repo's other site. The portfolio does not host project documentation.
- **Not the Creadev.org marketing site.** `creadev.org` is the workshop's site. The portfolio is dhaupin's personal one. They crosslink; they do not merge.
- **Not a product page.** The family products (vant, freestruct, and the rest) have their own landings. The portfolio features them as work; it does not re-home them.
- **Not a blog.** No dates, no feeds, unless the owner wants one. The five arms are the site.

---

## 11. Phases

| Phase | Scope | Exit criterion |
|---|---|---|
| P3a | The shell (the `web/` tree, coreforge rig, prestruct build, the CF Pages project) | `dhaupin.creadev.org` serves a prerendered home |
| P3b | The frame (nav, footer, theme, the arm routes as stubs) | Every route prerenders and links |
| P4a | Arm 1 work (the professional story, the range, the selected work) | The work arm reads as a real portfolio |
| P4b | Arm 2 play (the art, the experiments) | The play arm carries the wild half |
| P4c | Arm 3 world (the give-back story) | The world arm states the intent and links the open-source projects |
| P4d | Arm 4 contribute (what we expect, ways to help) | The contribute arm invites both coders and non-coders |
| P4e | Arm 5 contact (the hidden email, the shared CTA, the contribute CYA) | A visitor can reach dhaupin, and the CTA is reusable |
| P4f | Legal (terms, privacy, the Zaraz/GA4 disclosure, consent) | The legal pages describe what the site actually does |

---

## 12. Open questions (carry until decided)

- **The domain:** `dhaupin.creadev.org` is the plan. Is a dedicated domain wanted (`dhaupin.com` is free as of this writing)?
- **The tagline:** what is the personal one-liner? The GitHub bio is the seed.
- **Art direction:** which of the three directions in section 6, and is there existing art (images, SVG, a mark) to build around, or does the agent generate placeholders?
- **Play content:** what goes in the play arm? synmergia, stegoframe, art packs, all of it?
- **Contact:** the hidden email plus the contribute CYA (the v1 ruling), or a form with a Cloudflare Pages Function?
- **Islands:** is anything alive (canvas, WebGL, a small interactive), or static art plus CSS?
- **The arm routes:** are `world` and `contribute` separate routes, or sections folded into `work` and `contact`? (This PRD assumes separate routes.)
- **The email address:** does the portfolio use `hello@creadev.org` (the creadev address) or a dhaupin-specific one?
- **Consent:** does the portfolio ship the same Zaraz consent banner as creadev (US opt-out, banner elsewhere), or a simpler GA4 setup?
- **The contribute CYA placement:** contact page only, or repeated on every repo-facing page?
