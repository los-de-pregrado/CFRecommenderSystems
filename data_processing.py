import numpy as np
import pandas as pd

class DataProcessor:

    MUSIC_LISTENING_HABITS_TSV = 'userid-timestamp-artid-artname-traid-traname.tsv'
    MUSIC_LISTENING_HABITS_NO_NULLS_CSV = 'raw-data-without-nulls.csv'
    AGGREGATED_MUSIC_LISTENING_HABITS = 'aggregate-data.csv'

    ROWS_TO_SKIP = [2120259, 2446317, 11141080, 11152098,
                    11152401, 11882086, 12902538, 12935043, 17589538]

    def remove_nulls(self):
        dfs = pd.read_csv(self.MUSIC_LISTENING_HABITS_TSV, delimiter="\t", encoding="utf-8", header=None, chunksize=100,
                          skiprows=lambda x: x in self.ROWS_TO_SKIP)
        for df in dfs:
            df.replace('', np.nan, inplace=True)
            df.dropna(inplace=True)
            df.to_csv(self.MUSIC_LISTENING_HABITS_NO_NULLS_CSV,
                      index=False, mode='a')



    def load_matrix(self):

        users = []
        songs = []

        totaldfs, numdf = 171272, 0

        dfs = pd.read_csv(self.MUSIC_LISTENING_HABITS_NO_NULLS_CSV, delimiter="\t", encoding="utf-8", header=None, chunksize=100, error_bad_lines=False)

        for df in dfs:            
            numdf = numdf + 1            

            for row in df.get(0).get_values():

                elements = row.split(",")
                user, song = elements[0], elements[4]

                if user not in users and len(user) > 1:
                    users.append(user)

                if song not in songs and len(user) > 1:
                    songs.append(song)   

            print("Creando conjuntos: ", (numdf/totaldfs)*100, "%")

        print("Conjuntos creados")

        dfs = pd.read_csv(self.MUSIC_LISTENING_HABITS_NO_NULLS_CSV, delimiter="\t", encoding="utf-8", header=None, chunksize=100, error_bad_lines=False)        

        matrix = np.zeros((len(songs),len(users)))
        
        for df in dfs:              
            numdf = numdf + 1            

            for row in df.get(0).get_values():

                elements = row.split(",")
                user, song = elements[0], elements[4]

                idUser, idSong = 0,0

                if user in users and len(user) > 1:
                    idUser = users.index(user)

                if song in songs and len(user) > 1:
                    idSong = songs.index(song)

                matrix[idSong,idUser] = matrix[idSong,idUser] + 1

            print("Creando matriz: ", (numdf/totaldfs)*100, "%")

        print("Matriz creada")

        np.savetxt("matriz.txt", matrix, delimiter='\t', newline='\n', encoding="utf-8")

        print("Archivo matriz.txt creado")

data_processor = DataProcessor()
data_processor.load_matrix()


