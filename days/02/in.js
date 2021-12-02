const T = require('taninsam');
const { parseLinesWithRegexp } = require('../../tools');

module.exports = function(input) {
  return T.chain(input)
    .chain(parseLinesWithRegexp(/^(?<command>\w*) (?<unit>\d*)$/))
    .value();
};
