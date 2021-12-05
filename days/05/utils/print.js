function print(coords) {
  return coords.map(({ x, y }) => `${x},${y}`).join(' ');
}
exports.print = print;
