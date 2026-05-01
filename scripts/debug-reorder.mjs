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

function extractId(block) {
  const m = block.match(/^\s*\{[\s\S]{0,10}id:\s*'([^']+)'/);
  return m ? m[1] : '(NO ID)';
}

const blocks = splitModules(body);
console.log('Total blocks found:', blocks.length);
blocks.forEach((b, idx) => {
  const id = extractId(b);
  console.log(idx + ': ' + id + ' (' + b.length + ' chars)');
});
