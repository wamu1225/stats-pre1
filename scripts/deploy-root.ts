/**
 * deploy-root.ts
 * stats-pre1 のビルド成果物をルートドメイン用に変換し、
 * wamu1225.github.io リポジトリ（study-apps.com）に同期する。
 */
import * as fs from 'fs';
import * as path from 'path';
import { execSync } from 'child_process';
import { modules } from '../src/data/modules';

const DIST_DIR = path.resolve(process.cwd(), 'dist');
const PORTAL_DIR = path.resolve(process.cwd(), '../../wamu1225.github.io');
const BASE_URL = 'https://study-apps.com';

function stripMarkdown(text: string): string {
  return text
    .replace(/\[\[.*?\]\]/g, '')
    .replace(/\$\$[\s\S]*?\$\$/g, '')
    .replace(/\$[^$]+\$/g, '')
    .replace(/^#{1,6}\s+/gm, '')
    .replace(/\*\*(.*?)\*\*/g, '$1')
    .replace(/\*(.*?)\*/g, '$1')
    .replace(/^[-*+]\s+/gm, '')
    .replace(/^\d+\.\s+/gm, '')
    .replace(/^\|.*\|$/gm, '')
    .replace(/^[-|:\s]+$/gm, '')
    .replace(/^---+$/gm, '')
    .replace(/[\u{1F300}-\u{1FFFF}]/gu, '')
    .replace(/[💡🎯⚠️✅❌🔴🟡🟢]/g, '')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

console.log('--- Deploying to root domain (study-apps.com) ---');

if (!fs.existsSync(DIST_DIR)) {
  console.error('Error: dist/ not found. Run "npm run build" first.');
  process.exit(1);
}

// ── 1. assets/ を同期 ──────────────────────────────
const distAssetsDir = path.join(DIST_DIR, 'assets');
const portalAssetsDir = path.join(PORTAL_DIR, 'assets');

if (!fs.existsSync(portalAssetsDir)) {
  fs.mkdirSync(portalAssetsDir, { recursive: true });
}

// 既存の index-*.js / index-*.css だけ削除して新しいものをコピー
for (const file of fs.readdirSync(portalAssetsDir)) {
  if (/^index-/.test(file)) {
    fs.rmSync(path.join(portalAssetsDir, file));
  }
}
for (const file of fs.readdirSync(distAssetsDir)) {
  fs.copyFileSync(
    path.join(distAssetsDir, file),
    path.join(portalAssetsDir, file)
  );
}

// ── 2. 静的ファイルをコピー ──────────────────────
for (const file of ['favicon.svg', 'icons.svg', 'ads.txt']) {
  const src = path.join(DIST_DIR, file);
  if (fs.existsSync(src)) {
    fs.copyFileSync(src, path.join(PORTAL_DIR, file));
  }
}

// ── 3. ルート index.html を生成 ──────────────────
const distIndexHtml = fs.readFileSync(path.join(DIST_DIR, 'index.html'), 'utf-8');

const rootIndexHtml = distIndexHtml
  // og:url / canonical を /stats-pre1/ → ルートに修正
  .replace(
    '<meta property="og:url" content="https://study-apps.com/stats-pre1/" />',
    '<meta property="og:url" content="https://study-apps.com/" />'
  )
  .replace(
    '<link rel="canonical" href="https://study-apps.com/stats-pre1/" />',
    '<link rel="canonical" href="https://study-apps.com/" />'
  )
  // SPA 復元スクリプトのベースパスを '' に変更
  .replace(
    "'/stats-pre1' + decoded[0]",
    "decoded[0]"
  );

fs.writeFileSync(path.join(PORTAL_DIR, 'index.html'), rootIndexHtml);

// ── 4. 404.html（ルート用） ───────────────────────
const root404Html = `<!doctype html>
<html lang="ja">
  <head>
    <meta charset="UTF-8" />
    <title>統計検定 準1級 学習リファレンス</title>
    <script>
      var l = window.location;
      l.replace(
        l.protocol + '//' + l.hostname + (l.port ? ':' + l.port : '') +
        '/?/' +
        l.pathname.slice(1).replace(/&/g, '~and~') +
        (l.search ? '&' + l.search.slice(1).replace(/&/g, '~and~') : '') +
        l.hash
      );
    </script>
  </head>
  <body></body>
</html>
`;
fs.writeFileSync(path.join(PORTAL_DIR, '404.html'), root404Html);

// ── 5. robots.txt ────────────────────────────────
fs.writeFileSync(
  path.join(PORTAL_DIR, 'robots.txt'),
  `User-agent: *\nAllow: /\n\nSitemap: ${BASE_URL}/sitemap.xml\n`
);

// ── 6. モジュールページをプリレンダリング ─────────
// ルートの場合は assets/ がそのまま ../assets/ になる（同構造）
const subDirTemplateHtml = rootIndexHtml
  .replace(/href="\.\/assets\//g, 'href="../assets/')
  .replace(/src="\.\/assets\//g, 'src="../assets/')
  .replace(/href="\.\/favicon.svg"/g, 'href="../favicon.svg"')
  .replace(/href="\.\/icons.svg"/g, 'href="../icons.svg"');

let generatedCount = 0;

for (const mod of modules) {
  const modDir = path.join(PORTAL_DIR, mod.id);
  if (!fs.existsSync(modDir)) {
    fs.mkdirSync(modDir, { recursive: true });
  }

  const seoText = stripMarkdown(mod.content).slice(0, 400) + '...';
  const pageUrl = `${BASE_URL}/${mod.id}/`;
  const pageTitle = `${mod.title} | 統計検定 準1級 学習リファレンス`;

  let modHtml = subDirTemplateHtml
    .replace('<title>統計検定 準1級 学習リファレンス</title>', `<title>${pageTitle}</title>`)
    .replace('<meta name="description" content="統計検定準1級の合格を目指す学習リファレンス。確率分布・推測統計・多変量解析・ベイズ統計をインタラクティブな図と数式で解説。" />', `<meta name="description" content="${mod.description}" />`)
    .replace('<meta property="og:title" content="統計検定 準1級 学習リファレンス" />', `<meta property="og:title" content="${pageTitle}" />`)
    .replace('<meta property="og:description" content="確率分布・推測統計・多変量解析・ベイズ統計をインタラクティブな図と数式で解説する準1級対策サイト。" />', `<meta property="og:description" content="${mod.description}" />`)
    .replace('<meta property="og:url" content="https://study-apps.com/" />', `<meta property="og:url" content="${pageUrl}" />`)
    .replace('<link rel="canonical" href="https://study-apps.com/" />', `<link rel="canonical" href="${pageUrl}" />`)
    .replace('<meta name="twitter:title" content="統計検定 準1級 学習リファレンス" />', `<meta name="twitter:title" content="${pageTitle}" />`)
    .replace('<meta name="twitter:description" content="統計検定準1級の合格を目指す学習リファレンス。確率分布・推測統計・多変量解析・ベイズ統計をインタラクティブな図と数式でわかりやすく解説。" />', `<meta name="twitter:description" content="${mod.description}" />`);

  const seoDataHtml = `<noscript id="seo-data">
    <h1>${mod.title}</h1>
    <p>${seoText}</p>
  </noscript>`;

  modHtml = modHtml.replace('<body>', `<body>\n    ${seoDataHtml}`);

  fs.writeFileSync(path.join(modDir, 'index.html'), modHtml);
  generatedCount++;
}

// ── 7. 静的ページ ────────────────────────────────
const staticPageConfigs: Record<string, { title: string; description: string }> = {
  glossary: {
    title: '用語集',
    description: '統計検定準1級の頻出用語を一覧で解説。確率分布・推測統計・多変量解析・ベイズ統計・時系列分析など試験に出る統計用語を網羅。'
  },
  cheatsheet: {
    title: '公式集',
    description: '統計検定準1級の重要公式を一覧にまとめました。確率分布・推定・検定・回帰分析・主成分分析・ベイズ統計の公式をすばやく確認できます。'
  },
  guide: {
    title: '試験ガイド',
    description: '統計検定準1級の試験概要・出題範囲・学習の進め方を解説。合格基準・試験時間・推奨学習時間など受験に必要な情報をまとめました。'
  },
  about: {
    title: 'サイトについて',
    description: '統計検定準1級 学習リファレンスについて。サイトの目的・コンテンツ構成・利用方法を説明します。'
  },
  privacy: {
    title: 'プライバシーポリシー',
    description: '統計検定準1級 学習リファレンスのプライバシーポリシー。個人情報の取り扱いについて説明します。'
  }
};

for (const [page, config] of Object.entries(staticPageConfigs)) {
  const pageDir = path.join(PORTAL_DIR, page);
  if (!fs.existsSync(pageDir)) {
    fs.mkdirSync(pageDir, { recursive: true });
  }

  const pageUrl = `${BASE_URL}/${page}/`;
  const pageTitle = `${config.title} | 統計検定 準1級 学習リファレンス`;

  const pageHtml = subDirTemplateHtml
    .replace('<title>統計検定 準1級 学習リファレンス</title>', `<title>${pageTitle}</title>`)
    .replace('<meta name="description" content="統計検定準1級の合格を目指す学習リファレンス。確率分布・推測統計・多変量解析・ベイズ統計をインタラクティブな図と数式で解説。" />', `<meta name="description" content="${config.description}" />`)
    .replace('<meta property="og:title" content="統計検定 準1級 学習リファレンス" />', `<meta property="og:title" content="${pageTitle}" />`)
    .replace('<meta property="og:description" content="確率分布・推測統計・多変量解析・ベイズ統計をインタラクティブな図と数式で解説する準1級対策サイト。" />', `<meta property="og:description" content="${config.description}" />`)
    .replace('<meta property="og:url" content="https://study-apps.com/" />', `<meta property="og:url" content="${pageUrl}" />`)
    .replace('<link rel="canonical" href="https://study-apps.com/" />', `<link rel="canonical" href="${pageUrl}" />`)
    .replace('<meta name="twitter:title" content="統計検定 準1級 学習リファレンス" />', `<meta name="twitter:title" content="${pageTitle}" />`)
    .replace('<meta name="twitter:description" content="統計検定準1級の合格を目指す学習リファレンス。確率分布・推測統計・多変量解析・ベイズ統計をインタラクティブな図と数式でわかりやすく解説。" />', `<meta name="twitter:description" content="${config.description}" />`);

  fs.writeFileSync(path.join(pageDir, 'index.html'), pageHtml);
  generatedCount++;
}

// ── 8. sitemap.xml ───────────────────────────────
const today = new Date().toISOString().split('T')[0];

const moduleUrls = modules.map(m =>
  `  <url>\n    <loc>${BASE_URL}/${m.id}/</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>0.8</priority>\n  </url>`
).join('\n');

const staticUrls = ['glossary', 'cheatsheet', 'guide'].map(p =>
  `  <url>\n    <loc>${BASE_URL}/${p}/</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>0.6</priority>\n  </url>`
).join('\n');

const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${BASE_URL}/</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
${moduleUrls}
${staticUrls}
</urlset>`;

fs.writeFileSync(path.join(PORTAL_DIR, 'sitemap.xml'), sitemapXml);

console.log(`✅ Generated ${generatedCount} static HTML files for root domain.`);
console.log(`✅ Generated sitemap.xml with ${modules.length + 4} URLs.`);

// ── 9. git commit & push ─────────────────────────
console.log('--- Committing and pushing to wamu1225.github.io ---');
execSync(`git -C "${PORTAL_DIR}" add -A`, { stdio: 'inherit' });
execSync(
  `git -C "${PORTAL_DIR}" commit -m "Auto-deploy: Sync root with stats-pre1 (${today})"`,
  { stdio: 'inherit' }
);
execSync(`git -C "${PORTAL_DIR}" push`, { stdio: 'inherit' });
console.log('✅ Root domain deployed successfully!');
