// Get the canvas and its context
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Size of each unit in the game grid
const unitSize = 20;

// Initialize the snake with a starting position
let snake = [{x: 100, y: 100}];
let dx = unitSize; // Move right initially
let dy = 0;

// Initialize the food with a random position

let food = { x: getRandomCoordinate(), y: getRandomCoordinate()};

// Score Variable
let score = 0;

// Function to start the game loop
function gameLoop(){
    // Check if the game is over
    if(didGameEnd()){
        alert('Game Over your final score is' + score);
        document.location.reload();
        return;
    }
    // Set a delay to control the game speed
    setTimeout(() => {
        clearCanvas();
        drawFood();
        moveSnake();
        drawSnake();
        gameLoop();
    }, 100);
}

// Function to draw the snake on the canvas
function drawSnake(){
    snake.forEach(part => {
        ctx.fillStyle = 'green';
        ctx.fillRect(part.x, part.y, unitSize, unitSize);
        ctx.strokeStyle = 'darkGreen';
        ctx.strokeRect(part.x, part.y, unitSize, unitSize);

    });
}
