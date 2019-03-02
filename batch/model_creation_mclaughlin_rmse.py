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

gammas = [1, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]
k_value_jaccard = 20
k_value_pearson = 35
k_value_mclaughlin_1 = 20
k_value_mclaughlin_2 = 25
k_value_mclaughlin_3 = 30
k_value_mclaughlin_4 = 35

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
index = 0

for gamma in gammas:
    jaccard_algorithm = KNNBasic(k=k_value_jaccard, sim_options=sim_options_jaccard)
    jaccard_algorithm.fit(train_set)
    jaccard_predictions = jaccard_algorithm.test(test_set)

    pearson_algorithm = KNNBasic(k=k_value_pearson, sim_options=sim_options_pearson)
    pearson_algorithm.fit(train_set)
    pearson_predictions = pearson_algorithm.test(test_set)

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

    jaccard_rmse = accuracy.rmse(jaccard_predictions)
    if jaccard_rmse < jaccard_min_error:
        jaccard_min_error = jaccard_rmse
        jaccard_min_error_index = index
    jaccard_rmse_values.append(jaccard_rmse)

    pearson_rmse = accuracy.rmse(pearson_predictions)
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

    index = index + 1

plt.plot(gammas, jaccard_rmse_values, 'b', label='Jaccard RMSE')
plt.plot(gammas[jaccard_min_error_index], jaccard_rmse_values[jaccard_min_error_index], 'bo')
plt.plot(gammas, pearson_rmse_values, 'g', label='Pearson RMSE')
plt.plot(gammas[pearson_min_error_index], pearson_rmse_values[pearson_min_error_index], 'go')
plt.plot(gammas, mclaughlin_1_rmse_values, 'r', label='McLaughlin k=20 RMSE')
plt.plot(gammas[mclaughlin_1_min_error_index], mclaughlin_1_rmse_values[mclaughlin_1_min_error_index], 'ro')
plt.plot(gammas, mclaughlin_2_rmse_values, 'r', label='McLaughlin k=25 RMSE')
plt.plot(gammas[mclaughlin_2_min_error_index], mclaughlin_2_rmse_values[mclaughlin_2_min_error_index], 'ro')
plt.plot(gammas, mclaughlin_3_rmse_values, 'r', label='McLaughlin k=30 RMSE')
plt.plot(gammas[mclaughlin_3_min_error_index], mclaughlin_3_rmse_values[mclaughlin_3_min_error_index], 'ro')
plt.ylabel('Error')
plt.xlabel('Gama (Y)')
plt.xticks(np.arange(min(gammas), max(gammas)+1, 10.0))
plt.legend(loc='upper right')
plt.show()
