/*eslint-env browser*/
/* eslint-env node, mocha */

var scores;
var playerScore, dealerScore;
var activePlayer;

var gamePlaying = true;
var cardValue;

//var suits = ['hearts', 'diamonds', 'spades', 'clubs'];
//var ranks = ('ace', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'jack', 'queen', 'king');
var values = {'ace':11, '2':2, '3':3, '4':4, '5':5, '6':6, '7':7, '8':8, '9':9, '10':10, 'jack':10, 'queen':10, 'king':10};

class Card {
    constructor(suit, rank) {
        this.suit = suit;
        this.rank = rank;
    }
    
    printCard() {
        return this.rank + " of " + this.suit;
    }
    getSuit() {
        return this.suit;
    }
    getRank() {
        return this.rank;
    }
}

class Deck {
    constructor(suits, ranks) {
        this.deck = []; // empty list of cards
        
        var suits = ['hearts', 'diamonds', 'spades', 'clubs'];
        var ranks = ['ace', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'jack', 'queen', 'king'];
        
        var i, j;
        for(i = 0; i < suits.length; i++) {            
            for(j = 0; j < ranks.length; j++) {
                //console.log(suits[i] + ranks[j]);
                
                var card = new Card(suits[i], ranks[j]);
                //console.log(card);
                this.deck.push(card); 
            }
        }                
    }
    
    printDeck() {
        var i;
        var deckOrder = "";
        for(i = 0; i < this.deck.length; i++) {
            //console.log(this.deck[i]);
            deckOrder += "\n" + i + ": " + this.deck[i].printCard();   
        }
        
        return deckOrder;
    }

    
    shuffleDeck() {
        var i, j, x;
        for(i = this.deck.length - 1; i > 0; i--) {
            j = Math.floor(Math.random() * (i + 1));
            x = this.deck[i];
            this.deck[i] = this.deck[j];
            this.deck[j] = x;
        }
        
        return this.deck;
    }
    
    dealCard() {
        let single = new Card();
        single = this.deck.pop();
        return single;
    }
}
        

class Hand {
    constructor() {
        this.cards = []; // starting with empty list of cards
        this.value = 0; // starting value of 0
        this.aces = 0; // keep track of aces
    }
    
    getValue() {
        return this.value;
    }
    
    displayHand() {
        var i;
        var handOrder = "";
        for(i = 0; i < this.cards.length; i++) {
            console.log(this.cards[i]);
        }
        
        return handOrder;
    }
    
    addCard(card) {
        
        this.cards.push(card);
        this.value += values[card.rank]; //sum value of each card
        if(card.rank === 'ace') {
            self.aces += 1;
        }
    }
}


class Chips {
    constructor() {
        self.total = 100;
        self.bet = 0;
    }
    
    winBet() {
        self.total += self.bet;
    }
    
    loseBet() {
        self.total -= self.bet;
    }
    
}









// ~~~~~~~~~~~~~~~~~~~~~~ MAIN ~~~~~~~~~~~~~~~~~~~~~~



let deck = new Deck();
deck.shuffleDeck();
//console.log(deck.printDeck());

let player = new Hand();
let dealer = new Hand();


//console.log(deck.printDeck());

dealer.addCard(deck.dealCard());
player.addCard(deck.dealCard());
dealer.addCard(deck.dealCard());
player.addCard(deck.dealCard());

//console.log(player.cards);
//console.log(dealer.cards);

console.log(player.getValue());
console.log(dealer.getValue());







document.querySelector('.btn-new').addEventListener('click', function() {
    
    init();
    
    var i;
    
    // dealer reveal
    for(i = 1; i < dealer.cards.length; i++) {
        //console.log(dealer.cards[i].suit);
        document.getElementById('d' + i).src = 'assets/' + dealer.cards[i].rank + '_of_' + dealer.cards[i].suit + '.png';
    }
    
    for(i = 0; i < dealer.cards.length; i++) {
        //console.log(dealer.cards[i].suit);
        document.getElementById('p' + i).src = 'assets/' + dealer.cards[i].rank + '_of_' + dealer.cards[i].suit + '.png';
    }
    
});

document.querySelector('.btn-hit').addEventListener('click', function() {
    
});

document.querySelector('.btn-stand').addEventListener('click', function() {
    
});



function init() {
    var i;
    var dealerCard, playerCard;
    for(i = 0; i < 5; i++) {
        dealerCard = "d" + i;
        playerCard = "p" + i;
        document.getElementById("d" + i).style.display = 'none';
        document.getElementById("p" + i).style.display = 'none';
    }
    
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    
    document.getElementById('d0').style.display = 'block';
    document.getElementById('d0').src = 'assets/back.png';
    document.getElementById('d1').style.display = 'block';
    document.getElementById('d1').src = 'assets/back.png';
    
    document.getElementById('p0').style.display = 'block';
    document.getElementById('p0').src = 'assets/back.png';
    document.getElementById('p1').style.display = 'block';
    document.getElementById('p1').src = 'assets/back.png';
    
    
}
    





init();