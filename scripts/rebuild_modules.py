# -*- coding: utf-8 -*-
import re

with open(r'dist\assets\index-eIwwqiBU.js', 'rb') as f:
    js_bytes = f.read()

# The modules array starts at: x=[{id:`1.1-probability`,...
# byte position of x=[ before first module
start_marker = b'x=[{id:`1.1-probability`'
arr_start = js_bytes.find(start_marker) + 2  # skip 'x=' to get to '['
print('Array start:', arr_start)

# Find the end: after 3.6-simulation (the last module) the array closes with }]
idx_last = js_bytes.rfind(b'3.6-simulation')
print('Last module (3.6-simulation) at:', idx_last)

# Find the end of the modules array: }] after the last quiz
# Search for }]; or }],  or });
end_patterns = [b'}];', b'}],', b'}])', b'}]}\n', b'}]}']
arr_end = -1
search_from = idx_last + 10000  # skip ahead past the module content
for pat in end_patterns:
    idx = js_bytes.find(pat, search_from)
    if idx > 0 and (arr_end < 0 or idx < arr_end):
        arr_end = idx + len(pat)
        print(f'End pattern {pat} found at {idx}')

print('Array end:', arr_end)
print('Context at end:', repr(js_bytes[arr_end-20:arr_end+20]))

# Extract
arr_bytes = js_bytes[arr_start:arr_end]
print('Array size:', len(arr_bytes), 'bytes')

# Write as TypeScript module
ts_content = (
    b'// stats-app/src/data/modules.ts\n'
    b'// RECONSTRUCTED FROM BUILD\n\n'
    b'export interface QuizQuestion {\n'
    b'  id: string;\n'
    b'  question: string;\n'
    b'  options: string[];\n'
    b'  correctAnswer: number;\n'
    b'  explanation: string;\n'
    b'}\n\n'
    b'export interface Module {\n'
    b'  id: string;\n'
    b'  title: string;\n'
    b'  chapter: number;\n'
    b'  description: string;\n'
    b'  content: string;\n'
    b'  keyFormulas?: { label: string; formula: string }[];\n'
    b'  interactiveType?: string;\n'
    b'  quiz: QuizQuestion[];\n'
    b'}\n\n'
    b'export const modules: Module[] = '
) + arr_bytes + b';\n'

with open(r'src\data\modules.ts', 'wb') as f:
    f.write(ts_content)
print('Written src/data/modules.ts:', len(ts_content), 'bytes')

# Verify key modules
print('\\n=== Verification ===')
module_ids = re.findall(rb'\{id:`([0-9]+\.[0-9]+-[a-z\-]+)`', arr_bytes)
print('Module count:', len(module_ids))
print('IDs:', [m.decode('utf-8') for m in module_ids])
