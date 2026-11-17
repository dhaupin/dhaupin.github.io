# The family canon (cherry-picked from the trees)

This repo sits in a family of 37 repos that share a working style. This file collects the shared laws, the community-health parity, and the canonical models for contribution, contact, and legal, so this repo can adopt the proven shapes rather than re-derive them. Every entry carries a receipt (a repo and, where known, a commit or issue). Read the source before copying a shape: the family law is "adopt explicitly, extract honestly."

Scope: what is shared and stable. What this repo decides for itself stays in `prd.md`, `prd-dhaupin-portfolio.md`, and `prd-creadev-docs.md`.

---

## 1. The house rules (each one paid for in real bugs)

From `coreforge/AGENTS.md`, the rig every family site follows:

1. **Tokens own the palette.** Every color rides a semantic variable (`--paper`, `--surface`, `--ink`, `--accent`, and so on); the light theme is a second block of the same token set; a layout class never hardcodes a hex. Re-brand = edit `site.config.js` plus the token block; nothing else moves.
2. **Theme is one attribute.** `<html data-theme>` with a no-flash inline bootstrap; both switch icons always render (CSS picks), so prerender and hydration agree byte-for-byte. The icon is the action (a sun shows in dark mode; clicking goes light).
3. **Gates fail at cause.** Every `check-*.cjs` names `file:line`. When a bug is caught twice, it becomes a gate the same day. Never bend a check to silence a finding.
4. **Pins never float.** Every GitHub Action `uses:` names a 40-hex commit SHA (the tag stays in a trailing comment). `npm run lint:pins` refuses a floating ref.
5. **Adopt explicitly, extract honestly.** New sites diff the rig and replace only brand data. When a rig takes a fix from a sibling, transcribe with receipts; never invent shapes from memory.
6. **The stamp ships neutral brand art.** Binary art cannot be tokenized; a separation guard refuses a rebuild that made a placeholder byte-identical to the dogfood's mark.
7. **Determinism.** Same inputs, same bytes for anything generated; no wall clock in shipped surfaces.
8. **The log is the memory.** Every session appends receipts to `labs/TASKS.md` and versioned changes to `CHANGELOG.md`.
9. **Prose flow.** Living prose never hard-wraps at commit time; `unwrap-prose.cjs` joins hard-wrapped prose without touching frontmatter, fences, indented code, tables, headings, thematic breaks, or HTML blocks. Dated history keeps its era wording.

---

## 2. The family laws (named, dated, cited)

These are the cross-repo laws, each traceable to a sibling and a receipt.

| Law | What it says | Receipt |
|---|---|---|
| Generated green is never shipped | A pass the doctor cannot verify is not a pass; absence is honest | `monoforge/AGENTS.md` core law |
| The walk-exit rule | A manual walk is not done until nothing it found is uncommissioned (a battery leg, a pack verdict row, or a named docket row). Walks discover classes; the battery remembers them | family law 2026-10-28, `eyestruct@70dfbea` |
| A committed pack rides the tarball | A pack tree excluded by `package.json` `files` is invisible to `npm i`; the family arms every verdict by an exact npm pin | family law `poststruct#79` |
| OIDC trusted publishing only | No publish tokens anywhere; the release ladder is publish / release / verify | `eyestruct@4e2b552` |
| Pins never float | 40-hex SHAs; the human tag rides a comment | `packstruct#69` |
| Named skip is honest, silent pass is poison | A missing optional capability is a named skip, never a quiet pass | `gistory/labs/TASKS.md` |
| The staging branch | `staging` is a permanent integration branch; work branches off it, PRs target it, promotion to `main` is the only path out, and `staging` fast-forwards to `main` after every promotion | `flowforge#30`, `monoforge#20` |
| Refusing, not warning | A doctor that warns into green is politeness theater; refuse nameably at author time | `govstruct/README.md` |
| Zero dependencies | Node ESM, exit codes 0/1/2 | `govstruct`, `monoforge`, the family CLIs |

---

## 3. The voice and style law

The writing rules are mechanical, not suggestions (`vant/docs/advanced/style.md`, `creadev/CONTENT.md`, `coreforge/lib/gates/check-language.cjs`):

- **Hyphens only.** No em dashes, no en dashes, no double-hyphen substitutes.
- **No emoji** outside code.
- **No AI cliches.** The stock marketing phrases are enforced by a linter. The exact machine-readable list lives in `coreforge/lib/gates/check-language.cjs` and `vant/docs/advanced/style.md`; do not restate the words here, or this file trips the very gate it describes.
- **Plain quotes.** No curly quotes; use straight quotes.
- **Oxford comma always.**
- **Sentence case** on headings and labels.
- **No ellipsis** except in UI loading states or read-more links.
- **Table rows end with pipes.**
- **English-only** committed prose.
- **State facts, not hype.** Numbers over adjectives.

This repo runs a markdown gate (the cliche linter plus cross-reference checks) over its own prose. The gate is the enforcement; the list above is what it enforces.

---

## 4. The contribution model (canonical: `vant`)

`vant` is the only family repo with the full community-health set. Its contribution shape is the model:

- **`CONTRIBUTING.md` is the short front door**, and one full guide is the canonical source (`docs/getting-started/contributing.md`). The rule: do not grow the two back into divergent copies. The root file points at the guide.
- **Good first issues carry a contract.** An issue labeled `good first issue` includes a reproduction and an acceptance test, so a contributor verifies their fix the way the project does.
- **Triage doors are explicit.** Every input has a real door, checked against reality: question or idea goes to Discussions, bug goes to Issues with the bug template, feature goes to Discussions first then becomes an issue, security goes to a private advisory (never a public issue), a docs gap goes to Issues with the `documentation` label.
- **Labels must exist.** If a guide mentions a label the tracker does not carry, that is a bug; the doors are part of the surface.
- **Agents are first-class contributors.** The contributing guide states it plainly and points agents at `AGENTS.md` as the real interface.
- **Conventional commits** for human PRs (`type: description`), with a separate pass format for agent crews.

### 4.1 The parity gap (measured 2026-11-17)

Community-health files across the family, from the GitHub community profile API:

| Repo | CONTRIBUTING | CODE_OF_CONDUCT | ISSUE_TEMPLATE | PR_TEMPLATE | SECURITY | SUPPORT |
|---|---|---|---|---|---|---|
| vant | Y | Y | Y | Y | Y | Y |
| freestruct | Y | - | - | - | - | - |
| packstruct | Y | - | Y (5) | - | - | - |
| gistory | Y | - | - | - | - | - |
| memstruct | Y | - | - | - | - | - |
| coreforge | - | - | - | - | - | - |
| monoforge | - | - | - | - | - | - |
| govstruct | - | - | - | - | - | - |
| crashtest | - | - | - | - | - | - |
| eyestruct | - | - | - | - | - | - |
| poststruct | - | - | - | - | - | - |
| prestruct | - | - | - | - | - | - |
| gamestruct | - | - | - | - | - | - |
| this repo | - | - | - | - | - | - |

The gap: `vant` carries the full set; `freestruct`, `packstruct`, `gistory`, and `memstruct` carry `CONTRIBUTING.md`; the rest carry none. The portfolio's **arm 4 (how to get involved)** and **arm 5 (contact, with the contribute CYA)** point a visitor at these files, so the surfaces must exist before the pages link them. Bringing the family to a common floor (a `CONTRIBUTING.md` per repo, the `vant` shape) is the parity work this repo's arm 4 depends on.

---

## 5. The contact model (canonical: `creadev`)

The email is web-exposed and bot-hidden at once (`creadev/src/components/ObfuscatedContact.jsx`):

- The static HTML ships a broken-up placeholder (`hello [at] creadev [dot] org`), never a machine-readable address.
- The real `mailto:` href and the readable text are assembled in a `useEffect`, so only a browser that runs JS ever sees them. A crawler reading the baked HTML gets nothing usable.
- The email and phone links are shared components (`EmailLink`, `PhoneLink`), so the footer and the contact page cannot drift.

This repo adopts the same pattern (portfolio PRD section 4.5). The shared CTA renders in the footer, the arms, and the docs hub from one component.

---

## 6. The legal model (canonical: `creadev`)

`creadev/src/data/legal.js` and `creadev/src/components/LegalPage.jsx` set the shape:

- **Shape:** each section is `{ head, blocks }`; a block is a paragraph (`{ p }`) or a list (`{ list: [...] }`). A `legalMeta.updated` date stamps the copy and bumps when the copy changes.
- **Rule 1: every statement must be true of the running site.** The privacy policy describes what actually happens, read from the repo and the live site, never copied from a template. When a fact changes (a new tool, a field, a third party), the file changes in the same commit.
- **Rule 2: the copy obeys the house content rules** (section 3).

### 6.1 The analytics disclosure (the owner's facts)

- **Cloudflare Web Analytics** runs at the edge through the host: page views, referrers, rough geography, no cookies, no cross-site tracking.
- **Google Analytics 4** runs through **Cloudflare Zaraz** (the tag manager): page views, session information, and interactions. GA4 uses cookies and may set identifiers. Google signals, advertising features, and data sharing for advertising are off.
- **Consent:** US visitors are not shown a banner (the site sells no data and runs no ads, so the US opt-out model applies); everyone else sees a consent banner, and nothing reaches Google until they accept. A footer "Cookie settings" button reopens the banner everywhere, including the US.

`creadev/scripts/zaraz-modal-check.mjs` verifies the live Zaraz consent modal (it lives in a shadow root and auto-opens only outside the US, so the script calls `window.zaraz.showConsentModal()` to render it anywhere).

This repo's portfolio privacy page reuses this shape and these facts. Whether the portfolio ships the same consent banner is an open question (portfolio PRD section 12); the copy must match whatever is built.

---

## 7. What this repo adopts from the canon

| Canon | This repo's use |
|---|---|
| House rules 1 to 9 | the rig this tree follows (coreforge); the gates and prose flow apply |
| Generated green is never shipped | the docs hub and portfolio never claim a pass they cannot show |
| The walk-exit rule | every recon finding lands as a PRD section, a task row, or a named open question |
| Pins never float | the docs lane caller and any Action this repo adds are SHA-pinned |
| OIDC-only publishing | this repo ships no npm package, so the ladder does not apply |
| The staging branch | open question (repo PRD section 10) |
| The voice and style law | the markdown gate enforces it |
| The contribution model | arm 4 points at each repo's `CONTRIBUTING.md`; the family floor must exist first (section 4.1) |
| The contact model | portfolio PRD section 4.5 (the `ObfuscatedContact` pattern, the shared CTA) |
| The legal model | portfolio PRD section 5 (the `legal.js` shape, the Zaraz/GA4 disclosure) |
