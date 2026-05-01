#!/usr/bin/env python3
"""Fix single backslashes in LaTeX that should be double backslashes."""
import re

content = open('src/data/modules.ts', 'r', encoding='utf-8').read()

# LaTeX commands that need double backslash in TS strings
latex_cmds = [
    'alpha', 'beta', 'sigma', 'mu', 'sqrt', 'propto', 'approx',
    'cdots', 'text', 'mathbf', 'delta', 'epsilon', 'frac', 'sum',
    'leq', 'geq', 'cdot', 'Sigma', 'boldsymbol', 'lfloor', 'rfloor',
    'psi', 'lambda', 'theta', 'chi', 'omega', 'gamma', 'nu', 'eta',
    'xi', 'rho', 'pi', 'phi', 'tau', 'SS', 'hat', 'bar', 'tilde',
    'mathbb', 'mathrm', 'left', 'right', 'prod', 'int', 'log',
    'exp', 'max', 'min', 'sup', 'inf', 'lim', 'to', 'infty',
    'ge', 'le', 'neq', 'sim', 'top', 'perp', 'ldots', 'vdots',
    'quad', 'qquad', 'pm', 'mp', 'times', 'div', 'cap', 'cup',
    'subset', 'subseteq', 'in', 'notin', 'forall', 'exists',
    'partial', 'nabla', 'ell', 'emptyset', 'vareps', 'vare',
    'overline', 'underbrace', 'overbrace', 'xrightarrow',
]

def fix_backslashes(s):
    """Replace single backslashes before LaTeX commands with double backslashes."""
    result = []
    i = 0
    while i < len(s):
        if s[i] == '\\':
            # Check if already double backslash
            if i + 1 < len(s) and s[i+1] == '\\':
                # Already double, keep as is
                result.append('\\\\')
                i += 2
            else:
                # Single backslash - check if it's before a LaTeX command
                rest = s[i+1:]
                found_cmd = False
                for cmd in sorted(latex_cmds, key=len, reverse=True):
                    if rest.startswith(cmd) and (len(rest) == len(cmd) or not rest[len(cmd)].isalnum() and rest[len(cmd)] != '_'):
                        result.append('\\\\')
                        found_cmd = True
                        break
                if not found_cmd:
                    result.append('\\')
                i += 1
        else:
            result.append(s[i])
            i += 1
    return ''.join(result)

# Process each line
lines = content.split('\n')
new_lines = []
changed = 0

for line in lines:
    # Find explanation fields and fix backslashes in them
    # Match explanation: 'text' or explanation: "text"
    def fix_exp(m):
        quote = m.group(1)
        inner = m.group(2)
        fixed = fix_backslashes(inner)
        return f"explanation: {quote}{fixed}{quote}"

    new_line = re.sub(r"explanation: (['\"])(.*?)\1", fix_exp, line, flags=re.DOTALL)
    if new_line != line:
        changed += 1
    new_lines.append(new_line)

content = '\n'.join(new_lines)

with open('src/data/modules.ts', 'w', encoding='utf-8') as f:
    f.write(content)

print(f"Fixed backslashes in {changed} lines.")
