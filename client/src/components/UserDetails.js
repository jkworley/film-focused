import { useState } from "react";
import ReactModal from "react-modal";

function UserDetails({ user }) {

    // SET STATE FOR UPDATE INFORMANTION MODAL
    const [ showModal, setShowModal ] = useState(false)

    // FUNCTIONS TO TOGGLE MODAL
    function handleOpenModal() {
        setShowModal(true)
    }

    function handleCloseModal() {
        setShowModal(false)
    }    

    if (user) {
    return (
        <div>
            <div className="grid justify-items-end">
                <h3 style={{ fontFamily: 'Viga-Regular' }} className="uppercase">Username</h3>
                <div className="flex justify-center mt-2">
                    <p className="mr-2">{user.username}</p>
                    <button onClick={handleOpenModal} style={{ fontFamily: 'Viga-Regular' }} className="bg-sky-700 uppercase border-0 py-1 px-2 focus:outline-none hover:bg-sky-800 rounded text-xs">
                        <svg style={{color: "white"}} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil" viewBox="0 0 16 16">
                            <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z" fill="white"></path>
                        </svg>
                    </button>
                </div>
                <h3 style={{ fontFamily: 'Viga-Regular' }} className="mt-5 uppercase">Email</h3>
                <div className="flex justify-center mt-2">
                    <p className="mr-2">{user.email}</p>
                    <button onClick={handleOpenModal} style={{ fontFamily: 'Viga-Regular' }} className="bg-sky-700 uppercase border-0 py-1 px-2 focus:outline-none hover:bg-sky-800 rounded text-xs">
                        <svg style={{color: "white"}} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil" viewBox="0 0 16 16">
                            <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z" fill="white"></path>
                        </svg>
                    </button>
                </div>            
            </div>
            <ReactModal isOpen={showModal} ariaHideApp={false} className="modal" overlayClassName="overlay">
                <div className="lg:w-2/6 md:w-1/2 bg-gray-200 rounded-lg p-8 flex flex-col md:mx-auto w-full mt-10">
                    <form >
                        <h2 class="text-gray-700 text-xl font-semibold title-font mb-5">Update Information</h2>
                        <div className="relative mb-4">
                            <label htmlFor="username" className="leading-7 text-sm text-gray-600">Username</label>
                            <input type="text" id="username" name="username" className="w-full bg-white rounded border border-gray-300 focus:border-sky-700 focus:ring-2 focus:ring-sky-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" required />
                        </div>
                        <div className="relative mb-4">
                            <label htmlFor="email" className="leading-7 text-sm text-gray-600">Email</label>
                            <input type="text" id="email" name="email" className="w-full bg-white rounded border border-gray-300 focus:border-sky-700 focus:ring-2 focus:ring-sky-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" required />
                        </div>
                        <div className="relative mb-4">
                            <label htmlFor="password" className="leading-7 text-sm text-gray-600">Password</label>
                            <input type="password" id="password" name="password" className="w-full bg-white rounded border border-gray-300 focus:border-sky-700 focus:ring-2 focus:ring-sky-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" required />
                        </div>
                        <div className="flex justify-between">
                            <button onClick={handleCloseModal} style={{ fontFamily: 'Viga-Regular' }} className="text-white bg-red-700 uppercase border-0 py-2 px-8 focus:outline-none hover:bg-red-800 rounded text-lg">Cancel</button>
                            <button style={{ fontFamily: 'Viga-Regular' }} className="text-white bg-sky-700 uppercase border-0 py-2 px-8 focus:outline-none hover:bg-sky-800 rounded text-lg">Submit</button>
                        </div>
                    </form>
                </div>
            </ReactModal>
        </div>
    )
    } else {
        <h1>Loading...</h1>
    }
}

export default UserDetails;