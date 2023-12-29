import re


class PhoneNumber:
    def __init__(self, input_number_str: str):
        self.number = self._clean_nanp(input_number_str)
        self.area_code = self.number[:3]

    def pretty(self) -> str:
        """return phone number in the format (XXX)-XXX-XXXX"""
        return f"({self.area_code})-{self.number[3:6]}-{self.number[6:]}"

    def _clean_nanp(self, number_str: str) -> int:
        number_str = re.sub(
            r"[\s.()+-]", "", number_str
        )  # Remove all formatting characters
        if re.search(r"[A-Za-z]", number_str):
            raise ValueError("letters not permitted")
        if re.search(r"\D", number_str):
            raise ValueError("punctuations not permitted")
        if len(number_str) < 10:
            raise ValueError("must not be fewer than 10 digits")
        if len(number_str) > 11:
            raise ValueError("must not be greater than 11 digits")
        if len(number_str) == 11:
            if number_str[0] != "1":
                raise ValueError("11 digits must start with 1")
            number_str = number_str[1:]  # Remove leading 1
        if number_str[0] == "0":
            raise ValueError("area code cannot start with zero")
        if number_str[0] == "1":
            raise ValueError("area code cannot start with one")
        if number_str[3] == "0":
            raise ValueError("exchange code cannot start with zero")
        if number_str[3] == "1":
            raise ValueError("exchange code cannot start with one")
        return number_str
