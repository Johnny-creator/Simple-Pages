import os
from project import app, db, email_sender, jwt
from project.models import User, Site
from project.blueprints.register import register_bp
from project.blueprints.auth import auth_bp
from flask import request, jsonify
from flask_jwt_extended import get_jwt, create_access_token, get_jwt_identity, set_access_cookies
from datetime import datetime, timezone, timedelta

@app.get("/")
def index():
    sheldon = User('sheldon1', 'test', 'test@test', None)
    return jsonify({"name":sheldon.username})

# This is the route that will generate the users webpage.
@app.get("/<name>")
def get_site(name):
    selected_user = User.query.filter_by(username=name).first()
    
    if selected_user is not None:

        return jsonify({
            "username" : selected_user.username,
            "title" : selected_user.site_id.title,
            "sect1Title" : selected_user.site_id.sect1Title,
            "sect1Text" : selected_user.site_id.sect1Text,
            "sect2Title" : selected_user.site_id.sect2Title,
            "sect2Text" : selected_user.site_id.sect2Text,
            "sect3Title" : selected_user.site_id.sect3Title,
            "sect3Text" : selected_user.site_id.sect3Text
            }), 200
    
    return jsonify({"message": "User not found"}), 404

# Refresh JWT when it is within 30 minutes of expiring
@app.after_request
def refresh_expiring_jwts(response):
    try:
        exp_timestamp = get_jwt()["exp"]
        now = datetime.now(timezone.utc)
        target_timestamp = datetime.timestamp(now + timedelta(minutes=30))
        if target_timestamp > exp_timestamp:
            access_token = create_access_token(identity=get_jwt_identity())
            set_access_cookies(response, access_token)
        return response
    except (RuntimeError, KeyError):
        # Case where there is not a valid JWT. Just return the original response
        return response
    
# Testing login
@app.route("/login2", methods=["POST"])
def login():
    response = jsonify({"msg": "login successful"})
    access_token = create_access_token(identity="shelcod")
    set_access_cookies(response, access_token)
    return response

# Blueprints
app.register_blueprint(register_bp, url_prefix="/register")
app.register_blueprint(auth_bp, url_prefix="/auth")

# Load user
@jwt.user_lookup_loader
def user_lookup_callback(_jwt_headers, jwt_data):

    identity = jwt_data['sub']

    return User.query.filter_by(username = identity).one_or_none()

# jwt error handlers
@jwt.expired_token_loader
def expired_token_callback(jwt_header, jwt_data):
    return jsonify({
        "message": "Token has expired",
        "error":"Token has expired"
    }), 401

@jwt.invalid_token_loader
def invalid_token_callback(error):
    return jsonify({
        "message": "signiture verification failed",
        "error":"invalid_token"
    }), 401

@jwt.unauthorized_loader
def missing_token_callback(error):
    return jsonify({
        "message": "this token is invalid!",
        "error":"invalid token"
    }), 401

if __name__ == "__main__":
    app.run(debug=True, port=5001)