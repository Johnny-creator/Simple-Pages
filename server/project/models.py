from sqlalchemy import ForeignKey, Text, BigInteger, Column, Boolean
from sqlalchemy.orm import relationship
from sqlalchemy.dialects.postgresql import UUID
from project import db
from werkzeug.security import generate_password_hash
import uuid

# USER CLASS
class User(db.Model):
    __tablename__ = 'users'

    id = Column(BigInteger, primary_key=True)
    site_id = relationship('Site', backref='user', uselist=False)
    username = Column(Text, nullable=False, unique=True)
    password = Column(Text, nullable=False)
    email = Column(Text, nullable=False, unique=True)
    activation_UUID = db.Column(UUID(as_uuid=True), default=uuid.uuid4)
    is_admin = Column(Boolean, nullable=False)
    is_active = Column(Boolean, nullable=False)
    is_banned = Column(Boolean, nullable=False)
    

    def __init__(self, username, password, email, site_id):
        self.username = username
        self.password = generate_password_hash(password, method="pbkdf2")
        self.email = email
        self.site_id = site_id
        self.is_admin = False
        self.is_active = False
        self.is_banned = False

    def __repr__(self):
        return "Username is " + self.username

# SITE CLASS
class Site(db.Model):
    __tablename__ = 'sites'

    id = Column(BigInteger, primary_key=True)
    user_id = Column(BigInteger, ForeignKey('users.id'))
    title = Column(Text)
    sect1Title = Column(Text)
    sect1Text = Column(Text)
    sect2Title = Column(Text)
    sect2Text = Column(Text)
    sect3Title = Column(Text)
    sect3Text = Column(Text)

    def __init__(self, user_id):
        self.user_id = user_id