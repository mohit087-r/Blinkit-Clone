import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Input from '../componets/Input'
import { validateEmail } from '../utils/validateEmail'
import toast from 'react-hot-toast'
import Axios from '../utils/Axios'
import AxiosToastError from '../utils/AxiosToastError'
import SubmitLoader from '../componets/SubmitLoader'
import SummaryApi from '../common/SummaryApi'

const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [allInputFieldEmpty, setAllInputFieldEmpty] = useState(true)
    const [loader, setLoader] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        if(!email || !password){
            setAllInputFieldEmpty(true)
        }
        else setAllInputFieldEmpty(false)
    }, [email, password])

    const handleSubmit = async (e) => {
        e.preventDefault()
        
        if(!validateEmail(email)){
            toast.error("Invalid email address")
            return
        }

        setLoader(true)
        try {
            const response = await Axios({
                method : SummaryApi.login.method,
                url : SummaryApi.login.url,
                data : {
                    email,
                    password
                }
            })


            if(response.data.error){
                toast.error(response.data.message)
                setLoader(false)
            }

            if(response.data.success){
                toast.success(response.data.message)
                console.log(response)
                localStorage.setItem('accessToken', response.data.data.accessToken)
                localStorage.setItem('refreshToken', response.data.data.refreshToken)
                setEmail("")
                setPassword("")
                setLoader(false)
                navigate("/")
            }
             
        } catch (error) {
            AxiosToastError(error)
            setLoader(false)
        }
    }
    return (
        <section className='w-full container mx-auto px-2 md:mt-40 mt-30'>
            <div className='bg-white my-4 w-full max-w-[450px] mx-auto rounded-xl p-4'>
                <p className='text-2xl text-gray-700 font-bold text-center'>
                    Login
                </p>
                <form onSubmit={handleSubmit} className='grid gap-2 mt-6'>
                    <div className='grid'>
                        <Input
                            type="text"
                            label="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="mohit@gmail.com"
                        />
                        <Input
                            type="password"
                            label="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Min 8 character"
                        />

                        <Link to={"/forgot-password"} className='flex justify-self-end hover:text-green-700'>Forgot password?</Link>
                
                        <button type='submit' disabled={allInputFieldEmpty} className={`${allInputFieldEmpty ? "bg-gray-500" : "bg-green-700 hover:bg-green-600"} mt-3 text-white px-5 py-2 w-full cursor-pointer shadow-sm rounded-lg`}>
                            {
                                loader ? (
                                    <SubmitLoader/>
                                ) : (
                                    <>Login</>
                                )
                            }
                        </button>
                         <p className='text-slate-800 text-md mt-3'>
                            Don't have an account?{" "}
                            <Link className='text-green-800 font-medium underline' to='/register'>
                                Register
                            </Link>
                        </p>
                    </div>
                </form>
              </div>
        </section>
    )
}

export default Login
