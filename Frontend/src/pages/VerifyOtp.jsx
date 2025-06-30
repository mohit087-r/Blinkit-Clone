import React, { useState, useEffect, useRef } from "react"
import toast from "react-hot-toast"
import { data, useLocation, useNavigate } from "react-router-dom"
import SubmitLoader from '../componets/SubmitLoader';
import AxiosToastError from "../utils/AxiosToastError";
import SummaryApi from "../common/SummaryApi";
import Axios from "../utils/Axios";

const OtpPage = () => {
    const [otp, setOtp] = useState(Array(6).fill(""))
    const [loader, setLoader] = useState(false);
    const inputRefs = useRef([])
    const [timer, setTimer] = useState(60)
    const [canResend, setCanResend] = useState(false)
    const location = useLocation()
    const email = location.state?.email
    const navigate = useNavigate()

    useEffect(() => {
        let interval = null
        if (timer > 0) {
            setCanResend(false)
            interval = setInterval(() => {
                setTimer((prev) => prev - 1)
            }, 1000)
        } else {
            setCanResend(true);
            clearInterval(interval)
        }

        return () => clearInterval(interval)
    }, [timer])

    const handleChange = (element, index) => {
        const value = element.value.replace(/[^0-9]/g, "")
        if (value) {
            const newOtp = [...otp];
            newOtp[index] = value;
            setOtp(newOtp);

            // Move to next input
            if (index < 5) {
                inputRefs.current[index + 1].focus()
            }
        }
    };

    const handleKeyDown = (e, index) => {
        if (e.key === "Backspace") {
            const newOtp = [...otp]
            newOtp[index] = ""
            setOtp(newOtp)
            if (index > 0) {
                inputRefs.current[index - 1].focus()
            }
        }
    };

    const handlePaste = (e) => {
        const pastedData = e.clipboardData.getData("Text").slice(0, 6)
        if (/^\d+$/.test(pastedData)) {
            const newOtp = pastedData.split("")
            setOtp([...newOtp, ...Array(6 - newOtp.length).fill("")].slice(0, 6))
            if (inputRefs.current[pastedData.length - 1]) {
                inputRefs.current[pastedData.length - 1].focus()
            }
        }
        e.preventDefault()
    };

    const handleResendOtp = async () => {
        try {
            const response = await Axios({
                method: SummaryApi.forgot_password.method,
                url: SummaryApi.forgot_password.url,
                data: { email },
            });

            if (response.data.error) {
                toast.error(response.data.message);
                return;
            }

            if (response.data.success) {
                toast.success(response.data.message);
                setTimer(60)
                setCanResend(false)
            }
        } catch (error) {
            AxiosToastError(error);
        }   
    };

    const handleSubmit = async () => {
        try {
            const fullOtp = otp.join("")
            if (fullOtp.length !== 6) {
                toast.error("Please enter the full 6-digit OTP")
                return
            }

            setLoader(true);
            const response = await Axios({
                method: SummaryApi.verify_otp.method,
                url: SummaryApi.verify_otp.url,
                data: { 
                    email : email, 
                    otp : fullOtp 
                }
            });

            if (response.data.error) {
                toast.error(response.data.message);
                setLoader(false);
                return;
            }

            if (response.data.success) {
                toast.success(response.data.message);
                setLoader(false);
                navigate('/reset-password',{state : {
                    data : response.data,
                    email : email
                }})
            }
        } catch (error) {
            AxiosToastError(error)
            setLoader(false)
        }
    };

    return (
        <div className="mt-30 flex items-center justify-center sm:px-0 px-2">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md text-center">
                <h2 className="text-2xl font-bold mb-4 text-slate-800">Enter OTP</h2>
                <p className="text-slate-600 mb-6">
                    We’ve sent a 6-digit OTP to your email
                </p>

                {/* OTP Boxes */}
                <div className="flex justify-center gap-2 mb-4">
                    {otp.map((digit, idx) => (
                        <input
                            key={idx}
                            type="text"
                            inputMode="numeric"
                            maxLength="1"
                            value={digit}
                            ref={(el) => (inputRefs.current[idx] = el)}
                            onChange={(e) => handleChange(e.target, idx)}
                            onKeyDown={(e) => handleKeyDown(e, idx)}
                            onPaste={handlePaste}
                            className="w-12 h-12 text-center text-xl border border-gray-300 rounded focus:outline-none focus:border-green-600"
                        />
                    ))}
                </div>

                {/* Submit Button */}
                
                    <button
                        onClick={handleSubmit}
                        className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition-all w-full cursor-pointer"
                    >
                        {loader ? (
                    <SubmitLoader/>
                ) : (
                    <>Verify OTP</>
                    )}
                    </button>
                
                

                {/* Resend Section */}
                <p className="text-slate-700 text-sm mt-4">
                    {canResend ? (
                        <>
                            Didn’t receive the code?{" "}
                            <button
                                onClick={handleResendOtp}
                                className="text-green-700 font-medium underline cursor-pointer"
                            >
                                Resend OTP
                            </button>
                        </>
                    ) : (
                        <>
                            Resend OTP in <span className="font-semibold">{timer}s</span>
                        </>
                    )}
                </p>
            </div>
        </div>
    );
};

export default OtpPage;
