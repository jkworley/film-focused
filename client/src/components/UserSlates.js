import SlatePreviewMovies from "./SlatePreviewMovies";

function UserSlates({ slate, title, id, created, handleDelete }) {
    
    const renderSlatePreviewMovies = slate.slated_movies.map((movie) => 
    
    <SlatePreviewMovies 
        key = {movie.position_number}
        title = {movie.movie_details.title}
        image = {movie.movie_details.image}
        position = {movie.position_number}
    />)

    return(
        <div className="mb-5">
            <div className="bg-neutral-700/50 p-4 flex justify-between">
                <div className="w-5/6">
                    <p style={{ fontFamily: 'Viga-Regular' }} className="uppercase">{title}</p>
                    <p className="text-xs">{created}</p>
                </div>
                <button id={id} onClick={() => handleDelete(id)} style={{ fontFamily: 'Viga-Regular' }} className="bg-red-700 uppercase border-0 py-1 px-2 focus:outline-none hover:bg-red-800 rounded text-xs">Delete</button>
            </div>
            <div className="flex flex-wrap md:flex-wrap justify-center">
                <div className="grid grid-cols-5 md:grid-cols-10">
                    {renderSlatePreviewMovies}
                </div>
            </div>
        </div>
    )
}

export default UserSlates;