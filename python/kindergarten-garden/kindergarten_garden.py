"""Garden implementation"""


from typing import Sequence

PLANTS = {
    "C": "Clover",
    "G": "Grass",
    "R": "Radishes",
    "V": "Violets",
}

DEFAULT_STUDENTS = (
    "Alice",
    "Bob",
    "Charlie",
    "David",
    "Eve",
    "Fred",
    "Ginny",
    "Harriet",
    "Ileana",
    "Joseph",
    "Kincaid",
    "Larry",
)


class Garden:
    """Garden class
    A diagram is represented by a string like
    "VRGGRV\nRVRRGG" where the portion before the "\n" is the first row, and
    the portion after the "\n" is the second row.
    """

    def __init__(
        self,
        diagram: str,
        students: Sequence = DEFAULT_STUDENTS,
    ):
        self.diagram_row_1, self.diagram_row_2 = diagram.split("\n")
        self.students = sorted(students)

    def plants(self, student_name: str) -> list[str]:
        """return plants belonging to a student"""

        offset = self.students.index(student_name) * 2
        return [
            PLANTS[key]
            for key in (
                self.diagram_row_1[offset],
                self.diagram_row_1[offset + 1],
                self.diagram_row_2[offset],
                self.diagram_row_2[offset + 1],
            )
        ]
