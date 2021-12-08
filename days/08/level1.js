const T = require('taninsam');

module.exports = function(input) {
  return T.chain(input)
    .chain(T.map(({ outputs }) => outputs))
    .chain(T.flat())
    .chain(T.map(out => out.length))
    .chain(T.filter(n => [2, 3, 4, 7].includes(n)))
    .chain(T.length())
    .value();
};
