/*----- constants -----*/
const SOURCE_CARDS = [
    { img: 'https://i.imgur.com/egWiMRQ.jpg', matched: false, name: 'Sun' },
    { img: 'https://i.imgur.com/yDGCwMt.jpg', matched: false, name: 'Mercury' },
    { img: 'https://i.imgur.com/T0SVljJ.jpg', matched: false, name: 'Venus' },
    { img: 'https://i.imgur.com/gQ6fXZq.jpg', matched: false, name: 'Earth' },
    { img: 'https://i.imgur.com/vGIv57s.jpg', matched: false, name: 'Mars' },
    { img: 'https://i.imgur.com/z4Vtpeb.jpg', matched: false, name: 'Jupiter' },
    { img: 'https://i.imgur.com/0zlibP3.jpg', matched: false, name: 'Saturn' },
    { img: 'https://i.imgur.com/DdcQ8L9.jpg', matched: false, name: 'Uranus' },
    { img: 'https://i.imgur.com/qA5GhRB.png', matched: false, name: 'Neptune' },
    { img: 'https://i.imgur.com/I7Y2yAW.png', matched: false, name: 'Moon' },
    { img: 'https://i.imgur.com/je3R2Ty.png', matched: false, name: 'Yuri Gagarin' },
    { img: 'https://i.imgur.com/cRaFvbr.png', matched: false, name: 'Laika' }
]
//6
const CARD_BACK = "https://i.imgur.com/hljAiZT.jpg";
const SECOND_CARD_TIME = 2000;


/*----- app's state (variables) -----*/
let cards;//cards array of obj x2
let selectedCard;
let badGuessCount;
let ignoreClick;
let winner;
var timerVar = setInterval(countTimer, 1000);
var totalSeconds = 0;


/*----- cached element references -----*/
//7
const btnEl = document.querySelector('button');
const msgEl = document.getElementById('msgEl');
const cardImgEls = document.querySelectorAll('#cards > img');


/*----- event listeners -----*/
btnEl.addEventListener('click', reset);
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

function reset() {
    init();
    timerVar = setInterval(countTimer, 1000);
}
//9
function handleChoice(evt) {
    const cardIdx = parseInt(evt.target.id);
    const card = cards[cardIdx];
    playAudio();
    if (ignoreClick || isNaN(cardIdx) || card.matched) return;
    if (selectedCard && selectedCard === card) {
        badGuessCount++;
        selectedCard = null;
    } else if (selectedCard) {
        //check for match
        if (card.img === selectedCard.img) {
            matchedAudio();
            document.getElementById('name').innerText = `You matched : ${card.name}!`;
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
    btnEl.style.visibility = winner ? 'visible' : 'hidden';
    cards.forEach(function (card, idx) {
        const src = card.matched || selectedCard === card ? card.img : CARD_BACK;
        cardImgEls[idx].src = src;
    });
    //8
    if (winner) {
        playWinAudio();
        myStopFunction();
        msgEl.innerText = 'You Win!';
    } else {
        msgEl.innerText = `Mismatches: ${badGuessCount}`;
    }
}

function countTimer() {
    ++totalSeconds;
    var hour = Math.floor(totalSeconds / 3600);
    var minute = Math.floor((totalSeconds - hour * 3600) / 60);
    var seconds = totalSeconds - (hour * 3600 + minute * 60);
    if (hour < 10)
        hour = "0" + hour;
    if (minute < 10)
        minute = "0" + minute;
    if (seconds < 10)
        seconds = "0" + seconds;
    document.getElementById("timer").innerHTML = hour + ":" + minute + ":" + seconds;
}

function playAudio() {
    var audio = document.getElementById("click");
    audio.play();
}

function playWinAudio() {
    var audio = document.getElementById("win");
    audio.play();
}

function matchedAudio() {
    var audio = document.getElementById("match");
    audio.play();
}

function myStopFunction() {
    clearInterval(timerVar);
    totalSeconds = 0;
}