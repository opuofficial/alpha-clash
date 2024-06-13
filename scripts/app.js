const playNowBtn = document.getElementById("play-now-btn");
const playAgainBtn = document.getElementById("play-again-btn");
let lifeValue = 3;
let scoreValue = 0;
let currentLetter = null;

playNowBtn.addEventListener("click", playNow);

function playNow() {
  hideElementById("intro-screen");
  generateRandomLetter();
  showLetterOnDisplay();
  styleCurrentKey();
  setLifeAndScore();
  showElementById("playground-screen");
  addKeypressEvent();
}

function addKeypressEvent() {
  document.addEventListener("keyup", (e) => {
    const pressedKey = e.key;

    if (pressedKey == currentLetter) {
      incrementScoreValueAndDisplay();
      continueGame();
    } else {
      decrementLifeValueAndDisplay();
    }
  });
}

function continueGame() {
  removePrevLetterStyle();
  generateRandomLetter();
  showLetterOnDisplay();
  styleCurrentKey();
}

function removePrevLetterStyle() {
  document.getElementById(currentLetter).classList.remove("current-key");
}

function incrementScoreValueAndDisplay() {
  scoreValue++;
  document.getElementById("score").innerText = scoreValue;
}

function decrementLifeValueAndDisplay() {
  lifeValue--;

  if (lifeValue < 0) {
    gameOver();
  } else {
    document.getElementById("life").innerText = lifeValue;
  }
}

function gameOver() {
  hideElementById("playground-screen");
  showElementById("game-over-screen");

  const scoreElement = document.getElementById("game-score");
  scoreElement.innerText = scoreValue;
}

function setLifeAndScore() {
  document.getElementById("life").innerText = lifeValue;
  document.getElementById("score").innerText = scoreValue;
}

function styleCurrentKey() {
  document.getElementById(currentLetter).classList.add("current-key");
}

function showLetterOnDisplay() {
  document.getElementById("playground-display").innerText = currentLetter;
}

function hideElementById(id) {
  const element = document.getElementById(id);
  element.classList.add("hidden");
}

function showElementById(id) {
  const element = document.getElementById(id);
  element.classList.remove("hidden");
}

function generateRandomLetter() {
  const alphabet = "abcdefghijklmnopqrstuvwxyz";
  const randomIndex = Math.floor(Math.random() * alphabet.length);

  currentLetter = alphabet[randomIndex];
}

playAgainBtn.addEventListener("click", () => {
  hideElementById("game-over-screen");
  showElementById("playground-screen");

  playAgain();
});

function resetLifeValueAndScoreValue() {
  lifeValue = 3;
  scoreValue = 0;

  document.getElementById("life").innerText = lifeValue;
  document.getElementById("score").innerText = scoreValue;
}

function playAgain() {
  resetLifeValueAndScoreValue();
  continueGame();
}
