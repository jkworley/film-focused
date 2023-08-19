import { useNavigate } from "react-router-dom";
import SlatePreviewMovies from "./SlatePreviewMovies";

function UserSlates({ slate, title, id, created, handleDelete }) {

    const navigate = useNavigate()

    
    const renderSlatePreviewMovies = slate.slated_movies.map((movie) => 
        <SlatePreviewMovies 
            key = {movie.position_number}
            title = {movie.movie_details.title}
            image = {movie.movie_details.image}
            position = {movie.position_number}
        />
    )

    const convert_to_date = new Date(`${created}`)

    const display_date = convert_to_date.toDateString()

    function handleClick() {
        navigate(`/slates/${slate.id}`)
    }

    function handleEdit() {
        navigate(`/slates/${slate.id}/edit`)
    }

    return(
        <div className="mb-5">
            <div className="bg-neutral-700/50 p-4 flex justify-between">
                <div id={slate.id} onClick={handleClick} className="w-5/6 hover:cursor-pointer">
                    <p style={{ fontFamily: 'Viga-Regular' }} className="uppercase">{title}</p>
                    <p className="text-xs">{display_date}</p>
                </div>
                <div className="flex justify-center">
                    {/* <button id={id} onClick={() => handleEdit(id)} style={{ fontFamily: 'Viga-Regular' }} className="text-white bg-sky-700 uppercase border-0 py-1 px-2 me-2 focus:outline-none hover:bg-sky-800 rounded text-xs">Edit Slate</button> */}
                    <button id={id} onClick={() => handleDelete(id)} style={{ fontFamily: 'Viga-Regular' }} className="bg-red-700 uppercase border-0 py-1 px-2 focus:outline-none hover:bg-red-800 rounded text-xs">Delete</button>
                </div>
            </div>
            <div id={slate.id} onClick={handleClick} className="flex flex-wrap md:flex-wrap justify-center hover:cursor-pointer">
                <div className="grid grid-cols-5 md:grid-cols-10">
                    {renderSlatePreviewMovies}
                </div>
            </div>
        </div>
    )
}

export default UserSlates;