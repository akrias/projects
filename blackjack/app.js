/*eslint-env browser*/
/* eslint-env node, mocha */


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
            this.aces += 1;
            console.log(this.aces);
        }        
    }
    
    
    adjustAce() {
        while(this.aces && this.value > 21) {
            this.value = this.value - 10;
            this.aces = this.aces - 1;
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





function hit(deck, hand) {
    let card = new Card();
    card = deck.dealCard();
    hand.addCard(card);
    hand.adjustAce();
}



// ~~~~~~~~~~~~~~~~~~~~~~ MAIN ~~~~~~~~~~~~~~~~~~~~~~



var scores;
var playerScore, dealerScore;
var activePlayer;

var gamePlaying = true;
var cardValue;

var index, i;

//var suits = ['hearts', 'diamonds', 'spades', 'clubs'];
//var ranks = ('ace', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'jack', 'queen', 'king');
var values = {'ace':11, '2':2, '3':3, '4':4, '5':5, '6':6, '7':7, '8':8, '9':9, '10':10, 'jack':10, 'queen':10, 'king':10};

init();

document.getElementById("btn-hit").disabled = true;
document.getElementById("btn-stand").disabled = true;



let deck = new Deck();
let player = new Hand();
let dealer = new Hand();


function getDealerAsset(index) {
    document.getElementById('d' + index).src = 'assets/' + dealer.cards[index].rank + '_of_' + dealer.cards[index].suit + '.png';
}

function getPlayerAsset(index) {
    document.getElementById('p' + index).src = 'assets/' + player.cards[index].rank + '_of_' + player.cards[index].suit + '.png';
}

function addScore() {
    document.getElementById('score-0').textContent = dealer.getValue();
    document.getElementById('score-1').textContent = player.getValue();    

}



document.querySelector('.btn-new').addEventListener('click', function() {
    
    init();
    index = 0;
    i = 0;
    
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    
    deck = new Deck();
    deck.shuffleDeck();

    player = new Hand();
    dealer = new Hand();

    dealer.addCard(deck.dealCard());
    player.addCard(deck.dealCard());
    dealer.addCard(deck.dealCard());
    player.addCard(deck.dealCard());
    
    // enable buttons
    document.getElementById("btn-hit").disabled = false;
    document.getElementById("btn-stand").disabled = false;
    
    // display dealer card
    for(var i = 1; i < dealer.cards.length; i++) {
        getDealerAsset(i);
    }
    
    // display player hand
    for(index = 0; index < dealer.cards.length; index++) {   
        getPlayerAsset(index);
    }
    
    // display total score
    addScore();
    
    //console.log(dealer.displayHand());
    //console.log(player.displayHand());
    
});

document.querySelector('.btn-hit').addEventListener('click', function() {
    // both player draws
    hit(deck, dealer);
    hit(deck, player);

    //console.log(dealer.displayHand());
    console.log(player.displayHand());

    // displays next set of cards
    document.getElementById('d' + index).style.display = 'block';
    document.getElementById('p' + index).style.display = 'block';
    getDealerAsset(index);
    getPlayerAsset(index);
    
    addScore();
    
    index += 1;
        
    if(index === 5) {
        document.getElementById("btn-stand").disabled = true;
        document.getElementById("btn-hit").disabled = true;
    }
    
    
});

document.querySelector('.btn-stand').addEventListener('click', function() {
    console.log("you stand on me!");
});



function init() {
    var i;
    for(i = 0; i < 5; i++) {
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
