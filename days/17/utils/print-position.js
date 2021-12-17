const T = require('taninsam');
const chalk = require('chalk');
const { isInTargetArea } = require('./is-in-target-area');

function printPosition({ xmin, xmax, ymin, ymax }) {
  const isIn = isInTargetArea({ xmin, xmax, ymin, ymax });
  return positions =>
    T.chain(positions)
      .chain(
        T.map(({ x, y }) => {
          if (isIn({ x, y })) {
            return chalk.green(`${x},${y}`);
          }
          return chalk.grey(`${x},${y}`);
        })
      )
      .chain(T.join('  '))
      .value();
}
exports.printPosition = printPosition;
