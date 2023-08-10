import { useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import UserDetails from "./UserDetails";
import UserSlates from "./UserSlates";

function UserProfile({ user, setUser, userSlates, setUserSlates, setSlates }) {
    
    // NAVIGATION
    const navigate = useNavigate()

    // GET SLATES
    useEffect(() => {
        fetch("/slates")
        .then(resp => resp.json())
        .then(slate => {
            setSlates(slate)
        })

        fetch("/check_session")
        .then((response) => {
            if (response.ok) {
                response.json()
                .then((user) => {
                    setUser(user[0])
                    setUserSlates(user[0].slates)
                })
            }
        })
        
    }, [])

    // HANDLE DELETE SLATE & RERENDER
    function handleDelete(id) {
        fetch(`/slates/${id}`, {
            method: "DELETE"
        })
        .then(resp => resp.json())
        .then(resp => console.log(resp))

        reRenderUserSlates()
    } 

    const renderUserSlates = userSlates.map((slate) =>
        <UserSlates 
            key = {slate.id}
            slate = {slate}
            id = {slate.id}
            title = {slate.slate_title}
            created = {slate.created_at}
            handleDelete = {handleDelete}
        />
    )

    // RERENDER SLATES ON DELETE CHECKS SESSION AND RESETS STATE
    function reRenderUserSlates() {
        fetch("/check_session")
        .then((response) => {
            if (response.ok) {
                response.json()
                .then((user) => {
                    setUser(user[0])
                    setUserSlates(user[0].slates)
                })
            }
        })

        window.location.reload(true)
    }

    if (!user) {
        navigate("/login")
    } else {    
        return(
            <div className="w-auto ml-10 mr-20 grid grid-cols-4 p-4">
                <div className="col-span-1">
                    <UserDetails user={user} setUser={setUser} />
                </div>
                <div className="col-span-3">
                    {userSlates.length >= 1 ? <div className="px-10 flex flex-col-reverse">{renderUserSlates}</div> : <div className="px-10"><button style={{ fontFamily: 'Viga-Regular' }} className="text-white bg-sky-700 uppercase border-0 py-2 px-8 focus:outline-none hover:bg-sky-800 rounded text-lg"><NavLink to="/create_slate">Add Slates</NavLink></button></div>}
                </div>
            </div>
        )
    }
}

export default UserProfile;