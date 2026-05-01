import { readFileSync, writeFileSync } from 'fs';
const filePath = 'src/data/modules.ts';
const raw = readFileSync(filePath, 'utf8');
const nl = raw.includes('\r\n') ? '\r\n' : '\n';

const NEW_1_9 = `{
    id: '1.9-estimation',
    title: '推定法：最尤推定法とモーメント法',
    chapter: 1,
    description: '最尤推定量（MLE）とモーメント推定量の導出と性質——「もっともらしいパラメータ」の求め方を学びます。',
    content: \`💡 **このモジュールで学ぶこと**

「全国のコーヒー愛飲者の平均月額消費を知りたい」——全員を調査するのは不可能なので、100人を無作為抽出してパラメータを推定します。このモジュールでは「どうやってパラメータの値を求めるか」という**推定法（estimation method）**——最尤推定法とモーメント法——を学びます。推定量の品質評価（不偏性・有効性など）は次のモジュールで扱います。

💡 **推定量とは「データを使って真の値を当てる関数」**

母数（真の値）$\\\\theta$ は未知です。手元にあるデータ $X_1, X_2, \\\\ldots, X_n$ を加工して $\\\\theta$ を推測する関数を**推定量**（estimator）$\\\\hat{\\\\theta}$（シータハット）と呼びます。

---

### 1. 最尤推定法

「このデータを最も"もっともらしく"説明するパラメータはどれか？」——この問いに答えるのが**最尤推定法**（MLE: Maximum Likelihood Estimation）です。

コインを10回投げて7回表が出ました。表の確率 $p$ として最も自然な推定値は $p = 0.7$ です。これは実際に「データが得られる確率が最大になる $p$」と一致します。

**尤度関数**（Likelihood Function）$L(\\\\theta) = f(x_1, \\\\ldots, x_n ; \\\\theta)$ は「パラメータが $\\\\theta$ だとしたとき、今のデータが得られる確率（密度）」です。これを最大化する $\\\\hat{\\\\theta}_{\\\\text{MLE}}$ が最尤推定量です。

計算上は $\\\\ell(\\\\theta) = \\\\log L(\\\\theta)$（対数尤度）を最大化するほうが便利です。独立なデータでは積が和になり、$\\\\frac{\\\\partial \\\\ell}{\\\\partial \\\\theta} = 0$ を解きます（**スコア方程式**）。

🎯 **試験頻出**：正規分布 $N(\\\\mu, \\\\sigma^2)$ の MLE は $\\\\hat{\\\\mu} = \\\\bar{X}$（標本平均）、$\\\\hat{\\\\sigma}^2 = \\\\frac{1}{n}\\\\sum(X_i - \\\\bar{X})^2$（$n$ 分の1——不偏ではない）。

📖 **最小二乗法との関係**：正規誤差モデルでは MLE と最小二乗推定（OLS）は一致します。残差二乗和の最小化と対数尤度の最大化が同じ解を与えます。

---

### 2. モーメント法

**モーメント法**（Method of Moments）は「母集団のモーメントと標本モーメントが等しい」とおいてパラメータを決める方法です。$k$ 次母モーメント $E[X^k]$ を標本モーメント $\\\\frac{1}{n}\\\\sum X_i^k$ で置き換えて連立方程式を解きます。

計算がシンプルで直感的ですが、一般に MLE より効率（精度）が劣ります。パラメータが1つなら1次モーメント（期待値）だけで解け、「標本平均を期待値の式と等置する」という操作になります。

例：ポアソン分布 $\\\\text{Po}(\\\\lambda)$ のモーメント推定量——$E[X] = \\\\lambda$ を $\\\\bar{X}$ と等置するだけで $\\\\hat{\\\\lambda}_{\\\\text{MM}} = \\\\bar{X}$。この場合 MLE とも一致します。

例：指数分布 $\\\\text{Exp}(\\\\lambda)$（$E[X] = 1/\\\\lambda$）のモーメント推定量——$1/\\\\hat{\\\\lambda} = \\\\bar{X}$ より $\\\\hat{\\\\lambda}_{\\\\text{MM}} = 1/\\\\bar{X}$。\`,
    keyFormulas: [
      { label: '対数尤度', formula: '\\\\ell(\\\\theta) = \\\\log L(\\\\theta) = \\\\sum_{i=1}^n \\\\log f(x_i; \\\\theta)' },
      { label: 'スコア方程式', formula: '\\\\dfrac{\\\\partial \\\\ell}{\\\\partial \\\\theta} = 0' },
      { label: '正規分布のMLE（平均）', formula: '\\\\hat{\\\\mu}_{\\\\text{MLE}} = \\\\bar{X}' },
      { label: '正規分布のMLE（分散）', formula: '\\\\hat{\\\\sigma}^2_{\\\\text{MLE}} = \\\\dfrac{1}{n}\\\\sum(X_i-\\\\bar{X})^2' },
    ],
    quiz: [
      { id: 'est1-11', question: '尤度関数 $L(\\\\theta)$ の直感的な意味として正しいものはどれか？', options: ['$\\\\theta$ が真の値である確率', '観測データが得られる確率を $\\\\theta$ の関数として見たもの', '$\\\\theta$ の事前分布', '推定誤差の大きさ'], correctAnswer: 1, explanation: '尤度関数は「パラメータが $\\\\theta$ だとしたとき、今観測されたデータが得られる確率（密度）」です。$\\\\theta$ を変えながら「どの $\\\\theta$ のもとでデータが最も起きやすいか」を探すのが最尤推定の発想です。' },
      { id: 'est1-3', question: '最尤推定量を求める際に「対数尤度」を使う主な理由はどれか？', options: ['最大値が変わるから', '積の形が和に変わり微分しやすくなるから', '正規分布に近似されるから', '負の値を扱えるようになるから'], correctAnswer: 1, explanation: '独立なデータの尤度は $L = \\\\prod f(x_i;\\\\theta)$（積の形）です。$\\\\log L = \\\\sum \\\\log f(x_i;\\\\theta)$（和の形）にすると微分計算が簡単になります。$\\\\log$ は単調増加なので最大化の問題として同値です。' },
      { id: 'est1-6', question: '正規分布 $N(\\\\mu, \\\\sigma^2)$ の $\\\\mu$ の最尤推定量（MLE）はどれか？', options: ['中央値', '$\\\\frac{1}{n-1}\\\\sum X_i$', '標本平均 $\\\\bar{X}$', '$\\\\frac{1}{n}\\\\sum X_i^2$'], correctAnswer: 2, explanation: '対数尤度 $\\\\ell(\\\\mu) = -\\\\frac{n}{2}\\\\log(2\\\\pi\\\\sigma^2) - \\\\frac{1}{2\\\\sigma^2}\\\\sum(X_i-\\\\mu)^2$ を最大化すると $\\\\hat{\\\\mu} = \\\\bar{X}$ が得られます。これは不偏推定量でもあります。一方 $\\\\hat{\\\\sigma}^2 = \\\\frac{1}{n}\\\\sum(X_i-\\\\bar{X})^2$ は不偏ではない点に注意。' },
      { id: 'est1-7', question: 'モーメント法（Method of Moments）でポアソン分布 $\\\\text{Po}(\\\\lambda)$ の $\\\\lambda$ を推定するとき、推定量はどれか？', options: ['$\\\\sum X_i$', '$\\\\bar{X}$（標本平均）', '$S^2$（標本分散）', '$\\\\max(X_i)$'], correctAnswer: 1, explanation: 'モーメント法は $E[X] = \\\\lambda$ を標本平均 $\\\\bar{X}$ と等置します。$E[X] = \\\\lambda$ なので $\\\\hat{\\\\lambda}_{\\\\text{MM}} = \\\\bar{X}$ です。ポアソン分布では MLE も $\\\\bar{X}$ になるため、両者は一致します。' },
      { id: 'est1-10', question: '正規分布 $N(\\\\mu, \\\\sigma^2)$ の $\\\\sigma^2$ の MLE $\\\\hat{\\\\sigma}^2 = \\\\frac{1}{n}\\\\sum(X_i-\\\\bar{X})^2$ はなぜ不偏でないか？', options: ['$n$ が大きすぎるから', '$E[\\\\hat{\\\\sigma}^2] = \\\\frac{n-1}{n}\\\\sigma^2 \\\\neq \\\\sigma^2$ だから', '平均が既知でない場合に使えないから', 'MLE は必ず不偏でないから'], correctAnswer: 1, explanation: '$E[\\\\hat{\\\\sigma}^2] = \\\\frac{n-1}{n}\\\\sigma^2$ で真の値 $\\\\sigma^2$ より小さい方向に偏っています。不偏にするには分母を $n-1$ にした不偏分散 $S^2 = \\\\frac{1}{n-1}\\\\sum(X_i-\\\\bar{X})^2$ を使います。' },
      { id: 'est1-12', question: 'スコア方程式 $\\\\partial \\\\ell / \\\\partial \\\\theta = 0$ を解くことは何に相当するか？', options: ['尤度の最小化', '対数尤度の最大化点（極大点）の発見', '分散の最小化', 'データの標準化'], correctAnswer: 1, explanation: '対数尤度 $\\\\ell(\\\\theta)$ の導関数をゼロとおいた方程式がスコア方程式で、その解が MLE の候補です。2階微分が負であることを確認して最大点であることを確かめます。解が複数ある場合は全体の最大値を選びます。' },
      { id: 'est1-13', question: '指数分布 $\\\\text{Exp}(\\\\lambda)$（$f(x) = \\\\lambda e^{-\\\\lambda x}$、$E[X] = 1/\\\\lambda$）の MLE はどれか？', options: ['$\\\\bar{X}$', '$1/\\\\bar{X}$', '$\\\\sqrt{\\\\bar{X}}$', '$n / \\\\sum X_i^2$'], correctAnswer: 1, explanation: '対数尤度 $\\\\ell(\\\\lambda) = n\\\\log\\\\lambda - \\\\lambda \\\\sum X_i$ を微分すると $n/\\\\lambda - \\\\sum X_i = 0$、解くと $\\\\hat{\\\\lambda} = n/\\\\sum X_i = 1/\\\\bar{X}$ です。モーメント法（$E[X] = 1/\\\\lambda$ から $\\\\hat{\\\\lambda} = 1/\\\\bar{X}$）と一致します。' },
      { id: 'est1-14', question: 'モーメント法と MLE を比較したとき、一般に正しいものはどれか？', options: ['モーメント法の方が常に精度が高い', 'MLE の方が漸近的に効率が良い（分散が小さい）', '両者は常に同じ推定量を与える', 'モーメント法は正規分布にしか使えない'], correctAnswer: 1, explanation: 'MLE は漸近有効性（asymptotic efficiency）を持ち、$n \\\\to \\\\infty$ でクラーメル・ラオ下限に達します。モーメント法は計算が簡単ですが一般に漸近分散が大きくなります。ただしポアソン分布のように両者が一致する場合もあります。' },
      { id: 'est1-15', question: '正規誤差モデルで最小二乗推定（OLS）と MLE の関係はどれか？', options: ['OLS は常に MLE より精度が高い', '正規誤差を仮定した場合、OLS と MLE は同じ解を与える', 'MLE は非線形モデルにしか使えない', 'OLS は不偏だが MLE は必ず不偏でない'], correctAnswer: 1, explanation: '線形回帰モデルで誤差が $N(0, \\\\sigma^2)$ に従うとき、対数尤度の最大化は残差二乗和 $\\\\sum(y_i - \\\\mathbf{x}_i^\\\\top \\\\boldsymbol{\\\\beta})^2$ の最小化と同値になります。これが OLS と MLE の一致の理由です。' },
      { id: 'est1-16', question: '連続一様分布 $\\\\text{Uniform}(0, \\\\theta)$ の MLE はどれか？', options: ['$\\\\bar{X}$', '$2\\\\bar{X}$', '$\\\\max(X_i)$（標本最大値）', '$\\\\min(X_i)$（標本最小値）'], correctAnswer: 2, explanation: '尤度 $L(\\\\theta) = \\\\theta^{-n}$（$\\\\theta \\\\geq \\\\max(X_i)$ のとき）は $\\\\theta$ が小さいほど大きくなります。最小の $\\\\theta$ は $\\\\max(X_i)$（これより小さくするとデータが説明不可能）なので MLE は $\\\\hat{\\\\theta} = \\\\max(X_i)$ です。スコア方程式が使えない例として重要です。' },
    ]
  }`;

const NEW_1_9C = `{
    id: '1.9c-estimator-props',
    title: '推定量の性質：不偏性・一致性・有効性の理論',
    chapter: 1,
    description: '良い推定量の4条件・ガウス・マルコフの定理・クラーメル・ラオの不等式——推定量の品質を評価する理論を学びます。',
    content: \`💡 **このモジュールで学ぶこと**

前のモジュールでは「どうやってパラメータを推定するか」（最尤法・モーメント法）を学びました。このモジュールでは「その推定量は良い推定量か」を評価する4つの性質と、精度の理論的限界（クラーメル・ラオの不等式）を学びます。

💡 **ダーツのたとえで4性質を覚える**

的の中心が「真の値 $\\\\theta$」、矢1本1本が「推定値 $\\\\hat{\\\\theta}$」とします。

---

### 1. 推定量の4つの性質

**不偏性**（Unbiasedness）：何度も試行したとき矢の**重心**が的の中心に来ている——$E[\\\\hat{\\\\theta}] = \\\\theta$。標本平均 $\\\\bar{X}$ は母平均の不偏推定量。標本分散 $\\\\frac{1}{n}\\\\sum(X_i-\\\\bar{X})^2$ は不偏でなく、$S^2 = \\\\frac{1}{n-1}\\\\sum(X_i-\\\\bar{X})^2$ が不偏分散。

**一致性**（Consistency）：矢の本数（データ数 $n$）を増やすほど中心に集まる——$\\\\hat{\\\\theta} \\\\xrightarrow{p} \\\\theta$（$n \\\\to \\\\infty$）。大数の法則が典型例。

**有効性**（Efficiency）：同じ「不偏な」推定量を比べたとき散らばり（分散）が最小——不偏推定量の中で分散が最小のものを**最小分散不偏推定量**（MVUE: Minimum Variance Unbiased Estimator）と呼びます。

**推定量の相対効率**：2つの不偏推定量 $\\\\hat{\\\\theta}_1$, $\\\\hat{\\\\theta}_2$ の相対効率 $e = \\\\text{Var}(\\\\hat{\\\\theta}_2)/\\\\text{Var}(\\\\hat{\\\\theta}_1)$。$e > 1$ なら $\\\\hat{\\\\theta}_1$ のほうが効率的。正規分布で標本平均 vs. 標本中央値の相対効率は $\\\\pi/2 \\\\approx 1.57$——標本平均のほうが効率的です。

🎯 **試験頻出**：不偏性と一致性は独立した性質です。「不偏だが不一致」「不偏でないが一致」の推定量が存在します。

---

### 2. ガウス・マルコフの定理

**ガウス・マルコフの定理**（Gauss-Markov Theorem）：線形モデル $\\\\mathbf{y} = X\\\\boldsymbol{\\\\beta} + \\\\boldsymbol{\\\\varepsilon}$（誤差は独立・等分散・期待値0を仮定）のもとで、最小二乗推定量（OLS）は**線形不偏推定量の中で分散が最小**です（**BLUE**: Best Linear Unbiased Estimator）。

「BLUEである」＝「線形・不偏・最小分散」の3条件を同時に満たす唯一の推定量がOLSです。誤差の正規性は不要（等分散だけで十分）な点が重要です。

---

### 3. クラーメル・ラオの不等式

**クラーメル・ラオの不等式**（Cramér-Rao Inequality）は「どんな不偏推定量も超えられない精度の限界」を与えます：

$$\\\\text{Var}(\\\\hat{\\\\theta}) \\\\geq \\\\frac{1}{I(\\\\theta)}, \\\\quad I(\\\\theta) = E\\\\!\\\\left[\\\\left(\\\\frac{\\\\partial \\\\log f}{\\\\partial \\\\theta}\\\\right)^2\\\\right]$$

$I(\\\\theta)$ は**フィッシャー情報量**（Fisher Information）——「データが $\\\\theta$ についてどれだけ情報を持っているか」の指標です。$n$ 個の独立観測では下限は $1/(nI(\\\\theta))$——サンプルが増えるほど精度の限界が上がります。

この下限を達成する不偏推定量を**有効推定量**（efficient estimator）と呼びます。正規分布の $\\\\mu$ に対する $\\\\bar{X}$ が代表例。\`,
    keyFormulas: [
      { label: '不偏性', formula: 'E[\\\\hat{\\\\theta}] = \\\\theta' },
      { label: '一致性', formula: '\\\\hat{\\\\theta} \\\\xrightarrow{p} \\\\theta \\\\quad (n \\\\to \\\\infty)' },
      { label: 'クラーメル・ラオの不等式', formula: '\\\\text{Var}(\\\\hat{\\\\theta}) \\\\geq \\\\dfrac{1}{I(\\\\theta)}' },
      { label: 'フィッシャー情報量', formula: 'I(\\\\theta) = E\\\\!\\\\left[\\\\left(\\\\dfrac{\\\\partial \\\\log f}{\\\\partial \\\\theta}\\\\right)^2\\\\right]' },
      { label: '不偏分散', formula: 'S^2 = \\\\dfrac{1}{n-1}\\\\sum_{i=1}^n (X_i - \\\\bar{X})^2' },
    ],
    quiz: [
      { id: 'est1-1', question: '「推定量の期待値が真の値に等しい」という性質を何と呼ぶか？', options: ['一致性', '有効性', '不偏性', '十分性'], correctAnswer: 2, explanation: '不偏性は $E[\\\\hat{\\\\theta}] = \\\\theta$ です。例：標本平均 $\\\\bar{X}$ は母平均 $\\\\mu$ の不偏推定量。一方 $\\\\frac{1}{n}\\\\sum(X_i-\\\\bar{X})^2$ は不偏でなく、$\\\\frac{1}{n-1}$ で割る不偏分散 $S^2$ が不偏推定量です。' },
      { id: 'est1-2', question: '$n \\\\to \\\\infty$ のとき推定量が真の値に確率収束する性質を何と呼ぶか？', options: ['不偏性', '有効性', '十分性', '一致性'], correctAnswer: 3, explanation: '一致性は $\\\\hat{\\\\theta} \\\\xrightarrow{p} \\\\theta$ です。不偏性はサンプルサイズに関わらず成立する性質であり、一致性（大きな $n$ での収束）とは独立した概念です。「不偏だが不一致」「一致だが不偏でない」推定量が存在します。' },
      { id: 'est1-4', question: 'クラーメル・ラオの不等式においてフィッシャー情報量 $I(\\\\theta)$ が大きいほど推定はどうなるか？', options: ['分散の下限が上がり高精度が難しくなる', '分散の下限が下がりより精密な推定が原理的に可能になる', '推定量の期待値が大きくなる', '一致性が保証されなくなる'], correctAnswer: 1, explanation: '$I(\\\\theta)$ が大きいほど $1/I(\\\\theta)$ が小さくなり、分散の下限が低くなります。「データが $\\\\theta$ についてより多くの情報を含む」ほど精密な推定が可能になるという直感と一致します。' },
      { id: 'est1-5', question: 'ガウス・マルコフの定理が保証するのはどの範囲の最小分散性か？', options: ['すべての推定量の中で最小', 'すべての不偏推定量の中で最小', '線形不偏推定量の中で最小', '一致推定量の中で最小'], correctAnswer: 2, explanation: 'ガウス・マルコフの定理はOLSが「線形不偏推定量の中で最小分散（BLUE）」であることを保証します。非線形推定量や不偏でない推定量（リッジ回帰など）は含みません。正規性を仮定すれば「すべての不偏推定量中で最小」まで強化できます。' },
      { id: 'est1-8', question: '正規分布で標本平均と標本中央値の相対効率（大標本）として正しいものはどれか？', options: ['中央値のほうが効率的（相対効率 $> 1$）', '両者の効率は同じ', '標本平均のほうが効率的（相対効率 $\\\\pi/2 \\\\approx 1.57$）', '相対効率はサンプルサイズで変わるため一定でない'], correctAnswer: 2, explanation: '正規分布の大標本で、標本中央値の漸近分散は $\\\\pi/(2n)$、標本平均の漸近分散は $\\\\sigma^2/n$。相対効率 $= (\\\\pi/(2n))/(1/n) = \\\\pi/2 \\\\approx 1.57$——標本平均のほうが約57%分散が小さく効率的です。重裾分布では中央値が有利になる場合もあります。' },
      { id: 'est1-9', question: 'クラーメル・ラオ下限を達成する不偏推定量を何と呼ぶか？', options: ['一致推定量', '十分統計量', '有効推定量', 'BLUE'], correctAnswer: 2, explanation: 'クラーメル・ラオの不等式が与える下限 $1/(nI(\\\\theta))$ をちょうど達成する不偏推定量を「有効推定量（efficient estimator）」と呼びます。正規分布の $\\\\mu$ に対する $\\\\bar{X}$ が代表例です。BLUEはガウス・マルコフの定理が保証する「線形不偏推定量の中の最小分散推定量」で、やや異なる概念です。' },
      { id: 'est1-17', question: '不偏性と一致性の関係として正しいものはどれか？', options: ['不偏なら必ず一致する', '一致なら必ず不偏である', '不偏だが不一致な推定量、一致だが不偏でない推定量がどちらも存在する', '2つは同じ概念を異なる言葉で表したもの'], correctAnswer: 2, explanation: '不偏性は「有限サンプルでの期待値の一致」、一致性は「$n \\\\to \\\\infty$ での確率収束」で独立した概念です。例：$\\\\hat{\\\\theta} = X_1$（最初の観測値だけを使う）は不偏だが一致でない。MLEの $\\\\hat{\\\\sigma}^2 = \\\\frac{1}{n}\\\\sum(X_i-\\\\bar{X})^2$ は不偏でないが一致推定量です。' },
      { id: 'est1-18', question: '最小分散不偏推定量（MVUE）とはどんな推定量か？', options: ['すべての推定量の中で分散が最小', 'すべての不偏推定量の中で分散が最小', '最も計算が簡単な不偏推定量', '一致性も同時に満たす不偏推定量'], correctAnswer: 1, explanation: 'MVUE（Minimum Variance Unbiased Estimator）は「不偏性を満たすすべての推定量」の中で分散が最小のものです。クラーメル・ラオ下限を達成する不偏推定量（有効推定量）がMVUEになります。ラオ・ブラックウェルの定理は十分統計量を使ってMVUEを構成する方法を与えます。' },
      { id: 'est1-19', question: 'BLUEが保証する「線形不偏推定量の中の最小分散」に、正規性の仮定を加えるとどう強化されるか？', options: ['変わらない', '「すべての推定量の中で最小分散」になる', '「すべての不偏推定量の中で最小分散」になる', '「一致推定量の中で最小分散」になる'], correctAnswer: 2, explanation: 'ガウス・マルコフは正規性なしで「線形不偏推定量の中のBLUE」を保証します。誤差が正規分布に従うとき、OLSはMLE（すべての推定量を含む）と一致し、「すべての不偏推定量の中で最小分散」（MVUE）まで強化されます。' },
      { id: 'est1-20', question: '$n$ 個の独立同分布サンプルのとき、クラーメル・ラオの下限はどうなるか？', options: ['$I(\\\\theta)$', '$1/I(\\\\theta)$', '$n \\\\cdot I(\\\\theta)$', '$1/(n \\\\cdot I(\\\\theta))$'], correctAnswer: 3, explanation: '$n$ 個の独立観測では総フィッシャー情報量が $nI(\\\\theta)$ になるため、不偏推定量の分散の下限は $1/(nI(\\\\theta))$ です。$n$ が増えるほど下限が下がり（精度の上限が上がり）、「サンプルが多いほど精密な推定が可能」という直感と対応します。' },
    ]
  }`;

const oldStart = raw.indexOf(`{${nl}    id: '1.9-estimation',`);
const oldEnd = raw.indexOf(`{${nl}    id: '1.9b-ci',`);

if (oldStart === -1 || oldEnd === -1) {
  console.error('ERROR: markers not found', { oldStart, oldEnd });
  process.exit(1);
}

const newContent =
  raw.slice(0, oldStart) +
  NEW_1_9 + ',\n  ' +
  NEW_1_9C + ',\n  ' +
  raw.slice(oldEnd);

writeFileSync(filePath, newContent, 'utf8');
console.log('✅ 1.9-estimation を分割しました → 1.9-estimation + 1.9c-estimator-props');
