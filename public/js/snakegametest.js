/**
 * game status enum
 */



const KEYCODES = {

   UP : 38,
   RIGHT : 39,
   LEFT : 37,
   DOWN : 40,
   QUIT : 8

}

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

  // game parts
  
    const PARTS = {
        SNAKEBODY : "body",
        SNAKEHEAD : "head",
        FRUIT : "fruit",
        BLOCK : "block", 
        NOTHING : "nothing"
    }


  /**
   *
   * class representing a snake game
   */
  
  class SnakeGame {

    // Abstraction Function
    //
    // AF(snake, board) = a snake on the game represented by the {Snake} ADT, and board {board}, where board is the board ADT representing
    //                     the board on which the snake moves.
    //
    // Rep Invariant
    //
    // points >= 1
    //
    // snake and fruit position do not collide
    // 
    // Safety from rep exposure
    //
    constructor() {
      this.height = 20;
      this.snake =  new Snake();
      this.board = new Board(this.height,this.snake.getPosition());
      this.fruitPosition = this.generateFruitCoordinate();
      // console.log("this is my fruit position",this.fruitPosition)
      this.board.setFruit(this.fruitPosition);
      this.points = 0;
      this.status = GAME_STATUS.ONGOING;
    }


    /**
     * Given {row},{column} coordinates of the snake
     * checks whether a position is in bounds
     * @param row,
     * @param column
     * 
     */
    isInBounds(row,column){

      return  0<=row && row < this.height && 0 <=column && column < this.height;

    }

    /**
     * Checks whether the snake has bitten itself
     * @returns true if snake has bitten itself, false otherwise
     */
     checkSnakeHasBittenItself(){
        var snakeHead = this.getSnakePosition().head;
        var snakeBody = this.getSnakePosition().rest;

        // console.log("let's check the snake position", snakeHead, snakeBody)
        var snakeBitItself = false;
        snakeBody.forEach((cell)=>{
          if (cell.row==snakeHead.row && snakeHead.column==cell.column){
            snakeBitItself= true;
          }
        })
        return snakeBitItself;
     }
    /**
     * 
     * Continually moves the snake until it crushes,
     * If a person presses play, and the game starts, 
     * then a user can be able to 
     * 
     */
    moveSnake(func){  


      while (this.status==GAME_STATUS.ONGOING){
        // get the game command      
        document.addEventListener("keypress",(e)=>{       
          if (e.keyCode==KEYCODES.UP){
            this.snake.changeDirection(DIRECTION.UP);
          }
          if (e.keyCode==KEYCODES.DOWN){
            this.snake.changeDirection(DIRECTION.DOWN);
          }
          if (e.keyCode==KEYCODES.LEFT){
            this.snake.changeDirection(DIRECTION.LEFT);
          }
          if (e.keyCode==KEYCODES.RIGHT){
            this.snake.changeDirection(DIRECTION.RIGHT);
          }
          if (e.keyCode==KEYCODES.QUIT){
             this.stopGame();
          }
        })
        // else let the snake move
        setInterval(this.snake.move,1000);
        // get the snake positions and the fruit position
        var snakePosition = this.getSnakePosition()
        var fruitPosition = this.getFruitPosition();
        var snakeHead = snakePosition.head;


        // if yes, check if the snake has eaten a fruit
        // gets new fruit, adds points, remove old fruit from board
        if (snakeHead.row == fruitPosition.row && snakeHead.column == fruitPosition.column){
          this.points += 1;
          this.snake.increaseLength();
          // this.board.removeFruit(fruitPosition);
          fruitPosition = this.generateFruitCoordinate(); // get new fruit;
          this.fruitPosition = fruitPosition
        }
        // update the board with these new developments
        this.board.updateBoard(snakePosition,fruitPosition);
        //if steps are still intack, increment, else break the cycle
        // check if the game is still ongoing
        if (!this.isInBounds(snakeHead.row,snakeHead.column) || this.checkSnakeHasBittenItself()){
          this.stopGame();
          this.snake.removeLives()
          func(this)
          break;
        }else{
          console.log("im in here");
          func(this);
        }
      }  
    }

    /**
     * 
     * causes the snake to move one step
     */   

    snakeMove(){
      this.snake.move();
    }
    /**
     * 
     * causes the snake to move one step
     * @params dir - the direction to change
     */   

    changeSnakeDirection(dir){

      this.snake.changeDirection(dir)
    }
    /**
     * 
     *  increases the snake length
     */   

    increaseSnakeLength(){

      this.snake.increaseLength()
    }

    /**
     * 
     *  removes the life of snake, or the snake dies.
     */   

    removeLives(){
      this.snake.removeLives();
    }

    /**
     * 
     * updates game board, using the following parameters
     * @params snakePosition
     * @params fruitPosition
     */ 
    
     updateBoard(snakePosition,fruitPosition){
        this.board.updateBoard(snakePosition,fruitPosition);
     }
    /**
     * 
     * Stops the game
     */   
    stopGame(){
      this.status= GAME_STATUS.OVER;
    }
    /**
     * Given
     * @param commands
     * The function makes snake commands 
     * 
     */
    moveSnakeCommands(commands){  
      var length = commands.length-1
      let count = 0

      while (this.status==GAME_STATUS.ONGOING){
        // get the game command
        
        if (length>=0){
          let command = commands[count]
          // if change direction, change it
          if (command.changeDirection){
              this.snake.changeDirection(command.direction);
          } 
        }    
        // else let the snake move
        this.snake.move();
        // get the snake positions and the fruit position
        var snakePosition = this.getSnakePosition()
        var fruitPosition = this.getFruitPosition();
        var snakeHead = snakePosition.head;


        // if yes, check if the snake has eaten a fruit
        // gets new fruit, adds points, remove old fruit from board
        if (snakeHead.row == fruitPosition.row && snakeHead.column == fruitPosition.column){
          this.points += 1;
          this.snake.increaseLength();
          // this.board.removeFruit(fruitPosition);
          fruitPosition = this.generateFruitCoordinate(); // get new fruit;
          this.fruitPosition = fruitPosition
        }
        // update the board with these new developments
        this.board.updateBoard(snakePosition,fruitPosition);
        //if steps are still intack, increment, else break the cycle
        // check if the game is still ongoing
        if (!this.isInBounds(snakeHead.row,snakeHead.column) || this.checkSnakeHasBittenItself()){
          this.setGameStatus(GAME_STATUS.OVER);
          this.snake.removeLives()
          break;
        }

        // console.log("this is my count",count,length)
        if (count<length){
           count +=1
        }else if (count>=length && length>=0){
          // console.log("I'm breaking");
          break;
        }

      }   
    }
    
    /**
     * 
     * Retrieves game data for the game UI
     * 
     */
    getGameData(){
      return {
        gameStatus: this.status,
        points : this.getPoints(),
        lives : this.snake.getLives(),
        snakePosition : this.getSnakePosition(),
        board : this.board.getBoard(),
        fruitPosition: this.getFruitPosition()
    }
    }

    
    /**
     * Given a game status, 
     * sets a game status;
     * @param status
     */
    setGameStatus(status){

      this.status = status;
    }

    /**
     * 
     * Generates the fruit coordinate on the board, if the coord generated is occupied
     * the function repeats process until it is found,
     * 
     * Therefore, there's need to think about how this will affect the game as the snake increases,
     * but we'll talk about it later
     * 
     */
    generateFruitCoordinate(){
    
      var fruitRow = this.getRandomIntInclusive(0,this.height);
      var fruitColumn = this.getRandomIntInclusive(0,this.height);
      var boardPosition = this.board.getBoard();

      var fruit;
      var conflict = false;

      boardPosition.forEach((cell)=>{      
          if (cell.row==fruitRow && cell.column==fruitColumn){
              if (!cell.occupied){
               fruit = {row:fruitRow,column:fruitColumn}
 
              }else{
                conflict = true;
                  
              }
          }
      });

      if (conflict){
        return this.generateFruitCoordinate();
      }else{
          return fruit; 
      }
      }
      
    
  
    /**
     * 
     * Helper function that get a random integer given the {min} and {max} ranges
     * @param max
     * @param min
     * 
     */
    getRandomIntInclusive(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
    }

    /**
     * 
     * Gets the snake position on the board as defined : 
     * 
     */
    getSnakePosition(){
      return this.snake.getPosition();
    }

    /**
     * 
     * Gets the position of the fruit on the board as defined : 
     * 
     */
    getFruitPosition(){
      return this.fruitPosition;
    }

    /**
     * 
     * Gets the game points
     * 
     */
    getPoints(){
      return this.points;
    }
    /**
     * 
     * Gets the game points
     * 
     */
    getGameStatus(){
      return this.status;
    }
  
  }
  
  /**
   *
   * Class representing a snake object
   * 
   */
  
  class Snake {
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
    this.lives = 1;
    this.length = 1;
    this.row = 0;
    this.column = 1;
    this.velocity = 1;
    this.startDirection = DIRECTION.RIGHT; 
    this.body = {
        head: {
          row: this.row,
          column: this.column,
          cellDirection: this.startDirection,
        },
        rest: [
          {
            row: 0,
            column: 0,
            cellDirection: this.startDirection,
          },
        ],
      };
    }

    /**
     * adds one more block to the snake
     */
    increaseLength() {
      // resorted to the old ways
      var oldTail = this.body.rest[this.body.rest.length - 1];
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
          row: oldTail.row + 1,
          column: oldTail.column,
          cellDirection: oldTail.cellDirection,
        };
      } else {
        // (oldTail.cellDirection == DIRECTION.DOWN)
        newTail = {
          row: oldTail.row - 1,
          column: oldTail.column,
          cellDirection: oldTail.cellDirection,
        };
      }
      this.length += 1;
      this.body.rest.push(newTail);
    }
    /**
     * reduces the number of lives in a game by one
     */
    removeLives() {
      this.lives -= 1;
    }
    /**
     * Given the {direction}
     * Changes the direction of the snake head
     */ 
    changeDirection(direction) {
      if (
        this.body.head.cellDirection != DIRECTION.RIGHT &&
        this.body.head.cellDirection != DIRECTION.LEFT &&
        direction == DIRECTION.RIGHT
      ) {
        this.body.head = {
          row: this.body.head.row,
          column: this.body.head.column ,
          cellDirection: DIRECTION.RIGHT,
        };
      } else if (
        this.body.head.cellDirection != DIRECTION.UP &&
        this.body.head.cellDirection != DIRECTION.DOWN &&
        direction == DIRECTION.UP
      ) {
        this.body.head = {
          row: this.body.head.row,
          column: this.body.head.column,
          cellDirection: DIRECTION.UP,
        };
      } else if (
        this.body.head.cellDirection != DIRECTION.RIGHT &&
        this.body.head.cellDirection != DIRECTION.LEFT &&
        direction == DIRECTION.LEFT
      ) {
        this.body.head = {
          row: this.body.head.row,
          column: this.body.head.column,
          cellDirection: DIRECTION.LEFT,
        };
      } else if (
        this.body.head.cellDirection != DIRECTION.UP &&
        this.body.head.cellDirection != DIRECTION.DOWN &&
        direction == DIRECTION.DOWN
      ) {
        this.body.head = {
          row: this.body.head.row,
          column: this.body.head.column,
          cellDirection: DIRECTION.DOWN,
        };
      }
    }
    /**
     * Given the {direction}
     * Moves the head of the snake one step in its direction
     */   
    moveHead(){
      if (this.body.head.cellDirection == DIRECTION.UP){
           this.body.head = {
              row: this.body.head.row + VECTORS.UP.dy,
              column: this.body.head.column +VECTORS.UP.dx, 
              cellDirection: DIRECTION.UP,   
           }
  
      } else if (this.body.head.cellDirection == DIRECTION.DOWN){
  
          this.body.head = {
              row: this.body.head.row + VECTORS.DOWN.dy,
              column: this.body.head.column +VECTORS.DOWN.dx, 
              cellDirection: DIRECTION.DOWN,   
           }
  
  
      }else if (this.body.head.cellDirection == DIRECTION.LEFT){
          this.body.head = {
              row: this.body.head.row + VECTORS.LEFT.dy,
              column: this.body.head.column +VECTORS.LEFT.dx, 
              cellDirection: DIRECTION.LEFT,   
           }
      }else if (this.body.head.cellDirection == DIRECTION.RIGHT){
          this.body.head = {
              row: this.body.head.row + VECTORS.RIGHT.dy,
              column: this.body.head.column +VECTORS.RIGHT.dx, 
              cellDirection: DIRECTION.RIGHT,   
           }
      }
  
    }
  
    /**
     * Causes the whole body of the snake to move
     */
    move() {   

      var tempCell = this.body.head;
      this.moveHead();
      this.body.rest = this.body.rest.map((cell)=>{
          // swap       
          var bodyCellTemp = cell;  // assign body cell to a temp 
          cell =tempCell;          // change cell temp to take previous position
          tempCell = bodyCellTemp; // change temp cell to that previous value, and move on
          return cell;
      });
    }
  
    /**
     * gets the board position
     */
    getPosition() {
  
      var position = this.body;
      return position;
  
    }
    //get the number of lives that the snake is left with
    getLives() {
      return this.lives;
    }
    // get the length of the snake
    getLength() {
      return this.length;
    }
  }
  
  /**
   *
   * An ADT representing the game board
   */
  class Board {
    constructor(height,snakePosition) {
      this.height= height;
      this.cells = [];
      for(let i = 0 ; i < height; i++){
          for (let j = 0 ; j <height;j++){
              var cell = {
                  row : i,
                  column : j,
                  occupied : false,
                  occupiedBy: PARTS.NOTHING
              }
              if (i==snakePosition.head.row && j == snakePosition.head.column){
                     cell.occupied = true;
                     cell.occupiedBy = PARTS.SNAKEHEAD;
                }     
              snakePosition.rest.forEach((snakeCell)=>{
                 if (i==snakeCell.row && j == snakeCell.column){
                      cell.occupied = true;
                      cell.occupiedBy = PARTS.SNAKEBODY;
                 }
              });           
              this.cells.push(cell);
          }
      }
    }

    /**
     * 
     * returns the current board status
     */
    getBoard(){
        return this.cells;
    }
    /**
     * 
     * set fruit on the board at position {fruitPosition}
     * @param fruitPosition
     */
    setFruit(fruitPosition){
        this.cells.forEach((cell)=>{
            if (fruitPosition.row==cell.row &&fruitPosition.column==cell.column){
               cell.occupiedBy = PARTS.FRUIT;
               cell.occupied = true;
            } 
        });
    }
    /**
     * 
     * clears fruit from the board at position {fruitPosition}
     * @param fruitPosition
     */
    removeFruit(fruitPosition){
        this.cells.forEach((cell)=>{
            if (fruitPosition.row==cell.row &&fruitPosition.column==cell.column){
               cell.occupiedBy = PARTS.NOTHING;
               cell.occupied = false;
            } 
        });
    }
   
    
    /**
     * 
     * Sets the Position of the next, and the direction it's supposed to face,
     * 
     */
    setSnakePosition(snakePosition){     
      this.height= height;
      this.cells = this.cells.map((boardCell)=>{
        let i = boardCell.row;
        let j = boardCell.column;
        if (i==snakePosition.head.row && j == snakePosition.head.column){
                boardCell.occupied = true;
                boardCell.occupiedBy = PARTS.SNAKEHEAD;
        }  
        snakePosition.rest.forEach((snakeCell)=>{
            if (i==snakeCell.row && j == snakeCell.column){
                boardCell.occupied = true;
                boardCell.occupiedBy = PARTS.SNAKEBODY;
            }

        });  
        return boardCell;
      })
    } 

   /**
     * 
     * Sets the Position of the next, and the direction it's supposed to face,
     * 
     */
    updateBoard(snakePosition,fruitPosition){
      this.cells = [];
      for(let i = 0 ; i < this.height; i++){
        for (let j = 0 ; j <this.height;j++){
            var cell = {
                row : i,
                column : j,
                occupied : false,
                occupiedBy: PARTS.NOTHING
            }

            if (i==snakePosition.head.row && j == snakePosition.head.column){
                   cell.occupied = true;
                   cell.occupiedBy = PARTS.SNAKEHEAD;
              }

            if (i==fruitPosition.row && j==fruitPosition.column){
                  cell.occupied = true;
                  cell.occupiedBy = PARTS.FRUIT;
            }
          
            snakePosition.rest.forEach((snakeCell)=>{
               if (i==snakeCell.row && j == snakeCell.column){
                    cell.occupied = true;
                    cell.occupiedBy = PARTS.SNAKEBODY;
               }
            });     
            this.cells.push(cell);
        }
    }
     }

  }
  
  
  // module.exports = {SnakeGame,Snake,Board}