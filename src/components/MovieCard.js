//Componenets
import GenreTag from "./GenreTag"

// Images
import ratedR from "../assets/rated-r.png";
import ratedPG13 from "../assets/rated-pg-13.png";
import ratedPG from "../assets/rated-pg.png";
import ratedG from "../assets/rated-g.png";


const MovieCard = ({ id, title, rating, release, genres, runtime, poster, myRating }) => {
    
    function ratingSrc(rating) {
        if (rating === "R") {
            return String(ratedR)
        } else if (rating === "PG-13") {
            return String(ratedPG13)
        } else if (rating === "PG") {
            return String(ratedPG)
        } else if (rating === "G") {
            return String(ratedG)
        } else {
            return "https://static.tvtropes.org/pmwiki/pub/images/rating_nr.jpg"
        }
    }

    const releaseYear = new Date(release)

    const genreList = [genres.genre1, genres.genre2, genres.genre3]

    const genreTags = genreList.map(genre => {
        if (genre.length > 1) {
        return (
            <GenreTag 
                genre={genre} 
            />
        )
        } else {
            return null
        }
    })
    
    return (
        <div className="basis-1/5">
            <div className="bg-white rounded-lg shadow m-2">
                <a href="#">
                    <img className="rounded-t-lg" src={poster} alt={title} />
                </a>
                <div className="p-5">
                    <div className="h-24">
                        <a href="#">
                            <h5 className="text-2xl font-bold tracking-tight text-black">{title}</h5>
                            <p className="inline font-normal text-gray-700">({releaseYear.getFullYear()})</p>
                        </a>
                    </div>
                    <div className="mt-2 flex">
                        <img className="me-1 mb-1 h-5" src={ratingSrc(rating)} />
                        <p className="me-1 font-normal text-gray-700">{runtime} min</p>
                    </div>
                    <div className="mt-2">
                        {[...Array(myRating)].map(() => {
                            return (
                                <span className="text-yellow-500">&#9733;</span>
                            )
                        })}
                        </div>
                    <div className="h-20 flex flex-wrap flex-row justify-start mt-2">
                        {genreTags}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MovieCard;