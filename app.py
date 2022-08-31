
# import neccessary libraries
from flask import Flask , render_template , redirect , request , session
from flask_session import Session
from cs50 import SQL

app = Flask(__name__)

app.config["SESSION_PERMANENT"] = False
app.config["SESSION_TYPE"] = "filesystem"
Session(app)

# configure database of users
db = SQL("sqlite3:///users.db")

@app.route("/game")
def game():
    # ensurre the user is logged in
    if session["user_id"] == None:
        return redirect("/login")
    
    # 

@app.route("/login",methods=["POST","GET"])
def login():
    # GET
    if request.method == "GET":
        return render_template("/login")

    # POST
    if request.method("POST"):
        username = request.form.get("username")
        password  = request.form.get("password")
