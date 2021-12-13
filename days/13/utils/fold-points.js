const { fromId } = require('./from-id');
const { toId } = require('./to-id');

function foldPoints(points, { axe, value }) {
  const f = foldPoint({ axe, value });
  for (const pointId of points.keys()) {
    const point = fromId(pointId);
    if (point[axe] < value) {
      continue;
    }
    points.delete(pointId);
    points.add(toId(f(point)));
  }
  return points;
}
function foldPoint({ axe, value }) {
  return point => ({ ...point, [axe]: 2 * value - point[axe] });
}

exports.foldPoints = foldPoints;
