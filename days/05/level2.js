const { countDoublon } = require('./utils/count-doublon');
const { lineXY } = require('./utils/line-xy');

module.exports = function(input) {
  return countDoublon([
    // Horizontal
    ...lineXY(({ y1, y2 }) => y1 === y2)(input),
    // Vertical
    ...lineXY(({ x1, x2 }) => x1 === x2)(input),
    // Diagonal
    ...lineXY(({ x1, y1, x2, y2 }) => Math.abs(x1 - x2) === Math.abs(y1 - y2))(
      input
    )
  ]);
};
