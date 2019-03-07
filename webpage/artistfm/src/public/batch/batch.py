from flask import Flask, Response, make_response, jsonify
from flask_restful import Api, Resource, reqparse
from model_builder import ModelBuilder
from threading import Thread
import json
app = Flask(__name__)
api = Api(app)

model_builder = ModelBuilder()

class Prediction(Resource):
    def get(self, uid):
        global model_builder
        resp = Response(json.dumps(model_builder.predict_for_user(uid)), status=200, headers={'Access-Control-Allow-Origin': '*'}, content_type='application/json')
        return resp

class Model(Resource):
    def get(self):
        global model_builder
        if model_builder.updating:
            model_builder.set_to_update()
            resp = Response("Model is already updating, but your request will be handled soon", headers={'Access-Control-Allow-Origin': '*'}, status=200)
            return resp
        Thread(target=model_builder.update_data).start()
        resp = Response("Starting model data update. ETA 110s.", headers={'Access-Control-Allow-Origin': '*'},status=200)
        return resp

class Ranking(Resource):
    def get(self):
        global model_builder
        resp = Response(json.dumps(model_builder.ranking()), headers={'Access-Control-Allow-Origin': '*'}, status=200, content_type='application/json')
        return resp

api.add_resource(Prediction, "/predict/<int:uid>")
api.add_resource(Model, "/model")
api.add_resource(Ranking, "/ranking")
app.run(host='127.0.0.1', port=8081, debug=False)
    