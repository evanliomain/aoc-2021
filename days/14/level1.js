const T = require('taninsam');
const { lag } = require('../../tools');

module.exports = function({ polymerTemplate, pairInsertion }) {
  const step = stepOf(pairInsertion);

  return T.chain(polymerTemplate)
    .chain(T.loopFor(10, step))
    .chain(score)
    .value();
};

function stepOf(pairInsertion) {
  return polymer =>
    T.chain(polymer)
      .chain(lag((a, b) => [a, pairInsertion[`${a}${b}`]]))
      .chain(T.flat())
      .chain(T.push(polymer[polymer.length - 1]))
      .value();
}
function score(polymer) {
  const polymerOccurence = T.chain(polymer)
    .chain(
      T.reduce((acc, nuc) => {
        if (T.isNil(acc[nuc])) {
          acc[nuc] = 1;
        } else {
          acc[nuc]++;
        }
        return acc;
      }, {})
    )
    .chain(T.entries())
    .value();

  const min = T.minBy(([_, occurence]) => occurence)(polymerOccurence);
  const max = T.maxBy(([_, occurence]) => occurence)(polymerOccurence);
  return max[1] - min[1];
}
