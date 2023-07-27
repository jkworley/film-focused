# Library imports
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy.orm import validates

# Local imports
from config import db, bcrypt

class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key = True)
    username = db.Column(db.String)
    _password = db.Column(db.String)

    @hybrid_property
    def password(self):
        raise Exception('Hashed password is private')

    @password.setter
    def password(self, password):
        password = bcrypt.generate_password_hash(password.encode('utf-8'))
        self._password = password.decode('utf-8')

    def authenticate(self, password):
        return bcrypt.check_password_hash(self._password, password.encode('utf-8'))

class Slate(db.Model, SerializerMixin):
    __tablename__ = 'slates'

    id = db.Column(db.Integer, primary_key = True)
    created_by = db.Column(db.String, db.ForeignKey('users.username'))
    slate_title = db.Column(db.String)
    created_at = db.Column(db.DateTime, server_default = db.func.now())
    updated_at =db.Column(db.DateTime, onupdate = db.func.now())

    slated_movies = db.relationship('SlatedMovie', cascade = 'all, delete', backref = 'slate')

    serialize_rules = ('-slated_movies.slate', )

class SlatedMovie(db.Model, SerializerMixin):
    __tablename__ = 'slated_movies'

    id = db.Column(db.Integer, primary_key = True)
    slate_id = db.Column(db.Integer, db.ForeignKey('slates.id'))
    movie_id = db.Column(db.Integer, db.ForeignKey('movies.id'))
    position_number = db.Column(db.Integer)

    serialize_rules = ('-slate.slated_movies', )

class Movie(db.Model, SerializerMixin):
    __tablename__ = 'movies'

    id = db.Column(db.Integer, primary_key = True)
    tmdb_id = db.Column(db.Integer)
    title = db.Column(db.String)
    image = db.Column(db.String)
    