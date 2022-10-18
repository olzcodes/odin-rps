const computerScore = document.querySelector("#score-computer");
const tieScore = document.querySelector("#score-tie");
const playerScore = document.querySelector("#score-player");
const roundDisplay = document.querySelector(".round");
const computerButtons = document.querySelectorAll(".computer-btn");
const message = document.querySelector(".message");
const playerButtons = document.querySelectorAll(".player-btn");

const weapons = ["rock", "paper", "scissors"];

const winningPlays = {
  rock: "paper",
  paper: "scissors",
  scissors: "rock",
};

const getComputerSelection = function () {
  const number = Math.trunc(3 * Math.random());
  return weapons[number];
};

const showComputerSelection = function (selection) {
  computerButtons.forEach((button) => {
    if (button.classList.value.split(" ")[1] === selection) {
      button.style.boxShadow = "0px 0px 40px 20px #0ff";
    }
    setTimeout(() => {
      button.style.boxShadow = "";
    }, 2000);
  });
};

const showPlayerSelection = function (button) {
  button.style.boxShadow = "0px 0px 40px 20px #ffd7ff";
  setTimeout(() => {
    button.style.boxShadow = "";
  }, 2000);
};

let playerSelection;
let computerSelection;
let round = 0;
let score = { computer: 0, tie: 0, player: 0 };

playerButtons.forEach((button) =>
  button.addEventListener("click", function (e) {
    playerSelection = this.classList.value.split(" ")[1];
    computerSelection = getComputerSelection();

    // Round counter
    round += 1;
    console.log(`Round ${round}`);
    roundDisplay.textContent = `round ${round}`;

    // Play one round and update score
    showComputerSelection(computerSelection);
    showPlayerSelection(this);
    const roundWinner = playRound(playerSelection, computerSelection);
    score[roundWinner]++;
    computerScore.textContent = score["computer"];
    tieScore.textContent = score["tie"];
    playerScore.textContent = score["player"];
    console.log(score);
    console.log(`------------------------------------`);

    if (round === 5) {
      checkWinner();
    }
  })
);

const playRound = function (playerSelection, computerSelection) {
  // Display choices
  console.log(`player:   ${playerSelection}`);
  console.log(`computer: ${computerSelection}`);

  // Check for tie
  if (playerSelection === computerSelection) {
    console.log(`TIE`);
    message.textContent = `TIE`;
    return "tie";

    // Check for player win
  } else if (playerSelection === winningPlays[computerSelection]) {
    console.log(`PLAYER wins!`);
    message.textContent = `PLAYER wins!`;
    return "player";

    // Computer wins
  } else {
    console.log(`COMPUTER wins!`);
    message.textContent = `COMPUTER wins!`;
    return "computer";
  }
};

const checkWinner = function () {
  // Check if there was a final winner
  if (score["player"] > score["computer"]) {
    console.log(`< < < PLAYER wins the game! > > >`);
    message.textContent = `< < < PLAYER wins the game! > > >`;
  } else if (score["player"] < score["computer"]) {
    console.log(`< < < COMPUTER wins the game! > > >`);
    message.textContent = `< < < COMPUTER wins the game! > > >`;
  } else {
    console.log(`< < < TIE > > >`);
    message.textContent = `< < < TIE > > >`;
  }

  setTimeout(afterGame, 1000);
};

const afterGame = function () {
  let playAgain = confirm(`play again?`);
  if (playAgain) {
    resetGame();
  } else {
    console.log(`Thank you for playing!`);
    message.textContent = `thank you for playing :)`;
  }
};

const resetGame = function () {
  console.clear();
  round = 0;
  score = { computer: 0, tie: 0, player: 0 };
  roundDisplay.textContent = "start";
  computerScore.textContent = 0;
  tieScore.textContent = 0;
  playerScore.textContent = 0;
  message.textContent = "choose your weapon";
};
