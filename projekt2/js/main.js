const boardSize = 10;
const shipCount = 5;
const shipLengths = [5, 4, 3, 3, 2];

const board = [];
for (let i = 0; i < boardSize; i++) {
  board.push(new Array(boardSize).fill(0));
}


function placeShips() {
  let shipsPlaced = 0;

  while (shipsPlaced < shipCount) {
    const shipLength = shipLengths[shipsPlaced];
    const orientation = Math.random() < 0.5 ? 'horizontal' : 'vertical';

    let row, col;
    if (orientation === 'horizontal') {
      row = Math.floor(Math.random() * boardSize);
      col = Math.floor(Math.random() * (boardSize - shipLength + 1));
    } else {
      row = Math.floor(Math.random() * (boardSize - shipLength + 1));
      col = Math.floor(Math.random() * boardSize);
    }

    let validPlacement = true;
    for (let i = 0; i < shipLength; i++) {
      if (orientation === 'horizontal') {
        if (board[row][col + i] !== 0) {
          validPlacement = false;
          break;
        }
      } else {
        if (board[row + i][col] !== 0) {
          validPlacement = false;
          break;
        }
      }
    }

    if (validPlacement) {
      for (let i = 0; i < shipLength; i++) {
        if (orientation === 'horizontal') {
          board[row][col + i] = 1;
        } else {
          board[row + i][col] = 1;
        }
      }
      shipsPlaced++;
    }
  }
}


function isValidCoordinate(row, col) {
  return row >= 0 && row < boardSize && col >= 0 && col < boardSize;
}


function makeGuess(row, col) {
  if (!isValidCoordinate(row, col)) {
    console.log('Invalid coordinate!');
    return;
  }

  if (board[row][col] === 1) {
    console.log('Hit!');
    board[row][col] = 2;
    document.getElementById(`cell-${row}-${col}`).classList.add('hit');
  } else if (board[row][col] === 2) {
    console.log('You already hit that spot!');
  } else {
    console.log('Miss!');
    board[row][col] = 3;
    document.getElementById(`cell-${row}-${col}`).classList.add('miss');
  }
}


function isGameOver() {
  for (let row = 0; row < boardSize; row++) {
    for (let col = 0; col < boardSize; col++) {
      if (board[row][col] === 1) {
        return false;
      }
    }
  }
  return true;
}


function createBoard() {
  const boardContainer = document.getElementById('board');
  for (let row = 0; row < boardSize; row++) {
    for (let col = 0; col < boardSize; col++) {
      const cell = document.createElement('div');
      cell.id = `cell-${row}-${col}`;
      cell.addEventListener('click', () => makeGuess(row, col));
      boardContainer.appendChild(cell);
    }
  }
}


createBoard();
placeShips();