#!/bin/python

name = raw_input("What is your name? ")
age = int(raw_input("What is your age? "))
iter = int(raw_input("Input iterations: "))

diff = 100 - age
year = diff + 2018
output = name + ", you will turn 100 on the year of %d" % year

for i in range(0, iter):
	print "%d: " % i + output
