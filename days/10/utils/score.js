function score(c) {
  if (')' === c) return 3;
  if (']' === c) return 57;
  if ('}' === c) return 1197;
  if ('>' === c) return 25137;
  throw `Unknown character ${c}`;
}
exports.score = score;
