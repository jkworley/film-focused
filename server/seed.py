#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc

# Remote library imports
from faker import Faker

# Local imports
from app import app
from models import db, User, Slate, SlatedMovie, Movie, Comment

if __name__ == '__main__':
    
    fake = Faker()
    
    with app.app_context():
        print("Starting seed...")
        
        User.query.delete()
        Slate.query.delete()
        SlatedMovie.query.delete()
        Movie.query.delete()
        Comment.query.delete()

        users = [
            User(
                username = "boom_resolve",
                email = "boom_resolve@example.com"
            ),
            User(
                username = "waffle_affair",
                email = "waffle_affair@example.com"
            ),
            User(
                username = "itch_protection",
                email = "itch_protection@example.com"
            ),
            User(
                username = "beep_tone",
                email = "beep_tone@example.com"
            ),
            User(
                username = "groan_departure",
                email = "groan_departure@example.com"
            )
        ]

        db.session.add_all(users)
        db.session.commit()

        user_1_password = "abc"
        user_2_password = "def"
        user_3_password = "ghi"
        user_4_password = "jkl"
        user_5_password = "mno"

        users[0].password_hash = user_1_password
        users[1].password_hash = user_2_password
        users[2].password_hash = user_3_password
        users[3].password_hash = user_4_password
        users[4].password_hash = user_5_password

        db.session.add(users[0])
        db.session.add(users[1])
        db.session.add(users[2])
        db.session.add(users[3])
        db.session.add(users[4])
        db.session.commit()

        movies = [
            Movie(
                tmdb_id = 346698,
                title = "Barbie",
                image = "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/iuFNMS8U5cb6xfzi51Dbkovj7vM.jpg"
            ),
            Movie(
                tmdb_id = 872585,
                title = "Oppenheimer",
                image = "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg"
            ),
            Movie(
                tmdb_id = 736769,
                title = "They Cloned Tyrone",
                image = "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/hnzXoDaK346U4ByfvQenu2DZnTg.jpg"
            ),
            Movie(
                tmdb_id = 447365,
                title = "Guardians of the Galaxy Vol. 3",
                image = "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/r2J02Z2OpNTctfOSN1Ydgii51I3.jpg"
            ),
            Movie(
                tmdb_id = 575264,
                title = "Mission: Impossible - Dead Reckoning Part One",
                image = "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/NNxYkU70HPurnNCSiCjYAmacwm.jpg"
            ),
            Movie(
                tmdb_id = 747188,
                title = "Asteroid City",
                image = "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/tcKBclNUdkas4Jis8RYYZnPdTIm.jpg"
            ),
            Movie(
                tmdb_id = 569094,
                title = "Spider-Man: Across the Spider-Verse",
                image = "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/8Vt6mWEReuy4Of61Lnj5Xj704m8.jpg"
            ),
            Movie(
                tmdb_id = 335977,
                title = "Indiana Jones and the Dial of Destiny",
                image = "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/Af4bXE63pVsb2FtbW8uYIyPBadD.jpg"
            ),
            Movie(
                tmdb_id = 502356,
                title = "The Super Mario Bros. Movie",
                image = "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/qNBAXBIQlnOThrVvA6mA2B5ggV6.jpg"
            ),
            Movie(
                tmdb_id = 666277,
                title = "Past Lives",
                image = "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/k3waqVXSnvCZWfJYNtdamTgTtTA.jpg"
            )
        ]

        db.session.add_all(movies)
        db.session.commit()

        slates = [
            Slate(
                created_by = "boom_resolve",
                slate_title = "Slate #1",
                description = fake.paragraph(nb_sentences=5)
            ),
            Slate(
                created_by = "boom_resolve",
                slate_title = "Slate #2",
                description = fake.paragraph(nb_sentences=5)
            ),
            Slate(
                created_by = "waffle_affair",
                slate_title = "Slate #3",
                description = fake.paragraph(nb_sentences=5)
            ),
            Slate(
                created_by = "waffle_affair",
                slate_title = "Slate #4",
                description = fake.paragraph(nb_sentences=5)
            ),
            Slate(
                created_by = "itch_protection",
                slate_title = "Slate #5",
                description = fake.paragraph(nb_sentences=5)
            ),
            Slate(
                created_by = "itch_protection",
                slate_title = "Slate #6",
                description = fake.paragraph(nb_sentences=5)
            ),
            Slate(
                created_by = "beep_tone",
                slate_title = "Slate #7",
                description = fake.paragraph(nb_sentences=5)
            ),
            Slate(
                created_by = "beep_tone",
                slate_title = "Slate #8",
                description = fake.paragraph(nb_sentences=5)
            ),
            Slate(
                created_by = "groan_departure",
                slate_title = "Slate #9",
                description = fake.paragraph(nb_sentences=5)
            ),
            Slate(
                created_by = "groan_departure",
                slate_title = "Slate #10",
                description = fake.paragraph(nb_sentences=5)
            )
        ]

        db.session.add_all(slates)
        db.session.commit()

        for i in range(10):
            slated_movie = SlatedMovie(
                    slate_id = 1,
                    movie_id = i + 1,
                    position_number = i
                )
            db.session.add(slated_movie)
            db.session.commit()

        for i in range(10):
            slated_movie = SlatedMovie(
                    slate_id = 2,
                    movie_id = i + 1,
                    position_number = i
                )
            db.session.add(slated_movie)
            db.session.commit()

        for i in range(10):
            slated_movie = SlatedMovie(
                    slate_id = 3,
                    movie_id = i + 1,
                    position_number = i
                )
            db.session.add(slated_movie)
            db.session.commit()

        for i in range(10):
            slated_movie = SlatedMovie(
                    slate_id = 4,
                    movie_id = i + 1,
                    position_number = i
                )
            db.session.add(slated_movie)
            db.session.commit()

        for i in range(10):
            slated_movie = SlatedMovie(
                    slate_id = 5,
                    movie_id = i + 1,
                    position_number = i
                )
            db.session.add(slated_movie)
            db.session.commit()

        for i in range(10):
            slated_movie = SlatedMovie(
                    slate_id = 6,
                    movie_id = i + 1,
                    position_number = i
                )
            db.session.add(slated_movie)
            db.session.commit()

        for i in range(10):
            slated_movie = SlatedMovie(
                    slate_id = 7,
                    movie_id = i + 1,
                    position_number = i
                )
            db.session.add(slated_movie)
            db.session.commit()

        for i in range(10):
            slated_movie = SlatedMovie(
                    slate_id = 8,
                    movie_id = i + 1,
                    position_number = i
                )
            db.session.add(slated_movie)
            db.session.commit()

        for i in range(10):
            slated_movie = SlatedMovie(
                    slate_id = 9,
                    movie_id = i + 1,
                    position_number = i
                )
            db.session.add(slated_movie)
            db.session.commit()

        for i in range(10):
            slated_movie = SlatedMovie(
                    slate_id = 10,
                    movie_id = i + 1,
                    position_number = i
                )
            db.session.add(slated_movie)
            db.session.commit()

        for i in range(50):
            comment = Comment(
                    slate_id = randint(1, 10),
                    created_by = randint(1, 5),
                    comment = fake.paragraph(nb_sentences=5)
                )
            db.session.add(comment)
            db.session.commit()