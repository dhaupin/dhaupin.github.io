/**
 * site.config.js - THE repo identity, authored once, read everywhere.
 *
 * This is the one file an identity edit touches. The docs surfaces that cannot
 * import JS are GENERATED from it by `npm run sync` (docs/_config.yml,
 * docs/freestruct.config.yml); a hand edit there is drift and fails
 * `npm run sync:check`.
 *
 * The repo carries two sites (see labs/prd.md). This file names the DOCS half
 * today: the docs hub at docs.creadev.org. The portfolio half is reserved a
 * `portfolio` block (labs/prd.md section 6) that lands with the `web/` tree;
 * until then the top-level fields are the hub's alone, so nothing is ambiguous.
 *
 * Named site.config.js, not coreforge.config.js, on purpose: the config is
 * named for the CONCERN (the site), never the tool (the derivation model,
 * coreforge PRD 5.1).
 */
export default {
  // --- identity -----------------------------------------------------------
  name: 'creadev docs',
  wordmark: { accent: 'creadev', rest: ' docs' },
  tagline: 'One front door to the family docs.',
  description:
    'The front door to the Creadev docs system: a lander, a projects index, and one search that reaches the whole struct family.',
  url: 'https://docs.creadev.org',
  repo: 'https://github.com/dhaupin/dhaupin.github.io',
  author: 'dhaupin',
  license: 'MIT',
  keywords:
    'creadev, docs, documentation, struct-family, jekyll, pagefind, freestruct, github-pages',

  // The maker line + org (the docs layout's footer provenance row).
  maker: { label: 'Rook @ Creadev.org', url: 'https://creadev.org' },
  org: { name: 'Creadev.org', url: 'https://creadev.org' },

  // --- docs ---------------------------------------------------------------
  // docsUrl is the full public docs URL; docsHost is the Jekyll `url`. The hub
  // is the ROOT of docs.creadev.org (baseurl empty), unlike a project docs site
  // that lives at a subpath.
  docs: {
    title: 'creadev docs',
    url: 'https://docs.creadev.org',
    host: 'https://docs.creadev.org',
    baseurl: '',
  },

  // --- theme --------------------------------------------------------------
  // The two axes as data. themeKey/schemeKey are protocol constants shared by
  // the pre-paint bootstrap and both switches - NOT brand, so they stay stable
  // across rebrands.
  theme: {
    themeKey: 'site-theme',
    schemeKey: 'site-paint-scheme',
    defaultMode: 'light',
    defaultScheme: 'petrol',
  },

  // --- nav vocabulary -----------------------------------------------------
  // The docs sidebar's groups live in docs/_data/nav.yml (a hand-authored
  // starter, per the coreforge rig). This list is the header/footer vocabulary
  // the two hosts share.
  nav: [
    { label: 'Home', to: '/', end: true, group: 'site' },
    { label: 'Projects', to: '/projs', group: 'site' },
    { label: 'Search', to: '/search', group: 'site' },
    { label: 'GitHub', href: 'https://github.com/dhaupin/dhaupin.github.io', group: 'out' },
  ],

  // --- routes -------------------------------------------------------------
  // One entry per docs page; drives the sitemap priorities and the per-page
  // meta defaults. The page frontmatter may override title/description.
  routes: [
    {
      path: '/',
      priority: '1.0',
      changefreq: 'weekly',
      meta: {
        title: 'creadev docs - the front door to the family docs',
        description:
          'The Creadev docs system hub: a lander, a projects index, and one search across the struct family.',
      },
    },
    {
      path: '/projs',
      priority: '0.8',
      changefreq: 'weekly',
      meta: {
        title: 'Projects | creadev docs',
        description: 'The marketable projects in the struct family, from governed roster data.',
      },
    },
    {
      path: '/search',
      priority: '0.5',
      changefreq: 'monthly',
      meta: {
        title: 'Search | creadev docs',
        description: 'One search across the Creadev docs hub.',
      },
    },
  ],
}
