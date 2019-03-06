import json
import time

import matplotlib.pyplot as plt
import numpy as np
import pandas as pd
import requests
from six import iteritems
from surprise import SVD, AlgoBase, Dataset, Reader, accuracy
from surprise.model_selection import train_test_split
import threading
from models import KNNBasic


class ModelBuilder:
    file_location = "../../../../../preprocessing/list.csv"
    dataset_columns = ['userId', 'artistId', 'rating']
    k_value = 40
    gamma = 15
    full_trainset = None
    similarity_equation = 'jaccard'
    sim_options_jaccard = {
        'name': similarity_equation,
        'user_based': True
    }

    def __init__(self):
        self.build_trainset()
        self.create_model()

    def build_trainset(self):
        # # r = requests.get("http://127.0.0.1:8082/api/ratings")
        # r = requests.get("http://172.24.101.30:8082/api/rating")
        # print(r)
        # # print(r)
        # data = r.json()
        # print(data)
        # df = pd.concat([pd.DataFrame(x) for x in data], ignore_index=False)

        df = pd.read_csv(self.file_location, delimiter=",",
                         encoding="utf-8", error_bad_lines=False, low_memory=False)

        reader = Reader(rating_scale=(1.0, 5.0))
        data = Dataset.load_from_df(
            df[self.dataset_columns], reader)
        self.full_trainset = data.build_full_trainset()

    def _get_user_db_id(self, all_users, soughtUserId):
        for user in all_users:
            if user['user_email'] == soughtUserId:
                return user['id']

    def _get_artist_db_id(self, all_artists, soughtArtistId):
        for artist in all_artists:
            if artist['artist_musicbrainz'] == soughtArtistId:
                return artist['id']

    def create_model(self):
        # Create the algorithm
        self.algorithm = KNNBasic(k=self.k_value,
                                  sim_options=self.sim_options_jaccard)

        # Create the similitude matrix (train the model)
        self.algorithm.fit(self.full_trainset)

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
        given_user_inner_id = self.full_trainset.to_inner_uid(user_id)
        items = self.full_trainset.ir
        filtered_items = []
        for item in items:
            item_raw_id = self.full_trainset.to_raw_iid(item)
            can_add = True
            for user_inner_id, rating in items[item]:
                if user_inner_id == given_user_inner_id:
                    can_add = False
            if item_raw_id in filtered_items:
                can_add = False
            if can_add:
                filtered_items.append(item_raw_id)

        predictions = [self.algorithm.predict(
            user_id, item_id) for item_id in filtered_items]
        top_n_predictions = self.get_top_n(predictions, n=top_n)
        predicted_items = [predicted_item_id for predicted_item_id,
                           predicted_item_rating in top_n_predictions[user_id]]
        return predicted_items
        # # Create user-artist touples that aren't in the the trainset
        # unrated_artists_and_users = self.full_trainset.build_anti_testset()

        # print(unrated_artists_and_users[:2])
    def predict(self, top_n=10):
        """
        Returns all predicitions for all users
        """
        # For small data, this works
        # testset = self.full_trainset.build_anti_testset()
        # predictions = self.algorithm.test(testset)
        # return self.get_top_n(predictions, n=top_n)
        print('Getting all predictions')
        all_predictions = {}
        for user in self.full_trainset.all_users():
            user_raw_id = self.full_trainset.to_raw_uid(user)
            all_predictions[user_raw_id] = self.predict_for_user(
                user_raw_id, top_n=top_n)
        with open('user_recomendations.json', 'w') as outfile:
            json.dump(all_predictions, outfile)

    def update_data(self):
        print('Starting to update')
        self.build_trainset()
        self.create_model()
        self.predict()
        print('Done updating')

    def run(self):
        while(True):
            print('Launching thread')
            updating_thread = threading.Thread(
                target=self.update_data
            )
            updating_thread.start()
            time.sleep(300)


model_builder = ModelBuilder()
model_builder.run()
# Create the top n predictions
# initial_predictions = algorithm.test(unrated_artists_and_users)


# self.full_trainset.to_inner_uid()
# self.full_trainset.to_inner_iid()
# self.full_trainset.to_raw_uid()
# self.full_trainset.to_raw_iid()

# start_time = time.time()
# model_builder = ModelBuilder()
# model_builder.predict()
# print('Time elapsed for {}: {:9.2f} seconds'.format(
#     model_builder.similarity_equation, time.time()-start_time))


# model_builder = ModelBuilder()
