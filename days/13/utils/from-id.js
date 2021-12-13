const T = require('taninsam');
const { parseNumber } = require('../../../tools');

function fromId(point) {
  return T.chain(point)
    .chain(T.split(','))
    .chain(T.map(parseNumber()))
    .chain(([x, y]) => ({ x, y }))
    .value();
}
exports.fromId = fromId;
