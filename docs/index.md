---
layout: landing
title: The front door to the family docs
description: The front door to the Creadev docs system - a lander, a projects index, and one search that reaches the whole struct family.
permalink: /
---
<div class="lp">

  <section class="lp-hero">
    <span class="lp-eyebrow">Creadev docs system</span>
    <h1>One front door to the <span class="lp-grad">family docs</span>.</h1>
    <p class="lp-lede">
      The struct family ships a dozen separate docs sites. This hub is the root
      that explains the system, indexes the marketable projects, and gives you
      one place to start: browse the projects, then search the whole hub.
    </p>
    <div class="lp-cta">
      <a class="lp-btn lp-btn-primary" href="{{ site.baseurl }}/projs/">Browse the projects</a>
      <a class="lp-btn lp-btn-ghost" href="{{ site.baseurl }}/search/">Search the hub</a>
    </div>
  </section>

  <section class="lp-section">
    <div class="lp-kicker">How the family's docs fit together</div>
    <h2 class="lp-h2">A system, not a list</h2>
    <p class="lp-sub">
      Every project keeps its own docs at its own host. The family shares a
      docs frame, a toolchain, and a voice, so the hub can link them as one
      surface instead of a scattered set of bookmarks.
    </p>
    <div class="lp-grid">
      <div class="lp-card">
        <h3>One frame</h3>
        <p>Every docs site uses the same layout: fixed header, slide-out
        sidebar, theme switch, and a Pagefind search modal. Learn one, and you
        can read them all.</p>
      </div>
      <div class="lp-card">
        <h3>One toolchain</h3>
        <p>Jekyll builds the pages, <a href="https://freestruct.creadev.org">freestruct</a>
        layers on SEO after the build, and Pagefind indexes what will ship. One
        lane builds every family docs site.</p>
      </div>
      <div class="lp-card">
        <h3>One search</h3>
        <p>Pagefind is the family search system. This hub adds a surface, not a
        second engine. Start typing and the whole hub answers.</p>
      </div>
    </div>
  </section>

  <section class="lp-section">
    <div class="lp-kicker">The marketable projects</div>
    <h2 class="lp-h2">Browse the family</h2>
    <p class="lp-sub">
      {{ site.data.projects._provenance.count }} projects, grouped open-source
      first. The full index carries each project's tagline, status, and links.
    </p>
    <div class="lp-chips">
      {%- for p in site.data.projects.projects limit: 12 -%}
      <a class="lp-chip" href="{{ p.url | default: p.github | default: '#' }}"{% if p.url or p.github %} target="_blank" rel="noopener"{% endif %}>{{ p.name }}</a>
      {%- endfor -%}
      <a class="lp-chip" href="{{ site.baseurl }}/projs/">all {{ site.data.projects._provenance.count }} &rarr;</a>
    </div>
  </section>

  <section class="lp-band">
    <h2>Start here, or jump to search.</h2>
    <p>
      The hub is the shared entry point to the Creadev doc system. If you know
      what you want, search reaches every page in the hub.
    </p>
    <div class="lp-cta">
      <a class="lp-btn lp-btn-primary" href="{{ site.baseurl }}/projs/">Browse the projects</a>
      <a class="lp-btn lp-btn-ghost" href="{{ site.baseurl }}/search/">Search the hub</a>
    </div>
  </section>

</div>
