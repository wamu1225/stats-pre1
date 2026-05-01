#!/usr/bin/env python3
"""
Comprehensive quiz audit for modules.ts.
Checks:
  1. Syntax: each question has exactly 4 options, correctAnswer in 0-3
  2. Uniqueness: no duplicate question IDs
  3. Count: each module has exactly 10 questions
  4. Content: no blank question text or blank options
  5. Rotation integrity: correctAnswer index actually points to the
     semantically correct option (heuristic: explanation should
     contain keywords found in the correct option, or at least not
     contain keywords unique to wrong options)
  6. Option format: no broken/truncated option strings
  7. Distribution: correctAnswer spread across 0-3
"""

import re
from collections import Counter, defaultdict

with open('src/data/modules.ts', 'r', encoding='utf-8') as f:
    content = f.read()

errors = []
warnings = []

# ─── Parse questions ────────────────────────────────────────────────────────

def parse_options_from_line(line):
    """Bracket-aware single-quote tokenizer. Returns list of option strings."""
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
    opts = re.findall(r"'((?:[^'\\]|\\.)*)'", opts_str)
    if not opts:
        opts = re.findall(r'`((?:[^`\\]|\\.)*)`', opts_str)
    return opts


questions = []
module_ids = []
current_module = None
lines = content.split('\n')

for i, line in enumerate(lines, 1):
    # Detect module
    mid_m = re.match(r"\s+id:\s*'([^']+)'", line)
    if mid_m and 'question' not in line:
        current_module = mid_m.group(1)
        if current_module not in module_ids:
            module_ids.append(current_module)

    # Detect quiz question line
    if "id: '" not in line or 'options:' not in line or 'correctAnswer:' not in line:
        continue

    qid_m = re.search(r"id:\s*'([^']+)'", line)
    q_m = re.search(r"question:\s*'((?:[^'\\]|\\.)*)'", line)
    ca_m = re.search(r'correctAnswer:\s*(\d+)', line)
    exp_m = re.search(r"explanation:\s*'((?:[^'\\]|\\.)*)'", line)
    opts = parse_options_from_line(line)

    q = {
        'lineno': i,
        'qid': qid_m.group(1) if qid_m else None,
        'module': current_module,
        'question': q_m.group(1) if q_m else None,
        'options': opts,
        'correct': int(ca_m.group(1)) if ca_m else None,
        'explanation': exp_m.group(1) if exp_m else None,
    }
    questions.append(q)

print(f"Total questions parsed: {len(questions)}")
print()

# ─── 1. Duplicate IDs ───────────────────────────────────────────────────────
print("=== 1. Duplicate question IDs ===")
id_count = Counter(q['qid'] for q in questions)
dups = {k: v for k, v in id_count.items() if v > 1}
if dups:
    for qid, cnt in dups.items():
        errors.append(f"Duplicate ID '{qid}' appears {cnt} times")
        print(f"  ❌ '{qid}' appears {cnt} times")
else:
    print("  ✅ All IDs unique")

# ─── 2. Option count ────────────────────────────────────────────────────────
print("\n=== 2. Option count (must be 4) ===")
bad_opts = [q for q in questions if len(q['options']) != 4]
if bad_opts:
    for q in bad_opts:
        errors.append(f"Line {q['lineno']} ({q['qid']}): has {len(q['options'])} options")
        print(f"  ❌ Line {q['lineno']} ({q['qid']}): {len(q['options'])} options | opts={q['options'][:60]}")
else:
    print("  ✅ All questions have 4 options")

# ─── 3. correctAnswer range ─────────────────────────────────────────────────
print("\n=== 3. correctAnswer range (must be 0-3) ===")
bad_ca = [q for q in questions if q['correct'] is None or q['correct'] not in (0,1,2,3)]
if bad_ca:
    for q in bad_ca:
        errors.append(f"Line {q['lineno']} ({q['qid']}): correctAnswer={q['correct']}")
        print(f"  ❌ Line {q['lineno']} ({q['qid']}): correctAnswer={q['correct']}")
else:
    print("  ✅ All correctAnswer in 0-3")

# ─── 4. Blank content ───────────────────────────────────────────────────────
print("\n=== 4. Blank question text / blank options ===")
blank_issues = []
for q in questions:
    if not q['question'] or not q['question'].strip():
        blank_issues.append(f"Line {q['lineno']} ({q['qid']}): empty question text")
    for oi, opt in enumerate(q['options']):
        if not opt or not opt.strip():
            blank_issues.append(f"Line {q['lineno']} ({q['qid']}): blank option[{oi}]")
if blank_issues:
    for b in blank_issues:
        errors.append(b)
        print(f"  ❌ {b}")
else:
    print("  ✅ No blank question text or options")

# ─── 5. Per-module question count ───────────────────────────────────────────
print("\n=== 5. Per-module question count (must be 10) ===")
mod_counts = defaultdict(int)
mod_to_qs = defaultdict(list)
for q in questions:
    mod_counts[q['module']] += 1
    mod_to_qs[q['module']].append(q['qid'])

wrong_count = {m: c for m, c in mod_counts.items() if c != 10}
if wrong_count:
    for m, c in wrong_count.items():
        errors.append(f"Module '{m}': {c} questions (expected 10)")
        print(f"  ❌ '{m}': {c} questions")
else:
    print("  ✅ All modules have exactly 10 questions")

# ─── 6. correctAnswer distribution ─────────────────────────────────────────
print("\n=== 6. correctAnswer distribution ===")
dist = Counter(q['correct'] for q in questions)
total = len(questions)
for pos in range(4):
    count = dist.get(pos, 0)
    bar = '█' * (count // 5)
    print(f"  pos {pos}: {count:3d}/{total} ({count/total*100:.1f}%) {bar}")

# ─── 7. Truncated / suspiciously short options ──────────────────────────────
print("\n=== 7. Suspiciously short options (< 2 chars) ===")
short_opts = []
for q in questions:
    for oi, opt in enumerate(q['options']):
        # Strip LaTeX and check remaining length
        stripped = re.sub(r'\$[^$]*\$', '', opt).strip()
        if len(stripped) < 2 and len(opt.strip()) < 5:
            short_opts.append((q['lineno'], q['qid'], oi, repr(opt)))
if short_opts:
    for lineno, qid, oi, opt in short_opts:
        warnings.append(f"Line {lineno} ({qid}) option[{oi}] very short: {opt}")
        print(f"  ⚠️  Line {lineno} ({qid}) option[{oi}]: {opt}")
else:
    print("  ✅ No suspiciously short options")

# ─── 8. Explanation mentions wrong option index ──────────────────────────────
print("\n=== 8. Explanation references wrong option position ===")
# Look for patterns like '選択肢1' '選択肢2' or '①②③④' in explanations
# that might reference the wrong position after rotation
pos_refs = []
for q in questions:
    if not q['explanation']:
        continue
    exp = q['explanation']
    # Check for explicit option number references like "選択肢1は" "選択肢2は"
    refs = re.findall(r'選択肢\s*([1-4])', exp)
    # Also check "①②③④" style
    refs += ['1' if c=='①' else '2' if c=='②' else '3' if c=='③' else '4' for c in re.findall(r'[①②③④]', exp)]
    if refs:
        pos_refs.append((q['lineno'], q['qid'], refs, exp[:80]))

if pos_refs:
    print(f"  ⚠️  {len(pos_refs)} questions reference option numbers in explanation (may be wrong after rotation):")
    for lineno, qid, refs, exp_preview in pos_refs[:20]:
        warnings.append(f"Line {lineno} ({qid}): mentions '選択肢{refs}' in explanation")
        print(f"     Line {lineno} ({qid}): mentions {refs} → {repr(exp_preview)}")
    if len(pos_refs) > 20:
        print(f"  ... and {len(pos_refs)-20} more")
else:
    print("  ✅ No option-position references found in explanations")

# ─── 9. Explanation should mention correct option content (heuristic) ────────
print("\n=== 9. Explanation / correct-option keyword match (heuristic) ===")
mismatch_suspects = []
for q in questions:
    if not q['explanation'] or q['correct'] is None or len(q['options']) != 4:
        continue
    correct_opt = q['options'][q['correct']]
    exp = q['explanation']

    # Extract key tokens from the correct option (non-LaTeX, non-Japanese particles)
    core = re.sub(r'\$[^$]*\$', '', correct_opt)  # strip math
    tokens = re.findall(r'[A-Za-z]{3,}|[ぁ-ん]{2,}|[ァ-ン]{2,}|[一-龯]{2,}', core)

    if not tokens:
        continue  # all-math option, skip

    # Check if any token appears in explanation
    found = any(t in exp for t in tokens)
    if not found:
        mismatch_suspects.append((q['lineno'], q['qid'], q['correct'], correct_opt[:50], tokens[:3]))

if mismatch_suspects:
    print(f"  ⚠️  {len(mismatch_suspects)} questions where explanation doesn't mention correct option keywords:")
    for lineno, qid, ca, opt, tokens in mismatch_suspects[:15]:
        warnings.append(f"Line {lineno} ({qid}): correct opt[{ca}]='{opt}' keywords {tokens} not in explanation")
        print(f"     Line {lineno} ({qid}): opt[{ca}]='{opt[:40]}' tokens={tokens}")
    if len(mismatch_suspects) > 15:
        print(f"  ... and {len(mismatch_suspects)-15} more")
else:
    print("  ✅ All explanations seem to reference correct-option keywords")

# ─── Summary ─────────────────────────────────────────────────────────────────
print()
print("=" * 60)
print(f"ERRORS:   {len(errors)}")
print(f"WARNINGS: {len(warnings)}")
if errors:
    print("\nAll errors:")
    for e in errors:
        print(f"  ❌ {e}")
if not errors and not warnings:
    print("✅ Quiz looks clean!")
elif not errors:
    print("✅ No hard errors. Review warnings above.")
