from collections import Counter, namedtuple
from itertools import combinations

Card = namedtuple("Card", ["rank", "suit"])
CARD_RANKS = list("AKQJ") + [str(n) for n in reversed(range(2, 11))]


class Hand:
    """A poker hand.
    A hand can be initialized from string. For example: "4S JS 7H 8D 5C".
    A hand has a list of cards.  Each card has a rank and a suit.
    >>> hand = Hand("4S JS 7H 8D 5C")
    >>> hand._cards
    [Card(rank='4', suit='S'), Card(rank='J', suit='S'), Card(rank='7', suit='H'),
     Card(rank='8', suit='D'), Card(rank='5', suit='C')]
    >>> hand.rank()
    'J8745'
    """

    def __init__(self, hand_str: str):
        self._hand_str = hand_str
        self._cards = [Card(card_str[:-1], card_str[-1]) for card_str in hand_str.split()]

    def __len__(self) -> int:
        return len(self._cards)

    def __getitem__(self, index) -> Card:
        return self._cards[index]

    def __str__(self) -> str:
        return self._hand_str

    def rank(self) -> str:
        """return rank of a hand,
        The rank representation is generally from highest ranking parts to lowest ranking parts.
        Ex. "J8745" for "4S JS 7H 8D 5C" (a high card)
            "F109876" for "9S 8S 7S 6S 10S" (a straight flush)
            "FK10532" for "5H KH 2H 10H 3H" (a flush)
            "A5432" for "4S 3H 2S AD 5C" (a straight, "A" precedes "5" because it ranks higher as an individual card)
            "44488" for "4S 8H 4D 4H 8D" (a full house)
        """
        counter = Counter(card.rank for card in sorted(self._cards, key=card_rank_key, reverse=True))
        result = "".join(card_rank * count for card_rank, count in counter.most_common())
        if len({card.suit for card in self._cards}) == 1:
            # prepend "F" for flush
            return "F" + result
        return result


def straight_flush_ranks() -> list[str]:
    """return all possible ranks of straight flush
    [FAKQJ10, FKQJ109, ..., F65432, FA5432]
    """
    return ["F" + "".join(CARD_RANKS[i : i + 5]) for i in range(len(CARD_RANKS) - 4)] + ["FA5432"]


def four_of_a_kind_ranks() -> list[str]:
    """return all possible ranks of four of a kind
    [AAAAK, AAAAQ, ..., 22224, 22223]
    """
    return [
        quad_rank * 4 + kicker_rank
        for quad_rank in CARD_RANKS
        for kicker_rank in [i for i in CARD_RANKS if i != quad_rank]
    ]


def full_house_ranks() -> list[str]:
    """return all possible ranks of full house
    [AAAKK, AAAQQ, ..., 22244, 22233]
    """
    return [
        triple_rank * 3 + pair_rank * 2
        for triple_rank in CARD_RANKS
        for pair_rank in [i for i in CARD_RANKS if i != triple_rank]
    ]


def flush_ranks() -> list[str]:
    """return all possible ranks of flush excluding straight flush
    [FAKQJ9, FAKQJ8, ..., F76432, F75432]
    """
    flush_ranks = [
        "".join(flush_rank) for flush_rank in combinations(CARD_RANKS, 5) if "".join(flush_rank) not in straight_ranks()
    ]
    return ["F" + flush_rank for flush_rank in flush_ranks]


def straight_ranks() -> list[str]:
    """return all possible ranks of straight
    [AKQJ10, KQJ109, ..., 65432, A5432]
    """
    return ["".join(CARD_RANKS[i : i + 5]) for i in range(len(CARD_RANKS) - 4)] + ["A5432"]


def three_of_a_kind_ranks() -> list[str]:
    """return all possible ranks of three of a kind, higher to lower rank.
    [AAAKQ, AAAKJ, ..., 22253, 22243]
    """
    return [
        triple_rank * 3 + "".join(kicker_ranks)
        for triple_rank in CARD_RANKS
        for kicker_ranks in combinations([i for i in CARD_RANKS if i != triple_rank], 2)
    ]


def two_pairs_ranks() -> list[str]:
    """return all possible ranks of two pairs, higher to lower rank.
    [AAKKQ, AAKKJ, ..., 33225, 33224]
    """
    return [
        pair_ranks[0] * 2 + pair_ranks[1] * 2 + kicker_rank
        for pair_ranks in combinations(CARD_RANKS, 2)
        for kicker_rank in [i for i in CARD_RANKS if i not in pair_ranks]
    ]


def one_pair_ranks() -> list[str]:
    """return all possible ranks of one pair, higher to lower rank.
    [AAKQJ, AAKQ10, ..., 22643, 22543]
    """
    return [
        pair_rank * 2 + "".join(kicker_ranks)
        for pair_rank in CARD_RANKS
        for kicker_ranks in combinations([i for i in CARD_RANKS if i != pair_rank], 3)
    ]


def high_card_ranks() -> list[str]:
    """return all possible ranks of high card, higher to lower rank.
    [AKQJ9, AKQJ8, ..., 75432]
    """
    result = ["".join(ranks) for ranks in combinations(CARD_RANKS, 5)]
    for straight_rank in straight_ranks():
        result.remove(straight_rank)
    return result


HAND_RANKS = (
    straight_flush_ranks()
    + four_of_a_kind_ranks()
    + full_house_ranks()
    + flush_ranks()
    + straight_ranks()
    + three_of_a_kind_ranks()
    + two_pairs_ranks()
    + one_pair_ranks()
    + high_card_ranks()
)


def hand_rank_key(hand: Hand) -> int:
    """return rank_key of a hand"""
    return HAND_RANKS.index(hand.rank())


def card_rank_key(card: Card) -> int:
    """return rank_key of a card"""
    ranks = [str(n) for n in range(2, 11)] + list("JQKA")
    return ranks.index(card.rank)


def best_hands(hands: list[str]):
    """return the best hand(s) from a list of hands
    There can be multiple best hands if the hands' ranks are tied.
    """
    sorted_hands = sorted(map(Hand, hands), key=hand_rank_key)
    return [str(hand) for hand in sorted_hands if hand.rank() == sorted_hands[0].rank()]
