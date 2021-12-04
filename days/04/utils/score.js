const T = require('taninsam');
const { filterUnmark } = require('./filter-unmark');

function score(winner, lastNumber) {
  return T.chain(winner)
    .chain(filterUnmark)
    .chain(T.map(({ n }) => n))
    .chain(T.sum())
    .chain(n => n * lastNumber)
    .value();
}
exports.score = score;
