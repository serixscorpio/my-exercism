export default class Matrix {
  constructor(inputStr) {
    const rows = inputStr.split('\n').map(rowStr => rowStr.split(' ').map(cellStr => parseInt(cellStr, 10)));
    const columns = Array.from(rows[0], () => []);
    rows.forEach(row => row.forEach((number, i) => columns[i].push(number)));
    this.rows = rows;
    this.columns = columns;
  }
}
