const board = document.querySelector('.board');
const cells = document.querySelectorAll('.cell');
const statusText = document.querySelector('.status');
const restartButton = document.getElementById('restart');
const moveSound = document.getElementById('moveSound');

let currentPlayer = 'X';
let gameActive = true;
let gameState = ['', '', '', '', '', '', '', '', ''];

// Winning conditions
const winningConditions = [
  [0, 1, 2], // Top row
  [3, 4, 5], // Middle row
  [6, 7, 8], // Bottom row
  [0, 3, 6], // Left column
  [1, 4, 7], // Middle column
  [2, 5, 8], // Right column
  [0, 4, 8], // Diagonal
  [2, 4, 6]  // Diagonal
];

// Handle cell click
function handleCellClick(event) {
  const clickedCell = event.target;
  const clickedCellIndex = parseInt(clickedCell.getAttribute('data-index'));

  if (gameState[clickedCellIndex] !== '' || !gameActive) return;

  gameState[clickedCellIndex] = currentPlayer;
  clickedCell.classList.add(currentPlayer.toLowerCase());
  moveSound.play();

  if (checkWin()) {
    endGame(false);
    return;
  }

  if (checkDraw()) {
    endGame(true);
    return;
  }

  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  statusText.textContent = `It's ${currentPlayer}'s turn`;
}

// Check for a win
function checkWin() {
  for (let condition of winningConditions) {
    const [a, b, c] = condition;
    if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
      highlightWinningCells(condition);
      return true;
    }
  }
  return false;
}

// Highlight winning cells
function highlightWinningCells(cells) {
  cells.forEach(index => {
    document.querySelector(`.cell[data-index="${index}"]`).classList.add('winning-cell');
  });
}

// Check for a draw
function checkDraw() {
  return !gameState.includes('');
}

// End the game
function endGame(isDraw) {
  gameActive = false;
  if (isDraw) {
    statusText.textContent = 'Draw!';
  } else {
    statusText.textContent = `Player ${currentPlayer} wins!`;
  }
}

// Restart the game
function restartGame() {
  gameState = ['', '', '', '', '', '', '', '', ''];
  gameActive = true;
  currentPlayer = 'X';
  statusText.textContent = `It's ${currentPlayer}'s turn`;
  cells.forEach(cell => {
    cell.classList.remove('x', 'o', 'winning-cell');
  });
}

// Event listeners
cells.forEach(cell => cell.addEventListener('click', handleCellClick));
restartButton.addEventListener('click', restartGame);

// Initial status
statusText.textContent = `It's ${currentPlayer}'s turn`;