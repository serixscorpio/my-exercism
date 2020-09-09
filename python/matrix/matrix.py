from more_itertools import nth


class Matrix:
    def __init__(self, matrix_string):
        self.rows = []
        for row_string in matrix_string.splitlines():
            row = []
            for cell_string in row_string.split(" "):
                row.append(int(cell_string))
            self.rows.append(row)

    def row(self, index):
        return self.rows[index-1]

    def column(self, index):
        return list(nth(zip(*self.rows), index-1))
