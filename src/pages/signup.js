import React, { useState } from 'react';

function Signup() {
    const [role, setRole] = useState('');
    const [password, setPassword] = useState('');
    const [showPasswordHint, setShowPasswordHint] = useState(false);

    const handlePasswordChange = (e) => {
        const newPassword = e.target.value;
        setPassword(newPassword);

        // Show tooltip if password is less than 6 characters or doesn’t meet alphanumeric requirement
        setShowPasswordHint(newPassword.length < 6 || !/(?=.*[A-Za-z])(?=.*\d)/.test(newPassword));
    };

    return (
        <div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center">
            <div className="max-w-screen-xl m-0 sm:m-10 bg-white shadow sm:rounded-lg flex flex-1">
                
                {/* Left Side Background Image */}
                <div className="hidden lg:flex flex-1 bg-cover bg-center bg-no-repeat h-full" style={{ backgroundImage: `url('${process.env.PUBLIC_URL}/imgs/adult.jpg')` }}>
                </div>
                
                {/* Signup Form Section */}
                <div className="w-full lg:w-1/2 xl:w-5/12 p-6 sm:p-12 flex flex-col justify-center">
                    {/* Logo Section */}
                    <div className="flex flex-col items-center mb-8">
                        <h1 className="text-5xl font-bold text-green-600 flex items-center space-x-2">
                            <img src={`${process.env.PUBLIC_URL}/imgs/plant.png`} alt="Leaf Icon" className="w-12 h-12 text-green-500" />
                            <span>AguuraMuhinzi</span>
                        </h1>
                        <p className="text-gray-600 mt-2 text-center">Join the platform connecting knowledge and agriculture</p>
                    </div>

                    {/* Form Section */}
                    <div className="mt-8 flex flex-col items-center">
                        <div className="w-full flex-1">
                            <div className="my-12 border-b text-center">
                                <div className="leading-none px-5 inline-block text-sm text-gray-700 tracking-wide font-medium bg-white transform translate-y-1/2">
                                    Create your account
                                </div>
                            </div>

                            <div className="mx-auto max-w-xs">
                                {/* Username Input */}
                                <input
                                    name="username"
                                    required
                                    className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                                    type="text"
                                    placeholder="Username"
                                />
                                
                                {/* Email Input */}
                                <input
                                    name="email"
                                    required
                                    className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                                    type="email"
                                    placeholder="Email"
                                />

                                {/* Password Input with Tooltip */}
                                <div className="relative mt-5">
                                    <input
                                        name="password"
                                        required
                                        className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                                        type="password"
                                        placeholder="Password"
                                        value={password}
                                        onChange={handlePasswordChange}
                                    />
                                    {/* Tooltip */}
                                    {showPasswordHint && (
                                        <p className="text-red-500 text-xs mt-2">
                                            Password must be at least 6 characters and contain both letters and numbers.
                                        </p>
                                    )}
                                </div>

                                {/* Phone Input */}
                                <input
                                    name="contact_phone"
                                    required
                                    className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                                    type="tel"
                                    placeholder="Contact Phone"
                                />

                                {/* Role Selection */}
                                <div className="mt-6">
                                    <p className="text-sm font-medium text-gray-700 mb-2">
                                        Are you registering on behalf of an academy or a cooperative?
                                    </p>
                                    <div className="flex items-center space-x-4">
                                        <label className="inline-flex items-center">
                                            <input
                                                type="radio"
                                                name="role"
                                                value="academy"
                                                required
                                                className="form-radio text-green-500"
                                                checked={role === 'academy'}
                                                onChange={() => setRole('academy')}
                                            />
                                            <span className="ml-2 text-gray-700">Academy</span>
                                        </label>
                                        <label className="inline-flex items-center">
                                            <input
                                                type="radio"
                                                name="role"
                                                value="cooperative"
                                                required
                                                className="form-radio text-green-500"
                                                checked={role === 'cooperative'}
                                                onChange={() => setRole('cooperative')}
                                            />
                                            <span className="ml-2 text-gray-700">Cooperative</span>
                                        </label>
                                    </div>
                                </div>

                                {/* Sign Up Button */}
                                <button
                                    className="mt-8 tracking-wide font-semibold bg-green-500 text-white w-full py-4 rounded-lg hover:bg-green-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                                >
                                    <span className="ml-2">Sign Up</span>
                                </button>

                                <p className="mt-4 text-sm text-center text-gray-600">
                                    Already have an account? <a href="#" className="text-green-600 font-medium hover:underline">Log In</a>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Signup;
