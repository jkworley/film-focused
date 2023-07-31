import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import Login from "./Login";
import CreateAccount from "./CreateAccount";
import Slates from "./Slates";
import TMDBSearch from "./TMDBSearch";
 

function App() {
  // USER STATE FOR LOGIN & CREATE ACCOUNT
  const [ user, setUser ] = useState(null)
  const [ formUsername, setFormUsername ] = useState("")
  const [ formPassword, setFormPassword ] = useState("")

  // STATE FOR SLATES
  const [ slates, setSlates ] = useState([])

  // CHECK SESSION
  // useEffect(() => {
  //   fetch("/check_session").then((response) => {
  //     if (response.ok) {
  //       response.json().then((user) => setUser(user))
  //     }
  //   })
  //  }, [])

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
          resp.json().then((user) => setUser(user))
        }
      });

    setFormUsername("")
    setFormPassword("")
  }

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
      <TMDBSearch />
      {/* <Login handleLogin={handleLogin} setFormUsername={setFormUsername} setFormPassword={setFormPassword} formUsername={formUsername} formPassword={formPassword} /> */}
      {/* <CreateAccount /> */}
      {/* <Slates slates={slates}/> */}
      {/* <Footer /> */}
    </div>

  )
}

export default App;
