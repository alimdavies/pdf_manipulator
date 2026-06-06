import re

with open('input.txt') as i:
    txt = i.read()
str = 'world,'
pattern = r''

for x in str:
    if x.isalpha():
        if x.isupper():
            pattern += '[A-Z]'
        elif x.islower():
            pattern += '[a-z]'
    
    if x.isdigit():
        pattern += '[0-9]'
    
    if x == '.':
        pattern += '.'

    if x == ',':
        pattern += ','

matches = re.finditer(pattern, txt)

for x in matches:
    print(x)