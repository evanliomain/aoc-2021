function countDoublon(coords) {
  const XY = new Map();
  coords
    .map(({ x, y }) => `${x},${y}`)
    .forEach(coord => {
      if (XY.has(coord)) {
        XY.set(coord, 1 + XY.get(coord));
      } else {
        XY.set(coord, 1);
      }
    });
  let count = 0;
  for (const [_, nb] of XY) {
    if (1 < nb) {
      count++;
    }
  }
  return count;
}
exports.countDoublon = countDoublon;
