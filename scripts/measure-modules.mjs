import { readFileSync } from 'fs';
const raw = readFileSync('src/data/modules.ts', 'utf8');

const startMarker = 'export const modules: Module[] = [';
const startIdx = raw.indexOf(startMarker) + startMarker.length;
const bodyStart = raw.indexOf('\n', startIdx) + 1;
const endIdx = raw.lastIndexOf('\n];');
const body = raw.slice(bodyStart, endIdx);

function splitModules(body) {
  const modules = [];
  let depth = 0, start = -1, i = 0;
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
      const q = ch; i++;
      while (i < body.length) {
        if (body[i] === '\\') { i += 2; continue; }
        if (body[i] === q) { i++; break; }
        i++;
      }
      continue;
    }
    if (ch === '{') { if (depth === 0) start = i; depth++; }
    else if (ch === '}') {
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

const blocks = splitModules(body);
const results = blocks.map(b => {
  const idMatch = b.match(/^\s*\{\s*\n\s*id:\s*'([^']+)'/);
  const id = idMatch ? idMatch[1] : '?';
  const chars = b.length;
  const sectionsStart = b.indexOf('sections: [');
  let sectionCount = 0;
  if (sectionsStart !== -1) {
    sectionCount = (b.slice(sectionsStart).match(/title:\s*'/g) || []).length;
  }
  const quizCount = (b.match(/question:\s*`/g) || []).length;
  return { id, chars, sectionCount, quizCount };
});

// Keep pedagogical order (don't sort by size)
console.log('ID                        | 文字数  | § | Q | 判定');
console.log('---------------------------|---------|---|---|------');
results.forEach(r => {
  const flag = r.chars > 9000 ? '🔴 要分割' : r.chars > 6000 ? '🟡 長い' : '✅';
  console.log(r.id.padEnd(27) + '| ' + String(r.chars).padStart(6) + '  | ' + r.sectionCount + ' | ' + r.quizCount + ' | ' + flag);
});
console.log('\n🔴 = 9000字超（強く要分割）、🟡 = 6000字超（検討対象）');
