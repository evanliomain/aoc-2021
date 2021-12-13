const { foldPoints } = require('./utils/fold-points');

module.exports = function({ points, fold }) {
  return foldPoints(points, fold[0]).size;
};
