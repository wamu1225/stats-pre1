// Deeper scan: find rendering issues in modules
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const file = path.join(__dirname, '..', 'src', 'data', 'modules.ts');
const c = fs.readFileSync(file, 'utf8');

// Strip \r to handle CRLF
const cAll = fs.readFileSync(file, 'utf8').replace(/\r/g, '');
// Match only module-level entries (with chapter field — quiz items don't have chapter)
const moduleRegex = /\{id:`(\d+\.\d+[^`]*)`,title:`[^`]*`,chapter:\d+,[\s\S]*?content:`([\s\S]*?)`,(?:keyFormulas|quiz):/g;
const issues = {};
let m;
while ((m = moduleRegex.exec(cAll)) !== null) {
  const id = m[1];
  if (!/^\d+\.\d+/.test(id)) continue;
  const content = m[2];
  const found = [];
  const lines = content.split('\n');

  // 1. Block math ($$) inside a single line WITH other content (should be on own line)
  lines.forEach((line, i) => {
    const t = line.trim();
    if (/\$\$[\s\S]+\$\$/.test(t) && !/^\$\$[\s\S]*\$\$$/.test(t)) {
      found.push(`L${i+1}: $$...$$ with non-math content on same line`);
    }
  });

  // 2. Tables with rows that have varying cell count
  let tableStart = -1;
  let expectedCells = -1;
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line.trim().startsWith('|') && line.trim().endsWith('|')) {
      const cells = line.trim().split('|').slice(1, -1);
      if (tableStart < 0) {
        tableStart = i;
        expectedCells = cells.length;
      } else if (cells.length !== expectedCells && !/^[-:\s|]+$/.test(line.trim())) {
        found.push(`L${i+1}: table row has ${cells.length} cells, expected ${expectedCells} (from L${tableStart+1})`);
      }
    } else if (line.trim() === '' || !line.trim().startsWith('|')) {
      tableStart = -1;
      expectedCells = -1;
    }
  }

  // 3. Tables not preceded by blank line (may bleed into prior paragraph)
  for (let i = 1; i < lines.length; i++) {
    if (lines[i].trim().startsWith('|') && lines[i-1].trim() !== '' && !lines[i-1].trim().startsWith('|') && !lines[i-1].trim().startsWith('#')) {
      found.push(`L${i+1}: table not preceded by blank line (prev: "${lines[i-1].substring(0, 50)}")`);
    }
  }

  // 4. Bare backslash followed by non-double-backslash command (already validated, but double-check)
  // Skip — validator covers it

  // 5. Bullet list items separated by blank lines (treated as separate lists)
  let lastBullet = -1;
  for (let i = 0; i < lines.length; i++) {
    if (/^\s*-\s/.test(lines[i])) {
      if (lastBullet >= 0 && i - lastBullet > 1) {
        // Check if all lines between were blank
        let blankBetween = true;
        for (let j = lastBullet + 1; j < i; j++) {
          if (lines[j].trim() !== '') { blankBetween = false; break; }
        }
        if (blankBetween && i - lastBullet === 2) {
          found.push(`L${i+1}: bullet items separated by blank line (will become separate lists)`);
        }
      }
      lastBullet = i;
    } else if (lines[i].trim() !== '' && !/^\s*-\s/.test(lines[i])) {
      lastBullet = -1;
    }
  }

  // 6. Tables with pipes inside KaTeX math (would mis-split cells)
  let inTable = false;
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line.trim().startsWith('|')) {
      inTable = true;
      // Find math ranges
      const ranges = [];
      let mathStart = -1;
      for (let j = 0; j < line.length; j++) {
        if (line[j] === '$' && line[j-1] !== '\\') {
          if (mathStart < 0) mathStart = j;
          else { ranges.push([mathStart, j]); mathStart = -1; }
        }
      }
      for (let j = 0; j < line.length; j++) {
        if (line[j] === '|') {
          for (const [s, e] of ranges) {
            if (j > s && j < e) {
              found.push(`L${i+1}: PIPE inside math in table cell — will mis-split: ${line.substring(0, 80)}`);
              break;
            }
          }
        }
      }
    } else if (line.trim() === '') {
      // OK
    } else {
      inTable = false;
    }
  }

  // 7. Numbered list with sub-items (indented numbered)
  const nestedNums = lines.filter(l => /^\s{2,}\d+\./.test(l));
  if (nestedNums.length) found.push(`${nestedNums.length} nested numbered lists — not rendered properly`);

  // 8. Bullet list items with content spanning multiple lines (without explicit continuation)
  // Parser only takes the first line after "- ", so multi-line content is broken
  for (let i = 0; i < lines.length - 1; i++) {
    if (/^\s*-\s/.test(lines[i]) && lines[i+1].trim() !== '' && !lines[i+1].trim().startsWith('-') && !lines[i+1].trim().startsWith('|') && !lines[i+1].trim().startsWith('#') && !/^\d+\./.test(lines[i+1].trim()) && lines[i+1].startsWith('  ')) {
      found.push(`L${i+1}: bullet with continuation line — second line lost`);
    }
  }

  if (found.length) issues[id] = found;
}

const ids = Object.keys(issues);
if (ids.length === 0) console.log('No issues found.');
else {
  console.log(`Issues in ${ids.length} modules:\n`);
  for (const id of ids) {
    console.log(`### ${id}`);
    for (const issue of issues[id]) console.log(`  - ${issue}`);
    console.log();
  }
}
