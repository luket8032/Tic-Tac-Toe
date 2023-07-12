const playersArr = []

const player = (name, mark, turn) => {
    return {name, mark, turn}
}

const gameBoard = (() => {
    const container = document.querySelector('.container')
    const board = ['', '', '','', '', '','', '', ''];
    let currentTurn = ''

    const cellsTaken = {
        'X': [],
        'O': []
    }

    const winConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8]
    ]

    const renderBoard = () => {
        const boardDoc = document.createElement('div')
        boardDoc.classList.add('board')
        board.forEach((spot, index) => {
            const spotDoc = document.createElement('div')
            spotDoc.classList.add('cell')
            spotDoc.setAttribute('data-cell', index)
            spotDoc.textContent = spot
            boardDoc.append(spotDoc)
        })
        container.append(boardDoc)
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
        changeTurn(playerArr)
        return(currentTurn)
    }

    const markCell = (markedCell) => {
        board.splice(markedCell.dataset.cell, 1, currentTurn)
        markedCell.textContent = currentTurn
    }

    const getMarks = (playerArr) => {
        function getInd(arr, val) {
            let index = [], i = -1;
            while ((i = arr.indexOf(val, i + 1)) != -1) {
                index.push(i);
            }
            return index;
        }

        playerArr.forEach((player) => {
            cellsTaken[player.mark] = getInd(board, player.mark)
        })
    }

    const checkWin = () => {
        let checker = (arr, target) => target.every(v => arr.includes(v));
        for(const mark in cellsTaken) {
            winConditions.forEach((condition) => {
                if(checker(cellsTaken[mark], condition)) {
                    const winMsg = document.createElement('h3')
                    winMsg.textContent = `${mark} won!`
                    container.append(winMsg)
                }
            })
        }
    }
    
    return {renderBoard, getTurn, markCell, getMarks, checkWin}
})();

const player1 = player('Player 1', 'X', true);
const player2 = player('Player 2', 'O', false);     

playersArr.push(player1, player2) 

gameBoard.renderBoard();
const board = document.querySelector('.board')

board.addEventListener('click', (e) => {
    if(e.target.className === 'cell' && e.target.textContent === '') {
        gameBoard.getTurn(playersArr)
        gameBoard.markCell(e.target)
        gameBoard.getMarks(playersArr)
        gameBoard.checkWin()
    }
})
