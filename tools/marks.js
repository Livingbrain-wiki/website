#!/usr/bin/env node
// Writes the logo rows ("marks") into the pages, from one list:
//   assets/harnesses.json   coding harnesses (Livingbrain-wiki/livingbrain#38)
//   tools/integrations.json the other planned integrations, and which names
//                           go in which region
// Like tools/prerender.js, it replaces what sits between
// <!-- marks-NAME:start --> and <!-- marks-NAME:end --> markers. Never hand-edit
// between them.
//
// It also copies each logo from the pinned Simple Icons release
// (tools/fetch-simple-icons.sh, into tools/vendor/) to assets/logos/, reduced to
// one path with a currentColor fill. Without tools/vendor/ it reuses the files
// already in assets/logos/. Each page gets an inline sprite with only the
// symbols it uses, so nothing is fetched at runtime.
//
//     node tools/marks.js
//
// A brand with "logo": null is shown by its name only, in the same chip.
// Every logo needs a row in COPY.md (Marks); tools/build-dist.sh checks it.
'use strict';
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const H = JSON.parse(fs.readFileSync(path.join(root, 'assets/harnesses.json'), 'utf8'));
const I = JSON.parse(fs.readFileSync(path.join(root, 'tools/integrations.json'), 'utf8'));
const vendor = path.join(__dirname, 'vendor', `simple-icons-${H.simpleIcons}`, 'icons');

const LEGAL = 'Planned integrations. Not affiliated with or endorsed by these companies; names and logos are trademarks of their owners.';

const byId = new Map();
for (const h of H.harnesses) byId.set('@' + h.id, h);
for (const m of I.marks) byId.set(m.id, m);
const get = id => { const m = byId.get(id); if (!m) throw new Error(`unknown mark ${id}`); return m; };
const esc = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

// ---- logo files ----
const paths = new Map(); // logo file -> path data
for (const m of byId.values()) {
  if (!m.logo || paths.has(m.logo)) continue;
  const out = path.join(root, 'assets', m.logo);
  let svg;
  if (fs.existsSync(vendor)) {
    svg = fs.readFileSync(path.join(vendor, `${m.si}.svg`), 'utf8');
  } else if (fs.existsSync(out)) {
    svg = fs.readFileSync(out, 'utf8');
  } else {
    throw new Error(`${m.logo} missing; run tools/fetch-simple-icons.sh`);
  }
  const ds = [...svg.matchAll(/<path[^>]*\sd="([^"]+)"/g)].map(x => x[1]);
  if (ds.length !== 1) throw new Error(`${m.logo}: expected one path, found ${ds.length}`);
  if (!/viewBox="0 0 24 24"/.test(svg)) throw new Error(`${m.logo}: expected a 24x24 viewBox`);
  paths.set(m.logo, ds[0]);
  const title = m.logo === 'logos/claude.svg' ? 'Claude' : m.name;
  fs.writeFileSync(out, `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" role="img" aria-label="${esc(title)}"><title>${esc(title)}</title><path d="${ds[0]}"/></svg>\n`);
}
// No stray logos: every file in assets/logos/ is in the data.
for (const f of fs.readdirSync(path.join(root, 'assets/logos'))) {
  if (!paths.has('logos/' + f)) throw new Error(`assets/logos/${f} is not used by any mark; remove it`);
}
const sym = logo => 'mk-' + path.basename(logo, '.svg');

// ---- hover colour: the brand colour where it clears 3:1 on the theme's surfaces ----
function oklchToLin([L, C, h]) {
  const a = C * Math.cos(h * Math.PI / 180), b = C * Math.sin(h * Math.PI / 180);
  const l = (L + 0.3963377774 * a + 0.2158037573 * b) ** 3, m = (L - 0.1055613458 * a - 0.0638541728 * b) ** 3, s = (L - 0.0894841775 * a - 1.291485548 * b) ** 3;
  return [4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s, -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s, -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s].map(v => Math.min(1, Math.max(0, v)));
}
const hexToLin = hex => [1, 3, 5].map(i => { const c = parseInt(hex.slice(i, i + 2), 16) / 255; return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4; });
const lum = ([r, g, b]) => 0.2126 * r + 0.7152 * g + 0.0722 * b;
const ratio = (x, y) => { const [a, b] = [lum(x), lum(y)].sort((p, q) => q - p); return (a + 0.05) / (b + 0.05); };
const surfaces = { // --bg, --bg2, --bg3 from assets/livingbrain.css
  d: [[0.16, 0.014, 215], [0.195, 0.016, 215], [0.235, 0.018, 215]].map(oklchToLin),
  l: [[0.975, 0.006, 190], [0.995, 0.003, 190], [0.945, 0.009, 190]].map(oklchToLin)
};
function hover(m) {
  if (!m.brand) return '';
  const c = hexToLin(m.brand), v = [];
  for (const t of ['d', 'l']) if (surfaces[t].every(s => ratio(c, s) >= 3)) v.push(`--mk-${t}:${m.brand}`);
  return v.length ? ` style="${v.join(';')}"` : '';
}

// ---- markup ----
function chip(id, used) {
  const m = get(id);
  if (!m.logo) return `<li class="mk mk--txt"><span class="mk__n">${esc(m.name)}</span></li>`;
  used.add(m.logo);
  return `<li class="mk"${hover(m)}><svg class="mk__i" role="img" aria-label="${esc(m.name)}" focusable="false"><use href="#${sym(m.logo)}"/></svg><span class="mk__n" aria-hidden="true">${esc(m.name)}</span></li>`;
}
const plus = `<li class="mk mk--plus"><span class="mk__plus" aria-hidden="true">+</span><span class="mk__n">${esc(H.plus)}</span></li>`;
const legal = `<p class="mk-legal">${LEGAL}</p>`;
const list = (cls, label, items) => `<ul class="mk-row ${cls}" aria-label="${esc(label)}">${items.join('')}</ul>`;

const wave = (n, used) => H.harnesses.filter(h => h.wave === n).map(h => chip('@' + h.id, used));
const builders = {
  legal: () => legal,
  switch: used => list('mk-row--tiles', 'Coding harnesses, planned', H.harnesses.filter(h => h.featured).map(h => chip('@' + h.id, used)).concat(plus)) + legal,
  harnesses: used =>
    `<h3 class="mk-wave">First wave <span class="tag">planned</span></h3>` + list('mk-row--grid', 'First wave, planned', wave(1, used)) +
    `<h3 class="mk-wave">Next <span class="tag">planned</span></h3>` + list('mk-row--grid', 'Next wave, planned', wave(2, used).concat(plus)) + legal
};
for (const [name, ids] of Object.entries(I.regions)) {
  builders[name] = used => list(name === 'works' ? 'mk-row--strip' : 'mk-row--inline', 'Planned integrations', ids.map(id => chip(id, used)));
}

const pages = ['index.html', 'agents/index.html', 'integrations/index.html'];
const found = {};
for (const page of pages) {
  const file = path.join(root, page);
  let html = fs.readFileSync(file, 'utf8');
  const pageUsed = new Set(); // the logos this page writes, for its sprite
  for (const name of Object.keys(builders)) {
    const re = new RegExp(`(<!-- marks-${name}:start -->)[\\s\\S]*?(<!-- marks-${name}:end -->)`, 'g');
    if (!re.test(html)) continue;
    const body = builders[name](pageUsed);
    html = html.replace(re, (mm, a, b) => a + body + b);
    (found[name] = found[name] || []).push(page);
  }
  const sprite = `<svg class="mk-sprite" aria-hidden="true" focusable="false">${[...pageUsed].sort().map(l => `<symbol id="${sym(l)}" viewBox="0 0 24 24"><path d="${paths.get(l)}"/></symbol>`).join('')}</svg>`;
  const sre = /(<!-- marks-sprite:start -->)[\s\S]*?(<!-- marks-sprite:end -->)/;
  if (pageUsed.size && !sre.test(html)) throw new Error(`${page} uses logos but has no marks-sprite markers`);
  html = html.replace(sre, (mm, a, b) => a + sprite + b);
  fs.writeFileSync(file, html);
  console.log(`${page.padEnd(24)} ${pageUsed.size} logos`);
}
for (const name of Object.keys(builders)) if (!found[name]) throw new Error(`markers for marks-${name} not found`);
const all = [...byId.values()];
console.log(`${all.filter(m => m.logo).length} with a logo, ${all.filter(m => !m.logo).length} name only, ${paths.size} logo files`);
