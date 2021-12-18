const T = require('taninsam');
const day = 18;
const parse = require('./in');
const solve = require('./level1');
const read = require('../../utils/read');
const { explode } = require('./utils/explode');
const { split } = require('./utils/split');
const { magnitude } = require('./utils/magnitude');
const { print } = require('./utils/print');
const { add } = require('./utils/add');
const {
  isAnyPairIsNestedInsideFourPairs
} = require('./utils/is-any-pair-is-nested-inside-four-pairs');
const {
  isAnyRegularNumberIs10OrGreater
} = require('./utils/is-any-regular-number-is10-or-greater');

const parse1 = x => parse(x)[0];

describe('18-1', () => {
  it.each`
    sample | expected
    ${1}   | ${4140}
  `('returns $expected for sample $sample', ({ sample, expected }) => {
    expect(solve(parse(read(day)(sample)))).toEqual(expected);
  });

  describe('explode', () => {
    for (let i = 1; i <= 6; i++) {
      const input = parse1(read(day)(`explode_${i}`));
      const expected = parse1(read(day)(`explode_${i}_r`));

      it(`${print(input)} becomes ${print(expected)}`, () => {
        expect(print(explode(input))).toEqual(print(expected));
      });
    }
  });

  describe('split', () => {
    it.each`
      input | expected
      ${10} | ${[5, 5]}
      ${11} | ${[5, 6]}
      ${12} | ${[6, 6]}
    `('$input becomes $expected', ({ input, expected }) => {
      expect(print(split(input))).toEqual(print(expected));
    });
  });

  describe('isAnyPairIsNestedInsideFourPairs', () => {
    for (let i = 1; i <= 4; i++) {
      const expected = parse1(read(day)(`add_${i}_r`));

      it(`${print(expected)} has no exploded`, () => {
        expect(isAnyPairIsNestedInsideFourPairs(0, expected)).toBe(false);
      });
    }
  });

  describe('isAnyRegularNumberIs10OrGreater', () => {
    for (let i = 1; i <= 4; i++) {
      const expected = parse1(read(day)(`add_${i}_r`));

      it(`${print(expected)} has no exploded`, () => {
        expect(isAnyRegularNumberIs10OrGreater(expected)).toBe(false);
      });
    }
  });

  describe('add', () => {
    for (let i = 1; i <= 4; i++) {
      const input = parse(read(day)(`add_${i}`));
      const expected = parse1(read(day)(`add_${i}_r`));

      it(`${print(input)} becomes ${print(expected)}`, () => {
        expect(print(T.reduce(add)(input))).toEqual(print(expected));
      });
    }
  });
  describe('magnitude', () => {
    it.each`
      sample | expected
      ${1}   | ${129}
      ${2}   | ${143}
      ${3}   | ${1384}
      ${4}   | ${445}
      ${5}   | ${791}
      ${6}   | ${1137}
      ${7}   | ${3488}
    `('returns $expected for sample $sample', ({ sample, expected }) => {
      expect(magnitude(parse1(read(day)(`magnitude_${sample}`)))).toEqual(
        expected
      );
    });
  });
});
