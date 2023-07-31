
function Footer() {
    return (
        <footer className="bg-sky-800">
            <div className="mx-auto max-w-screen-lg flex justify-between">
                <nav className="m-8 font-semibold text-white text-sm">
                    <ul className="flex ml-10">
                        <li className="me-8">About</li>
                    </ul>
                </nav>
                <div className="m-8">
                    <p className="me-10 text-sky-500 text-xs">Copyright Information</p>
                </div>
            </div>
        </footer>
    )
}

export default Footer;