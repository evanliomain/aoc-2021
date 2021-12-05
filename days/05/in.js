const T = require('taninsam');
const { parseLinesWithRegexp } = require('../../tools');

module.exports = function(input) {
  return T.chain(input)
    .chain(
      parseLinesWithRegexp(/^(?<x1>\d*),(?<y1>\d*) -> (?<x2>\d*),(?<y2>\d*)$/)
    )
    .value();
};
