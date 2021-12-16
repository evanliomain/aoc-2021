const T = require('taninsam');
const { parseNumber } = require('../../tools');

const hexToBin = {
  '0': '0000',
  '1': '0001',
  '2': '0010',
  '3': '0011',
  '4': '0100',
  '5': '0101',
  '6': '0110',
  '7': '0111',
  '8': '1000',
  '9': '1001',
  A: '1010',
  B: '1011',
  C: '1100',
  D: '1101',
  E: '1110',
  F: '1111'
};

const binToDec = parseNumber(2);
const take11Bits = T.take(11);

module.exports = function(input) {
  return T.chain(input)
    .chain(toBinArray)
    .chain(parsePackets)
    .value();
};

function toBinArray(input) {
  return T.chain(input[0])
    .chain(T.split())
    .chain(T.map(x => hexToBin[x]))
    .chain(T.join(''))
    .chain(T.split())
    .value();
}
function parsePackets(input) {
  const [v0, v1, v2, t0, t1, t2, ...rest] = input;
  const version = binToDec(v0 + v1 + v2);
  const id = binToDec(t0 + t1 + t2);

  if (4 === id) {
    const [value, nbBits] = parseLiteral(rest);
    return { version, id, nbBits: 6 + nbBits, value };
  }
  const [value, nbBits] = parseOperator(rest);
  return { version, id, nbBits: 6 + nbBits, value };
}

function parseLiteral(bits) {
  let [b0, b1, b2, b3, b4, ...rest] = bits;
  let result = '';
  let nbBits = 5;
  while ('1' === b0) {
    result += b1 + b2 + b3 + b4;
    [b0, b1, b2, b3, b4, ...rest] = rest;
    nbBits += 5;
  }
  result += b1 + b2 + b3 + b4;
  return [binToDec(result), nbBits];
}
function parseOperator(bits) {
  const [lengthTypeId, ...rest] = bits;

  if ('0' === lengthTypeId) {
    return subPacketsByTotalLength(rest);
  }
  if ('1' === lengthTypeId) {
    return subPacketsByNumber(rest);
  }
}

function subPacketsByTotalLength(input) {
  let nbBits = 1;
  // the next 15 bits are a number that represents the total length in bits of the sub-packets contained by this packet.
  const [
    l0,
    l1,
    l2,
    l3,
    l4,
    l5,
    l6,
    l7,
    l8,
    l9,
    l10,
    l11,
    l12,
    l13,
    l14,
    ...sub
  ] = input;
  nbBits += 15;
  const l = binToDec(
    l0 +
      l1 +
      l2 +
      l3 +
      l4 +
      l5 +
      l6 +
      l7 +
      l8 +
      l9 +
      l10 +
      l11 +
      l12 +
      l13 +
      l14
  );
  let bits = T.take(l)(sub);
  nbBits += l;
  const subPackets = [];
  let progression = 0;
  while (progression < l) {
    const sub = parsePackets(bits);
    subPackets.push(sub);
    bits = bits.slice(sub.nbBits);
    progression += sub.nbBits;
  }
  return [subPackets, nbBits];
}

function subPacketsByNumber(input) {
  let nbBits = 1;

  // the next 11 bits are a number that represents the number of sub-packets immediately contained by this packet.
  const l = binToDec(take11Bits(input).join(''));
  let bits = input.slice(11);
  nbBits += 11;

  const subPackets = [];
  for (let i = 0; i < l; i++) {
    const sub = parsePackets(bits);
    subPackets.push(sub);
    bits = bits.slice(sub.nbBits);
    nbBits += sub.nbBits;
  }
  return [subPackets, nbBits];
}
