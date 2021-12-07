const T = require('taninsam');
const { computeMin } = require('./computeMin');

module.exports = function(points) {
  return computeMin(new Set(points), points);
};

function fuel(points, point) {
  return T.chain(points)
    .chain(T.sumBy(p => Math.abs(p - point)))
    .value();
}

function computeMin(pointsSet, allPoints) {
  const conso = [];
  pointsSet.forEach(point => {
    conso.push(fuel(allPoints, point));
  });
  return T.min()(conso);
}
