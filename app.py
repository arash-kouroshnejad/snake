
# import neccessary libraries
from flask import Flask , render_template , redirect , request , session , Response
from flask_session import Session
from cs50 import SQL
from werkzeug.security import check_password_hash, generate_password_hash

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
db = SQL("sqlite:///users.db")

@app.route("/")
def game():
    # ensurre the user is logged in
    if session.get("user_id") is None:
        return redirect("/login")
    
    # 

@app.route("/login",methods=["POST","GET"])
def login():
    # GET
    if request.method == "GET":
        return render_template("/login.html")

    # POST
    if request.method("POST"):
        username = request.form.get("username")
        password  = request.form.get("password")
        rows = db.execute("SELECT * FROM users WHERE username = ?")


        # check for invalid username
        if not ((len(rows) == 1) and (username)):
            return Response("{'error':'username'}",status=400,mimetype='application/json')
        
        # check for invalid password
        if not (check_password_hash(rows[0]["hash"],password) and password):
            return Response("{'error':'password'}",status=400)

        session["user_id"] = rows[0]["id"]
        return redirect("/game")

