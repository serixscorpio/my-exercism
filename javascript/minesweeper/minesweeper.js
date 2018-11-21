export class Minesweeper {
  annotate(input) {
    if (input.length === 0) return input;
    if (input[0].length === 0) return input;
    const output = input.slice();
    for (let i = 0; i < output.length; i += 1) {
      output[i] = output[i].split('');
    }
    for (let i = 0; i < input.length; i += 1) {
      for (let j = 0; j < input[i].length; j += 1) {
        if (input[i][j] === '*') {
          this.updateHint(i - 1, j - 1, output); // top left
          this.updateHint(i - 1, j, output); // top
          this.updateHint(i - 1, j + 1, output); // top right
          this.updateHint(i, j - 1, output); // left
          this.updateHint(i, j + 1, output); // right
          this.updateHint(i + 1, j - 1, output); // bottom left
          this.updateHint(i + 1, j, output); // bottom
          this.updateHint(i + 1, j + 1, output); // bottom right
        }
      }
    }
    for (let i = 0; i < output.length; i += 1) {
      output[i] = output[i].join('');
    }
    return output;
  }

  updateHint(row, col, output) {
    if (output[row] && output[row][col] && output[row][col] !== '*') {
      if (output[row][col] === ' ') {
        output[row][col] = 1;
      } else {
        output[row][col] += 1;
      }
    }
  }
}
