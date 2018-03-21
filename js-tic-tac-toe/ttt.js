var playerTurn = 1;

window.onload = function () {

    document.getElementById('startBtn').addEventListener('click', startgame, false);
}
var game;
function startgame() {
    game = new tttgame();

    game.addBoardListeners();
    // console.log(game);
}




function tttgame() {

    const x = 'X';
    const o = 'O';

    this.tttboard = document.getElementById('tableBoard');
    this.tttRow1 = document.getElementById('row1');
    this.tttRow2 = document.getElementById('row2');
    this.tttRow3 = document.getElementById('row3');
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
    this.useAi = document.getElementById('useAi').checked;

    // Click listeners to board
    this.addBoardListeners = function () {
        console.log('addBoardListeners');
        document.querySelectorAll('.cell').forEach(cell => {
            cell.innerHTML = ' ';
            cell.addEventListener('click', turnClick, false);
        })
    }

    // Callback fn
    turnClick = function (context) {


        context.target.removeEventListener('click', turnClick, false);
        if (playerTurn === 1) {
            context.target.innerHTML = x;
            isGameOver();
            playerTurn = 2;
        } else {
            context.target.innerHTML = o;
            isGameOver();
            playerTurn = 1;
        }

       
    }

    isGameOver = function () {
        
        let playerSymbol = (playerTurn === 1) ? x : o;
        console.log('PlayerSymbol: ' + playerSymbol);
        let boardState = getboardState();
        console.log('isGameOver');
        console.log(boardState);
        console.log(winningCombos);


        // Scan for winning combos
        for (let wcIterator = 0; wcIterator < winningCombos.length; wcIterator++) {
            console.log('Checking winning combos for: ');
            let currentWc = winningCombos[wcIterator];
            console.log(currentWc);

            let playerCombo = [];
            for (let i = 0; i < currentWc.length; i++) {
                console.log('boardState at i: ' + boardState[currentWc[i]] + ' i: ' + i);
                playerCombo.push( (boardState[currentWc[i]]  == playerSymbol) ? currentWc[i] : null);
            }
            console.log('PlayerCombo: ');
            console.log(playerCombo);
            
            if(playerCombo.join() == currentWc.join()){
                alert('winner!');
            }else{
                console.log('no winner');
            }
        }


    }

    /**
     *  returns array of strings representing the tic-tac-toe board
     *      e.g.
     *  ["X", "O", "", "", "X", "O", "", "", "X"]
     */
    getboardState = function () {

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

  


}

//create [ [], [], []]
//---------
// have to select all values from the board
// select 1 i'll get an x or o 
// if playerTurn symbol add to array?
// check them for winning combos



