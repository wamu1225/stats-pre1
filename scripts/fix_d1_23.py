#!/usr/bin/env python3
"""Fix d1-23 whose options array was corrupted: '$E[X]$ が有限のとき成立する' was split."""

content = open('src/data/modules.ts', 'r', encoding='utf-8').read()

# Find the broken line
idx = content.find("{ id: 'd1-23',")
if idx < 0:
    print("ERROR: d1-23 not found")
    exit(1)

line_start = content.rfind('\n', 0, idx) + 1
line_end = content.find('\n', idx)
old_line = content[line_start:line_end]
print("OLD:", repr(old_line[:200]))

# Reconstruct correct line
# Question: 期待値の線形性 $E[aX + b] = aE[X] + b$ はどんな分布でも成立するか？
# Options (target=1, correct at position 1):
#   0: すべての分布で成立する
#   1: $E[X]$ が有限のとき成立する  ← CORRECT
#   2: 正規分布のみ
#   3: 離散型のみ
# correctAnswer: 1
# Explanation: (preserved from original)

# Extract question and explanation from the broken line
q_match = __import__('re').search(r"question: '([^']+)'", old_line)
exp_match = __import__('re').search(r"explanation: '(.+)' \},", old_line)

if not q_match or not exp_match:
    print("Could not extract question/explanation, trying manual fix")

# The broken options string: ['すべての分布で成立する', '$E[X', '正規分布のみ', '離散型のみ']$ が有限のとき成立する']
# We need to replace this with the correct options

# Build correct line
new_line = (
    "      { id: 'd1-23', "
    "question: '期待値の線形性 $E[aX + b] = aE[X] + b$ はどんな分布でも成立するか？', "
    "options: ["
    "'すべての分布で成立する', "
    "'$E[X]$ が有限のとき成立する', "
    "'正規分布のみ', "
    "'離散型のみ'"
    "], "
    "correctAnswer: 1, "
    "explanation: '$E[aX+b] = aE[X] + b$ は期待値の線形性と呼ばれ、分布の種類を問わず $E[X]$ が存在（有限）すれば成立します。コーシー分布のように期待値が存在しない場合は適用できません。' },"
)

content = content[:line_start] + new_line + content[line_end:]

with open('src/data/modules.ts', 'w', encoding='utf-8') as f:
    f.write(content)

print("Fixed d1-23.")
