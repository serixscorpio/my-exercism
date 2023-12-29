VOWELS = "aeiou"
VOWELISH_SEQUENCE = ["xr", "yt"]


def begins_with_vowel_sound(word: str) -> bool:
    """Decide if a word starts with a vowel sound."""
    return word[0] in VOWELS or word[:2] in VOWELISH_SEQUENCE


def vowel_sound_starts_at(word: str) -> int:
    """Find a word's vowel sound starting index."""
    if begins_with_vowel_sound(word):
        return 0
    for i in range(1, len(word)):
        if word[i] in (VOWELS + "y"):
            # account for word starts with a consonant sound followed by "qu"
            if word[i - 1 : i + 1] == "qu":
                return i + 1
            return i
    return len(word)


def translate_word(word: str) -> str:
    """Translate a word into pig latin."""
    boundary = vowel_sound_starts_at(word)
    return word[boundary:] + word[:boundary] + "ay"


def translate(text: str) -> str:
    """Translate a text (could be a sentence) into pig latin."""
    return " ".join(map(translate_word, text.split()))
