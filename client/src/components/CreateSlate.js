import { useState } from "react";
import { useNavigate } from "react-router-dom";
import TMDBSearch from "./TMDBSearch";
import ReactModal from "react-modal";

function CreateSlate({ api_key, user }) {

    // NAVIGATION
    const navigate = useNavigate()

    // SET STATE FOR NEW SLATE TITLE AND MOVIES
    const [ slatedMovies, setSlatedMovies ] = useState([])
    const [ slateTitle, setSlateTitle ] = useState("")
    const [ slateDescription, setSlateDescription ] = useState("")

    // SET STATE FOR MODAL TOGGLE
    const [ showModal, setShowModal ] = useState(false)

    // FUNCTIONS TO TOGGLE MODAL
    function handleOpenModal() {
        setShowModal(true)
    }

    function handleCloseModal() {
        setShowModal(false)
    }
    
    // HANDLE ADD MOVIE TO ARRAY FOR NEW SLATE
    // EVENT BUTTON LOCATED IN TMDB MOVIE DETAILS
    function handleSlateMovie(e, movieDetails) {

        let new_movie = {
            "key": movieDetails.id,
            "image": `https://image.tmdb.org/t/p/w600_and_h900_bestv2${movieDetails.poster_path}`,
            "title": movieDetails.title,
            "tmdb_id": movieDetails.id,
        }
        
        if (slatedMovies.length === 0) {
            setSlatedMovies([...slatedMovies, new_movie])
        } else {
            let slated_movie_ids = []
            
            for (let i = 0; i < slatedMovies.length; i++) {
                slated_movie_ids.push(slatedMovies[i].tmdb_id)
            }
            
            if (slated_movie_ids.includes(new_movie.tmdb_id)) {
                window.alert("Can not add duplicate films to slate")
            } else if (slatedMovies.length >= 10) {
                window.alert("Slates are limited to 10 films")
            } else {
                setSlatedMovies([...slatedMovies, new_movie])
            }
        }
    }

    // HANDLE REMOVE MOVIE FROM ARRAY FOR NEW SLATE
    function handleRemove(e) {
        let updated_slate = slatedMovies.filter((movie) => movie.tmdb_id != e.target.id)

        setSlatedMovies(updated_slate)
    }

    // RENDER MOVIES ADDED TO ARRAY FOR NEW SLATE
    const renderSlatedMovies = slatedMovies?.map((movie) => 
        <div className="flex flex-col p-1">
            <img src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2${movie.image}`} alt={`${movie.title} poster`} className="w-20 shadow-md shadow-neutral-700"></img>
            <button id={movie.tmdb_id} onClick={(e) => handleRemove(e)} style={{ fontFamily: 'Viga-Regular' }} className="shadow-md shadow-neutral-700 text-white bg-red-700 uppercase border-0 h-4 mt-2 px-1 focus:outline-none hover:bg-red-800 rounded text-xs">Remove</button>
        </div>
    )

    // HANDLE CREATE NEW SLATE
    // POST REQUEST TO BACKEND SENDS NESTED POST TO ADD MOVIE
    function handleCreateSlate(e) {
        e.preventDefault()

        let new_slate = {
            created_by: user.username,
            slate_title: slateTitle,
            description: slateDescription
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
            console.log(resp)
            addMovie(resp.id)
        })

        handleCloseModal()
        navigate(`/profile`)
    }

    // HANDLE ADD MOVIE TO DATABASE
    // POST REQUEST CALLED FROM CREATE SLATE
    // NESTED FUNCTION POSTS SLATE/MOVIE RELATIONSHIPS
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
                slateMovie(new_slate_id, resp.id, slatedMovies.findIndex(movie_to_index => movie_to_index.title == `${movie.title}`))
            })
        })
    }

    // HANDLE CREATE MOVIE/SLATE RELATIONSHIP
    // POST REQUEST CALLED FROM ADD MOVIE
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
            <div className="h-60 w-5/6 bg-neutral-700/50 p-5 flex flex-col items-center rounded shadow-inner shadow-neutral-900">
                <div className="grid grid-flow-col auto-cols-max">
                    {slatedMovies.length == 0 ? <p className="text-neutral-400 mb-5 flex justify-center">Search the Movie Database (TMDB) by title to add films to a new slate</p> : renderSlatedMovies}
                </div>
                <div className="w-full flex justify-end">
                    {slatedMovies.length > 0 ? <button onClick={handleOpenModal} style={{ fontFamily: 'Viga-Regular' }} className="w-auto uppercase p-2 mt-4 rounded-md bg-sky-700 text-white text-sm">Create Slate</button> : <></>}
                </div>
            </div>
            <div className="w-3/4">
                <TMDBSearch api_key={api_key} handleSlateMovie={handleSlateMovie}/>
            </div>
            <ReactModal isOpen={showModal} ariaHideApp={false} className="modal" overlayClassName="overlay">
            <div className="lg:w-5/6 md:w-5/6 bg-neutral-800 rounded-lg p-8 md:mx-auto w-full mt-10">
                <div className="w-full flex justify-end">
                    <button onClick={handleCloseModal} style={{ fontFamily: 'Viga-Regular' }} className="text-white bg-red-700 uppercase border-0 px-2 focus:outline-none hover:bg-red-800 rounded text-lg -mr-2 -mt-2">X</button>
                </div>
                <form onSubmit={e => handleCreateSlate(e)}>
                    <div className="p-5 flex flex-col items-center">
                        <div className="grid grid-flow-col auto-cols-max">
                            {renderSlatedMovies}
                        </div>  
                    </div>
                    <div className="flex items-start justify-center my-4">
                        <div className="flex flex-col mx-4">
                        <label htmlFor="email" className="text-sm mb-1">Slate Title</label>        
                        <input onChange={e => setSlateTitle(e.target.value)} value={slateTitle} type="text" placeholder="Slate title..." className="bg-gray-50 max-w-full p-2 rounded focus:outline-none text-gray-700 text-sm" name="slate_title" required/>
                        </div>
                        <div className="flex flex-col w-2/5 mx-4">
                        <label htmlFor="email" className="text-sm mb-1">Slate Description</label>        
                        <textarea onChange={e => setSlateDescription(e.target.value)} value={slateDescription} id="comment" rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 focus:outline-none rounded-lg border-none" placeholder="Write a description here..."></textarea>
                        </div>
                    </div>
                    <div className="flex justify-end">
                        <button type="submit" style={{ fontFamily: 'Viga-Regular' }} className="uppercase p-2 rounded-md bg-sky-700 text-white text-sm">Create Slate</button>
                    </div>
                </form>
            </div>
            </ReactModal>
        </div>
    )
}

export default CreateSlate;