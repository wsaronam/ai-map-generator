from flask import Flask, request, jsonify
from flask_cors import CORS
import google.generativeai as genai
from dotenv import load_dotenv
import os




load_dotenv()

app = Flask(__name__)
CORS(app)

genai.configure(api_key=os.getenv('GEMINI_API_KEY'))
model = genai.GenerativeModel('gemini-2.0-flash')



@app.route('/ping')
def ping():
    return {'status': 'ok'}


@app.route("/generate-map", methods=["POST"])
def generate_map():
    data = request.json
    theme = data.get('theme', 'fantasy dungeon')

    prompt=f"""
    Please generate a dungeon map description for a {theme} setting.
     """
    
    response = model.generate_content(prompt)
    return response




if __name__ == "__main__":
    app.run(debug=True, port=5000)



# terminal cmd to run
# venv\Scripts\activate
# python app.py