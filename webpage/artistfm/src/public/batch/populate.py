import json
import time

import pandas as pd
import requests


class ModelBuilder:
    file_location = "../../../../../preprocessing/list.csv"

    def __init__(self):
        self.build_trainset()

    def build_trainset(self):
        ru = requests.get("http://172.24.101.30:8082/api/user")
        ra = requests.get("http://172.24.101.30:8082/api/artist")
        all_users = ru.json()
        all_artists = ra.json()

        df = pd.read_csv(self.file_location, delimiter=",",
                         encoding="utf-8", error_bad_lines=False, low_memory=False)

        for i in range(243037, len(df)):
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

    def _get_user_db_id(self, all_users, soughtUserId):
        for user in all_users:
            if user['user_email'] == soughtUserId:
                return user['id']

    def _get_artist_db_id(self, all_artists, soughtArtistId):
        for artist in all_artists:
            if artist['artist_musicbrainz'] == soughtArtistId:
                return artist['id']


start_time = time.time()
model_builder = ModelBuilder()
print('Time elapsed to populate: {:9.2f} seconds'.format(
    time.time()-start_time))
