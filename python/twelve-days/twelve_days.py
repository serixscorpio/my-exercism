nth_days = [
    "first",
    "second",
    "third",
    "fourth",
    "fifth",
    "sixth",
    "seventh",
    "eighth",
    "ninth",
    "tenth",
    "eleventh",
    "twelfth",
]
gifts = [
    "a Partridge in a Pear Tree.",
    "two Turtle Doves, and",
    "three French Hens,",
    "four Calling Birds,",
    "five Gold Rings,",
    "six Geese-a-Laying,",
    "seven Swans-a-Swimming,",
    "eight Maids-a-Milking,",
    "nine Ladies Dancing,",
    "ten Lords-a-Leaping,",
    "eleven Pipers Piping,",
    "twelve Drummers Drumming,",
]


def recite(start_verse, end_verse):
    return [recite_verse(i) for i in range(start_verse - 1, end_verse)]


def recite_verse(zero_based_verse_number):
    return " ".join(
        [
            f"On the {nth_days[zero_based_verse_number]} day of Christmas my true love gave to me:"
        ]
        + [gift for gift in reversed(gifts[: zero_based_verse_number + 1])]
    )
