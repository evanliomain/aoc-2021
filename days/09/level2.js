const T = require('taninsam');
const {
  mapMatrix,
  atMatrix,
  inMatrix,
  printMatrix,
  printMatrixToFile
} = require('../../tools');
const chalk = require('chalk');

const colorsHEX = [
  '#a6cee3',
  '#1f78b4',
  '#b2df8a',
  '#33a02c',
  '#fb9a99',
  '#e31a1c',
  '#fdbf6f',
  '#ff7f00',
  '#cab2d6',
  '#6a3d9a',
  '#ffff99',
  '#b15928'
];

const colors = [
  'red',
  'blue',
  'yellow',
  'green',
  'magenta',
  'cyan',
  'white',
  'redBright',
  'greenBright',
  'yellowBright',
  'blueBright',
  'magentaBright',
  'cyanBright',
  'whiteBright'
];

module.exports = function(input) {
  const points = new Map();
  const at = atMatrix(input);
  const getNeighboors = getNeighboorsOf(input);
  T.chain(input)
    .chain(
      mapMatrix((cell, x, y) => {
        // low points detection
        const neighboor1 = input[y]?.[x + 1];
        const neighboor2 = input[y]?.[x - 1];
        const neighboor3 = input[y + 1]?.[x];
        const neighboor4 = input[y - 1]?.[x];

        if (!T.isNil(neighboor1) && neighboor1 <= cell) {
          return cell;
        }
        if (!T.isNil(neighboor2) && neighboor2 <= cell) {
          return cell;
        }
        if (!T.isNil(neighboor3) && neighboor3 <= cell) {
          return cell;
        }
        if (!T.isNil(neighboor4) && neighboor4 <= cell) {
          return cell;
        }
        // It's a low point
        points.set(toId({ x, y }), {
          marked: true,
          basin: toId({ x, y }),
          x,
          y
        });
        return cell;
      })
    )
    .value();

  for (const [key, { marked, basin, x, y }] of points) {
    if (!marked) {
      continue;
    }
    const value = at({ x, y });
    const neighboors = getNeighboors({ x, y });

    neighboors.forEach(neighboor => {
      if (points.has(toId(neighboor))) {
        // Pas besoin d'ajouter un point déjà connu
        return;
      }
      const neighboorValue = at(neighboor);
      if (9 === neighboorValue) {
        return;
      }
      if (value <= neighboorValue) {
        points.set(toId(neighboor), { marked: true, basin, ...neighboor });
      }
    });
    points.set(key, { marked: false, basin, x, y });
  }

  const basins = new Map();
  const basinsColor = new Map();
  const basinsSet = new Set();

  for (const [key, { marked, basin, x, y }] of points) {
    basinsSet.add(basin);
    if (!basins.has(basin)) {
      basins.set(basin, [{ x, y }]);
    } else {
      basins.get(basin).push({ x, y });
    }
  }

  let i = 0;
  const all = [];
  for (const basin of basinsSet) {
    basinsColor.set(basin, {
      color: colors[i % colors.length],
      hex: colorsHEX[i % colorsHEX.length]
    });
    all.push(basins.get(basin).length);
    i++;
  }

  // Pour afficher tous les basins colorés dans un fichier
  // printToFile(points, basinsColor)('day_8', 2)(input);

  return T.chain(all)
    .chain(T.sortBy(x => -1 * x))
    .chain(T.take(3))
    .chain(([_1, _2, _3]) => _1 * _2 * _3)
    .value();
};

function toId({ x, y }) {
  return `${x},${y}`;
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
    return neighboors;
  };
}

function print(points, basinsColor) {
  return printMatrix((cell, x, y) => {
    if (points.has(toId({ x, y }))) {
      return chalk[basinsColor.get(points.get(toId({ x, y })).basin).color](
        cell
      );
    }
    return chalk.grey(cell);
  });
}

function printToFile(points, basinsColor) {
  return printMatrixToFile((cell, x, y) => {
    if (points.has(toId({ x, y }))) {
      return basinsColor.get(points.get(toId({ x, y })).basin).hex;
    }
    return 'black';
  });
}
