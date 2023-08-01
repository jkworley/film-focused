
function TMDBSearchResult({ id, title, poster_path, release_date }) {
    
    const release_year = release_date.slice(0, 4)
    
    return (
        <div className="relative hover-trigger">
            <div className="w-full p-2 text-sm absolute bg-neutral-600/75 hover-target">
                <p>{title} {release_date.length > 0 ? <>({release_year})</> : <></>}</p>
            </div>
            <img id={id} src={poster_path ? `https://image.tmdb.org/t/p/w600_and_h900_bestv2${poster_path}` : "https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-38-picture-grey-c2ebdbb057f2a7614185931650f8cee23fa137b93812ccb132b9df511df1cfac.svg"} className={poster_path ? "" : "h-full opacity-50 border border-neutral-500"}/>
        </div>
    )
}

export default TMDBSearchResult;