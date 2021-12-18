const T = require('taninsam');

function magnitude(list) {
  if (T.isNumber(list)) {
    return list;
  }
  const [left, right] = list;
  return 3 * magnitude(left) + 2 * magnitude(right);
}

exports.magnitude = magnitude;
