/**
 * pages/Play.jsx - arm 2: the wild half. Experiments, games, art, and things
 * built for the joy of it. The section is a canvas, not a list
 * (labs/prd-dhaupin-portfolio.md section 4.2). Candidates are open by owner
 * direction; the tiles below are placeholders for the art that will land.
 */
import { Link } from 'react-router-dom'
import usePageMeta from '../hooks/usePageMeta.js'
import site, { routeMeta } from '../site.js'

export default function Play() {
  const meta = routeMeta('/play')
  usePageMeta({ siteUrl: site.url, path: '/play', title: meta.title, description: meta.description })
  return (
    <>
      <section className="hero">
        <div className="wrap">
          <p className="eyebrow">play</p>
          <h1>
            The wild half: <span className="accent">built for the joy of it.</span>
          </h1>
          <p className="lede">
            Not everything needs a business case. This is where experiments,
            games, generative work, and art live - the part that earns the word
            "art based."
          </p>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <h2>The canvas</h2>
          <p className="sub">A few directions in flight. Content lands as the art is ready.</p>
          <div className="gallery">
            <div className="tile"><h3>Worlds and games</h3><p>World-building and interactive play - the synmergia line of work.</p></div>
            <div className="tile"><h3>Generative and steganographic</h3><p>Experiments in generated and hidden-in-plain-sight imagery.</p></div>
            <div className="tile"><h3>Art packs</h3><p>Visual work and assets, shipped as packs.</p></div>
            <div className="tile"><h3>Toys and demos</h3><p>Small things built to see if they are fun, then kept if they are.</p></div>
          </div>
          <div className="cta-row" style={{ marginTop: 26 }}>
            <Link className="btn btn-ghost" to="/world">The open-source family</Link>
            <Link className="btn btn-ghost" to="/contact">Say hello</Link>
          </div>
        </div>
      </section>
    </>
  )
}
