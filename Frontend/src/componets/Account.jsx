import React, { useState } from 'react'
import { GoTriangleDown, GoTriangleUp } from 'react-icons/go'
import UserMenu from './UserMenu'
import { useSelector } from 'react-redux'

const Account = () => {
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
    const user = useSelector((state) => state?.user)

    const redirectToLoginPage = () => {
        navigate("/login") 
    }

    return (
        <div>
            {
                user?._id ? (
                    <div className='relative'>
                        <div onClick={() => setIsUserMenuOpen(!isUserMenuOpen)} className='flex items-center gap-2 text-lg cursor-pointer select-none'>
                            <p>Account</p>
                            <button>
                                {
                                    isUserMenuOpen ? (
                                        <GoTriangleUp />
                                    ) : (
                                        <GoTriangleDown />
                                    )
                                }
                            </button>
                        </div>
                        {isUserMenuOpen && (
                            <div className="absolute top-12 right-0 bg-white lg:shadow-lg rounded-lg min-w-52 p-4 z-50">
                                <UserMenu />
                            </div>
                        )}
                    </div>
                ) : (
                    <button onClick={redirectToLoginPage} className='text-lg px-2 cursor-pointer'>Login</button>
                )
            }
        </div>
    )
}

export default Account
