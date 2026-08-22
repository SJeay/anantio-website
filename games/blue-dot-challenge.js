const board = document.querySelector('#game-board');
const startButton = document.querySelector('#start-button');
const timerElement = document.querySelector('#timer');
const scoreElement = document.querySelector('#score');
const resultElement = document.querySelector('#game-result');
const bestScoreElement = document.querySelector('#best-score');
const comboElement = document.querySelector('#combo');
const restartButton = document.querySelector('#restart-button');
const endScreen = document.querySelector('#end-screen');
const finalScoreElement = document.querySelector('#final-score');
const endScoreElement = document.querySelector('#end-score');
const endBestScoreElement = document.querySelector('#end-best-score');
const playAgainButton = document.querySelector('#play-again-button');
let score = 0;
let bestScore = Number(localStorage.getItem('anantio-blue-dot-best') || 0);
let combo = 0;
let lastHit = 0;
let endTime = 0;
let timerId;
let dotTimerId;

bestScoreElement.textContent = bestScore;

function placeDot() {
  const dot = document.createElement('button');
  dot.className = 'target-dot';
  dot.type = 'button';
  dot.setAttribute('aria-label', 'Blue dot target');
  dot.style.left = `${12 + Math.random() * 76}%`;
  dot.style.top = `${12 + Math.random() * 76}%`;
  dot.addEventListener('click', () => {
    if (Date.now() >= endTime) return;
    const now = Date.now();
    combo = now - lastHit < 1200 ? combo + 1 : 1;
    lastHit = now;
    score += 1;
    scoreElement.textContent = score;
    comboElement.textContent = combo > 1 ? `${combo}x combo streak` : '';
    createBurst(dot);
    dot.remove();
    placeDot();
  });
  board.append(dot);
  clearTimeout(dotTimerId);
  dotTimerId = setTimeout(() => {
    dot.remove();
    if (Date.now() < endTime) placeDot();
  }, 1500);
}

function createBurst(dot) {
  const burst = document.createElement('span');
  burst.className = 'dot-burst';
  burst.style.left = dot.style.left;
  burst.style.top = dot.style.top;
  board.append(burst);
  burst.addEventListener('animationend', () => burst.remove(), { once: true });
}

function finishGame() {
  clearInterval(timerId);
  clearTimeout(dotTimerId);
  board.querySelector('.target-dot')?.remove();
  board.querySelector('.game-message').textContent = 'Round complete.';
  timerElement.textContent = '0.0';
  bestScore = Math.max(bestScore, score);
  localStorage.setItem('anantio-blue-dot-best', bestScore);
  bestScoreElement.textContent = bestScore;
  comboElement.textContent = '';
  resultElement.textContent = '';
  finalScoreElement.textContent = score;
  endScoreElement.textContent = score;
  endBestScoreElement.textContent = bestScore;
  endScreen.hidden = false;
  startButton.textContent = 'Play again';
}

function startGame() {
  clearInterval(timerId);
  board.querySelector('.target-dot')?.remove();
  score = 0;
  combo = 0;
  lastHit = 0;
  scoreElement.textContent = '0';
  comboElement.textContent = '';
  resultElement.textContent = '';
  endScreen.hidden = true;
  board.querySelector('.game-message').textContent = '';
  startButton.textContent = 'Restart';
  endTime = Date.now() + 30000;
  placeDot();
  timerId = setInterval(() => {
    const remaining = Math.max(0, endTime - Date.now()) / 1000;
    timerElement.textContent = remaining.toFixed(1);
    if (remaining <= 0) finishGame();
  }, 50);
  board.focus();
}

startButton.addEventListener('click', startGame);
restartButton.addEventListener('click', startGame);
playAgainButton.addEventListener('click', startGame);
