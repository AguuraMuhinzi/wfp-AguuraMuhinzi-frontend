import React from 'react';


function Login() {
    return (
        <div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center">
            <div className="max-w-screen-xl m-0 sm:m-10 bg-white shadow sm:rounded-lg flex justify-center flex-1">
                <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
                    {/* Logo Section */}
                    <div className="flex flex-col items-center mb-8">
                        <h1 className="text-5xl font-bold text-green-600 flex items-center space-x-1">
                        <img src={`${process.env.PUBLIC_URL}/imgs/plant.png`} alt="Leaf Icon" className="w-10 h-15 text-green-500" />

                          
                            <span>AguuraMuhinzi</span>
                        </h1>
                        <p className="text-gray-500 text-center mt-5 text-lg sm:text-xl md:text-2xl font-medium leading-relaxed max-w-md">
    Transforming agriculture through shared knowledge and innovation.
</p>
                    </div>

                   
                    <div className="mt-8 flex flex-col items-center">
                        <div className="w-full flex-1 mt-9">
                            <div className="my-12 border-b text-center">
                                <div className="leading-none px-5 inline-block text-sm text-gray-700 tracking-wide font-medium bg-white transform translate-y-1/2">
                                    Welcome back
                                </div>
                            </div>

                            <div className="mx-auto max-w-xs">
                                {/* Email Input */}
                                <input
                                    className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                                     name="email"
                                    type="email"
                                    placeholder="Email"
                                />
                                {/* Password Input */}
                                <input
                                    className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                                    name="password"
                                    type="password"
                                    placeholder="Password"
                                />
                                {/* Sign In Button */}
                                <button
                                    className="mt-5 tracking-wide font-semibold bg-green-500 text-white w-full py-4 rounded-lg hover:bg-green-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                                >
                                    <svg className="w-6 h-6 -ml-2" fill="none" stroke="currentColor" strokeWidth="2"
                                        strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                                        <circle cx="8.5" cy="7" r="4" />
                                        <path d="M20 8v6M23 11h-6" />
                                    </svg>
                                    <span className="ml-2">Sign In</span>
                                </button>
                                
                                {/* No account? Create one */}
                                <p className="mt-4 text-sm text-center text-gray-600">
                                 Don't have an account ? <a href="/Signup" className="text-green-600 font-medium hover:underline">Register</a>
                                </p>

                          
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Side Background Image */}
                <div className="flex-1 bg-cover bg-center bg-no-repeat hidden lg:flex" style={{ backgroundImage: `url('/imgs/adult.jpg')` }}>
                </div>
            </div>
        </div>
    );
}

export default Login;
