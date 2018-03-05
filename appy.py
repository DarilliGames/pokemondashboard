from flask import Flask
from flask import render_template
from pymongo import MongoClient
import json
import os

app = Flask(__name__)

MONGODB_URI = os.environ.get('MONGODB_URI')
MONGO_DB_NAME = os.environ.get('MONGO_DB_NAME')
MONGO_COLLECTION_NAME = os.environ.get('MONGO_COLLECTION_NAME')

FIELDS = {"#":True,"Name":True,"Type1":True,"Type2":True,"Total":True,"HP":True,"Attack":True,"Defense":True,"SpAtk":True,"SpDef":True,"Speed":True,"Generation":True,"Legendary":True, '_id': False}


def getData():
    with MongoClient(MONGODB_URI) as conn:
        collection = conn[MONGO_DB_NAME][MONGO_COLLECTION_NAME]
        pokemon = collection.find(projection=FIELDS)
        return list(pokemon)
        
@app.route("/")
def get_home_page():
    here=(getData())
    green = here
    return render_template("pokegraph.html", apple = green)
    
@app.route("/fire")
def get_home_fire():
    here=(getData())
    green = []
    yellow = []
    for x in here:
        if x["Type1"] == "Fire":
            green.append(x)
    for x in here:
        if x["Type2"] == "Fire":
            yellow.append(x)
    return render_template("pokegraph.html", apple = green, banana = yellow)

@app.route("/data")
def get_data():
    with MongoClient(MONGODB_URI) as conn:
        collection = conn[MONGO_DB_NAME][MONGO_COLLECTION_NAME]
        pokemon = collection.find(projection=FIELDS)
        return json.dumps(list(pokemon))


if __name__ == "__main__":
    app.run(host=os.getenv('IP', '0.0.0.0'),port=int(os.getenv('PORT', 8080)))