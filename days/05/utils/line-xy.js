const T = require('taninsam');
const { makeLine } = require('./make-line');

function lineXY(condition) {
  return input =>
    T.chain(input)
      .chain(T.filter(condition))
      .chain(T.map(makeLine))
      .chain(T.flat())
      .value();
}
exports.lineXY = lineXY;
