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
  radius: 10,
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
  ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
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
  ctx.font = '18px Arial';
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

// Move paddle on canvas
function movePaddle() {
  paddle.x += paddle.dx;

  // Wall detection
  if (paddle.x + paddle.w > canvas.width) {
    paddle.x = canvas.width - paddle.w;
  }

  if (paddle.x < 0) {
    paddle.x = 0;
  }
}

// Move ball on canvas
function moveBall() {
  ball.x += ball.dx; // 4 (positive; to the right)
  ball.y += ball.dy; // -4 (negative; upwards)

  // Wall collision (x-axis) - radius is radius
  if (ball.x + ball.radius > canvas.width || ball.x - ball.radius < 0) {
    // Same as ball.dx * ball.dx * -1 (reversing sign to make it go opposite direction)
    ball.dx *= -1;
  }

  // Wall collision (top/bottom)
  if (ball.y + ball.radius > canvas.height || ball.y - ball.radius < 0) {
    ball.dy *= -1;
  }

  // console.log(ball.x, ball.y)

  // Paddle collision
  if (
    // Leftmost edge of ball is to right of leftmost edge of paddle
    ball.x - ball.radius > paddle.x - paddle.w / 2 &&
    // Rightmost edge of ball is to left of rightmost edge of paddle
    ball.x + ball.radius < paddle.x + paddle.w / 2 &&
    // Bottom of ball is lower than top of paddle
    ball.y + ball.radius > paddle.y - paddle.h / 2
  ) {
    ball.dy = -ball.speed;
  }

  // Brick collision
  bricks.forEach((column) => {
    column.forEach((brick) => {
      if (
        // Right side of ball goes further right than left edge
        ball.x + ball.radius > brick.x - brick.w / 2 && // Left brick side check
        // Left side of ball goes further left than right side of brick
        ball.x - ball.radius < brick.x + brick.w / 2 && // Right brick side check
        // Bottom of ball (y axis increases downwards) is lower than Y position of middle of brick
        ball.y + ball.radius > brick.y - brick.h / 2 && // Top brick side check
        // Top of ball (y axis decreases upwards) is higher than bottom of brick
        ball.y - ball.radius < brick.y + brick.h / 2 // Bottom brick side check
      ) {
        ball.dy *= -1;
        brick.visible = false;

        increaseScore();
      }
    });
  });

  // Hit bottom wall -> lose
  if (ball.y + ball.radius > canvas.height) {
    showAllBricks();
    score = 0;
  }
}

// Increase score
function increaseScore() {
  score++;

  if (score % (brickRowCount * brickRowCount) === 0) {
    showAllBricks();
  }
}

// Make all bricks visible
function showAllBricks() {
  bricks.forEach((column) => {
    column.forEach((brick) => (brick.visible = true));
  });
}

// Draw everything
function draw() {
  // clear canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  drawBall();
  drawPaddle();
  drawScore();
  drawBricks();
}

draw();

// Update canvas drawing and animation
function update() {
  movePaddle();
  moveBall();

  // Draw everything
  draw();

  requestAnimationFrame(update);
}

update();

// Keydown event
function keyDown(e) {
  if (e.key === 'Right' || e.key === 'ArrowRight') {
    paddle.dx = paddle.speed;
  } else if (e.key === 'Left' || e.key === 'ArrowLeft') {
    paddle.dx = -paddle.speed;
  }
}

// Keyup event
function keyUp(e) {
  if (
    e.key === 'Right' ||
    e.key === 'ArrowRight' ||
    e.key === 'Left' ||
    e.key === 'ArrowLeft'
  ) {
    paddle.dx = 0;
  }
}

// Keyup event
function keyUp(e) {
  if (
    e.key === 'Right' ||
    e.key === 'ArrowRight' ||
    e.key === 'Left' ||
    e.key === 'ArrowLeft'
  ) {
    paddle.dx = 0;
  }
}

// Keyboard event handlers
document.addEventListener('keydown', keyDown);
document.addEventListener('keyup', keyUp);

// Rules and close event handlers
rulesBtn.addEventListener('click', () => rules.classList.add('show'));
closeBtn.addEventListener('click', () => rules.classList.remove('show'));
