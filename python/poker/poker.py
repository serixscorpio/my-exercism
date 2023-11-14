from collections import Counter, namedtuple
from itertools import combinations

Card = namedtuple("Card", ["rank", "suit"])
CARD_RANKS = list("AKQJ") + [str(n) for n in reversed(range(2, 11))]


class Hand:
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
        """return rank of a hand"""
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
        quad_card_rank * 4 + kicker_card_rank
        for quad_card_rank in CARD_RANKS
        for kicker_card_rank in [i for i in CARD_RANKS if i != quad_card_rank]
    ]


def full_house_ranks() -> list[str]:
    """return all possible ranks of full house
    [AAAKK, AAAQQ, ..., 22244, 22233]
    """
    return [
        triple_card_rank * 3 + pair_card_rank * 2
        for triple_card_rank in CARD_RANKS
        for pair_card_rank in [i for i in CARD_RANKS if i != triple_card_rank]
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
        card_rank * 3 + "".join(kickers_rank)
        for card_rank in CARD_RANKS
        for kickers_rank in combinations([i for i in CARD_RANKS if i != card_rank], 2)
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
        card_rank * 2 + "".join(kickers_rank)
        for card_rank in CARD_RANKS
        for kickers_rank in combinations([i for i in CARD_RANKS if i != card_rank], 3)
    ]


def high_card_ranks() -> list[str]:
    """return all possible ranks of high card, higher to lower rank.
    [AKQJ9, AKQJ8, ..., 75432]
    """
    result = ["".join(ranks) for ranks in combinations(CARD_RANKS, 5)]
    for straight_rank in straight_ranks():
        result.remove(straight_rank)
    return result


HAND_RANKS = list(
    reversed(
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
)


def hand_rank_key(hand: Hand) -> int:
    """return rank_key of a hand"""
    return HAND_RANKS.index(hand.rank())


def card_rank_key(card: Card) -> int:
    """return rank_key of a card"""
    ranks = [str(n) for n in range(2, 11)] + list("JQKA")
    return ranks.index(card.rank)


def best_hands(hands: list[str]):
    result = []
    for hand in sorted(map(Hand, hands), key=hand_rank_key, reverse=True):
        if not result:
            result.append(str(hand))
            best_hand = hand
        elif hand.rank() == best_hand.rank():
            result.append(str(hand))
    return result
