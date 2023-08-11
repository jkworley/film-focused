import { useState } from "react";
import TMDBSearchResult from "./TMDBSearchResult";

function TMDBSearch({ api_key, handleSlateMovie }) {

    // SETTING STATE FOR TMDB SEARCH AND PAGINATION
    const [ seachTerm, setSearchTerm ] = useState("")
    const [ searchResults, setSearchResults ] = useState([])
    const [ pageNumber, setPageNumber ] = useState(1)
    const [ totalPages, setTotalPages ] = useState(0)

    // HEADER OPTIONS FOR TMDB GET REQUEST
    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: api_key
        }
    }
    
    // TMDB SEARCH BY TITLE
    function handleTMDBSearchByTitle(e) {
        e.preventDefault()
        
        let page_number = pageNumber
                
        fetch(`https://api.themoviedb.org/3/search/movie?query=${e.target.searchByTitleInput.value}&page=${page_number}`, options)
            .then(response => response.json())
            .then(response => {
                setSearchResults(response.results)
                setTotalPages(response.total_pages)
            })
            .catch(err => console.error(err));
        
        setSearchTerm(e.target.searchByTitleInput.value)
    }

    // TMDB SEARCH BY TITLE FOR ADDITIONAL PAGES OF RESULTS
    function handleChangePage(value) {
        console.log(`https://api.themoviedb.org/3/search/movie?query=${seachTerm}&page=${value}`)
        
        fetch(`https://api.themoviedb.org/3/search/movie?query=${seachTerm}&page=${value}`, options)
            .then(response => response.json())
            .then(response => {
                setSearchResults(response.results)
                setTotalPages(response.total_pages)
            })
            .catch(err => console.error(err));
        
        setPageNumber(value)
    }

    const renderMovies = searchResults?.map((result) => 
        <TMDBSearchResult 
            api_key = {api_key}
            key = {result.id}
            id = {result.id}
            title = {result.title}
            poster_path = {result.poster_path}
            release_date = {result.release_date}
            handleSlateMovie = {handleSlateMovie}
        />
    )
    
    return (
        <div className="h-auto w-auto mt-5">
            <p className="mb-5 flex justify-center">Search the Movie Database (TMDB) by title to add films to a new slate</p>
            <div className="container h-auto mx-auto flex justify-center p-2 md:p-0">
                <div className="grid grid-cols-1 gap-6 rounded-lg content-end">
                    <form onSubmit={handleTMDBSearchByTitle}>
                        <input type="text" placeholder="Enter text here..." className="bg-gray-300 max-w-full p-2 rounded focus:outline-none text-gray-700 text-sm mr-2" name="searchByTitleInput" required/>
                        <button type="submit" style={{ fontFamily: 'Viga-Regular' }} className="w-auto uppercase p-2 rounded-md bg-sky-700 text-white text-sm">Search</button>
                    </form>
                </div>
            </div>
            <div className="w-auto p-5 grid grid-cols-5 gap-4">
                {renderMovies}
            </div>
            <div style={{ fontFamily: 'Viga-Regular' }} className={totalPages > 1 ? "flex justify-center" : "hidden"}>  
                <button onClick={() => handleChangePage(1)} className="m-4 uppercase bg-sky-700 border-0 py-1 px-3 focus:outline-none hover:bg-sky-800 rounded text-base">first</button>
                <button onClick={() => handleChangePage(pageNumber - 1)} className="m-4 uppercase bg-sky-700 border-0 py-1 px-3 focus:outline-none hover:bg-sky-800 rounded text-base">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fillRule="currentColor" className="bi bi-arrow-left" viewBox="0 0 16 16"> 
                        <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/> 
                    </svg>
                </button>
                <button onClick={() => handleChangePage(pageNumber + 1)} className="m-4 uppercase bg-sky-700 border-0 py-1 px-3 focus:outline-none hover:bg-sky-800 rounded text-base">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fillRule="currentColor" className="bi bi-arrow-right" viewBox="0 0 16 16"> 
                        <path fillRule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"/> 
                    </svg>
                </button>
                <button onClick={() => handleChangePage(totalPages)} className="m-4 uppercase bg-sky-700 border-0 py-1 px-3 focus:outline-none hover:bg-sky-800 rounded text-base">last</button>
            </div>
        </div>
    )
}

export default TMDBSearch;