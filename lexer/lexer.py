import re
import json

with open('data/dataset.json', 'r') as f:
    global DATASET
    DATASET = json.load(f)

with open('data/selected.json', 'r') as f:
    global SELECTED
    SELECTED = json.load(f)

newdata = []

for el in DATASET:
    subarr = el.split()
    for x in subarr:
        newdata.append(x)

DATASET = newdata

for el in SELECTED:
    if el == '' or el == ' ':
        SELECTED.remove(el)

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

sample = [getReg(SELECTED[0]), getReg(SELECTED[1]), getReg(SELECTED[2])]
orders = []


for (i, value) in enumerate(DATASET):
    order = []
    for (j, patt) in enumerate(sample):
        if re.match(patt, DATASET[i+j]):
            order.append(DATASET[i+j])
        else:
            order = []
            break
    if order != []:
        orders.append(order)

printArr(orders)