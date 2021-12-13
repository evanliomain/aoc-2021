function print(printer) {
  return dim => {
    const finalPrint = [];
    for (let y = 0; y < dim.y; y++) {
      const line = [];
      for (let x = 0; x < dim.x; x++) {
        line.push(printer({ x, y }));
      }

      finalPrint.push(line.join(''));
    }
    return finalPrint.join('\n');
  };
}
exports.print = print;
