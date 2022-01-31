from typing import Union

Num = Union[float, int]


def round_scores(student_scores: list[Num]) -> list[int]:
    """
    :param student_scores: list of student exam scores as float or int.
    :return: list of student scores *rounded* to nearest integer value.
    """
    return list(map(round, student_scores))


def count_failed_students(student_scores: list[int]) -> int:
    """
    :param student_scores: list of integer student scores.
    :return: integer count of student scores at or below 40.
    """
    failed_count = 0
    for score in student_scores:
        if score <= 40:
            failed_count += 1
    return failed_count


def above_threshold(student_scores: list[int], threshold: int) -> list[int]:
    """
    :param student_scores: list of integer scores
    :param threshold :  integer
    :return: list of integer scores that are at or above the "best" threshold.
    """
    return list(filter(lambda score: score >= threshold, student_scores))


def letter_grades(highest: int) -> list[int]:
    """
    :param highest: integer of highest exam score.
    :return: list of integer lower threshold scores for each D-A letter grade interval.
             For example, where the highest score is 100, and failing is <= 40,
             The result would be [41, 56, 71, 86]:

             41 <= "D" <= 55
             56 <= "C" <= 70
             71 <= "B" <= 85
             86 <= "A" <= 100
    """
    score_range = highest - 41
    score_interval = round(score_range / 4)
    return list(range(41, highest, score_interval))


def student_ranking(student_scores: list[int], student_names: list[str]) -> list[str]:
    """
    :param student_scores: list of scores in descending order.
    :param student_names: list of names in descending order by exam score.
    :return: list of strings in format ["<rank>. <student name>: <score>"].
    """
    rankings = []
    for rank, (name, score) in enumerate(zip(student_names, student_scores)):
        rankings.append(f"{rank+1}. {name}: {score}")
    return rankings


def perfect_score(student_info: list[list]) -> list:
    """
    :param student_info: list of [<student name>, <score>] lists
    :return: first `[<student name>, 100]` or `[]` if no student score of 100 is found.
    """
    for name, score in student_info:
        if score == 100:
            return [name, score]
    return []
