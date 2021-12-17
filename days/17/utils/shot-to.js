const { step } = require('./step');

function shotTo({ xmin, xmax, ymin, ymax }) {
  return ({ vy, vx }) => {
    let move = step({ vy, vx });
    let position = { x: 0, y: 0 };
    let n = 1;
    const positions = [position];
    while (ymin < position.y) {
      position = move({ ...position, n });
      positions.push(position);
      n++;
    }
    return positions;
  };
}
exports.shotTo = shotTo;
