import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SlatePreviewMovies from "./SlatePreviewMovies";
import CommentCard from "./CommentCard";
import ReactModal from "react-modal";
import CreateComment from "./CreateComment";

function SlateDetails({ user, comments }) {

    const params = useParams();

    const [ slate, setSlate ] = useState([])

    // SET STATE FOR MODAL TOGGLE
    const [ showModal, setShowModal ] = useState(false)

    const [ newComment, setNewComment ] = useState("")

    // FUNCTIONS TO TOGGLE MODAL
    function handleOpenModal() {
        setShowModal(true)
    }

    function handleCloseModal() {
        setShowModal(false)
    }

    useEffect(()=>{
        fetch(`/slates/${params.slateId}`)
            .then(resp=> resp.json())
            .then(slate => setSlate(slate))
    }, [params.slateId])

    const renderSlatePreviewMovies = slate.slated_movies?.map((movie) => 
        <SlatePreviewMovies 
            key = {movie.position_number}
            title = {movie.movie_details.title}
            image = {movie.movie_details.image}
            position = {movie.position_number}
        />)

    const slateComments = comments.filter((comment) => comment.slate_id == params.slateId)

    const renderComments = slateComments?.map((comment) =>
        <CommentCard 
            key = {comment.id}
            comment = {comment}
            user = {comment.user}
        />)

    function handleSubmit(e) {
        e.preventDefault()

        let slate_id = params.slateId
        let created_by = user.id
        let comment = newComment

        fetch("/comments", {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type":"application/json"
            },
            body: JSON.stringify({ slate_id, created_by, comment }),
        })
        .then((resp) => {
            if (resp.ok) {
                resp.json()
                .then((resp) => {
                    console.log(resp)
                })
            }
        })

        handleCloseModal()

        window.location.reload(true)
    }
    
    return (
        <section className="body-font overflow-hidden">
            <div className="container px-5 py-8 mx-auto">
                <div className="flex flex-wrap md:flex-nowrap">
                    <div className="bg-neutral-700/50 w-full md:w-1/6 md:mb-0 flex-shrink-0 flex flex-col p-4">
                        <span style={{ fontFamily: 'Viga-Regular' }} className="text-lg title-font uppercase">{slate.slate_title}</span>
                        <span className="mt-1 text-gray-400 text-sm">created by<br/>{slate.created_by}</span>
                    </div>
                    <div className="mx-auto mr-8 grid grid-cols-5 md:grid-cols-10">
                        {renderSlatePreviewMovies}
                    </div>
                </div>
            </div>
            <div></div>
            <div className="grid grid-cols-8">
                <div className="col-span-2 pl-36 pr-6">
                    <h1 style={{ fontFamily: 'Viga-Regular' }} className="text-lg title-font uppercase">Slate Description</h1>
                    {slate.description}
                </div>
                <div className="col-span-6 pr-44 mb-10">
                    <div className="uppercase mb-6 md:ml-auto flex justify-between">
                        <h1 style={{ fontFamily: 'Viga-Regular' }} className="text-lg title-font uppercase self-center">Comments</h1>
                        <div>
                            {user ? <button onClick={handleOpenModal} style={{ fontFamily: 'Viga-Regular' }} className="uppercase bg-sky-700 border-0 py-1 px-3 focus:outline-none hover:bg-sky-800 rounded self-center">Create Comment</button> : <></>}  
                        </div>
                    </div>
                    <div className="flex flex-col-reverse">
                        {renderComments}
                    </div>
                </div>
                <ReactModal isOpen={showModal} ariaHideApp={false} className="modal" overlayClassName="overlay">
                    <CreateComment newComment={newComment} setNewComment={setNewComment} handleCloseModal={handleCloseModal} handleSubmit={handleSubmit}/>
                </ReactModal>
            </div>
        </section>
    )
}

export default SlateDetails