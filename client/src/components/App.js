import React, { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import Login from "./Login";
import CreateAccount from "./CreateAccount";
import Slates from "./Slates";
import TMDBSearch from "./TMDBSearch";
import CreateSlate from "./CreateSlate";
import UserProfile from "./UserProfile";
 

function App() {
    // SET API KEY
    const api_key = process.env.REACT_APP_TMDB_API_KEY

    // USER STATE FOR LOGIN & CREATE ACCOUNT
    const [ user, setUser ] = useState(null)
    const [ loginUsername, setLoginUsername ] = useState("")
    const [ loginPassword, setLoginPassword ] = useState("")
    const [ newAccountEmail, setNewAccountEmail ] = useState("")
    const [ newAccountUsername, setNewAccountUsername ] = useState("")
    const [ newAccountPassword, setNewAccountPassword ] = useState("")

    console.log(newAccountEmail)

    const navigate = useNavigate()

    // STATE FOR SLATES
    const [ slates, setSlates ] = useState([])
    const [ userSlates, setUserSlates ] = useState([])

    // CHECK SESSION
    useEffect(() => {
        fetch("/check_session").then((response) => {
            if (response.ok) {
                response.json().then((user) => setUser(user))
            }
        })
    }, [])

    // HANDLE CREATE ACCOUNT
    function handleCreateAccount(e) {
        e.preventDefault()

        let email = newAccountEmail
        let username = newAccountUsername
        let password = newAccountPassword

        fetch("/users", {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type":"application/json"
            },
            body: JSON.stringify( { username, password, email } ),
        })
        .then((resp) => {
            if (resp.ok) {
                resp.json().then((user) => {
                    setUser(user)
                    navigate("/profile")
                })
            }
        })

        setNewAccountEmail("")
        setNewAccountUsername("")
        setNewAccountPassword("")
    }

    // HANDLE LOGIN
    function handleLogin(e) {
        e.preventDefault()

        let username = loginUsername
        let password = loginPassword
        
        fetch("/login", {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify( { username, password } ),
        })
        .then((resp) => {
            if (resp.ok) {
                resp.json().then((user) => {
                    setUser(user)
                    setUserSlates(user.slates)
                    console.log(user.slates)
                    navigate("/profile")
                })
            }
        })

        setLoginUsername("")
        setLoginPassword("")
    }

    // HANDLE LOGOUT
    function handleLogout() {
        fetch("/logout", {
            method: "DELETE"
        })
        .then(setUser(null))
    } 

    // GET SLATES
    useEffect(() => {
        fetch("/slates")
        .then(resp => resp.json())
        .then(slate => {
            setSlates(slate)
        })
    }, [])

    return (
        <div className="">
        <Header handleLogout={handleLogout} user={user} />
        <Routes >
            <Route path = "/" element={<CreateAccount handleCreateAccount={handleCreateAccount} newAccountEmail={newAccountEmail} newAccountUsername={newAccountUsername} newAccountPassword={newAccountPassword} setNewAccountEmail={setNewAccountEmail} setNewAccountUsername={setNewAccountUsername} setNewAccountPassword={setNewAccountPassword} />} />
            <Route path = "/login" element={<Login user={user} handleLogin={handleLogin} setLoginUsername={setLoginUsername} setLoginPassword={setLoginPassword} loginUsername={loginUsername} loginPassword={loginPassword} />} />
            <Route path = "/slates" element={<Slates slates={slates} />} />
            <Route path = "/create_slate" element={<CreateSlate api_key={api_key} />} />
            <Route path = "/profile" element={<UserProfile user={user} user_slates={userSlates} />} />
        </Routes>
        {/* <Footer /> */}
        </div>
    )
}

export default App;
