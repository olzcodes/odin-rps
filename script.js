const html = document.querySelector("html");
const scoreTable = document.querySelector(".score");
const computerScore = document.querySelector("#score-computer");
const tieScore = document.querySelector("#score-tie");
const playerScore = document.querySelector("#score-player");
const computerButtons = document.querySelectorAll(".computer-btn");
const messageMiddle = document.querySelector(".message-middle");
const playerButtons = document.querySelectorAll(".player-btn");
const messageBottom = document.querySelector(".message-bottom");
const audioBGSwitch = document.querySelector("#audioBGSwitch");
const audioButtonOn = document.querySelector("#audioButtonOn");
const audioPlayerWin = document.querySelector("#audioPlayerWin");
const audioComputerWin = document.querySelector("#audioComputerWin");
const audioNoWinner = document.querySelector("#audioNoWinner");

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
      button.classList.add("on");
    }
    setTimeout(() => {
      button.classList.remove("on");
    }, 2000);
  });
};

const showPlayerSelection = function (button) {
  audioButtonOn.play();
  buttonOn = true;
  button.classList.add("on");
  setTimeout(() => {
    buttonOn = false;
    button.classList.remove("on");
  }, 2000);
};

let playerSelection;
let computerSelection;
let round = 0;
let gameActive = true;
let buttonOn = false;
let score = { computer: 0, tie: 0, player: 0 };

const letsPlay = function () {
  playerButtons.forEach((button) =>
    button.addEventListener("click", function (e) {
      if (buttonOn === true) return;

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
        setTimeout(() => {
          checkWinner();
        }, 2000);
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
    messageMiddle.textContent = `Round ${round + 1}`;
  }, 2000);
};

const checkWinner = function () {
  // Check if there was a final winner
  if (score["player"] > score["computer"]) {
    console.log(`< < < PLAYER wins the game! > > >`);
    messageMiddle.textContent = `PLAYER wins the game!`;
    audioPlayerWin.play();
  } else if (score["player"] < score["computer"]) {
    console.log(`< < < COMPUTER wins the game! > > >`);
    messageMiddle.textContent = `COMPUTER wins the game!`;
    audioComputerWin.play();
  } else {
    console.log(`< < < NO WINNER > > >`);
    messageMiddle.textContent = `NO WINNER`;
    audioNoWinner.play();
  }

  messageBottom.textContent = `Thank you for playing :)`;
};

const afterGame = function () {
  let playAgain = confirm(`Play again?`);
  if (playAgain) {
    resetGame();
  } else {
    gameActive = false;
    console.log(`------------------------------------`);
    console.log(`Thank you for playing :)`);
    messageBottom.textContent = `Thank you for playing :)`;
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
  messageMiddle.textContent = `Round 1`;
  messageBottom.textContent = `Choose your weapon`;
  gameActive = true;
};

letsPlay();

let colorNumber = 0;

const toggleBGColor = function () {
  audioBGSwitch.play();
  const colorArray = [
    "slateblue",
    "mediumpurple",
    "blueviolet",
    "mediumslateblue",
  ];
  html.style.backgroundColor = colorArray[colorNumber];
  if (colorNumber < colorArray.length - 1) {
    colorNumber++;
  } else colorNumber = 0;
};

scoreTable.addEventListener("click", toggleBGColor);
