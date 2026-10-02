#!/usr/bin/env node
// Writes the hero's static brain: an inline SVG frozen from the same graph
// that assets/brain.js renders (300 nodes, seed 11), between the
// <!-- brain-still:start --> and <!-- brain-still:end --> markers. The home page
// hero has one, and so does each subpage whose figures reuse it (via <use href="#bsg">),
// along with the sample-graph, agent-tab and growth-chart parts on their pages.
//
// Why: the hero shows a brain at first paint, before any script runs, and
// keeps showing it when JavaScript or <canvas> is unavailable. Colours come
// from the page's CSS tokens (classes .bs-0 to .bs-3), so it follows the theme.
// The canvas fades in over it once brain.js is running.
//
//     node tools/prerender.js
//
// Rerun after changing the graph generator in assets/brain.js. No dependencies.
'use strict';
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const src = fs.readFileSync(path.join(root, 'assets/brain.js'), 'utf8');
// Lift rng() and gen() out of brain.js so the still frame uses the exact same graph.
const start = src.indexOf('function rng(');
const end = src.indexOf('function withAlpha(');
if (start < 0 || end < 0) throw new Error('could not find rng()/gen() in assets/brain.js');
const gen = new Function(src.slice(start, end) + '\nreturn gen;')();

const W = 600, H = 600, opts = { nodes: 300, seed: 11, angle: 0.9, tilt: -0.2, zoom: 1 };
const { N, E } = gen(opts.nodes, opts.seed);

// The projection from brain.js mount().project().
const ca = Math.cos(opts.angle), sa = Math.sin(opts.angle), ct = Math.cos(opts.tilt), st = Math.sin(opts.tilt);
const sc = Math.min(W, H) * 0.5 * opts.zoom, cx = W / 2, cy = H / 2, cam = 3.4;
for (const n of N) {
  const xr = n.x * ca + n.z * sa, zr = -n.x * sa + n.z * ca, y2 = n.y * ct - zr * st, z2 = n.y * st + zr * ct, p = cam / (cam - z2);
  n.sx = cx + xr * sc * p; n.sy = cy - y2 * sc * p; n.p = p; n.d = Math.max(0, Math.min(1, (z2 + 0.9) / 1.8));
}
const f = v => (Math.round(v * 10) / 10).toString();

// Edges in three depth bins, like the canvas renderer.
const bins = [[], [], []];
for (const [i, j] of E) {
  const a = N[i], b = N[j], dd = (a.d + b.d) / 2;
  bins[dd < 0.4 ? 0 : dd < 0.7 ? 1 : 2].push(`M${f(a.sx)} ${f(a.sy)}L${f(b.sx)} ${f(b.sy)}`);
}
const edges = bins.map((b, i) => `<path class="bs-e bs-e${i}" d="${b.join('')}"/>`).join('');

// Nodes back to front, grouped by type so each type is one fill.
const scale = Math.max(0.6, Math.min(W, H) / 520);
const glow = [[], [], [], []], dots = [[], [], [], []];
N.slice().sort((a, b) => a.d - b.d).forEach(n => {
  const r = (0.7 + n.size * 1.3) * n.p * (0.6 + 0.6 * n.d) * scale;
  const o = (0.4 + 0.6 * n.d).toFixed(2);
  if (n.size > 2) glow[n.type].push(`<circle cx="${f(n.sx)}" cy="${f(n.sy)}" r="${f(r * 6)}"/>`);
  dots[n.type].push(`<circle cx="${f(n.sx)}" cy="${f(n.sy)}" r="${f(r)}" opacity="${o}"/>`);
});
// Soft glows, like the canvas renderer's radial sprites; stop colours come from CSS.
const defs = '<defs>' + [0, 1, 2, 3].map(t =>
  `<radialGradient id="bsg-g${t}"><stop offset="0" class="bs-s${t}" stop-opacity=".5"/><stop offset=".2" class="bs-s${t}" stop-opacity=".25"/><stop offset="1" class="bs-s${t}" stop-opacity="0"/></radialGradient>`).join('') + '</defs>';
const nodes = [0, 1, 2, 3].map(t =>
  `<g class="bs-${t}"><g fill="url(#bsg-g${t})" class="bs-glow">${glow[t].join('')}</g>${dots[t].join('')}</g>`).join('');

const svg = `<svg class="brain-still" viewBox="0 0 ${W} ${H}" aria-hidden="true" focusable="false">${defs}<g id="bsg">${edges}${nodes}</g></svg>`;

// The sample data and its HTML helpers, from assets/livingbrain.js.
const js = fs.readFileSync(path.join(root, 'assets/livingbrain.js'), 'utf8');
const d0 = js.indexOf('// ---- data:start'), d1 = js.indexOf('// ---- data:end');
if (d0 < 0 || d1 < 0) throw new Error('data block not found in assets/livingbrain.js');
const LB = new Function(js.slice(d0, d1) + '\nreturn LB;')();
const g = LB.growth;

const parts = {
  'brain-still': svg,
  'demo-static': LB.staticSVG('routes'),
  'demo-panel': LB.panelHTML('routes'),
  'demo-chips': LB.chipsHTML('routes'),
  'agent-panel': LB.agentHTML(0),
  'growth': `<path class="g-area" d="${g.linksArea}"></path><path class="g-links" d="${g.links}"></path><path class="g-pages" d="${g.pages}"></path><path class="g-refreshed" d="${g.refreshed}"></path>`
};

// Each part lives on one or more pages; a part whose markers are on no page is an error.
const pages = ['index.html', 'how-it-works/index.html', 'agents/index.html'];
const found = {};
for (const page of pages) {
  const file = path.join(root, page);
  let html = fs.readFileSync(file, 'utf8');
  for (const [name, body] of Object.entries(parts)) {
    const re = new RegExp(`(<!-- ${name}:start -->)[\\s\\S]*?(<!-- ${name}:end -->)`);
    if (!re.test(html)) continue;
    html = html.replace(re, (m, a, b) => a + body + b);
    found[name] = (found[name] || []).concat(page);
  }
  fs.writeFileSync(file, html);
}
for (const [name, body] of Object.entries(parts)) {
  if (!found[name]) throw new Error(`markers for ${name} not found in ${pages.join(', ')}`);
  console.log(`${name.padEnd(12)} ${String(body.length).padStart(6)} bytes  ${found[name].join(', ')}`);
}
console.log(`brain: ${N.length} nodes, ${E.length} edges`);
