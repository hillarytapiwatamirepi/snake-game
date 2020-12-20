/**
 * game status enum
 */

const GAME_STATUS = {
  ONGOING: "ongoing",
  OVER: "over",
};
// direction of movement
const DIRECTION = {
  DOWN: "down",
  UP: "up",
  LEFT: "left",
  RIGHT: "right",
};

// vectors for directions
const VECTORS = {
    DOWN: {dx :0 , dy: 1 },
    UP:  {dx :0 , dy:-1},
    LEFT:  {dx : -1, dy: 0 },
    RIGHT:  {dx : 1 , dy: 0},
}
/**
 *
 * class representing a snake game
 */

class SnakeGame {
  // TODO fields

  #snake;
  #points = 0;
  #status = GAME_STATUS.ONGOING;

  //
  // Abstraction Function
  //
  // AF(snake, board) = a snake on the game represented by the {Snake} ADT, and board {board}, where board is the board ADT representing
  //                     the board on which the snake moves.
  //
  // Rep Invariant
  //
  // points >= 1
  // snake and fruit position do not collide
  // 
  // Safety from rep exposure
  //
  #snake;
  #height = 20;
  constructor() {
    this.#snake =  new Snake();
    this.#board = new Board(this.#height);
  }

  moveSnake(){  
    while (this.#status==GAME_STATUS.ONGOING){
         this.#snake.move();
    }   
  }

  generateFruitCoordinate(){
     
    var fruitRow = this.#getRandomIntInclusive(0,this.#height);
    var fruitColumn = this.#getRandomIntInclusive(0,this.#height);

    fruitRow
    fruitColumn 
    
     
  }



  #getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
  }
   

}

/**
 *
 * class representing a snake object
 */

class Snake {
  #body;
  #lives = 1;
  #length = 1;
  #row = 0;
  #column = 1;
  #velocity = 1;
  #startDirection = DIRECTION.LEFT;

  //
  // Abstraction Function
  //  AF(body) = {}
  //
  // Rep Invariant
  // lives >= 0
  //
  // Safety from rep exposure
  //
  constructor() {
    this.#body = {
      head: {
        row: this.#row,
        column: this.#column,
        cellDirection: this.#startDirection,
      },
      rest: [
        {
          row: 0,
          column: 0,
          cellDirection: this.#startDirection,
        },
      ],
    };
  }
  increaseLength() {

    var oldTail = this.#body.rest[this.#body.rest.length - 1];
    var newTail;
  

    if (oldTail.cellDirection == DIRECTION.RIGHT) {
      newTail = {
        row: oldTail.row,
        column: oldTail.column - 1,
        cellDirection: oldTail.cellDirection,
      };
    } else if (oldTail.cellDirection == DIRECTION.LEFT) {
      newTail = {
        row: oldTail.row,
        column: oldTail.column + 1,
        cellDirection: oldTail.cellDirection,
      };
    } else if (oldTail.cellDirection == DIRECTION.UP) {
      newTail = {
        row: oldTail.row - 1,
        column: oldTail.column,
        cellDirection: oldTail.cellDirection,
      };
    } else {
      // (oldTail.cellDirection == DIRECTION.DOWN)
      newTail = {
        row: oldTail.row + 1,
        column: oldTail.column,
        cellDirection: oldTail.cellDirection,
      };
    }
    this.#length += 1;
    this.#body.rest.push(newTail);
  }

  removeLives() {
    this.#lives -= 1;
  }

  changeDirection(direction) {
    if (
      this.#body.head.cellDirection != DIRECTION.RIGHT &&
      this.#body.head.cellDirection != DIRECTION.LEFT &&
      direction == DIRECTION.RIGHT
    ) {
      this.#body.head = {
        row: this.#body.head.row,
        column: this.#body.head.column + 1,
        cellDirection: DIRECTION.RIGHT,
      };
    } else if (
      this.#body.head.cellDirection != DIRECTION.UP &&
      this.#body.head.cellDirection != DIRECTION.DOWN &&
      direction == DIRECTION.UP
    ) {
      this.#body.head = {
        row: this.#body.head.row - 1,
        column: this.#body.head.column,
        cellDirection: DIRECTION.UP,
      };
    } else if (
      this.#body.head.cellDirection != DIRECTION.RIGHT &&
      this.#body.head.cellDirection != DIRECTION.LEFT &&
      direction == DIRECTION.LEFT
    ) {
      this.#body.head = {
        row: this.#body.head.row,
        column: this.#body.head.column - 1,
        cellDirection: DIRECTION.LEFT,
      };
    } else if (
      this.#body.head.cellDirection != DIRECTION.UP &&
      this.#body.head.cellDirection != DIRECTION.DOWN &&
      direction == DIRECTION.DOWN
    ) {
      this.#body.head = {
        row: this.#body.head.row + 1,
        column: this.#body.head.column,
        cellDirection: DIRECTION.DOWN,
      };
    }
  }

  moveHead(){


    if (this.#body.head.direction == DIRECTION.UP){

         this.#body.head = {
            row: this.#body.head.row + VECTORS.UP.dy,
            column: this.#body.head.column +VECTORS.UP.dx, 
            cellDirection: DIRECTION.UP,   
         }

    } else if (this.#body.head.direction == DIRECTION.DOWN){

        this.#body.head = {
            row: this.#body.head.row + VECTORS.DOWN.dy,
            column: this.#body.head.column +VECTORS.DOWN.dx, 
            cellDirection: DIRECTION.DOWN,   
         }


    }else if (this.#body.head.direction == DIRECTION.LEFT){
        this.#body.head = {
            row: this.#body.head.row + VECTORS.LEFT.dy,
            column: this.#body.head.column +VECTORS.LEFT.dx, 
            cellDirection: DIRECTION.LEFT,   
         }
    }else if (this.#body.head.direction == DIRECTION.RIGHT){

        this.#body.head = {
            row: this.#body.head.row + VECTORS.RIGHT.dy,
            column: this.#body.head.column +VECTORS.RIGHT.dx, 
            cellDirection: DIRECTION.RIGHT,   
         }
    }

  }
  /**
   * 
   * Sets the Position of the next, and the direction it's supposed to face,
   * 
   */
  setPosition(direction,position){
    
    // this.body
    // position.row, position.column



  }
 //cause the snake to move
  move() {   
    var tempCell = this.#body.head;
    moveHead();
    this.#body.rest.map((cell)=>{
        // swap       
        var bodyCellTemp = cell;  // assign body cell to a temp 
        cell =tempCell;          // change cell temp to take previous position
        tempCell = bodyCellTemp; // change temp cell to that previous value, and move on
        return cell;
    });
  }




  getPosition() {

    var position = this.#body;
    return position;

  }
  //get the number of lives that the snake is left with
  getLives() {
    return this.#lives;
  }
  // get the length of the snake
  getLength() {
    return this.#length;
  }
}

/**
 *
 *
 */
class Board {
  #height;
  #cells;

  constructor(height,snakePosition) {
    this.#height = height;

    this.#cells = [];

    for(let i = 0 ; i < height; i++){
        for (let j = 0 ; j <height;j++){

            var cell = {
                row : i,
                column : j,
                occupied : false
            }

            this.#cells.append()
        }
    }


  }

  buildBoard(){

  }



}


module.exports = {SnakeGame,Board}