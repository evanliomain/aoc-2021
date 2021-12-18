const T = require('taninsam');
const { print } = require('./print');

function split(pair) {
  if (T.isNumber(pair) && 10 <= pair) {
    const left = pair >> 1;
    return [left, pair - left];
  }
  if (T.isNumber(pair)) {
    return pair;
  }
  const [left, right] = pair;
  const sleft = split(left);

  if (print(left) !== print(sleft)) {
    // A split happen, end here
    return [sleft, right];
  }

  return [left, split(right)];
}

exports.split = split;
