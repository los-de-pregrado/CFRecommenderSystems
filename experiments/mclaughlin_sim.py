import numpy as np
from six import iteritems
from six.moves import range


def mclaughlin(n_x, yr, min_support):
    """
    Compute the mclaughlin similarity index between
    all pairs of users (or items) with a given gamma (min_support)
    """

    freq = np.zeros((n_x, n_x), np.int)
    prods = np.zeros((n_x, n_x), np.double)
    sqi = np.zeros((n_x, n_x), np.double)
    sqj = np.zeros((n_x, n_x), np.double)
    si = np.zeros((n_x, n_x), np.double)
    sj = np.zeros((n_x, n_x), np.double)
    sim = np.zeros((n_x, n_x), np.double)

    for y, y_ratings in iteritems(yr):
        for xi, ri in y_ratings:
            for xj, rj in y_ratings:
                prods[xi, xj] += ri * rj
                freq[xi, xj] += 1
                sqi[xi, xj] += ri**2
                sqj[xi, xj] += rj**2
                si[xi, xj] += ri
                sj[xi, xj] += rj

    for xi in range(n_x):
        sim[xi, xi] = 1
        for xj in range(xi + 1, n_x):

            if freq[xi, xj] < 1:
                sim[xi, xj] = 0
            else:
                n = freq[xi, xj]
                num = n * prods[xi, xj] - si[xi, xj] * sj[xi, xj]
                denum = np.sqrt((n * sqi[xi, xj] - si[xi, xj]**2) *
                                (n * sqj[xi, xj] - sj[xi, xj]**2))
                if denum == 0:
                    sim[xi, xj] = 0
                else:
                    if n > min_support:
                        sim[xi, xj] = num / denum * n / min_support
                    else:
                        sim[xi, xj] = num / denum

            sim[xj, xi] = sim[xi, xj]

    return sim
