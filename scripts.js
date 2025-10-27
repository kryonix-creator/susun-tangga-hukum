let score = 0;
let time = 30;
let timer;
let gameActive = false;

const ball = document.getElementById("ball");
const scoreDisplay = document.getElementById("score");
const timeDisplay = document.getElementById("time");
const startBtn = document.getElementById("start-btn");
const gameArea = document.getElementById("game-area");

startBtn.addEventListener("click", startGame);

function startGame() {
  score = 0;
  time = 30;
  gameActive = true;
  scoreDisplay.textContent = score;
  timeDisplay.textContent = time;
  startBtn.disabled = true;
  moveBall();
  ball.style.display = "block";

  timer = setInterval(() => {
    time--;
    timeDisplay.textContent = time;

    if (time <= 0) {
      endGame();
    }
  }, 1000);
}

ball.addEventListener("click", () => {
  if (!gameActive) return;
  score++;
  scoreDisplay.textContent = score;
  moveBall();
});

function moveBall() {
  const areaWidth = gameArea.clientWidth - 40;
  const areaHeight = gameArea.clientHeight - 40;
  const x = Math.random() * areaWidth;
  const y = Math.random() * areaHeight;
  ball.style.left = `${x}px`;
  ball.style.top = `${y}px`;
}

function endGame() {
  clearInterval(timer);
  gameActive = false;
  ball.style.display = "none";
  startBtn.disabled = false;
  alert(`Waktu habis! Skor akhir kamu: ${score}`);
}
