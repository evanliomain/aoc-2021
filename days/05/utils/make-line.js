function makeLine({ x1, y1, x2, y2 }) {
  const result = [];
  const vx = Math.sign(x1 - x2);
  const vy = Math.sign(y2 - y1);

  const len = Math.max(Math.abs(x1 - x2), Math.abs(y1 - y2));

  for (let i = 0; i <= len; i++) {
    result.push({ x: x1 + i * vx, y: y1 + i * vy });
  }
  return result;
}
exports.makeLine = makeLine;
