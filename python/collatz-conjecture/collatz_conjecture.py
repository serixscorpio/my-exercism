def steps(number: int) -> int:
    """Return the number of steps required to reach 1, from the Collatz conjecture"""

    if number < 1:
        msg = "Only positive integers are allowed"
        raise ValueError(msg)
    count = 0
    while number != 1:
        if number % 2 == 0:
            number = number // 2
        else:
            number = number * 3 + 1
        count += 1
    return count
