const rulesBtn = document.getElementById('rules-btn');
const closeBtn = document.getElementById('close-btn');
const rules = document.getElementById('rules');
const canvas = document.getElementById('canvas');
// Element's context: thing onto which drawing will be rendered
const ctx = canvas.getContext('2d');

let score = 0;

const brickColumnCount = 9;
const brickRowCount = 5;

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

// Create brick props
const brickInfo = {
  w: 70,
  h: 20,
  padding: 10,
  // Positions for first brick. Will loop through and change values for each one
  offsetX: 45,
  offsetY: 60,
  visible: true,
};

// Create bricks
const bricks = [];
// Loop through columns
for (let col = 0; col < brickColumnCount; col++) {
  // Create an array for each column and append it to bricks array
  bricks[col] = [];
  // Loop through all rows inside current column and break loop after all rows are done and go back to outer loop, moving onto next column of bricks or rows
  for (let row = 0; row < brickRowCount; row++) {
    // Configure brick's coordinates
    const x = col * (brickInfo.w + brickInfo.padding) + brickInfo.offsetX;
    const y = row * (brickInfo.h + brickInfo.padding) + brickInfo.offsetY;
    // Create row array inside each column array. Each row array represents a brick with assigned properties below. Each column array represents a column of bricks or rows
    // ...brickInfo: using spread syntax to copy properties from brickInfo object literal
    bricks[col][row] = { x, y, ...brickInfo };
  }
}

// Draw ball on canvas
function drawBall() {
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, ball.size, 0, Math.PI * 2);
  ctx.fillStyle = '#0095dd';
  ctx.fill();
  ctx.closePath();
}

// Draw paddle on canvas
function drawPaddle() {
  ctx.beginPath();
  // Draw rectangle
  ctx.rect(paddle.x, paddle.y, paddle.w, paddle.h);
  ctx.fillStyle = '#0095dd';
  ctx.fill();
  ctx.closePath();
}

// Draw score on canvas
function drawScore() {
  ctx.font = '20px Arial';
  ctx.fillText(`Score: ${score}`, canvas.width - 100, 30);
}

// Draw bricks on canvas
function drawBricks() {
  bricks.forEach((column) => {
    column.forEach((brick) => {
      ctx.beginPath();
      ctx.rect(brick.x, brick.y, brick.w, brick.h);
      ctx.fillStyle = brick.visible ? '#0095dd' : 'transparent';
      ctx.fill();
      ctx.closePath();
    });
  });
}

// Draw everything
function draw() {
  drawBall();
  drawPaddle();
  drawScore();
  drawBricks();
}

draw();

// Rules and close event handlers
rulesBtn.addEventListener('click', () => rules.classList.add('show'));
closeBtn.addEventListener('click', () => rules.classList.remove('show'));
