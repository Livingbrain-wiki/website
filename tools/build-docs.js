#!/usr/bin/env node
/* Renders the Living Brain documentation into the site.

     node tools/build-docs.js            write docs/, guides/ and the sitemap block
     node tools/build-docs.js --check    write nothing; exit 1 if anything is stale or broken

   Inputs:
     docs-src/*.md       the product repo's docs, mirrored by tools/sync-docs.sh (never edit)
     docs-src/mirror.lock  the commit and a sha256 per mirrored file
     guides-src/*.md     the site's own guides, written by hand (front matter: title, blurb, eyebrow, order)

   Outputs (each a folder with an index.html, served at /<folder>/):
     docs/<slug>/index.html    one per mirrored doc, listed in REFERENCE below
     docs/index.html           the /docs/ hub: guides first, then reference
     guides/<slug>/index.html  one per guide
     sitemap.xml               the block between the generated markers

   The pages use tools/docs-shell.html for the masthead, footer and head, and
   assets/docs.css for prose. No dependencies beyond Node. Markdown support is
   the subset these documents use: ATX headings, paragraphs, nested lists,
   fenced code, pipe tables, blockquotes, rules, links, code spans, bold and
   italics. Raw HTML in the source is escaped, never passed through.

   Links: a link to a mirrored doc becomes its site URL; any other relative
   link (into crates/, to an unmirrored doc) points at the file on GitHub at the
   mirrored commit. Diagrams are not rendered (no headless browser here):
   a mermaid block would appear as its source code. */
'use strict';
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const CHECK = process.argv.includes('--check');
const REPO = 'https://github.com/Livingbrain-wiki/livingbrain';
const SITE = 'https://livingbrain.wiki';

// The reading order of the reference section: source file, slug, title, one line.
const REFERENCE = [
  { file: 'coding-agents.md', slug: 'coding-agents', title: 'Coding-agent sessions', blurb: 'How synced coding-agent sessions become a compiled wiki: queue, compiler, schedule and transcripts.' },
  { file: 'logs.md', slug: 'agent-logs', title: 'Agent logs', blurb: 'The livingbrain logs commands: what is read, what is redacted, and what is sent when you opt in.' },
  { file: 'import.md', slug: 'import', title: 'Import', blurb: 'livingbrain import: Markdown folders, ChatGPT and Claude exports, previews, exclusions and redaction.' },
  { file: 'mcp.md', slug: 'mcp', title: 'MCP', blurb: 'The MCP endpoint: its five tools, how every read is scoped to the person asking, and citations.' },
  { file: 'github.md', slug: 'github', title: 'GitHub connection', blurb: 'The GitHub App: which events and records come in, how the backfill runs, and what is stored.' },
  { file: 'temporal-facts.md', slug: 'facts', title: 'Temporal facts', blurb: 'Facts with dates: supersession, freshness, reconciliation and dreaming, and the read API.' },
  { file: 'local-runner.md', slug: 'local-runner', title: 'Brain jobs on your subscription', blurb: 'Let your own Claude Code or Codex answer brain jobs on your Mac, with tools off and a read-only sandbox.' },
  { file: 'telemetry.md', slug: 'telemetry', title: 'Telemetry', blurb: 'What the CLI and a self-hosted server may send as anonymous usage counts, the live map, and the OpenTelemetry export.' },
  { file: 'usage-data.md', slug: 'usage-data', title: 'Anonymous usage data', blurb: 'The counted batch the CLI and self-hosted servers may send, field by field, and what is never in it.' },
];

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const unesc = (s) => String(s).replace(/&quot;/g, '"').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&');

function readLock() {
  const text = fs.readFileSync(path.join(ROOT, 'docs-src/mirror.lock'), 'utf8');
  const commit = (/^commit\s+(\S+)$/m.exec(text) || [])[1];
  const date = (/^date\s+(\S+)$/m.exec(text) || [])[1];
  const files = new Map();
  for (const m of text.matchAll(/^([0-9a-f]{64})\s+(\S+)$/gm)) files.set(m[2], m[1]);
  if (!commit) throw new Error('docs-src/mirror.lock has no commit');
  return { commit, date, files };
}

const LOCK = readLock();
const ghBlob = (p) => `${REPO}/blob/${LOCK.commit}/${p}`;
const ghTree = (p) => `${REPO}/tree/${LOCK.commit}/${p}`;
const slugOf = (s) => s.toLowerCase().replace(/<[^>]+>/g, '').replace(/[^a-z0-9 -]/g, '').trim().replace(/ +/g, '-');

// Where each mirrored source file lives on the site.
const SITE_FOR = new Map(REFERENCE.map((r) => [`docs/${r.file}`, `/docs/${r.slug}/`]));

function resolveLink(url, fromFile) {
  if (/^(https?:|mailto:)/.test(url)) return url;
  if (url.startsWith('#') || url.startsWith('/')) return url; // a site path is already a site link
  const [p, hash] = url.split('#');
  const from = path.posix.dirname(`docs/${fromFile}`);
  const target = path.posix.normalize(path.posix.join(from, p));
  const frag = hash ? `#${hash}` : '';
  if (SITE_FOR.has(target)) return SITE_FOR.get(target) + frag;
  if (!p) return url;
  return (p.endsWith('/') ? ghTree(target.replace(/\/$/, '')) : ghBlob(target)) + frag;
}

// Inline markdown on one line of text. Escapes first, then marks up.
function inline(src, fromFile) {
  const spans = [];
  let s = String(src).replace(/`([^`]+)`/g, (_, code) => { spans.push(`<code>${esc(code)}</code>`); return `\u0000${spans.length - 1}\u0000`; });
  s = esc(s);
  s = s.replace(/\[([^\]]+)\]\(([^)\s]+)(?:\s+&quot;[^&]*&quot;)?\)/g, (_, text, url) => {
    const href = resolveLink(unesc(url), fromFile);
    return `<a href="${esc(href)}">${inline(unesc(text), fromFile)}</a>`;
  });
  s = s.replace(/&lt;(https?:\/\/[^\s&]+)&gt;/g, (_, u) => `<a href="${esc(u)}">${esc(u)}</a>`);
  s = s.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  s = s.replace(/(^|[\s(])\*([^*\s][^*]*)\*(?=[\s).,;:]|$)/g, '$1<em>$2</em>');
  return s.replace(/\u0000(\d+)\u0000/g, (_, i) => spans[Number(i)]);
}

function splitRow(line) {
  let t = line.trim().replace(/^\|/, '').replace(/\|$/, '');
  return t.split(/(?<!\\)\|/).map((c) => c.trim().replace(/\\\|/g, '|'));
}

const isTableSep = (line) => /^\s*\|?\s*:?-{2,}:?\s*(\|\s*:?-{2,}:?\s*)*\|?\s*$/.test(line) && line.includes('-');
const isListItem = (line) => /^(\s*)([-*+]|\d+[.)])\s+/.exec(line);
const isBlockStart = (line) => /^(#{1,6})\s/.test(line) || /^```/.test(line) || /^>/.test(line) || isListItem(line) || /^(-{3,}|\*{3,})\s*$/.test(line) || (line.trim().startsWith('|') && line.includes('|'));

// Block markdown -> HTML. `state.h1` is set once the document's own title was skipped.
function blocks(lines, fromFile, state) {
  const out = [];
  let i = 0;
  while (i < lines.length) {
    const line = lines[i];
    if (!line.trim()) { i++; continue; }

    const fence = /^```\s*([\w+-]*)/.exec(line);
    if (fence) {
      const body = [];
      i++;
      while (i < lines.length && !/^```\s*$/.test(lines[i])) body.push(lines[i++]);
      i++;
      const lang = fence[1] ? ` class="language-${esc(fence[1])}"` : '';
      out.push(`<pre class="doc-code"><code${lang}>${esc(body.join('\n'))}</code></pre>`);
      continue;
    }

    const h = /^(#{1,6})\s+(.*?)\s*#*$/.exec(line);
    if (h) {
      let level = h[1].length;
      if (level === 1 && !state.h1) { state.h1 = h[2]; i++; continue; }
      if (level === 1) level = 2;
      const id = slugOf(h[2]);
      out.push(`<h${level} id="${esc(id)}">${inline(h[2], fromFile)}</h${level}>`);
      i++;
      continue;
    }

    if (/^(-{3,}|\*{3,})\s*$/.test(line)) { out.push('<hr>'); i++; continue; }

    if (line.trim().startsWith('|') && i + 1 < lines.length && isTableSep(lines[i + 1])) {
      const head = splitRow(line);
      i += 2;
      const rows = [];
      while (i < lines.length && lines[i].trim().startsWith('|')) rows.push(splitRow(lines[i++]));
      const th = head.map((c) => `<th scope="col">${inline(c, fromFile)}</th>`).join('');
      const tb = rows.map((r) => `<tr>${r.map((c) => `<td>${inline(c, fromFile)}</td>`).join('')}</tr>`).join('');
      out.push(`<div class="doc-table"><table><thead><tr>${th}</tr></thead><tbody>${tb}</tbody></table></div>`);
      continue;
    }

    if (/^>/.test(line)) {
      const body = [];
      while (i < lines.length && /^>/.test(lines[i])) body.push(lines[i++].replace(/^>\s?/, ''));
      out.push(`<blockquote>${blocks(body, fromFile, { h1: 'x' })}</blockquote>`);
      continue;
    }

    const li = isListItem(line);
    if (li) {
      const base = li[1].length;
      const ordered = /\d/.test(li[2]);
      const items = [];
      while (i < lines.length) {
        const m = isListItem(lines[i]);
        if (!m || m[1].length !== base || /\d/.test(m[2]) !== ordered) break;
        const contentCol = m[0].length;
        const body = [lines[i].slice(contentCol)];
        i++;
        while (i < lines.length) {
          const l = lines[i];
          if (!l.trim()) {
            // a blank line stays in the item only if an indented line follows
            let j = i; while (j < lines.length && !lines[j].trim()) j++;
            if (j < lines.length && lines[j].search(/\S/) >= contentCol) { for (; i < j; i++) body.push(''); continue; }
            break;
          }
          if (l.search(/\S/) >= contentCol) { body.push(l.slice(contentCol)); i++; continue; }
          if (!isBlockStart(l) && l.search(/\S/) > base) { body.push(l.trim()); i++; continue; }
          break;
        }
        const inner = blocks(body, fromFile, { h1: 'x' });
        // a tight item (one paragraph, no blank lines) renders without <p>
        const tight = body.every((l) => l.trim()) && /^<p>[\s\S]*<\/p>$/.test(inner) && inner.indexOf('<p>', 3) === -1;
        items.push(`<li>${tight ? inner.replace(/^<p>|<\/p>$/g, '') : inner}</li>`);
      }
      out.push(`<${ordered ? 'ol' : 'ul'}>${items.join('')}</${ordered ? 'ol' : 'ul'}>`);
      continue;
    }

    const para = [];
    while (i < lines.length && lines[i].trim() && !isBlockStart(lines[i])) para.push(lines[i++].trim());
    if (!para.length) { para.push(lines[i].trim()); i++; }
    out.push(`<p>${inline(para.join(' '), fromFile)}</p>`);
  }
  return out.join('\n');
}

function markdown(src, fromFile) {
  const state = { h1: null };
  const html = blocks(src.replace(/\r\n/g, '\n').split('\n'), fromFile, state);
  return { html, title: state.h1 };
}

function shell({ title, description, canonical, main }) {
  const tpl = fs.readFileSync(path.join(ROOT, 'tools/docs-shell.html'), 'utf8');
  // Function replacements: a `$` in the page text is not a replacement pattern.
  return tpl
    .replace(/\{\{TITLE\}\}/g, () => esc(title))
    .replace(/\{\{DESCRIPTION\}\}/g, () => esc(description))
    .replace(/\{\{CANONICAL\}\}/g, () => esc(canonical))
    .replace('{{JSONLD}}', () => '')
    .replace('{{MAIN}}', () => main);
}

function frontMatter(text) {
  const m = /^---\n([\s\S]*?)\n---\n/.exec(text);
  if (!m) throw new Error('guide has no front matter');
  const meta = {};
  for (const line of m[1].split('\n')) { const kv = /^(\w+):\s*(.*)$/.exec(line); if (kv) meta[kv[1]] = kv[2]; }
  return { meta, body: text.slice(m[0].length) };
}

function guides() {
  const dir = path.join(ROOT, 'guides-src');
  return fs.readdirSync(dir).filter((f) => f.endsWith('.md')).sort().map((f) => {
    const { meta, body } = frontMatter(fs.readFileSync(path.join(dir, f), 'utf8'));
    const slug = f.replace(/\.md$/, '');
    return { slug, meta, body, order: Number(meta.order || 99) };
  }).sort((a, b) => a.order - b.order || a.slug.localeCompare(b.slug));
}

function renderAll() {
  const out = new Map(); // path relative to the site root -> html
  const GUIDES = guides();

  for (const r of REFERENCE) {
    const file = path.join(ROOT, 'docs-src', r.file);
    if (!fs.existsSync(file)) { process.stderr.write(`skip ${r.slug}: docs-src/${r.file} is not mirrored\n`); continue; }
    const { html, title } = markdown(fs.readFileSync(file, 'utf8'), r.file);
    const canonical = `${SITE}/docs/${r.slug}/`;
    const main = `<main id="main" class="guide doc-page"><div class="wrap wrap--narrow">
    <p class="eyebrow">Reference</p>
    <h1 class="h2">${esc(r.title)}</h1>
    <p class="lede">${esc(r.blurb)}</p>
    <p class="doc-source">Source: <a href="${esc(ghBlob(`docs/${r.file}`))}">docs/${esc(r.file)} on GitHub</a>, at commit <code>${esc(LOCK.commit.slice(0, 7))}</code> (${esc(LOCK.date.slice(0, 10))}).${title ? '' : ''}</p>
    <div class="prose">
${html}
    </div>
    <p class="guide__back"><a class="btn btn--ghost" href="/docs/">All docs</a> <a class="btn btn--primary" href="https://app.livingbrain.wiki/">Get started</a></p>
  </div>
</main>`;
    out.set(`docs/${r.slug}/index.html`, shell({ title: `${r.title} · Living Brain docs`, description: r.blurb, canonical, main }));
  }

  for (const g of GUIDES) {
    const { html } = markdown(g.body, `guides-src/${g.slug}.md`);
    const canonical = `${SITE}/guides/${g.slug}/`;
    const main = `<main id="main" class="guide"><div class="wrap wrap--narrow">
    <p class="eyebrow">${esc(g.meta.eyebrow || 'Guide')}</p>
    <h1 class="h2">${esc(g.meta.title)}</h1>
    <p class="lede">${esc(g.meta.blurb)}</p>
    <div class="prose">
${html}
    </div>
    <p class="guide__back"><a class="btn btn--ghost" href="/docs/">All docs</a> <a class="btn btn--primary" href="https://app.livingbrain.wiki/">Get started</a></p>
  </div>
</main>`;
    out.set(`guides/${g.slug}/index.html`, shell({ title: `${g.meta.title} · Living Brain`, description: g.meta.blurb, canonical, main }));
  }

  // the hub
  const li = (href, title, blurb, extra = '') => `        <li class="doc-hub__item"><a href="${href}">${esc(title)}</a><p>${esc(blurb)}</p>${extra}</li>`;
  const guideItems = GUIDES.map((g) => li(`/guides/${g.slug}/`, g.meta.title, g.meta.blurb)).join('\n');
  const refItems = REFERENCE.filter((r) => fs.existsSync(path.join(ROOT, 'docs-src', r.file))).map((r) => li(`/docs/${r.slug}/`, r.title, r.blurb)).join('\n');
  const hubMain = `<main id="main" class="guide doc-page"><div class="wrap wrap--narrow">
    <p class="eyebrow">Docs · Early access</p>
    <h1 class="h2">Guides and reference.</h1>
    <p class="lede">Start with the guides to sign in, set up a workspace and connect the Mac app. The reference pages describe each part in detail. Living Brain is open in early access at <a href="https://app.livingbrain.wiki/">app.livingbrain.wiki</a>; anything marked planned on the site is not built yet.</p>
    <h2 class="h3" id="guides">Guides</h2>
    <ul class="doc-hub">
${guideItems}
    </ul>
    <h2 class="h3" id="reference">Reference</h2>
    <p class="doc-source">Reference pages are copies of the product repository's documentation, pinned to commit <code>${esc(LOCK.commit.slice(0, 7))}</code>. The source is on <a href="${esc(REPO)}">GitHub</a>.</p>
    <ul class="doc-hub">
${refItems}
    </ul>
  </div>
</main>`;
  out.set('docs/index.html', shell({ title: 'Docs · Living Brain', description: 'Guides and reference for Living Brain: sign in, workspaces, imports, coding-agent sync, the GitHub App, facts and dreaming, access, and MCP.', canonical: `${SITE}/docs/`, main: hubMain }));
  return { out, GUIDES };
}

function sitemapBlock(pages) {
  const today = new Date().toISOString().slice(0, 10);
  return pages.map((p) => `  <url>\n    <loc>${SITE}/${p}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>0.6</priority>\n  </url>`).join('\n');
}

function writeAll(out, sitemapPages) {
  for (const [rel, html] of out) {
    const file = path.join(ROOT, rel);
    fs.mkdirSync(path.dirname(file), { recursive: true });
    fs.writeFileSync(file, html);
  }
  const sm = path.join(ROOT, 'sitemap.xml');
  const text = fs.readFileSync(sm, 'utf8');
  const block = `  <!-- docs:start -->\n${sitemapBlock(sitemapPages)}\n  <!-- docs:end -->`;
  fs.writeFileSync(sm, /<!-- docs:start -->[\s\S]*?<!-- docs:end -->/.test(text)
    ? text.replace(/  <!-- docs:start -->[\s\S]*?<!-- docs:end -->/, block)
    : text.replace('</urlset>', `${block}\n</urlset>`));
}

function check(out) {
  const fails = [];
  // 1. the mirror is what sync-docs.sh recorded
  const crypto = require('crypto');
  for (const [f, want] of LOCK.files) {
    const p = path.join(ROOT, 'docs-src', f);
    if (!fs.existsSync(p)) { fails.push(`docs-src/${f} is in mirror.lock but missing`); continue; }
    if (crypto.createHash('sha256').update(fs.readFileSync(p)).digest('hex') !== want) fails.push(`docs-src/${f} does not match mirror.lock (fix the product repo and re-sync)`);
  }
  // 2. committed pages are a fresh render
  for (const [rel, html] of out) {
    const p = path.join(ROOT, rel);
    if (!fs.existsSync(p)) fails.push(`${rel} is not rendered yet (run node tools/build-docs.js)`);
    else if (fs.readFileSync(p, 'utf8') !== html) fails.push(`${rel} is stale (run node tools/build-docs.js)`);
  }
  // 3. sitemap lists each rendered page
  const sm = fs.readFileSync(path.join(ROOT, 'sitemap.xml'), 'utf8');
  for (const rel of out.keys()) {
    const url = rel === 'docs/index.html' ? `${SITE}/docs/` : `${SITE}/${rel.replace(/index\.html$/, '')}`;
    if (!sm.includes(`<loc>${url}</loc>`)) fails.push(`sitemap.xml has no <loc>${url}</loc>`);
  }
  // 4. every internal href/src on the site points at a page or file that exists
  const pagesOk = (p) => {
    const clean = p.split(/[?#]/)[0];
    if (clean === '/' || clean === '') return true;
    // a redirect rule (_redirects) is a route too
    const redirects = fs.readFileSync(path.join(ROOT, '_redirects'), 'utf8');
    if (new RegExp(`^${clean.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\s`, 'm').test(redirects)) return true;
    const file = path.join(ROOT, clean.endsWith('/') ? `${clean}index.html` : clean);
    if (fs.existsSync(file)) return true;
    return fs.existsSync(path.join(ROOT, clean));
  };
  const htmlFiles = [];
  const walk = (d) => { for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    if (['.git', 'docs-src', 'design-src', 'node_modules', 'guides-src', 'tools', 'assets', 'dist'].includes(e.name)) continue;
    const p = path.join(d, e.name);
    if (e.isDirectory()) walk(p); else if (e.name.endsWith('.html')) htmlFiles.push(p);
  } };
  walk(ROOT);
  for (const f of htmlFiles) {
    const text = fs.readFileSync(f, 'utf8');
    for (const m of text.matchAll(/(?:href|src)="(\/[^"]*)"/g)) {
      if (!pagesOk(m[1])) fails.push(`${path.relative(ROOT, f)} links to ${m[1]}, which does not exist`);
    }
  }
  // 5. no link to a product doc on GitHub, except each reference page's one source link
  for (const f of htmlFiles) {
    const text = fs.readFileSync(f, 'utf8');
    const docLinks = [...text.matchAll(/github\.com\/Livingbrain-wiki\/livingbrain\/blob\/[0-9a-f]{40}\/docs\/([^"#]*)/g)].map((m) => m[1]);
    const mirrored = docLinks.filter((d) => LOCK.files.has(d));
    const isRef = f.startsWith(path.join(ROOT, 'docs') + path.sep) && !f.endsWith(`docs${path.sep}index.html`);
    if (mirrored.length > 1 || (mirrored.length === 1 && !isRef)) fails.push(`${path.relative(ROOT, f)} links a mirrored product doc on GitHub (link the site page; keep one source link)`);
  }
  return fails;
}

const { out, GUIDES } = renderAll();
const sitemapPages = [...out.keys()].map((rel) => (rel === 'docs/index.html' ? 'docs/' : rel.replace(/index\.html$/, '')));

if (CHECK) {
  const fails = check(out);
  for (const f of fails) process.stderr.write(`FAIL ${f}\n`);
  if (fails.length) process.exit(1);
  console.log(`docs ok: ${out.size} pages (${GUIDES.length} guides, ${REFERENCE.length} reference) match a fresh render`);
} else {
  writeAll(out, sitemapPages);
  console.log(`rendered ${out.size} pages: ${GUIDES.length} guides, reference at ${LOCK.commit.slice(0, 7)}`);
}
