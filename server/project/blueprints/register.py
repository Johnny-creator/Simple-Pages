from flask import Blueprint, jsonify, request
from project import db, email_sender
from project.models import User, Site

register_bp = Blueprint("register", __name__)

@register_bp.post("/signup")
def create_user():
    data = request.get_json()
    username_in_db = False
    email_in_db = False

    # CHECK IF USERNAME OR EMAIL ALREADY EXISTS
    if User.query.filter_by(username=data['username']).first() is not None:
        username_in_db = True
        print(User.query.filter_by(username=data['username']).first())

    if User.query.filter_by(email=data["email"]).first() is not None:
        email_in_db = True
    
    if username_in_db and email_in_db:
        return jsonify({"error": "User already exists"}), 403
    elif email_in_db:
        return jsonify({"error": "A user with that email already exists"}), 403
    elif username_in_db:
        return jsonify({"error": "User already exists"}), 403

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
    
    return jsonify({"message": "User created"}), 201

@register_bp.get("/activate")
def activate():
    activation_code = request.args.get("token")
    
    user_to_activate = User.query.filter_by(activation_UUID = activation_code).first()

    # Check if user is not activated yet
    if user_to_activate.is_active == False:
        user_to_activate.is_active = True
        db.session.add(user_to_activate)
        db.session.commit()

        return jsonify({"message": "User activated"}), 201

    return jsonify({"message":"Failed to activate " + user_to_activate.username}), 403