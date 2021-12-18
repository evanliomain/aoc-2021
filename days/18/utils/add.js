const T = require('taninsam');
const chalk = require('chalk');
const { explode } = require('./explode');
const {
  isAnyPairIsNestedInsideFourPairs
} = require('./is-any-pair-is-nested-inside-four-pairs');
const {
  isAnyRegularNumberIs10OrGreater
} = require('./is-any-regular-number-is10-or-greater');
const { print } = require('./print');
const { split } = require('./split');

function add(a, b) {
  // console.log('add', chalk.magenta(print(a)), chalk.green(print(b)));
  let reducedPair = [a, b];
  let i = 0;

  while (true) {
    // if (10 === i) {
    //   throw 'Non mais ça va pas !!!';
    // }
    if (isAnyPairIsNestedInsideFourPairs(0, reducedPair)) {
      // If any pair is nested inside four pairs, the leftmost such pair explodes
      reducedPair = explode(reducedPair);
      i++;
      continue;
    }

    // If any regular number is 10 or greater, the leftmost such regular number splits
    if (isAnyRegularNumberIs10OrGreater(reducedPair)) {
      reducedPair = split(reducedPair);
      i++;
      continue;
    }
    return reducedPair;
  }
}

exports.add = add;
