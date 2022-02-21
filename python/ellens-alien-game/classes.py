"""alien class"""


class Alien:
    """This class models an alien"""

    total_aliens_created = 0

    # pylint: disable=invalid-name
    def __init__(self, x_coordinate: int, y_coordinate: int):
        self.x_coordinate = x_coordinate
        self.y_coordinate = y_coordinate
        self.health = 3
        Alien.total_aliens_created += 1

    # pylint: enable=invalid-name

    def collision_detection(self, other_object):
        """collision detection method yet to be implemented"""
        pass

    def hit(self):
        """decrement the health of alien by 1"""
        self.health -= 1

    def is_alive(self):
        """returns if alien is alive"""
        return self.health > 0

    def teleport(self, x_coordinate: int, y_coordinate: int):
        """teleport alien to specified cooridnate"""
        self.x_coordinate = x_coordinate
        self.y_coordinate = y_coordinate


def new_aliens_collection(positions):
    """Function taking a list of position tuples, creating one Alien instance per position.

    :param positions: list - A list of tuples of (x, y) coordinates.
    :return: list - A list of Alien objects.
    """

    return [Alien(*position) for position in positions]
