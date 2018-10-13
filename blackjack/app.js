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
                var card = new Card(suits[i], ranks[j]);
                this.deck.push(card); 
            }
        }                
    }
    
    printDeck() {
        var i;
        var deckOrder = "";
        for(i = 0; i < this.deck.length; i++) {
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
        }        
    }
    
    adjustAce() {
        // while ace is true and ace busts soft value
        while(this.aces && this.value > 21) {
            // convert ace from 11 to 1, set ace back to 0
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

function hit(deck, hand) {
    let card = new Card();
    card = deck.dealCard();
    hand.addCard(card);
    hand.adjustAce();
}

function getDealerAsset(index) {
    document.getElementById('d' + index).src = 'assets/' + dealer.cards[index].rank + '_of_' + dealer.cards[index].suit + '.png';
}

function getPlayerAsset(index) {
    document.getElementById('p' + index).src = 'assets/' + player.cards[index].rank + '_of_' + player.cards[index].suit + '.png';
}

function disableButtons() {
    document.getElementById("btn-hit").disabled = true;
    document.getElementById("btn-stand").disabled = true;
}

function playerBust() {
    document.getElementById('name-1').textContent = "You lose";
    document.querySelector('.player-1-panel').classList.toggle('active');
    disableButtons();
}

function playerWin() {
    document.getElementById('name-1').textContent = "You win!";
    document.querySelector('.player-1-panel').classList.toggle('active');
    disableButtons();
}

function push() {
    document.getElementById('name-1').textContent = "Tie";
    document.querySelector('.player-1-panel').classList.toggle('active');
    disableButtons();
}

// ~~~~~~~~~~~~~~~~~~~~~~ MAIN ~~~~~~~~~~~~~~~~~~~~~~

var pIndex, dIndex;

var values = {'ace':11, '2':2, '3':3, '4':4, '5':5, '6':6, '7':7, '8':8, '9':9, '10':10, 'jack':10, 'queen':10, 'king':10};

let deck = new Deck();
let player = new Hand();
let dealer = new Hand();

init();

// disable hit and stand button until new game is pressed
document.getElementById("btn-hit").disabled = true;
document.getElementById("btn-stand").disabled = true;



document.querySelector('.btn-new').addEventListener('click', function() {
    init();
    dIndex = 1;
    pIndex = 0;
    
    document.querySelector('.player-1-panel').classList.remove('active');
    
    document.getElementById('score-0').textContent = '?';
    document.getElementById('score-1').textContent = '0';
    
    document.getElementById('name-1').textContent = 'Player';
    
    deck = new Deck();
    deck.shuffleDeck();

    player = new Hand();
    dealer = new Hand();
    
    // deal 2 cards to player and dealer
    dealer.addCard(deck.dealCard());
    player.addCard(deck.dealCard());
    dealer.addCard(deck.dealCard());
    player.addCard(deck.dealCard());
    
    // enable buttons
    document.getElementById("btn-hit").disabled = false;
    document.getElementById("btn-stand").disabled = false;
    
    // display dealer card    
    getDealerAsset(dIndex);
    dIndex++;
    
    // display player hand
    for(pIndex = 0; pIndex < dealer.cards.length; pIndex++) {   
        getPlayerAsset(pIndex);
    }
    
    // display score of player
    document.getElementById('score-1').textContent = player.getValue();
});

document.querySelector('.btn-hit').addEventListener('click', function() {
    // player draws
    hit(deck, player);

    // displays next set of cards
    document.getElementById('p' + pIndex).style.display = 'block';
    getPlayerAsset(pIndex);
    
    // adds previous card value to current card value
    document.getElementById('score-1').textContent = player.getValue();
    
    // check if player busts
    if(player.value > 21) {
        playerBust();
    }
    
    // increment to next card value for display
    pIndex += 1;
       
    // caps total cards to 5
    if(pIndex === 5) {
        document.getElementById("btn-stand").disabled = true;
        document.getElementById("btn-hit").disabled = true;
    }
});

document.querySelector('.btn-stand').addEventListener('click', function() {
    // if player doesn't bust
    if(player.value <= 21) {
        // dealer will keep hitting until 17
        while(dealer.value < 17) {
            hit(deck, dealer);
            document.getElementById('d' + dIndex).style.display = 'block';
            getDealerAsset(dIndex);
            document.getElementById('score-0').textContent = dealer.getValue();
            dIndex++;
        }
        
        // display score in case dealer is already >= 17
        document.getElementById('score-0').textContent = dealer.getValue();
        
        getDealerAsset(0);
        // dealer busts
        if(dealer.value > 21) {
            playerWin();
        }
        else if(dealer.value > player.value) {
            playerBust();
        }
        else if(player.value > dealer.value) {
            playerWin();
        }
        // tie
        else {
            push();
        }
    }
});
