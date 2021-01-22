const rulesBtn = document.getElementById('rules-btn');
const closeBtn = document.getElementById('close-btn');
const rules = document.getElementById('rules');
const canvas = document.getElementById('canvas');
// Element's context: thing onto which drawing will be rendered
const ctx = canvas.getContext('2d');

let score = 0;

// Create ball props
const ball = {
  x: canvas.width / 2,
  y: canvas.height / 2,
  // Ball radius
  size: 10,
  // Animation
  speed: 4,
  // Moves 4 pixels to right
  dx: 4,
  // 4 pixels upward
  dy: -4,
};

// Create paddle props
const paddle = {
  x: canvas.width / 2 - 40,
  y: canvas.height - 20,
  w: 80,
  h: 10,
  speed: 8,
  dx: 0,
};

// Draw paddle on canvas
function drawPaddle() {
  ctx.beginPath();
  // Draw rectangle
  ctx.rect(paddle.x, paddle.y, paddle.w, paddle.h);
  ctx.fillStyle = '#0095dd';
  ctx.fill();
  ctx.closePath();
}

// Draw ball on canvas
function drawBall() {
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, ball.size, 0, Math.PI * 2);
  ctx.fillStyle = '#0095dd';
  ctx.fill();
  ctx.closePath();
}

// Draw everything
function draw() {
  drawBall();
  drawPaddle();
  drawScore();
}

// Draw score on canvas
function drawScore() {
  ctx.font = '20px Arial';
  ctx.fillText(`Score: ${score}`, canvas.width - 100, 30);
}

draw();

// Rules and close event handlers
rulesBtn.addEventListener('click', () => rules.classList.add('show'));
closeBtn.addEventListener('click', () => rules.classList.remove('show'));
