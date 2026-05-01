#!/usr/bin/env python3
"""
Output all quiz questions in a readable format for quality review.
For each question: module, question text, options with correct marked, explanation snippet.
"""
import re

content = open('src/data/modules.ts', 'r', encoding='utf-8').read()

def parse_options(line):
    start = line.find('options:')
    if start < 0: return []
    brack = line.find('[', start)
    if brack < 0: return []
    depth = 0
    in_quote = None
    j = brack
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
    opts_str = line[brack:j+1]
    return re.findall(r"'((?:[^'\\]|\\.)*)'", opts_str)

# Parse all modules and questions
current_module = None
questions = []
lines = content.split('\n')

for lineno, line in enumerate(lines, 1):
    mid_m = re.match(r"\s+id:\s*'([^']+)',\s*$", line)
    if mid_m:
        next_lines = '\n'.join(lines[lineno:lineno+3])
        if 'title:' in next_lines or 'chapter:' in next_lines:
            current_module = mid_m.group(1)

    if "id: '" not in line or 'options:' not in line or 'correctAnswer:' not in line:
        continue

    qid_m = re.search(r"id:\s*'([^']+)'", line)
    q_m = re.search(r"question:\s*'((?:[^'\\]|\\.)*)'", line)
    ca_m = re.search(r'correctAnswer:\s*(\d+)', line)
    exp_m = re.search(r"explanation:\s*'((?:[^'\\]|\\.)*)'", line)
    opts = parse_options(line)

    questions.append({
        'module': current_module,
        'lineno': lineno,
        'qid': qid_m.group(1) if qid_m else '?',
        'question': q_m.group(1) if q_m else '?',
        'options': opts,
        'correct': int(ca_m.group(1)) if ca_m else -1,
        'explanation': exp_m.group(1) if exp_m else '?',
    })

# Heuristic checks for design issues
issues = []

for q in questions:
    opts = q['options']
    ca = q['correct']
    question = q['question']
    exp = q['explanation']
    qid = q['qid']

    if len(opts) != 4 or ca < 0 or ca > 3:
        continue

    correct_opt = opts[ca]
    wrong_opts = [opts[i] for i in range(4) if i != ca]

    # Issue A: Question text contains exact correct answer text (giveaway)
    if len(correct_opt) > 4 and correct_opt.replace('\\\\', '') in question.replace('\\\\', ''):
        issues.append(('A:正解がヒント', qid, q['module'],
                       f"Q: {question[:60]} → 正解[{ca}]: {correct_opt[:50]}"))

    # Issue B: Correct answer is much shorter than wrong answers (likely too obvious)
    correct_len = len(re.sub(r'\$[^$]*\$', '', correct_opt))
    wrong_lens = [len(re.sub(r'\$[^$]*\$', '', o)) for o in wrong_opts]
    avg_wrong_len = sum(wrong_lens) / 3 if wrong_lens else 0
    if correct_len < 5 and avg_wrong_len > 15:
        issues.append(('B:正解が極端に短い', qid, q['module'],
                       f"正解[{ca}]='{correct_opt[:30]}' avg_wrong={avg_wrong_len:.0f}chars"))

    # Issue C: Duplicate option text within question
    opt_texts = [o.strip() for o in opts]
    if len(set(opt_texts)) < 4:
        issues.append(('C:選択肢重複', qid, q['module'], f"opts={opt_texts}"))

    # Issue D: Question asks "どれか" but explanation says "正しいものをすべて" type
    # (mismatch between single-answer format and any mention of multiple correct answers)
    if '全て' in exp or 'すべて正しい' in exp or '全部' in exp:
        if '正解は' not in exp:
            issues.append(('D:複数正解の疑い', qid, q['module'],
                           f"exp: {exp[:80]}"))

    # Issue E: Explanation mentions specific option number - verify alignment
    sel_refs = re.findall(r'選択肢\s*([1-4])', exp)
    for ref in sel_refs:
        ref_idx = int(ref) - 1  # convert to 0-indexed
        if 0 <= ref_idx < len(opts):
            ref_opt = opts[ref_idx]
            # Explanation should be talking about this option - do a sanity check
            # Flag if referenced option is the CORRECT one AND explanation seems to criticize it
            if ref_idx == ca:
                # Referencing correct answer - probably discussing why it's right
                pass
            else:
                # Referencing a wrong option - check if content seems consistent
                # (heuristic: explanation says this is wrong somehow)
                pass
        else:
            issues.append(('E:存在しない選択肢番号', qid, q['module'],
                           f"選択肢{ref} referenced but only {len(opts)} options"))

    # Issue F: "以下のうち正しいものはどれか" + correctAnswer pointing to vague/short option
    # Issue G: Very similar options (might be testing trivial differences)
    # Check if 3+ options have same prefix
    prefixes = [re.sub(r'\$[^$]*\$', '', o).strip()[:20] for o in opts]
    unique_prefixes = set(prefixes)
    if len(unique_prefixes) == 1 and prefixes[0]:
        issues.append(('G:すべての選択肢が同じプレフィックス', qid, q['module'],
                       f"prefix='{prefixes[0]}'"))

print(f"Total questions: {len(questions)}")
print(f"Issues found: {len(issues)}")
print()

# Group issues by type
from collections import defaultdict
by_type = defaultdict(list)
for issue in issues:
    by_type[issue[0]].append(issue)

for itype, ilist in sorted(by_type.items()):
    print(f"=== {itype} ({len(ilist)}件) ===")
    for _, qid, mod, detail in ilist[:10]:
        print(f"  {qid} [{mod}]: {detail}")
    if len(ilist) > 10:
        print(f"  ... and {len(ilist)-10} more")
    print()
