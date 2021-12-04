const T = require('taninsam');
const { hasWinner } = require('./utils/has-winner');
const { mark } = require('./utils/mark');
const { score } = require('./utils/score');

module.exports = function({ randomNumbers, boards }) {
  // Mark five first numbers
  let playingBoards = T.chain(boards)
    .chain(T.loopFor(5, (b, i) => mark(randomNumbers[i])(b)))
    .value();

  let winner = hasWinner(playingBoards);
  let i = 4;
  while (!!!winner) {
    i++;
    playingBoards = mark(randomNumbers[i])(playingBoards);
    winner = hasWinner(playingBoards);
  }
  return score(winner, randomNumbers[i]);
};
