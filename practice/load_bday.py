#!/bin/python

import json

dict = {}

with open('birthdays.json', 'r') as f:
	dict = json.load(f)
	
print ">>> Welcome to the birthday dictionary. We know the birthdays of:"

for key in dict.keys():
	print key
	
name = raw_input(">>> Who's birthday do you want to look up?\n")
print ">>> " + name + "'s birthday is " + dict.get(name)