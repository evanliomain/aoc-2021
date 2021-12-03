const T = require('taninsam');

module.exports = function(input) {
  return T.chain(input)
    .chain(
      T.reduce(
        (acc, bits) =>
          acc.map((ac, i) => ({
            0: ac[0] + (0 === bits[i] ? 1 : 0),
            1: ac[1] + (1 === bits[i] ? 1 : 0)
          })),
        T.arrayFromValue(input[0].length)({ 0: 0, 1: 0 })
      )
    )
    .chain(T.map(nb => (nb[0] < nb[1] ? 1 : 0)))
    .chain(n => ({ gammaRate: n, epsilonRate: n.map(x => 1 - x) }))
    .chain(({ gammaRate, epsilonRate }) => ({
      gammaRate: gammaRate.join(''),
      epsilonRate: epsilonRate.join('')
    }))
    .chain(({ gammaRate, epsilonRate }) => ({
      gammaRate: parseInt(gammaRate, 2),
      epsilonRate: parseInt(epsilonRate, 2)
    }))
    .chain(({ gammaRate, epsilonRate }) => gammaRate * epsilonRate)
    .value();
};
