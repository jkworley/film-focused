import { NavLink, useNavigate } from "react-router-dom";
import UserDetails from "./UserDetails";
import UserSlates from "./UserSlates";

function UserProfile({ user, setUser, user_slates, setUserSlates }) {
    
    // NAVIGATION
    const navigate = useNavigate()

    // HANDLE DELETE SLATE & RERENDER
    function handleDelete(id) {
        fetch(`/slates/${id}`, {
            method: "DELETE"
        })
        .then(resp => resp.json())
        .then(resp => console.log(resp))

        reRenderUserSlates()
    } 

    const renderUserSlates = user_slates.map((slate) =>
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
            <div className="flex place-content-center">
                <div className="w-auto ml-10 mr-20 grid grid-cols-4 p-4">
                    <div className="col-span-1">
                        <UserDetails user={user} />
                    </div>
                    <div className="col-span-3 px-10">
                        {user_slates.length >= 1 ? renderUserSlates : <h1><NavLink to="/create_slate">Add Slates</NavLink></h1>}
                    </div>
                </div>
            </div>
        )
    }
}

export default UserProfile;