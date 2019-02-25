#Punto 2

import numpy as np
import pandas as pd
import math

class DataProcessor:

    MUSIC_LISTENING_HABITS_TSV = 'userid-timestamp-artid-artname-traid-traname.tsv'
    MUSIC_LISTENING_HABITS_NO_NULLS_CSV = 'raw-data-without-nulls.csv'
    AGGREGATED_MUSIC_LISTENING_HABITS = 'aggregate-data.csv'
    MATRIX_RATINGS = []

    def remove_nulls(self):
        dfs = pd.read_csv(self.MUSIC_LISTENING_HABITS_TSV, delimiter="\t", encoding="utf-8", header=None, chunksize=10000, error_bad_lines=False)
        
        for df in dfs:
            df.replace('', np.nan, inplace=True)
            df.dropna(inplace=True)
            df.to_csv(self.MUSIC_LISTENING_HABITS_NO_NULLS_CSV,
                      index=False, mode='a')


    def load_matrix(self):

        users = []
        artists = []
        anames = []

        totaldfs, numdf = 171272, 0   
        #con chunksize=10000
        totaldfs = 1713     

        dfs = pd.read_csv(self.MUSIC_LISTENING_HABITS_NO_NULLS_CSV, delimiter="\t", encoding="utf-8",header=None, chunksize=10000, error_bad_lines=False)

        for df in dfs:            
            numdf = numdf + 1            

            for row in df.get(0).get_values():

                elements = row.split(",")
                user, artist, aname = elements[0].replace('"',''), elements[2].replace('"',''), elements[3].replace('"','')

                if user not in users and len(user) > 1:
                    users.append(user)                    

                if artist not in artists and len(user) > 1:
                    artists.append(artist)
                    anames.append(aname)

            print("Creando conjuntos: ", (numdf/totaldfs)*100, "%")

        #artists = list(set(artists))  
        #users = list(set(users))
        #anames = list(set(anames))

        usersMatrix = np.array([users])
        artistsMatrix = np.array([artists,anames])        

        print(len(artists), len(anames))

        np.savetxt("artists.txt", artistsMatrix.T, fmt='%s',delimiter='\t', newline='\n', encoding="utf-8")
        np.savetxt("users.txt", usersMatrix, fmt='%s',delimiter='\t', newline='\n', encoding="utf-8")
        
        print("Conjuntos creados")

        nartists, nusers = len(artists),len(users)

        matrix = np.zeros((nartists, nusers))

        dfs = pd.read_csv(self.MUSIC_LISTENING_HABITS_NO_NULLS_CSV, delimiter="\t", encoding="utf-8", header=None, chunksize=10000, error_bad_lines=False)   

        numdf = 0     
        
        for df in dfs:              
            numdf = numdf + 1            

            for row in df.get(0).get_values():

                elements = row.split(",")
                user, artist = elements[0].replace('"',''), elements[2].replace('"','')

                idUser, idArtist = 0,0

                if len(user) > 1:
                    idUser = users.index(user)
                    idArtist = artists.index(artist)
                    matrix[idArtist,idUser] += 1                

            print("Creando matriz: ", (numdf/totaldfs)*100, "%")

        print("Matriz creada")

        np.savetxt("matrix.txt", matrix, delimiter='\t', newline='\n', encoding="utf-8")

        ncol = 0

        for col in range(matrix.shape[1]):

            ncol = ncol +1
            
            maximo = max(matrix[:,col])            

            for row in range(matrix.shape[0]):
                
                if(matrix[row,col] > 0):
                    matrix[row,col] = math.log(matrix[row,col],maximo)*4+1

            print("Creando matriz normalizada: ", (ncol/nusers)*100, "%")

        print("Matriz normalizada creada")

        np.savetxt("matrix_norm.txt", matrix, delimiter='\t', newline='\n', encoding="utf-8")

        self.MATRIX_RATINGS = matrix

data_processor = DataProcessor()
data_processor.load_matrix()