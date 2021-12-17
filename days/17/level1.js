const { findInitialSolution } = require('./utils/find-initial-solution');
const { higherTo } = require('./utils/higher-to');
const { isInTargetArea } = require('./utils/is-in-target-area');
const { onePositionReachTarget } = require('./utils/one-position-reach-target');
const { printPosition } = require('./utils/print-position');
const { shotTo } = require('./utils/shot-to');
const { top } = require('./utils/top');

module.exports = function({ xmin, xmax, ymin, ymax }) {
  return smarter({ xmin, xmax, ymin, ymax });

  // Also work
  // return brutForce({ xmin, xmax, ymin, ymax });
};

function smarter({ xmin, xmax, ymin, ymax }) {
  const higher = higherTo({ xmin, xmax, ymin, ymax });

  let h = findInitialSolution({ xmin, xmax, ymin, ymax });
  let hOld;

  do {
    hOld = h;
    h = higher(h);
  } while (undefined !== h);

  return hOld.t;
}

function brutForce({ xmin, xmax, ymin, ymax }) {
  const reachTarget = onePositionReachTarget({ xmin, xmax, ymin, ymax });
  const print = printPosition({ xmin, xmax, ymin, ymax });
  const shot = shotTo({ xmin, xmax, ymin, ymax });

  let max = { t: 0 };
  for (let vx = 0; vx < 30; vx++) {
    for (let vy = 0; vy < 100; vy++) {
      const positions = shot({ vx, vy });
      const t = top(positions);
      if (reachTarget(positions) && max.t < t) {
        max = { t, vx, vy, positions };
      }
    }
  }
  console.log(max.vx, max.vy, `T: ${max.t}`);
  console.log(print(max.positions));

  return max.t;
}
