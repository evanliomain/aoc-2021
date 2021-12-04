const { printMatrix } = require('../../../tools');
const chalk = require('chalk');

function printBoard(board) {
  return printMatrix(({ n, marked }) => {
    const s = String(n).padStart(3);
    if (marked) {
      return chalk.red(s);
    }
    return s;
  })(board);
}
exports.printBoard = printBoard;
