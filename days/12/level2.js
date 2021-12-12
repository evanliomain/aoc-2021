const T = require('taninsam');
const { constructPath } = require('./utils/construct-path');

module.exports = function(caveMap) {
  return T.chain(
    constructPath(caveMap, {
      path: ['start'],
      smallCaves: {},
      visitedTwice: false
    })
  )
    .chain(T.length())
    .value();
};
