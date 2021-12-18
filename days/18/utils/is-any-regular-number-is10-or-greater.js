const T = require('taninsam');

/**
 * If any regular number is 10 or greater, the leftmost such regular number splits
 */
function isAnyRegularNumberIs10OrGreater(pair) {
  if (T.isNumber(pair)) {
    return 10 <= pair;
  }
  const [left, right] = pair;
  return (
    isAnyRegularNumberIs10OrGreater(left) ||
    isAnyRegularNumberIs10OrGreater(right)
  );
}
exports.isAnyRegularNumberIs10OrGreater = isAnyRegularNumberIs10OrGreater;
