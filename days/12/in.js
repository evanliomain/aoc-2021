const T = require('taninsam');

module.exports = function(input) {
  const caveMap = new Map();
  return T.chain(input)
    .chain(T.map(T.split('-')))
    .chain(
      T.map(([left, right]) => {
        addTo(caveMap, left, right);
        addTo(caveMap, right, left);
      })
    )
    .chain(() => caveMap)
    .value();
};
function addTo(caveMap, key, value) {
  if (caveMap.has(key)) {
    caveMap.set(key, [...caveMap.get(key), value]);
  } else {
    caveMap.set(key, [value]);
  }
}
