/*----- constants -----*/
const SOURCE_CARDS = [
    { img: 'https://i.imgur.com/egWiMRQ.jpg', matched: true }
    { img: 'https://i.imgur.com/yDGCwMt.jpg', matched: false }
    { img: 'https://i.imgur.com/T0SVljJ.jpg', matched: false }
    { img: 'https://i.imgur.com/gQ6fXZq.jpg', matched: false }
    { img: 'https://i.imgur.com/vGIv57s.jpg', matched: false }
    { img: 'https://i.imgur.com/z4Vtpeb.jpg', matched: false }
    { img: 'https://i.imgur.com/0zlibP3.jpg', matched: false }
    { img: 'https://i.imgur.com/DdcQ8L9.jpg', matched: false }
    { img: 'https://i.imgur.com/qA5GhRB.png', matched: false }
    { img: 'https://i.imgur.com/I7Y2yAW.png', matched: false }
    { img: 'https://i.imgur.com/je3R2Ty.png', matched: false }
    { img: 'https://i.imgur.com/cRaFvbr.png', matched: false }
]
//6
const CARD_BACK = "file:///Users/enjimenji/Downloads/monica-garniga-XClNDg9Z9Ag-unsplash.jpg";
/*----- app's state (variables) -----*/
let cards;//cards array of obj x2
let selectedCard;
let badGuessCount;
//let turn; //turn variable to remember whose turn (1, -1)
//let winner; //winner variable represents which player won, a tie, a game in play.null -> game in progress; 1/-1 a player has won; 'T' -> Tie
//let playerScores;//player scores to be updated after every pick as well as using to determine winner
//let replay; //play again -> only appears when the game ends or tied

/*----- cached element references -----*/
//7
const btnEl = document.querySelector('button');
//const msgEl = document.getElementById('msgEl');
const cardEl = [...document.getElementById('cards')];


/*----- event listeners -----*/
btnEl.addEventListener('click', init);
document.getElementById('cards').addEventListener('click', handleClick);


/*----- functions -----*/
//1
init();

//2
function init() {
    buildShuffledCards();
    selectedCard = null;
    badGuessCount = 0;
    render();
}

//9
function handleChoice(evt) {
    const cardIdx = parseInt(evt.target.id);
    const card = cards[cardIdx];
    if (isNaN(cardIdx) || card.matched) return;
    if (selectedCard && selectedCard === card) {
        badGuessCount++;
    } else if (selectedCard) {
        //check for match
    } else {
        selectedCard = card;
    }
    render();
}
//3
function buildShuffledCards() {
    const tempCards = [];
    cards = [];
    SOURCE_CARDS.forEach(function (card) {
        tempCards.push({ ...card }, { ...card });
    });
    //4
    while (tempCards.length) {
        const randomIdx = Math.floor(Math.random() * tempCards.length);
        const randomCard = tempCards.splice(randomIdx, 1)[0];
        cards.push(randomCard);
    }
}

//5
function render() {
    let cardsHtml = '';
    let curIdx = 0;
    cards.forEach(function (card) {
        const src = card.matched || selectedCard === card ? card.img : CARD_BACK;
        cardsHtml += `<img src="${src} id="${curIdx}>`;
        curIdx++;
    });
    //8
    cardEl.innerHTML = cardsHtml;
}