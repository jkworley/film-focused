import ReactModal from "react-modal";
import TMDBMovieDetails from "./TMDBMovieDetails";
import { useState } from "react";

function TMDBSearchResult({ api_key, id, title, poster_path, release_date, handleSlateMovie }) {
    const [ showModal, setShowModal ] = useState(false)
    const [ movieDetails, setMovieDetails ] = useState({})
    const [ movieCredits, setMovieCredits ] = useState({})

    function handleOpenModal() {
        setShowModal(true)
    }

    function handleCloseModal() {
        setShowModal(false)
    }    

    const release_year = release_date.slice(0, 4)

    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: api_key
        }
    }
      
    function handleTMDBSearchById(e) {
        e.preventDefault()
        console.log(e.target.id)      
        fetch(`https://api.themoviedb.org/3/movie/${e.target.id}`, options)
            .then(response => response.json())
            .then(response => setMovieDetails(response))
            .catch(err => console.error(err))

        fetch(`https://api.themoviedb.org/3/movie/${e.target.id}/credits`, options)
            .then(response => response.json())
            .then(response => setMovieCredits(response))
            .catch(err => console.error(err))
        
        handleOpenModal()
    }
    
    return (
        <div>
            <div className="relative hover-trigger">
                <div id={id} onClick={handleTMDBSearchById} className="w-full p-2 text-sm absolute bg-neutral-600/75 hover-target hover:cursor-pointer">
                    <p id={id} onClick={handleTMDBSearchById} >{title} {release_date.length > 0 ? <>({release_year})</> : <></>}</p>
                </div>
                <img id={id} onClick={handleTMDBSearchById} src={poster_path ? `https://image.tmdb.org/t/p/w600_and_h900_bestv2${poster_path}` : "https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-38-picture-grey-c2ebdbb057f2a7614185931650f8cee23fa137b93812ccb132b9df511df1cfac.svg"} className={poster_path ? "hover:cursor-pointer" : "cursor-pointer opacity-50 border border-neutral-500"}/>
            </div>
            <ReactModal isOpen={showModal} ariaHideApp={false} className="modal" overlayClassName="overlay">
                <TMDBMovieDetails close_modal={handleCloseModal} movie_details={movieDetails} movie_credits={movieCredits} handleSlateMovie={handleSlateMovie}/>
            </ReactModal>
        </div>
    )
}

export default TMDBSearchResult;