const T = require('taninsam');
const { step } = require('./step');
const { equal, everyMatrix } = require('../../tools');

module.exports = function(input) {
  let nbStep = 0;

  return T.chain([input, 0])
    .chain(
      T.loopWhile(T.not(everyMatrix(equal(0))), matrix => {
        const [newMatrix] = step([matrix, 0]);
        nbStep++;
        return newMatrix;
      })
    )
    .chain(() => nbStep)
    .value();
};
