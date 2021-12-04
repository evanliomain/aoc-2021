const T = require('taninsam');
const { isWinner } = require('./utils/is-winner');
const { hasWinnerIndex } = require('./utils/has-winner-index');
const { mark } = require('./utils/mark');
const { markBoard } = require('./utils/mark-board');
const { score } = require('./utils/score');

module.exports = function({ randomNumbers, boards }) {
  // Mark five first numbers
  let playingBoards = T.chain(boards)
    .chain(T.loopFor(5, (b, i) => mark(randomNumbers[i])(b)))
    .value();

  let i = 4;

  // Remove all winner boards one by one
  while (1 < playingBoards.length) {
    i++;
    playingBoards = mark(randomNumbers[i])(playingBoards);
    let winnerIndex = hasWinnerIndex(playingBoards);
    while (T.isNumber(winnerIndex)) {
      // Remove all winners from playingBoards, occured at i
      playingBoards.splice(winnerIndex, 1);
      winnerIndex = hasWinnerIndex(playingBoards);
    }
  }

  let lastBoard = playingBoards[0];

  while (!isWinner(lastBoard)) {
    i++;
    lastBoard = markBoard(randomNumbers[i])(lastBoard);
  }

  return score(lastBoard, randomNumbers[i]);
};
