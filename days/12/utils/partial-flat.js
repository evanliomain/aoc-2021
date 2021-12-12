const T = require('taninsam');

function partialFlat(a, b) {
  return T.isArray(b) ? [...a, ...b] : [...a, b];
}
exports.partialFlat = partialFlat;
