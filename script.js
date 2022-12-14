const html = document.querySelector("html");
const body = document.querySelector("body");
const scoreTable = document.querySelector(".score");
const computerScore = document.querySelector("#score-computer");
const tieScore = document.querySelector("#score-tie");
const playerScore = document.querySelector("#score-player");
const computerButtons = document.querySelectorAll(".computer-btn");
const messageMiddle = document.querySelector(".message-middle");
const playerButtons = document.querySelectorAll(".player-btn");
const messageBottom = document.querySelector(".message-bottom");
const audioStyleSwitch = document.querySelector("#audioStyleSwitch");
const audioButtonOn = document.querySelector("#audioButtonOn");
const audioPlayerWinSmall = document.querySelector("#audioPlayerWinSmall");
const audioPlayerWinBig = document.querySelector("#audioPlayerWinBig");
const audioComputerWin = document.querySelector("#audioComputerWin");
const audioNoWinner = document.querySelector("#audioNoWinner");

const weapons = ["rock", "paper", "scissors"];

const winningPlays = {
  rock: "paper",
  paper: "scissors",
  scissors: "rock",
};

const defaultTimeout = 1800;
let computerSelection;
let playerSelection;
let round = 0;
let roundWinner = "";
let gameActive = true;
let buttonOn = false;
let score = { computer: 0, tie: 0, player: 0 };

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
    }, defaultTimeout);
  });
};

const showPlayerSelection = function (button) {
  buttonOn = true;
  button.classList.add("on");
  audioButtonOn.play();
  setTimeout(() => {
    buttonOn = false;
    button.classList.remove("on");
  }, defaultTimeout);
};

const playerButtonClick = function () {
  playerButtons.forEach((button) =>
    button.addEventListener("click", playRound)
  );
};

const playRound = function () {
  if (buttonOn === true) return;

  if (gameActive === false) {
    afterGame();
    return;
  }

  // Play one round and update score
  round += 1;
  console.log(`Round ${round}`);
  computerSelection = getComputerSelection();
  playerSelection = this.classList.value.split(" ")[1];
  showComputerSelection(computerSelection);
  showPlayerSelection(this);
  roundWinner = getRoundWinner(playerSelection, computerSelection);
  score[roundWinner]++;
  computerScore.textContent = score["computer"];
  tieScore.textContent = score["tie"];
  playerScore.textContent = score["player"];
  console.log(score);
  console.log(`------------------------------------`);

  if (round === 5) {
    gameActive = false;
    setTimeout(() => {
      declareFinalWinner();
    }, defaultTimeout);
  } else {
    setTimeout(() => {
      messageMiddle.textContent = `Round ${round + 1}`;
    }, defaultTimeout);
  }
};

const getRoundWinner = function (playerSelection, computerSelection) {
  console.log(`player:   ${playerSelection}`);
  console.log(`computer: ${computerSelection}`);

  if (playerSelection === computerSelection) {
    console.log(`TIE`);
    messageMiddle.textContent = `TIE`;
    return "tie";
  } else if (playerSelection === winningPlays[computerSelection]) {
    console.log(`PLAYER wins!`);
    messageMiddle.textContent = `PLAYER wins!`;
    return "player";
  } else {
    console.log(`COMPUTER wins!`);
    messageMiddle.textContent = `COMPUTER wins!`;
    return "computer";
  }
};

const declareFinalWinner = function () {
  if (score["player"] > score["computer"]) {
    console.log(`< < < PLAYER wins the game! > > >`);
    messageMiddle.textContent = `PLAYER wins the game!`;
    if (score["computer"] === 0) {
      audioPlayerWinBig.play();
    } else {
      audioPlayerWinSmall.play();
    }
    scoreTable.style.borderColor = "violet";
    messageMiddle.style.borderColor = "violet";
    messageBottom.style.borderColor = "violet";
  } else if (score["player"] < score["computer"]) {
    console.log(`< < < COMPUTER wins the game! > > >`);
    messageMiddle.textContent = `COMPUTER wins the game!`;
    audioComputerWin.play();
    scoreTable.style.borderColor = "turquoise";
    messageMiddle.style.borderColor = "turquoise";
    messageBottom.style.borderColor = "turquoise";
  } else {
    console.log(`< < < NO WINNER > > >`);
    messageMiddle.textContent = `NO WINNER`;
    audioNoWinner.play();
    scoreTable.style.borderColor = "coral";
    messageMiddle.style.borderColor = "coral";
    messageBottom.style.borderColor = "coral";
  }

  messageBottom.textContent = `Thank you for playing :)`;
};

const afterGame = function () {
  let playAgain = confirm(`Play again?`);
  if (playAgain) {
    resetGame();
  } else {
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
  scoreTable.style.borderColor = "coral";
  messageMiddle.style.borderColor = "coral";
  messageBottom.style.borderColor = "coral";
  gameActive = true;
};

playerButtonClick();

// Toggle background color
let BGColorNumber = 0;

const toggleBGColor = function () {
  audioStyleSwitch.play();
  const BGColorArray = [
    "slateblue",
    "mediumpurple",
    "blueviolet",
    "mediumslateblue",
  ];
  html.style.backgroundColor = BGColorArray[BGColorNumber];
  if (BGColorNumber < BGColorArray.length - 1) {
    BGColorNumber++;
  } else BGColorNumber = 0;
};

scoreTable.addEventListener("click", toggleBGColor);

// Toggle background color
let borderColorNumber = 0;

const toggleBorderColor = function () {
  audioStyleSwitch.play();
  const borderColorArray = ["turquoise", "violet", "coral"];
  scoreTable.style.borderColor = borderColorArray[borderColorNumber];
  messageMiddle.style.borderColor = borderColorArray[borderColorNumber];
  messageBottom.style.borderColor = borderColorArray[borderColorNumber];
  if (borderColorNumber < borderColorArray.length - 1) {
    borderColorNumber++;
  } else borderColorNumber = 0;
};

messageMiddle.addEventListener("click", toggleBorderColor);

// Toggle font
let fontNumber = 0;
const toggleFont = function () {
  audioStyleSwitch.play();
  const fontClassArray = ["fontPTMono", "fontSyneMono", "fontDefault"];
  body.classList.remove(body.className);
  body.classList.add(fontClassArray[fontNumber]);
  if (fontNumber < fontClassArray.length - 1) {
    fontNumber++;
  } else fontNumber = 0;
};

messageBottom.addEventListener("click", toggleFont);

// Play using keyboard
const useKeyboard = function () {
  window.addEventListener("keydown", function (e) {
    if (e.code === "KeyR" || e.code === "KeyQ") {
      const playRoundRock = playRound.bind(playerButtons[0]);
      playRoundRock();
    }
    if (e.code === "KeyP" || e.code === "KeyW") {
      const playRoundPaper = playRound.bind(playerButtons[1]);
      playRoundPaper();
    }
    if (e.code === "KeyS" || e.code === "KeyE") {
      const playRoundScissors = playRound.bind(playerButtons[2]);
      playRoundScissors();
    }
    if (e.code === "Digit1") {
      toggleBGColor();
    }
    if (e.code === "Digit2") {
      toggleBorderColor();
    }
    if (e.code === "Digit3") {
      toggleFont();
    }
  });
};

useKeyboard();
