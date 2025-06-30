import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Input from '../componets/Input';
import SubmitLoader from '../componets/SubmitLoader';
import toast from 'react-hot-toast';
import AxiosToastError from '../utils/AxiosToastError';
import Axios from '../utils/Axios';
import SummaryApi from '../common/SummaryApi';

const ResetPassword = () => {
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("")
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);
    const [loader, setLoader] = useState(false)
    const location = useLocation()
    const email = location.state?.email
    const data = location.state?.data
    const navigate = useNavigate()

    useEffect(() => {
        if (!(location.state?.data?.success)) {
            navigate('/')
            return
        }
    })

    useEffect(() => {
        if (!newPassword || !confirmPassword) {
            setIsButtonDisabled(true)
        }
        else setIsButtonDisabled(false)
    }, [newPassword, confirmPassword])

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (newPassword !== confirmPassword) {
            toast.error("Both passwords must match")
            return
        }

        try {
            setLoader(true);
            const response = await Axios({
                method : SummaryApi.reset_password.method,
                url : SummaryApi.reset_password.url,
                data : {
                    email,
                    newPassword,
                    confirmPassword
                }
            })

            if(response.data.error){
                toast.error(response.data.message)
                setLoader(false)
                return
            }

            if(response.data.success){
                toast.success(response.data.message)
                setLoader(false)
                navigate('/login')
            }
        } catch (error) {
            AxiosToastError(error)
            setLoader(false)
        }
    }

    return (
        <section className=' w-full container mx-auto px-2 md:mt-20'>
            <div className='mt-30 bg-white my-4 w-full max-w-[450px] mx-auto rounded-xl p-6 shadow'>
                <form onSubmit={handleSubmit} className='grid gap-4'>
                    <p className='text-2xl text-slate-800 font-bold text-center mb-3'>
                        Enter Your New Password
                    </p>

                    <Input
                        type='password'
                        label='New Password'
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder='Min 8 character'
                    />

                    <Input
                        type='password'
                        label='Confirm Password'
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder='Min 8 character'
                    />

                    <button
                        type='submit'
                        disabled={isButtonDisabled}
                        className={`${isButtonDisabled
                                ? 'bg-gray-400 cursor-not-allowed'
                                : 'bg-green-700 hover:bg-green-600'
                            } text-white px-5 py-2 w-full rounded-lg transition-all`}
                    >
                        {loader ? <SubmitLoader /> : 'Change Password'}
                    </button>
                </form>
            </div>
        </section>
    )
}

export default ResetPassword
