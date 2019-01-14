function nextRow(row) {
  const newRow = row.map((item, index) => {
    if (index === 0) return 1;
    return item + row[index - 1];
  });
  newRow.push(1);
  return newRow;
}

export default function Triangle(numRows) {
  if (numRows === 1) {
    const rows = [[1]];
    return {
      rows,
      get lastRow() {
        return rows[rows.length - 1];
      },
    };
  }
  const triangle = Triangle(numRows - 1);
  triangle.rows.push(nextRow(triangle.lastRow));
  return triangle;
}
