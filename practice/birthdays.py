#!/bin/python

dict = {
	"Joe Smith" : "01/01/1988",
	"Jane Doe" : "02/02/2032",
	"Big Boi" : "03/23/1424",
	"Ehh Well" : "10/10/1000"
}

print ">>> Welcome to the birthday dictionary. We know the birthdays of:"

for key in dict.keys():
	print key
	
name = raw_input(">>> Who's birthday do you want to look up?\n")
print ">>> " + name + "'s birthday is " + dict.get(name)
