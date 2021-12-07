const T = require('taninsam');

module.exports = function(points) {
  return computeMin(points);
};

function fuel(points, point) {
  const f = T.chain(points)
    .chain(T.map(p => Math.abs(p - point)))
    .chain(T.map(n => (n * (n + 1)) / 2))
    .chain(T.sum())
    .value();
  return f;
}

function computeMin(points) {
  const min = points[0];
  const max = points[points.length - 1];
  const conso = [];

  for (let i = min; i < max; i++) {
    conso.push(fuel(points, i));
  }
  return T.min()(conso);
}
