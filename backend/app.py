from flask import Flask
from flask_cors import CORS




app = Flask(__name__)
CORS(app)




@app.route('/ping')
def ping():
    return {'status': 'ok'}




if __name__ == "__main__":
    app.run(debug=True, port=5000)



# terminal cmd to run
# venv/bin/activate
# python app.py