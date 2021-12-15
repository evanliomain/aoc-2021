const T = require('taninsam');
const { inMatrix, atMatrix, reduceMatrix } = require('../../tools');
const Graph = require('node-dijkstra');

// js-shortest-path
// @algorithm.ts/dijkstra
// js-graph-algorithms

function lowestPathCost(input) {
  const startPoint = '0,0';
  const endPoint = `${input[0].length - 1},${input.length - 1}`;
  const getNeighboors = getNeighboorsOf(input);
  return T.chain(input)
    .chain(
      reduceMatrix((acc, _, x, y) => {
        acc[toId({ x, y })] = getNeighboors({ x, y });
        return acc;
      }, {})
    )
    .chain(nodes => new Graph(nodes))
    .chain(route => route.path(startPoint, endPoint, { cost: true }))
    .chain(({ cost }) => cost)
    .value();
}
function getNeighboorsOf(matrix) {
  const isIn = inMatrix(matrix);
  const node = nodeAt(matrix);
  return ({ x, y }) => {
    const neighboors = [];
    if (isIn({ x: x - 1, y })) {
      neighboors.push(node({ x: x - 1, y }));
    }
    if (isIn({ x: x + 1, y })) {
      neighboors.push(node({ x: x + 1, y }));
    }
    if (isIn({ x, y: y - 1 })) {
      neighboors.push(node({ x, y: y - 1 }));
    }
    if (isIn({ x, y: y + 1 })) {
      neighboors.push(node({ x, y: y + 1 }));
    }
    return T.fromEntries()(neighboors);
  };
}
function nodeAt(matrix) {
  const at = atMatrix(matrix);
  return ({ x, y }) => [toId({ x, y }), at({ x, y })];
}
function toId({ x, y }) {
  return `${x},${y}`;
}

exports.lowestPathCost = lowestPathCost;
