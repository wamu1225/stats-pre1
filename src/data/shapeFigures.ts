/**
 * 分布の「形」を見せる図（1.1／1.3／1.4／1.6／1.7／1.8／1.10）。
 * 本文に `[[f-<名前>]]` を1行で置くと、App.tsx（ハイドレーション後）と scripts/prerender.ts（静的HTML）が
 * 同じ文字列を出す。図と説明文の数値はすべて式から計算する（手で書き写さない）。
 * 390px 幅で文字が読めるよう、viewBox の幅は 360 以下、文字は 12 が基本。
 */

const INDIGO = '#4338ca';
const AMBER = '#d97706';
const TEAL = '#0f766e';
const ROSE = '#be123c';
const SLATE = '#64748b';
const INK = '#1e293b';
const f1 = (x: number) => x.toFixed(1);
const f2 = (x: number) => x.toFixed(2);
const pct = (x: number, d = 1) => (x * 100).toFixed(d) + '%';
const num = (x: number) => String(Math.round(x * 10) / 10);

// ---- 数値の道具 ----
function lgamma(z: number): number {
  // Lanczos 近似（g=7, n=9）
  const c = [0.99999999999980993, 676.5203681218851, -1259.1392167224028, 771.32342877765313, -176.61503916999185, 12.507343278686905, -0.13857109526572012, 9.9843695780195716e-6, 1.5056327351493116e-7];
  if (z < 0.5) return Math.log(Math.PI / Math.sin(Math.PI * z)) - lgamma(1 - z);
  z -= 1;
  let x = c[0];
  for (let i = 1; i < 9; i++) x += c[i] / (z + i);
  const t = z + 7.5;
  return 0.5 * Math.log(2 * Math.PI) + (z + 0.5) * Math.log(t) - t + Math.log(x);
}
const choose = (n: number, k: number) => Math.exp(lgamma(n + 1) - lgamma(k + 1) - lgamma(n - k + 1));
const binom = (n: number, p: number, k: number) => choose(n, k) * p ** k * (1 - p) ** (n - k);
const pois = (lam: number, k: number) => Math.exp(-lam + k * Math.log(lam) - lgamma(k + 1));
const normPdf = (x: number, m = 0, s = 1) => Math.exp(-0.5 * ((x - m) / s) ** 2) / (s * Math.sqrt(2 * Math.PI));
function erf(x: number): number {
  // Abramowitz–Stegun 7.1.26（誤差 1.5e-7）
  const s = Math.sign(x); x = Math.abs(x);
  const t = 1 / (1 + 0.3275911 * x);
  const y = 1 - ((((1.061405429 * t - 1.453152027) * t + 1.421413741) * t - 0.284496736) * t + 0.254829592) * t * Math.exp(-x * x);
  return s * y;
}
const Phi = (z: number) => 0.5 * (1 + erf(z / Math.SQRT2));
const gammaPdf = (k: number) => (x: number) => (x <= 0 ? (k === 1 ? 1 : 0) : Math.exp((k - 1) * Math.log(x) - x - lgamma(k)));
const betaPdf = (a: number, b: number) => (x: number) =>
  x <= 0 || x >= 1 ? 0 : Math.exp((a - 1) * Math.log(x) + (b - 1) * Math.log(1 - x) - (lgamma(a) + lgamma(b) - lgamma(a + b)));
const lognormPdf = (s: number) => (x: number) => (x <= 0 ? 0 : Math.exp(-0.5 * (Math.log(x) / s) ** 2) / (x * s * Math.sqrt(2 * Math.PI)));
const cauchyPdf = (x: number) => 1 / (Math.PI * (1 + x * x));

// ---- 描画の道具 ----
type Box = { x: number; y: number; w: number; h: number; xMin: number; xMax: number; yMax: number };
const PX = (b: Box, x: number) => b.x + ((x - b.xMin) / (b.xMax - b.xMin)) * b.w;
const PY = (b: Box, y: number) => b.y + b.h - (Math.min(y, b.yMax) / b.yMax) * b.h;
function axes(b: Box, xTicks: number[], yLabel?: string) {
  const base = b.y + b.h;
  return `<line x1="${b.x}" y1="${base}" x2="${b.x + b.w}" y2="${base}" stroke="${SLATE}" stroke-width="1" />
    ${xTicks.map((t) => `<text x="${f1(PX(b, t))}" y="${base + 14}" text-anchor="middle" font-size="12.4" fill="${SLATE}">${t}</text>`).join('')}
    ${yLabel ? `<text x="${b.x}" y="${b.y - 4}" font-size="12.4" fill="${SLATE}">${yLabel}</text>` : ''}`;
}
function curve(b: Box, fn: (x: number) => number, color: string, a = b.xMin, z = b.xMax, width = 2, dash = '') {
  const n = 120;
  const pts: string[] = [];
  for (let i = 0; i <= n; i++) {
    const x = a + ((z - a) * i) / n;
    const y = fn(x);
    if (!isFinite(y)) continue;
    pts.push(`${f1(PX(b, x))},${f1(PY(b, y))}`);
  }
  return `<polyline points="${pts.join(' ')}" fill="none" stroke="${color}" stroke-width="${width}"${dash ? ` stroke-dasharray="${dash}"` : ''} />`;
}
function area(b: Box, fn: (x: number) => number, a: number, z: number, color: string, op = 0.22) {
  const n = 80;
  const pts = [`${f1(PX(b, a))},${f1(PY(b, 0))}`];
  for (let i = 0; i <= n; i++) {
    const x = a + ((z - a) * i) / n;
    pts.push(`${f1(PX(b, x))},${f1(PY(b, fn(x)))}`);
  }
  pts.push(`${f1(PX(b, z))},${f1(PY(b, 0))}`);
  return `<polygon points="${pts.join(' ')}" fill="${color}" fill-opacity="${op}" />`;
}
function bars(b: Box, ks: number[], ps: number[], color: string, gap = 0.18) {
  const w = (PX(b, 1) - PX(b, 0)) * (1 - gap);
  return ks.map((k, i) => {
    const x = PX(b, k) - w / 2, y = PY(b, ps[i]);
    return `<rect x="${f1(x)}" y="${f1(y)}" width="${f1(w)}" height="${f1(b.y + b.h - y)}" fill="${color}" fill-opacity="0.75" />`;
  }).join('');
}
const fig = (svg: string, cap: string) => `<figure class="venn-figure">${svg}<figcaption class="venn-caption">${cap}</figcaption></figure>`;
const svgOpen = (W: number, H: number, label: string) => `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="${label}" class="venn-svg">`;
const range = (a: number, z: number) => Array.from({ length: z - a + 1 }, (_, i) => a + i);

// ============ 1.4 節1：PMF（サイコロ） ============
function pmfDice(): string {
  const W = 340, H = 190;
  const b: Box = { x: 40, y: 30, w: 286, h: 120, xMin: 0.5, xMax: 6.5, yMax: 0.25 };
  const svg = `${svgOpen(W, H, 'サイコロの確率質量関数：6本の棒の高さがそれぞれ確率1/6')}
    ${axes(b, [1, 2, 3, 4, 5, 6])}
    ${bars(b, [1, 2, 3, 4, 5, 6], Array(6).fill(1 / 6), INDIGO, 0.35)}
    <line x1="${b.x}" y1="${f1(PY(b, 1 / 6))}" x2="${b.x + b.w}" y2="${f1(PY(b, 1 / 6))}" stroke="${INK}" stroke-width="1" stroke-dasharray="3 3" />
    <text x="${b.x - 6}" y="${f1(PY(b, 1 / 6) + 4)}" text-anchor="end" font-size="12.4" fill="${SLATE}">1/6</text>
    <text x="${b.x + b.w / 2}" y="${f1(PY(b, 1 / 6) - 8)}" text-anchor="middle" font-size="13.2" fill="${INK}">P(X = x) ＝ 棒の高さ ＝ 1/6</text>
    <text x="${b.x + b.w / 2}" y="${H - 6}" text-anchor="middle" font-size="13.2" fill="${INDIGO}">横軸 ＝ 出た目 x　6本の高さの合計 ＝ 1</text>
  </svg>`;
  const cap = `サイコロの目の確率質量関数です。とりうる値（1〜6）ごとに棒が1本立ち、その<strong>高さ</strong>がそのまま確率 P(X = x) です。6本の高さを足すと 6 × 1/6 = 1 になります。`;
  return fig(svg, cap);
}

// ============ 1.4 節1：PDF（身長） ============
function pdfHeight(): string {
  const W = 340, H = 210;
  const m = 170, s = 6;
  const b: Box = { x: 14, y: 34, w: 312, h: 130, xMin: 152, xMax: 188, yMax: 0.075 };
  const f = (x: number) => normPdf(x, m, s);
  const a = 170, z = 172;
  const prob = Phi((z - m) / s) - Phi((a - m) / s);
  const svg = `${svgOpen(W, H, '身長の確率密度関数：170から172cmに入る確率は曲線の下の塗った面積')}
    ${axes(b, [155, 160, 165, 170, 175, 180, 185])}
    ${area(b, f, a, z, AMBER, 0.55)}
    ${curve(b, f, AMBER)}
    <line x1="${f1(PX(b, a))}" y1="${f1(PY(b, 0))}" x2="${f1(PX(b, a))}" y2="${f1(PY(b, f(a)) - 10)}" stroke="${INK}" stroke-width="1" />
    <line x1="${f1(PX(b, z))}" y1="${f1(PY(b, 0))}" x2="${f1(PX(b, z))}" y2="${f1(PY(b, f(a)) - 10)}" stroke="${INK}" stroke-width="1" />
    <text x="${f1(PX(b, 171))}" y="${b.y - 14}" text-anchor="middle" font-size="13.2" font-weight="700" fill="#b45309">170〜172cm の面積 ＝ ${f2(prob)}</text>
    <text x="${f1(PX(b, 179))}" y="${f1(PY(b, f(179)) - 18)}" font-size="13.2" fill="${INK}">曲線 f(x)</text>
    <text x="${b.x + b.w / 2}" y="${H - 6}" text-anchor="middle" font-size="13.2" fill="${SLATE}">横軸 ＝ 身長 x（cm）　曲線の下の面積の合計 ＝ 1</text>
  </svg>`;
  const cap = `身長の分布を、平均 ${m}cm・標準偏差 ${s}cm の正規分布（左右対称の釣鐘形の分布。<a href="/stats-pre1/1.10-normal-dist/">正規分布の性質</a>で詳しく学びます）と仮定して描いた確率密度関数です。「170〜172cm に入る確率」は、その区間で曲線の下を塗った<strong>面積</strong>で、約 ${f2(prob)} です。区間の幅を狭めると面積も小さくなり、幅が0の「ぴったり170cm」では面積が0、つまり確率0です。`;
  return fig(svg, cap);
}

// ============ 1.4 節1：密度は1を超えてよい ============
function densityOver1(): string {
  const W = 340, H = 180;
  const b: Box = { x: 40, y: 30, w: 286, h: 110, xMin: -0.25, xMax: 1.25, yMax: 2.4 };
  const svg = `${svgOpen(W, H, '0から0.5の一様分布では密度の高さが2になるが、面積は1')}
    ${axes(b, [0, 0.5, 1])}
    <rect x="${f1(PX(b, 0))}" y="${f1(PY(b, 2))}" width="${f1(PX(b, 0.5) - PX(b, 0))}" height="${f1(PY(b, 0) - PY(b, 2))}" fill="${AMBER}" fill-opacity="0.35" stroke="${AMBER}" stroke-width="2" />
    <line x1="${b.x}" y1="${f1(PY(b, 1))}" x2="${b.x + b.w}" y2="${f1(PY(b, 1))}" stroke="${SLATE}" stroke-width="1" stroke-dasharray="3 3" />
    <text x="${b.x - 6}" y="${f1(PY(b, 1) + 4)}" text-anchor="end" font-size="12.4" fill="${SLATE}">1</text>
    <text x="${b.x - 6}" y="${f1(PY(b, 2) + 4)}" text-anchor="end" font-size="12.4" fill="${SLATE}">2</text>
    <text x="${f1(PX(b, 0.25))}" y="${f1(PY(b, 0.45))}" text-anchor="middle" font-size="13.2" font-weight="700" fill="#b45309">面積 1</text>
    <text x="${f1(PX(b, 0.58))}" y="${f1(PY(b, 1.45))}" font-size="13.2" fill="#b45309">幅 0.5 × 高さ 2 ＝ 1</text>
    <text x="${f1(PX(b, 0.55))}" y="${f1(PY(b, 2) + 4)}" font-size="13.2" fill="${INK}">高さ 2（1を超える）</text>
    <text x="${b.x + b.w / 2}" y="${H - 6}" text-anchor="middle" font-size="13.2" fill="${SLATE}">0〜0.5 の一様分布</text>
  </svg>`;
  const cap = `0〜0.5 のどこかに一様に出る値の確率密度関数です。幅が 0.5 しかないので、面積を1にするには高さが2必要です。高さ（密度）は1を超えていますが、確率はどの区間でも面積で測るので1を超えることはありません。`;
  return fig(svg, cap);
}

// ============ 1.4 節2：CDF と生存関数 ============
function survival(): string {
  const W = 340, H = 210;
  const b: Box = { x: 34, y: 20, w: 290, h: 150, xMin: 0, xMax: 3, yMax: 1.05 };
  const F = (x: number) => 1 - Math.exp(-x);
  const S = (x: number) => Math.exp(-x);
  const med = Math.log(2), x2 = 2;
  const svg = `${svgOpen(W, H, '累積分布関数と生存関数は足すと常に1になり、中央値で交わる')}
    ${axes(b, [0, 1, 2, 3])}
    <text x="${b.x - 6}" y="${f1(PY(b, 1) + 4)}" text-anchor="end" font-size="12.4" fill="${SLATE}">1</text>
    <text x="${b.x - 6}" y="${f1(PY(b, 0.5) + 4)}" text-anchor="end" font-size="12.4" fill="${SLATE}">0.5</text>
    ${curve(b, F, AMBER)}
    ${curve(b, S, TEAL)}
    <line x1="${f1(PX(b, x2))}" y1="${f1(PY(b, 0))}" x2="${f1(PX(b, x2))}" y2="${f1(PY(b, 1))}" stroke="${SLATE}" stroke-width="1" stroke-dasharray="3 3" />
    <text x="${f1(PX(b, x2) + 5)}" y="${f1(PY(b, F(x2)) + 14)}" font-size="13.2" fill="#b45309">F(2) = ${f2(F(x2))}</text>
    <text x="${f1(PX(b, x2) + 5)}" y="${f1(PY(b, S(x2)) - 6)}" font-size="13.2" fill="${TEAL}">S(2) = ${f2(S(x2))}</text>
    <circle cx="${f1(PX(b, med))}" cy="${f1(PY(b, 0.5))}" r="3.5" fill="${INK}" />
    <text x="${f1(PX(b, med) + 6)}" y="${f1(PY(b, 0.5) - 6)}" font-size="13.2" fill="${INK}">x = ${f2(med)} で交わる（中央値）</text>
    <text x="${f1(PX(b, 2.55))}" y="${f1(PY(b, F(2.55)) - 6)}" text-anchor="middle" font-size="13.2" font-weight="700" fill="#b45309">F(x)</text>
    <text x="${f1(PX(b, 0.35))}" y="${f1(PY(b, S(0.35)) - 6)}" font-size="13.2" font-weight="700" fill="${TEAL}">S(x)</text>
    <text x="${b.x + b.w / 2}" y="${H - 4}" text-anchor="middle" font-size="12.4" fill="${SLATE}">横軸 x（指数分布 λ = 1。例：故障までの年数）</text>
  </svg>`;
  const cap = `指数分布（λ = 1）で、<strong>F(x)</strong>（x 以下で終わる確率）と<strong>S(x)</strong>（x を超えて続く確率）を重ねました。どの x でも2本の高さを足すと1です（x = 2 なら ${f2(F(x2))} + ${f2(S(x2))} = 1）。F は0から1へ上がり、S は1から0へ下がり、両者は確率がちょうど半々になる中央値 x = ${f2(med)} で交わります。`;
  return fig(svg, cap);
}

// ============ 1.4 節3：同じ平均・分散で形が違う ============
function sameMomentsDifferentShape(): string {
  const W = 340, H = 210;
  const b: Box = { x: 30, y: 24, w: 294, h: 146, xMin: -3, xMax: 4, yMax: 1.05 };
  const norm = (x: number) => normPdf(x);
  const sexp = (x: number) => (x < -1 ? 0 : Math.exp(-(x + 1))); // Y = X - 1, X ~ Exp(1)
  const svg = `${svgOpen(W, H, '平均0・分散1が同じでも、歪度が違う2つの分布')}
    ${axes(b, [-3, -2, -1, 0, 1, 2, 3, 4])}
    <line x1="${f1(PX(b, 0))}" y1="${b.y}" x2="${f1(PX(b, 0))}" y2="${b.y + b.h}" stroke="${SLATE}" stroke-width="1" stroke-dasharray="3 3" />
    ${area(b, norm, -3, 4, INDIGO, 0.12)}
    ${curve(b, norm, INDIGO)}
    ${curve(b, sexp, AMBER, -1, 4)}
    <line x1="${f1(PX(b, -1))}" y1="${f1(PY(b, 0))}" x2="${f1(PX(b, -1))}" y2="${f1(PY(b, 1))}" stroke="${AMBER}" stroke-width="2" />
    <text x="${f1(PX(b, -1.12))}" y="${f1(PY(b, 0.62))}" text-anchor="end" font-size="13.2" font-weight="700" fill="${INDIGO}">正規分布</text>
    <text x="${f1(PX(b, -1.12))}" y="${f1(PY(b, 0.62) + 15)}" text-anchor="end" font-size="13.2" fill="${INDIGO}">歪度 0・尖度 3</text>
    <text x="${f1(PX(b, 1.3))}" y="${f1(PY(b, 0.42))}" font-size="13.2" font-weight="700" fill="#b45309">右に裾が長い分布</text>
    <text x="${f1(PX(b, 1.3))}" y="${f1(PY(b, 0.42) + 15)}" font-size="13.2" fill="#b45309">歪度 2・尖度 9</text>
    <text x="${f1(PX(b, 0) + 4)}" y="${b.y + 10}" font-size="12.4" fill="${SLATE}">平均 0</text>
    <text x="${b.x + b.w / 2}" y="${H - 4}" text-anchor="middle" font-size="12.4" fill="${SLATE}">どちらも 平均 0・分散 1（1次と2次のモーメントが同じ）</text>
  </svg>`;
  const cap = `青は平均0・分散1の正規分布、橙は指数分布（本文の節2で使った待ち時間の分布）を1だけ左にずらしたもの（X − 1、X は λ = 1 の指数分布）です。どちらも<strong>平均 0・分散 1</strong>で、期待値と分散だけでは区別できません。違いが出るのは3次と4次の中心モーメントで、歪度は 0 と 2、尖度は 3 と 9 です。「次数を上げるほど形を細かく区別できる」とはこのことです。`;
  return fig(svg, cap);
}

// ============ 1.4 節4：aX+b ============
function linearTransform(): string {
  const W = 340, H = 220;
  const b: Box = { x: 20, y: 30, w: 304, h: 140, xMin: 0, xMax: 16, yMax: 0.45 };
  const X = (x: number) => normPdf(x, 5, 1);
  const Xb = (x: number) => normPdf(x, 8, 1);
  const aX = (x: number) => normPdf(x, 10, 2);
  const svg = `${svgOpen(W, H, '定数を足すと分布は形を変えずに平行移動し、定数倍すると横に伸びて低くなる')}
    ${axes(b, [0, 2, 4, 6, 8, 10, 12, 14, 16])}
    ${curve(b, X, INDIGO)}
    ${curve(b, Xb, TEAL, b.xMin, b.xMax, 2, '5 3')}
    ${curve(b, aX, AMBER)}
    <text x="${f1(PX(b, 4.3))}" y="${f1(PY(b, X(5)) + 4)}" text-anchor="end" font-size="13.2" font-weight="700" fill="${INDIGO}">X</text>
    <text x="${f1(PX(b, 4.3))}" y="${f1(PY(b, X(5)) + 18)}" text-anchor="end" font-size="12.4" fill="${INDIGO}">平均5・SD1</text>
    <text x="${f1(PX(b, 8.7))}" y="${f1(PY(b, Xb(8)) + 4)}" font-size="13.2" font-weight="700" fill="${TEAL}">X + 3</text>
    <text x="${f1(PX(b, 8.7))}" y="${f1(PY(b, Xb(8)) + 18)}" font-size="12.4" fill="${TEAL}">平均8・SD1</text>
    <text x="${f1(PX(b, 13))}" y="${f1(PY(b, aX(12)) - 4)}" text-anchor="middle" font-size="13.2" font-weight="700" fill="#b45309">2X</text>
    <text x="${f1(PX(b, 13.6))}" y="${f1(PY(b, aX(12)) + 11)}" text-anchor="middle" font-size="12.4" fill="#b45309">平均10・SD2</text>
  </svg>`;
  const cap = `X（平均5・標準偏差1）に<strong>3を足す</strong>と、山はそのまま右へ3ずれるだけで幅は変わりません（分散は1のまま）。<strong>2倍する</strong>と平均は10になり、幅は2倍、そのぶん山は半分の高さになります。分散は 2² = 4 倍です。Var(aX + b) = a²Var(X) の b が消えて a が2乗で効くのは、この「ずらしても幅は変わらない・伸ばすと幅が a 倍」の言い換えです。`;
  return fig(svg, cap);
}

// ============ 1.6：二項分布 ============
function binomialShapes(): string {
  const W = 350, H = 350;
  const cases = [
    { n: 10, p: 0.2 }, { n: 10, p: 0.5 },
    { n: 10, p: 0.8 }, { n: 50, p: 0.2 },
  ];
  const cell = (i: number): Box => {
    const col = i % 2, row = Math.floor(i / 2);
    return cases[i].n === 50
      ? { x: 194, y: 44 + row * 162, w: 146, h: 100, xMin: -0.5, xMax: 25.5, yMax: 0.32 }
      : { x: 18 + col * 176, y: 44 + row * 162, w: 146, h: 100, xMin: -0.5, xMax: 10.5, yMax: 0.32 };
  };
  const parts = cases.map((c, i) => {
    const b = cell(i);
    const ks = c.n === 50 ? range(0, 25) : range(0, 10);
    const ps = ks.map((k) => binom(c.n, c.p, k));
    const mean = c.n * c.p, sd = Math.sqrt(c.n * c.p * (1 - c.p));
    const ticks = c.n === 50 ? [0, 5, 10, 15, 20, 25] : [0, 2, 4, 6, 8, 10];
    return `<text x="${b.x}" y="${b.y - 22}" font-size="13.2" font-weight="700" fill="${INK}">B(${c.n}, ${c.p})</text>
      <text x="${b.x}" y="${b.y - 7}" font-size="12.4" fill="${SLATE}">平均 ${mean}・SD ${f2(sd)}</text>
      ${axes(b, ticks)}
      ${bars(b, ks, ps, c.n === 50 ? TEAL : INDIGO, c.n === 50 ? 0.25 : 0.3)}
      <line x1="${f1(PX(b, mean))}" y1="${b.y}" x2="${f1(PX(b, mean))}" y2="${b.y + b.h}" stroke="${AMBER}" stroke-width="1.4" stroke-dasharray="3 2" />`;
  }).join('');
  const svg = `${svgOpen(W, H, '二項分布の形：p が小さいと右に裾、p=0.5 で左右対称、p が大きいと左に裾、n を大きくすると釣鐘形に近づく')}${parts}
    <text x="${W / 2}" y="${H - 6}" text-anchor="middle" font-size="12.4" fill="${SLATE}">棒の高さ ＝ P(X = k)。橙の点線 ＝ 平均 np</text>
  </svg>`;
  const p0 = binom(10, 0.2, 0), p2 = binom(10, 0.2, 2), pmax50 = Math.max(...range(0, 50).map((k) => binom(50, 0.2, k)));
  const cap = `成功確率 p が小さい B(10, 0.2) は0〜2回に山があり、右に裾を引きます（0回の確率 ${f2(p0)}、2回が最大で ${f2(p2)}）。p = 0.5 で左右対称、p = 0.8 では鏡に映したように左へ裾を引きます。同じ p = 0.2 でも n を 50 に増やすと、山は平均 np = 10 に移り、左右がほぼ対称な釣鐘形になります（最も高い棒は ${f2(pmax50)}）。これが後で学ぶ「二項分布の正規近似」が n の大きいときに使える理由です。`;
  return fig(svg, cap);
}

// ============ 1.7：1時間を短い区間に区切る ============
function poissonSlice(): string {
  const W = 340, H = 196;
  const x0 = 14, w = 312;
  const events = [17.5, 19.5];
  const row = (y: number, n: number, title: string, note: string) => {
    const cw = w / n;
    const hit = new Set(events.map((t) => Math.floor(t / (60 / n))));
    const cells = range(0, n - 1).map((i) => `<rect x="${f1(x0 + i * cw)}" y="${y}" width="${f1(cw)}" height="26" fill="${hit.has(i) ? AMBER : '#ffffff'}" fill-opacity="${hit.has(i) ? 0.45 : 1}" stroke="${SLATE}" stroke-width="${n > 20 ? 0.5 : 1}" />`).join('');
    const marks = events.map((t) => `<circle cx="${f1(x0 + (t / 60) * w)}" cy="${y + 13}" r="3.4" fill="${ROSE}" />`).join('');
    return `<text x="${x0}" y="${y - 7}" font-size="13.2" font-weight="700" fill="${INK}">${title}</text>
      <text x="${x0 + w}" y="${y - 7}" text-anchor="end" font-size="12.4" fill="${n > 20 ? TEAL : '#b45309'}">${note}</text>
      ${cells}${marks}`;
  };
  const svg = `${svgOpen(W, H, '1時間を5分ごとの12区間と1分ごとの60区間に区切った図。17分台と19分台の2件の事故が、12区間では同じ区間に入り、60区間では別々の区間に分かれる')}
    ${row(40, 12, '5分ごとに 12 区間', '2件が同じ区間に入る')}
    ${row(112, 60, '1分ごとに 60 区間', '別々の区間に分かれる')}
    ${[0, 15, 30, 45, 60].map((t) => `<text x="${f1(x0 + (t / 60) * w)}" y="156" text-anchor="middle" font-size="12.4" fill="${SLATE}">${t}分</text>`).join('')}
    <circle cx="${x0 + 4}" cy="${H - 14}" r="3.4" fill="${ROSE}" />
    <text x="${x0 + 12}" y="${H - 10}" font-size="12.4" fill="${INK}">＝ 事故　</text>
    <rect x="${x0 + 70}" y="${H - 21}" width="12" height="12" fill="${AMBER}" fill-opacity="0.45" stroke="${SLATE}" stroke-width="1" />
    <text x="${x0 + 88}" y="${H - 10}" font-size="12.4" fill="${INK}">＝「起きた」と数える区間</text>
  </svg>`;
  const cap = `1時間のうち、17分台と19分台に事故が2件起きた例です。5分ごとの12区間に区切ると、2件とも同じ区間（15〜20分）に入ってしまい、区間ごとの「起きた／起きない」で数えると1件になってしまいます。1分ごとの60区間なら別々の区間に分かれ、2件と正しく数えられます。区間を細かくするほど、件数を「事故が起きた区間の数」、つまり二項分布として扱えるようになります。`;
  return fig(svg, cap);
}

// ============ 1.7：区間を細かくすると二項分布がポアソン分布に近づく ============
function poissonFromBinom(): string {
  const W = 340, H = 230;
  const b: Box = { x: 18, y: 40, w: 312, h: 150, xMin: -0.5, xMax: 12.5, yMax: 0.3 };
  const ks = range(0, 12);
  const coarse = ks.map((k) => (k <= 8 ? binom(8, 0.5, k) : 0));
  const fine = ks.map((k) => binom(100, 0.04, k));
  const dots = ks.map((k, i) => `<circle cx="${f1(PX(b, k))}" cy="${f1(PY(b, coarse[i]))}" r="3.4" fill="${AMBER}" />`).join('');
  const rings = ks.map((k, i) => `<circle cx="${f1(PX(b, k))}" cy="${f1(PY(b, fine[i]))}" r="3.6" fill="none" stroke="${INK}" stroke-width="1.4" />`).join('');
  const svg = `${svgOpen(W, H, 'ポアソン分布 λ=4 の棒に、二項分布 B(8,0.5) と B(100,0.04) を点で重ねた図。100区間の方が棒の頭にほぼ重なる')}
    ${axes(b, [0, 2, 4, 6, 8, 10, 12])}
    ${bars(b, ks, ks.map((k) => pois(4, k)), INDIGO, 0.35)}
    ${dots}${rings}
    <rect x="${b.x + b.w - 168}" y="${b.y - 34}" width="10" height="10" fill="${INDIGO}" fill-opacity="0.75" />
    <text x="${b.x + b.w - 152}" y="${b.y - 25}" font-size="12.4" fill="${INK}">ポアソン分布 λ = 4</text>
    <circle cx="${b.x + b.w - 163}" cy="${b.y - 12}" r="3.4" fill="${AMBER}" />
    <text x="${b.x + b.w - 152}" y="${b.y - 8}" font-size="12.4" fill="#b45309">B(8, 0.5)：8 区間</text>
    <circle cx="${b.x + b.w - 163}" cy="${b.y + 5}" r="3.6" fill="none" stroke="${INK}" stroke-width="1.4" />
    <text x="${b.x + b.w - 152}" y="${b.y + 9}" font-size="12.4" fill="${INK}">B(100, 0.04)：100 区間</text>
    <text x="${b.x + b.w / 2}" y="${H - 4}" text-anchor="middle" font-size="12.4" fill="${SLATE}">横軸 k（1時間の件数）／高さ ＝ P(X = k)</text>
  </svg>`;
  const maxDiff = Math.max(...ks.map((k, i) => Math.abs(fine[i] - pois(4, k))));
  const cap = `棒は平均4件のポアソン分布です。● は1時間を8区間に区切った二項分布 B(8, 0.5)、○ は100区間に区切った B(100, 0.04) で、どちらも平均は4件です。8区間では山が高く細く（4件の確率が ${f2(coarse[4])}、ポアソン分布では ${f2(pois(4, 4))}）、区間が8つしかないので9件以上は起こりえません。100区間にすると ○ は棒の頭とほぼ重なります（どの k でも差は ${maxDiff.toFixed(3)} 以下）。区間を細かくするほど二項分布がポアソン分布に近づく、というのがポアソン分布の式の成り立ちです。`;
  return fig(svg, cap);
}

// ============ 1.7：ポアソン分布 ============
function poissonShapes(): string {
  const W = 350, H = 240;
  const b: Box = { x: 26, y: 26, w: 312, h: 160, xMin: -0.5, xMax: 18.5, yMax: 0.4 };
  const lams = [{ l: 1, c: INDIGO }, { l: 4, c: AMBER }, { l: 10, c: TEAL }];
  const ks = range(0, 18);
  const w = (PX(b, 1) - PX(b, 0)) * 0.26;
  const groups = lams.map(({ l, c }, j) => ks.map((k) => {
    const y = PY(b, pois(l, k));
    const x = PX(b, k) - 1.5 * w + j * w;
    return `<rect x="${f1(x)}" y="${f1(y)}" width="${f1(w)}" height="${f1(b.y + b.h - y)}" fill="${c}" fill-opacity="0.8" />`;
  }).join('')).join('');
  const svg = `${svgOpen(W, H, 'ポアソン分布の形：λ が大きいほど山が右に移り、低く広がる')}
    ${axes(b, [0, 2, 4, 6, 8, 10, 12, 14, 16, 18])}
    ${groups}
    <text x="${f1(PX(b, 1) + 6)}" y="${f1(PY(b, pois(1, 0)) + 2)}" font-size="13.2" font-weight="700" fill="${INDIGO}">λ = 1</text>
    <text x="${f1(PX(b, 4) + 8)}" y="${f1(PY(b, pois(4, 4)) - 8)}" font-size="13.2" font-weight="700" fill="#b45309">λ = 4</text>
    <text x="${f1(PX(b, 10) + 6)}" y="${f1(PY(b, pois(10, 10)) - 8)}" font-size="13.2" font-weight="700" fill="${TEAL}">λ = 10</text>
    <text x="${b.x + b.w / 2}" y="${H - 4}" text-anchor="middle" font-size="12.4" fill="${SLATE}">横軸 k（一定時間に起きる回数）／棒の高さ ＝ P(X = k)</text>
  </svg>`;
  const cap = `λ = 1 では0件と1件が同じ高さ（どちらも ${f2(pois(1, 0))}）で、そこから急に減ります。λ = 4、10 と大きくなるにつれて、山は右へ移り、低く横に広がって、左右対称の形に近づきます。山の位置は平均 λ のあたりにあり、λ が大きいほど広がる理由は、すぐ下の「分散も λ」で説明します。λ が大きいと左右対称に近づくので、<a href="/stats-pre1/1.10-normal-dist/">正規分布</a>（左右対称の釣鐘形の分布）で近似できるようになります（この節の後半）。`;
  return fig(svg, cap);
}

// ============ 1.7：連続修正（ポアソン分布 λ=16 を正規分布で近似） ============
function continuityCorrection(): string {
  const W = 340, H = 236;
  const lam = 16, sd = 4, cut = 20;
  const b: Box = { x: 14, y: 40, w: 316, h: 150, xMin: 5.5, xMax: 27.5, yMax: 0.11 };
  const ks = range(6, 27);
  const bw = PX(b, 1) - PX(b, 0);
  const barsSvg = ks.map((k) => {
    const y = PY(b, pois(lam, k));
    const on = k <= cut;
    return `<rect x="${f1(PX(b, k - 0.5))}" y="${f1(y)}" width="${f1(bw)}" height="${f1(b.y + b.h - y)}" fill="${on ? INDIGO : SLATE}" fill-opacity="${on ? 0.55 : 0.2}" stroke="#ffffff" stroke-width="0.8" />`;
  }).join('');
  const g = (x: number) => normPdf(x, lam, sd);
  const exact = range(0, cut).reduce((s, k) => s + pois(lam, k), 0);
  const withCc = Phi((cut + 0.5 - lam) / sd), noCc = Phi((cut - lam) / sd);
  const vline = (x: number, c: string, dash: string) => `<line x1="${f1(PX(b, x))}" y1="${b.y - 4}" x2="${f1(PX(b, x))}" y2="${b.y + b.h}" stroke="${c}" stroke-width="1.6"${dash ? ` stroke-dasharray="${dash}"` : ''} />`;
  const svg = `${svgOpen(W, H, 'ポアソン分布 λ=16 の棒に正規分布の曲線を重ねた図。20件の棒は19.5から20.5までの幅を持つので、20件以下は20.5までの面積で近似する')}
    ${axes(b, [8, 12, 16, 20, 24])}
    ${barsSvg}
    ${curve(b, g, AMBER, b.xMin, b.xMax, 2.2)}
    ${vline(cut, ROSE, '4 3')}${vline(cut + 0.5, TEAL, '')}
    <text x="${f1(PX(b, cut) - 4)}" y="${b.y - 22}" text-anchor="end" font-size="12.4" fill="${ROSE}">20 で切る</text>
    <text x="${f1(PX(b, cut) - 4)}" y="${b.y - 8}" text-anchor="end" font-size="12.4" fill="${ROSE}">→ ${f2(noCc)}</text>
    <text x="${f1(PX(b, cut + 0.5) + 4)}" y="${b.y - 22}" font-size="12.4" font-weight="700" fill="${TEAL}">20.5 で切る</text>
    <text x="${f1(PX(b, cut + 0.5) + 4)}" y="${b.y - 8}" font-size="12.4" font-weight="700" fill="${TEAL}">→ ${f2(withCc)}</text>
    <text x="${b.x + b.w / 2}" y="${H - 4}" text-anchor="middle" font-size="12.4" fill="${SLATE}">青の棒 ＝ 20件以下（合計 ${f2(exact)}）／橙 ＝ 正規分布</text>
  </svg>`;
  const cap = `平均16件のポアソン分布（棒）に、平均16・標準偏差4の正規分布（橙の曲線）を重ねました。棒は1本ずつ、整数 k を中心に k − 0.5 から k + 0.5 までの幅を持っています。20件以下の確率（青の棒の合計 ${f2(exact)}）を曲線の下の面積で近似するとき、20 で切ると20件の棒の右半分が入らず ${f2(noCc)} と小さく出ます。20.5 で切れば棒が丸ごと入り、${f2(withCc)} とほぼ一致します。これが連続修正です。`;
  return fig(svg, cap);
}

// ============ 1.7：幾何分布の形 ============
function geometricShape(): string {
  const W = 340, H = 220;
  const p = 1 / 6;
  const b: Box = { x: 14, y: 30, w: 316, h: 150, xMin: 0.5, xMax: 20.5, yMax: 0.18 };
  const ks = range(1, 20);
  const ps = ks.map((k) => (1 - p) ** (k - 1) * p);
  const tail = (1 - p) ** 10;
  const svg = `${svgOpen(W, H, 'サイコロで初めて6が出る回数の分布。1回目が最も高く、そこから5/6倍ずつ低くなる。平均は6回目')}
    ${axes(b, [1, 5, 10, 15, 20])}
    ${bars(b, ks.slice(0, 10), ps.slice(0, 10), INDIGO, 0.3)}${bars(b, ks.slice(10), ps.slice(10), SLATE, 0.3)}
    <line x1="${f1(PX(b, 6))}" y1="${b.y}" x2="${f1(PX(b, 6))}" y2="${b.y + b.h}" stroke="${AMBER}" stroke-width="1.6" stroke-dasharray="4 3" />
    <text x="${f1(PX(b, 6) + 5)}" y="${b.y + 10}" font-size="12.4" font-weight="700" fill="#b45309">平均 1/p ＝ 6 回目</text>
    <text x="${f1(PX(b, 1) + 8)}" y="${f1(PY(b, ps[0]) + 4)}" font-size="12.4" fill="${INDIGO}">1回目 ${f2(ps[0])}</text>
    <text x="${f1(PX(b, 15))}" y="${f1(PY(b, ps[10]) - 26)}" text-anchor="middle" font-size="12.4" fill="${SLATE}">灰色（11回目以降）の合計 ${f2(tail)}</text>
    <text x="${b.x + b.w / 2}" y="${H - 4}" text-anchor="middle" font-size="12.4" fill="${SLATE}">横軸 k（初めて6が出る回）／高さ ＝ P(X = k)</text>
  </svg>`;
  const cap = `サイコロで初めて6が出る回の分布（p = 1/6）です。山の頂上は1回目で、平均の6回目より左にあります。灰色の棒（11回目以降）の合計が、10回振っても出ない確率で、約${Math.round(tail * 100)}%です。`;
  return fig(svg, cap);
}

// ============ 1.8：連続型分布（分布ごとに1枚。本文の例と同じ数字で描く） ============
// 指数分布：1時間に平均3件の電話＝1分あたり 0.05 件。次の電話までの待ち時間（分）
const RATE = 0.05;
const expPdf = (t: number) => (t < 0 ? 0 : RATE * Math.exp(-RATE * t));
function exponentialShape(): string {
  const W = 340, H = 226;
  const b: Box = { x: 14, y: 34, w: 316, h: 150, xMin: 0, xMax: 100, yMax: 0.055 };
  const over20 = Math.exp(-RATE * 20);
  const svg = `${svgOpen(W, H, '指数分布：次の電話までの待ち時間。0分のところが最も高く、右へなだらかに下がる。20分より長く待つ確率は約0.37')}
    ${axes(b, [0, 20, 40, 60, 80, 100])}
    ${area(b, expPdf, 20, 100, INDIGO, 0.2)}
    ${curve(b, expPdf, INDIGO, 0, 100, 2.2)}
    <line x1="${f1(PX(b, 20))}" y1="${b.y}" x2="${f1(PX(b, 20))}" y2="${b.y + b.h}" stroke="${AMBER}" stroke-width="1.6" stroke-dasharray="4 3" />
    <text x="${f1(PX(b, 20) + 5)}" y="${b.y + 10}" font-size="12.4" font-weight="700" fill="#b45309">平均 20分</text>
    <text x="${f1(PX(b, 52))}" y="${f1(PY(b, expPdf(40)) - 12)}" font-size="12.4" fill="${INDIGO}">20分より長く待つ確率</text>
    <text x="${f1(PX(b, 52))}" y="${f1(PY(b, expPdf(40)) + 4)}" font-size="12.4" font-weight="700" fill="${INDIGO}">＝ 塗った面積 ${f2(over20)}</text>
    <text x="${b.x + b.w / 2}" y="${H - 4}" text-anchor="middle" font-size="12.4" fill="${SLATE}">横軸 t（次の電話までの待ち時間・分）／高さ ＝ 密度</text>
  </svg>`;
  const cap = `1時間に平均3件の電話が来る窓口で、次の電話までの待ち時間の分布です。すぐ来ることがいちばん多く、長く待つほど起こりにくくなります。平均は20分ですが、20分より長く待つことも約${Math.round(over20 * 100)}%あります。`;
  return fig(svg, cap);
}

// ガンマ分布：同じ窓口で、1件目・2件目・3件目の電話が来るまでの待ち時間
const gammaRate = (k: number) => (t: number) => RATE * gammaPdf(k)(RATE * t);
function gammaShape(): string {
  const W = 340, H = 226;
  const b: Box = { x: 14, y: 34, w: 316, h: 150, xMin: 0, xMax: 150, yMax: 0.055 };
  const ks = [{ k: 1, c: INDIGO, lx: 6, ly: 0.046, t: '1件目（指数分布）' }, { k: 2, c: AMBER, lx: 22, ly: 0.024, t: '2件目' }, { k: 3, c: TEAL, lx: 62, ly: 0.0165, t: '3件目' }];
  const svg = `${svgOpen(W, H, 'ガンマ分布：1件目・2件目・3件目の電話が来るまでの待ち時間。件数が増えるほど山が右へ移り、低く広がる。平均は20分・40分・60分')}
    ${axes(b, [0, 30, 60, 90, 120, 150])}
    ${ks.map(({ k, c }) => curve(b, gammaRate(k), c, 0.01, 150, 2.2)).join('')}
    ${ks.map(({ k, c }) => `<line x1="${f1(PX(b, 20 * k))}" y1="${f1(PY(b, gammaRate(k)(20 * k)))}" x2="${f1(PX(b, 20 * k))}" y2="${b.y + b.h}" stroke="${c}" stroke-width="1.2" stroke-dasharray="3 3" />`).join('')}
    ${ks.map(({ c, lx, ly, t }) => `<text x="${f1(PX(b, lx))}" y="${f1(PY(b, ly))}" font-size="12.4" font-weight="700" fill="${c === AMBER ? '#b45309' : c}">${t}</text>`).join('')}
    <text x="${b.x + b.w / 2}" y="${H - 4}" text-anchor="middle" font-size="12.4" fill="${SLATE}">横軸 t（分）／点線 ＝ 平均（20分・40分・60分）</text>
  </svg>`;
  const cap = `同じ窓口で、1件目・2件目・3件目の電話が来るまでの待ち時間です。待つ件数 α が増えるほど山は右へ移り、低く横に広がります。平均は 20分 × α です。`;
  return fig(svg, cap);
}

// ベータ分布：0〜1の割合
function betaShape(): string {
  const W = 340, H = 226;
  const b: Box = { x: 14, y: 34, w: 316, h: 150, xMin: 0, xMax: 1, yMax: 2.7 };
  const svg = `${svgOpen(W, H, 'ベータ分布：0から1の値の分布。(2,5) は左寄り、(5,2) は右寄り、(2,2) は真ん中、(1,1) は平らな一様分布')}
    ${axes(b, [0, 0.25, 0.5, 0.75, 1])}
    ${curve(b, () => 1, SLATE, 0, 1, 1.5, '4 3')}
    ${curve(b, betaPdf(2, 5), INDIGO, 0.001, 0.999, 2.2)}${curve(b, betaPdf(5, 2), AMBER, 0.001, 0.999, 2.2)}${curve(b, betaPdf(2, 2), TEAL, 0.001, 0.999, 2.2)}
    <text x="${f1(PX(b, 0.1))}" y="${f1(PY(b, 2.55))}" font-size="12.4" font-weight="700" fill="${INDIGO}">(2, 5)</text>
    <text x="${f1(PX(b, 0.83))}" y="${f1(PY(b, 2.55))}" font-size="12.4" font-weight="700" fill="#b45309">(5, 2)</text>
    <text x="${f1(PX(b, 0.5))}" y="${f1(PY(b, 1.62))}" text-anchor="middle" font-size="12.4" font-weight="700" fill="${TEAL}">(2, 2)</text>
    <text x="${b.x + b.w / 2}" y="${H - 4}" text-anchor="middle" font-size="12.4" fill="${SLATE}">横軸 x（割合）／点線 (1, 1) ＝ 一様分布</text>
  </svg>`;
  const cap = `α が β より大きいと山は右寄り、小さいと左寄りになり、等しいと真ん中で左右対称になります。平均は α/(α+β) で、(2, 5) は 0.29、(5, 2) は 0.71、(2, 2) は 0.5 です。(1, 1) は0〜1のどこも同じ高さの一様分布です。`;
  return fig(svg, cap);
}

// 対数正規分布：ln X ~ N(0, σ²)。中央値 1、平均 e^{σ²/2}
function lognormalShape(): string {
  const W = 340, H = 226;
  const b: Box = { x: 14, y: 34, w: 316, h: 150, xMin: 0, xMax: 5, yMax: 0.95 };
  const mean1 = Math.exp(0.5);
  const svg = `${svgOpen(W, H, '対数正規分布：0より大きい値だけをとり、右に長い裾を引く。σ=1 では中央値1、平均1.65で、平均が中央値より右にある')}
    ${axes(b, [0, 1, 2, 3, 4, 5])}
    ${curve(b, lognormPdf(0.5), TEAL, 0.01, 5, 1.8, '5 3')}
    ${curve(b, lognormPdf(1), INDIGO, 0.01, 5, 2.2)}
    <line x1="${f1(PX(b, 1))}" y1="${f1(PY(b, lognormPdf(1)(1)))}" x2="${f1(PX(b, 1))}" y2="${b.y + b.h}" stroke="${SLATE}" stroke-width="1.4" />
    <line x1="${f1(PX(b, mean1))}" y1="${f1(PY(b, lognormPdf(1)(mean1)))}" x2="${f1(PX(b, mean1))}" y2="${b.y + b.h}" stroke="${AMBER}" stroke-width="1.6" stroke-dasharray="4 3" />
    <text x="${f1(PX(b, mean1) + 5)}" y="${f1(PY(b, 0.42))}" font-size="12.4" font-weight="700" fill="#b45309">平均 ${f2(mean1)}</text>
    <text x="${f1(PX(b, 2.3))}" y="${f1(PY(b, 0.22))}" font-size="12.4" font-weight="700" fill="${INDIGO}">σ = 1</text>
    <text x="${f1(PX(b, 1.25))}" y="${f1(PY(b, 0.82))}" font-size="12.4" font-weight="700" fill="${TEAL}">σ = 0.5</text>
    <text x="${b.x + b.w / 2}" y="${H - 4}" text-anchor="middle" font-size="12.4" fill="${SLATE}">灰の線 ＝ 中央値 1／橙の点線 ＝ 平均（σ = 1）</text>
  </svg>`;
  const cap = `ln X が平均0の正規分布に従うときの X の分布です。0より大きい値だけをとり、右に長い裾を引きます。σ = 1 では、真ん中の値（中央値）は1なのに、平均は裾に引っ張られて ${f2(mean1)} になります。σ が大きいほど裾は長くなります。`;
  return fig(svg, cap);
}

// コーシー分布と標準正規分布：|X| > 3 の面積を比べる
function cauchyShape(): string {
  const W = 340, H = 226;
  const b: Box = { x: 14, y: 34, w: 316, h: 150, xMin: -6, xMax: 6, yMax: 0.42 };
  const tailN = 2 * (1 - Phi(3)), tailC = 1 - (2 / Math.PI) * Math.atan(3);
  const svg = `${svgOpen(W, H, 'コーシー分布と標準正規分布：コーシー分布は山が低く裾が重い。3より外に出る確率は正規分布0.27%、コーシー分布20.5%')}
    ${axes(b, [-6, -3, 0, 3, 6])}
    ${area(b, cauchyPdf, -6, -3, ROSE, 0.25)}${area(b, cauchyPdf, 3, 6, ROSE, 0.25)}
    ${curve(b, (x) => normPdf(x), INDIGO, -6, 6, 2.2)}${curve(b, cauchyPdf, ROSE, -6, 6, 2.2)}
    <text x="${f1(PX(b, 0.6))}" y="${f1(PY(b, 0.39))}" font-size="12.4" font-weight="700" fill="${INDIGO}">標準正規</text>
    <text x="${f1(PX(b, 1.2))}" y="${f1(PY(b, 0.2))}" font-size="12.4" font-weight="700" fill="${ROSE}">コーシー</text>
    <text x="${f1(PX(b, 4.5))}" y="${f1(PY(b, 0.13))}" text-anchor="middle" font-size="12.4" fill="${ROSE}">3 より外</text>
    <text x="${f1(PX(b, 4.5))}" y="${f1(PY(b, 0.13) + 15)}" text-anchor="middle" font-size="12.4" fill="${ROSE}">（両側で ${pct(tailC)}）</text>
    <text x="${b.x + b.w / 2}" y="${H - 4}" text-anchor="middle" font-size="12.4" fill="${SLATE}">塗った面積 ＝ |X| が3を超える確率（正規は ${pct(tailN, 2)}）</text>
  </svg>`;
  const cap = `コーシー分布は真ん中の山が低く、そのぶん裾がゆっくりとしか下がりません。|X| が3を超える確率は、標準正規分布では ${pct(tailN, 2)} ですが、コーシー分布では ${pct(tailC)} もあります。`;
  return fig(svg, cap);
}

// ============ 1.10：正規分布の面積 ============
function normalAreas(): string {
  const W = 350, H = 250;
  const mu = 170, sd = 6;
  const b: Box = { x: 14, y: 46, w: 322, h: 140, xMin: mu - 3.6 * sd, xMax: mu + 3.6 * sd, yMax: normPdf(mu, mu, sd) * 1.08 };
  const pdf = (x: number) => normPdf(x, mu, sd);
  const ks = [3, 2, 1];
  const cols = ['#e0e7ff', '#a5b4fc', '#6366f1'];
  const p = (k: number) => 2 * Phi(k) - 1;
  const svg = `${svgOpen(W, H, '身長が平均170cm・標準偏差6cmの正規分布で、平均から1σ・2σ・3σの範囲に入る割合')}
    ${ks.map((k, i) => area(b, pdf, mu - k * sd, mu + k * sd, cols[i], 0.9)).join('')}
    ${curve(b, pdf, INDIGO)}
    ${axes(b, [152, 158, 164, 170, 176, 182, 188])}
    <text x="${f1(PX(b, mu))}" y="${f1(PY(b, pdf(mu) * 0.35))}" text-anchor="middle" font-size="13.2" font-weight="700" fill="#fff">±1σ ${pct(p(1))}</text>
    <text x="${f1(PX(b, mu - 1.5 * sd))}" y="${f1(PY(b, pdf(mu) * 0.08))}" text-anchor="middle" font-size="12.4" font-weight="700" fill="${INK}">±2σ</text>
    <text x="${f1(PX(b, mu + 2.55 * sd))}" y="${f1(PY(b, pdf(mu) * 0.2))}" text-anchor="middle" font-size="12.4" fill="${INK}">±3σ</text>
    <text x="${W / 2}" y="14" text-anchor="middle" font-size="13.2" font-weight="700" fill="${INK}">±1σ：${pct(p(1))}　±2σ：${pct(p(2))}　±3σ：${pct(p(3))}</text>
    <text x="${W / 2}" y="31" text-anchor="middle" font-size="13.2" fill="${ROSE}">ちょうど95%になるのは ±1.96σ（158.2〜181.8cm）</text>
    <line x1="${f1(PX(b, mu - 1.96 * sd))}" y1="${b.y}" x2="${f1(PX(b, mu - 1.96 * sd))}" y2="${b.y + b.h}" stroke="${ROSE}" stroke-width="1.2" stroke-dasharray="3 2" />
    <line x1="${f1(PX(b, mu + 1.96 * sd))}" y1="${b.y}" x2="${f1(PX(b, mu + 1.96 * sd))}" y2="${b.y + b.h}" stroke="${ROSE}" stroke-width="1.2" stroke-dasharray="3 2" />
    <text x="${b.x + b.w / 2}" y="${H - 4}" text-anchor="middle" font-size="12.4" fill="${SLATE}">身長（cm）。平均 170・標準偏差 6</text>
  </svg>`;
  const cap = `本文の身長の例（平均 170cm・標準偏差 6cm）を描いたものです。濃い順に、平均から ±1σ（164〜176cm）に ${pct(p(1))}、±2σ（158〜182cm）までに ${pct(p(2))}、±3σ（152〜188cm）までに ${pct(p(3))} が入ります。赤の点線は ±1.96σ で、この内側がちょうど 95% です。どの正規分布も (X − μ)/σ で標準正規分布にそろうので、この割合は平均や標準偏差の値によらず同じです。`;
  return fig(svg, cap);
}

// ============ 1.10：平均と標準偏差で形がどう変わるか ============
function normalParams(): string {
  const W = 344, H = 330;
  const yMax = normPdf(0, 0, 4) * 1.08;
  const top: Box = { x: 14, y: 40, w: 316, h: 92, xMin: 146, xMax: 194, yMax };
  const bot: Box = { x: 14, y: 198, w: 316, h: 92, xMin: 146, xMax: 194, yMax };
  const ticks = [150, 160, 170, 180, 190];
  const mus = [{ m: 164, c: TEAL }, { m: 170, c: INDIGO }, { m: 176, c: AMBER }];
  const sds = [{ s: 4, c: TEAL, lx: 158.5, ly: 0.088, t: 'σ = 4' }, { s: 6, c: INDIGO, lx: 177.5, ly: 0.058, t: 'σ = 6' }, { s: 9, c: AMBER, lx: 185, ly: 0.03, t: 'σ = 9' }];
  const lab = (c: string) => (c === AMBER ? '#b45309' : c);
  const svg = `${svgOpen(W, H, '上は標準偏差6のまま平均を164・170・176と変えた正規分布で、形は同じまま左右に動く。下は平均170のまま標準偏差を4・6・9と変えたもので、大きいほど低く横に広がる')}
    <text x="${top.x}" y="${top.y - 22}" font-size="13.2" font-weight="700" fill="${INK}">平均を変える（標準偏差は 6）</text>
    ${mus.map(({ m, c }) => curve(top, (x) => normPdf(x, m, 6), c)).join('')}
    ${mus.map(({ m, c }) => `<text x="${f1(PX(top, m))}" y="${f1(PY(top, normPdf(m, m, 6)) - 5)}" text-anchor="middle" font-size="12.4" font-weight="700" fill="${lab(c)}">${m}</text>`).join('')}
    ${axes(top, ticks)}
    <text x="${bot.x}" y="${bot.y - 22}" font-size="13.2" font-weight="700" fill="${INK}">標準偏差を変える（平均は 170）</text>
    ${sds.map(({ s: sd, c }) => curve(bot, (x) => normPdf(x, 170, sd), c)).join('')}
    ${sds.map(({ c, lx, ly, t }) => `<text x="${f1(PX(bot, lx))}" y="${f1(PY(bot, ly))}" text-anchor="middle" font-size="12.4" font-weight="700" fill="${lab(c)}">${t}</text>`).join('')}
    ${axes(bot, ticks)}
    <text x="${W / 2}" y="${H - 4}" text-anchor="middle" font-size="12.4" fill="${SLATE}">横軸 身長 cm</text>
  </svg>`;
  const cap = `上の3本は標準偏差を6cmに固定し、平均だけを164・170・176cmと変えたものです。山の形はまったく同じで、平均の位置へ平行に動きます。下の3本は平均を170cmに固定し、標準偏差を4・6・9cmと変えたものです。標準偏差が大きいほど横に広がり、面積は1のままなので山は低くなります。σ = 4 の山の高さは σ = 9 の${num(9 / 4)}倍です。`;
  return fig(svg, cap);
}

// ============ 1.10：標準化（身長180cm以上の割合） ============
function standardizeTail(): string {
  const W = 344, H = 236;
  const mu = 170, sd = 6, cut = 180, z = (cut - mu) / sd, tail = 1 - Phi(z);
  const b: Box = { x: 14, y: 40, w: 316, h: 120, xMin: 152, xMax: 188, yMax: normPdf(mu, mu, sd) * 1.08 };
  const pdf = (x: number) => normPdf(x, mu, sd);
  const base = b.y + b.h;
  const zs = [-3, -2, -1, 0, 1, 2, 3];
  const svg = `${svgOpen(W, H, '身長が平均170cm・標準偏差6cmの正規分布で、180cm以上の部分に色を付けた図。下に標準化した Z の目盛りを並べてある')}
    ${area(b, pdf, cut, b.xMax, ROSE, 0.45)}
    ${curve(b, pdf, INDIGO)}
    <line x1="${f1(PX(b, cut))}" y1="${b.y - 4}" x2="${f1(PX(b, cut))}" y2="${base}" stroke="${ROSE}" stroke-width="1.4" stroke-dasharray="4 3" />
    <text x="${f1(PX(b, cut))}" y="${b.y - 10}" text-anchor="middle" font-size="12.4" font-weight="700" fill="${ROSE}">180cm（Z ≈ ${f2(z)}）</text>
    <text x="${f1(PX(b, 184.5))}" y="${f1(PY(b, 0.024))}" text-anchor="middle" font-size="12.4" font-weight="700" fill="${ROSE}">約${(tail * 100).toFixed(1)}%</text>
    ${axes(b, [152, 158, 164, 170, 176, 182, 188])}
    ${zs.map((t) => `<text x="${f1(PX(b, mu + t * sd))}" y="${base + 32}" text-anchor="middle" font-size="12.4" font-weight="700" fill="${INDIGO}">${t}</text>`).join('')}
    <text x="${W / 2}" y="${base + 56}" text-anchor="middle" font-size="12.4" fill="${SLATE}">灰の目盛り＝身長 cm／藍の目盛り＝Z ＝（身長 − 170）÷ 6</text>
  </svg>`;
  const cap = `同じ山に、身長の目盛り（灰）と標準化した Z の目盛り（藍）を並べました。180cm は平均から 10cm、標準偏差6cmで割ると Z ≈ ${f2(z)} の位置です。色を付けた180cm以上の面積は、標準正規分布の Z ≥ ${f2(z)} の面積と同じで、約${(tail * 100).toFixed(1)}%です。`;
  return fig(svg, cap);
}

// ============ 1.10：1次変換（点数を2倍して10点足す） ============
function normalAffine(): string {
  const W = 344, H = 196;
  const b: Box = { x: 14, y: 44, w: 316, h: 104, xMin: 0, xMax: 180, yMax: normPdf(0, 0, 10) * 1.1 };
  const X = (x: number) => normPdf(x, 50, 10);
  const Y = (x: number) => normPdf(x, 110, 20);
  const svg = `${svgOpen(W, H, '平均50点・標準偏差10点の点数を2倍して10点足すと、山の中心は110点へ動き、幅は2倍に広がって高さは半分になる')}
    ${area(b, X, 30, 70, INDIGO, 0.18)}
    ${area(b, Y, 70, 150, AMBER, 0.18)}
    ${curve(b, X, INDIGO)}
    ${curve(b, Y, AMBER)}
    <text x="${f1(PX(b, 50))}" y="${f1(PY(b, X(50)) - 20)}" text-anchor="middle" font-size="13.2" font-weight="700" fill="${INDIGO}">X</text>
    <text x="${f1(PX(b, 50))}" y="${f1(PY(b, X(50)) - 6)}" text-anchor="middle" font-size="12.4" fill="${INDIGO}">N(50, 10²)</text>
    <text x="${f1(PX(b, 110))}" y="${f1(PY(b, Y(110)) - 20)}" text-anchor="middle" font-size="13.2" font-weight="700" fill="#b45309">2X + 10</text>
    <text x="${f1(PX(b, 110))}" y="${f1(PY(b, Y(110)) - 6)}" text-anchor="middle" font-size="12.4" fill="#b45309">N(110, 20²)</text>
    ${axes(b, [10, 30, 50, 70, 90, 110, 130, 150, 170])}
    <text x="${W / 2}" y="${H - 4}" text-anchor="middle" font-size="12.4" fill="${SLATE}">横軸 点数。色の帯＝平均 ± 2標準偏差</text>
  </svg>`;
  const cap = `平均50点・標準偏差10点の山（藍）を、全員2倍して10点足すと橙の山になります。中心は 50 × 2 + 10 = 110 点へ動き、幅は2倍、面積は1のままなので高さは半分です。色の帯（平均 ± 2標準偏差）も 30〜70点から 70〜150点へ、幅が40点から80点に伸びています。形は正規分布のまま変わりません。`;
  return fig(svg, cap);
}

// ============ 1.10：和と差（数学＋英語・数学−英語。SDを足した18点は誤り） ============
function normalSum(): string {
  const W = 344, H = 250;
  const sd = Math.sqrt(164);
  const b: Box = { x: 14, y: 52, w: 316, h: 148, xMin: -40, xMax: 160, yMax: normPdf(0, 0, 8) * 1.12 };
  const M = (x: number) => normPdf(x, 60, 10);
  const E = (x: number) => normPdf(x, 55, 8);
  const S = (x: number) => normPdf(x, 115, sd);
  const D = (x: number) => normPdf(x, 5, sd);
  const bad = (x: number) => normPdf(x, 115, 18);
  const svg = `${svgOpen(W, H, '数学 N(60,100) と英語 N(55,64) の山、その合計 N(115,164) と点差 N(5,164) の山。合計と点差は同じ幅で、どちらも元の2科目より広い。標準偏差を足した18点の山は破線で、実際の合計より広すぎる')}
    ${curve(b, E, SLATE, b.xMin, b.xMax, 1.6)}
    ${curve(b, M, TEAL, b.xMin, b.xMax, 1.6)}
    ${curve(b, bad, ROSE, b.xMin, b.xMax, 1.6, '5 3')}
    ${curve(b, D, AMBER)}
    ${curve(b, S, INDIGO)}
    <text x="${f1(PX(b, 41))}" y="${f1(PY(b, E(55)) + 4)}" text-anchor="end" font-size="12.4" font-weight="700" fill="${SLATE}">英語</text>
    <text x="${f1(PX(b, 73))}" y="${f1(PY(b, M(60)) + 4)}" font-size="12.4" font-weight="700" fill="${TEAL}">数学</text>
    <text x="${f1(PX(b, 5))}" y="${f1(PY(b, D(5)) - 20)}" text-anchor="middle" font-size="13.2" font-weight="700" fill="#b45309">点差</text>
    <text x="${f1(PX(b, 5))}" y="${f1(PY(b, D(5)) - 6)}" text-anchor="middle" font-size="12.4" fill="#b45309">N(5, 164)</text>
    <text x="${f1(PX(b, 115))}" y="${f1(PY(b, S(115)) - 20)}" text-anchor="middle" font-size="13.2" font-weight="700" fill="${INDIGO}">合計</text>
    <text x="${f1(PX(b, 115))}" y="${f1(PY(b, S(115)) - 6)}" text-anchor="middle" font-size="12.4" fill="${INDIGO}">N(115, 164)</text>
    <line x1="196" y1="22" x2="218" y2="22" stroke="${ROSE}" stroke-width="1.6" stroke-dasharray="5 3" />
    <text x="222" y="26" font-size="12.4" fill="${ROSE}">SD 18点の山（誤り）</text>
    ${axes(b, [-40, -20, 0, 20, 40, 60, 80, 100, 120, 140, 160])}
    <text x="${W / 2}" y="${H - 4}" text-anchor="middle" font-size="12.4" fill="${SLATE}">横軸 点数</text>
  </svg>`;
  const cap = `数学（緑・標準偏差10点）と英語（灰・8点）を足した合計（藍）は、中心が115点、標準偏差は約${f1(sd)}点です。点差（橙）は中心が5点に動くだけで、幅は合計とまったく同じです。どちらも元の2科目より広がっています。破線は標準偏差どうしを足した18点の山で、実際の合計より明らかに広すぎます。足しても引いても分散は 100 + 64 = 164 で、山の形は正規分布のままです。`;
  return fig(svg, cap);
}

// ============ 1.11：中心極限定理（コイン100回の表の枚数。棒＝二項分布の確率、曲線＝N(50, 25)） ============
function cltCoin(): string {
  const W = 344, H = 262;
  const b: Box = { x: 14, y: 40, w: 316, h: 168, xMin: 29.5, xMax: 70.5, yMax: 0.088 };
  const ks = range(30, 70);
  const ps = ks.map((k) => binom(100, 0.5, k));
  const mid = PY(b, normPdf(55, 50, 5));
  const in5 = ks.filter((k) => k >= 45 && k <= 55).reduce((a, k) => a + binom(100, 0.5, k), 0);
  // 左上の小さな枠：1回分のコイン（0 と 1 が 1/2 ずつ）
  const ib = { x: 22, y: 44, w: 92, h: 66 };
  const ibar = (cx: number) => `<rect x="${cx - 11}" y="${ib.y + 20}" width="22" height="${ib.h - 34}" fill="${SLATE}" fill-opacity="0.6" />`;
  const svg = `${svgOpen(W, H, 'コインを100回投げたときの表の枚数の確率。0と1の2本の棒しかない1回分の分布から、平均50・標準偏差5の釣鐘形になる')}
    ${axes(b, [30, 40, 50, 60, 70])}
    ${bars(b, ks, ps, INDIGO, 0.25)}
    ${curve(b, (x) => normPdf(x, 50, 5), ROSE, 29.5, 70.5, 2)}
    <line x1="${f1(PX(b, 50))}" y1="${b.y - 4}" x2="${f1(PX(b, 50))}" y2="${b.y + b.h}" stroke="${AMBER}" stroke-width="1.4" stroke-dasharray="4 3" />
    <text x="${f1(PX(b, 50))}" y="${b.y - 10}" text-anchor="middle" font-size="12.4" font-weight="700" fill="#b45309">平均 50</text>
    <line x1="${f1(PX(b, 45))}" y1="${f1(mid)}" x2="${f1(PX(b, 55))}" y2="${f1(mid)}" stroke="${INK}" stroke-width="1.2" />
    <text x="${f1(PX(b, 56))}" y="${f1(mid + 4)}" font-size="12.4" fill="${INK}">±5＝標準偏差</text>
    <rect x="${ib.x}" y="${ib.y}" width="${ib.w}" height="${ib.h}" fill="#fff" stroke="${SLATE}" stroke-width="0.8" rx="4" />
    <text x="${ib.x + ib.w / 2}" y="${ib.y + 14}" text-anchor="middle" font-size="12.1" fill="${INK}">1回分のコイン</text>
    ${ibar(ib.x + 28)}${ibar(ib.x + 64)}
    <text x="${ib.x + 28}" y="${ib.y + ib.h - 2}" text-anchor="middle" font-size="12.1" fill="${SLATE}">裏 0</text>
    <text x="${ib.x + 64}" y="${ib.y + ib.h - 2}" text-anchor="middle" font-size="12.1" fill="${SLATE}">表 1</text>
    <text x="${W - 8}" y="${b.y + 30}" text-anchor="end" font-size="12.4" fill="${INDIGO}">棒＝実際の確率</text>
    <text x="${W - 8}" y="${b.y + 48}" text-anchor="end" font-size="12.4" fill="${ROSE}">曲線＝N(50, 25)</text>
    <text x="${b.x + b.w / 2}" y="${H - 4}" text-anchor="middle" font-size="12.4" fill="${SLATE}">横軸＝100回のうち表が出た枚数</text>
  </svg>`;
  const cap = `左上が1回分のコイン（棒2本）。100回投げたときの表の枚数の確率（青い棒）は、正規分布の曲線（赤）にほぼ重なります。45〜55枚に入る確率は約${pct(in5, 0)}です。`;
  return fig(svg, cap);
}

// ============ 1.3：ベイズの樹形図（1000人） ============
function bayesTree(): string {
  const W = 350, H = 250;
  const N = 1000, prev = 0.01, sens = 0.95, spec = 0.9;
  const sick = Math.round(N * prev), healthy = N - sick;
  const tp = Math.round(sick * sens * 10) / 10, fn = Math.round((sick - tp) * 10) / 10, fp = Math.round(healthy * (1 - spec) * 10) / 10, tn = Math.round((healthy - fp) * 10) / 10;
  const pos = Math.round((tp + fp) * 10) / 10;
  const post = tp / (tp + fp);
  const box = (x: number, y: number, w: number, t1: string, t2: string, c: string) =>
    `<rect x="${x}" y="${y}" width="${w}" height="40" rx="4" fill="${c}" fill-opacity="0.14" stroke="${c}" stroke-width="1.2" />
     <text x="${x + w / 2}" y="${y + 17}" text-anchor="middle" font-size="13.2" font-weight="700" fill="${INK}">${t1}</text>
     <text x="${x + w / 2}" y="${y + 33}" text-anchor="middle" font-size="13.2" fill="${INK}">${t2}</text>`;
  const ln = (x1: number, y1: number, x2: number, y2: number, t: string) =>
    `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${SLATE}" stroke-width="1.2" /><text x="${(x1 + x2) / 2 + (x2 > x1 ? 4 : -4)}" y="${(y1 + y2) / 2}" text-anchor="${x2 > x1 ? 'start' : 'end'}" font-size="12.4" fill="${SLATE}">${t}</text>`;
  const svg = `${svgOpen(W, H, '1000人の検査を樹形図で数える')}
    ${box(125, 4, 100, '検査を受ける', `${N}人`, SLATE)}
    ${ln(150, 44, 80, 80, `有病率 ${pct(prev, 0)}`)}${ln(200, 44, 270, 80, '')}
    ${box(20, 80, 110, '病気', `${sick}人`, ROSE)}${box(220, 80, 110, '健康', `${healthy}人`, TEAL)}
    ${ln(55, 120, 40, 160, '')}${ln(95, 120, 110, 160, '')}<text x="75" y="146" text-anchor="middle" font-size="12.4" fill="${SLATE}">感度 ${pct(sens, 0)}</text>
    ${ln(255, 120, 240, 160, '')}${ln(295, 120, 310, 160, '')}<text x="275" y="146" text-anchor="middle" font-size="12.4" fill="${SLATE}">特異度 ${pct(spec, 0)}</text>
    ${box(4, 160, 72, '陽性', `${num(tp)}人`, ROSE)}${box(80, 160, 62, '陰性', `${num(fn)}人`, SLATE)}
    ${box(206, 160, 72, '陽性', `${num(fp)}人`, AMBER)}${box(282, 160, 64, '陰性', `${num(tn)}人`, SLATE)}
    <text x="${W / 2}" y="${H - 22}" text-anchor="middle" font-size="13.2" font-weight="700" fill="${INK}">陽性 ${num(pos)}人のうち、病気は ${num(tp)}人</text>
    <text x="${W / 2}" y="${H - 5}" text-anchor="middle" font-size="13.2" font-weight="700" fill="${ROSE}">P(病気 ∣ 陽性) = ${num(tp)} ÷ ${num(pos)} ≈ ${pct(post)}</text>
  </svg>`;
  const cap = `${N}人で数えると、病気の${sick}人からは${num(tp)}人が陽性、健康な${healthy}人からも${num(fp)}人が誤って陽性になります。陽性の${num(pos)}人のうち本当に病気なのは${num(tp)}人だけなので、陽性とわかっても病気である確率は約 ${pct(post)} です。健康な人が圧倒的に多いため、わずか ${pct(1 - spec, 0)} の誤りでも陽性の大半を占めます。ベイズの定理の分母（全確率）は、この図の「陽性の合計」にあたります。`;
  return fig(svg, cap);
}

// ============ 1.1：3事象の包除原理 ============
function venn3(): string {
  const W = 340, H = 250;
  const c = [{ x: 140, y: 95, n: 'A', col: INDIGO }, { x: 200, y: 95, n: 'B', col: AMBER }, { x: 170, y: 147, n: 'C', col: TEAL }];
  const r = 62;
  const t = (x: number, y: number, s: string, w = 400) => `<text x="${x}" y="${y}" text-anchor="middle" font-size="12.4" font-weight="${w}" fill="${INK}">${s}</text>`;
  const svg = `${svgOpen(W, H, '3つの事象のベン図：各領域が何回数えられるか')}
    ${c.map((k) => `<circle cx="${k.x}" cy="${k.y}" r="${r}" fill="${k.col}" fill-opacity="0.13" stroke="${k.col}" stroke-width="1.5" />`).join('')}
    ${c.map((k, i) => `<text x="${k.x + [-58, 58, -66][i]}" y="${k.y + [-48, -48, 50][i]}" text-anchor="middle" font-size="16" font-weight="700" fill="${k.col}">${k.n}</text>`).join('')}
    ${t(112, 82, '1')}${t(228, 82, '1')}${t(170, 186, '1')}
    ${t(170, 72, '2−1')}${t(136, 136, '2−1')}${t(204, 136, '2−1')}
    ${t(170, 113, '3−3+1', 700)}
    <text x="${W / 2}" y="${H - 22}" text-anchor="middle" font-size="13.2" fill="${INK}">数字 ＝ 足す・引く・足すで、その領域を何回数えたか</text>
    <text x="${W / 2}" y="${H - 6}" text-anchor="middle" font-size="13.2" font-weight="700" fill="${INDIGO}">最後はどの領域もちょうど1回になる</text>
  </svg>`;
  const cap = `P(A) + P(B) + P(C) と足すと、2つが重なる部分は2回、3つが重なる中心は3回数えられます。2つずつの重なり3つを引くと、2つの重なりは 2 − 1 = 1 回に直りますが、中心は3回引かれて 3 − 3 = 0 回、つまり<strong>引き過ぎ</strong>になります。そこで最後に P(A∩B∩C) を1回足し戻すと、すべての領域がちょうど1回になります。`;
  return fig(svg, cap);
}

// ============ 2.1：過学習（同じ10点に直線・2次・9次を当てはめる） ============
function mulberry32(a: number) {
  return () => {
    a |= 0; a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
function gaussFrom(rnd: () => number) {
  return () => Math.sqrt(-2 * Math.log(1 - rnd())) * Math.cos(2 * Math.PI * rnd());
}
function solve(A: number[][], b: number[]): number[] {
  const n = b.length;
  const M = A.map((r, i) => [...r, b[i]]);
  for (let c = 0; c < n; c++) {
    let p = c;
    for (let r = c + 1; r < n; r++) if (Math.abs(M[r][c]) > Math.abs(M[p][c])) p = r;
    [M[c], M[p]] = [M[p], M[c]];
    for (let r = c + 1; r < n; r++) {
      const f = M[r][c] / M[c][c];
      for (let k = c; k <= n; k++) M[r][k] -= f * M[c][k];
    }
  }
  const x = Array(n).fill(0);
  for (let r = n - 1; r >= 0; r--) {
    let s = M[r][n];
    for (let k = r + 1; k < n; k++) s -= M[r][k] * x[k];
    x[r] = s / M[r][r];
  }
  return x;
}
function polyFit(xs: number[], ys: number[], deg: number): number[] {
  const m = deg + 1;
  const V = xs.map((x) => Array.from({ length: m }, (_, j) => x ** j));
  if (m === xs.length) return solve(V, ys); // 点の数と係数の数が同じ＝全点を通る
  const A = Array.from({ length: m }, (_, i) => Array.from({ length: m }, (_, j) => V.reduce((s, r) => s + r[i] * r[j], 0)));
  const b = Array.from({ length: m }, (_, i) => V.reduce((s, r, k) => s + r[i] * ys[k], 0));
  return solve(A, b);
}
const polyAt = (c: number[], x: number) => c.reduce((s, a, j) => s + a * x ** j, 0);
const rmse = (c: number[], xs: number[], ys: number[]) => Math.sqrt(xs.reduce((s, x, i) => s + (ys[i] - polyAt(c, x)) ** 2, 0) / xs.length);

function overfitData() {
  const truth = (x: number) => 0.5 + 1.2 * x - 1.5 * x * x;
  const g = gaussFrom(mulberry32(20261011));
  const sd = 0.25;
  const xs = Array.from({ length: 10 }, (_, i) => -0.9 + 0.2 * i);
  const ys = xs.map((x) => truth(x) + sd * g());
  const tx = Array.from({ length: 10 }, (_, i) => -0.95 + 0.2 * i);
  const ty = tx.map((x) => truth(x) + sd * g());
  return { truth, xs, ys, tx, ty };
}

function overfit(): string {
  const { xs, ys, tx, ty } = overfitData();
  const W = 350, H = 470;
  const cases = [{ d: 1, name: '直線（1次）' }, { d: 2, name: '曲線（2次）' }, { d: 9, name: '9次式（10点すべてを通る）' }];
  const rows = cases.map((c) => {
    const coef = polyFit(xs, ys, c.d);
    return { ...c, coef, tr: rmse(coef, xs, ys), te: rmse(coef, tx, ty) };
  });
  const panel = (r: (typeof rows)[number], i: number) => {
    const b: Box = { x: 26, y: 34 + i * 148, w: 310, h: 96, xMin: -1, xMax: 1, yMax: 1 };
    const yMin = -2.6, yMax = 1.2;
    const py = (y: number) => b.y + b.h - ((Math.max(yMin, Math.min(yMax, y)) - yMin) / (yMax - yMin)) * b.h;
    const pts: string[] = [];
    for (let k = 0; k <= 200; k++) {
      const x = -1 + (2 * k) / 200;
      pts.push(`${f1(PX(b, x))},${f1(py(polyAt(r.coef, x)))}`);
    }
    const col = r.te > r.tr * 2.5 ? ROSE : INDIGO;
    return `<text x="${b.x}" y="${b.y - 18}" font-size="13.2" font-weight="700" fill="${INK}">${r.name}</text>
      <text x="${b.x}" y="${b.y - 4}" font-size="12.4" fill="${SLATE}">学習データの誤差 ${f2(r.tr)}　テストの誤差 <tspan font-weight="700" fill="${col}">${f2(r.te)}</tspan></text>
      <rect x="${b.x}" y="${b.y}" width="${b.w}" height="${b.h}" fill="none" stroke="#e2e8f0" />
      <polyline points="${pts.join(' ')}" fill="none" stroke="${col}" stroke-width="2" />
      ${xs.map((x, k) => `<circle cx="${f1(PX(b, x))}" cy="${f1(py(ys[k]))}" r="3.4" fill="${INK}" />`).join('')}
      ${tx.map((x, k) => `<circle cx="${f1(PX(b, x))}" cy="${f1(py(ty[k]))}" r="3.4" fill="#fff" stroke="${AMBER}" stroke-width="1.6" />`).join('')}`;
  };
  const svg = `${svgOpen(W, H, '同じ10点に直線・2次式・9次式を当てはめると、9次式は学習データを完全に通るがテストデータで大きく外れる')}
    ${rows.map(panel).join('')}
    <circle cx="40" cy="${H - 14}" r="3.4" fill="${INK}" /><text x="48" y="${H - 10}" font-size="12.4" fill="${INK}">学習データ（当てはめに使う10点）</text>
    <circle cx="232" cy="${H - 14}" r="3.4" fill="#fff" stroke="${AMBER}" stroke-width="1.6" /><text x="240" y="${H - 10}" font-size="12.4" fill="${INK}">テスト用の10点</text>
  </svg>`;
  const [r1, r2, r9] = rows;
  const cap = `真の関係が2次式のデータ（黒の10点）に、3通りの式を最小二乗法で当てはめました。誤差は各点のずれの二乗平均の平方根です。直線は曲がりを表せず、学習データでも ${f2(r1.tr)} ずれます。2次式は学習 ${f2(r2.tr)}、テスト ${f2(r2.te)} と、どちらも小さく収まります。9次式は10点すべてを通るので学習データの誤差は ${f2(r9.tr)} ですが、点と点の間で大きく波打ち、同じ仕組みで作った別の10点（白丸）では誤差が ${f2(r9.te)} と、2次式の約 ${Math.round(r9.te / r2.te)} 倍になります。手元のデータへの当てはまりだけでモデルを選ぶと、この9次式を選んでしまいます。`;
  return fig(svg, cap);
}

// ============ 1.9：2変量正規分布（相関0と0.7） ============
function bivariateNormal(): string {
  const W = 350, H = 230;
  const g = gaussFrom(mulberry32(8));
  const panel = (rho: number, x0: number) => {
    const b: Box = { x: x0, y: 30, w: 150, h: 150, xMin: -3, xMax: 3, yMax: 1 };
    const py = (y: number) => b.y + b.h / 2 - (y / 3) * (b.h / 2);
    const pts = Array.from({ length: 150 }, () => { const z1 = g(), z2 = g(); return [z1, rho * z1 + Math.sqrt(1 - rho * rho) * z2]; });
    // 等確率楕円：x' Σ^{-1} x = c²（c = 1, 2）。Σ の固有値 1±ρ、主軸は 45° 方向
    const ell = (c: number) => {
      const out: string[] = [];
      for (let k = 0; k <= 72; k++) {
        const t = (2 * Math.PI * k) / 72;
        const u = c * Math.sqrt(1 + rho) * Math.cos(t), v = c * Math.sqrt(1 - rho) * Math.sin(t);
        const x = (u - v) / Math.SQRT2, y = (u + v) / Math.SQRT2;
        out.push(`${f1(PX(b, x))},${f1(py(y))}`);
      }
      return `<polygon points="${out.join(' ')}" fill="none" stroke="${INDIGO}" stroke-width="1.6" />`;
    };
    const r = (() => { const n = pts.length; const mx = pts.reduce((s, p) => s + p[0], 0) / n, my = pts.reduce((s, p) => s + p[1], 0) / n; let sxy = 0, sxx = 0, syy = 0; pts.forEach(([x, y]) => { sxy += (x - mx) * (y - my); sxx += (x - mx) ** 2; syy += (y - my) ** 2; }); return sxy / Math.sqrt(sxx * syy); })();
    return `<rect x="${b.x}" y="${b.y}" width="${b.w}" height="${b.h}" fill="none" stroke="#e2e8f0" />
      ${pts.filter(([x, y]) => Math.abs(x) < 3 && Math.abs(y) < 3).map(([x, y]) => `<circle cx="${f1(PX(b, x))}" cy="${f1(py(y))}" r="1.8" fill="${SLATE}" fill-opacity="0.55" />`).join('')}
      ${ell(1)}${ell(2)}
      <text x="${b.x + b.w / 2}" y="${b.y - 10}" text-anchor="middle" font-size="13.2" font-weight="700" fill="${INK}">相関 ρ = ${rho}</text>
      <text x="${b.x + b.w / 2}" y="${b.y + b.h + 16}" text-anchor="middle" font-size="12.4" fill="${SLATE}">150点の標本相関 ${f2(r)}</text>`;
  };
  const svg = `${svgOpen(W, H, '2変量正規分布の等確率線：相関0なら円、相関0.7なら右上がりの楕円')}${panel(0, 12)}${panel(0.7, 188)}
    <text x="${W / 2}" y="${H - 4}" text-anchor="middle" font-size="12.4" fill="${SLATE}">線＝同じ確率密度の点を結んだ等高線（内側 1σ、外側 2σ）</text></svg>`;
  const cap = `左は相関0で等高線は円、右は相関0.7で右上がりの楕円です。X が大きいほど Y も大きくなりやすいことが、楕円の傾きに表れます。`;
  return fig(svg, cap);
}

// ============ 1.9：変数変換（Y = X² で帯の幅と高さが変わる） ============
function transformStrips(): string {
  const W = 344, H = 236;
  const L: Box = { x: 14, y: 40, w: 130, h: 140, xMin: 0, xMax: 1, yMax: 3 };
  const R: Box = { x: 198, y: 40, w: 130, h: 140, xMin: 0, xMax: 1, yMax: 3 };
  const cols = [INDIGO, AMBER, TEAL, ROSE];
  const fy = (y: number) => 1 / (2 * Math.sqrt(y));
  const cuts = [0, 0.25, 0.5, 0.75, 1];
  const left = cuts.slice(0, 4).map((a, i) => `<rect x="${f1(PX(L, a))}" y="${f1(PY(L, 1))}" width="${f1(PX(L, cuts[i + 1]) - PX(L, a))}" height="${f1(PY(L, 0) - PY(L, 1))}" fill="${cols[i]}" fill-opacity="0.35" stroke="${cols[i]}" />`).join('');
  const right = cuts.slice(0, 4).map((a, i) => area(R, fy, Math.max(a * a, 0.004), cuts[i + 1] ** 2, cols[i], 0.35)).join('');
  const svg = `${svgOpen(W, H, '一様分布の X を2乗すると、0に近い側の帯は細く高く、1に近い側の帯は太く低くなる。どの帯も面積は0.25のまま')}
    <text x="${L.x + L.w / 2}" y="${L.y - 22}" text-anchor="middle" font-size="13.2" font-weight="700" fill="${INK}">X（0〜1の一様分布）</text>
    <text x="${R.x + R.w / 2}" y="${R.y - 22}" text-anchor="middle" font-size="13.2" font-weight="700" fill="${INK}">Y ＝ X²</text>
    ${left}${axes(L, [0, 0.5, 1])}
    ${right}${curve(R, fy, INK, 0.004, 1, 1.6)}${axes(R, [0, 0.5, 1])}
    <text x="${f1(PX(L, 0.5))}" y="${f1(PY(L, 1) - 6)}" text-anchor="middle" font-size="12.4" fill="${SLATE}">高さ 1</text>
    <text x="${f1(PX(R, 0.3))}" y="${f1(PY(R, 2.6))}" font-size="12.4" fill="${INDIGO}">細く高い</text>
    <text x="${f1(PX(R, 0.98))}" y="${f1(PY(R, 0.9))}" text-anchor="end" font-size="12.4" fill="${ROSE}">太く低い</text>
    <text x="${(L.x + L.w + R.x) / 2}" y="${L.y + L.h / 2 + 4}" text-anchor="middle" font-size="18" fill="${SLATE}">→</text>
    <text x="${W / 2}" y="${H - 22}" text-anchor="middle" font-size="12.4" fill="${SLATE}">4色の帯は、どれも面積（確率）0.25</text>
    <text x="${W / 2}" y="${H - 5}" text-anchor="middle" font-size="12.4" fill="${SLATE}">右の曲線 ＝ f(y) ＝ 1/(2√y)</text>
  </svg>`;
  const cap = `X の値を4つの範囲に分け、それぞれの範囲の値を2乗した先へ移しました。X がその範囲に入る確率（帯の面積）は0.25のままなので、狭い範囲に移った帯は高く、広い範囲に移った帯は低くなります。`;
  return fig(svg, cap);
}

// ============ 1.9：条件付き分布（身長と体重・ρ = 0.5） ============
// 1.9：分散共分散行列のどこに何を置くか（行と列に X, Y を割り当てた表）と、図の2例への当てはめ
function covMatrix(): string {
  const W = 344, H = 300;
  const sub = (s: string) => `<tspan baseline-shift="sub" font-size="12.4">${s}</tspan>`;
  const sup = (s: string) => `<tspan baseline-shift="super" font-size="12.4">${s}</tspan>`;
  const V = '#e0e7ff', C = '#fef3c7';
  const cell = (x: number, y: number, w: number, h: number, fill: string, lines: string[], col: string, fs = 12.4) =>
    `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${fill}" stroke="${SLATE}" stroke-width="1" />` +
    lines.map((t, i) => `<text x="${x + w / 2}" y="${f1(y + h / 2 + (i - (lines.length - 1) / 2) * 17 + 4.5)}" text-anchor="middle" font-size="${fs}" font-weight="700" fill="${col}">${t}</text>`).join('');
  // 上：一般形
  const gx = 64, gy = 36, cw = 130, ch = 56;
  const top = `
    <text x="${gx + cw / 2}" y="${gy - 8}" text-anchor="middle" font-size="12.4" font-weight="700" fill="${INK}">列 X</text>
    <text x="${gx + cw * 1.5}" y="${gy - 8}" text-anchor="middle" font-size="12.4" font-weight="700" fill="${INK}">列 Y</text>
    <text x="${gx - 8}" y="${gy + ch / 2 + 4.5}" text-anchor="end" font-size="12.4" font-weight="700" fill="${INK}">行 X</text>
    <text x="${gx - 8}" y="${gy + ch * 1.5 + 4.5}" text-anchor="end" font-size="12.4" font-weight="700" fill="${INK}">行 Y</text>
    ${cell(gx, gy, cw, ch, V, ['X の分散', `σ${sub('X')}${sup('2')}`], INDIGO)}
    ${cell(gx + cw, gy, cw, ch, C, ['X と Y の共分散', `ρσ${sub('X')}σ${sub('Y')}`], AMBER)}
    ${cell(gx, gy + ch, cw, ch, C, ['Y と X の共分散', `ρσ${sub('X')}σ${sub('Y')}`], AMBER)}
    ${cell(gx + cw, gy + ch, cw, ch, V, ['Y の分散', `σ${sub('Y')}${sup('2')}`], INDIGO)}
    <text x="${W / 2}" y="${gy + ch * 2 + 20}" text-anchor="middle" font-size="12" fill="${SLATE}">行と列の交わるマスに、その2つの組み合わせの値を書く</text>`;
  // 下：図の2例（分散1なので共分散＝ρ）
  const ey = 214, ew = 52, eh = 30;
  const ex = (x0: number, title: string, r: string) => `
    <text x="${x0 + ew}" y="${ey - 10}" text-anchor="middle" font-size="12.4" font-weight="700" fill="${INK}">${title}</text>
    ${cell(x0, ey, ew, eh, V, ['1'], INDIGO, 13)}${cell(x0 + ew, ey, ew, eh, C, [r], AMBER, 13)}
    ${cell(x0, ey + eh, ew, eh, C, [r], AMBER, 13)}${cell(x0 + ew, ey + eh, ew, eh, V, ['1'], INDIGO, 13)}`;
  const svg = `${svgOpen(W, H, '分散共分散行列の並べ方。行と列にXとYを割り当て、対角に分散、右上と左下に共分散を置く。下に相関0と相関0.7の例')}
    ${top}
    ${ex(40, '左の図（相関0）', '0')}${ex(200, '右の図（相関0.7）', '0.7')}
  </svg>`;
  const cap = '藍のマス（左上と右下）が分散、橙のマス（右上と左下）が共分散です。最初の散布図の2つは分散がどちらも1なので、共分散は ρ×1×1 で相関係数そのものになります。';
  return fig(svg, cap);
}

function conditionalNormal(): string {
  const W = 344, H = 262;
  const mx = 170, sx = 6, my = 65, sy = 8, rho = 0.5;
  const b = { x: 36, y: 30, w: 296, h: 186, xMin: 152, xMax: 188, yMin: 41, yMax: 89 };
  const X = (x: number) => b.x + ((x - b.xMin) / (b.xMax - b.xMin)) * b.w;
  const Y = (y: number) => b.y + b.h - ((y - b.yMin) / (b.yMax - b.yMin)) * b.h;
  const ell = (c: number) => {
    const out: string[] = [];
    for (let k = 0; k <= 72; k++) {
      const t = (2 * Math.PI * k) / 72;
      const u = c * Math.sqrt(1 + rho) * Math.cos(t), v = c * Math.sqrt(1 - rho) * Math.sin(t);
      out.push(`${f1(X(mx + sx * (u - v) / Math.SQRT2))},${f1(Y(my + sy * (u + v) / Math.SQRT2))}`);
    }
    return `<polygon points="${out.join(' ')}" fill="none" stroke="#cbd5e1" stroke-width="1.4" />`;
  };
  const cm = (x: number) => my + rho * (sy / sx) * (x - mx);
  const cs = sy * Math.sqrt(1 - rho * rho);
  const slice = (x0: number, col: string) => {
    const m = cm(x0), k = 5 / normPdf(m, m, cs);
    const pts: string[] = [];
    for (let i = 0; i <= 80; i++) { const y = m - 2.5 * cs + (5 * cs * i) / 80; pts.push(`${f1(X(x0 + k * normPdf(y, m, cs)))},${f1(Y(y))}`); }
    return `<line x1="${f1(X(x0))}" y1="${b.y}" x2="${f1(X(x0))}" y2="${b.y + b.h}" stroke="${col}" stroke-width="1.2" stroke-dasharray="4 3" />
      <polyline points="${pts.join(' ')}" fill="none" stroke="${col}" stroke-width="2" />
      <circle cx="${f1(X(x0))}" cy="${f1(Y(m))}" r="3.4" fill="${col}" />`;
  };
  const svg = `${svgOpen(W, H, '身長と体重の2変量正規分布。身長を決めると体重は正規分布になり、その中心は右上がりの直線の上にある')}
    <rect x="${b.x}" y="${b.y}" width="${b.w}" height="${b.h}" fill="none" stroke="#e2e8f0" />
    ${ell(1)}${ell(2)}
    <line x1="${f1(X(b.xMin))}" y1="${f1(Y(cm(b.xMin)))}" x2="${f1(X(b.xMax))}" y2="${f1(Y(cm(b.xMax)))}" stroke="${INK}" stroke-width="1.4" />
    ${slice(164, TEAL)}${slice(176, AMBER)}
    ${(() => {
      // 身長を知らないときの体重の分布（標準偏差 8kg）。切った山と面積がそろうよう同じ倍率で描く
      const k = 5 / normPdf(0, 0, cs), x0 = 153;
      const pts: string[] = [];
      for (let i = 0; i <= 80; i++) { const y = my - 2.5 * sy + (5 * sy * i) / 80; if (y < b.yMin || y > b.yMax) continue; pts.push(`${f1(X(x0 + k * normPdf(y, my, sy)))},${f1(Y(y))}`); }
      return `<polyline points="${pts.join(' ')}" fill="none" stroke="${SLATE}" stroke-width="1.8" stroke-dasharray="4 3" />
        <text x="${f1(X(x0) + 4)}" y="${f1(Y(86))}" font-size="12.4" font-weight="700" fill="${SLATE}">全体</text>`;
    })()}
    ${[155, 160, 165, 170, 175, 180, 185].map((v) => `<text x="${f1(X(v))}" y="${b.y + b.h + 14}" text-anchor="middle" font-size="12.4" fill="${SLATE}">${v}</text>`).join('')}
    ${[45, 55, 65, 75, 85].map((v) => `<text x="${b.x - 4}" y="${f1(Y(v) + 4)}" text-anchor="end" font-size="12.4" fill="${SLATE}">${v}</text>`).join('')}
    <text x="${b.x - 30}" y="${b.y - 8}" font-size="12.4" fill="${SLATE}">体重kg</text>
    <text x="${f1(X(176))}" y="${b.y - 8}" text-anchor="middle" font-size="12.4" font-weight="700" fill="#b45309">176cm</text>
    <text x="${f1(X(164))}" y="${b.y - 8}" text-anchor="middle" font-size="12.4" font-weight="700" fill="${TEAL}">164cm</text>
    <text x="${b.x + b.w / 2}" y="${H - 4}" text-anchor="middle" font-size="12.4" fill="${SLATE}">横軸 身長 cm／黒の直線 ＝ 身長ごとの体重の平均</text>
  </svg>`;
  const cap = `身長164cmと176cmで縦に切った体重の分布です。点はそれぞれの平均（${num(cm(164))}kg・${num(cm(176))}kg）、左端の灰の点線は身長を知らないときの体重の分布（標準偏差8kg）です。`;
  return fig(svg, cap);
}

// ============ 1.9：最大値の分布（指数分布 n 個の最大値） ============
function maxShift(): string {
  const W = 344, H = 226;
  const b: Box = { x: 14, y: 34, w: 316, h: 150, xMin: 0, xMax: 8, yMax: 1.0 };
  const fmax = (n: number) => (x: number) => (x < 0 ? 0 : n * Math.exp(-x) * (1 - Math.exp(-x)) ** (n - 1));
  const ns = [{ n: 1, c: INDIGO, lx: 0.35, ly: 0.86, t: 'n = 1' }, { n: 10, c: AMBER, lx: 2.6, ly: 0.47, t: 'n = 10' }, { n: 100, c: TEAL, lx: 4.9, ly: 0.47, t: 'n = 100' }];
  const svg = `${svgOpen(W, H, '平均1の指数分布 n 個の最大値の分布。n を10倍にするごとに右へ約2.3ずれ、形はほぼ同じになっていく')}
    ${axes(b, [0, 2, 4, 6, 8])}
    ${ns.map(({ n, c }) => curve(b, fmax(n), c, 0, 8, 2.2)).join('')}
    ${ns.slice(1).map(({ n, c }) => `<line x1="${f1(PX(b, Math.log(n)))}" y1="${f1(PY(b, fmax(n)(Math.log(n))))}" x2="${f1(PX(b, Math.log(n)))}" y2="${b.y + b.h}" stroke="${c}" stroke-width="1.2" stroke-dasharray="3 3" />`).join('')}
    ${ns.map(({ c, lx, ly, t }) => `<text x="${f1(PX(b, lx))}" y="${f1(PY(b, ly))}" font-size="12.4" font-weight="700" fill="${c === AMBER ? '#b45309' : c}">${t}</text>`).join('')}
    <text x="${b.x + b.w / 2}" y="${H - 4}" text-anchor="middle" font-size="12.4" fill="${SLATE}">横軸 ＝ n 個の最大値／点線 ＝ ln n（${f2(Math.log(10))}・${f2(Math.log(100))}）</text>
  </svg>`;
  const cap = `n を10倍にするたびに山は右へ ${f2(Math.log(10))} ずれ、形はほぼ同じです。ずらして重ねるとガンベル分布に近づきます。`;
  return fig(svg, cap);
}

// ============ 1.9：マハラノビス距離（中心から同じ距離の2点でも、楕円に沿う点と横切る点で珍しさが違う） ============
function mahalanobis(): string {
  const W = 344, H = 290, rho = 0.7;
  const b: Box = { x: 62, y: 22, w: 220, h: 220, xMin: -3, xMax: 3, yMax: 1 };
  const py = (y: number) => b.y + b.h / 2 - (y / 3) * (b.h / 2);
  const md = (x: number, y: number) => Math.sqrt((x * x - 2 * rho * x * y + y * y) / (1 - rho * rho));
  const ell = (c: number) => {
    const out: string[] = [];
    for (let k = 0; k <= 72; k++) {
      const t = (2 * Math.PI * k) / 72;
      const u = c * Math.sqrt(1 + rho) * Math.cos(t), v = c * Math.sqrt(1 - rho) * Math.sin(t);
      out.push(`${f1(PX(b, (u - v) / Math.SQRT2))},${f1(py((u + v) / Math.SQRT2))}`);
    }
    return `<polygon points="${out.join(' ')}" fill="none" stroke="${INDIGO}" stroke-opacity="${1 - c * 0.22}" stroke-width="1.5" />`;
  };
  const P = [1.2, 1.2], Q = [1.2, -1.2];
  const eu = Math.hypot(P[0], P[1]);
  // 実際の散らばり（相関0.7の200点）と、ふつうの距離が P・Q と同じ円
  const g = gaussFrom(mulberry32(8));
  const pts = Array.from({ length: 200 }, () => { const z1 = g(), z2 = g(); return [z1, rho * z1 + Math.sqrt(1 - rho * rho) * z2]; })
    .filter(([x, y]) => Math.abs(x) < 3 && Math.abs(y) < 3);
  const circle = `<circle cx="${f1(PX(b, 0))}" cy="${f1(py(0))}" r="${f1(PX(b, eu) - PX(b, 0))}" fill="none" stroke="${SLATE}" stroke-width="1.4" stroke-dasharray="5 4" />`;
  const dot = ([x, y]: number[], col: string, name: string) => `<line x1="${f1(PX(b, 0))}" y1="${f1(py(0))}" x2="${f1(PX(b, x))}" y2="${f1(py(y))}" stroke="${col}" stroke-width="1.4" stroke-dasharray="4 3" />
    <circle cx="${f1(PX(b, x))}" cy="${f1(py(y))}" r="4.5" fill="${col}" />
    <text x="${f1(PX(b, x) + 8)}" y="${f1(py(y) + (y > 0 ? -6 : 16))}" font-size="13.2" font-weight="700" fill="${col}">${name}（${f2(md(x, y))}）</text>`;
  const svg = `${svgOpen(W, H, '相関0.7の2変量正規分布で、中心から同じ距離にある2点。楕円に沿った点Pはマハラノビス距離が小さく、楕円を横切る点Qは大きい')}
    <line x1="${b.x}" y1="${f1(py(0))}" x2="${b.x + b.w}" y2="${f1(py(0))}" stroke="#e2e8f0" />
    <line x1="${f1(PX(b, 0))}" y1="${b.y}" x2="${f1(PX(b, 0))}" y2="${b.y + b.h}" stroke="#e2e8f0" />
    ${pts.map(([x, y]) => `<circle cx="${f1(PX(b, x))}" cy="${f1(py(y))}" r="1.7" fill="${SLATE}" fill-opacity="0.35" />`).join('')}
    ${[1, 2, 3].map(ell).join('')}${circle}
    ${dot(P, TEAL, 'P')}${dot(Q, ROSE, 'Q')}
    <text x="${b.x + b.w + 6}" y="${f1(py(0) + 4)}" font-size="12.4" fill="${SLATE}">X</text>
    <text x="${f1(PX(b, 0))}" y="${b.y - 6}" text-anchor="middle" font-size="12.4" fill="${SLATE}">Y</text>
    <text x="${W / 2}" y="${H - 22}" text-anchor="middle" font-size="12.4" fill="${SLATE}">灰の点線の円＝ふつうの距離が P・Q と同じ</text>
    <text x="${W / 2}" y="${H - 5}" text-anchor="middle" font-size="12.4" fill="${SLATE}">藍の楕円＝マハラノビス距離 1・2・3　かっこ内＝その点の値</text>
  </svg>`;
  const cap = `P と Q は同じ円の上にあり、ふつうの距離はどちらも ${f2(eu)} です。しかし P のまわりには点が多く、Q のまわりにはほとんどありません。円ではなく、点の散らばりに沿った楕円で測るのがマハラノビス距離です。`;
  return fig(svg, cap);
}

// ============ 1.9：線形変換（相関0.7の点を U = X + Y、V = X − Y に移す） ============
function linearUV(): string {
  const W = 344, H = 286, rho = 0.7, lim = 4.5;
  const L: Box = { x: 14, y: 44, w: 150, h: 150, xMin: -lim, xMax: lim, yMax: 1 };
  const R: Box = { x: 186, y: 44, w: 150, h: 150, xMin: -lim, xMax: lim, yMax: 1 };
  const yy = (b: Box, v: number) => b.y + b.h / 2 - (v / lim) * (b.h / 2);
  const g = gaussFrom(mulberry32(8));
  const xy = Array.from({ length: 200 }, () => { const z1 = g(), z2 = g(); return [z1, rho * z1 + Math.sqrt(1 - rho * rho) * z2]; });
  const uv = xy.map(([x, y]) => [x + y, x - y]);
  const inside = (p: number[]) => Math.abs(p[0]) < lim && Math.abs(p[1]) < lim;
  const frame = (b: Box) => `<rect x="${b.x}" y="${b.y}" width="${b.w}" height="${b.h}" fill="none" stroke="#e2e8f0" />
    <line x1="${b.x}" y1="${f1(yy(b, 0))}" x2="${b.x + b.w}" y2="${f1(yy(b, 0))}" stroke="#e2e8f0" />
    <line x1="${f1(PX(b, 0))}" y1="${b.y}" x2="${f1(PX(b, 0))}" y2="${b.y + b.h}" stroke="#e2e8f0" />`;
  // 2σ の等高線：左は Σ = [[1, ρ], [ρ, 1]]、右は AΣAᵀ = diag(2 + 2ρ, 2 − 2ρ)
  const ellL = (() => { const o: string[] = []; for (let k = 0; k <= 72; k++) { const t = (2 * Math.PI * k) / 72; const u = 2 * Math.sqrt(1 + rho) * Math.cos(t), v = 2 * Math.sqrt(1 - rho) * Math.sin(t); o.push(`${f1(PX(L, (u - v) / Math.SQRT2))},${f1(yy(L, (u + v) / Math.SQRT2))}`); } return o.join(' '); })();
  const vu = 2 + 2 * rho, vv = 2 - 2 * rho;
  const ellR = (() => { const o: string[] = []; for (let k = 0; k <= 72; k++) { const t = (2 * Math.PI * k) / 72; o.push(`${f1(PX(R, 2 * Math.sqrt(vu) * Math.cos(t)))},${f1(yy(R, 2 * Math.sqrt(vv) * Math.sin(t)))}`); } return o.join(' '); })();
  // 1点を追いかける
  const k = xy.findIndex(([x, y]) => x > 1.1 && x < 1.8 && y > 0.4 && y < 1.2);
  const [px, py] = xy[k], [pu, pv] = uv[k];
  const svg = `${svgOpen(W, H, '相関0.7の点を1つずつ U=X+Y、V=X−Y に移すと、右上がりの楕円が横長の楕円になる。楕円は楕円のままで、U と V の相関は0')}
    <text x="${L.x + L.w / 2}" y="${L.y - 24}" text-anchor="middle" font-size="13.2" font-weight="700" fill="${INK}">(X, Y)：相関 0.7</text>
    <text x="${R.x + R.w / 2}" y="${R.y - 24}" text-anchor="middle" font-size="13.2" font-weight="700" fill="${INK}">(U, V) ＝ (X＋Y, X−Y)</text>
    ${frame(L)}${frame(R)}
    ${xy.filter(inside).map(([x, y]) => `<circle cx="${f1(PX(L, x))}" cy="${f1(yy(L, y))}" r="1.7" fill="${SLATE}" fill-opacity="0.45" />`).join('')}
    ${uv.filter(inside).map(([u, v]) => `<circle cx="${f1(PX(R, u))}" cy="${f1(yy(R, v))}" r="1.7" fill="${SLATE}" fill-opacity="0.45" />`).join('')}
    <polygon points="${ellL}" fill="none" stroke="${INDIGO}" stroke-width="1.6" />
    <polygon points="${ellR}" fill="none" stroke="${INDIGO}" stroke-width="1.6" />
    <circle cx="${f1(PX(L, px))}" cy="${f1(yy(L, py))}" r="4" fill="${ROSE}" />
    <circle cx="${f1(PX(R, pu))}" cy="${f1(yy(R, pv))}" r="4" fill="${ROSE}" />
    <text x="${(L.x + L.w + R.x) / 2}" y="${L.y + L.h / 2 + 5}" text-anchor="middle" font-size="18" fill="${SLATE}">→</text>
    <text x="${L.x + L.w - 2}" y="${f1(yy(L, 0) - 4)}" text-anchor="end" font-size="12.4" fill="${SLATE}">X</text>
    <text x="${f1(PX(L, 0) + 4)}" y="${L.y + 12}" font-size="12.4" fill="${SLATE}">Y</text>
    <text x="${R.x + R.w - 2}" y="${f1(yy(R, 0) - 4)}" text-anchor="end" font-size="12.4" fill="${SLATE}">U</text>
    <text x="${f1(PX(R, 0) + 4)}" y="${R.y + 12}" font-size="12.4" fill="${SLATE}">V</text>
    <text x="${W / 2}" y="${H - 40}" text-anchor="middle" font-size="12.4" fill="${SLATE}">赤い点＝同じ1点（${f1(px)}, ${f1(py)}）→（${f1(pu)}, ${f1(pv)}）</text>
    <text x="${W / 2}" y="${H - 22}" text-anchor="middle" font-size="12.4" fill="${SLATE}">藍の楕円＝2σ の等高線（両方とも同じ目盛り）</text>
    <text x="${W / 2}" y="${H - 5}" text-anchor="middle" font-size="12.4" fill="${SLATE}">右：U の分散 ${f1(vu)}、V の分散 ${f1(vv)}、相関 0</text>
  </svg>`;
  const cap = `左の点を1つずつ U = X + Y、V = X − Y に移すと右になります。楕円は楕円のまま（多変量正規分布のまま）で、楕円の向きに沿った U と V では相関が0になります。`;
  return fig(svg, cap);
}

// ============ 1.9：相関0なら、どこで切っても同じ分布（身長と体重・ρ = 0 と 0.5 を並べる） ============
function independentSlices(): string {
  const W = 344, H = 262;
  const mx = 170, sx = 6, my = 65, sy = 8;
  const panel = (rho: number, x0: number, title: string) => {
    const b = { x: x0, y: 40, w: 150, h: 170, xMin: 154, xMax: 186, yMin: 41, yMax: 89 };
    const X = (x: number) => b.x + ((x - b.xMin) / (b.xMax - b.xMin)) * b.w;
    const Y = (y: number) => b.y + b.h - ((y - b.yMin) / (b.yMax - b.yMin)) * b.h;
    const cm = (x: number) => my + rho * (sy / sx) * (x - mx);
    const cs = sy * Math.sqrt(1 - rho * rho);
    const k = 3.2 / normPdf(0, 0, sy * Math.sqrt(1 - 0.25));
    const slice = (xc: number, col: string) => {
      const m = cm(xc), pts: string[] = [];
      for (let i = 0; i <= 60; i++) { const y = m - 2.5 * cs + (5 * cs * i) / 60; if (y < b.yMin || y > b.yMax) continue; pts.push(`${f1(X(xc + k * normPdf(y, m, cs)))},${f1(Y(y))}`); }
      return `<line x1="${f1(X(xc))}" y1="${b.y}" x2="${f1(X(xc))}" y2="${b.y + b.h}" stroke="${col}" stroke-width="1" stroke-dasharray="3 3" />
        <polyline points="${pts.join(' ')}" fill="none" stroke="${col}" stroke-width="1.9" />
        <circle cx="${f1(X(xc))}" cy="${f1(Y(m))}" r="3" fill="${col}" />`;
    };
    return `<text x="${b.x + b.w / 2}" y="${b.y - 22}" text-anchor="middle" font-size="13.2" font-weight="700" fill="${INK}">${title}</text>
      <rect x="${b.x}" y="${b.y}" width="${b.w}" height="${b.h}" fill="none" stroke="#e2e8f0" />
      <line x1="${f1(X(b.xMin))}" y1="${f1(Y(cm(b.xMin)))}" x2="${f1(X(b.xMax))}" y2="${f1(Y(cm(b.xMax)))}" stroke="${INK}" stroke-width="1.3" />
      ${slice(160, TEAL)}${slice(170, INDIGO)}${slice(180, AMBER)}
      ${[160, 170, 180].map((v) => `<text x="${f1(X(v))}" y="${b.y + b.h + 14}" text-anchor="middle" font-size="12.4" fill="${SLATE}">${v}</text>`).join('')}
      <text x="${b.x + b.w / 2}" y="${b.y - 7}" text-anchor="middle" font-size="12.4" fill="${SLATE}">体重の平均 ${num(cm(160))}・${num(cm(170))}・${num(cm(180))}kg</text>`;
  };
  const svg = `${svgOpen(W, H, '身長160・170・180cmで縦に切った体重の分布。相関0では3つとも同じ、相関0.5では身長が高いほど上にずれる')}
    ${panel(0, 12, '相関 0')}${panel(0.5, 186, '相関 0.5')}
    <text x="${W / 2}" y="${H - 22}" text-anchor="middle" font-size="12.4" fill="${SLATE}">横軸＝身長 cm　縦軸＝体重 41〜89kg</text>
    <text x="${W / 2}" y="${H - 5}" text-anchor="middle" font-size="12.4" fill="${SLATE}">身長160・170・180cmで切った体重の分布</text>
  </svg>`;
  const cap = `相関0では、どの身長で切っても体重の分布は同じ（平均65kg・標準偏差8kg）で、身長を知っても体重の予想は変わりません。これが独立です。`;
  return fig(svg, cap);
}

// ============ 1.9：それぞれは正規分布で無相関なのに、独立でない例（Y = SX） ============
function uncorrelatedDependent(): string {
  const W = 344, H = 280;
  const b: Box = { x: 62, y: 22, w: 220, h: 220, xMin: -3, xMax: 3, yMax: 1 };
  const py = (y: number) => b.y + b.h / 2 - (y / 3) * (b.h / 2);
  const g = gaussFrom(mulberry32(91)), r = mulberry32(19);
  const all = Array.from({ length: 200 }, () => { const x = g(); return [x, (r() < 0.5 ? -1 : 1) * x]; });
  const n = all.length, mx = all.reduce((s, p) => s + p[0], 0) / n, my = all.reduce((s, p) => s + p[1], 0) / n;
  let sxy = 0, sxx = 0, syy = 0;
  all.forEach(([x, y]) => { sxy += (x - mx) * (y - my); sxx += (x - mx) ** 2; syy += (y - my) ** 2; });
  const rr = sxy / Math.sqrt(sxx * syy);
  const pts = all.filter(([x]) => Math.abs(x) < 3);
  const svg = `${svgOpen(W, H, 'X は標準正規分布、Y は X に確率1/2で+1か−1を掛けた値。点は y=x と y=−x の2本の線の上にしかない')}
    <rect x="${b.x}" y="${b.y}" width="${b.w}" height="${b.h}" fill="none" stroke="#e2e8f0" />
    <line x1="${b.x}" y1="${f1(py(0))}" x2="${b.x + b.w}" y2="${f1(py(0))}" stroke="#e2e8f0" />
    <line x1="${f1(PX(b, 0))}" y1="${b.y}" x2="${f1(PX(b, 0))}" y2="${b.y + b.h}" stroke="#e2e8f0" />
    ${pts.map(([x, y]) => `<circle cx="${f1(PX(b, x))}" cy="${f1(py(y))}" r="2.4" fill="${y * x >= 0 ? TEAL : ROSE}" fill-opacity="0.6" />`).join('')}
    <text x="${b.x + b.w + 6}" y="${f1(py(0) + 4)}" font-size="12.4" fill="${SLATE}">X</text>
    <text x="${f1(PX(b, 0))}" y="${b.y - 6}" text-anchor="middle" font-size="12.4" fill="${SLATE}">Y</text>
    <text x="${f1(PX(b, 2.1))}" y="${f1(py(2.7))}" text-anchor="end" font-size="12.4" font-weight="700" fill="${TEAL}">y = x</text>
    <text x="${f1(PX(b, 2.1))}" y="${f1(py(-2.8))}" text-anchor="end" font-size="12.4" font-weight="700" fill="${ROSE}">y = −x</text>
    <text x="${W / 2}" y="${H - 5}" text-anchor="middle" font-size="12.4" fill="${SLATE}">200点・標本相関 ${f2(rr)}</text>
  </svg>`;
  const cap = `X も Y も N(0, 1) で相関もほぼ0なのに、点は2本の線の上にしかなく、X が分かれば Y は2通りに絞られます。`;
  return fig(svg, cap);
}

// ============ 1.9：単調でない変換（Y = X² で左右2つの帯が同じ場所に重なる） ============
function foldSquare(): string {
  const W = 344, H = 240;
  const L: Box = { x: 10, y: 44, w: 150, h: 140, xMin: -3, xMax: 3, yMax: 0.45 };
  const R: Box = { x: 190, y: 44, w: 144, h: 140, xMin: 0, xMax: 4, yMax: 0.85 };
  const fy = (y: number) => Math.exp(-y / 2) / Math.sqrt(2 * Math.PI * y);
  const half = (y: number) => fy(y) / 2;
  // 右の帯：下半分＝橙（−1.5〜−1 から）、上半分＝藍（1〜1.5 から）
  const n = 40, lo = 1, hi = 2.25;
  const xs = Array.from({ length: n + 1 }, (_, i) => lo + ((hi - lo) * i) / n);
  const top = `<polygon points="${[...xs.map((y) => `${f1(PX(R, y))},${f1(PY(R, fy(y)))}`), ...[...xs].reverse().map((y) => `${f1(PX(R, y))},${f1(PY(R, half(y)))}`)].join(' ')}" fill="${INDIGO}" fill-opacity="0.35" />`;
  // 曲線は密度が枠の上端を超えない所から描く（0の近くで無限大に発散する）
  const y0 = 0.2;
  const one = Phi(1.5) - Phi(1);
  const svg = `${svgOpen(W, H, '標準正規分布の X の、1〜1.5 と −1.5〜−1 の2つの帯は、2乗すると同じ 1〜2.25 に移り、積み重なる')}
    <text x="${L.x + L.w / 2}" y="${L.y - 24}" text-anchor="middle" font-size="13.2" font-weight="700" fill="${INK}">X（標準正規分布）</text>
    <text x="${R.x + R.w / 2}" y="${R.y - 24}" text-anchor="middle" font-size="13.2" font-weight="700" fill="${INK}">Y ＝ X²</text>
    ${area(L, (x) => normPdf(x), -1.5, -1, AMBER, 0.45)}${area(L, (x) => normPdf(x), 1, 1.5, INDIGO, 0.35)}
    ${curve(L, (x) => normPdf(x), INK, -3, 3, 1.6)}${axes(L, [-2, -1, 0, 1, 2])}
    ${area(R, half, lo, hi, AMBER, 0.45)}${top}
    ${curve(R, fy, INK, y0, 4, 1.6)}${curve(R, half, SLATE, lo, hi, 1, '3 2')}${axes(R, [0, 1, 2, 3, 4])}
    <text x="${(L.x + L.w + R.x) / 2}" y="${L.y + L.h / 2 + 4}" text-anchor="middle" font-size="18" fill="${SLATE}">→</text>
    <text x="${W / 2}" y="${H - 22}" text-anchor="middle" font-size="12.4" fill="${SLATE}">橙：−1.5〜−1 から　藍：1〜1.5 から</text>
    <text x="${W / 2}" y="${H - 5}" text-anchor="middle" font-size="12.4" fill="${SLATE}">右の曲線＝自由度1のカイ二乗分布</text>
  </svg>`;
  const cap = `左右2つの帯（各 ${pct(one)}）が同じ 1〜2.25 に移り、積み重なって ${pct(2 * one)} になります。`;
  return fig(svg, cap);
}

// ============ 1.9：指数分布2つの和（組み合わせの数 × 1点の密度） ============
function expSum(): string {
  const W = 344, H = 250;
  const L: Box = { x: 46, y: 40, w: 110, h: 110, xMin: 0, xMax: 3, yMax: 3 };
  const R: Box = { x: 186, y: 40, w: 150, h: 120, xMin: 0, xMax: 6, yMax: 1 };
  const LY = (y: number) => L.y + L.h - (y / 3) * L.h;
  // 線分のラベルは縦軸の左（線分の左端の高さ）に置き、隣の線分と重ねない
  const segs = [{ u: 0.5, c: TEAL }, { u: 1.5, c: INDIGO }, { u: 2.5, c: ROSE }];
  const svg = `${svgOpen(W, H, '左：和が u になる (X, Y) の組は線分 x+y=u の上に並び、u が大きいほど線分が長い。右：和の密度 u e^(−u) は u=1 で最大')}
    <text x="${L.x + L.w / 2}" y="${L.y - 22}" text-anchor="middle" font-size="13.2" font-weight="700" fill="${INK}">和が u になる組</text>
    <text x="${R.x + R.w / 2}" y="${R.y - 22}" text-anchor="middle" font-size="13.2" font-weight="700" fill="${INK}">和 U の密度</text>
    <rect x="${L.x}" y="${L.y}" width="${L.w}" height="${L.h}" fill="none" stroke="#e2e8f0" />
    ${segs.map(({ u, c }) => `<line x1="${f1(PX(L, 0))}" y1="${f1(LY(u))}" x2="${f1(PX(L, u))}" y2="${f1(LY(0))}" stroke="${c}" stroke-width="2.4" />
      <text x="${f1(PX(L, 0) - 4)}" y="${f1(LY(u) + 4)}" text-anchor="end" font-size="12.4" font-weight="700" fill="${c}">u=${u}</text>`).join('')}
    ${[0, 1, 2, 3].map((v) => `<text x="${f1(PX(L, v))}" y="${L.y + L.h + 14}" text-anchor="middle" font-size="12.4" fill="${SLATE}">${v}</text>`).join('')}
    <text x="${L.x + L.w + 4}" y="${L.y + L.h + 4}" font-size="12.4" fill="${SLATE}">X</text>
    <text x="${L.x}" y="${L.y - 4}" text-anchor="middle" font-size="12.4" fill="${SLATE}">Y</text>
    ${curve(R, (x) => Math.exp(-x), SLATE, 0, 6, 1.4, '4 3')}
    ${curve(R, (x) => x * Math.exp(-x), INDIGO, 0, 6, 2.2)}
    ${axes(R, [0, 2, 4, 6])}
    <text x="${f1(PX(R, 1.9))}" y="${f1(PY(R, 0.66))}" font-size="12.4" fill="${SLATE}">X 1つ e^(−x)</text>
    <text x="${f1(PX(R, 1.9))}" y="${f1(PY(R, 0.38))}" font-size="12.4" font-weight="700" fill="${INDIGO}">和 u e^(−u)</text>
    <text x="${W / 2}" y="${H - 22}" text-anchor="middle" font-size="12.4" fill="${SLATE}">線分の上では、どの点も密度は e^(−u) で同じ</text>
    <text x="${W / 2}" y="${H - 5}" text-anchor="middle" font-size="12.4" fill="${SLATE}">λ = 1 の場合</text>
  </svg>`;
  const cap = `和が u になる組は線分の上に並び、u が大きいほど線分が長くなります。線分の長さ u と1点の密度 e^(−u) を掛けた u e^(−u) が和の密度です。`;
  return fig(svg, cap);
}

// ============ 1.9：2変数のヤコビアン＝面積の倍率（x = v、y = u − v で小さな正方形を移す） ============
function shearArea(): string {
  const W = 344, H = 250;
  const L: Box = { x: 30, y: 40, w: 130, h: 130, xMin: 0, xMax: 2, yMax: 2 };
  const R: Box = { x: 200, y: 40, w: 130, h: 130, xMin: 0, xMax: 2, yMax: 2 };
  const sq = [[1, 0.3], [1.5, 0.3], [1.5, 0.8], [1, 0.8]];
  const img = sq.map(([u, v]) => [v, u - v]);
  const poly = (b: Box, ps: number[][], c: string) => `<polygon points="${ps.map(([a, c2]) => `${f1(PX(b, a))},${f1(PY(b, c2))}`).join(' ')}" fill="${c}" fill-opacity="0.25" stroke="${c}" stroke-width="1.6" />`;
  const area = (ps: number[][]) => Math.abs(ps.reduce((s, [x1, y1], i) => { const [x2, y2] = ps[(i + 1) % ps.length]; return s + x1 * y2 - x2 * y1; }, 0)) / 2;
  const frame = (b: Box, xl: string, yl: string) => `<rect x="${b.x}" y="${b.y}" width="${b.w}" height="${b.h}" fill="none" stroke="#e2e8f0" />
    ${[0, 1, 2].map((v) => `<text x="${f1(PX(b, v))}" y="${b.y + b.h + 14}" text-anchor="middle" font-size="12.4" fill="${SLATE}">${v}</text>`).join('')}
    ${[1, 2].map((v) => `<text x="${b.x - 5}" y="${f1(PY(b, v) + 4)}" text-anchor="end" font-size="12.4" fill="${SLATE}">${v}</text>`).join('')}
    <text x="${b.x + b.w + 4}" y="${b.y + b.h + 4}" font-size="12.4" fill="${SLATE}">${xl}</text>
    <text x="${b.x}" y="${b.y - 5}" text-anchor="middle" font-size="12.4" fill="${SLATE}">${yl}</text>`;
  const svg = `${svgOpen(W, H, '(u, v) の小さな正方形を x = v、y = u − v で移すと平行四辺形になるが、面積は変わらない')}
    <text x="${L.x + L.w / 2}" y="${L.y - 22}" text-anchor="middle" font-size="13.2" font-weight="700" fill="${INK}">(u, v) の正方形</text>
    <text x="${R.x + R.w / 2}" y="${R.y - 22}" text-anchor="middle" font-size="13.2" font-weight="700" fill="${INK}">(x, y) に移した形</text>
    ${frame(L, 'u', 'v')}${frame(R, 'x', 'y')}
    ${poly(L, sq, INDIGO)}${poly(R, img, INDIGO)}
    <text x="${(L.x + L.w + R.x) / 2 - 4}" y="${L.y + 24}" text-anchor="middle" font-size="18" fill="${SLATE}">→</text>
    <text x="${W / 2}" y="${H - 22}" text-anchor="middle" font-size="12.4" fill="${SLATE}">x = v、y = u − v で移す</text>
    <text x="${W / 2}" y="${H - 5}" text-anchor="middle" font-size="12.4" fill="${SLATE}">面積：${f2(area(sq))} → ${f2(area(img))}（倍率 ${f1(area(img) / area(sq))}）</text>
  </svg>`;
  const cap = `正方形は傾いた平行四辺形に変わりますが、面積は同じです。面積の倍率が1なので、密度を補正する必要がなく、ヤコビアン |J| = 1 です。`;
  return fig(svg, cap);
}

// ============ 1.9：最大値の分布関数 F(x)^n（一様分布） ============
function maxCdf(): string {
  const W = 344, H = 236;
  const b: Box = { x: 40, y: 26, w: 290, h: 160, xMin: 0, xMax: 1, yMax: 1 };
  const set = [{ n: 1, c: SLATE, t: '1個' }, { n: 5, c: INDIGO, t: '5個' }, { n: 20, c: ROSE, t: '20個' }];
  const svg = `${svgOpen(W, H, '0から1の一様分布から n 個とったときの最大値の分布関数 x の n 乗。n が増えると曲線は右下に下がり、最大値は1の近くに寄る')}
    ${[0, 0.5, 1].map((v) => `<text x="${b.x - 6}" y="${f1(PY(b, v) + 4)}" text-anchor="end" font-size="12.4" fill="${SLATE}">${v}</text>
      <line x1="${b.x}" y1="${f1(PY(b, v))}" x2="${b.x + b.w}" y2="${f1(PY(b, v))}" stroke="#eef2f7" />`).join('')}
    <line x1="${f1(PX(b, 0.8))}" y1="${b.y}" x2="${f1(PX(b, 0.8))}" y2="${b.y + b.h}" stroke="${SLATE}" stroke-width="1.1" stroke-dasharray="4 3" />
    ${set.map(({ n, c }) => curve(b, (x) => x ** n, c, 0, 1, 2.2)).join('')}
    ${set.map(({ n, c, t }) => `<circle cx="${f1(PX(b, 0.8))}" cy="${f1(PY(b, 0.8 ** n))}" r="3.6" fill="${c}" />
      <text x="${f1(PX(b, 0.8) - 7)}" y="${f1(PY(b, 0.8 ** n) + (n === 20 ? -2 : -5))}" text-anchor="end" font-size="12.4" font-weight="700" fill="${c}">${t} ${(0.8 ** n).toFixed(n === 20 ? 3 : 2)}</text>`).join('')}
    ${axes(b, [0, 0.2, 0.4, 0.6, 0.8, 1])}
    <text x="${b.x + b.w / 2}" y="${H - 5}" text-anchor="middle" font-size="12.4" fill="${SLATE}">横軸 x／縦軸＝最大値が x 以下になる確率 x^n</text>
  </svg>`;
  const cap = `最大値が0.8以下になる確率は、1個 ${f2(0.8)}、5個 ${f2(0.8 ** 5)}、20個 ${(0.8 ** 20).toFixed(3)}。個数が増えるほど最大値は1に寄ります。`;
  return fig(svg, cap);
}

// ============ 1.9：100年に1度の水位（年最大水位がガンベル分布 μ = 3m、σ = 0.5m のとき） ============
function returnLevel(): string {
  const W = 344, H = 240, mu = 3, sg = 0.5;
  const b: Box = { x: 14, y: 30, w: 316, h: 150, xMin: 1.8, xMax: 6.6, yMax: 0.8 };
  const fz = (x: number) => { const z = (x - mu) / sg; return Math.exp(-(z + Math.exp(-z))) / sg; };
  const lev = (T: number) => mu - sg * Math.log(-Math.log(1 - 1 / T));
  const x10 = lev(10), x100 = lev(100);
  const svg = `${svgOpen(W, H, '年最大水位の分布（ガンベル分布）。上側1%の境目が100年に1度の水位、10%の境目が10年に1度の水位')}
    ${area(b, fz, x10, 6.6, AMBER, 0.25)}${area(b, fz, x100, 6.6, ROSE, 0.45)}
    ${curve(b, fz, INDIGO, 1.8, 6.6, 2.2)}
    ${[{ x: x10, c: '#b45309', t: '10年に1度' }, { x: x100, c: ROSE, t: '100年に1度' }].map(({ x, c, t }, i) => `<line x1="${f1(PX(b, x))}" y1="${b.y + 6 + i * 26}" x2="${f1(PX(b, x))}" y2="${b.y + b.h}" stroke="${c}" stroke-width="1.3" stroke-dasharray="4 3" />
      <text x="${f1(PX(b, x) + (i ? -4 : 4))}" y="${b.y + 14 + i * 26}" text-anchor="${i ? 'end' : 'start'}" font-size="12.4" font-weight="700" fill="${c}">${t} ${f1(x)}m</text>`).join('')}
    ${axes(b, [2, 3, 4, 5, 6])}
    <text x="${b.x + b.w / 2}" y="${H - 22}" text-anchor="middle" font-size="12.4" fill="${SLATE}">横軸＝その年の最大水位（m）</text>
    <text x="${b.x + b.w / 2}" y="${H - 5}" text-anchor="middle" font-size="12.4" fill="${SLATE}">ガンベル分布（位置 3m・尺度 0.5m）の例</text>
  </svg>`;
  const cap = `塗った部分は、その年の最大水位が境目を超える確率で、橙が10%、赤が1%です。毎年1%の確率で超える水位 ${f1(x100)}m を「100年に1度の水位」と呼びます。`;
  return fig(svg, cap);
}

// ============ 1.9：極値分布の3つの型（一般極値分布 ξ = −0.5, 0, 0.5） ============
function gevTypes(): string {
  const W = 344, H = 252;
  const b: Box = { x: 14, y: 50, w: 316, h: 150, xMin: -3, xMax: 6, yMax: 0.5 };
  const gev = (xi: number) => (x: number) => {
    if (xi === 0) { const t = Math.exp(-x); return t * Math.exp(-t); }
    const z = 1 + xi * x;
    if (z <= 0) return 0;
    const t = z ** (-1 / xi);
    return t ** (xi + 1) * Math.exp(-t);
  };
  const sf = (xi: number, x: number) => {
    if (xi === 0) return 1 - Math.exp(-Math.exp(-x));
    const z = 1 + xi * x;
    if (z <= 0) return xi < 0 ? 0 : 1;
    return 1 - Math.exp(-(z ** (-1 / xi)));
  };
  const svg = `${svgOpen(W, H, '極値分布の3つの型。ガンベル型は右の裾が指数的に減り、フレシェ型は右の裾が長く、ワイブル型は上限で止まる')}
    ${area(b, gev(0.5), 4, 6, AMBER, 0.3)}${area(b, gev(0), 4, 6, INDIGO, 0.3)}
    <line x1="${f1(PX(b, 2))}" y1="${b.y}" x2="${f1(PX(b, 2))}" y2="${b.y + b.h}" stroke="${TEAL}" stroke-width="1.2" stroke-dasharray="3 3" />
    ${curve(b, gev(-0.5), TEAL, -3, 2, 2.2)}
    ${curve(b, gev(0), INDIGO, -3, 6, 2.2)}
    ${curve(b, gev(0.5), AMBER, -1.95, 6, 2.2)}
    ${axes(b, [-2, 0, 2, 4, 6])}
    <text x="2" y="16" font-size="12.4" font-weight="700" fill="${INDIGO}">ガンベル型 ξ=0</text>
    <text x="${W / 2 - 6}" y="16" text-anchor="middle" font-size="12.4" font-weight="700" fill="#b45309">フレシェ型 ξ=0.5</text>
    <text x="${W - 2}" y="16" text-anchor="end" font-size="12.4" font-weight="700" fill="${TEAL}">ワイブル型 ξ=−0.5</text>
    <text x="${f1(PX(b, 2) + 4)}" y="${b.y + 12}" font-size="12.4" fill="${TEAL}">上限 2</text>
    <text x="${f1(PX(b, 4.1))}" y="${f1(PY(b, 0.1))}" font-size="12.4" fill="#b45309">長い裾</text>
    <text x="${b.x + b.w / 2}" y="${H - 5}" text-anchor="middle" font-size="12.4" fill="${SLATE}">塗り＝4を超える部分（右の裾）</text>
  </svg>`;
  const p = (xi: number) => pct(sf(xi, 4));
  const cap = `4を超える確率は、フレシェ型 ${p(0.5)}、ガンベル型 ${p(0)}、ワイブル型 0 です。裾の長い分布の最大値ほど、とびぬけた値が出ます。`;
  return fig(svg, cap);
}

// ============ 1.9：周辺分布（相関0.7の点を横軸・縦軸に落とすと、どちらも標準正規分布） ============
function marginalNormal(): string {
  const W = 344, H = 262, rho = 0.7;
  const b: Box = { x: 92, y: 14, w: 180, h: 180, xMin: -3, xMax: 3, yMax: 1 };
  const py = (y: number) => b.y + b.h / 2 - (y / 3) * (b.h / 2);
  const g = gaussFrom(mulberry32(8));
  const pts = Array.from({ length: 200 }, () => { const z1 = g(), z2 = g(); return [z1, rho * z1 + Math.sqrt(1 - rho * rho) * z2]; })
    .filter(([x, y]) => Math.abs(x) < 3 && Math.abs(y) < 3);
  const k = 40 / normPdf(0);
  const bottom: string[] = [], left: string[] = [];
  for (let i = 0; i <= 80; i++) {
    const v = -3 + (6 * i) / 80;
    bottom.push(`${f1(PX(b, v))},${f1(b.y + b.h + 44 - k * normPdf(v))}`);
    left.push(`${f1(b.x - 4 - k * normPdf(v))},${f1(py(v))}`);
  }
  const svg = `${svgOpen(W, H, '相関0.7の2変量正規分布の点と、横軸と縦軸に落とした周辺分布。どちらも標準正規分布の形')}
    <rect x="${b.x}" y="${b.y}" width="${b.w}" height="${b.h}" fill="none" stroke="#e2e8f0" />
    ${pts.map(([x, y]) => `<circle cx="${f1(PX(b, x))}" cy="${f1(py(y))}" r="1.8" fill="${SLATE}" fill-opacity="0.5" />`).join('')}
    <polyline points="${bottom.join(' ')}" fill="none" stroke="${INDIGO}" stroke-width="2.2" />
    <polyline points="${left.join(' ')}" fill="none" stroke="${TEAL}" stroke-width="2.2" />
    <line x1="${b.x}" y1="${b.y + b.h + 44}" x2="${b.x + b.w}" y2="${b.y + b.h + 44}" stroke="${SLATE}" />
    <line x1="${b.x - 4}" y1="${b.y}" x2="${b.x - 4}" y2="${b.y + b.h}" stroke="${SLATE}" />
    <text x="${b.x + b.w + 6}" y="${b.y + b.h + 40}" font-size="12.4" font-weight="700" fill="${INDIGO}">X だけ</text>
    <text x="${b.x - 50}" y="${b.y + 10}" text-anchor="middle" font-size="12.4" font-weight="700" fill="${TEAL}">Y だけ</text>
    <text x="${b.x + b.w + 6}" y="${b.y + 14}" font-size="12.4" fill="${SLATE}">相関</text>
    <text x="${b.x + b.w + 6}" y="${b.y + 30}" font-size="12.4" fill="${SLATE}">0.7</text>
    <text x="${W / 2}" y="${H - 4}" text-anchor="middle" font-size="12.4" fill="${SLATE}">藍・緑の曲線＝N(0, 1) の密度</text>
  </svg>`;
  const cap = `相関0.7の点を横軸に落としても縦軸に落としても、標準正規分布の形になります。相関は、2つの値の組み合わせ方にだけ表れます。`;
  return fig(svg, cap);
}

// ============ 1.9：最小値（部品1個と10個のうち最初の故障） ============
function minParts(): string {
  const W = 344, H = 236;
  const b: Box = { x: 40, y: 26, w: 290, h: 160, xMin: 0, xMax: 1500, yMax: 1 };
  const one = (t: number) => Math.exp(-t / 1000), ten = (t: number) => Math.exp(-t / 100);
  const svg = `${svgOpen(W, H, '平均寿命1000時間の部品1個が動き続ける確率と、10個が全部動き続ける確率。10個のほうがずっと早く下がる')}
    ${[0, 0.5, 1].map((v) => `<text x="${b.x - 6}" y="${f1(PY(b, v) + 4)}" text-anchor="end" font-size="12.4" fill="${SLATE}">${v}</text>
      <line x1="${b.x}" y1="${f1(PY(b, v))}" x2="${b.x + b.w}" y2="${f1(PY(b, v))}" stroke="#eef2f7" />`).join('')}
    ${curve(b, one, INDIGO, 0, 1500, 2.2)}${curve(b, ten, ROSE, 0, 1500, 2.2)}
    ${[{ t: 100, c: ROSE }, { t: 1000, c: INDIGO }].map(({ t, c }) => `<line x1="${f1(PX(b, t))}" y1="${b.y}" x2="${f1(PX(b, t))}" y2="${b.y + b.h}" stroke="${c}" stroke-width="1.1" stroke-dasharray="4 3" />`).join('')}
    ${axes(b, [0, 500, 1000, 1500])}
    <text x="${f1(PX(b, 560))}" y="${f1(PY(b, 0.72))}" font-size="12.4" font-weight="700" fill="${INDIGO}">1個（平均1000時間）</text>
    <text x="${f1(PX(b, 240))}" y="${f1(PY(b, 0.3))}" font-size="12.4" font-weight="700" fill="${ROSE}">10個とも（平均100時間）</text>
    <text x="${b.x + b.w / 2}" y="${H - 5}" text-anchor="middle" font-size="12.4" fill="${SLATE}">横軸 時間／縦軸＝まだ1個も壊れていない確率</text>
  </svg>`;
  const cap = `1個なら1000時間後も ${pct(one(1000))} が動いていますが、10個が全部動き続ける確率は300時間で ${pct(ten(300))} まで下がります。最初の故障は、平均100時間でやって来ます。`;
  return fig(svg, cap);
}

// ============ 1.11：大数の法則（サイコロの累積平均） ============
function lln(): string {
  const W = 350, H = 270;
  const b: Box = { x: 34, y: 30, w: 300, h: 194, xMin: 0, xMax: 3, yMax: 1 };
  // 縦軸は平均がとりうる全範囲 1〜6（切ると最初の数回が軸に張り付き、同じ目が続いたように見える）
  const yMin = 1, yMax = 6;
  const py = (y: number) => b.y + b.h - ((Math.max(yMin, Math.min(yMax, y)) - yMin) / (yMax - yMin)) * b.h;
  const runs = [1101, 2202, 3303].map((seed) => {
    const r = mulberry32(seed);
    let s = 0;
    return Array.from({ length: 1000 }, (_, i) => { s += 1 + Math.floor(r() * 6); return s / (i + 1); });
  });
  const cols = [INDIGO, AMBER, TEAL];
  const lines = runs.map((m, j) => `<polyline points="${m.map((v, i) => `${f1(PX(b, Math.log10(i + 1)))},${f1(py(v))}`).join(' ')}" fill="none" stroke="${cols[j]}" stroke-width="1.6" />`).join('');
  // 灰の帯＝3.5 ± 2σ/√n（σ ≈ 1.708）。平均のほとんどがこの内側に入る
  const sd = Math.sqrt(35 / 12);
  const ns = Array.from({ length: 61 }, (_, i) => 10 ** (i / 20));
  const band = `<polygon points="${[...ns.map((n) => `${f1(PX(b, Math.log10(n)))},${f1(py(3.5 + 2 * sd / Math.sqrt(n)))}`), ...ns.reverse().map((n) => `${f1(PX(b, Math.log10(n)))},${f1(py(3.5 - 2 * sd / Math.sqrt(n)))}`)].join(' ')}" fill="${SLATE}" fill-opacity="0.16" />`;
  const svg = `${svgOpen(W, H, 'サイコロを振る回数を増やすと、3人それぞれの平均が3.5に近づいていく。灰色の帯（平均のほとんどが入る範囲）は回数とともに細くなる')}
    ${band}
    ${[1, 2, 3, 4, 5, 6].map((v) => `<text x="${b.x - 6}" y="${f1(py(v) + 4)}" text-anchor="end" font-size="12.4" fill="${SLATE}">${v}</text>`).join('')}
    <line x1="${b.x}" y1="${f1(py(3.5))}" x2="${b.x + b.w}" y2="${f1(py(3.5))}" stroke="${ROSE}" stroke-width="1.2" stroke-dasharray="4 3" />
    <text x="${b.x + b.w}" y="${b.y - 8}" text-anchor="end" font-size="12.4" fill="${ROSE}">赤の点線＝期待値 3.5</text>
    ${lines}
    <line x1="${b.x}" y1="${b.y + b.h}" x2="${b.x + b.w}" y2="${b.y + b.h}" stroke="${SLATE}" />
    ${[[0, '1'], [1, '10'], [2, '100'], [3, '1000']].map(([v, t]) => `<text x="${f1(PX(b, v as number))}" y="${b.y + b.h + 14}" text-anchor="middle" font-size="12.4" fill="${SLATE}">${t}</text>`).join('')}
    <text x="${b.x + b.w / 2}" y="${H - 6}" text-anchor="middle" font-size="12.4" fill="${SLATE}">横軸＝振った回数（10倍ごと）／縦軸＝目の平均</text>
  </svg>`;
  const at = (k: number) => runs.map((m) => m[k - 1].toFixed(2)).join('・');
  const rg = (n: number) => `${(3.5 - 2 * sd / Math.sqrt(n)).toFixed(2)}〜${(3.5 + 2 * sd / Math.sqrt(n)).toFixed(2)}`;
  const first = (j: number, k: number) => {
    const r = mulberry32([1101, 2202, 3303][j]);
    return Array.from({ length: k }, () => 1 + Math.floor(r() * 6)).join('・');
  };
  const cap = `線は3人それぞれの平均の推移（乱数で振ったシミュレーション）。緑の人は最初の6回が ${first(2, 6)} と偏って平均が2を下回り、10回目でも3人は ${at(10)} とばらばらですが、1000回目は ${at(1000)} です。灰色の帯は平均の約95%が入る範囲で、100回で ${rg(100)}、1000回で ${rg(1000)} です。`;
  return fig(svg, cap);
}

// ============ 1.11：指数分布から n 個とった平均の分布（幅が縮む＝大数の法則／形が釣鐘になる＝中心極限定理） ============
function meanNarrow(): string {
  const W = 344, H = 250;
  const b: Box = { x: 14, y: 30, w: 316, h: 170, xMin: 0, xMax: 3, yMax: 3.6 };
  // n 個の平均 = Gamma(n,1)/n。密度は n·g_n(n x)
  const dens = (n: number) => (x: number) => (x <= 0 ? (n === 1 ? 1 : 0) : n * gammaPdf(n)(n * x));
  const set = [{ n: 1, c: SLATE, lx: 0.3, t: 'n = 1（元の分布）' }, { n: 4, c: TEAL, lx: 0.75, t: 'n = 4' }, { n: 16, c: AMBER, lx: 0.94, t: 'n = 16' }, { n: 64, c: INDIGO, lx: 0.985, t: 'n = 64' }];
  const lab = (c: string) => (c === AMBER ? '#b45309' : c);
  const svg = `${svgOpen(W, H, '指数分布から n 個とった平均の分布。n が増えると山の幅が縮んで期待値の1に集まり、形は右に歪んだ形から左右対称の釣鐘形に変わる')}
    <line x1="${f1(PX(b, 1))}" y1="${b.y - 6}" x2="${f1(PX(b, 1))}" y2="${b.y + b.h}" stroke="${ROSE}" stroke-width="1.2" stroke-dasharray="4 3" />
    <text x="${f1(PX(b, 1) + 4)}" y="${b.y + 4}" font-size="12.4" fill="${ROSE}">期待値 1</text>
    ${set.map(({ n, c }) => curve(b, dens(n), c, 0.001, 3, n === 64 ? 2.2 : 1.8)).join('')}
    <text x="${f1(PX(b, 1.7))}" y="${f1(PY(b, 0.45))}" font-size="12.4" font-weight="700" fill="${SLATE}">${set[0].t}</text>
    <text x="${f1(PX(b, 0.55))}" y="${f1(PY(b, 1.05))}" text-anchor="end" font-size="12.4" font-weight="700" fill="${TEAL}">${set[1].t}</text>
    <text x="${f1(PX(b, 1.26))}" y="${f1(PY(b, dens(16)(0.94)) + 4)}" font-size="12.4" font-weight="700" fill="${lab(AMBER)}">${set[2].t}</text>
    <text x="${f1(PX(b, 1.13))}" y="${f1(PY(b, dens(64)(0.985)) + 8)}" font-size="12.4" font-weight="700" fill="${INDIGO}">${set[3].t}</text>
    ${axes(b, [0, 0.5, 1, 1.5, 2, 2.5, 3])}
    <text x="${W / 2}" y="${H - 4}" text-anchor="middle" font-size="12.4" fill="${SLATE}">横軸＝n 個の平均の値</text>
  </svg>`;
  const cap = `灰色が元の指数分布。n を増やすと山は期待値1のまわりに細く集まり、形は左右対称に近づきます。標準偏差は 1/√n で、n = 64 では 0.125 です。`;
  return fig(svg, cap);
}

// 1.12：t・χ²・F が標準正規分布 Z からどう組み立てられるか
function distFamily(): string {
  const W = 344, H = 300;
  const mk = 'df-arrow';
  const box = (cx: number, cy: number, w: number, c: string, title: string, sub: string) =>
    `<rect x="${f1(cx - w / 2)}" y="${f1(cy - 24)}" width="${w}" height="48" rx="8" fill="#fff" stroke="${c}" stroke-width="2" />
    <text x="${cx}" y="${cy - 4}" text-anchor="middle" font-size="14" font-weight="700" fill="${c}">${title}</text>
    <text x="${cx}" y="${cy + 14}" text-anchor="middle" font-size="12.1" fill="${SLATE}">${sub}</text>`;
  const arrow = (x1: number, y1: number, x2: number, y2: number) =>
    `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${INK}" stroke-width="1.6" marker-end="url(#${mk})" />`;
  const svg = `${svgOpen(W, H, '3つの分布の組み立て。標準正規分布 Z を2乗して k 個足すとカイ二乗分布、Z をカイ二乗分布を自由度で割った値の平方根で割ると t 分布、自由度で割った2つのカイ二乗分布の比が F 分布。t 分布を2乗すると分子の自由度1の F 分布')}
    <defs><marker id="${mk}" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="${INK}" /></marker></defs>
    ${box(172, 32, 190, INK, '標準正規分布 Z', 'N(0, 1)')}
    ${arrow(172, 57, 172, 100)}
    <text x="180" y="83" font-size="12.1" fill="${INK}">2乗して k 個足す</text>
    ${box(172, 126, 190, TEAL, 'カイ二乗分布 χ²(k)', '例：(n−1)s² / σ²')}
    ${arrow(120, 151, 92, 210)}
    ${arrow(224, 151, 252, 210)}
    <path d="M77,40 C14,60 14,170 66,210" fill="none" stroke="${INK}" stroke-width="1.6" marker-end="url(#${mk})" />
    <text x="34" y="120" font-size="12.1" fill="${INK}">Z を</text>
    <text x="34" y="136" font-size="12.1" fill="${INK}">分子に</text>
    <text x="104" y="172" text-anchor="end" font-size="12.1" fill="${INK}">÷ √(χ²/k)</text>
    <text x="242" y="172" font-size="12.1" fill="${INK}">χ²/k の比</text>
    ${box(86, 236, 150, INDIGO, 't 分布 t(k)', '例：平均を s で標準化')}
    ${box(258, 236, 150, AMBER, 'F 分布 F(k₁, k₂)', '例：2つの s² の比')}
    <path d="M86,262 V276 H258 V262" fill="none" stroke="${ROSE}" stroke-width="1.6" stroke-dasharray="4 3" />
    <text x="172" y="295" text-anchor="middle" font-size="12.1" fill="${ROSE}">t(k)² = F(1, k)</text>
  </svg>`;
  const cap = `3つとも Z から作れます。t と F で割る2つの量は、互いに独立であることが条件です。`;
  return fig(svg, cap);
}

// 1.12：非心 t 分布。真の平均が仮定の値からずれると、T の山が右へずれる
function noncentralT(): string {
  const W = 344, H = 250;
  const k = 9, cut = 2.262;
  const b: Box = { x: 14, y: 30, w: 316, h: 170, xMin: -4, xMax: 8, yMax: 0.42 };
  const chi = (v: number) => (v <= 0 ? 0 : Math.exp((k / 2 - 1) * Math.log(v) - v / 2 - (k / 2) * Math.log(2) - lgamma(k / 2)));
  const phi = (x: number) => Math.exp(-x * x / 2) / Math.sqrt(2 * Math.PI);
  const simpson = (fn: (x: number) => number, a: number, z: number, m: number) => {
    const h = (z - a) / m; let s = fn(a) + fn(z);
    for (let i = 1; i < m; i++) s += fn(a + i * h) * (i % 2 ? 4 : 2);
    return (s * h) / 3;
  };
  // T = (Z + δ) / √(V/k)、V ~ χ²(k)。V で積分して密度を出す
  const dens = (d: number) => (t: number) => simpson((v) => { const s = Math.sqrt(v / k); return phi(t * s - d) * s * chi(v); }, 1e-6, 60, 300);
  const over = (d: number) => simpson(dens(d), cut, 14, 120);
  const set = [{ d: 0, c: SLATE, lx: -1.9, t: 'δ = 0' }, { d: 2, c: TEAL, lx: 0.2, t: 'δ = 2' }, { d: 3, c: INDIGO, lx: 4.6, t: 'δ = 3' }];
  const svg = `${svgOpen(W, H, '自由度9の t 分布と非心度2・3の非心 t 分布。非心度が大きいほど山が右へずれ、2.262 より右の面積が増える')}
    ${area(b, dens(3), cut, 8, INDIGO, 0.16)}
    <line x1="${f1(PX(b, cut))}" y1="${b.y - 6}" x2="${f1(PX(b, cut))}" y2="${b.y + b.h}" stroke="${ROSE}" stroke-width="1.2" stroke-dasharray="4 3" />
    <text x="${f1(PX(b, cut) + 4)}" y="${b.y + 4}" font-size="12.4" fill="${ROSE}">2.262</text>
    ${set.map(({ d, c }) => curve(b, dens(d), c, -4, 8, 2)).join('')}
    <text x="${f1(PX(b, -1.6))}" y="${f1(PY(b, 0.36))}" text-anchor="end" font-size="12.4" font-weight="700" fill="${SLATE}">${set[0].t}</text>
    <text x="${f1(PX(b, 1.0))}" y="${f1(PY(b, 0.40))}" text-anchor="end" font-size="12.4" font-weight="700" fill="${TEAL}">${set[1].t}</text>
    <text x="${f1(PX(b, 4.4))}" y="${f1(PY(b, 0.28))}" font-size="12.4" font-weight="700" fill="${INDIGO}">${set[2].t}</text>
    ${axes(b, [-4, -2, 0, 2, 4, 6, 8])}
    <text x="${W / 2}" y="${H - 4}" text-anchor="middle" font-size="12.4" fill="${SLATE}">横軸＝T の値（自由度9）</text>
  </svg>`;
  const cap = `δ = 0 が普通の t 分布です。2.262 を超える確率は、δ = 0 で ${pct(over(0), 1)}、δ = 2 で ${pct(over(2), 0)}、δ = 3 で ${pct(over(3), 0)} です。`;
  return fig(svg, cap);
}

// ============ 1.12：数値例の確率を面積で示す（ボルト＝χ²(9)・新薬＝t(9) と N(0,1)・クラス＝F(10,15)） ============
const simpsonInt = (f: (x: number) => number, a: number, b: number, m = 400) => {
  const h = (b - a) / m;
  let s = f(a) + f(b);
  for (let i = 1; i < m; i++) s += f(a + i * h) * (i % 2 ? 4 : 2);
  return (s * h) / 3;
};
const chi2Pdf = (k: number) => (x: number) => (x <= 0 ? 0 : Math.exp((k / 2 - 1) * Math.log(x) - x / 2 - (k / 2) * Math.log(2) - lgamma(k / 2)));
const tPdf = (k: number) => (x: number) => Math.exp(lgamma((k + 1) / 2) - lgamma(k / 2) - 0.5 * Math.log(k * Math.PI) - ((k + 1) / 2) * Math.log(1 + (x * x) / k));
const fPdf = (a: number, c: number) => (x: number) => (x <= 0 ? 0 : Math.exp(lgamma((a + c) / 2) - lgamma(a / 2) - lgamma(c / 2) + (a / 2) * Math.log(a / c) + (a / 2 - 1) * Math.log(x) - ((a + c) / 2) * Math.log(1 + (a * x) / c)));

function chi2Tail(): string {
  const W = 344, H = 226, k = 9, obs = (9 * 0.07 ** 2) / 0.05 ** 2;
  const b: Box = { x: 14, y: 30, w: 316, h: 150, xMin: 0, xMax: 30, yMax: 0.115 };
  const f = chi2Pdf(k);
  const p = simpsonInt(f, obs, 80);
  const svg = `${svgOpen(W, H, '自由度9のカイ二乗分布。観測値17.64より右の面積が約4%')}
    ${area(b, f, obs, 30, ROSE, 0.4)}${curve(b, f, INDIGO, 0.01, 30, 2.2)}
    <line x1="${f1(PX(b, obs))}" y1="${b.y + 10}" x2="${f1(PX(b, obs))}" y2="${b.y + b.h}" stroke="${ROSE}" stroke-width="1.4" stroke-dasharray="4 3" />
    <text x="${f1(PX(b, obs) + 4)}" y="${b.y + 20}" font-size="12.4" font-weight="700" fill="${ROSE}">観測値 ${obs.toFixed(2)}</text>
    <text x="${f1(PX(b, 21))}" y="${f1(PY(b, 0.03))}" font-size="12.4" font-weight="700" fill="${ROSE}">右の面積 ${pct(p)}</text>
    ${axes(b, [0, 5, 10, 15, 20, 25, 30])}
    <text x="${b.x + b.w / 2}" y="${H - 4}" text-anchor="middle" font-size="12.4" fill="${SLATE}">χ²(9)：σ が 0.05 のままのときの (n−1)s²/σ² の分布</text>
  </svg>`;
  const cap = `σ = 0.05 のままなら、10本の (n−1)s²/σ² はこの山のどこかに出ます。赤く塗った部分が、観測値 17.64 より右に出る確率です。`;
  return fig(svg, cap);
}

function tTail(): string {
  const W = 344, H = 236, k = 9, obs = 5 / (6 / Math.sqrt(10));
  // 全体を描くと2つの曲線が重なって差が見えないので、右の裾（1.5〜4.5）だけを拡大する
  const b: Box = { x: 14, y: 30, w: 316, h: 150, xMin: 1.5, xMax: 4.5, yMax: 0.14 };
  const ft = tPdf(k), fz = (x: number) => normPdf(x);
  const pt = 2 * simpsonInt(ft, obs, 40), pz = 2 * (1 - Phi(obs));
  const svg = `${svgOpen(W, H, '自由度9のt分布と標準正規分布の右の裾を拡大。2.64より右の面積は t の方が大きい')}
    ${area(b, ft, obs, 4.5, ROSE, 0.3)}${area(b, fz, obs, 4.5, SLATE, 0.45)}
    ${curve(b, fz, SLATE, 1.5, 4.5, 1.8, '4 3')}${curve(b, ft, INDIGO, 1.5, 4.5, 2.2)}
    <line x1="${f1(PX(b, obs))}" y1="${b.y + 30}" x2="${f1(PX(b, obs))}" y2="${b.y + b.h}" stroke="${ROSE}" stroke-width="1.3" stroke-dasharray="4 3" />
    <text x="${f1(PX(b, obs) + 4)}" y="${b.y + 40}" font-size="12.4" font-weight="700" fill="${ROSE}">T = ${obs.toFixed(2)}</text>
    <text x="2" y="14" font-size="12.4" font-weight="700" fill="${INDIGO}">t(9)：両側 ${pct(pt)}</text>
    <text x="${W - 2}" y="14" text-anchor="end" font-size="12.4" font-weight="700" fill="${SLATE}">N(0, 1)（点線・灰）：両側 ${pct(pz)}</text>
    ${axes(b, [1.5, 2, 2.5, 3, 3.5, 4, 4.5])}
    <text x="${b.x + b.w / 2}" y="${H - 22}" text-anchor="middle" font-size="12.4" fill="${SLATE}">右の裾だけを拡大（左の裾も同じ形）</text>
    <text x="${b.x + b.w / 2}" y="${H - 5}" text-anchor="middle" font-size="12.4" fill="${SLATE}">薬の効果が無いときの T の分布</text>
  </svg>`;
  const cap = `裾を拡大すると、t(9)（藍）は正規分布（灰の点線）より高く、2.64 より右の面積（赤）も正規分布の面積（灰）より大きいことが分かります。`;
  return fig(svg, cap);
}

function fTail(): string {
  const W = 344, H = 226, a = 10, c = 15, obs = 2.0;
  const b: Box = { x: 14, y: 30, w: 316, h: 150, xMin: 0, xMax: 4, yMax: 0.85 };
  const f = fPdf(a, c);
  const p = simpsonInt(f, obs, 60, 2000);
  const svg = `${svgOpen(W, H, 'F(10,15) 分布。2.0より右の面積は約11%')}
    ${area(b, f, obs, 4, ROSE, 0.4)}${curve(b, f, INDIGO, 0.01, 4, 2.2)}
    <line x1="${f1(PX(b, 1))}" y1="${b.y}" x2="${f1(PX(b, 1))}" y2="${b.y + b.h}" stroke="${SLATE}" stroke-width="1" stroke-dasharray="2 3" />
    <line x1="${f1(PX(b, obs))}" y1="${b.y + 10}" x2="${f1(PX(b, obs))}" y2="${b.y + b.h}" stroke="${ROSE}" stroke-width="1.4" stroke-dasharray="4 3" />
    <text x="${f1(PX(b, obs) + 4)}" y="${b.y + 20}" font-size="12.4" font-weight="700" fill="${ROSE}">観測した比 2.0</text>
    <text x="${f1(PX(b, 2.55))}" y="${f1(PY(b, 0.16))}" font-size="12.4" font-weight="700" fill="${ROSE}">右の面積 ${pct(p)}</text>
    ${axes(b, [0, 1, 2, 3, 4])}
    <text x="${b.x + b.w / 2}" y="${H - 4}" text-anchor="middle" font-size="12.4" fill="${SLATE}">F(10, 15)：母分散が等しいときの s₁²/s₂² の分布</text>
  </svg>`;
  const cap = `母分散が等しくても、標本分散の比は1（点線）のまわりで大きくばらつきます。赤く塗った部分が、比が2.0以上になる確率です。`;
  return fig(svg, cap);
}

// 1.12：t(9) の左右の裾（|T| > 2.262）を2乗すると、F(1, 9) の右の裾（T² > 5.12）に重なる
function tFold(): string {
  const W = 344, H = 360, k = 9, c = 2.262, c2 = c * c;
  const ft = tPdf(k), ff = fPdf(1, k);
  const pT = 2 * simpsonInt(ft, c, 60, 2000);
  const pF = simpsonInt(ff, c2, 400, 8000);
  let x0 = 0.01;
  while (ff(x0) > 0.41) x0 += 0.005; // 0 の近くは無限に高くなるので、枠の上端から描き始める（上端に張り付いた平らな線にしない）
  const b1: Box = { x: 14, y: 30, w: 316, h: 106, xMin: -4, xMax: 4, yMax: 0.42 };
  const b2: Box = { x: 14, y: 226, w: 316, h: 106, xMin: 0, xMax: 10, yMax: 0.42 };
  const vline = (b: Box, x: number, txt: string, anchor: string) =>
    `<line x1="${f1(PX(b, x))}" y1="${b.y + 18}" x2="${f1(PX(b, x))}" y2="${b.y + b.h}" stroke="${ROSE}" stroke-width="1.3" stroke-dasharray="4 3" />
    <text x="${f1(PX(b, x) + (anchor === 'end' ? -4 : 4))}" y="${b.y + 28}" text-anchor="${anchor}" font-size="12.4" font-weight="700" fill="${ROSE}">${txt}</text>`;
  const svg = `${svgOpen(W, H, '上は自由度9のt分布で、2.262より外側の左右の裾が合わせて5%。2乗すると左右が重なり、下のF(1,9)分布の5.12より右の裾5%になる')}
    <defs><marker id="tf-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="${INK}" /></marker></defs>
    <text x="2" y="14" font-size="12.4" font-weight="700" fill="${INDIGO}">t(9)：左右の裾を合わせて ${pct(pT)}</text>
    ${area(b1, ft, -4, -c, ROSE, 0.7)}${area(b1, ft, c, 4, ROSE, 0.7)}${curve(b1, ft, INDIGO, -4, 4, 2.2)}
    ${vline(b1, -c, '−2.262', 'end')}${vline(b1, c, '2.262', 'start')}
    <text x="${f1(PX(b1, -3.3))}" y="${f1(PY(b1, 0.07))}" text-anchor="middle" font-size="12.4" font-weight="700" fill="${ROSE}">${pct(pT / 2)}</text>
    <text x="${f1(PX(b1, 3.3))}" y="${f1(PY(b1, 0.07))}" text-anchor="middle" font-size="12.4" font-weight="700" fill="${ROSE}">${pct(pT / 2)}</text>
    ${axes(b1, [-4, -2, 0, 2, 4])}
    <line x1="${W / 2}" y1="164" x2="${W / 2}" y2="194" stroke="${INK}" stroke-width="1.6" marker-end="url(#tf-arrow)" />
    <text x="${W / 2 + 10}" y="176" font-size="12.4" fill="${INK}">2乗する</text>
    <text x="${W / 2 + 10}" y="192" font-size="12.4" fill="${SLATE}">−3 も 3 も 9 になる</text>
    <text x="2" y="210" font-size="12.4" font-weight="700" fill="${AMBER}">F(1, 9)：右の裾 ${pct(pF)}</text>
    ${area(b2, ff, c2, 10, ROSE, 0.7)}${curve(b2, ff, AMBER, x0, 10, 2.2)}
    ${vline(b2, c2, '2.262² = ' + c2.toFixed(2), 'start')}
    <text x="${f1(PX(b2, 7.6))}" y="${f1(PY(b2, 0.08))}" text-anchor="middle" font-size="12.4" font-weight="700" fill="${ROSE}">右の裾 ${pct(pF)}</text>
    ${axes(b2, [0, 2, 4, 6, 8, 10])}
  </svg>`;
  const cap = `2乗すると、絶対値が同じ左右の値が同じ1つの値になります。t の左右の裾（合わせて ${pct(pT, 0)}）が重なって、F(1, 9) の右の裾（${pct(pF, 0)}）になります。`;
  return fig(svg, cap);
}
// 1.12：自由度。3人の平均が70点なら、2人の点が分かった時点で3人目は70点に決まる
function dfThree(): string {
  const W = 344, H = 206;
  const b: Box = { x: 74, y: 30, w: 252, h: 124, xMin: 50, xMax: 90, yMax: 1 };
  const mk = 'df3-arrow';
  const rows = [
    { n: '1人目', v: 60, c: INDIGO, t: '60点（差 −10）' },
    { n: '2人目', v: 80, c: INDIGO, t: '80点（差 +10）' },
    { n: '3人目', v: 70, c: ROSE, t: '差は 0 しか残らない' },
  ];
  const mx = PX(b, 70);
  const body = rows.map((r, i) => {
    const y = 58 + i * 38, x = PX(b, r.v);
    const arrow = r.v === 70 ? '' : `<line x1="${f1(mx)}" y1="${y}" x2="${f1(x + (r.v < 70 ? 7 : -7))}" y2="${y}" stroke="${r.c}" stroke-width="1.8" marker-end="url(#${mk})" />`;
    const dot = r.v === 70
      ? `<circle cx="${f1(x)}" cy="${y}" r="6" fill="#fff" stroke="${r.c}" stroke-width="2.2" />`
      : `<circle cx="${f1(x)}" cy="${y}" r="6" fill="${r.c}" />`;
    const lx = r.v === 70 ? x + 12 : r.v < 70 ? x - 10 : mx + 6;
    const anchor = r.v < 70 ? 'end' : 'start';
    return `<text x="4" y="${y + 4}" font-size="12.4" font-weight="700" fill="${r.c}">${r.n}</text>
    ${arrow}${dot}
    <text x="${f1(lx)}" y="${y - 10}" text-anchor="${anchor}" font-size="12.4" fill="${r.c}">${r.t}</text>`;
  }).join('');
  const svg = `${svgOpen(W, H, '3人の点数の平均が70点のとき、1人目60点と2人目80点が分かると、3人目の平均からの差は0しか残らず70点に決まる')}
    <defs><marker id="${mk}" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="${INDIGO}" /></marker></defs>
    <line x1="${f1(mx)}" y1="30" x2="${f1(mx)}" y2="${b.y + b.h}" stroke="${INK}" stroke-width="1.2" stroke-dasharray="4 3" />
    <text x="${f1(mx)}" y="22" text-anchor="middle" font-size="12.4" font-weight="700" fill="${INK}">平均 70</text>
    ${body}
    ${axes(b, [50, 60, 70, 80, 90])}
    <text x="${W / 2}" y="${H - 4}" text-anchor="middle" font-size="12.4" fill="${SLATE}">差の合計は必ず0。自由に動けるのは2人分</text>
  </svg>`;
  const cap = `平均からの差は、足すと必ず0になります。2人分の差（−10 と +10）が決まると、3人目の差は0しか残りません。`;
  return fig(svg, cap);
}

// 1.12：同じデータを5倍に伸ばしても T は変わらない（σ の大きさに T の分布がよらない）
function tScale(): string {
  const W = 344, H = 286;
  const base = [-4, -2, 0, 3, 4, 5, 8, 10, 12, 14];
  const n = base.length;
  const panel = (top: number, k: number, title: string, color: string, xMin: number, xMax: number, ticks: number[]) => {
    const xs = base.map((v) => v * k);
    const mean = xs.reduce((a, v) => a + v, 0) / n;
    const s = Math.sqrt(xs.reduce((a, v) => a + (v - mean) ** 2, 0) / (n - 1));
    const T = mean / (s / Math.sqrt(n));
    const b: Box = { x: 14, y: top + 30, w: 316, h: 80, xMin, xMax, yMax: 1 };
    const px = (v: number) => f1(PX(b, v));
    const yDot = top + 66, yBr = top + 92;
    return `<text x="2" y="${top + 16}" font-size="12.4" font-weight="700" fill="${color}">${title}</text>
    <text x="${W - 2}" y="${top + 16}" text-anchor="end" font-size="13.2" font-weight="700" fill="${ROSE}">T = ${T.toFixed(2)}</text>
    <line x1="${px(0)}" y1="${top + 36}" x2="${px(0)}" y2="${b.y + b.h}" stroke="${SLATE}" stroke-width="1.2" stroke-dasharray="4 3" />
    <text x="${f1(PX(b, 0) - 4)}" y="${top + 44}" text-anchor="end" font-size="12.4" fill="${SLATE}">μ = 0</text>
    <line x1="${px(mean)}" y1="${top + 36}" x2="${px(mean)}" y2="${b.y + b.h}" stroke="${color}" stroke-width="1.6" />
    <text x="${f1(PX(b, mean) + 4)}" y="${top + 44}" font-size="12.4" font-weight="700" fill="${color}">x̄ = ${num(mean)}</text>
    ${xs.map((v) => `<circle cx="${px(v)}" cy="${yDot}" r="4.5" fill="${color}" fill-opacity="0.75" />`).join('')}
    <line x1="${px(mean)}" y1="${yBr}" x2="${px(mean + s)}" y2="${yBr}" stroke="${INK}" stroke-width="1.6" />
    <line x1="${px(mean + s)}" y1="${yBr - 5}" x2="${px(mean + s)}" y2="${yBr + 5}" stroke="${INK}" stroke-width="1.6" />
    <text x="${f1(PX(b, mean + s) + 5)}" y="${yBr + 4}" font-size="12.4" fill="${INK}">s = ${num(s)}</text>
    ${axes(b, ticks)}`;
  };
  const svg = `${svgOpen(W, H, '上は薬の例の10人のデータで平均5、標準偏差6、T は2.64。下は散らばりが5倍の母集団から取った場合で、データ全体が5倍に伸び、平均25、標準偏差30になるが、T は同じ2.64')}
    ${panel(0, 1, '薬の例の10人（mmHg）', INDIGO, -10, 20, [-10, -5, 0, 5, 10, 15, 20])}
    ${panel(146, 5, '散らばりが5倍の母集団なら', TEAL, -50, 100, [-50, -25, 0, 25, 50, 75, 100])}
  </svg>`;
  const cap = `下の目盛りは上の5倍です。データは全体が5倍に伸びるだけで、同じ形に見えます。平均のずれも s も5倍になるので、比の T は変わりません。`;
  return fig(svg, cap);
}

// 1.21b：乱塊法の配置。4枚の畑（ブロック）それぞれに3つの肥料をくじで1区画ずつ割り当てる
function rcbdLayout(): string {
  const W = 344, H = 250;
  const rows = [
    { name: '畑1', order: ['B', 'A', 'C'], y: { A: 20, B: 23, C: 23 } as Record<string, number>, shade: 0.12 },
    { name: '畑2', order: ['C', 'B', 'A'], y: { A: 26, B: 27, C: 29 } as Record<string, number>, shade: 0.24 },
    { name: '畑3', order: ['A', 'C', 'B'], y: { A: 27, B: 30, C: 33 } as Record<string, number>, shade: 0.36 },
    { name: '畑4', order: ['B', 'C', 'A'], y: { A: 31, B: 34, C: 35 } as Record<string, number>, shade: 0.48 },
  ];
  const col: Record<string, string> = { A: INDIGO, B: AMBER, C: ROSE };
  const x0 = 52, cw = 66, rh = 44, y0 = 30;
  const body = rows.map((r, i) => {
    const y = y0 + i * (rh + 8);
    const mean = (r.y.A + r.y.B + r.y.C) / 3;
    const cells = r.order.map((t, j) => {
      const x = x0 + j * (cw + 4);
      return `<rect x="${x}" y="${y}" width="${cw}" height="${rh}" rx="4" fill="#fff" stroke="${col[t]}" stroke-width="2" />
      <text x="${x + cw / 2}" y="${y + 19}" text-anchor="middle" font-size="14" font-weight="700" fill="${col[t]}">${t}</text>
      <text x="${x + cw / 2}" y="${y + 36}" text-anchor="middle" font-size="12.4" fill="${INK}">${r.y[t]} kg</text>`;
    }).join('');
    return `<rect x="${x0 - 6}" y="${y - 4}" width="${3 * cw + 8 + 12}" height="${rh + 8}" rx="6" fill="${TEAL}" fill-opacity="${r.shade}" />
    <text x="4" y="${y + rh / 2 + 4}" font-size="12.4" font-weight="700" fill="${INK}">${r.name}</text>
    ${cells}
    <text x="${x0 + 3 * (cw + 4) + 14}" y="${y + rh / 2 + 4}" font-size="12.4" fill="${SLATE}">平均 ${num(mean)}</text>`;
  }).join('');
  const svg = `${svgOpen(W, H, '4枚の畑それぞれを3区画に分け、肥料A・B・Cをくじで1区画ずつ割り当てた配置。下の畑ほど土が良く収量が多い')}
    <text x="4" y="16" font-size="12.4" fill="${SLATE}">色が濃い畑ほど土が良い</text>
    ${body}
  </svg>`;
  const cap = `どの畑にも A・B・C が1つずつ入り、畑の中の並びはくじで決めます。土の良い畑に特定の肥料が集まらないので、畑の違いは肥料の比較に偏りを生みません。`;
  return fig(svg, cap);
}

// 1.21b：同じ12個のデータの平方和を、一元配置とブロック計画で分ける
function rcbdSS(): string {
  const W = 344, H = 228;
  const total = 243.7, x0 = 14, bw = 316;
  const sx = (v: number) => (v / total) * bw;
  const bar = (y: number, parts: { v: number; c: string; t: string }[]) => {
    let x = x0;
    return parts.map((p) => {
      const w = sx(p.v);
      const s = `<rect x="${f1(x)}" y="${y}" width="${f1(w)}" height="34" fill="${p.c}" fill-opacity="0.8" />` +
        (w > 75 ? `<text x="${f1(x + w / 2)}" y="${y + 22}" text-anchor="middle" font-size="12.4" font-weight="700" fill="#fff">${p.t} ${p.v}</text>` : '');
      x += w;
      return s;
    }).join('');
  };
  const e1 = 206.3 + 4.7;
  const svg = `${svgOpen(W, H, '平方和の分け方。畑を無視すると畑の違い206.3が誤差に入り誤差は211.0、畑をブロックにすると誤差は4.7だけになる')}
    <text x="${x0}" y="18" font-size="12.4" font-weight="700" fill="${INK}">畑を無視した一元配置</text>
    ${bar(26, [{ v: 32.7, c: AMBER, t: '肥料' }, { v: e1, c: SLATE, t: '誤差' }])}
    <text x="${x0}" y="80" font-size="12.4" fill="${SLATE}">肥料（橙）32.7、誤差の平均平方 ${num(e1)}÷9＝23.4 → F＝0.70</text>
    <text x="${x0}" y="122" font-size="12.4" font-weight="700" fill="${INK}">畑をブロックにした二元配置</text>
    ${bar(130, [{ v: 32.7, c: AMBER, t: '肥料' }, { v: 206.3, c: TEAL, t: '畑' }, { v: 4.7, c: SLATE, t: '誤差' }])}
    <line x1="${f1(x0 + bw - sx(4.7) / 2)}" y1="166" x2="${f1(x0 + bw - 10)}" y2="180" stroke="${SLATE}" stroke-width="1" />
    <text x="${x0 + bw}" y="192" text-anchor="end" font-size="12.4" fill="${SLATE}">誤差 4.7</text>
    <text x="${x0}" y="214" font-size="12.4" fill="${SLATE}">肥料（橙）32.7、誤差の平均平方 4.7÷6＝0.78 → F＝21.0</text>
  </svg>`;
  const cap = `棒の長さは平方和で、どちらも合計 243.7 です。肥料の分（橙）は同じなのに、畑を無視すると畑の違い（緑）が誤差（灰）に入り、肥料の差が埋もれます。`;
  return fig(svg, cap);
}

// 1.13：一様分布 U(0,1) から5個とったときの、小さい方から k 番目の値の分布（ベータ分布 Be(k, 6−k)）
function orderStats(): string {
  const W = 344, H = 250, n = 5;
  const b: Box = { x: 14, y: 30, w: 316, h: 170, xMin: 0, xMax: 1, yMax: 5.2 };
  const coef = (k: number) => Math.exp(lgamma(n + 1) - lgamma(k) - lgamma(n - k + 1));
  const dens = (k: number) => (x: number) => coef(k) * x ** (k - 1) * (1 - x) ** (n - k);
  const set = [
    { k: 1, c: SLATE, x: 0.06, y: 4.3, a: 'start', t: '1番目（最小）' },
    { k: 2, c: TEAL, x: 0.25, y: 2.35, a: 'middle', t: '2番目' },
    { k: 3, c: INDIGO, x: 0.5, y: 2.1, a: 'middle', t: '3番目（中央値）' },
    { k: 4, c: '#b45309', x: 0.75, y: 2.35, a: 'middle', t: '4番目' },
    { k: 5, c: ROSE, x: 0.94, y: 4.3, a: 'end', t: '5番目（最大）' },
  ];
  const svg = `${svgOpen(W, H, '0から1の一様分布から5個とったときの、小さい方から1番目から5番目の値の分布。1番目は0の近く、5番目は1の近くに山があり、3番目の中央値は0.5を中心に左右対称')}
    ${set.map(({ k, c }) => curve(b, dens(k), c, 0.0005, 0.9995, 2)).join('')}
    ${set.map(({ c, x, y, a, t }) => `<text x="${f1(PX(b, x))}" y="${f1(PY(b, y))}" text-anchor="${a}" font-size="12.4" font-weight="700" fill="${c}">${t}</text>`).join('')}
    ${axes(b, [0, 0.2, 0.4, 0.6, 0.8, 1])}
    <text x="${W / 2}" y="${H - 4}" text-anchor="middle" font-size="12.4" fill="${SLATE}">横軸＝小さい方から k 番目の値</text>
  </svg>`;
  const cap = `5個の値は 0 から 1 をおよそ6等分する位置に並び、k 番目の値の期待値は k/6 です。端の2つ（最小・最大）は山が鋭く、中央値は広がります。`;
  return fig(svg, cap);
}

// ============ 1.13：k 番目の値が x に来るときの3組（n=5, k=3） ============
function orderSplit(): string {
  const W = 344, H = 210;
  const y0 = 92, xL = 20, xR = 324, xx = 172;
  const dots = [
    { x: 62, c: TEAL }, { x: 112, c: TEAL },
    { x: xx, c: INDIGO },
    { x: 236, c: AMBER }, { x: 290, c: AMBER },
  ];
  const svg = `${svgOpen(W, H, '5個のうち3番目の値が x に来るのは、2個が x より小さく、1個が x のあたりにあり、2個が x より大きいとき')}
    <rect x="${xL}" y="${y0 - 34}" width="${xx - 10 - xL}" height="48" rx="6" fill="${TEAL}" fill-opacity="0.08" />
    <rect x="${xx + 10}" y="${y0 - 34}" width="${xR - xx - 10}" height="48" rx="6" fill="${AMBER}" fill-opacity="0.08" />
    <line x1="${xL}" y1="${y0}" x2="${xR}" y2="${y0}" stroke="${SLATE}" stroke-width="1.2" />
    <line x1="${xx}" y1="${y0 - 40}" x2="${xx}" y2="${y0 + 12}" stroke="${INDIGO}" stroke-width="1.2" stroke-dasharray="4 3" />
    <text x="${xx}" y="${y0 - 44}" text-anchor="middle" font-size="13.2" font-weight="700" fill="${INDIGO}">x</text>
    ${dots.map(({ x, c }) => `<circle cx="${x}" cy="${y0}" r="7" fill="${c}" />`).join('')}
    <text x="${(xL + xx - 10) / 2}" y="${y0 - 16}" text-anchor="middle" font-size="12.4" fill="${TEAL}">x より小さい</text>
    <text x="${(xx + 10 + xR) / 2}" y="${y0 - 16}" text-anchor="middle" font-size="12.4" fill="#b45309">x より大きい</text>
    <text x="${(xL + xx - 10) / 2}" y="${y0 + 34}" text-anchor="middle" font-size="13.2" font-weight="700" fill="${TEAL}">2個：F(x)²</text>
    <text x="${xx}" y="${y0 + 56}" text-anchor="middle" font-size="13.2" font-weight="700" fill="${INDIGO}">1個：f(x)</text>
    <text x="${(xx + 10 + xR) / 2}" y="${y0 + 34}" text-anchor="middle" font-size="13.2" font-weight="700" fill="#b45309">2個：{1−F(x)}²</text>
    <text x="${W / 2}" y="${H - 30}" text-anchor="middle" font-size="12.4" fill="${INK}">どの2個・どの1個・どの2個にするかの分け方</text>
    <text x="${W / 2}" y="${H - 12}" text-anchor="middle" font-size="12.4" fill="${INK}">5! ÷ (2! × 1! × 2!) ＝ 30 通り</text>
  </svg>`;
  const cap = `5個のうち3番目（中央値）が x に来るときの例です。3つの組の確率を掛け、分け方の数 30 を掛けたものが密度になります。`;
  return fig(svg, cap);
}

// ============ 1.13：真ん中の密度と中央値のばらつき（分散1の正規分布と一様分布、n=25） ============
function medianSpread(): string {
  const W = 344, H = 340, n = 25, r3 = Math.sqrt(3);
  const top: Box = { x: 14, y: 30, w: 316, h: 96, xMin: -2.6, xMax: 2.6, yMax: 0.46 };
  const bot: Box = { x: 14, y: 196, w: 316, h: 106, xMin: -1.3, xMax: 1.3, yMax: 1.75 };
  const fU = 1 / (2 * r3), fN = normPdf(0);
  const sN = 1 / (2 * Math.sqrt(n) * fN), sU = 1 / (2 * Math.sqrt(n) * fU);
  const uni = (b: Box) => `<polyline points="${f1(PX(b, -2.6))},${f1(PY(b, 0))} ${f1(PX(b, -r3))},${f1(PY(b, 0))} ${f1(PX(b, -r3))},${f1(PY(b, fU))} ${f1(PX(b, r3))},${f1(PY(b, fU))} ${f1(PX(b, r3))},${f1(PY(b, 0))} ${f1(PX(b, 2.6))},${f1(PY(b, 0))}" fill="none" stroke="#b45309" stroke-width="2" />`;
  const svg = `${svgOpen(W, H, '分散が同じ1の正規分布と一様分布。真ん中の密度は正規分布0.40、一様分布0.29。25個の中央値の分布は、正規分布からのほうが細い')}
    <text x="${top.x}" y="${top.y - 12}" font-size="12.4" font-weight="700" fill="${INK}">元の分布（どちらも平均0・分散1）</text>
    ${curve(top, (x) => normPdf(x), INDIGO)}
    ${uni(top)}
    <circle cx="${f1(PX(top, 0))}" cy="${f1(PY(top, fN))}" r="3.5" fill="${INDIGO}" />
    <circle cx="${f1(PX(top, 0))}" cy="${f1(PY(top, fU))}" r="3.5" fill="#b45309" />
    <text x="${f1(PX(top, 0.12))}" y="${f1(PY(top, fN) - 4)}" font-size="12.4" fill="${INDIGO}">f(m) = 0.40</text>
    <text x="${f1(PX(top, 0))}" y="${f1(PY(top, 0.12))}" text-anchor="middle" font-size="12.4" fill="#b45309">f(m) = 0.29</text>
    <text x="${f1(PX(top, -2.5))}" y="${f1(PY(top, 0.37))}" font-size="12.4" font-weight="700" fill="${INDIGO}">正規</text>
    <text x="${f1(PX(top, 2.5))}" y="${f1(PY(top, 0.37))}" text-anchor="end" font-size="12.4" font-weight="700" fill="#b45309">一様</text>
    ${axes(top, [-2, -1, 0, 1, 2])}
    <text x="${bot.x}" y="${bot.y - 12}" font-size="12.4" font-weight="700" fill="${INK}">25個の中央値 M の分布</text>
    ${curve(bot, (x) => normPdf(x, 0, sN), INDIGO)}
    ${curve(bot, (x) => normPdf(x, 0, sU), '#b45309')}
    <text x="${f1(PX(bot, 0.3))}" y="${f1(PY(bot, 1.5))}" font-size="12.4" fill="${INDIGO}">正規：標準偏差 ${f2(sN)}</text>
    <text x="${f1(PX(bot, 0.62))}" y="${f1(PY(bot, 0.72))}" font-size="12.4" fill="#b45309">一様：${f2(sU)}</text>
    ${axes(bot, [-1, -0.5, 0, 0.5, 1])}
  </svg>`;
  const cap = `分散は同じでも、真ん中の密度 f(m) が高い正規分布のほうが、中央値の分布は細くなります。標準偏差は 1/(2√n f(m)) なので、f(m) が 0.40 と 0.29 なら、25個の中央値の標準偏差は 0.25 と 0.35 です。`;
  return fig(svg, cap);
}

// ============ 1.17：母分散の比の信頼区間（n₁ = n₂ = 30、s₁ = 2.5、s₂ = 1.5） ============
function varRatioCi(): string {
  const W = 344, H = 312, df = 29, r = 6.25 / 2.25, hi = 2.101, lo = 1 / hi;
  const top: Box = { x: 14, y: 30, w: 316, h: 120, xMin: 0, xMax: 3, yMax: 1.25 };
  const f = fPdf(df, df);
  const nl: Box = { x: 14, y: 206, w: 316, h: 54, xMin: 0, xMax: 7, yMax: 1 };
  const yL = nl.y + nl.h;
  const svg = `${svgOpen(W, H, 'F(29,29) 分布の両側2.5%点は0.48と2.10。標本分散の比2.78をそれぞれで割ると、母分散の比の95%信頼区間は1.32から5.84で、1を含まない')}
    <text x="${top.x}" y="${top.y - 12}" font-size="12.4" font-weight="700" fill="${INK}">F(29, 29) の両側に 2.5% ずつ</text>
    ${area(top, f, 0.01, lo, ROSE, 0.4)}${area(top, f, hi, 3, ROSE, 0.4)}${curve(top, f, INDIGO, 0.01, 3, 2.2)}
    <text x="${f1(PX(top, 0.4))}" y="${f1(PY(top, 0.22))}" text-anchor="end" font-size="12.4" font-weight="700" fill="${ROSE}">0.48</text>
    <text x="${f1(PX(top, hi))}" y="${f1(PY(top, 0.32))}" text-anchor="middle" font-size="12.4" font-weight="700" fill="${ROSE}">2.10</text>
    ${axes(top, [0, 1, 2, 3])}
    <text x="${nl.x}" y="${nl.y - 12}" font-size="12.4" font-weight="700" fill="${INK}">母分散の比 σ₁²/σ₂² の95%信頼区間</text>
    <line x1="${f1(PX(nl, 1))}" y1="${nl.y - 4}" x2="${f1(PX(nl, 1))}" y2="${yL}" stroke="${SLATE}" stroke-width="1.2" stroke-dasharray="3 3" />
    <text x="${f1(PX(nl, 1) + 5)}" y="${nl.y + 6}" font-size="12.4" fill="${SLATE}">比が1＝等しい</text>
    <line x1="${f1(PX(nl, r / hi))}" y1="${yL - 22}" x2="${f1(PX(nl, r * hi))}" y2="${yL - 22}" stroke="${TEAL}" stroke-width="4" stroke-linecap="round" />
    <circle cx="${f1(PX(nl, r))}" cy="${yL - 22}" r="5" fill="${INK}" />
    <text x="${f1(PX(nl, r))}" y="${yL - 32}" text-anchor="middle" font-size="12.4" fill="${INK}">2.78</text>
    <text x="${f1(PX(nl, r / hi))}" y="${yL - 32}" text-anchor="middle" font-size="12.4" font-weight="700" fill="${TEAL}">1.32</text>
    <text x="${f1(PX(nl, r * hi))}" y="${yL - 32}" text-anchor="middle" font-size="12.4" font-weight="700" fill="${TEAL}">5.84</text>
    ${axes(nl, [0, 1, 2, 3, 4, 5, 6, 7])}
    <text x="${W / 2}" y="${H - 4}" text-anchor="middle" font-size="12.4" fill="${SLATE}">黒丸＝標本分散の比 2.5² / 1.5² ＝ 2.78</text>
  </svg>`;
  const cap = `標本分散の比 2.78 を、上の図の 2.10 で割ると下端 1.32、0.48 で割ると上端 5.84 です。区間は 2.78 の左右で長さが違い、比が1の点線を含みません。`;
  return fig(svg, cap);
}

// ============ 1.4：分位点関数（CDF を逆に読む） ============
function quantileFn(): string {
  const W = 340, H = 216;
  const b: Box = { x: 34, y: 24, w: 290, h: 150, xMin: 0, xMax: 3.2, yMax: 1.05 };
  const F = (x: number) => 1 - Math.exp(-x);
  const pts = [{ p: 0.5, c: TEAL }, { p: 0.9, c: ROSE }].map((o) => ({ ...o, x: -Math.log(1 - o.p) }));
  const svg = `${svgOpen(W, H, '指数分布の累積分布関数を逆に読む。確率0.5から横へ進むと0.69年、確率0.9からだと2.30年')}
    <line x1="${b.x}" y1="${b.y + b.h}" x2="${b.x + b.w}" y2="${b.y + b.h}" stroke="${SLATE}" stroke-width="1" />
    <line x1="${b.x}" y1="${b.y}" x2="${b.x}" y2="${b.y + b.h}" stroke="${SLATE}" stroke-width="1" />
    <text x="${b.x - 6}" y="${f1(PY(b, 1) + 4)}" text-anchor="end" font-size="12.4" fill="${SLATE}">1</text>
    <text x="${b.x - 6}" y="${f1(PY(b, 0) + 4)}" text-anchor="end" font-size="12.4" fill="${SLATE}">0</text>
    ${curve(b, F, AMBER, 0, 3.2, 2.2)}
    ${pts.map(({ p, c, x }) => `
    <line x1="${b.x}" y1="${f1(PY(b, p))}" x2="${f1(PX(b, x))}" y2="${f1(PY(b, p))}" stroke="${c}" stroke-width="1.6" stroke-dasharray="5 3" />
    <line x1="${f1(PX(b, x))}" y1="${f1(PY(b, p))}" x2="${f1(PX(b, x))}" y2="${b.y + b.h}" stroke="${c}" stroke-width="1.6" stroke-dasharray="5 3" />
    <polygon points="${f1(PX(b, x) - 4)},${b.y + b.h - 8} ${f1(PX(b, x) + 4)},${b.y + b.h - 8} ${f1(PX(b, x))},${b.y + b.h - 1}" fill="${c}" />
    <circle cx="${f1(PX(b, x))}" cy="${f1(PY(b, p))}" r="3.2" fill="${c}" />
    <text x="${b.x - 6}" y="${f1(PY(b, p) + 4)}" text-anchor="end" font-size="12.4" font-weight="700" fill="${c}">${p}</text>
    <text x="${f1(PX(b, x))}" y="${b.y + b.h + 15}" text-anchor="middle" font-size="12.4" font-weight="700" fill="${c}">${f2(x)}</text>`).join('')}
    <text x="${f1(PX(b, 2.45))}" y="${f1(PY(b, 0.8))}" font-size="12.4" font-weight="700" fill="#b45309">F(x)</text>
    <text x="${f1(PX(b, 0.72) + 6)}" y="${f1(PY(b, 0.5) + 16)}" font-size="12.4" fill="${TEAL}">中央値</text>
    <text x="${b.x + b.w / 2}" y="${H - 4}" text-anchor="middle" font-size="12.4" fill="${SLATE}">横軸 ＝ 故障までの年数／縦軸 ＝ 確率 F(x)</text>
  </svg>`;
  const cap = `確率 p から横へ進んで曲線に当て、真下の x を読むのが分位点関数です。p ＝ 0.5 なら中央値の ${f2(pts[0].x)} 年、p ＝ 0.9 なら ${f2(pts[1].x)} 年です。`;
  return fig(svg, cap);
}

// ============ 1.15：n−1 で割る理由（データ自身の平均からのずれは小さい） ============
function nMinus1(): string {
  const W = 340, H = 246, xs = [11, 12, 13, 14, 15], mu = 10, xbar = 13;
  const b: Box = { x: 20, y: 0, w: 300, h: 210, xMin: 9, xMax: 16, yMax: 1 };
  const ss = (c: number) => xs.reduce((s, x) => s + (x - c) ** 2, 0);
  const rows = (c: number, y0: number, col: string) => xs.map((x, i) => {
    const y = y0 + i * 12;
    return `<line x1="${f1(PX(b, c))}" y1="${y}" x2="${f1(PX(b, x))}" y2="${y}" stroke="${col}" stroke-width="2" stroke-opacity="0.55" /><circle cx="${f1(PX(b, x))}" cy="${y}" r="3.6" fill="${INK}" />`;
  }).join('');
  const vline = (c: number, y1: number, y2: number, col: string) => `<line x1="${f1(PX(b, c))}" y1="${y1}" x2="${f1(PX(b, c))}" y2="${y2}" stroke="${col}" stroke-width="1.5" stroke-dasharray="4 3" />`;
  const svg = `${svgOpen(W, H, '5個のデータを真の平均10から測るとずれの2乗の和は55、データ自身の平均13から測ると10')}
    <text x="4" y="18" font-size="12.4" font-weight="700" fill="${ROSE}">真の平均 μ ＝ ${mu} から：2乗の和 ${ss(mu)}</text>
    ${vline(mu, 28, 92, ROSE)}${rows(mu, 36, ROSE)}
    <text x="4" y="118" font-size="12.4" font-weight="700" fill="${INDIGO}">標本平均 x̄ ＝ ${xbar} から：2乗の和 ${ss(xbar)}</text>
    ${vline(xbar, 128, 192, INDIGO)}${rows(xbar, 136, INDIGO)}
    ${axes(b, [9, 10, 11, 12, 13, 14, 15, 16])}
    <text x="${W / 2}" y="${H - 4}" text-anchor="middle" font-size="12.4" fill="${SLATE}">差 ${ss(mu) - ss(xbar)} ＝ 5 ×（13 − 10）² ＝ n(x̄ − μ)²</text>
  </svg>`;
  const cap = `5個のデータ（11〜15）のずれを、真の平均 μ ＝ 10 から測った場合と、データ自身の平均 x̄ ＝ 13 から測った場合です。x̄ はデータの真ん中にあるので、2乗の和はほかのどの点から測るより小さくなります。`;
  return fig(svg, cap);
}

// ============ 1.16：標本平均の95%が入る範囲（σ 既知・身長の例） ============
function ciZ(): string {
  const W = 340, H = 226, se = 1.2, m = 1.96 * se;
  const b: Box = { x: 14, y: 34, w: 312, h: 140, xMin: -4.5, xMax: 4.5, yMax: 0.36 };
  const f = (x: number) => normPdf(x, 0, se);
  const base = b.y + b.h;
  const tick = (x: number, t: string, c: string) => `<line x1="${f1(PX(b, x))}" y1="${base}" x2="${f1(PX(b, x))}" y2="${base + 4}" stroke="${c}" stroke-width="1.2" /><text x="${f1(PX(b, x))}" y="${base + 17}" text-anchor="middle" font-size="12.4" fill="${c}">${t}</text>`;
  const svg = `${svgOpen(W, H, '25人の平均身長の分布。真の平均から上下2.35cmの内側に95%が入り、外側は左右2.5%ずつ')}
    ${area(b, f, -m, m, INDIGO, 0.22)}${area(b, f, -4.5, -m, ROSE, 0.45)}${area(b, f, m, 4.5, ROSE, 0.45)}
    ${curve(b, f, INDIGO, -4.5, 4.5, 2.2)}
    <line x1="${b.x}" y1="${base}" x2="${b.x + b.w}" y2="${base}" stroke="${SLATE}" stroke-width="1" />
    ${[-m, m].map((x) => `<line x1="${f1(PX(b, x))}" y1="${f1(PY(b, f(x)) - 14)}" x2="${f1(PX(b, x))}" y2="${base}" stroke="${ROSE}" stroke-width="1.3" stroke-dasharray="4 3" />`).join('')}
    ${tick(-m, 'μ − 2.35', ROSE)}${tick(0, 'μ', INK)}${tick(m, 'μ ＋ 2.35', ROSE)}
    <text x="${f1(PX(b, 0))}" y="${f1(PY(b, 0.1))}" text-anchor="middle" font-size="13.2" font-weight="700" fill="${INDIGO}">95%</text>
    <text x="${f1(PX(b, -3.5))}" y="${f1(PY(b, 0.06))}" text-anchor="middle" font-size="12.4" font-weight="700" fill="${ROSE}">2.5%</text>
    <text x="${f1(PX(b, 3.5))}" y="${f1(PY(b, 0.06))}" text-anchor="middle" font-size="12.4" font-weight="700" fill="${ROSE}">2.5%</text>
    <text x="${W / 2}" y="16" text-anchor="middle" font-size="12.4" fill="${SLATE}">25人の平均 X̄ の分布（標準誤差 6/√25 ＝ 1.2 cm）</text>
    <text x="${W / 2}" y="${H - 4}" text-anchor="middle" font-size="12.4" fill="${SLATE}">±2.35 ＝ 1.96 × 1.2（1.96 は標準正規分布で中央95%の端）</text>
  </svg>`;
  const cap = `25人の平均 X̄ は、真の平均 μ を中心に標準誤差 1.2 cm で散らばります。μ から ±2.35 cm の内側に95%が入り、外側に出るのは左右2.5%ずつです。`;
  return fig(svg, cap);
}

// ============ 1.16：信頼区間の被覆（コンピュータで20回くり返した模擬） ============
function ciCoverage(): string {
  const W = 340, H = 244, mu = 171, se = 1.2, m = 1.96 * se, n = 20;
  const b: Box = { x: 14, y: 30, w: 312, h: 176, xMin: 165, xMax: 177, yMax: 1 };
  const g = gaussFrom(mulberry32(1016));
  const xb = Array.from({ length: n }, () => mu + se * g());
  const miss = xb.filter((x) => Math.abs(x - mu) > m).length;
  const svg = `${svgOpen(W, H, `25人を測って95%信頼区間を作ることを20回くり返した模擬。20本中${miss}本が真の平均を外す`)}
    <line x1="${f1(PX(b, mu))}" y1="22" x2="${f1(PX(b, mu))}" y2="${b.y + b.h}" stroke="${ROSE}" stroke-width="1.5" stroke-dasharray="4 3" />
    <text x="${f1(PX(b, mu))}" y="15" text-anchor="middle" font-size="12.4" font-weight="700" fill="${ROSE}">真の平均 μ ＝ ${mu}（動かない）</text>
    ${xb.map((x, i) => {
      const y = b.y + 6 + i * 8.4, c = Math.abs(x - mu) > m ? ROSE : INDIGO;
      return `<line x1="${f1(PX(b, x - m))}" y1="${f1(y)}" x2="${f1(PX(b, x + m))}" y2="${f1(y)}" stroke="${c}" stroke-width="2" /><circle cx="${f1(PX(b, x))}" cy="${f1(y)}" r="2.2" fill="${c}" />`;
    }).join('')}
    ${axes(b, [166, 168, 170, 172, 174, 176])}
    <text x="${W / 2}" y="${H - 4}" text-anchor="middle" font-size="12.4" fill="${SLATE}">横軸 ＝ 身長（cm）／点 ＝ その回の x̄、横線 ＝ x̄ ± 2.35</text>
  </svg>`;
  const cap = `μ ＝ 171、σ ＝ 6 として、25人を測り区間を作ることをコンピュータで20回くり返しました。区間は標本ごとに左右に揺れ、20本中${miss}本が μ を外しています（赤）。`;
  return fig(svg, cap);
}

// ============ 1.16：母分散の信頼区間（自由度9のカイ二乗分布の中央95%） ============
function ciChi2(): string {
  const W = 340, H = 226, k = 9, lo = 2.7004, hi = 19.0228;
  const b: Box = { x: 14, y: 30, w: 312, h: 144, xMin: 0, xMax: 26, yMax: 0.115 };
  const f = chi2Pdf(k);
  const base = b.y + b.h;
  const svg = `${svgOpen(W, H, '自由度9のカイ二乗分布。2.70から19.02の間に95%が入り、左右に2.5%ずつ残る。山は左に寄っている')}
    ${area(b, f, lo, hi, INDIGO, 0.22)}${area(b, f, 0.001, lo, ROSE, 0.5)}${area(b, f, hi, 26, ROSE, 0.5)}
    ${curve(b, f, INDIGO, 0.01, 26, 2.2)}
    ${[lo, hi].map((x) => `<line x1="${f1(PX(b, x))}" y1="${f1(PY(b, f(x)) - 16)}" x2="${f1(PX(b, x))}" y2="${base}" stroke="${ROSE}" stroke-width="1.3" stroke-dasharray="4 3" />`).join('')}
    ${axes(b, [0, 10])}
    <text x="${f1(PX(b, lo))}" y="${base + 14}" text-anchor="middle" font-size="12.4" font-weight="700" fill="${ROSE}">2.70</text>
    <text x="${f1(PX(b, hi))}" y="${base + 14}" text-anchor="middle" font-size="12.4" font-weight="700" fill="${ROSE}">19.02</text>
    <text x="${f1(PX(b, 9))}" y="${f1(PY(b, 0.04))}" text-anchor="middle" font-size="13.2" font-weight="700" fill="${INDIGO}">95%</text>
    <text x="${f1(PX(b, lo) - 4)}" y="${f1(PY(b, f(lo)) - 20)}" text-anchor="end" font-size="12.4" font-weight="700" fill="${ROSE}">2.5%</text>
    <text x="${f1(PX(b, 22))}" y="${f1(PY(b, 0.022))}" text-anchor="middle" font-size="12.4" font-weight="700" fill="${ROSE}">2.5%</text>
    <text x="${b.x + b.w / 2}" y="${H - 4}" text-anchor="middle" font-size="12.4" fill="${SLATE}">横軸 ＝ 9s²/σ²（自由度9のカイ二乗分布）</text>
  </svg>`;
  const cap = `ボルト10本の 9s²/σ² は、95%の確率で 2.70 から 19.02 の間に出ます。山の頂上は7で左に寄っているので、2つの端は頂上から等しい距離になりません。`;
  return fig(svg, cap);
}

// ============ 1.16：母比率の区間と人数（520/1000 と同じ 52% を 250人・4000人で） ============
function ciPropN(): string {
  const W = 340, H = 196, ph = 0.52;
  const b: Box = { x: 70, y: 40, w: 256, h: 110, xMin: 0.44, xMax: 0.6, yMax: 1 };
  const rows = [250, 1000, 4000].map((n, i) => {
    const h = 1.96 * Math.sqrt((ph * (1 - ph)) / n), y = b.y + 18 + i * 36, c = ph - h > 0.5 ? TEAL : INDIGO;
    return `<text x="${b.x - 8}" y="${y + 4}" text-anchor="end" font-size="12.4" fill="${INK}">${n}人</text>
    <line x1="${f1(PX(b, ph - h))}" y1="${y}" x2="${f1(PX(b, ph + h))}" y2="${y}" stroke="${c}" stroke-width="4" stroke-linecap="round" />
    <circle cx="${f1(PX(b, ph))}" cy="${y}" r="4.5" fill="${INK}" />
    <text x="${f1(Math.abs(ph - h - 0.5) < 0.015 ? PX(b, 0.5) + 4 : PX(b, ph - h))}" y="${y - 9}" text-anchor="${Math.abs(ph - h - 0.5) < 0.015 ? 'start' : 'middle'}" font-size="12.4" font-weight="700" fill="${c}" stroke="#fff" stroke-width="4" paint-order="stroke">${(ph - h).toFixed(3)}</text>
    <text x="${f1(Math.abs(ph - h - 0.5) < 0.015 ? PX(b, ph + h) + 6 : PX(b, ph + h))}" y="${Math.abs(ph - h - 0.5) < 0.015 ? y + 4 : y - 9}" text-anchor="${Math.abs(ph - h - 0.5) < 0.015 ? 'start' : 'middle'}" font-size="12.4" font-weight="700" fill="${c}" stroke="#fff" stroke-width="4" paint-order="stroke">${(ph + h).toFixed(3)}</text>`;
  }).join('');
  const svg = `${svgOpen(W, H, '標本比率0.52の95%信頼区間。250人と1000人では0.5をまたぎ、4000人では0.505から0.535で0.5を含まない')}
    <line x1="${f1(PX(b, 0.5))}" y1="${b.y - 6}" x2="${f1(PX(b, 0.5))}" y2="${b.y + b.h}" stroke="${ROSE}" stroke-width="1.4" stroke-dasharray="4 3" />
    <text x="${f1(PX(b, 0.5))}" y="${b.y - 12}" text-anchor="middle" font-size="12.4" font-weight="700" fill="${ROSE}">過半数の境目 0.5</text>
    ${rows}
    ${axes(b, [0.44, 0.48, 0.52, 0.56, 0.6])}
    <text x="${W / 2}" y="${H - 4}" text-anchor="middle" font-size="12.4" fill="${SLATE}">黒丸 ＝ 標本比率 0.52（どの人数でも同じ）</text>
  </svg>`;
  const cap = `標本比率が同じでも、聞いた人数で区間の幅が変わります。幅は人数の平方根に反比例するので、4倍の4000人に聞くと幅が半分になり、区間が0.5の右に収まります。`;
  return fig(svg, cap);
}

// ============ 1.17：2つの平均の差の区間（パン工場 A・B、各30個） ============
function ciDiff(): string {
  const W = 340, H = 262, se1 = 2.5 / Math.sqrt(30), se2 = 1.5 / Math.sqrt(30), t29 = 2.045;
  const se = Math.sqrt(se1 ** 2 + se2 ** 2), h = 2.012 * se;
  const top: Box = { x: 70, y: 30, w: 256, h: 64, xMin: 46, xMax: 52, yMax: 1 };
  const bot: Box = { x: 70, y: 158, w: 256, h: 50, xMin: -1, xMax: 4, yMax: 1 };
  const row = (b: Box, y: number, m: number, hw: number, lab: string, c: string) => `
    <text x="${b.x - 8}" y="${y + 4}" text-anchor="end" font-size="12.4" fill="${INK}">${lab}</text>
    <line x1="${f1(PX(b, m - hw))}" y1="${y}" x2="${f1(PX(b, m + hw))}" y2="${y}" stroke="${c}" stroke-width="4" stroke-linecap="round" />
    <circle cx="${f1(PX(b, m))}" cy="${y}" r="4.5" fill="${INK}" />`;
  const bl = bot.y + bot.h;
  const svg = `${svgOpen(W, H, '工場Aの平均50.0gと工場Bの平均48.0gの区間、その下に差2.0gの95%信頼区間0.93から3.07。差の区間は0を含まない')}
    <text x="4" y="16" font-size="12.4" font-weight="700" fill="${INK}">それぞれの平均（g）と95%区間</text>
    ${row(top, top.y + 14, 50, t29 * se1, '工場A', INDIGO)}${row(top, top.y + 44, 48, t29 * se2, '工場B', AMBER)}
    ${axes(top, [46, 48, 50, 52])}
    <text x="4" y="${bot.y - 22}" font-size="12.4" font-weight="700" fill="${INK}">差 A − B の95%信頼区間</text>
    <line x1="${f1(PX(bot, 0))}" y1="${bot.y - 10}" x2="${f1(PX(bot, 0))}" y2="${bl}" stroke="${ROSE}" stroke-width="1.4" stroke-dasharray="4 3" />
    <text x="${f1(PX(bot, 0) + 5)}" y="${bot.y - 1}" font-size="12.4" fill="${ROSE}">差 0</text>
    ${row(bot, bl - 20, 2, h, 'A − B', TEAL)}
    <text x="${f1(PX(bot, 2 - h))}" y="${bl - 30}" text-anchor="middle" font-size="12.4" font-weight="700" fill="${TEAL}">${f2(2 - h)}</text>
    <text x="${f1(PX(bot, 2 + h))}" y="${bl - 30}" text-anchor="middle" font-size="12.4" font-weight="700" fill="${TEAL}">${f2(2 + h)}</text>
    ${axes(bot, [-1, 0, 1, 2, 3, 4])}
    <text x="${W / 2}" y="${H - 4}" text-anchor="middle" font-size="12.4" fill="${SLATE}">差の標準誤差 ＝ √(${f2(se1)}² ＋ ${f2(se2)}²) ＝ ${f2(se)}</text>
  </svg>`;
  const cap = `差の区間の幅は、2つの区間の幅を足したものより狭くなります。標準誤差は足すのではなく、2乗して足してから平方根をとるからです。区間は0を含みません。`;
  return fig(svg, cap);
}

// ============ 1.17：対応のあるデータ（6人の血圧の前後） ============
function pairedDiff(): string {
  const W = 340, H = 250, bef = [150, 138, 162, 145, 170, 155], aft = [144, 135, 154, 141, 163, 150];
  const L: Box = { x: 40, y: 34, w: 130, h: 170, xMin: 0, xMax: 1, yMax: 1 };
  const yv = (v: number) => L.y + L.h - ((v - 130) / 45) * L.h;
  const R: Box = { x: 236, y: 34, w: 90, h: 170, xMin: 0, xMax: 1, yMax: 1 };
  const yd = (v: number) => R.y + R.h - (v / 10) * R.h;
  const d = bef.map((x, i) => x - aft[i]);
  const lo = 5.5 - 1.963, hi = 5.5 + 1.963;
  const svg = `${svgOpen(W, H, '6人の血圧の前後を線で結んだ図と、6人の下がり幅。人どうしの差は138から170と大きいが、下がり幅は3から8にまとまり、平均5.5の区間は3.54から7.46')}
    <text x="${L.x + L.w / 2}" y="16" text-anchor="middle" font-size="12.4" font-weight="700" fill="${INK}">6人の前と後</text>
    ${[130, 145, 160, 175].map((v) => `<text x="${L.x - 6}" y="${f1(yv(v) + 4)}" text-anchor="end" font-size="12.4" fill="${SLATE}">${v}</text><line x1="${L.x}" y1="${f1(yv(v))}" x2="${L.x + L.w}" y2="${f1(yv(v))}" stroke="#e2e8f0" />`).join('')}
    ${bef.map((x, i) => `<line x1="${L.x + 20}" y1="${f1(yv(x))}" x2="${L.x + L.w - 20}" y2="${f1(yv(aft[i]))}" stroke="${INDIGO}" stroke-width="1.6" /><circle cx="${L.x + 20}" cy="${f1(yv(x))}" r="3.4" fill="${INDIGO}" /><circle cx="${L.x + L.w - 20}" cy="${f1(yv(aft[i]))}" r="3.4" fill="${AMBER}" />`).join('')}
    <text x="${L.x + 20}" y="${L.y + L.h + 16}" text-anchor="middle" font-size="12.4" fill="${INDIGO}">前</text>
    <text x="${L.x + L.w - 20}" y="${L.y + L.h + 16}" text-anchor="middle" font-size="12.4" fill="${AMBER}">後</text>
    <text x="${R.x + R.w / 2}" y="16" text-anchor="middle" font-size="12.4" font-weight="700" fill="${INK}">下がり幅</text>
    ${[0, 5, 10].map((v) => `<text x="${R.x - 6}" y="${f1(yd(v) + 4)}" text-anchor="end" font-size="12.4" fill="${SLATE}">${v}</text><line x1="${R.x}" y1="${f1(yd(v))}" x2="${R.x + R.w}" y2="${f1(yd(v))}" stroke="#e2e8f0" />`).join('')}
    ${d.map((v, i) => `<circle cx="${R.x + 18 + (i % 2) * 12}" cy="${f1(yd(v))}" r="3.6" fill="${TEAL}" />`).join('')}
    <line x1="${R.x + 62}" y1="${f1(yd(lo))}" x2="${R.x + 62}" y2="${f1(yd(hi))}" stroke="${TEAL}" stroke-width="4" stroke-linecap="round" />
    <circle cx="${R.x + 62}" cy="${f1(yd(5.5))}" r="4.5" fill="${INK}" />
    <text x="${R.x + 62}" y="${f1(yd(hi) - 8)}" text-anchor="middle" font-size="12.4" fill="${TEAL}">${f2(hi)}</text>
    <text x="${R.x + 62}" y="${f1(yd(lo) + 16)}" text-anchor="middle" font-size="12.4" fill="${TEAL}">${f2(lo)}</text>
    <text x="${W / 2}" y="${H - 4}" text-anchor="middle" font-size="12.4" fill="${SLATE}">縦軸の単位 mmHg／右の縦線 ＝ 下がり幅の平均の95%区間</text>
  </svg>`;
  const cap = `左の6本の線は高さが大きく違いますが、どれも同じくらい右下がりです。人ごとに差をとると人どうしの違いが消え、右の下がり幅は3〜8にまとまります。`;
  return fig(svg, cap);
}

// ============ 1.17：両側の区間と片側の限界（標準正規分布で） ============
function oneSided(): string {
  const W = 340, H = 286;
  const t: Box = { x: 14, y: 30, w: 312, h: 84, xMin: -3.6, xMax: 3.6, yMax: 0.42 };
  const s: Box = { x: 14, y: 168, w: 312, h: 84, xMin: -3.6, xMax: 3.6, yMax: 0.42 };
  const f = (x: number) => normPdf(x);
  const cut = (b: Box, x: number, lab: string) => `<line x1="${f1(PX(b, x))}" y1="${f1(PY(b, f(x)) - 12)}" x2="${f1(PX(b, x))}" y2="${b.y + b.h}" stroke="${ROSE}" stroke-width="1.3" stroke-dasharray="4 3" /><text x="${f1(PX(b, x))}" y="${b.y + b.h + 15}" text-anchor="middle" font-size="12.4" font-weight="700" fill="${ROSE}">${lab}</text>`;
  const base = (b: Box) => `<line x1="${b.x}" y1="${b.y + b.h}" x2="${b.x + b.w}" y2="${b.y + b.h}" stroke="${SLATE}" stroke-width="1" />`;
  const svg = `${svgOpen(W, H, '上は両側の区間で、左右の裾に2.5%ずつ残し端は±1.96。下は片側の限界で、右の裾だけに5%を残し端は1.645')}
    <text x="4" y="16" font-size="12.4" font-weight="700" fill="${INK}">両側の区間：左右に 2.5% ずつ</text>
    ${area(t, f, -1.96, 1.96, INDIGO, 0.2)}${area(t, f, -3.6, -1.96, ROSE, 0.5)}${area(t, f, 1.96, 3.6, ROSE, 0.5)}${curve(t, f, INDIGO, -3.6, 3.6, 2)}${base(t)}
    ${cut(t, -1.96, '−1.96')}${cut(t, 1.96, '1.96')}
    <text x="${f1(PX(t, 0))}" y="${f1(PY(t, 0.12))}" text-anchor="middle" font-size="12.4" font-weight="700" fill="${INDIGO}">95%</text>
    <text x="4" y="${s.y - 14}" font-size="12.4" font-weight="700" fill="${INK}">片側の限界：右だけに 5%</text>
    ${area(s, f, -3.6, 1.645, INDIGO, 0.2)}${area(s, f, 1.645, 3.6, ROSE, 0.5)}${curve(s, f, INDIGO, -3.6, 3.6, 2)}${base(s)}
    ${cut(s, 1.645, '1.645')}
    <text x="${f1(PX(s, -0.3))}" y="${f1(PY(s, 0.12))}" text-anchor="middle" font-size="12.4" font-weight="700" fill="${INDIGO}">95%</text>
    <text x="${f1(PX(s, 2.75))}" y="${f1(PY(s, 0.1))}" text-anchor="middle" font-size="12.4" font-weight="700" fill="${ROSE}">5%</text>
    <text x="${W / 2}" y="${H - 4}" text-anchor="middle" font-size="12.4" fill="${SLATE}">横軸 ＝ (X̄ − μ) ÷ 標準誤差</text>
  </svg>`;
  const cap = `片側の限界は、外れる5%を片方の裾にまとめます。端が1.96から1.645に下がるので、「最低でもこれ以上」と言える値が、両側の区間の下端より内側に来ます。`;
  return fig(svg, cap);
}

// ============ 1.17：母比率の区間の被覆確率（20人・正規近似の式） ============
function waldCoverage(): string {
  const W = 340, H = 236, n = 20;
  const b: Box = { x: 40, y: 24, w: 286, h: 160, xMin: 0, xMax: 1, yMax: 1 };
  const yc = (c: number) => b.y + b.h - c * b.h;
  const cov = (p: number) => {
    let c = 0;
    for (let k = 0; k <= n; k++) {
      const q = k / n, h = 1.96 * Math.sqrt((q * (1 - q)) / n);
      if (q - h <= p && p <= q + h) c += binom(n, p, k);
    }
    return c;
  };
  const pts: string[] = [];
  for (let i = 4; i <= 396; i++) { const p = i / 400; pts.push(`${f1(PX(b, p))},${f1(yc(cov(p)))}`); }
  const c05 = cov(0.05);
  const svg = `${svgOpen(W, H, `20人に聞いて正規近似の式で作った95%区間が、真の比率を含む割合。pが0.5付近では95%前後だが、pが0や1に近いと大きく下がり、p＝0.05で${pct(c05, 0)}`)}
    ${[0, 0.5, 0.95].map((v) => `<text x="${b.x - 6}" y="${f1(yc(v) + 4)}" text-anchor="end" font-size="12.4" fill="${v === 0.95 ? ROSE : SLATE}">${pct(v, 0)}</text>`).join('')}
    <line x1="${b.x}" y1="${f1(yc(0.95))}" x2="${b.x + b.w}" y2="${f1(yc(0.95))}" stroke="${ROSE}" stroke-width="1.3" stroke-dasharray="4 3" />
    <line x1="${b.x}" y1="${b.y}" x2="${b.x}" y2="${b.y + b.h}" stroke="${SLATE}" stroke-width="1" />
    <polyline points="${pts.join(' ')}" fill="none" stroke="${INDIGO}" stroke-width="1.4" />
    <circle cx="${f1(PX(b, 0.05))}" cy="${f1(yc(c05))}" r="4" fill="${ROSE}" />
    <text x="${f1(PX(b, 0.05) + 8)}" y="${f1(yc(c05) + 4)}" font-size="12.4" font-weight="700" fill="${ROSE}">p ＝ 0.05 で ${pct(c05, 0)}</text>
    ${axes(b, [0, 0.25, 0.5, 0.75, 1])}
    <text x="${W / 2}" y="${H - 4}" text-anchor="middle" font-size="12.4" fill="${SLATE}">横軸 ＝ 真の比率 p／縦軸 ＝ 区間が p を含む確率</text>
  </svg>`;
  const cap = `20人の結果は0〜20人の21通りしかないので、線はギザギザになります。公称は95%でも、p が0や1に近いと大きく下回ります。確率は二項分布から正確に計算しました。`;
  return fig(svg, cap);
}

// ============ 3.6：ジャックナイフ法（5個のデータを1個ずつ除く） ============
function jackknife(): string {
  const W = 340, H = 236, xs = [3, 5, 6, 8, 13];
  const b: Box = { x: 20, y: 30, w: 236, h: 160, xMin: 2, xMax: 14, yMax: 1 };
  const mean = (a: number[]) => a.reduce((s, v) => s + v, 0) / a.length;
  const rows = xs.map((_, i) => {
    const y = b.y + 14 + i * 30, rest = xs.filter((_, j) => j !== i), m = mean(rest);
    return `${xs.map((x, j) => j === i
      ? `<circle cx="${f1(PX(b, x))}" cy="${y}" r="4.6" fill="none" stroke="${ROSE}" stroke-width="1.6" />`
      : `<circle cx="${f1(PX(b, x))}" cy="${y}" r="4.6" fill="${INDIGO}" />`).join('')}
    <line x1="${f1(PX(b, m))}" y1="${y - 10}" x2="${f1(PX(b, m))}" y2="${y + 10}" stroke="${AMBER}" stroke-width="2.4" />
    <text x="${b.x + b.w + 14}" y="${y + 4}" font-size="12.4" fill="${INK}">${m}</text>`;
  }).join('');
  const svg = `${svgOpen(W, H, '5個のデータ3,5,6,8,13から1個ずつ除いた5通りの平均は8,7.5,7.25,6.75,5.5。13を除いたときに最も大きく動く')}
    <text x="${b.x + b.w + 14}" y="${b.y - 10}" font-size="12.4" font-weight="700" fill="${AMBER}">残りの平均</text>
    <line x1="${f1(PX(b, 7))}" y1="${b.y - 2}" x2="${f1(PX(b, 7))}" y2="${b.y + b.h - 8}" stroke="${SLATE}" stroke-width="1.2" stroke-dasharray="4 3" />
    <text x="${f1(PX(b, 7))}" y="${b.y - 8}" text-anchor="middle" font-size="12.4" fill="${SLATE}">全体の平均 7</text>
    ${rows}
    ${axes(b, [2, 4, 6, 8, 10, 12, 14])}
    <text x="${W / 2}" y="${H - 4}" text-anchor="middle" font-size="12.4" fill="${SLATE}">白抜き ＝ 除いた1個／縦線 ＝ 残り4個の平均</text>
  </svg>`;
  const cap = `1行に1通りずつ、白抜きの1個を除いて残り4個の平均を縦線で示しました。離れた13を除くと平均が大きく動きます。この動き方の大きさから標準誤差を見積もります。`;
  return fig(svg, cap);
}

// ============ 1.17：比率の差（それぞれの区間は重なるが、差の区間は0を含まない） ============
function ciAd(): string {
  const W = 340, H = 262, p1 = 0.12, p2 = 0.09, n = 1000;
  const h1 = 1.96 * Math.sqrt((p1 * (1 - p1)) / n), h2 = 1.96 * Math.sqrt((p2 * (1 - p2)) / n);
  const se = Math.sqrt((p1 * (1 - p1)) / n + (p2 * (1 - p2)) / n), h = 1.96 * se, d = p1 - p2;
  const top: Box = { x: 70, y: 30, w: 256, h: 64, xMin: 6, xMax: 16, yMax: 1 };
  const bot: Box = { x: 70, y: 158, w: 256, h: 50, xMin: -1, xMax: 7, yMax: 1 };
  const row = (b: Box, y: number, m: number, hw: number, lab: string, c: string) => `
    <text x="${b.x - 8}" y="${y + 4}" text-anchor="end" font-size="12.4" fill="${INK}">${lab}</text>
    <line x1="${f1(PX(b, m - hw))}" y1="${y}" x2="${f1(PX(b, m + hw))}" y2="${y}" stroke="${c}" stroke-width="4" stroke-linecap="round" />
    <circle cx="${f1(PX(b, m))}" cy="${y}" r="4.5" fill="${INK}" />`;
  const oL = 100 * (p1 - h1), oR = 100 * (p2 + h2), bl = bot.y + bot.h;
  const svg = `${svgOpen(W, H, '案Aのクリック率12%の区間10.0から14.0%と案Bの9%の区間7.2から10.8%は一部が重なる。それでも差3ポイントの95%信頼区間0.3から5.7ポイントは0を含まない')}
    <text x="4" y="16" font-size="12.4" font-weight="700" fill="${INK}">それぞれのクリック率（%）と95%区間</text>
    <rect x="${f1(PX(top, oL))}" y="${top.y}" width="${f1(PX(top, oR) - PX(top, oL))}" height="${top.h}" fill="${ROSE}" fill-opacity="0.12" />
    <text x="${f1((PX(top, oL) + PX(top, oR)) / 2)}" y="${top.y + 32}" text-anchor="middle" font-size="12.4" font-weight="700" fill="${ROSE}">重なる</text>
    ${row(top, top.y + 12, 100 * p1, 100 * h1, '案A', INDIGO)}${row(top, top.y + 52, 100 * p2, 100 * h2, '案B', AMBER)}
    ${axes(top, [6, 8, 10, 12, 14, 16])}
    <text x="4" y="${bot.y - 22}" font-size="12.4" font-weight="700" fill="${INK}">差 A − B の95%信頼区間（ポイント）</text>
    <line x1="${f1(PX(bot, 0))}" y1="${bot.y - 10}" x2="${f1(PX(bot, 0))}" y2="${bl}" stroke="${ROSE}" stroke-width="1.4" stroke-dasharray="4 3" />
    <text x="${f1(PX(bot, 0) - 5)}" y="${bot.y - 1}" text-anchor="end" font-size="12.4" fill="${ROSE}">差 0</text>
    ${row(bot, bl - 20, 100 * d, 100 * h, 'A − B', TEAL)}
    <text x="${f1(PX(bot, 100 * (d - h)))}" y="${bl - 30}" text-anchor="middle" font-size="12.4" font-weight="700" fill="${TEAL}">${(100 * (d - h)).toFixed(1)}</text>
    <text x="${f1(PX(bot, 100 * (d + h)))}" y="${bl - 30}" text-anchor="middle" font-size="12.4" font-weight="700" fill="${TEAL}">${(100 * (d + h)).toFixed(1)}</text>
    ${axes(bot, [-1, 0, 1, 2, 3, 4, 5, 6, 7])}
    <text x="${W / 2}" y="${H - 4}" text-anchor="middle" font-size="12.4" fill="${SLATE}">差の標準誤差 ＝ √(1.03² ＋ 0.90²) ＝ ${(100 * se).toFixed(2)} ポイント</text>
  </svg>`;
  const cap = `上の2本の区間は ${oL.toFixed(1)}〜${oR.toFixed(1)}% の範囲で重なっていますが、下の差の区間は0を含みません。`;
  return fig(svg, cap);
}

// ============ 1.18：検出力（50人ずつと82人ずつ、2つの山と境界） ============
function powerDesign(): string {
  const W = 340, H = 306, sd = 8, delta = 3.5;
  const panel = (n: number, y0: number, showSplit: boolean) => {
    const se = sd * Math.sqrt(2 / n), c = 1.96 * se, pw = Phi((delta - c) / se) + Phi((-c - delta) / se);
    const b: Box = { x: 14, y: y0 + 22, w: 312, h: 76, xMin: -4, xMax: 8, yMax: 0.34 };
    const f0 = (x: number) => normPdf(x, 0, se), f1d = (x: number) => normPdf(x, delta, se);
    const base = b.y + b.h;
    return `
    <text x="4" y="${y0 + 12}" font-size="12.4" font-weight="700" fill="${INK}">${n}人ずつ（標準誤差 ${f2(se)}）：検出力 ${f2(pw)}</text>
    ${area(b, f1d, -4, c, SLATE, 0.32)}${area(b, f1d, c, 8, TEAL, 0.22)}
    ${area(b, f0, c, 8, ROSE, 0.55)}${area(b, f0, -4, -c, ROSE, 0.55)}
    ${curve(b, f0, INDIGO)}${curve(b, f1d, TEAL)}
    <line x1="${f1(PX(b, c))}" y1="${b.y - 4}" x2="${f1(PX(b, c))}" y2="${base}" stroke="${INK}" stroke-width="1.2" stroke-dasharray="4 3" />
    <text x="${f1(PX(b, c) + 4)}" y="${b.y + 6}" font-size="12.4" fill="${INK}" stroke="#fff" stroke-width="4" paint-order="stroke">境界 ${f2(c)}</text>
    <text x="${f1(PX(b, -2.4))}" y="${b.y + 30}" text-anchor="end" font-size="12.4" font-weight="700" fill="${INDIGO}">差 0</text>
    <text x="${f1(PX(b, 5.6))}" y="${b.y + 30}" text-anchor="start" font-size="12.4" font-weight="700" fill="${TEAL}">差 3.5</text>
    <text x="${f1(PX(b, c - 0.45))}" y="${base - 5}" text-anchor="middle" font-size="12.4" font-weight="700" fill="${INK}" stroke="#fff" stroke-width="3" paint-order="stroke">β</text>
    ${showSplit ? `
    <line x1="${f1(PX(b, 0))}" y1="${base + 28}" x2="${f1(PX(b, c))}" y2="${base + 28}" stroke="${INDIGO}" stroke-width="2" />
    <line x1="${f1(PX(b, c))}" y1="${base + 28}" x2="${f1(PX(b, delta))}" y2="${base + 28}" stroke="${TEAL}" stroke-width="2" />
    ${[0, c, delta].map((x) => `<line x1="${f1(PX(b, x))}" y1="${base + 23}" x2="${f1(PX(b, x))}" y2="${base + 33}" stroke="${INK}" stroke-width="1.2" />`).join('')}
    <text x="${f1(PX(b, c / 2))}" y="${base + 46}" text-anchor="middle" font-size="12.4" fill="${INDIGO}">1.96 × SE</text>
    <text x="${f1(PX(b, delta) + 4)}" y="${base + 46}" text-anchor="start" font-size="12.4" fill="${TEAL}">0.84 × SE</text>` : ``}
    ${axes(b, [-4, -2, 0, 2, 4, 6, 8])}`;
  };
  const svg = `${svgOpen(W, H, '差が0の山と差が3.5の山。50人ずつでは境界3.14の右に出る確率が0.59、82人ずつでは山が細くなり境界2.45で検出力0.80。境界までの距離は1.96SEと0.84SEの和')}
    ${panel(50, 0, false)}
    ${panel(82, 136, true)}
    <text x="${W / 2}" y="${H - 4}" text-anchor="middle" font-size="12.4" fill="${SLATE}">赤 ＝ α（両側で5%）／灰 ＝ β／緑 ＝ 検出力</text>
  </svg>`;
  const cap = `横軸は観測される差（mmHg）。青の山は差が本当に0のとき、緑の山は差が本当に3.5のときの分布です。境界より外に出たら棄却します。人数を増やすと2つの山が細くなり、同じ α のまま検出力が上がります。下段では、境界までの 1.96 個分と、境界から 3.5 までの 0.84 個分の標準誤差が、差 3.5 をちょうど埋めています。`;
  return fig(svg, cap);
}

// ============ 1.18：検出力曲線（本当の差ごとの検出力、人数3通り） ============
function powerCurve(): string {
  const W = 340, H = 250, sd = 8, delta = 3.5;
  const b: Box = { x: 40, y: 24, w: 282, h: 176, xMin: 0, xMax: 8, yMax: 1 };
  const ns = [[20, SLATE], [50, INDIGO], [82, TEAL]] as const;
  const pw = (n: number) => (d: number) => { const se = sd * Math.sqrt(2 / n), c = 1.96 * se; return Phi((d - c) / se) + Phi((-c - d) / se); };
  const grid = [0.05, 0.5, 0.8, 1].map((v) => `<line x1="${b.x}" y1="${f1(PY(b, v))}" x2="${b.x + b.w}" y2="${f1(PY(b, v))}" stroke="#e2e8f0" />
    <text x="${b.x - 6}" y="${f1(PY(b, v) + 4)}" text-anchor="end" font-size="12.4" fill="${SLATE}">${v}</text>`).join('');
  const dots = ns.map(([n, c]) => { const v = pw(n)(delta); return `<circle cx="${f1(PX(b, delta))}" cy="${f1(PY(b, v))}" r="4" fill="${c}" />
    <text x="${f1(PX(b, delta) - 7)}" y="${f1(PY(b, v) + 4)}" text-anchor="end" font-size="12.4" font-weight="700" fill="${c}" stroke="#fff" stroke-width="4" paint-order="stroke">${f2(v)}</text>`; }).join('');
  const legend = ns.map(([n, c], i) => `<line x1="${b.x + 196}" y1="${b.y + 112 + i * 18}" x2="${b.x + 216}" y2="${b.y + 112 + i * 18}" stroke="${c}" stroke-width="2.4" />
    <text x="${b.x + 222}" y="${b.y + 116 + i * 18}" font-size="12.4" fill="${c}">${n}人ずつ</text>`).join('');
  const svg = `${svgOpen(W, H, '本当の差が0から8までの検出力。差0ではどれも0.05。差3.5で20人ずつ0.28、50人ずつ0.59、82人ずつ0.80')}
    ${grid}
    <line x1="${f1(PX(b, delta))}" y1="${b.y}" x2="${f1(PX(b, delta))}" y2="${b.y + b.h}" stroke="${SLATE}" stroke-width="1" stroke-dasharray="3 3" />
    ${ns.map(([n, c]) => curve(b, pw(n), c, 0, 8, 2.2)).join('')}
    ${dots}${legend}
    ${axes(b, [0, 1, 2, 3, 3.5, 4, 5, 6, 7, 8].filter((t) => t !== 3 && t !== 4))}
    <text x="${b.x - 34}" y="${b.y - 10}" font-size="12.4" fill="${SLATE}">検出力</text>
    <text x="${b.x + b.w / 2}" y="${H - 4}" text-anchor="middle" font-size="12.4" fill="${SLATE}">本当の差（mmHg）</text>
  </svg>`;
  const cap = `標準偏差 8、有意水準 5%（両側）で2群を比べたときの検出力です。差が0の左端ではどの線も 0.05 で、これは第1種の過誤の確率です。`;
  return fig(svg, cap);
}

// ============ 2.1：重み付き最小二乗法（大きい店ほど振れ幅が大きい） ============
function wls(): string {
  const W = 340, H = 250;
  const xs = Array.from({ length: 40 }, (_, i) => 10 + Math.round((90 * i) / 39));
  const ys = [7.8, 9.1, 9.4, 10.3, 13.5, 10.8, 10.9, 17, 18.4, 17.9, 20, 13.2, 21.9, 23.4, 20.1, 25.4, 22.6, 29.3, 28.3, 25.3, 30, 29.7, 36.1, 41.3, 37.9, 45.2, 33.3, 34.1, 41.2, 45.1, 45, 56.2, 43, 41.5, 45.3, 41.4, 50.1, 50.3, 59, 47.1];
  const fit = (w: number[]) => {
    let sw = 0, sx = 0, sy = 0, sxx = 0, sxy = 0;
    xs.forEach((x, i) => { sw += w[i]; sx += w[i] * x; sy += w[i] * ys[i]; sxx += w[i] * x * x; sxy += w[i] * x * ys[i]; });
    const b1 = (sw * sxy - sx * sy) / (sw * sxx - sx * sx);
    return [(sy - b1 * sx) / sw, b1];
  };
  const o = fit(xs.map(() => 1)), g = fit(xs.map((x) => 1 / (x * x)));
  const b: Box = { x: 36, y: 20, w: 290, h: 184, xMin: 0, xMax: 100, yMax: 70 };
  const PYv = (v: number) => b.y + b.h - (v / 70) * b.h;
  const band = [...xs.map((x) => `${f1(PX(b, x))},${f1(PYv(2 + 0.5 * x + 0.16 * x))}`), ...[...xs].reverse().map((x) => `${f1(PX(b, x))},${f1(PYv(2 + 0.5 * x - 0.16 * x))}`)].join(' ');
  const line = (c: number[], col: string, dash = '') => `<line x1="${f1(PX(b, 5))}" y1="${f1(PYv(c[0] + c[1] * 5))}" x2="${f1(PX(b, 100))}" y2="${f1(PYv(c[0] + c[1] * 100))}" stroke="${col}" stroke-width="2.2"${dash ? ` stroke-dasharray="${dash}"` : ''} />`;
  const svg = `${svgOpen(W, H, '店の広さ10から100平方メートルの40店の売上。広い店ほど点の散らばりが大きい。最小二乗法と重み付き最小二乗法の直線はほぼ重なる')}
    ${[0, 20, 40, 60].map((v) => `<line x1="${b.x}" y1="${f1(PYv(v))}" x2="${b.x + b.w}" y2="${f1(PYv(v))}" stroke="#e2e8f0" /><text x="${b.x - 6}" y="${f1(PYv(v) + 4)}" text-anchor="end" font-size="12.4" fill="${SLATE}">${v}</text>`).join('')}
    <polygon points="${band}" fill="${INDIGO}" fill-opacity="0.07" />
    ${xs.map((x, i) => `<circle cx="${f1(PX(b, x))}" cy="${f1(PYv(ys[i]))}" r="${f1(1.6 + 30 / x)}" fill="${INDIGO}" fill-opacity="0.7" />`).join('')}
    ${line(o, AMBER, '6 4')}${line(g, TEAL)}
    <text x="${b.x + 4}" y="${b.y + 12}" font-size="12.4" fill="${AMBER}">点線 ＝ 最小二乗法（傾き ${o[1].toFixed(3)}）</text>
    <text x="${b.x + 4}" y="${b.y + 30}" font-size="12.4" fill="${TEAL}">実線 ＝ 重み付き（傾き ${g[1].toFixed(3)}）</text>
    ${axes(b, [0, 20, 40, 60, 80, 100])}
    <text x="${b.x - 30}" y="${b.y - 6}" font-size="12.4" fill="${SLATE}">売上</text>
    <text x="${b.x + b.w / 2}" y="${H - 4}" text-anchor="middle" font-size="12.4" fill="${SLATE}">店の広さ（㎡）　点が大きいほど重みが大きい</text>
  </svg>`;
  const cap = `模擬データです（真の直線は 売上 ＝ 2 ＋ 0.5 × 広さ、誤差の標準偏差は広さの 0.08 倍）。薄い帯は真の直線から標準偏差2つ分の範囲で、右へ行くほど広がります。重み付き最小二乗法は、散らばりの小さい左側の店を重く数えます。`;
  return fig(svg, cap);
}


// ============ 2.1b：Lasso のひし形と Ridge の円に、残差平方和の等高線が触れる点 ============
function lassoRidge(): string {
  const W = 340, H = 248, bh = [2, 0.4], rho = 0.5, t = 1.5;
  // 残差平方和は最小二乗推定量 bh からのずれの2次式（説明変数の相関 rho）
  const rss = (p: number[]) => { const d0 = p[0] - bh[0], d1 = p[1] - bh[1]; return d0 * d0 + 2 * rho * d0 * d1 + d1 * d1; };
  const best = (edge: (s: number) => number[]) => {
    let m = edge(0), v = rss(m);
    for (let i = 1; i <= 4000; i++) { const p = edge((2 * Math.PI * i) / 4000); if (rss(p) < v) { v = rss(p); m = p; } }
    return m;
  };
  const diamond = (s: number) => { const c = Math.cos(s), d = Math.sin(s), k = t / (Math.abs(c) + Math.abs(d)); return [k * c, k * d]; };
  const circle = (s: number) => [t * Math.cos(s), t * Math.sin(s)];
  const lo = -1.6, hi = 2.8, S = 136, top = 46;
  const panel = (x0: number, name: string, col: string, shape: (s: number) => number[]) => {
    const p = best(shape), c = rss(p);
    const X = (v: number) => x0 + ((v - lo) / (hi - lo)) * S, Y = (v: number) => top + S - ((v - lo) / (hi - lo)) * S;
    const ring = Array.from({ length: 121 }, (_, i) => { const s = (2 * Math.PI * i) / 120, u = [Math.cos(s), Math.sin(s)], r = Math.sqrt(c / rss([bh[0] + u[0], bh[1] + u[1]])); return `${f1(X(bh[0] + r * u[0]))},${f1(Y(bh[1] + r * u[1]))}`; }).join(' ');
    const region = Array.from({ length: 121 }, (_, i) => { const q = shape((2 * Math.PI * i) / 120); return `${f1(X(q[0]))},${f1(Y(q[1]))}`; }).join(' ');
    const p1 = Math.abs(p[1]) < 0.005 ? 0 : p[1];
    return { p, svg: `
    <text x="${x0 + S / 2}" y="16" text-anchor="middle" font-size="12.4" font-weight="700" fill="${col}">${name}</text>
    <line x1="${X(lo)}" y1="${f1(Y(0))}" x2="${X(hi)}" y2="${f1(Y(0))}" stroke="${SLATE}" />
    <line x1="${f1(X(0))}" y1="${Y(lo)}" x2="${f1(X(0))}" y2="${Y(hi)}" stroke="${SLATE}" />
    ${[-1, 1].map((v) => `<text x="${f1(X(v))}" y="${f1(Y(0) + 14)}" text-anchor="middle" font-size="12" fill="${SLATE}" stroke="#fff" stroke-width="3" paint-order="stroke">${v}</text>`).join('')}
    ${[-1, 1, 2].map((v) => `<text x="${f1(X(0) - 4)}" y="${f1(Y(v) + 4)}" text-anchor="end" font-size="12" fill="${SLATE}" stroke="#fff" stroke-width="3" paint-order="stroke">${v}</text>`).join('')}
    <text x="${f1(X(0) + 5)}" y="${Y(hi) + 10}" font-size="12.4" fill="${INK}">β₂</text>
    <polygon points="${region}" fill="${col}" fill-opacity="0.16" stroke="${col}" stroke-width="1.6" />
    <polygon points="${ring}" fill="none" stroke="${AMBER}" stroke-width="1.8" />
    <circle cx="${f1(X(bh[0]))}" cy="${f1(Y(bh[1]))}" r="3.5" fill="${AMBER}" />
    <circle cx="${f1(X(p[0]))}" cy="${f1(Y(p[1]))}" r="4.5" fill="${INK}" />
    <text x="${x0 + S / 2}" y="${top + S + 34}" text-anchor="middle" font-size="12" font-weight="700" fill="${INK}">答え (${f2(p[0])}, ${f2(p1)})</text>` };
  };
  const L = panel(18, 'Lasso：ひし形', INDIGO, diamond), R = panel(184, 'Ridge：円', TEAL, circle);
  const svg = `${svgOpen(W, H, `係数2つの平面。オレンジの点が最小二乗推定量 (2, 0.4)、オレンジの楕円は残差平方和の等高線。Lasso のひし形には角 (${f2(L.p[0])}, 0) で触れ、β₂ がちょうど0になる。Ridge の円には (${f2(R.p[0])}, ${f2(R.p[1])}) で触れ、β₂ は0にならない`)}
    <text x="${W / 2}" y="34" text-anchor="middle" font-size="12" fill="${AMBER}">● 最小二乗推定量 (β₁, β₂) = (2, 0.4)　◯ 等高線</text>
    ${L.svg}${R.svg}
    <text x="${W / 2}" y="${H - 2}" text-anchor="middle" font-size="12" fill="${SLATE}">横軸 β₁・縦軸 β₂</text>
  </svg>`;
  const cap = `係数が2つ、説明変数の相関が 0.5 の模擬の例です。どちらも係数の大きさを ${t} 以下に抑えた範囲（Lasso は |β₁|＋|β₂| ≤ ${t}、Ridge は β₁²＋β₂² ≤ ${t}²）の中で、残差平方和が最も小さい点（等高線が範囲に初めて触れる黒い点）が答えです。Lasso は角で触れて β₂ がちょうど 0、Ridge は β₂ が ${f2(R.p[1])} に縮むだけで 0 になりません。`;
  return fig(svg, cap);
}

// ============ 1.13：合計3人と分かれば、内訳の確率は λ によらない ============
function suffPoisson(): string {
  const W = 340, H = 236, lams = [1, 3], cols = [INDIGO, TEAL];
  const splits = [[0, 3], [1, 2], [2, 1], [3, 0]];
  const fact = (k: number) => [1, 1, 2, 6][k];
  const joint = (l: number, s: number[]) => Math.exp(-2 * l) * l ** 3 / (fact(s[0]) * fact(s[1]));
  const panel = (x0: number, title: string, val: (l: number, s: number[]) => number, yMax: number, ticks: number[], fmt: (v: number) => string) => {
    const bx = { x: x0, y: 44, w: 132, h: 130 };
    const Y = (v: number) => bx.y + bx.h - (v / yMax) * bx.h;
    const gw = bx.w / 4;
    return `<text x="${x0 + bx.w / 2}" y="16" text-anchor="middle" font-size="12.4" font-weight="700" fill="${INK}">${title}</text>
    ${ticks.map((v) => `<line x1="${bx.x}" y1="${f1(Y(v))}" x2="${bx.x + bx.w}" y2="${f1(Y(v))}" stroke="#e2e8f0" /><text x="${bx.x - 4}" y="${f1(Y(v) + 4)}" text-anchor="end" font-size="12" fill="${SLATE}">${fmt(v)}</text>`).join('')}
    ${splits.map((s, i) => lams.map((l, j) => { const v = val(l, s), x = bx.x + i * gw + 5 + j * 12; return `<rect x="${f1(x)}" y="${f1(Y(v))}" width="11" height="${f1(bx.y + bx.h - Y(v))}" fill="${cols[j]}" fill-opacity="0.8" />`; }).join('') + `<text x="${f1(bx.x + i * gw + gw / 2)}" y="${bx.y + bx.h + 15}" text-anchor="middle" font-size="12" fill="${SLATE}">(${s[0]},${s[1]})</text>`).join('')}
    <line x1="${bx.x}" y1="${bx.y + bx.h}" x2="${bx.x + bx.w}" y2="${bx.y + bx.h}" stroke="${SLATE}" />`;
  };
  const svg = `${svgOpen(W, H, '2時間の客数の内訳4通り。左は内訳の確率で、λ=1 と λ=3 で高さが違う。右は合計3人と分かったときの内訳の確率で、どちらの λ でも 1/8・3/8・3/8・1/8 と同じ')}
    <text x="${W / 2}" y="34" text-anchor="middle" font-size="12"><tspan fill="${INDIGO}">■ λ = 1</tspan>　<tspan fill="${TEAL}">■ λ = 3</tspan></text>
    ${panel(34, '内訳の確率', joint, 0.08, [0, 0.04, 0.08], (v) => String(v))}
    ${panel(200, '合計3人のときの内訳', (l, s) => joint(l, s) / (Math.exp(-2 * l) * (2 * l) ** 3 / 6), 0.5, [0, 0.25, 0.5], (v) => String(v))}
    <text x="${W / 2}" y="${H - 4}" text-anchor="middle" font-size="12" fill="${SLATE}">(1時間目, 2時間目) の人数・合計はどれも3人</text>
  </svg>`;
  const cap = `左は内訳ごとの確率で、λ によって高さが変わります（λ = 3 では約半分）。右は合計が3人と分かったときの確率で、どちらの λ でも 1/8・3/8・3/8・1/8 と同じです。合計が分かれば、内訳を見ても λ について何も分かりません。`;
  return fig(svg, cap);
}

// ============ 1.13：割合のぶれを、累積分布関数の傾きで中央値のぶれに直す ============
function medianCdf(): string {
  const W = 340, H = 250, n = 25, e = 1 / (2 * Math.sqrt(n)), r3 = Math.sqrt(3), BROWN = '#b45309';
  const b = { x: 44, y: 40, w: 286, h: 170, xMin: -1, xMax: 1, yMax: 1 };
  const p0 = 0.2, p1 = 0.8;
  const X = (x: number) => b.x + ((x - b.xMin) / (b.xMax - b.xMin)) * b.w, Y = (p: number) => b.y + b.h - ((p - p0) / (p1 - p0)) * b.h;
  const Fu = (x: number) => (x + r3) / (2 * r3);
  const path = (F: (x: number) => number) => Array.from({ length: 81 }, (_, i) => { const x = -0.82 + (1.64 * i) / 80; return `${i ? 'L' : 'M'}${f1(X(x))},${f1(Y(F(x)))}`; }).join('');
  const dn = e / normPdf(0), du = e * 2 * r3;
  const drop = (d: number, col: string, dy: number) => [-d, d].map((x) => `<line x1="${f1(X(x))}" y1="${f1(Y(x > 0 ? 0.5 + e : 0.5 - e))}" x2="${f1(X(x))}" y2="${b.y + b.h + dy}" stroke="${col}" stroke-width="1.2" stroke-dasharray="3 3" />`).join('')
    + `<line x1="${f1(X(-d))}" y1="${b.y + b.h + dy}" x2="${f1(X(d))}" y2="${b.y + b.h + dy}" stroke="${col}" stroke-width="5" />`;
  const svg = `${svgOpen(W, H, `累積分布関数の真ん中を拡大。縦の0.4から0.6の帯（25個のうち中央値以下に来る割合のぶれ）が、正規分布では横の ±${f2(dn)}、一様分布では ±${f2(du)} に写る`)}
    <text x="4" y="14" font-size="12.4" font-weight="700" fill="${INDIGO}">正規（傾き 0.40）→ 中央値のぶれ ±${f2(dn)}</text>
    <text x="4" y="31" font-size="12.4" font-weight="700" fill="${BROWN}">一様（傾き 0.29）→ 中央値のぶれ ±${f2(du)}</text>
    <rect x="${b.x}" y="${f1(Y(0.5 + e))}" width="${b.w}" height="${f1(Y(0.5 - e) - Y(0.5 + e))}" fill="${AMBER}" fill-opacity="0.15" />
    ${[0.2, 0.4, 0.5, 0.6, 0.8].map((p) => `<text x="${b.x - 5}" y="${f1(Y(p) + 4)}" text-anchor="end" font-size="12" fill="${SLATE}">${p}</text>`).join('')}
    <text x="${b.x + 4}" y="${f1(Y(0.5) + 4)}" font-size="12" fill="${AMBER}">割合のぶれ 0.5 ± ${e}</text>
    <path d="${path(Fu)}" fill="none" stroke="${BROWN}" stroke-width="2" />
    <path d="${path(Phi)}" fill="none" stroke="${INDIGO}" stroke-width="2.2" />
    ${drop(du, BROWN, -4)}${drop(dn, INDIGO, -11)}
    <line x1="${b.x}" y1="${b.y + b.h}" x2="${b.x + b.w}" y2="${b.y + b.h}" stroke="${SLATE}" />
    ${[-0.5, 0, 0.5].map((t) => `<text x="${f1(X(t))}" y="${b.y + b.h + 16}" text-anchor="middle" font-size="12" fill="${SLATE}">${t}</text>`).join('')}
    <text x="${b.x + b.w / 2}" y="${H - 4}" text-anchor="middle" font-size="12" fill="${SLATE}">x（どちらも平均0・分散1）　縦軸は F(x)</text>
  </svg>`;
  const cap = `25個のうち中央値以下に来る割合は、0.5 のまわりで標準偏差 ${e} ぶれます（橙の帯）。この帯を曲線で横軸に写した幅が中央値のぶれで、真ん中の傾き f(m) が急な正規分布ほど狭くなります。`;
  return fig(svg, cap);
}

// ============ 1.19：ネイマン・ピアソンの棄却域（2つの山と尤度比） ============
function npRegion(): string {
  const W = 340, H = 330, se = 0.2, mu1 = 0.5, k = 1.6449 * se;
  const b: Box = { x: 14, y: 40, w: 312, h: 100, xMin: -0.6, xMax: 1.1, yMax: 2.1 };
  const f0 = (x: number) => normPdf(x, 0, se), f1d = (x: number) => normPdf(x, mu1, se);
  const pw = 1 - Phi((k - mu1) / se);
  // 下段：尤度比 Λ を対数目盛りで（1/1000 〜 1000）
  const lb = { x: 40, y: 196, w: 286, h: 96 };
  const LX = (x: number) => lb.x + ((x - b.xMin) / (b.xMax - b.xMin)) * lb.w;
  const lmin = -3, lmax = 3; // log10
  const LY = (v: number) => lb.y + lb.h - ((Math.max(lmin, Math.min(lmax, v)) - lmin) / (lmax - lmin)) * lb.h;
  const log10L = (x: number) => (25 * (mu1 * x - mu1 * mu1 / 2)) / Math.LN10;
  let d = '';
  for (let i = 0; i <= 120; i++) {
    const x = b.xMin + ((b.xMax - b.xMin) * i) / 120;
    const v = log10L(x);
    if (v < lmin || v > lmax) continue;
    d += `${d ? 'L' : 'M'}${f1(LX(x))},${f1(LY(v))}`;
  }
  const c = Math.exp(25 * (mu1 * k - mu1 * mu1 / 2));
  const yT = [[-2, '1/100'], [0, '1'], [2, '100']] as const;
  const svg = `${svgOpen(W, H, '上段は帰無仮説と対立仮説のもとでの標本平均の分布。標本平均が0.329を超えたら棄却し、αは0.05、検出力は0.80。下段は尤度比で、標本平均が大きいほど大きくなり、0.329でちょうど2.68になる')}
    <text x="4" y="14" font-size="12.4" font-weight="700" fill="${INK}">標本平均の分布（25個の平均）</text>
    ${area(b, f1d, k, 1.1, TEAL, 0.25)}${area(b, f0, k, 1.1, ROSE, 0.6)}
    ${curve(b, f0, INDIGO)}${curve(b, f1d, TEAL)}
    <text x="${f1(PX(b, -0.2))}" y="${f1(PY(b, 1.75))}" text-anchor="end" font-size="12.4" font-weight="700" fill="${INDIGO}">μ = 0</text>
    <text x="${f1(PX(b, 0.72))}" y="${f1(PY(b, 1.75))}" text-anchor="start" font-size="12.4" font-weight="700" fill="${TEAL}">μ = 0.5</text>
    <text x="${f1(PX(b, 0.72))}" y="${f1(PY(b, 1.4))}" text-anchor="start" font-size="12.4" fill="${TEAL}" stroke="#fff" stroke-width="3" paint-order="stroke">検出力 ${f2(pw)}</text>
    <text x="${f1(PX(b, 0.36))}" y="${f1(PY(b, 0.08) - 2)}" text-anchor="start" font-size="12.4" font-weight="700" fill="${ROSE}" stroke="#fff" stroke-width="3" paint-order="stroke">α</text>
    ${axes(b, [-0.5, 0, 0.5, 1])}
    <line x1="${f1(PX(b, k))}" y1="${b.y - 12}" x2="${f1(PX(b, k))}" y2="${lb.y + lb.h}" stroke="${INK}" stroke-width="1.2" stroke-dasharray="4 3" />
    <text x="${f1(PX(b, k) + 4)}" y="${b.y - 2}" font-size="12.4" fill="${INK}" stroke="#fff" stroke-width="4" paint-order="stroke">k = ${k.toFixed(3)}</text>
    <text x="4" y="${lb.y - 16}" font-size="12.4" font-weight="700" fill="${INK}">尤度比 Λ ＝ L(0.5) ／ L(0)（対数目盛り）</text>
    ${yT.map(([v, t]) => `<line x1="${lb.x}" y1="${f1(LY(v))}" x2="${lb.x + lb.w}" y2="${f1(LY(v))}" stroke="#e2e8f0" />
    <text x="${lb.x - 5}" y="${f1(LY(v) + 4)}" text-anchor="end" font-size="12.4" fill="${SLATE}">${t}</text>`).join('')}
    <line x1="${lb.x}" y1="${f1(LY(Math.log10(c)))}" x2="${lb.x + lb.w}" y2="${f1(LY(Math.log10(c)))}" stroke="${AMBER}" stroke-width="1.6" />
    <text x="${lb.x + 4}" y="${f1(LY(Math.log10(c)) - 5)}" font-size="12.4" font-weight="700" fill="${AMBER}" stroke="#fff" stroke-width="3" paint-order="stroke">c = ${c.toFixed(2)}</text>
    <path d="${d}" fill="none" stroke="${INK}" stroke-width="2" />
    <circle cx="${f1(LX(k))}" cy="${f1(LY(Math.log10(c)))}" r="4" fill="${AMBER}" />
    <line x1="${lb.x}" y1="${lb.y + lb.h}" x2="${lb.x + lb.w}" y2="${lb.y + lb.h}" stroke="${SLATE}" />
    ${[-0.5, 0, 0.5, 1].map((x) => `<text x="${f1(LX(x))}" y="${lb.y + lb.h + 16}" text-anchor="middle" font-size="12.4" fill="${SLATE}">${x}</text>`).join('')}
    <text x="${W / 2}" y="${H - 2}" text-anchor="middle" font-size="12.4" fill="${SLATE}">横軸はどちらも標本平均 x̄</text>
  </svg>`;
  const cap = `上段の赤は μ = 0 のときに棄却してしまう確率（α = 0.05）、緑は μ = 0.5 のときに棄却できる確率（検出力）です。下段の尤度比は x̄ が大きいほど大きくなるので、「Λ が ${c.toFixed(2)} を超える」と「x̄ が ${k.toFixed(3)} を超える」は同じ棄却域を指します。`;
  return fig(svg, cap);
}

// ============ 1.19：尤度比・ワルド・スコアを対数尤度の曲線で見る ============
function threeTests(): string {
  const W = 340, H = 300, n = 50, x = 32, p0 = 0.5, ph = x / n;
  const ll = (p: number) => x * Math.log(p) + (n - x) * Math.log(1 - p);
  const bx = { x: 44, y: 26, w: 282, h: 216 };
  const xMin = 0.38, xMax = 0.82, yMin = -38.4, yMax = -31.0;
  const X = (p: number) => bx.x + ((p - xMin) / (xMax - xMin)) * bx.w;
  const Y = (v: number) => bx.y + bx.h - ((v - yMin) / (yMax - yMin)) * bx.h;
  let d = '';
  for (let i = 0; i <= 100; i++) {
    const p = xMin + ((xMax - xMin) * i) / 100;
    const v = ll(p);
    if (v < yMin) continue;
    d += `${d ? 'L' : 'M'}${f1(X(p))},${f1(Y(v))}`;
  }
  const U = x / p0 - (n - x) / (1 - p0); // 28
  const tan = (p: number) => ll(p0) + U * (p - p0);
  const LR = 2 * (ll(ph) - ll(p0)), Wd = (ph - p0) ** 2 / (ph * (1 - ph) / n), S = U * U / (n / (p0 * (1 - p0)));
  const yAx = bx.y + bx.h;
  const svg = `${svgOpen(W, H, 'コイン50回で表32回のときの対数尤度の曲線。尤度比検定は山頂とp=0.5の高さの差、ワルド検定は山頂の位置と0.5の横の距離、スコア検定はp=0.5での曲線の傾きを測る')}
    ${[-38, -36, -34, -32].map((v) => `<line x1="${bx.x}" y1="${f1(Y(v))}" x2="${bx.x + bx.w}" y2="${f1(Y(v))}" stroke="#e2e8f0" />
    <text x="${bx.x - 5}" y="${f1(Y(v) + 4)}" text-anchor="end" font-size="12.4" fill="${SLATE}">${v}</text>`).join('')}
    <path d="${d}" fill="none" stroke="${INDIGO}" stroke-width="2.2" />
    <line x1="${f1(X(0.43))}" y1="${f1(Y(tan(0.43)))}" x2="${f1(X(0.57))}" y2="${f1(Y(tan(0.57)))}" stroke="${TEAL}" stroke-width="2" />
    <line x1="${f1(X(p0))}" y1="${f1(Y(ll(p0)))}" x2="${f1(X(ph))}" y2="${f1(Y(ll(p0)))}" stroke="${SLATE}" stroke-dasharray="3 3" />
    <line x1="${f1(X(ph))}" y1="${f1(Y(ll(p0)))}" x2="${f1(X(ph))}" y2="${f1(Y(ll(ph)))}" stroke="${ROSE}" stroke-width="2.6" />
    <line x1="${f1(X(p0))}" y1="${yAx - 14}" x2="${f1(X(ph))}" y2="${yAx - 14}" stroke="${AMBER}" stroke-width="2.6" />
    ${[p0, ph].map((p) => `<line x1="${f1(X(p))}" y1="${f1(Y(ll(p)))}" x2="${f1(X(p))}" y2="${yAx}" stroke="${SLATE}" stroke-width="1" stroke-dasharray="2 3" />
    <circle cx="${f1(X(p))}" cy="${f1(Y(ll(p)))}" r="3.6" fill="${INK}" />`).join('')}
    <text x="${f1(X(ph) + 6)}" y="${f1(Y(-31.45))}" font-size="12.4" font-weight="700" fill="${ROSE}">尤度比：高さの差</text>
    <text x="${f1(X(ph) + 6)}" y="${f1(Y(-31.45) + 16)}" font-size="12.4" fill="${ROSE}">${f2(ll(ph) - ll(p0))}（2倍で ${f2(LR)}）</text>
    <text x="${f1(X(ph) + 6)}" y="${yAx - 24}" font-size="12.4" font-weight="700" fill="${AMBER}">ワルド：横の距離</text>
    <text x="${f1(X(ph) + 6)}" y="${yAx - 8}" font-size="12.4" fill="${AMBER}">${f2(ph - p0)}（→ ${f2(Wd)}）</text>
    <text x="${f1(X(0.51))}" y="${f1(Y(-36.0))}" font-size="12.4" font-weight="700" fill="${TEAL}">スコア：傾き</text>
    <text x="${f1(X(0.51))}" y="${f1(Y(-36.0) + 16)}" font-size="12.4" fill="${TEAL}">${U}（→ ${f2(S)}）</text>
    <line x1="${bx.x}" y1="${yAx}" x2="${bx.x + bx.w}" y2="${yAx}" stroke="${SLATE}" />
    ${[0.4, 0.5, 0.6, 0.7, 0.8].map((p) => `<text x="${f1(X(p))}" y="${yAx + 16}" text-anchor="middle" font-size="12.4" fill="${SLATE}">${p}</text>`).join('')}
    <text x="${f1(X(p0))}" y="${yAx + 34}" text-anchor="middle" font-size="12.4" font-weight="700" fill="${INK}">p₀</text>
    <text x="${f1(X(ph))}" y="${yAx + 34}" text-anchor="middle" font-size="12.4" font-weight="700" fill="${INK}">推定値</text>
    <text x="${bx.x + bx.w}" y="${yAx + 34}" text-anchor="end" font-size="12.4" fill="${SLATE}">表の確率 p</text>
    <text x="4" y="13" font-size="12.4" fill="${SLATE}">対数尤度 ℓ(p)</text>
  </svg>`;
  const cap = `50回投げて表が32回のときの対数尤度です。3つの検定は、同じ曲線の別の場所を測っています。括弧の中は、それぞれを χ²(1) と比べる統計量に直した値です。`;
  return fig(svg, cap);
}

// ============ 2.3：正準判別（3品種の豆を1本の軸で分ける） ============
function canonicalDisc(): string {
  const W = 340, H = 396;
  // 3品種15粒ずつの模擬データ（長さ mm, 幅 mm）。正準軸は W^{-1}B の第1固有ベクトル
  const G: number[][][] = [[[10.1,5.7],[8.3,4.9],[10.1,6],[10.8,6.3],[9.9,5.9],[11.5,6.8],[11,6.9],[11.3,6.6],[11.2,6.3],[11.1,6.7],[10.4,6.4],[9.2,5.7],[10.9,6.4],[10.9,6.7],[9.9,6]],[[11.1,6],[12.8,6.9],[12.3,6.8],[10.9,6.3],[10.5,5.9],[11.8,6.1],[11,6.3],[10.1,5.5],[12,7.1],[10.6,6.1],[11.6,6.7],[9.9,5],[10.9,6.3],[11.5,6.5],[9.7,5.1]],[[12,6.3],[13.5,6.8],[12.7,6.5],[13.6,6.9],[12.8,6.9],[11.9,6.6],[12.3,6.3],[12.4,6.4],[12.1,6.4],[12.5,6.4],[12.7,6.4],[12.1,6.4],[11.2,5.7],[12.3,6],[13,6.5]]];
  const a = [0.598, -0.802];
  const cols = [INDIGO, AMBER, TEAL], names = ['品種A', '品種B', '品種C'];
  const b: Box = { x: 36, y: 22, w: 290, h: 160, xMin: 8, xMax: 14, yMax: 1 };
  const yMin = 4.6, yMax = 7.4;
  const py = (v: number) => b.y + b.h - ((v - yMin) / (yMax - yMin)) * b.h;
  const dots = G.map((g, k) => g.map(([l, w]) => `<circle cx="${f1(PX(b, l))}" cy="${f1(py(w))}" r="3.4" fill="${cols[k]}" fill-opacity="0.75" />`).join('')).join('');
  // 軸の向き（細長さ）：平均の点から矢印。図の縦横の目盛りの比をそろえて向きを描く
  const cx0 = 11.3, cy0 = 6.27, L = 0.9;
  const ax = `<line x1="${f1(PX(b, cx0 - a[0] * L))}" y1="${f1(py(cy0 - a[1] * L))}" x2="${f1(PX(b, cx0 + a[0] * L))}" y2="${f1(py(cy0 + a[1] * L))}" stroke="${ROSE}" stroke-width="2.4" marker-end="url(#cdaArrow)" />`;
  const strip = (y0: number, label: string, val: (p: number[]) => number, lo: number, hi: number, ticks: number[]) => {
    const X = (v: number) => 36 + ((v - lo) / (hi - lo)) * 290;
    return `<text x="4" y="${y0}" font-size="12.4" font-weight="700" fill="${INK}">${label}</text>
    ${G.map((g, k) => g.map((p) => `<circle cx="${f1(X(val(p)))}" cy="${y0 + 14 + k * 12}" r="3.2" fill="${cols[k]}" fill-opacity="0.75" />`).join('')).join('')}
    <line x1="36" y1="${y0 + 50}" x2="326" y2="${y0 + 50}" stroke="${SLATE}" />
    ${ticks.map((t) => `<text x="${f1(X(t))}" y="${y0 + 64}" text-anchor="middle" font-size="12.4" fill="${SLATE}">${t}</text>`).join('')}`;
  };
  const svg = `${svgOpen(W, H, '3品種の豆の長さと幅の散布図。長さだけでは品種が重なるが、細長さの向きの軸に射影すると3品種がよく分かれる')}
    <defs><marker id="cdaArrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="${ROSE}" /></marker></defs>
    ${[5, 6, 7].map((v) => `<line x1="${b.x}" y1="${f1(py(v))}" x2="${b.x + b.w}" y2="${f1(py(v))}" stroke="#e2e8f0" /><text x="${b.x - 5}" y="${f1(py(v) + 4)}" text-anchor="end" font-size="12.4" fill="${SLATE}">${v}</text>`).join('')}
    ${dots}${ax}
    <text x="${f1(PX(b, 12.3))}" y="${f1(py(5.25))}" font-size="12.4" font-weight="700" fill="${ROSE}" stroke="#fff" stroke-width="3" paint-order="stroke">正準軸の向き</text>
    ${axes(b, [8, 10, 12, 14])}
    <text x="4" y="13" font-size="12.4" fill="${SLATE}">幅（mm）</text>
    <text x="${b.x + b.w}" y="${b.y + b.h + 30}" text-anchor="end" font-size="12.4" fill="${SLATE}">長さ（mm）</text>
    ${names.map((nm, k) => `<circle cx="${b.x + 10 + k * 70}" cy="${b.y + 6}" r="4" fill="${cols[k]}" /><text x="${b.x + 18 + k * 70}" y="${b.y + 10}" font-size="12.4" fill="${cols[k]}">${nm}</text>`).join('')}
    ${strip(236, '長さだけで並べる', (p) => p[0], 8, 14, [8, 10, 12, 14])}
    ${strip(326, '正準得点 0.60×長さ − 0.80×幅', (p) => a[0] * p[0] + a[1] * p[1], 0.8, 2.8, [1, 1.5, 2, 2.5])}
  </svg>`;
  const cap = `品種ごとに15粒の模擬データです。長さと幅は、どの品種の中でも一緒に増える（大きい豆はどちらも大きい）ので、長さだけで並べると品種が大きく重なります。大きさの違いを打ち消す「細長さ」の向きに並べ直すと、重なりが減ります。`;
  return fig(svg, cap);
}

// ============ 1.20：順位和検定（作業時間の2群・外れ値1つ） ============
function rankSum(): string {
  const W = 350, H = 246;
  const A = [11, 12, 13, 14, 15, 16, 60], B = [17, 18, 19, 20, 21, 22, 23];
  const all = [...A, ...B].sort((p, q) => p - q);
  const rank = (v: number) => all.indexOf(v) + 1;
  const x0 = 34, x1 = 274;
  const px = (v: number) => (v >= 50 ? 322 : x0 + ((v - 10) / 14) * (x1 - x0));
  const axisY = 166;
  const row = (vals: number[], y: number, color: string, label: string, lw: number) => `
    <rect x="10" y="${y - 46}" width="${lw}" height="19" fill="#ffffff" />
    <text x="14" y="${y - 32}" font-size="12.8" font-weight="700" fill="${color}">${label}</text>
    ${vals.map((v) => `<text x="${f1(px(v))}" y="${y - 10}" text-anchor="middle" font-size="12.4" fill="${INK}">${rank(v)}</text>
    <circle cx="${f1(px(v))}" cy="${y}" r="5.5" fill="${color}" />
    <line x1="${f1(px(v))}" y1="${y + 6}" x2="${f1(px(v))}" y2="${axisY}" stroke="${color}" stroke-width="0.8" stroke-dasharray="2 3" />`).join('')}`;
  const ticks = [10, 15, 20].map((t) => `<line x1="${f1(px(t))}" y1="${axisY}" x2="${f1(px(t))}" y2="${axisY + 5}" stroke="${SLATE}" /><text x="${f1(px(t))}" y="${axisY + 19}" text-anchor="middle" font-size="12.4" fill="${SLATE}">${t}</text>`).join('');
  const svg = `${svgOpen(W, H, '順位和検定：14人の作業時間を小さい順に並べ、A の順位は1から6と14、B の順位は7から13')}
    ${row(A, 74, INDIGO, 'A 新しい手順（数字＝順位）', 190)}
    ${row(B, 136, '#b45309', 'B 今の手順', 80)}
    <line x1="${x0 - 10}" y1="${axisY}" x2="296" y2="${axisY}" stroke="${SLATE}" stroke-width="1.2" />
    <line x1="304" y1="${axisY}" x2="336" y2="${axisY}" stroke="${SLATE}" stroke-width="1.2" />
    <line x1="294" y1="${axisY + 6}" x2="300" y2="${axisY - 6}" stroke="${SLATE}" stroke-width="1.2" />
    <line x1="302" y1="${axisY + 6}" x2="308" y2="${axisY - 6}" stroke="${SLATE}" stroke-width="1.2" />
    ${ticks}
    <line x1="322" y1="${axisY}" x2="322" y2="${axisY + 5}" stroke="${SLATE}" /><text x="322" y="${axisY + 19}" text-anchor="middle" font-size="12.4" fill="${SLATE}">60</text>
    <text x="${W / 2}" y="${axisY + 37}" text-anchor="middle" font-size="12.4" fill="${SLATE}">作業時間（分）</text>
    <text x="14" y="${H - 8}" font-size="12.8" font-weight="700" fill="${INDIGO}">A の順位の和＝1+2+3+4+5+6+14＝35</text>
  </svg>`;
  const cap = `2つのグループの14人を合わせて、作業時間の短い順に順位を付けました。A は7人中6人が B の全員より短く、60分の1人だけが最後の14位です。この人が25分でも60分でも、順位は14のまま変わりません。`;
  return fig(svg, cap);
}

// ============ 1.21：交互作用プロット（トッピング×立地の2×2） ============
function interactionPlot(): string {
  const W = 350, H = 236;
  const T = 44, PH = 132;
  const py = (v: number) => T + ((63 - v) / (63 - 45)) * PH;
  const N = '#b45309';
  const panel = (x1: number, x2: number, nit: [number, number], cha: [number, number], title: string, values: boolean) => {
    const line = (v: [number, number], color: string) => `<line x1="${x1}" y1="${f1(py(v[0]))}" x2="${x2}" y2="${f1(py(v[1]))}" stroke="${color}" stroke-width="2.4" />
      <circle cx="${x1}" cy="${f1(py(v[0]))}" r="4.5" fill="${color}" /><circle cx="${x2}" cy="${f1(py(v[1]))}" r="4.5" fill="${color}" />`;
    const lab = (x: number, v: number, color: string, below: boolean) => values ? `<text x="${x}" y="${f1(py(v) + (below ? 19 : -10))}" text-anchor="middle" font-size="12.4" fill="${color}">${v}</text>` : '';
    const mid = (x1 + x2) / 2;
    return `<rect x="${x1 - 26}" y="${T - 6}" width="${x2 - x1 + 52}" height="${PH + 12}" fill="none" stroke="${SLATE}" stroke-width="0.8" />
      ${line(nit, N)}${line(cha, INDIGO)}
      ${lab(x1, nit[0], N, true)}${lab(x1, cha[0], INDIGO, false)}${lab(x2, nit[1], N, false)}${lab(x2, cha[1], INDIGO, true)}
      <text x="${mid}" y="${T - 14}" text-anchor="middle" font-size="12.8" font-weight="700" fill="${INK}">${title}</text>
      <text x="${x1}" y="${T + PH + 24}" text-anchor="middle" font-size="12.4" fill="${SLATE}">オフィス街</text>
      <text x="${x2}" y="${T + PH + 24}" text-anchor="middle" font-size="12.4" fill="${SLATE}">住宅街</text>`;
  };
  const svg = `${svgOpen(W, H, '交互作用プロット：この例では煮玉子とチャーシューの線が交わり、交互作用が無いときは2本が平行になる')}
    ${panel(44, 132, [50, 54], [60, 52], 'この例：線が交わる', true)}
    ${panel(222, 310, [50, 48], [60, 58], '交互作用が無いとき', false)}
    <line x1="70" y1="${H - 12}" x2="92" y2="${H - 12}" stroke="${INDIGO}" stroke-width="2.4" />
    <text x="98" y="${H - 8}" font-size="12.8" font-weight="700" fill="${INDIGO}">チャーシュー</text>
    <line x1="200" y1="${H - 12}" x2="222" y2="${H - 12}" stroke="${N}" stroke-width="2.4" />
    <text x="228" y="${H - 8}" font-size="12.8" font-weight="700" fill="${N}">煮玉子</text>
  </svg>`;
  const cap = '縦は各組み合わせ3日分の平均売上（万円）です。左の実際の例では、オフィス街ではチャーシューが10万円高く、住宅街では煮玉子が2万円高くなり、線が交わります。右のように2本が平行なら、トッピングの差はどちらの立地でも同じで、交互作用はありません。';
  return fig(svg, cap);
}

// ============ 1.20：ポアソン分布の検定（年平均4件のとき9件以上） ============
function poissonTest(): string {
  const W = 340, H = 226, lam = 4, obs = 9;
  const b: Box = { x: 14, y: 34, w: 316, h: 150, xMin: -0.5, xMax: 13.5, yMax: 0.22 };
  const ks = range(0, 13);
  let fact = 1;
  const ps = ks.map((k) => { if (k > 0) fact *= k; return Math.exp(-lam) * lam ** k / fact; });
  const tail = 1 - ps.slice(0, obs).reduce((s, p) => s + p, 0);
  const svg = `${svgOpen(W, H, '平均4のポアソン分布。4件前後が最も出やすく、9件以上の棒を足すと約0.021で、これがP値')}
    ${axes(b, [0, 2, 4, 6, 8, 10, 12])}
    ${bars(b, ks.slice(0, obs), ps.slice(0, obs), INDIGO, 0.3)}${bars(b, ks.slice(obs), ps.slice(obs), ROSE, 0.3)}
    <line x1="${f1(PX(b, obs - 0.5))}" y1="${b.y + 20}" x2="${f1(PX(b, obs - 0.5))}" y2="${b.y + b.h}" stroke="${ROSE}" stroke-width="1.4" stroke-dasharray="4 3" />
    <text x="${f1(PX(b, 11))}" y="${f1(PY(b, 0.075))}" text-anchor="middle" font-size="12.4" fill="${ROSE}">9件以上の合計</text>
    <text x="${f1(PX(b, 11))}" y="${f1(PY(b, 0.075) + 16)}" text-anchor="middle" font-size="12.4" font-weight="700" fill="${ROSE}">P値 ＝ ${tail.toFixed(3)}</text>
    <text x="${f1(PX(b, 4))}" y="${b.y - 10}" text-anchor="middle" font-size="12.4" fill="${INDIGO}">平均 λ ＝ 4 件</text>
    <text x="${b.x + b.w / 2}" y="${H - 4}" text-anchor="middle" font-size="12.4" fill="${SLATE}">横軸 1年の事故の件数／高さ ＝ 確率（H₀: λ ＝ 4）</text>
  </svg>`;
  const cap = `年平均4件が正しいとしたときの、1年の事故の件数の分布です。今年の9件以上になる赤い棒をすべて足した約${(tail * 100).toFixed(1)}%が P値です。左右対称でなく、右に裾を引いている形にも注目します。`;
  return fig(svg, cap);
}

// ============ 1.14：尤度関数（10回中7回表） ============
function likelihood(): string {
  const W = 350, H = 220;
  const b: Box = { x: 30, y: 24, w: 304, h: 150, xMin: 0, xMax: 1, yMax: 1.08 };
  const L = (n: number, k: number) => (p: number) => Math.exp(k * Math.log(p) + (n - k) * Math.log(1 - p) - (k * Math.log(k / n) + (n - k) * Math.log(1 - k / n)));
  const svg = `${svgOpen(W, H, '尤度関数：10回中7回表なら p=0.7 で最大、100回中70回なら同じ場所でずっと鋭い山になる')}
    ${axes(b, [0, 0.2, 0.4, 0.6, 0.8, 1])}
    ${area(b, L(10, 7), 0.001, 0.999, INDIGO, 0.12)}
    ${curve(b, L(10, 7), INDIGO, 0.001, 0.999)}
    ${curve(b, L(100, 70), AMBER, 0.001, 0.999)}
    <line x1="${f1(PX(b, 0.7))}" y1="${b.y}" x2="${f1(PX(b, 0.7))}" y2="${b.y + b.h}" stroke="${ROSE}" stroke-width="1.2" stroke-dasharray="4 3" />
    <text x="${f1(PX(b, 0.7) + 4)}" y="${b.y + 10}" font-size="12.4" fill="${ROSE}">p̂ = 0.7</text>
    <text x="${f1(PX(b, 0.3))}" y="${f1(PY(b, 0.62))}" text-anchor="middle" font-size="13.2" font-weight="700" fill="${INDIGO}">10回中7回</text>
    <text x="${f1(PX(b, 0.655))}" y="${f1(PY(b, 0.95))}" text-anchor="end" font-size="13.2" font-weight="700" fill="#b45309">100回中70回</text>
    <text x="${b.x + b.w / 2}" y="${H - 4}" text-anchor="middle" font-size="12.4" fill="${SLATE}">横軸＝表の確率 p の候補／縦軸＝尤度（最大を1にそろえた）</text>
  </svg>`;
  const cap = `10回中7回表なら、山の頂上の p = 0.7 が最尤推定値です。同じ7割でも100回中70回なら、頂上は同じ位置のまま山が鋭くなり、p の候補を狭く絞り込めます。`;
  return fig(svg, cap);
}

// ============ 1.14：推定量の流れ（母集団 → 標本 → 推定量 → 推定値） ============
function estimatorFlow(): string {
  const W = 344, H = 250;
  const rows = [
    { t: '母集団（母数 θ は未知）', e: '表の確率 p', c: SLATE },
    { t: '標本 X₁, …, Xₙ', e: '10回投げた結果', c: TEAL },
    { t: '推定量 θ̂ ＝ データの関数', e: '表の割合 X̄', c: INDIGO },
    { t: '推定値（1つの数）', e: '0.7', c: ROSE },
  ];
  const bx = 12, bw = 200, bh = 36, gap = 20, y0 = 28;
  const svg = `${svgOpen(W, H, '母集団から標本をとり、推定量という関数に入れて、推定値という1つの数を得る流れ。右はコインの例')}
    <text x="${bx + bw / 2}" y="16" text-anchor="middle" font-size="12.4" font-weight="700" fill="${SLATE}">一般</text>
    <text x="${bx + bw + 66}" y="16" text-anchor="middle" font-size="12.4" font-weight="700" fill="${SLATE}">コインの例</text>
    ${rows.map(({ t, e, c }, i) => {
      const y = y0 + i * (bh + gap);
      return `<rect x="${bx}" y="${y}" width="${bw}" height="${bh}" rx="6" fill="${c}" fill-opacity="0.1" stroke="${c}" stroke-width="1.4" />
        <text x="${bx + bw / 2}" y="${y + bh / 2 + 5}" text-anchor="middle" font-size="13.2" font-weight="700" fill="${c === SLATE ? INK : c}">${t}</text>
        <text x="${bx + bw + 66}" y="${y + bh / 2 + 5}" text-anchor="middle" font-size="12.4" fill="${INK}">${e}</text>
        ${i < 3 ? `<line x1="${bx + bw / 2}" y1="${y + bh + 2}" x2="${bx + bw / 2}" y2="${y + bh + gap - 4}" stroke="${SLATE}" stroke-width="1.4" />
        <polygon points="${bx + bw / 2 - 4},${y + bh + gap - 8} ${bx + bw / 2 + 4},${y + bh + gap - 8} ${bx + bw / 2},${y + bh + gap - 2}" fill="${SLATE}" />` : ''}`;
    }).join('')}
  </svg>`;
  const cap = `推定量はデータを入れると数が出てくる関数で、出てきた1つの数が推定値です。標本が変われば推定値も変わります。`;
  return fig(svg, cap);
}

// ============ 1.14：尤度と対数尤度は同じ所で最大（10回中7回表） ============
function likelihoodLog(): string {
  const W = 344, H = 350;
  const T: Box = { x: 40, y: 30, w: 290, h: 110, xMin: 0.2, xMax: 1, yMax: 1.1 };
  const B = { x: 40, y: 212, w: 290, h: 100, xMin: 0.2, xMax: 1, yMin: -6, yMax: 0.6 };
  const lr = (p: number) => 7 * Math.log(p / 0.7) + 3 * Math.log((1 - p) / 0.3);
  const BX = (p: number) => B.x + ((p - B.xMin) / (B.xMax - B.xMin)) * B.w;
  const BY = (v: number) => B.y + B.h - ((v - B.yMin) / (B.yMax - B.yMin)) * B.h;
  const pts: string[] = [];
  for (let i = 0; i <= 120; i++) { const p = 0.2 + (0.78 * i) / 120; pts.push(`${f1(BX(p))},${f1(BY(lr(p)))}`); }
  const ticks = [0.2, 0.4, 0.6, 0.8, 1];
  const svg = `${svgOpen(W, H, '10回中7回表のときの尤度（上）と対数尤度（下）。どちらも p=0.7 で最大になり、頂上では傾きが0')}
    <text x="${T.x}" y="${T.y - 12}" font-size="13.2" font-weight="700" fill="${INDIGO}">尤度 L(p)（最大を1にそろえた）</text>
    ${area(T, (p) => Math.exp(lr(p)), 0.2, 0.999, INDIGO, 0.12)}${curve(T, (p) => Math.exp(lr(p)), INDIGO, 0.2, 0.999)}
    ${axes(T, ticks)}
    <text x="${B.x}" y="${B.y - 12}" font-size="13.2" font-weight="700" fill="${TEAL}">対数尤度 ℓ(p) ＝ log L(p)</text>
    <polyline points="${pts.join(' ')}" fill="none" stroke="${TEAL}" stroke-width="2" />
    <line x1="${f1(BX(0.58))}" y1="${f1(BY(0))}" x2="${f1(BX(0.82))}" y2="${f1(BY(0))}" stroke="${INK}" stroke-width="1.6" />
    <text x="${f1(BX(0.84))}" y="${f1(BY(0) + 4)}" font-size="12.4" fill="${INK}">傾き 0</text>
    <line x1="${B.x}" y1="${B.y + B.h}" x2="${B.x + B.w}" y2="${B.y + B.h}" stroke="${SLATE}" />
    ${ticks.map((v) => `<text x="${f1(BX(v))}" y="${B.y + B.h + 14}" text-anchor="middle" font-size="12.4" fill="${SLATE}">${v}</text>`).join('')}
    <line x1="${f1(PX(T, 0.7))}" y1="${T.y}" x2="${f1(BX(0.7))}" y2="${B.y + B.h}" stroke="${ROSE}" stroke-width="1.2" stroke-dasharray="4 3" />
    <text x="${f1(PX(T, 0.7) + 4)}" y="${T.y + 8}" font-size="12.4" fill="${ROSE}">p̂ = 0.7</text>
    <text x="${W / 2}" y="${H - 4}" text-anchor="middle" font-size="12.4" fill="${SLATE}">横軸＝表の確率 p の候補</text>
  </svg>`;
  const cap = `対数をとると山の形は変わりますが、頂上の位置は p = 0.7 のままです。頂上では傾きが0なので、対数尤度を微分して0とおけば頂上が求まります。`;
  return fig(svg, cap);
}

// ============ 1.14：微分で求まらない尤度（一様分布の跳び・山が2つ） ============
function likelihoodTrouble(): string {
  const W = 344, H = 250;
  const L: Box = { x: 10, y: 40, w: 150, h: 130, xMin: 0, xMax: 2, yMax: 1.1 };
  const R: Box = { x: 186, y: 40, w: 150, h: 130, xMin: -6, xMax: 6, yMax: 1.1 };
  const xs = [0.12, 0.35, 0.51, 0.64, 0.83], mx = Math.max(...xs);
  const lu = (th: number) => (th < mx ? 0 : (mx / th) ** xs.length);
  // コーシー分布の位置 θ の尤度（データが2か所に分かれる）
  const cd = [-3.3, -2.1, 2.3, 2.9];
  const ll = (th: number) => -cd.reduce((s, x) => s + Math.log(1 + (x - th) ** 2), 0);
  const grid = Array.from({ length: 1201 }, (_, i) => -6 + (12 * i) / 1200);
  const top = Math.max(...grid.map(ll));
  const lc = (th: number) => Math.exp(ll(th) - top);
  const peaks = grid.filter((g, i) => i > 0 && i < grid.length - 1 && ll(g) > ll(grid[i - 1]) && ll(g) >= ll(grid[i + 1]));
  const svg = `${svgOpen(W, H, '左：一様分布の尤度は最大の観測値で跳び、そこが最大。右：データが2か所に分かれると尤度の山が2つできる')}
    <text x="${L.x + L.w / 2}" y="${L.y - 22}" text-anchor="middle" font-size="13.2" font-weight="700" fill="${INK}">一様分布 U(0, θ)</text>
    <text x="${R.x + R.w / 2}" y="${R.y - 22}" text-anchor="middle" font-size="13.2" font-weight="700" fill="${INK}">山が2つある尤度</text>
    <line x1="${f1(PX(L, 0))}" y1="${f1(PY(L, 0))}" x2="${f1(PX(L, mx))}" y2="${f1(PY(L, 0))}" stroke="${INDIGO}" stroke-width="2.4" />
    ${curve(L, lu, INDIGO, mx, 2, 2.4)}
    <line x1="${f1(PX(L, mx))}" y1="${f1(PY(L, 0))}" x2="${f1(PX(L, mx))}" y2="${f1(PY(L, 1))}" stroke="${INDIGO}" stroke-width="1" stroke-dasharray="2 2" />
    <circle cx="${f1(PX(L, mx))}" cy="${f1(PY(L, 1))}" r="4" fill="${ROSE}" />
    <text x="${f1(PX(L, mx) + 6)}" y="${f1(PY(L, 1) + 12)}" font-size="12.4" font-weight="700" fill="${ROSE}">最大値 ${mx}</text>
    ${xs.map((x) => `<circle cx="${f1(PX(L, x))}" cy="${f1(PY(L, 0) - 6)}" r="2.6" fill="${TEAL}" />`).join('')}
    ${axes(L, [0, 1, 2])}
    ${curve(R, lc, INDIGO, -6, 6, 2.2)}
    ${cd.map((x) => `<circle cx="${f1(PX(R, x))}" cy="${f1(PY(R, 0) - 6)}" r="2.6" fill="${TEAL}" />`).join('')}
    ${peaks.map((p) => `<circle cx="${f1(PX(R, p))}" cy="${f1(PY(R, lc(p)))}" r="3.6" fill="${lc(p) > 0.999 ? ROSE : AMBER}" />`).join('')}
    ${axes(R, [-4, 0, 4])}
    <text x="${W / 2}" y="${H - 22}" text-anchor="middle" font-size="12.4" fill="${SLATE}">緑の点＝観測値　縦軸＝尤度（最大を1にそろえた）</text>
    <text x="${W / 2}" y="${H - 5}" text-anchor="middle" font-size="12.4" fill="${SLATE}">右はコーシー分布の位置 θ の尤度</text>
  </svg>`;
  const lo = peaks.find((p) => lc(p) < 0.999), hi = peaks.find((p) => lc(p) > 0.999);
  const cap = `左は最大値 ${mx} で跳ぶ尤度で、傾きが0になる点がありません。右は頂上 θ ≈ ${f1(hi ?? 0)} のほかに、θ ≈ ${f1(lo ?? 0)} にも山があります。`;
  return fig(svg, cap);
}

// ============ 1.14：モーメント法と最尤推定の比較（一様分布 U(0, θ)・θ = 1・n = 10） ============
function mmVsMle(): string {
  const W = 344, H = 250, n = 10;
  const b: Box = { x: 14, y: 30, w: 316, h: 160, xMin: 0.4, xMax: 1.6, yMax: 10.5 };
  // 10個の和 S の密度（アーウィン・ホール分布）。2X̄ = S/5 なので密度は 5 f_S(5t)
  const fact = (k: number) => Math.exp(lgamma(k + 1));
  const fS = (s: number) => {
    if (s <= 0 || s >= n) return 0;
    let v = 0;
    for (let k = 0; k <= Math.floor(s); k++) v += (-1) ** k * choose(n, k) * (s - k) ** (n - 1);
    return v / fact(n - 1);
  };
  const fMM = (t: number) => 5 * fS(5 * t);
  const fML = (t: number) => (t <= 0 || t > 1 ? 0 : n * t ** (n - 1));
  const sdMM = 2 * Math.sqrt(1 / 12 / n), mML = n / (n + 1), vML = n / ((n + 1) ** 2 * (n + 2));
  const rmseML = Math.sqrt(vML + (mML - 1) ** 2);
  const svg = `${svgOpen(W, H, '一様分布 U(0,1) から10個とったときの、モーメント推定量 2X̄ と最尤推定量（最大値）の分布。最尤推定量は1の少し手前に鋭く集まり、モーメント推定量は広く散らばる')}
    <line x1="${f1(PX(b, 1))}" y1="${b.y - 4}" x2="${f1(PX(b, 1))}" y2="${b.y + b.h}" stroke="${ROSE}" stroke-width="1.2" stroke-dasharray="4 3" />
    <text x="${f1(PX(b, 1) + 4)}" y="${b.y + 6}" font-size="12.4" fill="${ROSE}">真の θ = 1</text>
    ${area(b, fMM, 0.4, 1.6, AMBER, 0.25)}${curve(b, fMM, AMBER, 0.4, 1.6, 2)}
    ${area(b, fML, 0.4, 1, INDIGO, 0.2)}${curve(b, fML, INDIGO, 0.4, 1, 2.2)}
    <line x1="${f1(PX(b, 1))}" y1="${f1(PY(b, 10))}" x2="${f1(PX(b, 1))}" y2="${f1(PY(b, 0))}" stroke="${INDIGO}" stroke-width="2.2" />
    ${axes(b, [0.4, 0.6, 0.8, 1, 1.2, 1.4, 1.6])}
    <text x="${f1(PX(b, 0.88))}" y="${f1(PY(b, 6.5))}" text-anchor="end" font-size="12.4" font-weight="700" fill="${INDIGO}">最尤：最大値</text>
    <text x="${f1(PX(b, 1.22))}" y="${f1(PY(b, 2.3))}" font-size="12.4" font-weight="700" fill="#b45309">モーメント：2X̄</text>
    <text x="${b.x + b.w / 2}" y="${H - 22}" text-anchor="middle" font-size="12.4" fill="${SLATE}">横軸＝推定値／縦軸＝密度</text>
    <text x="${b.x + b.w / 2}" y="${H - 5}" text-anchor="middle" font-size="12.4" fill="${SLATE}">U(0, 1) から10個とった場合</text>
  </svg>`;
  const cap = `同じ10個のデータでも、2X̄ は標準偏差 ${f2(sdMM)} で広く散らばり、最大値は1の少し手前（平均 ${f2(mML)}）に鋭く集まります。真の値からのずれの大きさ（二乗誤差の平方根）は、最尤 ${f2(rmseML)}、モーメント ${f2(sdMM)} です。`;
  return fig(svg, cap);
}

// ============ 1.15：ダーツ（偏りとばらつき） ============
function darts(): string {
  const W = 350, H = 330;
  const g = gaussFrom(mulberry32(1515));
  const cells = [
    { bx: 0, by: 0, sd: 0.12, t: '偏りなし・ばらつき小', s: '不偏で有効' },
    { bx: 0, by: 0, sd: 0.34, t: '偏りなし・ばらつき大', s: '不偏だが有効でない' },
    { bx: 0.42, by: -0.3, sd: 0.12, t: '偏りあり・ばらつき小', s: '精度は高いが的外れ' },
    { bx: 0.42, by: -0.3, sd: 0.34, t: '偏りあり・ばらつき大', s: '最悪' },
  ];
  const body = cells.map((c, i) => {
    const cx = 92 + (i % 2) * 170, cy = 92 + Math.floor(i / 2) * 150, R = 56;
    const pts = Array.from({ length: 12 }, () => [c.bx + c.sd * g(), c.by + c.sd * g()]);
    const mx = pts.reduce((s, p) => s + p[0], 0) / 12, my = pts.reduce((s, p) => s + p[1], 0) / 12;
    return `${[1, 0.66, 0.33].map((k) => `<circle cx="${cx}" cy="${cy}" r="${f1(R * k)}" fill="none" stroke="#cbd5e1" />`).join('')}
      <circle cx="${cx}" cy="${cy}" r="2.5" fill="${ROSE}" />
      ${pts.map(([x, y]) => `<circle cx="${f1(cx + x * R)}" cy="${f1(cy - y * R)}" r="2.6" fill="${INDIGO}" />`).join('')}
      <path d="M${f1(cx + mx * R - 5)},${f1(cy - my * R)} h10 M${f1(cx + mx * R)},${f1(cy - my * R - 5)} v10" stroke="${AMBER}" stroke-width="2" />
      <text x="${cx}" y="${cy + R + 16}" text-anchor="middle" font-size="13.2" font-weight="700" fill="${INK}">${c.t}</text>
      <text x="${cx}" y="${cy + R + 30}" text-anchor="middle" font-size="12.4" fill="${SLATE}">${c.s}</text>`;
  }).join('');
  const svg = `${svgOpen(W, H, 'ダーツのたとえ：偏りの有無とばらつきの大小の4通り')}${body}</svg>`;
  const cap = `赤い点が真の値、青い点が1回分のデータから計算した推定値、橙の十字が推定値の平均です。上の段は平均が中心に来ていて（不偏）、左の列はばらつきが小さい（有効）推定量です。`;
  return fig(svg, cap);
}

// ============ 1.15：不偏分散 S² と n で割る分散の分布（正規分布・n = 5・σ² = 1） ============
function varianceEstimators(): string {
  const W = 344, H = 250, n = 5, k = n - 1;
  const b: Box = { x: 14, y: 40, w: 316, h: 150, xMin: 0, xMax: 3.5, yMax: 1.05 };
  // (n−1)S²/σ² ～ χ²(k)。S² = V/k、σ̂² = V/n（V ～ χ²(k)）
  const chi = (v: number) => (v <= 0 ? 0 : Math.exp((k / 2 - 1) * Math.log(v) - v / 2 - (k / 2) * Math.log(2) - lgamma(k / 2)));
  const fS = (x: number) => k * chi(k * x);
  const fH = (x: number) => n * chi(n * x);
  const mS = 1, mH = k / n;
  const vS = 2 / k, vH = (k / n) ** 2 * (2 / k);
  const svg = `${svgOpen(W, H, '正規分布から5個とったときの、不偏分散 S² と n で割った分散の分布。S² の平均は真の値1、n で割った方は0.8で、少し左にずれるが幅は狭い')}
    <line x1="${f1(PX(b, 1))}" y1="${b.y - 4}" x2="${f1(PX(b, 1))}" y2="${b.y + b.h}" stroke="${ROSE}" stroke-width="1.2" stroke-dasharray="4 3" />
    <text x="${f1(PX(b, 1) + 4)}" y="${b.y + 4}" font-size="12.4" fill="${ROSE}">真の σ² = 1</text>
    ${curve(b, fS, INDIGO, 0.001, 3.5, 2.2)}${curve(b, fH, AMBER, 0.001, 3.5, 2.2)}
    ${[{ m: mS, c: INDIGO }, { m: mH, c: AMBER }].map(({ m, c }) => `<line x1="${f1(PX(b, m))}" y1="${f1(PY(b, 0))}" x2="${f1(PX(b, m))}" y2="${f1(PY(b, 0) + 8)}" stroke="${c}" stroke-width="3" />`).join('')}
    ${axes(b, [0, 0.5, 1, 1.5, 2, 2.5, 3])}
    <text x="2" y="14" font-size="12.4" font-weight="700" fill="#b45309">n で割る（平均 ${f2(mH)}）</text>
    <text x="${W - 2}" y="14" text-anchor="end" font-size="12.4" font-weight="700" fill="${INDIGO}">S²：n−1 で割る（平均 1）</text>
    <text x="${b.x + b.w / 2}" y="${H - 22}" text-anchor="middle" font-size="12.4" fill="${SLATE}">横軸＝推定値／軸の下の短い線＝分布の平均</text>
    <text x="${b.x + b.w / 2}" y="${H - 5}" text-anchor="middle" font-size="12.4" fill="${SLATE}">正規分布から5個とった場合</text>
  </svg>`;
  const cap = `S² は平均がちょうど1（不偏）ですが広く散らばり、n で割った方は平均 ${f2(mH)} と小さめで、幅は狭くなります。どちらが真の値に近いかは、下の平均二乗誤差で比べます。`;
  return fig(svg, cap);
}

// ============ 1.15：一致性（X̄ は n とともに真の値に集まる、X₁ は集まらない） ============
function consistency(): string {
  const W = 344, H = 262;
  const L: Box = { x: 10, y: 44, w: 150, h: 150, xMin: -3, xMax: 3, yMax: 1.9 };
  const R: Box = { x: 186, y: 44, w: 150, h: 150, xMin: -3, xMax: 3, yMax: 1.9 };
  const ns = [{ n: 1, c: SLATE }, { n: 4, c: TEAL }, { n: 16, c: INDIGO }];
  const lab = (b: Box, n: number, c: string, i: number) => `<text x="${f1(b.x + b.w - 2)}" y="${b.y + 14 + i * 15}" text-anchor="end" font-size="12.4" font-weight="700" fill="${c}">n = ${n}</text>`;
  const svg = `${svgOpen(W, H, '左：標本平均は n を増やすと真の値0に集まる（一致）。右：最初の1個だけを使う推定量は n を増やしても広がったまま（不偏だが一致しない）')}
    <text x="${L.x + L.w / 2}" y="${L.y - 24}" text-anchor="middle" font-size="13.2" font-weight="700" fill="${INK}">標本平均 X̄</text>
    <text x="${R.x + R.w / 2}" y="${R.y - 24}" text-anchor="middle" font-size="13.2" font-weight="700" fill="${INK}">最初の1個 X₁</text>
    ${ns.map(({ n, c }) => curve(L, (x) => normPdf(x, 0, 1 / Math.sqrt(n)), c, -3, 3, 2)).join('')}
    ${ns.map(({ n, c }, i) => lab(L, n, c, i)).join('')}
    ${curve(R, (x) => normPdf(x), SLATE, -3, 3, 2)}
    ${ns.map(({ n, c }, i) => lab(R, n, c, i)).join('')}
    <text x="${f1(PX(R, 0))}" y="${f1(PY(R, 0.75))}" text-anchor="middle" font-size="12.4" fill="${SLATE}">3本とも同じ</text>
    ${axes(L, [-2, 0, 2])}${axes(R, [-2, 0, 2])}
    <text x="${W / 2}" y="${H - 22}" text-anchor="middle" font-size="12.4" fill="${SLATE}">N(0, 1) から n 個とったときの推定値の分布</text>
    <text x="${W / 2}" y="${H - 5}" text-anchor="middle" font-size="12.4" fill="${SLATE}">真の値＝0</text>
  </svg>`;
  const cap = `どちらも平均は真の値0で不偏です。X̄ は n を4倍にするたびに幅が半分になり0に集まります（一致）が、X₁ は何個データを集めても1個しか使わないので広がったままです。`;
  return fig(svg, cap);
}

// ============ 1.15：有効性（正規分布で平均と中央値のばらつきを比べる） ============
function meanVsMedian(): string {
  const W = 344, H = 236, n = 25;
  const b: Box = { x: 14, y: 30, w: 316, h: 150, xMin: -1, xMax: 1, yMax: 2.2 };
  const sM = 1 / Math.sqrt(n), sMed = Math.sqrt(Math.PI / (2 * n));
  const p = (s: number) => 2 * Phi(-0.2 / s);
  const svg = `${svgOpen(W, H, '正規分布から25個とったときの標本平均と標本中央値の分布。どちらも中心は真の値0だが、中央値の方が広い')}
    ${curve(b, (x) => normPdf(x, 0, sMed), AMBER, -1, 1, 2.2)}
    ${curve(b, (x) => normPdf(x, 0, sM), INDIGO, -1, 1, 2.2)}
    ${axes(b, [-1, -0.5, 0, 0.5, 1])}
    <text x="2" y="14" font-size="12.4" font-weight="700" fill="${INDIGO}">平均 X̄（分散 σ²/n）</text>
    <text x="${W - 2}" y="14" text-anchor="end" font-size="12.4" font-weight="700" fill="#b45309">中央値（分散 約1.57倍）</text>
    <text x="${b.x + b.w / 2}" y="${H - 22}" text-anchor="middle" font-size="12.4" fill="${SLATE}">横軸＝推定値（真の値 0）</text>
    <text x="${b.x + b.w / 2}" y="${H - 5}" text-anchor="middle" font-size="12.4" fill="${SLATE}">N(0, 1) から25個（中央値は近似）</text>
  </svg>`;
  const cap = `どちらも不偏ですが、中央値の分散は平均の約1.57倍です。真の値から0.2以上ずれる確率は、平均が ${pct(p(sM))}、中央値が ${pct(p(sMed))} です。`;
  return fig(svg, cap);
}

// ============ 2.1：推定量の範囲の入れ子（ガウス・マルコフと MVUE） ============
function estimatorClasses(): string {
  const W = 344, H = 250;
  const box = (x: number, y: number, w: number, h: number, c: string, t: string, s: string) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="10" fill="${c}" fill-opacity="0.08" stroke="${c}" stroke-width="1.5" />
    <text x="${x + 10}" y="${y + 18}" font-size="13.2" font-weight="700" fill="${c === SLATE ? INK : c}">${t}</text>
    ${s ? `<text x="${x + 10}" y="${y + 34}" font-size="12.4" fill="${SLATE}">${s}</text>` : ''}`;
  const svg = `${svgOpen(W, H, 'すべての推定量の中に不偏推定量があり、その中に線形不偏推定量がある。ガウス・マルコフの定理は線形不偏の中で最小分散、正規誤差ならすべての不偏の中で最小分散')}
    ${box(6, 6, 332, 238, SLATE, 'すべての推定量', '偏りがあるもの（リッジ回帰など）も含む')}
    ${box(22, 50, 300, 184, TEAL, '不偏推定量', '正規誤差なら OLS がこの中で最小分散')}
    ${box(38, 98, 268, 126, INDIGO, '線形不偏推定量', 'y の1次式で、不偏なもの')}
    <circle cx="172" cy="182" r="22" fill="${ROSE}" fill-opacity="0.15" stroke="${ROSE}" stroke-width="1.6" />
    <text x="172" y="187" text-anchor="middle" font-size="13.2" font-weight="700" fill="${ROSE}">OLS</text>
    <text x="204" y="178" font-size="12.4" fill="${ROSE}">← この中で</text>
    <text x="204" y="194" font-size="12.4" fill="${ROSE}">分散が最小</text>
  </svg>`;
  const cap = `ガウス・マルコフの定理が言えるのは、藍の枠（線形不偏推定量）の中で OLS の分散が最小ということです。誤差が正規分布なら、緑の枠（すべての不偏推定量）の中でも最小になります。`;
  return fig(svg, cap);
}

// ============ 1.18：P値＝帰無分布の裾の面積 ============
function pValue(): string {
  const W = 350, H = 220;
  const b: Box = { x: 14, y: 30, w: 322, h: 140, xMin: -4, xMax: 4, yMax: 0.44 };
  const z = 2.19;
  const p = 2 * (1 - Phi(z));
  const svg = `${svgOpen(W, H, 'P値は帰無仮説のもとでの分布で、観測値より極端な側の面積')}
    ${area(b, normPdf, -4, -z, ROSE, 0.45)}${area(b, normPdf, z, 4, ROSE, 0.45)}
    ${area(b, normPdf, -1.96, 1.96, INDIGO, 0.08)}
    ${curve(b, normPdf, INDIGO)}
    ${axes(b, [-4, -3, -2, -1, 0, 1, 2, 3, 4])}
    <line x1="${f1(PX(b, z))}" y1="${b.y + 6}" x2="${f1(PX(b, z))}" y2="${b.y + b.h}" stroke="${ROSE}" stroke-width="1.6" />
    <text x="${f1(PX(b, z) + 4)}" y="${b.y + 16}" font-size="13.2" font-weight="700" fill="${ROSE}">観測値 ${z}</text>
    <line x1="${f1(PX(b, -z))}" y1="${b.y + 40}" x2="${f1(PX(b, -z))}" y2="${b.y + b.h}" stroke="${ROSE}" stroke-width="1" stroke-dasharray="3 2" />
    <text x="${f1(PX(b, 3.1))}" y="${f1(PY(b, 0.06))}" text-anchor="middle" font-size="12.4" fill="${ROSE}">${(1 - Phi(z)).toFixed(3)}</text>
    <text x="${f1(PX(b, -3.1))}" y="${f1(PY(b, 0.06))}" text-anchor="middle" font-size="12.4" fill="${ROSE}">${(1 - Phi(z)).toFixed(3)}</text>
    <text x="${f1(PX(b, 0))}" y="${f1(PY(b, 0.15))}" text-anchor="middle" font-size="12.4" fill="${INDIGO}">「差がない」なら</text>
    <text x="${f1(PX(b, 0))}" y="${f1(PY(b, 0.15) + 16)}" text-anchor="middle" font-size="12.4" fill="${INDIGO}">普通に出る範囲</text>
    <text x="${W / 2}" y="16" text-anchor="middle" font-size="13.2" font-weight="700" fill="${INK}">P値 ＝ 赤い面積の合計 ＝ ${f2(p)}</text>
    <text x="${b.x + b.w / 2}" y="${H - 4}" text-anchor="middle" font-size="12.4" fill="${SLATE}">帰無仮説（差がない）のもとでの検定統計量の分布</text>
  </svg>`;
  const cap = `曲線は、本当に差がないと仮定したときに検定統計量がとる値の分布です。赤い面積は観測値 ${z} より外側（左右とも）で、合わせて ${f2(p)} です。`;
  return fig(svg, cap);
}

// ============ 1.21：分散分析（群間と群内） ============
function anovaDots(): string {
  const W = 350, H = 250;
  const base: Record<string, number[]> = { 煮玉子: [52, 48, 55, 51, 49], チャーシュー: [58, 61, 57, 60, 59], メンマ: [50, 52, 48, 51, 49] };
  const groups = Object.entries(base).map(([k, v]) => { const m = v.reduce((s, x) => s + x, 0) / v.length; return [k, [...v, ...v.map((x) => 2 * m - x)]] as [string, number[]]; });
  const all = groups.flatMap(([, v]) => v);
  const G = all.reduce((s, x) => s + x, 0) / all.length;
  const means = groups.map(([, v]) => v.reduce((s, x) => s + x, 0) / v.length);
  const ssb = groups.reduce((s, [, v], i) => s + v.length * (means[i] - G) ** 2, 0);
  const ssw = groups.reduce((s, [, v], i) => s + v.reduce((t, x) => t + (x - means[i]) ** 2, 0), 0);
  const k = groups.length, n = all.length;
  const F = (ssb / (k - 1)) / (ssw / (n - k));
  const b: Box = { x: 40, y: 24, w: 296, h: 170, xMin: 0, xMax: 3, yMax: 1 };
  const yMin = 44, yMax = 64;
  const py = (y: number) => b.y + b.h - ((y - yMin) / (yMax - yMin)) * b.h;
  const cols = [AMBER, ROSE, TEAL];
  const dots = groups.map(([name, v], i) => {
    const cx = PX(b, i + 0.5);
    const seen: Record<number, number> = {};
    return `${v.map((y) => { const j = (seen[y] = (seen[y] || 0) + 1) - 1; return `<circle cx="${f1(cx - 12 + j * 7)}" cy="${f1(py(y))}" r="3.2" fill="${cols[i]}" fill-opacity="0.8" />`; }).join('')}
      <line x1="${f1(cx - 34)}" y1="${f1(py(means[i]))}" x2="${f1(cx + 34)}" y2="${f1(py(means[i]))}" stroke="${cols[i]}" stroke-width="2.4" />
      <text x="${f1(cx)}" y="${b.y + b.h + 16}" text-anchor="middle" font-size="13.2" font-weight="700" fill="${INK}">${name}</text>
      <text x="${f1(cx + 36)}" y="${f1(py(means[i]) + 4)}" font-size="12.4" fill="${cols[i]}">${means[i]}</text>`;
  }).join('');
  const svg = `${svgOpen(W, H, '3つのトッピングの日ごとの売上：群の平均どうしの離れ方（群間）と、群の中の散らばり（群内）')}
    ${[45, 50, 55, 60].map((v) => `<text x="${b.x - 6}" y="${f1(py(v) + 4)}" text-anchor="end" font-size="12.4" fill="${SLATE}">${v}</text><line x1="${b.x}" y1="${f1(py(v))}" x2="${b.x + b.w}" y2="${f1(py(v))}" stroke="#f1f5f9" />`).join('')}
    <line x1="${b.x}" y1="${f1(py(G))}" x2="${b.x + b.w}" y2="${f1(py(G))}" stroke="${SLATE}" stroke-width="1.2" stroke-dasharray="4 3" />
    <text x="${b.x + 2}" y="${f1(py(G) - 4)}" font-size="12.4" fill="${SLATE}">全体平均 ${f1(G)}</text>
    ${dots}
    <text x="${W / 2}" y="${H - 6}" text-anchor="middle" font-size="12.4" fill="${SLATE}">点＝1日の売上（万円）・太線＝そのトッピングの平均</text>
  </svg>`;
  const cap = `点は1日ごとの売上、太線は各トッピングの平均です。<strong>群間変動</strong>は太線が全体平均（点線）からどれだけ離れているか、<strong>群内変動</strong>は同じ色の点が太線のまわりにどれだけ散らばっているかです。この10日ずつのデータで計算すると、群間平方和 ${f1(ssb)}、群内平方和 ${f1(ssw)}、F = (${f1(ssb)} ÷ ${k - 1}) ÷ (${f1(ssw)} ÷ ${n - k}) ≈ ${f1(F)} です。チャーシューの太線だけが群内の散らばりよりはるかに大きく離れているので、F が大きくなります。`;
  return fig(svg, cap);
}

// ============ 2.5：デンドログラム（6人の顧客） ============
const CLUSTER_PTS: [string, number, number][] = [['A', 1, 1], ['B', 1.5, 1.4], ['C', 1.2, 2.2], ['D', 5, 5], ['E', 5.6, 4.6], ['F', 5.2, 6.2]];
function dendrogram(): string {
  const pts = CLUSTER_PTS;
  type Node = { ids: number[]; h: number; l?: Node; r?: Node; x?: number };
  let clusters: Node[] = pts.map((_, i) => ({ ids: [i], h: 0 }));
  const d = (i: number, j: number) => Math.hypot(pts[i][1] - pts[j][1], pts[i][2] - pts[j][2]);
  const link = (a: Node, b: Node) => { let s = 0; a.ids.forEach((i) => b.ids.forEach((j) => (s += d(i, j)))); return s / (a.ids.length * b.ids.length); };
  const merges: number[] = [];
  while (clusters.length > 1) {
    let best = [0, 1], bd = Infinity;
    for (let i = 0; i < clusters.length; i++) for (let j = i + 1; j < clusters.length; j++) { const v = link(clusters[i], clusters[j]); if (v < bd) { bd = v; best = [i, j]; } }
    const [i, j] = best;
    const nn: Node = { ids: [...clusters[i].ids, ...clusters[j].ids], h: bd, l: clusters[i], r: clusters[j] };
    merges.push(bd);
    clusters = clusters.filter((_, k) => k !== i && k !== j).concat(nn);
  }
  const root = clusters[0];
  const order: number[] = [];
  const walk = (n: Node) => { if (!n.l) order.push(n.ids[0]); else { walk(n.l); walk(n.r!); } };
  walk(root);
  const W = 350, H = 250;
  // 左：散布図、右：デンドログラム
  const S: Box = { x: 16, y: 34, w: 130, h: 130, xMin: 0, xMax: 7, yMax: 7 };
  const D = { x: 176, y: 34, w: 160, h: 150 };
  const hMax = root.h * 1.1;
  const dy = (h: number) => D.y + D.h - (h / hMax) * D.h;
  const lx = (i: number) => D.x + 10 + (order.indexOf(i) * (D.w - 20)) / (pts.length - 1);
  const draw = (n: Node): string => {
    if (!n.l) { n.x = lx(n.ids[0]); return ''; }
    const a = draw(n.l), c = draw(n.r!);
    n.x = (n.l.x! + n.r!.x!) / 2;
    return a + c + `<path d="M${f1(n.l.x!)},${f1(dy(n.l.h))} V${f1(dy(n.h))} H${f1(n.r!.x!)} V${f1(dy(n.r!.h))}" fill="none" stroke="${INDIGO}" stroke-width="1.6" />`;
  };
  const tree = draw(root);
  const cut = (root.h + root.l!.h + 0.0) / 2 > Math.max(root.l!.h, root.r!.h) ? (root.h + Math.max(root.l!.h, root.r!.h)) / 2 : root.h * 0.6;
  const svg = `${svgOpen(W, H, '6人の顧客の散布図と、近い順に併合していくデンドログラム')}
    <text x="${S.x}" y="${S.y - 12}" font-size="13.2" font-weight="700" fill="${INK}">顧客の位置（2つの指標）</text>
    <rect x="${S.x}" y="${S.y}" width="${S.w}" height="${S.h}" fill="none" stroke="#e2e8f0" />
    ${pts.map(([n, x, y], i) => `<circle cx="${f1(PX(S, x))}" cy="${f1(S.y + S.h - (y / 7) * S.h)}" r="4" fill="${i < 3 ? AMBER : TEAL}" /><text x="${f1(PX(S, x) + (n === 'A' || n === 'D' ? -7 : 7))}" y="${f1(S.y + S.h - (y / 7) * S.h + 4)}"${n === 'A' || n === 'D' ? ' text-anchor="end"' : ''} font-size="13.2" fill="${INK}">${n}</text>`).join('')}
    <text x="${D.x}" y="${D.y - 12}" font-size="13.2" font-weight="700" fill="${INK}">デンドログラム</text>
    ${tree}
    <line x1="${D.x}" y1="${f1(dy(cut))}" x2="${D.x + D.w}" y2="${f1(dy(cut))}" stroke="${ROSE}" stroke-width="1.2" stroke-dasharray="4 3" />
    <text x="${D.x + D.w}" y="${f1(dy(cut) - 4)}" text-anchor="end" font-size="12.4" fill="${ROSE}">ここで切ると2群</text>
    ${pts.map(([n], i) => `<text x="${f1(lx(i))}" y="${D.y + D.h + 14}" text-anchor="middle" font-size="13.2" fill="${INK}">${n}</text>`).join('')}
    <text x="${D.x - 4}" y="${f1(dy(0) + 4)}" text-anchor="end" font-size="12.4" fill="${SLATE}">0</text>
    <text x="${D.x - 4}" y="${f1(dy(root.h) + 4)}" text-anchor="end" font-size="12.4" fill="${SLATE}">${f1(root.h)}</text>
    <text x="${W / 2}" y="${H - 6}" text-anchor="middle" font-size="12.4" fill="${SLATE}">縦軸＝併合したときの距離（群平均法）</text>
  </svg>`;
  const sm = [...merges].sort((a, b) => a - b);
  const cap = `左の6人を、距離の近い組から順に1つずつまとめていった過程が右の樹形図です。最初に結ばれるのは距離 ${f2(sm[0])} の2人で、低い位置の横線ほど似ている組です。A・B・C と D・E・F はそれぞれ距離 ${f1(Math.max(root.l!.h, root.r!.h))} 以下でまとまりますが、2つの群どうしは距離 ${f1(root.h)} になってようやく結ばれます。赤い点線の高さで切ると2つのクラスターに分かれます。切る高さを下げるほど、クラスターの数は増えます。`;
  return fig(svg, cap);
}

// ============ 2.5：リンク法（2つの群の距離の測り方） ============
function linkage(): string {
  const pts = CLUSTER_PTS;
  const L = [0, 1, 2], R = [3, 4, 5];
  const d = (i: number, j: number) => Math.hypot(pts[i][1] - pts[j][1], pts[i][2] - pts[j][2]);
  const pairs = L.flatMap((i) => R.map((j) => ({ i, j, v: d(i, j) })));
  const mn = pairs.reduce((a, b) => (b.v < a.v ? b : a)), mx = pairs.reduce((a, b) => (b.v > a.v ? b : a));
  const avg = pairs.reduce((s, p) => s + p.v, 0) / pairs.length;
  const cen = (g: number[]) => [g.reduce((s, i) => s + pts[i][1], 0) / g.length, g.reduce((s, i) => s + pts[i][2], 0) / g.length];
  const cL = cen(L), cR = cen(R);
  const ward = ((L.length * R.length) / (L.length + R.length)) * ((cL[0] - cR[0]) ** 2 + (cL[1] - cR[1]) ** 2);
  const W = 350, H = 250;
  const S: Box = { x: 30, y: 16, w: 200, h: 200, xMin: 0, xMax: 7, yMax: 7 };
  const X = (x: number) => PX(S, x), Y = (y: number) => S.y + S.h - (y / 7) * S.h;
  const seg = (i: number, j: number, col: string, dash: string) => `<line x1="${f1(X(pts[i][1]))}" y1="${f1(Y(pts[i][2]))}" x2="${f1(X(pts[j][1]))}" y2="${f1(Y(pts[j][2]))}" stroke="${col}" stroke-width="2"${dash ? ` stroke-dasharray="${dash}"` : ''} />`;
  const lx = 246;
  const svg = `${svgOpen(W, H, '同じ2つの群でも、最も近い組で測るか、最も遠い組で測るかで、群どうしの距離が変わる')}
    <rect x="${S.x}" y="${S.y}" width="${S.w}" height="${S.h}" fill="none" stroke="#e2e8f0" />
    ${seg(mn.i, mn.j, ROSE, '')}
    ${seg(mx.i, mx.j, INDIGO, '6 4')}
    ${pts.map(([n, x, y], i) => `<circle cx="${f1(X(x))}" cy="${f1(Y(y))}" r="4.5" fill="${i < 3 ? AMBER : TEAL}" /><text x="${f1(X(x) + (n === 'A' || n === 'D' ? -7 : 7))}" y="${f1(Y(y) + 4)}"${n === 'A' || n === 'D' ? ' text-anchor="end"' : ''} font-size="13" fill="${INK}">${n}</text>`).join('')}
    <text x="${lx}" y="40" font-size="12.4" font-weight="700" fill="${ROSE}">単リンク法</text>
    <text x="${lx}" y="56" font-size="12.4" fill="${INK}">最も近い組 ${pts[mn.i][0]}–${pts[mn.j][0]}</text>
    <text x="${lx}" y="72" font-size="12.4" fill="${INK}">距離 ${f2(mn.v)}</text>
    <text x="${lx}" y="100" font-size="12.4" font-weight="700" fill="${INDIGO}">完全リンク法</text>
    <text x="${lx}" y="116" font-size="12.4" fill="${INK}">最も遠い組 ${pts[mx.i][0]}–${pts[mx.j][0]}</text>
    <text x="${lx}" y="132" font-size="12.4" fill="${INK}">距離 ${f2(mx.v)}</text>
    <text x="${lx}" y="160" font-size="12.4" font-weight="700" fill="${INK}">群平均法</text>
    <text x="${lx}" y="176" font-size="12.4" fill="${INK}">9組の平均 ${f2(avg)}</text>
    <text x="${lx}" y="204" font-size="12.4" font-weight="700" fill="${INK}">ウォード法</text>
    <text x="${lx}" y="220" font-size="12.4" fill="${INK}">平方和の増分 ${f1(ward)}</text>
  </svg>`;
  const cap = `デンドログラムと同じ6人で、A・B・C の群と D・E・F の群の距離を測ります。赤の実線は最も近い組、青の点線は最も遠い組です。どの組の距離を使うかで ${f2(mn.v)}〜${f2(mx.v)} と変わり、併合の順番や群の形が変わります。ウォード法だけは距離ではなく、まとめたときに群の中の平方和がどれだけ増えるかで比べます。`;
  return fig(svg, cap);
}

// ============ 2.5：k-means の手順（割り当てと重心の更新をくり返す） ============
const KM_PTS: [number, number][] = [[1, 1], [1.6, 2.2], [2.2, 1.2], [2.6, 2.6], [5, 4.2], [5.8, 5], [6.4, 4], [5.4, 3.2]];
function kmeansSteps(): string {
  const P = KM_PTS;
  const d2 = (a: number[], b: number[]) => (a[0] - b[0]) ** 2 + (a[1] - b[1]) ** 2;
  let C: number[][] = [[...P[1]], [...P[3]]];
  const steps: { C: number[][]; a: number[]; w: number }[] = [];
  for (let it = 0; it < 10; it++) {
    const a = P.map((p) => (d2(p, C[0]) <= d2(p, C[1]) ? 0 : 1));
    steps.push({ C: C.map((c) => [...c]), a, w: P.reduce((s, p, i) => s + d2(p, C[a[i]]), 0) });
    const N = [0, 1].map((k) => { const m = P.filter((_, i) => a[i] === k); return [m.reduce((s, p) => s + p[0], 0) / m.length, m.reduce((s, p) => s + p[1], 0) / m.length]; });
    if (N.every((c, k) => d2(c, C[k]) < 1e-12)) break;
    C = N;
  }
  const W = 350, pw = 108, gap = 9, top = 34, ph = 108;
  const H = top + ph + 58;
  const panel = (k: number, title: string) => {
    const s = steps[k], x0 = k * (pw + gap) + 2;
    const X = (x: number) => x0 + 6 + (x / 7) * (pw - 12), Y = (y: number) => top + ph - 6 - (y / 6) * (ph - 12);
    const col = (g: number) => (g === 0 ? AMBER : TEAL);
    return `<text x="${x0 + pw / 2}" y="${top - 18}" text-anchor="middle" font-size="12.4" font-weight="700" fill="${INK}">${title}</text>
      <rect x="${x0}" y="${top}" width="${pw}" height="${ph}" fill="#fff" stroke="#e2e8f0" />
      ${P.map((p, i) => `<line x1="${f1(X(p[0]))}" y1="${f1(Y(p[1]))}" x2="${f1(X(s.C[s.a[i]][0]))}" y2="${f1(Y(s.C[s.a[i]][1]))}" stroke="${col(s.a[i])}" stroke-opacity="0.45" />`).join('')}
      ${P.map((p, i) => `<circle cx="${f1(X(p[0]))}" cy="${f1(Y(p[1]))}" r="4" fill="${col(s.a[i])}" />`).join('')}
      ${s.C.map((c, g) => `<path d="M${f1(X(c[0]) - 6)},${f1(Y(c[1]) - 6)} L${f1(X(c[0]) + 6)},${f1(Y(c[1]) + 6)} M${f1(X(c[0]) + 6)},${f1(Y(c[1]) - 6)} L${f1(X(c[0]) - 6)},${f1(Y(c[1]) + 6)}" stroke="${g === 0 ? '#b45309' : TEAL}" stroke-width="3" />`).join('')}
      <text x="${x0 + pw / 2}" y="${top + ph + 18}" text-anchor="middle" font-size="12.4" fill="${INK}">平方和 ${f1(s.w)}</text>`;
  };
  const last = steps.length - 1;
  const svg = `${svgOpen(W, H, 'k-means の手順：重心に近い方へ割り当て、群の平均へ重心を移すことをくり返すと、平方和が減って止まる')}
    ${panel(0, '① 初めの重心')}
    ${panel(1, '② 重心を移す')}
    ${panel(last, `③ ${last === 2 ? 'もう一度' : '止まる'}`)}
    <text x="${W / 2}" y="${H - 8}" text-anchor="middle" font-size="12.4" fill="${SLATE}">× ＝重心・線＝割り当て先・平方和＝線の長さの2乗の合計</text>
  </svg>`;
  const moved = steps[0].a.filter((g, i) => g !== steps[1].a[i]).length;
  const cap = `8人を k＝2 で分けます。① 重心を左下の2人の位置に置くと、右の4人も近い方の重心に割り当てられ、平方和は ${f1(steps[0].w)} です。② 重心をそれぞれの群の平均へ移して割り当て直すと、${moved}人が群を移り、平方和は ${f1(steps[1].w)} に減ります。③ もう一度移しても割り当てが変わらないので止まり、平方和は ${f1(steps[last].w)} です。`;
  return fig(svg, cap);
}

// ============ 2.5：k の決め方（エルボー法とシルエット係数） ============
const ELBOW_PTS: [number, number][] = [[1, 1.2], [1.6, 0.8], [1.4, 1.8], [2, 1.4], [0.8, 1.6], [5, 1.4], [5.6, 0.8], [6, 1.6], [5.4, 2], [4.8, 0.9], [3.2, 4.6], [3.8, 5.2], [3, 5.4], [3.6, 4.2], [4.2, 4.8]];
function elbowSilhouette(): string {
  const P = ELBOW_PTS, n = P.length;
  const d2 = (a: number[], b: number[]) => (a[0] - b[0]) ** 2 + (a[1] - b[1]) ** 2;
  const lloyd = (C0: number[][]) => {
    let C = C0, a: number[] = [];
    for (let it = 0; it < 30; it++) {
      a = P.map((p) => { let b = 0; C.forEach((c, k) => { if (d2(p, c) < d2(p, C[b])) b = k; }); return b; });
      const N = C.map((c, k) => { const m = P.filter((_, i) => a[i] === k); return m.length ? [m.reduce((s, p) => s + p[0], 0) / m.length, m.reduce((s, p) => s + p[1], 0) / m.length] : c; });
      if (N.every((c, k) => d2(c, C[k]) < 1e-12)) break;
      C = N;
    }
    return { a, w: P.reduce((s, p, i) => s + d2(p, C[a[i]]), 0) };
  };
  // 初めの重心をデータ点の全組み合わせから選び、平方和が最小の結果を使う
  const best = (k: number) => {
    let b = { a: [] as number[], w: Infinity };
    const rec = (st: number, cur: number[]) => {
      if (cur.length === k) { const r = lloyd(cur.map((i) => [...P[i]])); if (r.w < b.w - 1e-9) b = r; return; }
      for (let i = st; i < n; i++) rec(i + 1, [...cur, i]);
    };
    rec(0, []);
    return b;
  };
  const dist = (i: number, j: number) => Math.sqrt(d2(P[i], P[j]));
  const sil = (a: number[], k: number) => {
    let S = 0;
    for (let i = 0; i < n; i++) {
      const own = P.map((_, j) => j).filter((j) => j !== i && a[j] === a[i]);
      if (!own.length) continue;
      const ai = own.reduce((s, j) => s + dist(i, j), 0) / own.length;
      let bi = Infinity;
      for (let c = 0; c < k; c++) {
        if (c === a[i]) continue;
        const o = P.map((_, j) => j).filter((j) => a[j] === c);
        if (o.length) bi = Math.min(bi, o.reduce((s, j) => s + dist(i, j), 0) / o.length);
      }
      S += (bi - ai) / Math.max(ai, bi);
    }
    return S / n;
  };
  const ks = [1, 2, 3, 4, 5];
  const res = ks.map((k) => { const r = best(k); return { k, w: r.w, s: k > 1 ? sil(r.a, k) : NaN }; });
  const W = 350, H = 230;
  const A = { x: 36, y: 34, w: 124, h: 140 }, B = { x: 206, y: 34, w: 118, h: 140 };
  const wMax = Math.ceil(res[0].w / 20) * 20;
  const ax = (bx: typeof A, k: number) => bx.x + ((k - 1) / 4) * bx.w;
  const ay = (v: number) => A.y + A.h - (v / wMax) * A.h;
  const by = (v: number) => B.y + B.h - (v / 1) * B.h;
  const xt = (bx: typeof A) => ks.map((k) => `<text x="${f1(ax(bx, k))}" y="${bx.y + bx.h + 15}" text-anchor="middle" font-size="12.4" fill="${SLATE}">${k}</text>`).join('');
  const sr = res.filter((r) => r.k > 1);
  const top = sr.reduce((a, b) => (b.s > a.s ? b : a));
  const svg = `${svgOpen(W, H, '15人のデータで k を1から5まで変えたときの平方和とシルエット係数。平方和は k＝3 で急に減り方が緩くなり、シルエット係数は k＝3 で最大')}
    <text x="${A.x - 30}" y="${A.y - 16}" font-size="12.4" font-weight="700" fill="${INK}">エルボー法（平方和）</text>
    <text x="${B.x - 26}" y="${B.y - 16}" font-size="12.4" font-weight="700" fill="${INK}">平均シルエット係数</text>
    <line x1="${A.x}" y1="${A.y + A.h}" x2="${A.x + A.w}" y2="${A.y + A.h}" stroke="${SLATE}" /><line x1="${A.x}" y1="${A.y}" x2="${A.x}" y2="${A.y + A.h}" stroke="${SLATE}" />
    <line x1="${B.x}" y1="${B.y + B.h}" x2="${B.x + B.w}" y2="${B.y + B.h}" stroke="${SLATE}" /><line x1="${B.x}" y1="${B.y}" x2="${B.x}" y2="${B.y + B.h}" stroke="${SLATE}" />
    ${[0, wMax / 2, wMax].map((v) => `<text x="${A.x - 5}" y="${f1(ay(v) + 4)}" text-anchor="end" font-size="12.4" fill="${SLATE}">${v}</text>`).join('')}
    ${[0, 0.5, 1].map((v) => `<text x="${B.x - 5}" y="${f1(by(v) + 4)}" text-anchor="end" font-size="12.4" fill="${SLATE}">${v}</text>`).join('')}
    ${xt(A)}${xt(B)}
    <polyline points="${res.map((r) => `${f1(ax(A, r.k))},${f1(ay(r.w))}`).join(' ')}" fill="none" stroke="${INDIGO}" stroke-width="2" />
    ${res.map((r) => `<circle cx="${f1(ax(A, r.k))}" cy="${f1(ay(r.w))}" r="${r.k === 3 ? 5.5 : 3.5}" fill="${r.k === 3 ? ROSE : INDIGO}" />`).join('')}
    <text x="${f1(ax(A, 3) + 4)}" y="${f1(ay(res[2].w) - 10)}" font-size="12.4" fill="${ROSE}">肘 k＝3</text>
    <polyline points="${sr.map((r) => `${f1(ax(B, r.k))},${f1(by(r.s))}`).join(' ')}" fill="none" stroke="${TEAL}" stroke-width="2" />
    ${sr.map((r) => `<circle cx="${f1(ax(B, r.k))}" cy="${f1(by(r.s))}" r="${r.k === top.k ? 5.5 : 3.5}" fill="${r.k === top.k ? ROSE : TEAL}" /><text x="${f1(ax(B, r.k))}" y="${f1(by(r.s) + (r.k === top.k ? -10 : 18))}" text-anchor="middle" font-size="12.4" fill="${r.k === top.k ? ROSE : INK}">${f2(r.s)}</text>`).join('')}
    <text x="${W / 2}" y="${H - 8}" text-anchor="middle" font-size="12.4" fill="${SLATE}">横軸＝クラスターの数 k（15人・3つのまとまり）</text>
  </svg>`;
  const cap = `3つのまとまりがある15人のデータに、k＝1〜5 で k-means を当てはめました。平方和は k＝2 で ${f1(res[1].w)}、k＝3 で ${f1(res[2].w)} と大きく減り、その先は ${f1(res[3].w)}・${f1(res[4].w)} とほとんど減りません。この曲がり目（肘）が k＝3 です。平均シルエット係数も k＝3 の ${f2(res[2].s)} が最も大きく、2つの方法の答えがそろいます。`;
  return fig(svg, cap);
}

// ============ 3.2：時系列（トレンドと季節性） ============
function timeSeries(): string {
  const W = 350, H = 230;
  const a = 181.25, base = 331.25, s = 1.25;
  const y = (t: number) => base + s * t - a * Math.cos((2 * Math.PI * t) / 12);
  const b: Box = { x: 40, y: 24, w: 296, h: 150, xMin: 0, xMax: 35, yMax: 1 };
  const yMin = 0, yMax = 600;
  const py = (v: number) => b.y + b.h - ((v - yMin) / (yMax - yMin)) * b.h;
  const pts = Array.from({ length: 36 }, (_, t) => `${f1(PX(b, t))},${f1(py(y(t)))}`).join(' ');
  const svg = `${svgOpen(W, H, 'アイスクリームの月次売上：夏に高く冬に低い季節性と、少しずつ伸びるトレンド')}
    ${[100, 300, 500].map((v) => `<text x="${b.x - 6}" y="${f1(py(v) + 4)}" text-anchor="end" font-size="12.4" fill="${SLATE}">${v}</text><line x1="${b.x}" y1="${f1(py(v))}" x2="${b.x + b.w}" y2="${f1(py(v))}" stroke="#f1f5f9" />`).join('')}
    <polyline points="${pts}" fill="none" stroke="${INDIGO}" stroke-width="2" />
    ${Array.from({ length: 36 }, (_, t) => `<circle cx="${f1(PX(b, t))}" cy="${f1(py(y(t)))}" r="2.2" fill="${INDIGO}" />`).join('')}
    <line x1="${f1(PX(b, 0))}" y1="${f1(py(base))}" x2="${f1(PX(b, 35))}" y2="${f1(py(base + s * 35))}" stroke="${AMBER}" stroke-width="1.8" stroke-dasharray="5 3" />
    <text x="${f1(PX(b, 35))}" y="${f1(py(base + s * 35) - 6)}" text-anchor="end" font-size="12.4" fill="#b45309">トレンド</text>
    ${[0, 12, 24].map((t, i) => `<text x="${f1(PX(b, t))}" y="${b.y + b.h + 14}" text-anchor="middle" font-size="12.4" fill="${SLATE}">${i + 1}年目1月</text>`).join('')}
    <text x="${f1(PX(b, 6))}" y="${f1(py(y(6)) - 8)}" text-anchor="middle" font-size="12.4" fill="${INK}">7月 ${Math.round(y(6))}</text>
    <text x="${f1(PX(b, 0) + 4)}" y="${f1(py(y(0)) + 16)}" font-size="12.4" fill="${INK}">1月 ${Math.round(y(0))}</text>
    <text x="${b.x + b.w / 2}" y="${H - 4}" text-anchor="middle" font-size="12.4" fill="${SLATE}">月次売上（万円）の3年分</text>
  </svg>`;
  const cap = `本文の数字（1月 ${Math.round(y(0))}万円・7月 ${Math.round(y(6))}万円・翌1月 ${Math.round(y(12))}万円）に合わせて3年分を描いたものです。12か月ごとに山と谷をくり返す波が<strong>季節性</strong>、波の中心が少しずつ上がっていく橙の点線が<strong>トレンド</strong>です。12か月前の値と今の値がよく似ているので、ラグ12の自己相関が高くなります。トレンドがある系列は平均が時間とともに変わるので、そのままでは定常ではありません。差分をとると、この右上がりが取り除かれます。`;
  return fig(svg, cap);
}

// ============ 3.5：カプラン・マイヤー曲線 ============
function kaplanMeier(): string {
  // 10人の追跡（年）。+ は打ち切り
  const data: [number, boolean][] = [[0.8, true], [1.2, false], [1.5, true], [2.0, true], [2.4, false], [3.1, true], [3.5, false], [4.0, true], [4.6, false], [5.0, false]];
  const sorted = [...data].sort((a, b) => a[0] - b[0]);
  let S = 1, atRisk = sorted.length;
  const steps: [number, number][] = [[0, 1]];
  const cens: [number, number][] = [];
  const rows: string[] = [];
  for (const [t, ev] of sorted) {
    if (ev) { const s0 = S; S = S * (1 - 1 / atRisk); steps.push([t, S]); rows.push(`${t}年 ${atRisk}人中1人 → ${f2(s0)}×(1−1/${atRisk}) = ${f2(S)}`); }
    else cens.push([t, S]);
    atRisk--;
  }
  const W = 350, H = 230;
  const b: Box = { x: 36, y: 20, w: 296, h: 160, xMin: 0, xMax: 5.2, yMax: 1.05 };
  let path = `M${f1(PX(b, 0))},${f1(PY(b, 1))}`;
  for (let i = 1; i < steps.length; i++) path += ` H${f1(PX(b, steps[i][0]))} V${f1(PY(b, steps[i][1]))}`;
  path += ` H${f1(PX(b, 5.2))}`;
  const svg = `${svgOpen(W, H, 'カプラン・マイヤー曲線：死亡のたびに階段状に下がり、打ち切りは印だけで下がらない')}
    ${axes(b, [0, 1, 2, 3, 4, 5])}
    ${[0, 0.5, 1].map((v) => `<text x="${b.x - 6}" y="${f1(PY(b, v) + 4)}" text-anchor="end" font-size="12.4" fill="${SLATE}">${v}</text>`).join('')}
    <path d="${path}" fill="none" stroke="${INDIGO}" stroke-width="2.2" />
    ${cens.map(([t, s]) => `<line x1="${f1(PX(b, t))}" y1="${f1(PY(b, s) - 6)}" x2="${f1(PX(b, t))}" y2="${f1(PY(b, s) + 6)}" stroke="${AMBER}" stroke-width="2" />`).join('')}
    <text x="${b.x + b.w}" y="${b.y + 12}" text-anchor="end" font-size="12.4" fill="#b45309">｜＝打ち切り（その時点まで生存）</text>
    <text x="${b.x + b.w / 2}" y="${H - 4}" text-anchor="middle" font-size="12.4" fill="${SLATE}">横軸＝追跡年数／縦軸＝推定した生存割合 Ŝ(t)</text>
  </svg>`;
  const cap = `10人を最長5年追跡した例です。死亡が起きた時点でだけ、そのときまだ観察中の人数（リスク集合）を分母にして曲線が下がります（${rows.slice(0, 2).join('、')} …）。橙の縦線は打ち切りで、その人は以後の分母から外れますが、曲線は下がりません。5年時点の推定生存割合は ${f2(S)} です。打ち切りを「死亡」として数えると下がり過ぎ、「最初からいなかった」として除くと分母を誤ります。`;
  return fig(svg, cap);
}

// ============ 3.6：モンテカルロ法で円周率 ============
function monteCarloPi(): string {
  const r = mulberry32(3606);
  const N = 500;
  const pts = Array.from({ length: N }, () => [r(), r()]);
  const inside = pts.filter(([x, y]) => x * x + y * y <= 1).length;
  const est = (4 * inside) / N;
  const W = 340, H = 250;
  const S = 190, x0 = 20, y0 = 20;
  const arc = Array.from({ length: 61 }, (_, k) => { const t = (Math.PI / 2) * (k / 60); return `${f1(x0 + Math.cos(t) * S)},${f1(y0 + S - Math.sin(t) * S)}`; }).join(' ');
  const svg = `${svgOpen(W, H, '正方形に500点を打ち、四分円の内側に入った割合から円周率を推定する')}
    <rect x="${x0}" y="${y0}" width="${S}" height="${S}" fill="none" stroke="${SLATE}" />
    <polyline points="${arc}" fill="none" stroke="${INK}" stroke-width="1.6" />
    ${pts.map(([x, y]) => `<circle cx="${f1(x0 + x * S)}" cy="${f1(y0 + S - y * S)}" r="1.7" fill="${x * x + y * y <= 1 ? INDIGO : AMBER}" />`).join('')}
    <text x="${x0 + S + 14}" y="${y0 + 20}" font-size="13.2" fill="${INK}">点の数 ${N}</text>
    <text x="${x0 + S + 14}" y="${y0 + 40}" font-size="13.2" fill="${INDIGO}">内側 ${inside}</text>
    <text x="${x0 + S + 14}" y="${y0 + 60}" font-size="13.2" fill="#b45309">外側 ${N - inside}</text>
    <text x="${x0 + S + 14}" y="${y0 + 92}" font-size="13.2" font-weight="700" fill="${INK}">4 × ${inside} ÷ ${N}</text>
    <text x="${x0 + S + 14}" y="${y0 + 110}" font-size="13.2" font-weight="700" fill="${INK}">＝ ${est.toFixed(3)}</text>
    <text x="${x0 + S + 14}" y="${y0 + 134}" font-size="12.4" fill="${SLATE}">（π ＝ 3.142）</text>
  </svg>`;
  const cap = `一辺1の正方形に ${N} 個の点を一様にばらまき、半径1の四分円の内側に落ちた点（青）を数えました。四分円の面積は π/4 なので、内側に落ちる割合の4倍が π の推定値になり、今回は 4 × ${inside} ÷ ${N} = ${est.toFixed(3)} です。点を増やすほど推定値は π に近づきますが、誤差は点の数の平方根に反比例してしか減りません（点を100倍にして誤差がようやく1/10）。`;
  return fig(svg, cap);
}

// ============ 1.6 節1：離散一様分布（サイコロ） ============
function uniformDice(): string {
  const W = 340, H = 200;
  const b: Box = { x: 30, y: 26, w: 296, h: 120, xMin: 0.5, xMax: 6.5, yMax: 0.25 };
  const mean = 3.5, v = 35 / 12;
  const svg = `${svgOpen(W, H, 'サイコロの目は1から6まで同じ確率1/6の離散一様分布')}
    ${axes(b, [1, 2, 3, 4, 5, 6])}
    ${bars(b, [1, 2, 3, 4, 5, 6], Array(6).fill(1 / 6), INDIGO, 0.4)}
    <text x="${b.x - 4}" y="${f1(PY(b, 1 / 6) + 4)}" text-anchor="end" font-size="12.4" fill="${SLATE}">1/6</text>
    <line x1="${f1(PX(b, mean))}" y1="${b.y}" x2="${f1(PX(b, mean))}" y2="${b.y + b.h}" stroke="${AMBER}" stroke-width="1.6" stroke-dasharray="4 3" />
    <text x="${f1(PX(b, mean))}" y="${b.y - 8}" text-anchor="middle" font-size="13.2" font-weight="700" fill="#b45309">平均 3.5（どの目でもない）</text>
    <line x1="${f1(PX(b, mean - Math.sqrt(v)))}" y1="${b.y + b.h + 26}" x2="${f1(PX(b, mean + Math.sqrt(v)))}" y2="${b.y + b.h + 26}" stroke="${TEAL}" stroke-width="2" />
    <text x="${f1(PX(b, mean))}" y="${b.y + b.h + 42}" text-anchor="middle" font-size="12.4" fill="${TEAL}">平均 ± 標準偏差 √(35/12) ≈ ${f2(Math.sqrt(v))}</text>
  </svg>`;
  const cap = `サイコロの目の分布です。棒の高さはどれも 1/6 で、山も谷もない平らな形が<strong>一様</strong>という名前の意味です。平均 (6+1)/2 = 3.5 は棒の真ん中の位置で、実際には出ない値です。分散は (6² − 1)/12 = 35/12 ≈ ${f2(v)}、標準偏差は約 ${f2(Math.sqrt(v))} で、緑の線の幅がそのおおよその広がりです。`;
  return fig(svg, cap);
}

// ============ 1.6 節2：ベルヌーイ分布と分散 p(1−p) ============
function bernoulli(): string {
  const W = 350, H = 220;
  const L: Box = { x: 22, y: 36, w: 120, h: 130, xMin: -0.5, xMax: 1.5, yMax: 1 };
  const R: Box = { x: 186, y: 36, w: 150, h: 130, xMin: 0, xMax: 1, yMax: 0.3 };
  const p = 0.3;
  const svg = `${svgOpen(W, H, 'ベルヌーイ分布は0と1の2本の棒。分散 p(1−p) は p=0.5 で最大の0.25')}
    <text x="${L.x}" y="16" font-size="13.2" font-weight="700" fill="${INK}">p = ${p} のとき</text>
    ${axes(L, [0, 1])}
    ${bars(L, [0, 1], [1 - p, p], INDIGO, 0.45)}
    <text x="${f1(PX(L, 0))}" y="${f1(PY(L, 1 - p) - 6)}" text-anchor="middle" font-size="13.2" fill="${INK}">${1 - p}</text>
    <text x="${f1(PX(L, 1))}" y="${f1(PY(L, p) - 6)}" text-anchor="middle" font-size="13.2" fill="${INK}">${p}</text>
    <text x="${f1(PX(L, 0))}" y="${L.y + L.h + 28}" text-anchor="middle" font-size="12.4" fill="${SLATE}">失敗</text>
    <text x="${f1(PX(L, 1))}" y="${L.y + L.h + 28}" text-anchor="middle" font-size="12.4" fill="${SLATE}">成功</text>
    <text x="${R.x}" y="16" font-size="13.2" font-weight="700" fill="${INK}">分散 p(1−p) と p の関係</text>
    ${axes(R, [0, 0.5, 1])}
    ${curve(R, (x) => x * (1 - x), TEAL)}
    <circle cx="${f1(PX(R, 0.5))}" cy="${f1(PY(R, 0.25))}" r="3.5" fill="${TEAL}" />
    <text x="${f1(PX(R, 0.5))}" y="${f1(PY(R, 0.25) - 8)}" text-anchor="middle" font-size="12.4" fill="${TEAL}">p=0.5 で最大 0.25</text>
    <circle cx="${f1(PX(R, p))}" cy="${f1(PY(R, p * (1 - p)))}" r="3.5" fill="${INDIGO}" />
    <text x="${f1(PX(R, p) - 6)}" y="${f1(PY(R, p * (1 - p)) + 16)}" text-anchor="end" font-size="12.4" fill="${INDIGO}">${f2(p * (1 - p))}</text>
    <text x="${R.x + R.w / 2}" y="${R.y + R.h + 28}" text-anchor="middle" font-size="12.4" fill="${SLATE}">横軸 ＝ 成功確率 p</text>
  </svg>`;
  const cap = `左はベルヌーイ分布そのもので、値は0（失敗）と1（成功）の2つだけです。p = ${p} なら成功の棒が ${p}、失敗の棒が ${1 - p} です。右は分散 p(1−p) を p の関数として描いたもので、p = 0.5（どちらが出るか最も読めない）で最大の 0.25 になり、p が0や1に近づくほど結果が決まりきって分散は0に近づきます。p = ${p} の分散は ${f2(p * (1 - p))} です。`;
  return fig(svg, cap);
}

// ============ 1.6 節4：超幾何分布と二項分布 ============
function hypergeo(): string {
  const N = 15, K = 5, n = 4;
  const hg = (k: number) => (choose(K, k) * choose(N - K, n - k)) / choose(N, n);
  const bn = (k: number) => binom(n, K / N, k);
  const ks = range(0, n);
  const W = 340, H = 220;
  const b: Box = { x: 30, y: 30, w: 296, h: 140, xMin: -0.5, xMax: 4.5, yMax: 0.5 };
  const w = (PX(b, 1) - PX(b, 0)) * 0.34;
  const bar = (k: number, v: number, dx: number, c: string) => { const y = PY(b, v); return `<rect x="${f1(PX(b, k) + dx)}" y="${f1(y)}" width="${f1(w)}" height="${f1(b.y + b.h - y)}" fill="${c}" fill-opacity="0.8" />`; };
  const vh = n * (K / N) * ((N - K) / N) * ((N - n) / (N - 1));
  const vb = n * (K / N) * (1 - K / N);
  const svg = `${svgOpen(W, H, '赤玉5個・青玉10個から4個取り出す：戻さない超幾何分布と、戻す二項分布の比較')}
    ${axes(b, ks)}
    ${ks.map((k) => bar(k, hg(k), -w, INDIGO) + bar(k, bn(k), 0, AMBER)).join('')}
    ${ks.map((k) => `<text x="${f1(PX(b, k) - w / 2)}" y="${f1(PY(b, hg(k)) - 4)}" text-anchor="middle" font-size="12.4" fill="${INDIGO}">${hg(k) < 0.01 ? hg(k).toFixed(3) : f2(hg(k))}</text>`).join('')}
    <rect x="${b.x + 150}" y="${b.y - 2}" width="10" height="10" fill="${INDIGO}" /><text x="${b.x + 164}" y="${b.y + 7}" font-size="12.4" fill="${INK}">戻さない（超幾何）</text>
    <rect x="${b.x + 150}" y="${b.y + 14}" width="10" height="10" fill="${AMBER}" /><text x="${b.x + 164}" y="${b.y + 23}" font-size="12.4" fill="${INK}">戻す（二項 B(4, 1/3)）</text>
    <text x="${b.x + b.w / 2}" y="${H - 4}" text-anchor="middle" font-size="12.4" fill="${SLATE}">横軸 ＝ 4個のうちの赤玉の数 k</text>
  </svg>`;
  const cap = `本文の例（赤玉${K}個・青玉${N - K}個の計${N}個から${n}個取り出す）を描きました。青が戻さない場合（超幾何分布）、橙が毎回戻す場合（二項分布 B(${n}, 1/3)）です。平均はどちらも ${n} × ${K}/${N} ≈ ${f2((n * K) / N)} ですが、戻さない方が両端（0個・${n}個）が出にくく、真ん中に寄ります。分散で比べると超幾何 ${f2(vh)}、二項 ${f2(vb)} で、比 ${f2(vh / vb)} がちょうど有限母集団修正 (${N}−${n})/(${N}−1) です。母集団が取り出す数よりずっと大きければ、この差はほとんど消えます。`;
  return fig(svg, cap);
}

// ============ 1.22：対数尤度の曲がり具合（フィッシャー情報量） ============
function logLikCurvature(): string {
  const W = 350, H = 236;
  const b: Box = { x: 30, y: 24, w: 304, h: 144, xMin: 0.4, xMax: 0.95, yMax: 6 };
  const ph = 0.7;
  // 最大値を 0 にそろえた対数尤度 l(p) - l(p̂)。縦軸は上端が 0・下に伸びる値を 6 + l で描く
  const rel = (n: number) => (p: number) => Math.max(0, 6 + n * (ph * Math.log(p / ph) + (1 - ph) * Math.log((1 - p) / (1 - ph))));
  const curv = (n: number) => n / (ph * (1 - ph));
  const svg = `${svgOpen(W, H, '対数尤度の曲がり具合：同じ 7 割でも、100回のデータの山は10回のデータの山より鋭く、曲率が10倍になる')}
    ${axes(b, [0.4, 0.5, 0.6, 0.7, 0.8, 0.9])}
    ${curve(b, rel(10), INDIGO, 0.4, 0.95, 2.4)}
    ${curve(b, rel(100), AMBER, 0.4, 0.95, 2.4)}
    <line x1="${f1(PX(b, ph))}" y1="${b.y}" x2="${f1(PX(b, ph))}" y2="${b.y + b.h}" stroke="${ROSE}" stroke-width="1.2" stroke-dasharray="4 3" />
    <text x="${f1(PX(b, ph) + 5)}" y="${b.y + 12}" font-size="12.4" fill="${ROSE}">頂上 ${ph}</text>
    <text x="${f1(PX(b, 0.41))}" y="${f1(PY(b, 5.4))}" font-size="13.2" font-weight="700" fill="${INDIGO}">10回中7回</text>
    <text x="${f1(PX(b, 0.69))}" y="${f1(PY(b, 1.0))}" text-anchor="end" font-size="13.2" font-weight="700" fill="#b45309">100回中70回</text>
    <text x="${b.x + b.w / 2}" y="${H - 20}" text-anchor="middle" font-size="12.4" fill="${SLATE}">横軸＝p の候補</text>
    <text x="${b.x + b.w / 2}" y="${H - 5}" text-anchor="middle" font-size="12.4" fill="${SLATE}">縦軸＝対数尤度（頂上を 0 とし、下は −6 で打ち切り）</text>
  </svg>`;
  const cap = `同じ「表が7割」のデータでも、回数で山の鋭さが変わります。対数尤度は頂上付近で放物線に近く、その<strong>曲がり具合（頂上での曲率）</strong>が、実測データで見た情報量です。ここでは 10回で ${f1(curv(10))}、100回で ${f1(curv(100))} と、観測数に比例して 10 倍になります。山が鋭いほど、頂上から少し p をずらしただけで尤度が急に下がるので、頂上の位置を狭い範囲に絞り込めます。観測1回あたりでは ${f1(curv(1))} で、これが 1 回分のフィッシャー情報量 I(p) = 1/(p(1−p)) にあたります。`;
  return fig(svg, cap);
}

// ============ 1.20：正規 Q-Q プロット ============
function qqPlot(): string {
  const W = 350, H = 236;
  const n = 30;
  const rnd = gaussFrom(mulberry32(7));
  const normalSample = Array.from({ length: n }, () => rnd()).sort((a, b) => a - b);
  const pr = (i: number) => (i + 0.5) / n;
  const inv = (cdf: (x: number) => number, p: number) => {
    let lo = -40, hi = 40;
    for (let k = 0; k < 80; k++) { const m = (lo + hi) / 2; if (cdf(m) < p) lo = m; else hi = m; }
    return (lo + hi) / 2;
  };
  // 右に裾の長いデータ＝指数分布の分位点／両裾が重いデータ＝自由度3の t 分布の分位点
  const skewSample = Array.from({ length: n }, (_, i) => -Math.log(1 - pr(i)));
  const t3cdf = (x: number) => 0.5 + (x / (Math.sqrt(3) * (1 + (x * x) / 3)) + Math.atan(x / Math.sqrt(3))) / Math.PI;
  const heavySample = Array.from({ length: n }, (_, i) => inv(t3cdf, pr(i)));
  const theo = Array.from({ length: n }, (_, i) => inv(Phi, pr(i)));
  const std = (a: number[]) => {
    const m = a.reduce((s, x) => s + x, 0) / a.length;
    const sd = Math.sqrt(a.reduce((s, x) => s + (x - m) ** 2, 0) / (a.length - 1));
    return a.map((x) => (x - m) / sd);
  };
  const S = 96, T = 34, lim = 3.4;
  const xs0 = [18, 132, 246];
  const panels: [number[], string, string, string, string][] = [
    [std(normalSample), INDIGO, '正規分布', '直線上に並ぶ', ''],
    [std(skewSample), '#b45309', '右に裾が長い', '弓なりで', '右上が上へそる'],
    [std(heavySample), TEAL, '両裾が重い', '左下は下、', '右上は上へ離れる'],
  ];
  const body = panels.map(([ys, color, title, d1, d2], k) => {
    const L = xs0[k];
    const px = (v: number) => L + ((v + lim) / (2 * lim)) * S;
    const py = (v: number) => T + S - ((v + lim) / (2 * lim)) * S;
    const dots = ys.map((y, i) => `<circle cx="${f1(px(theo[i]))}" cy="${f1(py(Math.max(-lim, Math.min(lim, y))))}" r="2.6" fill="${color}" fill-opacity="0.85" />`).join('');
    const ticks = [-2, 0, 2].map((t) => `<text x="${f1(px(t))}" y="${T + S + 14}" text-anchor="middle" font-size="12" fill="${SLATE}">${t}</text>`).join('');
    return `<rect x="${L}" y="${T}" width="${S}" height="${S}" fill="none" stroke="${SLATE}" stroke-width="1" />
    <line x1="${f1(px(-lim))}" y1="${f1(py(-lim))}" x2="${f1(px(lim))}" y2="${f1(py(lim))}" stroke="${SLATE}" stroke-width="1.1" stroke-dasharray="4 3" />
    ${dots}${ticks}
    <text x="${L + S / 2}" y="${T - 10}" text-anchor="middle" font-size="12.8" font-weight="700" fill="${color}">${title}</text>
    <text x="${L + S / 2}" y="${T + S + 32}" text-anchor="middle" font-size="12" fill="${color}">${d1}</text>
    <text x="${L + S / 2}" y="${T + S + 47}" text-anchor="middle" font-size="12" fill="${color}">${d2}</text>`;
  }).join('');
  const svg = `${svgOpen(W, H, '正規 Q-Q プロット3例：正規分布のデータは直線上、右に裾の長いデータは弓なりで右上が上へそり、両裾の重いデータは左下が下に右上が上に離れる')}
    ${body}
    <text x="${W / 2}" y="${H - 22}" text-anchor="middle" font-size="12" fill="${SLATE}">横軸＝正規分布なら来るはずの値</text>
    <text x="${W / 2}" y="${H - 6}" text-anchor="middle" font-size="12" fill="${SLATE}">縦軸＝データを小さい順に並べて標準化した値</text>
  </svg>`;
  const cap = `どれも30個のデータです。左は正規乱数、中央は指数分布、右は自由度3の t 分布から作りました。正規分布でないデータは、どちらの端がどちら向きに直線から離れるかで見分けられます。`;
  return fig(svg, cap);
}

// ============ 2.4：因子分析のパス図（因子 → 観測変数）と PCA の向きの対比 ============
function factorPath(): string {
  const W = 350, H = 300;
  const lam = [0.8, 0.7, 0.6];
  const names = ['人前で話せる', '友人が多い', 'パーティー好き'];
  const ys = [50, 90, 130];
  const rx = 172, rw = 112, rh = 28;
  const fcx = 62, fcy = 90;
  const arrow = (x1: number, y1: number, x2: number, y2: number, color: string) =>
    `<line x1="${f1(x1)}" y1="${f1(y1)}" x2="${f1(x2)}" y2="${f1(y2)}" stroke="${color}" stroke-width="1.8" marker-end="url(#pa-arrow)" />`;
  const rows = names.map((nm, i) => {
    const y = ys[i];
    const mid = { x: (fcx + 38 + rx) / 2, y: (fcy + y) / 2 };
    // 矢印の線の中点（ラベルを線の上か下へ逃がす）
    const lineMid = (fcy + (y - fcy) * 0.35 + y) / 2;
    return `
    <rect x="${rx}" y="${y - rh / 2}" width="${rw}" height="${rh}" rx="3" fill="#ffffff" stroke="${INDIGO}" stroke-width="1.6" />
    <text x="${rx + rw / 2}" y="${y + 4.5}" text-anchor="middle" font-size="12.3" fill="${INK}">${nm}</text>
    ${arrow(fcx + 38, fcy + (y - fcy) * 0.35, rx - 1, y, INDIGO)}
    <text x="${f1(mid.x - (i === 2 ? 10 : 0))}" y="${f1(lineMid + (i === 2 ? 16 : -7))}" text-anchor="middle" font-size="12.3" font-weight="700" fill="${INDIGO}">${f1(lam[i])}</text>
    ${arrow(318 - 16, y, rx + rw + 1, y, AMBER)}
    <circle cx="322" cy="${y}" r="15" fill="#fff7ed" stroke="${AMBER}" stroke-width="1.6" />
    <text x="322" y="${y + 4.5}" text-anchor="middle" font-size="12.3" fill="#b45309">u${i + 1}</text>`;
  }).join('');

  // PCA（向きが逆）
  const py0 = 206;
  const pys = [py0, py0 + 40, py0 + 80];
  const pcx = 280, pcy = py0 + 40;
  const pcaRows = names.map((nm, i) => `
    <rect x="20" y="${pys[i] - rh / 2}" width="${rw}" height="${rh}" rx="3" fill="#ffffff" stroke="${SLATE}" stroke-width="1.6" />
    <text x="${20 + rw / 2}" y="${pys[i] + 4.5}" text-anchor="middle" font-size="12.3" fill="${INK}">${nm}</text>
    ${arrow(20 + rw + 1, pys[i], pcx - 38, pcy + (pys[i] - pcy) * 0.35, SLATE)}`).join('');

  const svg = `${svgOpen(W, H, '因子分析のパス図：潜在因子から各観測変数へ矢印が出て、各変数には独自因子が付く。主成分分析は向きが逆で、観測変数から主成分を作る')}
    <defs><marker id="pa-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="${SLATE}" /></marker></defs>
    <text x="10" y="16" font-size="13" font-weight="700" fill="${INK}">因子分析：因子が変数を生む</text>
    <ellipse cx="${fcx}" cy="${fcy}" rx="38" ry="26" fill="#eef2ff" stroke="${INDIGO}" stroke-width="1.8" />
    <text x="${fcx}" y="${fcy - 2}" text-anchor="middle" font-size="12.3" font-weight="700" fill="${INDIGO}">外向性</text>
    <text x="${fcx}" y="${fcy + 12}" text-anchor="middle" font-size="12.3" fill="${INDIGO}">（因子 F）</text>
    ${rows}
    <text x="10" y="${py0 - 30}" font-size="13" font-weight="700" fill="${INK}">主成分分析：変数から軸を作る</text>
    ${pcaRows}
    <ellipse cx="${pcx}" cy="${pcy}" rx="38" ry="26" fill="#f1f5f9" stroke="${SLATE}" stroke-width="1.8" />
    <text x="${pcx}" y="${pcy + 4.5}" text-anchor="middle" font-size="12.3" font-weight="700" fill="${INK}">主成分 Z</text>
  </svg>`;
  const comm = lam.map((l) => f2(l * l));
  const uniq = lam.map((l) => f2(1 - l * l));
  const cap = `上は因子分析のパス図です。矢印の上の数が因子負荷量 λ で、「外向性が高いほど、その行動をとりやすい」強さを表します。各変数を標準化すると、λ の2乗が因子で説明できる割合（共通性）で、${comm.join('・')} になります。残りの ${uniq.join('・')} は、その変数だけに固有の独自因子 u の分です。下の主成分分析は矢印の向きが逆で、観測変数を合成して主成分を作ります。因子分析は「原因（因子）から結果（変数）」、主成分分析は「結果（変数）から要約（主成分）」の向きです。`;
  return fig(svg, cap);
}

// ============ 2.4：因子回転（同じ6点を、軸を回して読み直す） ============
// 回転後の負荷量（本文の表と同じ数）を θ だけ戻したものを初期解として描く
const FACTOR_LOADINGS: [string, number, number][] = [
  ['人前で話せる', 0.8, 0.1], ['友人が多い', 0.7, 0.2], ['パーティー好き', 0.6, 0.0],
  ['計画的', 0.1, 0.7], ['約束を守る', 0.2, 0.8], ['きれい好き', 0.0, 0.5],
];
function factorRotation(): string {
  const W = 340, H = 340, th = (40 * Math.PI) / 180, c = Math.cos(th), s = Math.sin(th);
  const pts = FACTOR_LOADINGS.map(([, a, b]) => ({ u: a * c + b * s, v: -a * s + b * c, a, b }));
  const sc = 190, ox = 70, oy = 175;
  const X = (u: number) => ox + u * sc, Y = (v: number) => oy - v * sc;
  const e1 = [c, -s], e2 = [s, c], L1 = 1.0, L2 = 0.95;
  const p0 = pts[0], h0 = p0.a ** 2 + p0.b ** 2;
  const dots = pts.map((p, i) => {
    const col = i < 3 ? INDIGO : AMBER;
    return `<circle cx="${f1(X(p.u))}" cy="${f1(Y(p.v))}" r="5" fill="${col}" />
    <text x="${f1(X(p.u) + (i === 2 ? -16 : 8))}" y="${f1(Y(p.v) + (i === 2 ? 16 : 4))}" font-size="12" font-weight="700" fill="${col}" stroke="#fff" stroke-width="3" paint-order="stroke">${i + 1}</text>`;
  }).join('');
  const ticks = [-0.5, 0.5].map((v) => `<line x1="${X(-0.04)}" y1="${f1(Y(v))}" x2="${X(0.04)}" y2="${f1(Y(v))}" stroke="${SLATE}" /><text x="${X(-0.06)}" y="${f1(Y(v) + 4)}" text-anchor="end" font-size="12" fill="${SLATE}">${v}</text>`).join('')
    + [0.5, 1].map((u) => `<line x1="${f1(X(u))}" y1="${Y(-0.04)}" x2="${f1(X(u))}" y2="${Y(0.04)}" stroke="${SLATE}" /><text x="${f1(X(u))}" y="${oy - 11}" text-anchor="middle" font-size="12" fill="${SLATE}">${u}</text>`).join('');
  const svg = `${svgOpen(W, H, `因子負荷量を点で描いた図。初期解の軸では6項目とも横軸に0.4から0.7で負荷し、縦軸の符号で2組に分かれる。軸を40度回すと、1から3は回転後の外向性の軸に、4から6は誠実性の軸に乗る。原点からの距離の2乗が共通性で、回転しても変わらない`)}
    <line x1="${X(-0.25)}" y1="${oy}" x2="${X(1.4)}" y2="${oy}" stroke="${SLATE}" stroke-width="1.4" />
    <line x1="${ox}" y1="${Y(-0.72)}" x2="${ox}" y2="${Y(0.82)}" stroke="${SLATE}" stroke-width="1.4" />
    <text x="${X(1.4)}" y="${oy + 16}" text-anchor="end" font-size="12" fill="${SLATE}">初期解 F1</text>
    <text x="${ox - 6}" y="${Y(0.82) + 10}" text-anchor="end" font-size="12" fill="${SLATE}">初期解 F2</text>
    ${ticks}
    <line x1="${ox}" y1="${oy}" x2="${f1(X(e1[0] * L1))}" y2="${f1(Y(e1[1] * L1))}" stroke="${INDIGO}" stroke-width="1.8" stroke-dasharray="6 4" />
    <line x1="${ox}" y1="${oy}" x2="${f1(X(e2[0] * L2))}" y2="${f1(Y(e2[1] * L2))}" stroke="${AMBER}" stroke-width="1.8" stroke-dasharray="6 4" />
    <text x="${f1(X(e1[0] * L1) + 6)}" y="${f1(Y(e1[1] * L1) + 4)}" font-size="12" font-weight="700" fill="${INDIGO}">回転後の軸：外向性</text>
    <text x="${f1(X(e2[0] * L2) + 6)}" y="${f1(Y(e2[1] * L2) + 4)}" font-size="12" font-weight="700" fill="#b45309">回転後の軸：誠実性</text>
    <path d="M${f1(X(0.3))},${oy} A${0.3 * sc},${0.3 * sc} 0 0 1 ${f1(X(0.3 * c))},${f1(Y(-0.3 * s))}" fill="none" stroke="${INK}" stroke-width="1.2" />
    <text x="${f1(X(0.33))}" y="${f1(Y(-0.12))}" font-size="12" fill="${INK}">40°</text>
    <line x1="${ox}" y1="${oy}" x2="${f1(X(p0.u))}" y2="${f1(Y(p0.v))}" stroke="${INK}" stroke-width="1" stroke-dasharray="2 3" />
    ${dots}
    <text x="${X(-0.3)}" y="${H - 8}" font-size="12" fill="${INK}">1 の原点からの距離² ＝ ${f2(h0)}（共通性）</text>
  </svg>`;
  const cap = `点の番号は上の負荷量の表の行です。初期解では、6項目とも F1 に ${f2(Math.min(...pts.map((p) => p.u)))}〜${f2(Math.max(...pts.map((p) => p.u)))} で負荷し、F2 の符号で2組に分かれるだけで、F1 に名前が付けられません。軸を 40° 回すと、1〜3 は外向性の軸に、4〜6 は誠実性の軸に乗ります。点は動かないので、原点からの距離（共通性）も、データを説明する力も変わりません。`;
  return fig(svg, cap);
}

// ============ 2.8：層化抽出と集落抽出（同じ8個を、どう抜くか） ============
function strataVsCluster(): string {
  const W = 350, H = 286;
  const SH = ['#60a5fa', '#a78bfa', '#f472b6']; // 値の低・中・高（身長の低・中・高のようなイメージ）
  const dotsIn = (x0: number, y0: number, shades: number[], picked: boolean[]) => shades.map((s, k) => {
    const cx = x0 + 12 + (k % 4) * 17, cy = y0 + 16 + Math.floor(k / 4) * 22;
    return picked[k]
      ? `<circle cx="${cx}" cy="${cy}" r="6" fill="${SH[s]}" stroke="${INK}" stroke-width="2.2" />`
      : `<circle cx="${cx}" cy="${cy}" r="6" fill="${SH[s]}" fill-opacity="0.38" />`;
  }).join('');
  const box = (x0: number, y0: number, label: string, shades: number[], picked: boolean[], on: boolean) =>
    `<rect x="${x0}" y="${y0}" width="78" height="58" rx="4" fill="${on ? '#f8fafc' : '#ffffff'}" stroke="${on ? INK : SLATE}" stroke-width="${on ? 2 : 1}" />
    ${dotsIn(x0, y0, shades, picked)}
    <text x="${x0 + 39}" y="${y0 + 74}" text-anchor="middle" font-size="12.3" fill="${SLATE}">${label}</text>`;
  // 層化：層の中は似ている（同じ色）。各層から 2 個ずつ
  const strata = [0, 1, 1, 2].map((s) => Array(8).fill(s));
  const pickedS = (_k: number) => Array.from({ length: 8 }, (_, j) => j === 1 || j === 6);
  // 集落：どの集落も縮図（3色が混ざる）。1 集落を丸ごと
  const mix = [0, 1, 2, 1, 0, 2, 1, 1];
  const xs = [8, 92, 176, 260];
  const top1 = 28, top2 = 172;
  const svg = `${svgOpen(W, H, '層化抽出と集落抽出：層化は似たものどうしの層から少しずつ、集落抽出は縮図になっている集落を丸ごと1つ選ぶ')}
    <text x="8" y="16" font-size="13" font-weight="700" fill="${INK}">層化抽出：各層から 2 個ずつ（計 8 個）</text>
    ${strata.map((sh, i) => box(xs[i], top1, '層' + 'ABCD'[i], sh, pickedS(i), true)).join('')}
    <text x="8" y="${top2 - 12}" font-size="13" font-weight="700" fill="${INK}">集落抽出：集落を丸ごと 1 つ選ぶ（計 8 個）</text>
    ${[0, 1, 2, 3].map((i) => box(xs[i], top2, '集落' + (i + 1), mix, Array(8).fill(i === 2), i === 2)).join('')}
    <text x="8" y="${H - 6}" font-size="12.3" fill="${SLATE}">色＝調べたい値（低・中・高）。濃い輪郭が選ばれた個体</text>
  </svg>`;
  const cap = `どちらも 32 個の母集団から 8 個を選んでいますが、選び方が違います。上の層化抽出は、層の中が似ている（同じ色）ように分け、各層から2個ずつ抜くので、低・中・高がもれなく入ります。下の集落抽出は、集落ごとに低・中・高が混ざっている（全体の縮図になっている）ことを前提に、1つの集落を丸ごと選びます。層化は<strong>層の中が似ているほど</strong>、集落抽出は<strong>集落の中が全体の縮図であるほど</strong>精度がよくなります。逆に集落の中が似た個体ばかりだと、1つ選んだだけでは偏ります。`;
  return fig(svg, cap);
}

// ============ 2.7：多次元尺度法（都市間の距離だけから地図を復元する） ============
function mdsMap(): string {
  const W = 350, H = 252;
  const R = 6371;
  const cities = [
    { n: '東京', lat: 35.68, lon: 139.69 },
    { n: '名古屋', lat: 35.18, lon: 136.91 },
    { n: '大阪', lat: 34.69, lon: 135.5 },
    { n: '福岡', lat: 33.59, lon: 130.4 },
  ];
  const rad = (d: number) => (d * Math.PI) / 180;
  const hav = (a: typeof cities[0], b: typeof cities[0]) => {
    const dl = rad(b.lat - a.lat), dn = rad(b.lon - a.lon);
    const h = Math.sin(dl / 2) ** 2 + Math.cos(rad(a.lat)) * Math.cos(rad(b.lat)) * Math.sin(dn / 2) ** 2;
    return 2 * R * Math.asin(Math.sqrt(h));
  };
  const n = cities.length;
  const D = cities.map((a) => cities.map((b) => hav(a, b)));
  // 古典的MDS：二重中心化 B = -1/2 J D² J の上位2固有ベクトル（べき乗法＋縮約）
  const D2 = D.map((r) => r.map((v) => v * v));
  const rowM = D2.map((r) => r.reduce((s, v) => s + v, 0) / n);
  const totM = rowM.reduce((s, v) => s + v, 0) / n;
  const B = D2.map((r, i) => r.map((v, j) => -0.5 * (v - rowM[i] - rowM[j] + totM)));
  const eig: { val: number; vec: number[] }[] = [];
  let M = B.map((r) => r.slice());
  for (let k = 0; k < 2; k++) {
    let v = Array.from({ length: n }, (_, i) => 1 + 0.3 * Math.sin(i * 1.7 + k));
    let val = 0;
    for (let it = 0; it < 400; it++) {
      const w = M.map((r) => r.reduce((s, x, j) => s + x * v[j], 0));
      const nrm = Math.sqrt(w.reduce((s, x) => s + x * x, 0)) || 1;
      v = w.map((x) => x / nrm);
      val = nrm;
    }
    eig.push({ val, vec: v });
    M = M.map((r, i) => r.map((x, j) => x - val * v[i] * v[j]));
  }
  const pts = cities.map((_, i) => ({ x: eig[0].vec[i] * Math.sqrt(eig[0].val), y: eig[1].vec[i] * Math.sqrt(eig[1].val) }));
  // 真の位置（北を上・km）。MDS は回転・反転が決まらないので、真の位置に最も合う向きにそろえて重ねる
  const lat0 = rad(35);
  const truth = cities.map((c) => ({ x: R * Math.cos(lat0) * rad(c.lon), y: R * rad(c.lat) }));
  const cen = (a: { x: number; y: number }[]) => ({ x: a.reduce((s, p) => s + p.x, 0) / n, y: a.reduce((s, p) => s + p.y, 0) / n });
  const tc = cen(truth), pc = cen(pts);
  const T = truth.map((p) => ({ x: p.x - tc.x, y: p.y - tc.y }));
  const align = (flip: boolean) => {
    const P = pts.map((p) => ({ x: p.x - pc.x, y: flip ? -(p.y - pc.y) : p.y - pc.y }));
    let s1 = 0, s2 = 0;
    P.forEach((p, i) => { s1 += p.x * T[i].y - p.y * T[i].x; s2 += p.x * T[i].x + p.y * T[i].y; });
    const th = Math.atan2(s1, s2);
    const Q = P.map((p) => ({ x: p.x * Math.cos(th) - p.y * Math.sin(th), y: p.x * Math.sin(th) + p.y * Math.cos(th) }));
    const err = Q.reduce((s, q, i) => s + (q.x - T[i].x) ** 2 + (q.y - T[i].y) ** 2, 0);
    return { Q, err };
  };
  const a0 = align(false), a1 = align(true);
  const best = a0.err <= a1.err ? a0 : a1;
  const maxDev = Math.max(...best.Q.map((q, i) => Math.hypot(q.x - T[i].x, q.y - T[i].y)));
  const xs = T.map((p) => p.x).concat(best.Q.map((p) => p.x)), ys = T.map((p) => p.y).concat(best.Q.map((p) => p.y));
  const xMin = Math.min(...xs), xMax = Math.max(...xs), yMin = Math.min(...ys), yMax = Math.max(...ys);
  const L = 44, Rr = 300, Tt = 34, Bb = 186;
  const k = Math.min((Rr - L) / (xMax - xMin), (Bb - Tt) / (yMax - yMin));
  const ox = L + ((Rr - L) - (xMax - xMin) * k) / 2, oy = Tt + ((Bb - Tt) - (yMax - yMin) * k) / 2;
  const sx = (x: number) => ox + (x - xMin) * k;
  const sy = (y: number) => oy + (yMax - y) * k;
  const labelDx = [6, 8, -8, -4];
  const anchor = ['start', 'start', 'end', 'start'];
  const dots = best.Q.map((q, i) => `
    <circle cx="${f1(sx(T[i].x))}" cy="${f1(sy(T[i].y))}" r="7" fill="none" stroke="${SLATE}" stroke-width="1.6" />
    <circle cx="${f1(sx(q.x))}" cy="${f1(sy(q.y))}" r="4" fill="${INDIGO}" />
    <text x="${f1(sx(T[i].x) + labelDx[i] * (anchor[i] === 'end' ? 1 : 1.4))}" y="${f1(sy(T[i].y) - 12)}" text-anchor="${anchor[i]}" font-size="12.4" font-weight="700" fill="${INK}">${cities[i].n}</text>`).join('');
  const dkm = (i: number, j: number) => Math.round(D[i][j] / 10) * 10;
  const svg = `${svgOpen(W, H, '多次元尺度法：都市間の距離だけから都市の位置を復元すると、実際の地図の位置にほぼ重なる')}
    <text x="8" y="18" font-size="13" font-weight="700" fill="${INK}">距離（km）だけから位置を復元</text>
    ${dots}
    <text x="8" y="${H - 38}" font-size="12.4" fill="${SLATE}">灰の輪＝実際の位置／青の点＝復元した位置</text>
    <text x="8" y="${H - 22}" font-size="12.4" fill="${SLATE}">入力は 4 都市の距離 6 個だけ（東京−大阪は ${dkm(0, 2)} km など）</text>
    <text x="8" y="${H - 6}" font-size="12.4" fill="${SLATE}">北は上（向きは実際にそろえた）</text>
  </svg>`;
  const cap = `MDS に渡したのは、4都市の間の距離（球面上の最短距離）だけです。地図も緯度経度も渡していません。それでも復元した位置（青）は、実際の位置（灰の輪）と最大 ${Math.round(maxDev)} km のずれにおさまります。距離から座標を作ると、回転や反転の自由度が残ります（距離は回しても裏返しても変わらないため）。図では実際の向きにそろえて重ねました。ずれが小さいのは、4点がほぼ平面に並んでいて、2次元で距離をほとんど説明できるからです。`;
  return fig(svg, cap);
}

// ============ 2.3：線形判別分析（ユークリッド距離の境界とのちがい） ============
function ldaBoundary(): string {
  const W = 350, H = 300;
  const rho = 0.8;
  const m1 = [-1.2, 0.6], m2 = [1.2, -0.6];
  const k = 34, cx = 175, cy = 124;
  const sx = (x: number) => cx + x * k, sy = (y: number) => cy - y * k;
  // 共分散 [[1,ρ],[ρ,1]] の等確率楕円（マハラノビス距離 r）：主軸は y=x と y=-x、半軸 r√(1±ρ)
  const r = 1.8;
  const a = r * Math.sqrt(1 + rho), b = r * Math.sqrt(1 - rho);
  const ell = (m: number[], color: string) =>
    `<ellipse cx="${f1(sx(m[0]))}" cy="${f1(sy(m[1]))}" rx="${f1(a * k)}" ry="${f1(b * k)}" transform="rotate(-45 ${f1(sx(m[0]))} ${f1(sy(m[1]))})" fill="${color}" fill-opacity="0.12" stroke="${color}" stroke-width="1.6" />`;
  // 標本点（シード固定）
  const rnd = gaussFrom(mulberry32(11));
  const sample = (m: number[], n: number) => Array.from({ length: n }, () => {
    const z1 = rnd(), z2 = rnd();
    return [m[0] + z1, m[1] + rho * z1 + Math.sqrt(1 - rho * rho) * z2];
  });
  const pts = (ps: number[][], color: string) => ps.map((p) => `<circle cx="${f1(sx(p[0]))}" cy="${f1(sy(p[1]))}" r="2.8" fill="${color}" fill-opacity="0.85" />`).join('');
  // 境界線：LDA は w = Σ⁻¹(μ1−μ2) に垂直で中点を通る。ユークリッドは (μ1−μ2) に垂直で中点を通る
  const det = 1 - rho * rho;
  const d = [m1[0] - m2[0], m1[1] - m2[1]];
  const w = [(d[0] - rho * d[1]) / det, (-rho * d[0] + d[1]) / det];
  const mid = [(m1[0] + m2[0]) / 2, (m1[1] + m2[1]) / 2];
  const line = (nv: number[], color: string, dash: string) => {
    const t = [-nv[1], nv[0]], L = 5 / Math.hypot(t[0], t[1]);
    const p1 = [mid[0] - t[0] * L, mid[1] - t[1] * L], p2 = [mid[0] + t[0] * L, mid[1] + t[1] * L];
    return `<line x1="${f1(sx(p1[0]))}" y1="${f1(sy(p1[1]))}" x2="${f1(sx(p2[0]))}" y2="${f1(sy(p2[1]))}" stroke="${color}" stroke-width="2.2" ${dash ? `stroke-dasharray="${dash}"` : ''} />`;
  };
  const ang = (v: number[]) => Math.round((Math.atan2(v[1], v[0]) * 180) / Math.PI);
  const svg = `${svgOpen(W, H, '線形判別分析の境界：2群が同じ向きの楕円状に広がるとき、LDA の境界は中点の垂直二等分線ではなく、楕円の形に合わせて傾く')}
    <rect x="8" y="14" width="334" height="220" fill="none" stroke="${SLATE}" stroke-width="1" />
    ${ell(m1, INDIGO)}${ell(m2, AMBER)}
    ${pts(sample(m1, 16), INDIGO)}${pts(sample(m2, 16), AMBER)}
    <clipPath id="lda-clip"><rect x="8" y="14" width="334" height="220" /></clipPath>
    <g clip-path="url(#lda-clip)">${line(d, SLATE, '5 4')}${line(w, ROSE, '')}</g>
    <circle cx="${f1(sx(m1[0]))}" cy="${f1(sy(m1[1]))}" r="4.5" fill="#ffffff" stroke="${INDIGO}" stroke-width="2" />
    <circle cx="${f1(sx(m2[0]))}" cy="${f1(sy(m2[1]))}" r="4.5" fill="#ffffff" stroke="${AMBER}" stroke-width="2" />
    <text x="14" y="30" font-size="13" font-weight="700" fill="${INDIGO}">グループ 1</text>
    <text x="336" y="226" text-anchor="end" font-size="13" font-weight="700" fill="#b45309">グループ 2</text>
    <line x1="14" y1="252" x2="40" y2="252" stroke="${ROSE}" stroke-width="2.2" />
    <text x="46" y="256" font-size="12.4" fill="${INK}">LDA の境界（楕円の形を考慮）</text>
    <line x1="14" y1="272" x2="40" y2="272" stroke="${SLATE}" stroke-width="2.2" stroke-dasharray="5 4" />
    <text x="46" y="276" font-size="12.4" fill="${INK}">2 つの平均の中点で垂直に切る境界</text>
    <text x="14" y="293" font-size="12.3" fill="${SLATE}">輪＝各群の平均／楕円＝各群の点の大半が入る範囲</text>
  </svg>`;
  const cap = `2群は同じ向きの楕円に広がっています（相関 ${rho}）。平均の中点で垂直に切る灰の破線では、楕円の長い向きに伸びた裾が相手側にはみ出します。LDA の境界（赤）は楕円の形に合わせて約 ${Math.abs(ang(w) - ang(d))} 度傾き、裾を分けます。`;
  return fig(svg, cap);
}

// ============ 2.3：閾値1つが混同行列の1組になり、閾値を動かすと ROC 曲線を描く ============
function rocCurve(): string {
  const W = 340, H = 372, dp = 2.5, th = 1.25, nP = 200, nN = 800;
  const fpr = 1 - Phi(th), tpr = 1 - Phi(th - dp), auc = Phi(dp / Math.SQRT2);
  // 第3節の混同行列は、この閾値で数えた通数（約85通・約179通）
  const fp = Math.round(nN * fpr), tp = Math.round(nP * tpr);
  // 上：得点の分布（正常 N(0,1)、スパム N(dp,1)）と閾値
  const t = { x: 20, y: 40, w: 310, h: 92, lo: -3, hi: 5.5 };
  const X = (v: number) => t.x + ((v - t.lo) / (t.hi - t.lo)) * t.w, Yd = (v: number) => t.y + t.h - (v / 0.42) * t.h;
  const curve = (m: number, from: number, to: number, close: boolean) => {
    const xs = Array.from({ length: 81 }, (_, i) => from + ((to - from) * i) / 80);
    const d = xs.map((x, i) => `${i ? 'L' : 'M'}${f1(X(x))},${f1(Yd(normPdf(x, m)))}`).join('');
    return close ? `${d}L${f1(X(to))},${t.y + t.h}L${f1(X(from))},${t.y + t.h}Z` : d;
  };
  // 下：ROC 曲線
  const r = { x: 96, y: 186, s: 150 };
  const RX = (v: number) => r.x + v * r.s, RY = (v: number) => r.y + r.s - v * r.s;
  const roc = Array.from({ length: 121 }, (_, i) => { const c = 6 - (10 * i) / 120; return `${i ? 'L' : 'M'}${f1(RX(1 - Phi(c)))},${f1(RY(1 - Phi(c - dp)))}`; }).join('');
  const svg = `${svgOpen(W, H, `上は正常とスパムの判別得点の分布と閾値 ${th}。閾値より右の正常が偽陽性 ${pct(fpr)}、右のスパムが真陽性 ${pct(tpr)}。下は閾値を動かしたときの ROC 曲線で、この閾値は点 (${f2(fp / nN)}, ${f2(tp / nP)})、AUC は ${f2(auc)}`)}
    <text x="4" y="14" font-size="12.4" font-weight="700" fill="${INK}">判別得点の分布と閾値</text>
    <text x="4" y="31" font-size="12"><tspan fill="${TEAL}">■ 正常（陰性）</tspan>　<tspan fill="${ROSE}">■ スパム（陽性）</tspan></text>
    <path d="${curve(dp, th, t.hi, true)}" fill="${ROSE}" fill-opacity="0.25" />
    <path d="${curve(0, th, t.hi, true)}" fill="${TEAL}" fill-opacity="0.45" />
    <path d="${curve(0, t.lo, t.hi, false)}" fill="none" stroke="${TEAL}" stroke-width="1.8" />
    <path d="${curve(dp, t.lo, t.hi, false)}" fill="none" stroke="${ROSE}" stroke-width="1.8" />
    <line x1="${t.x}" y1="${t.y + t.h}" x2="${t.x + t.w}" y2="${t.y + t.h}" stroke="${SLATE}" />
    ${[-2, 0, 2, 4].map((v) => `<text x="${f1(X(v))}" y="${t.y + t.h + 14}" text-anchor="middle" font-size="12" fill="${SLATE}">${v}</text>`).join('')}
    <line x1="${f1(X(th))}" y1="${t.y - 4}" x2="${f1(X(th))}" y2="${t.y + t.h}" stroke="${INK}" stroke-width="1.6" stroke-dasharray="4 3" />
    <text x="${f1(X(th) + 4)}" y="${t.y + 6}" font-size="12" fill="${INK}">閾値</text>
    <text x="${f1(X(th) + 6)}" y="${f1(Yd(0.05))}" font-size="12" fill="${TEAL}" stroke="#fff" stroke-width="3" paint-order="stroke">偽陽性 ${pct(fpr)}</text>
    <text x="${f1(X(dp) + 12)}" y="${f1(Yd(0.3))}" font-size="12" fill="${ROSE}" stroke="#fff" stroke-width="3" paint-order="stroke">真陽性 ${pct(tpr)}</text>
    <text x="4" y="${r.y - 14}" font-size="12.4" font-weight="700" fill="${INK}">閾値を動かすと → ROC 曲線（AUC ${f2(auc)}）</text>
    <path d="${roc}L${RX(1)},${RY(0)}Z" fill="${INDIGO}" fill-opacity="0.12" />
    <rect x="${r.x}" y="${r.y}" width="${r.s}" height="${r.s}" fill="none" stroke="${SLATE}" />
    <line x1="${RX(0)}" y1="${RY(0)}" x2="${RX(1)}" y2="${RY(1)}" stroke="${SLATE}" stroke-dasharray="4 3" />
    <path d="${roc}" fill="none" stroke="${INDIGO}" stroke-width="2.2" />
    <circle cx="${f1(RX(fpr))}" cy="${f1(RY(tpr))}" r="5" fill="${INK}" />
    <text x="${f1(RX(fpr) + 8)}" y="${f1(RY(tpr) + 16)}" font-size="12" fill="${INK}" stroke="#fff" stroke-width="3" paint-order="stroke">上の閾値 (${f2(fp / nN)}, ${f2(tp / nP)})</text>
    <text x="${f1(RX(0.97))}" y="${f1(RY(0.08))}" text-anchor="end" font-size="12" fill="${SLATE}">破線＝対角線（AUC 0.5）</text>
    ${[0, 0.5, 1].map((v) => `<text x="${f1(RX(v))}" y="${r.y + r.s + 14}" text-anchor="middle" font-size="12" fill="${SLATE}">${v}</text><text x="${r.x - 4}" y="${f1(RY(v) + 4)}" text-anchor="end" font-size="12" fill="${SLATE}">${v}</text>`).join('')}
    <text x="${r.x + r.s / 2}" y="${H - 4}" text-anchor="middle" font-size="12" fill="${SLATE}">横軸 偽陽性率</text>
    <text x="${r.x - 30}" y="${r.y + r.s / 2}" text-anchor="middle" font-size="12" fill="${SLATE}" transform="rotate(-90 ${r.x - 30} ${r.y + r.s / 2})">縦軸 真陽性率</text>
  </svg>`;
  const cap = `正常 ${nN}通・スパム ${nP}通の得点の分布（模擬）です。閾値より右が「スパムと判定」で、正常の ${pct(fpr)}（約 ${fp}通）と、スパムの ${pct(tpr)}（約 ${tp}通）が入ります。閾値を右へ動かすと、点は ROC 曲線を左下へ進みます。`;
  return fig(svg, cap);
}

// ============ 1.23：バイアス・バリアンスのトレードオフ（多項式の次数と誤差） ============
function biasVariance(): string {
  const W = 350, H = 300;
  const n = 15, sig = 0.3, R = 300, D = 9;
  const f = (x: number) => Math.sin(Math.PI * (x + 0.3));
  const rnd = gaussFrom(mulberry32(5));
  const xs = Array.from({ length: n }, (_, i) => -1 + (2 * i) / (n - 1));
  const gx = Array.from({ length: 41 }, (_, i) => -1 + i / 20);
  const solve = (A: number[][], b: number[]) => {
    const m = b.length;
    const M = A.map((r, i) => [...r, b[i]]);
    for (let c = 0; c < m; c++) {
      let p = c;
      for (let r = c + 1; r < m; r++) if (Math.abs(M[r][c]) > Math.abs(M[p][c])) p = r;
      [M[c], M[p]] = [M[p], M[c]];
      for (let r = c + 1; r < m; r++) { const q = M[r][c] / M[c][c]; for (let k = c; k <= m; k++) M[r][k] -= q * M[c][k]; }
    }
    const x = Array(m).fill(0);
    for (let r = m - 1; r >= 0; r--) { let s = M[r][m]; for (let k = r + 1; k < m; k++) s -= M[r][k] * x[k]; x[r] = s / M[r][r]; }
    return x as number[];
  };
  // 同じ真の曲線から R 回データを取り直し、次数 d の多項式を当てはめて誤差を分解する
  const rows = Array.from({ length: D }, (_, di) => {
    const d = di + 1, m = d + 1;
    const preds: number[][] = [];
    let tr = 0;
    for (let r = 0; r < R; r++) {
      const y = xs.map((x) => f(x) + sig * rnd());
      const A = Array.from({ length: m }, (_, i) => Array.from({ length: m }, (_, j) => xs.reduce((s, x) => s + x ** (i + j), 0)));
      const b = Array.from({ length: m }, (_, i) => xs.reduce((s, x, k) => s + y[k] * x ** i, 0));
      const w = solve(A, b);
      const pr = (x: number) => w.reduce((s, c, i) => s + c * x ** i, 0);
      tr += xs.reduce((s, x, k) => s + (pr(x) - y[k]) ** 2, 0) / n;
      preds.push(gx.map(pr));
    }
    const mean = gx.map((_, j) => preds.reduce((s, p) => s + p[j], 0) / R);
    const bias2 = gx.reduce((s, x, j) => s + (mean[j] - f(x)) ** 2, 0) / gx.length;
    const vr = gx.reduce((s, _, j) => s + preds.reduce((q, p) => q + (p[j] - mean[j]) ** 2, 0) / R, 0) / gx.length;
    return { d, train: tr / R, bias2, vr, test: bias2 + vr + sig * sig };
  });
  const L = 42, T = 24, PW = 292, PH = 170, yMax = 0.55;
  const px = (d: number) => L + ((d - 1) / (D - 1)) * PW;
  const py = (v: number) => T + PH - (Math.min(v, yMax) / yMax) * PH;
  const path = (key: 'train' | 'bias2' | 'vr' | 'test', color: string, w: number, dash = '') =>
    `<polyline points="${rows.map((r) => `${f1(px(r.d))},${f1(py(r[key]))}`).join(' ')}" fill="none" stroke="${color}" stroke-width="${w}" ${dash ? `stroke-dasharray="${dash}"` : ''} />`;
  const best = rows.reduce((a, b) => (b.test < a.test ? b : a));
  const yt = [0, 0.2, 0.4];
  const svg = `${svgOpen(W, H, 'バイアスとバリアンスのトレードオフ：多項式の次数を上げるとバイアスは減りバリアンスは増え、将来データの誤差は中くらいの次数で最小になる')}
    <rect x="${L}" y="${T}" width="${PW}" height="${PH}" fill="none" stroke="${SLATE}" stroke-width="1" />
    ${yt.map((v) => `<line x1="${L}" y1="${f1(py(v))}" x2="${L + PW}" y2="${f1(py(v))}" stroke="${SLATE}" stroke-opacity="0.2" /><text x="${L - 6}" y="${f1(py(v) + 4)}" text-anchor="end" font-size="12.3" fill="${SLATE}">${v}</text>`).join('')}
    ${rows.map((r) => `<text x="${f1(px(r.d))}" y="${T + PH + 16}" text-anchor="middle" font-size="12.3" fill="${SLATE}">${r.d}</text>`).join('')}
    ${path('train', SLATE, 1.8, '5 4')}${path('bias2', AMBER, 2.2)}${path('vr', INDIGO, 2.2)}${path('test', ROSE, 3)}
    <circle cx="${f1(px(best.d))}" cy="${f1(py(best.test))}" r="5" fill="#ffffff" stroke="${ROSE}" stroke-width="2" />
    <text x="${f1(px(best.d))}" y="${f1(py(best.test) - 10)}" text-anchor="middle" font-size="12.4" font-weight="700" fill="${ROSE}">最小：${best.d} 次</text>
    <text x="${L + PW / 2}" y="${T + PH + 34}" text-anchor="middle" font-size="12.4" fill="${SLATE}">横軸＝当てはめる多項式の次数（右ほど複雑）</text>
    <line x1="14" y1="${H - 36}" x2="38" y2="${H - 36}" stroke="${ROSE}" stroke-width="3" /><text x="44" y="${H - 32}" font-size="12.4" fill="${INK}">将来データの誤差（3つの和）</text>
    <line x1="14" y1="${H - 20}" x2="38" y2="${H - 20}" stroke="${AMBER}" stroke-width="2.2" /><text x="44" y="${H - 16}" font-size="12.4" fill="${INK}">バイアス²</text>
    <line x1="112" y1="${H - 20}" x2="136" y2="${H - 20}" stroke="${INDIGO}" stroke-width="2.2" /><text x="142" y="${H - 16}" font-size="12.4" fill="${INK}">バリアンス</text>
    <line x1="210" y1="${H - 20}" x2="234" y2="${H - 20}" stroke="${SLATE}" stroke-width="1.8" stroke-dasharray="5 4" /><text x="240" y="${H - 16}" font-size="12.4" fill="${INK}">手元データの誤差</text>
    <text x="14" y="${H - 3}" font-size="12.3" fill="${SLATE}">データ ${n} 点・ノイズ sd ${sig}・${R} 回の取り直しの平均</text>
  </svg>`;
  const cap = `真の曲線（波形）から ${n} 点のデータを ${R} 回取り直し、次数を変えて多項式を当てはめた結果です。次数が低いと、曲線が真の形を捉えられず（<strong>バイアス</strong>が大きい）、どのデータを使っても同じようにずれます。次数を上げるとバイアスは ${f2(rows[0].bias2)} から ${f2(rows[D - 1].bias2)} へ下がりますが、データごとに曲線が揺れる量（<strong>バリアンス</strong>）が ${f2(rows[0].vr)} から ${f2(rows[D - 1].vr)} へ増えます。将来データの誤差はこの2つとノイズの合計なので、${best.d} 次で最小（${f2(best.test)}）になります。灰の破線の手元データの誤差は次数とともに減り続けるため、これだけで次数を選ぶと複雑すぎるモデルを選んでしまいます。情報量規準や Cp は、この差を補正して選ぶ道具です。`;
  return fig(svg, cap);
}

// ── 統計的因果推論（3.7）：DAG の基本3形とフロントドア ──
type DagNode = { id: string; x: number; y: number; label: string; hidden?: boolean };
type DagEdge = [string, string, string?];
function dagPanel(nodes: DagNode[], edges: DagEdge[], mark: string): string {
  const R = 17;
  const by = Object.fromEntries(nodes.map(n => [n.id, n]));
  const lines = edges.map(([a, b, color]) => {
    const A = by[a], B = by[b];
    const dx = B.x - A.x, dy = B.y - A.y, d = Math.hypot(dx, dy);
    const ux = dx / d, uy = dy / d;
    const c = color ?? INK;
    return `<line x1="${f1(A.x + ux * (R + 1))}" y1="${f1(A.y + uy * (R + 1))}" x2="${f1(B.x - ux * (R + 3))}" y2="${f1(B.y - uy * (R + 3))}" stroke="${c}" stroke-width="2" marker-end="url(#${mark})" />`;
  }).join('');
  const circles = nodes.map(n => `
    <circle cx="${n.x}" cy="${n.y}" r="${R}" fill="${n.hidden ? '#f8fafc' : '#ffffff'}" stroke="${n.hidden ? SLATE : INDIGO}" stroke-width="1.8"${n.hidden ? ' stroke-dasharray="4 3"' : ''} />
    <text x="${n.x}" y="${n.y + 5}" text-anchor="middle" font-size="14" font-weight="700" fill="${n.hidden ? SLATE : INDIGO}">${n.label}</text>`).join('');
  return lines + circles;
}
function dagBasic(): string {
  const W = 350, H = 372;
  const mk = 'dag-arrow';
  const t = (y: number, title: string, sub: string) =>
    `<text x="10" y="${y}" font-size="13" font-weight="700" fill="${INK}">${title}</text><text x="10" y="${y + 16}" font-size="12.3" fill="${SLATE}">${sub}</text>`;
  const p1 = dagPanel([{ id: 'Z', x: 255, y: 28, label: 'Z' }, { id: 'X', x: 200, y: 96, label: 'X' }, { id: 'Y', x: 310, y: 96, label: 'Y' }],
    [['Z', 'X', AMBER], ['Z', 'Y', AMBER], ['X', 'Y']], mk);
  const p2 = dagPanel([{ id: 'X', x: 190, y: 220, label: 'X' }, { id: 'M', x: 250, y: 220, label: 'M' }, { id: 'Y', x: 310, y: 220, label: 'Y' }],
    [['X', 'M', TEAL], ['M', 'Y', TEAL]], mk);
  const p3 = dagPanel([{ id: 'X', x: 200, y: 296, label: 'X' }, { id: 'Y', x: 310, y: 296, label: 'Y' }, { id: 'C', x: 255, y: 340, label: 'C' }],
    [['X', 'C', ROSE], ['Y', 'C', ROSE]], mk);
  const svg = `${svgOpen(W, H, '因果グラフ（DAG）の基本3形：交絡（Zが共通原因）、媒介（XからMを通ってY）、合流点（XとYがCに向かう）')}
    <defs><marker id="${mk}" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="${INK}" /></marker></defs>
    ${t(24, '① 交絡（分岐）', 'Z が X と Y の共通原因')}
    ${p1}
    <line x1="10" y1="132" x2="340" y2="132" stroke="#e2e8f0" />
    ${t(176, '② 媒介（連鎖）', 'X が M を介して Y へ')}
    ${p2}
    <line x1="10" y1="252" x2="340" y2="252" stroke="#e2e8f0" />
    ${t(270, '③ 合流点', 'X と Y の結果が C')}
    ${p3}
  </svg>`;
  return fig(svg, '矢印は原因から結果の向き。①は Z で調整して交絡を切る。②は M を調整すると X の効果の通り道を塞ぐ。③は C を調整すると、もともと無関係の X と Y に見かけの関連が生まれる。');
}
function dagFront(): string {
  const W = 350, H = 150;
  const mk = 'dagf-arrow';
  const nodes: DagNode[] = [{ id: 'U', x: 175, y: 28, label: 'U', hidden: true }, { id: 'X', x: 60, y: 108, label: 'X' }, { id: 'M', x: 175, y: 108, label: 'M' }, { id: 'Y', x: 290, y: 108, label: 'Y' }];
  const g = dagPanel(nodes, [['U', 'X', SLATE], ['U', 'Y', SLATE], ['X', 'M', TEAL], ['M', 'Y', TEAL]], mk);
  const svg = `${svgOpen(W, H, 'フロントドア基準のDAG：観測できない U が X と Y の両方に影響し、X から M を通って Y に届く経路がある')}
    <defs><marker id="${mk}" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="${INK}" /></marker></defs>
    ${g}
    <text x="218" y="40" font-size="12.3" fill="${SLATE}">観測できない交絡</text>
    <text x="175" y="146" text-anchor="middle" font-size="12.3" fill="${TEAL}">X→M と M→Y を別々にたどる</text>
  </svg>`;
  return fig(svg, '点線の U は測れない共通原因。X と Y を直接比べても U の影響が混ざるが、途中の M を観測できれば、X→M と M→Y の2段に分けて効果を求められる。');
}

function dagIV(): string {
  const W = 350, H = 170;
  const mk = 'dagiv-arrow';
  const nodes: DagNode[] = [{ id: 'U', x: 230, y: 30, label: 'U', hidden: true }, { id: 'Z', x: 40, y: 108, label: 'Z' }, { id: 'X', x: 160, y: 108, label: 'X' }, { id: 'Y', x: 300, y: 108, label: 'Y' }];
  const g = dagPanel(nodes, [['Z', 'X', TEAL], ['X', 'Y', INDIGO], ['U', 'X', SLATE], ['U', 'Y', SLATE]], mk);
  const svg = `${svgOpen(W, H, '操作変数のDAG：くじで配ったクーポン Z が利用時間 X を動かし、X が点数 Y に届く。測れないやる気 U は X と Y の両方に影響するが、Z とはつながっていない')}
    <defs><marker id="${mk}" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="${INK}" /></marker></defs>
    ${g}
    <text x="252" y="26" font-size="12.3" fill="${SLATE}">やる気</text>
    <text x="252" y="42" font-size="12.3" fill="${SLATE}">（測れない）</text>
    <text x="40" y="142" text-anchor="middle" font-size="12.3" fill="${TEAL}">クーポン</text>
    <text x="40" y="158" text-anchor="middle" font-size="12.3" fill="${TEAL}">（くじ）</text>
    <text x="160" y="142" text-anchor="middle" font-size="12.3" fill="${INK}">利用時間</text>
    <text x="300" y="142" text-anchor="middle" font-size="12.3" fill="${INK}">点数</text>
  </svg>`;
  return fig(svg, 'Z から Y へは X を通る道しか無く、Z は U とつながっていません。Z が動かした分の X の変化だけを使えば、U の混ざらない効果が求まります。');
}

// ── 対応分析（2.7）：年代×好きな飲み物の分割表を特異値分解して2次元に置く ──
function jacobiEigen(a0: number[][]): { vals: number[]; vecs: number[][] } {
  const n = a0.length;
  const a = a0.map(r => r.slice());
  const v: number[][] = Array.from({ length: n }, (_, i) => Array.from({ length: n }, (_, j) => (i === j ? 1 : 0)));
  for (let sweep = 0; sweep < 100; sweep++) {
    let p = 0, q = 1, big = 0;
    for (let i = 0; i < n; i++) for (let j = i + 1; j < n; j++) if (Math.abs(a[i][j]) > big) { big = Math.abs(a[i][j]); p = i; q = j; }
    if (big < 1e-14) break;
    const theta = (a[q][q] - a[p][p]) / (2 * a[p][q]);
    const t = Math.sign(theta || 1) / (Math.abs(theta) + Math.sqrt(theta * theta + 1));
    const c = 1 / Math.sqrt(t * t + 1), s = t * c;
    for (let k = 0; k < n; k++) {
      if (k === p || k === q) continue;
      const akp = a[k][p], akq = a[k][q];
      a[k][p] = a[p][k] = c * akp - s * akq;
      a[k][q] = a[q][k] = s * akp + c * akq;
    }
    const app = a[p][p], aqq = a[q][q], apq = a[p][q];
    a[p][p] = app - t * apq; a[q][q] = aqq + t * apq; a[p][q] = a[q][p] = 0;
    for (let k = 0; k < n; k++) {
      const vkp = v[k][p], vkq = v[k][q];
      v[k][p] = c * vkp - s * vkq;
      v[k][q] = s * vkp + c * vkq;
    }
  }
  return { vals: a.map((r, i) => r[i]), vecs: v };
}
export const CA_TABLE = {
  rows: ['20代', '40代', '60代'],
  cols: ['コーヒー', '紅茶', '緑茶', 'ジュース'],
  counts: [[30, 10, 5, 35], [25, 25, 20, 10], [10, 20, 45, 5]],
};
function caSolve() {
  const N = CA_TABLE.counts, I = N.length, J = N[0].length;
  const n = N.flat().reduce((s, x) => s + x, 0);
  const r = N.map(row => row.reduce((s, x) => s + x, 0) / n);
  const c = Array.from({ length: J }, (_, j) => N.reduce((s, row) => s + row[j], 0) / n);
  const S = N.map((row, i) => row.map((x, j) => (x / n - r[i] * c[j]) / Math.sqrt(r[i] * c[j])));
  const M = Array.from({ length: I }, (_, i) => Array.from({ length: I }, (_, k) => S[i].reduce((s, x, j) => s + x * S[k][j], 0)));
  const { vals, vecs } = jacobiEigen(M);
  const order = vals.map((v, i) => i).sort((x, y) => vals[y] - vals[x]);
  const inertia = S.flat().reduce((s, x) => s + x * x, 0);
  const axes = order.slice(0, 2).map(k => {
    const d = Math.sqrt(Math.max(vals[k], 0));
    const u = vecs.map(row => row[k]);
    const vv = Array.from({ length: J }, (_, j) => S.reduce((s, row, i) => s + row[j] * u[i], 0) / d);
    return { d, share: vals[k] / inertia, rows: u.map((x, i) => (x * d) / Math.sqrt(r[i])), cols: vv.map((x, j) => (x * d) / Math.sqrt(c[j])) };
  });
  // 向きは任意なので、20代が左に来るように揃える
  if (axes[0].rows[0] > 0) { axes[0].rows = axes[0].rows.map(x => -x); axes[0].cols = axes[0].cols.map(x => -x); }
  return { n, inertia, chi2: n * inertia, axes };
}
function correspondenceMap(): string {
  const W = 350, H = 270;
  const { axes } = caSolve();
  const x0 = 20, x1 = 330, y0 = 24, y1 = 232;
  const xr = 0.95, yr = 0.34; // 表示範囲 x:[-0.95,0.95] y:[-0.34,0.34]
  const px = (x: number) => x0 + ((x + xr) / (2 * xr)) * (x1 - x0);
  const py = (y: number) => y1 - ((y + yr) / (2 * yr)) * (y1 - y0);
  const rowLab: Array<[number, string]> = [[0, 'u'], [1, 'u'], [2, 'u']];
  const colLab: Array<[number, string]> = [[0, 'u'], [1, 'r'], [2, 'd'], [3, 'd']];
  const place = (x: number, y: number, label: string, pos: string, color: string) => {
    const dx = pos === 'r' ? 9 : 0, dy = pos === 'u' ? -9 : pos === 'd' ? 19 : 4;
    return `<text x="${f1(px(x) + dx)}" y="${f1(py(y) + dy)}" text-anchor="${pos === 'r' ? 'start' : 'middle'}" font-size="12.5" font-weight="700" fill="${color}">${label}</text>`;
  };
  const rowPts = rowLab.map(([i, pos]) => {
    const x = axes[0].rows[i], y = axes[1].rows[i];
    return `<rect x="${f1(px(x) - 5)}" y="${f1(py(y) - 5)}" width="10" height="10" fill="${INDIGO}" />${place(x, y, CA_TABLE.rows[i], pos, INDIGO)}`;
  }).join('');
  const colPts = colLab.map(([j, pos]) => {
    const x = axes[0].cols[j], y = axes[1].cols[j];
    return `<circle cx="${f1(px(x))}" cy="${f1(py(y))}" r="5.5" fill="${AMBER}" />${place(x, y, CA_TABLE.cols[j], pos, '#b45309')}`;
  }).join('');
  const s1 = (axes[0].share * 100).toFixed(1), s2 = (axes[1].share * 100).toFixed(1);
  const svg = `${svgOpen(W, H, '対応分析の散布図：年代（四角）と好きな飲み物（丸）を同じ平面に置く。20代はジュースとコーヒー、40代は紅茶、60代は緑茶の近く')}
    <line x1="${x0}" y1="${f1(py(0))}" x2="${x1}" y2="${f1(py(0))}" stroke="#cbd5e1" stroke-width="1" />
    <line x1="${f1(px(0))}" y1="${y0 - 6}" x2="${f1(px(0))}" y2="${y1 + 6}" stroke="#cbd5e1" stroke-width="1" />
    ${rowPts}${colPts}
    <text x="${x1}" y="${y1 + 32}" text-anchor="end" font-size="12.5" fill="${SLATE}">第1軸（寄与率 ${s1}%）</text>
    <text x="${x0}" y="${y0 - 8}" text-anchor="start" font-size="12.5" fill="${SLATE}">第2軸（${s2}%）</text>
  </svg>`;
  return fig(svg, '四角が年代、丸が飲み物。同じ平面に置くので、四角と丸が同じ方向にあれば、おおまかに「その年代にその飲み物が多い」傾向を表します。原点は全体の平均的な好みです。数値は上の表（240人の架空データ）を特異値分解して計算しました。');
}

// ── 無記憶性（1.7b 幾何分布・1.8 指数分布）：待った後の残りを切り出して伸ばすと、元の形に重なる ──
function memorylessGeo(): string {
  const W = 340, H = 316, p = 1 / 6, m = 5, K = 12;
  const x0 = 34, x1 = 326, bw = (x1 - x0) / K;
  const top = { y0: 30, h: 96 }, bot = { y0: 190, h: 96 };
  const pm = (k: number) => Math.pow(1 - p, k - 1) * p;
  const hmax = p * 1.05;
  const bx = (i: number) => x0 + i * bw;
  const bar = (i: number, v: number, y0: number, h: number, fill: string, op: number) =>
    `<rect x="${f1(bx(i) + 2)}" y="${f1(y0 + h - (v / hmax) * h)}" width="${f1(bw - 4)}" height="${f1((v / hmax) * h)}" fill="${fill}" fill-opacity="${op}" />`;
  const topBars = Array.from({ length: K }, (_, i) => bar(i, pm(i + 1), top.y0, top.h, i + 1 > m ? AMBER : INDIGO, i + 1 > m ? 0.85 : 0.55)).join('');
  const scale = 1 / Math.pow(1 - p, m);
  const J = K - m;
  const botBars = Array.from({ length: J }, (_, j) => bar(j, pm(m + j + 1) * scale, bot.y0, bot.h, AMBER, 0.85)).join('');
  const botRef = Array.from({ length: J }, (_, j) => `<rect x="${f1(bx(j) + 2)}" y="${f1(bot.y0 + bot.h - (pm(j + 1) / hmax) * bot.h)}" width="${f1(bw - 4)}" height="${f1((pm(j + 1) / hmax) * bot.h)}" fill="none" stroke="${INDIGO}" stroke-width="1.6" />`).join('');
  const ticks = (y: number, from: number, n: number) => Array.from({ length: n }, (_, i) => `<text x="${f1(bx(i) + bw / 2)}" y="${y}" text-anchor="middle" font-size="12.4" fill="${SLATE}">${from + i}</text>`).join('');
  const svg = `${svgOpen(W, H, 'サイコロで初めて6が出るまでの回数の分布。5回外れた後の残りの部分だけを切り出して高さを伸ばすと、最初の分布と同じ形に重なる')}
    <text x="${x0}" y="18" font-size="13.2" font-weight="700" fill="${INK}">最初から：初めて6が出るまでの回数</text>
    <line x1="${x0}" y1="${top.y0 + top.h}" x2="${x1}" y2="${top.y0 + top.h}" stroke="${SLATE}" />
    ${topBars}${ticks(top.y0 + top.h + 15, 1, K)}
    <text x="${f1(bx(m) + 4)}" y="${top.y0 + 14}" font-size="12.4" fill="#b45309">5回外れた後に残る部分</text>
    <text x="${x0}" y="178" font-size="13.2" font-weight="700" fill="${INK}">残りを切り出し、高さを ${scale.toFixed(2)} 倍に伸ばす</text>
    <line x1="${x0}" y1="${bot.y0 + bot.h}" x2="${x1}" y2="${bot.y0 + bot.h}" stroke="${SLATE}" />
    ${botBars}${botRef}${ticks(bot.y0 + bot.h + 15, 1, J)}
    <text x="${x1}" y="${bot.y0 + 14}" text-anchor="end" font-size="12.4" fill="${INDIGO}">青い枠：最初の分布</text>
    <text x="${x1}" y="${bot.y0 + 30}" text-anchor="end" font-size="12.4" fill="#b45309">橙：切り出した残り</text>
  </svg>`;
  const cap = `上は、サイコロを振って初めて6が出るまでの回数の分布です。5回目まで外れた場合に残る部分（橙）だけを取り出し、1回目から数え直して高さを ${scale.toFixed(2)} 倍に伸ばしたのが下の橙の棒で、青い枠で示した最初の分布にぴったり重なります。何回外れていても、そこから先の待ち方は変わらないことが、形として見えます。`;
  return fig(svg, cap);
}

function memorylessExp(): string {
  const W = 340, H = 316, lam = 1, s = 1.5, X = 5;
  const x0 = 34, x1 = 326, top = { y0: 30, h: 96 }, bot = { y0: 190, h: 96 };
  const px = (x: number) => x0 + (x / X) * (x1 - x0);
  const fmax = lam * 1.05;
  const py = (v: number, b: { y0: number; h: number }) => b.y0 + b.h - (v / fmax) * b.h;
  const N = 100;
  const curve = (g: (x: number) => number, b: { y0: number; h: number }, xs: number, xe: number) =>
    Array.from({ length: N + 1 }, (_, i) => { const x = xs + ((xe - xs) * i) / N; return `${f1(px(x))},${f1(py(g(x), b))}`; }).join(' ');
  const f = (x: number) => lam * Math.exp(-lam * x);
  const tailArea = `${curve(f, top, s, X)} ${f1(px(X))},${f1(top.y0 + top.h)} ${f1(px(s))},${f1(top.y0 + top.h)}`;
  const g = (t: number) => f(s + t) * Math.exp(lam * s);
  const tickXs = [0, 1, 2, 3, 4, 5];
  const axisX = (b: { y0: number; h: number }, from: number) => `<line x1="${x0}" y1="${b.y0 + b.h}" x2="${x1}" y2="${b.y0 + b.h}" stroke="${SLATE}" />` +
    tickXs.map(t => `<text x="${f1(px(t))}" y="${b.y0 + b.h + 15}" text-anchor="middle" font-size="12.4" fill="${SLATE}">${t + from}</text>`).join('');
  const svg = `${svgOpen(W, H, '指数分布の密度。s分待った後の残りの部分だけを切り出して高さを伸ばすと、最初の曲線と同じ形に重なる')}
    <text x="${x0}" y="18" font-size="13.2" font-weight="700" fill="${INK}">最初から：待ち時間の分布</text>
    ${axisX(top, 0)}
    <polygon points="${tailArea}" fill="${AMBER}" fill-opacity="0.35" />
    <polyline points="${curve(f, top, 0, X)}" fill="none" stroke="${INDIGO}" stroke-width="2" />
    <line x1="${f1(px(s))}" y1="${top.y0}" x2="${f1(px(s))}" y2="${top.y0 + top.h}" stroke="${AMBER}" stroke-width="1.6" stroke-dasharray="4 3" />
    <text x="${f1(px(s) + 6)}" y="${top.y0 + 14}" font-size="12.4" fill="#b45309">${s} 分待った後に残る部分</text>
    <text x="${x0}" y="178" font-size="13.2" font-weight="700" fill="${INK}">残りを切り出し、高さを ${Math.exp(lam * s).toFixed(2)} 倍に伸ばす</text>
    ${axisX(bot, 0)}
    <polyline points="${curve(f, bot, 0, X)}" fill="none" stroke="${INDIGO}" stroke-width="4.5" stroke-opacity="0.35" />
    <polyline points="${curve(g, bot, 0, X)}" fill="none" stroke="${AMBER}" stroke-width="1.8" />
    <text x="${x1}" y="${bot.y0 + 14}" text-anchor="end" font-size="12.4" fill="${INDIGO}">太い青：最初の曲線</text>
    <text x="${x1}" y="${bot.y0 + 30}" text-anchor="end" font-size="12.4" fill="#b45309">橙：切り出した残り</text>
  </svg>`;
  const cap = `上は指数分布（λ=1）の密度で、橙の部分が ${s} 分待った後に残る領域です。これを横軸の左端に寄せ、面積が1に戻るよう高さを e^${s} ≈ ${Math.exp(lam * s).toFixed(2)} 倍に伸ばしたのが下の橙の線で、太い青線の最初の曲線とぴったり重なります。待った時間は、この先の待ち時間の分布に影響しないことが、形として見えます。`;
  return fig(svg, cap);
}

// ── EMアルゴリズム（3.6）：155cmの人が、2つの山のどちらに属するか（負担率）──
function emResponsibility(): string {
  const W = 340, H = 236, mu1 = 150, mu2 = 170, sd = 10, xo = 155;
  const x0 = 24, x1 = 326, y0 = 30, h = 134, xmin = 124, xmax = 196;
  const px = (x: number) => x0 + ((x - xmin) / (xmax - xmin)) * (x1 - x0);
  const dens = (x: number, mu: number) => Math.exp(-((x - mu) ** 2) / (2 * sd * sd));
  const py = (v: number) => y0 + h - v * (h - 10);
  const line = (mu: number) => Array.from({ length: 73 }, (_, i) => { const x = xmin + i; return `${f1(px(x))},${f1(py(dens(x, mu)))}`; }).join(' ');
  const a = dens(xo, mu1), b = dens(xo, mu2), r = a / (a + b);
  const svg = `${svgOpen(W, H, '女性の山（平均150）と男性の山（平均170）を同じ軸に描き、身長155cmでの2つの高さの比から、女性である確率0.73を求める')}
    <line x1="${x0}" y1="${y0 + h}" x2="${x1}" y2="${y0 + h}" stroke="${SLATE}" />
    ${[130, 150, 170, 190].map(t => `<text x="${f1(px(t))}" y="${y0 + h + 15}" text-anchor="middle" font-size="12.4" fill="${SLATE}">${t}</text>`).join('')}
    <text x="${x1}" y="${y0 + h + 31}" text-anchor="end" font-size="12.4" fill="${SLATE}">身長（cm）</text>
    <polyline points="${line(mu1)}" fill="none" stroke="${ROSE}" stroke-width="2" />
    <polyline points="${line(mu2)}" fill="none" stroke="${INDIGO}" stroke-width="2" />
    <text x="${f1(px(mu1) - 6)}" y="${y0 + 12}" text-anchor="end" font-size="13.2" font-weight="700" fill="${ROSE}">女性（平均150）</text>
    <text x="${f1(px(mu2) + 6)}" y="${y0 + 12}" text-anchor="start" font-size="13.2" font-weight="700" fill="${INDIGO}">男性（平均170）</text>
    <line x1="${f1(px(xo))}" y1="${y0}" x2="${f1(px(xo))}" y2="${y0 + h}" stroke="${AMBER}" stroke-width="1.6" stroke-dasharray="4 3" />
    <circle cx="${f1(px(xo))}" cy="${f1(py(a))}" r="4.5" fill="${ROSE}" />
    <circle cx="${f1(px(xo))}" cy="${f1(py(b))}" r="4.5" fill="${INDIGO}" />
    <text x="${f1(px(xo) + 8)}" y="${f1(py(a) - 4)}" font-size="12.4" font-weight="700" fill="${ROSE}">高さ ${a.toFixed(2)}</text>
    <text x="${f1(px(xo) + 8)}" y="${f1(py(b) + 4)}" font-size="12.4" font-weight="700" fill="${INDIGO}">高さ ${b.toFixed(2)}</text>
    <text x="${f1(px(xo))}" y="${y0 + h + 31}" text-anchor="middle" font-size="12.4" font-weight="700" fill="#b45309">155</text>
    <text x="${W / 2}" y="${H - 6}" text-anchor="middle" font-size="13.2" font-weight="700" fill="${INK}">女性の確率 ＝ ${a.toFixed(2)} ÷ (${a.toFixed(2)}＋${b.toFixed(2)}) ＝ ${r.toFixed(2)}</text>
  </svg>`;
  const cap = `女性（平均150cm）と男性（平均170cm）の身長が、標準偏差10cmの正規分布に従うと仮に置いた図です。155cmの人のところで縦線を引くと、女性の山の高さは ${a.toFixed(2)}、男性の山の高さは ${b.toFixed(2)} です。この2つの高さの比が、その人が女性である確率（負担率）になります。山の頂上を1とした相対的な高さなので、割合を取れば同じ値になります。`;
  return fig(svg, cap);
}

export const SHAPE_FIGS: Record<string, () => string> = {
  'f-pmf': pmfDice,
  'f-pdf': pdfHeight,
  'f-density-over-1': densityOver1,
  'f-survival': survival,
  'f-same-moments': sameMomentsDifferentShape,
  'f-linear-transform': linearTransform,
  'f-binomial': binomialShapes,
  'f-uniform': uniformDice,
  'f-bernoulli': bernoulli,
  'f-hypergeo': hypergeo,
  'f-poisson': poissonShapes, 'f-poisson-slice': poissonSlice, 'f-poisson-binom': poissonFromBinom, 'f-continuity': continuityCorrection, 'f-geometric': geometricShape,
  'f-exponential': exponentialShape, 'f-wait-total': gammaShape, 'f-ratio-dist': betaShape, 'f-lognormal': lognormalShape, 'f-cauchy': cauchyShape,
  'f-normal-areas': normalAreas,
  'f-normal-params': normalParams,
  'f-standardize': standardizeTail,
  'f-normal-affine': normalAffine,
  'f-normal-plus': normalSum,
  'f-clt-coin': cltCoin,
  'f-bayes-tree': bayesTree,
  'f-venn3': venn3,
  'f-overfit': overfit,
  'f-bivariate': bivariateNormal, 'f-cov-matrix': covMatrix, 'f-transform-strips': transformStrips, 'f-conditional': conditionalNormal, 'f-max-shift': maxShift, 'f-mahalanobis': mahalanobis, 'f-uncorr-dependent': uncorrelatedDependent, 'f-fold-square': foldSquare, 'f-wait-pair': expSum, 'f-shear-area': shearArea, 'f-max-cdf': maxCdf, 'f-gev-types': gevTypes, 'f-return-level': returnLevel, 'f-marginal': marginalNormal, 'f-linear-uv': linearUV, 'f-independent-slices': independentSlices, 'f-min-parts': minParts,
  'f-lln': lln,
  'f-mean-narrow': meanNarrow,
  'f-dist-family': distFamily,
  'f-noncentral-t': noncentralT, 'f-chi2-tail': chi2Tail, 'f-t-tail': tTail, 'f-t-fold': tFold, 'f-df-three': dfThree, 'f-t-scale': tScale, 'f-rcbd-layout': rcbdLayout, 'f-rcbd-ss': rcbdSS, 'f-f-tail': fTail,
  'f-order-stats': orderStats, 'f-order-split': orderSplit, 'f-median-spread': medianSpread, 'f-var-ratio-ci': varRatioCi, 'f-poisson-test': poissonTest,
  'f-quantile': quantileFn, 'f-nminus1': nMinus1, 'f-ci-z': ciZ, 'f-ci-coverage': ciCoverage, 'f-ci-chi2': ciChi2, 'f-ci-prop-n': ciPropN, 'f-ci-diff': ciDiff, 'f-paired': pairedDiff, 'f-one-sided': oneSided, 'f-wald-coverage': waldCoverage, 'f-jackknife': jackknife, 'f-np-region': npRegion, 'f-three-tests': threeTests, 'f-canonical-disc': canonicalDisc, 'f-ci-ad': ciAd, 'f-power-design': powerDesign, 'f-power-curve': powerCurve, 'f-wls': wls, 'f-lasso-ridge': lassoRidge, 'f-suff-poisson': suffPoisson, 'f-median-cdf': medianCdf,
  'f-likelihood': likelihood, 'f-estimator-flow': estimatorFlow, 'f-likelihood-peak': likelihoodLog, 'f-likelihood-trouble': likelihoodTrouble, 'f-mm-vs-mle': mmVsMle,
  'f-darts': darts, 'f-variance-estimators': varianceEstimators, 'f-consistency': consistency, 'f-mean-vs-median': meanVsMedian, 'f-estimator-classes': estimatorClasses,
  'f-pvalue': pValue,
  'f-anova': anovaDots,
  'f-dendrogram': dendrogram,
  'f-linkage': linkage,
  'f-kmeans-steps': kmeansSteps,
  'f-elbow': elbowSilhouette,
  'f-timeseries': timeSeries,
  'f-km': kaplanMeier,
  'f-montecarlo': monteCarloPi,
  'f-loglik': logLikCurvature,
  'f-qq': qqPlot,
  'f-rank-ab': rankSum,
  'f-interaction': interactionPlot,
  'f-factor-path': factorPath,
  'f-factor-rotation': factorRotation,
  'f-strata-cluster': strataVsCluster,
  'f-mds': mdsMap,
  'f-lda': ldaBoundary,
  'f-roc': rocCurve,
  'f-biasvar': biasVariance,
  'f-dag-basic': dagBasic,
  'f-dag-front': dagFront,
  'f-dag-iv': dagIV,
  'f-ca': correspondenceMap,
  'f-memoryless-geo': memorylessGeo,
  'f-memoryless-cont': memorylessExp,
  'f-em': emResponsibility,
};
