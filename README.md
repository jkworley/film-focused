# Film Focused README

Film Focused is a full-stack application for making lists "slates" of movies.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Requirements](#requirements)
- [Getting Started](#getting-started)
  - [Installation](#installation)
  - [Configuration](#configuration)
  - [Running the Application](#running-the-application)
- [Folder Structure](#folder-structure)
- [License](#license)

## Introduction

This application was created as a part of the Flatiron Software Engineering course. 

Film Focused allows users to create lists, called "slates," that are based on any parameters that the user defines. For expamle, users could create slates for upcoming movies they want to see, or favorite action movies, or movies that follow a theme. The application is built on the Movie Database API which provides robust and up-to-date information.

## Features

Key features:

- Database integration (Flask)
- Front-end using React
- API endpoints connected to local database and the Movie Database API
- Full CRUD operations

## Requirements

List the software and tools required to run your application. For example:

- Python 
- npm 
- Flask
- Web browser (for running the React front-end)

## Getting Started

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/jkworley/film-focused.git
   ```

2. Navigate to the project directory:

   ```bash
   cd film-focused
   ```

3. Install the dependencies for the server:

   ```bash
   cd server
   pipenv install
   ```

4. Install the dependencies for the client (React):

   ```bash
   cd ../client
   npm install
   ```

### Configuration

Currently, the Movie Database key is not published here. You can connect by creating your own Movie Database account, requesting API access, and providing the key in a .env file.

### Running the Application

1. Start the server:

   ```bash
   cd ../server
   export FLASK_APP=app.py
   export FLASK_RUN_PORT=5555
    
   flask db init
   flask db revision --autogenerate -m "Create table <table name>"
   flask db upgrade
   python seed.py
    
   python app.py
   ```

2. Start the client:

   ```bash
   cd ../client
   npm start
   ```

## Structure

- `server/`: Server-side code (Flask)
- `client/`: Client-side code (React)
- `models.py`: Database models
- `routes.py`: API routes

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.
