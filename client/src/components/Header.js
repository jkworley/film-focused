import { NavLink } from "react-router-dom";

// IMPORTED LOGO IMAGE
import icon from "../assets/icon.png";

function Header({ user, handleLogout }) {

    return (
        <header style={{ fontFamily: 'Viga-Regular' }} className="pt-4 px-8 body-font">
            <div className="container mx-auto max-w-screen-lg flex flex-wrap p-2 flex-col md:flex-row items-center">
                <NavLink to="/">
                    <div className="flex items-center mb-4 md:mb-0">
                        <img src={icon} className="scale-75 pb-2"/>
                        <span className="text-3xl uppercase text-sky-700">Film Focused</span>
                    </div>
                </NavLink>
                <ul className="uppercase md:ml-auto flex flex-wrap items-center text-base justify-center">
                    <div className="hover:text-sky-300 mr-4">{user ? <NavLink to="/create_slate">Create Slate</NavLink> : <></>}</div>
                    <div className="hover:text-sky-300 mr-4"><NavLink to="/slates">Slates</NavLink></div>
                    <div className="hover:text-sky-300 mr-4">{!user ? <NavLink to="/">Create Account</NavLink> : <NavLink to="/profile">My Account</NavLink>}</div>
                    <div>{!user ? <button className="uppercase bg-sky-700 border-0 py-1 px-3 focus:outline-none hover:bg-sky-800 rounded text-base"><NavLink to="/login">Sign In</NavLink></button> : <button onClick={handleLogout} className="uppercase bg-sky-700 border-0 py-1 px-3 focus:outline-none hover:bg-sky-800 rounded text-base">Sign Out</button>}</div>
                </ul>
            </div>
        </header>
    )
}

export default Header;