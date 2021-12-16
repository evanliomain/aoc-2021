const T = require('taninsam');

module.exports = function(input) {
  return T.chain(input)
    .chain(checkSum)
    .value();
};

function checkSum(packet) {
  if (T.isNumber(packet.value)) {
    return packet.version;
  }
  return T.chain(packet.value)
    .chain(T.map(checkSum))
    .chain(T.sum())
    .chain(c => packet.version + c)
    .value();
}
