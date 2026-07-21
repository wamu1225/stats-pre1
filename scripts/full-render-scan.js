// Comprehensive scan for rendering issues across all modules
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const file = path.join(__dirname, '..', 'src', 'data', 'modules.ts');
const cAll = fs.readFileSync(file, 'utf8').replace(/\r/g, '');
const moduleRegex = /\{id:`(\d+\.\d+[^`]*)`,title:`[^`]*`,chapter:\d+,[\s\S]*?content:`([\s\S]*?)`,(?:keyFormulas|quiz):/g;

const allIssues = {};
let m;
while ((m = moduleRegex.exec(cAll)) !== null) {
  const id = m[1];
  const content = m[2];
  const lines = content.split('\n');
  const issues = [];

  // Issue 1: bullet list broken by blank line
  for (let i = 0; i < lines.length - 2; i++) {
    const a = lines[i].trim();
    const b = lines[i+1].trim();
    const next = i + 2 < lines.length ? lines[i+2].trim() : '';
    if (/^-\s/.test(a) && b === '' && /^-\s/.test(next)) {
      issues.push(`L${i+1}-${i+3}: bullet list broken by blank line`);
    }
  }

  // Issue 2: numbered list broken by blank line
  for (let i = 0; i < lines.length - 2; i++) {
    const a = lines[i].trim();
    const b = lines[i+1].trim();
    const next = i + 2 < lines.length ? lines[i+2].trim() : '';
    if (/^\d+\.\s/.test(a) && b === '' && /^\d+\.\s/.test(next)) {
      issues.push(`L${i+1}-${i+3}: numbered list broken by blank line`);
    }
  }

  // Issue 3: Table without blank line before
  for (let i = 1; i < lines.length; i++) {
    if (lines[i].trim().startsWith('|') && i > 0) {
      const prev = lines[i-1].trim();
      if (prev !== '' && !prev.startsWith('|') && !prev.startsWith('#')) {
        issues.push(`L${i+1}: table without blank line before (prev: "${prev.substring(0, 50)}...")`);
      }
    }
  }

  // Issue 4: Heading without blank line before
  for (let i = 1; i < lines.length; i++) {
    if (/^#{1,4}\s/.test(lines[i].trim()) && lines[i-1].trim() !== '' && !lines[i-1].trim().startsWith('#') && !lines[i-1].trim().startsWith('---')) {
      issues.push(`L${i+1}: heading without blank line before`);
    }
  }

  // Issue 5: Pipe inside math (would mis-split table cells)
  let inTable = false;
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line.trim().startsWith('|')) {
      inTable = true;
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
              issues.push(`L${i+1}: PIPE inside math: ${line.substring(0, 80)}`);
              break;
            }
          }
        }
      }
    } else if (line.trim() === '') {
      inTable = false;
    } else inTable = false;
  }

  // Issue 6: Tables where cell count varies (often means missing leading or trailing pipe)
  let tStart = -1, expCells = -1;
  for (let i = 0; i < lines.length; i++) {
    const t = lines[i].trim();
    if (t.startsWith('|') && t.endsWith('|')) {
      const cells = t.split('|').slice(1, -1);
      if (tStart < 0) { tStart = i; expCells = cells.length; }
      else if (cells.length !== expCells && !/^[-:\s|]+$/.test(t)) {
        issues.push(`L${i+1}: row has ${cells.length} cells, expected ${expCells}`);
      }
    } else if (t === '') {
      tStart = -1; expCells = -1;
    } else if (!t.startsWith('|')) {
      tStart = -1; expCells = -1;
    }
  }

  // Issue 7: $$ block math inline with other content (won't render as block)
  for (let i = 0; i < lines.length; i++) {
    const t = lines[i].trim();
    if (/\$\$.+\$\$/.test(t) && !/^\$\$.*\$\$$/.test(t)) {
      issues.push(`L${i+1}: $$ block math with other content on same line`);
    }
  }

  if (issues.length) allIssues[id] = issues;
}

const ids = Object.keys(allIssues).sort();
if (ids.length === 0) console.log('All modules clean.');
else {
  for (const id of ids) {
    console.log(`### ${id}`);
    for (const issue of allIssues[id]) console.log(`  - ${issue}`);
    console.log();
  }
  console.log(`Total: ${ids.length} modules with issues`);
}
