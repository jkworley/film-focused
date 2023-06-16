// Components
import MovieCard from "./MovieCard";

const Collection = ({ movies }) => {
    
    const renderCollectionCards = movies.map(movie => {
        return (
            <MovieCard 
                key={movie.id}
                id={movie.id}
                title={movie.title}
                rating={movie.rating}
                release={movie.release}
                genres={movie.genres}
                runtime={movie.runtime}
                poster={movie.poster}
                writer={movie.writer}
                director={movie.director}
                myRating={movie.myRating}
                collection={movie.collection}
            />
        )
    })
    
    return (
        <div className="flex flex-row flex-wrap justify-left w-3/4 m-auto mb-10">
            {renderCollectionCards}
        </div>
    )
}

export default Collection;