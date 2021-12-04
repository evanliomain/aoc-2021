const T = require('taninsam');

function filterUnmark(board) {
  return T.chain(board)
    .chain(T.map(T.filter(({ marked }) => !marked)))
    .chain(T.flat())
    .value();
}
exports.filterUnmark = filterUnmark;
