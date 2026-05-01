#!/usr/bin/env python3
"""Fix duplicate quiz question IDs."""

content = open('src/data/modules.ts', 'r', encoding='utf-8').read()

# --- Fix 1: 1.3-total-prob p1-16..p1-20 → tp1-1..tp1-5 ---
# These are in the 1.3-total-prob module only.
# Strategy: find the quiz section of 1.3-total-prob, then rename within it.

# Locate the 1.3-total-prob module block
mod_start = content.find("id: '1.3-total-prob'")
assert mod_start >= 0, "1.3-total-prob not found"

# Find the next module start to bound the region
next_mod = content.find("id: '1.4-dist-basics'")
assert next_mod >= 0, "1.4-dist-basics not found"

region = content[mod_start:next_mod]
for old_id, new_id in [('p1-16', 'tp1-1'), ('p1-17', 'tp1-2'),
                        ('p1-18', 'tp1-3'), ('p1-19', 'tp1-4'), ('p1-20', 'tp1-5')]:
    count = region.count(f"id: '{old_id}'")
    assert count == 1, f"Expected 1 occurrence of {old_id} in 1.3-total-prob, found {count}"
    region = region.replace(f"id: '{old_id}'", f"id: '{new_id}'")
    print(f"1.3-total-prob: {old_id} → {new_id}")

content = content[:mod_start] + region + content[next_mod:]

# --- Fix 2: 2.3-discriminant d1-1..d1-10 → disc1-1..disc1-10 ---
disc_mod_start = content.find("id: '2.3-discriminant'")
assert disc_mod_start >= 0, "2.3-discriminant not found"

next_disc_mod = content.find("id: '2.4-factor'")
assert next_disc_mod >= 0, "2.4-factor not found"

disc_region = content[disc_mod_start:next_disc_mod]
for i in range(1, 11):
    old_id = f'd1-{i}'
    new_id = f'disc1-{i}'
    count = disc_region.count(f"id: '{old_id}'")
    assert count == 1, f"Expected 1 occurrence of {old_id} in 2.3-discriminant, found {count}"
    disc_region = disc_region.replace(f"id: '{old_id}'", f"id: '{new_id}'")
    print(f"2.3-discriminant: {old_id} → {new_id}")

content = content[:disc_mod_start] + disc_region + content[next_disc_mod:]

with open('src/data/modules.ts', 'w', encoding='utf-8') as f:
    f.write(content)

print("\nDone. Verifying...")

import re
from collections import Counter
all_ids = re.findall(r"id: '([^']+)',\s*question:", content)
dup = {k: v for k, v in Counter(all_ids).items() if v > 1}
if dup:
    print(f"Still duplicate IDs: {dup}")
else:
    print(f"All {len(all_ids)} question IDs are unique.")
