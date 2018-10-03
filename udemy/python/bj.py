#!/usr/python

import random

# ~~~~~~~~ Classes  ~~~~~~~~

class Card:
    def __init__(self, suit, rank):
        self.suit = suit
        self.rank = rank
    
    def __str__(self):
        return self.rank + " of " + self.suit
        
    def get_rank(self):
    	return self.rank
    
    def get_suit(self):
    	return self.suit
        
class Deck: 
    def __init__(self, suits, ranks):
        self.deck = []  # start with an empty list
        for suit in suits:
            for rank in ranks:
                self.deck.append(Card(suit, rank))
    
    def __str__(self):
		deck_order = ""
		for cards in self.deck:
			deck_order += '\n' + cards.__str__()
		return deck_order

    def shuffle(self):
        random.shuffle(self.deck)
        
    def deal(self):
		single = self.deck.pop()
		#print single
		return single

class Hand:
    def __init__(self):
        self.cards = []  # start with an empty list as we did in the Deck class
        self.value = 0   # start with zero value
        self.aces = 0    # add an attribute to keep track of aces
    
    def add_card(self,card):
        self.cards.append(card)
    	self.value += values[card.rank]
    	if(card.rank == 'A'):
    		self.aces += 1
    	
    def adjust_for_ace(self):
		while(self.aces and self.value > 21):
			self.value = self.value - 10
			self.aces = self.aces - 1
			
        
class Chips:
   
    def __init__(self):
        self.total = 100  # This can be set to a default value or supplied by a user input
        self.bet = 0 # value of player bet
        
    def win_bet(self):
        self.total += self.bet
    
    def lose_bet(self):
        self.total -= self.bet   


# ~~~~~~~~ Functions  ~~~~~~~~

def take_bet(chips):
	while True:
		try:
			chips.bet = int(raw_input("How much would you like to bet? "))
		except ValueError:
			print "Must be an int"
		else:
			if chips.total < chips.bet:
				print("Your bet exceeds your total chips")
			else:
				break

def hit(deck, hand):
	card = deck.deal()
	hand.add_card(card)
	hand.adjust_for_ace()

def hit_or_stand(deck, hand):
	global play
	
	while(True):
		choice = raw_input("(h)it or (s)tand? ")
		if(choice.lower() == "h"):
			hit(deck, hand)
		elif(choice.lower() == "s"):
			play = False
		else:
			print "Try again."
		break
		
def show_some(player, dealer):
	print "==================================="
	print "Cards in player's hand: "
	for card in player.cards:
		print card
	print "Total value: ", player.value
	print "\nCards in dealer's hand: "
	print "<Hidden Card>" #+ dealer.cards[0].__str__()
	print dealer.cards[1].__str__()
	print "==================================="
	
def show_all(player, dealer):
	print "==================================="
	print "\nCards in player's hand: "
	for card in player.cards:
		print card
	print "Total value: " , player.value
	print "\nCards in dealer's hand: "
	for card in dealer.cards:
		print card
	print "Total value: " , dealer.value
	print "==================================="

def player_busts(player, dealer, chips):
    #if(player.value > 21 & dealer.value <= 21): # player goes over 21, dealer 21 or lower
	chips.lose_bet()
	print "Player loses"
	print "==================================="

def player_wins(player, dealer, chips):
	chips.win_bet()
	print "Player wins"
	print "==================================="
	
def dealer_busts(player, dealer, chips):
	chips.win_bet()
	print "Dealer loses"
	print "==================================="

def dealer_wins(player, dealer, chips):
	chips.lose_bet()
	print "Dealer wins"
	print "==================================="

def push(player, dealer):
	print "It's a tie."
	print "==================================="    

# ~~~~~~~~ Main # ~~~~~~~~

suits = ('Hearts', 'Diamonds', 'Spades', 'Clubs')
ranks = ('A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K')
values = {'A':11, '2':2, '3':3, '4':4, '5':5, '6':6, '7':7, '8':8, '9':9, '10':10, 'J':10,
         'Q':10, 'K':10}
play = True

while True:
    # Print an opening statement
	print "==================================="
	print "Welcome to Blackjack\n"
	
    # Create & shuffle the deck, deal two cards to each player
	deck = Deck(suits, ranks)
	deck.shuffle()
	
	player = Hand()
	dealer = Hand()
	player.add_card(deck.deal())
	player.add_card(deck.deal())
	dealer.add_card(deck.deal())
	dealer.add_card(deck.deal())
        
    # Set up the Player's chips
	chips = Chips()
    
    # Prompt the Player for their bet
	take_bet(chips)
    
    # Show cards (but keep one dealer card hidden)
	show_some(player, dealer)
    
	while play:  # recall this variable from our hit_or_stand function
        
        # Prompt for Player to Hit or Stand
		hit_or_stand(deck, player)
        
        # Show cards (but keep one dealer card hidden)
		show_some(player, dealer)
        
        # If player's hand exceeds 21, run player_busts() and break out of loop
		if(player.value > 21):
			player_busts(player, dealer, chips)
			break

    # If Player hasn't busted, play Dealer's hand until Dealer reaches 17
	if(player.value <= 21):
		while(dealer.value < 17):
			hit(deck, dealer)
    
        # Show all cards
		show_all(player, dealer)
    	
        # Run different winning scenarios
		if(dealer.value > 21):
			dealer_busts(player, dealer, chips)
		elif(dealer.value > player.value):
			dealer_wins(player, dealer, chips)
		elif(player.value > dealer.value):
			player_wins(player, dealer, chips)
		else:
			push(player, dealer)
    
    # Inform Player of their chips total 
	print "Current chips: ", chips.total
    
    # Ask to play again
	go = raw_input("Would you like to play again (y/n)? ")
	if (go == "y"):
		play = True
		continue
	else:
		print "Exiting"	
		break
