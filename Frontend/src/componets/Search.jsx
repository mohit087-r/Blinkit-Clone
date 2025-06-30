import React, { useEffect, useState } from 'react'
import { IoSearch } from 'react-icons/io5'
import { FaArrowLeft } from 'react-icons/fa6'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { TypeAnimation } from 'react-type-animation'
import useMobile from '../hooks/useMobile'

const Search = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const [isSearchPage, setIsSearchPage] = useState(false)
    const [isMobile] = useMobile()
    
    useEffect(() => {
        const isSearch = location.pathname === "/search"
        setIsSearchPage(isSearch)
    }, [location])

    const redirectToSearchPage = () => {
        navigate("/search")
    }

    return (
        <div
            className='w-full h-10 lg:h-12 flex items-center text-neutral-500
            border border-gray-300 bg-slate-50 rounded-lg overflow-hidden
            group focus-within:border-amber-300 focus-within:bg-amber-50
            lg:min-w-[500px] lg:w-[500px] lg:focus-within:w-[800px] transition-all duration-300'
        >
            {
                (isMobile && isSearchPage) ? (
                    <Link
                        to={"/"}
                        className='flex justify-center items-center h-full p-2 group-focus-within:bg-amber-400 mr-2 group-focus-within:text-white bg-gray-300 text-gray-600 rounded-l-md'
                    >
                        <FaArrowLeft size={22} />
                    </Link>
                ) : (
                    <button className='flex justify-center items-center h-full p-3 group-focus-within:text-amber-400'>
                        <IoSearch size={22} />
                    </button>
                )
            }

            <div className='w-full h-full'>
                {!isSearchPage ? (
                    <div
                        onClick={redirectToSearchPage}
                        className='w-full h-full flex items-center cursor-text'
                    >
                        <TypeAnimation
                            sequence={[
                                'Search "milk"',
                                1000,
                                'Search "bread"',
                                1000,
                                'Search "sugar"',
                                1000,
                                'Search "chocolate"',
                                1000,
                                'Search "curd"',
                                1000,
                                'Search "rice"',
                                1000,
                                'Search "egg"',
                                1000,
                                'Search "chips"',
                                1000
                            ]}
                            wrapper="span"
                            speed={50}
                            repeat={Infinity}
                        />
                    </div>
                ) : (
                    <div className='w-full h-full'>
                        <input
                            type='text'
                            autoFocus={true}
                            placeholder='Search for atta dal and more.'
                            className='bg-transparent w-full h-full outline-none'
                        />
                    </div>
                )}
            </div>
        </div>
    )
}

export default Search
