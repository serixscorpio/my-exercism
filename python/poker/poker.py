from collections import Counter, namedtuple
from itertools import combinations

Card = namedtuple("Card", ["rank", "suit"])


class Hand:
    def __init__(self, hand_str: str):
        self._hand_str = hand_str
        self._cards = [Card(card_str[:-1], card_str[-1]) for card_str in hand_str.split()]
        self._ordered_card_ranks = sorted(self._cards, key=card_rank_key)

    def __len__(self) -> int:
        return len(self._cards)

    def __getitem__(self, index) -> Card:
        return self._cards[index]

    def __str__(self) -> str:
        return self._hand_str


def hand_rank(hand: Hand) -> str:
    """return rank of a hand"""
    counter = Counter(card.rank for card in sorted(hand, key=card_rank_key, reverse=True))
    result = "".join(card_rank * count for card_rank, count in counter.most_common())
    if len({card.suit for card in hand._cards}) == 1:
        # prepend "F" for flush
        return "F" + result
    return result


def straight_flush_ranks() -> list[str]:
    """return all possible ranks of straight flush
    [FAKQJ10, FKQJ109, ..., F65432, FA5432]
    """
    card_ranks = list("AKQJ") + [str(n) for n in reversed(range(2, 11))]
    return ["F" + "".join(card_ranks[i : i + 5]) for i in range(len(card_ranks) - 4)] + ["FA5432"]


def four_of_a_kind_ranks() -> list[str]:
    """return all possible ranks of four of a kind
    [AAAAK, AAAAQ, ..., 22224, 22223]
    """
    card_ranks = list("AKQJ") + [str(n) for n in reversed(range(2, 11))]
    return [
        quad_card_rank * 4 + kicker_card_rank
        for quad_card_rank in card_ranks
        for kicker_card_rank in [i for i in card_ranks if i != quad_card_rank]
    ]


def full_house_ranks() -> list[str]:
    """return all possible ranks of full house
    [AAAKK, AAAQQ, ..., 22244, 22233]
    """
    card_ranks = list("AKQJ") + [str(n) for n in reversed(range(2, 11))]
    return [
        triple_card_rank * 3 + pair_card_rank * 2
        for triple_card_rank in card_ranks
        for pair_card_rank in [i for i in card_ranks if i != triple_card_rank]
    ]


def flush_ranks() -> list[str]:
    """return all possible ranks of flush excluding straight flush
    [FAKQJ9, FAKQJ8, ..., F76432, F75432]
    """
    card_ranks = list("AKQJ") + [str(n) for n in reversed(range(2, 11))]
    flush_ranks = [
        "".join(flush_rank) for flush_rank in combinations(card_ranks, 5) if "".join(flush_rank) not in straight_ranks()
    ]
    return ["F" + flush_rank for flush_rank in flush_ranks]


def straight_ranks() -> list[str]:
    """return all possible ranks of straight
    [AKQJ10, KQJ109, ..., 65432, A5432]
    """
    card_ranks = list("AKQJ") + [str(n) for n in reversed(range(2, 11))]
    return ["".join(card_ranks[i : i + 5]) for i in range(len(card_ranks) - 4)] + ["A5432"]


def three_of_a_kind_ranks() -> list[str]:
    """return all possible ranks of three of a kind, higher to lower rank.
    [AAAKQ, AAAKJ, ..., 22253, 22243]
    """
    card_ranks = list("AKQJ") + [str(n) for n in reversed(range(2, 11))]
    return [
        card_rank * 3 + "".join(kickers_rank)
        for card_rank in card_ranks
        for kickers_rank in combinations([i for i in card_ranks if i != card_rank], 2)
    ]


def two_pairs_ranks() -> list[str]:
    """return all possible ranks of two pairs, higher to lower rank.
    [AAKKQ, AAKKJ, ..., 33225, 33224]
    """
    card_ranks = list("AKQJ") + [str(n) for n in reversed(range(2, 11))]
    return [
        pair_ranks[0] * 2 + pair_ranks[1] * 2 + kicker_rank
        for pair_ranks in combinations(card_ranks, 2)
        for kicker_rank in [i for i in card_ranks if i not in pair_ranks]
    ]


def one_pair_ranks() -> list[str]:
    """return all possible ranks of one pair, higher to lower rank.
    [AAKQJ, AAKQ10, ..., 22643, 22543]
    """
    card_ranks = list("AKQJ") + [str(n) for n in reversed(range(2, 11))]
    return [
        card_rank * 2 + "".join(kickers_rank)
        for card_rank in card_ranks
        for kickers_rank in combinations([i for i in card_ranks if i != card_rank], 3)
    ]


def high_card_ranks() -> list[str]:
    """return all possible ranks of high card, higher to lower rank.
    [AKQJ9, AKQJ8, ..., 75432]
    """
    card_ranks = list("AKQJ") + [str(n) for n in reversed(range(2, 11))]
    result = ["".join(ranks) for ranks in combinations(card_ranks, 5)]
    for straight_rank in straight_ranks():
        result.remove(straight_rank)
    return result


def hand_rank_key(hand: Hand) -> int:
    """return rank_key of a hand"""
    ranks = list(
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
    return ranks.index(hand_rank(hand))


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
        elif hand_rank(hand) == hand_rank(best_hand):
            result.append(str(hand))
    return result
