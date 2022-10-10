const weapons = ["rock", "paper", "scissors"];

const winningPlays = {
  rock: "paper",
  paper: "scissors",
  scissors: "rock",
};

const getComputerChoice = function () {
  const number = Math.trunc(3 * Math.random());
  return weapons[number];
};

const displayChoices = function (playerSelection, computerSelection) {
  console.log(`player:   ${playerSelection}`);
  console.log(`computer: ${computerSelection}`);
};

const playRound = function (playerSelection, computerSelection) {
  displayChoices(playerSelection, computerSelection);

  // Check for tie
  if (playerSelection === computerSelection) {
    console.log(`TIE`);
    return "tie";

    // Check for player win
  } else if (playerSelection === winningPlays[computerSelection]) {
    console.log(`PLAYER wins!`);
    return "player";

    // Computer wins
  } else {
    console.log(`COMPUTER wins!`);
    return "computer";
  }
};

const game = function () {
  let score = { player: 0, computer: 0, tie: 0 };

  for (i = 0; i < 5; i++) {
    // Get player and computer selections
    const playerSelection = prompt(
      `choose your weapon [ rock , paper , scissors ]`
    ).toLowerCase();
    const computerSelection = getComputerChoice();

    // Display round number
    console.log(`Round ${i + 1}`);

    const roundWinner = playRound(playerSelection, computerSelection);
    score[roundWinner]++;
    console.log(score);
    console.log(`------------------------------------`);
  }

  if (score["player"] > score["computer"]) {
    console.log(`PLAYER wins the game!`);
  } else if (score["player"] < score["computer"]) {
    console.log(`COMPUTER wins the game!`);
  } else {
    console.log(`TIE`);
  }
};

game();
