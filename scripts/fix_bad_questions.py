#!/usr/bin/env python3
"""Replace p1-11 and p1-12 with better quiz questions."""

content = open('src/data/modules.ts', 'r', encoding='utf-8').read()

# --- p1-11 replacement ---
# Old: asks which axiom number corresponds to which statement (memorization)
# New: tests understanding of what can be derived from Kolmogorov axioms

old_p1_11_start = content.find("{ id: 'p1-11',")
old_p1_11_end = content.find('\n', old_p1_11_start)
old_p1_11 = content[old_p1_11_start:old_p1_11_end]

new_p1_11 = (
    "{ id: 'p1-11', "
    "question: 'コルモゴロフの確率の公理から導かれる性質として正しいものはどれか？', "
    "options: ["
    "'空事象の確率は $P(\\\\emptyset) = 0$ が成り立つ', "
    "'$P(A \\\\cup B) = P(A) + P(B)$ がすべての事象 $A, B$ で成立する', "
    "'$P(A \\\\cap B) = P(A) \\\\cdot P(B)$ がすべての事象 $A, B$ で成立する', "
    "'$P(A) \\\\geq P(B)$ ならば $A \\\\supseteq B$ が必ず成立する'"
    "], "
    "correctAnswer: 0, "
    "explanation: '公理3（加法性）から $A$ と $\\\\emptyset$ は互いに排反なので $P(A) + P(\\\\emptyset) = P(A \\\\cup \\\\emptyset) = P(A)$、よって $P(\\\\emptyset) = 0$ が導かれる。選択肢2は排反な場合にのみ成立（一般には $-P(A \\\\cap B)$ が必要）、選択肢3は独立の場合のみ成立する。' },"
)

content = content[:old_p1_11_start] + new_p1_11 + content[old_p1_11_end:]

# --- p1-12 replacement ---
# Old: "3以上が出る" probability using complement — complement unnecessary for direct counting
# New: "少なくとも1枚が表" problem where complement is genuinely efficient

old_p1_12_start = content.find("{ id: 'p1-12',")
old_p1_12_end = content.find('\n', old_p1_12_start)
old_p1_12 = content[old_p1_12_start:old_p1_12_end]

new_p1_12 = (
    "{ id: 'p1-12', "
    "question: '10枚のコインを同時に投げるとき、少なくとも1枚が表になる確率として正しいものはどれか（各コインの表裏は等確率）？', "
    "options: ["
    "'$\\\\left(\\\\dfrac{1}{2}\\\\right)^{10}$', "
    "'$1 - \\\\left(\\\\dfrac{1}{2}\\\\right)^{10}$', "
    "'$\\\\dfrac{10}{2^{10}}$', "
    "'$\\\\dfrac{10 \\\\cdot 2^9}{2^{10}}$'"
    "], "
    "correctAnswer: 1, "
    "explanation: '余事象「1枚も表が出ない（全部裏）」の確率は $(1/2)^{10}$ なので、少なくとも1枚表 $= 1 - (1/2)^{10} \\\\approx 0.999$。このように「少なくとも1回」という問いでは余事象が直接計算より圧倒的に簡単になる典型例。' },"
)

content = content[:old_p1_12_start] + new_p1_12 + content[old_p1_12_end:]

with open('src/data/modules.ts', 'w', encoding='utf-8') as f:
    f.write(content)

print("p1-11 and p1-12 replaced successfully.")
