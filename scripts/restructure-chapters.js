// One-shot script: restructure stats-pre1 modules from 3 chapters to 6 chapters.
// Run from stats-app/: node scripts/restructure-chapters.js
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const file = path.join(__dirname, '..', 'src', 'data', 'modules.ts');
let content = fs.readFileSync(file, 'utf8');

const changes = {
  // Ch1 stays (1.1-1.3)
  '1.4-dist-basics': 2,
  '1.5-dist-features': 2,
  '1.5b-correlation': 2,
  '1.6-binomial': 2,
  '1.7-poisson': 2,
  '1.8-continuous': 2,
  '1.9-multivariate': 2,
  '1.10-normal-dist': 3,
  '1.11-lln-clt': 3,
  '1.12-sampling': 3,
  '1.13-sufficient-stats': 3,
  '1.22-asymptotic': 3,
  '1.14-estimation': 4,
  '1.15-estimator-props': 4,
  '1.16-ci': 4,
  '1.17-ci-advanced': 4,
  '1.18-inference': 4,
  '1.19-testing-adv': 4,
  '1.20-testing-applied': 4,
  '1.21-anova': 4,
  '1.23-model-selection': 4,
  '2.1-regression': 5,
  '2.2-pca': 5,
  '2.3-discriminant': 5,
  '2.4-factor': 5,
  '2.5-clustering': 5,
  '2.6-glm': 5,
  '2.7-multivariate': 5,
  '3.1-bayes': 6,
  '3.2-timeseries': 6,
  '3.3-markov': 6,
  '3.4-contingency': 6,
  '3.5-survival': 6,
  '3.6-simulation': 6,
};

let updated = 0;
const failed = [];

for (const [id, newCh] of Object.entries(changes)) {
  const escId = id.replace(/\./g, '\\.');
  const regex = new RegExp('(id:`' + escId + '`,title:`[^`]*`,chapter:)\\d+');
  const before = content;
  content = content.replace(regex, `$1${newCh}`);
  if (before === content) failed.push(id);
  else updated++;
}

fs.writeFileSync(file, content);
console.log(`Updated: ${updated}, Failed: ${failed.length}`);
if (failed.length) console.log('Failed IDs:', failed);
