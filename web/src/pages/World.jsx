/**
 * pages/World.jsx - arm 3: contributing to the world. The open-source family
 * as a public good, not a sales channel: helping developers, giving abilities
 * to agents, consistent seams and flow. Sources: labs/prd-dhaupin-portfolio.md
 * section 4.3, labs/prd-marketing.md section 8.1.
 */
import { Link } from 'react-router-dom'
import usePageMeta from '../hooks/usePageMeta.js'
import site, { routeMeta } from '../site.js'

const REPOS = [
  { name: 'vant', href: 'https://vant.creadev.org', note: 'Memory for agents, over MCP.' },
  { name: 'crashtest', href: 'https://crashtest.creadev.org', note: 'Adversarial QA for real handlers.' },
  { name: 'eyestruct', href: 'https://eyestruct.creadev.org', note: 'Eyes and a committed visual memory.' },
  { name: 'poststruct', href: 'https://poststruct.creadev.org', note: 'Audit what actually shipped.' },
  { name: 'govstruct', href: 'https://govstruct.creadev.org', note: 'The governed roster of the family.' },
  { name: 'freestruct', href: 'https://freestruct.creadev.org', note: 'Zero-drift publishing and discovery.' },
  { name: 'prestruct', href: 'https://prestruct.creadev.org', note: 'Build-time prerender for Vite + React.' },
  { name: 'coreforge', href: 'https://coreforge.creadev.org', note: 'The rig the family ships sites from.' },
]

export default function World() {
  const meta = routeMeta('/world')
  usePageMeta({ siteUrl: site.url, path: '/world', title: meta.title, description: meta.description })
  return (
    <>
      <section className="hero">
        <div className="wrap">
          <p className="eyebrow">world</p>
          <h1>
            Give back where it helps: <span className="accent">developers, agents, and the seams between them.</span>
          </h1>
          <p className="lede">
            The open-source family is a public good here, not a funnel. The
            tools exist to make an engineer's day better and to give agents
            abilities they did not have.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <h2>Three claims, each true today</h2>
          <div className="arm-grid">
            <div className="arm-card">
              <h3>Helping developers</h3>
              <p>
                Deterministic gates that fail loudly, honest verdicts instead of
                generated green, and less glue code between build and ship.
              </p>
            </div>
            <div className="arm-card">
              <h3>Giving abilities to agents</h3>
              <p>
                What an agent can do once it has memory and contracts: a memory
                over MCP, a ROM spec, and an interchange format. Capability, not
                hype.
              </p>
            </div>
            <div className="arm-card">
              <h3>Consistent seams and flow</h3>
              <p>
                The joins between tools should be predictable, and the flow from
                build to ship should not leak. That is the whole thesis, turned
                outward.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <h2>The projects</h2>
          <p className="sub">Each keeps its own docs at its own host. Start anywhere.</p>
          <div className="arm-grid">
            {REPOS.map((r) => (
              <div className="arm-card" key={r.name}>
                <h3><a href={r.href}>{r.name}</a></h3>
                <p>{r.note}</p>
              </div>
            ))}
          </div>
          <div className="cta-row" style={{ marginTop: 26 }}>
            <a className="btn btn-primary" href="https://docs.creadev.org">Browse the docs hub</a>
            <Link className="btn btn-ghost" to="/contribute">Contribute</Link>
          </div>
        </div>
      </section>
    </>
  )
}
