/**
 * deploy-root.ts
 * ルートドメイン（study-apps.com / wamu1225.github.io）への同期スクリプト。
 *
 * 【方針変更：2026-05-11】
 * AdSense「有用性の低いコンテンツ」落選を受け、ルートドメインを
 * stats-pre1 のミラーから「学習サイト集約ポータル」に転換した。
 *
 * このスクリプトは以下のみを行い、ポータル本体（index.html / about/
 * privacy/ contact/ 等）には一切手を出さない：
 *
 *   1. ポータル repo の自己修復（remote / branch）
 *   2. stats-pre1 由来の静的ページ（about/glossary/guide/cheatsheet/
 *      faq/randomquiz/privacy）が誤ってルートに残っていれば削除
 *   3. 旧モジュールIDのディレクトリを削除（過去のミラー残骸の掃除）
 *   4. assets / favicon / icons / ads.txt の静的ファイル同期
 *      ※ ポータルは静的HTMLで完結するため assets は不要だが、
 *        既存リンク互換のため stats-pre1 の assets だけは残す。
 *        → 今回の方針では「ポータル側に assets/ は不要」として削除する。
 *   5. 旧モジュールURL（1.1-probability/ など）を、stats-pre1 の同名
 *      モジュールへ canonical する noindex ページに置き換える。
 *   6. robots.txt / sitemap.xml はポータルが管理するため何もしない。
 *
 * ポータル本体のファイルは wamu1225.github.io リポジトリで直接管理。
 * このスクリプトはあくまで「stats-pre1 のビルドに連動して旧URL互換と
 * 残骸掃除だけ行う最小限の同期処理」。
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

// ── 4. 旧モジュールURLを noindex + canonical=stats-pre1 で復元 ─
// 旧URL（study-apps.com/1.1-probability/ など）にアクセスされた場合は、
// noindex を付け、canonical で stats-pre1 の同名モジュールを指す。
// ユーザーは meta refresh で stats-pre1 に転送される。
function buildLegacyModuleHtml(modId: string, modTitle: string, modDesc: string) {
  const targetUrl = `${BASE_URL}/stats-pre1/${modId}/`;
  const safeTitle = modTitle.replace(/"/g, '&quot;');
  const safeDesc = modDesc.replace(/"/g, '&quot;');
  return `<!doctype html>
<html lang="ja">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="robots" content="noindex, follow" />
    <link rel="canonical" href="${targetUrl}" />
    <meta http-equiv="refresh" content="0;url=${targetUrl}" />
    <title>${safeTitle} | study-apps.com</title>
    <meta name="description" content="${safeDesc}" />
    <script>window.location.replace('${targetUrl}');</script>
    <style>
      body { font-family: "Yu Gothic UI","Hiragino Sans",sans-serif; max-width:640px; margin:80px auto; padding:0 20px; line-height:1.8; color:#1f2937; }
      a { color: #2563eb; }
    </style>
  </head>
  <body>
    <p>このページは <a href="${targetUrl}">${safeTitle}（統計検定 準1級 学習リファレンス）</a> に移動しました。自動で転送されない場合はリンクをクリックしてください。</p>
    <p><a href="${BASE_URL}/">study-apps.com トップへ</a></p>
  </body>
</html>
`;
}

let legacyRedirectCount = 0;
for (const mod of modules) {
  const dir = path.join(PORTAL_DIR, mod.id);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(
    path.join(dir, 'index.html'),
    buildLegacyModuleHtml(mod.id, mod.title, mod.description)
  );
  legacyRedirectCount++;
}

// さらに、過去の URL 互換のために特定の旧ID（現在 stats-g3 に移管されているもの等）も処理
const extraLegacyIds = [
  '1.1-clt', '1.2-sampling', '1.3-anova', '1.4-inference',
];
for (const oldId of extraLegacyIds) {
  const dir = path.join(PORTAL_DIR, oldId);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(
    path.join(dir, 'index.html'),
    `<!doctype html>
<html lang="ja">
  <head>
    <meta charset="UTF-8" />
    <meta name="robots" content="noindex, follow" />
    <link rel="canonical" href="${BASE_URL}/" />
    <meta http-equiv="refresh" content="0;url=${BASE_URL}/" />
    <title>ページが移動しました | study-apps.com</title>
    <script>window.location.replace('${BASE_URL}/');</script>
  </head>
  <body><p><a href="${BASE_URL}/">study-apps.com トップへ移動しました</a></p></body>
</html>
`
  );
  legacyRedirectCount++;
}
console.log(`✅ Generated ${legacyRedirectCount} legacy module redirect pages (noindex + canonical to stats-pre1).`);

// ── 5. ads.txt のみ stats-pre1 ビルドから同期（広告審査用） ─
const adsTxtSrc = path.join(DIST_DIR, 'ads.txt');
if (fs.existsSync(adsTxtSrc)) {
  fs.copyFileSync(adsTxtSrc, path.join(PORTAL_DIR, 'ads.txt'));
}

// ── 6. robots.txt / sitemap.xml / index.html / about/ / privacy/ /
//      contact/ / ogp.png / favicon.svg / icons.svg はポータル側で
//      手動管理するため、このスクリプトでは一切触らない。

// ── 7. git commit & push ─────────────────────────
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
