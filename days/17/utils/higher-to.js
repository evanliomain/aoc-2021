const { onePositionReachTarget } = require('./one-position-reach-target');
const { shotTo } = require('./shot-to');
const { top } = require('./top');

function higherTo({ xmin, xmax, ymin, ymax }) {
  const shot = shotTo({ xmin, xmax, ymin, ymax });
  const reachTarget = onePositionReachTarget({ xmin, xmax, ymin, ymax });

  return ({ vx, vy }) => {
    for (let dy = 1; dy < 20; dy++) {
      for (let dx = -1; dx < 1; dx++) {
        const p = shot({ vy: vy + dy, vx: vx + dx });
        if (reachTarget(p)) {
          return { vy: vy + dy, vx: vx + dx, t: top(p), positions: p };
        }
      }
    }
    return undefined;
  };
}
exports.higherTo = higherTo;
