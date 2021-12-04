const { mapMatrix } = require('../../../tools');

function markBoard(num) {
  return mapMatrix(({ n, marked }) =>
    num === n ? { n, marked: true } : { n, marked }
  );
}
exports.markBoard = markBoard;
