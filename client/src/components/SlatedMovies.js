
function SlatedMovies({ movie, handleRemove }) {
    
    return (
        <div className="flex flex-col p-1">
            <img src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2${movie.movie_details ? movie.movie_details.image : movie.image}`} alt={`${movie.movie_details ? movie.movie_details.title : movie.title} poster`} className="w-20 shadow-md shadow-neutral-700"></img>
            <button id={movie.movie_details ? movie.movie_details.tmdb_id : movie.id} onClick={(e) => handleRemove(e)} style={{ fontFamily: 'Viga-Regular' }} className="shadow-md shadow-neutral-700 text-white bg-red-700 uppercase border-0 h-4 mt-2 px-1 focus:outline-none hover:bg-red-800 rounded text-xs">Remove</button>
        </div>
    )
}

export default SlatedMovies