const player = (name, mark, turn) => {
    return {name, mark, turn}
}

const gameBoard = (() => {
    const container = document.querySelector('.container')
    const boardArr = ['', '', '','', '', '','', '', ''];
    const result = document.getElementById('result')
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
        [0, 4, 8],
        [2, 4, 6]
    ]

    const renderBoard = () => {
        const boardDoc = document.createElement('div')
        boardDoc.classList.add('board')
        boardArr.forEach((spot, index) => {
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
        boardArr.splice(markedCell.dataset.cell, 1, currentTurn)
        markedCell.textContent = currentTurn
        markedCell.classList.add(currentTurn)
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
            cellsTaken[player.mark] = getInd(boardArr, player.mark)
        })
    }

    const checkWin = () => {
        let checker = (arr, target) => target.every(v => arr.includes(v));
        const winMsg = document.getElementById('winMsg')
        for(const mark in cellsTaken) {
            winConditions.forEach((condition) => {
                if(checker(cellsTaken[mark], condition)) {
                    winMsg.textContent = `${mark} won!`
                    result.classList.add('active')
                } else if(boardArr.includes('') === false) {
                    winMsg.textContent = 'Looks like a tie!'
                    result.classList.add('active')
                }
            })
        }
    }

    const resetBoard = (currentBoard) => {
        const cells = currentBoard.querySelectorAll('.cell')
        container.removeChild(currentBoard)
        boardArr.splice(
            0, 9,
            '', '', '',
            '', '', '',
            '', '', ''
        )
        renderBoard(boardArr)
        result.classList.remove('active')
    }
    
    return {renderBoard, getTurn, markCell, getMarks, checkWin, resetBoard}
})();

const playersArr = []
const player1 = player('Player 1', 'X', true);
const player2 = player('Player 2', 'O', false);     
playersArr.push(player1, player2) 

gameBoard.renderBoard();
let newBoard = document.querySelector('.board')
newBoard.addEventListener('click', (e) => {
    if(e.target.className === 'cell' && e.target.textContent === '') {
        gameBoard.getTurn(playersArr)
        gameBoard.markCell(e.target)
        gameBoard.getMarks(playersArr)
        gameBoard.checkWin()
    }
})

const restart = document.querySelector('.restart')
restart.addEventListener('click', () => {
    gameBoard.resetBoard(newBoard)
    newBoard = document.querySelector('.board')
    gameBoard.getTurn(playersArr)
    newBoard.addEventListener('click', (e) => {
        if(e.target.className === 'cell' && e.target.textContent === '') {
            gameBoard.getTurn(playersArr)
            gameBoard.markCell(e.target)
            gameBoard.getMarks(playersArr)
            gameBoard.checkWin()
        }
    })
    
})





