// stats-app/src/data/chapters.ts
// 章の名前と色（App.tsx・scripts/prerender.ts・scripts/static-content.ts で共用）。
// 1章あたり3〜5モジュールを目安に区切る（8〜9モジュールの章は長すぎるとして 2026-10-12 に10章へ再編。2026-10-16 に1.9 を3つに分けて第4章が7モジュールになったため、正規分布と分布の変換／標本分布と極限定理の2章に分割し11章）。7モジュール以上になったら章の分割を検討します。2026-11-25 に上位10モジュールを分割して7〜11モジュールの章が5つできたため、17章に再編。
// 各モジュールがどの章に入るかは modules.ts の chapter、章内の順番は modules 配列の並び順で決まる
export interface ChapterColor { bg: string; text: string; accent: string; light: string; }

export const chapterNames: Record<number, string> = {
  1: '確率論の基礎',
  2: '確率分布と特性値',
  3: 'いろいろな確率分布',
  4: '正規分布と分布の変換',
  5: '標本分布と極限定理',
  6: '点推定',
  7: '区間推定と漸近理論',
  8: '仮説検定の考え方',
  9: '検定の実践とノンパラメトリック検定',
  10: '分散分析と実験計画法',
  11: '回帰分析',
  12: '一般化線形モデルとモデル選択',
  13: '多変量解析：次元の縮約',
  14: '多変量解析：判別と分類',
  15: 'ベイズ統計と確率過程',
  16: '分割表・生存時間・標本調査',
  17: 'シミュレーションと因果推論',
};

export const chapterColors: Record<number, ChapterColor> = {
  1: { bg: '#e0e7ff', text: '#3730a3', accent: '#4338ca', light: '#eef2ff' },  // インディゴ
  2: { bg: '#dbeafe', text: '#1e40af', accent: '#2563eb', light: '#eff6ff' },  // 青
  3: { bg: '#cffafe', text: '#155e75', accent: '#0891b2', light: '#ecfeff' },  // シアン
  4: { bg: '#d1fae5', text: '#065f46', accent: '#059669', light: '#ecfdf5' },  // エメラルド
  5: { bg: '#ecfccb', text: '#3f6212', accent: '#65a30d', light: '#f7fee7' },  // 黄緑
  6: { bg: '#fef3c7', text: '#92400e', accent: '#d97706', light: '#fffbeb' },  // 琥珀
  7: { bg: '#fef9c3', text: '#854d0e', accent: '#ca8a04', light: '#fefce8' },  // 黄
  8: { bg: '#ffedd5', text: '#9a3412', accent: '#ea580c', light: '#fff7ed' },  // 橙
  9: { bg: '#fee2e2', text: '#991b1b', accent: '#dc2626', light: '#fef2f2' },  // 赤
  10: { bg: '#ffe4e6', text: '#9f1239', accent: '#e11d48', light: '#fff1f2' },  // ローズ
  11: { bg: '#ede9fe', text: '#5b21b6', accent: '#7c3aed', light: '#f5f3ff' },  // 紫
  12: { bg: '#f3e8ff', text: '#6b21a8', accent: '#9333ea', light: '#faf5ff' },  // パープル
  13: { bg: '#fae8ff', text: '#86198f', accent: '#c026d3', light: '#fdf4ff' },  // 赤紫
  14: { bg: '#fce7f3', text: '#9d174d', accent: '#db2777', light: '#fdf2f8' },  // ピンク
  15: { bg: '#e0f2fe', text: '#075985', accent: '#0284c7', light: '#f0f9ff' },  // 空色
  16: { bg: '#ccfbf1', text: '#115e59', accent: '#0f766e', light: '#f0fdfa' },  // 青緑
  17: { bg: '#dcfce7', text: '#166534', accent: '#16a34a', light: '#f0fdf4' },  // 緑
};
