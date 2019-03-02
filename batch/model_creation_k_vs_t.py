import matplotlib.pyplot as plt
import numpy as np
import pandas as pd
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

default_k_value = 992
k_value_jaccard = 20
k_value_pearson = 40
k_value_cosine = 35
threshold_jaccard = 0.0
threshold_pearson = 0.0
threshold_cosine = 0.8

k_jaccard_algorithm = KNNBasic(k=k_value_jaccard, sim_options=sim_options_jaccard)
k_jaccard_algorithm.fit(train_set)
k_jaccard_predictions = k_jaccard_algorithm.test(test_set)
k_jaccard_rmse = accuracy.rmse(k_jaccard_predictions)

k_pearson_algorithm = KNNBasic(k=k_value_pearson, sim_options=sim_options_pearson)
k_pearson_algorithm.fit(train_set)
k_pearson_predictions = k_pearson_algorithm.test(test_set)
k_pearson_rmse = accuracy.rmse(k_pearson_predictions)

k_cosine_algorithm = KNNBasic(k=k_value_cosine, sim_options=sim_options_cosine)
k_cosine_algorithm.fit(train_set)
k_cosine_predictions = k_cosine_algorithm.test(test_set)
k_cosine_rmse = accuracy.rmse(k_cosine_predictions)

t_jaccard_algorithm = KNNBasic(k=default_k_value, threshold=threshold_jaccard,  sim_options=sim_options_jaccard)
t_jaccard_algorithm.fit(train_set)
t_jaccard_predictions = t_jaccard_algorithm.test(test_set)
t_jaccard_rmse = accuracy.rmse(t_jaccard_predictions)

t_pearson_algorithm = KNNBasic(k=default_k_value, threshold=threshold_pearson,  sim_options=sim_options_pearson)
t_pearson_algorithm.fit(train_set)
t_pearson_predictions = t_pearson_algorithm.test(test_set)
t_pearson_rmse = accuracy.rmse(t_pearson_predictions)

t_cosine_algorithm = KNNBasic(k=default_k_value, threshold=threshold_cosine, sim_options=sim_options_cosine)
t_cosine_algorithm.fit(train_set)
t_cosine_predictions = t_cosine_algorithm.test(test_set)
t_cosine_rmse = accuracy.rmse(t_cosine_predictions)

algorithms = ['Jaccard (k)', 'Jaccard (t)', 'Pearson (k)', 'Pearson (t)', 'Cosine (k)', 'Cosine (t)']
y_pos = np.arange(len(algorithms))
errors = [k_jaccard_rmse, t_jaccard_rmse, k_pearson_rmse, t_pearson_rmse, k_cosine_rmse, t_cosine_rmse]
plt.barh(y_pos, errors, align='center', alpha=0.5)
plt.yticks(y_pos, algorithms)
plt.xticks(np.arange(min(errors)-0.01, max(errors)+0.01, 0.01))
plt.xlim(left=min(errors)-0.01)
plt.xlim(right=max(errors)+0.01)
plt.xlabel('Error')
plt.show()

