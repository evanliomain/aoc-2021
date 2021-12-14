const T = require('taninsam');
const { lag } = require('../../tools');

module.exports = function({ polymerTemplate, pairInsertion }) {
  const NB_STEPS = 40;
  let lettersCount = {};
  let pairsCount = {};
  polymerTemplate.forEach(nuc => {
    lettersCount = count(lettersCount)(nuc);
  });
  lag((l, r) => l + r)(polymerTemplate).forEach(pair => {
    pairsCount = count(pairsCount)(pair);
  });

  for (let i = 0; i < NB_STEPS; i++) {
    let newPairCount = {};
    T.entries()(pairsCount).forEach(([pair, nb]) => {
      const [l, r] = pair.split('');
      const newNuc = pairInsertion[pair];
      lettersCount = count(lettersCount)(newNuc, nb);
      newPairCount = count(newPairCount)(l + newNuc, nb);
      newPairCount = count(newPairCount)(newNuc + r, nb);
    });
    pairsCount = newPairCount;
  }
  return score(lettersCount);
};

function count(stack) {
  return (c, increment = 1) => {
    stack[c] = (stack[c] ?? 0) + increment;
    return stack;
  };
}

function score(lettersCount) {
  return T.chain(lettersCount)
    .chain(T.values())
    .chain(counts => [T.min()(counts), T.max()(counts)])
    .chain(([min, max]) => max - min)
    .value();
}
