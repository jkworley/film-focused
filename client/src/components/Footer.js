import { useContext } from "react";
import { Context } from "./App";

function Footer() {

    // USE CONTEXT
    const credit = useContext(Context)

    return (
        <footer className="">
            <div className="mx-auto max-w-screen-lg flex justify-center">
                <nav className="m-8 font-semibold text-white text-sm">
                    <ul className="flex">
                        {/* <li>About</li> */}
                    </ul>
                </nav>
                <div className="m-8">
                    <p className="me-10 text-sky-500 text-xs">{credit}</p>
                </div>
            </div>
        </footer>
    )
}

export default Footer;