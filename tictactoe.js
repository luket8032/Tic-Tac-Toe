const gameBoard = (() => {
    const board = ['O', 'O', 'X','X', 'O', 'O','X', 'X', 'X'];

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
    return {board, renderBoard}
})();

const player = (name, mark) => {
    return {name, mark}
}

const player1 = player('Player 1', 'X');
const player2 = player('Player 2', 'O');

console.log(gameBoard.board)
gameBoard.renderBoard(gameBoard.board);