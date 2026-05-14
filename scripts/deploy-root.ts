/**
 * deploy-root.ts
 * ルートドメイン（study-apps.com / wamu1225.github.io）への同期スクリプト。
 *
 * 【方針：2026-05-14 更新】
 * ルートドメインはポータル専用。旧ミラー由来の残骸ディレクトリは
 * 削除するだけで、noindex リダイレクトページも作成しない。
 * 存在しない URL は 404 を返すのが正しい。
 *
 * このスクリプトが行うこと：
 *   1. ポータル repo の自己修復（remote / branch）
 *   2. stats-pre1 由来の残骸（about/glossary/guide/cheatsheet/faq/
 *      randomquiz/privacy/assets）が誤って残っていれば削除
 *   3. 旧モジュールIDのディレクトリを削除（ミラー残骸の掃除）
 *   4. ads.txt のみ stats-pre1 ビルドから同期
 *
 * ポータル本体のファイルは wamu1225.github.io リポジトリで直接管理。
 */
import * as fs from 'fs';
import * as path from 'path';
import { execSync } from 'child_process';
import { modules } from '../src/data/modules';

const DIST_DIR = path.resolve(process.cwd(), 'dist');
const PORTAL_DIR = path.resolve(process.cwd(), '../../wamu1225.github.io');
const BASE_URL = 'https://study-apps.com';

console.log('--- Deploying to root domain (study-apps.com portal) ---');

if (!fs.existsSync(DIST_DIR)) {
  console.error('Error: dist/ not found. Run "npm run build" first.');
  process.exit(1);
}

// ── 0. Portal repo: remote/branch の自己修復 ─────
const EXPECTED_REMOTE = 'https://github.com/wamu1225/wamu1225.github.io.git';

if (!fs.existsSync(path.join(PORTAL_DIR, '.git'))) {
  console.error(`Error: ${PORTAL_DIR} is not a git repository.`);
  process.exit(1);
}

try {
  const currentRemote = execSync(`git -C "${PORTAL_DIR}" remote get-url origin`, { encoding: 'utf-8' }).trim();
  if (currentRemote !== EXPECTED_REMOTE) {
    console.log(`[fix] Remote was "${currentRemote}" → setting to correct URL`);
    execSync(`git -C "${PORTAL_DIR}" remote set-url origin ${EXPECTED_REMOTE}`);
  }
} catch {
  execSync(`git -C "${PORTAL_DIR}" remote add origin ${EXPECTED_REMOTE}`);
}

execSync(`git -C "${PORTAL_DIR}" fetch origin`, { stdio: 'inherit' });
const currentBranch = execSync(`git -C "${PORTAL_DIR}" branch --show-current`, { encoding: 'utf-8' }).trim();
if (currentBranch !== 'main') {
  console.log(`[fix] Branch was "${currentBranch}" → switching to main`);
  execSync(`git -C "${PORTAL_DIR}" checkout main`, { stdio: 'inherit' });
}
execSync(`git -C "${PORTAL_DIR}" reset --hard origin/main`, { stdio: 'inherit' });
console.log('✅ Portal repo: main branch, up to date.');

// ポータルが管理する、絶対に触ってはいけないトップレベル領域
const PORTAL_PROTECTED = new Set<string>([
  '.git',
  '.gitignore',
  'CNAME',
  'index.html',
  '404.html',
  'about',
  'privacy',
  'contact',
  'terms',
  'faq',
  'learning-guide',
  'sitemap',
  'robots.txt',
  'sitemap.xml',
  'ogp.png',
  'favicon.svg',
  'icons.svg',
  'ads.txt',
]);

// stats-pre1 のミラー時代に作られた、もはやポータルでは不要な静的ページ
const LEGACY_STATIC_PAGES = ['glossary', 'cheatsheet', 'guide', 'faq', 'randomquiz'];

// ── 1. 旧 stats-pre1 ミラーの残骸を削除 ─────────────
for (const name of LEGACY_STATIC_PAGES) {
  const dir = path.join(PORTAL_DIR, name);
  if (fs.existsSync(dir) && fs.statSync(dir).isDirectory()) {
    fs.rmSync(dir, { recursive: true, force: true });
    console.log(`🗑️  Removed legacy mirrored page: ${name}/`);
  }
}

// assets/ もポータル本体では使用しないため削除（ポータルは静的HTMLで完結）
const portalAssetsDir = path.join(PORTAL_DIR, 'assets');
if (fs.existsSync(portalAssetsDir)) {
  fs.rmSync(portalAssetsDir, { recursive: true, force: true });
  console.log('🗑️  Removed legacy assets/ directory (portal is static HTML).');
}

// ── 2. 旧モジュールディレクトリ（mirror残骸）を全削除 ─
// 過去に stats-pre1 をミラーしていた頃に作られた 1.1-probability/ などのフォルダを
// noindex リダイレクトページに置き換える前にいったん全部消す。
const moduleIdPattern = /^\d+\.\d+[a-z]?-/;

for (const entry of fs.readdirSync(PORTAL_DIR)) {
  if (moduleIdPattern.test(entry)) {
    const entryPath = path.join(PORTAL_DIR, entry);
    if (fs.statSync(entryPath).isDirectory()) {
      fs.rmSync(entryPath, { recursive: true, force: true });
    }
  }
}

// ── 3. ポータル管理ファイルが消えていないかを念のため検証 ──
for (const name of PORTAL_PROTECTED) {
  const p = path.join(PORTAL_DIR, name);
  if (name === '.git' || name === '.gitignore') continue;
  if (!fs.existsSync(p)) {
    console.warn(`⚠️  Portal file/dir missing (not managed by this script): ${name}`);
  }
}

// ── 4. ads.txt のみ stats-pre1 ビルドから同期（広告審査用） ─
const adsTxtSrc = path.join(DIST_DIR, 'ads.txt');
if (fs.existsSync(adsTxtSrc)) {
  fs.copyFileSync(adsTxtSrc, path.join(PORTAL_DIR, 'ads.txt'));
}

// ── 5. robots.txt / sitemap.xml / index.html 他ポータルページは
//      wamu1225.github.io リポジトリで直接管理するため触らない。

// ── 6. git commit & push ─────────────────────────
const today = new Date().toISOString().split('T')[0];
console.log('--- Committing and pushing to wamu1225.github.io ---');

const statusOutput = execSync(`git -C "${PORTAL_DIR}" status --porcelain`, { encoding: 'utf-8' });
if (!statusOutput.trim()) {
  console.log('No changes to commit on portal repo. Skip push.');
} else {
  execSync(`git -C "${PORTAL_DIR}" add -A`, { stdio: 'inherit' });
  execSync(
    `git -C "${PORTAL_DIR}" commit -m "chore: sync legacy module redirects from stats-pre1 (${today})"`,
    { stdio: 'inherit' }
  );
  execSync(`git -C "${PORTAL_DIR}" push origin main`, { stdio: 'inherit' });
  console.log('✅ Root domain (portal) deployed successfully!');
}
