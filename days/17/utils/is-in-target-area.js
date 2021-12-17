function isInTargetArea({ xmin, xmax, ymin, ymax }) {
  return ({ x, y }) => xmin <= x && x <= xmax && ymin <= y && y <= ymax;
}
exports.isInTargetArea = isInTargetArea;
