/**
 * 
 * Creates board UI, or layout for the board
 * 
 */



const GAMEKEYCODES = {

    UP : 38,
    RIGHT : 39,
    LEFT : 37,
    DOWN : 40,
    QUIT : 8
 
 }

 const STATUS = {
    ONGOING: "ongoing",
    OVER: "over",
  };
  // direction of movement
const GAMEDIRECTION = {
    DOWN: "down",
    UP: "up",
    LEFT: "left",
    RIGHT: "right",
  };



class UI{

    constructor(){
        this.snakeGame = new SnakeGame();
    }



    startGame(){
        ui.renderGame();
        // document.addEventListener("keypress",(e)=>{ 
        //         if (e.keyCode==KEYCODES.UP){
        //             console.log("im pressing up")
        //           }  
        //      })
        var playbutton = document.getElementById("play");  
        if(playbutton){

            playbutton.addEventListener("click",()=>{
                this.play();
            });

        }
    }

    play(){
            setInterval(()=>{this.playSequence(this)},100);
    }
   
    playSequence(root){
            // get the game command  
        var gameData = root.snakeGame.getGameData();
        var gameStatus = gameData.gameStatus;      
        if (gameStatus=="ongoing"){ 
            document.addEventListener("keydown",(e)=>{  
    
                console.log("im pressing something",e.keyCode)
                if (e.keyCode==38){
                  console.log("im pressing up")
                  root.snakeGame.changeSnakeDirection(GAMEDIRECTION.UP);
                }
                if (e.keyCode==GAMEKEYCODES.DOWN){
                    console.log("im pressing down")
                    root.snakeGame.changeSnakeDirection(GAMEDIRECTION.DOWN);
                }
                if (e.keyCode==GAMEKEYCODES.LEFT){
                    console.log("im pressing left")
                    root.snakeGame.changeSnakeDirection(GAMEDIRECTION.LEFT);
                }
                if (e.keyCode==GAMEKEYCODES.RIGHT){
                    console.log("im pressing right")
                    root.snakeGame.changeSnakeDirection(GAMEDIRECTION.RIGHT);
                }
                if (e.keyCode==GAMEKEYCODES.QUIT){
                    console.log("im pressing quit")
                    root.snakeGame.stopGame();
                }
              })
              // else let the snake move
              root.snakeGame.snakeMove()
              // get the snake positions and the fruit position
              var snakePosition = root.snakeGame.getSnakePosition()
              var fruitPosition = root.snakeGame.getFruitPosition();
              var snakeHead = snakePosition.head;     
              // if yes, check if the snake has eaten a fruit
              // gets new fruit, adds points, remove old fruit from board
              if (snakeHead.row == fruitPosition.row && snakeHead.column == fruitPosition.column){
                root.snakeGame.points += 1;
                root.snakeGame.increaseSnakeLength();
                // this.board.removeFruit(fruitPosition);
                fruitPosition = root.snakeGame.generateFruitCoordinate(); // get new fruit;
                root.snakeGame.fruitPosition = fruitPosition
              }
              // update the board with these new developments
              // this.board.updateBoard(snakePosition,fruitPosition);
  
              root.snakeGame.updateBoard(snakePosition,fruitPosition);
              //if steps are still intack, increment, else break the cycle
              // check if the game is still ongoing
              if (!root.snakeGame.isInBounds(snakeHead.row,snakeHead.column) || root.snakeGame.checkSnakeHasBittenItself()){
                root.snakeGame.stopGame();
                root.snakeGame.removeLives()
              }
              root.updateGameBoard();
        }
    }
    renderGame(){

        var board = document.getElementById("board");
        var boardTable = document.createElement("table");      
        boardTable.className = "board-table" 
        var length = this.snakeGame.height;
        for (let i = 0 ; i < length;i++){
            var boardRow = document.createElement("tr");
            for (let j = 0 ; j < length; j++){
                var boardCell = document.createElement("td");
                boardCell.className = "board-cell";
                boardCell.id =  i.toString() + "," + j.toString();
                boardRow.appendChild(boardCell);
            }
            boardTable.appendChild(boardRow)
        }  
        board.appendChild(boardTable);
        var boardData = this.snakeGame.getGameData().board;
        boardData.forEach((cellData)=>{
            var boardCell = document.getElementById(cellData.row.toString() + "," + cellData.column.toString());
            if(boardCell){
                if (cellData.occupied){
                    if (cellData.occupiedBy == "body"){
                        boardCell.className = "snake-body";
                    }
                    if (cellData.occupiedBy == "head"){
                        boardCell.className = "snake-head";
                    }
                    if (cellData.occupiedBy == "fruit") {
                        boardCell.className = "fruit";
                    } 
                }else{
                    boardCell.className = "board-cell";
                }
            }
        })
        var lives = document.getElementById("lives");
        var points = document.getElementById("points");
        lives.innerText = this.snakeGame.getGameData().lives;
        points.innerText = this.snakeGame.getGameData().points;

    }

    updateGameBoard(){
        var boardData = this.snakeGame.getGameData().board;
        boardData.forEach((cellData)=>{
            var boardCell = document.getElementById(cellData.row.toString() + "," + cellData.column.toString());
            if(boardCell){
                if (cellData.occupied){
                    if (cellData.occupiedBy == "body"){
                        boardCell.className = "snake-body";
                    }
                    if (cellData.occupiedBy == "head"){
                        boardCell.className = "snake-head";
                    }
                    if (cellData.occupiedBy == "fruit") {
                        boardCell.className = "fruit";
                    } 
                }else{
                    boardCell.className = "board-cell";
                }
            }
        })
        var lives = document.getElementById("lives");
        var points = document.getElementById("points");
        lives.innerText = this.snakeGame.getGameData().lives;
        points.innerText = this.snakeGame.getGameData().points;
    }

}

var ui = new UI()
ui.startGame()




