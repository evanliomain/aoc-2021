const T = require('taninsam');
const { captureGroups, autoConvert } = require('../../tools');

module.exports = function(input) {
  return T.chain(input[0])
    .chain(
      captureGroups(
        /target area: x=(?<xmin>\d*)..(?<xmax>\d*), y=(?<ymin>-\d*)..(?<ymax>-\d*)/
      )
    )
    .chain(autoConvert())
    .value();
};
