import os
from project import app, db, email_sender
from project.models import User, Site
from flask import request, jsonify
from werkzeug.security import generate_password_hash,check_password_hash
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required, JWTManager

jwt = JWTManager(app)

@app.get("/")
def index():
    sheldon = User('sheldon', 'test', 'test@test', None)
    #sheldonsSite = Site()
    return sheldon.username

@app.post("/signup")
def create_user():
    data = request.get_json()
    username_in_db = False
    email_in_db = False

    # CHECK IF USERNAME OR EMAIL ALREADY EXISTS
    if User.query.filter_by(username=data['username']).first() is not None:
        username_in_db = True
        print("ligma")
        print(User.query.filter_by(username=data['username']).first())

    if User.query.filter_by(email=data["email"]).first() is not None:
        email_in_db = True
        print("sugma")
    
    if username_in_db and email_in_db:
        return "An account with that username and email address already exists", 409
    elif email_in_db:
        return "An account with that email address already exists", 409
    elif username_in_db:
        return "An account with that username already exists", 409

    # CREATE AND ADD THE NEW USER AND THEN GET THE USER'S ID FOR THE SITE
    new_user = User(data["username"], data["password"], data["email"], None)
    db.session.add(new_user)
    db.session.commit()
    new_user = User.query.filter_by(username=data["username"]).first()

    new_site = Site(new_user.id)
    db.session.add(new_user)
    db.session.commit()

    # SEND ACTIVATION EMAIL
    email_sender.send_activation_email(new_user.username, new_user.email, new_user.activation_UUID)

    return jsonify(
        SITE_id = new_site.user_id,
        USER_id = new_user.id
    )

@app.get("/activate")
def activate():
    activation_code = request.args.get("token")
    
    user_to_activate = User.query.filter_by(activation_UUID = activation_code).first()

    # Check if user is not activated yet
    if user_to_activate.is_active == False:
        user_to_activate.is_active = True
        db.session.add(user_to_activate)
        db.session.commit()

        return user_to_activate.username + " Has been activated!"

    return "Failed to activate " + user_to_activate.username

@app.post("/login")
def login():
    username = request.form.get("username")
    password = request.form.get("username")#generate_password_hash(request.form.get("password"))

    return jsonify(
        user = username,
        passwd = password
        )
    #access_token = create_access_token(identity=username)
    #return jsonify(access_token=access_token)


@app.get("/get_user/<name>")
def get_user(name):
    current_user = User.query.filter_by(username=name).all()[0]

    return jsonify(current_user.username), 418


if __name__ == "__main__":
    app.run(debug=True, port=5001)