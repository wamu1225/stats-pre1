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
    <text x="${ib.x + ib.w / 2}" y="${ib.y + 14}" text-anchor="middle" font-size="11.6" fill="${INK}">1回分のコイン</text>
    ${ibar(ib.x + 28)}${ibar(ib.x + 64)}
    <text x="${ib.x + 28}" y="${ib.y + ib.h - 2}" text-anchor="middle" font-size="11.6" fill="${SLATE}">裏 0</text>
    <text x="${ib.x + 64}" y="${ib.y + ib.h - 2}" text-anchor="middle" font-size="11.6" fill="${SLATE}">表 1</text>
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
      ${pts.map(([x, y]) => `<circle cx="${f1(PX(b, Math.max(-3, Math.min(3, x))))}" cy="${f1(py(Math.max(-3, Math.min(3, y))))}" r="1.8" fill="${SLATE}" fill-opacity="0.55" />`).join('')}
      ${ell(1)}${ell(2)}
      <text x="${b.x + b.w / 2}" y="${b.y - 10}" text-anchor="middle" font-size="13.2" font-weight="700" fill="${INK}">相関 ρ = ${rho}</text>
      <text x="${b.x + b.w / 2}" y="${b.y + b.h + 16}" text-anchor="middle" font-size="12.4" fill="${SLATE}">150点の標本相関 ${f2(r)}</text>`;
  };
  const svg = `${svgOpen(W, H, '2変量正規分布の等確率線：相関0なら円、相関0.7なら右上がりの楕円')}${panel(0, 12)}${panel(0.7, 188)}
    <text x="${W / 2}" y="${H - 4}" text-anchor="middle" font-size="12.4" fill="${SLATE}">線＝同じ確率密度の点を結んだ等高線（内側 1σ、外側 2σ）</text></svg>`;
  const cap = `どちらも X と Y は平均0・分散1の正規分布です。左は相関0で、等高線は円になり、X の値から Y について何もわかりません。右は相関0.7で、等高線が右上がりの楕円に傾き、X が大きいほど Y も大きくなりやすいことが形で見えます。多変量正規分布は「平均ベクトル（山の中心）」と「分散共分散行列（楕円の向きと太さ）」で形が決まります。`;
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
  const cap = `X を4つの帯（0〜0.25、0.25〜0.5 …）に分け、それぞれを2乗した先へ移しました。藍の帯 0〜0.25 は 0〜${0.25 ** 2} へ縮むので、面積0.25を保つために高くなります。赤の帯 0.75〜1 は ${0.75 ** 2}〜1 へ広がるので低くなります。この「幅が何倍になったかで高さを割る」補正がヤコビアンです。`;
  return fig(svg, cap);
}

// ============ 1.9：条件付き分布（身長と体重・ρ = 0.5） ============
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
    ${[155, 160, 165, 170, 175, 180, 185].map((v) => `<text x="${f1(X(v))}" y="${b.y + b.h + 14}" text-anchor="middle" font-size="12.4" fill="${SLATE}">${v}</text>`).join('')}
    ${[45, 55, 65, 75, 85].map((v) => `<text x="${b.x - 4}" y="${f1(Y(v) + 4)}" text-anchor="end" font-size="12.4" fill="${SLATE}">${v}</text>`).join('')}
    <text x="${b.x - 30}" y="${b.y - 8}" font-size="12.4" fill="${SLATE}">体重kg</text>
    <text x="${f1(X(176))}" y="${b.y - 8}" text-anchor="middle" font-size="12.4" font-weight="700" fill="#b45309">176cm</text>
    <text x="${f1(X(164))}" y="${b.y - 8}" text-anchor="middle" font-size="12.4" font-weight="700" fill="${TEAL}">164cm</text>
    <text x="${b.x + b.w / 2}" y="${H - 4}" text-anchor="middle" font-size="12.4" fill="${SLATE}">横軸 身長 cm／黒の直線 ＝ 身長ごとの体重の平均</text>
  </svg>`;
  const cap = `点は身長ごとの体重の平均です。身長（平均170cm・標準偏差6cm）と体重（平均65kg・標準偏差8kg）が、相関0.5の2変量正規分布に従うとします。灰色の楕円は等高線です。身長を176cmに決めて縦に切ると、体重は平均${num(cm(176))}kg・標準偏差${num(cs)}kgの正規分布になります。164cmなら平均${num(cm(164))}kgです。切る位置を変えると、山の中心は黒の直線に沿って動き、幅は変わりません。`;
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
  const cap = `平均1の指数分布から n 個とった最大値の分布です。n を10倍にするたびに、山は右へ ln 10 ≈ ${f2(Math.log(10))} ずつずれます。n = 10 と n = 100 の山の形はほとんど同じで、ずらして重ねると、ガンベル分布という1つの形に近づいていきます。`;
  return fig(svg, cap);
}

// ============ 1.11：大数の法則（サイコロの累積平均） ============
function lln(): string {
  const W = 350, H = 230;
  const b: Box = { x: 34, y: 30, w: 300, h: 154, xMin: 0, xMax: 3, yMax: 1 };
  const yMin = 2, yMax = 5;
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
    ${[2, 3, 4, 5].map((v) => `<text x="${b.x - 6}" y="${f1(py(v) + 4)}" text-anchor="end" font-size="12.4" fill="${SLATE}">${v}</text>`).join('')}
    <line x1="${b.x}" y1="${f1(py(3.5))}" x2="${b.x + b.w}" y2="${f1(py(3.5))}" stroke="${ROSE}" stroke-width="1.2" stroke-dasharray="4 3" />
    <text x="${b.x + b.w}" y="${b.y - 8}" text-anchor="end" font-size="12.4" fill="${ROSE}">赤の点線＝期待値 3.5</text>
    ${lines}
    <line x1="${b.x}" y1="${b.y + b.h}" x2="${b.x + b.w}" y2="${b.y + b.h}" stroke="${SLATE}" />
    ${[[0, '1'], [1, '10'], [2, '100'], [3, '1000']].map(([v, t]) => `<text x="${f1(PX(b, v as number))}" y="${b.y + b.h + 14}" text-anchor="middle" font-size="12.4" fill="${SLATE}">${t}</text>`).join('')}
    <text x="${b.x + b.w / 2}" y="${H - 6}" text-anchor="middle" font-size="12.4" fill="${SLATE}">横軸＝振った回数（10倍ごと）／縦軸＝目の平均</text>
  </svg>`;
  const at = (k: number) => runs.map((m) => m[k - 1].toFixed(2)).join('・');
  const rg = (n: number) => `${(3.5 - 2 * sd / Math.sqrt(n)).toFixed(2)}〜${(3.5 + 2 * sd / Math.sqrt(n)).toFixed(2)}`;
  const cap = `線は3人それぞれの平均の推移。10回目は ${at(10)} とばらばらで、1000回目は ${at(1000)} です。灰色の帯は平均の約95%が入る範囲で、100回で ${rg(100)}、1000回で ${rg(1000)} です。`;
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
    <text x="${f1(PX(b, 0.84))}" y="${f1(PY(b, 0.9))}" font-size="13.2" font-weight="700" fill="#b45309">100回中70回</text>
    <text x="${b.x + b.w / 2}" y="${H - 4}" text-anchor="middle" font-size="12.4" fill="${SLATE}">横軸＝表の確率 p の候補／縦軸＝尤度（最大を1にそろえた）</text>
  </svg>`;
  const cap = `横軸に表の確率 p の候補を並べ、それぞれの p で「今のデータが出る確率」を描いたものが尤度関数です。10回中7回表なら、山の頂上は p = 0.7 で、これが最尤推定値です。同じ7割でも100回中70回なら、頂上の位置は変わらずに山がずっと鋭くなります。山が鋭いほど p の候補を狭く絞り込めるということで、この「山の鋭さ」を数にしたものが後の章のフィッシャー情報量です。`;
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
  const cap = `赤い点が的の中心（真の値 θ）、青い点が1本ずつの矢（データから計算した推定値 θ̂）、橙の十字が矢の平均の位置です。上の段は矢の平均が中心に来ている＝<strong>不偏</strong>、左の列は矢がまとまっている＝分散が小さい（<strong>有効</strong>）です。左下は矢がまとまっていても中心からずれ続けるので、いくら投げても真の値に届きません。不偏性と有効性は別々の性質で、両方そろうのは左上だけです。`;
  return fig(svg, cap);
}

// ============ 1.18：P値＝帰無分布の裾の面積 ============
function pValue(): string {
  const W = 350, H = 220;
  const b: Box = { x: 14, y: 30, w: 322, h: 140, xMin: -4, xMax: 4, yMax: 0.44 };
  const z = 2.17;
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
    <text x="${f1(PX(b, 0))}" y="${f1(PY(b, 0.14))}" text-anchor="middle" font-size="12.4" fill="${INDIGO}">「差がない」なら普通に出る範囲</text>
    <text x="${W / 2}" y="16" text-anchor="middle" font-size="13.2" font-weight="700" fill="${INK}">P値 ＝ 赤い面積の合計 ＝ ${f2(p)}</text>
    <text x="${b.x + b.w / 2}" y="${H - 4}" text-anchor="middle" font-size="12.4" fill="${SLATE}">帰無仮説（差がない）のもとでの検定統計量の分布</text>
  </svg>`;
  const cap = `曲線は「本当に差がない」と仮定したときに、検定統計量がとる値の分布です。今回の観測値が ${z} だったとすると、P値はそれより極端な側（両側なので左右とも）の面積で、${f2(p)} です。P値は「帰無仮説が正しい確率」ではなく、「帰無仮説が正しいとしたら、これ以上に極端な結果がどれだけ出にくいか」をこの面積で表したものです。`;
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
function dendrogram(): string {
  const pts: [string, number, number][] = [['A', 1, 1], ['B', 1.5, 1.4], ['C', 1.2, 2.2], ['D', 5, 5], ['E', 5.6, 4.6], ['F', 5.2, 6.2]];
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
    ${pts.map(([n, x, y], i) => `<circle cx="${f1(PX(S, x))}" cy="${f1(S.y + S.h - (y / 7) * S.h)}" r="4" fill="${i < 3 ? AMBER : TEAL}" /><text x="${f1(PX(S, x) + 7)}" y="${f1(S.y + S.h - (y / 7) * S.h + 4)}" font-size="13.2" fill="${INK}">${n}</text>`).join('')}
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
  const W = 350, H = 276;
  const n = 30;
  const rnd = gaussFrom(mulberry32(7));
  const normalSample = Array.from({ length: n }, () => rnd()).sort((a, b) => a - b);
  // 右に裾の長いデータ：指数分布の分位点（確率 (i-0.5)/n）
  const skewSample = Array.from({ length: n }, (_, i) => -Math.log(1 - (i + 0.5) / n)).sort((a, b) => a - b);
  const zq = (p: number) => {
    let lo = -6, hi = 6;
    for (let k = 0; k < 60; k++) { const m = (lo + hi) / 2; if (Phi(m) < p) lo = m; else hi = m; }
    return (lo + hi) / 2;
  };
  const theo = Array.from({ length: n }, (_, i) => zq((i + 0.5) / n));
  const std = (a: number[]) => {
    const m = a.reduce((s, x) => s + x, 0) / a.length;
    const sd = Math.sqrt(a.reduce((s, x) => s + (x - m) ** 2, 0) / (a.length - 1));
    return a.map((x) => (x - m) / sd);
  };
  const ys1 = std(normalSample), ys2 = std(skewSample);
  const L = 40, T = 22, S = 200;
  const lim = 3;
  const px = (v: number) => L + ((v + lim) / (2 * lim)) * S;
  const py = (v: number) => T + S - ((v + lim) / (2 * lim)) * S;
  const dots = (ys: number[], color: string) => ys.map((y, i) => `<circle cx="${f1(px(theo[i]))}" cy="${f1(py(Math.max(-lim, Math.min(lim, y))))}" r="3" fill="${color}" fill-opacity="0.8" />`).join('');
  const ticks = [-2, 0, 2];
  const svg = `${svgOpen(W, H, '正規 Q-Q プロット：正規分布のデータは直線上に並び、右に裾の長いデータは右上で直線から上にはずれる')}
    <rect x="${L}" y="${T}" width="${S}" height="${S}" fill="none" stroke="${SLATE}" stroke-width="1" />
    <line x1="${px(-lim)}" y1="${py(-lim)}" x2="${px(lim)}" y2="${py(lim)}" stroke="${SLATE}" stroke-width="1.2" stroke-dasharray="4 3" />
    ${ticks.map((t) => `<text x="${f1(px(t))}" y="${T + S + 15}" text-anchor="middle" font-size="12.4" fill="${SLATE}">${t}</text><text x="${L - 6}" y="${f1(py(t) + 4)}" text-anchor="end" font-size="12.4" fill="${SLATE}">${t}</text>`).join('')}
    ${dots(ys1, INDIGO)}${dots(ys2, AMBER)}
    <text x="${L + S + 10}" y="${T + 40}" font-size="13.2" font-weight="700" fill="${INDIGO}">正規データ</text>
    <text x="${L + S + 10}" y="${T + 58}" font-size="12.4" fill="${INDIGO}">直線上に並ぶ</text>
    <text x="${L + S + 10}" y="${T + 100}" font-size="13.2" font-weight="700" fill="#b45309">右に裾が長い</text>
    <text x="${L + S + 10}" y="${T + 118}" font-size="12.4" fill="#b45309">右上で上にそる</text>
    <text x="${L + S / 2}" y="${H - 20}" text-anchor="middle" font-size="12.4" fill="${SLATE}">横軸＝正規分布の理論分位点</text>
    <text x="${L + S / 2}" y="${H - 5}" text-anchor="middle" font-size="12.4" fill="${SLATE}">縦軸＝標準化したデータの分位点</text>
  </svg>`;
  const cap = `Q-Q プロットは、データを小さい順に並べた値（縦軸）を、正規分布なら同じ順位に来るはずの値（横軸）に対して描いた図です。データが正規分布に従えば点は破線の直線上に並びます。青は正規乱数 ${n} 個で、ほぼ直線上です。橙は右に裾の長い（指数分布の）データで、右上の大きい値が直線より上にそれます。検定の p 値だけでは分からない「どこがどうずれているか」が見えるのが利点です。`;
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
    return `
    <rect x="${rx}" y="${y - rh / 2}" width="${rw}" height="${rh}" rx="3" fill="#ffffff" stroke="${INDIGO}" stroke-width="1.6" />
    <text x="${rx + rw / 2}" y="${y + 4.5}" text-anchor="middle" font-size="12" fill="${INK}">${nm}</text>
    ${arrow(fcx + 38, fcy + (y - fcy) * 0.35, rx - 1, y, INDIGO)}
    <text x="${f1(mid.x)}" y="${f1(mid.y - 8)}" text-anchor="middle" font-size="12" font-weight="700" fill="${INDIGO}">${f1(lam[i])}</text>
    ${arrow(318 - 16, y, rx + rw + 1, y, AMBER)}
    <circle cx="322" cy="${y}" r="15" fill="#fff7ed" stroke="${AMBER}" stroke-width="1.6" />
    <text x="322" y="${y + 4.5}" text-anchor="middle" font-size="12" fill="#b45309">u${i + 1}</text>`;
  }).join('');

  // PCA（向きが逆）
  const py0 = 206;
  const pys = [py0, py0 + 40, py0 + 80];
  const pcx = 280, pcy = py0 + 40;
  const pcaRows = names.map((nm, i) => `
    <rect x="20" y="${pys[i] - rh / 2}" width="${rw}" height="${rh}" rx="3" fill="#ffffff" stroke="${SLATE}" stroke-width="1.6" />
    <text x="${20 + rw / 2}" y="${pys[i] + 4.5}" text-anchor="middle" font-size="12" fill="${INK}">${nm}</text>
    ${arrow(20 + rw + 1, pys[i], pcx - 38, pcy + (pys[i] - pcy) * 0.35, SLATE)}`).join('');

  const svg = `${svgOpen(W, H, '因子分析のパス図：潜在因子から各観測変数へ矢印が出て、各変数には独自因子が付く。主成分分析は向きが逆で、観測変数から主成分を作る')}
    <defs><marker id="pa-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="${SLATE}" /></marker></defs>
    <text x="10" y="16" font-size="13" font-weight="700" fill="${INK}">因子分析：因子が変数を生む</text>
    <ellipse cx="${fcx}" cy="${fcy}" rx="38" ry="26" fill="#eef2ff" stroke="${INDIGO}" stroke-width="1.8" />
    <text x="${fcx}" y="${fcy - 2}" text-anchor="middle" font-size="12" font-weight="700" fill="${INDIGO}">外向性</text>
    <text x="${fcx}" y="${fcy + 12}" text-anchor="middle" font-size="12" fill="${INDIGO}">（因子 F）</text>
    ${rows}
    <text x="10" y="${py0 - 30}" font-size="13" font-weight="700" fill="${INK}">主成分分析：変数から軸を作る</text>
    ${pcaRows}
    <ellipse cx="${pcx}" cy="${pcy}" rx="38" ry="26" fill="#f1f5f9" stroke="${SLATE}" stroke-width="1.8" />
    <text x="${pcx}" y="${pcy + 4.5}" text-anchor="middle" font-size="12" font-weight="700" fill="${INK}">主成分 Z</text>
  </svg>`;
  const comm = lam.map((l) => f2(l * l));
  const uniq = lam.map((l) => f2(1 - l * l));
  const cap = `上は因子分析のパス図です。矢印の上の数が因子負荷量 λ で、「外向性が高いほど、その行動をとりやすい」強さを表します。各変数を標準化すると、λ の2乗が因子で説明できる割合（共通性）で、${comm.join('・')} になります。残りの ${uniq.join('・')} は、その変数だけに固有の独自因子 u の分です。下の主成分分析は矢印の向きが逆で、観測変数を合成して主成分を作ります。因子分析は「原因（因子）から結果（変数）」、主成分分析は「結果（変数）から要約（主成分）」の向きです。`;
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
    <text x="${x0 + 39}" y="${y0 + 74}" text-anchor="middle" font-size="12" fill="${SLATE}">${label}</text>`;
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
    <text x="8" y="${H - 6}" font-size="12" fill="${SLATE}">色＝調べたい値（低・中・高）。濃い輪郭が選ばれた個体</text>
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
    <text x="14" y="293" font-size="12" fill="${SLATE}">輪＝各群の平均／楕円＝平均からマハラノビス距離 ${r} の範囲</text>
  </svg>`;
  const cap = `2群の広がりが同じ向きの楕円（ここでは相関 ${rho}）のとき、灰の破線のように2つの平均の中点で垂直に切ると、楕円の長軸方向に伸びた裾が相手側にはみ出します。LDA の境界（赤）は、グループ内の分散共分散行列の逆行列を平均の差にかけた方向に垂直な線で、楕円の形に合わせて傾きます。この図では、灰の破線から約 ${Math.abs(ang(w) - ang(d))} 度回っています。楕円はマハラノビス距離が等しい点を結んだ線で、次の節のマハラノビス距離は、この楕円を測る物差しです。`;
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
    ${yt.map((v) => `<line x1="${L}" y1="${f1(py(v))}" x2="${L + PW}" y2="${f1(py(v))}" stroke="${SLATE}" stroke-opacity="0.2" /><text x="${L - 6}" y="${f1(py(v) + 4)}" text-anchor="end" font-size="12" fill="${SLATE}">${v}</text>`).join('')}
    ${rows.map((r) => `<text x="${f1(px(r.d))}" y="${T + PH + 16}" text-anchor="middle" font-size="12" fill="${SLATE}">${r.d}</text>`).join('')}
    ${path('train', SLATE, 1.8, '5 4')}${path('bias2', AMBER, 2.2)}${path('vr', INDIGO, 2.2)}${path('test', ROSE, 3)}
    <circle cx="${f1(px(best.d))}" cy="${f1(py(best.test))}" r="5" fill="#ffffff" stroke="${ROSE}" stroke-width="2" />
    <text x="${f1(px(best.d))}" y="${f1(py(best.test) - 10)}" text-anchor="middle" font-size="12.4" font-weight="700" fill="${ROSE}">最小：${best.d} 次</text>
    <text x="${L + PW / 2}" y="${T + PH + 34}" text-anchor="middle" font-size="12.4" fill="${SLATE}">横軸＝当てはめる多項式の次数（右ほど複雑）</text>
    <line x1="14" y1="${H - 36}" x2="38" y2="${H - 36}" stroke="${ROSE}" stroke-width="3" /><text x="44" y="${H - 32}" font-size="12.4" fill="${INK}">将来データの誤差（3つの和）</text>
    <line x1="14" y1="${H - 20}" x2="38" y2="${H - 20}" stroke="${AMBER}" stroke-width="2.2" /><text x="44" y="${H - 16}" font-size="12.4" fill="${INK}">バイアス²</text>
    <line x1="112" y1="${H - 20}" x2="136" y2="${H - 20}" stroke="${INDIGO}" stroke-width="2.2" /><text x="142" y="${H - 16}" font-size="12.4" fill="${INK}">バリアンス</text>
    <line x1="210" y1="${H - 20}" x2="234" y2="${H - 20}" stroke="${SLATE}" stroke-width="1.8" stroke-dasharray="5 4" /><text x="240" y="${H - 16}" font-size="12.4" fill="${INK}">手元データの誤差</text>
    <text x="14" y="${H - 3}" font-size="12" fill="${SLATE}">データ ${n} 点・ノイズ sd ${sig}・${R} 回の取り直しの平均</text>
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
    `<text x="10" y="${y}" font-size="13" font-weight="700" fill="${INK}">${title}</text><text x="10" y="${y + 16}" font-size="12" fill="${SLATE}">${sub}</text>`;
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
    <text x="218" y="40" font-size="12" fill="${SLATE}">観測できない交絡</text>
    <text x="175" y="146" text-anchor="middle" font-size="12" fill="${TEAL}">X→M と M→Y を別々にたどる</text>
  </svg>`;
  return fig(svg, '点線の U は測れない共通原因。X と Y を直接比べても U の影響が混ざるが、途中の M を観測できれば、X→M と M→Y の2段に分けて効果を求められる。');
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
  'f-bivariate': bivariateNormal, 'f-transform-strips': transformStrips, 'f-conditional': conditionalNormal, 'f-max-shift': maxShift,
  'f-lln': lln,
  'f-mean-narrow': meanNarrow,
  'f-likelihood': likelihood,
  'f-darts': darts,
  'f-pvalue': pValue,
  'f-anova': anovaDots,
  'f-dendrogram': dendrogram,
  'f-timeseries': timeSeries,
  'f-km': kaplanMeier,
  'f-montecarlo': monteCarloPi,
  'f-loglik': logLikCurvature,
  'f-qq': qqPlot,
  'f-factor-path': factorPath,
  'f-strata-cluster': strataVsCluster,
  'f-mds': mdsMap,
  'f-lda': ldaBoundary,
  'f-biasvar': biasVariance,
  'f-dag-basic': dagBasic,
  'f-dag-front': dagFront,
};
