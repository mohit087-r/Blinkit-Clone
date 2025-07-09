import React, { useEffect, useState } from 'react'
import { GoTriangleDown, GoTriangleUp } from 'react-icons/go'
import UserMenu from './UserMenu'
import { useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import AdminMenu from './AdminMenu'

const Account = () => {
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
    const navigate = useNavigate()
    const user = useSelector((state) => state?.user)
    const location = useLocation()
    const redirectToLoginPage = () => {
        navigate("/login")
    }

    const handleCloseUserMenu = () => {
        setIsUserMenuOpen(false);
    }

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 1024) {
                setIsUserMenuOpen(false);
            }
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const isDashboardRoute = location.pathname.startsWith("/dashboard")
    return (
        <div>
            {
                user?._id ? (
                    <div className='relative'>
                        <div 
                            onClick={() => {
                                if (!isDashboardRoute) {
                                    setIsUserMenuOpen(!isUserMenuOpen)
                                }
                            }}
                            className='flex items-center gap-2 text-lg cursor-pointer select-none'
                        >
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
                                {
                                    user?.role == 'ADMIN' ? ( 
                                        <AdminMenu
                                            close={handleCloseUserMenu}
                                        /> 
                                    )   : (
                                        <UserMenu
                                            close={handleCloseUserMenu}
                                        />
                                    )
                                }
                                    
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
