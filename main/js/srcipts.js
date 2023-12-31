let score = JSON.parse(localStorage.getItem('score')) || {
    wins: 0,
    losses: 0,
    ties: 0
};
updateScoreElement();

let isAutoPlaying = false;
let intervalId;

// const autoPlay = () =>{

// }

function autoPlay() {
    if (!isAutoPlaying) {

        intervalId = setInterval(() => {
            const playerMove = pickComputerMove();
            playGames(playerMove);
        }, 1000);
        isAutoPlaying = true;
    } else {
        clearInterval(intervalId);
        isAutoPlaying = false;
    }

}

const rockBtn = document.querySelector('.js-rock-btn');

rockBtn.addEventListener('click', ()=>{
    playGames('rock');
});

const paperBtn = document.querySelector('.js-paper-btn');
paperBtn.addEventListener('click', ()=>{
    playGames('paper');
});

const scissorsBtn = document.querySelector('.js-scissors-btn');

scissorsBtn.addEventListener('click', ()=>{
    playGames('scissors');
});

document.body.addEventListener('keydown', (event)=>{
    if (event.key === 'r') {
        playGames('rock');
    } else if(event.key === 'p') {
        playGames('paper');
    }else if (event.key === 's') {
        playGames('scissors')
    }
})

function playGames(playerMove) {
    const computerMove = pickComputerMove();

    let result = "";
    if (playerMove == "scissors") {
        if (computerMove === "rock") {
            result = "You lose";
        } else if (computerMove === "paper") {
            result = "You Win";
        } else if (computerMove === "scissors") {
            result = "Tie";
        }
    } else if (playerMove === "paper") {
        if (computerMove === "rock") {
            result = "You Win";
        } else if (computerMove === "paper") {
            result = "Tie";
        } else if (computerMove === "scissors") {
            result = "You lose";
        }
    } else if (playerMove === "rock") {
        if (computerMove === "rock") {
            result = "Tie";
        } else if (computerMove === "paper") {
            result = "You lose";
        } else if (computerMove === "scissors") {
            result = "You Win";
        }
    }

    if (result === 'You Win') {
        score.wins += 1;
    } else if (result === "You lose") {
        score.losses += 1;
    } else if (result === 'Tie') {
        score.ties += 1;
    };


    localStorage.setItem('score', JSON.stringify(score));
    updateScoreElement();

    document.querySelector('.js-result').innerHTML = result;

    document.querySelector('.js-moves').innerHTML = `You <img src="./main/img/${playerMove}-emoji.png" alt="rock" class="move-icon">
    <img src="./main/img/${computerMove}-emoji.png" alt="" class="move-icon">
     Comp`

}

function updateScoreElement() {
    document.querySelector('.js-score').innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}.
`;
}

function resetScore() {
    score.wins = 0;
    score.losses = 0;
    score.ties = 0;
    localStorage.removeItem('score')
    updateScoreElement();
}
// cons 

function pickComputerMove() {
    let computerMove = "";
    const randomNumber = Math.random();
    if (randomNumber >= 0 && randomNumber < 1 / 3) {
        computerMove = "rock";
    } else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
        computerMove = "paper";
    } else if (randomNumber >= 2 / 3 && randomNumber < 1) {
        computerMove = "scissors";
    }

    return computerMove;
}