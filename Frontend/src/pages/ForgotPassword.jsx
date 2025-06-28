import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Input from '../componets/Input'
import { validateEmail } from '../../utils/validateEmail'
import toast from 'react-hot-toast'
import Axios from '../../utils/Axios'
import AxiosToastError from '../../utils/AxiosToastError'
import SubmitLoader from '../componets/SubmitLoader'
import SummaryApi from '../common/SummaryApi'

const ForgotPassword = () => {
    const [email, setEmail] = useState("")
    const [allInputFieldEmpty, setAllInputFieldEmpty] = useState(true)
    const [loader, setLoader] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        if(!email){
            setAllInputFieldEmpty(true)
        }
        else setAllInputFieldEmpty(false)
    }, [email])

    const handleSubmit = async (e) => {
        e.preventDefault()
        
        if(!validateEmail(email)){
            toast.error("Invalid email address")
            return
        }

        setLoader(true)
        try {
            const response = await Axios({
                method : SummaryApi.forgot_password.method,
                url : SummaryApi.forgot_password.url,
                data : {
                    email
                }
            })


            if(response.data.error){
                toast.error(response.data.message)
                setLoader(false)
                return
            }

            if(response.data.success){
                toast.success(response.data.message)
                setEmail("")
                setLoader(false)
                navigate("/verify-otp")
            }
            
        } catch (error) {
            AxiosToastError(error)
            setLoader(false)
        }
    }
    return (
        <section className='w-full container mx-auto px-2 md:mt-50 mt-30'>
            <div className='bg-white my-4 w-full max-w-[450px] mx-auto rounded-xl p-4'>
                <form onSubmit={handleSubmit} className='grid gap-2 mt-2'>
                    <p className='text-2xl text-gray-700 font-bold text-center'>
                        Forgot Password
                    </p>
                    <div className=''>
                        <Input
                            type="text"
                            label="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="mohit@gmail.com"
                        />
                
                        <button type='submit' disabled={allInputFieldEmpty} className={`${allInputFieldEmpty ? "bg-gray-500" : "bg-green-700 hover:bg-green-600"} mt-2 text-white px-5 py-2 w-full cursor-pointer shadow-sm rounded-lg`}>
                            {
                                loader ? (
                                    <SubmitLoader/>
                                ) : (
                                    <>Send Otp</>
                                )
                            }
                        </button>

                        <p className='text-slate-800 text-md mt-3'>
                            Already have an account?{" "}
                            <Link className='text-green-800 font-medium underline' to='/login'>
                                Login
                            </Link>
                        </p>
                    </div>
                </form>
              </div>
        </section>
    )
}

export default ForgotPassword
