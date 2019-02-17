import numpy as np
import pandas as pd

class DataProcessor:

    MUSIC_LISTENING_HABITS_TSV = 'userid-timestamp-artid-artname-traid-traname.tsv'
    MUSIC_LISTENING_HABITS_NO_NULLS_CSV = 'raw-data-without-nulls.csv'
    AGGREGATED_MUSIC_LISTENING_HABITS = 'aggregate-data.csv'


    def remove_nulls(self):
        dfs = pd.read_csv(self.MUSIC_LISTENING_HABITS_TSV, delimiter="\t", encoding="utf-8", header=None, chunksize=1000, error_bad_lines=False)
        
        for df in dfs:
            df.replace('', np.nan, inplace=True)
            df.dropna(inplace=True)
            df.to_csv(self.MUSIC_LISTENING_HABITS_NO_NULLS_CSV,
                      index=False, mode='a')



    def load_matrix(self):

        users = []
        songs = []
        snames = []

        totaldfs, numdf = 171272, 0   
        #con chunksize=10000
        totaldfs = 1713     

        dfs = pd.read_csv(self.MUSIC_LISTENING_HABITS_NO_NULLS_CSV, delimiter="\t", encoding="utf-8", nrows= 100000,header=None, chunksize=10000, error_bad_lines=False)

        for df in dfs:            
            numdf = numdf + 1            

            for row in df.get(0).get_values():

                elements = row.split(",")
                user, song, sname = elements[0].replace('"',''), elements[4].replace('"',''), elements[5].replace('"','')

                if len(user) > 1:
                    users.append(user)                    

                if len(user) > 1:
                    songs.append(song)
                    snames.append(sname)

            print("Creando conjuntos: ", (numdf/totaldfs)*100, "%")

        songs = list(set(songs))  
        users = list(set(users))

        usersMatrix = np.array([users])
        songsMatrix = np.array([songs])        

        np.savetxt("songs.txt", songsMatrix.T, fmt='%s',delimiter='\t', newline='\n', encoding="utf-8")
        np.savetxt("users.txt", usersMatrix, fmt='%s',delimiter='\t', newline='\n', encoding="utf-8")
        
        print("Conjuntos creados")

        nsongs, nusers = len(songs),len(users)

        matrix = np.zeros((nsongs, nusers))

        dfs = pd.read_csv(self.MUSIC_LISTENING_HABITS_NO_NULLS_CSV, delimiter="\t", encoding="utf-8",nrows= 100000, header=None, chunksize=10000, error_bad_lines=False)        
        
        for df in dfs:              
            numdf = numdf + 1            

            for row in df.get(0).get_values():

                elements = row.split(",")
                user, song = elements[0].replace('"',''), elements[4].replace('"','')

                idUser, idSong = 0,0

                if len(user) > 1:
                    idUser = users.index(user)
                    idSong = songs.index(song)
                    matrix[idSong,idUser] += 1                

            print("Creando matriz: ", (numdf/totaldfs)*100, "%")

        print("Matriz creada")

        np.savetxt("matrix.txt", matrix, delimiter='\t', newline='\n', encoding="utf-8")

        ncol = 0

        for col in range(matrix.shape[1]):

            ncol = ncol +1
            
            maximo = max(matrix[:,col])            

            for row in range(matrix.shape[0]):

                matrix[row,col] = (matrix[row,col]/maximo)*5

            print("Creando matriz normalizada: ", (ncol/nusers)*100, "%")

        print("Matriz normalizada creada")

        np.savetxt("matrix_norm.txt", matrix, delimiter='\t', newline='\n', encoding="utf-8")

data_processor = DataProcessor()
data_processor.load_matrix()


