export const checkWinner: (board: any, size: number) => string = (
  board: any,
  size: number
) => {
  // row check
  for (let i = 0; i < size; i++) {
    let symbol = board[i][0];
    if (!symbol) {
      continue;
    }
    let winner = true;
    for (let j = 0; j < size; j++) {
      if (board[i][j] !== symbol) {
        winner = false;
        break;
      }
    }
    if (winner) {
      return symbol;
    }
  }

  // col check
  for (let j = 0; j < size; j++) {
    let symbol = board[0][j];
    if (!symbol) {
      continue;
    }
    let winner = true;
    for (let i = 0; i < size; i++) {
      if (board[i][j] !== symbol) {
        winner = false;
        break;
      }
    }
    if (winner) {
      return symbol;
    }
  }

  // diagonal check
  let i = 0,
    j = 0;
  let symbol = board[i][j];
  let winner = true;
  if (symbol) {
    while (i < size && j < size) {
      if (board[i][j] !== symbol) {
        winner = false;
        break;
      }
      i++;
      j++;
    }
    if (winner) {
      return symbol;
    }
  }

  // check in anti-diagonal
  (i = 0), (j = size - 1);
  symbol = board[i][j];
  winner = true;
  if (symbol) {
    while (i < size && j < size) {
      if (board[i][j] !== symbol) {
        winner = false;
        break;
      }
      i++;
      j--;
    }
    if (winner) {
      return symbol;
    }
  }

  let counter = 0;
  for(let i = 0 ; i < size; i++){
    for(let j = 0 ; j < size; j++){
      if(board[i][j]){
        counter++;
      }
    }
  }

  return ( counter === (size*size) ? 'draw' : '' );
};
