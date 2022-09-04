
# import neccessary libraries
from flask import Flask , render_template , redirect , request , session , Response
from flask_session import Session
from werkzeug.security import check_password_hash, generate_password_hash
from cs50 import SQL
import re

app = Flask(__name__)

# Ensure templates are auto-reloaded
app.config["TEMPLATES_AUTO_RELOAD"] = True

app.config["SESSION_PERMANENT"] = False
app.config["SESSION_TYPE"] = "filesystem"
Session(app)

@app.after_request
def after_request(response):
    """Ensure responses aren't cached"""
    response.headers["Cache-Control"] = "no-cache, no-store, must-revalidate"
    response.headers["Expires"] = 0
    response.headers["Pragma"] = "no-cache"
    return response

# configure database of users
db = SQL("sqlite:///users")
db.execute("CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY NOT NULL,username TEXT NOT NULL,hash TEXT NOT NULL,score INTEGER NOT NULL,highest INTEGER NOT NULL,snake TEXT NOT NULL DEFAULT 'def')")

@app.route("/")
def index():
    return redirect("/snake")

@app.route("/snake")
def game():
    # ensurre the user is logged in
    if session.get("user_id") is None:
        return redirect("/login")
    
    # user logged in
    # render the game
    return render_template("game.html")

@app.route("/login",methods=["POST","GET"])
def login():
    # GET
    if request.method == "GET":
        return render_template("/login.html")

    # POST
    username = request.get_json(force=True)["username"]
    password  = request.get_json(force=True)["password"]
    rows = db.execute("SELECT * FROM users WHERE username = ?",username)


    # check for invalid username
    if not ((len(rows) == 1) and (username)):
        return Response('{"error":"username"}',status=403,mimetype='application/json')
    
    # check for invalid password
    if not (check_password_hash(rows[0]["hash"],password) and password):
        return Response('{"error":"password"}',status=403,mimetype="application/json")

    session["user_id"] = rows[0]["id"]
    return Response("/snake",302)

@app.route("/register",methods=["POST","GET"])
def register():
    # GET
    if request.method == "GET":
        return render_template("register.html")

    # POST
    username = request.get_json(force=True)["username"]
    password = request.get_json(force=True)["password"]

    # username validation
    count = db.execute("SELECT COUNT(username) AS count FROM users WHERE username = ?",username)
    if not (username and (count[0]["count"] == 0) and (len(username) > 3)):
        return Response('{"error":"username"}',400) 

    # password validation 
    found = re.search("[a-z]+",password)
    found_2 = re.search("[A-Z]+",password)
    found_3 = re.search("\d",password)
    if not (password and found and found_2 and found_3):
        return Response('{"error":"password"}',400)

    # password validation
    db.execute("INSERT INTO users (username,hash,score,highest) VALUES (?,?,?,?)",username,generate_password_hash(password),0,0)
    id = db.execute("SELECT id FROM users WHERE username = ?",username)
    session["user_id"] = id
    return Response(None,302)

@app.route("/engine",methods=["POST"])
def engine():
    snakeType = request.get_json(force=True)["snake"]
    db.execute("UPDATE users SET snake = ?",snakeType)
    return render_template("container.html")