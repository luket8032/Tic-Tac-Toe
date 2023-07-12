const playersArr = []

const player = (name, mark, turn) => {
    return {name, mark, turn}
}

const gameBoard = (() => {
    const board = ['', '', '','', '', '','', '', ''];
    let currentTurn = ''
    const winConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8]
    ]

    const renderBoard = (boardArr) => {
        const boardDoc = document.createElement('div')
        boardDoc.classList.add('board')
        boardArr.forEach((spot, index) => {
            const spotDoc = document.createElement('div')
            spotDoc.classList.add('cell')
            spotDoc.setAttribute('data-cell', index)
            spotDoc.textContent = spot
            boardDoc.append(spotDoc)
        })
        document.body.append(boardDoc)
    }

    const changeTurn = (playerArr) => {
        playerArr.forEach((player) => {
            player.turn = !player.turn
        })
    }

    const getTurn = (playerArr) => {
        playerArr.forEach((player) => {
            if(player.turn === true) {
                currentTurn = player.mark
            }
        })
        return(currentTurn)
    }
    
    return {board, renderBoard, changeTurn, getTurn}
})();

const player1 = player('Player 1', 'X', true);
const player2 = player('Player 2', 'O', false);

playersArr.push(player1, player2) 

gameBoard.renderBoard(gameBoard.board);
const board = document.querySelector('.board')

board.addEventListener('click', (e) => {
    e.target.textContent = gameBoard.getTurn(playersArr)
    gameBoard.changeTurn(playersArr)
    
})

