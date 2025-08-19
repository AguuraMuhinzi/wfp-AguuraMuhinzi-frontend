// import React, { useRef, useState, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { verifyOtp } from '../../Redux/Slices/user_slice';
// import { useNavigate } from 'react-router-dom';

// function OtpPage() {
//     const dispatch = useDispatch();
//     const { isLoading, successMessage, error, email } = useSelector((state) => state.user);
//     const inputRefs = useRef([]);
//     const otpLength = 6;
//     const [otp, setOtp] = useState(new Array(otpLength).fill(""));
//     const [customError, setCustomError] = useState('');
//     const navigate = useNavigate();


//     // Handle OTP input change
//     const handleChange = (e, index) => {
//         const { value } = e.target;
//         if (/^\d$/.test(value)) { 
//             const newOtp = [...otp];
//             newOtp[index] = value;
//             setOtp(newOtp);

//             // Move focus to the next input
//             if (index < otpLength - 1) {
//                 inputRefs.current[index + 1].focus();
//             }
//         }
//     };

//     // Handle backspace to move to the previous input
//     const handleBackspace = (e, index) => {
//         if (e.key === 'Backspace' && !e.target.value && index > 0) {
//             inputRefs.current[index - 1].focus();
//         }
//     };

//     // Collect OTP and dispatch verify action
//     const handleVerify = () => {
//         const otpCode = otp.join("");
//         if (otpCode.length === otpLength) {
//             dispatch(verifyOtp({ email, code: otpCode }))
//                 .unwrap()
//                 .catch(() => {
//                     setCustomError("Invalid verification code. Please try again.");
//                     clearOtpAfterTimeout();
//                 });
//         } else {
//             setCustomError("Please enter the complete 6-digit code.");
//             clearOtpAfterTimeout();
//         }
//     };

   
//     const clearOtpAfterTimeout = () => {
//         setTimeout(() => {
//             setOtp(new Array(otpLength).fill(""));
//             setCustomError('');
//         }, 1500);  
//     };

//     // Clear the success message after a short time
//     useEffect(() => {
//         if (successMessage) {
//             const timer = setTimeout(() => {
//                 setOtp(new Array(otpLength).fill(""));
//                 setCustomError('');
//                 navigate("/login"); 
//             }, 2500); 

//             return () => clearTimeout(timer);
//         }
//     }, [successMessage]);

//     return (
//         <div className="min-h-screen bg-gray-100 text-gray-900 flex flex-col justify-center items-center">
//             <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
//                 <h1 className="text-3xl font-semibold mb-3 text-green-600 text-center">Verify Your Email</h1>
//                 <p className="text-sm text-gray-600 mb-8 text-center">
//                     We’ve sent a 6-digit code to your email. Please enter it below to verify your email address.
//                 </p>
                
//                 <div className="flex justify-center space-x-3 mb-6">
//                     {otp.map((digit, index) => (
//                         <input
//                             key={index}
//                             ref={(el) => (inputRefs.current[index] = el)}
//                             type="text"
//                             maxLength="1"
//                             value={otp[index]}
//                             className="w-14 h-14 text-center border border-gray-300 rounded-lg text-2xl focus:border-green-500 focus:outline-none"
//                             onChange={(e) => handleChange(e, index)}
//                             onKeyDown={(e) => handleBackspace(e, index)}
//                         />
//                     ))}
//                 </div>

//                 <button
//                     onClick={handleVerify}
//                     disabled={isLoading}
//                     className="w-full py-3 bg-green-500 text-white rounded-lg font-medium hover:bg-green-700 transition-all duration-300"
//                 >
//                     {isLoading ? 'Verifying...' : 'Verify OTP'}
//                 </button>

//                 {/* Display success or error messages */}
//                 {successMessage && (
//                     <p className="text-green-600 mt-4 text-center bg-green-100 p-3 rounded-lg">
//                         {successMessage}
//                     </p>
//                 )}
//                 {customError && (
//                     <p className="text-red-600 mt-4 text-center bg-red-100 p-3 rounded-lg">
//                         {customError}
//                     </p>
//                 )}

//                 <p className="mt-6 text-sm text-gray-500 text-center">
//                     Didn’t receive the code? <a href="#" className="text-green-600 font-medium hover:underline">Resend</a>
//                 </p>
//             </div>
//         </div>
//     );
// }

// export default OtpPage;


import React, { useRef, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { verifyOtp, sendOtp } from '../../Redux/Slices/user_slice';
import { useNavigate } from 'react-router-dom';

function OtpPage() {
    const dispatch = useDispatch();
    const { isLoading, successMessage, error, email } = useSelector((state) => state.user);
    const inputRefs = useRef([]);
    const otpLength = 6;
    const [otp, setOtp] = useState(new Array(otpLength).fill(""));
    const [customError, setCustomError] = useState('');
    const navigate = useNavigate();
    
    // For resend functionality
    const [resendDisabled, setResendDisabled] = useState(true);
    const [countdown, setCountdown] = useState(30);
    const [resendMessage, setResendMessage] = useState('');

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

    // Handle resend OTP
    const handleResendOtp = () => {
        if (!resendDisabled && email) {
            dispatch(sendOtp({ email }))
                .unwrap()
                .then(() => {
                    setResendMessage("A new verification code has been sent to your email.");
                    setTimeout(() => setResendMessage(''), 5000);
                })
                .catch((err) => {
                    setCustomError("Failed to resend verification code. Please try again.");
                    setTimeout(() => setCustomError(''), 5000);
                });
                
            // Reset countdown and disable resend button
            setResendDisabled(true);
            setCountdown(30);
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
    }, [successMessage, navigate]);

    // Countdown timer for resend button
    useEffect(() => {
        // Start countdown when component mounts
        setResendDisabled(true);
        
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
            <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
                <h1 className="text-3xl font-semibold mb-3 text-green-600 text-center">Verify Your Email</h1>
                <p className="text-sm text-gray-600 mb-8 text-center">
                    We've sent a 6-digit code to your email. Please enter it below to verify your email address.
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
                    className="w-full py-3 bg-green-500 text-white rounded-lg font-medium hover:bg-green-700 transition-all duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed"
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
                {resendMessage && (
                    <p className="text-green-600 mt-4 text-center bg-green-100 p-3 rounded-lg">
                        {resendMessage}
                    </p>
                )}

                <div className="mt-6 text-sm text-gray-500 text-center">
                    Didn't receive the code? 
                    <button 
                        onClick={handleResendOtp}
                        disabled={resendDisabled}
                        className={`ml-1 ${resendDisabled ? 'text-gray-400 cursor-not-allowed' : 'text-green-600 font-medium hover:underline'}`}
                    >
                        {resendDisabled ? `Resend in ${countdown}s` : 'Resend'}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default OtpPage;
