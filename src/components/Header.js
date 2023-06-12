
import icon from "../assets/icon.png";

const Header = () => {
    return (
        <header>
            <section className="mx-auto max-w-screen-xl flex justify-between items-center">
                <div className="flex items-center m-4">
                    <img src={icon} className="scale-75"/>
                    <h1 style={{ fontFamily: 'Viga-Regular' }} className="uppercase text-5xl text-sky-700 pt-2">Film Focusd</h1>
                </div>
                <div>
                    <nav style={{ fontFamily: 'Viga-Regular' }}>
                        <ul className="uppercase flex me-4">
                            <li className="p-4">Home</li>
                            <li className="p-4">Collection</li>
                            <li className="p-4">Watchlist</li>
                        </ul>
                    </nav>
                </div>
            </section>
        </header>
    )
}

export default Header;