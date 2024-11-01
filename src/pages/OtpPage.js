import React, { useRef } from 'react';


function OtpPage() {
 const inputRefs = useRef([]);
     const otpLength = 6;

    // // Handle OTP input change and auto-focus on the next input
    // const handleChange = (e, index) => {
    //     const { value } = e.target;
    //     if (/^\d$/.test(value)) { // Only allow single-digit numbers
    //         if (index < otpLength - 1) {
    //             inputRefs.current[index + 1].focus();
    //         }
    //     }
    // };

    // // Handle backspace to move to the previous input
    // const handleBackspace = (e, index) => {
    //     if (e.key === 'Backspace' && !e.target.value && index > 0) {
    //         inputRefs.current[index - 1].focus();
    //     }
    // };

    return (
        <div className="min-h-screen bg-gray-100 text-gray-900 flex flex-col justify-center items-center">
            <h1 className="text-3xl font-bold mb-6 text-green-600">Enter OTP</h1>
            <p className="text-gray-600 mb-8 text-center">
                Please enter the 6-digit OTP sent to your phone
            </p>
            
            <div className="flex space-x-2 mb-8">
                {[...Array(otpLength)].map((_, index) => (
                    <input
                        key={index}
                        ref={(el) => (inputRefs.current[index] = el)}
                        type="text"
                        maxLength="1"
                        className="w-12 h-12 text-center border rounded-lg border-gray-300 focus:border-green-500 focus:outline-none text-xl"
                        // onChange={(e) => handleChange(e, index)}
                        // onKeyDown={(e) => handleBackspace(e, index)}
                    />
                ))}
            </div>

            <button className="mt-4 px-8 py-3 bg-green-500 text-white rounded-lg hover:bg-green-700 transition-all duration-300">
                Verify OTP
            </button>
        </div>
    );
}

export default OtpPage;
