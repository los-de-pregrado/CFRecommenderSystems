import numpy as np

from six.moves import range
from six import iteritems


def jaccard(n_x, yr, min_support):
    """
    Compute the jaccard similarity index between
    all pairs of users (or items).
    """
    # print("This is yr: {}".format(yr))
    # print("This is n_x: {}".format(n_x))
    # print("This is min_support: {}".format(min_support))

    xi = 0
    xj = 0

    intersect = np.zeros((n_x, n_x), np.double)
    total = np.zeros(n_x, np.double)
    sim = np.zeros((n_x, n_x), np.double)

    for y, y_ratings in iteritems(yr):
        for xi, ri in y_ratings:
            total[xi] += 1
            for xj, rj in y_ratings:
                intersect[xi, xj] += 1

    for xi in range(n_x):
        sim[xi, xi] = 1
        for xj in range(xi + 1, n_x):
            if intersect[xi, xj] < min_support:
                sim[xi, xj] = 0
            else:
                denum = total[xi] + total[xj] - intersect[xi, xj]
                sim[xi, xj] = intersect[xi, xj] / denum

            sim[xj, xi] = sim[xi, xj]
            
    return sim
