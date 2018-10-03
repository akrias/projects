#!/bin/python

import random

print "Welcome to rock papers scissors!\n"

flag = True
while flag:	
	choice = raw_input("Choose (r)ock, (p)aper, or (s)cissors: ")
	if choice == 'r' or choice == 'p' or choice == 's':
		flag = False

if choice == 'r':
	p1 = "rock"
elif choice == 'p':
	p1 = "paper"
else:
	p1 = "scissor"

state = random.randint(1,3)
#print state

if state == 1:
	hand2 = 'r'
	opp = "rock"
elif state == 2:
	hand2 = 'p'
	opp = "paper"
else:
	hand2 = 's'
	opp = "scisssor"
	
print "You chose " + p1	
print "Your opponent chooses " + opp

if((choice == 'r' and hand2 == 'r') or (choice == 'p' and hand2 == 'p') or (choice == 's' and hand2 == 's')):
	print "You tie"
elif((choice == 'r' and hand2 == 'p') or (choice == 'p' and hand2 == 's') or (choice == 's' and hand2 == 'r')):
	print "You lose"
else:
	print "You win"

	