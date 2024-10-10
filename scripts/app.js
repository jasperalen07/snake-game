// Get the canvas and its context
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Size of each unit in the game grid (this controls the size of each segment of the snake)
const unitSize = 20;

// Initialize the snake with a starting position
let snake = [{ x: 100, y: 100 }];
let dx = unitSize; // Move right initially (horizontal movement)
let dy = 0; // Vertical movement is 0 initially

// Initialize the food with a random position
let food = { x: getRandomCoordinate().x, y: getRandomCoordinate().y };

// Score Variable
let score = 0;

// Function to start the game loop
function gameLoop() {
    // Check if the game is over (collision detection)
    if (didGameEnd()) {
        alert('Game Over! Your final score is ' + score);
        document.location.reload(); // Reloads the page to restart the game
        return;
    }

    // Adjusted: Set a delay to control the game speed
    // Increasing this value slows down the game, giving the player more time to react
    setTimeout(() => {
        clearCanvas(); // Clears the canvas for the next frame
        drawFood(); // Draws the food on the canvas
        moveSnake(); // Moves the snake based on its direction
        drawSnake(); // Draws the snake after moving
        gameLoop(); // Recursively call gameLoop for the next frame
    }, 200); // Slowed down the game to 200ms (0.2 seconds per frame)
}

// Function to draw the snake on the canvas
function drawSnake() {
    snake.forEach(part => {
        ctx.fillStyle = 'green'; // Snake body color
        ctx.fillRect(part.x, part.y, unitSize, unitSize); // Draw each part of the snake as a square
        ctx.strokeStyle = 'darkgreen'; // Border color for each snake segment
        ctx.strokeRect(part.x, part.y, unitSize, unitSize);
    });
}

// Function to move the snake
function moveSnake() {
    // Create a new head based on the current direction (dx and dy)
    const head = { x: snake[0].x + dx, y: snake[0].y + dy };

    // Check if the snake eats the food 
    if (head.x === food.x && head.y === food.y) {
        score += 10; // Increase the score by 10
        document.getElementById('score').innerText = score; // Update the score display in HTML

        // Adjusted: Generate new random position for the food
        food = { x: getRandomCoordinate().x, y: getRandomCoordinate().y };
    } else {
        snake.pop(); // Remove the last segment if no food is eaten to maintain length
    }

    // Add the new head to the front of the snake array (makes it move)
    snake.unshift(head);
}

// Function to draw the food on the canvas
function drawFood() {
    ctx.fillStyle = 'red'; // Food color
    ctx.fillRect(food.x, food.y, unitSize, unitSize); // Draw food as a square
}

// Function to clear the canvas before each frame to avoid drawing over the previous frame
function clearCanvas() {
    ctx.fillStyle = 'white'; // Background color
    ctx.fillRect(0, 0, canvas.width, canvas.height); // Clear the entire canvas
}

// Event listener to handle arrow key presses
document.addEventListener('keydown', changeDirection);
function changeDirection(event) {
    const LEFT_KEY = 37; // Keycode for left arrow key
    const RIGHT_KEY = 39; // Keycode for right arrow key
    const UP_KEY = 38; // Keycode for up arrow key
    const DOWN_KEY = 40; // Keycode for down arrow key

    const keyPressed = event.keyCode;

    // Adjusted: Prevent the snake from reversing direction
    // The snake should not be able to directly turn back on itself
    if (keyPressed === LEFT_KEY && dx === 0) {
        dx = -unitSize; // Move left
        dy = 0; // Stop vertical movement
    }
    if (keyPressed === RIGHT_KEY && dx === 0) {
        dx = unitSize; // Move right
        dy = 0; // Stop vertical movement
    }
    if (keyPressed === UP_KEY && dy === 0) {
        dx = 0; // Stop horizontal movement
        dy = -unitSize; // Move up
    }
    if (keyPressed === DOWN_KEY && dy === 0) {
        dx = 0; // Stop horizontal movement
        dy = unitSize; // Move down
    }
}

// Function to generate a random position for the food
function getRandomCoordinate() {
    // Adjusted: Generate random coordinates that are aligned with the grid
    const randomX = Math.floor(Math.random() * (canvas.width / unitSize)) * unitSize;
    const randomY = Math.floor(Math.random() * (canvas.height / unitSize)) * unitSize;
    return { x: randomX, y: randomY };
}

// Function to check if the game has ended
function didGameEnd() {
    const head = snake[0];

    // Check if the snake hits the wall
    const hitWall = head.x < 0 || head.x >= canvas.width || head.y < 0 || head.y >= canvas.height;

    // Check if the snake collides with itself (any part of the body)
    const hitSelf = snake.slice(1).some(part => part.x === head.x && part.y === head.y);

    return hitWall || hitSelf; // Game ends if the snake hits the wall or itself
}

// Start the game loop
gameLoop();
