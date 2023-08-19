
function CreateComment({ newComment, setNewComment, handleCloseModal, handleSubmit }) {

    return (
        <div className="lg:w-1/2 md:w-1/2 bg-gray-200 rounded-lg p-4 flex flex-col md:mx-auto w-full mt-10">
            <div className="w-full flex justify-end">
                <button onClick={handleCloseModal} style={{ fontFamily: 'Viga-Regular' }} className="text-white bg-red-700 uppercase border-0 px-2 focus:outline-none hover:bg-red-800 rounded text-lg -mr-2 -mt-2">X</button>
            </div> 
            <form onSubmit={handleSubmit} >
                <label htmlFor="comment" className="block mb-2 text-sm font-medium text-gray-900">Comment</label>
                <textarea onChange={e => setNewComment(e.target.value)} value={newComment} id="comment" rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 focus:outline-none rounded-lg border-none mb-4" placeholder="Write your comment here..."></textarea>
                <div className="flex justify-end">
                    <button type="submit" style={{ fontFamily: 'Viga-Regular' }} className="text-white bg-sky-700 uppercase border-0 py-2 px-8 focus:outline-none hover:bg-sky-800 rounded text-lg">Submit</button>
                </div>     
            </form>           
        </div>
    )
}

export default CreateComment