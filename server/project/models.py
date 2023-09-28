from sqlalchemy.orm import relationship
from sqlalchemy import ForeignKey, Text, BigInteger, Column
from project import db
from werkzeug.security import generate_password_hash

# USER CLASS
class User(db.Model):
    __tablename__ = 'users'

    id = Column(BigInteger, primary_key=True)
    username = Column(Text, nullable=False, unique=True)
    password = Column(Text, nullable=False)
    email = Column(Text, nullable=False, unique=True)
    site_id = relationship('Site', backref='user', uselist=False)

    def __init__(self, username, password, email, site_id):
        self.username = username
        self.password = generate_password_hash(password)
        self.email = email
        self.site_id = site_id

    def __repr__(self):
        return "Username is " + self.username

# SITE CLASS
class Site(db.Model):
    __tablename__ = 'sites'

    id = Column(BigInteger, primary_key=True)
    user_id = Column(BigInteger, ForeignKey('users.id'))
    title = Column(Text)
    sect1title = Column(Text)
    sect1text = Column(Text)
    sect2itle = Column(Text)
    sect2text = Column(Text)
    sect3itle = Column(Text)
    sect3text = Column(Text)

    def __init__(self, user_id):
        self.user_id = user_id
