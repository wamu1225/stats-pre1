/**
 * 1.4-dist の図（CDF と PDF の対応：指数分布）。
 * App.tsx（ハイドレーション後）と scripts/prerender.ts（静的HTML）が同じ文字列を使う。
 * 数値は式（f(x)=λe^{-λx}, F(x)=1-e^{-λx}）から計算して図と説明文に出す。
 */

const INDIGO = '#4338ca';
const AMBER = '#d97706';
const SLATE = '#64748b';
const INK = '#1e293b';
const f1 = (x: number) => x.toFixed(1);
const f2 = (x: number) => x.toFixed(2);

export function cdfPdfFigure(): string {
  const lam = 1;
  const x0 = 1;
  const pdf = (x: number) => lam * Math.exp(-lam * x);
  const cdf = (x: number) => 1 - Math.exp(-lam * x);
  const W = 340, H = 386;
  const L = 44, R = 326;
  const xMax = 4;
  const px = (x: number) => L + (x / xMax) * (R - L);

  // 上段：PDF（縦軸 0〜1）
  const T1 = 24, B1 = 150;
  const py1 = (y: number) => B1 - y * (B1 - T1);
  // 下段：CDF（縦軸 0〜1）
  const T2 = 214, B2 = 340;
  const py2 = (y: number) => B2 - y * (B2 - T2);

  const pts = (fn: (x: number) => number, py: (y: number) => number, a: number, b: number) => {
    const out: string[] = [];
    const n = 60;
    for (let i = 0; i <= n; i++) {
      const x = a + ((b - a) * i) / n;
      out.push(`${f1(px(x))},${f1(py(fn(x)))}`);
    }
    return out;
  };
  const pdfCurve = pts(pdf, py1, 0, xMax).join(' ');
  const pdfArea = `${f1(px(0))},${f1(py1(0))} ${pts(pdf, py1, 0, x0).join(' ')} ${f1(px(x0))},${f1(py1(0))}`;
  const cdfCurve = pts(cdf, py2, 0, xMax).join(' ');

  // x0 での CDF の接線（傾き = f(x0)）
  const slope = pdf(x0);
  const t0 = x0 - 0.9, t1 = x0 + 0.9;
  const tan = (t: number) => cdf(x0) + slope * (t - x0);

  const xTicks = [0, 1, 2, 3, 4];
  const axis = (T: number, B: number, py: (y: number) => number) => `
    <line x1="${L}" y1="${B}" x2="${R}" y2="${B}" stroke="${SLATE}" stroke-width="1.2" />
    <line x1="${L}" y1="${T}" x2="${L}" y2="${B}" stroke="${SLATE}" stroke-width="1.2" />
    ${xTicks.map((t) => `<text x="${f1(px(t))}" y="${B + 15}" text-anchor="middle" font-size="12" fill="${SLATE}">${t}</text>`).join('')}
    <text x="${L - 6}" y="${f1(py(0) + 4)}" text-anchor="end" font-size="12" fill="${SLATE}">0</text>
    <text x="${L - 6}" y="${f1(py(1) + 4)}" text-anchor="end" font-size="12" fill="${SLATE}">1</text>`;

  const svg = `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="指数分布の確率密度関数と累積分布関数：PDF の 0 から x までの面積が、CDF の x での高さになる" class="venn-svg">
    <text x="${L}" y="14" font-size="12" font-weight="700" fill="${INK}">上：確率密度関数 f(x)</text>
    ${axis(T1, B1, py1)}
    <polygon points="${pdfArea}" fill="${INDIGO}" fill-opacity="0.22" />
    <polyline points="${pdfCurve}" fill="none" stroke="${INDIGO}" stroke-width="2.2" />
    <text x="${f1(px(x0) - 6)}" y="${f1(py1(0.18))}" text-anchor="end" font-size="12" font-weight="700" fill="${INDIGO}">面積 ${f2(cdf(x0))}</text>
    <line x1="${f1(px(x0))}" y1="${f1(py1(pdf(x0)))}" x2="${f1(px(x0))}" y2="${B1}" stroke="${INDIGO}" stroke-width="1.4" />
    <text x="${f1(px(x0) + 6)}" y="${f1(py1(pdf(x0)) - 6)}" font-size="12" fill="${INK}">高さ f(1) = ${f2(pdf(x0))}</text>

    <text x="${L}" y="${T2 - 12}" font-size="12" font-weight="700" fill="${INK}">下：累積分布関数 F(x)</text>
    ${axis(T2, B2, py2)}
    <polyline points="${cdfCurve}" fill="none" stroke="${AMBER}" stroke-width="2.2" />
    <line x1="${f1(px(t0))}" y1="${f1(py2(tan(t0)))}" x2="${f1(px(t1))}" y2="${f1(py2(tan(t1)))}" stroke="${INK}" stroke-width="1.4" stroke-dasharray="4 3" />
    <line x1="${f1(px(x0))}" y1="${B2}" x2="${f1(px(x0))}" y2="${f1(py2(cdf(x0)))}" stroke="${AMBER}" stroke-width="1.2" stroke-dasharray="3 3" />
    <line x1="${L}" y1="${f1(py2(cdf(x0)))}" x2="${f1(px(x0))}" y2="${f1(py2(cdf(x0)))}" stroke="${AMBER}" stroke-width="1.2" stroke-dasharray="3 3" />
    <circle cx="${f1(px(x0))}" cy="${f1(py2(cdf(x0)))}" r="4.5" fill="${AMBER}" />
    <text x="${f1(px(x0) + 8)}" y="${f1(py2(cdf(x0)) + 20)}" font-size="12" font-weight="700" fill="#b45309">F(1) = ${f2(cdf(x0))}</text>
    <text x="${f1(px(1.6))}" y="${f1(py2(0.17))}" font-size="12" fill="${INK}">破線の傾き = f(1) = ${f2(slope)}</text>
    <text x="${f1((L + R) / 2)}" y="${H - 4}" text-anchor="middle" font-size="12" fill="${SLATE}">横軸 x（指数分布 λ = ${lam}）</text>
  </svg>`;

  const cap = `指数分布（λ = ${lam}）で、同じ x = ${x0} を2つの図で見ています。上の図で 0 から ${x0} までの<strong>面積</strong>（青）は ${f2(cdf(x0))} で、これが下の図の F(${x0}) = ${f2(cdf(x0))}、つまり<strong>曲線の高さ</strong>になります。逆に、下の図の曲線の<strong>傾き</strong>（破線）は ${f2(slope)} で、これが上の図の f(${x0}) = ${f2(pdf(x0))} という高さです。「PDF を積分すると CDF、CDF を微分すると PDF」は、面積と傾きの往復を言っています。`;
  return `<figure class="venn-figure">${svg}<figcaption class="venn-caption">${cap}</figcaption></figure>`;
}
