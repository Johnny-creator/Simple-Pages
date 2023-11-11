from flask import Blueprint, jsonify, request
from flask_jwt_extended import jwt_required, get_jwt_identity
from project import db, email_sender
from project.models import User, Site
from werkzeug.utils import secure_filename
import os

register_bp = Blueprint("register", __name__)

def allowed_file_types(filename):
    '''
    Helper function to make sure files uploaded are either a PNG, JPEG, or AVIF

    Args:
        filename: the name of the file being uploaded

    Returns
        boolean: whether or not the file is one of the proper file types
    '''
    Allowed_Extensions = set(["png", "jpg", "jpeg", "avif"])
    print(filename.rsplit(".", 1)[1].lower())
    return "." in filename and filename.rsplit(".", 1)[1].lower() in Allowed_Extensions

@register_bp.post("/signup")
def create_user():
    '''
    Endpoint to sign up a new users

    Returns
        A message if either a user already exists, the email used for signing up is already used, or if user is successfully created
    '''
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
    #new_user = User.query.filter_by(username=data["username"]).first()

    # SEND ACTIVATION EMAIL
    email_sender.send_activation_email(new_user.username, new_user.email, new_user.activation_UUID)
    
    return jsonify({"message": "User created"}), 201

@register_bp.post("/make_site")
@jwt_required()
def make_site():
    '''
    Endpoint to create or edit a users site. Uploads an image file to the server

    Returns
        Message saying whether or not the site has been successfully edited
    '''
    data = request.get_json()
    current_user = User.query.filter_by(username=get_jwt_identity()).first()

    if "files[]" in request.files:
        file = request.files.getlist("files[]")[0]

        if file and allowed_file_types(file.filename):
            filename = secure_filename(str(current_user.id) + "." + file.filename.rsplit(".", 1)[1].lower())
            print(os.getcwd())
            file.save(os.path.join("project/user_images", filename))
        else:
            return jsonify({"message" : "File type is not allowed"}), 500

    if data.get("title").strip() != "":
        current_user.site_id.title = data.get("title").strip()
    if data.get("sect1Title").strip() != "":
        current_user.site_id.sect1Title = data.get("sect1Title").strip()
    if data.get("sect1Text").strip() != "":
        current_user.site_id.sect1Text = data.get("sect1Text").strip()
    if data.get("sect2Title").strip() != "":
        current_user.site_id.sect2Title = data.get("sect2Title").strip()
    if data.get("sect2Text").strip() != "":
        current_user.site_id.sect2Text = data.get("sect2Text").strip()
    if data.get("sect3Title").strip() != "":
        current_user.site_id.sect3Title = data.get("sect3Title").strip()
    if data.get("sect3Text").strip() != "":
        current_user.site_id.sect3Text = data.get("sect3Text").strip()

    db.session.add(current_user)
    db.session.commit()

    return jsonify({"message" : "site created"}), 201

@register_bp.get("/activate")
def activate():
    '''
    Endpoint to activate a users account based on the argument that is passed to the URL

    Returns
        Message confirming activation successful or not
    '''
    activation_code = request.args.get("token")
    
    user_to_activate = User.query.filter_by(activation_UUID = activation_code).first()

    # Check if user is not activated yet
    if user_to_activate.is_active == False:
        user_to_activate.is_active = True
        db.session.add(user_to_activate)
        # Create site to attach to user
        new_site = Site(user_to_activate.id)
        db.session.add(new_site)

        db.session.commit()

        return jsonify({"message": "User activated"}), 201

    return jsonify({"message":"Failed to activate " + user_to_activate.username}), 403