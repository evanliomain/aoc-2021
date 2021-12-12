const T = require('taninsam');
const { equal } = require('../../../tools');
const { addSmallCave } = require('./add-small-cave');
const { isUnvisitedSmallCave } = require('./is-unvisited-small-cave');
const { partialFlat } = require('./partial-flat');

function constructPath(caveMap, { path, smallCaves, visitedTwice }) {
  const lastCave = path[path.length - 1];

  if ('end' === lastCave) {
    return { path, smallCaves };
  }

  return T.chain(caveMap.get(lastCave))
    .chain(T.filter(T.not(equal('start'))))
    .chain(
      T.filter(cave => isUnvisitedSmallCave(cave, smallCaves) || !visitedTwice)
    )
    .chain(
      T.map(cave => ({
        path: [...path, cave],
        smallCaves: addSmallCave(cave, smallCaves),
        visitedTwice: visitedTwice
          ? visitedTwice
          : !isUnvisitedSmallCave(cave, smallCaves)
      }))
    )
    .chain(T.map(n => constructPath(caveMap, n)))
    .chain(T.filter(T.not(T.isEmpty)))
    .chain(T.reduce(partialFlat, []))
    .value();
}
exports.constructPath = constructPath;
