const { findInitialSolution } = require('./utils/find-initial-solution');
const { top } = require('./utils/top');
const { onePositionReachTarget } = require('./utils/one-position-reach-target');
const { shotTo } = require('./utils/shot-to');
const { gradient, makeMatrix, printMatrixToFile } = require('../../tools');

module.exports = function({ xmin, xmax, ymin, ymax }) {
  const reachTarget = onePositionReachTarget({ xmin, xmax, ymin, ymax });
  const shot = shotTo({ xmin, xmax, ymin, ymax });

  let { vx: vxMinInit } = findInitialSolution({ xmin, xmax, ymin, ymax });

  let count = 0;
  const matchVelocities = {};
  let vxMin = 500;
  let vxMax = -500;
  let vyMin = 500;
  let vyMax = -500;
  let tmax = 0;
  let tmin = 0;
  for (let vx = vxMinInit - 1; vx < 300; vx++) {
    for (let vy = -100; vy < 100; vy++) {
      const positions = shot({ vx, vy });
      if (reachTarget(positions)) {
        count++;
        const t = top(positions);
        matchVelocities[`${vx},${vy}`] = t;
        vxMin = vx < vxMin ? vx : vxMin;
        vxMax = vxMax < vx ? vx : vxMax;
        vyMax = vyMax < vy ? vy : vyMax;
        vyMin = vy < vyMin ? vy : vyMin;
        tmax = tmax < t ? t : tmax;
        tmin = t < tmin ? t : tmin;
      }
    }
  }

  const sizeX = vxMax - vxMin + 1;
  const sizeY = vyMax - vyMin + 1;
  printMatrixToFile((cell, x, y) => {
    if (undefined === cell) {
      return '#0f0f23';
    }

    if (1 <= cell) {
      return gradient()(tmax, cell);
    }
    return '#ffffff';
  })('day_17')(
    makeMatrix((x, y) => {
      const rx = x + vxMin;
      const ry = y + vyMin;
      return matchVelocities[`${rx},${ry}`];
    })({ sizeX, sizeY })
  );

  return count;
};
