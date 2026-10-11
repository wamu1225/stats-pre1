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
    <text x="${f1(PX(b, z) + 6)}" y="${f1(PY(b, f(a)) - 2)}" font-size="13.2" font-weight="700" fill="#b45309">170〜172cm の面積 ＝ ${f2(prob)}</text>
    <text x="${f1(PX(b, 179))}" y="${f1(PY(b, f(179)) - 18)}" font-size="13.2" fill="${INK}">曲線 f(x)</text>
    <text x="${b.x + b.w / 2}" y="${H - 6}" text-anchor="middle" font-size="13.2" fill="${SLATE}">横軸 ＝ 身長 x（cm）　曲線の下の面積の合計 ＝ 1</text>
  </svg>`;
  const cap = `身長の分布を、平均 ${m}cm・標準偏差 ${s}cm の正規分布と仮定して描いた確率密度関数です。「170〜172cm に入る確率」は、その区間で曲線の下を塗った<strong>面積</strong>で、約 ${f2(prob)} です。区間の幅を狭めると面積も小さくなり、幅が0の「ぴったり170cm」では面積が0、つまり確率0です。`;
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
    <text x="${f1(PX(b, 0.25))}" y="${f1(PY(b, 0.8))}" text-anchor="middle" font-size="13.2" font-weight="700" fill="#b45309">面積 ＝ 0.5 × 2 ＝ 1</text>
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
  const cap = `同じ指数分布で、<strong>F(x)</strong>（x 以下で終わる確率）と<strong>S(x)</strong>（x を超えて続く確率）を重ねました。どの x でも2本の高さを足すと1です（x = 2 なら ${f2(F(x2))} + ${f2(S(x2))} = 1）。F は0から1へ上がり、S は1から0へ下がり、両者は確率がちょうど半々になる中央値 x = ${f2(med)} で交わります。`;
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
  const cap = `青は標準正規分布、橙は指数分布を1だけ左にずらしたもの（X − 1、X は λ = 1 の指数分布）です。どちらも<strong>平均 0・分散 1</strong>で、期待値と分散だけでは区別できません。違いが出るのは3次と4次の中心モーメントで、歪度は 0 と 2、尖度は 3 と 9 です。「次数を上げるほど形を細かく区別できる」とはこのことです。`;
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
  const bin = ks.map((k) => `<circle cx="${f1(PX(b, k))}" cy="${f1(PY(b, binom(100, 0.04, k)))}" r="2.6" fill="none" stroke="${INK}" stroke-width="1.2" />`).join('');
  const svg = `${svgOpen(W, H, 'ポアソン分布の形：λ が大きいほど山が右に移り、低く広がる。二項分布 B(100,0.04) はポアソン分布 λ=4 とほぼ重なる')}
    ${axes(b, [0, 2, 4, 6, 8, 10, 12, 14, 16, 18])}
    ${groups}${bin}
    <text x="${f1(PX(b, 1) + 6)}" y="${f1(PY(b, pois(1, 0)) + 2)}" font-size="13.2" font-weight="700" fill="${INDIGO}">λ = 1</text>
    <text x="${f1(PX(b, 4) + 8)}" y="${f1(PY(b, pois(4, 4)) - 8)}" font-size="13.2" font-weight="700" fill="#b45309">λ = 4</text>
    <text x="${f1(PX(b, 10) + 6)}" y="${f1(PY(b, pois(10, 10)) - 8)}" font-size="13.2" font-weight="700" fill="${TEAL}">λ = 10</text>
    <text x="${b.x + b.w}" y="${b.y + 4}" text-anchor="end" font-size="12.4" fill="${INK}">○ ＝ 二項分布 B(100, 0.04)</text>
    <text x="${b.x + b.w / 2}" y="${H - 4}" text-anchor="middle" font-size="12.4" fill="${SLATE}">横軸 k（一定時間に起きる回数）／棒の高さ ＝ P(X = k)</text>
  </svg>`;
  const maxDiff = Math.max(...ks.map((k) => Math.abs(binom(100, 0.04, k) - pois(4, k))));
  const cap = `λ = 1 では0回と1回が同じ高さ（どちらも ${f2(pois(1, 0))}）で、そこから急に減ります。λ = 4、10 と大きくなるにつれて山は右へ移り、低く広がって左右対称に近づきます。平均も分散も λ なので、山の位置と広がりが一緒に大きくなります。○ は二項分布 B(100, 0.04)（np = 4）で、λ = 4 の棒とほぼ重なります（各 k での差は最大 ${maxDiff.toFixed(3)}）。n が大きく p が小さいときにポアソン分布で近似できる、という少数法則を図で見たものです。`;
  return fig(svg, cap);
}

// ============ 1.8：連続型分布の形 ============
function continuousShapes(): string {
  const W = 350, H = 410;
  const P = (i: number, xMin: number, xMax: number, yMax: number): Box => ({ x: 18 + (i % 2) * 176, y: 40 + Math.floor(i / 2) * 190, w: 150, h: 120, xMin, xMax, yMax });
  const g = P(0, 0, 12, 1.05), be = P(1, 0, 1, 3), ln = P(2, 0, 5, 1.0), ca = P(3, -6, 6, 0.42);
  const lbl = (b: Box, x: number, y: number, t: string, c: string) => `<text x="${f1(PX(b, x))}" y="${f1(PY(b, y))}" font-size="12.4" font-weight="700" fill="${c}">${t}</text>`;
  const svg = `${svgOpen(W, H, '連続型分布の形：ガンマ、ベータ、対数正規、コーシーと正規の比較')}
    <text x="${g.x}" y="${g.y - 18}" font-size="13.2" font-weight="700" fill="${INK}">指数・ガンマ（λ = 1）</text>
    ${axes(g, [0, 4, 8, 12])}
    ${curve(g, gammaPdf(1), INDIGO, 0, 12)}${curve(g, gammaPdf(2), AMBER, 0, 12)}${curve(g, gammaPdf(5), TEAL, 0, 12)}
    ${lbl(g, 0.6, 0.9, 'α=1（指数）', INDIGO)}${lbl(g, 1.6, 0.42, 'α=2', '#b45309')}${lbl(g, 6.2, 0.2, 'α=5', TEAL)}

    <text x="${be.x}" y="${be.y - 18}" font-size="13.2" font-weight="700" fill="${INK}">ベータ（α, β）0〜1</text>
    ${axes(be, [0, 0.5, 1])}
    ${curve(be, betaPdf(2, 5), INDIGO, 0.001, 0.999)}${curve(be, betaPdf(5, 2), AMBER, 0.001, 0.999)}${curve(be, betaPdf(2, 2), TEAL, 0.001, 0.999)}${curve(be, () => 1, SLATE, 0, 1, 1.5, '4 3')}
    ${lbl(be, 0.02, 2.75, '(2,5)', INDIGO)}${lbl(be, 0.8, 2.75, '(5,2)', '#b45309')}${lbl(be, 0.38, 1.7, '(2,2)', TEAL)}<text x="${be.x}" y="${be.y + be.h + 30}" font-size="12.4" fill="${SLATE}">点線 (1,1) ＝ 一様分布</text>

    <text x="${ln.x}" y="${ln.y - 18}" font-size="13.2" font-weight="700" fill="${INK}">対数正規（log X が正規）</text>
    ${axes(ln, [0, 1, 2, 3, 4, 5])}
    ${curve(ln, lognormPdf(0.5), INDIGO, 0.01, 5)}${curve(ln, lognormPdf(1), AMBER, 0.01, 5)}
    ${lbl(ln, 1.3, 0.85, 'σ=0.5', INDIGO)}${lbl(ln, 0.05, 0.75, 'σ=1', '#b45309')}

    <text x="${ca.x}" y="${ca.y - 18}" font-size="13.2" font-weight="700" fill="${INK}">コーシー と 正規</text>
    ${axes(ca, [-6, -3, 0, 3, 6])}
    ${curve(ca, (x) => normPdf(x), INDIGO)}${curve(ca, cauchyPdf, ROSE)}
    ${lbl(ca, 0.7, 0.37, '正規', INDIGO)}${lbl(ca, 2.2, 0.1, 'コーシー', ROSE)}
  </svg>`;
  const tailN = 2 * (1 - Phi(3)), tailC = 1 - (2 / Math.PI) * Math.atan(3);
  const cap = `左上：ガンマ分布は α = 1 のとき指数分布そのもので、α を大きくすると山が右へ移り、左右対称に近い形になります（λ = 1 なら平均も分散も α）。右上：ベータ分布は0〜1の値（割合）の分布で、α と β の大小で山の位置が決まります（α < β なら左寄り）。(1, 1) は一様分布です。左下：対数正規分布は0より大きい値だけをとり、右に長い裾を引きます（所得や価格の分布）。σ が大きいほど裾が長くなります。右下：コーシー分布は山が低く、裾が非常に重い分布です。|X| > 3 になる確率は正規分布で ${pct(tailN, 2)}、コーシー分布では ${pct(tailC)} です。この裾の重さのために期待値が存在しません。`;
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
  const svg = `${svgOpen(W, H, 'サイコロを振る回数を増やすと、3人それぞれの平均が3.5に近づいていく')}
    ${[2, 3, 4, 5].map((v) => `<text x="${b.x - 6}" y="${f1(py(v) + 4)}" text-anchor="end" font-size="12.4" fill="${SLATE}">${v}</text>`).join('')}
    <line x1="${b.x}" y1="${f1(py(3.5))}" x2="${b.x + b.w}" y2="${f1(py(3.5))}" stroke="${ROSE}" stroke-width="1.2" stroke-dasharray="4 3" />
    <text x="${b.x + b.w}" y="${b.y - 8}" text-anchor="end" font-size="12.4" fill="${ROSE}">赤の点線＝期待値 3.5</text>
    ${lines}
    <line x1="${b.x}" y1="${b.y + b.h}" x2="${b.x + b.w}" y2="${b.y + b.h}" stroke="${SLATE}" />
    ${[[0, '1'], [1, '10'], [2, '100'], [3, '1000']].map(([v, t]) => `<text x="${f1(PX(b, v as number))}" y="${b.y + b.h + 14}" text-anchor="middle" font-size="12.4" fill="${SLATE}">${t}</text>`).join('')}
    <text x="${b.x + b.w / 2}" y="${H - 6}" text-anchor="middle" font-size="12.4" fill="${SLATE}">振った回数（目盛りは10倍ごと）／縦軸＝それまでの目の平均</text>
  </svg>`;
  const at = (k: number) => runs.map((m) => m[k - 1].toFixed(2)).join('・');
  const cap = `3人が別々にサイコロを1000回振り、それまでに出た目の平均を追いかけました。10回目の平均は ${at(10)} とばらばらですが、100回目には ${at(100)}、1000回目には ${at(1000)} と、3本とも期待値 3.5 のまわりに集まります。どこで止めても平均が3.5ちょうどになるわけではなく、「ずれが大きくなる確率」が回数とともに小さくなる、というのが大数の法則の主張です。`;
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
  'f-poisson': poissonShapes,
  'f-continuous': continuousShapes,
  'f-normal-areas': normalAreas,
  'f-bayes-tree': bayesTree,
  'f-venn3': venn3,
  'f-overfit': overfit,
  'f-bivariate': bivariateNormal,
  'f-lln': lln,
  'f-likelihood': likelihood,
  'f-darts': darts,
  'f-pvalue': pValue,
  'f-anova': anovaDots,
  'f-dendrogram': dendrogram,
  'f-timeseries': timeSeries,
  'f-km': kaplanMeier,
  'f-montecarlo': monteCarloPi,
};
