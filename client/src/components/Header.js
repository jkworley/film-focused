// Images
import icon from "../assets/icon.png";

function Header({ user, handleLogout }) {
    return (
        <header style={{ fontFamily: 'Viga-Regular' }} className="pt-4 px-8 body-font">
            <div className="container mx-auto max-w-screen-lg flex flex-wrap p-2 flex-col md:flex-row items-center">
                <div className="flex items-center mb-4 md:mb-0">
                    <img src={icon} className="scale-75 pb-2"/>
                    <span className="text-3xl uppercase text-sky-700">Film Focused</span>
                </div>
                <nav className="text-white uppercase md:ml-auto flex flex-wrap items-center text-base justify-center">
                    <a className="mr-5 hover:text-sky-300">Sign In</a>
                    <a className="mr-5 hover:text-sky-300">Create Account</a>
                    <a className="mr-5 hover:text-sky-300">Slates</a>
                    <a className="mr-5 hover:text-sky-300">My Profile</a>
                    <button onClick={!user ? handleLogout : handleLogout} className="uppercase bg-sky-700 border-0 py-1 px-3 focus:outline-none hover:bg-sky-800 rounded text-base">{!user ? "Sign In" : "Sign Out"}</button>
                </nav>
            </div>
        </header>
    )
}

export default Header;