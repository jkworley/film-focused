
function CreateAccount({ }) {
    return (
        <div className="mx-auto w-3/4 bg-[url(https://film-grab.com/wp-content/uploads/2017/01/thematrixreloaded044.jpg)] bg-top bg-contain bg-no-repeat ">
            <section className="body-font">
                <div className="">
                    <div className="h-fill create-account-bg">
                        <div className="container lg:px-20 md:px-14 py-24 mx-auto flex flex-wrap items-center">
                            <div className="lg:w-3/5 md:w-1/2 md:pr-16 lg:pr-0 pr-0">
                                <h1 className="drop-shadow-2xl shadow-black font-bold text-3xl text-white">Create curated lists of your favorite movies</h1>
                                <p className="drop-shadow-2xl shadow-black mt-4">Film Focusd lets you create lists of movies that you love, movies that you want to watch, or movies that follow a theme.</p>
                            </div>
                            <form className="lg:w-2/6 md:w-1/2 bg-gray-200 rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0">
                                <div className="relative mb-4">
                                    <label htmlFor="username" className="leading-7 text-sm text-gray-600">Username</label>
                                    <input type="text" id="username" name="username" className="w-full bg-white rounded border border-gray-300 focus:border-sky-700 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                                </div>
                                <div className="relative mb-4">
                                    <label htmlFor="password" className="leading-7 text-sm text-gray-600">Password</label>
                                    <input type="password" id="password" name="password" className="w-full bg-white rounded border border-gray-300 focus:border-sky-700 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                                </div>
                                <button style={{ fontFamily: 'Viga-Regular' }} className="text-white bg-sky-700 uppercase border-0 py-2 px-8 focus:outline-none hover:bg-sky-800 rounded text-lg">Create Account</button>
                                <p className="text-xs text-gray-500 mt-3">Already have an account? <a>Sign in here!</a></p>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default CreateAccount;