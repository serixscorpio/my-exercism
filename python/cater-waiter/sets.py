"""cater waiter"""

from typing import Union
from sets_categories_data import (
    VEGAN, VEGETARIAN, PALEO, KETO, OMNIVORE,
    ALCOHOLS,
    SPECIAL_INGREDIENTS,
)


def clean_ingredients(dish_name: str, dish_ingredients: list[str]) -> tuple[str, set]:
    """

    :param dish_name: str
    :param dish_ingredients: list
    :return: tuple of (dish_name, ingredient set)

    This function should return a `tuple` with the name of the dish as the first item,
    followed by the de-duped `set` of ingredients as the second item.
    """
    return dish_name, set(dish_ingredients)


def check_drinks(drink_name: str, drink_ingredients: list[str]) -> str:
    """

    :param drink_name: str
    :param drink_ingredients: list
    :return: str drink name + ("Mocktail" or "Cocktail")

    The function should return the name of the drink followed by "Mocktail" if the drink has
    no alcoholic ingredients, and drink name followed by "Cocktail" if the drink includes alcohol.
    """
    if ALCOHOLS.isdisjoint(clean_ingredients(drink_name, drink_ingredients)[1]):
        return f"{drink_name} Mocktail"
    return f"{drink_name} Cocktail"


def categorize_dish(dish_name: str, dish_ingredients: list[str]) -> str:
    """

    :param dish_name: str
    :param dish_ingredients: list
    :return: str "dish name: CATEGORY"

    This function should return a string with the `dish name: <CATEGORY>` (which meal category the
    dish belongs to).
    All dishes will "fit" into one of the categories imported from `sets_categories_data.py`
    (VEGAN, VEGETARIAN, PALEO, KETO, or OMNIVORE).
    """
    cleaned_ingredients = clean_ingredients(dish_name, dish_ingredients)
    category_lookup = globals()
    for category_name in ("VEGAN", "VEGETARIAN", "PALEO", "KETO", "OMNIVORE"):
        if cleaned_ingredients[1].issubset(category_lookup[category_name]):
            return f"{dish_name}: {category_name}"
    return ""


def tag_special_ingredients(dish: tuple[str, Union[list, set]]) -> tuple[str, set]:
    """

    :param dish: tuple of (str of dish name, list of dish ingredients)
    :return: tuple of (str of dish name, set of dish special ingredients)

    Return the dish name followed by the `set` of ingredients that require a special note on the
    dish description.
    For the purposes of this exercise, all allergens or special ingredients that need to be tracked
    are in the SPECIAL_INGREDIENTS constant imported from `sets_categories_data.py`.
    """

    return dish[0], SPECIAL_INGREDIENTS & set(dish[1])


def compile_ingredients(dishes: list[set]) -> set:
    """

    :param dishes: list of dish ingredient sets
    :return: set

    This function should return a `set` of all ingredients from all listed dishes.
    """
    master_ingredients: set = set()
    for dish in dishes:
        master_ingredients |= dish
    return master_ingredients


def separate_appetizers(dishes: list[str], appetizers: list[str]) -> list[str]:
    """

    :param dishes: list of dish names
    :param appetizers: list of appetizer names
    :return: list of dish names

    The function should return the list of dish names with appetizer names removed.
    Either list could contain duplicates and may require de-duping.
    """
    appetizers_set = set(appetizers)

    def is_not_appetizer(dish: str) -> bool:
        return dish not in appetizers_set

    return [dish for dish in set(dishes) if is_not_appetizer(dish)]


def singleton_ingredients(dishes: list[set], intersection: set) -> set:
    """

    :param intersection: constant - one of (VEGAN_INTERSECTION,VEGETARIAN_INTERSECTION,
                                            PALEO_INTERSECTION,
                                            KETO_INTERSECTION,OMNIVORE_INTERSECTION)
    :param dishes:  list of ingredient sets
    :return: set of singleton ingredients

    Each dish is represented by a `set` of its ingredients.
    Each `<CATEGORY>_INTERSECTION` is an `intersection` of all dishes in the category.
    The function should return a `set` of ingredients that only appear in a single dish.
    """
    return compile_ingredients(dishes) - intersection
