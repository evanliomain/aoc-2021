const T = require('taninsam');
const { markBoard } = require('./mark-board');

function mark(num) {
  return boards =>
    T.chain(boards)
      .chain(T.map(markBoard(num)))
      .value();
}
exports.mark = mark;
