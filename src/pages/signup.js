import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signupUser } from '../Redux/Slices/user_slice';
import axios from 'axios';
import debounce from 'lodash.debounce';

function Signup() {
    const dispatch = useDispatch();
    const { isLoading, error, isRegistered } = useSelector((state) => state.user);

    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        role: '',
        contact_phone: '',
    });
    const [availabilityErrors, setAvailabilityErrors] = useState({});
    const [showPasswordHint, setShowPasswordHint] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
        if (isRegistered) {
            setSuccessMessage("Account created successfully!");  
            setFormData({
                username: '',
                email: '',
                password: '',
                role: '',
                contact_phone: '',
            });  // Clear form fields

            // Clear success message after 3 seconds
            const timer = setTimeout(() => setSuccessMessage(''), 3000);
            return () => clearTimeout(timer);
        }
    }, [isRegistered]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
        if (name === 'email' || name === 'username') {
            debouncedCheckAvailability(name, value);
        }
    };

    const handlePasswordChange = (e) => {
        const newPassword = e.target.value;
        setFormData((prevData) => ({ ...prevData, password: newPassword }));
        setShowPasswordHint(newPassword.length < 6 || !/(?=.*[A-Za-z])(?=.*\d)/.test(newPassword));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(signupUser(formData));
    };

    const checkAvailability = async (name, value) => {
        try {
            const response = await axios.get(`http://localhost:8000/api/user-availability/`, {
                params: { [name]: value },
            });
            setAvailabilityErrors((prevErrors) => ({
                ...prevErrors,
                [name]: response.data[name] || null,
            }));
        } catch (error) {
            console.error("Error checking availability:", error);
        }
    };

    const debouncedCheckAvailability = debounce(checkAvailability, 500);

    const isSignUpDisabled =
        !!availabilityErrors.username ||
        !!availabilityErrors.email ||
        !formData.username ||
        !formData.email;

    return (
        <div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center">
            <div className="max-w-screen-xl m-0 sm:m-10 bg-white shadow sm:rounded-lg flex flex-1 relative">
                <div
                    className="hidden lg:flex flex-1 bg-cover bg-center bg-no-repeat h-full"
                    style={{ backgroundImage: `url('${process.env.PUBLIC_URL}/imgs/adult.jpg')` }}
                />

                <div className="w-full lg:w-1/2 xl:w-5/12 p-6 sm:p-12 flex flex-col justify-center">
                    <div className="flex flex-col items-center mb-8">
                        <h1 className="text-5xl font-bold text-green-600 flex items-center space-x-2">
                            <img
                                src={`${process.env.PUBLIC_URL}/imgs/plant.png`}
                                alt="Leaf Icon"
                                className="w-12 h-12 text-green-500"
                            />
                            <span>AguuraMuhinzi</span>
                        </h1>
                        <p className="text-gray-600 mt-2 text-center">
                            Join the platform connecting knowledge and agriculture
                        </p>
                    </div>

                    {/* Success Message */}
                    {successMessage && (
                        <div className="mb-6 p-4 text-green-700 bg-green-100 border border-green-400 rounded">
                            {successMessage}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="mt-8 flex flex-col items-center w-full flex-1">
                        <div className="my-12 border-b text-center">
                            <div className="leading-none px-5 inline-block text-sm text-gray-700 tracking-wide font-medium bg-white transform translate-y-1/2">
                                Create your account
                            </div>
                        </div>

                        <div className="mx-auto max-w-xs">
                            <input
                                name="username"
                                required
                                className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                                type="text"
                                placeholder="Username"
                                onChange={handleChange}
                                value={formData.username}
                            />
                            {availabilityErrors.username && (
                                <p className="text-red-500 text-xs mt-1">{availabilityErrors.username}</p>
                            )}

                            <input
                                name="email"
                                required
                                className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                                type="email"
                                placeholder="Email"
                                onChange={handleChange}
                                value={formData.email}
                            />
                            {availabilityErrors.email && (
                                <p className="text-red-500 text-xs mt-1">{availabilityErrors.email}</p>
                            )}

                            <div className="relative mt-5">
                                <input
                                    name="password"
                                    required
                                    className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                                    type="password"
                                    placeholder="Password"
                                    onChange={handlePasswordChange}
                                    value={formData.password}
                                />
                                {showPasswordHint && (
                                    <p className="text-red-500 text-xs mt-2">
                                        Password must be at least 6 characters and contain both letters and numbers.
                                    </p>
                                )}
                            </div>

                            <input
                                name="contact_phone"
                                required
                                className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                                type="text"  // Set to text to allow pattern validation
                                pattern="\d{10}" // Pattern ensures exactly 10 digits
                                maxLength="10"
                                placeholder="Contact Phone"
                                onChange={(e) => {
                                    const { value } = e.target;
                                    if (/^\d{0,10}$/.test(value)) {  // Only allow up to 10 digits
                                        handleChange(e);
                                    }
                                }}
                                value={formData.contact_phone}
                            />

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
                                            checked={formData.role === 'academy'}
                                            onChange={handleChange}
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
                                            checked={formData.role === 'cooperative'}
                                            onChange={handleChange}
                                        />
                                        <span className="ml-2 text-gray-700">Cooperative</span>
                                    </label>
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={isLoading || isSignUpDisabled}
                                className={`mt-8 tracking-wide font-semibold ${
                                    isSignUpDisabled ? 'bg-green-400' : 'bg-green-500'
                                } text-white w-full py-4 rounded-lg hover:bg-green-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none`}
                            >
                                {isLoading ? 'Signing Up...' : 'Sign Up'}
                            </button>

                            {error && (
                                <p className="mt-4 text-sm text-red-600 text-center">
                                    {error.email ? error.email[0] : error.username ? error.username[0] : 'Signup failed. Try again.'}
                                </p>
                            )}

                            <p className="mt-4 text-sm text-center text-gray-600">
                                Already have an account?{' '}
                                <a href="#" className="text-green-600 font-medium hover:underline">
                                    Log In
                                </a>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Signup;
