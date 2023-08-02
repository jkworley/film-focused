import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserDetails from "./UserDetails";
import UserSlates from "./UserSlates";

function UserProfile({ user, user_slates }) {
    
    const navigate = useNavigate()

    function handleDelete(id) {
        fetch(`/slates/${id}`, {
            method: "DELETE"
        })
        .then(resp => resp.json())
        .then(resp => console.log(resp))
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

    console.log(user_slates)

    if (!user) {
        navigate("/login")
    } else {    
        return(
            <div className="max-w-auto flex place-content-center">
                <div className="w-screen mx-40 flex p-4">
                    <div className="w-1/4">
                        <UserDetails user={user} />
                    </div>
                    <div className="w-2/3">
                        {user_slates.length >= 1 ? renderUserSlates : <h1 className="w-2/3">No Slates Found</h1>}
                    </div>
                </div>

            </div>
        )
    }
}

export default UserProfile;