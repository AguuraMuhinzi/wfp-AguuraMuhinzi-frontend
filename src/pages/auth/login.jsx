import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../Redux/Slices/user_slice';
import { useNavigate } from 'react-router-dom';

function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isLoading, error, isAuthenticated, role } = useSelector((state) => state.user);

    const [credentials, setCredentials] = useState({ email: '', password: '' });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCredentials((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(login(credentials));
    };

    // UseEffect to navigate based on role after successful login
    useEffect(() => {
        if (isAuthenticated) {
            if (role === 'academy') {
                navigate('/aca_dashboard');
            } else if (role === 'cooperative') {
                navigate('/dashboard');
            } else if (role === 'admin') {
                navigate('/admin-dashboard');
            }
        }
    }, [isAuthenticated, role, navigate]);

    return (
        <div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center">
            <div className="max-w-screen-xl m-0 sm:m-10 bg-white shadow sm:rounded-lg flex justify-center flex-1">
                <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
                    <div className="flex flex-col items-center mb-8">
                        <h1 className="text-5xl font-bold text-green-600 flex items-center space-x-1">
                            <img src={`${process.env.PUBLIC_URL}/imgs/plant.png`} alt="Leaf Icon" className="w-10 h-15 text-green-500" />
                            <span>AguuraMuhinzi</span>
                        </h1>
                        <p className="text-gray-500 text-center mt-5 text-lg sm:text-xl md:text-2xl font-medium leading-relaxed max-w-md">
                            Transforming agriculture through shared knowledge and innovation.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="mt-8 flex flex-col items-center w-full flex-1">
                        <div className="my-12 border-b text-center">
                            <div className="leading-none px-5 inline-block text-sm text-gray-700 tracking-wide font-medium bg-white transform translate-y-1/2">
                                Welcome back
                            </div>
                        </div>

                        <div className="mx-auto max-w-xs">
                            <input
                                name="email"
                                type="email"
                                placeholder="Email"
                                onChange={handleChange}
                                className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                            />
                            <input
                                name="password"
                                type="password"
                                placeholder="Password"
                                onChange={handleChange}
                                className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                            />
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="mt-5 tracking-wide font-semibold bg-green-500 text-white w-full py-4 rounded-lg hover:bg-green-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                            >
                                {isLoading ? 'Signing In...' : 'Sign In'}
                            </button>
                            
                            {error && (
                                <p className="mt-4 text-sm text-red-600 text-center">{error.message || 'Login failed. Try again.'}</p>
                            )}
                        </div>
                    </form>
                    <p className="mt-4 text-sm text-center text-gray-600">
                        Don't have an account? <a href="/signup" className="text-green-600 font-medium hover:underline">Register</a>
                    </p>
                </div>

                <div className="flex-1 bg-cover bg-center bg-no-repeat hidden lg:flex" style={{ backgroundImage: `url('/imgs/adult.jpg')` }}></div>
            </div>
        </div>
    );
}

export default Login;

