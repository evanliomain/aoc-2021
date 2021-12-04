const { isWinner } = require('./is-winner');

function hasWinner(boards) {
  for (let b = 0; b < boards.length; b++) {
    const board = boards[b];
    if (isWinner(board)) {
      return board;
    }
  }
  return false;
}
exports.hasWinner = hasWinner;
