const T = require('taninsam');

module.exports = function(input) {
  return T.chain(input)
    .chain(
      T.reduce(
        ({ h, d, aim }, { command, unit }) => {
          switch (command) {
            case 'forward':
              return { h: h + unit, d: d + aim * unit, aim };
            case 'down':
              return { h, d, aim: aim + unit };
            case 'up':
              return { h, d, aim: aim - unit };
            default:
              return { h, d, aim };
          }
        },
        { h: 0, d: 0, aim: 0 }
      )
    )
    .chain(({ h, d }) => h * d)
    .value();
};
