const { isWinner } = require('./is-winner');

function hasWinnerIndex(boards) {
  for (let b = 0; b < boards.length; b++) {
    const board = boards[b];
    if (isWinner(board)) {
      return b;
    }
  }
  return false;
}
exports.hasWinnerIndex = hasWinnerIndex;
