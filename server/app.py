# Library imports
from flask import jsonify, make_response, request, session
from flask_restful import Resource

# Local imports
from config import app, db, api
from models import User, Slate, SlatedMovie, Movie

class Index(Resource):
    def get(self):
        return 'Hello, world!'
    
api.add_resource(Index, '/')

class Users(Resource):
    def post(self):
        try:
            request_json = request.get_json()

            new_user = Slate(
                username = request_json['username'],
            )

            db.session.add(new_user)

            db.session.commit()

            response = make_response(
                jsonify(new_user.to_dict()),
                201
            )
            
            return response
        
        except ValueError:
            response = make_response(
                'Failed to create new user',
                400
            )

            return response

api.add_resource(Users, '/users')

class UsersById(Resource):
    def get(self, id):
        user_by_id = User.query.filter(User.id == id).first()

        response = make_response(
            jsonify(user_by_id.to_dict()),
            200
        )

        return response
        
    def delete(self, id):
        individual_user = User.query.filer(User.id == id).first()

        db.session.delete(individual_user)

        db.session.commit()

        response = make_response(
            { "Account has been deleted!" },
            200
        )

        return response
    
api.add_resource(UsersById, '/users/<int:id>')

class Slates(Resource):
    def get(self):
        slates_list = [slate.to_dict(rules = ('-slated_movies.id', '-slated_movies.movie_id', '-slated_movies.slate_id')) for slate in Slate.query.all()]

        response = make_response(
            jsonify(slates_list),
            200
        )

        return response
    
    def post(self):
        try:
            request_json = request.get_json()

            new_slate = Slate(
                created_by = request_json['created_by'],
                slate_title = request_json['slate_title']
            )

            db.session.add(new_slate)

            db.session.commit()

            response = make_response(
                jsonify(new_slate.to_dict()),
                201
            )
            
            return response
        
        except ValueError:
            response = make_response(
                'Failed to create new slate',
                400
            )

            return response

api.add_resource(Slates, '/slates')

class SlateById(Resource):
    def get(self, id):
        slate_by_id = Slate.query.filter(Slate.id == id).first()

        response = make_response(
            jsonify(slate_by_id.to_dict()),
            200
        )

        return response
    
    def delete(self, id):
        slate_by_id = Slate.query.filter(Slate.id == id).first()

        db.session.delete(slate_by_id)

        db.session.commit()

        response = make_response(
            { "Slate successfully deleted!" },
            200
        )

        return response

api.add_resource(SlateById, '/slates/<int:id>')

class SlatedMovies(Resource):
    def get(self):
        slated_movies_list = [slated_movie.to_dict(rules = ('-movie_details.id', '-slate.id')) for slated_movie in SlatedMovie.query.all()]

        response = make_response(
            jsonify(slated_movies_list),
            200
        )

        return response
    
    def post(self):
        try:
            request_json = request.get_json()

            new_slated_movie = SlatedMovie(
                slate_id = request_json['slate_id'],
                movie_id = request_json['slate_title'],
                position_number = request_json['position_number']
            )

            db.session.add(new_slated_movie)

            db.session.commit()

            response = make_response(
                jsonify(new_slated_movie.to_dict()),
                201
            )
            
            return response
        
        except ValueError:
            response = make_response(
                'Failed to create new slated movies',
                400
            )

            return response

api.add_resource(SlatedMovies, '/slated_movies')

class Movies(Resource):
    def get(self):
        movies_list = [movie.to_dict(rules = ('-slated_movie.movie_id', '-slated_movie.slate_id', '-slated_movie.id', '-slated_movie.slate.user')) for movie in Movie.query.all()]

        response = make_response(
            jsonify(movies_list),
            200
        )

        return response
    
    def post(self):
        try:
            request_json = request.get_json()

            new_movie = Movie(
                tmdb_id = request_json['tmdb_id'],
                title = request_json['title'],
                image = request_json['image']
            )

            db.session.add(new_movie)

            db.session.commit()

            response = make_response(
                jsonify(new_movie.to_dict()),
                201
            )
            
            return response
        
        except ValueError:
            response = make_response(
                'Failed to create new movie',
                400
            )

            return response
    
api.add_resource(Movies, '/movies')

class CheckSession(Resource):
    def get(self):
        current_session = session.get('user.id')

        if current_session:
            user_row = User.query.filter(User.id == current_session.id).first()

            response = make_response(
                jsonify(user_row.to_dict(), 200)
            )

        else:
            response = make_response(
                { },
                401
            )
        
        return response

api.add_resource(CheckSession, '/check_session')

class Login(Resource):
    def post(self):
        username = request.get_json()['username']
        password = request.get_json()['password']

        user = User.query.filter(User.username == username).first()

        if user.authenticate(password):
            session['user_id'] = user.id

            response = make_response(
                jsonify(user.to_dict()), 201
            )
        
        else:
            response = make_response(
                {}, 401
            )

        return response

api.add_resource(Login, '/login')

class Logout(Resource):
    def delete(self):
        session['user_id'] = None

        response = make_response(
            { }, 204
        )

        return response

api.add_resource(Logout, '/logout')

if __name__ == '__main__':
    app.run(port=5555, debug=True)
