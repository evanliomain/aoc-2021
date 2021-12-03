const T = require('taninsam');

module.exports = function(input) {
  return T.chain({
    oxygen: filterMostCommon(input, 0),
    co2: filterLeastCommon(input, 0)
  })
    .chain(({ oxygen, co2 }) => ({
      oxygen: oxygen.join(''),
      co2: co2.join('')
    }))
    .chain(({ oxygen, co2 }) => ({
      oxygen: parseInt(oxygen, 2),
      co2: parseInt(co2, 2)
    }))
    .chain(({ oxygen, co2 }) => oxygen * co2)
    .value();
};

function filterMostCommon(bitsList, index) {
  if (1 === bitsList.length) {
    return bitsList[0];
  }
  if (bitsList[0].length <= index) {
    throw `Reach maximum bits length for most criteria`;
  }
  const criteria = mostCommonBit(bitsList, index);
  const filtered = bitsList.filter(bits => criteria === bits[index]);
  return filterMostCommon(filtered, index + 1);
}
function filterLeastCommon(bitsList, index) {
  if (1 === bitsList.length) {
    return bitsList[0];
  }
  if (bitsList[0].length <= index) {
    throw `Reach maximum bits length for least criteria`;
  }
  const criteria = leastCommonBit(bitsList, index);
  const filtered = bitsList.filter(bits => criteria === bits[index]);
  return filterLeastCommon(filtered, index + 1);
}

function bitOccurence(bitsList, index) {
  return T.chain(bitsList)
    .chain(
      T.reduce(
        (acc, bits) => ({
          0: acc[0] + (0 === bits[index] ? 1 : 0),
          1: acc[1] + (1 === bits[index] ? 1 : 0)
        }),
        { 0: 0, 1: 0 }
      )
    )
    .value();
}

function mostCommonBit(bitsList, index) {
  const occurence = bitOccurence(bitsList, index);
  if (occurence[0] < occurence[1]) {
    return 1;
  }
  if (occurence[1] < occurence[0]) {
    return 0;
  }
  return 1;
}

function leastCommonBit(bitsList, index) {
  const occurence = bitOccurence(bitsList, index);
  if (occurence[0] < occurence[1]) {
    return 0;
  }
  if (occurence[1] < occurence[0]) {
    return 1;
  }
  return 0;
}
