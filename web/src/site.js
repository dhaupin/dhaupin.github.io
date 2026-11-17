/**
 * src/site.js - the web bundle's single accessor for the portfolio identity.
 *
 * The identity lives once, at the repo root (site.config.js). The docs half
 * reads the top-level fields; this half reads the `portfolio` block, so the two
 * brands cannot bleed into each other. Everything under web/src imports THIS
 * module, never a hardcoded literal, and the brand census gate holds the line.
 */
import config from '../../site.config.js'

const site = config.portfolio

export default site

/** The portfolio route entry for a path (meta source for a page component). */
export function routeMeta(path) {
  const route = site.routes.find((r) => r.path === path)
  return route ? route.meta : {}
}
