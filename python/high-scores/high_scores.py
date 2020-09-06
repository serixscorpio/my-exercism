def latest(scores):
    return scores[-1]


def personal_best(scores):
    best_score = scores[0]
    for score in scores:
        if score > best_score:
            best_score = score
    return best_score


def personal_top_three(scores):
    scores.sort(reverse=True)
    return scores[0:3]
