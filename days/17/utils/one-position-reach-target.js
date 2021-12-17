const T = require('taninsam');
const { isInTargetArea } = require('./is-in-target-area');

function onePositionReachTarget({ xmin, xmax, ymin, ymax }) {
  return positions =>
    T.chain(positions)
      .chain(T.some(isInTargetArea({ xmin, xmax, ymin, ymax })))
      .value();
}
exports.onePositionReachTarget = onePositionReachTarget;
