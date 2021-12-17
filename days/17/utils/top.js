const T = require('taninsam');

function top(positions) {
  return T.chain(positions)
    .chain(T.map(({ y }) => y))
    .chain(T.max())
    .value();
}
exports.top = top;
