import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import TMDBSearch from "./TMDBSearch";
import ReactModal from "react-modal";
import SlatedMovies from "./SlatedMovies";

function EditSlate({ api_key, user }) {

    const params = useParams();

    // NAVIGATION
    const navigate = useNavigate()

    // SET STATE FOR NEW SLATE TITLE AND MOVIES
    const [ slatedMovies, setSlatedMovies ] = useState([])
    const [ slateTitle, setSlateTitle ] = useState("")
    const [ slateDescription, setSlateDescription ] = useState("")
    const [ removedItems, setRemovedItems ] = useState([])

    // SET STATE FOR MODAL TOGGLE
    const [ showModal, setShowModal ] = useState(false)

    // FUNCTIONS TO TOGGLE MODAL
    function handleOpenModal() {
        setShowModal(true)
    }

    function handleCloseModal() {
        setShowModal(false)
    }

    useEffect(()=>{
        fetch(`/slates/${params.slateId}`)
            .then(resp=> resp.json())
            .then(slate => {
                setSlatedMovies(slate.slated_movies)
                setSlateTitle(slate.slate_title)
                setSlateDescription(slate.description)
            })
    }, [])

    // HANDLE ADD MOVIE TO ARRAY FOR NEW SLATE
    // EVENT BUTTON LOCATED IN TMDB MOVIE DETAILS
    function handleSlateMovie(id, movieDetails, poster_path) {  
        let new_movie = {
            "key": id,
            "image": `https://image.tmdb.org/t/p/w600_and_h900_bestv2${poster_path}`,
            "title": movieDetails.title,
            "tmdb_id": id,
        }
        console.log(new_movie)      
        
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
        const removed_item = slatedMovies?.filter((movie) => movie.movie_details.tmdb_id == e.target.id)

        removed_item.map((item) => 
            setRemovedItems([...removedItems, item])
        )
        
        let updated_slate = slatedMovies?.filter((movie) => movie.movie_details.tmdb_id != e.target.id)
        
        setSlatedMovies(updated_slate)
    }

    // RENDER MOVIES ADDED TO ARRAY FOR NEW SLATE
    const renderSlatedMovies = slatedMovies?.map((movie) => 
        <SlatedMovies 
            key={movie.id} 
            movie={movie} 
            handleRemove={handleRemove}
        />
    )

    // HANDLE CREATE NEW SLATE
    // POST REQUEST TO BACKEND SENDS NESTED POST TO ADD MOVIE
    function handleCreateSlate(e) {
        e.preventDefault()

        removedItems.forEach((item) =>
            fetch(`/slated_movies/${item.id}`, {
                method: "DELETE"
            })
            .then(resp => resp.json())
            .then(resp => console.log(resp))
        )

        let updated_slate = {
            created_by: user.username,
            slate_title: slateTitle,
            description: slateDescription
        }

        fetch(`/slates/${params.slateId}`, {
            method: "PUT",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(updated_slate)
        })
        .then(resp => resp.json())
        .then(resp => {
            addMovie()
            console.log(resp)
        })

        handleCloseModal()
        navigate(`/slates/${params.slateId}`)
    }
    
    // HANDLE ADD MOVIE TO DATABASE
    // POST REQUEST CALLED FROM CREATE SLATE
    // NESTED FUNCTION POSTS SLATE/MOVIE RELATIONSHIPS
    function addMovie() {
        slatedMovies?.forEach((movie) => {
            let new_movie = {
                image: movie.movie_details.image,
                title: movie.movie_details.title,
                tmdb_id: movie.movie_details.tmdb_id
            }

            fetch("/movies", {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(new_movie)
            })
            .then(resp => resp.json())
            .then(resp => {
                slateMovie(params.slateId, resp.id, slatedMovies.findIndex(movie_to_index => movie_to_index.movie_details.title == `${new_movie.title}`))
            })
        })
    }

    // HANDLE CREATE MOVIE/SLATE RELATIONSHIP
    // POST REQUEST CALLED FROM ADD MOVIE
    function slateMovie(updated_slate_id, new_movie_id, movie_position) {
        let movie_to_slate = {
            slate_id: updated_slate_id,
            movie_id: new_movie_id,
            position_number: movie_position
        }

        console.log(movie_to_slate)

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
                    {slatedMovies.length > 0 ? <button onClick={handleOpenModal} style={{ fontFamily: 'Viga-Regular' }} className="w-auto uppercase p-2 mt-4 rounded-md bg-sky-700 text-white text-sm">Update Slate</button> : <></>}
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
                        <div className="grid grid-flow-col auto-cols-max gap-2">
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
                        <textarea onChange={e => setSlateDescription(e.target.value)} value={slateDescription} id="comment" rows="4" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 focus:outline-none rounded-lg border-none" placeholder="Write a description here..."></textarea>
                        </div>
                    </div>
                    <div className="flex justify-end">
                        <button type="submit" style={{ fontFamily: 'Viga-Regular' }} className="uppercase p-2 rounded-md bg-sky-700 text-white text-sm">Update Slate</button>
                    </div>
                </form>
            </div>
            </ReactModal>
        </div>
    )
}

export default EditSlate;