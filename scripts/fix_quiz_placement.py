#!/usr/bin/env python3
"""
Fix correctAnswer bias in modules.ts.
Each quiz question is on one line: { id: 'pX-YY', ..., options: [...], correctAnswer: N, ... }
Uses seeded hash per question id to assign target position (0-3).
"""

import re

def hash_seed(s):
    """Deterministic hash for a string → integer 0-3."""
    h = 0
    for c in s:
        h = (h * 31 + ord(c)) & 0xFFFFFFFF
    return h % 4

def rotate_options(opts, old_correct, target):
    """Rotate opts so that opts[old_correct] ends up at position target."""
    k = (old_correct - target) % 4
    return [opts[(i + k) % 4] for i in range(4)]

def parse_options(options_str):
    """
    Parse the 4 single-quoted option strings from:
      ['opt1', 'opt2', 'opt3', 'opt4']
    Returns list of 4 raw option strings (without outer quotes).
    """
    # Remove leading/trailing brackets
    inner = options_str.strip()
    if inner.startswith('['):
        inner = inner[1:]
    if inner.endswith(']'):
        inner = inner[:-1]

    # Tokenize: find all 'quoted strings' allowing backslash escapes
    opts = []
    i = 0
    while i < len(inner):
        if inner[i] == "'":
            # Find closing quote
            j = i + 1
            while j < len(inner):
                if inner[j] == '\\':
                    j += 2  # skip escaped char
                elif inner[j] == "'":
                    break
                else:
                    j += 1
            opts.append(inner[i+1:j])
            i = j + 1
        elif inner[i] == '`':
            # Backtick-quoted option
            j = i + 1
            while j < len(inner):
                if inner[j] == '\\':
                    j += 2
                elif inner[j] == '`':
                    break
                else:
                    j += 1
            opts.append(inner[i+1:j])
            i = j + 1
            # Mark as backtick type
            opts[-1] = ('`', opts[-1])
        else:
            i += 1
    return opts

def build_options_str(opts, quote_char="'"):
    """Rebuild the options array string from a list of option strings."""
    parts = []
    for opt in opts:
        if isinstance(opt, tuple):
            # backtick-quoted
            parts.append(f"`{opt[1]}`")
        else:
            parts.append(f"'{opt}'")
    return '[' + ', '.join(parts) + ']'

def process_line(line):
    """Process a single line containing a quiz question. Returns modified line."""
    # Check if line has correctAnswer
    ca_match = re.search(r'correctAnswer:\s*(\d+)', line)
    if not ca_match:
        return line

    old_correct = int(ca_match.group(1))

    # Extract question id for seeding
    id_match = re.search(r"id:\s*'([^']+)'", line)
    if not id_match:
        return line
    q_id = id_match.group(1)

    # Compute target position using deterministic hash
    target = hash_seed(q_id)

    if old_correct == target:
        return line  # already at target, no change needed

    # Find the options array: options: [...] — bracket-aware to handle math like $E[X]$
    opts_pos = re.search(r'options:\s*\[', line)
    if not opts_pos:
        return line

    start = opts_pos.end() - 1  # position of '['
    depth = 0
    in_quote = None
    j = start
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
    opts_str = line[start:j+1]  # includes outer [ and ]
    opts_raw = parse_options(opts_str)

    if len(opts_raw) != 4:
        print(f"  WARNING: {q_id} has {len(opts_raw)} options, skipping")
        return line

    rotated = rotate_options(opts_raw, old_correct, target)

    # Determine quote character used (check first option)
    if opts_raw and isinstance(opts_raw[0], tuple):
        new_opts_str = build_options_str(rotated)
    else:
        # Check if original used backticks by looking at raw string
        if opts_str.lstrip('[').lstrip().startswith('`'):
            new_opts_str = build_options_str([('`', o) if not isinstance(o, tuple) else o for o in rotated])
        else:
            new_opts_str = build_options_str(rotated)

    # Replace options and correctAnswer in the line
    opts_end = j + 1
    new_line = line[:start] + new_opts_str + line[opts_end:]
    new_line = re.sub(r'correctAnswer:\s*\d+', f'correctAnswer: {target}', new_line)

    return new_line

# Read file
with open('src/data/modules.ts', 'r', encoding='utf-8') as f:
    lines = f.readlines()

# Process lines
changed = 0
new_lines = []
for line in lines:
    new_line = process_line(line)
    if new_line != line:
        changed += 1
    new_lines.append(new_line)

print(f"Modified {changed} quiz questions")

# Write back
with open('src/data/modules.ts', 'w', encoding='utf-8') as f:
    f.writelines(new_lines)

# Verify distribution
content = open('src/data/modules.ts', 'r', encoding='utf-8').read()
matches = re.findall(r'correctAnswer:\s*(\d+)', content)
from collections import Counter
dist = Counter(int(v) for v in matches)
total = len(matches)
print(f"\nDistribution after fix ({total} questions):")
for pos in range(4):
    count = dist.get(pos, 0)
    print(f"  correctAnswer: {pos} → {count}/{total} ({count/total*100:.1f}%)")
