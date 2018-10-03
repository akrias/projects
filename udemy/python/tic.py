#!/usr/python

import random

def print_board(board):
	print board[0],"|",board[1],"|",board[2]
	print "--+---+--"
	print board[3],"|",board[4],"|",board[5]	
	print "--+---+--"
	print board[6],"|",board[7],"|",board[8]

def player_input():
	marker = ''
	while not (marker == 'x' or marker == 'o'):
		marker = raw_input("What would player 1 want to be? (x or o): ")
	
	if(marker == "x"):
		return ('x', 'o')
	else:
		return ('o', 'x')

def place_marker(board, marker, position):
	board[position] = marker
	
def win_check(board, mark):
	if((board[0] == mark and board[1] == mark and board[2] == mark) or # top row
	(board[3] == mark and board[4] == mark and board[5] == mark) or # mid row
	(board[6] == mark and board[7] == mark and board[8] == mark) or # bot row
	(board[0] == mark and board[3] == mark and board[6] == mark) or # left col
	(board[1] == mark and board[4] == mark and board[7] == mark) or # mid col
	(board[2] == mark and board[5] == mark and board[8] == mark) or # right col
	(board[0] == mark and board[4] == mark and board[8] == mark) or # diag 
	(board[2] == mark and board[4] == mark and board[6] == mark)): # diag
		return True # you win 
	
	
def choose_first():
	
	turn = random.choice(['Player 1', 'Player 2'])

	return turn.strip()

def space_check(board, position):
	if(board[position] == ' '):
		return True
	else:
		return False
		
def full_board_check(board):
	for i in range(0,9):
		if(space_check(board, i)):
			return False
	return True
	
def player_choice(board):
	choice = ' '
	while choice not in '1 2 3 4 5 6 7 8 0'.split() or not space_check(board, int(choice)):
		choice = raw_input("Choose your next spot: ")
	return int(choice)

def replay():
	output = ''
	output = raw_input("Do you want to play again? (y)es or (n)o: " )
	return output
	

		
# *********************


print "\nWelcome to Tic-Tac-Toe!"

while True:
	#board = [0,1,2,3,4,5,6,7,8]
	board = [" "," "," "," "," "," "," "," "," "]
	#print_board(board)

	p1, p2 = player_input()

	#print p1,p2
	turn = choose_first()
	print turn," will go first."
	print "Player 1: ",p1
	print "Player 2: ",p2

	play = True

	#player_choice(board)

	while play == True:
		# p1 turn
		if(turn == "Player 1"):
			print "p1 turn"
			print_board(board)		
			position = player_choice(board)
			place_marker(board, p1, position)
			
			if win_check(board, p1):
				print_board(board)
				print("Player 1 wins")
				play == False
			else:
				if (full_board_check(board) == True):
					print_board(board)
					print "Tie"
					break
				else:
					turn = "Player 2"
		
		# p2 turn
		else:
			print_board(board)
			print "p2 turn"
			position = player_choice(board)
			place_marker(board, p2, position)
			
			if win_check(board, p2):
				print_board(board)
				print "Player 2 wins"
				play = False
			else:
				if full_board_check(board):
					print_board(board)
					print "Tie"
					break
				else:
					turn = "Player 1"
	
	if (replay() != 'y'):
		break