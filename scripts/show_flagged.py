#!/usr/bin/env python3
import re

content = open('src/data/modules.ts', 'r', encoding='utf-8').read()

def parse_options_from_line(line):
    start = line.find('options:')
    if start < 0:
        return []
    brack = line.find('[', start)
    if brack < 0:
        return []
    depth = 0
    in_quote = None
    j = brack
    while j < len(line):
        c = line[j]
        if in_quote:
            if c == '\\':
                j += 2
                continue
            if c == in_quote:
                in_quote = None
        else:
            if c in ("'", '`'):
                in_quote = c
            elif c == '[':
                depth += 1
            elif c == ']':
                depth -= 1
                if depth == 0:
                    break
        j += 1
    opts_str = line[brack:j+1]
    return re.findall(r"'((?:[^'\\]|\\.)*)'", opts_str)

# Show the 4 flagged questions + also run full scan for option-reference issues
target_ids = ['p1-11', 'p1-9', 'ci1-10', 'glm1-3']

for qid in target_ids:
    pattern = f"id: '{qid}'"
    idx = content.find(pattern)
    if idx < 0:
        print(f"{qid}: NOT FOUND")
        continue
    ls = content.rfind('\n', 0, idx) + 1
    le = content.find('\n', idx)
    line = content[ls:le]

    q_m = re.search(r"question: '((?:[^'\\]|\\.)*)'", line)
    ca_m = re.search(r'correctAnswer: (\d+)', line)
    exp_m = re.search(r"explanation: '((?:[^'\\]|\\.)*)'", line)
    opts = parse_options_from_line(line)

    ca = int(ca_m.group(1)) if ca_m else -1
    print(f"--- {qid} (correctAnswer: {ca}) ---")
    if q_m:
        print(f"Q: {q_m.group(1)[:100]}")
    for i, o in enumerate(opts[:4]):
        marker = " <-- CORRECT" if i == ca else ""
        print(f"  [{i}] {o[:80]}{marker}")
    if exp_m:
        print(f"Exp: {exp_m.group(1)[:200]}")
    print()
