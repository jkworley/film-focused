// IMPORTS
import React, { createContext, useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";


// COMPONENTS
import Header from "./Header";
import Footer from "./Footer";
import Login from "./Login";
import CreateAccount from "./CreateAccount";
import Slates from "./Slates";
import SlateDetails from "./SlateDetails";
import CreateSlate from "./CreateSlate";
import UserProfile from "./UserProfile";
import EditSlate from "./EditSlate";

// CONTEXT
export const Context = createContext()
 
function App() {
    // SET API KEY
    const api_key = process.env.REACT_APP_TMDB_API_KEY

    // NAVIGATION
    const navigate = useNavigate()

    // USER STATE FOR LOGIN & CREATE ACCOUNT
    const [ user, setUser ] = useState({})
    const [ loginUsername, setLoginUsername ] = useState("")
    const [ loginPassword, setLoginPassword ] = useState("")
    const [ newAccountEmail, setNewAccountEmail ] = useState("")
    const [ newAccountUsername, setNewAccountUsername ] = useState("")
    const [ newAccountPassword, setNewAccountPassword ] = useState("")

    // STATE FOR SLATES
    const [ slates, setSlates ] = useState([])
    const [ userSlates, setUserSlates ] = useState([])

    // STATE FOR COMMENTS
    const [ comments, setComments ] = useState([])

    // CHECK SESSION
    useEffect(() => {
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
                resp.json()
                .then((user) => {
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

        navigate("/")
    } 

    // GET SLATES
    useEffect(() => {
        fetch("/slates")
        .then(resp => resp.json())
        .then(slate => {
            setSlates(slate)
        })
    }, [])

    // GET COMMENTS
    useEffect(() => {
        fetch("/comments")
        .then(resp => resp.json())
        .then(comment => {
            setComments(comment)
        })
    }, [])

    return (
        <div className="min-h-screen relative flex flex-col">
            <div className="pb-20">
                <Header handleLogout={handleLogout} user={user} />
                <Routes>
                    <Route path = "/" element={<CreateAccount handleCreateAccount={handleCreateAccount} newAccountEmail={newAccountEmail} newAccountUsername={newAccountUsername} newAccountPassword={newAccountPassword} setNewAccountEmail={setNewAccountEmail} setNewAccountUsername={setNewAccountUsername} setNewAccountPassword={setNewAccountPassword} />} />
                    <Route path = "/login" element={<Login user={user} handleLogin={handleLogin} setLoginUsername={setLoginUsername} setLoginPassword={setLoginPassword} loginUsername={loginUsername} loginPassword={loginPassword} />} />
                    <Route path = "/slates" element={<Slates slates={slates} />} />
                    <Route path = "/create_slate" element={<CreateSlate api_key={api_key} user={user}/>} />
                    <Route path = "/profile" element={<UserProfile user={user} setUser={setUser} userSlates={userSlates} setUserSlates={setUserSlates} setSlates={setSlates}/>} />
                    <Route path = "/slates/:slateId" element={<SlateDetails user={user} comments={comments}/>} />
                    {/* <Route path = "/slates/:slateId/edit" element={<EditSlate user={user} comments={comments}/>} /> */}
                </Routes>
            </div>
            <div className="bg-sky-800 h-20 absolute w-full bottom-0">
                <Context.Provider value={"This product uses the TMDB API but is not endorsed or certified by TMDB."}>
                    <Footer />
                </Context.Provider>
            </div>
        </div>
    )
}

export default App;
