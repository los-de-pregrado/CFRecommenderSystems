import numpy as np
import pandas as pd


class DataProcessor:
    MUSIC_LISTENING_HABITS_TSV = 'userid-timestamp-artid-artname-traid-traname.tsv'
    MUSIC_LISTENING_HABITS_NO_NULLS_CSV = 'raw-data-without-nulls.csv'
    AGGREGATED_MUSIC_LISTENING_HABITS = 'aggregate-data.csv'

    ROWS_TO_SKIP = [2120259, 2446317, 11141080, 11152098,
                    11152401, 11882086, 12902538, 12935043, 17589538]

    def remove_nulls(self):
        dfs = pd.read_csv(self.MUSIC_LISTENING_HABITS_TSV, delimiter="\t", encoding="utf-8", nrows=40, header=None, chunksize=100,
                          skiprows=lambda x: x in self.ROWS_TO_SKIP)
        for df in dfs:
            df.replace('', np.nan, inplace=True)
            df.dropna(inplace=True)
            df.to_csv(self.MUSIC_LISTENING_HABITS_NO_NULLS_CSV,
                      index=False, mode='a')

    def load_matrix(self):
        dfs = pd.read_csv(self.MUSIC_LISTENING_HABITS_NO_NULLS_CSV, delimiter="\t", encoding="utf-8", nrows=40, header=None, chunksize=100,
                          skiprows=lambda x: x in self.ROWS_TO_SKIP)
        for df in dfs:
            print('gato')
            # df.to_csv(self.MUSIC_LISTENING_HABITS_NO_NULLS_CSV,
                    #   index=False, mode='a')

data_processor = DataProcessor()
data_processor.load_matrix()

