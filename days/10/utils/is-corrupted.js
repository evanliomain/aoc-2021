function isCorrupted(line) {
  const lifo = []; // Stack Last In First Out
  for (let i = 0; i < line.length; i++) {
    const c = line[i];
    if (['(', '[', '{', '<'].includes(c)) {
      lifo.push(c);
      continue;
    }
    const last = lifo.pop();
    if (
      ('(' === last && ')' !== c) ||
      ('[' === last && ']' !== c) ||
      ('{' === last && '}' !== c) ||
      ('<' === last && '>' !== c)
    ) {
      return c;
    }
  }
  return false;
}
exports.isCorrupted = isCorrupted;
