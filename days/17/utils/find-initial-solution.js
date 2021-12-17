const { onePositionReachTarget } = require('./one-position-reach-target');
const { printPosition } = require('./print-position');
const { shotTo } = require('./shot-to');
const { top } = require('./top');

/**
 * With vy = 1, find the minimum vx that reach the target
 */
function findInitialSolution({ xmin, xmax, ymin, ymax }) {
  const shot = shotTo({ xmin, xmax, ymin, ymax });
  const reachTarget = onePositionReachTarget({ xmin, xmax, ymin, ymax });
  const print = printPosition({ xmin, xmax, ymin, ymax });

  // Search x
  let { vx, vy } = { vx: 2, vy: 1 };

  let positions = shot({ vx, vy });
  while (!reachTarget(positions)) {
    vx++;
    positions = shot({ vx, vy });
  }
  const t = top(positions);
  return { vx, vy, t, positions };
}
exports.findInitialSolution = findInitialSolution;
