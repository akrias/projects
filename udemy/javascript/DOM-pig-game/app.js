/*eslint-env browser*/
/*eslint no-console: ["error", { allow: ["warn", "error"] }]*/

/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/


function rollDice() {
    return Math.floor(Math.random() * 6) + 1;
}

var scores;
var currentScore;
var activePlayer;

var gamePlaying = true;
var dice1, dice2;
var prevRoll;
var winScore = 20;
init();



document.querySelector('.btn-roll').addEventListener('click', function() {
    if(gamePlaying) {
        
        //console.log("prev roll: " + prevRoll);
        // create random #
        dice1 = rollDice();
        dice2 = rollDice();
        //console.log("current roll: " + dice);
        
        // display result    
        
        
        //var diceDOM = document.querySelector('.dice');
        document.getElementById('dice-1').style.display = 'block';
        document.getElementById('dice-2').style.display = 'block';
        //diceDOM.style.display = 'block';
        document.getElementById('dice-1').src = 'dice-' + dice1 + '.png'; 
        document.getElementById('dice-2').src = 'dice-' + dice2 + '.png'; 
        
        // if player rolls 6 twice in a row, reset current and global score
        if(dice1 === 6 && prevRoll === 6) {
            scores[activePlayer] = 0;
            document.querySelector('#score-' + activePlayer).textContent = '0';
            nextPlayer();
        }
        // update round score if rolled # is not 1    
        if(dice1 !== 1) {
            //add score
            currentScore += dice1;
            document.querySelector('#current-' + activePlayer).textContent = currentScore;                    
        }
        
        else {
            //next player
            nextPlayer();
            
        }
        
        prevRoll = dice1;
    }

    
});


document.querySelector('.btn-hold').addEventListener('click', function() {
    if(gamePlaying) {
        //save score to total score
        scores[activePlayer] += currentScore;

        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

        // check if player won
        var input = document.querySelector('.final-score').value;
        //console.log(input);
        
        // undefined, 0, null or "" coerced to false
        // anything else to true
        if(input) {
            winScore = input;
        }
        else {
            //default
            winScore = 100;
        }
        
        if(scores[activePlayer] >= winScore) {
            document.querySelector('#name-' + activePlayer).textContent = "WINNER BOIS";
            document.querySelector('dice-1').style.display = 'none';
            document.querySelector('dice-2').style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');

            gamePlaying = false;
        }
        else {

            //next player
            nextPlayer();        
        }
    
    }
    

});

function nextPlayer() {
    if(activePlayer === 0) {
        activePlayer = 1;
    }
    else {
        activePlayer = 0;
    }
    currentScore = 0;
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    //document.querySelector('.player-0-panel').classList.remove('active');
    //document.querySelector('.player-1-panel').classList.add('active');
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    //document.querySelector('.dice').style.display = 'none';
}

document.querySelector('.btn-new').addEventListener('click', init);




function init() {
    
    gamePlaying = true;
    scores = [0, 0];
    currentScore = 0;
    activePlayer = 0;    

    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    //document.querySelector('.dice').style.display = 'none';
    document.getElementById('dice-1').style.display = 'none';
    document.getElementById('dice-2').style.display = 'none';

    document.getElementById('name-0').textContent = "Player 1";
    document.getElementById('name-1').textContent = "Player 2";

    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    //first player start
    document.querySelector('.player-0-panel').classList.add('active');        
    

}

