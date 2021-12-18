const T = require('taninsam');
const { add } = require('./utils/add');
const { magnitude } = require('./utils/magnitude');

module.exports = function(input) {
  return T.chain(input)
    .chain(T.reduce(add))
    .chain(magnitude)
    .value();
};
