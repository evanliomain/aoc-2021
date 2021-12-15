const T = require('taninsam');
const { lowestPathCost } = require('./lowest-path-cost');
const { makeMatrix } = require('../../tools');

module.exports = function(input) {
  return T.chain(input)
    .chain(makeBigCave)
    .chain(lowestPathCost)
    .value();
};

function makeBigCave(input) {
  const [sizeY, sizeX] = [input[0].length, input.length];
  return makeMatrix((x, y) =>
    reset(
      Math.floor(y / sizeY) +
        Math.floor(x / sizeX) +
        input[y % sizeY][x % sizeX]
    )
  )({
    sizeY: 5 * sizeY,
    sizeX: 5 * sizeX
  });
}
function reset(n) {
  return 1 + ((n - 1) % 9);
}
