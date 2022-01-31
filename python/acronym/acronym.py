"""Turn words into an acronym"""


def remove_emphasis(words: str) -> str:
    """remove underscore characters"""
    return words.replace("_", "")


def abbreviate_word(word: str) -> str:
    """return uppercased first letter of word"""
    return word[0].upper()


def unhyphenate(words: str) -> str:
    """replace hyphends with spaces"""
    return words.replace("-", " ")


def abbreviate(words: str) -> str:
    """Turn words into an acronym
    The words are unhyphenated, then emhpasis removed, then each word
    is abbreviated and joined together to form an acronym.
    """
    return "".join(map(abbreviate_word, remove_emphasis(unhyphenate(words)).split()))
