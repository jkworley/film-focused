
function TMDBMovieDetails({ handleCloseModal, movieDetails, movieCredits, handleSlateMovie }) {
    
    const {
        budget,
        genres,
        overview,
        popularity,
        poster_path,
        production_companies,
        release_date,
        revenue,
        runtime,
        tagline,
        title,
        vote_average,
        vote_count
    } = movieDetails

    const {
        cast,
        crew
    } = movieCredits

    const release_year = release_date?.slice(0, 4)

    const movie_genres = genres?.map((genre) =>
        <p className="text-xs bg-neutral-900/75 rounded p-1 m-1">{genre.name}</p>
    )

    const movie_production_companies = production_companies?.map((company) =>
        <p className="text-xs bg-neutral-900/75 rounded p-1 m-1">{company.name}</p>
    )

    const movie_cast = cast?.slice(0,10).map((actor) =>
        <p className="text-xs bg-neutral-900/75 rounded p-1 m-1">{actor.name}</p>
    )

    const director = crew?.filter((crew) => crew?.job === "Director")

    const movie_director = director?.map((director) => 
        <p className="text-xs bg-neutral-900/75 rounded p-1 m-1">{director.name}</p>
    )

    const writers = crew?.filter((crew) => crew?.job === "Writer")

    const movie_writers = writers?.map((writer) => 
        <p className="text-xs bg-neutral-900/75 rounded p-1 m-1">{writer.name}</p>
    )

    // FUNCTION TO HANDLE ADDING MOVIE TO SLATE AND CLOSING MODAL
    function slateMovie(id, movieDetails, poster_path) {
        handleSlateMovie(id, movieDetails, poster_path)
        handleCloseModal()
    }
    
    return (
        <div className="lg:w-5/6 md:w-5/6 bg-neutral-700 rounded-lg p-8 md:mx-auto w-full mt-10">
            <div className="w-full flex justify-end">
                <button onClick={handleCloseModal} style={{ fontFamily: 'Viga-Regular' }} className="text-white bg-red-700 uppercase border-0 px-2 focus:outline-none hover:bg-red-800 rounded text-lg -mr-4 -mt-4">X</button>
            </div>
            <div className="grid grid-cols-3">
                <div className="h-auto mr-4 flex flex-col">
                    <img src={movieDetails.poster_path ? `https://image.tmdb.org/t/p/w600_and_h900_bestv2${poster_path}` : "https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-38-picture-grey-c2ebdbb057f2a7614185931650f8cee23fa137b93812ccb132b9df511df1cfac.svg"} className="w-full" />
                    <button id={movieDetails.id} onClick={(e) => slateMovie(e.target.id, movieDetails, poster_path)} style={{ fontFamily: 'Viga-Regular' }} className="mt-5 mx-auto text-white bg-sky-700 uppercase border-0 py-2 px-8 focus:outline-none hover:bg-sky-800 rounded text-lg">Add to Slate</button>
                </div>
                <div className="col-span-2 flex flex-col justify-between">
                    <div className="flex flex-col justify-between">
                        <h1 className="text-2xl">{title} {release_date ? <>({release_year})</> : <></>}</h1>
                        <p className="text-sm mb-2">{tagline}</p>
                        <p className="mb-2">{overview}</p>
                        <p className="mb-2">{runtime} minutes</p>
                        <p className="text-sm">Genres</p>
                        <div className="flex flex-wrap mb-2">{movie_genres}</div>
                        <p className="text-sm">Directed by</p>
                        <div className="flex flex-wrap mb-2">{movie_director}</div>
                        <p className="text-sm">Written by</p><div className="flex flex-wrap mb-2">{movie_writers}</div>
                        <p className="text-sm">Starring</p><div className="flex flex-wrap mb-2">{movie_cast}</div>
                        <p className="text-sm mb-2">Budget: ${budget?.toLocaleString('en-US')}</p>
                        <p className="text-sm mb-2">Revenue: ${revenue?.toLocaleString('en-US')}</p>
                        <p className="text-sm">Production</p><div className="flex mb-2">{movie_production_companies}</div>
                        <p className="text-sm mb-2">Average TMDB rating of {vote_average?.toFixed(2)} out of {vote_count} votes</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TMDBMovieDetails;