#!/bin/python

import datetime

time = datetime.datetime.now()
time_str = time.strftime('%Y-%m-%d')

with open("here.txt", "w") as f:
	f.write("here's the header of our file")
	f.write("time: " + time_str)

print type(time)


file = open("here.txt", "r")
for line in file:
	print line
	