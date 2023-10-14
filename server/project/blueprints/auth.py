from flask import Blueprint, jsonify, request
from project.models import User, Site
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required, JWTManager

auth_bp = Blueprint("auth", __name__)

@auth_bp.post("/login")
def login():
    data = request.get_json()

    access_token = create_access_token(identity=data["username"])
    return jsonify(access_token=access_token)
    
    # return jsonify(
    #     type = "TESTING",
    #     user = data["username"],
    #     passwd = data["password"]
    #     ), 201

@jwt_required
@auth_bp.get("/jwttest")
def jwttest():
    return "This worked"


@auth_bp.get("/get_user/<name>")
def get_user(name):
    current_user = User.query.filter_by(username=name).all()[0]

    return jsonify(current_user.username), 418


