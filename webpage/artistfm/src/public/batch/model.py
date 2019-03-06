import json
import time

import pandas as pd
import requests
from surprise import Dataset, Reader

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
        ru = requests.get("http://172.24.101.30:8082/api/user")
        ra = requests.get("http://172.24.101.30:8082/api/artist")
        all_users = ru.json()
        all_artists = ra.json()

        df = pd.read_csv(self.file_location, delimiter=",",
                         encoding="utf-8", error_bad_lines=False, low_memory=False)

        for i in range(294590, 0, -1):
            row = df.iloc[[i]]
            row_to_insert = {'user_id': self._get_user_db_id(all_users, df.iat[i, 0]),
                             'artist_id': self._get_artist_db_id(all_artists, df.iat[i, 1]),
                             'rating_value': df.iat[i, 2]}
            r = requests.post(
                "http://172.24.101.30:8082/api/rating", json=row_to_insert)
            if r.status_code < 300 and i % 1000 == 0:
                print(i/len(df)*100)
            elif r.status_code < 300:
                pass
            else:
                print("Error en {}".format(i))

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
        all_predictions = {}
        for user in self.full_trainset.all_users:
            user_raw_id = self.full_trainset.to_raw_uid(user)
            all_predictions[user_raw_id] = self.predict_for_user(user_raw_id)

        with open('user_recomendations.json', 'w') as outfile:
            json.dump(all_predictions, outfile)

    def get_user_ratings(self):
        """
        User ratings as a dictionary of lists
        They key is the user raw id
        """
        raw_user_ratings = {}
        for user in self.full_trainset.ur:
            print('gato')
        return raw_user_ratings

# Create the top n predictions
# initial_predictions = algorithm.test(unrated_artists_and_users)


# self.full_trainset.to_inner_uid()
# self.full_trainset.to_inner_iid()
# self.full_trainset.to_raw_uid()
# self.full_trainset.to_raw_iid()

start_time = time.time()
model_builder = ModelBuilder()
top_10_predictions = model_builder.predict()
print(top_10_predictions)
print('Time elapsed for {}: {:9.2f} seconds'.format(
    model_builder.similarity_equation, time.time()-start_time))
