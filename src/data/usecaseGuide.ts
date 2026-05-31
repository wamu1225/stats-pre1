// 検定・分布の使い分けガイド（早見表）の本文。
// prerender.ts（静的HTML＝クローラー用）と App.tsx（クライアント描画）の両方から
// import する単一ソース。base は '/stats-pre1' または '' を渡す。
export function buildUsecaseHtml(base: string): string {
  const wrapOpen = '<div style="overflow-x:auto;margin:8px 0 20px"><table style="border-collapse:collapse;width:100%;min-width:520px">';
  const wrapClose = '</table></div>';
  const th = (t: string) => `<th style="text-align:left;padding:8px 10px;background:#eff6ff;border:1px solid #bfdbfe;font-size:0.9rem;white-space:nowrap">${t}</th>`;
  const td = (t: string) => `<td style="padding:8px 10px;border:1px solid #e5e7eb;font-size:0.9rem;color:#444">${t}</td>`;
  const lk = (id: string, label: string) => `<a href="${base}/${id}/" style="color:#2563eb;text-decoration:none">${label}</a>`;
  const row = (cells: string[]) => `<tr>${cells.map(td).join('')}</tr>`;
  return `<div style="background:#eff6ff;border-bottom:1px solid #bfdbfe;padding:10px 16px;font-size:0.88rem;text-align:center;margin-bottom:16px;border-radius:6px;max-width:860px;margin-left:auto;margin-right:auto"><a href="https://study-apps.com/" style="color:#1e3a8a;text-decoration:none;font-weight:600">← study-apps.com 学習サイト集トップへ</a></div><article id="static-fallback" style="font-family:sans-serif;line-height:1.7;max-width:860px;margin:0 auto;padding:24px 16px">
  <nav style="margin-bottom:16px"><a href="${base}/" style="color:#2563eb;text-decoration:none">← ホームへ戻る</a></nav>
  <h1 style="font-size:1.6rem;font-weight:700;border-bottom:2px solid #2563eb;padding-bottom:8px;margin-bottom:20px">検定・分布の使い分けガイド</h1>
  <p style="color:#555;margin-bottom:24px">「このデータ・この問いには、どの分布／どの検定／どの手法を使えばいいのか」を、状況から逆引きできる早見表です。各行は本サイトの対応モジュールにリンクしています。個別の理論はリンク先で、ここでは<strong>全体を見渡して手法を選ぶ視点</strong>を整理します。</p>

  <h2 style="font-size:1.2rem;font-weight:700;margin:20px 0 8px">1. 確率分布の選び方</h2>
  <p style="color:#444;margin-bottom:4px">「どんな現象か」から、当てはめる確率分布を選びます。</p>
  ${wrapOpen}<thead><tr>${th('状況・知りたいこと')}${th('使う分布')}${th('参照')}</tr></thead><tbody>
  ${row(['n回の独立試行での成功回数', '二項分布', lk('1.6-binomial','1.6')])}
  ${row(['有限母集団からの非復元抽出での成功回数', '超幾何分布', lk('1.6-binomial','1.6')])}
  ${row(['一定の時間・面積あたりに起きる稀な事象の件数', 'ポアソン分布', lk('1.7-poisson','1.7')])}
  ${row(['初めて成功するまでの試行回数', '幾何分布', lk('1.7-poisson','1.7')])}
  ${row(['事象が起きるまでの待ち時間', '指数分布', lk('1.8-continuous','1.8')])}
  ${row(['複数の指数的な待ち時間の和', 'ガンマ分布', lk('1.8-continuous','1.8')])}
  ${row(['多数の独立な要因の和（近似）', '正規分布', lk('1.10-normal-dist','1.10')+' / '+lk('1.11-lln-clt','1.11')])}
  </tbody>${wrapClose}

  <h2 style="font-size:1.2rem;font-weight:700;margin:20px 0 8px">2. 検定統計量が従う分布</h2>
  <p style="color:#444;margin-bottom:4px">推定・検定で使う標本分布の選び方です。</p>
  ${wrapOpen}<thead><tr>${th('状況')}${th('従う分布')}${th('参照')}</tr></thead><tbody>
  ${row(['母分散が既知のときの平均', 'z（標準正規）', lk('1.12-sampling','1.12')])}
  ${row(['母分散が未知のときの平均', 't分布', lk('1.12-sampling','1.12')])}
  ${row(['分散・適合度に関する量', 'χ²分布', lk('1.12-sampling','1.12')])}
  ${row(['2群の分散比', 'F分布', lk('1.12-sampling','1.12')+' / '+lk('1.21-anova','1.21')])}
  </tbody>${wrapClose}

  <h2 style="font-size:1.2rem;font-weight:700;margin:20px 0 8px">3. 検定の選び方（目的別）</h2>
  <p style="color:#444;margin-bottom:4px">「何を確かめたいか」から検定手法を選びます。</p>
  ${wrapOpen}<thead><tr>${th('知りたいこと')}${th('使う検定')}${th('参照')}</tr></thead><tbody>
  ${row(['1群の平均が基準値と異なるか（分散未知）', '1標本t検定', lk('1.20-testing-applied','1.20')])}
  ${row(['独立な2群の平均差', '2標本t検定', lk('1.20-testing-applied','1.20')])}
  ${row(['対応のある2群の差（同一対象の前後など）', '対応のあるt検定', lk('1.20-testing-applied','1.20')])}
  ${row(['3群以上の平均差', '分散分析（ANOVA）', lk('1.21-anova','1.21')])}
  ${row(['観測度数が理論分布に合うか', '適合度検定（χ²）', lk('1.20-testing-applied','1.20')+' / '+lk('3.4-contingency','3.4')])}
  ${row(['2つのカテゴリ変数が独立か', '独立性の検定（χ²）', lk('3.4-contingency','3.4')])}
  ${row(['正規性が仮定できない場合', 'ノンパラメトリック検定', lk('1.20-testing-applied','1.20')])}
  ${row(['母数の区間推定をしたい', '信頼区間（1標本／2標本）', lk('1.16-ci','1.16')+' / '+lk('1.17-ci-advanced','1.17')])}
  </tbody>${wrapClose}

  <h2 style="font-size:1.2rem;font-weight:700;margin:20px 0 8px">4. 多変量解析の選び方（目的別）</h2>
  <p style="color:#444;margin-bottom:4px">「何をしたいか」から多変量手法を選びます。</p>
  ${wrapOpen}<thead><tr>${th('目的')}${th('使う手法')}${th('参照')}</tr></thead><tbody>
  ${row(['量的な結果を複数の変数から予測する', '重回帰分析', lk('2.1-regression','2.1')])}
  ${row(['2値（合否・有無など）を予測・分類する', 'ロジスティック回帰', lk('2.6-glm','2.6')])}
  ${row(['多数の変数を少数の軸に要約する（次元削減）', '主成分分析（PCA）', lk('2.2-pca','2.2')])}
  ${row(['観測変数の背後にある潜在因子を探る', '因子分析', lk('2.4-factor','2.4')])}
  ${row(['事前のラベルなしでグループ分けする', 'クラスター分析', lk('2.5-clustering','2.5')])}
  ${row(['既知の群のどれに属するか分類する', '判別分析', lk('2.3-discriminant','2.3')])}
  </tbody>${wrapClose}

  <p style="margin-top:8px;font-size:0.85rem;color:#888">※ 早見表は典型的な対応を示すものです。前提条件（独立性・等分散・正規性など）の確認が必要な場合があります。詳細は各モジュールをご確認ください。</p>
  <p style="margin-top:16px"><a href="${base}/" style="color:#2563eb">← ホームへ戻る</a></p>
</article>`;
}
