#!/usr/bin/env node
// Gate: every .nvmrc must be a bare version, nothing else.
//
// The Cloudflare Pages build image feeds the WHOLE FILE to asdf as the version
// string, so a comment turns it into "22\n# ..." and node-build answers
// "definition not found: 22" - the build dies before npm runs. Caught in the
// real Pages log on 2026-11-19 (web/.nvmrc carried a comment block), and the
// same class bit vant at pass 338. A comment belongs in DEPLOY.md, not here.
//
// Only .nvmrc is checked. .npmrc is INI, so its # comments are real comments.

import { readdir, readFile } from 'node:fs/promises';
import { join, relative } from 'node:path';

const ROOT = process.cwd();
const SKIP = new Set(['node_modules', 'vendor', 'dist', '_site', '.git', '.jekyll-cache', 'pagefind']);
const VERSION = /^v?\d+(\.\d+){0,2}$/;

async function findNvmrc(dir, found = []) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    if (SKIP.has(entry.name)) continue;
    const full = join(dir, entry.name);
    if (entry.isDirectory()) await findNvmrc(full, found);
    else if (entry.name === '.nvmrc') found.push(full);
  }
  return found;
}

const files = await findNvmrc(ROOT);
const failures = [];

for (const file of files) {
  const rel = relative(ROOT, file);
  const raw = await readFile(file, 'utf8');
  const lines = raw.split('\n').filter((l) => l.trim() !== '');

  if (lines.length === 0) {
    failures.push(`${rel}: empty`);
    continue;
  }
  if (lines.length > 1) {
    failures.push(`${rel}: ${lines.length} non-blank lines - must hold one bare version (comments make asdf read the whole file)`);
    continue;
  }
  if (!VERSION.test(lines[0].trim())) {
    failures.push(`${rel}: "${lines[0].trim()}" is not a bare version (comments are not allowed in .nvmrc)`);
  }
}

if (failures.length) {
  for (const f of failures) console.error(`NVMRC: FAIL ${f}`);
  console.error(`\nKeep .nvmrc a single bare version. Put the rationale in DEPLOY.md.`);
  process.exit(1);
}

console.log(`NVMRC: PASS (${files.length} file(s), all bare versions)`);
