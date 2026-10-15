// 検定・分布の使い分けガイド（早見表）の本文。
// prerender.ts（静的HTML＝クローラー用）と App.tsx（クライアント描画）の両方から
// import する単一ソース。base は '/stats-pre1' または '' を渡す。
// 表はスマホ幅（390px）で横にはみ出さないよう2列にし、手法名そのものを対応モジュールへのリンクにする
// （モジュール番号は画面に出ていないので参照に使わない）
type Row = [situation: string, method: string, moduleId: string];

const sections: { title: string; lead: string; head: [string, string]; rows: Row[] }[] = [
  {
    title: '1. 確率分布の選び方',
    lead: '「どんな現象か」から、当てはめる確率分布を選びます。',
    head: ['状況', '使う分布'],
    rows: [
      ['n 回の独立な試行での成功回数', '二項分布', '1.6-binomial'],
      ['有限個の中から戻さずに取り出したときの当たりの数', '超幾何分布', '1.6-binomial'],
      ['一定の時間・範囲に起きる稀な出来事の件数', 'ポアソン分布', '1.7-poisson'],
      ['初めて成功するまでの試行回数', '幾何分布', '1.7b-geometric-multinomial'],
      ['r 回成功するまでの試行回数', '負の二項分布', '1.7b-geometric-multinomial'],
      ['結果が3種類以上あるときの、それぞれの回数', '多項分布', '1.7b-geometric-multinomial'],
      ['出来事が起きるまでの待ち時間', '指数分布', '1.8-continuous'],
      ['待ち時間をいくつか足したもの', 'ガンマ分布', '1.8-continuous'],
      ['0から1の間の割合（成功確率の事前分布など）', 'ベータ分布', '1.8b-ratio-lognormal-cauchy'],
      ['正の値で、右に裾が長い量（所得など）', '対数正規分布', '1.8b-ratio-lognormal-cauchy'],
      ['多数の独立な要因が足し合わさった量', '正規分布', '1.10-normal-dist'],
    ],
  },
  {
    title: '2. 統計量が従う分布',
    lead: '推定・検定で使う統計量が、どの分布に従うかの早見表です。',
    head: ['統計量', '従う分布'],
    rows: [
      ['母分散が分かっているときの標本平均（標準化したもの）', '標準正規分布（z）', '1.12-sampling'],
      ['母分散が分からないときの標本平均（標準化したもの）', 't 分布', '1.12-sampling'],
      ['標本分散、適合度・独立性の検定の統計量', 'χ² 分布', '1.12-sampling'],
      ['2つの標本分散の比、分散分析の統計量', 'F 分布', '1.12-sampling'],
    ],
  },
  {
    title: '3. 検定の選び方',
    lead: '「何を確かめたいか」から検定を選びます。',
    head: ['確かめたいこと', '使う検定'],
    rows: [
      ['1群の平均が基準値と違うか（分散は未知）', '1標本 t 検定', '1.20-testing-applied'],
      ['独立な2群の平均の差', '2標本 t 検定', '1.20-testing-applied'],
      ['対応のある2群の差（同じ対象の前後など）', '対応のある t 検定', '1.20-testing-applied'],
      ['3群以上の平均の差', '分散分析（ANOVA）', '1.21-anova'],
      ['正規分布を仮定できない2群の比較', 'ウィルコクソン順位和検定', '1.20-testing-applied'],
      ['正規分布を仮定できない3群以上の比較', 'クラスカル・ウォリス検定', '1.20-testing-applied'],
      ['2つの量的変数に相関があるか', '母相関係数の検定', '1.20-testing-applied'],
      ['観測度数が理論の分布に合うか', '適合度検定（χ²）', '1.20-testing-applied'],
      ['2つのカテゴリ変数が独立か', '独立性の検定（χ²）', '3.4-contingency'],
      ['2×2 の表で、度数が小さいとき', 'フィッシャーの正確検定', '3.4-contingency'],
    ],
  },
  {
    title: '4. 区間推定の選び方',
    lead: '値そのものではなく、「どの範囲にありそうか」を示したいときです。',
    head: ['知りたい範囲', '使う方法'],
    rows: [
      ['母平均・母比率・母分散', '1標本の信頼区間', '1.16-ci'],
      ['2群の平均の差・比率の差・分散の比', '2標本の信頼区間', '1.17-ci-advanced'],
    ],
  },
  {
    title: '5. 回帰と多変量解析の選び方',
    lead: '「何をしたいか」から手法を選びます。',
    head: ['したいこと', '使う手法'],
    rows: [
      ['量的な結果を、複数の変数から予測する', '重回帰分析', '2.1-regression'],
      ['2値（合否・有無など）の結果を予測する', 'ロジスティック回帰', '2.6-glm'],
      ['件数を、複数の変数から予測する', 'ポアソン回帰', '2.6-glm'],
      ['どの変数を使うモデルがよいかを選ぶ', 'AIC・BIC・クロスバリデーション', '1.23-model-selection'],
      ['多数の変数を少数の軸に要約する', '主成分分析', '2.2-pca'],
      ['観測変数の背後にある潜在因子を探る', '因子分析', '2.4-factor'],
      ['2組の変数群どうしの関係を調べる', '正準相関分析', '2.7-multivariate'],
      ['ラベルなしで、似たものどうしをグループに分ける', 'クラスター分析', '2.5-clustering'],
      ['既知のグループのどれに入るかを分類する', '判別分析', '2.3-discriminant'],
    ],
  },
  {
    title: '6. 特殊な形のデータ',
    lead: 'データの形そのものに合わせて手法を選ぶ場合です。',
    head: ['データの形', '使う手法'],
    rows: [
      ['「イベントが起きるまでの時間」で、途中で観察が終わった人がいる', 'カプラン・マイヤー法、Cox 比例ハザードモデル', '3.5-survival'],
      ['時間の順に並んだデータの予測', 'ARIMA モデル', '3.2-timeseries'],
      ['一部の値が欠けているデータでの推定', 'EM アルゴリズム', '3.6-simulation'],
      ['観察データから、原因の効果（因果効果）を求めたい', '因果グラフ（DAG）・バックドア基準', '3.7-causal'],
    ],
  },
];

export function buildUsecaseHtml(base: string): string {
  const th = (t: string) => `<th style="text-align:left;padding:8px 10px;background:#eff6ff;border:1px solid #bfdbfe;font-size:0.9rem;color:#1e3a8a">${t}</th>`;
  const td = (t: string, w?: string) => `<td style="padding:8px 10px;border:1px solid #e5e7eb;font-size:0.9rem;color:#444;vertical-align:top${w ? ';width:' + w : ''}">${t}</td>`;
  const lk = (id: string, label: string) => `<a href="${base}/${id}/" style="color:#2563eb;text-decoration:underline;text-underline-offset:2px">${label}</a>`;
  const table = (s: (typeof sections)[number]) => `
  <h2 style="font-size:1.2rem;font-weight:700;margin:24px 0 8px">${s.title}</h2>
  <p style="color:#444;margin-bottom:4px">${s.lead}</p>
  <table style="border-collapse:collapse;width:100%;margin:8px 0 20px"><thead><tr>${th(s.head[0])}${th(s.head[1])}</tr></thead><tbody>
  ${s.rows.map(([sit, method, id]) => `<tr>${td(sit, '55%')}${td(lk(id, method))}</tr>`).join('\n  ')}
  </tbody></table>`;
  return `<div style="background:#eff6ff;border-bottom:1px solid #bfdbfe;padding:10px 16px;font-size:0.88rem;text-align:center;margin-bottom:16px;border-radius:6px;max-width:860px;margin-left:auto;margin-right:auto"><a href="https://study-apps.com/" style="color:#1e3a8a;text-decoration:none;font-weight:600">← study-apps.com 学習サイト集トップへ</a></div><article id="static-fallback" style="font-family:sans-serif;line-height:1.7;max-width:860px;margin:0 auto;padding:24px 16px">
  <nav style="margin-bottom:16px"><a href="${base}/" style="color:#2563eb;text-decoration:none">← ホームへ戻る</a></nav>
  <h1 style="font-size:1.6rem;font-weight:700;border-bottom:2px solid #2563eb;padding-bottom:8px;margin-bottom:20px">検定・分布の使い分けガイド</h1>
  <p style="color:#555;margin-bottom:8px">「このデータ、この問いには、どの分布・検定・手法を使えばいいのか」を、状況から逆引きできる早見表です。</p>
  <p style="color:#555;margin-bottom:24px">右の列の手法名を押すと、それを詳しく学べるモジュールに移ります。</p>
  ${sections.map(table).join('\n')}
  <p style="margin-top:8px;font-size:0.85rem;color:#888">※ 早見表は典型的な対応を示すものです。実際には、前提条件（独立性・等分散・正規性など）を満たしているかの確認が必要です。</p>
  <p style="margin-top:16px"><a href="${base}/" style="color:#2563eb">← ホームへ戻る</a></p>
</article>`;
}
