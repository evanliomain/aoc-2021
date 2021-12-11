const T = require('taninsam');
const { parseNumber, mapMatrix } = require('../../tools');

module.exports = function(input) {
  return T.chain(input)
    .chain(T.map(T.split()))
    .chain(mapMatrix(parseNumber()))
    .value();
};
