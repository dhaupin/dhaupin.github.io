/**
 * pages/Contact.jsx - arm 5: how to reach me. A preference ladder (the project
 * tracker first, the docs hub for how-to, email last for things that are
 * genuinely private), plus the care note about response times.
 * Source: labs/prd-dhaupin-portfolio.md section 4.5.
 */
import { Link } from 'react-router-dom'
import usePageMeta from '../hooks/usePageMeta.js'
import site, { routeMeta } from '../site.js'
import ObfuscatedContact from '../components/ObfuscatedContact.jsx'

export default function Contact() {
  const meta = routeMeta('/contact')
  usePageMeta({ siteUrl: site.url, path: '/contact', title: meta.title, description: meta.description })
  return (
    <>
      <section className="hero">
        <div className="wrap">
          <p className="eyebrow">contact</p>
          <h1>
            The shortest path is the tracker: <span className="accent">email for the rest.</span>
          </h1>
          <p className="lede">
            Most things belong in a public issue where everyone can follow
            along. For the rest, email works.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <h2>Where to put it</h2>
          <div className="arm-grid">
            <div className="arm-card">
              <h3>1. A bug or a request</h3>
              <p>Open an issue on the repo it belongs to. It is checked, and the answer helps the next person too.</p>
              <a className="btn btn-ghost" href="https://github.com/dhaupin">Open the org</a>
            </div>
            <div className="arm-card">
              <h3>2. How does this work?</h3>
              <p>The docs hub is the front door to every project's documentation.</p>
              <a className="btn btn-ghost" href="https://docs.creadev.org">Read the docs</a>
            </div>
            <div className="arm-card">
              <h3>3. Something private</h3>
              <p>A project, a collaboration, or anything that does not belong in public.</p>
              <p><ObfuscatedContact /></p>
            </div>
          </div>

          <div className="care-note">
            <strong>On response times:</strong> this is a working shop, not a
            support desk. Issues and email are read, and a real person answers,
            but not always the same day. If it is urgent, say so in the subject.
          </div>

          <div className="cta-row">
            <Link className="btn btn-primary" to="/work">See the work</Link>
            <Link className="btn btn-ghost" to="/contribute">Contribute instead</Link>
          </div>
        </div>
      </section>
    </>
  )
}
