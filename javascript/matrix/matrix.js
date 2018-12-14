const parseRow = rowStr => rowStr.split(' ').map(cellStr => parseInt(cellStr, 10));
const parseColumn = columns => row => row.forEach((number, i) => columns[i].push(number));

export class Matrix {
  constructor(inputStr) {
    const rows = inputStr.split('\n').map(parseRow);
    const columns = Array.from(rows[0], () => []);
    rows.forEach(parseColumn(columns));
    this.rows = rows;
    this.columns = columns;
  }
}
