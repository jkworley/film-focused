import { useState } from "react";
import SlatePreview from "./SlatePreview";

function Slates({ slates }) {

    // SET STATE FOR SEARCH
    const [ seachTerm, setSearchTerm ] = useState("")

    // HANDLE SEARCH
    function handleSearch(e) {
        e.preventDefault()

        setSearchTerm(e.target.seachTerm.value)
    }

    // FILTER SEARCH RESULTS
    const filteredSlates = slates.filter((slate) => {
        return slate.slate_title.toLowerCase().includes(seachTerm.toLowerCase()) || slate.created_by.toLowerCase().includes(seachTerm.toLowerCase())
    })

    // RENDER SLATES
    const renderSlatePreviews = filteredSlates.map((slate) => 
        <SlatePreview
            key = {slate.id}
            slate = {slate}
            title = {slate.slate_title}
            created_by = {slate.created_by}
        />
    )
    
    return (
        <div>
            <div className="flex justify-center">
                <form onSubmit={handleSearch}>
                    <input onChange={e => setSearchTerm(e.target.value)} value={seachTerm} type="text" placeholder="Enter text here..." className="bg-gray-300 max-w-full p-2 rounded focus:outline-none text-gray-700 text-sm mr-2" name="searchByTitleInput" required/>
                    <button type="submit" style={{ fontFamily: 'Viga-Regular' }} className="w-auto uppercase p-2 rounded-md bg-sky-700 text-white text-sm">Search Slates</button>
                </form>
            </div>
            <div className="flex flex-col-reverse">
                {renderSlatePreviews}
            </div>
        </div>
    )
}

export default Slates;