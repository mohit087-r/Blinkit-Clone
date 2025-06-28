import React, { useEffect, useState } from 'react'
import Input from '../componets/Input'
import { Link, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { validateEmail } from '../../utils/validateEmail'
import axios from 'axios'
import Axios from '../../utils/Axios'
import SummaryApi from '../common/SummaryApi'
import AxiosToastError from '../../utils/AxiosToastError'
import SubmitLoader from '../componets/SubmitLoader'

const Register = () => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [allInputFieldEmpty, setAllInputFieldEmpty] = useState(true)
    const [loader, setLoader] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        if(!name || !email || !password || !confirmPassword){
            setAllInputFieldEmpty(true)
        }
        else setAllInputFieldEmpty(false)
    }, [name, email, password, confirmPassword])


    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoader(true)

        if(!validateEmail(email)){
            toast.error("Invalid email address")
            return
        }

        if(password !== confirmPassword){
            toast.error("Both passwords must match")
            return
        }

        try {
            const response = await Axios({
                method : SummaryApi.register.method,
                url : SummaryApi.register.url,
                data : {
                    name,
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
                setName("");
                setEmail("")
                setPassword("")
                setConfirmPassword("")
                setLoader(false)
                navigate("/login")
            }

            
        } catch (error) {
            AxiosToastError(error)
            setLoader(false)
        }
    }

    return (
        <section className='w-full container mx-auto px-2 md:mt-40 mt-20'>
            <div className='bg-white my-4 w-full max-w-[450px] mx-auto rounded-xl p-4'>
                <p className='text-2xl text-gray-700 font-bold text-center'>Welcome to SnapBasket
                </p>
                <form onSubmit={handleSubmit} className='grid gap-2 mt-6'>
                    <div className='grid'>
                        <Input
                            type="text"
                            label="Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Mohit Raut"
                        />

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

                        <Input
                            type="password"
                            label="Confirm Password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="Min 8 character"
                        />

                        <button type='submit' disabled={allInputFieldEmpty} className={`${allInputFieldEmpty ? "bg-gray-500" : "bg-green-700 hover:bg-green-600"} mt-3 text-white px-5 py-2 w-full cursor-pointer shadow-sm rounded-lg`}>
                            {
                                loader ? (
                                    <SubmitLoader/>
                                ) : (
                                    <>Register</>
                                )
                            }
                        </button>

                        <p className='text-slate-800 text-md mt-3'>
                            Already havee an account?{" "}
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

export default Register
