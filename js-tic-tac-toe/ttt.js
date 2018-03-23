var playerTurn = 1;
var game;

window.onload = function () {

    document.getElementById('startBtn').addEventListener('click', startgame, false);
}
function startgame() {
    game = new tttgame();

    game.startGame();
    // console.log(game);
}



function tttgame() {

    /**
     *  Board Piece Symbols 
     */
    const x = 'X';
    const o = 'O';
    const MAX_MOVE_COUNT = 9;
    let moveCount = 0;

    /**
       *  2D Array
       *  Array of Winning Combo Indexes Arrays
       */
    let winningCombos = [
        // horizontal
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],

        // vertical 
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],

        // diagonal
        [0, 4, 8],
        [2, 4, 6]

    ];

    // Single Player vs AI
    let useAi = document.getElementById('useAi').checked;


    // Start Game
    this.startGame = function () {

        // Disable Start btn
        document.getElementById('startBtn').disabled = true;

        let gameOverElement = document.getElementsByClassName("gameOver")[0];
        gameOverElement.style.display = 'none';

        addBoardListeners();
    }

    // Click listeners to board
    let addBoardListeners = function () {

        document.querySelectorAll('.cell').forEach(cell => {
            cell.innerHTML = ' ';
            cell.addEventListener('click', turnClick, false);
            cell.style.cursor = 'pointer';
        })
    }
    let removeBoardListeners = function () {
        document.querySelectorAll('.cell').forEach(cell => {
            cell.removeEventListener('click', turnClick, false);
            cell.style.cursor = 'default';
        })
    }

    // Callback fn
    let turnClick = function (context) {

        moveCount++;
        context.target.removeEventListener('click', turnClick, false);
        if (playerTurn === 1) {
            context.target.style.cursor = 'default';
            context.target.innerHTML = x;
            isGameOver();
            playerTurn = 2;
        } else {
            context.target.style.cursor = 'default';
            context.target.innerHTML = o;
            isGameOver();
            playerTurn = 1;
        }


    }

    let isGameOver = function () {

        let playerSymbol = (playerTurn === 1) ? x : o;
        let boardState = getboardState();


        // Scan for winning combos
        for (let wcIterator = 0; wcIterator < winningCombos.length; wcIterator++) {
            let currentWc = winningCombos[wcIterator];

            let playerCombo = [];
            for (let i = 0; i < currentWc.length; i++) {
                playerCombo.push((boardState[currentWc[i]] == playerSymbol) ? currentWc[i] : null);
            }

            if (playerCombo.join() == currentWc.join()) {
                gameOver(false);
            } else if ( moveCount >= MAX_MOVE_COUNT) {
                gameOver(true);
            } else {
                // console.log('no winner');
            }
        }


    }

    /**
     *  returns array of strings representing the tic-tac-toe board
     *      e.g.
     *  ["X", "O", "", "", "X", "O", "", "", "X"]
     */
    let getboardState = function () {

        boardStateArray = [];
        boardState = [
            [0, 1, 2],
            [0, 0, 0],
            [0, 0, 0]
        ];

        document.querySelectorAll('.cell').forEach(cell => {
            let index = Number.parseInt(cell.id.charAt(4));
            boardStateArray[index] = cell.innerHTML;

        })
        return boardStateArray;
    }


    let gameOver = function(isDraw) { 

        let gameOverMessage = (isDraw) ? 'Game is a Draw!' : `Winner is Player ${playerTurn}`;
        
        document.getElementById('gameOverWinner').innerHTML = gameOverMessage;

        let gameOverElement = document.getElementsByClassName("gameOver")[0];
        gameOverElement.style.display = 'block';

        removeBoardListeners();

        document.getElementById('startBtn').disabled = false;

    }


}




