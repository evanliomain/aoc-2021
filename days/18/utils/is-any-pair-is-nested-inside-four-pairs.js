const T = require('taninsam');

/**
 * If any pair is nested inside four pairs, the leftmost such pair explodes
 */
function isAnyPairIsNestedInsideFourPairs(depth, pair) {
  if (T.isNumber(pair)) {
    return false;
  }
  if (4 === depth) {
    return true;
  }
  if (!T.isArray(pair)) {
    throw `Qu'es-ce que c'est ? ${pair}`;
  }
  const [left, right] = pair;
  return (
    isAnyPairIsNestedInsideFourPairs(1 + depth, left) ||
    isAnyPairIsNestedInsideFourPairs(1 + depth, right)
  );
}
exports.isAnyPairIsNestedInsideFourPairs = isAnyPairIsNestedInsideFourPairs;
