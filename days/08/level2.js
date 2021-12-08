const T = require('taninsam');
const { parseNumber } = require('../../tools');

module.exports = function(input) {
  return T.chain(input)
    .link('data')
    .chain(T.map(solve))
    .chain((solus, { data }) =>
      T.chain(data)
        .chain(T.map(({ outputs }) => outputs.map(T.join(''))))
        .chain(
          T.map((outputs, i) => outputs.map(output => solus[i][output] ?? '?'))
        )
        .chain(T.map(T.join('')))
        .chain(T.map(parseNumber()))
        .chain(T.sum())
        .value()
    )
    .value();
};

function solve({ signals, outputs }) {
  // 1, 4, 7 et 8 sont déductible directement
  const _1 = firstWithLenghtOf(2, signals);
  const _4 = firstWithLenghtOf(4, signals);
  const _7 = firstWithLenghtOf(3, signals);
  const _8 = firstWithLenghtOf(7, signals);

  // Sont de longueur 6 : 0, 6, 9
  const _l6 = findWithLenghtOf(6, signals);
  // Sont de longueur 5 : 2, 3, 5
  const _l5 = findWithLenghtOf(5, signals);

  // 4 est inclue dans 9 et pas dans 0 ou 6
  const [_i9, _9] = findWithIndex(isInclude(_4))(_l6);
  _l6.splice(_i9, 1);

  // 1 est inclue dans 0 et pas dans 6
  const [_i0, _0] = findWithIndex(isInclude(_1))(_l6);
  _l6.splice(_i0, 1);
  const _6 = _l6[0];

  // 1 est inclue dans 3 et pas dans 2 ou 5
  const [_i3, _3] = findWithIndex(isInclude(_1))(_l5);
  _l5.splice(_i3, 1);

  // 1 et 6 ont en commun 1 seul segment, commun avec 5, mais pas dans 2
  const segment = _1.find(s => _6.includes(s));
  const [_i5, _5] = findWithIndex(isInclude([segment]))(_l5);
  _l5.splice(_i5, 1);
  const _2 = _l5[0];

  return {
    [_0.join('')]: 0,
    [_1.join('')]: 1,
    [_2.join('')]: 2,
    [_3.join('')]: 3,
    [_4.join('')]: 4,
    [_5.join('')]: 5,
    [_6.join('')]: 6,
    [_7.join('')]: 7,
    [_8.join('')]: 8,
    [_9.join('')]: 9
  };
}

function firstWithLenghtOf(len, entries) {
  return T.chain(entries)
    .chain(T.find(entry => len === entry.length))
    .value();
}
function findWithLenghtOf(len, entries) {
  return T.chain(entries)
    .chain(T.filter(entry => len === entry.length))
    .value();
}
function findWithIndex(criteria) {
  return array => {
    const index = array.findIndex(criteria);
    return [index, array[index]];
  };
}
function isInclude(number) {
  return entry => number.every(n => entry.includes(n));
}

// Trier chaque entrée par ordre alphabétique

// 1, 4, 7 et 8 sont déductible directement
// Sont de longueur 6 : 0, 6, 9
// Sont de longueur 5 : 2, 3, 5

// 4 est inclue dans 9 et pas dans 0 ou 6
// 1 est inclue dans 0 et pas dans 6

// 1 est inclue dans 3 et pas dans 2 ou 5
// 1 et 6 ont en commun 1 seul segment, commun avec 5, mais pas dans 2

// Et voilà

// 781369 too low
