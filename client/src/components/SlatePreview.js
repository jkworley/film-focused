import SlatePreviewMovies from "./SlatePreviewMovies";

function SlatePreview({ slate, title, created_by }) {
    const renderSlatePreviewMovies = slate.slated_movies.map((movie) => 
        <SlatePreviewMovies 
            key = {movie.movie_details.id}
            title = {movie.movie_details.title}
            image = {movie.movie_details.image}
            position = {movie.position_number}
        />)
    
    return (
        <section class="body-font overflow-hidden">
            <div class="container px-5 py-8 mx-auto">
                <div class="">
                    <div class="flex flex-wrap mr-16 md:flex-nowrap">
                        <div class="md:w-64 md:mb-0 mb-6 flex-shrink-0 flex flex-col">
                            <span style={{ fontFamily: 'Viga-Regular' }} class="text-lg title-font uppercase">{title}</span>
                            <span class="mt-1 text-gray-400 text-sm">created by<br/>{created_by}</span>
                        </div>
                        <div class="mx-auto grid grid-cols-5 md:grid-cols-10">
                            {renderSlatePreviewMovies}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default SlatePreview;