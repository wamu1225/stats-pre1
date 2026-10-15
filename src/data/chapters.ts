// stats-app/src/data/chapters.ts
// 章の名前と色（App.tsx・scripts/prerender.ts・scripts/static-content.ts で共用）。
// 1章あたり3〜5モジュールを目安に区切る（8〜9モジュールの章は長すぎるとして 2026-10-12 に10章へ再編。2026-10-16 に1.9 を3つに分けて第4章が7モジュールになったため、正規分布と分布の変換／標本分布と極限定理の2章に分割し11章）。7モジュール以上になったら章の分割を検討します。
// 各モジュールがどの章に入るかは modules.ts の chapter、章内の順番は modules 配列の並び順で決まる
export interface ChapterColor { bg: string; text: string; accent: string; light: string; }

export const chapterNames: Record<number, string> = {
  1: '確率論の基礎',
  2: '確率分布と特性値',
  3: 'いろいろな確率分布',
  4: '正規分布と分布の変換',
  5: '標本分布と極限定理',
  6: '推定',
  7: '仮説検定',
  8: '回帰モデルとモデル選択',
  9: '多変量解析：次元の縮約と分類',
  10: 'ベイズ統計と確率過程',
  11: 'さまざまなデータの解析',
};

export const chapterColors: Record<number, ChapterColor> = {
  1: { bg: '#e0e7ff', text: '#3730a3', accent: '#4338ca', light: '#eef2ff' },  // インディゴ
  2: { bg: '#dbeafe', text: '#1e40af', accent: '#2563eb', light: '#eff6ff' },  // 青
  3: { bg: '#cffafe', text: '#155e75', accent: '#0891b2', light: '#ecfeff' },  // シアン
  4: { bg: '#d1fae5', text: '#065f46', accent: '#059669', light: '#ecfdf5' },  // 緑
  5: { bg: '#ecfccb', text: '#3f6212', accent: '#65a30d', light: '#f7fee7' },  // 黄緑
  6: { bg: '#fef3c7', text: '#92400e', accent: '#d97706', light: '#fffbeb' },  // 琥珀
  7: { bg: '#ffedd5', text: '#9a3412', accent: '#ea580c', light: '#fff7ed' },  // 橙
  8: { bg: '#ede9fe', text: '#5b21b6', accent: '#7c3aed', light: '#f5f3ff' },  // 紫
  9: { bg: '#fae8ff', text: '#86198f', accent: '#c026d3', light: '#fdf4ff' },  // 赤紫
  10: { bg: '#fce7f3', text: '#9d174d', accent: '#db2777', light: '#fdf2f8' },  // ピンク
  11: { bg: '#ccfbf1', text: '#115e59', accent: '#0f766e', light: '#f0fdfa' },  // 青緑
};
