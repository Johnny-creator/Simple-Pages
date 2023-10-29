from flask import Blueprint, jsonify, request
from project.models import User, Site
from flask_jwt_extended import create_access_token, create_refresh_token, jwt_required, current_user, get_jwt_identity
from werkzeug.security import check_password_hash

auth_bp = Blueprint("auth", __name__)

@auth_bp.post("/login")
def login():
    data = request.get_json()
    
    current_user = User.query.filter_by(username=data.get("username")).first()

    if check_password_hash(current_user.password, data.get("password")): 
        access_token = create_access_token(identity=data.get("username"))
        refresh_token = create_refresh_token(identity=data.get("username"))
        return jsonify(
            {
                "current_user": data.get("username"),
                "access_token": access_token,
                "refresh_token": refresh_token
            }), 200

    return jsonify({"error": "invalid username or password"}), 418

@auth_bp.post("/make_site")
@jwt_required
def make_site():
    # TODO
    # - query the users site
    # - post the data to database
    # - return message
    data = request.get_json()

    #current_site = Site.query.filter_by(=data.get)


@auth_bp.get("/whoami")
@jwt_required()
def jwttest():
    print("works!")
    return jsonify({"user_details":{"username":current_user.username, "email": current_user.email}})


@auth_bp.get("/get_user/<name>")
def get_user(name):
    current_user = User.query.filter_by(username=name).all()[0]

    return jsonify(current_user.username), 418


