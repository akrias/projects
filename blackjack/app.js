/*eslint-env browser*/
/* eslint-env node, mocha */

var scores;
var playerScore, dealerScore;
var activePlayer;

var gamePlaying = true;
var cardValue;

var suits = ['hearts', 'diamonds', 'spades', 'clubs'];
var ranks = ('ace', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'jack', 'queen', 'king');
var values = {'A':11, '2':2, '3':3, '4':4, '5':5, '6':6, '7':7, '8':8, '9':9, '10':10, 'jack':10,
         'queen':10, 'king':10};

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
    constructor() {
        
        var suits = ['hearts', 'diamonds', 'spades', 'clubs'];
        var ranks = ['ace', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'jack', 'queen', 'king'];
        
        this.deck = [];
        
        var i, j;
        for(i = 0; i < suits.length; i++) {            
            for(j = 0; j < ranks.length; j++) {
                //console.log(suits[i] + ranks[j]);
                
                var card = new Card(suits[i], ranks[j]);
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

    
    shuffleDeck(self) {
        var i, j, x;
        for(i = this.deck.length - 1; i > 0; i--) {
            j = Math.floor(Math.random() * (i + 1));
            x = this.deck[i];
            this.deck[i] = this.deck[j];
            this.deck[j] = x;
        }
        
        return this.deck;
    }
}
        


let deck = new Deck();
deck.shuffleDeck(deck);
console.log(deck.printDeck());




function init() {
    var i;
    var dealerCard, playerCard;
    for(i = 1; i < 6; i++) {
        dealerCard = "d" + i;
        playerCard = "p" + i;
        document.getElementById("d" + i).style.display = 'none';
        document.getElementById("p" + i).style.display = 'none';
    }
    
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    
    document.getElementById('d1').style.display = 'block';
    document.getElementById('d1').src = 'assets/back.png';
    //document.getElementById('d2').style.display = 'block';
    //document.getElementById('d2').src = 'assets/back.png';
    
    document.getElementById('p1').style.display = 'block';
    document.getElementById('p1').src = 'assets/back.png';
    document.getElementById('p2').style.display = 'block';
    document.getElementById('p2').src = 'assets/back.png';
    
    
}
    
document.querySelector('.btn-hit').addEventListener('click', function() {
    
});




init();