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
gammas = [15, 20, 25, 30, 35]
k_value_jaccard = 20
k_value_pearson = 35
k_value_mclaughlin_1 = 50
k_value_mclaughlin_2 = 60
k_value_mclaughlin_3 = 70
k_value_mclaughlin_4 = 80
k_value_mclaughlin_5 = 90
k_value_mclaughlin_6 = 100

jaccard_rmse_values = []
jaccard_min_error = 1
jaccard_min_error_index = 0

pearson_rmse_values = []
pearson_min_error = 1
pearson_min_error_index = 0

mclaughlin_1_rmse_values = []
mclaughlin_1_min_error = 1
mclaughlin_1_min_error_index = 0

mclaughlin_2_rmse_values = []
mclaughlin_2_min_error = 1
mclaughlin_2_min_error_index = 0

mclaughlin_3_rmse_values = []
mclaughlin_3_min_error = 1
mclaughlin_3_min_error_index = 0

mclaughlin_4_rmse_values = []
mclaughlin_4_min_error = 1
mclaughlin_4_min_error_index = 0

mclaughlin_5_rmse_values = []
mclaughlin_5_min_error = 1
mclaughlin_5_min_error_index = 0

mclaughlin_6_rmse_values = []
mclaughlin_6_min_error = 1
mclaughlin_6_min_error_index = 0
index = 0

jaccard_algorithm = KNNBasic(k=k_value_jaccard, sim_options=sim_options_jaccard)
jaccard_algorithm.fit(train_set)
jaccard_predictions = jaccard_algorithm.test(test_set)
jaccard_rmse = accuracy.rmse(jaccard_predictions)

pearson_algorithm = KNNBasic(k=k_value_pearson, sim_options=sim_options_pearson)
pearson_algorithm.fit(train_set)
pearson_predictions = pearson_algorithm.test(test_set)
pearson_rmse = accuracy.rmse(pearson_predictions)

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

    mclaughlin_4_algorithm = KNNBasic(k=k_value_mclaughlin_4, sim_options=sim_options_mclaughlin)
    mclaughlin_4_algorithm.fit(train_set)
    mclaughlin_4_predictions = mclaughlin_4_algorithm.test(test_set)

    mclaughlin_5_algorithm = KNNBasic(k=k_value_mclaughlin_5, sim_options=sim_options_mclaughlin)
    mclaughlin_5_algorithm.fit(train_set)
    mclaughlin_5_predictions = mclaughlin_5_algorithm.test(test_set)

    mclaughlin_6_algorithm = KNNBasic(k=k_value_mclaughlin_6, sim_options=sim_options_mclaughlin)
    mclaughlin_6_algorithm.fit(train_set)
    mclaughlin_6_predictions = mclaughlin_6_algorithm.test(test_set)

    if jaccard_rmse < jaccard_min_error:
        jaccard_min_error = jaccard_rmse
        jaccard_min_error_index = index
    jaccard_rmse_values.append(jaccard_rmse)

    if pearson_rmse < pearson_min_error:
        pearson_min_error = pearson_rmse
        pearson_min_error_index = index
    pearson_rmse_values.append(pearson_rmse)
    
    mclaughlin_1_rmse = accuracy.rmse(mclaughlin_1_predictions)
    if mclaughlin_1_rmse < mclaughlin_1_min_error:
        mclaughlin_1_min_error = mclaughlin_1_rmse
        mclaughlin_1_min_error_index = index
    mclaughlin_1_rmse_values.append(mclaughlin_1_rmse)
    
    mclaughlin_2_rmse = accuracy.rmse(mclaughlin_2_predictions)
    if mclaughlin_2_rmse < mclaughlin_2_min_error:
        mclaughlin_2_min_error = mclaughlin_2_rmse
        mclaughlin_2_min_error_index = index
    mclaughlin_2_rmse_values.append(mclaughlin_2_rmse)

    mclaughlin_3_rmse = accuracy.rmse(mclaughlin_3_predictions)
    if mclaughlin_3_rmse < mclaughlin_3_min_error:
        mclaughlin_3_min_error = mclaughlin_3_rmse
        mclaughlin_3_min_error_index = index
    mclaughlin_3_rmse_values.append(mclaughlin_3_rmse)
 
    mclaughlin_4_rmse = accuracy.rmse(mclaughlin_4_predictions)
    if mclaughlin_4_rmse < mclaughlin_4_min_error:
        mclaughlin_4_min_error = mclaughlin_4_rmse
        mclaughlin_4_min_error_index = index
    mclaughlin_4_rmse_values.append(mclaughlin_4_rmse)
 
    mclaughlin_5_rmse = accuracy.rmse(mclaughlin_5_predictions)
    if mclaughlin_5_rmse < mclaughlin_5_min_error:
        mclaughlin_5_min_error = mclaughlin_5_rmse
        mclaughlin_5_min_error_index = index
    mclaughlin_5_rmse_values.append(mclaughlin_5_rmse)
 
    mclaughlin_6_rmse = accuracy.rmse(mclaughlin_6_predictions)
    if mclaughlin_6_rmse < mclaughlin_6_min_error:
        mclaughlin_6_min_error = mclaughlin_6_rmse
        mclaughlin_6_min_error_index = index
    mclaughlin_6_rmse_values.append(mclaughlin_6_rmse)
    
    index = index + 1
    print("We are {}0% done.".format(index))

plt.plot(gammas, jaccard_rmse_values, 'b', label='Jaccard RMSE')
plt.plot(gammas[jaccard_min_error_index], jaccard_rmse_values[jaccard_min_error_index], 'bo')

plt.plot(gammas, pearson_rmse_values, 'g', label='Pearson RMSE')
plt.plot(gammas[pearson_min_error_index], pearson_rmse_values[pearson_min_error_index], 'go')

plt.plot(gammas, mclaughlin_1_rmse_values, 'y', label='McLaughlin k={} RMSE'.format(k_value_mclaughlin_1))
plt.plot(gammas[mclaughlin_1_min_error_index], mclaughlin_1_rmse_values[mclaughlin_1_min_error_index], 'yo')

plt.plot(gammas, mclaughlin_2_rmse_values, 'm', label='McLaughlin k={} RMSE'.format(k_value_mclaughlin_2))
plt.plot(gammas[mclaughlin_2_min_error_index], mclaughlin_2_rmse_values[mclaughlin_2_min_error_index], 'mo')

plt.plot(gammas, mclaughlin_3_rmse_values, 'r', label='McLaughlin k={} RMSE'.format(k_value_mclaughlin_3))
plt.plot(gammas[mclaughlin_3_min_error_index], mclaughlin_3_rmse_values[mclaughlin_3_min_error_index], 'ro')

plt.plot(gammas, mclaughlin_4_rmse_values, 'c', label='McLaughlin k={} RMSE'.format(k_value_mclaughlin_4))
plt.plot(gammas[mclaughlin_4_min_error_index], mclaughlin_4_rmse_values[mclaughlin_4_min_error_index], 'co')

plt.plot(gammas, mclaughlin_5_rmse_values, 'k', label='McLaughlin k={} RMSE'.format(k_value_mclaughlin_5))
plt.plot(gammas[mclaughlin_5_min_error_index], mclaughlin_5_rmse_values[mclaughlin_5_min_error_index], 'ko')

plt.plot(gammas, mclaughlin_6_rmse_values, c='#e65100', label='McLaughlin k={} RMSE'.format(k_value_mclaughlin_6))
plt.plot(gammas[mclaughlin_6_min_error_index], mclaughlin_6_rmse_values[mclaughlin_6_min_error_index], 'ro')

plt.ylabel('Error')
plt.xlabel('Gama (Y)')
plt.xticks(np.arange(min(gammas), max(gammas)+1, 10.0))
plt.legend(loc='best')
plt.savefig('../results/mclaughlin-rmse-user.png')
plt.show()
