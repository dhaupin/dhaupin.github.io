/**
 * src/theme.js
 * The two theme axes as data: light/dark and the paint scheme. Shared by
 * ThemeSwitch + SchemeSwitch and mirrored by index.html's pre-paint bootstrap
 * (keep the key names and the paper map in sync with it).
 *
 * The protocol constants are repo-wide (both halves share them), so they read
 * the top-level `theme` block of site.config.js, not the portfolio block.
 */
import config from '../../site.config.js'

// Protocol constants (NOT brand): the localStorage keys the bootstrap and both
// switches share. They live in site.config.js so one place names them.
export const THEME_KEY = config.theme.themeKey
export const SCHEME_KEY = config.theme.schemeKey

// The shipped presets. Petrol is the block-less base tokens and stays first
// (the theme-parity gate keys the default off SCHEMES[0]); the portfolio keeps
// the family palette and lets the art carry the wildness.
export const SCHEMES = ['petrol', 'golden', 'jade']

// The scheme a first visit lands on. This is the portfolio's choice (docs
// keeps the shared petrol), so it reads the portfolio block. It is applied
// only when nothing is persisted, and it never changes the token structure -
// jade is a preset on top of the base.
export const DEFAULT_SCHEME = SCHEMES.includes(config.portfolio.defaultScheme)
  ? config.portfolio.defaultScheme
  : SCHEMES[0]

// Each scheme's paper value per half - the one place a scheme touches the
// browser chrome (the theme-color meta / mobile URL bar).
const PAPER = {
  petrol: { dark: '#0a1113', light: '#edf3f2' },
  golden: { dark: '#121011', light: '#f6f1e7' },
  jade:   { dark: '#121011', light: '#f6f1e7' },
}

export function paperFor(name, light) {
  return (PAPER[name] || PAPER.petrol)[light ? 'light' : 'dark']
}
