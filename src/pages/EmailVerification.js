import React, { useRef } from 'react';

function OtpPage() {
    const inputRefs = useRef([]);
    const otpLength = 6;

    // Handle OTP input change and auto-focus on the next input
    const handleChange = (e, index) => {
        const { value } = e.target;
        if (/^\d$/.test(value)) { // Only allow single-digit numbers
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

    return (
        <div className="min-h-screen bg-gray-100 text-gray-900 flex flex-col justify-center items-center">
            <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
                <h1 className="text-3xl font-semibold mb-3 text-green-600 text-center">Verify Your Email</h1>
                <p className="text-sm text-gray-600 mb-8 text-center">
                    We’ve sent a 6-digit code to your email. Please enter it below to verify your email address.
                </p>
                
                <div className="flex justify-center space-x-3 mb-6">
                    {[...Array(otpLength)].map((_, index) => (
                        <input
                            key={index}
                            ref={(el) => (inputRefs.current[index] = el)}
                            type="text"
                            maxLength="1"
                            className="w-14 h-14 text-center border border-gray-300 rounded-lg text-2xl focus:border-green-500 focus:outline-none"
                            onChange={(e) => handleChange(e, index)}
                            onKeyDown={(e) => handleBackspace(e, index)}
                        />
                    ))}
                </div>

                <button className="w-full py-3 bg-green-500 text-white rounded-lg font-medium hover:bg-green-700 transition-all duration-300">
                    Verify OTP
                </button>

                <p className="mt-6 text-sm text-gray-500 text-center">
                    Didn’t receive the code? <a href="#" className="text-green-600 font-medium hover:underline">Resend</a>
                </p>
            </div>
        </div>
    );
}

export default OtpPage;
