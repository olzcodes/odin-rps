const computerScore = document.querySelector("#score-computer");
const tieScore = document.querySelector("#score-tie");
const playerScore = document.querySelector("#score-player");
const result = document.querySelector(".result");
const UIbuttons = document.querySelectorAll(".player-btn");

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

let playerSelection;
let computerSelection;
let round = 0;
let score = { computer: 0, tie: 0, player: 0 };

UIbuttons.forEach((button) =>
  button.addEventListener("click", function (e) {
    // console.log(e.target);
    playerSelection = this.classList.value.split(" ")[1];
    computerSelection = getComputerSelection();

    // Round counter
    console.log(`Round ${(round += 1)}`);

    // Play one round and update score
    const roundWinner = playRound(playerSelection, computerSelection);
    score[roundWinner]++;
    computerScore.textContent = score["computer"];
    tieScore.textContent = score["tie"];
    playerScore.textContent = score["player"];
    console.log(score);
    console.log(`------------------------------------`);

    if (round === 5) {
      game();
      round = 0;
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
    result.textContent = `TIE`;
    return "tie";

    // Check for player win
  } else if (playerSelection === winningPlays[computerSelection]) {
    console.log(`PLAYER wins!`);
    result.textContent = `PLAYER wins!`;
    return "player";

    // Computer wins
  } else {
    console.log(`COMPUTER wins!`);
    result.textContent = `COMPUTER wins!`;
    return "computer";
  }
};

const game = function () {
  // Check if there was a final winner
  if (score["player"] > score["computer"]) {
    console.log(`<<<<< PLAYER wins the game! >>>>>`);
    result.textContent = `<<<<< PLAYER wins the game! >>>>>`;
  } else if (score["player"] < score["computer"]) {
    console.log(`<<<<< COMPUTER wins the game! >>>>>`);
    result.textContent = `<<<<< COMPUTER wins the game! >>>>>`;
  } else {
    console.log(`<<<<< TIE >>>>>`);
    result.textContent = `<<<<< TIE >>>>>`;
  }
};
