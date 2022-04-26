from services.lottery import Lottery
from flask import Flask
import json

app = Flask(__name__)

lottery = Lottery()


@app.route('/lucky_numbers')
def get_lucky_numbers():
    return json.dumps(lottery.draw_numbers())
