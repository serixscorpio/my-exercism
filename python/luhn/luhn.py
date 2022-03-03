"""Luhn"""
import re


class Luhn:
    """An implementation of luhn algorithm"""

    def __init__(self, card_num: str):
        self.card_num = card_num

    def valid(self) -> bool:
        """check if card num is valid using luhn algorithm"""
        card_num_no_space = re.sub(r" ", "", self.card_num)
        if re.search(r"\D", card_num_no_space):
            # non-digit found
            return False
        if len(card_num_no_space) <= 1:
            return False
        total = 0
        for index, char in enumerate(reversed(card_num_no_space)):
            digit = int(char)
            if index % 2 == 0:
                total += digit
            else:
                subtotal = digit * 2
                if subtotal > 9:
                    subtotal -= 9
                total += subtotal
        if total % 10 == 0:
            return True
        return False
