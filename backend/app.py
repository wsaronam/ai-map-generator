from flask import Flask, request, jsonify
from flask_cors import CORS
from groq import Groq
from dotenv import load_dotenv
import os




load_dotenv()

app = Flask(__name__)
CORS(app)

client = Groq(api_key=os.getenv('GROQ_API_KEY'))



@app.route('/ping')
def ping():
    return {'status': 'ok'}


@app.route("/generate-map", methods=["POST"])
def generate_map():
    data = request.json
    theme = data.get('theme', 'fantasy dungeon')

    prompt=f"""
    Please generate a dungeon map description for a {theme} setting.
    Please return a JSON object with the following:
        - title: name of the dungeon
        - rooms: array of 6 rooms, each with:
            - id: number (1-6)
            - name: room name
            - description: a short description of the room
            - connections: array of rooms (ids) that this room connects to
            - type: what type of room this is (please select from this list [entrance, boss, treasure, trap, rest, combat])
    Please return ONLY a raw JSON object with no markdown, no code fences, no backticks, and no extra text.
    """
    
    response = client.chat.completions.create(
        model='llama-3.3-70b-versatile',
        messages=[{'role': 'user', 'content': prompt}]
    )
    return jsonify({'map': response.choices[0].message.content})




if __name__ == "__main__":
    app.run(debug=True, port=5000)



# terminal cmd to run
# venv\Scripts\activate
# python app.py