import { useState } from "react";
import ReactModal from "react-modal";

function UserDetails({ user }) {
    const [ showModal, setShowModal ] = useState(false)

    function handleOpenModal() {
        setShowModal(true)
    }

    function handleCloseModal() {
        setShowModal(false)
    }    

    return(
        <div>
            <div className="grid justify-items-end px-10">
                <h3 style={{ fontFamily: 'Viga-Regular' }} className="uppercase">Username</h3>
                <p>{user.username}</p>
                <h3 style={{ fontFamily: 'Viga-Regular' }} className="mt-5 uppercase">Email</h3>
                <p>{user.email}</p>
                <button onClick={handleOpenModal} style={{ fontFamily: 'Viga-Regular' }} className="bg-sky-700 uppercase mt-5 border-0 py-1 px-2 focus:outline-none hover:bg-sky-800 rounded text-xs">Update</button>
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
}

export default UserDetails;