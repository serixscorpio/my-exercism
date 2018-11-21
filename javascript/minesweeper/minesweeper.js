export class Minesweeper {
  constructor() {
    this.mine = '*';
    this.emptySquare = ' ';
  }

  annotate(input) {
    if (input.length === 0 || input[0].length === 0) return input;
    const output = input.slice().map(row => row.split(''));
    for (let i = 0; i < input.length; i += 1) {
      for (let j = 0; j < input[i].length; j += 1) {
        output[i][j] = this.updateCell(i, j, -1, -1, output);
        output[i][j] = this.updateCell(i, j, -1, 0, output);
        output[i][j] = this.updateCell(i, j, -1, 1, output);
        output[i][j] = this.updateCell(i, j, 0, -1, output);
        output[i][j] = this.updateCell(i, j, 0, 1, output);
        output[i][j] = this.updateCell(i, j, 1, -1, output);
        output[i][j] = this.updateCell(i, j, 1, 0, output);
        output[i][j] = this.updateCell(i, j, 1, 1, output);
      }
    }
    return output.map(row => row.join(''));
  }

  updateCell(row, col, rowOffset, colOffset, output) {
    if (output[row][col] === this.mine) return this.mine;
    if (output[row + rowOffset] && output[row + rowOffset][col + colOffset] === this.mine) {
      if (output[row][col] === this.emptySquare) {
        return 1;
      }
      return output[row][col] + 1;
    }
    return output[row][col];
  }
}
