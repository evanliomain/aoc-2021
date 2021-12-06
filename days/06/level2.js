// Solution highly inspired by :
// https://www.reddit.com/r/adventofcode/comments/r9z49j/2021_day_6_solutions/hnftc70

const T = require('taninsam');

module.exports = function(initState) {
  const numberOfDays = 256;

  // [x0, x1, x2, x3, x4, x5, x6, x7, x8, x9 ] where xi = number of fish due on day i mod 10.
  // I loop over this slice for numberOfDays,
  // taking mod 10 for each day and updating the number of fish due in this same slice.

  // fish born on day 0 will give birth on day 9, so we need to track 10-day windows
  const M = 10;
  // [ xi ], where xi = #fish due on day n = i (mod M)
  let dueDates = T.arrayFromValue(M)(0);
  // fish labelled 0 produces on day 1
  initState.forEach(ini => dueDates[ini + 1]++);

  let fish = initState.length;

  // simulate births for N days
  for (let day = 1; day <= numberOfDays; day++) {
    // day number mod M
    const today = day % M;

    // birth new fish
    // total of new fish born today
    const newFish = dueDates[today];
    fish += newFish;

    // update due dates

    // expected due date of new fish, mod M
    dueDates[(today + 9) % M] += newFish;
    // expected due date of old fish, mod M
    dueDates[(today + 7) % M] += newFish;

    dueDates[today] -= newFish;
  }
  return fish;
};
