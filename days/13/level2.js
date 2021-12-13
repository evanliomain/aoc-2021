const { foldPoints } = require('./utils/fold-points');
const { toId } = require('./utils/to-id');
const { print } = require('./utils/print');
const { printMatrixToFile } = require('../../tools');

module.exports = function({ points, fold }) {
  let dim = { x: 1310, y: 894 };

  // Uncomment line to print points in a file

  fold.forEach((f, i) => {
    // printToFile(points, dim, i, f);
    dim[f.axe] = f.value;
    foldPoints(points, f);
  });
  // printToFile(points, dim, fold.length, {});
  return print(point => (points.has(toId(point)) ? '#' : ' '))(dim);
};

async function printToFile(points, dim, i, { axe, value }) {
  return await printMatrixToFile(point => {
    if (points.has(toId(point))) {
      return '#ffff66';
    }
    if (undefined !== axe && value === point[axe]) {
      return '#fff';
    }
    return '#0f0f23';
  })(
    `day_13/${String(i).padStart(2, '0')}`,
    4
  )({
    height: dim.y,
    width: dim.x
  });
}
