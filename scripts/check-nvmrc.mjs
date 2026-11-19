#!/usr/bin/env node
// Gate: every .nvmrc must hold one fully-qualified node version.
//
// The Cloudflare Pages build image reads .nvmrc through asdf -> node-build, and
// node-build resolves definitions by EXACT filename: share/node-build/22.23.4
// exists, `22` and `22.23` do not. Two ways this file breaks a build, both
// caught in real Pages logs:
//
//   1. Comments. asdf feeds the WHOLE FILE as the version string, so a comment
//      becomes part of it and node-build answers `definition not found: 22`
//      with the comment text spilling out after it (2026-11-19, web/).
//   2. A partial version. `22` is a valid nvm alias but NOT a node-build
//      definition, so a bare major fails the same way even with no comments.
//      nvm accepts it, asdf does not - which is why this cannot be eyeballed.
//
// So: one line, exact x.y.z, no comments. Rationale belongs in DEPLOY.md.
// .npmrc is deliberately not checked - npm parses it as INI, where # is a real
// comment, so the two files have different contracts.

import { readdir, readFile } from 'node:fs/promises';
import { join, relative } from 'node:path';

const ROOT = process.cwd();
const SKIP = new Set(['node_modules', 'vendor', 'dist', '_site', '.git', '.jekyll-cache', 'pagefind']);
const EXACT = /^v?\d+\.\d+\.\d+$/;

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
  } else if (lines.length > 1) {
    failures.push(`${rel}: ${lines.length} non-blank lines - asdf reads the whole file as the version, so comments break it`);
  } else if (!EXACT.test(lines[0].trim())) {
    const v = lines[0].trim();
    const hint = /^v?\d+(\.\d+)?$/.test(v) ? ' - node-build has no partial definitions, pin x.y.z' : '';
    failures.push(`${rel}: "${v}" is not an exact x.y.z version${hint}`);
  }
}

if (failures.length) {
  for (const f of failures) console.error(`NVMRC: FAIL ${f}`);
  console.error(`\nOne bare x.y.z per .nvmrc, no comments. Rationale goes in DEPLOY.md.`);
  process.exit(1);
}

console.log(`NVMRC: PASS (${files.length} file(s), all exact versions)`);
