// scripts/sort-modules.js
// modules.ts 内のモジュール配列をIDの昇順（数値順）に並び替える

import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { join, dirname } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const filePath = join(__dirname, '..', 'src', 'data', 'modules.ts');
const raw = readFileSync(filePath, 'utf8');

const startMarker = 'export const modules: Module[] = [';
const startIdx = raw.indexOf(startMarker) + startMarker.length;
// 配列の内容開始（最初の改行の後）
const bodyStart = raw.indexOf('\n', startIdx) + 1;
const endIdx = raw.lastIndexOf('\n];');

const header = raw.slice(0, bodyStart);
const footer = raw.slice(endIdx);
const body = raw.slice(bodyStart, endIdx);

// ネスト深さを追跡して各モジュールブロックを分割
function splitModules(body) {
  const modules = [];
  let depth = 0;
  let start = -1;
  let i = 0;

  while (i < body.length) {
    const ch = body[i];

    // テンプレートリテラルをスキップ
    if (ch === '`') {
      i++;
      while (i < body.length) {
        if (body[i] === '\\') { i += 2; continue; }
        if (body[i] === '`') { i++; break; }
        i++;
      }
      continue;
    }

    // 文字列リテラルをスキップ
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
        // trailing comma を含める
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

const blocks = splitModules(body);

function extractId(block) {
  const m = block.match(/^\s*\{\s*\n\s*id:\s*'([^']+)'/);
  return m ? m[1] : '';
}

// '1.10-testing-adv' → version部分 '1.10' を抽出してから数値パース
function parseVersionKey(id) {
  // IDのバージョン部分（ダッシュより前）を取り出す
  const versionPart = id.split('-')[0]; // e.g. '1.10', '1.11a', '2.1'
  const segments = versionPart.split('.');
  return segments.map(seg => {
    const m = seg.match(/^(\d+)([a-z]*)$/);
    if (m) return [parseInt(m[1], 10), m[2] || ''];
    return [0, seg];
  });
}

function compareIds(a, b) {
  const pa = parseVersionKey(a);
  const pb = parseVersionKey(b);
  const len = Math.max(pa.length, pb.length);
  for (let i = 0; i < len; i++) {
    const [na, sa] = pa[i] || [0, ''];
    const [nb, sb] = pb[i] || [0, ''];
    if (na !== nb) return na - nb;
    if (sa < sb) return -1;
    if (sa > sb) return 1;
  }
  return 0;
}

const idsBefore = blocks.map(extractId);
blocks.sort((a, b) => compareIds(extractId(a), extractId(b)));
const idsAfter = blocks.map(extractId);

console.log('並び替え後のID順:');
idsAfter.forEach(id => console.log(' ', id));

const changedCount = idsBefore.filter((id, i) => id !== idsAfter[i]).length;
console.log(`\n変更されたモジュール数: ${changedCount}`);

const newBody = blocks.map(b => '  ' + b.trimStart()).join(',\n') + '\n';
const result = header + newBody + footer;

writeFileSync(filePath, result, 'utf8');
console.log('✅ modules.ts を並び替えました');
