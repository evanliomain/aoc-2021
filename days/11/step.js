const T = require('taninsam');
const {
  mapMatrix,
  patternMatching,
  someMatrix,
  inMatrix
} = require('../../tools');

function step([zone, nbFlash]) {
  return (
    T.chain(zone)
      // First, the energy level of each octopus increases by 1.
      .chain(mapMatrix(cell => 1 + cell))
      .chain(T.loopWhile(shouldContinueToFlash(), increaseNeighboors))
      .chain(
        mapMatrix(
          patternMatching(
            [
              'x',
              () => {
                nbFlash++;
                return 0;
              }
            ],
            [x => x]
          )
        )
      )
      .chain(matrix => [matrix, nbFlash])
      .value()
  );
}

// increases the energy level of all adjacent octopuses by 1, including octopuses that are diagonally adjacent.
function increaseNeighboors(matrix) {
  const getNeighboors = getNeighboorsOf(matrix);
  for (let y = 0; y < matrix.length; y++) {
    const row = matrix[y];
    for (let x = 0; x < row.length; x++) {
      const cell = row[x];
      if ('x' === cell) {
        continue;
      }
      if (cell <= 9) {
        continue;
      }
      getNeighboors({ x, y }).forEach(neighboor => {
        if ('x' === matrix[neighboor.y][neighboor.x]) {
          return;
        }
        matrix[neighboor.y][neighboor.x]++;
      });
      matrix[y][x] = 'x';
    }
  }
  return matrix;
}
// Has cell with value greater than 9 ?
function shouldContinueToFlash() {
  return someMatrix(cell => 9 < cell);
}

function getNeighboorsOf(matrix) {
  const isIn = inMatrix(matrix);
  return ({ x, y }) => {
    const neighboors = [];
    if (isIn({ x: x - 1, y })) {
      neighboors.push({ x: x - 1, y });
    }
    if (isIn({ x: x + 1, y })) {
      neighboors.push({ x: x + 1, y });
    }
    if (isIn({ x, y: y - 1 })) {
      neighboors.push({ x, y: y - 1 });
    }
    if (isIn({ x, y: y + 1 })) {
      neighboors.push({ x, y: y + 1 });
    }
    if (isIn({ x: x - 1, y: y - 1 })) {
      neighboors.push({ x: x - 1, y: y - 1 });
    }
    if (isIn({ x: x + 1, y: y - 1 })) {
      neighboors.push({ x: x + 1, y: y - 1 });
    }
    if (isIn({ x: x - 1, y: y + 1 })) {
      neighboors.push({ x: x - 1, y: y + 1 });
    }
    if (isIn({ x: x + 1, y: y + 1 })) {
      neighboors.push({ x: x + 1, y: y + 1 });
    }
    return neighboors;
  };
}

exports.step = step;
