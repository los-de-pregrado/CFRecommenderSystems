import json
import math

import pandas as pd
import requests
from scipy.special import ndtri
from surprise import Dataset, Reader

from models import KNNBasic


class ModelBuilder:
    file_location = "../../../../../preprocessing/list.csv"
    dataset_columns = ['UserId', 'ArtistId', 'rating_value']
    k_value = 40
    gamma = 15
    full_trainset = None
    similarity_equation = 'jaccard'
    sim_options_jaccard = {
        'name': similarity_equation,
        'user_based': True
    }

    def __init__(self):
        self.to_update = False
        self.update_data()

    def update_data(self):
        self.updating = True
        self.build_trainset()
        self.create_model()
        self.updating = False
        if self.to_update:
            self.to_update = False
            self.update_data()

    def set_to_update(self):
        self.to_update = True

    def build_trainset(self):
        r = requests.get("http://127.0.0.1:8082/api/rating")
        # r = requests.get("http://172.24.101.30:8082/api/rating")

        data = r.json()
        df = pd.concat([pd.DataFrame(x) for x in data], ignore_index=False)

        # df = pd.read_csv(self.file_location, delimiter=",",
        #                  encoding="utf-8", error_bad_lines=False, low_memory=False)

        reader = Reader(rating_scale=(1.0, 5.0))
        data = Dataset.load_from_df(df[self.dataset_columns], reader)
        full_trainset_temp = data.build_full_trainset()
        self.full_trainset = full_trainset_temp

    def create_model(self):
        # Create the algorithm
        algo_temp = KNNBasic(
            k=self.k_value, sim_options=self.sim_options_jaccard)
        # Create the similitude matrix (train the model)
        algo_temp.fit(self.full_trainset)
        self.algorithm = algo_temp

    def get_top_n(self, predictions, n=10):
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

    def predict_for_user(self, user_id, top_n=10):
        """
        Returns all predicitions for the given user
        """
        print("Getting recomendations for user {}".format(user_id))

        user_ratings = self.full_trainset.ur[self.full_trainset.to_inner_uid(
            user_id)]
        items = self.full_trainset.ir
        items_raw_ids = []

        # Transform inner ids to raw ids
        for item in items:
            item_raw_id = self.full_trainset.to_raw_iid(item)
            items_raw_ids.append(item_raw_id)

        # Predict for the given raw user id, for all raw item ids
        predictions = [self.algorithm.predict(
            user_id, item_id) for item_id in items_raw_ids]

        # Get the top predictions, as a list of item and ratings
        top_n_predictions = self.get_top_n(
            predictions, n=top_n + len(user_ratings))

        # Retrieve only item ids from the given user
        predicted_items = [predicted_item_id for predicted_item_id,
                           predicted_item_rating in top_n_predictions[user_id]]

        # Remove already rated items from the list
        for item_id, rating in user_ratings:
            item_raw_id = self.full_trainset.to_raw_iid(item_id)
            if item_raw_id in predicted_items:
                print('si esta guao')
                predicted_items.remove(item_raw_id)

        # Return only 10 items
        return predicted_items[:top_n]

    def ranking(self, top_n=10):
        items = self.full_trainset.ir
        items_ranking = {}
        for item in items:
            item_raw_id = self.full_trainset.to_raw_iid(item)
            n = 0
            average = 0
            pos = 0
            for user, rating in items[item]:
                n += 1
                average += rating
            average = average / n
            pos = len(
                [rating for user, rating in items[item] if rating > average])
            confidence = 0.95
            items_ranking[item_raw_id] = self.ci_lower_bound(
                pos, n, confidence)
        ranking = sorted(items_ranking, key=items_ranking.get, reverse=True)
        print(len(ranking[:top_n]))
        return ranking[:top_n]

    def ci_lower_bound(self, pos, n, confidence):
        if n == 0:
            return 0
        z = ndtri(1-(1-confidence)/2)
        phat = 1.0*pos/n
        return (phat + z*z/(2*n) - z * math.sqrt((phat*(1-phat)+z*z/(4*n))/n))/(1+z*z/n)
