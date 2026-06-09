import re
import json

with open('data/dataset.json', 'r') as f:
    global DATASET
    DATASET = json.load(f)

with open('data/selected.json', 'r') as f:
    global SELECTED
    SELECTED = json.load(f)

def getReg(str):
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
    return pattern

def printArr(arr):
    for (i, value) in enumerate(arr):
        print(f"{i}: {value}")

for el in SELECTED:
    if el == '' or el == ' ': 
        continue
    print(f"{el} --> {getReg(el)}\n")