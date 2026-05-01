#!/usr/bin/env python3
import re

content = open('src/data/modules.ts', 'r', encoding='utf-8').read()
lines = content.split('\n')
problems = []

for i, line in enumerate(lines):
    if "id: '" not in line or 'options:' not in line or 'correctAnswer:' not in line:
        continue

    start = line.find('options:')
    brack_start = line.find('[', start)
    if brack_start < 0:
        continue

    depth = 0
    in_quote = None
    j = brack_start
    while j < len(line):
        c = line[j]
        if in_quote:
            if c == '\\' :
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

    opts_str = line[brack_start:j+1]
    # Count single-quoted option strings
    opts = re.findall(r"'(?:[^'\\]|\\.)*'", opts_str)
    if len(opts) != 4:
        qid_m = re.search(r"id: '([^']+)'", line)
        qid = qid_m.group(1) if qid_m else '?'
        problems.append((i+1, qid, len(opts), opts_str[:80]))

print(f'Found {len(problems)} broken questions:')
for lineno, qid, count, preview in problems:
    print(f'  line {lineno}: {qid} has {count} options | {repr(preview)}')
