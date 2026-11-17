/**
 * pages/Home.jsx - the portfolio lander. The one-line thesis leads, then the
 * three-layer architecture story, then a path to work and contact. The copy is
 * the portfolio PRD's, tagged to the marketing PRD where it carries a number.
 */
import { Link } from 'react-router-dom'
import usePageMeta from '../hooks/usePageMeta.js'
import site, { routeMeta } from '../site.js'

export default function Home() {
  const meta = routeMeta('/')
  usePageMeta({ siteUrl: site.url, path: '/', title: meta.title, description: meta.description })
  return (
    <>
      <section className="hero">
        <div className="wrap">
          <p className="eyebrow">{site.name}</p>
          <h1>
            One system, not a list of repos:{' '}
            <span className="accent">deterministic guardrails, memory, and adversarial QA.</span>
          </h1>
          <p className="thesis">
            A vertically integrated, self-verifying software factory for
            AI-native software. Each tool is a layer of one idea: agent-written
            code needs the same discipline human-written code needs, and more
            of it, because the agent writes faster than a human reviews.
          </p>
          <div className="cta-row">
            <Link className="btn btn-primary" to="/work">See the work</Link>
            <Link className="btn btn-ghost" to="/world">The open-source family</Link>
            <a className="btn btn-ghost" href="https://docs.creadev.org">Read the docs</a>
          </div>
          <div className="pill-row">
            <span className="pill">web</span>
            <span className="pill">app</span>
            <span className="pill">ecom</span>
            <span className="pill">enterprise</span>
            <span className="pill">agent</span>
            <span className="pill">orchestration</span>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <h2>The system, in three layers</h2>
          <p className="sub">
            The family is one machine with three jobs. Each layer is a set of
            tools that refuse rather than warn.
          </p>
          <div className="arm-grid">
            <div className="arm-card">
              <span className="layer-chip">Agent OS and memory</span>
              <h3>Persistent, auditable memory</h3>
              <p>
                A memory and runtime for AI agents, over MCP: markdown files in
                your own repo, read at session start and written before it ends,
                so git history is the memory lineage.
              </p>
            </div>
            <div className="arm-card">
              <span className="layer-chip">Fleet governance</span>
              <h3>One manifest, one spec, one factory</h3>
              <p>
                The family governs itself: a roster manifest renders the
                crosslinks, a spec holds the contracts, and a factory mints the
                next member.
              </p>
            </div>
            <div className="arm-card">
              <span className="layer-chip">Adversarial QA</span>
              <h3>Attack the code, audit what shipped</h3>
              <p>
                Attack the handlers in-process, watch the pixels with a
                committed visual memory, audit the baked output, and publish
                with no drift.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <h2>The one sentence</h2>
          <p className="lede">
            <strong>packstruct</strong> approves what the packs declare,{' '}
            <strong>crashtest</strong> grades what the code does,{' '}
            <strong>eyestruct</strong> explains what the pixels show, and{' '}
            <strong>poststruct</strong> probes what actually shipped, while{' '}
            <strong>govstruct</strong> governs who the members are and{' '}
            <strong>monoforge</strong> mints the next one.
          </p>
          <div className="cta-row">
            <Link className="btn btn-primary" to="/work">See the proof</Link>
            <Link className="btn btn-ghost" to="/contribute">Get involved</Link>
          </div>
        </div>
      </section>
    </>
  )
}
