/**
 * pages/Privacy.jsx - what this site collects. The portfolio's honesty
 * standard: name the analytics, name the host, and admit what is not
 * configured. Same family legal form as the struct-family sites.
 */
import { Link } from 'react-router-dom'
import usePageMeta from '../hooks/usePageMeta.js'
import site, { routeMeta } from '../site.js'

export default function Privacy() {
  const meta = routeMeta('/privacy')
  usePageMeta({ siteUrl: site.url, path: '/privacy', title: meta.title, description: meta.description })
  return (
    <section className="section" style={{ paddingTop: 56 }}>
      <div className="wrap legal">
        <p className="eyebrow">The short version first</p>
        <h1>Privacy</h1>
        <p className="sub">
          No accounts, no newsletter, no advertising. Analytics run through
          Google Analytics 4 by way of Cloudflare Zaraz, named below. That is
          the whole picture.
        </p>
        <p className="updated">Last updated 2026-11-17.</p>

        <h2>This website</h2>
        <ul>
          <li><strong>No accounts, no newsletter, no advertising</strong> - there is nothing to sign up for and no ad profiles are built</li>
          <li><strong>Analytics: Google Analytics 4 via Cloudflare Zaraz</strong> - Zaraz is the tag manager, GA4 is the tag; it records page views and interactions and uses analytics cookies</li>
          <li><strong>Data is not sold</strong> - no data is sold, rented, or shared for advertising</li>
          <li><strong>Standard hosting logs</strong> - Cloudflare Pages may keep request logs (IP, timestamp); they are neither bought, queried, nor sold</li>
          <li><strong>Theme preference</strong> - your light/dark and paint-scheme choice is stored in your browser's localStorage and never leaves your machine</li>
        </ul>

        <h2>Consent</h2>
        <p>
          This site runs no ads and sells no data, so it follows the opt-out
          model where that applies. Where a region requires prior consent for
          analytics, nothing reaches Google Analytics until you accept, and a
          "Cookie settings" control is available to change that choice.
        </p>

        <h2>Third parties, named</h2>
        <p>
          This site runs on <a href="https://pages.cloudflare.com" target="_blank" rel="noopener">Cloudflare Pages</a>;
          analytics ride <a href="https://www.cloudflare.com/products/zaraz/" target="_blank" rel="noopener">Cloudflare Zaraz</a> and
          <a href="https://marketingplatform.google.com/about/analytics/" target="_blank" rel="noopener">Google Analytics 4</a>.
          The individual projects publish to npm and GitHub, whose own policies
          govern their own logging. No other third parties are involved.
        </p>

        <h2>Data retention</h2>
        <p>
          Nothing of yours to retain. The theme preference lives only in your
          browser until you clear it.
        </p>

        <h2>Questions</h2>
        <p>
          Open an issue on the <a href={site.repo} target="_blank" rel="noopener">repository</a>, or
          see the <Link to="/contact">contact page</Link>. The site source is
          open, so treat this page as a summary of code you can go read.
        </p>

        <p style={{ marginTop: 26 }}>
          <Link to="/" className="btn btn-ghost">Back home</Link>
          <Link to="/terms" className="btn btn-ghost" style={{ marginLeft: 10 }}>Terms</Link>
        </p>
      </div>
    </section>
  )
}
