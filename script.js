const computerScore = document.querySelector("#score-computer");
const tieScore = document.querySelector("#score-tie");
const playerScore = document.querySelector("#score-player");
const computerButtons = document.querySelectorAll(".computer-btn");
const messageMiddle = document.querySelector(".message-middle");
const playerButtons = document.querySelectorAll(".player-btn");
const messageBottom = document.querySelector(".message-bottom");

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
let gameActive = true;
let score = { computer: 0, tie: 0, player: 0 };

const letsPlay = function () {
  playerButtons.forEach((button) =>
    button.addEventListener("click", function (e) {
      if (gameActive === false) {
        afterGame();
        return;
      }

      playerSelection = this.classList.value.split(" ")[1];
      computerSelection = getComputerSelection();

      // Round counter
      round += 1;
      console.log(`Round ${round}`);

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
        gameActive = false;
        checkWinner();
      } else endRound();
    })
  );
};

const playRound = function (playerSelection, computerSelection) {
  // Display choices
  console.log(`player:   ${playerSelection}`);
  console.log(`computer: ${computerSelection}`);

  // Check for tie
  if (playerSelection === computerSelection) {
    console.log(`TIE`);
    messageMiddle.textContent = `TIE`;
    return "tie";

    // Check for player win
  } else if (playerSelection === winningPlays[computerSelection]) {
    console.log(`PLAYER wins!`);
    messageMiddle.textContent = `PLAYER wins!`;
    return "player";

    // Computer wins
  } else {
    console.log(`COMPUTER wins!`);
    messageMiddle.textContent = `COMPUTER wins!`;
    return "computer";
  }
};

const endRound = function () {
  setTimeout(() => {
    messageMiddle.textContent = `round ${round + 1}`;
  }, 2000);
};

const checkWinner = function () {
  // Check if there was a final winner
  if (score["player"] > score["computer"]) {
    console.log(`< < < PLAYER wins the game! > > >`);
    messageMiddle.textContent = `< < < PLAYER wins the game! > > >`;
  } else if (score["player"] < score["computer"]) {
    console.log(`< < < COMPUTER wins the game! > > >`);
    messageMiddle.textContent = `< < < COMPUTER wins the game! > > >`;
  } else {
    console.log(`< < < NO WINNER > > >`);
    messageMiddle.textContent = `< < < NO WINNER > > >`;
  }

  round = 0;

  setTimeout(afterGame, 1000);
};

const afterGame = function () {
  let playAgain = confirm(`play again?`);
  if (playAgain) {
    resetGame();
  } else {
    gameActive = false;
    console.log(`Thank you for playing :)`);
    messageBottom.textContent = `thank you for playing :)`;
  }
};

const resetGame = function () {
  console.clear();
  round = 0;
  playerSelection = "";
  computerSelection = "";
  score = { computer: 0, tie: 0, player: 0 };
  computerScore.textContent = 0;
  tieScore.textContent = 0;
  playerScore.textContent = 0;
  messageMiddle.textContent = `round 1`;
  messageBottom.textContent = `choose your weapon`;
  gameActive = true;
};

letsPlay();
