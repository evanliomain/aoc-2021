const T = require('taninsam');
const chalk = require('chalk');
const { print } = require('./print');

function explode(pair) {
  return explodeRec(0, pair)[0];
}

exports.explode = explode;

function explodeRec(depth, pair) {
  const [left, right] = pair;

  if (depth < 3 && T.isNumber(left) && T.isNumber(right)) {
    return [pair, 0, 0];
  }

  if (3 === depth) {
    // explode the pair
    if (T.isNumber(left) && T.isNumber(right)) {
      return [pair, 0, 0];
    }

    if (T.isArray(left)) {
      const [ll, lr] = left;

      return [[0, spreadLeft(right, lr)], ll, 0];
    }

    if (T.isArray(right)) {
      const [rl, rr] = right;

      return [[left + rl, 0], 0, rr];
    }
  }

  if (T.isArray(left)) {
    const [eleft, leftRemain, rightRemain] = explodeRec(1 + depth, left);
    // eleft !== left, an explode occured
    if (print(eleft) !== print(left)) {
      return [[eleft, spreadLeft(right, rightRemain)], leftRemain, 0];
    }
  }
  if (T.isArray(right)) {
    const [eright, leftRemain, rightRemain] = explodeRec(1 + depth, right);

    return [[spreadRight(left, leftRemain), eright], 0, rightRemain];
  }

  return [[left, right], 0, 0];
  // throw "J'ai pas tout compris";
}

function spreadLeft(pair, value) {
  if (T.isNumber(pair)) {
    return value + pair;
  }
  const [left, right] = pair;
  if (T.isNumber(left)) {
    return [value + left, right];
  }
  return [spreadLeft(left, value), right];
}

function spreadRight(pair, value) {
  if (T.isNumber(pair)) {
    return value + pair;
  }
  const [left, right] = pair;
  if (T.isNumber(right)) {
    return [left, value + right];
  }
  return [left, spreadRight(right, value)];
}

// [
//   [
//     [
//       [
//         0,
//         [3,2]
//       ]d:3,

//       [3,3]
//     ]d:2,

//     [4,4]
//   ]d:1,

//   [5,5]
// ]d:0
