//gameboard object:
function gameBoard(){
    //create number of rows
    let rows = 3;
    //create number of columns
    let columns = 3;
    //board array
    let board = [];
    //create the gameboard
    generateGameBoard();
    //function to genearte game board
    function generateGameBoard(){
        for(let row = 0; row < rows;row ++){
            board[row] = []
            for(let column = 0;column < columns;column++){
                board[row][column] = "";
            }
        }

    }
    //getMark:
    //setMark(row,column,mark):
    function setMark(row,column,mark){
        //create variable for empty cell
        const emptyCell = "";
        //create variable for cell
        const cell = board[row][column];
        //check if selected cell is empty
        if(cell === emptyCell){
            //set the player mark to a particular selected cell
            board[row][column]= mark;
        }

    }
    return{setMark,board};
}

//create object to control game flow:
function GameController(){
    
}

let trial= gameBoard()
trial.setMark(0,0,"o");
trial.setMark(2,1,"o");
trial.setMark(0,0,"x");
trial.setMark(1,0,"x");






console.log(trial.board);



