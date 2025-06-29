import React, { useEffect, useState } from 'react'
import logo from '../assets/logo.png'
import Search from './Search'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { FaRegCircleUser } from 'react-icons/fa6'
import { MdOutlineShoppingCart } from "react-icons/md";
import useMobile from '../hooks/useMobile'

const Header = () => {
    const [ isMobile ] = useMobile()
    const location = useLocation()
    const naviate = useNavigate()
    const isSearchPage = location.pathname === "/search"
    const hideHeader =  location.pathname === '/login' || 
                        location.pathname === '/register' ||
                        location.pathname === '/forgot-password' ||
                        location.pathname === '/verify-otp' ||
                        location.pathname === '/reset-password'

    const redirectToLoginPage = () => {
        naviate("/login")
    }

    return (
        <>
        {
            hideHeader ? (
                <></>
            ) : (
            <header className='h-25 gap-1 lg:h-20 lg:shadow-sm sticky top-0 flex flex-col justify-center bg-white'>
                {!(isMobile && isSearchPage) && (
                    <div className='container mx-auto flex items-center justify-between px-2'>
                        {/* logo */}
                        <Link to={"/"} className='h-full'>
                            <div className='h-full flex justify-center items-center'> 
                                <img 
                                    id='logo'
                                    src={logo} 
                                    alt="logo" 
                                    width={180}
                                    className='hidden md:block'
                                />
                                <img 
                                    src={logo} 
                                    alt="logo" 
                                    width={140}
                                    className='block md:hidden'
                                />
                            </div>
                        </Link>

                        {/* Search */}
                        <div className='hidden lg:block'>
                            <Search/>
                        </div>

                        {/* login and my cart */}
                        <div>
                            <div className='hidden lg:flex items-center gap-10'>
                                <button onClick={redirectToLoginPage} className='text-lg px-2 cursor-pointer'>Login</button>
                                <button className='bg-green-700 hover:bg-green-800 flex items-center gap-2 px-3 py-3 rounded text-white'>
                                    <div className='animate-bounce'>
                                        <MdOutlineShoppingCart
                                            size={30}
                                            className='font-bold'
                                        />
                                    </div>
                                    <div className='font-semibold'>
                                        <p>My Cart</p>
                                        
                                    </div>
                                </button>
                            </div>
                            <button className='text-neutral-600 lg:hidden'>
                                <FaRegCircleUser
                                    size={23}
                                />
                            </button>
                        </div>
                    </div>
                )}

                <div className='container mx-auto px-2 lg:hidden '>
                    <Search/>
                </div>
            </header>
        )}
        </>
    )
}

export default Header
