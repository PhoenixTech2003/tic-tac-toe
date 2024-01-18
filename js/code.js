//gameboard object:
const gameBoard = (function (){
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
    //getMarker:
    function getMarker(){
        //call game controller module and return active player
        let activePlayerMarker = gameController().selectActivePlayer();
        return activePlayerMarker;
    

    }
    //setMark(row,column,mark):
    function setMarker(row,column){
        //get active players marker
        
        //create variable for empty cell
        const emptyCell = "";
        //create variable for cell
        const cell = board[row][column];
        //check if selected cell is empty
        if(cell === emptyCell){
            //set the player mark to a particular selected cell
            board[row][column]= getMarker();
        }
        let verifyWinner = gameController()
        verifyWinner.verifyWinner();
    }
    return{setMarker,board};
})();

//create player object:
const players = (function (){

    let playerOne = {
        playerName : "chichi",
        marker: "X"

    };

    let playerTwo = {
        playerName : "chiko",
        marker: "O"

    };

    return {playerOne,playerTwo};
})();

//create object to control game flow:
function gameController (){
    //create a variable to contain the total number of X's and O's on the board 
    let count = 0;
    //create function that switches players based on number of Markers on the board
    function selectActivePlayer (){
        //loop to calculate number of X's and O's on the board
        for (let i = 0; i < 3; i++){
           gameBoard.board[i].forEach(value=>{
     
               if(value == 'X' || value == "O"){
                  count++; 
               }
     
           }
             )
        }
        //condition that returns player two marker if board is empty or
        //if board has odd total number of markers and returns player one marker
        //if board has even number of markers
        if (count % 2 != 0){
            return players.playerOne.marker;
        }

        else{
            return players.playerTwo.marker;

        }
        

    }


    function extractRows(){
        let rows = [];
        gameBoard.board.forEach(row => rows.push(row));
        checkRows(rows,3);
    }

    function extractColumns(){
        let columns = [];
        for(let columnNumber = 0; columnNumber < 3; columnNumber++){
             columns.push(gameBoard.board.map((value,index)=>value[columnNumber]));       
       }

        checkRows(columns,3);      
    }

    function extractDiagonals(){
        let diagnols = [];
        let temp = [];
        let rows = 0;
        let columns = 2;

        for(let index = 0;index < 3; index++){
            temp.push(gameBoard.board[index][index])
        }
        diagnols.push(temp);
        temp = [];

        temp.push(gameBoard.board[rows][columns]);
        while(rows < 3 && columns > 0 ){
            rows ++;
            columns--;
            temp.push(gameBoard.board[rows][columns]);
        }

    
        diagnols.push(temp);
        checkRows(diagnols,2);

    }
        
        // function to check rows:
        function checkRows(array,rows){
            
            //loop over rows
            for(let index = 0; index < rows; index++ ){
               let playerOneMarker = getOccurences(array[index],"X");
               let playerTwoMarker = getOccurences(array[index],"O");
               if(playerOneMarker === 3){
                console.log("player one")
               }
               else if(playerTwoMarker === 3){
                console.log("player two")
               }

            }
        }

        //function to check number of occurences of marker
        function getOccurences(array,value){
            let count = 0;
            array.forEach(arrayValue =>{
                if(arrayValue === value){
                    count++;
                }
            })

            return count;
        }
        //function to determine winner
        function verifyWinner(){
          extractRows();
          extractColumns();
          extractDiagonals();
          console.log(gameBoard.board);
        }
    
   
   return {selectActivePlayer,verifyWinner};
}

