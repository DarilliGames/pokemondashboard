from flask import Flask, request, render_template, redirect
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

def letToNum(whatString):
    gtype = 2;
    for num in whatString:
        gtype = gtype + ord(num) -96
    return gtype

@app.route("/")
def get_home_page():
    here=(getData())
    green = here
    return render_template("pokegraph.html", apple = green)
    
@app.route("/type/<info>")
def get_home_type(info):
    here=(getData())
    green = []
    yellow = []
    for x in here:
        if x["Type1"] == info:
            green.append(x)
    for x in here:
        if x["Type2"] == info:
            yellow.append(x)
    return render_template("pokegraph.html", apple = green, banana = yellow)
    
@app.route("/pokemon/<pkinfo>")
def get_Pokemon(pkinfo):
    return redirect("https://bulbapedia.bulbagarden.net/wiki/"+pkinfo)

@app.route("/pokemonnum/<pkinfo>")
def get_Pokemonnum(pkinfo):
    here=(getData())
    for x in here:
        if int(x["#"]) == int(pkinfo):
            return redirect("/pokemon/"+x["Name"])
    return render_template("pokemon.html")


@app.route("/data")
def get_data():
    with MongoClient(MONGODB_URI) as conn:
        collection = conn[MONGO_DB_NAME][MONGO_COLLECTION_NAME]
        pokemon = collection.find(projection=FIELDS)
        return json.dumps(list(pokemon))
        
@app.route("/checker", methods=['GET', 'POST'])
def get_checker():
    return render_template("checker.html")


if __name__ == "__main__":
    app.run(host=os.getenv('IP', '0.0.0.0'),port=int(os.getenv('PORT', 8080)))