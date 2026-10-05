#!/usr/bin/env node
// Writes the /docs/ list into docs/index.html from tools/docs.json.
// Like tools/prerender.js and tools/marks.js, it replaces what sits between
// <!-- docs:start --> and <!-- docs:end -->. Never hand-edit between them.
//
//     node tools/docs.js
//
// The page is static HTML: nothing is fetched at runtime.
//
// The status is shown in words, and the rules are enforced here rather than
// trusted (AGENTS.md rule 1, Living Brain is in design and not built):
//   - `available` entries must have a `link`;
//   - `planned` entries must not, so nothing planned looks like a document
//     you can open today.
'use strict';
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const PAGE = 'docs/index.html';
const data = JSON.parse(fs.readFileSync(path.join(__dirname, 'docs.json'), 'utf8'));
const esc = s => String(s)
  .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

if (!Array.isArray(data.docs) || !data.docs.length) throw new Error('tools/docs.json: no docs');

const WORDS = { available: 'Available', planned: 'Planned' };
const seen = new Set();

function entry(d) {
  if (!d.title || !d.line) throw new Error(`entry needs a title and a line: ${JSON.stringify(d)}`);
  if (!WORDS[d.status]) throw new Error(`${d.title}: status must be available or planned, got ${d.status}`);
  if (d.status === 'available' && !d.link) throw new Error(`${d.title}: available needs a link`);
  if (d.status === 'planned' && d.link) throw new Error(`${d.title}: planned must not have a link`);
  if (seen.has(d.title)) throw new Error(`duplicate title: ${d.title}`);
  seen.add(d.title);

  // An available entry is a link; a planned one is plain text, so nothing
  // planned looks like a document you can open today.
  const heading = d.link
    ? `<h2 class="doc__t"><a href="${esc(d.link)}">${esc(d.title)}</a></h2>`
    : `<h2 class="doc__t">${esc(d.title)}</h2>`;
  // `more` points at the page that owns the detail, so the one-liner stays a
  // pointer and the claim itself is said once (AGENTS.md rule 2).
  const more = d.more
    ? `\n          <p class="doc__more"><a href="${esc(d.more.href)}">${esc(d.more.text)}</a></p>`
    : '';
  return [
    `        <li class="doc doc--${d.status}">`,
    `          <div class="doc__hd">${heading}<span class="doc__st">${WORDS[d.status]}</span></div>`,
    `          <p class="doc__line">${esc(d.line)}</p>${more}`,
    '        </li>'
  ].join('\n');
}

const file = path.join(root, PAGE);
let html = fs.readFileSync(file, 'utf8');
const re = /(<!-- docs:start -->)[\s\S]*?(<!-- docs:end -->)/;
if (!re.test(html)) throw new Error(`${PAGE} has no docs:start / docs:end markers`);
const body = data.docs.map(entry).join('\n');
html = html.replace(re, (m, a, b) => `${a}\n      <ul class="doc-list">\n${body}\n      </ul>\n      ${b}`);
fs.writeFileSync(file, html);

const n = s => data.docs.filter(d => d.status === s).length;
console.log(`${PAGE} — ${data.docs.length} entries (${n('available')} available, ${n('planned')} planned)`);
