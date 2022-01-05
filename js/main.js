/*----- constants -----*/
const SOURCE_CARDS = [
    { img: 'https://i.imgur.com/egWiMRQ.jpg', matched: false },
    { img: 'https://i.imgur.com/yDGCwMt.jpg', matched: false },
    { img: 'https://i.imgur.com/T0SVljJ.jpg', matched: false },
    { img: 'https://i.imgur.com/gQ6fXZq.jpg', matched: false },
    { img: 'https://i.imgur.com/vGIv57s.jpg', matched: false },
    { img: 'https://i.imgur.com/z4Vtpeb.jpg', matched: false },
    { img: 'https://i.imgur.com/0zlibP3.jpg', matched: false },
    { img: 'https://i.imgur.com/DdcQ8L9.jpg', matched: false },
    { img: 'https://i.imgur.com/qA5GhRB.png', matched: false },
    { img: 'https://i.imgur.com/I7Y2yAW.png', matched: false },
    { img: 'https://i.imgur.com/je3R2Ty.png', matched: false },
    { img: 'https://i.imgur.com/cRaFvbr.png', matched: false }
]
//6
const CARD_BACK = "https://i.imgur.com/hljAiZT.jpg";
const SECOND_CARD_TIME = 3000;
/*----- app's state (variables) -----*/
let cards;//cards array of obj x2
let selectedCard;
let badGuessCount;
let ignoreClick;
let winner;

/*----- cached element references -----*/
//7
const btnEl = document.querySelector('button');
const msgEl = document.getElementById('msgEl');
const cardImgEls = document.querySelectorAll('#cards > img');


/*----- event listeners -----*/
btnEl.addEventListener('click', init);
document.getElementById('cards').addEventListener('click', handleChoice);


/*----- functions -----*/
//1
init();

//2
function init() {
    buildShuffledCards();
    selectedCard = null;
    badGuessCount = 0;
    ignoreClick = false;
    winner = false;
    render();
}

//9
function handleChoice(evt) {
    const cardIdx = parseInt(evt.target.id);
    const card = cards[cardIdx];
    if (ignoreClick || isNaN(cardIdx) || card.matched) return;
    if (selectedCard && selectedCard === card) {
        badGuessCount++;
        selectedCard = null;
    } else if (selectedCard) {
        //check for match
        if (card.img === selectedCard.img) {
            card.matched = selectedCard.matched = true;
            selectedCard = null;
            winner = cards.every(card => card.matched);
        } else {
            ignoreClick = true;
            badGuessCount++;
            card.matched = true;
            setTimeout(function () {
                ignoreClick = false;
                selectedCard = null;
                card.matched = false;
                render();
            }, SECOND_CARD_TIME);
        }
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
    //let cardsHtml = '';
    //let curIdx = 0;
    btnEl.style.visibility = winner ? 'visible' : 'hidden';
    cards.forEach(function (card, idx) {
        const src = card.matched || selectedCard === card ? card.img : CARD_BACK;
        cardImgEls[idx].src = src;
    });
    //8
    if (winner) {
        msgEl.innerText = 'You Win!';
    } else {
        msgEl.innerText = `Mismatches: ${badGuessCount}`;
    }

}