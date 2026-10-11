/**
 * 分布の「形」を見せる図（1.1／1.3／1.4／1.6／1.7／1.8／1.10）。
 * 本文に `[[f-<名前>]]` を1行で置くと、App.tsx（ハイドレーション後）と scripts/prerender.ts（静的HTML）が
 * 同じ文字列を出す。図と説明文の数値はすべて式から計算する（手で書き写さない）。
 * 390px 幅で文字が読めるよう、viewBox の幅は 360 以下・文字は 12 を基本にする。
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
    ${xTicks.map((t) => `<text x="${f1(PX(b, t))}" y="${base + 14}" text-anchor="middle" font-size="11" fill="${SLATE}">${t}</text>`).join('')}
    ${yLabel ? `<text x="${b.x}" y="${b.y - 4}" font-size="11" fill="${SLATE}">${yLabel}</text>` : ''}`;
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

// ============ 1.4 節1：PMF と PDF ============
function pmfPdf(): string {
  const W = 350, H = 230;
  const L: Box = { x: 22, y: 40, w: 140, h: 140, xMin: 0.5, xMax: 6.5, yMax: 0.3 };
  const R: Box = { x: 196, y: 40, w: 140, h: 140, xMin: 0, xMax: 1.5, yMax: 2.1 };
  const lam = 2;
  const pdf = (x: number) => lam * Math.exp(-lam * x);
  const a = 0.25, z = 0.75;
  const prob = Math.exp(-lam * a) - Math.exp(-lam * z);
  const svg = `${svgOpen(W, H, '離散型の確率質量関数は棒の高さが確率、連続型の確率密度関数は面積が確率')}
    <text x="${L.x}" y="16" font-size="12" font-weight="700" fill="${INK}">PMF（サイコロ）</text>
    <text x="${R.x}" y="16" font-size="12" font-weight="700" fill="${INK}">PDF（指数分布 λ=${lam}）</text>
    ${axes(L, [1, 2, 3, 4, 5, 6])}
    ${bars(L, [1, 2, 3, 4, 5, 6], Array(6).fill(1 / 6), INDIGO, 0.35)}
    <line x1="${L.x}" y1="${f1(PY(L, 1 / 6))}" x2="${L.x + L.w}" y2="${f1(PY(L, 1 / 6))}" stroke="${INK}" stroke-width="1" stroke-dasharray="3 3" />
    <text x="${L.x + 2}" y="${f1(PY(L, 1 / 6) - 6)}" font-size="12" fill="${INK}">高さ 1/6 ＝ 確率</text>
    <text x="${L.x + L.w / 2}" y="${H - 16}" text-anchor="middle" font-size="12" fill="${INDIGO}">6本の高さの合計 ＝ 1</text>
    ${axes(R, [0, 0.5, 1, 1.5])}
    ${area(R, pdf, a, z, AMBER, 0.35)}
    ${curve(R, pdf, AMBER, 0, 1.5)}
    <line x1="${R.x}" y1="${f1(PY(R, 1))}" x2="${R.x + R.w}" y2="${f1(PY(R, 1))}" stroke="${SLATE}" stroke-width="1" stroke-dasharray="2 3" />
    <text x="${R.x + R.w}" y="${f1(PY(R, 1) - 4)}" text-anchor="end" font-size="11" fill="${SLATE}">高さ 1</text>
    <text x="${R.x + 4}" y="${f1(PY(R, 2) + 4)}" font-size="12" fill="${INK}">f(0) = ${lam}（1を超える）</text>
    <text x="${f1(PX(R, 0.5))}" y="${f1(PY(R, 0.3))}" text-anchor="middle" font-size="12" font-weight="700" fill="#b45309">面積 ${f2(prob)}</text>
    <text x="${R.x + R.w / 2}" y="${H - 16}" text-anchor="middle" font-size="12" fill="#b45309">曲線の下の面積の合計 ＝ 1</text>
  </svg>`;
  const cap = `左は離散型の<strong>確率質量関数</strong>で、棒の<strong>高さ</strong>がそのまま確率（どの目も 1/6）です。右は連続型の<strong>確率密度関数</strong>で、確率は曲線の下の<strong>面積</strong>です。${a} から ${z} の間に入る確率は塗った面積 ${f2(prob)} です。右の曲線は x = 0 で高さ ${lam} と1を超えますが、高さは確率ではないので問題ありません。1点ちょうどの面積は幅が0なので、確率も0です。`;
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
    <text x="${b.x - 6}" y="${f1(PY(b, 1) + 4)}" text-anchor="end" font-size="11" fill="${SLATE}">1</text>
    <text x="${b.x - 6}" y="${f1(PY(b, 0.5) + 4)}" text-anchor="end" font-size="11" fill="${SLATE}">0.5</text>
    ${curve(b, F, AMBER)}
    ${curve(b, S, TEAL)}
    <line x1="${f1(PX(b, x2))}" y1="${f1(PY(b, 0))}" x2="${f1(PX(b, x2))}" y2="${f1(PY(b, 1))}" stroke="${SLATE}" stroke-width="1" stroke-dasharray="3 3" />
    <text x="${f1(PX(b, x2) + 5)}" y="${f1(PY(b, F(x2)) + 14)}" font-size="12" fill="#b45309">F(2) = ${f2(F(x2))}</text>
    <text x="${f1(PX(b, x2) + 5)}" y="${f1(PY(b, S(x2)) - 6)}" font-size="12" fill="${TEAL}">S(2) = ${f2(S(x2))}</text>
    <circle cx="${f1(PX(b, med))}" cy="${f1(PY(b, 0.5))}" r="3.5" fill="${INK}" />
    <text x="${f1(PX(b, med) + 6)}" y="${f1(PY(b, 0.5) - 6)}" font-size="12" fill="${INK}">x = ${f2(med)} で交わる（中央値）</text>
    <text x="${f1(PX(b, 2.55))}" y="${f1(PY(b, F(2.55)) - 6)}" text-anchor="middle" font-size="12" font-weight="700" fill="#b45309">F(x)</text>
    <text x="${f1(PX(b, 0.35))}" y="${f1(PY(b, S(0.35)) - 6)}" font-size="12" font-weight="700" fill="${TEAL}">S(x)</text>
    <text x="${b.x + b.w / 2}" y="${H - 4}" text-anchor="middle" font-size="11" fill="${SLATE}">横軸 x（指数分布 λ = 1。例：故障までの年数）</text>
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
    <text x="${f1(PX(b, -1.12))}" y="${f1(PY(b, 0.62))}" text-anchor="end" font-size="12" font-weight="700" fill="${INDIGO}">正規分布</text>
    <text x="${f1(PX(b, -1.12))}" y="${f1(PY(b, 0.62) + 15)}" text-anchor="end" font-size="12" fill="${INDIGO}">歪度 0・尖度 3</text>
    <text x="${f1(PX(b, 1.3))}" y="${f1(PY(b, 0.42))}" font-size="12" font-weight="700" fill="#b45309">右に裾が長い分布</text>
    <text x="${f1(PX(b, 1.3))}" y="${f1(PY(b, 0.42) + 15)}" font-size="12" fill="#b45309">歪度 2・尖度 9</text>
    <text x="${f1(PX(b, 0) + 4)}" y="${b.y + 10}" font-size="11" fill="${SLATE}">平均 0</text>
    <text x="${b.x + b.w / 2}" y="${H - 4}" text-anchor="middle" font-size="11" fill="${SLATE}">どちらも 平均 0・分散 1（1次と2次のモーメントが同じ）</text>
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
    <text x="${f1(PX(b, 4.3))}" y="${f1(PY(b, X(5)) + 4)}" text-anchor="end" font-size="12" font-weight="700" fill="${INDIGO}">X</text>
    <text x="${f1(PX(b, 4.3))}" y="${f1(PY(b, X(5)) + 18)}" text-anchor="end" font-size="11" fill="${INDIGO}">平均5・SD1</text>
    <text x="${f1(PX(b, 8.7))}" y="${f1(PY(b, Xb(8)) + 4)}" font-size="12" font-weight="700" fill="${TEAL}">X + 3</text>
    <text x="${f1(PX(b, 8.7))}" y="${f1(PY(b, Xb(8)) + 18)}" font-size="11" fill="${TEAL}">平均8・SD1</text>
    <text x="${f1(PX(b, 13))}" y="${f1(PY(b, aX(12)) - 4)}" text-anchor="middle" font-size="12" font-weight="700" fill="#b45309">2X</text>
    <text x="${f1(PX(b, 13.6))}" y="${f1(PY(b, aX(12)) + 11)}" text-anchor="middle" font-size="11" fill="#b45309">平均10・SD2</text>
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
    return `<text x="${b.x}" y="${b.y - 22}" font-size="12" font-weight="700" fill="${INK}">B(${c.n}, ${c.p})</text>
      <text x="${b.x}" y="${b.y - 7}" font-size="11" fill="${SLATE}">平均 ${mean}・SD ${f2(sd)}</text>
      ${axes(b, ticks)}
      ${bars(b, ks, ps, c.n === 50 ? TEAL : INDIGO, c.n === 50 ? 0.25 : 0.3)}
      <line x1="${f1(PX(b, mean))}" y1="${b.y}" x2="${f1(PX(b, mean))}" y2="${b.y + b.h}" stroke="${AMBER}" stroke-width="1.4" stroke-dasharray="3 2" />`;
  }).join('');
  const svg = `${svgOpen(W, H, '二項分布の形：p が小さいと右に裾、p=0.5 で左右対称、p が大きいと左に裾、n を大きくすると釣鐘形に近づく')}${parts}
    <text x="${W / 2}" y="${H - 6}" text-anchor="middle" font-size="11" fill="${SLATE}">棒の高さ ＝ P(X = k)。橙の点線 ＝ 平均 np</text>
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
    <text x="${f1(PX(b, 1) + 6)}" y="${f1(PY(b, pois(1, 0)) + 2)}" font-size="12" font-weight="700" fill="${INDIGO}">λ = 1</text>
    <text x="${f1(PX(b, 4) + 8)}" y="${f1(PY(b, pois(4, 4)) - 8)}" font-size="12" font-weight="700" fill="#b45309">λ = 4</text>
    <text x="${f1(PX(b, 10) + 6)}" y="${f1(PY(b, pois(10, 10)) - 8)}" font-size="12" font-weight="700" fill="${TEAL}">λ = 10</text>
    <text x="${b.x + b.w}" y="${b.y + 4}" text-anchor="end" font-size="11" fill="${INK}">○ ＝ 二項分布 B(100, 0.04)</text>
    <text x="${b.x + b.w / 2}" y="${H - 4}" text-anchor="middle" font-size="11" fill="${SLATE}">横軸 k（一定時間に起きる回数）／棒の高さ ＝ P(X = k)</text>
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
  const lbl = (b: Box, x: number, y: number, t: string, c: string) => `<text x="${f1(PX(b, x))}" y="${f1(PY(b, y))}" font-size="11" font-weight="700" fill="${c}">${t}</text>`;
  const svg = `${svgOpen(W, H, '連続型分布の形：ガンマ、ベータ、対数正規、コーシーと正規の比較')}
    <text x="${g.x}" y="${g.y - 18}" font-size="12" font-weight="700" fill="${INK}">指数・ガンマ（λ = 1）</text>
    ${axes(g, [0, 4, 8, 12])}
    ${curve(g, gammaPdf(1), INDIGO, 0, 12)}${curve(g, gammaPdf(2), AMBER, 0, 12)}${curve(g, gammaPdf(5), TEAL, 0, 12)}
    ${lbl(g, 0.6, 0.9, 'α=1（指数）', INDIGO)}${lbl(g, 1.6, 0.42, 'α=2', '#b45309')}${lbl(g, 6.2, 0.2, 'α=5', TEAL)}

    <text x="${be.x}" y="${be.y - 18}" font-size="12" font-weight="700" fill="${INK}">ベータ（α, β）0〜1</text>
    ${axes(be, [0, 0.5, 1])}
    ${curve(be, betaPdf(2, 5), INDIGO, 0.001, 0.999)}${curve(be, betaPdf(5, 2), AMBER, 0.001, 0.999)}${curve(be, betaPdf(2, 2), TEAL, 0.001, 0.999)}${curve(be, () => 1, SLATE, 0, 1, 1.5, '4 3')}
    ${lbl(be, 0.02, 2.75, '(2,5)', INDIGO)}${lbl(be, 0.8, 2.75, '(5,2)', '#b45309')}${lbl(be, 0.38, 1.7, '(2,2)', TEAL)}<text x="${be.x}" y="${be.y + be.h + 30}" font-size="11" fill="${SLATE}">点線 (1,1) ＝ 一様分布</text>

    <text x="${ln.x}" y="${ln.y - 18}" font-size="12" font-weight="700" fill="${INK}">対数正規（log X が正規）</text>
    ${axes(ln, [0, 1, 2, 3, 4, 5])}
    ${curve(ln, lognormPdf(0.5), INDIGO, 0.01, 5)}${curve(ln, lognormPdf(1), AMBER, 0.01, 5)}
    ${lbl(ln, 1.3, 0.85, 'σ=0.5', INDIGO)}${lbl(ln, 0.05, 0.75, 'σ=1', '#b45309')}

    <text x="${ca.x}" y="${ca.y - 18}" font-size="12" font-weight="700" fill="${INK}">コーシー と 正規</text>
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
    <text x="${f1(PX(b, mu))}" y="${f1(PY(b, pdf(mu) * 0.35))}" text-anchor="middle" font-size="12" font-weight="700" fill="#fff">±1σ ${pct(p(1))}</text>
    <text x="${f1(PX(b, mu - 1.5 * sd))}" y="${f1(PY(b, pdf(mu) * 0.08))}" text-anchor="middle" font-size="11" font-weight="700" fill="${INK}">±2σ</text>
    <text x="${f1(PX(b, mu + 2.55 * sd))}" y="${f1(PY(b, pdf(mu) * 0.2))}" text-anchor="middle" font-size="11" fill="${INK}">±3σ</text>
    <text x="${W / 2}" y="14" text-anchor="middle" font-size="12" font-weight="700" fill="${INK}">±1σ：${pct(p(1))}　±2σ：${pct(p(2))}　±3σ：${pct(p(3))}</text>
    <text x="${W / 2}" y="31" text-anchor="middle" font-size="12" fill="${ROSE}">ちょうど95%になるのは ±1.96σ（158.2〜181.8cm）</text>
    <line x1="${f1(PX(b, mu - 1.96 * sd))}" y1="${b.y}" x2="${f1(PX(b, mu - 1.96 * sd))}" y2="${b.y + b.h}" stroke="${ROSE}" stroke-width="1.2" stroke-dasharray="3 2" />
    <line x1="${f1(PX(b, mu + 1.96 * sd))}" y1="${b.y}" x2="${f1(PX(b, mu + 1.96 * sd))}" y2="${b.y + b.h}" stroke="${ROSE}" stroke-width="1.2" stroke-dasharray="3 2" />
    <text x="${b.x + b.w / 2}" y="${H - 4}" text-anchor="middle" font-size="11" fill="${SLATE}">身長（cm）。平均 170・標準偏差 6</text>
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
     <text x="${x + w / 2}" y="${y + 17}" text-anchor="middle" font-size="12" font-weight="700" fill="${INK}">${t1}</text>
     <text x="${x + w / 2}" y="${y + 33}" text-anchor="middle" font-size="12" fill="${INK}">${t2}</text>`;
  const ln = (x1: number, y1: number, x2: number, y2: number, t: string) =>
    `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${SLATE}" stroke-width="1.2" /><text x="${(x1 + x2) / 2 + (x2 > x1 ? 4 : -4)}" y="${(y1 + y2) / 2}" text-anchor="${x2 > x1 ? 'start' : 'end'}" font-size="11" fill="${SLATE}">${t}</text>`;
  const svg = `${svgOpen(W, H, '1000人の検査を樹形図で数える')}
    ${box(125, 4, 100, '検査を受ける', `${N}人`, SLATE)}
    ${ln(150, 44, 80, 80, `有病率 ${pct(prev, 0)}`)}${ln(200, 44, 270, 80, '')}
    ${box(20, 80, 110, '病気', `${sick}人`, ROSE)}${box(220, 80, 110, '健康', `${healthy}人`, TEAL)}
    ${ln(55, 120, 40, 160, '')}${ln(95, 120, 110, 160, '')}<text x="75" y="146" text-anchor="middle" font-size="11" fill="${SLATE}">感度 ${pct(sens, 0)}</text>
    ${ln(255, 120, 240, 160, '')}${ln(295, 120, 310, 160, '')}<text x="275" y="146" text-anchor="middle" font-size="11" fill="${SLATE}">特異度 ${pct(spec, 0)}</text>
    ${box(4, 160, 72, '陽性', `${num(tp)}人`, ROSE)}${box(80, 160, 62, '陰性', `${num(fn)}人`, SLATE)}
    ${box(206, 160, 72, '陽性', `${num(fp)}人`, AMBER)}${box(282, 160, 64, '陰性', `${num(tn)}人`, SLATE)}
    <text x="${W / 2}" y="${H - 22}" text-anchor="middle" font-size="12" font-weight="700" fill="${INK}">陽性 ${num(pos)}人のうち、病気は ${num(tp)}人</text>
    <text x="${W / 2}" y="${H - 5}" text-anchor="middle" font-size="12" font-weight="700" fill="${ROSE}">P(病気 ∣ 陽性) = ${num(tp)} ÷ ${num(pos)} ≈ ${pct(post)}</text>
  </svg>`;
  const cap = `${N}人で数えると、病気の${sick}人からは${num(tp)}人が陽性、健康な${healthy}人からも${num(fp)}人が誤って陽性になります。陽性の${num(pos)}人のうち本当に病気なのは${num(tp)}人だけなので、陽性とわかっても病気である確率は約 ${pct(post)} です。健康な人が圧倒的に多いため、わずか ${pct(1 - spec, 0)} の誤りでも陽性の大半を占めます。ベイズの定理の分母（全確率）は、この図の「陽性の合計」にあたります。`;
  return fig(svg, cap);
}

// ============ 1.1：3事象の包除原理 ============
function venn3(): string {
  const W = 340, H = 250;
  const c = [{ x: 140, y: 95, n: 'A', col: INDIGO }, { x: 200, y: 95, n: 'B', col: AMBER }, { x: 170, y: 147, n: 'C', col: TEAL }];
  const r = 62;
  const t = (x: number, y: number, s: string, w = 400) => `<text x="${x}" y="${y}" text-anchor="middle" font-size="11" font-weight="${w}" fill="${INK}">${s}</text>`;
  const svg = `${svgOpen(W, H, '3つの事象のベン図：各領域が何回数えられるか')}
    ${c.map((k) => `<circle cx="${k.x}" cy="${k.y}" r="${r}" fill="${k.col}" fill-opacity="0.13" stroke="${k.col}" stroke-width="1.5" />`).join('')}
    ${c.map((k, i) => `<text x="${k.x + [-58, 58, -66][i]}" y="${k.y + [-48, -48, 50][i]}" text-anchor="middle" font-size="16" font-weight="700" fill="${k.col}">${k.n}</text>`).join('')}
    ${t(112, 82, '1')}${t(228, 82, '1')}${t(170, 186, '1')}
    ${t(170, 72, '2−1')}${t(136, 136, '2−1')}${t(204, 136, '2−1')}
    ${t(170, 113, '3−3+1', 700)}
    <text x="${W / 2}" y="${H - 22}" text-anchor="middle" font-size="12" fill="${INK}">数字 ＝ 足す・引く・足すで、その領域を何回数えたか</text>
    <text x="${W / 2}" y="${H - 6}" text-anchor="middle" font-size="12" font-weight="700" fill="${INDIGO}">最後はどの領域もちょうど1回になる</text>
  </svg>`;
  const cap = `P(A) + P(B) + P(C) と足すと、2つが重なる部分は2回、3つが重なる中心は3回数えられます。2つずつの重なり3つを引くと、2つの重なりは 2 − 1 = 1 回に直りますが、中心は3回引かれて 3 − 3 = 0 回、つまり<strong>引き過ぎ</strong>になります。そこで最後に P(A∩B∩C) を1回足し戻すと、すべての領域がちょうど1回になります。`;
  return fig(svg, cap);
}

export const SHAPE_FIGS: Record<string, () => string> = {
  'f-pmf-pdf': pmfPdf,
  'f-survival': survival,
  'f-same-moments': sameMomentsDifferentShape,
  'f-linear-transform': linearTransform,
  'f-binomial': binomialShapes,
  'f-poisson': poissonShapes,
  'f-continuous': continuousShapes,
  'f-normal-areas': normalAreas,
  'f-bayes-tree': bayesTree,
  'f-venn3': venn3,
};
