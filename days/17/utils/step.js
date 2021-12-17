/**
 * {vx, vy}
 * x(0) = 0
 * y(0) = 0
 *
 * x(n) = x(n-1) + max(0, vx - n + 1)
 * y(n) = y(n-1) + vy + 1 - n
 */
function step({ vx, vy }) {
  return ({ x, y, n }) => ({
    x: x + Math.max(0, vx - n + 1),
    y: y + vy + 1 - n
  });
}
exports.step = step;
