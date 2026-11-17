---
layout: default
title: Projects
description: The marketable projects in the struct family, grouped open-source first, each with its tagline, status, and links.
permalink: projs/
---
{%- assign data = site.data.projects -%}
{%- assign prov = data._provenance -%}

# Projects

The marketable projects in the struct family, {{ prov.count }} in all, grouped
open-source first. Each row links to the live site or the repo where one exists.

<p class="projs-meta">
  Roster data from the interim master list (a bridge to
  <a href="https://govstruct.creadev.org" target="_blank" rel="noopener">govstruct</a>).
  Source commit <code>{{ prov.sourceCommit | slice: 0, 7 }}</code>, fetched {{ prov.fetched }}.
</p>

{%- assign sections = 'open-source,proprietary,other' | split: ',' -%}
{%- for section in sections -%}
  {%- assign rows = data.projects | where: 'section', section -%}
  {%- if rows.size > 0 -%}
    {%- assign heading = section | replace: '-', ' ' | capitalize -%}
    {%- if section == 'open-source' -%}{%- assign heading = 'Open source' -%}{%- endif -%}
    {%- if section == 'other' -%}{%- assign heading = 'Other work' -%}{%- endif -%}

## {{ heading }} ({{ rows.size }})

<div class="proj-list">
  {%- for p in rows %}
  <article class="proj">
    {%- if p.image %}
    <a class="proj-thumb" href="{{ p.url | default: p.github | default: '#' }}"{% if p.url or p.github %} target="_blank" rel="noopener"{% endif %}>
      <img src="{{ p.image }}" alt="{{ p.name }} preview" loading="lazy" width="112" height="70">
    </a>
    {%- endif %}
    <div class="proj-body">
      <h3 class="proj-name">
        {%- if p.url -%}<a href="{{ p.url }}" target="_blank" rel="noopener">{{ p.name }}</a>
        {%- elsif p.github -%}<a href="{{ p.github }}" target="_blank" rel="noopener">{{ p.name }}</a>
        {%- else -%}{{ p.name }}{%- endif -%}
        <span class="proj-status status-{{ p.status | slugify }}">{{ p.status }}</span>
        {%- if p.npm and p.version %}<span class="proj-version">npm {{ p.version }}</span>{%- endif -%}
      </h3>
      {%- if p.tagline %}<p class="proj-tagline">{{ p.tagline }}</p>{%- endif -%}
      {%- if p.description %}<p class="proj-desc">{{ p.description }}</p>{%- endif -%}
      <p class="proj-links">
        {%- if p.url %}<a href="{{ p.url }}" target="_blank" rel="noopener">Live</a>{%- endif -%}
        {%- if p.github %}{%- if p.url %} &middot; {% endif %}<a href="{{ p.github }}" target="_blank" rel="noopener">GitHub</a>{%- endif -%}
        {%- if p.npm %}{%- if p.url or p.github %} &middot; {% endif %}<a href="https://www.npmjs.com/package/{{ p.npm }}" target="_blank" rel="noopener">npm</a>{%- endif -%}
      </p>
      {%- if p.tags.size > 0 %}
      <p class="proj-tags">{% for t in p.tags %}<span class="proj-tag">{{ t }}</span>{% endfor %}</p>
      {%- endif %}
    </div>
  </article>
  {%- endfor %}
</div>
  {%- endif -%}
{%- endfor -%}

<style>
  .projs-meta { color: var(--ink-soft); font-size: 13px; }
  .proj-list { display: flex; flex-direction: column; gap: 16px; margin-top: 12px; }
  .proj { display: flex; gap: 16px; background: var(--surface); border: 1px solid var(--line);
    border-radius: 12px; padding: 16px 18px; }
  .proj-thumb { flex: none; }
  .proj-thumb img { width: 112px; height: 70px; object-fit: cover; border-radius: 8px;
    border: 1px solid var(--line); display: block; background: var(--raised); }
  .proj-body { min-width: 0; }
  .proj-name { font-size: 17px; margin: 0 0 4px; display: flex; align-items: center;
    flex-wrap: wrap; gap: 8px; }
  .proj-name a { text-decoration: none; }
  .proj-tagline { font-size: 14px; color: var(--ink); margin: 0 0 6px; font-weight: 600; }
  .proj-desc { font-size: 13.5px; color: var(--ink-soft); margin: 0 0 8px; }
  .proj-links { font-size: 13px; margin: 0 0 6px; }
  .proj-status, .proj-version { font-size: 11px; font-weight: 600; letter-spacing: .04em;
    border-radius: 999px; padding: 2px 9px; border: 1px solid var(--line); color: var(--ink-soft); }
  .status-live { color: var(--moss); border-color: var(--moss); }
  .status-beta { color: var(--accent); border-color: var(--accent); }
  .status-in-development { color: var(--accent); border-color: var(--accent); }
  .status-backburner, .status-archived { color: var(--ink-light); }
  .proj-version { color: var(--ink-light); font-weight: 400; }
  .proj-tags { margin: 0; }
  .proj-tag { display: inline-block; font-size: 11.5px; color: var(--ink-soft);
    background: var(--raised); border-radius: 6px; padding: 1px 8px; margin-right: 6px; }
  @media (max-width: 600px) {
    .proj { flex-direction: column; }
    .proj-thumb img { width: 100%; height: auto; }
  }
</style>
