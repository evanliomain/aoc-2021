const T = require('taninsam');
const { patternMatching } = require('../../tools');

module.exports = function(input) {
  return T.chain(input)
    .chain(T.map(isCorrupted))
    .chain(T.filter(x => 'corrupted' !== x))
    .chain(T.map(close))
    .chain(T.map(T.map(score)))
    .chain(T.map(T.reduce((total, s) => s + 5 * total, 0)))
    .chain(T.sortBy(x => x))
    .chain(scores => scores[(scores.length + 1) / 2 - 1])
    .value();
};

function score(c) {
  if (')' === c) return 1;
  if (']' === c) return 2;
  if ('}' === c) return 3;
  if ('>' === c) return 4;
  throw `Unknown character ${c}`;
}

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
      return 'corrupted';
    }
  }
  return lifo;
}

function close(lifo) {
  return T.chain(lifo)
    .chain(T.reverse())
    .chain(
      T.map(
        patternMatching(
          ['(', () => ')'],
          ['[', () => ']'],
          ['{', () => '}'],
          ['<', () => '>']
        )
      )
    )
    .value();
}
