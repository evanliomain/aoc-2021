function isWinner(board) {
  // Has winner line
  for (let i = 0; i < 5; i++) {
    let winnerLine = true;
    for (let j = 0; j < 5; j++) {
      winnerLine = winnerLine && board[i][j].marked;
      if (!winnerLine) {
        break;
      }
    }
    // Found a winner
    if (winnerLine) {
      return true;
    }
  }

  // Has winner column
  for (let i = 0; i < 5; i++) {
    let winnerLine = true;
    for (let j = 0; j < 5; j++) {
      winnerLine = winnerLine && board[j][i].marked;
      if (!winnerLine) {
        break;
      }
    }
    // Found a winner
    if (winnerLine) {
      return true;
    }
  }
  return false;
}
exports.isWinner = isWinner;
