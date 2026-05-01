# -*- coding: utf-8 -*-
import json

with open(r'src\data\modules.ts', 'r', encoding='utf-8') as f:
    content = f.read()

# Locate the 1.6-binomial content inside backticks
start_tag = "id:`1.6-binomial`"
idx = content.find(start_tag)
if idx == -1:
    print("Could not find 1.6-binomial")
    exit(1)

# Find content property
content_prop_start = content.find("content:`", idx) + len("content:`")
content_prop_end = content.find("`,keyFormulas:", content_prop_start)

new_content = r"""💡 **このモジュールで学ぶこと**

「サイコロの目はどれが出やすいか？」「新薬の治験で10人に投与したとき、何人に効果が出るか？」——このような「数を数える（離散型の）」データには、試行の条件によって使う分布が変わります。このモジュールでは、最もシンプルな「離散一様分布」から出発し、「成功か失敗か」の繰り返しから生まれるベルヌーイ分布・二項分布・超幾何分布を具体例とともに学びます。

---

### 1. 離散一様分布：最もシンプルな離散分布

「公正なサイコロを1回振ったときの目の数」——どの値も全く同じ確率で出る場合が**離散一様分布**（Discrete Uniform Distribution）です。

$X$ が $1, 2, \\ldots, n$ の値を等確率でとるとき：

$$P(X = k) = \\frac{1}{n}, \\quad k = 1, 2, \\ldots, n$$

期待値 $E[X] = \\frac{n+1}{2}$（例：サイコロは $7/2 = 3.5$）、分散 $\\text{Var}(X) = \\frac{n^2-1}{12}$。

乱数生成・ゲーム理論・くじ引きなど、すべての選択肢が等確率の場面の基本分布です。

---

### 2. ベルヌーイ試行とベルヌーイ分布

ここからは「成功か失敗か」の2択に注目します。コインを1回投げて表（成功）か裏（失敗）かを見るような「2択の1回勝負」を**ベルヌーイ試行**と呼びます。

これを記述するのが**ベルヌーイ分布**（Bernoulli Distribution）です。成功確率を $p$（$0 < p < 1$）とすると：

$$P(X = 1) = p, \\quad P(X = 0) = 1-p$$

期待値 $E[X] = p$、分散 $\\text{Var}(X) = p(1-p)$。

---

### 3. 二項分布：「復元あり」の繰り返し

ベルヌーイ試行を**互いに独立に**（以前の結果に影響されず）$n$ 回繰り返したときの「成功回数」が従う分布が**二項分布**（Binomial Distribution）$B(n, p)$ です。「10回中何回成功するか」という問いに答えます：

$$P(X = k) = \\binom{n}{k} p^k (1-p)^{n-k}, \\quad k = 0, 1, \\ldots, n$$

$\\binom{n}{k}$ は「$n$ 回中 $k$ 回成功する順序の数（組み合わせ数）」です。

期待値 $E[X] = np$、分散 $\\text{Var}(X) = np(1-p)$。

🎯 **試験頻出**：$n$ が大きく $p$ が小さいとき二項分布はポアソン分布（$\\lambda = np$）で近似できます（少数法則）。$n$ が大きいとき正規分布でも近似できます（CLT）。

---

### 4. 超幾何分布：「復元なし」の繰り返し

「袋に赤玉5個・青玉10個。無作為に4個取り出したとき、赤玉が $k$ 個入っている確率は？」——これが**超幾何分布**（Hypergeometric Distribution）の典型的な状況です。二項分布との決定的な違いは「**復元なし**（取り出した玉を戻さないため、毎回の成功確率が変わる）」という点です。

母集団 $N$ 個のうち $K$ 個が特定の種類（成功）。そこから $n$ 個を無作為に（復元なしで）取り出したとき、特定の種類が $k$ 個入る確率：

$$P(X = k) = \\frac{\\binom{K}{k}\\binom{N-K}{n-k}}{\\binom{N}{n}}$$

期待値 $E[X] = nK/N$（二項分布の $np$ に相当）、分散は二項分布より小さく、有限母集団修正が入ります。母集団 $N$ が大きければ（$n/N < 5\\%$）超幾何分布は二項分布で近似できます。これが「復元なし ≈ 母集団が非常に大きければ復元ありと同じ」という直感に対応します。"""

# Replace the description as well
desc_start = content.find("description:`", idx) + len("description:`")
desc_end = content.find("`,content:`", desc_start)
new_desc = "「成功・失敗の繰り返し」から生まれる離散分布（ベルヌーイ・二項・超幾何）と離散一様分布を整理します。"

new_file_content = content[:desc_start] + new_desc + content[desc_end:content_prop_start] + new_content + content[content_prop_end:]

with open(r'src\data\modules.ts', 'w', encoding='utf-8') as f:
    f.write(new_file_content)

print("Module 1.6 patched successfully.")
