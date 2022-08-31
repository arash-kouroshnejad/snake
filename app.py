
# import neccessary libraries
from flask import Flask , render_template , redirect , request , session , Response
from flask_session import Session
from cs50 import SQL
from werkzeug.security import check_password_hash, generate_password_hash

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
        rows = db.execute("SELECT * FROM users WHERE username = ?")


        # check for invalid username
        if not ((len(rows) == 1) and (username)):
            return Response("{'error':'username'}",status=400,mimetype='application/json')
        
        # check for invalid password
        if not check_password_hash(rows[0]["hash"],password):
            return Response("{'error':'password'}",status=400)

        session["user_id"] = rows[0]["id"]
        return redirect("/game")


def register():