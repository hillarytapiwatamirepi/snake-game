

var {SnakeGame,Snake, Board} = require("./snakegametest.js");



test("Snake Constructor",()=>{
    const snake = new Snake();
    expect(snake.getLives()).toBe(1);
    expect(snake.getLength()).toBe(1);
    expect(snake.row).toBe(0);
    expect(snake.column).toBe(1);
    expect(snake.velocity).toBe(1);
    expect(snake.startDirection).toBe("right");
    expect(snake.getPosition()).toEqual({
        
            head:{
                 row: 0, 
                 column: 1,
                 cellDirection:"right"
            },
            rest:[    
                {
                    row:0,
                    column:0,
                    cellDirection:"right"
                }
            ]
    })
})

test("snake move left 2 steps",()=>{

    const snake = new Snake();
    snake.move();
    snake.move();

    expect(snake.getPosition()).toEqual(
        {   
            head:{
                 row: 0, 
                 column: 3,
                 cellDirection:"right"
            },
            rest:[    
                {
                    row:0,
                    column:2,
                    cellDirection:"right"
                }
            ]
  
    }
    
    );


})


test("snake move L shape down",()=>{

    const snake = new Snake();
    snake.move();
    snake.move();
    snake.changeDirection("down");
    snake.move();

    expect(snake.getPosition()).toEqual(
        {   
            head:{
                 row: 1, 
                 column: 3,
                 cellDirection:"down"
            },
            rest:[    
                {
                    row:0,
                    column:3,
                    cellDirection:"down"
                }
            ]
    }
    
    );

})

test("snake move L shape down change direction up",()=>{

    const snake = new Snake();
    snake.move();
    snake.move();
    snake.changeDirection("down");
    snake.move();
    snake.changeDirection("up");
    snake.move();
    expect(snake.getPosition()).toEqual(
        {   
            head:{
                 row: 2, 
                 column: 3,
                 cellDirection:"down"
            },
            rest:[    
                {
                    row:1,
                    column:3,
                    cellDirection:"down"
                }
            ]
    } 
    );
})

test("snake move left two steps, then up two steps, and crash",()=>{
    const snake = new Snake();
    snake.move();
    snake.move();
    snake.changeDirection("up");
    snake.move();
    snake.move();

    expect(snake.getPosition()).toEqual(
        {   
            head:{
                 row: -2, 
                 column: 3,
                 cellDirection:"up"
            },
            rest:[    
                {
                    row:-1,
                    column:3,
                    cellDirection:"up"
                }
            ]
    } 
    );  

})

test("snake move left two steps, then up two steps, crash, move left one step",()=>{
    const snake = new Snake();
    snake.move();
    snake.move();
    snake.changeDirection("up");
    snake.move();
    snake.move();
    snake.changeDirection("left");
    snake.move();
    expect(snake.getPosition()).toEqual(
        {   
            head:{
                 row: -2, 
                 column: 2,
                 cellDirection:"left"
            },
            rest:[    
                {
                    row:-2,
                    column:3,
                    cellDirection:"left"
                }
            ]
    } 
    );  

}); 

test("increase length",()=>{
    const snake = new Snake();
    snake.move();
    snake.move();
    snake.increaseLength();
    expect(snake.getPosition()).toEqual(
        {   
            head:{
                 row: 0, 
                 column: 3,
                 cellDirection:"right"
            },
            rest:[    
                {
                    row:0,
                    column:2,
                    cellDirection:"right"
                },{
                    row:0,
                    column:1,
                    cellDirection:"right"
                }
            ]
    } 
    );  
});

test("snake move L shape down and increase Length",()=>{

    const snake = new Snake();
    snake.move();
    snake.move();
    snake.changeDirection("down");

    snake.increaseLength()
    snake.move();
    expect(snake.getPosition()).toEqual(
        {   
            head:{
                 row: 1, 
                 column: 3,
                 cellDirection:"down"
            },
            rest:[    
                {
                    row:0,
                    column:3,
                    cellDirection:"down"
                },{              
                    row:0,
                    column:2,
                    cellDirection:"right"
                }
            ]
    }
    
    );

})

/**
 * Test Increase Length,edge case horizontal movements
 */
test("corners: snake increase length at with tail at (0,0) and head facing right",()=>{

    const snake = new Snake();
    snake.increaseLength();
    expect(snake.getPosition()).toEqual(
        {   
            head:{
                 row: 0, 
                 column: 1,
                 cellDirection:"right"
            },
            rest:[    
                {
                    row:0,
                    column:0,
                    cellDirection:"right"
                },{              
                    row:0,
                    column:-1,
                    cellDirection:"right"
                }
            ]
    }
    );
     
})

test("increaseLength: head facing left",()=>{

    const snake = new Snake();   
    snake.changeDirection("down");
    snake.move()
    snake.changeDirection("left");
    snake.move();
    snake.increaseLength();
    expect(snake.getPosition()).toEqual(
        {   
            head:{
                 row: 1, 
                 column: 0,
                 cellDirection:"left"
            },
            rest:[    
                {
                    row:1,
                    column:1,
                    cellDirection:"left"
                },{              
                    row:1,
                    column:2,
                    cellDirection:"left"
                }
            ]
    }
    );
  
})


test("increaseLength: head facing down",()=>{

    const snake = new Snake();   
    snake.changeDirection("down");
    snake.move()
    snake.increaseLength();
    expect(snake.getPosition()).toEqual(
        {   
            head:{
                 row: 1, 
                 column: 1,
                 cellDirection:"down"
            },
            rest:[    
                {
                    row:0,
                    column:1,
                    cellDirection:"down"
                },{              
                    row:-1,
                    column:1,
                    cellDirection:"down"
                }
            ]
    }
    );

})



test("increaseLength: head facing up",()=>{

    const snake = new Snake();   
    snake.changeDirection("up");
    snake.move()
    snake.increaseLength();
    expect(snake.getPosition()).toEqual(
        {   
            head:{
                 row: -1, 
                 column: 1,
                 cellDirection:"up"
            },
            rest:[    
                {
                    row:0,
                    column:1,
                    cellDirection:"up"
                },{              
                    row:1,
                    column:1,
                    cellDirection:"up"
                }
            ]
    }
    );
});

test("small game: height 20, no commands, snake facing right, and crashes", ()=>{

    const snakeGame = new SnakeGame();
    snakeGame.board.removeFruit(snakeGame.fruitPosition);
    snakeGame.fruitPosition = {
        row : 1,
        column : 0
    }
    snakeGame.board.setFruit({row: 1, column : 0})
    var board  = []
    for (let i = 0; i < 20; i++){
        for (let j = 0 ; j < 20; j++){
            var cell = {
                row : i,
                column : j,
                occupied : false,
                occupiedBy: "nothing"
            }
            if (i==0 && j ==19){
                cell.occupiedBy = "body";
                cell.occupied = true;
            }
            if (i==1 && j==0){
                cell.occupiedBy = "fruit";
                cell.occupied = true;
            }
            board.push(cell);

        }

    }
    snakeGame.moveSnakeCommands([]);
    expect(snakeGame.getGameData()).toEqual({
        gameStatus: "over",
        points : 0,
        lives : 0,
        snakePosition : {
            head:{
                row: 0, 
                column: 20,
                cellDirection:"right"
           },
           rest:[    
               {
                   row:0,
                   column:19,
                   cellDirection:"right"
               }
           ]
        },
        board : board,
        fruitPosition: {row:1,column:0}
    });

})

test("small game: moves 5 steps right, eats fruit, game is ongoing" , ()=>{
    const snakeGame = new SnakeGame();
    snakeGame.board.removeFruit(snakeGame.fruitPosition);
    snakeGame.fruitPosition = {
        row : 0,
        column : 3
    }
    snakeGame.board.setFruit({row: 0, column : 3})
    
    var board  = []
    for (let i = 0; i < 20; i++){
        for (let j = 0 ; j < 20; j++){
            var cell = {
                row : i,
                column : j,
                occupied : false,
                occupiedBy: "nothing"
            }
            if (i==0 && j ==6){
                cell.occupiedBy = "head";
                cell.occupied = true;
            }
            if (i==0 && j ==5){
                cell.occupiedBy = "body";
                cell.occupied = true;
            }
            if (i==0 && j==4){
                cell.occupiedBy = "body";
                cell.occupied = true;
            }

            if (i==1 && j==5){// new fruit position after the original is eaten
                cell.occupiedBy = "fruit";
                cell.occupied = true;
            }

            board.push(cell);
        }

    }

    snakeGame.moveSnakeCommands([
            {
                changeDirection:false,
                direction:"left",
            },
            {
                changeDirection:false,
                direction:"left",

            },{

                changeDirection:false,
                direction:"left",  
            },{


                changeDirection:false,
                direction:"left",  
            },{


                changeDirection:false,
                direction:"left",  
            }
    ]);

    snakeGame.board.removeFruit(snakeGame.fruitPosition);
    snakeGame.fruitPosition =  {row: 1, column : 5}
    snakeGame.board.setFruit({row: 1, column : 5})


    // console.log(snakeGame.getGameData())


    expect(snakeGame.getGameData()).toEqual({

        gameStatus: "ongoing",
        points : 1,
        lives : 1,
        snakePosition : {
            head:{
                row: 0, 
                column:6,
                cellDirection:"right"
           },
           rest:[    
               {
                   row:0,
                   column:5,
                   cellDirection:"right"
               },
               {
                row:0,
                column:4,
                cellDirection:"right"
              }
           ]
        },
        board : board,
        fruitPosition: {row: 1, column : 5}
    });


});



test("small game: moves 2 steps right, 2 steps down, eats 2 fruits, game is ongoing" , ()=>{
    // first fruit is at 0,2
    // second fruit is at 2,3
    //
    //
    const snakeGame = new SnakeGame();
    snakeGame.board.removeFruit(snakeGame.fruitPosition);
    snakeGame.fruitPosition = {
        row : 0,
        column : 2
    }
    snakeGame.board.setFruit({row: 0, column : 2})


    var board  = []
    for (let i = 0; i < 20; i++){
        for (let j = 0 ; j < 20; j++){
            var cell = {
                row : i,
                column : j,
                occupied : false,
                occupiedBy: "nothing"
            }
            if (i==2 && j==3){
                cell.occupiedBy = "head";
                cell.occupied = true;
            }
            if (i==1 && j ==3){
                cell.occupiedBy = "body";
                cell.occupied = true;
            }
            if (i==0 && j==3){
                cell.occupiedBy = "body";
                cell.occupied = true;
            }            
            if (i==10 && j==5){// new fruit position after the original is eaten
                cell.occupiedBy = "fruit";
                cell.occupied = true;
            }

            board.push(cell);
        }

    }
    
    snakeGame.moveSnakeCommands([
            {
                changeDirection:false,
                direction:"left",
            }
    ]);

    snakeGame.board.removeFruit(snakeGame.fruitPosition);
    snakeGame.fruitPosition =  {row: 2, column : 3}
    snakeGame.board.setFruit({row: 2, column : 3})

    // console.log(snakeGame.getGameData())
    snakeGame.moveSnakeCommands([
      {
        changeDirection:false,
        direction:"left"
        },
        {
        changeDirection:true,
        direction:"down"
    },{
        changeDirection:false,
        direction:"left"
    }])

    snakeGame.board.removeFruit(snakeGame.fruitPosition);
    snakeGame.fruitPosition =  {row: 10, column : 5}
    snakeGame.board.setFruit({row: 10, column : 5})

    // console.log(snakeGame.getGameData());
    expect(snakeGame.getGameData()).toEqual({
        gameStatus: "ongoing",
        points : 2,
        lives : 1,
        snakePosition : {
            head:{
                row: 2, 
                column:3,
                cellDirection:"down"
           },
           rest:[    
               {
                   row:1,
                   column:3,
                   cellDirection:"down"
               },
               {
                row:0,
                column:3,
                cellDirection:"down"
              },{
                row:-1,
                column:3,
                cellDirection:"down"
              }
           ]
        },
        board : board,
        fruitPosition: {row: 10, column : 5}
    });


});

test("snake has bitten itself, eats snake of length 7",()=>{

    const snakeGame = new SnakeGame();
    var board  = []
    for (let i = 0; i < 20; i++){
        for (let j = 0 ; j < 20; j++){
            var cell = {
                row : i,
                column : j,
                occupied : false,
                occupiedBy: "nothing"
            }
            if (i==0 && j==11){
                cell.occupiedBy = "body";
                cell.occupied = true;
            }
            if (i==1 && j==11){
                cell.occupiedBy = "body";
                cell.occupied = true;
            }
            if (i==1 && j==12){
                cell.occupiedBy = "body";
                cell.occupied = true;
            }
            if (i==0 && j==12){
                cell.occupiedBy = "body";
                cell.occupied = true;
            }  
            if (i==0 && j==11){
                cell.occupiedBy = "body";
                cell.occupied = true;
            }  
            if (i==0 && j==10){
                cell.occupiedBy = "body";
                cell.occupied = true;
            }    
            
            if (i==0 && j==9){
                cell.occupiedBy = "body";
                cell.occupied = true;
            } 

            if (i==0 && j==8){
                cell.occupiedBy = "body";
                cell.occupied = true;
            } 

            if (i==19 && j==19){// new fruit position after the original is eaten
                cell.occupiedBy = "fruit";
                cell.occupied = true;
            }
            board.push(cell);
        }

    }
    snakeGame.board.removeFruit(snakeGame.fruitPosition);
    snakeGame.fruitPosition =  {row: 19, column : 19}
    snakeGame.board.setFruit({row: 19, column : 19})
    for (let i = 0 ; i < 6; i++){
        snakeGame.snake.increaseLength();
    }

    var commands = []
    for (let i = 0 ; i < 11; i++){
        commands.push({changeDirection:false,direction:"left"})
    }
    commands.push({changeDirection:true,direction:"down"});
    commands.push({changeDirection:true,direction:"left"})
    commands.push({changeDirection:true,direction:"up"});

    snakeGame.moveSnakeCommands(commands);

    expect(snakeGame.getGameData()).toEqual({
        gameStatus: "over",
        points : 0,
        lives : 0,
        snakePosition : {
            head:{
                row: 0, 
                column:11,
                cellDirection:"up"
           },
           rest:[    
               {
                   row:1,
                   column:11,
                   cellDirection:"up"
               },
               {
                row:1,
                column:12,
                cellDirection:"left"
            },
            {
                row:0,
                column:12,
                cellDirection:"down"
            },
            {
                row:0,
                column:11,
                cellDirection:"right"
            },
            {
                row:0,
                column:10,
                cellDirection:"right"
            },
               {
                row:0,
                column:9,
                cellDirection:"right"
              },{
                row:0,
                column:8,
                cellDirection:"right"
              }
           ]
        },
        board : board,
        fruitPosition: {row: 19, column : 19}
    });











})