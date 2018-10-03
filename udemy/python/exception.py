#!/usr/python

try:
	for i in ['a','b','c']:
		print i**2
except:
	print "shit don't work"
finally:
	print "all done"
	
x = 5
y = 0
try:
	z = x/y
except:
	print "nope"
finally:
	print "all done"