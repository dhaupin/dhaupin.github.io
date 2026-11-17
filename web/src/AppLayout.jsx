/** AppLayout - the shell layout (no BrowserRouter ever in this file). */
import { Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { mountIslands } from './islands.js'
import { islands }      from './AppIslands.jsx'
import Nav from './components/Nav.jsx'
import Footer from './components/Footer.jsx'
import Home from './pages/Home.jsx'
import Work from './pages/Work.jsx'
import Play from './pages/Play.jsx'
import World from './pages/World.jsx'
import Contribute from './pages/Contribute.jsx'
import Contact from './pages/Contact.jsx'
import Terms from './pages/Terms.jsx'
import Privacy from './pages/Privacy.jsx'
import NotFound from './pages/NotFound.jsx'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    if (typeof window !== 'undefined') window.scrollTo({ top: 0, behavior: 'instant' })
    const t = setTimeout(() => mountIslands(islands), 0)
    return () => clearTimeout(t)
  }, [pathname])
  return null
}

export default function AppLayout() {
  return (
    <>
      <ScrollToTop />
      <Nav />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/work" element={<Work />} />
          <Route path="/play" element={<Play />} />
          <Route path="/world" element={<World />} />
          <Route path="/contribute" element={<Contribute />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<Privacy />} />
          {/* one Route per ssr.config.js entry (from site.config.js routes) */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </>
  )
}
