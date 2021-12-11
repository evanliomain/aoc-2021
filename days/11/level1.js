const T = require('taninsam');
const { step } = require('./step');

module.exports = function(input) {
  return T.chain([input, 0])
    .chain(T.loopFor(100, step))
    .chain(([_, nbFlash]) => nbFlash)
    .value();
};
