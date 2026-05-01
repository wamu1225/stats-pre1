# -*- coding: utf-8 -*-
"""
dist/assets/index-eIwwqiBU.js から全モジュール配列を抽出し
src/data/modules.ts を完全再構築するスクリプト
"""
import re

JS_FILE = r'dist\assets\index-eIwwqiBU.js'

with open(JS_FILE, 'rb') as f:
    js_bytes = f.read()

js = js_bytes.decode('utf-8', errors='replace')
print(f'JS chars: {len(js)}')

# The compiled modules array looks like:
# [{id:`1.1-clt`,...},...,{id:`3.2-timeseries`,...}]
# Find the start: first module id
start_marker = 'id:`1.1-clt`'
end_marker = js.rfind('`}]},')  # end of last quiz array before the modules array ends

idx_start = js.find(start_marker)
print(f'modules start at: {idx_start}')
# Go back to find the opening [{ 
brace_start = js.rfind('[{', 0, idx_start)
print(f'[{{ at: {brace_start}')

# Find the end of the modules array
# After the last module's quiz array closes, look for ]}
# The pattern is: }]} or }]}, 
# Find the last module id
last_module_ids = ['3.2-timeseries', '3.1-bayes', '2.4-factor', '2.3-regression']
last_mod_idx = -1
for mid in last_module_ids:
    idx = js.rfind(f'id:`{mid}`')
    if idx > last_mod_idx:
        last_mod_idx = idx
        last_mid = mid
print(f'Last module id found: {last_mid} at {last_mod_idx}')

# Find the end of the modules array: after the last quiz, find ]}
# Look for }]} pattern after the last module
end_idx = js.find('`}]},{', last_mod_idx)
if end_idx == -1:
    end_idx = js.find('`}]}', last_mod_idx)
print(f'end_idx: {end_idx}')
# The array ends at end_idx + len('`}]}')
array_content = js[brace_start:end_idx + 5]
print(f'Array content length: {len(array_content)}')

# Write raw extracted array
with open(r'scripts\modules_raw.txt', 'w', encoding='utf-8') as f:
    f.write(array_content)
print('Written to scripts/modules_raw.txt')

# Now we need to convert from compiled format back to TypeScript source
# The compiled format uses backtick strings ` ` for content
# Backslashes in math: in compiled JS, \\ becomes \\
# The source had \\\\ for each \\, so we need to convert back
# Actually in minified JS, the template literals are kept as-is
# So we can reconstruct the TS file from this

# Build the TypeScript file
ts_header = """// stats-app/src/data/modules.ts
// AUTO-RECONSTRUCTED from dist build

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface Module {
  id: string;
  title: string;
  chapter: number;
  description: string;
  content: string;
  keyFormulas?: { label: string; formula: string }[];
  interactiveType?: string;
  quiz: QuizQuestion[];
}

export const modules: Module[] = """

ts_footer = ";\n"

ts_content = ts_header + array_content + ts_footer

with open(r'src\data\modules_rebuilt.ts', 'w', encoding='utf-8') as f:
    f.write(ts_content)
print(f'Written modules_rebuilt.ts ({len(ts_content)} chars)')

# Count modules found
module_count = len(re.findall(r'id:`[0-9]', array_content))
print(f'Module count: {module_count}')
