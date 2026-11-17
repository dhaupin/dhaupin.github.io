#!/usr/bin/env node
/**
 * fetch-projects.mjs - the roster bridge (labs/prd.md section 7).
 *
 * The governed roster is govstruct's job; until it serves an endpoint, the
 * marketable project list lives in dhaupin/creadev's src/data/projects.js
 * (a PRIVATE repo). This script fetches that file at a pinned commit with an
 * authenticated token, imports the `projects` array (a real ESM import, not a
 * regex), normalizes the fields, and writes docs/_data/projects.json with a
 * provenance header.
 *
 *   CREADEV_TOKEN=... node scripts/fetch-projects.mjs
 *   node scripts/fetch-projects.mjs --check   refuse if the committed data is stale
 *
 * Honesty rules (labs/prd.md section 7):
 *   - The raw projects.js is never republished; only the parsed public fields.
 *   - A parse miss is a FAILURE, not a silent empty grid.
 *   - If the fetch cannot run (no token) and no vendored snapshot exists, the
 *     script refuses loudly rather than shipping a blank page.
 *   - The provenance (source commit, fetch date, source sha256, count) is
 *     written into the JSON so a stale copy is visible, never silent.
 */
import { readFileSync, writeFileSync, existsSync, mkdtempSync, rmSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { tmpdir } from 'node:os'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { createHash } from 'node:crypto'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const OUT = join(ROOT, 'docs/_data/projects.json')
const VENDORED = join(ROOT, 'docs/_data/projects.vendored.json')
const REPO = 'dhaupin/creadev'
const SRC_PATH = 'src/data/projects.js'
const ORIGIN = 'https://creadev.org'
const CHECK = process.argv.includes('--check')

const sha256 = (s) => createHash('sha256').update(s).digest('hex')

const die = (msg) => {
  console.error(`fetch-projects: REFUSED - ${msg}`)
  process.exit(1)
}

async function gh(path, token) {
  const res = await fetch(`https://api.github.com/repos/${REPO}/${path}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/vnd.github.raw+json',
      'X-GitHub-Api-Version': '2022-11-28',
    },
  })
  if (!res.ok) die(`GitHub API ${res.status} for ${path} (is the token scoped to ${REPO}?)`)
  return res
}

async function fetchSource(token) {
  // Resolve HEAD to a concrete commit, then read the file AT that commit so the
  // provenance names an immutable ref, not a moving branch.
  const commitRes = await fetch(`https://api.github.com/repos/${REPO}/commits/HEAD`, {
    headers: { Authorization: `Bearer ${token}`, 'X-GitHub-Api-Version': '2022-11-28' },
  })
  if (!commitRes.ok) die(`GitHub API ${commitRes.status} resolving HEAD`)
  const commit = (await commitRes.json()).sha
  const fileRes = await gh(`contents/${SRC_PATH}?ref=${commit}`, token)
  const text = await fileRes.text()
  return { commit, text }
}

async function importProjects(text) {
  // Import the source as a real module: the parse cannot silently mis-read a
  // renamed field the way a regex can. A missing export is a failure.
  const dir = mkdtempSync(join(tmpdir(), 'creadev-projects-'))
  const file = join(dir, 'projects.mjs')
  writeFileSync(file, text)
  try {
    const mod = await import(pathToFileURL(file).href)
    if (!Array.isArray(mod.projects)) die(`${SRC_PATH} has no \`export const projects = [...]\` array`)
    return mod.projects
  } finally {
    rmSync(dir, { recursive: true, force: true })
  }
}

function normalize(projects) {
  const REQUIRED = ['id', 'name', 'section', 'status']
  const seen = new Set()
  return projects.map((p, i) => {
    for (const f of REQUIRED) {
      if (p[f] == null || p[f] === '') die(`project #${i} (${p.name || '?'}) is missing required field \`${f}\``)
    }
    if (seen.has(p.id)) die(`duplicate project id \`${p.id}\``)
    seen.add(p.id)
    return {
      id: p.id,
      name: p.name,
      url: p.url || null,
      github: p.github || null,
      npm: p.npm || null,
      version: p.version || null,
      tagline: p.tagline || '',
      description: p.description || '',
      tags: Array.isArray(p.tags) ? p.tags : [],
      status: p.status,
      section: p.section,
      // Image paths in the source are origin-relative (/img/...); make them absolute.
      image: p.image ? (p.image.startsWith('http') ? p.image : ORIGIN + p.image) : null,
    }
  })
}

function buildDoc(projects, provenance) {
  // A stable order: sections (open-source, proprietary, other), then name.
  const sectionRank = { 'open-source': 0, proprietary: 1, other: 2 }
  const sorted = [...projects].sort(
    (a, b) =>
      (sectionRank[a.section] ?? 9) - (sectionRank[b.section] ?? 9) ||
      a.name.localeCompare(b.name)
  )
  const counts = sorted.reduce((acc, p) => ((acc[p.section] = (acc[p.section] || 0) + 1), acc), {})
  return {
    _provenance: {
      source: `https://github.com/${REPO}/blob/${provenance.commit}/${SRC_PATH}`,
      sourceRepo: REPO,
      sourceCommit: provenance.commit,
      sourceSha256: provenance.sha256,
      fetched: provenance.fetched,
      count: sorted.length,
      counts,
      note: 'GENERATED by scripts/fetch-projects.mjs. Interim bridge to govstruct (labs/prd.md section 7). Do not hand-edit.',
    },
    projects: sorted,
  }
}

const token = process.env.CREADEV_TOKEN || process.env.GITHUB_TOKEN

if (!token) {
  if (existsSync(VENDORED)) {
    console.error('fetch-projects: no token; using the vendored snapshot (docs/_data/projects.vendored.json).')
    const vendored = readFileSync(VENDORED, 'utf8')
    if (CHECK) {
      if (readFileSync(OUT, 'utf8') === vendored) { console.log('fetch-projects:check: PASS (vendored, current)'); process.exit(0) }
      die('committed data differs from the vendored snapshot')
    }
    writeFileSync(OUT, vendored)
    console.log('fetch-projects: wrote docs/_data/projects.json from the vendored snapshot')
    process.exit(0)
  }
  die('no CREADEV_TOKEN and no vendored snapshot; cannot build the projects index')
}

const { commit, text } = await fetchSource(token)
const projects = await importProjects(text)
const doc = buildDoc(normalize(projects), {
  commit,
  sha256: sha256(text),
  fetched: new Date().toISOString().slice(0, 10),
})
const next = JSON.stringify(doc, null, 2) + '\n'

if (CHECK) {
  const prev = existsSync(OUT) ? readFileSync(OUT, 'utf8') : null
  if (prev === next) { console.log(`fetch-projects:check: PASS (${doc.projects.length} projects, ${commit.slice(0, 7)})`); process.exit(0) }
  die(`committed docs/_data/projects.json is stale (source moved to ${commit.slice(0, 7)})`)
}

writeFileSync(OUT, next)
console.log(`fetch-projects: wrote docs/_data/projects.json - ${doc.projects.length} projects at ${commit.slice(0, 7)} (${Object.entries(doc._provenance.counts).map(([k, v]) => `${v} ${k}`).join(', ')})`)
