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
    'user_based': True
}

sim_options_pearson = {
    'name': 'pearson',
    'user_based': True,
}

sim_options_cosine = {
    'name': 'cosine',
    'user_based': True,
}

thresholds = [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1]
k_value = 992
repetitions = 10
jaccard_rmse_values = []
jaccard_min_error = 1
jaccard_min_error_index = 0

pearson_rmse_values = []
pearson_min_error = 1
pearson_min_error_index = 0

cosine_rmse_values = []
cosine_min_error = 1
cosine_min_error_index = 0
index = 0

for threshold in thresholds:
    jaccard_algorithm = KNNBasic(k=k_value, threshold=threshold, sim_options=sim_options_jaccard)
    jaccard_algorithm.fit(train_set)
    jaccard_predictions = jaccard_algorithm.test(test_set)

    pearson_algorithm = KNNBasic(k=k_value, threshold=threshold, sim_options=sim_options_pearson)
    pearson_algorithm.fit(train_set)
    pearson_predictions = pearson_algorithm.test(test_set)

    cosine_algorithm = KNNBasic(k=k_value, threshold=threshold, sim_options=sim_options_cosine)
    cosine_algorithm.fit(train_set)
    cosine_predictions = cosine_algorithm.test(test_set)

    # print(get_top_n(predictions, 10))

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
    
    cosine_rmse = accuracy.rmse(cosine_predictions)
    if cosine_rmse < cosine_min_error:
        cosine_min_error = cosine_rmse
        cosine_min_error_index = index
    cosine_rmse_values.append(cosine_rmse)
    index = index + 1

plt.plot(thresholds, jaccard_rmse_values, 'b', label='Jaccard RMSE')
plt.plot(thresholds[jaccard_min_error_index], jaccard_rmse_values[jaccard_min_error_index], 'bo')
plt.plot(thresholds, pearson_rmse_values, 'g', label='Pearson RMSE')
plt.plot(thresholds[pearson_min_error_index], pearson_rmse_values[pearson_min_error_index], 'go')
plt.plot(thresholds, cosine_rmse_values, 'r', label='Cosine RMSE')
plt.plot(thresholds[cosine_min_error_index], cosine_rmse_values[cosine_min_error_index], 'ro')
plt.ylabel('Error')
plt.xlabel('Similarity threshold (t)')
plt.xticks(np.arange(min(thresholds), max(thresholds)+0.1, 0.1))
plt.legend(loc='upper right')
plt.show()
