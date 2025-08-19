    // import React, { useRef } from 'react';


    // function OtpPage() {
    // const inputRefs = useRef([]);
    //     const otpLength = 6;

    
    //     return (
    //         <div className="min-h-screen bg-gray-100 text-gray-900 flex flex-col justify-center items-center">
    //             <h1 className="text-3xl font-bold mb-6 text-green-600">Enter OTP</h1>
    //             <p className="text-gray-600 mb-8 text-center">
    //                 Please enter the 6-digit OTP sent to your phone
    //             </p>
                
    //             <div className="flex space-x-2 mb-8">
    //                 {[...Array(otpLength)].map((_, index) => (
    //                     <input
    //                         key={index}
    //                         ref={(el) => (inputRefs.current[index] = el)}
    //                         type="text"
    //                         maxLength="1"
    //                         className="w-12 h-12 text-center border rounded-lg border-gray-300 focus:border-green-500 focus:outline-none text-xl"
    //                         // onChange={(e) => handleChange(e, index)}
    //                         // onKeyDown={(e) => handleBackspace(e, index)}
    //                     />
    //                 ))}
    //             </div>

    //             <button className="mt-4 px-8 py-3 bg-green-500 text-white rounded-lg hover:bg-green-700 transition-all duration-300">
    //                 Verify OTP
    //             </button>
    //         </div>
    //     );
    // }

    // export default OtpPage;

    import React, { useRef, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { sendOtp, verifyOtp } from ''; // Adjust the path

function OtpPage() {
    const dispatch = useDispatch();
    const inputRefs = useRef([]);
    const otpLength = 6;
    const [otp, setOtp] = useState(Array(otpLength).fill(''));
    const [resendDisabled, setResendDisabled] = useState(true);
    const [countdown, setCountdown] = useState(30);
    
    // Get email from Redux state
    const { email, isLoading, error, successMessage } = useSelector(state => state.user);
    
    // Handle input change
    const handleChange = (e, index) => {
        const value = e.target.value;
        if (isNaN(value)) return; // Only allow numbers
        
        // Update OTP array
        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);
        
        // Auto-focus next input
        if (value && index < otpLength - 1) {
            inputRefs.current[index + 1].focus();
        }
    };
    
    // Handle backspace
    const handleBackspace = (e, index) => {
        if (e.key === 'Backspace') {
            if (!otp[index] && index > 0) {
                // If current input is empty and backspace is pressed, focus previous input
                inputRefs.current[index - 1].focus();
            }
        }
    };
    
    // Handle OTP verification
    const handleVerify = () => {
        const otpCode = otp.join('');
        if (otpCode.length === otpLength) {
            dispatch(verifyOtp({ email, code: otpCode }));
        }
    };
    
    // Handle resend OTP
    const handleResendOtp = () => {
        if (!resendDisabled && email) {
            dispatch(sendOtp({ email }));
            setResendDisabled(true);
            setCountdown(30);
        }
    };
    
    // Countdown timer for resend button
    useEffect(() => {
        let timer;
        if (resendDisabled && countdown > 0) {
            timer = setTimeout(() => {
                setCountdown(countdown - 1);
            }, 1000);
        } else if (countdown === 0) {
            setResendDisabled(false);
        }
        
        return () => clearTimeout(timer);
    }, [resendDisabled, countdown]);
    
    return (
        <div className="min-h-screen bg-gray-100 text-gray-900 flex flex-col justify-center items-center">
            <h1 className="text-3xl font-bold mb-6 text-green-600">Enter OTP</h1>
            <p className="text-gray-600 mb-8 text-center">
                Please enter the 6-digit OTP sent to your {email || "email"}
            </p>
            
            {error && (
                <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
                    {error.message || error}
                </div>
            )}
            
            {successMessage && (
                <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-lg">
                    {successMessage}
                </div>
            )}
            
            <div className="flex space-x-2 mb-8">
                {[...Array(otpLength)].map((_, index) => (
                    <input
                        key={index}
                        ref={(el) => (inputRefs.current[index] = el)}
                        type="text"
                        maxLength="1"
                        value={otp[index]}
                        className="w-12 h-12 text-center border rounded-lg border-gray-300 focus:border-green-500 focus:outline-none text-xl"
                        onChange={(e) => handleChange(e, index)}
                        onKeyDown={(e) => handleBackspace(e, index)}
                    />
                ))}
            </div>

            <button 
                className="mt-4 px-8 py-3 bg-green-500 text-white rounded-lg hover:bg-green-700 transition-all duration-300 disabled:bg-gray-400"
                onClick={handleVerify}
                disabled={isLoading || otp.join('').length !== otpLength}
            >
                {isLoading ? 'Verifying...' : 'Verify OTP'}
            </button>
            
            <div className="mt-6 text-center">
                <p className="text-gray-600">Didn't receive the OTP?</p>
                <button
                    className={`mt-2 text-green-600 hover:text-green-800 ${resendDisabled ? 'cursor-not-allowed opacity-50' : ''}`}
                    onClick={handleResendOtp}
                    disabled={resendDisabled}
                >
                    {resendDisabled 
                        ? `Resend OTP in ${countdown}s` 
                        : 'Resend OTP'}
                </button>
            </div>
        </div>
    );
}

export default OtpPage;
