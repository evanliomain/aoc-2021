const T = require('taninsam');
const { add } = require('./utils/add');
const { magnitude } = require('./utils/magnitude');

module.exports = function(input) {
  const nbNumbers = input.length;
  let max = 0;
  for (let i = 0; i < nbNumbers; i++) {
    for (let j = i; j < nbNumbers; j++) {
      const m1 = magnitude(add(input[i], input[j]));
      const m2 = magnitude(add(input[j], input[i]));
      max = max < m1 ? m1 : max;
      max = max < m2 ? m2 : max;
    }
  }

  return max;
};
