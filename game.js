/* game.js

This code handles the game elements and interactions on game.html. 
Most of your work will be here!
*/

/***INITIALIZING VARIABLES AND OBJECTS***/
var canvas = document.getElementById("game");
var context = canvas.getContext("2d");
var grid = 40;
var count = 0; /**The time it take **/
var snake = {
  x: 160,
  y: 160,
  x_step: grid, //snake velocity. moves one grid length every frame in either the x or y direction
  y_step: count,
  cells: [], //an array that keeps track of all grids the snake body occupies
  currentLength: 4 //current length of the snake. grows when eating an apple.
};

/* TO DO: create apple object below */
var apple = {
  color:'#ff0000', /***change color**/
  x: 320,
  y: 320,
  
  
  
};
/* Fake apple Object */
var fapple = {
  color:'#ff0000',
  x:80,
  y:80,
}

/** SnakeBoss**/
let SnakeBoss={
  color:'#ff0000', 
  x:80,
  y:80,
}

/***MAIN FUNCTIONS***/

/* start the game */
requestAnimationFrame(snakeSquadLoop);

/* Listen to keyboard events to move the snake */
document.addEventListener("keydown", function(e) {
  // prevent snake from backtracking on itself by checking that it's
  // not already moving on the same axis (pressing left while moving
  // left won't do anything, and pressing right while moving left
  // shouldn't let you collide with your own body)

  // left arrow key
  if (e.which === 37 && snake.x_step === 0) {
    snake.x_step = -grid;
    snake.y_step = 0;
  }
  // up arrow key
  else if (e.which === 38 && snake.y_step === 0) {
    snake.y_step = -grid;
    snake.x_step = 0;
  }
  // right arrow key
  else if (e.which === 39 && snake.x_step === 0) {
    snake.x_step = grid;
    snake.y_step = 0;
  }
  // down arrow key
  else if (e.which === 40 && snake.y_step === 0) {
    snake.y_step = grid;
    snake.x_step = 0;
  }
});

/***HELPER FUNCTIONS***/

/*snakeSquadLoop: This is the main code that is run each time the game loops*/
function snakeSquadLoop() {
  requestAnimationFrame(snakeSquadLoop);
  // if count < 16, then keep looping. Don't animate until you get to the 16th frame. This controls the speed of the animation.
  if (count < 16) {
    count++;
    return;
  }
  //Otherwise, it's time to animate.
  count = 0;
  context.clearRect(0, 0, canvas.width, canvas.height);
  /*TO DO:which functions do we need to run for this game to work, and in what order?*/
    calculateSnakeMove();
  drawSnake();
  drawApple();
  drawFapple();
  drawSnakeBoss();
  if (snakeTouchesApple()) {
    FappleMoveWithApple () ;   /** Realizd this needs to be called first....**/
    lengthenSnakeByOne();
    randomlyGenerateApple();
  }
  if (checkCrashItself()) {
    endGame();    
  }
}

function calculateSnakeMove() {
  // move snake by its velocity
  snake.x += snake.x_step;
  snake.y += snake.y_step;

  // wrap snake position horizontally on edge of screen
  if (snake.x < 0) {
    snake.x = canvas.width - grid;
  } else if (snake.x >= canvas.width) {
    snake.x = 0;
  }
  // wrap snake position vertically on edge of screen
  if (snake.y < 0) {
    snake.y = canvas.height - grid;
  } else if (snake.y >= canvas.height) {
    snake.y = 0;
  }
  // keep track of where snake has been. front of the array is always the head
  snake.cells.unshift({ x: snake.x, y: snake.y });

  // remove cells as we move away from them
  if (snake.cells.length > snake.currentLength) {
    snake.cells.pop();
  }
}

/*drawApple
uses context functions to fill the cell at apple.x and apple.y with apple.color 
*/
function drawApple() {
  console.log(apple);
  context.fillStyle = apple.color;
  context.fillRect(apple.x, apple.y, grid - 1, grid - 1);
  // drawing 1 px smaller than the grid creates a grid effect in the snake body so you can see how long it is
};
/* TO DO */

/*drawSnake
For each cell of the snake, fill in the grid at the location (cell.x, cell.y) with the snake.color 
If the cell is the first cell in the array, use the drawCellWithBitmoji function to draw that cell as the user's bitmoji 
*/
function drawSnake() {
  /* TO DO */
  for(let i=0; i<snake.cells.length; i++){
    let currentcell = snake.cells[i];
    if(i===0){
      drawCellWithBitmoji(currentcell);
    }else{
      context.fillStyle = snake.color;
      context.fillRect(currentcell.x, currentcell.y, grid, grid);  
    }
  }
}
/**drawSnake2BOSS**/
function drawSnakeBoss()
{ 
  console.log(SnakeBoss);
  context.fillStyle = SnakeBoss.color;
  context.fillRect(SnakeBoss.x, SnakeBoss.y, grid - 1, grid - 1);
}
/*drawCellWithBitmoji
Takes a cell (with an x and y property) and fills the cell with a bitmoji instead of a square
*/
function drawCellWithBitmoji(cell) {
  var avatar_url = localStorage.getItem("avatarurl");
  document.getElementById("avatar").src = avatar_url;
  context.drawImage(
    document.getElementById("avatar"),
    0,
    0,
    200,
    200,
    cell.x,
    cell.y,
    grid,
    grid
  );
}

/*** snakeTouchesApple 
checks if any cell in the snake is at the same x and y location of the apple
returns true (the snake is eating the apple) or false (the snake is not eating the apple)***/

function snakeTouchesApple() 
{
  console.log(apple.x) /*** trying to figure out why my apple and snake start
  same points yet never get eaten***/
  console.log(snake.cells[0].x)
  // apple.x && apple.y? snake.cells:0;
  return(snake.cells[0].x===apple.x) && (snake.cells[0].y===apple.y)  /** shout out to Michael for the insight**/
  //   return true;
  // }else{
  //   return false;
  // }    
}
   
  
  /* TO DO */


/*lengthenSnakeByOne
increments the currentLength property of the snake object by one to show that the snake has eaten an apple
*/
function lengthenSnakeByOne() {
  snake.currentLength = snake.currentLength + 1;
}

/*randomlyGenerateApple
uses getRandomInt to generate a new x and y location for the apple within the grid
this function does not draw the apple itself, it only stores the new locations in the apple object
*/
function randomlyGenerateApple() {
  apple.x = getRandomInt(0, 15) * grid;
  apple.y = getRandomInt(0, 15) * grid;
}

/*checkCrashItself
checks if any cell in the snake is at the same x and y location of the any other cell of the snake
returns true (the snake crashed into itself) or false (the snake is not crashing) 
*/console.log(Math.max(snake.cells.x[]))
function checkCrashItself() {
  /* TO DO */
  
  /** So if the snake eats the last cell**/
  // snake.cells.x[0] && snake.cells.y[0]? Math.max(snake.cells.x,snake.cells.y):0;
  for(let i=0; i<snake.cells.length;i++)
    {
      for(let j=1; i<j;j++){
        if(snake.cells.x[i])
      }
    }
}

/*endGame
displays an alert and reloads the page
*/
function endGame() {
  alert("GAME OVER");
  document.location.reload();
}

/*getRandomInt
takes a mininum and maximum integer
returns a whole number randomly in that range, inclusive of the mininum and maximum
see https://stackoverflow.com/a/1527820/2124254
*/
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

/** draw fApple **/
function drawFapple(){
  context.fillStyle= fapple.color;
  context.fillRect(fapple.x,fapple.y,grid-1,grid-1);
}

/** fApple Function **/
function FappleMoveWithApple ()  {
  console.log(fapple.x)
  if(snakeTouchesApple() ){
    fapple.x = getRandomInt(0,15)*grid;
    fapple.y = getRandomInt(0,15)*grid;
  }
}