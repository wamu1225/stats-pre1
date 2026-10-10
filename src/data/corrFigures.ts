/**
 * 1.5b-correlation の図（共分散の4象限／偏相関の残差ステップ）。
 * App.tsx（ハイドレーション後）と scripts/prerender.ts（静的HTML）が同じ文字列を使う
 * ＝図の実装を1か所にして、片方だけ古くなる乖離（incidents 2026-08-31）を防ぐ。
 * 乱数は固定シード。数値は描いたデータから計算して図と説明文に出す（手書きの数字を置かない）。
 */

function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function normals(n: number, seed: number): number[] {
  const r = mulberry32(seed);
  const out: number[] = [];
  while (out.length < n) {
    const u = Math.max(r(), 1e-9);
    const v = r();
    const m = Math.sqrt(-2 * Math.log(u));
    out.push(m * Math.cos(2 * Math.PI * v), m * Math.sin(2 * Math.PI * v));
  }
  return out.slice(0, n);
}

const mean = (a: number[]) => a.reduce((s, x) => s + x, 0) / a.length;
const cov = (a: number[], b: number[]) => {
  const ma = mean(a), mb = mean(b);
  return a.reduce((s, x, i) => s + (x - ma) * (b[i] - mb), 0) / a.length;
};
const corr = (a: number[], b: number[]) => cov(a, b) / Math.sqrt(cov(a, a) * cov(b, b));
const f2 = (x: number) => x.toFixed(2);
const f1 = (x: number) => x.toFixed(1);

const INDIGO = '#4338ca';
const AMBER = '#d97706';
const SLATE = '#64748b';
const INK = '#1e293b';

// ---------- 共分散：平均を原点にした4象限と、点ごとの長方形 ----------
export function covQuadrantsFigure(): string {
  const n = 36;
  const gx = normals(n, 11), gy = normals(n, 29);
  const xs = gx;
  const ys = gx.map((v, i) => 0.7 * v + 0.72 * gy[i]);
  const mx = mean(xs), my = mean(ys);
  const W = 340, H = 236;
  const L = 14, R = 326, T = 26, B = 214;
  const xMin = -2.8, xMax = 2.8, yMin = -2.8, yMax = 2.8;
  const px = (x: number) => L + ((x - xMin) / (xMax - xMin)) * (R - L);
  const py = (y: number) => B - ((y - yMin) / (yMax - yMin)) * (B - T);
  const cx = px(mx), cy = py(my);

  const prod = xs.map((x, i) => (x - mx) * (ys[i] - my));
  const inPos = prod.filter((p) => p > 0).length;
  const iPos = prod.reduce((best, p, i) => (p > prod[best] * 0.55 && Math.abs(xs[i] - mx) > 0.9 && p > 0 && p < 2.6 ? i : best), prod.indexOf(Math.max(...prod)));
  let iNeg = 0;
  prod.forEach((p, i) => { if (p < prod[iNeg]) iNeg = i; });

  const rect = (i: number, color: string) => {
    const x0 = Math.min(cx, px(xs[i])), x1 = Math.max(cx, px(xs[i]));
    const y0 = Math.min(cy, py(ys[i])), y1 = Math.max(cy, py(ys[i]));
    return `<rect x="${f1(x0)}" y="${f1(y0)}" width="${f1(x1 - x0)}" height="${f1(y1 - y0)}" fill="${color}" fill-opacity="0.28" stroke="${color}" stroke-width="1.5" />`;
  };
  const dots = xs.map((x, i) => {
    const hi = i === iPos || i === iNeg;
    const c = prod[i] > 0 ? INDIGO : AMBER;
    return `<circle cx="${f1(px(x))}" cy="${f1(py(ys[i]))}" r="${hi ? 4.2 : 3}" fill="${c}" fill-opacity="${hi ? 1 : 0.78}" />`;
  }).join('');

  const svg = `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="共分散の4象限：平均を原点にすると、右上と左下の点は積が正、左上と右下の点は積が負になる" class="venn-svg">
    <rect x="${f1(cx)}" y="${T}" width="${f1(R - cx)}" height="${f1(cy - T)}" fill="${INDIGO}" fill-opacity="0.07" />
    <rect x="${L}" y="${f1(cy)}" width="${f1(cx - L)}" height="${f1(B - cy)}" fill="${INDIGO}" fill-opacity="0.07" />
    <rect x="${L}" y="${T}" width="${f1(cx - L)}" height="${f1(cy - T)}" fill="${AMBER}" fill-opacity="0.09" />
    <rect x="${f1(cx)}" y="${f1(cy)}" width="${f1(R - cx)}" height="${f1(B - cy)}" fill="${AMBER}" fill-opacity="0.09" />
    <line x1="${L}" y1="${f1(cy)}" x2="${R}" y2="${f1(cy)}" stroke="${SLATE}" stroke-width="1.2" stroke-dasharray="4 3" />
    <line x1="${f1(cx)}" y1="${T}" x2="${f1(cx)}" y2="${B}" stroke="${SLATE}" stroke-width="1.2" stroke-dasharray="4 3" />
    ${rect(iPos, INDIGO)}${rect(iNeg, AMBER)}
    ${dots}
    <text x="${R - 4}" y="${T + 14}" text-anchor="end" font-size="12" font-weight="700" fill="${INDIGO}">積 ＞ 0</text>
    <text x="${L + 4}" y="${B - 6}" font-size="12" font-weight="700" fill="${INDIGO}">積 ＞ 0</text>
    <text x="${L + 4}" y="${T + 14}" font-size="12" font-weight="700" fill="#b45309">積 ＜ 0</text>
    <text x="${R - 4}" y="${B - 6}" text-anchor="end" font-size="12" font-weight="700" fill="#b45309">積 ＜ 0</text>
    <text x="${f1(cx + 4)}" y="${T - 8}" font-size="12" fill="${INK}">x̄</text>
    <text x="${R - 14}" y="${f1(cy - 5)}" font-size="12" fill="${INK}">ȳ</text>
    <text x="${W / 2}" y="${H - 6}" text-anchor="middle" font-size="12" fill="${SLATE}">横軸 x（平均 x̄ より右ほど x−x̄ が正）／縦軸 y</text>
  </svg>`;

  const cap = `各点について (x−x̄)(y−ȳ) を作ります。平均の位置（点線の交点）を原点にすると、これは<strong>点と原点を結ぶ長方形の、符号つきの面積</strong>になります。右上と左下の点は面積が正（青）、左上と右下の点は負（橙）です。共分散は、この面積を全点で平均したものです。この例では${n}点中${inPos}点が右上か左下にあり、Cov = ${f2(cov(xs, ys))}（相関係数 r = ${f2(corr(xs, ys))}）と正になります。点が左上から右下へ並べば負の点が増え、Cov は負になります。`;
  return `<figure class="venn-figure">${svg}<figcaption class="venn-caption">${cap}</figcaption></figure>`;
}

// ---------- 偏相関：Z を引いた残差どうしを相関させる ----------
export function partialCorrFigure(): string {
  const n = 30;
  const zs = normals(n, 5);
  const ex = normals(n, 17), ey = normals(n, 41);
  const xs = zs.map((z, i) => 0.9 * z + 0.45 * ex[i]);
  const ys = zs.map((z, i) => 0.85 * z + 0.5 * ey[i]);
  const fit = (a: number[], b: number[]) => {
    const k = cov(a, b) / cov(a, a);
    return { k, c: mean(b) - k * mean(a) };
  };
  const fx = fit(zs, xs), fy = fit(zs, ys);
  const rx = xs.map((x, i) => x - (fx.k * zs[i] + fx.c));
  const ry = ys.map((y, i) => y - (fy.k * zs[i] + fy.c));
  const rXY = corr(xs, ys), rXZ = corr(xs, zs), rYZ = corr(ys, zs);
  const pr = corr(rx, ry);

  const W = 340, PW = 156, PH = 106, GX = 12;
  const panel = (ox: number, oy: number, title: string, sub: string, a: number[], b: number[], opt: { line?: { k: number; c: number }; resid?: boolean; color: string; zero?: boolean }) => {
    const L = ox + 6, R = ox + PW - 6, T = oy + 34, B = oy + 34 + PH - 14;
    const lo = -2.6, hi = 2.6;
    const px = (v: number) => L + ((v - lo) / (hi - lo)) * (R - L);
    const py = (v: number) => B - ((v - lo) / (hi - lo)) * (B - T);
    let g = `<rect x="${ox}" y="${oy}" width="${PW}" height="${PH + 34}" rx="3" fill="none" stroke="#cbd5e1" stroke-width="1" />`;
    g += `<text x="${ox + 6}" y="${oy + 15}" font-size="12" font-weight="700" fill="${INK}">${title}</text>`;
    g += `<text x="${ox + 6}" y="${oy + 29}" font-size="12" fill="${SLATE}">${sub}</text>`;
    if (opt.zero) {
      g += `<line x1="${L}" y1="${f1(py(0))}" x2="${R}" y2="${f1(py(0))}" stroke="${SLATE}" stroke-width="1" stroke-dasharray="3 3" />`;
      g += `<line x1="${f1(px(0))}" y1="${T}" x2="${f1(px(0))}" y2="${B}" stroke="${SLATE}" stroke-width="1" stroke-dasharray="3 3" />`;
    }
    if (opt.line) {
      const y0 = opt.line.k * lo + opt.line.c, y1 = opt.line.k * hi + opt.line.c;
      if (opt.resid) {
        a.forEach((v, i) => {
          const yh = opt.line!.k * v + opt.line!.c;
          g += `<line x1="${f1(px(v))}" y1="${f1(py(b[i]))}" x2="${f1(px(v))}" y2="${f1(py(yh))}" stroke="${AMBER}" stroke-width="1.2" />`;
        });
      }
      g += `<line x1="${f1(px(lo))}" y1="${f1(Math.max(T, Math.min(B, py(y0))))}" x2="${f1(px(hi))}" y2="${f1(Math.max(T, Math.min(B, py(y1))))}" stroke="${INK}" stroke-width="1.6" />`;
    }
    a.forEach((v, i) => {
      g += `<circle cx="${f1(px(v))}" cy="${f1(py(b[i]))}" r="2.8" fill="${opt.color}" fill-opacity="0.85" />`;
    });
    return g;
  };

  const H = 2 * (PH + 34) + 12;
  const x1 = 0, x2 = PW + GX + 4;
  const y1 = 0, y2 = PH + 34 + 12;
  // 並べ方＝左上 ①元の関係 → 右上 ② Z で X を説明 → 左下 ③ Z で Y を説明 → 右下 ④ 残差どうし
  const svg = `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="偏相関の手順：X と Y の見かけの相関、Z で X と Y をそれぞれ回帰して残差を作り、残差どうしの相関を見る" class="venn-svg">
    ${panel(x1, y1, `① X と Y そのまま`, `r = ${f2(rXY)}（見かけ）`, xs, ys, { color: INDIGO })}
    ${panel(x2, y1, `② Z で X を説明`, `橙の線＝残差 e_X`, zs, xs, { color: INDIGO, line: fx, resid: true })}
    ${panel(x1, y2, `③ Z で Y を説明`, `橙の線＝残差 e_Y`, zs, ys, { color: INDIGO, line: fy, resid: true })}
    ${panel(x2, y2, `④ 残差 e_X と e_Y`, `r = ${f2(pr)}（偏相関）`, rx, ry, { color: AMBER, zero: true })}
  </svg>`;
  const cap = `X（アイスの売上）と Y（溺死者数）は、どちらも Z（気温）に引っぱられて動きます。① そのままでは r = ${f2(rXY)} と、強い正の相関に見えます。② ③ Z で X と Y をそれぞれ直線で説明し（Z との相関は r(X,Z) = ${f2(rXZ)}、r(Y,Z) = ${f2(rYZ)}）、直線で説明しきれなかった差（橙の線）を残差 e_X、e_Y とします。④ 気温の影響を引いた残差どうしを散布図にすると、相関は r = ${f2(pr)} までほぼ消えます。この ④ の相関が偏相関係数 r(XY·Z) で、前の式で計算した値と一致します。`;
  return `<figure class="venn-figure">${svg}<figcaption class="venn-caption">${cap}</figcaption></figure>`;
}
