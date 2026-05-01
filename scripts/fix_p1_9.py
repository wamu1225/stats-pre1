#!/usr/bin/env python3
"""Fix p1-9 explanation that incorrectly references '選択肢2' (should be '選択肢1')."""

content = open('src/data/modules.ts', 'r', encoding='utf-8').read()

old_exp = '選択肢2は乗法定理の一般形（独立でない場合）ですが、独立のときは各条件付き確率が単純確率に等しくなり同値になります。'
new_exp = '選択肢1は乗法定理の一般形（独立でない場合）ですが、独立のときは各条件付き確率が単純確率に等しくなり同値になります。'

if old_exp not in content:
    print("ERROR: old explanation text not found")
    exit(1)

content = content.replace(old_exp, new_exp, 1)

with open('src/data/modules.ts', 'w', encoding='utf-8') as f:
    f.write(content)

print("Fixed p1-9 explanation: 選択肢2 → 選択肢1")
