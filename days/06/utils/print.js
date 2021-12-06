function print(fishs) {
  return `#${String(fishs.length).padStart(5)}: ${fishs.join(',')}`;
}
exports.print = print;
