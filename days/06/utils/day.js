function day(fishs) {
  const newFishs = [];
  for (let i = 0; i < fishs.length; i++) {
    const fish = fishs[i];
    if (0 < fish) {
      fishs[i] = fish - 1;
    } else {
      fishs[i] = 6;
      newFishs.push(8);
    }
  }
  return [...fishs, ...newFishs];
}
exports.day = day;
