import * as fs from 'fs';
import * as path from 'path';
import sharp from 'sharp';
import { modules } from '../src/data/modules';
import { glossary } from '../src/data/glossary';
import { buildUsecaseHtml } from '../src/data/usecaseGuide';
import {
  buildCheatsheetHtml,
  buildGuideHtml,
  buildAboutHtml,
  buildRootStaticContent,
  buildModuleSeoHtml,
  buildFaqPageHtml,
} from './static-content.js';

const DIST_DIR = path.resolve(process.cwd(), 'dist');
const INDEX_HTML_PATH = path.join(DIST_DIR, 'index.html');
const BASE_URL = 'https://study-apps.com/stats-pre1';
const BASE = '/stats-pre1';

function stripMarkdown(text: string): string {
  return text
    .replace(/\[\[.*?\]\]/g, '')
    .replace(/\[([^\]\n]+)\]\([^)\n]+\)/g, '$1') // [ラベル](URL) → ラベルだけ残す
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

console.log('--- Starting Static Site Generation (SSG) Pre-rendering ---');

if (!fs.existsSync(INDEX_HTML_PATH)) {
  console.error('Error: dist/index.html not found. Run "npm run build" first.');
  process.exit(1);
}

const templateHtml = fs.readFileSync(INDEX_HTML_PATH, 'utf-8');

// ── ルートindex.htmlに静的コンテンツを注入 ──────────
const moduleListHtml = modules.map(m =>
  `<li style="margin-bottom:12px"><a href="${BASE}/${m.id}/" style="color:#2563eb;font-weight:600;text-decoration:none">${m.title}</a><br><span style="color:#555;font-size:0.9rem">${m.description}</span></li>`
).join('\n');

const rootStaticContent = buildRootStaticContent(BASE, moduleListHtml);

// robots meta タグを全ページに追加 (E2)
const robotsMeta = '<meta name="robots" content="index, follow" />';

let rootIndexHtml = templateHtml
  .replace('</head>', `${robotsMeta}\n  </head>`)
  .replace('<div id="root"></div>', `<div id="root">${rootStaticContent}</div>`);
const homeJsonLd = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  'name': '統計検定 準1級 学習リファレンス',
  'url': `${BASE_URL}/`,
  'description': '確率分布・推測統計・多変量解析・ベイズ統計をインタラクティブな図と数式で解説する統計検定準1級対策サイト。',
  'inLanguage': 'ja'
});
rootIndexHtml = rootIndexHtml.replace('</head>', `<script type="application/ld+json">${homeJsonLd}</script>\n  </head>`);
fs.writeFileSync(INDEX_HTML_PATH, rootIndexHtml);

const subDirTemplateHtml = templateHtml
  .replace(/href="\.\/assets\//g, 'href="../assets/')
  .replace(/src="\.\/assets\//g, 'src="../assets/')
  .replace(/href="\.\/favicon.svg"/g, 'href="../favicon.svg"')
  .replace(/href="\.\/icons.svg"/g, 'href="../icons.svg"')
  .replace('</head>', `${robotsMeta}\n  </head>`);  // E2

let generatedCount = 0;

// ── モジュールページ ─────────────────────────────────
for (let i = 0; i < modules.length; i++) {
  const mod = modules[i];
  const modDir = path.join(DIST_DIR, mod.id);
  if (!fs.existsSync(modDir)) {
    fs.mkdirSync(modDir, { recursive: true });
  }

  // A2: sections コンテンツも含めた本文
  const sectionsText = (mod.sections ?? []).map(s => s.title + '\n' + stripMarkdown(s.content)).join('\n\n');
  const seoText = (stripMarkdown(mod.content) + (sectionsText ? '\n\n' + sectionsText : '')).slice(0, 6000);

  const pageUrl = `${BASE_URL}/${mod.id}/`;
  const pageTitle = `${mod.title} | 統計検定 準1級 学習リファレンス`;

  // クイズQ&Aスニペット（最初の3問）
  const quizSnippet = mod.quiz.slice(0, 3).map((q, qi) => {
    const correctAnswer = q.options[q.correctAnswer];
    return `<div style="margin-bottom:12px;padding:12px;background:#f8fafc;border-radius:6px;border-left:3px solid #2563eb">
  <p style="margin:0 0 6px;font-weight:600;color:#1e3a5f">Q${qi + 1}. ${q.question.replace(/\$[^$]+\$/g, '').replace(/\*\*(.*?)\*\*/g, '$1')}</p>
  <p style="margin:0;color:#444;font-size:0.92rem">A. ${correctAnswer.replace(/\$[^$]+\$/g, '').replace(/\*\*(.*?)\*\*/g, '$1')}</p>
</div>`;
  }).join('\n');

  const quizSnippetHtml = `<section style="margin-top:28px">
  <h2 style="font-size:1.1rem;font-weight:700;margin-bottom:12px;color:#1e3a5f">確認クイズ（抜粋）</h2>
  ${quizSnippet}
  <p style="margin-top:12px;font-size:0.9rem;color:#555">全10問のクイズはサイトのインタラクティブ版でお試しください。</p>
</section>`;

  // 前後モジュールリンク
  const prevMod = i > 0 ? modules[i - 1] : null;
  const nextMod = i < modules.length - 1 ? modules[i + 1] : null;
  const prevLink = prevMod
    ? `<a href="${BASE}/${prevMod.id}/" style="color:#2563eb;text-decoration:none">← ${prevMod.title}</a>`
    : '';
  const nextLink = nextMod
    ? `<a href="${BASE}/${nextMod.id}/" style="color:#2563eb;text-decoration:none">${nextMod.title} →</a>`
    : '';

  // C1: 同章の他モジュールリンク
  const chapterMods = modules.filter(m => m.chapter === mod.chapter && m.id !== mod.id);
  const relatedHtml = chapterMods.length > 0 ? `<section style="margin-top:28px;padding:16px;background:#f8fafc;border-radius:8px">
  <h2 style="font-size:1.05rem;font-weight:700;margin:0 0 10px;color:#1e3a5f">第${mod.chapter}章の他のモジュール</h2>
  <ul style="list-style:none;padding:0;margin:0;display:flex;flex-wrap:wrap;gap:8px">
    ${chapterMods.map(m => `<li><a href="${BASE}/${m.id}/" style="color:#2563eb;text-decoration:none;font-size:0.9rem;background:#fff;border:1px solid #dbeafe;border-radius:4px;padding:3px 10px;display:inline-block">${m.title}</a></li>`).join('\n    ')}
  </ul>
</section>` : '';

  const seoContentHtml = buildModuleSeoHtml(BASE, mod.title, mod.description, seoText, quizSnippetHtml + relatedHtml, prevLink, nextLink);

  let modHtml = subDirTemplateHtml
    .replace('<title>統計検定 準1級 学習リファレンス</title>', `<title>${pageTitle}</title>`)
    .replace('<meta name="description" content="統計検定準1級の合格を目指す学習リファレンス。確率分布・推測統計・多変量解析・ベイズ統計をインタラクティブな図と数式で解説。" />', `<meta name="description" content="${mod.description}" />`)
    .replace('<meta property="og:title" content="統計検定 準1級 学習リファレンス" />', `<meta property="og:title" content="${pageTitle}" />`)
    .replace('<meta property="og:description" content="確率分布・推測統計・多変量解析・ベイズ統計をインタラクティブな図と数式で解説する準1級対策サイト。" />', `<meta property="og:description" content="${mod.description}" />`)
    .replace('<meta property="og:url" content="https://study-apps.com/stats-pre1/" />', `<meta property="og:url" content="${pageUrl}" />`)
    .replace('<link rel="canonical" href="https://study-apps.com/stats-pre1/" />', `<link rel="canonical" href="${pageUrl}" />`)
    .replace('<meta name="twitter:title" content="統計検定 準1級 学習リファレンス" />', `<meta name="twitter:title" content="${pageTitle}" />`)
    .replace('<meta name="twitter:description" content="統計検定準1級の合格を目指す学習リファレンス。確率分布・推測統計・多変量解析・ベイズ統計をインタラクティブな図と数式でわかりやすく解説。" />', `<meta name="twitter:description" content="${mod.description}" />`);

  modHtml = modHtml.replace('<div id="root"></div>', `<div id="root">${seoContentHtml}</div>`);

  // B1: BreadcrumbList + Article + FAQPage JSON-LD
  const faqItems = mod.quiz.slice(0, 3).map(q => ({
    '@type': 'Question',
    'name': q.question.replace(/\$[^$]+\$/g, '').replace(/\*\*(.*?)\*\*/g, '').trim(),
    'acceptedAnswer': {
      '@type': 'Answer',
      'text': q.options[q.correctAnswer].replace(/\$[^$]+\$/g, '').replace(/\*\*(.*?)\*\*/g, '').trim()
    }
  }));

  const modJsonLd = JSON.stringify([
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      'itemListElement': [
        { '@type': 'ListItem', 'position': 1, 'name': 'ホーム', 'item': `${BASE_URL}/` },
        { '@type': 'ListItem', 'position': 2, 'name': `第${mod.chapter}章`, 'item': `${BASE_URL}/` },
        { '@type': 'ListItem', 'position': 3, 'name': mod.title, 'item': pageUrl }
      ]
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Article',
      'headline': mod.title,
      'description': mod.description,
      'url': pageUrl,
      'inLanguage': 'ja',
      'author': { '@type': 'Organization', 'name': 'study-apps.com', 'url': 'https://study-apps.com' },
      'publisher': { '@type': 'Organization', 'name': 'study-apps.com', 'url': 'https://study-apps.com' }
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      'mainEntity': faqItems
    }
  ]);
  modHtml = modHtml.replace('</head>', `<script type="application/ld+json">${modJsonLd}</script>\n  </head>`);

  fs.writeFileSync(path.join(modDir, 'index.html'), modHtml);
  generatedCount++;
}

// ── 用語集（全件）──────────────────────────────────
const glossaryTerms = Object.values(glossary);
const glossaryTermsHtml = glossaryTerms.map((t: { term: string; level: string; explanation: string }) =>
  `<div style="margin-bottom:16px;padding-bottom:16px;border-bottom:1px solid #eee">
    <strong style="font-size:1rem;color:#1e3a5f">${t.term}</strong>
    <span style="display:inline-block;font-size:0.75rem;color:#fff;background:${t.level === '基礎' ? '#16a34a' : t.level === '中級' ? '#2563eb' : '#9333ea'};padding:1px 6px;border-radius:4px;margin-left:8px">${t.level}</span>
    <p style="margin:6px 0 0;color:#444;line-height:1.6">${t.explanation.replace(/\$[^$]+\$/g, '').replace(/\*\*(.*?)\*\*/g, '$1')}</p>
  </div>`
).join('\n');

// B2: 用語集FAQPage JSON-LD（先頭20件）
const glossaryFaqItems = glossaryTerms.slice(0, 20).map(t => ({
  '@type': 'Question',
  'name': `${t.term}とは何ですか？`,
  'acceptedAnswer': {
    '@type': 'Answer',
    'text': t.explanation.replace(/\$[^$]+\$/g, '').replace(/\*\*(.*?)\*\*/g, '$1')
  }
}));

// A3: randomquiz 静的コンテンツ
const randomQuizSampleHtml = `<div style="background:#eff6ff;border-bottom:1px solid #bfdbfe;padding:10px 16px;font-size:0.88rem;text-align:center;margin-bottom:16px;border-radius:6px;max-width:860px;margin-left:auto;margin-right:auto"><a href="https://study-apps.com/" style="color:#1e3a8a;text-decoration:none;font-weight:600">← study-apps.com 学習サイト集トップへ</a></div><article id="static-fallback" style="font-family:sans-serif;line-height:1.7;max-width:860px;margin:0 auto;padding:24px 16px">
  <nav style="margin-bottom:16px"><a href="${BASE}/" style="color:#2563eb;text-decoration:none">← ホームへ戻る</a></nav>
  <h1 style="font-size:1.6rem;font-weight:700;border-bottom:2px solid #2563eb;padding-bottom:8px;margin-bottom:20px">全範囲ランダムクイズ</h1>
  <p style="color:#555;margin-bottom:20px">統計検定準1級の全36モジュール（360問）からランダムに出題するクイズです。確率論・推測統計・多変量解析・ベイズ統計・時系列分析など全範囲を横断的に復習できます。</p>
  <section style="background:#f0f7ff;padding:16px;border-radius:8px;margin-bottom:24px">
    <h2 style="font-size:1.1rem;font-weight:700;margin:0 0 10px">このクイズの特徴</h2>
    <ul style="color:#444;padding-left:20px;margin:0;line-height:2">
      <li>全36モジュール・360問からランダム出題</li>
      <li>各問題に詳しい解説付き</li>
      <li>どのモジュールの問題かが表示されるので復習しやすい</li>
      <li>スコアは自動集計（セッション内）</li>
    </ul>
  </section>
  <p style="color:#444">クイズを開始するには、JavaScriptを有効にしてこのページにアクセスしてください。</p>
  <h2 style="font-size:1.2rem;font-weight:700;margin:24px 0 12px">対象モジュール一覧</h2>
  <ul style="list-style:none;padding:0">
    ${modules.map(m => `<li style="margin-bottom:6px"><a href="${BASE}/${m.id}/" style="color:#2563eb;text-decoration:none;font-size:0.95rem">${m.title}</a></li>`).join('\n    ')}
  </ul>
  <p style="margin-top:24px"><a href="${BASE}/" style="color:#2563eb">← ホームへ戻る</a></p>
</article>`;

const staticPageContents: Record<string, { title: string; description: string; bodyHtml: string; jsonLd?: object }> = {
  glossary: {
    title: '用語集',
    description: '統計検定準1級の頻出用語を一覧で解説。確率分布・推測統計・多変量解析・ベイズ統計・時系列分析など試験に出る統計用語を網羅。',
    bodyHtml: `<div style="background:#eff6ff;border-bottom:1px solid #bfdbfe;padding:10px 16px;font-size:0.88rem;text-align:center;margin-bottom:16px;border-radius:6px;max-width:860px;margin-left:auto;margin-right:auto"><a href="https://study-apps.com/" style="color:#1e3a8a;text-decoration:none;font-weight:600">← study-apps.com 学習サイト集トップへ</a></div><article id="static-fallback" style="font-family:sans-serif;line-height:1.7;max-width:860px;margin:0 auto;padding:24px 16px">
  <nav style="margin-bottom:16px"><a href="${BASE}/" style="color:#2563eb;text-decoration:none">← ホームへ戻る</a></nav>
  <h1 style="font-size:1.6rem;font-weight:700;border-bottom:2px solid #2563eb;padding-bottom:8px;margin-bottom:20px">用語集</h1>
  <p style="color:#555;margin-bottom:24px">統計検定準1級の頻出用語を一覧で解説します。全${glossaryTerms.length}用語を難易度別に表示しています。</p>
${glossaryTermsHtml}
</article>`,
    jsonLd: { '@context': 'https://schema.org', '@type': 'FAQPage', 'mainEntity': glossaryFaqItems }
  },
  cheatsheet: {
    title: '公式集',
    description: '統計検定準1級の重要公式を一覧にまとめました。確率分布・推定・検定・回帰分析・主成分分析・ベイズ統計の公式をすばやく確認できます。',
    bodyHtml: buildCheatsheetHtml(BASE)
  },
  guide: {
    title: '試験ガイド',
    description: '統計検定準1級の試験概要・出題範囲・学習の進め方を解説。合格基準・試験時間・推奨学習時間など受験に必要な情報をまとめました。',
    bodyHtml: buildGuideHtml(BASE)
  },
  usecase: {
    title: '検定・分布の使い分けガイド',
    description: 'どんなデータ・問いにどの確率分布／検定／多変量解析を使うかを状況から逆引きできる早見表。二項・ポアソン・正規分布、t検定・分散分析・χ²検定、重回帰・主成分分析などの選び方を整理。',
    bodyHtml: buildUsecaseHtml(BASE)
  },
  about: {
    title: 'サイトについて',
    description: '統計検定準1級 学習リファレンスについて。サイトの目的・コンテンツ構成・利用方法を説明します。',
    bodyHtml: buildAboutHtml(BASE)
  },
  faq: {
    title: 'よくある質問',
    description: '統計検定準1級の試験・学習についてよくある質問（FAQ）。難易度・出題範囲・学習時間・P値の意味・主成分分析の使い方など。',
    bodyHtml: buildFaqPageHtml(BASE)
  },
  randomquiz: {
    title: '全範囲ランダムクイズ',
    description: '統計検定準1級の全36モジュール・360問からランダム出題するクイズ。確率論・推測統計・多変量解析・ベイズ統計・時系列分析を横断的に復習。',
    bodyHtml: randomQuizSampleHtml
  },
  privacy: {
    title: 'プライバシーポリシー',
    description: '統計検定準1級 学習リファレンスのプライバシーポリシー。個人情報の取り扱いについて説明します。',
    bodyHtml: `<div style="background:#eff6ff;border-bottom:1px solid #bfdbfe;padding:10px 16px;font-size:0.88rem;text-align:center;margin-bottom:16px;border-radius:6px;max-width:860px;margin-left:auto;margin-right:auto"><a href="https://study-apps.com/" style="color:#1e3a8a;text-decoration:none;font-weight:600">← study-apps.com 学習サイト集トップへ</a></div><article id="static-fallback" style="font-family:sans-serif;line-height:1.7;max-width:860px;margin:0 auto;padding:24px 16px">
  <nav style="margin-bottom:16px"><a href="${BASE}/" style="color:#2563eb;text-decoration:none">← ホームへ戻る</a></nav>
  <h1 style="font-size:1.6rem;font-weight:700;border-bottom:2px solid #2563eb;padding-bottom:8px;margin-bottom:8px">プライバシーポリシー</h1>
  <p style="color:#888;font-size:0.9rem;margin-bottom:24px">最終更新：2025年4月</p>
  <section style="margin-bottom:20px">
    <h2 style="font-size:1.15rem;font-weight:700;margin-bottom:8px">1. サイトについて</h2>
    <p style="color:#444">本サイトは、統計検定準1級の学習を支援することを目的とした個人運営のサイトです。</p>
  </section>
  <section style="margin-bottom:20px">
    <h2 style="font-size:1.15rem;font-weight:700;margin-bottom:8px">2. Google Analytics の利用</h2>
    <p style="color:#444">アクセス分析のためにGoogle Analyticsを使用しています。個人を特定する情報は収集しません。</p>
  </section>
  <section style="margin-bottom:20px">
    <h2 style="font-size:1.15rem;font-weight:700;margin-bottom:8px">3. Google AdSense の利用</h2>
    <p style="color:#444">広告配信のためにGoogle AdSenseを使用しています。<a href="https://www.google.com/settings/ads" style="color:#2563eb">広告設定ページ</a>でパーソナライズ広告を無効にできます。</p>
  </section>
  <section style="margin-bottom:20px">
    <h2 style="font-size:1.15rem;font-weight:700;margin-bottom:8px">4. 学習進捗データ</h2>
    <p style="color:#444">クイズの得点・完了状況はブラウザのローカルストレージにのみ保存され、外部サーバーへの送信はありません。</p>
  </section>
  <section>
    <h2 style="font-size:1.15rem;font-weight:700;margin-bottom:8px">5. 免責事項</h2>
    <p style="color:#444">本サイトの解説・問題・公式は学習目的で作成されており、内容の正確性を保証するものではありません。</p>
  </section>
  <p style="margin-top:32px"><a href="${BASE}/" style="color:#2563eb">← ホームへ戻る</a></p>
</article>`
  }
};

const staticPageNames = Object.keys(staticPageContents);

for (const [page, config] of Object.entries(staticPageContents)) {
  const pageDir = path.join(DIST_DIR, page);
  if (!fs.existsSync(pageDir)) {
    fs.mkdirSync(pageDir, { recursive: true });
  }

  const pageUrl = `${BASE_URL}/${page}/`;
  const pageTitle = `${config.title} | 統計検定 準1級 学習リファレンス`;

  let pageHtml = subDirTemplateHtml
    .replace('<title>統計検定 準1級 学習リファレンス</title>', `<title>${pageTitle}</title>`)
    .replace('<meta name="description" content="統計検定準1級の合格を目指す学習リファレンス。確率分布・推測統計・多変量解析・ベイズ統計をインタラクティブな図と数式で解説。" />', `<meta name="description" content="${config.description}" />`)
    .replace('<meta property="og:title" content="統計検定 準1級 学習リファレンス" />', `<meta property="og:title" content="${pageTitle}" />`)
    .replace('<meta property="og:description" content="確率分布・推測統計・多変量解析・ベイズ統計をインタラクティブな図と数式で解説する準1級対策サイト。" />', `<meta property="og:description" content="${config.description}" />`)
    .replace('<meta property="og:url" content="https://study-apps.com/stats-pre1/" />', `<meta property="og:url" content="${pageUrl}" />`)
    .replace('<link rel="canonical" href="https://study-apps.com/stats-pre1/" />', `<link rel="canonical" href="${pageUrl}" />`)
    .replace('<meta name="twitter:title" content="統計検定 準1級 学習リファレンス" />', `<meta name="twitter:title" content="${pageTitle}" />`)
    .replace('<meta name="twitter:description" content="統計検定準1級の合格を目指す学習リファレンス。確率分布・推測統計・多変量解析・ベイズ統計をインタラクティブな図と数式でわかりやすく解説。" />', `<meta name="twitter:description" content="${config.description}" />`);

  pageHtml = pageHtml.replace('<div id="root"></div>', `<div id="root">${config.bodyHtml}</div>`);

  // B2: glossary に FAQPage JSON-LD
  if (config.jsonLd) {
    const jsonLdStr = JSON.stringify(config.jsonLd);
    pageHtml = pageHtml.replace('</head>', `<script type="application/ld+json">${jsonLdStr}</script>\n  </head>`);
  }

  fs.writeFileSync(path.join(pageDir, 'index.html'), pageHtml);
  generatedCount++;
}

// ── sitemap.xml ──────────────────────────────────
const today = new Date().toISOString().split('T')[0];

const moduleUrls = modules.map(m =>
  `  <url>\n    <loc>${BASE_URL}/${m.id}/</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>0.8</priority>\n  </url>`
).join('\n');

const staticUrls = staticPageNames.map(p =>
  `  <url>\n    <loc>${BASE_URL}/${p}/</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>${p === 'faq' || p === 'cheatsheet' || p === 'guide' || p === 'usecase' ? '0.7' : '0.6'}</priority>\n  </url>`
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

fs.writeFileSync(path.join(DIST_DIR, 'sitemap.xml'), sitemapXml);

console.log(`✅ Generated ${generatedCount} static HTML files successfully!`);
console.log(`✅ Generated sitemap.xml with ${modules.length + staticPageNames.length + 1} URLs.`);

// ── OGP Image Generation ─────────────────────────
const ogpSvg = `<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
  <rect width="1200" height="630" fill="#f8fafc"/>
  <rect width="1200" height="12" fill="#0075de"/>
  <rect x="0" y="0" width="360" height="630" fill="#0075de" fill-opacity="0.05"/>
  <rect x="80" y="230" width="8" height="160" rx="4" fill="#0075de"/>
  <text x="112" y="300" font-family="Yu Gothic UI,Yu Gothic,Meiryo,Hiragino Sans,sans-serif" font-size="52" font-weight="700" fill="#0f172a">統計検定 準1級</text>
  <text x="112" y="368" font-family="Yu Gothic UI,Yu Gothic,Meiryo,Hiragino Sans,sans-serif" font-size="52" font-weight="700" fill="#0f172a">学習リファレンス</text>
  <text x="112" y="430" font-family="Yu Gothic UI,Yu Gothic,Meiryo,Hiragino Sans,sans-serif" font-size="26" fill="#64748b">確率分布・推測統計・多変量解析・ベイズ統計</text>
  <text x="1120" y="600" text-anchor="end" font-family="Arial,Helvetica,sans-serif" font-size="22" fill="#94a3b8">study-apps.com</text>
</svg>`;

const ogpBuffer = await sharp(Buffer.from(ogpSvg)).png().toBuffer();
fs.writeFileSync(path.join(DIST_DIR, 'ogp.png'), ogpBuffer);
console.log('✅ Generated ogp.png');
