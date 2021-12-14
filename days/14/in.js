const T = require('taninsam');

module.exports = function(input) {
  const head = input.shift();
  return {
    polymerTemplate: head.split(''),
    pairInsertion: T.chain(input)
      .chain(T.map(T.split(' -> ')))
      .chain(T.fromEntries())
      .value()
  };
};
