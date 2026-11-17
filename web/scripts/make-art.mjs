#!/usr/bin/env node
/**
 * web/scripts/make-art.mjs - generates the portfolio's icon set and OG card
 * from an authored mark, deterministically. Same inputs, same bytes.
 *
 * The PRD (section 6) leaves the art direction open: "Family palette, personal
 * art" is one named direction, and it is the one v1 takes - the family tokens
 * carry the palette and this authored mark carries the personality. No raster
 * source art exists yet, so the mark is DRAWN here rather than traced; when the
 * owner drops a real logo, swap this for the family's adopt-icons pipeline
 * (coreforge web/scripts/adopt-icons.mjs) and this script retires.
 *
 * Outputs (all in web/public/):
 *   icon.svg, icon-192.png, icon-512.png, apple-touch-icon.png, favicon-32.png
 *   og-image.png (1200x630)
 *
 * Reproduce (build-local helper, no lockfile change):
 *   cd web
 *   npm i --no-save @resvg/resvg-js dejavu-fonts-ttf
 *   node scripts/make-art.mjs
 */
import { Resvg } from '@resvg/resvg-js'
import { createRequire } from 'node:module'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const require = createRequire(import.meta.url)
const HERE = path.dirname(fileURLToPath(import.meta.url))
const REPO = path.join(HERE, '..', '..')
const PUB = path.join(REPO, 'web', 'public')

// Identity from the one source (the portfolio block of site.config.js).
const site = (await import(path.join(REPO, 'site.config.js'))).default.portfolio

// The family token palette (mirrors web/src/styles.css :root).
const C = {
  tile: '#0a1113',
  paper: '#0a1113',
  surface: '#0f191c',
  raised: '#152126',
  ink: '#e3eaec',
  soft: '#8ba3aa',
  accent: '#8894f4',
  accentDeep: '#6d7bdc',
  moss: '#35c38e',
  line: '#1b2c31',
}

// --- the mark: an orbit (the flow between tools) in the family palette ----
const markSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <rect width="64" height="64" rx="14" fill="${C.tile}"/>
  <ellipse cx="32" cy="32" rx="21" ry="12" fill="none" stroke="${C.accent}" stroke-width="3.2" transform="rotate(-28 32 32)"/>
  <circle cx="32" cy="32" r="7" fill="${C.ink}"/>
  <circle cx="32" cy="32" r="3.1" fill="${C.tile}"/>
  <circle cx="48.4" cy="20.4" r="4.2" fill="${C.moss}"/>
</svg>
`

// --- the OG card (1200x630), token palette, identity from site.config.js --
const host = site.url.replace(/^https?:\/\//, '')
const resolveTtf = (name) =>
  path.join(path.dirname(require.resolve('dejavu-fonts-ttf/package.json')), 'ttf', name)

const ogSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="${C.paper}"/>
  <rect width="1200" height="8" fill="${C.accent}"/>
  <rect x="60" y="96" width="1080" height="438" rx="16" fill="${C.surface}" stroke="${C.line}" stroke-width="2"/>
  <g transform="translate(110,176) scale(1.6)">
    <rect width="64" height="64" rx="14" fill="${C.tile}"/>
    <ellipse cx="32" cy="32" rx="21" ry="12" fill="none" stroke="${C.accent}" stroke-width="3.2" transform="rotate(-28 32 32)"/>
    <circle cx="32" cy="32" r="7" fill="${C.ink}"/>
    <circle cx="32" cy="32" r="3.1" fill="${C.tile}"/>
    <circle cx="48.4" cy="20.4" r="4.2" fill="${C.moss}"/>
  </g>
  <text x="230" y="210" font-family="DejaVu Sans" font-size="64" font-weight="bold" fill="${C.ink}">${site.wordmark.accent}<tspan fill="${C.accent}">${site.wordmark.rest}</tspan></text>
  <text x="232" y="262" font-family="DejaVu Sans" font-size="26" fill="${C.soft}">${site.tagline}</text>
  <text x="110" y="440" font-family="DejaVu Sans" font-size="24" fill="${C.ink}">web - app - ecom - enterprise - agent - orchestration</text>
  <text x="110" y="486" font-family="DejaVu Sans" font-size="22" fill="${C.soft}">${host}</text>
</svg>
`

// --- rasterize ------------------------------------------------------------
const png = (svg, width) => new Resvg(svg, { fitTo: { mode: 'width', value: width }, font: {
  fontFiles: [resolveTtf('DejaVuSans.ttf'), resolveTtf('DejaVuSans-Bold.ttf')],
  loadSystemFonts: false,
} }).render().asPng()

fs.writeFileSync(path.join(PUB, 'icon.svg'), markSvg)
for (const [name, size] of Object.entries({ 'icon-512.png': 512, 'icon-192.png': 192, 'apple-touch-icon.png': 180, 'favicon-32.png': 32 })) {
  fs.writeFileSync(path.join(PUB, name), png(markSvg, size))
}
fs.writeFileSync(path.join(PUB, 'og-image.png'), png(ogSvg, 1200))

console.log(`art written: ${PUB} (icon.svg + 4 png + og-image.png)`)
