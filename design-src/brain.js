/* Living Brain — 2D-canvas renderer for a rotating 3D knowledge-graph brain. No dependencies. */
(function () {
  function rng(seed) { let s = seed >>> 0; return function () { s = (s + 0x6D2B79F5) >>> 0; let t = s; t = Math.imul(t ^ (t >>> 15), t | 1); t ^= t + Math.imul(t ^ (t >>> 7), t | 61); return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; }
  function gen(n, seed) {
    const r = rng(seed), N = []; let g = 0;
    while (N.length < n && g++ < n * 60) {
      const k = r(); let x, y, z;
      if (k < 0.86) {
        const side = r() < 0.5 ? -1 : 1, u = r() * 2 - 1, th = r() * 6.2832, s = Math.sqrt(1 - u * u);
        const dx = s * Math.cos(th), dy = u, dz = s * Math.sin(th), rad = 0.74 + 0.26 * Math.sqrt(r());
        const f = 1 + 0.07 * Math.sin(dz * 10 + dy * 6) * Math.cos(dy * 8 - dx * 4);
        x = side * 0.36 + dx * 0.42 * rad * f; y = dy * 0.56 * rad * f; z = dz * 0.82 * rad * f;
        if (dy < 0) y *= 0.7;
        if (side * x < 0.05) continue;
      } else if (k < 0.96) {
        const u = r() * 2 - 1, th = r() * 6.2832, s = Math.sqrt(1 - u * u), rad = 0.6 + 0.4 * Math.sqrt(r());
        x = s * Math.cos(th) * 0.42 * rad; y = -0.38 + u * 0.16 * rad; z = -0.56 + s * Math.sin(th) * 0.26 * rad;
      } else { const a = r() * 6.2832, t = r(); x = Math.cos(a) * 0.07; z = -0.28 + Math.sin(a) * 0.07; y = -0.42 - t * 0.42; }
      const tr = r();
      N.push({ x, y, z, type: tr < 0.32 ? 0 : tr < 0.6 ? 1 : tr < 0.8 ? 2 : 3, size: r() < 0.06 ? 2.3 : 0.55 + r() * 0.9, born: r(), rs: r() });
    }
    const mn = [9, 9, 9], mx = [-9, -9, -9], ax = ['x', 'y', 'z'];
    N.forEach(p => ax.forEach((a, i) => { mn[i] = Math.min(mn[i], p[a]); mx[i] = Math.max(mx[i], p[a]); }));
    N.forEach((p, i) => { ax.forEach((a, j) => { p[a] -= (mn[j] + mx[j]) / 2; }); p.bx = p.x; p.by = p.y; p.bz = p.z; p.i = i; p.glow = 0; });
    const E = [], adj = new Set();
    for (let i = 0; i < N.length; i++) {
      const d = [];
      for (let j = 0; j < N.length; j++) { if (i === j) continue; const a = N[i], b = N[j], q = (a.x - b.x) ** 2 + (a.y - b.y) ** 2 + (a.z - b.z) ** 2; if (q < 0.07) d.push([q, j]); }
      d.sort((u, v) => u[0] - v[0]);
      const k = N[i].size > 2 ? 6 : 2 + (i % 2);
      for (let m = 0; m < Math.min(k, d.length); m++) { const j = d[m][1], key = i < j ? i + '_' + j : j + '_' + i; if (!adj.has(key)) { adj.add(key); E.push([i, j]); } }
    }
    return { N, E, adj };
  }
  function withAlpha(c, a) { c = (c || '#888').trim(); if (/^(oklch|oklab|lch|lab)\(/.test(c) && c.indexOf('/') < 0) return c.replace(/\)\s*$/, ' / ' + a + ')'); if (/^#([0-9a-f]{6})$/i.test(c)) return c + Math.round(a * 255).toString(16).padStart(2, '0'); return c; }

  function mount(canvas, o) {
    o = Object.assign({ nodes: 280, seed: 11, speed: 0.05, tilt: -0.2, angle: 0.9, density: 1, alive: true, still: false, grow: false, zoom: 1, glow: 1, edge: 1, nodeScale: 1, decorate: false, reserve: 0, colonies: 0 }, o || {});
    const ctx = canvas.getContext('2d');
    const G = gen(o.nodes, o.seed), N = G.N, E = G.E, adj = G.adj, X = [];
    let W = 0, H = 0, col = null, spr = null, light = false, density = o.density, ang = o.angle, raf = 0, last = 0, on = true, dead = false, clock = 0;
    let tPulse = 0, tLink = 1.2, tMerge = 3, merge = null;
    const pulses = [], flashes = [], revives = [], colonies = [];
    N.forEach(n => { n.res = n.rs < o.reserve; n.hidden = n.res; n.vis = (n.born < density && !n.hidden) ? 1 : 0; n.on = n.vis > 0; });

    function sprite(c) { const S = 64, s = document.createElement('canvas'); s.width = s.height = S; const g = s.getContext('2d'); const gr = g.createRadialGradient(S / 2, S / 2, 0, S / 2, S / 2, S / 2); gr.addColorStop(0, c); gr.addColorStop(0.2, withAlpha(c, 0.5)); gr.addColorStop(1, withAlpha(c, 0)); g.fillStyle = gr; g.fillRect(0, 0, S, S); return s; }
    function readColors() {
      const cs = getComputedStyle(document.documentElement), v = k => cs.getPropertyValue(k).trim() || '#8899aa';
      light = document.documentElement.dataset.theme === 'light';
      col = { t: [v('--t-person'), v('--t-project'), v('--t-decision'), v('--t-customer')], accent: v('--accent'), edge: v('--graph-edge') };
      spr = { t: col.t.map(sprite), a: sprite(col.accent) };
    }
    function resize() { const r = canvas.getBoundingClientRect(), d = Math.min(2, window.devicePixelRatio || 1); W = r.width; H = r.height; canvas.width = Math.max(1, Math.round(W * d)); canvas.height = Math.max(1, Math.round(H * d)); ctx.setTransform(d, 0, 0, d, 0, 0); if (o.still || !raf) draw(); }
    function project() {
      const ca = Math.cos(ang), sa = Math.sin(ang), ct = Math.cos(o.tilt), st = Math.sin(o.tilt), sc = Math.min(W, H) * 0.5 * o.zoom, cx = W / 2, cy = H / 2, cam = 3.4;
      for (const n of N) { const xr = n.x * ca + n.z * sa, zr = -n.x * sa + n.z * ca, y2 = n.y * ct - zr * st, z2 = n.y * st + zr * ct, p = cam / (cam - z2); n.sx = cx + xr * sc * p; n.sy = cy - y2 * sc * p; n.p = p; n.d = Math.max(0, Math.min(1, (z2 + 0.9) / 1.8)); }
    }
    function visible(n) { return n.vis > 0.6; }
    function spawnPulse(rand) {
      for (let k = 0; k < 5; k++) {
        const e = E[(Math.random() * E.length) | 0]; if (!e) return;
        const a = N[e[0]], b = N[e[1]]; if (!visible(a) || !visible(b)) continue;
        const f = Math.random() < 0.5; pulses.push({ a: f ? a.i : b.i, b: f ? b.i : a.i, t: rand ? Math.random() : 0, s: 1 / (0.6 + Math.random() * 0.7) }); return;
      }
    }
    function newLink(rand) {
      const a = N[(Math.random() * N.length) | 0]; if (!visible(a)) return;
      let best = null, bd = 9;
      for (const b of N) { if (b === a || !visible(b)) continue; const key = a.i < b.i ? a.i + '_' + b.i : b.i + '_' + a.i; if (adj.has(key)) continue; const q = (a.bx - b.bx) ** 2 + (a.by - b.by) ** 2 + (a.bz - b.bz) ** 2; if (q > 0.04 && q < 0.18 && q < bd) { bd = q; best = b; } }
      if (!best) return;
      const key = a.i < best.i ? a.i + '_' + best.i : best.i + '_' + a.i; adj.add(key);
      X.push({ a: a.i, b: best.i, t: rand ? clock - Math.random() * 2 : clock, key });
      if (X.length > 40) { const old = X.shift(); adj.delete(old.key); }
    }
    function startMerge() {
      for (let k = 0; k < 6; k++) { const e = E[(Math.random() * E.length) | 0]; const a = N[e[0]], b = N[e[1]]; if (visible(a) && visible(b) && a.size < 2 && !a.res) { merge = { a: a.i, b: b.i, k: 0 }; return; } }
    }
    function spark(near) {
      let pool = N.filter(n => n.res && n.hidden);
      if (!pool.length) { N.forEach(n => { if (n.res) n.hidden = true; }); return; }
      if (near != null) { const c = N[near]; pool.sort((p, q) => ((p.bx - c.bx) ** 2 + (p.by - c.by) ** 2 + (p.bz - c.bz) ** 2) - ((q.bx - c.bx) ** 2 + (q.by - c.by) ** 2 + (q.bz - c.bz) ** 2)); }
      const n = near != null ? pool[0] : pool[(Math.random() * pool.length) | 0];
      n.hidden = false; n.born = 0; n.glow = 1;
    }
    function newColony(rand) {
      const hubs = N.filter(n => n.size > 1.2 && visible(n)); const a = hubs[(Math.random() * hubs.length) | 0]; if (!a) return;
      colonies.push({ a: a.i, ang: Math.random() * 6.28, r: 22 + Math.random() * 22, sp: (0.7 + Math.random() * 0.6) * (Math.random() < 0.5 ? -1 : 1), life: 6 + Math.random() * 5, age: rand ? Math.random() * 5 : 0, dock: 0 });
    }
    function step(dt) {
      clock += dt; ang += o.speed * dt;
      if (o.grow && density < 1) density = Math.min(1, density + dt * 0.03);
      for (const n of N) {
        const tgt = (n.born < density && !n.hidden) ? 1 : 0;
        if (tgt && !n.on) { n.on = true; if (clock > 0.3) flashes.push({ n: n.i, t: clock }); }
        if (!tgt) n.on = false;
        n.vis += (tgt - n.vis) * Math.min(1, dt * 3); n.glow *= Math.exp(-dt * 2.2);
      }
      if (!o.alive) return;
      tPulse -= dt; while (tPulse < 0) { tPulse += 0.07; spawnPulse(); }
      for (let i = pulses.length - 1; i >= 0; i--) { const p = pulses[i]; p.t += dt * p.s; if (p.t >= 1) { N[p.b].glow = Math.min(1, N[p.b].glow + 0.5); pulses.splice(i, 1); } }
      tLink -= dt; if (tLink < 0) { tLink = 1.4 + Math.random() * 1.4; newLink(); }
      tMerge -= dt; if (tMerge < 0 && !merge) { tMerge = 4 + Math.random() * 3; startMerge(); }
      if (merge) {
        merge.k += dt / 1.4; const a = N[merge.a], b = N[merge.b], k = Math.min(1, merge.k), e = k * k * (3 - 2 * k);
        a.x = a.bx + (b.bx - a.bx) * e; a.y = a.by + (b.by - a.by) * e; a.z = a.bz + (b.bz - a.bz) * e;
        if (merge.k >= 1) { a.hidden = true; a.vis = 0; a.on = false; a.x = a.bx; a.y = a.by; a.z = a.bz; b.glow = 1; flashes.push({ n: b.i, t: clock }); revives.push({ n: a.i, t: clock + 5 }); merge = null; }
      }
      for (let i = revives.length - 1; i >= 0; i--) if (clock > revives[i].t) { N[revives[i].n].hidden = false; revives.splice(i, 1); }
      for (let i = flashes.length - 1; i >= 0; i--) if (clock - flashes[i].t > 1.2) flashes.splice(i, 1);
      if (o.colonies) {
        while (colonies.length < o.colonies) newColony();
        for (let i = colonies.length - 1; i >= 0; i--) {
          const c = colonies[i]; c.age += dt; c.ang += c.sp * dt;
          if (c.age > c.life) { c.dock += dt / 1.1; if (c.dock >= 1) { const a = N[c.a]; a.glow = 1; flashes.push({ n: c.a, t: clock }); spark(c.a); spark(c.a); spark(c.a); colonies.splice(i, 1); } }
        }
      }
    }
    function draw() {
      if (!W || !col) return;
      ctx.setTransform(Math.min(2, window.devicePixelRatio || 1), 0, 0, Math.min(2, window.devicePixelRatio || 1), 0, 0);
      ctx.clearRect(0, 0, W, H); project();
      const add = light ? 'source-over' : 'lighter';
      ctx.lineWidth = 0.7; ctx.strokeStyle = col.edge;
      const bins = [[], [], []];
      for (const e of E) { const a = N[e[0]], b = N[e[1]]; if (Math.min(a.vis, b.vis) < 0.2) continue; const dd = (a.d + b.d) / 2; bins[dd < 0.4 ? 0 : dd < 0.7 ? 1 : 2].push(a, b); }
      const ea = light ? [0.12, 0.2, 0.32] : [0.08, 0.15, 0.26];
      bins.forEach((bn, i) => { if (!bn.length) return; ctx.globalAlpha = ea[i] * o.edge; ctx.beginPath(); for (let k = 0; k < bn.length; k += 2) { ctx.moveTo(bn[k].sx, bn[k].sy); ctx.lineTo(bn[k + 1].sx, bn[k + 1].sy); } ctx.stroke(); });
      for (const x of X) {
        const a = N[x.a], b = N[x.b], age = clock - x.t, g = Math.min(1, age / 0.7), hot = Math.max(0, 1 - (age - 0.7) / 3), v = Math.min(a.vis, b.vis); if (v < 0.2) continue;
        ctx.globalAlpha = v * (ea[2] + hot * 0.7) * o.edge; ctx.strokeStyle = hot > 0.02 ? col.accent : col.edge; ctx.lineWidth = 0.7 + hot * 0.8;
        ctx.beginPath(); ctx.moveTo(a.sx, a.sy); ctx.lineTo(a.sx + (b.sx - a.sx) * g, a.sy + (b.sy - a.sy) * g); ctx.stroke();
      }
      const order = N.slice().sort((a, b) => a.d - b.d);
      for (const n of order) {
        if (n.vis < 0.02) continue;
        const r = (0.7 + n.size * 1.3) * n.p * (0.6 + 0.6 * n.d) * o.nodeScale * Math.max(0.6, Math.min(W, H) / 520);
        ctx.globalCompositeOperation = add;
        const gs = r * (light ? 4 : 6) * (1 + n.glow * 0.8);
        ctx.globalAlpha = Math.min(1, ((light ? 0.1 : 0.16) + (light ? 0.14 : 0.3) * n.d) * n.vis * o.glow + n.glow * 0.5);
        ctx.drawImage(n.glow > 0.15 ? spr.a : spr.t[n.type], n.sx - gs, n.sy - gs, gs * 2, gs * 2);
        ctx.globalCompositeOperation = 'source-over';
        ctx.globalAlpha = (0.4 + 0.6 * n.d) * n.vis; ctx.fillStyle = n.glow > 0.3 ? col.accent : col.t[n.type];
        ctx.beginPath(); ctx.arc(n.sx, n.sy, r, 0, 6.2832); ctx.fill();
      }
      ctx.globalCompositeOperation = add;
      for (const p of pulses) {
        const a = N[p.a], b = N[p.b], x = a.sx + (b.sx - a.sx) * p.t, y = a.sy + (b.sy - a.sy) * p.t, s = 7 * (0.7 + 0.5 * ((a.d + b.d) / 2));
        ctx.globalAlpha = 0.9; ctx.drawImage(spr.a, x - s, y - s, s * 2, s * 2);
        ctx.globalAlpha = 1; ctx.fillStyle = col.accent; ctx.beginPath(); ctx.arc(x, y, 1.3, 0, 6.2832); ctx.fill();
      }
      for (const c of colonies) {
        const a = N[c.a]; if (a.vis < 0.2) continue;
        const rr = c.r * (1 - Math.min(1, c.dock)) * (0.6 + 0.6 * a.d), x = a.sx + Math.cos(c.ang) * rr, y = a.sy + Math.sin(c.ang) * rr * 0.45;
        ctx.globalCompositeOperation = 'source-over'; ctx.globalAlpha = 0.55; ctx.strokeStyle = col.accent; ctx.lineWidth = 0.8; ctx.setLineDash([2, 3]);
        ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(a.sx, a.sy); ctx.stroke(); ctx.setLineDash([]);
        ctx.globalCompositeOperation = add; ctx.globalAlpha = 0.9; ctx.drawImage(spr.a, x - 14, y - 14, 28, 28);
        ctx.globalCompositeOperation = 'source-over'; ctx.globalAlpha = 1;
        const tg = Math.atan2(Math.cos(c.ang) * 0.45 * Math.sign(c.sp), -Math.sin(c.ang) * Math.sign(c.sp));
        ctx.save(); ctx.translate(x, y); ctx.rotate(tg); ctx.fillStyle = col.accent; ctx.beginPath();
        if (ctx.roundRect) ctx.roundRect(-7, -3, 14, 6, 3); else ctx.rect(-7, -3, 14, 6); ctx.fill();
        ctx.fillStyle = light ? '#fff' : 'rgba(0,0,0,.55)'; ctx.fillRect(-3.5, -1, 7, 2); ctx.restore();
      }
      ctx.globalCompositeOperation = 'source-over';
      for (const f of flashes) { const n = N[f.n], k = (clock - f.t) / 1.1; if (k < 0 || k > 1) continue; ctx.globalAlpha = (1 - k) * 0.9; ctx.strokeStyle = col.accent; ctx.lineWidth = 1.2; ctx.beginPath(); ctx.arc(n.sx, n.sy, 3 + k * 18, 0, 6.2832); ctx.stroke(); }
      ctx.globalAlpha = 1;
    }
    function loop(now) { raf = 0; if (dead) return; const dt = last ? Math.min(0.05, (now - last) / 1000) : 0.016; last = now; step(dt); draw(); if (on && !document.hidden) raf = requestAnimationFrame(loop); else last = 0; }
    function start() { if (!raf && !o.still && !dead) { last = 0; raf = requestAnimationFrame(loop); } }
    const io = new IntersectionObserver(es => { on = es[es.length - 1].isIntersecting; if (on) start(); }); io.observe(canvas);
    function vis() { if (!document.hidden && on) start(); }
    document.addEventListener('visibilitychange', vis);
    const ro = new ResizeObserver(resize); ro.observe(canvas);
    const onTheme = () => { readColors(); if (o.still || !raf) draw(); };
    window.addEventListener('lb-theme', onTheme);
    readColors(); resize();
    if (o.decorate || o.still) {
      for (let i = 0; i < (o.decorate ? 30 : 14); i++) spawnPulse(true);
      for (let i = 0; i < 8; i++) newLink(true);
      N.forEach(n => { if (Math.random() < 0.05) n.glow = 0.8; });
      clock = 1.2;
      for (let i = 0; i < o.colonies; i++) newColony(true);
    }
    if (o.still) draw(); else start();
    return {
      setDensity(d) { density = d; if (o.still) { N.forEach(n => { n.vis = (n.born < d && !n.hidden) ? 1 : 0; }); draw(); } },
      spark(near) { spark(near); if (o.still) { N.forEach(n => { n.vis = (n.born < density && !n.hidden) ? 1 : 0; }); draw(); } },
      refresh: onTheme, draw,
      destroy() { dead = true; io.disconnect(); ro.disconnect(); window.removeEventListener('lb-theme', onTheme); document.removeEventListener('visibilitychange', vis); if (raf) cancelAnimationFrame(raf); }
    };
  }
  window.LivingBrain = { mount };
})();
