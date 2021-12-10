const T = require('taninsam');
const { isCorrupted } = require('./utils/is-corrupted');
const { score } = require('./utils/score');

module.exports = function(input) {
  return T.chain(input)
    .chain(T.map(isCorrupted))
    .chain(T.filter(x => x))
    .chain(T.sumBy(score))
    .value();
};
