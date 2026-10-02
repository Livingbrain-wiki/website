// livingbrain.wiki page behaviour, ported from the Claude Design file
// `Living Brain.dc.html` (its DCLogic component, rewritten as plain DOM code).
//
// The page is complete without this file: the hero shows a still brain (an
// inline SVG written by tools/prerender.js), every infographic sits on its
// final frame, the demo shows a static graph with the Route Optimizer page
// open, and the FAQ is native <details>. This adds the theme toggle, the live
// brains (assets/brain.js), the scroll-triggered infographics, the explorable
// sample graph, the tabs, the access rings and the waitlist forms.
// Under prefers-reduced-motion nothing moves on its own: brains render still,
// infographics stay on their final frame, the demo stays a static graph.
(function () {
  'use strict';

  // ---- data:start ----------------------------------------------------------
  // Sample data for Kestrel Freight, a fictional company. tools/prerender.js
  // evaluates this block in Node to write the page's no-JS state, so keep it
  // free of DOM access.
  var LB = (function () {
    var T = {
      person: { folder: 'people', label: 'Person' },
      project: { folder: 'projects', label: 'Project' },
      decision: { folder: 'decisions', label: 'Decision' },
      customer: { folder: 'customers', label: 'Customer' }
    };
    var S = {
      pg: ['#eng', 'Maya Okafor', 'Feb 3 · 14:12', 'Dev and I are pairing on the PG16 cutover. I will own the runbook.'],
      solver: ['#routes', 'Maya Okafor', 'Mar 2 · 10:05', 'Solver rewrite is the Q2 goal. Benchmarks on Thursday.'],
      friday: ['#eng', 'Dev Patel', 'Jan 19 · 17:40', 'Proposal: no prod deploys after Thursday 16:00. Weekends are for sleeping.'],
      rollback: ['#eng', 'Dev Patel', 'Mar 14 · 09:51', 'Rolling back #412. The 502s on /api/routes come from the new pool config.'],
      owner: ['#product', 'Tomás Reyes', 'Mar 12 · 11:20', 'Lina is taking Billing v2 from here. Dev goes back to infra full time.'],
      v1: ['#leadership', 'Tomás Reyes', 'Feb 21 · 09:02', 'Decision: the v1 API goes away June 30. Every customer gets 90 days notice.'],
      support: ['#support', 'Sam Ito', 'Mar 1 · 08:30', 'Northwind and Alder are my two loudest accounts this quarter. Loop me in on anything routes.'],
      ship: ['#billing', 'Lina Haas', 'Mar 13 · 15:45', 'New date for Billing v2 is April 30. Tax rules took longer than planned.'],
      pg16: ['#eng', 'Maya Okafor', 'Jan 28 · 12:00', 'We are going to PG16. The logical replication fixes alone are worth it.'],
      mobile: ['#mobile', 'Kofi Mensah', 'Feb 25 · 16:10', 'Driver app still calls three v1 endpoints. Migrating them this sprint.'],
      bluepeak: ['#sales', 'Tomás Reyes', 'Feb 22 · 10:15', 'Bluepeak agreed to move to v2 by May. I will check in monthly.']
    };
    var raw = [
      ['maya', 'person', 'Maya Okafor', ['---', 'type: person', 'role: Engineering lead, Routes', 'updated: 2026-03-14', '---', '# Maya Okafor', 'Leads the [[Route Optimizer]] team and co-owns the [[Postgres 16 migration]] with [[Dev Patel]]. [^1]', '', '## Working on', '- Solver rewrite for [[Route Optimizer]], target end of Q2 [^2]', '- Reviewing offline sync in the [[Driver app]]', '', '## How she likes answers', '- Short, with links to PRs. Threads over DMs.'], ['pg', 'solver']],
      ['dev', 'person', 'Dev Patel', ['---', 'type: person', 'role: Site reliability, on-call lead', 'updated: 2026-03-14', '---', '# Dev Patel', 'Runs on-call and the deploy pipeline. Proposed [[No deploys on Fridays]]. [^1]', '', '## Recent', '- Rolled back deploy #412 after 502s on routes-api, Mar 14 [^2]', '- Pairing with [[Maya Okafor]] on the [[Postgres 16 migration]]', '', '## How he likes answers', '- Commands and numbers first, context after.'], ['friday', 'rollback']],
      ['lina', 'person', 'Lina Haas', ['---', 'type: person', 'role: Product manager, Billing', 'updated: 2026-03-13', '---', '# Lina Haas', 'Owns [[Billing v2]] since Mar 12, taking over from [[Dev Patel]]. [^1]', '', '## Accounts', '- Main contact for [[Alder & Finch]] on invoicing', '- Runs the comms plan for [[Sunset v1 API]]', '', '## How she likes answers', '- Full context, bullet points, a clear next step.'], ['owner']],
      ['tomas', 'person', 'Tomás Reyes', ['---', 'type: person', 'role: Co-founder, CEO', 'updated: 2026-03-12', '---', '# Tomás Reyes', 'Co-founder. Made the call on [[Sunset v1 API]]. [^1]', '', '## Relationships', '- Exec sponsor for [[Bluepeak Logistics]]', '- Weekly sync with [[Lina Haas]] on [[Billing v2]]', '', '## How he likes answers', '- One paragraph. Numbers over adjectives.'], ['v1']],
      ['sam', 'person', 'Sam Ito', ['---', 'type: person', 'role: Support lead', 'updated: 2026-03-14', '---', '# Sam Ito', 'Leads support. First to hear when [[Northwind Grocers]] or [[Alder & Finch]] see problems. [^1]', '', '## Recent', '- Asked about prod status during the routes-api 502s, Mar 14', '', '## How Sam likes answers', '- Plain language he can paste to a customer.'], ['support']],
      ['billing', 'project', 'Billing v2', ['---', 'type: project', 'status: in progress', 'owner: Lina Haas', 'ships: 2026-04-30', '---', '# Billing v2', 'Usage-based invoices for fleet customers. Owned by [[Lina Haas]] since Mar 12. [^1]', 'Ships Apr 30, moved from Mar 31. [^2]', '', '## Customers waiting', '- [[Alder & Finch]]', '- [[Northwind Grocers]]', '', '## Retired facts', '- Owner: Dev Patel (until Mar 12)'], ['owner', 'ship']],
      ['routes', 'project', 'Route Optimizer', ['---', 'type: project', 'status: in progress', 'owner: Maya Okafor', '---', '# Route Optimizer', 'Plans daily routes for [[Bluepeak Logistics]] and [[Northwind Grocers]]. Led by [[Maya Okafor]]. [^1]', '', '## Incidents', '- Mar 14: 502s on routes-api from 09:38 to 09:52 after deploy #412. Rolled back by [[Dev Patel]]. [^2]', '', '## Rules', '- Follows [[No deploys on Fridays]]'], ['solver', 'rollback']],
      ['pg', 'project', 'Postgres 16 migration', ['---', 'type: project', 'status: planned', 'owner: Maya Okafor, Dev Patel', '---', '# Postgres 16 migration', 'Moves the primary database to Postgres 16. Follows [[Move to Postgres 16]]. [^1]', '', '## Plan', '- Runbook by [[Maya Okafor]], cutover by [[Dev Patel]]', '- Target window: Apr 8, 02:00 UTC'], ['pg']],
      ['mobile', 'project', 'Driver app', ['---', 'type: project', 'status: in progress', '---', '# Driver app', 'iOS and Android app drivers use on the road. Must leave v1 before the [[Sunset v1 API]] date. [^1]', '', '- Offline sync under review by [[Maya Okafor]]'], ['mobile']],
      ['dfriday', 'decision', 'No deploys on Fridays', ['---', 'type: decision', 'decided: 2026-01-19', 'by: Dev Patel', '---', '# No deploys on Fridays', 'No production deploys after Thursday 16:00 until Monday. Proposed by [[Dev Patel]]. [^1]', '', '## Applies to', '- [[Route Optimizer]]', '- [[Billing v2]]'], ['friday']],
      ['dpg', 'decision', 'Move to Postgres 16', ['---', 'type: decision', 'decided: 2026-01-28', 'by: Maya Okafor', '---', '# Move to Postgres 16', 'Upgrade for logical replication fixes and faster vacuum. Work tracked in [[Postgres 16 migration]]. [^1]'], ['pg16']],
      ['dv1', 'decision', 'Sunset v1 API', ['---', 'type: decision', 'decided: 2026-02-21', 'by: Tomás Reyes', '---', '# Sunset v1 API', 'The v1 API shuts down Jun 30. Every customer gets 90 days notice. [^1]', '', '## Affected', '- [[Driver app]]', '- [[Bluepeak Logistics]]', '- Comms plan: [[Lina Haas]]'], ['v1']],
      ['northwind', 'customer', 'Northwind Grocers', ['---', 'type: customer', 'plan: Fleet, 140 vehicles', 'contact: Sam Ito', '---', '# Northwind Grocers', 'Regional grocery chain. Uses the [[Route Optimizer]] for morning deliveries. Support contact [[Sam Ito]]. [^1]', '', '## Open threads', '- Waiting on [[Billing v2]] for per-store invoices'], ['support']],
      ['alder', 'customer', 'Alder & Finch', ['---', 'type: customer', 'plan: Fleet, 60 vehicles', 'contact: Lina Haas', '---', '# Alder & Finch', 'Furniture delivery. Asked for usage-based invoices, which [[Billing v2]] covers. [^1]', '', '- Account contact: [[Lina Haas]]', '- Support contact: [[Sam Ito]]'], ['ship']],
      ['bluepeak', 'customer', 'Bluepeak Logistics', ['---', 'type: customer', 'plan: Enterprise', 'sponsor: Tomás Reyes', '---', '# Bluepeak Logistics', 'Largest account. Still on the v1 API, moving before the [[Sunset v1 API]] date. [^1]', '', '- Exec sponsor: [[Tomás Reyes]]', '- Uses [[Route Optimizer]]'], ['bluepeak']]
    ];
    var esc = function (s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); };
    var slug = function (s) { return s.toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''); };
    var ents = raw.map(function (r) {
      return { id: r[0], type: r[1], name: r[2], md: r[3], src: r[4].map(function (k) { return S[k]; }), path: 'brain/' + T[r[1]].folder + '/' + slug(r[2]) + '.md' };
    });
    var byId = {}, byName = {};
    ents.forEach(function (e) { byId[e.id] = e; byName[e.name] = e; });

    // Links come from the [[backlinks]] in each page; every entity also gets
    // four small "fact" nodes, and a few facts link across entities.
    var links = [], seen = {}, deg = {};
    ents.forEach(function (e) {
      e.md.join('\n').replace(/\[\[([^\]]+)\]\]/g, function (m, nm) {
        var t = byName[nm];
        if (t && t.id !== e.id) {
          var k = [e.id, t.id].sort().join('|');
          if (!seen[k]) { seen[k] = 1; links.push({ source: e.id, target: t.id, hot: true }); deg[e.id] = (deg[e.id] || 0) + 1; deg[t.id] = (deg[t.id] || 0) + 1; }
        }
        return m;
      });
    });
    var s = 7, rnd = function () { s = (s * 16807) % 2147483647; return s / 2147483647; };
    var nodes = ents.map(function (e) { return { id: e.id, name: e.name, type: e.type, val: 4 + (deg[e.id] || 0) * 1.6 }; });
    ents.forEach(function (e) { for (var k = 0; k < 4; k++) { var id = e.id + '-f' + k; nodes.push({ id: id, ent: e.id, type: 'fact', val: 0.6 }); links.push({ source: e.id, target: id }); } });
    for (var k = 0; k < 18; k++) {
      var a = ents[(rnd() * ents.length) | 0], b = ents[(rnd() * ents.length) | 0];
      if (a !== b) links.push({ source: a.id + '-f' + ((rnd() * 4) | 0), target: b.id + '-f' + ((rnd() * 4) | 0) });
    }

    // The static fallback: entities on an ellipse, grouped by type.
    var order = ['person', 'project', 'decision', 'customer'];
    var sorted = ents.slice().sort(function (p, q) { return order.indexOf(p.type) - order.indexOf(q.type); });
    var pos = {};
    sorted.forEach(function (e, i) { var an = (i / sorted.length) * Math.PI * 2 - Math.PI / 2; pos[e.id] = [300 + Math.cos(an) * 215, 215 + Math.sin(an) * 150]; });

    // Thirty sample days, each line scaled to its own total.
    var P = [], L = [], R = [];
    for (var i = 0; i < 30; i++) { var t = i / 29; P.push((1 - Math.exp(-t * 2.6)) / (1 - Math.exp(-2.6))); L.push(Math.pow(t, 1.45)); R.push(i < 6 ? 0 : Math.pow((i - 6) / 23, 1.25)); }
    var line = function (arr) { return arr.map(function (v, j) { return (j ? 'L' : 'M') + (20 + j * 560 / 29).toFixed(1) + ' ' + (212 - v * 176).toFixed(1); }).join(' '); };
    var growth = { pages: line(P), links: line(L), refreshed: line(R), linksArea: line(L) + ' L580 212 L20 212 Z' };

    var agents = [
      { label: 'Claude Code', lines: [['$', 'claude mcp add --transport http livingbrain https://mcp.livingbrain.wiki', 'cmd'], ['', 'Added HTTP MCP server livingbrain', 'out'], ['$', 'claude', 'cmd'], ['', '✓ livingbrain connected · 14 tools', 'ok']] },
      { label: 'Codex', lines: [['$', 'codex mcp add livingbrain --url https://mcp.livingbrain.wiki', 'cmd'], ['', 'Added livingbrain to ~/.codex/config.toml', 'out'], ['', '✓ livingbrain connected · 14 tools', 'ok']] },
      { label: 'Cursor', lines: [['', '// .cursor/mcp.json', 'com'], ['', '{ "mcpServers": { "livingbrain": {', 'cmd'], ['', '    "url": "https://mcp.livingbrain.wiki" } } }', 'cmd'], ['', '✓ livingbrain connected · 14 tools', 'ok']] },
      { label: 'Other MCP', lines: [['', '# any agent that speaks MCP', 'com'], ['', 'url:  https://mcp.livingbrain.wiki', 'cmd'], ['', 'auth: sign in to your workspace', 'cmd'], ['', '✓ reads with your own access', 'ok']] }
    ];

    // ---- HTML for the parts that change on interaction ----
    var panelHTML = function (id) {
      var e = byId[id] || ents[0], fm = 0;
      var lines = e.md.map(function (ln) {
        var kind = 'body';
        if (ln.trim() === '---') { fm++; kind = 'meta'; } else if (fm === 1) kind = 'meta'; else if (ln.charAt(0) === '#') kind = 'head';
        var segs = ln.split(/(\[\[[^\]]+\]\]|\[\^\d+\])/).filter(function (x) { return x !== ''; }).map(function (x) {
          if (x.indexOf('[[') === 0) { var tg = byName[x.slice(2, -2)]; if (tg) return '<button type="button" class="md__link" data-goto="' + tg.id + '">' + esc(x) + '</button>'; }
          if (/^\[\^\d+\]$/.test(x)) return '<span class="md__cite">' + x + '</span>';
          return esc(x);
        }).join('');
        return '<div class="md__l md__l--' + kind + '">' + segs + '</div>';
      }).join('');
      var src = e.src.map(function (s2, j) {
        return '<li class="src"><span class="src__label">[' + (j + 1) + '] ' + esc(s2[0] + ' · ' + s2[1] + ' · ' + s2[2]) + '</span><p>' + esc(s2[3]) + '</p></li>';
      }).join('');
      return '<p class="panel__path"><span class="dot dot--' + e.type + '" aria-hidden="true"></span>' + esc(e.path) + '</p>' +
        '<div class="md">' + lines + '</div>' +
        '<h3 class="panel__h">Sources</h3><ul class="srcs">' + src + '</ul>';
    };
    var chipsHTML = function (sel) {
      return ents.map(function (e) {
        return '<button type="button" class="chip" data-goto="' + e.id + '" aria-pressed="' + (e.id === sel) + '"><span class="dot dot--' + e.type + '" aria-hidden="true"></span>' + esc(e.name) + '</button>';
      }).join('');
    };
    var staticSVG = function (sel) {
      var ed = links.filter(function (l) { return l.hot; }).map(function (l) {
        var a = pos[l.source], b = pos[l.target];
        return '<line x1="' + a[0].toFixed(1) + '" y1="' + a[1].toFixed(1) + '" x2="' + b[0].toFixed(1) + '" y2="' + b[1].toFixed(1) + '"/>';
      }).join('');
      var nd = ents.map(function (e) {
        var p = pos[e.id], on = e.id === sel;
        return '<g class="sg__n" data-goto="' + e.id + '"><circle class="' + (on ? 'f-accent' : 'f-' + e.type) + '" cx="' + p[0].toFixed(1) + '" cy="' + p[1].toFixed(1) + '" r="' + (on ? 11 : 8) + '"/>' +
          '<text x="' + p[0].toFixed(1) + '" y="' + (p[1] + 24).toFixed(1) + '">' + esc(e.name) + '</text></g>';
      }).join('');
      return '<g class="sg__e">' + ed + '</g>' + nd;
    };
    var agentHTML = function (i) {
      return agents[i].lines.map(function (l) {
        return '<div class="term__l"><span class="term__p" aria-hidden="' + (l[0] ? 'false' : 'true') + '">' + esc(l[0]) + '</span><span class="term__t term__t--' + l[2] + '">' + esc(l[1]) + '</span></div>';
      }).join('');
    };

    return { T: T, ents: ents, byId: byId, graph: { nodes: nodes, links: links }, growth: growth, agents: agents,
      panelHTML: panelHTML, chipsHTML: chipsHTML, staticSVG: staticSVG, agentHTML: agentHTML };
  })();
  // ---- data:end ------------------------------------------------------------

  if (typeof document === 'undefined') return;

  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var root = document.documentElement;
  var mq = function (q) { return window.matchMedia ? window.matchMedia(q) : { matches: false }; };
  var reduce = mq('(prefers-reduced-motion: reduce)').matches;
  var get = function (k) { try { return localStorage.getItem(k); } catch (e) { return null; } };
  var put = function (k, v) { try { localStorage.setItem(k, v); } catch (e) { /* storage blocked */ } };
  var emitTheme = function () { requestAnimationFrame(function () { window.dispatchEvent(new Event('lb-theme')); }); };

  // ---- theme: the inline <head> script already applied the stored or system choice ----
  var themeBtn = $('[data-theme-toggle]');
  var paintTheme = function () {
    if (!themeBtn) return;
    var light = root.getAttribute('data-theme') === 'light';
    $('[data-theme-label]', themeBtn).textContent = light ? 'Dark' : 'Light';
    themeBtn.setAttribute('aria-label', light ? 'Switch to dark theme' : 'Switch to light theme');
  };
  var setTheme = function (t, save) {
    root.setAttribute('data-theme', t);
    if (save) put('lb-theme', t);
    paintTheme();
    emitTheme();
  };
  if (themeBtn) {
    themeBtn.hidden = false;
    paintTheme();
    themeBtn.addEventListener('click', function () { setTheme(root.getAttribute('data-theme') === 'light' ? 'dark' : 'light', true); });
  }
  var sys = mq('(prefers-color-scheme: light)');
  if (sys.addEventListener) sys.addEventListener('change', function (e) { if (!get('lb-theme')) setTheme(e.matches ? 'light' : 'dark', false); });

  // ---- live brains (assets/brain.js). Each frame keeps its still SVG until the canvas runs ----
  var brains = {};
  var mountBrain = function (name, opts) {
    var cv = $('[data-brain="' + name + '"]');
    if (!cv || !window.LivingBrain || !cv.getContext || !cv.getContext('2d')) return null;
    try {
      var b = window.LivingBrain.mount(cv, Object.assign({ still: reduce, alive: !reduce }, opts));
      var frame = cv.closest('[data-brain-frame]');
      if (frame) requestAnimationFrame(function () { frame.classList.add('is-live'); });
      brains[name] = b;
      return b;
    } catch (e) { return null; }
  };
  mountBrain('hero', { nodes: 300, seed: 11, density: reduce ? 1 : 0.6, grow: !reduce, speed: 0.06 });
  mountBrain('agents', { nodes: 200, seed: 5, reserve: 0.3, speed: 0.08 });
  mountBrain('colony', { nodes: 230, seed: 31, reserve: 0.25, colonies: 3, speed: 0.05 });
  mountBrain('own', { nodes: 240, seed: 23, density: reduce ? 1 : 0.08, speed: 0.05 });

  // ---- scroll-triggered infographics ----
  // [data-play] sections start when scrolled into view. Inside, [data-a]
  // elements animate (Web Animations API), [data-travel] shapes ride an SVG
  // path, [data-near] labels brighten as a traveller passes, [data-count]
  // numbers count up. The markup is the final frame.
  var makeAnim = function (el) {
    var ds = el.dataset, d = +ds.d || 0, t = +ds.t || 700, loop = ds.loop === '1', x = +ds.x || 0, kf;
    var ease = ds.e || 'cubic-bezier(.2,.7,.2,1)';
    if (el instanceof SVGElement) { el.style.transformBox = 'fill-box'; el.style.transformOrigin = ds.o || 'center'; } else if (ds.o) el.style.transformOrigin = ds.o;
    switch (ds.a) {
      case 'fadeUp': kf = [{ opacity: 0, transform: 'translateY(14px)' }, { opacity: 1, transform: 'translateY(0)' }]; break;
      case 'fade': kf = [{ opacity: 0 }, { opacity: 1 }]; break;
      case 'pop': kf = [{ opacity: 0, transform: 'scale(.3)' }, { opacity: 1, transform: 'scale(1.12)', offset: 0.7 }, { opacity: 1, transform: 'scale(1)' }]; break;
      case 'draw': { var len = el.getTotalLength ? el.getTotalLength() : 100; el.style.strokeDasharray = len; kf = [{ strokeDashoffset: len }, { strokeDashoffset: 0 }]; break; }
      case 'growX': kf = [{ transform: 'scaleX(0)' }, { transform: 'scaleX(1)' }]; if (!ds.o) el.style.transformOrigin = 'left center'; break;
      case 'growY': kf = [{ transform: 'scaleY(0)' }, { transform: 'scaleY(1)' }]; if (!ds.o) el.style.transformOrigin = 'center top'; break;
      case 'reveal': kf = [{ clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0% 0 0)' }]; break;
      case 'type': kf = [{ clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0% 0 0)' }]; ease = 'steps(' + (+ds.steps || 20) + ')'; break;
      case 'stale': kf = [{ opacity: 1 }, { opacity: 0.4 }]; break;
      case 'redact': kf = [{ filter: 'blur(0px)', opacity: 1 }, { filter: 'blur(5px)', opacity: 0.7 }]; break;
      case 'blip': kf = [{ opacity: 0 }, { opacity: 1, offset: 0.15 }, { opacity: 1, offset: 0.85 }, { opacity: 0 }]; break;
      case 'breathe': kf = [{ opacity: 0, transform: 'scale(.9)' }, { opacity: 0.8, transform: 'scale(1)', offset: 0.2 }, { opacity: 0, transform: 'scale(1.7)' }]; ease = 'ease-out'; break;
      case 'merge': kf = [{ transform: 'translateX(0)', opacity: 1 }, { transform: 'translateX(0)', opacity: 1, offset: 0.3 }, { transform: 'translateX(' + x + 'px)', opacity: 1, offset: 0.62 }, { transform: 'translateX(' + x + 'px)', opacity: 0, offset: 0.68 }, { transform: 'translateX(0)', opacity: 0, offset: 0.92 }, { transform: 'translateX(0)', opacity: 1 }]; ease = 'ease-in-out'; break;
      case 'mergedIn': kf = [{ opacity: 0 }, { opacity: 0, offset: 0.62 }, { opacity: 1, offset: 0.68 }, { opacity: 1, offset: 0.9 }, { opacity: 0 }]; ease = 'linear'; break;
      case 'spark': kf = [{ opacity: 0, transform: 'scale(.3)' }, { opacity: 0, transform: 'scale(.3)', offset: 0.6 }, { opacity: 1, transform: 'scale(1)', offset: 0.64 }, { opacity: 0, transform: 'scale(2.4)', offset: 0.8 }, { opacity: 0, transform: 'scale(2.4)' }]; ease = 'linear'; break;
      default: return null;
    }
    return el.animate(kf, { duration: t, delay: d, easing: ease, fill: loop ? 'none' : 'both', iterations: loop ? Infinity : 1 });
  };
  var fmt = function (n, el) { return (el.dataset.pre || '') + Math.round(n).toLocaleString('en-US'); };

  var sections = [], travellers = [], near = [], timers = [];
  var leaderFrame = function (sec, k) {
    var rows = $$('[data-lb]', sec), h = +sec.dataset.row || 56;
    var vals = rows.map(function (r) { var a = +r.dataset.from, b = +r.dataset.to; return a + (b - a) * k; });
    var rank = vals.map(function (v, i) { return vals.filter(function (w, j) { return w > v || (w === v && j < i); }).length; });
    rows.forEach(function (r, i) { r.style.transform = 'translateY(' + (rank[i] - +r.dataset.final) * h + 'px)'; var n = $('[data-lbn]', r); if (n) n.textContent = Math.round(vals[i]); });
  };
  var tween = function (dur, delay, fn) {
    var t0 = performance.now() + delay;
    var f = function (now) { var k = Math.max(0, Math.min(1, (now - t0) / dur)); fn(k); if (k < 1) requestAnimationFrame(f); };
    requestAnimationFrame(f);
  };
  var startHook = function (rec) {
    var kind = rec.kind;
    if (kind === 'growth' && brains.own && !reduce) tween(4200, 300, function (k) { brains.own.setDensity(0.08 + 0.92 * (1 - Math.pow(1 - k, 2))); });
    if (reduce) return;
    rec.counters.forEach(function (el) {
      var to = +el.dataset.to, dur = +el.dataset.dur || 1800, delay = +el.dataset.d || 0;
      tween(dur, delay, function (k) { el.textContent = fmt(to * (1 - Math.pow(1 - k, 3)), el); });
    });
    if (kind === 'rings') timers.push(setInterval(function () { if (rec.visible && !userScope) setScope((scope + 1) % 3, false); }, 2600));
    if (kind === 'agents') timers.push(setInterval(function () { if (rec.visible && brains.agents) brains.agents.spark(); }, 1300));
    if (kind === 'colony') {
      var lines = ['booting microVM · 1.1s', 'cloning kestrel/routes', 'reading brief · 6 facts', 'cargo test · 212 passed, 1 failed', 'editing src/eta/tz.rs', 'cargo test · 213 passed', 'opening pull request #219'];
      var els = $$('[data-ticker]', rec.el), i = lines.length - 1;
      timers.push(setInterval(function () {
        if (!rec.visible) return;
        i = (i + 1) % lines.length;
        els.forEach(function (el) { el.textContent = lines[i]; if (el.animate) el.animate([{ opacity: 0, transform: 'translateY(6px)' }, { opacity: 1, transform: 'none' }], { duration: 300 }); });
      }, 1200));
    }
    if (kind === 'leader') tween(4800, 700, function (k) { leaderFrame(rec.el, k); });
  };

  var loopRaf = 0;
  var tick = function () {
    loopRaf = 0;
    var now = performance.now(), ph = {}, any = false;
    travellers.forEach(function (t) {
      var rec = t.rec;
      if (!rec || !rec.started || !rec.visible) return;
      any = true;
      var raw = (((now - rec.t0) / t.dur) + t.off) % 1, f = t.rev ? 1 - raw : raw;
      var pt = t.p.getPointAtLength(f * t.L);
      t.el.setAttribute('transform', 'translate(' + pt.x.toFixed(1) + ' ' + pt.y.toFixed(1) + ')');
      t.el.style.opacity = Math.min(1, raw / 0.08, (1 - raw) / 0.08).toFixed(3);
      if (t.key) ph[t.key] = f;
    });
    near.forEach(function (n) {
      var p = ph[n.key]; if (p == null) return;
      var d = Math.abs(p - n.at); d = Math.min(d, 1 - d);
      n.el.style.opacity = (0.35 + 0.65 * Math.max(0, 1 - d * 7)).toFixed(3);
    });
    if (any && !document.hidden) loopRaf = requestAnimationFrame(tick);
  };
  var wake = function () { if (!reduce && !loopRaf) loopRaf = requestAnimationFrame(tick); };
  document.addEventListener('visibilitychange', wake);

  $$('[data-play]').forEach(function (sec) {
    var rec = { el: sec, kind: sec.dataset.play, anims: [], started: false, visible: false, t0: 0, counters: $$('[data-count]', sec) };
    if (!reduce && sec.animate) {
      $$('[data-a]', sec).forEach(function (el) { var a = makeAnim(el); if (a) { a.pause(); a.currentTime = 0; rec.anims.push(a); } });
      rec.counters.forEach(function (el) { el.textContent = fmt(0, el); });
      if (rec.kind === 'leader') leaderFrame(sec, 0);
      sec.classList.add('is-armed');
    }
    sections.push(rec);
  });
  var recOf = function (el) { var s = el.closest('[data-play]'); for (var i = 0; i < sections.length; i++) if (sections[i].el === s) return sections[i]; return null; };
  $$('[data-travel]').forEach(function (el) {
    var svg = el.ownerSVGElement, p = svg && svg.querySelector('#' + el.dataset.travel);
    if (!p || !p.getTotalLength) return;
    var t = { el: el, p: p, L: p.getTotalLength(), dur: +el.dataset.dur || 3000, off: +el.dataset.off || 0, rev: el.dataset.rev === '1', key: el.dataset.key, rec: recOf(el) };
    travellers.push(t);
    // Reduced motion: park each traveller halfway along its path.
    var pt = p.getPointAtLength(((t.off + 0.5) % 1) * t.L);
    el.setAttribute('transform', 'translate(' + pt.x.toFixed(1) + ' ' + pt.y.toFixed(1) + ')');
    el.style.opacity = reduce ? 1 : 0;
  });
  $$('[data-near]').forEach(function (el) { near.push({ el: el, key: el.dataset.near, at: +el.dataset.at || 0 }); if (reduce) el.style.opacity = 1; });

  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (en) {
        var rec = null; for (var i = 0; i < sections.length; i++) if (sections[i].el === en.target) rec = sections[i];
        if (!rec) return;
        rec.visible = en.isIntersecting;
        if (en.isIntersecting && !rec.started) {
          rec.started = true; rec.t0 = performance.now();
          rec.anims.forEach(function (a) { a.play(); });
          startHook(rec);
        }
        if (en.isIntersecting) wake();
      });
    }, { rootMargin: '0px 0px -18% 0px' });
    sections.forEach(function (r) { io.observe(r.el); });
  } else {
    sections.forEach(function (r) { r.anims.forEach(function (a) { a.finish(); }); });
  }

  // ---- the citation trail in the Slack thread: answer chip → source message ----
  var slack = $('[data-trail-box]');
  var layoutTrail = function (resized) {
    if (!slack) return;
    var c = $('[data-chip]', slack), s = $('[data-src]', slack), p = $('[data-trail]', slack);
    if (!c || !s || !p) return;
    var b = slack.getBoundingClientRect(), cr = c.getBoundingClientRect(), sr = s.getBoundingClientRect();
    var x0 = cr.left - b.left - 2, y0 = cr.top - b.top + cr.height / 2, x1 = sr.left - b.left - 2, y1 = sr.top - b.top + 25, g = 12;
    p.setAttribute('d', 'M' + x0 + ' ' + y0 + ' C ' + g + ' ' + y0 + ', ' + g + ' ' + y0 + ', ' + g + ' ' + (y0 + y1) / 2 + ' S ' + g + ' ' + y1 + ', ' + x1 + ' ' + y1);
    var d = $$('[data-trail-dot]', slack);
    d[0].setAttribute('cx', x0); d[0].setAttribute('cy', y0); d[1].setAttribute('cx', x1); d[1].setAttribute('cy', y1);
    if (resized) p.style.strokeDasharray = 'none';
  };
  layoutTrail(false);
  // The trail's draw animation measured the path above; re-measure once fonts settle.
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(function () { layoutTrail(true); });
  var rzT = 0;
  window.addEventListener('resize', function () { clearTimeout(rzT); rzT = setTimeout(function () { layoutTrail(true); }, 80); });

  // ---- access rings: where the question is asked decides what it can use ----
  var scope = 0, userScope = false;
  var ringsSec = $('[data-play="rings"]');
  var setScope = function (i, byUser) {
    scope = i; if (byUser) userScope = true;
    if (!ringsSec) return;
    ringsSec.setAttribute('data-scope', String(i));
    $$('[data-scope-btn]', ringsSec).forEach(function (b, j) { b.setAttribute('aria-pressed', String(j === i)); });
  };
  if (ringsSec) $$('[data-scope-btn]', ringsSec).forEach(function (b, j) { b.addEventListener('click', function () { setScope(j, true); }); });

  // ---- agent connect tabs (ARIA tabs, arrow keys move between them) ----
  var tabs = $$('[data-agent-tab]'), tabPanel = $('[data-agent-panel]');
  var selectTab = function (i, focus) {
    tabs.forEach(function (t, j) { var on = j === i; t.setAttribute('aria-selected', String(on)); t.tabIndex = on ? 0 : -1; });
    if (tabPanel) { tabPanel.innerHTML = LB.agentHTML(i); tabPanel.setAttribute('aria-labelledby', tabs[i].id); }
    if (focus) tabs[i].focus();
  };
  tabs.forEach(function (t, i) {
    t.addEventListener('click', function () { selectTab(i, false); });
    t.addEventListener('keydown', function (e) {
      var k = e.key, n = tabs.length, j = k === 'ArrowRight' ? (i + 1) % n : k === 'ArrowLeft' ? (i + n - 1) % n : k === 'Home' ? 0 : k === 'End' ? n - 1 : -1;
      if (j >= 0) { e.preventDefault(); selectTab(j, true); }
    });
  });

  // ---- orbit controls, shared by the hero brain and the sample graph ----
  // Drag or swipe to orbit (with inertia), wheel or pinch to zoom, arrow keys
  // to turn, + and - to zoom. h: rotate(dYaw, dPitch), zoom(factor),
  // tap(x, y), hover(x, y | null), begin(), idle(). Under reduced motion
  // there is no inertia; manual orbit still works.
  function orbit(el, h, opt) {
    opt = opt || {};
    var ptrs = {}, moved = 0, downAt = null, pinch = 0, vx = 0, vy = 0, lastT = 0, inert = 0, idleT = 0, K = 0.008;
    var local = function (e) { var r = el.getBoundingClientRect(); return { x: e.clientX - r.left, y: e.clientY - r.top }; };
    var count = function () { return Object.keys(ptrs).length; };
    var settle = function () { clearTimeout(idleT); idleT = setTimeout(function () { if (!count() && !inert) h.idle(); }, opt.idleMs || 3000); };
    var stopInertia = function () { if (inert) cancelAnimationFrame(inert); inert = 0; };
    var glide = function () {
      vx *= 0.94; vy *= 0.94;
      if (Math.abs(vx) + Math.abs(vy) < 0.0004) { inert = 0; settle(); return; }
      h.rotate(vx * 16, vy * 16);
      inert = requestAnimationFrame(glide);
    };
    el.addEventListener('pointerdown', function (e) {
      if (e.button > 0) return;
      ptrs[e.pointerId] = local(e);
      if (e.pointerType === 'mouse') { try { el.setPointerCapture(e.pointerId); } catch (x) { /* ignore */ } }
      stopInertia(); clearTimeout(idleT); vx = vy = 0; lastT = performance.now();
      if (count() === 1) { downAt = ptrs[e.pointerId]; moved = 0; }
      if (count() === 2) { var ids = Object.keys(ptrs), a = ptrs[ids[0]], b = ptrs[ids[1]]; pinch = Math.hypot(a.x - b.x, a.y - b.y); }
      h.begin(); el.classList.add('is-dragging');
    });
    el.addEventListener('pointermove', function (e) {
      var p = local(e), prev = ptrs[e.pointerId];
      if (!prev) { if (h.hover) h.hover(p.x, p.y); return; }
      ptrs[e.pointerId] = p;
      if (count() === 2) {
        var ids = Object.keys(ptrs), a = ptrs[ids[0]], b = ptrs[ids[1]], d = Math.hypot(a.x - b.x, a.y - b.y);
        if (pinch && h.zoom) h.zoom(d / pinch); pinch = d; moved += 10; return;
      }
      var dx = p.x - prev.x, dy = opt.yawOnly ? 0 : p.y - prev.y, now = performance.now(), dt = Math.max(1, now - lastT); lastT = now;
      moved += Math.abs(dx) + Math.abs(dy);
      vx = 0.7 * vx + 0.3 * (dx * K / dt); vy = 0.7 * vy + 0.3 * (dy * K / dt);
      h.rotate(dx * K, dy * K);
    });
    var up = function (e) {
      var p = ptrs[e.pointerId]; if (!p) return; delete ptrs[e.pointerId];
      if (count()) return;
      el.classList.remove('is-dragging'); pinch = 0;
      if (e.type === 'pointerup' && downAt && moved < 6) { if (h.tap) h.tap(p.x, p.y); settle(); }
      else if (!reduce && performance.now() - lastT < 80 && Math.abs(vx) + Math.abs(vy) > 0.001) inert = requestAnimationFrame(glide);
      else settle();
      downAt = null;
    };
    el.addEventListener('pointerup', up); el.addEventListener('pointercancel', up);
    el.addEventListener('pointerleave', function () { if (!count() && h.hover) h.hover(null); });
    if (opt.wheel && h.zoom) el.addEventListener('wheel', function (e) { e.preventDefault(); stopInertia(); h.begin(); h.zoom(Math.exp(-e.deltaY * 0.0015)); settle(); }, { passive: false });
    el.addEventListener('keydown', function (e) {
      var k = e.key, s = 0.14;
      if (k === 'ArrowLeft') h.rotate(-s, 0); else if (k === 'ArrowRight') h.rotate(s, 0);
      else if (k === 'ArrowUp') h.rotate(0, -s); else if (k === 'ArrowDown') h.rotate(0, s);
      else if ((k === '+' || k === '=') && h.zoom) h.zoom(1.15); else if ((k === '-' || k === '_') && h.zoom) h.zoom(1 / 1.15);
      else return;
      e.preventDefault(); stopInertia(); h.begin(); settle();
    });
  }

  // The hero brain turns under your hand too. Touch keeps vertical page scrolling.
  (function () {
    var cv = $('[data-brain="hero"]'), b = brains.hero;
    if (!cv || !b || !b.setAngle) return;
    var names = ['a person', 'a project', 'a decision', 'a customer'];
    cv.tabIndex = 0;
    orbit(cv, {
      begin: function () { b.setSpeed(0); },
      idle: function () { b.setSpeed(reduce ? 0 : 0.06); },
      rotate: function (dy, dp) { b.setAngle(b.getAngle() + dy); b.setTilt(Math.max(-0.8, Math.min(0.6, b.getTilt() - dp))); },
      zoom: function (f) { b.setZoom(Math.max(0.7, Math.min(1.6, b.getZoom() * f))); },
      hover: function (x, y) {
        var n = x == null ? null : b.pick(x, y, 9);
        cv.style.cursor = n ? 'pointer' : '';
        cv.title = n ? 'A node for ' + names[n.type] + ' (illustration)' : '';
      }
    }, { idleMs: 2500 });
  })();

  // ---- the sample brain: a 3D force graph drawn on a 2D canvas ----
  var demo = $('[data-demo]');
  if (demo) (function () {
    var sel = 'routes';
    var panel = $('[data-panel]'), chips = $('[data-chips]'), svg = $('[data-static-graph]'), status = $('[data-demo-status]'), hint = $('[data-demo-hint]');
    var cv = $('[data-demo-canvas]', demo), graph = null, hidden = {};

    var select = function (id, focus) {
      if (!LB.byId[id]) return;
      sel = id;
      panel.innerHTML = LB.panelHTML(id);
      panel.scrollTop = 0;
      $$('[data-goto]', chips).forEach(function (b) { b.setAttribute('aria-pressed', String(b.dataset.goto === id)); });
      if (svg) svg.innerHTML = LB.staticSVG(id);
      if (status) status.textContent = 'Showing ' + LB.byId[id].name;
      if (graph) graph.select(id, focus);
    };
    var onGoto = function (e) {
      var b = e.target.closest('[data-goto]');
      if (b) select(b.dataset.goto, true);
    };
    panel.addEventListener('click', onGoto);
    chips.addEventListener('click', onGoto);
    if (svg) svg.addEventListener('click', onGoto);

    // Type filters: hide or show people, projects, decisions, customers.
    $$('[data-type-filter]').forEach(function (b) {
      b.addEventListener('click', function () {
        var t = b.dataset.typeFilter, on = b.getAttribute('aria-pressed') !== 'true';
        b.setAttribute('aria-pressed', String(on));
        if (on) delete hidden[t]; else hidden[t] = true;
        $$('[data-goto]', chips).forEach(function (c) { var e = LB.byId[c.dataset.goto]; c.hidden = !!hidden[e.type]; });
        if (graph) graph.filter(hidden);
        if (status) status.textContent = (on ? 'Showing ' : 'Hiding ') + t + ' nodes';
      });
    });

    var hasCanvas = cv && cv.getContext && cv.getContext('2d');
    if (!hasCanvas) { if (hint) hint.textContent = 'Static view · click a node or use the list below'; return; }

    var start = function () {
      graph = forceGraph(cv, LB.graph, { selected: sel, onPick: function (id) { select(id, true); } });
      if (!graph) return;
      graph.filter(hidden);
      demo.classList.add('is-live');
      if (hint) hint.textContent = 'Drag to orbit · scroll or pinch to zoom · click a node · arrow keys and + − work too';
    };
    // Build the graph when it comes near the viewport.
    if ('IntersectionObserver' in window) {
      var dio = new IntersectionObserver(function (es) { if (es.some(function (e) { return e.isIntersecting; })) { dio.disconnect(); start(); } }, { rootMargin: '600px' });
      dio.observe(demo);
    } else start();
  })();

  function forceGraph(cv, data, o) {
    var ctx = cv.getContext('2d');
    var byId = {}, nodes = data.nodes.map(function (n) { var c = Object.assign({}, n); byId[c.id] = c; return c; });
    nodes.forEach(function (n) { n.kind = n.type === 'fact' ? byId[n.ent].type : n.type; });
    var links = data.links.map(function (l) { return { a: byId[l.source], b: byId[l.target], hot: !!l.hot }; });
    var deg = {}; links.forEach(function (l) { deg[l.a.id] = (deg[l.a.id] || 0) + 1; deg[l.b.id] = (deg[l.b.id] || 0) + 1; });

    // Layout: a d3-style simulation (many-body, links, centering) run to rest up front.
    var s = 3, rnd = function () { s = (s * 16807) % 2147483647; return s / 2147483647; };
    nodes.forEach(function (n) { var u = rnd() * 2 - 1, th = rnd() * 6.2832, r = 40 * Math.cbrt(rnd()), q = Math.sqrt(1 - u * u); n.x = r * q * Math.cos(th); n.y = r * u; n.z = r * q * Math.sin(th); n.vx = n.vy = n.vz = 0; n.r = Math.cbrt(n.val) * 3.2; n.str = n.type === 'fact' ? -14 : -90; });
    for (var it = 0, alpha = 1; it < 320; it++, alpha *= 0.982) {
      for (var i = 0; i < nodes.length; i++) for (var j = i + 1; j < nodes.length; j++) {
        var a = nodes[i], b = nodes[j], dx = b.x - a.x, dy = b.y - a.y, dz = b.z - a.z, l2 = dx * dx + dy * dy + dz * dz + 0.01;
        var fa = b.str * alpha / l2, fb = a.str * alpha / l2;
        a.vx += dx * fa; a.vy += dy * fa; a.vz += dz * fa; b.vx -= dx * fb; b.vy -= dy * fb; b.vz -= dz * fb;
      }
      links.forEach(function (lk) {
        var a2 = lk.a, b2 = lk.b, dx2 = b2.x - a2.x, dy2 = b2.y - a2.y, dz2 = b2.z - a2.z, len = Math.sqrt(dx2 * dx2 + dy2 * dy2 + dz2 * dz2) || 1;
        var k = (len - (lk.hot ? 46 : 16)) / len * alpha / Math.min(deg[a2.id], deg[b2.id]) * 0.5;
        a2.vx += dx2 * k; a2.vy += dy2 * k; a2.vz += dz2 * k; b2.vx -= dx2 * k; b2.vy -= dy2 * k; b2.vz -= dz2 * k;
      });
      var mx = 0, my = 0, mz = 0;
      nodes.forEach(function (n) { n.vx *= 0.6; n.vy *= 0.6; n.vz *= 0.6; n.x += n.vx; n.y += n.vy; n.z += n.vz; mx += n.x; my += n.y; mz += n.z; });
      mx /= nodes.length; my /= nodes.length; mz /= nodes.length;
      nodes.forEach(function (n) { n.x -= mx; n.y -= my; n.z -= mz; });
    }
    // Fit the camera to the body of the graph (85th percentile radius), not to one stray fact.
    var radii = nodes.map(function (n) { return Math.sqrt(n.x * n.x + n.y * n.y + n.z * n.z); }).sort(function (p, q) { return p - q; });
    var R = Math.max(1, radii[Math.floor(radii.length * 0.85)]);

    var W = 0, H = 0, dpr = 1, col = {}, sel = o.selected, hover = null, hidden = {};
    var yaw = 0.4, pitch = 0.18, zoom = 1, auto = !reduce, visible = true, raf = 0, last = 0, clock = 0, anim = null;
    var shown = function (n) { return !hidden[n.kind]; };
    var readCols = function () {
      var cs = getComputedStyle(root), v = function (k) { return cs.getPropertyValue(k).trim() || '#889'; };
      col = { person: v('--t-person'), project: v('--t-project'), decision: v('--t-decision'), customer: v('--t-customer'), fact: v('--t-fact'), accent: v('--accent'), edge: v('--graph-edge'), ink: v('--ink'), ink2: v('--ink2'), bg: v('--bg'), mono: v('--f-mono') };
    };
    var resize = function () {
      var r = cv.getBoundingClientRect(); dpr = Math.min(2, window.devicePixelRatio || 1);
      W = r.width; H = r.height; cv.width = Math.max(1, Math.round(W * dpr)); cv.height = Math.max(1, Math.round(H * dpr));
      draw();
    };
    var project = function () {
      var cy = Math.cos(yaw), sy = Math.sin(yaw), cp = Math.cos(pitch), sp = Math.sin(pitch);
      var sc = Math.min(W, H) * 0.4 / R * zoom, D = R * 4;
      nodes.forEach(function (n) {
        var x1 = n.x * cy + n.z * sy, z1 = -n.x * sy + n.z * cy, y1 = n.y * cp - z1 * sp, z2 = n.y * sp + z1 * cp, p = D / Math.max(R * 0.4, D - z2);
        n.sx = W / 2 + x1 * sc * p; n.sy = H / 2 - y1 * sc * p; n.sr = n.r * sc * p * 1.3; n.dz = Math.max(0, Math.min(1, (z2 / R + 1) / 2));
      });
    };
    var touches = function (l) { return l.a.id === sel || l.b.id === sel; };
    var colorOf = function (n) {
      if (n.type === 'fact') return n.ent === sel ? col.accent : col.fact;
      return n.id === sel ? col.accent : col[n.type];
    };
    function draw() {
      if (!W) return;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0); ctx.clearRect(0, 0, W, H); project();
      ctx.lineCap = 'round';
      links.forEach(function (l) {
        if (!shown(l.a) || !shown(l.b)) return;
        var on = touches(l);
        ctx.globalAlpha = on ? 0.85 : (l.hot ? 0.34 : 0.2) * (0.5 + 0.5 * (l.a.dz + l.b.dz) / 2);
        ctx.strokeStyle = on ? col.accent : col.edge; ctx.lineWidth = on ? 1.4 : 0.8;
        ctx.beginPath(); ctx.moveTo(l.a.sx, l.a.sy); ctx.lineTo(l.b.sx, l.b.sy); ctx.stroke();
        var count = reduce ? 0 : on ? 3 : l.hot ? 1 : 0;
        for (var k = 0; k < count; k++) {
          var t = (clock * 0.36 + k / count + (l.a.r * 7.3 % 1)) % 1;
          ctx.globalAlpha = on ? 1 : 0.7; ctx.fillStyle = col.accent;
          ctx.beginPath(); ctx.arc(l.a.sx + (l.b.sx - l.a.sx) * t, l.a.sy + (l.b.sy - l.a.sy) * t, on ? 2 : 1.4, 0, 6.2832); ctx.fill();
        }
      });
      nodes.slice().sort(function (p, q) { return p.dz - q.dz; }).forEach(function (n) {
        if (!shown(n)) return;
        var r = Math.max(1.6, n.sr), c = colorOf(n), main = n.type !== 'fact';
        if (n.id === sel) { ctx.globalAlpha = 0.25; ctx.fillStyle = col.accent; ctx.beginPath(); ctx.arc(n.sx, n.sy, r * 2.2, 0, 6.2832); ctx.fill(); }
        ctx.globalAlpha = (main ? 0.7 : 0.55) + 0.3 * n.dz; ctx.fillStyle = c;
        ctx.beginPath(); ctx.arc(n.sx, n.sy, r, 0, 6.2832); ctx.fill();
        if (n === hover) { ctx.globalAlpha = 1; ctx.strokeStyle = col.ink; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.arc(n.sx, n.sy, r + 3, 0, 6.2832); ctx.stroke(); }
      });
      // Labels: the selected and hovered entities, plus front-facing entities on wide canvases.
      ctx.font = '500 11px ' + col.mono; ctx.textAlign = 'center'; ctx.textBaseline = 'top';
      nodes.forEach(function (n) {
        if (n.type === 'fact' || !shown(n)) return;
        var strong = n.id === sel || n === hover, show = strong || (W > 460 && n.dz > 0.55);
        if (!show) return;
        var y = n.sy + Math.max(1.6, n.sr) + 6, w = ctx.measureText(n.name).width + 10;
        ctx.globalAlpha = strong ? 0.92 : 0.7; ctx.fillStyle = col.bg; ctx.fillRect(n.sx - w / 2, y - 2, w, 16);
        ctx.globalAlpha = strong ? 1 : 0.85 * n.dz + 0.15; ctx.fillStyle = strong ? col.ink : col.ink2; ctx.fillText(n.name, n.sx, y);
      });
      // A hovered fact gets a label naming its page.
      if (hover && hover.type === 'fact') {
        var label = 'a fact on ' + byId[hover.ent].name;
        ctx.globalAlpha = 1; ctx.fillStyle = col.ink; ctx.fillText(label, hover.sx, hover.sy + 8);
      }
      ctx.globalAlpha = 1;
    }
    // Animate only while something moves; under reduced motion, draw on demand.
    var loop = function (now) {
      raf = 0;
      var dt = last ? Math.min(0.05, (now - last) / 1000) : 0.016; last = now; clock += dt;
      if (anim) {
        var k = Math.min(1, (now - anim.t0) / anim.dur), e = k < 0.5 ? 2 * k * k : 1 - Math.pow(-2 * k + 2, 2) / 2;
        yaw = anim.y0 + (anim.y1 - anim.y0) * e; pitch = anim.p0 + (anim.p1 - anim.p0) * e; zoom = anim.z0 + (anim.z1 - anim.z0) * e;
        if (k >= 1) anim = null;
      } else if (auto) yaw += dt * 0.1;
      draw();
      if (visible && !document.hidden && (!reduce || anim)) raf = requestAnimationFrame(loop); else last = 0;
    };
    var kick = function () { if (reduce && !anim) { draw(); return; } if (!raf && visible && !document.hidden) { last = 0; raf = requestAnimationFrame(loop); } };

    var pick = function (x, y) {
      var best = null, bs = -9;
      nodes.forEach(function (n) {
        if (!shown(n)) return;
        var d = Math.hypot(n.sx - x, n.sy - y), r = Math.max(8, n.sr + 6);
        if (d < r) { var sc2 = n.dz - d / r * 0.3; if (sc2 > bs) { bs = sc2; best = n; } }
      });
      return best;
    };
    cv.tabIndex = 0;
    orbit(cv, {
      begin: function () { auto = false; anim = null; },
      idle: function () { if (!reduce) { auto = true; kick(); } },
      rotate: function (dy, dp) { yaw += dy; pitch = Math.max(-1.3, Math.min(1.3, pitch + dp)); kick(); },
      zoom: function (f) { zoom = Math.max(0.5, Math.min(3, zoom * f)); kick(); },
      tap: function (x, y) { var n = pick(x, y); if (n) o.onPick(n.ent || n.id); },
      hover: function (x, y) {
        var h = x == null ? null : pick(x, y);
        if (h !== hover) { hover = h; cv.style.cursor = h ? 'pointer' : ''; if (reduce || !raf) draw(); }
      }
    }, { wheel: true, idleMs: 4000 });

    var api = {
      select: function (id, focus) {
        sel = id;
        var n = byId[id];
        if (focus && n) {
          // Turn the graph so the node faces the camera, and lean in.
          var target = Math.atan2(-n.x, n.z), d = ((target - yaw) % 6.2832 + 9.4248) % 6.2832 - 3.1416;
          var p1 = Math.max(-0.5, Math.min(0.5, Math.atan2(n.y, Math.hypot(n.x, n.z)) * 0.8)), z1 = Math.max(zoom, 1.35);
          if (reduce) { yaw += d; pitch = p1; zoom = z1; } else { anim = { t0: performance.now(), dur: 900, y0: yaw, y1: yaw + d, p0: pitch, p1: p1, z0: zoom, z1: z1 }; auto = false; }
        }
        kick();
      },
      filter: function (h) { hidden = h; kick(); }
    };
    readCols();
    var ro = new ResizeObserver(resize); ro.observe(cv);
    var vio = new IntersectionObserver(function (es) { visible = es[es.length - 1].isIntersecting; kick(); }); vio.observe(cv);
    document.addEventListener('visibilitychange', kick);
    window.addEventListener('lb-theme', function () { readCols(); draw(); });
    resize(); kick();
    return api;
  }

  // ---- waitlist forms ----
  // Both forms post { email, product: "livingbrain" } as JSON to the waitlist
  // Worker (Cratefield harness waitlist module), the same contract as the
  // sealb.in and Colonizer sites. That Worker is not deployed yet, so a
  // failure is expected for now and gets a calm inline note, never a fake
  // success. Without JavaScript the forms fall back to their mailto action.
  var API = 'https://api.livingbrain.wiki/v1/waitlist';
  var forms = $$('[data-waitlist]');
  var joined = function (email) {
    forms.forEach(function (f) {
      f.hidden = true;
      var done = f.parentNode.querySelector('[data-joined]');
      if (done) done.hidden = false;
    });
    var focusDone = document.activeElement && document.activeElement.closest && document.activeElement.closest('[data-waitlist]');
    if (focusDone) { var d = focusDone.parentNode.querySelector('[data-joined]'); if (d) { d.tabIndex = -1; d.focus(); } }
    return email;
  };
  forms.forEach(function (form) {
    var email = form.elements.email, btn = $('button[type=submit]', form), note = $('[data-form-note]', form.parentNode);
    var say = function (msg) { note.textContent = msg; note.hidden = false; };
    email.addEventListener('input', function () { note.hidden = true; email.removeAttribute('aria-invalid'); });
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var value = email.value.trim();
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value)) {
        email.setAttribute('aria-invalid', 'true');
        say('That email looks off. Try again?');
        email.focus();
        return;
      }
      btn.disabled = true; btn.textContent = 'Joining…'; note.hidden = true;
      fetch(API, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email: value, product: 'livingbrain' }) })
        .then(function (res) { if (!res.ok) throw new Error(String(res.status)); joined(value); })
        .catch(function (x) {
          var status = Number(x && x.message);
          say(status === 429 ? 'Too many tries. Give it a minute, then send again.' : 'The list isn’t open yet. Check back soon.');
        })
        .then(function () { btn.disabled = false; btn.textContent = 'Join the waitlist'; });
    });
  });
})();
