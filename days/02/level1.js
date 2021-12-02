const T = require('taninsam');
const { patternMatchingBy } = require('../../tools');

module.exports = function(input) {
  return T.chain(input)
    .chain(
      T.reduce(
        ({ h, d }, { command, unit }) => {
          switch (command) {
            case 'forward':
              return { h: h + unit, d };
            case 'down':
              return { h, d: d + unit };
            case 'up':
              return { h, d: d - unit };
            default:
              return { h, d };
          }
        },
        { h: 0, d: 0 }
      )
    )
    .chain(({ h, d }) => h * d)
    .value();
};
