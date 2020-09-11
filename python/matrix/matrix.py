from more_itertools import nth


class Matrix:
    def __init__(self, matrix_string):
        self.rows = []
        for row_string in matrix_string.splitlines():
            row = [int(cell_string) for cell_string in row_string.split(" ")]
            self.rows.append(row)

    def row(self, index):
        return self.rows[index - 1]

    def column(self, index):
        col = []
        for i in range(len(self.rows)):
            col.append(self.rows[i][index - 1])
        return col
