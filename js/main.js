/*----- constants -----*/
const SCOREBOARDS = {
    'player': 1,
    'computer': -1,
    'empty': 0
};

/*----- app's state (variables) -----*/
let board;//board array to represent the cards/  elements will hold 1/-1 for the players or 0 -> empty
let turn; //turn variable to remember whose turn (1, -1)
let winner; //winner variable represents which player won, a tie, a game in play.null -> game in progress; 1/-1 a player has won; 'T' -> Tie
let playerScores;//player scores to be updated after every pick as well as using to determine winner
let replay; //play again -> only appears when the game ends or tied

/*----- cached element references -----*/
const btnEl = document.querySelector('button');
const msgEl = document.getElementById('msgEl');
const cardEl = [...document.getElementById('cards')];


/*----- event listeners -----*/
btnEl.addEventListener('click', init);
document.getElementById('cards').addEventListener('click', handleMove);


/*----- functions -----*/

