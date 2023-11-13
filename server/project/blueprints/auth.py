from flask import Blueprint, jsonify, request
from project import db
from project.models import User, Site
from flask_jwt_extended import create_access_token, create_refresh_token, jwt_required, current_user, get_jwt_identity, set_access_cookies
from werkzeug.security import check_password_hash
from sqlalchemy import text

auth_bp = Blueprint("auth", __name__)

@auth_bp.post("/login")
def login():
    '''
    Endpoint to log in a user and pass them a JWT token

    Returns
        A JSON response with the current username, access token, and refresh token. Or if not successful, a message advising of such.
    '''
    data = request.get_json()
    
    current_user = User.query.filter_by(username=data.get("username")).first()

    if check_password_hash(current_user.password, data.get("password")): 
        access_token = create_access_token(identity=data.get("username"))
        refresh_token = create_refresh_token(identity=data.get("username"))
        return jsonify(
            {
                "current_user": data.get("username"),
                "access_token": access_token,
                "refresh_token": refresh_token,
                "message": "You have logged in."
            }), 200

    return jsonify({"error": "invalid username or password"}), 418

@auth_bp.get("/whoami")
@jwt_required()
def jwttest():
    '''
    Endpoint to get the current users name

    Returns
        JSON object with the current users username
    '''
    return jsonify({"user_details":{"username":current_user.username, "email": current_user.email}})