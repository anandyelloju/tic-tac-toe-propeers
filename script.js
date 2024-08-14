document.addEventListener('DOMContentLoaded', () => {
    let currentPlayer = 'X';
    const gameBoard = ['', '', '', '', '', '', '', '', ''];
    const gameBoardContainer = document.getElementById('game-board');
    const resetButton = document.getElementById('reset-button');
    const gameStatus = document.getElementById('game-status');

    const createBoard = () => {
        gameBoardContainer.innerHTML = '';
        for (let i = 0; i < gameBoard.length; i++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.innerText = gameBoard[i];
            cell.addEventListener('click', handleCellClick);
            gameBoardContainer.appendChild(cell);
        }
    };

    const handleCellClick = (event) => {
        const clickedCell = event.target;
        if (!clickedCell.classList.contains('cell')) return; // Ignore clicks outside cells

        const cellIndex = Array.from(clickedCell.parentNode.children).indexOf(clickedCell);
        if (gameBoard[cellIndex] !== '') return; // Ignore clicks on occupied cells

        gameBoard[cellIndex] = currentPlayer;
        clickedCell.innerText = currentPlayer;

        const winner = checkWinner(gameBoard);
        if (winner) {
            gameStatus.innerText = `Player ${winner} Wins!`;
            gameBoardContainer.removeEventListener('click', handleCellClick); // Disable further clicks
            resetButton.disabled = false; // Enable reset button
            return;
        }

        if (isDraw(gameBoard)) {
            gameStatus.innerText = `It's a Draw!`;
            resetButton.disabled = false; // Enable reset button
            return;
        }

        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        gameStatus.innerText = `Player ${currentPlayer}'s turn`;
    };

    const resetGame = () => {
        currentPlayer = 'X';
        gameBoard.fill('');
        gameStatus.innerText = 'New Game!';
        Array.from(gameBoardContainer.children).forEach(cell => cell.innerText = '');
        gameBoardContainer.addEventListener('click', handleCellClick); // Re-enable cell clicks
        resetButton.disabled = true; // Disable reset button until game ends again
    };

    const checkWinner = (board) => {
        const winningCombinations = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
            [0, 4, 8], [2, 4, 6] // diagonals
        ];

        for (let combo of winningCombinations) {
            const [a, b, c] = combo;
            if (board[a] !== '' && board[a] === board[b] && board[a] === board[c]) {
                return board[a]; // Return the winning player ('X' or 'O')
            }
        }

        return null; // Return null if no winner
    };

    const isDraw = (board) => {
        return board.every(cell => cell !== ''); // Check if all cells are filled
    };

    createBoard();
    resetButton.addEventListener('click', resetGame);
    resetButton.disabled = true; // Initially disable reset button
});
