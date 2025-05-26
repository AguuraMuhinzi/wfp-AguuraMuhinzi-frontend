import React, { useRef, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { verifyOtp } from '../../Redux/Slices/user_slice';
import { useNavigate } from 'react-router-dom';

function OtpPage() {
    const dispatch = useDispatch();
    const { isLoading, successMessage, error, email } = useSelector((state) => state.user);
    const inputRefs = useRef([]);
    const otpLength = 6;
    const [otp, setOtp] = useState(new Array(otpLength).fill(""));
    const [customError, setCustomError] = useState('');
    const navigate = useNavigate();


    // Handle OTP input change
    const handleChange = (e, index) => {
        const { value } = e.target;
        if (/^\d$/.test(value)) { 
            const newOtp = [...otp];
            newOtp[index] = value;
            setOtp(newOtp);

            // Move focus to the next input
            if (index < otpLength - 1) {
                inputRefs.current[index + 1].focus();
            }
        }
    };

    // Handle backspace to move to the previous input
    const handleBackspace = (e, index) => {
        if (e.key === 'Backspace' && !e.target.value && index > 0) {
            inputRefs.current[index - 1].focus();
        }
    };

    // Collect OTP and dispatch verify action
    const handleVerify = () => {
        const otpCode = otp.join("");
        if (otpCode.length === otpLength) {
            dispatch(verifyOtp({ email, code: otpCode }))
                .unwrap()
                .catch(() => {
                    setCustomError("Invalid verification code. Please try again.");
                    clearOtpAfterTimeout();
                });
        } else {
            setCustomError("Please enter the complete 6-digit code.");
            clearOtpAfterTimeout();
        }
    };

   
    const clearOtpAfterTimeout = () => {
        setTimeout(() => {
            setOtp(new Array(otpLength).fill(""));
            setCustomError('');
        }, 1500);  
    };

    // Clear the success message after a short time
    useEffect(() => {
        if (successMessage) {
            const timer = setTimeout(() => {
                setOtp(new Array(otpLength).fill(""));
                setCustomError('');
                navigate("/login"); 
            }, 2500); 

            return () => clearTimeout(timer);
        }
    }, [successMessage]);

    return (
        <div className="min-h-screen bg-gray-100 text-gray-900 flex flex-col justify-center items-center">
            <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
                <h1 className="text-3xl font-semibold mb-3 text-green-600 text-center">Verify Your Email</h1>
                <p className="text-sm text-gray-600 mb-8 text-center">
                    We’ve sent a 6-digit code to your email. Please enter it below to verify your email address.
                </p>
                
                <div className="flex justify-center space-x-3 mb-6">
                    {otp.map((digit, index) => (
                        <input
                            key={index}
                            ref={(el) => (inputRefs.current[index] = el)}
                            type="text"
                            maxLength="1"
                            value={otp[index]}
                            className="w-14 h-14 text-center border border-gray-300 rounded-lg text-2xl focus:border-green-500 focus:outline-none"
                            onChange={(e) => handleChange(e, index)}
                            onKeyDown={(e) => handleBackspace(e, index)}
                        />
                    ))}
                </div>

                <button
                    onClick={handleVerify}
                    disabled={isLoading}
                    className="w-full py-3 bg-green-500 text-white rounded-lg font-medium hover:bg-green-700 transition-all duration-300"
                >
                    {isLoading ? 'Verifying...' : 'Verify OTP'}
                </button>

                {/* Display success or error messages */}
                {successMessage && (
                    <p className="text-green-600 mt-4 text-center bg-green-100 p-3 rounded-lg">
                        {successMessage}
                    </p>
                )}
                {customError && (
                    <p className="text-red-600 mt-4 text-center bg-red-100 p-3 rounded-lg">
                        {customError}
                    </p>
                )}

                <p className="mt-6 text-sm text-gray-500 text-center">
                    Didn’t receive the code? <a href="#" className="text-green-600 font-medium hover:underline">Resend</a>
                </p>
            </div>
        </div>
    );
}

export default OtpPage;
