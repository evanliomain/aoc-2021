const T = require('taninsam');
const { parseNumber, mapMatrix } = require('../../tools');

module.exports = function(input) {
  const randomNumbers = T.chain(input.shift())
    .chain(T.split(','))
    .chain(T.map(parseNumber()))
    .value();

  const boards = T.chain(input)
    .chain(T.map(line => line.trim()))
    .chain(T.map(T.split(' ')))
    .chain(T.map(T.map(parseNumber())))
    .chain(
      T.reduce((acc, line, index) => {
        if (0 === index % 5) {
          // New board
          acc.push([line]);
        } else {
          // Push to last board
          acc[acc.length - 1].push(line);
        }
        return acc;
      }, [])
    )
    .chain(T.map(mapMatrix(n => ({ n, marked: false }))))
    .value();

  return { randomNumbers, boards };
};
