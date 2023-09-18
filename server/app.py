import os
from project import app, db
from project.models import User, Site
from flask import request

@app.get("/")
def index():
    sheldon = User('sheldon', 'test', 'test@test', None)
    sheldonsSite = Site()
    return sheldon.username

@app.post("/signup")
def create_user():
    data = request.form
    new_user = User(data["username"], data["password"], data["email"], None)
    #new_user = User("test", "testpass", "test@test.com", None)
    db.session.add_all([new_user])
    db.session.commit()
    return "Successfully added new user"

@app.get("/get_user/<name>")
def get_user(name):
    current_user = User.query.filter_by(username=name).all()[0]
    return current_user

if __name__ == "__main__":
    app.run(debug=True, port=5001)