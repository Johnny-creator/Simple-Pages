from flask import Blueprint, jsonify, request
from project.models import User, Site
from flask_jwt_extended import create_access_token, jwt_required, current_user, get_jwt_identity

auth_bp = Blueprint("auth", __name__)

@auth_bp.post("/login")
def login():
    username = request.json.get("username", None)
    password = request.json.get("password", None)

    print("Username: " + username + " and Password: " + password)

    access_token = create_access_token(identity=username)
    return jsonify(
        {
            "current_user": username,
            "access_token": access_token,
        }), 200
    
    # return jsonify(
    #     type = "TESTING",
    #     user = data["username"],
    #     passwd = data["password"]
    #     ), 201

@auth_bp.get("/whoami")
@jwt_required()
def jwttest():
    print("works!")
    return jsonify({"user_details":{"username":current_user.username, "email": current_user.email}})


@auth_bp.get("/get_user/<name>")
def get_user(name):
    current_user = User.query.filter_by(username=name).all()[0]

    return jsonify(current_user.username), 418


