#!/usr/bin/env bash
# build.sh - the local mirror of the docs lane's build order.
#
# The docs lane (.github/workflows/docs-deploy.yml -> dhaupin/freestruct
# docs-lane.yml) runs: Jekyll renders, freestruct injects over the rendered
# HTML, pagefind indexes what will actually ship. This script runs the same
# order locally so a contributor can prove the hub before pushing.
#
# It does NOT deploy. The lane owns the Pages artifact upload and the
# main-gated deploy job.
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

# bundler lands in the user gem dir on some boxes; make it findable.
export PATH="$HOME/.local/share/gem/ruby/3.3.0/bin:$PATH"

echo "== sync (site.config.js -> docs/_config.yml, docs/freestruct.config.yml) =="
node scripts/sync.mjs

echo "== Jekyll render =="
( cd docs && bundle install --quiet && bundle exec jekyll build )

echo "== freestruct (post-build SEO, strict) =="
node node_modules/freestruct/bin/freestruct.mjs --strict

echo "== pagefind (index what ships) =="
node node_modules/pagefind/lib/runner/bin.cjs --site docs/_site

echo "== done: docs/_site is ready =="
