// scripts/renumber-ids.mjs
// モジュールIDを教育的順序に基づいて振り直す

import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { join, dirname } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));

const idMap = {
  '1.5-probability':       '1.1-probability',
  '1.5a-conditional':      '1.2-conditional',
  '1.5b-total-prob':       '1.3-total-prob',
  '1.6a-dist-basics':      '1.4-dist-basics',
  '1.6b-dist-features':    '1.5-dist-features',
  '1.7a-binomial':         '1.6-binomial',
  '1.7b-poisson':          '1.7-poisson',
  '1.8a-basic-continuous': '1.8-continuous',
  '1.8b-multivariate':     '1.9-multivariate',
  '1.1a-normal-dist':      '1.10-normal-dist',
  '1.1b-lln-clt':          '1.11-lln-clt',
  '1.2-sampling':          '1.12-sampling',
  '1.2b-sufficient-stats': '1.13-sufficient-stats',
  '1.9-estimation':        '1.14-estimation',
  '1.9c-estimator-props':  '1.15-estimator-props',
  '1.9b-ci':               '1.16-ci',
  '1.9d-ci-advanced':      '1.17-ci-advanced',
  '1.4-inference':         '1.18-inference',
  '1.10-testing-adv':      '1.19-testing-adv',
  '1.10b-testing-applied': '1.20-testing-applied',
  '1.3-anova':             '1.21-anova',
  '1.11a-asymptotic':      '1.22-asymptotic',
  '1.11b-model-selection': '1.23-model-selection',
  // ch2, ch3 はそのまま
};

// 全IDをキーと値の両方を含む置換パターンとして処理
// 長いIDから先に置換（短いIDが先にマッチするのを防ぐ）
const sortedOld = Object.keys(idMap).sort((a, b) => b.length - a.length);

function replaceIds(content) {
  let result = content;
  for (const oldId of sortedOld) {
    const newId = idMap[oldId];
    // IDは必ず引用符に囲まれている
    result = result.replaceAll(`'${oldId}'`, `'${newId}'`);
    result = result.replaceAll(`"${oldId}"`, `"${newId}"`);
  }
  return result;
}

// modules.ts を更新
const modulesPath = join(__dirname, '..', 'src', 'data', 'modules.ts');
const modulesRaw = readFileSync(modulesPath, 'utf8');
const modulesNew = replaceIds(modulesRaw);
writeFileSync(modulesPath, modulesNew, 'utf8');
console.log('✅ src/data/modules.ts を更新');

// DistributionSelector.tsx を更新
const selectorPath = join(__dirname, '..', 'src', 'components', 'DistributionSelector.tsx');
const selectorRaw = readFileSync(selectorPath, 'utf8');
const selectorNew = replaceIds(selectorRaw);
writeFileSync(selectorPath, selectorNew, 'utf8');
console.log('✅ src/components/DistributionSelector.tsx を更新');

// App.tsx など他ファイルにIDがハードコードされていないか確認
const otherFiles = [
  join(__dirname, '..', 'src', 'App.tsx'),
  join(__dirname, '..', 'src', 'components', 'Quiz.tsx'),
];
for (const fp of otherFiles) {
  const raw = readFileSync(fp, 'utf8');
  const updated = replaceIds(raw);
  if (updated !== raw) {
    writeFileSync(fp, updated, 'utf8');
    console.log(`✅ ${fp} を更新`);
  }
}

// 変換後の確認
console.log('\n変換マップ:');
for (const [oldId, newId] of Object.entries(idMap)) {
  console.log(`  ${oldId} → ${newId}`);
}
console.log('\n✅ ID振り直し完了');
