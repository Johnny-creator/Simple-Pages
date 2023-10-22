import os
from project import app, db, email_sender
from project.models import User, Site
from project.blueprints.register import register_bp
from project.blueprints.auth import auth_bp
from flask import request, jsonify
from flask_jwt_extended import JWTManager

# JWT MANAGER!
jwt = JWTManager(app)

@app.get("/")
def index():
    sheldon = User('sheldon1', 'test', 'test@test', None)
    return jsonify({"name":sheldon.username})

@app.get("/<name>")
def get_site(name):
    selected_user = User.query.filter_by(username=name).first()
    
    if selected_user is not None:

        return jsonify({"site_id": selected_user.site_id.id}), 200
    
    return jsonify({"message": "User not found"}), 404

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