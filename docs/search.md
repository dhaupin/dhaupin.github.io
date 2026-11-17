---
layout: default
title: Search
description: One search across the Creadev docs hub, powered by Pagefind.
permalink: search/
---
# Search

One search across the Creadev docs hub. The index is built by the docs lane
after the pages are rendered, so it covers every page that ships.

<div class="search-page">
  <input type="search" id="searchPageInput" class="search-page-input"
         placeholder="Search the hub..." autocomplete="off" aria-label="Search the hub">
  <div id="searchPageResults" class="search-page-results"></div>
</div>

<p class="search-hint">
  Prefer the keyboard? Press <kbd>Ctrl</kbd> <kbd>K</kbd> anywhere on the hub to
  open the search modal.
</p>

<style>
  .search-page { margin: 18px 0 8px; }
  .search-page-input { width: 100%; max-width: 640px; padding: 13px 16px; font-size: 1rem;
    font-family: inherit; color: var(--ink); background: var(--surface);
    border: 1px solid var(--line); border-radius: 10px; outline: none; }
  .search-page-input:focus { border-color: var(--accent); }
  .search-page-results { margin-top: 16px; max-width: 720px; }
  .search-page-result { display: block; padding: 14px 16px; text-decoration: none;
    border: 1px solid var(--line); border-radius: 10px; margin-bottom: 10px;
    background: var(--surface); }
  .search-page-result:hover { border-color: var(--accent); text-decoration: none; }
  .search-page-result-title { font-weight: 600; color: var(--ink); }
  .search-page-result-excerpt { color: var(--ink-soft); font-size: 13.5px; margin-top: 4px; }
  .search-page-note { color: var(--ink-light); padding: 14px 0; }
  .search-hint { color: var(--ink-soft); font-size: 13.5px; }
  kbd { font-family: "SF Mono", ui-monospace, Menlo, monospace; font-size: 12px;
    background: var(--code-bg); border: 1px solid var(--line); border-radius: 4px; padding: 1px 5px; }
</style>

<script>
(function () {
  var input = document.getElementById('searchPageInput');
  var results = document.getElementById('searchPageResults');
  var pf = null;

  async function load() {
    if (pf) return pf;
    pf = await import('{{ site.baseurl }}/pagefind/pagefind.js');
    await pf.init();
    return pf;
  }

  async function run(q) {
    if (q.length < 2) { results.innerHTML = ''; return; }
    results.innerHTML = '<div class="search-page-note">Searching for "' + q + '"...</div>';
    try {
      var pagefind = await load();
      var resp = await pagefind.search(q);
      if (resp.results.length === 0) {
        results.innerHTML = '<div class="search-page-note">No results for "' + q + '"</div>';
        return;
      }
      var html = '';
      for (var i = 0; i < resp.results.length; i++) {
        var data = await resp.results[i].data();
        html += '<a href="' + data.url + '" class="search-page-result">';
        html += '<div class="search-page-result-title">' + data.meta.title + '</div>';
        if (data.excerpt) html += '<div class="search-page-result-excerpt">' + data.excerpt + '</div>';
        html += '</a>';
      }
      results.innerHTML = html;
    } catch (e) {
      results.innerHTML = '<div class="search-page-note">Search index not available on this URL - run the docs deploy.</div>';
    }
  }

  input.addEventListener('input', function () { run(this.value); });

  var q = new URLSearchParams(location.search).get('q');
  if (q) { input.value = q; run(q); }
})();
</script>
