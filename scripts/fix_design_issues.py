#!/usr/bin/env python3
"""Replace 4 design-issue questions with appropriate content."""
import re

content = open('src/data/modules.ts', 'r', encoding='utf-8') .read()

def replace_question(content, qid, new_line):
    pattern = f"id: '{qid}'"
    idx = content.find(pattern)
    if idx < 0:
        print(f"ERROR: {qid} not found")
        return content
    ls = content.rfind('\n', 0, idx) + 1
    le = content.find('\n', idx)
    old_line = content[ls:le]
    content = content[:ls] + new_line + content[le:]
    print(f"Replaced {qid}")
    return content

# q1a-5: target=1 (N(0,1)の95%区間)
content = replace_question(content, 'q1a-5',
    "      { id: 'q1a-5', question: '標準正規分布 $N(0,1)$ において $P(-1.96 \\\\leq Z \\\\leq 1.96) \\\\approx$ いくらか？', options: ['約 $0.683$', '約 $0.954$', '約 $0.997$', '約 $0.500$'], correctAnswer: 1, explanation: '$\\\\pm 1.96$ は正規分布の95%点であり $P(-1.96 \\\\leq Z \\\\leq 1.96) \\\\approx 0.954$。$\\\\pm 1$ が68.3%、$\\\\pm 2.58$ が99%に対応する。' },")

# q1b-5: target=2 (WLLN vs SLLN収束の違い)
content = replace_question(content, 'q1b-5',
    "      { id: 'q1b-5', question: '大数の弱法則（WLLN）と強法則（SLLN）の収束の種類の違いとして正しいものはどれか？', options: ['WLLNは概収束、SLLNは確率収束', 'WLLNとSLLNはどちらも概収束', 'WLLNは確率収束、SLLNは概収束', 'WLLNとSLLNはどちらも分布収束'], correctAnswer: 2, explanation: 'WLLNは確率収束（$P(|\\\\bar{X}_n - \\\\mu| > \\\\varepsilon) \\\\to 0$）、SLLNは概収束（$P(\\\\lim_{n\\\\to\\\\infty}\\\\bar{X}_n = \\\\mu) = 1$）。概収束のほうが強い収束概念。' },")

# q1b-9: target=2 (CLTの近似精度を決める要素)
content = replace_question(content, 'q1b-9',
    "      { id: 'q1b-9', question: '中心極限定理（CLT）で $\\\\bar{X}_n$ の正規近似の精度を主に決める要素はどれか？', options: ['母集団の期待値の大きさ', '母集団の分散の大きさ', 'サンプルサイズ $n$ の大きさ', '標本の取り方（復元か非復元か）'], correctAnswer: 2, explanation: 'CLTの収束速度は主にサンプルサイズ $n$ によって決まる。$n$ が大きいほど $\\\\bar{X}_n$ の分布は $N(\\\\mu, \\\\sigma^2/n)$ に近づく。母集団の歪度が大きいと収束は遅くなるが、主因は $n$。' },")

# asy1-1: target=2 (デルタ法の役割)
content = replace_question(content, 'asy1-1',
    "      { id: 'asy1-1', question: 'デルタ法により $g(\\\\hat{\\\\theta})$ の漸近分散は $[g\\'(\\\\theta)]^2 / (nI(\\\\theta))$ となる。$[g\\'(\\\\theta)]^2$ の役割はどれか？', options: ['フィッシャー情報量を補正する係数', '推定量のバイアスを表す項', '変換 $g$ による分散のスケーリング係数', '標本サイズによる収束率の調整'], correctAnswer: 2, explanation: 'デルタ法は $g(\\\\hat{\\\\theta}) \\\\approx g(\\\\theta) + g\\'(\\\\theta)(\\\\hat{\\\\theta}-\\\\theta)$ の1次近似を使う。$[g\\'(\\\\theta)]^2$ は変換の局所的な傾きの2乗で、元の分散をスケーリングする係数として機能する。' },")

with open('src/data/modules.ts', 'w', encoding='utf-8') as f:
    f.write(content)

print("Done.")
