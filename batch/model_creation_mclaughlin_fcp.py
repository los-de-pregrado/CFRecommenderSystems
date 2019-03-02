import matplotlib.pyplot as plt
import numpy as np
import pandas as pd
# from surprise.model_selection import cross_validate
from surprise import SVD, AlgoBase, Dataset, Reader, accuracy
from surprise.model_selection import train_test_split

from models import KNNBasic

df = pd.read_csv("../preprocessing/list.csv", delimiter=",",
                 encoding="utf-8", error_bad_lines=False)
reader = Reader(rating_scale=(1.0, 5.0))
data = Dataset.load_from_df(df[['userId', 'artistId', 'rating']], reader)
train_set, test_set = train_test_split(data, test_size=.25)


sim_options_jaccard = {
    'name': 'jaccard',
    'user_based': True,
}

sim_options_pearson = {
    'name': 'pearson',
    'user_based': True,
}

sim_options_cosine = {
    'name': 'cosine',
    'user_based': True,
}

# gammas = [1, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]
gammas = [15, 20, 25]
k_value_jaccard = 20
k_value_pearson = 35
k_value_mclaughlin_1 = 40
k_value_mclaughlin_2 = 45
k_value_mclaughlin_3 = 50

jaccard_fcp_values = []
jaccard_max = 1
jaccard_max_index = 0

pearson_fcp_values = []
pearson_max = 1
pearson_max_index = 0

mclaughlin_1_fcp_values = []
mclaughlin_1_max = 1
mclaughlin_1_max_index = 0

mclaughlin_2_fcp_values = []
mclaughlin_2_max = 1
mclaughlin_2_max_index = 0

mclaughlin_3_fcp_values = []
mclaughlin_3_max = 1
mclaughlin_3_max_index = 0

index = 0

jaccard_algorithm = KNNBasic(k=k_value_jaccard, sim_options=sim_options_jaccard)
jaccard_algorithm.fit(train_set)
jaccard_predictions = jaccard_algorithm.test(test_set)
jaccard_fcp = accuracy.fcp(jaccard_predictions)

pearson_algorithm = KNNBasic(k=k_value_pearson, sim_options=sim_options_pearson)
pearson_algorithm.fit(train_set)
pearson_predictions = pearson_algorithm.test(test_set)
pearson_fcp = accuracy.fcp(pearson_predictions)

for gamma in gammas:
    sim_options_mclaughlin = {
        'name': 'mclaughlin',
        'user_based': True,
        'min_support': gamma
    }

    mclaughlin_1_algorithm = KNNBasic(k=k_value_mclaughlin_1, sim_options=sim_options_mclaughlin)
    mclaughlin_1_algorithm.fit(train_set)
    mclaughlin_1_predictions = mclaughlin_1_algorithm.test(test_set)

    mclaughlin_2_algorithm = KNNBasic(k=k_value_mclaughlin_2, sim_options=sim_options_mclaughlin)
    mclaughlin_2_algorithm.fit(train_set)
    mclaughlin_2_predictions = mclaughlin_2_algorithm.test(test_set)

    mclaughlin_3_algorithm = KNNBasic(k=k_value_mclaughlin_3, sim_options=sim_options_mclaughlin)
    mclaughlin_3_algorithm.fit(train_set)
    mclaughlin_3_predictions = mclaughlin_3_algorithm.test(test_set)

    if jaccard_fcp > jaccard_max:
        jaccard_max = jaccard_fcp
        jaccard_max_index = index
    jaccard_fcp_values.append(jaccard_fcp)

    if pearson_fcp > pearson_max:
        pearson_max = pearson_fcp
        pearson_max_index = index
    pearson_fcp_values.append(pearson_fcp)
    
    mclaughlin_1_fcp = accuracy.fcp(mclaughlin_1_predictions)
    if mclaughlin_1_fcp > mclaughlin_1_max:
        mclaughlin_1_max = mclaughlin_1_fcp
        mclaughlin_1_max_index = index
    mclaughlin_1_fcp_values.append(mclaughlin_1_fcp)
    
    mclaughlin_2_fcp = accuracy.fcp(mclaughlin_2_predictions)
    if mclaughlin_2_fcp > mclaughlin_2_max:
        mclaughlin_2_max = mclaughlin_2_fcp
        mclaughlin_2_max_index = index
    mclaughlin_2_fcp_values.append(mclaughlin_2_fcp)

    mclaughlin_3_fcp = accuracy.fcp(mclaughlin_3_predictions)
    if mclaughlin_3_fcp > mclaughlin_3_max:
        mclaughlin_3_max = mclaughlin_3_fcp
        mclaughlin_3_max_index = index
    mclaughlin_3_fcp_values.append(mclaughlin_3_fcp)
    
    index = index + 1
    print("We are {}0% done.".format(index))

plt.plot(gammas, jaccard_fcp_values, 'b', label='Jaccard FCP')
plt.plot(gammas[jaccard_max_index], jaccard_fcp_values[jaccard_max_index], 'bo')

plt.plot(gammas, pearson_fcp_values, 'g', label='Pearson FCP')
plt.plot(gammas[pearson_max_index], pearson_fcp_values[pearson_max_index], 'go')

plt.plot(gammas, mclaughlin_1_fcp_values, 'y', label='McLaughlin k={} FCP'.format(k_value_mclaughlin_1))
plt.plot(gammas[mclaughlin_1_max_index], mclaughlin_1_fcp_values[mclaughlin_1_max_index], 'yo')

plt.plot(gammas, mclaughlin_2_fcp_values, 'm', label='McLaughlin k={} FCP'.format(k_value_mclaughlin_2))
plt.plot(gammas[mclaughlin_2_max_index], mclaughlin_2_fcp_values[mclaughlin_2_max_index], 'mo')

plt.plot(gammas, mclaughlin_3_fcp_values, 'r', label='McLaughlin k={} FCP'.format(k_value_mclaughlin_3))
plt.plot(gammas[mclaughlin_3_max_index], mclaughlin_3_fcp_values[mclaughlin_3_max_index], 'ro')

plt.ylabel('FCP')
plt.xlabel('Gama (Y)')
plt.xticks(np.arange(min(gammas), max(gammas)+1, 10.0))
plt.legend(loc='best')
plt.savefig('../results/mclaughlin-fcp-user.png')
plt.show()
