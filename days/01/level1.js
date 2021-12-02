const T = require('taninsam');
const { lag } = require('../../tools');

module.exports = function(input) {
  return T.chain(input)
    .chain(lag((a, b) => a - b))
    .chain(T.filter(x => x < 0))
    .chain(T.length())
    .value();
};
