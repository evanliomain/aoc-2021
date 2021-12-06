const T = require('taninsam');
const { day } = require('./utils/day');

module.exports = function(input) {
  return T.chain(input)
    .chain(T.loopFor(80, day))
    .chain(T.length())
    .value();
};
