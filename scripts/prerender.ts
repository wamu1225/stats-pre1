import * as fs from 'fs';
import * as path from 'path';
import sharp from 'sharp';
import katex from 'katex';
import { modules } from '../src/data/modules';
import { glossary } from '../src/data/glossary';
import { buildUsecaseHtml } from '../src/data/usecaseGuide';
import {
  buildCheatsheetHtml,
  buildGuideHtml,
  buildAboutHtml,
  buildRootStaticContent,
  buildModuleSeoHtml,
  buildFaqPageHtml,
} from './static-content.js';

const DIST_DIR = path.resolve(process.cwd(), 'dist');
const INDEX_HTML_PATH = path.join(DIST_DIR, 'index.html');
const BASE_URL = 'https://study-apps.com/stats-pre1';
const BASE = '/stats-pre1';

const escHtml = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

// KaTeXでサーバーサイド描画（2026-07-30・O-2-6続報：$...$を除去すると地の文が破綻するため実描画に変更）。
// MathDisplay.tsx と同じオプション（displayMode/throwOnError/output:'html'）・同じクラス名を使い、
// ハイドレーション後との見た目の一致を狙う。renderToStringが失敗した場合のみ元のLaTeX文字列を残す。
function renderMath(formula: string, block: boolean): string {
  try {
    const html = katex.renderToString(formula, { displayMode: block, throwOnError: false, output: 'html' });
    return block ? `<div class="math-block-container" style="margin:1rem 0"><div class="katex-display">${html}</div></div>` : `<span class="katex-inline">${html}</span>`;
  } catch {
    return escHtml(formula);
  }
}

// 素朴なトークナイザ：[[...]] / [ラベル](URL) / $$...$$ / $...$ / **太字** をこの優先順で切り出す。
// 残りの地の文はescHtmlし、数式はrenderMathでHTML化（escHtmlしない＝renderMathの出力はそのまま埋め込む）。
const inlineHtml = (raw: string): string => {
  const s = raw.replace(/\[\[.*?\]\]/g, '').replace(/\[([^\]\n]+)\]\([^)\n]+\)/g, '$1');
  const tokens = s.split(/(\$\$[\s\S]+?\$\$|\$[^$\n]+\$)/g);
  return tokens
    .map((t) => {
      if (t.startsWith('$$') && t.endsWith('$$') && t.length >= 4) return renderMath(t.slice(2, -2), true);
      if (t.startsWith('$') && t.endsWith('$') && t.length >= 2) return renderMath(t.slice(1, -1), false);
      return escHtml(t).replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
    })
    .join('');
};

// App.tsx内のJSX図（[[key]]でReact専用に描画されるSVG/表）を静的HTMLでも表示する（2026-07-30・O-2-6続報）。
// これまで行ごと除去され図が1つも無かった。固定座標・固定数式（props/state非依存）のもののみ複製し、
// [[interactive:TYPE]]（スライダー等の真の動的コンポーネント）は対象外のまま。
function ciCoverageSvg(): string {
  const trueX = 182;
  const intervals: [number, number][] = [
    [150, 214], [138, 202], [160, 226], [148, 210], [134, 198],
    [168, 230], [120, 168], [156, 220], [142, 206], [164, 228],
    [130, 194], [152, 216], [146, 208], [170, 232], [136, 200],
    [158, 222], [144, 204], [162, 226], [140, 202], [154, 218],
  ];
  const rows = intervals.map(([lo, hi], idx) => {
    const y = 30 + idx * 9;
    const covers = lo <= trueX && trueX <= hi;
    const color = covers ? '#4338ca' : '#dc2626';
    const cx = (lo + hi) / 2;
    return `<g><line x1="${lo}" y1="${y}" x2="${hi}" y2="${y}" stroke="${color}" stroke-width="2" /><line x1="${lo}" y1="${y - 3}" x2="${lo}" y2="${y + 3}" stroke="${color}" stroke-width="2" /><line x1="${hi}" y1="${y - 3}" x2="${hi}" y2="${y + 3}" stroke="${color}" stroke-width="2" /><circle cx="${cx}" cy="${y}" r="1.7" fill="${color}" /></g>`;
  }).join('');
  return `<svg viewBox="0 0 360 220" role="img" aria-label="信頼区間の被覆：別々の標本から作った95%信頼区間と、固定された真の値θ。約95%が真値をまたぐ" class="venn-svg ci-svg"><line x1="${trueX}" y1="22" x2="${trueX}" y2="210" stroke="#dc2626" stroke-width="1.5" stroke-dasharray="4 3" /><text x="${trueX}" y="15" text-anchor="middle" font-size="12" font-weight="700" fill="#b91c1c">θ（真の値・固定）</text>${rows}</svg>`;
}
function powerCurveSvg(): string {
  const base = 190, A = 120, sig = 34, mu0 = 150, mu1 = 235, c = 206;
  const g = (x: number, mu: number) => base - A * Math.exp(-0.5 * ((x - mu) / sig) ** 2);
  const curve = (mu: number, a: number, b: number) => { let s = ''; for (let x = a; x <= b; x += 3) s += `${x},${g(x, mu).toFixed(1)} `; return s.trim(); };
  const fillArea = (mu: number, a: number, b: number) => { let s = `${a},${base} `; for (let x = a; x <= b; x += 3) s += `${x},${g(x, mu).toFixed(1)} `; return s + `${b},${base}`; };
  return `<svg viewBox="0 0 420 214" role="img" aria-label="検定の2分布図：H0とH1の重なりに第1種の過誤α・第2種の過誤β・検出力1−βを示す" class="venn-svg ci-svg">
    <line x1="48" y1="${base}" x2="372" y2="${base}" stroke="#9ca3af" stroke-width="1" />
    <polygon points="${fillArea(mu1, c, 360)}" fill="#16a34a" fill-opacity="0.16" />
    <polygon points="${fillArea(mu1, 140, c)}" fill="#6b7280" fill-opacity="0.3" />
    <polygon points="${fillArea(mu0, c, 290)}" fill="#dc2626" fill-opacity="0.32" />
    <polyline points="${curve(mu0, 52, 300)}" fill="none" stroke="#4338ca" stroke-width="2" />
    <polyline points="${curve(mu1, 130, 360)}" fill="none" stroke="#0f766e" stroke-width="2" />
    <line x1="${c}" y1="52" x2="${c}" y2="${base}" stroke="#111827" stroke-width="1.2" stroke-dasharray="4 3" />
    <text x="${mu0}" y="${base + 15}" text-anchor="middle" font-size="12" fill="#3730a3">μ₀</text>
    <text x="${mu1}" y="${base + 15}" text-anchor="middle" font-size="12" fill="#0f766e">μ₁</text>
    <text x="${c}" y="48" text-anchor="middle" font-size="11" fill="#111827">境界 c</text>
    <text x="${mu0}" y="64" text-anchor="middle" font-size="11" font-weight="700" fill="#3730a3">H₀ 真</text>
    <text x="${mu1}" y="64" text-anchor="middle" font-size="11" font-weight="700" fill="#0f766e">H₁ 真</text>
    <text x="224" y="183" text-anchor="middle" font-size="12" font-weight="700" fill="#991b1b">α</text>
    <text x="189" y="170" text-anchor="middle" font-size="12" font-weight="700" fill="#374151">β</text>
    <text x="262" y="150" text-anchor="middle" font-size="12" font-weight="700" fill="#166534">1−β</text>
  </svg>`;
}
function logisticSigmoidSvg(): string {
  const x0 = 44, x1 = 332, yTop = 30, yBot = 182;
  const px = (eta: number) => x0 + ((eta + 6) / 12) * (x1 - x0);
  const py = (p: number) => yBot - p * (yBot - yTop);
  const sig = (eta: number) => 1 / (1 + Math.exp(-eta));
  let scurve = '';
  for (let e = -6; e <= 6.0001; e += 0.25) scurve += `${px(e).toFixed(1)},${py(sig(e)).toFixed(1)} `;
  return `<svg viewBox="0 0 360 220" role="img" aria-label="ロジスティック回帰のシグモイド曲線：線形予測子に対し確率が0と1の間に収まる" class="venn-svg ci-svg">
    <line x1="${x0}" y1="${py(1)}" x2="${x1}" y2="${py(1)}" stroke="#cbd5e1" stroke-width="1" stroke-dasharray="3 3" />
    <line x1="${x0}" y1="${py(0)}" x2="${x1}" y2="${py(0)}" stroke="#cbd5e1" stroke-width="1" stroke-dasharray="3 3" />
    <line x1="${x0}" y1="${yTop - 6}" x2="${x0}" y2="${yBot + 6}" stroke="#9ca3af" stroke-width="1" />
    <line x1="${px(-6)}" y1="${py(0.5 + 0.11 * -6)}" x2="${px(6)}" y2="${py(0.5 + 0.11 * 6)}" stroke="#9ca3af" stroke-width="1.5" stroke-dasharray="5 3" />
    <polyline points="${scurve.trim()}" fill="none" stroke="#0f766e" stroke-width="2.4" />
    <circle cx="${px(0)}" cy="${py(0.5)}" r="2.8" fill="#0f766e" />
    <text x="${x0 - 6}" y="${py(1) + 4}" text-anchor="end" font-size="11" fill="#6b7280">1</text>
    <text x="${x0 - 6}" y="${py(0) + 4}" text-anchor="end" font-size="11" fill="#6b7280">0</text>
    <text x="${px(0) + 7}" y="${py(0.5) - 6}" text-anchor="start" font-size="11" font-weight="700" fill="#0f766e">p=0.5</text>
    <text x="${x1}" y="${yBot + 20}" text-anchor="end" font-size="11" fill="#6b7280">β₀+β·x（線形予測子）</text>
    <text x="${x0 - 4}" y="${yTop - 12}" text-anchor="start" font-size="11" fill="#6b7280">確率 p</text>
  </svg>`;
}

const FIGURES: Record<string, string> = {
  'venn-inclusion': `<figure class="venn-figure"><svg viewBox="0 0 340 200" role="img" aria-label="包除原理のベン図：A と B の重なりを一度だけ引く" class="venn-svg">
    <circle cx="132" cy="92" r="78" fill="#4338ca" fill-opacity="0.22" stroke="#4338ca" stroke-width="1.5" />
    <circle cx="208" cy="92" r="78" fill="#d97706" fill-opacity="0.22" stroke="#d97706" stroke-width="1.5" />
    <text x="94" y="99" text-anchor="middle" font-size="22" font-weight="700" fill="#3730a3">A</text>
    <text x="246" y="99" text-anchor="middle" font-size="22" font-weight="700" fill="#b45309">B</text>
    <text x="170" y="99" text-anchor="middle" font-size="13" font-weight="700" fill="#1f2937">A∩B</text>
  </svg><figcaption class="venn-caption">和事象 A∪B は、重なり A∩B を一度だけ引く：P(A∪B) = P(A) + P(B) − P(A∩B)。単純に足すと、重なり部分を二重に数えてしまうため。</figcaption></figure>`,
  'venn-conditional': `<figure class="venn-figure"><svg viewBox="0 0 340 200" role="img" aria-label="条件付き確率：A が起きた世界の中での B の割合" class="venn-svg">
    <rect x="6" y="6" width="328" height="188" rx="8" fill="#f3f4f6" stroke="#d1d5db" stroke-width="1" />
    <text x="20" y="26" font-size="12" fill="#6b7280">Ω</text>
    <circle cx="140" cy="104" r="68" fill="#4338ca" fill-opacity="0.16" stroke="#4338ca" stroke-width="3" />
    <circle cx="205" cy="104" r="68" fill="#d97706" fill-opacity="0.16" stroke="#d97706" stroke-width="1.2" />
    <text x="104" y="110" text-anchor="middle" font-size="22" font-weight="700" fill="#3730a3">A</text>
    <text x="242" y="110" text-anchor="middle" font-size="20" font-weight="700" fill="#b45309">B</text>
    <text x="172" y="110" text-anchor="middle" font-size="12" font-weight="700" fill="#1f2937">A∩B</text>
  </svg><figcaption class="venn-caption">条件付き確率 P(B∣A) = P(A∩B) / P(A)。A が起きたとわかった時点で、考える世界は A の中（太線）だけ。その中で B にも入っている割合が P(B∣A)。</figcaption></figure>`,
  'total-probability': `<figure class="venn-figure"><svg viewBox="0 0 360 200" role="img" aria-label="全確率の定理：原因 B1 B2 B3 ごとの寄与を足す" class="venn-svg">
    <rect x="10" y="22" width="340" height="150" fill="#ffffff" stroke="#9ca3af" stroke-width="1" />
    <line x1="158" y1="22" x2="158" y2="172" stroke="#9ca3af" stroke-width="1" />
    <line x1="262" y1="22" x2="262" y2="172" stroke="#9ca3af" stroke-width="1" />
    <rect x="10" y="120" width="148" height="52" fill="#4338ca" fill-opacity="0.3" />
    <rect x="158" y="92" width="104" height="80" fill="#4338ca" fill-opacity="0.3" />
    <rect x="262" y="146" width="88" height="26" fill="#4338ca" fill-opacity="0.3" />
    <text x="84" y="40" text-anchor="middle" font-size="13" font-weight="700" fill="#374151">B₁</text>
    <text x="210" y="40" text-anchor="middle" font-size="13" font-weight="700" fill="#374151">B₂</text>
    <text x="306" y="40" text-anchor="middle" font-size="13" font-weight="700" fill="#374151">B₃</text>
    <text x="84" y="150" text-anchor="middle" font-size="11" font-weight="700" fill="#312e81">A∩B₁</text>
    <text x="210" y="136" text-anchor="middle" font-size="11" font-weight="700" fill="#312e81">A∩B₂</text>
    <text x="306" y="162" text-anchor="middle" font-size="10" font-weight="700" fill="#312e81">A∩B₃</text>
  </svg><figcaption class="venn-caption">全確率の定理 P(A) = Σ P(A∣Bᵢ)·P(Bᵢ)。全体 Ω を排反な原因 B₁,B₂,B₃ … に分け、各原因の中で A が起きる量（青）を足し合わせると P(A) になる。列の幅が P(Bᵢ)、青い高さが P(A∣Bᵢ) のイメージ。</figcaption></figure>`,
  'ci-coverage': `<figure class="venn-figure">${ciCoverageSvg()}<figcaption class="venn-caption">各横線は、別々の標本から作った95%信頼区間（中央の点が標本平均 x̄）。真の値 θ は1つに決まっていて動かない（赤い縦線）。標本ごとに区間のほうが左右に揺れる。この手順をくり返すと約95%の区間が θ をまたぐ（青）が、たまに外す（赤）。「95%」はこの手順の長期的な成功率であって、ある1つの区間に θ が入る確率ではない。</figcaption></figure>`,
  'power-curve': `<figure class="venn-figure">${powerCurveSvg()}<figcaption class="venn-caption">左の山は差がない（H₀ が真）ときの検定統計量の分布、右の山は差がある（H₁ が真）ときの分布。境界 c より右に出たら H₀ を棄却する。α（赤）＝H₀ が真なのに棄却してしまう第1種の過誤、β（灰）＝H₁ が真なのに見逃す第2種の過誤、1−β（緑）＝検出力。境界 c を左へ動かすと α は増え β は減る（トレードオフ）。標本数 n を増やすと両方の山が細くなって重なりが減り、α を保ったまま検出力を上げられる。</figcaption></figure>`,
  'markov-chain': `<figure class="venn-figure"><svg viewBox="0 0 360 200" role="img" aria-label="マルコフ連鎖の状態遷移図：晴れと雨の2状態と推移確率" class="venn-svg ci-svg">
    <defs><marker id="mkArrow" markerUnits="userSpaceOnUse" markerWidth="10" markerHeight="10" refX="7" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 Z" fill="#475569" /></marker></defs>
    <path d="M139,93 Q180,55 221,93" fill="none" stroke="#475569" stroke-width="1.6" marker-end="url(#mkArrow)" />
    <path d="M221,127 Q180,165 139,127" fill="none" stroke="#475569" stroke-width="1.6" marker-end="url(#mkArrow)" />
    <path d="M78,98 C40,80 40,140 78,122" fill="none" stroke="#475569" stroke-width="1.6" marker-end="url(#mkArrow)" />
    <path d="M282,98 C320,80 320,140 282,122" fill="none" stroke="#475569" stroke-width="1.6" marker-end="url(#mkArrow)" />
    <circle cx="110" cy="110" r="34" fill="#fef3c7" stroke="#d97706" stroke-width="2" />
    <circle cx="250" cy="110" r="34" fill="#dbeafe" stroke="#2563eb" stroke-width="2" />
    <text x="110" y="117" text-anchor="middle" font-size="20" font-weight="700" fill="#b45309">晴</text>
    <text x="250" y="117" text-anchor="middle" font-size="20" font-weight="700" fill="#1d4ed8">雨</text>
    <text x="180" y="50" text-anchor="middle" font-size="12" font-weight="700" fill="#334155">0.2</text>
    <text x="180" y="181" text-anchor="middle" font-size="12" font-weight="700" fill="#334155">0.4</text>
    <text x="33" y="114" text-anchor="middle" font-size="12" font-weight="700" fill="#b45309">0.8</text>
    <text x="327" y="114" text-anchor="middle" font-size="12" font-weight="700" fill="#1d4ed8">0.6</text>
  </svg><figcaption class="venn-caption">天気を晴れ・雨の2状態にしたマルコフ連鎖。矢印は推移確率 pᵢⱼ（晴→雨 = 0.2、雨→晴 = 0.4、自己ループは晴→晴 = 0.8、雨→雨 = 0.6）。各状態から出る矢印の確率の和は必ず1で、これが推移確率行列 P の各行の和が1になることに対応する。次の状態は今の状態だけで決まり、それより前の履歴にはよらない（マルコフ性）。</figcaption></figure>`,
  'logistic-sigmoid': `<figure class="venn-figure">${logisticSigmoidSvg()}<figcaption class="venn-caption">ロジスティック回帰のシグモイド関数 p = 1 / (1 + e^−(β₀+β·x))。線形予測子（横軸）がどれだけ大きく・小さくなっても、確率（縦軸）は必ず0と1の間に収まる。確率をそのまま直線で当てはめると（灰の破線）0を下回り1を超えてしまうのに対し、シグモイドはなめらかに0↔1を結ぶ。中央 β₀+β·x = 0 で p = 0.5、そこで傾きが最も急になる。</figcaption></figure>`,
  'pvalue-table': `<div style="overflow-x:auto;margin:1rem 0"><table style="width:100%;border-collapse:collapse;font-size:0.85rem">
    <thead><tr><th style="background:#fef2f2;color:#991b1b;padding:0.6rem 0.75rem;border:1px solid #fecaca;text-align:left;font-weight:800">❌ 間違った解釈</th><th style="background:#f0fdf4;color:#166534;padding:0.6rem 0.75rem;border:1px solid #bbf7d0;text-align:left;font-weight:800">✅ 正しい解釈</th></tr></thead>
    <tbody>
    <tr><td style="padding:0.6rem 0.75rem;border:1px solid var(--border);vertical-align:top">「帰無仮説が正しい確率が3%」</td><td style="padding:0.6rem 0.75rem;border:1px solid var(--border);vertical-align:top">「帰無仮説が正しいと仮定したとき、この結果が偶然起きる確率が3%」</td></tr>
    <tr style="background:var(--bg-warm)"><td style="padding:0.6rem 0.75rem;border:1px solid var(--border);vertical-align:top">「P=0.03は効果が大きいことを示す」</td><td style="padding:0.6rem 0.75rem;border:1px solid var(--border);vertical-align:top">P値はサンプルサイズに影響される。効果の大きさは<strong>効果量</strong>（コーエンの d など）で測る</td></tr>
    </tbody></table></div>`,
  'anova-table': `<div style="overflow-x:auto;margin:1rem 0"><table style="width:100%;border-collapse:collapse;font-size:0.85rem">
    <thead><tr><th style="background:#eff6ff;color:#1d4ed8;padding:0.6rem 0.75rem;border:1px solid #bfdbfe;text-align:left;font-weight:800">グループ</th><th style="background:#eff6ff;color:#1d4ed8;padding:0.6rem 0.75rem;border:1px solid #bfdbfe;text-align:left;font-weight:800">10日間の売上例</th><th style="background:#eff6ff;color:#1d4ed8;padding:0.6rem 0.75rem;border:1px solid #bfdbfe;text-align:left;font-weight:800">10日間の平均</th></tr></thead>
    <tbody>
    <tr><td style="padding:0.6rem 0.75rem;border:1px solid var(--border)">煮玉子</td><td style="padding:0.6rem 0.75rem;border:1px solid var(--border)">52, 48, 55, 51, 49…</td><td style="padding:0.6rem 0.75rem;border:1px solid var(--border);font-weight:700">51万円</td></tr>
    <tr style="background:var(--bg-warm)"><td style="padding:0.6rem 0.75rem;border:1px solid var(--border)">チャーシュー</td><td style="padding:0.6rem 0.75rem;border:1px solid var(--border)">58, 61, 57, 60, 59…</td><td style="padding:0.6rem 0.75rem;border:1px solid var(--border);font-weight:700;color:#1d4ed8">59万円</td></tr>
    <tr><td style="padding:0.6rem 0.75rem;border:1px solid var(--border)">メンマ</td><td style="padding:0.6rem 0.75rem;border:1px solid var(--border)">50, 52, 48, 51, 49…</td><td style="padding:0.6rem 0.75rem;border:1px solid var(--border);font-weight:700">50万円</td></tr>
    </tbody></table></div>`,
  'type-error-table': `<div style="overflow-x:auto;margin:1rem 0"><table style="width:100%;border-collapse:collapse;font-size:0.85rem">
    <thead><tr><th style="background:var(--bg-warm);padding:0.6rem 0.75rem;border:1px solid var(--border);text-align:left;font-weight:800"></th><th style="background:#f0fdf4;color:#166534;padding:0.6rem 0.75rem;border:1px solid #bbf7d0;text-align:left;font-weight:800">H₀ が真（本当は差なし）</th><th style="background:#fef2f2;color:#991b1b;padding:0.6rem 0.75rem;border:1px solid #fecaca;text-align:left;font-weight:800">H₀ が偽（本当は差あり）</th></tr></thead>
    <tbody>
    <tr><td style="padding:0.6rem 0.75rem;border:1px solid var(--border);font-weight:700">棄却（差ありと判断）</td><td style="padding:0.6rem 0.75rem;border:1px solid var(--border);background:#fef2f2;color:#991b1b;font-weight:700">第1種の過誤 α（冤罪）</td><td style="padding:0.6rem 0.75rem;border:1px solid var(--border);background:#f0fdf4;color:#166534">正解 ✓</td></tr>
    <tr><td style="padding:0.6rem 0.75rem;border:1px solid var(--border);font-weight:700">棄却しない（差なし）</td><td style="padding:0.6rem 0.75rem;border:1px solid var(--border);background:#f0fdf4;color:#166534">正解 ✓</td><td style="padding:0.6rem 0.75rem;border:1px solid var(--border);background:#fef2f2;color:#991b1b;font-weight:700">第2種の過誤 β（見逃し）</td></tr>
    </tbody></table></div>`,
};

// 表・見出し・リスト・コールアウトを静的HTMLへ変換（旧stripMarkdownは表を丸ごと削除していたため新設）。
// App.tsx のクラス名（content-h2/content-table/callout-tip等）と揃え、CSSを共有する。
function mdToHtml(content: string): string {
  const lines = content.split('\n');
  const out: string[] = [];
  let i = 0;
  while (i < lines.length) {
    const t = lines[i].trim();
    const figKey = t.match(/^\[\[([a-z0-9-]+)\]\]$/);
    if (figKey && FIGURES[figKey[1]]) { out.push(FIGURES[figKey[1]]); i++; continue; }
    if (t === '' || /^\[\[.*?\]\]$/.test(t)) { i++; continue; }
    if (t.startsWith('|')) {
      const rows: string[] = [];
      while (i < lines.length && lines[i].trim().startsWith('|')) { rows.push(lines[i].trim()); i++; }
      const parsed = rows.map((r) => r.split('|').slice(1, -1).map((c) => c.trim()));
      const isSep = (r: string[]) => r.every((c) => /^[-:]+$/.test(c));
      if (parsed.length >= 2) {
        const [head, ...rest] = parsed;
        const body = rest.filter((r) => !isSep(r));
        const th = head.map((c) => `<th>${inlineHtml(c)}</th>`).join('');
        const trs = body.map((cells) => '<tr>' + cells.map((c) => `<td>${inlineHtml(c)}</td>`).join('') + '</tr>').join('');
        out.push(`<div class="content-table-wrap"><table class="content-table"><thead><tr>${th}</tr></thead><tbody>${trs}</tbody></table></div>`);
      }
      continue;
    }
    if (t.startsWith('#### ')) { out.push(`<h4 class="content-h4">${inlineHtml(t.slice(5))}</h4>`); i++; continue; }
    if (t.startsWith('### ')) { out.push(`<h3 class="content-h3">${inlineHtml(t.slice(4))}</h3>`); i++; continue; }
    if (t.startsWith('## ')) { out.push(`<h2 class="content-h2">${inlineHtml(t.slice(3))}</h2>`); i++; continue; }
    if (/^---+$/.test(t)) { out.push('<hr class="content-hr">'); i++; continue; }
    if (t.startsWith('💡 ')) { out.push(`<p class="content-p callout-tip">${inlineHtml(t.slice(2))}</p>`); i++; continue; }
    if (t.startsWith('🎯 ')) { out.push(`<p class="content-p callout-target">${inlineHtml(t.slice(2))}</p>`); i++; continue; }
    if (t.startsWith('⚠️ ')) { out.push(`<p class="content-p callout-warning">${inlineHtml(t.slice(3))}</p>`); i++; continue; }
    if (/^\d+\.\s/.test(t)) {
      const items: string[] = [];
      while (i < lines.length && /^\d+\.\s/.test(lines[i].trim())) { items.push(lines[i].trim().replace(/^\d+\.\s/, '')); i++; }
      out.push('<ol>' + items.map((it) => `<li>${inlineHtml(it)}</li>`).join('') + '</ol>');
      continue;
    }
    if (/^[-*]\s/.test(t)) {
      const items: string[] = [];
      while (i < lines.length && /^[-*]\s/.test(lines[i].trim())) { items.push(lines[i].trim().replace(/^[-*]\s/, '')); i++; }
      out.push('<ul>' + items.map((it) => `<li>${inlineHtml(it)}</li>`).join('') + '</ul>');
      continue;
    }
    out.push(`<p class="content-p">${inlineHtml(t)}</p>`); i++;
  }
  return out.join('\n');
}

console.log('--- Starting Static Site Generation (SSG) Pre-rendering ---');

if (!fs.existsSync(INDEX_HTML_PATH)) {
  console.error('Error: dist/index.html not found. Run "npm run build" first.');
  process.exit(1);
}

const templateHtml = fs.readFileSync(INDEX_HTML_PATH, 'utf-8');

// ── ルートindex.htmlに静的コンテンツを注入 ──────────
const moduleListHtml = modules.map(m =>
  `<li style="margin-bottom:12px"><a href="${BASE}/${m.id}/" style="color:#2563eb;font-weight:600;text-decoration:none">${m.title}</a><br><span style="color:#555;font-size:0.9rem">${m.description}</span></li>`
).join('\n');

const rootStaticContent = buildRootStaticContent(BASE, moduleListHtml);

// robots meta タグを全ページに追加 (E2)
const robotsMeta = '<meta name="robots" content="index, follow" />';

let rootIndexHtml = templateHtml
  .replace('</head>', `${robotsMeta}\n  </head>`)
  .replace('<div id="root"></div>', `<div id="root">${rootStaticContent}</div>`);
const homeJsonLd = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  'name': '統計検定 準1級 学習リファレンス',
  'url': `${BASE_URL}/`,
  'description': '確率分布・推測統計・多変量解析・ベイズ統計をインタラクティブな図と数式で解説する統計検定準1級対策サイト。',
  'inLanguage': 'ja'
});
rootIndexHtml = rootIndexHtml.replace('</head>', `<script type="application/ld+json">${homeJsonLd}</script>\n  </head>`);
fs.writeFileSync(INDEX_HTML_PATH, rootIndexHtml);

const subDirTemplateHtml = templateHtml
  .replace(/href="\.\/assets\//g, 'href="../assets/')
  .replace(/src="\.\/assets\//g, 'src="../assets/')
  .replace(/href="\.\/favicon.svg"/g, 'href="../favicon.svg"')
  .replace(/href="\.\/icons.svg"/g, 'href="../icons.svg"')
  .replace('</head>', `${robotsMeta}\n  </head>`);  // E2

let generatedCount = 0;

// ── モジュールページ ─────────────────────────────────
for (let i = 0; i < modules.length; i++) {
  const mod = modules[i];
  const modDir = path.join(DIST_DIR, mod.id);
  if (!fs.existsSync(modDir)) {
    fs.mkdirSync(modDir, { recursive: true });
  }

  // A2: sections コンテンツも含めた本文
  const sectionsHtml = (mod.sections ?? []).map(s => `<h2 class="content-h2">${escHtml(s.title)}</h2>${mdToHtml(s.content)}`).join('\n');
  const seoText = mdToHtml(mod.content) + sectionsHtml;

  const pageUrl = `${BASE_URL}/${mod.id}/`;
  const pageTitle = `${mod.title} | 統計検定 準1級 学習リファレンス`;

  // クイズQ&Aスニペット（最初の3問）
  const quizSnippet = mod.quiz.slice(0, 3).map((q, qi) => {
    const correctAnswer = q.options[q.correctAnswer];
    return `<div style="margin-bottom:12px;padding:12px;background:#f8fafc;border-radius:6px;border-left:3px solid #2563eb">
  <p style="margin:0 0 6px;font-weight:600;color:#1e3a5f">Q${qi + 1}. ${q.question.replace(/\$[^$]+\$/g, '').replace(/\*\*(.*?)\*\*/g, '$1')}</p>
  <p style="margin:0;color:#444;font-size:0.92rem">A. ${correctAnswer.replace(/\$[^$]+\$/g, '').replace(/\*\*(.*?)\*\*/g, '$1')}</p>
</div>`;
  }).join('\n');

  const quizSnippetHtml = `<section style="margin-top:28px">
  <h2 style="font-size:1.1rem;font-weight:700;margin-bottom:12px;color:#1e3a5f">確認クイズ（抜粋）</h2>
  ${quizSnippet}
  <p style="margin-top:12px;font-size:0.9rem;color:#555">全10問のクイズはサイトのインタラクティブ版でお試しください。</p>
</section>`;

  // 前後モジュールリンク
  const prevMod = i > 0 ? modules[i - 1] : null;
  const nextMod = i < modules.length - 1 ? modules[i + 1] : null;
  const prevLink = prevMod
    ? `<a href="${BASE}/${prevMod.id}/" style="color:#2563eb;text-decoration:none">← ${prevMod.title}</a>`
    : '';
  const nextLink = nextMod
    ? `<a href="${BASE}/${nextMod.id}/" style="color:#2563eb;text-decoration:none">${nextMod.title} →</a>`
    : '';

  // C1: 同章の他モジュールリンク
  const chapterMods = modules.filter(m => m.chapter === mod.chapter && m.id !== mod.id);
  const relatedHtml = chapterMods.length > 0 ? `<section style="margin-top:28px;padding:16px;background:#f8fafc;border-radius:8px">
  <h2 style="font-size:1.05rem;font-weight:700;margin:0 0 10px;color:#1e3a5f">第${mod.chapter}章の他のモジュール</h2>
  <ul style="list-style:none;padding:0;margin:0;display:flex;flex-wrap:wrap;gap:8px">
    ${chapterMods.map(m => `<li><a href="${BASE}/${m.id}/" style="color:#2563eb;text-decoration:none;font-size:0.9rem;background:#fff;border:1px solid #dbeafe;border-radius:4px;padding:3px 10px;display:inline-block">${m.title}</a></li>`).join('\n    ')}
  </ul>
</section>` : '';

  const seoContentHtml = buildModuleSeoHtml(BASE, mod.title, mod.description, seoText, quizSnippetHtml + relatedHtml, prevLink, nextLink);

  let modHtml = subDirTemplateHtml
    .replace('<title>統計検定 準1級 学習リファレンス</title>', `<title>${pageTitle}</title>`)
    .replace('<meta name="description" content="統計検定準1級の合格を目指す学習リファレンス。確率分布・推測統計・多変量解析・ベイズ統計をインタラクティブな図と数式で解説。" />', `<meta name="description" content="${mod.description}" />`)
    .replace('<meta property="og:title" content="統計検定 準1級 学習リファレンス" />', `<meta property="og:title" content="${pageTitle}" />`)
    .replace('<meta property="og:description" content="確率分布・推測統計・多変量解析・ベイズ統計をインタラクティブな図と数式で解説する準1級対策サイト。" />', `<meta property="og:description" content="${mod.description}" />`)
    .replace('<meta property="og:url" content="https://study-apps.com/stats-pre1/" />', `<meta property="og:url" content="${pageUrl}" />`)
    .replace('<link rel="canonical" href="https://study-apps.com/stats-pre1/" />', `<link rel="canonical" href="${pageUrl}" />`)
    .replace('<meta name="twitter:title" content="統計検定 準1級 学習リファレンス" />', `<meta name="twitter:title" content="${pageTitle}" />`)
    .replace('<meta name="twitter:description" content="統計検定準1級の合格を目指す学習リファレンス。確率分布・推測統計・多変量解析・ベイズ統計をインタラクティブな図と数式でわかりやすく解説。" />', `<meta name="twitter:description" content="${mod.description}" />`);

  modHtml = modHtml.replace('<div id="root"></div>', `<div id="root">${seoContentHtml}</div>`);

  // B1: BreadcrumbList + Article + FAQPage JSON-LD
  const faqItems = mod.quiz.slice(0, 3).map(q => ({
    '@type': 'Question',
    'name': q.question.replace(/\$[^$]+\$/g, '').replace(/\*\*(.*?)\*\*/g, '').trim(),
    'acceptedAnswer': {
      '@type': 'Answer',
      'text': q.options[q.correctAnswer].replace(/\$[^$]+\$/g, '').replace(/\*\*(.*?)\*\*/g, '').trim()
    }
  }));

  const modJsonLd = JSON.stringify([
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      'itemListElement': [
        { '@type': 'ListItem', 'position': 1, 'name': 'ホーム', 'item': `${BASE_URL}/` },
        { '@type': 'ListItem', 'position': 2, 'name': `第${mod.chapter}章`, 'item': `${BASE_URL}/` },
        { '@type': 'ListItem', 'position': 3, 'name': mod.title, 'item': pageUrl }
      ]
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Article',
      'headline': mod.title,
      'description': mod.description,
      'url': pageUrl,
      'inLanguage': 'ja',
      'author': { '@type': 'Organization', 'name': 'study-apps.com', 'url': 'https://study-apps.com' },
      'publisher': { '@type': 'Organization', 'name': 'study-apps.com', 'url': 'https://study-apps.com' }
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      'mainEntity': faqItems
    }
  ]);
  modHtml = modHtml.replace('</head>', `<script type="application/ld+json">${modJsonLd}</script>\n  </head>`);

  fs.writeFileSync(path.join(modDir, 'index.html'), modHtml);
  generatedCount++;
}

// ── 用語集（全件）──────────────────────────────────
const glossaryTerms = Object.values(glossary);
const glossaryTermsHtml = glossaryTerms.map((t: { term: string; level: string; explanation: string }) =>
  `<div style="margin-bottom:16px;padding-bottom:16px;border-bottom:1px solid #eee">
    <strong style="font-size:1rem;color:#1e3a5f">${t.term}</strong>
    <span style="display:inline-block;font-size:0.75rem;color:#fff;background:${t.level === '基礎' ? '#16a34a' : t.level === '中級' ? '#2563eb' : '#9333ea'};padding:1px 6px;border-radius:4px;margin-left:8px">${t.level}</span>
    <p style="margin:6px 0 0;color:#444;line-height:1.6">${t.explanation.replace(/\$[^$]+\$/g, '').replace(/\*\*(.*?)\*\*/g, '$1')}</p>
  </div>`
).join('\n');

// B2: 用語集FAQPage JSON-LD（先頭20件）
const glossaryFaqItems = glossaryTerms.slice(0, 20).map(t => ({
  '@type': 'Question',
  'name': `${t.term}とは何ですか？`,
  'acceptedAnswer': {
    '@type': 'Answer',
    'text': t.explanation.replace(/\$[^$]+\$/g, '').replace(/\*\*(.*?)\*\*/g, '$1')
  }
}));

// A3: randomquiz 静的コンテンツ
const randomQuizSampleHtml = `<div style="background:#eff6ff;border-bottom:1px solid #bfdbfe;padding:10px 16px;font-size:0.88rem;text-align:center;margin-bottom:16px;border-radius:6px;max-width:860px;margin-left:auto;margin-right:auto"><a href="https://study-apps.com/" style="color:#1e3a8a;text-decoration:none;font-weight:600">← study-apps.com 学習サイト集トップへ</a></div><article id="static-fallback" style="font-family:sans-serif;line-height:1.7;max-width:860px;margin:0 auto;padding:24px 16px">
  <nav style="margin-bottom:16px"><a href="${BASE}/" style="color:#2563eb;text-decoration:none">← ホームへ戻る</a></nav>
  <h1 style="font-size:1.6rem;font-weight:700;border-bottom:2px solid #2563eb;padding-bottom:8px;margin-bottom:20px">全範囲ランダムクイズ</h1>
  <p style="color:#555;margin-bottom:20px">統計検定準1級の全36モジュール（360問）からランダムに出題するクイズです。確率論・推測統計・多変量解析・ベイズ統計・時系列分析など全範囲を横断的に復習できます。</p>
  <section style="background:#f0f7ff;padding:16px;border-radius:8px;margin-bottom:24px">
    <h2 style="font-size:1.1rem;font-weight:700;margin:0 0 10px">このクイズの特徴</h2>
    <ul style="color:#444;padding-left:20px;margin:0;line-height:2">
      <li>全36モジュール・360問からランダム出題</li>
      <li>各問題に詳しい解説付き</li>
      <li>どのモジュールの問題かが表示されるので復習しやすい</li>
      <li>スコアは自動集計（セッション内）</li>
    </ul>
  </section>
  <p style="color:#444">クイズを開始するには、JavaScriptを有効にしてこのページにアクセスしてください。</p>
  <h2 style="font-size:1.2rem;font-weight:700;margin:24px 0 12px">対象モジュール一覧</h2>
  <ul style="list-style:none;padding:0">
    ${modules.map(m => `<li style="margin-bottom:6px"><a href="${BASE}/${m.id}/" style="color:#2563eb;text-decoration:none;font-size:0.95rem">${m.title}</a></li>`).join('\n    ')}
  </ul>
  <p style="margin-top:24px"><a href="${BASE}/" style="color:#2563eb">← ホームへ戻る</a></p>
</article>`;

const staticPageContents: Record<string, { title: string; description: string; bodyHtml: string; jsonLd?: object }> = {
  glossary: {
    title: '用語集',
    description: '統計検定準1級の頻出用語を一覧で解説。確率分布・推測統計・多変量解析・ベイズ統計・時系列分析など試験に出る統計用語を網羅。',
    bodyHtml: `<div style="background:#eff6ff;border-bottom:1px solid #bfdbfe;padding:10px 16px;font-size:0.88rem;text-align:center;margin-bottom:16px;border-radius:6px;max-width:860px;margin-left:auto;margin-right:auto"><a href="https://study-apps.com/" style="color:#1e3a8a;text-decoration:none;font-weight:600">← study-apps.com 学習サイト集トップへ</a></div><article id="static-fallback" style="font-family:sans-serif;line-height:1.7;max-width:860px;margin:0 auto;padding:24px 16px">
  <nav style="margin-bottom:16px"><a href="${BASE}/" style="color:#2563eb;text-decoration:none">← ホームへ戻る</a></nav>
  <h1 style="font-size:1.6rem;font-weight:700;border-bottom:2px solid #2563eb;padding-bottom:8px;margin-bottom:20px">用語集</h1>
  <p style="color:#555;margin-bottom:24px">統計検定準1級の頻出用語を一覧で解説します。全${glossaryTerms.length}用語を難易度別に表示しています。</p>
${glossaryTermsHtml}
</article>`,
    jsonLd: { '@context': 'https://schema.org', '@type': 'FAQPage', 'mainEntity': glossaryFaqItems }
  },
  cheatsheet: {
    title: '公式集',
    description: '統計検定準1級の重要公式を一覧にまとめました。確率分布・推定・検定・回帰分析・主成分分析・ベイズ統計の公式をすばやく確認できます。',
    bodyHtml: buildCheatsheetHtml(BASE)
  },
  guide: {
    title: '試験ガイド',
    description: '統計検定準1級の試験概要・出題範囲・学習の進め方を解説。合格基準・試験時間・推奨学習時間など受験に必要な情報をまとめました。',
    bodyHtml: buildGuideHtml(BASE)
  },
  usecase: {
    title: '検定・分布の使い分けガイド',
    description: 'どんなデータ・問いにどの確率分布／検定／多変量解析を使うかを状況から逆引きできる早見表。二項・ポアソン・正規分布、t検定・分散分析・χ²検定、重回帰・主成分分析などの選び方を整理。',
    bodyHtml: buildUsecaseHtml(BASE)
  },
  about: {
    title: 'サイトについて',
    description: '統計検定準1級 学習リファレンスについて。サイトの目的・コンテンツ構成・利用方法を説明します。',
    bodyHtml: buildAboutHtml(BASE)
  },
  faq: {
    title: 'よくある質問',
    description: '統計検定準1級の試験・学習についてよくある質問（FAQ）。難易度・出題範囲・学習時間・P値の意味・主成分分析の使い方など。',
    bodyHtml: buildFaqPageHtml(BASE)
  },
  randomquiz: {
    title: '全範囲ランダムクイズ',
    description: '統計検定準1級の全36モジュール・360問からランダム出題するクイズ。確率論・推測統計・多変量解析・ベイズ統計・時系列分析を横断的に復習。',
    bodyHtml: randomQuizSampleHtml
  },
  privacy: {
    title: 'プライバシーポリシー',
    description: '統計検定準1級 学習リファレンスのプライバシーポリシー。個人情報の取り扱いについて説明します。',
    bodyHtml: `<div style="background:#eff6ff;border-bottom:1px solid #bfdbfe;padding:10px 16px;font-size:0.88rem;text-align:center;margin-bottom:16px;border-radius:6px;max-width:860px;margin-left:auto;margin-right:auto"><a href="https://study-apps.com/" style="color:#1e3a8a;text-decoration:none;font-weight:600">← study-apps.com 学習サイト集トップへ</a></div><article id="static-fallback" style="font-family:sans-serif;line-height:1.7;max-width:860px;margin:0 auto;padding:24px 16px">
  <nav style="margin-bottom:16px"><a href="${BASE}/" style="color:#2563eb;text-decoration:none">← ホームへ戻る</a></nav>
  <h1 style="font-size:1.6rem;font-weight:700;border-bottom:2px solid #2563eb;padding-bottom:8px;margin-bottom:8px">プライバシーポリシー</h1>
  <p style="color:#888;font-size:0.9rem;margin-bottom:24px">最終更新：2025年4月</p>
  <section style="margin-bottom:20px">
    <h2 style="font-size:1.15rem;font-weight:700;margin-bottom:8px">1. サイトについて</h2>
    <p style="color:#444">本サイトは、統計検定準1級の学習を支援することを目的とした個人運営のサイトです。</p>
  </section>
  <section style="margin-bottom:20px">
    <h2 style="font-size:1.15rem;font-weight:700;margin-bottom:8px">2. Google Analytics の利用</h2>
    <p style="color:#444">アクセス分析のためにGoogle Analyticsを使用しています。個人を特定する情報は収集しません。</p>
  </section>
  <section style="margin-bottom:20px">
    <h2 style="font-size:1.15rem;font-weight:700;margin-bottom:8px">3. Google AdSense の利用</h2>
    <p style="color:#444">広告配信のためにGoogle AdSenseを使用しています。<a href="https://www.google.com/settings/ads" style="color:#2563eb">広告設定ページ</a>でパーソナライズ広告を無効にできます。</p>
  </section>
  <section style="margin-bottom:20px">
    <h2 style="font-size:1.15rem;font-weight:700;margin-bottom:8px">4. 学習進捗データ</h2>
    <p style="color:#444">クイズの得点・完了状況はブラウザのローカルストレージにのみ保存され、外部サーバーへの送信はありません。</p>
  </section>
  <section>
    <h2 style="font-size:1.15rem;font-weight:700;margin-bottom:8px">5. 免責事項</h2>
    <p style="color:#444">本サイトの解説・問題・公式は学習目的で作成されており、内容の正確性を保証するものではありません。</p>
  </section>
  <p style="margin-top:32px"><a href="${BASE}/" style="color:#2563eb">← ホームへ戻る</a></p>
</article>`
  }
};

const staticPageNames = Object.keys(staticPageContents);

for (const [page, config] of Object.entries(staticPageContents)) {
  const pageDir = path.join(DIST_DIR, page);
  if (!fs.existsSync(pageDir)) {
    fs.mkdirSync(pageDir, { recursive: true });
  }

  const pageUrl = `${BASE_URL}/${page}/`;
  const pageTitle = `${config.title} | 統計検定 準1級 学習リファレンス`;

  let pageHtml = subDirTemplateHtml
    .replace('<title>統計検定 準1級 学習リファレンス</title>', `<title>${pageTitle}</title>`)
    .replace('<meta name="description" content="統計検定準1級の合格を目指す学習リファレンス。確率分布・推測統計・多変量解析・ベイズ統計をインタラクティブな図と数式で解説。" />', `<meta name="description" content="${config.description}" />`)
    .replace('<meta property="og:title" content="統計検定 準1級 学習リファレンス" />', `<meta property="og:title" content="${pageTitle}" />`)
    .replace('<meta property="og:description" content="確率分布・推測統計・多変量解析・ベイズ統計をインタラクティブな図と数式で解説する準1級対策サイト。" />', `<meta property="og:description" content="${config.description}" />`)
    .replace('<meta property="og:url" content="https://study-apps.com/stats-pre1/" />', `<meta property="og:url" content="${pageUrl}" />`)
    .replace('<link rel="canonical" href="https://study-apps.com/stats-pre1/" />', `<link rel="canonical" href="${pageUrl}" />`)
    .replace('<meta name="twitter:title" content="統計検定 準1級 学習リファレンス" />', `<meta name="twitter:title" content="${pageTitle}" />`)
    .replace('<meta name="twitter:description" content="統計検定準1級の合格を目指す学習リファレンス。確率分布・推測統計・多変量解析・ベイズ統計をインタラクティブな図と数式でわかりやすく解説。" />', `<meta name="twitter:description" content="${config.description}" />`);

  pageHtml = pageHtml.replace('<div id="root"></div>', `<div id="root">${config.bodyHtml}</div>`);

  // B2: glossary に FAQPage JSON-LD。個別指定が無いページも WebPage JSON-LD を既定で付与
  const pageJsonLd = config.jsonLd ?? {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: config.title,
    description: config.description,
    url: pageUrl,
    inLanguage: 'ja',
    isPartOf: { '@type': 'WebSite', name: '統計検定 準1級 学習リファレンス', url: `${BASE_URL}/` },
  };
  pageHtml = pageHtml.replace('</head>', `<script type="application/ld+json">${JSON.stringify(pageJsonLd)}</script>\n  </head>`);

  fs.writeFileSync(path.join(pageDir, 'index.html'), pageHtml);
  generatedCount++;
}

// ── sitemap.xml ──────────────────────────────────
const today = new Date().toISOString().split('T')[0];

const moduleUrls = modules.map(m =>
  `  <url>\n    <loc>${BASE_URL}/${m.id}/</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>0.8</priority>\n  </url>`
).join('\n');

const staticUrls = staticPageNames.map(p =>
  `  <url>\n    <loc>${BASE_URL}/${p}/</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>${p === 'faq' || p === 'cheatsheet' || p === 'guide' || p === 'usecase' ? '0.7' : '0.6'}</priority>\n  </url>`
).join('\n');

const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${BASE_URL}/</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
${moduleUrls}
${staticUrls}
</urlset>`;

fs.writeFileSync(path.join(DIST_DIR, 'sitemap.xml'), sitemapXml);

console.log(`✅ Generated ${generatedCount} static HTML files successfully!`);
console.log(`✅ Generated sitemap.xml with ${modules.length + staticPageNames.length + 1} URLs.`);

// ── OGP Image Generation ─────────────────────────
const ogpSvg = `<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
  <rect width="1200" height="630" fill="#f8fafc"/>
  <rect width="1200" height="12" fill="#0075de"/>
  <rect x="0" y="0" width="360" height="630" fill="#0075de" fill-opacity="0.05"/>
  <rect x="80" y="230" width="8" height="160" rx="4" fill="#0075de"/>
  <text x="112" y="300" font-family="Yu Gothic UI,Yu Gothic,Meiryo,Hiragino Sans,sans-serif" font-size="52" font-weight="700" fill="#0f172a">統計検定 準1級</text>
  <text x="112" y="368" font-family="Yu Gothic UI,Yu Gothic,Meiryo,Hiragino Sans,sans-serif" font-size="52" font-weight="700" fill="#0f172a">学習リファレンス</text>
  <text x="112" y="430" font-family="Yu Gothic UI,Yu Gothic,Meiryo,Hiragino Sans,sans-serif" font-size="26" fill="#64748b">確率分布・推測統計・多変量解析・ベイズ統計</text>
  <text x="1120" y="600" text-anchor="end" font-family="Arial,Helvetica,sans-serif" font-size="22" fill="#94a3b8">study-apps.com</text>
</svg>`;

const ogpBuffer = await sharp(Buffer.from(ogpSvg)).png().toBuffer();
fs.writeFileSync(path.join(DIST_DIR, 'ogp.png'), ogpBuffer);
console.log('✅ Generated ogp.png');
