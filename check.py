import re
import json

def getLogoFile(name, logoMap, lookups):
    if name in logoMap and logoMap[name] != "":
        return logoMap[name]
    if name in logoMap and logoMap[name] == "":
        return None
    for regex, slug in lookups:
        if re.search(regex, name, re.IGNORECASE):
            return slug
    return None

import sys
sys.path.insert(0, "g:\\dx\\website\\src\\data\\comparison")
# we can't easily import ts in python. Let's just grep the names from index.ts.

names = []
with open("g:\\dx\\website\\src\\data\\comparison\\index.ts", "r") as f:
    content = f.read()
    import re
    matches = re.findall(r"\{ name: '([^']+)'", content)
    names.extend(matches)

# Let's extract logos.ts
with open("g:\\dx\\website\\src\\data\\comparison\\logos.ts", "r") as f:
    logos_content = f.read()

logoMap = {}
map_str = re.search(r"const logoMap: Record<string, string> = \{(.*?)\};", logos_content, re.DOTALL).group(1)
for line in map_str.split("\n"):
    m = re.search(r'"(.*?)": "(.*?)"', line)
    if m:
        logoMap[m.group(1)] = m.group(2)

lookups = []
lookups_str = re.search(r"const lookups: \[RegExp, string\]\[\] = \[(.*?)\];", logos_content, re.DOTALL).group(1)
for line in lookups_str.split("\n"):
    m = re.search(r'\[/(.*?)/i, "(.*?)"\]', line)
    if m:
        lookups.append((m.group(1), m.group(2)))

missing = []
for name in set(names):
    logo = getLogoFile(name, logoMap, lookups)
    if not logo:
        missing.append(name)

print("Missing icons for:", missing)
