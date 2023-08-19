
function CommentCard({ comment, user }) {

    const convert_to_date = new Date(`${comment.created_at}`)

    const display_date = convert_to_date.toLocaleDateString()

    // const date = display_date.slice(0, 9)

    const display_time = convert_to_date.toLocaleTimeString()

    return (
        <section className="body-font overflow-hidden">
            <div className="container bg-neutral-800 mb-2 px-5 py-4 mx-auto">
                <div className="-my-8 divide-y-2 divide-gray-100">
                    <div className="py-8 flex flex-wrap md:flex-nowrap">
                        <div className="md:w-64 md:mb-0 mb-6 flex-shrink-0 flex flex-col">
                            <span className="">{user.username}</span>
                            <span className="mt-1 text-gray-500 text-sm">{display_date}</span>
                            <span className="mt-1 text-gray-500 text-sm">{display_time}</span>
                        </div>
                        <div className="md:flex-grow">
                            <p className="leading-relaxed">{comment.comment}</p>
                        </div>
                    </div>      
                </div>
            </div>
        </section>
    )
}

export default CommentCard