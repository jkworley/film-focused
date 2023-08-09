import { useState } from "react";
import TMDBSearch from "./TMDBSearch";

function CreateSlate({ api_key, user }) {
    const [ slatedMovies, setSlatedMovies ] = useState([])
    const [ slateTitle, setSlateTitle ] = useState("")

    function handleSlateMovie(e, movie_details) {        
        let new_movie = {
            "key": movie_details.tmdb_id,
            "image": `https://image.tmdb.org/t/p/w600_and_h900_bestv2${movie_details.poster_path}`,
            "title": movie_details.title,
            "tmdb_id": movie_details.id,
        }
        
        if (slatedMovies.length < 10) {
            setSlatedMovies([...slatedMovies, new_movie])
        } else {
            window.alert("Slates are limited to 10 movies")
        }
    }

    function handleRemove(e) {
        let updated_slate = slatedMovies.filter((movie) => movie.tmdb_id != e.target.id)

        setSlatedMovies(updated_slate)
    }

    const renderSlatedMovies = slatedMovies?.map((movie) => 
        <div className="flex flex-col p-1">
            <img src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2${movie.image}`} className="w-20"></img>
            {/* <p className="text-xs p-2 flex-grow">{movie.title}</p> */}
            <button id={movie.tmdb_id} onClick={(e) => handleRemove(e)} style={{ fontFamily: 'Viga-Regular' }} className="text-white bg-red-700 uppercase border-0 h-4 mt-2 px-1 focus:outline-none hover:bg-red-800 rounded text-xs">Remove</button>
        </div>
    )

    function handleCreateSlate(e) {
        e.preventDefault()

        let new_slate = {
            created_by: user.username,
            slate_title: slateTitle
        }

        fetch("/slates", {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(new_slate)
        })
        .then(resp => resp.json())
        .then(resp => {
            addMovie(resp.id)
        })
    }

    function addMovie(new_slate_id) {
        slatedMovies.forEach((movie) => {
            fetch("/movies", {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(movie)
            })
            .then(resp => resp.json())
            .then(resp => {
                slateMovie(new_slate_id, resp.id, slatedMovies.findIndex(movie_to_index => movie_to_index.title === `${movie.title}`))
            })
        })
    }

    function slateMovie(new_slate_id, new_movie_id, movie_position) {
        let movie_to_slate = {
            slate_id: new_slate_id,
            movie_id: new_movie_id,
            position_number: movie_position
        }

        fetch("/slated_movies", {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(movie_to_slate)
        })
        .then(resp => resp.json())
        .then(resp => console.log(resp))
    }

    return (
        <div className="flex flex-col items-center">
            <div className="w-full bg-neutral-500/50 p-5 flex flex-col items-center">
                <div className="mb-4">
                    <div>
                        <form onSubmit={e => handleCreateSlate(e)}>
                            <input onChange={e => setSlateTitle(e.target.value)} value={slateTitle} type="text" placeholder="Slate title..." className="bg-gray-300 max-w-full p-2 rounded focus:outline-none text-gray-700 text-sm mr-2" name="slate_title" required/>
                            <button type="submit" style={{ fontFamily: 'Viga-Regular' }} className="w-auto uppercase p-2 rounded-md bg-sky-700 text-white text-sm">Create Slate</button>
                        </form>
                    </div>
                </div>
                <div className="grid grid-flow-col auto-cols-max">{renderSlatedMovies}</div>
            </div>
            <div className="w-3/4">
                <TMDBSearch api_key={api_key} handleSlateMovie={handleSlateMovie}/>
            </div>
        </div>
    )
}

export default CreateSlate;