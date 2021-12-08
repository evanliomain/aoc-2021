const T = require('taninsam');

module.exports = function(input) {
  return T.chain(input)
    .chain(T.map(T.split(' | ')))
    .chain(
      T.map(([signals, outputs]) => ({
        signals: signals.split(' '),
        outputs: outputs.split(' ')
      }))
    )
    .chain(
      T.map(({ signals, outputs }) => ({
        signals: T.chain(signals)
          .chain(T.map(T.split()))
          .chain(T.map(T.sort()))
          .value(),
        outputs: T.chain(outputs)
          .chain(T.map(T.split()))
          .chain(T.map(T.sort()))
          .value()
      }))
    )
    .value();
};
