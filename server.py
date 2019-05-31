import json

from docutils.nodes import status
from flask import Flask, request
from flask_cors import CORS, cross_origin

from code import callPost

app = Flask(__name__)
CORS(app)


@app.route('/')
def hello_world():
    return "Hello World!"

@app.route('/employees')
def hello():
    return {'employees': [{'id': 1, 'name': 'Balram'}, {'id': 2, 'name': 'Tom'}]}

@app.route('/analise', methods=['POST'])
def upload_file():
    if request.method == 'POST':
        try:
            req_json = request.get_json()
            if req_json is None:
                req_json = {}
            else:
                print(req_json)
                dir_prefix = req_json.get("path")
                print(dir_prefix)
                #json_object = json.load(req_json)
                #print(json_object)

                BUCKET_NAME = 'devnet-security-event-images'

                return callPost(BUCKET_NAME, dir_prefix)
        except Exception  as e:
            http_code = status.HTTP_500_INTERNAL_SERVER_ERROR


if __name__ == '__main__':
     app.run(port=5002)