
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

    for (let i = 0 ; i<3 ; i++) {
        console.log(boardValues[i]) ;
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
            if (xCnt == 3 || oCnt == 3) {
                console.log("Row Check True") ;
                return true ;
            }
           
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
            if (xCnt ==3 || oCnt ==3 ) {
                console.log("Coln Check true") ; 
                return true ;
            }
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

        if (xCnt == 3 || oCnt == 3) {
            return true ;
        }

        
        i = 0, j = 2 , xCnt = 0 , oCnt = 0 ;
        while (i >=0 && j>=0) {
             if (boardValues[i][j] == 'X') xCnt++ ; 
             else if (boardValues[i][j] == 'O') oCnt++ ;
             i++ ; j-- ;
        }

        if (xCnt == 3 || oCnt == 3) {
            return true ;
        }

        return false ;
    }

    return (rowCheck() || diagonalCheck() || colnCheck());
}

function drawCheck(board) {
    let cnt = 0 ; 
    board.forEach(row=> {
        row.forEach((cell)=>{
            if (cell.getCharacter() != '') cnt++ ;
        })
    })
    console.log(cnt) ;
    return (cnt == 9) ;
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
        let gameEndFlag = winnerCheck(board);
        let drawFlag = drawCheck(board); 
        if (gameEndFlag) {
            return "WIN"; 
        } 
        if (drawFlag) {
            return "DRAW" ;
        }
        changeActivePlayer();
        return "CONTINUE" ;
    }
    
    const getBoard = ()=> boardObj.getBoard() ;

    return {
        playMatch,
        getBoard , 
        getActivePlayer ,
    }
}


function ScreenController() {

     let gameControl = gameControler() ;  
     let board = gameControl.getBoard() ;
     let playMatch = gameControl.playMatch ;  
     let gameEndFlag = false ;
     
     const container = document.querySelector('.container');
     const resultConatiner = document.querySelector('.resultDisplay') ;
      
    const updateScreen = ()=> {
        
        container.textContent = ""; 
        for (let i =0 ; i<3 ; i++) { 
            const row = document.createElement('div') ;
            row.classList.add('row') ;
            for (let j =0  ; j<3 ; j++) {
                const div = document.createElement('div') ;
                div.classList.add('cell') ;
                div.dataset.row = i ; 
                div.dataset.column = j ;
                div.textContent = board[i][j].getCharacter(); 
                row.appendChild(div) ;
            }
            container.appendChild(row) ;
        }

    }

    container.addEventListener('click', (event)=> {
        let row = event.target.getAttribute("data-row") ;
        let coln = event.target.getAttribute("data-column") ;
        
        console.log(row + coln) ;
        if (row && coln && board[row][coln].getCharacter() == '' && !gameEndFlag) {
            let result = playMatch(row,coln) ;

            if (result == "WIN") {
                updateScreen() ;
                gameEndFlag = true ;
                const activePlayer = gameControl.getActivePlayer() ; 
                const activePlayerName = activePlayer.name ;
                resultConatiner.textContent = `${activePlayerName} is the winner !` ;
            }
            else if (result == "DRAW") {
                gameEndFlag = true ;
                updateScreen() ;
                resultConatiner.textContent = "The game ended in a draw !" ;
            }
            else {
                updateScreen() ;
            }
        }
  
    })

    return { 
        updateScreen , 
    }

}

const Screen = ScreenController() ; 
Screen.updateScreen() ;
 



