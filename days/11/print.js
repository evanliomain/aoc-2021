const chalk = require('chalk');
const {
  printMatrix,
  patternMatching,
  printMatrixToFile
} = require('../../tools');

const colors = [
  '#ffffff',
  '#ffffd9',
  '#edf8b1',
  '#c7e9b4',
  '#7fcdbb',
  '#41b6c4',
  '#1d91c0',
  '#225ea8',
  '#253494',
  '#081d58'
];

function print() {
  return printMatrix(
    patternMatching([0, () => chalk.bgWhite(' ')], [cell => cell])
  );
}

function printFile(nbStep) {
  return printMatrixToFile(cell => colors[cell])(
    `day_11/step_${String(nbStep).padStart(3, '0')}`,
    20
  );
}
exports.print = print;
exports.printFile = printFile;
