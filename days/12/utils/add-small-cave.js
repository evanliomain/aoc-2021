const { isSmallCave } = require('./is-small-cave');

function addSmallCave(cave, smallCaves) {
  return isSmallCave(cave) ? { ...smallCaves, [cave]: true } : smallCaves;
}
exports.addSmallCave = addSmallCave;
