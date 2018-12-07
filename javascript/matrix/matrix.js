export default class Matrix {
  constructor(inputStr) {
    this.rows = inputStr.split('\n').map(rowStr => rowStr.split(' ').map(cellStr => parseInt(cellStr, 10)));
    this.columns = Array.from(this.rows[0], () => []);
    for (let i = 0; i < this.rows.length; i += 1) {
      for (let j = 0; j < this.rows[i].length; j += 1) {
        this.columns[j].push(this.rows[i][j]);
      }
    }
  }
}
