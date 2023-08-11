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
    _password_hash = db.Column(db.String)
    email = db.Column(db.String)

    slates = db.relationship('Slate', backref = 'user')

    serialize_rules = ('-slates.user', )

    @hybrid_property
    def password_hash(self):
        return self._password_hash

    @password_hash.setter
    def password_hash(self, password):
        password_hash = bcrypt.generate_password_hash(password.encode('utf-8'))
        self._password_hash = password_hash.decode('utf-8')

    def authenticate(self, password):
        return bcrypt.check_password_hash(self._password_hash, password.encode('utf-8'))
    
    @validates('username')
    def validates_quantity(self, key, username):
        if not isinstance(username, str) and len(username) > 5:
            raise ValueError('Username must be 6 or more characters')
        return username

class Slate(db.Model, SerializerMixin):
    __tablename__ = 'slates'

    id = db.Column(db.Integer, primary_key = True)
    created_by = db.Column(db.String, db.ForeignKey('users.username'))
    slate_title = db.Column(db.String)
    created_at = db.Column(db.DateTime, server_default = db.func.now())
    updated_at =db.Column(db.DateTime, onupdate = db.func.now())

    slated_movies = db.relationship('SlatedMovie', cascade = 'all, delete', backref = 'slate')

    serialize_rules = ('-slated_movies.slate', '-user.slates')

class SlatedMovie(db.Model, SerializerMixin):
    __tablename__ = 'slated_movies'

    id = db.Column(db.Integer, primary_key = True)
    slate_id = db.Column(db.Integer, db.ForeignKey('slates.id'))
    movie_id = db.Column(db.Integer, db.ForeignKey('movies.id'))
    position_number = db.Column(db.Integer)

    movie_details = db.relationship('Movie', backref = 'slated_movie')

    serialize_rules = ('-slate.slated_movies', '-movie_details.slated_movie')

class Movie(db.Model, SerializerMixin):
    __tablename__ = 'movies'

    id = db.Column(db.Integer, primary_key = True)
    tmdb_id = db.Column(db.Integer)
    title = db.Column(db.String)
    image = db.Column(db.String)

    serialize_rules = ('-slated_movie.movie_details', )
    