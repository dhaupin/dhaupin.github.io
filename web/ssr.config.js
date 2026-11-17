/**
 * ssr.config.js - the prestruct engine's config, DERIVED from site.config.js.
 *
 * This file is an ADAPTER, not a second source of truth: it imports the one
 * identity file and reads its `portfolio` block into what prestruct expects
 * (siteUrl, siteName, routes, notFound). prestruct reads exactly what it always
 * read, so the engine needs no change. Edit site.config.js, not this file.
 *
 * Filled by `prestruct build` (inject-brand + prerender): the site's SEO tags
 * and route list. One route entry per Route in src/AppLayout.jsx.
 */
import site from '../site.config.js'

const p = site.portfolio

export default {
  siteUrl: p.url,
  siteName: p.name,
  breadcrumb: true,
  author: p.author,
  tagline: p.tagline,
  // The object form carries the image's dimensions + alt text, so the baked
  // og:image tags are complete (the SEO audit warns without them).
  ogImage: {
    url: `${p.url}/og-image.png`,
    width: 1200,
    height: 630,
    alt: `${p.name} - ${p.tagline}`,
    type: 'image/png',
  },
  keywords: p.keywords,
  routes: p.routes,
  notFound: p.notFound,
}
