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
// 注: faq/ はポータル独自ページとして再構築されたため除外（PORTAL_PROTECTED 参照）
const LEGACY_STATIC_PAGES = ['glossary', 'cheatsheet', 'guide', 'randomquiz'];

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

// ── 5. SITES_REGISTRY = サブサイト情報の Single Source of Truth ──
// サブサイトを追加するときはこのリストに1エントリ追加するだけで、
// XMLサイトマップ・404.html・ポータルindex.htmlのカード/JSON-LD・
// ポータルsitemap.htmlの全てが自動更新される。
type Site = {
  id: string;
  name: string;
  shortName: string;        // 404やJSON-LDで使う簡潔名
  tag: string;              // カードの小バッジ
  tagModifier?: string;     // カードバッジの追加クラス（例: "kids"）
  target: string;           // カードの「対象」行
  desc: string;             // カード本文
  features: string[];       // カードの箇条書き
  sitemapMeta: string;      // HTMLサイトマップの一行説明
  sitemapPages: { label: string; subpath: string }[]; // HTMLサイトマップ内の下層リンク
  aboutDesc: string;        // about.html のサイト位置づけリストで使う1〜2文の説明
  useCaseLabel: string;     // 使い方ガイド「○○な方」のラベル
  useCaseDetail: string;    // 使い方ガイドの本文（HTMLを含むことを許容）
  changefreq: string;
  priority: string;
};

const SITES_REGISTRY: Site[] = [
  {
    id: 'stats-pre1',
    name: '統計検定 準1級 学習リファレンス',
    shortName: '統計検定 準1級 学習リファレンス',
    tag: '統計検定',
    target: '統計学を体系的に学びたい社会人・大学生 / 36モジュール・360問',
    desc: '確率分布・推測統計・多変量解析・ベイズ統計・時系列分析の全範囲を、インタラクティブなグラフと数式で解説。最尤推定・主成分分析・MCMC まで踏み込みます。',
    features: [
      'スライダーで分布の形を動かせるインタラクティブグラフ',
      '各モジュールに10問の確認クイズ',
      '用語集・公式集・全範囲ランダムクイズ付き',
    ],
    sitemapMeta: '全36モジュール・360問のクイズ・インタラクティブグラフ／確率分布・推測統計・多変量解析・ベイズ統計・時系列分析',
    sitemapPages: [
      { label: 'トップ・モジュール一覧', subpath: '' },
      { label: '用語集', subpath: 'glossary/' },
      { label: '公式集', subpath: 'cheatsheet/' },
      { label: '試験ガイド', subpath: 'guide/' },
      { label: 'よくある質問', subpath: 'faq/' },
      { label: '全範囲ランダムクイズ', subpath: 'randomquiz/' },
      { label: 'サイトについて', subpath: 'about/' },
      { label: 'プライバシーポリシー', subpath: 'privacy/' },
    ],
    aboutDesc: '大学院・実務レベルの統計学。多変量解析・ベイズ統計・時系列まで網羅する36モジュール。インタラクティブグラフあり。',
    useCaseLabel: '上級・実務レベルの統計学を学びたい方',
    useCaseDetail: '<a href="/stats-pre1/">統計検定準1級</a>で多変量解析・ベイズ統計・時系列分析まで網羅しています。全範囲ランダムクイズ（360問）で弱点を炙り出せます。',
    changefreq: 'weekly',
    priority: '0.9',
  },
  {
    id: 'stats-g2',
    name: '統計検定 2級 学習リファレンス',
    shortName: '統計検定 2級 学習リファレンス',
    tag: '統計検定',
    target: '大学初年級レベルの統計学 / 14モジュール',
    desc: '記述統計・確率分布・推定・検定・回帰分析を、図解と練習問題で身につけます。準1級に進む前の橋渡しとしても利用できます。',
    features: [
      '14モジュール構成、各10問のクイズ付き',
      'KaTeX による数式表示・Recharts による作図',
    ],
    sitemapMeta: '学部レベルの統計学・14モジュール／確率分布・推定・検定・回帰分析',
    sitemapPages: [
      { label: 'トップ・モジュール一覧', subpath: '' },
      { label: '用語集', subpath: 'glossary/' },
      { label: '試験ガイド', subpath: 'guide/' },
      { label: 'サイトについて', subpath: 'about/' },
      { label: 'プライバシーポリシー', subpath: 'privacy/' },
    ],
    aboutDesc: '大学初年級レベルの推測統計。記述統計・確率分布・推定・検定・回帰分析を14モジュールで整理。',
    useCaseLabel: '学部レベルの推測統計を学びたい方',
    useCaseDetail: '<a href="/stats-g2/">統計検定2級</a>で推定・検定・回帰分析を扱います。',
    changefreq: 'weekly',
    priority: '0.9',
  },
  {
    id: 'stats-g3',
    name: '統計検定 3級 学習リファレンス',
    shortName: '統計検定 3級 学習リファレンス',
    tag: '統計検定',
    target: '高校レベルの統計学 / 13モジュール',
    desc: 'データの整理・代表値・散らばり・確率の基礎・標本調査など、統計検定3級の出題範囲を高校生でも読める言葉でまとめています。',
    features: [
      '13モジュール構成、各10問のクイズ付き',
      '高校の「データの分析」分野の総まとめにも使えます',
    ],
    sitemapMeta: '高校レベルの統計学・13モジュール／データの整理・代表値・確率の基礎',
    sitemapPages: [
      { label: 'トップ・モジュール一覧', subpath: '' },
      { label: '用語集', subpath: 'glossary/' },
      { label: '試験ガイド', subpath: 'guide/' },
      { label: 'サイトについて', subpath: 'about/' },
      { label: 'プライバシーポリシー', subpath: 'privacy/' },
    ],
    aboutDesc: '高校レベルの統計学。データの整理・代表値・散らばり・確率の基礎・標本調査を13モジュールで整理。',
    useCaseLabel: '高校レベルの統計を確認したい方',
    useCaseDetail: '<a href="/stats-g3/">統計検定3級</a>でデータの整理・代表値・確率の基礎を扱います。高校の「データの分析」分野の総まとめとしても使えます。',
    changefreq: 'weekly',
    priority: '0.9',
  },
  {
    id: 'mhm-g3',
    name: 'メンタルヘルスマネジメント検定 Ⅲ種',
    shortName: 'メンタルヘルスマネジメント検定 Ⅲ種 学習サイト',
    tag: 'こころ・健康',
    target: 'セルフケアコース（社会人初学者向け）/ 7モジュール',
    desc: 'ストレスのメカニズム、セルフケア、職場で利用できる相談窓口など、Ⅲ種試験（セルフケアコース）の出題範囲を平易な言葉で整理しました。',
    features: [
      'Chapter 1〜6 を7モジュールに整理',
      '用語集・全範囲ランダムクイズ・試験ガイド付き',
    ],
    sitemapMeta: 'セルフケアコース・7モジュール／ストレスの仕組み・気づき方・対処法・相談窓口',
    sitemapPages: [
      { label: 'トップ・モジュール一覧', subpath: '' },
      { label: '用語集', subpath: 'glossary/' },
      { label: '試験ガイド', subpath: 'guide/' },
      { label: 'サイトについて', subpath: 'about/' },
      { label: 'プライバシーポリシー', subpath: 'privacy/' },
    ],
    aboutDesc: 'メンタルヘルスマネジメント検定Ⅲ種（セルフケアコース）の出題範囲を7モジュールで整理。ストレス対処と相談窓口の使い方を扱う。',
    useCaseLabel: '仕事のストレスや職場の不調に関心のある方',
    useCaseDetail: '<a href="/mhm-g3/">メンタルヘルスマネジメント検定Ⅲ種</a>でセルフケア・ストレスへの気づき・相談窓口の使い方を扱います。資格取得の有無に関わらず役立ちます。',
    changefreq: 'weekly',
    priority: '0.9',
  },
  {
    id: 'bizlaw-g3',
    name: 'ビジネス実務法務検定 3級',
    shortName: 'ビジネス実務法務検定 3級 学習サイト',
    tag: 'ビジネス法務',
    target: 'はじめてビジネス法務を学ぶ社会人 / 18モジュール・180問',
    desc: '民法・商法・会社法・労働法・知的財産権など、ビジネスの現場で必要な法律知識を3級レベルでまとめました。条文の暗記ではなく「なぜそのルールがあるか」を理解する構成です。',
    features: [
      '18モジュール・180問の確認クイズ',
      '身近な契約・労務トラブルの事例を多数収録',
    ],
    sitemapMeta: '18モジュール・180問のクイズ／民法・商法・会社法・労働法・知的財産権・倒産法',
    sitemapPages: [
      { label: 'トップ・モジュール一覧', subpath: '' },
      { label: '用語集', subpath: 'glossary/' },
      { label: '試験ガイド', subpath: 'guide/' },
      { label: 'サイトについて', subpath: 'about/' },
      { label: 'プライバシーポリシー', subpath: 'privacy/' },
    ],
    aboutDesc: 'ビジネス実務法務検定3級の出題範囲。民法・商法・会社法・労働法・知的財産権の基本を18モジュール・180問で整理。',
    useCaseLabel: 'ビジネスで法律トラブルを避けたい方',
    useCaseDetail: '<a href="/bizlaw-g3/">ビジネス実務法務検定3級</a>で契約・労務・著作権など、社会人なら知っておきたい基本知識をカバーします。',
    changefreq: 'weekly',
    priority: '0.9',
  },
  {
    id: 'beets-info',
    name: 'ビーツの基本ガイド',
    shortName: 'ビーツの基本ガイド',
    tag: '食・健康',
    target: 'ビーツに興味を持った一般家庭・健康志向の方 / 6セクション',
    desc: 'ビーツ（テーブルビート）の栄養と健康効果、品種、産地、レシピ、選び方、保存方法、注意点まで網羅した総合情報サイト。科学的根拠に基づいて分かりやすく解説します。',
    features: [
      '基礎・栄養・栽培・レシピ・保存・注意点の6セクション',
      '硝酸塩・ベタレインなど機能性成分の作用を平易に解説',
    ],
    sitemapMeta: '食品・健康情報サイト・6セクション／ビーツの栄養・効能・レシピ・保存方法・注意点',
    sitemapPages: [
      { label: 'トップ', subpath: '' },
      { label: '基礎知識', subpath: 'basics/' },
      { label: '栄養と健康効果', subpath: 'nutrition/' },
      { label: '栽培・産地・旬', subpath: 'cultivation/' },
      { label: '料理とレシピ', subpath: 'recipes/' },
      { label: '選び方と保存', subpath: 'storage/' },
      { label: '注意点と副作用', subpath: 'cautions/' },
      { label: 'サイトについて', subpath: 'about/' },
      { label: 'プライバシーポリシー', subpath: 'privacy/' },
    ],
    aboutDesc: 'ビーツ（テーブルビート）の基礎・栄養・産地・レシピ・保存・注意点を6セクションで整理した食品情報サイト。',
    useCaseLabel: 'ビーツや食材情報に興味のある方',
    useCaseDetail: '<a href="/beets-info/">ビーツの基本ガイド</a>でビーツの栄養・効能・選び方・調理・注意点をまとめています。',
    changefreq: 'weekly',
    priority: '0.8',
  },
  {
    id: 'monstera-info',
    name: 'モンステラの基本ガイド',
    shortName: 'モンステラの基本ガイド',
    tag: '園芸・観葉植物',
    target: 'モンステラに興味のある方・観葉植物初心者 / 6セクション',
    desc: '人気観葉植物モンステラ（Monstera deliciosa）の基礎知識、育て方、剪定や増やし方、病害虫対処、選び方、ペット安全性まで網羅した総合情報サイト。',
    features: [
      '基礎知識・育て方・季節管理／剪定／増やし方・トラブル・選び方・安全性の6セクション',
      '不溶性シュウ酸カルシウムによるペット誤食リスクをASPCAベースで整理',
    ],
    sitemapMeta: '園芸情報サイト・6セクション／モンステラの育て方・剪定・増やし方・病害虫・選び方・ペット安全性',
    sitemapPages: [
      { label: 'トップ', subpath: '' },
      { label: '症状逆引き診断', subpath: 'diagnose/' },
      { label: '品種判別ガイド', subpath: 'variety-check/' },
      { label: '斑入り苗チェックリスト', subpath: 'variegated-check/' },
      { label: '基礎知識', subpath: 'basics/' },
      { label: '育て方の基本', subpath: 'growing/' },
      { label: '季節管理・剪定・増やし方', subpath: 'seasonal/' },
      { label: '病害虫・トラブル', subpath: 'troubles/' },
      { label: '選び方・購入後の管理', subpath: 'selection/' },
      { label: '安全性・ペット注意', subpath: 'safety/' },
      { label: '用語集', subpath: 'glossary/' },
      { label: 'サイトについて', subpath: 'about/' },
      { label: 'プライバシーポリシー', subpath: 'privacy/' },
    ],
    aboutDesc: 'モンステラ（Monstera deliciosa）の基礎知識・育て方・剪定や増やし方・病害虫・選び方・ペット安全性を6セクションで整理した観葉植物情報サイト。',
    useCaseLabel: 'モンステラを育てている・育てたい方',
    useCaseDetail: '<a href="/monstera-info/">モンステラの基本ガイド</a>で育て方・剪定・増やし方・病害虫対処・選び方・ペット安全性を扱います。',
    changefreq: 'weekly',
    priority: '0.8',
  },
  {
    id: 'densha_asobi',
    name: 'でんしゃあそび',
    shortName: 'でんしゃあそび（幼児・小学生向けミニゲーム集）',
    tag: 'こども向け',
    tagModifier: 'kids',
    target: '幼稚園〜小学3年生 / 12種のミニゲーム',
    desc: '電車での移動中の暇つぶし用に作った、ひらがな探し・時計の読み・暗算・記憶ゲームなどのミニゲーム集です。PWA対応でオフラインでも遊べます。',
    features: [
      '12ゲーム：ひらがな・時計・算数・記憶など',
      'オフライン対応（PWA）・スマホ／タブレット推奨',
    ],
    sitemapMeta: 'こども向け（幼稚園〜小学3年生）・12種のミニゲーム／オフライン対応（PWA）',
    sitemapPages: [
      { label: 'トップ・ゲーム一覧', subpath: '' },
    ],
    aboutDesc: '幼稚園〜小学3年生向けの12種のミニゲーム集。PWA対応でオフライン利用可。',
    useCaseLabel: '子どもとの移動時間を有効活用したい方',
    useCaseDetail: '<a href="/densha_asobi/">でんしゃあそび</a>はひらがな探し・時計の読み・暗算・記憶ゲームなど12種のミニゲーム集です。PWA対応でオフラインでも遊べます。',
    changefreq: 'weekly',
    priority: '0.8',
  },
  {
    id: 'kuku-oukoku',
    name: '九九おうこく',
    shortName: '九九おうこく（小学2年生向け九九学習ゲーム）',
    tag: '算数ゲーム',
    tagModifier: 'kids',
    target: '小学2年生〜 / 九九学習＋王国育成のハイブリッド',
    desc: '九九を解くたびに「知識ポイント(KP)」がたまり、なかまが集まり、おうこくが大きくなる学習ゲーム。無料・登録不要で、ブラウザだけで遊べます。',
    features: [
      'まなぶ・アタック・だんいにんてい・おうこくの4モード',
      '段階的に解放される進行設計。スマホ・タブレット・PC 対応',
    ],
    sitemapMeta: 'こども向け（小学2年生〜）／九九の学習ゲーム・段位認定・王国育成（放置要素）',
    sitemapPages: [
      { label: 'トップ', subpath: '' },
      { label: 'あそびかた', subpath: 'guide/' },
      { label: 'サイトについて', subpath: 'about/' },
      { label: 'プライバシーポリシー', subpath: 'privacy/' },
    ],
    aboutDesc: '小学2年生向けの九九学習ゲーム。解くたびに王国が広がる体験で、九九の習得を楽しく続けられる。無料・登録不要。',
    useCaseLabel: 'お子さんの九九学習をサポートしたい方',
    useCaseDetail: '<a href="/kuku-oukoku/">九九おうこく</a>で1の段から9の段までを楽しく学べます。問題を解くたびに王国が広がり、なかまが自動でKPを集めてくれる放置ゲーム要素もあります。',
    changefreq: 'weekly',
    priority: '0.8',
  },
];

const PORTAL_PAGES_SITEMAP = [
  { path: '/',                changefreq: 'weekly',  priority: '1.0' },
  { path: '/about/',          changefreq: 'monthly', priority: '0.7' },
  { path: '/privacy/',        changefreq: 'yearly',  priority: '0.4' },
  { path: '/contact/',        changefreq: 'yearly',  priority: '0.4' },
  { path: '/sitemap/',        changefreq: 'monthly', priority: '0.4' },
  { path: '/terms/',          changefreq: 'yearly',  priority: '0.4' },
  { path: '/learning-guide/', changefreq: 'monthly', priority: '0.8' },
  { path: '/faq/',            changefreq: 'monthly', priority: '0.7' },
];

const today = new Date().toISOString().split('T')[0];

// ── 5a. portal sitemap.xml の自動生成 ──────────────
const sitemapEntries = [
  ...PORTAL_PAGES_SITEMAP,
  ...SITES_REGISTRY.map((s) => ({ path: `/${s.id}/`, changefreq: s.changefreq, priority: s.priority })),
];
const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapEntries.map(e => `  <url>
    <loc>${BASE_URL}${e.path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${e.changefreq}</changefreq>
    <priority>${e.priority}</priority>
  </url>`).join('\n')}
</urlset>
`;
fs.writeFileSync(path.join(PORTAL_DIR, 'sitemap.xml'), sitemapXml);
console.log(`✅ Portal sitemap.xml regenerated (${sitemapEntries.length} URLs, lastmod=${today})`);

// ── 5b. portal 404.html の自動生成 ──────────────
const notFoundHtml = `<!doctype html>
<html lang="ja">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="robots" content="noindex, follow" />
    <title>ページが見つかりません｜study-apps.com</title>
    <meta name="description" content="お探しのページが見つかりません。study-apps.com の学習サイト一覧からお探しのコンテンツへお進みください。" />
    <script>
      // 旧URL（stats-pre1 がルート直下にあった時代の /1.X-name/ や /2.X-name/）→ /stats-pre1/ 配下へ
      // クライアントリダイレクトで救済（Search Console の 404 を解消し、被リンクの SEO 価値を維持）
      (function () {
        var p = window.location.pathname;
        if (/^\\/[12]\\.[0-9]+[a-z]?-[a-z0-9-]+\\/?$/.test(p)) {
          var newPath = '/stats-pre1' + (p.charAt(p.length - 1) === '/' ? p : p + '/');
          window.location.replace(newPath + window.location.search + window.location.hash);
          return;
        }
      })();
    </script>
    <!-- Google tag (gtag.js) -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-G6K27V3P4S"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-G6K27V3P4S');
    </script>
    <style>
      body { font-family: "Yu Gothic UI","Hiragino Sans",sans-serif; background: #f8fafc; color: #1f2937; margin: 0; padding: 80px 20px; line-height: 1.8; }
      .box { max-width: 640px; margin: 0 auto; background: #fff; border: 1px solid #e5e7eb; border-radius: 12px; padding: 32px 28px; text-align: center; }
      h1 { font-size: 1.5rem; margin: 0 0 12px; color: #1e3a8a; }
      .code { display: inline-block; background: #eff6ff; color: #1e3a8a; padding: 2px 10px; border-radius: 999px; font-weight: 700; margin-bottom: 12px; font-size: 0.85rem; }
      ul { text-align: left; padding-left: 22px; margin: 16px 0 0; }
      ul a { color: #2563eb; text-decoration: none; }
      ul a:hover { text-decoration: underline; }
      .home { display: inline-block; margin-top: 20px; background: #2563eb; color: #fff; padding: 10px 24px; text-decoration: none; border-radius: 6px; font-weight: 700; }
    </style>
  </head>
  <body>
    <div class="box">
      <span class="code">404 Not Found</span>
      <h1>ページが見つかりません</h1>
      <p>お探しのページは移動・削除されたか、URL が間違っている可能性があります。</p>
      <ul>
${SITES_REGISTRY.map((s) => `        <li><a href="/${s.id}/">${s.name}</a></li>`).join('\n')}
      </ul>
      <a class="home" href="/">study-apps.com トップへ</a>
    </div>
  </body>
</html>
`;
fs.writeFileSync(path.join(PORTAL_DIR, '404.html'), notFoundHtml);
console.log(`✅ Portal 404.html regenerated (${SITES_REGISTRY.length} sites listed)`);

// ── 5c. portal index.html のサイトカード + JSON-LD 自動更新 ──
const portalIndexPath = path.join(PORTAL_DIR, 'index.html');
if (fs.existsSync(portalIndexPath)) {
  let portalIndex = fs.readFileSync(portalIndexPath, 'utf-8');

  // JSON-LD ItemList: "itemListElement": [...] の配列内容を再生成
  const itemListJson = SITES_REGISTRY.map((s, i) =>
    `            { "@type": "ListItem", "position": ${i + 1}, "name": "${s.shortName}", "url": "${BASE_URL}/${s.id}/" }`
  ).join(',\n');
  portalIndex = portalIndex.replace(
    /("itemListElement"\s*:\s*\[)[\s\S]*?(\s*\])/,
    `$1\n${itemListJson}\n          $2`
  );

  // サイトカード: <div class="cards"> ... </div> の中身を全て置換
  const cardsHtml = SITES_REGISTRY.map((s) => `
            <article class="card">
              <span class="tag${s.tagModifier ? ' ' + s.tagModifier : ''}">${s.tag}</span>
              <h3>${s.name}</h3>
              <p class="meta">対象：${s.target}</p>
              <p class="desc">${s.desc}</p>
              <ul class="features">
${s.features.map(f => `                <li>${f}</li>`).join('\n')}
              </ul>
              <a class="open" href="/${s.id}/">サイトを開く</a>
            </article>`).join('\n');
  const cardsBlock = `<div class="cards">\n            <!-- AUTO_SITES_START -->${cardsHtml}\n            <!-- AUTO_SITES_END -->\n          </div>`;
  portalIndex = portalIndex.replace(
    /<div class="cards">[\s\S]*?<\/div>\s*<\/section>/,
    `${cardsBlock}\n        </section>`
  );

  // 使い方ガイド: <ol> ... </ol> の中身を SITES_REGISTRY から自動生成
  const useCaseHtml = SITES_REGISTRY.map((s) =>
    `              <li><strong>${s.useCaseLabel}</strong>：${s.useCaseDetail}</li>`
  ).join('\n');
  const useCaseBlock = `<ol>\n              <!-- AUTO_USECASE_START -->\n${useCaseHtml}\n              <!-- AUTO_USECASE_END -->\n            </ol>`;
  portalIndex = portalIndex.replace(
    /<div class="guide">\s*<ol>[\s\S]*?<\/ol>\s*<\/div>/,
    `<div class="guide">\n            ${useCaseBlock}\n          </div>`
  );

  fs.writeFileSync(portalIndexPath, portalIndex);
  console.log(`✅ Portal index.html regenerated (${SITES_REGISTRY.length} site cards + JSON-LD + use cases)`);
} else {
  console.warn(`⚠️  ${portalIndexPath} not found, skipping index.html update`);
}

// ── 5e. portal about/index.html のサイト一覧自動更新 ──
const portalAboutPath = path.join(PORTAL_DIR, 'about', 'index.html');
if (fs.existsSync(portalAboutPath)) {
  let portalAbout = fs.readFileSync(portalAboutPath, 'utf-8');

  const aboutItemsHtml = SITES_REGISTRY.map((s) =>
    `            <div class="item"><strong>${s.name}（/${s.id}/）</strong> — ${s.aboutDesc}</div>`
  ).join('\n');
  const aboutBlock = `<div class="grid">\n            <!-- AUTO_ABOUT_SITES_START -->\n${aboutItemsHtml}\n            <!-- AUTO_ABOUT_SITES_END -->\n          </div>`;

  portalAbout = portalAbout.replace(
    /<div class="grid">[\s\S]*?<\/div>(?=\s*<p>|\s*<h2>|\s*<\/article>)/,
    aboutBlock
  );

  fs.writeFileSync(portalAboutPath, portalAbout);
  console.log(`✅ Portal about/index.html regenerated (${SITES_REGISTRY.length} sites)`);
} else {
  console.warn(`⚠️  ${portalAboutPath} not found, skipping about update`);
}

// ── 5d. portal sitemap/index.html のサブサイト一覧自動更新 ──
const portalSitemapPath = path.join(PORTAL_DIR, 'sitemap', 'index.html');
if (fs.existsSync(portalSitemapPath)) {
  let portalSitemap = fs.readFileSync(portalSitemapPath, 'utf-8');

  const sitemapGroupsHtml = SITES_REGISTRY.map((s) => `
          <div class="group">
            <h3><a href="/${s.id}/">${s.name}</a></h3>
            <p class="meta">${s.sitemapMeta}</p>
            <ul>
${s.sitemapPages.map(p => `              <li><a href="/${s.id}/${p.subpath}">${p.label}</a></li>`).join('\n')}
            </ul>
          </div>`).join('\n');

  // <h2>学習サイト一覧</h2> 以降、</section> までの <div class="group"> を全て置換
  const groupsBlock = `<h2>学習サイト一覧</h2>\n          <!-- AUTO_SITEMAP_GROUPS_START -->${sitemapGroupsHtml}\n          <!-- AUTO_SITEMAP_GROUPS_END -->`;
  portalSitemap = portalSitemap.replace(
    /<h2>学習サイト一覧<\/h2>[\s\S]*?(<\/section>)/,
    `${groupsBlock}\n        $1`
  );

  fs.writeFileSync(portalSitemapPath, portalSitemap);
  console.log(`✅ Portal sitemap/index.html regenerated (${SITES_REGISTRY.length} site groups)`);
} else {
  console.warn(`⚠️  ${portalSitemapPath} not found, skipping sitemap update`);
}

// ── 6. git commit & push ─────────────────────────
console.log('--- Committing and pushing to wamu1225.github.io ---');

const statusOutput = execSync(`git -C "${PORTAL_DIR}" status --porcelain`, { encoding: 'utf-8' });
if (!statusOutput.trim()) {
  console.log('No changes to commit on portal repo. Skip push.');
} else {
  execSync(`git -C "${PORTAL_DIR}" add -A`, { stdio: 'inherit' });
  execSync(
    `git -C "${PORTAL_DIR}" commit -m "chore: sync portal (sitemap + ads.txt) from stats-pre1 (${today})"`,
    { stdio: 'inherit' }
  );
  execSync(`git -C "${PORTAL_DIR}" push origin main`, { stdio: 'inherit' });
  console.log('✅ Root domain (portal) deployed successfully!');
}
