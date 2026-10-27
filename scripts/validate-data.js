// stats-app/scripts/validate-data.js
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');

const filesToWatch = ['src/data/modules.ts', 'src/data/glossary.ts'];
let errors = [];

// Supported interactive types (Must match InteractiveGraph.tsx)
const validInteractiveTypes = [
  'normal', 't', 'chi2', 'f', 'pca', 'regression', 'logistic', 'mcmc', 'gibbs', 'update', 'overfit', 'outlier', 'multico', 'skewkurt'
];

const mathKeywords = [
  'xrightarrow', 'chi', 'sigma', 'mu', 'alpha', 'beta', 'theta', 'gamma', 'lambda', 'epsilon', 'phi', 'pi',
  'frac', 'sqrt', 'exp', 'log', 'sum', 'prod', 'int', 'infty', 'partial', 'nabla', 'propto',
  'pm', 'mp', 'le', 'ge', 'ne', 'approx', 'sim', 'equiv', 'dots', 'ldots', 'cdots', 'quad', 'qquad',
  'text', 'mathbf', 'mathbb', 'mathcal'
];

const bareSymbols = ['σ', 'μ', 'χ', '±', 'ρ', 'θ', 'λ', 'ε', 'π'];

function checkFile(filePath) {
  const fullPath = path.join(root, filePath);
  const raw = fs.readFileSync(fullPath, 'utf8');
  
  // 1. Syntax Integrity: Backtick count
  const backtickCount = (raw.match(/`/g) || []).length;
  if (backtickCount % 2 !== 0) {
    errors.push(`[Critical] Unterminated template literal (backtick \`) found in ${filePath}. Count: ${backtickCount}`);
  }

  // 2. Single backslash check
  mathKeywords.forEach(word => {
    const regex = new RegExp(`(?<!\\\\)\\\\${word}\\b`, 'gi');
    if (regex.test(raw)) {
      errors.push(`[Error] Single backslash for '${word}' in ${filePath}. Use \\\\\\\\.`);
    }
  });

  // 2b. Single backslash before LaTeX spacing (\, \; \! \:) — in a template literal it collapses to the bare
  //     punctuation, so a thin space shows up on screen as a stray comma (2026-10-12 nCk)
  const spacing = raw.match(/(?<!\\)\\[,;!:]/g);
  if (spacing) {
    errors.push(`[Error] Single backslash before LaTeX spacing (${[...new Set(spacing)].join(' ')}) in ${filePath}. Use \\\\, etc.`);
  }

  // 2c. \underbrace with text labels widens a display formula past 390px; KaTeX then shrinks it to
  //     unreadable size and clips the last label (2026-10-13 1.23 / 1.5b). Put the labels in a list instead.
  const ub = (raw.match(/\\underbrace/g) || []).length;
  if (ub) {
    errors.push(`[Error] \\underbrace used ${ub} time(s) in ${filePath}. Write the formula plainly and explain each term in a list below it.`);
  }

  // 2d. Inline math opened with $$ inside one string (e.g. a quiz option `$$\\log …$`): each template literal
  //     must hold an even number of single $ once $$ pairs are removed (2026-10-18 3.5 sur1).
  for (const m of raw.matchAll(/`((?:[^`\\]|\\.)*)`/g)) {
    if (m[1].includes('${')) continue; // JS interpolation, not content
    const singles = (m[1].replace(/\$\$/g, '').match(/\$/g) || []).length;
    if (singles % 2) {
      const lineNum = raw.slice(0, m.index).split('\n').length;
      errors.push(`[Error] Odd number of single '$' in one string (inline $$?) at ${filePath}:${lineNum}`);
    }
  }

  // 2e. Correct-answer position: no module may put 5 or more of its 10 answers in one position
  //     (2026-10-18: 1.9c had 8 at the first option, 1.9b had 7).
  if (filePath.includes('modules.ts')) {
    const starts = [...raw.matchAll(/\{id:`([^`]+)`,updatedAt/g)];
    starts.forEach((m, k) => {
      const block = raw.slice(m.index, k + 1 < starts.length ? starts[k + 1].index : raw.length);
      const cnt = [0, 0, 0, 0];
      for (const a of block.matchAll(/correctAnswer:(\d)/g)) cnt[+a[1]]++;
      if (Math.max(...cnt) >= 5) errors.push(`[Error] ${m[1]} has ${Math.max(...cnt)} correct answers at one position (${cnt.join(' ')}). Spread them out.`);
    });
  }

  // 3. Quiz count check
  if (filePath.includes('modules.ts')) {
    const moduleMatches = raw.match(/\{\s*id:[\s\S]*?quiz:\s*\[([\s\S]*?)\]\s*\}/g);
    if (moduleMatches) {
      moduleMatches.forEach((moduleBlock, i) => {
        const questionCount = (moduleBlock.match(/\bquestion:\s*[`'"]/g) || []).length;
        if (questionCount !== 10) {
          const moduleIdMatch = moduleBlock.match(/id:\s*[`'"]([^`'"]+)[`'"]/);
          const id = moduleIdMatch ? moduleIdMatch[1] : `Module ${i+1}`;
          errors.push(`[Error] ${id} has ${questionCount} questions (Required: 10).`);
        }
      });
    }
  }

  const lines = raw.split('\n');
  let isInContent = false;

  lines.forEach((line, index) => {
    const lineNum = index + 1;
    const trimmed = line.trim();
    
    // Toggle isInContent when encountering a backtick
    if (trimmed.includes('`')) {
      // If it's a property like content: `... or quiz: [ `...
      if (trimmed.includes('content:') || trimmed.includes('explanation:') || trimmed.includes('question:') || trimmed.includes('options:')) {
        isInContent = true;
      } else {
        isInContent = false;
      }
    }

    if (!isInContent) return;

    // Inside content block checks
    const contentLine = line.replace(/^\s*(content|explanation|question|options):\s*`/, '').replace(/`,?$/, '');
    const trimmedContent = contentLine.trim();

    // 4. Bare Math Symbols (outside $ $)
    const parts = contentLine.split('$');
    for (let i = 0; i < parts.length; i += 2) {
      const outsideText = parts[i];
      bareSymbols.forEach(sym => {
        if (outsideText.includes(sym)) {
          errors.push(`[Error] Bare math symbol '${sym}' outside $ $ at ${filePath}:${lineNum}`);
        }
      });
      
      mathKeywords.forEach(word => {
        const regex = new RegExp(`(?<!\\\\)\\b${word}\\b`, 'gi');
        if (regex.test(outsideText)) {
          if (['much', 'mutation', 'fraction', 'logical', 'logic'].includes(word.toLowerCase())) return;
          errors.push(`[Error] Naked math keyword '${word}' outside $ $ at ${filePath}:${lineNum}`);
        }
      });
    }

    // 5. Unpaired $
    if ((contentLine.match(/\$/g) || []).length % 2 !== 0) {
      errors.push(`[Error] Unpaired '$' symbol at ${filePath}:${lineNum}`);
    }

    // 5b. A variable lost from inline math: a superscript/subscript with no base, or a line opening with "= ".
    //     Seen when text written through an unquoted shell heredoc expanded `$k` and `$Z` to empty
    //     (2026-10-18 1.12: "$k = 1$ … $Z^2$" became " = 1$ … ^2$"). The $ count stayed even, so 5 missed it.
    if (/(^|[ 　、。（])[\^_][{0-9a-zA-Z]/.test(contentLine) || /^ ?= /.test(contentLine)) {
      errors.push(`[Error] Math with a missing variable (bare ^, _ or leading "=") at ${filePath}:${lineNum}`);
    }

    // 6. Supported Markdown Check
    if (trimmedContent.startsWith('#')) {
      if (!trimmedContent.match(/^#+\s/)) {
        errors.push(`[Error] Missing space after '#' heading marker at ${filePath}:${lineNum}`);
      }
      if (!trimmedContent.startsWith('##')) {
        errors.push(`[Error] Unsupported single '#' heading at ${filePath}:${lineNum}. Use '##' or '###'.`);
      }
      // Check for blank line before header (excluding first line of content)
      if (index > 0) {
        const prevLine = lines[index-1];
        const prevTrimmed = prevLine.trim();
        // A header MUST be preceded by an empty line, a horizontal rule, or the start of a template literal
        if (prevTrimmed !== '' && !prevTrimmed.startsWith('---') && !prevTrimmed.includes('`')) {
          errors.push(`[Error] Markdown syntax error: Header must be preceded by a blank line at ${filePath}:${lineNum}. Found: "${prevTrimmed}"`);
        }
      }
    }
    if (trimmed.startsWith('-') && !trimmed.startsWith('- ') && !trimmed.startsWith('---')) {
      // Allow negative numbers and mathematical expressions (e.g. -1, -(x-mu))
      const isMath = /^-\d/.test(trimmed) || /^-[\$\\(\[]/.test(trimmed);
      if (!isMath) {
        errors.push(`[Error] Missing space after '-' list marker at ${filePath}:${lineNum}. Found: "${trimmed}"`);
      }
    }
    if (trimmed.startsWith('>') && !trimmed.startsWith('💡')) {
      errors.push(`[Error] Unsupported blockquote '>' at ${filePath}:${lineNum}. Use '💡' for callouts.`);
    }

    // 7. Interactive Tag Validation
    const interactiveMatches = line.match(/\[\[interactive:(.*?)\]\]/g);
    if (interactiveMatches) {
      interactiveMatches.forEach(tag => {
        const typeMatch = tag.match(/\[\[interactive:(.*?)\]\]/);
        if (typeMatch && !validInteractiveTypes.includes(typeMatch[1])) {
          errors.push(`[Error] Unsupported interactive type '${typeMatch[1]}' at ${filePath}:${lineNum}`);
        }
      });
    }
    const legacyTags = ['[[mcmc]]', '[[update]]', '[[gibbs]]', '[[overfit]]', '[[outlier]]', '[[multico]]'];
    legacyTags.forEach(tag => {
      if (line.includes(tag)) {
        errors.push(`[Error] Legacy tag '${tag}' found at ${filePath}:${lineNum}. Use [[interactive:${tag.slice(2, -2)}]].`);
      }
    });
  });
}

console.log('--- Data Integrity Validation ---');
filesToWatch.forEach(checkFile);

// 4. Module-number references in prose, e.g. "（3.4）" — readers never see module numbers, so link the module by
//    name instead. Matches only numbers that are real module IDs, so "（0.90）" or "Po(1.5)" are not flagged
//    (2026-10-17 2.7 / O-3-51).
{
  const raw = fs.readFileSync(path.join(root, 'src/data/modules.ts'), 'utf8');
  const nums = new Set([...raw.matchAll(/id:\s*`(\d+\.\d+[a-z]?)-/g)].map(m => m[1]));
  for (const m of raw.matchAll(/(?:（|(?<![A-Za-z\\}_^)\]\d.])\()(\d+\.\d+[a-z]?)[)）]/g)) {
    if (nums.has(m[1])) {
      const lineNum = raw.slice(0, m.index).split('\n').length;
      errors.push(`[Error] Module-number reference '${m[0]}' at src/data/modules.ts:${lineNum}. Link the module by name, e.g. [分割表の解析](/stats-pre1/3.4-contingency/).`);
    }
  }
}

if (errors.length > 0) {
  console.error('\n❌ VALIDATION FAILED!\n');
  [...new Set(errors)].forEach(err => console.error(err));
  process.exit(1);
} else {
  console.log('\n✅ All checks passed! The data is clean.\n');
  process.exit(0);
}
