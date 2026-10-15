// stats-app/src/data/examGuide.ts
// 試験ガイドの本文（App の ExamGuide.tsx と scripts/static-content.ts の静的HTMLで共用）。
// 試験の事実は統計検定公式サイトで確かめたものだけを書く（確認日は CHECKED_AT）。
// 出典を確かめられない数字や評判は書かない（学習時間は、本文を確かめた体験記の数字を出典つきで並べる）
export const CHECKED_AT = '2026年10月12日';

export const OFFICIAL = {
  top: 'https://www.toukei-kentei.jp/',
  grade: 'https://www.toukei-kentei.jp/grade/grade_pre-1',
  apply: 'https://www.toukei-kentei.jp/info/other_grades_apply/',
  range2027: 'https://www.toukei-kentei.jp/hubfs/files/20.grade/grade_range/grade1semi_hani_20270101.pdf',
  range2018: 'https://www.toukei-kentei.jp/hubfs/files/grade_range/grade1semi_hani_190628_2.pdf',
};

export const overview: { label: string; value: string }[] = [
  { label: '実施方式', value: 'CBT方式（試験会場のパソコンで受験）' },
  { label: '出題形式', value: '5肢選択問題と数値入力問題' },
  { label: '問題数と試験時間', value: '25〜30問・90分（1問あたり3分ほど）' },
  { label: '合格基準', value: '100点満点で60点以上' },
  { label: '受験料（税込）', value: '一般 8,000円、学割 6,000円' },
  { label: '電卓', value: '四則演算・百分率・平方根が計算できる一般電卓か事務用電卓を1台まで（関数電卓・プログラム電卓などは不可）' },
  { label: '再受験', value: '同じ級は、前回の受験から7日（168時間）以上あければ受けられます' },
];

export const overviewTip = '90分で25〜30問を解くので、典型的な問題は考え込まずに解ける状態まで練習しておくと、難しい問題に時間を回せます。';

export const rangeParagraphs: string[] = [
  '出題範囲表は、確率と確率変数、種々の確率分布、統計的推測（推定・検定）、マルコフ連鎖と確率過程、回帰分析、分散分析と実験計画法、標本調査法、多変量解析、時系列解析、分割表、不完全データ、モデル選択、ベイズ法、シミュレーションなどの大項目でできています。範囲表は出題の頻度や配点を示していないので、このサイトでは分野ごとの重みづけをしていません。',
  '2027年1月1日の受験からは、新しい範囲表に変わります。いちばん大きな変更は、「統計的因果推論」（因果ダイアグラム、バックドア基準など）が大項目として加わったことです。ほかにも、スルツキーの補題、バイアス・バリアンス分解、Mallows の Cp 規準、Box-Cox 変換などの用語が加わりました。このサイトでは、統計的因果推論を「3.7 統計的因果推論」に、そのほかの用語も該当するモジュールに解説を加えています。',
];

// 学習時間：公式の目安は無いので、合格者が自分で書いた体験記の数字を、出典つきでそのまま並べる。
// 各記事は 2026-10-12 に本文を開いて、時間・前提・得点を確かめた（検索結果の要約は使わない）
export const studyTimeSummary: string[] = [
  '公式の目安は出ていません。代わりに、合格者が自分で書いた体験記8本の数字を並べます。',
  '多くは200〜300時間です。統計検定2級の知識がある人で200時間前後、統計がほぼ初めての人は2級の範囲と合わせて300〜450時間かかっています。線形代数や微積分の学び直しが入ると、300〜400時間に増える例が目立ちます。',
  '得点は61〜67点と、合格点（60点）すれすれの例が多いことにも注意してください。',
];

export const studyTimeCases: { hours: string; who: string; href: string; source: string }[] = [
  { hours: '約140時間', who: '証券アナリストの学習で2級程度の統計を学んでいた。微積分と線形代数を学び直して63点', href: 'https://natsuchiyo.com/blog/jssc-pre1-result', source: 'natsuchiyo.com' },
  { hours: '180〜200時間（約7か月）', who: '統計の知識ゼロから。高校で数学Ⅲを学んでいた。2回目で合格', href: 'https://note.com/serene_harte9023/n/n92e9f5e86e0e', source: 'note' },
  { hours: '約200時間（約8か月）', who: '2級取得済み、理系の大学出身。67点', href: 'https://qiita.com/badorisu0555/items/76a854ca27ce6da5235b', source: 'Qiita' },
  { hours: '200時間強（2.5〜3か月）', who: '2級取得済み。1回目58点、2回目62点で合格', href: 'https://zenn.dev/naaao9999/articles/a9ea2baf245c06', source: 'Zenn' },
  { hours: '約200時間（約3か月）', who: '期待値・分散も分からない状態から始め、先に2級（約100時間）に合格。63点', href: 'https://qiita.com/kakl_kakler_kaklest/items/ab00d4dfed92d03076a0', source: 'Qiita' },
  { hours: '約300時間（3級・2級を含めると約450時間）', who: '同じ年に3級・2級に合格してから。大学で線形代数・微積分は履修していない', href: 'https://tansan3.com/toukeikentei_jyun1kyu-how-to-study/', source: 'tansan3.com' },
  { hours: '300〜400時間（約4か月）', who: '2級取得済み。線形代数・微積分も学び直し、1回目50点、2回目61点', href: 'https://note.com/light_whale2482/n/n05908bc2088a', source: 'note' },
  { hours: '300〜400時間（約1年）', who: '2級取得済み。うち200時間ほどは数学の復習など。3回目61点', href: 'https://zenn.dev/ziyuu/articles/e37641a5d5ede8', source: 'Zenn' },
];

export const phases:{ title: string; body: string }[] = [
  { title: '全体を見渡す', body: '『統計学実践ワークブック』を一通り読み、どんな手法があって、どうつながっているかをつかみます。細かい式の導出は、この段階では後回しにします。' },
  { title: '理解を深める', body: '各章の式の導出を、自分の手で追います。行列（逆行列・固有値）と微積分の基礎を固めておくと、推定と多変量解析が読みやすくなります。' },
  { title: '問題で定着させる', body: 'ワークブックの問題を、解き方に迷わなくなるまで繰り返します。そのあと公式問題集で、本番の問われ方と時間配分に慣れます。' },
];

export const books: { title: string; tag: '公式' | '補助'; desc: string }[] = [
  { title: '統計学実践ワークブック（日本統計学会編、学術図書出版社）', tag: '公式', desc: '統計検定準1級対応の公式認定テキストです。範囲に沿った例題と問題がそろっています。2026年8月に「統計的因果推論」の章を加えた増補版が出ています。' },
  { title: '統計検定準1級 公式問題集（実務教育出版）', tag: '公式', desc: '過去の出題を収めた公式の問題集です。本番の問われ方と時間配分の確認に使います。' },
  { title: '統計学入門（東京大学出版会）', tag: '補助', desc: '通称「赤本」。確率分布と推測の基礎を、ワークブックより丁寧に読みたいときに。' },
  { title: '入門はじめての多変量解析（東京図書）', tag: '補助', desc: '多変量解析の入門書です。' },
  { title: '道具としてのベイズ統計（日本実業出版社）', tag: '補助', desc: 'ベイズ統計の入門書です。' },
];

export const resources: { name: string; type: string; desc: string }[] = [
  { name: 'とけたろう', type: '動画と学習サイト', desc: 'YouTube の動画と連動して統計学を学べるサイトです。' },
  { name: 'Yuya Kawaguchi', type: '動画講座', desc: '『統計学実践ワークブック』の問題を1問ずつ解説する講座です。問題文は画面に出ないので、手元にワークブックが必要です。' },
  { name: '生成AI（ChatGPT など）', type: 'AI', desc: 'ワークブックの式変形を1行ずつ説明させると、行間を埋める助けになります。ただし誤りを含むことがあるので、答えはワークブックや公式問題集で確かめます。' },
];

export const advice: { title: string; body: string }[] = [
  { title: '時間配分', body: '1問あたり3分ほどが目安です。手が止まった問題は後回しにして、解ける問題から確実に取ります。' },
  { title: '電卓', body: '持ち込めるのは一般電卓か事務用電卓だけで、関数電卓は使えません。平方根やメモリ機能の操作に、本番で使う電卓で慣れておきます。' },
  { title: '範囲の広さ', body: '出題範囲表の大項目すべてに一度は目を通し、苦手な分野ほど手厚く進めます。範囲表は配点を示していないので、特定の分野を捨てるのは危険です。' },
  { title: '数学の基礎', body: '行列の積・逆行列・固有値は、回帰分析や主成分分析を理解する土台になります。' },
];
