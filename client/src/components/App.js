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
  // USER STATE FOR LOGIN & CREATE ACCOUNT
  const [ user, setUser ] = useState(null)
  const [ formUsername, setFormUsername ] = useState("")
  const [ formPassword, setFormPassword ] = useState("")

  const navigate = useNavigate()

  // STATE FOR SLATES
  const [ slates, setSlates ] = useState([])

  // CHECK SESSION
  useEffect(() => {
    fetch("/check_session").then((response) => {
      if (response.ok) {
        response.json().then((user) => setUser(user))
      }
    })
   }, [])

  // HANDLE LOGIN
  function handleLogin(e) {
    e.preventDefault()

    let username = formUsername
    let password = formPassword
    
    fetch("/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify( { username, password } ),
      }).then((resp) => {
        if (resp.ok) {
          resp.json().then((user) => {
            setUser(user)
            console.log(user)
          })
        }
      });

    setFormUsername("")
    setFormPassword("")
    navigate("/slates")
  }

  const api_key = process.env.REACT_APP_TMDB_API_KEY

  console.log(api_key)

  // HANDLE LOGOUT
  function handleLogout() {
      fetch("/logout", {
          method: "DELETE"
      }).then(setUser(null))
  }

  // GET SLATES
  useEffect(() => {
    fetch("/slates")
    .then(resp => resp.json())
    .then(slate => setSlates(slate))
  }, [])

  return (
    <div className="">
      <Header handleLogout={handleLogout} user={user} />
      <Routes >
        <Route path = "/" element={<CreateAccount />} />
        <Route path = "/login" element={<Login user={user} handleLogin={handleLogin} setFormUsername={setFormUsername} setFormPassword={setFormPassword} formUsername={formUsername} formPassword={formPassword} />} />
        <Route path = "/slates" element={<Slates slates={slates} />} />
        <Route path = "/create_slate" element={<CreateSlate api_key={api_key} />} />
        <Route path = "user/:userId" element={<UserProfile />} />
      </Routes>
      {/* <Footer /> */}
    </div>

  )
}

export default App;
