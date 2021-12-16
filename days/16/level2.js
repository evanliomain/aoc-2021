const T = require('taninsam');

module.exports = function(input) {
  return T.chain(input)
    .chain(evaluate)
    .value();
};

function evaluate(expression) {
  switch (expression.id) {
    case 4:
      return expression.value;
    case 0:
      return T.chain(expression.value)
        .chain(T.map(evaluate))
        .chain(T.sum())
        .value();
    case 1:
      return T.chain(expression.value)
        .chain(T.map(evaluate))
        .chain(T.reduce((a, b) => a * b, 1))
        .value();
    case 2:
      return T.chain(expression.value)
        .chain(T.map(evaluate))
        .chain(T.min())
        .value();
    case 3:
      return T.chain(expression.value)
        .chain(T.map(evaluate))
        .chain(T.max())
        .value();
    case 5:
      return T.chain(expression.value)
        .chain(T.map(evaluate))
        .chain(([first, second]) => (second < first ? 1 : 0))
        .value();
    case 6:
      return T.chain(expression.value)
        .chain(T.map(evaluate))
        .chain(([first, second]) => (first < second ? 1 : 0))
        .value();
    case 7:
      return T.chain(expression.value)
        .chain(T.map(evaluate))
        .chain(([first, second]) => (first === second ? 1 : 0))
        .value();
  }
  throw `Unknown operator ${expression.id}`;
}
