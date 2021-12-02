const T = require('taninsam');
const { lag } = require('../../tools');

module.exports = function(input) {
  return T.chain(input)
    .chain(lag3((a, b, c) => a + b + c))
    .chain(lag((a, b) => a - b))
    .chain(T.filter(x => x < 0))
    .chain(T.length())
    .value();
};

function lag3(iteratee) {
  return array => {
    if (!Array.isArray(array)) {
      throw new Exception('Attempt to use lag on a non array ' + typeof array);
    }
    if (0 === array.length || 1 === array.length || 2 === array.length) {
      return [];
    }
    const stop = array.length - 2;
    const result = [];
    for (let i = 0; i < stop; i++) {
      let j = i + 1;
      let k = i + 2;
      result.push(iteratee(array[i], array[j], array[k], i, j, k, array));
    }
    return result;
  };
}
