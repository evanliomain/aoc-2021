const day = 16;
const parse = require('./in');
const solve = require('./level2');
const read = require('../../utils/read');

describe('16-2', () => {
  it.each`
    sample | expected
    ${8}   | ${3}
    ${9}   | ${54}
    ${10}  | ${7}
    ${11}  | ${9}
    ${12}  | ${1}
    ${13}  | ${0}
    ${14}  | ${0}
    ${15}  | ${1}
  `('returns $expected for sample $sample', ({ sample, expected }) => {
    expect(solve(parse(read(day)(sample)))).toEqual(expected);
  });
});
