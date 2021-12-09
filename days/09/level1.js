const T = require('taninsam');
const { mapMatrix, equal, printMatrix } = require('../../tools');

module.exports = function(input) {
  return T.chain(input)
    .chain(
      mapMatrix((cell, x, y) => {
        const neighboor1 = input[y]?.[x + 1];
        const neighboor2 = input[y]?.[x - 1];
        const neighboor3 = input[y + 1]?.[x];
        const neighboor4 = input[y - 1]?.[x];

        if (!T.isNil(neighboor1) && neighboor1 <= cell) {
          return 'x';
        }
        if (!T.isNil(neighboor2) && neighboor2 <= cell) {
          return 'x';
        }
        if (!T.isNil(neighboor3) && neighboor3 <= cell) {
          return 'x';
        }
        if (!T.isNil(neighboor4) && neighboor4 <= cell) {
          return 'x';
        }
        return cell;
      })
    )
    .chain(T.flat())
    .chain(T.filter(T.not(equal('x'))))
    .chain(T.sumBy(x => 1 + x))
    .value();
};

//too high 1397
