# PRD: marketing (the portfolio narrative)

**Status:** draft v0.1 for owner review **Owner:** dhaupin **Author:** OpenHands agent, 2026-11-17 **Repo:** `dhaupin/dhaupin.github.io` **Lands on:** the portfolio (`web/`, `dhaupin.creadev.org`), the docs hub (`docs.creadev.org`), and the Creadev.org project surfaces **Companion PRDs:** [`prd.md`](./prd.md) (the repo story), [`prd-dhaupin-portfolio.md`](./prd-dhaupin-portfolio.md) (the portfolio), [`prd-creadev-docs.md`](./prd-creadev-docs.md) (the docs hub)

> **What this file is.** The owner passed a batch of strategy chats and asked for them distilled into the portfolio's content. This PRD is that distillation: the thesis, the architecture story, the proof, and the case studies, written as the source the portfolio's `work` section renders from. It is the marketing layer, not the site build (that is the portfolio PRD's job).
>
> **The chats are direction, not data.** They came from a model that cannot browse, so every figure in them is stale by construction. Treat them as **guide posts**: they name what to build and how to frame it, never what to claim. Where a chat supplies a number, this PRD re-derives it from the trees and tags the result (below). Where a chat supplies a framing, this PRD keeps the framing and drops the number.
>
> **The house law applies to marketing too: receipts over vibes.** Every number below is tagged either **VERIFIED** (checked against the trees this session) or **DIRECTION** (a stale figure from a chat, kept only as a signal about what to measure). A portfolio that overstates is a portfolio that lies in public.

---

## 1. The thesis (one line)

**A vertically integrated, self-verifying software factory: deterministic guardrails, persistent memory, and adversarial QA for AI-native software.** The portfolio does not show a list of repos. It shows one system, built over 25 years of shipping, where each tool is a layer of a single idea.

The core claim, in plain words: agent-written code needs the same discipline human-written code needs, and more of it, because the agent writes faster than a human reviews. The factory is the answer: tools that govern, tools that remember, and tools that attack, all built to refuse rather than to warn.

---

## 2. Why this narrative (the evidence)

- **A flat repo list is unreadable.** The family is 25 members (VERIFIED, `govstruct` roster, `memberCount: 25`). No hiring manager, technical founder, or buyer inspects 25 repositories. A system story is read in two minutes; a repo list is closed in ten seconds.
- **The work is genuinely systematic.** The repos are not 25 unrelated tools. They compose: a governance manifest renders the crosslinks, a factory stamps new repos, four measurement tools grade four artifact layers, and a memory-first agent OS ties it together. The architecture is the portfolio piece, and it already exists.
- **The proof is measurable.** The family ships real gates with real exit codes and real counts. A portfolio that cites verified numbers reads as staff-level engineering; one that cites adjectives reads as a landing page.
- **The audience is technical.** The readers (engineers, founders, buyers) reward specificity. "192-test CI batteries with deterministic exit codes (0 clean, 1 refusal, 2 usage)" lands; "robust testing" does not.

---

## 3. The architecture story (system, not list)

The portfolio leads with the system. The proposal from the chats groups the members into three layers. That grouping is audience-friendly and it is the one the portfolio opens with. It sits beside the family's own governed vocabulary (govstruct's roles), which is the truthful classification the tools themselves carry.

### 3.1 The three layers (the marketing view)

| Layer | Members | What it does |
|---|---|---|
| Agent OS and memory | Vant, Memstruct, Gistory, Railyard | A persistent, auditable memory and runtime for AI agents, over MCP |
| Fleet governance and contracts | Govstruct, Packstruct, Monoforge | One manifest, one spec, one factory: the family governs itself |
| Adversarial QA and zero-drift publishing | Crashtest, Eyestruct, Poststruct, Coreforge, Prestruct, Freestruct | Attack the code, watch the pixels, audit what shipped, publish with no drift |

### 3.2 The governed roles (the truthful view)

`govstruct` classifies every member by role: `arm`, `forge`, `factory`, `composer`, `product`, `component`. The portfolio may show the three-layer story and footnote the governed roles, so the marketing grouping and the machine truth agree rather than compete. The roster, blurbs, statuses, and links all come from the governed manifest (see `prd.md` section 7 for the bridge), never hand-typed.

### 3.3 The one-sentence system

The chain, from the family's own docs: **packstruct** approves what the packs DECLARE, **crashtest** grades what the code DOES, **eyestruct** explains what the pixels SHOW, and **poststruct** probes what actually SHIPPED, while **govstruct** governs who the members ARE and **monoforge** mints the next one. That sentence is the architecture slide.

---

## 4. Proof (the numbers, tagged)

The chats supplied a set of headline metrics. Each is re-checked here against the trees. Ship the VERIFIED set; the DIRECTION set is a signal about what to measure, never a claim to publish.

| Claim | Source | Status |
|---|---|---|
| 83 public crashtest packs across 10 family repos | counted: `packs/public/*/pack.json` per repo, 2026-11-17 | VERIFIED |
| vant alone: 24 packs, 269 attack rows across 21 packs | `vant/packs/README.md` ledger, 2026-10-28 close-out | VERIFIED |
| 25 family members in the governed roster | `govstruct/apps.json` `memberCount` | VERIFIED |
| Nine npm-live tools (freestruct 1.4.1, prestruct 1.5.1, packstruct 1.1.2, crashtest 1.4.0, eyestruct 1.3.2, poststruct 1.2.0, govstruct 1.1.1, monoforge 1.2.0, coreforge 1.0.0) | `npm view`, 2026-11-17 | VERIFIED |
| Deterministic exit codes: 0 clean, 1 refusal, 2 usage | the family's own docs | VERIFIED |
| The full discovery set ships from the baked output (sitemap.xml, robots.txt, feed.xml, 404 with noindex, llms.txt, JSON-LD) | `freestruct` README + a real build | VERIFIED |
| "69 packs across 9 live hosts under packstruct v1" | the passed chats | DIRECTION (stale; the verified count is 83 packs) |
| "290 adversarial attack scenarios" | the passed chats | DIRECTION (stale; vant's own ledger reads 269 rows) |
| "192-test CI batteries, exit codes 0/1/2" | the passed chats | DIRECTION (the exit-code ladder is verified; the test count is stale) |
| "Zero-warning policy" | the passed chats | DIRECTION (the family law is "a bug caught twice becomes a gate"; use that line) |

Three rules for the numbers:

1. **Date every count.** "83 packs (2026-11-17)" ages honestly; a bare "83 packs" becomes a lie the day it changes.
2. **Prefer the family's own phrasing.** "A bug caught twice becomes a gate" and "generated green is never shipped" are the house lines, and they are true.
3. **A stale figure is a to-do, not a sentence.** Where a chat names a metric the family does not yet track as a headline (attack totals across the fleet, a single CI-test count), the answer is to add the measurement, then cite it with a date, not to repeat the number.

### 4.1 The discovery surfaces (a verifiable strength)

One chat flagged that clean HTML, real sitemaps, JSON-LD, and working cross-repo search move the needle for crawlers and humans alike, and that `llms.txt` is experimental and not worth over-indexing on. The family already agrees in practice: freestruct emits the whole set from the baked output, missing-only, with honest per-page dates.

| Surface | What ships | Status |
|---|---|---|
| `sitemap.xml` | real per-page `lastmod` (page mtime, not build time); noindex pages excluded | VERIFIED |
| `robots.txt` | `User-agent: *`, `Allow: /`, a basePath-aware sitemap pointer | VERIFIED |
| `feed.xml` | RSS with honest per-page dates | VERIFIED |
| `404.html` | carries `noindex` | VERIFIED |
| JSON-LD | Organization plus WebSite (with a SearchAction), opt-in BreadcrumbList and Article blocks | VERIFIED |
| `llms.txt` | opt-in, over the same indexable set; never overwrites an existing file | VERIFIED |

The doctrine the portfolio should carry: **the baked HTML is the product.** The discovery files ride it; they do not stand in for it. `llms.txt` ships because it is cheap and honest, not because it is the strategy.

---

## 5. Case studies (the deep dives)

Three case studies, each told as Problem, Contract, Verification. These are the portfolio's proof-of-thinking, not just proof-of-shipping.

### 5.1 Zero-drift fleet governance

- **Problem:** the crosslink mesh (apps menu, README tables, project cards) was hand-typed across N repos and drifted. Three copies of project data disagreed, and the email-hiding law broke by inertia across 17 pages.
- **Contract:** one manifest of members, one render surface per deployment shape, one doctor that verifies every adopter serves the same truth. The roster is data, not code; adding member 26 is a block file plus a doctor run.
- **Verification:** `govstruct doctor` gates each adopter's pin; the rendered surfaces are statically emitted, so a bot reads a plain anchor; the registry is checksummed. Receipts: the manifest and its rendered artifacts carry a shared checksum.

### 5.2 Adversarial agent hardening

- **Problem:** agent-written code ships faster than a human reviews, and the classic failure is a handler that echoes hostile input or leaks a stack frame.
- **Contract:** crashtest attacks the real handlers in-process (no sockets), and every scenario returns exactly one verdict: `REFUSED`, `EXPLOITED`, or `BOUNDED` (which must name an owner and a bound, or it is a finding). Absence degrades to an explicit typed skip, never a silent pass.
- **Verification:** eyestruct pins the appearance with a read-only gate over a committed visual ledger; poststruct audits the baked output. Receipts: vant's 269-row ledger runs deterministic pass-for-pass; crashtest's own site pack caught a real bug on its first run (hostile registry shapes echoed as a badge 200), now guarded forever by a two-way test.

### 5.3 Git-backed agent memory

- **Problem:** an agent that forgets every session cannot be trusted with real work, and memory that lives only in a vendor's database cannot be audited or moved.
- **Contract:** the memory is markdown files in the user's own repository, read when a session starts and written before it ends, so git history becomes the memory lineage. The interface is MCP, so any agent on any stack can use it.
- **Verification:** the brain is inspectable with `cat`; the memory survives leaving the tool. Receipts: vant's public and private brain layers, the boot stone with a verified checksum sidecar, and the MCP doors.

---

## 6. The buyer and investor layer

A pair of chats pointed the same thesis at a different reader: an acquirer doing diligence, or an investor sizing the work. The reader changes; the story does not. Three deliverables come out of this section: the **dogfooding proof**, a one-page **buyer tear-sheet**, and a **5-minute demo repo**.

### 6.1 The one-line for a buyer

**Do not sell 25 separate repos or a collection of CLI tools. Sell a vertically integrated, self-verifying software factory for AI-native engineering.** The differentiator a buyer hears is not any single tool. It is that the tools dogfood each other: every member is pinned and gated inside the others' CI, so the fleet is its own proof.

### 6.2 The industry pain point (the thesis for a buyer)

**Agent drift.** AI coding agents write code far faster than a human reviews, and the failure is structural, not stylistic: silently broken links, configs desynchronized across repos, regressions, hallucinated state. Teams drown in glue code, stale docs, and silent regressions.

The family's answer is at the infrastructure layer: **replace fragile manual review with machine-verifiable contracts and nameable refusals.** The pitch sentence: *deterministic guardrails for agent-built software.* Instead of hoping an agent did not break production, CI refuses to go green unless every contract passes.

### 6.3 The three pillars (the buyer's architecture view)

This is the same three-layer story as section 3, pitched to a buyer, with the proof attached to each pillar. Each pillar carries a pitch line and a proof line.

| Pillar | Members | The pitch | The proof |
|---|---|---|---|
| A. Agent OS and interchangeable memory | Vant, Memstruct, Gistory, Railyard | Stateless agents are toys; stateful, auditable agents are infrastructure | Vant gives agents a git-backed persistent brain over MCP, hardened by adversarial campaigns; Memstruct answers vendor lock-in with a memory interchange and merge contract; Railyard and Gistory orchestrate multi-repo dispatch and staging |
| B. Fleet governance and extensible contracts | Govstruct, Packstruct, Monoforge | Managing one repo is easy; governing a fleet without drift is an enterprise problem | Govstruct drives crosslinks, status registries, and repo truth from one manifest; Packstruct (SPEC v1) standardizes how verification scenarios are packaged and linted, with zero-dependency validation |
| C. Adversarial QA and zero-drift publishing | Crashtest, Eyestruct, Poststruct, Coreforge, Prestruct, Freestruct | Quality assurance that attacks your own software before users or crawlers see it | Crashtest runs seeded, in-process adversarial attacks against real handlers; Eyestruct gives deterministic visual-regression memory; Coreforge, Prestruct, Freestruct, and Poststruct turn static sites and docs into a single-config, SEO-complete publishing pipeline |

The proof numbers ride section 4 (dated, VERIFIED). Do not restate a stale figure here.

### 6.4 The moat (why a strategic buyer acquires this)

- **Dogfooded production proof.** Not slideware and not an academic spec. Every tool is the first adopter of the tool next to it: Govstruct renders its own roster, Packstruct lints its own fleet, Crashtest attacks its own builds on every push. (Verified in the trees; see 6.5.)
- **Zero-bloat, composable architecture.** Pure CLI tools with explicit exit codes (0 clean, 1 refusal, 2 usage), zero-dependency linters, and framework-agnostic post-build layers, so a buyer drops the stack into an existing engineering org without forcing a rewrite.
- **Force multiplier per engineer.** An entire multi-member ecosystem, governed, from a tiny footprint, because the tooling is the force multiplier. The buyer's version: a turnkey governance, QA, and agent-memory layer that would take a platform team many months to design and battle-test from scratch.

The last claim ("a 15-person team, 18+ months") is DIRECTION. It is a compelling frame, but it is not measurable from the trees. Either drop the numbers or state it as a judgement, not a figure.

### 6.5 The dogfooding proof (the standout, verified)

This is the claim that separates the suite from the field, and it is checkable in the trees:

- **The tools measure each other.** Vant pins packstruct, crashtest, eyestruct, poststruct, govstruct, and monoforge in its own CI lanes; crashtest's site pack attacks crashtest's own deployed site; coreforge gates its own tree with its own gates. The suite is the first adopter of itself.
- **Refusals are nameable, not generic.** Every refusal carries a code from a shared vocabulary (`spec/refusals.json`); a code the vocabulary does not name is itself refused. A buyer reading the code sees typed failure, not a thrown string.
- **Nothing ships on a warning.** The house law is "a bug caught twice becomes a gate" and "generated green is never shipped." A placeholder or a stale derived file is a failure, not a note.

### 6.6 The commercial anchors (open-source funnel vs proprietary value)

A chat asked for the open-source adoption funnel to be separated clearly from the commercial value. The marketable list already carries this: `dhaupin/creadev`'s `src/data/projects.js` classifies every project by `section` (`open-source`, `proprietary`, `other`). The counts (VERIFIED, 2026-11-17, from that file): **21 open-source, 2 proprietary, 1 other**, out of 24 marketable projects. (The govstruct roster, which will supersede it, carries the wider internal set.)

| Track | What it is | Projects (from `projects.js`) |
|---|---|---|
| Open-source funnel | free npm packages and public repos that win developer trust | vant, synmergia, coreforge, monoforge, crashtest, eyestruct, poststruct, govstruct, memstruct, gamestruct, prestruct, freestruct, gistory, stegoframe, audithole, migrare, regarded, creadev-security, creadev-qos, packstruct, this |
| Proprietary value | the hosted products | weisync, threadforge |

Two honesty rules for this table:

1. **The split is data, not a pitch.** Render it from `projects.js` (`section`), so it cannot drift from the source list.
2. **"Proprietary" does not mean "for sale."** It means the source is not public. The tear-sheet says what each project is, not what is on the block.

### 6.7 The buyer tear-sheet (one page)

| Block | Content |
|---|---|
| The thesis | the one line from section 1 |
| The pain | agent drift (section 6.2) |
| The architecture | the three pillars (section 6.3) |
| The proof | the VERIFIED table (section 4), dated |
| The dogfooding | the self-verification proof (section 6.5) |
| The commercial split | the open-source funnel vs the proprietary value (section 6.6) |
| The live set | the nine npm packages with versions, and the live sites |
| The posture | license (MIT across the open-source family), provenance (npm OIDC), and what is public vs private |

The tear-sheet is generated from the governed roster and the proof table, so it cannot drift from the sites. It ships as a printable page and a plain-markdown file.

### 6.8 The 5-minute demo repo

A runnable path that proves the claims in five minutes, for a reader who will not read 25 repos. The chats proposed a single CI run that shows an agent generating a feature, Crashtest catching a vulnerability by name, Eyestruct catching a UI shift, and Govstruct refusing a drift. That is the strongest version; a shorter fallback is the three-command path.

1. `npx govstruct doctor` - the roster manifest and the doctor verdict (a refusal shown by name).
2. `npx packstruct lint packs/` - the pack spec, linted.
3. `npx crashtest run` - an adversarial campaign with a deterministic verdict ledger.
4. A link to the docs hub and its unified Pagefind search.

The demo repo is a thin wrapper (a `README` plus the commands); it depends on the published packages, so it is the shortest honest path from "what is this" to "I ran it." The full CI-run version is the stretch goal; the three-command path is the v1.

### 6.9 What to tighten before technical due diligence

The chats named three things to finish before a buyer looks. Each maps to work already planned in the site PRDs:

| Tighten | Why | Where it lands |
|---|---|---|
| The public front door (`docs.creadev.org`) | buyers search the docs and test the quickstarts first | `prd-creadev-docs.md` (the lander, the projects index, the unified search) |
| The commercial anchors | separate the open-source funnel from the proprietary value | section 6.6 (the governed split) |
| The 5-minute demo repo | one reference repo for technical evaluators | section 6.8 |

The front door is the highest-value item: the whole tear-sheet assumes a buyer can land on `docs.creadev.org`, search it, and run a quickstart. That is exactly what `prd-creadev-docs.md` builds.

---

## 7. Live interactive proof

The portfolio should let a visitor test the system in 30 seconds, not read about it.

- **A quick CLI snippet:** `npx packstruct lint packs/` and `npx govstruct doctor`, copyable from the page.
- **Live links:** the docs hub with its unified Pagefind search (`docs.creadev.org`), each tool's landing, and the npm badges for the nine published packages.
- **The registry:** link the governed roster so a visitor sees the family is data, not a brochure.

Each of these is a real surface that already exists or is planned in the two site PRDs. The marketing PRD names them; the site PRDs build them.

---

## 8. The arms that are not the pitch (world, contribute, contact)

Arms 1 and 2 (work, play) are the pitch. Arms 3, 4, and 5 are the other three jobs the site does, and they carry their own words. The portfolio PRD owns their routes and shape (sections 4.3 to 4.5); this section owns the narrative.

### 8.1 Arm 3: contributing to the world

The give-back story, told plainly. Three claims, each true of the family today:

- **Helping developers.** The tools exist to make an engineer's day better: deterministic gates that fail loudly, honest verdicts instead of generated green, less glue code between build and ship.
- **Giving abilities to agents.** The agent-facing work is about what an agent can do once it has memory and contracts: vant's memory over MCP, the `this` ROM spec, memstruct's interchange format. The claim is capability, not hype.
- **Consistent seams and flow.** The family's thesis turned outward: the joins between tools should be predictable, and the flow from build to ship should not leak.

Tone: warm and generous, not metric-led. The proof table (section 4) is available one click away; this arm leads with the intent, then links the open-source projects. It is the open-source family as a public good, not a funnel.

### 8.2 Arm 4: how to get involved

The invitation. Two halves:

- **What we expect.** Plain expectations, stated up front: read the repo's `AGENTS.md`, keep the house rules (hyphen-only prose, no emoji, receipts over vibes), open an issue before a large pull request, and expect a refusal to be named rather than generic. The family is opinionated and says so.
- **You do not have to code.** The explicit door for non-coders: ideas, bug reports, docs fixes, translations, art, testing, and use-cases are contributions. Imagination is the entry. This is the honest counterweight to the "25 years of building" credential on the work arm: the site invites the reader in, not just past them.

Tone: inviting, never gatekeeping. A short "what we expect" list, then a longer "ways to help" list, then the start path (find a repo, read its notes, open an issue or a pull request).

### 8.3 Arm 5: contact

The door at the end of every path. The words are short:

- The email (web-exposed, bot-hidden, the creadev `ObfuscatedContact` model).
- The one-line CTA, reused across the footer, the arms, and the docs hub.
- The contribute CYA: a separate short block that points a visitor at the repos for issues and pull requests, so the inbox is not the bug tracker.

The CTA line is authored once and rendered everywhere; the CYA sits below it, clearly separate.

---

## 9. Where it lands

| Surface | What it renders from this PRD |
|---|---|
| Portfolio `work` arm (`web/`) | the thesis, the three-layer story, the proof table, the case studies, the live proof |
| Portfolio `world` arm (`web/`) | the give-back story from section 8.1 |
| Portfolio `contribute` arm (`web/`) | the expectations and the invitation from section 8.2 |
| Portfolio `contact` arm (`web/`) | the CTA and the contribute CYA from section 8.3 |
| Portfolio hero | the one-line thesis |
| Buyer tear-sheet (`web/`, printable) | the one-page summary from section 6.3 |
| Docs hub lander (`docs/`) | the one-sentence system and the family map |
| Creadev.org project surfaces | the governed roster and the case studies, crosslinked |

The portfolio is the primary home (the personal site is where the story is told). The docs hub and Creadev.org carry the shorter forms. The tear-sheet and the demo repo are the buyer-facing cut of the same material.

---

## 10. Voice and tone

The portfolio is personal and art-led, so the voice is dhaupin's, not a corporate register. Two anchors:

- **Plain and specific.** Short declarative sentences. Numbers over adjectives. The family's hyphen-only, no-emoji, no-cliche prose law applies (see `AGENTS.md` house rules).
- **Honest about limits.** The family's own doctrine says "absence is honest" and "generated green is never shipped." The portfolio says what is live and what is planned, with dates.

The tagline is still to be authored (open in the portfolio PRD). The thesis line in section 1 is the seed.

---

## 11. What this PRD is not

- **Not the site build.** The `web/` tree, the routes, and the art are the portfolio PRD's job.
- **Not the docs hub.** The docs hub renders the shorter form; its build is the docs PRD's job.
- **Not a claims generator.** Every number ships with a source and a date, or it does not ship.

---

## 12. Open questions (carry until decided)

- **The headline numbers:** ship the VERIFIED set (83 packs, 25 members, 269 vant rows, 9 npm-live tools), each dated, and add a fleet-wide attack total as a measurement before citing one?
- **The tagline:** author the personal one-liner.
- **Case study depth:** three full case studies, or three summaries with one deep page?
- **Live proof:** which CLI snippet and which live links make the 30-second cut?
- **The three-layer grouping vs the governed roles:** does the page show the marketing layers, the governed roles, or both?
- **The buyer tear-sheet:** does it live on the portfolio (a printable route) or as a standalone repo (the demo repo)?
- **The demo repo:** is a separate thin repo wanted, or does the portfolio's `work` page carry the commands inline? And does v1 ship the three-command path or the full CI-run version (section 6.8)?
- **The contribution CYA wording:** how blunt is the "open an issue, not an email" note? The family voice allows directness; confirm the line.
- **The email address:** `hello@creadev.org`, or a dhaupin-specific address for the portfolio's contact arm?
- **The moat figures:** the "15-person team, 18+ months" claim is a judgement, not a measurement. Keep it as prose, or drop it?
- **The commercial split:** does the portfolio surface the open-source vs proprietary split publicly (it is already governed data), or keep it to the tear-sheet?
