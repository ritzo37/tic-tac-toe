
function gameBoard() {
    let board = [];
    let rows = 3;
    let columns = 3;

    for (let i = 0; i < rows; i++) {
        board[i] = [];
        for (let j = 0; j < columns; j++) {
            board[i][j] = Cell();
        }
    }

    const getBoard = () => board;
    return {
        getBoard,
    }
}

function Cell() {

    let character = "";
    const getCharacter = () => character;
    const changeCharacter = (userCharacter) => {
        character = userCharacter;
    }

    return {
        getCharacter,
        changeCharacter,
    }
}

function winnerCheck(board) {

    let boardValues = [];
    for (let i = 0; i < 3; i++) {
        let currRowValues = board[i].map((Cell) => {
            return Cell.getCharacter();
        });
        boardValues.push(currRowValues);
    }

    function rowCheck() {
        for (let i = 0; i < 3; i++) {
            let xCnt = 0, oCnt = 0;
            currRow = boardValues[i]; 
            currRow.forEach((Cell) => {
                if (Cell == 'X') xCnt++;
                else if (Cell =='O') {
                    oCnt++;
                }
            }) 
            if (xCnt == 3 || oCnt == 3) return true;  
           
        }
        return false ;
    }
  
    function colnCheck() {
        for (let j = 0 ; j<3 ; j++) {
            let xCnt = 0 , oCnt = 0 ;
            for (let i = 0 ; i<3 ; i++) {
                if (boardValues[i][j] == 'X') xCnt++ ; 
                else if (boardValues[i][j]== 'O') {
                    oCnt ++ ;
                }
            }
            if (xCnt ==3 || oCnt ==3 ) return true ;
        }
        return false ;
    }
    function diagonalCheck() {
        let i = 0 , j = 0 ; 
        let xCnt = 0 , oCnt = 0 ;
        while (i<3 && j<3) {
            if (boardValues[i][j]=='X') xCnt++ ;
            else if (boardValues[i][j] == 'O'){
                oCnt++ ;
            }
            i++ ; j++ ;
        }
        if (xCnt == 3 || oCnt == 3) return true ;
        return false; 
    }

    return (rowCheck() || diagonalCheck() || colnCheck());
}

function gameControler() {
    let boardObj = gameBoard();
    const players = [
        {
            name: "Player-1",
            char: 'O',
        }
        ,
        {
            name: "Player-2",
            char: 'X',
        }
    ];

    let activePlayer = players[0];
    const getActivePlayer = () => activePlayer;
    const changeActivePlayer = () => activePlayer = (activePlayer == players[0]) ? players[1] : players[0];

    function playMatch(row, column) {
        let activePlayer = getActivePlayer();
        let currCharacter = activePlayer.char;
        let board = boardObj.getBoard();
        board[row][column].changeCharacter(currCharacter);
        let gameEndFlag = winnerCheck(boardObj.getBoard());
        let drawFlag = drawCheck(boardObj.getBoard()); 
        if (gameEndFlag) {
            return "WIN"; 
        } 
        if (drawFlag) {
            return "DRAW" ;
        }
        changeActivePlayer();
        return false ;
    }

    function printBoard() {
        let currBoard = boardObj.getBoard();

        for (let i = 0; i < 3; i++) {
            let currRow = currBoard[i].map((Cell) => {
                return Cell.getCharacter();
            });
            console.log(currRow);
        }
    }

    return {
        playMatch,
        Board: boardObj.getBoard(),
        printBoard,
        getActivePlayer ,
    }
}
 


const gameC = gameControler();
while (true) {
     let activePlayer = gameC.getActivePlayer() ;
     let activePlayerName = activePlayer.name ; 
     let activePlayerCharacter = activePlayer.char ;

     console.log(activePlayerName + " " + " turn " + "...") ; 
     console.log("Please row and coln for the character " + activePlayerCharacter) ;
     let row = prompt("Enter row to place your char") ; 
     let coln = prompt("Enter coln to place your char") ;

     if (!(row>=0 && row<=2) || !(coln>=0 && coln<=2)) {
         console.log("Please For fuck's sake Enter valid row's and columns ! ") ; 
         continue ;
     }

     let currBoard = gameC.Board ;
     if (currBoard[row][coln].getCharacter() != '') {
        console.log("Please Enter the row and coln where the character isn't filled already !") ; 
        continue ;
     }

     let currGameResult = gameC.playMatch(row,coln) ;
     gameC.printBoard() ;
     if (currGameResult == "WIN") {
        alert(activePlayerName + "is the Winner !") ;
        break ;
     }
     else if (currGameResult == "DRAW") {
        alert ("The game ended in a god damn draw!") ; 
        break ;
     }
}
