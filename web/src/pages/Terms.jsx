/**
 * pages/Terms.jsx - the plain-language terms for the portfolio site. Same
 * family legal form as the struct-family sites (crashtest/eyestruct), adapted
 * to this identity.
 */
import { Link } from 'react-router-dom'
import usePageMeta from '../hooks/usePageMeta.js'
import site, { routeMeta } from '../site.js'

export default function Terms() {
  const meta = routeMeta('/terms')
  usePageMeta({ siteUrl: site.url, path: '/terms', title: meta.title, description: meta.description })
  return (
    <section className="section" style={{ paddingTop: 56 }}>
      <div className="wrap legal">
        <p className="eyebrow">The short version first</p>
        <h1>Terms</h1>
        <p className="sub">
          This is a personal portfolio and the public home of an open-source
          family. Use it, read it, link to it. Do not attack it, and do not
          take the copy as a contract for work.
        </p>
        <p className="updated">Last updated 2026-11-17.</p>

        <h2>What this site is</h2>
        <ul>
          <li><strong>A portfolio</strong> - it describes what {site.author} builds and links to the projects</li>
          <li><strong>A pointer</strong> - the open-source tools live in their own repos, each under its own license</li>
          <li><strong>Not an offer</strong> - nothing here is a quote, a bid, or a promise of service</li>
        </ul>

        <h2>Use of the site</h2>
        <ul>
          <li><strong>Read and share</strong> - you may read it, link to it, and quote it with attribution</li>
          <li><strong>No abuse</strong> - no scraping that degrades the service, no attacks, no attempts to break the hosting</li>
          <li><strong>The code</strong> - the site source is open; the licenses of the individual projects govern their code</li>
        </ul>

        <h2>Content and accuracy</h2>
        <ul>
          <li><strong>Provided as is</strong> - the site is offered without warranty of any kind</li>
          <li><strong>Numbers dated</strong> - figures carry a source and a date; treat anything older as stale</li>
          <li><strong>No liability</strong> - not liable for any loss arising from use of the site or the linked tools</li>
        </ul>

        <h2>Changes</h2>
        <p>
          These terms may change as the site does. The date above is the last
          revision; there is no other notice.
        </p>

        <h2>Questions</h2>
        <p>
          Open an issue on the <a href={site.repo} target="_blank" rel="noopener">repository</a>, or
          see the <Link to="/contact">contact page</Link>.
        </p>

        <p style={{ marginTop: 26 }}>
          <Link to="/" className="btn btn-ghost">Back home</Link>
          <Link to="/privacy" className="btn btn-ghost" style={{ marginLeft: 10 }}>Privacy</Link>
        </p>
      </div>
    </section>
  )
}
