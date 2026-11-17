/**
 * pages/Contribute.jsx - arm 4: how to get involved. What we expect, and the
 * invitation that you do not have to code: imagination is welcome
 * (labs/prd-dhaupin-portfolio.md section 4.4).
 */
import { Link } from 'react-router-dom'
import usePageMeta from '../hooks/usePageMeta.js'
import site, { routeMeta } from '../site.js'

export default function Contribute() {
  const meta = routeMeta('/contribute')
  usePageMeta({ siteUrl: site.url, path: '/contribute', title: meta.title, description: meta.description })
  return (
    <>
      <section className="hero">
        <div className="wrap">
          <p className="eyebrow">contribute</p>
          <h1>
            Bring imagination: <span className="accent">you do not have to write code.</span>
          </h1>
          <p className="lede">
            The family grows through ideas as much as through patches. If you
            have a use case, an edge case, or a wild notion, that is a
            contribution. If you write code, even better.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <h2>What we expect</h2>
          <div className="expect">
            <ul>
              <li><strong>Receipts over vibes</strong> - a claim arrives with a source, or it is marked as a direction, not a fact.</li>
              <li><strong>Deterministic over clever</strong> - a gate that fails loudly beats a check that passes mysteriously.</li>
              <li><strong>Plain verbs</strong> - say what the thing does; skip the superlatives.</li>
              <li><strong>Small and focused</strong> - one change, one reason, one review.</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <h2>Ways in</h2>
          <div className="ways">
            <ul>
              <li><strong>File an issue</strong> - a bug, a request, or a use case on any repo. The tracker is checked.</li>
              <li><strong>Open a pull request</strong> - the family law is local commits and honest diffs; PRs target the staging branch.</li>
              <li><strong>Bring an idea</strong> - a scenario for the adversarial packs, a page worth pinning, a spec worth writing. No code required.</li>
              <li><strong>Test in the wild</strong> - run a tool on your own project and tell us what broke. That report is worth more than a star.</li>
            </ul>
          </div>
          <div className="cta-row" style={{ marginTop: 26 }}>
            <a className="btn btn-primary" href="https://github.com/dhaupin">Browse the org</a>
            <Link className="btn btn-ghost" to="/world">See the projects</Link>
          </div>
        </div>
      </section>
    </>
  )
}
