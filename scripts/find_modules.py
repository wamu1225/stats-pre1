# -*- coding: utf-8 -*-
with open(r'dist\assets\index-eIwwqiBU.js', 'rb') as f:
    js_bytes = f.read()

# Find the modules array start by searching backward from 1.5
idx_15 = js_bytes.find(b'1.5-dist-features')

# Find all module ids between position 0 and idx_15
# They follow the pattern }]},{id:`X.X-
import re

# Search backwards for },{ patterns that could be module boundaries
chunk = js_bytes[100000:idx_15]
module_patterns = re.findall(rb'\}\]\},\{id:`([^`]+)`', chunk)
print('Module IDs found before 1.5:', [p.decode('utf-8', errors='replace') for p in module_patterns])

# Find the very beginning of modules array
# Look for all },{id:` occurrences in the whole file
all_modules = re.findall(rb'\{id:`([0-9]+\.[0-9]+-[a-z\-]+)`', js_bytes)
print('All module IDs found:', [m.decode('utf-8', errors='replace') for m in all_modules])

# Find where all modules start - look for the first {id:`1.
first_module_match = re.search(rb'\{id:`1\.[0-9]+-', js_bytes)
if first_module_match:
    print('First module match at:', first_module_match.start())
    print(repr(js_bytes[first_module_match.start()-20:first_module_match.start()+100]))

# Find the array start [ just before the first module
arr_start_idx = js_bytes.rfind(b'[{', 0, first_module_match.start())
print('Array [ at:', arr_start_idx)
print(repr(js_bytes[arr_start_idx:arr_start_idx+80]))
