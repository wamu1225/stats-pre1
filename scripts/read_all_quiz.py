#!/usr/bin/env python3
"""Print all quiz questions in human-readable format for quality review."""
import re, sys

content = open('src/data/modules.ts', 'r', encoding='utf-8').read()

def parse_options(line):
    start = line.find('options:')
    if start < 0: return []
    brack = line.find('[', start)
    if brack < 0: return []
    depth, in_quote, j = 0, None, brack
    while j < len(line):
        c = line[j]
        if in_quote:
            if c == '\\': j += 2; continue
            if c == in_quote: in_quote = None
        else:
            if c in ("'", '`'): in_quote = c
            elif c == '[': depth += 1
            elif c == ']':
                depth -= 1
                if depth == 0: break
        j += 1
    return re.findall(r"'((?:[^'\\]|\\.)*)'", line[brack:j+1])

current_module = None
lines = content.split('\n')
module_q_count = {}

for lineno, line in enumerate(lines, 1):
    mid_m = re.match(r"\s+id:\s*'([^']+)',\s*$", line)
    if mid_m:
        nxt = '\n'.join(lines[lineno:lineno+3])
        if 'title:' in nxt or 'chapter:' in nxt:
            current_module = mid_m.group(1)
            module_q_count[current_module] = 0

    if "id: '" not in line or 'options:' not in line or 'correctAnswer:' not in line:
        continue

    qid_m = re.search(r"id:\s*'([^']+)'", line)
    q_m = re.search(r"question:\s*'((?:[^'\\]|\\.)*)'", line)
    ca_m = re.search(r'correctAnswer:\s*(\d+)', line)
    exp_m = re.search(r"explanation:\s*'((?:[^'\\]|\\.)*)'", line)
    opts = parse_options(line)

    qid = qid_m.group(1) if qid_m else '?'
    question = q_m.group(1) if q_m else '?'
    ca = int(ca_m.group(1)) if ca_m else -1
    exp = exp_m.group(1) if exp_m else '?'

    mod = current_module or '?'
    if mod not in module_q_count:
        module_q_count[mod] = 0
    module_q_count[mod] += 1
    q_num = module_q_count[mod]

    if q_num == 1:
        print(f"\n{'='*70}")
        print(f"MODULE: {mod}")
        print(f"{'='*70}")

    print(f"\nQ{q_num} [{qid}]")
    print(f"  問: {question}")
    for i, o in enumerate(opts[:4]):
        mark = " ← 正解" if i == ca else ""
        print(f"  [{i}] {o}{mark}")
    print(f"  説: {exp[:120]}{'...' if len(exp) > 120 else ''}")
