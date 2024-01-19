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

    function restartGame(){
        generateGameBoard()
    }

    
    return{setMarker,board,restartGame};
})();

//create player object:
const players = (function (){

    let playerOne = {
        playerName : "",
        marker: "X"

    };

    let playerTwo = {
        playerName : "",
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
            return players.playerTwo.marker;
        }

        else{
            return players.playerOne.marker;

        }
        

    }


    function extractRows(){
        let rows = [];
        gameBoard.board.forEach(row => rows.push(row));
        return  checkRows(rows,3);
    }

    function extractColumns(){
        let columns = [];
        for(let columnNumber = 0; columnNumber < 3; columnNumber++){
             columns.push(gameBoard.board.map((value,index)=>value[columnNumber]));       
       }

        return checkRows(columns,3);      
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
       return checkRows(diagnols,2);

    }

    function countMarkers(){
        let count = 0;
        gameBoard.board.forEach(row =>{
            row.forEach(value => {
                if(value ==="X" || value === "O"){
                    count++
                }
            })
        })
        return count;
    }

    function checkForDraw(){
        let moves = countMarkers()
        if (moves === 9){
            
            return "DRAW!"
        }
    }
        
        // function to check rows:
        function checkRows(array,rows){
            
            //loop over rows
            for(let index = 0; index < rows; index++ ){
               let playerOneMarker = getOccurences(array[index],"X");
               let playerTwoMarker = getOccurences(array[index],"O");
               if(playerOneMarker === 3){
                    return `${players.playerOne.playerName} Wins`
                
               }
               else if(playerTwoMarker === 3){
                
                    return `${players.playerTwo.playerName} Wins`

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
            console.log(gameBoard.board);
            return[extractRows(),extractColumns(),extractDiagonals(),checkForDraw(),]
          
        }
    
   
   return {selectActivePlayer,verifyWinner};
}

//object for manipulating and displaying to  the DOM
function displayController(){
    cacheDOM().getNamesModal.showModal();
    bindEvents();
    //cacheDOM
    function cacheDOM(){
        const getNameModalButton = document.querySelector("dialog form button");
        const playerOneInput = document.querySelector("#playerOneName").value;
        const playerTwoInput = document.querySelector("#playerTwoName").value;
        const getNamesModal = document.querySelector("#get-player-names");
        const playerOneTag = document.querySelector(".player-one-name");
        const playerTwoTag = document.querySelector(".player-two-name");
        const boardCells = document.querySelectorAll(".game-board > div");
        const resultsModal = document.querySelector("#game-result")
        const resultsheading = document.querySelector("#game-result .dialog-content > h1")

        return{
            getNameModalButton,
            getNamesModal,
            playerOneInput,
            playerTwoInput,
            playerOneTag,
            playerTwoTag,
            boardCells,
            resultsModal,
            resultsheading};
    }
        //bindEvents
    function bindEvents(){
        cacheDOM().getNameModalButton.addEventListener("click",displayNames);
        cacheDOM().boardCells.forEach(cell => cell.addEventListener("click",displayMarker));
        
    }

    function displayNames(event){
        event.preventDefault();
        players.playerOne.playerName = cacheDOM().playerOneInput;
        players.playerTwo.playerName = cacheDOM().playerTwoInput;
        cacheDOM().playerOneTag.innerHTML = `${players.playerOne.playerName} (X)`;
        cacheDOM().playerTwoTag.innerHTML = `${players.playerTwo.playerName} (O)`;
        cacheDOM().getNamesModal.close()

    }

    function displayMarker(event){
         let row = event.target.dataset.row;
         let column = event.target.dataset.column;
         gameBoard.setMarker(row,column);
         updateDisplay()
         displayResult();

         

    }

    function updateDisplay(){
        
                cacheDOM().boardCells.forEach(cell => {
                    cell.innerHTML = gameBoard.board[cell.dataset.row][cell.dataset.column];
                })

            
        
    }

    function displayResult(){
        let result = gameController().verifyWinner();
        result.forEach(value =>{
                if(value != undefined){
                    cacheDOM().resultsheading.innerHTML = value;
                    cacheDOM().resultsModal.showModal();

                }
            
        })
    }



    

    
    

}

displayController();