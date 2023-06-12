
const Footer = () => {
    return (
        <footer className="bg-sky-800">
            <div className="mx-auto max-w-screen-xl flex justify-between">
                <nav className="m-8 font-semibold">
                    <ul className="flex">
                        <li className="me-8">Home</li>
                        <li className="me-8">About</li>
                        <li className="me-8">Collection</li>
                        <li className="me-8">Watchlist</li>
                    </ul>
                </nav>
                <div className="m-8">
                    <p className="text-sky-500">Copyright Information</p>
                </div>
            </div>
        </footer>
    )
}

export default Footer;