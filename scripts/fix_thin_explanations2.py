#!/usr/bin/env python3
"""Fix remaining thin explanations that contain LaTeX (require raw string matching)."""
import re

content = open('src/data/modules.ts', 'r', encoding='utf-8').read()

def fix_explanation(content, qid, new_exp):
    pattern = rf"(id: '{qid}',.*?explanation: ')(.*?)(' \}})"
    m = re.search(pattern, content, re.DOTALL)
    if not m:
        # try double-quote explanation
        pattern2 = rf'(id: \'{qid}\',.*?explanation: ")(.*?)(" \}})'
        m = re.search(pattern2, content, re.DOTALL)
        if not m:
            print(f"NOT FOUND: {qid}")
            return content
    old_full = m.group(0)
    new_full = m.group(1) + new_exp + m.group(3)
    content = content.replace(old_full, new_full, 1)
    print(f"Fixed: {qid}")
    return content

# i1-2: 第1種の過誤
content = fix_explanation(content, 'i1-2',
    '第1種の過誤（偽陽性・$\\\\alpha$ エラー）は「帰無仮説が真なのに棄却する」誤りです。有意水準 $\\\\alpha$ はこの誤りを犯す確率の上限として事前に設定します（通常5%）。第2種の過誤（偽陰性・$\\\\beta$ エラー）は「対立仮説が真なのに帰無仮説を棄却しない」誤りで、$\\\\beta$ と表します。$\\\\alpha$ と $\\\\beta$ はトレードオフの関係にあり、$\\\\alpha$ を厳しくすると $\\\\beta$ が増えます。')

# i1-3: 検出力
content = fix_explanation(content, 'i1-3',
    '検出力（Power）$= 1 - \\\\beta$ は「真に対立仮説が正しいとき、正しく帰無仮説を棄却できる確率」です。効果量が大きい・サンプルサイズが多い・有意水準が緩い（$\\\\alpha$ が大きい）ほど検出力は高くなります。実験設計では通常 $1 - \\\\beta \\\\geq 0.8$ を目標に必要サンプルサイズを決定します。')

# i1-5: P値 0.03
content = fix_explanation(content, 'i1-5',
    '$p = 0.03 < \\\\alpha = 0.05$ なので帰無仮説を棄却します。P値は「帰無仮説のもとでこれ以上極端な結果が起きる確率」であり、0.03は有意水準5%の棄却域内に入っています。帰無仮説を棄却することは「対立仮説が正しいと証明した」のでなく「帰無仮説と矛盾するデータが得られた」ことを意味します。P値が小さいほど証拠が強く、大きいほど帰無仮説と矛盾しません。')

# i1-9: 検出力 80%
content = fix_explanation(content, 'i1-9',
    '検出力80%とは「実際に差があるとき80%の確率で正しく有意差を検出できる」設計です（$\\\\beta = 0.2$）。必要サンプルサイズは①効果量 $\\\\delta$、②有意水準 $\\\\alpha$、③検出力 $1-\\\\beta$ の3つが決まれば計算できます。例えば効果量が半分になると $n$ は約4倍必要（$n \\\\propto 1/\\\\delta^2$）。事前のPower Analysisで適切な $n$ を設計することが重要です。')

with open('src/data/modules.ts', 'w', encoding='utf-8') as f:
    f.write(content)

print("Done.")
