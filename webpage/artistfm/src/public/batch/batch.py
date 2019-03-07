from flask import Flask
from flask_restful import Api, Resource, reqparse
from model_builder import ModelBuilder
from threading import Thread
app = Flask(__name__)
api = Api(app)

model_builder = ModelBuilder()

class Prediction(Resource):
    def get(self, uid):
        global model_builder
        return model_builder.predict_for_user(uid), 200

class Model(Resource):
    def get(self):
        global model_builder
        if model_builder.updating:
            model_builder.set_to_update()
            return "Model is already updating, but your request will be handled soon", 200
        Thread(target=model_builder.update_data).start()
        return "Starting model data update. ETA 110s.", 200

class Ranking(Resource):
    def get(self):
        global model_builder
        return model_builder.ranking(), 200

api.add_resource(Prediction, "/predict/<int:uid>")
api.add_resource(Model, "/model")
api.add_resource(Ranking, "/ranking")
app.run(host='0.0.0.0', port=8081, debug=False)
    