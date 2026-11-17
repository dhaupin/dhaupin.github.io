/**
 * pages/Work.jsx - arm 1: the professional story. The range, the proof table
 * (every number tagged VERIFIED or DIRECTION), and the three case studies.
 * Sources: labs/prd-dhaupin-portfolio.md section 4.1, labs/prd-marketing.md
 * sections 3 to 5.
 */
import { Link } from 'react-router-dom'
import usePageMeta from '../hooks/usePageMeta.js'
import site, { routeMeta } from '../site.js'

export default function Work() {
  const meta = routeMeta('/work')
  usePageMeta({ siteUrl: site.url, path: '/work', title: meta.title, description: meta.description })
  return (
    <>
      <section className="hero">
        <div className="wrap">
          <p className="eyebrow">work</p>
          <h1>
            I build things that hold up: <span className="accent">web, app, ecom, enterprise, agent, orchestration.</span>
          </h1>
          <p className="lede">
            Twenty-five years of shipping, distilled into one idea: the code an
            agent writes needs guardrails, memory, and an adversary. This page
            is the legible half - the range, the proof, and three case studies.
          </p>
          <div className="cta-row">
            <a className="btn btn-primary" href="https://creadev.org/projects">The full roster</a>
            <Link className="btn btn-ghost" to="/world">The open-source family</Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <h2>The range</h2>
          <p className="sub">The Creadev.org services vocabulary, in plain words.</p>
          <div className="arm-grid">
            <div className="arm-card"><h3>Web and app development</h3><p>Front to back, from a static lander to an app with real state.</p></div>
            <div className="arm-card"><h3>Back end and infrastructure</h3><p>APIs, data, and the seams that keep them predictable.</p></div>
            <div className="arm-card"><h3>IT contracting</h3><p>Embedded work on someone else's stack, shipped and documented.</p></div>
            <div className="arm-card"><h3>SEO and performance</h3><p>Real head tags, real sitemaps, real load budgets - not adjectives.</p></div>
            <div className="arm-card"><h3>Tools and automation</h3><p>Deterministic gates that fail loudly instead of generated green.</p></div>
            <div className="arm-card"><h3>Migrations and rescues</h3><p>Inherited trees made honest again, with the drift named at cause.</p></div>
            <div className="arm-card"><h3>AI and agent engineering</h3><p>Memory, contracts, and adversarial QA for agent-written code.</p></div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <h2>Proof</h2>
          <p className="sub">
            Every number ships with a source and a date, or it does not ship.
            VERIFIED was re-derived from the trees; DIRECTION is a stale figure
            kept only as a signal about what to measure.
          </p>
          <div className="table-wrap">
            <table className="proof">
              <thead>
                <tr><th>Claim</th><th>Source</th><th>Status</th></tr>
              </thead>
              <tbody>
                <tr><td>83 public crashtest packs across 10 family repos</td><td>counted from the pack manifests, 2026-11-17</td><td><span className="verified">VERIFIED</span></td></tr>
                <tr><td>25 family members in the governed roster</td><td>the govstruct manifest</td><td><span className="verified">VERIFIED</span></td></tr>
                <tr><td>Nine npm-live tools</td><td>npm view, 2026-11-17</td><td><span className="verified">VERIFIED</span></td></tr>
                <tr><td>Deterministic exit codes: 0 clean, 1 refusal, 2 usage</td><td>the family's own docs</td><td><span className="verified">VERIFIED</span></td></tr>
                <tr><td>The full discovery set ships from the baked output</td><td>a real freestruct build</td><td><span className="verified">VERIFIED</span></td></tr>
                <tr><td>290 adversarial attack scenarios</td><td>a strategy chat (stale; the verified ledger reads 269 rows)</td><td><span className="direction">DIRECTION</span></td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <h2>Case studies</h2>
          <p className="sub">Proof of thinking, not just proof of shipping. Problem, Contract, Verification.</p>

          <div className="case">
            <h3>Zero-drift fleet governance</h3>
            <dl>
              <dt>Problem</dt>
              <dd>The crosslink mesh was hand-typed across many repos and drifted. Three copies of project data disagreed.</dd>
              <dt>Contract</dt>
              <dd>One manifest of members, one render surface per deployment shape, one doctor that verifies every adopter serves the same truth.</dd>
              <dt>Verification</dt>
              <dd>The doctor gates each adopter's pin; the rendered surfaces are statically emitted, so a bot reads a plain anchor; the registry is checksummed.</dd>
            </dl>
          </div>

          <div className="case">
            <h3>Adversarial agent hardening</h3>
            <dl>
              <dt>Problem</dt>
              <dd>Agent-written code ships faster than a human reviews, and the classic failure is a handler that echoes hostile input or leaks a stack frame.</dd>
              <dt>Contract</dt>
              <dd>The harness attacks the real handlers in-process, and every scenario returns exactly one verdict: refused, exploited, or bounded (which must name an owner and a bound, or it is a finding).</dd>
              <dt>Verification</dt>
              <dd>The pixels are pinned by a read-only gate over a committed visual ledger; the baked output is audited; the ledger runs deterministic pass-for-pass.</dd>
            </dl>
          </div>

          <div className="case">
            <h3>Git-backed agent memory</h3>
            <dl>
              <dt>Problem</dt>
              <dd>An agent that forgets every session cannot be trusted with real work, and memory that lives only in a vendor's database cannot be audited or moved.</dd>
              <dt>Contract</dt>
              <dd>The memory is markdown files in your own repository, read when a session starts and written before it ends, so git history becomes the memory lineage. The interface is MCP.</dd>
              <dt>Verification</dt>
              <dd>The brain is inspectable with cat; the memory survives leaving the tool; the boot stone carries a verified checksum sidecar.</dd>
            </dl>
          </div>
        </div>
      </section>
    </>
  )
}
