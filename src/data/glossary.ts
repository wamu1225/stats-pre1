// stats-app/src/data/glossary.ts

export interface Term {
  id: string;
  term: string;
  explanation: string;
  formula?: string;
  level: '基礎' | '中級' | '上級';
  relatedTerms?: string[];
}

export const glossary: Record<string, Term> = {
  // ── 基礎 ──────────────────────────────────────────
  'population': {
    id: 'population',
    term: '母集団 (Population)',
    explanation: 'あなたが「本当に知りたい」対象の全容。例えば、スープの味見における「鍋全体のスープ」にあたります。全数調査が困難なため、一部（標本）からその性質（母数）を推測します。',
    level: '基礎',
    relatedTerms: ['sample', 'mle']
  },
  'sample': {
    id: 'sample',
    term: '標本 (Sample)',
    explanation: '母集団から取り出された「手元にあるデータ」。スープの味見における「スプーン一杯」のこと。標本の平均などは、偶然の偏り（サンプリング誤差）を含むため、慎重に扱う必要があります。',
    level: '基礎',
    relatedTerms: ['population', 'central-limit']
  },
  'mean': {
    id: 'mean',
    term: '平均 (Mean)',
    explanation: 'すべてのデータを足して個数で割った値。データの「重心」にあたります。外れ値の影響を受けやすいため、歪んだ分布では中央値（メジアン）と合わせて確認することが重要です。',
    formula: '\\bar{x} = \\frac{1}{n}\\sum_{i=1}^n x_i',
    level: '基礎',
    relatedTerms: ['variance', 'median']
  },
  'median': {
    id: 'median',
    term: '中央値 (Median)',
    explanation: 'データを小さい順に並べたときの「真ん中の値」。外れ値の影響を受けにくい（ロバスト）ため、年収や不動産価格など歪みの大きいデータの代表値として適しています。',
    level: '基礎',
    relatedTerms: ['mean', 'skewness']
  },
  'variance': {
    id: 'variance',
    term: '分散 (Variance)',
    explanation: '各データが平均からどれだけ離れているかを表す指標。偏差の二乗の平均で求められます。単位が元のデータの二乗になるため、元の単位に戻した「標準偏差」と合わせてよく使われます。',
    formula: 's^2 = \\frac{1}{n-1}\\sum_{i=1}^n (x_i - \\bar{x})^2',
    level: '基礎',
    relatedTerms: ['mean', 'std-dev']
  },
  'std-dev': {
    id: 'std-dev',
    term: '標準偏差 (Standard Deviation)',
    explanation: '分散の正の平方根。分散と異なり元のデータと同じ単位なので直感的に解釈しやすいです。正規分布では平均±1σに約68%、±2σに約95%のデータが収まります。',
    formula: 's = \\sqrt{\\frac{1}{n-1}\\sum_{i=1}^n (x_i - \\bar{x})^2}',
    level: '基礎',
    relatedTerms: ['variance', 'normal-dist']
  },
  'normal-dist': {
    id: 'normal-dist',
    term: '正規分布 (Normal Distribution)',
    explanation: '平均μと分散σ²によって決まる釣り鐘型の対称な分布。自然界・社会データに広く現れ、中心極限定理によって標本平均の分布として現れることから、統計学の中心的な分布です。',
    formula: 'f(x) = \\frac{1}{\\sqrt{2\\pi}\\sigma}\\exp\\left(-\\frac{(x-\\mu)^2}{2\\sigma^2}\\right)',
    level: '基礎',
    relatedTerms: ['central-limit', 't-dist', 'std-dev']
  },
  'parameter': {
    id: 'parameter',
    term: '母数 / パラメータ (Parameter)',
    explanation: '母集団の特性を表す固定値（例：母平均μ、母分散σ²）。真の値は不明であり、標本から推定します。これに対し、標本から計算した値を「統計量」（例：標本平均）と呼びます。',
    level: '基礎',
    relatedTerms: ['population', 'mle']
  },
  'unbiasedness': {
    id: 'unbiasedness',
    term: '不偏性 (Unbiasedness)',
    explanation: '推定量の期待値が真のパラメータと一致する性質（E[θ̂]=θ）。「平均的に正しい」推定量です。標本分散を n ではなく n−1 で割る理由はこの不偏性を保証するためです。',
    level: '基礎',
    relatedTerms: ['consistency', 'mle']
  },
  'confidence-interval': {
    id: 'confidence-interval',
    term: '信頼区間 (Confidence Interval)',
    explanation: '「95%信頼区間」とは、同じ手順を繰り返したとき95%の確率で真の値を含む区間のことです。「この区間に真の値が95%の確率でいる」という解釈は誤りで、手順の信頼性を表す概念です。',
    level: '基礎',
    relatedTerms: ['pvalue', 'alpha']
  },
  'hypothesis-test': {
    id: 'hypothesis-test',
    term: '仮説検定 (Hypothesis Test)',
    explanation: '帰無仮説H₀（「差がない」などの主張）を前提として、観測データがどのくらい「ありえないか」を確率で評価し、H₀を棄却するか判断する手順。医学・心理学・品質管理で広く使われます。',
    level: '基礎',
    relatedTerms: ['pvalue', 'alpha', 'power']
  },
  'null-hypothesis': {
    id: 'null-hypothesis',
    term: '帰無仮説 / 対立仮説',
    explanation: '帰無仮説（H₀）は「差がない・効果がない」という保守的な仮説。対立仮説（H₁）は「差がある・効果がある」という主張。検定では帰無仮説のもとでデータがどのくらい珍しいかを評価します。',
    level: '基礎',
    relatedTerms: ['hypothesis-test', 'pvalue']
  },
  'correlation': {
    id: 'correlation',
    term: '相関係数 (Correlation Coefficient)',
    explanation: '2変数の線形関係の強さを−1〜+1で表す指標。+1に近いほど正の相関、−1に近いほど負の相関、0は線形無相関（ただし非線形関係の可能性は残る）。相関は因果関係を意味しません。',
    formula: 'r = \\frac{\\sum(x_i-\\bar{x})(y_i-\\bar{y})}{\\sqrt{\\sum(x_i-\\bar{x})^2\\sum(y_i-\\bar{y})^2}}',
    level: '基礎',
    relatedTerms: ['regression', 'partial-corr']
  },
  'regression': {
    id: 'regression',
    term: '回帰分析 (Regression Analysis)',
    explanation: '1つ以上の説明変数から目的変数を予測するモデル。単回帰は y=β₀+β₁x+ε、重回帰は y=β₀+β₁x₁+…+βₚxₚ+ε。係数は最小二乗法（OLS）で推定します。',
    level: '基礎',
    relatedTerms: ['correlation', 'multico', 'anova']
  },

  // ── 中級 ──────────────────────────────────────────
  'pvalue': {
    id: 'pvalue',
    term: 'P値 (P-value)',
    explanation: '「差がない」という帰無仮説のもとで、観測値以上に極端な結果が偶然生じる確率。P値<α（有意水準）のとき帰無仮説を棄却します。「P値が小さい＝効果が大きい」は誤解で、サンプルサイズにも依存します。',
    level: '中級',
    relatedTerms: ['alpha', 'power']
  },
  'alpha': {
    id: 'alpha',
    term: '有意水準 / 第1種の過誤 ($\\alpha$)',
    explanation: '「本当は差がないのに、誤って差があると言ってしまう」間違いの許容ライン。裁判で例えると「無実の人を有罪にしてしまう」冤罪のリスク設定です。通常0.05（5%）が使われます。',
    level: '中級',
    relatedTerms: ['pvalue', 'beta']
  },
  'beta': {
    id: 'beta',
    term: '第2種の過誤 ($\\beta$)',
    explanation: '「本当は差があるのに、それを見逃してしまう」間違い。病気を見逃すリスクに相当します。これを小さく抑えることが、分析の「見逃し防止能力」を高めます。',
    level: '中級',
    relatedTerms: ['alpha', 'power']
  },
  'power': {
    id: 'power',
    term: '検出力 (Statistical Power)',
    explanation: '「実際に差があるときに、正しく差があると言える能力（1−β）」。この数値が高いほど、意味のある変化を鋭敏に捉えられます。サンプルサイズを増やすと検出力は上がります。',
    level: '中級',
    relatedTerms: ['beta']
  },
  'central-limit': {
    id: 'central-limit',
    term: '中心極限定理 (CLT)',
    explanation: '「どんな分布でも、n が十分大きければ、標本平均の分布は正規分布に近づく」という定理。元のデータがどんなに歪んでいても、大きなサンプルでは正規分布の公式を使えます。',
    level: '中級',
    relatedTerms: ['sample', 'normal-dist', 'lln']
  },
  'lln': {
    id: 'lln',
    term: '大数の法則 (Law of Large Numbers)',
    explanation: '標本サイズnを増やすと、標本平均が真の期待値μに確率収束する定理。「コインを十分回投げれば表の割合は1/2に近づく」という日常的な経験の数学的根拠です。',
    level: '中級',
    relatedTerms: ['central-limit']
  },
  't-dist': {
    id: 't-dist',
    term: 't分布 (t-distribution)',
    explanation: '母分散が未知で小標本のとき、標本平均の分布として使うつり鐘型の分布。自由度νが大きくなるほど正規分布に近づきます。t検定・回帰係数の検定に使われます。',
    level: '中級',
    relatedTerms: ['normal-dist', 'chi-sq']
  },
  'chi-sq': {
    id: 'chi-sq',
    term: 'カイ二乗分布 (Chi-squared Distribution)',
    explanation: 'k個の独立な標準正規変数の二乗和が従う分布（自由度k）。分散の推定・適合度検定・独立性検定で使われます。期待値=k、分散=2k。',
    level: '中級',
    relatedTerms: ['t-dist', 'f-dist']
  },
  'f-dist': {
    id: 'f-dist',
    term: 'F分布 (F-distribution)',
    explanation: '2つの独立なカイ二乗分布の比が従う分布。分散分析（ANOVA）のF検定・回帰分析の有意性検定で使われます。2つの自由度（m,n）でその形が決まります。',
    level: '中級',
    relatedTerms: ['chi-sq', 'anova']
  },
  'binomial': {
    id: 'binomial',
    term: '二項分布 (Binomial Distribution)',
    explanation: 'n回のベルヌーイ試行（成功確率p）で成功回数kが従う分布。P(X=k)=C(n,k)p^k(1-p)^(n-k)。期待値np、分散np(1-p)。サンプルサイズが大きいと正規近似できます。',
    level: '中級',
    relatedTerms: ['poisson', 'normal-dist']
  },
  'poisson': {
    id: 'poisson',
    term: 'ポアソン分布 (Poisson Distribution)',
    explanation: '単位時間・面積あたりの稀な事象の発生件数が従う分布。期待値=分散=λ。コールセンターへの着信数・欠陥品の個数などのモデル。二項分布のn→∞、p→0、np=λの極限です。',
    formula: 'P(X=k) = \\frac{e^{-\\lambda}\\lambda^k}{k!}',
    level: '中級',
    relatedTerms: ['binomial']
  },
  'exponential': {
    id: 'exponential',
    term: '指数分布 (Exponential Distribution)',
    explanation: 'ポアソン過程の待ち時間が従う分布（レートパラメータλ）。期待値1/λ、無記憶性（P(X>s+t|X>s)=P(X>t)）を持つ唯一の連続分布。故障までの時間のモデルに使われます。',
    level: '中級',
    relatedTerms: ['poisson', 'gamma-dist']
  },
  'gamma-dist': {
    id: 'gamma-dist',
    term: 'ガンマ分布 (Gamma Distribution)',
    explanation: '形状パラメータαとレートパラメータβで決まる正の実数上の分布。指数分布（α=1）とカイ二乗分布（α=k/2、β=1/2）の一般化。ベイズ統計でポアソン分布の共役事前分布として使われます。',
    level: '中級',
    relatedTerms: ['exponential', 'beta-dist', 'chi-sq']
  },
  'beta-dist': {
    id: 'beta-dist',
    term: 'ベータ分布 (Beta Distribution)',
    explanation: '[0,1]区間上の分布でパラメータα、β。期待値α/(α+β)。ベルヌーイ・二項分布の共役事前分布として、成功確率の事前分布に使われます。α=β=1のとき一様分布になります。',
    level: '中級',
    relatedTerms: ['gamma-dist']
  },
  'consistency': {
    id: 'consistency',
    term: '一致性 (Consistency)',
    explanation: 'サンプルサイズnを増やすと推定量が真のパラメータに確率収束する性質。「データを増やせば正確になる」という保証。不偏性（E[θ̂]=θ）とは別の性質で、一致性があっても有偏推定量はあります。',
    level: '中級',
    relatedTerms: ['unbiasedness', 'mle']
  },
  'likelihood': {
    id: 'likelihood',
    term: '尤度 (Likelihood)',
    explanation: '「ある仮説（母数θ）の下で、今あるデータが観察される確率（連続分布の場合は確率密度）」。これを最大にする仮説を選ぶのが最尤推定法（MLE）です。',
    level: '中級',
    relatedTerms: ['mle', 'aic']
  },
  'partial-corr': {
    id: 'partial-corr',
    term: '偏相関係数 (Partial Correlation)',
    explanation: '第3の変数Zの影響を取り除いたうえでのXとYの相関。「身長と成績の相関」が実は「年齢」の影響だったという交絡を排除して純粋な関係を測ります。',
    formula: 'r_{XY \\cdot Z} = \\frac{r_{XY} - r_{XZ}r_{YZ}}{\\sqrt{(1-r_{XZ}^2)(1-r_{YZ}^2)}}',
    level: '中級',
    relatedTerms: ['correlation', 'confounding']
  },
  'odds': {
    id: 'odds',
    term: 'オッズ比 (Odds Ratio)',
    explanation: '「ある事象が起こる確率」と「起こらない確率」の比。ロジスティック回帰の係数はオッズ比の対数（log odds）として解釈します。リスク要因の強さを表す疫学でよく使われます。',
    level: '中級',
    relatedTerms: ['logistic']
  },
  'interaction': {
    id: 'interaction',
    term: '交互作用 (Interaction)',
    explanation: '「薬Aの効果が、薬Bを同時に飲むかどうかで変わる」といった、一方の因子の効果が他方の因子の水準に依存する現象。分散分析・回帰分析で交互作用項を追加して検討します。',
    level: '中級',
    relatedTerms: ['anova']
  },
  'mahalanobis': {
    id: 'mahalanobis',
    term: 'マハラノビス距離',
    explanation: 'データのばらつき（共分散構造）を考慮した距離。単なるユークリッド距離と異なり、変数間の相関を補正します。判別分析・外れ値検出で使われます。',
    formula: 'D^2 = (\\mathbf{x}-\\mu)^T \\Sigma^{-1} (\\mathbf{x}-\\mu)',
    level: '中級',
    relatedTerms: ['eigen', 'lda']
  },
  'multico': {
    id: 'multico',
    term: '多重共線性 (Multicollinearity)',
    explanation: '説明変数間に強い線形相関がある状態。回帰係数の推定が不安定になり、係数の符号が逆転するなど解釈が困難になります。VIF（分散拡大因子）≥10が診断の目安。',
    level: '中級',
    relatedTerms: ['regularization', 'regression']
  },
  'cross-validation': {
    id: 'cross-validation',
    term: '交差妥当化 (Cross-Validation)',
    explanation: 'データを学習用とテスト用に分けて入れ替えながら繰り返すモデル評価法。k分割交差検証（k-fold CV）が代表的で、過学習を検出し汎化性能を客観的に評価します。',
    level: '中級',
    relatedTerms: ['bootstrap', 'overfitting']
  },
  'non-parametric': {
    id: 'non-parametric',
    term: 'ノンパラメトリック手法',
    explanation: 'データの正確な値ではなく「順位」を使う手法。分布の仮定が不要で外れ値に頑健（ロバスト）。ウィルコクソン順位和検定・マン・ホイットニーU検定などが代表例。',
    level: '中級',
    relatedTerms: ['hypothesis-test']
  },
  'anova': {
    id: 'anova',
    term: '分散分析 (ANOVA)',
    explanation: '3つ以上のグループ間で平均に差があるかを一度に検定する手法。全変動=群間変動+群内変動に分解し、F=群間分散/群内分散で判定します。複数t検定の多重比較問題を回避します。',
    level: '中級',
    relatedTerms: ['interaction', 'f-dist']
  },
  'confounding': {
    id: 'confounding',
    term: '交絡 (Confounding)',
    explanation: '「コーヒーを飲む人はガンになりやすい？」という調査で、「コーヒー好きはタバコも吸う人が多い」という隠れた要因（タバコ）が結果を歪めてしまうような現象。ランダム化比較試験（RCT）で排除できます。',
    level: '中級',
    relatedTerms: ['partial-corr']
  },
  'cluster-analysis': {
    id: 'cluster-analysis',
    term: 'クラスター分析',
    explanation: '似た者同士を自動的にグループ分けする教師なし学習の手法。k平均法（距離でグループ化）と階層型クラスタリング（デンドログラムで可視化）が代表的。',
    level: '中級',
    relatedTerms: ['pca']
  },
  'stationary': {
    id: 'stationary',
    term: '定常性 (Stationarity)',
    explanation: '時間の経過によらず、平均・分散・自己共分散が一定な時系列の性質（弱定常性）。ARIMAモデルの前提条件。非定常な場合は差分を取ることで定常化します（I(d)部分）。',
    level: '中級',
    relatedTerms: ['arima']
  },
  'arima': {
    id: 'arima',
    term: 'ARIMAモデル',
    explanation: 'ARIMA(p,d,q)：d回差分で定常化した後にAR(p)+MA(q)を当てはめる時系列モデル。株価・気温など非定常データの予測に使われます。ACF・PACFでp,qを選びます。',
    level: '中級',
    relatedTerms: ['stationary']
  },
  'censoring': {
    id: 'censoring',
    term: '打ち切り (Censoring)',
    explanation: '生存時間分析で「まだ生きていて、いつイベントが起きるかわからない」不完全なデータ。この「終わっていない」という情報自体をカプラン・マイヤー法などで活かします。',
    level: '中級',
    relatedTerms: ['survival']
  },
  'overfitting': {
    id: 'overfitting',
    term: '過学習 (Overfitting)',
    explanation: '手元のデータのノイズまで完璧に学習してしまい、新しいデータに対して予測が当たらなくなる現象。「過去問の答えを丸暗記して本番で応用が効かない」状態。正則化・交差検証で対策します。',
    level: '中級',
    relatedTerms: ['aic', 'regularization', 'cross-validation']
  },
  'factor-analysis': {
    id: 'factor-analysis',
    term: '因子分析',
    explanation: '目に見えない共通因子（例：知能・性格）を、観測データ（テスト得点・アンケート回答）から抽出する手法。因子負荷行列の推定後、バリマックス回転（直交）で解釈を簡単にします。',
    level: '中級',
    relatedTerms: ['pca', 'eigen']
  },

  // ── 上級 ──────────────────────────────────────────
  'mle': {
    id: 'mle',
    term: '最尤推定法 (MLE)',
    explanation: '「今のデータが観察された確率（尤度）を最大にするパラメータ」を推定値とする手法。正則条件下で一致性・漸近有効性を持ち、漸近的にクラーメル・ラオの下界を達成します。',
    formula: 'L(\\theta) = \\prod_{i=1}^n f(x_i | \\theta)',
    level: '上級',
    relatedTerms: ['likelihood', 'aic', 'fisher-info', 'cr-inequality']
  },
  'fisher-info': {
    id: 'fisher-info',
    term: 'フィッシャー情報量',
    explanation: 'データがパラメータθについて持つ情報の量を表す指標。対数尤度の曲率の大きさ。情報量が多いほど推定の分散（ブレ）が小さくなり、クラーメル・ラオの下界はこの逆数として表されます。',
    formula: 'I(\\theta) = E \\left[ \\left( \\frac{\\partial}{\\partial \\theta} \\log f(X|\\theta) \\right)^2 \\right]',
    level: '上級',
    relatedTerms: ['mle', 'cr-inequality']
  },
  'cr-inequality': {
    id: 'cr-inequality',
    term: 'クラーメル・ラオの下界 (CR Inequality)',
    explanation: '不偏推定量の分散はフィッシャー情報量の逆数以上（Var(θ̂)≥1/nI(θ)）という下限。この下界を達成する推定量を「有効推定量」と呼び、MLEは漸近的にこれを達成します。',
    level: '上級',
    relatedTerms: ['fisher-info', 'mle', 'unbiasedness']
  },
  'aic': {
    id: 'aic',
    term: '赤池情報量規準 (AIC)',
    explanation: '「予測精度」と「モデルの複雑さ」のバランスを測る指標。AIC=−2logL+2k（kはパラメータ数）。値が小さいほど良いモデル。BIC=−2logL+k·logn は大標本でペナルティが強く一致的なモデル選択を行います。',
    formula: '\\text{AIC} = -2\\log L + 2k',
    level: '上級',
    relatedTerms: ['mle', 'overfitting', 'bic']
  },
  'bic': {
    id: 'bic',
    term: 'ベイズ情報量規準 (BIC)',
    explanation: 'BIC=−2logL+k·logn。AICより強いパラメータペナルティで、大標本では真のモデルを一致的に選択します。AICは予測精度重視、BICはモデル同定重視と使い分けます。',
    formula: '\\text{BIC} = -2\\log L + k\\log n',
    level: '上級',
    relatedTerms: ['aic', 'mle']
  },
  'logistic': {
    id: 'logistic',
    term: 'ロジスティック回帰',
    explanation: '二値アウトカム（0/1）の確率をシグモイド関数でモデル化する手法。係数βⱼはオッズ比の対数（log-odds）を表し、xⱼが1増えるとオッズがe^βⱼ倍になります。最尤法で推定します。',
    formula: 'P(y=1|\\mathbf{x}) = \\frac{1}{1 + \\exp(-(\\beta_0 + \\mathbf{\\beta}^T\\mathbf{x}))}',
    level: '上級',
    relatedTerms: ['odds', 'glm']
  },
  'glm': {
    id: 'glm',
    term: '一般化線形モデル (GLM)',
    explanation: '正規分布以外の指数型分布族（二項・ポアソンなど）に対応した回帰モデル。線形予測子η=Xβと目的変数の期待値μをリンク関数g(μ)=ηで結びます。ロジスティック回帰・ポアソン回帰が特殊ケースです。',
    level: '上級',
    relatedTerms: ['logistic', 'mle']
  },
  'pca': {
    id: 'pca',
    term: '主成分分析 (PCA)',
    explanation: '分散共分散行列（または相関行列）の固有ベクトルを主成分軸として次元削減する手法。第1主成分は分散最大方向。固有値=その主成分の分散、寄与率=固有値/固有値の総和。',
    level: '上級',
    relatedTerms: ['eigen', 'lda', 'factor-analysis']
  },
  'lda': {
    id: 'lda',
    term: '線形判別分析 (LDA)',
    explanation: 'グループ間分散/グループ内分散を最大化する判別関数を求める手法。等分散仮定で判別境界は線形（LDA）、グループ別分散では二次（QDA）。マハラノビス距離を使った分類と等価です。',
    level: '上級',
    relatedTerms: ['pca', 'mahalanobis']
  },
  'eigen': {
    id: 'eigen',
    term: '固有値・固有ベクトル',
    explanation: '行列Aに対しAv=λvを満たすλが固有値、vが固有ベクトル。分散共分散行列の固有ベクトルは主成分分析の主成分軸、固有値はその方向の分散を表します。',
    level: '上級',
    relatedTerms: ['pca', 'mahalanobis']
  },
  'regularization': {
    id: 'regularization',
    term: '正則化 (Regularization)',
    explanation: 'モデルの複雑さにペナルティを与えて過学習を防ぐ手法。Lasso（L1）はペナルティλΣ|βⱼ|で係数を完全にゼロにして変数選択を行います。Ridge（L2）はλΣβⱼ²で縮小しますが変数選択はしません。',
    level: '上級',
    relatedTerms: ['overfitting', 'multico']
  },
  'bootstrap': {
    id: 'bootstrap',
    term: 'ブートストラップ法',
    explanation: '手元のデータから復元抽出（同じデータを何度でも選べる再抽出）を繰り返すシミュレーション手法。解析的な公式が使えない統計量の信頼区間・標準誤差を数値的に求められます。',
    level: '上級',
    relatedTerms: ['cross-validation']
  },
  'bayes-theorem': {
    id: 'bayes-theorem',
    term: 'ベイズの定理（統計版）',
    explanation: '事後分布∝尤度×事前分布。p(θ|x)∝p(x|θ)p(θ)。事前知識p(θ)をデータの尤度p(x|θ)で更新して事後分布p(θ|x)を得ます。共役事前分布を使うと解析的に事後分布を求められます。',
    level: '上級',
    relatedTerms: ['mcmc', 'conjugate']
  },
  'conjugate': {
    id: 'conjugate',
    term: '共役事前分布',
    explanation: '尤度と組み合わせたとき事後分布が事前分布と同じ分布族になる事前分布。代表例：二項-ベータ、ポアソン-ガンマ、正規-正規（精度既知）。計算が大幅に簡単になります。',
    level: '上級',
    relatedTerms: ['bayes-theorem', 'beta-dist', 'gamma-dist']
  },
  'mcmc': {
    id: 'mcmc',
    term: 'マルコフ連鎖モンテカルロ (MCMC)',
    explanation: '目標分布を定常分布とするマルコフ連鎖を設計してサンプルを得る手法。ギブスサンプリング（条件付き分布から順に更新）とメトロポリス・ヘイスティングス（提案分布から採否判定）が代表的。',
    level: '上級',
    relatedTerms: ['bayes-theorem']
  },
  'markov-chain': {
    id: 'markov-chain',
    term: 'マルコフ連鎖',
    explanation: '現在の状態だけが次の状態を決めるマルコフ性をもつ確率過程。定常分布πはπP=πを満たします。既約・非周期なら一意な定常分布が存在し、任意の初期分布から収束します。',
    level: '上級',
    relatedTerms: ['mcmc', 'stationary']
  },
  'delta-method': {
    id: 'delta-method',
    term: 'デルタ法',
    explanation: '√n(θ̂−θ)→N(0,σ²)のとき、√n(g(θ̂)−g(θ))→N(0,[g\'(θ)]²σ²)という漸近分布を求める方法。変換後の推定量の信頼区間・検定に使われます。',
    level: '上級',
    relatedTerms: ['mle', 'central-limit']
  },
  'jacobian': {
    id: 'jacobian',
    term: 'ヤコビアン (Jacobian)',
    explanation: '変数変換において面積・体積がどれだけ伸び縮みするかを示す行列式。確率密度の変数変換公式：f_Y(y)=f_X(g⁻¹(y))·|J|。多変量の場合は偏微分行列の行列式になります。',
    level: '上級'
  },
  'mgf': {
    id: 'mgf',
    term: 'モーメント母関数 (MGF)',
    explanation: 'M_X(t)=E[e^(tX)]。存在すればすべての積率（モーメント）を生成します（k次積率=M^(k)(0)）。独立な和のMGFは積になるため、和の分布を導出するのに便利です。',
    level: '上級',
    relatedTerms: ['central-limit']
  },
  'characteristic-fn': {
    id: 'characteristic-fn',
    term: '特性関数 (Characteristic Function)',
    explanation: 'φ_X(t)=E[e^(itX)]。MGFと異なり常に存在し、分布を一意に決定します。中心極限定理の証明やドメイン収束定理の基礎となります。',
    level: '上級',
    relatedTerms: ['mgf']
  },
  'sufficient-stat': {
    id: 'sufficient-stat',
    term: '十分統計量',
    explanation: 'パラメータθに関する情報をすべて持つ統計量。ネイマンの分解定理：T(X)が十分統計量⟺f(x;θ)=g(T(x),θ)h(x)と分解できます。十分統計量に集約することで情報を失いません。',
    level: '上級',
    relatedTerms: ['mle', 'unbiasedness']
  },
  'np-lemma': {
    id: 'np-lemma',
    term: 'ネイマン・ピアソン補題',
    explanation: '単純仮説H₀:θ=θ₀ vs H₁:θ=θ₁の検定では、尤度比L(θ₁)/L(θ₀)>cの棄却域が一様最強力検定（UMP）を与えるという定理。有意水準一定のもとで検出力を最大にします。',
    level: '上級',
    relatedTerms: ['likelihood', 'power']
  },
  'likelihood-ratio': {
    id: 'likelihood-ratio',
    term: '尤度比検定統計量',
    explanation: '−2log(L₀/L₁)→χ²(df)（dfは制約数、大標本）。複合仮説のより一般的な検定に使われます。ウォルド検定・スコア検定と漸近的に同値です。',
    level: '上級',
    relatedTerms: ['likelihood', 'np-lemma', 'chi-sq']
  },
  'asymptotic': {
    id: 'asymptotic',
    term: '漸近理論',
    explanation: 'サンプルサイズn→∞のときの統計量の挙動を研究する理論。MLE漸近正規性（√n(θ̂_MLE−θ)→N(0,I(θ)⁻¹)）やCLTがその代表。有限サンプルでは近似として使います。',
    level: '上級',
    relatedTerms: ['mle', 'central-limit', 'delta-method']
  },
  'survival': {
    id: 'survival',
    term: '生存時間解析',
    explanation: 'イベント（死亡・故障・回復）が起きるまでの時間を分析する分野。生存関数S(t)=P(T>t)、ハザード関数h(t)=f(t)/S(t)が基本概念。カプラン・マイヤー法（ノンパラ）、コックス比例ハザードモデル（回帰）が代表手法。',
    level: '上級',
    relatedTerms: ['censoring']
  },
  'contingency': {
    id: 'contingency',
    term: '分割表 (Contingency Table)',
    explanation: '2つ以上のカテゴリ変数の頻度をまとめた表。独立性の検定（カイ二乗検定）・Fisher正確確率検定で関連を調べます。行と列の独立性：E_ij=R_i·C_j/Nとなるか確認します。',
    level: '上級',
    relatedTerms: ['chi-sq']
  },
  'canonical-corr': {
    id: 'canonical-corr',
    term: '正準相関分析',
    explanation: '2組の変数群間の関連を最大化する線形結合（正準変量）を求める多変量手法。u=a\'X、v=b\'Yの相関を最大化するa,bを固有値問題として求めます。',
    level: '上級',
    relatedTerms: ['pca', 'correlation']
  },
  'em-algorithm': {
    id: 'em-algorithm',
    term: 'EMアルゴリズム',
    explanation: '欠測データや潜在変数がある場合の最尤推定のアルゴリズム。Eステップ（欠測データの期待値を計算）とMステップ（対数尤度を最大化）を繰り返し収束させます。混合正規分布の推定などに使われます。',
    level: '上級',
    relatedTerms: ['mle', 'factor-analysis']
  },
  'sufficiency': {
    id: 'sufficiency',
    term: '十分統計量（ネイマンの分解定理）',
    explanation: '母数に関する「すべての情報」をギュッと凝縮した統計量。正規分布の平均を推測する際、個々のデータの合計だけ知っていれば十分です。指数型分布族では自然統計量が十分統計量になります。',
    level: '上級',
    relatedTerms: ['mle']
  },
  'skewness': {
    id: 'skewness',
    term: '歪度 (Skewness)',
    explanation: '分布の左右非対称さを表す指標。E[(X−μ)³]/σ³。正値なら右裾が重い（正の歪み）、負値なら左裾が重い（負の歪み）、対称なら0。正規分布の歪度は0です。',
    level: '中級',
    relatedTerms: ['kurtosis', 'normal-dist']
  },
  'kurtosis': {
    id: 'kurtosis',
    term: '尖度 (Kurtosis)',
    explanation: '分布の裾の重さを表す指標。超過尖度=E[(X−μ)⁴]/σ⁴−3（正規分布基準で0）。正値なら正規分布より裾が重い（レプトクルティック、ファットテール）。金融データは正の超過尖度を示すことが多いです。',
    level: '中級',
    relatedTerms: ['skewness', 'normal-dist']
  },
  'hypergeometric': {
    id: 'hypergeometric',
    term: '超幾何分布',
    explanation: 'N個中K個の当たりがある母集団からn個を非復元抽出したときの当たり数の分布。期待値nK/N、分散は有限修正係数(N−n)/(N−1)が付きます。復元抽出なら二項分布になります。',
    level: '中級',
    relatedTerms: ['binomial']
  },
  'geometric': {
    id: 'geometric',
    term: '幾何分布',
    explanation: 'ベルヌーイ試行で初めて成功するまでの試行回数の分布。P(X=k)=(1−p)^(k−1)p、期待値1/p。無記憶性（過去の失敗が次の成功確率に影響しない）を持ちます。',
    level: '中級',
    relatedTerms: ['binomial', 'exponential']
  },
  'neg-binomial': {
    id: 'neg-binomial',
    term: '負の二項分布',
    explanation: 'ベルヌーイ試行でr回成功するまでの試行回数の分布。期待値r/p、分散r(1−p)/p²。幾何分布（r=1）の一般化。過分散データ（分散>平均）のカウントデータにもよく使われます。',
    level: '中級',
    relatedTerms: ['geometric', 'poisson']
  },
  'total-probability': {
    id: 'total-probability',
    term: '全確率の定理',
    explanation: '完全系{A₁,…,Aₖ}（互いに排反でその和が全体）に対してP(B)=ΣP(B|Aᵢ)P(Aᵢ)。ベイズの定理の分母の計算に使います。「経路の重みつき平均」とも解釈できます。',
    level: '基礎',
    relatedTerms: ['bayes-theorem', 'conditional-prob']
  },
  'conditional-prob': {
    id: 'conditional-prob',
    term: '条件付き確率',
    explanation: 'P(B|A)=P(A∩B)/P(A)（P(A)>0）。「Aが起きたという情報のもとでBが起きる確率」。条件付けによって標本空間がAに縮小します。ベイズの定理・全確率の定理の基礎。',
    level: '基礎',
    relatedTerms: ['total-probability', 'bayes-theorem']
  },
  'law-total-expectation': {
    id: 'law-total-expectation',
    term: '全期待値の法則 / 全分散の法則',
    explanation: '全期待値の法則：E[X]=E[E[X|Y]]。全分散の法則：Var(X)=E[Var(X|Y)]+Var(E[X|Y])。階層モデル・ランダム効果モデルの分析に使います。',
    level: '上級',
    relatedTerms: ['conditional-prob']
  },
  'multivariate-normal': {
    id: 'multivariate-normal',
    term: '多変量正規分布',
    explanation: 'p変量の正規分布。平均ベクトルμとp×p正定値行列Σ（分散共分散行列）で決まります。相関係数ρ=0⟺独立（正規分布の場合のみ成立する特別な性質）。',
    formula: 'f(\\mathbf{x}) = \\frac{1}{(2\\pi)^{p/2}|\\Sigma|^{1/2}} \\exp\\left(-\\frac{1}{2}(\\mathbf{x}-\\mu)^T\\Sigma^{-1}(\\mathbf{x}-\\mu)\\right)',
    level: '上級',
    relatedTerms: ['normal-dist', 'mahalanobis']
  },
  'inclusion-exclusion': {
    id: 'inclusion-exclusion',
    term: '包除原理',
    explanation: 'P(A∪B)=P(A)+P(B)−P(A∩B)。3事象ではP(A∪B∪C)=P(A)+P(B)+P(C)−P(A∩B)−P(B∩C)−P(A∩C)+P(A∩B∩C)。重複して数えた部分を引き戻す原理。',
    level: '基礎',
    relatedTerms: ['conditional-prob']
  }
};
