// scripts/reorder-modules.js
// modules配列を教育的順序（ID番号順ではなく学習順序）に並び替える

import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { join, dirname } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const filePath = join(__dirname, '..', 'src', 'data', 'modules.ts');
const raw = readFileSync(filePath, 'utf8');

const startMarker = 'export const modules: Module[] = [';
const startIdx = raw.indexOf(startMarker) + startMarker.length;
const bodyStart = raw.indexOf('\n', startIdx) + 1;
const endIdx = raw.lastIndexOf('\n];');

const header = raw.slice(0, bodyStart);
const footer = raw.slice(endIdx);
const body = raw.slice(bodyStart, endIdx);

function splitModules(body) {
  const modules = [];
  let depth = 0;
  let start = -1;
  let i = 0;

  while (i < body.length) {
    const ch = body[i];

    if (ch === '`') {
      i++;
      while (i < body.length) {
        if (body[i] === '\\') { i += 2; continue; }
        if (body[i] === '`') { i++; break; }
        i++;
      }
      continue;
    }

    if (ch === '"' || ch === "'") {
      const quote = ch;
      i++;
      while (i < body.length) {
        if (body[i] === '\\') { i += 2; continue; }
        if (body[i] === quote) { i++; break; }
        i++;
      }
      continue;
    }

    if (ch === '{') {
      if (depth === 0) start = i;
      depth++;
    } else if (ch === '}') {
      depth--;
      if (depth === 0 && start !== -1) {
        let end = i + 1;
        while (end < body.length && body[end] === ',') end++;
        const block = body.slice(start, end).trimEnd();
        if (block.length > 10) modules.push(block);
        start = -1;
      }
    }
    i++;
  }
  return modules;
}

function extractId(block) {
  const m = block.match(/^\s*\{[\s\S]{0,10}id:\s*'([^']+)'/);
  return m ? m[1] : '';
}

const blocks = splitModules(body);
const byId = {};
for (const b of blocks) {
  byId[extractId(b)] = b;
}

// 教育的順序（学習の流れに沿った並び）
const pedagogicalOrder = [
  // Chapter 1: 確率論の基礎から推測統計へ
  '1.5-probability',        // 確率の公理・包除原理
  '1.5a-conditional',       // 条件付き確率・統計的独立
  '1.5b-total-prob',        // 全確率の定理・ベイズの定理
  '1.6a-dist-basics',       // 確率分布の基礎（確率関数・密度関数・CDF）
  '1.6b-dist-features',     // 分布の特性値（期待値・分散・モーメント）
  '1.7a-binomial',          // 二項分布・超幾何分布・幾何分布
  '1.7b-poisson',           // ポアソン分布・負の二項分布
  '1.8a-basic-continuous',  // 連続分布（指数・ガンマ・ベータ）
  '1.8b-multivariate',      // 多変量正規分布・変数変換
  '1.1a-normal-dist',       // 正規分布の性質（PDF・歪度・尖度・MGF）
  '1.1b-lln-clt',           // 大数の法則・中心極限定理
  '1.2-sampling',           // 標本分布（t・chi2・F分布）
  '1.2b-sufficient-stats',  // 十分統計量・順序統計量
  '1.9-estimation',         // 推定法（最尤・モーメント法）
  '1.9c-estimator-props',   // 推定量の性質（不偏性・有効性・CR不等式）
  '1.9b-ci',                // 信頼区間（1標本）
  '1.9d-ci-advanced',       // 信頼区間（2標本・発展）
  '1.4-inference',          // 検定の基礎（P値・検出力・サンプルサイズ）
  '1.10-testing-adv',       // 検定の理論（NP定理・尤度比）
  '1.10b-testing-applied',  // 検定の実践（正規・適合度・ノンパラ）
  '1.3-anova',              // 分散分析（一元・二元配置）
  '1.11a-asymptotic',       // 漸近理論（MLE・フィッシャー情報量・デルタ法）
  '1.11b-model-selection',  // モデル選択・AIC・クロスバリデーション

  // Chapter 2: 多変量解析
  '2.1-regression',
  '2.2-pca',
  '2.3-discriminant',
  '2.4-factor',
  '2.5-clustering',
  '2.6-glm',
  '2.7-multivariate',

  // Chapter 3: 発展的トピック
  '3.1-bayes',
  '3.2-timeseries',
  '3.3-markov',
  '3.4-contingency',
  '3.5-survival',
  '3.6-simulation',
];

const orderedBlocks = [];
for (const id of pedagogicalOrder) {
  if (byId[id]) {
    orderedBlocks.push(byId[id]);
  } else {
    console.warn(`⚠️  ID '${id}' が見つかりません`);
  }
}

// 順序リストに含まれていないモジュールを末尾に追加
for (const [id, block] of Object.entries(byId)) {
  if (!pedagogicalOrder.includes(id)) {
    console.warn(`⚠️  順序未定義のモジュール: '${id}' → 末尾に追加`);
    orderedBlocks.push(block);
  }
}

console.log('並び替え後の順序:');
orderedBlocks.forEach(b => console.log(' ', extractId(b)));

const newBody = orderedBlocks.map(b => '  ' + b.trimStart()).join(',\n') + '\n';
const result = header + newBody + footer;

writeFileSync(filePath, result, 'utf8');
console.log('\n✅ modules.ts を教育的順序に並び替えました');
