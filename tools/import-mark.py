#!/usr/bin/env python3
"""Imports an official mark that Simple Icons does not carry.

Reads a brand's own SVG (downloaded from its press kit or repository; treat it
as untrusted data), keeps only the path data of the chosen <path> elements,
applies each path's own transform plus an optional outer one, converts it to
absolute commands and fits it, unaltered in shape and proportion, into a
24x24 box, centred, the way Simple Icons does. Prints one SVG with a single
path, ready for assets/logos/; tools/marks.js then adds the currentColor fill,
title and sprite. No scripts, styles, links, images or other elements survive:
the output is built from numbers only.

    python3 -I tools/import-mark.py SRC.svg [--paths 0,1] [--matrix a,b,c,d,e,f] [--title Name] [--precision 3] > assets/logos/x.svg

--matrix is the transform of the path's parents (for example a <g transform>);
only scale and translate are supported, so H, V and arcs stay exact.
Record the source URL (pinned to a commit) and terms in assets/harnesses.json
and a COPY.md Marks row.
"""
import argparse, re, sys

NUM = r'[-+]?(?:\d+\.?\d*|\.\d+)(?:[eE][-+]?\d+)?'
ARGS = {'M': 2, 'L': 2, 'H': 1, 'V': 1, 'C': 6, 'S': 4, 'Q': 4, 'T': 2, 'A': 7, 'Z': 0}


class Scanner:
    """Reads path data; arc flags may be written without separators ("a1 1 0 011 1")."""
    def __init__(self, d):
        self.d, self.i = d, 0

    def skip(self):
        while self.i < len(self.d) and self.d[self.i] in ' \t\r\n,':
            self.i += 1

    def command(self):
        self.skip()
        if self.i < len(self.d) and self.d[self.i] in 'MmLlHhVvCcSsQqTtAaZz':
            self.i += 1
            return self.d[self.i - 1]
        return None

    def number(self, flag=False):
        self.skip()
        m = re.compile('[01]' if flag else NUM).match(self.d, self.i)
        if not m:
            raise ValueError(f'expected a number at {self.i}')
        self.i = m.end()
        return float(m.group(0))

    def done(self):
        self.skip()
        return self.i >= len(self.d)


def parse(d):
    """Returns absolute segments [(cmd, [numbers])], with H/V/S/T/A kept."""
    out, cmd, cx, cy, sx, sy = [], None, 0.0, 0.0, 0.0, 0.0
    sc = Scanner(d)
    while not sc.done():
        c = sc.command()
        if c:
            cmd = c
            if cmd in 'Zz':
                out.append(('Z', [])); cx, cy = sx, sy
                continue
        elif cmd is None or cmd in 'Zz':
            raise ValueError('number without a command')
        C, rel = cmd.upper(), cmd.islower()
        a = [sc.number(flag=(C == 'A' and k in (3, 4))) for k in range(ARGS[C])]
        if C == 'H':
            x = a[0] + (cx if rel else 0); out.append(('H', [x])); cx = x
        elif C == 'V':
            y = a[0] + (cy if rel else 0); out.append(('V', [y])); cy = y
        elif C == 'A':
            x, y = a[5] + (cx if rel else 0), a[6] + (cy if rel else 0)
            out.append(('A', a[:5] + [x, y])); cx, cy = x, y
        else:
            pts = [v + ((cx if k % 2 == 0 else cy) if rel else 0) for k, v in enumerate(a)]
            out.append((C, pts)); cx, cy = pts[-2], pts[-1]
            if C == 'M':
                sx, sy = cx, cy
                cmd = 'l' if rel else 'L'  # implicit lineto after moveto
    return out


def matrix(s):
    if not s:
        return (1, 0, 0, 1, 0, 0)
    m = re.match(r'\s*matrix\(([^)]*)\)\s*$', s)
    if m:
        v = [float(x) for x in re.findall(NUM, m.group(1))]
    else:
        v, parts = [1, 0, 0, 1, 0, 0], re.findall(r'(translate|scale)\(([^)]*)\)', s)
        if not parts:
            raise ValueError(f'unsupported transform {s!r}')
        for name, args in parts:
            n = [float(x) for x in re.findall(NUM, args)]
            t = (1, 0, 0, 1, n[0], n[1] if len(n) > 1 else 0) if name == 'translate' else (n[0], 0, 0, n[1] if len(n) > 1 else n[0], 0, 0)
            v = mul(v, t)
    if v[1] or v[2]:
        raise ValueError('rotation or skew is not supported')
    return tuple(v)


def mul(p, q):  # p then q applied as p(q(x)), SVG order
    a, b, c, d, e, f = p; A, B, C, D, E, F = q
    return (a * A + c * B, b * A + d * B, a * C + c * D, b * C + d * D, a * E + c * F + e, b * E + d * F + f)


def apply(segs, m):
    a, _, _, d, e, f = m
    out = []
    for C, v in segs:
        if C == 'H':
            out.append(('H', [a * v[0] + e]))
        elif C == 'V':
            out.append(('V', [d * v[0] + f]))
        elif C == 'A':
            rx, ry, rot, large, sweep, x, y = v
            if abs(abs(a) - abs(d)) > 1e-9:
                raise ValueError('arcs need a uniform scale')
            sweep = sweep if a * d > 0 else 1 - sweep
            out.append(('A', [abs(a) * rx, abs(d) * ry, rot, large, sweep, a * x + e, d * y + f]))
        else:
            out.append((C, [a * x + e if k % 2 == 0 else d * x + f for k, x in enumerate(v)]))
    return out


def bbox(segs):
    xs, ys = [], []
    x = y = 0
    for C, v in segs:
        if C == 'H': x = v[0]
        elif C == 'V': y = v[0]
        elif C == 'A': x, y = v[5], v[6]
        elif C != 'Z':
            xs += v[0::2]; ys += v[1::2]; x, y = v[-2], v[-1]
        xs.append(x); ys.append(y)
    return min(xs), min(ys), max(xs), max(ys)


PRECISION = 3


def fmt(n):
    s = f'{n:.{PRECISION}f}'.rstrip('0').rstrip('.')
    return '0' if s in ('-0', '') else s


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('src'); ap.add_argument('--paths', default='all')
    ap.add_argument('--matrix', default=''); ap.add_argument('--title', default='')
    ap.add_argument('--precision', type=int, default=3)  # decimals on the 24-unit grid
    o = ap.parse_args()
    global PRECISION
    PRECISION = o.precision
    svg = open(o.src, encoding='utf-8').read()
    els = re.findall(r'<path\b([^>]*)>', svg, re.S)
    pick = range(len(els)) if o.paths == 'all' else [int(x) for x in o.paths.split(',')]
    outer = matrix('matrix(' + o.matrix + ')') if o.matrix else (1, 0, 0, 1, 0, 0)
    segs = []
    for k in pick:
        attrs = els[k]
        d = re.search(r'\sd="([^"]+)"', attrs).group(1)
        t = re.search(r'\stransform="([^"]+)"', attrs)
        segs += apply(parse(d), mul(outer, matrix(t.group(1) if t else '')))
    x0, y0, x1, y1 = bbox(segs)
    s = 24 / max(x1 - x0, y1 - y0)
    m = (s, 0, 0, s, (24 - s * (x1 - x0)) / 2 - s * x0, (24 - s * (y1 - y0)) / 2 - s * y0)
    out = ''.join(C + ' '.join(fmt(n) for n in v) for C, v in apply(segs, m))
    title = re.sub(r'[^A-Za-z0-9 .\'-]', '', o.title)
    sys.stdout.write(f'<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>{title}</title><path d="{out}"/></svg>\n')


if __name__ == '__main__':
    main()
