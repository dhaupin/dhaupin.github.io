/**
 * site.config.js - THE repo identity, authored once, read everywhere.
 *
 * This is the one file an identity edit touches. The surfaces that cannot
 * import JS are GENERATED from it by `npm run sync` (docs/_config.yml,
 * docs/freestruct.config.yml, web/public/robots.txt, web/public/site.webmanifest,
 * and the CNAME pair); a hand edit there is drift and fails `npm run sync:check`.
 *
 * The repo carries TWO sites (see labs/prd.md). The top-level fields name the
 * DOCS half: the docs hub at docs.creadev.org. The `portfolio` block below
 * names the personal half: the dhaupin portfolio at dhaupin.creadev.org, built
 * by the `web/` tree. The docs half reads the top-level fields; the web half
 * reads `portfolio`. Each half has its own wordmark, tagline, palette, nav, and
 * routes, so the two brands cannot bleed into each other.
 *
 * Named site.config.js, not coreforge.config.js, on purpose: the config is
 * named for the CONCERN (the site), never the tool (the derivation model,
 * coreforge PRD 5.1).
 */
export default {
  // --- identity (the docs hub) --------------------------------------------
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

  // --- the family menu (docs sidebar, external groups) --------------------
  // The external groups the docs sidebar renders below the hub's own pages:
  // each family member keeps its own docs at its own host, and this hub links
  // them. Generated into docs/_data/family.yml (a nav.yml sibling) so the
  // URLs live here, not as literals in a hand-kept data file.
  family: [
    {
      title: 'The family',
      items: [
        { title: 'coreforge', url: 'https://coreforge.creadev.org' },
        { title: 'monoforge', url: 'https://monoforge.creadev.org' },
        { title: 'freestruct', url: 'https://freestruct.creadev.org' },
        { title: 'prestruct', url: 'https://prestruct.creadev.org' },
        { title: 'packstruct', url: 'https://packstruct.creadev.org' },
        { title: 'crashtest', url: 'https://crashtest.creadev.org' },
        { title: 'poststruct', url: 'https://poststruct.creadev.org' },
        { title: 'eyestruct', url: 'https://eyestruct.creadev.org' },
        { title: 'govstruct', url: 'https://govstruct.creadev.org' },
        { title: 'vant', url: 'https://vant.creadev.org' },
      ],
    },
    {
      title: 'Elsewhere',
      items: [
        { title: 'creadev.org', url: 'https://creadev.org' },
        { title: 'GitHub', url: 'https://github.com/dhaupin' },
      ],
    },
  ],

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
    // The shared/base default. Petrol is the block-less base tokens and
    // SCHEMES[0] (the parity gate keys on that), so it stays the default for
    // the docs half. The portfolio overrides it in its own block below.
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

  // --- portfolio (the personal half, web/) --------------------------------
  // The dhaupin portfolio: a personal, art-led site built by the `web/` tree
  // and deployed to Cloudflare Pages. It carries its own identity (wordmark,
  // tagline, palette, nav, routes) so it never reads as the docs system.
  //
  // The web half's adapter (web/ssr.config.js) imports THIS block, so the
  // portfolio's SEO tags, prerender route list, and nav all derive from here.
  // The docs half never reads this block; the two brands stay separate.
  portfolio: {
    name: 'dhaupin',
    // One color, no split: the whole wordmark rides the accent token (the
    // first color the split form used). An empty `rest` means the Nav renders
    // a single .brand-accent span.
    wordmark: { accent: 'dhaupin', rest: '' },
    // The portfolio's default paint scheme (docs keeps the shared petrol).
    // Jade is a preset, not the block-less base, so this changes only which
    // preset a first visit lands on - never the token structure.
    defaultScheme: 'jade',
    badge: '',
    tagline: 'I build web, app, ecom, enterprise, agent, and orchestration things.',
    description:
      'The dhaupin portfolio: a vertically integrated, self-verifying software factory, and the open-source family behind it.',
    url: 'https://dhaupin.creadev.org',
    repo: 'https://github.com/dhaupin/dhaupin.github.io',
    author: 'dhaupin',
    license: 'MIT',
    keywords:
      'dhaupin, portfolio, creadev, agent, orchestration, web development, open source, struct family',
    maker: { label: 'Rook @ Creadev.org', url: 'https://creadev.org' },
    org: { name: 'Creadev.org', url: 'https://creadev.org' },
    // The contact address (web-exposed, bot-hidden by the ObfuscatedContact
    // component, which assembles the real mailto in the browser). The legal
    // copy and the shared CTA both read this one field.
    contact: { user: 'hello', domain: 'creadev.org' },

    // The portfolio's own nav vocabulary (distinct from the docs nav). 'site'
    // entries are internal routes (NavLink-active); 'out' entries are external
    // surfaces (the header GitHub icon replaces the label there).
    nav: [
      { label: 'Home', to: '/', end: true, group: 'site' },
      { label: 'Work', to: '/work', group: 'site' },
      { label: 'Play', to: '/play', group: 'site' },
      { label: 'World', to: '/world', group: 'site' },
      { label: 'Contribute', to: '/contribute', group: 'site' },
      { label: 'Contact', to: '/contact', group: 'site' },
      { label: 'Docs', href: 'https://docs.creadev.org', group: 'out' },
      { label: 'GitHub', href: 'https://github.com/dhaupin', group: 'out' },
    ],
    // Footer-only extras (legal + provenance).
    footerExtras: [
      { label: 'Docs hub', href: 'https://docs.creadev.org' },
      { label: 'Terms', href: '/terms' },
      { label: 'Privacy', href: '/privacy' },
    ],

    // One entry per Route in web/src/AppLayout.jsx; drives the sitemap, the
    // prerender list, and the per-page meta.
    routes: [
      {
        path: '/',
        priority: '1.0',
        changefreq: 'monthly',
        meta: {
          title: 'dhaupin - web, app, ecom, enterprise, agent, orchestration',
          description:
            'A vertically integrated, self-verifying software factory: deterministic guardrails, persistent memory, and adversarial QA for AI-native software.',
        },
      },
      {
        path: '/work',
        priority: '0.9',
        changefreq: 'monthly',
        meta: {
          title: 'Work | dhaupin',
          description:
            'The professional story: what dhaupin builds, the range (web, app, ecom, enterprise, agent, orchestration), and the proof.',
        },
      },
      {
        path: '/play',
        priority: '0.6',
        changefreq: 'monthly',
        meta: {
          title: 'Play | dhaupin',
          description:
            'The wild half: experiments, games, art, and things built for the joy of it.',
        },
      },
      {
        path: '/world',
        priority: '0.6',
        changefreq: 'monthly',
        meta: {
          title: 'World | dhaupin',
          description:
            'Contributing to the world: helping developers, giving abilities to agents, and making consistent seams and flow.',
        },
      },
      {
        path: '/contribute',
        priority: '0.6',
        changefreq: 'monthly',
        meta: {
          title: 'Contribute | dhaupin',
          description:
            'How to get involved: what we expect, and the invitation that you do not have to code. Imagination is welcome.',
        },
      },
      {
        path: '/contact',
        priority: '0.7',
        changefreq: 'monthly',
        meta: {
          title: 'Contact | dhaupin',
          description: 'How to reach dhaupin, and where to file an issue or open a pull request.',
        },
      },
      {
        path: '/terms',
        priority: '0.3',
        changefreq: 'yearly',
        meta: {
          title: 'Terms | dhaupin',
          description:
            'The plain-language terms of use for the dhaupin portfolio site: what it is, how you may use it, and what it does not promise.',
        },
      },
      {
        path: '/privacy',
        priority: '0.3',
        changefreq: 'yearly',
        meta: {
          title: 'Privacy | dhaupin',
          description:
            'What this site collects: no accounts and no ads, analytics via Google Analytics 4 through Cloudflare Zaraz, and little else.',
        },
      },
    ],

    // The static 404 the host serves every miss; the shape + copy match
    // web/src/pages/NotFound.jsx so the host-not-found and the hydrate-not-found
    // read as one page, not two.
    notFound: {
      heading: '404',
      body: 'That page does not exist here.',
      primaryCta: { label: 'Back home', href: '/' },
    },
  },
}
