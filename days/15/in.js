const T = require('taninsam');
const { mapMatrix, parseNumber } = require('../../tools');

module.exports = function(input) {
  return T.chain(input)
    .chain(T.map(T.split('')))
    .chain(mapMatrix(parseNumber()))
    .value();
};
