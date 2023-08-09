import SlatePreviewMovies from "./SlatePreviewMovies";

function SlatePreview({ slate, title, created_by }) {
    
    const renderSlatePreviewMovies = slate.slated_movies.map((movie) => 
        <SlatePreviewMovies 
            key = {movie.position_number}
            title = {movie.movie_details.title}
            image = {movie.movie_details.image}
            position = {movie.position_number}
        />)
    
    return (
        <section className="body-font overflow-hidden">
            <div className="container px-5 py-8 mx-auto">
                <div className="">
                    <div className="flex flex-wrap md:flex-nowrap">
                        <div className="bg-neutral-700/50 w-full md:w-1/6 md:mb-0 flex-shrink-0 flex flex-col p-4">
                            <span style={{ fontFamily: 'Viga-Regular' }} className="text-lg title-font uppercase">{title}</span>
                            <span className="mt-1 text-gray-400 text-sm">created by<br/>{created_by}</span>
                        </div>
                        <div className="mx-auto mr-8 grid grid-cols-5 md:grid-cols-10">
                            {renderSlatePreviewMovies}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default SlatePreview;