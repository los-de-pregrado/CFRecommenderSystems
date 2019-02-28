from surprise import SVD
from surprise import Dataset
# from surprise.model_selection import cross_validate
from surprise import Reader
from surprise.model_selection import train_test_split
from surprise import KNNBasic
from surprise import accuracy
import matplotlib.pyplot as plt
from surprise import AlgoBase
import numpy as np


import pandas as pd


df = pd.read_csv("../preprocessing/list.csv", delimiter=",", encoding="utf-8", error_bad_lines=False)
reader = Reader(rating_scale=(1.0, 5.0))
data = Dataset.load_from_df(df[['userId', 'artistId', 'rating']], reader)
train_set, test_set = train_test_split(data, test_size=.25)

print(type(train_set))
print(type(test_set))

def get_top_n(predictions, n=10):
    # First map the predictions to each user.
    top_n = {}
    for uid, iid, true_r, est, _ in predictions:
        if uid not in top_n:
            top_n[uid] = [(iid, est)]
        else:
            top_n[uid].append((iid, est))

    for uid, user_ratings in top_n.items():
        user_ratings.sort(key=lambda x: x[1], reverse=True)
        top_n[uid] = user_ratings[:n]

    return top_n

class Jaccard(AlgoBase):
    def __init__(self):
        AlgoBase.__init__(self)

    def fit(self, trainset):

        # Here again: call base method before doing anything.
        AlgoBase.fit(self, trainset)

        # Compute the average rating. We might as well use the
        # trainset.global_mean attribute ;)
        self.the_mean = np.mean([r for (_, _, r) in
                                    self.trainset.all_ratings()])

        return self.the_mean

sim_options_pearson = {
    'name': 'pearson',
    'user_based': True,
}

sim_options_cosine = {
    'name': 'cosine',
    'user_based': True,
}

# kValues = [5, 10, 20, 40, 100, 150, 200, 300, 500]
# kValues = [5, 10, 20, 40, 60, 80]
# kValues = [30, 40, 50, 60, 70]
kValues = [5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 100]
rmseValues = []
minError = 1
minErrorIndex = 0
index = 0;
for kValue in kValues:
    algorithm = KNNBasic(k=kValue, sim_options=sim_options)
    algorithm.fit(train_set)
    predictions = algorithm.test(test_set)

    print(get_top_n(predictions, 10))

    fcp = accuracy.fcp(predictions)
    mae = accuracy.mae(predictions)
    rmse = accuracy.rmse(predictions)
    if mae < minErrors['mae']:
        minErrors['mae'] = mae
        minErrorsIndex['mae'] = index
    if rmse < minErrors['rmse']:
        minErrors['rmse'] = rmse
        minErrorsIndex['rmse'] = index
    maeValues.append(mae)
    rmseValues.append(rmse)
    index = index + 1

plt.plot(kValues, maeValues, 'b', label='MAE')
plt.plot(kValues[minErrorsIndex['mae']], maeValues[minErrorsIndex['mae']], 'bo')
plt.plot(kValues, rmseValues, 'g', label='RMSE')
plt.plot(kValues[minErrorsIndex['rmse']], rmseValues[minErrorsIndex['rmse']], 'go')
plt.ylabel('Accuracy')
plt.xlabel('Number of neighbors (k)')
plt.legend(loc='upper right')
plt.show()

# Run 5-fold cross-validation and print results
# cross_validate(algorithm, data, measures=['RMSE', 'MAE'], cv=5, verbose=True)