
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
    const getPlayers = ()=> players ;
    const changeActivePlayer = () => activePlayer = (activePlayer == players[0]) ? players[1] : players[0];
    const changeName = (player1,player2)=> {
        players[0].name = player1 ;
        players[1].name = player2 ;
    }

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
        changeName ,
        players ,
    }
}


function ScreenController() {

     let gameControl = gameControler() ;  
     let board = gameControl.getBoard() ;
     let playMatch = gameControl.playMatch ;  
     let gameEndFlag = false ;
     
     const container = document.querySelector('.container');
     const resultConatiner = document.querySelector('.resultDisplay') ;
     const playersInfo = document.querySelector('.players-info') ;
      
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

        let players = gameControl.players ;
        playersInfo.textContent = ""; 
        const p1 = document.createElement('p') ;
        const p2 = document.createElement('p') ;
        const player1Name = players[0].name ;
        const player1Char = players[0].char ;
        const player2Name = players[1].name ;
        const player2Char = players[1].char ;

        p1.textContent = `${player1Name} is playing with ${player1Char} `; 
        p2.textContent = `${player2Name} is playing with ${player2Char}` ;

        playersInfo.appendChild(p1);
        playersInfo.appendChild(p2); 


    }

    container.addEventListener('click', (event)=> {
        let row = event.target.getAttribute("data-row") ;
        let coln = event.target.getAttribute("data-column") ;
        
        console.log(row + coln) ;
        console.log(board[row][coln].getCharacter()) ;
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

    function resetGame() {
        let board = gameControl.getBoard() ;
        for (let i = 0 ; i<3 ; i++) {
            for (let j =0 ; j<3 ; j++) {
                board[i][j].changeCharacter("") ;
            }
        }
        gameEndFlag = false ;
        updateScreen() ;
        resultConatiner.textContent = "" ;
    }

    const screenInterface = (()=>{

        const dialogBox = document.querySelector('.dialog-box') ;
        const startbtn = document.querySelector('.button-container .start');
        const enterbtn = document.querySelector('.enter') ;
        const restartButton = document.querySelector('.restart') ;
        
        restartButton.addEventListener('click',()=>{
            gameControl.changeName("Player-1","Player-2") ;
            resetGame() ;
        }) ;

        enterbtn.addEventListener('click',()=>{

            const inputFieldForPlayer1 = document.querySelector('#player-1') ;
            const inputFieldForPlayer2 = document.querySelector('#player-2') ;
            const player1Name = inputFieldForPlayer1.value ;
            const player2Name = inputFieldForPlayer2.value ; 
            inputFieldForPlayer1.value = "" ;
            inputFieldForPlayer2.value = "" ;
          
            if (player1Name && player2Name) {
                gameControl.changeName(player1Name,player2Name) ;
            }       
            resetGame() ;
            
        })
        startbtn.addEventListener('click',()=>{
            dialogBox.showModal() ;
        })
    })();

    return { 
        updateScreen , 
    }

}


const Screen = ScreenController() ; 
Screen.updateScreen() ;
 



