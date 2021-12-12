const T = require('taninsam');
const { isSmallCave } = require('./is-small-cave');

function isUnvisitedSmallCave(cave, smallCaves) {
  return !isSmallCave(cave) || T.isNil(smallCaves[cave]);
}
exports.isUnvisitedSmallCave = isUnvisitedSmallCave;
