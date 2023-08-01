import { NavLink } from "react-router-dom";

function Login({ user, handleLogin, setFormUsername, setFormPassword, formUsername, formPassword }) {

    return (
        <div className="h-screen mx-auto max-w-screen-lg">
            <section className="text-white body-font">
                <div className="container px-5 py-24 mx-auto flex flex-wrap items-center">
                    <form onSubmit={handleLogin} className="lg:w-2/6 md:w-1/2 bg-gray-200 rounded-lg p-8 flex flex-col md:mx-auto w-full mt-10 md:mt-0">
                        {/* <h2 class="text-gray-700 text-xl font-semibold title-font mb-5">Log In</h2> */}
                        <div className="relative mb-4">
                            <label htmlFor="username" className="leading-7 text-sm text-gray-600">Username</label>
                            <input onChange={e => setFormUsername(e.target.value)} value={formUsername} type="text" id="username" name="username" className="w-full bg-white rounded border border-gray-300 focus:border-sky-700 focus:ring-2 focus:ring-sky-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                        </div>
                        <div className="relative mb-4">
                            <label htmlFor="password" className="leading-7 text-sm text-gray-600">Password</label>
                            <input onChange={e => setFormPassword(e.target.value)} value={formPassword} type="password" id="password" name="password" className="w-full bg-white rounded border border-gray-300 focus:border-sky-700 focus:ring-2 focus:ring-sky-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                        </div>
                        <button style={{ fontFamily: 'Viga-Regular' }} className="text-white bg-sky-700 uppercase border-0 py-2 px-8 focus:outline-none hover:bg-sky-800 rounded text-lg">Sign In</button>
                        <p className="text-xs text-gray-500 mt-3">Don't have an account? <a>Create an account here!</a></p>
                    </form>
                </div>
            </section>
        </div>
    )
}

export default Login;