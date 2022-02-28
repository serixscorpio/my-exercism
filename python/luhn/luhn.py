"""Luhn"""
import re


class Luhn:
    """An implementation of luhn algorithm"""

    def __init__(self, card_num: str):
        self.card_num = card_num

    def valid(self) -> bool:
        """check if card num is valid using luhn algorithm"""
        if re.match(r"[^0-9 ]", self.card_num):
            # non-digit or non-space found
            return False
        if len(self.card_num) <= 1:
            return False
        total = 0
        for index, char in enumerate(reversed(re.sub(r"\D", "", self.card_num))):
            digit = int(char)
            if index % 2 == 0:
                total += digit
            else:
                subtotal = digit * 2
                total += subtotal
                if subtotal > 9:
                    total -= 9
        if total % 10 == 0:
            return True
        return False
