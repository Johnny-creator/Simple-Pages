import os
from datetime import timedelta, datetime, timezone
from flask import Flask, jsonify
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_jwt_extended import JWTManager, get_jwt, set_access_cookies
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
CORS(app)
app.config["SQLALCHEMY_DATABASE_URI"] = os.getenv('DATABASE_URL')
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.config["JWT_TOKEN_LOCATION"] = ["cookies"]
app.config["JWT_COOKIE_SECURE"] = False # SET TO TRUE WHEN APP ENTERS PRODUCTION! NEED THIS TO USE HTTPS ON COOKIES
app.config["JWT_SECRET_KEY"] = os.getenv('JWT_KEY')
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(hours=1)
app.config["JWT_REFRESH_TOKEN_EXPIRES"] = timedelta(days=30)

db = SQLAlchemy(app)

# Add on migration capabilities in order to run terminal commands
Migrate(app,db)

# JWT MANAGER!
jwt = JWTManager(app)