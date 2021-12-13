const T = require('taninsam');
const { captureGroups, parseNumber } = require('../../tools');

module.exports = function(input) {
  return T.chain(input)
    .chain(
      T.reduce(
        ({ points, fold }, line) =>
          line.startsWith('fold')
            ? { points, fold: [...fold, line] }
            : { points: points.add(line), fold },
        { points: new Set(), fold: [] }
      )
    )
    .chain(({ points, fold }) => ({
      points,
      fold: fold
        .map(captureGroups(/fold along (?<axe>x|y)=(?<value>\d+)/))
        .map(({ axe, value }) => ({ axe, value: parseNumber()(value) }))
    }))
    .value();
};
